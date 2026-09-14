import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { 
    isConsultationModalOpen, 
    setIsConsultationModalOpen, 
    consultationPrefill,
    addLead, 
    showToast, 
    businessProfile,
    recordConsultationRequest,
    recordWhatsAppClick
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    projectType: 'Residential Turnkey Interior',
    propertyType: '4 BHK / Penthouse',
    budgetRange: '₹20 - 35 Lakhs',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync prefill if provided
  useEffect(() => {
    if (consultationPrefill) {
      setFormData((prev) => ({
        ...prev,
        projectType: consultationPrefill.serviceName || prev.projectType,
        notes: consultationPrefill.projectName 
          ? `Enquiring about similar design to: ${consultationPrefill.projectName}${consultationPrefill.projectUrl ? ` (${consultationPrefill.projectUrl})` : ''}` 
          : prev.notes
      }));
    }
  }, [consultationPrefill]);

  if (!isConsultationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    const leadSource = consultationPrefill?.projectName ? `Case Study: ${consultationPrefill.projectName}` : 'Website Form';

    addLead({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: formData.address.trim() || 'Surat',
      projectType: formData.projectType,
      propertyType: formData.propertyType,
      status: 'NEW',
      approxBudget: formData.budgetRange,
      source: leadSource,
      message: formData.notes.trim(),
    });

    recordConsultationRequest(leadSource);
    setSubmitted(true);
    showToast('Consultation request recorded! Our design team will contact you shortly.');
  };

  const handleWhatsAppDirect = () => {
    recordWhatsAppClick();
    const query = consultationPrefill?.projectName 
      ? `Hello J.J. INTERIORS & MODUTECH, I would like to book a consultation regarding project "${consultationPrefill.projectName}". My name is ${formData.name || 'Client'}.`
      : `Hello J.J. INTERIORS & MODUTECH, I would like to book an interior architecture consultation. My name is ${formData.name || 'Client'}.`;
    const phone = businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
      <div className="relative w-full max-w-lg bg-[#faf8f5] text-[#1e1b18] shadow-2xl border border-[#c5a059]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8dfd5] bg-white flex justify-between items-center shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c5a059] block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>Direct Studio Inquiry</span>
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-[#1e1b18] font-normal">
              Book a Free Consultation
            </h3>
          </div>

          <button
            onClick={() => setIsConsultationModalOpen(false)}
            className="p-2 text-stone-400 hover:text-[#1e1b18] hover:bg-stone-100 rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prefill Banner */}
        {consultationPrefill?.projectName && (
          <div className="bg-[#ebd5b3]/30 px-5 py-2.5 border-b border-[#ebd5b3] flex items-center justify-between text-xs text-[#1e1b18]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-stone-500 font-medium">Referencing project:</span>
              <span className="font-semibold text-black truncate">{consultationPrefill.projectName}</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#c5a059] text-black px-1.5 py-0.5 font-bold">Similar Layout</span>
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl text-[#1e1b18]">Thank You, {formData.name}</h4>
              <p className="text-stone-600 text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed">
                Your consultation request has been queued. Our studio design team will review your requirements and reach out within 2 business hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleWhatsAppDirect}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
                <button
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="flex-1 py-3 bg-[#1e1b18] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshi Desai"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Project Scope
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-xs text-[#1e1b18]"
                  >
                    <option value="Residential Interior Design">Residential Turnkey</option>
                    <option value="Modular Kitchen & Modutech">Modular Kitchen</option>
                    <option value="Wardrobes & Dressing">Wardrobes &amp; Closets</option>
                    <option value="Living & Bedroom Makeover">Living &amp; Bedroom</option>
                    <option value="Commercial Office / Workspace">Commercial Office</option>
                    <option value="Architectural Renovation">Complete Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Location in Surat
                  </label>
                  <input
                    type="text"
                    placeholder="Vesu, Piplod, Pal, Adajan, etc."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Estimated Budget Bracket
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-xs text-[#1e1b18]"
                >
                  <option value="₹10 - 20 Lakhs">₹10 - 20 Lakhs (Essential Turnkey)</option>
                  <option value="₹20 - 35 Lakhs">₹20 - 35 Lakhs (Premium Standard)</option>
                  <option value="₹35 - 60 Lakhs">₹35 - 60 Lakhs (Luxury Residential)</option>
                  <option value="₹60 Lakhs+">₹60 Lakhs+ (Ultra Luxury / Villa)</option>
                  <option value="To Be Discussed">To Be Discussed</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Project Notes &amp; Specific Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="Floor size, possession month, or reference project details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-xs text-[#1e1b18]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Consultation Request</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
