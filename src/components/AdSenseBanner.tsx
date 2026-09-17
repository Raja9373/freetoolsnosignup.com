import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

interface AdSenseBannerProps {
  format?: '728x90' | '300x600' | '300x250';
  slotType?: string;
  className?: string;
  slotName?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ format = '728x90', className = '', slotName = 'Default' }) => {
  if (format === '728x90') {
    return (
      <div 
        id={`adsense-leaderboard-${slotName.toLowerCase()}`}
        className={`w-full max-w-[728px] mx-auto min-h-[90px] bg-white border border-slate-200/80 rounded-xl p-2.5 flex flex-col justify-between shadow-xs overflow-hidden ${className}`}
      >
        <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            Advertisement • Google AdSense 728×90
          </span>
          <span className="flex items-center gap-0.5 hover:text-slate-600 cursor-pointer">
            <Info className="w-2.5 h-2.5" /> AdChoices
          </span>
        </div>

        <div className="my-auto py-1 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
              AI
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                Cloud GPU Workspaces & Developer Clusters — $200 Free Credits
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">
                Scale Next.js, Python, and PyTorch workloads with instant serverless inference.
              </p>
            </div>
          </div>

          <button className="hidden sm:flex px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shrink-0 items-center gap-1 shadow-xs transition-colors">
            Try Free <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (format === '300x600') {
    return (
      <div 
        id="adsense-skyscraper-left"
        className={`w-full max-w-[300px] mx-auto min-h-[500px] bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs ${className}`}
      >
        <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
          <span>Ad • 300×600 Skyscraper</span>
          <Info className="w-3 h-3 text-slate-400" />
        </div>

        <div className="py-4 space-y-4 my-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-amber-500/20">
            PRO
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600">Special Offer</div>
            <h4 className="text-base font-bold text-slate-900 mt-1">
              Automate Technical Workflows with Zero Code
            </h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Connect your developer stack, manage webhooks, and trigger background tasks seamlessly.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">✓ 99.99% Uptime SLA</div>
            <div className="flex items-center gap-1.5">✓ 100+ Pre-built Integrations</div>
            <div className="flex items-center gap-1.5">✓ Unlimited Free Tier</div>
          </div>

          <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow transition-all">
            Claim Developer Credit →
          </button>
        </div>

        <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
          Sponsored via Google Display Network
        </div>
      </div>
    );
  }

  // 300x250 Square
  return (
    <div 
      id="adsense-square-right"
      className={`w-full max-w-[300px] mx-auto min-h-[220px] bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono border-b border-slate-100 pb-1.5">
        <span>Ad • 300×250</span>
        <Info className="w-2.5 h-2.5 text-slate-400" />
      </div>

      <div className="py-2 text-center space-y-2 my-auto">
        <div className="text-xs font-bold text-slate-900">
          Deploy Full-Stack TypeScript Apps in 3 Seconds
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          Global edge network with automatic SSL and zero configuration.
        </p>
        <button className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1">
          Deploy Now <ExternalLink className="w-2.5 h-2.5" />
        </button>
      </div>

      <div className="text-[9px] text-slate-400 text-center">
        Report this ad • Privacy Policy
      </div>
    </div>
  );
};
