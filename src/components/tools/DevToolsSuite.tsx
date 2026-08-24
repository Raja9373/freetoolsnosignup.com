import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Code2, 
  Search, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Share2, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  FileCode, 
  KeyRound, 
  Binary, 
  Database,
  ArrowRight,
  ShieldCheck,
  Terminal,
  FileJson,
  Layers
} from 'lucide-react';
import { ALL_DEV_PRO_TOOLS, DevToolItem, generateLuhnCard } from './devToolsCatalog';
import { executeDevTool, DevToolExecutionResult } from './devToolsEngine';

interface DevToolsSuiteProps {
  initialToolId?: string;
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

export const DevToolsSuite: React.FC<DevToolsSuiteProps> = ({ initialToolId, onClose, onRecordUse }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'json-code' | 'hash-crypto' | 'converters' | 'generators'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial tool selection
  const [selectedToolId, setSelectedToolId] = useState<string>(() => {
    if (initialToolId && ALL_DEV_PRO_TOOLS.some(t => t.id === initialToolId)) {
      return initialToolId;
    }
    if (initialToolId === 'fake-data-generator') return 'fake-user-profile-gen';
    if (initialToolId === 'json-formatter') return 'json-formatter';
    if (initialToolId === 'hash-generator') return 'all-hash-generator';
    if (initialToolId === 'base64-converter') return 'base64-encode-decode';
    if (initialToolId === 'regex-tester') return 'regex-tester-pro';
    return 'json-formatter';
  });

  const activeTool: DevToolItem = useMemo(() => {
    return ALL_DEV_PRO_TOOLS.find(t => t.id === selectedToolId) || ALL_DEV_PRO_TOOLS[0];
  }, [selectedToolId]);

  // Input & Option States
  const [inputText, setInputText] = useState<string>('');
  const [options, setOptions] = useState<Record<string, any>>({
    space: 2,
    mode: 'encode',
    cardType: 'visa',
    count: 3,
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  // Re-seed default sample input when active tool changes
  useEffect(() => {
    switch (activeTool.id) {
      case 'json-formatter':
      case 'json-to-yaml':
      case 'json-to-csv':
        setInputText('{\n  "app": "ToolsDabba",\n  "version": "2.5.0",\n  "status": "active",\n  "metrics": {\n    "accuracy": 100,\n    "uptime": "99.99%"\n  },\n  "tags": ["developer", "tools", "utility"]\n}');
        break;
      case 'yaml-to-json':
        setInputText('server:\n  port: 3000\n  host: 0.0.0.0\n  env: production\n  database:\n    type: postgres\n    pool: 10');
        break;
      case 'csv-to-json':
        setInputText('id,name,role,department,salary\n101,Aarav Sharma,Tech Lead,Engineering,2400000\n102,Diya Patel,Product Designer,UX,1800000\n103,Rohan Gupta,DevOps Engineer,Cloud,2100000');
        break;
      case 'xml-formatter':
      case 'xml-to-json':
        setInputText('<project id="dabba-100"><name>ToolsDabba Suite</name><author><firstName>Dev</firstName><lastName>Coder</lastName></author><active>true</active></project>');
        break;
      case 'jwt-debugger':
        setInputText('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1NiIsIm5hbWUiOiJBbGV4IENvZGVyIiwiZW1haWwiOiJhbGV4QHRvb2xzZGFiYmEuY29tIiwicm9sZXMiOlsidXNlciIsImRldmVsb3BlciJdLCJpYXQiOjE3MTYyMzkwMjIsImV4cCI6MTk5OTk5OTk5OX0.dummySignature12345');
        break;
      case 'all-hash-generator':
      case 'md5-hash':
      case 'sha256-hash':
      case 'sha512-hash':
        setInputText('ToolsDabba2025Secret');
        break;
      case 'number-base-converter':
        setInputText('255');
        break;
      case 'color-converter-pro':
        setInputText('#3B82F6');
        break;
      case 'unix-timestamp-converter':
        setInputText(String(Math.floor(Date.now() / 1000)));
        break;
      case 'base64-encode-decode':
        setInputText('ToolsDabba 🚀 100% Real Working Developer Suite!');
        break;
      case 'fake-credit-card-validator':
        setInputText('4532 0156 7891 2345');
        break;
      default:
        setInputText('');
        break;
    }
  }, [activeTool.id]);

  // Live real calculation
  const result: DevToolExecutionResult = useMemo(() => {
    return executeDevTool(activeTool.id, inputText, options);
  }, [activeTool.id, inputText, options]);

  // Filtered dev tools
  const filteredTools = useMemo(() => {
    return ALL_DEV_PRO_TOOLS.filter(t => {
      const matchCat = activeCategory === 'all' || t.category === activeCategory;
      const matchSearch = searchQuery === '' || 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Copy state
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download state
  const handleDownload = () => {
    let ext = 'txt';
    let mime = 'text/plain';
    if (activeTool.id.includes('json')) { ext = 'json'; mime = 'application/json'; }
    else if (activeTool.id.includes('csv')) { ext = 'csv'; mime = 'text/csv'; }
    else if (activeTool.id.includes('yaml')) { ext = 'yaml'; mime = 'text/yaml'; }
    else if (activeTool.id.includes('xml') || activeTool.id.includes('html')) { ext = 'html'; mime = 'text/html'; }

    const blob = new Blob([result.output], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTool.id}-output.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Switch active tool
  const handleSelectTool = (tool: DevToolItem) => {
    setSelectedToolId(tool.id);
    onRecordUse(tool.id);
  };

  return (
    <div id="dev-tools-suite-overlay" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div id="dev-tools-suite-card" className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-7xl h-[92vh] max-h-[920px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* TOP BAR */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-lg">
              <Code2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">100 Real Working Dev Pro Tools</h2>
                <span className="bg-emerald-400 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                  100% CLIENT-SIDE & REAL
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">JSON, Code, Cryptographic Hashes, Data Converters & Generators</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              id="dev-tools-close-btn"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* MAIN BODY: 2 COLUMN SPLIT */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          
          {/* LEFT SIDEBAR: 100 DEV TOOLS LIST */}
          <div className="w-full lg:w-80 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
            
            {/* Search & Categories */}
            <div className="p-3 border-b border-slate-200 bg-white space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search 100 dev tools (JSON, Base64, Hash, Luhn)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
                {[
                  { id: 'all', label: 'All 100' },
                  { id: 'json-code', label: 'JSON & Code (30)' },
                  { id: 'hash-crypto', label: 'Crypto (15)' },
                  { id: 'converters', label: 'Converters (25)' },
                  { id: 'generators', label: 'Generators (30)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                      activeCategory === cat.id 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Tool Items */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredTools.map(t => {
                const isSelected = t.id === selectedToolId;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTool(t)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-md font-semibold' 
                        : 'hover:bg-slate-200/70 text-slate-700 bg-white border border-slate-200/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="truncate font-bold">{t.name}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {t.category.toUpperCase()} • {t.description}
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT WORKBENCH: INTERACTIVE DEV TOOL INTERFACE */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 flex flex-col space-y-5">
            
            {/* WORKBENCH HEADER */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {activeTool.category.toUpperCase()}
                  </span>
                  {result.statusBadge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      result.statusBadge.type === 'success' ? 'bg-emerald-100 text-emerald-800' :
                      result.statusBadge.type === 'error' ? 'bg-rose-100 text-rose-800' :
                      result.statusBadge.type === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-sky-100 text-sky-800'
                    }`}>
                      {result.statusBadge.label}
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{activeTool.name}</h1>
                <p className="text-xs text-slate-500 mt-0.5">{activeTool.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>

            {/* METADATA BAR (IF AVAILABLE) */}
            {result.metadata && Object.keys(result.metadata).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(result.metadata).map(([k, v]) => (
                  <div key={k} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{k}</div>
                    <div className="text-xs sm:text-sm font-black text-slate-800 mt-0.5 truncate font-mono">{v}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CONTROLS / OPTIONS TOOLBAR */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                Parameters:
              </span>

              {activeTool.id === 'json-formatter' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOptions(o => ({ ...o, space: 2, minify: false }))}
                    className={`px-2.5 py-1 rounded-lg font-bold ${options.space === 2 && !options.minify ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    2 Spaces
                  </button>
                  <button
                    onClick={() => setOptions(o => ({ ...o, space: 4, minify: false }))}
                    className={`px-2.5 py-1 rounded-lg font-bold ${options.space === 4 && !options.minify ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    4 Spaces
                  </button>
                  <button
                    onClick={() => setOptions(o => ({ ...o, minify: true }))}
                    className={`px-2.5 py-1 rounded-lg font-bold ${options.minify ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Minify
                  </button>
                </div>
              )}

              {activeTool.id.includes('base64') || activeTool.id.includes('url-encode') || activeTool.id.includes('html-entity') || activeTool.id.includes('aes') ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOptions(o => ({ ...o, mode: 'encode' }))}
                    className={`px-2.5 py-1 rounded-lg font-bold ${options.mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => setOptions(o => ({ ...o, mode: 'decode' }))}
                    className={`px-2.5 py-1 rounded-lg font-bold ${options.mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Decode
                  </button>
                </div>
              ) : null}

              {activeTool.id === 'luhn-credit-card-gen' && (
                <div className="flex items-center gap-2">
                  {['visa', 'mastercard', 'amex', 'discover', 'rupay'].map(t => (
                    <button
                      key={t}
                      onClick={() => setOptions(o => ({ ...o, cardType: t }))}
                      className={`px-2.5 py-1 rounded-lg font-bold uppercase text-[11px] ${options.cardType === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {t}
                    </button>
                  ))}
                  <button
                    onClick={() => setOptions(o => ({ ...o, _rnd: Math.random() }))}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Re-generate
                  </button>
                </div>
              )}

              {(activeTool.id === 'fake-user-profile-gen' || activeTool.id === 'fake-indian-data-gen' || activeTool.id === 'uuid-v4-generator') && (
                <div className="flex items-center gap-2">
                  <label className="text-slate-500 font-semibold">Count:</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={options.count || 3}
                    onChange={(e) => setOptions(o => ({ ...o, count: Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)) }))}
                    className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center font-mono font-bold"
                  />
                  <button
                    onClick={() => setOptions(o => ({ ...o, _rnd: Math.random() }))}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Refresh
                  </button>
                </div>
              )}

              {activeTool.id === 'password-generator-pro' && (
                <div className="flex items-center gap-3">
                  <label className="text-slate-500 font-semibold">Length: {options.length || 18}</label>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    value={options.length || 18}
                    onChange={(e) => setOptions(o => ({ ...o, length: parseInt(e.target.value, 10) }))}
                    className="w-24 accent-indigo-600 cursor-pointer"
                  />
                  <button
                    onClick={() => setOptions(o => ({ ...o, _rnd: Math.random() }))}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Re-roll
                  </button>
                </div>
              )}
            </div>

            {/* DUAL EDITOR SPLIT: INPUT & OUTPUT DISPLAY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch flex-1">
              
              {/* INPUT PANEL */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                    Input Payload
                  </span>
                  <button
                    onClick={() => setInputText('')}
                    className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold"
                  >
                    Clear
                  </button>
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Paste or type payload for ${activeTool.name}...`}
                  className="flex-1 w-full p-3 font-mono text-xs sm:text-[13px] bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none min-h-[220px]"
                />
              </div>

              {/* OUTPUT PANEL */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl shadow-md border border-slate-800 flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Real Output Result
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded font-mono font-bold transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <pre className="flex-1 w-full p-3 font-mono text-xs sm:text-[13px] bg-slate-950/70 rounded-xl border border-slate-800/80 overflow-auto whitespace-pre-wrap select-all leading-relaxed text-emerald-300 min-h-[220px]">
                  {result.output}
                </pre>
              </div>
            </div>

            {/* FOOTER ADVICE / INSTRUCTIONS */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>100% Client-Side Privacy:</strong> All calculations, JSON formatting, cryptography hashes and generators execute in your browser. Zero server uploads.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
