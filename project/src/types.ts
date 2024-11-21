export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  coverImage: string;
  genre: string[];
  rating: number;
  releaseDate: string;
  publisher: string;
  platform: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface CartItem {
  gameId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}