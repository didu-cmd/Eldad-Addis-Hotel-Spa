export type RoomCategoryType = 
  | 'Presidential Suite' 
  | 'Deluxe Room' 
  | 'Twin Room' 
  | 'Standard Room';

export type RoomStatus = 
  | 'Available' 
  | 'Reserved' 
  | 'Occupied' 
  | 'Maintenance' 
  | 'Unavailable';

export type ReservationStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Checked In' 
  | 'Checked Out' 
  | 'Cancelled';

export type PaymentMethod = 'front_desk' | 'online';
export type PaymentStatus = 'Pending' | 'Paid' | 'Authorized';
export type AirportTransferOption = 'none' | 'arrival' | 'departure' | 'both';

export interface RoomCategory {
  id: string;
  name: RoomCategoryType;
  basePrice: number; // in ETB
  inventoryCount: number; // 5, 5, 6, 9 (total 25)
  maxOccupancy: number;
  bedConfig: string;
  sizeM2: number;
  description: string;
  coverImage: string;
  galleryImages: string[];
  amenities: string[];
}

export interface IndividualRoom {
  roomNumber: string; // e.g. "501"
  category: RoomCategoryType;
  floor: number;
  status: RoomStatus;
  currentReservationId?: string;
  notes?: string;
}

export interface Reservation {
  id: string;
  reference: string; // e.g. "EAH-83190"
  guestName: string;
  email: string;
  phone: string;
  idType?: string; // e.g. "Passport", "Driving License", "Fayda", "National ID"
  fanFinId: string; // Required identification number (FIN or Passport/ID No)
  roomNumber?: string; // Assigned room number
  roomType: RoomCategoryType;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  guests: number;
  specialRequests?: string;
  airportTransfer: AirportTransferOption;
  flightPickupDetails?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  reservationStatus: ReservationStatus;
  nightlyRate: number; // in ETB
  roomTotal: number;
  transferTotal: number;
  totalAmount: number; // in ETB
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  priceNote?: string;
  priceETB: number;
  dietary?: string[];
  imageUrl?: string;
  prepTime?: string;
  calories?: string;
  isChefSpecial?: boolean;
  isAvailable: boolean;
  ingredients?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Rooms' | 'Restaurant & Breakfast' | 'Spa & Wellness' | 'Sauna & Steam' | 'Gym' | 'Addis Ababa';
  imageUrl: string;
  caption: string;
}

export interface Attraction {
  id: string;
  name: string;
  distance: string; // e.g. "Approx. 700m", "Approx. 1.2km"
  description: string;
  imageUrl: string;
  googleMapsUrl?: string;
  address?: string;
}

export interface HotelPolicy {
  id: string;
  title: string;
  content: string;
  category: 'check_in_out' | 'wellness' | 'cancellation' | 'general';
}

export interface HotelSettings {
  hotelName: string;
  location: string;
  checkInTime: string;
  checkOutTime: string;
  contactEmail: string;
  contactPhone: string;
  reservationsEmail?: string;
  whatsAppNumber?: string;
  whatsAppDisplay?: string;
  addressLine: string;
  coordinates?: string;
  airportTransferPrice: number; // in ETB per one-way
  walkInSpaPrice: number; // 1600 ETB
  transferEnabled: boolean;
  totalRooms?: number;
  currency?: string;
  diningHours?: string;
  spaHours?: string;
  gymHours?: string;
  telebirrNumber?: string;
  cbeAccount?: string;
  boaAccount?: string;
  awashAccount?: string;
  dashenAccount?: string;
}

export interface AmenityBooking {
  id: string;
  reference: string;
  serviceId: string;
  serviceName: string;
  guestName: string;
  email: string;
  phone: string;
  isResident: boolean;
  roomNumber?: string;
  date: string;
  timeSlot: string;
  priceETB: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

