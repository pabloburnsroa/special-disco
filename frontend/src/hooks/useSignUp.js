import { useState } from 'react';
import { dispatch } from './useAuthContext';
import { AUTH_ACTION_TYPES } from '../contexts/auth.context';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch('/api/auth/signup/', {
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
  return { signUp, isLoading, error };
};
