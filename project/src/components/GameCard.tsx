import React from 'react';
import { useStore } from '../store/useStore';
import { Game } from '../types';
import { ShoppingCart, Heart } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { addToCart } = useStore();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="p-2 bg-gray-900 bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
        <div className="flex items-center mb-2">
          {game.genre.map((g, index) => (
            <span
              key={index}
              className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full mr-2"
            >
              {g}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {game.discountedPrice ? (
              <>
                <span className="text-gray-400 line-through">${game.price}</span>
                <span className="text-2xl font-bold text-white">
                  ${game.discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-white">${game.price}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(game.id)}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}