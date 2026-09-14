import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useSEO } from '../hooks/useSEO.ts';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  Navigation
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { businessProfile, addClient, showToast, navigateTo } = useApp();

  useSEO({
    title: 'Contact Studio | Let\'s Build Your Space',
    description: 'Get in touch with J.J. INTERIORS & MODUTECH for luxury interior architecture, turnkey execution, and factory-precision modular furniture in Surat.',
    canonical: 'https://www.jjinteriors.site/contact'
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    projectType: 'Complete Residential Turnkey (3BHK / 4BHK / Villa)',
    budgetRange: '₹20 - 35 Lakhs',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    addClient({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'not-provided@client.com',
      address: formData.address || 'Surat, Gujarat',
      city: 'Surat',
      projectType: formData.projectType,
      status: 'New',
      budgetRange: formData.budgetRange,
      measurementsNotes: `Inquiry via website contact page. Project Type: ${formData.projectType}. Scope: ${formData.notes}`,
      followUpNotes: 'Newly generated website lead. Needs introductory consultation call.',
      lastContact: new Date().toISOString().split('T')[0],
    });

    setSubmitted(true);
    showToast('Consultation request received! Our design team will contact you shortly.');
  };

  return (
    <div className="w-full bg-[#faf8f5] text-[#1e1b18]">
      
      {/* 1. Page Hero Banner */}
      <section className="relative bg-[#161412] text-[#faf8f5] py-20 sm:py-28 overflow-hidden border-b border-[#c5a059]/30">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-[#161412]/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-6">
            <button 
              type="button" 
              onClick={() => navigateTo('/')} 
              className="hover:underline cursor-pointer opacity-80 hover:opacity-100"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-500" />
            <span className="text-stone-300 font-semibold">Contact &amp; Studio</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-4">
              Direct Communication
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#fbf9f5] tracking-tight leading-[1.05] mb-6">
              Connect With <br />
              <span className="italic font-normal text-[#e8d5b8]">The Design Studio.</span>
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Schedule an in-person meeting at our Surat workshop, request an on-site structural consultation, or discuss your upcoming architectural blueprints.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-20 sm:py-28 border-b border-[#e8dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Studio Coordinates & Business Profile */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Studio Card */}
              <div className="bg-white border border-[#e8dfd5] p-8 shadow-sm">
                <h3 className="font-display text-2xl text-[#1e1b18] font-normal mb-1">
                  {businessProfile.businessName}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold mb-6">
                  Design Studio &amp; Modutech Factory
                </p>

                <div className="space-y-6 text-sm text-stone-700">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Studio &amp; Workshop Address</div>
                      <div className="text-stone-900 font-medium mt-0.5">{businessProfile.address}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{businessProfile.city}, {businessProfile.state} - {businessProfile.pin}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Direct Phone</div>
                      <a 
                        href={`tel:${businessProfile.phone.replace(/[^0-9+]/g, '')}`} 
                        className="text-stone-900 font-semibold hover:text-[#c5a059] transition-colors block mt-0.5"
                      >
                        {businessProfile.phone}
                      </a>
                      <div className="text-[11px] text-stone-500">Principal: {businessProfile.ownerName}</div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8dfd5] text-emerald-600 shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">WhatsApp Desk</div>
                      <a 
                        href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello J.J. INTERIORS & MODUTECH, I would like to inquire about interior design services.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-semibold hover:underline block mt-0.5"
                      >
                        +{businessProfile.whatsapp}
                      </a>
                      <div className="text-[11px] text-stone-500">Instant project estimation &amp; catalog</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Official Email</div>
                      <a 
                        href={`mailto:${businessProfile.email}`} 
                        className="text-stone-900 font-medium hover:text-[#c5a059] transition-colors block mt-0.5"
                      >
                        {businessProfile.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Operating Hours</div>
                      <div className="text-stone-900 font-medium mt-0.5">Monday – Saturday: 9:30 AM – 8:00 PM</div>
                      <div className="text-xs text-stone-500">Sunday: By Prior Appointment</div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-8 pt-6 border-t border-[#f0eae1] grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${businessProfile.phone.replace(/[^0-9+]/g, '')}`}
                    className="py-2.5 px-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-center text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Studio</span>
                  </a>
                  <a
                    href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello J.J. INTERIORS & MODUTECH, I would like to inquire about interior design services.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-center text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Registered Legal & Tax Details */}
              <div className="bg-[#1e1b18] text-[#faf8f5] p-6 border border-[#c5a059]/40 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ebd5b3]">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  <span>Registered Business Identity</span>
                </div>
                <div className="text-xs text-stone-300 font-light space-y-1.5 pt-1">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-stone-400">Legal Entity:</span>
                    <span className="font-medium text-white">{businessProfile.businessName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-stone-400">Principal:</span>
                    <span className="font-medium text-white">{businessProfile.ownerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-stone-400">GSTIN:</span>
                    <span className="font-mono text-[#c5a059] font-bold">{businessProfile.gstin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">PAN:</span>
                    <span className="font-mono text-stone-200">{businessProfile.panNo || 'CMPYS4786H'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Consultation Form */}
            <div className="lg:col-span-7 bg-white border border-[#e8dfd5] p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
                  Inquiry Form
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#1e1b18] font-normal mb-2">
                  Request an Architectural Consultation
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light mb-8 leading-relaxed">
                  Fill out your requirements below. Our design leads review floor plans and contact you within 24 business hours.
                </p>

                {submitted ? (
                  <div className="py-12 px-6 text-center bg-[#faf8f5] border border-[#ebd5b3] space-y-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-2xl text-[#1e1b18]">
                      Thank You, {formData.name}
                    </h4>
                    <p className="text-sm text-stone-600 max-w-md mx-auto font-light leading-relaxed">
                      Your inquiry has been directly logged into our Studio Management ERP. Founder Gopalram ji or our senior design team will reach out at <strong className="text-black">{formData.phone}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 bg-[#1e1b18] text-white text-xs uppercase tracking-wider font-semibold"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dilipbhai Patel"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. client@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Location / Society (Gujarat)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Vesu / Althan / Adajan, Surat"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Project Scope
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                        >
                          <option value="Complete Residential Turnkey (3BHK / 4BHK / Villa)">Complete Residential Turnkey</option>
                          <option value="Modular Kitchen & Modutech Solutions">Modular Kitchen &amp; Modutech</option>
                          <option value="Wardrobes & Bedroom Interior">Wardrobes &amp; Bedroom Interior</option>
                          <option value="Commercial Office / Showroom">Commercial Office / Showroom</option>
                          <option value="Living Room & False Ceiling">Living Room &amp; False Ceiling</option>
                          <option value="Architectural Consultation">Architectural Consultation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                          Estimated Budget
                        </label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                        >
                          <option value="₹5 - 10 Lakhs (Modular Kitchen / Wardrobe focus)">₹5 - 10 Lakhs</option>
                          <option value="₹10 - 20 Lakhs (Partial Home / Premium Modular)">₹10 - 20 Lakhs</option>
                          <option value="₹20 - 35 Lakhs (3BHK / 4BHK Turnkey)">₹20 - 35 Lakhs</option>
                          <option value="₹35 - 60 Lakhs (Luxury Penthouse / Villa)">₹35 - 60 Lakhs</option>
                          <option value="₹60 Lakhs+ (Ultra Luxury / Commercial)">₹60 Lakhs+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                        Specific Notes or Floor Plan Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Share your carpet area, possession date, or material preferences..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Consultation Request</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#f0eae1] flex items-center justify-between text-xs text-stone-500 font-light">
                <span>Privacy guaranteed. No unsolicited spam.</span>
                <span className="text-[#c5a059] font-medium">Turnaround: &lt;24 hours</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Location & Interactive Map Information */}
      <section className="py-16 sm:py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-[#e8dfd5] p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block">
                  Visiting The Studio
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#1e1b18] font-normal">
                  Location &amp; Workshop Directions
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  Our main studio and Modutech modular production plant are strategically located in Surat, Gujarat. Homeowners and architects are warmly invited to inspect live material swatches, German hardware tests, and sample modular carcasses.
                </p>

                <div className="space-y-2 pt-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span><strong>Landmark:</strong> Pandesara / Udhna Industrial corridor, Surat, Gujarat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span><strong>Parking:</strong> Dedicated client parking available on premises</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="https://maps.google.com/?q=Surat,+Gujarat,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Stylized Visual Map Display */}
              <div className="lg:col-span-7 aspect-[16/9] bg-[#161412] relative overflow-hidden border border-[#e8dfd5]">
                <iframe
                  title="J.J. Interiors Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709425405!2d72.75630689999999!3d21.1594627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 right-3 bg-[#1e1b18]/90 text-[#faf8f5] text-[10px] font-mono px-2.5 py-1 border border-[#c5a059]/40 tracking-wider">
                  Surat Studio &amp; Plant
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
