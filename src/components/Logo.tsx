import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto", size = 'md' }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`flex items-center gap-2 font-extrabold tracking-tight text-[#0A2342] ${className}`}>
        <div className="bg-[#0B4DB8] text-white p-1.5 rounded-xl shadow-xs flex items-center justify-center">
          ⚡
        </div>
        <span className="text-base sm:text-lg">
          FreeTools <span className="text-[#FF7A00]">NoSignup</span>
        </span>
      </div>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="FreeToolsNoSignup Logo" 
      className={`object-contain ${className}`}
      onError={() => setImgError(true)}
    />
  );
};
