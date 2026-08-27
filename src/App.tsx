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
    const parts = (currentPath || '/').split('/').filter(Boolean);
    if (parts.length > 0 && SUPPORTED_LANGUAGES.some(l => l.code === parts[0].toLowerCase())) {
      const rest = parts.slice(1).join('/');
      return rest ? `/${rest}` : '/';
    }
    return currentPath || '/';
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

  if (normalizedPath === '/qr-code-generator' || normalizedPath === '/qr-generator' || normalizedPath === '/tools/qr-generator') {
    return <QRCodeGeneratorPage onNavigateHome={() => navigateTo('/')} />;
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
    <div id="ftns-app-root" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Mobile Bar */}
      <header className="lg:hidden bg-white border-b border-slate-200 p-3 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <BrandLogo variant="header" onClick={() => navigateTo('/')} />
        </div>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <button
            onClick={() => setIsCmdKOpen(true)}
            className="p-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs flex items-center gap-1"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-[#f8fafc] h-full overflow-y-auto p-4 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="font-bold text-sm">Navigation & History</span>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 text-slate-400">
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
        
        {/* COLUMN 1: LEFT SIDEBAR (20% Width, Sticky, #f8fafc) */}
        <div className="hidden lg:block lg:w-[20%] xl:w-[20%] shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-slate-200/80 bg-[#f8fafc]">
          <LeftSidebar
            recentTools={recentTools}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectTool={handleOpenTool}
            onClearRecent={clearRecent}
          />
        </div>

        {/* COLUMN 2: CENTER MAIN CONTENT (60% Width, White Background) */}
        <main className="w-full lg:w-[60%] xl:w-[60%] bg-white px-4 sm:px-8 py-6 flex flex-col gap-8">
          
          {/* Top Header Row with AdSense and Language Switcher */}
          <div className="w-full flex flex-col gap-3">
            <div className="hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ● 100% {t('privateInBrowser', 'Browser-Native')}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t('heroSubtitle', 'Zero signup walls. Client-side execution.')}
                </span>
              </div>
              <LanguageSwitcher />
            </div>

            {/* Top Leaderboard AdSense 728x90 */}
            <AdSenseBanner format="728x90" slotName="TopHeader" />
          </div>

          {/* Big Search Bar with Cmd+K Shortcut */}
          <div className="w-full space-y-3">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                id="main-center-search-input"
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={t('searchPlaceholder', 'Search 521 working tools (ATS check, AI detector, PDF merge, Fake Data)...')}
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-slate-50 hover:bg-white focus:bg-white border-2 border-slate-200 focus:border-amber-500 rounded-2xl text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 outline-none shadow-sm transition-all"
              />
              <button
                onClick={() => setIsCmdKOpen(true)}
                className="absolute right-3 px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-500 flex items-center gap-1 shadow-2xs transition-all"
              >
                <Command className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">K</span>
              </button>
            </div>

            {/* Quick Filter Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: t('filterAll', 'All (521)'), path: '/' },
                { id: 'notion', label: '📓 Notion Builder (26)', path: '/notion-template-builder' },
                { id: 'job-ats', label: t('filterJob', '💼 Job / ATS (50)'), path: '/job-ats' },
                { id: 'ai-study', label: t('filterAi', '🎓 AI Study (50)'), path: '/ai-study' },
                { id: 'dev-pro', label: t('filterDev', '💻 Dev Pro (100)'), path: '/dev-tools' },
                { id: 'pdf', label: t('filterPdf', '📄 PDF (54)'), path: '/pdf-tools' },
                { id: 'image', label: t('filterImage', '🖼️ Image (40)'), path: '/image-tools' },
                { id: 'calculator', label: t('filterCalc', '🧮 Calculators (201)'), path: '/calculators' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategoryFilter(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                    activeCategoryFilter === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Dropdown if user typed in center search */}
          {searchFilter.trim() && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
                <span>{t('matchingTools', 'Matching Tools')} ({filteredTools.length})</span>
                <button onClick={() => setSearchFilter('')} className="text-amber-600 hover:underline">
                  {t('clearSearch', 'Clear search')}
                </button>
              </div>

              {filteredTools.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-sm">
                  {t('noToolsFound', 'No tools found. Try another keyword.')}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                  {filteredTools.map(tool => (
                    <div
                      key={tool.id}
                      onClick={() => handleOpenTool(tool.id)}
                      className="p-3 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{tool.name}</h4>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {tool.workingBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tool.description}</p>
                      </div>
                      <span className="text-xs font-bold text-amber-700 mt-2 flex items-center gap-1">
                        {t('runTool', 'Run Tool')} →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* HERO SECTION */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-extrabold shadow-2xs">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{t('workingTools', 'World\'s Largest WORKING Tools Platform')}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {t('heroTitle', 'The World\'s Largest Working Tools Platform — 521 Tools That Actually Work')}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t('heroSubtitle', 'Zero signup walls, zero subscription traps, and zero watermarks. All 521 tools run 100% in your browser for unmatched privacy, speed, and reliability.')}
            </p>

            {/* Value Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> {t('freeForever', '100% Free Forever')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> {t('privateInBrowser', 'Private In-Browser Sandbox')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> {t('noWatermark', 'No Watermarks Ever')}
              </span>
            </div>
          </div>

          {/* Placement A: Homepage Top Banner (after hero) - 728x90 responsive */}
          <div className="w-full pt-1">
            <AdUnitTopBanner />
          </div>

          {/* THE 7 DABBA GRID (2 Rows x 3 Columns + 1 Full Width Notion Builder) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Featured Tool Categories</span>
                <span className="text-xs font-normal text-slate-400">7 Working Clusters</span>
              </h2>
            </div>

            <DabbaGrid 
              onOpenCategory={(cat) => setSelectedCategory(cat)}
              onOpenTool={handleOpenTool}
            />
          </section>

          {/* Center Bottom AdSense 728x90 */}
          <div className="w-full pt-4">
            <AdSenseBanner format="728x90" slotName="CenterBottom" />
          </div>

          {/* Footer Component with 500-word SEO text and Real Page Links */}
          <Footer onNavigate={navigateTo} />

        </main>

        {/* COLUMN 3: RIGHT SIDEBAR (20% Width, Sticky, Light Gray #f8fafc) */}
        <div className="hidden lg:block lg:w-[20%] xl:w-[20%] shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-slate-200/80 bg-[#f8fafc]">
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
