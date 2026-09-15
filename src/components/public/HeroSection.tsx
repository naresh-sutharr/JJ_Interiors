import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ArrowUpRight, ArrowDown, Award, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsConsultationModalOpen, projects, setActiveProjectModal, businessProfile, navigateTo } = useApp();

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#161412] text-[#faf8f5]">
      {/* Background Architectural Canvas - One strong real project photograph */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={featuredProject?.coverImage || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=88"}
          alt="J.J. INTERIORS & MODUTECH Interior Architecture"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* No dark overlays as requested by user, keeping the image HD and natural */}
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-36 pb-10 sm:pb-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Studio Name, Short Headline, Short Subtitle, CTAs */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Studio Name Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1b18]/80 backdrop-blur-md border border-[#c5a059]/40 text-[#f5ebd7] text-xs font-semibold tracking-[0.22em] uppercase mb-4 sm:mb-6 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              <span>{businessProfile.brandName || "J.J. INTERIORS & MODUTECH"}</span>
            </div>

            {/* Short Premium Headline */}
            <h1 className="font-display text-3xl xs:text-4xl sm:text-6xl lg:text-[5.2rem] font-light tracking-tight leading-[1.05] sm:leading-[0.98] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-4 sm:mb-6 uppercase">
              INTERIORS MADE FOR <br />
              <span className="italic font-normal text-[#e8d5b8] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">THE WAY YOU LIVE.</span>
            </h1>

            {/* Short Supporting Sentence */}
            <p className="text-white text-sm sm:text-base md:text-lg font-medium tracking-wide max-w-xl leading-relaxed mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Thoughtfully designed interiors, precision-made modular furniture and custom spaces crafted around your lifestyle.
            </p>

            {/* CTAs: EXPLORE PROJECTS & START YOUR PROJECT */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={() => navigateTo('/projects')}
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#1e1b18] hover:bg-[#282420] text-[#faf8f5] border border-[#c5a059]/70 hover:border-[#c5a059] rounded-none text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2.5 group w-full sm:w-auto"
              >
                <span>VIEW OUR PROJECTS</span>
                <ArrowUpRight className="w-4 h-4 text-[#c5a059] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#1e1b18]/80 backdrop-blur-sm hover:bg-[#1e1b18] text-[#faf8f5] border border-white/40 hover:border-white rounded-none text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer flex items-center justify-center w-full sm:w-auto shadow-xl"
              >
                BOOK A CONSULTATION
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/20 text-xs text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>10+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>In-House Modutech Factory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>10-Year Warranty</span>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Real Project Visual Card */}
          {featuredProject && (
            <div className="lg:col-span-4 hidden lg:block">
              <div 
                onClick={() => setActiveProjectModal(featuredProject)}
                className="group cursor-pointer bg-[#1e1b18]/85 backdrop-blur-md border border-[#c5a059]/30 hover:border-[#c5a059] p-4 transition-all duration-500 shadow-2xl relative overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black mb-3.5 relative">
                  <img
                    src={featuredProject.coverImage}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[8.5px] font-bold uppercase tracking-widest px-2.5 py-0.5 bg-[#161412]/90 text-[#c5a059] border border-[#c5a059]/40">
                    {featuredProject.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-stone-400 uppercase tracking-widest">
                    <span>{featuredProject.location}</span>
                    <span>{featuredProject.year}</span>
                  </div>
                  <h3 className="font-display text-lg text-white font-medium group-hover:text-[#c5a059] transition-colors leading-snug">
                    {featuredProject.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-light line-clamp-2 pt-0.5">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#c5a059] font-semibold uppercase tracking-wider">
                  <span className="text-[10px]">View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Ticker Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#161412]/95 backdrop-blur-md py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 sm:gap-6 text-stone-400 text-[10.5px] uppercase tracking-widest">
            <span className="text-[#f5ebd7] font-semibold">Vadodara • Surat • Anand</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Residential Interiors</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Modular Kitchens</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Commercial Spaces</span>
          </div>

          <button
            onClick={() => navigateTo('/projects')}
            className="flex items-center gap-1.5 text-stone-400 hover:text-[#c5a059] transition-colors cursor-pointer text-[10.5px] uppercase tracking-wider"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#c5a059]" />
          </button>
        </div>
      </div>

    </section>
  );
};
