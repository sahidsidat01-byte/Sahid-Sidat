import React, { useState } from 'react';
import { CrestLogo } from './CrestLogo';
import { MapPin, Clock, Phone, MessageSquare, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
  onVipClaimed?: (code: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onVipClaimed }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    if (onVipClaimed) onVipClaimed('JESSA-VIP-15');
  };

  return (
    <>
      <footer className="w-full bg-[#19061f] border-t border-[#f2ca7a]/15 text-[#f8d8fc] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#f2ca7a]/10">
            {/* Col 1: Brand & Credential */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div onClick={() => onNavigate('home')} className="cursor-pointer">
                <CrestLogo size={48} />
              </div>
              <p className="text-sm text-[#d1c5b3] max-w-sm leading-relaxed">
                An opulent sanctuary committed to tailored salon artistry, bespoke therapies, and regal pampering tailored exclusively to you.
              </p>
              <div className="pt-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2c1832] border border-[#f2ca7a]/25 text-[#f2ca7a] text-xs font-semibold tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#f2ca7a]" />
                  <span>Certified Aesthetics Master Atelier</span>
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <h3 className="font-serif text-lg font-semibold text-[#f2ca7a] tracking-wide">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-[#d1c5b3]">
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-[#f2ca7a] transition-colors text-left">
                    Treatment Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('gallery')} className="hover:text-[#f2ca7a] transition-colors text-left">
                    Editorial Showcase
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-[#f2ca7a] transition-colors text-left">
                    The Salon Story
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('reviews')} className="hover:text-[#f2ca7a] transition-colors text-left">
                    Guest Testimonials
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('book-appointment')} className="hover:text-[#f2ca7a] transition-colors text-left font-medium text-[#f2ca7a]">
                    Reserve Session
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Hours & Location */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <h3 className="font-serif text-lg font-semibold text-[#f2ca7a] tracking-wide">
                Hours & Location
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[#d1c5b3]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#f2ca7a] shrink-0 mt-1" />
                  <span>
                    482 Royal Crescent, Suite 100<br />
                    Mayfair, London W1K 7AA
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#f2ca7a] shrink-0 mt-1" />
                  <div className="space-y-0.5 text-xs">
                    <p>Tue – Sat: 9:00 AM – 7:30 PM</p>
                    <p>Sunday: 10:00 AM – 5:00 PM</p>
                    <p className="text-[#998f7f]">Monday: Closed (Private Buyouts)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Concierge & VIP Newsletter */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <h3 className="font-serif text-lg font-semibold text-[#f2ca7a] tracking-wide">
                Concierge & VIP
              </h3>
              <div className="flex flex-col gap-2 text-sm text-[#d1c5b3]">
                <a href={`tel:${SALON_INFO.phone}`} className="flex items-center gap-2 hover:text-[#f2ca7a] transition-colors">
                  <Phone className="w-4 h-4 text-[#f2ca7a]" />
                  <span>{SALON_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/447700900321`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#f2ca7a] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#f2ca7a]" />
                  <span>WhatsApp: {SALON_INFO.whatsapp}</span>
                </a>
              </div>

              {/* Newsletter */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#d1c5b3] font-semibold block mb-1.5">
                  VIP Newsletter & Privileges
                </span>
                {subscribed ? (
                  <div className="p-2.5 rounded-xl bg-[#2c1832] border border-[#f2ca7a]/30 text-xs text-[#f2ca7a] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Welcome! 15% code <strong>JESSA-VIP-15</strong> saved to your portal.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full px-3 py-1.5 bg-[#2c1832] border border-[#f2ca7a]/20 rounded-full text-xs text-[#f8d8fc] placeholder:text-[#998f7f] focus:outline-none focus:border-[#f2ca7a]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] hover:brightness-105 text-[#402d00] font-bold text-xs rounded-full shrink-0 transition-all cursor-pointer"
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Policies */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d1c5b3]">
            <p>© 2025 Jessa's Beauty Parlor & Aesthetics. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-[#f2ca7a] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-[#f2ca7a] transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveModal('cancellation')}
                className="hover:text-[#f2ca7a] transition-colors cursor-pointer"
              >
                Cancellation Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Policies */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19061f]/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#2c1832] border border-[#f2ca7a]/30 p-6 shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#f2ca7a]">
              {activeModal === 'privacy' && 'Privacy Policy & Dermal Data Security'}
              {activeModal === 'terms' && 'Terms of Service & Sanctuary Etiquette'}
              {activeModal === 'cancellation' && 'Cancellation & Diamond Rescheduling Policy'}
            </h3>
            <div className="text-xs text-[#d1c5b3] space-y-2.5 max-h-72 overflow-y-auto pr-2 leading-relaxed">
              {activeModal === 'privacy' && (
                <>
                  <p>At Jessa’s Beauty Parlor, guest confidentiality is safeguarded with supreme diligence. Skin mapping records, allergic profiles, and photography captures remain strictly confidential.</p>
                  <p>We do not sell, rent, or distribute personal information to third parties. Images from your bridal or couture sessions are only displayed in our Lookbook upon your explicit written authorization.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <p>Welcome to Jessa’s Sanctuary. All clients are requested to arrive 10 minutes prior to scheduled rituals to allow unhurried sensory settling and botanical tea selection.</p>
                  <p>Children under 14 may only attend when undergoing scheduled bridal party services in dedicated acoustic suites.</p>
                </>
              )}
              {activeModal === 'cancellation' && (
                <>
                  <p>We understand schedules may evolve. For regular treatments, appointments may be rescheduled or cancelled with full deposit retention up to 48 hours prior to start time.</p>
                  <p>For Bridal Suites and Full Private Buyouts, complimentary rescheduling is honored up to 14 days before ceremony day under our <strong>Jessa Diamond Guarantee</strong>.</p>
                </>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-1.5 rounded-full bg-[#f2ca7a] text-[#402d00] text-xs font-bold hover:brightness-105"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
