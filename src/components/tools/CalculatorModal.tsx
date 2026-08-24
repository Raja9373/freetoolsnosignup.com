import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  HelpCircle, 
  Download, 
  Share2, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  PieChart as PieIcon, 
  Sliders, 
  Table, 
  ArrowRight,
  Info
} from 'lucide-react';
import { COMPLETE_CALCULATOR_SUITE } from './allCalculatorsCatalog';
import { CalculatorDefinition, CalculatorResult } from './calculatorEngine';

interface CalculatorModalProps {
  initialToolId?: string;
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ initialToolId, onClose, onRecordUse }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'finance' | 'health' | 'math' | 'construction'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Resolve initial active calculator
  const [selectedCalcId, setSelectedCalcId] = useState<string>(() => {
    if (initialToolId && COMPLETE_CALCULATOR_SUITE.some(c => c.id === initialToolId)) {
      return initialToolId;
    }
    if (initialToolId === 'emi-calculator') return 'loan-emi-calc';
    if (initialToolId === 'compound-interest-calc') return 'sip-calc';
    if (initialToolId === 'bmi-calculator') return 'bmi-calc';
    if (initialToolId === 'salary-takehome-calc') return 'income-tax-india-calc';
    if (initialToolId === 'gst-vat-calc') return 'gst-calc';
    return 'loan-emi-calc';
  });

  const activeCalc: CalculatorDefinition = useMemo(() => {
    return COMPLETE_CALCULATOR_SUITE.find(c => c.id === selectedCalcId) || COMPLETE_CALCULATOR_SUITE[0];
  }, [selectedCalcId]);

  // Form State initialized from default inputs
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    return activeCalc.defaultInputs || {};
  });

  // When active calc changes, reset inputs
  const handleSelectCalc = (calc: CalculatorDefinition) => {
    setSelectedCalcId(calc.id);
    setInputs(calc.defaultInputs || {});
    onRecordUse(calc.id);
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // Live real calculation output
  const result: CalculatorResult = useMemo(() => {
    try {
      return activeCalc.calculate(inputs);
    } catch {
      return {
        primaryValue: 'Calculating...',
        primaryLabel: 'Result'
      };
    }
  }, [activeCalc, inputs]);

  // Filtered calculators list
  const filteredCalculators = useMemo(() => {
    return COMPLETE_CALCULATOR_SUITE.filter(c => {
      const matchCat = activeCategory === 'all' || c.category === activeCategory;
      const matchSearch = searchQuery === '' || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.subCategory && c.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Copy result / Share
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    const text = `${activeCalc.name}: ${result.primaryLabel} = ${result.primaryValue} (Calculated with 100% accurate formulas)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download PDF summary report
  const handleDownloadReport = () => {
    const reportText = `=========================================
${activeCalc.name.toUpperCase()} REPORT
=========================================
Date: ${new Date().toLocaleString()}
Formula: ${activeCalc.formula}
Explanation: ${activeCalc.formulaExplanation}

INPUTS:
${activeCalc.fields.map(f => `- ${f.label}: ${inputs[f.id] ?? 'Default'} ${f.unit || ''}`).join('\n')}

RESULT:
${result.primaryLabel}: ${result.primaryValue} ${result.primaryUnit || ''}

METRICS:
${result.secondaryMetrics?.map(m => `- ${m.label}: ${m.value}`).join('\n') || 'None'}

${result.advice ? `\nADVICE:\n${result.advice}` : ''}
=========================================
Generated via ToolsDabba 201-in-1 Accurate Calculator Engine
=========================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeCalc.id}-calculation-report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="calculator-modal-overlay" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div id="calculator-modal-card" className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-7xl h-[92vh] max-h-[920px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* TOP BAR */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">201 Real Working Calculators</h2>
                <span className="bg-emerald-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">
                  100% EXACT FORMULAS
                </span>
              </div>
              <p className="text-xs text-purple-100 font-medium">Finance, Health WHO, Scientific Math, Engineering & Construction</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              id="calc-close-btn"
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* MAIN BODY: 2 COLUMN SPLIT */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          
          {/* LEFT SIDEBAR: CALCULATORS CATALOG SELECTOR */}
          <div className="w-full lg:w-80 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
            
            {/* Search & Categories */}
            <div className="p-3 border-b border-slate-200 bg-white space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search 201 calculators (EMI, SIP, BMI, Tax)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
                {[
                  { id: 'all', label: 'All 201' },
                  { id: 'finance', label: 'Finance (80)' },
                  { id: 'health', label: 'Health (50)' },
                  { id: 'math', label: 'Math (40)' },
                  { id: 'construction', label: 'Build (31)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                      activeCategory === cat.id 
                        ? 'bg-purple-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Calculator List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredCalculators.map(c => {
                const isSelected = c.id === selectedCalcId;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCalc(c)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                      isSelected 
                        ? 'bg-purple-600 text-white shadow-md font-semibold' 
                        : 'hover:bg-slate-200/70 text-slate-700 bg-white border border-slate-200/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="truncate font-bold">{c.name}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-purple-100' : 'text-slate-400'}`}>
                        {c.subCategory || c.category.toUpperCase()} • {c.formula}
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT WORKBENCH: INTERACTIVE CALCULATOR ENGINE */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 flex flex-col space-y-6">
            
            {/* CALCULATOR HEADER */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-200">
                    {activeCalc.category.toUpperCase()} • {activeCalc.subCategory || 'ACCURATE ENGINE'}
                  </span>
                  {result.statusBadge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      result.statusBadge.type === 'success' ? 'bg-emerald-100 text-emerald-800' :
                      result.statusBadge.type === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {result.statusBadge.label}
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{activeCalc.name}</h1>
                <p className="text-xs text-slate-500 mt-0.5">{activeCalc.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Share'}
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Summary
                </button>
              </div>
            </div>

            {/* TWO BOX GRID: INPUTS & REALTIME OUTPUT DISPLAY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT BOX: DYNAMIC FORM INPUTS */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Sliders className="w-4 h-4 text-purple-600" />
                  Adjust Parameters
                </div>

                <div className="space-y-4">
                  {activeCalc.fields.map(field => {
                    const val = inputs[field.id] ?? activeCalc.defaultInputs[field.id] ?? '';

                    return (
                      <div key={field.id} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                          <label htmlFor={`field-${field.id}`}>{field.label}</label>
                          {field.type === 'number' && (
                            <span className="font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                              {Number(val).toLocaleString()} {field.unit || ''}
                            </span>
                          )}
                        </div>

                        {field.type === 'number' && (
                          <div className="space-y-2">
                            <input
                              id={`field-${field.id}`}
                              type="number"
                              min={field.min}
                              max={field.max}
                              step={field.step || 1}
                              value={val}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white"
                            />
                            {field.min !== undefined && field.max !== undefined && (
                              <input
                                type="range"
                                min={field.min}
                                max={field.max}
                                step={field.step || 1}
                                value={val}
                                onChange={(e) => handleInputChange(field.id, Number(e.target.value))}
                                className="w-full accent-purple-600 cursor-pointer"
                              />
                            )}
                          </div>
                        )}

                        {field.type === 'select' && (
                          <select
                            id={`field-${field.id}`}
                            value={val}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                          >
                            {field.options?.map(opt => (
                              <option key={String(opt.value)} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {field.type === 'radio' && (
                          <div className="flex gap-2">
                            {field.options?.map(opt => (
                              <button
                                key={String(opt.value)}
                                type="button"
                                onClick={() => handleInputChange(field.id, opt.value)}
                                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                                  val === opt.value
                                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {field.type === 'date' && (
                          <input
                            id={`field-${field.id}`}
                            type="date"
                            value={val}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white"
                          />
                        )}

                        {field.type === 'text' && (
                          <input
                            id={`field-${field.id}`}
                            type="text"
                            value={val}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* FORMULA PROOF BADGE */}
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-950 text-xs space-y-1 mt-4">
                  <div className="flex items-center gap-1.5 font-bold text-purple-900">
                    <Info className="w-3.5 h-3.5 text-purple-600" />
                    Formula Used:
                  </div>
                  <div className="font-mono text-[11px] bg-white/70 p-1.5 rounded border border-purple-200 font-bold text-purple-800">
                    {activeCalc.formula}
                  </div>
                  <p className="text-[10px] text-purple-800">{activeCalc.formulaExplanation}</p>
                </div>
              </div>

              {/* RIGHT BOX: COMPUTED RESULTS & VISUAL CHARTS */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* PRIMARY HERO METRIC */}
                <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-xs uppercase tracking-widest text-purple-300 font-bold">
                      {result.primaryLabel}
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                      {result.primaryValue} {result.primaryUnit ? <span className="text-lg font-bold text-purple-300">{result.primaryUnit}</span> : ''}
                    </div>

                    {result.advice && (
                      <p className="text-xs text-purple-200 mt-3 pt-3 border-t border-white/10 leading-relaxed">
                        💡 {result.advice}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECONDARY METRICS GRID */}
                {result.secondaryMetrics && result.secondaryMetrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                    {result.secondaryMetrics.map((metric, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-[11px] font-semibold text-slate-500">{metric.label}</div>
                        <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 font-mono">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* BREAKDOWN VISUAL BARS (Principal vs Interest, etc.) */}
                {result.breakdown && result.breakdown.length > 0 && (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <PieIcon className="w-3.5 h-3.5 text-purple-600" />
                        Component Breakdown
                      </span>
                    </div>

                    {/* Progress Bar Segment */}
                    {(() => {
                      const total = result.breakdown.reduce((acc, b) => acc + (b.value || 0), 0) || 1;
                      return (
                        <div className="space-y-2">
                          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                            {result.breakdown.map((item, i) => {
                              const pct = Math.max(0, (item.value / total) * 100);
                              return (
                                <div
                                  key={i}
                                  style={{ width: `${pct}%`, backgroundColor: item.color || '#6366f1' }}
                                  className="h-full transition-all duration-300"
                                  title={`${item.label}: ${item.value}`}
                                />
                              );
                            })}
                          </div>

                          <div className="flex flex-wrap gap-4 text-xs">
                            {result.breakdown.map((item, i) => {
                              const pct = ((item.value / total) * 100).toFixed(1);
                              return (
                                <div key={i} className="flex items-center gap-1.5 font-medium">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color || '#6366f1' }} />
                                  <span className="text-slate-600">{item.label}:</span>
                                  <span className="font-bold text-slate-900 font-mono">₹{item.value.toLocaleString()} ({pct}%)</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* AMORTIZATION / PROGRESSION TABLE */}
                {result.table && (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Table className="w-3.5 h-3.5 text-purple-600" />
                      Detailed Breakdown Schedule
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                            {result.table.headers.map((h, i) => (
                              <th key={i} className="py-2 px-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {result.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2 px-3 text-slate-700">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
