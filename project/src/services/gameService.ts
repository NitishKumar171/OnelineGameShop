import api from './api';
import { Game } from '../types';

export const gameService = {
  getGames: async (params?: { 
    search?: string;
    genre?: string;
    platform?: string;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await api.get<{ games: Game[]; total: number }>('/games', { params });
    return data;
  },

  getGameById: async (id: string) => {
    const { data } = await api.get<Game>(`/games/${id}`);
    return data;
  },

  createGame: async (gameData: Omit<Game, 'id'>) => {
    const { data } = await api.post<Game>('/games', gameData);
    return data;
  },

  updateGame: async (id: string, gameData: Partial<Game>) => {
    const { data } = await api.put<Game>(`/games/${id}`, gameData);
    return data;
  },

  deleteGame: async (id: string) => {
    await api.delete(`/games/${id}`);
  }
};