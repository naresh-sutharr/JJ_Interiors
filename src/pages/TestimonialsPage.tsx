import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useSEO } from '../hooks/useSEO.ts';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Award, 
  Building2, 
  MapPin, 
  ChevronRight, 
  ArrowUpRight,
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { testimonials, trustStats, setIsConsultationModalOpen, navigateTo } = useApp();

  useSEO({
    title: 'Client Experiences & Testimonials | J.J. INTERIORS & MODUTECH',
    description: 'Read genuine feedback from homeowners and businesses across Surat and Gujarat who trusted us with their interior architecture and modular execution.',
    canonical: 'https://www.jjinteriors.site/testimonials'
  });

  const activeReviews = testimonials
    .filter((t) => t.active !== false)
    .sort((a, b) => (b.rating || 5) - (a.rating || 5));

  return (
    <div className="w-full bg-[#faf8f5] text-[#1e1b18]">
      
      {/* 1. Page Hero Banner */}
      <section className="relative bg-[#161412] text-[#faf8f5] py-20 sm:py-28 overflow-hidden border-b border-[#c5a059]/30">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-[#161412]/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-6">
            <button 
              type="button" 
              onClick={() => navigateTo('/')} 
              className="hover:underline cursor-pointer opacity-80 hover:opacity-100"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-500" />
            <span className="text-stone-300 font-semibold">Testimonials</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-4">
              Client Voices &amp; Proven Reputation
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#fbf9f5] tracking-tight leading-[1.05] mb-6">
              Client Experiences <br />
              <span className="italic font-normal text-[#e8d5b8]">&amp; Trust Built Over a Decade.</span>
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Read authentic feedback from homeowners, corporate clients, and architects who entrusted their vision to J.J. INTERIORS &amp; MODUTECH.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators Bar */}
      <section className="py-12 bg-white border-b border-[#e8dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5]">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#1e1b18]">
                {trustStats.yearsExperience || 10}+
              </div>
              <div className="text-xs text-[#c5a059] font-bold uppercase tracking-wider mt-1">
                Years of Excellence
              </div>
              <div className="text-[11px] text-stone-500 mt-1 font-light">
                Continuous practice in Gujarat
              </div>
            </div>

            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5]">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#1e1b18]">
                {trustStats.projectsCompleted || 180}+
              </div>
              <div className="text-xs text-[#c5a059] font-bold uppercase tracking-wider mt-1">
                Delivered Projects
              </div>
              <div className="text-[11px] text-stone-500 mt-1 font-light">
                Turnkey &amp; modular joinery
              </div>
            </div>

            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5]">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#1e1b18]">
                {trustStats.satisfactionRate || '99.4%'}
              </div>
              <div className="text-xs text-[#c5a059] font-bold uppercase tracking-wider mt-1">
                Client Satisfaction
              </div>
              <div className="text-[11px] text-stone-500 mt-1 font-light">
                Verified customer reviews
              </div>
            </div>

            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5]">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#1e1b18]">
                {trustStats.warrantyYears || 10} Years
              </div>
              <div className="text-xs text-[#c5a059] font-bold uppercase tracking-wider mt-1">
                Warranty Protection
              </div>
              <div className="text-[11px] text-stone-500 mt-1 font-light">
                Written warranty certificate
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Detailed Client Reviews Grid */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
                Verified Reviews
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight">
                What Our Clients Say
              </h2>
            </div>
            <p className="text-stone-600 text-sm max-w-md font-light">
              Every review represents an executed residential handover or modular installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeReviews.map((item) => {
              const rating = item.rating || 5;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#e8dfd5] hover:border-[#c5a059] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Stars & Quote Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#c5a059]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? 'fill-[#c5a059] text-[#c5a059]' : 'text-stone-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs font-bold text-[#1e1b18] font-mono">
                          {rating}.0
                        </span>
                      </div>
                      <Quote className="w-6 h-6 text-[#ebd5b3] opacity-60" />
                    </div>

                    {/* Project Type Badge */}
                    {item.projectType && (
                      <div className="inline-block px-2.5 py-1 bg-[#faf8f5] border border-[#e8dfd5] text-[10px] uppercase font-semibold tracking-wider text-stone-700">
                        Project: {item.projectType}
                      </div>
                    )}

                    {/* Review Text */}
                    <p className="text-stone-700 text-sm font-light leading-relaxed italic">
                      "{item.comment || item.quote}"
                    </p>
                  </div>

                  {/* Client Info & Location */}
                  <div className="pt-6 mt-6 border-t border-[#f0eae1] flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-base font-semibold text-[#1e1b18] flex items-center gap-1.5">
                        <span>{item.clientName || item.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Client" />
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-stone-500 font-light mt-0.5">
                        <MapPin className="w-3 h-3 text-[#c5a059]" />
                        <span>{item.location || 'Gujarat'}</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                      Verified
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-20 sm:py-24 bg-[#161412] text-[#faf8f5] border-t border-[#c5a059]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-3">
            Your Vision in Safe Hands
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#faf8f5] tracking-tight mb-6">
            Join Our Growing Family of Delighted Clients
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the peace of mind of working directly with Gopalram ji and our in-house Modutech manufacturing facility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] hover:bg-[#d8b46d] text-[#141210] text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-lg cursor-pointer"
            >
              Book Design Consultation
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Contact Us Today</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
