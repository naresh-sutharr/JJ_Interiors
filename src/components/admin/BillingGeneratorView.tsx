import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { BillDocument, BillItem, RoomSection } from '../../types.ts';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  Eye, 
  Printer, 
  Share2, 
  Save, 
  Building2, 
  User, 
  Calendar, 
  DollarSign, 
  Layers, 
  Sparkles, 
  Check, 
  ChevronDown, 
  IndianRupee,
  MessageSquare,
  FileDown,
  Clock
} from 'lucide-react';
import { BillDocumentViewer } from './BillDocumentViewer.tsx';

export const BillingGeneratorView: React.FC = () => {
  const { 
    clients, 
    catalogItems, 
    businessProfile, 
    systemSettings, 
    saveBill, 
    editingBill, 
    setEditingBill, 
    billingPrefillClient, 
    setBillingPrefillClient, 
    bills,
    showToast 
  } = useApp();

  // Document Type: Quotation or Invoice
  const [docType, setDocType] = useState<'Quotation' | 'Invoice'>('Quotation');
  
  // Document identifiers
  const [docNumber, setDocNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');

  // Client Selection
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [projectName, setProjectName] = useState('Bespoke Interior Turnkey');

  // Room / Section Grouping
  const [sections, setSections] = useState<RoomSection[]>([
    {
      id: 'sec-1',
      roomName: 'Living Room',
      items: [
        {
          id: 'item-1-1',
          particular: 'TV Unit & Acoustic Louvered Fluted Wall Paneling',
          description: 'High-density HDHMR board finished in Italian PU polish with warm LED cove lighting profiles',
          size: '12 ft x 9 ft',
          quantity: 108,
          unit: 'Sq.Ft',
          rate: 1950,
          amount: 210600
        }
      ]
    },
    {
      id: 'sec-2',
      roomName: 'Modular Kitchen (Modutech)',
      items: [
        {
          id: 'item-2-1',
          particular: 'Modular Kitchen Under-Counter Base Cabinets',
          description: 'Marine-grade BWP plywood, 1mm scratch-resistant acrylic shutters, Hettich soft-close tandem boxes',
          size: '14 Rft',
          quantity: 14,
          unit: 'Rft',
          rate: 3400,
          amount: 47600
        }
      ]
    }
  ]);

  // Adjustments & Totals
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(5);

  const [additionalCharges, setAdditionalCharges] = useState<number>(0);
  const [additionalChargesDesc, setAdditionalChargesDesc] = useState<string>('Site Freight & Deep Cleaning');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<string>('Bank Transfer / NEFT');
  const [notes, setNotes] = useState<string>('All modular factory components are fabricated under J.J. INTERIORS & MODUTECH CNC standards. 10-Year structural warranty included.');
  const [paymentTerms, setPaymentTerms] = useState<string>('50% advance on design finalization, 40% on factory material dispatch, 10% on handover inspection.');

  // Preview Modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<BillDocument | null>(null);

  // Initialize or handle prefill/edit
  useEffect(() => {
    if (editingBill) {
      setDocType(editingBill.type);
      setDocNumber(editingBill.docNumber);
      setDate(editingBill.date);
      setDueDate(editingBill.dueDate || '');
      setSelectedClientId(editingBill.clientId || '');
      setClientName(editingBill.clientName);
      setClientPhone(editingBill.clientPhone);
      setClientEmail(editingBill.clientEmail);
      setClientAddress(editingBill.clientAddress);
      setProjectName(editingBill.projectName);
      setSections(editingBill.sections);
      setDiscountType(editingBill.discountType);
      setDiscountValue(editingBill.discountValue);

      setAdditionalCharges(editingBill.additionalCharges || 0);
      setAdditionalChargesDesc(editingBill.additionalChargesDesc || '');
      setAmountPaid(editingBill.amountPaid);
      setPaymentMode(editingBill.paymentMode || 'Bank Transfer / NEFT');
      setNotes(editingBill.notes);
      setPaymentTerms(editingBill.paymentTerms);
    } else {
      // Generate automatic unique number
      const year = new Date().getFullYear();
      const count = bills.filter(b => b.type === docType).length + 1;
      const prefix = docType === 'Quotation' ? systemSettings.quotationPrefix : systemSettings.invoicePrefix;
      const numStr = `${prefix}-${year}-${String(count).padStart(4, '0')}`;
      setDocNumber(numStr);

      // Default due date: 15 days later
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 15);
      setDueDate(nextDate.toISOString().split('T')[0]);

      if (billingPrefillClient) {
        setSelectedClientId(billingPrefillClient.id);
        setClientName(billingPrefillClient.name);
        setClientPhone(billingPrefillClient.phone);
        setClientEmail(billingPrefillClient.email);
        setClientAddress(`${billingPrefillClient.address}, ${billingPrefillClient.city}`);
        setProjectName(billingPrefillClient.projectType);
      }
    }
  }, [editingBill, billingPrefillClient, docType]);

  // When client dropdown changes
  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setClientName(client.name);
      setClientPhone(client.phone);
      setClientEmail(client.email);
      setClientAddress(`${client.address}, ${client.city}`);
      setProjectName(client.projectType);
    }
  };

  // Section & Item management
  const addRoomSection = (roomName: string = 'Master Bedroom') => {
    const newSection: RoomSection = {
      id: `sec-${Date.now()}`,
      roomName,
      items: [
        {
          id: `item-${Date.now()}-1`,
          particular: 'Bespoke Wardrobe with Soft-Close Hardware',
          description: 'Anti-fungal calibrated ply core, tinted fluted glass shutters',
          size: '8 ft x 7 ft',
          quantity: 56,
          unit: 'Sq.Ft',
          rate: 2200,
          amount: 123200
        }
      ]
    };
    setSections([...sections, newSection]);
  };

  const removeRoomSection = (secId: string) => {
    if (sections.length <= 1) {
      showToast('At least one room section is required.', 'error');
      return;
    }
    setSections(sections.filter(s => s.id !== secId));
  };

  const updateSectionName = (secId: string, name: string) => {
    setSections(sections.map(s => s.id === secId ? { ...s, roomName: name } : s));
  };

  const addItemToSection = (secId: string) => {
    const newItem: BillItem = {
      id: `item-${Date.now()}`,
      particular: '',
      description: '',
      size: 'Standard',
      quantity: 1,
      unit: 'Sq.Ft',
      rate: 1800,
      amount: 1800
    };
    setSections(sections.map(s => {
      if (s.id === secId) {
        return { ...s, items: [...s.items, newItem] };
      }
      return s;
    }));
  };

  const removeItemFromSection = (secId: string, itemId: string) => {
    setSections(sections.map(s => {
      if (s.id === secId) {
        if (s.items.length <= 1) return s;
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      }
      return s;
    }));
  };

  const updateItem = (secId: string, itemId: string, field: keyof BillItem, value: any) => {
    setSections(sections.map(s => {
      if (s.id === secId) {
        return {
          ...s,
          items: s.items.map(item => {
            if (item.id === itemId) {
              const updated = { ...item, [field]: value };
              if (field === 'quantity' || field === 'rate') {
                const qty = field === 'quantity' ? parseFloat(value) || 0 : item.quantity;
                const r = field === 'rate' ? parseFloat(value) || 0 : item.rate;
                updated.amount = Math.round(qty * r);
              }
              return updated;
            }
            return item;
          })
        };
      }
      return s;
    }));
  };

  const insertFromCatalog = (secId: string, catalogItemId: string) => {
    const catItem = catalogItems.find(c => c.id === catalogItemId);
    if (!catItem) return;

    const newItem: BillItem = {
      id: `item-${Date.now()}`,
      particular: catItem.name,
      description: `${catItem.material} • ${catItem.description}`,
      size: catItem.size || 'Standard',
      quantity: 1,
      unit: catItem.unit,
      rate: catItem.rate,
      amount: catItem.rate
    };

    setSections(sections.map(s => {
      if (s.id === secId) {
        return { ...s, items: [...s.items, newItem] };
      }
      return s;
    }));
    showToast(`Added "${catItem.name}" to section.`);
  };

  // Calculations
  const subtotal = sections.reduce((secAcc, sec) => {
    return secAcc + sec.items.reduce((itemAcc, item) => itemAcc + item.amount, 0);
  }, 0);

  const discountAmount = discountType === 'percentage' 
    ? Math.round((subtotal * discountValue) / 100) 
    : discountValue;

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const grandTotal = taxableAmount + (Number(additionalCharges) || 0);
  const balanceDue = Math.max(0, grandTotal - (Number(amountPaid) || 0));

  const paymentStatus = balanceDue <= 0 && grandTotal > 0 ? 'Paid' : amountPaid > 0 ? 'Partial' : 'Pending';

  // Construct current document object
  const buildCurrentDocument = (): BillDocument => {
    return {
      id: editingBill ? editingBill.id : `bill-${Date.now()}`,
      type: docType,
      docNumber,
      date,
      dueDate,
      clientId: selectedClientId,
      clientName: clientName || 'Valued Client',
      clientPhone: clientPhone || '+91 98250 00000',
      clientEmail: clientEmail || 'client@email.com',
      clientAddress: clientAddress || 'Surat, Gujarat',
      projectName: projectName || 'Residential Turnkey Interiors',
      sections,
      subtotal,
      discountType,
      discountValue,
      discountAmount,
      additionalCharges: Number(additionalCharges) || 0,
      additionalChargesDesc,
      grandTotal,
      amountPaid: Number(amountPaid) || 0,
      balanceDue,
      paymentStatus: paymentStatus as any,
      paymentMode,
      paymentHistory: editingBill?.paymentHistory || (amountPaid > 0 ? [{
        id: `pay-${Date.now()}`,
        amount: Number(amountPaid),
        date: date,
        mode: paymentMode,
        reference: 'Initial Settlement',
        notes: 'Recorded at bill generation'
      }] : []),
      notes,
      paymentTerms,
      createdAt: editingBill?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
  };

  const handleSaveDocument = () => {
    if (!clientName) {
      showToast('Please enter the client name.', 'error');
      return;
    }
    const doc = buildCurrentDocument();
    saveBill(doc);
    setEditingBill(null);
    setBillingPrefillClient(null);
    showToast(`${docType} ${docNumber} saved to business records!`);
  };

  const handleOpenPreview = () => {
    if (!clientName) {
      showToast('Please specify a client name to generate preview.', 'error');
      return;
    }
    setPreviewDoc(buildCurrentDocument());
    setIsPreviewOpen(true);
  };

  const handleQuickPrint = () => {
    setPreviewDoc(buildCurrentDocument());
    setIsPreviewOpen(true);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Top Header & Document Mode Switcher */}
      <div className="bg-white p-5 border border-[#e2dcd4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#c5a059]" />
            <h1 className="text-xl font-bold text-[#1e1b18] uppercase tracking-wide">
              {editingBill ? `Edit ${docType} (${docNumber})` : 'Commercial Billing Engine'}
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Create detailed room-by-room estimates, Modutech quotations, and invoices.
          </p>
        </div>

        {/* Toggle between Quotation & Invoice */}
        <div className="flex items-center gap-2 bg-[#faf8f5] p-1 border border-stone-300 rounded">
          <button
            type="button"
            onClick={() => setDocType('Quotation')}
            className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              docType === 'Quotation'
                ? 'bg-[#1e1b18] text-[#c5a059] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Quotation / Estimate
          </button>
          <button
            type="button"
            onClick={() => setDocType('Invoice')}
            className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              docType === 'Invoice'
                ? 'bg-[#1e1b18] text-[#c5a059] shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Invoice
          </button>
        </div>
      </div>

      {/* Main Billing Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Client & Room/Section Line Items */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Document & Client Particulars */}
          <div className="bg-white p-6 border border-[#e2dcd4] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-xs uppercase font-bold tracking-wider text-stone-800 flex items-center gap-2">
                <User className="w-4 h-4 text-[#c5a059]" />
                <span>Client &amp; Project Coordinates</span>
              </h3>

              {/* Quick Select Client from CRM */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500 font-semibold">Load from CRM:</span>
                <select
                  value={selectedClientId}
                  onChange={(e) => handleClientSelect(e.target.value)}
                  className="px-2.5 py-1 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-800 focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="">-- Select Client --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshi &amp; Mihir Desai"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98250 XXXXX"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Project Title / Site Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4BHK Turnkey Interior Execution"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Site Address (Surat)
                </label>
                <input
                  type="text"
                  placeholder="B-1402, Sky Solitaire, Vesu, Surat"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf8f5] border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-stone-100">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                  Document Number
                </label>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs font-mono font-bold text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                  Valid Until / Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800"
                />
              </div>
            </div>
          </div>

          {/* ROOM / SECTION GROUPINGS & LINE ITEMS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  Room &amp; Architectural Sections ({sections.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addRoomSection('Master Bedroom')}
                  className="px-3 py-1.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Room Section</span>
                </button>
              </div>
            </div>

            {/* Sections Accordion / Cards */}
            {sections.map((section, sIdx) => {
              const secSubtotal = section.items.reduce((sum, it) => sum + it.amount, 0);

              return (
                <div
                  key={section.id}
                  className="bg-white border-2 border-stone-200 rounded overflow-hidden shadow-sm hover:border-[#c5a059]/60 transition-colors"
                >
                  {/* Section Title Bar */}
                  <div className="bg-[#f5f0e8] px-4 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                      <span className="text-xs font-bold text-stone-500">#{sIdx + 1}</span>
                      <input
                        type="text"
                        value={section.roomName}
                        onChange={(e) => updateSectionName(section.id, e.target.value)}
                        placeholder="e.g. Living Room / Kitchen / Bedroom"
                        className="bg-white border border-stone-300 px-3 py-1 rounded text-xs font-bold text-stone-900 focus:outline-none focus:border-[#c5a059] flex-1 max-w-xs"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Catalog Quick Pick */}
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            insertFromCatalog(section.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="text-[11px] bg-white border border-stone-300 px-2 py-1 rounded text-stone-700"
                        defaultValue=""
                      >
                        <option value="" disabled>+ Add from Catalog</option>
                        {catalogItems.map((c) => (
                          <option key={c.id} value={c.id}>{c.name} (₹{c.rate}/{c.unit})</option>
                        ))}
                      </select>

                      <div className="text-xs font-bold text-stone-900">
                        Section: ₹{secSubtotal.toLocaleString('en-IN')}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeRoomSection(section.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 rounded"
                        title="Remove Section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#faf8f5] border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="py-2.5 px-3 w-5/12">Item Particular &amp; Specs</th>
                          <th className="py-2.5 px-2 w-2/12">Dimensions / Size</th>
                          <th className="py-2.5 px-2 text-center w-1/12">Qty</th>
                          <th className="py-2.5 px-2 text-center w-1/12">Unit</th>
                          <th className="py-2.5 px-2 text-right w-1/12">Rate (₹)</th>
                          <th className="py-2.5 px-3 text-right w-2/12">Amount (₹)</th>
                          <th className="py-2.5 px-2 w-10 text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {section.items.map((item) => (
                          <tr key={item.id} className="hover:bg-stone-50/50">
                            <td className="py-2.5 px-3 align-top">
                              <input
                                type="text"
                                placeholder="Item particular (e.g. Master Bed Wardrobe)"
                                value={item.particular}
                                onChange={(e) => updateItem(section.id, item.id, 'particular', e.target.value)}
                                className="w-full font-semibold text-stone-900 border border-stone-200 px-2 py-1 rounded text-xs focus:outline-none focus:border-[#c5a059]"
                              />
                              <input
                                type="text"
                                placeholder="Material specification (e.g. Action TESA HDHMR, 1mm Acrylic)"
                                value={item.description}
                                onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                                className="w-full text-[11px] text-stone-600 border border-stone-200 px-2 py-0.5 rounded mt-1 focus:outline-none focus:border-[#c5a059]"
                              />
                            </td>

                            <td className="py-2.5 px-2 align-top">
                              <input
                                type="text"
                                placeholder="e.g. 10x8 ft"
                                value={item.size}
                                onChange={(e) => updateItem(section.id, item.id, 'size', e.target.value)}
                                className="w-full border border-stone-200 px-2 py-1 rounded text-xs text-stone-700"
                              />
                            </td>

                            <td className="py-2.5 px-2 align-top text-center">
                              <input
                                type="number"
                                step="any"
                                value={item.quantity}
                                onChange={(e) => updateItem(section.id, item.id, 'quantity', e.target.value)}
                                className="w-16 text-center border border-stone-200 px-1 py-1 rounded text-xs font-semibold text-stone-900"
                              />
                            </td>

                            <td className="py-2.5 px-2 align-top text-center">
                              <select
                                value={item.unit}
                                onChange={(e) => updateItem(section.id, item.id, 'unit', e.target.value)}
                                className="border border-stone-200 px-1 py-1 rounded text-[11px] text-stone-700 bg-white"
                              >
                                <option value="Sq.Ft">Sq.Ft</option>
                                <option value="Rft">Rft</option>
                                <option value="Nos">Nos</option>
                                <option value="Sets">Sets</option>
                                <option value="L.S.">L.S.</option>
                              </select>
                            </td>

                            <td className="py-2.5 px-2 align-top text-right">
                              <input
                                type="number"
                                value={item.rate}
                                onChange={(e) => updateItem(section.id, item.id, 'rate', e.target.value)}
                                className="w-20 text-right border border-stone-200 px-1.5 py-1 rounded text-xs font-semibold text-stone-900"
                              />
                            </td>

                            <td className="py-2.5 px-3 align-top text-right font-bold text-stone-900">
                              ₹{item.amount.toLocaleString('en-IN')}
                            </td>

                            <td className="py-2.5 px-2 align-top text-center">
                              <button
                                type="button"
                                onClick={() => removeItemFromSection(section.id, item.id)}
                                className="text-stone-300 hover:text-rose-600 p-1"
                                title="Remove line item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add item to section footer button */}
                  <div className="p-2.5 bg-stone-50 border-t border-stone-200 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => addItemToSection(section.id)}
                      className="text-xs font-semibold text-[#1e1b18] hover:text-[#c5a059] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Custom Line Item to {section.roomName}</span>
                    </button>

                    <span className="text-xs text-stone-500">
                      {section.items.length} items
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notes & Payment Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 border border-[#e2dcd4]">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Terms &amp; Conditions
              </label>
              <textarea
                rows={3}
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-800"
              ></textarea>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                Architectural Notes / Warranty
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-800"
              ></textarea>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Mathematical Calculator, Settlement & Action Toolbar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Summary Box */}
          <div className="bg-white border-2 border-[#1e1b18] p-6 shadow-md space-y-4">
            <div className="pb-3 border-b border-stone-200 flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold tracking-wider text-stone-900">
                Commercial Summary
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
              }`}>
                {paymentStatus}
              </span>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Gross Section Subtotal:</span>
                <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Discount Selector */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-stone-600">
                  <span>Discount:</span>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="border border-stone-300 rounded text-[10px] py-0.5 px-1"
                  >
                    <option value="percentage">%</option>
                    <option value="fixed">₹ (Fixed)</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                    className="w-16 text-right border border-stone-300 px-1 py-0.5 rounded text-xs"
                  />
                  <span className="text-rose-600 font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>



              {/* Additional Freight / Packing */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={additionalChargesDesc}
                  onChange={(e) => setAdditionalChargesDesc(e.target.value)}
                  placeholder="Additional Charge Desc"
                  className="text-[11px] text-stone-500 border border-stone-200 px-1 py-0.5 rounded w-36"
                />
                <div className="flex items-center gap-1">
                  <span>+₹</span>
                  <input
                    type="number"
                    value={additionalCharges}
                    onChange={(e) => setAdditionalCharges(parseFloat(e.target.value) || 0)}
                    className="w-20 text-right border border-stone-300 px-1 py-0.5 rounded text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t-2 border-[#1e1b18] flex justify-between items-baseline">
                <span className="text-sm font-bold uppercase text-[#1e1b18]">Grand Total:</span>
                <span className="text-2xl font-bold text-[#1e1b18] tracking-tight">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Payment Settlement for Invoice */}
              {docType === 'Invoice' && (
                <div className="p-3 bg-[#faf8f5] border border-stone-200 rounded space-y-2 mt-3">
                  <div className="text-[10px] uppercase font-bold text-stone-700">
                    Settlement &amp; Payments Received
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Amount Paid:</span>
                    <div className="flex items-center gap-1">
                      <span>₹</span>
                      <input
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                        className="w-24 text-right border border-stone-300 px-1.5 py-1 rounded text-xs font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-stone-500">Mode:</span>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="border border-stone-300 rounded px-1.5 py-0.5 text-stone-800 bg-white"
                    >
                      <option value="Bank Transfer / NEFT">Bank Transfer / NEFT</option>
                      <option value="UPI / QR Code">UPI / QR Code</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex justify-between items-center font-bold">
                    <span className="text-stone-700">Balance Remaining Due:</span>
                    <span className={balanceDue > 0 ? 'text-amber-800 text-sm' : 'text-emerald-700 text-sm'}>
                      ₹{balanceDue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 space-y-2.5">
              <button
                type="button"
                onClick={handleSaveDocument}
                className="w-full py-3 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save {docType}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenPreview}
                className="w-full py-2.5 bg-[#faf8f5] hover:bg-stone-100 border border-stone-300 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#c5a059]" />
                <span>A4 Preview Document</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickPrint}
                  className="py-2 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download PDF / Print</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const doc = buildCurrentDocument();
                    const text = `*${businessProfile.businessName}*\n${doc.type}: ${doc.docNumber}\nClient: ${doc.clientName}\nProject: ${doc.projectName}\nGrand Total: ₹${doc.grandTotal.toLocaleString('en-IN')}\nBalance Due: ₹${doc.balanceDue.toLocaleString('en-IN')}\n\nThank you for choosing J.J. INTERIORS & MODUTECH!`;
                    window.open(`https://wa.me/${doc.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

          {/* Business Coordinates Check */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded text-xs space-y-1 text-stone-600">
            <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Issuing Entity:
            </div>
            <div className="font-semibold text-[#1e1b18]">{businessProfile.businessName}</div>
            <div>
              Surat, Gujarat

            </div>
            <div>Phone: {businessProfile.phone}</div>
          </div>

        </div>

      </div>

      {/* A4 Preview Modal Viewer */}
      {isPreviewOpen && previewDoc && (
        <BillDocumentViewer
          doc={previewDoc}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}

    </div>
  );
};
