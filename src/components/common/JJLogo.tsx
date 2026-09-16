import React from 'react';

interface JJLogoProps {
  variant?: 'full' | 'mark-only' | 'invoice' | 'minimal';
  theme?: 'dark' | 'light' | 'invoice';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string;
}

export const JJLogo: React.FC<JJLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
  customLogoUrl,
}) => {
  // Dimension scaling
  const scale =
    size === 'sm' ? 0.75 : size === 'md' ? 1 : size === 'lg' ? 1.35 : 1.7;

  const textColor =
    theme === 'dark'
      ? '#ffffff'
      : theme === 'invoice'
      ? '#1e1b18'
      : '#1e1b18';

  const subTextColor =
    theme === 'dark'
      ? '#c5a059'
      : '#7d623d';

  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={customLogoUrl}
          alt="J.J. INTERIORS & MODUTECH"
          className={`object-contain ${
            size === 'sm' ? 'h-8' : size === 'md' ? 'h-11' : size === 'lg' ? 'h-16' : 'h-20'
          }`}
        />
        {variant !== 'mark-only' && (
          <div className="flex flex-col text-left justify-center min-w-0">
            <span 
              className={`font-display font-medium tracking-[0.05em] sm:tracking-[0.15em] leading-none mb-0.5 sm:mb-1 whitespace-nowrap truncate ${
                size === 'sm' ? 'text-[12px] sm:text-[14px]' : size === 'md' ? 'text-[14px] sm:text-[18px]' : 'text-[18px] sm:text-[22px]'
              }`} 
              style={{ color: textColor }}
            >
              J.J. INTERIORS
            </span>
            <span 
              className={`font-sans font-semibold tracking-[0.1em] sm:tracking-[0.25em] leading-none whitespace-nowrap truncate ${
                size === 'sm' ? 'text-[7px] sm:text-[8px]' : size === 'md' ? 'text-[8px] sm:text-[10px]' : 'text-[10px] sm:text-[12px]'
              }`} 
              style={{ color: subTextColor }}
            >
              & MODUTECH
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'mark-only') {
    return (
      <svg
        width={48 * scale}
        height={48 * scale}
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none ${className}`}
        aria-label="J.J. Logo Mark"
      >
        <defs>
          <linearGradient id="markGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8b26e" />
            <stop offset="45%" stopColor="#b6893f" />
            <stop offset="100%" stopColor="#805b22" />
          </linearGradient>
          <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3ddad" />
            <stop offset="100%" stopColor="#98712f" />
          </linearGradient>
        </defs>

        <circle cx="35" cy="35" r="32" stroke="url(#ringGold)" strokeWidth="1.8" fill="none" opacity="0.9" />
        <circle cx="35" cy="35" r="29.5" stroke="url(#ringGold)" strokeWidth="0.8" fill="none" strokeDasharray="2 2" opacity="0.6" />

        {/* Left J Column */}
        <path
          d="M 27 16 L 33 16 L 33 42 C 33 47.5 28.5 51 23.5 51 C 18 51 15 46.5 15 42 L 19.5 42 C 19.5 44.5 21.2 47 23.5 47 C 26 47 28.5 44.8 28.5 42 L 28.5 20.5 L 25 20.5 L 25 16 Z"
          fill="url(#markGold)"
        />
        <rect x="29.8" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />

        {/* Right J Column */}
        <path
          d="M 37 16 L 47 16 L 47 20.5 L 43.5 20.5 L 43.5 42 C 43.5 47.5 39 51 34 51 C 29.5 51 26.5 47.5 26.5 43.5 L 31 43.5 C 31 45.5 32.5 47 34.5 47 C 37 47 39 45 39 42 L 39 16 Z"
          fill="url(#markGold)"
        />
        <rect x="40.3" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />

        {/* Top/Bottom architectural capitals */}
        <line x1="21" y1="16" x2="49" y2="16" stroke="url(#markGold)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="19" y1="52.5" x2="45" y2="52.5" stroke="url(#markGold)" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      </svg>
    );
  }

  // Invoice-specific compact lockup (as in image.png)
  if (variant === 'invoice') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <defs>
            <linearGradient id="invGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4b06a" />
              <stop offset="50%" stopColor="#b5873b" />
              <stop offset="100%" stopColor="#7a551e" />
            </linearGradient>
            <linearGradient id="invRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ecd39e" />
              <stop offset="100%" stopColor="#966d2c" />
            </linearGradient>
          </defs>
          <circle cx="35" cy="35" r="32" stroke="url(#invRing)" strokeWidth="1.6" fill="none" opacity="0.95" />
          <circle cx="35" cy="35" r="29.5" stroke="url(#invRing)" strokeWidth="0.75" fill="none" strokeDasharray="2 2" opacity="0.5" />
          <path
            d="M 27 16 L 33 16 L 33 42 C 33 47.5 28.5 51 23.5 51 C 18 51 15 46.5 15 42 L 19.5 42 C 19.5 44.5 21.2 47 23.5 47 C 26 47 28.5 44.8 28.5 42 L 28.5 20.5 L 25 20.5 L 25 16 Z"
            fill="url(#invGold)"
          />
          <rect x="29.8" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />
          <path
            d="M 37 16 L 47 16 L 47 20.5 L 43.5 20.5 L 43.5 42 C 43.5 47.5 39 51 34 51 C 29.5 51 26.5 47.5 26.5 43.5 L 31 43.5 C 31 45.5 32.5 47 34.5 47 C 37 47 39 45 39 42 L 39 16 Z"
            fill="url(#invGold)"
          />
          <rect x="40.3" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />
          <line x1="21" y1="16" x2="49" y2="16" stroke="url(#invGold)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="19" y1="52.5" x2="45" y2="52.5" stroke="url(#invGold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </svg>

        <div className="flex flex-col justify-center">
          <div className="font-display text-[15px] sm:text-[17px] font-bold tracking-[0.16em] uppercase text-[#1e1b18] leading-tight">
            J.J. INTERIORS &amp; MODUTECH
          </div>
          <div className="text-[7px] sm:text-[8px] font-semibold tracking-[0.24em] uppercase text-[#8c6f50] mt-0.5">
            SPACES | DESIGNED | FOR A BETTER TOMORROW
          </div>
        </div>
      </div>
    );
  }

  // Full default responsive brand lockup
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      <svg
        width={42 * scale}
        height={42 * scale}
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="fullGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dfba76" />
            <stop offset="50%" stopColor="#b5873b" />
            <stop offset="100%" stopColor="#7a551e" />
          </linearGradient>
          <linearGradient id="fullRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3ddad" />
            <stop offset="100%" stopColor="#9a712c" />
          </linearGradient>
        </defs>
        <circle cx="35" cy="35" r="32" stroke="url(#fullRing)" strokeWidth="1.8" fill="none" opacity="0.9" />
        <circle cx="35" cy="35" r="29.5" stroke="url(#fullRing)" strokeWidth="0.8" fill="none" strokeDasharray="2 2" opacity="0.5" />
        <path
          d="M 27 16 L 33 16 L 33 42 C 33 47.5 28.5 51 23.5 51 C 18 51 15 46.5 15 42 L 19.5 42 C 19.5 44.5 21.2 47 23.5 47 C 26 47 28.5 44.8 28.5 42 L 28.5 20.5 L 25 20.5 L 25 16 Z"
          fill="url(#fullGold)"
        />
        <rect x="29.8" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />
        <path
          d="M 37 16 L 47 16 L 47 20.5 L 43.5 20.5 L 43.5 42 C 43.5 47.5 39 51 34 51 C 29.5 51 26.5 47.5 26.5 43.5 L 31 43.5 C 31 45.5 32.5 47 34.5 47 C 37 47 39 45 39 42 L 39 16 Z"
          fill="url(#fullGold)"
        />
        <rect x="40.3" y="22" width="1.2" height="18" fill="#ffffff" opacity="0.6" />
        <line x1="21" y1="16" x2="49" y2="16" stroke="url(#fullGold)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="19" y1="52.5" x2="45" y2="52.5" stroke="url(#fullGold)" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
      </svg>

      <div className="flex flex-col justify-center min-w-0">
        <div
          style={{ color: textColor }}
          className="font-display text-[12px] sm:text-base lg:text-lg font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase leading-tight truncate"
        >
          J.J. INTERIORS &amp; MODUTECH
        </div>
        <div
          style={{ color: subTextColor }}
          className="text-[6.5px] sm:text-[8.5px] font-semibold tracking-[0.14em] sm:tracking-[0.22em] uppercase mt-0.5 leading-none truncate"
        >
          SPACES | DESIGNED | FOR A BETTER TOMORROW
        </div>
      </div>
    </div>
  );
};
