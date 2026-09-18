import React, { useState } from 'react';
import { Search, Wrench, Calculator, Sparkles, ArrowRight, Shield, Zap, Menu, X, ExternalLink, FileText, Image as ImageIcon, Video, Cpu, Layers, BookOpen } from 'lucide-react';
import { Logo } from './components/Logo';
import { ToolsHubPage } from './pages/ToolsHubPage';
import { CalculatorsHubPage } from './pages/CalculatorsHubPage';
import { EMICalculatorPage } from './pages/EMICalculatorPage';
import { PDFToWordPage } from './pages/PDFToWordPage';
import { AIUpdatesHubPage } from './pages/AIUpdatesHubPage';
import { ProductDirectoryPage } from './pages/ProductDirectoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AINewsPage } from './pages/AINewsPage';
import { AINewsDetailPage } from './pages/AINewsDetailPage';
import { NotionTemplatesPage } from './pages/NotionTemplatesPage';
import { AboutUs } from './pages/AboutUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ContactUs } from './pages/ContactUs';
import { TermsOfService } from './pages/TermsOfService';
import { DisclaimerPage } from './pages/DisclaimerPage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (pathOrView: string) => {
    if (pathOrView.startsWith('/directory/')) {
      const slug = pathOrView.replace('/directory/', '');
      setSelectedSlug(slug);
      setCurrentView('product-detail');
    } else if (pathOrView.startsWith('/news/')) {
      const slug = pathOrView.replace('/news/', '');
      setSelectedSlug(slug);
      setCurrentView('news-detail');
    } else if (pathOrView === '/calculators/emi-calculator' || pathOrView === 'emi') {
      setCurrentView('emi');
    } else if (pathOrView === '/tools/pdf-to-word' || pathOrView === 'pdf-to-word') {
      setCurrentView('pdf-to-word');
    } else if (pathOrView === 'calculators') {
      setCurrentView('calculators');
    } else if (pathOrView === 'tools') {
      setCurrentView('tools');
    } else if (pathOrView === 'directory' || pathOrView === 'product-finder') {
      setCurrentView('directory');
    } else if (pathOrView === 'news') {
      setCurrentView('news');
    } else if (pathOrView === 'ai-updates' || pathOrView === 'ai') {
      setCurrentView('ai-updates');
    } else if (pathOrView === 'notion' || pathOrView === 'notion-templates') {
      setCurrentView('notion');
    } else if (pathOrView === 'about') {
      setCurrentView('about');
    } else if (pathOrView === 'privacy' || pathOrView === 'privacy-policy') {
      setCurrentView('privacy');
    } else if (pathOrView === 'contact') {
      setCurrentView('contact');
    } else if (pathOrView === 'terms' || pathOrView === 'terms-of-service') {
      setCurrentView('terms');
    } else if (pathOrView === 'disclaimer') {
      setCurrentView('disclaimer');
    } else {
      setCurrentView(pathOrView);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Conditional rendering based on currentView state (No Next/Link, pure useState routing)
  if (currentView === 'emi') {
    return <EMICalculatorPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'calculators') {
    return <CalculatorsHubPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'tools') {
    return <ToolsHubPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'pdf-to-word') {
    return <PDFToWordPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'directory') {
    return <ProductDirectoryPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'product-detail') {
    return <ProductDetailPage slug={selectedSlug || '1'} onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'news') {
    return <AINewsPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'news-detail') {
    return <AINewsDetailPage slug={selectedSlug || '1'} onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'ai-updates') {
    return <AIUpdatesHubPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'notion') {
    return <NotionTemplatesPage onNavigateHome={() => setCurrentView('home')} onNavigateTo={navigateTo} />;
  }

  if (currentView === 'about') {
    return <AboutUs onNavigateHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'privacy') {
    return <PrivacyPolicy onNavigateHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'contact') {
    return <ContactUs onNavigateHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'terms') {
    return <TermsOfService onNavigateHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'disclaimer') {
    return <DisclaimerPage onNavigateHome={() => setCurrentView('home')} />;
  }

  const handleUniversalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('calc') || q.includes('emi') || q.includes('sip') || q.includes('loan')) {
      setCurrentView('calculators');
    } else if (q.includes('ai') || q.includes('openai') || q.includes('model')) {
      setCurrentView('ai-updates');
    } else if (q.includes('dir') || q.includes('product')) {
      setCurrentView('directory');
    } else if (q.includes('notion') || q.includes('template')) {
      setCurrentView('notion');
    } else {
      setCurrentView('tools');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col font-sans selection:bg-[#FF7A00] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo (Base64 data URL) */}
          <button 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2 group cursor-pointer shrink-0 bg-transparent border-none p-0"
          >
            <Logo className="h-10 sm:h-12 w-auto" />
          </button>

          {/* Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleUniversalSearch(e); }}
              placeholder="Search 250+ tools..."
              className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0B4DB8] rounded-full py-2.5 px-4 pl-10 text-xs sm:text-sm text-[#0B1F3A] placeholder-slate-400 outline-none transition-all shadow-2xs"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          {/* Right badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center bg-[#0A2342] text-white px-4 py-2 rounded-full text-xs font-extrabold shadow-sm">
              <span className="text-[#FFC000]">⚡ FAST</span>
              <span className="mx-2 text-[#FF8C00]">|</span>
              <span className="text-white">🛡️ FREE</span>
              <span className="mx-2 text-[#FF8C00]">|</span>
              <span className="text-[#FFC000]">👆 EASY</span>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-700 p-2 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">
            <div className="relative mb-2">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 250+ tools..."
                className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 px-4 pl-10 text-xs text-[#0B1F3A] outline-none"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <button onClick={() => { setMobileMenuOpen(false); setCurrentView('calculators'); }} className="block w-full text-left font-bold text-sm text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer">
              🧮 Calculators
            </button>
            <button onClick={() => { setMobileMenuOpen(false); setCurrentView('tools'); }} className="block w-full text-left font-bold text-sm text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer">
              🛠️ Dev &amp; File Tools
            </button>
            <button onClick={() => { setMobileMenuOpen(false); setCurrentView('directory'); }} className="block w-full text-left font-bold text-sm text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer">
              🚀 Product Finder
            </button>
            <button onClick={() => { setMobileMenuOpen(false); setCurrentView('news'); }} className="block w-full text-left font-bold text-sm text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer">
              🤖 AI News
            </button>
            <button onClick={() => { setMobileMenuOpen(false); setCurrentView('notion'); }} className="block w-full text-left font-bold text-sm text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer">
              📝 Notion Templates
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full flex flex-col items-center text-center">
        
        {/* Centered Logo (Base64 data URL) */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
          <Logo className="h-28 sm:h-36 md:h-[140px] w-auto mx-auto drop-shadow-md" />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A2342] tracking-tight max-w-4xl mb-4">
          Free Tools - No Signup Required
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium">
          250+ PDF, Image, Video, AI &amp; Calculator Tools - All work in your browser. Fast, Free &amp; Easy.
        </p>

        {/* Big search bar */}
        <form onSubmit={handleUniversalSearch} className="w-full max-w-2xl relative mb-16 shadow-lg rounded-full">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 250+ tools... e.g. PDF to Word, EMI Calculator, QR Code"
            className="w-full bg-white border-2 border-slate-200 focus:border-[#0B4DB8] rounded-full py-4 px-6 pl-14 text-sm sm:text-base text-[#0B1F3A] placeholder-slate-400 outline-none transition-all"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0B4DB8] hover:bg-[#083b91] text-white font-bold px-7 py-2.5 rounded-full text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
          >
            Search Tools
          </button>
        </form>

        {/* 5 COLORFUL BOXES */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-left">
          
          {/* BOX 1 - CALCULATORS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#0B4DB8] flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0B4DB8]/10 to-[#00D4FF]/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl p-3 bg-blue-50 rounded-2xl shadow-2xs">🧮</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0A2342] group-hover:text-[#0B4DB8] transition-colors">Calculators</h3>
                  <p className="text-xs text-slate-500 font-medium">Smart calculators for everyday life</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                OmniCalculator clone providing instant solutions with step-by-step formulas and professional charts.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-slate-500 font-medium border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2"><span>•</span> EMI, Loan &amp; Mortgage Calculators</li>
                <li className="flex items-center gap-2"><span>•</span> BMI, Health &amp; Calorie Trackers</li>
                <li className="flex items-center gap-2"><span>•</span> Age, Percentage, GPA &amp; Unit Converters</li>
                <li className="flex items-center gap-2"><span>•</span> Live results with formulas and explanations</li>
              </ul>
            </div>
            <button 
              onClick={() => setCurrentView('calculators')}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0B4DB8] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              <span>Explore Calculators</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* BOX 2 - TOOLS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#FF8C00] flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF8C00]/10 to-[#FFB800]/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl p-3 bg-orange-50 rounded-2xl shadow-2xs">🛠️</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0A2342] group-hover:text-[#FF8C00] transition-colors">Dev &amp; File Tools</h3>
                  <p className="text-xs text-slate-500 font-medium">Tools that run 100% in your browser</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Onlinetoolstore.io clone. Lightning-fast client-side processing. Your files never leave your device.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-slate-500 font-medium border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2"><span>•</span> PDF: Merge, Split, Compress, Convert</li>
                <li className="flex items-center gap-2"><span>•</span> Image: Resize, Compressor, BG Remover</li>
                <li className="flex items-center gap-2"><span>•</span> Dev: JSON Formatter, Base64, QR Gen</li>
                <li className="flex items-center gap-2"><span>•</span> Private &amp; Fast, No Upload to Server</li>
              </ul>
            </div>
            <button 
              onClick={() => setCurrentView('tools')}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#FFB800] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* BOX 3 - PRODUCT FINDER */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#7C3AED] flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl p-3 bg-purple-50 rounded-2xl shadow-2xs">🚀</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0A2342] group-hover:text-[#7C3AED] transition-colors">Product Finder</h3>
                  <p className="text-xs text-slate-500 font-medium">Discover &amp; launch best SaaS and apps</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                10015.io product-finder clone. Submit your tool, get featured listings, and connect with global creators.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-slate-500 font-medium border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2"><span>•</span> Curated directory of products</li>
                <li className="flex items-center gap-2"><span>•</span> Submit your tool &amp; get dofollow backlink</li>
                <li className="flex items-center gap-2"><span>•</span> Featured listings &amp; embeds</li>
                <li className="flex items-center gap-2"><span>•</span> Maker community upvotes &amp; reviews</li>
              </ul>
            </div>
            <button 
              onClick={() => setCurrentView('directory')}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* BOX 4 - AI NEWS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#10B981] flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#10B981]/10 to-[#06B6D4]/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl p-3 bg-emerald-50 rounded-2xl shadow-2xs">🤖</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0A2342] group-hover:text-[#10B981] transition-colors">AI News - Auto Updated</h3>
                  <p className="text-xs text-slate-500 font-medium">Latest AI news, model releases &amp; tool drops</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Artificialintelligence-news.com clone. Real-time updates every hour on foundation models and breakthroughs.
              </p>
              <ul className="space-y-2 mb-8 text-xs text-slate-500 font-medium border-t border-slate-100 pt-4">
                <li className="flex items-center gap-2"><span>•</span> GPT-5, Gemini 2.0, Claude 4 breaking news</li>
                <li className="flex items-center gap-2"><span>•</span> New AI tools launch directory</li>
                <li className="flex items-center gap-2"><span>•</span> Tutorials &amp; prompt engineering guides</li>
                <li className="flex items-center gap-2"><span>•</span> Auto-updates every hour via RSS/API</li>
              </ul>
            </div>
            <button 
              onClick={() => setCurrentView('news')}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#06B6D4] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              <span>Read AI News</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* BOX 5 - NOTION TEMPLATES */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-black md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-black/5 to-[#FFB800]/10 rounded-bl-full pointer-events-none"></div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl p-3 bg-gray-100 rounded-2xl shadow-2xs">📝</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0A2342] group-hover:text-black transition-colors">Notion Templates</h3>
                  <p className="text-xs text-slate-500 font-medium">Free aesthetic Notion templates</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed max-w-xl">
                Notioneverything.com clone. Boost your productivity instantly with handcrafted workspaces and dashboards.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="px-2.5 py-1 bg-slate-100 rounded-full font-medium">• Second Brain</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-full font-medium">• Habit Tracker</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-full font-medium">• Budget Tracker</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-full font-medium">• Project Management</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-full font-medium">• Student Dashboard</span>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <button 
                onClick={() => setCurrentView('notion')}
                className="w-full md:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-black to-[#4B5563] hover:opacity-90 text-[#FFB800] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <span>Get Templates</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A2342] text-white pt-12 pb-8 px-4 mt-auto border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="bg-[#0A1931] border border-emerald-500/30 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                Your files are 100% secure - processed in your browser and auto-deleted. No signup needed.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
              <span>✓ ads.txt Authorised</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm pt-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Logo className="h-8 w-auto" />
                <span className="font-extrabold text-white text-base">FreeToolsNoSignup</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                FreeToolsNoSignup - FAST FREE EASY. Powerful browser-native utilities with zero signups.
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-[#FFC000] mb-1">Quick Hubs</h4>
              <button onClick={() => setCurrentView('calculators')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">Calculators Hub</button>
              <button onClick={() => setCurrentView('tools')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">Dev &amp; File Tools</button>
              <button onClick={() => setCurrentView('directory')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">Product Finder</button>
              <button onClick={() => setCurrentView('news')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">AI News Feed</button>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-[#FFC000] mb-1">Legal &amp; Policy</h4>
              <button onClick={() => setCurrentView('about')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">About</button>
              <button onClick={() => setCurrentView('contact')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">Contact</button>
              <button onClick={() => setCurrentView('privacy')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">Privacy Policy</button>
              <button onClick={() => setCurrentView('terms')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">Terms</button>
              <button onClick={() => setCurrentView('disclaimer')} className="text-left text-xs text-slate-300 hover:text-white transition cursor-pointer">Disclaimer</button>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-[#FFC000] mb-1">Resources</h4>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-300 hover:text-white transition">Sitemap</a>
              <a href="/ads.txt" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-300 hover:text-white transition">Ads.txt Verification</a>
              <p className="text-[11px] text-slate-400 mt-2">© 2026 freetoolsnosignup.com. All rights reserved.</p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
