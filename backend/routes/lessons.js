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
 * Get a specific lesson with quiz questions
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Get lesson
    const lesson = await findByColumn(TABLES.LESSONS, 'id', id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Get quiz questions for this lesson
    const allQuizzes = await getSheetData(TABLES.QUIZZES);
    const lessonQuiz = allQuizzes.find((quiz) => quiz.lesson_id === id);

    // Extract questions from the questions JSONB field
    let quizzes = [];
    if (lessonQuiz && lessonQuiz.questions) {
      // Handle both array and already-parsed questions
      const questionsData =
        typeof lessonQuiz.questions === 'string'
          ? JSON.parse(lessonQuiz.questions)
          : lessonQuiz.questions;

      quizzes = questionsData.map((q, index) => ({
        id: `${lessonQuiz.id}-q${index}`,
        question: q.question,
        options: q.options, // Array format: ['opt1', 'opt2', 'opt3', 'opt4']
        correctIndex: q.correctIndex, // Store for backend validation
      }));
    }

    // Get user progress if authenticated
    let userProgress = null;
    if (req.user) {
      const allProgress = await getSheetData(TABLES.USER_PROGRESS);
      userProgress =
        allProgress.find(
          (p) => p.user_id === req.user.id && p.lesson_id === id,
        ) || null;
    }

    // Get module info
    const module = await findByColumn(TABLES.MODULES, 'id', lesson.module_id);

    // Get course info
    let course = null;
    if (module) {
      course = await findByColumn(TABLES.COURSES, 'id', module.course_id);
    }

    // Get next and previous lessons
    let prevLesson = null;
    let nextLesson = null;

    if (module) {
      const allLessons = await getSheetData(TABLES.LESSONS);
      const moduleLessons = allLessons
        .filter((l) => l.module_id === lesson.module_id)
        .sort((a, b) => parseInt(a.order_index) - parseInt(b.order_index));

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

    res.json({
      success: true,
      data: {
        lesson: {
          ...lesson,
          module: module ? { id: module.id, title: module.title } : null,
          course: course ? { id: course.id, title: course.title } : null,
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
