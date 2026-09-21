import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Lock, Shield, X, User, KeyRound, CheckCircle, ArrowRight } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    isAdminLoginModalOpen, 
    setIsAdminLoginModalOpen, 
    loginAsync, 
    showToast 
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    await loginAsync(username, password);
    setIsLoading(false);
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

            <div className="flex items-center justify-end text-xs text-stone-400 pt-1">
              <button
                type="button"
                onClick={() => showToast('Please contact support to reset credentials.', 'info')}
                className="hover:text-[#c5a059] transition-colors"
              >
                Forgot credentials?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 ${isLoading ? 'bg-[#917642] cursor-not-allowed' : 'bg-[#c5a059] hover:bg-[#d4b26f] cursor-pointer'} text-[#141210] font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 mt-2`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Authenticating...' : 'Authenticate & Enter ERP'}</span>
            </button>
          </form>

          <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>End-to-End Encrypted Session • Surat Business Server</span>
          </div>

        </div>

      </div>
    </div>
  );
};
