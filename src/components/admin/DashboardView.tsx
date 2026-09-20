import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  Users, 
  Briefcase, 
  Receipt, 
  TrendingUp, 
  Clock, 
  Plus, 
  ChevronRight,
  UserCheck,
  Calendar
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    clients, 
    leads,
    projects, 
    bills, 
    navigateAdminTo, 
    setEditingBill, 
    setBillingPrefillClient
  } = useApp();

  // Financial Calculations
  const quotations = bills.filter((b) => b.type === 'Quotation');
  const invoices = bills.filter((b) => b.type === 'Invoice');
  
  const pendingPaymentsTotal = invoices.reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);
  const totalRevenueCollected = invoices.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0);
  
  const unpaidInvoices = invoices.filter((i) => (i.balanceDue || 0) > 0).length;
  const openQuotations = quotations.filter((q) => q.paymentStatus === 'Pending').length;

  // Project Stage Calculations
  const activeProjects = projects.filter(p => p.status !== 'COMPLETED').length;
  const enqProjects = projects.filter(p => p.status === 'ENQUIRY').length;
  const designProjects = projects.filter(p => p.status === 'DESIGN').length;
  const prodProjects = projects.filter(p => p.status === 'PRODUCTION').length;
  const installProjects = projects.filter(p => p.status === 'INSTALLATION').length;
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;

  // Recent data
  const recentClients = [...clients].reverse().slice(0, 5);
  const recentInvoices = [...invoices].reverse().slice(0, 5);
  const recentProjects = [...projects].reverse().slice(0, 5);

  const handleCreateNewInvoice = () => {
    setEditingBill(null);
    setBillingPrefillClient(null);
    navigateAdminTo('billing');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Banner / Welcome & Quick Action Hub */}
      <div className="bg-[#1e1b18] text-white p-6 sm:p-8 border-b border-[#332e29] shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c5a059] mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
            <span>J.J. INTERIORS & MODUTECH</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#fbf9f5] font-light">
            BUSINESS OVERVIEW
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 font-light max-w-lg">
            Manage clients, interior projects, quotations, invoices, payments and business operations from one place.
          </p>
        </div>

        {/* Quick Action Row */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => navigateAdminTo('clients')}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>NEW CLIENT</span>
          </button>

          <button
            onClick={() => navigateAdminTo('projects')}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>NEW PROJECT</span>
          </button>

          <button
            onClick={handleCreateNewInvoice}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>NEW QUOTATION</span>
          </button>

          <button
            onClick={handleCreateNewInvoice}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4b26f] text-[#141210] rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>NEW BILL</span>
          </button>
        </div>
      </div>

      <div className="px-4 space-y-8">
        
        {/* Main KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-500 mb-1">Total Received</span>
            <span className="text-xl font-bold text-emerald-700">₹{totalRevenueCollected.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-500 mb-1">Pending Payments</span>
            <span className="text-xl font-bold text-amber-700">₹{pendingPaymentsTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-500 mb-1">Total Clients</span>
            <span className="text-xl font-bold text-[#1e1b18]">{clients.length}</span>
          </div>
          <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-500 mb-1">Active Projects</span>
            <span className="text-xl font-bold text-[#1e1b18]">{activeProjects}</span>
          </div>
          <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-500 mb-1">Open Quotations</span>
            <span className="text-xl font-bold text-[#1e1b18]">{openQuotations}</span>
          </div>
          <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-500 mb-1">Unpaid Invoices</span>
            <span className="text-xl font-bold text-[#1e1b18]">{unpaidInvoices}</span>
          </div>
        </div>

        {/* A. FINANCIAL OVERVIEW */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e1b18] mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#c5a059]" /> Financial Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#faf8f5] p-4 sm:p-5 border border-[#e2dcd4] flex flex-col gap-1 rounded overflow-hidden">
              <span className="text-xs uppercase font-semibold text-stone-600 line-clamp-1">Total Received</span>
              <span className="text-lg sm:text-base font-bold text-emerald-700 truncate">₹{totalRevenueCollected.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-[#faf8f5] p-4 sm:p-5 border border-[#e2dcd4] flex flex-col gap-1 rounded overflow-hidden">
              <span className="text-xs uppercase font-semibold text-stone-600 line-clamp-1">Pending Due</span>
              <span className="text-lg sm:text-base font-bold text-amber-700 truncate">₹{pendingPaymentsTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-[#faf8f5] p-4 sm:p-5 border border-[#e2dcd4] flex flex-col gap-1 rounded overflow-hidden">
              <span className="text-xs uppercase font-semibold text-stone-600 line-clamp-1">Quotes Done</span>
              <span className="text-lg sm:text-base font-bold text-[#1e1b18] truncate">{quotations.length}</span>
            </div>
            <div className="bg-[#faf8f5] p-4 sm:p-5 border border-[#e2dcd4] flex flex-col gap-1 rounded overflow-hidden">
              <span className="text-xs uppercase font-semibold text-stone-600 line-clamp-1">Invoices Done</span>
              <span className="text-lg sm:text-base font-bold text-[#1e1b18] truncate">{invoices.length}</span>
            </div>
          </div>
        </section>

        {/* B. PROJECT OVERVIEW */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e1b18] mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#c5a059]" /> Project Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex items-center justify-between">
              <span className="text-[11px] uppercase font-semibold text-stone-600">Enquiries</span>
              <span className="text-lg font-bold text-blue-600">{enqProjects}</span>
            </div>
            <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex items-center justify-between">
              <span className="text-[11px] uppercase font-semibold text-stone-600">In Design</span>
              <span className="text-lg font-bold text-indigo-600">{designProjects}</span>
            </div>
            <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex items-center justify-between">
              <span className="text-[11px] uppercase font-semibold text-stone-600">Production</span>
              <span className="text-lg font-bold text-amber-600">{prodProjects}</span>
            </div>
            <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex items-center justify-between">
              <span className="text-[11px] uppercase font-semibold text-stone-600">Installation</span>
              <span className="text-lg font-bold text-orange-600">{installProjects}</span>
            </div>
            <div className="bg-white p-4 border border-[#e2dcd4] shadow-sm rounded-md flex items-center justify-between">
              <span className="text-[11px] uppercase font-semibold text-stone-600">Completed</span>
              <span className="text-lg font-bold text-emerald-600">{completedProjects}</span>
            </div>
          </div>
        </section>

        {/* C. RECENT ACTIVITY & D. UPCOMING */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* C. Recent Clients */}
          <div className="bg-white border border-[#e2dcd4] p-5 shadow-sm rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e1b18]">Recent Clients</h3>
              <button onClick={() => navigateAdminTo('clients')} className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer">View All</button>
            </div>
            {recentClients.length === 0 ? (
              <div className="py-6 text-center text-stone-500 text-xs">0 Clients</div>
            ) : (
              <div className="space-y-2">
                {recentClients.map(client => (
                  <div key={client.id} onClick={() => navigateAdminTo('clients')} className="p-3 bg-[#faf8f5] border border-stone-200 rounded flex items-center justify-between cursor-pointer hover:border-[#c5a059]">
                    <div>
                      <div className="text-xs font-bold">{client.name}</div>
                      <div className="text-[10px] text-stone-500">{client.phone}</div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* C. Recent Projects */}
          <div className="bg-white border border-[#e2dcd4] p-5 shadow-sm rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e1b18]">Recent Projects</h3>
              <button onClick={() => navigateAdminTo('projects')} className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer">View All</button>
            </div>
            {recentProjects.length === 0 ? (
              <div className="py-6 text-center text-stone-500 text-xs">0 Active Projects</div>
            ) : (
              <div className="space-y-2">
                {recentProjects.map(p => (
                  <div key={p.id} onClick={() => navigateAdminTo('projects')} className="p-3 bg-[#faf8f5] border border-stone-200 rounded flex items-center justify-between cursor-pointer hover:border-[#c5a059]">
                    <div>
                      <div className="text-xs font-bold truncate max-w-[150px]">{p.title}</div>
                      <div className="text-[10px] text-stone-500">{p.status}</div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* C. Recent Bills */}
          <div className="bg-white border border-[#e2dcd4] p-5 shadow-sm rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e1b18]">Recent Bills</h3>
              <button onClick={() => navigateAdminTo('bills-history')} className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer">View All</button>
            </div>
            {recentInvoices.length === 0 ? (
              <div className="py-6 text-center text-stone-500 text-xs">0 Invoices</div>
            ) : (
              <div className="space-y-2">
                {recentInvoices.map(inv => (
                  <div key={inv.id} onClick={() => navigateAdminTo('bills-history')} className="p-3 bg-[#faf8f5] border border-stone-200 rounded flex items-center justify-between cursor-pointer hover:border-[#c5a059]">
                    <div>
                      <div className="text-xs font-bold">{inv.docNumber}</div>
                      <div className="text-[10px] text-stone-500">₹{inv.grandTotal.toLocaleString('en-IN')}</div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* D. UPCOMING */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e1b18] mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#c5a059]" /> Upcoming Schedule
          </h2>
          <div className="bg-white p-5 border border-[#e2dcd4] shadow-sm rounded-md flex flex-col md:flex-row gap-4 items-center justify-between text-center md:text-left py-8">
            <div>
              <div className="text-sm font-bold text-[#1e1b18]">No Upcoming Events</div>
              <div className="text-xs text-stone-500 mt-1">
                You have no site visits, installations, or payment due dates scheduled for this week.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateAdminTo('site_visits')}
                className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer uppercase tracking-wider"
              >
                Schedule Site Visit
              </button>
              <button 
                onClick={() => navigateAdminTo('receipts')}
                className="px-4 py-2 bg-[#1e1b18] text-white rounded text-xs font-semibold hover:bg-black cursor-pointer uppercase tracking-wider"
              >
                Record Payment
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
