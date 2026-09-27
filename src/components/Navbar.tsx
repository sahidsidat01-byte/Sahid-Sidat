import React, { useState } from 'react';
import { CrestLogo } from './CrestLogo';
import { Calendar, User, Menu, X, Sparkles, Phone, MessageSquare, Database } from 'lucide-react';
import { BackendService } from '../lib/backendService';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  vipCode?: string;
  onOpenSupabaseModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  vipCode = 'JESSA-VIP-15',
  onOpenSupabaseModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVipBanner, setShowVipBanner] = useState(true);
  const isSupabaseActive = BackendService.isSupabaseLive();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top VIP Announcement Ribbon (Dismissible) */}
      {showVipBanner && (
        <div className="bg-gradient-to-r from-[#19061f] via-[#37223d] to-[#19061f] border-b border-[#f2ca7a]/20 py-1.5 px-4 text-center text-xs text-[#f8d8fc] relative z-50 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#f2ca7a]" />
          <span>
            Complimentary VIP Privilege: Enjoy <strong className="text-[#f2ca7a]">15% off</strong> your inaugural session with code{' '}
            <code className="bg-[#2c1832] px-1.5 py-0.5 rounded text-[#f2ca7a] font-mono font-bold tracking-wider">
              {vipCode}
            </code>
          </span>
          <button
            onClick={() => handleLinkClick('book-appointment')}
            className="ml-2 underline text-[#f2ca7a] hover:text-[#ffdea0] font-medium hidden sm:inline"
          >
            Redeem Now
          </button>
          <button
            onClick={() => setShowVipBanner(false)}
            className="absolute right-3 top-1.5 text-[#d1c5b3] hover:text-[#f8d8fc]"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 left-0 w-full z-40 bg-[#19061f]/85 backdrop-blur-xl border-b border-[#f2ca7a]/15 shadow-[0_4px_30px_rgba(25,6,31,0.65)] transition-all">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo Zone */}
          <div onClick={() => handleLinkClick('home')}>
            <CrestLogo size={42} />
          </div>

          {/* Center Navigation Links (Zone 2) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#28142d]/50 border border-[#f2ca7a]/15 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id || (currentPage === 'service-detail' && link.id === 'services');
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'text-[#402d00] font-bold bg-[#f2ca7a] shadow-[0_2px_12px_rgba(242,202,122,0.35)]'
                      : 'text-[#d1c5b3] hover:text-[#f2ca7a] hover:bg-[#37223d]/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Zone (Zone 3) */}
          <div className="flex items-center gap-2">
            {/* Supabase Database Status / Config Modal Trigger */}
            {onOpenSupabaseModal && (
              <button
                onClick={onOpenSupabaseModal}
                title={isSupabaseActive ? 'Supabase Live Connected' : 'Supabase Backend Config (Local Simulated Mode)'}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all border cursor-pointer ${
                  isSupabaseActive
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40'
                    : 'border-[#f2ca7a]/30 bg-[#28142d]/80 text-[#f2ca7a] hover:bg-[#37223d]'
                }`}
              >
                <Database className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xl:inline">
                  {isSupabaseActive ? 'Supabase Live' : 'Supabase Setup'}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSupabaseActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
              </button>
            )}

            {/* Client Portal Link */}
            <button
              onClick={() => handleLinkClick('login')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border cursor-pointer ${
                currentPage === 'login'
                  ? 'border-[#f2ca7a] bg-[#37223d] text-[#f2ca7a]'
                  : 'border-[#f2ca7a]/20 bg-[#28142d]/60 text-[#f2ca7a] hover:bg-[#37223d] hover:text-[#f8d8fc]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </button>

            {/* Book Appointment Luxury Pill */}
            <button
              onClick={() => handleLinkClick('book-appointment')}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_18px_rgba(212,175,98,0.35)] hover:shadow-[0_6px_24px_rgba(212,175,98,0.5)] cursor-pointer"
            >
              <span>Book Appointment</span>
              <Calendar className="w-3.5 h-3.5 text-[#402d00]" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#2c1832] border border-[#f2ca7a]/20 text-[#f8d8fc] hover:text-[#f2ca7a] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1f0b25] border-b border-[#f2ca7a]/20 px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#f2ca7a] text-[#402d00] font-bold'
                        : 'text-[#d1c5b3] hover:text-[#f2ca7a] hover:bg-[#2c1832]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#f2ca7a]/15 flex flex-col gap-2.5">
              <button
                onClick={() => handleLinkClick('login')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold bg-[#2c1832] border border-[#f2ca7a]/30 text-[#f2ca7a]"
              >
                <User className="w-4 h-4" />
                <span>Client Portal & VIP Hub</span>
              </button>
              <button
                onClick={() => handleLinkClick('book-appointment')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold bg-[#f2ca7a] text-[#402d00] shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </button>
            </div>

            {/* Quick Contact Micro Info in mobile drawer */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#d1c5b3]">
              <a href="tel:+442079460882" className="flex items-center gap-1 hover:text-[#f2ca7a]">
                <Phone className="w-3.5 h-3.5 text-[#f2ca7a]" />
                <span>+44 20 7946 0882</span>
              </a>
              <button onClick={() => handleLinkClick('contact')} className="flex items-center gap-1 hover:text-[#f2ca7a]">
                <MessageSquare className="w-3.5 h-3.5 text-[#f2ca7a]" />
                <span>Concierge Desk</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
