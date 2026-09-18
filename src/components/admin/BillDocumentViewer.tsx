import React, { useState } from 'react';
import { BillDocument } from '../../types.ts';
import { useApp } from '../../context/AppContext.tsx';
import { numberToIndianWords, formatIndianCurrency } from '../../utils/numberToWords.ts';
import { 
  X, 
  Printer, 
  Copy, 
  MessageSquare
} from 'lucide-react';

interface BillDocumentViewerProps {
  doc: BillDocument;
  onClose: () => void;
}

export const BillDocumentViewer: React.FC<BillDocumentViewerProps> = ({ doc, onClose }) => {
  const { businessProfile, systemSettings, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'both' | 'page1' | 'page2'>('both');

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

  // Luxury minimalist header
  const renderDocumentHeader = () => (
    <div className="flex justify-between items-start pb-6 border-b-2 border-stone-100 print:border-stone-200">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#1e1b18] text-[#c5a059] flex items-center justify-center font-display font-bold text-3xl tracking-wider shadow-sm rounded-sm">
            JJ
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-[0.15em] uppercase text-[#1e1b18] leading-none">
              J.J. INTERIORS
            </h1>
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#c5a059] mt-1.5">
              &amp; MODUTECH
            </p>
          </div>
        </div>
        <div className="mt-5 text-[10px] text-stone-500 space-y-0.5 font-medium">
          <p>148, RandalDham Society, New Sama Road</p>
          <p>Vadodara - 390008, Gujarat</p>
          <p className="mt-1.5 font-semibold text-stone-700">{businessProfile.phone} | {businessProfile.email}</p>
        </div>
      </div>
      
      <div className="text-right">
        <h2 className="text-5xl font-display font-light tracking-widest uppercase text-stone-200 print:text-stone-300">
          {doc.type === 'Invoice' ? 'Invoice' : 'Estimate'}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[10px] text-left ml-auto w-max">
          <span className="text-stone-400 font-bold uppercase tracking-wider">Doc No.</span>
          <span className="font-bold text-[#1e1b18] text-right font-mono">{doc.docNumber}</span>
          
          <span className="text-stone-400 font-bold uppercase tracking-wider">Date</span>
          <span className="font-bold text-[#1e1b18] text-right font-mono">{doc.date}</span>
          
          <span className="text-stone-400 font-bold uppercase tracking-wider">Valid Till</span>
          <span className="font-bold text-[#1e1b18] text-right font-mono">{doc.dueDate || doc.validUntilOrDueDate || '30 Days Net'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#e5e5e5]/80 backdrop-blur-sm flex flex-col items-center p-4 sm:p-8 animate-fade-in print:p-0 print:bg-white print:block">
      
      {/* Top Actions Control Bar (Hidden in Print) */}
      <div className="w-full max-w-5xl mb-6 flex flex-wrap items-center justify-between gap-4 shrink-0 no-print bg-white p-4 rounded-xl shadow-lg border border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#f5f0e6] text-[#c5a059] flex items-center justify-center rounded-lg font-bold">
            {doc.type === 'Invoice' ? 'INV' : 'EST'}
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1e1b18] leading-none">{doc.docNumber}</h3>
            <p className="text-[11px] text-stone-500 font-medium mt-1">{doc.clientName}</p>
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'both' ? 'bg-white text-[#1e1b18] shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            All Pages
          </button>
          <button
            onClick={() => setActiveTab('page1')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'page1' ? 'bg-white text-[#1e1b18] shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Page 1
          </button>
          <button
            onClick={() => setActiveTab('page2')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'page2' ? 'bg-white text-[#1e1b18] shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Page 2
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#1e1b18] hover:bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            onClick={handleCopyText}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            title="Copy Summary"
          >
            <Copy className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-stone-200 mx-1"></div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-5xl items-center pb-20 print:pb-0 print:gap-0">
        {/* ========================================================================= */}
        {/* PAGE 1 — MAIN INVOICE BILL                                                */}
        {/* ========================================================================= */}
        {(activeTab === 'both' || activeTab === 'page1') && (
          <div 
            id="invoice-page-1"
            className="a4-print-page w-full max-w-[210mm] min-h-[297mm] bg-white text-[#1e1b18] shadow-2xl p-10 sm:p-12 relative print:border-none print:shadow-none print:p-8 print:max-w-none flex flex-col justify-between print:block print:h-auto print:min-h-0 print:break-after-page"
          >
            <div>
              {renderDocumentHeader()}

              {/* Billed To & Project Details */}
              <div className="grid grid-cols-2 gap-12 py-8 border-b border-stone-100 print:border-stone-200">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Billed To</h3>
                  <p className="font-bold text-sm text-[#1e1b18]">{doc.clientName}</p>
                  <p className="text-[11px] text-stone-500 mt-2 leading-relaxed w-5/6">{doc.clientAddress}</p>
                  <p className="text-[11px] text-stone-500 mt-1 font-medium">{doc.clientPhone} {doc.clientEmail && `• ${doc.clientEmail}`}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Project Details</h3>
                  <p className="font-bold text-sm text-[#1e1b18]">{doc.projectName}</p>
                  <p className="text-[11px] text-stone-500 mt-2 font-medium">{doc.projectType || 'Residential Interior'}</p>
                  <p className="text-[11px] text-stone-500 mt-1">Location: {doc.projectLocation || 'Gujarat, India'}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mt-8">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-[#1e1b18] text-stone-500 uppercase tracking-widest text-[9px] font-bold">
                      <th className="py-3 px-2 text-left w-10">#</th>
                      <th className="py-3 px-2 text-left">Description</th>
                      <th className="py-3 px-2 text-center w-24">Size</th>
                      <th className="py-3 px-2 text-center w-16">Qty</th>
                      <th className="py-3 px-2 text-center w-16">Unit</th>
                      <th className="py-3 px-2 text-right w-24">Rate (₹)</th>
                      <th className="py-3 px-2 text-right w-28">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.sections.map((sec, sIdx) => (
                      <React.Fragment key={sec.id}>
                        <tr>
                          <td colSpan={7} className="pt-6 pb-2 px-2 font-bold text-[10px] text-[#c5a059] tracking-widest uppercase">
                            {sec.roomName}
                          </td>
                        </tr>
                        {sec.items.map((it, itIdx) => (
                          <tr key={it.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors print:break-inside-avoid group">
                            <td className="py-4 px-2 text-stone-400 font-mono text-[10px] align-top">{String(sIdx + 1).padStart(2, '0')}.{String(itIdx + 1).padStart(2, '0')}</td>
                            <td className="py-4 px-2 align-top">
                              <p className="font-semibold text-[#1e1b18]">{it.particular}</p>
                              {it.description && <p className="text-[10px] text-stone-500 mt-1.5 leading-relaxed pr-6">{it.description}</p>}
                            </td>
                            <td className="py-4 px-2 text-center text-stone-500 font-medium align-top">{it.size || '-'}</td>
                            <td className="py-4 px-2 text-center font-semibold text-[#1e1b18] align-top">{it.quantity}</td>
                            <td className="py-4 px-2 text-center text-stone-500 font-medium align-top">{it.unit || 'Sq.Ft.'}</td>
                            <td className="py-4 px-2 text-right text-stone-500 font-medium align-top font-mono">{formatIndianCurrency(it.rate)}</td>
                            <td className="py-4 px-2 text-right font-bold text-[#1e1b18] align-top font-mono">{formatIndianCurrency(it.amount)}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Summary */}
              <div className="mt-8 flex justify-end print:break-inside-avoid">
                <div className="w-1/2 min-w-[320px]">
                  <div className="space-y-4 text-[11px] text-stone-500">
                    <div className="flex justify-between border-b border-stone-100 pb-3">
                      <span className="uppercase tracking-wider font-bold">Subtotal</span>
                      <span className="font-bold text-[#1e1b18] font-mono text-sm">₹ {formatIndianCurrency(doc.subtotal)}</span>
                    </div>
                    {doc.discountAmount > 0 && (
                      <div className="flex justify-between border-b border-stone-100 pb-3 text-rose-600">
                        <span className="uppercase tracking-wider font-bold">Discount</span>
                        <span className="font-bold font-mono text-sm">- ₹ {formatIndianCurrency(doc.discountAmount)}</span>
                      </div>
                    )}
                    {doc.additionalCharges > 0 && (
                      <div className="flex justify-between border-b border-stone-100 pb-3">
                        <span className="uppercase tracking-wider font-bold">{doc.additionalChargesDesc || 'Additional Charges'}</span>
                        <span className="font-bold text-[#1e1b18] font-mono text-sm">₹ {formatIndianCurrency(doc.additionalCharges)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-4 pb-4 items-end bg-[#faf8f5] px-4 rounded-md border border-[#f0eee9]">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e1b18]">Grand Total</span>
                      <span className="text-2xl font-bold font-mono text-[#c5a059]">₹ {formatIndianCurrency(doc.grandTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page 1 Footer */}
            <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-end print:break-inside-avoid">
              <div className="text-[10px] text-stone-500 max-w-sm space-y-2">
                <p><span className="font-bold text-stone-700 uppercase tracking-wider">Amount in Words:</span> <span className="italic font-medium">{numberToIndianWords(doc.grandTotal)}</span></p>
                <p className="mt-4 text-stone-400">E. &amp; O.E. Subject to Gujarat Jurisdiction.</p>
                <p className="text-stone-400">PAN: {businessProfile.panNo || 'CMPYS4786H'}</p>
              </div>
              <div className="text-center">
                <div className="w-48 border-b border-stone-300 mb-3"></div>
                <p className="text-[10px] font-bold text-[#1e1b18] uppercase tracking-widest">Authorized Signatory</p>
                <p className="text-[9px] text-stone-500 mt-1 uppercase tracking-widest font-medium">J.J. INTERIORS &amp; MODUTECH</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2 — PAYMENT DETAILS + TERMS & CONDITIONS                              */}
        {/* ========================================================================= */}
        {(activeTab === 'both' || activeTab === 'page2') && (
          <div 
            id="invoice-page-2"
            className="a4-print-page w-full max-w-[210mm] min-h-[297mm] bg-white text-[#1e1b18] shadow-2xl p-10 sm:p-12 relative print:border-none print:shadow-none print:p-8 print:max-w-none flex flex-col justify-between print:block print:h-auto print:min-h-0"
          >
            <div>
              {renderDocumentHeader()}

              <div className="mt-12">
                <h2 className="text-xl font-display uppercase tracking-[0.2em] text-[#1e1b18] border-b border-[#1e1b18] pb-4 mb-10 text-center font-bold">Payment Summary &amp; Terms</h2>
                
                <div className="grid grid-cols-2 gap-16">
                  {/* Left: Payment Info */}
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-4">Payment Status</h3>
                      <div className="bg-[#faf8f5] p-6 rounded-xl border border-stone-200 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Amount Paid</p>
                          <p className="text-lg font-bold text-emerald-600 font-mono mt-1">₹ {formatIndianCurrency(doc.amountPaid)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Balance Due</p>
                          <p className="text-lg font-bold text-rose-600 font-mono mt-1">₹ {formatIndianCurrency(doc.balanceDue)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-4">Bank Details</h3>
                      <div className="space-y-3 text-[11px] text-stone-500">
                        <div className="flex justify-between border-b border-stone-100 pb-2"><span className="uppercase tracking-wider font-semibold">Bank Name</span> <span className="font-bold text-[#1e1b18]">{systemSettings.bankDetails.bankName}</span></div>
                        <div className="flex justify-between border-b border-stone-100 pb-2"><span className="uppercase tracking-wider font-semibold">Account Name</span> <span className="font-bold text-[#1e1b18]">{systemSettings.bankDetails.accountName}</span></div>
                        <div className="flex justify-between border-b border-stone-100 pb-2"><span className="uppercase tracking-wider font-semibold">Account Number</span> <span className="font-bold font-mono text-[#1e1b18] text-xs">{systemSettings.bankDetails.accountNumber}</span></div>
                        <div className="flex justify-between border-b border-stone-100 pb-2"><span className="uppercase tracking-wider font-semibold">IFSC</span> <span className="font-bold font-mono text-[#1e1b18] text-xs">{systemSettings.bankDetails.ifscCode}</span></div>
                        <div className="flex justify-between border-b border-stone-100 pb-2"><span className="uppercase tracking-wider font-semibold">UPI ID</span> <span className="font-bold font-mono text-[#c5a059] text-xs">{systemSettings.bankDetails.upiId}</span></div>
                      </div>
                      {businessProfile.upiQrUrl && (
                        <div className="mt-6 p-4 bg-white border border-stone-200 rounded-xl inline-block shadow-sm">
                          <img src={businessProfile.upiQrUrl} alt="UPI QR Code" className="w-24 h-24" />
                          <p className="text-center text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-3 font-bold">Scan to Pay</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Terms */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-4">Terms &amp; Conditions</h3>
                    <ul className="space-y-5 text-[11px] text-stone-600 leading-relaxed list-none pl-0">
                       <li className="flex gap-3"><span className="font-bold text-[#c5a059] font-mono text-sm leading-none pt-0.5">01.</span> <span><strong className="text-[#1e1b18]">Payment Terms:</strong> 50% advance along with confirmed work order, 40% on material delivery at site, and balance 10% on final installation &amp; handover.</span></li>
                       <li className="flex gap-3"><span className="font-bold text-[#c5a059] font-mono text-sm leading-none pt-0.5">02.</span> <span><strong className="text-[#1e1b18]">Material Specifications:</strong> All substrates, veneers, laminates, and hardware are as per signed physical samples and approved drawings.</span></li>
                       <li className="flex gap-3"><span className="font-bold text-[#c5a059] font-mono text-sm leading-none pt-0.5">03.</span> <span><strong className="text-[#1e1b18]">Extra Works:</strong> Any additional electrical, plumbing, civil, or woodwork requested during execution will be estimated and billed separately.</span></li>
                       <li className="flex gap-3"><span className="font-bold text-[#c5a059] font-mono text-sm leading-none pt-0.5">04.</span> <span><strong className="text-[#1e1b18]">Timeline:</strong> Delivery schedule commences only after site readiness, clear access, 3D sign-off, and realization of initial advance payment.</span></li>
                       <li className="flex gap-3"><span className="font-bold text-[#c5a059] font-mono text-sm leading-none pt-0.5">05.</span> <span><strong className="text-[#1e1b18]">Warranty:</strong> 10-year structural warranty on factory-manufactured Modutech cabinetry. Hardware warranties as per OEM brand policies.</span></li>
                       <li className="flex gap-3"><span className="font-bold text-[#c5a059] font-mono text-sm leading-none pt-0.5">06.</span> <span><strong className="text-[#1e1b18]">Return Policy:</strong> Customized modular woodwork once manufactured or delivered cannot be returned or cancelled.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-10 border-t border-stone-200 grid grid-cols-2 gap-12 print:break-inside-avoid">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1e1b18] mb-5">Client Acceptance</p>
                <p className="text-[10px] text-stone-500 mb-8 font-medium">I/We hereby accept the above invoice, specifications, payment schedule, and terms.</p>
                <div className="border-b border-stone-300 w-56 mb-3"></div>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{doc.clientName}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1e1b18] mb-5">Authorized By</p>
                <div className="h-12"></div>
                <div className="border-b border-stone-300 w-56 ml-auto mb-3"></div>
                <p className="text-[10px] font-bold text-[#1e1b18] uppercase tracking-widest">Authorized Signatory</p>
                <p className="text-[9px] text-stone-500 mt-1 uppercase tracking-widest font-medium">J.J. INTERIORS &amp; MODUTECH</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
