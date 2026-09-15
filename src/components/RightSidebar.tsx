import React, { useState } from 'react';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';
import { 
  Bot, Clock, Sparkles, Mail, CheckCircle2, 
  ExternalLink, ShieldCheck, ArrowRight, X, Newspaper
} from 'lucide-react';
import { NewsItem } from '../types';
import { NEWS_DATABASE } from '../data/newsData';
import { AdSenseBanner } from './AdSenseBanner';
import { AdUnitSidebarSticky } from './AdUnits';
import confetti from 'canvas-confetti';
import { useTranslation } from '../i18n/I18nContext';

interface RightSidebarProps {
  className?: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ className = '' }) => {
  const { t } = useTranslation();
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
      className={`w-full bg-[#F4F7FC] border-l border-[#E2E8F0] p-4 flex flex-col gap-6 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0A1931] text-white flex items-center justify-center shadow-xs">
            <Bot className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div>
            <div className="font-semibold text-sm text-[#0A1931] flex items-center gap-1.5">
              <span>{t('liveNews', 'AI News')}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F7F3EB] text-[#8C6B28] border border-[#E8DCBE]">
                {t('liveBadge', 'LIVE')}
              </span>
            </div>
            <p className="text-[10px] text-[#64748B]">{t('newsSubtitle', '12 fresh industry updates')}</p>
          </div>
        </div>
      </div>

      {/* 12 News Cards List */}
      <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
        {NEWS_DATABASE.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="p-3 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0A1931] rounded-2xl cursor-pointer transition-all shadow-2xs group flex flex-col gap-2"
          >
            <div className="flex items-start gap-3">
              {/* Thumbnail box */}
              <div className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:bg-[#F1F5F9] group-hover:border-[#CBD5E1] transition-colors">
                <Newspaper className="w-4 h-4 text-[#64748B] group-hover:text-[#0A1931] transition-colors" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    item.category === 'AI' ? 'bg-[#F7F3EB] text-[#8C6B28] border border-[#E8DCBE]' : item.category === 'Jobs' ? 'bg-[#F8FAFC] text-[#0A1931] border border-[#E2E8F0]' : 'bg-slate-50 text-slate-800 border border-slate-200'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" /> {item.timeAgo}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-[#0F172A] line-clamp-2 leading-snug group-hover:text-[#0A1931] transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-1.5 border-t border-[#F1F5F9]">
              <span className="font-semibold text-[#0A1931]">{item.source}</span>
              <span>{item.readTime} read</span>
            </div>
          </div>
        ))}
      </div>

      {/* AdSense 300x250 Sticky Unit */}
      <div className="sticky top-20">
        <AdUnitSidebarSticky />
      </div>

      {/* Newsletter Box: Get Weekly AI Tools */}
      <div className="bg-[#0A1931] text-white rounded-3xl p-5 shadow-sm space-y-3.5 border border-[#142D54]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>Weekly AI Tool Drops</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Get the top 5 trending browser utilities & cheat sheets every Monday. Zero spam, 1-click unsubscribe.
        </p>

        {subscribed ? (
          <div className="p-3 bg-white/10 border border-white/20 rounded-xl text-xs text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C5A059]" />
            <span>You're in! Check your inbox for this week's {TOTAL_TOOLS_COUNT} tools cheat sheet.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 outline-none focus:border-[#C5A059]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#C5A059] hover:bg-[#D4AF67] text-[#0A1931] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              Get Free Weekly Drops <ArrowRight className="w-3 h-3" />
            </button>
          </form>
        )}
      </div>

      {/* Platform Security Badge */}
      <div className="p-3.5 bg-white rounded-2xl border border-[#E2E8F0] text-[11px] text-[#64748B] space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Client-Side Privacy</span>
        </div>
        <p className="text-[10px] text-[#64748B] leading-normal">
          All computations, file manipulations, and AI heuristics execute inside your browser sandbox.
        </p>
      </div>

      {/* Article Reader Modal */}
      {selectedNews && (
        <div 
          onClick={() => setSelectedNews(null)}
          className="fixed inset-0 z-50 bg-[#071A3D]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <span className="text-xs font-bold uppercase text-[#126BFF] px-2 py-0.5 rounded bg-[#EBF3FF] border border-[#C8DDFF]">
                {selectedNews.category} • {selectedNews.source}
              </span>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#0B1F3A] hover:bg-[#F4F7FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#0B1F3A] leading-tight">
                {selectedNews.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-[#64748B]">
                <span>{selectedNews.timeAgo}</span>
                <span>•</span>
                <span>{selectedNews.readTime} read</span>
              </div>
            </div>

            <div className="p-4 bg-[#F4F7FC] rounded-xl border border-[#E2E8F0] text-xs text-[#0B1F3A] leading-relaxed">
              {selectedNews.summary}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
              <a
                href={selectedNews.url}
                target="_blank"
                rel="noreferrer"
                className="btn-brand-primary px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
              >
                <span>Read Full Article on {selectedNews.source}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedNews(null)}
                className="px-3 py-2 text-xs font-bold text-[#64748B] hover:text-[#0B1F3A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </aside>
  );
};
