import axios from 'axios';

// Always use the Render backend URL
const API_URL = 'https://merchandise-dashboard.onrender.com';

// Configure axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for authentication
axios.interceptors.request.use((config) => {
  console.log('Making request to:', config.url);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const register = async (name, email, password) => {
  try {
    console.log('Attempting registration with:', { name, email });
    console.log('Using API URL:', API_URL);
    
    // Validate input
    if (!name || !email || !password) {
      return {
        success: false,
        error: 'All fields are required',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      };
    }

    const response = await axios.post(`${API_URL}/api/register`, { name, email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Registration failed. Please try again.',
      details: error.response?.data?.details
    };
  }
};

export const login = async (email, password) => {
  try {
    console.log('Attempting login with:', { email });
    console.log('Using API URL:', API_URL);

    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      };
    }

    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed',
      details: error.response?.data?.details
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    console.log('Getting current user');
    console.log('Using API URL:', API_URL);
    
    const response = await axios.get(`${API_URL}/api/me`);
    return { success: true, user: response.data };
  } catch (error) {
    console.error('Get current user error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to get user info'
    };
  }
};