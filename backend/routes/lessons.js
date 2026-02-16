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

/**
 * GET /api/lessons/:id
 * Get a specific lesson with quiz questions (OPTIMIZED)
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // OPTIMIZED: Single query with joins for lesson, module, and course
    const { data: lessonData, error: lessonError } = await req.app.locals.supabase
      .from(TABLES.LESSONS)
      .select(`
        *,
        module:modules(
          id,
          title,
          course_id,
          order_index,
          course:courses(
            id,
            title
          )
        )
      `)
      .eq('id', id)
      .single();

    if (lessonError) {
      if (lessonError.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found',
        });
      }
      throw lessonError;
    }

    if (!lessonData) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // OPTIMIZED: Get quiz with single filtered query
    const { data: quizData } = await req.app.locals.supabase
      .from(TABLES.QUIZZES)
      .select('*')
      .eq('lesson_id', id)
      .maybeSingle();

    // Extract questions from the questions JSONB field
    let quizzes = [];
    if (quizData && quizData.questions) {
      const questionsData =
        typeof quizData.questions === 'string'
          ? JSON.parse(quizData.questions)
          : quizData.questions;

      quizzes = questionsData.map((q, index) => ({
        id: `${quizData.id}-q${index}`,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
      }));
    }

    // OPTIMIZED: Get user progress with single filtered query (if authenticated)
    let userProgress = null;
    if (req.user) {
      const { data: progressData } = await req.app.locals.supabase
        .from(TABLES.USER_PROGRESS)
        .select('*')
        .eq('user_id', req.user.id)
        .eq('lesson_id', id)
        .maybeSingle();

      userProgress = progressData || null;
    }

    // OPTIMIZED: Get prev/next lessons with single filtered query
    let prevLesson = null;
    let nextLesson = null;

    if (lessonData.module) {
      const { data: moduleLessons } = await req.app.locals.supabase
        .from(TABLES.LESSONS)
        .select('id, title, order_index')
        .eq('module_id', lessonData.module_id)
        .order('order_index');

      if (moduleLessons && moduleLessons.length > 0) {
        const currentIndex = moduleLessons.findIndex((l) => l.id === id);

        if (currentIndex > 0) {
          prevLesson = {
            id: moduleLessons[currentIndex - 1].id,
            title: moduleLessons[currentIndex - 1].title,
          };
        }

        if (currentIndex < moduleLessons.length - 1) {
          nextLesson = {
            id: moduleLessons[currentIndex + 1].id,
            title: moduleLessons[currentIndex + 1].title,
          };
        }
      }
    }

    res.json({
      success: true,
      data: {
        lesson: {
          ...lessonData,
          module: lessonData.module
            ? { id: lessonData.module.id, title: lessonData.module.title }
            : null,
          course: lessonData.module?.course
            ? { id: lessonData.module.course.id, title: lessonData.module.course.title }
            : null,
        },
        quizzes,
        userProgress,
        navigation: {
          prevLesson,
          nextLesson,
        },
      },
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lesson',
    });
  }
});

/**
 * POST /api/lessons
 * Create a new lesson (instructor/admin only)
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'instructor'),
  async (req, res) => {
    try {
      const {
        module_id,
        title,
        video_url,
        content = '',
        order_index = 1,
      } = req.body;

      if (!module_id || !title) {
        return res.status(400).json({
          success: false,
          message: 'Module ID and title are required',
        });
      }

      // Verify module exists
      const module = await findByColumn(TABLES.MODULES, 'id', module_id);
      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found',
        });
      }

      const newLesson = await insertRow(TABLES.LESSONS, {
        module_id,
        title,
        video_url,
        content,
        order_index,
      });

      res.status(201).json({
        success: true,
        message: 'Lesson created successfully',
        data: {
          lesson: newLesson,
        },
      });
    } catch (error) {
      console.error('Create lesson error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create lesson',
      });
    }
  },
);

/**
 * POST /api/lessons/:id/quizzes
 * Add quiz questions to a lesson
 */
router.post(
  '/:id/quizzes',
  authenticateToken,
  authorizeRoles('admin', 'instructor'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { questions } = req.body;

      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Questions array is required',
        });
      }

      // Verify lesson exists
      const lesson = await findByColumn(TABLES.LESSONS, 'id', id);
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found',
        });
      }

      const createdQuizzes = [];

      for (const q of questions) {
        if (!q.question || !q.options || !q.correct_answer) {
          continue; // Skip invalid questions
        }

        const newQuiz = await insertRow(TABLES.QUIZZES, {
          lesson_id: id,
          question: q.question,
          options: q.options,
          correct_answer: q.correct_answer.toLowerCase(),
        });

        createdQuizzes.push(newQuiz);
      }

      res.status(201).json({
        success: true,
        message: `${createdQuizzes.length} quiz questions added successfully`,
        data: { quizzes: createdQuizzes },
      });
    } catch (error) {
      console.error('Add quizzes error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add quiz questions',
      });
    }
  },
);

export default router;
