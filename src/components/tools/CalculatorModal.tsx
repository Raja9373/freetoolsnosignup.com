import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Percent, Activity, TrendingUp, RefreshCw } from 'lucide-react';

interface CalculatorModalProps {
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ onClose, onRecordUse }) => {
  const [calcTab, setCalcTab] = useState<'emi' | 'bmi' | 'sip'>('emi');

  // EMI State
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(15);

  // BMI State
  const [weightKg, setWeightKg] = useState<number>(72);
  const [heightCm, setHeightCm] = useState<number>(175);

  // SIP State
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(500);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // EMI Math
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = loanAmount * monthlyRate * (Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // BMI Math
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-600';
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-blue-600';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-600';
  } else if (bmi >= 30) {
    bmiCategory = 'Obesity';
    bmiColor = 'text-rose-600';
  }

  // SIP Math
  const r = sipRate / 12 / 100;
  const n = sipYears * 12;
  const totalInvested = monthlyInvestment * n;
  const totalFutureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalReturns = totalFutureValue - totalInvested;

  return (
    <div id="calculator-modal-overlay" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div id="calculator-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Financial & Health Calculators</h2>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-purple-200">
                  201 WORKING
                </span>
              </div>
              <p className="text-xs text-slate-500">Accurate formulas for mortgages, loans, investments, and health metrics</p>
            </div>
          </div>

          <button 
            id="calc-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 px-4 bg-slate-50 gap-2 pt-2 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => { setCalcTab('emi'); onRecordUse('emi-calculator'); }}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              calcTab === 'emi' ? 'border-purple-600 text-purple-900' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Loan & Mortgage EMI
          </button>
          <button
            onClick={() => { setCalcTab('sip'); onRecordUse('compound-interest-calc'); }}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              calcTab === 'sip' ? 'border-purple-600 text-purple-900' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Compound SIP Growth
          </button>
          <button
            onClick={() => { setCalcTab('bmi'); onRecordUse('bmi-calculator'); }}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              calcTab === 'bmi' ? 'border-purple-600 text-purple-900' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> BMI & Health
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-6">
          
          {/* TAB 1: EMI CALCULATOR */}
          {calcTab === 'emi' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sliders */}
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Loan Principal Amount</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">${loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$10k</span>
                    <span>$1M+</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Annual Interest Rate (%)</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Loan Duration (Years)</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>

              </div>

              {/* Payoff Breakdown */}
              <div className="space-y-4">
                <div className="bg-purple-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="text-xs uppercase tracking-wider text-purple-200 font-semibold">Monthly EMI Payment</div>
                  <div className="text-3xl sm:text-4xl font-black mt-1">
                    ${Math.round(emi).toLocaleString()}
                    <span className="text-sm font-normal text-purple-300"> / month</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-purple-800">
                    <div>
                      <div className="text-[11px] text-purple-300">Total Interest</div>
                      <div className="text-base font-bold">${Math.round(totalInterest).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-purple-300">Total Amount Payable</div>
                      <div className="text-base font-bold">${Math.round(totalPayment).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Principal vs Interest Ratio Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                    <span className="text-purple-700">Principal ({Math.round((loanAmount / totalPayment) * 100)}%)</span>
                    <span className="text-amber-600">Interest ({Math.round((totalInterest / totalPayment) * 100)}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden">
                    <div className="bg-purple-600 h-full" style={{ width: `${(loanAmount / totalPayment) * 100}%` }} />
                    <div className="bg-amber-500 h-full" style={{ width: `${(totalInterest / totalPayment) * 100}%` }} />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SIP CALCULATOR */}
          {calcTab === 'sip' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Monthly Investment ($)</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">${monthlyInvestment}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Expected Return Rate (CAGR %)</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">{sipRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Investment Period (Years)</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">{sipYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="35"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white p-6 rounded-2xl shadow-lg">
                  <div className="text-xs uppercase tracking-wider text-purple-200 font-semibold">Expected Maturity Value</div>
                  <div className="text-3xl sm:text-4xl font-black mt-1 text-emerald-400">
                    ${Math.round(totalFutureValue).toLocaleString()}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-purple-800">
                    <div>
                      <div className="text-[11px] text-purple-300">Invested Amount</div>
                      <div className="text-base font-bold">${Math.round(totalInvested).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-purple-300">Est. Wealth Gain</div>
                      <div className="text-base font-bold text-emerald-400">+${Math.round(totalReturns).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BMI CALCULATOR */}
          {calcTab === 'bmi' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Weight (kg)</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">{weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                    <span>Height (cm)</span>
                    <span className="text-purple-700 font-mono font-bold text-sm">{heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    step="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Body Mass Index (BMI)</div>
                  <div className="text-4xl font-black text-slate-900 mt-1">
                    {bmi.toFixed(1)}
                  </div>
                  <div className={`text-sm font-bold mt-1 ${bmiColor}`}>
                    Status: {bmiCategory} (WHO Guidelines)
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>• &lt; 18.5 : Underweight</div>
                  <div>• 18.5 - 24.9 : Normal & Healthy</div>
                  <div>• 25.0 - 29.9 : Overweight</div>
                  <div>• 30.0+ : Obese</div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>⚡ Exact mathematical calculation • No data transmitted</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
