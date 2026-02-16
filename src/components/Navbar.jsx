import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 transition-colors'>
      <div className='container-main'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center shadow-md'>
              <svg
                className='w-5 h-5 text-white'
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
            </div>
            <span className='text-xl font-bold text-gradient dark:text-white'>TKA Master</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              to='/courses'
              className='text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
            >
              Materi TKA
            </Link>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {isAuthenticated ? (
              <>
                <Link
                  to='/dashboard'
                  className='text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
                >
                  Dashboard
                </Link>

                {/* User Profile Dropdown */}
                <div className='relative' ref={profileRef}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className='flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors cursor-pointer'
                  >
                    <div className='w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center'>
                      <span className='text-white font-medium text-sm'>
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className='text-sm text-gray-700 dark:text-gray-300 font-medium'>
                      {user?.name}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`}
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

                  {/* Dropdown Menu */}
                  {profileMenuOpen && (
                    <div className='absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-100 dark:border-slate-700 py-2 z-50'>
                      {/* User Info */}
                      <div className='px-4 py-3 border-b border-gray-100 dark:border-slate-700'>
                        <p className='text-sm font-medium text-gray-900 dark:text-slate-100'>
                          {user?.name}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-slate-400 mt-1'>
                          {user?.email}
                        </p>
                        <p className='text-xs text-primary-600 dark:text-primary-400 mt-1 font-medium capitalize'>
                          {user?.role || 'Student'}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className='py-1'>
                        <Link
                          to='/dashboard'
                          onClick={() => setProfileMenuOpen(false)}
                          className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'
                        >
                          <svg
                            className='w-4 h-4 mr-3 text-gray-400'
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

                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            handleLogout();
                          }}
                          className='flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                        >
                          <svg
                            className='w-4 h-4 mr-3'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/login'
                  className='text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium'
                >
                  Login
                </Link>
                <Link to='/register' className='btn-accent'>
                  Mulai Latihan
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800'
          >
            <svg
              className='w-6 h-6 text-gray-600 dark:text-slate-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-100'>
            <div className='flex flex-col space-y-4'>
              <Link
                to='/courses'
                className='text-gray-600 hover:text-primary-600 transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                Materi TKA
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to='/dashboard'
                    className='text-gray-600 hover:text-primary-600 transition-colors'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className='text-left text-gray-600 hover:text-primary-600 transition-colors'
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='text-gray-600 hover:text-primary-600 transition-colors'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='btn-primary text-center'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mulai Latihan
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
