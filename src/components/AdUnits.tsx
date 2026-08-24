import React, { useEffect, useRef } from 'react';
import { Info, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const ADSENSE_CLIENT_ID = 'ca-pub-9048615701580913';

/**
 * Helper hook to trigger adsbygoogle safely without unhandled runtime exceptions
 */
export function useAdSensePush() {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef<boolean>(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (err) {
      // Gracefully handle adblock or already-initialized slot
      console.debug('AdSense push notice:', err);
    }
  }, []);

  return adRef;
}

/**
 * 1. AdUnit Auto (for auto ads and generic responsive placements)
 */
export const AdUnitAuto: React.FC<{ className?: string; slotId?: string }> = ({ className = '', slotId = 'auto' }) => {
  const adRef = useAdSensePush();

  return (
    <div className={`w-full overflow-hidden my-3 ${className}`}>
      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pb-1 px-1">
        <span>Advertisement</span>
        <span className="flex items-center gap-0.5 hover:text-slate-600 cursor-pointer">
          <Info className="w-2.5 h-2.5" /> AdChoices
        </span>
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

/**
 * 2. Homepage Top Banner (after hero): 728x90 responsive
 */
export const AdUnitTopBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const adRef = useAdSensePush();

  return (
    <div 
      id="adsense-top-leaderboard"
      className={`w-full max-w-[728px] mx-auto min-h-[90px] bg-white border border-slate-200/90 rounded-2xl p-2.5 flex flex-col justify-between shadow-2xs overflow-hidden transition-all ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono pb-1 border-b border-slate-100">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Advertisement • 728×90 Leaderboard
        </span>
        <span className="flex items-center gap-0.5 hover:text-slate-600 cursor-pointer">
          <Info className="w-2.5 h-2.5" /> AdChoices
        </span>
      </div>

      <div className="my-auto py-1">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '60px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot="auto"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
        {/* Native fallback layout if script is still connecting */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              PRO
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                Cloud Developer Workspaces & AI Edge Compute
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">
                Deploy full-stack sandboxes with zero setup and instant global CDN.
              </p>
            </div>
          </div>
          <button className="hidden sm:inline-flex px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold items-center gap-1 shrink-0 transition-colors">
            Learn More <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Tools Page Sidebar (RightSidebar.tsx): 300x250 sticky
 */
export const AdUnitSidebarSticky: React.FC<{ className?: string }> = ({ className = '' }) => {
  const adRef = useAdSensePush();

  return (
    <div 
      id="adsense-sidebar-300x250"
      className={`w-full max-w-[300px] mx-auto min-h-[250px] bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono border-b border-slate-100 pb-1.5">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Sponsored • 300×250
        </span>
        <span className="flex items-center gap-0.5 hover:text-slate-600 cursor-pointer">
          <Info className="w-2.5 h-2.5" />
        </span>
      </div>

      <div className="py-2 my-auto">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '140px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot="auto"
          data-ad-format="rectangle"
          data-full-width-responsive="true"
        />
        <div className="text-center space-y-1.5 pt-1">
          <div className="text-xs font-bold text-slate-900 leading-snug">
            Fast Full-Stack Cloud Container Engine
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Deploy production databases, APIs, and microservices in one click.
          </p>
          <button className="mt-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1">
            Get Credits <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      <div className="text-[9px] text-slate-400 text-center border-t border-slate-100 pt-1">
        Official Google Publisher Ad Unit
      </div>
    </div>
  );
};

/**
 * 4. Between Tools Grid: In-feed ad every 12 tools
 */
export const AdUnitInFeed: React.FC<{ className?: string; index?: number }> = ({ className = '', index = 1 }) => {
  const adRef = useAdSensePush();

  return (
    <div 
      id={`adsense-infeed-${index}`}
      className={`w-full col-span-full my-2 bg-gradient-to-r from-amber-500/5 via-slate-50 to-blue-500/5 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
          AD
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500">
              Sponsored Result
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
            Enterprise Security & API Performance Suite
          </h4>
          <p className="text-[11px] text-slate-500 line-clamp-1">
            Monitor API latencies, simulate load tests, and enforce zero-trust identity policies.
          </p>
        </div>
      </div>

      <div className="w-full sm:w-auto flex items-center justify-end shrink-0">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'inline-block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot="auto"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
        <button className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs">
          Explore Solution <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
