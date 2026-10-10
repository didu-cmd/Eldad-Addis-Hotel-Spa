import React from 'react';
import { ASSET_IMAGES } from '../../data/initialData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface DiscoverSectionProps {
  onLearnMore: () => void;
}

export const DiscoverSection: React.FC<DiscoverSectionProps> = ({ onLearnMore }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Column (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-4">
              01 · The Property
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171918] leading-[1.15] mb-6 [text-wrap:balance]">
              An architectural retreat in central Addis Ababa.
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base text-[#171918]/75 font-light leading-relaxed mb-8">
              <p>
                Eldad Addis Hotel &amp; Spa offers an intimate enclave of exactly 25 guest rooms, balancing contemporary restraint with the authentic warmth of Ethiopian hospitality.
              </p>
              <p>
                Positioned approximately 700 meters from the historic Derg Monument and 1.2 kilometers from the National Palace, the property connects guests to the city’s cultural core while providing a tranquil sanctuary of cedar-scented wellness and restorative quietude.
              </p>
            </div>

            <div className="pt-2 border-t border-[#171918]/10 flex items-center justify-between">
              <div className="text-xs text-[#171918]/60">
                <span className="font-serif text-2xl font-medium text-[#1B362B] block">25</span>
                <span>Curated Guest Rooms</span>
              </div>
              <div className="text-xs text-[#171918]/60">
                <span className="font-serif text-2xl font-medium text-[#1B362B] block">12:00 PM</span>
                <span>Check-in &amp; Check-out</span>
              </div>
              <button
                onClick={onLearnMore}
                className="text-xs font-semibold uppercase tracking-wider text-[#1B362B] hover:text-[#12241D] transition-colors py-2 cursor-pointer underline underline-offset-4"
              >
                Discover More
              </button>
            </div>
          </div>

          {/* Large Image Column (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden shadow-2xl rounded-3xl">
                <ImageWithFallback
                  src={ASSET_IMAGES.hero}
                  alt="Eldad Addis Hotel & Spa peaceful architecture"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              {/* Subtle architectural caption */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#171918]/50 font-light">
                <span>Addis Ababa · Central District</span>
                <span>Elevation 2,355m</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
