import React, { useState, useEffect } from 'react';
import {
  User,
  Sparkles,
  Calendar,
  Clock,
  Copy,
  Check,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Star,
  Database,
  LogOut,
  LogIn,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { BackendService, AppointmentRecord, UserProfile } from '../lib/backendService';

interface ClientPortalPageProps {
  onNavigate: (page: string, params?: any) => void;
  vipCode?: string;
  onOpenSupabaseModal?: () => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({
  onNavigate,
  vipCode = 'JESSA-VIP-15',
  onOpenSupabaseModal,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [bookings, setBookings] = useState<AppointmentRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const isSupabaseLive = BackendService.isSupabaseLive();

  // Load user profile & bookings on mount
  useEffect(() => {
    loadUserAndBookings();
  }, []);

  const loadUserAndBookings = async () => {
    setLoadingBookings(true);
    try {
      const user = await BackendService.getCurrentUser();
      setCurrentUser(user);
      if (user?.email) {
        const appts = await BackendService.getAppointments(user.email);
        setBookings(appts);
      } else {
        const appts = await BackendService.getAppointments();
        setBookings(appts);
      }
    } catch (e) {
      console.warn('Error loading bookings:', e);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      await BackendService.signIn(emailInput, passwordInput);
      await loadUserAndBookings();
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      await BackendService.signUp(emailInput, passwordInput, nameInput, phoneInput);
      await loadUserAndBookings();
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await BackendService.signOut();
    setCurrentUser(null);
  };

  const handleCancelAppointment = async (id: string) => {
    if (confirm(`Are you sure you wish to cancel reservation ${id}? Under the Jessa Guarantee, your deposit is retained or refunded in accordance with policy.`)) {
      await BackendService.updateAppointmentStatus(id, 'cancelled');
      await loadUserAndBookings();
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(vipCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full flex flex-col pb-24">
      {/* 1. Header & User Overview */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-3xl bg-[#28142d] border border-[#f2ca7a]/25 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f2ca7a] to-[#d4af62] p-0.5 shrink-0 shadow-lg">
              <div className="w-full h-full rounded-full bg-[#19061f] flex items-center justify-center text-[#f2ca7a]">
                <User className="w-8 h-8" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#f2ca7a] text-[10px] font-bold uppercase tracking-widest bg-[#37223d] px-2.5 py-0.5 rounded-full border border-[#f2ca7a]/20 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{currentUser ? `${currentUser.vipTier} Tier Patron` : 'Guest VIP Access'}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#f8d8fc] font-bold">
                {currentUser?.fullName || 'Welcome, Distinguished Guest'}
              </h1>
              <p className="text-xs text-[#d1c5b3]">
                {currentUser?.email ? currentUser.email : 'Client Portal & Live Suite Reservations'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenSupabaseModal && (
              <button
                onClick={onOpenSupabaseModal}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#37223d] text-[#f2ca7a] border border-[#f2ca7a]/30 hover:bg-[#432d48] flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Backend Settings</span>
                <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </button>
            )}

            {currentUser ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#37223d] text-[#ffb4ab] border border-[#f2ca7a]/20 hover:bg-[#432d48] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : null}

            <button
              onClick={() => onNavigate('book-appointment')}
              className="px-6 py-2 rounded-full text-xs font-bold bg-[#f2ca7a] text-[#402d00] hover:brightness-105 shadow-md cursor-pointer"
            >
              Book New Ritual
            </button>
          </div>
        </div>
      </section>

      {/* 2. Authentication Panel (If Not Logged In) */}
      {!currentUser && (
        <section className="max-w-xl mx-auto w-full px-4 sm:px-6 mb-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#28142d] border border-[#f2ca7a]/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#f2ca7a]/20 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#f8d8fc]">
                  {authMode === 'signin' ? 'Sign In to Your VIP Atelier' : 'Join VIP Aesthetics Circle'}
                </h3>
                <p className="text-xs text-[#d1c5b3] mt-0.5">
                  Access your upcoming reservations, tier benefits, and formula records.
                </p>
              </div>
              <div className="flex gap-1 bg-[#19061f] p-1 rounded-full border border-[#f2ca7a]/20">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    authMode === 'signin' ? 'bg-[#f2ca7a] text-[#402d00]' : 'text-[#d1c5b3]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    authMode === 'signup' ? 'bg-[#f2ca7a] text-[#402d00]' : 'text-[#d1c5b3]'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4 text-xs">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Lady Victoria Windsor"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                      Mobile / Telephone
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+44 7700 900321"
                      className="w-full px-3.5 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@mayfair.co.uk"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold text-xs shadow-md hover:brightness-105 cursor-pointer disabled:opacity-50"
                >
                  {authLoading ? 'Verifying...' : authMode === 'signin' ? 'Sign In to Portal' : 'Create VIP Account'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* 3. VIP Aesthetics Circle Status Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2c1832] via-[#37223d] to-[#2c1832] border border-[#f2ca7a]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[#19061f] text-[#f2ca7a] border border-[#f2ca7a]/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider block">
                Your Exclusive VIP Privilege
              </span>
              <h3 className="font-serif text-lg font-bold text-[#f8d8fc]">
                15% Inaugural & Seasonal Ritual Voucher
              </h3>
              <p className="text-xs text-[#d1c5b3]">
                Valid on any service over $100 when booking online or presenting at reception.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-xl bg-[#19061f] border border-[#f2ca7a]/40 font-mono font-bold text-sm text-[#f2ca7a]">
              {vipCode}
            </div>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 rounded-xl bg-[#37223d] hover:bg-[#432d48] text-[#f8d8fc] text-xs font-semibold border border-[#f2ca7a]/20 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode ? <Check className="w-4 h-4 text-[#f2ca7a]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Upcoming Bookings & History */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Upcoming Reservations (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#f8d8fc]">
                Atelier Reservations
              </h2>
              <span className="text-xs text-[#d1c5b3]">
                {bookings.length} {bookings.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>

            {loadingBookings ? (
              <div className="p-12 text-center text-xs text-[#d1c5b3]">
                Synchronizing reservations with database...
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#28142d] border border-[#f2ca7a]/20 text-center space-y-3">
                <Calendar className="w-8 h-8 text-[#f2ca7a] mx-auto opacity-75" />
                <h4 className="font-serif text-base font-bold text-[#f8d8fc]">No Current Bookings</h4>
                <p className="text-xs text-[#d1c5b3]">
                  You do not have any pending or confirmed sessions. Explore our curated treatments menu to reserve.
                </p>
                <button
                  onClick={() => onNavigate('book-appointment')}
                  className="px-5 py-2 rounded-full bg-[#f2ca7a] text-[#402d00] font-bold text-xs hover:brightness-105"
                >
                  Reserve an Appointment
                </button>
              </div>
            ) : (
              bookings.map((booking) => {
                const isCancelled = booking.status === 'cancelled';
                return (
                  <div
                    key={booking.id}
                    className={`p-6 rounded-2xl border space-y-4 shadow-xl transition-all ${
                      isCancelled
                        ? 'bg-[#28142d]/50 border-red-500/25 opacity-75'
                        : 'bg-[#28142d] border-[#f2ca7a]/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#f2ca7a]/15">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider">
                          Reference: {booking.id}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#f8d8fc] mt-0.5">
                          {booking.serviceName}
                        </h3>
                        <p className="text-xs text-[#d1c5b3]">Master Stylist: {booking.stylistName}</p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 border ${
                          isCancelled
                            ? 'bg-red-950/60 border-red-500/40 text-red-300'
                            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#d1c5b3]">
                      <div>
                        <span className="text-[#998f7f] block text-[10px] uppercase">Date & Time</span>
                        <strong className="text-[#f8d8fc]">{booking.appointmentDate}</strong> at {booking.appointmentTime}
                      </div>
                      <div>
                        <span className="text-[#998f7f] block text-[10px] uppercase">Guest</span>
                        <strong className="text-[#f8d8fc]">{booking.guestName}</strong>
                      </div>
                      <div>
                        <span className="text-[#998f7f] block text-[10px] uppercase">Deposit Paid</span>
                        <strong className="text-[#f2ca7a]">${booking.depositPaid}</strong>
                      </div>
                    </div>

                    {booking.amenities && (
                      <div className="p-3 rounded-xl bg-[#19061f] border border-[#f2ca7a]/15 text-[11px] text-[#d1c5b3]">
                        <strong className="text-[#f2ca7a]">Prepared Amenities: </strong>
                        <span>
                          {booking.amenities.champagne || 'Laurent-Perrier Champagne'} •{' '}
                          {booking.amenities.macaron || 'Ladurée Macarons'}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between border-t border-[#f2ca7a]/10">
                      <a
                        href="https://wa.me/447700900321"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#f2ca7a] hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Contact Suite Concierge</span>
                      </a>

                      {!isCancelled && (
                        <button
                          onClick={() => handleCancelAppointment(booking.id)}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold text-[#ffb4ab] hover:text-white bg-[#37223d] border border-red-500/20 hover:bg-red-950/60 transition-all cursor-pointer"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Personal Beauty Roadmap & Backend Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Backend Status Card */}
            <div className="p-6 rounded-2xl bg-[#28142d] border border-[#f2ca7a]/25 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#f8d8fc] flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#f2ca7a]" />
                  <span>Cloud Database</span>
                </h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    isSupabaseLive ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-300'
                  }`}
                >
                  {isSupabaseLive ? 'Live Sync' : 'Simulated'}
                </span>
              </div>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                {isSupabaseLive
                  ? 'All bookings, reviews, and profiles are syncing directly with your production Supabase database.'
                  : 'Currently operating with offline/local fallback. Connect your Supabase project to synchronize across devices.'}
              </p>
              {onOpenSupabaseModal && (
                <button
                  onClick={onOpenSupabaseModal}
                  className="text-xs font-bold text-[#f2ca7a] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>Open Supabase Connection & SQL Schema</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Aesthetician Roadmap */}
            <div className="p-6 rounded-2xl bg-[#28142d] border border-[#f2ca7a]/25 space-y-3 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-[#f2ca7a]">
                Personal Beauty Roadmap
              </h3>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                Your skin barrier diagnostic recorded high hydration resilience. We recommend scheduling your pre-gala 24K Gold Cellular session 7 days prior to your June wedding.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#f2ca7a] hover:underline font-bold cursor-pointer"
                >
                  <span>Chat with Aesthetician Concierge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
