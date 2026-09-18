import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, ThumbsUp, ShieldCheck, Globe, Code, Copy, Check, Sparkles, Share2 } from 'lucide-react';
import { INITIAL_PRODUCTS, ProductItem } from '../data/mockProducts';
import { Footer } from '../components/Footer';

interface ProductDetailPageProps {
  slug: string;
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigateHome, onNavigateTo }) => {
  const products: ProductItem[] = (() => {
    const saved = localStorage.getItem('freetools_directory_products');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_PRODUCTS; }
    }
    return INITIAL_PRODUCTS;
  })();

  const product = products.find(p => p.slug === slug) || products[0];
  const [copied, setCopied] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [votes, setVotes] = useState(product.upvotes);

  const dofollowHtml = `<a href="${product.url}" target="_blank" rel="dofollow noopener" title="${product.name} - ${product.tagline}">${product.name}</a>`;

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(dofollowHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleUpvote = () => {
    if (!upvoted) {
      setVotes(v => v + 1);
      setUpvoted(true);
    } else {
      setVotes(v => v - 1);
      setUpvoted(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigateTo('/directory')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Directory</span>
            </button>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="FreeToolsNoSignup Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          <a
            href={product.url}
            target="_blank"
            rel="dofollow noopener"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 flex-1">
        
        {/* PRODUCT HERO CARD */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 flex items-center justify-center text-4xl shadow-sm">
                {product.logo}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 rounded-full bg-purple-100 text-[#7C3AED] text-xs font-extrabold uppercase">
                    {product.category}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {product.pricing}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                  {product.name}
                </h1>
              </div>
            </div>

            <button
              onClick={handleUpvote}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold text-sm transition shadow-sm cursor-pointer ${
                upvoted ? 'bg-[#7C3AED] border-[#7C3AED] text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#7C3AED]'
              }`}
            >
              <ThumbsUp className={`w-5 h-5 ${upvoted ? 'fill-current' : ''}`} />
              <span>{votes} Upvotes</span>
            </button>
          </div>

          <p className="text-lg font-bold text-slate-900 border-l-4 border-[#7C3AED] pl-4 py-1">
            {product.tagline}
          </p>

          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              Submitted on <span className="text-slate-800 font-bold">{product.submittedDate}</span>
            </div>
            <a
              href={product.url}
              target="_blank"
              rel="dofollow noopener"
              className="px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm shadow-md transition flex items-center gap-2"
            >
              <span>Launch {product.name}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* DOFOLLOW BACKLINK WIDGET SECTION */}
        <div className="bg-gradient-to-br from-slate-900 to-[#0F172A] text-white rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[#EC4899] flex items-center justify-center font-bold">
              🔗
            </div>
            <div>
              <h3 className="text-lg font-bold">Dofollow Backlink &amp; Embed Widget</h3>
              <p className="text-xs text-slate-400">Grab the permanent dofollow HTML backlink for your website or blog.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>HTML Snippet (Dofollow)</span>
              <span className="text-emerald-400">✓ Verified SEO Backlink</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto flex items-center justify-between gap-4">
              <code>{dofollowHtml}</code>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RELATED TOOLS IN DIRECTORY */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-extrabold text-[#0F172A]">Explore More Tools in {product.category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4).map(p => (
              <div
                key={p.id}
                onClick={() => onNavigateTo(`/directory/${p.slug}`)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#7C3AED] shadow-xs cursor-pointer flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2.5 bg-purple-50 rounded-xl">{p.logo}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-[#7C3AED] transition text-sm">{p.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{p.tagline}</p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-[#7C3AED] transition">→</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <Footer onNavigate={onNavigateTo} />

    </div>
  );
};
