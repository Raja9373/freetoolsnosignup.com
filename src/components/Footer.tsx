import React, { useState } from 'react';
import { ShieldCheck, Zap, Lock, Cpu, Globe, CheckCircle2, Heart, Code, Copy, Check, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { 
  TOTAL_TOOLS_COUNT, 
  INTERACTIVE_CALCULATORS_COUNT,
  PDF_TOOLS_COUNT,
  IMAGE_TOOLS_COUNT,
  CALCULATOR_TOOLS_COUNT,
  JOB_ATS_TOOLS_COUNT,
  AI_STUDY_TOOLS_COUNT,
  DEV_PRO_TOOLS_COUNT,
  NOTION_TOOLS_COUNT
} from '../data/toolCounts';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copiedType, setCopiedType] = useState<'badge' | 'text' | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(route);
    }
  };

  const badgeHtml = `<a href="https://www.freetoolsnosignup.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.freetoolsnosignup.com/badge.svg" alt="FreeToolsNoSignup - 4753 Free Tools No Signup" width="200" height="40" /></a>`;
  const textHtml = `<a href="https://www.freetoolsnosignup.com/" target="_blank" rel="noopener noreferrer">FreeToolsNoSignup - 4753 Free Tools No Signup</a>`;

  const handleCopyCode = (type: 'badge' | 'text', snippet: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <footer id="site-footer" className="w-full bg-[#0A1931] text-slate-400 text-xs mt-16 border-t border-[#142D54]">
      
      {/* 500-WORD SEO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-8 border-b border-[#142D54]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C5A059] font-semibold uppercase tracking-wider text-xs">
              <Zap className="w-4 h-4 text-[#C5A059]" />
              <span>The Modern Standard for Free Online Utilities</span>
            </div>
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-semibold text-white leading-snug">
              FreeToolsNoSignup.com — {TOTAL_TOOLS_COUNT} Browser-Native Tools, including {CALCULATOR_TOOLS_COUNT} Calculators
            </h2>
          </div>
          <BrandLogo variant="footer" onClick={() => onNavigate?.('/')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-300 leading-relaxed text-xs sm:text-sm">
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C5A059]" />
              100% Client-Side Data Privacy
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Unlike legacy online utility platforms that upload confidential resumes, sensitive PDF contracts, and proprietary images to remote third-party servers, FreeToolsNoSignup executes all computations directly in your local browser sandbox using HTML5 Canvas, WebAssembly, and Web Crypto APIs. Your private documents never touch our cloud servers.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#C5A059]" />
              Zero Watermarks &amp; No Fake Limits
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Traditional freemium websites lure users with "free tools" only to demand credit cards, email addresses, or apply intrusive logos and watermarks at the moment of download. At FTNS, all {TOTAL_TOOLS_COUNT} tools—including our flagship Notion Template Builder, ATS Resume Scorer, AI Content Detector, PDF Merger, and {CALCULATOR_TOOLS_COUNT} Loan &amp; Science Calculator Tools ({INTERACTIVE_CALCULATORS_COUNT} Calculator Functions)—are genuinely free with zero usage gates.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#C5A059]" />
              Lightning Fast Edge Performance
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              By removing server round-trips and network transmission queues, our utility suite processes heavy file operations up to 10x faster than traditional SaaS backends. Whether formatting complex JSON schemas, generating Luhn-valid synthetic test data, or calculating multi-decade mortgage amortization curves, results render instantly.
            </p>
          </div>
        </div>

        {/* Structured SEO Guide Details */}
        <div className="bg-[#071326] border border-[#142D54] rounded-2xl p-6 text-xs text-slate-400 space-y-3">
          <h3 className="font-semibold text-white text-sm">
            Comprehensive Directory of {TOTAL_TOOLS_COUNT} Working Tools Across 7 Categories:
          </h3>
          <p className="leading-relaxed">
            Our platform categorizes {TOTAL_TOOLS_COUNT} verified browser tools across seven core productivity domains: <strong>1. Job &amp; ATS Tools ({JOB_ATS_TOOLS_COUNT} Tools)</strong> (featuring the real-time keyword matcher, CV score diagnostic, tailored cover letter writer, and salary counter-offer scripts); <strong>2. AI Study Tools ({AI_STUDY_TOOLS_COUNT} Tools)</strong> (featuring the multi-layered burstiness AI content detector, 1-click humanizer, and APA/MLA citation generators); <strong>3. Dev Pro Tools ({DEV_PRO_TOOLS_COUNT} Tools)</strong> (synthetic QA data generators, valid test credit cards, QR code studios, and JSON tree formatters); <strong>4. PDF Tools ({PDF_TOOLS_COUNT} Tools)</strong> (client-side PDF merging, splitting, lossless compression, and text extraction); <strong>5. Image Tools ({IMAGE_TOOLS_COUNT} Tools)</strong> (lossless WebP/PNG/JPG compressors, aspect ratio resizers, and transparent cutout tools); <strong>6. Calculators ({CALCULATOR_TOOLS_COUNT} Tools • {INTERACTIVE_CALCULATORS_COUNT} Calculator Functions)</strong> (mortgage EMI, compound SIP growth models, net salary take-home estimators, WHO-compliant BMI, scientific, and physics engineering engines); and <strong>7. Notion Templates &amp; Custom Builder ({NOTION_TOOLS_COUNT} Tools)</strong> (featuring our custom column database builder with 18 property types, CSV/JSON export, and 25 instant readymade templates).
          </p>
        </div>

        {/* LINK TO US & BACKLINK SECTION */}
        <div className="bg-[#071326] border border-[#1E3A8A] rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Code className="w-4 h-4 text-[#C5A059]" />
                <span>Link to Us — Free Backlink &amp; Widget Snippet</span>
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Help your visitors find {TOTAL_TOOLS_COUNT} private tools with zero signups. Copy and paste either snippet into your website:
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('/partners')}
                className="px-3.5 py-1.5 rounded-xl bg-[#142D54] hover:bg-[#1E3A8A] text-[#C5A059] font-bold text-xs border border-[#C5A059]/30 transition-colors shrink-0"
              >
                Claim Dofollow Backlink &rarr;
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* HTML Badge */}
            <div className="bg-[#0A1931] border border-[#142D54] rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-[11px]">Option A: Visual HTML Badge</span>
                <button
                  onClick={() => handleCopyCode('badge', badgeHtml)}
                  className="text-xs text-[#C5A059] hover:underline font-bold flex items-center gap-1"
                >
                  {copiedType === 'badge' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'badge' ? 'Copied' : 'Copy HTML'}</span>
                </button>
              </div>
              <div className="font-mono text-[10px] text-slate-400 bg-[#071326] p-2 rounded border border-[#142D54] truncate">
                {badgeHtml}
              </div>
            </div>

            {/* Anchor Text Link */}
            <div className="bg-[#0A1931] border border-[#142D54] rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-[11px]">Option B: Clean Anchor Text Link</span>
                <button
                  onClick={() => handleCopyCode('text', textHtml)}
                  className="text-xs text-[#C5A059] hover:underline font-bold flex items-center gap-1"
                >
                  {copiedType === 'text' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'text' ? 'Copied' : 'Copy HTML'}</span>
                </button>
              </div>
              <div className="font-mono text-[10px] text-slate-400 bg-[#071326] p-2 rounded border border-[#142D54] truncate">
                {textHtml}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER NAVIGATION & DIRECTORY LINKS */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <nav aria-label="Legal and Information Links" className="flex flex-wrap items-center justify-center gap-5 text-slate-300 font-medium">
          <a 
            href="/about" 
            onClick={(e) => handleLinkClick(e, '/about')} 
            className="hover:text-[#C5A059] transition-colors"
          >
            About Us
          </a>
          <a 
            href="/backlinks" 
            onClick={(e) => handleLinkClick(e, '/backlinks')} 
            className="hover:text-[#C5A059] transition-colors font-bold text-[#C5A059]"
          >
            Embed Widgets
          </a>
          <a 
            href="/partners" 
            onClick={(e) => handleLinkClick(e, '/partners')} 
            className="hover:text-[#C5A059] transition-colors font-bold text-[#C5A059]"
          >
            Partners
          </a>
          <a 
            href="/launch" 
            onClick={(e) => handleLinkClick(e, '/launch')} 
            className="hover:text-[#C5A059] transition-colors font-bold text-[#DA552F]"
          >
            Product Hunt Kit
          </a>
          <a 
            href="/blog" 
            onClick={(e) => handleLinkClick(e, '/blog')} 
            className="hover:text-[#C5A059] transition-colors"
          >
            Blog
          </a>
          <a 
            href="/privacy-policy" 
            onClick={(e) => handleLinkClick(e, '/privacy-policy')} 
            className="hover:text-[#C5A059] transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms-of-service" 
            onClick={(e) => handleLinkClick(e, '/terms-of-service')} 
            className="hover:text-[#C5A059] transition-colors"
          >
            Terms of Service
          </a>
          <a 
            href="/disclaimer" 
            onClick={(e) => handleLinkClick(e, '/disclaimer')} 
            className="hover:text-[#C5A059] transition-colors"
          >
            Disclaimer
          </a>
          <a 
            href="/contact" 
            onClick={(e) => handleLinkClick(e, '/contact')} 
            className="hover:text-[#C5A059] transition-colors"
          >
            Contact
          </a>
          <a 
            href="/ads.txt" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#C5A059] transition-colors font-mono"
          >
            ads.txt
          </a>
          <a 
            href="/sitemap.xml" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#C5A059] transition-colors"
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
