import React from 'react';
import { ArrowLeft, Calculator, DollarSign, Heart, Home, GraduationCap, Zap } from 'lucide-react';

interface CalculatorsHubPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const CalculatorsHubPage: React.FC<CalculatorsHubPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const calcCategories = [
    { id: 'finance', name: 'Finance & Investment', desc: 'SIP, SWP, Compound Interest, CAGR, ROI, Mutual Funds and retirement calculators.', count: '650 models', icon: '📈' },
    { id: 'loans', name: 'Loan & EMI Calculators', desc: 'Home loan, car loan, personal loan EMI, amortization schedules and prepayment.', count: '420 models', icon: '💳' },
    { id: 'tax', name: 'Salary & Income Tax', desc: 'Income tax slabs, HRA, PF, Gratuity, TDS and net take-home salary calculators.', count: '310 models', icon: '💵' },
    { id: 'health', name: 'Health & Fitness', desc: 'BMI, BMR, TDEE, body fat percentage, calorie target and macro calculators.', count: '280 models', icon: '❤️' },
    { id: 'real-estate', name: 'Real Estate & Property', desc: 'Rental yield, cap rate, property ROI, down payment and affordability calculators.', count: '250 models', icon: '🏠' },
    { id: 'math', name: 'Math & Science', desc: 'Percentages, fractions, algebra, statistics, trigonometry and engineering equations.', count: '670 models', icon: '📐' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1F3A] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0A1931]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A1931] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-white hover:text-[#D4AF37] transition-colors cursor-pointer group"
          >
            <span className="font-extrabold text-white text-lg tracking-tight group-hover:text-[#D4AF37] transition-colors">
              FreeTools <span className="text-[#D4AF37]">NoSignup</span>
            </span>
          </button>
          <div className="flex items-center gap-3">
            <span className="bg-[#D4AF37] text-[#0A1931] text-xs font-bold px-3 py-1 rounded-full font-mono">
              🧮 CALCULATORS HUB
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1931]/10 text-[#0A1931] text-xs font-bold mb-4">
            <Calculator className="w-3.5 h-3.5" /> Precision Calculation Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1931] mb-4">
            Free Online Calculators
          </h1>
          <p className="text-base text-[#475569]">
            Professional-grade calculation models for finance, loans, health, real estate, and math. Instant results with complete formula breakdowns.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calcCategories.map((cat) => (
            <div 
              key={cat.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 bg-gray-50 rounded-xl border border-gray-100">
                    {cat.icon}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full font-mono">
                    {cat.count}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0A1931] mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <button 
                onClick={() => {
                  if (cat.id === 'loans') {
                    onNavigateTo('emi');
                  } else {
                    onNavigateTo('calculators');
                  }
                }}
                className="w-full bg-[#0A1931] text-white hover:bg-[#142646] font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore {cat.name}</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
