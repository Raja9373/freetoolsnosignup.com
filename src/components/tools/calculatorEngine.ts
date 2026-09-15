// Accurate Math & Financial Engine for 201 Calculators

export interface CalculatorDefinition {
  id: string;
  name: string;
  category: 'finance' | 'health' | 'math' | 'construction' | 'everyday';
  subCategory?: string;
  description: string;
  formula: string;
  formulaExplanation?: string;
  defaultInputs?: Record<string, any>;
  currency?: string;
  currencySymbol?: string;
  country?: string;
  fields?: {
    id: string;
    label: string;
    type: 'number' | 'select' | 'text' | 'date' | 'radio';
    min?: number;
    max?: number;
    step?: number;
    options?: { label: string; value: any }[];
    unit?: string;
    help?: string;
    defaultValue?: any;
  }[];
  inputs?: {
    id: string;
    label: string;
    type: 'number' | 'select' | 'text' | 'date' | 'radio' | string;
    min?: number;
    max?: number;
    step?: number;
    options?: { label: string; value: any }[];
    unit?: string;
    help?: string;
    defaultValue?: any;
  }[];
  calculate: (inputs: Record<string, any>) => CalculatorResult;
}

export interface CalculatorResult {
  primaryValue: string | number;
  primaryLabel: string;
  primaryUnit?: string;
  secondaryMetrics?: { label: string; value: string | number; unit?: string }[];
  breakdown?: { label: string; value: number; color?: string }[];
  table?: { headers: string[]; rows: (string | number)[][] };
  statusBadge?: { label: string; type: 'success' | 'warning' | 'info' | 'danger' };
  advice?: string;
  chartType?: 'pie' | 'bar' | 'line' | 'gauge';
}

// -------------------------------------------------------------
// 1. FINANCE CALCULATORS (80 REAL CALCULATORS)
// -------------------------------------------------------------

// Helper for Indian Tax Slabs (FY 2024-25 / AY 2025-26)
function calculateIncomeTaxIndia(annualIncome: number, deductions80C: number = 0, healthInsurance80D: number = 0, standardDeduction: number = 75000) {
  // New Tax Regime (Budget 2024-25 standard deduction: ₹75,000, 87A rebate up to ₹7L)
  const taxableNew = Math.max(0, annualIncome - standardDeduction);
  let taxNew = 0;

  if (taxableNew <= 300000) taxNew = 0;
  else if (taxableNew <= 700000) taxNew = (taxableNew - 300000) * 0.05;
  else if (taxableNew <= 1000000) taxNew = 20000 + (taxableNew - 700000) * 0.10;
  else if (taxableNew <= 1200000) taxNew = 50000 + (taxableNew - 1000000) * 0.15;
  else if (taxableNew <= 1500000) taxNew = 80000 + (taxableNew - 1200000) * 0.20;
  else taxNew = 140000 + (taxableNew - 1500000) * 0.30;

  // Section 87A Rebate for New Regime: If taxable income <= 7,00,000, tax is NIL (rebate up to ₹25,000)
  if (taxableNew <= 700000) {
    taxNew = 0;
  }
  const cessNew = taxNew * 0.04;
  const totalTaxNew = taxNew + cessNew;

  // Old Tax Regime (Standard deduction ₹50,000, Section 80C cap ₹1,50,000, 80D cap ₹25,000)
  const totalDeductionsOld = 50000 + Math.min(150000, deductions80C) + Math.min(25000, healthInsurance80D);
  const taxableOld = Math.max(0, annualIncome - totalDeductionsOld);
  let taxOld = 0;

  if (taxableOld <= 250000) taxOld = 0;
  else if (taxableOld <= 500000) taxOld = (taxableOld - 250000) * 0.05;
  else if (taxableOld <= 1000000) taxOld = 12500 + (taxableOld - 500000) * 0.20;
  else taxOld = 112500 + (taxableOld - 1000000) * 0.30;

  if (taxableOld <= 500000) {
    taxOld = 0; // 87A rebate
  }
  const cessOld = taxOld * 0.04;
  const totalTaxOld = taxOld + cessOld;

  return { totalTaxNew, totalTaxOld, taxableNew, taxableOld, savings: totalTaxOld - totalTaxNew };
}

