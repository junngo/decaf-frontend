import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
      'Content-Type': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
});

const getAuthToken = () => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};

api.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// User API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/register/`, userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login/`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (accessToken, refreshToken) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };
    await axios.post(
      `${API_URL}/api/users/logout/`
      , { token: refreshToken }
      , config
    );
  } catch (error) {
    throw error;
  }
};

export const checkRefreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/refresh/`, { refresh: refreshToken });
    return response.data;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
};

// Cateogry API
export const fetchCategories = async () => {
  try {
      const response = await api.get('/accounts/categories/');
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const createCategory = async (category) => {
  try {
      const response = await api.post('/accounts/categories/', category);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const updateCategory = async (categoryId, category) => {
  try {
      const response = await api.put(`/accounts/categories/${categoryId}/`, category);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
      const response = await api.delete(`/accounts/categories/${categoryId}/`);
      return response.data;
  } catch (error) {
      throw error;
  }
};

// Account API
export const fetchAccounts = async () => {
  try {
      const response = await api.get('/accounts/account/');
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const createAccount = async (account) => {
  try {
      const response = await api.post('/accounts/account/', account);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const updateAccount = async (accountId, account) => {
  try {
      const response = await api.put(`/accounts/account/${accountId}/`, account);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const deleteAccount = async (accountId) => {
  try {
      const response = await api.delete(`/accounts/account/${accountId}/`);
      return response.data;
  } catch (error) {
      throw error;
  }
};
