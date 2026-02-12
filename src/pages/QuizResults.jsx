import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, lesson, answers, quizzes } = location.state || {};

  useEffect(() => {
    // Redirect if no results data
    if (!results) {
      navigate('/dashboard');
    }
  }, [results, navigate]);

  if (!results) {
    return null;
  }

  const {
    score,
    totalQuestions,
    correctAnswers,
    passed,
    results: questionResults,
  } = results;
  const optionLabels = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className='page-container py-4 sm:py-6'>
      <div className='container-main max-w-4xl px-3 sm:px-4'>
        {/* Result Header */}
        <div className='card p-4 sm:p-8 mb-4 sm:mb-6 text-center'>
          {passed ? (
            <>
              <div className='w-16 h-16 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6'>
                <svg
                  className='w-8 h-8 sm:w-12 sm:h-12 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h1 className='text-xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2'>
                Selamat! Anda Lulus!
              </h1>
              <p className='text-sm sm:text-base text-gray-600'>
                Anda telah berhasil menyelesaikan latihan soal ini.
              </p>
            </>
          ) : (
            <>
              <div className='w-16 h-16 sm:w-24 sm:h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6'>
                <svg
                  className='w-8 h-8 sm:w-12 sm:h-12 text-orange-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
              <h1 className='text-xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2'>
                Coba Lagi!
              </h1>
              <p className='text-sm sm:text-base text-gray-600'>
                Anda memerlukan minimal 70% untuk lulus. Jangan menyerah!
              </p>
            </>
          )}

          {/* Score Display */}
          <div className='mt-4 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto'>
            <div className='bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-4'>
              <p className='text-xl sm:text-3xl font-bold text-primary-600'>
                {score}%
              </p>
              <p className='text-xs sm:text-sm text-gray-500'>Skor</p>
            </div>
            <div className='bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-4'>
              <p className='text-xl sm:text-3xl font-bold text-green-600'>
                {correctAnswers}
              </p>
              <p className='text-xs sm:text-sm text-gray-500'>Benar</p>
            </div>
            <div className='bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-4'>
              <p className='text-xl sm:text-3xl font-bold text-red-600'>
                {totalQuestions - correctAnswers}
              </p>
              <p className='text-xs sm:text-sm text-gray-500'>Salah</p>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className='card p-3 sm:p-6 mb-4 sm:mb-6'>
          <h2 className='text-base sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4'>
            Pembahasan Jawaban
          </h2>

          <div className='space-y-3 sm:space-y-6'>
            {quizzes.map((quiz, index) => {
              const qId = quiz.id || `q-${index}`;
              const userAnswer = answers[qId];
              const correctIndex = quiz.correctIndex;
              const isCorrect = userAnswer === correctIndex;

              return (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg border-2 ${
                    isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  {/* Question Header */}
                  <div className='flex items-start justify-between mb-2 sm:mb-3'>
                    <span
                      className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                        isCorrect
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <svg
                            className='w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1'
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
                          Benar
                        </>
                      ) : (
                        <>
                          <svg
                            className='w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                          Salah
                        </>
                      )}
                    </span>
                    <span className='text-xs sm:text-sm text-gray-500'>
                      Soal {index + 1}
                    </span>
                  </div>

                  {/* Question Text */}
                  <p className='text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4'>
                    {quiz.question}
                  </p>

                  {/* Options */}
                  <div className='space-y-1.5 sm:space-y-2'>
                    {quiz.options?.map((option, optIndex) => {
                      const isUserAnswer = userAnswer === optIndex;
                      const isCorrectAnswer = correctIndex === optIndex;

                      let bgColor = 'bg-white';
                      let borderColor = 'border-gray-200';
                      let textColor = 'text-gray-700';

                      if (isCorrectAnswer) {
                        bgColor = 'bg-green-100';
                        borderColor = 'border-green-400';
                        textColor = 'text-green-800';
                      } else if (isUserAnswer && !isCorrect) {
                        bgColor = 'bg-red-100';
                        borderColor = 'border-red-400';
                        textColor = 'text-red-800';
                      }

                      return (
                        <div
                          key={optIndex}
                          className={`p-2 sm:p-3 rounded-lg border ${borderColor} ${bgColor} ${textColor}`}
                        >
                          <div className='flex items-center'>
                            <span
                              className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium mr-2 sm:mr-3 flex-shrink-0 ${
                                isCorrectAnswer
                                  ? 'bg-green-500 text-white'
                                  : isUserAnswer && !isCorrect
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {optionLabels[optIndex]}
                            </span>
                            <span className='flex-1 text-xs sm:text-base'>
                              {option}
                            </span>
                            {isCorrectAnswer && (
                              <svg
                                className='w-4 h-4 sm:w-5 sm:h-5 text-green-600 ml-1 sm:ml-2 flex-shrink-0'
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
                            )}
                            {isUserAnswer && !isCorrect && (
                              <svg
                                className='w-4 h-4 sm:w-5 sm:h-5 text-red-600 ml-1 sm:ml-2 flex-shrink-0'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Answer Summary */}
                  {!isCorrect && (
                    <div className='mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200'>
                      <p className='text-xs sm:text-sm text-gray-600'>
                        <span className='font-medium'>Anda:</span>{' '}
                        {optionLabels[userAnswer]} |
                        <span className='font-medium ml-1 sm:ml-2'>Benar:</span>{' '}
                        {optionLabels[correctIndex]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center'>
          <Link
            to={`/lesson/${lesson?.id}`}
            className='btn-secondary flex items-center justify-center text-sm sm:text-base px-3 sm:px-4 py-2'
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
                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              />
            </svg>
            <span className='hidden sm:inline'>Kembali ke Pembahasan</span>
            <span className='sm:hidden'>Pembahasan</span>
          </Link>

          {!passed && (
            <Link
              to={`/quiz/${lesson?.id}`}
              className='btn-primary flex items-center justify-center text-sm sm:text-base px-3 sm:px-4 py-2'
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
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              Coba Lagi
            </Link>
          )}

          <Link
            to='/dashboard'
            className='btn-outline flex items-center justify-center text-sm sm:text-base px-3 sm:px-4 py-2'
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
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Progress Summary */}
        {passed && (
          <div className='mt-4 sm:mt-8 card p-3 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'>
            <div className='flex items-center'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0'>
                <svg
                  className='w-5 h-5 sm:w-6 sm:h-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-sm sm:text-base font-semibold text-green-800'>
                  Progress Tersimpan!
                </h3>
                <p className='text-green-700 text-xs sm:text-sm'>
                  Pencapaian Anda telah disimpan. Lanjutkan ke pembahasan
                  selanjutnya.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResults;
