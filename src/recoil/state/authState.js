import { atom, selector } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: selector({
    key: 'authState/Default',
    get: ({get}) => {
      const token = localStorage.getItem('token');
      return {
        isAuthenticated: !!token,
        token: token,
        user: null,
      };
    },
  }),
});
