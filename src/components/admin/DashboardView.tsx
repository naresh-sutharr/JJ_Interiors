import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  Users, 
  Briefcase, 
  Receipt, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ArrowUpRight, 
  ArrowRight,
  Phone,
  Calendar,
  IndianRupee,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    clients, 
    leads,
    projects, 
    bills, 
    setAdminTab, 
    setEditingBill, 
    setBillingPrefillClient, 
    systemSettings 
  } = useApp();

  // Calculations for KPI Cards
  const totalClients = clients.length;
  const newClients = clients.filter((c) => c.status === 'New').length;
  const activeProjects = projects.filter((p) => p.status === 'Execution' || p.status === 'Design' || p.status === 'Planning').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  
  const quotations = bills.filter((b) => b.type === 'Quotation');
  const invoices = bills.filter((b) => b.type === 'Invoice');
  
  const pendingEstimates = quotations.filter((q) => q.paymentStatus === 'Pending').length;
  const totalInvoicesCount = invoices.length;
  const paidInvoicesCount = invoices.filter((i) => i.paymentStatus === 'Paid').length;
  
  const pendingPaymentsTotal = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);
  const totalRevenueCollected = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);

  // Recent data slices
  const recentClients = [...clients].reverse().slice(0, 4);
  const recentInvoices = invoices.slice(0, 4);
  const recentProjects = [...projects].slice(0, 4);
  const pendingInvoices = invoices.filter((i) => i.balanceDue > 0);

  const handleCreateNewInvoice = () => {
    setEditingBill(null);
    setBillingPrefillClient(null);
    setAdminTab('billing');
  };

  const handleCreateNewProject = () => {
    setAdminTab('projects');
  };

  const handleCreateNewClient = () => {
    setAdminTab('clients');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner / Welcome & Quick 1-Tap Action Hub */}
      <div className="bg-[#1e1b18] text-white p-6 sm:p-8 rounded-none border border-[#332e29] shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
            <span>Surat Studio Control Center</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl text-[#fbf9f5] font-light">
            Business Overview &amp; Operations
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 font-light">
            Live metrics across client pipelines, active project sites, and GST tax billing.
          </p>
        </div>

        {/* 1-Tap Quick Action Row */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setAdminTab('leads')}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Inquiries ({leads.filter(l => l.status === 'NEW').length})</span>
          </button>

          <button
            onClick={handleCreateNewClient}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Add Client</span>
          </button>

          <button
            onClick={handleCreateNewProject}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>New Project</span>
          </button>

          <button
            onClick={handleCreateNewInvoice}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4b26f] text-[#141210] rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Bill</span>
          </button>
        </div>
      </div>

      {/* 9 KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Total Revenue */}
        <div className="col-span-2 sm:col-span-1 bg-white p-5 border border-[#e2dcd4] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Revenue Paid</span>
            <div className="p-1.5 rounded bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1e1b18] tracking-tight">
            ₹{totalRevenueCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>From settled tax invoices</span>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white p-5 border border-[#e2dcd4] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Pending Due</span>
            <div className="p-1.5 rounded bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-900 tracking-tight">
            ₹{pendingPaymentsTotal.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            {pendingInvoices.length} invoices awaiting balance
          </div>
        </div>

        {/* Total Clients */}
        <div className="bg-white p-5 border border-[#e2dcd4] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Clients</span>
            <div className="p-1.5 rounded bg-blue-50 text-blue-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1e1b18]">
            {totalClients}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            <span className="text-blue-700 font-bold">{newClients} New Leads</span> in pipeline
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-white p-5 border border-[#e2dcd4] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Active Projects</span>
            <div className="p-1.5 rounded bg-purple-50 text-purple-700">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1e1b18]">
            {activeProjects}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {completedProjects} projects completed
          </div>
        </div>

        {/* Invoices & Estimates */}
        <div className="bg-white p-5 border border-[#e2dcd4] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Invoices / Estimates</span>
            <div className="p-1.5 rounded bg-stone-100 text-stone-700">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1e1b18]">
            {totalInvoicesCount} <span className="text-xs font-normal text-stone-400">/ {quotations.length}</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {paidInvoicesCount} fully paid invoices
          </div>
        </div>

      </div>

      {/* Dynamic Visual Analytics Section (Custom Responsive SVG Visualizations) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Revenue & Invoice Balance Comparison */}
        <div className="lg:col-span-8 bg-white p-6 border border-[#e2dcd4] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e1b18]">
                Billing &amp; Collections Health
              </h3>
              <p className="text-xs text-stone-500">Overview of paid collections vs. pending receivables</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#faf8f5] border border-[#e2dcd4] text-stone-700">
              FY 2025 - 2026
            </span>
          </div>

          {/* Bar comparison visual */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600"></span>
                  Collected Payments (Paid)
                </span>
                <span className="text-emerald-800">₹{totalRevenueCollected.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-1000"
                  style={{ width: `${(totalRevenueCollected / ((totalRevenueCollected + pendingPaymentsTotal) || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-amber-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                  Pending Invoice Balance (Due)
                </span>
                <span className="text-amber-800">₹{pendingPaymentsTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-1000"
                  style={{ width: `${(pendingPaymentsTotal / ((totalRevenueCollected + pendingPaymentsTotal) || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-center">
              <div className="p-3 bg-[#faf8f5] rounded border border-stone-200">
                <div className="text-[10px] uppercase font-bold text-stone-500">Tax / VAT</div>
                <div className="text-sm font-bold text-[#1e1b18] mt-0.5">
                  ₹{invoices.reduce((acc, i) => acc + i.taxAmount, 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 bg-[#faf8f5] rounded border border-stone-200">
                <div className="text-[10px] uppercase font-bold text-stone-500">Active Quotes Value</div>
                <div className="text-sm font-bold text-[#1e1b18] mt-0.5">
                  ₹{quotations.reduce((acc, q) => acc + q.grandTotal, 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 bg-[#faf8f5] rounded border border-stone-200">
                <div className="text-[10px] uppercase font-bold text-stone-500">Average Project Ticket</div>
                <div className="text-sm font-bold text-[#1e1b18] mt-0.5">
                  ₹{Math.round((totalRevenueCollected + pendingPaymentsTotal) / (totalInvoicesCount || 1)).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Project Pipeline Stages */}
        <div className="lg:col-span-4 bg-white p-6 border border-[#e2dcd4] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e1b18]">
                Projects Pipeline
              </h3>
              <button
                onClick={() => setAdminTab('projects')}
                className="text-xs text-[#c5a059] hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {[
                { status: 'Planning', count: projects.filter(p => p.status === 'Planning').length, color: 'bg-blue-500' },
                { status: 'Design', count: projects.filter(p => p.status === 'Design').length, color: 'bg-indigo-500' },
                { status: 'Execution', count: projects.filter(p => p.status === 'Execution').length, color: 'bg-amber-500' },
                { status: 'Completed', count: projects.filter(p => p.status === 'Completed').length, color: 'bg-emerald-500' },
              ].map((stage) => (
                <div key={stage.status} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`}></span>
                    <span className="font-medium text-stone-700">{stage.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{stage.count}</span>
                    <span className="text-stone-400">projects</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <button
              onClick={handleCreateNewProject}
              className="w-full py-2 bg-[#1e1b18] hover:bg-[#c5a059] text-white hover:text-[#1e1b18] text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              + Add New Portfolio Project
            </button>
          </div>
        </div>

      </div>

      {/* Operational Overviews: Recent Invoices, Recent Projects & CRM Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Recent Invoices */}
        <div className="bg-white border border-[#e2dcd4] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1b18]">
                  Recent Invoices
                </h3>
              </div>
              <button
                onClick={() => setAdminTab('bills-history')}
                className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            {recentInvoices.length === 0 ? (
              <div className="py-8 text-center text-stone-500 text-xs">
                No invoices created yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    onClick={() => {
                      setEditingBill(inv);
                      setAdminTab('bills-history');
                    }}
                    className="p-3 bg-[#faf8f5] border border-stone-200 rounded flex items-center justify-between hover:border-[#c5a059] transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1e1b18]">{inv.docNumber}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          inv.balanceDue > 0 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {inv.balanceDue > 0 ? `Due ₹${inv.balanceDue.toLocaleString('en-IN')}` : 'Settled'}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 font-medium truncate max-w-[150px] mt-0.5">
                        {inv.clientName}
                      </div>
                      <div className="text-[10.5px] text-stone-400">
                        ₹{inv.grandTotal.toLocaleString('en-IN')} • {inv.date}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setAdminTab('bills-history')}
            className="mt-4 w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded text-center transition-colors cursor-pointer"
          >
            View All Invoices
          </button>
        </div>

        {/* 2. Recent Projects */}
        <div className="bg-white border border-[#e2dcd4] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1b18]">
                  Recent Projects
                </h3>
              </div>
              <button
                onClick={() => setAdminTab('projects')}
                className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            {recentProjects.length === 0 ? (
              <div className="py-8 text-center text-stone-500 text-xs">
                No projects added yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setAdminTab('projects')}
                    className="p-3 bg-[#faf8f5] border border-stone-200 rounded flex items-center justify-between hover:border-[#c5a059] transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1e1b18] truncate max-w-[140px]">{p.title}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          p.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : p.status === 'Execution'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 font-medium truncate max-w-[150px] mt-0.5">
                        {p.client} • {p.location}
                      </div>
                      <div className="text-[10.5px] text-stone-400">
                        {p.category} • {p.scope}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setAdminTab('projects')}
            className="mt-4 w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded text-center transition-colors cursor-pointer"
          >
            View All Projects
          </button>
        </div>

        {/* 3. Recent CRM Leads & Pipeline */}
        <div className="bg-white border border-[#e2dcd4] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1b18]">
                  Recent CRM Leads
                </h3>
              </div>
              <button
                onClick={() => setAdminTab('clients')}
                className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {recentClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setAdminTab('clients')}
                  className="p-3 bg-[#faf8f5] border border-stone-200 rounded flex items-center justify-between hover:border-[#c5a059] transition-colors cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1e1b18]">{client.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        client.status === 'New'
                          ? 'bg-blue-100 text-blue-900'
                          : client.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-stone-200 text-stone-800'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5 truncate max-w-[150px]">
                      {client.projectType}
                    </div>
                    <div className="text-[10.5px] text-stone-400">
                      {client.phone} • {client.lastContact}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setAdminTab('clients')}
            className="mt-4 w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded text-center transition-colors cursor-pointer"
          >
            View All Clients
          </button>
        </div>

      </div>

    </div>
  );
};
