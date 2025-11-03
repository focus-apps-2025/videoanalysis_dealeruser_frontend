import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../Services/api';

export const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || 'http://72.60.96.50:5000';

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token && !!user;
  const role = user?.role;

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const form = new URLSearchParams();
      form.append('username', username);
      form.append('password', password);

      const res = await axios.post(`${API_BASE}/dealer/login`, form, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const accessToken = res.data?.access_token;
      if (!accessToken) throw new Error('Invalid token response from server');

      setToken(accessToken);
      setAuthToken(accessToken);

      const meResponse = await axios.get(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (meResponse.data.role !== 'dealer_user') {
        throw new Error('Please use the admin portal to login');
      }

      setUser(meResponse.data);
      return true;
    } catch (error) {
      console.error('Login error details:', error);
      throw new Error(
        error.response?.data?.detail || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  }, []);

  useEffect(() => {
    // Reset auth header when token changes
    setAuthToken(token);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      isAuthenticated,
      loading,
      login,
      logout,
      API_BASE,
    }),
    [token, user, role, isAuthenticated, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
