import React, { useState, useEffect } from 'react';
import { 
  Search, Command, Sparkles, Flame, ShieldCheck, 
  Zap, Menu, X, Check, Heart, ExternalLink, ArrowRight, Globe,
  Clock, Chrome, BarChart3
} from 'lucide-react';
import { ToolCategory, RecentTool } from './types';
import { RoyalCategoryExplorer } from './components/RoyalCategoryExplorer';
import { CommandKSearch } from './components/CommandKSearch';
import { AdSenseBanner } from './components/AdSenseBanner';
import { AdUnitTopBanner, AdUnitInFeed, AdUnitAuto } from './components/AdUnits';
import { Footer } from './components/Footer';
import { AllCategoryModal } from './components/AllCategoryModal';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { GeoFlagSwitcher } from './components/GeoFlagSwitcher';
import { useTranslation } from './i18n/I18nContext';
import { SUPPORTED_LANGUAGES } from './i18n/languages';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { AIToolFinder } from './components/AIToolFinder';
import { ToolOfTheDay } from './components/ToolOfTheDay';
import { EmailCapture } from './components/EmailCapture';

import AiChatbotWidget from './components/AiChatbotWidget';

// Dedicated Crawlable Pages
import { AboutUs } from './pages/AboutUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ContactUs } from './pages/ContactUs';
import { TermsOfService } from './pages/TermsOfService';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { CategoryPage } from './pages/CategoryPage';
import { NotionBuilderPage } from './pages/NotionBuilderPage';
import { QRCodeGeneratorPage } from './pages/QRCodeGeneratorPage';
import { ToolPage } from './pages/ToolPage';
import { HomepageSEOContent } from './components/HomepageSEOContent';
import { EmbedToolPage } from './pages/EmbedToolPage';
import { BacklinksDirectoryPage } from './pages/BacklinksDirectoryPage';
import { PartnersPage } from './pages/PartnersPage';
import { LaunchPage } from './pages/LaunchPage';
import { BlogPage } from './pages/BlogPage';
import { ChromeExtensionPage } from './pages/ChromeExtensionPage';
import { StatsPage } from './pages/StatsPage';
import { AuditPage } from './pages/AuditPage';

