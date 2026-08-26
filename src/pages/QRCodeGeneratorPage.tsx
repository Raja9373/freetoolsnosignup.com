import React, { useEffect } from 'react';
import { QRGeneratorModal } from '../components/tools/QRGeneratorModal';

interface QRCodeGeneratorPageProps {
  onNavigateHome: () => void;
}

export const QRCodeGeneratorPage: React.FC<QRCodeGeneratorPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    // 1. Page Title & Meta Description
    document.title = 'Free QR Code Generator – Create QR Codes Online Free | FreeToolsNoSignup';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Create free QR codes for URLs, text, Wi-Fi, email, phone, WhatsApp and more. No signup required. Generate and download QR codes instantly.'
    );

    // 2. Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.freetoolsnosignup.com/qr-code-generator');

    // 3. Open Graph Tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', 'Free QR Code Generator – Create QR Codes Online Free | FreeToolsNoSignup');
    setMetaTag('og:description', 'Create free QR codes for URLs, text, Wi-Fi, email, phone, WhatsApp and more. No signup required. Generate and download QR codes instantly.');
    setMetaTag('og:url', 'https://www.freetoolsnosignup.com/qr-code-generator');
    setMetaTag('og:type', 'website');

    // 4. Twitter Tags
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', 'Free QR Code Generator – Create QR Codes Online Free | FreeToolsNoSignup');
    setTwitterTag('twitter:description', 'Create free QR codes for URLs, text, Wi-Fi, email, phone, WhatsApp and more. No signup required.');

    // 5. JSON-LD Structured Data (WebApplication + FAQPage)
    const jsonLdId = 'qr-generator-jsonld';
    let scriptTag = document.getElementById(jsonLdId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'Free QR Code Generator',
          'url': 'https://www.freetoolsnosignup.com/qr-code-generator',
          'description': 'Create custom high-resolution QR codes for websites, Wi-Fi, vCard, WhatsApp, SMS, and text with vector SVG and PNG downloads. 100% private client-side processing.',
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'Any',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'featureList': [
            '100% Free with No Signup Required',
            '100% Client-Side Privacy Guarantee',
            'Vector SVG & High-Res PNG Exports',
            'Wi-Fi, URL, vCard, WhatsApp, Email, Phone Support',
            'Center Brand Logo Overlay',
            'Custom Colors and Error Correction Levels'
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Is this QR code generator really 100% free with no signup?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. FreeToolsNoSignup.com provides an unconstrained, unlimited QR code generator with no registration forms, email capture, or paywalls.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do the generated QR codes ever expire?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'No. All QR codes generated here are Static QR codes where data is encoded directly into the pattern matrix. They work permanently as long as the destination target exists.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Are my QR codes private?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. The entire QR code generation pipeline operates inside your browser using standard JavaScript. No payload data is ever uploaded or stored.'
              }
            }
          ]
        }
      ]
    };

    scriptTag.textContent = JSON.stringify(structuredData);

    window.scrollTo(0, 0);

    return () => {
      // Cleanup structured data when leaving page
      const tag = document.getElementById(jsonLdId);
      if (tag) tag.remove();
    };
  }, []);

  return (
    <QRGeneratorModal
      isStandalonePage={true}
      onNavigateHome={onNavigateHome}
      onClose={onNavigateHome}
      onRecordUse={() => {}}
    />
  );
};
