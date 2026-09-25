import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'FreeToolsNoSignup - 4,753+ Free Online Tools & Calculators (100% Private, No Login)',
  description = 'Access 4,753+ free online tools and calculators directly in your browser. PDF tools, image compressors, background removers, loan calculators, dev tools, and AI utilities. 100% free, no login or signup.',
  keywords = 'free tools no signup, pdf tools free, background remover online, free image compressor, loan calculator, ats resume checker, developer tools, free qr generator',
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogType = 'website',
  jsonLd
}) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title;

      const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
        const attr = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
        let el = document.querySelector(attr) as HTMLMetaElement;
        if (!el) {
          el = document.createElement('meta');
          if (isProperty) el.setAttribute('property', nameOrProperty);
          else el.setAttribute('name', nameOrProperty);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      if (description) setMeta('description', description);
      if (keywords) setMeta('keywords', keywords);
      setMeta('og:title', ogTitle || title, true);
      setMeta('og:description', ogDescription || description, true);
      setMeta('og:type', ogType, true);
      setMeta('robots', 'index, follow');

      if (canonicalUrl) {
        let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!linkEl) {
          linkEl = document.createElement('link');
          linkEl.setAttribute('rel', 'canonical');
          document.head.appendChild(linkEl);
        }
        linkEl.setAttribute('href', canonicalUrl);
      }

      if (jsonLd) {
        let scriptEl = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
        if (!scriptEl) {
          scriptEl = document.createElement('script');
          scriptEl.setAttribute('type', 'application/ld+json');
          document.head.appendChild(scriptEl);
        }
        scriptEl.textContent = JSON.stringify(jsonLd);
      }
    }
  }, [title, description, keywords, canonicalUrl, ogTitle, ogDescription, ogType, jsonLd]);

  return null;
};
