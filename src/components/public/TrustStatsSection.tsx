import React from 'react';
import { useApp } from '../../context/AppContext.tsx';

export const TrustStatsSection: React.FC = () => {
  const { trustStats } = useApp();

  const metrics = [
    {
      value: `${trustStats.yearsOfExperience || 10}+`,
      label: "Years Experience",
      subtext: "Continuous architectural mastery"
    },
    {
      value: `${trustStats.projectsCompleted || 180}+`,
      label: "Completed Projects",
      subtext: "Residential & corporate spaces"
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      subtext: "Verified Google reviews & referrals"
    },
    {
      value: "10-Year",
      label: "Warranty",
      subtext: "Factory Modutech structural pledge"
    }
  ];

  return (
    <section className="py-20 bg-[#161412] text-[#faf8f5] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center sm:items-start text-center sm:text-left border-l-0 sm:border-l border-white/15 pl-0 sm:pl-6 py-2"
            >
              <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#fbf9f5] tracking-tight mb-2">
                {m.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059] mb-1">
                {m.label}
              </div>
              <p className="text-[11px] text-stone-400 font-light">
                {m.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
