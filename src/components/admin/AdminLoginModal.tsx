import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Lock, Shield, X, User, KeyRound, CheckCircle, ArrowRight } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    isAdminLoginModalOpen, 
    setIsAdminLoginModalOpen, 
    login, 
    showToast 
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'admin@jjinteriors.site', password || 'admin123');
  };

  const handleQuickLogin = (role: 'admin' | 'manager' | 'staff') => {
    if (role === 'admin') {
      login('admin@jjinteriors.site', 'admin123');
    } else if (role === 'manager') {
      login('manager@jjinteriors.site', 'manager123');
    } else {
      login('staff@jjinteriors.site', 'staff123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in no-print">
      <div className="relative w-full max-w-md bg-[#161412] text-stone-200 shadow-2xl border border-[#c5a059]/40 overflow-hidden my-auto">
        
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#c5a059] via-[#ebd5b3] to-[#c5a059]" />

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c5a059] block">
                Secure Business Portal
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-white font-normal">
                J.J. INTERIORS &amp; MODUTECH ERP
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAdminLoginModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-300 mb-1.5">
                Username / Admin Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="admin@jjinteriors.site"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 focus:border-[#c5a059] focus:outline-none text-sm text-white placeholder:text-stone-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 focus:border-[#c5a059] focus:outline-none text-sm text-white placeholder:text-stone-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#c5a059] rounded"
                />
                <span>Remember session</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('In demo mode, please use the quick login buttons below.', 'info')}
                className="hover:text-[#c5a059] transition-colors"
              >
                Forgot credentials?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#c5a059] hover:bg-[#d4b26f] text-[#141210] font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Authenticate &amp; Enter ERP</span>
            </button>
          </form>

          {/* Quick One-Click Demo Role Selector */}
          <div className="pt-5 border-t border-white/10">
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2.5 text-center">
              One-Click Instant Access Roles:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c5a059] rounded text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-white group-hover:text-[#c5a059]">Administrator</div>
                <div className="text-[10px] text-stone-400">Owner Full Access</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('manager')}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c5a059] rounded text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-white group-hover:text-[#c5a059]">Manager</div>
                <div className="text-[10px] text-stone-400">Projects &amp; CRM</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('staff')}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c5a059] rounded text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-semibold text-white group-hover:text-[#c5a059]">Staff</div>
                <div className="text-[10px] text-stone-400">Estimates &amp; Items</div>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>End-to-End Encrypted Session • Surat Business Server</span>
          </div>

        </div>

      </div>
    </div>
  );
};
