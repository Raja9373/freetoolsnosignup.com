import React, { createContext, useContext, useState, useEffect } from 'react';

interface GeoContextType {
  country: string;
  currency: string;
  symbol: string;
  setCountry: (country: string) => void;
}

const COUNTRY_CURRENCY_MAP: Record<string, { currency: string; symbol: string }> = {
  IN: { currency: 'INR', symbol: '₹' },
  US: { currency: 'USD', symbol: '$' },
  JP: { currency: 'JPY', symbol: '¥' },
  ES: { currency: 'EUR', symbol: '€' },
  GB: { currency: 'GBP', symbol: '£' },
  CA: { currency: 'CAD', symbol: 'C$' },
  AU: { currency: 'AUD', symbol: 'A$' },
  DE: { currency: 'EUR', symbol: '€' },
};

const GeoContext = createContext<GeoContextType>({
  country: 'IN',
  currency: 'INR',
  symbol: '₹',
  setCountry: () => {}
});

export const GeoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountryState] = useState<string>(() => {
    try {
      return localStorage.getItem('ftns-country') || 'IN';
    } catch {
      return 'IN';
    }
  });

  const setCountry = (newCountry: string) => {
    setCountryState(newCountry);
    try {
      localStorage.setItem('ftns-country', newCountry);
      const mapped = COUNTRY_CURRENCY_MAP[newCountry] || COUNTRY_CURRENCY_MAP['IN'];
      localStorage.setItem('ftns_geo_currency', mapped.symbol);
      localStorage.setItem('ftns_geo_country', newCountry);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      try {
        const saved = localStorage.getItem('ftns-country');
        if (saved && saved !== country) {
          setCountryState(saved);
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('ftns-geo-change', ((e: CustomEvent) => {
      if (e.detail && e.detail.code) {
        setCountryState(e.detail.code);
      }
    }) as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ftns-geo-change', (() => {}) as EventListener);
    };
  }, [country]);

  const currentMap = COUNTRY_CURRENCY_MAP[country] || COUNTRY_CURRENCY_MAP['IN'];

  return (
    <GeoContext.Provider value={{ country, currency: currentMap.currency, symbol: currentMap.symbol, setCountry }}>
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => useContext(GeoContext);
