import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, ShieldCheck, Sparkles, ChevronDown, ChevronUp, 
  CheckCircle2, ArrowRight, Clock, FileText, Layers, Code, Heart, X
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { AdUnitTopBanner, AdUnitInFeed } from '../components/AdUnits';
import { Footer } from '../components/Footer';
import { getToolSEOData, ToolSEOData } from '../data/toolSEOContent';
import { ALL_DIRECTORY_TOOLS } from '../data/allToolsDirectory';
import { MASTER_CATEGORIES } from '../data/masterCategoryData';
import { SEOHead } from '../components/SEOHead';
import { SingleToolWorkspace } from '../components/tools/SingleToolWorkspace';

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
}) => {
  // Find tool in directory metadata if available
  const directoryTool = ALL_DIRECTORY_TOOLS.find(t => t.slug === toolSlug || t.id === toolSlug);
  const seoData: ToolSEOData = getToolSEOData(toolSlug, directoryTool);

  // Match subcategory from MASTER_CATEGORIES
  const masterTool = useMemo(() => {
    return MASTER_CATEGORIES.flatMap(c => c.subcategories.flatMap(s => s.tools))
      .find(t => t.slug === toolSlug || t.id === toolSlug || t.slug === seoData.slug || t.id === seoData.id);
  }, [toolSlug, seoData.slug, seoData.id]);

  const subcategoryName = masterTool?.subcategory || (directoryTool as any)?.subcategory || 'Convert';

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
              'name': subcategoryName,
              'item': `${categoryUrl}?sub=${encodeURIComponent(subcategoryName)}`
            },
            {
              '@type': 'ListItem',
              'position': 4,
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
  }, [seoData, subcategoryName]);

  // Global Close Handler & ESC key listener for all tools
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

  // Strictly 3 related tools in same category as requested
  const relatedTools = ALL_DIRECTORY_TOOLS
    .filter(t => t.category === seoData.category && t.slug !== seoData.slug && !t.id.includes('-engine-') && !t.id.includes('job-career-tool-') && !t.id.includes('study-academic-tool-') && !t.id.includes('dev-coder-tool-'))
    .slice(0, 3);

  // Social Share Handlers
  const toolUrl = `https://www.freetoolsnosignup.com/tools/${seoData.slug}`;
  const shareText = `Check out this 100% free, zero-signup ${seoData.name}! Private in-browser execution with zero watermarks:`;

  const handleShare = (platform: 'twitter' | 'reddit' | 'linkedin') => {
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
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      showToast(`Opening ${platform}...`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white relative">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        canonicalUrl={`https://www.freetoolsnosignup.com/tools/${seoData.slug}`}
      />
      
      {/* Floating Global Close Button for All Tools */}
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
              Share:
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
              onClick={() => onNavigateTo('/backlinks')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0A1931] hover:bg-[#126BFF] text-white text-xs font-bold transition-colors ml-1"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Embed</span>
            </button>

            {/* GLOBAL CLOSE X BUTTON */}
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
      <div className="max-w-4xl mx-auto px-4 pt-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Main Container - Centered max-w-4xl - No Sidebars - iLovePDF Clean Style */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex-1 w-full space-y-8">
        
        {/* Breadcrumb Hierarchy: Home > Category > Subcategory > Tool */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748B] font-medium flex-wrap">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-[#126BFF] transition-colors">Home</a>
          <span>/</span>
          <a href={getCategoryPath(seoData.category)} onClick={(e) => { e.preventDefault(); onNavigateTo(getCategoryPath(seoData.category)); }} className="hover:text-[#126BFF] transition-colors">
            {seoData.categoryName}
          </a>
          <span>/</span>
          <span className="text-[#64748B] font-semibold">{subcategoryName}</span>
          <span>/</span>
          <span className="text-[#0B1F3A] font-bold truncate max-w-xs">{seoData.name}</span>
        </nav>

        {/* HERO TITLE & INTRO */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              {seoData.categoryName} • {subcategoryName}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% In-Browser Memory • Zero Server Uploads
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1931] tracking-tight leading-tight">
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

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-4xl">
            {seoData.description} Runs 100% client-side in your device RAM. No file size uploads, no server storage, zero watermarks, and completely free.
          </p>
        </div>

        {/* DEDICATED WORKING TOOL WORKSPACE (SINGLE TOOL ONLY - NO TABS - iLovePDF STYLE) */}
        <section className="w-full">
          <SingleToolWorkspace
            toolSlug={seoData.slug || toolSlug}
            toolName={seoData.name}
            toolCategory={seoData.category}
            toolDescription={seoData.description}
            onNavigateTo={onNavigateTo}
          />
        </section>

        {/* In-Feed Ad Unit */}
        <AdUnitInFeed />

        {/* COMPREHENSIVE CONTENT GUIDE (NO SIDEBARS - CENTERED MAX-W-4XL) */}
        <div className="space-y-8">
          
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

          {/* Section 3: Frequently Asked Questions */}
          <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {seoData.faqs.map((faq, idx) => (
                <div key={idx} className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-colors">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-sm text-[#0B1F3A] hover:bg-[#F8FAFC] flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#126BFF] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed bg-[#F8FAFC]/50 border-t border-[#E2E8F0]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

        </div>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-4xl mx-auto px-4 py-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Global Footer */}
      <Footer onNavigate={(path) => onNavigateTo(path)} />
    </div>
  );
};
