import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, CheckCircle, Search, X } from 'lucide-react';
import { searchToolsSemantic, SearchableTool } from '../utils/aiToolSearch';

interface AIToolFinderProps {
  onSelectTool: (toolSlug: string) => void;
}

export const AIToolFinder: React.FC<AIToolFinderProps> = ({ onSelectTool }) => {
  const [aiQuery, setAiQuery] = useState('');

  const quickPrompts = [
    'pdf jodna hai',
    'resume check karna hai',
    'notion database banana',
    'image ka background hatana',
    'fake credit card test data',
    'emi kist calculate'
  ];

  const results: SearchableTool[] = useMemo(() => {
    if (!aiQuery.trim() || aiQuery.trim().length < 2) return [];
    return searchToolsSemantic(aiQuery, 4);
  }, [aiQuery]);

  return (
    <div className="w-full bg-gradient-to-r from-[#0A1931]/5 via-[#C5A059]/10 to-[#0A1931]/5 border border-[#C5A059]/30 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0A1931] flex items-center justify-center text-[#C5A059] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0A1931] flex items-center gap-1.5">
              <span>Ask AI: What do you want to do?</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-[#C5A059] text-[#0A1931] rounded">
                Zero API · 100% Offline
              </span>
            </h3>
            <p className="text-[11px] text-[#475569]">
              Type naturally in Hindi, Hinglish, English, or Spanish — AI instantly finds the exact tool across 2,753 utilities.
            </p>
          </div>
        </div>
      </div>

      {/* AI Semantic Input Box */}
      <div className="relative flex items-center">
        <Sparkles className="w-4 h-4 text-[#C5A059] absolute left-3.5 pointer-events-none" />
        <input
          id="ai-tool-finder-input"
          type="text"
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          placeholder="E.g. 'resume check karna hai', 'pdf jodna hai', 'notion database banana', 'photo background hatana'..."
          className="w-full pl-10 pr-20 py-2.5 sm:py-3 bg-white border border-[#C5A059]/40 focus:border-[#0A1931] focus:ring-2 focus:ring-[#C5A059]/20 rounded-xl text-xs sm:text-sm font-medium text-[#0A1931] placeholder:text-[#94A3B8] outline-none shadow-2xs transition-all"
        />
        {aiQuery && (
          <button
            onClick={() => setAiQuery('')}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
        <span className="text-slate-500 font-medium shrink-0">Try:</span>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setAiQuery(prompt)}
            className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[#0A1931] border border-[#C5A059]/30 hover:border-[#C5A059] transition-all whitespace-nowrap shadow-2xs font-medium"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Instant Semantic AI Matches */}
      {results.length > 0 && (
        <div className="pt-2 border-t border-[#C5A059]/20 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0A1931]">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-[#059669]" />
              AI Found {results.length} Matching Tools for "{aiQuery}":
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {results.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.slug || tool.id)}
                className="p-3 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#C5A059] rounded-xl cursor-pointer shadow-2xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-[#0A1931] group-hover:text-[#C5A059] transition-colors truncate">
                      {tool.name}
                    </h4>
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
                      Free No Login
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-[#0A1931] group-hover:text-[#C5A059]">
                  <span className="text-[10px] text-slate-400 font-mono">{tool.categoryName}</span>
                  <span className="flex items-center gap-1">
                    Launch Tool <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
