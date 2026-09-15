import React from 'react';
import { Heart, ArrowRight, FileText, Image as ImageIcon, Calculator, Briefcase, Sparkles, Code2, Database } from 'lucide-react';
import { SearchableTool } from '../utils/aiToolSearch';

interface ChatToolCardProps {
  tool: SearchableTool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  onOpenTool: (slug: string) => void;
}

export const ChatToolCard: React.FC<ChatToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  onOpenTool
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pdf': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-emerald-400" />;
      case 'calculator': return <Calculator className="w-4 h-4 text-[#C5A059]" />;
      case 'job-ats': return <Briefcase className="w-4 h-4 text-[#C5A059]" />;
      case 'ai-study': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'dev-pro': return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'notion': return <Database className="w-4 h-4 text-[#E5C77A]" />;
      default: return <Sparkles className="w-4 h-4 text-[#C5A059]" />;
    }
  };

  return (
    <div className="bg-[#142646] border border-[#C5A059]/30 hover:border-[#C5A059] rounded-xl p-3 text-white transition-all shadow-md space-y-2 group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#0A1931] border border-[#C5A059]/40 flex items-center justify-center shrink-0">
            {getCategoryIcon(tool.category)}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white group-hover:text-[#C5A059] transition-colors truncate">
              {tool.name}
            </h4>
            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Free, No Signup
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(tool.slug || tool.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
            isFavorite
              ? 'bg-red-500/20 text-red-400 border-red-500/40'
              : 'bg-white/5 text-slate-400 hover:text-white border-white/10 hover:border-white/20'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-red-400' : ''}`} />
        </button>
      </div>

      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
        {tool.description}
      </p>

      <div className="pt-1 flex items-center justify-between border-t border-white/10 text-xs">
        <span className="text-[10px] text-slate-400 font-mono">{tool.categoryName}</span>
        <button
          onClick={() => onOpenTool(tool.slug || tool.id)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A1931] font-bold text-[11px] shadow-sm transition active:scale-95"
        >
          <span>Open Tool</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