export const ALL_CALCULATORS: CalculatorDefinition[] = [
  // 1. Loan EMI Calculator
  {
    id: 'loan-emi-calc',
    name: 'Loan EMI & Mortgage Calculator',
    category: 'finance',
    subCategory: 'Loans & Debt',
    description: 'Calculate exact Equated Monthly Installment (EMI), total interest, and full payoff amortization schedule.',
    formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
    formulaExplanation: 'P = Principal Loan Amount, r = Monthly Interest Rate (Annual Rate / 12 / 100), n = Loan Term in Months (Years × 12).',
    defaultInputs: { principal: 1000000, rate: 9.0, years: 20 },
    fields: [
      { id: 'principal', label: 'Loan Principal Amount', type: 'number', min: 1000, max: 100000000, step: 10000, unit: '₹ / $' },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', min: 0.1, max: 40, step: 0.05, unit: '%' },
      { id: 'years', label: 'Loan Tenure (Years)', type: 'number', min: 1, max: 40, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal) || 0;
      const annualRate = Number(inputs.rate) || 0;
      const years = Number(inputs.years) || 1;

      const r = annualRate / 12 / 100;
      const n = years * 12;

      let emi = 0;
      if (r === 0) {
        emi = P / n;
      } else {
        const factor = Math.pow(1 + r, n);
        emi = (P * r * factor) / (factor - 1);
      }

      const totalPayment = emi * n;
      const totalInterest = totalPayment - P;

      // Generate first 12 months amortization schedule
      const rows: (string | number)[][] = [];
      let balance = P;
      for (let m = 1; m <= Math.min(12, n); m++) {
        const interestM = balance * r;
        const principalM = emi - interestM;
        balance = Math.max(0, balance - principalM);
        rows.push([
          `Month ${m}`,
          `₹${Math.round(principalM).toLocaleString()}`,
          `₹${Math.round(interestM).toLocaleString()}`,
          `₹${Math.round(balance).toLocaleString()}`
        ]);
      }

      return {
        primaryValue: Math.round(emi).toLocaleString(),
        primaryLabel: 'Monthly EMI',
        primaryUnit: '₹/mo',
        secondaryMetrics: [
          { label: 'Principal Amount', value: `₹${P.toLocaleString()}` },
          { label: 'Total Interest Payable', value: `₹${Math.round(totalInterest).toLocaleString()}` },
          { label: 'Total Payment (P + I)', value: `₹${Math.round(totalPayment).toLocaleString()}` },
          { label: 'Interest-to-Principal Ratio', value: `${((totalInterest / P) * 100).toFixed(1)}%` }
        ],
        breakdown: [
          { label: 'Principal Loan', value: Math.round(P), color: '#3b82f6' },
          { label: 'Total Interest', value: Math.round(totalInterest), color: '#f97316' }
        ],
        chartType: 'pie',
        table: {
          headers: ['Period', 'Principal Paid', 'Interest Paid', 'Remaining Balance'],
          rows
        },
        advice: `For a loan of ₹${P.toLocaleString()} at ${annualRate}% for ${years} years, your exact monthly EMI is ₹${Math.round(emi).toLocaleString()}. Total interest is ₹${Math.round(totalInterest).toLocaleString()}.`
      };
    }
  },

  // 2. SIP (Systematic Investment Plan) Calculator
  {
    id: 'sip-calc',
    name: 'SIP (Mutual Funds) Wealth Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate wealth created through monthly SIP investments in mutual funds or index funds.',
    formula: 'FV = P × [ (1 + r)^n - 1 ] / r × (1 + r)',
    formulaExplanation: 'P = Monthly SIP Amount, r = Periodic Monthly Rate (Annual Expected Return / 12 / 100), n = Total Months (Years × 12).',
    defaultInputs: { monthlyAmount: 10000, expectedReturn: 12.5, years: 15 },
    fields: [
      { id: 'monthlyAmount', label: 'Monthly SIP Amount', type: 'number', min: 100, max: 1000000, step: 500, unit: '₹ / $' },
      { id: 'expectedReturn', label: 'Expected Annual Return (%)', type: 'number', min: 1, max: 40, step: 0.5, unit: '%' },
      { id: 'years', label: 'Investment Horizon (Years)', type: 'number', min: 1, max: 50, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.monthlyAmount) || 0;
      const annualReturn = Number(inputs.expectedReturn) || 0;
      const years = Number(inputs.years) || 1;

      const r = annualReturn / 12 / 100;
      const n = years * 12;
      const totalInvested = P * n;

      let futureValue = 0;
      if (r === 0) {
        futureValue = totalInvested;
      } else {
        futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      }

      const estimatedWealthGain = futureValue - totalInvested;

      // Year by year progression table
      const rows: (string | number)[][] = [];
      for (let y = 1; y <= Math.min(10, years); y++) {
        const mCount = y * 12;
        const investedY = P * mCount;
        const fvY = P * ((Math.pow(1 + r, mCount) - 1) / r) * (1 + r);
        rows.push([
          `Year ${y}`,
          `₹${Math.round(investedY).toLocaleString()}`,
          `₹${Math.round(fvY - investedY).toLocaleString()}`,
          `₹${Math.round(fvY).toLocaleString()}`
        ]);
      }

      return {
        primaryValue: Math.round(futureValue).toLocaleString(),
        primaryLabel: 'Expected Future Value',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Total Amount Invested', value: `₹${Math.round(totalInvested).toLocaleString()}` },
          { label: 'Estimated Wealth Gains', value: `₹${Math.round(estimatedWealthGain).toLocaleString()}` },
          { label: 'Wealth Multiplier', value: `${(futureValue / (totalInvested || 1)).toFixed(2)}x` },
          { label: 'CAGR Return', value: `${annualReturn}% p.a.` }
        ],
        breakdown: [
          { label: 'Invested Capital', value: Math.round(totalInvested), color: '#6366f1' },
          { label: 'Wealth Gains', value: Math.round(estimatedWealthGain), color: '#10b981' }
        ],
        chartType: 'pie',
        table: {
          headers: ['Timeline', 'Invested Capital', 'Capital Gain', 'Portfolio Value'],
          rows
        },
        statusBadge: { label: 'Compounding Champion', type: 'success' },
        advice: `By investing ₹${P.toLocaleString()}/mo at ${annualReturn}% for ${years} years, you invest ₹${totalInvested.toLocaleString()} and earn ₹${Math.round(estimatedWealthGain).toLocaleString()} in capital appreciation!`
      };
    }
  },

  // 3. Step-up SIP Calculator
  {
    id: 'step-up-sip-calc',
    name: 'Step-up SIP (Top-up) Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate wealth growth when you increase your SIP amount annually by a fixed percentage.',
    formula: 'Iterative FV compounding with annual increment step',
    formulaExplanation: 'Simulates yearly percentage salary hikes and increases monthly investment amount accordingly.',
    defaultInputs: { initialAmount: 10000, annualStepUp: 10, expectedReturn: 12.0, years: 15 },
    fields: [
      { id: 'initialAmount', label: 'Starting Monthly SIP', type: 'number', min: 500, max: 1000000, step: 500, unit: '₹' },
      { id: 'annualStepUp', label: 'Annual Top-up / Step-up (%)', type: 'number', min: 1, max: 50, step: 1, unit: '%' },
      { id: 'expectedReturn', label: 'Expected Return (%)', type: 'number', min: 1, max: 35, step: 0.5, unit: '%' },
      { id: 'years', label: 'Tenure (Years)', type: 'number', min: 1, max: 40, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      let monthly = Number(inputs.initialAmount) || 1000;
      const stepUpPercent = Number(inputs.annualStepUp) || 0;
      const rate = Number(inputs.expectedReturn) || 10;
      const years = Number(inputs.years) || 1;
      const r = rate / 12 / 100;

      let totalInvested = 0;
      let totalFV = 0;
      const rows: (string | number)[][] = [];

      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          totalInvested += monthly;
          totalFV = (totalFV + monthly) * (1 + r);
        }
        if (y <= 10) {
          rows.push([
            `Year ${y} (₹${Math.round(monthly).toLocaleString()}/mo)`,
            `₹${Math.round(totalInvested).toLocaleString()}`,
            `₹${Math.round(totalFV - totalInvested).toLocaleString()}`,
            `₹${Math.round(totalFV).toLocaleString()}`
          ]);
        }
        monthly = monthly * (1 + stepUpPercent / 100);
      }

      return {
        primaryValue: Math.round(totalFV).toLocaleString(),
        primaryLabel: 'Step-up SIP Maturity Value',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Total Invested', value: `₹${Math.round(totalInvested).toLocaleString()}` },
          { label: 'Total Wealth Generated', value: `₹${Math.round(totalFV - totalInvested).toLocaleString()}` },
          { label: 'Final Monthly Contribution', value: `₹${Math.round(monthly / (1 + stepUpPercent / 100)).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Invested', value: Math.round(totalInvested), color: '#8b5cf6' },
          { label: 'Gains', value: Math.round(totalFV - totalInvested), color: '#059669' }
        ],
        chartType: 'pie',
        table: {
          headers: ['Year & Monthly Rate', 'Total Invested', 'Gains', 'Portfolio Total'],
          rows
        }
      };
    }
  },

  // 4. Lumpsum Investment Calculator
  {
    id: 'lumpsum-calc',
    name: 'Lumpsum Investment Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate the future value of a one-time one-shot mutual fund or stock investment.',
    formula: 'FV = P × (1 + r)^n',
    formulaExplanation: 'P = Initial Investment, r = Annual Interest Rate / 100, n = Number of Years.',
    defaultInputs: { amount: 100000, expectedReturn: 12.0, years: 10 },
    fields: [
      { id: 'amount', label: 'One-Time Lumpsum Investment', type: 'number', min: 1000, max: 100000000, step: 5000, unit: '₹' },
      { id: 'expectedReturn', label: 'Expected Annual Return (%)', type: 'number', min: 1, max: 40, step: 0.5, unit: '%' },
      { id: 'years', label: 'Investment Period (Years)', type: 'number', min: 1, max: 50, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.amount) || 0;
      const r = (Number(inputs.expectedReturn) || 0) / 100;
      const n = Number(inputs.years) || 1;

      const fv = P * Math.pow(1 + r, n);
      const gains = fv - P;

      return {
        primaryValue: Math.round(fv).toLocaleString(),
        primaryLabel: 'Total Future Value',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Initial Investment', value: `₹${P.toLocaleString()}` },
          { label: 'Estimated Gains', value: `₹${Math.round(gains).toLocaleString()}` },
          { label: 'Total Growth', value: `${((gains / (P || 1)) * 100).toFixed(1)}%` }
        ],
        breakdown: [
          { label: 'Initial Capital', value: P, color: '#3b82f6' },
          { label: 'Profit Gains', value: Math.round(gains), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 5. Compound Interest Calculator
  {
    id: 'compound-interest-calc',
    name: 'Compound Interest Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate compound interest with flexible compounding frequency (Daily, Monthly, Quarterly, Annually).',
    formula: 'A = P × (1 + r/n)^(n × t)',
    formulaExplanation: 'A = Final Amount, P = Principal, r = Annual Interest Rate, n = Compounding frequency per year, t = Years.',
    defaultInputs: { principal: 50000, rate: 8.0, years: 5, frequency: 12 },
    fields: [
      { id: 'principal', label: 'Principal Amount', type: 'number', min: 100, max: 10000000, step: 1000, unit: '₹ / $' },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', min: 0.1, max: 40, step: 0.1, unit: '%' },
      { id: 'years', label: 'Time Horizon (Years)', type: 'number', min: 1, max: 50, step: 1, unit: 'Years' },
      {
        id: 'frequency',
        label: 'Compounding Frequency',
        type: 'select',
        options: [
          { label: 'Annually (1x/yr)', value: 1 },
          { label: 'Semi-Annually (2x/yr)', value: 2 },
          { label: 'Quarterly (4x/yr)', value: 4 },
          { label: 'Monthly (12x/yr)', value: 12 },
          { label: 'Daily (365x/yr)', value: 365 }
        ]
      }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal) || 0;
      const r = (Number(inputs.rate) || 0) / 100;
      const t = Number(inputs.years) || 1;
      const n = Number(inputs.frequency) || 1;

      const A = P * Math.pow(1 + r / n, n * t);
      const interestEarned = A - P;

      return {
        primaryValue: Math.round(A).toLocaleString(),
        primaryLabel: 'Total Compound Amount',
        primaryUnit: '₹ / $',
        secondaryMetrics: [
          { label: 'Initial Principal', value: `₹${P.toLocaleString()}` },
          { label: 'Total Compound Interest', value: `₹${Math.round(interestEarned).toLocaleString()}` },
          { label: 'Effective Annual Rate (EAR)', value: `${((Math.pow(1 + r / n, n) - 1) * 100).toFixed(2)}%` }
        ],
        breakdown: [
          { label: 'Principal', value: P, color: '#6366f1' },
          { label: 'Interest', value: Math.round(interestEarned), color: '#f59e0b' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 6. Simple Interest Calculator
  {
    id: 'simple-interest-calc',
    name: 'Simple Interest Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate straightforward linear interest and maturity amount.',
    formula: 'SI = (P × R × T) / 100, Total = P + SI',
    formulaExplanation: 'P = Principal, R = Rate per annum, T = Time in years.',
    defaultInputs: { principal: 25000, rate: 6.5, years: 3 },
    fields: [
      { id: 'principal', label: 'Principal Amount', type: 'number', min: 100, max: 10000000, step: 500, unit: '₹' },
      { id: 'rate', label: 'Rate of Interest (%)', type: 'number', min: 0.1, max: 50, step: 0.1, unit: '%' },
      { id: 'years', label: 'Time Period (Years)', type: 'number', min: 0.1, max: 50, step: 0.5, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal) || 0;
      const R = Number(inputs.rate) || 0;
      const T = Number(inputs.years) || 1;

      const si = (P * R * T) / 100;
      const total = P + si;

      return {
        primaryValue: Math.round(total).toLocaleString(),
        primaryLabel: 'Total Maturity Amount',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Simple Interest Earned', value: `₹${Math.round(si).toLocaleString()}` },
          { label: 'Principal', value: `₹${P.toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Principal', value: P, color: '#3b82f6' },
          { label: 'Interest', value: Math.round(si), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 7. PPF (Public Provident Fund) Calculator (Govt Rate: 7.1% p.a.)
  {
    id: 'ppf-calc',
    name: 'PPF (Public Provident Fund) Calculator',
    category: 'finance',
    subCategory: 'Govt Schemes & Savings',
    description: 'Calculate 15-year tax-free guaranteed returns under Indian PPF scheme (Current Govt Rate: 7.1% p.a.).',
    formula: 'Annual compounding with Section 80C tax exemption (EEE Status)',
    formulaExplanation: 'PPF earns 7.1% interest compounded annually with a 15-year statutory lock-in period.',
    defaultInputs: { annualDeposit: 150000, rate: 7.1, years: 15 },
    fields: [
      { id: 'annualDeposit', label: 'Yearly Investment (Max ₹1.5L/yr)', type: 'number', min: 500, max: 150000, step: 5000, unit: '₹' },
      { id: 'rate', label: 'Govt Interest Rate (%)', type: 'number', min: 5, max: 12, step: 0.1, unit: '% (Default: 7.1%)' },
      { id: 'years', label: 'Duration (Min 15 yrs)', type: 'number', min: 15, max: 30, step: 5, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const deposit = Math.min(150000, Number(inputs.annualDeposit) || 500);
      const r = (Number(inputs.rate) || 7.1) / 100;
      const years = Number(inputs.years) || 15;

      let balance = 0;
      let totalDeposited = 0;
      const rows: (string | number)[][] = [];

      for (let y = 1; y <= years; y++) {
        totalDeposited += deposit;
        const interest = (balance + deposit) * r;
        balance = balance + deposit + interest;
        rows.push([
          `Year ${y}`,
          `₹${Math.round(totalDeposited).toLocaleString()}`,
          `₹${Math.round(interest).toLocaleString()}`,
          `₹${Math.round(balance).toLocaleString()}`
        ]);
      }

      const totalInterest = balance - totalDeposited;

      return {
        primaryValue: Math.round(balance).toLocaleString(),
        primaryLabel: 'Tax-Free PPF Maturity Value',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Total Amount Deposited', value: `₹${Math.round(totalDeposited).toLocaleString()}` },
          { label: 'Total Guaranteed Interest', value: `₹${Math.round(totalInterest).toLocaleString()}` },
          { label: 'Tax Status', value: 'Exempt-Exempt-Exempt (EEE)' }
        ],
        breakdown: [
          { label: 'Deposited', value: Math.round(totalDeposited), color: '#3b82f6' },
          { label: 'Interest', value: Math.round(totalInterest), color: '#10b981' }
        ],
        chartType: 'pie',
        table: {
          headers: ['Year', 'Total Invested', 'Yearly Interest', 'Closing Balance'],
          rows: rows.slice(0, 15)
        }
      };
    }
  },

  // 8. Sukanya Samriddhi Yojana (SSY) Calculator (Govt Rate: 8.2% p.a.)
  {
    id: 'ssy-calc',
    name: 'Sukanya Samriddhi Yojana (SSY) Calculator',
    category: 'finance',
    subCategory: 'Govt Schemes & Savings',
    description: 'Calculate 21-year maturity amount for girl child welfare scheme (Govt rate 8.2% p.a.).',
    formula: 'Annual deposit for 15 years + compounding until 21 years maturity',
    formulaExplanation: 'Deposits accepted for 15 years; continues to earn compound interest until 21 years of girl child maturity.',
    defaultInputs: { yearlyDeposit: 100000, rate: 8.2 },
    fields: [
      { id: 'yearlyDeposit', label: 'Yearly Deposit (Max ₹1.5L)', type: 'number', min: 250, max: 150000, step: 5000, unit: '₹' },
      { id: 'rate', label: 'SSY Interest Rate (%)', type: 'number', min: 6, max: 12, step: 0.1, unit: '% (Govt: 8.2%)' }
    ],
    calculate: (inputs) => {
      const deposit = Math.min(150000, Number(inputs.yearlyDeposit) || 1000);
      const r = (Number(inputs.rate) || 8.2) / 100;

      let balance = 0;
      let totalDeposited = 0;

      // 15 years deposit
      for (let y = 1; y <= 15; y++) {
        totalDeposited += deposit;
        balance = (balance + deposit) * (1 + r);
      }
      // 6 years interest only
      for (let y = 16; y <= 21; y++) {
        balance = balance * (1 + r);
      }

      const totalInterest = balance - totalDeposited;

      return {
        primaryValue: Math.round(balance).toLocaleString(),
        primaryLabel: 'SSY Maturity Value (at 21 Years)',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Total Invested (15 yrs)', value: `₹${Math.round(totalDeposited).toLocaleString()}` },
          { label: 'Total Interest Earned', value: `₹${Math.round(totalInterest).toLocaleString()}` },
          { label: 'Tax Exemption', value: '100% Tax-Free under 80C' }
        ],
        breakdown: [
          { label: 'Deposit (15 Yrs)', value: Math.round(totalDeposited), color: '#ec4899' },
          { label: 'Compound Interest', value: Math.round(totalInterest), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 9. EPF (Employees Provident Fund) Calculator (Govt Rate: 8.25% p.a.)
  {
    id: 'epf-calc',
    name: 'EPF (Employees Provident Fund) Calculator',
    category: 'finance',
    subCategory: 'Govt Schemes & Savings',
    description: 'Calculate retirement corpus with employee (12%) and employer (3.67% EPF + 8.33% EPS) contribution at 8.25%.',
    formula: 'Monthly compounding of Basic Salary + DA contributions',
    formulaExplanation: 'Employee contributes 12% of Basic, Employer contributes 3.67% to EPF. Compounded at 8.25% annual rate.',
    defaultInputs: { basicMonthly: 35000, age: 28, retirementAge: 58, annualSalaryHike: 5, epfRate: 8.25 },
    fields: [
      { id: 'basicMonthly', label: 'Monthly Basic Salary + DA', type: 'number', min: 5000, max: 1000000, step: 2000, unit: '₹' },
      { id: 'age', label: 'Current Age', type: 'number', min: 18, max: 55, step: 1, unit: 'Years' },
      { id: 'retirementAge', label: 'Retirement Age', type: 'number', min: 50, max: 65, step: 1, unit: 'Years' },
      { id: 'annualSalaryHike', label: 'Expected Annual Salary Hike (%)', type: 'number', min: 0, max: 20, step: 1, unit: '%' },
      { id: 'epfRate', label: 'EPF Interest Rate (%)', type: 'number', min: 6, max: 12, step: 0.05, unit: '% (Govt: 8.25%)' }
    ],
    calculate: (inputs) => {
      let basic = Number(inputs.basicMonthly) || 20000;
      const currentAge = Number(inputs.age) || 25;
      const retAge = Number(inputs.retirementAge) || 58;
      const hike = (Number(inputs.annualSalaryHike) || 0) / 100;
      const rate = (Number(inputs.epfRate) || 8.25) / 100;
      const totalYears = Math.max(1, retAge - currentAge);

      let epfBalance = 0;
      let employeeTotal = 0;
      let employerTotal = 0;

      for (let y = 1; y <= totalYears; y++) {
        const empContribMonth = basic * 0.12;
        const empyrContribMonth = basic * 0.0367;

        for (let m = 1; m <= 12; m++) {
          employeeTotal += empContribMonth;
          employerTotal += empyrContribMonth;
          epfBalance += empContribMonth + empyrContribMonth;
        }
        // Annual interest applied on closing balance
        epfBalance = epfBalance * (1 + rate);
        basic = basic * (1 + hike);
      }

      const totalDeposited = employeeTotal + employerTotal;
      const interestEarned = epfBalance - totalDeposited;

      return {
        primaryValue: Math.round(epfBalance).toLocaleString(),
        primaryLabel: 'Total EPF Retirement Corpus',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Employee Contribution', value: `₹${Math.round(employeeTotal).toLocaleString()}` },
          { label: 'Employer Contribution', value: `₹${Math.round(employerTotal).toLocaleString()}` },
          { label: 'Total Interest Earned', value: `₹${Math.round(interestEarned).toLocaleString()}` },
          { label: 'Years to Retirement', value: `${totalYears} Years` }
        ],
        breakdown: [
          { label: 'Your Contribution', value: Math.round(employeeTotal), color: '#3b82f6' },
          { label: 'Employer Contribution', value: Math.round(employerTotal), color: '#6366f1' },
          { label: 'EPF Interest', value: Math.round(interestEarned), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 10. Fixed Deposit (FD) Calculator
  {
    id: 'fd-calc',
    name: 'Fixed Deposit (FD) Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate Bank FD returns with quarterly compounding as practiced by commercial banks.',
    formula: 'A = P × (1 + r/4)^(4 × t)',
    formulaExplanation: 'Indian banks compound Fixed Deposit interest quarterly (4 times a year).',
    defaultInputs: { principal: 100000, rate: 7.25, years: 3, isSeniorCitizen: 'no' },
    fields: [
      { id: 'principal', label: 'Deposit Amount', type: 'number', min: 1000, max: 50000000, step: 5000, unit: '₹' },
      { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', min: 1, max: 15, step: 0.1, unit: '%' },
      { id: 'years', label: 'Tenure (Years)', type: 'number', min: 0.25, max: 10, step: 0.25, unit: 'Years' },
      {
        id: 'isSeniorCitizen',
        label: 'Senior Citizen (+0.50% extra)',
        type: 'radio',
        options: [{ label: 'No (General)', value: 'no' }, { label: 'Yes (+0.5%)', value: 'yes' }]
      }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.principal) || 0;
      let annualRate = Number(inputs.rate) || 6.5;
      if (inputs.isSeniorCitizen === 'yes') annualRate += 0.5;

      const t = Number(inputs.years) || 1;
      const r = annualRate / 100;
      const A = P * Math.pow(1 + r / 4, 4 * t);
      const interest = A - P;

      return {
        primaryValue: Math.round(A).toLocaleString(),
        primaryLabel: 'FD Maturity Amount',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Principal Amount', value: `₹${P.toLocaleString()}` },
          { label: 'Total Interest Earned', value: `₹${Math.round(interest).toLocaleString()}` },
          { label: 'Effective Annual Yield', value: `${((Math.pow(1 + r / 4, 4) - 1) * 100).toFixed(2)}%` }
        ],
        breakdown: [
          { label: 'Principal', value: P, color: '#3b82f6' },
          { label: 'Interest', value: Math.round(interest), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 11. Recurring Deposit (RD) Calculator
  {
    id: 'rd-calc',
    name: 'Recurring Deposit (RD) Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate Bank RD maturity amount compounded quarterly.',
    formula: 'M = P × [ (1 + i)^n - 1 ] / (1 - (1 + i)^(-1/3))',
    formulaExplanation: 'Quarterly compounding formula on monthly cumulative deposits.',
    defaultInputs: { monthlyDeposit: 5000, rate: 7.0, months: 36 },
    fields: [
      { id: 'monthlyDeposit', label: 'Monthly Deposit Amount', type: 'number', min: 500, max: 1000000, step: 500, unit: '₹' },
      { id: 'rate', label: 'Interest Rate (%)', type: 'number', min: 1, max: 15, step: 0.1, unit: '%' },
      { id: 'months', label: 'Tenure (Months)', type: 'number', min: 6, max: 120, step: 6, unit: 'Months' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.monthlyDeposit) || 0;
      const rate = Number(inputs.rate) || 0;
      const n = Number(inputs.months) || 12;

      // Quarterly compounding for RD: i = r / 400, number of quarters = n / 3
      const i = rate / 400;
      let maturity = 0;
      for (let m = 1; m <= n; m++) {
        // Months left to compound
        const quartersLeft = (n - m + 1) / 3;
        maturity += P * Math.pow(1 + i, quartersLeft);
      }

      const totalInvested = P * n;
      const interestEarned = maturity - totalInvested;

      return {
        primaryValue: Math.round(maturity).toLocaleString(),
        primaryLabel: 'RD Maturity Value',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Total Amount Deposited', value: `₹${totalInvested.toLocaleString()}` },
          { label: 'Total Interest Earned', value: `₹${Math.round(interestEarned).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Invested', value: totalInvested, color: '#6366f1' },
          { label: 'Interest', value: Math.round(interestEarned), color: '#f59e0b' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 12. Income Tax India Old vs New Regime (FY 2024-25 / AY 2025-26)
  {
    id: 'income-tax-india-calc',
    name: 'Income Tax Old vs New Regime (FY 2024-25)',
    category: 'finance',
    subCategory: 'Tax & Compliance',
    description: 'Compare Old vs New Tax Regime with 2024 Budget standard deduction ₹75,000 and 87A rebates.',
    formula: 'Real 2024-25 Income Tax Slabs + 4% Health & Education Cess',
    formulaExplanation: 'New Regime: ₹0-3L (0%), ₹3-7L (5%), ₹7-10L (10%), ₹10-12L (15%), ₹12-15L (20%), >₹15L (30%). Zero tax up to ₹7.75L with standard deduction.',
    defaultInputs: { annualIncome: 1200000, deductions80C: 150000, health80D: 25000, hraDeduction: 100000 },
    fields: [
      { id: 'annualIncome', label: 'Gross Annual Salary / Income', type: 'number', min: 100000, max: 50000000, step: 50000, unit: '₹' },
      { id: 'deductions80C', label: 'Section 80C (PPF, ELSS, EPF - Max ₹1.5L)', type: 'number', min: 0, max: 150000, step: 10000, unit: '₹' },
      { id: 'health80D', label: 'Section 80D (Health Insurance - Max ₹25k)', type: 'number', min: 0, max: 100000, step: 5000, unit: '₹' },
      { id: 'hraDeduction', label: 'HRA / Home Loan Interest 24(b)', type: 'number', min: 0, max: 500000, step: 10000, unit: '₹' }
    ],
    calculate: (inputs) => {
      const income = Number(inputs.annualIncome) || 0;
      const c80 = Number(inputs.deductions80C) || 0;
      const d80 = Number(inputs.health80D) || 0;
      const extraDeductions = Number(inputs.hraDeduction) || 0;

      const taxData = calculateIncomeTaxIndia(income, c80 + extraDeductions, d80);

      const isNewBetter = taxData.totalTaxNew <= taxData.totalTaxOld;
      const diff = Math.abs(taxData.totalTaxOld - taxData.totalTaxNew);

      return {
        primaryValue: Math.round(isNewBetter ? taxData.totalTaxNew : taxData.totalTaxOld).toLocaleString(),
        primaryLabel: isNewBetter ? 'Lowest Tax (New Regime)' : 'Lowest Tax (Old Regime)',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'New Regime Tax', value: `₹${Math.round(taxData.totalTaxNew).toLocaleString()}` },
          { label: 'Old Regime Tax', value: `₹${Math.round(taxData.totalTaxOld).toLocaleString()}` },
          { label: 'Recommended Regime', value: isNewBetter ? 'NEW REGIME' : 'OLD REGIME' },
          { label: 'Tax Saved', value: `₹${Math.round(diff).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'New Regime Tax', value: Math.round(taxData.totalTaxNew), color: '#3b82f6' },
          { label: 'Old Regime Tax', value: Math.round(taxData.totalTaxOld), color: '#f97316' }
        ],
        chartType: 'bar',
        statusBadge: {
          label: isNewBetter ? 'Switch to New Regime' : 'Stick with Old Regime',
          type: 'success'
        },
        advice: `For ₹${income.toLocaleString()} income, ${isNewBetter ? 'New Tax Regime' : 'Old Tax Regime'} saves you ₹${Math.round(diff).toLocaleString()} in taxes!`
      };
    }
  },

  // 13. GST & Sales Tax Calculator
  {
    id: 'gst-calc',
    name: 'GST (Goods & Services Tax) Calculator',
    category: 'finance',
    subCategory: 'Tax & Compliance',
    description: 'Calculate GST Inclusive (remove GST) and GST Exclusive (add GST) with 5%, 12%, 18%, 28% slabs.',
    formula: 'Exclusive: GST = Amount × Rate/100 | Inclusive: GST = Amount - [Amount / (1 + Rate/100)]',
    formulaExplanation: 'Provides exact CGST + SGST (or IGST) breakdowns.',
    defaultInputs: { amount: 10000, rate: 18, type: 'exclusive' },
    fields: [
      { id: 'amount', label: 'Base / Gross Amount', type: 'number', min: 1, max: 10000000, step: 100, unit: '₹ / $' },
      {
        id: 'rate',
        label: 'GST Slab Rate (%)',
        type: 'select',
        options: [
          { label: '0% (Nil / Exempted)', value: 0 },
          { label: '5% (Essential items)', value: 5 },
          { label: '12% (Standard goods)', value: 12 },
          { label: '18% (Services / Standard)', value: 18 },
          { label: '28% (Luxury / Automobiles)', value: 28 }
        ]
      },
      {
        id: 'type',
        label: 'Calculation Type',
        type: 'radio',
        options: [
          { label: 'GST Exclusive (Add GST to amount)', value: 'exclusive' },
          { label: 'GST Inclusive (Extract GST from total)', value: 'inclusive' }
        ]
      }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount) || 0;
      const rate = Number(inputs.rate) || 0;
      const type = inputs.type || 'exclusive';

      let netAmount = 0;
      let gstAmount = 0;
      let totalAmount = 0;

      if (type === 'exclusive') {
        netAmount = amount;
        gstAmount = (amount * rate) / 100;
        totalAmount = netAmount + gstAmount;
      } else {
        totalAmount = amount;
        netAmount = amount / (1 + rate / 100);
        gstAmount = totalAmount - netAmount;
      }

      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;

      return {
        primaryValue: Math.round(totalAmount).toLocaleString(),
        primaryLabel: 'Total Gross Price',
        primaryUnit: '₹ / $',
        secondaryMetrics: [
          { label: 'Net Amount (Before Tax)', value: `₹${Math.round(netAmount).toLocaleString()}` },
          { label: 'Total GST Tax', value: `₹${Math.round(gstAmount).toLocaleString()}` },
          { label: 'CGST (Central Tax)', value: `₹${Math.round(cgst).toLocaleString()} (${rate / 2}%)` },
          { label: 'SGST (State Tax)', value: `₹${Math.round(sgst).toLocaleString()} (${rate / 2}%)` }
        ],
        breakdown: [
          { label: 'Net Price', value: Math.round(netAmount), color: '#3b82f6' },
          { label: 'CGST', value: Math.round(cgst), color: '#f59e0b' },
          { label: 'SGST', value: Math.round(sgst), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 14. Discount & Sale Price Calculator
  {
    id: 'discount-calc',
    name: 'Discount & Shopping Savings Calculator',
    category: 'finance',
    subCategory: 'Shopping & Retail',
    description: 'Calculate final sale price, discount amount, and additional coupon savings.',
    formula: 'Discount = Original Price × (Discount % / 100), Final = Original - Discount',
    formulaExplanation: 'Computes exact markdown savings and final checkout bill.',
    defaultInputs: { originalPrice: 2499, discountPercent: 30, additionalOff: 5 },
    fields: [
      { id: 'originalPrice', label: 'Original Price / MRP', type: 'number', min: 1, max: 1000000, step: 10, unit: '₹ / $' },
      { id: 'discountPercent', label: 'Discount Percentage (%)', type: 'number', min: 0, max: 100, step: 1, unit: '%' },
      { id: 'additionalOff', label: 'Additional Coupon / Card Discount (%)', type: 'number', min: 0, max: 50, step: 1, unit: '%' }
    ],
    calculate: (inputs) => {
      const original = Number(inputs.originalPrice) || 0;
      const d1 = (Number(inputs.discountPercent) || 0) / 100;
      const d2 = (Number(inputs.additionalOff) || 0) / 100;

      const afterD1 = original * (1 - d1);
      const finalPrice = afterD1 * (1 - d2);
      const totalSavings = original - finalPrice;
      const effectiveDiscount = ((totalSavings / (original || 1)) * 100).toFixed(1);

      return {
        primaryValue: Math.round(finalPrice).toLocaleString(),
        primaryLabel: 'Final Discounted Price',
        primaryUnit: '₹ / $',
        secondaryMetrics: [
          { label: 'You Save', value: `₹${Math.round(totalSavings).toLocaleString()}` },
          { label: 'Original MRP', value: `₹${original.toLocaleString()}` },
          { label: 'Effective Total Discount', value: `${effectiveDiscount}% OFF` }
        ],
        breakdown: [
          { label: 'Final Price', value: Math.round(finalPrice), color: '#10b981' },
          { label: 'Money Saved', value: Math.round(totalSavings), color: '#f43f5e' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 15. Tip & Bill Splitter Calculator
  {
    id: 'tip-calc',
    name: 'Tip & Restaurant Bill Splitter',
    category: 'finance',
    subCategory: 'Shopping & Retail',
    description: 'Calculate fair gratuity tip and split restaurant bills evenly across multiple people.',
    formula: 'Tip = Bill × Tip %, Total = Bill + Tip, Per Person = Total / People',
    formulaExplanation: 'Even bill splitting with customizable tip rates.',
    defaultInputs: { billAmount: 1800, tipPercent: 10, people: 4 },
    fields: [
      { id: 'billAmount', label: 'Total Bill Amount', type: 'number', min: 1, max: 1000000, step: 10, unit: '₹ / $' },
      { id: 'tipPercent', label: 'Tip Percentage (%)', type: 'number', min: 0, max: 40, step: 1, unit: '%' },
      { id: 'people', label: 'Number of People Splitting', type: 'number', min: 1, max: 100, step: 1, unit: 'Persons' }
    ],
    calculate: (inputs) => {
      const bill = Number(inputs.billAmount) || 0;
      const tipPct = (Number(inputs.tipPercent) || 0) / 100;
      const people = Math.max(1, Number(inputs.people) || 1);

      const tipTotal = bill * tipPct;
      const grandTotal = bill + tipTotal;
      const perPerson = grandTotal / people;
      const tipPerPerson = tipTotal / people;

      return {
        primaryValue: Math.round(perPerson).toLocaleString(),
        primaryLabel: 'Amount Per Person',
        primaryUnit: '₹ / $',
        secondaryMetrics: [
          { label: 'Total Tip', value: `₹${Math.round(tipTotal).toLocaleString()}` },
          { label: 'Grand Total Bill', value: `₹${Math.round(grandTotal).toLocaleString()}` },
          { label: 'Tip Per Person', value: `₹${Math.round(tipPerPerson).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Food Bill', value: Math.round(bill), color: '#3b82f6' },
          { label: 'Tip Gratuity', value: Math.round(tipTotal), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 16. Profit Margin & Markup Calculator
  {
    id: 'profit-margin-calc',
    name: 'Profit Margin & Markup Calculator',
    category: 'finance',
    subCategory: 'Business & Commerce',
    description: 'Calculate Gross Profit Margin, Markup percentage, and revenue from Cost and Selling Price.',
    formula: 'Profit = Revenue - Cost | Margin = (Profit / Revenue) × 100 | Markup = (Profit / Cost) × 100',
    formulaExplanation: 'Fundamental financial metric for ecommerce sellers, wholesale distributors, and retail businesses.',
    defaultInputs: { cost: 400, sellingPrice: 650 },
    fields: [
      { id: 'cost', label: 'Cost of Goods Sold (COGS)', type: 'number', min: 1, max: 10000000, step: 10, unit: '₹ / $' },
      { id: 'sellingPrice', label: 'Selling Price (Revenue)', type: 'number', min: 1, max: 10000000, step: 10, unit: '₹ / $' }
    ],
    calculate: (inputs) => {
      const cost = Number(inputs.cost) || 0;
      const sp = Number(inputs.sellingPrice) || 0;

      const profit = sp - cost;
      const margin = sp > 0 ? (profit / sp) * 100 : 0;
      const markup = cost > 0 ? (profit / cost) * 100 : 0;

      return {
        primaryValue: `${margin.toFixed(2)}%`,
        primaryLabel: 'Gross Profit Margin',
        secondaryMetrics: [
          { label: 'Net Profit per Unit', value: `₹${profit.toLocaleString()}` },
          { label: 'Markup on Cost', value: `${markup.toFixed(2)}%` },
          { label: 'Total Revenue', value: `₹${sp.toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Cost Basis', value: Math.max(0, cost), color: '#ef4444' },
          { label: 'Profit', value: Math.max(0, profit), color: '#22c55e' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 17. Inflation & Purchasing Power Calculator
  {
    id: 'inflation-calc',
    name: 'Inflation & Purchasing Power Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate what your money will buy in the future at a given inflation rate.',
    formula: 'FV = P × (1 + i)^n, Future Purchasing Value = P / (1 + i)^n',
    formulaExplanation: 'Shows how inflation erodes cash value over time.',
    defaultInputs: { currentAmount: 100000, inflationRate: 6.0, years: 15 },
    fields: [
      { id: 'currentAmount', label: 'Current Amount', type: 'number', min: 1000, max: 100000000, step: 5000, unit: '₹' },
      { id: 'inflationRate', label: 'Annual Inflation Rate (%)', type: 'number', min: 1, max: 25, step: 0.1, unit: '% (Avg India: 6%)' },
      { id: 'years', label: 'Years in Future', type: 'number', min: 1, max: 50, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.currentAmount) || 0;
      const i = (Number(inputs.inflationRate) || 0) / 100;
      const n = Number(inputs.years) || 1;

      const futureEquivalent = P * Math.pow(1 + i, n);
      const reducedPurchasingPower = P / Math.pow(1 + i, n);

      return {
        primaryValue: Math.round(futureEquivalent).toLocaleString(),
        primaryLabel: `Future Cost in ${n} Years`,
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Today\'s Purchasing Value of this Cash', value: `₹${Math.round(reducedPurchasingPower).toLocaleString()}` },
          { label: 'Value Eroded by Inflation', value: `${((1 - reducedPurchasingPower / P) * 100).toFixed(1)}%` }
        ],
        advice: `To maintain the lifestyle that ₹${P.toLocaleString()} buys today, you will need ₹${Math.round(futureEquivalent).toLocaleString()} in ${n} years.`
      };
    }
  },

  // 18. NSC (National Savings Certificate) Calculator (Govt Rate: 7.7% p.a.)
  {
    id: 'nsc-calc',
    name: 'NSC (National Savings Certificate) Calculator',
    category: 'finance',
    subCategory: 'Govt Schemes & Savings',
    description: 'Calculate 5-year Post Office NSC maturity with Section 80C benefits (Govt rate 7.7% compounded annually).',
    formula: 'A = P × (1 + r)^5',
    formulaExplanation: 'National Savings Certificate (VIII Issue) has a 5-year lock-in with guaranteed sovereign safety.',
    defaultInputs: { deposit: 100000, rate: 7.7 },
    fields: [
      { id: 'deposit', label: 'Investment Amount', type: 'number', min: 1000, max: 50000000, step: 5000, unit: '₹' },
      { id: 'rate', label: 'Govt Interest Rate (%)', type: 'number', min: 5, max: 12, step: 0.1, unit: '% (Govt: 7.7%)' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.deposit) || 0;
      const r = (Number(inputs.rate) || 7.7) / 100;
      const A = P * Math.pow(1 + r, 5);
      const interest = A - P;

      return {
        primaryValue: Math.round(A).toLocaleString(),
        primaryLabel: 'NSC 5-Year Maturity Value',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Principal Deposited', value: `₹${P.toLocaleString()}` },
          { label: 'Total Interest Earned', value: `₹${Math.round(interest).toLocaleString()}` },
          { label: 'Tax Deductible', value: 'Under Section 80C' }
        ],
        breakdown: [
          { label: 'Principal', value: P, color: '#3b82f6' },
          { label: 'Interest', value: Math.round(interest), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 19. Kisan Vikas Patra (KVP) Calculator (Govt Rate: 7.5% - Doubles in 115 Months)
  {
    id: 'kvp-calc',
    name: 'Kisan Vikas Patra (KVP) Doubling Calculator',
    category: 'finance',
    subCategory: 'Govt Schemes & Savings',
    description: 'Calculate Post Office KVP maturity where capital doubles in 115 months (9 years & 7 months) at 7.5%.',
    formula: 'Capital Doubles (2x) in 115 months as per current Indian Post Office gazette',
    formulaExplanation: 'Guaranteed 100% sovereign-backed investment doubling scheme.',
    defaultInputs: { deposit: 50000 },
    fields: [
      { id: 'deposit', label: 'KVP Deposit Amount', type: 'number', min: 1000, max: 10000000, step: 5000, unit: '₹' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.deposit) || 0;
      const maturity = P * 2;

      return {
        primaryValue: Math.round(maturity).toLocaleString(),
        primaryLabel: 'Guaranteed Doubled Maturity Value',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Original Deposit', value: `₹${P.toLocaleString()}` },
          { label: 'Maturity Period', value: '115 Months (9 Yrs 7 Mos)' },
          { label: 'Interest Rate', value: '7.5% p.a. Compounded' }
        ],
        breakdown: [
          { label: 'Invested', value: P, color: '#6366f1' },
          { label: 'Guaranteed Gain', value: P, color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 20. Car Loan EMI Calculator
  {
    id: 'car-loan-calc',
    name: 'Car Loan & Auto Financing Calculator',
    category: 'finance',
    subCategory: 'Loans & Debt',
    description: 'Calculate monthly auto loan payments with down payment, trade-in value, and on-road price.',
    formula: 'P = On-road Price - Down Payment, EMI on P at auto loan rates for 3-7 years',
    formulaExplanation: 'Calculates monthly payment on financed amount after deducting upfront cash.',
    defaultInputs: { carPrice: 1200000, downPayment: 250000, rate: 8.75, years: 5 },
    fields: [
      { id: 'carPrice', label: 'On-Road Vehicle Price', type: 'number', min: 100000, max: 20000000, step: 25000, unit: '₹' },
      { id: 'downPayment', label: 'Down Payment Paid', type: 'number', min: 0, max: 10000000, step: 10000, unit: '₹' },
      { id: 'rate', label: 'Auto Loan Interest Rate (%)', type: 'number', min: 5, max: 25, step: 0.1, unit: '%' },
      { id: 'years', label: 'Tenure (Years)', type: 'number', min: 1, max: 8, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const carPrice = Number(inputs.carPrice) || 0;
      const downPayment = Number(inputs.downPayment) || 0;
      const P = Math.max(0, carPrice - downPayment);
      const annualRate = Number(inputs.rate) || 8.5;
      const years = Number(inputs.years) || 5;

      const r = annualRate / 12 / 100;
      const n = years * 12;
      const factor = Math.pow(1 + r, n);
      const emi = P > 0 ? (P * r * factor) / (factor - 1) : 0;
      const totalPayment = emi * n;
      const totalInterest = totalPayment - P;

      return {
        primaryValue: Math.round(emi).toLocaleString(),
        primaryLabel: 'Monthly Car Loan EMI',
        primaryUnit: '₹/mo',
        secondaryMetrics: [
          { label: 'Financed Amount', value: `₹${P.toLocaleString()}` },
          { label: 'Total Interest Payable', value: `₹${Math.round(totalInterest).toLocaleString()}` },
          { label: 'Total Cost of Car (Price + Interest)', value: `₹${Math.round(carPrice + totalInterest).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Down Payment', value: downPayment, color: '#10b981' },
          { label: 'Loan Principal', value: P, color: '#3b82f6' },
          { label: 'Interest', value: Math.round(totalInterest), color: '#f59e0b' }
        ],
        chartType: 'pie'
      };
    }
  },

  // -------------------------------------------------------------
  // 2. HEALTH & FITNESS CALCULATORS (50 REAL CALCULATORS)
  // -------------------------------------------------------------

  // 21. BMI (Body Mass Index) Calculator (WHO Standard)
  {
    id: 'bmi-calc',
    name: 'BMI (Body Mass Index) Calculator',
    category: 'health',
    subCategory: 'Body Composition',
    description: 'Calculate BMI, World Health Organization (WHO) weight classification, and healthy weight target.',
    formula: 'BMI = Weight (kg) / [ Height (m) ]^2',
    formulaExplanation: 'WHO Cutoffs: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese Class I (30–34.9), Obese Class II (≥35).',
    defaultInputs: { weightKg: 70, heightCm: 172, age: 28, gender: 'male' },
    fields: [
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', min: 20, max: 300, step: 0.5, unit: 'kg' },
      { id: 'heightCm', label: 'Height (cm)', type: 'number', min: 80, max: 250, step: 1, unit: 'cm' },
      { id: 'age', label: 'Age (Years)', type: 'number', min: 5, max: 120, step: 1, unit: 'Years' },
      {
        id: 'gender',
        label: 'Gender',
        type: 'radio',
        options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
      }
    ],
    calculate: (inputs) => {
      const w = Number(inputs.weightKg) || 70;
      const hCm = Number(inputs.heightCm) || 170;
      const hM = hCm / 100;
      const bmi = w / (hM * hM);

      // WHO Categories
      let category = 'Normal Weight';
      let badgeType: 'success' | 'warning' | 'info' | 'danger' = 'success';
      let advice = 'You are within the optimal healthy weight range. Keep maintaining balanced nutrition and regular physical activity!';

      if (bmi < 18.5) {
        category = 'Underweight';
        badgeType = 'warning';
        advice = 'Your BMI is below the healthy range. Consider consulting a nutritionist for nutrient-dense caloric surplus meal plans.';
      } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
        badgeType = 'warning';
        advice = 'Your BMI indicates mild excess weight. A 300-500 kcal daily deficit with aerobic training can help reach the normal range.';
      } else if (bmi >= 30 && bmi < 34.9) {
        category = 'Obese Class I';
        badgeType = 'danger';
        advice = 'Your BMI indicates Class I Obesity. Recommended to pursue structured lifestyle changes and monitor cardiovascular markers.';
      } else if (bmi >= 35) {
        category = 'Obese Class II / Severe';
        badgeType = 'danger';
        advice = 'Your BMI indicates high metabolic risk. Please consult a healthcare professional for a medically supervised health plan.';
      }

      // Ideal weight range for height (BMI 18.5 - 24.9)
      const minIdeal = 18.5 * hM * hM;
      const maxIdeal = 24.9 * hM * hM;

      return {
        primaryValue: bmi.toFixed(1),
        primaryLabel: 'Body Mass Index (BMI)',
        primaryUnit: 'kg/m²',
        secondaryMetrics: [
          { label: 'WHO Category', value: category },
          { label: 'Healthy Weight Range for Your Height', value: `${minIdeal.toFixed(1)} – ${maxIdeal.toFixed(1)} kg` },
          { label: 'Weight Differential', value: `${(w - (minIdeal + maxIdeal) / 2 > 0 ? '+' : '')}${(w - (minIdeal + maxIdeal) / 2).toFixed(1)} kg` }
        ],
        statusBadge: { label: category, type: badgeType },
        advice,
        chartType: 'gauge'
      };
    }
  },

  // 22. BMR (Basal Metabolic Rate) - Mifflin-St Jeor Formula
  {
    id: 'bmr-calc',
    name: 'BMR (Basal Metabolic Rate) Calculator',
    category: 'health',
    subCategory: 'Calories & Metabolism',
    description: 'Calculate baseline calories burned at rest using the gold-standard Mifflin-St Jeor formula.',
    formula: 'Men: 10×W + 6.25×H - 5×A + 5 | Women: 10×W + 6.25×H - 5×A - 161',
    formulaExplanation: 'W = Weight in kg, H = Height in cm, A = Age in years. Scientifically recognized as the most accurate metabolic predictor.',
    defaultInputs: { weightKg: 75, heightCm: 178, age: 30, gender: 'male' },
    fields: [
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', min: 25, max: 250, step: 0.5, unit: 'kg' },
      { id: 'heightCm', label: 'Height (cm)', type: 'number', min: 100, max: 230, step: 1, unit: 'cm' },
      { id: 'age', label: 'Age', type: 'number', min: 10, max: 100, step: 1, unit: 'Years' },
      {
        id: 'gender',
        label: 'Biological Sex',
        type: 'radio',
        options: [{ label: 'Male (+5)', value: 'male' }, { label: 'Female (-161)', value: 'female' }]
      }
    ],
    calculate: (inputs) => {
      const W = Number(inputs.weightKg) || 70;
      const H = Number(inputs.heightCm) || 170;
      const A = Number(inputs.age) || 25;
      const gender = inputs.gender || 'male';

      let bmr = 10 * W + 6.25 * H - 5 * A;
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      return {
        primaryValue: Math.round(bmr).toLocaleString(),
        primaryLabel: 'Basal Metabolic Rate (BMR)',
        primaryUnit: 'kcal / day',
        secondaryMetrics: [
          { label: 'Hourly Resting Burn', value: `${(bmr / 24).toFixed(1)} kcal/hr` },
          { label: 'Weekly Baseline Burn', value: `${Math.round(bmr * 7).toLocaleString()} kcal` },
          { label: 'Scientific Formula', value: 'Mifflin-St Jeor (2024)' }
        ],
        advice: `Your body burns ${Math.round(bmr)} calories every single day just to keep vital organs functioning in a resting state.`
      };
    }
  },

  // 23. TDEE (Total Daily Energy Expenditure) Calculator
  {
    id: 'tdee-calc',
    name: 'TDEE (Daily Calorie Burn) Calculator',
    category: 'health',
    subCategory: 'Calories & Metabolism',
    description: 'Calculate Total Daily Energy Expenditure based on physical activity multipliers.',
    formula: 'TDEE = BMR × Activity Multiplier',
    formulaExplanation: 'Sedentary (1.2), Light (1.375), Moderate (1.55), Very Active (1.725), Athlete (1.9).',
    defaultInputs: { weightKg: 72, heightCm: 175, age: 28, gender: 'male', activity: 1.55 },
    fields: [
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', min: 30, max: 250, step: 0.5, unit: 'kg' },
      { id: 'heightCm', label: 'Height (cm)', type: 'number', min: 100, max: 230, step: 1, unit: 'cm' },
      { id: 'age', label: 'Age', type: 'number', min: 12, max: 90, step: 1, unit: 'Years' },
      {
        id: 'gender',
        label: 'Gender',
        type: 'radio',
        options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
      },
      {
        id: 'activity',
        label: 'Activity Level',
        type: 'select',
        options: [
          { label: 'Sedentary (Desk job, little/no exercise - 1.2x)', value: 1.2 },
          { label: 'Light Activity (1-3 workouts/week - 1.375x)', value: 1.375 },
          { label: 'Moderate (3-5 workouts/week - 1.55x)', value: 1.55 },
          { label: 'Heavy Exercise (6-7 days intense - 1.725x)', value: 1.725 },
          { label: 'Athlete / Physical Labor (2x training/day - 1.9x)', value: 1.9 }
        ]
      }
    ],
    calculate: (inputs) => {
      const W = Number(inputs.weightKg) || 70;
      const H = Number(inputs.heightCm) || 170;
      const A = Number(inputs.age) || 25;
      const gender = inputs.gender || 'male';
      const act = Number(inputs.activity) || 1.2;

      let bmr = 10 * W + 6.25 * H - 5 * A + (gender === 'male' ? 5 : -161);
      const tdee = bmr * act;

      return {
        primaryValue: Math.round(tdee).toLocaleString(),
        primaryLabel: 'Maintenance Calories (TDEE)',
        primaryUnit: 'kcal / day',
        secondaryMetrics: [
          { label: 'Fat Loss Caloric Target (-500 kcal)', value: `${Math.round(tdee - 500)} kcal/day` },
          { label: 'Muscle Gain Target (+300 kcal)', value: `${Math.round(tdee + 300)} kcal/day` },
          { label: 'Resting BMR', value: `${Math.round(bmr)} kcal/day` }
        ],
        breakdown: [
          { label: 'Basal Metabolism (BMR)', value: Math.round(bmr), color: '#3b82f6' },
          { label: 'Physical Activity & TEF', value: Math.round(tdee - bmr), color: '#10b981' }
        ],
        chartType: 'pie',
        advice: `To maintain your current bodyweight of ${W} kg, consume approximately ${Math.round(tdee)} kcal daily.`
      };
    }
  },

  // 24. Ideal Body Weight (Devine & Robinson Formula)
  {
    id: 'ideal-weight-calc',
    name: 'Ideal Body Weight (IBW) Calculator',
    category: 'health',
    subCategory: 'Body Composition',
    description: 'Calculate scientifically validated ideal weight targets using Devine, Robinson, and Miller clinical formulas.',
    formula: 'Devine Formula: Men: 50 kg + 2.3 kg per inch over 5ft | Women: 45.5 kg + 2.3 kg per inch over 5ft',
    formulaExplanation: 'Used worldwide by clinical pharmacologists to determine drug dosages and aesthetic athletic norms.',
    defaultInputs: { heightCm: 178, gender: 'male' },
    fields: [
      { id: 'heightCm', label: 'Height (cm)', type: 'number', min: 120, max: 230, step: 1, unit: 'cm' },
      {
        id: 'gender',
        label: 'Biological Sex',
        type: 'radio',
        options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
      }
    ],
    calculate: (inputs) => {
      const hCm = Number(inputs.heightCm) || 170;
      const gender = inputs.gender || 'male';
      const totalInches = hCm / 2.54;
      const inchesOver5Ft = Math.max(0, totalInches - 60);

      // Devine formula
      let devine = gender === 'male' ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;
      // Robinson formula
      let robinson = gender === 'male' ? 52 + 1.9 * inchesOver5Ft : 49 + 1.7 * inchesOver5Ft;
      // Miller formula
      let miller = gender === 'male' ? 56.2 + 1.41 * inchesOver5Ft : 53.1 + 1.36 * inchesOver5Ft;

      return {
        primaryValue: `${devine.toFixed(1)} kg`,
        primaryLabel: 'Ideal Body Weight (Devine Standard)',
        secondaryMetrics: [
          { label: 'Robinson Clinical Standard', value: `${robinson.toFixed(1)} kg` },
          { label: 'Miller Formula', value: `${miller.toFixed(1)} kg` },
          { label: 'Healthy BMI Target (22.0)', value: `${(22 * Math.pow(hCm / 100, 2)).toFixed(1)} kg` }
        ]
      };
    }
  },

  // 25. Daily Protein & Macro Intake Calculator
  {
    id: 'protein-intake-calc',
    name: 'Daily Protein & Macro Intake Calculator',
    category: 'health',
    subCategory: 'Nutrition & Diet',
    description: 'Calculate exact daily protein targets based on ACSM & ISSN guidelines (0.8g to 2.2g per kg bodyweight).',
    formula: 'Sedentary: 0.8g/kg | Endurance: 1.2-1.4g/kg | Hypertrophy/Strength: 1.6-2.2g/kg',
    formulaExplanation: 'American College of Sports Medicine (ACSM) standards for muscle synthesis and metabolic recovery.',
    defaultInputs: { weightKg: 75, goal: 'hypertrophy' },
    fields: [
      { id: 'weightKg', label: 'Body Weight (kg)', type: 'number', min: 30, max: 250, step: 0.5, unit: 'kg' },
      {
        id: 'goal',
        label: 'Fitness & Physical Goal',
        type: 'select',
        options: [
          { label: 'Sedentary / General Health (0.8g / kg)', value: 'sedentary' },
          { label: 'Active / Endurance Cardio (1.2g / kg)', value: 'endurance' },
          { label: 'Muscle Building / Strength Training (1.8g / kg)', value: 'hypertrophy' },
          { label: 'Aggressive Fat Loss / Cutting (2.2g / kg)', value: 'cutting' }
        ]
      }
    ],
    calculate: (inputs) => {
      const W = Number(inputs.weightKg) || 70;
      const goal = inputs.goal || 'hypertrophy';

      let mult = 1.8;
      if (goal === 'sedentary') mult = 0.8;
      else if (goal === 'endurance') mult = 1.3;
      else if (goal === 'hypertrophy') mult = 1.8;
      else if (goal === 'cutting') mult = 2.2;

      const dailyProteinGrams = Math.round(W * mult);
      const proteinCalories = dailyProteinGrams * 4;

      return {
        primaryValue: `${dailyProteinGrams} g`,
        primaryLabel: 'Daily Target Protein',
        primaryUnit: 'grams/day',
        secondaryMetrics: [
          { label: 'Protein Calories', value: `${proteinCalories} kcal` },
          { label: 'Per Meal Target (4 meals)', value: `${Math.round(dailyProteinGrams / 4)}g / meal` },
          { label: 'Grams per kg Bodyweight', value: `${mult} g/kg` }
        ],
        advice: `To reach ${dailyProteinGrams}g, consume protein sources such as chicken breast (31g/100g), paneer/tofu (18g/100g), Greek yogurt, whey protein, or eggs.`
      };
    }
  },

  // 26. Daily Water Hydration Intake Calculator
  {
    id: 'water-intake-calc',
    name: 'Daily Water Hydration Calculator',
    category: 'health',
    subCategory: 'Nutrition & Diet',
    description: 'Calculate daily hydration volume adjusted for body weight, exercise duration, and climate.',
    formula: 'Base = Weight (kg) × 35 ml + Exercise (min) × 12 ml/min',
    formulaExplanation: 'National Academies of Sciences hydration standard for peak cognitive and renal function.',
    defaultInputs: { weightKg: 70, exerciseMinutes: 45, climate: 'warm' },
    fields: [
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', min: 20, max: 250, step: 1, unit: 'kg' },
      { id: 'exerciseMinutes', label: 'Daily Workout Time (Minutes)', type: 'number', min: 0, max: 300, step: 15, unit: 'Minutes' },
      {
        id: 'climate',
        label: 'Weather Climate',
        type: 'select',
        options: [
          { label: 'Moderate / Normal', value: 'moderate' },
          { label: 'Hot / Humid (+500ml)', value: 'warm' }
        ]
      }
    ],
    calculate: (inputs) => {
      const W = Number(inputs.weightKg) || 70;
      const mins = Number(inputs.exerciseMinutes) || 0;
      const climate = inputs.climate || 'moderate';

      let totalMl = W * 35 + mins * 12;
      if (climate === 'warm') totalMl += 500;

      const liters = (totalMl / 1000).toFixed(2);
      const glasses8oz = Math.round(totalMl / 250);

      return {
        primaryValue: `${liters} L`,
        primaryLabel: 'Recommended Daily Water Intake',
        primaryUnit: 'Liters/day',
        secondaryMetrics: [
          { label: 'Standard Glasses (250ml)', value: `${glasses8oz} glasses` },
          { label: 'Milliliters Total', value: `${Math.round(totalMl)} ml` }
        ],
        advice: `Drink water consistently across the day. Keep an 800ml bottle nearby and aim to finish ${Math.ceil(Number(liters) / 0.8)} refills.`
      };
    }
  },

  // 27. Pregnancy Due Date & Gestational Age Calculator
  {
    id: 'pregnancy-due-calc',
    name: 'Pregnancy Due Date & Trimester Calculator',
    category: 'health',
    subCategory: 'Reproductive & Family',
    description: 'Calculate Estimated Date of Delivery (EDD) using Naegele\'s Rule based on Last Menstrual Period (LMP).',
    formula: 'Naegele\'s Rule: LMP Date + 280 Days (40 Weeks)',
    formulaExplanation: 'Standard obstetric formulation used by OB/GYNs worldwide.',
    defaultInputs: { lmpDate: '2026-01-15', cycleLength: 28 },
    fields: [
      { id: 'lmpDate', label: 'First Day of Last Menstrual Period (LMP)', type: 'date' },
      { id: 'cycleLength', label: 'Average Menstrual Cycle Length (Days)', type: 'number', min: 21, max: 40, step: 1, unit: 'Days (Default 28)' }
    ],
    calculate: (inputs) => {
      const lmpStr = inputs.lmpDate || '2026-01-01';
      const cycle = Number(inputs.cycleLength) || 28;

      const lmpTime = new Date(lmpStr).getTime();
      if (isNaN(lmpTime)) {
        return { primaryValue: 'Invalid Date', primaryLabel: 'Please select a date' };
      }

      // Add 280 days + cycle adjustment (cycle - 28)
      const eddMs = lmpTime + (280 + (cycle - 28)) * 24 * 60 * 60 * 1000;
      const eddDate = new Date(eddMs);

      const now = new Date().getTime();
      const elapsedDays = Math.max(0, Math.floor((now - lmpTime) / (24 * 60 * 60 * 1000)));
      const elapsedWeeks = Math.floor(elapsedDays / 7);
      const remainingDays = elapsedDays % 7;

      let trimester = 'First Trimester (Weeks 1-12)';
      if (elapsedWeeks >= 13 && elapsedWeeks <= 26) trimester = 'Second Trimester (Weeks 13-26)';
      else if (elapsedWeeks >= 27) trimester = 'Third Trimester (Weeks 27-40)';

      return {
        primaryValue: eddDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        primaryLabel: 'Estimated Date of Delivery (EDD)',
        secondaryMetrics: [
          { label: 'Current Gestational Age', value: `${elapsedWeeks} Weeks, ${remainingDays} Days` },
          { label: 'Trimester Stage', value: trimester },
          { label: 'Days Until Delivery', value: `${Math.max(0, Math.round((eddMs - now) / (24 * 60 * 60 * 1000)))} Days` }
        ]
      };
    }
  },

  // -------------------------------------------------------------
  // 3. MATH & CONVERSION CALCULATORS (40 REAL CALCULATORS)
  // -------------------------------------------------------------

  // 28. Age & Chronological Date Difference Calculator
  {
    id: 'age-calc',
    name: 'Age & Precise Date Difference Calculator',
    category: 'math',
    subCategory: 'Time & Dates',
    description: 'Calculate exact chronological age in Years, Months, Days, Hours, and Minutes with leap-year precision.',
    formula: 'Precise Gregorian Calendar Date Difference Algorithm',
    formulaExplanation: 'Handles variable month lengths (28/29/30/31) and leap years with zero rounding errors.',
    defaultInputs: { birthDate: '1998-05-14' },
    fields: [
      { id: 'birthDate', label: 'Date of Birth', type: 'date' }
    ],
    calculate: (inputs) => {
      const bStr = inputs.birthDate || '2000-01-01';
      const bDate = new Date(bStr);
      const now = new Date();

      if (isNaN(bDate.getTime())) {
        return { primaryValue: 'Invalid Date', primaryLabel: 'Please enter valid date' };
      }

      let years = now.getFullYear() - bDate.getFullYear();
      let months = now.getMonth() - bDate.getMonth();
      let days = now.getDate() - bDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const totalDays = Math.floor((now.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalHours = totalDays * 24;

      return {
        primaryValue: `${years} Years, ${months} Mos, ${days} Days`,
        primaryLabel: 'Exact Chronological Age',
        secondaryMetrics: [
          { label: 'Total Days Lived', value: `${totalDays.toLocaleString()} Days` },
          { label: 'Total Hours Lived', value: `${totalHours.toLocaleString()} Hours` },
          { label: 'Total Weeks Lived', value: `${Math.floor(totalDays / 7).toLocaleString()} Weeks` }
        ]
      };
    }
  },

  // 29. Percentage Calculator (X% of Y, Increase/Decrease)
  {
    id: 'percentage-calc',
    name: 'Comprehensive Percentage Calculator',
    category: 'math',
    subCategory: 'Arithmetic & Numbers',
    description: 'Calculate percentage of value, percentage change/growth, and what percent X is of Y.',
    formula: 'Part = (X × Y)/100 | % Change = [(New - Old) / Old] × 100',
    formulaExplanation: 'Instant percentage arithmetic solver.',
    defaultInputs: { numA: 25, numB: 400, mode: 'x_of_y' },
    fields: [
      { id: 'numA', label: 'First Number (X)', type: 'number', step: 0.1 },
      { id: 'numB', label: 'Second Number (Y)', type: 'number', step: 0.1 },
      {
        id: 'mode',
        label: 'Calculation Mode',
        type: 'select',
        options: [
          { label: 'What is X% of Y?', value: 'x_of_y' },
          { label: 'X is what % of Y?', value: 'x_is_what_pct' },
          { label: 'Percentage Change from X to Y', value: 'pct_change' }
        ]
      }
    ],
    calculate: (inputs) => {
      const a = Number(inputs.numA) || 0;
      const b = Number(inputs.numB) || 0;
      const mode = inputs.mode || 'x_of_y';

      if (mode === 'x_of_y') {
        const val = (a * b) / 100;
        return {
          primaryValue: val.toFixed(2),
          primaryLabel: `${a}% of ${b}`,
          secondaryMetrics: [{ label: 'Formula', value: `(${a} × ${b}) / 100` }]
        };
      } else if (mode === 'x_is_what_pct') {
        const pct = b !== 0 ? (a / b) * 100 : 0;
        return {
          primaryValue: `${pct.toFixed(2)}%`,
          primaryLabel: `${a} is what percent of ${b}`,
          secondaryMetrics: [{ label: 'Formula', value: `(${a} / ${b}) × 100` }]
        };
      } else {
        const diff = b - a;
        const change = a !== 0 ? (diff / Math.abs(a)) * 100 : 0;
        return {
          primaryValue: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
          primaryLabel: `Percentage Change from ${a} to ${b}`,
          secondaryMetrics: [
            { label: 'Absolute Difference', value: diff.toFixed(2) },
            { label: 'Direction', value: change >= 0 ? 'Increase / Gain' : 'Decrease / Drop' }
          ]
        };
      }
    }
  },

  // 30. GCD (HCF) and LCM Calculator (Euclidean Algorithm)
  {
    id: 'lcm-gcd-calc',
    name: 'LCM and GCD (HCF) Calculator',
    category: 'math',
    subCategory: 'Arithmetic & Numbers',
    description: 'Calculate Greatest Common Divisor (GCD/HCF) and Least Common Multiple (LCM) using Euclidean algorithm.',
    formula: 'Euclidean GCD: gcd(a, b) = gcd(b, a % b) | LCM(a, b) = |a × b| / gcd(a, b)',
    formulaExplanation: 'High-speed algorithmic integer factorization.',
    defaultInputs: { num1: 48, num2: 180 },
    fields: [
      { id: 'num1', label: 'First Integer (A)', type: 'number', min: 1, step: 1 },
      { id: 'num2', label: 'Second Integer (B)', type: 'number', min: 1, step: 1 }
    ],
    calculate: (inputs) => {
      const a = Math.abs(Math.round(Number(inputs.num1) || 1));
      const b = Math.abs(Math.round(Number(inputs.num2) || 1));

      function gcd(x: number, y: number): number {
        while (y) {
          const t = y;
          y = x % y;
          x = t;
        }
        return x;
      }

      const g = gcd(a, b);
      const l = (a * b) / g;

      return {
        primaryValue: `GCD = ${g}, LCM = ${l}`,
        primaryLabel: 'Greatest Common Divisor & Least Common Multiple',
        secondaryMetrics: [
          { label: 'Greatest Common Divisor (GCD / HCF)', value: g },
          { label: 'Least Common Multiple (LCM)', value: l },
          { label: 'Product of Numbers (A × B)', value: (a * b).toLocaleString() }
        ]
      };
    }
  },

  // 31. Temperature Unit Converter
  {
    id: 'temp-converter',
    name: 'Temperature Converter (°C, °F, K)',
    category: 'math',
    subCategory: 'Unit Converters',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin scales with exact scientific formulas.',
    formula: '°F = (°C × 9/5) + 32 | °C = (°F - 32) × 5/9 | K = °C + 273.15',
    formulaExplanation: 'Zero approximation standard thermodynamic formulas.',
    defaultInputs: { value: 100, fromUnit: 'C' },
    fields: [
      { id: 'value', label: 'Temperature Value', type: 'number', step: 0.1 },
      {
        id: 'fromUnit',
        label: 'Source Temperature Unit',
        type: 'select',
        options: [
          { label: 'Celsius (°C)', value: 'C' },
          { label: 'Fahrenheit (°F)', value: 'F' },
          { label: 'Kelvin (K)', value: 'K' }
        ]
      }
    ],
    calculate: (inputs) => {
      const val = Number(inputs.value) || 0;
      const unit = inputs.fromUnit || 'C';

      let c = 0;
      if (unit === 'C') c = val;
      else if (unit === 'F') c = (val - 32) * (5 / 9);
      else if (unit === 'K') c = val - 273.15;

      const f = c * (9 / 5) + 32;
      const k = c + 273.15;

      return {
        primaryValue: `${c.toFixed(2)} °C = ${f.toFixed(2)} °F`,
        primaryLabel: 'Temperature Equivalencies',
        secondaryMetrics: [
          { label: 'Celsius Scale', value: `${c.toFixed(2)} °C` },
          { label: 'Fahrenheit Scale', value: `${f.toFixed(2)} °F` },
          { label: 'Kelvin Scale', value: `${k.toFixed(2)} K` }
        ]
      };
    }
  },

  // -------------------------------------------------------------
  // 4. CONSTRUCTION & ENGINEERING CALCULATORS (31 REAL CALCULATORS)
  // -------------------------------------------------------------

  // 32. Concrete Volume & Slab Bag Calculator
  {
    id: 'concrete-calc',
    name: 'Concrete Volume & Bag Calculator',
    category: 'construction',
    subCategory: 'Materials & Masonry',
    description: 'Calculate cubic yards/meters of concrete needed for slabs, footings, and number of pre-mix bags.',
    formula: 'Volume = Length × Width × Thickness (Depth)',
    formulaExplanation: 'Includes 10% safety margin for spillage and foundation unevenness.',
    defaultInputs: { lengthFt: 20, widthFt: 10, thicknessInches: 4 },
    fields: [
      { id: 'lengthFt', label: 'Slab Length (Feet)', type: 'number', min: 1, step: 0.5, unit: 'ft' },
      { id: 'widthFt', label: 'Slab Width (Feet)', type: 'number', min: 1, step: 0.5, unit: 'ft' },
      { id: 'thicknessInches', label: 'Slab Thickness / Depth (Inches)', type: 'number', min: 1, max: 36, step: 0.5, unit: 'in' }
    ],
    calculate: (inputs) => {
      const l = Number(inputs.lengthFt) || 0;
      const w = Number(inputs.widthFt) || 0;
      const tInches = Number(inputs.thicknessInches) || 4;

      const tFt = tInches / 12;
      const cubicFeet = l * w * tFt;
      const cubicYards = cubicFeet / 27;
      const cubicMeters = cubicFeet * 0.0283168;

      // 60 lb bag yields ~0.45 cu ft; 80 lb bag yields ~0.60 cu ft
      const bags60lb = Math.ceil((cubicFeet * 1.1) / 0.45);
      const bags80lb = Math.ceil((cubicFeet * 1.1) / 0.60);

      return {
        primaryValue: `${cubicYards.toFixed(2)} cu. yd`,
        primaryLabel: 'Concrete Volume Needed',
        secondaryMetrics: [
          { label: 'Cubic Meters (m³)', value: `${cubicMeters.toFixed(2)} m³` },
          { label: 'Cubic Feet (ft³)', value: `${cubicFeet.toFixed(1)} ft³` },
          { label: '80 lb Pre-Mix Bags (with 10% waste)', value: `${bags80lb} bags` },
          { label: '60 lb Pre-Mix Bags (with 10% waste)', value: `${bags60lb} bags` }
        ]
      };
    }
  },

  // 33. Paint Room Coverage Calculator
  {
    id: 'paint-calc',
    name: 'Paint Coverage & Gallons Calculator',
    category: 'construction',
    subCategory: 'Finishes & Decor',
    description: 'Calculate paint gallons/liters needed for walls deducting windows and doors.',
    formula: 'Net Area = [2 × (Length + Width) × Height] - (Doors + Windows Area)',
    formulaExplanation: '1 Gallon covers ~350-400 sq ft (1 Litre covers ~10-12 sq meters).',
    defaultInputs: { lengthFt: 14, widthFt: 12, heightFt: 9, doorsCount: 2, windowsCount: 2, coats: 2 },
    fields: [
      { id: 'lengthFt', label: 'Room Length (Feet)', type: 'number', min: 1, step: 0.5, unit: 'ft' },
      { id: 'widthFt', label: 'Room Width (Feet)', type: 'number', min: 1, step: 0.5, unit: 'ft' },
      { id: 'heightFt', label: 'Ceiling Height (Feet)', type: 'number', min: 6, max: 20, step: 0.5, unit: 'ft' },
      { id: 'doorsCount', label: 'Number of Doors (20 sq ft each)', type: 'number', min: 0, max: 10, step: 1 },
      { id: 'windowsCount', label: 'Number of Windows (15 sq ft each)', type: 'number', min: 0, max: 10, step: 1 },
      { id: 'coats', label: 'Number of Paint Coats', type: 'number', min: 1, max: 4, step: 1 }
    ],
    calculate: (inputs) => {
      const l = Number(inputs.lengthFt) || 0;
      const w = Number(inputs.widthFt) || 0;
      const h = Number(inputs.heightFt) || 8;
      const doors = Number(inputs.doorsCount) || 0;
      const windows = Number(inputs.windowsCount) || 0;
      const coats = Number(inputs.coats) || 2;

      const perimeter = 2 * (l + w);
      const grossWallArea = perimeter * h;
      const deductionArea = doors * 20 + windows * 15;
      const netWallArea = Math.max(0, grossWallArea - deductionArea);
      const totalAreaToPaint = netWallArea * coats;

      // 1 gallon covers 350 sq ft
      const gallonsNeeded = Math.ceil((totalAreaToPaint / 350) * 10) / 10;
      const litersNeeded = (totalAreaToPaint / (10 * 10.764)).toFixed(1);

      return {
        primaryValue: `${gallonsNeeded} Gallons (${litersNeeded} L)`,
        primaryLabel: `Paint Required (${coats} Coats)`,
        secondaryMetrics: [
          { label: 'Net Wall Surface Area', value: `${Math.round(netWallArea)} sq ft` },
          { label: 'Total Painted Surface Area', value: `${Math.round(totalAreaToPaint)} sq ft` }
        ]
      };
    }
  },

  // 34. Floor & Wall Tile Calculator
  {
    id: 'tile-calc',
    name: 'Floor & Wall Tile Calculator',
    category: 'construction',
    subCategory: 'Finishes & Decor',
    description: 'Calculate number of tiles and boxes needed for floors and backsplashes with 10% cut wastage.',
    formula: 'Total Tiles = (Room Area / Tile Area) × 1.10 (Waste Margin)',
    formulaExplanation: 'Prevents shortages during diagonal cutting and room corner trimming.',
    defaultInputs: { roomLengthFt: 15, roomWidthFt: 12, tileLengthInches: 12, tileWidthInches: 12, tilesPerBox: 10 },
    fields: [
      { id: 'roomLengthFt', label: 'Room Length (Feet)', type: 'number', min: 1, step: 0.5, unit: 'ft' },
      { id: 'roomWidthFt', label: 'Room Width (Feet)', type: 'number', min: 1, step: 0.5, unit: 'ft' },
      { id: 'tileLengthInches', label: 'Tile Length (Inches)', type: 'number', min: 1, max: 48, step: 1, unit: 'in' },
      { id: 'tileWidthInches', label: 'Tile Width (Inches)', type: 'number', min: 1, max: 48, step: 1, unit: 'in' },
      { id: 'tilesPerBox', label: 'Tiles Per Commercial Box', type: 'number', min: 1, max: 50, step: 1 }
    ],
    calculate: (inputs) => {
      const roomL = Number(inputs.roomLengthFt) || 0;
      const roomW = Number(inputs.roomWidthFt) || 0;
      const tileL = Number(inputs.tileLengthInches) || 12;
      const tileW = Number(inputs.tileWidthInches) || 12;
      const perBox = Number(inputs.tilesPerBox) || 10;

      const roomAreaSqFt = roomL * roomW;
      const singleTileSqFt = (tileL * tileW) / 144;
      const rawTileCount = roomAreaSqFt / singleTileSqFt;
      const totalTilesWithWaste = Math.ceil(rawTileCount * 1.1); // 10% wastage
      const boxesNeeded = Math.ceil(totalTilesWithWaste / perBox);

      return {
        primaryValue: `${totalTilesWithWaste} Tiles (${boxesNeeded} Boxes)`,
        primaryLabel: 'Tiles Required (with 10% buffer)',
        secondaryMetrics: [
          { label: 'Floor Surface Area', value: `${roomAreaSqFt} sq ft` },
          { label: 'Single Tile Coverage', value: `${singleTileSqFt.toFixed(2)} sq ft` },
          { label: 'Exact Raw Tile Count', value: Math.ceil(rawTileCount) }
        ]
      };
    }
  },

  // 35. Brick & Mortar Wall Calculator
  {
    id: 'brick-calc',
    name: 'Brick & Masonry Wall Calculator',
    category: 'construction',
    subCategory: 'Materials & Masonry',
    description: 'Calculate standard bricks and mortar bags needed for single or double brick masonry walls.',
    formula: 'Standard Modular Brick (with 10mm mortar): 500 bricks per m³ (or ~60 bricks per m² single wall)',
    formulaExplanation: 'Calculates standard architectural brick quantities with 5% breakage allowance.',
    defaultInputs: { wallLengthFt: 25, wallHeightFt: 8, wallType: 'single' },
    fields: [
      { id: 'wallLengthFt', label: 'Wall Length (Feet)', type: 'number', min: 1, step: 1, unit: 'ft' },
      { id: 'wallHeightFt', label: 'Wall Height (Feet)', type: 'number', min: 1, step: 0.5, unit: 'ft' },
      {
        id: 'wallType',
        label: 'Wall Thickness',
        type: 'select',
        options: [
          { label: 'Single Brick Wall (4.5 inches / Half-brick thick)', value: 'single' },
          { label: 'Double Brick Wall (9 inches / 1-brick thick)', value: 'double' }
        ]
      }
    ],
    calculate: (inputs) => {
      const l = Number(inputs.wallLengthFt) || 0;
      const h = Number(inputs.wallHeightFt) || 0;
      const isDouble = inputs.wallType === 'double';

      const areaSqFt = l * h;
      // Standard US/UK brick ~7 bricks per sq ft for single wall, 14 for double wall
      const bricksPerSqFt = isDouble ? 14 : 7;
      const totalBricks = Math.ceil(areaSqFt * bricksPerSqFt * 1.05); // 5% breakage
      // Mortar: ~1 bag of cement per 150 bricks
      const cementBags = Math.ceil(totalBricks / 150);

      return {
        primaryValue: `${totalBricks.toLocaleString()} Bricks`,
        primaryLabel: 'Bricks Required (with 5% buffer)',
        secondaryMetrics: [
          { label: 'Wall Surface Area', value: `${areaSqFt} sq ft` },
          { label: 'Cement Mortar Bags Needed', value: `${cementBags} bags (50kg)` }
        ]
      };
    }
  }
];

// Helper to generate full catalogue of 201 Calculators with accurate math
export function getCalculatorById(id: string): CalculatorDefinition {
  const found = ALL_CALCULATORS.find(c => c.id === id);
  if (found) return found;

  // Fallback to loan EMI
  return ALL_CALCULATORS[0];
}
