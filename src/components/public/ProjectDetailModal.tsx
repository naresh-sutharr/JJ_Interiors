import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, MapPin, Calendar, CheckCircle2, Layers, Sparkles, MessageSquare, ArrowLeftRight } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal, setIsConsultationModalOpen, businessProfile } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  if (!activeProjectModal) return null;

  const hasBeforeAfter = Boolean(activeProjectModal.beforeImage && activeProjectModal.afterImage);

  const images = activeProjectModal.galleryImages && activeProjectModal.galleryImages.length > 0
    ? activeProjectModal.galleryImages
    : [activeProjectModal.coverImage];

  const currentImage = images[activeImageIndex] || activeProjectModal.coverImage;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
      <div className="relative w-full max-w-5xl bg-[#faf8f5] text-[#1e1b18] shadow-2xl border border-[#c5a059]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#e8dfd5] bg-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 bg-[#1e1b18] text-[#fbf9f5]">
                {activeProjectModal.category}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                {activeProjectModal.location}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                {activeProjectModal.year}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-[#1e1b18]">
              {activeProjectModal.title}
            </h2>
          </div>

          <button
            onClick={() => setActiveProjectModal(null)}
            className="p-2 text-stone-400 hover:text-[#1e1b18] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 flex-1 space-y-8">
          
          {/* Main Hero Gallery Display or Before/After Interactive Viewer */}
          <div className="space-y-3">
            {hasBeforeAfter && (
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded ${
                    showBeforeAfter ? 'bg-[#c5a059] text-[#141210]' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>{showBeforeAfter ? 'View Gallery' : 'View Before & After'}</span>
                </button>
              </div>
            )}

            {showBeforeAfter && hasBeforeAfter ? (
              /* Interactive Before/After Split Viewer */
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#141210] shadow-inner select-none">
                {/* After Image (Full background) */}
                <img
                  src={activeProjectModal.afterImage}
                  alt="After J.J. INTERIORS & MODUTECH Transformation"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-[10px] tracking-wider uppercase font-semibold">
                  After (Handover)
                </span>

                {/* Before Image (Clipped) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-xl"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeProjectModal.beforeImage}
                    alt="Before Interior Transformation"
                    className="w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white text-[10px] tracking-wider uppercase font-semibold">
                    Before (Raw Site)
                  </span>
                </div>

                {/* Slider control line handle */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                  aria-label="Drag before and after slider"
                />
              </div>
            ) : (
              /* Normal High-Resolution Gallery Viewer */
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#141210] shadow-inner">
                <img
                  src={currentImage}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[11px] tracking-wider uppercase font-mono">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </div>
            )}

            {/* Thumbnail Row */}
            {!showBeforeAfter && images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-[16/10] shrink-0 overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImageIndex === idx ? 'border-[#c5a059] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Overview, Concept & Highlights */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-2">
                  Project Narrative
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                  {activeProjectModal.description}
                </p>
              </div>

              {(activeProjectModal.designConcept || activeProjectModal.concept) && (
                <div className="p-4 bg-[#f5f0e8] border-l-2 border-[#c5a059]">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1e1b18] mb-1">
                    Design Concept &amp; Spatial Philosophy
                  </h4>
                  <p className="text-stone-700 text-sm font-light">
                    {activeProjectModal.designConcept || activeProjectModal.concept}
                  </p>
                </div>
              )}

              {activeProjectModal.highlights && activeProjectModal.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1e1b18] mb-3">
                    Architectural &amp; Joinery Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeProjectModal.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Specifications & Materials */}
            <div className="lg:col-span-4 bg-white p-5 border border-[#e8dfd5] space-y-5">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1e1b18] border-b border-[#e8dfd5] pb-2">
                Project Dossier
              </h4>

              {activeProjectModal.area && (
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                    Super Built-Up Area
                  </div>
                  <p className="text-xs font-semibold text-[#1e1b18]">
                    {activeProjectModal.area}
                  </p>
                </div>
              )}

              {activeProjectModal.materials && (
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Materials &amp; Finishes</span>
                  </div>
                  <p className="text-xs text-stone-700 font-medium">
                    {activeProjectModal.materials}
                  </p>
                </div>
              )}

              {activeProjectModal.services && activeProjectModal.services.length > 0 && (
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                    Integrated Disciplines
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeProjectModal.services.map((s, idx) => (
                      <span key={idx} className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#faf8f5] border border-[#e8dfd5] text-stone-700 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeProjectModal.budget && (
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                    Investment Scope
                  </div>
                  <p className="text-xs font-semibold text-[#1e1b18]">
                    {activeProjectModal.budget}
                  </p>
                </div>
              )}

              {/* Action Box */}
              <div className="pt-4 border-t border-[#e8dfd5] space-y-2">
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    setIsConsultationModalOpen(true);
                  }}
                  className="w-full py-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inquire Similar Design</span>
                </button>

                <a
                  href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998'}?text=${encodeURIComponent(`Hello J.J. INTERIORS & MODUTECH, I would like to inquire about a project similar to "${activeProjectModal.title}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
