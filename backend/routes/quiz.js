import express from 'express';
import {
  getSheetData,
  insertRow,
  updateRow,
  findByColumn,
  filterByColumn,
  TABLES,
  supabase,
} from '../services/supabase.js';
import { authenticateToken } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

/**
 * POST /api/quiz/submit
 * Submit quiz answers and calculate score
 */
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { lesson_id, answers } = req.body;

    if (!lesson_id) {
      return res.status(400).json({
        success: false,
        message: 'Lesson ID is required',
      });
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Answers array is required',
      });
    }

    // Verify lesson exists
    const lesson = await findByColumn(TABLES.LESSONS, 'id', lesson_id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Get quiz record for this lesson (contains questions JSONB array)
    const quizRecords = await filterByColumn(
      TABLES.QUIZZES,
      'lesson_id',
      lesson_id,
    );

    if (quizRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No quiz questions found for this lesson',
      });
    }

    // Extract questions from JSONB
    const quizRecord = quizRecords[0];
    const questionsData =
      typeof quizRecord.questions === 'string'
        ? JSON.parse(quizRecord.questions)
        : quizRecord.questions;

    if (!questionsData || questionsData.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No quiz questions found for this lesson',
      });
    }

    // Build questions map with generated IDs
    const questionsMap = {};
    questionsData.forEach((q, index) => {
      const qId = `${quizRecord.id}-q${index}`;
      questionsMap[qId] = {
        ...q,
        id: qId,
      };
    });

    // Calculate score
    let correctCount = 0;
    const results = [];

    for (const answer of answers) {
      const question = questionsMap[answer.quiz_id];
      if (question) {
        // Compare selected index with correct index
        const isCorrect = answer.selected_answer === question.correctIndex;
        if (isCorrect) {
          correctCount++;
        }
        results.push({
          quiz_id: answer.quiz_id,
          question: question.question,
          selected_answer: answer.selected_answer,
          correct_answer: question.correctIndex,
          is_correct: isCorrect,
        });
      }
    }

    const totalQuestions = questionsData.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const completed = score >= 70;

    // Check if progress already exists
    const { data: existingProgress } = await supabase
      .from(TABLES.USER_PROGRESS)
      .select('*')
      .eq('user_id', req.user.id)
      .eq('lesson_id', lesson_id)
      .maybeSingle();

    if (existingProgress) {
      // Update existing progress
      await updateRow(TABLES.USER_PROGRESS, existingProgress.id, {
        score,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      });
    } else {
      // Create new progress with generated ID
      await insertRow(TABLES.USER_PROGRESS, {
        id: uuidv4(),
        user_id: req.user.id,
        lesson_id,
        score,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      });
    }

    res.json({
      success: true,
      message: completed
        ? 'Congratulations! You passed the quiz!'
        : 'Keep trying! You need 70% to pass.',
      data: {
        score,
        totalQuestions,
        correctAnswers: correctCount,
        passed: completed,
        results,
      },
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
    });
  }
});

/**
 * GET /api/quiz/lesson/:lessonId
 * Get quiz questions for a lesson (without answers)
 */
router.get('/lesson/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;

    // Verify lesson exists
    const lesson = await findByColumn(TABLES.LESSONS, 'id', lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Get quiz questions
    const allQuizzes = await filterByColumn(
      TABLES.QUIZZES,
      'lesson_id',
      lessonId,
    );
    const quizzes = allQuizzes.map((quiz) => ({
      id: quiz.id,
      question: quiz.question,
      options: quiz.options,
      // correct_answer is intentionally not included
    }));

    res.json({
      success: true,
      data: {
        lesson: {
          id: lesson.id,
          title: lesson.title,
        },
        quizzes,
        totalQuestions: quizzes.length,
      },
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz questions',
    });
  }
});

export default router;
