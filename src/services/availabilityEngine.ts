import { 
  IndividualRoom, 
  Reservation, 
  RoomCategory, 
  RoomCategoryType 
} from '../types/hotel';

export interface CategoryAvailability {
  category: RoomCategory;
  totalRooms: number;
  operationalRooms: number;
  bookedRooms: number;
  availableRooms: number;
  isAvailable: boolean;
  nightlyPrice: number;
  totalPrice: number;
}

export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const d1 = parseDate(checkIn).getTime();
  const d2 = parseDate(checkOut).getTime();
  const diffTime = d2 - d1;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function isDateOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  // Overlap condition: startA < endB && endA > startB
  return startA < endB && endA > startB;
}

export function getCategoryAvailability(
  category: RoomCategory,
  checkIn: string,
  checkOut: string,
  allRooms: IndividualRoom[],
  reservations: Reservation[]
): CategoryAvailability {
  const nights = calculateNights(checkIn, checkOut);
  
  // Find all individual physical rooms in this category
  const categoryRooms = allRooms.filter(r => r.category === category.name);
  const totalRooms = categoryRooms.length;
  
  // Filter out rooms currently undergoing maintenance or flagged unavailable
  const operationalRooms = categoryRooms.filter(
    r => r.status !== 'Maintenance' && r.status !== 'Unavailable'
  ).length;

  if (nights <= 0) {
    return {
      category,
      totalRooms,
      operationalRooms,
      bookedRooms: 0,
      availableRooms: operationalRooms,
      isAvailable: operationalRooms > 0,
      nightlyPrice: category.basePrice,
      totalPrice: category.basePrice,
    };
  }

  // Active reservations that overlap with requested range
  const activeReservations = reservations.filter(res => {
    if (res.roomType !== category.name) return false;
    if (res.reservationStatus === 'Cancelled' || res.reservationStatus === 'Checked Out') {
      return false;
    }
    return isDateOverlap(checkIn, checkOut, res.checkIn, res.checkOut);
  });

  const bookedRooms = activeReservations.length;
  const availableRooms = Math.max(0, operationalRooms - bookedRooms);

  return {
    category,
    totalRooms,
    operationalRooms,
    bookedRooms,
    availableRooms,
    isAvailable: availableRooms > 0,
    nightlyPrice: category.basePrice,
    totalPrice: category.basePrice * nights,
  };
}

export interface DetailedRoomAvailability {
  roomNumber: string;
  category: RoomCategoryType;
  floor: number;
  isAvailable: boolean;
  statusLabel: 'Available' | 'Booked for Selected Dates' | 'Maintenance' | 'Occupied';
  notes?: string;
}

export function getIndividualRoomAvailability(
  categoryType: RoomCategoryType,
  checkIn: string,
  checkOut: string,
  allRooms: IndividualRoom[],
  reservations: Reservation[]
): DetailedRoomAvailability[] {
  const categoryRooms = allRooms.filter(r => r.category === categoryType);

  return categoryRooms.map(room => {
    if (room.status === 'Maintenance' || room.status === 'Unavailable') {
      return {
        roomNumber: room.roomNumber,
        category: room.category,
        floor: room.floor,
        isAvailable: false,
        statusLabel: 'Maintenance',
        notes: room.notes || 'Under scheduled maintenance',
      };
    }

    // Check if reserved/booked for requested dates
    const conflictingReservation = reservations.find(res => {
      if (res.roomNumber !== room.roomNumber) return false;
      if (res.reservationStatus === 'Cancelled' || res.reservationStatus === 'Checked Out') {
        return false;
      }
      return isDateOverlap(checkIn, checkOut, res.checkIn, res.checkOut);
    });

    if (conflictingReservation) {
      return {
        roomNumber: room.roomNumber,
        category: room.category,
        floor: room.floor,
        isAvailable: false,
        statusLabel: 'Booked for Selected Dates',
        notes: `Booked (${conflictingReservation.checkIn} to ${conflictingReservation.checkOut})`,
      };
    }

    return {
      roomNumber: room.roomNumber,
      category: room.category,
      floor: room.floor,
      isAvailable: true,
      statusLabel: 'Available',
    };
  });
}

export function findAvailableRoomNumber(
  categoryType: RoomCategoryType,
  checkIn: string,
  checkOut: string,
  allRooms: IndividualRoom[],
  reservations: Reservation[]
): string | null {
  const candidateRooms = allRooms.filter(
    r => r.category === categoryType && r.status !== 'Maintenance' && r.status !== 'Unavailable'
  );

  for (const room of candidateRooms) {
    const hasOverlap = reservations.some(res => {
      if (res.roomNumber !== room.roomNumber) return false;
      if (res.reservationStatus === 'Cancelled' || res.reservationStatus === 'Checked Out') return false;
      return isDateOverlap(checkIn, checkOut, res.checkIn, res.checkOut);
    });

    if (!hasOverlap) {
      return room.roomNumber;
    }
  }

  // If no assigned physical room is strictly free, fallback to first operational room or null
  return candidateRooms.length > 0 ? candidateRooms[0].roomNumber : null;
}

export function generateBookingReference(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `EAH-${randomNum}`;
}

