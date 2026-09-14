import React from 'react';
import { useSEO } from '../hooks/useSEO.ts';
import { ProcessSection } from '../components/public/ProcessSection.tsx';

export const ProcessPage: React.FC = () => {
  useSEO({
    title: 'Our Interior Design Process | J.J. INTERIORS & MODUTECH',
    description: 'Learn about our 8-step interior design and turnkey execution process, from initial consultation to final handover.',
    canonical: 'https://www.jjinteriors.site/process'
  });

  return (
    <div className="w-full">
      {/* 1. Page Header */}
      <section className="bg-[#161412] text-[#faf8f5] py-20 sm:py-28 border-b border-[#c5a059]/30 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-4">
            How We Work
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-light text-[#fbf9f5] tracking-tight leading-[1.05] mb-6">
            Our Interior Design <br className="hidden sm:block" />
            <span className="italic font-normal text-[#e8d5b8]">Execution Process.</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            A transparent and structured 8-step journey from your first idea to moving into your beautifully crafted space.
          </p>
        </div>
      </section>

      {/* 2. Process Core Section */}
      <ProcessSection />
    </div>
  );
};
