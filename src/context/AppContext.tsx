import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  BusinessProfile, 
  TrustStats, 
  Project, 
  Service, 
  Client, 
  Lead,
  CatalogItem, 
  BillDocument, 
  PaymentRecord, 
  Testimonial, 
  FAQItem, 
  BlogPost, 
  MediaItem, 
  AdminUser, 
  SystemSettings,
  AdminRole,
  SiteVisit,
  Expense,
  Supplier,
  NotificationItem,
  AuditLog,
  PaymentReceipt,
  SEOSettings,
  AnalyticsSummary
} from '../types.ts';
import { 
  initialBusinessProfile, 
  initialTrustStats, 
  initialProjects, 
  initialServices, 
  initialClients, 
  initialLeads,
  initialCatalogItems, 
  initialBills, 
  initialTestimonials, 
  initialFAQs, 
  initialBlogPosts, 
  initialMediaItems, 
  initialSystemSettings,
  initialSiteVisits,
  initialExpenses,
  initialSuppliers,
  initialNotifications,
  initialAuditLogs,
  initialSEOSettings,
  initialAnalytics
} from '../data/initialData.ts';

export type PublicRoute = '/' | '/about' | '/services' | '/projects' | '/process' | '/testimonials' | '/contact' | string;

export type AdminTab = 
  | 'dashboard' 
  | 'leads'
  | 'site_visits'
  | 'clients' 
  | 'projects' 
  | 'services' 
  | 'catalog' 
  | 'billing' 
  | 'bills-history' 
  | 'expenses'
  | 'suppliers'
  | 'profile' 
  | 'content' 
  | 'testimonials'
  | 'media' 
  | 'blog' 
  | 'seo'
  | 'settings'
  | 'receipts';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface ConsultationPrefill {
  projectName?: string;
  projectUrl?: string;
  serviceName?: string;
}

interface AppContextType {
  // Navigation & View
  viewMode: 'public' | 'admin';
  setViewMode: (mode: 'public' | 'admin') => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  publicRoute: PublicRoute;
  navigateTo: (route: string) => void;
  
  // Auth
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (usernameOrEmail: string, password: string) => boolean;
  logout: () => void;
  switchRole: (role: AdminRole) => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;

  // Modals & Public States
  activeProjectModal: Project | null;
  setActiveProjectModal: (proj: Project | null) => void;
  activeServiceModal: Service | null;
  setActiveServiceModal: (srv: Service | null) => void;
  activeBlogModal: BlogPost | null;
  setActiveBlogModal: (post: BlogPost | null) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  consultationPrefill: ConsultationPrefill | null;
  openConsultationWithPrefill: (prefill: ConsultationPrefill) => void;
  
  // Quick billing target
  editingBill: BillDocument | null;
  setEditingBill: (bill: BillDocument | null) => void;
  billingPrefillClient: Client | null;
  setBillingPrefillClient: (client: Client | null) => void;

  // Data Collections
  businessProfile: BusinessProfile;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;

  trustStats: TrustStats;
  updateTrustStats: (stats: Partial<TrustStats>) => void;

  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;

  // Saved / Bookmarked Projects (Local Storage)
  savedProjectIds: string[];
  toggleSaveProject: (id: string) => void;
  isProjectSaved: (id: string) => boolean;

