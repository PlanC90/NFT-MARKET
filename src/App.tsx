import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NFTCard } from './components/NFTCard';
import { NFTModal } from './components/NFTModal';
import { ListNFTModal } from './components/ListNFTModal';
import { MyNFTsModal } from './components/MyNFTsModal';
import { ProfileModal } from './components/ProfileModal';
import { Filters } from './components/Filters';
import { mockNFTs } from './data/mockNFTs';
import { connectWallet, disconnectWallet, getStoredWallet, simulateTransaction } from './utils/wallet';
import { NFT, WalletState, Transaction } from './types';
import { Loader, CheckCircle, XCircle } from 'lucide-react';

function App() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: { eth: 0, memex: 0, area: 0 }
  });
  
  const [nfts, setNfts] = useState<NFT[]>(mockNFTs);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isMyNFTsModalOpen, setIsMyNFTsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const storedWallet = getStoredWallet();
    if (storedWallet) {
      setWallet(storedWallet);
    }

    // Load stored transactions
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp' | 'txHash'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      txHash: '0x' + Math.random().toString(16).substr(2, 64)
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleConnectWallet = async () => {
    try {
      setIsLoading(true);
      const walletData = await connectWallet();
      setWallet(walletData);
      showNotification('success', 'Wallet connected successfully!');
    } catch (error) {
      showNotification('error', 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    setWallet({ isConnected: false, address: null, balance: { eth: 0, memex: 0, area: 0 } });
    showNotification('success', 'Wallet disconnected');
  };

  const handleViewDetails = (nft: NFT) => {
    setSelectedNFT(nft);
    setIsNFTModalOpen(true);
  };

  const handlePurchase = async (nft: NFT, currency: 'memex' | 'area' = 'memex') => {
    if (!wallet.isConnected) {
      showNotification('error', 'Please connect your wallet first');
      return;
    }

    if (nft.owner === wallet.address) {
      showNotification('error', 'You cannot buy your own NFT');
      return;
    }

    try {
      setIsLoading(true);
      const amount = currency === 'memex' ? nft.price.memex : nft.price.area;
      
      if (wallet.balance[currency] < amount) {
        showNotification('error', `Insufficient ${currency === 'memex' ? 'aMEMEX' : 'AREA'} balance`);
        return;
      }

      const txHash = await simulateTransaction(amount, currency);
      
      // Add purchase transaction
      addTransaction({
        type: 'purchase',
        nftId: nft.id,
        nftTitle: nft.title,
        nftImage: nft.image,
        price: nft.price,
        currency,
        from: nft.owner,
        to: wallet.address!
      });

      // Update NFT ownership
      setNfts(prev => prev.map(n => 
        n.id === nft.id 
          ? { ...n, owner: wallet.address!, isForSale: false }
          : n
      ));

      // Update wallet balance
      setWallet(prev => ({
        ...prev,
        balance: {
          ...prev.balance,
          [currency]: prev.balance[currency] - amount
        }
      }));

      showNotification('success', `NFT purchased successfully! Transaction: ${txHash.slice(0, 10)}...`);
      setIsNFTModalOpen(false);
    } catch (error) {
      showNotification('error', 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleListNFT = async (nftData: any) => {
    if (!wallet.isConnected) {
      showNotification('error', 'Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate listing transaction (small fee)
      await simulateTransaction(0.001, 'memex');
      
      const newNFT: NFT = {
        id: (nfts.length + 1).toString(),
        title: nftData.title,
        description: nftData.description,
        image: nftData.image || 'https://images.pexels.com/photos/8566477/pexels-photo-8566477.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: { memex: nftData.memexPrice, area: nftData.areaPrice },
        creator: wallet.address!,
        owner: wallet.address!,
        category: nftData.category,
        rarity: nftData.rarity as 'Common' | 'Rare' | 'Epic' | 'Legendary',
        isForSale: true,
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Add listing transaction
      addTransaction({
        type: 'listing',
        nftId: newNFT.id,
        nftTitle: newNFT.title,
        nftImage: newNFT.image,
        price: newNFT.price,
        currency: 'memex',
        from: wallet.address!,
        to: 'marketplace'
      });

      setNfts(prev => [newNFT, ...prev]);
      showNotification('success', 'NFT listed for sale successfully!');
      setIsListModalOpen(false);
    } catch (error) {
      showNotification('error', 'Listing failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNFTPrice = async (nftId: string, newPrice: { memex: number; area: number }) => {
    try {
      setIsLoading(true);
      
      // Simulate price update transaction
      await simulateTransaction(0.0005, 'memex');
      
      const nft = nfts.find(n => n.id === nftId);
      if (nft) {
        // Add price update transaction
        addTransaction({
          type: 'listing',
          nftId: nft.id,
          nftTitle: nft.title,
          nftImage: nft.image,
          price: newPrice,
          currency: 'memex',
          from: wallet.address!,
          to: 'marketplace'
        });
      }
      
      setNfts(prev => prev.map(nft => 
        nft.id === nftId 
          ? { ...nft, price: newPrice }
          : nft
      ));

      showNotification('success', 'NFT price updated successfully!');
    } catch (error) {
      showNotification('error', 'Price update failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromSale = async (nftId: string) => {
    try {
      setIsLoading(true);
      
      // Simulate remove from sale transaction
      await simulateTransaction(0.0001, 'memex');
      
      setNfts(prev => prev.map(nft => 
        nft.id === nftId 
          ? { ...nft, isForSale: false }
          : nft
      ));

      showNotification('success', 'NFT removed from sale!');
    } catch (error) {
      showNotification('error', 'Failed to remove from sale');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Get user's NFTs
  const userNFTs = nfts.filter(nft => nft.owner === wallet.address);

  // Get user's transactions
  const userTransactions = transactions.filter(tx => 
    tx.from === wallet.address || tx.to === wallet.address
  );

  // Filter and sort NFTs for marketplace (only for sale)
  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || nft.category === selectedCategory;
    const matchesRarity = selectedRarity === 'All' || nft.rarity === selectedRarity;
    const isForSale = nft.isForSale;
    
    return matchesSearch && matchesCategory && matchesRarity && isForSale;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price-low':
        return a.price.memex - b.price.memex;
      case 'price-high':
        return b.price.memex - a.price.memex;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <Header
        wallet={wallet}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        onOpenListModal={() => setIsListModalOpen(true)}
        onOpenMyNFTs={() => setIsMyNFTsModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              NFT Marketplace
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Buy and sell extraordinary NFTs on the most advanced marketplace. 
            List your existing NFTs or discover unique digital assets from other collectors.
          </p>
          <div className="flex items-center justify-center space-x-4 md:space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>aMEMEX TOKEN</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>AREA TOKEN</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-blue-400">{filteredNFTs.length}</h3>
            <p className="text-slate-400 text-sm md:text-base">NFTs for Sale</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-emerald-400">{userNFTs.length}</h3>
            <p className="text-slate-400 text-sm md:text-base">Your NFTs</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-purple-400">{wallet.balance.memex.toFixed(1)}</h3>
            <p className="text-slate-400 text-sm md:text-base">aMEMEX Balance</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400">{wallet.balance.area.toFixed(1)}</h3>
            <p className="text-slate-400 text-sm md:text-base">AREA Balance</p>
          </div>
        </div>

        {/* Filters */}
        <Filters
          selectedCategory={selectedCategory}
          selectedRarity={selectedRarity}
          sortBy={sortBy}
          onCategoryChange={setSelectedCategory}
          onRarityChange={setSelectedRarity}
          onSortChange={setSortBy}
        />

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredNFTs.map(nft => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onViewDetails={handleViewDetails}
              onPurchase={handlePurchase}
              isOwner={nft.owner === wallet.address}
            />
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No NFTs found matching your criteria.</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or check back later for new listings.</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <NFTModal
        nft={selectedNFT}
        isOpen={isNFTModalOpen}
        onClose={() => setIsNFTModalOpen(false)}
        onPurchase={handlePurchase}
        isLoading={isLoading}
        isOwner={selectedNFT?.owner === wallet.address}
      />

      <ListNFTModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onList={handleListNFT}
        isLoading={isLoading}
      />

      <MyNFTsModal
        isOpen={isMyNFTsModalOpen}
        onClose={() => setIsMyNFTsModalOpen(false)}
        nfts={userNFTs}
        onUpdatePrice={handleUpdateNFTPrice}
        onRemoveFromSale={handleRemoveFromSale}
        isLoading={isLoading}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userAddress={wallet.address || ''}
        userNFTs={userNFTs}
        transactions={userTransactions}
        balance={wallet.balance}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800 rounded-xl p-6 md:p-8 flex items-center space-x-4">
            <Loader className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="text-white font-medium">Processing transaction...</span>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 left-4 md:left-auto z-50 flex items-center space-x-3 px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        } backdrop-blur-sm`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="font-medium text-sm md:text-base">{notification.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
