import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's already installed or running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      return; // Already installed
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    if (isIosDevice) {
      // iOS doesn't support beforeinstallprompt, so we just show the banner
      // after a small delay.
      setTimeout(() => setShowPrompt(true), 1500);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('To install the app on iOS: Tap the "Share" button at the bottom of Safari and select "Add to Home Screen".');
      return;
    }
    
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#1e1b18] text-white z-[100] px-4 py-3 flex items-center justify-between shadow-lg animate-fade-in">
      <div className="flex items-center gap-3">
        <img src="/applogo.png" alt="App Logo" className="w-10 h-10 rounded-lg object-cover bg-white p-0.5" />
        <div>
          <h4 className="text-sm font-bold tracking-wide">J.J. Interiors App</h4>
          <p className="text-[10px] text-stone-300">Fast, offline access & better experience.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleInstallClick}
          className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4b26f] text-black text-xs font-bold uppercase tracking-widest rounded transition-colors"
        >
          Install App
        </button>
        <button onClick={() => setShowPrompt(false)} className="text-stone-400 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
