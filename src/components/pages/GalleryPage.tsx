import React, { useState } from 'react';
import { GalleryItem } from '../../types/hotel';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Lightbox } from '../common/Lightbox';
import { ArrowUpRight } from 'lucide-react';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ galleryItems }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    'All',
    'Rooms',
    'Restaurant & Breakfast',
    'Spa & Wellness',
    'Sauna & Steam',
    'Gym',
    'Addis Ababa',
  ];

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-3">
            Visual Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171918] tracking-tight mb-6">
            Atmosphere &amp; Detail
          </h1>
          <p className="text-base sm:text-lg text-[#171918]/75 font-light leading-relaxed">
            Explore the architectural contours, serene cedar wellness sanctuaries, and living spaces of Eldad Addis Hotel &amp; Spa. Click any photograph to enter the full-screen visual experience.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#171918]/10 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-medium cursor-pointer transition-all rounded-full ${
                activeCategory === cat
                  ? 'bg-[#1B362B] text-white shadow-sm'
                  : 'bg-[#FCFBF8] text-[#171918]/70 hover:bg-[#EBE7DF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group bg-[#FCFBF8] border border-[#171918]/8 rounded-2xl overflow-hidden shadow-xs cursor-pointer hover:border-[#1B362B]/40 hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base text-[#171918] group-hover:text-[#1B362B] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-[#171918]/50 block mt-0.5">
                    {item.category}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#171918]/40 group-hover:text-[#1B362B] transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filtered}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </div>
  );
};
