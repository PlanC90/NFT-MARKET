import React, { useState } from 'react';
import { X, Heart, Share, ExternalLink, User, Calendar, Tag, Sparkles } from 'lucide-react';
import { NFT } from '../types';

interface NFTModalProps {
  nft: NFT | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (nft: NFT, currency: 'memex' | 'area') => void;
  isLoading: boolean;
  isOwner?: boolean;
}

export const NFTModal: React.FC<NFTModalProps> = ({ 
  nft, 
  isOpen, 
  onClose, 
  onPurchase, 
  isLoading, 
  isOwner = false 
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'memex' | 'area'>('memex');

  if (!isOpen || !nft) return null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-slate-400 bg-slate-700/50';
      case 'Rare': return 'text-blue-400 bg-blue-900/30';
      case 'Epic': return 'text-purple-400 bg-purple-900/30';
      case 'Legendary': return 'text-yellow-400 bg-yellow-900/30';
      default: return 'text-slate-400 bg-slate-700/50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">NFT Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-sm font-medium ${getRarityColor(nft.rarity)}`}>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>{nft.rarity}</span>
                </div>
              </div>
              {isOwner && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg text-sm font-medium text-green-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>You own this</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all">
                <Heart className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all">
                <ExternalLink className="w-4 h-4" />
                <span>View on Explorer</span>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{nft.title}</h1>
              <p className="text-slate-300 leading-relaxed">{nft.description}</p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Creator</span>
                </div>
                <p className="text-white font-medium">
                  {isOwner ? 'You' : `${nft.creator.slice(0, 10)}...${nft.creator.slice(-6)}`}
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Created</span>
                </div>
                <p className="text-white font-medium">{new Date(nft.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Category</span>
                </div>
                <p className="text-white font-medium">{nft.category}</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Rarity</span>
                </div>
                <p className={`font-medium ${getRarityColor(nft.rarity).split(' ')[0]}`}>{nft.rarity}</p>
              </div>
            </div>

            {/* Pricing */}
            {nft.isForSale && !isOwner && (
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Current Price</h3>
                
                <div className="space-y-3 mb-6">
                  <div 
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      selectedCurrency === 'memex' 
                        ? 'bg-blue-500/20 border-2 border-blue-500' 
                        : 'bg-slate-700/50 border-2 border-transparent hover:bg-slate-700'
                    }`}
                    onClick={() => setSelectedCurrency('memex')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">aMEMEX Token</p>
                        <p className="text-sm text-slate-400">Primary currency</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-400">{nft.price.memex}</p>
                      <p className="text-sm text-slate-400">aMEMEX</p>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      selectedCurrency === 'area' 
                        ? 'bg-emerald-500/20 border-2 border-emerald-500' 
                        : 'bg-slate-700/50 border-2 border-transparent hover:bg-slate-700'
                    }`}
                    onClick={() => setSelectedCurrency('area')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">AREA Token</p>
                        <p className="text-sm text-slate-400">Alternative currency</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-400">{nft.price.area}</p>
                      <p className="text-sm text-slate-400">AREA</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onPurchase(nft, selectedCurrency)}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    selectedCurrency === 'memex'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                  } text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Processing...' : `Buy for ${selectedCurrency === 'memex' ? nft.price.memex + ' aMEMEX' : nft.price.area + ' AREA'}`}
                </button>
              </div>
            )}

            {isOwner && (
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">You own this NFT</h3>
                <p className="text-slate-400 text-sm">
                  {nft.isForSale ? 'This NFT is currently listed for sale' : 'This NFT is not currently for sale'}
                </p>
              </div>
            )}

            {!nft.isForSale && !isOwner && (
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Not for Sale</h3>
                <p className="text-slate-400 text-sm">This NFT is not currently available for purchase</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
