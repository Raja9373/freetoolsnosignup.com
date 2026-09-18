import React from 'react';

interface FooterProps {
  onNavigate?: (route: string) => void;
  onNavigateTo?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNavigateTo }) => {
  const navigateFn = onNavigate || onNavigateTo;
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (navigateFn) {
      e.preventDefault();
      navigateFn(path);
    }
  };

  return (
    <footer className="bg-[#0A1931] text-white py-12 px-4 mt-16 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Trust Badge Banner */}
        <div className="bg-[#12223F] border border-[#D4AF37]/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            <div>
              <h4 className="font-bold text-white text-base">Your files are 100% secure</h4>
              <p className="text-xs text-gray-300">Processed entirely in your browser and auto-deleted. No signup needed.</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs">
            <span>⚡ FAST</span>
            <span>|</span>
            <span>🛡️ FREE</span>
            <span>|</span>
            <span>👆 EASY</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo.png" alt="FreeToolsNoSignup Logo" className="h-10 w-auto" />
              <span className="font-extrabold text-white text-lg tracking-tight">
                FreeTools <span className="text-[#D4AF37]">NoSignup</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mb-4">
              FreeToolsNoSignup.com is your ultimate destination for 4,753+ free online tools, calculators, and AI updates. 100% free, no signup required, client-side secure.
            </p>
            <p className="text-xs text-[#D4AF37] font-semibold">
              Tagline: FAST | FREE | EASY
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1 text-[#D4AF37]">Hubs &amp; Tools</h4>
            <a href="/tools" onClick={(e) => handleLink(e, '/tools')} className="text-xs text-gray-300 hover:text-white transition">Tools Hub</a>
            <a href="/calculators" onClick={(e) => handleLink(e, '/calculators')} className="text-xs text-gray-300 hover:text-white transition">Calculators Hub</a>
            <a href="/directory" onClick={(e) => handleLink(e, '/directory')} className="text-xs text-gray-300 hover:text-white transition">Product Directory</a>
            <a href="/ai-updates" onClick={(e) => handleLink(e, '/ai-updates')} className="text-xs text-gray-300 hover:text-white transition">AI News &amp; Updates</a>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1 text-[#D4AF37]">Legal &amp; Policies</h4>
            <a href="/about" onClick={(e) => handleLink(e, '/about')} className="text-xs text-gray-300 hover:text-white transition">About Us</a>
            <a href="/contact" onClick={(e) => handleLink(e, '/contact')} className="text-xs text-gray-300 hover:text-white transition">Contact Us</a>
            <a href="/privacy-policy" onClick={(e) => handleLink(e, '/privacy-policy')} className="text-xs text-gray-300 hover:text-white transition">Privacy Policy</a>
            <a href="/terms" onClick={(e) => handleLink(e, '/terms')} className="text-xs text-gray-300 hover:text-white transition">Terms of Service</a>
            <a href="/disclaimer" onClick={(e) => handleLink(e, '/disclaimer')} className="text-xs text-gray-300 hover:text-white transition">Legal Disclaimer</a>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1 text-[#D4AF37]">Resources</h4>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white transition">Sitemap (XML)</a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white transition">Robots.txt</a>
            <a href="/ads.txt" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white transition">Ads.txt (Authorized)</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 border-t border-gray-800 pt-6 gap-4">
          <p>© 2026 FreeToolsNoSignup.com • All Rights Reserved. 100% Free, No Signup Required.</p>
          <p className="font-mono text-[11px] text-[#D4AF37]">AdSense Status: Authorized &amp; Ready (ads.txt verified)</p>
        </div>

      </div>
    </footer>
  );
};

