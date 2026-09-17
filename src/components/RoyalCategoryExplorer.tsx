import React, { useState } from 'react';
import { CATEGORY_TREE, CategoryNode } from '../data/categoryTree';
import { ChevronRight, ArrowRight, Sparkles, Layers, Search, FolderTree, Compass, CheckCircle2 } from 'lucide-react';

interface RoyalCategoryExplorerProps {
  onSelectCategory?: (categoryKey: string) => void;
  onSelectSubcategory?: (categoryKey: string, subcategoryName: string) => void;
  onSelectSubSubcategory?: (categoryKey: string, subcategoryName: string, subSubName: string) => void;
}

export const RoyalCategoryExplorer: React.FC<RoyalCategoryExplorerProps> = ({
  onSelectCategory,
  onSelectSubcategory,
  onSelectSubSubcategory
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('calculators');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentCategoryObj = CATEGORY_TREE[activeCategory] || CATEGORY_TREE['calculators'];

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
            Crystal-clear organization designed to help you find your exact tool in seconds with zero clutter.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subcategories..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl outline-none focus:ring-2 focus:ring-[#0A1931] text-slate-800 font-medium"
          />
        </div>
      </div>

      {/* LEVEL 1: PRIMARY CATEGORIES */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {Object.entries(CATEGORY_TREE).map(([key, cat]) => {
          const isSelected = activeCategory === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                setActiveSubcategory(null);
                if (onSelectCategory) onSelectCategory(key);
              }}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#0A1931] text-white border-[#0A1931] shadow-lg scale-[1.02]'
                  : 'bg-[#F8FAFC] hover:bg-white text-[#0A1931] border-[#E2E8F0] hover:border-[#0A1931]/40 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
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
                {cat.highlight && (
                  <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-[#C5A059]">
                    Most Popular
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* LEVEL 2 & 3: SUBCATEGORIES & SUB-SUBCATEGORIES */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentCategoryObj.icon}</span>
            <h3 className="text-lg font-bold font-serif-royal text-[#0A1931]">
              {currentCategoryObj.label} Subcategories & Tool Operations
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1 rounded-xl border border-slate-200">
            {currentCategoryObj.count} Utilities Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(currentCategoryObj.subcategories).map(([subName, subData]) => {
            const isSubSelected = activeSubcategory === subName;
            return (
              <div
                key={subName}
                className="bg-white border border-[#E2E8F0] hover:border-[#0A1931] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-[#0A1931] group-hover:text-[#C5A059] transition-colors flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                      {subName}
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-[#F8FAFC] text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                      {subData.count} tools
                    </span>
                  </div>

                  {/* LEVEL 3: SUB-SUBCATEGORIES (Specific Operations) */}
                  <div className="space-y-1.5 mt-3 pt-3 border-t border-[#F1F5F9]">
                    {subData.subs.map((subSub, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (onSelectSubSubcategory) {
                            onSelectSubSubcategory(activeCategory, subName, subSub);
                          }
                        }}
                        className="text-xs text-slate-600 hover:text-[#0A1931] hover:bg-[#F8FAFC] p-1.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors font-medium"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <ChevronRight className="w-3 h-3 text-[#C5A059] shrink-0" />
                          <span className="truncate">{subSub}</span>
                        </span>
                        <span className="text-[10px] text-[#C5A059] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          Launch →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onSelectSubcategory) {
                      onSelectSubcategory(activeCategory, subName);
                    }
                  }}
                  className="mt-4 pt-3 border-t border-slate-100 w-full text-xs font-bold text-[#0A1931] hover:text-[#C5A059] flex items-center justify-between transition-colors"
                >
                  <span>Explore All {subData.count} in {subName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
