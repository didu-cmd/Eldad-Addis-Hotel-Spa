import React, { useState } from 'react';
import { Bed, Maximize2, Users, Check, ArrowRight } from 'lucide-react';
import { RoomCategory, RoomCategoryType } from '../../types/hotel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface RoomsPageProps {
  categories: RoomCategory[];
  onBookRoom: (roomType: RoomCategoryType) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ categories, onBookRoom }) => {
  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12 font-shoore">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-3 font-shoore">
            Accommodations · 25 Rooms
          </span>
          <h1 className="font-editorial font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171918] tracking-tight mb-6">
            Sanctuary in Every Detail
          </h1>
          <p className="text-base sm:text-lg text-[#171918]/75 font-light leading-relaxed mb-4">
            Every room at Eldad Addis Hotel &amp; Spa is conceived as a tranquil personal retreat. Designed with acoustic insulation, natural textures, and generous proportions, all 25 guest rooms feature complimentary access to our signature spa and cedar sauna.
          </p>
          <div className="inline-flex items-center gap-4 text-xs text-[#171918]/70 bg-[#EBE7DF] px-4 py-2 rounded-full font-medium">
            <span>🕒 Check-in 12:00 PM</span>
            <span>·</span>
            <span>🕒 Check-out 12:00 PM</span>
            <span>·</span>
            <span className="text-[#1B362B] font-semibold">Select your room number at booking</span>
          </div>
        </div>

        {/* Room List Presentation with Rounded Cards */}
        <div className="space-y-16 font-shoore">
          {categories.map((room) => (
            <div
              key={room.id}
              className="bg-[#FCFBF8] border border-[#171918]/10 rounded-3xl shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
            >
              {/* Image Showcase (7 cols) with distinct room photo */}
              <div className="lg:col-span-7 p-4 sm:p-5">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-md">
                  <ImageWithFallback
                    src={room.coverImage}
                    alt={room.name}
                    fallbackTitle={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-103 rounded-2xl"
                  />
                </div>
              </div>

              {/* Room Specifications (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between font-shoore">
                <div>
                  <div className="flex items-baseline justify-between border-b border-[#171918]/10 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block font-shoore">
                        {room.inventoryCount} Rooms in Property
                      </span>
                      {/* Room Name: Shoore Medium/Semibold */}
                      <h2 className="font-shoore font-semibold text-2xl sm:text-3xl text-[#171918] tracking-tight">
                        {room.name}
                      </h2>
                    </div>

                    {/* Price: Shoore */}
                    <div className="text-right">
                      <span className="font-price font-semibold text-2xl text-[#1B362B] block">
                        {room.basePrice.toLocaleString()} ETB
                      </span>
                      <span className="text-[10px] text-[#171918]/50 uppercase tracking-wider block font-shoore">
                        per night
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#171918]/75 font-light leading-relaxed mb-6">
                    {room.description}
                  </p>

                  {/* Room Stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 bg-[#F7F5F0] border border-[#171918]/6 px-3.5 rounded-xl text-xs text-[#171918]/80 mb-6">
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

                  {/* Amenities List */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block mb-2 font-medium">
                      Included Amenities &amp; Features
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-[#171918]/70 font-light">
                      {room.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Action */}
                <div className="pt-6 border-t border-[#171918]/10 mt-6 flex items-center justify-between">
                  <span className="text-xs text-[#1B362B] font-medium">
                    Complimentary Spa Included
                  </span>
                  <button
                    onClick={() => onBookRoom(room.name)}
                    className="px-7 py-3 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    <span>Reserve Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
