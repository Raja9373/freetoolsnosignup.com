import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SUPPORTED_LANGUAGES, DEFAULT_LOCALE, LanguageConfig, detectBrowserLanguage } from './languages';
import { TRANSLATIONS } from './translations';

interface I18nContextType {
  locale: string;
  currentLanguage: LanguageConfig;
  dir: 'ltr' | 'rtl';
  setLocale: (newLocale: string, updateUrl?: boolean) => void;
  t: (key: string, defaultVal?: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>(() => {
    return detectBrowserLanguage();
  });

  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === locale) || SUPPORTED_LANGUAGES[0];
  const dir = currentLanguage.dir;

  const setLocale = useCallback((newLocale: string, updateUrl = true) => {
    const validMatch = SUPPORTED_LANGUAGES.find(l => l.code === newLocale.toLowerCase());
    const validLocale = validMatch ? validMatch.code : DEFAULT_LOCALE;

    setLocaleState(validLocale);

    // 1. Save in cookie 'NEXT_LOCALE' for server / edge middleware
    try {
      document.cookie = `NEXT_LOCALE=${validLocale}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('NEXT_LOCALE', validLocale);
      localStorage.setItem('ftns_locale', validLocale);
    } catch {
      // ignore
    }

    // 2. Update HTML attributes
    try {
      document.documentElement.lang = validLocale;
      document.documentElement.dir = validMatch?.dir || 'ltr';
    } catch {
      // ignore
    }

    // 3. Update URL path seamlessly if requested
    if (updateUrl && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split('/').filter(Boolean);
      const isFirstPartLocale = pathParts.length > 0 && SUPPORTED_LANGUAGES.some(l => l.code === pathParts[0]);

      let newPath = '';
      if (validLocale === DEFAULT_LOCALE) {
        // For default locale ('en'), clean prefix or keep path
        if (isFirstPartLocale) {
          const rest = pathParts.slice(1).join('/');
          newPath = rest ? `/${rest}` : '/';
        } else {
          newPath = currentPath;
        }
      } else {
        // Non-default locale: e.g. /ja, /es/about
        if (isFirstPartLocale) {
          const rest = pathParts.slice(1).join('/');
          newPath = rest ? `/${validLocale}/${rest}` : `/${validLocale}`;
        } else {
          const cleanPath = currentPath === '/' ? '' : currentPath;
          newPath = `/${validLocale}${cleanPath}`;
        }
      }

      if (newPath !== currentPath) {
        window.history.pushState({}, '', newPath);
      }
    }
  }, []);

  // Update HTML tag whenever locale changes
  useEffect(() => {
    try {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    } catch {
      // ignore
    }
  }, [locale, dir]);

  // Handle URL navigation / back button
  useEffect(() => {
    const handlePopState = () => {
      const detected = detectBrowserLanguage();
      if (detected !== locale) {
        setLocaleState(detected);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [locale]);

  const t = useCallback((key: string, defaultVal?: string): string => {
    const dict = TRANSLATIONS[locale] || TRANSLATIONS[DEFAULT_LOCALE];
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to English dictionary
    const enDict = TRANSLATIONS[DEFAULT_LOCALE];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return defaultVal || key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, currentLanguage, dir, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
