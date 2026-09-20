import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ImageUploadControl } from '../common/ImageUploadControl.tsx';
import { 
  Building2, 
  Save, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Sparkles, 
  Check, 
  ExternalLink,
  Info
} from 'lucide-react';

export const BusinessProfileView: React.FC = () => {
  const { businessProfile, updateBusinessProfile, showToast, setViewMode } = useApp();

  const [formData, setFormData] = useState({ ...businessProfile });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessProfile(formData);
    setIsEditing(false);
    showToast('Business profile updated! Public website now reflects new details.');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Central Business Profile
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Single source of truth for business contact details, founder identity, and public site credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('public')}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={() => {
                setFormData({ ...businessProfile });
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Info Callout */}
      <div className="p-4 bg-amber-50 border-l-4 border-[#c5a059] rounded text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold">Owner Name &amp; Contact Notice:</div>
          <p>
            You can customize the <strong>Owner Name</strong>, phone number, and Surat address below. All changes immediately sync across both the public landing page and generated invoices.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className={`bg-white p-6 sm:p-8 border ${isEditing ? 'border-[#c5a059] ring-1 ring-[#c5a059]/20' : 'border-[#e2dcd4]'} shadow-sm space-y-6 transition-colors`}>
        
        <fieldset disabled={!isEditing} className="space-y-8 group">
          {/* Brand & Identity */}
          <div className={!isEditing ? 'opacity-80 grayscale-[20%]' : ''}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>Brand &amp; Legal Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Full Business Legal Name *
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-bold text-stone-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Display Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-bold text-stone-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Tagline / Motto
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploadControl
                label="Custom Logo URL (Public site override)"
                value={formData.logoUrl || ''}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                placeholder="Leave blank to use default text logo"
              />
            </div>


          </div>
        </div>

        {/* Payment & Bank Details */}
        <div className={!isEditing ? 'opacity-80 grayscale-[20%]' : ''}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#c5a059]" />
            <span>Payment &amp; Bank Coordinates</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                UPI / GPay ID *
              </label>
              <input
                type="text"
                value={formData.upiId || ''}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploadControl
                label="UPI QR Code Image URL"
                value={formData.upiQrUrl || ''}
                onChange={(url) => setFormData({ ...formData, upiQrUrl: url })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bankDetails?.bankName || ''}
                onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, bankName: e.target.value } as any })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Account Name
              </label>
              <input
                type="text"
                value={formData.bankDetails?.accountName || ''}
                onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, accountName: e.target.value } as any })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={formData.bankDetails?.accountNumber || ''}
                onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, accountNumber: e.target.value } as any })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-mono text-stone-900"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                value={formData.bankDetails?.ifscCode || ''}
                onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, ifscCode: e.target.value } as any })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-mono text-stone-900"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                value={formData.bankDetails?.branch || ''}
                onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, branch: e.target.value } as any })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>
          </div>
        </div>

        {/* Founder / Owner Identity */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#c5a059]" />
            <span>Founder &amp; Leadership Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-amber-900 mb-1 flex items-center justify-between">
                <span>Owner / Founder Name *</span>
                <span className="text-[10px] text-amber-700 font-normal">(Publicly displayed)</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mukesh Suthar (Founder)"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-amber-300 rounded text-xs font-bold text-stone-900 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Designation / Title
              </label>
              <input
                type="text"
                value={formData.ownerDesignation}
                onChange={(e) => setFormData({ ...formData, ownerDesignation: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div>
              <ImageUploadControl
                label="Owner Photo URL"
                value={formData.ownerPhoto || ''}
                onChange={(url) => setFormData({ ...formData, ownerPhoto: url })}
                placeholder="https://..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Founder Bio &amp; Architectural Philosophy
              </label>
              <textarea
                rows={3}
                value={formData.ownerBio}
                onChange={(e) => setFormData({ ...formData, ownerBio: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Contact Coordinates & Surat Studio */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Studio Location &amp; Contact Coordinates</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Primary Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                WhatsApp Business Number *
              </label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Studio Working Hours
              </label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Physical Studio Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                City &amp; State
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
                />
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Google Maps Direct Link
              </label>
              <input
                type="url"
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>
          </div>
        </div>

        </fieldset>

        {/* Save Bar */}
        {isEditing && (
          <div className="pt-4 border-t border-stone-200 flex justify-end gap-3 animate-fade-in">
            <button
              type="button"
              onClick={() => {
                setFormData({ ...businessProfile });
                setIsEditing(false);
              }}
              className="px-6 py-3 bg-stone-100 text-stone-700 hover:bg-stone-200 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-bold uppercase tracking-widest transition-all shadow flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile &amp; Update Site</span>
            </button>
          </div>
        )}

      </form>

    </div>
  );
};
