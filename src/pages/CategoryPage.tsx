import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Zap, ArrowRight, ExternalLink, Search, CheckCircle2 } from 'lucide-react';
import { CATEGORY_METADATA, TOOLS_DATABASE } from '../data/toolsData';
import { ALL_DIRECTORY_TOOLS } from '../data/allToolsDirectory';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { AdUnitTopBanner, AdUnitInFeed } from '../components/AdUnits';
import { ToolCategory } from '../types';
import { BrandLogo } from '../components/BrandLogo';

interface CategoryPageProps {
  categoryKey: ToolCategory;
  onNavigateHome: () => void;
  onOpenTool: (toolId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryKey, onNavigateHome, onOpenTool }) => {
  const meta = CATEGORY_METADATA[categoryKey] || CATEGORY_METADATA['pdf'];
  const categoryTools = useMemo(() => ALL_DIRECTORY_TOOLS.filter(t => t.category === categoryKey), [categoryKey]);
  const flagshipTools = useMemo(() => TOOLS_DATABASE.filter(t => t.category === categoryKey), [categoryKey]);

  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(50);

  useEffect(() => {
    document.title = `${meta.title} (${meta.count} Free Tools) | FreeToolsNoSignup.com`;
    window.scrollTo(0, 0);
  }, [categoryKey, meta.title, meta.count]);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return categoryTools;
    const q = searchQuery.toLowerCase();
    return categoryTools.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.slug.includes(q));
  }, [categoryTools, searchQuery]);

  const displayedTools = filteredTools.slice(0, visibleLimit);

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col selection:bg-[#FF7A00] selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] hover:text-[#126BFF] text-[#0B1F3A] font-bold text-xs border border-[#E2E8F0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Categories</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% In-Browser Privacy
            </span>
          </div>
        </div>
      </header>

      {/* Top AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
        <AdUnitTopBanner />
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {/* Category Hero */}
        <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              Verified Category
            </span>
            <span className="text-xs font-semibold text-[#64748B]">
              {meta.count} Free Browser-Native Tools
            </span>
          </div>

          <h1 className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1931] tracking-tight leading-tight">
            {meta.title}
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
            {meta.description} All tools run 100% locally in your browser with zero signups, zero file uploads, and zero subscriptions.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#64748B] pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              Zero Cloud Uploads
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FF7A00]" />
              Instant Browser Processing
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[#126BFF] font-bold">100%</span>
              Free Forever
            </span>
          </div>
        </section>

        {/* Flagship Interactive Tool Launchers */}
        {flagshipTools.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Popular Interactive Engines in {meta.title}
              </h2>
              <span className="text-xs font-semibold text-[#64748B]">
                Instant In-Memory Launch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {flagshipTools.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => onOpenTool(tool.id)}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:border-[#126BFF] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] text-[#126BFF] flex items-center justify-center font-bold text-sm">
                        ⚡
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-bold">
                        Interactive
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0B1F3A] group-hover:text-[#126BFF] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#126BFF]">
                    <span>Launch Workspace</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Complete Catalog Directory Listing with Search & Virtualized Progressive Render */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Full {meta.title} Directory ({filteredTools.length} {filteredTools.length === 1 ? 'Tool' : 'Tools'})
            </h2>

            {/* Quick Search within Category */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleLimit(50);
                }}
                placeholder={`Search in ${meta.title}...`}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#126BFF] text-[#0B1F3A]"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] divide-y divide-[#F1F5F9] overflow-hidden shadow-xs">
            {displayedTools.map((tool, idx) => (
              <React.Fragment key={tool.id}>
                {idx > 0 && idx % 15 === 0 && (
                  <div className="p-3 bg-[#F4F7FC] border-y border-[#E2E8F0]">
                    <AdUnitInFeed index={idx} />
                  </div>
                )}
                <a
                  href={`/tools/${tool.slug}`}
                  onClick={(e) => {
                    // Allow normal navigation or modal
                    const flagshipMatch = flagshipTools.find(f => f.id === tool.id);
                    if (flagshipMatch) {
                      e.preventDefault();
                      onOpenTool(flagshipMatch.id);
                    }
                  }}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors block group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#126BFF] transition-colors truncate">
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
                    <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 group-hover:text-[#126BFF]">
                      /tools/{tool.slug}
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#126BFF] group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              </React.Fragment>
            ))}

            {filteredTools.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No tools matching "{searchQuery}". Try a different search query.
              </div>
            )}
          </div>

          {/* Progressive Load More to keep DOM lightweight and LCP < 1.5s */}
          {filteredTools.length > visibleLimit && (
            <div className="text-center pt-2">
              <button
                onClick={() => setVisibleLimit(prev => prev + 50)}
                className="px-6 py-2.5 bg-white hover:bg-[#EBF3FF] text-[#126BFF] font-bold text-xs rounded-xl border border-[#CBD5E1] shadow-2xs transition-colors"
              >
                Show More Tools ({visibleLimit} of {filteredTools.length} loaded)
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Bottom AdSense Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
        <AdSenseBanner slotType="leaderboard" />
      </div>
    </div>
  );
};
