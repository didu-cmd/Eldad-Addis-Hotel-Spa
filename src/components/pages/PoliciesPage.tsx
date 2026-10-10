import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Flame, 
  CigaretteOff, 
  Wifi, 
  Car, 
  CheckCircle2, 
  CreditCard,
  Luggage,
  Users,
  Volume2,
  FileText,
  Plane,
  HeartHandshake
} from 'lucide-react';
import { HotelPolicy } from '../../types/hotel';

interface PoliciesPageProps {
  policies?: HotelPolicy[];
  onOpenBooking: () => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = () => {
  // Comprehensive list of hotel policies structured as an aesthetic unordered list
  const comprehensivePolicies = [
    {
      id: 'policy-checkin',
      icon: Clock,
      title: 'Check-In & Check-Out Operational Schedule',
      badge: 'Standard Schedule',
      description: 'Standard guest check-in commences promptly at 12:00 PM. Check-out is scheduled by 12:00 PM on the day of departure. Early arrivals and late departures are accommodated subject to room availability and front desk coordination. Complimentary luggage holding is provided for early arrivals.',
      highlights: [
        'Check-in: 12:00 PM onwards · 24-Hour front desk assistance',
        'Check-out: 12:00 PM noon',
        'Late check-out available upon front desk request (subject to availability)'
      ]
    },
    {
      id: 'policy-fin',
      icon: ShieldCheck,
      title: 'Mandatory FIN (Fayda Identification Number) Legal Registry',
      badge: 'Federal Compliance',
      description: 'In strict compliance with the Federal Democratic Republic of Ethiopia hospitality registry statutes, all adult resident guests are legally required to provide an official 12-digit FIN (Fayda Identification Number) or a valid international passport upon arrival. Reservations without authentic identity credentials cannot be checked in.',
      highlights: [
        'Mandatory 12-digit Ethiopian FIN or valid passport for all adult occupants',
        'Failure to present valid credentials incurs statutory hospitality compliance fines',
        'Secure guest data encryption and confidentiality guaranteed'
      ]
    },
    {
      id: 'policy-smoke-free',
      icon: CigaretteOff,
      title: '100% Smoke-Free & Non-Smoking Air Guarantee',
      badge: 'Health & Air Quality',
      description: 'Eldad Addis Hotel & Spa maintains an uncompromising 100% smoke-free indoor air environment throughout all 25 guest suites, corridors, elevators, dining salon, and wellness thermal areas. Electronic cigarettes, vaporizers, and traditional tobacco products are strictly prohibited indoors.',
      highlights: [
        'Strictly 100% smoke-free indoor premises',
        'A 5,000 ETB deep-cleaning and air purification fee applies to violations',
        'Designated exterior smoking areas available outside the main gate'
      ]
    },
    {
      id: 'policy-wellness',
      icon: Flame,
      title: 'Thermal Sanctuary, Cedar Sauna & Fitness Access',
      badge: 'Resident Privilege',
      description: 'Resident guests with confirmed room bookings enjoy complimentary, unlimited daily access to the Finnish cedar wood sauna (80°C–90°C), botanical eucalyptus steam chamber, and 24/7 cardiovascular fitness studio during their entire stay. Non-resident visitors may purchase an official day pass at the front desk.',
      highlights: [
        'Complimentary wellness & sauna access included with all 25 rooms',
        'Non-resident walk-in day pass: 1,600 ETB / person',
        'Sauna hours: 6:00 AM – 10:00 PM daily · Fitness gym: 24/7 keycard access'
      ]
    },
    {
      id: 'policy-quiet-hours',
      icon: Volume2,
      title: 'Quiet Hours & Acoustic Peace Guarantee',
      badge: 'Restful Sanctuary',
      description: 'To ensure restorative peace and privacy for all resting travelers, diplomats, and business delegates, quiet hours are observed across all accommodation corridors from 10:00 PM to 7:00 AM daily. Guests are requested to keep audio devices at low volume during these hours.',
      highlights: [
        'Quiet hours: 10:00 PM – 7:00 AM daily',
        'Acoustic double-glazed windows fitted in all suites',
        'Respectful communal atmosphere maintained 24/7'
      ]
    },
    {
      id: 'policy-cancellation',
      icon: FileText,
      title: 'Cancellation, Reservation Changes & Rescheduling',
      badge: 'Flexibility Terms',
      description: 'Direct room reservations may be cancelled or modified up to 24 hours prior to scheduled check-in date without penalty. For group delegations or peak season bookings, cancellation terms will be detailed in the confirmed booking voucher.',
      highlights: [
        'Free cancellation up to 24 hours before check-in',
        'Date modifications subject to room category availability',
        'Contact concierge via WhatsApp or phone for immediate booking adjustments'
      ]
    },
    {
      id: 'policy-payment',
      icon: CreditCard,
      title: 'Payment Methods & Official VAT Invoicing',
      badge: 'Authorized Billing',
      description: 'We accept instant Telebirr digital mobile transfers, direct Ethiopian commercial bank transfers (CBE, BOA, Awash Bank, Dashen Bank), certified Ethiopian Birr cash, and major credit cards. Official Ethiopian Ministry of Revenue VAT receipts and invoices are generated upon settlement.',
      highlights: [
        'Instant Telebirr (0911002233) and direct CBE / BOA / Awash / Dashen bank payments',
        'Official VAT invoices issued on check-out',
        'Credit cards accepted at front desk terminal'
      ]
    },
    {
      id: 'policy-luggage',
      icon: Luggage,
      title: 'Luggage Storage & Baggage Custody',
      badge: 'Complimentary Service',
      description: 'Complimentary secure luggage storage is available for registered guests prior to check-in time and following check-out. Our front desk porter team will issue an official baggage claim tag for secure retrieval.',
      highlights: [
        'Free luggage holding before check-in and post check-out',
        'Monitored baggage storage vault with numbered claim tickets',
        'Assistance with luggage loading and vehicle transfer'
      ]
    },
    {
      id: 'policy-visitors',
      icon: Users,
      title: 'Visitor & Security Access Guidelines',
      badge: 'Guest Safety',
      description: 'Non-resident guests and visitors are warmly welcomed in public areas, including the lobby lounge, dining room, and executive meeting salons until 10:00 PM. Overnight access to accommodation floors is strictly restricted to registered occupants with valid FIN or passport.',
      highlights: [
        'Day visitors permitted in lobby and dining areas until 10:00 PM',
        '24-Hour security surveillance and keycard-controlled elevators',
        'Overnight visitors must be officially registered at the front desk'
      ]
    },
    {
      id: 'policy-transfer',
      icon: Plane,
      title: 'Airport Transfer Logistics & Flight Coordination',
      badge: '24/7 Logistics',
      description: 'Private airport pickup and drop-off service between Addis Ababa Bole International Airport (Terminal 1 & 2) and Eldad Addis is available 24 hours a day at 900 ETB per trip. Guests are encouraged to provide their airline and flight number during booking.',
      highlights: [
        'Chauffeured Bole Airport transfers (900 ETB per one-way trip)',
        'Flight monitoring for delayed or early morning arrivals',
        'Meet-and-greet service at airport arrival terminal'
      ]
    },
    {
      id: 'policy-children',
      icon: HeartHandshake,
      title: 'Children, Extra Beds & Occupancy Standards',
      badge: 'Family Stays',
      description: 'Children under 6 years of age stay free of charge when sharing existing bedding with parents. Baby cots and infant cribs can be arranged upon advance notice. Rollaway beds for suites are available at a supplementary rate.',
      highlights: [
        'Children under 6 stay free in existing bedding',
        'Baby cribs available upon request (complimentary)',
        'Maximum suite occupancy enforced to maintain safety'
      ]
    },
    {
      id: 'policy-parking',
      icon: Car,
      title: 'Guarded Vehicle Parking & Valet Staging',
      badge: 'Secure Parking',
      description: 'Complimentary private on-premise parking with 24-hour security guards and video surveillance is provided for all residing hotel guests and restaurant visitors.',
      highlights: [
        'Free guarded on-site parking bay',
        '24/7 Monitored security perimeter and gate control',
        'Direct covered lobby access from parking area'
      ]
    }
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24 font-shoore">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-14 font-shoore">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-3">
            Hotel Regulations &amp; Operating Standards
          </span>
          <h1 className="font-editorial font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171918] tracking-tight mb-4">
            Hotel Policies
          </h1>
          <p className="text-sm sm:text-base text-[#171918]/75 font-light leading-relaxed max-w-3xl">
            Transparent operational standards ensuring quiet luxury, safety, and seamless hospitality for all guests residing at Eldad Addis Hotel &amp; Spa.
          </p>
        </div>

        {/* Quick Highlights Metric Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14 font-shoore">
          <div className="p-4 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl text-center shadow-xs">
            <Clock className="w-5 h-5 text-[#1B362B] mx-auto mb-2" />
            <span className="text-[10px] text-[#171918]/50 uppercase tracking-wider block">Check-In</span>
            <strong className="text-xs font-bold text-[#171918]">12:00 PM</strong>
          </div>

          <div className="p-4 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl text-center shadow-xs">
            <Clock className="w-5 h-5 text-[#1B362B] mx-auto mb-2" />
            <span className="text-[10px] text-[#171918]/50 uppercase tracking-wider block">Check-Out</span>
            <strong className="text-xs font-bold text-[#171918]">12:00 PM</strong>
          </div>

          <div className="p-4 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl text-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#B8860B] mx-auto mb-2" />
            <span className="text-[10px] text-[#171918]/50 uppercase tracking-wider block">Guest Registry</span>
            <strong className="text-xs font-bold text-[#1B362B]">12-Digit FIN</strong>
          </div>

          <div className="p-4 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl text-center shadow-xs">
            <CigaretteOff className="w-5 h-5 text-[#1B362B] mx-auto mb-2" />
            <span className="text-[10px] text-[#171918]/50 uppercase tracking-wider block">Air Quality</span>
            <strong className="text-xs font-bold text-[#171918]">100% Smoke-Free</strong>
          </div>

          <div className="p-4 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl text-center shadow-xs">
            <Wifi className="w-5 h-5 text-[#1B362B] mx-auto mb-2" />
            <span className="text-[10px] text-[#171918]/50 uppercase tracking-wider block">Wi-Fi</span>
            <strong className="text-xs font-bold text-[#171918]">Free Optical</strong>
          </div>

          <div className="p-4 bg-[#FCFBF8] border border-[#171918]/10 rounded-2xl text-center shadow-xs">
            <Car className="w-5 h-5 text-[#1B362B] mx-auto mb-2" />
            <span className="text-[10px] text-[#171918]/50 uppercase tracking-wider block">Parking</span>
            <strong className="text-xs font-bold text-[#171918]">Free Guarded</strong>
          </div>
        </div>

        {/* Requirement 2: Unordered List of Policies with Bold Typography & Small Font Descriptions */}
        <ul className="space-y-6 list-none p-0 m-0 font-shoore">
          {comprehensivePolicies.map((policy) => {
            const Icon = policy.icon;

            return (
              <li
                key={policy.id}
                className="bg-[#FCFBF8] border border-[#171918]/10 rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#1B362B]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 pb-3 border-b border-[#171918]/8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1B362B]/10 text-[#1B362B] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Bold Typography Title */}
                    <h3 className="font-shoore font-bold text-lg sm:text-xl text-[#171918] tracking-tight">
                      {policy.title}
                    </h3>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B8860B] bg-[#B8860B]/10 px-3 py-1 rounded-full shrink-0 self-start">
                    {policy.badge}
                  </span>
                </div>

                {/* Description with small fonts */}
                <p className="text-xs sm:text-sm text-[#171918]/75 font-light leading-relaxed mb-4">
                  {policy.description}
                </p>

                {/* Nested Highlights list */}
                {policy.highlights && policy.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-2 text-xs text-[#171918]/80 font-medium">
                    {policy.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B362B] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

      </div>
    </div>
  );
};
