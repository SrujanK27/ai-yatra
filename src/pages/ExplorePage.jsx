import React, { useState, useMemo } from 'react';
import { Search, MapPin, Compass, Sparkles, SlidersHorizontal, ArrowUpDown, Landmark, X } from 'lucide-react';
import { HERITAGE_MONUMENTS, HERITAGE_CATEGORIES, BAGALKOTE_REGIONS } from '../data/heritageData';
import HeritageCard from '../components/heritage/HeritageCard';
import CategoryChip from '../components/common/CategoryChip';
import SectionHeader from '../components/common/SectionHeader';

export default function ExplorePage({ onSelectMonument, navigateTo }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('All Bagalkote');
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'alpha' | 'unesco'

  // Filter & Sort Logic
  const filteredMonuments = useMemo(() => {
    return HERITAGE_MONUMENTS.filter((monument) => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        monument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monument.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monument.about.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monument.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || monument.category === selectedCategory;

      // Region filter
      const matchesRegion = selectedRegion === 'All Bagalkote' || monument.region === selectedRegion;

      return matchesSearch && matchesCategory && matchesRegion;
    }).sort((a, b) => {
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      if (sortBy === 'unesco') return (b.isUnesco ? 1 : 0) - (a.isUnesco ? 1 : 0);
      return 0; // default recommended order
    });
  }, [searchQuery, selectedCategory, selectedRegion, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRegion('All Bagalkote');
    setSortBy('recommended');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedRegion !== 'All Bagalkote';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <SectionHeader
          eyebrow="Bagalkote Heritage Catalog"
          title="Explore Ancient Monuments & Temples"
          subtitle="Discover the rich stone heritage of Badami, Pattadakal, Aihole, Mahakuta, and Kudalasangama."
        />
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-canvas-card rounded-2xl p-4 sm:p-5 border border-sandstone-300 shadow-warm-sm space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-sandstone-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by monument name, carving, UNESCO site, or region..."
            className="w-full bg-canvas text-umber text-xs sm:text-sm pl-10 pr-10 py-3 rounded-stone border border-sandstone-300 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sandstone-600 hover:text-terracotta"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region & Sort Selectors */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-umber-light uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-terracotta" />
              Town:
            </span>
            {BAGALKOTE_REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-pill text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === region
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'bg-canvas text-umber-light hover:text-umber border border-sandstone-300'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <span className="text-[11px] text-umber-light font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-terracotta" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort Monuments By"
              className="bg-canvas text-umber text-xs font-semibold px-3 py-1.5 rounded-stone border border-sandstone-300 focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <option value="recommended">Featured Order</option>
              <option value="unesco">UNESCO Sites First</option>
              <option value="alpha">Alphabetical (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Category Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-sandstone-300 no-scrollbar">
          {HERITAGE_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              count={cat.id === 'all' ? HERITAGE_MONUMENTS.length : HERITAGE_MONUMENTS.filter(m => m.category === cat.id).length}
            />
          ))}
        </div>

      </div>

      {/* Results Header with Counts & Clear Filter */}
      <div className="flex items-center justify-between text-xs text-umber-light">
        <span>
          Showing <strong className="text-umber">{filteredMonuments.length}</strong> monuments in Bagalkote
        </span>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-terracotta hover:underline font-semibold flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Reset all filters
          </button>
        )}
      </div>

      {/* Monuments Responsive Grid */}
      {filteredMonuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMonuments.map((monument) => (
            <HeritageCard
              key={monument.id}
              monument={monument}
              onSelect={onSelectMonument}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-canvas-card rounded-2xl p-10 text-center border border-sandstone-300 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-sandstone-300 text-umber flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-umber">
            No Monuments Found
          </h3>
          <p className="text-xs text-umber-light leading-relaxed">
            No sites matched your query "{searchQuery}". Try clearing filters or searching for Badami, Pattadakal, or Aihole.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-stone bg-terracotta text-white text-xs font-semibold shadow-sm"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

    </div>
  );
}
