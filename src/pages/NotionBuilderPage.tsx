import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ShieldCheck, Sparkles, Search, Layers, 
  Check, CheckCircle2, Download, Table, X
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { AdUnitTopBanner, AdUnitInFeed } from '../components/AdUnits';
import { Footer } from '../components/Footer';
import { NotionColumnConfig, NotionPropertyType, NotionPresetTemplate } from '../types';
import { NOTION_PROPERTY_TYPES, NOTION_PRESETS } from '../components/tools/notionBuilderCatalog';
import { generateSampleValue } from '../components/tools/notionBuilderEngine';
import { NotionPropertySelector } from '../components/tools/notion/NotionPropertySelector';
import { NotionLiveTable } from '../components/tools/notion/NotionLiveTable';
import { NotionPresetsSidebar } from '../components/tools/notion/NotionPresetsSidebar';
import { NotionImportGuide } from '../components/tools/notion/NotionImportGuide';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ALL_DIRECTORY_TOOLS } from '../data/allToolsDirectory';

interface NotionBuilderPageProps {
  onNavigateHome: () => void;
  onNavigateTo?: (path: string) => void;
}

export const NotionBuilderPage: React.FC<NotionBuilderPageProps> = ({
  onNavigateHome,
  onNavigateTo
}) => {
  // Initial default schema: Content Calendar (Preset #1)
  const defaultPreset = NOTION_PRESETS[0];

  const [dbTitle, setDbTitle] = useState(defaultPreset.name);
  const [dbIcon, setDbIcon] = useState(defaultPreset.icon);
  const [activePresetName, setActivePresetName] = useState(defaultPreset.name);

  const [columns, setColumns] = useState<NotionColumnConfig[]>(() =>
    JSON.parse(JSON.stringify(defaultPreset.columns))
  );

  const [rows, setRows] = useState<Record<string, any>[]>(() =>
    JSON.parse(JSON.stringify(defaultPreset.initialRows))
  );

  // Search input in header
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isHeaderSearchOpen, setIsHeaderSearchOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const presetsSectionRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // SEO Title & JSON-LD Structured Data
  useEffect(() => {
    document.title = 'Custom Notion Template & Database Builder (4753 Tools) | FreeToolsNoSignup';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Design custom Notion databases with 18 column types and 25 presets. Live table preview, dummy data auto-fill, and 1-click CSV download ready to import into Notion. 100% free with no signup.'
    );

    // Check if URL specifies section=presets or #presets to scroll
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      if (url.includes('presets') || window.location.hash === '#presets') {
        setTimeout(() => {
          const el = document.getElementById('presets') || document.getElementById('presets-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  }, []);

  // Filter tools for header search
  const filteredTools = headerSearchQuery.trim()
    ? ALL_DIRECTORY_TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(headerSearchQuery.toLowerCase()) ||
          t.categoryName.toLowerCase().includes(headerSearchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  // Add Property Handler (18 types)
  const handleAddProperty = (propType: NotionPropertyType) => {
    const propDef = NOTION_PROPERTY_TYPES.find((p) => p.type === propType);
    if (!propDef) return;

    // Generate unique column ID and name
    let count = 1;
    let colName = propDef.defaultColumnName;
    while (columns.some((c) => c.name.toLowerCase() === colName.toLowerCase())) {
      count++;
      colName = `${propDef.defaultColumnName} ${count}`;
    }

    const newColumnId = `col-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newCol: NotionColumnConfig = {
      id: newColumnId,
      name: colName,
      type: propType,
      options: propDef.defaultOptions ? JSON.parse(JSON.stringify(propDef.defaultOptions)) : undefined
    };

    const nextColumns = [...columns, newCol];
    setColumns(nextColumns);

    // Auto-fill a sample value in all existing rows for this new column
    const nextRows = rows.map((row, idx) => ({
      ...row,
      [newColumnId]: generateSampleValue(propType, newCol, idx)
    }));
    setRows(nextRows);

    showToast(`Added "${colName}" (${propType}) to database schema!`);
  };

  // Remove Column
  const handleRemoveColumn = (colId: string) => {
    const target = columns.find((c) => c.id === colId);
    if (target?.type === 'title') {
      showToast('The Title property is required for Notion databases and cannot be removed.');
      return;
    }

    setColumns((prev) => prev.filter((c) => c.id !== colId));
    setRows((prev) =>
      prev.map((r) => {
        const copy = { ...r };
        delete copy[colId];
        return copy;
      })
    );
    showToast(`Removed column from schema.`);
  };

  // Rename Column
  const handleRenameColumn = (colId: string, newName: string) => {
    setColumns((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, name: newName } : c))
    );
  };

  // Move Column Reorder
  const handleMoveColumn = (index: number, direction: 'up' | 'down' | 'left' | 'right') => {
    const delta = direction === 'up' || direction === 'left' ? -1 : 1;
    const targetIndex = index + delta;
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    const nextCols = [...columns];
    const temp = nextCols[index];
    nextCols[index] = nextCols[targetIndex];
    nextCols[targetIndex] = temp;
    setColumns(nextCols);
  };

  // Update Cell Value
  const handleUpdateCell = (rowIndex: number, colId: string, value: any) => {
    setRows((prev) => {
      const next = [...prev];
      if (next[rowIndex]) {
        next[rowIndex] = { ...next[rowIndex], [colId]: value };
      }
      return next;
    });
  };

  // Add Row
  const handleAddRow = () => {
    const newRow: Record<string, any> = {};
    columns.forEach((col) => {
      newRow[col.id] = generateSampleValue(col.type, col, rows.length);
    });
    setRows((prev) => [...prev, newRow]);
    showToast('Added new record row.');
  };

  // Auto-fill 5 sample rows
  const handleAutoFillRows = () => {
    const freshRows: Record<string, any>[] = [];
    for (let i = 0; i < 5; i++) {
      const row: Record<string, any> = {};
      columns.forEach((col) => {
        row[col.id] = generateSampleValue(col.type, col, i);
      });
      freshRows.push(row);
    }
    setRows(freshRows);
    showToast('Auto-generated 5 realistic test rows.');
  };

  // Clear Rows
  const handleClearRows = () => {
    setRows([]);
    showToast('Cleared all rows.');
  };

  // Delete Row
  const handleDeleteRow = (rowIndex: number) => {
    setRows((prev) => prev.filter((_, idx) => idx !== rowIndex));
    showToast('Row deleted.');
  };

  // Load Preset
  const handleSelectPreset = (preset: NotionPresetTemplate) => {
    setDbTitle(preset.name);
    setDbIcon(preset.icon);
    setActivePresetName(preset.name);
    setColumns(JSON.parse(JSON.stringify(preset.columns)));
    setRows(JSON.parse(JSON.stringify(preset.initialRows)));

    showToast(`Loaded "${preset.name}" template with ${preset.columns.length} columns!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1931] flex flex-col font-sans selection:bg-[#C5A059]/20 selection:text-[#0A1931]">
      
      {/* Dynamic Floating Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0A1931] text-white border border-[#C5A059] px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 duration-200">
          <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Top Header: Matching Other Tools with 4753 Count and Search Bar */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo & Back to Home */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-200 text-[#0A1931] font-bold text-xs border border-[#E2E8F0] transition-colors cursor-pointer"
              title="Return to Home directory"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          {/* Search Bar Across All 4,753 Tools */}
          <div className="flex-1 max-w-lg relative hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={headerSearchQuery}
                onChange={(e) => {
                  setHeaderSearchQuery(e.target.value);
                  setIsHeaderSearchOpen(true);
                }}
                onFocus={() => setIsHeaderSearchOpen(true)}
                placeholder="Search 4,753 free browser tools (PDF, ATS, Dev, Notion)..."
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#C5A059] focus:bg-white focus:outline-hidden rounded-xl pl-9 pr-4 py-1.5 text-xs text-[#0A1931] font-medium transition-all"
              />
              {headerSearchQuery && (
                <button
                  onClick={() => setHeaderSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Search Dropdown */}
            {isHeaderSearchOpen && filteredTools.length > 0 && (
              <div className="absolute top-11 left-0 right-0 z-50 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 space-y-1">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      setIsHeaderSearchOpen(false);
                      setHeaderSearchQuery('');
                      if (onNavigateTo) {
                        onNavigateTo(`/tools/${tool.slug || tool.id}`);
                      }
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] cursor-pointer text-xs"
                  >
                    <span className="font-bold text-[#0A1931]">{tool.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {tool.categoryName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Header Status Badges */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <LanguageSwitcher />

            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1931]/5 border border-[#0A1931]/10 text-xs font-semibold text-[#0A1931]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>4,753 Tools Active</span>
            </div>

            {/* In-Browser Privacy Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Client-Side</span>
            </div>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[#0A1931] transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <span className="text-slate-500">Notion Database Suite</span>
          <span>/</span>
          <span className="text-[#0A1931] font-bold">Custom Notion Template & Database Builder</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#0A1931] text-[#C5A059] text-xs font-black uppercase tracking-wider">
              DABBA #7 • NOTION SUITE
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-[#C5A059] border border-amber-200 text-xs font-bold">
              18 Property Types
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
              25 Ready Presets
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              100% Free • No Signup
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#0A1931] tracking-tight leading-tight">
            Custom Notion Template & Database Builder
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
            Design custom Notion databases with Title, Multi-select, Status, Date, Rating, Progress & 18 column types. Interactive live table preview, instant dummy data, and 1-click CSV download ready to import into Notion.
          </p>
        </section>

        {/* 3-Panel Builder Workspace: Left (30%) / Center (50%) / Right (20%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel (approx 30%): Add Property & Active Schema */}
          <div className="lg:col-span-4 xl:col-span-3">
            <NotionPropertySelector
              columns={columns}
              onAddProperty={handleAddProperty}
              onRemoveColumn={handleRemoveColumn}
              onRenameColumn={handleRenameColumn}
              onMoveColumn={(idx, dir) => handleMoveColumn(idx, dir)}
            />
          </div>

          {/* Center Panel (approx 50%): Live Notion-Style Table Preview */}
          <div className="lg:col-span-8 xl:col-span-6">
            <NotionLiveTable
              dbTitle={dbTitle}
              dbIcon={dbIcon}
              columns={columns}
              rows={rows}
              onTitleChange={setDbTitle}
              onIconChange={setDbIcon}
              onUpdateCell={handleUpdateCell}
              onAddRow={handleAddRow}
              onAutoFillRows={handleAutoFillRows}
              onClearRows={handleClearRows}
              onDeleteRow={handleDeleteRow}
              onMoveColumn={(idx, dir) => handleMoveColumn(idx, dir)}
              onDeleteColumn={handleRemoveColumn}
              showToast={showToast}
            />
          </div>

          {/* Right Panel (approx 20%): 25 Presets Grid */}
          <div ref={presetsSectionRef} className="lg:col-span-12 xl:col-span-3">
            <NotionPresetsSidebar
              onSelectPreset={handleSelectPreset}
              activePresetName={activePresetName}
            />
          </div>

        </div>

        {/* Bottom Section: 3-Step Notion Import Guide & FAQs */}
        <NotionImportGuide />

        {/* In-Feed AdSense Banner */}
        <div className="pt-4">
          <AdUnitInFeed />
        </div>

      </main>

      {/* Footer */}
      <Footer onNavigateTo={onNavigateTo || onNavigateHome} />

    </div>
  );
};
