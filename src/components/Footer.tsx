import React, { useState } from 'react';
import { ShieldCheck, Zap, Lock, Cpu, Globe, CheckCircle2, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact' | 'adsTxt' | 'sitemap' | null>(null);

  return (
    <footer id="site-footer" className="w-full bg-slate-900 text-slate-400 text-xs mt-12 border-t border-slate-800">
      
      {/* 500-WORD SEO SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">
            <Zap className="w-4 h-4" />
            <span>The Modern Standard for Free Online Utilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
            FreeToolsNoSignup.com — 495 Browser-Native Utilities Without Registration Walls
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300 leading-relaxed text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              100% Client-Side Data Privacy
            </h4>
            <p className="text-slate-400 text-xs">
              Unlike legacy online utility platforms that upload confidential resumes, sensitive PDF contracts, and proprietary images to remote third-party servers, FreeToolsNoSignup executes all computations directly in your local browser sandbox using HTML5 Canvas, WebAssembly, and Web Crypto APIs. Your private documents never touch our cloud servers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-400" />
              Zero Watermarks & No Fake Limits
            </h4>
            <p className="text-slate-400 text-xs">
              Traditional freemium websites lure users with "free tools" only to demand credit cards, email addresses, or apply intrusive logos and watermarks at the moment of download. At FTNS, all 495 tools—including our flagship ATS Resume Scorer, AI Content Detector, PDF Merger, and Loan EMI Calculators—are genuinely free with zero usage gates.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-cyan-400" />
              Lightning Fast Edge Performance
            </h4>
            <p className="text-slate-400 text-xs">
              By removing server round-trips and network transmission queues, our utility suite processes heavy file operations up to 10x faster than traditional SaaS backends. Whether formatting complex JSON schemas, generating Luhn-valid synthetic test data, or calculating multi-decade mortgage amortization curves, results render instantly.
            </p>
          </div>
        </div>

        {/* Structured SEO Guide Details */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-3">
          <h3 className="font-bold text-white text-sm">
            Comprehensive Directory of 495 Working Tools Across 6 Categories:
          </h3>
          <p className="leading-relaxed">
            Our platform categorizes 495 verified browser tools across six core productivity domains: <strong>1. Job & ATS Tools</strong> (featuring the real-time keyword matcher, CV score diagnostic, tailored cover letter writer, and salary counter-offer scripts); <strong>2. AI Study Tools</strong> (featuring the multi-layered burstiness AI content detector, 1-click humanizer, and APA/MLA citation generators); <strong>3. Dev Pro Tools</strong> (synthetic QA data generators, valid test credit cards, QR code studios, and JSON tree formatters); <strong>4. PDF Tools</strong> (client-side PDF merging, splitting, lossless compression, and text extraction); <strong>5. Image Tools</strong> (lossless WebP/PNG/JPG compressors, aspect ratio resizers, and transparent cutout tools); and <strong>6. Calculators</strong> (mortgage EMI, compound SIP growth models, net salary take-home estimators, and WHO-compliant BMI calculators).
          </p>
        </div>
      </div>

      {/* FOOTER NAVIGATION & ADS.TXT */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <button onClick={() => setModalType('about')} className="hover:text-white transition-colors">About Us</button>
          <button onClick={() => setModalType('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => setModalType('terms')} className="hover:text-white transition-colors">Terms of Service</button>
          <button onClick={() => setModalType('disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
          <button onClick={() => setModalType('contact')} className="hover:text-white transition-colors">Contact</button>
          <button onClick={() => setModalType('adsTxt')} className="hover:text-white transition-colors font-mono">ads.txt</button>
          <button onClick={() => setModalType('sitemap')} className="hover:text-white transition-colors">Sitemap</button>
        </div>

        <div className="text-slate-500 text-center sm:text-right">
          © {new Date().getFullYear()} FreeToolsNoSignup.com. Built for speed, privacy & utility.
        </div>
      </div>

      {/* Informational Modals */}
      {modalType && (
        <div 
          onClick={() => setModalType(null)}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 capitalize">
                {modalType === 'adsTxt' ? 'Google AdSense ads.txt Configuration' : modalType}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed max-h-72 overflow-y-auto space-y-2">
              {modalType === 'about' && (
                <p>
                  FreeToolsNoSignup.com was founded with a single mission: to create the world's most accessible, fastest, and strictly private collection of free browser-based digital utilities. We never mandate user registration, subscriptions, or invasive tracking cookies.
                </p>
              )}

              {modalType === 'privacy' && (
                <p>
                  Privacy Policy: We operate a zero-knowledge, 100% client-side architecture. Files processed in PDF tools, Image tools, ATS checkers, and AI detectors are parsed exclusively in local browser RAM and are never transferred to or persisted on remote databases.
                </p>
              )}

              {modalType === 'terms' && (
                <p>
                  Terms of Service: All tools are provided free of charge for personal and commercial usage. Test credit cards and mock data generated via our developer suite are strictly synthetic and formatted for software QA verification only.
                </p>
              )}

              {modalType === 'disclaimer' && (
                <p>
                  Financial & Diagnostic Disclaimer: Financial calculations (EMI, SIP, Tax) and ATS diagnostic scores are provided for informational estimation purposes. Consult certified financial or legal advisors for critical decisions.
                </p>
              )}

              {modalType === 'contact' && (
                <p>
                  Feedback & Feature Inquiries: To suggest new tools or report issues, email us at <strong>support@freetoolsnosignup.com</strong>.
                </p>
              )}

              {modalType === 'adsTxt' && (
                <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-xs select-all">
                  google.com, pub-7633599830090000, DIRECT, f08c47fec0942fa0
                </div>
              )}

              {modalType === 'sitemap' && (
                <div className="space-y-1">
                  <p><strong>Primary Index:</strong> / (495 Working Tools)</p>
                  <p><strong>Category Hubs:</strong> /job-ats, /ai-study, /dev-pro, /pdf, /image, /calculators</p>
                  <p><strong>Status:</strong> All 495 tools active & indexed</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
