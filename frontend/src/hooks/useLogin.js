import { useState } from 'react';
import { dispatch } from './useAuthContext';
import { AUTH_ACTION_TYPES } from '../contexts/auth.context';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch('/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({ email, password }),
      },
    });
    const json = await response.json();
    // Check if api call was successful
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(json));
      // Login success
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN, payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
