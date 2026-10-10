import React, { useState } from 'react';
import { HOTEL_LOGO_URL } from '../../data/initialData';
import { NavigationPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [logoError, setLogoError] = useState(false);

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12241D] text-[#F7F5F0] pt-16 pb-12 border-t border-[#1B362B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 pb-14 border-b border-[#F7F5F0]/10">
          
          {/* Brand Column */}
          <div className="max-w-sm">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3.5 mb-5 text-left cursor-pointer group focus:outline-none"
              aria-label="Return to Eldad Addis homepage"
            >
              {/* Logo Badge Container with Glassmorphism and Fallback */}
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center p-2 shadow-sm transition-all group-hover:scale-105 shrink-0 overflow-hidden">
                {!logoError ? (
                  <img
                    src={HOTEL_LOGO_URL}
                    alt="Eldad Addis Hotel & Spa Logo"
                    className="h-full w-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  /* Bespoke Luxury Gold Monogram Vector Fallback */
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#B8860B]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[9px] font-bold tracking-widest text-[#B8860B] mt-0.5">EA</span>
                  </div>
                )}
              </div>

              <div>
                <span className="font-shoore text-xl sm:text-2xl font-bold tracking-wider block text-white group-hover:text-[#B8860B] transition-colors">
                  ELDAD ADDIS
                </span>
                <span className="font-shoore text-[10px] tracking-[0.25em] uppercase text-[#F7F5F0]/70 font-medium block">
                  Hotel &amp; Spa · Addis Ababa
                </span>
              </div>
            </button>

            <p className="text-xs text-[#F7F5F0]/70 leading-relaxed font-light mb-4">
              Modern luxury, calm wellness, and authentic Ethiopian hospitality in the heart of Addis Ababa. 25 guest rooms, signature cedar sauna, and refined dining.
            </p>
            <div className="text-xs text-[#F7F5F0]/50 space-y-1 font-light mb-6">
              <p>Approx. 700m from Derg Monument · 1.2km from National Palace</p>
              <p>Check-in 12:00 PM · Check-out 12:00 PM</p>
            </div>

            {/* Social Media SVG Icons Section */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8860B] font-semibold block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Eldad Addis on Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B8860B] hover:bg-[#B8860B]/15 hover:text-[#D4A328] transition-all flex items-center justify-center text-[#F7F5F0]/80 cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Eldad Addis on Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B8860B] hover:bg-[#B8860B]/15 hover:text-[#D4A328] transition-all flex items-center justify-center text-[#F7F5F0]/80 cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Eldad Addis on X"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B8860B] hover:bg-[#B8860B]/15 hover:text-[#D4A328] transition-all flex items-center justify-center text-[#F7F5F0]/80 cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* TripAdvisor */}
                <a
                  href="https://tripadvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Eldad Addis on TripAdvisor"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#B8860B] hover:bg-[#B8860B]/15 hover:text-[#D4A328] transition-all flex items-center justify-center text-[#F7F5F0]/80 cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>

                {/* WhatsApp Direct Concierge */}
                <a
                  href="https://wa.me/251911234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Concierge"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#25D366] hover:bg-[#25D366]/15 hover:text-[#25D366] transition-all flex items-center justify-center text-[#F7F5F0]/80 cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.55 1.975.845 2.806.845h.005c3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.765-5.773-5.765zm3.376 8.203c-.145.407-.84.774-1.168.824-.316.05-.694.073-2.12-.516-1.815-.75-2.99-2.582-3.08-2.703-.092-.122-.727-.968-.727-1.848 0-.88.461-1.312.625-1.492.164-.18.358-.225.478-.225.12 0 .24 0 .344.006.111.006.262-.042.41.314.153.367.522 1.272.568 1.365.046.092.077.201.015.323-.062.122-.093.197-.185.305-.092.107-.193.24-.276.323-.092.092-.189.192-.081.377.108.185.48 0.792 1.029 1.282.707.63 1.303.824 1.488.916.185.092.292.077.4-.046.108-.123.461-.537.584-.722.123-.185.246-.154.415-.092.169.062 1.077.508 1.262.6.185.092.308.138.354.215.046.077.046.446-.099.853z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Mirror */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-light tracking-wide">
            <div>
              <span className="text-[#F7F5F0]/40 uppercase tracking-[0.2em] text-[10px] block mb-3 font-medium">
                Experience
              </span>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                    About Hotel &amp; Heritage
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('rooms')} className="hover:text-white transition-colors cursor-pointer">
                    Rooms &amp; Suites
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('facilities')} className="hover:text-white transition-colors cursor-pointer">
                    Facilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('dining')} className="hover:text-white transition-colors cursor-pointer">
                    Dining &amp; Breakfast
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[#F7F5F0]/40 uppercase tracking-[0.2em] text-[10px] block mb-3 font-medium">
                Discover
              </span>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => handleNav('facilities')} className="hover:text-white transition-colors cursor-pointer">
                    Facilities &amp; Spa
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('explore')} className="hover:text-white transition-colors cursor-pointer">
                    Explore Addis
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors cursor-pointer">
                    Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('policies')} className="hover:text-white transition-colors cursor-pointer">
                    Hotel Policies
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#F7F5F0]/40 uppercase tracking-[0.2em] text-[10px] block mb-3 font-medium">
                Reservations &amp; Support
              </span>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={onOpenBooking} className="text-[#B8860B] hover:text-[#D4A328] font-medium transition-colors cursor-pointer">
                    Book Room Now
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Contact &amp; Location
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('admin')} className="text-[#F7F5F0]/50 hover:text-white transition-colors cursor-pointer">
                    Staff Portal
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Official Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F7F5F0]/60 font-light gap-4 border-t border-white/10 mt-8">
          <p>© {new Date().getFullYear()} ELDAD ADDIS HOTEL &amp; SPA. All Rights Reserved. Addis Ababa, Ethiopia.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('policies')} className="hover:text-white transition-colors cursor-pointer">
              Guest Policies &amp; Terms
            </button>
            <p className="tracking-wide">
              Official Luxury Hotel Registry · <span className="text-[#B8860B] font-medium">Addis Ababa</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
