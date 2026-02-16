import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getSheetData,
  insertRow,
  findByColumn,
  filterByColumn,
  TABLES,
} from '../services/supabase.js';
import {
  authenticateToken,
  authorizeRoles,
  optionalAuth,
} from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const courseValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
];

/**
 * GET /api/courses
 * Get all courses with optional pagination
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit) - 1;

    // Build Supabase query for courses
    let query = req.app.locals.supabase
      .from(TABLES.COURSES)
      .select('*', { count: 'exact' });
    if (category) {
      query = query.eq('category', category);
    }
    query = query.range(startIndex, endIndex);

    const {
      data: courses,
      count: totalItems,
      error: courseError,
    } = await query;
    if (courseError) throw courseError;

    // Get moduleCount for each course using aggregate
    const courseIds = courses.map((c) => c.id);
    let moduleCounts = [];
    if (courseIds.length > 0) {
      const { data: modules, error: modulesError } =
        await req.app.locals.supabase
          .from(TABLES.MODULES)
          .select('course_id')
          .in('course_id', courseIds);

      if (modulesError) throw modulesError;

      moduleCounts = modules.reduce((acc, cur) => {
        acc[cur.course_id] = (acc[cur.course_id] || 0) + 1;
        return acc;
      }, {});
    }

    const coursesWithModules = courses.map((course) => ({
      ...course,
      moduleCount: moduleCounts[course.id]
        ? Number(moduleCounts[course.id])
        : 0,
    }));

    res.json({
      success: true,
      data: {
        courses: coursesWithModules,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / parseInt(limit)),
          totalItems,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
    });
  }
});

/**
 * GET /api/courses/categories
 * Get all unique categories (OPTIMIZED)
 */
router.get('/categories', async (req, res) => {
  try {
    // OPTIMIZED: Only fetch category field instead of all course data
    const { data: courses } = await req.app.locals.supabase
      .from(TABLES.COURSES)
      .select('category');

    const categories = [...new Set(courses.map((course) => course.category))];

    res.json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
    });
  }
});

/**
 * GET /api/courses/:id
 * Get course with modules and lessons (OPTIMIZED)
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // OPTIMIZED: Single query with nested relations (modules + lessons)
    const { data: courseData, error: courseError } = await req.app.locals.supabase
      .from(TABLES.COURSES)
      .select(`
        *,
        modules:modules(
          *,
          lessons:lessons(
            id,
            title,
            content,
            video_url,
            duration,
            order_index,
            module_id,
            course_id
          )
        )
      `)
      .eq('id', id)
      .single();

    if (courseError) {
      if (courseError.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }
      throw courseError;
    }

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Sort modules and lessons by order_index
    if (courseData.modules) {
      courseData.modules.sort((a, b) => parseInt(a.order_index) - parseInt(b.order_index));
      courseData.modules.forEach((module) => {
        if (module.lessons) {
          module.lessons.sort((a, b) => parseInt(a.order_index) - parseInt(b.order_index));
        }
      });
    }

    // OPTIMIZED: Get user progress with single filtered query (if authenticated)
    let userProgress = [];
    if (req.user) {
      // Extract all lesson IDs from the course
      const lessonIds = courseData.modules
        .flatMap((m) => m.lessons || [])
        .map((l) => l.id);

      if (lessonIds.length > 0) {
        const { data: progressData } = await req.app.locals.supabase
          .from(TABLES.USER_PROGRESS)
          .select('*')
          .eq('user_id', req.user.id)
          .in('lesson_id', lessonIds);

        userProgress = progressData || [];
      }
    }

    res.json({
      success: true,
      data: {
        course: courseData,
        userProgress,
      },
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
    });
  }
});

/**
 * POST /api/courses
 * Create a new course (instructor/admin only)
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'instructor'),
  courseValidation,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { title, description, category, thumbnail = '' } = req.body;

      const newCourse = await insertRow(TABLES.COURSES, {
        title,
        description,
        thumbnail,
        instructor_id: req.user.id,
      });

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: {
          course: newCourse,
        },
      });
    } catch (error) {
      console.error('Create course error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create course',
      });
    }
  },
);

/**
 * POST /api/courses/:id/modules
 * Add a module to a course
 */
router.post(
  '/:id/modules',
  authenticateToken,
  authorizeRoles('admin', 'instructor'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, order } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: 'Module title is required',
        });
      }

      // Verify course exists
      const course = await findByColumn(TABLES.COURSES, 'id', id);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found',
        });
      }

      const newModule = await insertRow(TABLES.MODULES, {
        course_id: id,
        title,
        order_index: order || 1,
      });

      res.status(201).json({
        success: true,
        message: 'Module added successfully',
        data: {
          module: newModule,
        },
      });
    } catch (error) {
      console.error('Add module error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add module',
      });
    }
  },
);

export default router;
