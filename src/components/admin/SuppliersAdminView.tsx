import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Supplier } from '../../types.ts';
import { formatIndianCurrency } from '../../utils/numberToWords.ts';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  MessageSquare,
  Package
} from 'lucide-react';

export const SuppliersAdminView: React.FC = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, showToast } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const vendorCategories = [
    'Modular Hardware & Fittings',
    'Veneer & Timber Ply',
    'Quartz, Corian & Natural Stone',
    'Architectural Glass & Mirrors',
    'Lighting & Automation',
    'Fabrics & Soft Furnishings',
    'Paints & Wall Finishes'
  ];

  const initialFormData: Omit<Supplier, 'id' | 'createdAt'> = {
    name: '',
    category: 'Modular Hardware & Fittings',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    gstin: '',
    paymentTerms: '30 Days Credit',
    outstandingBalance: 0,
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOpenAdd = () => {
    setEditingSupplier(null);
    setFormData(initialFormData);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (sup: Supplier) => {
    setEditingSupplier(sup);
    setFormData({
      name: sup.name,
      category: sup.category,
      contactPerson: sup.contactPerson,
      phone: sup.phone,
      email: sup.email,
      address: sup.address,
      gstin: sup.gstin,
      paymentTerms: sup.paymentTerms,
      outstandingBalance: sup.outstandingBalance,
      notes: sup.notes,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Vendor company name and phone are required.', 'error');
      return;
    }

    if (editingSupplier) {
      updateSupplier(editingSupplier.id, formData);
      showToast('Supplier updated successfully.');
    } else {
      addSupplier(formData);
      showToast('Supplier added successfully.');
    }
    setIsFormOpen(false);
  };

  const filteredSuppliers = suppliers.filter((s) => {
    if (categoryFilter !== 'ALL' && s.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        (s.contactPerson || '').toLowerCase().includes(q) ||
        (s.gstin || '').toLowerCase().includes(q) ||
        (s.address || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalOutstanding = suppliers.reduce((sum, s) => sum + (s.outstandingBalance || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-display text-xl text-stone-900 font-semibold">
            Suppliers &amp; Material Vendors
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage authorized brand distributors for Blum, Hettich, Hafele, marine ply, veneers, and fabricators.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vendor</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Active Trade Suppliers
          </span>
          <div className="text-2xl font-mono font-bold text-stone-900">
            {suppliers.length} Partners
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Approved Gujarat &amp; Mumbai distributors
          </span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Total Outstanding Payables
          </span>
          <div className="text-2xl font-mono font-bold text-amber-800">
            ₹{formatIndianCurrency(totalOutstanding)}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Across running credit lines
          </span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Primary Disciplines
          </span>
          <div className="text-sm font-medium text-stone-800 mt-1">
            Hardware, Marine Ply, Veneers, Quartz Stone
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            European &amp; National Grade
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-stone-200">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-700 focus:outline-none"
        >
          <option value="ALL">All Vendor Disciplines</option>
          {vendorCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vendor name, person, GSTIN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      {filteredSuppliers.length === 0 ? (
        <div className="bg-white p-12 text-center border border-stone-200">
          <Package className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 text-sm">No suppliers found matching your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSuppliers.map((s) => (
            <div
              key={s.id}
              className="bg-white p-5 border border-stone-200 shadow-xs hover:border-[#c5a059] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[10px] font-mono uppercase font-semibold">
                    {s.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete supplier ${s.name}?`)) {
                          deleteSupplier(s.id);
                          showToast('Supplier deleted');
                        }
                      }}
                      className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-display text-lg text-stone-900 font-semibold">
                  {s.name}
                </h4>

                {s.contactPerson && (
                  <div className="text-xs text-stone-600 font-medium mt-0.5">
                    Contact: {s.contactPerson}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{s.phone}</span>
                  </div>

                  {s.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{s.email}</span>
                    </div>
                  )}

                  {s.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{s.address}</span>
                    </div>
                  )}

                  {s.gstin && (
                    <div className="text-[11px] font-mono text-stone-500">
                      GSTIN: <span className="text-stone-800 font-semibold">{s.gstin}</span>
                    </div>
                  )}

                  <div className="bg-[#faf8f5] p-2 border border-stone-200 text-xs flex justify-between items-center mt-2">
                    <span className="text-stone-500 font-mono text-[11px]">Outstanding:</span>
                    <span className="font-mono font-bold text-stone-900">
                      ₹{formatIndianCurrency(s.outstandingBalance || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Contact */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${s.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/${s.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${s.name}, inquiring about material requirements from J.J. INTERIORS & MODUTECH.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 border border-stone-300 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl text-stone-900 pb-3 border-b border-stone-200 mb-4">
              {editingSupplier ? 'Edit Vendor Details' : 'Add Trade Supplier'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Company / Vendor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surat Hardware & Veneer Emporium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Vendor Discipline
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                  >
                    {vendorCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mukeshbhai"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    placeholder="24AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Warehouse / Office Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ring Road, Udhna Udyognagar, Surat"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Payment Terms
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 30 Days Credit"
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Outstanding Balance (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.outstandingBalance || 0}
                    onChange={(e) => setFormData({ ...formData, outstandingBalance: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
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
                  {editingSupplier ? 'Save Changes' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
