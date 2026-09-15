import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const EmailCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) return;

    try {
      const existing = JSON.parse(localStorage.getItem('ftns_subscribers') || '[]');
      if (!existing.includes(cleanEmail)) {
        existing.push(cleanEmail);
        localStorage.setItem('ftns_subscribers', JSON.stringify(existing));
      }
    } catch {
      // ignore
    }

    setIsSubscribed(true);
    setToastMessage('Subscribed! Check your email tomorrow');
    setEmail('');

    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  return (
    <div className="w-full bg-[#0A1931] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden my-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#059669] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-bottom-5 border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C5A059]/20 text-[#E5C77A] border border-[#C5A059]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Free Daily Productivity
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Get 1 Free Tool Daily — Join 10,000+ makers
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Never pay for bloated subscriptions again. We spotlight one game-changing, zero-signup browser utility every morning. No spam, unsubscribe anytime.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0">
          {isSubscribed ? (
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You are on the list! Check your inbox tomorrow.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-96">
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-[#C5A059]/40 focus:border-[#C5A059] rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 outline-none transition-all shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4B06A] hover:from-[#D4B06A] hover:to-[#C5A059] text-[#0A1931] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
