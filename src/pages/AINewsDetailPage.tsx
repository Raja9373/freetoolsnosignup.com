import React, { useState } from 'react';
import { ArrowLeft, Clock, ExternalLink, Sparkles, Share2, Rss, CheckCircle, ThumbsUp } from 'lucide-react';
import { INITIAL_NEWS, NewsItem } from '../data/mockNews';
import { Footer } from '../components/Footer';

interface AINewsDetailPageProps {
  slug: string;
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const AINewsDetailPage: React.FC<AINewsDetailPageProps> = ({ slug, onNavigateHome, onNavigateTo }) => {
  const newsList: NewsItem[] = (() => {
    const saved = localStorage.getItem('freetools_ai_news');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_NEWS; }
    }
    return INITIAL_NEWS;
  })();

  const article = newsList.find(n => n.slug === slug) || newsList[0];
  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(l => l + 1);
      setLiked(true);
    } else {
      setLikes(l => l - 1);
      setLiked(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#064E3B] flex flex-col font-sans selection:bg-[#10B981] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigateTo('/news')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to AI News</span>
            </button>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="FreeToolsNoSignup Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          <button
            onClick={() => onNavigateTo('/directory')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:opacity-90 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Try our Free AI Tools</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 flex-1">
        
        {/* ARTICLE HEADER & METADATA */}
        <div className="space-y-6 bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#10B981] text-xs font-extrabold uppercase">
                {article.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                Auto Updated RSS Feed
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock className="w-4 h-4 text-[#10B981]" />
              <span>{article.timeAgo}</span>
              <span>• Source: <strong className="text-slate-900">{article.source}</strong></span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-lg font-medium text-slate-600 border-l-4 border-[#10B981] pl-4 py-1 leading-relaxed">
            {article.summary}
          </p>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 sm:h-[420px] bg-slate-100 relative">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* ARTICLE BODY */}
          <div className="prose prose-emerald max-w-none text-slate-700 text-base leading-relaxed space-y-6 pt-4">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* CALL TO ACTION BOX: TRY OUR FREE AI TOOLS */}
          <div className="my-10 p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-[#064E3B] to-emerald-950 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase">
                Free Developer Utilities
              </span>
              <h3 className="text-2xl font-extrabold">Ready to build with AI?</h3>
              <p className="text-xs text-emerald-200">
                Explore 250+ free tools, PDF converters, calculators, and SaaS directories with zero signup required.
              </p>
            </div>
            <button
              onClick={() => onNavigateTo('/directory')}
              className="px-6 py-3.5 bg-[#10B981] hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try our Free AI Tools ↗</span>
            </button>
          </div>

          {/* SHARE & LIKES BAR */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-bold text-xs transition cursor-pointer ${
                liked ? 'bg-[#10B981] border-[#10B981] text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#10B981]'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likes} Helpful Upvotes</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied to Clipboard!' : 'Share Article'}</span>
            </button>
          </div>

        </div>

        {/* RELATED NEWS IN CATEGORY */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-extrabold text-slate-900">More in {article.category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {newsList.filter(n => n.category === article.category && n.slug !== article.slug).slice(0, 4).map(n => (
              <div
                key={n.id}
                onClick={() => onNavigateTo(`/news/${n.slug}`)}
                className="bg-white p-5 rounded-2xl border border-emerald-100 hover:border-[#10B981] shadow-xs cursor-pointer flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl p-2 bg-emerald-50 rounded-xl">📰</span>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-[#10B981] transition text-sm line-clamp-1">{n.title}</h4>
                    <p className="text-xs text-slate-500">{n.timeAgo} • {n.source}</p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-[#10B981] transition">→</span>
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
