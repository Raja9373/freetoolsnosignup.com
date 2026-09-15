import React, { useState } from 'react';
import { 
  Download, Copy, Check, Plus, Trash2, Sparkles, 
  RotateCcw, Table, LayoutGrid, Cpu, ArrowLeft, ArrowRight, 
  ExternalLink, Star, CheckSquare, Calendar, User, Hash, 
  Tag, Tags, CheckCircle2, AlignLeft, Paperclip, Link as LinkIcon, 
  Mail, Phone, Percent, Clock, History, FileText
} from 'lucide-react';
import { NotionColumnConfig, NotionPropertyType } from '../../../types';
import { NOTION_COLOR_CLASSES, generateNotionCSV, generateNotionJSON, generateNotionMarkdown, triggerFileDownload } from '../notionBuilderEngine';

interface NotionLiveTableProps {
  dbTitle: string;
  dbIcon: string;
  columns: NotionColumnConfig[];
  rows: Record<string, any>[];
  onTitleChange: (newTitle: string) => void;
  onIconChange: (newIcon: string) => void;
  onUpdateCell: (rowIndex: number, colId: string, value: any) => void;
  onAddRow: () => void;
  onAutoFillRows: () => void;
  onClearRows: () => void;
  onDeleteRow: (rowIndex: number) => void;
  onMoveColumn: (index: number, direction: 'left' | 'right') => void;
  onDeleteColumn: (colId: string) => void;
  showToast: (msg: string) => void;
}

const EMOJI_LIST = [
  '📅', '🚀', '⚡', '💼', '📊', '📚', '💰', '🐛', 
  '📖', '🥗', '🏋️', '✈️', '⏱️', '📝', '🎯', '📦', 
  '🏡', '🎙️', '🎁', '🧘', '💳', '🍲', '📑', '💒', '💻'
];

