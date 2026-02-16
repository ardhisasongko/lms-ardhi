import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const lastVerified = localStorage.getItem('lastVerified');

      if (token && storedUser) {
        // OPTIMIZED: Skip verification if recently verified (<1 hour)
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        if (lastVerified && now - parseInt(lastVerified) < oneHour) {
          // Recently verified, skip API call (instant)
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            localStorage.clear();
          }
          setLoading(false);
          return;
        }

        // Verify with backend (only if >1 hour old or never verified)
        try {
          const response = await api.getProfile();
          setUser(response.data.user);
          localStorage.setItem('lastVerified', now.toString());
        } catch (err) {
          // Token invalid, clear storage
          localStorage.clear();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);

      // Backend login
      const response = await api.login(email, password);
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('lastVerified', Date.now().toString());
      setUser(user);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password, role = 'student') => {
    try {
      setError(null);

      const response = await api.register(name, email, password, role);
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('lastVerified', Date.now().toString());
      setUser(user);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor' || user?.role === 'admin';

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isInstructor,
    login,
    register,
    logout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
