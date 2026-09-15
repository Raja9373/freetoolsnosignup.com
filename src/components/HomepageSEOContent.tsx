import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronUp, ShieldCheck, Zap, Lock, Cpu, 
  CheckCircle2, Sparkles, ArrowRight, Share2, Copy, Check 
} from 'lucide-react';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';

interface HomepageSEOContentProps {
  onNavigateTo?: (path: string) => void;
}

interface FAQItem {
  q: string;
  a: string;
}

const HOMEPAGE_FAQS: FAQItem[] = [
  {
    q: "Is FreeToolsNoSignup really 100% free with no hidden charges or subscriptions?",
    a: "Yes. Every single one of our 3253 tools is completely free to use forever. There are zero subscription tiers, zero trial expiration clocks, no premium paywalls, and no credit card requirements. What you see is 100% functional immediately."
  },
  {
    q: "Why is no signup, account registration, or login required?",
    a: "We believe essential internet utilities should operate like standard desktop software or physical calculators: friction-free, instantaneous, and private. Requiring emails and passwords creates needless barriers, invites promotional spam, and exposes user credentials to remote database breaches. We designed our architecture so you can do your work without surrendering personal identifiers."
  },
  {
    q: "Is my data and sensitive files kept private and secure?",
    a: "Absolutely. FreeToolsNoSignup operates on a strict zero-knowledge in-browser architecture. When you convert PDFs, resize high-resolution images, format confidential code, or calculate financial metrics, the processing occurs locally inside your web browser's memory (RAM) via WebAssembly and HTML5 APIs. Your files never touch our servers or traverse third-party cloud infrastructure."
  },
  {
    q: "How are all 3253 tools supported without charging users?",
    a: "FreeToolsNoSignup is supported by non-intrusive standard web advertising (via Google AdSense) and voluntary community backlinks. Because our entire tool suite runs on client-side compute, our server hosting costs are a tiny fraction of conventional SaaS companies, enabling us to keep all 3253 tools free indefinitely."
  },
  {
    q: "Can I use these 3253 free tools offline or in airplane mode?",
    a: "Yes! Because the core logic, WebAssembly binaries, and JavaScript libraries execute directly on your local device, once you have loaded a tool's page, you can disconnect from Wi-Fi or turn on airplane mode and continue merging PDFs, resizing images, and calculating numbers without an active internet connection."
  },
  {
    q: "Are there any file size limits, hourly rate limits, or daily quotas?",
    a: "We do not impose artificial cloud quotas or rate limiting. The only practical limit is your own device's hardware memory (RAM). Modern laptops, desktops, and smartphones can comfortably process hundreds of megabytes of PDF and media files in seconds."
  },
  {
    q: "Do your free tools stamp watermarks or branding on my files?",
    a: "Never. We believe your work belongs entirely to you. All generated documents, merged PDFs, compressed images, and exported templates are 100% clean, pristine, and watermark-free, making them suitable for client deliverables, academic research, and professional business presentations."
  },
  {
    q: "Are these tools compatible with smartphones, tablets, and desktops?",
    a: "Yes. All 3253 tools are built on a responsive mobile-first architecture. They run seamlessly on Apple iOS Safari, iPadOS, Android Chrome, macOS Safari, Windows Edge, and Linux Firefox without needing any mobile app installations or browser extensions."
  },
  {
    q: "How is FreeToolsNoSignup different from typical SaaS online tools?",
    a: "Traditional SaaS utility websites (such as Adobe Acrobat Online, Smallpdf, or ILovePDF) force file uploads to remote servers, restrict you to 1-2 free operations per day, make you wait in artificial queues, and gate batch operations behind costly monthly subscriptions. FreeToolsNoSignup eliminates the server middleman entirely: infinite operations, zero waiting, and total privacy."
  },
  {
    q: "Can I embed these free tools on my own website, blog, or Notion workspace?",
    a: "Yes! We provide white-label responsive iframe embed codes and direct anchor backlinks for every tool in our collection. You can easily embed our calculators, PDF utilities, or Notion templates on your personal blog, company documentation, or university portal completely free."
  }
];

