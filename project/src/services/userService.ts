import api from './api';
import { User } from '../types';

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
  currentPassword?: string;
}

export const userService = {
  getProfile: async () => {
    const { data } = await api.get<User>('/users/profile');
    return data;
  },

  updateProfile: async (userData: UpdateUserData) => {
    const { data } = await api.put<User>('/users/profile', userData);
    return data;
  },

  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: User['role'];
    search?: string;
  }) => {
    const { data } = await api.get<{ users: User[]; total: number }>('/users', {
      params,
    });
    return data;
  },

  getUserById: async (id: string) => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  updateUser: async (id: string, userData: UpdateUserData) => {
    const { data } = await api.put<User>(`/users/${id}`, userData);
    return data;
  },

  deleteUser: async (id: string) => {
    await api.delete(`/users/${id}`);
  }
};