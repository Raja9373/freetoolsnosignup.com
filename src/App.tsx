import React, { useState, useEffect } from 'react';
import { 
  Search, Command, Sparkles, Flame, ShieldCheck, 
  Zap, Menu, X, Check, Heart, ExternalLink, ArrowRight
} from 'lucide-react';
import { ToolCategory, RecentTool } from './types';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { DabbaGrid } from './components/DabbaGrid';
import { CommandKSearch } from './components/CommandKSearch';
import { AdSenseBanner } from './components/AdSenseBanner';
import { Footer } from './components/Footer';
import { AllCategoryModal } from './components/AllCategoryModal';

// Interactive Tool Modals
import { ATSToolModal } from './components/tools/ATSToolModal';
import { AIDetectorModal } from './components/tools/AIDetectorModal';
import { FakeDataModal } from './components/tools/FakeDataModal';
import { PDFToolsModal } from './components/tools/PDFToolsModal';
import { ImageCompressorModal } from './components/tools/ImageCompressorModal';
import { CalculatorModal } from './components/tools/CalculatorModal';
import { JSONFormatterModal } from './components/tools/JSONFormatterModal';
import { QRGeneratorModal } from './components/tools/QRGeneratorModal';
import { TOOLS_DATABASE } from './data/toolsData';

export default function App() {
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
      <header className="lg:hidden bg-white border-b border-slate-200 p-3.5 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
              FTNS
            </span>
            <span className="font-extrabold text-sm text-slate-900">
              FreeToolsNoSignup<span className="text-amber-500">.com</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsCmdKOpen(true)}
          className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs flex items-center gap-1"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
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
          
          {/* Top Leaderboard AdSense 728x90 */}
          <div className="w-full">
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
                placeholder="Search 495 working tools (ATS check, AI detector, PDF merge, Fake Data)..."
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
                { id: 'all', label: 'All (495)' },
                { id: 'job-ats', label: '💼 Job / ATS (50)' },
                { id: 'ai-study', label: '🎓 AI Study (50)' },
                { id: 'dev-pro', label: '💻 Dev Pro (100)' },
                { id: 'pdf', label: '📄 PDF (54)' },
                { id: 'image', label: '🖼️ Image (40)' },
                { id: 'calculator', label: '🧮 Calculators (201)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryFilter(tab.id)}
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
                <span>Matching Tools ({filteredTools.length})</span>
                <button onClick={() => setSearchFilter('')} className="text-amber-600 hover:underline">
                  Clear search
                </button>
              </div>

              {filteredTools.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-sm">
                  No tools found for "{searchFilter}". Try another keyword.
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
                        Run Tool →
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
              <span>World's Largest WORKING Tools Platform</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              The World's Largest Working Tools Platform — <span className="underline decoration-amber-400 decoration-4">495 Tools That Actually Work</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Zero signup walls, zero subscription traps, and zero watermarks. All 495 tools run 100% in your browser for unmatched privacy, speed, and reliability.
            </p>

            {/* Value Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Free Forever
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Private In-Browser Sandbox
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> No Watermarks Ever
              </span>
            </div>
          </div>

          {/* THE 6 DABBA GRID (2 Rows x 3 Columns) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Featured Tool Categories</span>
                <span className="text-xs font-normal text-slate-400">6 Working Clusters</span>
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

          {/* Footer Component with 500-word SEO text and Policy Modals */}
          <Footer />

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

      {/* 1. ATS Resume Score Checker */}
      {(selectedToolId === 'ats-checker' || selectedToolId === 'resume-builder' || selectedToolId === 'cover-letter-gen') && (
        <ATSToolModal
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 2. AI Content Detector & Humanizer */}
      {(selectedToolId === 'ai-detector' || selectedToolId === 'essay-paraphraser' || selectedToolId === 'plagiarism-remover') && (
        <AIDetectorModal
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 3. Fake Data & Card Generator */}
      {(selectedToolId === 'fake-data-generator') && (
        <FakeDataModal
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 4. PDF Merge & Utilities */}
      {(selectedToolId === 'pdf-merge' || selectedToolId === 'pdf-split' || selectedToolId === 'pdf-compress' || selectedToolId === 'pdf-to-word') && (
        <PDFToolsModal
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 5. Image Compressor & Resizer */}
      {(selectedToolId === 'image-compressor' || selectedToolId === 'bg-remover' || selectedToolId === 'image-resizer' || selectedToolId === 'image-converter') && (
        <ImageCompressorModal
          onClose={() => setSelectedToolId(null)}
          onRecordUse={recordToolUse}
        />
      )}

      {/* 6. Calculators (EMI, SIP, BMI) */}
      {(selectedToolId === 'emi-calculator' || selectedToolId === 'compound-interest-calc' || selectedToolId === 'bmi-calculator' || selectedToolId === 'salary-takehome-calc') && (
        <CalculatorModal
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
