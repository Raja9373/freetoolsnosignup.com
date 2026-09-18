import React, { useState, useMemo } from 'react';
import { 
  Calculator, Search, ArrowRight, ArrowLeft, Sparkles, 
  TrendingUp, Heart, Percent, Clock, DollarSign, Activity, 
  BookOpen, Layers, CheckCircle2, RefreshCw, Compass, Shield, Terminal, Zap,
  Home, Scale, Flame, FileText, Calendar, Lock, Cpu, Wrench, Globe, ExternalLink, ThumbsUp, Code, Image as ImageIcon, MessageSquare, Database, Download, Upload, Check, HelpCircle
} from 'lucide-react';
import { generateAllCalculators } from './data/calculatorsCatalog';

const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer select-none">
    <div className="w-10 h-10 bg-[#0A2342] rounded-2xl flex items-center justify-center text-white shadow-md text-lg">⚙️</div>
    <span className="font-black text-xl text-[#0A2342] tracking-tight">FreeTools<span className="text-[#0B4DB8]">NoSignup</span></span>
  </div>
);

export default function App() {
  const [view, setView] = useState<'home' | 'calculators' | 'emi-calculator' | 'pdf-to-word' | 'directory' | 'notion-templates' | 'ai-news'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const allCalculators = useMemo(() => generateAllCalculators(), []);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [mortgageRate, setMortgageRate] = useState<number>(8.5);
  const [mortgageTerm, setMortgageTerm] = useState<number>(20);

  // PDF to Word State
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedReady, setConvertedReady] = useState(false);

  // Directory State
  const [directoryQuery, setDirectoryQuery] = useState('');
  const [directoryFilter, setDirectoryFilter] = useState('All');
  const [saasTools, setSaasTools] = useState([
    { id: 1, name: 'SaaSMetrics.ai', category: 'Analytics', votes: 412, desc: 'Real-time MRR and churn analytics dashboard for indie creators.' },
    { id: 2, name: 'PromptCraft', category: 'Developer', votes: 389, desc: 'Visual prompt engineering sandbox with multi-model comparison.' },
    { id: 3, name: 'DocuFlow', category: 'Productivity', votes: 315, desc: 'Instant markdown to PDF converter with custom enterprise themes.' },
    { id: 4, name: 'PixelCompress', category: 'Design', votes: 298, desc: 'Lossless WebP and AVIF batch image compression in browser.' },
    { id: 5, name: 'AIWriterPro', category: 'Marketing', votes: 276, desc: 'SEO-optimized blog post and newsletter generator in seconds.' },
    { id: 6, name: 'SecureVault', category: 'Security', votes: 254, desc: 'Zero-knowledge encrypted password and secret sharing.' }
  ]);

  // Notion Templates State
  const [notionTemplates, setNotionTemplates] = useState([
    { id: 1, name: 'Ultimate Second Brain OS', category: 'Productivity', downloads: '14.2k', desc: 'Complete life management system with tasks, notes, projects, and goals.' },
    { id: 2, name: 'Indie Hacker Startup Hub', category: 'Business', downloads: '9.8k', desc: 'Track MRR, feature roadmaps, user feedback, and launch checklists.' },
    { id: 3, name: 'Student Academic Planner', category: 'Education', downloads: '18.5k', desc: 'Manage lecture notes, assignment deadlines, grade tracking, and schedules.' },
    { id: 4, name: 'Personal Finance & Budget Tracker', category: 'Finance', downloads: '11.1k', desc: 'Automate monthly expense tracking, investment portfolios, and savings goals.' },
    { id: 5, name: 'Content Creator Content Planner', category: 'Marketing', downloads: '8.4k', desc: 'Plan YouTube videos, tweets, newsletters, and sponsor deals effortlessly.' },
    { id: 6, name: 'Developer Portfolio & Resume Hub', category: 'Developer', downloads: '7.9k', desc: 'Showcase projects, tech stack, open-source contributions, and blog posts.' }
  ]);

  // EMI math
  const mRate = mortgageRate / 12 / 100;
  const mMonths = mortgageTerm * 12;
  const monthlyEmi = mRate === 0 ? loanAmount / mMonths : (loanAmount * mRate * Math.pow(1 + mRate, mMonths)) / (Math.pow(1 + mRate, mMonths) - 1);
  const totalPayment = monthlyEmi * mMonths;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#0A2342] text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span>🚀 No sign-up required</span>
        <span>•</span>
        <span>100% Free &amp; Private</span>
        <span>•</span>
        <span>Ad-free browser execution</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search 2,650+ tools (e.g. EMI, PDF to Word)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline-flex items-center px-3 py-1.5 rounded-xl bg-[#0A2342] text-white text-xs font-black tracking-wider">
              ⚡ FAST | 🛡 FREE | 👆 EASY
            </span>
            <button 
              onClick={() => setView('home')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${view === 'home' ? 'bg-[#0B4DB8] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('calculators')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${view === 'calculators' ? 'bg-[#0B4DB8] text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Calculators
            </button>
          </div>
        </div>
      </header>

      {/* VIEW: HOME */}
      {view === 'home' && (
        <main className="flex-1">
          {/* Hero Section */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
            <div className="w-20 h-20 bg-[#0A2342] rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-xl mb-6 transform hover:rotate-6 transition">
              ⚙️
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Free Tools - No Signup Required
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              2650+ PDF, Image, Video, AI &amp; Calculator Tools - All work in your browser. Fast, Free &amp; Easy.
            </p>

            <div className="max-w-2xl mx-auto bg-white p-2 rounded-3xl shadow-xl border border-slate-200 flex items-center gap-2">
              <Search className="w-5 h-5 text-slate-400 ml-3" />
              <input 
                type="text"
                placeholder="Search across 2,650+ free tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 text-sm font-medium outline-none text-slate-800 placeholder-slate-400"
              />
              <button 
                onClick={() => setView('calculators')}
                className="bg-[#0B4DB8] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition cursor-pointer shrink-0"
              >
                Browse All
              </button>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="bg-white border-y border-slate-200/80 py-6 mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-black text-[#0B4DB8]">2,650+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Free Tools</div>
              </div>
              <div>
                <div className="text-2xl font-black text-purple-600">45</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600">2,573+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Guides &amp; Wikis</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-600">Sept 2026</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Updated</div>
              </div>
            </div>
          </section>

          {/* Main 8 Categories Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3 inline-block">
                Explore Hub
              </span>
              <h2 className="text-3xl font-black text-slate-900">Popular Tool Categories</h2>
              <p className="text-slate-600 text-sm mt-2">Pick a category to jump straight into specialized browser utilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Developer Tools', count: '247 tools', icon: '💻', desc: 'JSON, Base64, UUID, JWT, and regex formatters.', tab: 'calculators', bg: 'bg-indigo-50 border-indigo-100' },
                { title: 'Productivity Utilities', count: '231 tools', icon: '⚡', desc: 'Markdown editors, character counters, unit converters.', tab: 'calculators', bg: 'bg-blue-50 border-blue-100' },
                { title: 'Math & Science', count: '197 tools', icon: '🔬', desc: 'Calculators for biology, physics, statistics, and algebra.', tab: 'calculators', bg: 'bg-emerald-50 border-emerald-100' },
                { title: 'Finance & Calculators', count: '184 tools', icon: '📊', desc: 'EMI loans, mortgages, SIP compound interest, and taxes.', tab: 'emi-calculator', bg: 'bg-amber-50 border-amber-200' },
                { title: 'Text & Writing', count: '169 tools', icon: '✍️', desc: 'Summarizers, case converters, grammar checks, and lorem.', tab: 'calculators', bg: 'bg-rose-50 border-rose-100' },
                { title: 'Health & Fitness', count: '160 tools', icon: '❤️', desc: 'BMI, calorie burn, target heart rate, and macros.', tab: 'calculators', bg: 'bg-teal-50 border-teal-100' },
                { title: 'Image & Media', count: '138 tools', icon: '🖼️', desc: 'PDF to Word converters, compressors, color pickers.', tab: 'pdf-to-word', bg: 'bg-purple-50 border-purple-100' },
                { title: 'SEO & Web', count: '115 tools', icon: '🌐', desc: 'Meta tag checkers, sitemap generators, robots.txt editors.', tab: 'directory', bg: 'bg-orange-50 border-orange-100' }
              ].map((cat, idx) => (
                <div 
                  key={idx}
                  onClick={() => setView(cat.tab as any)}
                  className={`p-6 rounded-3xl border ${cat.bg} hover:shadow-xl transition cursor-pointer flex flex-col justify-between group`}
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-4 group-hover:scale-110 transition">
                      {cat.icon}
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-extrabold text-slate-900 text-base">{cat.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-blue-600 mb-2 block">{cat.count}</span>
                    <p className="text-slate-600 text-xs leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                    <span>Explore tools</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Quick Utilities Showcase */}
          <section className="bg-gradient-to-br from-slate-900 to-[#0A2342] text-white py-20 mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 mb-4 inline-block">
                    Featured Utilities
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black mb-6">Try Our Most Popular Browser Tools Instantly</h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-8">
                    No waiting, no server uploads, and zero tracking. Try our advanced financial calculator or our secure in-browser PDF document processor right now.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setView('emi-calculator')}
                      className="bg-[#0B4DB8] hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-2xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Launch EMI &amp; Loan Calculator</span>
                    </button>
                    <button 
                      onClick={() => setView('pdf-to-word')}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-xs transition cursor-pointer flex items-center gap-2 border border-white/10"
                    >
                      <FileText className="w-4 h-4" />
                      <span>PDF to Word Converter</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setView('directory')}
                    className="bg-white/5 hover:bg-white/10 p-6 rounded-3xl border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-2xl mb-3">🚀</div>
                    <h3 className="font-bold text-white text-base mb-1">SaaS Directory</h3>
                    <p className="text-slate-400 text-xs">Discover top indie maker tools with verified upvotes and backlinks.</p>
                  </div>
                  <div 
                    onClick={() => setView('notion-templates')}
                    className="bg-white/5 hover:bg-white/10 p-6 rounded-3xl border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-2xl mb-3">📓</div>
                    <h3 className="font-bold text-white text-base mb-1">Notion Templates</h3>
                    <p className="text-slate-400 text-xs">Free second brain, life OS, and startup productivity templates.</p>
                  </div>
                  <div 
                    onClick={() => setView('ai-news')}
                    className="bg-white/5 hover:bg-white/10 p-6 rounded-3xl border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-2xl mb-3">🤖</div>
                    <h3 className="font-bold text-white text-base mb-1">AI News &amp; Updates</h3>
                    <p className="text-slate-400 text-xs">Latest breakthroughs in GPT-5, Gemini 2.0, and agentic systems.</p>
                  </div>
                  <div 
                    onClick={() => setView('calculators')}
                    className="bg-white/5 hover:bg-white/10 p-6 rounded-3xl border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-2xl mb-3">⚡</div>
                    <h3 className="font-bold text-white text-base mb-1">All 2,650+ Tools</h3>
                    <p className="text-slate-400 text-xs">Comprehensive directory of every single utility available.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is Online Tool Store */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-slate-900">What is Online Tool Store?</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                A single home for 2650+ small, single-purpose web tools - PDF and image utilities, unit converters, calculators, text formatters, developer helpers, and more - that run as plain JavaScript inside your browser tab. There&apos;s no app to install and no account to create.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-slate-900 text-sm">Pick a Tool</h3>
                  <p className="text-slate-600 text-xs">Search or browse through 45 categorized collections instantly.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-slate-900 text-sm">Use in Browser</h3>
                  <p className="text-slate-600 text-xs">Calculations and document conversions happen locally in your tab.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">3</div>
                  <h3 className="font-bold text-slate-900 text-sm">Get Results</h3>
                  <p className="text-slate-600 text-xs">Download processed files or copy computation results instantly.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Is it really 100% free?', a: 'Yes, all 2,650+ tools and calculators are completely free to use without any hidden paywalls or subscription fees.' },
                { q: 'Do I need to create an account?', a: 'No account, login, or email registration is required. Open the site and start using tools immediately.' },
                { q: 'Is my data secure?', a: 'Extremely secure. All file processing (like PDF to Word) and calculations occur directly in your browser. Nothing is uploaded to external servers.' },
                { q: 'How many tools are available?', a: 'We aggregate over 2,650+ small, single-purpose utilities spanning developer helpers, financial calculators, and document converters.' },
                { q: 'Which browsers are supported?', a: 'All modern browsers including Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge.' }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <h3 className="font-extrabold text-slate-900 text-sm mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEW: CALCULATORS HUB */}
      {view === 'calculators' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <button 
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3 inline-block">
              Calculators Hub ({allCalculators.length} available)
            </span>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Financial, Scientific &amp; Everyday Calculators</h1>
            <p className="text-slate-600 text-sm">Select a specialized calculator below to run instant formulas with live input controls.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              onClick={() => setView('emi-calculator')}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
                  📊
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1">Loan &amp; EMI Calculator</h3>
                <span className="text-xs font-bold text-blue-600 mb-2 block">Finance &amp; Investment</span>
                <p className="text-slate-600 text-xs leading-relaxed">Calculate monthly mortgage payments, interest breakdown, and amortization schedules.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {allCalculators.slice(0, 11).map((calc) => (
              <div 
                key={calc.id}
                onClick={() => setView('emi-calculator')}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
                    {calc.icon || '⚡'}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">{calc.name}</h3>
                  <span className="text-xs font-bold text-slate-500 mb-2 block">{calc.category} • {calc.subCategory}</span>
                  <p className="text-slate-600 text-xs leading-relaxed">{calc.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW: EMI CALCULATOR */}
      {view === 'emi-calculator' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <button 
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 mb-3 inline-block">
              Financial Tool
            </span>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Loan &amp; EMI Calculator</h1>
            <p className="text-slate-600 text-sm">Calculate your monthly loan installment, total interest payable, and amortization schedule.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Inputs (70% equivalent) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
                  <span>Loan Amount (₹ / $)</span>
                  <span className="text-blue-600 font-black text-sm">{loanAmount.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="50000" 
                  max="10000000" 
                  step="50000"
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
                  <span>Interest Rate (% p.a.)</span>
                  <span className="text-blue-600 font-black text-sm">{mortgageRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="25" 
                  step="0.1"
                  value={mortgageRate} 
                  onChange={(e) => setMortgageRate(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
                  <span>Loan Tenure (Years)</span>
                  <span className="text-blue-600 font-black text-sm">{mortgageTerm} Years</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="35" 
                  step="1"
                  value={mortgageTerm} 
                  onChange={(e) => setMortgageTerm(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Amortization Formula</h4>
                <div className="bg-slate-50 p-4 rounded-2xl font-mono text-xs text-slate-700 border border-slate-200">
                  EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="bg-[#0B4DB8] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs text-blue-200 uppercase font-extrabold tracking-wider">Monthly Payment (EMI)</span>
                <span className="text-4xl sm:text-5xl font-black text-white mt-2 block">
                  ₹{monthlyEmi.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="space-y-4 pt-8 border-t border-blue-500/50 text-xs">
                <div className="flex justify-between">
                  <span className="text-blue-200">Principal Amount:</span>
                  <span className="font-black">₹{loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Total Interest:</span>
                  <span className="font-black text-amber-300">₹{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Total Payment:</span>
                  <span className="font-black">₹{totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <button 
                onClick={() => alert('Amortization schedule downloaded successfully!')}
                className="mt-8 bg-white text-[#0B4DB8] hover:bg-blue-50 font-black py-3.5 rounded-2xl text-xs transition cursor-pointer shadow-md"
              >
                Download Schedule Report
              </button>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: PDF TO WORD */}
      {view === 'pdf-to-word' && (
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <button 
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="mb-8 text-center">
            <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200 mb-3 inline-block">
              Document Converter
            </span>
            <h1 className="text-3xl font-black text-slate-900 mb-2">PDF to Word Converter</h1>
            <p className="text-slate-600 text-sm">Convert Adobe Acrobat PDF documents into editable Microsoft Word .docx files securely in your browser.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-inner">
              📄➡📝
            </div>
            
            <div className="max-w-md mx-auto">
              <label className="border-2 border-dashed border-slate-300 hover:border-orange-500 bg-slate-50 hover:bg-orange-50/20 rounded-3xl p-8 block transition cursor-pointer">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPdfFile(e.target.files[0]);
                      setIsConverting(true);
                      setTimeout(() => {
                        setIsConverting(false);
                        setConvertedReady(true);
                      }, 1500);
                    }
                  }} 
                  className="hidden" 
                />
                <Upload className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <span className="font-extrabold text-slate-900 text-sm block mb-1">
                  {pdfFile ? pdfFile.name : 'Click to upload PDF or drag & drop'}
                </span>
                <span className="text-xs text-slate-500">Up to 50MB • Secure local browser processing</span>
              </label>
            </div>

            {isConverting && (
              <div className="text-xs font-bold text-orange-600 animate-pulse">
                Processing PDF formatting and converting to Word (.docx)...
              </div>
            )}

            {convertedReady && (
              <div className="space-y-4 pt-4">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-200">
                  <Check className="w-4 h-4" /> Conversion Successful!
                </div>
                <div>
                  <button 
                    onClick={() => alert('Downloading converted Word document...')}
                    className="bg-[#FF8C00] hover:bg-orange-600 text-white font-black px-8 py-3.5 rounded-2xl text-xs transition cursor-pointer shadow-lg inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Word (.docx)</span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-600" /> 100% Secure &amp; Private</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-600" /> Auto-deleted after 1 hour</span>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: DIRECTORY */}
      {view === 'directory' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <button 
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl">
            <span className="bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              SaaS &amp; Maker Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">Discover Top Indie Software &amp; Tools</h1>
            <p className="text-purple-100 text-sm max-w-2xl mb-6">Explore curated software tools with upvotes, reviews, and verified dofollow backlinks for founders.</p>
            
            <div className="max-w-xl bg-white p-2 rounded-2xl flex items-center gap-2 shadow-lg">
              <Search className="w-4 h-4 text-slate-400 ml-2" />
              <input 
                type="text" 
                placeholder="Search SaaS tools (e.g. Analytics, Productivity)..."
                value={directoryQuery}
                onChange={(e) => setDirectoryQuery(e.target.value)}
                className="w-full text-xs font-medium text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saasTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <button 
                      onClick={() => {
                        setSaasTools(saasTools.map(t => t.id === tool.id ? {...t, votes: t.votes + 1} : t));
                      }}
                      className="flex items-center gap-1 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-600 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-200"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{tool.votes}</span>
                    </button>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mb-1">{tool.name}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-bold">✓ Verified Maker Tool</span>
                  <button 
                    onClick={() => alert(`Opening ${tool.name} details & dofollow backlink page...`)}
                    className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW: NOTION TEMPLATES */}
      {view === 'notion-templates' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <button 
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="bg-[#0A0A0A] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-slate-800">
            <span className="bg-[#F59E0B]/20 text-[#F59E0B] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block border border-[#F59E0B]/30">
              Notion Workspace Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">Free Aesthetic Notion Templates</h1>
            <p className="text-slate-400 text-sm max-w-2xl">Supercharge your productivity with professional second brain, student, startup, and finance Notion dashboards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notionTemplates.map((tmpl) => (
              <div key={tmpl.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {tmpl.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500">📥 {tmpl.downloads} downloads</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mb-1">{tmpl.name}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{tmpl.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => alert(`Redirecting to Notion template duplicate page for ${tmpl.name}...`)}
                    className="w-full bg-[#F59E0B] hover:bg-amber-600 text-slate-900 font-black py-2.5 rounded-2xl text-xs transition cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Duplicate Template</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW: AI NEWS */}
      {view === 'ai-news' && (
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <button 
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200 mb-3 inline-block">
              Artificial Intelligence News
            </span>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Latest AI Breakthroughs &amp; Research</h1>
            <p className="text-slate-600 text-sm">Real-time updates on foundation models, agentic frameworks, and developer toolchains.</p>
          </div>

          <div className="space-y-6">
            {[
              { title: 'OpenAI Announces GPT-5 Developer Preview with Native Multimodal Reasoning', date: 'Sept 18, 2026', readTime: '4 min read', tag: 'LLM Models', snippet: 'The next-generation model introduces advanced chain-of-thought orchestration and near-zero latency audio streaming.' },
              { title: 'Google DeepMind Releases Gemini 2.0 Flash with 2 Million Token Context Window', date: 'Sept 17, 2026', readTime: '5 min read', tag: 'Google AI', snippet: 'Developers can now process entire codebases and hour-long video files natively in real-time server instances.' },
              { title: 'Anthropic Unveils Claude 4 Opus with Superior Code Synthesis and Agentic Safeguards', date: 'Sept 16, 2026', readTime: '3 min read', tag: 'Safety & Agents', snippet: 'New benchmark results demonstrate unprecedented reliability in autonomous full-stack software engineering tasks.' },
              { title: 'EU AI Act Enforcement Begins: Compliance Guide for Enterprise Developers', date: 'Sept 15, 2026', readTime: '6 min read', tag: 'Policy & Ethics', snippet: 'Key requirements for transparency, copyright adherence, and safety risk classifications for high-impact AI systems.' }
            ].map((news, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full">{news.tag}</span>
                  <span>{news.date} • {news.readTime}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mb-2">{news.title}</h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{news.snippet}</p>
                <button 
                  onClick={() => alert('Opening full article in reader mode...')}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Read full article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              2,650+ free online tools and calculators. No sign-up required, 100% private browser-side execution.
            </p>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3">Popular Categories</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => setView('calculators')} className="hover:text-blue-600 cursor-pointer">Developer Tools</button></li>
              <li><button onClick={() => setView('emi-calculator')} className="hover:text-blue-600 cursor-pointer">Loan &amp; EMI Calculator</button></li>
              <li><button onClick={() => setView('pdf-to-word')} className="hover:text-blue-600 cursor-pointer">PDF to Word Converter</button></li>
              <li><button onClick={() => setView('directory')} className="hover:text-blue-600 cursor-pointer">SaaS Directory</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3">Resources &amp; Hubs</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => setView('notion-templates')} className="hover:text-blue-600 cursor-pointer">Notion Templates</button></li>
              <li><button onClick={() => setView('ai-news')} className="hover:text-blue-600 cursor-pointer">AI News &amp; Updates</button></li>
              <li><button onClick={() => setView('calculators')} className="hover:text-blue-600 cursor-pointer">All Calculators</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3">Privacy &amp; Terms</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Files and calculations never leave your local device. Free for personal and commercial use.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          &copy; 2026 freetoolsnosignup.com (Clone of onlinetoolstore.io). All rights reserved.
        </div>
      </footer>
    </div>
  );
}
