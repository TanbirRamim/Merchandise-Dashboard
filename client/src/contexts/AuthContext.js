import { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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

  const checkUserStatus = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setCurrentUser(response.user);
      } else {
        localStorage.removeItem('token');
        setError('Session expired. Please login again.');
      }
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      setError('Session expired. Please login again.');
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      if (response.success) {
        setCurrentUser(response.user);
        setError(null);
        return true;
      } else {
        setError(response.error || 'Login failed');
        return false;
      }
    } catch (err) {
      setError(err.error || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    authLogout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;