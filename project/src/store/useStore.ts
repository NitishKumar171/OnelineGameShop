import { create } from 'zustand';
import { CartItem, Game, User } from '../types';
import { allGames } from '../data/games';

interface Store {
  user: User | null;
  cart: CartItem[];
  games: Game[];
  setUser: (user: User | null) => void;
  addToCart: (gameId: string) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  cart: [],
  games: allGames,
  setUser: (user) => set({ user }),
  addToCart: (gameId) => 
    set((state) => {
      const existingItem = state.cart.find(item => item.gameId === gameId);
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.gameId === gameId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { gameId, quantity: 1 }] };
    }),
  removeFromCart: (gameId) =>
    set((state) => ({
      cart: state.cart.filter(item => item.gameId !== gameId),
    })),
  clearCart: () => set({ cart: [] }),
}));