import React, { useState } from 'react';
import {
  ChevronRight,
  Sparkles,
  Maximize2,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  Award,
  ArrowRight,
  X,
} from 'lucide-react';
import { SERVICES, Service, STYLISTS } from '../data/salonData';

interface ServiceDetailPageProps {
  serviceId?: string;
  onNavigate: (page: string, params?: any) => void;
  onBookService: (service: Service, prefill?: { stylistId?: string; date?: string }) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId = 'royal-bridal-glamour-suite',
  onNavigate,
  onBookService,
}) => {
  // Find current service or default to royal bridal suite
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  // Showcase gallery thumbnails
  const galleryImages = [
    {
      title: 'Couture Hair',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3D7ehqU67r5m8aLiCfna8-NFYCKGa-ZJPE4QCq8vi1R1FKOSPUVDoZ-5Wkd9IGMAbUxS-ayMAP1PxXg7XSqKp4AciI0MVuvduEhZuXpyBiC1FW4xl3ZMt2-eViF87L_dq2qtCgjy2DXHtCZ1j2Mwx9eJO2AQ7YPLvrJ1ibbnqKEG7WtYHHdUegXdnQPTIjl0RUyEoMR_3xp6Jkkp7EQbTl3_WvJbSNZochapiOyV_k6tro0YYkK59',
      alt: 'Bridal luxury hair accessories and intricate chignon with gold pins',
    },
    {
      title: 'Airbrush HD',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiyhmat2v7jqaTHJXM3QNSYzX9B2pwVafwMFG1lT6Dd-p9HmdRfCwHbsK2q9TOhx9g8pYVFAp7zrHPRTPoxb0SGzLYQt6s1bxDs4_RGf9Gpo5V4HPGXalis-XVIcOp9o4H8LSzGZ2AEdQ7fnpre3IhBvlfe2Y5Y5CPcWEF0tjbBNT7xBxhDkYUIpEV7FSbthcO7HeTy1PEQUI_BMw72gU12YbNhCPJhYF9IEXF85jJYUYDe2Xyp0Fs',
      alt: 'Professional makeup artist applying luminous high-definition airbrush foundation',
    },
    {
      title: 'Lip Sculpt',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuUh1eKFKUoLyYvPWdYtuSPAJXCX9csvTrWBSD4ZdVQlUxxc5aQWdmHygjrT9btWebIlAQa1cEHm09i_hLJZAKtJx1BJ1YIxHBFa8ceYiM6ZPhdNrDss-WlVz7zF3VU8_mWqCiSq4bEFN5B0cOkP3-HyiGEoIHpf2kvUQG8svEWwwfPfV0JPqqcyRVaRLTjOLJH_K_CQaq-Q3jItaOIF9rOJPGN08FNqxGRIUeWpmIngRJg5ox0vAI',
      alt: 'Satin mauve lip finish and velvety cheekbones with gold highlight',
    },
    {
      title: 'Skin Infusion',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_IKYRWQHSK88yLuEUeIr41Tobl2fyAhiTX2NSyzHdNRGiRcKTPT1B3tbs5yV2UjpeGHinQNAmGXZfGFrH8xbe8HzBfDqt5GX9KoEJpvcIfuxMXsVaOMH24AmN3VPVVSTGLhkXOOKWrzbRxnDz0Uz-bA6lqCQm_ahDhY1nYcaeU07L4PVThVx30IVoB6bxni_wQ-5RfJW4RNHpYulKZp_E8PbczIbcjGDWpcyl76pROdTDDXGsjwzu',
      alt: 'Aesthetic spa skin preparation session with hyaluronic misting',
    },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'prep' | 'products'>('overview');
  const [selectedStylistId, setSelectedStylistId] = useState<string>('jessa-vance');
  const [ceremonyDate, setCeremonyDate] = useState<string>('2025-06-14');
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  // Filter related rituals
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  const currentDisplayImage = activeImageIndex === -1 ? service.image : galleryImages[activeImageIndex]?.url || service.image;

  const handleBookNow = () => {
    onBookService(service, {
      stylistId: selectedStylistId,
      date: ceremonyDate,
    });
  };

  return (
    <div className="w-full flex flex-col pb-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-[#d1c5b3] uppercase tracking-wider mb-8 overflow-x-auto whitespace-nowrap pb-1"
        >
          <button onClick={() => onNavigate('home')} className="hover:text-[#f2ca7a] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#998f7f]" />
          <button onClick={() => onNavigate('services')} className="hover:text-[#f2ca7a] transition-colors">
            Services
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#998f7f]" />
          <span className="text-[#998f7f]">{service.categoryLabel}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#998f7f]" />
          <span className="text-[#f2ca7a] font-bold">{service.name}</span>
        </nav>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (7 cols): Showcase & In-Depth Details */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Media Bento */}
            <div className="flex flex-col gap-3">
              {/* Main Image */}
              <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl bg-[#28142d] border border-[#f2ca7a]/25 group">
                <img
                  src={currentDisplayImage}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19061f]/80 via-transparent to-[#19061f]/20 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#19061f]/90 backdrop-blur-md text-[#f2ca7a] text-[10px] font-bold uppercase tracking-widest border border-[#f2ca7a]/30 shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#f2ca7a]" />
                    {service.badge || 'Couture Signature'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#5a3e69]/90 backdrop-blur-md text-[#f5d9ff] text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    24H Longevity
                  </span>
                </div>

                {/* Bottom Bar in Hero */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#f8d8fc]">
                  <div className="flex items-center gap-1.5 bg-[#19061f]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#f2ca7a]/20 text-[11px]">
                    <span className="text-[#f2ca7a] font-semibold">Artisan Capture</span>
                    <span className="text-[#d1c5b3]">• Mayfair Studio</span>
                  </div>
                  <button
                    onClick={() => setShowLightbox(true)}
                    className="p-2 rounded-full bg-[#19061f]/80 backdrop-blur-md text-[#f2ca7a] hover:bg-[#37223d] transition-colors cursor-pointer border border-[#f2ca7a]/20"
                    title="Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2.5">
                {galleryImages.map((thumb, idx) => {
                  const isSelected = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-20 sm:h-24 rounded-xl overflow-hidden bg-[#28142d] transition-all duration-300 cursor-pointer border ${
                        isSelected
                          ? 'border-[#f2ca7a] ring-2 ring-[#f2ca7a] opacity-100 shadow-md'
                          : 'border-[#f2ca7a]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={thumb.url} alt={thumb.alt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#19061f]/20" />
                      <span className="absolute bottom-1 right-1 text-[9px] bg-[#19061f]/90 px-1.5 py-0.5 rounded text-[#f2ca7a] font-medium">
                        {thumb.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#19061f]/70 border border-[#f2ca7a]/20 backdrop-blur-md overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#f2ca7a] text-[#402d00] font-bold shadow-md'
                    : 'text-[#d1c5b3] hover:text-[#f2ca7a]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'itinerary'
                    ? 'bg-[#f2ca7a] text-[#402d00] font-bold shadow-md'
                    : 'text-[#d1c5b3] hover:text-[#f2ca7a]'
                }`}
              >
                Step-by-Step
              </button>
              <button
                onClick={() => setActiveTab('prep')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'prep'
                    ? 'bg-[#f2ca7a] text-[#402d00] font-bold shadow-md'
                    : 'text-[#d1c5b3] hover:text-[#f2ca7a]'
                }`}
              >
                Preparation
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#f2ca7a] text-[#402d00] font-bold shadow-md'
                    : 'text-[#d1c5b3] hover:text-[#f2ca7a]'
                }`}
              >
                Atelier Products
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="bg-[#28142d]/70 border border-[#f2ca7a]/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
                <div className="flex items-center gap-1.5 text-[#f2ca7a] text-xs uppercase tracking-widest font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>The Royal Philosophy</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#f8d8fc] font-semibold leading-tight">
                  Immaculate Regal Artistry Engineered for Your Once-in-a-Lifetime Day
                </h2>

                <p className="text-sm sm:text-base text-[#d1c5b3] leading-relaxed">
                  {service.fullDesc}
                </p>

                <p className="text-xs sm:text-sm text-[#d1c5b3] leading-relaxed">
                  We begin weeks prior with an intimate 90-minute trial session analyzing facial symmetries and wedding photography color palettes. On your momentous day, surrender to a tranquil environment scented with calming neroli and jasmine, accompanied by continuous French champagne concierge service.
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#f2ca7a]/15">
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-bold text-[#f2ca7a]">24H</span>
                    <span className="text-[10px] uppercase text-[#d1c5b3] tracking-wider mt-0.5">
                      Tear & Humidity Proof
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-bold text-[#f2ca7a]">1:1</span>
                    <span className="text-[10px] uppercase text-[#d1c5b3] tracking-wider mt-0.5">
                      Private Suite Booking
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-bold text-[#f2ca7a]">100%</span>
                    <span className="text-[10px] uppercase text-[#d1c5b3] tracking-wider mt-0.5">
                      Satisfaction Warranty
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Step-by-Step Odyssey */}
            {activeTab === 'itinerary' && (
              <div className="bg-[#28142d]/70 border border-[#f2ca7a]/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#f2ca7a]">
                  The 195-Minute Bridal Odyssey
                </h3>

                <div className="relative flex flex-col gap-6 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#f2ca7a] before:via-[#debaee] before:to-[#d4af62]">
                  {service.itinerary ? (
                    service.itinerary.map((step, idx) => (
                      <div key={idx} className="relative flex flex-col gap-1">
                        <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#f2ca7a] shadow-[0_0_8px_rgba(242,202,122,0.8)]" />
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base font-semibold text-[#f8d8fc]">
                            {step.step}. {step.title}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#37223d] text-[#f2ca7a] border border-[#f2ca7a]/20">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-[#d1c5b3] leading-relaxed">{step.desc}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#d1c5b3]">Itinerary customized upon consultation.</p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Preparation Protocol */}
            {activeTab === 'prep' && (
              <div className="bg-[#28142d]/70 border border-[#f2ca7a]/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Do's */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#f2ca7a] font-serif text-lg font-bold">
                    <CheckCircle className="w-5 h-5 text-[#f2ca7a]" />
                    <span>Essential Protocol (Do's)</span>
                  </div>
                  <ul className="text-xs text-[#d1c5b3] space-y-2">
                    {service.dos?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#f2ca7a] font-bold">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#ffb4ab] font-serif text-lg font-bold">
                    <XCircle className="w-5 h-5 text-[#ffb4ab]" />
                    <span>Restrictions (Don'ts)</span>
                  </div>
                  <ul className="text-xs text-[#d1c5b3] space-y-2">
                    {service.donts?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#ffb4ab] font-bold">✕</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 4: Atelier Luxury Products */}
            {activeTab === 'products' && (
              <div className="bg-[#28142d]/70 border border-[#f2ca7a]/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#f2ca7a]">
                  Haute Formulary & Prestige Brands
                </h3>
                <p className="text-xs text-[#d1c5b3] leading-relaxed">
                  We exclusively deploy hypoallergenic, non-comedogenic formulations proven under intense 4K broadcast lenses and variable climatic conditions.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {service.atelierProducts ? (
                    service.atelierProducts.map((prod, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#2c1832] border border-[#f2ca7a]/20 text-center flex flex-col items-center gap-1.5"
                      >
                        <Sparkles className="w-6 h-6 text-[#f2ca7a] mb-1" />
                        <span className="font-serif text-sm font-bold text-[#f8d8fc]">{prod.brand}</span>
                        <span className="text-[11px] text-[#d1c5b3] leading-tight">{prod.product}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#d1c5b3]">Customized luxury skincare portfolio.</p>
                  )}
                </div>
              </div>
            )}

            {/* In-Suite Testimonial Highlight Card */}
            <div className="bg-[#37223d]/60 border border-[#f2ca7a]/25 rounded-2xl p-6 backdrop-blur-md flex flex-col sm:flex-row items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-[#28142d] border border-[#f2ca7a]/40 p-0.5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqY7v7rclTthpTniT3w4LF8ArSEap5iqhLRoO699A_gJk-b7QnHcZQfIjHn_0EesAJc4S2JwS6PlYb46jutHxGfkb2D7WQQ7GwGyyK_b0vPiWIRLF4UlvjYAOM39lpmNXEkdJ2UFyRmtJSgB7og0jLNGGnee5C9UpGmOagtql3jvepzhyLZmNnUM2qZFzrlosdnSwn_CSJeyVbJqYy1igCi39iM8XTje5bmuSjgk-cO-U_GLRswwGm"
                  alt="Bride portrait"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[#f2ca7a]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#f2ca7a]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#f8d8fc] italic leading-relaxed">
                  “My bridal glam lasted past 3 AM through endless dancing and tears without a single crease. Jessa and Camille treated me like royalty.”
                </p>
                <span className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider">
                  — Lady Eleanor Harrington • Married Oct 2024
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Sticky Booking Suite & Configuration Panel */}
          <div className="lg:col-span-5 sticky top-24 flex flex-col gap-4">
            <div className="bg-[#28142d]/85 border border-[#f2ca7a]/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
              {/* Header & Title */}
              <div className="space-y-2 pb-2 border-b border-[#f2ca7a]/15">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#f2ca7a] uppercase tracking-widest bg-[#37223d] px-3 py-1 rounded-full border border-[#f2ca7a]/20">
                    {service.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[#f2ca7a] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#f2ca7a]" />
                    <span className="text-[#f8d8fc]">{service.rating}</span>
                    <span className="text-[#998f7f] font-normal">({service.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl text-[#f8d8fc] font-bold leading-tight">
                  {service.name}
                </h1>
                <p className="text-xs text-[#d1c5b3]">{service.shortDesc}</p>
              </div>

              {/* Price & Duration */}
              <div className="bg-[#2c1832] border border-[#f2ca7a]/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl font-bold text-[#f2ca7a]">${service.price}</span>
                    <span className="text-xs text-[#d1c5b3]">all-inclusive</span>
                  </div>
                  <span className="text-[11px] text-[#d1c5b3]">
                    Deposit due upon booking: <strong className="text-[#f8d8fc] font-semibold">${service.deposit || 100}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#d1c5b3] bg-[#37223d] px-3 py-1.5 rounded-full border border-[#f2ca7a]/15">
                  <Clock className="w-3.5 h-3.5 text-[#f2ca7a]" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Master Stylist Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="uppercase tracking-wider text-[#d1c5b3]">Select Master Stylist</span>
                  <span className="text-[#f2ca7a] font-normal text-[11px]">Included in suite price</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {STYLISTS.slice(0, 2).map((stylist) => {
                    const isSelected = selectedStylistId === stylist.id;
                    return (
                      <button
                        key={stylist.id}
                        type="button"
                        onClick={() => setSelectedStylistId(stylist.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#37223d] border-[#f2ca7a] shadow-[0_0_15px_rgba(242,202,122,0.2)]'
                            : 'bg-[#2c1832]/60 border-[#f2ca7a]/15 hover:bg-[#37223d]/60'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-[#28142d] shrink-0 border border-[#f2ca7a]/30">
                          <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-[#f8d8fc] truncate">{stylist.name}</span>
                          <span className="text-[10px] text-[#f2ca7a] truncate">{stylist.role.split('&')[0]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inclusions Summary */}
              {service.inclusions && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] uppercase font-bold text-[#d1c5b3] tracking-wider block">
                    Suite Inclusions:
                  </span>
                  <div className="space-y-1.5 text-xs text-[#d1c5b3]">
                    {service.inclusions.slice(0, 4).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#f2ca7a] shrink-0 mt-0.5" />
                        <span className="leading-tight">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Date Quick Picker */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] uppercase font-bold text-[#d1c5b3] tracking-wider block">
                  Preferred Ceremony / Appointment Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={ceremonyDate}
                    onChange={(e) => setCeremonyDate(e.target.value)}
                    className="w-full bg-[#19061f] border border-[#f2ca7a]/30 px-4 py-2.5 rounded-xl text-xs text-[#f8d8fc] focus:outline-none focus:border-[#f2ca7a] cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleBookNow}
                  className="w-full py-3 px-6 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] hover:brightness-105 active:scale-98 transition-all shadow-[0_4px_22px_rgba(242,202,122,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve Bridal Suite</span>
                  <Calendar className="w-4 h-4 text-[#402d00]" />
                </button>
                <p className="text-[10px] text-center text-[#d1c5b3]">
                  Complimentary rescheduling up to 14 days prior to appointment.
                </p>
              </div>

              {/* WhatsApp Concierge Contact */}
              <div className="pt-3 border-t border-[#f2ca7a]/15 flex items-center justify-between text-xs">
                <span className="text-[#d1c5b3] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#debaee]" />
                  <span>Bridal Concierge Inquiry:</span>
                </span>
                <a
                  href="https://wa.me/447700900321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f2ca7a] hover:underline font-bold text-xs uppercase tracking-wider"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="bg-[#19061f]/80 border border-[#f2ca7a]/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-[#2c1832] text-[#f2ca7a] shrink-0 border border-[#f2ca7a]/30">
                <Award className="w-5 h-5 text-[#f2ca7a]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xs font-bold text-[#f8d8fc]">The Jessa Diamond Guarantee</span>
                <span className="text-[11px] text-[#d1c5b3]">
                  If your trial does not fully achieve your aesthetic vision, your deposit is 100% reimbursed.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Rituals */}
        <div className="mt-20 pt-12 border-t border-[#f2ca7a]/15 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-widest">
                Curated Complements
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#f8d8fc] font-semibold mt-1">
                Related Bridal Rituals You May Love
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-bold text-[#f2ca7a] hover:text-[#ffdea0] flex items-center gap-1"
            >
              <span>Explore All 24 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <div
                key={rel.id}
                className="bg-[#28142d]/70 border border-[#f2ca7a]/20 rounded-2xl overflow-hidden shadow-xl hover:border-[#f2ca7a]/40 transition-all flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onNavigate('service-detail', { id: rel.id })}>
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19061f] via-transparent to-transparent opacity-85" />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#19061f]/80 text-[#f2ca7a] text-[10px] font-bold border border-[#f2ca7a]/25">
                    {rel.duration}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif text-base font-bold text-[#f8d8fc] group-hover:text-[#f2ca7a] transition-colors">
                        {rel.name}
                      </h4>
                      <span className="font-serif text-base font-bold text-[#f2ca7a]">${rel.price}</span>
                    </div>
                    <p className="text-xs text-[#d1c5b3] line-clamp-2 leading-relaxed">{rel.shortDesc}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-[#f2ca7a]/10">
                    <span className="text-[11px] text-[#d1c5b3] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#f2ca7a] text-[#f2ca7a]" />
                      <span>{rel.rating} ({rel.reviewsCount})</span>
                    </span>
                    <button
                      onClick={() => onBookService(rel)}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#37223d] hover:bg-[#f2ca7a] hover:text-[#402d00] text-[#f8d8fc] transition-all cursor-pointer"
                    >
                      Add to Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-[#19061f]/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#2c1832] text-[#f2ca7a] hover:text-[#f8d8fc] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full flex flex-col items-center gap-4">
            <div className="w-full max-h-[80vh] rounded-2xl overflow-hidden border border-[#f2ca7a]/30 shadow-2xl">
              <img src={currentDisplayImage} alt={service.name} className="w-full h-full object-contain" />
            </div>
            <span className="font-serif text-lg text-[#f2ca7a]">
              {service.name} — Haute Esthétique Archives
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
