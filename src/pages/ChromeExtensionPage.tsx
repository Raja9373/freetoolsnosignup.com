import React, { useState } from 'react';
import { 
  Chrome, Download, ArrowLeft, CheckCircle2, Copy, Check, Sparkles, 
  Search, ShieldCheck, Zap, Laptop, ExternalLink 
} from 'lucide-react';
import JSZip from 'jszip';
import download from 'downloadjs';
import { BrandLogo } from '../components/BrandLogo';
import { TOTAL_TOOLS_COUNT } from '../data/toolCounts';

interface ChromeExtensionPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const ChromeExtensionPage: React.FC<ChromeExtensionPageProps> = ({
  onNavigateHome,
  onNavigateTo,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const manifestCode = `{
  "manifest_version": 3,
  "name": "2753 Free Tools No Signup",
  "version": "1.0.0",
  "description": "Instant offline search across 2,753 free browser-native tools with zero signup.",
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  "permissions": ["storage"],
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  }
}`;

  const popupHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { width: 380px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 16px; background: #0A1931; color: white; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .title { font-size: 14px; font-weight: bold; color: #C5A059; }
    .badge { font-size: 10px; background: #C5A059; color: #0A1931; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
    input { width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px; border: 1px solid #C5A059; background: #142646; color: white; outline: none; font-size: 13px; }
    .list { margin-top: 12px; max-height: 280px; overflow-y: auto; }
    .item { padding: 8px 10px; border-radius: 6px; background: #142646; margin-bottom: 6px; cursor: pointer; transition: background 0.2s; border: 1px solid rgba(197, 160, 89, 0.2); }
    .item:hover { background: #1E3A5F; border-color: #C5A059; }
    .item-name { font-size: 12px; font-weight: 600; color: #FFFFFF; }
    .item-cat { font-size: 10px; color: #94A3B8; }
    .footer { margin-top: 12px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; }
    .footer a { color: #C5A059; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <span class="title">2753 Free Tools</span>
    <span class="badge">No Signup</span>
  </div>
  <input type="text" id="search" placeholder="Search 2,753 tools (PDF, ATS, JSON, Notion)..." autofocus>
  <div class="list" id="results"></div>
  <div class="footer">
    <a href="https://www.freetoolsnosignup.com/" target="_blank">Open FreeToolsNoSignup.com &rarr;</a>
  </div>
  <script src="popup.js"></script>
</body>
</html>`;

  const popupJs = `const POPULAR = [
  { name: "PDF Merge & Combine Pro", url: "https://www.freetoolsnosignup.com/tools/pdf-merge", cat: "PDF" },
  { name: "PDF Split & Extract", url: "https://www.freetoolsnosignup.com/tools/pdf-split", cat: "PDF" },
  { name: "PDF Compressor & Optimizer", url: "https://www.freetoolsnosignup.com/tools/pdf-compress", cat: "PDF" },
  { name: "ATS Resume Scanner", url: "https://www.freetoolsnosignup.com/tools/ats-resume-scanner", cat: "Career" },
  { name: "Custom Notion Template Builder", url: "https://www.freetoolsnosignup.com/tools/custom-notion-template-database-builder", cat: "Notion" },
  { name: "Background Remover", url: "https://www.freetoolsnosignup.com/tools/bg-remover", cat: "Image" },
  { name: "JSON Formatter & Tree", url: "https://www.freetoolsnosignup.com/tools/json-formatter", cat: "Dev" },
  { name: "QR Code Generator", url: "https://www.freetoolsnosignup.com/tools/qr-generator", cat: "Dev" },
  { name: "Fake Data & Luhn Cards", url: "https://www.freetoolsnosignup.com/tools/fake-data-generator", cat: "Dev" }
];

function render(items) {
  const container = document.getElementById('results');
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:12px;font-size:12px;color:#94A3B8;">No tools found. <a href="https://www.freetoolsnosignup.com/" target="_blank" style="color:#C5A059">Search on website</a></div>';
    return;
  }
  items.forEach(t => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = '<div class="item-name">' + t.name + '</div><div class="item-cat">' + t.cat + ' • Free No Login</div>';
    div.onclick = () => chrome.tabs.create({ url: t.url });
    container.appendChild(div);
  });
}

document.getElementById('search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) {
    render(POPULAR);
    return;
  }
  const filtered = POPULAR.filter(t => t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q));
  render(filtered);
});

render(POPULAR);
`;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleDownloadZip = async () => {
    setIsGenerating(true);
    try {
      const zip = new JSZip();
      zip.file('manifest.json', manifestCode);
      zip.file('popup.html', popupHtml);
      zip.file('popup.js', popupJs);
      zip.file('README.txt', `2753 Free Tools No Signup - Chrome Extension (Manifest v3)
Installation Guide:
1. Open Google Chrome and type chrome://extensions/ in the address bar.
2. Turn ON the "Developer mode" toggle in the top right corner.
3. Click "Load unpacked" button in the top left.
4. Select this extracted folder.
5. Done! Click the puzzle icon in Chrome toolbar to pin 2753 Free Tools.`);

      // Generate zip blob
      const content = await zip.generateAsync({ type: 'blob' });
      download(content, '2753-tools-chrome-extension.zip', 'application/zip');
    } catch (err) {
      console.error('Failed to generate extension zip:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1931] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 text-xs font-bold text-[#0A1931] hover:text-[#C5A059] bg-[#F1F5F9] hover:bg-[#E2E8F0] px-3 py-1.5 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {TOTAL_TOOLS_COUNT} Tools</span>
            </button>
            <BrandLogo variant="header" onClick={onNavigateHome} />
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1931] hover:bg-[#142646] text-[#C5A059] border border-[#C5A059]/40 font-bold text-xs shadow-sm transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Packaging ZIP...' : 'Download Extension (.zip)'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {/* Hero */}
        <div className="bg-[#0A1931] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <Chrome className="w-5 h-5" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5A059] text-[#0A1931]">
              Chrome Extension • Manifest V3
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            2,753 Free Tools Extension for Google Chrome &amp; Brave
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Search, launch, and use PDF editors, ATS resume scanners, QR generators, and Notion template builders instantly with a 1-click popup right from your Chrome toolbar. 100% free, no login, zero tracking.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleDownloadZip}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4B06A] text-[#0A1931] font-bold text-sm shadow-md transition hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Packaging ZIP...' : 'Download Chrome Extension (.zip)'}</span>
            </button>
            <a
              href="#installation-steps"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition"
            >
              <Laptop className="w-4 h-4" />
              <span>Installation Guide</span>
            </a>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#0A1931] flex items-center justify-center text-[#C5A059]">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0A1931]">Instant 0ms Search</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Fuzzy search across 2,753 utilities without opening new tabs. Launch any tool directly in your browser.
            </p>
          </div>
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#0A1931] flex items-center justify-center text-[#C5A059]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0A1931]">Zero Permissions Required</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Does not read your browsing history, tabs, or cookies. Only uses Chrome storage for quick bookmarking.
            </p>
          </div>
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#0A1931] flex items-center justify-center text-[#C5A059]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0A1931]">Manifest V3 Compliant</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Built adhering strictly to the latest Google Chrome Web Store Manifest V3 guidelines for high performance.
            </p>
          </div>
        </div>

        {/* 4-Step Installation Guide */}
        <div id="installation-steps" className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0A1931]">
              How to Install in 30 Seconds (Developer Mode)
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Follow these simple steps to load the extension in Chrome, Edge, Brave, or Opera:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#0A1931] text-[#C5A059] flex items-center justify-center font-bold text-xs">1</span>
              <h4 className="font-bold text-[#0A1931] text-sm">Download &amp; Extract</h4>
              <p className="text-[#64748B]">
                Click the "Download Chrome Extension (.zip)" button above and unzip the contents to a folder on your computer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#0A1931] text-[#C5A059] flex items-center justify-center font-bold text-xs">2</span>
              <h4 className="font-bold text-[#0A1931] text-sm">Open Chrome Extensions</h4>
              <p className="text-[#64748B]">
                Navigate to <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">chrome://extensions</code> in your browser address bar.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#0A1931] text-[#C5A059] flex items-center justify-center font-bold text-xs">3</span>
              <h4 className="font-bold text-[#0A1931] text-sm">Enable Developer Mode</h4>
              <p className="text-[#64748B]">
                Toggle the <strong>Developer mode</strong> switch located in the top-right corner of the Extensions page.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#0A1931] text-[#C5A059] flex items-center justify-center font-bold text-xs">4</span>
              <h4 className="font-bold text-[#0A1931] text-sm">Click "Load Unpacked"</h4>
              <p className="text-[#64748B]">
                Click the <strong>Load unpacked</strong> button in the top-left and select the extracted folder. Pin the icon to your toolbar!
              </p>
            </div>
          </div>
        </div>

        {/* Source Code Inspector */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-[#0A1931]">
              Manifest V3 Source Code (Open Source &amp; Auditable)
            </h3>
            <button
              onClick={() => handleCopy(manifestCode, 'manifest')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#E2E8F0] text-xs font-semibold text-[#0A1931] border border-[#E2E8F0] transition"
            >
              {copiedCode === 'manifest' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'manifest' ? 'Copied!' : 'Copy manifest.json'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-[#0A1931] text-slate-200 text-xs font-mono overflow-x-auto border border-[#C5A059]/20">
            {manifestCode}
          </pre>
        </div>
      </main>
    </div>
  );
};
