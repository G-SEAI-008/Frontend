import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

import type { AuthUser, AuthContextType } from '@/types';

import { AuthContext } from '.';
import { ApiErrorSchema, AuthUserSchema } from '../schemas/api';

const API_URL = import.meta.env.VITE_EVENTS_API_URL;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const tryToLoginUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const error = ApiErrorSchema.parse(await response.json());
            throw new Error(error.message ?? 'Failed to get profile');
          }
          const profile = AuthUserSchema.parse(await response.json());
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(profile));
          setUser(profile);
        } catch {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    void tryToLoginUser();
  }, [token]);

  const login = useCallback((newToken: string) => {
    setLoading(true);
    setToken(newToken);
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = Boolean(token && user);

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