import { TOOLS_DATABASE } from './data/toolsData';
import { ALL_DIRECTORY_TOOLS } from './data/allToolsDirectory';
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
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

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

  // Dynamic Title & Meta Description based on active route
  useEffect(() => {
    let title = "4753 Free Tools - No Signup - 100% Private in Your Browser";
    let description = "4753 Free Tools - No Signup - 100% Private in Your Browser - PDF, Image, Calculators, ATS, AI - All 100% offline - No API - 4,753 working utilities.";

    if (normalizedPath === '/about') {
      title = "About Us - FreeToolsNoSignup | 4,753 Free Browser Utilities";
      description = "Learn about FreeToolsNoSignup: 4,753 free browser-native tools requiring zero signups, zero server uploads, and 100% data privacy.";
    } else if (normalizedPath === '/privacy-policy') {
      title = "Privacy Policy - FreeToolsNoSignup";
      description = "Read our strict zero-knowledge privacy policy. All 4753 tools execute 100% locally in your browser memory with zero tracking or server uploads.";
    } else if (normalizedPath === '/contact') {
      title = "Contact Us - FreeToolsNoSignup";
      description = "Get in touch with the FreeToolsNoSignup team for feedback, feature requests, or tool suggestions.";
    } else if (normalizedPath === '/terms' || normalizedPath === '/terms-of-service') {
      title = "Terms of Service - FreeToolsNoSignup";
      description = "Review the terms and conditions for using FreeToolsNoSignup's 4,753 free browser-based utilities.";
    } else if (normalizedPath === '/disclaimer') {
      title = "Disclaimer - FreeToolsNoSignup";
      description = "Read the legal disclaimer regarding FreeToolsNoSignup and our client-side utility tools.";
    } else if (normalizedPath === '/chrome-extension') {
      title = "Chrome Extension - FreeToolsNoSignup";
      description = "Install the FreeToolsNoSignup Chrome Extension for instant offline access to 4,753 free productivity tools.";
    } else if (normalizedPath === '/stats') {
      title = "Platform Statistics - FreeToolsNoSignup";
      description = "View live platform metrics, tool usage stats, and category breakdowns for FreeToolsNoSignup.";
    } else if (normalizedPath === '/audit') {
      title = "SEO & AdSense Audit - FreeToolsNoSignup";
      description = "Audit report for FreeToolsNoSignup covering SEO, performance, accessibility, and AdSense readiness.";
    } else if (normalizedPath === '/pdf-tools') {
      title = "Free PDF Tools No Signup - Merge, Split, Compress PDF";
      description = "Use 753+ free browser-based PDF tools to merge, split, compress, convert, and sign PDF documents securely without uploading files to servers.";
    } else if (normalizedPath === '/image-tools') {
      title = "Free Image & Photo Tools - Compress, Resize, Convert";
      description = "800+ free browser-native image tools for compression, resizing, format conversion, and watermarking. 100% private and offline.";
    } else if (normalizedPath === '/calculators') {
      title = "Free Online Calculators - EMI, Mortgage, Tax, Math";
      description = "Access 1,200+ free online calculators for finance, mortgages, EMI, loans, mathematics, and science with instant local computation.";
    } else if (normalizedPath === '/job-ats') {
      title = "ATS Resume Checker & Job Tools - Free No Signup";
      description = "Check your resume against ATS algorithms, optimize keywords, and generate cover letters instantly with zero signup.";
    } else if (normalizedPath === '/ai-study') {
      title = "AI & Study Utilities - Free Browser Tools";
      description = "Explore free AI detection tools, study planners, citation generators, and flashcard makers operating locally in your browser.";
    } else if (normalizedPath === '/dev-tools') {
      title = "Developer & Pro Tools - JSON, QR, Hash, Base64";
      description = "1,000+ developer utilities for JSON formatting, base64 encoding, fake data generation, and QR code creation with zero server calls.";
    } else if (normalizedPath === '/notion-template-builder' || normalizedPath === '/notion-builder' || normalizedPath.includes('notion')) {
      title = "Notion Template Builder - Free Creator Tool";
      description = "Build, customize, and export Notion templates instantly with our free browser utility tool.";
    } else if (normalizedPath === '/qr-code-generator' || normalizedPath === '/qr-generator') {
      title = "QR Code Generator & Scanner - Free No Signup";
      description = "Generate custom QR codes, vCards, Wi-Fi credentials, and barcodes instantly with zero expiration or registration.";
    } else if (normalizedPath === '/backlinks') {
      title = "Backlinks Directory & Resource Hub - FreeToolsNoSignup";
      description = "Explore our partner directory, resource links, and collaborative web tools directory.";
    } else if (normalizedPath === '/partners') {
      title = "Our Partners & Ecosystem - FreeToolsNoSignup";
      description = "Discover our trusted technology partners, open-source libraries, and collaborative ecosystems.";
    } else if (normalizedPath === '/launch') {
      title = "Product Launch Kit - FreeToolsNoSignup";
      description = "Launch your project with our free marketing templates, launch checklists, and PR tools.";
    } else if (normalizedPath === '/blog') {
      title = "Blog & Productivity Guides - FreeToolsNoSignup";
      description = "Read expert guides on client-side web tools, PDF editing tips, developer utilities, and data privacy.";
    } else if (normalizedPath.startsWith('/tools/') || normalizedPath.startsWith('/tool/')) {
      const toolSlug = normalizedPath.replace(/^\/tools?\//, '').trim();
      const foundTool = TOOLS_DATABASE.find(t => t.id === toolSlug);
      if (foundTool) {
        title = `${foundTool.name} - Free Online Tool | FreeToolsNoSignup`;
        description = foundTool.description;
      }
    }

    document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [normalizedPath]);

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

  // Sync state when modified in other components or tabs
  useEffect(() => {
    const handleStorage = () => {
      try {
        const favs = JSON.parse(localStorage.getItem('ftns_favorites') || '[]');
        setFavorites(favs);
        const recs = JSON.parse(localStorage.getItem('ftns_recent_tools') || '[]');
        setRecentTools(recs);
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
    const found = ALL_DIRECTORY_TOOLS.find(t => t.id === toolId || t.slug === toolId) ||
                  TOOLS_DATABASE.find(t => t.id === toolId || (t as any).slug === toolId);
    const slug = (found as any)?.slug || (found as any)?.id || toolId;
    navigateTo(`/tools/${slug}`);
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => 
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const clearRecent = () => {
    setRecentTools([]);
  };

  // Filtered tools for direct center search
  const filteredTools = searchFilter.trim() 
    ? TOOLS_DATABASE.filter(t => 
        (activeCategoryFilter === 'all' || t.category === activeCategoryFilter) &&
        (t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
         t.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
         t.tags.some(tag => tag.toLowerCase().includes(searchFilter.toLowerCase())))
      )
    : [];

  // Routing Views: About, Privacy Policy, Contact, Terms, Disclaimer, Category Pages, Extension, Stats
  const renderCurrentPage = () => {
    if (normalizedPath === '/about') {
      return <AboutUs onNavigateHome={() => navigateTo('/')} />;
    }

    if (normalizedPath === '/privacy-policy') {
      return <PrivacyPolicy onNavigateHome={() => navigateTo('/')} />;
    }

    if (normalizedPath === '/contact') {
      return <ContactUs onNavigateHome={() => navigateTo('/')} />;
    }

    if (normalizedPath === '/terms' || normalizedPath === '/terms-of-service') {
      return <TermsOfService onNavigateHome={() => navigateTo('/')} />;
    }

    if (normalizedPath === '/disclaimer') {
      return <DisclaimerPage onNavigateHome={() => navigateTo('/')} />;
    }

    if (normalizedPath === '/chrome-extension') {
      return <ChromeExtensionPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath === '/stats') {
      return <StatsPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath === '/audit') {
      return <AuditPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
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

    if (
      normalizedPath === '/notion-template-builder' || 
      normalizedPath === '/notion-builder' || 
      normalizedPath === '/notion' ||
      normalizedPath === '/tools/custom-notion-template-database-builder' ||
      normalizedPath === '/tool/custom-notion-template-database-builder' ||
      normalizedPath === '/tools/notion-template-builder'
    ) {
      return <NotionBuilderPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath === '/qr-code-generator' || normalizedPath === '/qr-generator') {
      return <QRCodeGeneratorPage onNavigateHome={() => navigateTo('/')} />;
    }

    if (normalizedPath === '/backlinks') {
      return <BacklinksDirectoryPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath === '/partners') {
      return <PartnersPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath === '/launch') {
      return <LaunchPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath === '/blog') {
      return <BlogPage onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath.startsWith('/blog/')) {
      const articleSlug = normalizedPath.replace(/^\/blog\//, '').trim();
      return <BlogPage articleSlug={articleSlug} onNavigateHome={() => navigateTo('/')} onNavigateTo={navigateTo} />;
    }

    if (normalizedPath.startsWith('/embed/')) {
      const embedSlug = normalizedPath.replace(/^\/embed\//, '').trim();
      return <EmbedToolPage toolSlug={embedSlug} />;
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

    // Default: Homepage view
    return (
      <div id="ftns-app-root" className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0A1931]">
      
        {/* SIMPLE CLEAN ROYAL NAVY HEADER */}
        <header className="w-full bg-[#0A1931] border-b border-[#D4AF37]/20 sticky top-0 z-40 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BrandLogo variant="header" onClick={() => navigateTo('/')} />
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#D4AF37]/20">
                <span className="text-xs font-black text-[#D4AF37] tracking-wider uppercase bg-[#0F2340] px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                  4753 Tools Active
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  NO SIGNUP
                </span>
              </div>
            </div>

            {/* Quick Search trigger button */}
            <div className="flex-1 max-w-md hidden md:block">
              <button
                onClick={() => setIsCmdKOpen(true)}
                className="w-full py-2 px-3.5 bg-[#0F2340] hover:bg-[#142646] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 rounded-xl text-xs text-slate-300 flex items-center justify-between transition-all cursor-pointer shadow-inner"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-slate-300">Search all 4,753 free tools...</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#0A1931] border border-[#D4AF37]/30 text-[10px] font-mono text-[#D4AF37] font-bold">
                  ⌘K
                </span>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCmdKOpen(true)}
                className="md:hidden p-2 rounded-xl bg-[#0F2340] text-[#D4AF37] border border-[#D4AF37]/30"
                title="Search tools"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('/chrome-extension')}
                className="hidden lg:flex px-3 py-1.5 rounded-xl bg-[#0F2340] hover:bg-[#152e54] text-[#FFFEF7] hover:text-[#D4AF37] border border-[#D4AF37]/20 text-xs font-bold items-center gap-1.5 transition cursor-pointer"
                title="Install Chrome Extension"
              >
                <Chrome className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Extension</span>
              </button>
              <button
                onClick={() => navigateTo('/stats')}
                className="hidden sm:flex px-2.5 py-1.5 rounded-xl bg-[#0F2340] hover:bg-[#152e54] text-slate-300 hover:text-white border border-[#D4AF37]/20 text-xs font-bold items-center gap-1 shadow-2xs transition cursor-pointer"
                title="Platform Analytics"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Stats</span>
              </button>
              <GeoFlagSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        {/* CENTERED MAIN LAYOUT - NO SIDEBARS - CLEAN LIKE iLovePDF */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
          
          {/* Top Header Row with Browser-Native Badge and Leaderboard AdSense */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                  ● 100% {t('privateInBrowser', 'Browser-Native')}
                </span>
                <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
                  {t('heroSubtitle', 'Zero signup walls. Client-side execution.')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0A1931]">
                  4,753 Utilities Ready
                </span>
              </div>
            </div>

            {/* Top Leaderboard AdSense 728x90 */}
            <AdSenseBanner format="728x90" slotName="TopHeader" />
          </div>

          {/* Search Box Card with Cmd+K Shortcut */}
          <div className="w-full bg-white border border-[#E2E8F0] p-5 sm:p-6 rounded-3xl shadow-sm space-y-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#475569] absolute left-4 pointer-events-none" />
              <input
                id="main-center-search-input"
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={t('searchPlaceholder', `Search ${TOTAL_TOOLS_COUNT} working tools (ATS check, AI detector, PDF merge, Fake Data)...`)}
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-[#F8FAFC] hover:bg-white focus:bg-white border-2 border-[#E2E8F0] focus:border-[#0A1931] focus:ring-4 focus:ring-[#0A1931]/5 rounded-2xl text-sm sm:text-base font-medium text-[#0F172A] placeholder:text-[#94A3B8] outline-none shadow-2xs transition-all"
              />
              <button
                onClick={() => setIsCmdKOpen(true)}
                className="absolute right-3.5 px-3 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#0A1931] hover:text-[#0A1931] rounded-xl text-xs font-mono font-bold text-[#64748B] flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Command className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">K</span>
              </button>
            </div>

            {/* Quick Filter Category Pills - Royal Styling */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              {[
                { id: 'All', label: `All (${TOTAL_TOOLS_COUNT})`, path: '/' },
                { id: 'Notion Builder', label: `📓 Notion Builder (${NOTION_TOOLS_COUNT})`, path: '/notion-template-builder' },
                { id: 'Job & Career', label: `💼 Job & Career (${JOB_ATS_TOOLS_COUNT})`, path: '/job-ats' },
                { id: 'AI & Study', label: `🎓 AI & Study (${AI_STUDY_TOOLS_COUNT})`, path: '/ai-study' },
                { id: 'Developer', label: `💻 Developer (${DEV_PRO_TOOLS_COUNT})`, path: '/dev-tools' },
                { id: 'PDF Studio', label: `📄 PDF Studio (${PDF_TOOLS_COUNT})`, path: '/pdf-tools' },
                { id: 'Image & Media', label: `🖼️ Image & Media (${IMAGE_TOOLS_COUNT})`, path: '/image-tools' },
                { id: 'Calculators', label: `🧮 Calculators (${CALCULATOR_TOOLS_COUNT})`, path: '/calculators' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategoryFilter(tab.id);
                    if (tab.id === 'All') {
                      navigateTo('/');
                    } else if (tab.id === 'Notion Builder') {
                      navigateTo('/notion-template-builder');
                    } else if (tab.id === 'Job & Career') {
                      navigateTo('/job-ats');
                    } else if (tab.id === 'AI & Study') {
                      navigateTo('/ai-study');
                    } else if (tab.id === 'Developer') {
                      navigateTo('/dev-tools');
                    } else if (tab.id === 'PDF Studio') {
                      navigateTo('/pdf-tools');
                    } else if (tab.id === 'Image & Media') {
                      navigateTo('/image-tools');
                    } else if (tab.id === 'Calculators') {
                      navigateTo('/calculators');
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all text-xs category-pill select-none cursor-pointer pointer-events-auto ${
                    activeCategoryFilter === tab.id
                      ? 'bg-[#0A1931] text-white shadow-sm border border-[#0A1931]'
                      : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] border border-[#E2E8F0]'
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
                <button onClick={() => setSearchFilter('')} className="text-[#FF7A00] hover:text-[#E66A00] font-bold hover:underline cursor-pointer">
                  {t('clearSearch', 'Clear search')}
                </button>
              </div>

              {filteredTools.length === 0 ? (
                <div className="py-8 text-center text-[#64748B] text-sm">
                  {t('noToolsFound', 'No tools found. Try another keyword.')}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-80 overflow-y-auto pr-1">
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

          {/* AI Semantic Tool Finder (Fuse.js powered natural language tool search) */}
          <AIToolFinder 
            onSelectTool={(slug) => {
              recordToolUse(slug);
              navigateTo(`/tools/${slug}`);
            }} 
          />

          {/* Hero Section */}
          <div className="px-2 py-6 mb-2 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0A1931] mb-3 leading-tight text-center flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>4,753 Free Online Tools • No Signup • 100% Client-Side</span>
            </h1>
            <p className="text-sm md:text-base text-[#475569] text-center max-w-3xl mx-auto">
              PDF Studio, Image Processing, Financial &amp; Loan Calculators, ATS Resume Optimization, and Developer Tools — Runs directly in your browser RAM with zero file uploads.
            </p>
          </div>

          {/* Placement A: Homepage Top Banner - 728x90 responsive */}
          <div className="w-full">
            <AdUnitTopBanner />
          </div>

          {/* Tool of the Day Rotating Highlight */}
          <ToolOfTheDay 
            onOpenTool={(slug) => {
              recordToolUse(slug);
              navigateTo(`/tools/${slug}`);
            }} 
          />

          {/* ROYAL ELEGANT 3-LEVEL CATEGORY SYSTEM: 6 BOXES + BIG NOTION BOX + SUBCATEGORIES + TOOLS */}
          <RoyalCategoryExplorer 
            onSelectTool={handleOpenTool}
            onNavigateTo={navigateTo}
          />

          {/* Center Bottom AdSense 728x90 */}
          <div className="w-full pt-2">
            <AdSenseBanner format="728x90" slotName="CenterBottom" />
          </div>

          {/* 1,000-Word SEO Article + 10 FAQs below tools grid */}
          <HomepageSEOContent onNavigateTo={navigateTo} />

          {/* Email Newsletter & VIP Tool Releases */}
          <EmailCapture />

          {/* Footer Component with 500-word SEO text and Real Page Links */}
          <Footer onNavigate={navigateTo} />

        </main>

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

      </div>
    );
  };

  return (
    <>
      <PWAInstallBanner />
      {renderCurrentPage()}
      <AiChatbotWidget
        onOpenTool={(slug) => {
          recordToolUse(slug);
          navigateTo('/tools/' + slug);
        }}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}
