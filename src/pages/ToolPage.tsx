import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, ShieldCheck, Zap, Sparkles, ChevronDown, ChevronUp, 
  CheckCircle2, ArrowRight, ExternalLink, Laptop, Lock, Clock, 
  FileText, Layers, Play, Share2, Copy, Check, Code, Globe, Heart, X
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { AdUnitTopBanner, AdUnitInFeed } from '../components/AdUnits';
import { Footer } from '../components/Footer';
import { getToolSEOData, ToolSEOData } from '../data/toolSEOContent';
import { ALL_DIRECTORY_TOOLS } from '../data/allToolsDirectory';
import { SEOHead } from '../components/SEOHead';

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
  const directoryTool = ALL_DIRECTORY_TOOLS.find(t => t.slug === toolSlug || t.id === toolSlug);
  const seoData: ToolSEOData = getToolSEOData(toolSlug, directoryTool);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isInteractiveModalOpen, setIsInteractiveModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEmbedCopied, setIsEmbedCopied] = useState(false);

  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('ftns_favorites') || '[]');
      return favs.includes(toolSlug) || favs.includes(seoData.slug);
    } catch {
      return false;
    }
  });

  const handleToggleFavorite = () => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem('ftns_favorites') || '[]');
      const id = seoData.slug || toolSlug;
      let newFavs: string[];
      if (favs.includes(id)) {
        newFavs = favs.filter(x => x !== id);
        setIsFavorite(false);
        showToast('Removed from favorites');
      } else {
        newFavs = [...favs, id];
        setIsFavorite(true);
        showToast('Added to favorites ❤️');
      }
      localStorage.setItem('ftns_favorites', JSON.stringify(newFavs));
      window.dispatchEvent(new Event('storage'));
    } catch {
      // ignore
    }
  };

  // Track in recent tools (last 10 visited)
  useEffect(() => {
    try {
      const recents = JSON.parse(localStorage.getItem('ftns_recent_tools') || '[]');
      const current = {
        id: seoData.slug || toolSlug,
        name: seoData.name,
        category: seoData.category,
        usedAt: Date.now()
      };
      const filtered = [current, ...recents.filter((r: any) => r.id !== current.id)].slice(0, 10);
      localStorage.setItem('ftns_recent_tools', JSON.stringify(filtered));
      window.dispatchEvent(new Event('storage'));
    } catch {
      // ignore
    }
  }, [toolSlug, seoData.name, seoData.category, seoData.slug]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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

  // Invalidate / Inject Structured Data JSON-LD for WebApplication, BreadcrumbList, HowTo, and FAQPage Schema
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

    const scriptId = 'ftns-tool-seo-schemas';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const toolUrl = `https://www.freetoolsnosignup.com/tools/${seoData.slug}`;
    const categoryUrl = `https://www.freetoolsnosignup.com${getCategoryPath(seoData.category)}`;

    const currentDate = new Date().toISOString().split('T')[0];

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          'name': seoData.name,
          'url': toolUrl,
          'description': seoData.description,
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'Any',
          'datePublished': currentDate,
          'version': '1.0.0',
          'author': {
            '@type': 'Organization',
            'name': 'FreeToolsNoSignup',
            'url': 'https://www.freetoolsnosignup.com'
          },
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://www.freetoolsnosignup.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': seoData.categoryName,
              'item': categoryUrl
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': seoData.name,
              'item': toolUrl
            }
          ]
        },
        {
          '@type': 'HowTo',
          'name': `How to use ${seoData.name}`,
          'description': `3-step guide on using ${seoData.name} online with zero signup and 100% in-browser privacy.`,
          'step': seoData.howToUse.map((step, idx) => ({
            '@type': 'HowToStep',
            'position': idx + 1,
            'name': step.title,
            'text': step.desc
          }))
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

  // Global Close Handler & ESC key listener for all 4753 tools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.body.style.overflow = 'auto';
        onNavigateHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'auto';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onNavigateHome]);

  const handleCloseTool = () => {
    document.body.style.overflow = 'auto';
    onNavigateHome();
  };

  // Guaranteed 6 related tools in same category
  const relatedTools = ALL_DIRECTORY_TOOLS
    .filter(t => t.category === seoData.category && t.slug !== seoData.slug && !t.id.includes('-engine-') && !t.id.includes('job-career-tool-') && !t.id.includes('study-academic-tool-') && !t.id.includes('dev-coder-tool-'))
    .slice(0, 6);

  // Social Share Handlers
  const toolUrl = `https://www.freetoolsnosignup.com/tools/${seoData.slug}`;
  const shareText = `Check out this 100% free, zero-signup ${seoData.name}! Private in-browser execution with zero watermarks:`;

  const handleShare = (platform: 'twitter' | 'reddit' | 'linkedin' | 'producthunt' | 'devto' | 'hashnode') => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(toolUrl)}`;
        break;
      case 'reddit':
        url = `https://www.reddit.com/submit?url=${encodeURIComponent(toolUrl)}&title=${encodeURIComponent(`Free ${seoData.name} - No Signup, No Watermarks (Client-Side)`)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(toolUrl)}`;
        break;
      case 'producthunt':
        url = `https://www.producthunt.com/posts/new`;
        break;
      case 'devto':
      case 'hashnode':
        // Copy Markdown syndication snippet to clipboard
        if (navigator.clipboard) {
          const md = `I just found this completely free, in-browser **[${seoData.name}](${toolUrl})** on FreeToolsNoSignup. Zero uploads, zero signups, and runs in RAM. Highly recommended!`;
          navigator.clipboard.writeText(md);
          showToast(`Copied ${platform.toUpperCase()} markdown snippet to clipboard!`);
          return;
        }
        break;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      showToast(`Opening ${platform}...`);
    }
  };

  const embedCodeSnippet = `<!-- FreeToolsNoSignup Embed Widget -->
<iframe 
  src="https://www.freetoolsnosignup.com/embed/${seoData.slug}" 
  width="100%" 
  height="520" 
  frameborder="0"
  style="border: 1px solid #e2e8f0; border-radius: 12px; width: 100%; max-width: 800px;">
</iframe>
<p style="font-size: 12px; color: #64748b; margin-top: 6px;">
  Powered by <a href="https://www.freetoolsnosignup.com/tools/${seoData.slug}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: bold; text-decoration: none;">Free ${seoData.name} - No Signup</a>
</p>`;

  const handleCopyEmbed = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedCodeSnippet);
      setIsEmbedCopied(true);
      showToast('Embed code copied! Paste directly into your blog or site HTML.');
      setTimeout(() => setIsEmbedCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white relative">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        canonicalUrl={`https://www.freetoolsnosignup.com/tools/${seoData.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              'name': seoData.name,
              'url': `https://www.freetoolsnosignup.com/tools/${seoData.slug}`,
              'description': seoData.description,
              'applicationCategory': 'UtilitiesApplication',
              'operatingSystem': 'Any',
              'datePublished': new Date().toISOString().split('T')[0],
              'version': '1.0.0',
              'author': {
                '@type': 'Organization',
                'name': 'FreeToolsNoSignup',
                'url': 'https://www.freetoolsnosignup.com'
              },
              'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD'
              }
            },
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'Home',
                  'item': 'https://www.freetoolsnosignup.com/'
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': seoData.categoryName,
                  'item': `https://www.freetoolsnosignup.com${getCategoryPath(seoData.category)}`
                },
                {
                  '@type': 'ListItem',
                  'position': 3,
                  'name': seoData.name,
                  'item': `https://www.freetoolsnosignup.com/tools/${seoData.slug}`
                }
              ]
            }
          ]
        }}
      />
      
      {/* Floating Global Close Button for All 4753 Tools */}
      <button
        onClick={handleCloseTool}
        className="fixed top-20 right-6 z-50 w-12 h-12 bg-[#0A1931] hover:bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto border-2 border-white"
        title="Close Tool & Return Home (ESC)"
        aria-label="Close Tool"
      >
        <X className="w-6 h-6" strokeWidth={2.5} />
      </button>
      
      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A1931] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 border border-[#1E3A8A]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

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

          {/* Top Right "Share & Get Backlink" Bar & Close Button */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-block text-[11px] font-bold text-[#64748B] mr-1">
              Share &amp; Get Backlink:
            </span>
            <button
              onClick={() => handleShare('twitter')}
              className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#000000] hover:text-white text-[#0B1F3A] text-xs font-bold border border-[#E2E8F0] transition-colors"
              title="Share on X (Twitter)"
            >
              X
            </button>
            <button
              onClick={() => handleShare('reddit')}
              className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#FF4500] hover:text-white text-[#0B1F3A] text-xs font-bold border border-[#E2E8F0] transition-colors"
              title="Share on Reddit"
            >
              Reddit
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#0A66C2] hover:text-white text-[#0B1F3A] text-xs font-bold border border-[#E2E8F0] transition-colors"
              title="Share on LinkedIn"
            >
              in
            </button>
            <button
              onClick={() => handleShare('devto')}
              className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#0B1F3A] hover:text-white text-[#0B1F3A] text-xs font-bold border border-[#E2E8F0] transition-colors"
              title="Copy Dev.to / Hashnode snippet"
            >
              Dev.to
            </button>
            <button
              onClick={() => onNavigateTo('/backlinks')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white text-xs font-bold transition-colors ml-1"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Embed</span>
            </button>

            {/* GLOBAL CLOSE X BUTTON (For all 4753 tools) */}
            <button
              onClick={handleCloseTool}
              type="button"
              aria-label="Close tool - Back to home"
              className="ml-2 w-9 h-9 flex items-center justify-center bg-[#0A1931] text-white hover:bg-red-600 rounded-full transition-all duration-200 cursor-pointer shadow-md hover:scale-110 active:scale-95 pointer-events-auto"
              title="Close Tool (ESC)"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner (Responsive 728x90) */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full space-y-8">
        
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-[#126BFF] transition-colors">Home</a>
          <span>/</span>
          <a href={getCategoryPath(seoData.category)} onClick={(e) => { e.preventDefault(); onNavigateTo(getCategoryPath(seoData.category)); }} className="hover:text-[#126BFF] transition-colors">
            {seoData.categoryName}
          </a>
          <span>/</span>
          <span className="text-[#0B1F3A] font-bold truncate max-w-xs">{seoData.name}</span>
        </nav>

        {/* HERO TITLE & INTRO WITH 3 TARGET KEYWORDS */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              {seoData.categoryName}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero Cloud Uploads • 100% In-Browser Privacy
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1931] tracking-tight leading-tight">
              {seoData.name}
            </h1>
            <button
              onClick={handleToggleFavorite}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold transition-all shadow-2xs self-start sm:self-auto shrink-0 ${
                isFavorite
                  ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                  : 'bg-white text-[#0A1931] border-[#CBD5E1] hover:border-[#C5A059]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-500' : 'text-slate-400'}`} />
              <span>{isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>

          {/* First 100 words naturally incorporating 3 target keywords */}
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-4xl">
            Welcome to the definitive <strong>free online tools no login</strong> workstation for {seoData.name}. As part of our verified catalog of <strong>free tools no signup</strong>, this utility runs as one of our modern <strong>private browser tools</strong> directly inside your device memory using WebAssembly. Enjoy lightning-fast local performance, zero daily conversion caps, and zero watermarks.
          </p>
        </div>

        {/* INTERACTIVE TOOL WORKSPACE (THE WORKING APP LAUNCHER) */}
        <section className="bg-white rounded-3xl border border-[#CBD5E1] p-4 sm:p-6 shadow-sm overflow-hidden">
          <div className="border-b border-[#E2E8F0] pb-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                Active Interactive Engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmbed}
                className="text-xs text-[#126BFF] hover:underline font-bold flex items-center gap-1"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Embed On Your Site</span>
              </button>
            </div>
          </div>

          {/* Embedded Interactive Components */}
          <div className="min-h-[420px] flex flex-col justify-center">
            {seoData.category === 'pdf' && (
              <PDFToolsModal
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            )}

            {seoData.category === 'image' && (
              <ImageToolsModal
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            )}

            {seoData.category === 'calculator' && (
              <CalculatorModal
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            )}

            {seoData.category === 'job-ats' && (
              <ATSToolsSuite
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            )}

            {seoData.category === 'ai-study' && (
              <AIStudySuite
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            )}

            {seoData.category === 'dev-pro' && (
              <DevToolsSuite
                initialToolId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            )}

            {seoData.category === 'notion' && (
              <NotionTemplateBuilder
                initialPresetId={seoData.id}
                onClose={() => {}}
                onRecordUse={() => {}}
              />
            )}

            {/* If tool doesn't match a direct suite, show high-converting interactive launcher */}
            {!['pdf', 'image', 'calculator', 'job-ats', 'ai-study', 'dev-pro', 'notion'].includes(seoData.category) && (
              <div className="py-12 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#EBF3FF] text-[#126BFF] flex items-center justify-center mx-auto shadow-xs">
                  <Play className="w-8 h-8 fill-[#126BFF]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">Ready to use {seoData.name}?</h3>
                <p className="text-xs sm:text-sm text-[#64748B]">{seoData.description}</p>
                <button
                  onClick={() => {
                    if (onOpenToolModal) {
                      onOpenToolModal(seoData.id);
                    } else {
                      setIsInteractiveModalOpen(true);
                    }
                  }}
                  className="px-6 py-3 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white font-bold text-xs transition-colors flex items-center gap-2 mx-auto shadow-md"
                >
                  <Zap className="w-4 h-4 text-[#FF7A00]" />
                  <span>Launch Interactive Workspace</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* In-Feed Ad Unit */}
        <AdUnitInFeed />

        {/* 500-WORD COMPREHENSIVE SEO CONTENT GUIDE & INTERNAL LINKING */}
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

            {/* Section 3: Why No Signup & Privacy Benefits */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Why No Signup */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#126BFF]" />
                    <span>Why Zero Signup is Required</span>
                  </h3>
                  {Array.isArray(seoData.whyNoSignup) ? (
                    seoData.whyNoSignup.map((p, i) => (
                      <p key={i} className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {seoData.whyNoSignup}
                    </p>
                  )}
                </div>

                {/* Privacy & Security Benefits */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#059669]" />
                    <span>In-Browser Privacy Benefits</span>
                  </h3>
                  {Array.isArray(seoData.privacyBenefits) ? (
                    seoData.privacyBenefits.map((p, i) => (
                      <p key={i} className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {seoData.privacyBenefits}
                    </p>
                  )}
                </div>

              </div>
            </article>

            {/* Section 4: Key Features & Advantages */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-[#059669]" />
                <span>Key Features &amp; Advantages</span>
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

            {/* Section 5: 5 Frequently Asked Questions (FAQs) */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
                  Frequently Asked Questions (5 FAQs)
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Answers to common questions about privacy, usage, compatibility, and file support for {seoData.name}.
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
                        <span className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#126BFF]">Q{idx + 1}.</span>
                          <span>{faq.question}</span>
                        </span>
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

            {/* Section 6: EMBED THIS TOOL - FREE BACKLINK WIDGET */}
            <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-[#0B1F3A] flex items-center gap-2">
                    <Code className="w-5 h-5 text-[#126BFF]" />
                    <span>Embed This Tool on Your Website (Free Backlink)</span>
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Copy and paste this clean, responsive iframe widget into your blog, documentation, or WordPress site:
                  </p>
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={4}
                  value={embedCodeSnippet}
                  className="w-full p-3 font-mono text-xs text-[#475569] bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl focus:outline-none select-all"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] text-[#64748B]">
                  Includes built-in responsive sizing and client-side execution.
                </span>
                <button
                  onClick={handleCopyEmbed}
                  className="px-4 py-2 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  {isEmbedCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isEmbedCopied ? 'Copied Code!' : 'Copy Embed HTML'}</span>
                </button>
              </div>
            </article>

          </div>

          {/* Sidebar / Related Category Tools (1 Column) */}
          <div className="space-y-6">
            
            {/* Quick Action Card */}
            <div className="bg-gradient-to-br from-[#0A1931] to-[#126BFF] rounded-3xl p-6 text-white space-y-4 shadow-md">
              <div className="space-y-1">
                <span className="text-2xl">⚡</span>
                <h3 className="text-lg font-black tracking-tight">
                  100% Free &amp; Unlimited
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
                className="w-full py-3 rounded-xl bg-white text-[#0A1931] hover:bg-[#F4F7FC] font-black text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Tool Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 6 Related Tools in Category (Internal Linking) */}
            {relatedTools.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-wider">
                    Related {seoData.categoryName} ({relatedTools.length})
                  </h3>
                  <a
                    href={getCategoryPath(seoData.category)}
                    onClick={(e) => { e.preventDefault(); onNavigateTo(getCategoryPath(seoData.category)); }}
                    className="text-xs text-[#126BFF] font-bold hover:underline normal-case"
                  >
                    View All
                  </a>
                </div>

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
