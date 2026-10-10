import React from 'react';
import { ArrowRight, Bed, Maximize2, Users } from 'lucide-react';
import { RoomCategory, RoomCategoryType } from '../../types/hotel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface StaySectionProps {
  categories: RoomCategory[];
  onSelectCategory: (type: RoomCategoryType) => void;
  onViewAllRooms: () => void;
}

export const StaySection: React.FC<StaySectionProps> = ({
  categories,
  onSelectCategory,
  onViewAllRooms,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-[#FCFBF8] border-t border-[#171918]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-3">
              02 · Accommodations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171918] tracking-tight">
              Curated Living Spaces
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-[#171918]/70 font-light leading-relaxed mb-3">
              Exactly 25 rooms across four refined configurations. Each crafted with natural materials, restorative bedding, and complimentary access to the signature spa.
            </p>
            <button
              onClick={onViewAllRooms}
              className="text-xs font-semibold uppercase tracking-wider text-[#1B362B] hover:text-[#12241D] flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              Explore Full Room Gallery <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Editorial Alternating Layout for the 4 Categories */}
        <div className="space-y-20 lg:space-y-28">
          {categories.map((room, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div 
                key={room.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Image (7 cols) with soft rounded geometry */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[16/10] overflow-hidden group shadow-xl rounded-3xl">
                    <ImageWithFallback
                      src={room.coverImage}
                      alt={room.name}
                      fallbackTitle={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 rounded-3xl"
                    />
                    <div className="absolute top-4 left-4 bg-[#12241D]/85 backdrop-blur-sm text-white text-[11px] tracking-widest uppercase px-3.5 py-1.5 rounded-full font-medium shadow-sm">
                      {room.inventoryCount} {room.inventoryCount === 1 ? 'Room' : 'Rooms Total'}
                    </div>
                  </div>
                </div>

                {/* Details (5 cols) */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between border-b border-[#171918]/10 pb-3">
                      {/* Room Name */}
                      <h3 className="font-semibold text-2xl sm:text-3xl text-[#171918] tracking-tight">
                        {room.name}
                      </h3>
                      {/* Price */}
                      <div className="text-right">
                        <span className="font-price font-semibold text-xl sm:text-2xl text-[#1B362B] block">
                          {room.basePrice.toLocaleString()} ETB
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">
                          per night
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#171918]/75 font-light leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Attributes with rounded pill card */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#F7F5F0] rounded-xl border border-[#171918]/8 text-xs text-[#171918]/70">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#1B362B]" />
                        <span>Up to {room.maxOccupancy}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#1B362B]" />
                        <span className="truncate">{room.bedConfig}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#1B362B]" />
                        <span>{room.sizeM2} m²</span>
                      </div>
                    </div>

                    {/* Selected Key Amenities */}
                    <div className="text-xs text-[#171918]/65 font-light space-y-1">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => onSelectCategory(room.name)}
                        className="w-full sm:w-auto px-7 py-3.5 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                      >
                        <span>Check Availability &amp; Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
