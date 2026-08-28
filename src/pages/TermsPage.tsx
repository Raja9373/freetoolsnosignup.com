import React, { useEffect } from 'react';
import { Scale, FileText, ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { BrandLogo } from '../components/BrandLogo';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';

export const TermsPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  useEffect(() => {
    document.title = 'Terms of Service | FreeToolsNoSignup.com - Fair Usage & Terms';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
              <Scale className="w-3.5 h-3.5" />
              Standard Terms
            </span>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-slate-800">Home</a>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Terms of Service</span>
        </nav>

        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-3">
              <Scale className="w-3.5 h-3.5 text-purple-600" />
              TERMS OF USE & SERVICE AGREEMENT
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Last Revised: August 2026 • Governs all tools on https://www.freetoolsnosignup.com
            </p>
          </header>

          {/* Section 1: Agreement to Terms */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              By accessing, browsing, or utilizing any of the {TOTAL_TOOLS_COUNT} online tools and services available on FreeToolsNoSignup.com (the "Site", "Service", or "Platform"), you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Section 2: Use License & Fair Usage */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Permitted Use License & Fair Usage Policy</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Permission is granted to freely use all tools on FreeToolsNoSignup.com for personal, educational, academic, or commercial purposes. Because our tools execute 100% inside your client-side browser (utilizing WebAssembly, HTML5 Canvas, and client-side JavaScript), there are no artificial daily limits, quotas, or paywalls imposed on normal usage.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Under this license, you may NOT:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
              <li>Attempt to decompile or reverse-engineer proprietary delivery scripts or bypass security mechanisms.</li>
              <li>Use automated scrapers, headless bots, or high-concurrency denial-of-service scripts that overburden our hosting content delivery network (CDN).</li>
              <li>Embed or frame the site within another domain while stripping advertisements or claiming copyright ownership of the user interface.</li>
              <li>Utilize synthetic card or fake data generators for unlawful fraud, identity theft, or unauthorized account creation on third-party platforms.</li>
            </ul>
          </section>

          {/* Section 3: Client-Side Processing Warranty */}
          <section className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              3. Client-Side Data & Document Privacy Guarantee
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We warrant that all operations performed by our flagship tools (including PDF merging, photo compression, ATS resume keyword scanning, regex parsing, and cryptographic hashing) occur exclusively within the volatile memory (RAM) of your client device. No document files, resume text, financial details, or generated images are transferred to, stored on, or retained by our servers.
            </p>
          </section>

          {/* Section 4: Mathematical, Career, & Financial Disclaimers */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              4. Calculation & Tool Output Disclaimers
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The calculations, scores, heuristics, and generated outputs provided by our tools are for informational, organizational, and educational purposes only:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
              <li><strong>Financial Calculators (EMI, SIP, VAT):</strong> Results are estimates based on user-supplied variables and standard compound formulas. They do not constitute certified financial, tax, or mortgage advice. Consult a certified financial planner or banking institution for actual terms.</li>
              <li><strong>ATS Resume Score Checker:</strong> ATS scores and feedback are algorithmic heuristic estimations based on common recruitment keywords. They do not guarantee job interviews or hiring outcomes.</li>
              <li><strong>AI Detector & Humanizer:</strong> Text perplexity and burstiness metrics are probabilistic indicators and should not be used as definitive proof in academic integrity disputes.</li>
              <li><strong>Synthetic Test Data:</strong> Generated credit card numbers (valid via the Luhn formula) and fake identities are strictly for developer software testing and mock data pipelines. They possess no monetary value and cannot be used for real transactions.</li>
            </ul>
          </section>

          {/* Section 5: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              In no event shall FreeToolsNoSignup.com, its founder Alok Mohan Sharma, or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit, business interruption, or system errors) arising out of the use or inability to use the tools on this website, even if notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* Section 6: Advertisements & External Links */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Third-Party Advertisements</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The Platform displays third-party advertisements served by networks such as Google AdSense. We do not endorse, guarantee, or assume responsibility for products, services, or claims advertised in these banners. Clicking on an advertisement will direct you to a third-party website governed by its own independent terms and privacy policy.
            </p>
          </section>

          {/* Section 7: Modifications to Terms */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900">7. Modifications and Governing Law</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              FreeToolsNoSignup.com may revise these Terms of Service at any time without prior notice. By continuing to use the site, you agree to be bound by the current version of these Terms of Service.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              For questions regarding these Terms, contact: legal@freetoolsnosignup.com
            </p>
          </section>
        </article>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>
    </div>
  );
};
