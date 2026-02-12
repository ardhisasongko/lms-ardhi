import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import { DEMO_COURSES, DEMO_CATEGORIES } from '../data/demoData';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response.data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Use demo categories if API fails
        setCategories(DEMO_CATEGORIES);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.getCourses(page, 9, selectedCategory);
        setCourses(response.data.courses || []);
        setPagination(response.data.pagination);
        setIsDemo(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        // Use demo courses if API fails
        let filteredCourses = DEMO_COURSES;
        if (selectedCategory) {
          filteredCourses = DEMO_COURSES.filter(
            (c) => c.category === selectedCategory,
          );
        }
        setCourses(filteredCourses);
        setPagination(null);
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [page, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  // Get category-specific colors
  const getCategoryColors = (category) => {
    const colors = {
      Penalaran: {
        bg: 'from-primary-500 to-primary-600',
        badge: 'bg-primary-100 text-primary-700',
      },
      Kuantitatif: {
        bg: 'from-secondary-500 to-secondary-600',
        badge: 'bg-secondary-100 text-secondary-700',
      },
      PPU: {
        bg: 'from-accent-500 to-accent-600',
        badge: 'bg-accent-100 text-accent-700',
      },
      Literasi: {
        bg: 'from-green-500 to-green-600',
        badge: 'bg-green-100 text-green-700',
      },
    };
    return (
      colors[category] || {
        bg: 'from-gray-500 to-gray-600',
        badge: 'bg-gray-100 text-gray-700',
      }
    );
  };

  return (
    <div className='page-container py-4 sm:py-8'>
      <div className='container-main px-3 sm:px-4'>
        {/* Demo Mode Banner */}
        {isDemo && (
          <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl'>
            <div className='flex items-center'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0'>
                <svg
                  className='w-4 h-4 sm:w-5 sm:h-5 text-white'
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
              </div>
              <div>
                <span className='font-semibold text-primary-700 text-sm sm:text-base'>
                  Mode Demo
                </span>
                <p className='text-xs sm:text-sm text-gray-600'>
                  Data contoh. Klik materi untuk video & latihan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className='mb-4 sm:mb-8'>
          <span className='inline-block px-3 sm:px-4 py-1 bg-accent-100 text-accent-700 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3'>
            📚 Katalog TKA
          </span>
          <h1 className='text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
            Jelajahi <span className='text-gradient'>Materi TKA</span>
          </h1>
          <p className='text-gray-600 text-sm sm:text-base'>
            Pilih subtes yang ingin dipelajari
          </p>
        </div>

        {/* Filters */}
        <div className='mb-4 sm:mb-8 flex flex-wrap gap-1.5 sm:gap-2'>
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === ''
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ✨ Semua
          </button>
          {categories.map((category) => {
            const catColors = getCategoryColors(category);
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${catColors.bg} text-white shadow-md`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'>
            {error}
          </div>
        )}

        {loading ? (
          <Loading size='lg' text='Memuat courses...' />
        ) : courses.length === 0 ? (
          <div className='text-center py-8 sm:py-12'>
            <svg
              className='w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4'
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
            <h3 className='text-base sm:text-lg font-medium text-gray-900 mb-1'>
              Belum ada course
            </h3>
            <p className='text-gray-500 text-sm'>Course akan segera tersedia</p>
          </div>
        ) : (
          <>
            {/* Course Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>
              {courses.map((course) => {
                const colors = getCategoryColors(course.category);
                return (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className='card-hover group'
                  >
                    <div
                      className={`h-32 sm:h-44 bg-gradient-to-br ${colors.bg} flex items-center justify-center relative overflow-hidden`}
                    >
                      <svg
                        className='w-14 h-14 sm:w-20 sm:h-20 text-white/20 group-hover:scale-110 transition-transform'
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
                      <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
                    </div>
                    <div className='p-3 sm:p-5'>
                      <span
                        className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 ${colors.badge} text-xs font-medium rounded-full mb-2 sm:mb-3`}
                      >
                        {course.category}
                      </span>
                      <h3 className='font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors text-sm sm:text-base'>
                        {course.title}
                      </h3>
                      <p className='text-gray-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4'>
                        {course.description}
                      </p>
                      <div className='flex items-center justify-between text-xs sm:text-sm'>
                        <div className='flex items-center text-gray-400'>
                          <svg
                            className='w-3 h-3 sm:w-4 sm:h-4 mr-1'
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
                          {course.moduleCount || 0} Modules
                        </div>
                        <span className='text-primary-600 font-medium group-hover:translate-x-1 transition-transform inline-block'>
                          Mulai →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className='flex justify-center gap-1.5 sm:gap-2'>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className='px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm'
                >
                  <span className='hidden sm:inline'>Previous</span>
                  <span className='sm:hidden'>←</span>
                </button>

                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                      page === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pagination.totalPages}
                  className='px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm'
                >
                  <span className='hidden sm:inline'>Next</span>
                  <span className='sm:hidden'>→</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
