import axios from 'axios';

// Always use the Render backend URL
const API_URL = 'https://merchandise-dashboard.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
  timeout: 10000 // 10 seconds timeout
});

// Add request interceptor for logging and auth
api.interceptors.request.use(
  (config) => {
    // Don't log sensitive data
    const safeUrl = config.url.replace(/\/login/, '/***');
    console.log('Making API request to:', safeUrl);
    
    // Get token from cookie if available
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Validate response format
    if (!response.data) {
      return Promise.reject({
        success: false,
        error: 'Invalid response from server',
        details: 'Response data is missing'
      });
    }
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      return Promise.reject({
        success: false,
        error: data?.error || 'Server error',
        details: data?.details,
        status: status
      });
    }
    
    return Promise.reject({
      success: false,
      error: 'Network error',
      details: error.message,
      status: 0
    });
  }
);

// Auth functions
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return { success: true, data: response.data };
  } catch (error) {
    // Don't return the error object directly, return a formatted error response
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Registration failed',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me');
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to get user data',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch products',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export const fetchDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch dashboard stats',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to create product',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to update product',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to delete product',
      details: error.response?.data?.details,
      status: error.response?.status || 500
    };
  }
};

export default api;