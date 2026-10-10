import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  LogOut, 
  Calendar, 
  Users, 
  Bed, 
  Search, 
  Check, 
  X, 
  AlertCircle, 
  Edit3, 
  Plus, 
  Trash2, 
  Settings, 
  RotateCcw,
  Clock,
  ArrowRight,
  Filter,
  DollarSign,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  Save,
  Undo2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Flame,
  Coffee,
  Sparkles,
  Building,
  CreditCard,
  Ban,
  Compass,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { 
  RoomCategory, 
  IndividualRoom, 
  Reservation, 
  MenuItem, 
  GalleryItem, 
  HotelPolicy, 
  HotelSettings, 
  ReservationStatus, 
  RoomStatus, 
  PaymentStatus, 
  RoomCategoryType 
} from '../../types/hotel';
import { storageService } from '../../services/storageService';
import { ASSET_IMAGES, INITIAL_SETTINGS } from '../../data/initialData';

interface AdminPortalProps {
  categories: RoomCategory[];
  allRooms: IndividualRoom[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  galleryItems: GalleryItem[];
  policies: HotelPolicy[];
  settings: HotelSettings;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onReturnToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  categories,
  allRooms,
  reservations,
  menuItems,
  galleryItems,
  policies,
  settings,
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  onReturnToSite,
}) => {
  // Passcode authentication state
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reservations' | 'rooms' | 'menu' | 'amenityBookings' | 'settings'>('dashboard');
  const [amenityStatusFilter, setAmenityStatusFilter] = useState<string>('all');

  // Reservation management state
  const [reservationSearch, setReservationSearch] = useState('');
  const [reservationStatusFilter, setReservationStatusFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [noteEdit, setNoteEdit] = useState('');
  
  // Non-blocking cancellation dialog state
  const [cancellingReservation, setCancellingReservation] = useState<Reservation | null>(null);
  const [cancellationReasonInput, setCancellationReasonInput] = useState('');

  // Room pricing modal
  const [editingCategory, setEditingCategory] = useState<RoomCategory | null>(null);
  const [categoryPriceInput, setCategoryPriceInput] = useState<number>(0);

  // Menu item management modal (Add / Edit / Image changer)
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [menuModalMode, setMenuModalMode] = useState<'add' | 'edit'>('add');
  const [currentMenuId, setCurrentMenuId] = useState<string | null>(null);
  const [menuName, setMenuName] = useState('');
  const [menuCategory, setMenuCategory] = useState<string>('Ethiopian Selection');
  const [menuPriceETB, setMenuPriceETB] = useState<number>(750);
  const [menuPriceNote, setMenuPriceNote] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [menuPrepTime, setMenuPrepTime] = useState('15 min');
  const [menuCalories, setMenuCalories] = useState('650 kcal');
  const [menuDietaryInput, setMenuDietaryInput] = useState('Chef Special');
  const [menuIngredientsInput, setMenuIngredientsInput] = useState('');
  const [menuIsChefSpecial, setMenuIsChefSpecial] = useState(false);
  const [menuIsAvailable, setMenuIsAvailable] = useState(true);
  
  // Menu Image selector state: 'url' vs 'gallery'
  const [menuImageSourceTab, setMenuImageSourceTab] = useState<'url' | 'gallery'>('gallery');
  const [menuImageUrl, setMenuImageUrl] = useState('');

  // Curated Preset Food & Beverage Photos for one-click selection
  const presetFoodImages = [
    { title: 'Artisanal Dining Salon', url: ASSET_IMAGES.restaurant },
    { title: 'Morning Breakfast Buffet', url: ASSET_IMAGES.breakfastBuffet },
    { title: 'Traditional Buna Ceremony', url: ASSET_IMAGES.coffeeCeremony },
    { title: 'Special Doro Wat & Injera', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sizzling Siga Tibs Claypot', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
    { title: 'Special Kitfo & Ayib', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
    { title: 'French Butter Croissant', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' },
    { title: 'Pain au Chocolat', url: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80' },
    { title: 'Croque Monsieur Brioche', url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
    { title: 'Chicken Caesar Salad', url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80' },
    { title: 'Grilled Beef Medallion', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
    { title: 'Pan-Seared Lake Tana Fish', url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80' },
    { title: 'Warm Chocolate Lava Cake', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Yirgacheffe Coffee V60', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
    { title: 'Fresh Layered Juice', url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80' }
  ];

  // Comprehensive Hotel Settings state
  const [hotelSettingsForm, setHotelSettingsForm] = useState<HotelSettings>({
    hotelName: settings.hotelName || 'ELDAD ADDIS HOTEL & SPA',
    location: settings.location || 'Addis Ababa, Ethiopia',
    totalRooms: settings.totalRooms || 25,
    currency: settings.currency || 'ETB',
    checkInTime: settings.checkInTime || '12:00 PM',
    checkOutTime: settings.checkOutTime || '12:00 PM',
    contactEmail: settings.contactEmail || 'contact@eldadaddis.et',
    contactPhone: settings.contactPhone || '+251 11 000 0000',
    reservationsEmail: settings.reservationsEmail || 'reservations@eldadaddis.et',
    whatsAppNumber: settings.whatsAppNumber || '+251911002233',
    whatsAppDisplay: settings.whatsAppDisplay || '+251 91 100 2233',
    addressLine: settings.addressLine || 'Churchill Avenue, Kirkos Sub-City, Addis Ababa, Ethiopia',
    coordinates: settings.coordinates || '9°01\'15.4"N 38°45\'22.1"E',
    airportTransferPrice: settings.airportTransferPrice || 900,
    walkInSpaPrice: settings.walkInSpaPrice || 1600,
    transferEnabled: settings.transferEnabled !== false,
    diningHours: settings.diningHours || '8:00 AM – 10:00 PM Daily',
    spaHours: settings.spaHours || '6:00 AM – 10:00 PM Daily',
    gymHours: settings.gymHours || '24/7 Keycard Access',
    telebirrNumber: settings.telebirrNumber || '0911002233',
    cbeAccount: settings.cbeAccount || '1000482910482',
    boaAccount: settings.boaAccount || '839102948102',
    awashAccount: settings.awashAccount || '01304910294800',
    dashenAccount: settings.dashenAccount || '51920394819211',
  });

  const [settingsActiveSubTab, setSettingsActiveSubTab] = useState<'brand' | 'contact' | 'schedule' | 'rates' | 'banking'>('brand');
  const [settingsFeedback, setSettingsFeedback] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Handle Staff PIN login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'DD2323' || pinInput.trim().toLowerCase() === 'admin') {
      setAuthError('');
      onLoginSuccess();
    } else {
      setAuthError('Invalid staff authorization passcode.');
    }
  };

  // If not logged in, render the secure staff gate
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#12241D] text-[#F7F5F0] flex items-center justify-center p-4 font-shoore">
        <div className="bg-[#1B362B] border border-white/10 p-8 sm:p-10 max-w-md w-full shadow-2xl rounded-3xl">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 bg-[#12241D] rounded-2xl flex items-center justify-center text-[#B8860B] shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8860B] block font-semibold">
                Restricted Operations
              </span>
              <h1 className="font-editorial font-serif text-2xl text-white">Staff Management Console</h1>
            </div>
          </div>

          <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
            Access to room inventory, guest FIN registrations, rate configuration, and reservation operations is restricted to authorized hotel staff.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">
                Staff Passcode
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Staff Passcode"
                className="w-full bg-[#12241D] border border-white/20 px-4 py-2.5 rounded-xl text-sm text-white focus:border-[#B8860B] focus:outline-none transition-colors"
                autoFocus
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-200 bg-red-950/60 p-3 rounded-xl border border-red-800/40">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#B8860B] hover:bg-[#D4A328] text-[#12241D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2"
            >
              Authorize &amp; Enter Console
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button
              onClick={onReturnToSite}
              className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculation helpers for Operational Dashboard
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysArrivals = reservations.filter(r => r.checkIn === todayStr && r.reservationStatus !== 'Cancelled');
  const todaysDepartures = reservations.filter(r => r.checkOut === todayStr && r.reservationStatus === 'Checked In');
  const inHouseGuests = reservations.filter(r => r.reservationStatus === 'Checked In');
  const pendingReservations = reservations.filter(r => r.reservationStatus === 'Pending');
  
  const occupiedRoomsCount = allRooms.filter(r => r.status === 'Occupied').length;
  const availableRoomsCount = allRooms.filter(r => r.status === 'Available').length;
  const maintenanceRoomsCount = allRooms.filter(r => r.status === 'Maintenance').length;
  const occupancyRate = Math.round((occupiedRoomsCount / 25) * 100);

  // Filtered reservations list
  const filteredReservations = reservations.filter(r => {
    const matchesSearch = 
      r.guestName.toLowerCase().includes(reservationSearch.toLowerCase()) ||
      r.reference.toLowerCase().includes(reservationSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(reservationSearch.toLowerCase()) ||
      r.fanFinId.toLowerCase().includes(reservationSearch.toLowerCase()) ||
      (r.roomNumber && r.roomNumber.includes(reservationSearch));
    
    const matchesStatus = 
      reservationStatusFilter === 'all' || r.reservationStatus === reservationStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Open Menu Editor Modal for new dish
  const handleOpenAddMenuModal = () => {
    setMenuModalMode('add');
    setCurrentMenuId(null);
    setMenuName('');
    setMenuCategory('Ethiopian Selection');
    setMenuPriceETB(750);
    setMenuPriceNote('');
    setMenuDescription('');
    setMenuPrepTime('15 min');
    setMenuCalories('650 kcal');
    setMenuDietaryInput('Chef Special');
    setMenuIngredientsInput('');
    setMenuIsChefSpecial(false);
    setMenuIsAvailable(true);
    setMenuImageUrl(presetFoodImages[3].url);
    setMenuImageSourceTab('gallery');
    setMenuModalOpen(true);
  };

  // Open Menu Editor Modal for existing dish
  const handleOpenEditMenuModal = (item: MenuItem) => {
    setMenuModalMode('edit');
    setCurrentMenuId(item.id);
    setMenuName(item.name);
    setMenuCategory(item.category);
    setMenuPriceETB(item.priceETB || 0);
    setMenuPriceNote(item.priceNote || '');
    setMenuDescription(item.description);
    setMenuPrepTime(item.prepTime || '15 min');
    setMenuCalories(item.calories || '550 kcal');
    setMenuDietaryInput(item.dietary ? item.dietary.join(', ') : '');
    setMenuIngredientsInput(item.ingredients ? item.ingredients.join(', ') : '');
    setMenuIsChefSpecial(!!item.isChefSpecial);
    setMenuIsAvailable(item.isAvailable);
    setMenuImageUrl(item.imageUrl || presetFoodImages[0].url);
    setMenuImageSourceTab('url');
    setMenuModalOpen(true);
  };

  // Save Menu Item (Add or Edit)
  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuName.trim()) return;

    const dietaryArray = menuDietaryInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const ingredientsArray = menuIngredientsInput
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    const itemPayload: MenuItem = {
      id: currentMenuId || `menu-${Date.now()}`,
      name: menuName.trim(),
      category: menuCategory,
      priceETB: Number(menuPriceETB) || 0,
      priceNote: menuPriceNote.trim() || undefined,
      description: menuDescription.trim(),
      prepTime: menuPrepTime.trim() || undefined,
      calories: menuCalories.trim() || undefined,
      dietary: dietaryArray.length > 0 ? dietaryArray : undefined,
      ingredients: ingredientsArray.length > 0 ? ingredientsArray : undefined,
      isChefSpecial: menuIsChefSpecial,
      isAvailable: menuIsAvailable,
      imageUrl: menuImageUrl.trim() || presetFoodImages[0].url
    };

    if (menuModalMode === 'edit') {
      storageService.updateMenuItem(itemPayload);
    } else {
      storageService.addMenuItem(itemPayload);
    }

    setMenuModalOpen(false);
  };

  // Execute Non-blocking Reservation Cancellation
  const handleConfirmCancelReservation = () => {
    if (!cancellingReservation) return;
    
    storageService.cancelReservation(cancellingReservation.id, cancellationReasonInput.trim());
    
    if (selectedReservation?.id === cancellingReservation.id) {
      setSelectedReservation({
        ...selectedReservation,
        reservationStatus: 'Cancelled',
        internalNotes: cancellingReservation.internalNotes 
          ? `${cancellingReservation.internalNotes} | Cancelled: ${cancellationReasonInput.trim() || 'Admin action'}`
          : `Cancelled: ${cancellationReasonInput.trim() || 'Admin action'}`
      });
    }

    setCancellingReservation(null);
    setCancellationReasonInput('');
  };

  // Save All Hotel Settings
  const handleSaveHotelSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.updateSettings(hotelSettingsForm);
    setSettingsFeedback({ message: 'Hotel operational settings successfully synchronized across all systems.', type: 'success' });
    setTimeout(() => setSettingsFeedback(null), 3500);
  };

  // Reset settings to initial defaults
  const handleResetSettingsDefaults = () => {
    setHotelSettingsForm({ ...INITIAL_SETTINGS });
    storageService.updateSettings({ ...INITIAL_SETTINGS });
    setSettingsFeedback({ message: 'Hotel settings reset to recommended defaults.', type: 'info' });
    setTimeout(() => setSettingsFeedback(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#171918] flex flex-col font-shoore">
      
      {/* Top Staff Navigation Header */}
      <header className="bg-[#12241D] text-[#F7F5F0] border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#1B362B] flex items-center justify-center text-[#B8860B] border border-white/10 shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8860B] block font-semibold">
                Authorized Operations
              </span>
              <h2 className="font-editorial font-serif text-xl sm:text-2xl text-white">
                ELDAD ADDIS STAFF CONSOLE
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToSite}
              className="px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-all cursor-pointer hidden sm:flex items-center gap-1.5"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onLogout}
              className="p-2 sm:px-4 sm:py-2 rounded-full bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Logout from Staff Console"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Tab Navigation Bar */}
      <div className="bg-[#FCFBF8] border-b border-[#171918]/10 sticky top-20 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'border-[#1B362B] text-[#1B362B] font-bold'
                : 'border-transparent text-[#171918]/60 hover:text-[#171918]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Dashboard</span>
            {pendingReservations.length > 0 && (
              <span className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-[10px] tabular-nums font-bold animate-pulse">
                {pendingReservations.length} Pending
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reservations'
                ? 'border-[#1B362B] text-[#1B362B] font-bold'
                : 'border-transparent text-[#171918]/60 hover:text-[#171918]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Reservations</span>
            <span className="px-2 py-0.5 bg-[#1B362B]/10 rounded-full text-[10px] tabular-nums font-semibold">
              {reservations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rooms'
                ? 'border-[#1B362B] text-[#1B362B] font-bold'
                : 'border-transparent text-[#171918]/60 hover:text-[#171918]'
            }`}
          >
            <Bed className="w-4 h-4" />
            <span>Rooms (25 Inventory)</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'menu'
                ? 'border-[#1B362B] text-[#1B362B] font-bold'
                : 'border-transparent text-[#171918]/60 hover:text-[#171918]'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Restaurant Menu</span>
            <span className="px-2 py-0.5 bg-[#B8860B]/10 text-[#B8860B] rounded-full text-[10px] tabular-nums font-bold">
              {menuItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('amenityBookings')}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'amenityBookings'
                ? 'border-[#1B362B] text-[#1B362B] font-bold'
                : 'border-transparent text-[#171918]/60 hover:text-[#171918]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <span>Amenity Bookings</span>
            <span className="px-2 py-0.5 bg-[#1B362B]/10 text-[#1B362B] rounded-full text-[10px] tabular-nums font-bold">
              {storageService.getAmenityBookings().length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-[#1B362B] text-[#1B362B] font-bold'
                : 'border-transparent text-[#171918]/60 hover:text-[#171918]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Hotel Settings &amp; Info</span>
          </button>
        </div>
      </div>

      {/* Main Admin Workspace Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full">
        
        {/* ================= TAB 1: OPERATIONAL DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-4.5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Today's Arrivals</span>
                <span className="font-serif text-3xl font-medium text-[#1B362B] block my-1">
                  {todaysArrivals.length}
                </span>
                <span className="text-[11px] text-[#171918]/60">Expected check-in</span>
              </div>

              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-4.5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Today's Departures</span>
                <span className="font-serif text-3xl font-medium text-[#171918] block my-1">
                  {todaysDepartures.length}
                </span>
                <span className="text-[11px] text-[#171918]/60">Due by 12:00 PM</span>
              </div>

              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-4.5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Current In-House</span>
                <span className="font-serif text-3xl font-medium text-[#1B362B] block my-1">
                  {inHouseGuests.length}
                </span>
                <span className="text-[11px] text-[#171918]/60">Checked in</span>
              </div>

              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-4.5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Occupied Rooms</span>
                <span className="font-serif text-3xl font-medium text-[#1B362B] block my-1">
                  {occupiedRoomsCount} <span className="text-sm font-sans text-[#171918]/40">/ 25</span>
                </span>
                <span className="text-[11px] text-[#171918]/60">{occupancyRate}% occupancy</span>
              </div>

              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-4.5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Available Rooms</span>
                <span className="font-serif text-3xl font-medium text-emerald-800 block my-1">
                  {availableRoomsCount}
                </span>
                <span className="text-[11px] text-[#171918]/60">Ready for booking</span>
              </div>

              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-4.5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Maintenance</span>
                <span className="font-serif text-3xl font-medium text-amber-700 block my-1">
                  {maintenanceRoomsCount}
                </span>
                <span className="text-[11px] text-[#171918]/60">Out of service</span>
              </div>
            </div>

            {/* Pending Approvals Urgent Alert Banner */}
            {pendingReservations.length > 0 && (
              <div className="bg-amber-50 border-2 border-amber-400 p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {pendingReservations.length}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-amber-950 font-bold">
                        Pending Guest Bookings Requiring Staff Action
                      </h3>
                      <p className="text-xs text-amber-800">
                        Submitted via website. You can approve and lock the room, review details, or cancel the reservation.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-200 text-amber-900 rounded-full w-fit">
                    ⏳ {pendingReservations.length} Action Required
                  </span>
                </div>

                <div className="space-y-3">
                  {pendingReservations.map(res => (
                    <div key={res.id} className="p-4 bg-white border border-amber-300 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-[#1B362B] text-sm">{res.reference}</span>
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold uppercase rounded-full">
                            Pending Approval
                          </span>
                          <span className="text-xs text-[#171918]/60">· {new Date(res.createdAt).toLocaleDateString()}</span>
                        </div>
                        <strong className="text-base text-[#171918] block">{res.guestName}</strong>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#171918]/70 mt-1">
                          <span><strong>Requested Room:</strong> <span className="text-[#1B362B] font-bold font-mono">Room {res.roomNumber}</span> ({res.roomType})</span>
                          <span><strong>Dates:</strong> {res.checkIn} → {res.checkOut} ({res.nights} {res.nights === 1 ? 'night' : 'nights'})</span>
                          <span><strong>12-Digit FIN:</strong> <span className="font-mono font-semibold">{res.fanFinId}</span></span>
                          <span><strong>Payment:</strong> <span className="font-price font-bold text-[#1B362B]">{res.totalAmount.toLocaleString()} ETB</span> ({res.paymentMethod})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            storageService.updateReservationStatus(res.id, 'Confirmed');
                            if (res.paymentMethod === 'online') {
                              storageService.updatePaymentStatus(res.id, 'Paid');
                            }
                          }}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve &amp; Confirm</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReservation(res);
                            setNoteEdit(res.internalNotes || '');
                          }}
                          className="px-3.5 py-2 bg-[#1B362B] text-white text-xs font-medium rounded-full cursor-pointer hover:bg-[#12241D] transition-all"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setCancellingReservation(res);
                            setCancellationReasonInput('');
                          }}
                          className="px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 text-xs font-semibold rounded-full cursor-pointer transition-all flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Tables: Arrivals & Departures */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Arrivals Card */}
              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between border-b border-[#171918]/10 pb-3 mb-4">
                  <h3 className="font-serif text-xl text-[#171918]">Today's Guest Arrivals</h3>
                  <span className="text-xs text-[#1B362B] font-semibold">{todaysArrivals.length} Expected</span>
                </div>

                {todaysArrivals.length === 0 ? (
                  <p className="text-xs text-[#171918]/50 py-4 italic text-center">
                    No arrivals scheduled for today.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {todaysArrivals.map(res => (
                      <div key={res.id} className="p-3 bg-[#F7F5F0] rounded-2xl flex items-center justify-between text-xs border border-[#171918]/6">
                        <div>
                          <strong className="block text-[#171918]">{res.guestName}</strong>
                          <span className="text-[#171918]/60">
                            Room {res.roomNumber} · {res.roomType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              storageService.updateReservationStatus(res.id, 'Checked In');
                            }}
                            className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded-full font-medium"
                          >
                            Check In
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Departures Card */}
              <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between border-b border-[#171918]/10 pb-3 mb-4">
                  <h3 className="font-serif text-xl text-[#171918]">Today's Expected Departures</h3>
                  <span className="text-xs text-[#171918]/60 font-semibold">{todaysDepartures.length} Due</span>
                </div>

                {todaysDepartures.length === 0 ? (
                  <p className="text-xs text-[#171918]/50 py-4 italic text-center">
                    No departures due for check-out today.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {todaysDepartures.map(res => (
                      <div key={res.id} className="p-3 bg-[#F7F5F0] rounded-2xl flex items-center justify-between text-xs border border-[#171918]/6">
                        <div>
                          <strong className="block text-[#171918]">{res.guestName}</strong>
                          <span className="text-[#171918]/60">
                            Room {res.roomNumber} · Depart 12:00 PM
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              storageService.updateReservationStatus(res.id, 'Checked Out');
                            }}
                            className="px-3 py-1 bg-neutral-800 hover:bg-neutral-900 text-white rounded-full font-medium"
                          >
                            Check Out
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: RESERVATIONS MANAGER ================= */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171918]/10 pb-6 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171918]">All Hotel Reservations</h3>
                  <p className="text-xs text-[#171918]/60 font-light mt-0.5">
                    View guest registrations, 12-digit FIN records, check-in statuses, or cancel bookings.
                  </p>
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#171918]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, FIN, ref, room..."
                      value={reservationSearch}
                      onChange={(e) => setReservationSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-[#F7F5F0] border border-[#171918]/15 rounded-full text-xs text-[#171918] focus:outline-none focus:border-[#1B362B] w-56"
                    />
                  </div>

                  <select
                    value={reservationStatusFilter}
                    onChange={(e) => setReservationStatusFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#F7F5F0] border border-[#171918]/15 rounded-full text-xs text-[#171918] focus:outline-none focus:border-[#1B362B] cursor-pointer"
                  >
                    <option value="all">All Statuses ({reservations.length})</option>
                    <option value="Pending">Pending Approval ({pendingReservations.length})</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#171918]">
                  <thead className="bg-[#F7F5F0] text-[10px] uppercase tracking-wider text-[#171918]/60 font-semibold border-b border-[#171918]/10">
                    <tr>
                      <th className="py-3 px-4">Ref</th>
                      <th className="py-3 px-4">Guest Name</th>
                      <th className="py-3 px-4">12-Digit FIN</th>
                      <th className="py-3 px-4">Room &amp; Category</th>
                      <th className="py-3 px-4">Dates &amp; Nights</th>
                      <th className="py-3 px-4">Total (ETB)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#171918]/6">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-xs text-[#171918]/50 italic">
                          No reservations matching search and filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map(res => (
                        <tr key={res.id} className="hover:bg-[#F7F5F0] transition-colors">
                          <td className="py-3 px-4 font-mono font-semibold text-[#1B362B]">
                            {res.reference}
                          </td>
                          <td className="py-3 px-4">
                            <strong className="text-[#171918] block">{res.guestName}</strong>
                            <span className="text-[#171918]/50 text-[11px]">{res.email}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-[#171918]/80 font-medium">
                            {res.fanFinId}
                          </td>
                          <td className="py-3 px-4">
                            <strong className="text-[#1B362B] block">
                              {res.roomNumber ? `Room ${res.roomNumber}` : 'Unassigned'}
                            </strong>
                            <span className="text-[#171918]/60 text-[11px]">{res.roomType}</span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span>{res.checkIn} → {res.checkOut}</span>
                            <span className="block text-[#171918]/50 text-[10px]">
                              {res.nights} {res.nights === 1 ? 'Night' : 'Nights'} · {res.guests} Guests
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <strong className="block text-[#171918]">
                              {res.totalAmount.toLocaleString()} ETB
                            </strong>
                            <span className="text-[10px] text-[#171918]/50">
                              {res.paymentMethod} ({res.paymentStatus})
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                              res.reservationStatus === 'Checked In' 
                                ? 'bg-amber-100 text-amber-900'
                                : res.reservationStatus === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-900'
                                : res.reservationStatus === 'Checked Out'
                                ? 'bg-neutral-200 text-neutral-700'
                                : res.reservationStatus === 'Cancelled'
                                ? 'bg-red-100 text-red-800 line-through'
                                : 'bg-amber-200 text-amber-950 font-bold ring-1 ring-amber-400'
                            }`}>
                              {res.reservationStatus === 'Pending' ? '⏳ Pending Approval' : res.reservationStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {res.reservationStatus === 'Pending' && (
                                <button
                                  onClick={() => {
                                    storageService.updateReservationStatus(res.id, 'Confirmed');
                                    if (res.paymentMethod === 'online') {
                                      storageService.updatePaymentStatus(res.id, 'Paid');
                                    }
                                  }}
                                  className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full cursor-pointer shadow-2xs transition-all flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Approve</span>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  setSelectedReservation(res);
                                  setNoteEdit(res.internalNotes || '');
                                }}
                                className="px-3 py-1 text-xs bg-[#1B362B] text-white hover:bg-[#12241D] cursor-pointer rounded-full transition-all"
                              >
                                Details
                              </button>

                              {/* Requirement 1: Allow reservation cancellation from admin mode */}
                              {res.reservationStatus !== 'Cancelled' ? (
                                <button
                                  onClick={() => {
                                    setCancellingReservation(res);
                                    setCancellationReasonInput('');
                                  }}
                                  className="px-2.5 py-1 text-xs bg-red-100 text-red-800 hover:bg-red-200 font-medium cursor-pointer rounded-full transition-all flex items-center gap-1"
                                  title="Cancel Reservation & Free Room"
                                >
                                  <XCircle className="w-3.5 h-3.5 text-red-700" />
                                  <span>Cancel</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    storageService.updateReservationStatus(res.id, 'Confirmed');
                                  }}
                                  className="px-2.5 py-1 text-[11px] bg-neutral-200 text-neutral-800 hover:bg-neutral-300 font-medium cursor-pointer rounded-full transition-all flex items-center gap-1"
                                  title="Restore to Confirmed status"
                                >
                                  <Undo2 className="w-3 h-3" />
                                  <span>Restore</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Drawer: Reservation Details & Quick Operations */}
            {selectedReservation && (
              <div 
                className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
                role="dialog"
                aria-modal="true"
              >
                <div className="bg-[#FCFBF8] border border-[#171918]/20 max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto rounded-3xl">
                  <div className="flex items-center justify-between border-b border-[#171918]/10 pb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#171918]/50 block">Reservation Record</span>
                      <h3 className="font-serif text-2xl text-[#171918]">{selectedReservation.guestName}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedReservation(null)}
                      className="p-1.5 text-[#171918]/60 hover:text-[#171918] cursor-pointer rounded-full hover:bg-[#171918]/5"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-[#F7F5F0] p-4.5 rounded-2xl border border-[#171918]/6">
                    <div>
                      <span className="text-[#171918]/50 block">Booking Reference:</span>
                      <strong className="font-mono text-[#1B362B] text-sm">{selectedReservation.reference}</strong>
                    </div>
                    <div>
                      <span className="text-[#171918]/50 block">12-Digit FIN:</span>
                      <strong className="font-mono text-[#171918] text-sm">{selectedReservation.fanFinId}</strong>
                    </div>
                    <div>
                      <span className="text-[#171918]/50 block">Email:</span>
                      <span>{selectedReservation.email}</span>
                    </div>
                    <div>
                      <span className="text-[#171918]/50 block">Phone:</span>
                      <span>{selectedReservation.phone}</span>
                    </div>
                    <div>
                      <span className="text-[#171918]/50 block">Assigned Room:</span>
                      <strong className="text-[#1B362B] font-serif text-base">
                        {selectedReservation.roomNumber ? `Room ${selectedReservation.roomNumber}` : 'Unassigned'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#171918]/50 block">Room Category:</span>
                      <span>{selectedReservation.roomType}</span>
                    </div>
                    <div>
                      <span className="text-[#171918]/50 block">Check-In / Out:</span>
                      <span>{selectedReservation.checkIn} to {selectedReservation.checkOut} ({selectedReservation.nights} nights)</span>
                    </div>
                    <div>
                      <span className="text-[#171918]/50 block">Total Rate:</span>
                      <strong className="font-mono text-sm text-[#1B362B]">{selectedReservation.totalAmount.toLocaleString()} ETB</strong>
                    </div>
                  </div>

                  {selectedReservation.specialRequests && (
                    <div className="text-xs bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900">
                      <strong>Guest Special Requests:</strong>
                      <p className="mt-0.5">{selectedReservation.specialRequests}</p>
                    </div>
                  )}

                  {selectedReservation.airportTransfer !== 'none' && (
                    <div className="text-xs bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-blue-900">
                      <strong>Airport Transfer Option ({selectedReservation.airportTransfer}):</strong>
                      <p className="mt-0.5">{selectedReservation.flightPickupDetails || 'No flight info provided'}</p>
                    </div>
                  )}

                  {/* Operational Notes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                      Internal Staff Notes
                    </label>
                    <textarea
                      rows={2}
                      value={noteEdit}
                      onChange={(e) => setNoteEdit(e.target.value)}
                      placeholder="Add front desk notes..."
                      className="w-full bg-[#F7F5F0] border border-[#171918]/15 p-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none resize-none"
                    />
                    <button
                      onClick={() => storageService.updateReservationNotes(selectedReservation.id, noteEdit)}
                      className="mt-1 px-4 py-1.5 bg-[#171918] text-white text-[11px] uppercase tracking-wider cursor-pointer rounded-full transition-all"
                    >
                      Save Internal Note
                    </button>
                  </div>

                  {/* Status Change Buttons & Cancellation */}
                  <div className="pt-3 border-t border-[#171918]/10 flex flex-wrap items-center gap-2">
                    {selectedReservation.reservationStatus === 'Pending' && (
                      <button
                        onClick={() => {
                          storageService.updateReservationStatus(selectedReservation.id, 'Confirmed');
                          if (selectedReservation.paymentMethod === 'online') {
                            storageService.updatePaymentStatus(selectedReservation.id, 'Paid');
                          }
                          setSelectedReservation({ 
                            ...selectedReservation, 
                            reservationStatus: 'Confirmed',
                            paymentStatus: selectedReservation.paymentMethod === 'online' ? 'Paid' : selectedReservation.paymentStatus 
                          });
                        }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer rounded-full transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Booking</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        storageService.updateReservationStatus(selectedReservation.id, 'Checked In');
                        setSelectedReservation({ ...selectedReservation, reservationStatus: 'Checked In' });
                      }}
                      className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium cursor-pointer rounded-full transition-all"
                    >
                      Mark Checked In
                    </button>

                    <button
                      onClick={() => {
                        storageService.updateReservationStatus(selectedReservation.id, 'Checked Out');
                        setSelectedReservation({ ...selectedReservation, reservationStatus: 'Checked Out' });
                      }}
                      className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-medium cursor-pointer rounded-full transition-all"
                    >
                      Mark Checked Out
                    </button>

                    <button
                      onClick={() => {
                        storageService.updatePaymentStatus(selectedReservation.id, 'Paid');
                        setSelectedReservation({ ...selectedReservation, paymentStatus: 'Paid' });
                      }}
                      className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium cursor-pointer rounded-full transition-all"
                    >
                      Mark Paid
                    </button>

                    {/* Dedicated Non-blocking Cancellation button */}
                    {selectedReservation.reservationStatus !== 'Cancelled' ? (
                      <button
                        onClick={() => {
                          setCancellingReservation(selectedReservation);
                          setCancellationReasonInput('');
                        }}
                        className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer rounded-full transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancel Reservation</span>
                      </button>
                    ) : (
                      <div className="ml-auto text-xs font-semibold text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>Reservation is Cancelled (Room is Available)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= NON-BLOCKING RESERVATION CANCELLATION DIALOG ================= */}
        {cancellingReservation && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="cancel-dialog-title"
          >
            <div className="bg-[#FCFBF8] border border-red-300 max-w-md w-full p-6 sm:p-7 rounded-3xl shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-red-700">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 id="cancel-dialog-title" className="font-serif text-xl text-[#171918] font-bold">
                    Cancel Reservation?
                  </h3>
                  <span className="text-xs text-[#171918]/60">
                    Ref: <strong className="font-mono">{cancellingReservation.reference}</strong>
                  </span>
                </div>
              </div>

              <div className="p-4 bg-red-50/60 border border-red-200 rounded-2xl text-xs space-y-2 text-[#171918]">
                <p>
                  You are about to cancel the reservation for <strong>{cancellingReservation.guestName}</strong>.
                </p>
                <div className="text-[11px] text-[#171918]/70">
                  <p>• Room: <strong>Room {cancellingReservation.roomNumber}</strong> ({cancellingReservation.roomType})</p>
                  <p>• Dates: {cancellingReservation.checkIn} to {cancellingReservation.checkOut}</p>
                  <p>• Total: {cancellingReservation.totalAmount.toLocaleString()} ETB</p>
                </div>
                <p className="text-red-700 font-medium pt-1">
                  This action will immediately release Room {cancellingReservation.roomNumber} back to available inventory.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                  Reason for Cancellation <span className="font-normal lowercase text-[#171918]/50">(optional)</span>
                </label>
                <input
                  type="text"
                  value={cancellationReasonInput}
                  onChange={(e) => setCancellationReasonInput(e.target.value)}
                  placeholder="e.g. Guest requested via phone, unconfirmed transfer receipt..."
                  className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-red-600 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setCancellingReservation(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#171918]/70 hover:text-[#171918] rounded-full transition-colors cursor-pointer"
                >
                  Keep Reservation
                </button>
                <button
                  onClick={handleConfirmCancelReservation}
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Confirm Cancellation &amp; Free Room</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ROOM MANAGEMENT (ALL 25 ROOMS) ================= */}
        {activeTab === 'rooms' && (
          <div className="space-y-8">
            
            {/* Category Pricing and Amenities Controls */}
            <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between border-b border-[#171918]/10 pb-3 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171918]">Category Base Rates</h3>
                  <p className="text-xs text-[#171918]/60 font-light">
                    Adjust nightly base rates in Ethiopian Birr (ETB). Changes take effect immediately across public booking engine.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="p-5 bg-[#F7F5F0] border border-[#171918]/8 rounded-2xl flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-semibold block">
                        {cat.inventoryCount} Total Rooms
                      </span>
                      <h4 className="font-serif text-lg text-[#171918] mb-1">{cat.name}</h4>
                      <span className="font-serif text-2xl text-[#1B362B] font-medium block">
                        {cat.basePrice.toLocaleString()} ETB
                      </span>
                      <span className="text-[10px] text-[#171918]/50 block">per night</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#171918]/8">
                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setCategoryPriceInput(cat.basePrice);
                        }}
                        className="w-full py-2 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-medium cursor-pointer flex items-center justify-center gap-1.5 rounded-full transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Rate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Physical Rooms Grid (All 25 Rooms) */}
            <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between border-b border-[#171918]/10 pb-3 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171918]">
                    Physical Rooms Inventory (All 25 Rooms)
                  </h3>
                  <p className="text-xs text-[#171918]/60 font-light">
                    Directly toggle physical room operational status. Putting a room into Maintenance or Unavailable automatically prevents it from being booked.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {allRooms.map(room => (
                  <div 
                    key={room.roomNumber}
                    className="p-4 border border-[#171918]/10 bg-[#F7F5F0] rounded-2xl flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-base text-[#1B362B]">
                          Room {room.roomNumber}
                        </span>
                        <span className="text-[10px] text-[#171918]/50">Floor {room.floor}</span>
                      </div>
                      <span className="text-xs text-[#171918] block font-medium">
                        {room.category}
                      </span>
                      {room.notes && (
                        <p className="text-[10px] text-amber-900 bg-amber-50 p-1.5 mt-1 rounded-lg">
                          {room.notes}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#171918]/8">
                      <label className="block text-[10px] uppercase tracking-wider text-[#171918]/50 mb-1">
                        Room Status
                      </label>
                      <select
                        value={room.status}
                        onChange={(e) => storageService.updateRoomStatus(room.roomNumber, e.target.value as RoomStatus)}
                        className={`w-full text-xs font-semibold py-2 px-2.5 border rounded-xl focus:outline-none cursor-pointer ${
                          room.status === 'Available' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                          room.status === 'Occupied' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                          room.status === 'Reserved' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                          'bg-red-50 text-red-900 border-red-300'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Editor Modal */}
            {editingCategory && (
              <div 
                className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
                role="dialog"
                aria-modal="true"
              >
                <div className="bg-[#FCFBF8] border border-[#171918]/20 max-w-sm w-full p-6 space-y-4 shadow-2xl rounded-3xl">
                  <h3 className="font-serif text-xl text-[#171918]">
                    Edit Base Rate: {editingCategory.name}
                  </h3>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                      Nightly Rate (ETB)
                    </label>
                    <input
                      type="number"
                      value={categoryPriceInput}
                      onChange={(e) => setCategoryPriceInput(Number(e.target.value))}
                      className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-sm font-mono text-[#171918] focus:border-[#1B362B] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="px-4 py-2 text-xs text-[#171918]/70 hover:text-[#171918] cursor-pointer rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        storageService.updateCategoryPrice(editingCategory.id, categoryPriceInput);
                        setEditingCategory(null);
                      }}
                      className="px-5 py-2 bg-[#1B362B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer rounded-full transition-all"
                    >
                      Save Rate
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 4: RESTAURANT DIGITAL MENU MANAGEMENT ================= */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171918]/10 pb-5 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171918]">Restaurant Digital Menu Management</h3>
                  <p className="text-xs text-[#171918]/60 font-light mt-0.5">
                    Manage all dishes, modify photo imagery via URL or Gallery selection, update official prices, and add seasonal recipes.
                  </p>
                </div>

                {/* Requirement 2: Add Menu Item Button that opens interactive creation form */}
                <button
                  onClick={handleOpenAddMenuModal}
                  className="px-5 py-2.5 bg-[#1B362B] text-white hover:bg-[#12241D] text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer rounded-full transition-all shadow-sm shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Menu Item</span>
                </button>
              </div>

              {/* Menu Items Grid with Photo and Image Editor Button */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {menuItems.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-[#F7F5F0] border border-[#171918]/10 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#1B362B]/30 transition-all"
                  >
                    <div>
                      {/* Dish Thumbnail */}
                      <div className="relative aspect-[16/10] bg-[#EBE7DF] overflow-hidden">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).setAttribute('src', presetFoodImages[0].url);
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#171918]/30">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}

                        <div className="absolute top-2.5 left-2.5">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#12241D]/80 backdrop-blur-md text-[#B8860B] rounded-full">
                            {item.category}
                          </span>
                        </div>

                        {item.isChefSpecial && (
                          <div className="absolute top-2.5 right-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#B8860B] text-white rounded-full flex items-center gap-1 shadow-xs">
                              <Sparkles className="w-3 h-3" />
                              <span>Special</span>
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="font-shoore font-semibold text-base text-[#171918] leading-snug">
                            {item.name}
                          </h4>
                          <span className="font-mono text-sm text-[#1B362B] font-bold shrink-0">
                            {item.priceETB ? `${item.priceETB.toLocaleString()} ETB` : item.priceNote}
                          </span>
                        </div>

                        <p className="text-xs text-[#171918]/70 leading-relaxed font-light mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#171918]/60 font-light">
                          {item.prepTime && <span>⏱️ {item.prepTime}</span>}
                          {item.calories && <span>🔥 {item.calories}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions: Change Image / Edit / Availability / Delete */}
                    <div className="px-4 py-3 bg-[#FCFBF8] border-t border-[#171918]/8 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditMenuModal(item)}
                          className="px-3 py-1 bg-[#1B362B] hover:bg-[#12241D] text-white text-[11px] font-semibold uppercase tracking-wider rounded-full cursor-pointer transition-all flex items-center gap-1"
                          title="Edit details and change image"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit / Photo</span>
                        </button>

                        <button
                          onClick={() => storageService.updateMenuItem({ ...item, isAvailable: !item.isAvailable })}
                          className={`text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                            item.isAvailable ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                          }`}
                        >
                          {item.isAvailable ? 'In Stock' : 'Sold Out'}
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Remove "${item.name}" from the menu?`)) {
                            storageService.deleteMenuItem(item.id);
                          }
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        title="Delete Menu Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= REQUIREMENT 2: MENU ITEM FORM MODAL (IMAGE VIA URL OR GALLERY) ================= */}
            {menuModalOpen && (
              <div 
                className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="menu-modal-title"
              >
                <div className="bg-[#FCFBF8] border border-[#171918]/20 max-w-2xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto font-shoore">
                  
                  <div className="flex items-center justify-between border-b border-[#171918]/10 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-semibold block">
                        Menu Culinary Studio
                      </span>
                      <h3 id="menu-modal-title" className="font-editorial font-serif text-2xl text-[#171918]">
                        {menuModalMode === 'edit' ? `Edit Recipe & Image: ${menuName || 'Item'}` : 'Add New Culinary Creation'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setMenuModalOpen(false)}
                      className="p-1.5 text-[#171918]/60 hover:text-[#171918] cursor-pointer rounded-full hover:bg-[#171918]/5"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveMenuItem} className="space-y-6">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Dish Name *
                        </label>
                        <input
                          type="text"
                          value={menuName}
                          onChange={(e) => setMenuName(e.target.value)}
                          placeholder="e.g. Special Doro Wat with Ayib"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Menu Category *
                        </label>
                        <select
                          value={menuCategory}
                          onChange={(e) => setMenuCategory(e.target.value)}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none cursor-pointer"
                        >
                          <option value="Breakfast">Breakfast &amp; Morning Spread</option>
                          <option value="Snacks">Snacks &amp; Sandwiches</option>
                          <option value="Salads">Salads &amp; Starters</option>
                          <option value="Pastries">Artisanal Pastries &amp; Bakery</option>
                          <option value="Ethiopian Selection">Ethiopian Heritage Selection</option>
                          <option value="Main Courses">Main Courses &amp; Grills</option>
                          <option value="Desserts">Artisanal Desserts &amp; Sweets</option>
                          <option value="Beverages">Beverages &amp; Specialty Coffee</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Price in ETB *
                        </label>
                        <input
                          type="number"
                          value={menuPriceETB}
                          onChange={(e) => setMenuPriceETB(Number(e.target.value))}
                          placeholder="750"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Price Note <span className="font-normal text-[#171918]/40 lowercase">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={menuPriceNote}
                          onChange={(e) => setMenuPriceNote(e.target.value)}
                          placeholder="e.g. Complimentary with Room"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                        Culinary Description *
                      </label>
                      <textarea
                        rows={2}
                        value={menuDescription}
                        onChange={(e) => setMenuDescription(e.target.value)}
                        placeholder="Slow-simmered tender chicken drumstick in authentic berbere and niter kibbeh spiced butter..."
                        className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none resize-none"
                        required
                      />
                    </div>

                    {/* ================= IMAGE SELECTION FORM (URL OR GALLERY) ================= */}
                    <div className="bg-[#F7F5F0] border border-[#171918]/15 p-5 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#171918]/10 pb-3">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-[#B8860B]" />
                          <label className="text-xs uppercase tracking-wider text-[#171918] font-bold">
                            Dish Image Source
                          </label>
                        </div>

                        {/* Image Source Toggle Buttons */}
                        <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#171918]/10 text-xs">
                          <button
                            type="button"
                            onClick={() => setMenuImageSourceTab('gallery')}
                            className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                              menuImageSourceTab === 'gallery'
                                ? 'bg-[#1B362B] text-white'
                                : 'text-[#171918]/60 hover:text-[#171918]'
                            }`}
                          >
                            <ImageIcon className="w-3 h-3" />
                            <span>Pick from Gallery / Presets</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setMenuImageSourceTab('url')}
                            className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                              menuImageSourceTab === 'url'
                                ? 'bg-[#1B362B] text-white'
                                : 'text-[#171918]/60 hover:text-[#171918]'
                            }`}
                          >
                            <LinkIcon className="w-3 h-3" />
                            <span>Image URL</span>
                          </button>
                        </div>
                      </div>

                      {/* Image Option 1: URL Form */}
                      {menuImageSourceTab === 'url' && (
                        <div className="space-y-2">
                          <label className="block text-[11px] text-[#171918]/70 font-medium">
                            Paste Direct Image URL:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={menuImageUrl}
                              onChange={(e) => setMenuImageUrl(e.target.value)}
                              placeholder="https://images.unsplash.com/... or /src/assets/images/..."
                              className="flex-1 bg-white border border-[#171918]/15 px-3.5 py-2 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none"
                            />
                            {menuImageUrl && (
                              <button
                                type="button"
                                onClick={() => setMenuImageUrl('')}
                                className="px-3 py-1 bg-neutral-200 hover:bg-neutral-300 text-xs text-[#171918] rounded-xl cursor-pointer"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Image Option 2: Choose from Hotel Gallery & Preset Assets */}
                      {menuImageSourceTab === 'gallery' && (
                        <div className="space-y-2">
                          <span className="block text-[11px] text-[#171918]/70 font-medium">
                            Click any hotel culinary photograph to assign:
                          </span>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 max-h-48 overflow-y-auto p-1">
                            {presetFoodImages.map((img, idx) => {
                              const isSelected = menuImageUrl === img.url;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setMenuImageUrl(img.url)}
                                  className={`aspect-[4/3] rounded-xl overflow-hidden relative border-2 transition-all cursor-pointer group ${
                                    isSelected 
                                      ? 'border-[#B8860B] ring-2 ring-[#B8860B]/40 scale-95 shadow-md' 
                                      : 'border-transparent hover:border-[#1B362B]/50'
                                  }`}
                                  title={img.title}
                                >
                                  <img 
                                    src={img.url} 
                                    alt={img.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                  {isSelected && (
                                    <div className="absolute inset-0 bg-[#1B362B]/40 flex items-center justify-center">
                                      <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                  )}
                                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] truncate px-1 py-0.5">
                                    {img.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Real-time Image Preview */}
                      {menuImageUrl && (
                        <div className="pt-2 border-t border-[#171918]/10 flex items-center gap-4">
                          <div className="w-20 h-14 rounded-xl overflow-hidden bg-neutral-200 border border-[#171918]/15 shrink-0">
                            <img 
                              src={menuImageUrl} 
                              alt="Dish preview" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                (e.target as HTMLElement).setAttribute('src', presetFoodImages[0].url);
                              }}
                            />
                          </div>
                          <div className="text-xs text-[#171918]/70">
                            <span className="font-semibold text-emerald-800 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              <span>Image Active &amp; Validated</span>
                            </span>
                            <span className="text-[11px] text-[#171918]/50 truncate block max-w-md">
                              {menuImageUrl}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Metadata: Prep time, Calories, Dietary tags, Ingredients */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Prep Time
                        </label>
                        <input
                          type="text"
                          value={menuPrepTime}
                          onChange={(e) => setMenuPrepTime(e.target.value)}
                          placeholder="e.g. 15 min"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3 py-2 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Calories
                        </label>
                        <input
                          type="text"
                          value={menuCalories}
                          onChange={(e) => setMenuCalories(e.target.value)}
                          placeholder="e.g. 620 kcal"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3 py-2 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Dietary Tags <span className="font-normal lowercase text-[#171918]/40">(comma-separated)</span>
                        </label>
                        <input
                          type="text"
                          value={menuDietaryInput}
                          onChange={(e) => setMenuDietaryInput(e.target.value)}
                          placeholder="Chef Special, Vegetarian, Gluten-Free"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3 py-2 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Ingredients <span className="font-normal lowercase text-[#171918]/40">(comma-separated)</span>
                        </label>
                        <input
                          type="text"
                          value={menuIngredientsInput}
                          onChange={(e) => setMenuIngredientsInput(e.target.value)}
                          placeholder="Chicken, Berbere, Niter Kibbeh, Injera"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/15 px-3 py-2 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Flags: Chef's Special & Availability */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#171918]">
                        <input
                          type="checkbox"
                          checked={menuIsChefSpecial}
                          onChange={(e) => setMenuIsChefSpecial(e.target.checked)}
                          className="rounded border-[#171918]/20 text-[#B8860B] focus:ring-[#B8860B] w-4 h-4"
                        />
                        <span>Feature as Chef's Special Badge</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#171918]">
                        <input
                          type="checkbox"
                          checked={menuIsAvailable}
                          onChange={(e) => setMenuIsAvailable(e.target.checked)}
                          className="rounded border-[#171918]/20 text-[#1B362B] focus:ring-[#1B362B] w-4 h-4"
                        />
                        <span>Dish is In Stock &amp; Available for Order</span>
                      </label>
                    </div>

                    {/* Form Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#171918]/10">
                      <button
                        type="button"
                        onClick={() => setMenuModalOpen(false)}
                        className="px-5 py-2.5 text-xs font-semibold text-[#171918]/70 hover:text-[#171918] rounded-full transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-7 py-2.5 bg-[#1B362B] hover:bg-[#12241D] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{menuModalMode === 'edit' ? 'Save Changes & Image' : 'Add Dish to Menu'}</span>
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= AMENITY BOOKINGS STAFF TAB ================= */}
        {activeTab === 'amenityBookings' && (
          <div className="space-y-6 font-shoore">
            <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171918]/10 pb-5 mb-6">
                <div>
                  <h3 className="font-editorial font-serif text-2xl text-[#171918]">
                    Amenities &amp; Services Bookings Management
                  </h3>
                  <p className="text-xs text-[#171918]/60 font-light mt-0.5">
                    Real-time control for Cedar Sauna, Abyssinia Fitness Centre, Executive Boardroom, and Airport Transfers with time slot blocking.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={amenityStatusFilter}
                    onChange={(e) => setAmenityStatusFilter(e.target.value)}
                    className="bg-[#F7F5F0] border border-[#171918]/15 px-3.5 py-2 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:outline-none"
                  >
                    <option value="all">All Statuses ({storageService.getAmenityBookings().length})</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {storageService.getAmenityBookings().filter(b => amenityStatusFilter === 'all' || b.status === amenityStatusFilter).length === 0 ? (
                <div className="text-center py-16 text-[#171918]/60">
                  <Sparkles className="w-12 h-12 text-[#B8860B] mx-auto mb-3 opacity-60" />
                  <p className="text-sm font-semibold text-[#171918]">No amenity bookings found matching the selected filter.</p>
                  <p className="text-xs text-[#171918]/50 mt-1">Guests can book amenities and services from the public website or front desk.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {storageService.getAmenityBookings()
                    .filter(b => amenityStatusFilter === 'all' || b.status === amenityStatusFilter)
                    .map(booking => (
                      <div 
                        key={booking.id}
                        className="bg-[#F7F5F0] border border-[#171918]/10 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-[#1B362B]/30 transition-all"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#1B362B]/10 text-[#1B362B] rounded-full">
                                {booking.serviceName}
                              </span>
                              <h4 className="font-shoore font-bold text-base text-[#171918] mt-1.5">
                                {booking.guestName}
                              </h4>
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                              booking.status === 'Confirmed' ? 'bg-amber-100 text-amber-900' :
                              booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-900' :
                              'bg-red-100 text-red-900'
                            }`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-[#171918]/80 font-light pt-2 border-t border-[#171918]/8">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                              <span>{booking.timeSlot}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-[#1B362B]" />
                              <span className="font-mono">{booking.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-[#1B362B]" />
                              <span className="font-mono truncate">{booking.email}</span>
                            </div>
                          </div>

                          <div className="text-xs text-[#171918]/70 font-light bg-white/60 p-2.5 rounded-xl border border-[#171918]/5 flex items-center justify-between">
                            <span>Reference Code: <strong className="font-mono text-[#171918]">{booking.id}</strong></span>
                            <span className="font-bold text-[#1B362B]">{booking.priceETB ? `${booking.priceETB.toLocaleString()} ETB` : 'Complimentary'}</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-4 mt-4 border-t border-[#171918]/8 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {booking.status !== 'Confirmed' && (
                              <button
                                onClick={() => {
                                  storageService.updateAmenityBookingStatus(booking.id, 'Confirmed');
                                }}
                                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                              >
                                Confirm
                              </button>
                            )}

                            {booking.status !== 'Completed' && (
                              <button
                                onClick={() => {
                                  storageService.updateAmenityBookingStatus(booking.id, 'Completed');
                                }}
                                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                              >
                                Complete
                              </button>
                            )}
                          </div>

                          {booking.status !== 'Cancelled' && (
                            <button
                              onClick={() => {
                                if (confirm(`Cancel booking for ${booking.guestName} (${booking.serviceName})?`)) {
                                  storageService.cancelAmenityBooking(booking.id, 'Staff cancelled');
                                }
                              }}
                              className="px-3 py-1.5 bg-red-100 text-red-800 hover:bg-red-200 text-[10px] font-semibold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: COMPREHENSIVE & FULLY ACCESSIBLE HOTEL SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            {/* Settings Overview Card */}
            <div className="bg-[#FCFBF8] border border-[#171918]/10 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171918]/10 pb-5 mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#171918]">
                    Property Operations &amp; Administrative Configuration
                  </h3>
                  <p className="text-xs text-[#171918]/60 font-light mt-0.5">
                    Centralized management for contact lines, GPS location, operating schedules, official banking accounts, and regulatory tariffs.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetSettingsDefaults}
                    className="px-4 py-2 border border-[#171918]/20 hover:bg-[#171918]/5 text-xs text-[#171918] rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Defaults</span>
                  </button>
                </div>
              </div>

              {/* Feedback Alert Toast */}
              {settingsFeedback && (
                <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 mb-6 animate-in fade-in ${
                  settingsFeedback.type === 'success' 
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium' 
                    : 'bg-blue-50 border border-blue-200 text-blue-900'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{settingsFeedback.message}</span>
                </div>
              )}

              {/* Accessible Sub-Navigation Tabs */}
              <div 
                className="flex flex-wrap gap-2 pb-6 border-b border-[#171918]/8 mb-6"
                role="tablist"
                aria-label="Hotel Settings Categories"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={settingsActiveSubTab === 'brand'}
                  onClick={() => setSettingsActiveSubTab('brand')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    settingsActiveSubTab === 'brand'
                      ? 'bg-[#1B362B] text-white shadow-xs'
                      : 'bg-[#F7F5F0] text-[#171918]/70 hover:bg-[#EBE7DF]'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>1. Property &amp; Brand</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={settingsActiveSubTab === 'contact'}
                  onClick={() => setSettingsActiveSubTab('contact')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    settingsActiveSubTab === 'contact'
                      ? 'bg-[#1B362B] text-white shadow-xs'
                      : 'bg-[#F7F5F0] text-[#171918]/70 hover:bg-[#EBE7DF]'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>2. Contacts &amp; Front Desk</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={settingsActiveSubTab === 'schedule'}
                  onClick={() => setSettingsActiveSubTab('schedule')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    settingsActiveSubTab === 'schedule'
                      ? 'bg-[#1B362B] text-white shadow-xs'
                      : 'bg-[#F7F5F0] text-[#171918]/70 hover:bg-[#EBE7DF]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>3. Operating Hours</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={settingsActiveSubTab === 'rates'}
                  onClick={() => setSettingsActiveSubTab('rates')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    settingsActiveSubTab === 'rates'
                      ? 'bg-[#1B362B] text-white shadow-xs'
                      : 'bg-[#F7F5F0] text-[#171918]/70 hover:bg-[#EBE7DF]'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>4. Tariffs &amp; Regulations</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={settingsActiveSubTab === 'banking'}
                  onClick={() => setSettingsActiveSubTab('banking')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    settingsActiveSubTab === 'banking'
                      ? 'bg-[#1B362B] text-white shadow-xs'
                      : 'bg-[#F7F5F0] text-[#171918]/70 hover:bg-[#EBE7DF]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>5. Bank &amp; Telebirr Accounts</span>
                </button>
              </div>

              {/* Master Settings Form */}
              <form onSubmit={handleSaveHotelSettings} className="space-y-6">
                
                {/* --- SUB-TAB 1: PROPERTY & BRAND --- */}
                {settingsActiveSubTab === 'brand' && (
                  <div className="space-y-4">
                    <h4 className="font-editorial font-serif text-lg text-[#171918] border-b border-[#171918]/6 pb-2">
                      Property Identity &amp; Location
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Hotel Legal &amp; Display Name
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.hotelName}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, hotelName: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] font-medium focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          City &amp; Country
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.location}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, location: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Total Suites &amp; Rooms Capacity
                        </label>
                        <input
                          type="number"
                          value={hotelSettingsForm.totalRooms || 25}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, totalRooms: Number(e.target.value) })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Base Currency
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.currency || 'ETB'}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, currency: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                        Physical Street Address Line
                      </label>
                      <input
                        type="text"
                        value={hotelSettingsForm.addressLine}
                        onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, addressLine: e.target.value })}
                        className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                        GPS Coordinates
                      </label>
                      <input
                        type="text"
                        value={hotelSettingsForm.coordinates || ''}
                        onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, coordinates: e.target.value })}
                        placeholder="9°01'15.4&quot;N 38°45'22.1&quot;E"
                        className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* --- SUB-TAB 2: CONTACTS & FRONT DESK --- */}
                {settingsActiveSubTab === 'contact' && (
                  <div className="space-y-4">
                    <h4 className="font-editorial font-serif text-lg text-[#171918] border-b border-[#171918]/6 pb-2">
                      Front Desk Communications &amp; Hotlines
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          General Inquiries Email *
                        </label>
                        <input
                          type="email"
                          value={hotelSettingsForm.contactEmail}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, contactEmail: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Reservations Direct Email *
                        </label>
                        <input
                          type="email"
                          value={hotelSettingsForm.reservationsEmail || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, reservationsEmail: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Front Desk Landline / Phone *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.contactPhone}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, contactPhone: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          WhatsApp Concierge Direct Number (with Country Code) *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.whatsAppNumber || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, whatsAppNumber: e.target.value })}
                          placeholder="+251911002233"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          WhatsApp Display Label
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.whatsAppDisplay || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, whatsAppDisplay: e.target.value })}
                          placeholder="+251 91 100 2233"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* --- SUB-TAB 3: OPERATING SCHEDULE --- */}
                {settingsActiveSubTab === 'schedule' && (
                  <div className="space-y-4">
                    <h4 className="font-editorial font-serif text-lg text-[#171918] border-b border-[#171918]/6 pb-2">
                      Arrivals, Departures &amp; Service Hours
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Standard Check-In Time *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.checkInTime}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, checkInTime: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Standard Check-Out Time *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.checkOutTime}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, checkOutTime: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Dining Room Hours
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.diningHours || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, diningHours: e.target.value })}
                          placeholder="8:00 AM – 10:00 PM Daily"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Thermal Sauna &amp; Spa Hours
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.spaHours || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, spaHours: e.target.value })}
                          placeholder="6:00 AM – 10:00 PM Daily"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Fitness Studio Hours
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.gymHours || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, gymHours: e.target.value })}
                          placeholder="24/7 Keycard Access"
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* --- SUB-TAB 4: TARIFFS & REGULATIONS --- */}
                {settingsActiveSubTab === 'rates' && (
                  <div className="space-y-4">
                    <h4 className="font-editorial font-serif text-lg text-[#171918] border-b border-[#171918]/6 pb-2">
                      Official Service Rates &amp; Tariffs
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Bole Airport Transfer Price (ETB per trip) *
                        </label>
                        <input
                          type="number"
                          value={hotelSettingsForm.airportTransferPrice}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, airportTransferPrice: Number(e.target.value) })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                        <span className="text-[10px] text-[#171918]/50 block mt-0.5">
                          Automatically computed in direct reservation engine.
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#171918]/70 font-semibold mb-1">
                          Walk-In Spa Day Pass Price (ETB) *
                        </label>
                        <input
                          type="number"
                          value={hotelSettingsForm.walkInSpaPrice}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, walkInSpaPrice: Number(e.target.value) })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                        <span className="text-[10px] text-[#171918]/50 block mt-0.5">
                          Public walk-in rate. Resident hotel guests receive complimentary entry.
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#171918]">
                        <input
                          type="checkbox"
                          checked={hotelSettingsForm.transferEnabled}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, transferEnabled: e.target.checked })}
                          className="rounded border-[#171918]/20 text-[#1B362B] focus:ring-[#1B362B] w-4 h-4"
                        />
                        <span>Enable Airport Transfer Option during Guest Online Booking</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* --- SUB-TAB 5: BANKING & TELEBIRR --- */}
                {settingsActiveSubTab === 'banking' && (
                  <div className="space-y-4">
                    <h4 className="font-editorial font-serif text-lg text-[#171918] border-b border-[#171918]/6 pb-2">
                      Authorized Ethiopian Bank &amp; Mobile Money Accounts
                    </h4>
                    <p className="text-xs text-[#171918]/60 font-light">
                      These account numbers are displayed in Step 4 of the direct booking engine with one-click copy functionality.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#0072CE] font-bold mb-1">
                          Telebirr Merchant / Mobile Number *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.telebirrNumber || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, telebirrNumber: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#0072CE] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8E24AA] font-bold mb-1">
                          Commercial Bank of Ethiopia (CBE) Account *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.cbeAccount || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, cbeAccount: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#8E24AA] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#D97706] font-bold mb-1">
                          Bank of Abyssinia (BOA) Account *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.boaAccount || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, boaAccount: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#D97706] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#059669] font-bold mb-1">
                          Awash Bank Corporate Account *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.awashAccount || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, awashAccount: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#059669] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#1B362B] font-bold mb-1">
                          Dashen Bank Account *
                        </label>
                        <input
                          type="text"
                          value={hotelSettingsForm.dashenAccount || ''}
                          onChange={(e) => setHotelSettingsForm({ ...hotelSettingsForm, dashenAccount: e.target.value })}
                          className="w-full bg-[#F7F5F0] border border-[#171918]/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#171918] focus:border-[#1B362B] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Master Button */}
                <div className="pt-6 border-t border-[#171918]/10 flex items-center justify-between">
                  <span className="text-xs text-[#171918]/60 font-light">
                    All updates are instantly saved to persistent local database and synchronized across active client sessions.
                  </span>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#1B362B] hover:bg-[#12241D] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Operational Configuration</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
