import React, { useState, useEffect } from 'react';
import { 
  BarChart3, ArrowLeft, Shield, Lock, Unlock, Database, 
  Flame, Heart, Clock, CheckCircle2, Download, Trash2 
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { TOTAL_TOOLS_COUNT, CATEGORY_COUNTS } from '../data/toolCounts';
import { RecentTool } from '../types';

interface StatsPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ftns_admin_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);

  useEffect(() => {
    try {
      const recents = JSON.parse(localStorage.getItem('ftns_recent_tools') || '[]');
      const favs = JSON.parse(localStorage.getItem('ftns_favorites') || '[]');
      const subs = JSON.parse(localStorage.getItem('ftns_subscribers') || '[]');
      setRecentTools(recents);
      setFavorites(favs);
      setSubscribers(subs);
    } catch {
      // ignore
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'admin3253' || passwordInput.trim() === 'admin' || passwordInput.trim() === 'royal') {
      setIsAdminUnlocked(true);
      localStorage.setItem('ftns_admin_unlocked', 'true');
    } else {
      alert('Invalid passcode. Use "admin3253"');
    }
  };

  const handleLock = () => {
    setIsAdminUnlocked(false);
    localStorage.removeItem('ftns_admin_unlocked');
  };

  const handleExportData = () => {
    const data = {
      totalTools: TOTAL_TOOLS_COUNT,
      categoryCounts: CATEGORY_COUNTS,
      favoritesCount: favorites.length,
      favorites,
      recentTools,
      subscribersCount: subscribers.length,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ftns-stats-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAnalytics = () => {
    if (confirm('Clear local recent tools and history?')) {
      localStorage.removeItem('ftns_recent_tools');
      setRecentTools([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1931] flex flex-col font-sans">
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 text-xs font-bold text-[#0A1931] hover:text-[#C5A059] bg-[#F1F5F9] hover:bg-[#E2E8F0] px-3 py-1.5 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          {isAdminUnlocked && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-xs font-bold text-[#0A1931] transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={handleLock}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Dashboard</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {!isAdminUnlocked ? (
          <div className="max-w-md mx-auto bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-sm text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#0A1931] flex items-center justify-center text-[#C5A059] mx-auto shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#0A1931]">Admin Analytics Dashboard</h2>
              <p className="text-xs text-[#64748B]">
                Protected telemetry &amp; client-side retention metrics.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin passcode (e.g. admin3253)..."
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A1931] rounded-xl text-xs sm:text-sm outline-none text-center"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#0A1931] hover:bg-[#142646] text-[#C5A059] font-bold text-xs rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Analytics</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold text-[#0A1931] flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-[#C5A059]" />
                  <span>3253 Tools Client-Side Analytics</span>
                </h1>
                <p className="text-xs text-[#64748B]">
                  Live privacy-preserving metrics stored in client storage.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
                ● Admin Session Verified
              </span>
            </div>

            {/* High Level Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs font-medium">
                  <span>Total Tools in DB</span>
                  <Database className="w-4 h-4 text-[#0A1931]" />
                </div>
                <div className="text-2xl font-black text-[#0A1931]">{TOTAL_TOOLS_COUNT}</div>
                <p className="text-[11px] text-emerald-600 font-medium">100% Operational &amp; Crawlable</p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs font-medium">
                  <span>Local Favorites Stored</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </div>
                <div className="text-2xl font-black text-[#0A1931]">{favorites.length}</div>
                <p className="text-[11px] text-[#64748B]">Bookmarked by this browser</p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs font-medium">
                  <span>Recent Tool Runs</span>
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-2xl font-black text-[#0A1931]">{recentTools.length}</div>
                <p className="text-[11px] text-[#64748B]">Stored in local history</p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[#64748B] text-xs font-medium">
                  <span>Subscribers Stored</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-[#0A1931]">{subscribers.length}</div>
                <p className="text-[11px] text-[#64748B]">Email newsletter signups</p>
              </div>
            </div>

            {/* Category Distribution Table */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#0A1931]">Category Inventory Distribution</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(CATEGORY_COUNTS).map(([cat, count]) => (
                  <div key={cat} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                    <span className="capitalize font-semibold text-[#0A1931]">{cat}</span>
                    <span className="font-mono font-bold text-[#C5A059] bg-[#0A1931] px-2 py-0.5 rounded text-[11px]">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tools Table */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-[#0A1931]">Recent Tools Telemetry</h3>
                {recentTools.length > 0 && (
                  <button
                    onClick={handleClearAnalytics}
                    className="flex items-center gap-1 text-xs text-red-600 hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear History</span>
                  </button>
                )}
              </div>

              {recentTools.length === 0 ? (
                <p className="text-xs text-[#64748B]">No recent tools logged in this session yet.</p>
              ) : (
                <div className="divide-y divide-[#E2E8F0] text-xs">
                  {recentTools.map((rt, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#0A1931]">{rt.name}</span>
                        <span className="text-[10px] text-slate-400 ml-2 font-mono">{rt.id}</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {rt.usedAt ? new Date(rt.usedAt).toLocaleTimeString() : 'Recent'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
