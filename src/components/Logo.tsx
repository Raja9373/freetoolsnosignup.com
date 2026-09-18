import React from 'react';
import { LOGO_DATA_URL } from '../lib/logoData';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <img 
      src={LOGO_DATA_URL} 
      alt="FreeToolsNoSignup Logo" 
      className={`object-contain ${className}`}
    />
  );
};
