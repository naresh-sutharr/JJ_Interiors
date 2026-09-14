import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Expense } from '../../types.ts';
import { formatIndianCurrency } from '../../utils/numberToWords.ts';
import { 
  DollarSign, 
  TrendingDown, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Briefcase, 
  PieChart, 
  Download,
  Calendar
} from 'lucide-react';

export const ExpensesAdminView: React.FC = () => {
  const { 
    expenses, 
    addExpense, 
    updateExpense, 
    deleteExpense, 
    projects, 
    suppliers,
    bills,
    showToast 
  } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [projectFilter, setProjectFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Materials & Hardware',
    'Labour & Carpentry',
    'Civil & Masonry',
    'Electrical & Plumbing',
    'Transport & Logistics',
    'Design & 3D CAD',
    'Vendor Supply',
    'Studio & Overhead'
  ];

  const initialFormData: Omit<Expense, 'id' | 'createdAt'> = {
    category: 'Materials & Hardware',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    paymentMode: 'UPI',
    paidTo: '',
    projectName: '',
    referenceNo: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOpenAdd = () => {
    setEditingExpense(null);
    setFormData(initialFormData);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (exp: Expense) => {
    setEditingExpense(exp);
    setFormData({
      projectId: exp.projectId,
      projectName: exp.projectName,
      supplierId: exp.supplierId,
      category: exp.category,
      amount: exp.amount,
      date: exp.date,
      paymentMode: exp.paymentMode,
      paidTo: exp.paidTo,
      referenceNo: exp.referenceNo,
      notes: exp.notes,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.paidTo.trim() || formData.amount <= 0) {
      showToast('Payee name and positive amount are required.', 'error');
      return;
    }

    if (editingExpense) {
      updateExpense(editingExpense.id, formData);
      showToast('Expense updated successfully.');
    } else {
      addExpense(formData);
      showToast('Expense logged successfully.');
    }
    setIsFormOpen(false);
  };

  // Calculations
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Group by Category
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  // Filtered expenses
  const filteredExpenses = expenses.filter((e) => {
    if (categoryFilter !== 'ALL' && e.category !== categoryFilter) return false;
    if (projectFilter !== 'ALL' && e.projectName !== projectFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        e.paidTo.toLowerCase().includes(q) ||
        (e.projectName || '').toLowerCase().includes(q) ||
        (e.referenceNo || '').toLowerCase().includes(q) ||
        (e.notes || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Unique project names from projects and expenses
  const projectOptions = Array.from(new Set([
    ...projects.map(p => p.title),
    ...expenses.map(e => e.projectName).filter(Boolean)
  ]));

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-display text-xl text-stone-900 font-semibold">
            Project Expenses &amp; Cost Ledger
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Log raw material purchases, carpenter wage disbursements, logistics, and track net project margins.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Total Outflow
          </span>
          <div className="text-2xl font-mono font-bold text-stone-900">
            ₹{formatIndianCurrency(totalExpenses)}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            {expenses.length} recorded line items
          </span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Hardware &amp; Materials
          </span>
          <div className="text-xl font-mono font-bold text-amber-800">
            ₹{formatIndianCurrency(categoryTotals['Materials & Hardware'] || 0)}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Veneers, laminates, ply, Blum fittings
          </span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Labour &amp; Carpentry
          </span>
          <div className="text-xl font-mono font-bold text-stone-800">
            ₹{formatIndianCurrency(categoryTotals['Labour & Carpentry'] || 0)}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Contractor wages &amp; installation
          </span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold block mb-1">
            Civil, Logistics &amp; Other
          </span>
          <div className="text-xl font-mono font-bold text-stone-700">
            ₹{formatIndianCurrency(
              totalExpenses - 
              (categoryTotals['Materials & Hardware'] || 0) - 
              (categoryTotals['Labour & Carpentry'] || 0)
            )}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">
            Freight, design CAD, civil, misc
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-stone-200">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-700 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-300 text-xs font-medium text-stone-700 focus:outline-none"
          >
            <option value="ALL">All Projects</option>
            {projectOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search payee, invoice #, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white border border-stone-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-100 border-b border-stone-200 text-stone-600 uppercase font-mono tracking-wider text-[10px]">
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Paid To / Supplier</th>
              <th className="p-3">Project Link</th>
              <th className="p-3">Mode &amp; Ref</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-stone-400">
                  No expense records found matching filters.
                </td>
              </tr>
            ) : (
              filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3 font-mono text-stone-600 whitespace-nowrap">
                    {exp.date}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[10px] font-medium">
                      {exp.category}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-stone-900">
                    {exp.paidTo}
                    {exp.notes && (
                      <span className="block text-[10px] font-normal text-stone-500 italic mt-0.5">
                        {exp.notes}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-stone-600">
                    {exp.projectName || '— General Studio —'}
                  </td>
                  <td className="p-3 text-stone-600 font-mono text-[11px]">
                    {exp.paymentMode} {exp.referenceNo ? `(${exp.referenceNo})` : ''}
                  </td>
                  <td className="p-3 font-mono font-bold text-stone-900 text-right whitespace-nowrap">
                    ₹{formatIndianCurrency(exp.amount)}
                  </td>
                  <td className="p-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(exp)}
                      className="p-1 text-stone-400 hover:text-stone-900 mr-2 cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5 inline" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete expense of ₹${exp.amount} to ${exp.paidTo}?`)) {
                          deleteExpense(exp.id);
                          showToast('Expense removed');
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

      {/* Record / Edit Expense Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 border border-stone-300 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl text-stone-900 pb-3 border-b border-stone-200 mb-4">
              {editingExpense ? 'Edit Expense Line' : 'Record Project Expense'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Date *
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
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    placeholder="e.g. 45000"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm font-mono focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Associated Project
                  </label>
                  <select
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="">— General / Overhead —</option>
                    {projectOptions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Payee / Vendor / Contractor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hettich Hardware Distributor / Ramesh Carpenter"
                  value={formData.paidTo}
                  onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 text-xs focus:border-[#c5a059] focus:outline-none"
                  >
                    <option value="UPI">UPI (GPay / PhonePe)</option>
                    <option value="Net Banking">Net Banking / NEFT</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Bill / UTR / Reference No
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. INV-8921 / UTR492819"
                    value={formData.referenceNo}
                    onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 text-sm focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Description / Specification
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 18mm Gurjan Marine Plywood - 20 sheets delivered to site..."
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
                  {editingExpense ? 'Save Expense' : 'Log Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
