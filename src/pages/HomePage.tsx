import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, Wine, HeartHandshake, Eye, Flower2, Clock, Check } from 'lucide-react';
import { SERVICES, TESTIMONIALS, LOOKBOOK_ITEMS, SALON_INFO } from '../data/salonData';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectService: (serviceId: string) => void;
  onVipClaimed?: (code: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectService,
  onVipClaimed,
}) => {
  const [vipEmail, setVipEmail] = useState('');
  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  // Take the first 4 signature services for the Home page
  const featuredServices = SERVICES.slice(0, 4);

  // Take the first 4 lookbook items
  const featuredLookbook = LOOKBOOK_ITEMS.slice(0, 4);

  const handleClaimPrivilege = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipEmail || !vipEmail.includes('@')) return;
    const code = 'JESSA-VIP-15';
    setClaimedCode(code);
    if (onVipClaimed) onVipClaimed(code);
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative w-full pt-10 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#19061f] via-[#1f0b25] to-[#28142d]">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#f2ca7a]/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#5a3e69]/25 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#37223d]/80 border border-[#f2ca7a]/25 text-[#f2ca7a] w-fit shadow-sm">
                <Sparkles className="w-4 h-4 text-[#f2ca7a]" />
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
                  The Haute Sanctuary of Beauty
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f2ca7a] font-bold tracking-tight leading-[1.12]">
                Where Artistry Meets Pure Luxury
              </h1>

              <p className="text-base sm:text-lg text-[#d1c5b3] max-w-xl leading-relaxed">
                Bespoke bridal styling, haute couture makeup, precision hair architecture, and restorative botanical skincare tailored exclusively for your regal radiance.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('book-appointment')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] shadow-[0_4px_22px_rgba(212,175,98,0.35)] hover:shadow-[0_6px_28px_rgba(212,175,98,0.5)] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#f2ca7a] hover:text-[#f8d8fc] bg-[#37223d]/60 border border-[#f2ca7a]/20 hover:bg-[#37223d] transition-all cursor-pointer"
                >
                  <Flower2 className="w-4 h-4" />
                  <span>Explore Signature Rituals</span>
                </button>
              </div>

              {/* Micro-Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#f2ca7a]/15">
                {SALON_INFO.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#28142d]/80 border border-[#f2ca7a]/15 backdrop-blur-md flex flex-col"
                  >
                    <span className="font-serif text-2xl font-bold text-[#f2ca7a]">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#d1c5b3] font-medium mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Visual Collage (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Backing decorative glow */}
                <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-[#d4af62]/20 blur-3xl pointer-events-none" />

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#f2ca7a]/25 bg-[#2c1832]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1mZI6p4yKXG9_cGwedpG6TyiKq1Z5yHj0hmv55vu0Y1c2CjupFUQ0JBPDIB0B9wTwBYe0Smw38IxM1eVjt2usrQRZKFwru7UlAZG9Y_p-Ht0CdJf8UxmOswXEeBFf75HZkxyB2bMshMSPUQ8Vzkn5xCIlMoS19djy9whhoxCw_J2Os-p5_fJetUf4GPL_TtpyGRUU2h-6jld5Fd2w3q6cezLZLiH-GTSOx-IkzJZStjE4MWRDbvBf"
                    alt="Regal haute couture model with radiant glowing skin and gold accents"
                    className="w-full h-[480px] sm:h-[520px] object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Scrim & Private Atelier Card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19061f] via-transparent to-transparent opacity-90 pointer-events-none" />

                  <div className="absolute bottom-6 left-5 right-5 p-4 rounded-xl bg-[#19061f]/85 border border-[#f2ca7a]/30 backdrop-blur-md flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full p-[1px] bg-[#f2ca7a] shrink-0">
                        <div className="w-full h-full rounded-full bg-[#19061f] flex items-center justify-center p-1">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNjUrDE1B-qFRSoR7gHQeBRitXq69e1UHSM8kcQYlgLYe0mjWafFqwyiNbEF_rJ2LUbDVM93FfvLHnYgVMWANuM_34VP7F004ATJmG1fsf-HFoTP8EOacD6vLZ2sJLI3Vx3KVlQS1YZdosPbOU2TIAiCXBAvjRoYSzC3NU2HNIz38m35NPt5UwWOYAkbdkSSrbpH2DvNLFCprR-3rQVrLCBRjP7UqlsX8MGNrpYS6gWwrOQ-34yHWdHqrcqDiohHLrRA"
                            alt="Jessa's Crest"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#f2ca7a] leading-tight">Private Atelier</h4>
                        <p className="text-xs text-[#d1c5b3]">Royal Crescent, Mayfair Suite</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#f2ca7a] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#f2ca7a]" />
                      <span>5.0 VIP</span>
                    </div>
                  </div>
                </div>

                {/* Floating Sterile Hygiene Stamp Card */}
                <div className="hidden sm:flex absolute -right-6 top-14 p-3 rounded-xl bg-[#37223d]/90 border border-[#f2ca7a]/30 backdrop-blur-lg shadow-xl items-center gap-3 max-w-[210px]">
                  <div className="p-2 rounded-full bg-[#f2ca7a]/20 text-[#f2ca7a] shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#f2ca7a]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#f2ca7a] tracking-wider">100% Sterile</p>
                    <p className="text-xs text-[#d1c5b3]">Medical-Grade Clean</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Treatment Menu Section */}
      <section className="w-full py-20 bg-[#28142d]/40 border-y border-[#f2ca7a]/10" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[#f2ca7a] text-xs font-semibold uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4 text-[#f2ca7a]" />
                <span>Artisanal Services</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f8d8fc] font-semibold">
                Curated Treatment Menu
              </h2>
              <p className="text-sm text-[#d1c5b3] mt-2 leading-relaxed">
                Each session is an intimate couture performance formulated around your personal wellness, undertones, and texture.
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#f2ca7a] hover:text-[#ffdea0] font-bold border-b border-[#f2ca7a]/40 pb-0.5 transition-colors cursor-pointer"
              >
                <span>View All 8 Treatments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col rounded-2xl overflow-hidden bg-[#2c1832] border border-[#f2ca7a]/20 shadow-lg hover:border-[#f2ca7a]/40 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onSelectService(service.id)}>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19061f] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#19061f]/85 backdrop-blur-sm text-[#f2ca7a] border border-[#f2ca7a]/30 text-[10px] font-bold uppercase tracking-wider">
                    {service.badge || service.categoryLabel}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#d1c5b3] font-medium mb-1.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#f2ca7a]" />
                        {service.duration}
                      </span>
                      <span className="text-[#f2ca7a] font-bold">FROM ${service.price}</span>
                    </div>

                    <h3
                      onClick={() => onSelectService(service.id)}
                      className="font-serif text-lg font-semibold text-[#f8d8fc] group-hover:text-[#f2ca7a] transition-colors cursor-pointer leading-snug"
                    >
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#d1c5b3] mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="flex-1 py-2 rounded-full bg-[#37223d] hover:bg-[#f2ca7a] text-[#f8d8fc] hover:text-[#402d00] text-xs font-bold transition-all text-center cursor-pointer border border-[#f2ca7a]/20"
                    >
                      Details & Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Salon Philosophy & The Jessa's Standard */}
      <section className="w-full py-20 relative overflow-hidden bg-[#1f0b25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Interior with Inset */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden bg-[#2c1832] border border-[#f2ca7a]/25 shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTeURcFD_6gfBzrtkDuZPgWLZvsr9OWtD3D4bWy2j2KrP5L_lQcH7wu4HvSnhHE_8HSZWuOWOdulxgFZjNKBK39PzVyHeTDluJFdJzXeKxj7ihEiK0w4r9By5VvkJUfA8hRHscFfzQ_ox7Mn5LAcDCqjKiWRxjdJr9ATKYcXln1oDnTaGGC4DujfSuDHQwXcWSNM8hDMdwkksXfssZiwvc-2JRXv9Ake-6LbM3wolE4ixAhk7Z2cui"
                  alt="Luxury beauty salon interior with champagne gold arched mirrors"
                  className="w-full h-[440px] sm:h-[480px] object-cover"
                />
              </div>

              {/* Overlapping Inset Bottle Photo */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-64 rounded-xl overflow-hidden bg-[#37223d] p-2 border border-[#f2ca7a]/30 shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvgKCiFG6zSIVzTO0_RtS9b17IKADOg0aC_O22NZj0mPrFTbcZh32igBwvo6MT4Tax4VsezQYW48TUD7a2PiTxL0QIoWyKC8ghR0eVkqvmnMZfC_jaYQetldq3pnXEksLhYDPIlB2Q5yB7ik25fDEhogqXrrIl54KzHgWDIIt0ygClyag2sgraZLXAIkgxMDWtxpcyh-kilBo8mJ9ioS1Ri8SVDMdQ76tRUB9o9WFAFnfXzyu1PBvD"
                  alt="Organic botanical oils and rose petals"
                  className="w-full h-36 object-cover rounded-lg"
                />
                <div className="p-2 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-[#f2ca7a] font-bold">
                    Cruelty-Free Botanical Elixirs
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 flex flex-col gap-5 lg:pl-6">
              <div className="inline-flex items-center gap-1.5 text-[#f2ca7a] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#f2ca7a]" />
                <span>The Jessa’s Standard</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#f8d8fc] font-semibold leading-tight">
                An Intimate Sanctuary Crafted for Modern Royalty
              </h2>

              <p className="text-base text-[#d1c5b3] leading-relaxed">
                Founded on the philosophy that self-care is an elevated ritual of reverence, Jessa’s Beauty Parlor fuses European master craft with holistic, restorative wellness therapies.
              </p>

              <p className="text-sm text-[#d1c5b3] leading-relaxed">
                From our hermetically sealed private VIP suites to our custom-formulated botanical masks, each guest experiences an uninterrupted haven of stillness and transformative care.
              </p>

              {/* 2 Feature Micro-Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#28142d] border border-[#f2ca7a]/20 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#f2ca7a]">
                    <ShieldCheck className="w-5 h-5 text-[#f2ca7a]" />
                    <h4 className="font-serif text-base font-semibold">VIP Private Suites</h4>
                  </div>
                  <p className="text-xs text-[#d1c5b3] leading-relaxed">
                    Exclusive acoustic sanctuary for confidential bridal, executive, and celebrity appointments.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#28142d] border border-[#f2ca7a]/20 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#f2ca7a]">
                    <Sparkles className="w-5 h-5 text-[#f2ca7a]" />
                    <h4 className="font-serif text-base font-semibold">Hospital-Grade Clean</h4>
                  </div>
                  <p className="text-xs text-[#d1c5b3] leading-relaxed">
                    Medical autoclave sterilization protocol for every precision instrument and treatment bed.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-[#f2ca7a] hover:text-[#ffdea0] text-sm font-semibold group cursor-pointer"
                >
                  <span>Read Our Full Heritage & Hygiene Standards</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pillars of Our Craft */}
      <section className="w-full py-20 bg-[#19061f] border-t border-[#f2ca7a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#f2ca7a] font-semibold">
              Distinctive Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f8d8fc] font-semibold mt-2">
              The Pillars of Our Craft
            </h2>
            <p className="text-sm text-[#d1c5b3] mt-2">
              Every second spent at Jessa’s is curated to envelop you in serene confidence and unhurried decadence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#28142d]/70 border border-[#f2ca7a]/20 flex flex-col items-start gap-3 hover:bg-[#2c1832] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f2ca7a]/15 flex items-center justify-center text-[#f2ca7a]">
                <Star className="w-6 h-6 text-[#f2ca7a]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#f8d8fc]">Celebrity-Trained Artists</h3>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                Our resident aestheticians hold Paris & London masters credentials, bringing red-carpet expertise to your tailored look.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#28142d]/70 border border-[#f2ca7a]/20 flex flex-col items-start gap-3 hover:bg-[#2c1832] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f2ca7a]/15 flex items-center justify-center text-[#f2ca7a]">
                <HeartHandshake className="w-6 h-6 text-[#f2ca7a]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#f8d8fc]">100% Cruelty-Free Luxuries</h3>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                Exclusively certified ethical pigments, plant-derived ceramides, and clean non-toxic restorative blends.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#28142d]/70 border border-[#f2ca7a]/20 flex flex-col items-start gap-3 hover:bg-[#2c1832] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f2ca7a]/15 flex items-center justify-center text-[#f2ca7a]">
                <Eye className="w-6 h-6 text-[#f2ca7a]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#f8d8fc]">Bespoke Skin Mapping</h3>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                Every visit opens with digital dermal diagnosis and personal shade matching under simulated golden hour light.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#28142d]/70 border border-[#f2ca7a]/20 flex flex-col items-start gap-3 hover:bg-[#2c1832] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f2ca7a]/15 flex items-center justify-center text-[#f2ca7a]">
                <Wine className="w-6 h-6 text-[#f2ca7a]" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#f8d8fc]">Complimentary Champagne</h3>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                Indulge in chilled Laurent-Perrier, organic artisanal infusions, and Parisian macarons during every treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Editorial Lookbook Showcase */}
      <section className="w-full py-20 bg-[#28142d]/30 border-t border-[#f2ca7a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#f2ca7a] font-semibold">
                Editorial Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f8d8fc] font-semibold mt-1">
                The Lookbook Collection
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#f2ca7a] hover:text-[#ffdea0] font-bold cursor-pointer"
            >
              <span>View Complete 2025 Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLookbook.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('gallery')}
                className="group relative h-96 rounded-2xl overflow-hidden bg-[#2c1832] border border-[#f2ca7a]/20 cursor-pointer shadow-lg hover:border-[#f2ca7a]/50 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19061f] via-[#19061f]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#f2ca7a] font-bold">
                    {item.badge || item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#f8d8fc] leading-snug group-hover:text-[#f2ca7a] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#d1c5b3] line-clamp-1">{item.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Words from Our Patrons */}
      <section className="w-full py-20 bg-[#1f0b25] border-t border-[#f2ca7a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#f2ca7a] font-semibold">
              Revered Reverie
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f8d8fc] font-semibold mt-1">
              Words from Our Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#28142d] border border-[#f2ca7a]/20 flex flex-col justify-between gap-5 shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#f2ca7a] mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f2ca7a]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#d1c5b3] italic leading-relaxed">
                    “{item.content}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[#f2ca7a]/10">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#37223d] border border-[#f2ca7a]/30 shrink-0">
                    <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#f2ca7a] leading-tight">
                      {item.author}
                    </h4>
                    <p className="text-[11px] text-[#d1c5b3]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('reviews')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#37223d] hover:bg-[#f2ca7a] hover:text-[#402d00] text-xs font-bold text-[#f2ca7a] border border-[#f2ca7a]/30 transition-all cursor-pointer"
            >
              <span>Read All Verified Patron Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Join VIP Aesthetics Circle Banner */}
      <section className="w-full py-16 bg-gradient-to-r from-[#19061f] via-[#2c1832] to-[#19061f] border-t border-[#f2ca7a]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-[#37223d]/60 border border-[#f2ca7a]/30 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="relative z-10 max-w-xl flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 text-[#f2ca7a] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#f2ca7a]" />
                <span>Exclusive Invitation</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#f2ca7a] font-bold">
                Join the VIP Aesthetics Circle
              </h2>

              <p className="text-sm text-[#d1c5b3] leading-relaxed">
                Receive 15% off your inaugural ritual, seasonal bespoke giftings, priority booking for festive galas, and private access to our after-hours aesthetician concierge.
              </p>

              {claimedCode ? (
                <div className="p-4 rounded-2xl bg-[#19061f] border border-[#f2ca7a]/40 text-[#f2ca7a] flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#f2ca7a]" />
                    <span className="text-xs">Your 15% VIP Voucher is active:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm bg-[#2c1832] px-3 py-1 rounded text-[#ffdea0] border border-[#f2ca7a]/30">
                      {claimedCode}
                    </span>
                    <button
                      onClick={() => onNavigate('book-appointment')}
                      className="px-4 py-1.5 rounded-full bg-[#f2ca7a] text-[#402d00] text-xs font-bold hover:brightness-105"
                    >
                      Book with 15% Off
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleClaimPrivilege} className="flex flex-col sm:flex-row items-center gap-2 pt-2 w-full">
                  <input
                    type="email"
                    value={vipEmail}
                    onChange={(e) => setVipEmail(e.target.value)}
                    placeholder="Enter your private email"
                    required
                    className="w-full sm:w-80 px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-full text-xs placeholder:text-[#998f7f] focus:outline-none focus:border-[#f2ca7a]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold text-xs shadow-lg hover:brightness-105 transition-all shrink-0 cursor-pointer"
                  >
                    Claim 15% Privilege
                  </button>
                </form>
              )}
            </div>

            {/* Emblem medallion */}
            <div className="relative z-10 shrink-0 flex items-center justify-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-gradient-to-tr from-[#f2ca7a] via-[#d4af62] to-[#37223d] shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#19061f] flex items-center justify-center p-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNjUrDE1B-qFRSoR7gHQeBRitXq69e1UHSM8kcQYlgLYe0mjWafFqwyiNbEF_rJ2LUbDVM93FfvLHnYgVMWANuM_34VP7F004ATJmG1fsf-HFoTP8EOacD6vLZ2sJLI3Vx3KVlQS1YZdosPbOU2TIAiCXBAvjRoYSzC3NU2HNIz38m35NPt5UwWOYAkbdkSSrbpH2DvNLFCprR-3rQVrLCBRjP7UqlsX8MGNrpYS6gWwrOQ-34yHWdHqrcqDiohHLrRA"
                    alt="Jessa's Crest VIP Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
