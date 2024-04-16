import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false, // This is the default value
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  signUp(userData) {
    return apiClient.post('/users/register', userData);
  },
  signIn(credentials) {
    return apiClient.post('/auth/signin', credentials);
  },
};
