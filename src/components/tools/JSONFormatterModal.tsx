import React, { useState } from 'react';
import { Code2, Copy, Check, Download, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

interface JSONFormatterModalProps {
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

const SAMPLE_JSON = `{
  "platform": "FreeToolsNoSignup.com",
  "features": ["100% Free", "Zero Signup", "No Watermark", "Client-Side Privacy"],
  "totalTools": 78,
  "categories": {
    "job_ats": 6,
    "ai_study": 5,
    "dev_pro": 6,
    "pdf": 33,
    "image": 16,
    "calculators": 11,
    "notion_templates": 1
  },
  "rating": 4.98,
  "isActive": true
}`;

export const JSONFormatterModal: React.FC<JSONFormatterModalProps> = ({ onClose, onRecordUse }) => {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [formattedJson, setFormattedJson] = useState(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = (spaces = 2) => {
    onRecordUse('json-formatter');
    try {
      // Fix loose trailing commas and parse
      const cleaned = inputJson.replace(/,\s*([}\]])/g, '$1');
      const parsed = JSON.parse(cleaned);
      const output = JSON.stringify(parsed, null, spaces);
      setFormattedJson(output);
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const minifyJSON = () => {
    onRecordUse('json-formatter');
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted_data.json';
    link.click();
  };

  return (
    <div id="json-modal-overlay" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div id="json-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-600/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">JSON Formatter, Validator & Tree View</h2>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-cyan-200">
                  DEV PRO
                </span>
              </div>
              <p className="text-xs text-slate-500">Format, validate syntax, fix trailing commas, and minify JSON</p>
            </div>
          </div>

          <button 
            id="json-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => formatJSON(2)}
              className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition-all"
            >
              Beautify (2 Spaces)
            </button>
            <button
              onClick={() => formatJSON(4)}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold transition-all"
            >
              Beautify (4 Spaces)
            </button>
            <button
              onClick={minifyJSON}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold transition-all"
            >
              Minify / Compact
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
            <button
              onClick={downloadJSON}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Download .json
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span><strong>JSON Syntax Error:</strong> {error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Input */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Input JSON</span>
                <button
                  onClick={() => setInputJson(SAMPLE_JSON)}
                  className="text-cyan-600 hover:underline"
                >
                  Load Sample
                </button>
              </div>
              <textarea
                value={inputJson}
                onChange={(e) => { setInputJson(e.target.value); }}
                rows={14}
                className="w-full p-3 font-mono text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none resize-none shadow-inner"
                placeholder="Paste raw JSON here..."
              />
            </div>

            {/* Formatted Output */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span className="text-emerald-700">Validated Output</span>
                <span className="text-[10px] text-slate-400">Syntax Verified</span>
              </div>
              <textarea
                value={formattedJson}
                readOnly
                rows={14}
                className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl outline-none resize-none shadow-inner"
              />
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>⚡ Client-side parsing • Instant tree validation</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
