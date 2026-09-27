import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Award, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { STYLISTS, Stylist } from '../data/salonData';

interface AboutPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectStylist: (stylist: Stylist) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onSelectStylist }) => {
  return (
    <div className="w-full flex flex-col pb-20">
      {/* 1. Hero Header */}
      <section className="relative w-full pt-12 pb-16 bg-gradient-to-b from-[#19061f] via-[#1f0b25] to-[#28142d] border-b border-[#f2ca7a]/15 overflow-hidden">
        <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-[#f2ca7a]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#37223d] border border-[#f2ca7a]/30 text-[#f2ca7a] text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Salon Heritage & Philosophy</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#f8d8fc] font-bold tracking-tight max-w-3xl">
            Where Modern Royalty Discovers <span className="italic font-normal text-[#f2ca7a]">Unhurried Decadence</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c5b3] max-w-2xl mt-4 leading-relaxed">
            Nestled inside Mayfair’s storied Royal Crescent, Jessa’s Beauty Parlor was conceived not merely as a salon, but as a regal retreat where haute artistry meets medical-grade precision.
          </p>
        </div>
      </section>

      {/* 2. The Founder's Story */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden bg-[#2c1832] border border-[#f2ca7a]/30 shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwZOVp3I9ad-ptidb6VS4ifRcljLYx-pl4w3ZEPj0rGRmGrQW8adg1Sbcbhjc6q10WnclH0BhHC4jxqRF0s1Ke0y1mJ0ziUhBQVMViuDjZMA934SDdJJhqC7JbyrZmnqXiAUkKTbo_Uedaq1mzP11bvRqgo0TIxEDN970y5HkufauCmfFyNZfJ-6iSrYO7UU8icamEBcVxUOztOHc7ssI5TH9YTuBg4CqLZ2ewYCsDGAR_oUC0cUQY"
                alt="Jessa Vance founder portrait"
                className="w-full h-[460px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-[#19061f]/95 border border-[#f2ca7a]/30 shadow-2xl max-w-xs hidden sm:block">
              <span className="font-serif text-base font-bold text-[#f2ca7a] block">Jessa Vance</span>
              <span className="text-[11px] text-[#d1c5b3] block">Founder, Paris Haute Couture Master</span>
              <span className="text-[10px] text-[#998f7f] mt-1 block">“Beauty is a sacred state of stillness.”</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-xs uppercase font-bold text-[#f2ca7a] tracking-widest">
              The Founder’s Journey
            </span>
            <h2 className="font-serif text-3xl text-[#f8d8fc] font-semibold leading-tight">
              Bridging Paris Couture Artistry with Mayfair Tranquility
            </h2>
            <p className="text-sm text-[#d1c5b3] leading-relaxed">
              After a decade styling for Parisian haute couture fashion houses, film festivals, and international royal nuptials, Jessa recognized that traditional salons were overly frenzied, hurried, and sensorially chaotic.
            </p>
            <p className="text-sm text-[#d1c5b3] leading-relaxed">
              In 2018, she established our flagship Royal Crescent suite with an uncompromising manifesto: only one guest per master artisan at any time, zero harsh toxic chemical odors, acoustic isolation, and clinical hospital-grade hygiene behind velvet-curtained intimacy.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#28142d] border border-[#f2ca7a]/20">
                <span className="font-serif text-xl font-bold text-[#f2ca7a]">14+ Years</span>
                <p className="text-[11px] text-[#d1c5b3] mt-0.5">Master Artistry Tenure</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#28142d] border border-[#f2ca7a]/20">
                <span className="font-serif text-xl font-bold text-[#f2ca7a]">2,400+</span>
                <p className="text-[11px] text-[#d1c5b3] mt-0.5">Bridal Parties Styled</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Meet the Master Artisans */}
      <section className="w-full py-16 bg-[#28142d]/40 border-t border-[#f2ca7a]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-[#f2ca7a] tracking-widest">
              World-Class Pedigree
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f8d8fc] font-semibold mt-1">
              Meet Our Resident Master Artisans
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c5b3] mt-2">
              Every aesthetician and color architect at Jessa’s brings at least 8 years of premier salon or clinical dermatology background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STYLISTS.map((stylist) => (
              <div
                key={stylist.id}
                className="bg-[#2c1832] border border-[#f2ca7a]/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#f2ca7a]/40 transition-all"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#19061f] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-[#19061f]/90 text-[#f2ca7a] text-[10px] font-bold border border-[#f2ca7a]/30">
                      {stylist.experience}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-2.5">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#f8d8fc]">{stylist.name}</h3>
                      <p className="text-xs text-[#f2ca7a] font-medium">{stylist.role}</p>
                    </div>

                    <p className="text-xs text-[#d1c5b3] leading-relaxed line-clamp-3">{stylist.bio}</p>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold text-[#d1c5b3] tracking-wider block mb-1">
                        Credentials & Specialties:
                      </span>
                      <p className="text-[11px] text-[#998f7f] italic mb-2">{stylist.credentials}</p>
                      <div className="flex flex-wrap gap-1">
                        {stylist.specialties.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#37223d] text-[#f8d8fc] border border-[#f2ca7a]/15"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-2 border-t border-[#f2ca7a]/10">
                  <button
                    onClick={() => {
                      onSelectStylist(stylist);
                      onNavigate('book-appointment');
                    }}
                    className="w-full py-2 rounded-full text-xs font-bold bg-[#37223d] hover:bg-[#f2ca7a] text-[#f8d8fc] hover:text-[#402d00] transition-all cursor-pointer border border-[#f2ca7a]/25 text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Request Booking with {stylist.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Standards & Hygiene Certification */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#28142d] border border-[#f2ca7a]/25 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-[#f2ca7a] tracking-widest">
              Sanctuary Standards
            </span>
            <h2 className="font-serif text-3xl text-[#f8d8fc] font-semibold">
              The Jessa Diamond Medical-Clean Protocol
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c5b3]">
              We adhere to operating-room sterilization levels to ensure your peace of mind is absolute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#37223d]/60 border border-[#f2ca7a]/20 flex flex-col gap-2">
              <ShieldCheck className="w-7 h-7 text-[#f2ca7a]" />
              <h4 className="font-serif text-base font-semibold text-[#f8d8fc]">Medical Autoclave Sterilization</h4>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                All precision stainless-steel cuticle pushers, diamond bits, and shears undergo high-pressure steam autoclave sterilization sealed in single-use surgical envelopes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#37223d]/60 border border-[#f2ca7a]/20 flex flex-col gap-2">
              <Sparkles className="w-7 h-7 text-[#f2ca7a]" />
              <h4 className="font-serif text-base font-semibold text-[#f8d8fc]">HEPA H13 Air Filtration</h4>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                Continuous medical-grade air exchange completely removes micro-aerosols, nail dust, and chemical vapors every 7 minutes for pure breathing clarity.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#37223d]/60 border border-[#f2ca7a]/20 flex flex-col gap-2">
              <HeartHandshake className="w-7 h-7 text-[#f2ca7a]" />
              <h4 className="font-serif text-base font-semibold text-[#f8d8fc]">100% Vegan & Ethical Formularies</h4>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                No formaldehydes, parabens, phthalates, or animal-tested compounds. We partner exclusively with certified cruelty-free European cosmetic laboratories.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('book-appointment')}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold text-xs shadow-lg hover:brightness-105 transition-all cursor-pointer"
            >
              Experience the Sanctuary — Reserve Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
