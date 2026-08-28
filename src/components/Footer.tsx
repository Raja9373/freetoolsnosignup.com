import React from 'react';
import { ShieldCheck, Zap, Lock, Cpu, Globe, CheckCircle2, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(route);
    }
  };

  return (
    <footer id="site-footer" className="w-full bg-[#071A3D] text-slate-400 text-xs mt-12 border-t border-[#0F274A]">
      
      {/* 500-WORD SEO SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 border-b border-[#0F274A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FFB000] font-bold uppercase tracking-wider text-xs">
              <Zap className="w-4 h-4 text-[#FF7A00]" />
              <span>The Modern Standard for Free Online Utilities</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              FreeToolsNoSignup.com — 580+ Browser-Native Utilities &amp; 260+ Accurate Calculators
            </h2>
          </div>
          <BrandLogo variant="footer" onClick={() => onNavigate?.('/')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300 leading-relaxed text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              100% Client-Side Data Privacy
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Unlike legacy online utility platforms that upload confidential resumes, sensitive PDF contracts, and proprietary images to remote third-party servers, FreeToolsNoSignup executes all computations directly in your local browser sandbox using HTML5 Canvas, WebAssembly, and Web Crypto APIs. Your private documents never touch our cloud servers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#FF7A00]" />
              Zero Watermarks &amp; No Fake Limits
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Traditional freemium websites lure users with "free tools" only to demand credit cards, email addresses, or apply intrusive logos and watermarks at the moment of download. At FTNS, all 580+ tools—including our flagship Notion Template Builder, ATS Resume Scorer, AI Content Detector, PDF Merger, and 260+ Loan &amp; Science Calculators—are genuinely free with zero usage gates.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#19A7FF]" />
              Lightning Fast Edge Performance
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              By removing server round-trips and network transmission queues, our utility suite processes heavy file operations up to 10x faster than traditional SaaS backends. Whether formatting complex JSON schemas, generating Luhn-valid synthetic test data, or calculating multi-decade mortgage amortization curves, results render instantly.
            </p>
          </div>
        </div>

        {/* Structured SEO Guide Details */}
        <div className="bg-[#040E24] border border-[#126BFF]/20 rounded-2xl p-5 text-xs text-slate-400 space-y-3">
          <h3 className="font-bold text-white text-sm">
            Comprehensive Directory of 580+ Working Tools Across 7 Categories:
          </h3>
          <p className="leading-relaxed">
            Our platform categorizes 580+ verified browser tools across seven core productivity domains: <strong>1. Job &amp; ATS Tools</strong> (featuring the real-time keyword matcher, CV score diagnostic, tailored cover letter writer, and salary counter-offer scripts); <strong>2. AI Study Tools</strong> (featuring the multi-layered burstiness AI content detector, 1-click humanizer, and APA/MLA citation generators); <strong>3. Dev Pro Tools</strong> (synthetic QA data generators, valid test credit cards, QR code studios, and JSON tree formatters); <strong>4. PDF Tools</strong> (client-side PDF merging, splitting, lossless compression, and text extraction); <strong>5. Image Tools</strong> (lossless WebP/PNG/JPG compressors, aspect ratio resizers, and transparent cutout tools); <strong>6. Calculators (260+ Suite)</strong> (mortgage EMI, compound SIP growth models, net salary take-home estimators, WHO-compliant BMI, scientific, and physics engineering engines); and <strong>7. Notion Templates &amp; Custom Builder</strong> (featuring our custom column database builder with 18 property types, CSV/JSON export, and 25 instant readymade templates).
          </p>
        </div>
      </div>

      {/* FOOTER NAVIGATION & ADS.TXT */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <nav aria-label="Legal and Information Links" className="flex flex-wrap items-center justify-center gap-5 text-slate-300 font-medium">
          <a 
            href="/about" 
            onClick={(e) => handleLinkClick(e, '/about')} 
            className="hover:text-[#FF7A00] transition-colors"
          >
            About Us
          </a>
          <a 
            href="/privacy-policy" 
            onClick={(e) => handleLinkClick(e, '/privacy-policy')} 
            className="hover:text-[#FF7A00] transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms-of-service" 
            onClick={(e) => handleLinkClick(e, '/terms-of-service')} 
            className="hover:text-[#FF7A00] transition-colors"
          >
            Terms of Service
          </a>
          <a 
            href="/disclaimer" 
            onClick={(e) => handleLinkClick(e, '/disclaimer')} 
            className="hover:text-[#FF7A00] transition-colors"
          >
            Disclaimer
          </a>
          <a 
            href="/contact" 
            onClick={(e) => handleLinkClick(e, '/contact')} 
            className="hover:text-[#FF7A00] transition-colors"
          >
            Contact
          </a>
          <a 
            href="/ads.txt" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#FF7A00] transition-colors font-mono"
          >
            ads.txt
          </a>
          <a 
            href="/sitemap.xml" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#FF7A00] transition-colors"
          >
            sitemap.xml
          </a>
        </nav>

        <div className="text-slate-500 text-center sm:text-right">
          © {new Date().getFullYear()} FreeToolsNoSignup.com • Built for speed, privacy &amp; utility.
        </div>
      </div>

    </footer>
  );
};
