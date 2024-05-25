import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// authApiClient for authenticated requests
const authApiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false
});
authApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signUp(userData) {
    return apiClient.post('/users/register', userData);
  },
  signIn(credentials) {
    return apiClient.post('/auth/signin', credentials);
  },
  getCategories() {
    return authApiClient.get('/categories');
  },
  // Add a new category
  addCategory(categoryData) {
    return authApiClient.post('/categories', categoryData);
  },
  // Update an existing category
  updateCategory(categoryId, categoryData) {
    return authApiClient.put(`/categories/${categoryId}`, categoryData);
  },
  // Delete a category
  deleteCategory(categoryId) {
    return authApiClient.delete(`/categories/${categoryId}`);
  },
};
