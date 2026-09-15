import React, { useMemo } from 'react';
import { Flame, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import toolsData from '../data/tools.json';

interface ToolOfTheDayProps {
  onOpenTool: (toolSlugOrId: string) => void;
}

export const ToolOfTheDay: React.FC<ToolOfTheDayProps> = ({ onOpenTool }) => {
  const dailyTool = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = (dayOfYear * 7 + 42) % toolsData.length;
    return toolsData[index] || toolsData[0];
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#0A1931] via-[#142646] to-[#0A1931] border border-[#C5A059]/40 rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C5A059] text-[#0A1931] shadow-xs">
              <Flame className="w-3.5 h-3.5 text-[#0A1931] fill-current" />
              Tool of the Day
            </span>
            <span className="text-xs text-[#C5A059] font-mono font-semibold">
              Rotates Daily Across 2,753 Tools
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>🔥 {dailyTool.name}</span>
            <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10 hidden sm:inline-block">
              {dailyTool.categoryName || 'Productivity Tool'}
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {dailyTool.description}
          </p>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-0.5">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side Privacy
            </span>
            <span className="flex items-center gap-1 text-[#E5C77A]">
              <Zap className="w-3.5 h-3.5" /> No Signup & No Limits
            </span>
          </div>
        </div>

        <div className="shrink-0 flex items-center">
          <button
            onClick={() => onOpenTool(dailyTool.slug || dailyTool.id)}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4B06A] hover:from-[#D4B06A] hover:to-[#C5A059] text-[#0A1931] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Launch Tool Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
