import { useAuthContext } from './useAuthContext';
import { AUTH_ACTION_TYPES } from '../contexts/auth.context';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
  };
  return { logout };
};
