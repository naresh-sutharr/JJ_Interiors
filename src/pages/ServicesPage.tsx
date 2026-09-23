import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useSEO } from '../hooks/useSEO.ts';
import { Service } from '../types.ts';
import { ProcessSection } from '../components/public/ProcessSection.tsx';
import { 
  Home, 
  Layers, 
  Factory, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, setActiveServiceModal, setIsConsultationModalOpen, navigateTo } = useApp();

  useSEO({
    title: 'Professional Interior Design & Custom Furniture Services in Surat',
    description: 'Explore our services: Complete Home Interiors, Modular Kitchens, Custom Wardrobes, Living Room, Bedroom, Office & Commercial Interiors, and Turnkey Execution in Surat.',
    keywords: 'Complete Home Interiors Surat, Modular Kitchens Surat, Wardrobes Surat, Living Room Interiors Surat, Bedroom Interiors, Office Interiors, Commercial Interiors, Custom Furniture Surat, Turnkey Interiors',
    canonical: 'https://www.jjinteriors.site/services'
  });

  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order);

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
            <span className="text-stone-300 font-semibold">Services</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-4">
              Disciplines &amp; Modutech Engineering
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#fbf9f5] tracking-tight leading-[1.05] mb-6">
              Architectural Solutions <br />
              <span className="italic font-normal text-[#e8d5b8]">Engineered for Discerning Spaces.</span>
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              From bespoke residential master suites to factory-engineered Modutech cabinetry and high-performance corporate headquarters across Gujarat.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Four Core Discipline Pillars */}
      <section className="py-16 bg-white border-b border-[#e8dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1: Interior Design */}
            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5] hover:border-[#c5a059] transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-1">
                Interior Design
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Full-scope turnkey residences, luxury living rooms, master bedroom suites, false ceiling lighting, and 3D architectural styling.
              </p>
            </div>

            {/* Pillar 2: Modular Furniture */}
            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5] hover:border-[#c5a059] transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-1">
                Modular Furniture
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                German hardware-fitted modular kitchens, floor-to-ceiling walk-in wardrobes, floating TV consoles, and vanity cabinets.
              </p>
            </div>

            {/* Pillar 3: Modutech Solutions */}
            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5] hover:border-[#c5a059] transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-1">
                Modutech Solutions
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Automated multi-axis CNC panel cutting, 0.5mm edge-banding, dust-free manufacturing, and 10-year structural warranty.
              </p>
            </div>

            {/* Pillar 4: Commercial Spaces */}
            <div className="p-6 bg-[#faf8f5] border border-[#e8dfd5] hover:border-[#c5a059] transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1e1b18] mb-1">
                Commercial Spaces
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Corporate headquarters, executive director suites, collaborative open desks, retail showrooms, and acoustic partitions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Detailed Service Cards Grid */}
      <section className="py-20 sm:py-28 border-b border-[#e8dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
                Detailed Service Portfolio
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight">
                Our Complete Execution Disciplines
              </h2>
            </div>
            <p className="text-stone-600 text-sm max-w-md font-light">
              Tap any discipline card below to explore exact architectural inclusions, standard timelines, and materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeServices.map((service, index) => {
              const indexStr = (index + 1).toString().padStart(2, '0');
              const isHighlight = service.slug === 'residential-interiors' || service.slug === 'turnkey-interior-solutions';

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveServiceModal(service)}
                  className={`group cursor-pointer bg-white border transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl ${
                    isHighlight 
                      ? 'border-[#c5a059]/60 hover:border-[#c5a059]' 
                      : 'border-[#e8dfd5] hover:border-[#c5a059]'
                  }`}
                >
                  {/* Photography Frame with Hover Zoom */}
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[#1e1b18]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    {/* Index Marker */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#1e1b18]/80 backdrop-blur-md text-[10px] font-mono font-bold text-[#c5a059] border border-[#c5a059]/30 tracking-widest">
                      {indexStr}
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-display text-xl sm:text-2xl text-white font-light group-hover:text-[#f5ebd7] transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Inclusions */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-1.5 pt-3 border-t border-[#f0eae1]">
                        {service.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="text-[11px] text-stone-600 flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-[#c5a059] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pt-4 border-t border-[#f0eae1] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1e1b18] group-hover:text-[#c5a059] transition-colors">
                      <span>Explore Inclusions</span>
                      <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Process & Workflow Section */}
      <ProcessSection />

      {/* 5. CTA Section */}
      <section className="py-20 sm:py-24 bg-[#161412] text-[#faf8f5] border-t border-[#c5a059]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-3">
            Tailored Engineering
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#faf8f5] tracking-tight mb-6">
            Have a Specific Architectural Scope in Mind?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Send us your floor plan or schedule an on-site survey. We provide detailed 3D elevations and fully transparent itemized billing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] hover:bg-[#d8b46d] text-[#141210] text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-lg cursor-pointer"
            >
              Request Custom Estimate
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              Contact Design Office
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
