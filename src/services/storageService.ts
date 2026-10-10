import { 
  RoomCategory, 
  IndividualRoom, 
  Reservation, 
  MenuItem, 
  GalleryItem, 
  Attraction, 
  HotelPolicy, 
  HotelSettings,
  ReservationStatus,
  RoomStatus,
  PaymentStatus,
  AmenityBooking
} from '../types/hotel';

import { 
  INITIAL_ROOM_CATEGORIES, 
  INITIAL_ROOMS, 
  INITIAL_RESERVATIONS, 
  INITIAL_MENU_ITEMS, 
  INITIAL_GALLERY, 
  INITIAL_ATTRACTIONS, 
  INITIAL_POLICIES, 
  INITIAL_SETTINGS 
} from '../data/initialData';

const STORAGE_KEYS = {
  CATEGORIES: 'eldad_categories_v6',
  ROOMS: 'eldad_rooms_v6',
  RESERVATIONS: 'eldad_reservations_v6',
  MENU: 'eldad_menu_v6',
  GALLERY: 'eldad_gallery_v6',
  ATTRACTIONS: 'eldad_attractions_v6',
  POLICIES: 'eldad_policies_v6',
  SETTINGS: 'eldad_settings_v6',
  AMENITY_BOOKINGS: 'eldad_amenity_bookings_v1',
};

