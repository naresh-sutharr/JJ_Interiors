import React from 'react';
import { Layers, ShieldCheck, Hammer, CheckCircle2 } from 'lucide-react';

export const MaterialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#1e1b18] text-[#faf8f5] border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
            Honest Craftsmanship
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#faf8f5] tracking-tight mb-4">
            Materials &amp; Quality Standards
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            We refuse to compromise on the structural integrity of your furniture. Every interior we design is built upon certified, industry-leading materials designed to last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Core Boards */}
          <div className="bg-[#26221d] border border-white/10 p-8 hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-6">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-medium text-white mb-3">
              Premium Core Boards
            </h3>
            <p className="text-sm text-stone-400 font-light mb-4">
              We exclusively use Boiling Water Proof (BWP) Marine Grade Plywood and High-Density High Moisture Resistance (HDHMR) boards for unmatched durability against moisture and termites.
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> Termite & Borer Proof</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> High Load Bearing Capacity</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> Zero Warpage Guarantee</li>
            </ul>
          </div>

          {/* Finishes */}
          <div className="bg-[#26221d] border border-white/10 p-8 hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-6">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-medium text-white mb-3">
              Flawless Surface Finishes
            </h3>
            <p className="text-sm text-stone-400 font-light mb-4">
              Our factory applies edge-banding using advanced PUR adhesives. We offer 1.5mm anti-scratch acrylics, natural wood veneers, and premium PU Duco paints for a seamless look.
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> Anti-Fingerprint Acrylics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> Natural Grain Veneers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> Seamless PUR Edge-Banding</li>
            </ul>
          </div>

          {/* Hardware */}
          <div className="bg-[#26221d] border border-white/10 p-8 hover:border-[#c5a059]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-6">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-medium text-white mb-3">
              European Hardware
            </h3>
            <p className="text-sm text-stone-400 font-light mb-4">
              A cabinet is only as good as its hinges. We partner with leading European brands to ensure every drawer glides silently and every shutter closes softly for decades.
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> Soft-Close Tandem Boxes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> Heavy-Duty Gas Springs</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" /> 10-Year Hardware Warranty</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
