import axios from 'axios';

// Mock data for development
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for product 1',
    price: 99.99,
    stock: 100,
    sales: 50,
    revenue: 4999.50
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for product 2',
    price: 149.99,
    stock: 75,
    sales: 25,
    revenue: 3749.75
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for product 3',
    price: 199.99,
    stock: 50,
    sales: 10,
    revenue: 1999.90
  }
];

const MOCK_STATS = {
  totalProducts: 3,
  totalSales: 85,
  totalRevenue: 10749.15,
  totalCustomers: 50
};

// Always use the Render backend URL
const API_URL = 'https://merchandise-dashboard.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
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

export const fetchProducts = async () => {
  try {
    // For development, return mock data
    return { success: true, data: MOCK_PRODUCTS };
  } catch (error) {
    return error;
  }
};

export const fetchDashboardStats = async () => {
  try {
    // For development, return mock data
    return { success: true, data: MOCK_STATS };
  } catch (error) {
    return error;
  }
};

export const createProduct = async (productData) => {
  try {
    // For development, simulate success
    const newProduct = {
      id: Date.now(),
      ...productData,
      sales: 0,
      revenue: 0
    };
    return { success: true, data: newProduct };
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    // For development, simulate success
    return { success: true, data: { id, ...productData } };
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    // For development, simulate success
    return { success: true };
  } catch (error) {
    return error;
  }
};

export default api;