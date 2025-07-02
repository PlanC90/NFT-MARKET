import React, { useState } from 'react';
import { X, Edit, Trash2, DollarSign, Eye, EyeOff } from 'lucide-react';
import { NFT } from '../types';

interface MyNFTsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nfts: NFT[];
  onUpdatePrice: (nftId: string, newPrice: { memex: number; area: number }) => void;
  onRemoveFromSale: (nftId: string) => void;
  isLoading: boolean;
}

export const MyNFTsModal: React.FC<MyNFTsModalProps> = ({ 
  isOpen, 
  onClose, 
  nfts, 
  onUpdatePrice, 
  onRemoveFromSale, 
  isLoading 
}) => {
  const [editingNFT, setEditingNFT] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState({ memex: 0, area: 0 });

  const handleEditPrice = (nft: NFT) => {
    setEditingNFT(nft.id);
    setNewPrice(nft.price);
  };

  const handleSavePrice = () => {
    if (editingNFT) {
      onUpdatePrice(editingNFT, newPrice);
      setEditingNFT(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingNFT(null);
    setNewPrice({ memex: 0, area: 0 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">My NFT Collection</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {nfts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg mb-2">You don't own any NFTs yet</p>
              <p className="text-slate-500 text-sm">Start by listing your first NFT or purchasing from the marketplace</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map(nft => (
                <div key={nft.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${
                      nft.isForSale 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-slate-700/80 text-slate-300'
                    }`}>
                      {nft.isForSale ? (
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>For Sale</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <EyeOff className="w-3 h-3" />
                          <span>Not Listed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{nft.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">{nft.description}</p>
                    
                    {/* Price Section */}
                    {editingNFT === nft.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-slate-400">aMEMEX</label>
                            <input
                              type="number"
                              step="0.01"
                              value={newPrice.memex}
                              onChange={(e) => setNewPrice({ ...newPrice, memex: parseFloat(e.target.value) })}
                              className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">AREA</label>
                            <input
                              type="number"
                              step="0.01"
                              value={newPrice.area}
                              onChange={(e) => setNewPrice({ ...newPrice, area: parseFloat(e.target.value) })}
                              className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSavePrice}
                            disabled={isLoading}
                            className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex-1 py-2 bg-slate-600 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-400 font-medium">{nft.price.memex} aMEMEX</span>
                            <span className="text-emerald-400 font-medium">{nft.price.area} AREA</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          {nft.isForSale ? (
                            <>
                              <button
                                onClick={() => handleEditPrice(nft)}
                                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex-1"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit Price</span>
                              </button>
                              <button
                                onClick={() => onRemoveFromSale(nft.id)}
                                disabled={isLoading}
                                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEditPrice(nft)}
                              className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors w-full"
                            >
                              <DollarSign className="w-3 h-3" />
                              <span>List for Sale</span>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
