import { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Try to get user from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
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
        setCurrentUser(response.user);
        setError(null);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError(response.error || 'Session expired. Please login again.');
      }
      setLoading(false);
    } catch (err) {
      console.error('Check user status error:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setError('Session expired. Please login again.');
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
        return true;
      } else {
        setError(response.error || 'Login failed. Please check your credentials.');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.error || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await authLogout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;