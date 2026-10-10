import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  Coffee, 
  Sparkles, 
  Search, 
  Flame, 
  Leaf, 
  Heart, 
  Award,
  UtensilsCrossed,
  Info,
  ChevronDown,
  Check
} from 'lucide-react';
import { MenuItem } from '../../types/hotel';
import { ASSET_IMAGES } from '../../data/initialData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface DiningPageProps {
  menuItems: MenuItem[];
  onOpenBooking: () => void;
}

export const DiningPage: React.FC<DiningPageProps> = ({ menuItems }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Dynamic Categories from items
  const rawCategories = useMemo(() => {
    const cats = Array.from(new Set(menuItems.map(item => item.category)));
    return ['All', ...cats];
  }, [menuItems]);

  const dietaryFilters = [
    'All',
    'Chef Special',
    'Vegetarian',
    'Vegan',
    'Gluten-Free'
  ];

  // Filter items based on Category, Search Query, and Dietary
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category match
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(q))) ||
        (item.dietary && item.dietary.some(d => d.toLowerCase().includes(q)));

      // Dietary filter match
      let matchDiet = true;
      if (selectedDietary === 'Chef Special') {
        matchDiet = !!item.isChefSpecial;
      } else if (selectedDietary !== 'All') {
        matchDiet = !!item.dietary?.some(d => d.toLowerCase().includes(selectedDietary.toLowerCase()));
      }

      return matchCat && matchQuery && matchDiet;
    });
  }, [menuItems, activeCategory, searchQuery, selectedDietary]);

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24 font-shoore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block font-shoore">
              Gastronomy · 35+ Curated Selections
            </span>
            <h1 className="font-editorial font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171918] tracking-tight">
              The Eldad Culinary Salon
            </h1>
            <p className="text-base sm:text-lg text-[#171918]/75 font-light leading-relaxed">
              An epicurean sanctuary celebrating the rich heritage of Ethiopian highlands alongside exquisite continental classics. Every recipe is prepared fresh daily with cold-pressed oils, organic highland spices, and pure mountain spring water in an immaculate, non-smoking salon.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-light text-[#171918]/80 py-3 border-y border-[#171918]/10">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1B362B]" />
                <span>Service Hours: 8:00 AM – 10:00 PM Daily</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#1B362B]" />
                <span>Buffet Breakfast Included for Residents</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden shadow-2xl rounded-3xl group">
              <ImageWithFallback
                src={ASSET_IMAGES.restaurant}
                alt="Eldad Addis Dining Experience"
                fallbackTitle="Artisanal Dining Room"
                className="w-full h-full object-cover rounded-3xl group-hover:scale-103 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Digital Menu Control Bar: Search & Filtering */}
        <div className="bg-[#FCFBF8] border border-[#171918]/10 rounded-3xl p-6 mb-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#171918]/8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block">
                Digital A La Carte Menu
              </span>
              <h2 className="font-editorial font-serif text-2xl sm:text-3xl text-[#171918]">
                Explore Our Culinary Creations ({filteredItems.length} Available)
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#171918]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, ingredients, vegan..."
                className="w-full bg-[#F7F5F0] border border-[#171918]/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#171918] placeholder-[#171918]/40 focus:outline-none focus:border-[#1B362B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#171918]/40 hover:text-[#171918]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-6">
            {rawCategories.map((cat) => {
              const count = cat === 'All' 
                ? menuItems.length 
                : menuItems.filter(m => m.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-[#1B362B] text-white shadow-sm'
                      : 'bg-[#F7F5F0] text-[#171918]/70 hover:bg-[#EBE7DF]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat ? 'bg-white/20 text-white' : 'bg-[#171918]/10 text-[#171918]/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dietary Sub-Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#171918]/6 mt-4">
            <span className="text-[11px] font-medium text-[#171918]/60 mr-1 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-[#1B362B]" /> Filter By:
            </span>
            {dietaryFilters.map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDietary(diet)}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedDietary === diet
                    ? 'bg-[#B8860B] text-white shadow-xs'
                    : 'bg-transparent text-[#171918]/60 hover:text-[#171918] hover:bg-[#F7F5F0]'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        {/* Digital Menu Grid with Inspo Layout */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FCFBF8] border border-[#171918]/10 rounded-3xl p-8">
            <UtensilsCrossed className="w-10 h-10 text-[#171918]/30 mx-auto mb-3" />
            <h3 className="font-editorial font-serif text-xl text-[#171918] mb-1">No Menu Items Found</h3>
            <p className="text-xs text-[#171918]/60 max-w-sm mx-auto">
              We couldn't find any dishes matching your current filter criteria. Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); setSelectedDietary('All'); }}
              className="mt-4 px-5 py-2 bg-[#1B362B] text-white text-xs font-semibold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isExpanded = expandedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-[#FCFBF8] border rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                    item.isChefSpecial
                      ? 'border-[#B8860B]/40 shadow-sm hover:border-[#B8860B]'
                      : 'border-[#171918]/10 hover:border-[#1B362B]/30 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Item Image if available */}
                    {item.imageUrl && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#EBE7DF]">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            // Hide image container on error
                            (e.target as HTMLElement).parentElement?.classList.add('hidden');
                          }}
                        />
                        {item.isChefSpecial && (
                          <div className="absolute top-3 right-3 bg-[#B8860B] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-white" />
                            <span>Chef's Choice</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      {/* Header row: Item name and price */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B8860B] block mb-0.5">
                            {item.category}
                          </span>
                          <h3 className="font-shoore font-semibold text-lg text-[#171918] leading-snug">
                            {item.name}
                          </h3>
                        </div>

                        <div className="text-right shrink-0">
                          {item.priceETB ? (
                            <span className="font-price font-bold text-lg text-[#1B362B] block">
                              {item.priceETB.toLocaleString()} <span className="text-xs font-normal">ETB</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#B8860B] italic font-shoore">
                              {item.priceNote || 'Complimentary'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#171918]/75 font-light leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Metadata row: Prep time, calories, special tags */}
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#171918]/60 mb-3 pb-3 border-b border-[#171918]/6">
                        {item.prepTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#1B362B]" />
                            <span>{item.prepTime}</span>
                          </div>
                        )}
                        {item.calories && (
                          <div className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-[#B8860B]" />
                            <span>{item.calories}</span>
                          </div>
                        )}
                      </div>

                      {/* Dietary Badges */}
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.dietary.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[#F7F5F0] border border-[#171918]/6 text-[#171918]/70 text-[10px] rounded-md font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Expandable Ingredients Drawer */}
                      {item.ingredients && item.ingredients.length > 0 && (
                        <div className="mt-2">
                          <button
                            onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                            className="text-[11px] text-[#1B362B] hover:text-[#12241D] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>{isExpanded ? 'Hide Ingredients' : 'View Ingredients & Recipe'}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {isExpanded && (
                            <div className="mt-2.5 p-3 bg-[#F7F5F0] border border-[#171918]/8 rounded-xl text-[11px] text-[#171918]/80 animate-in fade-in duration-200">
                              <span className="font-semibold block mb-1 text-[#1B362B]">Curated Ingredients:</span>
                              <p className="leading-relaxed font-light">
                                {item.ingredients.join(' · ')}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Card bottom bar */}
                  <div className="px-6 py-3 bg-[#F7F5F0]/60 border-t border-[#171918]/6 flex items-center justify-between text-[11px] text-[#171918]/60">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#B8860B]" />
                      <span>Artisanal Kitchen</span>
                    </span>
                    <span className="text-[#1B362B] font-medium">Fresh Daily</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
