import { CalculatorDefinition } from './calculatorEngine';

// Additional specialized financial calculators
export const MORE_FINANCE_CALCULATORS: CalculatorDefinition[] = [
  // 1. Home Loan Eligibility Calculator
  {
    id: 'home-loan-eligibility-calc',
    name: 'Home Loan Eligibility Calculator',
    category: 'finance',
    subCategory: 'Loans & Debt',
    description: 'Calculate maximum home loan amount sanctioned based on monthly net income and existing EMIs (FOIR ratio).',
    formula: 'Max EMI = Net Monthly Income × FOIR% (50%) - Existing EMIs',
    formulaExplanation: 'Banks usually cap Fixed Obligation to Income Ratio (FOIR) at 50% to 60% of monthly income.',
    defaultInputs: { monthlySalary: 85000, existingEmi: 12000, rate: 8.5, tenureYears: 25 },
    fields: [
      { id: 'monthlySalary', label: 'Net Monthly Income (In-Hand)', type: 'number', min: 10000, max: 10000000, step: 5000, unit: '₹' },
      { id: 'existingEmi', label: 'Existing Monthly EMIs / Liabilities', type: 'number', min: 0, max: 5000000, step: 2000, unit: '₹' },
      { id: 'rate', label: 'Bank Interest Rate (%)', type: 'number', min: 5, max: 20, step: 0.1, unit: '%' },
      { id: 'tenureYears', label: 'Requested Loan Tenure', type: 'number', min: 5, max: 30, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const income = Number(inputs.monthlySalary) || 0;
      const existing = Number(inputs.existingEmi) || 0;
      const rate = Number(inputs.rate) || 8.5;
      const years = Number(inputs.tenureYears) || 20;

      const foir = 0.50; // 50% max allowable EMI
      const maxAllowableEmi = Math.max(0, income * foir - existing);

      const r = rate / 12 / 100;
      const n = years * 12;
      // PV = EMI * [(1 - (1+r)^-n) / r]
      const maxLoan = maxAllowableEmi > 0 ? maxAllowableEmi * ((1 - Math.pow(1 + r, -n)) / r) : 0;

      return {
        primaryValue: Math.round(maxLoan).toLocaleString(),
        primaryLabel: 'Max Home Loan Eligibility',
        primaryUnit: '₹',
        secondaryMetrics: [
          { label: 'Max Allowable Monthly EMI', value: `₹${Math.round(maxAllowableEmi).toLocaleString()}` },
          { label: 'Disposable Income Left', value: `₹${Math.round(income - maxAllowableEmi - existing).toLocaleString()}` },
          { label: 'FOIR Utilization', value: `${(( (existing + maxAllowableEmi) / (income || 1) ) * 100).toFixed(0)}%` }
        ],
        breakdown: [
          { label: 'Eligible Home Loan EMI', value: Math.round(maxAllowableEmi), color: '#3b82f6' },
          { label: 'Existing EMIs', value: Math.round(existing), color: '#ef4444' },
          { label: 'Free Cashflow', value: Math.round(income - maxAllowableEmi - existing), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 2. Prepayment / Loan Pre-closure Calculator
  {
    id: 'loan-prepayment-calc',
    name: 'Loan Prepayment & Interest Savings Calculator',
    category: 'finance',
    subCategory: 'Loans & Debt',
    description: 'Calculate interest money saved and tenure reduction by making one-time or recurring prepayments.',
    formula: 'Iterative amortization recalculation post principal reduction',
    formulaExplanation: 'Prepayments reduce principal directly, accelerating debt payoff.',
    defaultInputs: { loanAmount: 4000000, rate: 9.0, tenureYears: 20, prepaymentAmount: 300000, prepayAfterMonths: 24 },
    fields: [
      { id: 'loanAmount', label: 'Original Loan Amount', type: 'number', min: 50000, max: 50000000, step: 25000, unit: '₹' },
      { id: 'rate', label: 'Interest Rate (%)', type: 'number', min: 1, max: 25, step: 0.1, unit: '%' },
      { id: 'tenureYears', label: 'Original Tenure (Years)', type: 'number', min: 1, max: 30, step: 1, unit: 'Years' },
      { id: 'prepaymentAmount', label: 'Lump Sum Prepayment Amount', type: 'number', min: 1000, max: 10000000, step: 10000, unit: '₹' },
      { id: 'prepayAfterMonths', label: 'Make Prepayment After (Month)', type: 'number', min: 1, max: 240, step: 6, unit: 'Month' }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.loanAmount) || 1000000;
      const rate = Number(inputs.rate) || 9.0;
      const years = Number(inputs.tenureYears) || 20;
      const prepay = Number(inputs.prepaymentAmount) || 100000;
      const prepayMonth = Number(inputs.prepayAfterMonths) || 12;

      const r = rate / 12 / 100;
      const n = years * 12;
      const factor = Math.pow(1 + r, n);
      const emi = (P * r * factor) / (factor - 1);

      let balance = P;
      let totalInterestNormal = emi * n - P;
      let totalInterestWithPrepay = 0;
      let newMonths = 0;

      for (let m = 1; m <= 360 && balance > 0; m++) {
        const intM = balance * r;
        totalInterestWithPrepay += intM;
        let princM = emi - intM;
        balance -= princM;

        if (m === prepayMonth) {
          balance -= prepay;
        }

        if (balance <= 0) {
          newMonths = m;
          break;
        }
      }

      const interestSaved = Math.max(0, totalInterestNormal - totalInterestWithPrepay);
      const monthsSaved = Math.max(0, n - newMonths);

      return {
        primaryValue: `₹${Math.round(interestSaved).toLocaleString()}`,
        primaryLabel: 'Total Interest Saved',
        secondaryMetrics: [
          { label: 'Tenure Reduced By', value: `${Math.floor(monthsSaved / 12)} Years, ${monthsSaved % 12} Months` },
          { label: 'New Loan Payoff Month', value: `Month ${newMonths} (from ${n})` },
          { label: 'Original Total Interest', value: `₹${Math.round(totalInterestNormal).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Prepaid Principal', value: prepay, color: '#3b82f6' },
          { label: 'Interest Saved', value: Math.round(interestSaved), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 3. CAGR (Compound Annual Growth Rate) Calculator
  {
    id: 'cagr-calc',
    name: 'CAGR (Compound Annual Growth Rate) Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate annualized smoothed rate of investment return over multiple years.',
    formula: 'CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1',
    formulaExplanation: 'The most standard financial metric used to evaluate mutual funds, stock portfolios, and real estate growth.',
    defaultInputs: { initialValue: 100000, finalValue: 285000, years: 7 },
    fields: [
      { id: 'initialValue', label: 'Initial Investment Value', type: 'number', min: 100, max: 100000000, step: 1000, unit: '₹ / $' },
      { id: 'finalValue', label: 'Final Value / Current Portfolio', type: 'number', min: 100, max: 100000000, step: 1000, unit: '₹ / $' },
      { id: 'years', label: 'Time Horizon (Years)', type: 'number', min: 0.1, max: 50, step: 0.5, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const v0 = Number(inputs.initialValue) || 1;
      const v1 = Number(inputs.finalValue) || 1;
      const t = Number(inputs.years) || 1;

      const cagr = (Math.pow(v1 / v0, 1 / t) - 1) * 100;
      const absoluteReturn = ((v1 - v0) / v0) * 100;

      return {
        primaryValue: `${cagr.toFixed(2)}%`,
        primaryLabel: 'Compound Annual Growth Rate (CAGR)',
        secondaryMetrics: [
          { label: 'Total Absolute Return', value: `${absoluteReturn.toFixed(2)}%` },
          { label: 'Total Wealth Multiplier', value: `${(v1 / v0).toFixed(2)}x` },
          { label: 'Net Profit Earned', value: `₹${(v1 - v0).toLocaleString()}` }
        ]
      };
    }
  },

  // 4. SWP (Systematic Withdrawal Plan) Calculator
  {
    id: 'swp-calc',
    name: 'SWP (Systematic Withdrawal Plan) Calculator',
    category: 'finance',
    subCategory: 'Investments & Savings',
    description: 'Calculate regular monthly income and remaining mutual fund corpus for retirees.',
    formula: 'Monthly compounding balance deduction with residual return rate',
    formulaExplanation: 'Simulates monthly pension withdrawals while remaining balance continues to grow.',
    defaultInputs: { initialCorpus: 5000000, monthlyWithdrawal: 35000, annualReturn: 9.0, years: 15 },
    fields: [
      { id: 'initialCorpus', label: 'Total Investment Corpus', type: 'number', min: 50000, max: 100000000, step: 50000, unit: '₹' },
      { id: 'monthlyWithdrawal', label: 'Monthly Withdrawal (Pension)', type: 'number', min: 1000, max: 1000000, step: 2000, unit: '₹' },
      { id: 'annualReturn', label: 'Expected Return on Corpus (%)', type: 'number', min: 1, max: 25, step: 0.5, unit: '%' },
      { id: 'years', label: 'Withdrawal Period (Years)', type: 'number', min: 1, max: 40, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      let balance = Number(inputs.initialCorpus) || 1000000;
      const monthlyWith = Number(inputs.monthlyWithdrawal) || 10000;
      const rate = Number(inputs.annualReturn) || 8.0;
      const years = Number(inputs.years) || 10;

      const r = rate / 12 / 100;
      const totalMonths = years * 12;
      let totalWithdrawn = 0;

      for (let m = 1; m <= totalMonths; m++) {
        const growth = balance * r;
        balance = balance + growth - monthlyWith;
        totalWithdrawn += monthlyWith;
        if (balance < 0) {
          balance = 0;
          break;
        }
      }

      return {
        primaryValue: `₹${Math.round(balance).toLocaleString()}`,
        primaryLabel: 'Final Remaining Corpus',
        secondaryMetrics: [
          { label: 'Total Money Withdrawn', value: `₹${Math.round(totalWithdrawn).toLocaleString()}` },
          { label: 'Initial Starting Capital', value: `₹${Number(inputs.initialCorpus).toLocaleString()}` },
          { label: 'Capital Status', value: balance > 0 ? 'Sustainable Corpus' : 'Corpus Depleted Early' }
        ],
        breakdown: [
          { label: 'Total Withdrawn', value: Math.round(totalWithdrawn), color: '#3b82f6' },
          { label: 'Remaining Balance', value: Math.round(balance), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 5. Fire (Financial Independence, Retire Early) Number Calculator
  {
    id: 'fire-calc',
    name: 'FIRE (Financial Independence, Retire Early) Calculator',
    category: 'finance',
    subCategory: 'Retirement & FIRE',
    description: 'Calculate your exact FIRE target corpus using the 4% Safe Withdrawal Rule (25x annual expenses).',
    formula: 'FIRE Number = Annual Living Expenses × 25 (or 30 for Lean/Fat FIRE)',
    formulaExplanation: 'Based on the Trinity Study 4% rule for sustaining perpetual retirement without running out of money.',
    defaultInputs: { monthlyExpense: 60000, currentAge: 28, targetRetireAge: 45, currentSavings: 1500000, monthlySaving: 45000, returnRate: 11.0 },
    fields: [
      { id: 'monthlyExpense', label: 'Current Monthly Living Expenses', type: 'number', min: 10000, max: 2000000, step: 5000, unit: '₹' },
      { id: 'currentAge', label: 'Current Age', type: 'number', min: 18, max: 60, step: 1, unit: 'Years' },
      { id: 'targetRetireAge', label: 'Target Early Retirement Age', type: 'number', min: 25, max: 70, step: 1, unit: 'Years' },
      { id: 'currentSavings', label: 'Current Invested Net Worth', type: 'number', min: 0, max: 50000000, step: 50000, unit: '₹' },
      { id: 'monthlySaving', label: 'Monthly Investment Towards FIRE', type: 'number', min: 1000, max: 1000000, step: 5000, unit: '₹' },
      { id: 'returnRate', label: 'Expected Investment Return (%)', type: 'number', min: 5, max: 20, step: 0.5, unit: '%' }
    ],
    calculate: (inputs) => {
      const monthlyExp = Number(inputs.monthlyExpense) || 50000;
      const annualExp = monthlyExp * 12;
      const fireTarget = annualExp * 25; // 4% rule
      const fatFireTarget = annualExp * 33.3; // 3% conservative rule
      const leanFireTarget = annualExp * 20; // 5% lean rule

      const curAge = Number(inputs.currentAge) || 25;
      const retAge = Number(inputs.targetRetireAge) || 45;
      const years = Math.max(1, retAge - curAge);

      const r = (Number(inputs.returnRate) || 10) / 12 / 100;
      const n = years * 12;
      const P = Number(inputs.currentSavings) || 0;
      const PMT = Number(inputs.monthlySaving) || 0;

      // FV of current savings + FV of monthly savings
      const fvCurrent = P * Math.pow(1 + r, n);
      const fvMonthly = PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const projectedCorpus = fvCurrent + fvMonthly;

      const isFireAchieved = projectedCorpus >= fireTarget;

      return {
        primaryValue: `₹${(fireTarget / 10000000).toFixed(2)} Cr`,
        primaryLabel: 'Standard FIRE Target (25x Rule)',
        secondaryMetrics: [
          { label: 'Projected Corpus at Target Age', value: `₹${(projectedCorpus / 10000000).toFixed(2)} Cr` },
          { label: 'Lean FIRE Target (20x)', value: `₹${(leanFireTarget / 10000000).toFixed(2)} Cr` },
          { label: 'Fat FIRE Target (33.3x)', value: `₹${(fatFireTarget / 10000000).toFixed(2)} Cr` },
          { label: 'FIRE Feasibility', value: isFireAchieved ? 'On Track to Retire Early!' : 'Requires higher savings or later retirement' }
        ],
        breakdown: [
          { label: 'Projected Wealth', value: Math.round(projectedCorpus), color: '#10b981' },
          { label: 'Target Requirement', value: Math.round(fireTarget), color: '#6366f1' }
        ],
        chartType: 'bar',
        statusBadge: {
          label: isFireAchieved ? 'FIRE Achievable' : 'Boost Savings by 15%',
          type: isFireAchieved ? 'success' : 'warning'
        }
      };
    }
  },

  // 6. Gratuity Calculator (Payment of Gratuity Act 1972)
  {
    id: 'gratuity-calc',
    name: 'Gratuity Calculator (Indian Labor Act 1972)',
    category: 'finance',
    subCategory: 'Retirement & FIRE',
    description: 'Calculate tax-free statutory gratuity payout after 5+ years of continuous service.',
    formula: 'Gratuity = (15 × Last Drawn Basic + DA × Tenure Years) / 26',
    formulaExplanation: 'As mandated by the Payment of Gratuity Act 1972 (Exempt up to ₹20 Lakhs).',
    defaultInputs: { basicMonthlySalary: 60000, tenureYears: 8 },
    fields: [
      { id: 'basicMonthlySalary', label: 'Last Drawn Basic Salary + DA', type: 'number', min: 5000, max: 2000000, step: 2000, unit: '₹' },
      { id: 'tenureYears', label: 'Completed Years of Service (Min 5 yrs)', type: 'number', min: 1, max: 45, step: 1, unit: 'Years' }
    ],
    calculate: (inputs) => {
      const basic = Number(inputs.basicMonthlySalary) || 0;
      const years = Number(inputs.tenureYears) || 1;

      const gratuity = (15 * basic * years) / 26;
      const taxFreeLimit = 2000000;
      const taxableGratuity = Math.max(0, gratuity - taxFreeLimit);

      return {
        primaryValue: `₹${Math.round(gratuity).toLocaleString()}`,
        primaryLabel: 'Total Gratuity Entitlement',
        secondaryMetrics: [
          { label: 'Tax-Free Portion', value: `₹${Math.min(gratuity, taxFreeLimit).toLocaleString()}` },
          { label: 'Taxable Portion', value: `₹${Math.round(taxableGratuity).toLocaleString()}` },
          { label: 'Eligibility Status', value: years >= 5 ? 'Eligible (>5 Years Service)' : 'Not Eligible (Requires 5 Yrs)' }
        ]
      };
    }
  },

  // 7. National Pension System (NPS) Calculator
  {
    id: 'nps-calc',
    name: 'NPS (National Pension System) Calculator',
    category: 'finance',
    subCategory: 'Retirement & FIRE',
    description: 'Calculate retirement lump sum and monthly pension annuity at age 60 under Tier-1 NPS.',
    formula: 'Compound SIP + 60% Tax-Free Lumpsum + 40% Mandatory Annuity at 6%',
    formulaExplanation: 'PFRDA guidelines: 60% can be withdrawn tax-free at 60; 40% purchases life annuity.',
    defaultInputs: { monthlyContribution: 10000, currentAge: 30, expectedReturn: 10.0, annuityPercent: 40, annuityRate: 6.5 },
    fields: [
      { id: 'monthlyContribution', label: 'Monthly NPS Contribution', type: 'number', min: 500, max: 500000, step: 1000, unit: '₹' },
      { id: 'currentAge', label: 'Current Age', type: 'number', min: 18, max: 59, step: 1, unit: 'Years' },
      { id: 'expectedReturn', label: 'Expected Growth Rate (%)', type: 'number', min: 5, max: 18, step: 0.5, unit: '%' },
      { id: 'annuityPercent', label: 'Corpus Invested in Annuity (%)', type: 'number', min: 40, max: 100, step: 5, unit: '% (Min 40%)' },
      { id: 'annuityRate', label: 'Expected Annuity Return (%)', type: 'number', min: 4, max: 10, step: 0.5, unit: '%' }
    ],
    calculate: (inputs) => {
      const PMT = Number(inputs.monthlyContribution) || 5000;
      const curAge = Number(inputs.currentAge) || 25;
      const years = Math.max(1, 60 - curAge);
      const r = (Number(inputs.expectedReturn) || 10) / 12 / 100;
      const n = years * 12;

      const totalInvested = PMT * n;
      const totalCorpus = PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

      const annuityPct = (Number(inputs.annuityPercent) || 40) / 100;
      const annuityCorpus = totalCorpus * annuityPct;
      const lumpsumAmount = totalCorpus * (1 - annuityPct);

      const annRate = (Number(inputs.annuityRate) || 6.5) / 100;
      const monthlyPension = (annuityCorpus * annRate) / 12;

      return {
        primaryValue: `₹${Math.round(totalCorpus).toLocaleString()}`,
        primaryLabel: 'Total NPS Corpus at Age 60',
        secondaryMetrics: [
          { label: 'Tax-Free Lumpsum Payout', value: `₹${Math.round(lumpsumAmount).toLocaleString()}` },
          { label: 'Monthly Pension Annuity', value: `₹${Math.round(monthlyPension).toLocaleString()} / month` },
          { label: 'Total Invested Amount', value: `₹${Math.round(totalInvested).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Lumpsum (60%)', value: Math.round(lumpsumAmount), color: '#3b82f6' },
          { label: 'Annuity for Pension (40%)', value: Math.round(annuityCorpus), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 8. HRA (House Rent Allowance) Tax Exemption Calculator
  {
    id: 'hra-calc',
    name: 'HRA (House Rent Allowance) Tax Exemption Calculator',
    category: 'finance',
    subCategory: 'Tax & Compliance',
    description: 'Calculate exact income tax exemption under Section 10(13A) of the Income Tax Act.',
    formula: 'Exempt = MIN(Actual HRA, Rent Paid - 10% Basic, 50% Basic for Metro or 40% Non-metro)',
    formulaExplanation: 'Statutory minimum of 3 clauses as defined in Rule 2A of Income Tax Rules.',
    defaultInputs: { basicSalary: 600000, hraReceived: 240000, rentPaidAnnual: 216000, isMetro: 'metro' },
    fields: [
      { id: 'basicSalary', label: 'Annual Basic Salary + DA', type: 'number', min: 50000, max: 20000000, step: 25000, unit: '₹' },
      { id: 'hraReceived', label: 'Actual HRA Received from Employer (Annual)', type: 'number', min: 0, max: 10000000, step: 10000, unit: '₹' },
      { id: 'rentPaidAnnual', label: 'Total Rent Paid to Landlord (Annual)', type: 'number', min: 0, max: 10000000, step: 10000, unit: '₹' },
      {
        id: 'isMetro',
        label: 'City Location',
        type: 'select',
        options: [
          { label: 'Metro City (Delhi, Mumbai, Kolkata, Chennai - 50%)', value: 'metro' },
          { label: 'Non-Metro City (Bangalore, Pune, Hyderabad, etc. - 40%)', value: 'non_metro' }
        ]
      }
    ],
    calculate: (inputs) => {
      const basic = Number(inputs.basicSalary) || 0;
      const actualHRA = Number(inputs.hraReceived) || 0;
      const rentPaid = Number(inputs.rentPaidAnnual) || 0;
      const isMetro = inputs.isMetro === 'metro';

      const clause1 = actualHRA;
      const clause2 = Math.max(0, rentPaid - 0.10 * basic);
      const clause3 = (isMetro ? 0.50 : 0.40) * basic;

      const exemptHRA = Math.min(clause1, clause2, clause3);
      const taxableHRA = Math.max(0, actualHRA - exemptHRA);

      return {
        primaryValue: `₹${Math.round(exemptHRA).toLocaleString()}`,
        primaryLabel: 'Tax-Exempt HRA Amount',
        secondaryMetrics: [
          { label: 'Taxable HRA Added to Salary', value: `₹${Math.round(taxableHRA).toLocaleString()}` },
          { label: 'Clause 1 (Actual HRA)', value: `₹${clause1.toLocaleString()}` },
          { label: 'Clause 2 (Rent - 10% Basic)', value: `₹${Math.round(clause2).toLocaleString()}` },
          { label: 'Clause 3 (Metro/Non-Metro %)', value: `₹${Math.round(clause3).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Exempt HRA', value: Math.round(exemptHRA), color: '#10b981' },
          { label: 'Taxable HRA', value: Math.round(taxableHRA), color: '#ef4444' }
        ],
        chartType: 'pie'
      };
    }
  }
];
