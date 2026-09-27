/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { BookingWizardPage } from './pages/BookingWizardPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { SupabaseConnectModal } from './components/SupabaseConnectModal';
import { SERVICES, Service, Stylist } from './data/salonData';
import { Sparkles, Check, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('royal-bridal-glamour-suite');
  const [bookingPrefill, setBookingPrefill] = useState<{
    service?: Service | null;
    stylistId?: string;
    date?: string;
  }>({});
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [vipCode, setVipCode] = useState<string>('JESSA-VIP-15');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSupabaseModal, setShowSupabaseModal] = useState<boolean>(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleNavigate = (page: string, params?: any) => {
    if (page === 'service-detail' && params?.id) {
      setSelectedServiceId(params.id);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (
    service: Service,
    prefill?: { stylistId?: string; date?: string }
  ) => {
    setBookingPrefill({
      service,
      stylistId: prefill?.stylistId,
      date: prefill?.date,
    });
    setCurrentPage('book-appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStylist = (stylist: Stylist) => {
    setBookingPrefill((prev) => ({
      ...prev,
      stylistId: stylist.id,
    }));
  };

  const handleBookingComplete = (bookingRecord: any) => {
    setUserBookings((prev) => [bookingRecord, ...prev]);
    showToast(`Reservation ${bookingRecord.id} confirmed! Added to your VIP Portal.`);
  };

  const handleVipClaimed = (code: string) => {
    setVipCode(code);
    showToast(`15% VIP code "${code}" claimed! Applied at checkout.`);
  };

  return (
    <div className="min-h-screen bg-[#1f0b25] text-[#f8d8fc] flex flex-col font-sans selection:bg-[#d4af62] selection:text-[#402d00]">
      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        vipCode={vipCode}
        onOpenSupabaseModal={() => setShowSupabaseModal(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectService={handleSelectService}
            onVipClaimed={handleVipClaimed}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectService={handleSelectService}
            onBookService={(svc) => handleBookService(svc)}
          />
        )}

        {currentPage === 'service-detail' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onNavigate={handleNavigate}
            onBookService={handleBookService}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onSelectStylist={handleSelectStylist}
          />
        )}

        {currentPage === 'reviews' && (
          <ReviewsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'book-appointment' && (
          <BookingWizardPage
            initialService={bookingPrefill.service}
            initialStylistId={bookingPrefill.stylistId}
            initialDate={bookingPrefill.date}
            onNavigate={handleNavigate}
            onBookingComplete={handleBookingComplete}
            vipCode={vipCode}
          />
        )}

        {currentPage === 'login' && (
          <ClientPortalPage
            onNavigate={handleNavigate}
            vipCode={vipCode}
            onOpenSupabaseModal={() => setShowSupabaseModal(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onVipClaimed={handleVipClaimed} />

      {/* Supabase Connection & Schema Modal */}
      <SupabaseConnectModal
        isOpen={showSupabaseModal}
        onClose={() => setShowSupabaseModal(false)}
        onSaved={() => {
          showToast('Supabase settings updated successfully!');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-[#28142d] border border-[#f2ca7a]/50 text-[#f8d8fc] shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-full bg-[#f2ca7a]/20 text-[#f2ca7a]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-[#f8d8fc]">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#d1c5b3] hover:text-[#f8d8fc] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
