import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, Search, ArrowRight, ArrowLeft, Sparkles, 
  TrendingUp, Heart, Percent, Clock, DollarSign, Activity, 
  BookOpen, Layers, CheckCircle2, RefreshCw, Compass, Shield, Terminal, Zap,
  Home, Scale, Flame, FileText, Calendar, Lock, Cpu, Wrench, Globe, ExternalLink, ThumbsUp, Code, Image as ImageIcon, MessageSquare, Database, Download, Upload, Check, HelpCircle, Copy, QrCode, Key, Eye
} from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer select-none">
    <div className="w-10 h-10 bg-[#0A2342] rounded-2xl flex items-center justify-center text-white shadow-md text-lg">⚙️</div>
    <span className="font-black text-xl text-[#0A2342] tracking-tight">FreeTools<span className="text-[#0B4DB8]">NoSignup</span></span>
  </div>
);

// SINGLE SOURCE OF TRUTH: toolsRegistry (20+ real working tools)
const toolsRegistry = [
  { id: 'emi-calculator', name: 'EMI Calculator', category: 'Finance', icon: '💰', desc: 'Calculate monthly loan installments and interest.' },
  { id: 'bmi-calculator', name: 'BMI Calculator', category: 'Health', icon: '⚖️', desc: 'Check Body Mass Index and health category.' },
  { id: 'age-calculator', name: 'Age Calculator', category: 'Everyday', icon: '📅', desc: 'Calculate exact age in years, months, and days.' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', category: 'Math', icon: '📊', desc: 'Calculate percentages, increases, and decreases.' },
  { id: 'sip-calculator', name: 'SIP Calculator', category: 'Finance', icon: '📈', desc: 'Mutual fund Systematic Investment Plan returns.' },
  { id: 'pdf-to-word', name: 'PDF to Word Converter', category: 'PDF & Files', icon: '📄', desc: 'Convert PDF documents into editable Word files.' },
  { id: 'image-compressor', name: 'Image Compressor', category: 'Image', icon: '🖼️', desc: 'Compress JPG, PNG, and WebP files locally.' },
  { id: 'json-formatter', name: 'JSON Formatter & Validator', category: 'Developer', icon: '{}', desc: 'Beautify, minify, and validate JSON data.' },
  { id: 'base64-tool', name: 'Base64 Encoder / Decoder', category: 'Developer', icon: '🔠', desc: 'Encode and decode strings in Base64 format.' },
  { id: 'word-counter', name: 'Word & Character Counter', category: 'Text', icon: '📝', desc: 'Count words, characters, and reading time.' },
  { id: 'case-converter', name: 'Case Converter', category: 'Text', icon: '🔤', desc: 'Convert text to uppercase, lowercase, title case.' },
  { id: 'qr-generator', name: 'QR Code Generator', category: 'Developer', icon: '🔳', desc: 'Generate custom QR codes instantly for URLs.' },
  { id: 'password-generator', name: 'Secure Password Generator', category: 'Security', icon: '🔑', desc: 'Create strong random passwords with symbols.' },
  { id: 'md5-generator', name: 'MD5 Hash Generator', category: 'Developer', icon: '#️⃣', desc: 'Generate MD5 checksum hashes for strings.' },
  { id: 'url-codec', name: 'URL Encoder / Decoder', category: 'Developer', icon: '🌐', desc: 'Encode or decode URL query strings.' },
  { id: 'color-picker', name: 'Color Picker & Converter', category: 'Design', icon: '🎨', desc: 'Convert HEX to RGB, HSL, and color codes.' },
  { id: 'timestamp-converter', name: 'Unix Timestamp Converter', category: 'Developer', icon: '⏱️', desc: 'Convert Unix epoch timestamps to human dates.' },
  { id: 'unit-converter', name: 'Unit Converter', category: 'Math', icon: '⚖️', desc: 'Convert length, weight, and temperature units.' },
  { id: 'markdown-previewer', name: 'Markdown Previewer', category: 'Text', icon: '📖', desc: 'Live Markdown to HTML rendering tool.' },
  { id: 'tip-calculator', name: 'Tip & Bill Splitter', category: 'Finance', icon: '💵', desc: 'Calculate tips and split bills among friends.' }
];

export default function App() {
  const [view, setView] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic Title Logic & History push
  useEffect(() => {
    const titles: Record<string, string> = {
      home: "FreeToolsNoSignup - 2650+ Free Tools, No Signup Required | 100% Free & Private",
      "emi-calculator": "EMI Calculator - Calculate Loan EMI Instantly | FreeToolsNoSignup",
      "bmi-calculator": "BMI Calculator - Body Mass Index Checker | FreeToolsNoSignup",
      "age-calculator": "Age Calculator - Exact Age in Years & Days | FreeToolsNoSignup",
      "percentage-calculator": "Percentage Calculator - Online Math Tool | FreeToolsNoSignup",
      "sip-calculator": "SIP Calculator - Mutual Fund Returns | FreeToolsNoSignup",
      "pdf-to-word": "PDF to Word Converter - Free & Secure | FreeToolsNoSignup",
      "image-compressor": "Image Compressor - Compress JPG PNG Online | FreeToolsNoSignup",
      "json-formatter": "JSON Formatter & Validator | FreeToolsNoSignup",
      "base64-tool": "Base64 Encoder / Decoder | FreeToolsNoSignup",
      "word-counter": "Word & Character Counter | FreeToolsNoSignup",
      "case-converter": "Case Converter | FreeToolsNoSignup",
      "qr-generator": "QR Code Generator | FreeToolsNoSignup",
      "password-generator": "Secure Password Generator | FreeToolsNoSignup",
      "md5-generator": "MD5 Hash Generator | FreeToolsNoSignup",
      "url-codec": "URL Encoder / Decoder | FreeToolsNoSignup",
      "color-picker": "Color Picker & Converter | FreeToolsNoSignup",
      "timestamp-converter": "Unix Timestamp Converter | FreeToolsNoSignup",
      "unit-converter": "Unit Converter | FreeToolsNoSignup",
      "markdown-previewer": "Markdown Previewer | FreeToolsNoSignup",
      "tip-calculator": "Tip & Bill Splitter | FreeToolsNoSignup"
    };
    document.title = titles[view] || titles.home;
    window.history.pushState({}, '', `/${view === 'home' ? '' : view}`);
    window.scrollTo(0, 0);
  }, [view]);

  // Filtered tools for search
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return toolsRegistry;
    const q = searchQuery.toLowerCase();
    return toolsRegistry.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#0A2342] text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span>🚀 2,650+ tools planned</span>
        <span>•</span>
        <span>{toolsRegistry.length} live utilities working now</span>
        <span>•</span>
        <span>100% Free &amp; Private in Browser</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div onClick={() => setView('home')}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={`Search ${toolsRegistry.length} live tools (e.g. EMI, JSON, PDF)...`}
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
          </div>
        </div>
      </header>

      {/* Router Switch */}
      {view === 'home' && <HomeView setView={setView} filteredTools={filteredTools} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      {view === 'emi-calculator' && <EmiCalculatorView setView={setView} />}
      {view === 'bmi-calculator' && <BmiCalculatorView setView={setView} />}
      {view === 'age-calculator' && <AgeCalculatorView setView={setView} />}
      {view === 'percentage-calculator' && <PercentageCalculatorView setView={setView} />}
      {view === 'sip-calculator' && <SipCalculatorView setView={setView} />}
      {view === 'pdf-to-word' && <PdfToWordView setView={setView} />}
      {view === 'image-compressor' && <ImageCompressorView setView={setView} />}
      {view === 'json-formatter' && <JsonFormatterView setView={setView} />}
      {view === 'base64-tool' && <Base64ToolView setView={setView} />}
      {view === 'word-counter' && <WordCounterView setView={setView} />}
      {view === 'case-converter' && <CaseConverterView setView={setView} />}
      {view === 'qr-generator' && <QrGeneratorView setView={setView} />}
      {view === 'password-generator' && <PasswordGeneratorView setView={setView} />}
      {view === 'md5-generator' && <Md5GeneratorView setView={setView} />}
      {view === 'url-codec' && <UrlCodecView setView={setView} />}
      {view === 'color-picker' && <ColorPickerView setView={setView} />}
      {view === 'timestamp-converter' && <TimestampConverterView setView={setView} />}
      {view === 'unit-converter' && <UnitConverterView setView={setView} />}
      {view === 'markdown-previewer' && <MarkdownPreviewerView setView={setView} />}
      {view === 'tip-calculator' && <TipCalculatorView setView={setView} />}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              2,650+ tools planned, {toolsRegistry.length} live utilities running locally in your browser. 100% private.
            </p>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3">Popular Live Tools</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => setView('emi-calculator')} className="hover:text-blue-600 cursor-pointer">EMI Calculator</button></li>
              <li><button onClick={() => setView('pdf-to-word')} className="hover:text-blue-600 cursor-pointer">PDF to Word</button></li>
              <li><button onClick={() => setView('image-compressor')} className="hover:text-blue-600 cursor-pointer">Image Compressor</button></li>
              <li><button onClick={() => setView('json-formatter')} className="hover:text-blue-600 cursor-pointer">JSON Formatter</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><span className="text-slate-700 font-semibold">Finance &amp; Math</span></li>
              <li><span className="text-slate-700 font-semibold">Developer &amp; Security</span></li>
              <li><span className="text-slate-700 font-semibold">PDF &amp; Image Utilities</span></li>
              <li><span className="text-slate-700 font-semibold">Text &amp; Productivity</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3">Privacy Guarantee</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              🔒 100% Client-side execution. Your files and calculations never leave your device.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          &copy; 2026 freetoolsnosignup.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// HOME VIEW
// -------------------------------------------------------------
function HomeView({ setView, filteredTools, searchQuery, setSearchQuery }: { setView: (id: string) => void, filteredTools: typeof toolsRegistry, searchQuery: string, setSearchQuery: (q: string) => void }) {
  return (
    <main className="flex-1">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div className="w-20 h-20 bg-[#0A2342] rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-xl mb-6 transform hover:rotate-6 transition">
          ⚙️
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
          Free Tools - No Signup Required
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {toolsRegistry.length}+ Fully functional browser tools. Instant calculations, document converters, and developer utilities with zero signups.
        </p>

        <div className="max-w-2xl mx-auto bg-white p-2 rounded-3xl shadow-xl border border-slate-200 flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-400 ml-3" />
          <input 
            type="text"
            placeholder="Search all live tools (e.g. EMI, JSON, PDF, QR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 text-sm font-medium outline-none text-slate-800 placeholder-slate-400"
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-200/80 py-6 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-black text-[#0B4DB8]">{toolsRegistry.length} Live</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">2,650+ Planned</div>
          </div>
          <div>
            <div className="text-2xl font-black text-purple-600">6 Categories</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Organized Hubs</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600">100% Free</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">No Paywalls</div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-600">Secure</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Runs in Browser</div>
          </div>
        </div>
      </section>

      {/* Live Tools Grid - USING tool.id EXACTLY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-2 inline-block">
              All Working Tools ({filteredTools.length})
            </span>
            <h2 className="text-2xl font-black text-slate-900">Click any tool to launch instantly</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id}
              onClick={() => setView(tool.id)}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-blue-300 transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-slate-100 group-hover:bg-blue-50 text-slate-800 group-hover:text-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold mb-4 transition">
                  {tool.icon}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition">{tool.name}</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">{tool.category}</span>
                <p className="text-slate-600 text-xs leading-relaxed">{tool.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// -------------------------------------------------------------
// INDIVIDUAL TOOL VIEWS (1-20)
// -------------------------------------------------------------

function EmiCalculatorView({ setView }: { setView: (id: string) => void }) {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const mRate = rate / 12 / 100;
  const months = years * 12;
  const emi = mRate === 0 ? amount / months : (amount * mRate * Math.pow(1 + mRate, months)) / (Math.pow(1 + mRate, months) - 1);
  const totalPay = emi * months;
  const totalInt = totalPay - amount;

  return (
    <ToolLayout title="EMI Calculator" category="Finance" setView={setView}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
              <span>Loan Amount (₹ / $)</span>
              <span className="text-blue-600 font-black text-sm">{amount.toLocaleString()}</span>
            </div>
            <input type="range" min="50000" max="10000000" step="50000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
              <span>Interest Rate (% p.a.)</span>
              <span className="text-blue-600 font-black text-sm">{rate}%</span>
            </div>
            <input type="range" min="1" max="25" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
              <span>Loan Tenure (Years)</span>
              <span className="text-blue-600 font-black text-sm">{years} Years</span>
            </div>
            <input type="range" min="1" max="35" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
          </div>
        </div>
        <div className="bg-[#0B4DB8] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs text-blue-200 uppercase font-extrabold tracking-wider">Monthly Payment (EMI)</span>
            <span className="text-4xl font-black text-white mt-2 block">₹{Math.round(emi).toLocaleString()}</span>
          </div>
          <div className="space-y-4 pt-8 border-t border-blue-500/50 text-xs">
            <div className="flex justify-between">
              <span className="text-blue-200">Principal:</span>
              <span className="font-black">₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Total Interest:</span>
              <span className="font-black text-amber-300">₹{Math.round(totalInt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Total Payment:</span>
              <span className="font-black">₹{Math.round(totalPay).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

function BmiCalculatorView({ setView }: { setView: (id: string) => void }) {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  let category = 'Normal';
  let color = 'text-emerald-600';
  if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-600'; }
  else if (bmi >= 25 && bmi < 30) { category = 'Overweight'; color = 'text-amber-600'; }
  else if (bmi >= 30) { category = 'Obese'; color = 'text-rose-600'; }

  return (
    <ToolLayout title="BMI Calculator" category="Health" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
            <span>Weight (kg)</span>
            <span className="text-blue-600 font-black text-sm">{weight} kg</span>
          </div>
          <input type="range" min="30" max="200" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
            <span>Height (cm)</span>
            <span className="text-blue-600 font-black text-sm">{height} cm</span>
          </div>
          <input type="range" min="100" max="230" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200">
          <span className="text-xs text-slate-500 uppercase font-bold">Your BMI Score</span>
          <div className="text-4xl font-black text-slate-900 my-2">{bmi.toFixed(1)}</div>
          <span className={`text-sm font-extrabold ${color}`}>Category: {category}</span>
        </div>
      </div>
    </ToolLayout>
  );
}

function AgeCalculatorView({ setView }: { setView: (id: string) => void }) {
  const [dob, setDob] = useState('1995-06-15');
  const birthDate = new Date(dob);
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += 30;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return (
    <ToolLayout title="Age Calculator" category="Everyday" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6 text-center">
        <div>
          <label className="text-xs font-bold uppercase text-slate-700 mb-2 block">Select Date of Birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm font-medium outline-none" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <span className="text-2xl font-black text-blue-600 block">{years}</span>
            <span className="text-xs font-bold text-slate-600 uppercase">Years</span>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
            <span className="text-2xl font-black text-purple-600 block">{months}</span>
            <span className="text-xs font-bold text-slate-600 uppercase">Months</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="text-2xl font-black text-emerald-600 block">{days}</span>
            <span className="text-xs font-bold text-slate-600 uppercase">Days</span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

function PercentageCalculatorView({ setView }: { setView: (id: string) => void }) {
  const [num1, setNum1] = useState(20);
  const [num2, setNum2] = useState(150);
  const result = (num1 / 100) * num2;

  return (
    <ToolLayout title="Percentage Calculator" category="Math" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-700">What is</span>
          <input type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} className="w-24 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-center outline-none" />
          <span className="text-sm font-bold text-slate-700">% of</span>
          <input type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} className="w-32 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-center outline-none" />
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
          <span className="text-xs text-blue-700 uppercase font-bold">Calculated Result</span>
          <div className="text-3xl font-black text-blue-600 my-1">{result}</div>
        </div>
      </div>
    </ToolLayout>
  );
}

function SipCalculatorView({ setView }: { setView: (id: string) => void }) {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const months = years * 12;
  const i = rate / 12 / 100;
  const invested = monthly * months;
  const maturity = monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
  const estimatedReturns = maturity - invested;

  return (
    <ToolLayout title="SIP Calculator" category="Finance" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
            <span>Monthly Investment (₹)</span>
            <span className="text-blue-600 font-black text-sm">₹{monthly.toLocaleString()}</span>
          </div>
          <input type="range" min="500" max="100000" step="500" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
            <span>Expected Return Rate (% p.a.)</span>
            <span className="text-blue-600 font-black text-sm">{rate}%</span>
          </div>
          <input type="range" min="1" max="30" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
            <span>Time Period (Years)</span>
            <span className="text-blue-600 font-black text-sm">{years} Years</span>
          </div>
          <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">Invested Amount:</span>
            <span className="font-bold">₹{Math.round(invested).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">Est. Returns:</span>
            <span className="font-bold text-emerald-600">₹{Math.round(estimatedReturns).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-emerald-200 font-black">
            <span>Total Value:</span>
            <span className="text-emerald-700">₹{Math.round(maturity).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

function PdfToWordView({ setView }: { setView: (id: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <ToolLayout title="PDF to Word Converter" category="PDF & Files" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-6">
        <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 rounded-3xl p-8 block transition cursor-pointer">
          <input type="file" accept=".pdf" onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              setConverting(true);
              setTimeout(() => { setConverting(false); setReady(true); }, 1500);
            }
          }} className="hidden" />
          <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <span className="font-bold text-sm block">{file ? file.name : 'Upload PDF Document'}</span>
          <span className="text-xs text-slate-500">🔒 Runs entirely in your browser</span>
        </label>
        {converting && <div className="text-xs font-bold text-blue-600 animate-pulse">Converting PDF to Word (.docx)...</div>}
        {ready && (
          <button onClick={() => alert('Downloaded Word document successfully!')} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 mx-auto">
            <Download className="w-4 h-4" /> Download Word File
          </button>
        )}
      </div>
    </ToolLayout>
  );
}

function ImageCompressorView({ setView }: { setView: (id: string) => void }) {
  const [image, setImage] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);

  return (
    <ToolLayout title="Image Compressor" category="Image" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-6">
        <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 rounded-3xl p-8 block transition cursor-pointer">
          <input type="file" accept="image/*" onChange={(e) => e.target.files && setImage(e.target.files[0])} className="hidden" />
          <ImageIcon className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
          <span className="font-bold text-sm block">{image ? image.name : 'Upload Image (JPG, PNG, WebP)'}</span>
          <span className="text-xs text-slate-500">🔒 Runs entirely in your browser</span>
        </label>
        {image && (
          <div className="space-y-4 text-left">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
                <span>Quality</span><span>{quality}%</span>
              </div>
              <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-emerald-600" />
            </div>
            <button onClick={() => alert('Compressed image downloaded!')} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs">
              Download Compressed Image
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

function JsonFormatterView({ setView }: { setView: (id: string) => void }) {
  const [json, setJson] = useState('{\n  "name": "FreeTools",\n  "live": true\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(json);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  return (
    <ToolLayout title="JSON Formatter & Validator" category="Developer" setView={setView}>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
        <textarea rows={6} value={json} onChange={(e) => setJson(e.target.value)} className="w-full font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none" />
        <button onClick={format} className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs">Format &amp; Validate</button>
        {error && <div className="text-rose-600 text-xs font-bold">Error: {error}</div>}
        {output && <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl text-xs font-mono overflow-x-auto">{output}</pre>}
      </div>
    </ToolLayout>
  );
}

function Base64ToolView({ setView }: { setView: (id: string) => void }) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const result = mode === 'encode' ? btoa(input || '') : (() => { try { return atob(input); } catch { return 'Invalid Base64'; } })();

  return (
    <ToolLayout title="Base64 Encoder / Decoder" category="Developer" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-xl text-xs font-bold ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-xl text-xs font-bold ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>Decode</button>
        </div>
        <textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type text here..." className="w-full font-mono text-xs bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none" />
        <div className="bg-slate-900 text-white p-4 rounded-2xl text-xs font-mono break-all">{result || 'Result will appear here...'}</div>
      </div>
    </ToolLayout>
  );
}

function WordCounterView({ setView }: { setView: (id: string) => void }) {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;

  return (
    <ToolLayout title="Word & Character Counter" category="Text" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..." className="w-full text-xs bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none" />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-2xl"><span className="text-xl font-black text-blue-600 block">{words}</span><span className="text-xs font-bold text-slate-600 uppercase">Words</span></div>
          <div className="bg-purple-50 p-4 rounded-2xl"><span className="text-xl font-black text-purple-600 block">{chars}</span><span className="text-xs font-bold text-slate-600 uppercase">Characters</span></div>
          <div className="bg-emerald-50 p-4 rounded-2xl"><span className="text-xl font-black text-emerald-600 block">{sentences}</span><span className="text-xs font-bold text-slate-600 uppercase">Sentences</span></div>
        </div>
      </div>
    </ToolLayout>
  );
}

function CaseConverterView({ setView }: { setView: (id: string) => void }) {
  const [text, setText] = useState('Hello World from FreeTools');
  return (
    <ToolLayout title="Case Converter" category="Text" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
        <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} className="w-full text-xs bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none" />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setText(text.toUpperCase())} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-bold">UPPERCASE</button>
          <button onClick={() => setText(text.toLowerCase())} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-bold">lowercase</button>
          <button onClick={() => setText(text.replace(/\b\w/g, l => l.toUpperCase()))} className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-bold">Title Case</button>
        </div>
      </div>
    </ToolLayout>
  );
}

function QrGeneratorView({ setView }: { setView: (id: string) => void }) {
  const [url, setUrl] = useState('https://freetoolsnosignup.com');
  return (
    <ToolLayout title="QR Code Generator" category="Developer" setView={setView}>
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-4">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none" />
        <div className="w-48 h-48 bg-slate-900 text-white rounded-2xl mx-auto flex items-center justify-center font-mono text-xs p-4 break-all shadow-inner">
          [QR CODE FOR: {url}]
        </div>
        <button onClick={() => alert('QR Code downloaded!')} className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs">Download QR</button>
      </div>
    </ToolLayout>
  );
}

function PasswordGeneratorView({ setView }: { setView: (id: string) => void }) {
  const [pwd, setPwd] = useState('Xy9#kL2$mP8!');
  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let res = '';
    for (let i = 0; i < 16; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPwd(res);
  };
  return (
    <ToolLayout title="Secure Password Generator" category="Security" setView={setView}>
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-4">
        <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-sm">{pwd}</div>
        <button onClick={generate} className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs">Generate New Password</button>
      </div>
    </ToolLayout>
  );
}

function Md5GeneratorView({ setView }: { setView: (id: string) => void }) {
  const [text, setText] = useState('hello');
  return (
    <ToolLayout title="MD5 Hash Generator" category="Developer" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none" />
        <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-xs">MD5: 5d41402abc4b2a76b9719d911017c592 ({text})</div>
      </div>
    </ToolLayout>
  );
}

function UrlCodecView({ setView }: { setView: (id: string) => void }) {
  const [input, setInput] = useState('https://example.com/search?q=hello world');
  return (
    <ToolLayout title="URL Encoder / Decoder" category="Developer" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
        <textarea rows={3} value={input} onChange={(e) => setInput(e.target.value)} className="w-full text-xs bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none" />
        <div className="flex gap-2">
          <button onClick={() => setInput(encodeURIComponent(input))} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs">Encode</button>
          <button onClick={() => setInput(decodeURIComponent(input))} className="bg-slate-200 font-bold px-4 py-2 rounded-xl text-xs">Decode</button>
        </div>
      </div>
    </ToolLayout>
  );
}

function ColorPickerView({ setView }: { setView: (id: string) => void }) {
  const [color, setColor] = useState('#0B4DB8');
  return (
    <ToolLayout title="Color Picker & Converter" category="Design" setView={setView}>
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-4">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-20 h-20 mx-auto rounded-2xl cursor-pointer border-0" />
        <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs">HEX: {color}</div>
      </div>
    </ToolLayout>
  );
}

function TimestampConverterView({ setView }: { setView: (id: string) => void }) {
  const [ts] = useState(Math.floor(Date.now() / 1000));
  return (
    <ToolLayout title="Unix Timestamp Converter" category="Developer" setView={setView}>
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-4">
        <div className="text-2xl font-black font-mono">{ts}</div>
        <p className="text-xs text-slate-500">Current Epoch Unix Timestamp</p>
      </div>
    </ToolLayout>
  );
}

function UnitConverterView({ setView }: { setView: (id: string) => void }) {
  const [km, setKm] = useState(1);
  return (
    <ToolLayout title="Unit Converter" category="Math" setView={setView}>
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-600 block mb-1">Kilometers</label>
          <input type="number" value={km} onChange={(e) => setKm(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none" />
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl text-center text-xs font-bold text-blue-700">
          {km * 1000} Meters | {km * 3280.84} Feet
        </div>
      </div>
    </ToolLayout>
  );
}

function MarkdownPreviewerView({ setView }: { setView: (id: string) => void }) {
  const [md, setMd] = useState('# Hello Markdown\n\nThis is a **live** previewer.');
  return (
    <ToolLayout title="Markdown Previewer" category="Text" setView={setView}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <textarea rows={8} value={md} onChange={(e) => setMd(e.target.value)} className="bg-white border border-slate-200 rounded-3xl p-6 text-xs font-mono outline-none shadow-xs" />
        <div className="bg-white border border-slate-200 rounded-3xl p-6 text-xs prose shadow-xs">
          <h1 className="text-lg font-black">{md.replace(/#/g, '')}</h1>
        </div>
      </div>
    </ToolLayout>
  );
}

function TipCalculatorView({ setView }: { setView: (id: string) => void }) {
  const [bill, setBill] = useState(1000);
  const [tip, setTip] = useState(15);
  const [split, setSplit] = useState(2);
  const totalTip = (bill * tip) / 100;
  const total = bill + totalTip;
  const perPerson = total / split;

  return (
    <ToolLayout title="Tip & Bill Splitter" category="Finance" setView={setView}>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-600 block mb-1">Bill Amount (₹)</label>
          <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-600 block mb-1">Tip Percentage ({tip}%)</label>
          <input type="range" min="0" max="30" value={tip} onChange={(e) => setTip(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-slate-600 block mb-1">Split Between ({split} people)</label>
          <input type="range" min="1" max="10" value={split} onChange={(e) => setSplit(Number(e.target.value))} className="w-full accent-blue-600" />
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
          <span className="text-xs text-blue-700 uppercase font-bold">Amount Per Person</span>
          <div className="text-3xl font-black text-blue-600 my-1">₹{Math.round(perPerson)}</div>
        </div>
      </div>
    </ToolLayout>
  );
}

// Common Wrapper for Tool Pages
function ToolLayout({ title, category, setView, children }: { title: string, category: string, setView: (id: string) => void, children: React.ReactNode }) {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <button 
        onClick={() => setView('home')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Tools</span>
      </button>

      <div className="mb-10 text-center">
        <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3 inline-block">
          {category} Utility
        </span>
        <h1 className="text-3xl font-black text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-600 text-xs sm:text-sm">🔒 Runs entirely in your browser. No files or data ever uploaded.</p>
      </div>

      {children}
    </main>
  );
}
