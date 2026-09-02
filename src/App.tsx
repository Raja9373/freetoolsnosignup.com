import React, { useState, useEffect } from 'react';
import { 
  Search, Command, Sparkles, Flame, ShieldCheck, 
  Zap, Menu, X, Check, Heart, ExternalLink, ArrowRight, Globe
} from 'lucide-react';
import { ToolCategory, RecentTool } from './types';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { DabbaGrid } from './components/DabbaGrid';
import { CommandKSearch } from './components/CommandKSearch';
import { AdSenseBanner } from './components/AdSenseBanner';
import { AdUnitTopBanner, AdUnitInFeed, AdUnitAuto } from './components/AdUnits';
import { Footer } from './components/Footer';
import { AllCategoryModal } from './components/AllCategoryModal';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslation } from './i18n/I18nContext';
import { SUPPORTED_LANGUAGES } from './i18n/languages';

// Dedicated Crawlable Pages
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { CategoryPage } from './pages/CategoryPage';
import { NotionBuilderPage } from './pages/NotionBuilderPage';
import { QRCodeGeneratorPage } from './pages/QRCodeGeneratorPage';
import { ToolPage } from './pages/ToolPage';

// Interactive Tool Modals
import { NotionTemplateBuilder } from './components/tools/NotionTemplateBuilder';
import { ATSToolsSuite } from './components/tools/ATSToolsSuite';
import { ALL_JOB_ATS_TOOLS } from './components/tools/atsToolsCatalog';
import { AIStudySuite } from './components/tools/AIStudySuite';
import { ALL_AI_STUDY_TOOLS } from './components/tools/aiStudyCatalog';
import { PDFToolsModal } from './components/tools/PDFToolsModal';
import { ImageCompressorModal } from './components/tools/ImageCompressorModal';
import { ImageToolsModal, IMAGE_TOOLS_LIST } from './components/tools/ImageToolsModal';
import { CalculatorModal } from './components/tools/CalculatorModal';
import { JSONFormatterModal } from './components/tools/JSONFormatterModal';
import { QRGeneratorModal } from './components/tools/QRGeneratorModal';
import { DevToolsSuite } from './components/tools/DevToolsSuite';
import { ALL_DEV_PRO_TOOLS } from './components/tools/devToolsCatalog';
import { TOOLS_DATABASE } from './data/toolsData';
import { BrandLogo } from './components/BrandLogo';
import { 
  TOTAL_TOOLS_COUNT, 
  PDF_TOOLS_COUNT, 
  IMAGE_TOOLS_COUNT, 
  CALCULATOR_TOOLS_COUNT, 
  JOB_ATS_TOOLS_COUNT, 
  AI_STUDY_TOOLS_COUNT, 
  DEV_PRO_TOOLS_COUNT, 
  NOTION_TOOLS_COUNT,
  SITE_HERO_TITLE,
  SITE_HERO_SUBTITLE,
  SITE_SEARCH_PLACEHOLDER
} from './data/toolCounts';

