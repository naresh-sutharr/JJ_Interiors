import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs, setIsConsultationModalOpen } = useApp();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#f5f0e8] border-b border-[#e8dfd5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
            Frequently Addressed Queries
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight">
            Clarity on Process, Modular Build &amp; Timelines
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Everything you need to know about working with J.J. INTERIORS &amp; MODUTECH.
          </p>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-6" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#faf8f5] border border-[#e8dfd5] transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl font-normal text-[#1e1b18]">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full border border-[#d8cec2] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-[#1e1b18] text-white' : 'text-stone-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-stone-600 text-sm sm:text-base font-light leading-relaxed border-t border-[#f0eae1] animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-12 text-center p-6 bg-white border border-[#e8dfd5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <HelpCircle className="w-5 h-5 text-[#c5a059] shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-[#1e1b18]">Have a specific architectural or spatial question?</h4>
              <p className="text-xs text-stone-500">Speak directly with our principal interior architect.</p>
            </div>
          </div>
          <button
            onClick={() => setIsConsultationModalOpen(true)}
            className="px-6 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
          >
            Ask a Question
          </button>
        </div>

      </div>
    </section>
  );
};
