export type ProjectCategory = 
  | 'Residential' 
  | 'Commercial' 
  | 'Modular Kitchen' 
  | 'Bedroom' 
  | 'Living Room' 
  | 'Office' 
  | 'Wardrobe' 
  | 'Other';

export type ProjectStatus = 'Planning' | 'Design' | 'Execution' | 'Completed' | 'On Hold';

export type ProjectProgressStage = 
  | 'Planning' 
  | 'Design' 
  | 'Approval' 
  | 'Production' 
  | 'Delivery' 
  | 'Installation' 
  | 'Completed';

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'Quotation' | 'Invoice' | 'Floor Plan' | 'Design PDF' | 'Material List' | 'Agreement' | 'Other';
  url: string;
  fileSize?: string;
  uploadedAt: string;
  clientVisible: boolean;
}

export interface PaymentMilestone {
  id: string;
  name: string;
  percent: number;
  amount: number;
  status: 'Pending' | 'Upcoming' | 'Paid';
  dueDate?: string;
  paidDate?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  clientName?: string;
  location: string;
  year: string;
  area?: string;
  description: string;
  concept?: string;
  designConcept?: string;
  designStyle?: string;
  materials?: string;
  highlights: string[];
  services: string[];
  coverImage: string;
  galleryImages: string[];
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  clientTestimonial?: {
    clientName: string;
    quote: string;
    rating?: number;
    location?: string;
  };
  budget?: string;
  status: ProjectStatus;
  progressStage?: ProjectProgressStage;
  progressPercent?: number;
  documents?: ProjectDocument[];
  paymentSchedule?: PaymentMilestone[];
  viewsCount?: number;
  inquiriesCount?: number;
  featured: boolean;
  published: boolean;
  order: number;
}

export type LeadStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'CONSULTATION' 
  | 'SITE VISIT' 
  | 'QUOTATION'
  | 'PROPOSAL SENT' 
  | 'NEGOTIATION' 
  | 'WON' 
  | 'LOST';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city: string;
  propertyType?: string;
  projectType: string;
  approxBudget?: string;
  expectedStartDate?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  source?: 'Website Form' | 'Website' | 'WhatsApp' | 'Walk-in' | 'Referral' | 'Phone' | 'Instagram' | 'Google' | string;
  siteVisitDate?: string;
  siteVisitId?: string;
  fileAttachment?: {
    name: string;
    size?: string;
    url?: string;
  };
  status: LeadStatus;
  notes?: string;
  followUpDate?: string;
  followUpTime?: string;
  createdAt: string;
  convertedToClientId?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  active: boolean;
  order: number;
}
export type ServiceItem = Service;

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  projectType: string;
  status: 'New' | 'Active' | 'Completed' | 'Inactive';
  budgetRange?: string;
  measurementsNotes?: string;
  followUpNotes?: string;
  createdAt: string;
  lastContact: string;
}

export type CatalogCategory = 
  | 'Kitchen' 
  | 'Wardrobe' 
  | 'Furniture' 
  | 'Bedroom' 
  | 'Living Room' 
  | 'Electrical' 
  | 'Hardware' 
  | 'Woodwork' 
  | 'Modular' 
  | 'Other';

export interface CatalogItem {
  id: string;
  name: string;
  category: CatalogCategory;
  description: string;
  unit: string; // 'Sq. Ft.', 'Rft', 'Nos', 'Sets', 'L.S.'
  size?: string;
  material?: string;
  finish?: string;
  brand?: string;
  rate: number;
  taxPercent: number;
  sku?: string;
  image?: string;
  supplier?: string;
  warranty?: string;
  notes?: string;
  currentStock?: number;
  minStock?: number;
  active: boolean;
}

export interface BillLineItem {
  id: string;
  particular: string;
  description: string;
  size: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}
export type BillItem = BillLineItem;

export interface BillSection {
  id: string;
  roomName: string; // e.g. "Living Room", "Modular Kitchen", "Master Bedroom", "General"
  items: BillLineItem[];
}
export type RoomSection = BillSection;

export type PaymentMode = 'UPI' | 'Cash' | 'Bank Transfer' | 'Cheque' | 'Other';

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  mode: PaymentMode | string;
  referenceNumber?: string;
  reference?: string;
  notes?: string;
}

