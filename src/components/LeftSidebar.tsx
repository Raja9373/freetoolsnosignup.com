import React from 'react';
import { 
  Flame, Heart, History, Sparkles, Briefcase, 
  FileText, Image as ImageIcon, Calculator, Code2, 
  Database, ShieldCheck, Trash2, Zap
} from 'lucide-react';
import { ToolItem, RecentTool } from '../types';
import { TOOLS_DATABASE } from '../data/toolsData';
import { AdSenseBanner } from './AdSenseBanner';
import { useTranslation } from '../i18n/I18nContext';
import { BrandLogo } from './BrandLogo';

interface LeftSidebarProps {
  recentTools: RecentTool[];
  favorites: string[];
  onToggleFavorite: (toolId: string) => void;
  onSelectTool: (toolId: string) => void;
  onClearRecent: () => void;
  className?: string;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  recentTools,
  favorites,
  onToggleFavorite,
  onSelectTool,
  onClearRecent,
  className = ''
}) => {
  const { t } = useTranslation();

  // Top 15 Popular tools sorted by run count
  const popularTools = [...TOOLS_DATABASE]
    .sort((a, b) => b.runsCount - a.runsCount)
    .slice(0, 15);

  const favoriteToolObjects = TOOLS_DATABASE.filter(t => favorites.includes(t.id));

  const getToolIcon = (tool: ToolItem) => {
    switch (tool.category) {
      case 'job-ats': return <Briefcase className="w-3.5 h-3.5 text-[#C5A059]" />;
      case 'ai-study': return <Sparkles className="w-3.5 h-3.5 text-[#1E3A5F]" />;
      case 'dev-pro': return <Code2 className="w-3.5 h-3.5 text-cyan-700" />;
      case 'pdf': return <FileText className="w-3.5 h-3.5 text-[#1E3A5F]" />;
      case 'image': return <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />;
      case 'calculator': return <Calculator className="w-3.5 h-3.5 text-[#C5A059]" />;
      case 'notion': return <Database className="w-3.5 h-3.5 text-[#0A1931]" />;
      default: return <Database className="w-3.5 h-3.5 text-[#64748B]" />;
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <aside 
      id="left-sidebar-column"
      className={`w-full bg-[#F4F7FC] border-r border-[#E2E8F0] p-4 flex flex-col gap-6 select-none ${className}`}
    >
      {/* Brand Header */}
      <div className="flex flex-col gap-2.5">
        <a href="/" className="block">
          <BrandLogo variant="full" showTagline={true} />
        </a>

        {/* Royal Linear/Stripe Status Badge */}
        <div className="flex items-center justify-between bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-xl text-[#0A1931] shadow-[0_2px_8px_rgba(10,25,49,0.03)]">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[#0A1931] font-bold tracking-tight">4,753 Tools Active</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#C5A059] bg-[#0A1931] px-2 py-0.5 rounded">NO SIGNUP</span>
        </div>
      </div>

      {/* SECTION 1: RECENTLY USED */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          <span className="flex items-center gap-1.5 text-[#0A1931]">
            <History className="w-3.5 h-3.5 text-[#C5A059]" />
            {t('recentlyUsed', 'Recently Used')}
          </span>
          {recentTools.length > 0 && (
            <button
              onClick={onClearRecent}
              className="text-[10px] font-semibold text-[#64748B] hover:text-[#0A1931] flex items-center gap-0.5"
              title={t('clearRecent', 'Clear recent')}
            >
              <Trash2 className="w-2.5 h-2.5" /> {t('clearRecent', 'Clear')}
            </button>
          )}
        </div>

        {recentTools.length === 0 ? (
          <div className="p-3 bg-white border border-dashed border-[#CBD5E1] rounded-xl text-[11px] text-[#64748B] text-center">
            {t('noRecent', 'No recently run tools yet')}
          </div>
        ) : (
          <div className="space-y-1.5">
            {recentTools.slice(0, 5).map((recent) => (
              <div
                key={recent.id}
                onClick={() => onSelectTool(recent.id)}
                className="p-2.5 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0A1931] rounded-xl cursor-pointer flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-[#F8FAFC] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                    <Zap className="w-3 h-3 text-[#C5A059]" />
                  </div>
                  <span className="text-xs font-medium text-[#0F172A] truncate group-hover:text-[#0A1931]">
                    {recent.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#64748B] shrink-0 font-mono">
                  {formatTimeAgo(recent.usedAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: POPULAR TOOLS (TOP 15) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          <span className="flex items-center gap-1.5 text-[#0A1931]">
            <Flame className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
            {t('top15Popular', 'Top 15 Popular')}
          </span>
          <span className="text-[10px] font-mono text-[#8C6B28] font-bold bg-[#F7F3EB] px-2 py-0.5 rounded border border-[#E8DCBE]">HOT</span>
        </div>

        <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
          {popularTools.map((tool, idx) => {
            const isFav = favorites.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="p-2.5 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0A1931] rounded-xl cursor-pointer flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] w-4">
                    {idx + 1}.
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-[#F8FAFC] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                    {getToolIcon(tool)}
                  </div>
                  <span className="text-xs font-medium text-[#0F172A] truncate group-hover:text-[#0A1931]">
                    {tool.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(tool.id);
                    }}
                    className={`p-1 rounded-md hover:bg-[#F8FAFC] transition-colors ${
                      isFav ? 'text-[#C5A059]' : 'text-slate-300 hover:text-slate-500'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#C5A059]' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: FAVORITES */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#64748B]">
          <span className="flex items-center gap-1.5 text-[#071A3D]">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            {t('favorites', 'Favorites')} ({favorites.length})
          </span>
        </div>

        {favoriteToolObjects.length === 0 ? (
          <div className="p-3 bg-white border border-dashed border-[#CBD5E1] rounded-xl text-[11px] text-[#64748B] text-center">
            {t('noFavorites', 'No starred favorites yet. Click the heart on any tool.')}
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
            {favoriteToolObjects.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="p-2.5 bg-white hover:bg-[#F8FAFD] border border-[#E2E8F0] hover:border-[#126BFF] rounded-xl cursor-pointer flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </div>
                  <span className="text-xs font-bold text-[#0B1F3A] truncate group-hover:text-rose-600">
                    {tool.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(tool.id);
                  }}
                  className="p-1 text-rose-500 hover:text-slate-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM ADSENSE 300x600 SKYSCRAPER */}
      <div className="mt-auto pt-2">
        <AdSenseBanner format="300x600" />
      </div>

    </aside>
  );
};
