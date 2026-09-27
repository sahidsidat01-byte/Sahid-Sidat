import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Mail, ChevronDown, Check, Sparkles } from 'lucide-react';
import { SALON_INFO, SERVICES } from '../data/salonData';
import { BackendService } from '../lib/backendService';

interface ContactPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES[0].name);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How far in advance should I reserve bridal and royal event styling?',
      a: 'For our Royal Bridal Glamour Suite and private suite buyouts, we recommend reserving 3 to 9 months in advance to secure prime bridal season dates and allow ample time for your 90-minute trial session.'
    },
    {
      q: 'What is included in the private suite Laurent-Perrier champagne service?',
      a: 'Every appointment over 60 minutes includes complimentary chilled Laurent-Perrier Brut or Rosé Champagne, organic Parisian macarons from Ladurée, and custom herbal infusions formulated with rosebud and lavender.'
    },
    {
      q: 'Do you offer on-location or destination bridal styling?',
      a: 'Yes. Our Master Artisans travel internationally for destination galas and weddings. Please indicate your destination in the concierge inquiry form for our bespoke dispatch rates.'
    },
    {
      q: 'What are your hygiene and allergy testing standards?',
      a: 'We perform medical autoclave sterilization on all surgical tools in accordance with UK health directives. Patch tests for lash adhesives and hair colors are provided 48 hours prior free of charge.'
    },
    {
      q: 'Is valet parking available at Royal Crescent Mayfair?',
      a: 'Complimentary private valet parking is provided for all clients booking sessions of $150 or more. Our concierge will receive your vehicle upon arrival at our 482 Royal Crescent entrance.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    try {
      await BackendService.createInquiry({
        name,
        email,
        phone,
        serviceName: selectedService,
        preferredDate: date,
        message,
      });
    } catch (err) {
      console.warn('Inquiry submit fallback:', err);
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col pb-20">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#37223d] border border-[#f2ca7a]/30 text-[#f2ca7a] text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mayfair Concierge & Atelier</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#f8d8fc] font-bold tracking-tight">
          Connect with Our Concierge
        </h1>

        <p className="text-xs sm:text-sm text-[#d1c5b3] max-w-2xl mt-2 leading-relaxed">
          Whether inquiring about royal bridal packages, bespoke appointments, or private suite buyouts, our senior concierge desk is at your service.
        </p>
      </section>

      {/* 2. Contact Details & Inquiry Form (2 Cols) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Salon Details & Map Representation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#28142d] border border-[#f2ca7a]/25 space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-[#f2ca7a]">
                Mayfair Flagship Sanctuary
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#d1c5b3]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#f2ca7a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f8d8fc] block font-semibold">Address</strong>
                    <p className="leading-relaxed">
                      482 Royal Crescent, Suite 100<br />
                      Mayfair, London W1K 7AA
                    </p>
                    <span className="text-[11px] text-[#f2ca7a] mt-0.5 block">Complimentary Valet at Main Portico</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#f2ca7a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f8d8fc] block font-semibold">Opening Hours</strong>
                    <p>Tuesday – Saturday: 9:00 AM – 7:30 PM</p>
                    <p>Sunday: 10:00 AM – 5:00 PM</p>
                    <p className="text-[#998f7f]">Monday: Closed (Private Buyouts)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#f2ca7a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f8d8fc] block font-semibold">Telephone Concierge</strong>
                    <a href={`tel:${SALON_INFO.phone}`} className="hover:text-[#f2ca7a] transition-colors">
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#f2ca7a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f8d8fc] block font-semibold">Instant VIP WhatsApp</strong>
                    <a
                      href="https://wa.me/447700900321"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#f2ca7a] hover:underline"
                    >
                      {SALON_INFO.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#f2ca7a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f8d8fc] block font-semibold">Direct Email</strong>
                    <a href={`mailto:${SALON_INFO.email}`} className="hover:text-[#f2ca7a] transition-colors">
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Visual Map Card */}
            <div className="rounded-2xl overflow-hidden bg-[#2c1832] border border-[#f2ca7a]/20 p-5 space-y-3 relative shadow-lg">
              <div className="h-44 rounded-xl overflow-hidden relative bg-[#19061f] border border-[#f2ca7a]/15 flex items-center justify-center">
                {/* Visual architectural rendering */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#19061f] via-[#28142d] to-[#37223d] opacity-90" />
                <div className="relative z-10 text-center space-y-1">
                  <MapPin className="w-8 h-8 text-[#f2ca7a] mx-auto animate-pulse" />
                  <span className="font-serif text-sm font-bold text-[#f8d8fc] block">Royal Crescent, Mayfair</span>
                  <span className="text-[10px] text-[#d1c5b3] block">Minutes from Bond Street & Hyde Park</span>
                </div>
              </div>
              <p className="text-[11px] text-[#d1c5b3] text-center">
                Need bespoke transport arrangement? Our concierge can organize chauffeured transfer directly to your appointment.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Concierge Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#28142d] border border-[#f2ca7a]/25 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-[#f8d8fc] mb-2">
              Send Concierge Inquiry
            </h3>
            <p className="text-xs text-[#d1c5b3] mb-6">
              Our Senior Concierge responds within 2 hours during sanctuary hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#19061f] border border-[#f2ca7a]/40 text-center flex flex-col items-center gap-3">
                <Check className="w-12 h-12 text-[#f2ca7a] p-2 rounded-full bg-[#37223d]" />
                <h4 className="font-serif text-2xl font-bold text-[#f2ca7a]">Inquiry Dispatched</h4>
                <p className="text-xs text-[#d1c5b3] max-w-md leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our senior concierge has received your request regarding <strong>{selectedService}</strong> and will connect via phone or WhatsApp shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-[#f2ca7a] underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lady Genevieve Sterling"
                      required
                      className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                      Contact Telephone / Mobile *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7700 900000"
                      required
                      className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@mayfair.com"
                      required
                      className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                      Preferred Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                    Ritual of Interest
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a] cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} (${s.price} • {s.duration})
                      </option>
                    ))}
                    <option value="Custom Bridal Package">Custom Bridal Party Suite Package</option>
                    <option value="Private Salon Buyout">Private Salon Suite Buyout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                    Bespoke Requests & Dietary/Allergy Notes
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your wedding date, dress style, champagne preference, or sensory notes..."
                    className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold text-xs tracking-wider shadow-lg hover:brightness-105 transition-all cursor-pointer"
                  >
                    Transmit Inquiry to Concierge
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions Accordion */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold text-[#f2ca7a] tracking-widest">
            Patron Inquiries
          </span>
          <h2 className="font-serif text-3xl text-[#f8d8fc] font-semibold mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#28142d] border border-[#f2ca7a]/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#37223d]/50"
                >
                  <span className="font-serif text-base font-semibold text-[#f8d8fc]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#f2ca7a] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#d1c5b3] leading-relaxed border-t border-[#f2ca7a]/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
