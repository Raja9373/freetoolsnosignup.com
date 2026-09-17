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
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('convert');

  // Dedicated single tool modal state
  const [activeSingleTool, setActiveSingleTool] = useState<MasterToolItem | null>(null);

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

  // Handler for category selection
  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    const cat = MASTER_CATEGORIES.find(c => c.id === catId);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSubcategoryId(cat.subcategories[0].id);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategoryId('pdf');
    setSelectedSubcategoryId('convert');
  };

  return (
    <div className="w-full space-y-10 my-6 font-sans">
      
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
                onClick={() => handleSelectCategory(cat.id)}
                className={`min-h-[180px] rounded-xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected 
                    ? 'bg-[#0A1931] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)] ring-1 ring-[#D4AF37]' 
                    : 'bg-[#0F2340] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.18)] hover:-translate-y-0.5'
                }`}
              >
                {/* Subtle corner badge / glow */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0A1931] border border-[#D4AF37]/30 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="bg-[#0A1931] text-[#D4AF37] text-xs font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/30 font-mono">
                      {cat.countDisplay}
                    </span>
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

                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                  <span>{isSelected ? 'Active Suite Selected' : 'Browse Tools'}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                </div>
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
      {/* SECTION 3 - SUBCATEGORIES (Shown BELOW Notion box)       */}
      {/* ======================================================== */}
      {currentCategory && (
        <section className="space-y-5 pt-2">
          {/* Subcategory Header with Reset Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0F2340] border border-[#D4AF37]/30 rounded-xl p-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{currentCategory.icon}</span>
                <span>{currentCategory.name} Subcategories & Tool Operations</span>
              </h3>
              <p className="text-xs text-gray-300 mt-0.5">
                {currentCategory.countDisplay} available • Click any subcategory card or click individual preview chips for iLovePDF-style single tool pages.
              </p>
            </div>

            <button
              onClick={handleResetFilters}
              className="px-3.5 py-1.5 rounded-lg bg-[#0A1931] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>

          {/* Grid: 3 columns subcategory cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategory.subcategories.map((sub) => {
              const isSubSelected = selectedSubcategoryId === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubcategoryId(sub.id)}
                  className={`rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSubSelected
                      ? 'bg-[#0A1931] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]'
                      : 'bg-[#0A1931] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0F2340]'
                  }`}
                >
                  <div>
                    {/* Header: Title + Dynamic Badge (e.g. 28 tools, 15 tools - NEVER 320!) */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`text-base font-bold transition-colors ${
                        isSubSelected ? 'text-[#D4AF37]' : 'text-white'
                      }`}>
                        {sub.name}
                      </h4>
                      <span className="bg-[#0F2340] text-[#D4AF37] text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                        {sub.count} tools
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
                    <span>Select Subcategory ({sub.count})</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSubSelected ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* SECTION 4 - TOOLS LIST (When subcategory clicked)         */}
      {/* ======================================================== */}
      {currentSubcategory && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Tools in '{currentSubcategory.name}'</span>
                <span className="text-xs font-mono text-[#D4AF37] bg-[#0A1931] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                  {currentSubcategory.tools.length} Items
                </span>
              </h3>
              <p className="text-xs text-gray-300 mt-0.5">
                Every tool opens in its own dedicated single page with working client-side processing.
              </p>
            </div>
          </div>

          {/* Grid: 3 columns tool cards */}
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