export const HomepageSEOContent: React.FC<HomepageSEOContentProps> = ({ onNavigateTo }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Inject FAQPage Schema into document.head
  useEffect(() => {
    const scriptId = 'ftns-homepage-faq-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': HOMEPAGE_FAQS.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    };

    scriptTag.text = JSON.stringify(faqSchema);

    return () => {
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, []);

  const handleCopyShare = () => {
    const shareText = `Check out FreeToolsNoSignup.com - 3253 free tools no signup, 100% private in browser with zero watermarks! https://www.freetoolsnosignup.com/`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section className="space-y-12 pt-8 pb-4 border-t border-[#E2E8F0]">
      
      {/* 1000-WORD COMPREHENSIVE SEO ARTICLE */}
      <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-8 text-[#0B1F3A]">
        
        {/* Header Badge & Title */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              Architectural Manifest
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Client-Side Privacy
            </span>
          </div>

          <h2 className="font-serif-royal text-2xl sm:text-4xl font-bold text-[#0A1931] tracking-tight leading-tight">
            Why {TOTAL_TOOLS_COUNT} Free Tools No Signup is the Future of Private Browser Computing
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-4xl">
            In an era dominated by predatory subscription software and persistent surveillance capitalism, finding reliable <strong>free tools no signup</strong> has become nearly impossible. Most websites advertising "free online converters" or "instant calculators" conceal hidden subscription traps, artificial daily limits, and intrusive email capture forms. FreeToolsNoSignup.com changes this paradigm with a verified ecosystem of {TOTAL_TOOLS_COUNT} browser-native utilities built for creators, engineers, job seekers, and students worldwide.
          </p>
        </div>

        {/* Core Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] text-[#126BFF] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0B1F3A]">
              1. Zero Cloud Uploads &amp; Complete RAM Privacy
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              When using conventional web tools, your sensitive contracts, tax files, and medical reports are uploaded to remote servers. FreeToolsNoSignup utilizes modern <strong>private browser tools</strong> compiled to WebAssembly (Wasm) and HTML5 memory streams. Your data never leaves your computer, ensuring compliance with strict privacy standards.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0B1F3A]">
              2. Frictionless Free Online Tools No Login
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Why should you remember another password or verify an email link just to split a three-page PDF or compute compound interest? Our comprehensive suite of <strong>free online tools no login</strong> allows you to jump straight into the workspace, accomplish your task in seconds, and download clean results without delay.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0B1F3A]">
              3. Uncapped Hardware-Accelerated Speed
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Bypassing server upload queues means our tools run up to 10x faster than traditional SaaS websites. Whether you are running the Notion Database Builder, analyzing ATS resume keywords, or calculating multi-year amortization schedules, computations happen instantaneously using your device's native CPU cores.
            </p>
          </div>
        </div>

        {/* Detailed 500-word Narrative Section */}
        <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-6">
          <h3 className="text-lg sm:text-xl font-black text-[#0B1F3A]">
            The Technical Architecture Behind {TOTAL_TOOLS_COUNT} Free Browser Utilities
          </h3>
          <p>
            Historically, heavy utility operations such as merging high-resolution PDFs, compressing multi-megabyte images, and tokenizing complex codebases required powerful server clusters. Today, modern client browsers are full-fledged computing runtimes. By compiling native C/C++ and Rust libraries into WebAssembly, FreeToolsNoSignup brings enterprise-grade processing directly into your browser tab.
          </p>
          <p>
            Across our 7 core divisions—including PDF Tools, Image Utilities, Financial &amp; Scientific Calculators, ATS Resume Analyzers, AI Study Helpers, Developer Pro suites, and the Notion Database Builder—every application is engineered to execute locally. There are no background server queues, no throttling after two downloads, and no watermarks defacing your output. You retain complete ownership of your time, data, and intellectual property.
          </p>
          <p>
            Whether you are a developer seeking dummy JSON fixtures, a freelancer drafting invoices, an applicant preparing ATS-optimized resumes, or an educator needing clean student templates, our platform delivers an unrestricted workspace designed for modern digital efficiency.
          </p>
        </div>

        {/* Comparison Table: FreeToolsNoSignup vs Traditional Subscription SaaS */}
        <div className="space-y-3 border-t border-[#E2E8F0] pt-6">
          <h3 className="text-base sm:text-lg font-black text-[#0B1F3A]">
            Direct Comparison: FreeToolsNoSignup vs Traditional SaaS Websites
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <thead className="bg-[#0A1931] text-white font-bold">
                <tr>
                  <th className="p-3.5">Feature / Metric</th>
                  <th className="p-3.5 bg-[#126BFF] text-white font-extrabold">FreeToolsNoSignup ({TOTAL_TOOLS_COUNT} Tools)</th>
                  <th className="p-3.5">Typical Commercial SaaS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] bg-white">
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold text-[#0B1F3A]">Account Requirement</td>
                  <td className="p-3 text-[#059669] font-bold bg-[#ECFDF5]">Zero Signup, No Login Ever</td>
                  <td className="p-3 text-[#DC2626]">Mandatory Email / Google Sign-In</td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold text-[#0B1F3A]">File Storage &amp; Privacy</td>
                  <td className="p-3 text-[#059669] font-bold bg-[#ECFDF5]">100% In-Browser Memory (RAM)</td>
                  <td className="p-3 text-[#DC2626]">Uploaded &amp; Cached on Remote Servers</td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold text-[#0B1F3A]">Daily Usage Caps</td>
                  <td className="p-3 text-[#059669] font-bold bg-[#ECFDF5]">Unlimited / Zero Limits</td>
                  <td className="p-3 text-[#DC2626]">1 to 3 tasks per day, then paywall</td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold text-[#0B1F3A]">Export Watermarks</td>
                  <td className="p-3 text-[#059669] font-bold bg-[#ECFDF5]">Zero Watermarks Always</td>
                  <td className="p-3 text-[#DC2626]">Branded watermarks on free tier</td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold text-[#0B1F3A]">Offline Capability</td>
                  <td className="p-3 text-[#059669] font-bold bg-[#ECFDF5]">Works Offline Once Cached</td>
                  <td className="p-3 text-[#DC2626]">Fails completely without internet</td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold text-[#0B1F3A]">Embeddable Backlink API</td>
                  <td className="p-3 text-[#059669] font-bold bg-[#ECFDF5]">Free Iframe Embeds Available</td>
                  <td className="p-3 text-[#DC2626]">Enterprise API ($99+/mo)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Backlink & Community Sharing Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#F0FDF4] to-[#EBF3FF] border border-[#A7F3D0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-[#0B1F3A] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#059669]" />
              <span>Share FreeToolsNoSignup with Your Community</span>
            </h4>
            <p className="text-xs text-[#475569]">
              Help colleagues, students, and teammates save hundreds of dollars each year on SaaS subscriptions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyShare}
              className="px-4 py-2.5 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Share Link'}</span>
            </button>
            {onNavigateTo && (
              <button
                onClick={() => onNavigateTo('/backlinks')}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#126BFF] text-[#0B1F3A] font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Embed Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </article>

      {/* 10 FREQUENTLY ASKED QUESTIONS (FAQS) SECTION */}
      <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] text-xs font-bold uppercase tracking-wider">
              Knowledge Base
            </span>
            <span className="text-xs text-[#64748B] font-medium">10 Detailed Answers</span>
          </div>
          <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#0A1931] tracking-tight">
            Frequently Asked Questions About {TOTAL_TOOLS_COUNT} Free Tools
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Everything you need to know about our privacy-first client-side architecture, unlimited usage, and offline capabilities.
          </p>
        </div>

        <div className="space-y-3 divide-y divide-[#F1F5F9]">
          {HOMEPAGE_FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="pt-3 first:pt-0">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full py-3 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0B1F3A] hover:text-[#126BFF] transition-colors"
                >
                  <span className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-[#126BFF] bg-[#EBF3FF] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                      Q{index + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#126BFF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#94A3B8] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="pb-4 pl-9 text-xs sm:text-sm text-[#475569] leading-relaxed animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </section>
  );
};
