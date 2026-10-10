import React from 'react';
import { Flame, Wind, Dumbbell, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../../data/initialData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface WellnessPageProps {
  onOpenBooking: () => void;
}

export const WellnessPage: React.FC<WellnessPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-[#12241D] text-[#F7F5F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-medium block mb-3">
            Wellness &amp; Restoration
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 [text-wrap:balance]">
            Sanctuary of Warm Cedar &amp; Pure Mountain Air
          </h1>
          <p className="text-base sm:text-lg text-[#F7F5F0]/75 font-light leading-relaxed">
            Addis Ababa rests at an altitude of 2,355 meters. Our wellness sanctuary is purposefully engineered to restore vitality, soothe respiration, and melt away fatigue through Nordic cedar dry heat, eucalyptus thermal vapor, and serene private treatment enclaves.
          </p>
        </div>

        {/* Pricing Policy Distinction Banner with Rounded Edges */}
        <div className="bg-[#1B362B] border-l-4 border-[#B8860B] rounded-3xl p-6 sm:p-8 mb-16 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block mb-1">
              Access Privilege
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
              Resident &amp; Walk-In Access
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              We preserve an atmosphere of calm intimacy by managing daily capacity across our thermal facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#12241D] border border-white/10 rounded-2xl">
              <span className="text-[10px] uppercase tracking-wider text-white/60 block">Booked Hotel Guests</span>
              <span className="font-serif text-2xl text-[#B8860B] font-medium block my-1">
                FREE / Complimentary
              </span>
              <span className="text-[11px] text-white/50 block">Included with all 25 room reservations</span>
            </div>

            <div className="p-4 bg-[#12241D] border border-white/10 rounded-2xl">
              <span className="text-[10px] uppercase tracking-wider text-white/60 block">Walk-In Visitors</span>
              <span className="font-serif text-2xl text-white font-medium block my-1">
                1,600 ETB
              </span>
              <span className="text-[11px] text-white/50 block">Day pass includes sauna, steam &amp; gym</span>
            </div>
          </div>
        </div>

        {/* 3 Distinct Visual Enclaves with High-Fidelity Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* 1. Signature Spa & Cedar Sauna Sanctuary */}
          <div className="group rounded-3xl overflow-hidden shadow-xl bg-[#1B362B] border border-white/10 flex flex-col justify-between">
            <div className="aspect-[16/11] overflow-hidden relative">
              <ImageWithFallback
                src={ASSET_IMAGES.spaSanctuary}
                alt="Signature Spa & Cedar Sauna Sanctuary"
                fallbackTitle="Signature Spa & Cedar Sauna Sanctuary"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#12241D]/80 backdrop-blur-md text-[10px] text-[#B8860B] uppercase font-semibold tracking-wider">
                Sanctuary &amp; Steam
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-shoore font-semibold text-lg text-white mb-1.5">
                Signature Spa &amp; Cedar Sauna Sanctuary
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Herbal steam therapy and indigenous organic oil rituals designed to rejuvenate high-altitude travelers.
              </p>
            </div>
          </div>

          {/* 2. Cedar Wood Sauna Thermal Suite */}
          <div className="group rounded-3xl overflow-hidden shadow-xl bg-[#1B362B] border border-white/10 flex flex-col justify-between">
            <div className="aspect-[16/11] overflow-hidden relative">
              <ImageWithFallback
                src={ASSET_IMAGES.cedarSauna}
                alt="Cedar Wood Sauna Thermal Suite"
                fallbackTitle="Cedar Wood Sauna Thermal Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#12241D]/80 backdrop-blur-md text-[10px] text-[#B8860B] uppercase font-semibold tracking-wider">
                Dry Heat · 80°C - 90°C
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-shoore font-semibold text-lg text-white mb-1.5">
                Cedar Wood Sauna Thermal Suite
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Hand-joined aromatic Nordic cedar timber providing deep infrared-level dry heat relaxation and circulation.
              </p>
            </div>
          </div>

          {/* 3. State-of-the-Art Fitness Gym */}
          <div className="group rounded-3xl overflow-hidden shadow-xl bg-[#1B362B] border border-white/10 flex flex-col justify-between">
            <div className="aspect-[16/11] overflow-hidden relative">
              <ImageWithFallback
                src={ASSET_IMAGES.fitnessGym}
                alt="State-of-the-Art Fitness Gym"
                fallbackTitle="State-of-the-Art Fitness Gym"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#12241D]/80 backdrop-blur-md text-[10px] text-[#B8860B] uppercase font-semibold tracking-wider">
                Cardio &amp; Weights
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-shoore font-semibold text-lg text-white mb-1.5">
                State-of-the-Art Fitness Gym
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Precision treadmills, cross trainers, free weights, and core mats in a climate-controlled serene fitness studio.
              </p>
            </div>
          </div>
        </div>

        {/* Four Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-[#1B362B] border border-white/5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#12241D] flex items-center justify-center text-[#B8860B] mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Cedar Wood Sauna</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                Crafted from aromatic Finnish cedar. Dry heat ranges between 80°C and 90°C, promoting intense circulation and gentle muscular recovery.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] text-[#B8860B]">
              Temperature: 80°C–90°C
            </div>
          </div>

          <div className="p-6 bg-[#1B362B] border border-white/5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#12241D] flex items-center justify-center text-[#B8860B] mb-4">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Eucalyptus Steam</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                Dense moist heat vapor infused with pure Ethiopian eucalyptus essence to moisturize skin and soothe respiratory passageways.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] text-[#B8860B]">
              100% Relative Humidity
            </div>
          </div>

          <div className="p-6 bg-[#1B362B] border border-white/5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#12241D] flex items-center justify-center text-[#B8860B] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Holistic Therapies</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                Deep-tissue bodywork and botanical skin rituals utilizing cold-pressed Ethiopian sesame, black cumin, and frankincense oils.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] text-[#B8860B]">
              Organic Indigenous Oils
            </div>
          </div>

          <div className="p-6 bg-[#1B362B] border border-white/5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#12241D] flex items-center justify-center text-[#B8860B] mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Precision Gym</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                Air-conditioned fitness facility featuring high-end cardiovascular trainers, dumbbells, kettlebells, and dedicated core mats.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] text-[#B8860B]">
              Open 6:00 AM – 10:00 PM
            </div>
          </div>
        </div>

        {/* Tranquility Guidelines */}
        <div className="p-8 bg-[#162C23] border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif text-xl text-white">Quiet Sanctuary Etiquette</h4>
            <p className="text-xs text-white/60 font-light">
              Mobile phones are requested to remain silent. Robes and towels are provided at the spa reception desk.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-[#F7F5F0] text-[#12241D] hover:bg-white text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 rounded-full shadow-md"
          >
            Reserve Stay with Free Spa
          </button>
        </div>

      </div>
    </div>
  );
};
