import React, { useState } from 'react';
import { 
  Bot, Clock, Sparkles, Mail, CheckCircle2, 
  ExternalLink, ShieldCheck, ArrowRight, X, Newspaper
} from 'lucide-react';
import { NewsItem } from '../types';
import { NEWS_DATABASE } from '../data/newsData';
import { AdSenseBanner } from './AdSenseBanner';
import confetti from 'canvas-confetti';

interface RightSidebarProps {
  className?: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ className = '' }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setSubscribed(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <aside 
      id="right-sidebar-column"
      className={`w-full bg-[#f8fafc] border-l border-slate-200/80 p-4 flex flex-col gap-6 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <span>AI News</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 animate-pulse">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400">12 fresh industry updates</p>
          </div>
        </div>
      </div>

      {/* 12 News Cards List */}
      <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
        {NEWS_DATABASE.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl cursor-pointer transition-all shadow-2xs group flex flex-col gap-2"
          >
            <div className="flex items-start gap-3">
              {/* Thumbnail gray box */}
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors">
                <Newspaper className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    item.category === 'AI' ? 'bg-purple-100 text-purple-800' : item.category === 'Jobs' ? 'bg-amber-100 text-amber-800' : 'bg-cyan-100 text-cyan-800'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" /> {item.timeAgo}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-purple-700 transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              <span className="font-semibold text-slate-600">{item.source}</span>
              <span>{item.readTime} read</span>
            </div>
          </div>
        ))}
      </div>

      {/* AdSense 300x250 */}
      <div>
        <AdSenseBanner format="300x250" />
      </div>

      {/* Newsletter Box: Get Weekly AI Tools */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Weekly AI Tool Drops</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Get the top 5 trending browser utilities & cheat sheets every Monday. No spam, 1-click unsubscribe.
        </p>

        {subscribed ? (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>You're in! Check your inbox for this week's 495 tools cheat sheet.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              Get Free Weekly Drops <ArrowRight className="w-3 h-3" />
            </button>
          </form>
        )}
      </div>

      {/* Platform Security Badge */}
      <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          All computations, file manipulations, and AI heuristics execute inside your browser sandbox.
        </p>
      </div>

      {/* Article Reader Modal */}
      {selectedNews && (
        <div 
          onClick={() => setSelectedNews(null)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase text-purple-700 px-2 py-0.5 rounded bg-purple-50">
                {selectedNews.category} • {selectedNews.source}
              </span>
              <button 
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {selectedNews.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {selectedNews.content}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Published {selectedNews.timeAgo}</span>
              <button 
                onClick={() => setSelectedNews(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </aside>
  );
};
