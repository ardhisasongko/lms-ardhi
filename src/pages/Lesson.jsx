import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';
import { getDemoLessonWithDetails } from '../data/demoData';

const Lesson = () => {
  const { id } = useParams();
  const { isAuthenticated, isDemo: isDemoAuth } = useAuth();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [navigation, setNavigation] = useState({
    prevLesson: null,
    nextLesson: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);

        // If authenticated, try to fetch from API
        if (isAuthenticated) {
          const response = await api.getLesson(id);
          setLesson(response.data.lesson);
          setQuizzes(response.data.quizzes || []);
          setUserProgress(response.data.userProgress);
          setNavigation(response.data.navigation);
          setIsDemo(isDemoAuth); // gunakan status demo dari context
        } else {
          // Not authenticated - try demo data
          setIsDemo(true);
          const demoData = getDemoLessonWithDetails(id);
          if (demoData) {
            setLesson(demoData.lesson);
            setQuizzes(demoData.quizzes);
            setNavigation(demoData.navigation);
          } else {
            setError('Lesson tidak ditemukan.');
          }
        }
      } catch (err) {
        console.error('Error fetching lesson:', err);

        // Try demo data
        const demoData = getDemoLessonWithDetails(id);
        if (demoData) {
          setLesson(demoData.lesson);
          setQuizzes(demoData.quizzes);
          setNavigation(demoData.navigation);
          setIsDemo(true);
        } else {
          setError('Lesson tidak ditemukan.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id, isAuthenticated]);

  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // PATCH: fallback ke youtube_url jika video_url tidak ada
  // PATCH: Cek null sebelum akses video_url/youtube_url
  const youtubeId = lesson
    ? extractYouTubeId(lesson.video_url || lesson.youtube_url)
    : null;

  if (loading) {
    return (
      <div className='page-container py-12'>
        <div className='container-main'>
          <Loading size='lg' text='Memuat pembahasan...' />
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className='page-container py-12'>
        <div className='container-main text-center'>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Pembahasan tidak ditemukan
          </h2>
          <p className='text-gray-500 mb-4'>{error}</p>
          <Link to='/courses' className='btn-primary'>
            Kembali ke Materi TKA
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='page-container py-4 sm:py-6'>
      <div className='container-main px-3 sm:px-4'>
        {/* Demo Mode Banner: hanya tampil jika belum login */}
        {isDemo && !isAuthenticated && false && (
          <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm'>
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
              <span>
                <strong>Mode Demo:</strong> Login untuk menyimpan progress.
              </span>
            </div>
          </div>
        )}

        {/* Header Course Info (if available) */}
        {lesson.course && (
          <div className='card p-4 sm:p-6 mb-4 sm:mb-6'>
            <span className='inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium rounded-full mb-2 sm:mb-3'>
              {lesson.course.category}
            </span>
            <h1 className='text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2'>
              {lesson.course.title}
            </h1>
            <p className='text-gray-600 text-xs sm:text-base mb-2 sm:mb-4'>
              {lesson.course.description}
            </p>
          </div>
        )}

        {/* Breadcrumb */}
        <nav className='flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 flex-wrap'>
          <Link to='/courses' className='hover:text-primary-600'>
            TKA
          </Link>
          <svg
            className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0'
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
          <Link
            to={`/lesson/${lesson.id}`}
            className='hover:text-primary-600 truncate max-w-[100px] sm:max-w-none'
          >
            {lesson.title}
          </Link>
        </nav>

        <div className='grid lg:grid-cols-3 gap-4 sm:gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Video Player - Only show if video exists */}
            {(lesson.video_url || lesson.youtube_url) && (
              <div className='card overflow-hidden mb-4 sm:mb-6'>
                {youtubeId ? (
                  <div className='video-container'>
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                      title={lesson.title}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      loading='lazy'
                    />
                  </div>
                ) : (
                  <div className='aspect-video bg-gray-100 flex items-center justify-center'>
                    <div className='text-center text-gray-500'>
                      <svg
                        className='w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 opacity-50'
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
                      <p className='text-sm'>Video tidak tersedia</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Lesson Info */}
            <div className='card p-3 sm:p-6 mb-4 sm:mb-6'>
              <h1 className='text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4'>
                {lesson.title}
              </h1>
              {lesson.module && (
                <p className='text-gray-500 mb-2 sm:mb-4 text-xs sm:text-base'>
                  <span className='font-medium'>Module:</span>{' '}
                  {lesson.module.title}
                </p>
              )}
              {lesson.summary && (
                <div className='prose prose-gray max-w-none prose-sm sm:prose-base'>
                  <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2'>
                    Ringkasan
                  </h3>
                  <p className='text-gray-600 whitespace-pre-line text-sm sm:text-base'>
                    {lesson.summary}
                  </p>
                </div>
              )}
            </div>

            {/* Quiz Section */}
            {quizzes.length > 0 && (
              <div className='card p-3 sm:p-6 mb-4 sm:mb-6'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0'>
                  <div>
                    <h3 className='text-base sm:text-lg font-semibold text-gray-900'>
                      Latihan Soal
                    </h3>
                    <p className='text-gray-500 text-xs sm:text-sm mt-1'>
                      {quizzes.length} soal • Min 70%
                    </p>
                    {userProgress && (
                      <p
                        className={`text-xs sm:text-sm mt-1 sm:mt-2 font-medium ${userProgress.completed
                            ? 'text-green-600'
                            : 'text-orange-600'
                          }`}
                      >
                        {userProgress.completed
                          ? `Skor: ${userProgress.score}%`
                          : `Skor terakhir: ${userProgress.score}%`}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/quiz/${id}`}
                    className='btn-primary text-sm sm:text-base py-2 px-3 sm:py-2.5 sm:px-4 w-full sm:w-auto text-center'
                  >
                    {userProgress ? 'Ulangi' : 'Mulai'}
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className='flex justify-between items-center mt-4 sm:mt-6 gap-2'>
              {navigation.prevLesson ? (
                <Link
                  to={`/lesson/${navigation.prevLesson.id}`}
                  className='flex items-center text-gray-600 hover:text-primary-600 transition-colors flex-1 min-w-0'
                >
                  <svg
                    className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0'
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
                  <div className='text-left min-w-0'>
                    <p className='text-xs text-gray-400 hidden sm:block'>
                      Sebelumnya
                    </p>
                    <p className='font-medium text-xs sm:text-base truncate'>
                      {navigation.prevLesson.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className='flex-1' />
              )}

              {navigation.nextLesson ? (
                <Link
                  to={`/lesson/${navigation.nextLesson.id}`}
                  className='flex items-center text-gray-600 hover:text-primary-600 transition-colors flex-1 min-w-0 justify-end'
                >
                  <div className='text-right min-w-0'>
                    <p className='text-xs text-gray-400 hidden sm:block'>
                      Selanjutnya
                    </p>
                    <p className='font-medium text-xs sm:text-base truncate'>
                      {navigation.nextLesson.title}
                    </p>
                  </div>
                  <svg
                    className='w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 flex-shrink-0'
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
                </Link>
              ) : (
                <div className='flex-1' />
              )}
            </div>
          </div>

          {/* Sidebar - Hidden on mobile, shown in quiz section instead */}
          <div className='hidden lg:block lg:col-span-1'>
            <div className='card p-4 sm:p-6 sticky top-24'>
              <h3 className='font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base'>
                Status
              </h3>

              <div className='space-y-3 sm:space-y-4'>
                {/* Completion Status */}
                <div
                  className={`p-3 sm:p-4 rounded-lg ${userProgress?.completed
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                    }`}
                >
                  <div className='flex items-center'>
                    {userProgress?.completed ? (
                      <>
                        <svg
                          className='w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2'
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
                        <span className='text-green-700 font-medium text-sm sm:text-base'>
                          Selesai
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span className='text-gray-600 font-medium text-sm sm:text-base'>
                          Dalam Progress
                        </span>
                      </>
                    )}
                  </div>
                  {userProgress?.score !== undefined && (
                    <p className='text-xs sm:text-sm mt-2 text-gray-600'>
                      Skor Quiz:{' '}
                      <span className='font-semibold'>
                        {userProgress.score}%
                      </span>
                    </p>
                  )}
                </div>

                {/* Back to Course */}
                {lesson.course && (
                  <Link
                    to={`/course/${lesson.course.id}`}
                    className='btn-outline w-full text-sm sm:text-base'
                  >
                    Lihat Semua Materi
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
