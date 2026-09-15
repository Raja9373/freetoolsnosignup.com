import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ja', 'es', 'fr', 'de', 'hi', 'pt', 'ru', 'zh', 'ar', 'it', 'ko', 'nl', 'tr', 'pl', 'vi', 'th', 'id', 'ms', 'bn'];

const countryToLocale: Record<string, string> = {
  JP: 'ja', ES: 'es', FR: 'fr', DE: 'de', IN: 'hi', BR: 'pt', PT: 'pt', RU: 'ru', CN: 'zh', TW: 'zh', HK: 'zh',
  SA: 'ar', AE: 'ar', EG: 'ar', IT: 'it', KR: 'ko', NL: 'nl', TR: 'tr', PL: 'pl', VN: 'vi', TH: 'th', ID: 'id', MY: 'ms', BD: 'bn',
  MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es'
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip if already has locale in path /ja/tools etc or is api/_next/static/ads.txt/sitemap
  if (
    locales.some(loc => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return NextResponse.next();
  }

  // Detect country from Vercel/Cloudflare headers
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    '';

  let locale = 'en';
  if (country && countryToLocale[country]) {
    locale = countryToLocale[country];
  } else {
    // Fallback to Accept-Language header
    const acceptLang = request.headers.get('accept-language') || '';
    const preferred = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase();
    if (preferred && locales.includes(preferred)) {
      locale = preferred;
    }
  }

  // Don't redirect for en, just set cookie and stay
  if (locale !== 'en') {
    // Store in cookie for next time
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', locale, { maxAge: 60 * 60 * 24 * 365 });
    // Keep same URL for SEO but content dynamically loads via i18n provider
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|ads.txt|robots.txt|sitemap.xml).*)']
};
