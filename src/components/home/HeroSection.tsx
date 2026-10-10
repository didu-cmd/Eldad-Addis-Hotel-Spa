import React, { useState } from 'react';
import { Calendar, Users, ArrowRight, Sparkles, ShieldCheck, Flame, MapPin } from 'lucide-react';
import { ASSET_IMAGES } from '../../data/initialData';
import { RoomCategoryType } from '../../types/hotel';

interface HeroSectionProps {
  onBookWithParams: (params: {
    checkIn: string;
    checkOut: string;
    roomType?: RoomCategoryType;
    guests: number;
  }) => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookWithParams, onExplore }) => {
  // Default to today and 2 nights out
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultOut = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(defaultOut);
  const [roomType, setRoomType] = useState<RoomCategoryType | ''>('');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookWithParams({
      checkIn,
      checkOut,
      roomType: roomType || undefined,
      guests,
    });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#12241D] text-[#F7F5F0] overflow-hidden">
      {/* Background Architectural Image with Cinematic Ambient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="Eldad Addis Hotel & Spa Grand Luxury Facade"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Soft, measured dark forest scrim for pure legibility and calm atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12241D] via-[#12241D]/50 to-[#12241D]/25" />
      </div>

      {/* Top Spacer for balanced breathing room */}
      <div className="h-8 sm:h-12" />

      {/* Hero Content - Clean, Uncluttered & Confident */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 sm:py-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241D]/60 backdrop-blur-md border border-[#B8860B]/30 text-[#D4A328] text-[11px] tracking-[0.2em] uppercase font-medium mb-6">
            <span>Boutique Hotel &amp; Spa · Addis Ababa</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
            Comfort. Wellness. Hospitality in the heart of Addis Ababa.
          </h1>

          <p className="text-base sm:text-lg text-[#F7F5F0]/80 font-light leading-relaxed max-w-xl mb-8">
            An intimate 25-room sanctuary of calm contemporary architecture, restorative Finnish cedar sauna therapy, and authentic Ethiopian hospitality.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onBookWithParams({ checkIn, checkOut, roomType: roomType || undefined, guests })}
              className="px-8 py-3.5 bg-[#B8860B] hover:bg-[#9A7108] text-white font-medium text-xs uppercase tracking-[0.18em] transition-all cursor-pointer shadow-lg hover:shadow-xl rounded-full flex items-center gap-2"
            >
              <span>Book Your Stay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onExplore}
              className="px-7 py-3.5 border border-[#F7F5F0]/30 text-[#F7F5F0] font-medium text-xs uppercase tracking-[0.18em] hover:border-white hover:bg-white/10 transition-all cursor-pointer rounded-full backdrop-blur-xs"
            >
              Explore Sanctuary
            </button>
          </div>
        </div>
      </div>

      {/* Streamlined, Uncluttered Booking Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <div className="bg-[#FCFBF8]/95 backdrop-blur-md text-[#171918] p-5 sm:p-6 shadow-2xl rounded-3xl border border-[#171918]/10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
          >
            {/* Check-In */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#171918]/60 font-semibold mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1B362B]" /> Check-In
              </label>
              <input
                type="date"
                value={checkIn}
                min={todayStr}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Check-Out */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#171918]/60 font-semibold mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1B362B]" /> Check-Out
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || todayStr}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Room Type & Guests */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#171918]/60 font-semibold mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#1B362B]" /> Category / Guests
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as RoomCategoryType)}
                className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none transition-colors cursor-pointer"
              >
                <option value="">All Categories (25 Rooms)</option>
                <option value="Presidential Suite">Presidential Suite (from 10,800 ETB)</option>
                <option value="Deluxe Room">Deluxe Room (from 8,950 ETB)</option>
                <option value="Twin Room">Twin Room (from 6,790 ETB)</option>
                <option value="Standard Room">Standard Room (from 5,200 ETB)</option>
              </select>
            </div>

            {/* Submit Action */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1B362B] hover:bg-[#12241D] text-white text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer h-[42px] shadow-sm hover:shadow-md"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
