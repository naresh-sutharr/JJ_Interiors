import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { SiteVisit } from '../../types.ts';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  Search, 
  Filter,
  Check
} from 'lucide-react';

export const SiteVisitsAdminView: React.FC = () => {
  const { 
    siteVisits, 
    addSiteVisit, 
    updateSiteVisit, 
    deleteSiteVisit, 
    clients, 
    leads, 
    businessProfile,
    showToast 
  } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<SiteVisit | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Scheduled' | 'Completed' | 'Cancelled'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const initialFormData: Omit<SiteVisit, 'id' | 'createdAt'> = {
    clientName: '',
    clientPhone: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    purpose: 'Site Measurement & Floor Inspection',
    assignedPerson: 'Jay Jasol (Principal)',
    status: 'Scheduled',
    notes: '',
    followUpDate: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOpenAdd = () => {
    setEditingVisit(null);
    setFormData(initialFormData);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (v: SiteVisit) => {
    setEditingVisit(v);
    setFormData({
      leadId: v.leadId,
      clientId: v.clientId,
      clientName: v.clientName,
      clientPhone: v.clientPhone,
      address: v.address,
      date: v.date,
      time: v.time,
      purpose: v.purpose,
      assignedPerson: v.assignedPerson,
      status: v.status,
      notes: v.notes,
      followUpDate: v.followUpDate,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.clientPhone.trim()) {
      showToast('Client name and phone are required.', 'error');
      return;
    }

    if (editingVisit) {
      updateSiteVisit(editingVisit.id, formData);
      showToast('Site visit updated successfully.');
    } else {
      addSiteVisit(formData);
      showToast('Site visit scheduled successfully.');
    }
    setIsFormOpen(false);
  };

  const handleSendWhatsAppReminder = (visit: SiteVisit) => {
    const text = `Hello ${visit.clientName}, this is a reminder from *${businessProfile.businessName}* regarding our scheduled site appointment:\n\n📅 Date: ${visit.date}\n⏰ Time: ${visit.time}\n📍 Site Location: ${visit.address}\n🎯 Purpose: ${visit.purpose}\n👷 Assigned Architect: ${visit.assignedPerson}\n\nPlease let us know if you need to reschedule. Thank you!`;
    const phone = visit.clientPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredVisits = siteVisits.filter((v) => {
    if (statusFilter !== 'ALL' && v.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        v.clientName.toLowerCase().includes(q) ||
        v.clientPhone.includes(q) ||
        v.address.toLowerCase().includes(q) ||
        v.purpose.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-display text-xl text-stone-900 font-semibold">
            Site Visits &amp; Field Consultations
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Schedule on-site carpet measurements, 3D presentations, and architectural inspections.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-stone-200">
        <div className="flex items-center gap-2">
          {(['ALL', 'Scheduled', 'Completed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#1e1b18] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, phone, area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Site Visits List */}
      {filteredVisits.length === 0 ? (
        <div className="bg-white p-12 text-center border border-stone-200">
          <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 text-sm">No site visits found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVisits.map((v) => (
            <div
              key={v.id}
              className="bg-white p-5 border border-stone-200 shadow-xs hover:border-[#c5a059] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold ${
                    v.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    v.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {v.status}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(v)}
                      className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete visit for ${v.clientName}?`)) {
                          deleteSiteVisit(v.id);
                          showToast('Visit deleted');
                        }
                      }}
                      className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-display text-lg text-stone-900 font-medium">
                  {v.clientName}
                </h4>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mt-0.5">
                  <Phone className="w-3 h-3 text-[#c5a059]" />
                  <span>{v.clientPhone}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-semibold text-stone-800">{v.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{v.time}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{v.address}</span>
                  </div>

                  <div className="bg-[#faf8f5] p-2 border border-stone-200 text-[11px]">
                    <span className="font-semibold text-stone-700 block">Purpose:</span>
                    <span className="text-stone-600">{v.purpose}</span>
                  </div>

                  {v.notes && (
                    <p className="text-[11px] text-stone-500 italic">
                      "{v.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleSendWhatsAppReminder(v)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                {v.status === 'Scheduled' && (
                  <button
                    onClick={() => {
                      updateSiteVisit(v.id, { status: 'Completed' });
                      showToast('Marked as Completed');
                    }}
                    className="px-3 py-1.5 bg-[#1e1b18] hover:bg-black text-white text-[11px] uppercase font-semibold tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Mark Done</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 border border-stone-300 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl text-stone-900 pb-3 border-b border-stone-200 mb-4">
              {editingVisit ? 'Edit Site Visit' : 'Schedule Site Visit'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Client / Lead Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Patel"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 XXXXX"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Assigned Architect / Lead
                  </label>
                  <input
                    type="text"
                    value={formData.assignedPerson}
                    onChange={(e) => setFormData({ ...formData, assignedPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Site Address / Apartment *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 902, Rajhans Bellanza, Vesu, Surat"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 11:30 AM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Purpose
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="Site Measurement & Floor Inspection">Site Measurement &amp; Floor Inspection</option>
                    <option value="3D Concept & Layout Walkthrough">3D Concept &amp; Layout Walkthrough</option>
                    <option value="Material & Veneer Selection">Material &amp; Veneer Selection</option>
                    <option value="Civil & Modular Joinery Inspection">Civil &amp; Modular Joinery Inspection</option>
                    <option value="Snag List & Final Handover">Snag List &amp; Final Handover</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="RESCHEDULED">Rescheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Site Notes / Client Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="Key measurements, specific room priorities, or parking notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-600 hover:bg-stone-100 uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  {editingVisit ? 'Save Changes' : 'Schedule Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
