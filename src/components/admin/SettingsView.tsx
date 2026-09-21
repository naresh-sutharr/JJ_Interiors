import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  Settings, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  CreditCard, 
  Receipt, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  FileJson,
  UserCheck
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    systemSettings, 
    updateSystemSettings, 
    clients, 
    projects, 
    bills, 
    catalogItems, 
    resetToInitialData, 
    showToast,
    adminUser
  } = useApp();

  const [formData, setFormData] = useState({ ...systemSettings });
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemSettings(formData);
    setIsEditing(false);
    showToast('System billing settings updated successfully!');
  };

  // Export database backup
  const handleExportData = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      version: '2.0.0',
      clients: JSON.parse(localStorage.getItem('jj_clients') || '[]'),
      projects: JSON.parse(localStorage.getItem('jj_projects') || '[]'),
      bills: JSON.parse(localStorage.getItem('jj_bills') || '[]'),
      catalog: JSON.parse(localStorage.getItem('jj_catalog') || '[]'),
      businessProfile: JSON.parse(localStorage.getItem('jj_profile') || '{}'),
      settings: JSON.parse(localStorage.getItem('jj_settings') || '{}'),
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jay_jasol_database_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Database backup downloaded successfully!');
  };

  // Import database backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.clients) localStorage.setItem('jj_clients', JSON.stringify(parsed.clients));
        if (parsed.projects) localStorage.setItem('jj_projects', JSON.stringify(parsed.projects));
        if (parsed.bills) localStorage.setItem('jj_bills', JSON.stringify(parsed.bills));
        if (parsed.catalog) localStorage.setItem('jj_catalog', JSON.stringify(parsed.catalog));
        if (parsed.businessProfile) localStorage.setItem('jj_profile', JSON.stringify(parsed.businessProfile));
        if (parsed.settings) localStorage.setItem('jj_settings', JSON.stringify(parsed.settings));

        showToast('Database imported successfully! Refreshing view...');
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } catch (err) {
        showToast('Invalid JSON backup file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-[#e2dcd4] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              Settings &amp; System Configuration
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure default billing parameters, bank coordinates, and database persistence backups.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2 py-1 rounded bg-stone-100 text-stone-800 flex items-center gap-1.5 hidden sm:flex">
            <UserCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Role: {adminUser?.role} ({adminUser?.name})</span>
          </span>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Edit Settings
            </button>
          ) : (
            <button
              onClick={() => {
                setFormData({ ...systemSettings });
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <fieldset disabled={!isEditing} className={`space-y-6 ${!isEditing ? 'opacity-80 grayscale-[20%]' : ''}`}>
        
        {/* Billing & Tax Settings */}
        <div className={`bg-white p-6 sm:p-8 border ${isEditing ? 'border-[#c5a059] ring-1 ring-[#c5a059]/20' : 'border-[#e2dcd4]'} shadow-sm space-y-4 transition-colors`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#c5a059]" />
            <span>Commercial Billing Defaults</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Quotation Prefix
              </label>
              <input
                type="text"
                value={formData.quotationPrefix}
                onChange={(e) => setFormData({ ...formData, quotationPrefix: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-mono font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Invoice Prefix
              </label>
              <input
                type="text"
                value={formData.invoicePrefix}
                onChange={(e) => setFormData({ ...formData, invoicePrefix: e.target.value })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-mono font-bold text-stone-900"
              />
            </div>


          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
              Standard Commercial Payment Terms
            </label>
            <textarea
              rows={2}
              value={formData.defaultPaymentTerms}
              onChange={(e) => setFormData({ ...formData, defaultPaymentTerms: e.target.value })}
              className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* Bank Details for Direct Client Invoicing */}
        <div className={`bg-white p-6 sm:p-8 border ${isEditing ? 'border-[#c5a059] ring-1 ring-[#c5a059]/20' : 'border-[#e2dcd4]'} shadow-sm space-y-4 transition-colors`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#c5a059]" />
            <span>Bank Account Details (Printed on Invoices &amp; Quotations)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Beneficiary / Account Name *
              </label>
              <input
                type="text"
                value={formData.bankDetails.accountName}
                onChange={(e) => setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, accountName: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Bank Name *
              </label>
              <input
                type="text"
                value={formData.bankDetails.bankName}
                onChange={(e) => setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, bankName: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Account Number *
              </label>
              <input
                type="text"
                value={formData.bankDetails.accountNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, accountNumber: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-mono font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                IFSC Code *
              </label>
              <input
                type="text"
                value={formData.bankDetails.ifscCode}
                onChange={(e) => setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, ifscCode: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs font-mono font-bold text-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Branch Location (Surat)
              </label>
              <input
                type="text"
                value={formData.bankDetails.branch}
                onChange={(e) => setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, branch: e.target.value }
                })}
                className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900"
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-2 flex justify-end animate-fade-in">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save System Settings</span>
              </button>
            </div>
          )}
        </div>

        </fieldset>
      </form>

      {/* Database Backup & Maintenance Section */}
      <div className="bg-white p-6 sm:p-8 border border-[#e2dcd4] shadow-sm space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 pb-2 border-b border-stone-200 flex items-center gap-2">
          <Database className="w-4 h-4 text-[#c5a059]" />
          <span>Database Persistence &amp; Backup Controls</span>
        </h3>

        {/* Live Storage Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-[#faf8f5] border border-stone-200 rounded text-center">
            <div className="text-lg font-bold text-[#1e1b18]">{clients.length}</div>
            <div className="text-[10px] text-stone-500 uppercase font-semibold">CRM Clients</div>
          </div>
          <div className="p-3 bg-[#faf8f5] border border-stone-200 rounded text-center">
            <div className="text-lg font-bold text-[#1e1b18]">{projects.length}</div>
            <div className="text-[10px] text-stone-500 uppercase font-semibold">Portfolios</div>
          </div>
          <div className="p-3 bg-[#faf8f5] border border-stone-200 rounded text-center">
            <div className="text-lg font-bold text-[#1e1b18]">{bills.length}</div>
            <div className="text-[10px] text-stone-500 uppercase font-semibold">Bills / Quotes</div>
          </div>
          <div className="p-3 bg-[#faf8f5] border border-stone-200 rounded text-center">
            <div className="text-lg font-bold text-[#1e1b18]">{catalogItems.length}</div>
            <div className="text-[10px] text-stone-500 uppercase font-semibold">Catalog Rates</div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-700" />
              <span>Export Full Backup (JSON)</span>
            </button>

            <label className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-stone-700" />
              <span>Restore Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Seeds</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-white p-6 max-w-sm w-full rounded border border-rose-300 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="font-bold text-base text-stone-900">Reset Entire Database?</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              This will restore the original demo records for clients, portfolio projects, bills, and rate catalogs. All custom changes will be replaced.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToInitialData();
                  setIsResetConfirmOpen(false);
                }}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
