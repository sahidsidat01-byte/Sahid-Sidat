import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Sparkles, Plus, MessageSquare, Check, X } from 'lucide-react';
import { TESTIMONIALS, Review, SERVICES } from '../data/salonData';
import { BackendService } from '../lib/backendService';

interface ReviewsPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(TESTIMONIALS);
  const [filterRating, setFilterRating] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Verified Guest');
  const [newRating, setNewRating] = useState(5);
  const [newService, setNewService] = useState(SERVICES[0].name);
  const [newContent, setNewContent] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    BackendService.getReviews().then((list) => {
      if (list && list.length > 0) setReviewsList(list);
    });
  }, []);

  const filteredReviews = reviewsList.filter((rev) => {
    if (filterRating === 'all') return true;
    return rev.rating === parseInt(filterRating, 10);
  });

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) return;

    try {
      const added = await BackendService.createReview({
        author: newAuthor,
        role: `${newRole} • Verified`,
        rating: newRating,
        service: newService,
        content: newContent,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi7KRME3aib-yQZEEISF0ESj1j6TYdhpzXCE892_QlTI1BZW8FP8jvfHyNU1uPzhfQoh5ouNhWjxZaYLdhLI1XbRzNf5MlCW7jJMZ4isb5Bn_pMIdK_Y1B7yymzQ3-7SRkDef764Lc59bfMnPR8gowxO85rjPP0_4cdFMf59O529t03BcVxe8nWMa5LDMVG1z_syDVh_ckREEAL-qqHh-6tsRXQmYG2mq_sJrKfMD84fzBtnDIM1Ie',
        verified: true,
      });

      setReviewsList([added, ...reviewsList]);
    } catch (e) {
      console.warn('Review save fallback:', e);
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setNewAuthor('');
      setNewContent('');
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col pb-20">
      {/* 1. Header & Scorecard */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-8 sm:p-12 rounded-3xl bg-[#28142d] border border-[#f2ca7a]/25 shadow-2xl">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#37223d] border border-[#f2ca7a]/30 text-[#f2ca7a] text-xs font-semibold tracking-widest uppercase w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Patron Reverie</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-[#f8d8fc] font-bold">
              Guest Testimonials
            </h1>

            <p className="text-xs sm:text-sm text-[#d1c5b3] leading-relaxed">
              Read uncensored feedback from brides, executives, and international patrons who trust Jessa’s Beauty Parlor for their crowning milestones.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f2ca7a] text-[#402d00] font-bold text-xs shadow-md hover:brightness-105 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Share Your Experience</span>
              </button>
            </div>
          </div>

          {/* Rating Scorecard Box */}
          <div className="p-6 rounded-2xl bg-[#19061f]/85 border border-[#f2ca7a]/30 flex flex-col sm:flex-row items-center gap-6 shrink-0 shadow-xl">
            <div className="text-center flex flex-col items-center">
              <span className="font-serif text-5xl font-bold text-[#f2ca7a]">4.98</span>
              <div className="flex items-center gap-1 text-[#f2ca7a] my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f2ca7a]" />
                ))}
              </div>
              <span className="text-xs text-[#d1c5b3]">Across 480+ Verified Rituals</span>
            </div>

            <div className="h-20 w-px bg-[#432d48] hidden sm:block" />

            <div className="w-full sm:w-48 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-10 text-[11px] text-[#d1c5b3]">5 Star</span>
                <div className="flex-1 h-2 rounded-full bg-[#2c1832] overflow-hidden">
                  <div className="h-full bg-[#f2ca7a] w-[98%]" />
                </div>
                <span className="text-[10px] text-[#f2ca7a]">98%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10 text-[11px] text-[#d1c5b3]">4 Star</span>
                <div className="flex-1 h-2 rounded-full bg-[#2c1832] overflow-hidden">
                  <div className="h-full bg-[#f2ca7a] w-[2%]" />
                </div>
                <span className="text-[10px] text-[#f2ca7a]">2%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10 text-[11px] text-[#d1c5b3]">3 Star</span>
                <div className="flex-1 h-2 rounded-full bg-[#2c1832] overflow-hidden">
                  <div className="h-full bg-[#f2ca7a] w-[0%]" />
                </div>
                <span className="text-[10px] text-[#998f7f]">0%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Reviews Filter and Cards Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#f2ca7a]/15">
          <span className="text-xs text-[#d1c5b3]">
            Showing <strong className="text-[#f2ca7a]">{filteredReviews.length}</strong> verified guest reviews
          </span>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#d1c5b3] hidden sm:inline">Filter by Rating:</span>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-[#28142d] border border-[#f2ca7a]/25 text-[#f8d8fc] rounded-full px-3 py-1.5 text-xs focus:outline-none focus:border-[#f2ca7a] cursor-pointer"
            >
              <option value="all">All Stars (5★ & 4★)</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#2c1832] border border-[#f2ca7a]/20 flex flex-col justify-between gap-5 shadow-lg hover:border-[#f2ca7a]/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#f2ca7a]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f2ca7a]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#998f7f]">{rev.date}</span>
                </div>

                <div className="inline-block text-[11px] font-semibold text-[#f2ca7a] bg-[#37223d] px-2.5 py-0.5 rounded-full border border-[#f2ca7a]/20">
                  {rev.service}
                </div>

                <p className="text-xs sm:text-sm text-[#d1c5b3] italic leading-relaxed">
                  “{rev.content}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#f2ca7a]/15">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#28142d] border border-[#f2ca7a]/30 shrink-0">
                  <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#f8d8fc]">{rev.author}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-[#f2ca7a]">
                    <ShieldCheck className="w-3 h-3 text-[#f2ca7a]" />
                    <span>{rev.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Submit Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19061f]/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#2c1832] border border-[#f2ca7a]/40 p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-[#d1c5b3] hover:text-[#f2ca7a] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#f8d8fc]">
              Share Your Sanctuary Experience
            </h3>

            {submittedSuccess ? (
              <div className="p-8 text-center flex flex-col items-center gap-3 text-[#f2ca7a]">
                <Check className="w-10 h-10 text-[#f2ca7a] animate-bounce" />
                <h4 className="font-serif text-xl font-bold">Thank You!</h4>
                <p className="text-xs text-[#d1c5b3]">Your review has been verified and added to our guest reverie.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                    Your Name / Title
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Lady Katherine Holmes"
                    required
                    className="w-full px-3.5 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                      Rating (Stars)
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
                      className="w-full px-3.5 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    >
                      <option value={5}>5 Stars - Pure Perfection</option>
                      <option value={4}>4 Stars - Exceptional</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                      Ritual Experienced
                    </label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                    Your Feedback & Reverie
                  </label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Describe your session, the aesthetician care, and longevity of the result..."
                    required
                    className="w-full px-3.5 py-2 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-[#d1c5b3] hover:text-[#f8d8fc]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-[#f2ca7a] text-[#402d00] font-bold text-xs hover:brightness-105"
                  >
                    Submit Verified Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
