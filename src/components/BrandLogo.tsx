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
  // Icon-only variant: renders the sharp vector brand mark
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
          alt="FreeTools NoSignup"
          className="w-10 h-10 object-contain drop-shadow-xs"
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
          src="/logo.png"
          alt="FreeTools NoSignup - Fast Free Easy"
          className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
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
          src="/logo.png"
          alt="FreeTools NoSignup - Fast Free Easy"
          className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
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
      title="FreeToolsNoSignup.com - Fast Free Easy"
    >
      <img
        src="/logo.png"
        alt="FreeTools NoSignup - Fast Free Easy"
        className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
