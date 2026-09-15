import React, { useState } from 'react';
import { useApp, PublicRoute } from '../../context/AppContext.tsx';
import { JJLogo } from '../common/JJLogo.tsx';
import { Menu, X, Shield, Phone, MessageSquare, Instagram, UserCheck, ChevronDown } from 'lucide-react';

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
    { label: 'Process', path: '/process' },
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
          <nav className="hidden xl:flex items-center gap-4 xl:gap-5">
            {navLinks.slice(0, 4).map((link) => {
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

            {/* Dropdown for remaining links */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase py-1 text-[#2c2825] font-medium hover:text-[#c5a059] cursor-pointer">
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              <div className="absolute top-full right-0 w-48 bg-white border border-[#e8dfd5] shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                {navLinks.slice(4).map((link) => {
                  const isActive = publicRoute === link.path;
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.path)}
                      className={`block w-full text-left px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase hover:bg-black/5 hover:text-[#c5a059] cursor-pointer transition-colors ${
                        isActive ? 'text-[#c5a059] font-bold' : 'text-[#2c2825]'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden xl:flex items-center gap-3">
            
            {/* Instagram Link */}
            {businessProfile.socialLinks?.instagram && (
              <a
                href={businessProfile.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-stone-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                title="Follow us on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}


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
              <span className="hidden xl:inline">{isAuthenticated ? 'Admin' : 'Admin'}</span>
            </button>
          </div>

          {/* Mobile Menu Action Buttons */}
          <div className="flex xl:hidden items-center gap-1 sm:gap-2">
            {/* Mobile Instagram */}
            {businessProfile.socialLinks?.instagram && (
              <a
                href={businessProfile.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-stone-600 hover:text-pink-600 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1e1b18] hover:text-[#c5a059] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf8f5] border-b border-[#e8dfd5] px-4 py-5 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = publicRoute === link.path;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-[13px] sm:text-sm uppercase tracking-wider py-3.5 px-4 transition-all flex items-center justify-between rounded-sm cursor-pointer ${
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



          </nav>

          <div className="mt-5 pt-4 border-t border-[#e8dfd5] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between">
            <div className="flex gap-6">
              <a
                href={`tel:${businessProfile.phone.replace(/[^0-9+]/g, '') || '+919898412998'}`}
                className="flex items-center gap-2 text-[13px] sm:text-sm font-medium text-stone-700 py-2"
              >
                <Phone className="w-4 h-4 text-[#c5a059]" />
                <span>Call Studio</span>
              </a>
              <a
                href={`https://wa.me/${businessProfile.whatsapp.replace(/[^0-9]/g, '') || '919898412998'}?text=${encodeURIComponent('Hello J.J. INTERIORS & MODUTECH, I would like to inquire about interior design services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] sm:text-sm font-medium text-emerald-700 py-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              {businessProfile.socialLinks?.instagram && (
                <a
                  href={businessProfile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] sm:text-sm font-medium text-pink-600 py-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
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
              className="text-[13px] sm:text-sm text-stone-500 hover:text-stone-900 flex items-center gap-2 py-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#c5a059]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
