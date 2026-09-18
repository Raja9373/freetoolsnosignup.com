import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, RefreshCw, Sparkles, ExternalLink, Rss, ChevronRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { INITIAL_NEWS, NewsItem } from '../data/mockNews';
import { Footer } from '../components/Footer';

interface AINewsPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const AINewsPage: React.FC<AINewsPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('freetools_ai_news');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_NEWS; }
    }
    return INITIAL_NEWS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lastUpdatedMinutes, setLastUpdatedMinutes] = useState<number>(23);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rssCopied, setRssCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('freetools_ai_news', JSON.stringify(newsList));
  }, [newsList]);

  // Simulate hourly auto update ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdatedMinutes(prev => (prev <= 1 ? 59 : prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdatedMinutes(0);
      setIsRefreshing(false);
    }, 800);
  };

  const categories = ['All', 'GPT-5', 'Gemini', 'Claude', 'AI Tools'];

  const featuredArticle = newsList.find(n => n.isFeatured) || newsList[0];
  const remainingArticles = newsList.filter(n => n.id !== featuredArticle.id).filter(n => {
    if (selectedCategory === 'All') return true;
    return n.category === selectedCategory;
  });

  const handleCopyRss = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://freetools.example.com/api/rss.xml');
      setRssCopied(true);
      setTimeout(() => setRssCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#064E3B] flex flex-col font-sans selection:bg-[#10B981] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="FreeToolsNoSignup Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Auto Updated ({lastUpdatedMinutes} mins ago)</span>
            </div>
            <button
              onClick={handleManualRefresh}
              className={`p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`}
              title="Refresh RSS Feed"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH EMERALD-TEAL THEME */}
      <section className="bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="max-w-5xl mx-auto space-y-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-bold text-xs border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" /> Real-time Artificial Intelligence News &amp; RSS Feeds
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            AI News - Auto Updated Hourly
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base font-medium">
            Cloned from artificialintelligence-news.com. Tracking GPT-5, Gemini 2.5, Claude 3.7, and autonomous AI agents in real time.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-lg bg-black/20 text-emerald-100 text-xs font-mono font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-300" /> Last RSS Fetch: {lastUpdatedMinutes} minutes ago
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              Tag: Auto Updated
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORIES NAV */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full flex flex-wrap items-center justify-between gap-4 border-b border-emerald-200/60">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#10B981] text-white shadow-md'
                  : 'bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs font-bold text-emerald-800">
          Showing <span className="text-[#10B981] font-extrabold">{remainingArticles.length + (selectedCategory === 'All' ? 1 : 0)}</span> articles
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-12">
        
        {/* FEATURED BIG ARTICLE TOP (if All or matches category) */}
        {(selectedCategory === 'All' || featuredArticle.category === selectedCategory) && (
          <div 
            onClick={() => onNavigateTo(`/news/${featuredArticle.slug}`)}
            className="bg-white rounded-3xl border border-emerald-200 overflow-hidden shadow-xl hover:border-[#10B981] transition cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[400px] overflow-hidden">
              <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-[#10B981] text-white font-extrabold text-xs shadow-lg uppercase tracking-wide">
                  🔥 Featured Breaking News
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#10B981] uppercase">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.timeAgo}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-[#10B981] transition leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Source: <strong className="text-slate-900">{featuredArticle.source}</strong></span>
                <span className="font-extrabold text-[#10B981] flex items-center gap-1 group-hover:translate-x-1 transition">
                  Read Full Article &amp; Analysis →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STAY AHEAD NEWSLETTER / RSS BOX */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
              <Rss className="w-3.5 h-3.5" /> Instant RSS Syndication Feed
            </div>
            <h3 className="text-2xl font-extrabold">Stay ahead with real-time AI news</h3>
            <p className="text-xs text-slate-300">
              No registration or email signup required. Grab our clean RSS XML link or browse our suite of 100% free AI tools instantly.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCopyRss}
              className="px-6 py-3 bg-[#10B981] hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {rssCopied ? <CheckCircle className="w-4 h-4" /> : <Rss className="w-4 h-4" />}
              <span>{rssCopied ? 'RSS Link Copied!' : 'Copy RSS Feed URL'}</span>
            </button>
            <button
              onClick={() => onNavigateTo('/directory')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl border border-white/20 transition cursor-pointer whitespace-nowrap"
            >
              Try Free AI Tools ↗
            </button>
          </div>
        </div>

        {/* LIST OF NEWS ARTICLES */}
        <div className="space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900">Latest Updates &amp; Deep Dives</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigateTo(`/news/${article.slug}`)}
                className="bg-white rounded-3xl border border-emerald-100 hover:border-[#10B981] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[#10B981] text-[10px] font-extrabold uppercase shadow-xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>{article.source}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.timeAgo}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 group-hover:text-[#10B981] transition text-base line-clamp-2 leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                      Auto Updated
                    </span>
                    <span className="font-bold text-[#10B981] flex items-center gap-1 group-hover:translate-x-1 transition">
                      Read Article →
                    </span>
                  </div>
                </div>
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
