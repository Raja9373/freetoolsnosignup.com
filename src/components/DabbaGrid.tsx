import React from 'react';
import { 
  FileText, Image as ImageIcon, Calculator, Sparkles, 
  Briefcase, Code2, ArrowRight, Flame, CheckCircle2, 
  Zap, Star, Database
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
          className="bg-white border border-[#E2E8F0] hover:border-[#126BFF] rounded-2xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#126BFF]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#126BFF] text-white flex items-center justify-center shadow-md shadow-[#126BFF]/20 text-2xl group-hover:scale-105 transition-transform">
                📄
              </div>
              <span className="bg-[#EBF3FF] text-[#126BFF] text-xs font-black px-2.5 py-1 rounded-full border border-[#C8DDFF]">
                54 WORKING
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#126BFF] transition-colors">
              PDF Tools Suite
            </h3>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              Merge, split, compress, and convert documents locally with zero watermark.
            </p>

            <ul className="space-y-1.5 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('pdf-merge')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF Merge & Combine Pro
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-split')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF Page Splitter
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-compress')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF Compressor & Optimizer
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-to-word')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  PDF to Word Text Extractor
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('pdf')}
            className="mt-5 w-full py-2.5 bg-[#F4F7FC] hover:bg-[#126BFF] text-[#071A3D] hover:text-white border border-[#E2E8F0] hover:border-[#126BFF] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore 54 PDF Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 1 - DABBA 2: IMAGE TOOLS */}
        <div 
          id="dabba-image"
          className="bg-white border border-[#E2E8F0] hover:border-[#126BFF] rounded-2xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
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

            <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-emerald-600 transition-colors">
              Image & Media Tools
            </h3>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              Lossless compression, instant background removal, format conversions.
            </p>

            <ul className="space-y-1.5 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('image-compressor')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-emerald-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Lossless Image Compressor
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('bg-remover')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-emerald-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Background Remover
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('image-resizer')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-emerald-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Bulk Image Resizer
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('image-converter')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-emerald-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  WebP / PNG / JPG Converter
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('image')}
            className="mt-5 w-full py-2.5 bg-[#F4F7FC] hover:bg-emerald-600 text-[#071A3D] hover:text-white border border-[#E2E8F0] hover:border-emerald-600 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore 40 Image Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 1 - DABBA 3: CALCULATORS */}
        <div 
          id="dabba-calculators"
          className="bg-white border border-[#E2E8F0] hover:border-[#126BFF] rounded-2xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
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

            <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-purple-600 transition-colors">
              Calculators & Formulas
            </h3>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              Loan EMI, mortgages, compound SIP growth, fitness BMI, and tax estimates.
            </p>

            <ul className="space-y-1.5 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('emi-calculator')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-purple-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Loan & Home EMI Calculator
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('compound-interest-calc')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-purple-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Compound Interest & SIP
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('bmi-calculator')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-purple-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  BMI & Body Fat Calculator
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('salary-takehome-calc')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-purple-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Salary Take-Home & Tax
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('calculator')}
            className="mt-5 w-full py-2.5 bg-[#F4F7FC] hover:bg-purple-600 text-[#071A3D] hover:text-white border border-[#E2E8F0] hover:border-purple-600 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore 201 Calculators <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 4: AI STUDY TOOLS */}
        <div 
          id="dabba-ai-study"
          className="bg-white border border-[#CBD5E1] hover:border-[#126BFF] rounded-2xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF7A00]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#071A3D] text-white flex items-center justify-center shadow-md shadow-[#071A3D]/20 text-2xl group-hover:scale-105 transition-transform font-bold">
                🎓
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-[#FFF4EB] text-[#FF7A00] text-xs font-black px-2.5 py-1 rounded-full border border-[#FFD4B2]">
                  50 WORKING • NEW
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#126BFF] transition-colors flex items-center gap-2">
              <span>AI Study & Writing Tools</span>
              <Flame className="w-4 h-4 fill-[#FF7A00] text-[#FF7A00]" />
            </h3>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              AI detector, 1-click humanizer, academic paraphrasing, citation tools.
            </p>

            <ul className="space-y-1.5 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('ai-detector')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
                  AI Content Detector & Humanizer
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('essay-paraphraser')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Academic Paraphraser Pro
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('plagiarism-remover')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Plagiarism Checker & Cleaner
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('citation-generator')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  APA / MLA Citation Generator
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('ai-study')}
            className="mt-5 w-full py-2.5 bg-[#EBF3FF] hover:bg-[#126BFF] text-[#126BFF] hover:text-white border border-[#C8DDFF] hover:border-[#126BFF] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore 50 AI Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 5: JOB / ATS TOOLS (FEATURED HERO CARD) */}
        <div 
          id="dabba-job-ats-hero"
          className="bg-white border-2 border-[#126BFF] rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ring-4 ring-[#126BFF]/10"
        >
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#126BFF]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#071A3D] text-white flex items-center justify-center shadow-lg shadow-[#071A3D]/25 text-2xl group-hover:scale-105 transition-transform font-bold">
                💼
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-[#FF7A00] text-white text-xs font-black px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" /> 50 WORKING • HOT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-[#0B1F3A] group-hover:text-[#126BFF] transition-colors">
                Job & ATS Tools
              </h3>
              <span className="bg-[#EBF3FF] text-[#126BFF] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#C8DDFF]">
                PRO SUITE
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              ATS resume score diagnostic, keyword match against JDs, 1-click auto-fixer, and cover letter writer.
            </p>

            <ul className="space-y-1.5 border-t border-[#E2E8F0] pt-3">
              <li 
                onClick={() => onOpenTool('ats-checker')}
                className="text-xs font-bold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-2 rounded-xl bg-[#F4F7FC] hover:bg-[#EBF3FF] border border-[#E2E8F0] shadow-2xs transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  ATS Score Checker & Auto-Fixer
                </span>
                <span className="text-[11px] text-white font-extrabold bg-[#FF7A00] hover:bg-[#E66A00] px-2.5 py-0.5 rounded-lg shadow-xs">
                  Open Tool ⚡
                </span>
              </li>
              <li 
                onClick={() => onOpenTool('resume-builder')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Instant Resume Builder (No Watermark)
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('cover-letter-gen')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Tailored Cover Letter Generator
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('salary-negotiator')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-[#126BFF] cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Salary Negotiation Script Generator
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('job-ats')}
            className="mt-5 w-full py-2.5 bg-[#071A3D] hover:bg-[#126BFF] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            Explore All 50 Career Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 6: DEV PRO TOOLS */}
        <div 
          id="dabba-dev-pro"
          className="bg-white border border-[#E2E8F0] hover:border-[#126BFF] rounded-2xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
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

            <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-cyan-700 transition-colors">
              Dev Pro & Testing Suite
            </h3>
            <p className="text-xs text-[#64748B] mt-1 mb-4">
              Synthetic test data, Luhn cards, custom QR codes, JSON trees & regex testing.
            </p>

            <ul className="space-y-1.5 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('fake-data-generator')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  Fake Data & Luhn Card Generator
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('json-formatter')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  JSON Formatter & Tree Validator
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('qr-generator')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Custom QR Code Studio
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('regex-tester')}
                className="text-xs font-semibold text-[#0B1F3A] hover:text-cyan-700 cursor-pointer flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F8FAFD] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Regex Matcher & Cheatsheet
                </span>
                <span className="text-[11px] text-[#FF7A00] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('dev-pro')}
            className="mt-5 w-full py-2.5 bg-[#F4F7FC] hover:bg-cyan-600 text-[#071A3D] hover:text-white border border-[#E2E8F0] hover:border-cyan-600 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore 100 Dev Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 3 / DABBA 7: NOTION TEMPLATE BUILDER & PRESETS */}
        <div 
          id="dabba-notion"
          className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#071A3D] via-[#0B1F3A] to-[#040E24] border border-[#126BFF]/40 hover:border-[#19A7FF] rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-200 text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#126BFF]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            
            {/* Left side: Info & Badge */}
            <div className="space-y-3.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#071A3D] font-black text-2xl flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 transition-transform">
                  N
                </div>
                <span className="bg-[#FF7A00] text-white text-xs font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  DABBA #7 • BUILD YOUR OWN + 25 PRESETS
                </span>
                <span className="bg-[#126BFF]/20 text-[#19A7FF] text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-[#126BFF]/40">
                  18 Properties • 100% Free
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#19A7FF] transition-colors flex items-center gap-2">
                  <span>Custom Notion Template & Database Builder</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                  Design custom Notion databases with Title, Multi-select, Status, Date, Rating, Progress & 18 column types. Interactive live table preview, instant dummy data, and 1-click CSV download ready to import into Notion.
                </p>
              </div>

              {/* Popular Presets Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-bold">25 Presets:</span>
                <button 
                  onClick={() => onOpenTool('preset-content-calendar')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#FF7A00] hover:text-white font-bold text-slate-200 transition-colors border border-white/10"
                >
                  📅 Content Calendar
                </button>
                <button 
                  onClick={() => onOpenTool('preset-product-roadmap')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#FF7A00] hover:text-white font-bold text-slate-200 transition-colors border border-white/10"
                >
                  🚀 Product Roadmap
                </button>
                <button 
                  onClick={() => onOpenTool('preset-habit-tracker')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#FF7A00] hover:text-white font-bold text-slate-200 transition-colors border border-white/10"
                >
                  ⚡ Habit Tracker
                </button>
                <button 
                  onClick={() => onOpenTool('preset-job-crm')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#FF7A00] hover:text-white font-bold text-slate-200 transition-colors border border-white/10"
                >
                  💼 Job CRM
                </button>
                <button 
                  onClick={() => onOpenTool('preset-finance-budget')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#FF7A00] hover:text-white font-bold text-slate-200 transition-colors border border-white/10"
                >
                  💰 Budget Log
                </button>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-64 shrink-0">
              <button
                onClick={() => onOpenTool('notion-template-builder')}
                className="w-full py-3.5 px-4 btn-brand-orange rounded-2xl text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Launch Custom Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenCategory('notion')}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-white/20 transition-colors"
              >
                <span>View All 25 Presets</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
