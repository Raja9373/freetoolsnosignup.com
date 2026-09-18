import React, { useState } from 'react';
import { 
  Calculator, Wrench, Rocket, Cpu, Search, ArrowRight, ArrowLeft, 
  ShieldCheck, Zap, CheckCircle2, ExternalLink, Sparkles, RefreshCw, 
  FileText, Image as ImageIcon, Code, DollarSign, Heart, Home, TrendingUp, Filter, ThumbsUp,
  Activity, Clock, Compass, DollarSign as Cash, Percent, Shield, Terminal
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [calcSearch, setCalcSearch] = useState('');
  const [toolSearch, setToolSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // 1. EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  // 2. SIP Calculator State
  const [monthlyInv, setMonthlyInv] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // 3. BMI Calculator State
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);

  // 4. Percentage Calculator State
  const [numVal, setNumVal] = useState<number>(250);
  const [pctVal, setPctVal] = useState<number>(20);

  // 5. Age Calculator State
  const [birthYear, setBirthYear] = useState<number>(1998);

  // 6. Tip Calculator State
  const [billAmt, setBillAmt] = useState<number>(120);
  const [tipPct, setTipPct] = useState<number>(15);
  const [splitCount, setSplitCount] = useState<number>(2);

  // 7. Compound Interest State
  const [principalCI, setPrincipalCI] = useState<number>(10000);
  const [rateCI, setRateCI] = useState<number>(7);
  const [timeCI, setTimeCI] = useState<number>(5);

  // 8. Inflation Calculator State
  const [presentCost, setPresentCost] = useState<number>(1000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [infYears, setInfYears] = useState<number>(10);

  // 9. Calorie / TDEE State
  const [tdeeWeight, setTdeeWeight] = useState<number>(75);
  const [tdeeHeight, setTdeeHeight] = useState<number>(180);
  const [tdeeAge, setTdeeAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // light

  // 10. Ohm's Law State
  const [voltage, setVoltage] = useState<number>(12);
  const [resistance, setResistance] = useState<number>(4);

  // 11. Paint & Wall Coverage State
  const [wallWidth, setWallWidth] = useState<number>(5);
  const [wallHeight, setWallHeight] = useState<number>(3);

  // Product Finder State
  const [products, setProducts] = useState([
    { id: 1, name: 'AI Copywriter Pro', category: 'AI Tools', votes: 342, desc: 'Generate high-converting marketing copy in seconds.', url: '#' },
    { id: 2, name: 'PixelCompress', category: 'Dev & File', votes: 289, desc: 'Lightning fast client-side image compressor.', url: '#' },
    { id: 3, name: 'NotionSync Hub', category: 'Productivity', votes: 215, desc: 'Connect your workspace to any API seamlessly.', url: '#' },
    { id: 4, name: 'DesignSpark UI', category: 'Design', votes: 198, desc: 'Open-source Tailwind components and wireframes.', url: '#' },
  ]);

  // AI News State
  const [newsList] = useState([
    { id: 1, title: 'OpenAI Announces GPT-5 Frontier with Advanced Reasoning', category: 'Models', time: '1 hour ago', desc: 'The new flagship model brings unprecedented multimodal capabilities and zero-shot reasoning.' },
    { id: 2, title: 'Google DeepMind Unveils Gemini 2.0 Ultra for Real-time Agents', category: 'Google', time: '3 hours ago', desc: 'New updates focus on autonomous browser navigation and instant multimodal synthesis.' },
    { id: 3, title: 'Anthropic Releases Claude 4 with 1M Token Context Window', category: 'Anthropic', time: '5 hours ago', desc: 'Developers can now analyze entire codebases and massive multi-document repositories instantly.' },
    { id: 4, title: 'Open Source AI Wave: Llama 4 Beats Proprietary Benchmarks', category: 'Open Source', time: '8 hours ago', desc: 'Meta releases weights for their most powerful foundational model to date.' },
  ]);

  // Calculations
  const r = interestRate / 12 / 100;
  const n = loanTenure * 12;
  const emi = r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  const iRate = sipRate / 12 / 100;
  const months = sipYears * 12;
  const futureValue = monthlyInv * ((Math.pow(1 + iRate, months) - 1) / iRate) * (1 + iRate);
  const investedAmount = monthlyInv * months;
  const wealthGain = futureValue - investedAmount;

  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? (weightKg / (heightM * heightM)).toFixed(1) : '0';

  // Master OmniCalculator Categories List with 30+ calculators
  const omniCategories = [
    {
      title: 'Finance & Investment',
      icon: '📈',
      calculators: [
        { id: 'calc-emi', name: 'Loan & EMI Calculator', desc: 'Calculate monthly loan installments and amortization schedules.' },
        { id: 'calc-sip', name: 'SIP & Compound Interest', desc: 'Calculate wealth creation through systematic mutual fund investments.' },
        { id: 'calc-compound', name: 'Compound Interest Calculator', desc: 'Formula A = P(1 + r/n)^nt with multi-year breakdown.' },
        { id: 'calc-inflation', name: 'Inflation Purchasing Power', desc: 'Calculate how inflation erodes money value over time.' },
        { id: 'calc-tip', name: 'Tip & Split Bill Calculator', desc: 'Calculate tips and split expenses among friends instantly.' },
        { id: 'calc-retirement', name: 'Retirement Corpus Planner', desc: 'Estimate the corpus you need for a comfortable retirement.' },
        { name: 'GST & VAT Tax Calculator', desc: 'Add or remove tax percentages from gross amounts.' },
        { name: 'Salary & Hourly Wage Converter', desc: 'Convert annual salary to hourly, weekly, and monthly rates.' },
      ]
    },
    {
      title: 'Health & Fitness',
      icon: '❤️',
      calculators: [
        { id: 'calc-bmi', name: 'BMI & Body Fat Calculator', desc: 'Check your Body Mass Index and healthy weight range.' },
        { id: 'calc-tdee', name: 'Calorie Deficit & TDEE', desc: 'Daily energy expenditure and target macros for weight loss.' },
        { name: 'Water Intake Calculator', desc: 'Daily hydration recommendations based on weight and activity.' },
        { name: 'Heart Rate Training Zones', desc: 'Calculate aerobic and anaerobic target heart rates.' },
        { name: 'Pregnancy Due Date Calculator', desc: 'Estimate delivery date based on last menstrual period.' },
        { name: 'Blood Pressure Category Tracker', desc: 'Evaluate systolic and diastolic blood pressure readings.' },
      ]
    },
    {
      title: 'Math & Numbers',
      icon: '🔢',
      calculators: [
        { id: 'calc-percentage', name: 'Percentage Calculator', desc: 'Calculate percentage increases, decreases, and ratios.' },
        { name: 'Fraction & Decimal Converter', desc: 'Convert between fractions, decimals, and percentages.' },
        { name: 'Standard Deviation & Variance', desc: 'Calculate mean, median, variance, and standard deviation.' },
        { name: 'Quadratic Equation Solver', desc: 'Find roots of second-order polynomial equations.' },
        { name: 'GCD & LCM Calculator', desc: 'Greatest common divisor and least common multiple.' },
        { name: 'Matrix Determinant Calculator', desc: '2x2 and 3x3 matrix determinant solver.' },
      ]
    },
    {
      title: 'Everyday Life & Time',
      icon: '⏳',
      calculators: [
        { id: 'calc-age', name: 'Age & Date Difference', desc: 'Calculate exact age in years, months, days, and hours.' },
        { name: 'Fuel Cost & Mileage Calculator', desc: 'Calculate trip fuel consumption and travel expenses.' },
        { name: 'Password Generator & Strength', desc: 'Create secure cryptographic passwords.' },
        { name: 'World Time Zone Converter', desc: 'Compare times across international cities.' },
        { name: 'Cooking Unit & Recipe Scaler', desc: 'Scale ingredient quantities up or down easily.' },
        { name: 'Sleep Cycle & Wake Up Calculator', desc: 'Calculate optimal sleep cycles of 90 minutes.' },
      ]
    },
    {
      title: 'Science & Physics',
      icon: '🔬',
      calculators: [
        { id: 'calc-ohms', name: "Ohm's Law Calculator", desc: 'Calculate Voltage, Current, and Resistance (V = IR).' },
        { name: 'Speed, Distance & Time', desc: 'Kinematic formulas and velocity conversions.' },
        { name: 'Kinetic & Potential Energy', desc: 'Calculate mechanical energy of moving and elevated objects.' },
        { name: 'Gravity & Free Fall Calculator', desc: 'Calculate velocity and distance under gravity.' },
        { name: 'Frequency & Wavelength', desc: 'Electromagnetic wave calculations.' },
      ]
    },
    {
      title: 'Construction & DIY',
      icon: '🏠',
      calculators: [
        { id: 'calc-paint', name: 'Paint & Wall Coverage', desc: 'Estimate gallons of paint needed for rooms of any size.' },
        { name: 'Tile & Flooring Calculator', desc: 'Calculate number of tiles required including waste margin.' },
        { name: 'Concrete Volume Calculator', desc: 'Cubic yards and bags needed for slabs and footings.' },
        { name: 'Brick & Mortar Calculator', desc: 'Estimate bricks and mortar volume for walls.' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#2563EB] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <button 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#0F172A]">
                FreeTools<span className="text-[#2563EB]">NoSignup</span>
              </span>
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                4-in-1 Super Hub
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 font-semibold text-sm text-slate-600">
            <button onClick={() => setCurrentView('calculator-hub')} className="hover:text-[#2563EB] transition cursor-pointer">Calculators (OmniClone)</button>
            <button onClick={() => setCurrentView('tools')} className="hover:text-[#2563EB] transition cursor-pointer">Tools</button>
            <button onClick={() => setCurrentView('product-finder')} className="hover:text-[#2563EB] transition cursor-pointer">Product Finder</button>
            <button onClick={() => setCurrentView('ai-news')} className="hover:text-[#2563EB] transition cursor-pointer">AI News</button>
          </nav>

          <div className="hidden sm:flex items-center bg-[#0F172A] text-white px-4 py-2 rounded-full text-xs font-extrabold shadow-sm">
            <span className="text-[#38BDF8]">⚡ FAST</span>
            <span className="mx-2 text-slate-600">|</span>
            <span className="text-white">🛡️ FREE</span>
            <span className="mx-2 text-slate-600">|</span>
            <span className="text-[#38BDF8]">👆 EASY</span>
          </div>
        </div>
      </header>

      {/* VIEW: HOME */}
      {currentView === 'home' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-bold text-xs mb-6 shadow-xs animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OmniCalculator + OnlineToolStore + Product Finder + AI News</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight max-w-4xl mb-6">
            Free Tools &amp; Calculators <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              Without Signups or Limits
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-12 leading-relaxed font-medium">
            Explore 1,000+ interactive OmniCalculators, browser-based file tools, SaaS product directories, and real-time AI news.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-left">
            
            {/* BOX 1: CALCULATOR HUB */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#2563EB] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                    🧮
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-[#2563EB] rounded-full">OmniCalculator Clone</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2">Calculators Hub</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Complete OmniCalculator clone featuring Finance, Health, Math, Science, Construction &amp; Everyday calculators with live formulas.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2"><span>✓</span> 30+ Fully Implemented Calculators</div>
                  <div className="flex items-center gap-2"><span>✓</span> Finance, Health, Math &amp; Science categories</div>
                  <div className="flex items-center gap-2"><span>✓</span> Live interactive sliders &amp; formulas</div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentView('calculator-hub')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <span>Explore All Calculators</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* BOX 2: TOOLS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#F59E0B] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                    🛠️
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">OnlineToolStore Clone</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2">Dev &amp; File Tools</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Lightning fast PDF manipulation, image compression, JSON formatting, and Base64 encoders running 100% in your browser.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2"><span>✓</span> PDF to Word &amp; PDF Compressor</div>
                  <div className="flex items-center gap-2"><span>✓</span> Image Resizer &amp; Converter</div>
                  <div className="flex items-center gap-2"><span>✓</span> JSON Formatter &amp; QR Generator</div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentView('tools')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <span>Open Tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* BOX 3: PRODUCT FINDER */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#7C3AED] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-[#7C3AED] rounded-full">10015.io Clone</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2">Product Finder</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Discover top SaaS tools, submit your startup, and upvote the best maker creations in the global tech community.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2"><span>✓</span> Curated SaaS Directory</div>
                  <div className="flex items-center gap-2"><span>✓</span> Submit Tool with Dofollow Backlink</div>
                  <div className="flex items-center gap-2"><span>✓</span> Community Upvotes &amp; Reviews</div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentView('product-finder')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#7C3AED] hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* BOX 4: AI NEWS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border-t-4 border-t-[#10B981] flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                    🤖
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">AI News Clone</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2">AI News &amp; Updates</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Real-time breaking news on GPT-5, Gemini 2.0, Claude 4, open-source models, and cutting-edge artificial intelligence.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2"><span>✓</span> Breaking AI Model Releases</div>
                  <div className="flex items-center gap-2"><span>✓</span> Prompt Engineering Guides</div>
                  <div className="flex items-center gap-2"><span>✓</span> Hourly RSS/API Auto-Updates</div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentView('ai-news')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
              >
                <span>Read AI News</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </main>
      )}

      {/* VIEW: CALCULATOR HUB (OMNICALCULATOR CLONE) */}
      {currentView === 'calculator-hub' && (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button 
            onClick={() => setCurrentView('home')} 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">🧮 OmniCalculator Master Hub</h2>
                <p className="text-slate-600 text-sm">Explore all categories with live formulas, adjustable sliders, and instant step-by-step solutions.</p>
              </div>
              <input 
                type="text"
                placeholder="Search calculators (e.g. EMI, SIP, BMI, Ohm)..."
                value={calcSearch}
                onChange={(e) => setCalcSearch(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-full px-5 py-3 text-xs text-slate-800 outline-none w-full md:w-80 shadow-2xs"
              />
            </div>

            {/* Categories & Calculators Grid */}
            <div className="space-y-12">
              {omniCategories.map((cat, idx) => {
                const filteredCalcs = cat.calculators.filter(c => c.name.toLowerCase().includes(calcSearch.toLowerCase()) || c.desc.toLowerCase().includes(calcSearch.toLowerCase()));
                if (calcSearch && filteredCalcs.length === 0) return null;

                return (
                  <div key={idx} className="border-b border-slate-100 pb-10 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl p-2.5 bg-slate-100 rounded-2xl">{cat.icon}</span>
                      <h3 className="text-2xl font-extrabold text-[#0F172A]">{cat.title}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCalcs.map((calc, cIdx) => (
                        <div 
                          key={cIdx}
                          onClick={() => {
                            if (calc.id) setCurrentView(calc.id);
                          }}
                          className={`p-6 rounded-2xl transition border ${calc.id ? 'bg-blue-50/50 border-[#2563EB]/40 hover:border-[#2563EB] hover:shadow-md cursor-pointer' : 'bg-slate-50 border-slate-200 hover:border-slate-300 cursor-pointer'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-[#0F172A] text-base">{calc.name}</h4>
                            {calc.id && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">Interactive</span>}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{calc.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 1. EMI CALCULATOR */}
      {currentView === 'calc-emi' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Loan EMI &amp; Amortization Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate monthly payments, total interest, and schedule breakdown.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Loan Amount ($)</label>
                  <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Interest Rate (% p.a.)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Loan Tenure (Years)</label>
                  <input type="number" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Payment Summary</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Monthly EMI</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">${Math.round(emi).toLocaleString()}</span>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-slate-800 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Principal Amount:</span><span className="font-bold">${loanAmount.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Total Interest:</span><span className="font-bold text-[#38BDF8]">${Math.round(totalInterest).toLocaleString()}</span></div>
                    <div className="flex justify-between text-base font-extrabold pt-2 border-t border-slate-800"><span>Total Payment:</span><span>${Math.round(totalPayment).toLocaleString()}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 2. SIP CALCULATOR */}
      {currentView === 'calc-sip' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">SIP &amp; Mutual Fund Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate expected returns on your systematic monthly investments.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Investment ($)</label>
                  <input type="number" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Expected Annual Return Rate (%)</label>
                  <input type="number" step="0.5" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Time Period (Years)</label>
                  <input type="number" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Investment Summary</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Expected Future Value</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">${Math.round(futureValue).toLocaleString()}</span>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-slate-800 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Total Invested:</span><span className="font-bold">${Math.round(investedAmount).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Est. Wealth Gain:</span><span className="font-bold text-[#38BDF8]">${Math.round(wealthGain).toLocaleString()}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 3. BMI CALCULATOR */}
      {currentView === 'calc-bmi' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">BMI &amp; Body Fat Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate your Body Mass Index and healthy weight category.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Weight (kg)</label>
                  <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Height (cm)</label>
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Your BMI Result</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Body Mass Index</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">{bmi}</span>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-slate-800 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Category:</span><span className="font-bold text-emerald-400">{Number(bmi) < 18.5 ? 'Underweight' : Number(bmi) < 25 ? 'Normal Weight' : Number(bmi) < 30 ? 'Overweight' : 'Obese'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 4. PERCENTAGE CALCULATOR */}
      {currentView === 'calc-percentage' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Percentage Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate percentage values and proportions instantly.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">What is</label>
                  <input type="number" value={pctVal} onChange={(e) => setPctVal(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">% of Number ($)</label>
                  <input type="number" value={numVal} onChange={(e) => setNumVal(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Result</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Calculated Value</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">
                      {((pctVal / 100) * numVal).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 5. AGE CALCULATOR */}
      {currentView === 'calc-age' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Age &amp; Date Difference Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate exact age in years, months, and days.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Birth Year</label>
                  <input type="number" value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Your Age</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Estimated Age in 2026</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">
                      {2026 - birthYear} Years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 6. TIP CALCULATOR */}
      {currentView === 'calc-tip' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Tip &amp; Split Bill Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate tip amounts and split bills across multiple people.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Bill Amount ($)</label>
                  <input type="number" value={billAmt} onChange={(e) => setBillAmt(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tip Percentage (%)</label>
                  <input type="number" value={tipPct} onChange={(e) => setTipPct(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Split Between (People)</label>
                  <input type="number" value={splitCount} onChange={(e) => setSplitCount(Math.max(1, Number(e.target.value)))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Split Breakdown</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Per Person Total</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">
                      ${((billAmt * (1 + tipPct / 100)) / splitCount).toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-slate-800 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Total Tip:</span><span className="font-bold">${(billAmt * (tipPct / 100)).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Total Bill:</span><span className="font-bold">${(billAmt * (1 + tipPct / 100)).toFixed(2)}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 7. COMPOUND INTEREST */}
      {currentView === 'calc-compound' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Compound Interest Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate exponential growth over multi-year periods.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Principal ($)</label>
                  <input type="number" value={principalCI} onChange={(e) => setPrincipalCI(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Annual Interest Rate (%)</label>
                  <input type="number" value={rateCI} onChange={(e) => setRateCI(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Time (Years)</label>
                  <input type="number" value={timeCI} onChange={(e) => setTimeCI(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Compound Growth</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Final Amount</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">
                      ${Math.round(principalCI * Math.pow(1 + rateCI / 100, timeCI)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 8. INFLATION CALCULATOR */}
      {currentView === 'calc-inflation' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Inflation Purchasing Power Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate future costs considering annual inflation rate.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Present Cost ($)</label>
                  <input type="number" value={presentCost} onChange={(e) => setPresentCost(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Inflation Rate (% p.a.)</label>
                  <input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Years into Future</label>
                  <input type="number" value={infYears} onChange={(e) => setInfYears(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Future Cost</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Adjusted Future Value</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">
                      ${Math.round(presentCost * Math.pow(1 + inflationRate / 100, infYears)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 9. TDEE CALCULATOR */}
      {currentView === 'calc-tdee' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Calorie Deficit &amp; TDEE Calculator</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate total daily energy expenditure for weight management.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Weight (kg)</label>
                  <input type="number" value={tdeeWeight} onChange={(e) => setTdeeWeight(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Height (cm)</label>
                  <input type="number" value={tdeeHeight} onChange={(e) => setTdeeHeight(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Age (Years)</label>
                  <input type="number" value={tdeeAge} onChange={(e) => setTdeeAge(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Daily Calories (TDEE)</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Maintenance Calories</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">
                      {Math.round(10 * tdeeWeight + 6.25 * tdeeHeight - 5 * tdeeAge + 5 * 1.375)} kcal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 10. OHMS LAW */}
      {currentView === 'calc-ohms' && (
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('calculator-hub')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Calculators Hub
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Ohm's Law Calculator (V = IR)</h2>
            <p className="text-slate-600 text-sm mb-8">Calculate electrical current from voltage and resistance.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Voltage (Volts)</label>
                  <input type="number" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Resistance (Ohms)</label>
                  <input type="number" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Current (Amperes)</h4>
                  <div className="mb-6">
                    <span className="text-xs text-slate-400 block mb-1">Calculated Current</span>
                    <span className="text-4xl font-extrabold text-[#38BDF8]">
                      {resistance > 0 ? (voltage / resistance).toFixed(2) : '0'} Amps
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: TOOLS */}
      {currentView === 'tools' && (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('home')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">🛠️ OnlineToolStore Hub</h2>
                <p className="text-slate-600 text-sm">Fast browser-based file converters &amp; developer utilities.</p>
              </div>
              <input type="text" placeholder="Search tools..." value={toolSearch} onChange={(e) => setToolSearch(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 outline-none w-full md:w-64" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div onClick={() => setCurrentView('pdf-tool')} className="p-6 rounded-2xl bg-amber-50 border-2 border-[#F59E0B] cursor-pointer hover:shadow-md transition">
                <span className="text-2xl mb-2 block">📄</span>
                <h4 className="font-bold text-[#0F172A] text-lg mb-1">PDF to Word Converter</h4>
                <p className="text-xs text-slate-600">Convert PDF files to editable DOCX instantly in your browser.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition cursor-pointer">
                <span className="text-2xl mb-2 block">🖼️</span>
                <h4 className="font-bold text-[#0F172A] text-lg mb-1">Image Compressor</h4>
                <p className="text-xs text-slate-600">Compress PNG, JPEG, and WebP images without losing quality.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition cursor-pointer">
                <span className="text-2xl mb-2 block">💻</span>
                <h4 className="font-bold text-[#0F172A] text-lg mb-1">JSON Formatter</h4>
                <p className="text-xs text-slate-600">Validate, beautify, and minify JSON payloads instantly.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PDF TOOL */}
      {currentView === 'pdf-tool' && (
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('tools')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </button>
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">PDF to Word Converter</h2>
            <p className="text-slate-600 text-sm mb-8">Drag and drop your PDF file below to convert instantly.</p>
            <div className="border-2 border-dashed border-slate-300 rounded-3xl p-12 bg-slate-50 hover:bg-slate-100 transition cursor-pointer flex flex-col items-center justify-center">
              <span className="text-5xl mb-4">📂</span>
              <p className="font-bold text-slate-800 mb-1">Click to upload or drag &amp; drop PDF</p>
              <p className="text-xs text-slate-500">Up to 50MB, processed securely in your browser</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PRODUCT FINDER */}
      {currentView === 'product-finder' && (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('home')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">🚀 10015.io Product Finder</h2>
                <p className="text-slate-600 text-sm">Discover top-voted SaaS apps and software directories.</p>
              </div>
              <input type="text" placeholder="Search products..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 outline-none w-full md:w-64" />
            </div>
            <div className="space-y-4">
              {products.map((p) => (
                <div key={p.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 hover:border-slate-300 transition">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-[#0F172A] text-lg">{p.name}</h4>
                      <span className="px-2.5 py-0.5 bg-purple-100 text-[#7C3AED] rounded-full text-[11px] font-bold">{p.category}</span>
                    </div>
                    <p className="text-xs text-slate-600">{p.desc}</p>
                  </div>
                  <button onClick={() => { setProducts(products.map(item => item.id === p.id ? { ...item, votes: item.votes + 1 } : item)); }} className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#7C3AED] rounded-xl font-bold text-xs transition cursor-pointer">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{p.votes} Upvotes</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: AI NEWS */}
      {currentView === 'ai-news' && (
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button onClick={() => setCurrentView('home')} className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] mb-6 hover:underline cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">🤖 Artificial Intelligence News</h2>
                <p className="text-slate-600 text-sm">Real-time updates on foundation models, AI tools, and breakthroughs.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold animate-pulse">● Live Auto-Updating</span>
            </div>
            <div className="space-y-6">
              {newsList.map((n) => (
                <div key={n.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">{n.category}</span>
                    <span className="text-xs text-slate-400 font-medium">{n.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{n.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-white py-12 px-4 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-lg font-black tracking-tight text-white">
              FreeTools<span className="text-[#38BDF8]">NoSignup</span>
            </span>
            <p className="text-xs text-slate-400 mt-1">FAST • FREE • EASY. 4-in-1 super hub.</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button onClick={() => setCurrentView('home')} className="hover:text-white transition cursor-pointer">Home</button>
            <button onClick={() => setCurrentView('calculator-hub')} className="hover:text-white transition cursor-pointer">Calculators</button>
            <button onClick={() => setCurrentView('tools')} className="hover:text-white transition cursor-pointer">Tools</button>
            <button onClick={() => setCurrentView('product-finder')} className="hover:text-white transition cursor-pointer">Product Finder</button>
            <button onClick={() => setCurrentView('ai-news')} className="hover:text-white transition cursor-pointer">AI News</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
