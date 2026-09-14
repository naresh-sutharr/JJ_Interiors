import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { JJLogo } from '../common/JJLogo.tsx';
import { Shield, Phone, MessageSquare, Mail, MapPin, ArrowUp } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { businessProfile, setIsAdminLoginModalOpen, isAuthenticated, setViewMode, navigateTo } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <footer className="bg-[#141210] text-stone-300 border-t border-[#26221e] pt-16 pb-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Col 1 & 2: Official Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              type="button" 
              onClick={() => navigateTo('/')} 
              className="text-left bg-transparent border-0 p-0 cursor-pointer block"
            >
              <JJLogo 
                variant="full" 
                theme="dark" 
                size="md" 
                customLogoUrl={businessProfile.logoUrl}
              />
            </button>
            
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm pt-2">
              Creating thoughtfully designed residential, modular, and commercial spaces in Gujarat. Dedicated to fine craftsmanship, structural durability, and modern spatial tranquility.
            </p>
            <div className="text-[11px] text-[#ebd5b3] tracking-widest uppercase font-medium">
              Founder &amp; Principal: {businessProfile.ownerName}
            </div>
            <div className="text-[11px] text-stone-400 tracking-wider font-mono">
              PAN: {businessProfile.panNo || 'CMPYS4786H'}
            </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button type="button" onClick={() => navigateTo('/')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  Home Studio
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/about')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  About &amp; Founder
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/services')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/projects')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  Project Portfolio
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/testimonials')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  Client Reviews
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/contact')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  Contact &amp; Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Disciplines */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Residential Turnkey</li>
              <li>Modular Kitchen</li>
              <li>Bespoke Wardrobes</li>
              <li>Living Room Interiors</li>
              <li>Master Bedroom Suites</li>
              <li>Corporate Office Hubs</li>
              <li>Commercial Spaces</li>
              <li>Modutech Manufacturing</li>
            </ul>
          </div>

          {/* Col 5: Coordinates */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Studio Location
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{businessProfile.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>{businessProfile.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{businessProfile.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>{businessProfile.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} J.J. INTERIORS &amp; MODUTECH. All rights reserved. Registered in Gujarat, India.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setViewMode('admin');
                } else {
                  setIsAdminLoginModalOpen(true);
                }
              }}
              className="flex items-center gap-1.5 text-stone-400 hover:text-[#c5a059] transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
