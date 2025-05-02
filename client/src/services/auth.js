import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed'
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/me`);
    return { success: true, user: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to get user info'
    };
  }
};