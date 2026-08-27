import { CalculatorDefinition } from './calculatorEngine';

export const MASTER_CALCULATOR_NET_250: CalculatorDefinition[] = [
  // =========================================================================
  // FINANCIAL CALCULATORS
  // =========================================================================
  {
    id: '401k-employer-match-calc',
    name: '401(k) Employer Match & Growth Calculator',
    category: 'finance',
    subCategory: 'Retirement & Annuities',
    description: 'Calculate employee contributions, dollar-for-dollar employer matching, and total retirement wealth accumulation.',
    formula: 'Match = min(Salary × MatchCap %, Salary × Contribution % × MatchRate %); Future Value via Compound Interest',
    formulaExplanation: 'Calculates the 100% immediate return on investment gained from employer 401(k) matches.',
    defaultInputs: { salary: 85000, contribPct: 6, matchPct: 50, matchCapPct: 6, years: 30, returnPct: 7.5 },
    fields: [
      { id: 'salary', label: 'Annual Salary ($ / ₹)', type: 'number', step: 2500 },
      { id: 'contribPct', label: 'Your Contribution (%)', type: 'number', step: 0.5 },
      { id: 'matchPct', label: 'Employer Match Rate (% e.g. 50% or 100%)', type: 'number', step: 5 },
      { id: 'matchCapPct', label: 'Employer Match Cap (% of salary, e.g. 6%)', type: 'number', step: 0.5 },
      { id: 'years', label: 'Years to Retirement', type: 'number', step: 1 },
      { id: 'returnPct', label: 'Expected Annual Return (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const sal = Number(i.salary) || 85000;
      const cPct = (Number(i.contribPct) || 6) / 100;
      const mRate = (Number(i.matchPct) || 50) / 100;
      const mCap = (Number(i.matchCapPct) || 6) / 100;
      const yrs = Number(i.years) || 30;
      const r = (Number(i.returnPct) || 7.5) / 100 / 12;
      const n = yrs * 12;

      const employeeMonthly = (sal * cPct) / 12;
      const matchedSalaryPct = Math.min(cPct, mCap);
      const employerMonthly = (sal * matchedSalaryPct * mRate) / 12;
      const totalMonthly = employeeMonthly + employerMonthly;

      const fv = totalMonthly * ((Math.pow(1 + r, n) - 1) / r);
      const totalEmployeeContributed = employeeMonthly * n;
      const totalEmployerMatch = employerMonthly * n;
      const totalInterest = fv - (totalEmployeeContributed + totalEmployerMatch);

      return {
        primaryValue: `$${Math.round(fv).toLocaleString()}`,
        primaryLabel: `Total 401(k) Balance After ${yrs} Years`,
        secondaryMetrics: [
          { label: 'Annual Employer Match (Free Money)', value: `$${Math.round(employerMonthly * 12).toLocaleString()} / yr` },
          { label: 'Total Employee Contributions', value: `$${Math.round(totalEmployeeContributed).toLocaleString()}` },
          { label: 'Total Cumulative Employer Match', value: `$${Math.round(totalEmployerMatch).toLocaleString()}` },
          { label: 'Compound Growth Interest', value: `$${Math.round(totalInterest).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'annuity-payout-calc',
    name: 'Fixed Annuity Monthly Payout Calculator',
    category: 'finance',
    subCategory: 'Retirement & Annuities',
    description: 'Calculate guaranteed monthly payout income from a fixed single-premium immediate annuity (SPIA).',
    formula: 'PMT = Principal × [r(1+r)^n] / [(1+r)^n - 1]',
    formulaExplanation: 'Fixed annuities convert a lump-sum nest egg into guaranteed lifetime or fixed-period monthly income streams.',
    defaultInputs: { lumpSum: 300000, guaranteedYears: 20, annuityRate: 5.5 },
    fields: [
      { id: 'lumpSum', label: 'Annuity Purchase Premium ($ / ₹)', type: 'number', step: 10000 },
      { id: 'guaranteedYears', label: 'Payout Duration (Years)', type: 'number', step: 1 },
      { id: 'annuityRate', label: 'Guaranteed Annuity Rate (%)', type: 'number', step: 0.1 }
    ],
    calculate: (i) => {
      const P = Number(i.lumpSum) || 300000;
      const yrs = Number(i.guaranteedYears) || 20;
      const r = (Number(i.annuityRate) || 5.5) / 100 / 12;
      const n = yrs * 12;

      const monthlyPayout = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayout = monthlyPayout * n;

      return {
        primaryValue: `$${Math.round(monthlyPayout).toLocaleString()} / month`,
        primaryLabel: 'Guaranteed Monthly Annuity Payout',
        secondaryMetrics: [
          { label: 'Total Cumulative Payout Received', value: `$${Math.round(totalPayout).toLocaleString()}` },
          { label: 'Total Interest Earned', value: `$${Math.round(totalPayout - P).toLocaleString()}` },
          { label: 'Annual Income Equivalent', value: `$${Math.round(monthlyPayout * 12).toLocaleString()} / yr` }
        ]
      };
    }
  },
  {
    id: 'depreciation-macrs-calc',
    name: 'Asset Depreciation Calculator (Straight-Line & MACRS)',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Calculate annual business asset tax depreciation schedules under Straight-Line and IRS MACRS (Modified Accelerated Cost Recovery).',
    formula: 'Straight-Line: (Cost - Salvage) / Useful Life; MACRS 5-Yr Half-Year: 20%, 32%, 19.2%, 11.52%, 11.52%, 5.76%',
    formulaExplanation: 'IRS asset depreciation methods for commercial tax deduction schedules.',
    defaultInputs: { assetCost: 50000, salvageValue: 5000, usefulLifeYears: 5 },
    fields: [
      { id: 'assetCost', label: 'Asset Purchase Cost ($ / ₹)', type: 'number', step: 2500 },
      { id: 'salvageValue', label: 'Estimated Salvage Value ($ / ₹)', type: 'number', step: 500 },
      { id: 'usefulLifeYears', label: 'Useful Life (Years, e.g. 5, 7, 10)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const cost = Number(i.assetCost) || 50000;
      const salvage = Number(i.salvageValue) || 5000;
      const life = Number(i.usefulLifeYears) || 5;

      const straightLineAnnual = (cost - salvage) / (life || 1);
      const macrsYr1 = cost * 0.20; // 5-yr MACRS standard 20%
      const macrsYr2 = cost * 0.32; // 32%

      return {
        primaryValue: `$${Math.round(straightLineAnnual).toLocaleString()} / year`,
        primaryLabel: 'Annual Straight-Line Depreciation',
        secondaryMetrics: [
          { label: 'Year 1 MACRS Accelerated Deduction', value: `$${Math.round(macrsYr1).toLocaleString()}` },
          { label: 'Year 2 MACRS Accelerated Deduction', value: `$${Math.round(macrsYr2).toLocaleString()}` },
          { label: 'Total Depreciable Base', value: `$${Math.round(cost - salvage).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'margin-markup-sales-calc',
    name: 'Gross Margin vs Markup Sales Price Calculator',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Convert between Gross Profit Margin % and Markup % to determine optimal retail product pricing.',
    formula: 'Margin = (Price - Cost) / Price; Markup = (Price - Cost) / Cost; Price = Cost / (1 - Margin)',
    formulaExplanation: 'Clarifies the critical retail accounting distinction between profit margin and cost markup.',
    defaultInputs: { itemCost: 60, desiredMarginPct: 40 },
    fields: [
      { id: 'itemCost', label: 'Cost of Goods Sold (COGS) ($ / ₹)', type: 'number', step: 5 },
      { id: 'desiredMarginPct', label: 'Target Gross Margin (%)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const cost = Number(i.itemCost) || 60;
      const margin = (Number(i.desiredMarginPct) || 40) / 100;

      const price = cost / (1 - margin);
      const grossProfit = price - cost;
      const markupPct = (grossProfit / cost) * 100;

      return {
        primaryValue: `$${price.toFixed(2)}`,
        primaryLabel: 'Target Selling Price',
        secondaryMetrics: [
          { label: 'Equivalent Cost Markup', value: `${markupPct.toFixed(1)}% Markup` },
          { label: 'Gross Profit Per Unit', value: `$${grossProfit.toFixed(2)}` },
          { label: 'Profit Margin Check', value: `${(margin * 100).toFixed(1)}% Margin` }
        ]
      };
    }
  },
  {
    id: 'discount-sale-price-calc',
    name: 'Discount, Sale Price & Sales Tax Calculator',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate final out-the-door price after percentage discount, dollar coupon, and local sales tax.',
    formula: 'Sale Price = Original Price × (1 - Discount %); Final Price = (Sale Price - Coupon) × (1 + Sales Tax %)',
    formulaExplanation: 'Retail shopping discount and sales tax calculation.',
    defaultInputs: { originalPrice: 120, discountPct: 25, salesTaxPct: 8.25 },
    fields: [
      { id: 'originalPrice', label: 'Original Retail Price ($ / ₹)', type: 'number', step: 5 },
      { id: 'discountPct', label: 'Discount Percentage (%)', type: 'number', step: 5 },
      { id: 'salesTaxPct', label: 'Sales Tax Rate (%)', type: 'number', step: 0.25 }
    ],
    calculate: (i) => {
      const orig = Number(i.originalPrice) || 120;
      const disc = (Number(i.discountPct) || 25) / 100;
      const tax = (Number(i.salesTaxPct) || 8.25) / 100;

      const discountedPrice = orig * (1 - disc);
      const savings = orig - discountedPrice;
      const taxAmount = discountedPrice * tax;
      const finalPrice = discountedPrice + taxAmount;

      return {
        primaryValue: `$${finalPrice.toFixed(2)}`,
        primaryLabel: 'Final Total (with Sales Tax)',
        secondaryMetrics: [
          { label: 'Discounted Price (Before Tax)', value: `$${discountedPrice.toFixed(2)}` },
          { label: 'Total Dollar Savings', value: `$${savings.toFixed(2)} (${(disc * 100).toFixed(0)}% Off)` },
          { label: 'Sales Tax Amount', value: `$${taxAmount.toFixed(2)}` }
        ]
      };
    }
  },
  {
    id: 'dupont-roe-calc',
    name: 'DuPont 3-Point ROE Analysis Decomposition',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Deconstruct Return on Equity into Net Profit Margin × Asset Turnover × Financial Leverage Equity Multiplier.',
    formula: 'ROE = (Net Income / Sales) × (Sales / Assets) × (Assets / Equity)',
    formulaExplanation: 'Standard corporate finance DuPont model isolating drivers of shareholder value creation.',
    defaultInputs: { netIncome: 1200000, revenue: 15000000, totalAssets: 10000000, totalEquity: 4000000 },
    fields: [
      { id: 'netIncome', label: 'Net Income ($ / ₹)', type: 'number', step: 50000 },
      { id: 'revenue', label: 'Total Revenue ($ / ₹)', type: 'number', step: 100000 },
      { id: 'totalAssets', label: 'Total Assets ($ / ₹)', type: 'number', step: 100000 },
      { id: 'totalEquity', label: 'Total Shareholder Equity ($ / ₹)', type: 'number', step: 50000 }
    ],
    calculate: (i) => {
      const ni = Number(i.netIncome) || 1200000;
      const rev = Number(i.revenue) || 15000000;
      const assets = Number(i.totalAssets) || 10000000;
      const equity = Number(i.totalEquity) || 4000000;

      const netMargin = (ni / rev) * 100;
      const assetTurnover = rev / assets;
      const equityMultiplier = assets / equity;
      const roe = (ni / equity) * 100;

      return {
        primaryValue: `${roe.toFixed(2)}% ROE`,
        primaryLabel: 'Return on Equity (DuPont)',
        secondaryMetrics: [
          { label: '1. Net Profit Margin', value: `${netMargin.toFixed(2)}%` },
          { label: '2. Asset Turnover', value: `${assetTurnover.toFixed(2)}x` },
          { label: '3. Financial Leverage (Equity Multiplier)', value: `${equityMultiplier.toFixed(2)}x` }
        ]
      };
    }
  },
  {
    id: 'saas-rule-of-40-calc',
    name: 'SaaS Rule of 40 & Growth Efficiency Calculator',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Calculate SaaS Rule of 40 Score = Year-over-Year Revenue Growth % + EBITDA / Free Cash Flow Margin %.',
    formula: 'Rule of 40 Score = YoY Revenue Growth Rate (%) + FCF Margin (%)',
    formulaExplanation: 'Venture capital benchmark: SaaS businesses exceeding 40% combined growth and profitability trade at premium valuations.',
    defaultInputs: { yoyGrowthPct: 32, fcfMarginPct: 14 },
    fields: [
      { id: 'yoyGrowthPct', label: 'Year-over-Year Revenue Growth Rate (%)', type: 'number', step: 1 },
      { id: 'fcfMarginPct', label: 'Free Cash Flow / EBITDA Margin (%)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const growth = Number(i.yoyGrowthPct) || 32;
      const margin = Number(i.fcfMarginPct) || 14;
      const score = growth + margin;

      return {
        primaryValue: `${score.toFixed(1)}% (Rule of 40)`,
        primaryLabel: 'SaaS Rule of 40 Benchmark Score',
        secondaryMetrics: [
          { label: 'Status vs 40% Target', value: score >= 40 ? 'PASSES RULE OF 40 (Elite Health)' : 'BELOW 40% TARGET' },
          { label: 'Growth Component', value: `${growth.toFixed(1)}% YoY` },
          { label: 'Cash Flow Margin Component', value: `${margin.toFixed(1)}% FCF Margin` }
        ]
      };
    }
  },

  // =========================================================================
  // HEALTH, FITNESS & SPORTS
  // =========================================================================
  {
    id: 'lean-mass-index-ffmi-calc',
    name: 'Fat-Free Mass Index (FFMI) & Natural Limit Calculator',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate Fat-Free Mass Index (FFMI) and normalized FFMI to evaluate muscularity and natural bodybuilding potential.',
    formula: 'FFMI = (Weight_kg × (1 - BF%)) / Height_m²; Normalized = FFMI + 6.1 × (1.8 - Height_m)',
    formulaExplanation: 'Kouri et al. landmark study establishing a natural drug-free athletic ceiling of ~25.0 FFMI.',
    defaultInputs: { weightKg: 82, heightCm: 180, bodyFatPct: 12 },
    fields: [
      { id: 'weightKg', label: 'Body Weight (kg)', type: 'number', step: 0.5 },
      { id: 'heightCm', label: 'Height (cm)', type: 'number', step: 1 },
      { id: 'bodyFatPct', label: 'Body Fat Percentage (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const w = Number(i.weightKg) || 82;
      const hM = (Number(i.heightCm) || 180) / 100;
      const bf = (Number(i.bodyFatPct) || 12) / 100;

      const ffm = w * (1 - bf);
      const ffmi = ffm / (hM * hM);
      const normalizedFfmi = ffmi + 6.1 * (1.8 - hM);

      let cat = 'Average Muscularity';
      if (normalizedFfmi >= 25) cat = 'Near/Beyond Natural Limit (≥ 25)';
      else if (normalizedFfmi >= 22) cat = 'Excellent / Highly Muscular (22-24.9)';
      else if (normalizedFfmi >= 20) cat = 'Above Average (20-21.9)';

      return {
        primaryValue: `${normalizedFfmi.toFixed(1)} Normalized FFMI`,
        primaryLabel: 'Fat-Free Mass Index',
        secondaryMetrics: [
          { label: 'Muscularity Classification', value: cat },
          { label: 'Total Lean Body Mass', value: `${ffm.toFixed(1)} kg (${(ffm * 2.205).toFixed(1)} lbs)` },
          { label: 'Raw Unadjusted FFMI', value: `${ffmi.toFixed(1)}` }
        ]
      };
    }
  },
  {
    id: 'cycling-speed-power-calc',
    name: 'Cycling Speed to Watts & Power Calculator',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate mechanical power output (Watts) and Watts/kg from cycling speed, gradient slope, and rider weight.',
    formula: 'Power = Rolling Resistance + Aerodynamic Drag (0.5·CdA·ρ·v³) + Gravitational Slope Power (m·g·s·v)',
    formulaExplanation: 'Physics-based cycling power calculation modeling aerodynamic drag and road gradient.',
    defaultInputs: { speedKmh: 32, riderWeightKg: 72, bikeWeightKg: 8, gradientPct: 3 },
    fields: [
      { id: 'speedKmh', label: 'Cycling Speed (km/h)', type: 'number', step: 1 },
      { id: 'riderWeightKg', label: 'Rider Body Weight (kg)', type: 'number', step: 1 },
      { id: 'bikeWeightKg', label: 'Bike & Gear Weight (kg)', type: 'number', step: 0.5 },
      { id: 'gradientPct', label: 'Road Gradient / Slope (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const v = (Number(i.speedKmh) || 32) / 3.6; // m/s
      const mRider = Number(i.riderWeightKg) || 72;
      const mTotal = mRider + (Number(i.bikeWeightKg) || 8);
      const grad = (Number(i.gradientPct) || 3) / 100;

      const pGravity = mTotal * 9.81 * grad * v;
      const pRoll = mTotal * 9.81 * 0.004 * v; // Crr 0.004
      const pAero = 0.5 * 1.225 * 0.32 * Math.pow(v, 3); // CdA 0.32
      const totalWatts = Math.max(0, pGravity + pRoll + pAero);
      const wKg = totalWatts / mRider;

      return {
        primaryValue: `${Math.round(totalWatts)} Watts`,
        primaryLabel: 'Estimated Power Output',
        secondaryMetrics: [
          { label: 'Power-to-Weight Ratio', value: `${wKg.toFixed(2)} W/kg` },
          { label: 'Aerodynamic Drag Power', value: `${Math.round(pAero)} Watts` },
          { label: 'Climbing Slope Power', value: `${Math.round(pGravity)} Watts` },
          { label: 'Estimated Calorie Burn Rate', value: `${Math.round(totalWatts * 3.6)} kcal / hr` }
        ]
      };
    }
  },
  {
    id: 'wilks-score-calc',
    name: 'Wilks Score & DOTS Powerlifting Strength Calculator',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate standardized Wilks and DOTS coefficients to compare relative powerlifting strength across body weight classes.',
    formula: 'Wilks = Total Weight Lifted (kg) × [500 / Polynomial(Bodyweight)]',
    formulaExplanation: 'International Powerlifting Federation (IPF) standard formula normalizing lifting totals.',
    defaultInputs: { gender: 'male', bodyWeightKg: 83, squatKg: 200, benchKg: 140, deadliftKg: 240 },
    fields: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'bodyWeightKg', label: 'Body Weight (kg)', type: 'number', step: 0.5 },
      { id: 'squatKg', label: 'Best Squat (kg)', type: 'number', step: 2.5 },
      { id: 'benchKg', label: 'Best Bench Press (kg)', type: 'number', step: 2.5 },
      { id: 'deadliftKg', label: 'Best Deadlift (kg)', type: 'number', step: 2.5 }
    ],
    calculate: (i) => {
      const isMale = (i.gender || 'male') === 'male';
      const w = Number(i.bodyWeightKg) || 83;
      const total = (Number(i.squatKg) || 200) + (Number(i.benchKg) || 140) + (Number(i.deadliftKg) || 240);

      // Wilks coefficients
      const a = isMale ? -216.0475144 : 594.31747775582;
      const b = isMale ? 16.2606339 : -27.23842536447;
      const c = isMale ? -0.002388645 : 0.82112226871;
      const d = isMale ? -0.00113732 : -0.00930733913;
      const e = isMale ? 7.01863e-6 : 4.731582e-5;
      const f = isMale ? -1.291e-8 : -9.054e-8;

      const poly = a + b * w + c * Math.pow(w, 2) + d * Math.pow(w, 3) + e * Math.pow(w, 4) + f * Math.pow(w, 5);
      const coeff = 500 / poly;
      const wilks = total * coeff;

      return {
        primaryValue: `${wilks.toFixed(2)} Wilks Points`,
        primaryLabel: 'Normalized Powerlifting Score',
        secondaryMetrics: [
          { label: 'Total Weight Lifted (S+B+D)', value: `${total} kg (${Math.round(total * 2.205)} lbs)` },
          { label: 'Strength Multiplier', value: `${(total / w).toFixed(2)}x Bodyweight` },
          { label: 'Classification', value: wilks >= 400 ? 'Advanced / Elite Competitor' : (wilks >= 320 ? 'Intermediate Lifter' : 'Novice Lifter') }
        ]
      };
    }
  },

  // =========================================================================
  // MATHEMATICS, SCIENCE & GEOMETRY
  // =========================================================================
  {
    id: 'lcm-gcd-advanced-calc',
    name: 'LCM & GCD / GCF Multi-Number Calculator',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate Least Common Multiple (LCM) and Greatest Common Divisor (GCD) using the Euclidean algorithm.',
    formula: 'LCM(a, b) = |a × b| / GCD(a, b); GCD via Euclidean remainder reduction',
    formulaExplanation: 'Fundamental number theory for integer division and modular arithmetic.',
    defaultInputs: { numA: 48, numB: 180 },
    fields: [
      { id: 'numA', label: 'First Integer (a)', type: 'number', step: 1 },
      { id: 'numB', label: 'Second Integer (b)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      let a = Math.abs(Number(i.numA) || 48);
      let b = Math.abs(Number(i.numB) || 180);
      const origA = a, origB = b;

      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      const gcd = a || 1;
      const lcm = (origA * origB) / gcd;

      return {
        primaryValue: `LCM = ${lcm.toLocaleString()}`,
        primaryLabel: 'Least Common Multiple (LCM)',
        secondaryMetrics: [
          { label: 'Greatest Common Divisor (GCD / GCF)', value: `GCD = ${gcd}` },
          { label: 'Simplified Ratio a : b', value: `${origA / gcd} : ${origB / gcd}` },
          { label: 'Product a × b', value: `${(origA * origB).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'ellipse-area-calc',
    name: 'Ellipse Area, Circumference & Eccentricity',
    category: 'math',
    subCategory: 'Geometry & Trigonometry',
    description: 'Calculate elliptical area (A = π·a·b), Ramanujan approximate perimeter, and orbital eccentricity.',
    formula: 'Area = π × a × b; Perimeter ≈ π[3(a+b) - √((3a+b)(a+3b))]; Eccentricity e = √(1 - b²/a²)',
    formulaExplanation: 'Ramanujan second approximation formula for precise ellipse perimeter calculations.',
    defaultInputs: { semiMajorA: 10, semiMinorB: 6 },
    fields: [
      { id: 'semiMajorA', label: 'Semi-Major Axis (a)', type: 'number', step: 0.5 },
      { id: 'semiMinorB', label: 'Semi-Minor Axis (b)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const a = Number(i.semiMajorA) || 10;
      const b = Number(i.semiMinorB) || 6;

      const area = Math.PI * a * b;
      const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
      const perimeter = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
      const eccentricity = Math.sqrt(Math.max(0, 1 - (b * b) / (a * a)));

      return {
        primaryValue: `${area.toFixed(2)} sq units`,
        primaryLabel: 'Ellipse Surface Area (A = πab)',
        secondaryMetrics: [
          { label: 'Circumference (Ramanujan Approximation)', value: `${perimeter.toFixed(2)} units` },
          { label: 'Orbital Eccentricity (e)', value: `${eccentricity.toFixed(4)}` },
          { label: 'Focal Distance (c = √(a²-b²))', value: `${Math.sqrt(a * a - b * b).toFixed(2)} units` }
        ]
      };
    }
  },
  {
    id: 'ideal-gas-law-calc',
    name: 'Ideal Gas Law Physics & Chemistry Calculator (PV = nRT)',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Solve for Pressure (P in atm), Volume (V in L), Moles (n), or Temperature (T in Kelvin) with universal gas constant R = 0.08206.',
    formula: 'P × V = n × R × T (where R = 0.08206 L·atm / mol·K)',
    formulaExplanation: 'Fundamental thermodynamic equation of state for ideal gases.',
    defaultInputs: { molesN: 2.5, tempCelsius: 25, volumeLiters: 15 },
    fields: [
      { id: 'molesN', label: 'Amount of Gas (Moles, n)', type: 'number', step: 0.1 },
      { id: 'tempCelsius', label: 'Temperature (°C)', type: 'number', step: 1 },
      { id: 'volumeLiters', label: 'Container Volume (Liters, V)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const n = Number(i.molesN) || 2.5;
      const tC = Number(i.tempCelsius) || 25;
      const tK = tC + 273.15;
      const v = Number(i.volumeLiters) || 15;
      const R = 0.082057;

      const pAtm = (n * R * tK) / (v || 1);
      const pKpa = pAtm * 101.325;
      const pPsi = pAtm * 14.696;

      return {
        primaryValue: `${pAtm.toFixed(2)} atm`,
        primaryLabel: 'Gas Pressure (Ideal Gas Law)',
        secondaryMetrics: [
          { label: 'Pressure in Kilopascals (kPa)', value: `${pKpa.toFixed(1)} kPa` },
          { label: 'Pressure in PSI', value: `${pPsi.toFixed(2)} psi` },
          { label: 'Absolute Temperature (Kelvin)', value: `${tK.toFixed(2)} K` }
        ]
      };
    }
  },

  // =========================================================================
  // EVERYDAY, HOME & CONSTRUCTION
  // =========================================================================
  {
    id: 'solar-panel-system-calc',
    name: 'Solar Panel System Size & kWh Production Calculator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate solar array wattage (kW), required roof panel count, and annual kilowatt-hour electricity production.',
    formula: 'System kW = Annual kWh / (365 × Daily Peak Sun Hours × 0.80 System Efficiency)',
    formulaExplanation: 'NREL PVWatts standard residential solar irradiance sizing model.',
    defaultInputs: { annualKwhUsage: 10500, peakSunHours: 4.5, panelWattage: 400 },
    fields: [
      { id: 'annualKwhUsage', label: 'Annual Electricity Consumption (kWh)', type: 'number', step: 500 },
      { id: 'peakSunHours', label: 'Average Daily Peak Sun Hours (e.g. 4.0 - 5.5)', type: 'number', step: 0.25 },
      { id: 'panelWattage', label: 'Individual Panel Rating (Watts, e.g. 400W)', type: 'number', step: 25 }
    ],
    calculate: (i) => {
      const kwh = Number(i.annualKwhUsage) || 10500;
      const sunHrs = Number(i.peakSunHours) || 4.5;
      const panelWatts = Number(i.panelWattage) || 400;

      const dailyKwh = kwh / 365;
      const systemKw = dailyKwh / (sunHrs * 0.80); // 80% derate efficiency
      const totalWatts = systemKw * 1000;
      const panelCount = Math.ceil(totalWatts / panelWatts);
      const actualSystemKw = (panelCount * panelWatts) / 1000;
      const roofSqFt = panelCount * 18.5; // ~18.5 sq ft per 400W panel

      return {
        primaryValue: `${actualSystemKw.toFixed(1)} kW System (${panelCount} Panels)`,
        primaryLabel: 'Recommended Solar Array Capacity',
        secondaryMetrics: [
          { label: 'Panel Count (400W Panels)', value: `${panelCount} Panels` },
          { label: 'Required Roof Area', value: `${Math.round(roofSqFt)} sq ft` },
          { label: 'Est. Annual Solar Generation', value: `~${Math.round(actualSystemKw * sunHrs * 365 * 0.80).toLocaleString()} kWh / yr` }
        ]
      };
    }
  },
  {
    id: 'time-card-hours-calc',
    name: 'Time Card, Overtime & Gross Pay Calculator',
    category: 'everyday',
    subCategory: 'Developer & Security',
    description: 'Calculate daily and weekly worked hours, lunch breaks, and gross pay with 1.5x overtime for hours over 40.',
    formula: 'Regular Hours ≤ 40; Overtime = max(0, Total - 40); Gross Pay = (Reg × Rate) + (OT × Rate × 1.5)',
    formulaExplanation: 'FLSA standard weekly overtime payroll calculation.',
    defaultInputs: { hourlyWage: 26.50, mondayHrs: 8.5, tuesdayHrs: 9, wednesdayHrs: 8.5, thursdayHrs: 9, fridayHrs: 8.5 },
    fields: [
      { id: 'hourlyWage', label: 'Base Hourly Wage ($ / ₹)', type: 'number', step: 0.5 },
      { id: 'mondayHrs', label: 'Monday Worked Hours', type: 'number', step: 0.5 },
      { id: 'tuesdayHrs', label: 'Tuesday Worked Hours', type: 'number', step: 0.5 },
      { id: 'wednesdayHrs', label: 'Wednesday Worked Hours', type: 'number', step: 0.5 },
      { id: 'thursdayHrs', label: 'Thursday Worked Hours', type: 'number', step: 0.5 },
      { id: 'fridayHrs', label: 'Friday Worked Hours', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const wage = Number(i.hourlyWage) || 26.50;
      const m = Number(i.mondayHrs) || 8.5;
      const tu = Number(i.tuesdayHrs) || 9;
      const w = Number(i.wednesdayHrs) || 8.5;
      const th = Number(i.thursdayHrs) || 9;
      const f = Number(i.fridayHrs) || 8.5;

      const totalHrs = m + tu + w + th + f;
      const regHrs = Math.min(40, totalHrs);
      const otHrs = Math.max(0, totalHrs - 40);

      const regPay = regHrs * wage;
      const otPay = otHrs * wage * 1.5;
      const grossPay = regPay + otPay;

      return {
        primaryValue: `$${grossPay.toFixed(2)}`,
        primaryLabel: 'Weekly Gross Earnings',
        secondaryMetrics: [
          { label: 'Total Hours Logged', value: `${totalHrs.toFixed(1)} Hours` },
          { label: 'Regular Pay (40h Max)', value: `$${regPay.toFixed(2)}` },
          { label: 'Overtime Pay (1.5x)', value: `$${otPay.toFixed(2)} (${otHrs.toFixed(1)} OT hrs)` }
        ]
      };
    }
  }
];
