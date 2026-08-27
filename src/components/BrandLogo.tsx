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
  // Royal Geometric Crown & Shield Emblem SVG
  const renderEmblem = (sizeClass: string = 'w-9 h-9') => (
    <div className={`relative ${sizeClass} shrink-0 select-none`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          {/* Deep Royal Gradient */}
          <linearGradient id="royalBgGrad" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          {/* Imperial Gold Gradient */}
          <linearGradient id="imperialGoldGrad" x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Luminous Sapphire Accent */}
          <linearGradient id="sapphireGlowGrad" x1="16" y1="12" x2="32" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          {/* Subtle Outer Bevel */}
          <linearGradient id="goldBorderGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Shield / Hexagon Outer Silhouette */}
        <path
          d="M24 3L42 11.5V26C42 35.5 34.5 42.5 24 45.5C13.5 42.5 6 35.5 6 26V11.5L24 3Z"
          fill="url(#royalBgGrad)"
          stroke="url(#goldBorderGrad)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Royal Crown Facet Geometry */}
        {/* Left Crown Wing */}
        <path
          d="M13 25L17 16L21 21L13 25Z"
          fill="url(#imperialGoldGrad)"
          opacity="0.9"
        />
        {/* Right Crown Wing */}
        <path
          d="M35 25L31 16L27 21L35 25Z"
          fill="url(#imperialGoldGrad)"
          opacity="0.9"
        />
        {/* Center Royal Crown Spire */}
        <path
          d="M24 12L28 20L24 23L20 20L24 12Z"
          fill="url(#imperialGoldGrad)"
        />

        {/* Central Brilliant Node / Diamond Core */}
        <polygon
          points="24,24 29,30 24,36 19,30"
          fill="url(#sapphireGlowGrad)"
          stroke="#fef08a"
          strokeWidth="1"
        />

        {/* Central Crown Diamond Jewels */}
        <circle cx="24" cy="11.5" r="1.5" fill="#fef08a" />
        <circle cx="16.5" cy="15.5" r="1.2" fill="#fef08a" />
        <circle cx="31.5" cy="15.5" r="1.2" fill="#fef08a" />

        {/* Dynamic Light Sparkle */}
        <path
          d="M24 27.5L25 29.5L27 30L25 30.5L24 32.5L23 30.5L21 30L23 29.5L24 27.5Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className}`}
        title="FreeToolsNoSignup.com"
      >
        {renderEmblem()}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}
      >
        {renderEmblem('w-10 h-10')}
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight font-extrabold text-lg leading-tight">
            <span className="text-white">FreeTools</span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent ml-0.5">
              NoSignup
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>580+ Royal Browser Utilities</span>
          </div>
        </div>
      </div>
    );
  }

  // Header / Default variant
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 select-none cursor-pointer group transition-opacity hover:opacity-95 ${className}`}
    >
      {renderEmblem(variant === 'full' ? 'w-10 h-10' : 'w-8 h-8')}
      <div className="flex flex-col justify-center">
        <div className="flex items-center leading-none">
          <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
            FreeTools
          </span>
          <span className="font-black text-amber-600 ml-0.5 text-base sm:text-lg">
            NoSignup
          </span>
        </div>
        {(showTagline || variant === 'full') && (
          <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            100% Free • Client-Side Private
          </span>
        )}
      </div>
    </div>
  );
};
