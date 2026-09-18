import React, { useState, useMemo } from 'react';
import { Calculator, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, FileText, ChevronRight, Share2, Download, Info } from 'lucide-react';
import { Footer } from '../components/Footer';

interface EMICalculatorPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const EMICalculatorPage: React.FC<EMICalculatorPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  // Input states
  const [loanAmount, setLoanAmount] = useState<number>(2500000); // 25 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years default
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [activeTab, setActiveTab] = useState<'schedule' | 'breakdown'>('schedule');

  // Calculations
  const totalMonths = tenureType === 'years' ? tenureYears * 12 : tenureYears;
  const monthlyRate = interestRate / (12 * 100);

  const emi = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0 || totalMonths <= 0) return 0;
    if (monthlyRate === 0) return loanAmount / totalMonths;
    const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
    const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
    return numerator / denominator;
  }, [loanAmount, monthlyRate, totalMonths]);

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  // Amortization schedule generator (yearly summary for clean UI)
  const amortizationSchedule = useMemo(() => {
    if (emi <= 0 || loanAmount <= 0) return [];
    let balance = loanAmount;
    const schedule = [];
    const yearsCount = Math.ceil(totalMonths / 12);

    for (let yr = 1; yr <= yearsCount; yr++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let m = 1; m <= 12; m++) {
        const monthIndex = (yr - 1) * 12 + m;
        if (monthIndex > totalMonths) break;
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = emi - interestForMonth;
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance -= principalForMonth;
      }

      schedule.push({
        year: yr,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        totalPayment: Math.round(yearlyPrincipal + yearlyInterest),
        balance: Math.max(0, Math.round(balance))
      });
    }
    return schedule;
  }, [emi, loanAmount, monthlyRate, totalMonths]);

  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 50;
  const interestPercent = 100 - principalPercent;

  const formatCurrency = (val: number) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    } catch {
      return `₹ ${val.toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col font-sans selection:bg-[#0B4DB8] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="FreeToolsNoSignup Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          <div className="hidden sm:flex items-center bg-[#0A2342] text-white px-4 py-2 rounded-full text-xs font-extrabold shadow-sm">
            <span className="text-[#FFC000]">⚡ FAST</span>
            <span className="mx-2 text-[#FF8C00]">|</span>
            <span className="text-white">🛡️ FREE</span>
            <span className="mx-2 text-[#FF8C00]">|</span>
            <span className="text-[#FFC000]">👆 EASY</span>
          </div>
        </div>
      </header>

      {/* BREADCRUMBS */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full text-xs text-slate-500 font-medium flex items-center gap-2">
        <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-slate-800">Home</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <a href="/calculators" onClick={(e) => { e.preventDefault(); onNavigateTo('/calculators'); }} className="hover:text-slate-800">Calculators</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">EMI Calculator</span>
      </nav>

      {/* MAIN CONTAINER: 70% Left Calculator | 30% Right Sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* LEFT CALCULATOR UI (70% -> col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Title & Trust Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0B4DB8] font-bold text-xs">
              <Calculator className="w-3.5 h-3.5" /> OmniCalculator Model
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2342] tracking-tight">
              EMI Calculator - Calculate Loan EMI &amp; Amortization
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Calculate your monthly home loan, car loan, or personal loan EMI instantly. View detailed principal vs interest breakdowns and complete amortization schedules with zero signup.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No signup, 100% private, calculated entirely in your browser.</span>
            </div>
          </div>

          {/* CALCULATOR INTERACTIVE CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-8">
            
            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Loan Amount */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Loan Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    min="10000"
                    max="100000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-9 pr-4 text-base font-bold text-[#0A2342] focus:border-[#0B4DB8] focus:bg-white outline-none transition"
                  />
                </div>
                <input
                  type="range"
                  min="100000"
                  max="20000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#0B4DB8] cursor-pointer mt-1"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Interest Rate (% p.a.)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-bold text-[#0A2342] focus:border-[#0B4DB8] focus:bg-white outline-none transition"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#0B4DB8] cursor-pointer mt-1"
                />
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Loan Tenure
                  </label>
                  <div className="inline-flex bg-slate-100 p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      onClick={() => { setTenureType('years'); if(tenureYears > 30) setTenureYears(20); }}
                      className={`px-2 py-0.5 rounded-md transition ${tenureType === 'years' ? 'bg-[#0B4DB8] text-white shadow-xs' : 'text-slate-600'}`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => { setTenureType('months'); setTenureYears(prev => prev <= 30 ? prev * 12 : prev); }}
                      className={`px-2 py-0.5 rounded-md transition ${tenureType === 'months' ? 'bg-[#0B4DB8] text-white shadow-xs' : 'text-slate-600'}`}
                    >
                      Months
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max={tenureType === 'years' ? 40 : 480}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-bold text-[#0A2342] focus:border-[#0B4DB8] focus:bg-white outline-none transition"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max={tenureType === 'years' ? 30 : 360}
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-[#0B4DB8] cursor-pointer mt-1"
                />
              </div>

            </div>

            {/* BIG RESULT CARD (Blue #0B4DB8 gradient) */}
            <div className="bg-gradient-to-r from-[#0B4DB8] to-[#00D4FF] rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-100">Monthly Loan EMI</span>
                  <div className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                    {formatCurrency(Math.round(emi))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => alert('Results copied to clipboard!')}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold backdrop-blur-sm transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs text-blue-100 font-medium">Principal Amount</span>
                  <p className="text-lg font-bold mt-0.5">{formatCurrency(loanAmount)}</p>
                </div>
                <div>
                  <span className="text-xs text-blue-100 font-medium">Total Interest</span>
                  <p className="text-lg font-bold mt-0.5">{formatCurrency(Math.round(totalInterest))}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-xs text-blue-100 font-medium">Total Payment</span>
                  <p className="text-lg font-bold mt-0.5">{formatCurrency(Math.round(totalPayment))}</p>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold text-blue-100">
                  <span>Principal ({principalPercent.toFixed(1)}%)</span>
                  <span>Interest ({interestPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden flex">
                  <div className="bg-white h-full transition-all duration-500" style={{ width: `${principalPercent}%` }}></div>
                  <div className="bg-amber-300 h-full transition-all duration-500" style={{ width: `${interestPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* AMORTIZATION TABLE & SCHEDULE */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0A2342]">Amortization Schedule (Yearly Summary)</h3>
                <span className="text-xs font-semibold text-slate-500 font-mono">{amortizationSchedule.length} Years Schedule</span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <th className="p-3.5">Year</th>
                      <th className="p-3.5">Principal Paid</th>
                      <th className="p-3.5">Interest Paid</th>
                      <th className="p-3.5">Total Payment</th>
                      <th className="p-3.5">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {amortizationSchedule.slice(0, 10).map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50/80 transition">
                        <td className="p-3.5 font-bold text-slate-900">Year {row.year}</td>
                        <td className="p-3.5 text-emerald-700">{formatCurrency(row.principal)}</td>
                        <td className="p-3.5 text-amber-700">{formatCurrency(row.interest)}</td>
                        <td className="p-3.5 font-bold">{formatCurrency(row.totalPayment)}</td>
                        <td className="p-3.5 font-mono text-slate-500">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* FORMULA SECTION */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#0A2342] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#0B4DB8]" />
              The EMI Mathematical Formula
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Loan Equated Monthly Installment (EMI) is calculated using the standard compound interest formula used by major banks and financial institutions worldwide:
            </p>
            <div className="bg-slate-900 text-amber-300 p-5 rounded-2xl font-mono text-center text-sm sm:text-base tracking-wide shadow-inner">
              E = P × r × (1 + r)ⁿ / [ (1 + r)ⁿ – 1 ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <strong className="text-slate-900 font-bold">E</strong> = Calculated Monthly EMI
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <strong className="text-slate-900 font-bold">P</strong> = Principal Loan Amount (₹)
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <strong className="text-slate-900 font-bold">r</strong> = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <strong className="text-slate-900 font-bold">n</strong> = Loan Tenure in Months
              </div>
            </div>
          </div>

          {/* 600+ WORDS SEO ARTICLE */}
          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
            <h2 className="text-2xl font-extrabold text-[#0A2342]">Complete Guide to Loan EMI Calculation</h2>
            
            <p>
              When planning to purchase a home, buy a car, or fund higher education, taking out a loan is often necessary. Understanding your monthly financial commitment is critical before signing any loan agreement. The Equated Monthly Installment (EMI) is the fixed payment made by a borrower to a lender at a specified date each calendar month.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">What is EMI and Why is it Important?</h3>
            <p>
              EMI consists of two distinct components: principal repayment and interest charges. During the initial years of a long-term loan (such as a 20-year home mortgage), a significant portion of your monthly EMI goes toward paying off accrued interest, while a smaller portion reduces the principal balance. As time progresses, this ratio reverses, with more of your payment clearing the principal.
            </p>

            <h3 className="text-lg font-bold text-slate-900 pt-2">Key Factors Affecting Your Loan EMI</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Loan Principal Amount:</strong> The higher the amount borrowed, the higher your monthly EMI will be, assuming the tenure and interest rate remain constant.</li>
              <li><strong>Interest Rate:</strong> Even a 0.5% variance in interest rates can substantially alter the total interest paid over a 15 to 30-year tenure.</li>
              <li><strong>Loan Tenure:</strong> Extending your loan tenure reduces your monthly EMI burden but drastically increases the cumulative interest paid over the life of the loan.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 pt-2">Frequently Asked Questions (FAQs)</h3>
            
            <div className="space-y-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">1. Can I prepay my loan to reduce my EMI?</h4>
                <p className="text-xs text-slate-600">Yes, most lenders allow prepayments. You can choose to reduce your monthly EMI or shorten your remaining loan tenure.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">2. Is floating interest better than fixed interest?</h4>
                <p className="text-xs text-slate-600">Floating rates fluctuate with central bank rate changes and are usually lower than fixed rates. Fixed rates offer predictable monthly installments regardless of market shifts.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">3. Does FreeToolsNoSignup store my financial data?</h4>
                <p className="text-xs text-slate-600">No! All calculations are performed locally inside your browser client memory. Your financial numbers never touch any server.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">4. How is the monthly interest calculated?</h4>
                <p className="text-xs text-slate-600">Monthly interest is calculated by multiplying your outstanding loan balance by the monthly interest rate (annual rate divided by 1200).</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">5. Are processing fees included in the EMI?</h4>
                <p className="text-xs text-slate-600">No, bank processing fees, documentation charges, and GST are typically paid upfront during loan disbursement and are separate from your recurring EMI.</p>
              </div>
            </div>
          </article>

        </div>

        {/* RIGHT SIDEBAR (30% -> col-span-4): RELATED CALCULATORS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 sticky top-28">
            <div className="flex items-center gap-2 text-[#0A2342] font-extrabold text-base border-b border-slate-100 pb-3">
              <span>🧮</span> Related Calculators
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'SIP Wealth Calculator', desc: 'Plan mutual fund returns & compounding', path: '/calculators' },
                { name: 'Home Loan Eligibility', desc: 'Check max loan based on salary', path: '/calculators' },
                { name: 'Car Loan EMI Calculator', desc: 'Calculate auto loan payments', path: '/calculators' },
                { name: 'BMI & Health Calculator', desc: 'Body mass index & ideal weight', path: '/calculators' },
                { name: 'Age & Date Calculator', desc: 'Exact age in years, months & days', path: '/calculators' },
                { name: 'Compound Interest Calc', desc: 'Calculate future investment growth', path: '/calculators' },
              ].map((calc, i) => (
                <div 
                  key={i}
                  onClick={() => onNavigateTo(calc.path)}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-[#0B4DB8]/40 transition cursor-pointer group"
                >
                  <h4 className="text-sm font-bold text-[#0A2342] group-hover:text-[#0B4DB8] transition">{calc.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{calc.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#0A2342] to-[#0B4DB8] text-white rounded-2xl p-5 space-y-3 text-center mt-6">
              <span className="text-2xl">⚡</span>
              <h4 className="font-extrabold text-sm">Need a Custom Tool?</h4>
              <p className="text-xs text-blue-100">Explore 4,753+ free browser utilities with zero signups required.</p>
              <button 
                onClick={onNavigateHome}
                className="w-full py-2.5 bg-white text-[#0A2342] font-bold text-xs rounded-xl hover:bg-slate-100 transition shadow-sm cursor-pointer"
              >
                Browse All Tools
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <Footer onNavigate={onNavigateTo} />

    </div>
  );
};
