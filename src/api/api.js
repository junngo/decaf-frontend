import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

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
