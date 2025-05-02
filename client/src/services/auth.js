import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data && response.data.token) {
      // Set token in cookie with appropriate settings
      const cookieOptions = {
        path: '/',
        secure: true,
        sameSite: 'none'
      };
      document.cookie = `token=${response.data.token}; ${Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')}`;
      
      return {
        success: true,
        user: response.data.user
      };
    }
    return {
      success: true,
      error: 'Invalid response from server'
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed. Please check your credentials.',
      details: error.response?.data?.details,
      status: error.response?.status
    };
  }
};

export const logout = async () => {
  try {
    // Clear token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me');
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