import { CalculatorDefinition } from './calculatorEngine';

export const ADVANCED_MATH_EVERYDAY_CALCULATORS: CalculatorDefinition[] = [
  // ==========================================
  // 1. FINANCIAL & REAL ESTATE (CALCULATOR.NET)
  // ==========================================
  {
    id: 'annuity-calc',
    name: 'Annuity Payout & Present Value Calculator',
    category: 'finance',
    subCategory: 'Retirement & Annuities',
    description: 'Calculate fixed immediate annuity monthly payouts, total payout over life expectancy, or lump-sum present value.',
    formula: 'PMT = PV × [r / (1 - (1+r)^-n)]',
    formulaExplanation: 'Standard ordinary annuity amortization formula where r is monthly rate and n is total months.',
    defaultInputs: { pv: 250000, rate: 5.5, years: 20 },
    fields: [
      { id: 'pv', label: 'Initial Annuity Principal / Premium ($ / ₹)', type: 'number', step: 5000 },
      { id: 'rate', label: 'Guaranteed Annual Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'years', label: 'Payout Duration (Years)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const PV = Number(i.pv) || 250000;
      const annualRate = (Number(i.rate) || 5.5) / 100;
      const r = annualRate / 12;
      const n = (Number(i.years) || 20) * 12;
      const pmt = r === 0 ? PV / n : (PV * r) / (1 - Math.pow(1 + r, -n));
      const totalPayout = pmt * n;
      const totalInterest = totalPayout - PV;
      return {
        primaryValue: `$${Math.round(pmt).toLocaleString()} / month`,
        primaryLabel: 'Guaranteed Monthly Annuity Payout',
        secondaryMetrics: [
          { label: 'Total Payout Received', value: `$${Math.round(totalPayout).toLocaleString()}` },
          { label: 'Total Interest Earned', value: `$${Math.round(totalInterest).toLocaleString()}` },
          { label: 'Annual Income', value: `$${Math.round(pmt * 12).toLocaleString()} / year` }
        ],
        breakdown: [
          { label: 'Principal Returned', value: PV, color: '#3b82f6' },
          { label: 'Interest Growth', value: Math.round(totalInterest), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },
  {
    id: 'refinance-calc',
    name: 'Mortgage Refinance & Break-Even Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Compare current mortgage against new refinance terms to find exact monthly savings and break-even months.',
    formula: 'Monthly Savings = Current Payment - New Payment; Break-Even = Closing Costs / Monthly Savings',
    formulaExplanation: 'Calculates the exact number of months needed for interest savings to cover all closing expenses.',
    defaultInputs: { curBalance: 300000, curRate: 6.8, curYears: 25, newRate: 5.2, newYears: 30, closingCosts: 4500 },
    fields: [
      { id: 'curBalance', label: 'Remaining Loan Balance ($ / ₹)', type: 'number', step: 5000 },
      { id: 'curRate', label: 'Current Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'curYears', label: 'Remaining Current Term (Years)', type: 'number', step: 1 },
      { id: 'newRate', label: 'New Refinance Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'newYears', label: 'New Refinance Term (Years)', type: 'number', step: 1 },
      { id: 'closingCosts', label: 'Total Refinance Closing Costs ($ / ₹)', type: 'number', step: 500 }
    ],
    calculate: (i) => {
      const bal = Number(i.curBalance) || 300000;
      const cRate = (Number(i.curRate) || 6.8) / 100 / 12;
      const cN = (Number(i.curYears) || 25) * 12;
      const curPMT = (bal * cRate * Math.pow(1 + cRate, cN)) / (Math.pow(1 + cRate, cN) - 1);

      const nRate = (Number(i.newRate) || 5.2) / 100 / 12;
      const nN = (Number(i.newYears) || 30) * 12;
      const newPMT = (bal * nRate * Math.pow(1 + nRate, nN)) / (Math.pow(1 + nRate, nN) - 1);

      const monthlySavings = curPMT - newPMT;
      const costs = Number(i.closingCosts) || 4500;
      const breakEvenMonths = monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : Infinity;

      return {
        primaryValue: monthlySavings > 0 ? `$${Math.round(monthlySavings).toLocaleString()} / month` : 'No Monthly Savings',
        primaryLabel: 'Monthly Payment Reduction',
        secondaryMetrics: [
          { label: 'Break-Even Point', value: breakEvenMonths === Infinity ? 'Never' : `${breakEvenMonths} Months (${(breakEvenMonths / 12).toFixed(1)} Yrs)` },
          { label: 'Current Monthly Payment', value: `$${Math.round(curPMT).toLocaleString()}` },
          { label: 'New Monthly Payment', value: `$${Math.round(newPMT).toLocaleString()}` },
          { label: '5-Year Net Savings', value: `$${Math.round(Math.max(0, monthlySavings * 60 - costs)).toLocaleString()}` }
        ],
        advice: breakEvenMonths < 36 ? 'Refinancing is financially beneficial if you plan to stay in the home longer than the break-even period.' : 'Closing costs may outweigh rate savings.'
      };
    }
  },
  {
    id: 'cap-rate-calc',
    name: 'Real Estate Cap Rate & NOI Calculator',
    category: 'finance',
    subCategory: 'Real Estate & Investment',
    description: 'Calculate Net Operating Income (NOI) and Capitalization Rate (Cap Rate) to evaluate commercial & residential properties.',
    formula: 'Cap Rate (%) = (Net Operating Income / Current Market Property Value) × 100',
    formulaExplanation: 'NOI is Gross Operating Income minus operating expenses (property taxes, insurance, maintenance, vacancy). Excludes mortgage payments.',
    defaultInputs: { propValue: 500000, monthlyRent: 4000, vacancyPct: 5, operatingExp: 12000 },
    fields: [
      { id: 'propValue', label: 'Property Purchase Price / Market Value ($ / ₹)', type: 'number', step: 10000 },
      { id: 'monthlyRent', label: 'Gross Monthly Rental Income ($ / ₹)', type: 'number', step: 100 },
      { id: 'vacancyPct', label: 'Estimated Vacancy Rate (%)', type: 'number', step: 1 },
      { id: 'operatingExp', label: 'Annual Operating Expenses ($ / ₹)', type: 'number', step: 500 }
    ],
    calculate: (i) => {
      const val = Number(i.propValue) || 500000;
      const grossAnnualRent = (Number(i.monthlyRent) || 4000) * 12;
      const vacancy = grossAnnualRent * ((Number(i.vacancyPct) || 5) / 100);
      const effectiveGrossIncome = grossAnnualRent - vacancy;
      const expenses = Number(i.operatingExp) || 12000;
      const noi = effectiveGrossIncome - expenses;
      const capRate = (noi / val) * 100;

      return {
        primaryValue: `${capRate.toFixed(2)}%`,
        primaryLabel: 'Property Capitalization Rate (Cap Rate)',
        secondaryMetrics: [
          { label: 'Net Operating Income (NOI)', value: `$${Math.round(noi).toLocaleString()} / year` },
          { label: 'Effective Gross Income', value: `$${Math.round(effectiveGrossIncome).toLocaleString()}` },
          { label: 'Gross Rent Multiplier (GRM)', value: `${(val / grossAnnualRent).toFixed(2)}x` },
          { label: 'Monthly NOI', value: `$${Math.round(noi / 12).toLocaleString()} / mo` }
        ],
        advice: capRate >= 7 ? 'Strong Cap Rate indicating solid commercial or rental yield potential.' : 'Lower Cap Rate typical for prime appreciation markets.'
      };
    }
  },
  {
    id: 'rental-property-cashflow-calc',
    name: 'Rental Property Cash Flow & Cash-on-Cash Return',
    category: 'finance',
    subCategory: 'Real Estate & Investment',
    description: 'Calculate net monthly cash flow, annual cash-on-cash return, and return on investment for buy-and-hold real estate.',
    formula: 'Cash-on-Cash Return (%) = (Annual Pre-Tax Cash Flow / Total Cash Invested) × 100',
    formulaExplanation: 'Evaluates annual net cash in pocket relative to down payment, closing costs, and initial rehab cash invested.',
    defaultInputs: { downPayment: 60000, closingRehab: 15000, monthlyRent: 2200, monthlyMortgage: 1100, monthlyTaxesIns: 350, monthlyMaint: 200 },
    fields: [
      { id: 'downPayment', label: 'Down Payment Invested ($ / ₹)', type: 'number', step: 2500 },
      { id: 'closingRehab', label: 'Closing Costs + Initial Rehab ($ / ₹)', type: 'number', step: 1000 },
      { id: 'monthlyRent', label: 'Monthly Rental Income ($ / ₹)', type: 'number', step: 50 },
      { id: 'monthlyMortgage', label: 'Monthly Mortgage P&I ($ / ₹)', type: 'number', step: 50 },
      { id: 'monthlyTaxesIns', label: 'Monthly Property Tax & Insurance ($ / ₹)', type: 'number', step: 25 },
      { id: 'monthlyMaint', label: 'Monthly Repairs, CapEx & HOA ($ / ₹)', type: 'number', step: 25 }
    ],
    calculate: (i) => {
      const totalCashInvested = (Number(i.downPayment) || 60000) + (Number(i.closingRehab) || 15000);
      const rent = Number(i.monthlyRent) || 2200;
      const totalExpenses = (Number(i.monthlyMortgage) || 1100) + (Number(i.monthlyTaxesIns) || 350) + (Number(i.monthlyMaint) || 200);
      const monthlyCashFlow = rent - totalExpenses;
      const annualCashFlow = monthlyCashFlow * 12;
      const cocReturn = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

      return {
        primaryValue: `$${Math.round(monthlyCashFlow).toLocaleString()} / month`,
        primaryLabel: 'Net Passive Monthly Cash Flow',
        secondaryMetrics: [
          { label: 'Cash-on-Cash Return (CoC)', value: `${cocReturn.toFixed(2)}% / year` },
          { label: 'Total Cash Invested', value: `$${Math.round(totalCashInvested).toLocaleString()}` },
          { label: 'Annual Net Cash Flow', value: `$${Math.round(annualCashFlow).toLocaleString()} / year` },
          { label: 'Operating Expense Ratio', value: `${(((totalExpenses - (Number(i.monthlyMortgage) || 1100)) / rent) * 100).toFixed(1)}%` }
        ],
        breakdown: [
          { label: 'Mortgage', value: Number(i.monthlyMortgage) || 1100, color: '#3b82f6' },
          { label: 'Taxes & Ins', value: Number(i.monthlyTaxesIns) || 350, color: '#f59e0b' },
          { label: 'Maintenance', value: Number(i.monthlyMaint) || 200, color: '#ec4899' },
          { label: 'Net Profit', value: Math.max(0, monthlyCashFlow), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },
  {
    id: 'house-affordability-calc',
    name: 'Home & House Affordability Calculator (28/36 Rule)',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Determine maximum affordable home purchase price based on gross household income, down payment, and monthly debt.',
    formula: 'Front-End Ratio: Max PITI ≤ 28% of Gross Income; Back-End Ratio: Total Debt ≤ 36% of Gross Income',
    formulaExplanation: 'Lenders evaluate front-end housing expense ratio (28%) and back-end total debt obligations (36%) to qualify borrowers.',
    defaultInputs: { annualIncome: 95000, monthlyDebts: 600, downPayment: 50000, interestRate: 6.5, loanYears: 30 },
    fields: [
      { id: 'annualIncome', label: 'Gross Annual Household Income ($ / ₹)', type: 'number', step: 5000 },
      { id: 'monthlyDebts', label: 'Monthly Recurring Debts (Cars, Student, Cards) ($ / ₹)', type: 'number', step: 100 },
      { id: 'downPayment', label: 'Available Down Payment ($ / ₹)', type: 'number', step: 5000 },
      { id: 'interestRate', label: 'Estimated Mortgage Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'loanYears', label: 'Loan Term (Years)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const grossMonthly = (Number(i.annualIncome) || 95000) / 12;
      const debts = Number(i.monthlyDebts) || 600;
      const maxFront = grossMonthly * 0.28;
      const maxBack = Math.max(0, grossMonthly * 0.36 - debts);
      const maxPITI = Math.min(maxFront, maxBack);

      // Estimate principal & interest as ~80% of max PITI (with 20% for taxes, insurance, HOA)
      const maxPI = maxPITI * 0.82;
      const r = (Number(i.interestRate) || 6.5) / 100 / 12;
      const n = (Number(i.loanYears) || 30) * 12;
      const maxLoan = maxPI * ((1 - Math.pow(1 + r, -n)) / r);
      const down = Number(i.downPayment) || 50000;
      const maxHomePrice = maxLoan + down;

      return {
        primaryValue: `$${Math.round(maxHomePrice).toLocaleString()}`,
        primaryLabel: 'Maximum Recommended Purchase Price',
        secondaryMetrics: [
          { label: 'Max Monthly Payment (PITI)', value: `$${Math.round(maxPITI).toLocaleString()} / mo` },
          { label: 'Qualifying Mortgage Loan', value: `$${Math.round(maxLoan).toLocaleString()}` },
          { label: 'Front-End DTI Ratio', value: '28.0%' },
          { label: 'Back-End DTI Ratio', value: `${(((debts + maxPITI) / grossMonthly) * 100).toFixed(1)}%` }
        ]
      };
    }
  },
  {
    id: 'cd-ladder-calc',
    name: 'Certificate of Deposit (CD) Laddering Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate liquidity and compounding interest earnings from staggered 1, 2, 3, 4, and 5-year CD maturity ladders.',
    formula: 'A_k = (P / K) × (1 + r_k / n)^(n × t_k)',
    formulaExplanation: 'Splits capital evenly across multiple CD maturities to combine higher yields with regular liquidity renewals.',
    defaultInputs: { capital: 50000, rate1: 4.8, rate2: 5.0, rate3: 5.2, rate4: 5.4, rate5: 5.6 },
    fields: [
      { id: 'capital', label: 'Total Investment Capital ($ / ₹)', type: 'number', step: 5000 },
      { id: 'rate1', label: '1-Year CD APY (%)', type: 'number', step: 0.1 },
      { id: 'rate2', label: '2-Year CD APY (%)', type: 'number', step: 0.1 },
      { id: 'rate3', label: '3-Year CD APY (%)', type: 'number', step: 0.1 },
      { id: 'rate4', label: '4-Year CD APY (%)', type: 'number', step: 0.1 },
      { id: 'rate5', label: '5-Year CD APY (%)', type: 'number', step: 0.1 }
    ],
    calculate: (i) => {
      const cap = Number(i.capital) || 50000;
      const leg = cap / 5;
      const rates = [
        Number(i.rate1) || 4.8,
        Number(i.rate2) || 5.0,
        Number(i.rate3) || 5.2,
        Number(i.rate4) || 5.4,
        Number(i.rate5) || 5.6
      ];
      let totalInterest = 0;
      rates.forEach((rate, idx) => {
        const years = idx + 1;
        const maturity = leg * Math.pow(1 + rate / 100, years);
        totalInterest += (maturity - leg);
      });
      const blendedAPY = rates.reduce((a, b) => a + b, 0) / 5;

      return {
        primaryValue: `$${Math.round(totalInterest).toLocaleString()}`,
        primaryLabel: 'Total CD Ladder Interest Over 5 Years',
        secondaryMetrics: [
          { label: 'Average Blended APY', value: `${blendedAPY.toFixed(2)}%` },
          { label: 'Annual Maturing Capital', value: `$${Math.round(leg).toLocaleString()} / year` },
          { label: 'Final Total Portfolio', value: `$${Math.round(cap + totalInterest).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'social-security-calc',
    name: 'Social Security Benefits & Retirement Age Estimator',
    category: 'finance',
    subCategory: 'Retirement & Annuities',
    description: 'Compare Social Security monthly benefit checks claimed early at 62, Full Retirement Age (67), or delayed to age 70 (+24%).',
    formula: 'Age 62: 70% of PIA; Age 67: 100% of PIA; Age 70: 124% of PIA (8% delayed retirement credit/yr)',
    formulaExplanation: 'Primary Insurance Amount (PIA) increases by 8% per year for every year delayed past Full Retirement Age up to age 70.',
    defaultInputs: { primaryInsurance: 2400 },
    fields: [
      { id: 'primaryInsurance', label: 'Estimated Monthly Benefit at Full Retirement Age (67) ($)', type: 'number', step: 100 }
    ],
    calculate: (i) => {
      const pia = Number(i.primaryInsurance) || 2400;
      const early62 = pia * 0.70;
      const normal67 = pia * 1.00;
      const delayed70 = pia * 1.24;

      return {
        primaryValue: `$${Math.round(delayed70).toLocaleString()} / month`,
        primaryLabel: 'Maximum Monthly Benefit at Age 70 (+24%)',
        secondaryMetrics: [
          { label: 'Claim at Age 62 (Early)', value: `$${Math.round(early62).toLocaleString()} / mo (-30%)` },
          { label: 'Claim at Age 67 (FRA)', value: `$${Math.round(normal67).toLocaleString()} / mo (100%)` },
          { label: 'Lifetime Difference by Age 85', value: `$${Math.round((delayed70 * 15 * 12) - (early62 * 23 * 12)).toLocaleString()}` }
        ],
        advice: 'Delaying until age 70 permanently locks in an 8% annual guaranteed raise for each year past Full Retirement Age.'
      };
    }
  },
  {
    id: 'margin-markup-calc',
    name: 'Gross Margin & Markup Percentage Calculator',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Instantly convert between Gross Margin %, Markup %, Cost of Goods Sold (COGS), and Selling Retail Price.',
    formula: 'Margin (%) = ((Revenue - Cost) / Revenue) × 100; Markup (%) = ((Revenue - Cost) / Cost) × 100',
    formulaExplanation: 'Margin is profit divided by revenue. Markup is profit divided by cost.',
    defaultInputs: { cost: 60, price: 100 },
    fields: [
      { id: 'cost', label: 'Cost of Goods / Item Cost ($ / ₹)', type: 'number', step: 5 },
      { id: 'price', label: 'Selling / Retail Price ($ / ₹)', type: 'number', step: 5 }
    ],
    calculate: (i) => {
      const cost = Number(i.cost) || 60;
      const price = Number(i.price) || 100;
      const profit = price - cost;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      const markup = cost > 0 ? (profit / cost) * 100 : 0;

      return {
        primaryValue: `${margin.toFixed(2)}% Margin`,
        primaryLabel: 'Gross Profit Margin Percentage',
        secondaryMetrics: [
          { label: 'Markup on Cost', value: `${markup.toFixed(2)}% Markup` },
          { label: 'Gross Profit per Unit', value: `$${profit.toFixed(2)}` },
          { label: 'Revenue Multiplier', value: `${(price / (cost || 1)).toFixed(2)}x` }
        ]
      };
    }
  },
  {
    id: 'payback-period-calc',
    name: 'Payback Period & ROI Capital Recovery Calculator',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Calculate how many years and months it takes for project cash flows to fully recover initial investment capital.',
    formula: 'Payback Period = Initial Capital Investment / Annual Net Cash Flow',
    formulaExplanation: 'Standard corporate finance metric evaluating capital recovery speed and risk exposure.',
    defaultInputs: { initialCost: 120000, annualCashFlow: 35000 },
    fields: [
      { id: 'initialCost', label: 'Initial Capital Investment Outlay ($ / ₹)', type: 'number', step: 5000 },
      { id: 'annualCashFlow', label: 'Estimated Annual Net Cash Inflow ($ / ₹)', type: 'number', step: 2500 }
    ],
    calculate: (i) => {
      const cost = Number(i.initialCost) || 120000;
      const flow = Number(i.annualCashFlow) || 35000;
      const years = flow > 0 ? cost / flow : Infinity;
      const wholeYears = Math.floor(years);
      const months = Math.round((years - wholeYears) * 12);

      return {
        primaryValue: years === Infinity ? 'Never' : `${wholeYears} Yrs, ${months} Mos`,
        primaryLabel: 'Exact Time to Full Capital Recovery',
        secondaryMetrics: [
          { label: 'Accounting Rate of Return (ARR)', value: `${((flow / cost) * 100).toFixed(2)}%` },
          { label: '3-Year Net Recovery', value: `$${Math.round(flow * 3).toLocaleString()}` },
          { label: '5-Year Cumulative Profit', value: `$${Math.round(flow * 5 - cost).toLocaleString()}` }
        ]
      };
    }
  },

  // ==========================================
  // 2. FITNESS & HEALTH (CALCULATOR.NET)
  // ==========================================
  {
    id: 'army-body-fat-calc',
    name: 'U.S. Army Body Fat Calculator (AR 600-9 Tape Test)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Official revised Department of the Army Regulation 600-9 circumference tape test for Male and Female soldiers.',
    formula: 'Male: %BF = 86.010 × log10(abdomen - neck) - 70.041 × log10(height) + 36.76; Female: %BF = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387',
    formulaExplanation: 'DOD certified logarithmic circumference equations using military precision tape measurements in inches.',
    defaultInputs: { gender: 'male', height: 70, neck: 15.5, abdomen: 34, hip: 38 },
    fields: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male Soldier', value: 'male' }, { label: 'Female Soldier', value: 'female' }] },
      { id: 'height', label: 'Height (Inches)', type: 'number', step: 0.5 },
      { id: 'neck', label: 'Neck Circumference (Inches)', type: 'number', step: 0.25 },
      { id: 'abdomen', label: 'Abdomen (Navel for Men / Waist for Women) (Inches)', type: 'number', step: 0.25 },
      { id: 'hip', label: 'Hip Circumference (Women Only) (Inches)', type: 'number', step: 0.25 }
    ],
    calculate: (i) => {
      const gender = i.gender || 'male';
      const h = Number(i.height) || 70;
      const neck = Number(i.neck) || 15.5;
      const abd = Number(i.abdomen) || 34;
      const hip = Number(i.hip) || 38;

      let bf = 0;
      if (gender === 'male') {
        const diff = Math.max(1, abd - neck);
        bf = 86.010 * Math.log10(diff) - 70.041 * Math.log10(h) + 36.76;
      } else {
        const sum = Math.max(1, abd + hip - neck);
        bf = 163.205 * Math.log10(sum) - 97.684 * Math.log10(h) - 78.387;
      }
      bf = Math.max(3, Math.min(50, bf));

      return {
        primaryValue: `${bf.toFixed(1)}% Body Fat`,
        primaryLabel: 'Army Regulation 600-9 Body Fat Result',
        secondaryMetrics: [
          { label: 'Standard Pass Status', value: bf <= (gender === 'male' ? 22 : 30) ? 'MEETS ARMY STANDARD (PASS)' : 'EXCEEDS SCREENING LIMIT' },
          { label: 'Circumference Differential', value: `${(abd - neck).toFixed(1)} in` },
          { label: 'Method Protocol', value: 'AR 600-9 Tape Equation' }
        ]
      };
    }
  },
  {
    id: 'bac-calc',
    name: 'Blood Alcohol Content (BAC) Calculator (Widmark Formula)',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Estimate Blood Alcohol Concentration (BAC %) and hours until sober based on standard drinks, weight, and elapsed time.',
    formula: 'BAC = [(A × 5.14) / (W × r)] - (0.015 × H)',
    formulaExplanation: 'Widmark alcohol elimination curve where A is ounces of pure alcohol, W is body weight (lbs), r is gender gender constant (0.73 men, 0.66 women), and 0.015% metabolized per hour.',
    defaultInputs: { gender: 'male', weightLbs: 175, standardDrinks: 3, hoursElapsed: 2 },
    fields: [
      { id: 'gender', label: 'Biological Sex', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'weightLbs', label: 'Body Weight (Pounds / lbs)', type: 'number', step: 5 },
      { id: 'standardDrinks', label: 'Standard Drinks Consumed (12oz beer = 5oz wine = 1.5oz spirit)', type: 'number', step: 1 },
      { id: 'hoursElapsed', label: 'Hours Since First Drink', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const isMale = (i.gender || 'male') === 'male';
      const w = Number(i.weightLbs) || 175;
      const drinks = Number(i.standardDrinks) || 3;
      const hours = Number(i.hoursElapsed) || 2;
      const alcoholOz = drinks * 0.6; // 0.6 oz pure ethanol per standard drink
      const r = isMale ? 0.73 : 0.66;
      const rawBAC = ((alcoholOz * 5.14) / (w * r)) - (0.015 * hours);
      const bac = Math.max(0, rawBAC);
      const hoursToZero = (bac / 0.015);

      return {
        primaryValue: `${bac.toFixed(3)}% BAC`,
        primaryLabel: 'Estimated Blood Alcohol Concentration',
        secondaryMetrics: [
          { label: 'Legal Driving Status (0.08% limit)', value: bac >= 0.08 ? 'ILLEGAL TO DRIVE (Over 0.08%)' : (bac > 0 ? 'Under 0.08% (Caution)' : 'Zero Alcohol') },
          { label: 'Time Until Fully Sober (0.00%)', value: hoursToZero <= 0 ? '0 Hours' : `${hoursToZero.toFixed(1)} Hours` },
          { label: 'Metabolism Burn Rate', value: '0.015% per hour' }
        ],
        advice: 'Never operate vehicles or heavy machinery after drinking. Individual alcohol tolerance and absorption rates vary based on food intake.'
      };
    }
  },
  {
    id: 'ovulation-calc',
    name: 'Ovulation, Fertile Window & Period Cycle Calculator',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Calculate most fertile days, peak LH surge ovulation date, and next period based on average menstrual cycle length.',
    formula: 'Ovulation Day = Cycle Length - 14; Fertile Window = Days (Ovulation - 5) to (Ovulation + 1)',
    formulaExplanation: 'The luteal phase is typically constant at 14 days prior to the start of the next menstrual period.',
    defaultInputs: { cycleDays: 28, daysSinceLmp: 10 },
    fields: [
      { id: 'cycleDays', label: 'Average Menstrual Cycle Length (Days)', type: 'number', step: 1 },
      { id: 'daysSinceLmp', label: 'Days Elapsed Since First Day of Last Period', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const cycle = Number(i.cycleDays) || 28;
      const lmpDays = Number(i.daysSinceLmp) || 10;
      const ovulationDay = cycle - 14;
      const fertileStart = Math.max(1, ovulationDay - 5);
      const fertileEnd = ovulationDay + 1;
      const daysToNextPeriod = Math.max(0, cycle - lmpDays);

      return {
        primaryValue: `Day ${ovulationDay} of Cycle`,
        primaryLabel: 'Estimated Peak Ovulation Day',
        secondaryMetrics: [
          { label: 'Peak Fertile Window', value: `Cycle Days ${fertileStart} - ${fertileEnd}` },
          { label: 'Next Menstrual Period Due in', value: `${daysToNextPeriod} Days` },
          { label: 'Current Cycle Phase', value: lmpDays < fertileStart ? 'Follicular Phase' : (lmpDays <= fertileEnd ? 'High Fertility Ovulation' : 'Luteal Phase') }
        ]
      };
    }
  },
  {
    id: 'gfr-renal-calc',
    name: 'GFR Renal Function Calculator (CKD-EPI 2021 Equation)',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Calculate estimated Glomerular Filtration Rate (eGFR) in mL/min/1.73m² to screen kidney function without race coefficients.',
    formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.200 × 0.9938^Age × (1.012 if female)',
    formulaExplanation: 'Official 2021 CKD-EPI creatinine equation recommended by the National Kidney Foundation and ASN.',
    defaultInputs: { gender: 'male', age: 45, creatinine: 0.95 },
    fields: [
      { id: 'gender', label: 'Biological Sex', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'age', label: 'Patient Age (Years)', type: 'number', step: 1 },
      { id: 'creatinine', label: 'Serum Creatinine (mg/dL)', type: 'number', step: 0.05 }
    ],
    calculate: (i) => {
      const isFemale = (i.gender || 'male') === 'female';
      const age = Number(i.age) || 45;
      const scr = Number(i.creatinine) || 0.95;
      const kappa = isFemale ? 0.7 : 0.9;
      const alpha = isFemale ? -0.241 : -0.302;
      const femaleMult = isFemale ? 1.012 : 1.0;

      const scrRatio = scr / kappa;
      const minPart = Math.pow(Math.min(scrRatio, 1), alpha);
      const maxPart = Math.pow(Math.max(scrRatio, 1), -1.200);
      const agePart = Math.pow(0.9938, age);

      const egfr = 142 * minPart * maxPart * agePart * femaleMult;

      let stage = 'Stage 1: Normal (≥ 90)';
      if (egfr < 15) stage = 'Stage 5: Kidney Failure (< 15)';
      else if (egfr < 30) stage = 'Stage 4: Severe Reduction (15-29)';
      else if (egfr < 60) stage = 'Stage 3: Moderate Reduction (30-59)';
      else if (egfr < 90) stage = 'Stage 2: Mild Reduction (60-89)';

      return {
        primaryValue: `${Math.round(egfr)} mL/min/1.73m²`,
        primaryLabel: 'Estimated GFR (eGFR CKD-EPI 2021)',
        secondaryMetrics: [
          { label: 'Kidney Health Category', value: stage },
          { label: 'Serum Creatinine', value: `${scr.toFixed(2)} mg/dL` },
          { label: 'Clinical Equation', value: 'CKD-EPI 2021 Refreshed' }
        ]
      };
    }
  },
  {
    id: 'target-heart-rate-calc',
    name: 'Target Heart Rate Training Zones (Karvonen Formula)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate Zone 1 to Zone 5 cardiovascular heart rate beats per minute factoring in resting pulse and heart rate reserve.',
    formula: 'THR = ((HR_max - HR_rest) × %Intensity) + HR_rest; HR_max = 220 - Age',
    formulaExplanation: 'The Karvonen formula is the gold-standard aerobic prescription method taking baseline resting heart rate into account.',
    defaultInputs: { age: 30, restingHr: 62 },
    fields: [
      { id: 'age', label: 'Age (Years)', type: 'number', step: 1 },
      { id: 'restingHr', label: 'Resting Heart Rate (BPM)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const age = Number(i.age) || 30;
      const rest = Number(i.restingHr) || 62;
      const max = 220 - age;
      const hrr = max - rest; // Heart Rate Reserve

      const z1 = Math.round(rest + hrr * 0.55); // Recovery 50-60%
      const z2 = Math.round(rest + hrr * 0.65); // Fat Burn / Aerobic Base 60-70%
      const z3 = Math.round(rest + hrr * 0.75); // Tempo / Aerobic Endurance 70-80%
      const z4 = Math.round(rest + hrr * 0.85); // Anaerobic Threshold 80-90%
      const z5 = Math.round(rest + hrr * 0.95); // VO2 Max Peak 90-100%

      return {
        primaryValue: `${z2} - ${z3} BPM`,
        primaryLabel: 'Target Zone 2 - 3 Aerobic Training Zone',
        secondaryMetrics: [
          { label: 'Maximum Heart Rate (HRmax)', value: `${max} BPM` },
          { label: 'Zone 2 (Endurance Base 60-70%)', value: `${z1} - ${z2} BPM` },
          { label: 'Zone 4 (Threshold 80-90%)', value: `${z3} - ${z4} BPM` },
          { label: 'Zone 5 (Max VO2 Sprint 90%+)', value: `${z4} - ${max} BPM` }
        ]
      };
    }
  },

  // ==========================================
  // 3. MATHEMATICS & STATISTICS (CALCULATOR.NET)
  // ==========================================
  {
    id: 'triangle-solver-calc',
    name: 'Triangle Solver (SSS, SAS, ASA, AAS & Law of Cosines)',
    category: 'math',
    subCategory: 'Geometry & Trigonometry',
    description: 'Solve missing sides, angles, area, perimeter, and inradius for any triangle using Law of Sines and Law of Cosines.',
    formula: 'Law of Cosines: c² = a² + b² - 2ab·cos(C); Heron Area = √(s(s-a)(s-b)(s-c))',
    formulaExplanation: 'Input three known triangle sides (SSS) to compute all three angles and polygon area in degrees.',
    defaultInputs: { sideA: 5, sideB: 6, sideC: 7 },
    fields: [
      { id: 'sideA', label: 'Side a Length', type: 'number', step: 0.1 },
      { id: 'sideB', label: 'Side b Length', type: 'number', step: 0.1 },
      { id: 'sideC', label: 'Side c Length', type: 'number', step: 0.1 }
    ],
    calculate: (i) => {
      const a = Number(i.sideA) || 5;
      const b = Number(i.sideB) || 6;
      const c = Number(i.sideC) || 7;

      if (a + b <= c || a + c <= b || b + c <= a) {
        return {
          primaryValue: 'Invalid Triangle',
          primaryLabel: 'Triangle Inequality Violation',
          secondaryMetrics: [{ label: 'Rule', value: 'The sum of any two sides must exceed the third side.' }]
        };
      }

      // Law of Cosines for angles
      const cosA = (b * b + c * c - a * a) / (2 * b * c);
      const cosB = (a * a + c * c - b * b) / (2 * a * c);
      const angleA = Math.acos(cosA) * (180 / Math.PI);
      const angleB = Math.acos(cosB) * (180 / Math.PI);
      const angleC = 180 - angleA - angleB;

      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      return {
        primaryValue: `${area.toFixed(2)} sq units`,
        primaryLabel: 'Triangle Surface Area (Heron)',
        secondaryMetrics: [
          { label: 'Angle A (opposite side a)', value: `${angleA.toFixed(2)}°` },
          { label: 'Angle B (opposite side b)', value: `${angleB.toFixed(2)}°` },
          { label: 'Angle C (opposite side c)', value: `${angleC.toFixed(2)}°` },
          { label: 'Perimeter (2s)', value: `${(a + b + c).toFixed(2)}` }
        ]
      };
    }
  },
  {
    id: 'sig-figs-calc',
    name: 'Significant Figures Calculator & Precision Rounder',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Determine exact significant figures count, leading/trailing zero rules, and scientific notation rounding.',
    formula: 'Sig Figs Counting Rules: Non-zero digits, sandwiched zeros, trailing zeros after decimal point are significant.',
    formulaExplanation: 'Applies standard physical chemistry and experimental physics significant digits rules.',
    defaultInputs: { numberInput: '0.0045020', targetFigs: 3 },
    fields: [
      { id: 'numberInput', label: 'Input Number String', type: 'text' },
      { id: 'targetFigs', label: 'Round to N Significant Figures', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const str = String(i.numberInput || '0.0045020').trim();
      const num = parseFloat(str);
      const target = Number(i.targetFigs) || 3;

      let count = 0;
      const clean = str.replace(/^-/, '');
      if (clean.includes('.')) {
        const withoutLeadingZeros = clean.replace(/^0+\.?0*/, '');
        count = withoutLeadingZeros.replace('.', '').length;
      } else {
        const withoutLeadingZeros = clean.replace(/^0+/, '');
        const withoutTrailingZeros = withoutLeadingZeros.replace(/0+$/, '');
        count = withoutTrailingZeros.length;
      }
      if (isNaN(num) || count === 0) count = 1;

      const rounded = !isNaN(num) ? num.toPrecision(target) : '0';

      return {
        primaryValue: `${count} Significant Figures`,
        primaryLabel: 'Sig Fig Count in Input',
        secondaryMetrics: [
          { label: `Rounded to ${target} Sig Figs`, value: `${rounded}` },
          { label: 'Scientific Notation', value: !isNaN(num) ? num.toExponential(target - 1) : '0' },
          { label: 'Decimals in Input', value: clean.includes('.') ? `${clean.split('.')[1].length}` : '0' }
        ]
      };
    }
  },
  {
    id: 'number-base-calc',
    name: 'Number Base Converter (Binary, Hex, Octal, Decimal)',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Simultaneously convert any integer between Binary (Base-2), Octal (Base-8), Decimal (Base-10), and Hexadecimal (Base-16).',
    formula: 'N_b = ∑ d_i × b^i',
    formulaExplanation: 'Positional radix expansion evaluated across arbitrary numerical radices.',
    defaultInputs: { decimalNum: 254 },
    fields: [
      { id: 'decimalNum', label: 'Decimal Integer (Base 10)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const dec = Math.floor(Number(i.decimalNum) || 254);
      const bin = (dec >>> 0).toString(2);
      const oct = (dec >>> 0).toString(8);
      const hex = (dec >>> 0).toString(16).toUpperCase();

      return {
        primaryValue: `0x${hex}`,
        primaryLabel: 'Hexadecimal Representation (Base 16)',
        secondaryMetrics: [
          { label: 'Binary (Base 2)', value: bin },
          { label: 'Octal (Base 8)', value: oct },
          { label: 'Decimal (Base 10)', value: `${dec}` },
          { label: 'Byte Length', value: `${Math.ceil(bin.length / 8)} Byte(s)` }
        ]
      };
    }
  },
  {
    id: 'normal-dist-calc',
    name: 'Z-Score & Normal Distribution Probability Calculator',
    category: 'math',
    subCategory: 'Probability & Statistics',
    description: 'Compute Z-scores, standard normal cumulative probability P(Z ≤ z), and two-tailed p-values for Gaussian curves.',
    formula: 'Z = (X - μ) / σ; Φ(Z) = 0.5 × [1 + erf(Z / √2)]',
    formulaExplanation: 'Integrates the standard normal Gaussian bell curve distribution using the error function (erf).',
    defaultInputs: { rawScore: 115, mean: 100, stdDev: 15 },
    fields: [
      { id: 'rawScore', label: 'Raw Value (X)', type: 'number', step: 1 },
      { id: 'mean', label: 'Population Mean (μ)', type: 'number', step: 1 },
      { id: 'stdDev', label: 'Standard Deviation (σ)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const x = Number(i.rawScore) || 115;
      const mu = Number(i.mean) || 100;
      const sigma = Number(i.stdDev) || 15;
      const z = (x - mu) / (sigma || 1);

      // Abramowitz and Stegun erf approximation
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp(-z * z / 2);
      const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      const cdf = z >= 0 ? 1 - prob : prob;

      return {
        primaryValue: `Z = ${z.toFixed(3)}`,
        primaryLabel: 'Standard Z-Score',
        secondaryMetrics: [
          { label: 'Percentile Rank (P ≤ X)', value: `${(cdf * 100).toFixed(2)}%` },
          { label: 'Right-Tail Area P(Z > z)', value: `${((1 - cdf) * 100).toFixed(2)}%` },
          { label: 'Two-Tailed p-value', value: `${(2 * (1 - cdf)).toFixed(4)}` }
        ]
      };
    }
  },
  {
    id: 'gcd-lcm-calc',
    name: 'GCD & LCM Calculator (Euclidean Algorithm)',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate the Greatest Common Divisor (GCD/GCF) and Least Common Multiple (LCM) of two or more integers.',
    formula: 'GCD(a, b) via Euclidean Remainder; LCM(a, b) = |a × b| / GCD(a, b)',
    formulaExplanation: 'Applies iterative Euclidean division with step-by-step modular remainder reduction.',
    defaultInputs: { numA: 48, numB: 180 },
    fields: [
      { id: 'numA', label: 'First Integer (A)', type: 'number', step: 1 },
      { id: 'numB', label: 'Second Integer (B)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      let a = Math.abs(Math.floor(Number(i.numA) || 48));
      let b = Math.abs(Math.floor(Number(i.numB) || 180));
      const origA = a, origB = b;

      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      const gcd = a || 1;
      const lcm = (origA * origB) / gcd;

      return {
        primaryValue: `GCD = ${gcd}`,
        primaryLabel: 'Greatest Common Divisor (GCF)',
        secondaryMetrics: [
          { label: 'Least Common Multiple (LCM)', value: `${lcm}` },
          { label: 'Product A × B', value: `${origA * origB}` },
          { label: 'Coprime Check', value: gcd === 1 ? 'Coprime (Relatively Prime)' : 'Shares Common Factors' }
        ]
      };
    }
  },

  // ==========================================
  // 4. EVERYDAY, CONSTRUCTION & UTILITY
  // ==========================================
  {
    id: 'gas-mileage-trip-calc',
    name: 'Gas Mileage & Trip Fuel Cost Planner',
    category: 'everyday',
    subCategory: 'Travel & Utilities',
    description: 'Calculate fuel cost for road trips, total gallons required, and miles per gallon (MPG) / liters per 100km.',
    formula: 'Trip Fuel Cost = (Distance / MPG) × Fuel Price per Gallon',
    formulaExplanation: 'Computes total fuel consumption and dollar expenditure for single or round-trip journeys.',
    defaultInputs: { distance: 450, mpg: 28, gasPrice: 3.65, roundTrip: 'yes' },
    fields: [
      { id: 'distance', label: 'One-Way Distance (Miles / km)', type: 'number', step: 10 },
      { id: 'mpg', label: 'Vehicle Fuel Economy (MPG)', type: 'number', step: 1 },
      { id: 'gasPrice', label: 'Fuel Price ($ / ₹ per Gallon or Liter)', type: 'number', step: 0.05 },
      { id: 'roundTrip', label: 'Round Trip Journey?', type: 'select', options: [{ label: 'Yes (Round Trip 2x)', value: 'yes' }, { label: 'No (One Way)', value: 'no' }] }
    ],
    calculate: (i) => {
      const isRound = (i.roundTrip || 'yes') === 'yes';
      const d = (Number(i.distance) || 450) * (isRound ? 2 : 1);
      const mpg = Number(i.mpg) || 28;
      const price = Number(i.gasPrice) || 3.65;
      const gallonsNeeded = d / mpg;
      const totalCost = gallonsNeeded * price;

      return {
        primaryValue: `$${totalCost.toFixed(2)}`,
        primaryLabel: 'Total Estimated Trip Fuel Expense',
        secondaryMetrics: [
          { label: 'Fuel Quantity Required', value: `${gallonsNeeded.toFixed(1)} Gallons (${(gallonsNeeded * 3.785).toFixed(1)} L)` },
          { label: 'Cost Per Mile Traveled', value: `$${(totalCost / d).toFixed(2)} / mile` },
          { label: 'Total Distance', value: `${d} Miles (${Math.round(d * 1.609)} km)` }
        ]
      };
    }
  },
  {
    id: 'electricity-cost-calc',
    name: 'Appliance Electricity & Energy Cost Calculator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate exact power consumption in kilowatt-hours (kWh) and monthly electricity bill for home appliances.',
    formula: 'Cost = (Watts × Hours/Day × 30 / 1000) × Rate per kWh',
    formulaExplanation: 'Standard utility billing formula translating device wattage and daily operating duty cycle into monthly dollar expense.',
    defaultInputs: { wattage: 1500, hoursPerDay: 4, costPerKwh: 0.16 },
    fields: [
      { id: 'wattage', label: 'Appliance Power Rating (Watts, e.g. AC 1500W, PC 400W)', type: 'number', step: 50 },
      { id: 'hoursPerDay', label: 'Usage Duration per Day (Hours)', type: 'number', step: 0.5 },
      { id: 'costPerKwh', label: 'Electricity Utility Rate ($ / ₹ per kWh)', type: 'number', step: 0.01 }
    ],
    calculate: (i) => {
      const w = Number(i.wattage) || 1500;
      const hrs = Number(i.hoursPerDay) || 4;
      const rate = Number(i.costPerKwh) || 0.16;
      const dailyKwh = (w * hrs) / 1000;
      const monthlyKwh = dailyKwh * 30;
      const monthlyCost = monthlyKwh * rate;
      const annualCost = monthlyCost * 12;

      return {
        primaryValue: `$${monthlyCost.toFixed(2)} / month`,
        primaryLabel: 'Monthly Electricity Consumption Cost',
        secondaryMetrics: [
          { label: 'Daily Energy Used', value: `${dailyKwh.toFixed(2)} kWh / day` },
          { label: 'Monthly Energy Used', value: `${monthlyKwh.toFixed(1)} kWh / month` },
          { label: 'Annual Electricity Bill', value: `$${annualCost.toFixed(2)} / year` }
        ]
      };
    }
  },
  {
    id: 'concrete-calc',
    name: 'Concrete Slab, Footing & Pre-Mix Bag Estimator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate cubic yards and cubic meters of ready-mix concrete needed for patios, slabs, and footings, plus 60lb/80lb bag counts.',
    formula: 'Volume (Cubic Yards) = (Length_ft × Width_ft × Depth_in / 12) / 27 × 1.10 (10% waste)',
    formulaExplanation: 'Industry standard construction concrete volume including 10% allowance for spillage, slab grade variations, and excavation.',
    defaultInputs: { lengthFt: 20, widthFt: 15, depthIn: 4 },
    fields: [
      { id: 'lengthFt', label: 'Slab Length (Feet)', type: 'number', step: 1 },
      { id: 'widthFt', label: 'Slab Width (Feet)', type: 'number', step: 1 },
      { id: 'depthIn', label: 'Slab Thickness / Depth (Inches)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const l = Number(i.lengthFt) || 20;
      const w = Number(i.widthFt) || 15;
      const d = (Number(i.depthIn) || 4) / 12;
      const cuFt = l * w * d;
      const cuYards = (cuFt / 27) * 1.10; // with 10% buffer
      const cuMeters = cuYards * 0.764555;
      const bags80lb = Math.ceil(cuYards * 45); // 45 bags of 80lb per cu yard
      const bags60lb = Math.ceil(cuYards * 60); // 60 bags of 60lb per cu yard

      return {
        primaryValue: `${cuYards.toFixed(2)} Cubic Yards`,
        primaryLabel: 'Ready-Mix Concrete Volume (with 10% Waste)',
        secondaryMetrics: [
          { label: '80 lb Pre-Mix Bags', value: `${bags80lb} Bags` },
          { label: '60 lb Pre-Mix Bags', value: `${bags60lb} Bags` },
          { label: 'Volume in Cubic Meters', value: `${cuMeters.toFixed(2)} m³` },
          { label: 'Total Surface Area', value: `${(l * w).toFixed(0)} sq ft` }
        ]
      };
    }
  },
  {
    id: 'tile-flooring-calc',
    name: 'Tile, Flooring & Grout Material Estimator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate square footage, number of tile boxes, and grout bags required for bathroom, kitchen, and floor renovations.',
    formula: 'Total Sq Ft = Room Sq Ft × 1.10 (10% cut scrap); Tiles Needed = Total Sq Ft / Tile Area',
    formulaExplanation: 'Adds standard 10% to 15% waste margin for cutting, diagonal layouts, and edge trimming.',
    defaultInputs: { roomLength: 12, roomWidth: 10, tileLengthIn: 12, tileWidthIn: 12, sqftPerBox: 15 },
    fields: [
      { id: 'roomLength', label: 'Room Length (Feet)', type: 'number', step: 0.5 },
      { id: 'roomWidth', label: 'Room Width (Feet)', type: 'number', step: 0.5 },
      { id: 'tileLengthIn', label: 'Tile Length (Inches)', type: 'number', step: 1 },
      { id: 'tileWidthIn', label: 'Tile Width (Inches)', type: 'number', step: 1 },
      { id: 'sqftPerBox', label: 'Square Feet Per Box (sq ft)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const rL = Number(i.roomLength) || 12;
      const rW = Number(i.roomWidth) || 10;
      const netSqFt = rL * rW;
      const grossSqFt = netSqFt * 1.10; // 10% cut scrap
      const tL = (Number(i.tileLengthIn) || 12) / 12;
      const tW = (Number(i.tileWidthIn) || 12) / 12;
      const tileAreaSqFt = tL * tW;
      const tilesCount = Math.ceil(grossSqFt / tileAreaSqFt);
      const boxSqFt = Number(i.sqftPerBox) || 15;
      const boxesCount = Math.ceil(grossSqFt / boxSqFt);

      return {
        primaryValue: `${boxesCount} Boxes of Tile`,
        primaryLabel: 'Total Material Boxes to Purchase',
        secondaryMetrics: [
          { label: 'Individual Tiles Count', value: `${tilesCount} Tiles` },
          { label: 'Net Room Area', value: `${netSqFt.toFixed(1)} sq ft` },
          { label: 'Area with 10% Waste Margin', value: `${grossSqFt.toFixed(1)} sq ft` }
        ]
      };
    }
  },
  {
    id: 'pet-age-calc',
    name: 'Dog & Cat Age in Human Years Calculator',
    category: 'everyday',
    subCategory: 'Pet & Lifestyle',
    description: 'Convert canine and feline chronological ages into biological human equivalent years factoring in dog breed weight categories.',
    formula: 'Dog: Year 1 = 15 yrs, Year 2 = +9 yrs, Year 3+ = +4-5 yrs (small/medium) or +6-7 yrs (large/giant); Cat: Year 1 = 15, Year 2 = 24, +4/yr',
    formulaExplanation: 'AVMA (American Veterinary Medical Association) non-linear physiological aging guidelines.',
    defaultInputs: { petType: 'dog-medium', petYears: 4 },
    fields: [
      { id: 'petType', label: 'Pet Species & Breed Size', type: 'select', options: [
        { label: 'Small Dog (< 20 lbs / 9 kg)', value: 'dog-small' },
        { label: 'Medium Dog (21 - 50 lbs / 10-23 kg)', value: 'dog-medium' },
        { label: 'Large Dog (51 - 90 lbs / 24-40 kg)', value: 'dog-large' },
        { label: 'Giant Dog (> 90 lbs / 41+ kg)', value: 'dog-giant' },
        { label: 'Cat (Indoor / Feline)', value: 'cat' }
      ]},
      { id: 'petYears', label: 'Pet Age in Calendar Years', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const type = i.petType || 'dog-medium';
      const age = Number(i.petYears) || 4;

      let humanAge = 0;
      if (type === 'cat') {
        if (age <= 1) humanAge = age * 15;
        else if (age <= 2) humanAge = 15 + (age - 1) * 9;
        else humanAge = 24 + (age - 2) * 4;
      } else if (type === 'dog-small') {
        if (age <= 1) humanAge = age * 15;
        else if (age <= 2) humanAge = 15 + (age - 1) * 9;
        else humanAge = 24 + (age - 2) * 4;
      } else if (type === 'dog-medium') {
        if (age <= 1) humanAge = age * 15;
        else if (age <= 2) humanAge = 15 + (age - 1) * 9;
        else humanAge = 24 + (age - 2) * 5;
      } else if (type === 'dog-large') {
        if (age <= 1) humanAge = age * 15;
        else if (age <= 2) humanAge = 15 + (age - 1) * 9;
        else humanAge = 24 + (age - 2) * 6;
      } else { // giant
        if (age <= 1) humanAge = age * 14;
        else if (age <= 2) humanAge = 14 + (age - 1) * 9;
        else humanAge = 23 + (age - 2) * 7.5;
      }

      return {
        primaryValue: `${Math.round(humanAge)} Human Years`,
        primaryLabel: 'Equivalent Biological Human Age',
        secondaryMetrics: [
          { label: 'Life Stage', value: humanAge < 20 ? 'Adolescent / Youth' : (humanAge < 50 ? 'Prime Adult' : 'Senior Pet') },
          { label: 'Veterinary Checkup Advice', value: humanAge >= 50 ? 'Twice Yearly Senior Exam Recommended' : 'Annual Wellness Checkup' }
        ]
      };
    }
  },
  {
    id: 'password-entropy-calc',
    name: 'Password Strength & Bit Entropy Security Calculator',
    category: 'everyday',
    subCategory: 'Developer & Security',
    description: 'Calculate information entropy in bits ($H = L \\log_2 N$) and estimate brute-force cracking time across GPU hash clusters.',
    formula: 'Entropy (Bits) = Length × log2(Character Pool Size)',
    formulaExplanation: 'NIST SP 800-63B password entropy mathematical formulation evaluated at 100 billion hashes/sec.',
    defaultInputs: { passLength: 14, useUpper: 'yes', useLower: 'yes', useDigits: 'yes', useSymbols: 'yes' },
    fields: [
      { id: 'passLength', label: 'Password Character Length', type: 'number', step: 1 },
      { id: 'useUpper', label: 'Uppercase Letters (A-Z)?', type: 'select', options: [{ label: 'Yes (26 chars)', value: 'yes' }, { label: 'No', value: 'no' }] },
      { id: 'useLower', label: 'Lowercase Letters (a-z)?', type: 'select', options: [{ label: 'Yes (26 chars)', value: 'yes' }, { label: 'No', value: 'no' }] },
      { id: 'useDigits', label: 'Numbers (0-9)?', type: 'select', options: [{ label: 'Yes (10 chars)', value: 'yes' }, { label: 'No', value: 'no' }] },
      { id: 'useSymbols', label: 'Special Symbols (!@#$%)?', type: 'select', options: [{ label: 'Yes (32 chars)', value: 'yes' }, { label: 'No', value: 'no' }] }
    ],
    calculate: (i) => {
      const len = Number(i.passLength) || 14;
      let pool = 0;
      if ((i.useUpper || 'yes') === 'yes') pool += 26;
      if ((i.useLower || 'yes') === 'yes') pool += 26;
      if ((i.useDigits || 'yes') === 'yes') pool += 10;
      if ((i.useSymbols || 'yes') === 'yes') pool += 32;
      pool = Math.max(2, pool);

      const entropy = len * Math.log2(pool);
      const totalCombinations = Math.pow(pool, len);
      const hashRate = 1e11; // 100 Billion hashes/sec (modern RTX GPU cluster)
      const secondsToCrack = totalCombinations / hashRate / 2; // average half search space

      let timeText = 'Centuries+';
      if (secondsToCrack < 1) timeText = 'Instant (< 1 second)';
      else if (secondsToCrack < 60) timeText = `${Math.round(secondsToCrack)} Seconds`;
      else if (secondsToCrack < 3600) timeText = `${Math.round(secondsToCrack / 60)} Minutes`;
      else if (secondsToCrack < 86400) timeText = `${Math.round(secondsToCrack / 3600)} Hours`;
      else if (secondsToCrack < 31536000) timeText = `${Math.round(secondsToCrack / 86400)} Days`;
      else if (secondsToCrack < 3153600000) timeText = `${Math.round(secondsToCrack / 31536000)} Years`;

      return {
        primaryValue: `${entropy.toFixed(1)} Bits`,
        primaryLabel: 'NIST Password Information Entropy',
        secondaryMetrics: [
          { label: 'GPU Cluster Crack Time', value: timeText },
          { label: 'Security Grade', value: entropy >= 70 ? 'VERY STRONG (Quantum Safe)' : (entropy >= 50 ? 'STRONG (Standard)' : 'WEAK (Vulnerable)') },
          { label: 'Character Pool Size (N)', value: `${pool} Character Set` }
        ]
      };
    }
  }
];
