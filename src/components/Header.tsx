import React, { useState } from 'react';
import { Wallet, User, Search, Menu, Sparkles, Package, X } from 'lucide-react';
import { WalletState } from '../types';

interface HeaderProps {
  wallet: WalletState;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  onOpenListModal: () => void;
  onOpenMyNFTs: () => void;
  onOpenProfile: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  wallet,
  onConnectWallet,
  onDisconnectWallet,
  onOpenListModal,
  onOpenMyNFTs,
  onOpenProfile,
  searchQuery,
  onSearchChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src="https://apricot-rational-booby-281.mypinata.cloud/ipfs/bafkreic3xn3bc43ziabhzdqjj3v5e6f7w6r2yl64fuezsz3frkowa2e3di" 
                alt="NFTMarket Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NFTMarket
              </h1>
              <p className="text-xs text-slate-400 hidden md:block">Buy & Sell Digital Assets</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search NFTs, collections, creators..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {wallet.isConnected && (
              <>
                <button
                  onClick={onOpenMyNFTs}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all text-sm"
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden lg:inline">My NFTs</span>
                </button>

                <button
                  onClick={onOpenListModal}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden lg:inline">List NFT</span>
                </button>
              </>
            )}

            {wallet.isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="hidden xl:block text-right">
                  <div className="text-sm text-slate-300">
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center space-x-2">
                    <span>{wallet.balance.memex.toFixed(1)} aMEMEX</span>
                    <span>•</span>
                    <span>{wallet.balance.area.toFixed(1)} AREA</span>
                  </div>
                </div>
                <button
                  onClick={onOpenProfile}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">Profile</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-sm"
              >
                <Wallet className="w-4 h-4" />
                <span className="font-medium">Connect</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="space-y-3">
              {!wallet.isConnected ? (
                <button
                  onClick={() => {
                    onConnectWallet();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <Wallet className="w-5 h-5" />
                  <span className="font-medium">Connect Wallet</span>
                </button>
              ) : (
                <>
                  {/* Wallet Info */}
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-sm text-slate-300 mb-2">
                      {wallet.address?.slice(0, 10)}...{wallet.address?.slice(-6)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">aMEMEX:</span>
                        <span className="text-blue-400 font-medium ml-2">{wallet.balance.memex.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">AREA:</span>
                        <span className="text-emerald-400 font-medium ml-2">{wallet.balance.area.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <button
                    onClick={() => {
                      onOpenProfile();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenMyNFTs();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition-all"
                  >
                    <Package className="w-5 h-5" />
                    <span>My NFTs</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenListModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>List NFT</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
