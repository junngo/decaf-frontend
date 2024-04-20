import { useSetRecoilState } from 'recoil';
import { authState } from './authState';
import apiService from '../../api/apiService';

export function useAuthActions() {
  const setAuth = useSetRecoilState(authState);

  const login = async (credentials) => {
    try {
      const response = await apiService.signIn(credentials);
      const { jwt, user } = response.data;
      localStorage.setItem('token', jwt);
      setAuth({ isAuthenticated: true, token: jwt, user });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false, token: null, user: null });
  };

  return { login, logout };
}
