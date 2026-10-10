import React, { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { HOTEL_LOGO_URL } from '../../data/initialData';

export type NavigationPage = 
  | 'home' 
  | 'about'
  | 'rooms' 
  | 'facilities' 
  | 'dining' 
  | 'wellness' 
  | 'explore' 
  | 'gallery' 
  | 'policies' 
  | 'contact' 
  | 'book' 
  | 'admin';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: () => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  isAdminLoggedIn = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: NavigationPage }[] = [
    { label: 'About', page: 'about' },
    { label: 'Rooms', page: 'rooms' },
    { label: 'Facilities', page: 'facilities' },
    { label: 'Dining', page: 'dining' },
    { label: 'Explore', page: 'explore' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Policies', page: 'policies' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-[#171918]/8">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single Clean Brand Mark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left cursor-pointer group focus:outline-none"
          aria-label="Eldad Addis Hotel & Spa homepage"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white/70 border border-[#171918]/10 flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-105 transition-all overflow-hidden shrink-0">
            {!logoError ? (
              <img
                src={HOTEL_LOGO_URL}
                alt="Eldad Addis Logo"
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#1B362B]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[8px] font-bold tracking-widest text-[#B8860B]">EA</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-shoore text-xl sm:text-2xl font-bold tracking-wider text-[#1B362B] leading-none">
              ELDAD ADDIS
            </span>
            <span className="font-shoore text-[10px] tracking-[0.2em] uppercase text-[#171918]/60 mt-1 font-medium">
              Hotel &amp; Spa · Addis Ababa
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#171918]/80">
          {navLinks.map(link => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap relative ${
                  isActive 
                    ? 'text-[#1B362B] font-semibold' 
                    : 'hover:text-[#1B362B]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1B362B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Subtle Staff / Admin portal entrance */}
          <button
            onClick={() => handleNavClick('admin')}
            title="Front Desk & Management Portal"
            className={`px-3 py-2 rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer border ${
              currentPage === 'admin'
                ? 'bg-[#1B362B] text-white border-[#1B362B]'
                : 'text-[#171918]/70 hover:text-[#1B362B] border-[#171918]/10 hover:border-[#1B362B]/30 bg-white/50'
            }`}
            aria-label="Staff Portal"
          >
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">Staff</span>
            {isAdminLoggedIn && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            )}
          </button>

          {/* Primary CTA with elegant rounded shape */}
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 text-xs font-medium text-[#F7F5F0] bg-[#1B362B] hover:bg-[#12241D] transition-all tracking-wider uppercase rounded-full cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md"
          >
            Book Your Stay
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#171918] hover:text-[#1B362B] hover:bg-[#171918]/5 cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with rounded container */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFBF8] border-b border-[#171918]/10 mx-3 mb-3 rounded-2xl shadow-xl px-6 py-6 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-left py-2 border-b border-[#171918]/5 transition-colors cursor-pointer ${
                  currentPage === link.page ? 'text-[#1B362B] font-semibold' : 'text-[#171918]/80'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 border-b border-[#171918]/5 transition-colors cursor-pointer ${
                currentPage === 'contact' ? 'text-[#1B362B] font-semibold' : 'text-[#171918]/80'
              }`}
            >
              Contact &amp; Location
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2 text-[#1B362B] font-medium flex items-center gap-2 cursor-pointer pt-2"
            >
              <Shield className="w-4 h-4" />
              Staff Operations Portal
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