export interface BillDocument {
  id: string;
  type: 'Quotation' | 'Invoice';
  docNumber: string; // QT-2026-0001 or INV-2026-0001
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  projectName: string;
  projectType?: string;
  projectLocation?: string;
  designer?: string;
  referenceNo?: string;
  siteAddress?: string;
  authorizedSignatoryName?: string;
  authorizedSignatoryRole?: string;
  date: string;
  validUntilOrDueDate?: string;
  dueDate?: string;
  paymentTerms: string;
  notes: string;
  sections: BillSection[];
  subtotal: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  taxPercent: number;
  taxAmount: number;
  additionalCharges: number;
  additionalChargesDesc: string;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  paymentMode?: string;
  payments?: PaymentRecord[];
  paymentHistory?: PaymentRecord[];
  createdAt: string;
  updatedAt?: string;
}

export interface BusinessProfile {
  brandName: string;
  businessName: string;
  tagline: string;
  industry: string;
  website: string;
  ownerName: string;
  ownerDesignation: string;
  ownerExperienceYears: number;
  ownerPhoto: string;
  ownerBio: string;
  ownerVision?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  gstin: string;
  panNo?: string;
  businessHours: string;
  googleMapsUrl: string;
  googleBusinessUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
}

export interface TrustStats {
  yearsOfExperience: number;
  projectsCompleted: number;
  happyClients: number;
  citiesServed: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  project: string;
  location: string;
  review: string;
  rating: number;
  photo?: string;
  featured: boolean;
  published: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  readTime: string;
  publishedAt: string;
  published: boolean;
  featured: boolean;
  metaTitle?: string;
  metaDesc?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: string;
  size: string;
  dimensions: string;
  uploadedAt: string;
}

export type AdminRole = 'Administrator' | 'Manager' | 'Staff';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: AdminRole;
}

export interface SystemSettings {
  invoicePrefix: string;
  quotationPrefix: string;
  lastInvoiceSeq?: number;
  lastQuotationSeq?: number;
  defaultTaxPercent: number;
  currencySymbol: string;
  defaultPaymentTerms: string;
  defaultNotes: string;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
    upiId: string;
  };
}

export type SiteVisitStatus = 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';

export interface SiteVisit {
  id: string;
  date: string;
  time: string;
  clientId?: string;
  leadId?: string;
  clientName: string;
  clientPhone: string;
  projectName?: string;
  address: string;
  assignedPerson: string;
  notes: string;
  status: SiteVisitStatus;
  createdAt: string;
}

export type ExpenseCategory = 
  | 'Materials' 
  | 'Hardware' 
  | 'Labor' 
  | 'Transport' 
  | 'Design/Software' 
  | 'Site Overhead' 
  | 'Miscellaneous';

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  projectId?: string;
  projectName?: string;
  supplierId?: string;
  supplierName?: string;
  description: string;
  amount: number;
  paymentMethod: 'Bank Transfer' | 'UPI' | 'Cash' | 'Cheque';
  receiptNumber?: string;
  notes?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  products: string[];
  address: string;
  notes: string;
  outstandingAmount: number;
  createdAt: string;
}

export interface PaymentReceipt {
  id: string;
  receiptNumber: string;
  date: string;
  billId: string;
  docNumber: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  projectName: string;
  amountPaid: number;
  paymentMode: string;
  referenceNumber?: string;
  totalBillAmount: number;
  remainingBalance: number;
  notes?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'consultation' | 'payment_due' | 'invoice_overdue' | 'followup_due' | 'site_visit' | 'inventory_low';
  targetTab?: string;
  targetId?: string;
  read: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  targetType: string;
  targetId?: string;
  details: string;
  timestamp: string;
}

export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string[];
}

export interface SEOSettings {
  home: PageSEO;
  about: PageSEO;
  services: PageSEO;
  projects: PageSEO;
  testimonials: PageSEO;
  contact: PageSEO;
  blog: PageSEO;
}

export interface AnalyticsSummary {
  pageViews: number;
  projectViews: Record<string, number>;
  contactClicks: number;
  whatsappClicks: number;
  consultationRequests: number;
  leadSources: Record<string, number>;
}

