import { Game } from '../types';

export const games: Game[] = [
  {
    id: '1',
    title: 'Cyber Odyssey 2077',
    description: 'An epic open-world RPG set in a dystopian future where cybernetic augmentation has become the norm.',
    price: 59.99,
    discountedPrice: 49.99,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070',
    genre: ['RPG', 'Action', 'Open World'],
    rating: 4.5,
    releaseDate: '2024-03-15',
    publisher: 'Future Games Inc.',
    platform: ['PC', 'PS5', 'Xbox Series X']
  },
  {
    id: '2',
    title: 'Medieval Legends',
    description: 'Experience epic medieval battles in this action-packed adventure through a mythical realm.',
    price: 49.99,
    coverImage: 'https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b?auto=format&fit=crop&q=80&w=2070',
    genre: ['Action', 'Adventure'],
    rating: 4.8,
    releaseDate: '2024-02-20',
    publisher: 'Classic Studios',
    platform: ['PC', 'PS5']
  },
  {
    id: '3',
    title: 'Space Explorers',
    description: 'Embark on an interstellar journey to explore unknown galaxies and alien civilizations.',
    price: 54.99,
    coverImage: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&q=80&w=2070',
    genre: ['Space', 'Adventure', 'Simulation'],
    rating: 4.7,
    releaseDate: '2024-04-01',
    publisher: 'Cosmic Games',
    platform: ['PC', 'PS5', 'Xbox Series X']
  },
  {
    id: '4',
    title: 'Racing Evolution',
    description: 'Experience the thrill of high-speed racing with realistic physics and stunning graphics.',
    price: 44.99,
    discountedPrice: 39.99,
    coverImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=2070',
    genre: ['Racing', 'Sports'],
    rating: 4.6,
    releaseDate: '2024-03-30',
    publisher: 'Speed Studios',
    platform: ['PC', 'PS5', 'Xbox Series X']
  }
];

// Generate 96 more games programmatically
const genres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Racing', 'Simulation', 'Puzzle', 'Horror', 'Shooter'];
const publishers = ['EA Games', 'Ubisoft', 'Square Enix', 'Bethesda', 'Rockstar Games', 'CD Projekt Red', 'Nintendo'];
const platforms = ['PC', 'PS5', 'Xbox Series X', 'Nintendo Switch'];

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const generateGames = (): Game[] => {
  const additionalGames: Game[] = [];
  
  for (let i = 5; i <= 100; i++) {
    const randomGenres = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
      genres[Math.floor(Math.random() * genres.length)]
    );
    
    const randomPlatforms = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
      platforms[Math.floor(Math.random() * platforms.length)]
    );

    const basePrice = Math.floor(Math.random() * 30) + 30; // Random price between 30 and 60
    const hasDiscount = Math.random() > 0.7; // 30% chance of having a discount
    const releaseDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

    additionalGames.push({
      id: i.toString(),
      title: `Game Title ${i}`,
      description: `This is an exciting game with amazing features and gameplay mechanics. Experience the thrill of gaming with Game ${i}.`,
      price: basePrice,
      ...(hasDiscount && { discountedPrice: basePrice - (Math.floor(Math.random() * 10) + 5) }),
      coverImage: `https://images.unsplash.com/photo-${1500000000 + i}?auto=format&fit=crop&q=80&w=2070`,
      genre: [...new Set(randomGenres)],
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // Random rating between 3.0 and 5.0
      releaseDate: formatDate(releaseDate),
      publisher: publishers[Math.floor(Math.random() * publishers.length)],
      platform: [...new Set(randomPlatforms)]
    });
  }

  return [...games, ...additionalGames];
};

export const allGames = generateGames();