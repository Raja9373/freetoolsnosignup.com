import React from 'react';
import { 
  FileText, Image as ImageIcon, Calculator, Sparkles, 
  Briefcase, Code2, ArrowRight, Flame, CheckCircle2, 
  Zap, Star
} from 'lucide-react';
import { ToolCategory } from '../types';

interface DabbaGridProps {
  onOpenCategory: (category: ToolCategory) => void;
  onOpenTool: (toolId: string) => void;
}

export const DabbaGrid: React.FC<DabbaGridProps> = ({ onOpenCategory, onOpenTool }) => {
  return (
    <div id="six-dabba-grid" className="w-full space-y-5">
      
      {/* Grid: 2 rows x 3 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* ROW 1 - DABBA 1: PDF TOOLS */}
        <div 
          id="dabba-pdf"
          className="bg-white border-2 border-blue-500/30 hover:border-blue-500 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 text-2xl group-hover:scale-105 transition-transform">
                📄
              </div>
              <span className="bg-blue-50 text-blue-700 text-xs font-black px-2.5 py-1 rounded-full border border-blue-200">
                54 WORKING
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              PDF Tools Suite
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Merge, split, compress, and convert documents locally with zero watermark.
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-3">
              <li 
                onClick={() => onOpenTool('pdf-merge')}
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-blue-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF Merge & Combine Pro
                </span>
                <span className="text-[10px] text-blue-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-split')}
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-blue-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF Page Splitter
                </span>
                <span className="text-[10px] text-blue-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-compress')}
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-blue-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF Compressor & Optimizer
                </span>
                <span className="text-[10px] text-blue-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-to-word')}
                className="text-xs font-semibold text-slate-700 hover:text-blue-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-blue-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF to Word Text Extractor
                </span>
                <span className="text-[10px] text-blue-600 font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('pdf')}
            className="mt-5 w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            Explore 54 PDF Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 1 - DABBA 2: IMAGE TOOLS */}
        <div 
          id="dabba-image"
          className="bg-white border-2 border-emerald-500/30 hover:border-emerald-500 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 text-2xl group-hover:scale-105 transition-transform">
                🖼️
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-2.5 py-1 rounded-full border border-emerald-200">
                40 WORKING
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Image & Media Tools
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Lossless compression, instant background removal, format conversions.
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-3">
              <li 
                onClick={() => onOpenTool('image-compressor')}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-emerald-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Lossless Image Compressor
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('bg-remover')}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-emerald-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Background Remover
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('image-resizer')}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-emerald-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Bulk Image Resizer
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('image-converter')}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-emerald-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  WebP / PNG / JPG Converter
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('image')}
            className="mt-5 w-full py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            Explore 40 Image Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 1 - DABBA 3: CALCULATORS */}
        <div 
          id="dabba-calculators"
          className="bg-white border-2 border-purple-500/30 hover:border-purple-500 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20 text-2xl group-hover:scale-105 transition-transform">
                🧮
              </div>
              <span className="bg-purple-50 text-purple-700 text-xs font-black px-2.5 py-1 rounded-full border border-purple-200">
                201 WORKING
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
              Calculators & Formulas
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Loan EMI, mortgages, compound SIP growth, fitness BMI, and tax estimates.
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-3">
              <li 
                onClick={() => onOpenTool('emi-calculator')}
                className="text-xs font-semibold text-slate-700 hover:text-purple-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-purple-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Loan & Home EMI Calculator
                </span>
                <span className="text-[10px] text-purple-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('compound-interest-calc')}
                className="text-xs font-semibold text-slate-700 hover:text-purple-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-purple-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Compound Interest & SIP
                </span>
                <span className="text-[10px] text-purple-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('bmi-calculator')}
                className="text-xs font-semibold text-slate-700 hover:text-purple-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-purple-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  BMI & Body Fat Calculator
                </span>
                <span className="text-[10px] text-purple-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('salary-takehome-calc')}
                className="text-xs font-semibold text-slate-700 hover:text-purple-600 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-purple-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Salary Take-Home & Tax
                </span>
                <span className="text-[10px] text-purple-600 font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('calculator')}
            className="mt-5 w-full py-2.5 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            Explore 201 Calculators <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 4: AI STUDY TOOLS (YELLOW GRADIENT + NEW PULSING) */}
        <div 
          id="dabba-ai-study"
          className="bg-white border-2 border-amber-400 hover:border-amber-500 rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 text-2xl group-hover:scale-105 transition-transform font-bold">
                🎓
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span className="bg-amber-100 text-amber-950 text-xs font-black px-2.5 py-1 rounded-full border border-amber-300">
                  50 WORKING • NEW
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
              <span>AI Study & Writing Tools</span>
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              AI detector, 1-click humanizer, academic paraphrasing, citation tools.
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-3">
              <li 
                onClick={() => onOpenTool('ai-detector')}
                className="text-xs font-semibold text-slate-700 hover:text-amber-800 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-amber-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  AI Content Detector & Humanizer
                </span>
                <span className="text-[10px] text-amber-700 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('essay-paraphraser')}
                className="text-xs font-semibold text-slate-700 hover:text-amber-800 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-amber-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Academic Paraphraser Pro
                </span>
                <span className="text-[10px] text-amber-700 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('plagiarism-remover')}
                className="text-xs font-semibold text-slate-700 hover:text-amber-800 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-amber-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Plagiarism Checker & Cleaner
                </span>
                <span className="text-[10px] text-amber-700 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('citation-generator')}
                className="text-xs font-semibold text-slate-700 hover:text-amber-800 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-amber-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  APA / MLA Citation Generator
                </span>
                <span className="text-[10px] text-amber-700 font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('ai-study')}
            className="mt-5 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            Explore 50 AI Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 5: JOB / ATS TOOLS (BIGGEST HERO CARD, YELLOW BG #fefce8) */}
        <div 
          id="dabba-job-ats-hero"
          className="bg-[#fefce8] border-2 border-yellow-400 hover:border-yellow-500 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ring-2 ring-amber-400/30"
        >
          <div className="absolute top-0 right-0 w-44 h-44 bg-yellow-300/20 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 text-2xl group-hover:scale-105 transition-transform font-bold">
                💼
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-slate-950" /> 50 WORKING • HOT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-900 transition-colors">
                Job & ATS Tools
              </h3>
              <span className="bg-amber-200/80 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                #1 MONEY MAKER
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 mb-4">
              ATS resume score diagnostic, keyword match against JDs, 1-click auto-fixer, and cover letter writer.
            </p>

            <ul className="space-y-2 border-t border-yellow-200/80 pt-3">
              <li 
                onClick={() => onOpenTool('ats-checker')}
                className="text-xs font-bold text-slate-900 hover:text-amber-900 cursor-pointer flex items-center justify-between p-1.5 rounded-lg bg-white/80 hover:bg-white border border-yellow-200 shadow-2xs transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  ATS Score Checker & Auto-Fixer
                </span>
                <span className="text-[11px] text-amber-800 font-extrabold bg-amber-100 px-2 py-0.5 rounded">
                  Open Tool ⚡
                </span>
              </li>
              <li 
                onClick={() => onOpenTool('resume-builder')}
                className="text-xs font-semibold text-slate-800 hover:text-amber-900 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-yellow-100/60 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Instant Resume Builder (No Watermark)
                </span>
                <span className="text-[10px] text-amber-800 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('cover-letter-gen')}
                className="text-xs font-semibold text-slate-800 hover:text-amber-900 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-yellow-100/60 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Tailored Cover Letter Generator
                </span>
                <span className="text-[10px] text-amber-800 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('salary-negotiator')}
                className="text-xs font-semibold text-slate-800 hover:text-amber-900 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-yellow-100/60 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Salary Negotiation Script Generator
                </span>
                <span className="text-[10px] text-amber-800 font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('job-ats')}
            className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            Explore All 50 Career Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 6: DEV PRO TOOLS */}
        <div 
          id="dabba-dev-pro"
          className="bg-white border-2 border-cyan-500/30 hover:border-cyan-500 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-600/20 text-2xl group-hover:scale-105 transition-transform">
                💻
              </div>
              <span className="bg-cyan-50 text-cyan-800 text-xs font-black px-2.5 py-1 rounded-full border border-cyan-200">
                100 WORKING • NEW
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
              Dev Pro & Testing Suite
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Synthetic test data, Luhn cards, custom QR codes, JSON trees & regex testing.
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-3">
              <li 
                onClick={() => onOpenTool('fake-data-generator')}
                className="text-xs font-semibold text-slate-700 hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-cyan-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  Fake Data & Luhn Card Generator
                </span>
                <span className="text-[10px] text-cyan-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('json-formatter')}
                className="text-xs font-semibold text-slate-700 hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-cyan-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  JSON Formatter & Tree Validator
                </span>
                <span className="text-[10px] text-cyan-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('qr-generator')}
                className="text-xs font-semibold text-slate-700 hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-cyan-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Custom QR Code Studio
                </span>
                <span className="text-[10px] text-cyan-600 font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('regex-tester')}
                className="text-xs font-semibold text-slate-700 hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1 rounded hover:bg-cyan-50/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Regex Matcher & Cheatsheet
                </span>
                <span className="text-[10px] text-cyan-600 font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('dev-pro')}
            className="mt-5 w-full py-2.5 bg-cyan-50 hover:bg-cyan-600 text-cyan-800 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            Explore 100 Dev Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
