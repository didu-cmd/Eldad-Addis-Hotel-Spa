import React, { useState, useEffect } from 'react';
import { 
  RoomCategory, 
  IndividualRoom, 
  Reservation, 
  MenuItem, 
  GalleryItem, 
  Attraction, 
  HotelPolicy, 
  HotelSettings,
  RoomCategoryType
} from './types/hotel';
import { storageService } from './services/storageService';
import { Navbar, NavigationPage } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { DiscoverSection } from './components/home/DiscoverSection';
import { StaySection } from './components/home/StaySection';
import { UnwindSection } from './components/home/UnwindSection';
import { DineSection } from './components/home/DineSection';
import { ExploreSection } from './components/home/ExploreSection';
import { DetailGallerySection } from './components/home/DetailGallerySection';
import { ReserveSection } from './components/home/ReserveSection';
import { RoomsPage } from './components/pages/RoomsPage';
import { FacilitiesPage } from './components/pages/FacilitiesPage';
import { DiningPage } from './components/pages/DiningPage';
import { WellnessPage } from './components/pages/WellnessPage';
import { ExplorePage } from './components/pages/ExplorePage';
import { GalleryPage } from './components/pages/GalleryPage';
import { PoliciesPage } from './components/pages/PoliciesPage';
import { ContactPage } from './components/pages/ContactPage';
import { AboutPage } from './components/pages/AboutPage';
import { BookingModal } from './components/booking/BookingModal';
import { AmenitiesBookingModal } from './components/booking/AmenitiesBookingModal';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  // Navigation & View state
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Booking modal state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [amenitiesModalOpen, setAmenitiesModalOpen] = useState(false);
  const [bookingInitialRoomType, setBookingInitialRoomType] = useState<RoomCategoryType | undefined>(undefined);
  const [bookingInitialCheckIn, setBookingInitialCheckIn] = useState<string | undefined>(undefined);
  const [bookingInitialCheckOut, setBookingInitialCheckOut] = useState<string | undefined>(undefined);
  const [bookingInitialGuests, setBookingInitialGuests] = useState<number>(2);

  // Synchronized persistent store data
  const [categories, setCategories] = useState<RoomCategory[]>(storageService.getCategories());
  const [allRooms, setAllRooms] = useState<IndividualRoom[]>(storageService.getRooms());
  const [reservations, setReservations] = useState<Reservation[]>(storageService.getReservations());
  const [menuItems, setMenuItems] = useState<MenuItem[]>(storageService.getMenu());
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(storageService.getGallery());
  const [attractions, setAttractions] = useState<Attraction[]>(storageService.getAttractions());
  const [policies, setPolicies] = useState<HotelPolicy[]>(storageService.getPolicies());
  const [settings, setSettings] = useState<HotelSettings>(storageService.getSettings());

  useEffect(() => {
    const unsubscribe = storageService.subscribe(() => {
      setCategories(storageService.getCategories());
      setAllRooms(storageService.getRooms());
      setReservations(storageService.getReservations());
      setMenuItems(storageService.getMenu());
      setGalleryItems(storageService.getGallery());
      setAttractions(storageService.getAttractions());
      setPolicies(storageService.getPolicies());
      setSettings(storageService.getSettings());
    });
    return unsubscribe;
  }, []);

  // Handlers for initiating bookings
  const handleOpenBooking = () => {
    setBookingInitialRoomType(undefined);
    setBookingInitialCheckIn(undefined);
    setBookingInitialCheckOut(undefined);
    setBookingInitialGuests(2);
    setBookingModalOpen(true);
  };

  const handleBookWithParams = (params: {
    checkIn: string;
    checkOut: string;
    roomType?: RoomCategoryType;
    guests: number;
  }) => {
    setBookingInitialCheckIn(params.checkIn);
    setBookingInitialCheckOut(params.checkOut);
    setBookingInitialRoomType(params.roomType);
    setBookingInitialGuests(params.guests);
    setBookingModalOpen(true);
  };

  const handleBookSpecificRoom = (roomType: RoomCategoryType) => {
    setBookingInitialRoomType(roomType);
    setBookingInitialCheckIn(undefined);
    setBookingInitialCheckOut(undefined);
    setBookingModalOpen(true);
  };

  const navigateToPage = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Admin Console if on admin page
  if (currentPage === 'admin') {
    return (
      <AdminPortal
        categories={categories}
        allRooms={allRooms}
        reservations={reservations}
        menuItems={menuItems}
        galleryItems={galleryItems}
        policies={policies}
        settings={settings}
        isLoggedIn={isAdminLoggedIn}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          setCurrentPage('home');
        }}
        onReturnToSite={() => navigateToPage('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#171918]">
      
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateToPage}
        onOpenBooking={handleOpenBooking}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Public Content */}
      <main className="flex-1">
        {/* VIEW: HOME - Editorial Visual Journey */}
        {currentPage === 'home' && (
          <>
            {/* Section 01: ARRIVE */}
            <HeroSection
              onBookWithParams={handleBookWithParams}
              onExplore={() => navigateToPage('rooms')}
            />

            {/* Section 02: DISCOVER */}
            <DiscoverSection
              onLearnMore={() => navigateToPage('facilities')}
            />

            {/* Section 03: STAY */}
            <StaySection
              categories={categories}
              onSelectCategory={handleBookSpecificRoom}
              onViewAllRooms={() => navigateToPage('rooms')}
            />

            {/* Section 04: UNWIND */}
            <UnwindSection
              onLearnMore={() => navigateToPage('facilities')}
            />

            {/* Section 05: DINE */}
            <DineSection
              onViewMenu={() => navigateToPage('dining')}
            />

            {/* Section 06: EXPERIENCE ADDIS */}
            <ExploreSection
              attractions={attractions}
              onViewAll={() => navigateToPage('explore')}
            />

            {/* Section 07: THE HOTEL, IN DETAIL */}
            <DetailGallerySection
              galleryItems={galleryItems}
              onViewAllGallery={() => navigateToPage('gallery')}
            />

            {/* Section 08: RESERVE */}
            <ReserveSection
              onOpenBooking={handleOpenBooking}
            />
          </>
        )}

        {/* VIEW: ABOUT */}
        {currentPage === 'about' && (
          <AboutPage
            onOpenBooking={handleOpenBooking}
            onNavigateToRooms={() => navigateToPage('rooms')}
            onNavigateToExplore={() => navigateToPage('explore')}
          />
        )}

        {/* VIEW: ROOMS */}
        {currentPage === 'rooms' && (
          <RoomsPage
            categories={categories}
            onBookRoom={handleBookSpecificRoom}
          />
        )}

        {/* VIEW: FACILITIES & WELLNESS (COMPILED) */}
        {(currentPage === 'facilities' || currentPage === 'wellness') && (
          <FacilitiesPage
            onOpenBooking={handleOpenBooking}
            onOpenAmenitiesBooking={() => setAmenitiesModalOpen(true)}
            onNavigateToDining={() => navigateToPage('dining')}
            onNavigateToWellness={() => navigateToPage('facilities')}
          />
        )}

        {/* VIEW: DINING & MENU */}
        {currentPage === 'dining' && (
          <DiningPage
            menuItems={menuItems}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* VIEW: EXPLORE ADDIS */}
        {currentPage === 'explore' && (
          <ExplorePage
            attractions={attractions}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* VIEW: GALLERY */}
        {currentPage === 'gallery' && (
          <GalleryPage
            galleryItems={galleryItems}
          />
        )}

        {/* VIEW: POLICIES */}
        {currentPage === 'policies' && (
          <PoliciesPage
            policies={policies}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {/* VIEW: CONTACT & FRONT DESK */}
        {currentPage === 'contact' && (
          <ContactPage
            settings={settings}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateToPage}
        onOpenBooking={handleOpenBooking}
      />

      {/* Global Booking Modal Architecture */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        categories={categories}
        allRooms={allRooms}
        reservations={reservations}
        settings={settings}
        initialRoomType={bookingInitialRoomType}
        initialCheckIn={bookingInitialCheckIn}
        initialCheckOut={bookingInitialCheckOut}
        initialGuests={bookingInitialGuests}
      />

      <AmenitiesBookingModal
        isOpen={amenitiesModalOpen}
        onClose={() => setAmenitiesModalOpen(false)}
        settings={settings}
      />

    </div>
  );
}