  services: Service[];
  updateService: (id: string, srv: Partial<Service>) => void;
  addService: (srv: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;

  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => string;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  // Leads CRM & Consultation Pipeline
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => string;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  convertLeadToClient: (leadId: string) => Client | null;

  // Site Visits
  siteVisits: SiteVisit[];
  addSiteVisit: (visit: Omit<SiteVisit, 'id' | 'createdAt'>) => string;
  updateSiteVisit: (id: string, visit: Partial<SiteVisit>) => void;
  deleteSiteVisit: (id: string) => void;

  // Expenses & Suppliers
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => string;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt'>) => string;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;

  // Notifications & Audit
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;

  auditLogs: AuditLog[];
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;

  // Payment Receipts
  paymentReceipts: PaymentReceipt[];
  generatePaymentReceipt: (params: { billId: string; amountPaid: number; paymentMode: string; referenceNumber?: string; notes?: string }) => PaymentReceipt;
  activeReceipt: PaymentReceipt | null;
  setActiveReceipt: (receipt: PaymentReceipt | null) => void;

  // SEO & Analytics
  seoSettings: SEOSettings;
  updateSEOSettings: (settings: Partial<SEOSettings>) => void;
  analytics: AnalyticsSummary;
  recordPageView: (path: string) => void;
  recordProjectView: (projectId: string) => void;
  recordContactClick: () => void;
  recordWhatsAppClick: () => void;
  recordConsultationRequest: (source?: string) => void;

  // Quick Lead/Client targeting in Admin
  selectedClientIdForView: string | null;
  setSelectedClientIdForView: (id: string | null) => void;
  selectedLeadIdForView: string | null;
  setSelectedLeadIdForView: (id: string | null) => void;
  navigateAdminTo: (tab: AdminTab, itemId?: string, itemType?: string) => void;

  catalogItems: CatalogItem[];
  addCatalogItem: (item: Omit<CatalogItem, 'id'>) => void;
  updateCatalogItem: (id: string, item: Partial<CatalogItem>) => void;
  deleteCatalogItem: (id: string) => void;

  bills: BillDocument[];
  addBill: (bill: Omit<BillDocument, 'id' | 'createdAt'>) => BillDocument;
  updateBill: (id: string, bill: Partial<BillDocument>) => void;
  deleteBill: (id: string) => void;
  duplicateBill: (id: string) => void;
  convertQuotationToInvoice: (quotationId: string) => BillDocument | null;
  getNextDocNumber: (type: 'Quotation' | 'Invoice') => string;
  recordPayment: (billId: string, payment: Omit<PaymentRecord, 'id'>) => void;

  testimonials: Testimonial[];
  addTestimonial: (tst: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, tst: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  mediaItems: MediaItem[];
  addMediaItem: (media: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  deleteMediaItem: (id: string) => void;

  systemSettings: SystemSettings;
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;

  // Admin Theme & Command Palette
  adminTheme: 'dark' | 'light';
  toggleAdminTheme: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Client Portal
  clientPortalUser: { phone: string; client: Client } | null;
  loginClientPortal: (phone: string) => boolean;
  logoutClientPortal: () => void;

  // Aliases for compatibility
  adminUser: AdminUser | null;
  saveBill: (bill: BillDocument) => void;
  addPaymentToBill: (billId: string, payment: any) => void;
  addFaq: (faq: any) => void;
  deleteFaq: (id: string) => void;
  resetToInitialData: () => void;

  // Global Toast Notification
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Backup & Restore
  exportBackupData: () => void;
  importBackupData: (jsonString: string) => boolean;
  resetAllToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'jj_business_profile_v4',
  STATS: 'jj_trust_stats_v4',
  PROJECTS: 'jj_projects_v4',
  SAVED_PROJECTS: 'jj_saved_projects_v4',
  SERVICES: 'jj_services_v4',
  CLIENTS: 'jj_clients_v4',
  LEADS: 'jj_leads_v4',
  SITE_VISITS: 'jj_site_visits_v4',
  EXPENSES: 'jj_expenses_v4',
  SUPPLIERS: 'jj_suppliers_v4',
  NOTIFICATIONS: 'jj_notifications_v4',
  AUDIT_LOGS: 'jj_audit_logs_v4',
  PAYMENT_RECEIPTS: 'jj_payment_receipts_v4',
  SEO: 'jj_seo_settings_v4',
  ANALYTICS: 'jj_analytics_v4',
  ADMIN_THEME: 'jj_admin_theme_v4',
  CATALOG: 'jj_catalog_v4',
  BILLS: 'jj_bills_v4',
  TESTIMONIALS: 'jj_testimonials_v4',
  FAQS: 'jj_faqs_v4',
  BLOG: 'jj_blog_v4',
  MEDIA: 'jj_media_v4',
  SETTINGS: 'jj_settings_v4',
  AUTH: 'jj_auth_user_v4',
};

const normalizePublicRoute = (path: string): PublicRoute => {
  if (!path) return '/';
  const clean = path.replace(/\/$/, '') || '/';
  if (clean === '/about') return '/about';
  if (clean === '/services') return '/services';
  if (clean === '/projects') return '/projects';

  if (clean.startsWith('/projects/') && clean.length > 10) {
    return clean as PublicRoute;
  }
  if (clean === '/testimonials') return '/testimonials';
  if (clean === '/contact') return '/contact';
  return '/';
};

const getInitialPublicRoute = (): PublicRoute => {
  if (typeof window === 'undefined') return '/';
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');
  if (pageParam) {
    return normalizePublicRoute(`/${pageParam}`);
  }
  const hash = window.location.hash;
  if (hash && hash.startsWith('#/')) {
    return normalizePublicRoute(hash.substring(1));
  }
  return normalizePublicRoute(window.location.pathname);
};

const getInitialAdminTab = (): AdminTab => {
  if (typeof window === 'undefined') return 'dashboard';
  const path = window.location.pathname;
  if (path.startsWith('/admin')) {
    const tab = path.replace('/admin', '').replace(/^\//, '');
    if (tab) {
      return tab as AdminTab;
    }
  }
  return 'dashboard';
};

const getInitialViewMode = (): 'public' | 'admin' => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return 'admin';
  }
  return 'public';
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(getInitialViewMode);
  const [adminTab, setAdminTab] = useState<AdminTab>(getInitialAdminTab);
  const [publicRoute, setPublicRoute] = useState<PublicRoute>(getInitialPublicRoute);

  const navigateTo = (targetRoute: string) => {
    const norm = normalizePublicRoute(targetRoute);
    
    // Only push state if the route is actually changing
    const isNewRoute = typeof window !== 'undefined' && window.location.pathname !== norm;
    
    setPublicRoute(norm);
    setViewMode('public');
    
    if (typeof window !== 'undefined') {
      if (isNewRoute) {
        try {
          window.history.pushState(null, '', norm);
        } catch {
          // ignore in strict sandboxed frames
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  // Listen for browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        setViewMode('admin');
        const tab = path.replace('/admin', '').replace(/^\//, '');
        setAdminTab(tab ? (tab as AdminTab) : 'dashboard');
      } else {
        setViewMode('public');
        const route = getInitialPublicRoute();
        setPublicRoute(route);
      }
      // Let the browser handle scroll restoration on popstate naturally
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Guarantee every page starts at the top (scroll position = 0)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [publicRoute]);

  // Auth State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const isAuthenticated = !!currentUser;
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Modals & Public Overlays
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [activeServiceModal, setActiveServiceModal] = useState<Service | null>(null);
  const [activeBlogModal, setActiveBlogModal] = useState<BlogPost | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Quick billing target
  const [editingBill, setEditingBill] = useState<BillDocument | null>(null);
  const [billingPrefillClient, setBillingPrefillClient] = useState<Client | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper loader from localStorage
  function loadStored<T>(key: string, defaultVal: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultVal;
      const parsed = JSON.parse(item);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return { ...defaultVal, ...parsed };
      }
      return parsed;
    } catch {
      return defaultVal;
    }
  }

  // Data Collections
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(() => 
    loadStored(STORAGE_KEYS.PROFILE, initialBusinessProfile)
  );

  // One-time guaranteed sync for updates
  useEffect(() => {
    if (!localStorage.getItem('jj_migration_v5')) {
      setProjects(initialProjects);
      setBlogPosts(initialBlogPosts);
      setBusinessProfile(initialBusinessProfile);
      localStorage.setItem('jj_migration_v5', 'done');
    }
  }, []);

  const [trustStats, setTrustStats] = useState<TrustStats>(() => 
    loadStored(STORAGE_KEYS.STATS, initialTrustStats)
  );

  const [projects, setProjects] = useState<Project[]>(() => 
    loadStored(STORAGE_KEYS.PROJECTS, initialProjects)
  );

  const [services, setServices] = useState<Service[]>(() => 
    loadStored(STORAGE_KEYS.SERVICES, initialServices)
  );

  const [clients, setClients] = useState<Client[]>(() => 
    loadStored(STORAGE_KEYS.CLIENTS, initialClients)
  );

  const [leads, setLeads] = useState<Lead[]>(() => 
    loadStored(STORAGE_KEYS.LEADS, initialLeads)
  );

  // Quick navigation and targeting state
  const [selectedClientIdForView, setSelectedClientIdForView] = useState<string | null>(null);
  const [selectedLeadIdForView, setSelectedLeadIdForView] = useState<string | null>(null);

  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(() => 
    loadStored(STORAGE_KEYS.CATALOG, initialCatalogItems)
  );

  const [bills, setBills] = useState<BillDocument[]>(() => 
    loadStored(STORAGE_KEYS.BILLS, initialBills)
  );

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => 
    loadStored(STORAGE_KEYS.TESTIMONIALS, initialTestimonials)
  );

  const [faqs, setFaqs] = useState<FAQItem[]>(() => 
    loadStored(STORAGE_KEYS.FAQS, initialFAQs)
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => 
    loadStored(STORAGE_KEYS.BLOG, initialBlogPosts)
  );

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => 
    loadStored(STORAGE_KEYS.MEDIA, initialMediaItems)
  );

  const [systemSettings, setSystemSettings] = useState<SystemSettings>(() => 
    loadStored(STORAGE_KEYS.SETTINGS, initialSystemSettings)
  );

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(businessProfile));
  }, [businessProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(trustStats));
  }, [trustStats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(catalogItems));
  }, [catalogItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills));
  }, [bills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaItems));
  }, [mediaItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(systemSettings));
  }, [systemSettings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [currentUser]);

  // Saved / Bookmarked Projects
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => 
    loadStored(STORAGE_KEYS.SAVED_PROJECTS, [])
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_PROJECTS, JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  const toggleSaveProject = (id: string) => {
    setSavedProjectIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Project removed from your saved list.', 'info');
        return prev.filter((pId) => pId !== id);
      } else {
        showToast('Project saved! You can view it under Saved Projects.', 'success');
        return [...prev, id];
      }
    });
  };

  const isProjectSaved = (id: string) => savedProjectIds.includes(id);

  // Site Visits
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(() => 
    loadStored(STORAGE_KEYS.SITE_VISITS, initialSiteVisits)
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(siteVisits));
  }, [siteVisits]);

  const addSiteVisit = (visit: Omit<SiteVisit, 'id' | 'createdAt'>): string => {
    const id = 'sv-' + Math.random().toString(36).substring(2, 7);
    const newVisit: SiteVisit = {
      ...visit,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSiteVisits((prev) => [newVisit, ...prev]);
    addNotification({
      title: 'Site Visit Scheduled',
      message: `${visit.clientName} on ${visit.date} at ${visit.time}`,
      type: 'site_visit',
      targetTab: 'site_visits',
      targetId: id
    });
    addAuditLog({
      action: 'Site Visit Scheduled',
      user: currentUser?.name || 'Admin',
      targetType: 'SiteVisit',
      targetId: id,
      details: `Scheduled for ${visit.clientName} at ${visit.address}`
    });
    showToast('Site visit scheduled successfully!');
    return id;
  };

  const updateSiteVisit = (id: string, visit: Partial<SiteVisit>) => {
    setSiteVisits((prev) => prev.map((sv) => sv.id === id ? { ...sv, ...visit } : sv));
    showToast('Site visit record updated.');
  };

  const deleteSiteVisit = (id: string) => {
    setSiteVisits((prev) => prev.filter((sv) => sv.id !== id));
    showToast('Site visit record removed.');
  };

  // Expenses & Suppliers
  const [expenses, setExpenses] = useState<Expense[]>(() => 
    loadStored(STORAGE_KEYS.EXPENSES, initialExpenses)
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>): string => {
    const id = 'exp-' + Math.random().toString(36).substring(2, 7);
    const newExp: Expense = {
      ...expense,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setExpenses((prev) => [newExp, ...prev]);
    addAuditLog({
      action: 'Expense Logged',
      user: currentUser?.name || 'Admin',
      targetType: 'Expense',
      targetId: id,
      details: `${expense.category}: ₹${expense.amount} for ${expense.description}`
    });
    showToast(`Expense of ₹${expense.amount.toLocaleString('en-IN')} recorded.`);
    return id;
  };

  const updateExpense = (id: string, expense: Partial<Expense>) => {
    setExpenses((prev) => prev.map((e) => e.id === id ? { ...e, ...expense } : e));
    showToast('Expense record updated.');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast('Expense record removed.');
  };

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => 
    loadStored(STORAGE_KEYS.SUPPLIERS, initialSuppliers)
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers));
  }, [suppliers]);

  const addSupplier = (supplier: Omit<Supplier, 'id' | 'createdAt'>): string => {
    const id = 'sup-' + Math.random().toString(36).substring(2, 7);
    const newSup: Supplier = {
      ...supplier,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSuppliers((prev) => [newSup, ...prev]);
    showToast(`Supplier ${supplier.name} added.`);
    return id;
  };

  const updateSupplier = (id: string, supplier: Partial<Supplier>) => {
    setSuppliers((prev) => prev.map((s) => s.id === id ? { ...s, ...supplier } : s));
    showToast('Supplier details updated.');
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    showToast('Supplier removed.');
  };

  // Notifications & Drawer
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => 
    loadStored(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'read' | 'createdAt'>) => {
    const id = 'notif-' + Math.random().toString(36).substring(2, 7);
    const newNotif: NotificationItem = {
      ...notif,
      id,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => 
    loadStored(STORAGE_KEYS.AUDIT_LOGS, initialAuditLogs)
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const now = new Date();
    const ts = now.toISOString().replace('T', ' ').substring(0, 16);
    const newLog: AuditLog = {
      ...log,
      id: 'audit-' + Math.random().toString(36).substring(2, 7),
      timestamp: ts
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Payment Receipts
  const [paymentReceipts, setPaymentReceipts] = useState<PaymentReceipt[]>(() => 
    loadStored(STORAGE_KEYS.PAYMENT_RECEIPTS, [])
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_RECEIPTS, JSON.stringify(paymentReceipts));
  }, [paymentReceipts]);

  const [activeReceipt, setActiveReceipt] = useState<PaymentReceipt | null>(null);

  const generatePaymentReceipt = (params: { billId: string; amountPaid: number; paymentMode: string; referenceNumber?: string; notes?: string }): PaymentReceipt => {
    const bill = bills.find((b) => b.id === params.billId);
    const receiptNum = `RCPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalPaid = (bill?.payments?.reduce((s, p) => s + p.amount, 0) || 0) + params.amountPaid;
    const balance = Math.max(0, (bill?.totalAmount || 0) - totalPaid);

    const receipt: PaymentReceipt = {
      id: 'rcpt-' + Math.random().toString(36).substring(2, 8),
      receiptNumber: receiptNum,
      date: new Date().toISOString().split('T')[0],
      billId: params.billId,
      docNumber: bill?.docNumber || 'DOC',
      clientName: bill?.clientName || 'Valued Client',
      clientPhone: bill?.clientPhone || '',
      clientAddress: bill?.clientAddress || '',
      projectName: bill?.projectName || 'Interior Project',
      amountPaid: params.amountPaid,
      paymentMode: params.paymentMode,
      referenceNumber: params.referenceNumber,
      totalBillAmount: bill?.totalAmount || params.amountPaid,
      remainingBalance: balance,
      notes: params.notes,
      createdAt: new Date().toISOString()
    };

    setPaymentReceipts((prev) => [receipt, ...prev]);
    setActiveReceipt(receipt);
    showToast(`Payment receipt ${receiptNum} created!`);
    return receipt;
  };

  // SEO & Analytics
  const [seoSettings, setSEOSettings] = useState<SEOSettings>(() => 
    loadStored(STORAGE_KEYS.SEO, initialSEOSettings)
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seoSettings));
  }, [seoSettings]);

  const updateSEOSettings = (settings: Partial<SEOSettings>) => {
    setSEOSettings((prev) => ({ ...prev, ...settings }));
    showToast('SEO configurations updated.');
  };

  const [analytics, setAnalytics] = useState<AnalyticsSummary>(() => 
    loadStored(STORAGE_KEYS.ANALYTICS, initialAnalytics)
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  }, [analytics]);

  const recordPageView = (path: string) => {
    setAnalytics((prev) => ({ ...prev, pageViews: prev.pageViews + 1 }));
  };

  const recordProjectView = (projectId: string) => {
    setAnalytics((prev) => ({
      ...prev,
      projectViews: {
        ...prev.projectViews,
        [projectId]: (prev.projectViews[projectId] || 0) + 1
      }
    }));
    setProjects((prev) => prev.map((p) => p.id === projectId ? { ...p, viewsCount: (p.viewsCount || 0) + 1 } : p));
  };

  const recordContactClick = () => {
    setAnalytics((prev) => ({ ...prev, contactClicks: prev.contactClicks + 1 }));
  };

  const recordWhatsAppClick = () => {
    setAnalytics((prev) => ({ ...prev, whatsappClicks: prev.whatsappClicks + 1 }));
  };

  const recordConsultationRequest = (source = 'Website Form') => {
    setAnalytics((prev) => ({
      ...prev,
      consultationRequests: prev.consultationRequests + 1,
      leadSources: {
        ...prev.leadSources,
        [source]: (prev.leadSources[source] || 0) + 1
      }
    }));
  };

  // Admin Theme & Command Palette
  const [adminTheme, setAdminTheme] = useState<'dark' | 'light'>(() => 
    loadStored(STORAGE_KEYS.ADMIN_THEME, 'light')
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_THEME, JSON.stringify(adminTheme));
  }, [adminTheme]);

  const toggleAdminTheme = () => {
    setAdminTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [consultationPrefill, setConsultationPrefill] = useState<ConsultationPrefill | null>(null);

  const openConsultationWithPrefill = (prefill: ConsultationPrefill) => {
    setConsultationPrefill(prefill);
    setIsConsultationModalOpen(true);
  };

  // Client Portal Session
  const [clientPortalUser, setClientPortalUser] = useState<{ phone: string; client: Client } | null>(() => {
    try {
      const saved = localStorage.getItem('jj_client_portal_user_v4');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginClientPortal = (phone: string): boolean => {
    const clean = phone.replace(/[^0-9]/g, '');
    const found = clients.find((c) => {
      const cClean = c.phone.replace(/[^0-9]/g, '');
      return (cClean && clean && (cClean.includes(clean) || clean.includes(cClean)));
    });
    if (found) {
      const sess = { phone, client: found };
      setClientPortalUser(sess);
      localStorage.setItem('jj_client_portal_user_v4', JSON.stringify(sess));
      showToast(`Welcome back, ${found.name}! Project portal unlocked.`);
      return true;
    }
    // Also allow demo preview login
    if (clients.length > 0) {
      const fallback = clients[0];
      const sess = { phone, client: fallback };
      setClientPortalUser(sess);
      localStorage.setItem('jj_client_portal_user_v4', JSON.stringify(sess));
      showToast(`Welcome, ${fallback.name}! Accessing project portal.`);
      return true;
    }
    showToast('No active project found with this phone number. Please contact studio.', 'error');
    return false;
  };

  const logoutClientPortal = () => {
    setClientPortalUser(null);
    localStorage.removeItem('jj_client_portal_user_v4');
    showToast('Signed out of Client Portal.');
  };

  // Auth functions
  const login = (usernameOrEmail: string, pass: string): boolean => {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    // Allow demo admin / manager / staff credentials
    let role: AdminRole = 'Administrator';
    let name = 'Admin User';

    if (cleanUser.includes('manager')) {
      role = 'Manager';
      name = 'Project Manager';
    } else if (cleanUser.includes('staff')) {
      role = 'Staff';
      name = 'Design Staff';
    } else {
      role = 'Administrator';
      name = 'Business Owner';
    }

    if (pass.length >= 4) {
      const user: AdminUser = {
        id: 'usr-' + Math.random().toString(36).substring(2, 7),
        username: cleanUser,
        email: cleanUser.includes('@') ? cleanUser : `${cleanUser}@jjinteriors.site`,
        name: name,
        role: role,
      };
      setCurrentUser(user);
      setIsAdminLoginModalOpen(false);
      setViewMode('admin');
      showToast(`Welcome back, ${name} (${role})!`);
      return true;
    }
    showToast('Invalid password. Please enter at least 4 characters.', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setViewMode('public');
    showToast('Logged out securely from Business ERP.', 'info');
  };

  const switchRole = (role: AdminRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role };
    setCurrentUser(updated);
    showToast(`Role switched to: ${role}`);
  };

  // CRUD Implementations
  const updateBusinessProfile = (profile: Partial<BusinessProfile>) => {
    setBusinessProfile((prev) => ({ ...prev, ...profile }));
    showToast('Business profile updated. Public website updated live!');
  };

  const updateTrustStats = (stats: Partial<TrustStats>) => {
    setTrustStats((prev) => ({ ...prev, ...stats }));
    showToast('Trust metrics updated.');
  };

  const addProject = (proj: Omit<Project, 'id'>) => {
    const id = 'prj-' + Date.now().toString(36);
    const newProj: Project = { ...proj, id };
    setProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${newProj.title}" added to portfolio.`);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Project updated successfully.');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project removed.', 'info');
  };

  const duplicateProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const dup: Project = {
      ...target,
      id: 'prj-' + Date.now().toString(36),
      title: `${target.title} (Copy)`,
      slug: `${target.slug}-copy-${Date.now().toString(36).substring(0, 4)}`,
      status: 'Planning',
      featured: false,
    };
    setProjects((prev) => [dup, ...prev]);
    showToast(`Project duplicated as "${dup.title}".`);
  };

  const updateService = (id: string, srv: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...srv } : s)));
    showToast('Service updated.');
  };

  const addService = (srv: Omit<Service, 'id'>) => {
    const id = 'srv-' + Date.now().toString(36);
    setServices((prev) => [...prev, { ...srv, id }]);
    showToast(`Service "${srv.title}" added.`);
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service deleted.', 'info');
  };

  const addClient = (cli: Omit<Client, 'id' | 'createdAt'>): string => {
    const id = 'cli-' + Date.now().toString(36);
    const today = new Date().toISOString().split('T')[0];
    const newClient: Client = {
      ...cli,
      id,
      createdAt: today,
    };
    setClients((prev) => [newClient, ...prev]);
    showToast(`Client "${cli.name}" added to CRM.`);
    return id;
  };

  const updateClient = (id: string, cli: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...cli } : c)));
    showToast('Client records updated.');
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast('Client removed from CRM.', 'info');
  };

  // Leads & Inquiries CRM
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>): string => {
    const id = 'lead-' + Date.now().toString(36);
    const today = new Date().toISOString().split('T')[0];
    const newLead: Lead = {
      ...leadData,
      id,
      createdAt: today,
    };
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Inquiry received from "${newLead.name}".`);
    return id;
  };

  const updateLead = (id: string, leadUpdate: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...leadUpdate } : l)));
    showToast('Lead status updated.');
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    showToast('Lead removed.', 'info');
  };

  const convertLeadToClient = (leadId: string): Client | null => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) {
      showToast('Lead record not found.', 'error');
      return null;
    }

    const clientId = 'cli-' + Date.now().toString(36);
    const today = new Date().toISOString().split('T')[0];
    const newClient: Client = {
      id: clientId,
      name: lead.name,
      phone: lead.phone,
      email: lead.email || '',
      address: lead.city,
      city: lead.city || 'Surat',
      projectType: `${lead.propertyType ? lead.propertyType + ' - ' : ''}${lead.projectType}`,
      status: 'Active',
      budgetRange: lead.approxBudget || '',
      measurementsNotes: lead.message ? `Client Request: ${lead.message}` : '',
      followUpNotes: lead.notes ? `Lead Pipeline Notes: ${lead.notes}` : `Converted from consultation lead on ${today}`,
      createdAt: today,
      lastContact: today,
    };

    setClients((prev) => [newClient, ...prev]);

    // Mark lead as WON and associate with converted client
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: 'WON' as const,
              convertedToClientId: clientId,
              notes: `${l.notes || ''}\n[Converted to Client on ${today}]`.trim(),
            }
          : l
      )
    );

    showToast(`Lead "${lead.name}" successfully converted to Client!`);
    return newClient;
  };

  const navigateAdminTo = (tab: AdminTab, itemId?: string, itemType?: string) => {
    setViewMode('admin');
    setAdminTab(tab);
    
    if (typeof window !== 'undefined') {
      const targetPath = `/admin/${tab === 'dashboard' ? '' : tab}`;
      if (window.location.pathname !== targetPath) {
        try {
          window.history.pushState(null, '', targetPath);
        } catch {
          // ignore
        }
      }
    }
    
    if (itemType === 'client' && itemId) {
      setSelectedClientIdForView(itemId);
    } else if (itemType === 'lead' && itemId) {
      setSelectedLeadIdForView(itemId);
    }
  };

  const addCatalogItem = (item: Omit<CatalogItem, 'id'>) => {
    const id = 'cat-' + Date.now().toString(36);
    setCatalogItems((prev) => [ { ...item, id }, ...prev ]);
    showToast(`Catalog item "${item.name}" created.`);
  };

  const updateCatalogItem = (id: string, item: Partial<CatalogItem>) => {
    setCatalogItems((prev) => prev.map((c) => (c.id === id ? { ...c, ...item } : c)));
    showToast('Item updated.');
  };

  const deleteCatalogItem = (id: string) => {
    setCatalogItems((prev) => prev.filter((c) => c.id !== id));
    showToast('Item removed from catalog.', 'info');
  };

  const addBill = (billData: Omit<BillDocument, 'id' | 'createdAt'>): BillDocument => {
    const id = 'bill-' + Date.now().toString(36);
    const today = new Date().toISOString().split('T')[0];
    const newBill: BillDocument = {
      ...billData,
      id,
      createdAt: today,
    };
    setBills((prev) => [newBill, ...prev]);
    showToast(`${newBill.type} ${newBill.docNumber} created and saved.`);
    return newBill;
  };

  const updateBill = (id: string, updated: Partial<BillDocument>) => {
    setBills((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    showToast('Bill document updated.');
  };

  const deleteBill = (id: string) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
    showToast('Document deleted.', 'info');
  };

  const duplicateBill = (id: string) => {
    const target = bills.find((b) => b.id === id);
    if (!target) return;
    const prefix = target.type === 'Quotation' ? systemSettings.quotationPrefix : systemSettings.invoicePrefix;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newDocNumber = `${prefix}${randomSuffix}`;

    const dup: BillDocument = {
      ...target,
      id: 'bill-' + Date.now().toString(36),
      docNumber: newDocNumber,
      date: new Date().toISOString().split('T')[0],
      amountPaid: 0,
      balanceDue: target.grandTotal,
      paymentStatus: 'Pending',
      payments: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBills((prev) => [dup, ...prev]);
    showToast(`Duplicated as ${newDocNumber}`);
  };

  const getNextDocNumber = (type: 'Quotation' | 'Invoice'): string => {
    const prefix = type === 'Quotation' ? systemSettings.quotationPrefix : systemSettings.invoicePrefix;
    
    // Calculate highest sequential number to prevent collision even if items were deleted
    let currentMax = type === 'Quotation' 
      ? (systemSettings.lastQuotationSeq || 0) 
      : (systemSettings.lastInvoiceSeq || 0);

    bills.forEach((b) => {
      if (b.type === type && b.docNumber.startsWith(prefix)) {
        const numPart = parseInt(b.docNumber.replace(prefix, ''), 10);
        if (!isNaN(numPart) && numPart > currentMax) {
          currentMax = numPart;
        }
      }
    });

    const nextSeq = currentMax + 1;

    // Persist new sequence in settings
    if (type === 'Quotation') {
      setSystemSettings((prev) => ({ ...prev, lastQuotationSeq: nextSeq }));
    } else {
      setSystemSettings((prev) => ({ ...prev, lastInvoiceSeq: nextSeq }));
    }

    const padded = String(nextSeq).padStart(4, '0');
    return `${prefix}${padded}`;
  };

  const convertQuotationToInvoice = (quotationId: string): BillDocument | null => {
    const quotation = bills.find((b) => b.id === quotationId);
    if (!quotation) {
      showToast('Quotation document not found.', 'error');
      return null;
    }

    const newDocNumber = getNextDocNumber('Invoice');
    const today = new Date().toISOString().split('T')[0];

    const newInvoice: BillDocument = {
      ...quotation,
      id: 'bill-' + Date.now().toString(36),
      type: 'Invoice',
      docNumber: newDocNumber,
      date: today,
      amountPaid: 0,
      balanceDue: quotation.grandTotal,
      paymentStatus: 'Pending',
      payments: [],
      createdAt: today,
    };

    setBills((prev) => [newInvoice, ...prev]);
    showToast(`Quotation ${quotation.docNumber} converted to Tax Invoice ${newInvoice.docNumber}!`);
    return newInvoice;
  };

  const recordPayment = (billId: string, paymentData: Omit<PaymentRecord, 'id'>) => {
    const payId = 'pay-' + Date.now().toString(36);
    const newPayment: PaymentRecord = {
      ...paymentData,
      id: payId,
    };

    setBills((prev) =>
      prev.map((bill) => {
        if (bill.id !== billId) return bill;
        const newPayments = [...bill.payments, newPayment];
        const newAmountPaid = bill.amountPaid + paymentData.amount;
        const newBalance = Math.max(0, bill.grandTotal - newAmountPaid);
        const status = newBalance <= 1 ? 'Paid' : newAmountPaid > 0 ? 'Partial' : 'Pending';

        return {
          ...bill,
          payments: newPayments,
          amountPaid: newAmountPaid,
          balanceDue: newBalance,
          paymentStatus: status,
        };
      })
    );
    showToast(`Payment of ₹${paymentData.amount.toLocaleString('en-IN')} recorded successfully.`);
  };

  const addTestimonial = (tst: Omit<Testimonial, 'id'>) => {
    const id = 'tst-' + Date.now().toString(36);
    setTestimonials((prev) => [{ ...tst, id }, ...prev]);
    showToast('Client review added.');
  };

  const updateTestimonial = (id: string, tst: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...tst } : t)));
    showToast('Review updated.');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast('Review removed.', 'info');
  };

  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const id = 'faq-' + Date.now().toString(36);
    setFaqs((prev) => [...prev, { ...faq, id }]);
    showToast('FAQ entry added.');
  };

  const updateFAQ = (id: string, faq: Partial<FAQItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...faq } : f)));
    showToast('FAQ updated.');
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast('FAQ removed.', 'info');
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const id = 'blog-' + Date.now().toString(36);
    const today = new Date().toISOString().split('T')[0];
    setBlogPosts((prev) => [{ ...post, id, publishedAt: today }, ...prev]);
    showToast(`Article "${post.title}" created.`);
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...post } : p)));
    showToast('Article updated.');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Article removed.', 'info');
  };

  const addMediaItem = (media: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const id = 'med-' + Date.now().toString(36);
    const today = new Date().toISOString().split('T')[0];
    setMediaItems((prev) => [{ ...media, id, uploadedAt: today }, ...prev]);
    showToast(`Media "${media.name}" added to library.`);
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    showToast('Media removed.', 'info');
  };

  const updateSystemSettings = (settings: Partial<SystemSettings>) => {
    setSystemSettings((prev) => ({ ...prev, ...settings }));
    showToast('System configuration saved.');
  };

  const exportBackupData = () => {
    const fullBackup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      businessProfile,
      trustStats,
      projects,
      services,
      clients,
      leads,
      catalogItems,
      bills,
      testimonials,
      faqs,
      blogPosts,
      mediaItems,
      systemSettings,
      siteVisits,
      expenses,
      suppliers,
      notifications,
      auditLogs,
      paymentReceipts,
      seoSettings,
      analytics,
    };
    const jsonStr = JSON.stringify(fullBackup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jayjasol_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Full business database backup downloaded as JSON.');
  };

  const importBackupData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.businessProfile) setBusinessProfile(data.businessProfile);
      if (data.trustStats) setTrustStats(data.trustStats);
      if (data.projects) setProjects(data.projects);
      if (data.services) setServices(data.services);
      if (data.clients) setClients(data.clients);
      if (data.leads) setLeads(data.leads);
      if (data.catalogItems) setCatalogItems(data.catalogItems);
      if (data.bills) setBills(data.bills);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.faqs) setFaqs(data.faqs);
      if (data.blogPosts) setBlogPosts(data.blogPosts);
      if (data.mediaItems) setMediaItems(data.mediaItems);
      if (data.systemSettings) setSystemSettings(data.systemSettings);
      if (data.siteVisits) setSiteVisits(data.siteVisits);
      if (data.expenses) setExpenses(data.expenses);
      if (data.suppliers) setSuppliers(data.suppliers);
      if (data.notifications) setNotifications(data.notifications);
      if (data.auditLogs) setAuditLogs(data.auditLogs);
      if (data.paymentReceipts) setPaymentReceipts(data.paymentReceipts);
      if (data.seoSettings) setSEOSettings(data.seoSettings);
      if (data.analytics) setAnalytics(data.analytics);
      showToast('Database restored successfully from backup JSON!');
      return true;
    } catch {
      showToast('Invalid backup file format.', 'error');
      return false;
    }
  };

  const resetAllToDefaults = () => {
    setBusinessProfile(initialBusinessProfile);
    setTrustStats(initialTrustStats);
    setProjects(initialProjects);
    setServices(initialServices);
    setClients(initialClients);
    setLeads(initialLeads);
    setCatalogItems(initialCatalogItems);
    setBills(initialBills);
    setTestimonials(initialTestimonials);
    setFaqs(initialFAQs);
    setBlogPosts(initialBlogPosts);
    setMediaItems(initialMediaItems);
    setSystemSettings(initialSystemSettings);
    setSiteVisits(initialSiteVisits);
    setExpenses(initialExpenses);
    setSuppliers(initialSuppliers);
    setNotifications(initialNotifications);
    setAuditLogs(initialAuditLogs);
    setSEOSettings(initialSEOSettings);
    setAnalytics(initialAnalytics);
    showToast('Reset to original factory template data.');
  };

  const saveBill = (bill: BillDocument) => {
    setBills((prev) => {
      const exists = prev.some((b) => b.id === bill.id);
      if (exists) {
        return prev.map((b) => (b.id === bill.id ? bill : b));
      }
      return [bill, ...prev];
    });
    showToast(`${bill.type} ${bill.docNumber} saved to business records.`);
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
        publicRoute,
        navigateTo,
        isAuthenticated,
        currentUser,
        adminUser: currentUser,
        login,
        logout,
        switchRole,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        activeProjectModal,
        setActiveProjectModal,
        activeServiceModal,
        setActiveServiceModal,
        activeBlogModal,
        setActiveBlogModal,
        isConsultationModalOpen,
        setIsConsultationModalOpen,
        consultationPrefill,
        openConsultationWithPrefill,
        editingBill,
        setEditingBill,
        billingPrefillClient,
        setBillingPrefillClient,
        businessProfile,
        updateBusinessProfile,
        trustStats,
        updateTrustStats,
        projects,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        savedProjectIds,
        toggleSaveProject,
        isProjectSaved,
        services,
        updateService,
        addService,
        deleteService,
        clients,
        addClient,
        updateClient,
        deleteClient,
        leads,
        addLead,
        updateLead,
        deleteLead,
        convertLeadToClient,
        siteVisits,
        addSiteVisit,
        updateSiteVisit,
        deleteSiteVisit,
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        notifications,
        unreadNotificationsCount,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        auditLogs,
        addAuditLog,
        paymentReceipts,
        generatePaymentReceipt,
        activeReceipt,
        setActiveReceipt,
        seoSettings,
        updateSEOSettings,
        analytics,
        recordPageView,
        recordProjectView,
        recordContactClick,
        recordWhatsAppClick,
        recordConsultationRequest,
        selectedClientIdForView,
        setSelectedClientIdForView,
        selectedLeadIdForView,
        setSelectedLeadIdForView,
        navigateAdminTo,
        catalogItems,
        addCatalogItem,
        updateCatalogItem,
        deleteCatalogItem,
        bills,
        addBill,
        updateBill,
        deleteBill,
        duplicateBill,
        convertQuotationToInvoice,
        getNextDocNumber,
        recordPayment,
        saveBill,
        addPaymentToBill: recordPayment,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        addFaq: addFAQ,
        deleteFaq: deleteFAQ,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        mediaItems,
        addMediaItem,
        deleteMediaItem,
        systemSettings,
        updateSystemSettings,
        adminTheme,
        toggleAdminTheme,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        clientPortalUser,
        loginClientPortal,
        logoutClientPortal,
        toasts,
        showToast,
        removeToast,
        exportBackupData,
        importBackupData,
        resetAllToDefaults,
        resetToInitialData: resetAllToDefaults,
      }}
    >
      {children}
      {/* Global Toast Render */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none no-print">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-lg shadow-xl text-sm font-medium border flex items-center justify-between gap-3 animate-slide-up ${
              toast.type === 'error'
                ? 'bg-red-950 text-red-200 border-red-800'
                : toast.type === 'info'
                ? 'bg-stone-900 text-stone-200 border-stone-700'
                : 'bg-[#1e1b18] text-[#fbf9f5] border-[#c5a059]/40'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
