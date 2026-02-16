import express from 'express';
import {
  getSheetData,
  findByColumn,
  filterByColumn,
  TABLES,
} from '../services/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/progress/:userId
 * Get user progress (all lessons) - OPTIMIZED
 */
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Users can only view their own progress, unless admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own progress',
      });
    }

    // OPTIMIZED: Single query with joins for progress + lesson + module + course
    const { data: userProgress } = await req.app.locals.supabase
      .from(TABLES.USER_PROGRESS)
      .select(`
        *,
        lesson:lessons(
          id,
          title,
          module:modules(
            id,
            title,
            course:courses(
              id,
              title
            )
          )
        )
      `)
      .eq('user_id', userId);

    // Transform the data structure
    const enrichedProgress = userProgress.map((progress) => ({
      ...progress,
      lesson: progress.lesson ? { id: progress.lesson.id, title: progress.lesson.title } : null,
      module: progress.lesson?.module
        ? { id: progress.lesson.module.id, title: progress.lesson.module.title }
        : null,
      course: progress.lesson?.module?.course
        ? { id: progress.lesson.module.course.id, title: progress.lesson.module.course.title }
        : null,
    }));

    // OPTIMIZED: Get total lessons count with single query
    const { count: totalLessons } = await req.app.locals.supabase
      .from(TABLES.LESSONS)
      .select('*', { count: 'exact', head: true });

    // Calculate overall statistics
    const completedLessons = userProgress.filter((p) => p.completed === true).length;
    const averageScore =
      userProgress.length > 0
        ? Math.round(
          userProgress.reduce((acc, p) => acc + parseInt(p.score || 0), 0) /
          userProgress.length,
        )
        : 0;

    res.json({
      success: true,
      data: {
        progress: enrichedProgress,
        statistics: {
          totalLessons,
          completedLessons,
          completionPercentage:
            totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0,
          averageScore,
          inProgressCount: userProgress.filter((p) => p.completed === false).length,
        },
      },
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
    });
  }
});

/**
 * GET /api/progress/course/:courseId
 * Get user progress for a specific course
 */
router.get('/course/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;

    // Verify course exists
    const course = await findByColumn(TABLES.COURSES, 'id', courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Get modules for this course
    const courseModules = await filterByColumn(
      TABLES.MODULES,
      'course_id',
      courseId,
    );

    // Get lessons for these modules
    const allLessons = await getSheetData(TABLES.LESSONS);
    const courseLessons = allLessons.filter((l) =>
      courseModules.some((m) => m.id === l.module_id),
    );

    // Get user progress for these lessons
    const userProgressAll = await filterByColumn(
      TABLES.USER_PROGRESS,
      'user_id',
      req.user.id,
    );
    const userProgress = userProgressAll.filter((p) =>
      courseLessons.some((l) => l.id === p.lesson_id),
    );

    // Build progress map
    const progressMap = {};
    userProgress.forEach((p) => {
      progressMap[p.lesson_id] = {
        score: parseInt(p.score || 0),
        completed: p.completed,
        completed_at: p.completed_at,
      };
    });

    // Build module progress
    const moduleProgress = courseModules
      .sort((a, b) => parseInt(a.order_index) - parseInt(b.order_index))
      .map((module) => {
        const moduleLessons = courseLessons
          .filter((l) => l.module_id === module.id)
          .sort((a, b) => parseInt(a.order_index) - parseInt(b.order_index))
          .map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            progress: progressMap[lesson.id] || {
              completed: false,
              score: 0,
            },
          }));

        const completedCount = moduleLessons.filter(
          (l) => l.progress.completed === true,
        ).length;

        return {
          id: module.id,
          title: module.title,
          order_index: module.order_index,
          lessons: moduleLessons,
          completedLessons: completedCount,
          totalLessons: moduleLessons.length,
          isCompleted:
            completedCount === moduleLessons.length && moduleLessons.length > 0,
        };
      });

    const totalLessons = courseLessons.length;
    const completedLessons = userProgress.filter(
      (p) => p.completed === true,
    ).length;

    res.json({
      success: true,
      data: {
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
        },
        moduleProgress,
        statistics: {
          totalModules: courseModules.length,
          totalLessons,
          completedLessons,
          completionPercentage:
            totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0,
        },
      },
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course progress',
    });
  }
});

export default router;
