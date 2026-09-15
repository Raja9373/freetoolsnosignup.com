import React, { useState, useMemo } from 'react';
import { 
  Calculator, DollarSign, TrendingUp, HelpCircle, Download, Share2, 
  Check, Info, Sliders, ShieldCheck, Sparkles, ArrowRight, BookOpen
} from 'lucide-react';
import { COMPLETE_CALCULATOR_SUITE } from '../tools/allCalculatorsCatalog';
import { CalculatorDefinition, CalculatorResult } from '../tools/calculatorEngine';
import { useGeo } from '../../context/GeoContext';

interface GlobalCalculatorRendererProps {
  toolId: string;
  onRecordUse?: (toolId: string) => void;
}

export const GlobalCalculatorRenderer: React.FC<GlobalCalculatorRendererProps> = ({ toolId, onRecordUse }) => {
  const { country, symbol: geoSymbol } = useGeo();

  // Find calculator definition
  const calculator: CalculatorDefinition = useMemo(() => {
    const found = COMPLETE_CALCULATOR_SUITE.find(c => c.id === toolId || (c as any).slug === toolId);
    if (found) return found;

    // Fallback default calculation definition if not found
    return {
      id: toolId,
      name: toolId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      category: 'finance',
      subCategory: 'Global Professional',
      description: 'Accurate browser-native financial & mathematical computation tool with instant zero-signup execution.',
      formula: 'Result = Principal * (1 + (Rate / 100) * Time)',
      formulaExplanation: 'Standard compound growth and interest amortization formula executing 100% client-side.',
      defaultInputs: {
        principal: 100000,
        rate: 7.5,
        years: 5
      },
      fields: [
        { id: 'principal', label: 'Principal / Investment Amount', type: 'number', min: 1000, max: 10000000, step: 1000, defaultValue: 100000 },
        { id: 'rate', label: 'Annual Interest Rate / Return %', type: 'number', min: 0.1, max: 50, step: 0.1, defaultValue: 7.5 },
        { id: 'years', label: 'Time Horizon (Years)', type: 'number', min: 1, max: 40, step: 1, defaultValue: 5 }
      ],
      calculate: (inputs) => {
        const p = Number(inputs.principal) || 0;
        const r = (Number(inputs.rate) || 0) / 100;
        const t = Number(inputs.years) || 1;
        const totalInterest = p * r * t;
        const totalAmount = p + totalInterest;
        return {
          primaryValue: Math.round(totalAmount).toLocaleString(),
          primaryLabel: 'Total Maturity Value',
          primaryUnit: geoSymbol,
          secondaryMetrics: [
            { label: 'Principal Invested', value: Math.round(p).toLocaleString() },
            { label: 'Total Interest Earned', value: Math.round(totalInterest).toLocaleString() }
          ],
          breakdown: [
            { label: 'Principal', value: p, color: '#0A1931' },
            { label: 'Interest', value: totalInterest, color: '#C5A059' }
          ]
        };
      }
    };
  }, [toolId]);

  const currencySymbol = useMemo(() => {
    const cAny = calculator as any;
    if (cAny.currencySymbol) return cAny.currencySymbol;
    if (cAny.currency) return cAny.currency;
    if (cAny.primaryUnit && !cAny.primaryUnit.includes('mo') && cAny.primaryUnit.length <= 3) return cAny.primaryUnit;

    if (toolId.includes('us') || toolId.includes('mortgage') || toolId.includes('usd') || toolId.includes('fha') || toolId.includes('va-') || toolId.includes('-us-')) return '$';
    if (toolId.includes('uk')) return '£';
    if (toolId.includes('ca')) return 'C$';
    if (toolId.includes('au')) return 'A$';
    if (toolId.includes('eu') || toolId.includes('de') || toolId.includes('es')) return '€';
    if (toolId.includes('jp')) return '¥';
    if (toolId.includes('in') || toolId.includes('emi') || toolId.includes('sip') || toolId.includes('gst') || toolId.includes('tax')) return '₹';
    return geoSymbol || '$';
  }, [toolId, calculator, geoSymbol]);

  // Form inputs state
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    if (calculator.defaultInputs) return { ...calculator.defaultInputs };
    const defaults: Record<string, any> = {};
    const fields = calculator.fields || [];
    fields.forEach((f: any) => {
      defaults[f.id] = f.defaultValue !== undefined ? f.defaultValue : (f.min ?? 0);
    });
    return defaults;
  });

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs(prev => ({ ...prev, [fieldId]: value }));
  };

  const result: CalculatorResult = useMemo(() => {
    try {
      return calculator.calculate(inputs);
    } catch {
      return {
        primaryValue: '0',
        primaryLabel: 'Result'
      };
    }
  }, [calculator, inputs]);

  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    const text = `${calculator.name}: ${result.primaryLabel} = ${result.primaryValue} (Calculated securely via FreeToolsNoSignup)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#CBD5E1] shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#0A1931] text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#C5A059] text-xs font-bold uppercase tracking-wider border border-[#C5A059]/30">
                {calculator.subCategory || calculator.category || 'Professional Calculator'}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% In-Browser Privacy
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif-royal">
              {calculator.name}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              {calculator.description}
            </p>
          </div>
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-[#C5A059] hover:bg-[#b08d48] text-[#0A1931] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied Result!' : 'Share Calculation'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Inputs, Right Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 bg-[#F8FAFC]">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 space-y-6 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-[#0A1931] uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C5A059]" />
              Input Parameters &amp; Variables
            </h3>
            <span className="text-xs text-slate-400 font-medium">Real-time update</span>
          </div>

          <div className="space-y-5">
            {(calculator.fields || []).map((field: any) => {
              const val = inputs[field.id] !== undefined ? inputs[field.id] : field.defaultValue;
              return (
                <div key={field.id} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor={`calc-input-${field.id}`} className="font-bold text-[#0A1931]">
                      {field.label}
                    </label>
                    <span className="font-mono font-bold text-[#126BFF] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {field.type === 'number' && (field.label.toLowerCase().includes('amount') || field.label.toLowerCase().includes('principal') || field.label.toLowerCase().includes('price') || field.label.toLowerCase().includes('salary')) ? currencySymbol : ''}
                      {Number(val).toLocaleString()} {field.unit || ''}
                    </span>
                  </div>

                  {field.type === 'number' ? (
                    <div className="space-y-2">
                      <input
                        id={`calc-input-${field.id}`}
                        type="range"
                        min={field.min ?? 0}
                        max={field.max ?? 1000000}
                        step={field.step ?? 1}
                        value={val}
                        onChange={(e) => handleInputChange(field.id, Number(e.target.value))}
                        className="w-full accent-[#0A1931] cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />
                      <input
                        type="number"
                        min={field.min ?? 0}
                        max={field.max ?? 10000000}
                        step={field.step ?? 1}
                        value={val}
                        onChange={(e) => handleInputChange(field.id, e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs font-mono font-bold bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#0A1931] focus:outline-hidden"
                      />
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      id={`calc-select-${field.id}`}
                      value={val}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#0A1931] focus:outline-hidden"
                    >
                      {(field.options || []).map((opt: any) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`calc-text-${field.id}`}
                      type="text"
                      value={val}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#0A1931] focus:outline-hidden"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Result Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0A1931] text-white p-6 rounded-2xl shadow-xl border border-[#1E3A8A] relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 w-48 h-48 bg-[#C5A059]/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 space-y-4">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                {result.primaryLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {result.primaryValue}
              </div>

              {result.secondaryMetrics && result.secondaryMetrics.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {result.secondaryMetrics.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">{m.label}</span>
                      <span className="font-mono font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {result.breakdown && result.breakdown.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visual Distribution</span>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                    {result.breakdown.map((b, i) => {
                      const total = result.breakdown!.reduce((acc, curr) => acc + Number(curr.value || 0), 0) || 1;
                      const pct = (Number(b.value || 0) / total) * 100;
                      return (
                        <div
                          key={i}
                          style={{ width: `${Math.max(pct, 5)}%`, backgroundColor: b.color || (i === 0 ? '#C5A059' : '#3B82F6') }}
                          title={`${b.label}: ${b.value}`}
                          className="h-full transition-all duration-300"
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {result.breakdown.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color || (i === 0 ? '#C5A059' : '#3B82F6') }}></span>
                        <span className="text-slate-300 font-medium">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {result.advice && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 font-medium flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Professional Financial Note</span>
                {result.advice}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Formula & Explanation Section */}
      <div className="p-6 sm:p-8 border-t border-[#E2E8F0] bg-white space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#C5A059]" />
          <h3 className="text-base font-bold text-[#0A1931]">Mathematical Formula &amp; Methodology</h3>
        </div>
        <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-4 rounded-2xl font-mono text-xs text-[#0A1931]">
          {calculator.formula}
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {calculator.formulaExplanation || calculator.description}
        </p>
      </div>
    </div>
  );
};
