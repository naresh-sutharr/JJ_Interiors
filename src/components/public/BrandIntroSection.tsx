import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ArrowUpRight, Compass, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const BrandIntroSection: React.FC = () => {
  const { businessProfile, setIsConsultationModalOpen } = useApp();

  return (
    <section id="manifesto" className="py-24 sm:py-32 bg-[#faf8f5] border-b border-[#e8dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow & Brand Title */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-3">
            Spatial Philosophy &amp; Ethos
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-light text-[#1e1b18] tracking-tight leading-[1.05]">
            Where Architecture Meets <br />
            <span className="italic font-normal text-[#8c6f50]">Automated Precision.</span>
          </h2>
        </div>

        {/* Asymmetrical 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Tonal Imagery Composition (6 Columns) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1e1b18] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85"
                alt="Architectural detailing at J.J. INTERIORS & MODUTECH"
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#1e1b18]/85 backdrop-blur-md border border-[#c5a059]/30 text-white flex items-center justify-between">
                <div>
                  <div className="font-display text-lg text-[#f5ebd7]">
                    J.J. INTERIORS &amp; MODUTECH
                  </div>
                  <div className="text-[10px] text-stone-300 tracking-[0.2em] uppercase">
                    Spaces Designed for a Better Tomorrow
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#c5a059]">EST. 2016</span>
              </div>
            </div>

            {/* Overlapping Small Architectural Texture Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 aspect-square bg-[#f0eae1] p-3 border border-[#d8cec0] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=600&q=80"
                alt="Custom fluted timber joinery"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Architectural Manifesto Narrative (6 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-stone-700 text-sm sm:text-base font-light leading-relaxed space-y-4">
              <p className="text-base sm:text-lg text-[#1e1b18] font-normal leading-relaxed">
                We believe interior architecture should never be a compromise between bespoke artistry and structural longevity.
              </p>
              
              <p>
                Founded on the synthesis of disciplined spatial planning and automated <strong>Modutech factory precision</strong>, <strong>J.J. INTERIORS &amp; MODUTECH</strong> eliminates the unpredictability, sawdust, and structural flaws of conventional on-site carpentry.
              </p>

              <p>
                Every wardrobe carcass, kitchen drawer system, and acoustic living console is engineered in a controlled manufacturing environment with European CNC milling, airtight PUR edge-sealing, and load-tested Blum and Hettich hardware.
              </p>
            </div>

            {/* Studio Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#e8dfd5]">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1e1b18] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Harmonic Proportion</span>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Spaces curated for natural light circulation, uncluttered sightlines, and daily calm.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1e1b18] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Modutech Factory CNC</span>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Sub-millimeter cutting accuracy with zero saw noise or dust in your living residence.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e1b18] hover:text-[#8c6f50] border-b border-[#1e1b18] hover:border-[#8c6f50] pb-1 transition-colors cursor-pointer"
              >
                <span>Discover Our Design Methodology</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Architectural Materiality Strip */}
        <div className="pt-12 border-t border-[#e8dfd5]">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500">
              Honest Tactile Palette
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white border border-[#e8dfd5]">
              <div className="font-display text-lg text-[#1e1b18] font-normal">Smoked Walnut Veneer</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">Deep Warmth &amp; Grain</div>
            </div>

            <div className="p-4 bg-white border border-[#e8dfd5]">
              <div className="font-display text-lg text-[#1e1b18] font-normal">Statuario Travertine</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">Natural Stone Surfaces</div>
            </div>

            <div className="p-4 bg-white border border-[#e8dfd5]">
              <div className="font-display text-lg text-[#1e1b18] font-normal">Fluted Reeded Glass</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">Diffused Ambient Light</div>
            </div>

            <div className="p-4 bg-white border border-[#e8dfd5]">
              <div className="font-display text-lg text-[#1e1b18] font-normal">Champagne Brushed Brass</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">Subtle Metallic Accents</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
