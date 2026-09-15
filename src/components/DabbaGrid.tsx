import React from 'react';
import { 
  FileText, Image as ImageIcon, Calculator, Sparkles, 
  Briefcase, Code2, ArrowRight, Flame, CheckCircle2, 
  Zap, Star, Database
} from 'lucide-react';
import { ToolCategory } from '../types';
import { 
  PDF_TOOLS_COUNT, 
  IMAGE_TOOLS_COUNT, 
  CALCULATOR_TOOLS_COUNT, 
  JOB_ATS_TOOLS_COUNT, 
  AI_STUDY_TOOLS_COUNT, 
  DEV_PRO_TOOLS_COUNT, 
  NOTION_TOOLS_COUNT,
  TOTAL_TOOLS_COUNT
} from '../data/toolCounts';

interface DabbaGridProps {
  onOpenCategory: (category: ToolCategory) => void;
  onOpenTool: (toolId: string) => void;
  onNavigateTo?: (path: string) => void;
}

export const DabbaGrid: React.FC<DabbaGridProps> = ({ onOpenCategory, onOpenTool, onNavigateTo }) => {
  return (
    <div id="six-dabba-grid" className="w-full space-y-6">
      
      {/* Grid: 2 rows x 3 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* ROW 1 - DABBA 1: PDF TOOLS */}
        <div 
          id="dabba-pdf"
          className="bg-white border border-[#E2E8F0] hover:border-[#0A1931] rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A1931]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1931] text-white flex items-center justify-center shadow-sm text-2xl group-hover:scale-105 transition-transform">
                📄
              </div>
              <span className="bg-[#F8FAFC] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full border border-[#E2E8F0] font-mono">
                {PDF_TOOLS_COUNT} WORKING
              </span>
            </div>

            <h3 className="font-serif-royal text-2xl font-semibold text-[#0A1931] group-hover:text-[#C5A059] transition-colors">
              PDF Studio
            </h3>
            <p className="text-xs text-[#475569] mt-1.5 mb-4 leading-relaxed">
              Merge, split, compress, and convert documents locally with zero watermark.
            </p>

            <ul className="space-y-2 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('pdf-merge')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  PDF Merge & Combine Pro
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-split')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  PDF Page Splitter
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-compress')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  PDF Compressor & Optimizer
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('pdf-to-word')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  PDF to Word Text Extractor
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('pdf')}
            className="mt-5 w-full py-2.5 bg-[#F8FAFC] hover:bg-[#0A1931] text-[#0A1931] hover:text-white border border-[#E2E8F0] hover:border-[#0A1931] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore {PDF_TOOLS_COUNT} PDF Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 1 - DABBA 2: IMAGE TOOLS */}
        <div 
          id="dabba-image"
          className="bg-white border border-[#E2E8F0] hover:border-[#0A1931] rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A1931]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1931] text-white flex items-center justify-center shadow-sm text-2xl group-hover:scale-105 transition-transform">
                🖼️
              </div>
              <span className="bg-[#F8FAFC] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full border border-[#E2E8F0] font-mono">
                {IMAGE_TOOLS_COUNT} WORKING
              </span>
            </div>

            <h3 className="font-serif-royal text-2xl font-semibold text-[#0A1931] group-hover:text-[#C5A059] transition-colors">
              Image & Media Studio
            </h3>
            <p className="text-xs text-[#475569] mt-1.5 mb-4 leading-relaxed">
              Lossless compression, instant background removal, format conversions.
            </p>

            <ul className="space-y-2 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('image-compressor')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Lossless Image Compressor
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('bg-remover')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Background Remover
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('image-resizer')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Bulk Image Resizer
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('image-converter')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  WebP / PNG / JPG Converter
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('image')}
            className="mt-5 w-full py-2.5 bg-[#F8FAFC] hover:bg-[#0A1931] text-[#0A1931] hover:text-white border border-[#E2E8F0] hover:border-[#0A1931] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore {IMAGE_TOOLS_COUNT} Image Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 1 - DABBA 3: CALCULATORS */}
        <div 
          id="dabba-calculators"
          className="bg-white border border-[#E2E8F0] hover:border-[#0A1931] rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A1931]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1931] text-white flex items-center justify-center shadow-sm text-2xl group-hover:scale-105 transition-transform">
                🧮
              </div>
              <span className="bg-[#F8FAFC] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full border border-[#E2E8F0] font-mono">
                {CALCULATOR_TOOLS_COUNT} WORKING
              </span>
            </div>

            <h3 className="font-serif-royal text-2xl font-semibold text-[#0A1931] group-hover:text-[#C5A059] transition-colors">
              Calculators & Math
            </h3>
            <p className="text-xs text-[#475569] mt-1.5 mb-4 leading-relaxed">
              Loan EMI, mortgages, compound SIP growth, fitness BMI, and tax estimates.
            </p>

            <ul className="space-y-2 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('emi-calculator')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Loan & Home EMI Calculator
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('compound-interest-calc')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Compound Interest & SIP
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('bmi-calculator')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  BMI & Body Fat Calculator
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('salary-takehome-calc')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Salary Take-Home & Tax
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('calculator')}
            className="mt-5 w-full py-2.5 bg-[#F8FAFC] hover:bg-[#0A1931] text-[#0A1931] hover:text-white border border-[#E2E8F0] hover:border-[#0A1931] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore {CALCULATOR_TOOLS_COUNT} Calculators <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 4: AI STUDY TOOLS */}
        <div 
          id="dabba-ai-study"
          className="bg-white border border-[#E2E8F0] hover:border-[#0A1931] rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#0A1931]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1931] text-white flex items-center justify-center shadow-sm text-2xl group-hover:scale-105 transition-transform">
                🎓
              </div>
              <span className="bg-[#F7F3EB] text-[#8C6B28] text-xs font-bold px-3 py-1 rounded-full border border-[#E8DCBE] font-mono">
                {AI_STUDY_TOOLS_COUNT} WORKING
              </span>
            </div>

            <h3 className="font-serif-royal text-2xl font-semibold text-[#0A1931] group-hover:text-[#C5A059] transition-colors">
              AI Study & Writing
            </h3>
            <p className="text-xs text-[#475569] mt-1.5 mb-4 leading-relaxed">
              AI detector, 1-click humanizer, academic paraphrasing, citation tools.
            </p>

            <ul className="space-y-2 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('ai-detector')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  AI Content Detector & Humanizer
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('essay-paraphraser')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Academic Paraphraser Pro
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('plagiarism-remover')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Plagiarism Checker & Cleaner
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('citation-generator')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  APA / MLA Citation Generator
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('ai-study')}
            className="mt-5 w-full py-2.5 bg-[#F8FAFC] hover:bg-[#0A1931] text-[#0A1931] hover:text-white border border-[#E2E8F0] hover:border-[#0A1931] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore {AI_STUDY_TOOLS_COUNT} AI Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 5: JOB / ATS TOOLS (FEATURED ROYAL CARD) */}
        <div 
          id="dabba-job-ats-hero"
          className="bg-white border-2 border-[#C5A059] rounded-3xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#C5A059]/10 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1931] text-[#C5A059] flex items-center justify-center shadow-sm text-2xl group-hover:scale-105 transition-transform">
                💼
              </div>
              <span className="bg-[#F7F3EB] text-[#8C6B28] text-xs font-bold px-3 py-1 rounded-full border border-[#E8DCBE] font-mono">
                {JOB_ATS_TOOLS_COUNT} WORKING • HOT
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="font-serif-royal text-2xl font-semibold text-[#0A1931] group-hover:text-[#C5A059] transition-colors">
                Career & ATS Suite
              </h3>
            </div>
            <p className="text-xs text-[#475569] mt-1.5 mb-4 leading-relaxed">
              ATS resume score diagnostic, keyword match against JDs, 1-click auto-fixer, and cover letter writer.
            </p>

            <ul className="space-y-2 border-t border-[#E2E8F0] pt-3">
              <li 
                onClick={() => onOpenTool('ats-checker')}
                className="text-xs font-semibold text-[#0A1931] hover:text-[#C5A059] cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                  ATS Score Checker & Auto-Fixer
                </span>
                <span className="text-[11px] text-[#0A1931] font-bold bg-[#C5A059] hover:bg-[#B89246] px-2.5 py-1 rounded-lg">
                  Open Tool ⚡
                </span>
              </li>
              <li 
                onClick={() => onOpenTool('resume-builder')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Instant Resume Builder (No Watermark)
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('cover-letter-gen')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Tailored Cover Letter Generator
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('salary-negotiator')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Salary Negotiation Script Generator
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('job-ats')}
            className="mt-5 w-full py-2.5 bg-[#0A1931] hover:bg-[#142D54] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            Explore {JOB_ATS_TOOLS_COUNT} Career Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 2 - DABBA 6: DEV PRO TOOLS */}
        <div 
          id="dabba-dev-pro"
          className="bg-white border border-[#E2E8F0] hover:border-[#0A1931] rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A1931]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1931] text-white flex items-center justify-center shadow-sm text-2xl group-hover:scale-105 transition-transform">
                💻
              </div>
              <span className="bg-[#F8FAFC] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full border border-[#E2E8F0] font-mono">
                {DEV_PRO_TOOLS_COUNT} WORKING
              </span>
            </div>

            <h3 className="font-serif-royal text-2xl font-semibold text-[#0A1931] group-hover:text-[#C5A059] transition-colors">
              Developer Suite
            </h3>
            <p className="text-xs text-[#475569] mt-1.5 mb-4 leading-relaxed">
              Synthetic test data, Luhn cards, custom QR codes, JSON trees & regex testing.
            </p>

            <ul className="space-y-2 border-t border-[#F1F5F9] pt-3">
              <li 
                onClick={() => onOpenTool('fake-data-generator')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Fake Data & Luhn Card Generator
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('json-formatter')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  JSON Formatter & Tree Validator
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('qr-generator')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Custom QR Code Studio
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
              <li 
                onClick={() => onOpenTool('regex-tester')}
                className="text-xs font-medium text-[#0F172A] hover:text-[#0A1931] cursor-pointer flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                  Regex Matcher & Cheatsheet
                </span>
                <span className="text-[11px] text-[#C5A059] font-bold">Run →</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenCategory('dev-pro')}
            className="mt-5 w-full py-2.5 bg-[#F8FAFC] hover:bg-[#0A1931] text-[#0A1931] hover:text-white border border-[#E2E8F0] hover:border-[#0A1931] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            Explore {DEV_PRO_TOOLS_COUNT} Developer Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ROW 3 / DABBA 7: CUSTOM NOTION TEMPLATE & DATABASE BUILDER (ROYAL PREMIUM) */}
        <div 
          id="dabba-notion"
          className="md:col-span-2 lg:col-span-3 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden group shadow-[0_24px_64px_rgba(10,25,49,0.25)] border border-[rgba(197,160,89,0.2)]"
          style={{ background: 'linear-gradient(135deg, #0A1931 0%, #1E3A5F 100%)' }}
        >
          {/* Subtle gold glow aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            
            {/* Left side: Info & Badges */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* N Logo: White circle 48x48 with black N (Notion style), shadow */}
                <div className="w-12 h-12 rounded-full bg-white text-black font-black text-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 select-none">
                  N
                </div>
                {/* Top badge: "DABBA #7 • BUILD YOUR OWN + 25 PRESETS" - bg: #C5A059, text: #0A1931, font-bold 11px uppercase tracking-widest, rounded-full px-3 py-1 */}
                <span className="bg-[#C5A059] text-[#0A1931] font-bold text-[11px] uppercase tracking-widest rounded-full px-3 py-1 shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  DABBA #7 • BUILD YOUR OWN + 25 PRESETS
                </span>
                {/* Small badge: "18 Properties • 100% Free" - bg: rgba(255,255,255,0.1), border, text white/80 */}
                <span className="bg-white/10 border border-white/20 text-white/80 text-xs font-mono font-medium px-3 py-1 rounded-full">
                  18 Properties • 100% Free
                </span>
              </div>

              <div>
                {/* Title: "Custom Notion Template & Database Builder" - font: Instrument Serif 32px white, line-height 1.2 */}
                <h3 className="font-serif-royal text-[28px] sm:text-[32px] text-white font-normal leading-[1.2] group-hover:text-[#C5A059] transition-colors">
                  Custom Notion Template & Database Builder
                </h3>
                {/* Description: "Design custom Notion databases with Title, Multi-select, Status, Date, Rating, Progress & 18 column types. Interactive live table preview, instant dummy data, and 1-click CSV download ready to import into Notion." - color white/70 15px */}
                <p className="text-[15px] text-white/70 mt-2.5 leading-relaxed">
                  Design custom Notion databases with Title, Multi-select, Status, Date, Rating, Progress & 18 column types. Interactive live table preview, instant dummy data, and 1-click CSV download ready to import into Notion.
                </p>
              </div>

              {/* Presets: Show 5 presets as pills: 📅 Content Calendar, 🚀 Product Roadmap, ⚡ Habit Tracker, 💼 Job CRM, 💰 Budget Log - bg black/30 border white/10 */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-white/60 font-semibold">25 Presets:</span>
                <button 
                  onClick={() => onOpenTool('preset-content-calendar')}
                  className="px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-[#C5A059] hover:text-[#0A1931] font-medium text-white/90 transition-all border border-white/10 cursor-pointer"
                >
                  📅 Content Calendar
                </button>
                <button 
                  onClick={() => onOpenTool('preset-product-roadmap')}
                  className="px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-[#C5A059] hover:text-[#0A1931] font-medium text-white/90 transition-all border border-white/10 cursor-pointer"
                >
                  🚀 Product Roadmap
                </button>
                <button 
                  onClick={() => onOpenTool('preset-habit-tracker')}
                  className="px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-[#C5A059] hover:text-[#0A1931] font-medium text-white/90 transition-all border border-white/10 cursor-pointer"
                >
                  ⚡ Habit Tracker
                </button>
                <button 
                  onClick={() => onOpenTool('preset-job-crm')}
                  className="px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-[#C5A059] hover:text-[#0A1931] font-medium text-white/90 transition-all border border-white/10 cursor-pointer"
                >
                  💼 Job CRM
                </button>
                <button 
                  onClick={() => onOpenTool('preset-finance-budget')}
                  className="px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-[#C5A059] hover:text-[#0A1931] font-medium text-white/90 transition-all border border-white/10 cursor-pointer"
                >
                  💰 Budget Log
                </button>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-64 shrink-0">
              {/* Primary: "Launch Custom Builder →" bg: #C5A059 to #E8C27A gradient, text #0A1931 bold, rounded-full, shadow, hover scale 1.02 */}
              <a
                href="/tools/custom-notion-template-database-builder"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateTo) {
                    onNavigateTo('/tools/custom-notion-template-database-builder');
                  } else {
                    onOpenTool('notion-template-builder');
                  }
                }}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C5A059] to-[#E8C27A] text-[#0A1931] font-bold rounded-full text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all cursor-pointer shadow-lg active:scale-100"
              >
                <span>Launch Custom Builder →</span>
              </a>

              {/* Secondary: "View All 25 Presets" - routes to page and scrolls to presets section */}
              <a
                href="/tools/custom-notion-template-database-builder#presets"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateTo) {
                    onNavigateTo('/tools/custom-notion-template-database-builder?section=presets');
                  } else {
                    window.location.href = '/tools/custom-notion-template-database-builder#presets';
                  }
                }}
                className="w-full py-2.5 px-5 bg-white/[0.08] hover:bg-white/[0.16] text-white font-semibold rounded-full text-xs flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer text-center"
              >
                <span>View All 25 Presets</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

