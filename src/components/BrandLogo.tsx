import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'header' | 'compact' | 'icon-only' | 'footer';
  className?: string;
  onClick?: () => void;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = '',
  onClick,
  showTagline = false
}) => {
  // Icon-only variant: renders the sharp vector brand mark (speed gear + wrench + cursor)
  if (variant === 'icon-only') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 select-none ${className}`}
        title="FreeToolsNoSignup.com"
        id="brand-logo-icon"
      >
        <img
          src="/favicon.svg"
          alt="FreeToolsNoSignup"
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-xs"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>
    );
  }

  // Footer variant: renders on dark slate backgrounds
  if (variant === 'footer') {
    return (
      <div
        id="brand-logo-footer"
        onClick={onClick}
        className={`flex items-center select-none cursor-pointer group transition-opacity hover:opacity-95 ${className}`}
        title="FreeToolsNoSignup.com — 100% Free Browser Utilities"
      >
        <img
          src="/logo.svg"
          alt="FreeToolsNoSignup.com"
          className="h-11 sm:h-12 md:h-14 w-auto max-w-[240px] sm:max-w-[280px] object-contain drop-shadow-md"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>
    );
  }

  // Full / Sidebar variant: prominent brand display
  if (variant === 'full') {
    return (
      <div
        id="brand-logo-full"
        onClick={onClick}
        className={`flex flex-col select-none cursor-pointer group transition-opacity hover:opacity-95 ${className}`}
        title="FreeToolsNoSignup.com"
      >
        <img
          src="/logo.svg"
          alt="FreeToolsNoSignup.com"
          className="h-10 sm:h-11 md:h-12 w-auto max-w-full object-contain drop-shadow-xs"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>
    );
  }

  // Header / Default variant: responsive scaling for desktop, tablet, and mobile navigation bars
  return (
    <div
      id="brand-logo-header"
      onClick={onClick}
      className={`inline-flex items-center select-none cursor-pointer group transition-opacity hover:opacity-95 ${className}`}
      title="FreeToolsNoSignup.com"
    >
      <img
        src="/logo.svg"
        alt="FreeToolsNoSignup.com"
        className="h-8 sm:h-9 md:h-10 w-auto max-w-[190px] sm:max-w-[230px] md:max-w-[270px] object-contain drop-shadow-xs"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
