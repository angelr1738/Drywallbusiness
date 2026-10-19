import { useState, useEffect } from 'react';
import { Star, Quote, ThumbsUp, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/lib/supabase';
import Reveal from '@/components/Reveal';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('client_reviews').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        setReviews((data as Review[]) ?? []);
        setLoading(false);
      });
  }, []);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '5.0';

  return (
    <section id="reviews" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Testimonials</span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Real Clients.<br />Real Results.
            </h2>
          </div>
          {/* Rating summary */}
          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm self-start hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl font-black text-slate-950">{avg}</div>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-blue-500 fill-blue-500" />
                ))}
              </div>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <div className="text-slate-900 text-sm">{reviews.length}+ verified</div>
              <div className="text-slate-900 text-sm">reviews</div>
              <div className="flex items-center gap-1 mt-1 text-blue-600 text-xs font-semibold">
                <ThumbsUp className="w-3 h-3" /> 100% recommend
              </div>
            </div>
          </div>
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {reviews.map((review, i) => (
              <Reveal key={review.id} direction="up" delay={i * 60}
                className="break-inside-avoid bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all">
                <Quote className="w-8 h-8 text-blue-100 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-blue-500 fill-blue-500" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm">"{review.body}"</p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                    {review.location && <div className="text-slate-700 text-xs font-medium">{review.location}</div>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
