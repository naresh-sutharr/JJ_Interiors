import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';

// Public Pages
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ProjectsPage } from './pages/ProjectsPage.tsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx';
import { TestimonialsPage } from './pages/TestimonialsPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { useSEO } from './hooks/useSEO.ts';

import { ProcessPage } from './pages/ProcessPage.tsx';
import { PWAInstallPrompt } from './components/public/PWAInstallPrompt.tsx';
import { WhatsAppButton } from './components/public/WhatsAppButton.tsx';

// Public Header & Footer
import { PublicHeader } from './components/public/PublicHeader.tsx';
import { PublicFooter } from './components/public/PublicFooter.tsx';

// Public Modals & Shared Views
import { ServiceDetailModal } from './components/public/ServiceDetailModal.tsx';
import { ProjectDetailModal } from './components/public/ProjectDetailModal.tsx';
import { BlogReaderModal } from './components/public/BlogReaderModal.tsx';
import { ConsultationModal } from './components/public/ConsultationModal.tsx';
import { PaymentReceiptModal } from './components/common/PaymentReceiptModal.tsx';

// Admin Components
import { AdminLoginModal } from './components/admin/AdminLoginModal.tsx';
import { AdminLayout } from './components/admin/AdminLayout.tsx';
import { DashboardView } from './components/admin/DashboardView.tsx';
import { LeadsAdminView } from './components/admin/LeadsAdminView.tsx';
import { ClientsView } from './components/admin/ClientsView.tsx';
import { ProjectsAdminView } from './components/admin/ProjectsAdminView.tsx';
import { BillingGeneratorView } from './components/admin/BillingGeneratorView.tsx';
import { SavedBillsView } from './components/admin/SavedBillsView.tsx';
import { ItemCatalogView } from './components/admin/ItemCatalogView.tsx';
import { ServicesAdminView } from './components/admin/ServicesAdminView.tsx';
import { BusinessProfileView } from './components/admin/BusinessProfileView.tsx';
import { WebsiteContentView } from './components/admin/WebsiteContentView.tsx';
import { TestimonialsAdminView } from './components/admin/TestimonialsAdminView.tsx';
import { BlogAdminView } from './components/admin/BlogAdminView.tsx';
import { MediaLibraryView } from './components/admin/MediaLibraryView.tsx';
import { SettingsView } from './components/admin/SettingsView.tsx';
import { SiteVisitsAdminView } from './components/admin/SiteVisitsAdminView.tsx';
import { ReceiptsAdminView } from './components/admin/ReceiptsAdminView.tsx';
import { ExpensesAdminView } from './components/admin/ExpensesAdminView.tsx';
import { SuppliersAdminView } from './components/admin/SuppliersAdminView.tsx';
import { SEOAnalyticsAdminView } from './components/admin/SEOAnalyticsAdminView.tsx';

const UnauthenticatedAdminView: React.FC = () => {
  const { setIsAdminLoginModalOpen } = useApp();
  
  useSEO({
    title: 'Admin Login',
    description: 'Private secure login.',
    noindex: true
  });

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#faf8f5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#26221f] border border-[#c5a059]/40 p-8 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a059]/15 border border-[#c5a059]/50 flex items-center justify-center text-[#c5a059] font-display text-2xl font-bold">
          JJ
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wide text-white">
            J.J. INTERIORS &amp; MODUTECH
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Studio Business Management &amp; Billing System
          </p>
        </div>

        <div className="p-4 bg-black/40 border border-white/10 rounded text-left space-y-2">
          <p className="text-xs text-stone-300 font-semibold uppercase tracking-wider">
            Protected Studio Portal
          </p>
          <p className="text-xs text-stone-400 leading-relaxed">
            Please sign in with administrative credentials to access CRM clients, project portfolios, and quotation/invoicing engines.
          </p>
        </div>

        <button
          onClick={() => setIsAdminLoginModalOpen(true)}
          className="w-full py-3 bg-[#c5a059] hover:bg-[#d8b46d] text-[#141210] font-bold text-xs uppercase tracking-widest transition-colors rounded shadow-lg"
        >
          Open Secure Sign In
        </button>
      </div>
      <AdminLoginModal />
    </div>
  );
};

const MainApplication: React.FC = () => {
  const { viewMode, adminTab, isAuthenticated, authLoading, setIsAdminLoginModalOpen, publicRoute } = useApp();

  // Show loading state while checking session on mount
  if (viewMode === 'admin' && authLoading) {
    return (
      <div className="min-h-screen bg-[#1c1917] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin"></div>
      </div>
    );
  }

  // If in admin mode but not yet authenticated, render login prompt inside layout
  if (viewMode === 'admin' && !isAuthenticated) {
    return (
      <UnauthenticatedAdminView />
    );
  }

  // Admin ERP Mode
  if (viewMode === 'admin') {
    return (
      <AdminLayout>
        {adminTab === 'dashboard' && <DashboardView />}
        {adminTab === 'leads' && <LeadsAdminView />}
        {adminTab === 'clients' && <ClientsView />}
        {adminTab === 'projects' && <ProjectsAdminView />}
        {adminTab === 'billing' && <BillingGeneratorView />}
        {adminTab === 'bills-history' && <SavedBillsView />}
        {adminTab === 'catalog' && <ItemCatalogView />}
        {adminTab === 'services' && <ServicesAdminView />}
        {adminTab === 'profile' && <BusinessProfileView />}
        {adminTab === 'content' && <WebsiteContentView />}
        {adminTab === 'testimonials' && <TestimonialsAdminView />}
        {adminTab === 'blog' && <BlogAdminView />}
        {adminTab === 'media' && <MediaLibraryView />}
        {adminTab === 'settings' && <SettingsView />}
        {adminTab === 'site_visits' && <SiteVisitsAdminView />}
        {adminTab === 'receipts' && <ReceiptsAdminView />}
        {adminTab === 'expenses' && <ExpensesAdminView />}
        {adminTab === 'suppliers' && <SuppliersAdminView />}
        {adminTab === 'seo' && <SEOAnalyticsAdminView />}

        {/* Global Modals in Admin mode if opened */}
        <ConsultationModal />
      </AdminLayout>
    );
  }

  // Public Client Website Mode
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1e1b18] antialiased selection:bg-[#c5a059]/20 selection:text-[#1e1b18]">
      <PublicHeader />
      
      <main id="main-content" className="w-full">
        <div key={publicRoute} className="page-fade-in">
          {publicRoute === '/' && <HomePage />}
          {publicRoute === '/about' && <AboutPage />}
          {publicRoute === '/services' && <ServicesPage />}
          {publicRoute === '/projects' && <ProjectsPage />}
          {publicRoute.startsWith('/projects/') && <ProjectDetailPage />}
          {publicRoute === '/process' && <ProcessPage />}
          {publicRoute === '/testimonials' && <TestimonialsPage />}
          {publicRoute === '/contact' && <ContactPage />}

        </div>
      </main>

      <PublicFooter />

      <PWAInstallPrompt />
      <WhatsAppButton />

      {/* Public Interactive Modals */}
      <ServiceDetailModal />
      <ProjectDetailModal />
      <BlogReaderModal />
      <ConsultationModal />
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApplication />
    </AppProvider>
  );
}
