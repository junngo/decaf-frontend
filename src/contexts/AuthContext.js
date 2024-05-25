import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, checkRefreshToken } from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    tokens: {
      refresh: null,
      access: null
    }
  });
  const navigate = useNavigate();

  const login = (userData, tokens, keepLoggedIn) => {
    setAuthState({
      user: userData,
      tokens: tokens
    });

    if (keepLoggedIn) {
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
    } else {
      sessionStorage.setItem('accessToken', tokens.access);
      sessionStorage.setItem('refreshToken', tokens.refresh);
    }
  };

  const logout = async () => {
    const accessToken = authState.tokens.access;
    const refreshToken = authState.tokens.refresh;
    try {
      await logoutUser(accessToken, refreshToken);
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }

    setAuthState({
      user: null,
      tokens: {
        refresh: null,
        access: null
      }
    });
    // localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  };
  
  const refreshToken = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedRefreshToken) {
      try {
        const data = await checkRefreshToken(storedRefreshToken);
        setAuthState({
          user: data.user,
          tokens: {
            access: data.access,
            refresh: data.refresh
          }
        });
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
      } catch (error) {
        console.error("Session is not valid:", error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');  // Redirect to signin if refresh fails
      }
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ authState, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
