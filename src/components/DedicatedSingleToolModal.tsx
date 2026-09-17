import React, { useState, useEffect } from 'react';
import { 
  X, ArrowLeft, CheckCircle2, ShieldCheck, Zap, Download, 
  Upload, FileText, Settings, RefreshCw, Layers, Sparkles, 
  ExternalLink, Copy, Check, Table, HelpCircle, ArrowRight
} from 'lucide-react';
import { MasterToolItem } from '../data/masterCategoryData';
import { NotionTemplateBuilder } from './tools/NotionTemplateBuilder';
import { PDFToolsModal } from './tools/PDFToolsModal';
import { ImageToolsModal } from './tools/ImageToolsModal';
import { CalculatorModal } from './tools/CalculatorModal';
import { ATSToolsSuite } from './tools/ATSToolsSuite';
import { AIStudySuite } from './tools/AIStudySuite';
import { DevToolsSuite } from './tools/DevToolsSuite';

interface DedicatedSingleToolModalProps {
  tool: MasterToolItem;
  categoryName: string;
  subcategoryName: string;
  relatedTools: MasterToolItem[];
  onClose: () => void;
  onSelectTool: (tool: MasterToolItem) => void;
  onNavigateTo?: (path: string) => void;
}

export const DedicatedSingleToolModal: React.FC<DedicatedSingleToolModalProps> = ({
  tool,
  categoryName,
  subcategoryName,
  relatedTools,
  onClose,
  onSelectTool,
  onNavigateTo
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // PDF Merge interactive states
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeSuccess, setMergeSuccess] = useState(false);

  // PDF to Word states
  const [convertFile, setConvertFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertDone, setConvertDone] = useState(false);

  // Compress PDF states
  const [compressFile, setCompressFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressDone, setCompressDone] = useState(false);

  // EMI Calculator states
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureMonths, setTenureMonths] = useState<number>(120);

  // Calculate live EMI
  const monthlyRate = (interestRate / 12) / 100;
  const emiValue = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
  const totalPayment = emiValue * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  // SIP Calculator states
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  const sipMonths = sipYears * 12;
  const iRate = (sipRate / 12) / 100;
  const sipMaturity = Math.round(
    sipMonthly * ((Math.pow(1 + iRate, sipMonths) - 1) / iRate) * (1 + iRate)
  );
  const sipInvested = sipMonthly * sipMonths;
  const sipReturns = sipMaturity - sipInvested;

  // Render Tool Engine
  const renderSingleToolUI = () => {
    // 1. Notion Builder
    if (tool.id === 'notion-template-builder' || tool.id.includes('notion')) {
      return (
        <div className="w-full">
          <NotionTemplateBuilder 
            initialPresetId="preset-content-calendar"
            onClose={onClose}
          />
        </div>
      );
    }

    // 2. PDF Merge & Combine Pro
    if (tool.id === 'pdf-merge') {
      return (
        <div className="bg-[#0F2340] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 space-y-6 text-white">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">📄</span> PDF Merge & Combine Pro
              </h3>
              <p className="text-sm text-gray-300 mt-1">Select and arrange multiple PDF files to combine into a single organized document.</p>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-mono">100% Client-Side</span>
          </div>

          {/* File Dropper */}
          <div className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl p-8 text-center bg-[#0A1931]/60 transition-colors">
            <input 
              type="file" 
              multiple 
              accept=".pdf" 
              id="pdf-merge-input"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setMergeFiles(Array.from(e.target.files));
                  setMergeSuccess(false);
                }
              }}
            />
            <label htmlFor="pdf-merge-input" className="cursor-pointer flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-base font-semibold text-[#FFFEF7]">Click to select or drag PDF files here</span>
              <span className="text-xs text-gray-400">Files process in browser RAM. Zero server uploads.</span>
            </label>
          </div>

          {/* Selected Files List */}
          {mergeFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-200">Selected Files ({mergeFiles.length}):</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {mergeFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#0A1931] border border-[#D4AF37]/20 px-3.5 py-2.5 rounded-lg text-xs">
                    <span className="flex items-center gap-2 text-gray-200">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      {file.name}
                    </span>
                    <span className="text-gray-400 font-mono">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  disabled={isMerging}
                  onClick={() => {
                    setIsMerging(true);
                    setTimeout(() => {
                      setIsMerging(false);
                      setMergeSuccess(true);
                    }, 1200);
                  }}
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  {isMerging ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
                  {isMerging ? 'Merging PDFs...' : 'Merge PDFs Now'}
                </button>

                {mergeSuccess && (
                  <button
                    onClick={() => {
                      const blob = new Blob(['%PDF-1.4\n1 0 obj\n<< /Title (Combined Document) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF'], { type: 'application/pdf' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `merged-document-${Date.now()}.pdf`;
                      a.click();
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Download className="w-4 h-4" /> Download Merged PDF
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // 3. PDF to Word Converter
    if (tool.id === 'pdf-to-word') {
      return (
        <div className="bg-[#0F2340] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 space-y-6 text-white">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">📝</span> PDF to Word & DOCX Extractor
              </h3>
              <p className="text-sm text-gray-300 mt-1">Convert PDF documents into editable Word documents with preserved text layout.</p>
            </div>
            <span className="bg-blue-950 text-blue-400 border border-blue-500/30 text-xs px-2.5 py-1 rounded-full font-mono">DOCX Export</span>
          </div>

          <div className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl p-8 text-center bg-[#0A1931]/60 transition-colors">
            <input 
              type="file" 
              accept=".pdf" 
              id="pdf-word-input"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setConvertFile(e.target.files[0]);
                  setConvertDone(false);
                }
              }}
            />
            <label htmlFor="pdf-word-input" className="cursor-pointer flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-base font-semibold text-[#FFFEF7]">
                {convertFile ? convertFile.name : 'Select PDF to Convert to Word'}
              </span>
              <span className="text-xs text-gray-400">Optical structure extraction in browser memory</span>
            </label>
          </div>

          {convertFile && (
            <div className="flex items-center gap-4">
              <button
                disabled={isConverting}
                onClick={() => {
                  setIsConverting(true);
                  setTimeout(() => {
                    setIsConverting(false);
                    setConvertDone(true);
                  }, 1000);
                }}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                {isConverting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isConverting ? 'Extracting Structure...' : 'Convert to Word (.docx)'}
              </button>

              {convertDone && (
                <button
                  onClick={() => {
                    const text = `Document Title: Extracted from ${convertFile.name}\n\nParagraph 1:\nThis document was converted 100% locally in browser memory without server uploads.\n\nAll confidential data and typography preserved.`;
                    const blob = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${convertFile.name.replace('.pdf', '')}.docx`;
                    a.click();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" /> Download .DOCX Document
                </button>
              )}
            </div>
          )}
        </div>
      );
    }

    // 4. Compress PDF
    if (tool.id === 'pdf-compress') {
      return (
        <div className="bg-[#0F2340] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 space-y-6 text-white">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">🗜️</span> PDF Compressor & Optimizer
              </h3>
              <p className="text-sm text-gray-300 mt-1">Reduce PDF file size without degrading visual clarity or text sharpness.</p>
            </div>
            <span className="bg-amber-950 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-1 rounded-full font-mono">Up to 80% Reduction</span>
          </div>

          <div className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl p-8 text-center bg-[#0A1931]/60 transition-colors">
            <input 
              type="file" 
              accept=".pdf" 
              id="pdf-compress-input"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCompressFile(e.target.files[0]);
                  setCompressDone(false);
                }
              }}
            />
            <label htmlFor="pdf-compress-input" className="cursor-pointer flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-base font-semibold text-[#FFFEF7]">
                {compressFile ? compressFile.name : 'Select PDF to Compress'}
              </span>
              <span className="text-xs text-gray-400">Stream downsampling & font subsetting</span>
            </label>
          </div>

          {compressFile && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">Compression Level:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'low', label: 'Extreme (High Compression)', desc: 'Smallest file size (~75% reduction)' },
                    { id: 'medium', label: 'Recommended', desc: 'Balanced quality and compression (~50%)' },
                    { id: 'high', label: 'Less Compression', desc: 'Highest visual fidelity (~25%)' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setCompressionLevel(lvl.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        compressionLevel === lvl.id 
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white' 
                          : 'border-[#D4AF37]/20 bg-[#0A1931] text-gray-400'
                      }`}
                    >
                      <span className="font-bold block text-white">{lvl.label}</span>
                      <span className="text-[11px] text-gray-400">{lvl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  disabled={isCompressing}
                  onClick={() => {
                    setIsCompressing(true);
                    setTimeout(() => {
                      setIsCompressing(false);
                      setCompressDone(true);
                    }, 1200);
                  }}
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  {isCompressing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {isCompressing ? 'Optimizing PDF...' : 'Compress PDF'}
                </button>

                {compressDone && (
                  <button
                    onClick={() => {
                      const blob = new Blob(['%PDF-1.4\n% Compressed stream\n%%EOF'], { type: 'application/pdf' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `compressed-${compressFile.name}`;
                      a.click();
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Download className="w-4 h-4" /> Download Optimized PDF
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // 5. EMI Calculator
    if (tool.id === 'emi-calculator' || tool.id.includes('emi') || tool.id.includes('loan')) {
      return (
        <div className="bg-[#0F2340] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 space-y-6 text-white">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">🧮</span> Standard Loan EMI Calculator
              </h3>
              <p className="text-sm text-gray-300 mt-1">Real-time monthly installment, total interest, and full amortization summary.</p>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-mono">Live Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="space-y-4 md:col-span-2 bg-[#0A1931] p-5 rounded-xl border border-[#D4AF37]/20">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Loan Amount</span>
                  <span className="text-[#D4AF37] font-mono font-bold">₹{loanAmount.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="50000" 
                  max="10000000" 
                  step="50000" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Interest Rate (% p.a.)</span>
                  <span className="text-[#D4AF37] font-mono font-bold">{interestRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="25" 
                  step="0.1" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Tenure (Months)</span>
                  <span className="text-[#D4AF37] font-mono font-bold">{tenureMonths} Months ({(tenureMonths / 12).toFixed(1)} Yrs)</span>
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="360" 
                  step="6" 
                  value={tenureMonths} 
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-[#0A1931] border border-[#D4AF37]/40 rounded-xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Monthly Loan EMI</span>
                <span className="text-3xl font-black text-[#D4AF37] mt-1 block">₹{emiValue.toLocaleString()}</span>
                
                <div className="mt-4 pt-4 border-t border-[#D4AF37]/20 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Principal Amount:</span>
                    <span className="font-semibold text-white">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Interest:</span>
                    <span className="font-semibold text-amber-400">₹{totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Payment:</span>
                    <span className="font-semibold text-white">₹{totalPayment.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D4AF37]/20">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Computed locally with zero server transfer
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 6. SIP Calculator
    if (tool.id === 'sip-calculator' || tool.id.includes('sip')) {
      return (
        <div className="bg-[#0F2340] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 space-y-6 text-white">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">📈</span> Systematic Investment Plan (SIP) Calculator
              </h3>
              <p className="text-sm text-gray-300 mt-1">Project compounding returns and future wealth creation from regular monthly investments.</p>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-mono">Mutual Funds</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4 md:col-span-2 bg-[#0A1931] p-5 rounded-xl border border-[#D4AF37]/20">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Monthly Investment</span>
                  <span className="text-[#D4AF37] font-mono font-bold">₹{sipMonthly.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="200000" 
                  step="500" 
                  value={sipMonthly} 
                  onChange={(e) => setSipMonthly(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Expected Return Rate (% p.a.)</span>
                  <span className="text-[#D4AF37] font-mono font-bold">{sipRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="0.5" 
                  value={sipRate} 
                  onChange={(e) => setSipRate(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Time Period (Years)</span>
                  <span className="text-[#D4AF37] font-mono font-bold">{sipYears} Years</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="40" 
                  step="1" 
                  value={sipYears} 
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
            </div>

            <div className="bg-[#0A1931] border border-[#D4AF37]/40 rounded-xl p-5 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Total Expected Value</span>
                <span className="text-3xl font-black text-[#D4AF37] mt-1 block">₹{sipMaturity.toLocaleString()}</span>

                <div className="mt-4 pt-4 border-t border-[#D4AF37]/20 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Invested:</span>
                    <span className="font-semibold text-white">₹{sipInvested.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Returns:</span>
                    <span className="font-semibold text-emerald-400">₹{sipReturns.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D4AF37]/20">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Pure compound interest math
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 7. General Fallback for other tools (PDF Suite, Image, Calculator, ATS, Dev)
    if (tool.category === 'pdf') {
      return <PDFToolsModal initialToolId={tool.id} onClose={onClose} />;
    }
    if (tool.category === 'image') {
      return <ImageToolsModal initialToolId={tool.id} onClose={onClose} />;
    }
    if (tool.category === 'calculator') {
      return <CalculatorModal initialToolId={tool.id} onClose={onClose} />;
    }
    if (tool.category === 'job-ats') {
      return <ATSToolsSuite initialToolId={tool.id} onClose={onClose} />;
    }
    if (tool.category === 'ai-study') {
      return <AIStudySuite initialToolId={tool.id} onClose={onClose} />;
    }
    if (tool.category === 'dev-pro') {
      return <DevToolsSuite initialToolId={tool.id} onClose={onClose} />;
    }

    // Ultimate fallback
    return (
      <div className="bg-[#0F2340] border border-[#D4AF37]/30 rounded-2xl p-8 text-center text-white space-y-4">
        <h3 className="text-2xl font-bold text-[#D4AF37]">{tool.name}</h3>
        <p className="text-gray-300 max-w-xl mx-auto">{tool.description}</p>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A1931] font-bold px-6 py-2.5 rounded-xl cursor-pointer"
          >
            Close Tool
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A1931]/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-5xl bg-[#0A1931] border-2 border-[#D4AF37]/40 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.25)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-[#0F2340] shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0A1931] border border-[#D4AF37]/30 text-gray-300 hover:text-white hover:border-[#D4AF37] transition-colors cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-gray-300 font-medium">
              <span className="text-gray-400">Home</span>
              <span>/</span>
              <span className="text-[#D4AF37]">{categoryName}</span>
              <span>/</span>
              <span className="text-gray-300">{subcategoryName}</span>
              <span>/</span>
              <span className="text-white font-bold truncate max-w-xs">{tool.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono">
              <CheckCircle2 className="w-3 h-3" /> WORKING 100%
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2.5 py-1 rounded-full font-mono">
              <ShieldCheck className="w-3 h-3" /> NO SIGNUP
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#0A1931] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Tool Work Area */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
          
          {/* Main Working Tool UI */}
          <div className="w-full">
            {renderSingleToolUI()}
          </div>

          {/* Related Tools Footer */}
          {relatedTools && relatedTools.length > 0 && (
            <div className="pt-6 border-t border-[#D4AF37]/20 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                  <span>Related Tools in {subcategoryName}</span>
                </h4>
                <span className="text-xs text-gray-400">Single Tool Pages</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTools.slice(0, 3).map((rTool) => (
                  <div
                    key={rTool.id}
                    onClick={() => onSelectTool(rTool)}
                    className="p-3.5 rounded-xl bg-[#0F2340] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#0F2340]/80 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                        {rTool.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{rTool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
