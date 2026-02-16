import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';
import { getDemoCourseWithDetails } from '../data/demoData';

const CourseDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedModules, setExpandedModules] = useState({});
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await api.getCourse(id);
        setCourse(response.data.course);
        setUserProgress(response.data.userProgress || []);
        setIsDemo(false); // Successfully loaded from backend

        // Expand first module by default
        if (response.data.course?.modules?.length > 0) {
          setExpandedModules({ [response.data.course.modules[0].id]: true });
        }
      } catch (err) {
        console.error('Error fetching course:', err);

        // Only use demo data if user is NOT authenticated
        if (!isAuthenticated) {
          const demoCourse = getDemoCourseWithDetails(id);
          if (demoCourse) {
            setCourse(demoCourse);
            setIsDemo(true);
            // Expand first module by default
            if (demoCourse.modules?.length > 0) {
              setExpandedModules({ [demoCourse.modules[0].id]: true });
            }
          } else {
            setError('Course tidak ditemukan.');
          }
        } else {
          // User is authenticated but API failed - show error, don't use demo
          setError('Gagal memuat course. Silakan coba lagi.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, isAuthenticated]);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const getLessonProgress = (lessonId) => {
    return userProgress.find((p) => p.lesson_id === lessonId);
  };

  const getTotalLessons = () => {
    return (
      course?.modules?.reduce(
        (acc, module) => acc + (module.lessons?.length || 0),
        0,
      ) || 0
    );
  };

  const getCompletedLessons = () => {
    return userProgress.filter((p) => p.completed === true).length;
  };

  if (loading) {
    return (
      <div className='page-container py-12'>
        <div className='container-main'>
          <Loading size='lg' text='Memuat materi...' />
        </div>
      </div>
    );
  }

  // Only show error if loading is complete and there's actually an error or no course
  if (!loading && (error || !course)) {
    return (
      <div className='page-container py-12'>
        <div className='container-main text-center'>
          <svg
            className='w-16 h-16 text-gray-300 mx-auto mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Materi tidak ditemukan
          </h2>
          <p className='text-gray-500 mb-4'>{error || 'Course tidak tersedia'}</p>
          <Link to='/courses' className='btn-primary'>
            Kembali ke Materi TKA
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage =
    getTotalLessons() > 0
      ? Math.round((getCompletedLessons() / getTotalLessons()) * 100)
      : 0;

  return (
    <div className='page-container py-4 sm:py-8'>
      <div className='container-main px-3 sm:px-4'>
        {/* Demo Mode Banner */}
        {isDemo && (
          <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700'>
            <div className='flex items-center'>
              <svg
                className='w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='text-xs sm:text-sm'>
                <strong>Mode Demo:</strong> Data contoh dengan video. Login
                untuk tracking.
              </span>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <nav className='flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6'>
          <Link to='/courses' className='hover:text-primary-600 dark:hover:text-primary-400'>
            Materi
          </Link>
          <svg
            className='w-3 h-3 sm:w-4 sm:h-4'
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
          <span className='text-gray-900 dark:text-white truncate'>{course.title}</span>
        </nav>

        <div className='grid lg:grid-cols-3 gap-4 sm:gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Course Header */}
            <div className='card p-4 sm:p-8 mb-4 sm:mb-6'>
              <span className='inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4'>
                {course.category}
              </span>
              <h1 className='text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4'>
                {course.title}
              </h1>
              <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-lg mb-4 sm:mb-6'>
                {course.description}
              </p>

              {/* Progress Bar */}
              {isAuthenticated && (
                <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4'>
                  <div className='flex justify-between text-xs sm:text-sm mb-2'>
                    <span className='text-gray-600 dark:text-gray-300'>Progress Anda</span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-primary-600 rounded-full transition-all duration-300'
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className='text-xs text-gray-500 mt-2'>
                    {getCompletedLessons()} / {getTotalLessons()} selesai
                  </p>
                </div>
              )}
            </div>

            {/* Modules */}
            <div className='space-y-3 sm:space-y-4'>
              <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4'>
                Materi Pembelajaran
              </h2>

              {course.modules?.length === 0 ? (
                <div className='card p-6 sm:p-8 text-center'>
                  <p className='text-gray-500 text-sm'>
                    Belum ada materi untuk subtes ini
                  </p>
                </div>
              ) : (
                course.modules?.map((module, moduleIndex) => (
                  <div key={module.id} className='card overflow-hidden'>
                    <button
                      onClick={() => toggleModule(module.id)}
                      className='w-full p-3 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors'
                    >
                      <div className='flex items-center space-x-2 sm:space-x-4'>
                        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-semibold text-sm sm:text-base'>
                          {moduleIndex + 1}
                        </div>
                        <div className='text-left'>
                          <h3 className='font-semibold text-gray-900 text-sm sm:text-base'>
                            {module.title}
                          </h3>
                          <p className='text-xs sm:text-sm text-gray-500'>
                            {module.lessons?.length || 0} lessons
                          </p>
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${expandedModules[module.id] ? 'rotate-180' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>

                    {expandedModules[module.id] && (
                      <div className='border-t border-gray-100'>
                        {module.lessons?.length === 0 ? (
                          <p className='p-3 sm:p-5 text-gray-500 text-xs sm:text-sm'>
                            Belum ada lesson
                          </p>
                        ) : (
                          module.lessons?.map((lesson, lessonIndex) => {
                            const progress = getLessonProgress(lesson.id);
                            const isCompleted = progress?.completed === true;
                            const isOngoing = progress && !progress.completed;

                            return (
                              <Link
                                key={lesson.id}
                                to={
                                  isAuthenticated || isDemo
                                    ? `/lesson/${lesson.id}`
                                    : '/login'
                                }
                                className='flex items-center justify-between p-3 sm:p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0'
                              >
                                <div className='flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1'>
                                  <div
                                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted
                                      ? 'bg-green-100 text-green-600'
                                      : isOngoing
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-400'
                                      }`}
                                  >
                                    {isCompleted ? (
                                      <svg
                                        className='w-3 h-3 sm:w-4 sm:h-4'
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
                                    ) : (
                                      <span className='text-xs sm:text-sm font-medium'>
                                        {lessonIndex + 1}
                                      </span>
                                    )}
                                  </div>
                                  <div className='min-w-0 flex-1'>
                                    <p className='font-medium text-gray-900 text-xs sm:text-base truncate'>
                                      {lesson.title}
                                    </p>
                                    {progress?.score !== undefined && (
                                      <p className='text-xs text-gray-500'>
                                        Skor: {progress.score}%
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className='flex items-center space-x-2 sm:space-x-3 flex-shrink-0'>
                                  <svg
                                    className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                                    />
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                  </svg>
                                  <svg
                                    className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hidden sm:block'
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
                                </div>
                              </Link>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className='hidden lg:block lg:col-span-1'>
            <div className='card p-4 sm:p-6 sticky top-24'>
              <h3 className='font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base'>
                Info Course
              </h3>

              <div className='space-y-3 sm:space-y-4'>
                <div className='flex items-center text-gray-600 text-sm'>
                  <svg
                    className='w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                    />
                  </svg>
                  {course.modules?.length || 0} Modules
                </div>

                <div className='flex items-center text-gray-600 dark:text-gray-300 text-sm'>
                  <svg
                    className='w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 dark:text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                    />
                  </svg>
                  {getTotalLessons()} Video Lessons
                </div>

                <div className='flex items-center text-gray-600 text-sm'>
                  <svg
                    className='w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                    />
                  </svg>
                  Quiz di setiap lesson
                </div>
              </div>

              {/* CTA */}
              {!isAuthenticated && !isDemo ? (
                <Link
                  to='/login'
                  className='btn-primary w-full mt-4 sm:mt-6 text-sm sm:text-base'
                >
                  Login untuk Mulai
                </Link>
              ) : course.modules?.length > 0 &&
                course.modules[0].lessons?.length > 0 ? (
                <Link
                  to={`/lesson/${course.modules[0].lessons[0].id}`}
                  className='btn-primary w-full mt-4 sm:mt-6 text-sm sm:text-base'
                >
                  {getCompletedLessons() > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
