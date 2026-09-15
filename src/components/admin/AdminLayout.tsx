import React, { useState } from 'react';
import { useApp, AdminTab } from '../../context/AppContext.tsx';
import { JJLogo } from '../common/JJLogo.tsx';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Layers, 
  Receipt, 
  FileText, 
  Building2, 
  Sparkles, 
  Image as ImageIcon, 
  FileEdit, 
  Sliders, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Plus, 
  Search, 
  Shield, 
  CheckCircle2, 
  Compass, 
  Settings as SettingsIcon,
  MessageSquare,
  UserCheck,
  Calendar,
  TrendingDown,
  Package,
  BarChart3
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { 
    adminTab, 
    navigateAdminTo, 
    currentUser, 
    logout, 
    setViewMode, 
    switchRole,
    businessProfile,
    clients,
    leads,
    bills,
    siteVisits,
    setEditingBill,
    setBillingPrefillClient
  } = useApp();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [quickActionModalOpen, setQuickActionModalOpen] = useState(false);
  const mainScrollRef = React.useRef<HTMLElement | null>(null);

  // Instantly scroll content to top whenever the active admin tab changes
  React.useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [adminTab]);

  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { 
      id: 'leads', 
      label: 'Inquiries CRM', 
      icon: <UserCheck className="w-4 h-4" />, 
      badge: leads.filter(l => l.status === 'NEW').length || undefined 
    },
    { 
      id: 'site_visits', 
      label: 'Site Visits', 
      icon: <Calendar className="w-4 h-4" />, 
      badge: siteVisits.filter(v => v.status === 'Scheduled').length || undefined 
    },
    { 
      id: 'clients', 
      label: 'Clients & Accounts', 
      icon: <Users className="w-4 h-4" />, 
      badge: clients.filter(c => c.status === 'New').length || undefined 
    },
    { id: 'projects', label: 'Projects & Portfolio', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing Generator', icon: <Receipt className="w-4 h-4" /> },
    { 
      id: 'bills-history', 
      label: 'Saved Bills & Invoices', 
      icon: <FileText className="w-4 h-4" />, 
      badge: bills.filter(b => b.paymentStatus === 'Pending').length || undefined 
    },
    { id: 'receipts', label: 'Payment Receipts', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'expenses', label: 'Project Expenses', icon: <TrendingDown className="w-4 h-4" /> },
    { id: 'suppliers', label: 'Vendors & Suppliers', icon: <Package className="w-4 h-4" /> },
    { id: 'catalog', label: 'Item Catalog', icon: <Layers className="w-4 h-4" /> },
    { id: 'services', label: 'Services Manager', icon: <Compass className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'profile', label: 'Business Profile', icon: <Building2 className="w-4 h-4" /> },
    { id: 'content', label: 'Website Content', icon: <FileEdit className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog & Articles', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'settings', label: 'System Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: AdminTab) => {
    navigateAdminTo(tab);
    setMobileDrawerOpen(false);
    setQuickActionModalOpen(false);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleQuickNewBill = () => {
    setEditingBill(null);
    setBillingPrefillClient(null);
    handleTabClick('billing');
  };

  const handleQuickNewClient = () => {
    handleTabClick('clients');
  };

  const handleQuickNewProject = () => {
    handleTabClick('projects');
  };

  return (
    <div className="min-h-screen bg-[#f3f0ea] text-[#1c1917] flex flex-col antialiased">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#1a1715] text-[#fbf9f5] border-b border-[#2d2925] px-4 py-2.5 flex items-center justify-between no-print">
        {/* Left Brand + Drawer toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-white rounded hover:bg-white/10 shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Only show on mobile when sidebar is hidden */}
          <div className="flex lg:hidden items-center gap-2 max-w-[200px] sm:max-w-none">
            <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center font-display font-semibold text-[#c5a059] text-xs sm:text-sm">
              JJ
            </div>
            <span className="font-display text-sm sm:text-lg font-bold tracking-wider text-white leading-tight line-clamp-2">
              {businessProfile.brandName}
            </span>
          </div>
        </div>

        {/* Global Action & Search */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Quick search clients, project names, bill numbers..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        {/* Right User Bar */}
        <div className="flex items-center gap-3">
          {/* Quick Action Button */}
          <button
            onClick={() => setQuickActionModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a059] hover:bg-[#d4b26f] text-[#141210] rounded text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            title="Open Quick Actions"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Quick Action</span>
          </button>

          {/* Role Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs">
            <Shield className="w-3 h-3 text-[#c5a059]" />
            <span className="text-stone-300">{currentUser?.role || 'Administrator'}</span>
            <select
              value={currentUser?.role || 'Administrator'}
              onChange={(e) => switchRole(e.target.value as any)}
              className="bg-transparent text-[11px] text-[#c5a059] focus:outline-none cursor-pointer"
            >
              <option value="Administrator" className="bg-[#1a1715] text-white">Admin</option>
              <option value="Manager" className="bg-[#1a1715] text-white">Manager</option>
              <option value="Staff" className="bg-[#1a1715] text-white">Staff</option>
            </select>
          </div>

          {/* View Public Website */}
          <button
            onClick={() => setViewMode('public')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-stone-300 hover:text-white hover:bg-white/5 rounded text-xs transition-colors cursor-pointer"
            title="View Public Client Website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden md:inline">Public Site</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-1.5 text-stone-400 hover:text-rose-400 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="Log Out Securely"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#1e1b18] text-stone-300 border-r border-[#2d2925] shrink-0 no-print">
          
          {/* Logo Area */}
          <div className="p-4 border-b border-white/5 flex justify-start pl-4 items-center">
             <JJLogo theme="dark" size="sm" customLogoUrl={businessProfile.logoUrl} />
          </div>

          <div className="p-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center font-display font-semibold text-[#c5a059] overflow-hidden">
              {businessProfile.ownerPhoto ? (
                <img src={businessProfile.ownerPhoto} alt="Owner" className="w-full h-full object-cover" />
              ) : (
                'JJ'
              )}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">{businessProfile.ownerName}</div>
              <div className="text-[11px] text-stone-400 truncate">Surat Studio Operations</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
            {menuItems.map((item) => {
              const active = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#c5a059] text-[#141210] font-semibold shadow-sm'
                      : 'text-stone-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${active ? 'bg-[#141210] text-[#c5a059]' : 'bg-[#c5a059] text-[#141210]'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Status */}
          <div className="p-3 border-t border-white/5 text-[11px] text-stone-500 flex items-center justify-between">
            <div className="flex items-center gap-1 text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online • Surat Server</span>
            </div>
            <span>v2.4</span>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer ("More" Menu) */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm flex">
            <div className="w-80 max-w-[85vw] bg-[#1e1b18] text-stone-200 h-full flex flex-col p-4 shadow-2xl animate-slide-right">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-base text-white tracking-wide">
                    {businessProfile.brandName || 'J.J. INTERIORS & MODUTECH'}
                  </span>
                  <span className="text-[9px] bg-[#c5a059] text-black px-1.5 py-0.5 rounded font-bold uppercase">
                    Admin
                  </span>
                </div>
                <button onClick={() => setMobileDrawerOpen(false)} className="p-1.5 text-stone-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Actions Block */}
              <div className="mb-4 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <div className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider mb-2">
                  Quick Actions
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      handleQuickNewClient();
                    }}
                    className="p-2 bg-white/5 hover:bg-[#c5a059]/20 border border-white/10 rounded text-left flex items-center gap-1.5 text-xs text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>New Client</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      handleQuickNewProject();
                    }}
                    className="p-2 bg-white/5 hover:bg-[#c5a059]/20 border border-white/10 rounded text-left flex items-center gap-1.5 text-xs text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>New Project</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      handleQuickNewBill();
                    }}
                    className="p-2 bg-white/5 hover:bg-[#c5a059]/20 border border-white/10 rounded text-left flex items-center gap-1.5 text-xs text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>New Bill</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      setEditingBill(null);
                      setBillingPrefillClient(null);
                      handleTabClick('billing');
                    }}
                    className="p-2 bg-white/5 hover:bg-[#c5a059]/20 border border-white/10 rounded text-left flex items-center gap-1.5 text-xs text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Quotation</span>
                  </button>
                </div>
              </div>

              {/* Module Navigation List */}
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1.5 px-1">
                All Modules
              </div>
              <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium cursor-pointer transition-colors ${
                      adminTab === item.id
                        ? 'bg-[#c5a059] text-[#141210] font-semibold'
                        : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#c5a059] text-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-2">
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    setViewMode('public');
                  }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs text-center rounded text-stone-200 cursor-pointer"
                >
                  View Public Website
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-900 text-xs text-rose-300 text-center rounded cursor-pointer"
                >
                  Secure Log Out
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
          </div>
        )}

        {/* Global Quick Action Modal */}
        {quickActionModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1e1b18] text-white border border-[#2d2925] rounded-xl max-w-sm w-full p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#c5a059]" />
                  <h3 className="font-display font-semibold text-lg text-white">Create New</h3>
                </div>
                <button
                  onClick={() => setQuickActionModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setQuickActionModalOpen(false);
                    handleQuickNewClient();
                  }}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded bg-amber-500/20 text-[#c5a059]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">+ New Client CRM Entry</div>
                    <div className="text-[11px] text-stone-400">Add client inquiry, site details & status</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setQuickActionModalOpen(false);
                    handleQuickNewProject();
                  }}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded bg-blue-500/20 text-blue-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">+ New Project / Portfolio</div>
                    <div className="text-[11px] text-stone-400">Track execution stage, timeline & photos</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setQuickActionModalOpen(false);
                    handleQuickNewBill();
                  }}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded bg-emerald-500/20 text-emerald-400">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">+ New Invoice</div>
                    <div className="text-[11px] text-stone-400">Create itemized invoice with bank info</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setQuickActionModalOpen(false);
                    setEditingBill(null);
                    setBillingPrefillClient(null);
                    handleTabClick('billing');
                  }}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded bg-purple-500/20 text-purple-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">+ New Quotation / Estimate</div>
                    <div className="text-[11px] text-stone-400">Prepare modular interior quote for approval</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Container Area */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

      {/* Mobile Sticky Bottom Navigation Bar: Clean 5 Tabs without duplicate Billing */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#1a1715] border-t border-[#2d2925] text-stone-300 px-1 py-2 flex justify-around items-center no-print shadow-2xl">
        <button
          onClick={() => handleTabClick('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer transition-colors ${adminTab === 'dashboard' ? 'text-[#c5a059] font-bold' : 'text-stone-400 hover:text-white'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10.5px] mt-0.5">Dashboard</span>
        </button>

        <button
          onClick={() => handleTabClick('clients')}
          className={`flex flex-col items-center py-1 px-2 rounded relative cursor-pointer transition-colors ${adminTab === 'clients' ? 'text-[#c5a059] font-bold' : 'text-stone-400 hover:text-white'}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10.5px] mt-0.5">Clients</span>
          {clients.filter(c => c.status === 'New').length > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-[#c5a059]"></span>
          )}
        </button>

        <button
          onClick={() => handleTabClick('projects')}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer transition-colors ${adminTab === 'projects' ? 'text-[#c5a059] font-bold' : 'text-stone-400 hover:text-white'}`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10.5px] mt-0.5">Projects</span>
        </button>

        <button
          onClick={() => handleTabClick('billing')}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer transition-colors ${adminTab === 'billing' ? 'text-[#c5a059] font-bold' : 'text-stone-400 hover:text-white'}`}
        >
          <Receipt className="w-5 h-5" />
          <span className="text-[10.5px] mt-0.5">Billing</span>
        </button>

        <button
          onClick={() => setMobileDrawerOpen(true)}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer transition-colors ${
            ['bills-history', 'catalog', 'services', 'profile', 'content', 'testimonials', 'blog', 'media', 'settings'].includes(adminTab)
              ? 'text-[#c5a059] font-bold'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10.5px] mt-0.5">More</span>
        </button>
      </div>

    </div>
  );
};
