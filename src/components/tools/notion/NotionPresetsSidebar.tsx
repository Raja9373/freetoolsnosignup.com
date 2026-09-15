import React, { useState, useMemo } from 'react';
import { Sparkles, Search, Layers, ArrowRight, Check } from 'lucide-react';
import { NotionPresetTemplate } from '../../../types';
import { NOTION_PRESETS, getPresetTypeTag } from '../notionBuilderCatalog';

interface NotionPresetsSidebarProps {
  onSelectPreset: (preset: NotionPresetTemplate) => void;
  activePresetName?: string;
}

export const NotionPresetsSidebar: React.FC<NotionPresetsSidebarProps> = ({
  onSelectPreset,
  activePresetName
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Filter presets
  const filteredPresets = useMemo(() => {
    return NOTION_PRESETS.filter((p) => {
      const tag = getPresetTypeTag(p);
      const matchesTag = selectedTag === 'All' || tag === selectedTag;
      if (!matchesTag) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedTag]);

  const TAGS = ['All', 'Planner', 'Tracker', 'Database', 'Logbook'];

  return (
    <aside id="presets" className="space-y-4">
      <div id="presets-section" className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0A1931] text-[#C5A059] flex items-center justify-center font-bold text-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0A1931] tracking-tight uppercase">
                25 Presets
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                1-Click Ready Schemas
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#C5A059] border border-amber-200">
            25 Active
          </span>
        </div>

        {/* Search Presets */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 25 presets..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#C5A059] focus:bg-white focus:outline-hidden rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0A1931] placeholder:text-slate-400 font-medium transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#0A1931] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Presets List */}
        <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
          {filteredPresets.map((preset, idx) => {
            const isActive = activePresetName === preset.name;
            const tag = getPresetTypeTag(preset);

            return (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-left group ${
                  isActive
                    ? 'border-[#C5A059] bg-amber-50/50 shadow-2xs'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {preset.icon}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-[#0A1931] group-hover:text-[#C5A059] transition-colors truncate">
                        {idx + 1}. {preset.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1">
                        {preset.description}
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <span className="p-0.5 rounded-full bg-emerald-500 text-white shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-slate-600">
                    {preset.columns.length} props
                  </span>
                  <span className="font-bold text-[#0A1931] group-hover:text-[#C5A059] flex items-center gap-0.5">
                    Load Schema <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
