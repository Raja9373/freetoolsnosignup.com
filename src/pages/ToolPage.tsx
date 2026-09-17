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
    <div className="min-h-screen bg-[#0A1931] text-[#FFFEF7] flex flex-col selection:bg-[#D4AF37] selection:text-[#0A1931] relative font-sans">
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        canonicalUrl={`https://www.freetoolsnosignup.com/tools/${seoData.slug}`}
      />
      
      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2340] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 border border-[#D4AF37]/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER - STICKY ROYAL NAVY & GOLD BREADCRUMBS WITH BACK & CLOSE BUTTONS */}
      <header className="sticky top-0 z-30 bg-[#0A1931]/95 backdrop-blur border-b border-[#D4AF37]/20 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-300 flex-wrap">
          <button onClick={onNavigateHome} className="hover:text-[#D4AF37] transition-colors cursor-pointer font-medium">
            Home
          </button>
          <span className="text-[#D4AF37]/60">&gt;</span>
          <button 
            onClick={() => onNavigateTo(getCategoryPath(seoData.category))} 
            className="hover:text-[#D4AF37] transition-colors cursor-pointer font-medium"
          >
            {seoData.categoryName}
          </button>
          <span className="text-[#D4AF37]/60">&gt;</span>
          <span className="text-gray-300">{subcategoryName}</span>
          <span className="text-[#D4AF37]/60">&gt;</span>
          <span className="text-[#D4AF37] font-bold">{seoData.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.history.back()} 
            className="px-3 py-1 border border-[#D4AF37]/30 text-white rounded hover:bg-[#0F2340] text-xs font-semibold transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <button 
            onClick={handleCloseTool} 
            className="px-3 py-1 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold rounded text-xs transition-colors cursor-pointer"
          >
            ✕ Close (ESC)
          </button>
        </div>
      </header>

      {/* Top AdSense Banner (Responsive 728x90) */}
      <div className="max-w-4xl mx-auto px-4 pt-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Main Container - Centered max-w-4xl - No Sidebars - iLovePDF Clean Style */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex-1 w-full space-y-8">

        {/* HERO TITLE & INTRO */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              {seoData.categoryName} • {subcategoryName}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% In-Browser Memory • Zero Server Uploads
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {seoData.name}
            </h1>
            <button
              onClick={handleToggleFavorite}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold transition-all shadow-2xs self-start sm:self-auto shrink-0 cursor-pointer ${
                isFavorite
                  ? 'bg-red-950 text-red-400 border-red-500/40 hover:bg-red-900/60'
                  : 'bg-[#0F2340] text-gray-300 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-400' : 'text-slate-400'}`} />
              <span>{isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-4xl">
            {seoData.description} - 100% client-side, zero server upload, works offline.
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
          
          {/* Section 1: How to Use (3 Steps) */}
          <article className="bg-[#0F2340] rounded-3xl border border-[#D4AF37]/20 p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Clock className="w-6 h-6 text-[#D4AF37]" />
              <span>How to Use {seoData.name} in 3 Simple Steps</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {seoData.howToUse.map((step) => (
                <div key={step.step} className="bg-[#0A1931] border border-[#D4AF37]/20 rounded-2xl p-5 space-y-2.5 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] font-black text-sm flex items-center justify-center border border-[#D4AF37]/30">
                      {step.step}
                    </div>
                    <h3 className="text-sm font-black text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Section 2: What is this Tool */}
          <article className="bg-[#0F2340] rounded-3xl border border-[#D4AF37]/20 p-6 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
              <span>What is Free {seoData.name}?</span>
            </h2>
            {seoData.whatIs.map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Section 3: Frequently Asked Questions */}
          <article className="bg-[#0F2340] rounded-3xl border border-[#D4AF37]/20 p-6 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {seoData.faqs.map((faq, idx) => (
                <div key={idx} className="border border-[#D4AF37]/20 rounded-2xl overflow-hidden transition-colors bg-[#0A1931]/80">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-sm text-white hover:text-[#D4AF37] flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-[#D4AF37]/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* Section 4: Related Tools in Same Category */}
          {relatedTools.length > 0 && (
            <article className="bg-[#0F2340] rounded-3xl border border-[#D4AF37]/20 p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-between">
                <span>Related {seoData.categoryName} Tools</span>
                <button
                  onClick={() => onNavigateTo(getCategoryPath(seoData.category))}
                  className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map((rt) => (
                  <div
                    key={rt.id}
                    onClick={() => onNavigateTo(`/tools/${rt.slug}`)}
                    className="p-4 rounded-2xl bg-[#0A1931] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between group shadow-md"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {rt.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {rt.description}
                      </p>
                    </div>
                    <span className="text-xs text-[#D4AF37] font-semibold mt-3 flex items-center gap-1">
                      Open Tool <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </article>
          )}

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
