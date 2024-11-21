import api from './api';
import { User } from '../types';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (userData: RegisterData) => {
    const { data } = await api.post<LoginResponse>('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<User & { exp: number }>(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }
      return decoded;
    } catch {
      localStorage.removeItem('token');
      return null;
    }
  }
};