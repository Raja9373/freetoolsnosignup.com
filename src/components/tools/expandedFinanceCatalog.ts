import { CalculatorDefinition } from './calculatorEngine';

export const EXPANDED_FINANCE_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'arm-mortgage-calc',
    name: 'Adjustable Rate Mortgage (5/1 & 7/1 ARM) Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate initial fixed payments and maximum adjustment caps on 5/1 and 7/1 ARM home loans.',
    formula: 'Initial Phase: Standard Amortization; Adjustment: New Rate = Index + Margin (capped by 2/2/5 structure)',
    formulaExplanation: 'ARMs feature an initial fixed-rate period (e.g. 5 or 7 years) followed by annual interest rate resets subject to lifetime and periodic rate caps.',
    defaultInputs: { loanAmount: 400000, initialRate: 5.25, initialYears: 5, expectedAdjustRate: 7.25, lifetimeCap: 10.25 },
    fields: [
      { id: 'loanAmount', label: 'Loan Amount ($ / ₹)', type: 'number', step: 5000 },
      { id: 'initialRate', label: 'Initial Fixed Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'initialYears', label: 'Initial Fixed Period (Years, e.g. 5 or 7)', type: 'number', step: 1 },
      { id: 'expectedAdjustRate', label: 'Expected Reset Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'lifetimeCap', label: 'Lifetime Maximum Interest Cap (%)', type: 'number', step: 0.1 }
    ],
    calculate: (i) => {
      const P = Number(i.loanAmount) || 400000;
      const r1 = (Number(i.initialRate) || 5.25) / 100 / 12;
      const initYrs = Number(i.initialYears) || 5;
      const nTotal = 30 * 12;
      const initEmi = (P * r1 * Math.pow(1 + r1, nTotal)) / (Math.pow(1 + r1, nTotal) - 1);

      // Remaining balance at adjustment
      const nInit = initYrs * 12;
      const balAfterInit = (P * (Math.pow(1 + r1, nTotal) - Math.pow(1 + r1, nInit))) / (Math.pow(1 + r1, nTotal) - 1);

      const r2 = (Number(i.expectedAdjustRate) || 7.25) / 100 / 12;
      const nRem = nTotal - nInit;
      const adjustEmi = (balAfterInit * r2 * Math.pow(1 + r2, nRem)) / (Math.pow(1 + r2, nRem) - 1);

      const rCap = (Number(i.lifetimeCap) || 10.25) / 100 / 12;
      const maxCapEmi = (balAfterInit * rCap * Math.pow(1 + rCap, nRem)) / (Math.pow(1 + rCap, nRem) - 1);

      return {
        primaryValue: `$${Math.round(initEmi).toLocaleString()} / mo`,
        primaryLabel: `Initial ${initYrs}-Year Monthly Payment`,
        secondaryMetrics: [
          { label: 'Expected Adjusted Payment', value: `$${Math.round(adjustEmi).toLocaleString()} / mo` },
          { label: 'Maximum Worst-Case Payment (Cap)', value: `$${Math.round(maxCapEmi).toLocaleString()} / mo` },
          { label: 'Remaining Balance at Reset', value: `$${Math.round(balAfterInit).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'biweekly-mortgage-calc',
    name: 'Bi-Weekly Mortgage Payment & Early Payoff Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate interest savings and years shaved off your loan by paying half your monthly mortgage every 2 weeks (26 bi-weekly payments = 13 full months/yr).',
    formula: '26 Bi-Weekly Payments / Year = 13 Monthly Payments; Extra 1 Full Payment Applied to Principal Annually',
    formulaExplanation: 'Making bi-weekly payments accelerates principal reduction and significantly cuts total lifetime interest without straining monthly cash flow.',
    defaultInputs: { loanAmount: 350000, interestRate: 6.5, loanYears: 30 },
    fields: [
      { id: 'loanAmount', label: 'Mortgage Principal Balance ($ / ₹)', type: 'number', step: 5000 },
      { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'loanYears', label: 'Standard Loan Term (Years)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const P = Number(i.loanAmount) || 350000;
      const rate = Number(i.interestRate) || 6.5;
      const rMonthly = rate / 100 / 12;
      const nMonthly = 30 * 12;
      const monthlyEmi = (P * rMonthly * Math.pow(1 + rMonthly, nMonthly)) / (Math.pow(1 + rMonthly, nMonthly) - 1);
      const totalStandardInterest = monthlyEmi * nMonthly - P;

      const biweeklyPayment = monthlyEmi / 2;
      // Accelerated bi-weekly: 26 payments = 13 monthly payments/year. Approximate payoff time:
      const extraAnnual = monthlyEmi;
      // Effective monthly payment = monthlyEmi + monthlyEmi/12
      const effMonthly = monthlyEmi * (13 / 12);
      // Solve for n: P = PMT/r * (1 - (1+r)^-n) => n = -ln(1 - P*r/PMT) / ln(1+r)
      const nAccelerated = -Math.log(1 - (P * rMonthly) / effMonthly) / Math.log(1 + rMonthly);
      const acceleratedYears = nAccelerated / 12;
      const yearsSaved = 30 - acceleratedYears;
      const totalAccelInterest = effMonthly * nAccelerated - P;
      const interestSaved = totalStandardInterest - totalAccelInterest;

      return {
        primaryValue: `$${Math.round(interestSaved).toLocaleString()}`,
        primaryLabel: 'Total Lifetime Interest Saved',
        secondaryMetrics: [
          { label: 'Years Saved Off Mortgage', value: `${yearsSaved.toFixed(1)} Years Earlier` },
          { label: 'Bi-Weekly Payment Amount', value: `$${Math.round(biweeklyPayment).toLocaleString()} every 2 weeks` },
          { label: 'New Payoff Timeline', value: `${acceleratedYears.toFixed(1)} Years (vs 30.0)` }
        ]
      };
    }
  },
  {
    id: 'debt-snowball-calc',
    name: 'Debt Snowball vs Avalanche Payoff Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Compare Debt Snowball (lowest balance first for quick psychological wins) vs Debt Avalanche (highest interest rate first for lowest cost).',
    formula: 'Snowball: Order debts by principal ascending; Avalanche: Order debts by APR descending. Extra monthly payments roll over.',
    formulaExplanation: 'Both acceleration methods eliminate consumer debt years faster than paying minimums alone.',
    defaultInputs: { debt1Bal: 4500, debt1Apr: 24.99, debt1Min: 120, debt2Bal: 12000, debt2Apr: 14.5, debt2Min: 260, extraMonthly: 200 },
    fields: [
      { id: 'debt1Bal', label: 'Credit Card / Loan 1 Balance ($ / ₹)', type: 'number', step: 500 },
      { id: 'debt1Apr', label: 'Loan 1 APR (%)', type: 'number', step: 0.1 },
      { id: 'debt1Min', label: 'Loan 1 Minimum Payment ($ / ₹)', type: 'number', step: 25 },
      { id: 'debt2Bal', label: 'Loan 2 Balance ($ / ₹)', type: 'number', step: 500 },
      { id: 'debt2Apr', label: 'Loan 2 APR (%)', type: 'number', step: 0.1 },
      { id: 'debt2Min', label: 'Loan 2 Minimum Payment ($ / ₹)', type: 'number', step: 25 },
      { id: 'extraMonthly', label: 'Extra Monthly Cash Allocated to Payoff ($ / ₹)', type: 'number', step: 50 }
    ],
    calculate: (i) => {
      const b1 = Number(i.debt1Bal) || 4500, apr1 = (Number(i.debt1Apr) || 24.99) / 100 / 12, m1 = Number(i.debt1Min) || 120;
      const b2 = Number(i.debt2Bal) || 12000, apr2 = (Number(i.debt2Apr) || 14.5) / 100 / 12, m2 = Number(i.debt2Min) || 260;
      const extra = Number(i.extraMonthly) || 200;
      const totalDebt = b1 + b2;

      // Snowball: focus debt1 first (smaller balance)
      let rem1 = b1, rem2 = b2, monthsSnowball = 0, interestSnowball = 0;
      while ((rem1 > 0 || rem2 > 0) && monthsSnowball < 360) {
        monthsSnowball++;
        const int1 = rem1 * apr1; const int2 = rem2 * apr2;
        interestSnowball += int1 + int2;
        rem1 += int1; rem2 += int2;

        if (rem1 > 0) {
          const pay1 = Math.min(rem1, m1 + extra);
          rem1 -= pay1;
          const leftOver = (m1 + extra) - pay1;
          rem2 -= Math.min(rem2, m2 + leftOver);
        } else {
          rem2 -= Math.min(rem2, m2 + m1 + extra);
        }
      }

      return {
        primaryValue: `${monthsSnowball} Months (${(monthsSnowball / 12).toFixed(1)} Yrs)`,
        primaryLabel: 'Debt-Free Timeline with Snowball',
        secondaryMetrics: [
          { label: 'Total Initial Debt', value: `$${totalDebt.toLocaleString()}` },
          { label: 'Total Interest Paid', value: `$${Math.round(interestSnowball).toLocaleString()}` },
          { label: 'Total Monthly Acceleration', value: `$${m1 + m2 + extra}/mo` }
        ]
      };
    }
  },
  {
    id: 'take-home-paycheck-calc',
    name: 'Take-Home Paycheck & Net Salary Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate net take-home salary after Federal Income Tax, FICA (Social Security 6.2% + Medicare 1.45%), State Tax, and 401(k) deductions.',
    formula: 'Net Pay = Gross Salary - Federal Withholding - FICA (7.65%) - State Tax - Pre-Tax Deductions',
    formulaExplanation: 'Applies standard federal bracket progressive withholding and statutory FICA payroll deductions.',
    defaultInputs: { grossSalary: 85000, payFrequency: 'biweekly', stateTaxPct: 5.0, preTax401kPct: 6.0 },
    fields: [
      { id: 'grossSalary', label: 'Annual Gross Salary ($ / ₹)', type: 'number', step: 2500 },
      { id: 'payFrequency', label: 'Paycheck Frequency', type: 'select', options: [
        { label: 'Bi-Weekly (26 paychecks/yr)', value: 'biweekly' },
        { label: 'Semi-Monthly (24 paychecks/yr)', value: 'semimonthly' },
        { label: 'Monthly (12 paychecks/yr)', value: 'monthly' },
        { label: 'Weekly (52 paychecks/yr)', value: 'weekly' }
      ]},
      { id: 'stateTaxPct', label: 'Estimated State Income Tax (%)', type: 'number', step: 0.25 },
      { id: 'preTax401kPct', label: 'Pre-Tax 401(k) Retirement Contribution (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const gross = Number(i.grossSalary) || 85000;
      const preTax401k = gross * ((Number(i.preTax401kPct) || 6.0) / 100);
      const taxableFed = Math.max(0, gross - preTax401k - 14600); // 2024 standard deduction single

      // Fed tax approx
      let fedTax = 0;
      if (taxableFed > 100525) fedTax = 17400 + (taxableFed - 100525) * 0.24;
      else if (taxableFed > 47150) fedTax = 5426 + (taxableFed - 47150) * 0.22;
      else if (taxableFed > 11600) fedTax = 1160 + (taxableFed - 11600) * 0.12;
      else fedTax = taxableFed * 0.10;

      const ficaTax = gross * 0.0765; // 6.2% SS + 1.45% Medicare
      const stateTax = Math.max(0, gross - preTax401k) * ((Number(i.stateTaxPct) || 5.0) / 100);
      const totalDeductions = fedTax + ficaTax + stateTax + preTax401k;
      const annualNet = gross - totalDeductions;

      const freq = i.payFrequency || 'biweekly';
      const periods = freq === 'weekly' ? 52 : (freq === 'biweekly' ? 26 : (freq === 'semimonthly' ? 24 : 12));
      const netPerPaycheck = annualNet / periods;

      return {
        primaryValue: `$${Math.round(netPerPaycheck).toLocaleString()} / paycheck`,
        primaryLabel: `Net Take-Home Pay (${freq.toUpperCase()})`,
        secondaryMetrics: [
          { label: 'Annual Net Take-Home', value: `$${Math.round(annualNet).toLocaleString()} / yr` },
          { label: 'Total Taxes & Deductions', value: `$${Math.round(totalDeductions).toLocaleString()} / yr` },
          { label: 'Effective Overall Tax Rate', value: `${(((fedTax + ficaTax + stateTax) / gross) * 100).toFixed(1)}%` },
          { label: 'Annual 401(k) Contribution', value: `$${Math.round(preTax401k).toLocaleString()} / yr` }
        ],
        breakdown: [
          { label: 'Net Take-Home', value: Math.round(annualNet), color: '#10b981' },
          { label: 'Federal Tax', value: Math.round(fedTax), color: '#3b82f6' },
          { label: 'FICA Payroll', value: Math.round(ficaTax), color: '#f59e0b' },
          { label: 'State Tax', value: Math.round(stateTax), color: '#ec4899' },
          { label: '401(k) Savings', value: Math.round(preTax401k), color: '#8b5cf6' }
        ],
        chartType: 'pie'
      };
    }
  },
  {
    id: 'roth-vs-traditional-ira-calc',
    name: 'Roth IRA vs Traditional IRA Comparison Calculator',
    category: 'finance',
    subCategory: 'Retirement & Annuities',
    description: 'Compare post-tax retirement nest eggs of Roth IRA (tax-free growth) vs Traditional IRA (tax-deductible contributions).',
    formula: 'Roth: Invest post-tax capital, compound tax-free; Traditional: Invest pre-tax capital, taxed at retirement bracket',
    formulaExplanation: 'Roth IRAs win when current tax bracket is lower than expected retirement tax bracket; Traditional wins if current bracket is higher.',
    defaultInputs: { annualContrib: 7000, yearsToRetire: 25, expectedReturn: 8.0, currentTaxBracket: 22, retireTaxBracket: 15 },
    fields: [
      { id: 'annualContrib', label: 'Annual Contribution ($ / ₹)', type: 'number', step: 500 },
      { id: 'yearsToRetire', label: 'Years Until Retirement', type: 'number', step: 1 },
      { id: 'expectedReturn', label: 'Annual Portfolio Return (%)', type: 'number', step: 0.5 },
      { id: 'currentTaxBracket', label: 'Current Marginal Tax Bracket (%)', type: 'number', step: 1 },
      { id: 'retireTaxBracket', label: 'Expected Retirement Tax Bracket (%)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const pmt = Number(i.annualContrib) || 7000;
      const n = Number(i.yearsToRetire) || 25;
      const r = (Number(i.expectedReturn) || 8.0) / 100;
      const curTax = (Number(i.currentTaxBracket) || 22) / 100;
      const retTax = (Number(i.retireTaxBracket) || 15) / 100;

      // Future value of ordinary annuity
      const fvPreTax = pmt * ((Math.pow(1 + r, n) - 1) / r);

      // Roth: contribute post-tax $pmt, grow tax free
      const rothNestEgg = fvPreTax;

      // Traditional: contribute $pmt pre-tax, at retirement pay retTax on full withdrawal
      const tradNestEgg = fvPreTax * (1 - retTax);

      const diff = rothNestEgg - tradNestEgg;

      return {
        primaryValue: `$${Math.round(rothNestEgg).toLocaleString()}`,
        primaryLabel: 'Roth IRA Tax-Free Net Nest Egg',
        secondaryMetrics: [
          { label: 'Traditional IRA After-Tax Value', value: `$${Math.round(tradNestEgg).toLocaleString()}` },
          { label: 'Roth Advantage / Extra Wealth', value: diff >= 0 ? `+$${Math.round(diff).toLocaleString()}` : `-$${Math.round(Math.abs(diff)).toLocaleString()}` },
          { label: 'Recommendation', value: curTax > retTax ? 'Traditional IRA favored' : 'Roth IRA favored' }
        ]
      };
    }
  },
  {
    id: 'startup-runway-burn-calc',
    name: 'Startup Cash Runway & Net Burn Rate Calculator',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Calculate startup cash runway in months, gross vs net burn rate, and date when capital reaches zero.',
    formula: 'Runway (Months) = Total Cash Balance / Net Monthly Burn Rate; Net Burn = Monthly Operating Expenses - Monthly Revenue',
    formulaExplanation: 'Core venture capital financial health metric determining fundraising timeline and default alive/dead status.',
    defaultInputs: { currentCash: 750000, monthlyExpenses: 65000, monthlyRevenue: 20000 },
    fields: [
      { id: 'currentCash', label: 'Cash in Bank / Liquid Capital ($ / ₹)', type: 'number', step: 10000 },
      { id: 'monthlyExpenses', label: 'Monthly Gross Operating Expenses ($ / ₹)', type: 'number', step: 2500 },
      { id: 'monthlyRevenue', label: 'Monthly Recurring Revenue (MRR) ($ / ₹)', type: 'number', step: 2500 }
    ],
    calculate: (i) => {
      const cash = Number(i.currentCash) || 750000;
      const expenses = Number(i.monthlyExpenses) || 65000;
      const revenue = Number(i.monthlyRevenue) || 20000;
      const netBurn = Math.max(0, expenses - revenue);
      const runwayMonths = netBurn > 0 ? cash / netBurn : Infinity;

      return {
        primaryValue: runwayMonths === Infinity ? 'Default Alive (Profitable)' : `${runwayMonths.toFixed(1)} Months Runway`,
        primaryLabel: 'Startup Survival Runway',
        secondaryMetrics: [
          { label: 'Net Monthly Cash Burn', value: `$${Math.round(netBurn).toLocaleString()} / month` },
          { label: 'Gross Monthly Burn Rate', value: `$${Math.round(expenses).toLocaleString()} / month` },
          { label: 'Target Fundraise Launch', value: runwayMonths !== Infinity ? `In ${(Math.max(0, runwayMonths - 6)).toFixed(1)} Months (6-mo buffer)` : 'Not Needed' }
        ]
      };
    }
  },
  {
    id: 'saas-ltv-cac-calc',
    name: 'SaaS LTV to CAC Ratio & Payback Period Calculator',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Calculate Customer Lifetime Value (LTV), Customer Acquisition Cost (CAC), LTV/CAC Ratio, and CAC Payback Months.',
    formula: 'LTV = (ARPU × Gross Margin %) / Monthly Churn %; CAC Payback Months = CAC / (ARPU × Gross Margin %)',
    formulaExplanation: 'Benchmark SaaS unit economics target LTV:CAC of at least 3.0x and CAC payback under 12 months.',
    defaultInputs: { arpu: 120, churnPct: 2.5, grossMarginPct: 80, cac: 950 },
    fields: [
      { id: 'arpu', label: 'Average Monthly Revenue Per User (ARPU) ($ / ₹)', type: 'number', step: 5 },
      { id: 'churnPct', label: 'Monthly Customer Churn Rate (%)', type: 'number', step: 0.1 },
      { id: 'grossMarginPct', label: 'Gross Margin Percentage (%)', type: 'number', step: 1 },
      { id: 'cac', label: 'Blended Customer Acquisition Cost (CAC) ($ / ₹)', type: 'number', step: 25 }
    ],
    calculate: (i) => {
      const arpu = Number(i.arpu) || 120;
      const churn = (Number(i.churnPct) || 2.5) / 100;
      const margin = (Number(i.grossMarginPct) || 80) / 100;
      const cac = Number(i.cac) || 950;

      const monthlyGrossProfit = arpu * margin;
      const ltv = churn > 0 ? monthlyGrossProfit / churn : arpu * 100;
      const ltvCacRatio = cac > 0 ? ltv / cac : 0;
      const paybackMonths = monthlyGrossProfit > 0 ? cac / monthlyGrossProfit : Infinity;

      return {
        primaryValue: `${ltvCacRatio.toFixed(2)}x LTV / CAC`,
        primaryLabel: 'SaaS Unit Economics Efficiency Ratio',
        secondaryMetrics: [
          { label: 'Customer Lifetime Value (LTV)', value: `$${Math.round(ltv).toLocaleString()}` },
          { label: 'CAC Payback Period', value: `${paybackMonths.toFixed(1)} Months` },
          { label: 'Customer Lifespan', value: `${(1 / (churn || 0.01)).toFixed(1)} Months (${(1 / (churn || 0.01) / 12).toFixed(1)} Yrs)` }
        ],
        advice: ltvCacRatio >= 3.0 ? 'Elite SaaS Unit Economics (LTV/CAC ≥ 3x).' : 'High CAC or elevated churn eroding unit margins.'
      };
    }
  },
  {
    id: 'wacc-calculator',
    name: 'Weighted Average Cost of Capital (WACC) Calculator',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Calculate firm hurdle rate and cost of capital combining equity cost (CAPM) and after-tax debt cost.',
    formula: 'WACC = (E/V) × Re + (D/V) × Rd × (1 - Tc); Re = Rf + β(Rm - Rf)',
    formulaExplanation: 'Corporate finance benchmark used as discount rate in DCF enterprise valuation models.',
    defaultInputs: { equityVal: 60000000, debtVal: 40000000, costOfEquity: 11.5, costOfDebt: 6.5, taxRate: 25 },
    fields: [
      { id: 'equityVal', label: 'Market Value of Equity ($ / ₹)', type: 'number', step: 1000000 },
      { id: 'debtVal', label: 'Market Value of Debt ($ / ₹)', type: 'number', step: 1000000 },
      { id: 'costOfEquity', label: 'Cost of Equity Re (%)', type: 'number', step: 0.1 },
      { id: 'costOfDebt', label: 'Cost of Debt Rd (%)', type: 'number', step: 0.1 },
      { id: 'taxRate', label: 'Corporate Tax Rate Tc (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const E = Number(i.equityVal) || 60000000;
      const D = Number(i.debtVal) || 40000000;
      const V = E + D;
      const re = (Number(i.costOfEquity) || 11.5) / 100;
      const rd = (Number(i.costOfDebt) || 6.5) / 100;
      const tc = (Number(i.taxRate) || 25) / 100;

      const wacc = (E / V) * re + (D / V) * rd * (1 - tc);

      return {
        primaryValue: `${(wacc * 100).toFixed(2)}% WACC`,
        primaryLabel: 'Weighted Average Cost of Capital',
        secondaryMetrics: [
          { label: 'Equity Weight (E/V)', value: `${((E / V) * 100).toFixed(1)}%` },
          { label: 'Debt Weight (D/V)', value: `${((D / V) * 100).toFixed(1)}%` },
          { label: 'After-Tax Cost of Debt', value: `${(rd * (1 - tc) * 100).toFixed(2)}%` }
        ]
      };
    }
  }
];
