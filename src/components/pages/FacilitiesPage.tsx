import React from 'react';
import { 
  Flame, 
  Dumbbell, 
  Clock, 
  Wifi, 
  Car, 
  Plane, 
  ShoppingBag, 
  Building2,
  ArrowRight,
  Coffee,
  Briefcase,
  Luggage,
  ShieldCheck,
  Sparkles,
  Droplets,
  Tv,
  Printer,
  Compass,
  CheckCircle2,
  Sparkle,
  PhoneCall,
  Shirt,
  HeartPulse,
  Ban,
  UtensilsCrossed,
  Layers,
  Presentation,
  Key,
  Shield,
  Zap,
  CreditCard,
  Bath,
  SunMedium
} from 'lucide-react';
import { ASSET_IMAGES } from '../../data/initialData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface FacilitiesPageProps {
  onOpenBooking: () => void;
  onOpenAmenitiesBooking?: () => void;
  onNavigateToDining: () => void;
  onNavigateToWellness: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  onOpenBooking,
  onOpenAmenitiesBooking,
  onNavigateToDining,
  onNavigateToWellness,
}) => {
  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24 font-shoore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-16 font-shoore">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-3">
            Hotel Services, Facilities &amp; Spa · 25 Rooms
          </span>
          <h1 className="font-editorial font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171918] tracking-tight mb-6">
            Facilities &amp; Wellness Sanctuary
          </h1>
          <p className="text-base sm:text-lg text-[#171918]/75 font-light leading-relaxed mb-6">
            From our Finnish cedar sauna, eucalyptus steam sanctuary, and executive meeting salons to on-site commercial banking and authentic Ethiopian coffee rituals, Eldad Addis Hotel &amp; Spa is conceived to ensure comfort, privacy, and effortless productivity.
          </p>
          {onOpenAmenitiesBooking && (
            <button
              onClick={onOpenAmenitiesBooking}
              className="px-6 py-3 rounded-xl bg-[#1B362B] hover:bg-[#12241D] text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#B8860B]" /> Book Spa, Sauna &amp; Services <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ================= SECTION 1: WELLNESS, SPA & FITNESS ENCLAVE ================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between border-b border-[#171918]/10 pb-4 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block">
                Thermal Sanctuary &amp; Recovery
              </span>
              <h2 className="font-editorial font-serif text-3xl sm:text-4xl text-[#171918]">
                Wellness, Spa &amp; Recovery Suites
              </h2>
            </div>
            {onOpenAmenitiesBooking && (
              <button
                onClick={onOpenAmenitiesBooking}
                className="px-4 py-2 rounded-lg bg-[#B8860B] hover:bg-[#966E09] text-[#12241D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
              >
                Book Service Slot <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Access Privilege Banner */}
          <div className="p-5 bg-[#12241D] text-[#F7F5F0] rounded-2xl shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-shoore">
            <div>
              <span className="text-xs uppercase tracking-wider text-white/70 block">Resident Guests Privilege</span>
              <span className="font-editorial font-serif text-lg text-[#B8860B]">Complimentary Spa, Sauna &amp; Gym Access Included with All 25 Rooms</span>
            </div>
            <div className="sm:border-l sm:border-white/10 sm:pl-6 text-right sm:text-left flex items-center gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block">Walk-In Day Pass</span>
                <span className="font-price text-sm text-white font-semibold">1,600 ETB / Day Pass</span>
              </div>
              {onOpenAmenitiesBooking && (
                <button
                  onClick={onOpenAmenitiesBooking}
                  className="px-4 py-2 rounded-xl bg-[#B8860B] text-[#12241D] font-bold text-xs uppercase tracking-wider hover:bg-[#D4A328] transition-colors cursor-pointer"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>

          {/* 3 Dedicated Facility Cards with Distinct Imagery & Detailed Unordered Lists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Signature Spa & Botanical Eucalyptus Thermal Suite */}
            <div className="bg-[#FCFBF8] border border-[#171918]/8 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={ASSET_IMAGES.spaSanctuary}
                    alt="Signature Spa & Cedar Sauna Sanctuary"
                    fallbackTitle="Signature Spa & Cedar Sauna Sanctuary"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#B8860B] mb-2">
                    <Droplets className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Steam Sanctuary</span>
                  </div>
                  <h3 className="font-shoore font-semibold text-lg text-[#171918] mb-2">
                    Signature Spa &amp; Thermal Suite
                  </h3>
                  <p className="text-xs text-[#171918]/70 leading-relaxed font-light mb-4">
                    Restorative thermal bathing and aromatic steam sanctuary engineered to relieve altitude fatigue with Ethiopian botanical eucalyptus oils.
                  </p>
                  
                  {/* Unordered feature list with aesthetic SVG icons */}
                  <ul className="space-y-2 text-xs text-[#171918]/80">
                    <li className="flex items-start gap-2">
                      <Droplets className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>Eucalyptus botanical steam infusion chamber</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>Private couples &amp; solo therapeutic treatment suites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HeartPulse className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>Altitude recovery herbal soaks &amp; massages</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-[#171918]/6 text-[11px] text-[#171918]/60 flex items-center justify-between">
                <span>Eucalyptus Vapor Bath</span>
                <span className="text-[#1B362B] font-semibold">Daily 6 AM – 10 PM</span>
              </div>
            </div>

            {/* Card 2: Cedar Wood Sauna Thermal Suite */}
            <div className="bg-[#FCFBF8] border border-[#171918]/8 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={ASSET_IMAGES.cedarSauna}
                    alt="Cedar Wood Sauna Thermal Suite"
                    fallbackTitle="Cedar Wood Sauna Thermal Suite"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#B8860B] mb-2">
                    <Flame className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Dry Finnish Heat</span>
                  </div>
                  <h3 className="font-shoore font-semibold text-lg text-[#171918] mb-2">
                    Cedar Wood Sauna Suite
                  </h3>
                  <p className="text-xs text-[#171918]/70 leading-relaxed font-light mb-4">
                    Hand-crafted Finnish cedar wood heated to therapeutic dry temperatures (80°C–90°C), facilitating deep muscle recovery and total peacefulness.
                  </p>

                  {/* Unordered feature list */}
                  <ul className="space-y-2 text-xs text-[#171918]/80">
                    <li className="flex items-start gap-2">
                      <Flame className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>80°C–90°C natural volcanic dry thermal rocks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>Aromatic Nordic cedar acoustic interior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <SunMedium className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>Cold splash rain showers for contrast therapy</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-[#171918]/6 text-[11px] text-[#171918]/60 flex items-center justify-between">
                <span>Finnish Aromatic Cedar</span>
                <span className="text-[#1B362B] font-semibold">Therapeutic Dry Heat</span>
              </div>
            </div>

            {/* Card 3: State-of-the-Art Fitness Gym */}
            <div className="bg-[#FCFBF8] border border-[#171918]/8 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={ASSET_IMAGES.fitnessGym}
                    alt="State-of-the-Art Fitness Gym"
                    fallbackTitle="State-of-the-Art Fitness Gym"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#B8860B] mb-2">
                    <Dumbbell className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Precision Studio</span>
                  </div>
                  <h3 className="font-shoore font-semibold text-lg text-[#171918] mb-2">
                    State-of-the-Art Fitness Gym
                  </h3>
                  <p className="text-xs text-[#171918]/70 leading-relaxed font-light mb-4">
                    High-performance cardiovascular treadmills, elliptical trainers, free weights, and core conditioning mats in an air-conditioned private studio.
                  </p>

                  {/* Unordered feature list */}
                  <ul className="space-y-2 text-xs text-[#171918]/80">
                    <li className="flex items-start gap-2">
                      <Dumbbell className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>Cardio treadmills, stationary bikes &amp; free weights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>24-Hour Resident Keycard Access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                      <span>Chilled towels &amp; spring mineral water station</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-[#171918]/6 text-[11px] text-[#171918]/60 flex items-center justify-between">
                <span>Cardio &amp; Strength</span>
                <span className="text-[#1B362B] font-semibold">24/7 Keycard Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: DINING & COFFEE CEREMONY ================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between border-b border-[#171918]/10 pb-4 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block">
                Gastronomy &amp; Culture
              </span>
              <h2 className="font-editorial font-serif text-3xl sm:text-4xl text-[#171918]">
                Restaurant, Breakfast &amp; Buna Ceremony
              </h2>
            </div>
            <button
              onClick={onNavigateToDining}
              className="text-xs uppercase tracking-wider font-semibold text-[#1B362B] hover:text-[#12241D] flex items-center gap-1 underline underline-offset-4 cursor-pointer"
            >
              Explore Full Menu <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FCFBF8] border border-[#171918]/8 p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#B8860B] font-bold block">
                Service Hours: 8:00 AM – 10:00 PM Daily
              </span>
              <h3 className="font-editorial font-serif text-2xl sm:text-3xl text-[#171918]">
                Highland heritage meets continental finesse.
              </h3>
              <p className="text-xs sm:text-sm text-[#171918]/75 font-light leading-relaxed">
                Enjoy a generous buffet breakfast every morning complimentary with your room stay, featuring organic local honey, artisan sourdough, fresh highland fruits, made-to-order eggs, and single-origin Yirgacheffe coffee. In the afternoon, partake in our authentic Ethiopian Buna ceremony.
              </p>

              {/* Aesthetic unordered list with custom SVG icons */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#171918]/80 font-medium">
                <li className="p-3 bg-[#F7F5F0] border border-[#171918]/8 rounded-2xl flex items-center gap-2.5">
                  <Coffee className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>Artisanal Coffee &amp; Sourdough</span>
                </li>
                <li className="p-3 bg-[#F7F5F0] border border-[#171918]/8 rounded-2xl flex items-center gap-2.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>Classic Doro Wat &amp; Injera</span>
                </li>
                <li className="p-3 bg-[#F7F5F0] border border-[#171918]/8 rounded-2xl flex items-center gap-2.5">
                  <Sparkle className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>Daily 4 PM Traditional Buna Ceremony</span>
                </li>
                <li className="p-3 bg-[#F7F5F0] border border-[#171918]/8 rounded-2xl flex items-center gap-2.5">
                  <Ban className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>Strict Non-Smoking Indoor Air</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="aspect-[16/10] overflow-hidden shadow-md rounded-2xl">
                <ImageWithFallback
                  src={ASSET_IMAGES.restaurant}
                  alt="Eldad Addis Dining Room"
                  fallbackTitle="Artisanal Dining Room"
                  className="w-full h-full object-cover rounded-2xl hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: BUSINESS & EXECUTIVE FACILITIES ================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between border-b border-[#171918]/10 pb-4 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block">
                Executive Operations
              </span>
              <h2 className="font-editorial font-serif text-3xl sm:text-4xl text-[#171918]">
                Business, Boardroom &amp; Meeting Salons
              </h2>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full cursor-pointer shadow-xs transition-all"
            >
              Book Executive Stay
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Boardroom Card */}
            <div className="p-6 sm:p-7 bg-[#FCFBF8] border border-[#171918]/8 rounded-3xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#B8860B] mb-2 font-semibold text-xs uppercase tracking-wider">
                  <Presentation className="w-4 h-4" />
                  <span>Executive Boardroom</span>
                </div>
                <h3 className="font-editorial font-serif text-2xl text-[#171918] mb-2">
                  The Abyssinia Executive Boardroom
                </h3>
                <p className="text-xs text-[#171918]/70 leading-relaxed font-light mb-4">
                  Acoustically insulated private boardroom tailored for corporate delegations, embassy briefings, and board meetings.
                </p>
                <ul className="space-y-2 text-xs text-[#171918]/80 font-medium">
                  <li className="flex items-center gap-2">
                    <Tv className="w-3.5 h-3.5 text-[#1B362B] shrink-0" />
                    <span>65" 4K Ultra-HD presentation monitor &amp; wireless video link</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#1B362B] shrink-0" />
                    <span>Ergonomic leather seating for up to 12 delegates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-[#1B362B] shrink-0" />
                    <span>Continuous specialty coffee &amp; bottled spring water service</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 mt-6 border-t border-[#171918]/8 flex items-center justify-between text-xs text-[#171918]/60">
                <span>Reservable at Front Desk</span>
                <span className="text-[#1B362B] font-semibold">Audio-Visual Equipped</span>
              </div>
            </div>

            {/* Co-Working Salon */}
            <div className="p-6 sm:p-7 bg-[#FCFBF8] border border-[#171918]/8 rounded-3xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#B8860B] mb-2 font-semibold text-xs uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>Quiet Work Enclave</span>
                </div>
                <h3 className="font-editorial font-serif text-2xl text-[#171918] mb-2">
                  Co-Working &amp; Private Reading Lounge
                </h3>
                <p className="text-xs text-[#171918]/70 leading-relaxed font-light mb-4">
                  Dedicated quiet work alcoves equipped with solid timber desks, high-speed optical fiber ports, and charging stations.
                </p>
                <ul className="space-y-2 text-xs text-[#171918]/80 font-medium">
                  <li className="flex items-center gap-2">
                    <Wifi className="w-3.5 h-3.5 text-[#1B362B] shrink-0" />
                    <span>Gigabit optical fiber connection with redundant backup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Printer className="w-3.5 h-3.5 text-[#1B362B] shrink-0" />
                    <span>Complimentary laser printing, scanning &amp; copying station</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#1B362B] shrink-0" />
                    <span>Soundproof phone booth pods for confidential video calls</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 mt-6 border-t border-[#171918]/8 flex items-center justify-between text-xs text-[#171918]/60">
                <span>Open 24/7 for Resident Guests</span>
                <span className="text-[#1B362B] font-semibold">High-Speed Wi-Fi</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 4: GUEST SERVICES & CONVENIENCE ================= */}
        {/* Requirement 1: Compact, Aesthetic Category Cards with SVG Icons & Unordered Lists */}
        <div>
          <div className="border-b border-[#171918]/10 pb-4 mb-8">
            <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block">
              Effortless Hospitality
            </span>
            <h2 className="font-editorial font-serif text-3xl sm:text-4xl text-[#171918]">
              Guest Services &amp; Convenience
            </h2>
            <p className="text-xs text-[#171918]/65 font-light mt-1">
              Every detail is engineered for seamless relaxation, security, and supreme comfort.
            </p>
          </div>

          {/* Compact Aesthetic Category Cards in Responsive 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Category 1: Front Desk & Concierge */}
            <div className="p-5 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl hover:border-[#1B362B]/40 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-[#171918]/8">
                  <div className="w-7 h-7 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="font-shoore font-semibold text-sm text-[#171918]">
                    Front Desk &amp; Concierge
                  </h3>
                </div>

                <ul className="space-y-2 text-[11px] text-[#171918]/80 font-light">
                  <li className="flex items-start gap-2">
                    <Key className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>24-Hour Reception:</strong> Multilingual reception &amp; night duty manager.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Luggage className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Luggage Storage:</strong> Secure luggage holding before check-in &amp; after check-out.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>City Tour Concierge:</strong> Guided city excursions &amp; museum arrangements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Express Check-Out:</strong> Fast statement billing via WhatsApp / Email.</span>
                  </li>
                </ul>
              </div>
              <span className="text-[10px] text-[#B8860B] font-semibold uppercase tracking-wider block mt-3 pt-2 border-t border-[#171918]/6">
                24/7 Assistance
              </span>
            </div>

            {/* Category 2: Connectivity & Business */}
            <div className="p-5 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl hover:border-[#1B362B]/40 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-[#171918]/8">
                  <div className="w-7 h-7 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <h3 className="font-shoore font-semibold text-sm text-[#171918]">
                    Connectivity &amp; Business
                  </h3>
                </div>

                <ul className="space-y-2 text-[11px] text-[#171918]/80 font-light">
                  <li className="flex items-start gap-2">
                    <Wifi className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Optical Fiber Wi-Fi:</strong> High-bandwidth gigabit network in all 25 rooms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Printer className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Printing &amp; Scanning:</strong> Secure boarding pass &amp; corporate printing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Ergonomic Desks:</strong> Universal multi-plug &amp; USB surge ports in rooms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Wake-Up Call Service:</strong> Precision automated morning alert calls.</span>
                  </li>
                </ul>
              </div>
              <span className="text-[10px] text-[#B8860B] font-semibold uppercase tracking-wider block mt-3 pt-2 border-t border-[#171918]/6">
                Gigabit Network
              </span>
            </div>

            {/* Category 3: Airport & Transportation */}
            <div className="p-5 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl hover:border-[#1B362B]/40 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-[#171918]/8">
                  <div className="w-7 h-7 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4" />
                  </div>
                  <h3 className="font-shoore font-semibold text-sm text-[#171918]">
                    Airport &amp; Transportation
                  </h3>
                </div>

                <ul className="space-y-2 text-[11px] text-[#171918]/80 font-light">
                  <li className="flex items-start gap-2">
                    <Plane className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Bole Airport Shuttle:</strong> Private pickup &amp; drop-off (900 ETB/trip).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Car className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Guarded Parking:</strong> 24-hour monitored private on-premise parking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Private Chauffeur:</strong> On-demand executive driver and car hire service.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Central Addis Location:</strong> 700m from Derg &amp; 1.2km from National Palace.</span>
                  </li>
                </ul>
              </div>
              <span className="text-[10px] text-[#B8860B] font-semibold uppercase tracking-wider block mt-3 pt-2 border-t border-[#171918]/6">
                Guarded Parking
              </span>
            </div>

            {/* Category 4: Banking & Retail Pavilion */}
            <div className="p-5 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl hover:border-[#1B362B]/40 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-[#171918]/8">
                  <div className="w-7 h-7 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-shoore font-semibold text-sm text-[#171918]">
                    Banking &amp; Retail Pavilion
                  </h3>
                </div>

                <ul className="space-y-2 text-[11px] text-[#171918]/80 font-light">
                  <li className="flex items-start gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>On-Site Commercial Banks:</strong> Direct CBE, BOA, Awash &amp; Dashen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Forex Exchange:</strong> Official authorized currency conversion desk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Artisan Boutiques:</strong> Roasted Yirgacheffe coffee beans &amp; textiles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Telebirr &amp; POS:</strong> Instant digital contactless payment support.</span>
                  </li>
                </ul>
              </div>
              <span className="text-[10px] text-[#B8860B] font-semibold uppercase tracking-wider block mt-3 pt-2 border-t border-[#171918]/6">
                On-Site ATMs
              </span>
            </div>

            {/* Category 5: Housekeeping & Health */}
            <div className="p-5 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl hover:border-[#1B362B]/40 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-[#171918]/8">
                  <div className="w-7 h-7 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <h3 className="font-shoore font-semibold text-sm text-[#171918]">
                    Housekeeping &amp; Well-Being
                  </h3>
                </div>

                <ul className="space-y-2 text-[11px] text-[#171918]/80 font-light">
                  <li className="flex items-start gap-2">
                    <Shirt className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Same-Day Laundry:</strong> Professional dry cleaning &amp; delicate steam press.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Daily Turn-Down:</strong> Fresh luxury linens &amp; botanical bath toiletries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HeartPulse className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Doctor on Call:</strong> 24/7 certified medical contact &amp; first aid kit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>100% Smoke-Free Air:</strong> Acoustic insulation &amp; clean fresh atmosphere.</span>
                  </li>
                </ul>
              </div>
              <span className="text-[10px] text-[#B8860B] font-semibold uppercase tracking-wider block mt-3 pt-2 border-t border-[#171918]/6">
                Pure Environment
              </span>
            </div>

            {/* Category 6: In-Room Comfort & Dining */}
            <div className="p-5 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl hover:border-[#1B362B]/40 hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-[#171918]/8">
                  <div className="w-7 h-7 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <h3 className="font-shoore font-semibold text-sm text-[#171918]">
                    In-Room Comfort &amp; Dining
                  </h3>
                </div>

                <ul className="space-y-2 text-[11px] text-[#171918]/80 font-light">
                  <li className="flex items-start gap-2">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>In-Room Dining:</strong> Hot dishes &amp; beverages delivered (8 AM–10 PM).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Droplets className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Complimentary Spring Water:</strong> Bottled spring water replenished daily.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Coffee className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Early Flight Breakfast Pack:</strong> Grab-and-go packs for early flights.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                    <span><strong>Electronic In-Room Safe:</strong> Laptop-sized digital security safe.</span>
                  </li>
                </ul>
              </div>
              <span className="text-[10px] text-[#B8860B] font-semibold uppercase tracking-wider block mt-3 pt-2 border-t border-[#171918]/6">
                Room Service
              </span>
            </div>

          </div>
        </div>

        {/* Bottom Booking Prompt Banner */}
        <div className="mt-16 p-8 bg-[#12241D] text-[#F7F5F0] rounded-3xl text-center space-y-4 shadow-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block">
            Experience Eldad Addis Hospitality
          </span>
          <h2 className="font-editorial font-serif text-3xl sm:text-4xl text-white">
            Ready to Reserve Your Sanctuary?
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            All 25 guest rooms include complimentary spa &amp; cedar sauna access, daily buffet breakfast, high-speed optical Wi-Fi, and guarded private parking.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 bg-[#B8860B] hover:bg-[#D4A328] text-[#12241D] font-bold text-xs uppercase tracking-widest rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
              Select Your Room &amp; Book Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
