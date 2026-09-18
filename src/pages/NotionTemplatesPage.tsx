import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Download, Star, Search, Sparkles, CheckCircle2, Bookmark, Layers } from 'lucide-react';
import { NOTION_TEMPLATES, NotionTemplate } from '../data/mockNotionTemplates';
import { Footer } from '../components/Footer';

interface NotionTemplatesPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const NotionTemplatesPage: React.FC<NotionTemplatesPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Productivity', 'Finance', 'Student', 'Life OS'];

  const filteredTemplates = NOTION_TEMPLATES.filter(tpl => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans selection:bg-[#F59E0B] selection:text-black">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs transition-colors cursor-pointer border border-neutral-800"
            >
              <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
              <span>Home</span>
            </button>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="FreeToolsNoSignup Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-bold items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 100% Free • One-Click Duplicate
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION - BLACK-GRAY WITH YELLOW ACCENTS */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-[#0A0A0A] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[#F59E0B] font-bold text-xs shadow-inner">
            <Layers className="w-3.5 h-3.5" /> Curated Notion Collection
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            99+ Free Notion Templates — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-amber-200">Aesthetic &amp; Functional</span>
          </h1>

          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            Boost your productivity, manage finances, and organize your student life with professional Notion workspaces. Duplicate instantly into your workspace in 1 click.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto relative pt-2">
            <div className="absolute inset-y-0 left-4 top-2 flex items-center pointer-events-none text-neutral-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates (e.g., Second Brain, Budget, Habits)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F59E0B] transition shadow-xl text-sm"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY TABS & FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#F59E0B] text-black shadow-lg shadow-amber-500/20 font-extrabold'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs font-bold text-neutral-400">
          Showing <span className="text-[#F59E0B] font-extrabold">{filteredTemplates.length}</span> templates
        </div>
      </div>

      {/* TEMPLATES GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-neutral-900 rounded-3xl border border-neutral-800 hover:border-[#F59E0B]/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-52 overflow-hidden bg-neutral-950">
                <img
                  src={template.imageUrl}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#F59E0B] text-xs font-extrabold border border-[#F59E0B]/30 uppercase tracking-wide">
                    {template.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{template.rating}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4 flex-1">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white group-hover:text-[#F59E0B] transition leading-snug">
                    {template.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                    <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>{template.downloads} downloads</span>
                  </div>

                  <a
                    href={template.notionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-black font-extrabold text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Duplicate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO INFORMATIVE SECTION */}
        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What is a Notion Template &amp; How to Duplicate in 1 Click?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-300 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F59E0B] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F59E0B]" /> What is Notion?
              </h3>
              <p>
                Notion is an all-in-one workspace that lets you write, plan, collaborate, and get organized. A Notion template is a pre-built page or system created by expert creators that you can instantly copy into your own workspace to supercharge your productivity.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F59E0B] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F59E0B]" /> How to Duplicate
              </h3>
              <p>
                Simply browse our curated directory, find the aesthetic template that fits your workflow (like Second Brain or Budget Planner), and click the <strong>Duplicate</strong> button. It will open directly in Notion where you can save it to your personal or team workspace in one click.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <Footer onNavigate={onNavigateTo} />

    </div>
  );
};