export const NotionLiveTable: React.FC<NotionLiveTableProps> = ({
  dbTitle,
  dbIcon,
  columns,
  rows,
  onTitleChange,
  onIconChange,
  onUpdateCell,
  onAddRow,
  onAutoFillRows,
  onClearRows,
  onDeleteRow,
  onMoveColumn,
  onDeleteColumn,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'kanban' | 'json'>('table');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Download CSV
  const handleDownloadCSV = () => {
    const csvContent = generateNotionCSV(columns, rows);
    const cleanName = dbTitle.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'notion_database';
    const filename = `${cleanName}_template.csv`;
    triggerFileDownload(csvContent, filename, 'text/csv;charset=utf-8;');
    showToast(`Downloaded "${filename}"! Ready for 1-click import into Notion.`);
  };

  // Copy CSV
  const handleCopyCSV = async () => {
    const csvContent = generateNotionCSV(columns, rows);
    await navigator.clipboard.writeText(csvContent);
    setCopiedFormat('csv');
    showToast('CSV copied to clipboard! Paste directly into Notion.');
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  // Copy Markdown
  const handleCopyMarkdown = async () => {
    const mdContent = generateNotionMarkdown(dbTitle, dbIcon, columns, rows);
    await navigator.clipboard.writeText(mdContent);
    setCopiedFormat('md');
    showToast('Markdown table copied to clipboard!');
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  // Copy JSON
  const handleCopyJSON = async () => {
    const jsonContent = generateNotionJSON(dbTitle, dbIcon, columns, rows);
    await navigator.clipboard.writeText(jsonContent);
    setCopiedFormat('json');
    showToast('Notion API JSON schema copied to clipboard!');
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  // Icon helper
  const getPropIcon = (type: NotionPropertyType) => {
    switch (type) {
      case 'title': return <FileText className="w-3.5 h-3.5 text-blue-600" />;
      case 'text': return <AlignLeft className="w-3.5 h-3.5 text-slate-500" />;
      case 'number': return <Hash className="w-3.5 h-3.5 text-amber-600" />;
      case 'select': return <Tag className="w-3.5 h-3.5 text-purple-600" />;
      case 'multi_select': return <Tags className="w-3.5 h-3.5 text-indigo-600" />;
      case 'status': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'date': return <Calendar className="w-3.5 h-3.5 text-rose-600" />;
      case 'person': return <User className="w-3.5 h-3.5 text-teal-600" />;
      case 'files': return <Paperclip className="w-3.5 h-3.5 text-orange-600" />;
      case 'checkbox': return <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />;
      case 'url': return <LinkIcon className="w-3.5 h-3.5 text-sky-600" />;
      case 'email': return <Mail className="w-3.5 h-3.5 text-red-600" />;
      case 'phone': return <Phone className="w-3.5 h-3.5 text-green-600" />;
      case 'rating': return <Star className="w-3.5 h-3.5 text-amber-500" />;
      case 'progress': return <Percent className="w-3.5 h-3.5 text-blue-600" />;
      case 'created_time': return <Clock className="w-3.5 h-3.5 text-slate-400" />;
      case 'last_edited_time': return <History className="w-3.5 h-3.5 text-slate-400" />;
      case 'formula': return <Cpu className="w-3.5 h-3.5 text-violet-600" />;
      default: return <FileText className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  // Find primary status/select column for Kanban view
  const statusColumn = columns.find(c => c.type === 'status' || c.type === 'select');

  return (
    <div className="space-y-4">
      {/* Database Header & Controls */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        
        {/* Top: Title & Emoji Icon + View Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            {/* Emoji Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#C5A059] flex items-center justify-center text-2xl shadow-2xs hover:scale-105 transition-all cursor-pointer"
                title="Change Database Icon"
              >
                {dbIcon}
              </button>

              {/* Emoji Picker Dropdown */}
              {isEmojiPickerOpen && (
                <div className="absolute top-14 left-0 z-50 p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-64 grid grid-cols-5 gap-1.5 animate-in fade-in zoom-in-95">
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onIconChange(emoji);
                        setIsEmojiPickerOpen(false);
                      }}
                      className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-xl cursor-pointer transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Editable Database Title */}
            <div className="flex-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Database Title
              </label>
              <input
                type="text"
                value={dbTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full text-lg sm:text-xl font-black text-[#0A1931] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#C5A059] focus:outline-hidden py-0.5 transition-colors"
                placeholder="Name your Notion database..."
              />
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'table' ? 'bg-white text-[#0A1931] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-blue-600" />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'kanban' ? 'bg-white text-[#0A1931] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'json' ? 'bg-white text-[#0A1931] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              <span>JSON Schema</span>
            </button>
          </div>
        </div>

        {/* Action Toolbar: Primary Download CTA + Table Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Main Download Button */}
          <button
            onClick={handleDownloadCSV}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E8C27A] text-[#0A1931] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            title="Download formatted CSV file ready for Notion import"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV for Notion</span>
          </button>

          {/* Secondary Table Row Controls */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={onAddRow}
              className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-slate-200 border border-[#E2E8F0] font-bold text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#0A1931]" />
              <span>Add Row</span>
            </button>

            <button
              onClick={onAutoFillRows}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 font-bold text-amber-900 flex items-center gap-1 transition-colors cursor-pointer"
              title="Generate 5 realistic sample rows"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Auto-fill 5 Rows</span>
            </button>

            <button
              onClick={onClearRows}
              className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 font-semibold transition-colors cursor-pointer"
              title="Clear all rows"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

            <button
              onClick={handleCopyCSV}
              className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-slate-200 border border-[#E2E8F0] text-slate-700 font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Copy CSV to clipboard"
            >
              {copiedFormat === 'csv' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Copy CSV</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-slate-200 border border-[#E2E8F0] text-slate-700 font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Copy Markdown table to clipboard"
            >
              {copiedFormat === 'md' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Copy MD</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Table Preview View */}
      {activeTab === 'table' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left border-collapse text-xs">
              {/* Table Header Row */}
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="w-10 px-3 py-3 text-slate-400 font-mono text-[10px] text-center border-r border-[#E2E8F0]">
                    #
                  </th>
                  {columns.map((col, idx) => (
                    <th
                      key={col.id}
                      className="px-3.5 py-3 font-semibold text-[#0A1931] border-r border-[#E2E8F0] min-w-[180px] select-none group"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="shrink-0">{getPropIcon(col.type)}</span>
                          <span className="truncate font-bold text-xs">{col.name}</span>
                        </div>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onMoveColumn(idx, 'left')}
                            disabled={idx === 0}
                            className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                            title="Move left"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onMoveColumn(idx, 'right')}
                            disabled={idx === columns.length - 1}
                            className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                            title="Move right"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="w-10 px-2 py-3 text-center text-slate-400 font-semibold">
                    ✕
                  </th>
                </tr>
              </thead>

              {/* Table Body Rows with Editable Cells */}
              <tbody className="divide-y divide-[#F1F5F9]">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 2} className="py-12 text-center text-slate-400">
                      <p className="text-sm font-semibold">Database has no rows.</p>
                      <button
                        onClick={onAutoFillRows}
                        className="mt-2 text-xs text-[#C5A059] font-bold hover:underline"
                      >
                        Auto-fill 5 sample rows now →
                      </button>
                    </td>
                  </tr>
                ) : (
                  rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#F8FAFC]/80 group transition-colors">
                      {/* Row Index */}
                      <td className="px-3 py-2.5 text-slate-400 font-mono text-[10px] text-center border-r border-[#E2E8F0]">
                        {rIdx + 1}
                      </td>

                      {/* Interactive Editable Cells for each column */}
                      {columns.map((col) => {
                        const cellVal = row[col.id];

                        return (
                          <td
                            key={col.id}
                            className="px-3 py-2 border-r border-[#E2E8F0] align-middle text-slate-800"
                          >
                            {/* Checkbox Property */}
                            {col.type === 'checkbox' ? (
                              <input
                                type="checkbox"
                                checked={Boolean(cellVal)}
                                onChange={(e) => onUpdateCell(rIdx, col.id, e.target.checked)}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer accent-[#0A1931]"
                              />
                            ) : col.type === 'rating' ? (
                              /* Interactive Star Rating */
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => onUpdateCell(rIdx, col.id, star)}
                                    className="cursor-pointer focus:outline-hidden"
                                    title={`Set rating to ${star}`}
                                  >
                                    <Star
                                      className={`w-3.5 h-3.5 ${
                                        (cellVal || 0) >= star
                                          ? 'text-amber-500 fill-amber-400'
                                          : 'text-slate-300'
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            ) : col.type === 'progress' ? (
                              /* Interactive Progress Bar */
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                                  <div
                                    className="bg-blue-600 h-full rounded-full transition-all"
                                    style={{ width: `${Math.min(100, Math.max(0, Number(cellVal) || 0))}%` }}
                                  />
                                </div>
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={cellVal ?? 0}
                                  onChange={(e) => onUpdateCell(rIdx, col.id, Number(e.target.value))}
                                  className="w-12 text-[11px] font-mono text-right bg-transparent focus:bg-white rounded px-1"
                                />
                                <span className="text-[10px] text-slate-400">%</span>
                              </div>
                            ) : col.type === 'select' || col.type === 'status' ? (
                              /* Select / Status Colored Option */
                              col.options && col.options.length > 0 ? (
                                <select
                                  value={cellVal || col.options[0]?.name}
                                  onChange={(e) => onUpdateCell(rIdx, col.id, e.target.value)}
                                  className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F1F5F9] border border-slate-300 text-[#0A1931] cursor-pointer focus:ring-1 focus:ring-[#C5A059]"
                                >
                                  {col.options.map((opt) => (
                                    <option key={opt.id} value={opt.name}>
                                      {opt.name}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={cellVal ?? ''}
                                  onChange={(e) => onUpdateCell(rIdx, col.id, e.target.value)}
                                  className="w-full bg-transparent focus:bg-white border-b border-transparent focus:border-blue-500 rounded px-1 text-xs"
                                />
                              )
                            ) : col.type === 'multi_select' ? (
                              /* Multi-Select Tags */
                              <div className="flex flex-wrap items-center gap-1">
                                {Array.isArray(cellVal) ? (
                                  cellVal.map((tag: string, tIdx: number) => (
                                    <span
                                      key={tIdx}
                                      className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-semibold"
                                    >
                                      {tag}
                                    </span>
                                  ))
                                ) : (
                                  <input
                                    type="text"
                                    value={cellVal ?? ''}
                                    onChange={(e) => onUpdateCell(rIdx, col.id, e.target.value)}
                                    className="w-full bg-transparent focus:bg-white rounded px-1 text-xs"
                                    placeholder="tag1, tag2..."
                                  />
                                )}
                              </div>
                            ) : col.type === 'person' ? (
                              /* Person Assignee Badge */
                              <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-[#0A1931] text-[#C5A059] font-bold text-[9px] flex items-center justify-center shrink-0">
                                  {String(cellVal || 'U').charAt(0).toUpperCase()}
                                </div>
                                <input
                                  type="text"
                                  value={cellVal ?? ''}
                                  onChange={(e) => onUpdateCell(rIdx, col.id, e.target.value)}
                                  className="w-full bg-transparent focus:bg-white border-b border-transparent focus:border-blue-500 rounded px-1 text-xs truncate"
                                  placeholder="Assignee name"
                                />
                              </div>
                            ) : col.type === 'date' ? (
                              /* Date Picker */
                              <input
                                type="date"
                                value={cellVal ?? ''}
                                onChange={(e) => onUpdateCell(rIdx, col.id, e.target.value)}
                                className="bg-transparent focus:bg-white text-xs text-slate-800 rounded px-1 border-b border-transparent focus:border-blue-500"
                              />
                            ) : col.type === 'number' ? (
                              /* Number Input */
                              <input
                                type="number"
                                value={cellVal ?? ''}
                                onChange={(e) => onUpdateCell(rIdx, col.id, Number(e.target.value))}
                                className="w-full bg-transparent focus:bg-white border-b border-transparent focus:border-blue-500 rounded px-1 text-xs font-mono text-slate-800"
                                placeholder="0"
                              />
                            ) : (
                              /* Default text, title, url, email, phone, files, etc. */
                              <input
                                type="text"
                                value={cellVal ?? ''}
                                onChange={(e) => onUpdateCell(rIdx, col.id, e.target.value)}
                                className={`w-full bg-transparent focus:bg-white border-b border-transparent focus:border-blue-500 rounded px-1 text-xs ${
                                  col.type === 'title' ? 'font-bold text-[#0A1931]' : 'text-slate-700'
                                }`}
                                placeholder={col.name}
                              />
                            )}
                          </td>
                        );
                      })}

                      {/* Delete Row Button */}
                      <td className="px-2 py-2 text-center align-middle">
                        <button
                          onClick={() => onDeleteRow(rIdx)}
                          className="p-1 rounded text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete this row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer: Quick Add Row Bar */}
          <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs">
            <button
              onClick={onAddRow}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-slate-600 hover:text-[#0A1931] hover:bg-slate-200 font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#0A1931]" />
              <span>+ New Page / Row</span>
            </button>
            <span className="text-[11px] text-slate-400 font-medium">
              {rows.length} rows • {columns.length} properties
            </span>
          </div>
        </div>
      )}

      {/* Kanban Board View */}
      {activeTab === 'kanban' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
          {statusColumn && statusColumn.options && statusColumn.options.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {statusColumn.options.map((opt) => {
                const groupRows = rows.filter(r => (r[statusColumn.id] || statusColumn.options?.[0]?.name) === opt.name);

                return (
                  <div key={opt.id} className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-3 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-xs text-[#0A1931] px-2 py-0.5 rounded bg-white border border-slate-200">
                        {opt.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        {groupRows.length}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {groupRows.map((r, idx) => {
                        const titleCol = columns.find(c => c.type === 'title') || columns[0];
                        return (
                          <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs space-y-1">
                            <p className="font-bold text-xs text-[#0A1931]">
                              {r[titleCol.id] || 'Untitled Item'}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                              <span>Row #{idx + 1}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-semibold">Add a "Select" or "Status" column to view Kanban stages.</p>
            </div>
          )}
        </div>
      )}

      {/* JSON Schema View */}
      {activeTab === 'json' && (
        <div className="bg-[#0A1931] text-amber-200 rounded-2xl border border-slate-800 p-4 font-mono text-xs shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
            <span className="font-bold text-slate-200">Notion API Database Schema JSON</span>
            <button
              onClick={handleCopyJSON}
              className="px-2.5 py-1 rounded bg-amber-400/10 hover:bg-amber-400/20 text-[#C5A059] font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedFormat === 'json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Schema</span>
            </button>
          </div>
          <pre className="overflow-x-auto max-h-80 text-[11px] leading-relaxed text-amber-100/90">
            {generateNotionJSON(dbTitle, dbIcon, columns, rows)}
          </pre>
        </div>
      )}

    </div>
  );
};
