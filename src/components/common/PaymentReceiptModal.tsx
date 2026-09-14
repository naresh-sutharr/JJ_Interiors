import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { numberToIndianWords, formatIndianCurrency } from '../../utils/numberToWords.ts';
import { JJLogo } from './JJLogo.tsx';
import { X, Printer, MessageSquare, CheckCircle2, QrCode } from 'lucide-react';

export const PaymentReceiptModal: React.FC = () => {
  const { activeReceipt, setActiveReceipt, businessProfile, showToast } = useApp();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const text = `*OFFICIAL PAYMENT RECEIPT*\n*${businessProfile.businessName}*\n\nReceipt No: ${activeReceipt.receiptNumber}\nDate: ${activeReceipt.date}\nClient: ${activeReceipt.clientName}\nProject: ${activeReceipt.projectName || 'Interior Execution'}\n\nAmount Received: ₹${formatIndianCurrency(activeReceipt.amountPaid)}\nPayment Mode: ${activeReceipt.paymentMode} ${activeReceipt.referenceNo ? `(Ref: ${activeReceipt.referenceNo})` : ''}\nAllocation: ${activeReceipt.notes || 'Project Milestone Advance'}\n\nThank you for your business.\nAuthorized Signatory, J.J. INTERIORS & MODUTECH`;
    const phone = activeReceipt.clientPhone.replace(/[^0-9]/g, '') || '';
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const amountInWords = numberToIndianWords(activeReceipt.amountPaid);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      <div className="relative w-full max-w-2xl bg-white text-[#1e1b18] shadow-2xl border border-[#e8dfd5] p-6 sm:p-10 my-auto print:border-0 print:shadow-none print:m-0 print:p-8">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 no-print">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5a059]">
            Official Payment Receipt Voucher
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsApp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setActiveReceipt(null)}
              className="p-1.5 text-stone-400 hover:text-black rounded-full transition-colors cursor-pointer"
              aria-label="Close Receipt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="border border-stone-300 p-6 sm:p-8 bg-white relative">
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <span className="text-9xl font-display font-bold">JJ</span>
          </div>

          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2 border-[#1e1b18] gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1e1b18]">
                {businessProfile.businessName}
              </h2>
              <p className="text-xs text-[#c5a059] font-medium uppercase tracking-widest mt-0.5">
                Interior Architecture • Turnkey Execution • Modutech
              </p>
              <p className="text-[11px] text-stone-500 font-light mt-1 max-w-sm">
                {businessProfile.address}
              </p>
              <p className="text-[11px] text-stone-600 font-mono mt-0.5">
                Ph: {businessProfile.phone}
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-stone-200 sm:pl-6 shrink-0">
              <span className="inline-block px-3 py-1 bg-[#1e1b18] text-white font-mono text-[11px] uppercase tracking-widest font-bold mb-2">
                Payment Receipt
              </span>
              <div className="text-sm font-bold font-mono text-stone-900">
                {activeReceipt.receiptNumber}
              </div>
              <div className="text-xs text-stone-500 font-mono mt-1">
                Date: {activeReceipt.date}
              </div>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="py-6 space-y-4 text-xs sm:text-sm">
            
            <div className="flex flex-col sm:flex-row justify-between border-b border-stone-200 pb-3 gap-2">
              <span className="text-stone-500 font-medium">Received with thanks from:</span>
              <span className="font-semibold text-stone-900 text-right sm:text-base">
                {activeReceipt.clientName}
                {activeReceipt.clientPhone && <span className="block text-xs font-mono font-normal text-stone-500">{activeReceipt.clientPhone}</span>}
              </span>
            </div>

            {activeReceipt.projectName && (
              <div className="flex justify-between border-b border-stone-200 pb-3">
                <span className="text-stone-500 font-medium">Project Name:</span>
                <span className="font-medium text-stone-800">{activeReceipt.projectName}</span>
              </div>
            )}

            <div className="flex justify-between border-b border-stone-200 pb-3">
              <span className="text-stone-500 font-medium">Payment Mode &amp; Reference:</span>
              <span className="font-mono text-stone-800">
                {activeReceipt.paymentMode} {activeReceipt.referenceNo ? `• Ref/UTR: ${activeReceipt.referenceNo}` : ''}
              </span>
            </div>

            {activeReceipt.notes && (
              <div className="flex justify-between border-b border-stone-200 pb-3">
                <span className="text-stone-500 font-medium">Payment Toward:</span>
                <span className="text-stone-800 text-right font-light">{activeReceipt.notes}</span>
              </div>
            )}

            {/* Amount Box */}
            <div className="bg-[#faf8f5] border border-[#e8dfd5] p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block mb-1">
                  Amount In Words:
                </span>
                <span className="font-serif italic text-stone-800 text-sm sm:text-base capitalize">
                  {amountInWords}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block mb-0.5">
                  Amount Received
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1e1b18]">
                  ₹{formatIndianCurrency(activeReceipt.amountPaid)}
                </span>
              </div>
            </div>

          </div>

          {/* Signatures & Seal */}
          <div className="pt-8 border-t border-stone-200 flex justify-between items-end text-xs">
            <div className="text-stone-400 text-[10px]">
              <p>Subject to realization of Cheque / Online Transfer.</p>
              <p>This is a computer-generated official receipt voucher.</p>
            </div>

            <div className="text-right">
              <div className="h-12 flex items-end justify-end mb-1">
                <span className="font-serif italic text-stone-600 text-sm">Jay Jasol</span>
              </div>
              <div className="border-t border-stone-400 pt-1 font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
                For J.J. INTERIORS &amp; MODUTECH
              </div>
              <div className="text-[10px] text-stone-400">Authorized Signatory</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
