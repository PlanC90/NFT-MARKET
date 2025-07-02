import { NFT } from '../types';

export const mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'Cosmic Dragon #001',
    description: 'A legendary cosmic dragon soaring through digital galaxies. This rare NFT features stunning visual effects and intricate details.',
    image: 'https://images.pexels.com/photos/8471888/pexels-photo-8471888.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 150, area: 75 },
    creator: '0xABC...123',
    owner: '0xABC...123',
    category: 'Art',
    rarity: 'Legendary',
    isForSale: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Neon City Dreams',
    description: 'Cyberpunk-inspired digital artwork depicting a futuristic neon-lit cityscape with stunning architectural details.',
    image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 89, area: 45 },
    creator: '0xDEF...456',
    owner: '0xDEF...456',
    category: 'Digital Art',
    rarity: 'Epic',
    isForSale: true,
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'Abstract Geometry #42',
    description: 'Minimalist geometric patterns creating mesmerizing visual illusions with mathematical precision.',
    image: 'https://images.pexels.com/photos/8566468/pexels-photo-8566468.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 45, area: 25 },
    creator: '0xGHI...789',
    owner: '0xGHI...789',
    category: 'Art',
    rarity: 'Rare',
    isForSale: true,
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    title: 'Digital Portrait Series',
    description: 'Hyperrealistic digital portrait showcasing advanced AI-assisted artistic techniques.',
    image: 'https://images.pexels.com/photos/8566477/pexels-photo-8566477.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 120, area: 60 },
    creator: '0xJKL...012',
    owner: '0xJKL...012',
    category: 'Portrait',
    rarity: 'Epic',
    isForSale: true,
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    title: 'Quantum Waves',
    description: 'Dynamic visualization of quantum wave functions rendered in stunning detail.',
    image: 'https://images.pexels.com/photos/8566474/pexels-photo-8566474.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 200, area: 100 },
    creator: '0xMNO...345',
    owner: '0xMNO...345',
    category: 'Science',
    rarity: 'Legendary',
    isForSale: true,
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    title: 'Nature Fractals',
    description: 'Beautiful fractal patterns inspired by natural formations and organic growth.',
    image: 'https://images.pexels.com/photos/8566479/pexels-photo-8566479.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 67, area: 35 },
    creator: '0xPQR...678',
    owner: '0xPQR...678',
    category: 'Nature',
    rarity: 'Rare',
    isForSale: true,
    createdAt: '2024-01-10'
  },
  {
    id: '7',
    title: 'Ethereal Landscapes',
    description: 'Dreamlike landscapes that blend reality with fantasy, creating otherworldly environments.',
    image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 95, area: 50 },
    creator: '0xSTU...901',
    owner: '0xSTU...901',
    category: 'Landscape',
    rarity: 'Epic',
    isForSale: true,
    createdAt: '2024-01-09'
  },
  {
    id: '8',
    title: 'Pixel Warriors Collection',
    description: 'Retro-style pixel art warriors with unique attributes and battle-ready poses.',
    image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: { memex: 35, area: 20 },
    creator: '0xVWX...234',
    owner: '0xVWX...234',
    category: 'Gaming',
    rarity: 'Common',
    isForSale: true,
    createdAt: '2024-01-08'
  }
];
