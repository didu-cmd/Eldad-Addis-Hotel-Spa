import React from 'react';
import { ShieldCheck, Compass, Heart, Award, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../../data/initialData';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigateToRooms: () => void;
  onNavigateToExplore: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenBooking,
  onNavigateToRooms,
  onNavigateToExplore,
}) => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171918] font-shoore">
      {/* Hero Header */}
      <div className="relative bg-[#12241D] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={ASSET_IMAGES.hero}
            alt="Eldad Addis Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12241D] via-[#12241D]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4A328] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            Our Heritage &amp; Philosophy
          </div>
          <h1 className="font-editorial font-serif text-4xl sm:text-6xl font-normal tracking-wide leading-tight mb-6 text-white">
            Where Ethiopian Tradition Meets <span className="text-[#D4A328]">Modern Luxury</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F7F5F0]/80 font-light max-w-3xl leading-relaxed">
            Nestled in the prestigious diplomatic heart of Addis Ababa—just moments from the National Palace and the UN Conference Centre—Eldad Addis Hotel &amp; Spa offers an intimate sanctuary of 25 meticulously designed guest rooms, signature cedar wellness sanctuaries, and heartfelt Ethiopian hospitality.
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        
        {/* Section 1: The Vision & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block">
              Established Excellence
            </span>
            <h2 className="font-editorial font-serif text-3xl sm:text-4xl font-normal text-[#1B362B] leading-snug">
              A Refined Haven Crafted for Diplomats, Global Travelers &amp; Connoisseurs
            </h2>
            <p className="text-[#171918]/80 text-sm sm:text-base font-light leading-relaxed">
              Eldad Addis was founded with a singular vision: to create a boutique hospitality experience that honors Ethiopia&apos;s rich cultural heritage while delivering world-class modern comforts. Every detail—from our custom cedar-wood saunas and artisanal coffee ceremonies to our soundproofed executive suites—is curated to provide absolute serenity amidst the vibrant rhythm of East Africa&apos;s diplomatic capital.
            </p>
            <p className="text-[#171918]/80 text-sm sm:text-base font-light leading-relaxed">
              Whether you are visiting for high-level UN delegations, exploring Addis Ababa&apos;s historic landmarks, or seeking a restorative wellness weekend, our dedicated team ensures every moment of your stay is marked by genuine warmth and flawless discretion.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#171918]/10">
              <div>
                <span className="font-editorial font-serif text-3xl font-bold text-[#B8860B] block">25</span>
                <span className="text-xs text-[#171918]/60 font-semibold tracking-wide uppercase">Luxury Suites &amp; Rooms</span>
              </div>
              <div>
                <span className="font-editorial font-serif text-3xl font-bold text-[#B8860B] block">700m</span>
                <span className="text-xs text-[#171918]/60 font-semibold tracking-wide uppercase">From Derg Monument</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#171918]/10 bg-white">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Eldad Addis Luxury Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1B362B] text-white p-6 rounded-2xl shadow-2xl max-w-xs hidden sm:block border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#B8860B]/20 flex items-center justify-center text-[#D4A328]">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-editorial font-serif font-bold text-base tracking-wide">Prime Location</span>
              </div>
              <p className="text-xs text-[#F7F5F0]/80 font-light">
                Situated in Bole &amp; Kazanchis proximity, minutes from Bole International Airport.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Core Pillars */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block">
              The Eldad Standard
            </span>
            <h2 className="font-editorial font-serif text-3xl sm:text-4xl font-normal text-[#1B362B]">
              Four Pillars of Our Hospitality
            </h2>
            <p className="text-sm text-[#171918]/70 font-light">
              Built on uncompromising standards of elegance, wellness, security, and cultural authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#171918]/8 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B362B]/5 flex items-center justify-center text-[#1B362B]">
                <ShieldCheck className="w-6 h-6 text-[#B8860B]" />
              </div>
              <h3 className="font-editorial font-serif text-lg font-normal text-[#1B362B]">Absolute Security &amp; FIN</h3>
              <p className="text-xs text-[#171918]/70 font-light leading-relaxed">
                Strict adherence to national hospitality protocols with secure 12-digit FIN registry and 24/7 guarded private gates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#171918]/8 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B362B]/5 flex items-center justify-center text-[#1B362B]">
                <Sparkles className="w-6 h-6 text-[#B8860B]" />
              </div>
              <h3 className="font-editorial font-serif text-lg font-normal text-[#1B362B]">Cedar Thermal Sanctuary</h3>
              <p className="text-xs text-[#171918]/70 font-light leading-relaxed">
                Finnish cedar saunas (90°C), eucalyptus steam rooms, and 24/7 fitness facilities included with every stay.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#171918]/8 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B362B]/5 flex items-center justify-center text-[#1B362B]">
                <Heart className="w-6 h-6 text-[#B8860B]" />
              </div>
              <h3 className="font-editorial font-serif text-lg font-normal text-[#1B362B]">Authentic Ethiopian Cafe</h3>
              <p className="text-xs text-[#171918]/70 font-light leading-relaxed">
                Daily traditional Buna ceremonies, organic roasted Sidama coffee beans, and gourmet continental breakfasts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#171918]/8 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B362B]/5 flex items-center justify-center text-[#1B362B]">
                <Compass className="w-6 h-6 text-[#B8860B]" />
              </div>
              <h3 className="font-editorial font-serif text-lg font-normal text-[#1B362B]">Diplomatic Proximity</h3>
              <p className="text-xs text-[#171918]/70 font-light leading-relaxed">
                Minutes from UN ECA, African Union headquarters, Addis Ababa Museum, and national heritage archives.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Explore Addis Proximity Banner */}
        <div className="bg-[#1B362B] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-[#D4A328] text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              Discover The Capital
            </div>
            <h2 className="font-editorial font-serif text-2xl sm:text-3xl font-normal">
              Immerse Yourself in the Heritage of Addis Ababa
            </h2>
            <p className="text-[#F7F5F0]/80 text-xs sm:text-sm font-light leading-relaxed">
              From the historic Addis Ababa Museum and Tewodros Square to the UN Conference Centre and National Archives &amp; Library, our concierge provides guided itineraries and VIP airport transfers (900 ETB).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
            <button
              onClick={onNavigateToExplore}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Explore Attractions
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-[#B8860B] hover:bg-[#C59B27] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              Reserve Your Suite
            </button>
          </div>
        </div>

        {/* Section 4: Quick Room Preview CTA */}
        <div className="text-center space-y-6 pt-10">
          <h2 className="font-editorial font-serif text-3xl font-normal text-[#1B362B]">
            Ready to Experience Eldad Addis?
          </h2>
          <p className="text-sm text-[#171918]/70 max-w-xl mx-auto font-light">
            Browse our 25 luxury guest suites—ranging from the Cozy Standard to the Ambassador Suite with private balcony and wellness privileges.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={onNavigateToRooms}
              className="px-8 py-4 rounded-xl bg-[#1B362B] hover:bg-[#12241D] text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              View Rooms &amp; Suites
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
