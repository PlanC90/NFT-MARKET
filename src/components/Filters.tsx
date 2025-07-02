import React from 'react';
import { Filter, SortAsc } from 'lucide-react';

interface FiltersProps {
  selectedCategory: string;
  selectedRarity: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onRarityChange: (rarity: string) => void;
  onSortChange: (sort: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  selectedRarity,
  sortBy,
  onCategoryChange,
  onRarityChange,
  onSortChange
}) => {
  const categories = ['All', 'Art', 'Digital Art', 'Photography', 'Music', 'Gaming', 'Sports', 'Portrait', 'Science', 'Nature', 'Landscape'];
  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];
  const sortOptions = ['newest', 'oldest', 'price-low', 'price-high', 'popular'];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-white">Filters</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Rarity Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Rarity
          </label>
          <select
            value={selectedRarity}
            onChange={(e) => onRarityChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {rarities.map(rarity => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <div className="flex items-center space-x-1">
              <SortAsc className="w-4 h-4" />
              <span>Sort By</span>
            </div>
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Price Range - Future Implementation */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-slate-400 text-sm">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
