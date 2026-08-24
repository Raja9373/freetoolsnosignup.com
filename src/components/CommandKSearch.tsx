import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ArrowRight, CornerDownLeft, Flame, Briefcase, FileText, Image as ImageIcon, Calculator, Code2, Database } from 'lucide-react';
import { TOOLS_DATABASE } from '../data/toolsData';
import { ToolItem } from '../types';

interface CommandKSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
}

export const CommandKSearch: React.FC<CommandKSearchProps> = ({ isOpen, onClose, onSelectTool }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredTools = TOOLS_DATABASE.filter(tool => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.categoryName.toLowerCase().includes(q) ||
      tool.tags.some(t => t.toLowerCase().includes(q))
    );
  }).slice(0, 12);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredTools.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredTools.length) % (filteredTools.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          onSelectTool(filteredTools[selectedIndex].id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex, onSelectTool, onClose]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'job-ats': return <Briefcase className="w-4 h-4 text-amber-600" />;
      case 'ai-study': return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'dev-pro': return <Code2 className="w-4 h-4 text-cyan-600" />;
      case 'pdf': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-emerald-600" />;
      case 'calculator': return <Calculator className="w-4 h-4 text-purple-600" />;
      default: return <Database className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div 
      id="command-k-overlay" 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center p-3 pt-16 sm:pt-24 animate-in fade-in duration-100"
    >
      <div 
        id="command-k-modal" 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-100 flex flex-col"
      >
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search 521 tools (e.g., ATS check, AI detector, PDF merge, fake data, EMI)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-mono font-semibold text-slate-500 bg-white border border-slate-200 rounded-md shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredTools.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching tools found for "{query}". Try "ATS", "PDF", "AI", or "Fake Data".
            </div>
          ) : (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => { onSelectTool(tool.id); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                    isSelected ? 'bg-amber-500/10 border border-amber-500/30 text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                      {getCategoryIcon(tool.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{tool.name}</span>
                        {tool.isHot && (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> HOT
                          </span>
                        )}
                        {tool.isNew && (
                          <span className="bg-cyan-100 text-cyan-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{tool.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {tool.categoryName}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-4 h-4 text-amber-600 animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>521 Tools • No Signup</span>
        </div>

      </div>
    </div>
  );
};
