import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ArrowRight, Instagram, BookOpen, Check } from 'lucide-react';
import { LOOKBOOK_ITEMS, LookbookItem } from '../data/salonData';

interface GalleryPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<LookbookItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Works', count: 48 },
    { id: 'bridal', label: 'Bridal Haute Couture', count: 18 },
    { id: 'hair', label: 'Hair Coloring & Styling', count: 12 },
    { id: 'skincare', label: 'Clinical Skin Glow', count: 10 },
    { id: 'salon', label: 'Salon Interior & VIP Suites', count: 8 },
  ];

  const filteredItems = LOOKBOOK_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const dailyArtistryImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAvgKCiFG6zSIVzTO0_RtS9b17IKADOg0aC_O22NZj0mPrFTbcZh32igBwvo6MT4Tax4VsezQYW48TUD7a2PiTxL0QIoWyKC8ghR0eVkqvmnMZfC_jaYQetldq3pnXEksLhYDPIlB2Q5yB7ik25fDEhogqXrrIl54KzHgWDIIt0ygClyag2sgraZLXAIkgxMDWtxpcyh-kilBo8mJ9ioS1Ri8SVDMdQ76tRUB9o9WFAFnfXzyu1PBvD',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD3D7ehqU67r5m8aLiCfna8-NFYCKGa-ZJPE4QCq8vi1R1FKOSPUVDoZ-5Wkd9IGMAbUxS-ayMAP1PxXg7XSqKp4AciI0MVuvduEhZuXpyBiC1FW4xl3ZMt2-eViF87L_dq2qtCgjy2DXHtCZ1j2Mwx9eJO2AQ7YPLvrJ1ibbnqKEG7WtYHHdUegXdnQPTIjl0RUyEoMR_3xp6Jkkp7EQbTl3_WvJbSNZochapiOyV_k6tro0YYkK59',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBTeURcFD_6gfBzrtkDuZPgWLZvsr9OWtD3D4bWy2j2KrP5L_lQcH7wu4HvSnhHE_8HSZWuOWOdulxgFZjNKBK39PzVyHeTDluJFdJzXeKxj7ihEiK0w4r9By5VvkJUfA8hRHscFfzQ_ox7Mn5LAcDCqjKiWRxjdJr9ATKYcXln1oDnTaGGC4DujfSuDHQwXcWSNM8hDMdwkksXfssZiwvc-2JRXv9Ake-6LbM3wolE4ixAhk7Z2cui',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCZSr8ie3Zwtt7rGQrWe_kUGZ7pcp3mPOr3ULhuM3D-N7rpyZYe-CU37udb8YjYHMSZ-Zw25EKq6xhzWmz4MnN4V7dU003KEgAwKXMZSjJ4oMpeEKXn9s4x-y1xcXkmIDeCRAoCLcN2UgjwXc5Hhz7SUNC5rynLYApvtcYXzkmjSDxDomKnIl-fTbGOouvikuIRA4oJdI2Ynmzp6etgljTL9GdfG1j-A7c50cRrFtnsaUMU3tULYVWt',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBi7KRME3aib-yQZEEISF0ESj1j6TYdhpzXCE892_QlTI1BZW8FP8jvfHyNU1uPzhfQoh5ouNhWjxZaYLdhLI1XbRzNf5MlCW7jJMZ4isb5Bn_pMIdK_Y1B7yymzQ3-7SRkDef764Lc59bfMnPR8gowxO85rjPP0_4cdFMf59O529t03BcVxe8nWMa5LDMVG1z_syDVh_ckREEAL-qqHh-6tsRXQmYG2mq_sJrKfMD84fzBtnDIM1Ie',
  ];

  return (
    <div className="w-full flex flex-col pb-20">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#37223d] border border-[#f2ca7a]/30 text-[#f2ca7a] text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Esthétique Portfolio • Vol. IV Curations</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#f8d8fc] font-bold tracking-tight">
          The Beauty Lookbook
        </h1>

        <p className="text-sm text-[#d1c5b3] max-w-2xl mt-2 leading-relaxed">
          Artistry brought to life — explore our portfolio of bridal transformations, hair masterpieces, and bespoke aesthetic finishes crafted inside Mayfair’s premier sanctuary.
        </p>

        {/* Unfiltered results stats */}
        <div className="flex items-center gap-6 sm:gap-10 text-xs text-[#d1c5b3] mt-5">
          <div>
            <strong className="text-base text-[#f2ca7a] font-serif">48</strong> Showcase Looks
          </div>
          <span className="text-[#f2ca7a]">•</span>
          <div>
            <strong className="text-base text-[#f2ca7a] font-serif">100%</strong> Unfiltered Results
          </div>
          <span className="text-[#f2ca7a]">•</span>
          <div>
            <strong className="text-base text-[#f2ca7a] font-serif">9</strong> Master Artists
          </div>
        </div>
      </section>

      {/* 2. Filter Navigation Pills */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#f2ca7a] text-[#402d00] font-bold shadow-[0_2px_12px_rgba(212,175,98,0.3)]'
                    : 'bg-[#28142d]/80 text-[#d1c5b3] hover:text-[#f2ca7a] hover:bg-[#37223d] border border-[#f2ca7a]/15'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 text-[10px] opacity-80">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Lookbook Bento Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isFeatured = item.isCover || idx === 0;
            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden bg-[#2c1832] border border-[#f2ca7a]/20 shadow-xl hover:border-[#f2ca7a]/50 transition-all duration-300 flex flex-col justify-end ${
                  isFeatured ? 'md:col-span-2 h-[440px]' : 'h-[380px]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19061f] via-[#19061f]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Corner Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#19061f]/85 backdrop-blur-md text-[#f2ca7a] border border-[#f2ca7a]/30 text-[10px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-[#37223d]/80 backdrop-blur-md text-[#d1c5b3] text-[10px] uppercase">
                    {item.categoryLabel}
                  </span>
                </div>

                <button
                  onClick={() => setActiveModalItem(item)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#19061f]/70 text-[#f2ca7a] hover:bg-[#37223d] transition-colors cursor-pointer"
                  title="View Details & Formula"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Bottom Content Area */}
                <div className="relative p-6 flex flex-col gap-2 z-10">
                  <span className="text-xs text-[#f2ca7a] font-medium">{item.artist}</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f8d8fc] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#d1c5b3] line-clamp-2 leading-relaxed">
                    {item.formulaNotes}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#f2ca7a]/15">
                    <span className="text-xs font-bold text-[#f2ca7a]">
                      {item.investment || item.duration || 'Bespoke Protocol'}
                    </span>
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#f8d8fc] hover:text-[#f2ca7a] font-semibold transition-colors cursor-pointer"
                    >
                      <span>View Recipe & Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Consultation Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl p-6 sm:p-8 bg-[#28142d] border border-[#f2ca7a]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#37223d] text-[#f2ca7a] shrink-0 border border-[#f2ca7a]/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#f8d8fc]">
                Seeking a Custom Inspiration Consultation?
              </h3>
              <p className="text-xs text-[#d1c5b3]">
                Bring your Pinterest board or bridal lookbook to your complimentary stylist preview.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('book-appointment')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold text-xs shadow-md hover:brightness-105 shrink-0 cursor-pointer"
          >
            Book Consultation
          </button>
        </div>
      </section>

      {/* 5. Live Daily Artistry Instagram Showcase */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#f2ca7a]/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#f2ca7a]">
              Live From Mayfair Suite
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f8d8fc] font-semibold mt-1">
              Follow Our Daily Artistry
            </h2>
            <p className="text-xs text-[#d1c5b3] mt-1">
              Real appointments, genuine guest smiles, behind-the-scenes transformations.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2c1832] border border-[#f2ca7a]/30 text-[#f2ca7a] text-xs font-semibold hover:bg-[#37223d]"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@jessasbeautyparlor</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {dailyArtistryImages.map((img, i) => (
            <div key={i} className="relative h-44 rounded-xl overflow-hidden bg-[#2c1832] group border border-[#f2ca7a]/15 shadow-md">
              <img src={img} alt="Daily salon highlight" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#19061f]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="w-6 h-6 text-[#f2ca7a]" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-[#d1c5b3] mt-6">
          Tag your appointments with <strong className="text-[#f2ca7a]">#JessasBeautyParlor</strong> or <strong className="text-[#f2ca7a]">#JessasGlow</strong> to be featured in our seasonal client spotlight.
        </p>
      </section>

      {/* 6. Formula & Notes Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19061f]/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#2c1832] border border-[#f2ca7a]/40 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 text-[#d1c5b3] hover:text-[#f2ca7a]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#f2ca7a] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{activeModalItem.categoryLabel}</span>
            </div>

            <div className="h-64 rounded-xl overflow-hidden border border-[#f2ca7a]/20">
              <img src={activeModalItem.image} alt={activeModalItem.title} className="w-full h-full object-cover" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#f8d8fc]">
              {activeModalItem.title}
            </h3>

            <div className="flex items-center justify-between text-xs text-[#d1c5b3] border-b border-[#f2ca7a]/15 pb-2">
              <span>{activeModalItem.artist}</span>
              <span className="text-[#f2ca7a] font-bold">{activeModalItem.investment || activeModalItem.duration}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase font-bold text-[#f2ca7a] tracking-wider block">
                Artisan Formula & Execution Notes:
              </span>
              <p className="text-xs text-[#d1c5b3] leading-relaxed">
                {activeModalItem.formulaNotes}
              </p>
            </div>

            {activeModalItem.productsUsed && (
              <div className="space-y-1.5 pt-2">
                <span className="text-xs uppercase font-bold text-[#f2ca7a] tracking-wider block">
                  Curated Formularies Used:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalItem.productsUsed.map((prod, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-[#37223d] text-[#f8d8fc] border border-[#f2ca7a]/20">
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 flex justify-end gap-3 border-t border-[#f2ca7a]/15">
              <button
                onClick={() => {
                  onNavigate('book-appointment');
                  setActiveModalItem(null);
                }}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#f2ca7a] text-[#402d00] hover:brightness-105"
              >
                Inquire & Book Similar Ritual
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
