import React, { useState } from 'react';
import { X, User, ShoppingBag, TrendingUp, Calendar, ExternalLink, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';
import { NFT, Transaction, WalletState } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAddress: string;
  userNFTs: NFT[];
  transactions: Transaction[];
  balance: WalletState['balance'];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userAddress,
  userNFTs,
  transactions,
  balance
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'nfts' | 'transactions'>('overview');

  if (!isOpen) return null;

  const totalValue = userNFTs.reduce((sum, nft) => sum + (nft.isForSale ? nft.price.memex : 0), 0);
  const listedNFTs = userNFTs.filter(nft => nft.isForSale);
  const unlistedNFTs = userNFTs.filter(nft => !nft.isForSale);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowDownLeft className="w-4 h-4 text-red-400" />;
      case 'sale':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'listing':
        return <Plus className="w-4 h-4 text-blue-400" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'text-red-400';
      case 'sale':
        return 'text-green-400';
      case 'listing':
        return 'text-blue-400';
      default:
        return 'text-slate-400';
    }
  };

  const getTransactionText = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'purchase':
        return `Purchased ${transaction.nftTitle}`;
      case 'sale':
        return `Sold ${transaction.nftTitle}`;
      case 'listing':
        return `Listed ${transaction.nftTitle}`;
      default:
        return transaction.nftTitle;
    }
  };

  const getTransactionPrice = (transaction: Transaction) => {
    const price = transaction.currency === 'memex' ? transaction.price.memex : transaction.price.area;
    const currency = transaction.currency === 'memex' ? 'aMEMEX' : 'AREA';
    return `${price} ${currency}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Profile</h2>
              <p className="text-slate-400 text-sm">{userAddress.slice(0, 10)}...{userAddress.slice(-6)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('nfts')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'nfts'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My NFTs ({userNFTs.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Transactions ({transactions.length})
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ShoppingBag className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-slate-400">Total NFTs</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{userNFTs.length}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-slate-400">Listed for Sale</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{listedNFTs.length}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">M</span>
                    <span className="text-sm text-slate-400">aMEMEX</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">{balance.memex.toFixed(2)}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">A</span>
                    <span className="text-sm text-slate-400">AREA</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">{balance.area.toFixed(2)}</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img src={transaction.nftImage} alt={transaction.nftTitle} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{getTransactionText(transaction)}</p>
                        <p className="text-slate-400 text-sm">{new Date(transaction.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          {getTransactionIcon(transaction.type)}
                          <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
                            {getTransactionPrice(transaction)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-slate-400">No transactions yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* NFTs Tab */}
          {activeTab === 'nfts' && (
            <div className="space-y-6">
              {/* Listed NFTs */}
              {listedNFTs.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Listed for Sale ({listedNFTs.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listedNFTs.map(nft => (
                      <div key={nft.id} className="bg-slate-800/50 rounded-xl overflow-hidden">
                        <img src={nft.image} alt={nft.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h4 className="text-white font-medium mb-1">{nft.title}</h4>
                          <div className="space-y-1">
                            <p className="text-blue-400 font-bold text-sm">{nft.price.memex} aMEMEX</p>
                            <p className="text-emerald-400 font-bold text-sm">{nft.price.area} AREA</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Unlisted NFTs */}
              {unlistedNFTs.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Not Listed ({unlistedNFTs.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unlistedNFTs.map(nft => (
                      <div key={nft.id} className="bg-slate-800/50 rounded-xl overflow-hidden">
                        <img src={nft.image} alt={nft.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h4 className="text-white font-medium mb-1">{nft.title}</h4>
                          <p className="text-slate-400 text-sm">Not for sale</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {userNFTs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">You don't own any NFTs yet</p>
                  <p className="text-slate-500 text-sm mt-2">Start by purchasing from the marketplace</p>
                </div>
              )}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Transaction History</h3>
              
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img src={transaction.nftImage} alt={transaction.nftTitle} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getTransactionIcon(transaction.type)}
                          <h4 className="text-white font-medium">{getTransactionText(transaction)}</h4>
                        </div>
                        <p className="text-slate-400 text-sm mb-1">{transaction.nftTitle}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(transaction.timestamp).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ExternalLink className="w-3 h-3" />
                            <span>{transaction.txHash.slice(0, 10)}...</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                            {transaction.type === 'purchase' ? '-' : '+'}{getTransactionPrice(transaction)}
                          </span>
                        </div>
                        <p className="text-slate-500 text-xs">
                          {transaction.type === 'purchase' ? 'Purchased' : 
                           transaction.type === 'sale' ? 'Sold' : 'Listed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">No transactions yet</p>
                  <p className="text-slate-500 text-sm mt-2">Your transaction history will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
