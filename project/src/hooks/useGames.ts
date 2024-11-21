import { useQuery, useMutation, useQueryClient } from 'react-query';
import { gameService } from '../services/gameService';
import { Game } from '../types';
import { toast } from 'react-hot-toast';

export function useGames(params?: {
  search?: string;
  genre?: string;
  platform?: string;
  page?: number;
  limit?: number;
}) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery(
    ['games', params],
    () => gameService.getGames(params),
    {
      keepPreviousData: true,
    }
  );

  const createGameMutation = useMutation(
    (gameData: Omit<Game, 'id'>) => gameService.createGame(gameData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('games');
        toast.success('Game created successfully');
      },
    }
  );

  const updateGameMutation = useMutation(
    ({ id, data }: { id: string; data: Partial<Game> }) =>
      gameService.updateGame(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('games');
        toast.success('Game updated successfully');
      },
    }
  );

  const deleteGameMutation = useMutation(
    (id: string) => gameService.deleteGame(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('games');
        toast.success('Game deleted successfully');
      },
    }
  );

  return {
    games: data?.games || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    createGame: createGameMutation.mutate,
    updateGame: updateGameMutation.mutate,
    deleteGame: deleteGameMutation.mutate,
    isCreating: createGameMutation.isLoading,
    isUpdating: updateGameMutation.isLoading,
    isDeleting: deleteGameMutation.isLoading,
  };
}