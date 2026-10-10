import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, Check, ArrowRight, ArrowLeft, ShieldCheck, Flame, Dumbbell, Coffee, Car, Building2, Printer } from 'lucide-react';
import { HotelSettings, PaymentMethod, AmenityBooking } from '../../types/hotel';
import { storageService } from '../../services/storageService';

export interface AmenityService {
  id: string;
  name: string;
  category: 'Spa & Wellness' | 'Dining & Culture' | 'Transport & Business';
  priceETB: number;
  duration: string;
  description: string;
  iconName: string;
}

const AMENITY_SERVICES: AmenityService[] = [
  {
    id: 'spa_steam',
    name: 'Signature Spa & Eucalyptus Steam',
    category: 'Spa & Wellness',
    priceETB: 1600,
    duration: '90 Mins',
    description: 'Resorative botanical eucalyptus steam infusion and altitude recovery thermal bathing.',
    iconName: 'Sparkles',
  },
  {
    id: 'cedar_sauna',
    name: 'Cedar Wood Sauna Thermal Suite',
    category: 'Spa & Wellness',
    priceETB: 1600,
    duration: '60 Mins',
    description: 'Hand-crafted Finnish cedar wood heated to 80°C–90°C for deep muscle recovery.',
    iconName: 'Flame',
  },
  {
    id: 'fitness_gym',
    name: 'Fitness Gym & Personal Coaching',
    category: 'Spa & Wellness',
    priceETB: 800,
    duration: '60 Mins',
    description: 'Access to cardio treadmills, free weights, and optional professional session.',
    iconName: 'Dumbbell',
  },
  {
    id: 'buna_ceremony',
    name: 'Traditional Ethiopian Buna Ceremony',
    category: 'Dining & Culture',
    priceETB: 650,
    duration: '45 Mins',
    description: 'Authentic Sidama coffee roasting, aromatic incense, and gourmet pastries.',
    iconName: 'Coffee',
  },
  {
    id: 'airport_vip',
    name: 'Airport VIP Chauffeur Transfer',
    category: 'Transport & Business',
    priceETB: 2200,
    duration: 'One-Way',
    description: 'Private airport pickup or dropoff from Addis Ababa Bole International Airport.',
    iconName: 'Car',
  },
  {
    id: 'meeting_salon',
    name: 'Executive Meeting Salon Reservation',
    category: 'Transport & Business',
    priceETB: 4500,
    duration: 'Half-Day',
    description: 'Private soundproofed boardroom equipped with high-speed fiber internet and display.',
    iconName: 'Building2',
  },
];

interface AmenitiesBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: HotelSettings;
}

