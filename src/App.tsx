import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SEOHead } from './components/SEOHead';
import { 
  Search, Shield, Zap, Sparkles, Star, ArrowRight, Heart,
  Flame, Wrench, FileText, Image as ImageIcon, Calculator,
  Briefcase, Code2, Database, Globe, Command, Compass, CheckCircle2,
  Lock, RefreshCw, ChevronRight, X, ExternalLink
} from 'lucide-react';

// Components
import { BrandLogo } from './components/BrandLogo';
import { RoyalCategoryExplorer } from './components/RoyalCategoryExplorer';
import { CommandKSearch } from './components/CommandKSearch';
import { ToolOfTheDay } from './components/ToolOfTheDay';
import { RecentAndFavoritesSection } from './components/RecentAndFavoritesSection';
import { AIToolFinder } from './components/AIToolFinder';
import { DabbaGrid } from './components/DabbaGrid';
import { HomepageSEOContent } from './components/HomepageSEOContent';
import { Footer } from './components/Footer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { GeoFlagSwitcher } from './components/GeoFlagSwitcher';
import { EmailCapture } from './components/EmailCapture';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { AdSenseBanner } from './components/AdSenseBanner';
import { AllCategoryModal } from './components/AllCategoryModal';
import { DedicatedSingleToolModal } from './components/DedicatedSingleToolModal';

// Modals for Tools
import { PDFToolsModal } from './components/tools/PDFToolsModal';
import { ImageToolsModal } from './components/tools/ImageToolsModal';
import { CalculatorModal } from './components/tools/CalculatorModal';
import { ATSToolsSuite } from './components/tools/ATSToolsSuite';
import { AIStudySuite } from './components/tools/AIStudySuite';
import { DevToolsSuite } from './components/tools/DevToolsSuite';
import { NotionTemplateBuilder } from './components/tools/NotionTemplateBuilder';
import { AIDetectorModal } from './components/tools/AIDetectorModal';
import { ImageCompressorModal } from './components/tools/ImageCompressorModal';
import { JSONFormatterModal } from './components/tools/JSONFormatterModal';
import { QRGeneratorModal } from './components/tools/QRGeneratorModal';
import { FakeDataModal } from './components/tools/FakeDataModal';

// Pages
import { ToolsHubPage } from './pages/ToolsHubPage';
import { CalculatorsHubPage } from './pages/CalculatorsHubPage';
import { CategoryPage } from './pages/CategoryPage';
import { ToolPage } from './pages/ToolPage';
import { PDFToWordPage } from './pages/PDFToWordPage';
import { QRCodeGeneratorPage } from './pages/QRCodeGeneratorPage';
import { EMICalculatorPage } from './pages/EMICalculatorPage';
import { NotionBuilderPage } from './pages/NotionBuilderPage';
import { NotionTemplatesPage } from './pages/NotionTemplatesPage';
import { AINewsPage } from './pages/AINewsPage';
import { AINewsDetailPage } from './pages/AINewsDetailPage';
import { AIUpdatesHubPage } from './pages/AIUpdatesHubPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { AuditPage } from './pages/AuditPage';
import { BacklinksDirectoryPage } from './pages/BacklinksDirectoryPage';
import { StatsPage } from './pages/StatsPage';
import { PartnersPage } from './pages/PartnersPage';
import { ProductDirectoryPage } from './pages/ProductDirectoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { EmbedToolPage } from './pages/EmbedToolPage';
import { ChromeExtensionPage } from './pages/ChromeExtensionPage';
import { LaunchPage } from './pages/LaunchPage';
import { BlogPage } from './pages/BlogPage';

// Data & Types
import { ToolCategory, RecentTool } from './types';
import { TOTAL_TOOLS_COUNT } from './data/toolCounts';
import { MASTER_CATEGORIES, MasterToolItem } from './data/masterCategoryData';
import { TOOLS_DATABASE } from './data/toolsData';
import { ALL_DIRECTORY_TOOLS } from './data/allToolsDirectory';

