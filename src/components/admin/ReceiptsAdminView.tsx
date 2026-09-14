import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { PaymentReceipt } from '../../types.ts';
import { formatIndianCurrency } from '../../utils/numberToWords.ts';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Printer, 
  Search, 
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const ReceiptsAdminView: React.FC = () => {
  const { 
    paymentReceipts, 
    addPaymentReceipt, 
    deletePaymentReceipt, 
    setActiveReceipt,
    clients,
    bills,
    projects,
    showToast 
  } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<string>('ALL');

  const initialFormData: Omit<PaymentReceipt, 'id' | 'receiptNumber' | 'createdAt'> = {
    clientName: '',
    clientPhone: '',
    projectName: '',
    amountPaid: 0,
    paymentMode: 'UPI',
    referenceNo: '',
    date: new Date().toISOString().split('T')[0],
    notes: 'Advance against carpentry & modular materials',
    billId: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOpenAdd = () => {
    setFormData(initialFormData);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || formData.amountPaid <= 0) {
      showToast('Client name and positive receipt amount are required.', 'error');
      return;
    }

    const created = addPaymentReceipt(formData);
    showToast('Payment receipt generated successfully.');
    setIsFormOpen(false);
    setActiveReceipt(created);
  };

  const totalReceived = paymentReceipts.reduce((sum, r) => sum + r.amountPaid, 0);

  const filteredReceipts = paymentReceipts.filter((r) => {
    if (modeFilter !== 'ALL' && r.paymentMode !== modeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.clientName.toLowerCase().includes(q) ||
        r.receiptNumber.toLowerCase().includes(q) ||
        (r.referenceNo || '').toLowerCase().includes(q) ||
        (r.projectName || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-display text-xl text-stone-900 font-semibold">
            Official Payment Receipts Ledger
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Issue formal voucher receipts for client advances, milestone disbursements, and bank transfers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Receipt Voucher</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Total Collections Logged
          </span>
          <div className="text-2xl font-mono font-bold text-emerald-800">
            ₹{formatIndianCurrency(totalReceived)}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Across {paymentReceipts.length} verified vouchers
          </span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Latest Receipt Issued
          </span>
          <div className="text-lg font-mono font-semibold text-stone-800">
            {paymentReceipts[0]?.receiptNumber || 'None'}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            {paymentReceipts[0]?.date || '—'}
          </span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Accounting Compliance
          </span>
          <div className="text-sm font-medium text-stone-800 mt-1">
            GST &amp; PAN compliant print voucher with Indian words conversion
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-stone-200">
        <div className="flex items-center gap-2">
          {(['ALL', 'UPI', 'NEFT / Net Banking', 'Cheque', 'Cash'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setModeFilter(m)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                modeFilter === m
                  ? 'bg-[#1e1b18] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search receipt #, client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white border border-stone-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-100 border-b border-stone-200 text-stone-600 uppercase font-mono tracking-wider text-[10px]">
              <th className="p-3">Receipt No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Client</th>
              <th className="p-3">Project</th>
              <th className="p-3">Mode &amp; Reference</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredReceipts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-stone-400">
                  No payment receipts recorded yet.
                </td>
              </tr>
            ) : (
              filteredReceipts.map((rcp) => (
                <tr key={rcp.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-[#1e1b18] whitespace-nowrap">
                    {rcp.receiptNumber}
                  </td>
                  <td className="p-3 font-mono text-stone-600 whitespace-nowrap">
                    {rcp.date}
                  </td>
                  <td className="p-3 font-medium text-stone-900">
                    {rcp.clientName}
                    {rcp.clientPhone && (
                      <span className="block text-[10px] text-stone-500 font-mono">
                        {rcp.clientPhone}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-stone-600">
                    {rcp.projectName || '—'}
                  </td>
                  <td className="p-3 font-mono text-stone-600 text-[11px]">
                    {rcp.paymentMode} {rcp.referenceNo ? `(${rcp.referenceNo})` : ''}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-right whitespace-nowrap">
                    ₹{formatIndianCurrency(rcp.amountPaid)}
                  </td>
                  <td className="p-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => setActiveReceipt(rcp)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-[#c5a059] text-stone-700 hover:text-black font-semibold text-[11px] uppercase tracking-wider mr-2 cursor-pointer transition-colors"
                    >
                      <Eye className="w-3 h-3 inline mr-1" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete receipt voucher ${rcp.receiptNumber}?`)) {
                          deletePaymentReceipt(rcp.id);
                          showToast('Receipt voucher deleted');
                        }
                      }}
                      className="p-1 text-stone-400 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Voucher Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 border border-stone-300 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl text-stone-900 pb-3 border-b border-stone-200 mb-4">
              Issue Official Payment Receipt
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Client Name *
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

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Client Phone (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98250 XXXXX"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Receipt Date *
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
                    Amount Received (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    placeholder="e.g. 200000"
                    value={formData.amountPaid || ''}
                    onChange={(e) => setFormData({ ...formData, amountPaid: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Project Name / Site Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4BHK Turnkey Residence, Vesu"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="NEFT / Net Banking">NEFT / Net Banking</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Cheque / UTR / Reference No
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UTR12345678"
                    value={formData.referenceNo}
                    onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Allocation / Milestone Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Advance payment against modular carcass manufacturing..."
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
                  Generate Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
