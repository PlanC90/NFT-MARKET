import React from 'react';
import { Heart, Eye, ShoppingCart, Star, User } from 'lucide-react';
import { NFT } from '../types';

interface NFTCardProps {
  nft: NFT;
  onViewDetails: (nft: NFT) => void;
  onPurchase: (nft: NFT, currency?: 'memex' | 'area') => void;
  isOwner?: boolean;
}

export const NFTCard: React.FC<NFTCardProps> = ({ nft, onViewDetails, onPurchase, isOwner = false }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-slate-400 bg-slate-700';
      case 'Rare': return 'text-blue-400 bg-blue-900/30';
      case 'Epic': return 'text-purple-400 bg-purple-900/30';
      case 'Legendary': return 'text-yellow-400 bg-yellow-900/30';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <button
              onClick={() => onViewDetails(nft)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View</span>
            </button>
            <button className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rarity Badge */}
        <div className={`absolute top-4 right-4 px-2 py-1 rounded-lg text-xs font-medium ${getRarityColor(nft.rarity)}`}>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>{nft.rarity}</span>
          </div>
        </div>

        {/* Owner Badge */}
        {isOwner && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-medium text-green-400">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>Owned</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {nft.title}
            </h3>
            <p className="text-sm text-slate-400">{nft.category}</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
          {nft.description}
        </p>

        {/* Creator */}
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-2"></div>
          <span className="text-xs text-slate-400">
            {isOwner ? 'You' : `${nft.creator.slice(0, 6)}...${nft.creator.slice(-4)}`}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Price</p>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-400">{nft.price.memex}</span>
                <span className="text-sm text-slate-400">aMEMEX</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-emerald-400">{nft.price.area}</span>
                <span className="text-xs text-slate-400">AREA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {nft.isForSale && !isOwner && (
          <button
            onClick={() => onPurchase(nft)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Buy Now</span>
          </button>
        )}

        {isOwner && (
          <div className="text-center py-2">
            <span className="text-sm text-slate-400">
              {nft.isForSale ? 'Listed for sale' : 'Not listed'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
