import { CalculatorDefinition } from './calculatorEngine';

export const FINAL_CALCULATOR_NET_CATALOG: CalculatorDefinition[] = [
  // =========================================================================
  // FINANCIAL CALCULATORS
  // =========================================================================
  {
    id: 'lease-payment-calc',
    name: 'Auto Lease Monthly Payment & Money Factor Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate auto lease payments from capitalized cost, residual value, and money factor.',
    formula: 'Monthly Depreciation = (Net Cap Cost - Residual) / Term; Monthly Finance = (Net Cap Cost + Residual) × Money Factor',
    formulaExplanation: 'Standard automotive industry lease formulation.',
    defaultInputs: { msrp: 38000, capCost: 35000, residualPct: 58, moneyFactor: 0.0025, termMonths: 36 },
    fields: [
      { id: 'msrp', label: 'Vehicle MSRP ($ / ₹)', type: 'number', step: 1000 },
      { id: 'capCost', label: 'Negotiated Capitalized Cost ($ / ₹)', type: 'number', step: 1000 },
      { id: 'residualPct', label: 'Residual Value Percentage (%)', type: 'number', step: 1 },
      { id: 'moneyFactor', label: 'Lease Money Factor (e.g. 0.0025 = 6.0% APR)', type: 'number', step: 0.0001 },
      { id: 'termMonths', label: 'Lease Term (Months)', type: 'number', step: 12 }
    ],
    calculate: (i) => {
      const cap = Number(i.capCost) || 35000;
      const msrp = Number(i.msrp) || 38000;
      const resPct = (Number(i.residualPct) || 58) / 100;
      const residual = msrp * resPct;
      const mf = Number(i.moneyFactor) || 0.0025;
      const n = Number(i.termMonths) || 36;

      const monthlyDeprec = (cap - residual) / n;
      const monthlyFinance = (cap + residual) * mf;
      const basePayment = monthlyDeprec + monthlyFinance;
      const equivApr = mf * 2400;

      return {
        primaryValue: `$${Math.round(basePayment).toLocaleString()} / month`,
        primaryLabel: 'Base Monthly Lease Payment',
        secondaryMetrics: [
          { label: 'Monthly Depreciation Charge', value: `$${Math.round(monthlyDeprec).toLocaleString()}` },
          { label: 'Monthly Rent / Finance Charge', value: `$${Math.round(monthlyFinance).toLocaleString()}` },
          { label: 'Equivalent APR', value: `${equivApr.toFixed(2)}% APR` },
          { label: 'Contract Residual Value', value: `$${Math.round(residual).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'mortgage-points-calc',
    name: 'Mortgage Discount Points & Break-Even Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate monthly interest savings and months to break even when buying upfront discount mortgage points.',
    formula: 'Cost = Loan × Points %; Break-Even Months = Upfront Cost / Monthly Payment Savings',
    formulaExplanation: 'Evaluates whether paying discount points to reduce mortgage interest rates pays off over your planned holding period.',
    defaultInputs: { loanAmount: 350000, rateWithoutPoints: 6.75, rateWithPoints: 6.25, pointsPurchased: 2 },
    fields: [
      { id: 'loanAmount', label: 'Mortgage Loan Amount ($ / ₹)', type: 'number', step: 5000 },
      { id: 'rateWithoutPoints', label: 'Rate Without Points (%)', type: 'number', step: 0.125 },
      { id: 'rateWithPoints', label: 'Discounted Rate With Points (%)', type: 'number', step: 0.125 },
      { id: 'pointsPurchased', label: 'Points Purchased (1 point = 1% of loan)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const P = Number(i.loanAmount) || 350000;
      const r0 = (Number(i.rateWithoutPoints) || 6.75) / 100 / 12;
      const r1 = (Number(i.rateWithPoints) || 6.25) / 100 / 12;
      const pts = Number(i.pointsPurchased) || 2;
      const upfrontCost = P * (pts / 100);
      const n = 30 * 12;

      const pmt0 = (P * r0 * Math.pow(1 + r0, n)) / (Math.pow(1 + r0, n) - 1);
      const pmt1 = (P * r1 * Math.pow(1 + r1, n)) / (Math.pow(1 + r1, n) - 1);
      const monthlySavings = pmt0 - pmt1;
      const breakEvenMonths = monthlySavings > 0 ? Math.ceil(upfrontCost / monthlySavings) : Infinity;

      return {
        primaryValue: `${breakEvenMonths} Months (${(breakEvenMonths / 12).toFixed(1)} Yrs)`,
        primaryLabel: 'Break-Even Time on Points Investment',
        secondaryMetrics: [
          { label: 'Upfront Cost of Points', value: `$${Math.round(upfrontCost).toLocaleString()}` },
          { label: 'Monthly Payment Savings', value: `$${Math.round(monthlySavings).toLocaleString()} / mo` },
          { label: '10-Year Net Savings (After Point Cost)', value: `$${Math.round(monthlySavings * 120 - upfrontCost).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'rent-affordability-calc',
    name: 'Rent Affordability Calculator (30% Rule & 40x Income)',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate maximum recommended monthly apartment rent based on standard 30% gross income rule and NYC 40x landlord rule.',
    formula: '30% Rule: Max Rent = Gross Monthly Income × 0.30; 40x Rule: Max Rent = Annual Income / 40',
    formulaExplanation: 'Standard tenant screening and personal finance budgeting thresholds.',
    defaultInputs: { annualIncome: 75000, monthlyDebts: 450 },
    fields: [
      { id: 'annualIncome', label: 'Annual Gross Income ($ / ₹)', type: 'number', step: 2500 },
      { id: 'monthlyDebts', label: 'Monthly Debt Obligations ($ / ₹)', type: 'number', step: 50 }
    ],
    calculate: (i) => {
      const inc = Number(i.annualIncome) || 75000;
      const debts = Number(i.monthlyDebts) || 450;
      const monthlyGross = inc / 12;

      const rule30 = monthlyGross * 0.30;
      const rule40x = inc / 40;
      const conservativeRent = Math.max(0, (monthlyGross - debts) * 0.30);

      return {
        primaryValue: `$${Math.round(rule30).toLocaleString()} / month`,
        primaryLabel: 'Recommended Maximum Monthly Rent (30% Rule)',
        secondaryMetrics: [
          { label: 'Landlord 40x Income Qualification', value: `$${Math.round(rule40x).toLocaleString()} / mo` },
          { label: 'Debt-Adjusted Safe Rent', value: `$${Math.round(conservativeRent).toLocaleString()} / mo` },
          { label: 'Annual Rent Total', value: `$${Math.round(rule30 * 12).toLocaleString()} / yr` }
        ]
      };
    }
  },
  {
    id: 'fire-retirement-calc',
    name: 'FIRE (Financial Independence, Retire Early) Calculator',
    category: 'finance',
    subCategory: 'Retirement & Annuities',
    description: 'Calculate your FIRE number (25x annual expenses based on 4% Safe Withdrawal Rule) and exact years to financial independence.',
    formula: 'FIRE Number = Annual Expenses × 25; Years to FIRE via Savings Rate and Compound Return',
    formulaExplanation: 'Trinity Study 4% rule establishing capital preservation longevity over a 30+ year retirement horizon.',
    defaultInputs: { annualExpenses: 60000, currentNetWorth: 180000, annualSavings: 35000, expectedReturn: 7.5 },
    fields: [
      { id: 'annualExpenses', label: 'Estimated Annual Retirement Expenses ($ / ₹)', type: 'number', step: 2500 },
      { id: 'currentNetWorth', label: 'Current Invested Net Worth ($ / ₹)', type: 'number', step: 10000 },
      { id: 'annualSavings', label: 'Annual Investment Savings ($ / ₹)', type: 'number', step: 2500 },
      { id: 'expectedReturn', label: 'Real Annual Portfolio Return (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const exp = Number(i.annualExpenses) || 60000;
      const nw = Number(i.currentNetWorth) || 180000;
      const sav = Number(i.annualSavings) || 35000;
      const r = (Number(i.expectedReturn) || 7.5) / 100;

      const fireNumber = exp * 25;
      const leanFire = exp * 0.75 * 25;
      const fatFire = exp * 1.50 * 25;

      let years = 0, current = nw;
      while (current < fireNumber && years < 60) {
        current = current * (1 + r) + sav;
        years++;
      }

      return {
        primaryValue: `$${Math.round(fireNumber).toLocaleString()}`,
        primaryLabel: 'Target Standard FIRE Number (25x Expenses)',
        secondaryMetrics: [
          { label: 'Years to Financial Independence', value: `${years} Years` },
          { label: 'Lean FIRE Milestone (75% expenses)', value: `$${Math.round(leanFire).toLocaleString()}` },
          { label: 'Fat FIRE Milestone (150% expenses)', value: `$${Math.round(fatFire).toLocaleString()}` },
          { label: 'Safe Annual 4% Withdrawal', value: `$${Math.round(fireNumber * 0.04).toLocaleString()} / yr` }
        ]
      };
    }
  },
  {
    id: 'cagr-calc',
    name: 'Compound Annual Growth Rate (CAGR) Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate smoothed annualized investment return (CAGR) across multi-year asset valuations.',
    formula: 'CAGR = (End Value / Beginning Value)^(1 / Years) - 1',
    formulaExplanation: 'Standard metric for comparing historical performance of stocks, real estate, and funds across differing time horizons.',
    defaultInputs: { startValue: 25000, endValue: 78000, years: 7 },
    fields: [
      { id: 'startValue', label: 'Initial Investment Value ($ / ₹)', type: 'number', step: 1000 },
      { id: 'endValue', label: 'Ending Portfolio Value ($ / ₹)', type: 'number', step: 1000 },
      { id: 'years', label: 'Investment Time Horizon (Years)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const v0 = Number(i.startValue) || 25000;
      const v1 = Number(i.endValue) || 78000;
      const t = Number(i.years) || 7;

      const cagr = (Math.pow(v1 / v0, 1 / t) - 1) * 100;
      const totalGrowth = ((v1 - v0) / v0) * 100;

      return {
        primaryValue: `${cagr.toFixed(2)}% CAGR`,
        primaryLabel: 'Compound Annual Growth Rate',
        secondaryMetrics: [
          { label: 'Total Absolute Return', value: `${totalGrowth.toFixed(1)}%` },
          { label: 'Total Profit Gained', value: `$${Math.round(v1 - v0).toLocaleString()}` },
          { label: 'Doubling Period (Rule of 72)', value: `${(72 / (cagr || 1)).toFixed(1)} Years` }
        ]
      };
    }
  },
  {
    id: 'commercial-cap-rate-calc',
    name: 'Real Estate Capitalization Rate (Cap Rate) Calculator',
    category: 'finance',
    subCategory: 'Real Estate & Investment',
    description: 'Calculate property capitalization rate (Cap Rate = NOI / Value) to evaluate commercial real estate yields.',
    formula: 'Cap Rate = Net Operating Income (NOI) / Current Property Value',
    formulaExplanation: 'Fundamental un-leveraged rate of return on commercial and multifamily investment properties.',
    defaultInputs: { propertyValue: 1200000, grossRentalIncome: 130000, operatingExpenses: 42000, vacancyPct: 5 },
    fields: [
      { id: 'propertyValue', label: 'Property Purchase Price / Value ($ / ₹)', type: 'number', step: 25000 },
      { id: 'grossRentalIncome', label: 'Annual Gross Potential Rent ($ / ₹)', type: 'number', step: 5000 },
      { id: 'operatingExpenses', label: 'Annual Operating Expenses ($ / ₹)', type: 'number', step: 2500 },
      { id: 'vacancyPct', label: 'Estimated Vacancy Rate (%)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const val = Number(i.propertyValue) || 1200000;
      const gross = Number(i.grossRentalIncome) || 130000;
      const exp = Number(i.operatingExpenses) || 42000;
      const vac = gross * ((Number(i.vacancyPct) || 5) / 100);

      const effectiveGross = gross - vac;
      const noi = effectiveGross - exp;
      const capRate = (noi / (val || 1)) * 100;

      return {
        primaryValue: `${capRate.toFixed(2)}% Cap Rate`,
        primaryLabel: 'Capitalization Rate (Un-leveraged Yield)',
        secondaryMetrics: [
          { label: 'Net Operating Income (NOI)', value: `$${Math.round(noi).toLocaleString()} / yr` },
          { label: 'Effective Gross Income', value: `$${Math.round(effectiveGross).toLocaleString()} / yr` },
          { label: 'Expense Ratio (Exp / EGI)', value: `${((exp / effectiveGross) * 100).toFixed(1)}%` }
        ]
      };
    }
  },
  {
    id: 'gross-rent-multiplier-calc',
    name: 'Gross Rent Multiplier (GRM) Calculator',
    category: 'finance',
    subCategory: 'Real Estate & Investment',
    description: 'Calculate Gross Rent Multiplier (GRM = Property Price / Gross Annual Rent) to screen rental property valuations.',
    formula: 'GRM = Property Purchase Price / Gross Annual Scheduled Rent',
    formulaExplanation: 'Quick screening ratio used to identify undervalued rental properties in a submarket.',
    defaultInputs: { propertyPrice: 450000, monthlyRent: 3800 },
    fields: [
      { id: 'propertyPrice', label: 'Property Price ($ / ₹)', type: 'number', step: 5000 },
      { id: 'monthlyRent', label: 'Total Monthly Rental Income ($ / ₹)', type: 'number', step: 100 }
    ],
    calculate: (i) => {
      const price = Number(i.propertyPrice) || 450000;
      const mRent = Number(i.monthlyRent) || 3800;
      const annualRent = mRent * 12;
      const grm = price / (annualRent || 1);
      const onePercentRule = (mRent / price) * 100;

      return {
        primaryValue: `${grm.toFixed(2)}x GRM`,
        primaryLabel: 'Gross Rent Multiplier',
        secondaryMetrics: [
          { label: 'Annual Gross Rental Income', value: `$${Math.round(annualRent).toLocaleString()} / yr` },
          { label: '1% Rule Test (Monthly Rent / Price)', value: `${onePercentRule.toFixed(2)}% (${onePercentRule >= 1.0 ? 'Passes 1% Rule' : 'Below 1%'})` },
          { label: 'Estimated Gross Yield', value: `${((annualRent / price) * 100).toFixed(2)}%` }
        ]
      };
    }
  },

  // =========================================================================
  // HEALTH, FITNESS & SPORTS
  // =========================================================================
  {
    id: 'tdee-mifflin-calc',
    name: 'TDEE & Calorie Burn Calculator (Mifflin-St Jeor)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate Basal Metabolic Rate and Total Daily Energy Expenditure across 5 physical activity levels.',
    formula: 'Men: BMR = 10W + 6.25H - 5A + 5; Women: BMR = 10W + 6.25H - 5A - 161; TDEE = BMR × Activity Factor',
    formulaExplanation: 'Mifflin-St Jeor equation recognized by the Academy of Nutrition and Dietetics as the most accurate metabolic predictor.',
    defaultInputs: { gender: 'male', age: 30, weightKg: 80, heightCm: 178, activity: 'moderate' },
    fields: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'age', label: 'Age (Years)', type: 'number', step: 1 },
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', step: 0.5 },
      { id: 'heightCm', label: 'Height (cm)', type: 'number', step: 1 },
      { id: 'activity', label: 'Activity Level', type: 'select', options: [
        { label: 'Sedentary (Desk Job, little exercise) × 1.2', value: 'sedentary' },
        { label: 'Lightly Active (1-3 days/week) × 1.375', value: 'light' },
        { label: 'Moderately Active (3-5 days/week) × 1.55', value: 'moderate' },
        { label: 'Very Active (6-7 days/week) × 1.725', value: 'heavy' },
        { label: 'Athlete / Physical Labor × 1.9', value: 'athlete' }
      ]}
    ],
    calculate: (i) => {
      const isMale = (i.gender || 'male') === 'male';
      const a = Number(i.age) || 30;
      const w = Number(i.weightKg) || 80;
      const h = Number(i.heightCm) || 178;

      const bmr = 10 * w + 6.25 * h - 5 * a + (isMale ? 5 : -161);
      const act = i.activity || 'moderate';
      const actMultiplier = act === 'sedentary' ? 1.2 : (act === 'light' ? 1.375 : (act === 'moderate' ? 1.55 : (act === 'heavy' ? 1.725 : 1.9)));
      const tdee = bmr * actMultiplier;

      return {
        primaryValue: `${Math.round(tdee)} kcal / day`,
        primaryLabel: 'Maintenance Calories (TDEE)',
        secondaryMetrics: [
          { label: 'Basal Metabolic Rate (BMR)', value: `${Math.round(bmr)} kcal / day` },
          { label: 'Mild Weight Loss (-250 kcal)', value: `${Math.round(tdee - 250)} kcal / day` },
          { label: 'Weight Loss Deficit (-500 kcal)', value: `${Math.round(tdee - 500)} kcal / day` },
          { label: 'Clean Muscle Bulk (+300 kcal)', value: `${Math.round(tdee + 300)} kcal / day` }
        ]
      };
    }
  },
  {
    id: 'target-heart-rate-karvonen-calc',
    name: 'Target Heart Rate Training Zones (Karvonen HRR Formula)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate Zone 1 to Zone 5 cardiovascular heart rate training zones using Heart Rate Reserve (HRR).',
    formula: 'Target HR = [(Max HR - Resting HR) × % Intensity] + Resting HR; Max HR = 220 - Age (or Tanaka: 208 - 0.7×Age)',
    formulaExplanation: 'Karvonen formula adjusts for individual cardiovascular baseline resting pulse.',
    defaultInputs: { age: 32, restingHr: 62 },
    fields: [
      { id: 'age', label: 'Age (Years)', type: 'number', step: 1 },
      { id: 'restingHr', label: 'Resting Heart Rate (BPM)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const age = Number(i.age) || 32;
      const rhr = Number(i.restingHr) || 62;
      const maxHr = Math.round(208 - 0.7 * age);
      const hrr = maxHr - rhr;

      const z2Low = Math.round(hrr * 0.60 + rhr);
      const z2High = Math.round(hrr * 0.70 + rhr);
      const z3High = Math.round(hrr * 0.80 + rhr);
      const z4High = Math.round(hrr * 0.90 + rhr);

      return {
        primaryValue: `${z2Low} - ${z2High} BPM`,
        primaryLabel: 'Zone 2 Aerobic Endurance (60-70% HRR)',
        secondaryMetrics: [
          { label: 'Maximum Heart Rate (Tanaka)', value: `${maxHr} BPM` },
          { label: 'Zone 3 Tempo (70-80%)', value: `${z2High + 1} - ${z3High} BPM` },
          { label: 'Zone 4 Threshold (80-90%)', value: `${z3High + 1} - ${z4High} BPM` },
          { label: 'Zone 5 VO2 Max (90-100%)', value: `${z4High + 1} - ${maxHr} BPM` }
        ]
      };
    }
  },
  {
    id: 'ideal-weight-multi-formula-calc',
    name: 'Ideal Body Weight Matrix (Devine, Robinson, Miller, Hamwi)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Compare ideal body weight across medical standards: Devine (clinical standard), Robinson, Miller, and Hamwi formulas.',
    formula: 'Devine Male: 50kg + 2.3kg/in over 5ft; Female: 45.5kg + 2.3kg/in over 5ft',
    formulaExplanation: 'Widely used in clinical pharmacokinetics and therapeutic drug dosing guidelines.',
    defaultInputs: { gender: 'male', heightInches: 70 }, // 5'10"
    fields: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'heightInches', label: 'Height (Total Inches, e.g. 70 for 5\'10")', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const isMale = (i.gender || 'male') === 'male';
      const h = Number(i.heightInches) || 70;
      const over5ft = Math.max(0, h - 60);

      const devineKg = isMale ? 50 + 2.3 * over5ft : 45.5 + 2.3 * over5ft;
      const robinsonKg = isMale ? 52 + 1.9 * over5ft : 49 + 1.7 * over5ft;
      const millerKg = isMale ? 56.2 + 1.41 * over5ft : 53.1 + 1.36 * over5ft;
      const hamwiKg = isMale ? 48 + 2.7 * over5ft : 45.5 + 2.2 * over5ft;

      const devineLbs = devineKg * 2.20462;

      return {
        primaryValue: `${devineKg.toFixed(1)} kg (${devineLbs.toFixed(1)} lbs)`,
        primaryLabel: 'Ideal Body Weight (Devine Formula)',
        secondaryMetrics: [
          { label: 'Robinson Formula', value: `${robinsonKg.toFixed(1)} kg (${(robinsonKg * 2.205).toFixed(1)} lbs)` },
          { label: 'Miller Formula', value: `${millerKg.toFixed(1)} kg (${(millerKg * 2.205).toFixed(1)} lbs)` },
          { label: 'Hamwi Formula', value: `${hamwiKg.toFixed(1)} kg (${(hamwiKg * 2.205).toFixed(1)} lbs)` }
        ]
      };
    }
  },
  {
    id: 'blood-alcohol-widmark-calc',
    name: 'Blood Alcohol Concentration (BAC) Calculator (Widmark Formula)',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Calculate blood alcohol concentration (% BAC) and hours until sober based on drinks consumed, gender, body weight, and time elapsed.',
    formula: 'BAC = [Alcohol Consumed (g) / (Body Weight (g) × r)] × 100 - (0.015 × Hours); r = 0.68 (males) / 0.55 (females)',
    formulaExplanation: 'Widmark scientific equation for forensic and clinical alcohol elimination tracking.',
    defaultInputs: { gender: 'male', weightLbs: 175, standardDrinks: 3, hoursDrinking: 2 },
    fields: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'weightLbs', label: 'Body Weight (lbs)', type: 'number', step: 5 },
      { id: 'standardDrinks', label: 'Standard Drinks Consumed (12oz beer, 5oz wine, 1.5oz spirit)', type: 'number', step: 1 },
      { id: 'hoursDrinking', label: 'Hours Since First Drink', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const isMale = (i.gender || 'male') === 'male';
      const weightG = (Number(i.weightLbs) || 175) * 453.592;
      const drinks = Number(i.standardDrinks) || 3;
      const hrs = Number(i.hoursDrinking) || 2;
      const alcoholGrams = drinks * 14; // 14g pure ethanol per standard US drink
      const r = isMale ? 0.68 : 0.55;

      const rawBac = (alcoholGrams / (weightG * r)) * 100;
      const netBac = Math.max(0, rawBac - (0.015 * hrs));
      const hoursToZero = netBac > 0 ? netBac / 0.015 : 0;

      return {
        primaryValue: `${netBac.toFixed(3)}% BAC`,
        primaryLabel: 'Estimated Blood Alcohol Concentration',
        secondaryMetrics: [
          { label: 'Legal Driving Status (0.08% limit)', value: netBac >= 0.08 ? 'ILLEGAL TO DRIVE (≥ 0.08%)' : 'Below 0.08% Legal Limit' },
          { label: 'Hours Until Fully Sober (0.00% BAC)', value: `~${hoursToZero.toFixed(1)} Hours` },
          { label: 'Peak Unmetabolized BAC', value: `${rawBac.toFixed(3)}%` }
        ]
      };
    }
  },

  // =========================================================================
  // MATHEMATICS, GEOMETRY & PHYSICS
  // =========================================================================
  {
    id: 'trigonometry-sin-cos-tan-calc',
    name: 'Trigonometry & Inverse Functions (sin, cos, tan, csc, sec, cot)',
    category: 'math',
    subCategory: 'Geometry & Trigonometry',
    description: 'Calculate exact trigonometric and inverse trigonometric ratios in degrees and radians.',
    formula: 'sin(θ), cos(θ), tan(θ) = sin/cos, csc = 1/sin, sec = 1/cos, cot = 1/tan',
    formulaExplanation: 'Circular trigonometry evaluations on the Cartesian unit circle.',
    defaultInputs: { angleDegrees: 45 },
    fields: [
      { id: 'angleDegrees', label: 'Angle (in Degrees °)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const deg = Number(i.angleDegrees) || 45;
      const rad = (deg * Math.PI) / 180;

      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const t = Math.abs(c) < 1e-10 ? NaN : Math.tan(rad);

      return {
        primaryValue: `sin(${deg}°) = ${s.toFixed(4)}`,
        primaryLabel: 'Sine Value',
        secondaryMetrics: [
          { label: `cos(${deg}°)`, value: `${c.toFixed(4)}` },
          { label: `tan(${deg}°)`, value: isNaN(t) ? 'Undefined' : `${t.toFixed(4)}` },
          { label: 'Angle in Radians', value: `${rad.toFixed(4)} rad (${(deg / 180).toFixed(2)}π)` }
        ]
      };
    }
  },
  {
    id: 'trapezoid-area-calc',
    name: 'Trapezoid Area & Perimeter Calculator',
    category: 'math',
    subCategory: 'Geometry & Trigonometry',
    description: 'Calculate trapezoid area (A = (a + b) × h / 2) and median length.',
    formula: 'Area = ((Base1 + Base2) / 2) × Height; Median = (Base1 + Base2) / 2',
    formulaExplanation: 'Two-dimensional Euclidean trapezoid quadrilateral geometry.',
    defaultInputs: { base1: 12, base2: 8, height: 6 },
    fields: [
      { id: 'base1', label: 'Bottom Parallel Base (a)', type: 'number', step: 1 },
      { id: 'base2', label: 'Top Parallel Base (b)', type: 'number', step: 1 },
      { id: 'height', label: 'Vertical Height (h)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const a = Number(i.base1) || 12;
      const b = Number(i.base2) || 8;
      const h = Number(i.height) || 6;

      const area = ((a + b) / 2) * h;
      const median = (a + b) / 2;

      return {
        primaryValue: `${area.toFixed(2)} sq units`,
        primaryLabel: 'Trapezoid Surface Area (A = (a+b)h/2)',
        secondaryMetrics: [
          { label: 'Mid-segment / Median Length', value: `${median.toFixed(2)} units` },
          { label: 'Sum of Bases (a + b)', value: `${a + b} units` }
        ]
      };
    }
  },
  {
    id: 'density-mass-volume-calc',
    name: 'Density, Mass & Volume Physics Calculator (ρ = m / V)',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate physical density ($g/cm^3$ or $kg/m^3$), mass, and displacement volume for materials.',
    formula: 'Density ρ = Mass / Volume; Specific Gravity = ρ_substance / ρ_water',
    formulaExplanation: 'Fundamental physical property quantifying volumetric mass density.',
    defaultInputs: { massKg: 19.3, volumeLiters: 1 }, // Pure Gold density
    fields: [
      { id: 'massKg', label: 'Mass (kg)', type: 'number', step: 0.1 },
      { id: 'volumeLiters', label: 'Volume (Liters, 1 L = 0.001 m³)', type: 'number', step: 0.1 }
    ],
    calculate: (i) => {
      const m = Number(i.massKg) || 19.3;
      const v = Number(i.volumeLiters) || 1;
      const densityKgM3 = (m / (v * 0.001 || 1));
      const densityGCm3 = densityKgM3 / 1000;
      const specificGravity = densityGCm3;

      return {
        primaryValue: `${densityGCm3.toFixed(3)} g/cm³`,
        primaryLabel: 'Material Density (ρ = m/V)',
        secondaryMetrics: [
          { label: 'SI Density (kg/m³)', value: `${Math.round(densityKgM3).toLocaleString()} kg/m³` },
          { label: 'Specific Gravity (relative to water)', value: `${specificGravity.toFixed(3)} SG` },
          { label: 'Buoyancy in Water', value: specificGravity > 1.0 ? 'Sinks in Water (> 1.0)' : 'Floats on Water (< 1.0)' }
        ]
      };
    }
  },

  // =========================================================================
  // EVERYDAY, HOME & CONSTRUCTION
  // =========================================================================
  {
    id: 'air-conditioner-btu-calc',
    name: 'Air Conditioner Room BTU & Cooling Size Calculator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate required room air conditioning cooling capacity (BTU/hr and tons) factoring room size, sun exposure, and ceiling height.',
    formula: 'Base BTU = Area (sq ft) × 20 BTU/sq ft; Sun Adjust: +10% sunny / -10% shaded; Kitchen: +4000 BTU',
    formulaExplanation: 'ASHRAE / EnergyStar residential room air conditioning sizing guidelines.',
    defaultInputs: { roomLengthFt: 20, roomWidthFt: 15, sunExposure: 'moderate', isKitchen: 'no' },
    fields: [
      { id: 'roomLengthFt', label: 'Room Length (Feet)', type: 'number', step: 1 },
      { id: 'roomWidthFt', label: 'Room Width (Feet)', type: 'number', step: 1 },
      { id: 'sunExposure', label: 'Sunlight Exposure', type: 'select', options: [
        { label: 'Moderate Sun Exposure', value: 'moderate' },
        { label: 'Heavy Sun / South-Facing Windows (+10%)', value: 'sunny' },
        { label: 'Shaded Room (-10%)', value: 'shaded' }
      ]},
      { id: 'isKitchen', label: 'Is this room a Kitchen?', type: 'select', options: [{ label: 'No', value: 'no' }, { label: 'Yes (+4,000 BTU for stove heat)', value: 'yes' }] }
    ],
    calculate: (i) => {
      const l = Number(i.roomLengthFt) || 20;
      const w = Number(i.roomWidthFt) || 15;
      const sqFt = l * w;

      let btu = sqFt * 20;
      if (i.sunExposure === 'sunny') btu *= 1.10;
      else if (i.sunExposure === 'shaded') btu *= 0.90;
      if (i.isKitchen === 'yes') btu += 4000;

      const tons = btu / 12000; // 1 ton = 12,000 BTU

      return {
        primaryValue: `${Math.round(btu).toLocaleString()} BTU / hr`,
        primaryLabel: 'Recommended AC Cooling Capacity',
        secondaryMetrics: [
          { label: 'AC Tonnage Equivalent', value: `${tons.toFixed(2)} Tons` },
          { label: 'Room Floor Area', value: `${sqFt} sq ft` },
          { label: 'Standard Unit Size Recommendation', value: btu <= 6000 ? '5,000 - 6,000 BTU Unit' : (btu <= 10000 ? '8,000 - 10,000 BTU Unit' : '12,000+ BTU Unit') }
        ]
      };
    }
  },
  {
    id: 'electricity-cost-appliance-calc',
    name: 'Appliance Electricity Cost & Power Consumption Calculator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate monthly and annual kilowatt-hour (kWh) power consumption and utility cost to run home electronics and appliances.',
    formula: 'Daily Cost = (Watts × Hours / 1000) × Electricity Cost per kWh',
    formulaExplanation: 'Electric utility billing meter formulation.',
    defaultInputs: { wattage: 1500, dailyHours: 4, costPerKwh: 0.16 }, // e.g. Space heater or AC
    fields: [
      { id: 'wattage', label: 'Appliance Power Rating (Watts, W)', type: 'number', step: 50 },
      { id: 'dailyHours', label: 'Hours Used Per Day', type: 'number', step: 0.5 },
      { id: 'costPerKwh', label: 'Electricity Utility Rate ($ / kWh)', type: 'number', step: 0.01 }
    ],
    calculate: (i) => {
      const w = Number(i.wattage) || 1500;
      const hrs = Number(i.dailyHours) || 4;
      const rate = Number(i.costPerKwh) || 0.16;

      const dailyKwh = (w * hrs) / 1000;
      const monthlyKwh = dailyKwh * 30.416;
      const annualKwh = dailyKwh * 365;

      const dailyCost = dailyKwh * rate;
      const monthlyCost = monthlyKwh * rate;
      const annualCost = annualKwh * rate;

      return {
        primaryValue: `$${monthlyCost.toFixed(2)} / month`,
        primaryLabel: 'Monthly Electricity Operating Cost',
        secondaryMetrics: [
          { label: 'Annual Electricity Cost', value: `$${annualCost.toFixed(2)} / yr` },
          { label: 'Daily Running Cost', value: `$${dailyCost.toFixed(2)} / day` },
          { label: 'Monthly Energy Consumption', value: `${monthlyKwh.toFixed(1)} kWh / month` }
        ]
      };
    }
  },
  {
    id: 'dog-age-human-years-calc',
    name: 'Dog Age in Human Years Calculator (AVMA & UC Davis Model)',
    category: 'everyday',
    subCategory: 'Pet & Lifestyle',
    description: 'Calculate canine biological age in equivalent human years factoring dog size (Small, Medium, Large, Giant) via veterinary epigenetic models.',
    formula: 'Year 1 = 15 human yrs; Year 2 = +9 yrs; Years 3+ = +4 to +7 yrs depending on breed weight',
    formulaExplanation: 'UC Davis and American Veterinary Medical Association (AVMA) breed-specific canine aging curves.',
    defaultInputs: { dogAgeYears: 5, dogSize: 'medium' },
    fields: [
      { id: 'dogAgeYears', label: 'Dog Age in Calendar Years', type: 'number', step: 1 },
      { id: 'dogSize', label: 'Dog Weight Category', type: 'select', options: [
        { label: 'Small Dog (< 20 lbs / 9 kg)', value: 'small' },
        { label: 'Medium Dog (21 - 50 lbs / 10-23 kg)', value: 'medium' },
        { label: 'Large Dog (51 - 90 lbs / 24-40 kg)', value: 'large' },
        { label: 'Giant Dog (> 90 lbs / 41+ kg)', value: 'giant' }
      ]}
    ],
    calculate: (i) => {
      const age = Number(i.dogAgeYears) || 5;
      const size = i.dogSize || 'medium';

      let humanYears = 0;
      if (age <= 0) humanYears = 0;
      else if (age === 1) humanYears = 15;
      else if (age === 2) humanYears = 24;
      else {
        const rate = size === 'small' ? 4 : (size === 'medium' ? 5 : (size === 'large' ? 6 : 7.5));
        humanYears = 24 + (age - 2) * rate;
      }

      return {
        primaryValue: `${Math.round(humanYears)} Human Years`,
        primaryLabel: 'Biological Human Age Equivalent',
        secondaryMetrics: [
          { label: 'Canine Life Stage', value: humanYears < 18 ? 'Puppy / Adolescent' : (humanYears < 50 ? 'Adult Dog' : 'Senior Canine') },
          { label: 'Size Category Aging Rate', value: `${size === 'small' ? '4' : (size === 'medium' ? '5' : (size === 'large' ? '6' : '7.5'))} human yrs/calendar yr` }
        ]
      };
    }
  },
  {
    id: 'coffee-brew-ratio-calc',
    name: 'Coffee to Water Brewing Ratio & Yield Calculator (SCA Gold Cup)',
    category: 'everyday',
    subCategory: 'Pet & Lifestyle',
    description: 'Calculate coffee grounds grams and water volume for Pour Over (1:16), French Press (1:15), Aeropress, and Espresso (1:2).',
    formula: 'Water (g) = Coffee (g) × Brew Ratio; Specialty Coffee Association (SCA) Standard: 1:16.6 (60g / Liter)',
    formulaExplanation: 'Specialty Coffee Association Golden Cup standard for 18-22% extraction yield.',
    defaultInputs: { brewMethod: 'pourover', desiredCups: 2 },
    fields: [
      { id: 'brewMethod', label: 'Brew Method & Golden Ratio', type: 'select', options: [
        { label: 'Pour Over / Drip (1:16 - Balanced)', value: 'pourover' },
        { label: 'French Press (1:15 - Full Bodied)', value: 'frenchpress' },
        { label: 'Cold Brew Concentrate (1:8)', value: 'coldbrew' },
        { label: 'Espresso (1:2 Ratio)', value: 'espresso' }
      ]},
      { id: 'desiredCups', label: 'Desired Coffee Cups (8 oz / 240 mL each)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const cups = Number(i.desiredCups) || 2;
      const method = i.brewMethod || 'pourover';
      const totalWaterG = cups * 240; // 240g water per cup

      let ratio = 16;
      if (method === 'frenchpress') ratio = 15;
      else if (method === 'coldbrew') ratio = 8;
      else if (method === 'espresso') ratio = 2;

      const coffeeGrams = totalWaterG / ratio;

      return {
        primaryValue: `${coffeeGrams.toFixed(1)} grams of Coffee`,
        primaryLabel: 'Required Coffee Grounds (Dry Weight)',
        secondaryMetrics: [
          { label: 'Total Water Volume', value: `${totalWaterG} grams (${totalWaterG} mL)` },
          { label: 'Exact Brewing Ratio', value: `1:${ratio}` },
          { label: 'Yield', value: `${cups} Cup(s) (~${cups * 8} fl oz)` }
        ]
      };
    }
  }
];