export function App() {
  // Navigation Path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Active Tool Modal
  const [activeToolModal, setActiveToolModal] = useState<{
    type: 'pdf' | 'image' | 'calc' | 'job' | 'ai' | 'dev' | 'notion' | 'ai-detector' | 'img-compress' | 'json-format' | 'qr' | 'fake-data' | 'single';
    id: string;
    item?: MasterToolItem;
  } | null>(null);

  // Command K search open state
  const [isCommandKOpen, setIsCommandKOpen] = useState(false);

  // All Category Modal
  const [allCategoryModal, setAllCategoryModal] = useState<ToolCategory | null>(null);

  // Recent tools and favorites state for fast instant UI
  const [recentTools, setRecentTools] = useState<RecentTool[]>(() => {
    try {
      const raw = localStorage.getItem('ftns_recent_items');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('ftns_favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Router sync with popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandKOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Router Navigation Helper
  const navigateTo = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Tool Usage Recording
  const recordToolUse = useCallback((toolId: string) => {
    try {
      const found = ALL_DIRECTORY_TOOLS.find(t => t.id === toolId || t.slug === toolId);
      const newEntry: RecentTool = {
        id: toolId,
        name: found?.name || toolId,
        category: (found?.category as ToolCategory) || 'pdf',
        icon: '⚡',
        usedAt: Date.now()
      };
      setRecentTools(prev => {
        const filtered = prev.filter(p => p.id !== toolId);
        const updated = [newEntry, ...filtered].slice(0, 10);
        localStorage.setItem('ftns_recent_items', JSON.stringify(updated));
        return updated;
      });
    } catch {
      // ignore
    }
  }, []);

  const handleToggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(toolId) ? prev.filter(x => x !== toolId) : [...prev, toolId];
      localStorage.setItem('ftns_favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleClearRecent = useCallback(() => {
    setRecentTools([]);
    localStorage.removeItem('ftns_recent_items');
  }, []);

  // Tool Selection & Modal Trigger
  const handleOpenTool = useCallback((toolId: string) => {
    recordToolUse(toolId);

    const t = toolId.toLowerCase();

    if (t === 'ai-content-detector' || t === 'ai-detector') {
      setActiveToolModal({ type: 'ai-detector', id: toolId });
      return;
    }
    if (t === 'image-compressor' || t === 'bulk-image-compressor') {
      setActiveToolModal({ type: 'img-compress', id: toolId });
      return;
    }
    if (t === 'json-formatter' || t === 'json-validator') {
      setActiveToolModal({ type: 'json-format', id: toolId });
      return;
    }
    if (t === 'qr-code-generator' || t === 'qr-generator' || t === 'qr-barcode-suite') {
      setActiveToolModal({ type: 'qr', id: toolId });
      return;
    }
    if (t === 'fake-data-generator' || t === 'mock-user-generator') {
      setActiveToolModal({ type: 'fake-data', id: toolId });
      return;
    }

    // Check if it's PDF
    if (t.startsWith('pdf') || t.includes('pdf') || t.includes('docx') || t.includes('watermark') || t.includes('bates')) {
      setActiveToolModal({ type: 'pdf', id: toolId });
      return;
    }

    // Check if it's Image
    if (t.startsWith('img-') || t.startsWith('image-') || t.includes('remover') || t.includes('upscaler') || t.includes('cropper') || t.includes('converter') || t.includes('ico') || t.includes('svg') || t.includes('palette')) {
      setActiveToolModal({ type: 'image', id: toolId });
      return;
    }

    // Check if it's Calculator
    if (t.includes('calc') || t.includes('loan') || t.includes('bmi') || t.includes('tax') || t.includes('mortgage') || t.includes('salary') || t.includes('interest') || t.includes('fraction') || t.includes('percentage') || t.includes('gpa') || t.includes('ovulation') || t.includes('pregnancy')) {
      setActiveToolModal({ type: 'calc', id: toolId });
      return;
    }

    // Check if it's ATS / Job
    if (t.includes('ats') || t.includes('resume') || t.includes('job') || t.includes('interview') || t.includes('cover-letter') || t.includes('career')) {
      setActiveToolModal({ type: 'job', id: toolId });
      return;
    }

    // Check if it's AI / Study
    if (t.includes('ai-') || t.includes('study') || t.includes('flashcard') || t.includes('summary') || t.includes('quiz') || t.includes('essay') || t.includes('math-solver')) {
      setActiveToolModal({ type: 'ai', id: toolId });
      return;
    }

    // Check if it's Dev / Pro
    if (t.includes('dev') || t.includes('json') || t.includes('base64') || t.includes('hash') || t.includes('jwt') || t.includes('uuid') || t.includes('sql') || t.includes('regex') || t.includes('cron') || t.includes('html') || t.includes('css')) {
      setActiveToolModal({ type: 'dev', id: toolId });
      return;
    }

    // Check if it's Notion
    if (t.includes('notion') || t.includes('template')) {
      setActiveToolModal({ type: 'notion', id: toolId });
      return;
    }

    // Fallback: Check if master item exists
    const masterItem = MASTER_CATEGORIES.flatMap(c => c.subcategories.flatMap(s => s.tools))
      .find(m => m.id === toolId || m.slug === toolId);

    if (masterItem) {
      setActiveToolModal({ type: 'single', id: toolId, item: masterItem });
      return;
    }

    // Default fallback to single workspace or tool page
    navigateTo(`/tool/${toolId}`);
  }, [navigateTo, recordToolUse]);

  // Page Routing Logic
  const renderPage = () => {
    const p = currentPath.toLowerCase();

    // Tools & Calculators Hubs
    if (p === '/tools' || p === '/tools-hub' || p === '/all-tools') {
      return <ToolsHubPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/calculators' || p === '/calculators-hub' || p === '/all-calculators') {
      return <CalculatorsHubPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    // Direct Flagship SEO Pages
    if (p === '/pdf-to-word' || p === '/tool/pdf-to-word' || p === '/tools/pdf-to-word') {
      return <PDFToWordPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/qr-code-generator' || p === '/tool/qr-code-generator' || p === '/tools/qr-code-generator') {
      return <QRCodeGeneratorPage onNavigateHome={() => navigateTo('/')} />;
    }
    if (p === '/emi-calculator' || p === '/calculators/emi-calculator' || p === '/tool/emi-calculator' || p === '/tools/emi-calculator') {
      return <EMICalculatorPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    // Notion Builder & Templates
    if (p === '/notion-builder' || p === '/notion-template-builder') {
      return <NotionBuilderPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/notion-templates' || p === '/templates') {
      return <NotionTemplatesPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    // AI News & Updates
    if (p === '/ai-news' || p === '/news') {
      return <AINewsPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p.startsWith('/ai-news/') || p.startsWith('/news/')) {
      const slug = p.replace(/^\/(ai-news|news)\//, '');
      return <AINewsDetailPage slug={slug} onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/ai-updates' || p === '/updates') {
      return <AIUpdatesHubPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    // Category Detail Pages
    if (p.startsWith('/category/')) {
      const catKey = p.replace('/category/', '') as ToolCategory;
      return <CategoryPage categoryKey={catKey} onNavigateHome={() => navigateTo('/')} onOpenTool={handleOpenTool} />;
    }

    // Canonical Dynamic Tool Detail Pages (/tool/[slug]) & Compatibility Redirects (/tools/[slug], /t/[slug])
    if (p.startsWith('/tool/') || p.startsWith('/tools/') || p.startsWith('/t/')) {
      const toolSlug = p.replace(/^\/(tools|tool|t)\//, '').trim();
      if (toolSlug) {
        if (typeof window !== 'undefined' && (p.startsWith('/tools/') || p.startsWith('/t/'))) {
          try {
            window.history.replaceState(null, '', `/tool/${toolSlug}`);
          } catch {}
        }
        return (
          <ToolPage 
            toolSlug={toolSlug} 
            onNavigateHome={() => navigateTo('/')} 
            onNavigateTo={navigateTo}
            onOpenToolModal={handleOpenTool}
          />
        );
      }
    }

    // Product Directory & Product Detail
    if (p === '/products' || p === '/directory') {
      return <ProductDirectoryPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p.startsWith('/products/')) {
      const slug = p.replace('/products/', '');
      return <ProductDetailPage slug={slug} onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    // Embed Tool Page
    if (p.startsWith('/embed/')) {
      const toolSlug = p.replace('/embed/', '');
      return <EmbedToolPage toolSlug={toolSlug} />;
    }

    // Static / Legal / Informational Pages
    if (p === '/about' || p === '/about-us') {
      return <AboutPage onNavigateHome={() => navigateTo('/')} />;
    }
    if (p === '/contact' || p === '/contact-us') {
      return <ContactPage onNavigateHome={() => navigateTo('/')} />;
    }
    if (p === '/privacy' || p === '/privacy-policy') {
      return <PrivacyPolicyPage onNavigateHome={() => navigateTo('/')} />;
    }
    if (p === '/terms' || p === '/terms-of-service') {
      return <TermsPage onNavigateHome={() => navigateTo('/')} />;
    }
    if (p === '/disclaimer') {
      return <DisclaimerPage onNavigateHome={() => navigateTo('/')} />;
    }
    if (p === '/audit') {
      return <AuditPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/backlinks' || p === '/backlinks-directory') {
      return <BacklinksDirectoryPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/stats' || p === '/live-stats') {
      return <StatsPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/partners' || p === '/affiliates') {
      return <PartnersPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/extension' || p === '/chrome-extension') {
      return <ChromeExtensionPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/launch') {
      return <LaunchPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }
    if (p === '/blog') {
      return <BlogPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    // Default: Complete Home Portal
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0A1931]">
        <SEOHead 
          title="FreeToolsNoSignup - 4,753+ Free Online Tools & Calculators (100% Private, No Login)"
          description="Access 4,753+ free online tools and calculators directly in your browser. PDF tools, image compressors, background removers, loan calculators, dev tools, and AI utilities. 100% free, no login or signup."
          keywords="free tools no signup, pdf tools free, background remover online, free image compressor, loan calculator, ats resume checker, developer tools, free qr generator"
          ogTitle="FreeToolsNoSignup - 4,753+ Free Online Tools & Calculators"
          ogDescription="100% Private browser-native tools. No accounts, no sign-up, no server uploads."
        />

        {/* Top Announcement & Quick Notice */}
        <div className="bg-[#0A1931] border-b border-[#D4AF37]/30 text-xs py-1.5 px-4 text-center text-slate-300 font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span><strong>100% Client-Side Privacy:</strong> Zero files or calculations ever touch our servers.</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-400">
              <span className="text-[#D4AF37] font-semibold">⚡ 4,753+ Verified Free Tools</span>
              <span>•</span>
              <button onClick={() => navigateTo('/tools-hub')} className="hover:text-white transition-colors cursor-pointer">
                Tools Hub
              </button>
              <span>•</span>
              <button onClick={() => navigateTo('/calculators-hub')} className="hover:text-white transition-colors cursor-pointer">
                Calculators Hub
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            
            {/* Logo */}
            <button 
              onClick={() => navigateTo('/')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <BrandLogo />
            </button>

            {/* Quick Search Bar trigger */}
            <div className="flex-1 max-w-lg hidden sm:block">
              <button 
                onClick={() => setIsCommandKOpen(true)}
                className="w-full flex items-center justify-between px-4 py-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl text-slate-500 text-sm transition-all duration-150 cursor-pointer shadow-inner"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span>Search 4,753+ free tools & calculators...</span>
                </div>
                <kbd className="hidden lg:inline-flex items-center gap-1 bg-white border border-slate-300 px-2 py-0.5 rounded text-[11px] font-mono text-slate-600 shadow-xs">
                  <Command className="w-3 h-3" /> K
                </kbd>
              </button>
            </div>

            {/* Actions & Utilities */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsCommandKOpen(true)}
                className="sm:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                title="Search Tools"
              >
                <Search className="w-5 h-5" />
              </button>

              <LanguageSwitcher />
              <GeoFlagSwitcher />

              <button
                onClick={() => navigateTo('/notion-builder')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A1931] hover:bg-[#0d2244] text-[#D4AF37] text-xs font-bold rounded-lg border border-[#D4AF37]/30 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Notion Builder
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#0A1931] via-[#0F2344] to-[#0A1931] text-white py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
          {/* Decorative subtle background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wide shadow-sm">
              <Shield className="w-3.5 h-3.5" /> 100% PRIVATE • ZERO LOGINS • NO SERVERS
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              4,753+ Free Online Tools <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]">
                Without Sign-Up Or Limits
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Every tool and calculator runs client-side in your browser. Fast, lossless, and strictly confidential. No email, no credit cards, no subscriptions.
            </p>

            {/* Hero Quick Category Launchers */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
              {[
                { label: 'PDF to Word', id: 'pdf-to-word', icon: '📄' },
                { label: 'Merge PDF', id: 'pdf-merge', icon: '📑' },
                { label: 'AI BG Remover', id: 'bg-remover', icon: '🪄' },
                { label: 'Image Compressor', id: 'image-compressor', icon: '🖼️' },
                { label: 'Loan EMI Calc', id: 'loan-calculator', icon: '💰' },
                { label: 'ATS Resume Check', id: 'ats-score-checker', icon: '💼' },
                { label: 'QR Generator', id: 'qr-code-generator', icon: '📱' },
                { label: 'JSON Formatter', id: 'json-formatter', icon: '💻' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleOpenTool(item.id)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-[#D4AF37]/50 text-white text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer shadow-sm hover:scale-105"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Search Input in Hero */}
            <div className="pt-2 max-w-2xl mx-auto">
              <div 
                onClick={() => setIsCommandKOpen(true)}
                className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl flex items-center gap-3 border border-slate-200 cursor-pointer hover:border-[#D4AF37] transition-all"
              >
                <div className="p-2.5 bg-[#0A1931] text-[#D4AF37] rounded-xl">
                  <Search className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-slate-400 text-sm sm:text-base font-medium">Type any tool name (e.g. compress pdf, bmi calc, watermark)...</span>
                </div>
                <span className="bg-[#D4AF37] text-[#0A1931] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm hidden sm:inline-block">
                  Explore Tools
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense Top Placement */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <AdSenseBanner format="728x90" slotName="top-banner" />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
          
          {/* Tool Of The Day Highlight */}
          <ToolOfTheDay onOpenTool={handleOpenTool} />

          {/* Recent & Favorites Quick Bar */}
          <RecentAndFavoritesSection 
            recentTools={recentTools}
            favorites={favorites}
            onOpenTool={handleOpenTool}
            onToggleFavorite={handleToggleFavorite}
            onClearRecent={handleClearRecent}
          />

          {/* 6 Core Dabbas Overview Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0A1931] tracking-tight">
                  Master Categories Hub
                </h2>
                <p className="text-sm text-slate-500">
                  Select a category to view instant tools and specialized builders.
                </p>
              </div>
              <button 
                onClick={() => navigateTo('/tools-hub')}
                className="text-xs sm:text-sm font-bold text-[#0A1931] hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer transition-colors"
              >
                View Full Index <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <DabbaGrid 
              onOpenCategory={(cat) => setAllCategoryModal(cat)}
              onOpenTool={handleOpenTool}
              onNavigateTo={navigateTo}
            />
          </section>

          {/* Royal Category Interactive Explorer (Deep Tabs & Live Execution) */}
          <section className="space-y-4 pt-4">
            <div className="border-t border-slate-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Interactive Suite</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1931] tracking-tight">
                    Royal Tool Explorer
                  </h2>
                  <p className="text-sm text-slate-500">
                    Switch subcategories, filter tags, and launch any tool with single-click instant execution.
                  </p>
                </div>
              </div>

              <RoyalCategoryExplorer 
                onSelectTool={handleOpenTool}
                onNavigateTo={navigateTo}
              />
            </div>
          </section>

          {/* AI Tool Recommendation Assistant */}
          <AIToolFinder onSelectTool={handleOpenTool} />

          {/* Email Newsletter & PWA Install Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <EmailCapture />
            <PWAInstallBanner />
          </div>

          {/* AdSense In-Feed Placement */}
          <AdSenseBanner format="728x90" slotName="in-feed-mid" />

          {/* Homepage Rich SEO Content & FAQ Schema */}
          <HomepageSEOContent />

        </main>

        {/* Global Footer */}
        <Footer onNavigateTo={navigateTo} />

      </div>
    );
  };

  return (
    <>
      {/* Dynamic Page Render */}
      {renderPage()}

      {/* Global Command+K Search Modal */}
      <CommandKSearch 
        isOpen={isCommandKOpen} 
        onClose={() => setIsCommandKOpen(false)}
        onSelectTool={handleOpenTool}
      />

      {/* Category Full Directory Modal */}
      {allCategoryModal && (
        <AllCategoryModal 
          category={allCategoryModal}
          onClose={() => setAllCategoryModal(null)}
          onSelectTool={handleOpenTool}
        />
      )}

      {/* PDF Tools Modal */}
      {activeToolModal?.type === 'pdf' && (
        <PDFToolsModal 
          initialToolId={activeToolModal.id}
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* Image Tools Modal */}
      {activeToolModal?.type === 'image' && (
        <ImageToolsModal 
          initialToolId={activeToolModal.id as any}
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* Calculator Modal */}
      {activeToolModal?.type === 'calc' && (
        <CalculatorModal 
          initialToolId={activeToolModal.id}
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* Job / ATS Suite */}
      {activeToolModal?.type === 'job' && (
        <ATSToolsSuite 
          initialToolId={activeToolModal.id}
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* AI / Study Suite */}
      {activeToolModal?.type === 'ai' && (
        <AIStudySuite 
          initialToolId={activeToolModal.id}
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* Dev / Pro Suite */}
      {activeToolModal?.type === 'dev' && (
        <DevToolsSuite 
          initialToolId={activeToolModal.id}
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* Notion Template Builder */}
      {activeToolModal?.type === 'notion' && (
        <NotionTemplateBuilder 
          initialPresetId={activeToolModal.id}
          onClose={() => setActiveToolModal(null)}
        />
      )}

      {/* AI Detector Modal */}
      {activeToolModal?.type === 'ai-detector' && (
        <AIDetectorModal 
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* Image Compressor Modal */}
      {activeToolModal?.type === 'img-compress' && (
        <ImageCompressorModal 
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* JSON Formatter Modal */}
      {activeToolModal?.type === 'json-format' && (
        <JSONFormatterModal 
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* QR Generator Modal */}
      {activeToolModal?.type === 'qr' && (
        <QRGeneratorModal 
          onClose={() => setActiveToolModal(null)}
        />
      )}

      {/* Fake Data Modal */}
      {activeToolModal?.type === 'fake-data' && (
        <FakeDataModal 
          onClose={() => setActiveToolModal(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* Dedicated Single Tool Modal Fallback */}
      {activeToolModal?.type === 'single' && activeToolModal.item && (
        <DedicatedSingleToolModal 
          tool={activeToolModal.item}
          categoryName={activeToolModal.item.categoryName || 'Tools'}
          subcategoryName={activeToolModal.item.subcategory || 'General'}
          relatedTools={[]}
          onClose={() => setActiveToolModal(null)}
          onSelectTool={(t) => handleOpenTool(t.id)}
          onNavigateTo={navigateTo}
        />
      )}
    </>
  );
}

export default App;
