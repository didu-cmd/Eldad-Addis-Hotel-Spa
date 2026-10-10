import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ReserveSectionProps {
  onOpenBooking: () => void;
}

export const ReserveSection: React.FC<ReserveSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-28 sm:py-36 bg-[#12241D] text-[#F7F5F0] text-center border-t border-[#1B362B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-4">
          Reserve Your Room
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-6 [text-wrap:balance]">
          Experience calm luxury in Addis Ababa.
        </h2>

        <p className="text-base sm:text-lg text-[#F7F5F0]/75 font-light leading-relaxed max-w-xl mx-auto mb-10">
          25 curated guest rooms. Complimentary signature sauna &amp; spa access for all residents. Real-time availability and transparent reservation.
        </p>

        {/* Single Primary Action without competing distractions */}
        <div className="flex justify-center">
          <button
            onClick={onOpenBooking}
            className="px-10 py-4 bg-[#F7F5F0] text-[#12241D] hover:bg-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:shadow-2xl cursor-pointer flex items-center gap-3 rounded-full"
          >
            <span>Book Your Stay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 text-xs text-[#F7F5F0]/50 tracking-wider">
          Best rate guaranteed · No hidden fees · Front desk or online payment
        </div>

      </div>
    </section>
  );
};
