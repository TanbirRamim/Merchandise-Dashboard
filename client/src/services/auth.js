import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      return {
        success: true,
        user: response.data.user
      };
    }
    return {
      success: false,
      error: 'Invalid response from server'
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed. Please check your credentials.'
    };
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    if (response.data) {
      return {
        success: true,
        user: response.data
      };
    }
    return {
      success: false,
      error: 'Invalid response from server'
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to get user data'
    };
  }
}; 