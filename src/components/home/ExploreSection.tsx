import React from 'react';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { Attraction } from '../../types/hotel';

interface ExploreSectionProps {
  attractions: Attraction[];
  onViewAll: () => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({ attractions, onViewAll }) => {
  // Show key landmarks on homepage
  const featured = attractions.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#FCFBF8] border-t border-[#171918]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-3">
              05 · Location &amp; Culture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171918] tracking-tight">
              Curated Addis Ababa
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-[#171918]/70 font-light leading-relaxed mb-3">
              Situated in the diplomatic and cultural nexus of the capital, Eldad Addis offers effortless proximity to monumental heritage and prestigious institutions.
            </p>
            <button
              onClick={onViewAll}
              className="text-xs font-semibold uppercase tracking-wider text-[#1B362B] hover:text-[#12241D] flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              View Complete City Guide <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Curated Hotel Guide Grid - Restrained, Elegant Hairline Borders with Rounded Corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-[#F7F5F0] p-6 rounded-2xl border border-[#171918]/8 flex flex-col justify-between hover:border-[#1B362B]/30 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#1B362B] font-medium mb-3">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-[#171918]/5">
                    <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                    {item.distance}
                  </span>
                  <Navigation className="w-3 h-3 text-[#171918]/40" />
                </div>
                <h3 className="font-serif text-xl text-[#171918] font-normal mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-[#171918]/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#171918]/10 text-[11px] text-[#171918]/50 font-light">
                Concierge walking assistance available
              </div>
            </div>
          ))}
        </div>

        {/* Airport Transfer Note with Rounded Edges */}
        <div className="mt-12 p-6 bg-[#F7F5F0] rounded-2xl border border-[#171918]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#171918]/75">
            <strong className="font-medium text-[#171918] block text-sm font-serif mb-0.5">
              Airport ↔ Hotel Transfer Service
            </strong>
            Seamless 24-hour private vehicle transit between Bole International Airport and Eldad Addis Hotel &amp; Spa.
          </div>
          <button
            onClick={onViewAll}
            className="text-xs uppercase tracking-wider font-semibold text-[#1B362B] whitespace-nowrap cursor-pointer underline underline-offset-4"
          >
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
};
