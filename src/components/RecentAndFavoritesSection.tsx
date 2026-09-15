import React from 'react';
import { Clock, Heart, ArrowRight, Sparkles, FileText, Image as ImageIcon, Calculator, Briefcase, Code2, Database } from 'lucide-react';
import { RecentTool } from '../types';
import { ALL_DIRECTORY_TOOLS } from '../data/allToolsDirectory';

interface RecentAndFavoritesSectionProps {
  recentTools: RecentTool[];
  favorites: string[];
  onOpenTool: (toolIdOrSlug: string) => void;
  onToggleFavorite: (toolId: string) => void;
  onClearRecent?: () => void;
}

export const RecentAndFavoritesSection: React.FC<RecentAndFavoritesSectionProps> = ({
  recentTools,
  favorites,
  onOpenTool,
  onToggleFavorite,
  onClearRecent
}) => {
  const favoriteTools = React.useMemo(() => {
    return ALL_DIRECTORY_TOOLS.filter(t => favorites.includes(t.slug) || favorites.includes(t.id));
  }, [favorites]);

  const getToolIcon = (category: string) => {
    switch (category) {
      case 'pdf': return <FileText className="w-4 h-4 text-[#126BFF]" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-emerald-600" />;
      case 'calculator': return <Calculator className="w-4 h-4 text-[#C5A059]" />;
      case 'job-ats': return <Briefcase className="w-4 h-4 text-[#C5A059]" />;
      case 'ai-study': return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'dev-pro': return <Code2 className="w-4 h-4 text-cyan-600" />;
      case 'notion': return <Database className="w-4 h-4 text-[#0A1931]" />;
      default: return <Sparkles className="w-4 h-4 text-[#C5A059]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
      {/* SECTION 1: YOUR RECENT TOOLS */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0A1931] flex items-center justify-center text-[#C5A059]">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#0A1931]">
              Your Recent Tools ({recentTools.length})
            </h3>
          </div>
          {recentTools.length > 0 && onClearRecent && (
            <button
              onClick={onClearRecent}
              className="text-xs font-semibold text-slate-400 hover:text-red-600 transition"
            >
              Clear
            </button>
          )}
        </div>

        {recentTools.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] space-y-2">
            <p className="text-xs sm:text-sm text-[#64748B]">
              No recent tools yet. Try launching our top-rated utility:
            </p>
            <button
              onClick={() => onOpenTool('pdf-merge')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0A1931] text-[#C5A059] font-bold text-xs shadow-sm hover:bg-[#142646] transition"
            >
              <span>Try PDF Merge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {recentTools.slice(0, 6).map((rt) => (
              <div
                key={rt.id}
                onClick={() => onOpenTool(rt.id)}
                className="p-3 rounded-xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#C5A059] shadow-2xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    {getToolIcon(rt.category)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0A1931] group-hover:text-[#C5A059] truncate">
                      {rt.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 capitalize">{rt.category}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: YOUR FAVORITES */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#0A1931]">
              Your Favorites ({favorites.length})
            </h3>
          </div>
        </div>

        {favoriteTools.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] space-y-2">
            <p className="text-xs sm:text-sm text-[#64748B]">
              No favorites saved yet. Click the ❤️ on any tool to save it here for fast access!
            </p>
            <button
              onClick={() => onOpenTool('pdf-merge')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0A1931] font-bold text-xs shadow-2xs hover:border-[#C5A059] transition"
            >
              <span>Explore PDF Merge &amp; Combine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {favoriteTools.slice(0, 6).map((tool) => (
              <div
                key={tool.id}
                onClick={() => onOpenTool(tool.slug || tool.id)}
                className="p-3 rounded-xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-red-400 shadow-2xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    {getToolIcon(tool.category)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0A1931] group-hover:text-red-600 truncate">
                      {tool.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{tool.categoryName}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(tool.slug || tool.id);
                  }}
                  title="Remove from favorites"
                  className="p-1 rounded-md text-red-500 hover:text-red-700 transition"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
