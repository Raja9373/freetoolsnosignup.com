// Middleware for automatic language detection & cookie persistence
export const SUPPORTED_LOCALES = [
  'en', 'hi', 'es', 'ja', 'de', 'fr', 'pt', 'ru', 'ar', 
  'zh', 'ko', 'it', 'nl', 'tr', 'pl', 'id', 'vi', 'th', 'bn', 'ur'
];

export const DEFAULT_LOCALE = 'en';

export function getLocaleFromHeaders(acceptLanguageHeader?: string | null): string {
  if (!acceptLanguageHeader) return DEFAULT_LOCALE;

  const languages = acceptLanguageHeader.split(',').map(l => l.trim().split(';')[0].toLowerCase());
  for (const lang of languages) {
    const prefix = lang.split('-')[0];
    if (SUPPORTED_LOCALES.includes(prefix)) {
      return prefix;
    }
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: { headers: { get: (name: string) => string | null }, cookies?: { get: (name: string) => string | null } }) {
  // 1. Check existing cookie preference
  const cookieLocale = request.cookies?.get?.('NEXT_LOCALE');
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Detect from Accept-Language header
  const acceptLang = request.headers.get('accept-language');
  return getLocaleFromHeaders(acceptLang);
}

export default middleware;
