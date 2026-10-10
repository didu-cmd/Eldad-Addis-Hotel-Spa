import React from 'react';
import { Clock, Utensils, Coffee, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../../data/initialData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface DineSectionProps {
  onViewMenu: () => void;
}

export const DineSection: React.FC<DineSectionProps> = ({ onViewMenu }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#F7F5F0] font-shoore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strong unified composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Side (7 cols) with rounded geometry */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl rounded-3xl">
              <ImageWithFallback
                src={ASSET_IMAGES.restaurant}
                alt="Eldad Addis Hotel Restaurant and Dining Room"
                fallbackTitle="Artisanal Dining Room"
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute bottom-4 left-4 bg-[#12241D]/90 backdrop-blur-xs text-white px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm font-shoore">
                <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Service Hours: 8:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Editorial Content (5 cols) */}
          <div className="lg:col-span-5 font-shoore">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-4 font-shoore">
              04 · Culinary Art
            </span>

            <h2 className="font-editorial font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171918] leading-tight mb-6 [text-wrap:balance]">
              Highland flavors, global restraint.
            </h2>

            <p className="text-sm sm:text-base text-[#171918]/75 font-light leading-relaxed mb-6">
              Our culinary team honors Ethiopia’s ancient spice traditions alongside refined international cuisine. Enjoy a complimentary artisanal breakfast buffet every morning, or savor evening dining in a calm, non-smoking environment.
            </p>

            {/* Quiet highlights */}
            <div className="space-y-4 py-4 border-y border-[#171918]/10 mb-8 text-xs text-[#171918]/80 font-light">
              <div className="flex items-start gap-3">
                <Coffee className="w-4 h-4 text-[#1B362B] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-[#171918] block">Artisanal Breakfast Buffet</strong>
                  Fresh teff pastries, tropical fruits, local honeycomb, and freshly roasted single-origin Ethiopian coffee.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Utensils className="w-4 h-4 text-[#1B362B] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-[#171918] block">Ethiopian &amp; International Selection</strong>
                  Slow-simmered highland stews, fresh Lake Tana fish, and contemporary European entrées.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onViewMenu}
                className="px-8 py-3.5 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:shadow"
              >
                <span>View Digital Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-[#171918]/50 italic">
                Non-smoking dining space
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
