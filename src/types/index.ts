export interface NFT {
  id: string;
  title: string;
  description: string;
  image: string;
  price: {
    memex: number; // aMEMEX price
    area: number;  // AREA price
  };
  creator: string;
  owner: string;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  isForSale: boolean;
  createdAt: string;
}

export interface User {
  address: string;
  name: string;
  avatar: string;
  isConnected: boolean;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: {
    eth: number;
    memex: number; // aMEMEX balance
    area: number;  // AREA balance
  };
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'listing';
  nftId: string;
  nftTitle: string;
  nftImage: string;
  price: {
    memex: number;
    area: number;
  };
  currency: 'memex' | 'area';
  from: string;
  to: string;
  timestamp: string;
  txHash: string;
}
