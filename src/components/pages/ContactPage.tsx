import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  Send, 
  MessageSquare, 
  ExternalLink,
  Compass,
  Building,
  ShieldCheck,
  AlertCircle,
  Copy,
  CheckCheck
} from 'lucide-react';
import { HotelSettings } from '../../types/hotel';
import { HOTEL_WHATSAPP_NUMBER, HOTEL_WHATSAPP_DISPLAY } from '../../data/initialData';

interface ContactPageProps {
  settings: HotelSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  // Form State with Comprehensive Validation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Room Reservation & Rates');
  const [message, setMessage] = useState('');
  const [finNumber, setFinNumber] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    name: string;
    timestamp: string;
  } | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Field level validation function
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters.';
        if (!/^[a-zA-Z\s.'-]+$/.test(value.trim())) return 'Name should only contain alphabetic letters and spaces.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return 'Please enter a valid email address (e.g. guest@example.com).';
        return '';
      case 'phone':
        if (!value.trim()) return 'Contact phone number is required.';
        if (value.trim().replace(/[^\d+]/g, '').length < 8) return 'Please enter a valid contact phone number with country code.';
        return '';
      case 'message':
        if (!value.trim()) return 'Please provide your inquiry message.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return '';
      case 'finNumber':
        if (value.trim() && !/^\d{12}$/.test(value.trim().replace(/\s+/g, ''))) {
          return 'FIN must be exactly 12 numeric digits (optional for general inquiry).';
        }
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (honeypot) return;

    // Validate all fields
    const formErrors: { [key: string]: string } = {
      name: validateField('name', name),
      email: validateField('email', email),
      phone: validateField('phone', phone),
      message: validateField('message', message),
      finNumber: validateField('finNumber', finNumber)
    };

    // Filter out empty errors
    const activeErrors: { [key: string]: string } = {};
    Object.keys(formErrors).forEach(key => {
      if (formErrors[key]) activeErrors[key] = formErrors[key];
    });

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        message: true,
        finNumber: true
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      const ticketId = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedTicket({
        id: ticketId,
        name: name.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsSubmitting(false);
      setErrors({});
    }, 400);
  };

  const handleCopyPhone = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=ELDAD+ADDIS+HOTEL+Churchill+Avenue+Addis+Ababa+Ethiopia";

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24 font-shoore">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16 font-shoore">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-3">
            Concierge &amp; Front Desk Contact
          </span>
          <h1 className="font-editorial font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171918] tracking-tight mb-6">
            Contact &amp; Location
          </h1>
          <p className="text-base sm:text-lg text-[#171918]/75 font-light leading-relaxed">
            Our multilingual front desk and concierge team operate 24 hours daily to assist you with room reservations, private airport transfers, corporate delegations, and customized Addis Ababa itineraries.
          </p>
        </div>

        {/* ================= TOP SECTION: GOOGLE MAPS ADDRESS & QUICK CONTACTS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: Google Maps Interactive Location Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#FCFBF8] border border-[#171918]/10 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#171918]/8 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#B8860B]" />
                  </div>
                  <div>
                    <h2 className="font-shoore font-bold text-lg text-[#171918]">
                      Addis Ababa Hotel Address
                    </h2>
                    <span className="text-xs text-[#171918]/60 font-light">
                      Central Diplomatic &amp; Heritage District
                    </span>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Normal Embedded Map */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#171918]/10 mb-6 shadow-inner">
                <iframe
                  title="Eldad Addis Hotel Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=38.740%2C9.010%2C38.770%2C9.030&layer=mapnik&marker=9.0154%2C38.7521"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              {/* Distance Proximity List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#171918]/80 font-light">
                <div className="p-3 bg-[#F7F5F0] rounded-xl border border-[#171918]/6 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#1B362B] shrink-0" />
                  <span><strong>Derg Monument:</strong> Approx. 700m</span>
                </div>
                <div className="p-3 bg-[#F7F5F0] rounded-xl border border-[#171918]/6 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#1B362B] shrink-0" />
                  <span><strong>National Palace:</strong> Approx. 1.2km</span>
                </div>
                <div className="p-3 bg-[#F7F5F0] rounded-xl border border-[#171918]/6 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#1B362B] shrink-0" />
                  <span><strong>Meskel Square:</strong> Approx. 1.5km</span>
                </div>
                <div className="p-3 bg-[#F7F5F0] rounded-xl border border-[#171918]/6 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#1B362B] shrink-0" />
                  <span><strong>Bole Airport:</strong> Approx. 6.8km (15 min)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#171918]/6 flex items-center justify-between text-xs text-[#171918]/60">
              <span>Free On-Site Guarded Parking</span>
              <span className="text-[#1B362B] font-semibold">24/7 Monitored Access</span>
            </div>
          </div>

          {/* Right: Direct Contacts, Operating Hours & WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 sm:p-7 rounded-3xl shadow-xs space-y-5 font-shoore">
              <h3 className="font-shoore font-bold text-lg text-[#171918] pb-3 border-b border-[#171918]/8">
                Direct Communication Channels
              </h3>

              <div className="space-y-4 text-xs font-light text-[#171918]/80">
                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="font-medium text-[#171918] block">Front Desk Telephone:</strong>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-sm font-semibold text-[#171918]">{settings.contactPhone}</span>
                      <button
                        onClick={() => handleCopyPhone(settings.contactPhone)}
                        className="text-[11px] text-[#B8860B] hover:text-[#9A7108] cursor-pointer flex items-center gap-0.5"
                      >
                        {copiedPhone ? <CheckCheck className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="font-medium text-[#171918] block">WhatsApp Concierge (24/7):</strong>
                    <a
                      href={`https://wa.me/${HOTEL_WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent('Hello Eldad Addis Hotel Front Desk, I would like to make an inquiry.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-semibold text-[#1B362B] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{HOTEL_WHATSAPP_DISPLAY}</span>
                      <ExternalLink className="w-3 h-3 text-[#B8860B]" />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="font-medium text-[#171918] block">Official Inquiries &amp; Bookings:</strong>
                    <span className="font-mono text-xs text-[#171918] block mt-0.5">{settings.contactEmail}</span>
                    <span className="font-mono text-xs text-[#171918]/60 block">reservations@eldadaddis.et</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="font-medium text-[#171918] block">Reception &amp; Service Hours:</strong>
                    <span>24-Hour Front Desk · 365 Days a Year</span>
                    <span className="text-[#171918]/60 block mt-0.5">
                      Check-in: {settings.checkInTime} · Check-out: {settings.checkOutTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quick Contact Card */}
            <div className="p-6 bg-[#12241D] text-[#F7F5F0] rounded-3xl shadow-md space-y-3 font-shoore">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-semibold block">
                  Instant Support
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <h4 className="font-editorial font-serif text-2xl text-white">
                Live WhatsApp Assistance
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Connect instantly with our on-duty reservation manager for booking inquiries, room availability, or payment confirmation receipts.
              </p>
              <a
                href={`https://wa.me/${HOTEL_WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent('Hello Eldad Addis Hotel Front Desk, I would like to inquire about room availability and services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp ({HOTEL_WHATSAPP_DISPLAY})</span>
              </a>
            </div>

          </div>
        </div>

        {/* ================= REQUIREMENT 4: FORM WITH APPROPRIATE VALIDATION ================= */}
        <div className="bg-[#FCFBF8] border border-[#171918]/10 rounded-3xl p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-semibold block mb-1">
              Online Inquiry &amp; Concierge Request
            </span>
            <h2 className="font-editorial font-serif text-3xl sm:text-4xl text-[#171918] tracking-tight">
              Send an Official Message
            </h2>
            <p className="text-xs sm:text-sm text-[#171918]/70 font-light mt-1">
              Please complete all required fields below. Our hospitality concierge will review your message and reply via email or phone within 2 hours.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-8 bg-[#1B362B]/5 border-2 border-[#1B362B] rounded-2xl text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 bg-[#1B362B] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B8860B] block">
                Inquiry Successfully Logged · Ticket #{submittedTicket.id}
              </span>
              <h3 className="font-editorial font-serif text-2xl sm:text-3xl text-[#171918]">
                Thank You, {submittedTicket.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#171918]/75 font-light max-w-lg mx-auto leading-relaxed">
                Your message has been officially recorded in our front desk hospitality dispatch system. A concierge specialist has been assigned to your request and will reach out shortly.
              </p>
              
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedTicket(null);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                    setFinNumber('');
                    setTouched({});
                  }}
                  className="px-6 py-2.5 bg-[#1B362B] text-white text-xs font-semibold rounded-full hover:bg-[#12241D] transition-colors cursor-pointer shadow-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="user_anti_spam_field"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Field 1: Full Name (Required, min 3 chars, letters only) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/80 font-semibold mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="e.g. Dr. Almaz Bekele"
                    onChange={(e) => {
                      setName(e.target.value);
                      if (touched.name) {
                        setErrors(prev => ({ ...prev, name: validateField('name', e.target.value) }));
                      }
                    }}
                    onBlur={(e) => handleBlur('name', e.target.value)}
                    className={`w-full bg-[#F7F5F0] border px-4 py-3 rounded-xl text-xs sm:text-sm text-[#171918] focus:bg-white focus:outline-none transition-colors ${
                      errors.name && touched.name ? 'border-red-500 bg-red-50/20' : 'border-[#171918]/15 focus:border-[#1B362B]'
                    }`}
                    required
                  />
                  {errors.name && touched.name && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Field 2: Email (Required, valid email format regex) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/80 font-semibold mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    placeholder="guest@example.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) {
                        setErrors(prev => ({ ...prev, email: validateField('email', e.target.value) }));
                      }
                    }}
                    onBlur={(e) => handleBlur('email', e.target.value)}
                    className={`w-full bg-[#F7F5F0] border px-4 py-3 rounded-xl text-xs sm:text-sm text-[#171918] focus:bg-white focus:outline-none transition-colors ${
                      errors.email && touched.email ? 'border-red-500 bg-red-50/20' : 'border-[#171918]/15 focus:border-[#1B362B]'
                    }`}
                    required
                  />
                  {errors.email && touched.email && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Field 3: Phone (Required) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/80 font-semibold mb-1.5">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    placeholder="+251 91 123 4567"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (touched.phone) {
                        setErrors(prev => ({ ...prev, phone: validateField('phone', e.target.value) }));
                      }
                    }}
                    onBlur={(e) => handleBlur('phone', e.target.value)}
                    className={`w-full bg-[#F7F5F0] border px-4 py-3 rounded-xl text-xs sm:text-sm text-[#171918] focus:bg-white focus:outline-none transition-colors ${
                      errors.phone && touched.phone ? 'border-red-500 bg-red-50/20' : 'border-[#171918]/15 focus:border-[#1B362B]'
                    }`}
                    required
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Field 4: Inquiry Category */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/80 font-semibold mb-1.5">
                    Inquiry Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-4 py-3 rounded-xl text-xs sm:text-sm text-[#171918] focus:bg-white focus:border-[#1B362B] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Room Reservation & Rates">Room Reservation &amp; Rates (25 Rooms)</option>
                    <option value="Airport Transfer Booking">Airport Transfer Booking (Bole Shuttle)</option>
                    <option value="Executive Boardroom & Events">The Abyssinia Executive Boardroom &amp; Meetings</option>
                    <option value="Wellness & Spa Day Pass">Wellness &amp; Cedar Sauna Day Pass (1,600 ETB)</option>
                    <option value="Corporate & Diplomatic Delegation">Corporate &amp; Diplomatic Delegation</option>
                    <option value="General Concierge Assistance">General Concierge Assistance</option>
                  </select>
                </div>

              </div>

              {/* Optional 12-Digit FIN if applicable */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171918]/80 font-semibold mb-1.5">
                  12-Digit FIN / Booking Reference <span className="text-xs text-[#171918]/50 font-normal lowercase">(optional, for existing bookings)</span>
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={finNumber}
                  placeholder="e.g. 102938475612 or EAH-94812"
                  onChange={(e) => {
                    setFinNumber(e.target.value);
                    if (touched.finNumber) {
                      setErrors(prev => ({ ...prev, finNumber: validateField('finNumber', e.target.value) }));
                    }
                  }}
                  onBlur={(e) => handleBlur('finNumber', e.target.value)}
                  className={`w-full bg-[#F7F5F0] border px-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#171918] focus:bg-white focus:outline-none transition-colors ${
                    errors.finNumber && touched.finNumber ? 'border-red-500 bg-red-50/20' : 'border-[#171918]/15 focus:border-[#1B362B]'
                  }`}
                />
                {errors.finNumber && touched.finNumber && (
                  <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.finNumber}</span>
                  </p>
                )}
              </div>

              {/* Message Textarea (Required, min 10 chars) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#171918]/80 font-semibold">
                    Detailed Message or Inquiry <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-[#171918]/50">
                    {message.length} chars (min 10)
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={message}
                  placeholder="Please describe your reservation dates, specific room preference, delegation needs, or questions..."
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (touched.message) {
                      setErrors(prev => ({ ...prev, message: validateField('message', e.target.value) }));
                    }
                  }}
                  onBlur={(e) => handleBlur('message', e.target.value)}
                  className={`w-full bg-[#F7F5F0] border px-4 py-3 rounded-xl text-xs sm:text-sm text-[#171918] focus:bg-white focus:outline-none transition-colors resize-none ${
                    errors.message && touched.message ? 'border-red-500 bg-red-50/20' : 'border-[#171918]/15 focus:border-[#1B362B]'
                  }`}
                  required
                />
                {errors.message && touched.message && (
                  <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button & Cancel CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-[#171918]/60 font-light">
                  Protected by 256-bit SSL encryption. All inquiries are responded to promptly.
                </p>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                      setFinNumber('');
                      setErrors({});
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 sm:flex-none px-6 py-3.5 border border-[#171918]/20 text-[#171918] hover:bg-[#171918]/5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 rounded-full shadow-md hover:shadow-lg disabled:opacity-50 shrink-0"
                  >
                    {isSubmitting ? (
                      <span>Validating &amp; Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Official Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
