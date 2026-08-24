import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { CATEGORY_METADATA, TOOLS_DATABASE } from '../data/toolsData';
import { ALL_521_DIRECTORY_TOOLS } from '../data/allToolsDirectory';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { AdUnitTopBanner, AdUnitInFeed } from '../components/AdUnits';
import { ToolCategory } from '../types';

interface CategoryPageProps {
  categoryKey: ToolCategory;
  onNavigateHome: () => void;
  onOpenTool: (toolId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryKey, onNavigateHome, onOpenTool }) => {
  const meta = CATEGORY_METADATA[categoryKey] || CATEGORY_METADATA['pdf'];
  const categoryTools = ALL_521_DIRECTORY_TOOLS.filter(t => t.category === categoryKey);
  const flagshipTools = TOOLS_DATABASE.filter(t => t.category === categoryKey);

  useEffect(() => {
    document.title = `${meta.title} (${meta.count} Free Tools) | FreeToolsNoSignup.com`;
    window.scrollTo(0, 0);
  }, [categoryKey, meta.title, meta.count]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Categories</span>
            </button>
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
              className="flex items-center gap-2"
            >
              <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                FTNS
              </span>
              <span className="font-extrabold text-sm text-slate-900">
                FreeToolsNoSignup<span className="text-amber-500">.com</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              {meta.badge}
            </span>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {/* Breadcrumb & Hero */}
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-slate-800">Home</a>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{meta.title}</span>
          </nav>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <span>{meta.title}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {categoryTools.length} Utilities Available
                  </span>
                </h1>
                <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">
                  {meta.desc} Everything executes 100% locally in browser memory with zero signup and zero data retention.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flagship Interactive Tool Launchers */}
        {flagshipTools.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Flagship Interactive Engines
              </h2>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Client-Side
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {flagshipTools.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => onOpenTool(tool.id)}
                  className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {tool.workingBadge || 'Interactive App'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {(tool.runsCount / 1000).toFixed(0)}k uses
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <button className="mt-4 w-full py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs group-hover:bg-amber-600 transition-colors flex items-center justify-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Launch Tool Now</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Complete Catalog Directory Listing for Category */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Full {meta.title} Directory ({categoryTools.length} Tools)
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {categoryTools.map((tool, idx) => (
              <React.Fragment key={tool.id}>
                {idx > 0 && idx % 12 === 0 && (
                  <div className="p-3 bg-slate-50 border-y border-slate-200">
                    <AdUnitInFeed index={idx} />
                  </div>
                )}
                <div 
                  onClick={() => {
                    const flagshipMatch = flagshipTools.find(f => f.id === tool.id);
                    if (flagshipMatch) {
                      onOpenTool(flagshipMatch.id);
                    } else if (flagshipTools[0]) {
                      onOpenTool(flagshipTools[0].id);
                    }
                  }}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 hover:text-amber-600 transition-colors truncate">
                          {tool.name}
                        </h3>
                        {tool.isFlagship && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 text-amber-900">
                            PRO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
                      /tools/{tool.slug}
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>
    </div>
  );
};