class StorageService {
  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  // --- Generic Helpers ---
  private getItem<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  // --- Room Categories ---
  public getCategories(): RoomCategory[] {
    return this.getItem<RoomCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_ROOM_CATEGORIES);
  }

  public updateCategoryPrice(id: string, newPrice: number): void {
    const list = this.getCategories().map(c => c.id === id ? { ...c, basePrice: newPrice } : c);
    this.setItem(STORAGE_KEYS.CATEGORIES, list);
  }

  public updateCategory(updated: RoomCategory): void {
    const list = this.getCategories().map(c => c.id === updated.id ? updated : c);
    this.setItem(STORAGE_KEYS.CATEGORIES, list);
  }

  // --- Individual Rooms (all 25) ---
  public getRooms(): IndividualRoom[] {
    return this.getItem<IndividualRoom[]>(STORAGE_KEYS.ROOMS, INITIAL_ROOMS);
  }

  public updateRoomStatus(roomNumber: string, status: RoomStatus, notes?: string): void {
    const list = this.getRooms().map(r => {
      if (r.roomNumber === roomNumber) {
        return { ...r, status, notes: notes !== undefined ? notes : r.notes };
      }
      return r;
    });
    this.setItem(STORAGE_KEYS.ROOMS, list);
  }

  // --- Reservations ---
  public getReservations(): Reservation[] {
    return this.getItem<Reservation[]>(STORAGE_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
  }

  public addReservation(res: Reservation): void {
    const list = [res, ...this.getReservations()];
    this.setItem(STORAGE_KEYS.RESERVATIONS, list);

    // If room is assigned, update that room's operational status
    if (res.roomNumber && res.reservationStatus === 'Checked In') {
      this.updateRoomStatus(res.roomNumber, 'Occupied');
    } else if (res.roomNumber && res.reservationStatus === 'Confirmed') {
      this.updateRoomStatus(res.roomNumber, 'Reserved');
    }
  }

  public updateReservationStatus(id: string, status: ReservationStatus): void {
    const list = this.getReservations().map(r => {
      if (r.id === id) {
        return { ...r, reservationStatus: status, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    this.setItem(STORAGE_KEYS.RESERVATIONS, list);

    // Reflect on physical room
    const target = list.find(r => r.id === id);
    if (target && target.roomNumber) {
      if (status === 'Checked In') {
        this.updateRoomStatus(target.roomNumber, 'Occupied');
      } else if (status === 'Checked Out') {
        this.updateRoomStatus(target.roomNumber, 'Available');
      } else if (status === 'Cancelled') {
        this.updateRoomStatus(target.roomNumber, 'Available');
      }
    }
  }

  public cancelReservation(id: string, reason?: string): void {
    const list = this.getReservations().map(r => {
      if (r.id === id) {
        const noteAddition = reason ? `Cancelled by staff: ${reason}` : 'Cancelled by staff.';
        const newNotes = r.internalNotes ? `${r.internalNotes}\n[${new Date().toLocaleDateString()}] ${noteAddition}` : noteAddition;
        return { 
          ...r, 
          reservationStatus: 'Cancelled' as ReservationStatus, 
          internalNotes: newNotes,
          updatedAt: new Date().toISOString() 
        };
      }
      return r;
    });
    this.setItem(STORAGE_KEYS.RESERVATIONS, list);

    const target = list.find(r => r.id === id);
    if (target && target.roomNumber) {
      this.updateRoomStatus(target.roomNumber, 'Available');
    }
  }

  public updatePaymentStatus(id: string, paymentStatus: PaymentStatus): void {
    const list = this.getReservations().map(r => {
      if (r.id === id) {
        return { ...r, paymentStatus, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    this.setItem(STORAGE_KEYS.RESERVATIONS, list);
  }

  public updateReservationNotes(id: string, notes: string): void {
    const list = this.getReservations().map(r => {
      if (r.id === id) {
        return { ...r, internalNotes: notes, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    this.setItem(STORAGE_KEYS.RESERVATIONS, list);
  }

  public updateReservationRoom(id: string, roomNumber: string): void {
    const list = this.getReservations().map(r => {
      if (r.id === id) {
        return { ...r, roomNumber, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    this.setItem(STORAGE_KEYS.RESERVATIONS, list);
  }

  // --- Menu ---
  public getMenu(): MenuItem[] {
    return this.getItem<MenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU_ITEMS);
  }

  public updateMenuItem(item: MenuItem): void {
    const list = this.getMenu().map(m => m.id === item.id ? item : m);
    this.setItem(STORAGE_KEYS.MENU, list);
  }

  public addMenuItem(item: MenuItem): void {
    const list = [...this.getMenu(), item];
    this.setItem(STORAGE_KEYS.MENU, list);
  }

  public deleteMenuItem(id: string): void {
    const list = this.getMenu().filter(m => m.id !== id);
    this.setItem(STORAGE_KEYS.MENU, list);
  }

  // --- Gallery ---
  public getGallery(): GalleryItem[] {
    return this.getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  }

  public addGalleryItem(item: GalleryItem): void {
    const list = [...this.getGallery(), item];
    this.setItem(STORAGE_KEYS.GALLERY, list);
  }

  public deleteGalleryItem(id: string): void {
    const list = this.getGallery().filter(g => g.id !== id);
    this.setItem(STORAGE_KEYS.GALLERY, list);
  }

  // --- Attractions ---
  public getAttractions(): Attraction[] {
    return this.getItem<Attraction[]>(STORAGE_KEYS.ATTRACTIONS, INITIAL_ATTRACTIONS);
  }

  public updateAttraction(attraction: Attraction): void {
    const list = this.getAttractions().map(a => a.id === attraction.id ? attraction : a);
    this.setItem(STORAGE_KEYS.ATTRACTIONS, list);
  }

  // --- Policies ---
  public getPolicies(): HotelPolicy[] {
    return this.getItem<HotelPolicy[]>(STORAGE_KEYS.POLICIES, INITIAL_POLICIES);
  }

  public updatePolicy(policy: HotelPolicy): void {
    const list = this.getPolicies().map(p => p.id === policy.id ? policy : p);
    this.setItem(STORAGE_KEYS.POLICIES, list);
  }

  // --- Settings ---
  public getSettings(): HotelSettings {
    return this.getItem<HotelSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  public updateSettings(settings: Partial<HotelSettings>): void {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.setItem(STORAGE_KEYS.SETTINGS, updated);
  }

  // --- Amenity Bookings ---
  public getAmenityBookings(): AmenityBooking[] {
    return this.getItem<AmenityBooking[]>(STORAGE_KEYS.AMENITY_BOOKINGS, []);
  }

  public addAmenityBooking(booking: AmenityBooking): void {
    const list = [booking, ...this.getAmenityBookings()];
    this.setItem(STORAGE_KEYS.AMENITY_BOOKINGS, list);
  }

  public updateAmenityBookingStatus(id: string, status: 'Confirmed' | 'Completed' | 'Cancelled'): void {
    const list = this.getAmenityBookings().map(b => b.id === id ? { ...b, status } : b);
    this.setItem(STORAGE_KEYS.AMENITY_BOOKINGS, list);
  }

  public cancelAmenityBooking(id: string, reason?: string): void {
    const list = this.getAmenityBookings().map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b);
    this.setItem(STORAGE_KEYS.AMENITY_BOOKINGS, list);
  }

  // --- Reset to Factory Seed ---
  public resetToFactory(): void {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.ROOMS);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.ATTRACTIONS);
    localStorage.removeItem(STORAGE_KEYS.POLICIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.AMENITY_BOOKINGS);
    this.notify();
  }
}

export const storageService = new StorageService();
