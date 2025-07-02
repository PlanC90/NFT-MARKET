import React, { useState } from 'react';
import { X, Upload, Sparkles } from 'lucide-react';

interface ListNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onList: (nftData: any) => void;
  isLoading: boolean;
}

export const ListNFTModal: React.FC<ListNFTModalProps> = ({ isOpen, onClose, onList, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Art',
    rarity: 'Common',
    memexPrice: '',
    areaPrice: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onList({
      ...formData,
      memexPrice: parseFloat(formData.memexPrice),
      areaPrice: parseFloat(formData.areaPrice)
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Art',
      rarity: 'Common',
      memexPrice: '',
      areaPrice: '',
      image: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">List Your NFT</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> List your existing NFTs for sale on our marketplace. 
              You can set prices in both aMEMEX and AREA tokens.
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              NFT Image URL
            </label>
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-slate-500 transition-colors">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">Paste your NFT image URL here</p>
              <p className="text-xs text-slate-500">PNG, JPG, GIF supported</p>
              <input
                type="url"
                placeholder="https://example.com/your-nft-image.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="mt-4 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              NFT Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your NFT title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe your NFT..."
            />
          </div>

          {/* Category and Rarity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Art</option>
                <option>Digital Art</option>
                <option>Photography</option>
                <option>Music</option>
                <option>Video</option>
                <option>Gaming</option>
                <option>Sports</option>
                <option>Collectibles</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Rarity
              </label>
              <select
                value={formData.rarity}
                onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Common</option>
                <option>Rare</option>
                <option>Epic</option>
                <option>Legendary</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Set Sale Price
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <span className="text-sm text-slate-300">aMEMEX Token</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.memexPrice}
                  onChange={(e) => setFormData({ ...formData, memexPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <span className="text-sm text-slate-300">AREA Token</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.areaPrice}
                  onChange={(e) => setFormData({ ...formData, areaPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 hover:from-green-600 hover:to-emerald-700 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Listing NFT...' : 'List NFT for Sale'}
          </button>
        </form>
      </div>
    </div>
  );
};
