import { SUPPORTED_LANGUAGES, DEFAULT_LOCALE, detectBrowserLanguage } from '../src/i18n/languages';
import { TRANSLATIONS } from '../src/i18n/translations';

export const locales = SUPPORTED_LANGUAGES.map(l => l.code);
export const defaultLocale = DEFAULT_LOCALE;

export function getMessages(locale: string) {
  return TRANSLATIONS[locale] || TRANSLATIONS[DEFAULT_LOCALE];
}

export { SUPPORTED_LANGUAGES, detectBrowserLanguage, TRANSLATIONS };
