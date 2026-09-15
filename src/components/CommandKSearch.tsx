import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ArrowRight, CornerDownLeft, Flame, Briefcase, FileText, Image as ImageIcon, Calculator, Code2, Database } from 'lucide-react';
import { TOOLS_DATABASE } from '../data/toolsData';
import { ToolItem } from '../types';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';
import { useTranslation } from '../i18n/I18nContext';

interface CommandKSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
}

export const CommandKSearch: React.FC<CommandKSearchProps> = ({ isOpen, onClose, onSelectTool }) => {
  const { t } = useTranslation();
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
      case 'job-ats': return <Briefcase className="w-4 h-4 text-[#FF7A00]" />;
      case 'ai-study': return <Sparkles className="w-4 h-4 text-[#126BFF]" />;
      case 'dev-pro': return <Code2 className="w-4 h-4 text-cyan-600" />;
      case 'pdf': return <FileText className="w-4 h-4 text-[#126BFF]" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-emerald-600" />;
      case 'calculator': return <Calculator className="w-4 h-4 text-purple-600" />;
      default: return <Database className="w-4 h-4 text-[#64748B]" />;
    }
  };

  return (
    <div 
      id="command-k-overlay" 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#071A3D]/70 backdrop-blur-xs flex items-start justify-center p-3 pt-16 sm:pt-24 animate-in fade-in duration-100"
    >
      <div 
        id="command-k-modal" 
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-100 flex flex-col"
      >
        
        {/* Search Header */}
        <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3 bg-[#F4F7FC]">
          <Search className="w-5 h-5 text-[#64748B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder={t('searchPlaceholder', `Search ${TOTAL_TOOLS_COUNT} tools (e.g., ATS check, AI detector, PDF merge, fake data, EMI)...`)}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-[#0B1F3A] placeholder:text-[#64748B] outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-mono font-semibold text-[#64748B] bg-white border border-[#E2E8F0] rounded-md shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2.5 space-y-1.5">
          {filteredTools.length === 0 ? (
            <div className="p-8 text-center text-[#64748B] text-sm">
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
                    isSelected ? 'bg-[#EBF3FF] border border-[#126BFF] text-[#071A3D]' : 'hover:bg-[#F8FAFD] border border-transparent text-[#0B1F3A]'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 shadow-2xs">
                      {getCategoryIcon(tool.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0B1F3A] truncate">{tool.name}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                          {tool.workingBadge}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] truncate mt-0.5">{tool.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-[#FF7A00] flex items-center gap-1">
                      Run <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#F4F7FC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E2E8F0] rounded text-[10px]">↵</kbd> Select
            </span>
          </div>
          <span className="font-semibold text-[#071A3D]">{TOTAL_TOOLS_COUNT} Working Browser Tools</span>
        </div>

      </div>
    </div>
  );
};
