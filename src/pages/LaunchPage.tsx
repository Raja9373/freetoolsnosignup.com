import React, { useState } from 'react';
import { 
  ArrowLeft, Rocket, Sparkles, ShieldCheck, Zap, 
  Check, Copy, Heart, Bell, ExternalLink, ArrowRight, Award, Flame 
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';

interface LaunchPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const LaunchPage: React.FC<LaunchPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  const tagline = `${TOTAL_TOOLS_COUNT} Free Tools That Actually Work - No Signup, No BS`;
  const description = `Access ${TOTAL_TOOLS_COUNT} free browser utilities including PDF merging, image compression, developer data tools, and Notion database builders. 100% client-side memory execution, zero watermarks, and zero paywalls.`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const handleCopyPitch = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${tagline}\n\n${description}\n\nLive at: https://www.freetoolsnosignup.com/`);
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] hover:text-[#126BFF] text-[#0B1F3A] font-bold text-xs border border-[#E2E8F0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.producthunt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#DA552F] hover:bg-[#C24422] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Flame className="w-4 h-4" />
              <span>Product Hunt Launch</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        
        {/* Launch Hero */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-12 shadow-xs text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF5F2] text-[#DA552F] border border-[#FED7AA] text-xs font-black uppercase tracking-wider">
            <Rocket className="w-4 h-4" />
            <span>Official Product Hunt Launch Kit</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <h1 className="font-serif-royal text-3xl sm:text-5xl font-bold text-[#0A1931] tracking-tight leading-tight">
              {tagline}
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Email Capture for Launch Day Reminder */}
          <div className="max-w-md mx-auto pt-2">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#059669]" />
                <span>You're on the VIP Launch List! We'll notify you on Product Hunt day.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for launch day notification..."
                  className="flex-1 px-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs focus:outline-none focus:border-[#DA552F]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#DA552F] hover:bg-[#C24422] text-white font-black text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#94A3B8] mt-2">Zero spam. One email on launch day only.</p>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 text-xs font-bold text-[#475569]">
            <span className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#059669]" /> No Signup / No Login
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#126BFF]" /> 100% In-Browser Privacy
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#D97706]" /> No Watermarks Ever
            </span>
          </div>
        </div>

        {/* 5 High-Definition Screenshot & Feature Previews */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF7A00]" />
              <span>Launch Assets &amp; Product Screenshots</span>
            </h2>
            <button
              onClick={handleCopyPitch}
              className="text-xs text-[#126BFF] hover:underline font-bold flex items-center gap-1"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPitch ? 'Copied Press Kit!' : 'Copy Press Kit'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Asset 1: Notion Template & Database Builder (Dabba #7) */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#0A1931] to-[#16386D] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C5A059] text-[#0A1931]">
                    Dabba #7 Flagship
                  </span>
                  <Award className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Notion Database Builder</h4>
                  <p className="text-[11px] text-slate-300">18 Custom Columns, CSV/JSON Exports</p>
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#0B1F3A]">Royal Notion Database Builder</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Visual interactive schema designer with 25 ready-made templates, live preview, and 1-click export.
              </p>
            </div>

            {/* Asset 2: PDF Pro Suite */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#991B1B] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-white">
                    Zero Cloud Uploads
                  </span>
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">PDF Tools Suite</h4>
                  <p className="text-[11px] text-red-100">Merge, Split, Lossless Compress &amp; Rotate</p>
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#0B1F3A]">In-Browser PDF Processing</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Full WebAssembly PDF manipulation. Sensitive contracts and financial reports remain 100% in RAM.
              </p>
            </div>

            {/* Asset 3: ATS Resume Checker & Job Suite */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#126BFF] to-[#0047BA] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-white">
                    50 ATS Tools
                  </span>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">ATS Resume Scorer</h4>
                  <p className="text-[11px] text-blue-100">Real-time keyword diagnostics &amp; tips</p>
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#0B1F3A]">ATS Job &amp; Career Diagnostic</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Compare your resume against any job description with zero signup and instant keyword analysis.
              </p>
            </div>

            {/* Asset 4: Image Studio & Compressor */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#059669] to-[#065F46] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-white">
                    Lossless WebP/PNG
                  </span>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Image Tools Studio</h4>
                  <p className="text-[11px] text-emerald-100">Resize, Compress, Strip EXIF &amp; Convert</p>
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#0B1F3A]">High-Speed Image Studio</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Compress multi-megabyte photos up to 80% without quality degradation, directly inside your browser.
              </p>
            </div>

            {/* Asset 5: All 2753 Tools Directory */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#B45309] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-white">
                    Complete Catalog
                  </span>
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">{TOTAL_TOOLS_COUNT} Working Utilities</h4>
                  <p className="text-xs text-amber-100">Calculators, Dev Pro Tools, AI Study Suite &amp; More</p>
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#0B1F3A]">Full {TOTAL_TOOLS_COUNT} Working Tools Catalog</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                From mortgage amortization calculators and synthetic QA data generators to APA citation builders, every utility is 100% free forever.
              </p>
            </div>

          </div>
        </div>

        {/* Backlinks & Embed Bar CTA */}
        <div className="bg-[#0A1931] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Writing a Product Hunt Post or Tech Review?</h3>
            <p className="text-xs text-slate-300">
              Embed any of our tools directly on your blog or newsletter using our white-label iframe snippets.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTo('/backlinks')}
              className="px-4 py-2.5 rounded-xl bg-[#126BFF] hover:bg-[#0055E6] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Get Embed Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};
