import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const QuizPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await api.getLesson(lessonId);
        setLesson(response.data.lesson);
        setQuizzes(response.data.quizzes || []);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Gagal memuat latihan soal');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [lessonId]);

  const currentQuestion = quizzes[currentQuestionIndex];
  const currentQuestionId = currentQuestion?.id || `q-${currentQuestionIndex}`;
  const totalQuestions = quizzes.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const allQuestionsAnswered =
    Object.keys(selectedAnswers).length === totalQuestions;

  // Load saved state on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem(`quiz_progress_${lessonId}`);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setSelectedAnswers(parsed.selectedAnswers || {});
        setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
        toast.success('Progress latihan soal dipulihkan', { id: 'restore-progress' });
      } catch (e) {
        console.error('Failed to restore quiz progress', e);
        sessionStorage.removeItem(`quiz_progress_${lessonId}`);
      }
    }
  }, [lessonId]);

  // Save state on change
  useEffect(() => {
    if (Object.keys(selectedAnswers).length > 0 || currentQuestionIndex > 0) {
      const stateToSave = {
        selectedAnswers,
        currentQuestionIndex,
        timestamp: Date.now()
      };
      sessionStorage.setItem(`quiz_progress_${lessonId}`, JSON.stringify(stateToSave));
    }
  }, [selectedAnswers, currentQuestionIndex, lessonId]);

  const handleSelectAnswer = (answerIndex) => {
    const newAnswers = { ...selectedAnswers };
    newAnswers[currentQuestionId] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!allQuestionsAnswered) {
      toast.error('Silakan jawab semua pertanyaan terlebih dahulu');
      return;
    }

    setSubmitting(true);
    setError('');
    const toastId = toast.loading('Mengirim jawaban...');

    try {
      const answersArray = Object.entries(selectedAnswers).map(
        ([quizId, answer]) => ({
          quiz_id: quizId,
          selected_answer: answer,
        }),
      );

      // Debug logging
      console.log('=== QUIZ SUBMISSION DEBUG ===');
      console.log('Lesson ID:', lessonId);
      console.log('Total questions:', totalQuestions);
      console.log('Answers count:', answersArray.length);
      console.log('Sample answer:', answersArray[0]);
      console.log('All quiz IDs:', quizzes.map(q => q.id));
      console.log('============================');

      const response = await api.submitQuiz(lessonId, answersArray);

      console.log('✅ Submission successful!', response.data);

      // Clear saved progress on success
      sessionStorage.removeItem(`quiz_progress_${lessonId}`);

      toast.success('Latihan soal berhasil dikirim!', { id: toastId });

      // Navigate to results page with the result data
      navigate(`/quiz-results/${lessonId}`, {
        state: {
          results: response.data,
          lesson,
          answers: selectedAnswers,
          quizzes,
        },
      });
    } catch (err) {
      console.error('❌ Submit error:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);

      // More detailed error message
      let errorMsg = 'Gagal submit latihan soal. ';
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        errorMsg += 'Silakan login kembali.';
      } else if (err.message.includes('Network')) {
        errorMsg += 'Periksa koneksi internet Anda.';
      } else {
        errorMsg += 'Silakan coba lagi.';
      }
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const calculateProgress = () => {
    return Math.round(
      (Object.keys(selectedAnswers).length / totalQuestions) * 100,
    );
  };

  if (loading) {
    return (
      <div className='page-container py-12'>
        <div className='container-main'>
          <Loading size='lg' text='Memuat latihan soal...' />
        </div>
      </div>
    );
  }

  if (error && !quizzes.length) {
    return (
      <div className='page-container py-12'>
        <div className='container-main text-center'>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Gagal memuat soal
          </h2>
          <p className='text-gray-500 mb-4'>{error}</p>
          <Link to={`/lesson/${lessonId}`} className='btn-primary'>
            Kembali ke Pembahasan
          </Link>
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className='page-container py-12'>
        <div className='container-main text-center'>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Tidak ada soal
          </h2>
          <p className='text-gray-500 mb-4'>
            Latihan soal belum tersedia untuk pembahasan ini.
          </p>
          <Link to={`/lesson/${lessonId}`} className='btn-primary'>
            Kembali ke Pembahasan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='page-container py-4 sm:py-6'>
      <div className='container-main max-w-4xl px-3 sm:px-4'>
        {/* Header */}
        <div className='mb-4 sm:mb-6'>
          <Link
            to={`/lesson/${lessonId}`}
            className='inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-primary-600 mb-3 sm:mb-4'
          >
            <svg
              className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Kembali
          </Link>
          <h1 className='text-lg sm:text-2xl font-bold text-gray-900 line-clamp-2'>
            {lesson?.title}
          </h1>
          <p className='text-sm sm:text-base text-gray-500 mt-1'>
            Latihan Soal
          </p>
        </div>

        {/* Progress Bar */}
        <div className='card p-3 sm:p-4 mb-4 sm:mb-6'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-xs sm:text-sm font-medium text-gray-700'>
              Soal {currentQuestionIndex + 1}/{totalQuestions}
            </span>
            <span className='text-xs sm:text-sm text-gray-500'>
              {calculateProgress()}% selesai
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
            <div
              className='bg-primary-600 h-1.5 sm:h-2 rounded-full transition-all duration-300'
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Question Navigation Dots */}
        <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 justify-center'>
          {quizzes.map((_, index) => {
            const qId = quizzes[index]?.id || `q-${index}`;
            const isAnswered = selectedAnswers[qId] !== undefined;
            const isCurrent = index === currentQuestionIndex;

            return (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-all ${isCurrent
                  ? 'bg-primary-600 text-white'
                  : isAnswered
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <div className='card p-4 sm:p-6 mb-4 sm:mb-6'>
          <div className='mb-4 sm:mb-6'>
            <span className='inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4'>
              Soal {currentQuestionIndex + 1}
            </span>
            <h2 className='text-sm sm:text-lg font-medium text-gray-900 leading-relaxed'>
              {currentQuestion?.question}
            </h2>
          </div>

          {/* Options */}
          <div className='space-y-2 sm:space-y-3'>
            {currentQuestion?.options?.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionId] === index;
              const optionLabels = ['A', 'B', 'C', 'D', 'E'];

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className='flex items-start'>
                    <span
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium mr-2 sm:mr-3 flex-shrink-0 ${isSelected
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {optionLabels[index]}
                    </span>
                    <span className='text-xs sm:text-base mt-0.5 sm:mt-1'>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm'>
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className='flex justify-between items-center'>
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-base font-medium transition-colors ${currentQuestionIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <svg
              className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <span className='hidden sm:inline'>Sebelumnya</span>
            <span className='sm:hidden'>Prev</span>
          </button>

          <div className='flex gap-2 sm:gap-3'>
            {!isLastQuestion ? (
              <button
                onClick={handleNextQuestion}
                className='btn-primary flex items-center text-xs sm:text-base px-3 sm:px-4 py-2'
              >
                <span className='hidden sm:inline'>Selanjutnya</span>
                <span className='sm:hidden'>Next</span>
                <svg
                  className='w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered || submitting}
                className={`flex items-center px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-base font-medium transition-colors ${allQuestionsAnswered && !submitting
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {submitting ? (
                  <>
                    <svg
                      className='animate-spin w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    <span className='hidden sm:inline'>Mengirim...</span>
                    <span className='sm:hidden'>...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span className='hidden sm:inline'>Selesai & Kirim</span>
                    <span className='sm:hidden'>Kirim</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Answer Summary */}
        <div className='mt-4 sm:mt-8 card p-3 sm:p-4'>
          <h3 className='text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3'>
            Ringkasan Jawaban
          </h3>
          <div className='grid grid-cols-10 gap-1 sm:gap-2'>
            {quizzes.map((_, index) => {
              const qId = quizzes[index]?.id || `q-${index}`;
              const isAnswered = selectedAnswers[qId] !== undefined;

              return (
                <div
                  key={index}
                  className={`w-full aspect-square rounded flex items-center justify-center text-[10px] sm:text-xs font-medium ${isAnswered
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
          <p className='text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3'>
            {Object.keys(selectedAnswers).length} dari {totalQuestions}{' '}
            pertanyaan dijawab
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
