import React, { useState, useMemo } from 'react';
import { 
  Search, Code, Copy, Check, ExternalLink, ArrowLeft, 
  Sparkles, ShieldCheck, Globe, Share2, Layers, CheckCircle2 
} from 'lucide-react';
import { ALL_DIRECTORY_TOOLS } from '../data/allToolsDirectory';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';
import { BrandLogo } from '../components/BrandLogo';

interface BacklinksDirectoryPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const BacklinksDirectoryPage: React.FC<BacklinksDirectoryPageProps> = ({ 
  onNavigateHome, 
  onNavigateTo 
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: `All Tools (${TOTAL_TOOLS_COUNT})` },
    { key: 'pdf', label: 'PDF Tools' },
    { key: 'image', label: 'Image Tools' },
    { key: 'calculator', label: 'Calculators' },
    { key: 'job-ats', label: 'Job & ATS' },
    { key: 'ai-study', label: 'AI Study' },
    { key: 'dev-pro', label: 'Developer' },
    { key: 'notion', label: 'Notion' }
  ];

  const filteredTools = useMemo(() => {
    return ALL_DIRECTORY_TOOLS.filter(tool => {
      const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = !search.trim() || 
        tool.name.toLowerCase().includes(search.toLowerCase()) || 
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.slug.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    }).slice(0, 100); // paginate top 100 for high speed rendering
  }, [search, selectedCategory]);

  const generateEmbedSnippet = (tool: { name: string; slug: string }) => {
    return `<!-- FreeToolsNoSignup Embed Widget -->
<div style="width:100%;max-width:800px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;font-family:sans-serif;">
  <iframe src="https://www.freetoolsnosignup.com/embed/${tool.slug}" width="100%" height="520" frameborder="0" style="border:none;"></iframe>
  <div style="background:#f8fafc;padding:8px 12px;text-align:center;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;">
    Free utility provided by <a href="https://www.freetoolsnosignup.com/tools/${tool.slug}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:bold;text-decoration:none;">Free ${tool.name} - No Signup</a> on FreeToolsNoSignup (${TOTAL_TOOLS_COUNT} Free Tools).
  </div>
</div>`;
  };

  const handleCopy = (tool: { name: string; slug: string }) => {
    const snippet = generateEmbedSnippet(tool);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setCopiedSlug(tool.slug);
      setTimeout(() => setCopiedSlug(null), 2500);
    }
  };

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
              <span>Back to Directory</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTo('/partners')}
              className="px-3 py-1.5 rounded-xl bg-[#EBF3FF] hover:bg-[#D5E7FF] text-[#126BFF] font-bold text-xs border border-[#C8DDFF] transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Partner Showcase</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        
        {/* Hero Pitch */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FF] text-[#126BFF] border border-[#C8DDFF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#FF7A00]" />
              Embed &amp; Backlink Hub
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold">
              100% Free White-Label Embeds
            </span>
          </div>

          <h1 className="font-serif-royal text-2xl sm:text-4xl font-bold text-[#0A1931] tracking-tight">
            {TOTAL_TOOLS_COUNT} Free Tools for Your Website, Blog &amp; Notion
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
            Supercharge your blog posts, documentation portals, educational courses, and resource directories. Embed interactive PDF mergers, image converters, compound interest visualizers, or ATS resume scanners directly onto your site with zero API keys and zero subscription fees.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0] text-xs">
            <div className="flex items-center gap-2 text-[#475569]">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Zero server latency (100% client-side)</span>
            </div>
            <div className="flex items-center gap-2 text-[#475569]">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Mobile-responsive iframe container</span>
            </div>
            <div className="flex items-center gap-2 text-[#475569]">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Built-in attribution backlink</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by tool name or function (e.g. PDF Merge, BMI, SVG)..."
                className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#126BFF]"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === c.key
                    ? 'bg-[#0A1931] text-white shadow-xs'
                    : 'bg-[#F4F7FC] text-[#475569] hover:bg-[#EBF3FF] hover:text-[#126BFF] border border-[#E2E8F0]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Catalog with 1-Click Embed Snippet Copy */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
            <span>Showing {filteredTools.length} embeddable tools</span>
            <span>Click "Copy Embed Code" to paste into HTML/WordPress</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTools.map((tool) => {
              const isCopied = copiedSlug === tool.slug;
              return (
                <div 
                  key={tool.id} 
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#126BFF] transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#EBF3FF] text-[#126BFF]">
                        {tool.categoryName || tool.category}
                      </span>
                      <a
                        href={`/tools/${tool.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigateTo(`/tools/${tool.slug}`);
                        }}
                        className="text-xs text-[#126BFF] hover:underline flex items-center gap-1"
                      >
                        <span>View Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <h3 className="font-bold text-sm text-[#0B1F3A]">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  {/* Embed Snippet Preview */}
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-[11px] text-[#475569] truncate">
                      {`<iframe src="https://www.freetoolsnosignup.com/embed/${tool.slug}" width="100%" height="500"></iframe>`}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(tool)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs ${
                          isCopied 
                            ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]' 
                            : 'bg-[#0A1931] hover:bg-[#126BFF] text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#059669]" />
                            <span>Code Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Embed Code</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`/embed/${tool.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] text-[#0B1F3A] hover:text-[#126BFF] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1"
                        title="Preview Embed in New Tab"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
};
