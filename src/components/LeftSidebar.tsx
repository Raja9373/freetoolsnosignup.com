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
      case 'job-ats': return <Briefcase className="w-3.5 h-3.5 text-amber-600" />;
      case 'ai-study': return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
      case 'dev-pro': return <Code2 className="w-3.5 h-3.5 text-cyan-600" />;
      case 'pdf': return <FileText className="w-3.5 h-3.5 text-blue-600" />;
      case 'image': return <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />;
      case 'calculator': return <Calculator className="w-3.5 h-3.5 text-purple-600" />;
      case 'notion': return <Database className="w-3.5 h-3.5 text-amber-500" />;
      default: return <Database className="w-3.5 h-3.5 text-slate-600" />;
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
      className={`w-full bg-[#f8fafc] border-r border-slate-200/80 p-4 flex flex-col gap-6 select-none ${className}`}
    >
      {/* Brand Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shadow-sm tracking-tighter">
            FTNS
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
              FreeToolsNoSignup<span className="text-amber-500">.com</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
              {t('workingTools', '521 WORKING TOOLS')}
            </div>
          </div>
        </div>

        {/* Green Badge: No Signup Ever */}
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/90 px-2.5 py-1.5 rounded-xl text-emerald-900 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t('noSignupEver', 'No Signup Ever')}</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700">100% FREE</span>
        </div>
      </div>

      {/* SECTION 1: RECENTLY USED */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-slate-400" />
            {t('recentlyUsed', 'Recently Used')}
          </span>
          {recentTools.length > 0 && (
            <button
              onClick={onClearRecent}
              className="text-[10px] font-medium text-slate-400 hover:text-slate-700 flex items-center gap-0.5"
              title={t('clearRecent', 'Clear recent')}
            >
              <Trash2 className="w-2.5 h-2.5" /> {t('clearRecent', 'Clear')}
            </button>
          )}
        </div>

        {recentTools.length === 0 ? (
          <div className="p-3 bg-white/70 border border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 text-center">
            {t('noRecent', 'No recently run tools yet')}
          </div>
        ) : (
          <div className="space-y-1">
            {recentTools.slice(0, 5).map((recent) => (
              <div
                key={recent.id}
                onClick={() => onSelectTool(recent.id)}
                className="p-2 bg-white hover:bg-slate-100/90 border border-slate-200/80 rounded-xl cursor-pointer flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <Zap className="w-3 h-3 text-amber-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-600">
                    {recent.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                  {formatTimeAgo(recent.usedAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: POPULAR TOOLS (TOP 15) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            {t('top15Popular', 'Top 15 Popular')}
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-bold">HOT</span>
        </div>

        <div className="space-y-1 max-h-[290px] overflow-y-auto pr-1">
          {popularTools.map((tool, idx) => {
            const isFav = favorites.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="p-2 bg-white hover:bg-slate-100/90 border border-slate-200/80 rounded-xl cursor-pointer flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-[10px] font-mono font-bold text-slate-400 w-4">
                    {idx + 1}.
                  </span>
                  <div className="w-5 h-5 rounded bg-slate-50 flex items-center justify-center shrink-0">
                    {getToolIcon(tool)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-600">
                    {tool.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(tool.id);
                    }}
                    className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                      isFav ? 'text-rose-500' : 'text-slate-300 hover:text-slate-500'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-3 h-3 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: FAVORITES */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            {t('favorites', 'Favorites')} ({favorites.length})
          </span>
        </div>

        {favoriteToolObjects.length === 0 ? (
          <div className="p-3 bg-white/70 border border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 text-center">
            {t('noFavorites', 'No starred favorites yet. Click the heart on any tool.')}
          </div>
        ) : (
          <div className="space-y-1 max-h-[160px] overflow-y-auto">
            {favoriteToolObjects.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200/80 rounded-xl cursor-pointer flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-5 h-5 rounded bg-rose-50 flex items-center justify-center shrink-0">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate group-hover:text-rose-600">
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
