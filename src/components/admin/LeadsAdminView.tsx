import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Lead, LeadStatus } from '../../types.ts';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  X, 
  MessageSquare, 
  Calendar, 
  Filter, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Building2,
  Clock,
  ExternalLink
} from 'lucide-react';

export const LeadsAdminView: React.FC = () => {
  const { 
    leads, 
    addLead, 
    updateLead, 
    deleteLead, 
    convertLeadToClient, 
    navigateAdminTo, 
    showToast,
    setBillingPrefillClient,
    setEditingBill
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [convertConfirmLead, setConvertConfirmLead] = useState<Lead | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Surat',
    propertyType: '4 BHK / Penthouse',
    projectType: 'Residential Turnkey Interior',
    status: 'NEW' as LeadStatus,
    approxBudget: '₹20 - 35 Lakhs',
    source: 'Website Form' as Lead['source'],
    message: '',
    siteVisitDate: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: 'Surat',
      propertyType: '4 BHK / Penthouse',
      projectType: 'Residential Turnkey Interior',
      status: 'NEW',
      approxBudget: '₹20 - 35 Lakhs',
      source: 'Website Form',
      message: '',
      siteVisitDate: '',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (l: Lead) => {
    setEditingLead(l);
    setFormData({
      name: l.name,
      phone: l.phone,
      email: l.email || '',
      city: l.city,
      propertyType: l.propertyType || '',
      projectType: l.projectType,
      status: l.status,
      approxBudget: l.approxBudget || '',
      source: l.source,
      message: l.message || '',
      siteVisitDate: l.siteVisitDate || '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Please provide a name and contact number.', 'error');
      return;
    }

    if (editingLead) {
      updateLead(editingLead.id, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim() || 'Surat',
        propertyType: formData.propertyType,
        projectType: formData.projectType,
        status: formData.status,
        approxBudget: formData.approxBudget,
        source: formData.source,
        message: formData.message.trim(),
        siteVisitDate: formData.siteVisitDate || undefined,
      });
      showToast('Lead updated successfully.');
      setEditingLead(null);
    } else {
      addLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim() || 'Surat',
        propertyType: formData.propertyType,
        projectType: formData.projectType,
        status: formData.status,
        approxBudget: formData.approxBudget,
        source: formData.source,
        message: formData.message.trim(),
        siteVisitDate: formData.siteVisitDate || undefined,
      });
      showToast('New lead added to CRM.');
      setIsAddModalOpen(false);
    }
  };

  const handleConvert = (lead: Lead) => {
    const newClient = convertLeadToClient(lead.id);
    setConvertConfirmLead(null);
    if (newClient) {
      showToast(`Lead converted! Created client profile for "${newClient.name}".`);
      // Offer immediate transition
      setTimeout(() => {
        navigateAdminTo('clients', newClient.id, 'client');
      }, 500);
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchesSource = sourceFilter === 'ALL' || l.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  // KPI Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'NEW').length;
  const siteVisits = leads.filter((l) => l.status === 'SITE VISIT').length;
  const convertedWon = leads.filter((l) => l.status === 'WON').length;

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'CONTACTED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'CONSULTATION':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'SITE VISIT':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'PROPOSAL SENT':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'NEGOTIATION':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'WON':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'LOST':
        return 'bg-stone-100 text-stone-700 border-stone-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#c5a059]/10 text-[#c5a059] rounded-none">
              <UserCheck className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                Inquiries &amp; Lead Management
              </h1>
              <p className="text-xs text-stone-500">
                Track incoming design inquiries, schedule site visits, and convert leads into active clients.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add In-Person Lead</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
              Total Inquiries
            </div>
            <div className="text-2xl font-bold text-stone-900 mt-1">
              {totalLeads}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 border border-amber-200 bg-amber-50/20 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-amber-700 font-semibold">
              New Inquiries
            </div>
            <div className="text-2xl font-bold text-amber-900 mt-1">
              {newLeads}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            {newLeads}
          </div>
        </div>

        <div className="bg-white p-4 border border-purple-200 bg-purple-50/20 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-purple-700 font-semibold">
              Site Visits
            </div>
            <div className="text-2xl font-bold text-purple-900 mt-1">
              {siteVisits}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 border border-emerald-200 bg-emerald-50/20 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold">
              Won / Converted
            </div>
            <div className="text-2xl font-bold text-emerald-900 mt-1">
              {convertedWon}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 border border-stone-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 focus:bg-white focus:border-[#c5a059] focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span>Status:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#c5a059]"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New (Needs Callback)</option>
            <option value="CONTACTED">Contacted</option>
            <option value="CONSULTATION">Consultation</option>
            <option value="SITE VISIT">Site Visit</option>
            <option value="PROPOSAL SENT">Proposal Sent</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="WON">Won (Converted)</option>
            <option value="LOST">Lost</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#c5a059]"
          >
            <option value="ALL">All Sources</option>
            <option value="Website Form">Website Form</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Referral">Referral</option>
          </select>
        </div>

      </div>

      {/* 4. Leads Table / Card View */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white border border-stone-200 p-12 text-center shadow-xs">
          <UserCheck className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-stone-700 font-medium text-sm">No Leads Found</h3>
          <p className="text-stone-400 text-xs mt-1">
            Try adjusting your search query or status filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setSourceFilter('ALL'); }}
            className="mt-4 px-3 py-1.5 bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-[10.5px] uppercase tracking-wider text-stone-500 font-semibold">
                  <th className="py-3 px-4">Lead Contact</th>
                  <th className="py-3 px-4">Requirement &amp; Scope</th>
                  <th className="py-3 px-4">Budget &amp; Source</th>
                  <th className="py-3 px-4">Pipeline Status</th>
                  <th className="py-3 px-4">Date / Visit</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');

                  return (
                    <tr key={lead.id} className="hover:bg-stone-50/70 transition-colors">
                      {/* Contact Column */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                          <span>{lead.name}</span>
                          {lead.status === 'NEW' && (
                            <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[9px] font-bold uppercase rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-stone-500 text-[11px] mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#c5a059]" />
                            <a href={`tel:${lead.phone}`} className="hover:underline text-stone-700">
                              {lead.phone}
                            </a>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            <span>{lead.city}</span>
                          </span>
                        </div>
                        {lead.email && (
                          <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                      </td>

                      {/* Requirement */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-medium text-stone-800">
                          {lead.projectType}
                        </div>
                        {lead.propertyType && (
                          <div className="text-[11px] text-stone-500">
                            {lead.propertyType}
                          </div>
                        )}
                        {lead.message && (
                          <div className="text-[11px] text-stone-400 italic line-clamp-1 mt-0.5">
                            "{lead.message}"
                          </div>
                        )}
                      </td>

                      {/* Budget & Source */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#1e1b18]">
                          {lead.approxBudget || 'Undisclosed'}
                        </div>
                        <div className="mt-1">
                          <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-[10px] uppercase font-semibold text-stone-600 rounded">
                            {lead.source}
                          </span>
                        </div>
                      </td>

                      {/* Status Selector Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as LeadStatus;
                            updateLead(lead.id, { status: newStatus });
                            showToast(`Status updated to ${newStatus}`);
                          }}
                          className={`px-2 py-1 text-[11px] font-semibold uppercase tracking-wider border rounded cursor-pointer ${getStatusBadge(lead.status)}`}
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="CONSULTATION">Consultation</option>
                          <option value="SITE VISIT">Site Visit</option>
                          <option value="PROPOSAL SENT">Proposal Sent</option>
                          <option value="NEGOTIATION">Negotiation</option>
                          <option value="WON">Won</option>
                          <option value="LOST">Lost</option>
                        </select>
                      </td>

                      {/* Date & Site Visit */}
                      <td className="py-3.5 px-4">
                        <div className="text-[11px] text-stone-500 font-mono">
                          Created: {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                        </div>
                        {lead.siteVisitDate && (
                          <div className="text-[11px] text-purple-700 font-semibold flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>Visit: {lead.siteVisitDate}</span>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Direct WhatsApp Call */}
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${lead.name}, regarding your interior design inquiry with J.J. INTERIORS & MODUTECH...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          {/* Convert to Client Button */}
                          {lead.status !== 'WON' ? (
                            <button
                              onClick={() => setConvertConfirmLead(lead)}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                              title="Convert this Lead into a Client"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Convert</span>
                            </button>
                          ) : (
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold uppercase">
                              Client Created
                            </span>
                          )}

                          {/* Edit Lead */}
                          <button
                            onClick={() => handleOpenEdit(lead)}
                            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                            title="Edit Lead"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Lead */}
                          <button
                            onClick={() => setDeleteConfirmId(lead.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Add / Edit Lead Modal */}
      {(isAddModalOpen || editingLead) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            <div className="p-4 bg-stone-900 text-white flex justify-between items-center shrink-0">
              <h3 className="font-display text-lg">
                {editingLead ? 'Edit Lead Details' : 'Record New Lead / Inquiry'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingLead(null); }}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Client / Lead Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshi Desai"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
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
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
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
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    City / Area
                  </label>
                  <input
                    type="text"
                    placeholder="Surat / Vesu / Adajan"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Property Configuration
                  </label>
                  <input
                    type="text"
                    placeholder="3 BHK / 4 BHK Villa / Office"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="Residential Turnkey Interior">Residential Turnkey Interior</option>
                    <option value="Modular Kitchen & Modutech">Modular Kitchen &amp; Modutech</option>
                    <option value="Wardrobes & Dressing Suites">Wardrobes &amp; Dressing Suites</option>
                    <option value="Commercial Office / Workspace">Commercial Office / Workspace</option>
                    <option value="Living & Bedroom Makeover">Living &amp; Bedroom Makeover</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Approx Budget
                  </label>
                  <input
                    type="text"
                    placeholder="₹15 - 25 Lakhs"
                    value={formData.approxBudget}
                    onChange={(e) => setFormData({ ...formData, approxBudget: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Inquiry Source
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="Website Form">Website Form</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Walk-in">Walk-in Studio</option>
                    <option value="Referral">Client Referral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Lead Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CONSULTATION">Consultation</option>
                    <option value="SITE VISIT">Site Visit</option>
                    <option value="PROPOSAL SENT">Proposal Sent</option>
                    <option value="NEGOTIATION">Negotiation</option>
                    <option value="WON">Won (Converted to Client)</option>
                    <option value="LOST">Lost</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Scheduled Site Visit Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.siteVisitDate}
                  onChange={(e) => setFormData({ ...formData, siteVisitDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Requirements &amp; Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Specific room requirements, possession timeline, interior taste..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setEditingLead(null); }}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {editingLead ? 'Update Lead' : 'Create Lead'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 6. Convert Lead to Client Confirmation Modal */}
      {convertConfirmLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md border border-stone-200 p-6 shadow-2xl space-y-4 my-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="font-display text-xl text-stone-900">
                Convert Lead to Client
              </h3>
              <p className="text-stone-600 text-xs mt-1">
                This will promote <strong>{convertConfirmLead.name}</strong> into your active client database, mark this lead as <span className="text-emerald-700 font-bold">WON</span>, and make them available for GST quotations and project invoicing.
              </p>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 text-xs space-y-1">
              <div><strong>Name:</strong> {convertConfirmLead.name}</div>
              <div><strong>Phone:</strong> {convertConfirmLead.phone}</div>
              <div><strong>City:</strong> {convertConfirmLead.city}</div>
              <div><strong>Project:</strong> {convertConfirmLead.projectType}</div>
              <div><strong>Budget:</strong> {convertConfirmLead.approxBudget}</div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConvertConfirmLead(null)}
                className="flex-1 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConvert(convertConfirmLead)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Yes, Convert to Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm border border-stone-200 p-6 shadow-2xl space-y-4 my-auto">
            <h3 className="font-display text-lg text-stone-900">Delete Lead?</h3>
            <p className="text-stone-600 text-xs">
              Are you sure you want to permanently delete this lead inquiry from the system?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 border border-stone-300 text-stone-700 text-xs font-semibold uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteLead(deleteConfirmId);
                  setDeleteConfirmId(null);
                  showToast('Lead deleted.');
                }}
                className="flex-1 py-2 bg-rose-600 text-white text-xs font-semibold uppercase hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
