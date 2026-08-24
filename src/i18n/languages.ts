export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' }
];

export const DEFAULT_LOCALE = 'en';

export function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  // 1. Check URL path prefix (e.g. /ja, /es)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    const firstPart = pathParts[0].toLowerCase();
    const match = SUPPORTED_LANGUAGES.find(l => l.code === firstPart);
    if (match) return match.code;
  }

  // 2. Check stored cookie or localStorage
  try {
    const cookieMatch = document.cookie.match(/NEXT_LOCALE=([a-zA-Z-]+)/);
    if (cookieMatch && cookieMatch[1]) {
      const lang = cookieMatch[1].split('-')[0].toLowerCase();
      if (SUPPORTED_LANGUAGES.some(l => l.code === lang)) return lang;
    }
    const saved = localStorage.getItem('NEXT_LOCALE') || localStorage.getItem('ftns_locale');
    if (saved) {
      const lang = saved.toLowerCase();
      if (SUPPORTED_LANGUAGES.some(l => l.code === lang)) return lang;
    }
  } catch {
    // ignore
  }

  // 3. Auto-detect from navigator.language / navigator.languages
  try {
    const navLangs = navigator.languages || [navigator.language];
    for (const l of navLangs) {
      if (!l) continue;
      const prefix = l.split('-')[0].toLowerCase();
      const match = SUPPORTED_LANGUAGES.find(lang => lang.code === prefix);
      if (match) return match.code;
    }
  } catch {
    // ignore
  }

  return DEFAULT_LOCALE;
}
