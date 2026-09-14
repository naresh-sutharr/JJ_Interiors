import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();

  const publishedTestimonials = testimonials.filter((t) => t.published);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#faf8f5] border-b border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
            Client Experiences
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight">
            Trusted by Homeowners Across Surat
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Genuine feedback from families and business leaders who trusted us with their private spaces.
          </p>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-6" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#e8dfd5] p-8 shadow-sm hover:border-[#c5a059] transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#ebd5b3] absolute top-6 right-6 -z-0 opacity-50" />
              
              <div className="relative z-10">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>

                <p className="text-stone-700 text-sm sm:text-base font-light italic leading-relaxed mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-5 border-t border-[#f0eae1]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-lg text-[#1e1b18] font-normal">
                      {t.clientName}
                    </h4>
                    <p className="text-[12px] text-stone-500 font-medium">
                      {t.project}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 bg-[#faf8f5] px-2 py-1 border border-[#e8dfd5]">
                    <MapPin className="w-3 h-3 text-[#c5a059]" />
                    <span>{t.location}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Project Client</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
