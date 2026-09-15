import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('ftns_pwa_dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('ftns_pwa_dismissed', 'true');
  };

  if (isInstalled || dismissed) {
    return null;
  }

  // Show banner if installable or on iOS
  return (
    <>
      <div className="bg-[#0A1931] border-b border-[#C5A059]/30 text-white px-3 sm:px-4 py-2.5 shadow-md relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C5A059] to-[#99732B] flex items-center justify-center text-[#0A1931] font-bold shadow-inner shrink-0">
              <Sparkles className="w-4 h-4 text-[#0A1931]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-tight text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <span>Install 3253 Tools App — Works Offline</span>
                <span className="hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#C5A059]/20 text-[#E5C77A] border border-[#C5A059]/40">
                  Instant PWA
                </span>
              </p>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                Launch all 2,753 private browser tools directly from your home screen or desktop dock with 0ms latency.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isInstallable && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#B38D46] hover:from-[#D4B06A] hover:to-[#C5A059] text-[#0A1931] font-bold text-xs shadow-sm transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>
            )}

            {isIOS && (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#E5C77A] border border-[#C5A059]/40 font-semibold text-xs transition-all"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Install on iOS</span>
              </button>
            )}

            <button
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Install Instructions Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0A1931] border border-[#C5A059]/40 p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Install on iPhone / iPad</h3>
                <p className="text-xs text-[#C5A059]">Fast, offline-ready standalone mode</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 mb-5">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>1. In Safari, tap the <strong>Share</strong> icon (box with upward arrow) at the bottom toolbar.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>2. Scroll down in the share sheet and tap <strong>Add to Home Screen</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>3. Tap <strong>Add</strong> in the top right corner. The app will appear on your home screen!</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D4B06A] text-[#0A1931] font-bold text-xs transition"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
