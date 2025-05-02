import axios from 'axios';

// Always use the Render backend URL
const API_URL = 'https://merchandise-dashboard.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
  withCredentials: true, // Important for cookies
  timeout: 10000 // 10 seconds timeout
});

// Add request interceptor for logging and auth
api.interceptors.request.use(
  (config) => {
    // Don't log sensitive data
    const safeUrl = config.url.replace(/\/auth\/login/, '/auth/***');
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
    console.error('API Error:', error.response?.data || error.message);
    
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
        error: data.error || 'An error occurred',
        details: data.details,
        status
      });
    } else if (error.request) {
      // Network error
      return Promise.reject({
        success: false,
        error: 'Network error. Please check your connection.',
        details: null
      });
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      return Promise.reject({
        success: false,
        error: 'Request timeout. Please try again.',
        details: null
      });
    } else {
      // Other errors
      return Promise.reject({
        success: false,
        error: error.message || 'An unexpected error occurred',
        details: null
      });
    }
  }
);

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return { success: true, data: response.data };
  } catch (error) {
    return error;
  }
};

export const fetchDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return { success: true, data: response.data };
  } catch (error) {
    return error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return { success: true, data: response.data };
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return { success: true, data: response.data };
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    return { success: true };
  } catch (error) {
    return error;
  }
};

export default api;