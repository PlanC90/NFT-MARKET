import { WalletState } from '../types';

// Simulated MetaMask integration
export const connectWallet = async (): Promise<WalletState> => {
  try {
    // Simulate MetaMask connection
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    const mockWallet: WalletState = {
      isConnected: true,
      address: mockAddress,
      balance: {
        eth: Math.random() * 10,
        memex: Math.random() * 1000,
        area: Math.random() * 500
      }
    };
    
    localStorage.setItem('wallet', JSON.stringify(mockWallet));
    return mockWallet;
  } catch (error) {
    throw new Error('Failed to connect wallet');
  }
};

export const disconnectWallet = (): void => {
  localStorage.removeItem('wallet');
};

export const getStoredWallet = (): WalletState | null => {
  const stored = localStorage.getItem('wallet');
  return stored ? JSON.parse(stored) : null;
};

export const simulateTransaction = async (amount: number, currency: 'memex' | 'area'): Promise<string> => {
  // Simulate transaction delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock transaction hash
  const txHash = '0x' + Math.random().toString(16).substr(2, 64);
  return txHash;
};
