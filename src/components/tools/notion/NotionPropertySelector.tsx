import React from 'react';
import { 
  FileText, AlignLeft, Hash, Tag, Tags, CheckCircle2, 
  Calendar, User, Paperclip, CheckSquare, Link, Mail, 
  Phone, Star, Percent, Clock, History, Cpu, Plus, 
  Trash2, ChevronUp, ChevronDown, Sparkles
} from 'lucide-react';
import { NotionColumnConfig, NotionPropertyType } from '../../../types';

interface NotionPropertySelectorProps {
  columns: NotionColumnConfig[];
  onAddProperty: (type: NotionPropertyType) => void;
  onRemoveColumn: (colId: string) => void;
  onRenameColumn: (colId: string, newName: string) => void;
  onMoveColumn: (index: number, direction: 'up' | 'down') => void;
}

interface PropertyTypeButtonConfig {
  type: NotionPropertyType;
  label: string;
  icon: React.ReactNode;
  hint: string;
  category: 'core' | 'tags' | 'advanced' | 'contact' | 'meta';
}

export const NotionPropertySelector: React.FC<NotionPropertySelectorProps> = ({
  columns,
  onAddProperty,
  onRemoveColumn,
  onRenameColumn,
  onMoveColumn
}) => {
  // 18 Property Types as explicitly requested
  const PROPERTY_TYPES: PropertyTypeButtonConfig[] = [
    { type: 'title', label: 'Title', icon: <FileText className="w-3.5 h-3.5 text-blue-600" />, hint: 'Primary Name', category: 'core' },
    { type: 'text', label: 'Text', icon: <AlignLeft className="w-3.5 h-3.5 text-slate-600" />, hint: 'Notes & Paragraphs', category: 'core' },
    { type: 'number', label: 'Number', icon: <Hash className="w-3.5 h-3.5 text-amber-600" />, hint: 'Quantities, Currency', category: 'core' },
    { type: 'select', label: 'Select', icon: <Tag className="w-3.5 h-3.5 text-purple-600" />, hint: 'Single colored choice', category: 'tags' },
    { type: 'multi_select', label: 'Multi-select', icon: <Tags className="w-3.5 h-3.5 text-indigo-600" />, hint: 'Multiple colored badges', category: 'tags' },
    { type: 'status', label: 'Status', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />, hint: 'To-do, Progress, Done', category: 'tags' },
    { type: 'date', label: 'Date', icon: <Calendar className="w-3.5 h-3.5 text-rose-600" />, hint: 'Calendar dates & deadlines', category: 'core' },
    { type: 'person', label: 'Person', icon: <User className="w-3.5 h-3.5 text-teal-600" />, hint: 'Assignee & team member', category: 'core' },
    { type: 'files', label: 'File', icon: <Paperclip className="w-3.5 h-3.5 text-orange-600" />, hint: 'Attachments & media link', category: 'core' },
    { type: 'checkbox', label: 'Checkbox', icon: <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />, hint: 'Yes/No completion box', category: 'core' },
    { type: 'url', label: 'URL', icon: <Link className="w-3.5 h-3.5 text-sky-600" />, hint: 'Clickable web links', category: 'contact' },
    { type: 'email', label: 'Email', icon: <Mail className="w-3.5 h-3.5 text-red-600" />, hint: 'Contact email address', category: 'contact' },
    { type: 'phone', label: 'Phone', icon: <Phone className="w-3.5 h-3.5 text-green-600" />, hint: 'Direct telephone line', category: 'contact' },
    { type: 'rating', label: 'Rating', icon: <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />, hint: '1–5 Star visual review', category: 'advanced' },
    { type: 'progress', label: 'Progress', icon: <Percent className="w-3.5 h-3.5 text-blue-600" />, hint: '0–100% completion bar', category: 'advanced' },
    { type: 'created_time', label: 'Created Time', icon: <Clock className="w-3.5 h-3.5 text-slate-500" />, hint: 'Creation timestamp', category: 'meta' },
    { type: 'last_edited_time', label: 'Last Edited Time', icon: <History className="w-3.5 h-3.5 text-slate-500" />, hint: 'Last modified timestamp', category: 'meta' },
    { type: 'formula', label: 'Formula', icon: <Cpu className="w-3.5 h-3.5 text-violet-600" />, hint: 'Computed math/logic', category: 'advanced' }
  ];

  return (
    <aside className="space-y-6">
      {/* Add Property Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0A1931] text-[#C5A059] flex items-center justify-center font-bold text-xs">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0A1931] tracking-tight uppercase">
                Add Property
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                18 Column Types Available
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#C5A059] border border-amber-200">
            Click to Add
          </span>
        </div>

        {/* 18 Types Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {PROPERTY_TYPES.map((prop) => (
            <button
              key={prop.type}
              onClick={() => onAddProperty(prop.type)}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#C5A059] bg-[#F8FAFC] hover:bg-amber-50/40 text-left transition-all group cursor-pointer active:scale-95 text-xs font-semibold text-[#0A1931]"
              title={`Add ${prop.label} property: ${prop.hint}`}
            >
              <div className="p-1 rounded-md bg-white border border-[#E2E8F0] group-hover:border-amber-300 transition-colors shrink-0">
                {prop.icon}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate font-bold text-slate-800 group-hover:text-[#0A1931]">
                  {prop.label}
                </span>
                <span className="block text-[9px] text-slate-500 truncate">
                  {prop.hint}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Database Schema Properties */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div>
            <h3 className="text-xs font-black text-[#0A1931] uppercase tracking-wider">
              Active Schema
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {columns.length} columns in current database
            </p>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {columns.length} cols
          </span>
        </div>

        <div className="space-y-2 mt-3.5 max-h-[380px] overflow-y-auto pr-1">
          {columns.map((col, idx) => {
            const propDef = PROPERTY_TYPES.find(p => p.type === col.type);
            const isTitle = col.type === 'title';

            return (
              <div
                key={col.id}
                className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-slate-300 transition-colors text-xs"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                    {propDef?.icon || <FileText className="w-3 h-3 text-slate-500" />}
                  </div>
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) => onRenameColumn(col.id, e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#C5A059] rounded px-1 text-xs truncate"
                    placeholder="Column name..."
                  />
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 uppercase font-mono shrink-0">
                    {col.type}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onMoveColumn(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded text-slate-400 hover:text-[#0A1931] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200"
                    title="Move column left/up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onMoveColumn(idx, 'down')}
                    disabled={idx === columns.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-[#0A1931] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200"
                    title="Move column right/down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {!isTitle && (
                    <button
                      onClick={() => onRemoveColumn(col.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete this column"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
