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

Grand Total: ₹${formatIndianCurrency(doc.grandTotal)}
Amount Paid: ₹${formatIndianCurrency(doc.amountPaid)}
Balance Due: ₹${formatIndianCurrency(doc.balanceDue)}
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

  // Classic Letterhead Header
  const renderLetterhead = () => (
    <div className="w-full text-center pb-4 mb-6 border-b-[3px] border-[#c5a059] print:border-[#c5a059]">
      <h1 className="font-display text-4xl font-bold tracking-widest uppercase text-[#1e1b18] mb-1">
        J.J. INTERIORS <span className="text-[#c5a059]">&amp; MODUTECH</span>
      </h1>
      <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-600 mb-3">
        Spaces | Designed | For A Better Tomorrow
      </p>
      <div className="text-[11px] text-stone-700 font-medium">
        <p>148, RandalDham Society, New Sama Road, Vadodara - 390008, Gujarat</p>
        <p className="mt-0.5">Phone: {businessProfile.phone} | Email: {businessProfile.email}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex flex-col items-center p-4 sm:p-8 animate-fade-in print:p-0 print:bg-white print:block">
      
      {/* Top Actions Control Bar (Hidden in Print) */}
      <div className="w-full max-w-5xl mb-6 flex flex-wrap items-center justify-between gap-4 shrink-0 no-print bg-white p-4 rounded border border-stone-300 shadow-md">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-[#1e1b18] text-[#c5a059] rounded font-bold text-sm tracking-widest uppercase">
            {doc.type}
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1e1b18]">{doc.docNumber}</h3>
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex items-center p-1 bg-stone-100 rounded text-xs font-semibold border border-stone-200">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded transition-colors ${activeTab === 'both' ? 'bg-white text-black shadow' : 'text-stone-500'}`}
          >
            Both Pages
          </button>
          <button
            onClick={() => setActiveTab('page1')}
            className={`px-3 py-1.5 rounded transition-colors ${activeTab === 'page1' ? 'bg-white text-black shadow' : 'text-stone-500'}`}
          >
            Page 1 (Bill)
          </button>
          <button
            onClick={() => setActiveTab('page2')}
            className={`px-3 py-1.5 rounded transition-colors ${activeTab === 'page2' ? 'bg-white text-black shadow' : 'text-stone-500'}`}
          >
            Page 2 (Terms)
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button onClick={handlePrint} className="px-4 py-2 bg-[#c5a059] hover:bg-[#b58b47] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Printer className="w-4 h-4" /> <span>Print / PDF</span>
          </button>
          <button onClick={handleWhatsAppShare} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> <span>WhatsApp</span>
          </button>
          <button onClick={handleCopyText} className="p-2 text-stone-500 hover:text-stone-900 border border-stone-200 rounded">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-2 text-stone-500 hover:text-rose-600 border border-stone-200 rounded ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-5xl items-center pb-20 print:pb-0 print:gap-0">
        
        {/* ========================================================================= */}
        {/* PAGE 1 — MAIN INVOICE BILL (Classic Letterhead)                           */}
        {/* ========================================================================= */}
        {(activeTab === 'both' || activeTab === 'page1') && (
          <div 
            id="invoice-page-1"
            className="a4-print-page w-full max-w-[210mm] min-h-[297mm] bg-white text-[#1e1b18] shadow-2xl px-10 py-6 sm:px-12 sm:py-8 relative print:border-none print:shadow-none print:px-8 print:py-4 print:max-w-none flex flex-col print:block print:h-auto print:min-h-0 print:break-after-page"
          >
            {renderLetterhead()}

            <h2 className="text-center font-bold text-lg uppercase tracking-widest text-[#1e1b18] mb-6 underline underline-offset-4">
              {doc.type === 'Invoice' ? 'TAX INVOICE' : 'PROJECT QUOTATION'}
            </h2>

            {/* Client & Document Details (Formal Table Format) */}
            <div className="flex justify-between items-start mb-6 text-[11px] leading-tight">
              {/* Left: Billed To */}
              <div className="w-[50%] pr-4 border-r border-stone-300">
                <p className="font-bold text-xs uppercase text-stone-500 mb-1">To,</p>
                <p className="font-bold text-[13px] text-[#1e1b18] mb-1">{doc.clientName}</p>
                <p className="text-stone-700 whitespace-pre-wrap">{doc.clientAddress}</p>
                <p className="text-stone-700 mt-1">Phone: {doc.clientPhone}</p>
                {doc.clientEmail && <p className="text-stone-700">Email: {doc.clientEmail}</p>}
                
                <div className="mt-4">
                  <p className="font-bold text-xs uppercase text-stone-500 mb-0.5">Project Details:</p>
                  <p className="font-semibold text-stone-800">{doc.projectName}</p>
                  <p className="text-stone-700">Type: {doc.projectType || 'Residential Interior'}</p>
                </div>
              </div>

              {/* Right: Invoice Details */}
              <div className="w-[45%] pl-4">
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="py-1 font-bold text-stone-500 uppercase w-32">Document No.</td>
                      <td className="py-1 font-bold text-[#1e1b18]">: {doc.docNumber}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-stone-500 uppercase">Date</td>
                      <td className="py-1 font-medium text-[#1e1b18]">: {doc.date}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-stone-500 uppercase">Valid Until</td>
                      <td className="py-1 font-medium text-[#1e1b18]">: {doc.dueDate || doc.validUntilOrDueDate || '30 Days Net'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-stone-500 uppercase">PAN No.</td>
                      <td className="py-1 font-medium text-[#1e1b18]">: {businessProfile.panNo || 'CMPYS4786H'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Classic Data Table */}
            <div className="w-full">
              <table className="w-full text-[11px] border-collapse border border-stone-800">
                <thead>
                  <tr className="bg-stone-100 text-[#1e1b18] uppercase tracking-wider font-bold">
                    <th className="border border-stone-800 py-2 px-2 text-center w-10">Sr.</th>
                    <th className="border border-stone-800 py-2 px-2 text-left">Particulars</th>
                    <th className="border border-stone-800 py-2 px-2 text-center w-20">Size</th>
                    <th className="border border-stone-800 py-2 px-2 text-center w-12">Qty</th>
                    <th className="border border-stone-800 py-2 px-2 text-center w-12">Unit</th>
                    <th className="border border-stone-800 py-2 px-2 text-right w-20">Rate(₹)</th>
                    <th className="border border-stone-800 py-2 px-2 text-right w-24">Amount(₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.sections.map((sec, sIdx) => (
                    <React.Fragment key={sec.id}>
                      <tr>
                        <td colSpan={7} className="border border-stone-800 py-2 px-2 font-bold text-[#1e1b18] bg-stone-50 uppercase text-[10px]">
                          {sec.roomName}
                        </td>
                      </tr>
                      {sec.items.map((it, itIdx) => (
                        <tr key={it.id} className="print:break-inside-avoid text-stone-800">
                          <td className="border border-stone-800 py-2 px-2 text-center align-top">{sIdx + 1}.{itIdx + 1}</td>
                          <td className="border border-stone-800 py-2 px-2 align-top">
                            <p className="font-bold text-[#1e1b18]">{it.particular}</p>
                            {it.description && <p className="text-[10px] text-stone-600 mt-1 whitespace-pre-wrap">{it.description}</p>}
                          </td>
                          <td className="border border-stone-800 py-2 px-2 text-center align-top">{it.size || '-'}</td>
                          <td className="border border-stone-800 py-2 px-2 text-center align-top">{it.quantity}</td>
                          <td className="border border-stone-800 py-2 px-2 text-center align-top">{it.unit || 'Sq.Ft.'}</td>
                          <td className="border border-stone-800 py-2 px-2 text-right align-top">{formatIndianCurrency(it.rate)}</td>
                          <td className="border border-stone-800 py-2 px-2 text-right font-semibold align-top">{formatIndianCurrency(it.amount)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  
                  {/* Totals Section within the table */}
                  <tr>
                    <td colSpan={5} className="border border-stone-800 py-2 px-4 text-right font-bold uppercase text-stone-600">Subtotal</td>
                    <td colSpan={2} className="border border-stone-800 py-2 px-2 text-right font-bold">₹ {formatIndianCurrency(doc.subtotal)}</td>
                  </tr>
                  {doc.discountAmount > 0 && (
                    <tr>
                      <td colSpan={5} className="border border-stone-800 py-2 px-4 text-right font-bold uppercase text-stone-600">Discount</td>
                      <td colSpan={2} className="border border-stone-800 py-2 px-2 text-right font-bold text-rose-600">- ₹ {formatIndianCurrency(doc.discountAmount)}</td>
                    </tr>
                  )}
                  {doc.additionalCharges > 0 && (
                    <tr>
                      <td colSpan={5} className="border border-stone-800 py-2 px-4 text-right font-bold uppercase text-stone-600">{doc.additionalChargesDesc || 'Additional Charges'}</td>
                      <td colSpan={2} className="border border-stone-800 py-2 px-2 text-right font-bold">₹ {formatIndianCurrency(doc.additionalCharges)}</td>
                    </tr>
                  )}
                  <tr className="bg-stone-100">
                    <td colSpan={5} className="border border-stone-800 py-3 px-4 text-right font-bold uppercase text-[#1e1b18] text-xs">Grand Total</td>
                    <td colSpan={2} className="border border-stone-800 py-3 px-2 text-right font-bold text-[#1e1b18] text-sm">₹ {formatIndianCurrency(doc.grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Words & Signatures (Page 1 Footer) */}
            <div className="mt-8 pt-4 flex justify-between items-end flex-1">
              <div className="text-[11px] w-2/3 space-y-3">
                <p>
                  <span className="font-bold text-[#1e1b18]">Amount in Words: </span>
                  <span className="font-semibold text-stone-700 italic">Rupees {numberToIndianWords(doc.grandTotal)} Only</span>
                </p>
                <div className="text-[10px] text-stone-600">
                  <p className="font-bold text-stone-800 mb-0.5">Declaration:</p>
                  <p>We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.</p>
                </div>
              </div>
              <div className="w-1/3 text-center">
                <p className="text-[11px] font-bold text-[#1e1b18] uppercase tracking-wider mb-12">For J.J. INTERIORS & MODUTECH</p>
                <div className="w-40 border-b border-stone-800 mx-auto mb-1"></div>
                <p className="text-[10px] font-bold text-stone-700 uppercase">Authorized Signatory</p>
              </div>
            </div>
            
            <div className="text-center mt-6 text-[9px] text-stone-400 border-t border-stone-200 pt-2 print:mt-auto">
              Page 1 of 2 • E. & O.E. • Subject to Gujarat Jurisdiction
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2 — PAYMENT DETAILS + TERMS & CONDITIONS (Classic Letterhead)        */}
        {/* ========================================================================= */}
        {(activeTab === 'both' || activeTab === 'page2') && (
          <div 
            id="invoice-page-2"
            className="a4-print-page w-full max-w-[210mm] min-h-[297mm] bg-white text-[#1e1b18] shadow-2xl px-10 py-6 sm:px-12 sm:py-8 relative print:border-none print:shadow-none print:px-8 print:py-4 print:max-w-none flex flex-col print:block print:h-auto print:min-h-0"
          >
            {renderLetterhead()}

            <h2 className="text-center font-bold text-lg uppercase tracking-widest text-[#1e1b18] mb-8 underline underline-offset-4">
              Commercial Terms & Conditions
            </h2>

            <div className="flex flex-col gap-8 flex-1">
              
              {/* Bank Details & Payment Status */}
              <div className="flex gap-8">
                <div className="flex-1 border border-stone-800 p-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-[#1e1b18] border-b border-stone-800 pb-2 mb-3">Bank Account Details</h3>
                  <table className="w-full text-[11px]">
                    <tbody>
                      <tr>
                        <td className="py-1 text-stone-600 font-semibold w-24">Bank Name</td>
                        <td className="py-1 font-bold text-[#1e1b18]">: {systemSettings.bankDetails.bankName}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-stone-600 font-semibold">Account Name</td>
                        <td className="py-1 font-bold text-[#1e1b18]">: {systemSettings.bankDetails.accountName}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-stone-600 font-semibold">Account No.</td>
                        <td className="py-1 font-bold text-[#1e1b18]">: {systemSettings.bankDetails.accountNumber}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-stone-600 font-semibold">IFSC Code</td>
                        <td className="py-1 font-bold text-[#1e1b18]">: {systemSettings.bankDetails.ifscCode}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-stone-600 font-semibold">UPI ID</td>
                        <td className="py-1 font-bold text-[#1e1b18]">: {systemSettings.bankDetails.upiId}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="w-64 border border-stone-800 p-4 bg-stone-50">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-[#1e1b18] border-b border-stone-800 pb-2 mb-3">Payment Summary</h3>
                  <div className="space-y-3 text-[11px]">
                    <div className="flex justify-between">
                      <span className="font-semibold text-stone-600">Total Bill:</span>
                      <span className="font-bold text-[#1e1b18]">₹ {formatIndianCurrency(doc.grandTotal)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span className="font-semibold">Paid Amount:</span>
                      <span className="font-bold">₹ {formatIndianCurrency(doc.amountPaid)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-300">
                      <span className="font-bold text-rose-700 uppercase">Balance Due:</span>
                      <span className="font-bold text-rose-700 text-sm">₹ {formatIndianCurrency(doc.balanceDue)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Terms */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest text-[#1e1b18] mb-3">Terms & Conditions</h3>
                <ol className="list-decimal list-outside ml-4 space-y-3 text-[11px] text-stone-800 leading-relaxed text-justify">
                  <li><strong>Payment Schedule:</strong> 50% advance along with confirmed work order, 40% on material delivery at site, and balance 10% on final installation & handover.</li>
                  <li><strong>Material Quality:</strong> All materials, laminates, hardware, and finishes will strictly adhere to the approved quotation and physical samples provided.</li>
                  <li><strong>Additional Work:</strong> Any civil, electrical, plumbing, or additional woodwork requested beyond this quotation will be charged extra on an actual basis.</li>
                  <li><strong>Timeline:</strong> Project execution timelines will be effective only upon site readiness, approval of 3D designs, and receipt of the advance payment.</li>
                  <li><strong>Warranty:</strong> J.J. Interiors provides a 10-year structural warranty on Modutech modular furniture. Hardware carries warranties as per OEM brand terms (e.g., Blum/Hettich).</li>
                  <li><strong>Cancellations:</strong> Due to the customized nature of interior projects, orders once confirmed and put into production cannot be cancelled or refunded.</li>
                  <li><strong>Jurisdiction:</strong> Any disputes arising out of this contract are subject to Vadodara, Gujarat jurisdiction only.</li>
                </ol>
              </div>

            </div>

            {/* Client Signature & Firm Signature */}
            <div className="mt-16 flex justify-between items-end print:break-inside-avoid">
              <div className="w-1/3 text-center">
                <div className="w-48 border-b border-stone-800 mx-auto mb-2"></div>
                <p className="text-[10px] font-bold text-[#1e1b18] uppercase">Client Signature</p>
                <p className="text-[10px] font-medium text-stone-600 mt-0.5">{doc.clientName}</p>
              </div>
              <div className="w-1/3 text-center">
                <p className="text-[11px] font-bold text-[#1e1b18] uppercase tracking-wider mb-12">For J.J. INTERIORS & MODUTECH</p>
                <div className="w-48 border-b border-stone-800 mx-auto mb-2"></div>
                <p className="text-[10px] font-bold text-[#1e1b18] uppercase">Authorized Signatory</p>
              </div>
            </div>

            <div className="text-center mt-8 text-[9px] text-stone-400 border-t border-stone-200 pt-2 print:mt-auto">
              Page 2 of 2 • E. & O.E. • Subject to Gujarat Jurisdiction
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
