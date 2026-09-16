import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'ur', name: 'اردو (Urdu)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'de', name: 'Deutsch (German)' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'zh-CN', name: '中文 (Chinese)' }
];

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if there's a google translate cookie to set initial state
    const cookie = document.cookie.split('; ').find(row => row.startsWith('googtrans='));
    if (cookie) {
      const lang = cookie.split('=')[1].split('/').pop();
      if (lang) {
        setCurrentLang(lang);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Google Translate stores language in a cookie 'googtrans'
    // Format: /auto/en or /en/hi
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${langCode}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/;`;
    
    // Also try to trigger the hidden select element if it exists for smoother transition without reload
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const currentLangName = LANGUAGES.find(l => l.code === currentLang)?.name || 'English';

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors text-sm font-medium"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-[#c5a059]" />
        <span className="hidden sm:inline-block truncate max-w-[100px]">{currentLangName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 max-h-96 overflow-y-auto bg-white rounded-xl shadow-lg border border-black/5 py-2"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#faf8f5] transition-colors flex items-center justify-between
                  ${currentLang === lang.code ? 'text-[#c5a059] font-medium bg-[#faf8f5]' : 'text-[#1e1b18]'}`}
              >
                {lang.name}
                {currentLang === lang.code && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
