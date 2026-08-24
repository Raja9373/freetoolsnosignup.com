import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  X, Download, Copy, Check, Sparkles, Plus, Trash2, 
  ArrowUp, ArrowDown, HelpCircle, FileText, Database, 
  Settings2, Eye, LayoutGrid, ListFilter, Table, 
  Calendar, User, Hash, CheckSquare, Link, Mail, 
  Phone, AlignLeft, Paperclip, Star, Percent, 
  Clock, History, Cpu, Tag, Tags, CheckCircle2, 
  RefreshCw, Layers, ExternalLink, ChevronDown, 
  SlidersHorizontal, ChevronRight, Share2, BookOpen,
  Search, ArrowRight, CheckCircle, RotateCcw
} from 'lucide-react';
import { 
  NotionColumnConfig, NotionPropertyType, 
  NotionSelectOption, NotionPresetTemplate 
} from '../../types';
import { 
  NOTION_PROPERTY_TYPES, NOTION_PRESETS, getPresetTypeTag 
} from './notionBuilderCatalog';
import { 
  NOTION_COLOR_CLASSES, generateSampleValue, 
  generateNotionCSV, generateNotionJSON, 
  generateNotionMarkdown, triggerFileDownload 
} from './notionBuilderEngine';

interface NotionTemplateBuilderProps {
  initialPresetId?: string;
  onClose?: () => void;
  onRecordUse?: (toolId: string) => void;
  isStandalonePage?: boolean;
}

const EMOJI_OPTIONS = [
  '📅', '🚀', '⚡', '💼', '📊', '📚', '💰', '🐛', 
  '📖', '🥗', '🏋️', '✈️', '⏱️', '📝', '🎯', '📦', 
  '🏡', '🎙️', '🎁', '🧘', '💳', '🍲', '📑', '💒', '💻'
];

const NOTION_COLORS: Array<NotionSelectOption['color']> = [
  'default', 'gray', 'brown', 'orange', 'yellow', 
  'green', 'blue', 'purple', 'pink', 'red'
];

