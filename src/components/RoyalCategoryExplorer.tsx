import React, { useState } from 'react';
import { CATEGORY_TREE, CategoryNode } from '../data/categoryTree';
import { ALL_DIRECTORY_TOOLS, DirectoryTool } from '../data/allToolsDirectory';
import { ChevronRight, ArrowRight, Sparkles, Layers, Search, Flame, FolderTree, Compass, CheckCircle2 } from 'lucide-react';

interface RoyalCategoryExplorerProps {
  onSelectTool: (toolId: string) => void;
  onSelectCategory?: (categoryKey: string) => void;
}

export const RoyalCategoryExplorer: React.FC<RoyalCategoryExplorerProps> = ({
  onSelectTool,
  onSelectCategory
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('calculators');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeSubSubcategory, setActiveSubSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
    setActiveSubSubcategory(null);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  const currentCategoryObj = CATEGORY_TREE[activeCategory] || CATEGORY_TREE['calculators'];

  // Map category key to ALL_DIRECTORY_TOOLS category
  const getMappedCategory = (catKey: string) => {
    if (catKey === 'calculators') return 'calculator';
    if (catKey === 'ai-writing') return 'ai-study';
    if (catKey === 'career-ats') return 'job-ats';
    if (catKey === 'developer') return 'dev-pro';
    return catKey;
  };

  const mappedCat = getMappedCategory(activeCategory);
  const categoryTools = ALL_DIRECTORY_TOOLS.filter(t => t.category === mappedCat);

  // Filter tools by subcategory/sub-subcategory or search term
  const filteredTools = categoryTools.filter(t => {
    const matchesSearch = searchTerm === '' || 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSub = !activeSubcategory || 
      t.categoryName?.toLowerCase().includes(activeSubcategory.toLowerCase()) ||
      t.description.toLowerCase().includes(activeSubcategory.toLowerCase());

    const matchesSubSub = !activeSubSubcategory ||
      t.name.toLowerCase().includes(activeSubSubcategory.toLowerCase()) ||
      t.description.toLowerCase().includes(activeSubSubcategory.toLowerCase());

    return matchesSearch && matchesSub && matchesSubSub;
  });

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#F1F5F9]">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#0A1931] text-[#C5A059] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              3-Level Royal Directory
            </span>
            <span className="text-xs text-slate-500 font-medium">4,753 Browser-Native Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-royal font-bold text-[#0A1931] mt-2">
            Explore by Category, Subcategory & Operation
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Crystal-clear organization designed to help you find your exact tool in seconds with zero clutter. Click any category to filter instantly below.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tools & subcategories..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl outline-none focus:ring-2 focus:ring-[#0A1931] text-slate-800 font-medium"
          />
        </div>
      </div>

      {/* LEVEL 1: PRIMARY CATEGORIES (6 CARDS - 100% CLICKABLE WITH POINTER-EVENTS-NONE ON BADGES) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {Object.entries(CATEGORY_TREE).map(([key, cat]) => {
          const isSelected = activeCategory === key;
          return (
            <div
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'bg-[#0A1931] text-white border-[#0A1931] shadow-lg scale-[1.02]'
                  : 'bg-[#F8FAFC] hover:bg-white text-[#0A1931] border-[#E2E8F0] hover:border-[#0A1931]/60 shadow-xs hover:shadow-md'
              }`}
            >
              {cat.highlight && (
                <div className="absolute top-2 right-2 bg-[#C5A059] text-[#0A1931] text-[9px] font-bold px-2 py-0.5 rounded-full pointer-events-none z-10 shadow-xs uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="pointer-events-none">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{cat.icon}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-[#C5A059]' : 'bg-slate-200/70 text-slate-700'
                  }`}>
                    {cat.count}+
                  </span>
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold font-serif-royal leading-snug ${isSelected ? 'text-white' : 'text-[#0A1931]'}`}>
                    {cat.label}
                  </h4>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/20 flex items-center justify-between text-[10px] font-bold pointer-events-none opacity-80 group-hover:opacity-100">
                <span className={isSelected ? 'text-[#C5A059]' : 'text-[#0A1931]'}>Browse Tools</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* LEVEL 2 & 3: SUBCATEGORIES & SUB-SUBCATEGORIES & TOOLS (SINGLE UNIFIED BOX - NO DUPLICATE BOX) */}
      <div id="tools-grid-section" className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentCategoryObj.icon}</span>
            <h3 className="text-lg font-bold font-serif-royal text-[#0A1931]">
              {currentCategoryObj.label} Subcategories & Tool Operations
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1 rounded-xl border border-slate-200">
            {filteredTools.length} Utilities Available
          </span>
        </div>

        {/* Subcategories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(currentCategoryObj.subcategories).map(([subName, subData]) => {
            const isSubSelected = activeSubcategory === subName;
            return (
              <div
                key={subName}
                onClick={() => {
                  setActiveSubcategory(isSubSelected ? null : subName);
                  setActiveSubSubcategory(null);
                }}
                className={`bg-white border rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer ${
                  isSubSelected ? 'border-[#0A1931] ring-2 ring-[#0A1931]/10' : 'border-[#E2E8F0] hover:border-[#0A1931]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0A1931] group-hover:text-[#C5A059] transition-colors flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                      {subName}
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-[#F8FAFC] text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                      {subData.count} tools
                    </span>
                  </div>

                  {/* Sub-subcategories */}
                  <div className="space-y-1 mt-2 pt-2 border-t border-[#F1F5F9]">
                    {subData.subs.map((subSub, idx) => {
                      const isSubSubSelected = activeSubSubcategory === subSub;
                      return (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSubcategory(subName);
                            setActiveSubSubcategory(isSubSubSelected ? null : subSub);
                          }}
                          className={`text-xs p-1 rounded-lg cursor-pointer flex items-center justify-between transition-colors font-medium ${
                            isSubSubSelected
                              ? 'bg-[#0A1931] text-white'
                              : 'text-slate-600 hover:text-[#0A1931] hover:bg-[#F8FAFC]'
                          }`}
                        >
                          <span className="flex items-center gap-1 truncate">
                            <ChevronRight className="w-3 h-3 text-[#C5A059] shrink-0" />
                            <span className="truncate">{subSub}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 w-full text-[11px] font-bold text-[#0A1931] group-hover:text-[#C5A059] flex items-center justify-between transition-colors">
                  <span>{isSubSelected ? 'Active Filter (Click to Reset)' : `Filter ${subName}`}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools grid inside the SAME unified box (No second duplicate box) */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold font-serif-royal text-[#0A1931]">
              Tools for {activeSubcategory || currentCategoryObj.label} ({filteredTools.length})
            </h4>
            {(activeSubcategory || activeSubSubcategory || searchTerm) && (
              <button
                onClick={() => {
                  setActiveSubcategory(null);
                  setActiveSubSubcategory(null);
                  setSearchTerm('');
                }}
                className="text-xs font-bold text-blue-600 hover:underline bg-white px-3 py-1 rounded-lg border border-slate-200"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl border border-slate-200">
              <p className="text-xs font-bold text-slate-700">No matching tools found in this view.</p>
              <button
                onClick={() => { setActiveSubcategory(null); setActiveSubSubcategory(null); setSearchTerm(''); }}
                className="mt-2 text-xs text-blue-600 font-bold underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTools.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => {
                    console.log('Tool clicked:', tool.id);
                    onSelectTool(tool.id);
                  }}
                  className="bg-white border border-slate-200 hover:border-[#0A1931] rounded-xl p-4 cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#C5A059] transition-colors leading-snug">
                        {tool.name}
                      </h5>
                      {tool.isFlagship && (
                        <span className="bg-amber-100 text-amber-950 text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-[10px]">
                      Working 100%
                    </span>
                    <span className="text-[#0A1931] font-bold group-hover:text-[#C5A059] flex items-center gap-1 transition-colors">
                      Launch Tool <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
