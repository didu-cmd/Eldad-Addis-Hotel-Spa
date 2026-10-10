import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Plane, 
  ShieldCheck, 
  CreditCard, 
  Building, 
  Info,
  Printer,
  Clock,
  Copy,
  CheckCheck,
  MessageSquare,
  AlertTriangle,
  DoorClosed,
  Sparkles
} from 'lucide-react';
import { 
  RoomCategory, 
  IndividualRoom, 
  Reservation, 
  RoomCategoryType, 
  AirportTransferOption, 
  PaymentMethod,
  HotelSettings
} from '../../types/hotel';
import { 
  calculateNights, 
  getCategoryAvailability, 
  findAvailableRoomNumber, 
  getIndividualRoomAvailability,
  DetailedRoomAvailability,
  generateBookingReference 
} from '../../services/availabilityEngine';
import { 
  HOTEL_BANK_ACCOUNTS, 
  HOTEL_WHATSAPP_NUMBER, 
  HOTEL_WHATSAPP_DISPLAY 
} from '../../data/initialData';
import { storageService } from '../../services/storageService';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: RoomCategory[];
  allRooms: IndividualRoom[];
  reservations: Reservation[];
  settings: HotelSettings;
  initialRoomType?: RoomCategoryType;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  categories,
  allRooms,
  reservations,
  settings,
  initialRoomType,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}) => {
  // Step state: 1: Dates, 2: Room Category & Room Number Selection, 3: Guest & 12-digit FAN ID, 4: Payment & Transfer, 5: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form states
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultOut = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialCheckIn || todayStr);
  const [checkOut, setCheckOut] = useState(initialCheckOut || defaultOut);
  const [guests, setGuests] = useState(initialGuests);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomCategoryType>(initialRoomType || 'Presidential Suite');
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string>('');

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idType, setIdType] = useState<string>('Fayda');
  const [idNumber, setIdNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Airport Transfer
  const [transferOption, setTransferOption] = useState<AirportTransferOption>('none');
  const [flightDetails, setFlightDetails] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);

  // Confirmation result
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialRoomType) setSelectedRoomType(initialRoomType);
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setGuests(initialGuests);
  }, [initialRoomType, initialCheckIn, initialCheckOut, initialGuests]);

  // When room type or dates change, update available rooms and pick default available room number
  useEffect(() => {
    if (selectedRoomType && checkIn && checkOut) {
      const roomAvailability = getIndividualRoomAvailability(
        selectedRoomType,
        checkIn,
        checkOut,
        allRooms,
        reservations
      );
      const availableRooms = roomAvailability.filter(r => r.isAvailable);
      
      // If current selectedRoomNumber is not in available rooms, auto-select first available
      if (!selectedRoomNumber || !availableRooms.some(r => r.roomNumber === selectedRoomNumber)) {
        if (availableRooms.length > 0) {
          setSelectedRoomNumber(availableRooms[0].roomNumber);
        } else {
          setSelectedRoomNumber('');
        }
      }
    }
  }, [selectedRoomType, checkIn, checkOut, allRooms, reservations, selectedRoomNumber]);

  if (!isOpen) return null;

  const nights = calculateNights(checkIn, checkOut);

  // Pricing calculations
  const activeCategory = categories.find(c => c.name === selectedRoomType) || categories[0];
  const nightlyRate = activeCategory ? activeCategory.basePrice : 0;
  const roomTotal = nightlyRate * Math.max(1, nights);

  let transferTotal = 0;
  if (transferOption === 'arrival' || transferOption === 'departure') {
    transferTotal = settings.airportTransferPrice;
  } else if (transferOption === 'both') {
    transferTotal = settings.airportTransferPrice * 2;
  }
  const grandTotal = roomTotal + transferTotal;

  // Availability calculation for each category
  const availabilityMap = categories.map(cat => 
    getCategoryAvailability(cat, checkIn, checkOut, allRooms, reservations)
  );

  // Individual physical room availability for the currently selected category
  const currentCategoryRooms: DetailedRoomAvailability[] = selectedRoomType
    ? getIndividualRoomAvailability(selectedRoomType, checkIn, checkOut, allRooms, reservations)
    : [];

  const availableRoomsCountForSelected = currentCategoryRooms.filter(r => r.isAvailable).length;

  const handleCopyAccount = (bankId: string, accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBankId(bankId);
    setTimeout(() => setCopiedBankId(null), 3000);
  };

  // Step 1 validation
  const handleProceedToRooms = (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) {
      setFormErrors({ dates: 'Check-out date must be at least 1 day after check-in date.' });
      return;
    }
    setFormErrors({});
    setStep(2);
  };

  // Step 2 validation (Room & Room Number Selection)
  const handleProceedToGuestInfo = (category: RoomCategoryType, roomNum?: string) => {
    setSelectedRoomType(category);
    if (roomNum) {
      setSelectedRoomNumber(roomNum);
    }
    setStep(3);
  };

  // Step 3 validation: FAN ID must be 12 digits
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!guestName.trim()) errors.guestName = 'Full guest name is required.';
    if (!email.trim() || !email.includes('@')) errors.email = 'A valid email address is required.';
    if (!phone.trim()) errors.phone = 'Contact phone number is required.';
    
    // ID validation
    const cleanIdNumber = idNumber.trim().replace(/\s+/g, '');
    if (!cleanIdNumber) {
      errors.idNumber = `${idType} number is required.`;
    } else if (idType === 'Fayda' && !/^\d{12}$/.test(cleanIdNumber)) {
      errors.idNumber = 'FIN must be exactly 12 numeric digits (e.g. 102938475612).';
    }

    if (!selectedRoomNumber) {
      errors.roomNumber = 'Please select your preferred available room number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep(4);
  };

  // Step 4 final booking submission -> sets status to Pending Approval and sends to Staff section
  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRoomType) return;

    // Determine final assigned room number
    const finalRoomNum = selectedRoomNumber || findAvailableRoomNumber(
      selectedRoomType,
      checkIn,
      checkOut,
      allRooms,
      reservations
    ) || 'Pending Assignment';

    const bookingRef = generateBookingReference();
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      reference: bookingRef,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      idType,
      fanFinId: idNumber.trim().replace(/\s+/g, ''),
      roomNumber: finalRoomNum,
      roomType: selectedRoomType,
      checkIn,
      checkOut,
      nights,
      guests,
      specialRequests: specialRequests.trim() || undefined,
      airportTransfer: transferOption,
      flightPickupDetails: flightDetails.trim() || undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'online' ? 'Pending' : 'Pending',
      // Requirement 1: Sent to staff section for approval
      reservationStatus: 'Pending',
      nightlyRate,
      roomTotal,
      transferTotal,
      totalAmount: grandTotal,
      internalNotes: `Customer selected Room ${finalRoomNum}. Awaiting staff review and approval. Payment method: ${paymentMethod === 'online' ? 'Online Transfer (Telebirr/Bank)' : 'Front Desk'}.`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to storage (notifies staff and updates local inventory)
    storageService.addReservation(newReservation);
    setConfirmedReservation(newReservation);
    setStep(5);
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp prefilled message
  const whatsAppRef = confirmedReservation?.reference || 'EAH-BOOKING';
  const whatsAppRoom = confirmedReservation?.roomNumber || selectedRoomNumber || 'Selected Room';
  const whatsAppText = encodeURIComponent(
    `Hello Eldad Addis Hotel & Spa Staff, I have submitted a room reservation (Ref: ${whatsAppRef}) for ${selectedRoomType} - Room ${whatsAppRoom} from ${checkIn} to ${checkOut}. Please find attached my payment receipt screenshot for review and booking approval.`
  );
  const whatsAppLink = `https://wa.me/${HOTEL_WHATSAPP_NUMBER.replace('+', '')}?text=${whatsAppText}`;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#12241D]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-shoore"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div className="bg-[#FCFBF8] text-[#171918] w-full max-w-3xl border border-[#171918]/15 shadow-2xl rounded-3xl overflow-hidden relative my-4 sm:my-6 font-shoore max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-[#1B362B] text-[#F7F5F0] px-6 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#B8860B] font-semibold block font-shoore">
              Direct Reservation Engine
            </span>
            <h2 id="booking-title" className="font-serif text-2xl tracking-wide font-brand">
              ELDAD ADDIS HOTEL &amp; SPA
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Indicator */}
        <div className="bg-[#F7F5F0] border-b border-[#171918]/10 px-6 sm:px-8 py-3.5 flex items-center justify-between text-xs font-medium text-[#171918]/60 overflow-x-auto font-shoore">
          <div className={`flex items-center gap-1.5 whitespace-nowrap ${step >= 1 ? 'text-[#1B362B] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
            <span>Dates</span>
          </div>
          <span className="text-[#171918]/20">―</span>

          <div className={`flex items-center gap-1.5 whitespace-nowrap ${step >= 2 ? 'text-[#1B362B] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
            <span>Room &amp; Number</span>
          </div>
          <span className="text-[#171918]/20">―</span>

          <div className={`flex items-center gap-1.5 whitespace-nowrap ${step >= 3 ? 'text-[#1B362B] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
            <span>Guest &amp; FIN</span>
          </div>
          <span className="text-[#171918]/20">―</span>

          <div className={`flex items-center gap-1.5 whitespace-nowrap ${step >= 4 ? 'text-[#1B362B] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">4</span>
            <span>Banks &amp; Telebirr</span>
          </div>
          <span className="text-[#171918]/20">―</span>

          <div className={`flex items-center gap-1.5 whitespace-nowrap ${step === 5 ? 'text-[#1B362B] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">5</span>
            <span>Approval &amp; Receipt</span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* ================= STEP 1: DATES & GUEST COUNT ================= */}
          {step === 1 && (
            <form onSubmit={handleProceedToRooms} className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#171918] mb-1">
                  Select Dates of Stay
                </h3>
                <p className="text-xs text-[#171918]/65 font-light">
                  Check-in: 12:00 PM · Check-out: 12:00 PM. You can choose your exact room number on the next step.
                </p>
              </div>

              {formErrors.dates && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                  {formErrors.dates}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#1B362B]" /> Check-In Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={todayStr}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#1B362B]" /> Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || todayStr}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#1B362B]" /> Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests (Suites)</option>
                  </select>
                </div>

                <div className="p-3.5 bg-[#F7F5F0] border border-[#171918]/10 rounded-xl flex items-center justify-between">
                  <div className="text-xs text-[#171918]/70">
                    <span className="block font-medium text-[#171918]">Duration</span>
                    <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </div>
                  <Clock className="w-5 h-5 text-[#B8860B]" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#171918]/20 text-xs uppercase tracking-wider font-semibold text-[#171918] hover:bg-[#171918]/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <span>Select Room &amp; Room Number</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: ROOM CATEGORY & ROOM NUMBER SELECTION ================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#171918]/10 pb-3">
                <div>
                  <h3 className="font-serif text-2xl text-[#171918]">
                    Choose Category &amp; Room Number
                  </h3>
                  <p className="text-xs text-[#171918]/65 font-light">
                    {checkIn} to {checkOut} · {nights} {nights === 1 ? 'Night' : 'Nights'} · Select your desired room number
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#1B362B] underline font-medium cursor-pointer"
                >
                  Change Dates
                </button>
              </div>

              {/* Room Categories */}
              <div className="space-y-4">
                {availabilityMap.map((avail) => {
                  const isSelected = selectedRoomType === avail.category.name;
                  const isSelectable = avail.isAvailable;
                  const estimatedTotal = avail.category.basePrice * nights;

                  return (
                    <div
                      key={avail.category.id}
                      className={`p-4 border rounded-2xl transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1B362B] bg-[#1B362B]/4 shadow-sm ring-1 ring-[#1B362B]'
                          : isSelectable
                          ? 'border-[#171918]/15 bg-white hover:border-[#1B362B]'
                          : 'border-neutral-200 bg-neutral-50 opacity-60'
                      }`}
                      onClick={() => {
                        if (isSelectable) {
                          setSelectedRoomType(avail.category.name);
                        }
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-24 h-18 shrink-0 overflow-hidden rounded-xl shadow-xs">
                            <ImageWithFallback
                              src={avail.category.coverImage}
                              alt={avail.category.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-shoore font-semibold text-lg text-[#171918]">
                                {avail.category.name}
                              </h4>
                              {isSelectable ? (
                                <span className="text-[11px] text-[#1B362B] font-semibold px-2 py-0.5 bg-emerald-50 rounded-full">
                                  {avail.availableRooms} Available
                                </span>
                              ) : (
                                <span className="text-[11px] text-red-700 font-semibold px-2 py-0.5 bg-red-50 rounded-full">
                                  Fully Booked
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#171918]/60 mt-0.5">
                              {avail.category.bedConfig} · {avail.category.sizeM2} m² · Up to {avail.category.maxOccupancy} guests
                            </p>
                            <p className="text-[11px] text-[#171918]/70 mt-1">
                              {avail.category.amenities[0]} · {avail.category.amenities[1]}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0">
                          <div>
                            <span className="font-price font-semibold text-lg text-[#1B362B] block">
                              {avail.category.basePrice.toLocaleString()} ETB
                            </span>
                            <span className="text-[10px] text-[#171918]/50 block font-shoore">
                              {estimatedTotal.toLocaleString()} ETB for {nights} nights
                            </span>
                          </div>

                          <div className="mt-2">
                            {isSelectable && (
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                isSelected ? 'bg-[#1B362B] text-white' : 'bg-[#EAE7DF] text-[#171918]'
                              }`}>
                                {isSelected ? '✓ Selected' : 'Click to Select'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Requirement 2: Room Number Selector for Selected Category */}
              {selectedRoomType && (
                <div className="p-5 bg-white border border-[#1B362B]/30 rounded-2xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DoorClosed className="w-5 h-5 text-[#1B362B]" />
                      <span className="text-xs uppercase tracking-wider text-[#171918] font-bold">
                        Select Your Specific Room Number for {selectedRoomType}
                      </span>
                    </div>
                    <span className="text-xs text-[#1B362B] font-semibold">
                      {availableRoomsCountForSelected} of {currentCategoryRooms.length} Free
                    </span>
                  </div>
                  
                  <p className="text-xs text-[#171918]/65 font-light">
                    Click an available room below to choose your preferred room number and floor location:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-1">
                    {currentCategoryRooms.map((room) => {
                      const isPicked = selectedRoomNumber === room.roomNumber;
                      const isFree = room.isAvailable;

                      return (
                        <button
                          key={room.roomNumber}
                          type="button"
                          disabled={!isFree}
                          onClick={() => setSelectedRoomNumber(room.roomNumber)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isPicked
                              ? 'border-[#1B362B] bg-[#1B362B] text-white shadow-md ring-2 ring-[#B8860B]'
                              : isFree
                              ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 text-[#171918] cursor-pointer hover:border-emerald-400'
                              : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-mono font-bold text-sm ${isPicked ? 'text-white' : 'text-[#1B362B]'}`}>
                              Room {room.roomNumber}
                            </span>
                            {isPicked && <Check className="w-3.5 h-3.5 text-[#B8860B]" />}
                          </div>
                          <span className={`text-[10px] block ${isPicked ? 'text-white/80' : 'text-[#171918]/60'}`}>
                            Floor {room.floor}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-semibold block mt-1 ${
                            isPicked
                              ? 'text-[#B8860B]'
                              : isFree
                              ? 'text-emerald-700'
                              : 'text-neutral-500'
                          }`}>
                            {isFree ? (isPicked ? '★ Your Choice' : '● Available') : '✕ Booked / Maint.'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedRoomNumber && (
                    <div className="p-2.5 bg-[#F7F5F0] border border-[#1B362B]/20 rounded-xl flex items-center justify-between text-xs text-[#1B362B]">
                      <span>
                        Assigned Room: <strong className="font-mono text-sm">Room {selectedRoomNumber}</strong> ({selectedRoomType})
                      </span>
                      <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                        Ready for Reservation
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#171918]/70 hover:text-[#171918] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dates
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-red-700 hover:text-red-900 font-semibold uppercase tracking-wider cursor-pointer px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleProceedToGuestInfo(selectedRoomType, selectedRoomNumber)}
                  disabled={!selectedRoomNumber}
                  className="px-7 py-3 bg-[#1B362B] text-white hover:bg-[#12241D] disabled:opacity-50 text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <span>Continue with Room {selectedRoomNumber || 'Selected'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: GUEST INFORMATION & 12-DIGIT FIN ================= */}
          {step === 3 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#171918] mb-1">
                  Guest Identification &amp; Contact
                </h3>
                <p className="text-xs text-[#171918]/65 font-light">
                  Please provide guest details. FIN (12 Digits) is required by Ethiopian hospitality regulations.
                </p>
              </div>

              {/* Selected Room Summary Banner */}
              <div className="p-3.5 bg-[#F7F5F0] border border-[#171918]/10 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-shoore font-semibold text-sm text-[#1B362B] block">
                    {selectedRoomType} · Room {selectedRoomNumber}
                  </span>
                  <span className="text-[#171918]/60">
                    {checkIn} to {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'}) · {nightlyRate.toLocaleString()} ETB / night
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-price font-semibold text-base text-[#171918] block">
                    {roomTotal.toLocaleString()} ETB
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[10px] text-[#1B362B] underline cursor-pointer"
                  >
                    Change Room
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                    Full Guest Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    placeholder="e.g. Dr. Almaz Bekele"
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-sm text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                    required
                  />
                  {formErrors.guestName && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.guestName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    placeholder="guest@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-sm text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    placeholder="+251 91 123 4567"
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-sm text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                    Identification Type *
                  </label>
                  <select
                    value={idType}
                    onChange={(e) => {
                      setIdType(e.target.value);
                      if (e.target.value !== 'Fayda') {
                        setFormErrors(prev => ({ ...prev, idNumber: '' }));
                      }
                    }}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Fayda">Fayda (12-Digit Ethiopian National ID)</option>
                    <option value="Passport">Passport (International)</option>
                    <option value="Driving License">Driving License</option>
                    <option value="National ID">National / Resident ID</option>
                    <option value="Other">Other Government ID</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1B362B] font-semibold mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                    {idType === 'Fayda' ? 'FIN (12 Digits) *' : `${idType} Number *`}
                  </span>
                  {idType === 'Fayda' && (
                    <span className="text-[10px] font-mono text-[#171918]/50">
                      {idNumber.replace(/\s+/g, '').length}/12 Digits
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  maxLength={idType === 'Fayda' ? 12 : 30}
                  value={idNumber}
                  placeholder={idType === 'Fayda' ? 'Enter 12-Digit FIN (e.g. 102938475612)' : `Enter ${idType} Number`}
                  onChange={(e) => {
                    const val = idType === 'Fayda'
                      ? e.target.value.replace(/\D/g, '').slice(0, 12)
                      : e.target.value;
                    setIdNumber(val);
                  }}
                  className="w-full bg-[#F7F5F0] border border-[#1B362B]/40 px-3.5 py-2.5 rounded-xl text-sm font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none tracking-widest font-semibold"
                  required
                />
                {formErrors.idNumber && (
                  <p className="text-[11px] text-red-600 font-medium mt-1">{formErrors.idNumber}</p>
                )}
              </div>

              {/* Requirement: Mandatory Legal Notice about Fine for Random FIN */}
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-amber-950 uppercase tracking-wide text-[11px]">
                    Official Hospitality Regulatory Notice — 12-Digit FIN
                  </strong>
                  <p className="mt-1 leading-relaxed text-amber-900">
                    The FIN format must contain <strong>exactly 12 numeric digits</strong> issued by official authorities. 
                    <span className="font-bold underline ml-1">
                      Notice: Providing fictitious, random, or falsified numbers is strictly prohibited under Ethiopian hotel registry regulations and will incur a mandatory fine upon check-in physical verification.
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  placeholder="High floor, dietary preferences, or quiet room request..."
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#171918]/15 p-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[#171918]/70 hover:text-[#171918] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Rooms
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-red-700 hover:text-red-900 font-semibold uppercase tracking-wider cursor-pointer px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-7 py-3 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <span>Continue to Banks &amp; Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 4: BANKS, TELEBIRR & PAYMENT METHOD ================= */}
          {step === 4 && (
            <form onSubmit={handleFinalBooking} className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#171918] mb-1">
                  Payment &amp; Transfer Details
                </h3>
                <p className="text-xs text-[#171918]/65 font-light">
                  Copy our verified Telebirr or bank account details, complete the transfer, and send your receipt screenshot to WhatsApp for fast approval.
                </p>
              </div>

              {/* Airport Transfer Option Section */}
              <div className="p-4 bg-[#F7F5F0] border border-[#171918]/10 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#1B362B]" />
                    <span className="text-xs uppercase tracking-wider text-[#171918] font-semibold">
                      Airport ↔ Hotel Transfer Service
                    </span>
                  </div>
                  <span className="text-xs text-[#1B362B] font-medium">
                    {settings.airportTransferPrice.toLocaleString()} ETB / trip
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'none', label: 'No Transfer', cost: 0 },
                    { id: 'arrival', label: 'Airport → Hotel', cost: settings.airportTransferPrice },
                    { id: 'departure', label: 'Hotel → Airport', cost: settings.airportTransferPrice },
                    { id: 'both', label: 'Both Directions', cost: settings.airportTransferPrice * 2 },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTransferOption(opt.id as AirportTransferOption)}
                      className={`p-3 text-left border rounded-xl cursor-pointer transition-all ${
                        transferOption === opt.id
                          ? 'border-[#1B362B] bg-white font-medium text-[#1B362B] shadow-xs'
                          : 'border-[#171918]/10 bg-[#FCFBF8] text-[#171918]/70 hover:border-[#171918]/30'
                      }`}
                    >
                      <span className="block text-xs font-medium">{opt.label}</span>
                      <span className="text-[10px] text-[#171918]/50 block mt-0.5">
                        {opt.cost === 0 ? 'No charge' : `+${opt.cost.toLocaleString()} ETB`}
                      </span>
                    </button>
                  ))}
                </div>

                {transferOption !== 'none' && (
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                      Flight / Pickup Information
                    </label>
                    <input
                      type="text"
                      value={flightDetails}
                      placeholder="e.g. ET 602 arriving Bole Terminal 2 at 14:30"
                      onChange={(e) => setFlightDetails(e.target.value)}
                      className="w-full bg-white border border-[#171918]/15 px-3 py-2 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method Switcher */}
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-2">
                  Select Payment Method
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`p-4 border rounded-2xl text-left cursor-pointer transition-all ${
                      paymentMethod === 'online'
                        ? 'border-[#1B362B] bg-white shadow-sm ring-2 ring-[#1B362B]'
                        : 'border-[#171918]/10 bg-[#F7F5F0] hover:border-[#171918]/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[#1B362B] mb-1">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Online Payment (Telebirr &amp; Banks)
                      </span>
                    </div>
                    <p className="text-xs text-[#171918]/70">
                      Copy our verified Telebirr or Bank account number and send receipt to our official WhatsApp.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('front_desk')}
                    className={`p-4 border rounded-2xl text-left cursor-pointer transition-all ${
                      paymentMethod === 'front_desk'
                        ? 'border-[#1B362B] bg-white shadow-sm ring-2 ring-[#1B362B]'
                        : 'border-[#171918]/10 bg-[#F7F5F0] hover:border-[#171918]/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[#1B362B] mb-1">
                      <Building className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Pay at Front Desk
                      </span>
                    </div>
                    <p className="text-xs text-[#171918]/70">
                      Settle payment in cash (ETB/USD) or card upon arrival. Subject to staff review &amp; room hold approval.
                    </p>
                  </button>
                </div>

                {/* Requirement 5: Copy-Paste Ready Selected Banks and Telebirr Accounts */}
                {paymentMethod === 'online' && (
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#1B362B] font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#B8860B]" />
                        Official Accounts (Copy-Paste Ready)
                      </span>
                      <span className="text-[11px] text-[#171918]/60">
                        Total Due: <strong className="text-[#1B362B] font-mono">{grandTotal.toLocaleString()} ETB</strong>
                      </span>
                    </div>

                    <div className="space-y-3">
                      {HOTEL_BANK_ACCOUNTS.map((acc) => {
                        const isCopied = copiedBankId === acc.id;

                        return (
                          <div
                            key={acc.id}
                            className="p-3.5 bg-white border border-[#171918]/15 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-[#1B362B] transition-all"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs text-[#171918]">
                                  {acc.bankName}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#1B362B]/8 text-[#1B362B]">
                                  {acc.badgeText}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-[#171918]/60 text-[11px]">Account:</span>
                                <span className="font-mono font-bold text-sm text-[#1B362B] tracking-wider">
                                  {acc.accountNumber}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#171918]/60 block">
                                Name: {acc.accountName}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyAccount(acc.id, acc.accountNumber)}
                              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                isCopied
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-[#1B362B] hover:bg-[#12241D] text-white shadow-xs'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <CheckCheck className="w-3.5 h-3.5" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Account</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Requirement 5: WhatsApp Screenshot Message */}
                    <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 text-xs text-emerald-950">
                      <div className="flex items-center gap-2 text-emerald-900 font-bold">
                        <MessageSquare className="w-4 h-4 text-emerald-700" />
                        <span className="uppercase tracking-wider text-[11px]">
                          Send Payment Screenshot to WhatsApp for Instant Approval
                        </span>
                      </div>
                      <p className="leading-relaxed text-emerald-900/90">
                        After completing the transfer via Telebirr or your mobile banking app, please send a screenshot of the transaction receipt / SMS to our official WhatsApp at <strong>{HOTEL_WHATSAPP_DISPLAY}</strong>. Our front desk staff will verify and immediately approve your room booking.
                      </p>
                      <div className="pt-1">
                        <a
                          href={whatsAppLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Open WhatsApp Chat (+251 91 100 2233)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Total Summary */}
              <div className="p-5 bg-[#12241D] text-white rounded-2xl shadow-sm">
                <div className="space-y-1.5 text-xs text-white/70 border-b border-white/10 pb-3 font-shoore">
                  <div className="flex justify-between">
                    <span>{selectedRoomType} · Room {selectedRoomNumber} ({nights} nights)</span>
                    <span className="text-white font-mono">{roomTotal.toLocaleString()} ETB</span>
                  </div>
                  {transferTotal > 0 && (
                    <div className="flex justify-between">
                      <span>Airport Transfer ({transferOption})</span>
                      <span className="text-white font-mono">+{transferTotal.toLocaleString()} ETB</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Complimentary Spa &amp; Sauna Access</span>
                    <span className="text-[#B8860B]">Included (0 ETB)</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-3">
                  <span className="font-serif text-base text-white">Estimated Total</span>
                  <span className="font-serif text-2xl text-[#B8860B] font-medium">
                    {grandTotal.toLocaleString()} ETB
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-[#171918]/70 hover:text-[#171918] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Guest Details
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-red-700 hover:text-red-900 font-semibold uppercase tracking-wider cursor-pointer px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer shadow-lg flex items-center gap-2"
                >
                  <span>Submit Booking for Staff Approval</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 5: CONFIRMATION & APPROVAL NOTICE ================= */}
          {step === 5 && confirmedReservation && (
            <div className="space-y-6">
              <div className="text-center py-3">
                <div className="w-12 h-12 bg-[#B8860B] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-1">
                  Booking Request Submitted
                </span>
                <h3 className="font-serif text-3xl text-[#171918]">
                  Sent to Eldad Addis Staff for Approval
                </h3>
                <p className="text-xs text-[#171918]/70 font-light mt-1 max-w-lg mx-auto">
                  Your reservation for <strong>Room {confirmedReservation.roomNumber}</strong> has been transmitted to our front desk team. Once approved, Room {confirmedReservation.roomNumber} is officially locked for your dates.
                </p>
              </div>

              {/* Requirement 5: WhatsApp Screenshot Callout on Voucher */}
              {confirmedReservation.paymentMethod === 'online' && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-950 shadow-xs">
                  <div>
                    <strong className="block font-semibold text-emerald-900">
                      📲 Action Required: Send Receipt Screenshot to WhatsApp
                    </strong>
                    <span className="text-emerald-800/80">
                      Send your transfer receipt screenshot to WhatsApp (+251 91 100 2233) with Reference <strong>{confirmedReservation.reference}</strong>.
                    </span>
                  </div>
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap shadow-xs"
                  >
                    Open WhatsApp
                  </a>
                </div>
              )}

              {/* Official Voucher Card with rounded styling */}
              <div className="bg-white border-2 border-[#1B362B] rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#171918]/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">
                      Booking Reference
                    </span>
                    <span className="font-mono text-xl font-bold text-[#1B362B]">
                      {confirmedReservation.reference}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">
                      Reservation Status
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full">
                      ⏳ {confirmedReservation.reservationStatus} (Staff Approval)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">Guest</span>
                    <strong className="text-[#171918]">{confirmedReservation.guestName}</strong>
                  </div>
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">12-Digit FIN</span>
                    <span className="font-mono text-[#171918] font-bold">{confirmedReservation.fanFinId}</span>
                  </div>
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">Room Selected</span>
                    <strong className="text-[#1B362B] font-mono font-bold text-sm">
                      Room {confirmedReservation.roomNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">Room Category</span>
                    <span className="text-[#171918]">{confirmedReservation.roomType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-t border-[#171918]/10 pt-3">
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">Check-In</span>
                    <span>{confirmedReservation.checkIn} (12:00 PM)</span>
                  </div>
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">Check-Out</span>
                    <span>{confirmedReservation.checkOut} (12:00 PM)</span>
                  </div>
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">Payment</span>
                    <span className="capitalize">{confirmedReservation.paymentMethod.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-[#171918]/50 block text-[10px] uppercase">Total</span>
                    <strong className="font-price text-sm text-[#1B362B]">
                      {confirmedReservation.totalAmount.toLocaleString()} ETB
                    </strong>
                  </div>
                </div>

                {confirmedReservation.airportTransfer !== 'none' && (
                  <div className="text-xs bg-[#F7F5F0] p-3 rounded-xl border border-[#171918]/10">
                    <strong className="block text-[#1B362B]">Airport Transfer Configured:</strong>
                    <span>Option: {confirmedReservation.airportTransfer} · Details: {confirmedReservation.flightPickupDetails || 'Provided'}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-2.5 border border-[#171918]/20 text-[#171918] hover:bg-[#F7F5F0] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer rounded-full"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-2.5 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors rounded-full shadow-sm hover:shadow"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
