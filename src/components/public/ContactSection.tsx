import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowUpRight 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { businessProfile, addClient, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    projectType: 'Residential Interiors',
    budgetRange: '₹20 - 30 Lakhs',
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
      address: 'Not Provided',
      city: 'Surat',
      projectType: formData.projectType,
      status: 'New',
      budgetRange: formData.budgetRange,
      measurementsNotes: `Property Type: ${formData.propertyType}. Message: ${formData.notes}`,
      followUpNotes: 'Newly generated website lead. Needs introductory consultation call.',
      lastContact: new Date().toISOString().split('T')[0],
    });

    const whatsappNumber = "918764361145";
    const text = `New Consultation Request:%0A- Name: ${formData.name}%0A- Phone: ${formData.phone}%0A- Email: ${formData.email || 'N/A'}%0A- Property: ${formData.propertyType || 'N/A'}%0A- Project Type: ${formData.projectType}%0A- Budget: ${formData.budgetRange}%0A- Message: ${formData.notes || 'N/A'}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    showToast('Redirecting to WhatsApp to complete your request...');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a059] block mb-2">
            Initiate Your Project
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#1e1b18] tracking-tight">
            Schedule a Private Consultation
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Visit our Surat design studio, request an on-site architectural survey, or discuss your modular requirements.
          </p>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-6" />
        </div>

        {/* Two-Column Grid: Contact Information & Real Lead Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Studio Coordinates & Quick Actions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-[#e8dfd5] p-8 shadow-sm">
              <h3 className="font-display text-2xl text-[#1e1b18] font-normal mb-1">
                {businessProfile.businessName}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-6">
                Studio &amp; Modutech Workshop
              </p>

              <div className="space-y-5 text-sm text-stone-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Address</div>
                    <div className="text-stone-800 font-medium mt-0.5">{businessProfile.address}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{businessProfile.city}, {businessProfile.state} - {businessProfile.pin}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Direct Call</div>
                    <div className="text-stone-800 font-medium mt-0.5">{businessProfile.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">WhatsApp Business</div>
                    <div className="text-stone-800 font-medium mt-0.5">{businessProfile.whatsapp}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Email</div>
                    <div className="text-stone-800 font-medium mt-0.5">{businessProfile.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#faf8f5] border border-[#e8dfd5] text-[#c5a059] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Studio Hours</div>
                    <div className="text-stone-800 font-medium mt-0.5">{businessProfile.businessHours}</div>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="mt-8 pt-6 border-t border-[#e8dfd5] flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${businessProfile.phone.replace(/[^0-9+]/g, '') || '+919898412998'}`}
                  className="flex-1 py-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] text-xs uppercase tracking-widest font-semibold text-center transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998'}?text=${encodeURIComponent('Hello J.J. INTERIORS & MODUTECH, I would like to book a consultation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold text-center transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const form = document.querySelector('form');
                    form?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 bg-[#c5a059] hover:bg-[#d4b06a] text-black text-xs uppercase tracking-widest font-semibold text-center transition-all flex items-center justify-center gap-2"
                >
                  <span>GET A QUOTE</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const form = document.querySelector('form');
                    form?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 bg-transparent hover:bg-black/5 text-[#1e1b18] border border-[#1e1b18] text-xs uppercase tracking-widest font-semibold text-center transition-all flex items-center justify-center gap-2"
                >
                  <span>BOOK A CONSULTATION</span>
                </button>
              </div>
            </div>

            {/* Google Maps / Location Preview Box */}
            <div className="p-5 bg-[#f5f0e8] border border-[#e8dfd5] flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#1e1b18]">
                  Studio &amp; Modutech Workshop
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Vadodara / Surat, Gujarat, India
                </div>
              </div>
              <a
                href={businessProfile.googleMapsUrl || "https://maps.google.com/?q=Gujarat,India"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-[#1e1b18] text-[#1e1b18] hover:text-white border border-[#d8cec2] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>View Map</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Lead Booking Form */}
          <div className="lg:col-span-7 bg-white border border-[#e8dfd5] p-8 sm:p-10 shadow-sm relative">
            <h3 className="font-display text-2xl sm:text-3xl text-[#1e1b18] font-normal mb-2">
              Request a Design Consultation &amp; Estimate
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm font-light mb-8">
              Fill in your spatial details and our principal architect will reach out with initial feasibility and budget guidelines.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display text-2xl text-[#1e1b18]">Consultation Request Registered</h4>
                <p className="text-stone-600 text-sm max-w-md mx-auto font-light">
                  Thank you, <strong>{formData.name}</strong>. Your project details have been assigned to our Surat design team. We will call you within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      propertyType: '',
                      projectType: 'Residential Interiors',
                      budgetRange: '₹20 - 30 Lakhs',
                      notes: '',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#1e1b18] text-white text-xs uppercase tracking-widest font-semibold cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98250 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rajesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Property Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3BHK Apartment / Villa / Commercial"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                    >
                      <option value="Complete Residential Turnkey (3BHK / 4BHK / Villa)">Complete Residential Turnkey</option>
                      <option value="Modular Kitchen & Modutech Solutions">Modular Kitchen &amp; Modutech Solutions</option>
                      <option value="Wardrobes & Walk-in Closets">Wardrobes &amp; Walk-in Closets</option>
                      <option value="Commercial Office / Diamond Studio">Commercial Office / Diamond Studio</option>
                      <option value="Living & Dining Renovation">Living &amp; Dining Renovation</option>
                      <option value="Other Custom Architecture">Other Custom Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Approximate Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                    >
                      <option value="Less than ₹10 Lakhs">Less than ₹10 Lakhs</option>
                      <option value="₹10 - 20 Lakhs (Partial Home / Premium Modular)">₹10 - 20 Lakhs</option>
                      <option value="₹20 - 35 Lakhs (3BHK / 4BHK Turnkey)">₹20 - 35 Lakhs</option>
                      <option value="₹35 - 60 Lakhs (Luxury Penthouse / Villa)">₹35 - 60 Lakhs</option>
                      <option value="₹60 Lakhs+ (Ultra Luxury / Commercial)">₹60 Lakhs+</option>
                      <option value="Custom Budget">Custom Budget</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us more about your project needs..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] transition-colors"
                  ></textarea>
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

        </div>

      </div>
    </section>
  );
};
