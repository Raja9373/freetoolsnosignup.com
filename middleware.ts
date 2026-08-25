// Middleware for automatic language detection & cookie persistence

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|ads.txt|robots.txt|sitemap.xml|sitemap-*.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|js|css)$).*)',
  ],
};

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

export function middleware(request: { 
  nextUrl?: { pathname: string }; 
  url?: string;
  headers?: { get: (name: string) => string | null }; 
  cookies?: { get: (name: string) => any; set?: (name: string, value: string) => void };
}) {
  const pathname = request?.nextUrl?.pathname || (typeof request?.url === 'string' ? new URL(request.url).pathname : '');

  // 1. Skip middleware for static files needed for AdSense, crawlers, and assets
  if (
    pathname === '/ads.txt' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/sitemap-') ||
    pathname.includes('.txt') ||
    pathname.includes('.xml')
  ) {
    return;
  }

  // 2. Check existing cookie preference or detect from Accept-Language header
  const cookieLocale = typeof request?.cookies?.get === 'function'
    ? (request.cookies.get('NEXT_LOCALE')?.value || request.cookies.get('NEXT_LOCALE'))
    : undefined;

  let locale = DEFAULT_LOCALE;
  if (cookieLocale && typeof cookieLocale === 'string' && SUPPORTED_LOCALES.includes(cookieLocale)) {
    locale = cookieLocale;
  } else if (request?.headers && typeof request.headers.get === 'function') {
    const acceptLang = request.headers.get('accept-language');
    locale = getLocaleFromHeaders(acceptLang);
  }

  // Never return raw string as response to prevent MIDDLEWARE_INVOCATION_FAILED
  return;
}

export default middleware;

