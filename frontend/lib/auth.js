'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Api, setToken, getToken } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function bootstrap() {
      try {
        // If we have an access token, try it; otherwise attempt a silent refresh.
        if (!getToken()) {
          try {
            const { token } = await Api.refresh();
            if (token) setToken(token);
          } catch {
            /* no session */
          }
        }
        if (getToken()) {
          const { user: u } = await Api.me();
          if (active) setUser(u);
        }
      } catch {
        setToken(null);
      } finally {
        if (active) setLoading(false);
      }
    }
    bootstrap();
    return () => { active = false; };
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: u } = await Api.login({ email, password });
    setToken(token);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (payload) => {
    const { token, user: u } = await Api.register(payload);
    setToken(token);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    try { await Api.logout(); } catch { /* ignore */ }
    setToken(null);
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const { user: u } = await Api.me();
      setUser(u);
      return u;
    } catch {
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
