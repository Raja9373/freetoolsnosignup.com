import { CalculatorDefinition } from './calculatorEngine';

// Additional curated Calculator.net tools to achieve 255+ complete coverage
export const FULL_CATALOG_SUPPLEMENT: CalculatorDefinition[] = [
  // =========================================================================
  // FINANCIAL EXPANSIONS
  // =========================================================================
  {
    id: 'deferred-payment-loan-calc',
    name: 'Deferred Payment Loan & Grace Period Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate interest accrual and subsequent monthly payments when loan payments are deferred for 6 to 12 months.',
    formula: 'Capitalized Balance = Principal × (1 + r)^defer_months; Amortized over remaining term',
    formulaExplanation: 'Deferred loans capitalize unpaid interest during grace periods, increasing the final loan principal.',
    defaultInputs: { principal: 30000, interestRate: 8.0, deferMonths: 12, totalYears: 5 },
    fields: [
      { id: 'principal', label: 'Original Loan Principal ($ / ₹)', type: 'number', step: 1000 },
      { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'deferMonths', label: 'Deferred Grace Period (Months)', type: 'number', step: 1 },
      { id: 'totalYears', label: 'Total Loan Duration (Years)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const P = Number(i.principal) || 30000;
      const r = (Number(i.interestRate) || 8.0) / 100 / 12;
      const defM = Number(i.deferMonths) || 12;
      const totalM = (Number(i.totalYears) || 5) * 12;
      const newP = P * Math.pow(1 + r, defM);
      const remM = totalM - defM;
      const emi = (newP * r * Math.pow(1 + r, remM)) / (Math.pow(1 + r, remM) - 1);
      return {
        primaryValue: `$${Math.round(emi).toLocaleString()} / mo`,
        primaryLabel: 'Monthly Payment After Grace Period',
        secondaryMetrics: [
          { label: 'Capitalized Principal', value: `$${Math.round(newP).toLocaleString()}` },
          { label: 'Interest Accrued During Deferral', value: `$${Math.round(newP - P).toLocaleString()}` },
          { label: 'Total Lifetime Interest', value: `$${Math.round(emi * remM - P).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'reverse-mortgage-calc',
    name: 'Reverse Mortgage (HECM) Proceeds Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Estimate maximum Home Equity Conversion Mortgage (HECM) payout proceeds for homeowners age 62+ based on home appraisal.',
    formula: 'Principal Limit = Appraised Value × Principal Limit Factor (PLF based on age & interest rate)',
    formulaExplanation: 'FHA HECM reverse mortgages allow seniors to convert home equity into tax-free cash without monthly mortgage payments.',
    defaultInputs: { homeValue: 500000, youngestAge: 68, currentMortgageBal: 60000 },
    fields: [
      { id: 'homeValue', label: 'Appraised Home Market Value ($ / ₹)', type: 'number', step: 10000 },
      { id: 'youngestAge', label: 'Age of Youngest Homeowner (62 - 95)', type: 'number', step: 1 },
      { id: 'currentMortgageBal', label: 'Existing Mortgage Balance to Pay Off ($ / ₹)', type: 'number', step: 5000 }
    ],
    calculate: (i) => {
      const val = Number(i.homeValue) || 500000;
      const age = Number(i.youngestAge) || 68;
      const bal = Number(i.currentMortgageBal) || 60000;

      // Typical PLF ~ 0.40 at age 62 scaling to 0.65 at age 85
      const plf = Math.min(0.70, Math.max(0.35, 0.40 + (age - 62) * 0.012));
      const maxClaim = Math.min(val, 1149825); // 2024 HECM limit
      const grossProceeds = maxClaim * plf;
      const netProceeds = Math.max(0, grossProceeds - bal - 12000); // minus existing debt & closing

      return {
        primaryValue: `$${Math.round(netProceeds).toLocaleString()}`,
        primaryLabel: 'Estimated Net Cash Proceeds to Homeowner',
        secondaryMetrics: [
          { label: 'Gross Principal Limit (PLF)', value: `$${Math.round(grossProceeds).toLocaleString()} (${(plf * 100).toFixed(1)}%)` },
          { label: 'Mandatory Existing Mortgage Payoff', value: `$${Math.round(bal).toLocaleString()}` },
          { label: 'Available Tenure Line of Credit', value: `$${Math.round(netProceeds / 180).toLocaleString()} / mo for 15 yrs` }
        ]
      };
    }
  },
  {
    id: 'money-market-cd-calc',
    name: 'Money Market vs High-Yield Savings & CD Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Compare interest compounding yield between Money Market Accounts (MMA), High-Yield Savings (HYSA), and Certificates of Deposit (CD).',
    formula: 'A = P(1 + r/365)^(365t)',
    formulaExplanation: 'Daily compounding yield model comparison.',
    defaultInputs: { deposit: 35000, mmaApy: 4.85, cdApy: 5.25, years: 3 },
    fields: [
      { id: 'deposit', label: 'Deposit Amount ($ / ₹)', type: 'number', step: 2500 },
      { id: 'mmaApy', label: 'Money Market / HYSA APY (%)', type: 'number', step: 0.1 },
      { id: 'cdApy', label: 'Certificate of Deposit (CD) APY (%)', type: 'number', step: 0.1 },
      { id: 'years', label: 'Investment Term (Years)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const P = Number(i.deposit) || 35000;
      const rMma = (Number(i.mmaApy) || 4.85) / 100;
      const rCd = (Number(i.cdApy) || 5.25) / 100;
      const t = Number(i.years) || 3;

      const fvMma = P * Math.pow(1 + rMma, t);
      const fvCd = P * Math.pow(1 + rCd, t);
      const diff = fvCd - fvMma;

      return {
        primaryValue: `$${Math.round(fvCd).toLocaleString()}`,
        primaryLabel: 'CD Value at Maturity',
        secondaryMetrics: [
          { label: 'Money Market / HYSA Value', value: `$${Math.round(fvMma).toLocaleString()}` },
          { label: 'CD Extra Yield Premium', value: `+$${Math.round(diff).toLocaleString()}` },
          { label: 'Total CD Interest Earned', value: `$${Math.round(fvCd - P).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'treasury-bill-yield-calc',
    name: 'US Treasury Bill (T-Bill) Discount to Investment Yield',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate purchase price from discount rate, coupon equivalent yield, and annualized investment yield on short-term T-Bills.',
    formula: 'Purchase Price = Par × (1 - (Discount Rate × Days / 360)); Investment Yield = ((Par - Price) / Price) × (365 / Days)',
    formulaExplanation: 'Treasury bills are sold at a discount from par ($1,000) and mature at full face value.',
    defaultInputs: { parValue: 10000, discountRate: 5.15, termWeeks: 26 },
    fields: [
      { id: 'parValue', label: 'Face / Par Value ($)', type: 'number', step: 1000 },
      { id: 'discountRate', label: 'Bank Discount Rate (%)', type: 'number', step: 0.05 },
      { id: 'termWeeks', label: 'T-Bill Term (Weeks)', type: 'select', options: [
        { label: '4-Week (28 Days)', value: '4' },
        { label: '8-Week (56 Days)', value: '8' },
        { label: '13-Week / 3-Month (91 Days)', value: '13' },
        { label: '26-Week / 6-Month (182 Days)', value: '26' },
        { label: '52-Week / 1-Year (364 Days)', value: '52' }
      ]}
    ],
    calculate: (i) => {
      const par = Number(i.parValue) || 10000;
      const disc = (Number(i.discountRate) || 5.15) / 100;
      const weeks = Number(i.termWeeks) || 26;
      const days = weeks * 7;

      const price = par * (1 - (disc * days) / 360);
      const interest = par - price;
      const invYield = ((par - price) / price) * (365 / days) * 100;

      return {
        primaryValue: `$${price.toFixed(2)}`,
        primaryLabel: 'Discounted T-Bill Purchase Price',
        secondaryMetrics: [
          { label: 'Effective Investment Yield (APY)', value: `${invYield.toFixed(3)}%` },
          { label: 'Total Interest Earned at Maturity', value: `$${interest.toFixed(2)}` },
          { label: 'State & Local Tax Status', value: '100% State/Local Tax-Exempt' }
        ]
      };
    }
  },
  {
    id: 'freelance-1099-tax-calc',
    name: '1099 Freelance & Self-Employment Tax Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate self-employment tax (15.3% Social Security & Medicare) with 50% above-the-line deduction for independent contractors.',
    formula: 'Net SE Income = 92.35% of Profit; SE Tax = 15.3% × Net SE Income; 50% of SE Tax is Tax-Deductible',
    formulaExplanation: 'Self-employed 1099 contractors pay both employee (7.65%) and employer (7.65%) portions of FICA taxes.',
    defaultInputs: { grossRevenue: 110000, businessExpenses: 22000, federalBracket: 22 },
    fields: [
      { id: 'grossRevenue', label: 'Annual 1099 Gross Revenue ($ / ₹)', type: 'number', step: 5000 },
      { id: 'businessExpenses', label: 'Tax-Deductible Business Expenses ($ / ₹)', type: 'number', step: 1000 },
      { id: 'federalBracket', label: 'Estimated Federal Tax Bracket (%)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const rev = Number(i.grossRevenue) || 110000;
      const exp = Number(i.businessExpenses) || 22000;
      const netProfit = Math.max(0, rev - exp);
      const seTaxable = netProfit * 0.9235;
      const seTax = seTaxable * 0.153;
      const seDeduction = seTax / 2;
      const fedTax = (netProfit - seDeduction) * ((Number(i.federalBracket) || 22) / 100);
      const totalTax = seTax + fedTax;
      const quarterlyEstimated = totalTax / 4;

      return {
        primaryValue: `$${Math.round(quarterlyEstimated).toLocaleString()} / quarter`,
        primaryLabel: 'Estimated Quarterly Tax Payment (IRS 1040-ES)',
        secondaryMetrics: [
          { label: 'Total Annual Self-Employment Tax', value: `$${Math.round(seTax).toLocaleString()}` },
          { label: 'Estimated Annual Federal Income Tax', value: `$${Math.round(fedTax).toLocaleString()}` },
          { label: 'Net Take-Home After All Taxes', value: `$${Math.round(netProfit - totalTax).toLocaleString()}` },
          { label: 'Effective Overall Tax Rate', value: `${((totalTax / netProfit) * 100).toFixed(1)}%` }
        ]
      };
    }
  },
  {
    id: 'crypto-profit-tax-calc',
    name: 'Crypto Profit, Loss & Capital Gains Tax Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate cryptocurrency investment return, cost basis, and net profit after short-term or long-term capital gains taxes.',
    formula: 'Gross Gain = (Sell Price - Buy Price) × Quantity; Net Gain = Gross Gain × (1 - Capital Gains Tax Rate)',
    formulaExplanation: 'Cryptocurrency is treated as property by tax authorities; holding > 1 year qualifies for preferential long-term rates.',
    defaultInputs: { buyPrice: 42000, sellPrice: 68000, coinQuantity: 1.5, holdingPeriod: 'long' },
    fields: [
      { id: 'buyPrice', label: 'Purchase Price Per Coin ($ / ₹)', type: 'number', step: 500 },
      { id: 'sellPrice', label: 'Sale Price Per Coin ($ / ₹)', type: 'number', step: 500 },
      { id: 'coinQuantity', label: 'Number of Coins / Tokens', type: 'number', step: 0.1 },
      { id: 'holdingPeriod', label: 'Holding Period', type: 'select', options: [
        { label: 'Long-Term (> 1 Year, 15% Tax)', value: 'long' },
        { label: 'Short-Term (< 1 Year, 24% Ordinary Tax)', value: 'short' }
      ]}
    ],
    calculate: (i) => {
      const buy = Number(i.buyPrice) || 42000;
      const sell = Number(i.sellPrice) || 68000;
      const qty = Number(i.coinQuantity) || 1.5;
      const costBasis = buy * qty;
      const totalProceeds = sell * qty;
      const grossGain = totalProceeds - costBasis;
      const taxRate = i.holdingPeriod === 'long' ? 0.15 : 0.24;
      const taxDue = Math.max(0, grossGain * taxRate);
      const netProfit = grossGain - taxDue;
      const roi = (grossGain / costBasis) * 100;

      return {
        primaryValue: `$${Math.round(netProfit).toLocaleString()}`,
        primaryLabel: 'Net Post-Tax Profit',
        secondaryMetrics: [
          { label: 'Gross Pre-Tax Profit', value: `$${Math.round(grossGain).toLocaleString()} (${roi.toFixed(1)}% ROI)` },
          { label: 'Capital Gains Tax Due', value: `$${Math.round(taxDue).toLocaleString()} (${(taxRate * 100).toFixed(0)}% rate)` },
          { label: 'Total Sales Proceeds', value: `$${Math.round(totalProceeds).toLocaleString()}` }
        ]
      };
    }
  },

  // =========================================================================
  // HEALTH & WELLNESS EXPANSIONS
  // =========================================================================
  {
    id: 'caffeine-half-life-calc',
    name: 'Caffeine Metabolism & Sleep Half-Life Tracker',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Calculate remaining caffeine blood levels at bedtime based on 5-hour metabolic half-life decay.',
    formula: 'Remaining Caffeine = Initial Dose × (0.5)^(Hours_Elapsed / 5.0)',
    formulaExplanation: 'Caffeine has an average human biological half-life of 5 hours (extended by oral contraceptives or liver variants).',
    defaultInputs: { caffeineMg: 200, intakeHour: 14, bedHour: 23 },
    fields: [
      { id: 'caffeineMg', label: 'Caffeine Intake (mg, e.g. 200mg for large coffee)', type: 'number', step: 25 },
      { id: 'intakeHour', label: 'Intake Time (Hour 0-23, e.g. 14 for 2:00 PM)', type: 'number', step: 1 },
      { id: 'bedHour', label: 'Planned Bedtime (Hour 0-23, e.g. 23 for 11:00 PM)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const mg = Number(i.caffeineMg) || 200;
      const inH = Number(i.intakeHour) || 14;
      const bedH = Number(i.bedHour) || 23;
      const elapsed = ((bedH - inH + 24) % 24);
      const remaining = mg * Math.pow(0.5, elapsed / 5.0);

      return {
        primaryValue: `${remaining.toFixed(1)} mg Remaining`,
        primaryLabel: 'Active Caffeine in Bloodstream at Bedtime',
        secondaryMetrics: [
          { label: 'Hours Elapsed Until Bedtime', value: `${elapsed} Hours` },
          { label: 'Sleep Impact Risk', value: remaining > 50 ? 'HIGH: Likely to disrupt deep/REM sleep (>50mg)' : 'LOW: Minimal sleep interference' },
          { label: 'Time to 95% Elimination', value: `~${Math.round(5.0 * 4.3)} Hours after intake` }
        ]
      };
    }
  },
  {
    id: 'protein-daily-target-calc',
    name: 'Optimal Daily Protein Intake Calculator (ISSN Guidelines)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate target protein intake grams per day for muscle hypertrophy, athletic recovery, or fat loss preservation.',
    formula: 'Sedentary: 0.8g/kg; Endurance: 1.4g/kg; Hypertrophy: 1.8-2.2g/kg; Caloric Deficit: 2.4g/kg',
    formulaExplanation: 'International Society of Sports Nutrition (ISSN) position stand for protein and athletic exercise.',
    defaultInputs: { bodyWeightKg: 80, fitnessGoal: 'hypertrophy' },
    fields: [
      { id: 'bodyWeightKg', label: 'Body Weight (kg)', type: 'number', step: 1 },
      { id: 'fitnessGoal', label: 'Primary Fitness Goal', type: 'select', options: [
        { label: 'Muscle Hypertrophy & Strength (2.0 g/kg)', value: 'hypertrophy' },
        { label: 'Fat Loss / Cutting Preservation (2.4 g/kg)', value: 'cutting' },
        { label: 'Endurance Running / Cycling (1.4 g/kg)', value: 'endurance' },
        { label: 'General Health & Longevity (1.0 g/kg)', value: 'health' }
      ]}
    ],
    calculate: (i) => {
      const w = Number(i.bodyWeightKg) || 80;
      const goal = i.fitnessGoal || 'hypertrophy';
      const factor = goal === 'hypertrophy' ? 2.0 : (goal === 'cutting' ? 2.4 : (goal === 'endurance' ? 1.4 : 1.0));
      const targetG = Math.round(w * factor);
      const perMealG = Math.round(targetG / 4);

      return {
        primaryValue: `${targetG} grams / day`,
        primaryLabel: 'Recommended Daily Protein Intake',
        secondaryMetrics: [
          { label: 'Protein per Meal (4 Meals/day)', value: `${perMealG}g / meal` },
          { label: 'Protein in Ounces / Pounds', value: `${(targetG * 0.03527).toFixed(1)} oz (${(w * 2.205).toFixed(0)} lbs bodyweight)` },
          { label: 'Daily Protein Calories', value: `${targetG * 4} kcal` }
        ]
      };
    }
  },

  // =========================================================================
  // MATHEMATICS & STATISTICS EXPANSIONS
  // =========================================================================
  {
    id: 'z-score-normal-dist-calc',
    name: 'Z-Score & Normal Distribution Probability Calculator',
    category: 'math',
    subCategory: 'Probability & Statistics',
    description: 'Calculate standard normal score Z = (X - μ) / σ, cumulative percentile probability, and standard deviation bounds.',
    formula: 'Z = (X - μ) / σ; Percentile = Φ(Z) via Gaussian error function erf',
    formulaExplanation: 'Fundamental inferential statistics metric measuring distance from the mean in standard deviations.',
    defaultInputs: { rawScoreX: 115, meanMu: 100, standardDevSigma: 15 }, // Standard IQ test parameters
    fields: [
      { id: 'rawScoreX', label: 'Raw Observation Value (X)', type: 'number', step: 1 },
      { id: 'meanMu', label: 'Population Mean (μ)', type: 'number', step: 1 },
      { id: 'standardDevSigma', label: 'Standard Deviation (σ)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const x = Number(i.rawScoreX) || 115;
      const mu = Number(i.meanMu) || 100;
      const sigma = Number(i.standardDevSigma) || 15;

      const z = (x - mu) / (sigma || 1);

      // Approximation of erf for normal cdf
      const erf = (t: number) => {
        const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        const sign = t < 0 ? -1 : 1;
        const absT = Math.abs(t);
        const k = 1.0 / (1.0 + p * absT);
        const y = 1.0 - (((((a5 * k + a4) * k) + a3) * k + a2) * k + a1) * k * Math.exp(-absT * absT);
        return sign * y;
      };

      const cdf = 0.5 * (1 + erf(z / Math.SQRT2));
      const percentile = cdf * 100;

      return {
        primaryValue: `Z = ${z >= 0 ? '+' : ''}${z.toFixed(2)}`,
        primaryLabel: 'Standard Score (Z-Score)',
        secondaryMetrics: [
          { label: 'Cumulative Probability / Percentile', value: `${percentile.toFixed(2)}th Percentile` },
          { label: 'Percentage Above Score', value: `${(100 - percentile).toFixed(2)}%` },
          { label: 'Distance from Mean', value: `${(x - mu).toFixed(1)} units (${z.toFixed(2)}σ)` }
        ]
      };
    }
  },
  {
    id: 'sample-size-calc',
    name: 'Survey Sample Size & Margin of Error Calculator',
    category: 'math',
    subCategory: 'Probability & Statistics',
    description: 'Calculate statistically valid survey sample size based on population size, confidence level (95%/99%), and margin of error.',
    formula: 'n = [Z² × p × (1-p) / e²] / [1 + (Z² × p × (1-p) / (e² × N))]',
    formulaExplanation: 'Cochran formula with finite population correction (FPC) for representative survey sampling.',
    defaultInputs: { populationN: 50000, marginOfErrorPct: 4.0, confidenceLevel: '95' },
    fields: [
      { id: 'populationN', label: 'Total Population Size (N)', type: 'number', step: 5000 },
      { id: 'marginOfErrorPct', label: 'Margin of Error (e.g. 3% or 5%)', type: 'number', step: 0.5 },
      { id: 'confidenceLevel', label: 'Confidence Level', type: 'select', options: [
        { label: '95% Confidence (Z = 1.96)', value: '95' },
        { label: '99% Confidence (Z = 2.576)', value: '99' },
        { label: '90% Confidence (Z = 1.645)', value: '90' }
      ]}
    ],
    calculate: (i) => {
      const N = Number(i.populationN) || 50000;
      const e = (Number(i.marginOfErrorPct) || 4.0) / 100;
      const conf = i.confidenceLevel || '95';
      const Z = conf === '99' ? 2.576 : (conf === '90' ? 1.645 : 1.96);
      const p = 0.5; // maximum variability

      const n0 = (Z * Z * p * (1 - p)) / (e * e);
      const n = Math.ceil(n0 / (1 + (n0 - 1) / N));

      return {
        primaryValue: `${n.toLocaleString()} Respondents`,
        primaryLabel: 'Required Minimum Survey Sample Size',
        secondaryMetrics: [
          { label: 'Confidence Interval Band', value: `±${(e * 100).toFixed(1)}%` },
          { label: 'Selected Confidence Level', value: `${conf}% Confidence` },
          { label: 'Population Fraction Sampled', value: `${((n / N) * 100).toFixed(2)}% of total` }
        ]
      };
    }
  },
  {
    id: 'linear-regression-calc',
    name: 'Simple Linear Regression & Correlation (R²) Solver',
    category: 'math',
    subCategory: 'Probability & Statistics',
    description: 'Calculate line of best fit (y = mx + b), Pearson correlation coefficient (r), and coefficient of determination (R²).',
    formula: 'm = (N∑xy - ∑x∑y) / (N∑x² - (∑x)²); r = Cov(x,y) / (σx·σy)',
    formulaExplanation: 'Ordinary Least Squares (OLS) regression minimizing sum of squared vertical residuals.',
    defaultInputs: { xVals: '1, 2, 3, 4, 5', yVals: '2.1, 3.8, 6.2, 8.1, 9.9' },
    fields: [
      { id: 'xVals', label: 'X Data Points (comma separated)', type: 'text' },
      { id: 'yVals', label: 'Y Data Points (comma separated)', type: 'text' }
    ],
    calculate: (i) => {
      const xs = (String(i.xVals || '1,2,3,4,5')).split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
      const ys = (String(i.yVals || '2.1,3.8,6.2,8.1,9.9')).split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
      const n = Math.min(xs.length, ys.length);

      if (n < 2) {
        return { primaryValue: 'Error', primaryLabel: 'At least 2 points needed', secondaryMetrics: [] };
      }

      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;
      for (let k = 0; k < n; k++) {
        sumX += xs[k]; sumY += ys[k];
        sumXY += xs[k] * ys[k];
        sumXX += xs[k] * xs[k]; sumYY += ys[k] * ys[k];
      }

      const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const b = (sumY - m * sumX) / n;
      const numR = n * sumXY - sumX * sumY;
      const denR = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
      const r = denR !== 0 ? numR / denR : 1;
      const r2 = r * r;

      return {
        primaryValue: `y = ${m.toFixed(2)}x ${b >= 0 ? '+ ' + b.toFixed(2) : '- ' + Math.abs(b).toFixed(2)}`,
        primaryLabel: 'Linear Regression Best Fit Equation',
        secondaryMetrics: [
          { label: 'Coefficient of Determination (R²)', value: `${(r2 * 100).toFixed(1)}% (R² = ${r2.toFixed(3)})` },
          { label: 'Pearson Correlation (r)', value: `r = ${r.toFixed(3)} (${r > 0.8 ? 'Strong Positive' : 'Moderate'})` },
          { label: 'Slope Gradient (m)', value: `${m.toFixed(3)}` }
        ]
      };
    }
  },

  // =========================================================================
  // EVERYDAY & CONSTRUCTION EXPANSIONS
  // =========================================================================
  {
    id: 'brick-mortar-calc',
    name: 'Brick, Mortar & Masonry Wall Estimator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate standard modular bricks count (7 per sq ft) and 80-lb bags of Type S mortar mix for building masonry walls.',
    formula: 'Bricks = Wall Length × Height × 7 bricks/sq ft × 1.05 waste; Mortar = Bricks / 140 bricks per 80-lb bag',
    formulaExplanation: 'Masonry standards for standard modular brick dimensions (3-5/8" x 2-1/4" x 7-5/8") with 3/8" mortar joints.',
    defaultInputs: { wallLengthFt: 25, wallHeightFt: 6, isDoubleWythe: 'single' },
    fields: [
      { id: 'wallLengthFt', label: 'Wall Length (Feet)', type: 'number', step: 1 },
      { id: 'wallHeightFt', label: 'Wall Height (Feet)', type: 'number', step: 0.5 },
      { id: 'isDoubleWythe', label: 'Wall Thickness', type: 'select', options: [
        { label: 'Single Wythe (Single Brick Thickness, ~4")', value: 'single' },
        { label: 'Double Wythe (Double Brick Thickness, ~8")', value: 'double' }
      ]}
    ],
    calculate: (i) => {
      const l = Number(i.wallLengthFt) || 25;
      const h = Number(i.wallHeightFt) || 6;
      const sqFt = l * h;
      const multiplier = i.isDoubleWythe === 'double' ? 14 : 7;
      const rawBricks = sqFt * multiplier;
      const totalBricks = Math.ceil(rawBricks * 1.05); // 5% waste
      const mortarBags = Math.ceil(totalBricks / 140); // ~140 bricks per 80-lb bag

      return {
        primaryValue: `${totalBricks.toLocaleString()} Bricks`,
        primaryLabel: 'Total Modular Bricks (with 5% waste)',
        secondaryMetrics: [
          { label: 'Mortar Mix (80 lb Type S Bags)', value: `${mortarBags} Bags` },
          { label: 'Wall Face Surface Area', value: `${sqFt} sq ft` },
          { label: 'Masonry Sand Required', value: `${(mortarBags * 0.04).toFixed(1)} Tons (~${Math.round(mortarBags * 80)} lbs)` }
        ]
      };
    }
  },
  {
    id: 'asphalt-driveway-tonnage-calc',
    name: 'Asphalt Driveway Tonnage & Paving Cost Estimator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate hot-mix asphalt (HMA) tonnage required for driveways and parking lots based on compacted thickness.',
    formula: 'Tons = (Length_ft × Width_ft × Thickness_in / 12) × 145 lbs/cu ft / 2000',
    formulaExplanation: 'Compact hot-mix asphalt weighs approximately 145 lbs per cubic foot (1.96 tons per compacted cubic yard).',
    defaultInputs: { lengthFt: 50, widthFt: 12, thicknessInches: 2.5, pricePerTon: 95 },
    fields: [
      { id: 'lengthFt', label: 'Driveway Length (Feet)', type: 'number', step: 5 },
      { id: 'widthFt', label: 'Driveway Width (Feet)', type: 'number', step: 1 },
      { id: 'thicknessInches', label: 'Compacted Asphalt Thickness (Inches, standard 2.5")', type: 'number', step: 0.5 },
      { id: 'pricePerTon', label: 'Asphalt Price Per Ton ($ / ₹)', type: 'number', step: 5 }
    ],
    calculate: (i) => {
      const l = Number(i.lengthFt) || 50;
      const w = Number(i.widthFt) || 12;
      const thick = Number(i.thicknessInches) || 2.5;
      const priceTon = Number(i.pricePerTon) || 95;

      const sqFt = l * w;
      const cuFt = sqFt * (thick / 12);
      const totalLbs = cuFt * 145;
      const tons = (totalLbs / 2000) * 1.05; // 5% compaction safety
      const totalCost = tons * priceTon;

      return {
        primaryValue: `${tons.toFixed(2)} Tons of Asphalt`,
        primaryLabel: 'Total Hot-Mix Asphalt Required',
        secondaryMetrics: [
          { label: 'Estimated Material Cost', value: `$${Math.round(totalCost).toLocaleString()}` },
          { label: 'Paving Surface Area', value: `${sqFt} sq ft` },
          { label: 'Number of Dump Truck Loads (~15 tons/truck)', value: `${Math.ceil(tons / 15)} Truckload(s)` }
        ]
      };
    }
  },
  {
    id: 'aquarium-water-calc',
    name: 'Aquarium Water Capacity & Substrate Weight Calculator',
    category: 'everyday',
    subCategory: 'Pet & Lifestyle',
    description: 'Calculate true water volume in US gallons and liters, total filled weight, and gravel substrate pounds for fish tanks.',
    formula: 'Gallons = (L × W × H in inches) / 231; Water Weight = Gallons × 8.34 lbs',
    formulaExplanation: 'Standard aquarium hydrodynamics calculating structural floor load and filter turnover flow rates.',
    defaultInputs: { lengthInches: 36, widthInches: 18, heightInches: 24, substrateDepthInches: 2 },
    fields: [
      { id: 'lengthInches', label: 'Tank Length (Inches)', type: 'number', step: 1 },
      { id: 'widthInches', label: 'Tank Width (Inches)', type: 'number', step: 1 },
      { id: 'heightInches', label: 'Tank Height (Inches)', type: 'number', step: 1 },
      { id: 'substrateDepthInches', label: 'Gravel / Sand Bed Depth (Inches)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const l = Number(i.lengthInches) || 36;
      const w = Number(i.widthInches) || 18;
      const h = Number(i.heightInches) || 24;
      const subD = Number(i.substrateDepthInches) || 2;

      const grossGal = (l * w * h) / 231;
      const grossLiters = grossGal * 3.78541;
      const substrateLbs = ((l * w * subD) / 231) * 12; // ~12 lbs per gallon of gravel
      const netWaterGal = grossGal * 0.90; // 10% displacement
      const waterWeightLbs = netWaterGal * 8.34;
      const glassWeight = grossGal * 1.5;
      const totalSystemWeight = waterWeightLbs + substrateLbs + glassWeight;

      return {
        primaryValue: `${grossGal.toFixed(1)} Gallons (${grossLiters.toFixed(0)} L)`,
        primaryLabel: 'Gross Aquarium Capacity',
        secondaryMetrics: [
          { label: 'Total Filled Weight on Stand', value: `${Math.round(totalSystemWeight)} lbs (${Math.round(totalSystemWeight / 2.205)} kg)` },
          { label: 'Gravel Substrate Needed', value: `${Math.round(substrateLbs)} lbs of Gravel` },
          { label: 'Recommended Filter Flow Rate (4x/hr)', value: `${Math.round(grossGal * 4)} GPH (Gallons Per Hour)` }
        ]
      };
    }
  },
  {
    id: 'fuel-cost-trip-calc',
    name: 'Road Trip Fuel Cost & Mileage Calculator',
    category: 'everyday',
    subCategory: 'Travel & Utilities',
    description: 'Calculate fuel consumption in gallons/liters and total gas expenses for road trips and vehicle commutes.',
    formula: 'Trip Fuel Cost = (Distance / MPG) × Gas Price per Gallon; Cost Per Mile = Price / MPG',
    formulaExplanation: 'Automotive travel economics for route budgeting and carpool split calculation.',
    defaultInputs: { tripDistanceMiles: 480, vehicleMpg: 28, gasPricePerGallon: 3.65, numPassengers: 3 },
    fields: [
      { id: 'tripDistanceMiles', label: 'Trip Distance (Miles)', type: 'number', step: 10 },
      { id: 'vehicleMpg', label: 'Vehicle Fuel Economy (MPG)', type: 'number', step: 1 },
      { id: 'gasPricePerGallon', label: 'Gas Price per Gallon ($ / ₹)', type: 'number', step: 0.05 },
      { id: 'numPassengers', label: 'Number of Travelers / Carpoolers', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const dist = Number(i.tripDistanceMiles) || 480;
      const mpg = Number(i.vehicleMpg) || 28;
      const price = Number(i.gasPricePerGallon) || 3.65;
      const pass = Math.max(1, Number(i.numPassengers) || 3);

      const gallons = dist / (mpg || 1);
      const totalCost = gallons * price;
      const perPerson = totalCost / pass;
      const costPerMile = totalCost / dist;

      return {
        primaryValue: `$${totalCost.toFixed(2)}`,
        primaryLabel: 'Total Trip Fuel Cost',
        secondaryMetrics: [
          { label: 'Cost Per Traveler (Split)', value: `$${perPerson.toFixed(2)} / person` },
          { label: 'Fuel Consumed', value: `${gallons.toFixed(1)} Gallons (${(gallons * 3.785).toFixed(1)} Liters)` },
          { label: 'Vehicle Running Cost', value: `$${costPerMile.toFixed(3)} / mile` }
        ]
      };
    }
  }
];
