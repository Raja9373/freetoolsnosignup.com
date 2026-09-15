import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  language: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', language: 'hi-IN' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', language: 'en-US' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', symbol: '¥', language: 'ja-JP' },
  { code: 'ES', name: 'Spain / EU', flag: '🇪🇸', currency: 'EUR', symbol: '€', language: 'es-ES' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', language: 'en-GB' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'C$', language: 'en-CA' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$', language: 'en-AU' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', language: 'de-DE' },
];

export function GeoFlagSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<CountryOption>(() => {
    try {
      const saved = localStorage.getItem('ftns_geo_country');
      if (saved) {
        const found = COUNTRIES.find(c => c.code === saved);
        if (found) return found;
      }
      // Auto-detect browser language/locale
      const lang = navigator.language || 'en-US';
      if (lang.includes('ja')) return COUNTRIES[2]; // JP
      if (lang.includes('es')) return COUNTRIES[3]; // ES
      if (lang.includes('hi') || lang.includes('IN')) return COUNTRIES[0]; // IN
      if (lang.includes('GB')) return COUNTRIES[4]; // GB
      return COUNTRIES[1]; // US default
    } catch {
      return COUNTRIES[1];
    }
  });

  const handleSelectCountry = (country: CountryOption) => {
    setCurrentCountry(country);
    setIsOpen(false);
    try {
      localStorage.setItem('ftns_geo_country', country.code);
      localStorage.setItem('ftns_geo_currency', country.symbol);
      window.dispatchEvent(new CustomEvent('ftns-geo-change', { detail: country }));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.geo-switcher-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="relative geo-switcher-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C5A059] text-xs font-bold text-[#0A1931] flex items-center gap-1.5 shadow-2xs transition hover:bg-amber-50/20 cursor-pointer"
        title="Select Country & Currency Region"
        aria-label="Change country region"
      >
        <span className="text-base leading-none">{currentCountry.flag}</span>
        <span className="font-extrabold text-[#0A1931]">{currentCountry.symbol}</span>
        <span className="hidden sm:inline text-[11px] text-[#64748B] font-medium">{currentCountry.code}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in zoom-in duration-150">
          <div className="px-3 py-1.5 text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
            <span>Global Region & Currency</span>
            <Globe className="w-3 h-3 text-[#C5A059]" />
          </div>
          <div className="py-1">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => handleSelectCountry(c)}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                  currentCountry.code === c.code ? 'bg-amber-50/60 font-bold text-[#0A1931]' : 'text-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{c.flag}</span>
                  <div>
                    <div className="font-bold">{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">Currency: {c.currency} ({c.symbol})</div>
                  </div>
                </div>
                {currentCountry.code === c.code && (
                  <Check className="w-4 h-4 text-[#C5A059]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
