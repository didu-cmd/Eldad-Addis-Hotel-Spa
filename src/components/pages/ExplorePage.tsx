import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';
import { Attraction } from '../../types/hotel';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ExplorePageProps {
  attractions: Attraction[];
  onOpenBooking: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ attractions, onOpenBooking }) => {
  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24 font-shoore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16 font-shoore">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-3">
            Concierge Guide &amp; Landmarks
          </span>
          <h1 className="font-editorial font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171918] tracking-tight mb-6">
            Addis Ababa at Your Doorstep
          </h1>
          <p className="text-base sm:text-lg text-[#171918]/75 font-light leading-relaxed">
            Positioned in central Addis Ababa, Eldad Addis Hotel &amp; Spa offers immediate access to the nation’s preeminent political monuments, cultural archives, and historical landmarks. Click any location card or arrow to view its live Google Maps address and navigate directly.
          </p>
        </div>

        {/* Proximity Highlights Banner */}
        <div className="bg-[#12241D] text-[#F7F5F0] p-6 sm:p-8 mb-16 shadow-xl rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 font-shoore">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1B362B] rounded-2xl flex items-center justify-center text-[#B8860B] shrink-0 shadow-inner">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial font-serif text-2xl text-white">Central Diplomatic Location</h3>
              <p className="text-xs text-white/70 font-light mt-0.5">
                Approx. 700m from Derg Monument · Approx. 1.2km from National Palace
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#B8860B] font-mono tracking-wider block font-semibold">
              9°01'N · 38°45'E
            </span>
            <span className="text-[11px] text-white/50">Addis Ababa, Ethiopia</span>
          </div>
        </div>

        {/* Attractions Grid - Each Box and Arrow redirects to Google Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((att) => {
            const mapUrl = att.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(att.name + ' Addis Ababa Ethiopia')}`;

            return (
              <a
                key={att.id}
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${att.name} on Google Maps`}
                className="group bg-[#FCFBF8] border border-[#171918]/8 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#1B362B]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-xs cursor-pointer block text-inherit no-underline"
              >
                <div>
                  {/* Photo Container */}
                  <div className="aspect-[16/10] overflow-hidden rounded-t-3xl relative bg-[#EBE7DF]">
                    <ImageWithFallback
                      src={att.imageUrl}
                      alt={att.name}
                      fallbackTitle={att.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>

                  <div className="p-6">
                    {/* Top Row: Distance Badge & Navigation Arrow */}
                    <div className="flex items-center justify-between text-xs text-[#1B362B] font-semibold mb-3">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#171918]/8 shadow-2xs group-hover:border-[#1B362B]/30 transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>{att.distance}</span>
                      </span>

                      {/* Interactive Arrow Button */}
                      <div 
                        className="w-8 h-8 rounded-full bg-white border border-[#171918]/8 flex items-center justify-center text-[#171918]/40 group-hover:text-[#1B362B] group-hover:bg-[#1B362B]/10 group-hover:border-[#1B362B]/30 transition-all shadow-2xs"
                        aria-label="Navigate on Google Maps"
                      >
                        <Navigation className="w-3.5 h-3.5 transform group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>

                    <h2 className="font-editorial font-serif text-2xl text-[#171918] font-normal mb-2.5 group-hover:text-[#1B362B] transition-colors leading-tight">
                      {att.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#171918]/70 font-light leading-relaxed mb-2">
                      {att.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-[#171918]/6 flex items-center justify-between text-[11px] text-[#171918]/50 font-light group-hover:text-[#1B362B] transition-colors">
                  <span>{att.address || 'Central Addis District'}</span>
                  <span className="flex items-center gap-1 font-medium text-[#B8860B] group-hover:text-[#1B362B]">
                    <span>View on Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Airport Transfer Note */}
        <div className="mt-16 p-8 bg-[#FCFBF8] border border-[#171918]/10 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-editorial font-serif text-2xl text-[#171918] mb-1">
              Arriving from Bole International Airport?
            </h4>
            <p className="text-xs text-[#171918]/70 font-light">
              We provide private chauffeured airport transfers in both directions. Select during room reservation or contact our front desk.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-full shadow-sm hover:shadow shrink-0"
          >
            Book Room &amp; Airport Transfer
          </button>
        </div>

      </div>
    </div>
  );
};
