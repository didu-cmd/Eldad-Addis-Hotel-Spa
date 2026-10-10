import React from 'react';
import { Sparkles, Flame, Dumbbell, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../../data/initialData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface UnwindSectionProps {
  onLearnMore: () => void;
}

export const UnwindSection: React.FC<UnwindSectionProps> = ({ onLearnMore }) => {
  const wellnessItems = [
    {
      id: 'spa',
      title: 'Signature Spa & Cedar Sauna Sanctuary',
      shortTitle: 'Signature Spa Sanctuary',
      image: ASSET_IMAGES.spaSanctuary,
      icon: Sparkles,
      tag: 'Restorative Enclave',
      desc: 'Serene thermal bathing sanctuary combining eucalyptus vapors, organic botanical massage oils, and deep thermal replenishment.',
    },
    {
      id: 'sauna',
      title: 'Cedar Wood Sauna Thermal Suite',
      shortTitle: 'Cedar Wood Sauna',
      image: ASSET_IMAGES.cedarSauna,
      icon: Flame,
      tag: '80°C - 90°C Dry Heat',
      desc: 'Hand-fitted aromatic Finnish cedar wood heated to restorative temperatures for muscle recovery and mindful altitude acclimatization.',
    },
    {
      id: 'gym',
      title: 'State-of-the-Art Fitness Gym',
      shortTitle: 'Precision Fitness Gym',
      image: ASSET_IMAGES.fitnessGym,
      icon: Dumbbell,
      tag: '24/7 Precision Facility',
      desc: 'Cardiovascular treadmills, cross-trainers, free weights, and core conditioning mats in an air-conditioned tranquil environment.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#12241D] text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Lockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-4">
              03 · Wellness Sanctuary
            </span>
            <h2 className="font-editorial font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight [text-wrap:balance]">
              Restoration in Finnish Cedar &amp; Pure Mountain Air.
            </h2>
          </div>

          {/* Pricing Callout Box in Shoore typography */}
          <div className="lg:col-span-5 bg-[#1B362B] p-6 border-l-4 border-[#B8860B] rounded-2xl shadow-lg font-shoore">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-xs uppercase tracking-wider text-white/80 font-medium font-shoore">
                Hotel Residents
              </span>
              <span className="font-price text-xl text-[#B8860B] font-semibold">
                Complimentary
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-white/60 font-shoore">
                Walk-In Day Pass
              </span>
              <span className="font-price text-lg text-white font-semibold">
                1,600 ETB
              </span>
            </div>
            <p className="text-[11px] text-white/50 font-light mt-3">
              Full access to cedar sauna, eucalyptus steam room, relaxation lounge, and state-of-the-art fitness gym.
            </p>
          </div>
        </div>

        {/* 3 Dedicated Wellness & Spa Enclaves with Distinct High-Fidelity Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {wellnessItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#162C23] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#B8860B]/40 transition-all"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#12241D]/85 backdrop-blur-md text-[10px] text-[#B8860B] uppercase font-semibold tracking-wider shadow-sm">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-[#B8860B]">
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold">
                        {item.shortTitle}
                      </span>
                    </div>

                    <h3 className="text-xl text-white font-medium mb-3 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-white/5 text-[11px] text-white/50 flex items-center justify-between">
                  <span>Resident Access</span>
                  <span className="text-[#B8860B] font-medium">Daily 6 AM – 10 PM</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-8 gap-4">
          <span className="text-xs text-white/60 font-light">
            Thermal wellness hours: 6:00 AM – 10:00 PM daily for hotel residents.
          </span>
          <button
            onClick={onLearnMore}
            className="text-xs uppercase tracking-wider font-semibold text-[#B8860B] hover:text-[#D4A328] transition-colors cursor-pointer flex items-center gap-2 font-shoore"
          >
            <span>Explore All Treatments &amp; Facilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
