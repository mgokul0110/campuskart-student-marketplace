import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productAPI = {
  getAll: () => api.get('/products'),
  add: (productData) => api.post('/products/add', productData),
};

export const requestAPI = {
  create: (productId, type) => api.post('/requests/create', { productId, type }),
  getMyRequests: () => api.get('/requests/my-requests'),
  getReceived: () => api.get('/requests/received'),
  updateStatus: (id, status) => api.put(`/requests/status/${id}`, { status }),
};

export default api;
