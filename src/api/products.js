import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';
const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken');
    }
    return Promise.reject(err);
  }
);

export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getDashboardStats = () => API.get('/products/dashboard');
export const getAllProductsAdmin = () => API.get('/products/all');

export const loginAdmin = (data) => API.post('/auth/login', data);
export const getAdminProfile = () => API.get('/auth/profile');

export default API;