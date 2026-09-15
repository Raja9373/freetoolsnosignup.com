import React, { useEffect } from 'react';
import { ShieldCheck, Cpu, ArrowLeft, Heart, Zap, Globe, Sparkles, CheckCircle2, Lock, FileText, Code2, Users } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { BrandLogo } from '../components/BrandLogo';
import { 
  TOTAL_TOOLS_COUNT, 
  PDF_TOOLS_COUNT, 
  IMAGE_TOOLS_COUNT, 
  CALCULATOR_TOOLS_COUNT, 
  JOB_ATS_TOOLS_COUNT, 
  AI_STUDY_TOOLS_COUNT, 
  DEV_PRO_TOOLS_COUNT, 
  NOTION_TOOLS_COUNT 
} from '../data/toolCounts';

export const AboutPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  useEffect(() => {
    document.title = 'About Us | FreeToolsNoSignup.com - The Zero-Friction Utility Platform';
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
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Client-Side Private
            </span>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner Slot */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-slate-800">Home</a>
          <span>/</span>
          <span className="text-slate-900 font-semibold">About Us</span>
        </nav>

        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              OUR MISSION & ARCHITECTURAL PHILOSOPHY
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About FreeToolsNoSignup.com
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Published by Alok Mohan Sharma • Chief Architect & Founder • Last Updated: August 2026
            </p>
          </header>

          {/* Section: The Founder Story */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              The Genesis: Why We Built FreeToolsNoSignup
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              In an era where every basic online utility demands a mandatory account creation, credit card entry, email verification, or hidden credit subscription, the simple act of performing day-to-day digital tasks became frustratingly burdensome. In 2024, software architect Alok Mohan Sharma recognized that everyday users—students, job seekers, small business owners, software engineers, and remote workers—were spending more time navigating password resets, paywalls, and spam emails than actually getting their tasks done.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              FreeToolsNoSignup.com was established with a singular, non-negotiable manifesto: <strong>Zero Barriers, Zero Subscriptions, and Absolute Zero Data Retention</strong>. We believe standard utility software—such as merging PDF documents, calculating mortgage interest, formatting JSON data structures, or compressing photos—is fundamental digital infrastructure that should be instantly accessible to every human on Earth with zero friction.
            </p>
          </section>

          {/* Section: 100% Client-Side Architecture */}
          <section className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" />
              Revolutionary Zero-Server Client-Side Computing
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Traditional web utilities upload your confidential documents, salary figures, resumes, and private photos to third-party remote cloud servers, storing them in foreign databases where they are vulnerable to data breaches, scraping, or unauthorized tracking.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              FreeToolsNoSignup fundamentally disrupts this insecure model through modern <strong>WebAssembly (WASM), native HTML5 Canvas pipelines, Web Cryptography APIs, and local JavaScript engines (such as pdf-lib)</strong>. When you merge multiple PDF files, compress 50MB photography, test regular expressions, or calculate financial debt payoffs:
            </p>
            <ul className="space-y-2.5 text-slate-700 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero Remote Uploads:</strong> Binary file manipulation happens entirely within your computer or smartphone's volatile RAM memory.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero Database Storage:</strong> No backend server ever sees, logs, saves, or processes your personal documents or numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Instant Offline Speed:</strong> Because no file upload bandwidth is consumed over the internet, tasks complete in milliseconds rather than minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>No Account Needed:</strong> No logins, no cookies for tracking identities, and zero telemetry on your inputs.</span>
              </li>
            </ul>
          </section>

          {/* Section: The 2753 Working Tools Vision */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              The {TOTAL_TOOLS_COUNT}-Tool Unified Ecosystem
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Instead of forcing users to bookmark dozens of ad-cluttered single-purpose websites, FreeToolsNoSignup has organized {TOTAL_TOOLS_COUNT} specialized utility modules into 7 core functional clusters:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <h3 className="font-bold text-blue-950 text-sm">1. PDF Utilities ({PDF_TOOLS_COUNT} Tools)</h3>
                <p className="text-xs text-blue-800/80 mt-1">High-performance document merging, page extraction, watermarking, password encryption, and formatting using memory-safe WASM streams.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <h3 className="font-bold text-emerald-950 text-sm">2. Image & Media Studio ({IMAGE_TOOLS_COUNT} Tools)</h3>
                <p className="text-xs text-emerald-800/80 mt-1">Client-side lossless WebP/JPEG compression, background segmentation, bulk resizing, color palette extraction, and SVG minifiers.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100">
                <h3 className="font-bold text-purple-950 text-sm">3. Financial & Math Calculators ({CALCULATOR_TOOLS_COUNT} Tools)</h3>
                <p className="text-xs text-purple-800/80 mt-1">Banking standard loan EMI formulas, SIP compound wealth growth charts, WHO BMI tables, VAT/GST calculators, and mortgage models.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <h3 className="font-bold text-amber-950 text-sm">4. Career & ATS Resume Suite ({JOB_ATS_TOOLS_COUNT} Tools)</h3>
                <p className="text-xs text-amber-800/80 mt-1">Algorithmic applicant tracking system (ATS) match scoring, action-verb density scorers, and interview readiness coaches.</p>
              </div>
              <div className="p-4 rounded-xl bg-yellow-50/60 border border-yellow-100">
                <h3 className="font-bold text-yellow-950 text-sm">5. AI Study & Research Suite ({AI_STUDY_TOOLS_COUNT} Tools)</h3>
                <p className="text-xs text-yellow-800/80 mt-1">Sentence burstiness and perplexity heuristic scanners, academic paraphrasing engines, and APA/MLA citation constructors.</p>
              </div>
              <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-100">
                <h3 className="font-bold text-cyan-950 text-sm">6. Dev Pro & Engineering Tools ({DEV_PRO_TOOLS_COUNT} Tools)</h3>
                <p className="text-xs text-cyan-800/80 mt-1">Deterministic Luhn algorithm mock data generators, JSON AST formatters, regex analyzers, QR studio, and crypto hashers.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 sm:col-span-2 text-white">
                <h3 className="font-bold text-amber-400 text-sm">7. Notion Templates & Custom Builder ({NOTION_TOOLS_COUNT} Tools)</h3>
                <p className="text-xs text-slate-300 mt-1">Custom database builder with 18 property types, table/kanban/JSON views, instant sample rows, CSV export, and 25 instant readymade productivity templates.</p>
              </div>
            </div>
          </section>

          {/* Section: Ethical Monetization & Sustainability */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Transparent, Ethical Monetization
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              How do we keep {TOTAL_TOOLS_COUNT} tools 100% free without charging users or selling confidential information? We partner with verified digital advertising networks, including Google AdSense, to display non-intrusive, privacy-compliant banner placements. These small contextual advertisements directly sponsor the continuous high-speed global CDN delivery and engineering maintenance of our suite.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              We uphold strict advertising standards: zero pop-unders, zero deceptive download links, zero auto-playing audio ads, and zero malware. Every banner is clearly designated with an official <strong>ADVERTISEMENT</strong> label in strict compliance with Google Publisher Policies.
            </p>
          </section>

          {/* Section: Contact & Technical Inquiries */}
          <section className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Have a tool suggestion or engineering feedback?</h3>
              <p className="text-slate-500 text-xs mt-0.5">Our developer team reviews community feature requests weekly.</p>
            </div>
            <a
              href="mailto:hello@freetoolsnosignup.com"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Contact Developer Team
            </a>
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
