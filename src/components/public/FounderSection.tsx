import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Award, Compass, ShieldCheck, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';

export const FounderSection: React.FC = () => {
  const { businessProfile, trustStats, setIsConsultationModalOpen } = useApp();

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#1e1b18] text-[#faf8f5] border-b border-white/10 relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
            Leadership &amp; Ethos
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-light text-[#faf8f5] tracking-tight leading-tight">
            Craftsmanship Rooted in <br />
            <span className="italic font-normal text-[#e8d5b8]">Architectural Discipline.</span>
          </h2>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Professional Portrait Frame (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Architectural Offset Frame Border */}
              <div className="absolute -inset-4 border border-[#c5a059]/40 translate-x-3 translate-y-3 -z-10" />

              <div className="relative aspect-[4/5] overflow-hidden bg-[#161412] shadow-2xl">
                <img
                  src={businessProfile.ownerPhoto}
                  alt={businessProfile.ownerName}
                  className="w-full h-full object-cover transition-all duration-700"
                  loading="lazy"
                />
                
                {/* Overlay Experience Capsule */}
                {!!businessProfile.ownerExperienceYears && (
                  <div className="absolute bottom-4 left-4 right-4 bg-[#161412]/90 backdrop-blur-md border border-[#c5a059]/50 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-[#c5a059]" />
                      </div>
                      <div>
                        <div className="text-xl font-display font-bold text-[#f5ebd7]">
                          {businessProfile.ownerExperienceYears}+ Years
                        </div>
                        <div className="text-[10px] text-stone-300 uppercase tracking-widest font-medium">
                          Architectural &amp; Joinery Mastery
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Founder Information & Vision (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Founder Identity */}
            <div className="space-y-2 border-b border-white/10 pb-6">
              <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#fbf9f5] tracking-wide">
                {businessProfile.ownerName}
              </h3>
              <div className="text-sm font-semibold tracking-[0.2em] uppercase text-[#c5a059]">
                {businessProfile.ownerDesignation}
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                {businessProfile.ownerBio}
              </p>
            </div>

            {/* Studio Vision Statement */}
            {businessProfile.ownerVision && (
              <div className="p-6 bg-[#26221d] border-l-2 border-[#c5a059] text-stone-200">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059] mb-2 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Architectural Vision</span>
                </div>
                <p className="font-display text-lg sm:text-xl font-light text-[#f5ebd7] leading-relaxed italic">
                  "{businessProfile.ownerVision}"
                </p>
              </div>
            )}

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1">
                  1. Zero Site Mess
                </div>
                <div className="text-xs text-stone-400 font-light leading-snug">
                  100% factory pre-cut CNC components delivered ready for silent assembly.
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1">
                  2. Honest Materials
                </div>
                <div className="text-xs text-stone-400 font-light leading-snug">
                  Zero substandard substitutes. Certified marine-grade plywood &amp; acrylics.
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-1">
                  3. 10-Year Warranty
                </div>
                <div className="text-xs text-stone-400 font-light leading-snug">
                  Tested European hardware load limits and structural board assurance.
                </div>
              </div>
            </div>

            {/* Contact / Consultation Callout */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#d4b06a] text-black text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <span>Book Founder Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${businessProfile.ownerName.split(' ')[0]}%20ji,%20I%20would%20like%20to%20discuss%20an%20interior%20project%20with%20J.J.%20INTERIORS%20%26%20MODUTECH`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/20 text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Direct WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
