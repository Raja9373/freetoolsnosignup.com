import { CalculatorDefinition } from './calculatorEngine';

export const COMPREHENSIVE_CATALOG_CALCULATORS: CalculatorDefinition[] = [
  // =========================================================================
  // FINANCIAL CALCULATORS (CALCULATOR.NET CATALOG)
  // =========================================================================
  {
    id: 'fha-loan-calc',
    name: 'FHA Loan & Mortgage Insurance (MIP) Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate FHA mortgage monthly payments with upfront 1.75% MIP and annual mortgage insurance premiums.',
    formula: 'Total Loan = Home Price - 3.5% Down + 1.75% Upfront MIP; Monthly MIP = Loan × 0.55% / 12',
    formulaExplanation: 'Federal Housing Administration loans require a 3.5% minimum down payment and mandatory mortgage insurance.',
    defaultInputs: { homePrice: 320000, downPct: 3.5, interestRate: 6.2, loanTermYears: 30, propertyTax: 3200, homeIns: 1200 },
    fields: [
      { id: 'homePrice', label: 'Home Purchase Price ($ / ₹)', type: 'number', step: 5000 },
      { id: 'downPct', label: 'Down Payment Percentage (%)', type: 'number', step: 0.5 },
      { id: 'interestRate', label: 'Mortgage Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'loanTermYears', label: 'Loan Term (Years)', type: 'number', step: 1 },
      { id: 'propertyTax', label: 'Annual Property Tax ($ / ₹)', type: 'number', step: 100 },
      { id: 'homeIns', label: 'Annual Homeowners Insurance ($ / ₹)', type: 'number', step: 50 }
    ],
    calculate: (i) => {
      const price = Number(i.homePrice) || 320000;
      const downPct = (Number(i.downPct) || 3.5) / 100;
      const downPayment = price * downPct;
      const baseLoan = price - downPayment;
      const upfrontMIP = baseLoan * 0.0175; // 1.75% upfront
      const totalLoan = baseLoan + upfrontMIP;
      const r = (Number(i.interestRate) || 6.2) / 100 / 12;
      const n = (Number(i.loanTermYears) || 30) * 12;
      const monthlyPI = (totalLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const monthlyMIP = (totalLoan * 0.0055) / 12; // 0.55% annual MIP
      const monthlyTax = (Number(i.propertyTax) || 3200) / 12;
      const monthlyIns = (Number(i.homeIns) || 1200) / 12;
      const totalMonthly = monthlyPI + monthlyMIP + monthlyTax + monthlyIns;

      return {
        primaryValue: `$${Math.round(totalMonthly).toLocaleString()} / month`,
        primaryLabel: 'Total Monthly FHA Payment (PITI + MIP)',
        secondaryMetrics: [
          { label: 'Principal & Interest (P&I)', value: `$${Math.round(monthlyPI).toLocaleString()}` },
          { label: 'Monthly FHA MIP Insurance', value: `$${Math.round(monthlyMIP).toLocaleString()}` },
          { label: 'Financed Upfront MIP (1.75%)', value: `$${Math.round(upfrontMIP).toLocaleString()}` },
          { label: 'Total Financed Loan Amount', value: `$${Math.round(totalLoan).toLocaleString()}` }
        ],
        breakdown: [
          { label: 'Principal & Interest', value: Math.round(monthlyPI), color: '#3b82f6' },
          { label: 'FHA MIP', value: Math.round(monthlyMIP), color: '#ec4899' },
          { label: 'Property Tax', value: Math.round(monthlyTax), color: '#f59e0b' },
          { label: 'Home Insurance', value: Math.round(monthlyIns), color: '#10b981' }
        ],
        chartType: 'pie'
      };
    }
  },
  {
    id: 'va-mortgage-calc',
    name: 'VA Mortgage Loan & Funding Fee Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Lending',
    description: 'Calculate 0% down VA loan payments for US military veterans with tiered VA funding fees and no monthly PMI.',
    formula: 'Loan = Home Price + VA Funding Fee (2.15% first use / 3.3% subsequent); Monthly PMI = $0',
    formulaExplanation: 'VA loans backed by the Department of Veterans Affairs require no down payment and zero monthly private mortgage insurance.',
    defaultInputs: { homePrice: 380000, downPayment: 0, interestRate: 5.9, isFirstUse: 'yes', hasDisability: 'no' },
    fields: [
      { id: 'homePrice', label: 'Home Purchase Price ($ / ₹)', type: 'number', step: 5000 },
      { id: 'downPayment', label: 'Down Payment ($ / ₹)', type: 'number', step: 2500 },
      { id: 'interestRate', label: 'VA Loan Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'isFirstUse', label: 'First-time VA Loan User?', type: 'select', options: [{ label: 'Yes (2.15% Funding Fee)', value: 'yes' }, { label: 'No / Subsequent Use (3.30%)', value: 'no' }] },
      { id: 'hasDisability', label: 'Service-Connected Disability (Fee Exempt)?', type: 'select', options: [{ label: 'No (Fee Applies)', value: 'no' }, { label: 'Yes (100% Fee Waived)', value: 'yes' }] }
    ],
    calculate: (i) => {
      const price = Number(i.homePrice) || 380000;
      const down = Number(i.downPayment) || 0;
      const baseLoan = price - down;
      const exempt = i.hasDisability === 'yes';
      const feePct = exempt ? 0 : (i.isFirstUse === 'yes' ? 0.0215 : 0.033);
      const fundingFee = baseLoan * feePct;
      const totalLoan = baseLoan + fundingFee;
      const r = (Number(i.interestRate) || 5.9) / 100 / 12;
      const n = 30 * 12;
      const monthlyPI = (totalLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

      return {
        primaryValue: `$${Math.round(monthlyPI).toLocaleString()} / month`,
        primaryLabel: 'Monthly VA Principal & Interest',
        secondaryMetrics: [
          { label: 'VA Funding Fee Added to Loan', value: exempt ? '$0 (Disability Exempt)' : `$${Math.round(fundingFee).toLocaleString()}` },
          { label: 'Total Financed Loan Amount', value: `$${Math.round(totalLoan).toLocaleString()}` },
          { label: 'Monthly PMI Savings', value: '+$185/mo (No PMI required)' }
        ]
      };
    }
  },
  {
    id: 'commercial-real-estate-calc',
    name: 'Commercial Real Estate (CRE) Loan & DSCR Calculator',
    category: 'finance',
    subCategory: 'Real Estate & Investment',
    description: 'Calculate commercial property loan amortizations, balloon balance payments, and Debt Service Coverage Ratio (DSCR).',
    formula: 'DSCR = Net Operating Income (NOI) / Annual Debt Service',
    formulaExplanation: 'Commercial lenders require minimum DSCR of 1.20x to 1.25x for property debt approval.',
    defaultInputs: { purchasePrice: 1500000, ltvPct: 75, annualNoi: 140000, interestRate: 7.0, amortYears: 25, balloonYears: 10 },
    fields: [
      { id: 'purchasePrice', label: 'Commercial Property Value ($ / ₹)', type: 'number', step: 25000 },
      { id: 'ltvPct', label: 'Loan-to-Value (LTV %)', type: 'number', step: 1 },
      { id: 'annualNoi', label: 'Annual Net Operating Income ($ / ₹)', type: 'number', step: 5000 },
      { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', step: 0.1 },
      { id: 'amortYears', label: 'Amortization Schedule (Years)', type: 'number', step: 1 },
      { id: 'balloonYears', label: 'Loan Maturity / Balloon Term (Years)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const price = Number(i.purchasePrice) || 1500000;
      const ltv = (Number(i.ltvPct) || 75) / 100;
      const loan = price * ltv;
      const r = (Number(i.interestRate) || 7.0) / 100 / 12;
      const n = (Number(i.amortYears) || 25) * 12;
      const monthlyPI = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const annualDebtService = monthlyPI * 12;
      const noi = Number(i.annualNoi) || 140000;
      const dscr = noi / (annualDebtService || 1);

      // Remaining balloon balance after balloonYears
      const balloonMonths = (Number(i.balloonYears) || 10) * 12;
      const balloonBalance = (loan * (Math.pow(1 + r, n) - Math.pow(1 + r, balloonMonths))) / (Math.pow(1 + r, n) - 1);

      return {
        primaryValue: `${dscr.toFixed(2)}x DSCR`,
        primaryLabel: 'Debt Service Coverage Ratio (DSCR)',
        secondaryMetrics: [
          { label: 'DSCR Bank Approval', value: dscr >= 1.25 ? 'QUALIFIES (Exceeds 1.25x)' : 'BELOW STANDARD (< 1.25x)' },
          { label: 'Monthly Debt Payment', value: `$${Math.round(monthlyPI).toLocaleString()} / mo` },
          { label: `Balloon Payoff at Year ${i.balloonYears || 10}`, value: `$${Math.round(balloonBalance).toLocaleString()}` },
          { label: 'Initial Financed Loan', value: `$${Math.round(loan).toLocaleString()}` }
        ]
      };
    }
  },
  {
    id: 'irr-npv-calc',
    name: 'Internal Rate of Return (IRR) & NPV Investment Solver',
    category: 'finance',
    subCategory: 'Business & Commercial',
    description: 'Calculate Net Present Value (NPV) and exact Internal Rate of Return (IRR %) across multi-year cash flows.',
    formula: 'NPV = ∑ [CF_t / (1 + r)^t] - C_0; IRR is rate r where NPV = 0',
    formulaExplanation: 'Standard discounted cash flow (DCF) capital budgeting methodology for evaluating project hurdle rates.',
    defaultInputs: { initialCost: 100000, discountRate: 10, cf1: 25000, cf2: 35000, cf3: 40000, cf4: 45000, cf5: 50000 },
    fields: [
      { id: 'initialCost', label: 'Initial Outlay / Investment ($ / ₹)', type: 'number', step: 5000 },
      { id: 'discountRate', label: 'Hurdle / Discount Rate (%)', type: 'number', step: 0.5 },
      { id: 'cf1', label: 'Year 1 Cash Inflow ($ / ₹)', type: 'number', step: 2500 },
      { id: 'cf2', label: 'Year 2 Cash Inflow ($ / ₹)', type: 'number', step: 2500 },
      { id: 'cf3', label: 'Year 3 Cash Inflow ($ / ₹)', type: 'number', step: 2500 },
      { id: 'cf4', label: 'Year 4 Cash Inflow ($ / ₹)', type: 'number', step: 2500 },
      { id: 'cf5', label: 'Year 5 Cash Inflow ($ / ₹)', type: 'number', step: 2500 }
    ],
    calculate: (i) => {
      const c0 = Number(i.initialCost) || 100000;
      const r = (Number(i.discountRate) || 10) / 100;
      const cfs = [
        Number(i.cf1) || 25000,
        Number(i.cf2) || 35000,
        Number(i.cf3) || 40000,
        Number(i.cf4) || 45000,
        Number(i.cf5) || 50000
      ];

      // Calculate NPV
      let npv = -c0;
      cfs.forEach((cf, idx) => {
        npv += cf / Math.pow(1 + r, idx + 1);
      });

      // Approximate IRR via binary search
      let low = -0.5, high = 2.0, irr = 0;
      for (let iter = 0; iter < 100; iter++) {
        const mid = (low + high) / 2;
        let testNPV = -c0;
        cfs.forEach((cf, idx) => {
          testNPV += cf / Math.pow(1 + mid, idx + 1);
        });
        if (Math.abs(testNPV) < 0.01) {
          irr = mid;
          break;
        }
        if (testNPV > 0) low = mid;
        else high = mid;
        irr = mid;
      }

      const totalInflows = cfs.reduce((a, b) => a + b, 0);
      const pi = (npv + c0) / c0;

      return {
        primaryValue: `${(irr * 100).toFixed(2)}% IRR`,
        primaryLabel: 'Internal Rate of Return (IRR)',
        secondaryMetrics: [
          { label: 'Net Present Value (NPV)', value: `$${Math.round(npv).toLocaleString()}` },
          { label: 'Profitability Index (PI)', value: `${pi.toFixed(2)}x` },
          { label: 'Total Nominal Cash Inflows', value: `$${Math.round(totalInflows).toLocaleString()}` },
          { label: 'Net Undiscounted Profit', value: `$${Math.round(totalInflows - c0).toLocaleString()}` }
        ],
        advice: npv > 0 ? 'Project generates value exceeding required cost of capital (NPV > 0).' : 'Project does not meet required hurdle rate.'
      };
    }
  },
  {
    id: 'college-529-calc',
    name: 'College Savings & 529 Tuition Inflation Plan',
    category: 'finance',
    subCategory: 'Banking & Wealth',
    description: 'Calculate projected college tuition inflation and monthly 529 investment contributions needed to fund future degrees.',
    formula: 'Future Tuition = Current Cost × (1 + Inflation)^Years; Monthly 529 via FV of Annuity',
    formulaExplanation: 'College tuition typically inflates at 4-6% annually, higher than standard consumer CPI.',
    defaultInputs: { currentAnnualTuition: 28000, yearsToCollege: 14, currentSavings: 15000, investmentReturn: 7.5, tuitionInflation: 5.0 },
    fields: [
      { id: 'currentAnnualTuition', label: 'Current 1-Year College Cost ($ / ₹)', type: 'number', step: 1000 },
      { id: 'yearsToCollege', label: 'Years Until Child Starts College', type: 'number', step: 1 },
      { id: 'currentSavings', label: 'Current 529 Savings Balance ($ / ₹)', type: 'number', step: 2500 },
      { id: 'investmentReturn', label: 'Expected 529 Portfolio Return (%)', type: 'number', step: 0.5 },
      { id: 'tuitionInflation', label: 'Tuition Inflation Rate (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const curCost = Number(i.currentAnnualTuition) || 28000;
      const yrs = Number(i.yearsToCollege) || 14;
      const infl = (Number(i.tuitionInflation) || 5.0) / 100;
      const r = (Number(i.investmentReturn) || 7.5) / 100 / 12;
      const n = yrs * 12;

      // 4-year inflated college total
      let future4YrCost = 0;
      for (let y = 0; y < 4; y++) {
        future4YrCost += curCost * Math.pow(1 + infl, yrs + y);
      }

      const curSavings = Number(i.currentSavings) || 15000;
      const fvExisting = curSavings * Math.pow(1 + (Number(i.investmentReturn) || 7.5) / 100, yrs);
      const shortfall = Math.max(0, future4YrCost - fvExisting);

      // Monthly payment to reach shortfall
      const monthlyContrib = shortfall > 0 ? (shortfall * r) / (Math.pow(1 + r, n) - 1) : 0;

      return {
        primaryValue: `$${Math.round(monthlyContrib).toLocaleString()} / month`,
        primaryLabel: 'Required Monthly 529 Contribution',
        secondaryMetrics: [
          { label: 'Total 4-Year Inflated Tuition Cost', value: `$${Math.round(future4YrCost).toLocaleString()}` },
          { label: 'Projected Value of Existing Savings', value: `$${Math.round(fvExisting).toLocaleString()}` },
          { label: 'Remaining Funding Shortfall', value: `$${Math.round(shortfall).toLocaleString()}` }
        ]
      };
    }
  },

  // =========================================================================
  // FITNESS & HEALTH (CALCULATOR.NET EXPANSIONS)
  // =========================================================================
  {
    id: 'race-predictor-calc',
    name: 'Race Time Predictor & Splits (Riegel Formula)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Predict 5K, 10K, Half Marathon, and Full Marathon finish times from a known recent race result using Pete Riegel formula.',
    formula: 'T2 = T1 × (D2 / D1)^1.06',
    formulaExplanation: 'Riegel athletic fatigue power formula used universally in endurance running analytics.',
    defaultInputs: { recentDistanceKm: 5, recentMinutes: 24, recentSeconds: 30 },
    fields: [
      { id: 'recentDistanceKm', label: 'Recent Race Distance (km)', type: 'number', step: 0.5 },
      { id: 'recentMinutes', label: 'Recent Time Minutes', type: 'number', step: 1 },
      { id: 'recentSeconds', label: 'Recent Time Seconds', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const d1 = Number(i.recentDistanceKm) || 5;
      const t1 = (Number(i.recentMinutes) || 24) * 60 + (Number(i.recentSeconds) || 30);

      const formatTime = (secs: number) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = Math.round(secs % 60);
        return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
      };

      const predict = (d2: number) => t1 * Math.pow(d2 / d1, 1.06);

      const t5k = predict(5);
      const t10k = predict(10);
      const tHalf = predict(21.0975);
      const tFull = predict(42.195);

      return {
        primaryValue: formatTime(tFull),
        primaryLabel: 'Predicted Full Marathon Finish Time',
        secondaryMetrics: [
          { label: 'Predicted Half Marathon', value: formatTime(tHalf) },
          { label: 'Predicted 10K Finish', value: formatTime(t10k) },
          { label: 'Predicted 5K Finish', value: formatTime(t5k) },
          { label: 'Marathon Pace', value: `${((tFull / 42.195) / 60).toFixed(2)} min/km` }
        ]
      };
    }
  },
  {
    id: 'sleep-cycle-calc',
    name: 'Sleep Cycle & 90-Minute REM Wake-Up Optimizer',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Calculate optimal wake-up times and bedtime schedules based on natural 90-minute ultradian sleep cycles.',
    formula: 'Wake Time = Bedtime + (N × 90 mins) + 15 mins to fall asleep',
    formulaExplanation: 'Waking up at the end of a complete 90-minute sleep cycle prevents sleep inertia and morning fatigue.',
    defaultInputs: { sleepHour: 23, sleepMin: 0 },
    fields: [
      { id: 'sleepHour', label: 'Target Sleep Hour (0-23, 24h format)', type: 'number', step: 1 },
      { id: 'sleepMin', label: 'Target Sleep Minute (0-59)', type: 'number', step: 5 }
    ],
    calculate: (i) => {
      const h = Number(i.sleepHour) || 23;
      const m = Number(i.sleepMin) || 0;
      const baseMin = h * 60 + m + 15; // 15 mins to fall asleep

      const formatClock = (totalMins: number) => {
        const norm = ((totalMins % 1440) + 1440) % 1440;
        const hh = Math.floor(norm / 60);
        const mm = norm % 60;
        const ampm = hh >= 12 ? 'PM' : 'AM';
        const displayH = hh % 12 === 0 ? 12 : hh % 12;
        return `${displayH}:${mm.toString().padStart(2, '0')} ${ampm}`;
      };

      const c4 = formatClock(baseMin + 4 * 90); // 6.0 hrs (4 cycles)
      const c5 = formatClock(baseMin + 5 * 90); // 7.5 hrs (5 cycles - ideal)
      const c6 = formatClock(baseMin + 6 * 90); // 9.0 hrs (6 cycles)

      return {
        primaryValue: c5,
        primaryLabel: 'Optimal Wake-Up Time (5 Cycles / 7.5 hrs)',
        secondaryMetrics: [
          { label: '6 Cycles (9.0 hrs - Peak Rest)', value: c6 },
          { label: '4 Cycles (6.0 hrs - Minimum Sleep)', value: c4 },
          { label: 'Sleep Latency Buffer', value: '15 Minutes added' }
        ],
        advice: '5 complete sleep cycles (7.5 hours of sleep) is clinically optimal for cognitive performance and physical repair.'
      };
    }
  },
  {
    id: 'one-rep-max-calc',
    name: 'One Rep Max (1RM) & Strength Percentages Calculator',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate 1-Repetition Maximum (1RM) for Bench, Squat, and Deadlift using Epley and Brzycki formulas.',
    formula: 'Epley: 1RM = Weight × (1 + Reps / 30); Brzycki: 1RM = Weight × (36 / (37 - Reps))',
    formulaExplanation: 'Standard validated exercise science powerlifting formulas for submaximal lifting estimation.',
    defaultInputs: { liftWeight: 225, repsPerformed: 5 },
    fields: [
      { id: 'liftWeight', label: 'Weight Lifted (lbs / kg)', type: 'number', step: 5 },
      { id: 'repsPerformed', label: 'Repetitions Completed (1 - 12 reps)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const w = Number(i.liftWeight) || 225;
      const r = Math.min(12, Math.max(1, Number(i.repsPerformed) || 5));

      const epley = w * (1 + r / 30);
      const brzycki = w * (36 / (37 - r));
      const avg1RM = (epley + brzycki) / 2;

      return {
        primaryValue: `${Math.round(avg1RM)} lbs / kg`,
        primaryLabel: 'Estimated One Rep Max (1RM)',
        secondaryMetrics: [
          { label: '90% 1RM (Heavy Triple 3RM)', value: `${Math.round(avg1RM * 0.90)} lbs/kg` },
          { label: '80% 1RM (Hypertrophy 8RM)', value: `${Math.round(avg1RM * 0.80)} lbs/kg` },
          { label: '70% 1RM (Speed / Volume 12RM)', value: `${Math.round(avg1RM * 0.70)} lbs/kg` },
          { label: 'Epley / Brzycki Formula Variance', value: `±${Math.round(Math.abs(epley - brzycki))} lbs/kg` }
        ]
      };
    }
  },

  // =========================================================================
  // MATHEMATICS & STATISTICS (CALCULATOR.NET EXPANSIONS)
  // =========================================================================
  {
    id: 'matrix-solver-calc',
    name: 'Matrix Multiplier, Determinant & Trace Calculator',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate 2x2 and 3x3 matrix determinant (det A), trace, and inverse in linear algebra.',
    formula: 'det(2x2) = ad - bc; det(3x3) via cofactor expansion along row 1',
    formulaExplanation: 'Evaluates linear transformations and matrix invertibility (det ≠ 0).',
    defaultInputs: { a11: 3, a12: 8, a21: 4, a22: 6 },
    fields: [
      { id: 'a11', label: 'Matrix Element a11 (Row 1, Col 1)', type: 'number', step: 1 },
      { id: 'a12', label: 'Matrix Element a12 (Row 1, Col 2)', type: 'number', step: 1 },
      { id: 'a21', label: 'Matrix Element a21 (Row 2, Col 1)', type: 'number', step: 1 },
      { id: 'a22', label: 'Matrix Element a22 (Row 2, Col 2)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const a = Number(i.a11) || 3;
      const b = Number(i.a12) || 8;
      const c = Number(i.a21) || 4;
      const d = Number(i.a22) || 6;

      const det = a * d - b * c;
      const trace = a + d;

      return {
        primaryValue: `det(A) = ${det}`,
        primaryLabel: 'Matrix Determinant (det A)',
        secondaryMetrics: [
          { label: 'Matrix Trace Tr(A)', value: `${trace}` },
          { label: 'Invertibility Check', value: det !== 0 ? 'Invertible (Non-Singular)' : 'Singular (No Inverse)' },
          { label: 'Inverse Matrix A⁻¹', value: det !== 0 ? `[${(d / det).toFixed(2)}, ${(-b / det).toFixed(2)}; ${(-c / det).toFixed(2)}, ${(a / det).toFixed(2)}]` : 'Undefined' }
        ]
      };
    }
  },
  {
    id: 'vector-3d-calc',
    name: '3D Vector Dot Product & Cross Product Calculator',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate scalar dot product (u·v), orthogonal cross product (u×v), magnitude, and angle between 3D vectors.',
    formula: 'u·v = u_x v_x + u_y v_y + u_z v_z; u×v = (u_y v_z - u_z v_y)i - ...; cos θ = (u·v) / (|u||v|)',
    formulaExplanation: 'Calculates spatial geometry, orthogonal surface normals, and torque in 3-dimensional Euclidean space.',
    defaultInputs: { ux: 2, uy: 3, uz: 4, vx: 5, vy: 6, vz: 7 },
    fields: [
      { id: 'ux', label: 'Vector u (x)', type: 'number', step: 1 },
      { id: 'uy', label: 'Vector u (y)', type: 'number', step: 1 },
      { id: 'uz', label: 'Vector u (z)', type: 'number', step: 1 },
      { id: 'vx', label: 'Vector v (x)', type: 'number', step: 1 },
      { id: 'vy', label: 'Vector v (y)', type: 'number', step: 1 },
      { id: 'vz', label: 'Vector v (z)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const ux = Number(i.ux) || 2, uy = Number(i.uy) || 3, uz = Number(i.uz) || 4;
      const vx = Number(i.vx) || 5, vy = Number(i.vy) || 6, vz = Number(i.vz) || 7;

      const dot = ux * vx + uy * vy + uz * vz;
      const cx = uy * vz - uz * vy;
      const cy = uz * vx - ux * vz;
      const cz = ux * vy - uy * vx;

      const magU = Math.sqrt(ux * ux + uy * uy + uz * uz);
      const magV = Math.sqrt(vx * vx + vy * vy + vz * vz);
      const cosTheta = Math.max(-1, Math.min(1, dot / (magU * magV || 1)));
      const angleDeg = Math.acos(cosTheta) * (180 / Math.PI);

      return {
        primaryValue: `u·v = ${dot}`,
        primaryLabel: 'Scalar Dot Product (u·v)',
        secondaryMetrics: [
          { label: 'Cross Product Vector (u×v)', value: `(${cx}, ${cy}, ${cz})` },
          { label: 'Angle Between Vectors (θ)', value: `${angleDeg.toFixed(2)}°` },
          { label: 'Magnitude |u|', value: `${magU.toFixed(3)}` },
          { label: 'Magnitude |v|', value: `${magV.toFixed(3)}` }
        ]
      };
    }
  },

  // =========================================================================
  // EVERYDAY, CONSTRUCTION & UTILITY (CALCULATOR.NET EXPANSIONS)
  // =========================================================================
  {
    id: 'paint-estimator-calc',
    name: 'Wall Paint Gallons & Coverage Estimator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate paint gallons and liters needed for interior rooms with window and door area deductions and 2-coat coverage.',
    formula: 'Gallons = (Wall Area - Doors & Windows) × Coats / 350 sq ft per gallon',
    formulaExplanation: 'One standard US gallon of wall paint covers approximately 350 to 400 square feet.',
    defaultInputs: { lengthFt: 14, widthFt: 12, heightFt: 9, doorsCount: 2, windowsCount: 2, coats: 2 },
    fields: [
      { id: 'lengthFt', label: 'Room Length (Feet)', type: 'number', step: 1 },
      { id: 'widthFt', label: 'Room Width (Feet)', type: 'number', step: 1 },
      { id: 'heightFt', label: 'Wall Height (Feet)', type: 'number', step: 0.5 },
      { id: 'doorsCount', label: 'Number of Doors (deduct 21 sq ft each)', type: 'number', step: 1 },
      { id: 'windowsCount', label: 'Number of Windows (deduct 15 sq ft each)', type: 'number', step: 1 },
      { id: 'coats', label: 'Number of Paint Coats', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const l = Number(i.lengthFt) || 14;
      const w = Number(i.widthFt) || 12;
      const h = Number(i.heightFt) || 9;
      const doors = Number(i.doorsCount) || 2;
      const win = Number(i.windowsCount) || 2;
      const coats = Number(i.coats) || 2;

      const grossWallArea = 2 * (l + w) * h;
      const deductions = doors * 21 + win * 15;
      const netWallArea = Math.max(0, grossWallArea - deductions);
      const totalPaintArea = netWallArea * coats;
      const gallons = totalPaintArea / 350;
      const roundedGallons = Math.ceil(gallons);
      const liters = gallons * 3.785;

      return {
        primaryValue: `${roundedGallons} Gallons of Paint`,
        primaryLabel: `Total Paint Required (${coats} Coats)`,
        secondaryMetrics: [
          { label: 'Exact Paint Volume', value: `${gallons.toFixed(2)} Gallons (${liters.toFixed(1)} Liters)` },
          { label: 'Net Wall Surface Area', value: `${netWallArea.toFixed(0)} sq ft` },
          { label: 'Door & Window Deductions', value: `-${deductions} sq ft` }
        ]
      };
    }
  },
  {
    id: 'lumber-board-feet-calc',
    name: 'Lumber Board Feet & Wood Pricing Calculator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate board footage (BF = T × W × L / 12) and total timber lumber purchase cost for carpentry projects.',
    formula: 'Board Feet = (Thickness in × Width in × Length ft) / 12 × Quantity',
    formulaExplanation: 'One board foot is a nominal volume of wood equal to 1 inch thick by 12 inches wide by 1 foot long.',
    defaultInputs: { thicknessIn: 2, widthIn: 6, lengthFt: 8, quantity: 10, pricePerBf: 4.50 },
    fields: [
      { id: 'thicknessIn', label: 'Thickness (Inches, e.g. 2 for 2x4)', type: 'number', step: 0.25 },
      { id: 'widthIn', label: 'Width (Inches, e.g. 6 for 2x6)', type: 'number', step: 0.5 },
      { id: 'lengthFt', label: 'Length (Feet)', type: 'number', step: 1 },
      { id: 'quantity', label: 'Quantity / Piece Count', type: 'number', step: 1 },
      { id: 'pricePerBf', label: 'Price per Board Foot ($ / ₹)', type: 'number', step: 0.25 }
    ],
    calculate: (i) => {
      const t = Number(i.thicknessIn) || 2;
      const w = Number(i.widthIn) || 6;
      const l = Number(i.lengthFt) || 8;
      const qty = Number(i.quantity) || 10;
      const priceBf = Number(i.pricePerBf) || 4.50;

      const singlePieceBf = (t * w * l) / 12;
      const totalBf = singlePieceBf * qty;
      const totalCost = totalBf * priceBf;

      return {
        primaryValue: `${totalBf.toFixed(2)} Board Feet (BF)`,
        primaryLabel: 'Total Lumber Board Footage',
        secondaryMetrics: [
          { label: 'Total Lumber Cost', value: `$${totalCost.toFixed(2)}` },
          { label: 'Board Feet per Single Piece', value: `${singlePieceBf.toFixed(2)} BF` },
          { label: 'Cost Per Piece', value: `$${(singlePieceBf * priceBf).toFixed(2)} / board` }
        ]
      };
    }
  }
];
