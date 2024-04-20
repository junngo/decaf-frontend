import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false, // This is the default value
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
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
    return apiClient.get('/categories');
  },
  // Add a new category
  addCategory(categoryData) {
    return apiClient.post('/categories', categoryData);
  },
  // Update an existing category
  updateCategory(categoryId, categoryData) {
    return apiClient.put(`/categories/${categoryId}`, categoryData);
  },
  // Delete a category
  deleteCategory(categoryId) {
    return apiClient.delete(`/categories/${categoryId}`);
  },
};
