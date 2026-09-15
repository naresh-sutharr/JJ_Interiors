import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Building2, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  Download, 
  CreditCard, 
  MessageSquare, 
  LogOut, 
  Sparkles, 
  Image as ImageIcon,
  Layers,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const ClientPortalPage: React.FC = () => {
  const { 
    clientPortalUser, 
    loginClientPortal, 
    logoutClientPortal, 
    clients, 
    bills, 
    paymentReceipts, 
    projects,
    businessProfile,
    showToast,
    setActiveReceipt 
  } = useApp();

  const [phoneInput, setPhoneInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const client = clientPortalUser?.client;

  // Find linked project from portfolio (if any) or create project profile
  const linkedProject = client?.projectType 
    ? projects.find((p) => p.title?.toLowerCase().includes(client.projectType?.toLowerCase() || '') || false)
    : null;

  // Find linked bills for this client
  const clientBills = client ? bills.filter((b) => b.clientId === client.id || b.clientPhone === client.phone || (client.name && b.clientName?.toLowerCase() === client.name?.toLowerCase())) : [];
  
  // Find linked receipts
  const clientReceipts = client ? paymentReceipts.filter((r) => r.clientPhone === client.phone || r.clientName?.toLowerCase() === client.name?.toLowerCase()) : [];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) {
      showToast('Please enter your registered mobile number.', 'error');
      return;
    }
    setIsSubmitting(true);
    const success = loginClientPortal(phoneInput.trim());
    setIsSubmitting(false);
    if (!success) {
      // provide quick hint about available demo client
      if (clients.length > 0) {
        showToast(`Try demo client phone: ${clients[0].phone}`, 'info');
      }
    }
  };

  // Milestones definition
  const milestones = [
    { stage: 'Concept & Spatial Layout', completed: true, date: 'Completed' },
    { stage: '3D Renderings & Client Approval', completed: true, date: 'Approved' },
    { stage: 'Material Sourcing & Factory Joinery', completed: client?.stage === 'In Progress' || client?.stage === 'Completed', date: client?.stage === 'Completed' ? 'Completed' : 'Active On-Site' },
    { stage: 'Civil Execution & Site Installation', completed: client?.stage === 'Completed', date: client?.stage === 'Completed' ? 'Finished' : 'In Progress' },
    { stage: 'Snag Rectification & Final Handover', completed: client?.stage === 'Completed', date: client?.stage === 'Completed' ? 'Handed Over' : 'Pending Finishing' },
  ];

  const totalBillValue = clientBills.reduce((sum, b) => sum + (b.grandTotal || 0), 0);
  const totalPaidValue = clientBills.reduce((sum, b) => {
    const paid = b.amountPaid || 0;
    return sum + paid;
  }, 0);
  const totalBalanceDue = Math.max(0, totalBillValue - totalPaidValue);

  return (
    <div className="w-full bg-[#faf8f5] text-[#1e1b18] min-h-[85vh]">
      
      {/* 1. Header Banner */}
      <section className="bg-[#161412] text-[#faf8f5] py-12 sm:py-16 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#c5a059]/40 text-xs font-semibold uppercase tracking-[0.22em] text-[#ebd5b3] mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Client Transparency Dashboard</span>
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                Client Project Portal
              </h1>
              <p className="text-stone-300 text-xs sm:text-sm font-light mt-2 max-w-xl">
                Real-time milestone tracking, site progress updates, architectural drawings, and transparent billing records.
              </p>
            </div>

            {client && (
              <div className="flex items-center gap-3 bg-white/10 p-3.5 border border-white/15">
                <div className="w-10 h-10 rounded-full bg-[#c5a059] text-black font-bold flex items-center justify-center font-display text-lg">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{client.name}</div>
                  <div className="text-[11px] text-stone-300 font-mono">{client.phone}</div>
                </div>
                <button
                  onClick={logoutClientPortal}
                  className="ml-3 p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Authentication View or Portal View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!client ? (
          /* Login Screen */
          <div className="max-w-md mx-auto bg-white border border-[#e8dfd5] p-8 sm:p-10 shadow-xl my-8">
            <div className="w-12 h-12 bg-amber-50 border border-[#c5a059]/30 text-[#c5a059] flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-6 h-6" />
            </div>

            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-[#1e1b18] font-normal">
                Access Your Project
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-light">
                Enter your mobile number registered during project onboarding with J.J. INTERIORS &amp; MODUTECH.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                  Mobile Number (WhatsApp)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 XXXXX"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8dfd5] focus:border-[#c5a059] focus:outline-none text-sm text-[#1e1b18] font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Access Project Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {/* Demo Quick Logins */}
            {clients.length > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-200 text-center">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-2">
                  Demo Instant Sign-In:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {clients.slice(0, 2).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setPhoneInput(c.phone);
                        loginClientPortal(c.phone);
                      }}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-[#ebd5b3]/50 text-stone-800 text-xs border border-stone-300 font-mono transition-colors cursor-pointer"
                    >
                      {c.name} ({c.phone})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Active Client Project Dashboard */
          <div className="space-y-8">
            
            {/* Top Project Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 border border-[#e8dfd5] shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block mb-1">
                  Project Title
                </span>
                <h4 className="font-display text-lg text-[#1e1b18] font-medium truncate">
                  {client.projectType || 'Residential Interior Project'}
                </h4>
                <p className="text-xs text-stone-500 mt-1">{client.status || 'Turnkey Execution'}</p>
              </div>

              <div className="bg-white p-5 border border-[#e8dfd5] shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block mb-1">
                  Current Stage
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${client.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="font-semibold text-sm text-[#1e1b18]">
                    {client.status || 'In Progress'}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">Site active under supervisor</p>
              </div>

              <div className="bg-white p-5 border border-[#e8dfd5] shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block mb-1">
                  Financial Status
                </span>
                <div className="text-lg font-bold text-[#1e1b18] font-mono">
                  ₹{totalPaidValue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {totalBalanceDue > 0 ? `Balance Due: ₹${totalBalanceDue.toLocaleString('en-IN')}` : 'All payments settled'}
                </p>
              </div>

              <div className="bg-white p-5 border border-[#e8dfd5] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block mb-1">
                    Dedicated Manager
                  </span>
                  <div className="text-sm font-semibold text-[#1e1b18]">Jay Jasol (Studio Principal)</div>
                </div>
                <a
                  href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998'}?text=${encodeURIComponent(`Hello, I am checking the client portal for "${client.projectName || client.name}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Manager</span>
                </a>
              </div>
            </div>

            {/* Execution Milestones */}
            <div className="bg-white p-6 sm:p-8 border border-[#e8dfd5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#e8dfd5] mb-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059] font-bold block">
                    Execution Lifecycle
                  </span>
                  <h3 className="font-display text-xl text-[#1e1b18] font-normal">
                    Project Milestones &amp; Progress
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-300">
                  Stage: {client.stage || 'In Progress'}
                </span>
              </div>

              <div className="space-y-4">
                {milestones.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-4 p-4 border transition-all ${
                      m.completed 
                        ? 'bg-emerald-50/40 border-emerald-200' 
                        : 'bg-[#faf8f5] border-stone-200 opacity-75'
                    }`}
                  >
                    <div className="mt-0.5">
                      {m.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-medium text-sm text-[#1e1b18]">
                          {idx + 1}. {m.stage}
                        </h4>
                        <span className="text-[11px] font-mono text-stone-500 uppercase">
                          {m.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Ledger & Invoices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Invoices & Estimates */}
              <div className="bg-white p-6 sm:p-8 border border-[#e8dfd5] shadow-xs">
                <h3 className="font-display text-xl text-[#1e1b18] font-normal mb-4 pb-3 border-b border-[#e8dfd5]">
                  Billing Documents &amp; Invoices
                </h3>

                {clientBills.length === 0 ? (
                  <p className="text-xs text-stone-500 italic py-4">
                    No active billing documents attached to your account yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {clientBills.map((b) => (
                      <div key={b.id} className="p-4 border border-[#e8dfd5] bg-[#faf8f5] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-[#1e1b18] text-white">
                              {b.type}
                            </span>
                            <span className="text-xs font-mono font-semibold text-[#1e1b18]">{b.docNumber}</span>
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono mt-1">
                            Issued: {b.docDate} • ₹{b.totalAmount.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-semibold ${
                          b.status === 'Paid' ? 'text-emerald-700 bg-emerald-100' : 'text-amber-700 bg-amber-100'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Receipts */}
              <div className="bg-white p-6 sm:p-8 border border-[#e8dfd5] shadow-xs">
                <h3 className="font-display text-xl text-[#1e1b18] font-normal mb-4 pb-3 border-b border-[#e8dfd5]">
                  Payment Receipts
                </h3>

                {clientReceipts.length === 0 ? (
                  <div className="py-6 text-center text-stone-500 text-xs font-light">
                    No individual receipts logged yet. Any official payments recorded by our accounts team will display here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {clientReceipts.map((rcpt) => (
                      <div key={rcpt.id} className="p-4 border border-emerald-200 bg-emerald-50/40 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono font-bold text-emerald-900 block">
                            {rcpt.receiptNumber}
                          </span>
                          <span className="text-[11px] text-stone-600 font-mono">
                            {rcpt.date} • ₹{rcpt.amountPaid.toLocaleString('en-IN')} ({rcpt.paymentMode})
                          </span>
                        </div>

                        <button
                          onClick={() => setActiveReceipt(rcpt)}
                          className="px-3 py-1 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-black text-[11px] uppercase font-semibold transition-colors cursor-pointer"
                        >
                          View Receipt
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Site Progress Photos (if linked project has gallery) */}
            {linkedProject && linkedProject.galleryImages && (
              <div className="bg-white p-6 sm:p-8 border border-[#e8dfd5] shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8dfd5]">
                  <ImageIcon className="w-5 h-5 text-[#c5a059]" />
                  <h3 className="font-display text-xl text-[#1e1b18] font-normal">
                    Site Execution Gallery
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {linkedProject.galleryImages?.map((img, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden bg-stone-900 border border-stone-200">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-[9px] font-mono">
                        View {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architectural Documents & Drawings */}
            <div className="bg-white p-6 sm:p-8 border border-[#e8dfd5] shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8dfd5]">
                <FileText className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-display text-xl text-[#1e1b18] font-normal">
                  Approved Architectural Drawings &amp; Specifications
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-stone-200 bg-[#faf8f5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#1e1b18] block">2D Furniture Layout Drawing</span>
                    <span className="text-[10px] text-stone-500 font-mono">CAD Approved • V4 Final</span>
                  </div>
                  <span className="px-2 py-1 bg-stone-200 text-stone-700 text-[10px] uppercase font-mono font-bold">
                    Archived
                  </span>
                </div>

                <div className="p-4 border border-stone-200 bg-[#faf8f5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#1e1b18] block">Electrical &amp; Ceiling Blueprint</span>
                    <span className="text-[10px] text-stone-500 font-mono">MEP Verified • Final</span>
                  </div>
                  <span className="px-2 py-1 bg-stone-200 text-stone-700 text-[10px] uppercase font-mono font-bold">
                    Archived
                  </span>
                </div>

                <div className="p-4 border border-stone-200 bg-[#faf8f5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#1e1b18] block">Material Swatch Matrix</span>
                    <span className="text-[10px] text-stone-500 font-mono">Laminates, Acrylic &amp; PU</span>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-mono font-bold">
                    Approved
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
