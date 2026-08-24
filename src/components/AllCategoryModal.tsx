import React, { useState } from 'react';
import { 
  X, Search, Flame, Star, Sparkles, Briefcase, 
  FileText, Image as ImageIcon, Calculator, Code2, 
  Database, ArrowRight, ShieldCheck
} from 'lucide-react';
import { ToolCategory, ToolItem } from '../types';
import { TOOLS_DATABASE, CATEGORY_METADATA } from '../data/toolsData';

interface AllCategoryModalProps {
  category: ToolCategory;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
}

export const AllCategoryModal: React.FC<AllCategoryModalProps> = ({ category, onClose, onSelectTool }) => {
  const [search, setSearch] = useState('');
  const meta = CATEGORY_METADATA[category];

  // Base list of tools for this category
  const tools = TOOLS_DATABASE.filter(t => t.category === category);

  // Filter with query
  const filtered = tools.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div 
      id="category-modal-overlay"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
    >
      <div 
        id="category-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
              {meta.title.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{meta.title}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  {meta.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500">{meta.desc}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search in ${meta.title}...`}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tools List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map(tool => (
              <div
                key={tool.id}
                onClick={() => { onSelectTool(tool.id); onClose(); }}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-xl p-4 cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h4>
                    {tool.isHot && (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0">
                        <Flame className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> HOT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {tool.workingBadge}
                  </span>
                  <span className="text-slate-900 font-bold group-hover:text-blue-600 flex items-center gap-1">
                    Launch Tool <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>All {meta.count} tools are 100% browser-based with zero signup</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
