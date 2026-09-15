import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Service } from '../../types.ts';

export const ServicesSection: React.FC = () => {
  const { services, setActiveServiceModal, navigateTo } = useApp();

  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order)
    .slice(0, 6);

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#faf8f5] border-b border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
              Capabilities &amp; Disciplines
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#1e1b18] tracking-tight leading-[1.05]">
              Architectural Solutions <br />
              <span className="italic font-normal text-[#8c6f50]">for Discerning Spaces.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-stone-600 text-sm font-light leading-relaxed mb-2">
              From bespoke residential master suites to factory-engineered Modutech cabinetry and high-performance commercial headquarters.
            </p>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8c6f50] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Engineered with European CNC Precision</span>
            </div>
          </div>
        </div>

        {/* Editorial Services Grid: 9 Disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {activeServices.map((service, index) => {
            const indexStr = (index + 1).toString().padStart(2, '0');
            const isHighlight = service.slug === 'modutech-solutions' || service.slug === 'interior-design';

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
                {/* Architectural Photography Frame with Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1e1b18]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Architectural Index Marker (01, 02...) */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#1e1b18]/80 backdrop-blur-md text-[10px] font-mono font-bold text-[#c5a059] border border-[#c5a059]/30 tracking-widest">
                    {indexStr}
                  </div>

                  {/* Title Bar in Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-display text-2xl text-white font-light group-hover:text-[#f5ebd7] transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Editorial Content Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Feature Highlights */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-1.5 pt-3 border-t border-[#f0eae1]">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="text-[11px] text-stone-600 flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-[#c5a059] shrink-0 mt-0.5" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Explore Action Link */}
                  <div className="pt-4 border-t border-[#e8dfd5] flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#1e1b18] group-hover:text-[#8c6f50] transition-colors">
                    <span>Explore Discipline</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        {services.length > 6 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigateTo('/services');
              }}
              className="px-8 py-4 bg-transparent border border-[#1e1b18] hover:bg-[#1e1b18] hover:text-white text-[#1e1b18] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>View All Architectural Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
