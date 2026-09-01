import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShieldCheck, Zap, Sparkles, ChevronDown, ChevronUp, 
  CheckCircle2, ArrowRight, ExternalLink, Laptop, Lock, Clock, FileText, Layers, Play
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { AdUnitTopBanner, AdUnitInFeed } from '../components/AdUnits';
import { Footer } from '../components/Footer';
import { getToolSEOData, ToolSEOData } from '../data/toolSEOContent';
import { ALL_78_DIRECTORY_TOOLS } from '../data/allToolsDirectory';

// Interactive Tool Engines for Top UI
import { PDFToolsModal } from '../components/tools/PDFToolsModal';
import { ImageToolsModal } from '../components/tools/ImageToolsModal';
import { CalculatorModal } from '../components/tools/CalculatorModal';
import { ATSToolsSuite } from '../components/tools/ATSToolsSuite';
import { AIStudySuite } from '../components/tools/AIStudySuite';
import { DevToolsSuite } from '../components/tools/DevToolsSuite';
import { NotionTemplateBuilder } from '../components/tools/NotionTemplateBuilder';

interface ToolPageProps {
  toolSlug: string;
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
  onOpenToolModal?: (toolId: string) => void;
}

export const ToolPage: React.FC<ToolPageProps> = ({
  toolSlug,
  onNavigateHome,
  onNavigateTo,
  onOpenToolModal
}) => {
  // Find tool in directory metadata if available
  const directoryTool = ALL_78_DIRECTORY_TOOLS.find(t => t.slug === toolSlug || t.id === toolSlug);
  const seoData: ToolSEOData = getToolSEOData(toolSlug, directoryTool);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isInteractiveModalOpen, setIsInteractiveModalOpen] = useState(false);

  // Set document title, meta tags, and FAQ Schema JSON-LD
  useEffect(() => {
    document.title = seoData.title;
    window.scrollTo(0, 0);

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoData.description);

    // Invalidate / Inject Structured Data JSON-LD for FAQ Schema
    const scriptId = 'ftns-tool-faq-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': seoData.name,
          'url': `https://www.freetoolsnosignup.com/tools/${seoData.slug}`,
          'description': seoData.description,
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'Any',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          'mainEntity': seoData.faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        }
      ]
    };

    scriptTag.text = JSON.stringify(schemaData);

    return () => {
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [seoData]);

  // Get related tools in same category
  const relatedTools = ALL_78_DIRECTORY_TOOLS
    .filter(t => t.category === seoData.category && t.slug !== seoData.slug && !t.id.includes('-engine-') && !t.id.includes('job-career-tool-') && !t.id.includes('study-academic-tool-') && !t.id.includes('dev-coder-tool-'))
    .slice(0, 6);

  const getCategoryPath = (cat: string) => {
    switch (cat) {
      case 'pdf': return '/pdf-tools';
      case 'image': return '/image-tools';
      case 'calculator': return '/calculators';
      case 'job-ats': return '/job-ats';
      case 'ai-study': return '/ai-study';
      case 'dev-pro': return '/dev-tools';
      case 'notion': return '/notion-template-builder';
      default: return '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTo(getCategoryPath(seoData.category))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] hover:text-[#126BFF] text-[#0B1F3A] font-bold text-xs border border-[#E2E8F0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{seoData.categoryName}</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% In-Browser Privacy
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] text-xs font-bold">
              {seoData.categoryName}
            </span>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); onNavigateHome(); }} 
            className="hover:text-[#126BFF] transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <a 
            href={getCategoryPath(seoData.category)} 
            onClick={(e) => { e.preventDefault(); onNavigateTo(getCategoryPath(seoData.category)); }} 
            className="hover:text-[#126BFF] transition-colors"
          >
            {seoData.categoryName}
          </a>
          <span>/</span>
          <span className="text-[#0B1F3A] font-bold truncate max-w-xs">{seoData.name}</span>
        </nav>

        {/* TOP TOOL HERO & INTERACTIVE WORKSPACE */}
        <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight">
                  {seoData.h1}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF]">
                  Free & Unlimited
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                  No Signup Required
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#475569] max-w-3xl leading-relaxed">
                {seoData.description}
              </p>
            </div>

            <button
              onClick={() => {
                if (onOpenToolModal) {
                  onOpenToolModal(seoData.id);
                } else {
                  setIsInteractiveModalOpen(true);
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#126BFF] hover:bg-[#0055E6] text-white font-black text-sm shadow-md hover:shadow-lg transition-all shrink-0 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch {seoData.name}</span>
            </button>
          </div>

          {/* Interactive Workspace Feature Box */}
          <div className="bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] rounded-2xl p-6 sm:p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] flex items-center justify-center shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="max-w-md space-y-1">
              <h2 className="text-lg font-black text-[#0B1F3A]">
                Ready to use {seoData.name}?
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Fast, 100% private in-browser tool execution. No data leaves your machine.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (onOpenToolModal) {
                    onOpenToolModal(seoData.id);
                  } else {
                    setIsInteractiveModalOpen(true);
                  }
                }}
                className="px-8 py-3.5 rounded-xl bg-[#126BFF] hover:bg-[#0055E6] text-white font-black text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Open Full Interactive Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#64748B] pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                Zero Cloud Uploads
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FF7A00]" />
                Instant RAM Processing
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#126BFF]" />
                No Account Needed
              </span>
            </div>
          </div>
        </section>

        {/* In-Feed Ad Unit */}
        <AdUnitInFeed />

        {/* 400+ WORDS COMPREHENSIVE SEO CONTENT GUIDE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (2 Columns on Large Screens) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Section 1: What is this Tool */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight flex items-center gap-2.5">
                <FileText className="w-6 h-6 text-[#126BFF]" />
                <span>What is Free {seoData.name}?</span>
              </h2>
              {seoData.whatIs.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Section 2: How to Use (3 Steps) */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight flex items-center gap-2.5">
                <Clock className="w-6 h-6 text-[#FF7A00]" />
                <span>How to Use {seoData.name} in 3 Simple Steps</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {seoData.howToUse.map((step) => (
                  <div key={step.step} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-xl bg-[#EBF3FF] text-[#126BFF] font-black text-sm flex items-center justify-center border border-[#C8DDFF]">
                        {step.step}
                      </div>
                      <h3 className="text-sm font-black text-[#0B1F3A]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Section 3: Key Features & Advantages */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-[#059669]" />
                <span>Key Features & Advantages</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {seoData.features.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                      <h3 className="text-sm font-black text-[#0B1F3A]">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed pl-6">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Section 4: Frequently Asked Questions (FAQs) */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
                  Frequently Asked Questions (FAQs)
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Answers to common questions about privacy, usage, compatibility, and file support.
                </p>
              </div>

              <div className="space-y-3">
                {seoData.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-colors bg-[#F8FAFC]"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0B1F3A] hover:text-[#126BFF] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#126BFF] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3 bg-white">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>

          </div>

          {/* Sidebar / Related Category Tools (1 Column) */}
          <div className="space-y-6">
            
            {/* Quick Action Card */}
            <div className="bg-gradient-to-br from-[#126BFF] to-[#0055E6] rounded-3xl p-6 text-white space-y-4 shadow-md">
              <div className="space-y-1">
                <span className="text-2xl">⚡</span>
                <h3 className="text-lg font-black tracking-tight">
                  100% Free & Unlimited
                </h3>
                <p className="text-xs text-[#EBF3FF] leading-relaxed">
                  Never pay for basic file manipulation or calculators. FreeToolsNoSignup.com is always free.
                </p>
              </div>

              <button
                onClick={() => {
                  if (onOpenToolModal) {
                    onOpenToolModal(seoData.id);
                  } else {
                    setIsInteractiveModalOpen(true);
                  }
                }}
                className="w-full py-3 rounded-xl bg-white text-[#126BFF] hover:bg-[#F4F7FC] font-black text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Tool Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Related Tools in Category */}
            {relatedTools.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-wider flex items-center justify-between">
                  <span>Related {seoData.categoryName}</span>
                  <a
                    href={getCategoryPath(seoData.category)}
                    onClick={(e) => { e.preventDefault(); onNavigateTo(getCategoryPath(seoData.category)); }}
                    className="text-xs text-[#126BFF] font-bold hover:underline normal-case"
                  >
                    View All
                  </a>
                </h3>

                <div className="space-y-2.5">
                  {relatedTools.map((relTool) => (
                    <a
                      key={relTool.id}
                      href={`/tools/${relTool.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateTo(`/tools/${relTool.slug}`);
                      }}
                      className="block p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#EBF3FF] border border-[#E2E8F0] hover:border-[#C8DDFF] transition-all group"
                    >
                      <div className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#126BFF] flex items-center justify-between">
                        <span>{relTool.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#126BFF] transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                        {relTool.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Trust & Guarantee Box */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
                Why FreeToolsNoSignup?
              </h3>
              <ul className="space-y-2.5 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>No login, signups, or email capture</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>No watermarks stamped on your exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>100% private in-browser RAM execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Unlimited usage with zero daily caps</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 py-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Global Footer */}
      <Footer onNavigate={(path) => onNavigateTo(path)} />

      {/* DIRECT MODAL LAUNCHER FALLBACK */}
      {isInteractiveModalOpen && (
        <>
          {seoData.category === 'pdf' && (
            <PDFToolsModal
              initialToolId={seoData.id}
              onClose={() => setIsInteractiveModalOpen(false)}
              onRecordUse={() => {}}
            />
          )}

          {seoData.category === 'image' && (
            <ImageToolsModal
              initialToolId={seoData.id}
              onClose={() => setIsInteractiveModalOpen(false)}
              onRecordUse={() => {}}
            />
          )}

          {seoData.category === 'calculator' && (
            <CalculatorModal
              initialToolId={seoData.id}
              onClose={() => setIsInteractiveModalOpen(false)}
              onRecordUse={() => {}}
            />
          )}

          {seoData.category === 'job-ats' && (
            <ATSToolsSuite
              initialToolId={seoData.id}
              onClose={() => setIsInteractiveModalOpen(false)}
              onRecordUse={() => {}}
            />
          )}

          {seoData.category === 'ai-study' && (
            <AIStudySuite
              initialToolId={seoData.id}
              onClose={() => setIsInteractiveModalOpen(false)}
              onRecordUse={() => {}}
            />
          )}

          {seoData.category === 'dev-pro' && (
            <DevToolsSuite
              initialToolId={seoData.id}
              onClose={() => setIsInteractiveModalOpen(false)}
              onRecordUse={() => {}}
            />
          )}

          {seoData.category === 'notion' && (
            <NotionTemplateBuilder
              initialPresetId={seoData.id}
              onClose={() => setIsInteractiveModalOpen(false)}
              onRecordUse={() => {}}
            />
          )}
        </>
      )}
    </div>
  );
};
