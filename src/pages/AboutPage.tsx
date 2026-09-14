import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useSEO } from '../hooks/useSEO.ts';
import { 
  Award, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ArrowUpRight, 
  Factory, 
  Layers, 
  Clock, 
  Sparkles,
  Building2,
  ChevronRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { businessProfile, trustStats, setIsConsultationModalOpen, navigateTo } = useApp();

  useSEO({
    title: 'About Studio | Architectural Turnkey & Modutech Solutions',
    description: `Discover the heritage and two-pillar philosophy of J.J. INTERIORS & MODUTECH. Founded by ${businessProfile.ownerName}, bridging artisan woodworking with European CNC precision.`,
    canonical: 'https://www.jjinteriors.site/about'
  });

  return (
    <div className="w-full bg-[#faf8f5] text-[#1e1b18]">
      
      {/* 1. Architectural Dark Page Hero Banner */}
      <section className="relative bg-[#161412] text-[#faf8f5] py-20 sm:py-28 overflow-hidden border-b border-[#c5a059]/30">
        {/* Subtle Background Ambience */}
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
            <span className="text-stone-300 font-semibold">About Studio</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-4">
              Studio Heritage &amp; Ethos
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#fbf9f5] tracking-tight leading-[1.05] mb-6">
              Bespoke Architecture, <br />
              <span className="italic font-normal text-[#e8d5b8]">Joinery Mastery &amp; Precision.</span>
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Founded in Gujarat by {businessProfile.ownerName}, J.J. INTERIORS &amp; MODUTECH bridges traditional artisan woodworking with industrial European CNC precision for modern residences and commercial headquarters.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Company Introduction */}
      <section className="py-20 sm:py-28 border-b border-[#e8dfd5] bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block">
                The Company Story
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight leading-tight">
                Two Pillars. One Unified <br />
                <span className="italic font-normal text-[#8c6f50]">Architectural Standard.</span>
              </h2>
              <div className="space-y-4 text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Established over a decade ago in Surat, J.J. INTERIORS &amp; MODUTECH was founded on a simple observation: conventional interior execution was fragmented, plagued by on-site carpentry dust, unpredictable material quality, and hidden costs.
                </p>
                <p>
                  To eliminate these compromises, we established an integrated two-part ecosystem:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-white border border-[#e8dfd5] rounded-sm">
                    <h4 className="font-display text-base font-semibold text-[#1e1b18] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#c5a059]" />
                      <span>J.J. Interiors — Design &amp; Architectural Turnkey</span>
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                      Holistic spatial planning, 3D photorealistic rendering, lighting choreography, civil modification, and luxury bespoke furnishing for private residences and corporate spaces.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-[#e8dfd5] rounded-sm">
                    <h4 className="font-display text-base font-semibold text-[#1e1b18] flex items-center gap-2">
                      <Factory className="w-4 h-4 text-[#c5a059]" />
                      <span>Modutech Solutions — High-Precision In-House Manufacturing</span>
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                      Our proprietary manufacturing unit equipped with multi-axis CNC panel saws, PUR edge-banders, and modular assembly jigs. Every cabinet and wardrobe arrives 100% pre-cut and finished for silent, dust-free installation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] overflow-hidden bg-stone-900 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                    alt="Interior Architecture Details"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden bg-stone-900 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=85"
                      alt="Modular Kitchen Craftsmanship"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 bg-[#1e1b18] text-[#faf8f5] border border-[#c5a059]/40 shadow-lg">
                    <div className="font-display text-3xl font-bold text-[#c5a059]">
                      {trustStats.projectsCompleted || 180}+
                    </div>
                    <div className="text-xs text-stone-300 font-medium uppercase tracking-wider mt-1">
                      Turnkey Projects Delivered
                    </div>
                    <div className="text-[11px] text-stone-400 mt-2 font-light">
                      Across Surat, Vadodara, and Gujarat with 10-year structural guarantee.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Owner & Founder Information */}
      <section className="py-24 sm:py-32 bg-[#1e1b18] text-[#faf8f5] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
              Founder &amp; Principal
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#faf8f5] tracking-tight leading-tight">
              Craftsmanship Rooted in <br />
              <span className="italic font-normal text-[#e8d5b8]">Carpentry Lineage.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Founder Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 border border-[#c5a059]/40 translate-x-3 translate-y-3 -z-10" />
                <div className="relative aspect-[4/5] overflow-hidden bg-[#161412] shadow-2xl">
                  <img
                    src={businessProfile.ownerPhoto}
                    alt={businessProfile.ownerName}
                    className="w-full h-full object-cover transition-all duration-700"
                    loading="lazy"
                  />
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

                <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
                {businessProfile.gstEnabled && businessProfile.gstin && (
                  <span className="font-mono text-[11px] tracking-wider text-stone-400">
                    GSTIN: <strong className="text-stone-200">{businessProfile.gstin}</strong>
                  </span>
                )}
                </div>
              </div>
            </div>

            {/* Founder Details & Design Philosophy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2 border-b border-white/10 pb-6">
                <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#fbf9f5] tracking-wide">
                  {businessProfile.ownerName}
                </h3>
                <div className="text-sm font-semibold tracking-[0.2em] uppercase text-[#c5a059]">
                  {businessProfile.ownerDesignation}
                </div>
              </div>

              <div className="space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  {businessProfile.ownerBio}
                </p>
                <p>
                  With more than a decade of hands-on expertise in interior joinery and spatial styling, {businessProfile.ownerName.split(' ')[0]} ji oversees every architectural concept from the first pencil layout to the final laser leveling on-site.
                </p>
              </div>

              {/* Design Philosophy Quote */}
              <div className="p-6 bg-[#26221d] border-l-2 border-[#c5a059] text-stone-200">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059] mb-2 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Architectural Philosophy</span>
                </div>
                <p className="font-display text-lg sm:text-xl font-light text-[#f5ebd7] leading-relaxed italic">
                  "{businessProfile.ownerVision || 'Every space we shape is an enduring balance between quiet aesthetics, structural truth, and the daily rhythm of the family who inhabits it.'}"
                </p>
              </div>

              {/* Three Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

              {/* Quick Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#d4b06a] text-black text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <span>Book Founder Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${businessProfile.ownerName.split(' ')[0]} ji, I would like to discuss an interior project with J.J. INTERIORS & MODUTECH.`)}`}
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

      {/* 4. Why Choose J.J. Interiors & Modutech */}
      <section className="py-24 sm:py-32 bg-[#faf8f5] border-b border-[#e8dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
              The Modutech Advantage
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight">
              Why Discerning Homeowners Choose Us
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
              We eliminated the traditional uncertainties of interior design by controlling the entire supply and manufacturing chain.
            </p>
            <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#e8dfd5] p-7 shadow-sm hover:border-[#c5a059] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-5">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-2">
                In-House Factory
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Zero third-party outsourcing. Every carcass, drawer box, and shutter is engineered at our Surat factory using automated CNC edge-banders.
              </p>
            </div>

            <div className="bg-white border border-[#e8dfd5] p-7 shadow-sm hover:border-[#c5a059] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-2">
                10-Year Warranty
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Official written warranty certificate protecting against wood borer, delamination, and hardware mechanical breakdown.
              </p>
            </div>

            <div className="bg-white border border-[#e8dfd5] p-7 shadow-sm hover:border-[#c5a059] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-2">
                Transparent Billing
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Every square foot and hardware component is itemized with clear GST rates. Zero hidden costs or post-agreement surprises.
              </p>
            </div>

            <div className="bg-white border border-[#e8dfd5] p-7 shadow-sm hover:border-[#c5a059] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-2">
                45-Day Handover
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Because 85% of assembly work happens in our factory, on-site installation is completed in record time without endless carpentry noise.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Professional Image Section */}
      <section className="py-20 sm:py-28 bg-[#1e1b18] text-[#faf8f5] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
                Factory &amp; Execution Gallery
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-light text-[#faf8f5] tracking-tight">
                Architectural Precision in Focus
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('/projects')}
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#c5a059] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative aspect-[4/3] overflow-hidden bg-black shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Living room interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] text-[#c5a059] uppercase tracking-widest font-mono">Residences</span>
                <h4 className="font-display text-lg text-white font-medium">Bespoke Architectural Living</h4>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden bg-black shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85"
                alt="Modular kitchen engineering"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] text-[#c5a059] uppercase tracking-widest font-mono">Modutech</span>
                <h4 className="font-display text-lg text-white font-medium">Factory-Precision Kitchen Units</h4>
              </div>
            </div>

            <div className="group relative aspect-[4/3] overflow-hidden bg-black shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
                alt="Commercial headquarters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] text-[#c5a059] uppercase tracking-widest font-mono">Commercial</span>
                <h4 className="font-display text-lg text-white font-medium">High-Performance Office Fit-outs</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CTA to Contact */}
      <section className="py-20 sm:py-24 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-3">
            Start Your Project
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight mb-6">
            Ready to Build Your Space with Us?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you need a full residential turnkey interior, modular kitchen, or commercial fit-out in Gujarat, our team is ready to assist.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-[#1e1b18] hover:bg-[#282420] text-[#faf8f5] border border-[#c5a059] text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Contact Studio</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
            </button>

            <button
              type="button"
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] hover:bg-[#d8b46d] text-[#141210] text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-md cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