export const NotionTemplateBuilder: React.FC<NotionTemplateBuilderProps> = ({
  initialPresetId,
  onClose,
  onRecordUse,
  isStandalonePage = false
}) => {
  const builderTopRef = useRef<HTMLDivElement>(null);

  // Find initial preset if provided, otherwise default to Content Calendar
  const initialPreset = useMemo(() => {
    if (initialPresetId) {
      const found = NOTION_PRESETS.find(p => p.id === initialPresetId || p.name.toLowerCase().includes(initialPresetId.toLowerCase()));
      if (found) return found;
    }
    // Check URL search params for ?preset=...
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const presetParam = params.get('preset');
      if (presetParam) {
        const found = NOTION_PRESETS.find(p => p.id === presetParam);
        if (found) return found;
      }
    }
    return NOTION_PRESETS[0];
  }, [initialPresetId]);

  // Database Header State
  const [dbTitle, setDbTitle] = useState(initialPreset.name);
  const [dbIcon, setDbIcon] = useState(initialPreset.icon);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [activeView, setActiveView] = useState<'table' | 'board' | 'json'>('table');

  // Columns & Rows State
  const [columns, setColumns] = useState<NotionColumnConfig[]>(() => 
    JSON.parse(JSON.stringify(initialPreset.columns))
  );
  
  const [rows, setRows] = useState<Record<string, any>[]>(() => 
    JSON.parse(JSON.stringify(initialPreset.initialRows))
  );

  // Selected Column for editing options
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionColor, setNewOptionColor] = useState<NotionSelectOption['color']>('blue');

  // Bottom Section State (25 Readymade Templates)
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>('All');

  // Toast / Flash Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'csv' | 'json' | 'md' | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Record tool usage
  useEffect(() => {
    if (onRecordUse) {
      onRecordUse('notion-template-builder');
    }
  }, [onRecordUse]);

  // Trigger toast with auto-timeout
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add a new column of given property type
  const handleAddProperty = (propType: NotionPropertyType) => {
    const propDef = NOTION_PROPERTY_TYPES.find(p => p.type === propType);
    if (!propDef) return;

    let count = 1;
    let colName = propDef.defaultColumnName;
    while (columns.some(c => c.name.toLowerCase() === colName.toLowerCase())) {
      count++;
      colName = `${propDef.defaultColumnName} ${count}`;
    }

    const newColId = `col-${Date.now()}`;
    const newCol: NotionColumnConfig = {
      id: newColId,
      name: colName,
      type: propType,
      options: propDef.defaultOptions ? JSON.parse(JSON.stringify(propDef.defaultOptions)) : undefined
    };

    setColumns(prev => [...prev, newCol]);

    // Populate default values into existing rows
    setRows(prev => prev.map((row, idx) => ({
      ...row,
      [newColId]: generateSampleValue(propType, newCol, idx)
    })));

    setEditingColumnId(newColId);
    showToast(`Added "${colName}" (${propDef.name}) column to builder.`);
  };

  // Rename column
  const handleRenameColumn = (colId: string, newName: string) => {
    setColumns(prev => prev.map(c => c.id === colId ? { ...c, name: newName } : c));
  };

  // Remove column
  const handleDeleteColumn = (colId: string) => {
    if (columns.find(c => c.id === colId)?.required) return;
    setColumns(prev => prev.filter(c => c.id !== colId));
    setRows(prev => prev.map(row => {
      const copy = { ...row };
      delete copy[colId];
      return copy;
    }));
    if (editingColumnId === colId) setEditingColumnId(null);
  };

  // Reorder column
  const handleMoveColumn = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    setColumns(prev => {
      const clone = [...prev];
      const temp = clone[index];
      clone[index] = clone[targetIndex];
      clone[targetIndex] = temp;
      return clone;
    });
  };

  // Add Option to Select / Multi-select / Status
  const handleAddOption = (colId: string) => {
    if (!newOptionName.trim()) return;
    const optionId = `opt-${Date.now()}`;
    const newOpt: NotionSelectOption = {
      id: optionId,
      name: newOptionName.trim(),
      color: newOptionColor
    };

    setColumns(prev => prev.map(col => {
      if (col.id === colId) {
        return {
          ...col,
          options: [...(col.options || []), newOpt]
        };
      }
      return col;
    }));

    setNewOptionName('');
  };

  // Remove Option from Select / Multi-select
  const handleDeleteOption = (colId: string, optionId: string) => {
    setColumns(prev => prev.map(col => {
      if (col.id === colId) {
        return {
          ...col,
          options: (col.options || []).filter(o => o.id !== optionId)
        };
      }
      return col;
    }));
  };

  // Add new empty dummy row
  const handleAddRow = () => {
    const newRow: Record<string, any> = {};
    columns.forEach(col => {
      newRow[col.id] = generateSampleValue(col.type, col, rows.length);
    });
    setRows(prev => [...prev, newRow]);
    showToast('Added a new row to the table.');
  };

  // Delete row
  const handleDeleteRow = (rowIndex: number) => {
    setRows(prev => prev.filter((_, idx) => idx !== rowIndex));
  };

  // Update cell value
  const handleCellChange = (rowIndex: number, colId: string, value: any) => {
    setRows(prev => {
      const clone = [...prev];
      clone[rowIndex] = { ...clone[rowIndex], [colId]: value };
      return clone;
    });
  };

  // Reset to clean template
  const handleResetBuilder = () => {
    if (window.confirm('Reset builder to empty blank database?')) {
      setDbTitle('My Notion Database');
      setDbIcon('📝');
      setColumns([
        { id: 'col-1', name: 'Name', type: 'title', required: true },
        { 
          id: 'col-2', 
          name: 'Status', 
          type: 'select', 
          options: [
            { id: 'o1', name: 'To Do', color: 'gray' },
            { id: 'o2', name: 'In Progress', color: 'blue' },
            { id: 'o3', name: 'Done', color: 'green' }
          ]
        },
        { id: 'col-3', name: 'Due Date', type: 'date' },
        { id: 'col-4', name: 'Priority', type: 'rating' }
      ]);
      setRows([
        { 'col-1': 'Task Example 1', 'col-2': 'In Progress', 'col-3': '2025-04-01', 'col-4': 4 },
        { 'col-1': 'Task Example 2', 'col-2': 'To Do', 'col-3': '2025-04-10', 'col-4': 3 }
      ]);
      showToast('Builder reset to blank canvas.');
    }
  };

  // Click on "Use This Template" from Section 2
  const handleUsePreset = (preset: NotionPresetTemplate) => {
    setDbTitle(preset.name);
    setDbIcon(preset.icon);
    setColumns(JSON.parse(JSON.stringify(preset.columns)));
    setRows(JSON.parse(JSON.stringify(preset.initialRows)));
    setEditingColumnId(null);

    // Scroll smoothly to top builder
    if (builderTopRef.current) {
      builderTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showToast('Template loaded in builder - customize now!');
  };

  // Export handlers
  const handleDownloadCSV = () => {
    const csv = generateNotionCSV(columns, rows);
    const filename = `${dbTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_notion_template.csv`;
    triggerFileDownload(csv, filename, 'text/csv;charset=utf-8;');
    showToast(`Downloaded "${filename}"! Ready to import into Notion.`);
  };

  const handleCopyCSV = async () => {
    const csv = generateNotionCSV(columns, rows);
    await navigator.clipboard.writeText(csv);
    setCopiedType('csv');
    showToast('CSV copied to clipboard! Paste into Notion.');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyMarkdown = async () => {
    const md = generateNotionMarkdown(dbTitle, dbIcon, columns, rows);
    await navigator.clipboard.writeText(md);
    setCopiedType('md');
    showToast('Markdown table copied to clipboard!');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyJSON = async () => {
    const json = generateNotionJSON(dbTitle, dbIcon, columns, rows);
    await navigator.clipboard.writeText(json);
    setCopiedType('json');
    showToast('Notion API JSON schema copied to clipboard!');
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Helper to render property icon
  const renderPropertyIcon = (type: NotionPropertyType, className: string = 'w-3.5 h-3.5') => {
    switch (type) {
      case 'title': return <FileText className={className} />;
      case 'select': return <Tag className={className} />;
      case 'multi_select': return <Tags className={className} />;
      case 'status': return <CheckCircle2 className={className} />;
      case 'date': return <Calendar className={className} />;
      case 'person': return <User className={className} />;
      case 'number': return <Hash className={className} />;
      case 'checkbox': return <CheckSquare className={className} />;
      case 'url': return <Link className={className} />;
      case 'email': return <Mail className={className} />;
      case 'phone': return <Phone className={className} />;
      case 'text': return <AlignLeft className={className} />;
      case 'files': return <Paperclip className={className} />;
      case 'rating': return <Star className={className} />;
      case 'progress': return <Percent className={className} />;
      case 'created_time': return <Clock className={className} />;
      case 'last_edited_time': return <History className={className} />;
      case 'formula': return <Cpu className={className} />;
      default: return <FileText className={className} />;
    }
  };

  // Filtered 25 templates for Section 2
  const filteredTemplates = useMemo(() => {
    return NOTION_PRESETS.filter(p => {
      const typeTag = getPresetTypeTag(p);
      const matchesFilter = selectedTagFilter === 'All' || typeTag === selectedTagFilter;
      
      if (!matchesFilter) return false;
      if (!templateSearch.trim()) return true;

      const q = templateSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [selectedTagFilter, templateSearch]);

  // Counts for filter chips
  const filterCounts = useMemo(() => {
    const counts = { All: NOTION_PRESETS.length, Tracker: 0, Planner: 0, Logbook: 0, Database: 0 };
    NOTION_PRESETS.forEach(p => {
      const tag = getPresetTypeTag(p);
      if (tag in counts) {
        counts[tag as keyof typeof counts]++;
      }
    });
    return counts;
  }, []);

  // First select or status column for board view
  const boardColumn = useMemo(() => {
    return columns.find(c => c.type === 'status' || c.type === 'select');
  }, [columns]);

  return (
    <div className={`w-full bg-[#121212] text-[#e4e4e7] flex flex-col font-sans ${isStandalonePage ? 'min-h-screen' : 'fixed inset-0 z-50 overflow-y-auto'}`}>
      
      {/* Floating Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border-2 border-amber-400 px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-black tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#1c1c1e] border-b-2 border-black px-4 sm:px-6 py-3 sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3">
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-[#28282b] hover:bg-[#38383c] text-slate-300 hover:text-white transition-colors border border-black/40"
              title="Close Builder"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-black font-black text-sm flex items-center justify-center shadow-md border-2 border-black">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/80 border border-amber-600/70 px-2 py-0.5 rounded-md uppercase">
                  Notion Template Builder
                </span>
                <span className="text-[11px] text-slate-400 font-semibold hidden md:inline">
                  • 2-in-1 Custom Suite & 25 Readymade Presets
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: View Switcher Tabs */}
        <div className="flex items-center bg-[#141416] p-1 rounded-xl border border-black text-xs">
          <button
            onClick={() => setActiveView('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${activeView === 'table' ? 'bg-[#2c2c30] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Table className="w-3.5 h-3.5 text-blue-400" />
            <span>Table View</span>
          </button>

          <button
            onClick={() => setActiveView('board')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${activeView === 'board' ? 'bg-[#2c2c30] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
            <span>Kanban Board</span>
          </button>

          <button
            onClick={() => setActiveView('json')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${activeView === 'json' ? 'bg-[#2c2c30] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>JSON Schema</span>
          </button>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGuideModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#28282b] hover:bg-[#38383c] text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-black transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">How to Import</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md border border-black transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV (Notion Ready)</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-3 sm:p-6 space-y-10">

        {/* ========================================================================= */}
        {/* SECTION 1 (TOP 60% HEIGHT): PROMINENT CUSTOM NOTION BUILDER HERO         */}
        {/* ========================================================================= */}
        <section 
          ref={builderTopRef}
          className="w-full bg-[#1e1e20] border-2 border-black rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 space-y-6"
        >
          {/* Top Banner / Hero Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-black/60">
            
            {/* Title & Icon Input Area */}
            <div className="flex items-center gap-3 flex-1">
              {/* Emoji Icon Picker */}
              <div className="relative">
                <button
                  onClick={() => setIsEmojiPickerOpen(prev => !prev)}
                  className="w-12 h-12 rounded-2xl bg-[#2a2a2e] border-2 border-black hover:border-amber-400 text-2xl flex items-center justify-center shadow-lg transition-all hover:scale-105 shrink-0"
                  title="Change Database Emoji"
                >
                  {dbIcon}
                </button>

                {isEmojiPickerOpen && (
                  <div className="absolute top-14 left-0 z-50 bg-[#28282c] border-2 border-black rounded-2xl p-3 shadow-2xl w-64 grid grid-cols-5 gap-2 animate-in fade-in zoom-in-95">
                    {EMOJI_OPTIONS.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setDbIcon(emoji);
                          setIsEmojiPickerOpen(false);
                        }}
                        className="text-xl p-1.5 rounded-xl hover:bg-[#3a3a40] transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title Input */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Notion Database Title
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800">
                    {columns.length} Properties
                  </span>
                </div>
                <input
                  type="text"
                  value={dbTitle}
                  onChange={(e) => setDbTitle(e.target.value)}
                  placeholder="Enter database name..."
                  className="w-full text-lg sm:text-2xl font-black text-white bg-transparent border-b-2 border-transparent hover:border-slate-600 focus:border-amber-400 outline-none transition-colors py-0.5 placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Action Bar Tools */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyCSV}
                className="px-3 py-1.5 rounded-xl bg-[#28282c] hover:bg-[#38383e] text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-black shadow-xs transition-colors"
                title="Copy CSV to clipboard"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copy CSV</span>
              </button>

              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-xl bg-[#28282c] hover:bg-[#38383e] text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-black shadow-xs transition-colors"
                title="Copy Markdown Table"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Copy Markdown</span>
              </button>

              <button
                onClick={handleCopyJSON}
                className="px-3 py-1.5 rounded-xl bg-[#28282c] hover:bg-[#38383e] text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-black shadow-xs transition-colors"
                title="Copy Notion JSON schema"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Copy API JSON</span>
              </button>

              <button
                onClick={handleAddRow}
                className="px-3 py-1.5 rounded-xl bg-[#28282c] hover:bg-[#38383e] text-emerald-300 hover:text-emerald-200 font-black text-xs flex items-center gap-1.5 border border-black shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>

              <button
                onClick={handleResetBuilder}
                className="p-1.5 rounded-xl bg-[#28282c] hover:bg-rose-950 text-slate-400 hover:text-rose-300 font-bold text-xs flex items-center border border-black shadow-xs transition-colors"
                title="Reset to blank template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Builder Body: 2-Column Split (Left: Property Palette & Columns / Right: Live Interactive Workspace) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ----------------- LEFT: 18 PROPERTY TYPES CHOOSER + COLUMNS MANAGER (5 Cols) ----------------- */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* 18 Notion Properties Chooser */}
              <div className="bg-[#18181a] border-2 border-black rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Choose Notion Properties (18 Types)</span>
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400">Click + to add</span>
                </div>

                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                  
                  {/* Basic Types (11) */}
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1.5">
                      Basic Properties
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {NOTION_PROPERTY_TYPES.filter(p => p.category === 'basic').map(prop => (
                        <button
                          key={prop.type}
                          onClick={() => handleAddProperty(prop.type)}
                          className="flex items-center justify-between p-2 rounded-xl bg-[#222226] hover:bg-[#2e2e34] border border-black text-left group transition-all"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-slate-400 group-hover:text-amber-400">
                              {renderPropertyIcon(prop.type, 'w-3.5 h-3.5')}
                            </span>
                            <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                              {prop.name.split(' ')[0]}
                            </span>
                          </div>
                          <Plus className="w-3 h-3 text-slate-400 group-hover:text-amber-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Types (4) */}
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-400/80 tracking-wider block mb-1.5">
                      Advanced & Metrics
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {NOTION_PROPERTY_TYPES.filter(p => p.category === 'advanced').map(prop => (
                        <button
                          key={prop.type}
                          onClick={() => handleAddProperty(prop.type)}
                          className="flex items-center justify-between p-2 rounded-xl bg-[#222226] hover:bg-[#2e2e34] border border-black text-left group transition-all"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-purple-400 group-hover:text-purple-300">
                              {renderPropertyIcon(prop.type, 'w-3.5 h-3.5')}
                            </span>
                            <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                              {prop.name.split(' ')[0]}
                            </span>
                          </div>
                          <Plus className="w-3 h-3 text-purple-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meta Types (3) */}
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-400/80 tracking-wider block mb-1.5">
                      Timestamps & Meta
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {NOTION_PROPERTY_TYPES.filter(p => p.category === 'meta').map(prop => (
                        <button
                          key={prop.type}
                          onClick={() => handleAddProperty(prop.type)}
                          className="flex items-center justify-between p-2 rounded-xl bg-[#222226] hover:bg-[#2e2e34] border border-black text-left group transition-all"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-blue-400 group-hover:text-blue-300">
                              {renderPropertyIcon(prop.type, 'w-3.5 h-3.5')}
                            </span>
                            <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                              {prop.name.split(' ')[0]}
                            </span>
                          </div>
                          <Plus className="w-3 h-3 text-blue-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Configured Columns Manager */}
              <div className="bg-[#18181a] border-2 border-black rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Settings2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Configured Columns ({columns.length})</span>
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-400">Re-order & edit tags</span>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {columns.map((col, idx) => (
                    <div 
                      key={col.id}
                      className={`p-2.5 rounded-xl border transition-all ${editingColumnId === col.id ? 'bg-[#26262b] border-amber-400 shadow-md' : 'bg-[#202024] border-black hover:border-slate-700'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        
                        {/* Type Icon & Name Input */}
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="p-1 rounded-lg bg-[#141416] text-amber-400 shrink-0">
                            {renderPropertyIcon(col.type)}
                          </span>
                          <input
                            type="text"
                            value={col.name}
                            onChange={(e) => handleRenameColumn(col.id, e.target.value)}
                            disabled={col.required}
                            className="bg-transparent font-bold text-xs text-white border-b border-transparent hover:border-slate-600 focus:border-amber-400 outline-none flex-1 truncate"
                          />
                        </div>

                        {/* Reorder & Action buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          
                          {/* Options config button if select/status */}
                          {(col.type === 'select' || col.type === 'multi_select' || col.type === 'status') && (
                            <button
                              onClick={() => setEditingColumnId(editingColumnId === col.id ? null : col.id)}
                              className={`p-1 rounded-lg text-xs font-bold transition-colors ${editingColumnId === col.id ? 'bg-amber-400 text-black' : 'bg-[#141416] text-slate-300 hover:text-white'}`}
                              title="Edit Tag Options"
                            >
                              <Tag className="w-3 h-3" />
                            </button>
                          )}

                          <button
                            onClick={() => handleMoveColumn(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded-lg bg-[#141416] text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => handleMoveColumn(idx, 'down')}
                            disabled={idx === columns.length - 1}
                            className="p-1 rounded-lg bg-[#141416] text-slate-400 hover:text-white disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>

                          {!col.required && (
                            <button
                              onClick={() => handleDeleteColumn(col.id)}
                              className="p-1 rounded-lg bg-[#141416] hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable Tag Options Manager */}
                      {editingColumnId === col.id && (col.type === 'select' || col.type === 'multi_select' || col.type === 'status') && (
                        <div className="mt-3 pt-3 border-t border-black space-y-2.5 animate-in fade-in">
                          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                            Configure Select Tags & Colors
                          </span>

                          {/* Existing Options List */}
                          <div className="flex flex-wrap gap-1.5">
                            {(col.options || []).map(opt => {
                              const colorStyle = NOTION_COLOR_CLASSES[opt.color] || NOTION_COLOR_CLASSES.default;
                              return (
                                <div
                                  key={opt.id}
                                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border ${colorStyle.bg} ${colorStyle.text} ${colorStyle.border}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${colorStyle.dot}`} />
                                  <span>{opt.name}</span>
                                  <button
                                    onClick={() => handleDeleteOption(col.id, opt.id)}
                                    className="hover:text-rose-700 ml-0.5"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>

                          {/* Add New Option Form */}
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={newOptionName}
                              onChange={(e) => setNewOptionName(e.target.value)}
                              placeholder="New tag label..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddOption(col.id);
                              }}
                              className="bg-[#141416] border border-black text-white text-xs px-2 py-1 rounded-lg flex-1 outline-none focus:border-amber-400"
                            />
                            
                            <select
                              value={newOptionColor}
                              onChange={(e) => setNewOptionColor(e.target.value as any)}
                              className="bg-[#141416] border border-black text-slate-300 text-xs px-2 py-1 rounded-lg outline-none"
                            >
                              {NOTION_COLORS.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>

                            <button
                              onClick={() => handleAddOption(col.id)}
                              className="px-2 py-1 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-lg"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ----------------- RIGHT: LIVE INTERACTIVE WORKSPACE (7 Cols) ----------------- */}
            <div className="lg:col-span-7 bg-[#161618] border-2 border-black rounded-2xl p-4 sm:p-5 shadow-inner space-y-4">
              
              {/* Workspace Top Toolbar */}
              <div className="flex items-center justify-between border-b border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{dbIcon}</span>
                  <span className="text-sm font-black text-white tracking-wide truncate max-w-[280px]">
                    {dbTitle}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-black">
                    {rows.length} records
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddRow}
                    className="px-3 py-1 bg-[#28282c] hover:bg-[#38383e] text-amber-400 font-black text-xs rounded-xl border border-black flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Row</span>
                  </button>
                </div>
              </div>

              {/* View 1: Table View */}
              {activeView === 'table' && (
                <div className="overflow-x-auto max-h-[520px] rounded-xl border-2 border-black bg-[#1f1f23]">
                  <table className="w-full text-left text-xs border-collapse">
                    
                    {/* Headers */}
                    <thead>
                      <tr className="bg-[#2a2a30] border-b-2 border-black text-slate-300">
                        <th className="p-2.5 w-10 text-center font-bold text-slate-400">#</th>
                        {columns.map(col => (
                          <th key={col.id} className="p-2.5 font-black tracking-wide border-r border-black min-w-[150px]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400">{renderPropertyIcon(col.type)}</span>
                              <span className="truncate">{col.name}</span>
                            </div>
                          </th>
                        ))}
                        <th className="p-2.5 w-10 text-center"></th>
                      </tr>
                    </thead>

                    {/* Body Rows */}
                    <tbody className="divide-y divide-black/60">
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#25252b] transition-colors group">
                          
                          {/* Row Number */}
                          <td className="p-2.5 text-center font-mono text-[10px] text-slate-400">
                            {rIdx + 1}
                          </td>

                          {/* Cell values */}
                          {columns.map(col => {
                            const val = row[col.id];

                            return (
                              <td key={col.id} className="p-2 border-r border-black/40">
                                
                                {/* 1. Title / Text */}
                                {(col.type === 'title' || col.type === 'text' || col.type === 'email' || col.type === 'phone' || col.type === 'url') && (
                                  <input
                                    type="text"
                                    value={val !== undefined ? String(val) : ''}
                                    onChange={(e) => handleCellChange(rIdx, col.id, e.target.value)}
                                    className="w-full bg-transparent text-slate-200 outline-none focus:bg-[#141416] px-1.5 py-0.5 rounded"
                                  />
                                )}

                                {/* 2. Number */}
                                {col.type === 'number' && (
                                  <input
                                    type="number"
                                    value={val !== undefined ? val : ''}
                                    onChange={(e) => handleCellChange(rIdx, col.id, parseFloat(e.target.value) || 0)}
                                    className="w-full bg-transparent text-slate-200 outline-none focus:bg-[#141416] px-1.5 py-0.5 rounded font-mono"
                                  />
                                )}

                                {/* 3. Checkbox */}
                                {col.type === 'checkbox' && (
                                  <div className="flex items-center justify-center">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(val)}
                                      onChange={(e) => handleCellChange(rIdx, col.id, e.target.checked)}
                                      className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                                    />
                                  </div>
                                )}

                                {/* 4. Date */}
                                {col.type === 'date' && (
                                  <input
                                    type="date"
                                    value={val || ''}
                                    onChange={(e) => handleCellChange(rIdx, col.id, e.target.value)}
                                    className="w-full bg-transparent text-slate-200 outline-none text-[11px] px-1"
                                  />
                                )}

                                {/* 5. Rating (1-5 Stars) */}
                                {col.type === 'rating' && (
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(starNum => (
                                      <button
                                        key={starNum}
                                        onClick={() => handleCellChange(rIdx, col.id, starNum)}
                                        className="text-amber-400 hover:scale-125 transition-transform"
                                      >
                                        <Star 
                                          className={`w-3.5 h-3.5 ${starNum <= (Number(val) || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                                        />
                                      </button>
                                    ))}
                                  </div>
                                )}

                                {/* 6. Progress Bar (%) */}
                                {col.type === 'progress' && (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={Number(val) || 0}
                                      onChange={(e) => handleCellChange(rIdx, col.id, parseInt(e.target.value))}
                                      className="w-16 h-1.5 accent-amber-400 bg-slate-700 rounded-lg cursor-pointer"
                                    />
                                    <span className="font-mono text-[10px] text-slate-300">{Number(val) || 0}%</span>
                                  </div>
                                )}

                                {/* 7. Select & Status dropdown */}
                                {(col.type === 'select' || col.type === 'status') && (
                                  <select
                                    value={val || ''}
                                    onChange={(e) => handleCellChange(rIdx, col.id, e.target.value)}
                                    className="w-full bg-[#18181c] border border-black text-slate-200 rounded px-1.5 py-0.5 text-[11px] outline-none font-bold"
                                  >
                                    {(col.options || []).map(opt => (
                                      <option key={opt.id} value={opt.name}>{opt.name}</option>
                                    ))}
                                  </select>
                                )}

                                {/* 8. Multi Select */}
                                {col.type === 'multi_select' && (
                                  <div className="flex flex-wrap gap-1">
                                    {(Array.isArray(val) ? val : [val]).filter(Boolean).map((t, idx) => (
                                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold border border-black">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* 9. Default / Meta / Formula */}
                                {(col.type === 'created_time' || col.type === 'last_edited_time' || col.type === 'formula' || col.type === 'person' || col.type === 'files') && (
                                  <span className="text-slate-400 font-mono text-[11px] px-1">
                                    {String(val || '')}
                                  </span>
                                )}

                              </td>
                            );
                          })}

                          {/* Delete row button */}
                          <td className="p-2 text-center">
                            <button
                              onClick={() => handleDeleteRow(rIdx)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                              title="Delete Row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              )}

              {/* View 2: Kanban Board View */}
              {activeView === 'board' && (
                <div className="overflow-x-auto pb-4">
                  {boardColumn ? (
                    <div className="flex items-start gap-4 min-w-[650px]">
                      {(boardColumn.options || []).map(opt => {
                        const optRows = rows.filter(r => r[boardColumn.id] === opt.name);
                        const colorStyle = NOTION_COLOR_CLASSES[opt.color] || NOTION_COLOR_CLASSES.default;

                        return (
                          <div key={opt.id} className="w-64 shrink-0 bg-[#1e1e24] border-2 border-black rounded-2xl p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${colorStyle.bg} ${colorStyle.text} ${colorStyle.border}`}>
                                {opt.name}
                              </span>
                              <span className="text-xs font-mono text-slate-400 font-bold">
                                {optRows.length}
                              </span>
                            </div>

                            <div className="space-y-2">
                              {optRows.map((r, idx) => (
                                <div key={idx} className="p-3 rounded-xl bg-[#282830] border border-black shadow-sm space-y-1.5">
                                  <h4 className="text-xs font-bold text-white leading-snug">
                                    {r['col-1'] || Object.values(r)[0] || 'Untitled Item'}
                                  </h4>
                                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                                    <span>Record #{idx + 1}</span>
                                    <span className="text-amber-400 font-mono">Notion Card</span>
                                  </div>
                                </div>
                              ))}
                              {optRows.length === 0 && (
                                <div className="text-center py-6 text-slate-600 text-xs italic">
                                  No cards in this stage
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Please add a "Status" or "Select" property to enable Kanban board view.
                    </div>
                  )}
                </div>
              )}

              {/* View 3: API Schema JSON */}
              {activeView === 'json' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Notion Database API v1 Schema Payload:</span>
                    <button
                      onClick={handleCopyJSON}
                      className="px-2.5 py-1 rounded bg-slate-800 text-amber-400 font-mono text-[11px] font-bold border border-black hover:bg-slate-700"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-black/80 border-2 border-black text-amber-300 font-mono text-xs overflow-x-auto max-h-[460px] leading-relaxed">
                    {generateNotionJSON(dbTitle, dbIcon, columns, rows)}
                  </pre>
                </div>
              )}

            </div>

          </div>

        </section>


        {/* ========================================================================= */}
        {/* SECTION 2 (BOTTOM 40%): 25 READYMADE NOTION TEMPLATES CARDS               */}
        {/* ========================================================================= */}
        <section className="w-full space-y-6 pt-4">
          
          {/* Headings */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant 1-Click Notion Presets</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              25 Readymade Templates Available - Click to Customize in Builder Above
            </h2>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Choose a template, it will load in builder above, edit columns as per your need, then download
            </p>
          </div>

          {/* Search Bar & Filter Chips */}
          <div className="bg-[#1a1a1c] border-2 border-black rounded-2xl p-4 space-y-3 shadow-md">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  placeholder="Search 25 templates (e.g. Content Calendar, CRM, Habits, Invoicing)..."
                  className="w-full bg-[#121214] border border-black text-white text-xs pl-10 pr-8 py-2.5 rounded-xl outline-none focus:border-amber-400 placeholder:text-slate-500"
                />
                {templateSearch && (
                  <button
                    onClick={() => setTemplateSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Total matches badge */}
              <span className="text-xs font-bold text-slate-400 shrink-0">
                Showing {filteredTemplates.length} of 25 Templates
              </span>
            </div>

            {/* Filter Chips: All, Tracker, Planner, Logbook, Database */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {(['All', 'Tracker', 'Planner', 'Logbook', 'Database'] as const).map(chip => {
                const count = filterCounts[chip];
                const isActive = selectedTagFilter === chip;

                return (
                  <button
                    key={chip}
                    onClick={() => setSelectedTagFilter(chip)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all border ${isActive ? 'bg-amber-400 text-slate-950 border-black shadow-md scale-105' : 'bg-[#222226] text-slate-300 border-black hover:bg-[#2e2e34]'}`}
                  >
                    <span>{chip}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-black text-amber-400' : 'bg-black/40 text-slate-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* 5-Column Desktop Grid / 2-Column Mobile Grid for 25 Templates */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {filteredTemplates.map(preset => {
              const typeTag = getPresetTypeTag(preset);

              return (
                <div
                  key={preset.id}
                  className="bg-[#1c1c1e] hover:bg-[#242428] border-2 border-black hover:border-amber-400 rounded-2xl p-4 flex flex-col justify-between group transition-all shadow-md hover:-translate-y-1"
                >
                  <div className="space-y-2.5">
                    {/* Top: Icon + Type Tag */}
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-2xl sm:text-3xl shrink-0 p-1.5 rounded-xl bg-black/40 border border-black/80">
                        {preset.icon}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-400 border border-amber-700/60 shrink-0">
                        {typeTag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                      {preset.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  {/* Bottom: Columns Count & "Use This Template" button */}
                  <div className="mt-4 pt-3 border-t border-black/80 space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{preset.columns.length} Columns</span>
                      <span>{preset.initialRows.length} Sample Rows</span>
                    </div>

                    <button
                      onClick={() => handleUsePreset(preset)}
                      className="w-full py-2 px-3 rounded-xl bg-[#2a2a2e] group-hover:bg-amber-400 text-slate-200 group-hover:text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 border border-black shadow-xs transition-all active:scale-95"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400 group-hover:text-black shrink-0" />
                      <span>Use This Template</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 bg-[#1a1a1c] border-2 border-black rounded-2xl p-6 space-y-2">
              <Database className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No templates matched your query</h4>
              <p className="text-xs text-slate-400">Try searching for "Calendar", "CRM", "Habit", or clear your filter.</p>
              <button
                onClick={() => {
                  setTemplateSearch('');
                  setSelectedTagFilter('All');
                }}
                className="mt-2 px-4 py-1.5 bg-amber-400 text-black font-black text-xs rounded-xl"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </section>

      </main>

      {/* ================= MODAL: HOW TO IMPORT STEP-BY-STEP GUIDE ================= */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1e1e22] border-2 border-black rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Importing to Notion (Step-by-Step)</span>
              </h3>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#2a2a2e] hover:bg-[#3a3a3e] text-slate-400 hover:text-white border border-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="flex gap-3.5 items-start">
                <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 border border-black shadow-xs">
                  1
                </div>
                <div>
                  <h4 className="font-black text-white text-sm">Download the CSV from this builder</h4>
                  <p className="text-slate-400 mt-0.5">Click the yellow "Download CSV" button at the top. It packages your custom properties, types, and sample rows into an RFC-compliant CSV.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-7 h-7 rounded-xl bg-blue-500 text-white font-black flex items-center justify-center shrink-0 border border-black shadow-xs">
                  2
                </div>
                <div>
                  <h4 className="font-black text-white text-sm">In Notion: Click Import in the top menu</h4>
                  <p className="text-slate-400 mt-0.5">Open any page or new page in Notion. Click the <strong>...</strong> (three dots) at the top-right corner and select <strong>Import</strong>.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center shrink-0 border border-black shadow-xs">
                  3
                </div>
                <div>
                  <h4 className="font-black text-white text-sm">Select CSV File</h4>
                  <p className="text-slate-400 mt-0.5">Pick the downloaded file. Notion automatically turns every column into database properties with rows ready to use.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl border border-black shadow-md"
              >
                Got It! Back to Custom Builder
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
