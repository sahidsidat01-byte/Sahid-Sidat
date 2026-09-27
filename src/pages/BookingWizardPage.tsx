import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Check,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Wine,
  ShieldCheck,
  Copy,
  Download,
} from 'lucide-react';
import { SERVICES, Service, STYLISTS, Stylist } from '../data/salonData';
import { BackendService } from '../lib/backendService';

interface BookingWizardPageProps {
  initialService?: Service | null;
  initialStylistId?: string;
  initialDate?: string;
  onNavigate: (page: string, params?: any) => void;
  onBookingComplete?: (booking: any) => void;
  vipCode?: string;
}

export const BookingWizardPage: React.FC<BookingWizardPageProps> = ({
  initialService,
  initialStylistId,
  initialDate,
  onNavigate,
  onBookingComplete,
  vipCode = 'JESSA-VIP-15',
}) => {
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [selectedService, setSelectedService] = useState<Service>(initialService || SERVICES[0]);
  const [selectedStylist, setSelectedStylist] = useState<string>(initialStylistId || 'jessa-vance');
  const [bookingDate, setBookingDate] = useState<string>(
    initialDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [bookingTime, setBookingTime] = useState<string>('11:30 AM');

  // VIP Amenities
  const [champagneChoice, setChampagneChoice] = useState<string>('Laurent-Perrier Brut Champagne');
  const [macaronChoice, setMacaronChoice] = useState<string>('Rose Petal & Gold Leaf');
  const [scentChoice, setScentChoice] = useState<string>('Neroli & Royal Jasmine');
  const [acousticChoice, setAcousticChoice] = useState<string>('Chamber Strings Baroque');

  // Client Details
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Discount Code
  const [couponCode, setCouponCode] = useState<string>(vipCode);
  const [discountApplied, setDiscountApplied] = useState<boolean>(true);

  // Confirmed booking state
  const [bookingRef, setBookingRef] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialStylistId) setSelectedStylist(initialStylistId);
    if (initialDate) setBookingDate(initialDate);
  }, [initialService, initialStylistId, initialDate]);

  const timeslots = [
    { time: '10:00 AM', period: 'Morning' },
    { time: '11:30 AM', period: 'Morning' },
    { time: '01:30 PM', period: 'Afternoon' },
    { time: '03:00 PM', period: 'Afternoon' },
    { time: '04:30 PM', period: 'Late Afternoon' },
    { time: '06:00 PM', period: 'Evening' },
  ];

  const subtotal = selectedService.price;
  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal - discountAmount;
  const deposit = selectedService.deposit || 100;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase().includes('VIP') || couponCode.toUpperCase().includes('JESSA')) {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };

  const handleFinishBooking = async () => {
    const stylistObj = STYLISTS.find((s) => s.id === selectedStylist);
    const stylistName = stylistObj ? stylistObj.name : 'Master Artisan';

    try {
      const record = await BackendService.createAppointment({
        guestName,
        guestEmail,
        guestPhone,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        stylistId: selectedStylist,
        stylistName,
        appointmentDate: bookingDate,
        appointmentTime: bookingTime,
        status: 'confirmed',
        totalPrice: total,
        depositPaid: deposit,
        amenities: {
          champagne: champagneChoice,
          macaron: macaronChoice,
          scent: scentChoice,
          acoustic: acousticChoice,
        },
        specialRequests: specialRequests || null,
      });

      setBookingRef(record.id);
      if (onBookingComplete) onBookingComplete(record);
    } catch (e) {
      console.warn('Backend creation fallback:', e);
      const ref = `JBP-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(ref);
    }

    setStep(5);
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f2ca7a', '#d4af62', '#debaee', '#ffdea0'],
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(bookingRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="w-full flex flex-col pb-24">
      {/* 1. Header */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#37223d] border border-[#f2ca7a]/30 text-[#f2ca7a] text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Private Atelier Reservation Suite</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#f8d8fc] font-bold">
          Reserve Your Bespoke Ritual
        </h1>

        <p className="text-xs sm:text-sm text-[#d1c5b3] max-w-lg mx-auto mt-2 leading-relaxed">
          Surrender to unhurried sanctuary pampering. Follow the five steps to customize your master stylist, treatment date, and sensory suite amenities.
        </p>

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-[#f2ca7a] text-[#402d00] shadow-[0_0_12px_rgba(242,202,122,0.6)]'
                    : step > s
                    ? 'bg-[#37223d] text-[#f2ca7a] border border-[#f2ca7a]/40'
                    : 'bg-[#28142d] text-[#998f7f] border border-[#f2ca7a]/15'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 5 && <div className={`w-4 sm:w-8 h-0.5 ${step > s ? 'bg-[#f2ca7a]' : 'bg-[#37223d]'}`} />}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Main Wizard Container */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6">
        <div className="rounded-3xl bg-[#28142d] border border-[#f2ca7a]/25 p-6 sm:p-10 shadow-2xl relative">
          {/* STEP 1: Select Ritual */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f8d8fc]">
                  Step 1: Choose Your Signature Ritual
                </h3>
                <p className="text-xs text-[#d1c5b3] mt-1">
                  Select a bespoke service tailored to your wellness and occasion needs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  const isSelected = selectedService.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#37223d] border-[#f2ca7a] shadow-[0_0_15px_rgba(242,202,122,0.2)]'
                          : 'bg-[#2c1832] border-[#f2ca7a]/15 hover:border-[#f2ca7a]/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-[#f2ca7a] font-bold uppercase tracking-wider block">
                            {s.categoryLabel}
                          </span>
                          <h4 className="font-serif text-base font-bold text-[#f8d8fc]">{s.name}</h4>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif text-base font-bold text-[#f2ca7a]">${s.price}</span>
                          <span className="text-[10px] text-[#998f7f] block">{s.duration}</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#d1c5b3] line-clamp-2 leading-relaxed">{s.shortDesc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] hover:brightness-105 shadow-md cursor-pointer"
                >
                  <span>Continue to Stylist Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Master Stylist */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f8d8fc]">
                  Step 2: Select Your Master Artisan
                </h3>
                <p className="text-xs text-[#d1c5b3] mt-1">
                  All master stylists have over 8 years of premier salon tenure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STYLISTS.map((st) => {
                  const isSelected = selectedStylist === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStylist(st.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? 'bg-[#37223d] border-[#f2ca7a] shadow-[0_0_15px_rgba(242,202,122,0.2)]'
                          : 'bg-[#2c1832] border-[#f2ca7a]/15 hover:border-[#f2ca7a]/40'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-[#19061f] shrink-0 border border-[#f2ca7a]/30">
                        <img src={st.image} alt={st.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-serif text-base font-bold text-[#f8d8fc] truncate">{st.name}</h4>
                        <span className="text-xs text-[#f2ca7a] font-medium truncate">{st.role}</span>
                        <span className="text-[10px] text-[#998f7f] mt-0.5">{st.experience}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-[#d1c5b3] hover:text-[#f8d8fc] bg-[#2c1832]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] hover:brightness-105 shadow-md cursor-pointer"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f8d8fc]">
                  Step 3: Preferred Date & Time
                </h3>
                <p className="text-xs text-[#d1c5b3] mt-1">
                  Choose your appointment slot inside our Mayfair Private Suite.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#f2ca7a] tracking-wider mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none focus:border-[#f2ca7a]"
                  />
                  <span className="text-[11px] text-[#998f7f] mt-2 block">
                    Mayfair suite is open Tuesday – Sunday.
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#f2ca7a] tracking-wider mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeslots.map((slot, i) => {
                      const isSelected = bookingTime === slot.time;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setBookingTime(slot.time)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#f2ca7a] text-[#402d00] border-[#f2ca7a] font-bold shadow-md'
                              : 'bg-[#19061f] border-[#f2ca7a]/20 text-[#d1c5b3] hover:text-[#f8d8fc]'
                          }`}
                        >
                          <div>{slot.time}</div>
                          <span className="text-[9px] opacity-75">{slot.period}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-[#d1c5b3] hover:text-[#f8d8fc] bg-[#2c1832]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] hover:brightness-105 shadow-md cursor-pointer"
                >
                  <span>VIP Suite Amenities & Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: VIP Amenities & Guest Details */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f8d8fc]">
                  Step 4: Bespoke VIP Amenities & Details
                </h3>
                <p className="text-xs text-[#d1c5b3] mt-1">
                  Complimentary tailored luxury provisions prepared prior to your arrival.
                </p>
              </div>

              {/* Amenities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#2c1832] border border-[#f2ca7a]/20">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider block mb-1.5">
                    Complimentary Champagne Choice
                  </label>
                  <select
                    value={champagneChoice}
                    onChange={(e) => setChampagneChoice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Laurent-Perrier Brut Champagne">Laurent-Perrier Brut Champagne</option>
                    <option value="Laurent-Perrier Cuvée Rosé">Laurent-Perrier Cuvée Rosé (+ $20)</option>
                    <option value="Artisanal Rosebud & Lavender Infusion (Alcohol-Free)">
                      Artisanal Rosebud & Lavender Infusion (Alcohol-Free)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider block mb-1.5">
                    Ladurée Macaron Selection
                  </label>
                  <select
                    value={macaronChoice}
                    onChange={(e) => setMacaronChoice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Rose Petal & Gold Leaf">Rose Petal & Gold Leaf</option>
                    <option value="Salted Caramel & Dark Cocoa">Salted Caramel & Dark Cocoa</option>
                    <option value="Pistachio & Orange Blossom">Pistachio & Orange Blossom</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider block mb-1.5">
                    Room Scent Formulation
                  </label>
                  <select
                    value={scentChoice}
                    onChange={(e) => setScentChoice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Neroli & Royal Jasmine">Neroli & Royal Jasmine</option>
                    <option value="Sandalwood & White Tea">Sandalwood & White Tea</option>
                    <option value="Unscented Pure Clean Air">Unscented Pure Clean Air</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider block mb-1.5">
                    Acoustic Ambiance
                  </label>
                  <select
                    value={acousticChoice}
                    onChange={(e) => setAcousticChoice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Chamber Strings Baroque">Chamber Strings Baroque</option>
                    <option value="Acoustic Lo-Fi Jazz">Acoustic Lo-Fi Jazz</option>
                    <option value="Absolute Acoustic Silence">Absolute Acoustic Silence</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Lady Katherine"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="katherine@holmes.com"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+44 7700 900888"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider mb-1">
                    Special Requests or Allergies
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Sensitive to strong fragrance, veil attachment assistance needed..."
                    className="w-full px-3.5 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl text-xs focus:outline-none focus:border-[#f2ca7a]"
                  />
                </div>
              </div>

              {/* Price Breakdown with Voucher */}
              <div className="p-4 rounded-xl bg-[#19061f] border border-[#f2ca7a]/25 space-y-2 text-xs">
                <div className="flex justify-between text-[#d1c5b3]">
                  <span>{selectedService.name} Ritual Investment</span>
                  <span>${subtotal}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-[#f2ca7a] font-semibold">
                    <span>VIP Aesthetics Circle 15% Privilege</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold text-[#f8d8fc] pt-2 border-t border-[#f2ca7a]/15">
                  <span>Estimated Total</span>
                  <span className="text-[#f2ca7a] font-serif text-lg">${total}</span>
                </div>

                <div className="text-[11px] text-[#998f7f] flex items-center justify-between pt-1">
                  <span>Deposit Due to Secure Suite:</span>
                  <strong className="text-[#f8d8fc]">${deposit}</strong>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-[#d1c5b3] hover:text-[#f8d8fc] bg-[#2c1832]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  disabled={!guestName || !guestEmail || !guestPhone}
                  onClick={handleFinishBooking}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] hover:brightness-105 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Confirm Reservation & Guarantee</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmation */}
          {step === 5 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#f2ca7a]/20 border border-[#f2ca7a] text-[#f2ca7a] mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#f2ca7a] tracking-widest block">
                  Private Suite Confirmed
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#f8d8fc] mt-1">
                  We Await Your Regal Presence
                </h3>
                <p className="text-xs sm:text-sm text-[#d1c5b3] max-w-md mx-auto mt-2">
                  Thank you, <strong>{guestName || 'Patron'}</strong>. A dedicated VIP concierge has confirmed your appointment at our Mayfair suite.
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#19061f] border border-[#f2ca7a]/30 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#f2ca7a]/15">
                  <span className="text-[#998f7f]">Booking Reference:</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-[#f2ca7a] text-sm">
                    <span>{bookingRef}</span>
                    <button
                      onClick={handleCopyRef}
                      className="p-1 hover:text-[#ffdea0] cursor-pointer"
                      title="Copy Reference"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {copiedRef && <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>}
                  </div>
                </div>

                <div className="space-y-1.5 text-[#d1c5b3]">
                  <p>
                    <strong className="text-[#f8d8fc]">Ritual:</strong> {selectedService.name}
                  </p>
                  <p>
                    <strong className="text-[#f8d8fc]">Master Stylist:</strong>{' '}
                    {STYLISTS.find((s) => s.id === selectedStylist)?.name}
                  </p>
                  <p>
                    <strong className="text-[#f8d8fc]">Date & Time:</strong> {bookingDate} at {bookingTime}
                  </p>
                  <p>
                    <strong className="text-[#f8d8fc]">Location:</strong> 482 Royal Crescent, Suite 100, Mayfair
                  </p>
                  <p>
                    <strong className="text-[#f8d8fc]">Champagne:</strong> {champagneChoice}
                  </p>
                  <p>
                    <strong className="text-[#f8d8fc]">Deposit Paid:</strong> ${deposit} (Balance ${total - deposit} upon conclusion)
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-6 py-2.5 rounded-full bg-[#f2ca7a] text-[#402d00] font-bold text-xs hover:brightness-105 shadow-md cursor-pointer"
                >
                  View in Client Portal
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="px-6 py-2.5 rounded-full bg-[#37223d] text-[#f8d8fc] text-xs font-semibold hover:bg-[#432d48] border border-[#f2ca7a]/20 cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
