import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, ShieldCheck, Sparkles, CheckCircle2, 
  RotateCcw, Database, Table, Zap, Layers, ExternalLink,
  ChevronRight, ArrowUpRight
} from 'lucide-react';
import { 
  MASTER_CATEGORIES, 
  MasterCategory, 
  MasterSubcategory, 
  MasterToolItem 
} from '../data/masterCategoryData';
import { DedicatedSingleToolModal } from './DedicatedSingleToolModal';

interface RoyalCategoryExplorerProps {
  onSelectTool?: (toolId: string) => void;
  onNavigateTo?: (path: string) => void;
}

// 25 Notion Presets as specified
const NOTION_PRESET_CHIPS = [
  { id: 'preset-content-calendar', label: '📅 Content Calendar' },
  { id: 'preset-product-roadmap', label: '🚀 Product Roadmap' },
  { id: 'preset-habit-tracker', label: '⚡ Habit Tracker' },
  { id: 'preset-job-crm', label: '💼 Job CRM' },
  { id: 'preset-budget-log', label: '💰 Budget Log' },
  { id: 'preset-reading-list', label: '📚 Reading List' },
  { id: 'preset-goal-tracker', label: '🎯 Goal Tracker' },
  { id: 'preset-task-manager', label: '✅ Task Manager' },
  { id: 'preset-idea-bank', label: '💡 Idea Bank' },
  { id: 'preset-meeting-notes', label: '📝 Meeting Notes' },
  { id: 'preset-client-database', label: '👥 Client Database' },
  { id: 'preset-inventory-tracker', label: '📦 Inventory Tracker' },
  { id: 'preset-editorial-calendar', label: '🗓️ Editorial Calendar' },
  { id: 'preset-real-estate-crm', label: '🏠 Real Estate CRM' },
  { id: 'preset-student-dashboard', label: '🎓 Student Dashboard' },
  { id: 'preset-fitness-tracker', label: '💪 Fitness Tracker' },
  { id: 'preset-meal-planner', label: '🍽️ Meal Planner' },
  { id: 'preset-travel-planner', label: '✈️ Travel Planner' },
  { id: 'preset-expense-tracker', label: '💸 Expense Tracker' },
  { id: 'preset-email-campaign', label: '📧 Email Campaign Tracker' },
  { id: 'preset-movie-watchlist', label: '🎬 Movie Watchlist' },
  { id: 'preset-music-library', label: '🎵 Music Library' },
  { id: 'preset-recipe-book', label: '🍳 Recipe Book' },
  { id: 'preset-okr-tracker', label: '📊 OKR Tracker' },
  { id: 'preset-knowledge-base', label: '🧠 Knowledge Base' },
];

