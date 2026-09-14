import React from 'react';
import { 
  MessageSquareText, 
  Layers, 
  Sparkles, 
  Factory, 
  Wrench, 
  KeyRound,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "CONSULTATION",
      subtitle: "Lifestyle Discovery & Spatial Intent",
      desc: "An in-depth session exploring your lifestyle rituals, architectural tastes, functional storage requirements, and financial framework.",
      deliverable: "Design brief & preliminary project roadmap"
    },
    {
      num: "02",
      title: "SITE VISIT & MEASUREMENTS",
      subtitle: "Accurate Spatial Survey",
      desc: "Our team visits your property to take precise millimeter-accurate measurements, analyze site conditions, and understand natural lighting.",
      deliverable: "Detailed site survey & measurement drawings"
    },
    {
      num: "03",
      title: "DESIGN & MATERIAL SELECTION",
      subtitle: "Visualizing the Space",
      desc: "Development of spatial layouts, lighting calculations, 3D renderings, and physical curation of laminates, veneers, and hardware.",
      deliverable: "3D renders & signed material docket"
    },
    {
      num: "04",
      title: "QUOTATION & APPROVAL",
      subtitle: "Transparent Financial Outline",
      desc: "A comprehensive itemized estimate categorized room by room with explicit dimensions, core material specifications, and transparent unit rates.",
      deliverable: "Finalized quotation & project sign-off"
    },
    {
      num: "05",
      title: "MANUFACTURING",
      subtitle: "Factory Precision Engineering",
      desc: "All cutting, boring, grooving, and edge sealing happens in our proprietary manufacturing plant with zero wood dust on-site.",
      deliverable: "100% factory pre-assembled components"
    },
    {
      num: "06",
      title: "INSTALLATION",
      subtitle: "Silent, Dust-Free On-Site Joinery",
      desc: "Trained technicians assemble precision interlocking units on-site in a fraction of traditional time, with zero mess and immaculate alignment.",
      deliverable: "Fast-track, calibrated site assembly"
    },
    {
      num: "07",
      title: "FINAL HANDOVER",
      subtitle: "Quality Signoff & Warranty",
      desc: "Complete quality audit, hardware calibration, deep site clean, and official warranty certificate delivery for your new space.",
      deliverable: "Turnkey handover & warranty certificate"
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-[#161412] text-[#faf8f5] border-b border-white/10 relative overflow-hidden">
      {/* Background Architectural Watermark */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
              The Architectural Journey
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#faf8f5] tracking-tight leading-[1.05]">
              Seven Steps to <br />
              <span className="italic font-normal text-[#e8d5b8]">Enduring Perfection.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-stone-300 text-sm font-light leading-relaxed mb-3">
              A disciplined, transparent delivery system eliminating unexpected delays, cost spikes, and messy carpentry through factory-controlled engineering.
            </p>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
              <Factory className="w-4 h-4" />
              <span>Fabricated In Our Dedicated Modutech Facility</span>
            </div>
          </div>
        </div>

        {/* 7 Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((step) => {
            const isFactory = step.num === "05";
            return (
              <div
                key={step.num}
                className={`p-8 relative transition-all duration-500 flex flex-col justify-between ${
                  isFactory 
                    ? 'bg-[#241f1a] border-2 border-[#c5a059] shadow-2xl' 
                    : 'bg-[#1e1b18] border border-white/10 hover:border-[#c5a059]/50'
                }`}
              >
                {isFactory && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 bg-[#c5a059] text-black text-[9px] font-bold uppercase tracking-widest">
                    Factory Engineered
                  </div>
                )}

                <div>
                  {/* Step Number + Title */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="font-mono text-3xl font-light text-[#c5a059]">
                      {step.num}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                      Phase {step.num}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-light text-[#faf8f5] tracking-wide mb-1">
                    {step.title}
                  </h3>
                  
                  <div className="text-[11px] font-medium text-[#c5a059] uppercase tracking-wider mb-4">
                    {step.subtitle}
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Deliverable Badge */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-stone-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span className="truncate">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Factory Guarantee Banner */}
        <div className="mt-16 p-8 bg-[#1e1b18] border border-[#c5a059]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#c5a059]" />
            </div>
            <div>
              <div className="font-display text-xl text-[#f5ebd7] font-semibold">
                Proprietary Modutech Quality Protocol
              </div>
              <div className="text-xs text-stone-300 font-light">
                European CNC precision cutting • Zero on-site sawdust • 10-Year structural board warranty
              </div>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-[#c5a059] tracking-wider uppercase">
            Vadodara • Surat • Anand Handover Network
          </div>
        </div>

      </div>
    </section>
  );
};