export const AmenitiesBookingModal: React.FC<AmenitiesBookingModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(AMENITY_SERVICES[0].id);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(todayStr);
  const [bookingTime, setBookingTime] = useState('10:00 AM');

  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isResident, setIsResident] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [confirmedRef, setConfirmedRef] = useState<string>('');

  if (!isOpen) return null;

  const activeService = AMENITY_SERVICES.find(s => s.id === selectedServiceId) || AMENITY_SERVICES[0];
  
  // If resident guest and service is complimentary spa/sauna/gym, price is 0, otherwise standard walk-in price
  const isComplimentaryResident = isResident && (activeService.id === 'spa_steam' || activeService.id === 'cedar_sauna' || activeService.id === 'fitness_gym');
  const finalPrice = isComplimentaryResident ? 0 : activeService.priceETB;

  // Time blocking check
  const allAmenityBookings = storageService.getAmenityBookings();
  const bookedTimesForServiceDate = new Set(
    allAmenityBookings
      .filter(b => b.serviceId === selectedServiceId && b.date === bookingDate && b.status === 'Confirmed')
      .map(b => b.timeSlot)
  );

  const handleProceedToDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!guestName.trim()) errors.guestName = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email address is required.';
    if (!phone.trim()) errors.phone = 'Phone number is required.';
    if (isResident && !roomNumber.trim()) errors.roomNumber = 'Resident room number is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setStep(3);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `EAS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: AmenityBooking = {
      id: `ab_${Date.now()}`,
      reference: refCode,
      serviceId: activeService.id,
      serviceName: activeService.name,
      guestName,
      email,
      phone,
      isResident,
      roomNumber: isResident ? roomNumber : undefined,
      date: bookingDate,
      timeSlot: bookingTime,
      priceETB: finalPrice,
      paymentMethod: isComplimentaryResident ? 'online' : paymentMethod,
      paymentStatus: isComplimentaryResident ? 'Paid' : 'Pending',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    storageService.addAmenityBooking(newBooking);
    setConfirmedRef(refCode);
    setStep(4);
  };

  const timeSlots = [
    '08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-shoore">
      <div className="bg-[#F7F5F0] text-[#171918] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#171918]/10">
        
        {/* Modal Header */}
        <div className="bg-[#12241D] text-white p-6 sm:p-8 flex items-center justify-between relative">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-1">
              Eldad Addis Concierge
            </span>
            <h2 className="font-editorial font-serif text-2xl sm:text-3xl font-normal text-white">
              Amenities &amp; Services Booking
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {step < 4 && (
          <div className="bg-[#1B362B] text-white/70 px-6 py-3 text-xs flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 1 ? 'bg-[#B8860B] text-[#12241D]' : 'bg-white/20 text-white'}`}>1</span>
              <span className={step === 1 ? 'text-white font-semibold' : ''}>Select Service &amp; Time</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 2 ? 'bg-[#B8860B] text-[#12241D]' : 'bg-white/20 text-white'}`}>2</span>
              <span className={step === 2 ? 'text-white font-semibold' : ''}>Guest Details</span>
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 3 ? 'bg-[#B8860B] text-[#12241D]' : 'bg-white/20 text-white'}`}>3</span>
              <span className={step === 3 ? 'text-white font-semibold' : ''}>Confirmation &amp; Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: SELECT SERVICE & TIME */}
          {step === 1 && (
            <form onSubmit={handleProceedToDetails} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-3">
                  Select Amenity or Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AMENITY_SERVICES.map(service => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-[#1B362B] text-white border-[#1B362B] shadow-md' 
                            : 'bg-white text-[#171918] border-[#171918]/10 hover:border-[#B8860B]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md ${
                              isSelected ? 'bg-white/20 text-[#B8860B]' : 'bg-[#12241D]/5 text-[#B8860B]'
                            }`}>
                              {service.category}
                            </span>
                            <span className={`font-semibold text-xs ${isSelected ? 'text-[#B8860B]' : 'text-[#1B362B]'}`}>
                              {service.priceETB} ETB
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{service.name}</h4>
                          <p className={`text-xs font-light line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[#171918]/70'}`}>
                            {service.description}
                          </p>
                        </div>
                        <div className={`mt-3 pt-3 border-t text-[11px] flex items-center justify-between ${
                          isSelected ? 'border-white/10 text-white/70' : 'border-[#171918]/6 text-[#171918]/60'
                        }`}>
                          <span>Duration: {service.duration}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#B8860B]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#171918]/10">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-2">
                    Date of Service
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    min={todayStr}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#171918]/15 bg-white text-[#171918] text-sm focus:outline-none focus:border-[#B8860B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-2">
                    Preferred Time Slot (Time Blocked)
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#171918]/15 bg-white text-[#171918] text-sm focus:outline-none focus:border-[#B8860B]"
                  >
                    {timeSlots.map(time => {
                      const isBooked = bookedTimesForServiceDate.has(time);
                      return (
                        <option key={time} value={time} disabled={isBooked}>
                          {time} {isBooked ? '(Booked / Unavailable)' : ''}
                        </option>
                      );
                    })}
                  </select>
                  {bookedTimesForServiceDate.size > 0 && (
                    <span className="text-[10px] text-[#B8860B] mt-1 block">
                      Note: Some slots on this date are time-blocked due to prior reservations.
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-[#171918]/20 text-xs uppercase tracking-wider font-semibold text-[#171918] hover:bg-[#171918]/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#1B362B] hover:bg-[#12241D] text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  Continue to Guest Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === 2 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-[#171918]/10 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-semibold block">Selected Service</span>
                  <h4 className="font-semibold text-base text-[#1B362B]">{activeService.name}</h4>
                  <span className="text-xs text-[#171918]/70">{bookingDate} at {bookingTime} ({activeService.duration})</span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-[#171918]/50 block">Price</span>
                  <span className="font-semibold text-base text-[#B8860B]">{activeService.priceETB} ETB</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-[#1B362B]/5 rounded-xl border border-[#171918]/10">
                  <input
                    type="checkbox"
                    id="isResidentCheckbox"
                    checked={isResident}
                    onChange={(e) => setIsResident(e.target.checked)}
                    className="w-4 h-4 text-[#1B362B] rounded focus:ring-[#B8860B]"
                  />
                  <label htmlFor="isResidentCheckbox" className="text-xs text-[#171918] font-medium cursor-pointer">
                    I am currently a registered resident guest at Eldad Addis Hotel (Free spa, sauna &amp; gym access)
                  </label>
                </div>

                {isResident && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-2">
                      Resident Room Number (e.g. 501)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 501"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-[#171918] text-sm focus:outline-none ${
                        formErrors.roomNumber ? 'border-red-500' : 'border-[#171918]/15 focus:border-[#B8860B]'
                      }`}
                    />
                    {formErrors.roomNumber && <p className="text-xs text-red-600 mt-1">{formErrors.roomNumber}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-2">
                    Full Guest Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Abebe Kebede"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#171918] text-sm focus:outline-none ${
                      formErrors.guestName ? 'border-red-500' : 'border-[#171918]/15 focus:border-[#B8860B]'
                    }`}
                    required
                  />
                  {formErrors.guestName && <p className="text-xs text-red-600 mt-1">{formErrors.guestName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. abebe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-[#171918] text-sm focus:outline-none ${
                        formErrors.email ? 'border-red-500' : 'border-[#171918]/15 focus:border-[#B8860B]'
                      }`}
                      required
                    />
                    {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +251 91 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-[#171918] text-sm focus:outline-none ${
                        formErrors.phone ? 'border-red-500' : 'border-[#171918]/15 focus:border-[#B8860B]'
                      }`}
                      required
                    />
                    {formErrors.phone && <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-2">
                    Special Requests / Dietary Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific therapy preferences or allergies..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#171918]/15 bg-white text-[#171918] text-sm focus:outline-none focus:border-[#B8860B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#171918]/10">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl bg-white border border-[#171918]/15 text-[#171918] hover:bg-black/5 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#1B362B] hover:bg-[#12241D] text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-[#171918]/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#171918]/70">Service:</span>
                  <span className="font-semibold text-[#1B362B]">{activeService.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#171918]/70">Date &amp; Time:</span>
                  <span className="font-semibold text-[#1B362B]">{bookingDate} at {bookingTime}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#171918]/70">Guest:</span>
                  <span className="font-semibold text-[#1B362B]">{guestName} ({phone})</span>
                </div>
                <div className="pt-3 border-t border-[#171918]/10 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#171918]">Total Amount Due:</span>
                  <span className="font-price font-bold text-lg text-[#B8860B]">
                    {isComplimentaryResident ? '0 ETB (Resident Complimentary)' : `${finalPrice} ETB`}
                  </span>
                </div>
              </div>

              {!isComplimentaryResident && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B362B] mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod('online')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'online' 
                          ? 'bg-[#1B362B] text-white border-[#1B362B]' 
                          : 'bg-white text-[#171918] border-[#171918]/10'
                      }`}
                    >
                      <h4 className="font-semibold text-sm mb-1">Telebirr &amp; Mobile Banking</h4>
                      <p className={`text-xs ${paymentMethod === 'online' ? 'text-white/80' : 'text-[#171918]/70'}`}>
                        Pay via Telebirr (*127#) or CBE Birr instant mobile transfer.
                      </p>
                    </div>
                    <div
                      onClick={() => setPaymentMethod('front_desk')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === 'front_desk' 
                          ? 'bg-[#1B362B] text-white border-[#1B362B]' 
                          : 'bg-white text-[#171918] border-[#171918]/10'
                      }`}
                    >
                      <h4 className="font-semibold text-sm mb-1">Pay at Front Desk on Arrival</h4>
                      <p className={`text-xs ${paymentMethod === 'front_desk' ? 'text-white/80' : 'text-[#171918]/70'}`}>
                        Settle payment upon arrival at Eldad Addis reception desk.
                      </p>
                    </div>
                  </div>

                  {paymentMethod === 'online' && (
                    <div className="p-4 bg-white rounded-2xl border border-[#171918]/10 space-y-2 text-xs">
                      <span className="font-semibold text-[#1B362B] block">Official Hotel Accounts:</span>
                      <p className="text-[#171918]/80">Telebirr Merchant / Send Money: <strong className="text-[#B8860B]">{settings.telebirrNumber || '+251 91 100 2000'}</strong></p>
                      <p className="text-[#171918]/80">Commercial Bank of Ethiopia (CBE): <strong className="text-[#B8860B]">{settings.cbeAccount || '1000123456789'}</strong></p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#171918]/10">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-3 rounded-xl bg-white border border-[#171918]/15 text-[#171918] hover:bg-black/5 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#B8860B] hover:bg-[#966E09] text-[#12241D] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  Confirm Service Booking <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-[#B8860B]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-2">
                  Booking Confirmed Successfully
                </span>
                <h3 className="font-editorial font-serif text-3xl text-[#1B362B] mb-2">
                  We look forward to welcoming you
                </h3>
                <p className="text-xs text-[#171918]/70 max-w-md mx-auto">
                  Your reservation for <strong className="text-[#171918]">{activeService.name}</strong> on <strong className="text-[#171918]">{bookingDate}</strong> at <strong className="text-[#171918]">{bookingTime}</strong> has been confirmed.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#171918]/10 max-w-sm mx-auto space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Service Reference Code</span>
                <span className="font-mono font-bold text-2xl text-[#B8860B] block">{confirmedRef}</span>
                <span className="text-[11px] text-[#171918]/60 block">{guestName} | {phone}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-3 rounded-xl bg-white border border-[#171918]/15 text-[#171918] hover:bg-black/5 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Booking
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#1B362B] hover:bg-[#12241D] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer shadow-md transition-colors"
                >
                  Close &amp; Return to Site
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
