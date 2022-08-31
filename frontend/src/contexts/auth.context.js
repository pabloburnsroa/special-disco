import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const AUTH_ACTION_TYPES = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ACTION_TYPES.LOGIN:
      return {
        user: payload,
      };
    case AUTH_ACTION_TYPES.LOGOUT:
      return {
        user: null,
      };
    default: {
      return state;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
