import React, { useState } from 'react';
import { GalleryItem } from '../../types/hotel';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Lightbox } from '../common/Lightbox';
import { ArrowUpRight } from 'lucide-react';

interface DetailGallerySectionProps {
  galleryItems: GalleryItem[];
  onViewAllGallery: () => void;
}

export const DetailGallerySection: React.FC<DetailGallerySectionProps> = ({
  galleryItems,
  onViewAllGallery,
}) => {
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
    <section className="py-24 sm:py-32 bg-[#F7F5F0] font-shoore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-3 font-shoore">
              06 · Visual Archive
            </span>
            <h2 className="font-editorial font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171918] tracking-tight">
              The Hotel, In Detail
            </h2>
          </div>

          {/* Interactive filter tabs with rounded pill design */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EBE7DF] border border-[#171918]/8 rounded-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium transition-all rounded-full cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#1B362B] text-white shadow-sm'
                    : 'text-[#171918]/70 hover:text-[#171918]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry / Varied Grid with Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative cursor-pointer overflow-hidden shadow-sm hover:shadow-md rounded-2xl border border-[#171918]/6 bg-[#FCFBF8] transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Quiet caption underneath */}
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

        {/* View Full Gallery Link */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllGallery}
            className="text-xs font-semibold uppercase tracking-wider text-[#1B362B] hover:text-[#12241D] transition-colors cursor-pointer underline underline-offset-4"
          >
            Open Full Visual Archive &amp; Lightbox
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filtered}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </section>
  );
};
