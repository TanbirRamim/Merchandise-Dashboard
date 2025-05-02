import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    // Try to get user from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists in cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      checkUserStatus();
    } else {
      setLoading(false);
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  const checkUserStatus = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setCurrentUser(response.data);
        setError(null);
      } else {
        // Clear token cookie and user data
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('user');
        setCurrentUser(null);
        setError(response.error || 'Session expired. Please login again.');
        navigate('/login');
      }
      setLoading(false);
    } catch (err) {
      console.error('Check user status error:', err);
      // Clear token cookie and user data
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem('user');
      setCurrentUser(null);
      setError('Session expired. Please login again.');
      navigate('/login');
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authLogin(email, password);
      if (response.success) {
        setCurrentUser(response.user);
        setError(null);
        navigate('/');
        return true;
      } else {
        setError(response.error || 'Login failed. Please check your credentials.');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.shouldRedirect) {
        navigate('/login');
      }
      setError(err.error || 'An unexpected error occurred');
      return false;
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setCurrentUser(null);
      setError(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout');
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;