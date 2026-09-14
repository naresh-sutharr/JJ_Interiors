import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Client } from '../../types.ts';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Edit2, 
  Trash2, 
  FileText, 
  Receipt, 
  X, 
  Check, 
  Calendar, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ClientsView: React.FC = () => {
  const { 
    clients, 
    addClient, 
    updateClient, 
    deleteClient, 
    bills, 
    setAdminTab, 
    setBillingPrefillClient, 
    setEditingBill, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClientDetail, setSelectedClientDetail] = useState<Client | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Surat',
    projectType: 'Residential Turnkey Interior',
    status: 'New' as 'New' | 'Active' | 'Completed' | 'Inactive',
    budgetRange: '₹20 - 30 Lakhs',
    measurementsNotes: '',
    followUpNotes: '',
    lastContact: new Date().toISOString().split('T')[0],
  });

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: 'Surat',
      projectType: 'Residential Turnkey Interior',
      status: 'New',
      budgetRange: '₹20 - 30 Lakhs',
      measurementsNotes: '',
      followUpNotes: '',
      lastContact: new Date().toISOString().split('T')[0],
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (c: Client) => {
    setEditingClient(c);
    setFormData({
      name: c.name,
      phone: c.phone,
      email: c.email,
      address: c.address,
      city: c.city,
      projectType: c.projectType,
      status: c.status,
      budgetRange: c.budgetRange || '',
      measurementsNotes: c.measurementsNotes || '',
      followUpNotes: c.followUpNotes || '',
      lastContact: c.lastContact,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Client name and phone number are required.', 'error');
      return;
    }

    if (editingClient) {
      updateClient(editingClient.id, formData);
      setEditingClient(null);
    } else {
      addClient(formData);
      setIsAddModalOpen(false);
    }
    resetForm();
  };

  const handleGenerateBillForClient = (client: Client) => {
    setBillingPrefillClient(client);
    setEditingBill(null);
    setAdminTab('billing');
  };

  // Filtered Clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || client.status.toUpperCase() === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & CRM Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Clients &amp; CRM Pipeline
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage inquiries, project specifications, measurement logs, and billing histories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 border border-[#e2dcd4]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by client name, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-800 focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'NEW', 'ACTIVE', 'COMPLETED', 'INACTIVE'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-[#1e1b18] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards / Table List */}
      <div className="space-y-3">
        {filteredClients.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#e2dcd4] text-stone-500 text-xs">
            No clients found matching the query. Click "+ Add New Client" to register an inquiry.
          </div>
        ) : (
          filteredClients.map((client) => {
            // Find linked documents for stats
            const clientBills = bills.filter((b) => b.clientId === client.id);
            const totalBilled = clientBills.reduce((acc, b) => acc + b.grandTotal, 0);
            const totalOutstanding = clientBills.reduce((acc, b) => acc + b.balanceDue, 0);

            return (
              <div
                key={client.id}
                className="bg-white p-5 border border-[#e2dcd4] hover:border-[#c5a059] transition-all rounded shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Left: Client Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSelectedClientDetail(client)}
                      className="text-base font-bold text-[#1e1b18] hover:text-[#c5a059] text-left cursor-pointer transition-colors"
                    >
                      {client.name}
                    </button>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      client.status === 'New'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : client.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : client.status === 'Completed'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {client.status}
                    </span>
                  </div>

                  <div className="text-xs text-stone-600 font-medium">
                    {client.projectType} • <span className="text-stone-400">Budget: {client.budgetRange || 'Flexible'}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#c5a059]" />
                      {client.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#c5a059]" />
                      {client.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#c5a059]" />
                      {client.address}, {client.city}
                    </span>
                  </div>
                </div>

                {/* Middle: Financial & Document Summary */}
                <div className="flex items-center gap-6 px-4 py-2 bg-[#faf8f5] border border-stone-200 rounded text-center self-stretch md:self-auto justify-between md:justify-start">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-500">Total Billed</div>
                    <div className="text-xs font-bold text-stone-900 mt-0.5">
                      ₹{totalBilled.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="w-[1px] h-8 bg-stone-300"></div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-500">Outstanding Due</div>
                    <div className={`text-xs font-bold mt-0.5 ${totalOutstanding > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
                      ₹{totalOutstanding.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="w-[1px] h-8 bg-stone-300"></div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-500">Bills</div>
                    <div className="text-xs font-bold text-stone-800 mt-0.5">
                      {clientBills.length} docs
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    onClick={() => handleGenerateBillForClient(client)}
                    className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#d4b26f] text-[#141210] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                    title="Generate quotation or invoice for this client"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Bill Client</span>
                  </button>

                  <button
                    onClick={() => setSelectedClientDetail(client)}
                    className="p-2 text-stone-600 hover:text-[#1e1b18] hover:bg-stone-100 rounded border border-stone-200"
                    title="View Profile Dossier"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenEdit(client)}
                    className="p-2 text-stone-600 hover:text-[#1e1b18] hover:bg-stone-100 rounded border border-stone-200"
                    title="Edit Client"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(client.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded border border-stone-200"
                    title="Delete Client"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Client Detail Profile Dossier Drawer/Modal */}
      {selectedClientDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-3xl bg-white text-[#1e1b18] shadow-2xl border border-[#c5a059]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col rounded">
            
            {/* Header */}
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#c5a059] text-black">
                    {selectedClientDetail.status}
                  </span>
                  <span className="text-xs text-stone-400">
                    Created: {selectedClientDetail.createdAt} • Last Contact: {selectedClientDetail.lastContact}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-light text-white">
                  {selectedClientDetail.name}
                </h2>
                <div className="text-xs text-stone-300">
                  {selectedClientDetail.projectType}
                </div>
              </div>

              <button
                onClick={() => setSelectedClientDetail(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 space-y-6 flex-1">
              
              {/* Contact grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#faf8f5] border border-stone-200 rounded">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Phone Number</div>
                  <div className="text-xs font-semibold text-stone-900 mt-0.5">{selectedClientDetail.phone}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Email</div>
                  <div className="text-xs font-semibold text-stone-900 mt-0.5">{selectedClientDetail.email}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Site Location</div>
                  <div className="text-xs font-semibold text-stone-900 mt-0.5">{selectedClientDetail.address}, {selectedClientDetail.city}</div>
                </div>
              </div>

              {/* Site Measurements & Notes */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-700 mb-2">
                  Site Measurements &amp; Architectural Notes
                </h4>
                <div className="p-3.5 bg-white border border-stone-200 rounded text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                  {selectedClientDetail.measurementsNotes || 'No specific site dimensions entered yet.'}
                </div>
              </div>

              {/* Follow-up Notes */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-700 mb-2">
                  Follow-up Log &amp; Client Communication
                </h4>
                <div className="p-3.5 bg-white border border-stone-200 rounded text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                  {selectedClientDetail.followUpNotes || 'No follow-up notes logged yet.'}
                </div>
              </div>

              {/* Linked Quotations & Invoices */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-stone-700">
                    Billing Documents ({bills.filter(b => b.clientId === selectedClientDetail.id).length})
                  </h4>
                  <button
                    onClick={() => {
                      const c = selectedClientDetail;
                      setSelectedClientDetail(null);
                      handleGenerateBillForClient(c);
                    }}
                    className="text-xs font-bold text-[#c5a059] hover:underline"
                  >
                    + Create New Bill
                  </button>
                </div>

                <div className="space-y-2">
                  {bills.filter(b => b.clientId === selectedClientDetail.id).length === 0 ? (
                    <div className="p-4 text-center text-xs text-stone-500 border border-dashed border-stone-300 rounded">
                      No quotation or invoice issued for this client yet.
                    </div>
                  ) : (
                    bills.filter(b => b.clientId === selectedClientDetail.id).map((b) => (
                      <div
                        key={b.id}
                        className="p-3 bg-stone-50 border border-stone-200 rounded flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-stone-900">{b.docNumber} ({b.type})</div>
                          <div className="text-stone-500">Date: {b.date} • Total: ₹{b.grandTotal.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            b.paymentStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {b.paymentStatus}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedClientDetail(null);
                              setEditingBill(b);
                              setAdminTab('bills-history');
                            }}
                            className="text-xs font-bold text-[#1e1b18] hover:underline"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedClientDetail(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const c = selectedClientDetail;
                  setSelectedClientDetail(null);
                  handleOpenEdit(c);
                }}
                className="px-4 py-2 bg-[#1e1b18] text-white rounded text-xs font-semibold uppercase tracking-wider"
              >
                Edit Details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add / Edit Client Modal */}
      {(isAddModalOpen || editingClient) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-lg bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <h3 className="font-display text-xl font-normal text-white">
                {editingClient ? 'Edit Client Record' : 'Register New Client / Lead'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingClient(null);
                }}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh K. Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="New">New Lead</option>
                    <option value="Active">Active Project</option>
                    <option value="Completed">Completed</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    placeholder="4BHK Interior, Modular Kitchen, etc."
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Address / Society
                  </label>
                  <input
                    type="text"
                    placeholder="A-902, Vesu Heights"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    placeholder="₹20 - 30 Lakhs"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Site Measurements &amp; Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Ceiling height, beam locations, material preferences..."
                  value={formData.measurementsNotes}
                  onChange={(e) => setFormData({ ...formData, measurementsNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Follow-up Communication Log
                </label>
                <textarea
                  rows={2}
                  placeholder="Next meeting date, quotation shared notes..."
                  value={formData.followUpNotes}
                  onChange={(e) => setFormData({ ...formData, followUpNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingClient(null);
                  }}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {editingClient ? 'Save Changes' : 'Create Client'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-white p-6 max-w-sm w-full rounded border border-rose-300 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-bold text-base text-stone-900">Confirm Deletion</h4>
            </div>
            <p className="text-xs text-stone-600">
              Are you sure you want to remove this client from the CRM? All contact logs and measurement notes will be deleted.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded text-xs font-semibold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteClient(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold uppercase"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
