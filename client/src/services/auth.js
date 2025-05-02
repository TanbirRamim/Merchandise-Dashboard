import axios from 'axios';

// Mock user data for development
const MOCK_USER = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin'
};

// Mock token
const MOCK_TOKEN = 'mock-jwt-token';

// Always use the Render backend URL
const API_URL = 'https://merchandise-dashboard.onrender.com';

// Configure axios defaults
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  console.log('Making request to:', config.url);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject({
        success: false,
        error: data.error || 'An error occurred',
        details: data.details,
        status
      });
    } else if (error.request) {
      return Promise.reject({
        success: false,
        error: 'Network error. Please check your connection.',
        details: null
      });
    } else {
      return Promise.reject({
        success: false,
        error: error.message,
        details: null
      });
    }
  }
);

export const register = async (name, email, password) => {
  try {
    console.log('Mock registration with:', { name, email });
    
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

    // Mock successful registration
    localStorage.setItem('token', MOCK_TOKEN);
    return { 
      success: true, 
      user: { ...MOCK_USER, name, email } 
    };
  } catch (error) {
    return error;
  }
};

export const login = async (email, password) => {
  try {
    console.log('Mock login with:', { email });

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

    // Mock successful login
    localStorage.setItem('token', MOCK_TOKEN);
    return { 
      success: true, 
      user: { ...MOCK_USER, email } 
    };
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    console.log('Getting mock current user');
    const token = localStorage.getItem('token');
    
    if (!token) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    return { 
      success: true, 
      user: MOCK_USER 
    };
  } catch (error) {
    return error;
  }
};