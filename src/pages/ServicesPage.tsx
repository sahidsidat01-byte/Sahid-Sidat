import React, { useState, useMemo } from 'react';
import { Search, Clock, DollarSign, Sparkles, Info, X, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';
import { SERVICES, Service } from '../data/salonData';

interface ServicesPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectService: (serviceId: string) => void;
  onBookService: (service: Service) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectService,
  onBookService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const categories = [
    { id: 'all', label: 'All Rituals' },
    { id: 'bridal', label: 'Bridal & Occasion' },
    { id: 'hair', label: 'Hair Couture & Color' },
    { id: 'skincare', label: 'Aesthetic Skincare & Peels' },
    { id: 'nails', label: 'Nails & Hand Spa' },
    { id: 'lash-brow', label: 'Lash & Brow Bar' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Category
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(query);
        const matchesDesc = service.shortDesc.toLowerCase().includes(query);
        const matchesTags = service.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }
      // Price
      if (priceFilter === 'under100' && service.price >= 100) return false;
      if (priceFilter === '100-250' && (service.price < 100 || service.price > 250)) return false;
      if (priceFilter === 'over250' && service.price <= 250) return false;

      // Duration
      if (durationFilter === 'quick' && service.durationMins > 60) return false;
      if (durationFilter === 'medium' && (service.durationMins <= 60 || service.durationMins > 120)) return false;
      if (durationFilter === 'extended' && service.durationMins <= 120) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, priceFilter, durationFilter]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceFilter('all');
    setDurationFilter('all');
  };

  return (
    <div className="w-full flex flex-col pb-20">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#37223d] border border-[#f2ca7a]/30 text-[#f2ca7a] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Sanctuary & Aesthetics</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#f8d8fc] font-bold tracking-tight">
              Our Signature <span className="italic font-normal text-[#f2ca7a]">Treatments</span> & Rituals
            </h1>
            <p className="text-sm sm:text-base text-[#d1c5b3] max-w-2xl leading-relaxed">
              Indulge in tailor-made beauty experiences designed by our master artisans. Each restorative ritual unites botanical science with timeless regal indulgence.
            </p>
          </div>

          {/* Curated Stats Card */}
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#28142d]/80 border border-[#f2ca7a]/20 backdrop-blur-md shadow-lg self-start lg:self-auto">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#f2ca7a]">98%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#d1c5b3] mt-0.5">
                Client Retention
              </span>
            </div>
            <div className="h-8 w-px bg-[#432d48]" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#f2ca7a]">24+</span>
              <span className="text-[10px] uppercase tracking-wider text-[#d1c5b3] mt-0.5">
                Luxury Protocols
              </span>
            </div>
            <div className="h-8 w-px bg-[#432d48]" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#f2ca7a]">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#d1c5b3] mt-0.5">
                Organic Botanical
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Command Panel */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-10">
        <div className="p-5 rounded-2xl bg-[#2c1832]/70 border border-[#f2ca7a]/20 backdrop-blur-xl shadow-xl flex flex-col gap-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold shadow-[0_2px_12px_rgba(212,175,98,0.3)]'
                      : 'text-[#d1c5b3] hover:text-[#f2ca7a] hover:bg-[#37223d]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar & Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
            {/* Search */}
            <div className="md:col-span-6 relative flex items-center">
              <Search className="w-4 h-4 absolute left-4 text-[#d1c5b3] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments, formulas, or specialists..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#19061f]/85 border border-[#f2ca7a]/20 text-[#f8d8fc] rounded-full text-xs placeholder:text-[#998f7f] focus:outline-none focus:border-[#f2ca7a]"
              />
            </div>

            {/* Price Filter */}
            <div className="md:col-span-3 relative flex items-center">
              <DollarSign className="w-4 h-4 absolute left-4 text-[#f2ca7a] pointer-events-none" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full pl-11 pr-8 py-2.5 bg-[#19061f]/85 border border-[#f2ca7a]/20 text-[#f8d8fc] rounded-full text-xs focus:outline-none focus:border-[#f2ca7a] cursor-pointer appearance-none"
              >
                <option value="all">Any Price Range</option>
                <option value="under100">Under $100</option>
                <option value="100-250">$100 – $250</option>
                <option value="over250">$250 and above</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div className="md:col-span-3 relative flex items-center">
              <Clock className="w-4 h-4 absolute left-4 text-[#f2ca7a] pointer-events-none" />
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full pl-11 pr-8 py-2.5 bg-[#19061f]/85 border border-[#f2ca7a]/20 text-[#f8d8fc] rounded-full text-xs focus:outline-none focus:border-[#f2ca7a] cursor-pointer appearance-none"
              >
                <option value="all">Any Duration</option>
                <option value="quick">Express (≤ 60 min)</option>
                <option value="medium">Standard (61 – 120 min)</option>
                <option value="extended">Immersive (120+ min)</option>
              </select>
            </div>
          </div>

          {/* Status Row */}
          <div className="flex items-center justify-between text-xs text-[#d1c5b3] px-1 pt-1 border-t border-[#f2ca7a]/10">
            <span>
              Showing <strong className="text-[#f2ca7a]">{filteredServices.length}</strong> curated treatments
            </span>
            {(selectedCategory !== 'all' || searchQuery || priceFilter !== 'all' || durationFilter !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-[#f2ca7a] hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Catalog Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16">
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#28142d]/50 border border-[#f2ca7a]/20 flex flex-col items-center justify-center gap-3">
            <ShieldAlert className="w-12 h-12 text-[#f2ca7a]" />
            <h3 className="font-serif text-xl font-semibold text-[#f8d8fc]">No matching rituals found</h3>
            <p className="text-xs text-[#d1c5b3] max-w-md">
              Adjust your selected filter pills or search terms to uncover other bespoke treatments in our salon suite.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-6 py-2 rounded-full bg-[#f2ca7a] text-[#402d00] text-xs font-bold hover:brightness-105"
            >
              View All Rituals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="group rounded-2xl bg-[#2c1832]/70 border border-[#f2ca7a]/20 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#f2ca7a]/50 hover:shadow-2xl"
              >
                <div>
                  <div
                    className="relative w-full h-56 overflow-hidden cursor-pointer"
                    onClick={() => onSelectService(service.id)}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#19061f] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#19061f]/90 backdrop-blur-md text-[#f2ca7a] border border-[#f2ca7a]/30 text-[10px] font-bold uppercase tracking-wider shadow-md">
                        {service.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="px-3 py-1 rounded-full bg-[#37223d]/90 text-[#f8d8fc] text-[11px] font-semibold flex items-center gap-1 border border-[#f2ca7a]/20">
                        <Clock className="w-3.5 h-3.5 text-[#f2ca7a]" />
                        <span>{service.duration}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-3">
                    <h3
                      onClick={() => onSelectService(service.id)}
                      className="font-serif text-lg font-semibold text-[#f8d8fc] group-hover:text-[#f2ca7a] transition-colors leading-snug cursor-pointer"
                    >
                      {service.name}
                    </h3>

                    <p className="text-xs text-[#d1c5b3] line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#37223d] text-[#d1c5b3] border border-[#f2ca7a]/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-[#f2ca7a]/10 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-[#d1c5b3]">
                      Ritual Investment
                    </span>
                    <span className="font-serif text-lg font-bold text-[#f2ca7a]">
                      ${service.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="p-2 rounded-full text-[#d1c5b3] hover:text-[#f2ca7a] hover:bg-[#37223d] transition-colors cursor-pointer"
                      title="Service Protocol Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onBookService(service)}
                      className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#f2ca7a] hover:bg-[#ffdea0] text-[#402d00] transition-all shadow-[0_2px_12px_rgba(212,175,98,0.25)] cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Consultation CTA Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#2c1832] via-[#37223d] to-[#2c1832] border border-[#f2ca7a]/30 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#f2ca7a] font-bold">
                Complimentary Skin & Hair Diagnostic
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#f8d8fc] font-semibold">
                Unsure which treatment fits your skin?
              </h2>
              <p className="text-xs sm:text-sm text-[#d1c5b3] leading-relaxed">
                Schedule a 15-minute one-on-one virtual consultation with our Senior Aesthetician. We evaluate your skin barrier, hair texture, and event milestones to formulate your personal indulgence roadmap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto text-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold text-xs shadow-lg hover:brightness-105 transition-all cursor-pointer"
              >
                Book Virtual Consultation
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto text-center px-5 py-2.5 rounded-full bg-[#37223d] text-[#f8d8fc] hover:bg-[#432d48] border border-[#f2ca7a]/25 text-xs font-semibold transition-all cursor-pointer"
              >
                Meet Master Artisans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Detailed Service Protocol Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19061f]/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#2c1832] border border-[#f2ca7a]/40 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 text-[#d1c5b3] hover:text-[#f2ca7a]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#f2ca7a] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Artisanal Treatment Protocol</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#f8d8fc]">
              {activeModalService.name}
            </h3>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#37223d] text-[#d1c5b3] border border-[#f2ca7a]/20">
                {activeModalService.duration}
              </span>
              <span className="font-serif text-lg font-bold text-[#f2ca7a]">
                ${activeModalService.price}
              </span>
              <span className="text-[#d1c5b3]">★ {activeModalService.rating} ({activeModalService.reviewsCount} reviews)</span>
            </div>

            <p className="text-xs sm:text-sm text-[#d1c5b3] leading-relaxed">
              {activeModalService.fullDesc}
            </p>

            {activeModalService.inclusions && (
              <div className="space-y-1.5 pt-2 border-t border-[#f2ca7a]/15">
                <span className="text-[11px] uppercase font-bold text-[#f2ca7a] tracking-wider block">
                  Suite Inclusions:
                </span>
                <ul className="text-xs text-[#d1c5b3] space-y-1">
                  {activeModalService.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#f2ca7a] mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  onSelectService(activeModalService.id);
                  setActiveModalService(null);
                }}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#f2ca7a] hover:bg-[#37223d] border border-[#f2ca7a]/30"
              >
                In-Depth Experience Page
              </button>
              <button
                onClick={() => {
                  onBookService(activeModalService);
                  setActiveModalService(null);
                }}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#f2ca7a] text-[#402d00] hover:brightness-105 shadow-md"
              >
                Proceed to Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
