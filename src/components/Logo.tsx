import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12 md:h-14 w-auto" }) => {
  return (
    <img 
      src="/logo.svg" 
      alt="FreeToolsNoSignup Logo" 
      className={`object-contain drop-shadow-xs ${className}`}
      loading="eager"
    />
  );
};
