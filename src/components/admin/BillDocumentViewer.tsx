import React, { useState } from 'react';
import { BillDocument } from '../../types.ts';
import { useApp } from '../../context/AppContext.tsx';
import { numberToIndianWords, formatIndianCurrency } from '../../utils/numberToWords.ts';
import { 
  X, 
  Printer, 
  Copy, 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  MessageSquare,
  User,
  Home,
  FileText,
  CheckCircle2,
  QrCode
} from 'lucide-react';

interface BillDocumentViewerProps {
  doc: BillDocument;
  onClose: () => void;
}

export const BillDocumentViewer: React.FC<BillDocumentViewerProps> = ({ doc, onClose }) => {
  const { businessProfile, systemSettings, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'both' | 'page1' | 'page2'>('both');

  const totalLineItems = doc.sections.reduce((count, sec) => count + sec.items.length, 0);
  const emptyRowsCount = Math.max(0, 5 - totalLineItems);

  const handlePrint = () => {
    setActiveTab('both');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleCopyText = () => {
    const text = `
*${businessProfile.businessName}*
---------------------------------------
${doc.type.toUpperCase()}: ${doc.docNumber}
Date: ${doc.date}
Client: ${doc.clientName} (${doc.clientPhone})
Project: ${doc.projectName}
Address: ${doc.clientAddress}

Grand Total: ₹${formatIndianCurrency(doc.grandTotal)}
Amount Paid: ₹${formatIndianCurrency(doc.amountPaid)}
Balance Due: ₹${formatIndianCurrency(doc.balanceDue)}

Bank Details:
Bank: ${systemSettings.bankDetails.bankName}
A/C Name: ${systemSettings.bankDetails.accountName}
A/C No: ${systemSettings.bankDetails.accountNumber}
IFSC: ${systemSettings.bankDetails.ifscCode}
UPI: ${systemSettings.bankDetails.upiId}

Phone: ${businessProfile.phone}
`.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Invoice summary copied to clipboard!');
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Hello ${doc.clientName},\n\nPlease find your ${doc.type} (${doc.docNumber}) from *${businessProfile.businessName}*.\n\nProject: ${doc.projectName}\nGrand Total: ₹${formatIndianCurrency(doc.grandTotal)}\nAmount Paid: ₹${formatIndianCurrency(doc.amountPaid)}\nBalance Due: ₹${formatIndianCurrency(doc.balanceDue)}\n\nThank you for choosing J.J. INTERIORS & MODUTECH!`;
    const cleanPhone = doc.clientPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Compact professional header (matches official branding)
  const renderDocumentHeader = () => (
    <div className="pb-3 border-b border-[#d4cbbe]">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Monogram + Title */}
        <div className="flex items-center gap-3">
          <svg width="42" height="42" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <defs>
              <linearGradient id="invMarkGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dfba76" />
                <stop offset="50%" stopColor="#b6893f" />
                <stop offset="100%" stopColor="#7a551e" />
              </linearGradient>
              <linearGradient id="invRingGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3ddad" />
                <stop offset="100%" stopColor="#9a712c" />
              </linearGradient>
            </defs>
            <circle cx="35" cy="35" r="32" stroke="url(#invRingGold)" strokeWidth="1.6" fill="none" opacity="0.95" />
            <circle cx="35" cy="35" r="29.5" stroke="url(#invRingGold)" strokeWidth="0.75" fill="none" strokeDasharray="2 2" opacity="0.5" />
            <path d="M 27 16 L 33 16 L 33 42 C 33 47.5 28.5 51 23.5 51 C 18 51 15 46.5 15 42 L 19.5 42 C 19.5 44.5 21.2 47 23.5 47 C 26 47 28.5 44.8 28.5 42 L 28.5 20.5 L 25 20.5 L 25 16 Z" fill="url(#invMarkGold)" />
            <rect x="29.8" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />
            <path d="M 37 16 L 47 16 L 47 20.5 L 43.5 20.5 L 43.5 42 C 43.5 47.5 39 51 34 51 C 29.5 51 26.5 47.5 26.5 43.5 L 31 43.5 C 31 45.5 32.5 47 34.5 47 C 37 47 39 45 39 42 L 39 16 Z" fill="url(#invMarkGold)" />
            <rect x="40.3" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />
            <line x1="21" y1="16" x2="49" y2="16" stroke="url(#invMarkGold)" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="19" y1="52.5" x2="45" y2="52.5" stroke="url(#invMarkGold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
          </svg>
          <div>
            <div className="font-display text-[15px] font-bold tracking-[0.1em] uppercase text-[#1e1b18] leading-tight">
              J.J. INTERIORS &amp; MODUTECH
            </div>
            <div className="text-[7.5px] font-semibold tracking-[0.22em] uppercase text-[#8c6f50] mt-0.5">
              SPACES | DESIGNED | FOR A BETTER TOMORROW
            </div>
          </div>
        </div>

        {/* Center: Disciplines */}
        <div className="hidden sm:block border-l border-r border-[#d4cbbe] px-4 text-center">
          <div className="text-[8.5px] font-bold tracking-[0.14em] uppercase text-[#2b2825]">
            RESIDENTIAL | COMMERCIAL
          </div>
          <div className="text-[8px] font-semibold tracking-[0.14em] uppercase text-[#615951] mt-0.5">
            MODULAR FURNITURE
          </div>
          <div className="text-[7.5px] font-semibold tracking-[0.14em] uppercase text-[#8c6f50] mt-0.5">
            MODUTECH SOLUTIONS
          </div>
        </div>

        {/* Right: Studio Contact Coordinates */}
        <div className="text-right text-[8px] text-[#4a433d] space-y-0.5 leading-tight">
          <div className="flex items-center justify-end gap-1">
            <span>148, RandalDham Society, New Sama Road, Vadodara - 390008, Gujarat</span>
            <MapPin className="w-2.5 h-2.5 text-[#a87f43] shrink-0" />
          </div>
          <div className="flex items-center justify-end gap-1">
            <span>{businessProfile.phone}</span>
            <Phone className="w-2.5 h-2.5 text-[#a87f43] shrink-0" />
          </div>
          <div className="flex items-center justify-end gap-1">
            <span>{businessProfile.email}</span>
            <Mail className="w-2.5 h-2.5 text-[#a87f43] shrink-0" />
          </div>
          <div className="flex items-center justify-end gap-1">
            <span>{businessProfile.website}</span>
            <Globe className="w-2.5 h-2.5 text-[#a87f43] shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );

  // Reusable document footer bar
  const renderDocumentFooter = (pageText: string, thankText: string) => (
    <div className="mt-6 pt-2">
      <div className="bg-[#24211e] text-white px-4 py-2 flex items-center justify-between text-[8px] tracking-wider relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#b6893f] to-[#7a551e] clip-path-slant opacity-90"></div>
        <div className="font-bold tracking-widest text-[#f5ebd7] uppercase pl-10">
          {thankText}
        </div>
        <div className="hidden sm:block text-[7.5px] font-medium tracking-[0.25em] text-[#d6c9b8] uppercase">
          J.J. INTERIORS &amp; MODUTECH
        </div>
        <div className="font-mono font-bold tracking-widest text-[#f5ebd7]">
          {pageText}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in print:p-0 print:bg-white">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#f0eee9] text-[#1c1917] shadow-2xl border border-stone-400 overflow-hidden my-auto max-h-[96vh] flex flex-col print:max-h-none print:shadow-none print:border-none print:m-0 print:bg-white">
        
        {/* Top Actions Control Bar (Hidden in Print) */}
        <div className="p-3 bg-[#1e1b18] text-white flex flex-wrap items-center justify-between gap-3 shrink-0 no-print border-b border-[#3b3631]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#c5a059] text-black">
              Official {doc.type}
            </span>
            <span className="text-xs font-mono font-bold text-stone-200">
              {doc.docNumber}
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Client: <strong className="text-stone-200">{doc.clientName}</strong>
            </span>
          </div>

          {/* View Toggles: Both / Page 1 / Page 2 */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'both' ? 'bg-[#c5a059] text-black font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              2 Pages View
            </button>
            <button
              onClick={() => setActiveTab('page1')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'page1' ? 'bg-[#c5a059] text-black font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Page 1: Bill
            </button>
            <button
              onClick={() => setActiveTab('page2')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                activeTab === 'page2' ? 'bg-[#c5a059] text-black font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Page 2: Terms &amp; Pay
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#d8b46d] text-black rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow"
              title="Print directly or save as 2-page PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={handleCopyText}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded cursor-pointer"
              title="Copy Summary"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded ml-2 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable A4 Canvas Container */}
        <div className="overflow-y-auto p-4 sm:p-8 flex-1 flex flex-col items-center gap-8 bg-[#524e49] print:bg-white print:p-0 print:gap-0 print:overflow-visible">
          
          {/* ========================================================================= */}
          {/* PAGE 1 — MAIN INVOICE BILL                                                */}
          {/* ========================================================================= */}
          {(activeTab === 'both' || activeTab === 'page1') && (
            <div 
              id="invoice-page-1"
              className="a4-print-page w-full max-w-[210mm] min-h-[297mm] bg-white text-[#1e1b18] shadow-2xl p-6 sm:p-8 border border-stone-300 relative print:border-none print:shadow-none print:p-0 print:max-w-none flex flex-col justify-between"
            >
              <div>
                {/* 1. Top Header */}
                {renderDocumentHeader()}

                {/* 2. TAX INVOICE BANNER */}
                <div className="my-3 px-3 py-2 bg-[#f4eee7] border-y border-[#d8cec0] flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-[0.2em] uppercase text-[#1e1b18] leading-none">
                      {doc.type === 'Invoice' ? 'TAX INVOICE' : 'PROJECT QUOTATION'}
                    </h2>
                    <div className="text-[7.5px] font-semibold tracking-[0.25em] uppercase text-[#7a551e] mt-0.5">
                      INTERIOR | MODULAR | FURNITURE
                    </div>
                  </div>

                  {/* Metadata Table on right */}
                  <div className="text-[9px] grid grid-cols-2 gap-x-2 gap-y-0.5 leading-tight font-medium text-[#2d2824]">
                    <div className="text-right text-[#695f55]">
                      {doc.type === 'Invoice' ? 'Invoice Number :' : 'Quotation No :'}
                    </div>
                    <div className="font-bold text-[#1e1b18] font-mono">{doc.docNumber}</div>

                    <div className="text-right text-[#695f55]">
                      {doc.type === 'Invoice' ? 'Invoice Date :' : 'Issue Date :'}
                    </div>
                    <div>{doc.date}</div>

                    <div className="text-right text-[#695f55]">
                      {doc.type === 'Invoice' ? 'Due Date :' : 'Valid Until :'}
                    </div>
                    <div>{doc.dueDate || doc.validUntilOrDueDate || '30 Days Net'}</div>

                    <div className="text-right text-[#695f55]">Payment Mode :</div>
                    <div>{doc.paymentMode || 'Bank / UPI'}</div>
                  </div>
                </div>

                {/* 3. BILLED TO & PROJECT / SITE DETAILS (Two side-by-side cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3 text-[8.5px]">
                  {/* Billed To */}
                  <div className="border border-[#d8cec0] overflow-hidden">
                    <div className="bg-[#eae2d5] px-2.5 py-1 font-bold text-[8.5px] uppercase tracking-wider text-[#24201c] flex items-center gap-1.5">
                      <User className="w-2.5 h-2.5 text-[#8c6832]" />
                      <span>BILLED TO</span>
                    </div>
                    <div className="p-2 space-y-1 bg-white leading-tight text-[#3d3731]">
                      <div className="font-bold text-[#1e1b18] text-[9.5px]">
                        {doc.clientName}
                      </div>
                      <div className="flex items-start gap-1">
                        <MapPin className="w-2.5 h-2.5 text-[#8c6832] shrink-0 mt-0.5" />
                        <span>{doc.clientAddress}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5 text-[#8c6832] shrink-0" />
                        <span>{doc.clientPhone}</span>
                      </div>
                      {doc.clientEmail && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5 text-[#8c6832] shrink-0" />
                          <span>{doc.clientEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project / Site */}
                  <div className="border border-[#d8cec0] overflow-hidden">
                    <div className="bg-[#eae2d5] px-2.5 py-1 font-bold text-[8.5px] uppercase tracking-wider text-[#24201c] flex items-center gap-1.5">
                      <Home className="w-2.5 h-2.5 text-[#8c6832]" />
                      <span>PROJECT / SITE DETAILS</span>
                    </div>
                    <div className="p-2 space-y-0.5 bg-white leading-tight text-[#3d3731]">
                      <div className="grid grid-cols-12 gap-1">
                        <span className="col-span-5 text-[#6e6358]">Project Name :</span>
                        <span className="col-span-7 font-bold text-[#1e1b18] truncate">{doc.projectName}</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1">
                        <span className="col-span-5 text-[#6e6358]">Project Type :</span>
                        <span className="col-span-7">{doc.projectType || 'Residential Interior'}</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1">
                        <span className="col-span-5 text-[#6e6358]">Location :</span>
                        <span className="col-span-7">{doc.projectLocation || 'Gujarat, India'}</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1">
                        <span className="col-span-5 text-[#6e6358]">Designer :</span>
                        <span className="col-span-7 font-medium">{doc.designer || 'J.J. Design Team'}</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1">
                        <span className="col-span-5 text-[#6e6358]">Site Address :</span>
                        <span className="col-span-7 truncate">{doc.siteAddress || doc.clientAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. ITEM TABLE (Ruled lines with balanced vertical distribution) */}
                <div className="border border-[#c8beaf] overflow-hidden text-[8px] mb-3">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#262320] text-white text-[8px] uppercase tracking-wider font-semibold">
                        <th className="py-1.5 px-1.5 text-center w-10 border-r border-white/20">SR. NO.</th>
                        <th className="py-1.5 px-2 text-left border-r border-white/20">PARTICULAR / SPECIFICATION</th>
                        <th className="py-1.5 px-1.5 text-center w-16 border-r border-white/20">SIZE / DIMS</th>
                        <th className="py-1.5 px-1.5 text-center w-14 border-r border-white/20">QTY / S.F.T.</th>
                        <th className="py-1.5 px-1.5 text-center w-12 border-r border-white/20">UNIT</th>
                        <th className="py-1.5 px-2 text-right w-20 border-r border-white/20">RATE (₹)</th>
                        <th className="py-1.5 px-2 text-right w-24">AMOUNT (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e3dcd1]">
                      {doc.sections.map((sec, sIdx) => (
                        <React.Fragment key={sec.id}>
                          {/* Room/Section Heading */}
                          <tr className="bg-[#eae2d5] font-bold text-[#1e1b18] text-[8.5px]">
                            <td className="py-1 px-1.5 text-center font-bold">{sIdx + 1}</td>
                            <td colSpan={6} className="py-1 px-2 uppercase tracking-wider">
                              {sec.roomName}
                            </td>
                          </tr>

                          {/* Line Items */}
                          {sec.items.map((it, itIdx) => (
                            <tr key={it.id} className="hover:bg-[#fbf9f6] text-[#2c2722]">
                              <td className="py-1.5 px-1.5 text-center text-[#6e6358] font-mono border-r border-[#ece5da]">
                                {sIdx + 1}.{itIdx + 1}
                              </td>
                              <td className="py-1.5 px-2 border-r border-[#ece5da]">
                                <div className="font-semibold text-[#1e1b18]">{it.particular}</div>
                                {it.description && (
                                  <div className="text-[7px] text-[#695f55] leading-none mt-0.5">{it.description}</div>
                                )}
                              </td>
                              <td className="py-1.5 px-1.5 text-center text-[#554d44] border-r border-[#ece5da]">
                                {it.size || '-'}
                              </td>
                              <td className="py-1.5 px-1.5 text-center font-medium border-r border-[#ece5da]">
                                {it.quantity}
                              </td>
                              <td className="py-1.5 px-1.5 text-center text-[#695f55] border-r border-[#ece5da]">
                                {it.unit || 'Sq. Ft.'}
                              </td>
                              <td className="py-1.5 px-2 text-right text-[#554d44] border-r border-[#ece5da]">
                                {formatIndianCurrency(it.rate)}
                              </td>
                              <td className="py-1.5 px-2 text-right font-bold text-[#1e1b18]">
                                {formatIndianCurrency(it.amount)}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}

                      {/* Clean horizontal ruled lines if line items are few to avoid empty floating void */}
                      {emptyRowsCount > 0 && Array.from({ length: emptyRowsCount }).map((_, rIdx) => (
                        <tr key={`empty-${rIdx}`} className="text-[#2c2722]">
                          <td className="py-2 px-1.5 text-center text-[#d8cec0] font-mono border-r border-[#ece5da]">
                            {totalLineItems + rIdx + 1}
                          </td>
                          <td className="py-2 px-2 border-r border-[#ece5da] text-stone-200 select-none">&nbsp;</td>
                          <td className="py-2 px-1.5 border-r border-[#ece5da] text-stone-200 select-none">&nbsp;</td>
                          <td className="py-2 px-1.5 border-r border-[#ece5da] text-stone-200 select-none">&nbsp;</td>
                          <td className="py-2 px-1.5 border-r border-[#ece5da] text-stone-200 select-none">&nbsp;</td>
                          <td className="py-2 px-2 border-r border-[#ece5da] text-stone-200 select-none">&nbsp;</td>
                          <td className="py-2 px-2 text-stone-200 select-none">&nbsp;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5. Financial Summary Stack anchored neatly near bottom of Page 1 */}
                <div className="grid grid-cols-12 gap-3 pt-2 border-t border-[#d8cec0] text-[8.5px]">
                  
                  {/* Left Column (Amount in words + Note + Legal) */}
                  <div className="col-span-12 sm:col-span-7 flex flex-col justify-between pr-2 space-y-2">
                    <div>
                      <div className="font-bold text-[#1e1b18] text-[8.5px]">
                        Amount in Words :
                      </div>
                      <div className="text-[8px] font-semibold text-[#6e5124] italic mt-0.5 leading-snug">
                        {numberToIndianWords(doc.grandTotal)}
                      </div>

                      {/* Clean Note Box */}
                      <div className="mt-2 p-2 bg-[#f4eee7] border border-[#d8cec0] rounded text-[7.5px] leading-relaxed text-[#4a423a]">
                        <div className="font-bold uppercase tracking-wider text-[#1e1b18] flex items-center gap-1 mb-0.5">
                          <FileText className="w-2.5 h-2.5 text-[#8c6832]" />
                          <span>Note :</span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 pl-0.5">
                          <li>All material specifications are executed as per approved 3D design and signed samples.</li>
                          <li>Any extra work or site modifications beyond this bill will be charged separately.</li>
                          <li>Payment schedule and terms as detailed on Page 2.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Jurisdiction / PAN / E. & O.E. */}
                    <div className="pt-2 text-[7.5px] text-[#695f55] space-y-0.5 border-t border-[#e3dcd1]">
                      <div>Subject to Gujarat Jurisdiction.</div>
                      <div className="flex justify-between font-mono">
                        <span>PAN Card No. <strong>{businessProfile.panNo || 'CMPYS4786H'}</strong></span>
                        <span className="font-sans font-bold">E. &amp; O.E.</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Subtotal / Discount / Tax / Grand Total) */}
                  <div className="col-span-12 sm:col-span-5 border-t sm:border-t-0 sm:border-l border-[#d8cec0] sm:pl-3 pt-2 sm:pt-0">
                    <div className="space-y-1 text-[8.5px]">
                      <div className="flex justify-between text-[#5c534a]">
                        <span>SUBTOTAL</span>
                        <span className="font-semibold text-[#1e1b18]">₹ {formatIndianCurrency(doc.subtotal)}</span>
                      </div>

                      {doc.discountAmount > 0 && (
                        <div className="flex justify-between text-[#8c2a1c]">
                          <span>DISCOUNT ({doc.discountType === 'percentage' ? `${doc.discountValue}%` : 'Special'})</span>
                          <span>- ₹ {formatIndianCurrency(doc.discountAmount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-[#5c534a]">
                        <span>TAXABLE AMOUNT</span>
                        <span className="font-medium">₹ {formatIndianCurrency(doc.subtotal - doc.discountAmount)}</span>
                      </div>



                      {doc.additionalCharges > 0 && (
                        <div className="flex justify-between text-[#5c534a]">
                          <span>ADDITIONAL CHARGES</span>
                          <span>₹ {formatIndianCurrency(doc.additionalCharges)}</span>
                        </div>
                      )}

                      {/* GRAND TOTAL HIGHLIGHTED BAR */}
                      <div className="mt-2 p-2 bg-[#8a6845] text-white flex justify-between items-center font-bold text-[10px] rounded-sm shadow-sm">
                        <span className="uppercase tracking-wider">GRAND TOTAL</span>
                        <span className="font-mono text-[11px]">₹ {formatIndianCurrency(doc.grandTotal)}</span>
                      </div>

                      <div className="pt-2 text-right text-[7.5px] text-[#695f55]">
                        Payment details &amp; terms on Page 2
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Block of Page 1: Signatory & Document Footer */}
              <div className="mt-4 pt-2">
                {/* 6. Page 1 Authorized Signatory & Stamp Placeholder */}
                <div className="flex justify-between items-end pb-2 mb-2 border-t border-[#d8cec0] text-[8px]">
                  <div className="text-[#695f55] space-y-0.5">
                    <div>• Computer generated tax invoice. Subject to realization of payments.</div>
                    <div>• Page 2 contains detailed Bank/UPI details, Terms &amp; Payment Schedule.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[7.5px] uppercase font-bold text-[#8c6f50] mb-5">
                      For J.J. INTERIORS &amp; MODUTECH
                    </div>
                    <div className="border-b border-stone-400 w-36 ml-auto mb-1"></div>
                    <div className="font-bold text-[8.5px] text-[#1e1b18]">Authorized Signatory &amp; Seal</div>
                  </div>
                </div>

                {/* 7. Bottom Banner Page 1 */}
                {renderDocumentFooter('PAGE 1 OF 2', 'THANK YOU FOR YOUR BUSINESS')}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 2 — PAYMENT DETAILS + TERMS & CONDITIONS                              */}
          {/* ========================================================================= */}
          {(activeTab === 'both' || activeTab === 'page2') && (
            <div 
              id="invoice-page-2"
              className="a4-print-page w-full max-w-[210mm] min-h-[297mm] bg-white text-[#1e1b18] shadow-2xl p-6 sm:p-8 border border-stone-300 relative print:border-none print:shadow-none print:p-0 print:max-w-none flex flex-col justify-between"
            >
              <div>
                {/* 1. Header */}
                {renderDocumentHeader()}

                {/* 2. PAYMENT DETAILS BANNER */}
                <div className="my-3 px-3 py-2 bg-[#f4eee7] border-y border-[#d8cec0] flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-[0.2em] uppercase text-[#1e1b18] leading-none">
                      PAYMENT DETAILS &amp; TERMS
                    </h2>
                    <div className="text-[8px] font-mono text-[#5c534a] mt-1 space-x-3">
                      <span>INVOICE NO. : <strong>{doc.docNumber}</strong></span>
                      <span>|</span>
                      <span>DATE : <strong>{doc.date}</strong></span>
                    </div>
                  </div>

                  <div className="font-script text-2xl text-[#b88c4b] pr-2 select-none">
                    Building Better Spaces
                  </div>
                </div>

                {/* 3. PAYMENT SUMMARY, MILESTONES & BANK / UPI DETAILS (Side by Side) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-[8.5px]">
                  
                  {/* Left Box: PAYMENT SUMMARY & MILESTONES */}
                  <div className="border border-[#d8cec0] overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="bg-[#eae2d5] px-2.5 py-1 font-bold text-[8.5px] uppercase tracking-wider text-[#24201c]">
                        PAYMENT SUMMARY
                      </div>
                      <div className="p-2.5 space-y-1.5 bg-white text-[#3d3731]">
                        <div className="flex justify-between items-center py-0.5 border-b border-[#f0eae1]">
                          <span className="text-[#695f55]">Invoice Total</span>
                          <span className="font-bold text-[#1e1b18] font-mono">₹ {formatIndianCurrency(doc.grandTotal)}</span>
                        </div>

                        <div className="flex justify-between items-center py-0.5 border-b border-[#f0eae1]">
                          <span className="text-[#695f55]">Amount Paid</span>
                          <span className="font-bold text-emerald-800 font-mono">₹ {formatIndianCurrency(doc.amountPaid)}</span>
                        </div>

                        {/* Highlighted Balance Due */}
                        <div className="flex justify-between items-center px-2 py-1 bg-[#f4eee7] border border-[#d8cec0] rounded font-bold">
                          <span className="text-[#1e1b18]">Balance Due</span>
                          <span className="text-[#8a2a1b] font-mono text-[10px]">₹ {formatIndianCurrency(doc.balanceDue)}</span>
                        </div>

                        <div className="flex justify-between items-center py-0.5">
                          <span className="text-[#695f55]">Payment Method</span>
                          <span className="font-medium text-[#1e1b18]">{doc.paymentMode || 'Bank / UPI'}</span>
                        </div>

                        <div className="flex justify-between items-center pt-1 border-t border-[#f0eae1]">
                          <span className="text-[#695f55]">Payment Status</span>
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            doc.balanceDue <= 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : doc.amountPaid > 0
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {doc.balanceDue <= 0 ? 'PAID' : doc.amountPaid > 0 ? 'PARTIALLY PAID' : 'PENDING'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Standard Payment Milestones */}
                    <div className="p-2.5 bg-[#fbf9f6] border-t border-[#d8cec0] text-[7.5px] text-[#4a423a]">
                      <div className="font-bold uppercase tracking-wider text-[#1e1b18] mb-1">
                        Standard Payment Milestones:
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        <div className="bg-white p-1 border border-[#e2dcd4] rounded">
                          <div className="font-bold text-[#8a6845]">50% Advance</div>
                          <div className="text-[6.5px] text-stone-500">With Work Order</div>
                        </div>
                        <div className="bg-white p-1 border border-[#e2dcd4] rounded">
                          <div className="font-bold text-[#8a6845]">40% Material</div>
                          <div className="text-[6.5px] text-stone-500">On Site Delivery</div>
                        </div>
                        <div className="bg-white p-1 border border-[#e2dcd4] rounded">
                          <div className="font-bold text-[#8a6845]">10% Handover</div>
                          <div className="text-[6.5px] text-stone-500">Final Handover</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Box: BANK DETAILS */}
                  <div className="border border-[#d8cec0] overflow-hidden">
                    <div className="bg-[#eae2d5] px-2.5 py-1 font-bold text-[8.5px] uppercase tracking-wider text-[#24201c]">
                      BANK / UPI DETAILS
                    </div>
                    <div className="p-2.5 bg-white space-y-1 text-[#3d3731]">
                      <div className="grid grid-cols-12 gap-1 py-0.5">
                        <span className="col-span-4 text-[#695f55]">Bank Name</span>
                        <span className="col-span-8 font-bold text-[#1e1b18]">
                          : {systemSettings.bankDetails.bankName}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-1 py-0.5">
                        <span className="col-span-4 text-[#695f55]">Account Name</span>
                        <span className="col-span-8 font-semibold text-[#1e1b18]">
                          : {systemSettings.bankDetails.accountName}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-1 py-0.5">
                        <span className="col-span-4 text-[#695f55]">Account Number</span>
                        <span className="col-span-8 font-mono font-bold text-[#1e1b18]">
                          : {systemSettings.bankDetails.accountNumber}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-1 py-0.5">
                        <span className="col-span-4 text-[#695f55]">IFSC</span>
                        <span className="col-span-8 font-mono font-bold text-[#1e1b18]">
                          : {systemSettings.bankDetails.ifscCode}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-1 py-0.5">
                        <span className="col-span-4 text-[#695f55]">UPI</span>
                        <span className="col-span-8 font-mono font-semibold text-[#8a6845]">
                          : {systemSettings.bankDetails.upiId}
                        </span>
                      </div>

                      {/* QR Code Area */}
                      <div className="mt-2 pt-2 border-t border-[#f0eae1] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 bg-white border border-[#c8beaf] p-1 flex flex-col items-center justify-center shrink-0">
                            {businessProfile.upiQrUrl ? (
                              <img src={businessProfile.upiQrUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                            ) : (
                              <>
                                <QrCode className="w-8 h-8 text-[#1e1b18]" />
                                <span className="text-[5px] uppercase font-bold text-[#695f55] tracking-tighter">Scan &amp; Pay</span>
                              </>
                            )}
                          </div>
                          <div className="text-[7.5px] text-[#695f55] leading-tight">
                            <div className="font-semibold text-[#1e1b18]">Instant UPI Transfer</div>
                            <div>Google Pay • PhonePe • Paytm</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* 4. TERMS & CONDITIONS (Clean formal numbered list) */}
                <div className="border border-[#d8cec0] overflow-hidden text-[8px] mb-3">
                  <div className="bg-[#eae2d5] px-2.5 py-1 font-bold text-[8.5px] uppercase tracking-wider text-[#24201c]">
                    TERMS &amp; CONDITIONS
                  </div>
                  <div className="p-3 bg-white space-y-1.5 text-[#3d3731] leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#8a6845] shrink-0">1.</span>
                      <span><strong>Payment Terms:</strong> 50% advance along with confirmed work order, 40% on material delivery at site, and balance 10% on final installation &amp; handover.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#8a6845] shrink-0">2.</span>
                      <span><strong>Material Specifications:</strong> All substrates, veneers, laminates, and hardware are as per signed physical samples and approved drawings.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#8a6845] shrink-0">3.</span>
                      <span><strong>Extra Works:</strong> Any additional electrical, plumbing, civil, or woodwork requested during execution will be estimated and billed separately.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#8a6845] shrink-0">4.</span>
                      <span><strong>Timeline:</strong> Delivery schedule commences only after site readiness, clear access, 3D sign-off, and realization of initial advance payment.</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#8a6845] shrink-0">6.</span>
                      <span><strong>Warranty:</strong> 10-year structural warranty on factory-manufactured Modutech cabinetry. Hardware warranties as per OEM brand policies (Blum/Hettich/Hafele).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#8a6845] shrink-0">7.</span>
                      <span><strong>Return Policy:</strong> Customized modular woodwork once manufactured or delivered cannot be returned or cancelled.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-[#8a6845] shrink-0">8.</span>
                      <span><strong>Jurisdiction:</strong> All legal matters and commercial disputes are subject to Gujarat jurisdiction only.</span>
                    </div>
                  </div>
                </div>

                {/* 5. NOTES */}
                <div className="border border-[#d8cec0] p-2.5 bg-[#fbf9f6] text-[7.5px] text-[#554e47] leading-relaxed mb-4">
                  <span className="font-bold text-[#1e1b18] uppercase tracking-wider block mb-1">NOTES :</span>
                  <div>• Please mention Invoice Number in bank transfer or UPI transaction remarks.</div>
                  <div>• Cheques/drafts to be drawn in favor of <strong>"J.J. INTERIORS &amp; MODUTECH"</strong>. Receipts valid subject to realization.</div>
                </div>
              </div>

              {/* Bottom Block of Page 2: Client Acceptance & Signatory & Footer */}
              <div className="mt-4 pt-2">
                {/* 6. CLIENT ACCEPTANCE & AUTHORIZED SIGNATORY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2 mb-2 border-t border-[#d8cec0] text-[8.5px]">
                  
                  {/* Left: Client Acceptance */}
                  <div className="space-y-2">
                    <div className="font-bold uppercase tracking-wider text-[#1e1b18]">
                      CLIENT ACCEPTANCE
                    </div>
                    <p className="text-[7.5px] text-[#695f55]">
                      I/We hereby accept the above invoice, specifications, payment schedule, and terms.
                    </p>
                    <div className="space-y-2 pt-1 text-[8px]">
                      <div className="flex items-baseline gap-2">
                        <span className="w-16 text-[#695f55]">Name:</span>
                        <span className="border-b border-stone-400 flex-1"></span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="w-16 text-[#695f55]">Signature:</span>
                        <span className="border-b border-stone-400 flex-1"></span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="w-16 text-[#695f55]">Date:</span>
                        <span className="border-b border-stone-400 flex-1"></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Firm Signatory */}
                  <div className="text-right space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-[9px] text-[#1e1b18] uppercase tracking-wider">
                        For J.J. INTERIORS &amp; MODUTECH
                      </div>
                    </div>

                    <div className="pt-6">
                      <div className="border-b border-stone-400 w-44 ml-auto mb-1"></div>
                      <div className="font-bold text-[9px] text-[#1e1b18]">Authorized Signatory</div>
                      <div className="text-[8px] text-[#695f55]">
                        ({doc.authorizedSignatoryName || businessProfile.ownerName || ''})
                      </div>
                      <div className="text-[7.5px] text-[#8c6f50] uppercase tracking-wider">
                        {doc.authorizedSignatoryRole || 'Proprietor & Creative Director'}
                      </div>
                    </div>
                  </div>

                </div>

                {/* 7. Bottom Banner Page 2 */}
                {renderDocumentFooter('PAGE 2 OF 2', 'THANK YOU FOR YOUR TRUST')}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
