import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, CheckCircle2, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const { activeServiceModal, setActiveServiceModal, setIsConsultationModalOpen, businessProfile } = useApp();

  if (!activeServiceModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
      <div className="relative w-full max-w-2xl bg-[#faf8f5] text-[#1e1b18] shadow-2xl border border-[#c5a059]/40 overflow-hidden my-auto">
        
        {/* Header Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161412]">
          <img
            src={activeServiceModal.image}
            alt={activeServiceModal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={() => setActiveServiceModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black hover:text-[#c5a059] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c5a059] block mb-1">
              Modutech Discipline
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal">
              {activeServiceModal.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#c5a059] mb-2">
              Scope &amp; Engineering Details
            </h3>
            <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed">
              {activeServiceModal.fullDesc || activeServiceModal.shortDesc}
            </p>
          </div>

          {activeServiceModal.features && activeServiceModal.features.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1e1b18] mb-3">
                Key Technical Inclusions
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeServiceModal.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-6 border-t border-[#e8dfd5] flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setActiveServiceModal(null);
                setIsConsultationModalOpen(true);
              }}
              className="flex-1 py-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Consultation for this Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919427054921'}?text=${encodeURIComponent(`Hello J.J. INTERIORS & MODUTECH, I would like to inquire about your ${activeServiceModal.title} services.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
