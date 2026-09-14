import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { BillDocument, PaymentRecord } from '../../types.ts';
import { 
  FileText, 
  Search, 
  Eye, 
  Edit2, 
  Copy, 
  Printer, 
  Trash2, 
  CreditCard, 
  MessageSquare, 
  Plus, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { BillDocumentViewer } from './BillDocumentViewer.tsx';

export const SavedBillsView: React.FC = () => {
  const { 
    bills, 
    deleteBill, 
    duplicateBill, 
    convertQuotationToInvoice,
    addPaymentToBill, 
    setEditingBill, 
    setAdminTab, 
    businessProfile,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'QUOTATIONS' | 'INVOICES' | 'PAID' | 'PENDING'>('ALL');
  
  // Modals
  const [viewerDoc, setViewerDoc] = useState<BillDocument | null>(null);
  const [paymentModalBill, setPaymentModalBill] = useState<BillDocument | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Payment record form state
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentNotes, setPaymentNotes] = useState('');

  const handleOpenPaymentModal = (b: BillDocument) => {
    setPaymentModalBill(b);
    setPaymentAmount(b.balanceDue > 0 ? b.balanceDue : 0);
    setPaymentRef(`TXN-${Date.now().toString().slice(-6)}`);
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setPaymentNotes('Part payment installment');
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModalBill) return;
    if (paymentAmount <= 0) {
      showToast('Please enter a valid payment amount.', 'error');
      return;
    }

    addPaymentToBill(paymentModalBill.id, {
      amount: paymentAmount,
      date: paymentDate,
      mode: paymentMode,
      reference: paymentRef,
      notes: paymentNotes
    });

    setPaymentModalBill(null);
  };

  const handleEdit = (b: BillDocument) => {
    setEditingBill(b);
    setAdminTab('billing');
  };

  const handleConvertToInvoice = (b: BillDocument) => {
    const newInvoice = convertQuotationToInvoice(b.id);
    if (newInvoice) {
      showToast(`Quotation converted to Invoice: ${newInvoice.docNumber}`);
      setViewerDoc(newInvoice);
    }
  };

  const filteredBills = bills.filter((b) => {
    const matchesSearch = 
      b.docNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.projectName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'QUOTATIONS') return b.type === 'Quotation';
    if (activeTab === 'INVOICES') return b.type === 'Invoice';
    if (activeTab === 'PAID') return b.paymentStatus === 'Paid';
    if (activeTab === 'PENDING') return b.paymentStatus === 'Pending' || b.paymentStatus === 'Partial';

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Saved Bills &amp; Quotation Archive
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit trail of issued estimates, invoices, and chronological payment records.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBill(null);
            setAdminTab('billing');
          }}
          className="px-5 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Bill</span>
        </button>
      </div>

      {/* Search & Tabs Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 border border-[#e2dcd4]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by client, bill number, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-800 focus:outline-none focus:border-[#c5a059]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All Documents' },
            { id: 'QUOTATIONS', label: 'Quotations' },
            { id: 'INVOICES', label: 'Invoices' },
            { id: 'PENDING', label: 'Pending Balance' },
            { id: 'PAID', label: 'Settled / Paid' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1e1b18] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bills Archive List */}
      <div className="space-y-3">
        {filteredBills.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#e2dcd4] text-stone-500 text-xs">
            No bills or estimates found for the current query.
          </div>
        ) : (
          filteredBills.map((bill) => (
            <div
              key={bill.id}
              className="bg-white p-5 border border-[#e2dcd4] hover:border-[#c5a059] rounded shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all"
            >
              {/* Document Identity */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    bill.type === 'Invoice' ? 'bg-[#1e1b18] text-white' : 'bg-stone-200 text-stone-800'
                  }`}>
                    {bill.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-900">{bill.docNumber}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    bill.paymentStatus === 'Paid'
                      ? 'bg-emerald-100 text-emerald-900'
                      : bill.paymentStatus === 'Partial'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {bill.paymentStatus}
                  </span>
                </div>

                <div className="text-base font-bold text-[#1e1b18]">
                  {bill.clientName}
                </div>

                <div className="text-xs text-stone-500">
                  {bill.projectName} • Date: {bill.date} {bill.dueDate && `• Due: ${bill.dueDate}`}
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="flex items-center gap-6 px-4 py-2 bg-[#faf8f5] border border-stone-200 rounded text-center self-stretch lg:self-auto justify-between lg:justify-start">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Grand Total</div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    ₹{bill.grandTotal.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="w-[1px] h-8 bg-stone-300"></div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Paid</div>
                  <div className="text-sm font-bold text-emerald-700 mt-0.5">
                    ₹{bill.amountPaid.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="w-[1px] h-8 bg-stone-300"></div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Balance Due</div>
                  <div className={`text-sm font-bold mt-0.5 ${bill.balanceDue > 0 ? 'text-amber-800' : 'text-stone-400'}`}>
                    ₹{bill.balanceDue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 self-end lg:self-auto">
                <button
                  onClick={() => setViewerDoc(bill)}
                  className="px-3 py-1.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                  title="View A4 Printable Document"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                {bill.type === 'Invoice' && (
                  <button
                    onClick={() => handleOpenPaymentModal(bill)}
                    className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Record Received Payment"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pay</span>
                  </button>
                )}

                {bill.type === 'Quotation' && (
                  <button
                    onClick={() => handleConvertToInvoice(bill)}
                    className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-800 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Convert this approved Quotation into an Invoice"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                    <span>To Invoice</span>
                  </button>
                )}

                <button
                  onClick={() => handleEdit(bill)}
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 rounded"
                  title="Edit Line Items"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => duplicateBill(bill.id)}
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 rounded"
                  title="Duplicate as New Bill"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    const text = `*${businessProfile.businessName}*\n${bill.type}: ${bill.docNumber}\nClient: ${bill.clientName}\nGrand Total: ₹${bill.grandTotal.toLocaleString('en-IN')}\nBalance Due: ₹${bill.balanceDue.toLocaleString('en-IN')}`;
                    window.open(`https://wa.me/${bill.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="p-1.5 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded"
                  title="Share on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(bill.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 rounded"
                  title="Delete Document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Record Payment Modal */}
      {paymentModalBill && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in no-print">
          <div className="relative w-full max-w-md bg-white text-[#1e1b18] shadow-2xl border border-stone-300 rounded overflow-hidden my-auto">
            
            <div className="p-5 border-b border-stone-200 bg-[#1e1b18] text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c5a059] block">
                  Payment Settlement
                </span>
                <h3 className="font-display text-lg font-normal text-white">
                  Record Payment for {paymentModalBill.docNumber}
                </h3>
              </div>
              <button
                onClick={() => setPaymentModalBill(null)}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-6 space-y-4">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Client:</span>
                  <span className="font-bold text-stone-900">{paymentModalBill.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Invoice Total:</span>
                  <span className="font-bold text-stone-900">₹{paymentModalBill.grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-semibold text-amber-800">
                  <span>Current Outstanding Due:</span>
                  <span>₹{paymentModalBill.balanceDue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Received Payment Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-sm font-bold text-emerald-800 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-2.5 py-2 border border-stone-300 rounded text-xs bg-white text-stone-800"
                  >
                    <option value="UPI">UPI / Google Pay / PhonePe</option>
                    <option value="Bank Transfer">Bank Transfer / NEFT / IMPS</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Credit/Debit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full px-2.5 py-2 border border-stone-300 rounded text-xs text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Transaction UTR / Cheque Ref Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. UPI/1234567890 or Cheque #004521"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Payment Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2nd installment for modular woodwork"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalBill(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Record Payment
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewerDoc && (
        <BillDocumentViewer
          doc={viewerDoc}
          onClose={() => setViewerDoc(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-white p-6 max-w-sm w-full rounded border border-rose-300 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-bold text-base text-stone-900">Delete Bill Record?</h4>
            </div>
            <p className="text-xs text-stone-600">
              Are you sure you want to permanently delete this billing record? This action cannot be undone.
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
                  deleteBill(deleteConfirmId);
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