export default function App() {
  const { t, locale, setLocale } = useTranslation();

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Derive normalized route regardless of language prefix like /ja/about or /es/pdf-tools
  const normalizedPath = React.useMemo(() => {
    let raw = (currentPath || '/').trim();
    // Strip trailing slashes (e.g. /contact/ -> /contact)
    if (raw.length > 1 && raw.endsWith('/')) {
      raw = raw.replace(/\/+$/, '');
    }
    const lower = raw.toLowerCase();
    const parts = lower.split('/').filter(Boolean);
    if (parts.length > 0 && SUPPORTED_LANGUAGES.some(l => l.code === parts[0])) {
      const rest = parts.slice(1).join('/');
      return rest ? `/${rest}` : '/';
    }
    return lower || '/';
  }, [currentPath]);

  // Persistence State: Recently Used & Favorites
  const [recentTools, setRecentTools] = useState<RecentTool[]>(() => {
    try {
      const saved = localStorage.getItem('ftns_recent_tools');
      return saved ? JSON.parse(saved) : [
        { id: 'ats-checker', name: 'ATS Score Checker', category: 'job-ats', icon: 'Briefcase', usedAt: Date.now() - 1000 * 60 * 5 },
        { id: 'ai-detector', name: 'AI Content Detector', category: 'ai-study', icon: 'Sparkles', usedAt: Date.now() - 1000 * 60 * 20 },
        { id: 'fake-data-generator', name: 'Fake Data Generator', category: 'dev-pro', icon: 'Database', usedAt: Date.now() - 1000 * 60 * 45 }
      ];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ftns_favorites');
      return saved ? JSON.parse(saved) : ['ats-checker', 'ai-detector', 'pdf-merge', 'fake-data-generator'];
    } catch {
      return ['ats-checker', 'ai-detector'];
    }
  });

  // Handle URL changes & browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ftns_recent_tools', JSON.stringify(recentTools));
    } catch (e) {
      console.error(e);
    }
  }, [recentTools]);

  useEffect(() => {
    try {
      localStorage.setItem('ftns_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Global Command+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdKOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const recordToolUse = (toolId: string) => {
    const tool = TOOLS_DATABASE.find(t => t.id === toolId);
    if (!tool) return;

    setRecentTools(prev => {
      const filtered = prev.filter(p => p.id !== toolId);
      return [
        {
          id: tool.id,
          name: tool.name,
          category: tool.category,
          icon: tool.icon,
          usedAt: Date.now()
        },
        ...filtered
      ].slice(0, 10);
    });
  };

  const handleOpenTool = (toolId: string) => {
    recordToolUse(toolId);
    setSelectedToolId(toolId);
    setIsMobileSidebarOpen(false);
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => 
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const clearRecent = () => {
    setRecentTools([]);
  };

  // Routing Views: About, Privacy Policy, Contact, Terms, Disclaimer, Category Pages
  if (normalizedPath === '/about') {
    return <AboutPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (normalizedPath === '/privacy-policy') {
    return <PrivacyPolicyPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (normalizedPath === '/contact') {
    return <ContactPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (normalizedPath === '/terms-of-service') {
    return <TermsPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (normalizedPath === '/disclaimer') {
    return <DisclaimerPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (normalizedPath === '/pdf-tools') {
    return <CategoryPage categoryKey="pdf" onNavigateHome={() => navigateTo('/')} onOpenTool={handleOpenTool} />;
  }

  if (normalizedPath === '/image-tools') {
    return <CategoryPage categoryKey="image" onNavigateHome={() => navigateTo('/')} onOpenTool={handleOpenTool} />;
  }

  if (normalizedPath === '/calculators') {
    return <CategoryPage categoryKey="calculator" onNavigateHome={() => navigateTo('/')} onOpenTool={handleOpenTool} />;
  }

  if (normalizedPath === '/job-ats') {
    return <CategoryPage categoryKey="job-ats" onNavigateHome={() => navigateTo('/')} onOpenTool={handleOpenTool} />;
  }

  if (normalizedPath === '/ai-study') {
    return <CategoryPage categoryKey="ai-study" onNavigateHome={() => navigateTo('/')} onOpenTool={handleOpenTool} />;
  }

  if (normalizedPath === '/dev-tools') {
    return <CategoryPage categoryKey="dev-pro" onNavigateHome={() => navigateTo('/')} onOpenTool={handleOpenTool} />;
  }

  if (normalizedPath === '/notion-template-builder' || normalizedPath === '/notion-builder' || normalizedPath === '/notion') {
    return <NotionBuilderPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (normalizedPath === '/qr-code-generator' || normalizedPath === '/qr-generator') {
    return <QRCodeGeneratorPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (normalizedPath.startsWith('/tools/') || normalizedPath.startsWith('/tool/')) {
    const toolSlug = normalizedPath.replace(/^\/tools?\//, '').trim();
    if (toolSlug) {
      return (
        <ToolPage
          toolSlug={toolSlug}
          onNavigateHome={() => navigateTo('/')}
          onNavigateTo={(p) => navigateTo(p)}
          onOpenToolModal={(id) => handleOpenTool(id)}
        />
      );
    }
  }

  if (normalizedPath.startsWith('/category/')) {
    const categoryKey = normalizedPath.replace(/^\/category\//, '').trim() as ToolCategory;
    return (
      <CategoryPage
        categoryKey={categoryKey}
        onNavigateHome={() => navigateTo('/')}
        onOpenTool={handleOpenTool}
      />
    );
  }

  // Filtered tools for direct center search
  const filteredTools = searchFilter.trim() 
    ? TOOLS_DATABASE.filter(t => 
        (activeCategoryFilter === 'all' || t.category === activeCategoryFilter) &&
        (t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
         t.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
         t.tags.some(tag => tag.toLowerCase().includes(searchFilter.toLowerCase())))
      )
    : [];

  return (
    <div id="ftns-app-root" className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col font-sans selection:bg-[#FF7A00] selection:text-white">
      
      {/* Top Mobile Bar */}
      <header className="lg:hidden bg-white border-b border-[#E2E8F0] p-3 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            className="p-2 rounded-xl bg-[#F4F7FC] text-[#071A3D] hover:bg-[#EBF3FF] hover:text-[#126BFF] border border-[#E2E8F0] transition-colors"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <BrandLogo variant="header" onClick={() => navigateTo('/')} />
        </div>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <button
            onClick={() => setIsCmdKOpen(true)}
            className="p-2 rounded-xl bg-[#FFF4EB] text-[#FF7A00] hover:bg-[#FFE8D6] border border-[#FFD4B2] font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors"
            title="Search tools"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#071A3D]/70 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-xs bg-[#F4F7FC] h-full overflow-y-auto p-4 flex flex-col shadow-2xl border-r border-[#E2E8F0]">
            <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0]">
              <span className="font-extrabold text-sm text-[#071A3D]">Navigation & History</span>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <LeftSidebar
              recentTools={recentTools}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectTool={handleOpenTool}
              onClearRecent={clearRecent}
            />
          </div>
          <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}

      {/* 3-COLUMN MAIN LAYOUT */}
      <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-stretch">
        
        {/* COLUMN 1: LEFT SIDEBAR (20% Width, Sticky, light cool background #F4F7FC) */}
        <div className="hidden lg:block lg:w-[20%] xl:w-[20%] shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-[#E2E8F0] bg-[#F4F7FC]">
          <LeftSidebar
            recentTools={recentTools}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectTool={handleOpenTool}
            onClearRecent={clearRecent}
          />
        </div>

        {/* COLUMN 2: CENTER MAIN CONTENT (60% Width, Light Cool Tinted Container with White Cards) */}
        <main className="w-full lg:w-[60%] xl:w-[60%] bg-[#F4F7FC] px-4 sm:px-8 py-6 flex flex-col gap-7">
          
          {/* Top Header Row with AdSense and Language Switcher */}
          <div className="w-full flex flex-col gap-3">
            <div className="hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                  ● 100% {t('privateInBrowser', 'Browser-Native')}
                </span>
                <span className="text-xs text-[#64748B] font-medium">
                  {t('heroSubtitle', 'Zero signup walls. Client-side execution.')}
                </span>
              </div>
              <LanguageSwitcher />
            </div>

            {/* Top Leaderboard AdSense 728x90 */}
            <AdSenseBanner format="728x90" slotName="TopHeader" />
          </div>

          {/* Search Box Card with Cmd+K Shortcut */}
          <div className="w-full bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-2xl shadow-xs space-y-3.5">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#64748B] absolute left-4 pointer-events-none" />
              <input
                id="main-center-search-input"
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={t('searchPlaceholder', `Search ${TOTAL_TOOLS_COUNT} working tools (ATS check, AI detector, PDF merge, Fake Data)...`)}
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-[#F4F7FC] hover:bg-white focus:bg-white border-2 border-[#E2E8F0] focus:border-[#126BFF] focus:ring-4 focus:ring-[#126BFF]/10 rounded-2xl text-sm sm:text-base font-medium text-[#0B1F3A] placeholder:text-[#64748B]/70 outline-none shadow-2xs transition-all"
              />
              <button
                onClick={() => setIsCmdKOpen(true)}
                className="absolute right-3 px-2.5 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#126BFF]/50 hover:text-[#126BFF] rounded-xl text-xs font-mono font-bold text-[#64748B] flex items-center gap-1 shadow-2xs transition-all"
              >
                <Command className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">K</span>
              </button>
            </div>

            {/* Quick Filter Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: `${t('filterAll', 'All')} (${TOTAL_TOOLS_COUNT})`, path: '/' },
                { id: 'notion', label: `📓 Notion Builder (${NOTION_TOOLS_COUNT})`, path: '/notion-template-builder' },
                { id: 'job-ats', label: `${t('filterJob', '💼 Job / ATS')} (${JOB_ATS_TOOLS_COUNT})`, path: '/job-ats' },
                { id: 'ai-study', label: `${t('filterAi', '🎓 AI Study')} (${AI_STUDY_TOOLS_COUNT})`, path: '/ai-study' },
                { id: 'dev-pro', label: `${t('filterDev', '💻 Dev Pro')} (${DEV_PRO_TOOLS_COUNT})`, path: '/dev-tools' },
                { id: 'pdf', label: `${t('filterPdf', '📄 PDF')} (${PDF_TOOLS_COUNT})`, path: '/pdf-tools' },
                { id: 'image', label: `${t('filterImage', '🖼️ Image')} (${IMAGE_TOOLS_COUNT})`, path: '/image-tools' },
                { id: 'calculator', label: `${t('filterCalc', '🧮 Calculators')} (${CALCULATOR_TOOLS_COUNT})`, path: '/calculators' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategoryFilter(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                    activeCategoryFilter === tab.id
                      ? 'bg-[#071A3D] text-white shadow-xs border border-[#071A3D]'
                      : 'bg-[#F4F7FC] hover:bg-[#EBF3FF] hover:text-[#126BFF] text-[#0B1F3A] border border-[#E2E8F0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Dropdown if user typed in center search */}
          {searchFilter.trim() && (
            <div className="bg-white border border-[#CBD5E1] rounded-2xl p-5 shadow-xl space-y-3.5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold uppercase text-[#64748B]">
                <span className="text-[#071A3D] font-extrabold">{t('matchingTools', 'Matching Tools')} ({filteredTools.length})</span>
                <button onClick={() => setSearchFilter('')} className="text-[#FF7A00] hover:text-[#E66A00] font-bold hover:underline">
                  {t('clearSearch', 'Clear search')}
                </button>
              </div>

              {filteredTools.length === 0 ? (
                <div className="py-8 text-center text-[#64748B] text-sm">
                  {t('noToolsFound', 'No tools found. Try another keyword.')}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-80 overflow-y-auto pr-1">
                  {filteredTools.map(tool => (
                    <div
                      key={tool.id}
                      onClick={() => handleOpenTool(tool.id)}
                      className="p-3.5 bg-white border border-[#E2E8F0] hover:border-[#126BFF] hover:bg-[#F8FAFD] rounded-xl cursor-pointer transition-all flex flex-col justify-between shadow-2xs group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#126BFF] transition-colors">{tool.name}</h4>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded font-bold">
                            {tool.workingBadge}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{tool.description}</p>
                      </div>
                      <span className="text-xs font-bold text-[#FF7A00] group-hover:text-[#E66A00] mt-2.5 flex items-center gap-1">
                        {t('runTool', 'Run Tool')} →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* HERO SECTION */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071A3D] text-white border border-[#0F274A] rounded-full text-xs font-extrabold shadow-2xs">
              <Flame className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]" />
              <span>{t('workingTools', `${TOTAL_TOOLS_COUNT} Free Working Tools`)}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#0B1F3A] tracking-tight leading-tight">
              {t('heroTitle', '78 Powerful Tools That Actually Work — 100% Free, No Signup Required')}
            </h1>

            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed max-w-3xl">
              {t('heroSubtitle', 'Zero signup walls, zero subscription traps, and zero watermarks. All 78 tools run 100% in your browser for unmatched privacy, speed, and reliability.')}
            </p>

            {/* Value Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F7FC] border border-[#E2E8F0] rounded-xl text-[#0B1F3A] font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> {t('freeForever', '100% Free Forever')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F7FC] border border-[#E2E8F0] rounded-xl text-[#0B1F3A] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#126BFF]" /> {t('privateInBrowser', 'Private In-Browser Sandbox')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F7FC] border border-[#E2E8F0] rounded-xl text-[#0B1F3A] font-semibold">
                <Zap className="w-3.5 h-3.5 text-[#FF7A00]" /> {t('noWatermark', 'No Watermarks Ever')}
              </span>
            </div>
          </div>

          {/* Placement A: Homepage Top Banner (after hero) - 728x90 responsive */}
          <div className="w-full">
            <AdUnitTopBanner />
          </div>

          {/* THE 7 DABBA GRID (2 Rows x 3 Columns + 1 Full Width Notion Builder) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                <span>Featured Tool Categories</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF]">7 Working Clusters</span>
              </h2>
            </div>

            <DabbaGrid 
              onOpenCategory={(cat) => setSelectedCategory(cat)}
              onOpenTool={handleOpenTool}
            />
          </section>

          {/* Center Bottom AdSense 728x90 */}
          <div className="w-full pt-2">
            <AdSenseBanner format="728x90" slotName="CenterBottom" />
          </div>

          {/* Footer Component with 500-word SEO text and Real Page Links */}
          <Footer onNavigate={navigateTo} />

        </main>

        {/* COLUMN 3: RIGHT SIDEBAR (20% Width, Sticky, Light Cool Gray #F4F7FC) */}
        <div className="hidden lg:block lg:w-[20%] xl:w-[20%] shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-[#E2E8F0] bg-[#F4F7FC]">
          <RightSidebar />
        </div>

      </div>

      {/* ----------------- MODALS ----------------- */}

      {/* Command+K Omnisearch Dialog */}
      <CommandKSearch
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
        onSelectTool={handleOpenTool}
      />

      {/* Category Explorer Modal */}
      {selectedCategory && (
        <AllCategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onSelectTool={handleOpenTool}
        />
      )}

      {/* 0. Custom Notion Template & Database Builder Suite */}
      {selectedToolId && (
        selectedToolId === 'notion-template-builder' ||
        selectedToolId.startsWith('preset-') ||
        selectedToolId.includes('notion')
      ) && (
        <NotionTemplateBuilder
          initialPresetId={selectedToolId}
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 1. Complete 50 Job & ATS Pro Tools Suite */}
      {selectedToolId && (
        ALL_JOB_ATS_TOOLS.some(t => t.id === selectedToolId) ||
        selectedToolId === 'ats-checker' || 
        selectedToolId === 'resume-builder' || 
        selectedToolId === 'cover-letter-gen' ||
        selectedToolId === 'salary-negotiator' ||
        selectedToolId === 'interview-prep-coach' ||
        selectedToolId === 'linkedin-optimizer' ||
        selectedToolId.startsWith('job-') ||
        selectedToolId.startsWith('ats-') ||
        selectedToolId.startsWith('resume-') ||
        selectedToolId.startsWith('career-') ||
        selectedToolId.includes('salary') ||
        selectedToolId.includes('cover-letter')
      ) && (
        <ATSToolsSuite
          initialToolId={selectedToolId}
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 2. Complete 50 AI Study & Content Detection Tools Suite */}
      {selectedToolId && (
        ALL_AI_STUDY_TOOLS.some(t => t.id === selectedToolId) ||
        selectedToolId === 'ai-detector' || 
        selectedToolId === 'ai-humanizer' ||
        selectedToolId === 'essay-paraphraser' || 
        selectedToolId === 'plagiarism-remover' ||
        selectedToolId === 'citation-generator' ||
        selectedToolId === 'thesis-statement-builder' ||
        selectedToolId.startsWith('ai-') ||
        selectedToolId.startsWith('essay-') ||
        selectedToolId.startsWith('study-') ||
        selectedToolId.includes('citation') ||
        selectedToolId.includes('detector') ||
        selectedToolId.includes('humanizer') ||
        selectedToolId.includes('flashcard') ||
        selectedToolId.includes('paraphraser')
      ) && (
        <AIStudySuite
          initialToolId={selectedToolId}
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 3. Fake Data & Card Generator */}
      {(selectedToolId === 'fake-data-generator') && (
        <DevToolsSuite
          initialToolId="fake-user-profile-gen"
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 3.5. Complete 100 Dev Pro Tools Suite */}
      {selectedToolId && (
        ALL_DEV_PRO_TOOLS.some(t => t.id === selectedToolId) ||
        selectedToolId === 'base64-converter' ||
        selectedToolId === 'hash-generator' ||
        selectedToolId === 'regex-tester' ||
        selectedToolId.startsWith('dev-') ||
        selectedToolId.endsWith('-generator') ||
        selectedToolId.includes('yaml') ||
        selectedToolId.includes('encoder') ||
        selectedToolId.includes('decoder') ||
        selectedToolId.includes('crypto')
      ) && (
        <DevToolsSuite
          initialToolId={selectedToolId}
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 4. Complete 54-in-1 PDF Tools Suite */}
      {selectedToolId && (selectedToolId.startsWith('pdf-') || selectedToolId === 'jpg-to-pdf' || selectedToolId === 'png-to-pdf' || selectedToolId === 'text-to-pdf' || selectedToolId === 'word-to-pdf' || selectedToolId === 'excel-to-pdf' || selectedToolId === 'ppt-to-pdf') && (
        <PDFToolsModal
          initialToolId={selectedToolId}
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 5. Complete 40-in-1 Image Processing Studio */}
      {selectedToolId && (IMAGE_TOOLS_LIST.some(t => t.id === selectedToolId) || selectedToolId.startsWith('image-') || selectedToolId === 'bg-remover' || selectedToolId === 'color-palette-extractor' || selectedToolId === 'favicon-generator' || selectedToolId === 'svg-to-png' || selectedToolId === 'jpg-to-png' || selectedToolId === 'png-to-jpg' || selectedToolId === 'webp-to-jpg' || selectedToolId === 'jpg-to-webp' || selectedToolId === 'meme-generator') && (
        <ImageToolsModal
          initialToolId={selectedToolId}
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 6. Complete 201-in-1 Working Calculators Suite */}
      {selectedToolId && (
        selectedToolId === 'emi-calculator' || 
        selectedToolId === 'compound-interest-calc' || 
        selectedToolId === 'bmi-calculator' || 
        selectedToolId === 'salary-takehome-calc' ||
        selectedToolId === 'gst-vat-calc' ||
        selectedToolId.endsWith('-calc') ||
        selectedToolId.startsWith('calc-') ||
        selectedToolId.includes('calculator') ||
        selectedToolId.includes('converter')
      ) && (
        <CalculatorModal
          initialToolId={selectedToolId}
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 7. JSON Formatter & Tree */}
      {(selectedToolId === 'json-formatter') && (
        <JSONFormatterModal
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 8. QR Code Studio */}
      {(selectedToolId === 'qr-generator') && (
        <QRGeneratorModal
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

    </div>
  );
}