export const RoyalCategoryExplorer: React.FC<RoyalCategoryExplorerProps> = ({
  onSelectTool,
  onNavigateTo
}) => {
  // Category state (Default selected: PDF Suite)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('pdf');
  
  // Subcategory state (Default selected: Convert)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('pdf-convert');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dedicated single tool modal state
  const [activeSingleTool, setActiveSingleTool] = useState<MasterToolItem | null>(null);

  // Show toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Active Category Object
  const currentCategory = useMemo(() => {
    return MASTER_CATEGORIES.find(c => c.id === selectedCategoryId) || MASTER_CATEGORIES[0];
  }, [selectedCategoryId]);

  // Active Subcategory Object
  const currentSubcategory = useMemo(() => {
    const found = currentCategory.subcategories.find(s => s.id === selectedSubcategoryId);
    return found || currentCategory.subcategories[0] || null;
  }, [currentCategory, selectedSubcategoryId]);

  // Handler to open single tool - Navigates directly to dedicated single tool page
  const openSingleTool = (tool: MasterToolItem) => {
    const slug = tool.slug || tool.id;
    if (onNavigateTo) {
      onNavigateTo(`/tools/${slug}`);
    } else if (onSelectTool) {
      onSelectTool(tool.id);
    } else {
      setActiveSingleTool(tool);
    }
  };

  // 1. CATEGORY SELECTION UX FIX: Auto-scroll + Active highlight + Toast
  const handleCategorySelect = (catId: string) => {
    const cat = MASTER_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    setSelectedCategoryId(catId);
    if (cat.subcategories.length > 0) {
      setSelectedSubcategoryId(cat.subcategories[0].id);
    }
    // Visual feedback toast
    showToast(`${cat.name} selected - ${cat.subcategories.length} subcategories loaded below ↓`);
    // Auto-scroll after 300ms to subcategory section
    setTimeout(() => {
      document.getElementById('subcategory-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  // 3. SUBCATEGORY SELECTION UX FIX: Auto-scroll + Active highlight + Toast
  const handleSubcategorySelect = (subId: string) => {
    setSelectedSubcategoryId(subId);
    const sub = currentCategory.subcategories.find(s => s.id === subId);
    if (sub) {
      showToast(`${sub.name} selected - ${sub.tools.length} tools loaded below ↓`);
    }
    // Auto-scroll after 300ms to tools section
    setTimeout(() => {
      document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategoryId('pdf');
    setSelectedSubcategoryId('pdf-convert');
    showToast('Filters reset to default PDF Suite');
  };

  return (
    <div className="w-full space-y-10 my-6 font-sans">
      
      {/* ======================================================== */}
      {/* 5. STEPPER PROGRESS BAR - TOP BELOW HEADER               */}
      {/* ======================================================== */}
      <div className="w-full bg-[#0A1931]/95 border border-[#D4AF37]/30 rounded-xl px-4 py-3 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto shadow-md">
        <span className={currentCategory ? 'text-green-400 font-bold flex items-center gap-1.5 whitespace-nowrap' : 'text-gray-400 flex items-center gap-1.5 whitespace-nowrap'}>
          <span>●</span> Step 1: Category {currentCategory ? `✓ ${currentCategory.name}` : ''}
        </span>
        <span className="text-[#D4AF37]/60">→</span>
        <span className={currentSubcategory ? 'text-green-400 font-bold flex items-center gap-1.5 whitespace-nowrap' : 'text-gray-400 flex items-center gap-1.5 whitespace-nowrap'}>
          <span>●</span> Step 2: Subcategory {currentSubcategory ? `✓ ${currentSubcategory.name}` : ''}
        </span>
        <span className="text-[#D4AF37]/60">→</span>
        <span className="text-[#D4AF37] font-bold flex items-center gap-1.5 whitespace-nowrap animate-pulse">
          <span>○</span> Step 3: Choose Tool
        </span>
        <span className="text-[#D4AF37]/60">→</span>
        <span className="text-gray-400 flex items-center gap-1.5 whitespace-nowrap">
          <span>○</span> Step 4: Use Tool
        </span>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1 - 6 CATEGORY BOXES (2 Rows x 3 Columns)       */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
              Select Category Suite
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Click any category box below to explore its subcategories and single tool pages.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#0F2340] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold px-3 py-1 rounded-full font-mono">
              4,753 Tools Active
            </span>
          </div>
        </div>

        {/* 6 Category Grid: 3 columns desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MASTER_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`min-h-[180px] rounded-xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected 
                    ? 'border-[#D4AF37] border-2 shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-[#D4AF37]/10 relative ring-2 ring-[#D4AF37]' 
                    : 'bg-[#0F2340] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.18)] hover:-translate-y-0.5'
                }`}
              >
                {/* Checkmark in top-right when selected */}
                {isSelected && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shadow-md z-10">
                    ✓
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0A1931] border border-[#D4AF37]/30 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                      {cat.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="bg-[#D4AF37] text-[#0A1931] text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                          SELECTED
                        </span>
                      )}
                      <span className="bg-[#0A1931] text-[#D4AF37] text-xs font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/30 font-mono">
                        {cat.countDisplay}
                      </span>
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold transition-colors ${
                    isSelected ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'
                  }`}>
                    {cat.name}
                  </h3>

                  <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {isSelected ? (
                  <div className="mt-3 text-[#D4AF37] text-xs font-bold animate-bounce flex items-center gap-1.5 pt-3 border-t border-[#D4AF37]/20">
                    <span>▼ {cat.subcategories.length} subcategories below ↓</span>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                    <span>Browse Tools</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2 - BIG NOTION BOX (3 BOXES WIDTH - FULL ROW)    */}
      {/* ======================================================== */}
      <section className="w-full">
        <div className="w-full min-h-[300px] bg-[#0A1931] border-2 border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.25)] border-l-4 border-l-[#D4AF37]">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Custom Notion Template & Database Builder
                </h3>
                <span className="bg-[#D4AF37] text-[#0A1931] text-xs font-black px-2.5 py-0.5 rounded-full font-mono uppercase shadow-sm">
                  NEW
                </span>
                <span className="bg-[#0A1931] text-[#D4AF37] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 font-mono">
                  233 tools
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
                Design custom Notion databases with Title, Multi-select, Status, Date, Rating, Progress & 18 column types. Interactive live table preview, instant dummy data, and 1-click CSV download ready to import into Notion.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  if (onNavigateTo) onNavigateTo('/tools/notion-template-builder');
                  else if (onSelectTool) onSelectTool('notion-template-builder');
                }}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Custom Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Features Highlights */}
          <div className="py-4 flex flex-wrap items-center gap-2 text-xs font-mono text-[#D4AF37]">
            <span className="bg-[#0F2340] px-3 py-1 rounded-lg border border-[#D4AF37]/20">18 Column Types</span>
            <span className="text-gray-500">•</span>
            <span className="bg-[#0F2340] px-3 py-1 rounded-lg border border-[#D4AF37]/20">Live Table Preview</span>
            <span className="text-gray-500">•</span>
            <span className="bg-[#0F2340] px-3 py-1 rounded-lg border border-[#D4AF37]/20">Instant Dummy Data</span>
            <span className="text-gray-500">•</span>
            <span className="bg-[#0F2340] px-3 py-1 rounded-lg border border-[#D4AF37]/20">1-Click CSV Download</span>
            <span className="text-gray-500">•</span>
            <span className="bg-[#0F2340] px-3 py-1 rounded-lg border border-[#D4AF37]/20 text-emerald-400">Zero Signup</span>
          </div>

          {/* Mini Live Preview: Small table 3 rows x 4 cols */}
          <div className="my-4 bg-[#0F2340] border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-inner">
            <div className="bg-[#0A1931] px-4 py-2 border-b border-[#D4AF37]/20 flex items-center justify-between text-xs text-gray-300">
              <span className="font-mono text-[#D4AF37] flex items-center gap-1.5 font-bold">
                <Table className="w-3.5 h-3.5" /> Live Notion Database Preview
              </span>
              <span className="text-[11px] text-gray-400">Sample: Content Calendar</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#D4AF37]/20 bg-[#0A1931]/60 text-gray-300">
                    <th className="p-2.5 font-semibold">Title</th>
                    <th className="p-2.5 font-semibold">Status</th>
                    <th className="p-2.5 font-semibold">Due Date</th>
                    <th className="p-2.5 font-semibold">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/10 text-gray-200">
                  <tr>
                    <td className="p-2.5 font-medium text-white">Q3 Product Launch Video</td>
                    <td className="p-2.5"><span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[11px]">In Progress</span></td>
                    <td className="p-2.5 text-gray-300">Oct 14, 2026</td>
                    <td className="p-2.5 text-[#D4AF37]">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">ATS Optimization Guide</td>
                    <td className="p-2.5"><span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded text-[11px]">Completed</span></td>
                    <td className="p-2.5 text-gray-300">Oct 18, 2026</td>
                    <td className="p-2.5 text-[#D4AF37]">⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Engineering Sprint Review</td>
                    <td className="p-2.5"><span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[11px]">Planned</span></td>
                    <td className="p-2.5 text-gray-300">Oct 22, 2026</td>
                    <td className="p-2.5 text-[#D4AF37]">⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 25 Preset Chips (Horizontal Scrollable) */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="font-semibold text-white">25 Popular Notion Presets (Click any to load):</span>
              <span className="text-[11px] text-[#D4AF37]">Scroll horizontally →</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {NOTION_PRESET_CHIPS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    if (onNavigateTo) onNavigateTo('/tools/notion-template-builder');
                    else if (onSelectTool) onSelectTool(preset.id);
                  }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#0F2340] border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs text-gray-200 hover:text-white transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SUBCATEGORY SECTION - ADD ID AND HIGHLIGHT            */}
      {/* ======================================================== */}
      {currentCategory && (
        <section id="subcategory-section" className="mt-8 scroll-mt-24 space-y-5 pt-2">
          {/* Connecting line from category */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto -mt-4 mb-4"></div>

          {/* Subcategory Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0F2340] border border-[#D4AF37]/40 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-[#D4AF37] rounded-full shrink-0"></div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>{currentCategory.icon}</span>
                  <span>
                    {currentCategory.name} Subcategories & Tool Operations - {currentCategory.count} Utilities Available
                  </span>
                </h2>
                <p className="text-xs text-gray-300 mt-0.5">
                  Click any subcategory card below to view its single tools or open individual tools directly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="flex items-center gap-1 text-[#D4AF37] animate-pulse text-xs font-bold">
                <span>↓ Scroll down - Subcategories loaded</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-1.5 rounded-lg bg-[#0A1931] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          </div>

          {/* Grid: 3 columns subcategory cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategory.subcategories.map((sub) => {
              const isSubSelected = selectedSubcategoryId === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSubcategorySelect(sub.id)}
                  className={`rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                    isSubSelected
                      ? 'border-[#D4AF37] border-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37]'
                      : 'bg-[#0A1931] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0F2340]'
                  }`}
                >
                  {/* Top-right checkmark when active */}
                  {isSubSelected && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md z-10">
                      ✓
                    </span>
                  )}

                  <div>
                    {/* Header: Title + Dynamic Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`text-base font-bold transition-colors ${
                        isSubSelected ? 'text-[#D4AF37]' : 'text-white'
                      }`}>
                        {sub.name}
                      </h4>
                      <span className="bg-[#0F2340] text-[#D4AF37] text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                        {sub.tools.length} tools
                      </span>
                    </div>

                    {/* Preview chips as clickable buttons -> Direct single tool page! */}
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {sub.chips.map((chip, chipIdx) => {
                        // Find matching tool item or fallback
                        const matchingTool = sub.tools.find(t => 
                          t.name.toLowerCase().includes(chip.toLowerCase()) || 
                          chip.toLowerCase().includes(t.name.toLowerCase())
                        ) || sub.tools[chipIdx % sub.tools.length] || {
                          id: `${sub.id}-${chipIdx}`,
                          slug: `${sub.id}-${chipIdx}`,
                          name: chip,
                          description: `Dedicated ${chip} tool page with 100% offline client-side processing.`,
                          category: currentCategory.id,
                          subcategory: sub.name,
                          categoryName: currentCategory.name
                        };

                        return (
                          <button
                            key={chipIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              openSingleTool(matchingTool);
                            }}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#0F2340] hover:bg-[#D4AF37] text-gray-200 hover:text-[#0A1931] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all cursor-pointer flex items-center gap-1 group/chip"
                          >
                            <span>{chip}</span>
                            <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover/chip:opacity-100" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer button */}
                  <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                    {isSubSelected ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="bg-[#D4AF37] text-[#0A1931] px-2 py-0.5 rounded text-xs font-bold">
                          ACTIVE - Tools below ↓
                        </span>
                        <span className="text-[#D4AF37] animate-bounce text-sm">↓</span>
                      </div>
                    ) : (
                      <>
                        <span>Select Subcategory ({sub.tools.length})</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. TOOLS SECTION - ADD ID & STICKY BREADCRUMB           */}
      {/* ======================================================== */}
      {currentSubcategory && (
        <section id="tools-section" className="mt-8 scroll-mt-24 space-y-4 pt-2">
          {/* Sticky Breadcrumb */}
          <div className="sticky top-14 z-20 bg-[#0A1931]/95 backdrop-blur p-3 rounded-xl mb-4 border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-400">Home</span>
              <span className="text-gray-500">&gt;</span>
              <span className="text-[#D4AF37] font-semibold">{currentCategory.name}</span>
              <span className="text-gray-500">&gt;</span>
              <span className="text-white font-bold">{currentSubcategory.name}</span>
              <span className="text-xs font-mono text-[#D4AF37] bg-[#0F2340] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full ml-1">
                {currentSubcategory.tools.length} Tools
              </span>
            </div>
            <span className="text-emerald-400 font-mono font-bold text-[11px] bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/40 self-start sm:self-auto">
              Single Tool Pages Active
            </span>
          </div>

          {/* Tools List Header with matched count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#0F2340] border border-[#D4AF37]/40 rounded-xl p-3.5 px-4 mb-2 shadow-md">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Tools in '{currentSubcategory.name}'</span>
              <span className="text-[#D4AF37] font-mono text-xs sm:text-sm bg-[#0A1931] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full">
                ({currentSubcategory.tools.length} ITEMS)
              </span>
            </h3>
            <span className="text-xs text-gray-300">
              Single Tool Pages • 100% Client-Side Processing
            </span>
          </div>

          {/* Connecting line */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto -mt-2 mb-4"></div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSubcategory.tools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => openSingleTool(tool)}
                className="bg-[#0A1931] border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {tool.name}
                    </h4>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Single Tool Page
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded">
                      Working 100%
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 6. TOAST NOTIFICATION                                    */}
      {/* ======================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0A1931] px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-bold text-sm flex items-center gap-2 border-2 border-[#0A1931]">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 5 - SINGLE TOOL PAGE MODAL / DEDICATED VIEW     */}
      {/* ======================================================== */}
      {activeSingleTool && (
        <DedicatedSingleToolModal
          tool={activeSingleTool}
          categoryName={currentCategory.name}
          subcategoryName={currentSubcategory ? currentSubcategory.name : currentCategory.name}
          relatedTools={currentSubcategory ? currentSubcategory.tools.filter(t => t.id !== activeSingleTool.id) : []}
          onClose={() => setActiveSingleTool(null)}
          onSelectTool={(tool) => setActiveSingleTool(tool)}
          onNavigateTo={onNavigateTo}
        />
      )}

    </div>
  );
};
