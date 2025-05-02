import axios from 'axios';

// Always use the Render backend URL
const API_URL = 'https://merchandise-dashboard.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for logging and auth
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url);
    const token = localStorage.getItem('token');
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
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
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
      // The request was made but no response was received
      return Promise.reject({
        success: false,
        error: 'Network error. Please check your connection.',
        details: null
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        success: false,
        error: error.message,
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
    const response = await api.post('/products', { product: productData });
    return { success: true, data: response.data };
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, { product: productData });
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