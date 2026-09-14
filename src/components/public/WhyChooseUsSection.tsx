import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  CheckCircle2, 
  Award,
  Layers,
  Leaf
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const materialPillars = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#c5a059]" />,
      title: "Custom Design",
      tag: "Bespoke Interiors",
      desc: "Every project is uniquely designed to reflect your lifestyle and preferences, ensuring your space is as individual as you are."
    },
    {
      icon: <Layers className="w-6 h-6 text-[#c5a059]" />,
      title: "Quality Materials",
      tag: "Premium Selection",
      desc: "We source only the finest marine plywood, HDHMR boards, and premium laminates to guarantee longevity and a flawless finish."
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#c5a059]" />,
      title: "Precision Furniture",
      tag: "Factory Engineered",
      desc: "Our proprietary Modutech facility utilizes European CNC machines for millimeter-accurate cutting and zero-joint edge banding."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#c5a059]" />,
      title: "Complete Execution",
      tag: "Turnkey Solutions",
      desc: "From the first 3D concept to the final site handover, we provide a seamless single-point-of-contact experience."
    },
    {
      icon: <Award className="w-6 h-6 text-[#c5a059]" />,
      title: "Transparent Estimation",
      tag: "Zero Cost Creep",
      desc: "Detailed, itemized room-by-room estimates with clear dimensions and material specs. No hidden charges or surprises."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#c5a059]" />,
      title: "After-Sales Support",
      tag: "10-Year Warranty",
      desc: "Our relationship doesn't end at handover. We provide comprehensive after-sales support and official warranties for your peace of mind."
    }
  ];

  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-[#faf8f5] border-b border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-light text-[#1e1b18] tracking-tight leading-[1.05]">
              Materials Selected <br />
              <span className="italic font-normal text-[#8c6f50]">Without Compromise.</span>
            </h2>
          </div>

          <p className="text-stone-600 text-sm max-w-md font-light leading-relaxed">
            Every millimeter of cabinetry that leaves our Modutech facility is engineered with certified substrates, European hardware, and airtight edge banding.
          </p>
        </div>

        {/* 7 Material & Craftsmanship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materialPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-[#e8dfd5] hover:border-[#c5a059] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-none bg-[#faf8f5] border border-[#e8dfd5] group-hover:border-[#c5a059]/60 flex items-center justify-center transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#8c6f50] bg-[#faf8f5] px-2.5 py-1 border border-[#e8dfd5]">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-light text-[#1e1b18] group-hover:text-[#8c6f50] transition-colors mb-3">
                  {pillar.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f0eae1] flex items-center gap-2 text-[11px] font-semibold text-[#c5a059] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Modutech Certified Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hardware Logos / Brand Endorsement Bar */}
        <div className="mt-16 p-6 sm:p-8 bg-white border border-[#e8dfd5] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 text-center sm:text-left">
            Trusted Hardware &amp; Material Partners:
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm font-bold text-stone-700 tracking-wider font-mono">
            <span className="hover:text-[#c5a059] transition-colors">BLUM</span>
            <span className="hover:text-[#c5a059] transition-colors">HETTICH</span>
            <span className="hover:text-[#c5a059] transition-colors">HÄFELE</span>
            <span className="hover:text-[#c5a059] transition-colors">CENTURY PLY</span>
            <span className="hover:text-[#c5a059] transition-colors">GREENLAM</span>
            <span className="hover:text-[#c5a059] transition-colors">KAINDL</span>
          </div>
        </div>

      </div>
    </section>
  );
};
