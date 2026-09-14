import React, { useState } from 'react';
import { useApp, PublicRoute } from '../../context/AppContext.tsx';
import { JJLogo } from '../common/JJLogo.tsx';
import { Menu, X, Shield, Phone, MessageSquare, Heart, UserCheck } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const { 
    businessProfile, 
    setIsAdminLoginModalOpen, 
    isAuthenticated,
    setViewMode,
    publicRoute,
    navigateTo,
    savedProjectIds
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; path: PublicRoute }[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: PublicRoute) => {
    setMobileMenuOpen(false);
    navigateTo(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8dfd5] transition-all no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-2">
          
          {/* Official J.J. Logo & Brand */}
          <button 
            type="button"
            onClick={() => handleNavClick('/')}
            className="flex items-center group cursor-pointer text-left bg-transparent border-0 p-0 min-w-0 shrink"
            aria-label="J.J. INTERIORS & MODUTECH Home"
          >
            <JJLogo 
              variant="full" 
              theme="light" 
              size="md" 
              customLogoUrl={businessProfile.logoUrl}
            />
          </button>

          {/* Center Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = publicRoute === link.path;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.path)}
                  className={`text-xs tracking-[0.15em] uppercase py-1 relative group cursor-pointer transition-colors ${
                    isActive 
                      ? 'text-[#c5a059] font-bold' 
                      : 'text-[#2c2825] font-medium hover:text-[#c5a059]'
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#c5a059] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Saved Moodboard / Heart */}
            <button
              type="button"
              onClick={() => handleNavClick('/saved-projects')}
              className={`p-2 rounded-full relative transition-colors cursor-pointer ${
                publicRoute === '/saved-projects' 
                  ? 'bg-[#ebd5b3] text-amber-900' 
                  : 'text-stone-600 hover:text-[#c5a059] hover:bg-[#c5a059]/10'
              }`}
              title="Saved Moodboard Projects"
              aria-label="Saved Projects"
            >
              <Heart className={`w-4 h-4 ${savedProjectIds.length > 0 ? 'fill-amber-600 text-amber-600' : ''}`} />
              {savedProjectIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c5a059] text-black text-[9px] font-bold flex items-center justify-center">
                  {savedProjectIds.length}
                </span>
              )}
            </button>

            {/* Client Portal Link */}
            <button
              type="button"
              onClick={() => handleNavClick('/client-portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                publicRoute === '/client-portal'
                  ? 'bg-[#1e1b18] text-white border-[#1e1b18]'
                  : 'border-stone-300 text-stone-700 hover:text-black hover:border-stone-500 hover:bg-stone-100'
              }`}
              title="Client Project Portal"
            >
              <UserCheck className="w-3 h-3 text-[#c5a059]" />
              <span>Portal</span>
            </button>

            {/* Quick WhatsApp contact */}
            <a
              href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998'}?text=${encodeURIComponent('Hello J.J. INTERIORS & MODUTECH, I would like to inquire about interior design & modular solutions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Phone Call */}
            <a
              href={`tel:${businessProfile.phone.replace(/[^0-9+]/g, '') || '+919898412998'}`}
              className="p-2 rounded-full text-stone-600 hover:text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
              title="Call Us"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Subtle, professional Admin button */}
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setViewMode('admin');
                } else {
                  setIsAdminLoginModalOpen(true);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 text-stone-600 hover:text-[#1e1b18] hover:border-stone-500 hover:bg-stone-100 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
              title="Studio Management ERP"
            >
              <Shield className="w-3 h-3 text-[#c5a059]" />
              <span>{isAuthenticated ? 'Admin' : 'Admin'}</span>
            </button>
          </div>

          {/* Mobile Menu Action Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Saved Heart */}
            <button
              type="button"
              onClick={() => handleNavClick('/saved-projects')}
              className="p-2 text-stone-600 relative"
              aria-label="Saved Projects"
            >
              <Heart className={`w-5 h-5 ${savedProjectIds.length > 0 ? 'fill-amber-600 text-amber-600' : ''}`} />
              {savedProjectIds.length > 0 && (
                <span className="absolute 0 right-0 w-3.5 h-3.5 rounded-full bg-[#c5a059] text-black text-[8px] font-bold flex items-center justify-center">
                  {savedProjectIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                if (isAuthenticated) {
                  setViewMode('admin');
                } else {
                  setIsAdminLoginModalOpen(true);
                }
              }}
              className="px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase rounded border border-stone-300 text-stone-600"
            >
              Admin
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1e1b18] hover:text-[#c5a059] transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8f5] border-b border-[#e8dfd5] px-4 py-5 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = publicRoute === link.path;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-xs uppercase tracking-wider py-3 px-3.5 transition-all flex items-center justify-between rounded-sm ${
                    isActive 
                      ? 'bg-[#c5a059]/15 text-[#1e1b18] font-bold border-l-2 border-[#c5a059]' 
                      : 'text-[#1e1b18] font-medium hover:text-[#c5a059] hover:bg-black/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#c5a059]" />}
                </button>
              );
            })}

            {/* Client Portal Link in Mobile Menu */}
            <button
              type="button"
              onClick={() => handleNavClick('/client-portal')}
              className={`text-left text-xs uppercase tracking-wider py-3 px-3.5 transition-all flex items-center justify-between rounded-sm ${
                publicRoute === '/client-portal'
                  ? 'bg-[#c5a059]/15 text-[#1e1b18] font-bold border-l-2 border-[#c5a059]'
                  : 'text-[#1e1b18] font-medium hover:text-[#c5a059] hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Client Project Portal</span>
              </div>
            </button>

            {/* Saved Projects in Mobile Menu */}
            <button
              type="button"
              onClick={() => handleNavClick('/saved-projects')}
              className={`text-left text-xs uppercase tracking-wider py-3 px-3.5 transition-all flex items-center justify-between rounded-sm ${
                publicRoute === '/saved-projects'
                  ? 'bg-[#c5a059]/15 text-[#1e1b18] font-bold border-l-2 border-[#c5a059]'
                  : 'text-[#1e1b18] font-medium hover:text-[#c5a059] hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#c5a059]" />
                <span>Saved Moodboard ({savedProjectIds.length})</span>
              </div>
            </button>
          </nav>

          <div className="mt-5 pt-4 border-t border-[#e8dfd5] flex items-center justify-between">
            <div className="flex gap-4">
              <a
                href={`tel:${businessProfile.phone.replace(/[^0-9+]/g, '') || '+919898412998'}`}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-700"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Call Studio</span>
              </a>
              <a
                href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998'}?text=${encodeURIComponent('Hello J.J. INTERIORS & MODUTECH, I would like to inquire about interior design services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-emerald-700"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAuthenticated) {
                  setViewMode('admin');
                } else {
                  setIsAdminLoginModalOpen(true);
                }
              }}
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-[#c5a059]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
