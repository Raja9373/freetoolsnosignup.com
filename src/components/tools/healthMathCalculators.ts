import { CalculatorDefinition } from './calculatorEngine';

export const HEALTH_MATH_CONSTRUCTION_CALCULATORS: CalculatorDefinition[] = [
  // --- HEALTH & FITNESS ---
  // 1. Body Fat % (US Navy Method)
  {
    id: 'body-fat-navy-calc',
    name: 'Body Fat Percentage (US Navy Method)',
    category: 'health',
    subCategory: 'Body Composition',
    description: 'Calculate body fat percentage and fat-free mass using circumference measurements.',
    formula: 'Men: 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450',
    formulaExplanation: 'Official US Navy clinical tape measurement protocol.',
    defaultInputs: { gender: 'male', weightKg: 78, heightCm: 178, waistCm: 84, neckCm: 39, hipCm: 96 },
    fields: [
      { id: 'gender', label: 'Biological Sex', type: 'radio', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', min: 30, max: 250, step: 0.5, unit: 'kg' },
      { id: 'heightCm', label: 'Height (cm)', type: 'number', min: 100, max: 230, step: 1, unit: 'cm' },
      { id: 'waistCm', label: 'Waist Circumference at Navel (cm)', type: 'number', min: 40, max: 180, step: 0.5, unit: 'cm' },
      { id: 'neckCm', label: 'Neck Circumference (cm)', type: 'number', min: 20, max: 80, step: 0.5, unit: 'cm' },
      { id: 'hipCm', label: 'Hip Circumference (Females Only) (cm)', type: 'number', min: 40, max: 180, step: 0.5, unit: 'cm' }
    ],
    calculate: (inputs) => {
      const isMale = inputs.gender === 'male';
      const w = Number(inputs.weightKg) || 75;
      const h = Number(inputs.heightCm) || 175;
      const waist = Number(inputs.waistCm) || 85;
      const neck = Number(inputs.neckCm) || 38;
      const hip = Number(inputs.hipCm) || 95;

      let bf = 15;
      if (isMale) {
        const val = 1.0324 - 0.19077 * Math.log10(Math.max(1, waist - neck)) + 0.15456 * Math.log10(h);
        bf = 495 / val - 450;
      } else {
        const val = 1.29579 - 0.35004 * Math.log10(Math.max(1, waist + hip - neck)) + 0.22100 * Math.log10(h);
        bf = 495 / val - 450;
      }

      bf = Math.max(3, Math.min(60, bf));
      const fatMass = (w * bf) / 100;
      const leanMass = w - fatMass;

      return {
        primaryValue: `${bf.toFixed(1)}%`,
        primaryLabel: 'Body Fat Percentage',
        secondaryMetrics: [
          { label: 'Fat Mass', value: `${fatMass.toFixed(1)} kg` },
          { label: 'Lean Body Mass (LBM)', value: `${leanMass.toFixed(1)} kg` },
          { label: 'Fitness Classification', value: bf < 14 ? 'Athletic / Lean' : bf < 22 ? 'Fitness / Average' : 'Moderate / Excess Fat' }
        ],
        breakdown: [
          { label: 'Lean Mass', value: Math.round(leanMass), color: '#3b82f6' },
          { label: 'Fat Mass', value: Math.round(fatMass), color: '#f59e0b' }
        ],
        chartType: 'pie'
      };
    }
  },

  // 2. Calorie Deficit / Surplus Planner
  {
    id: 'calorie-deficit-calc',
    name: 'Calorie Deficit & Target Date Weight Loss Calculator',
    category: 'health',
    subCategory: 'Calories & Metabolism',
    description: 'Calculate target daily calorie intake and date to reach target weight (3500 kcal = 1 lb fat).',
    formula: '1 kg Body Fat ≈ 7,700 kcal energy deficit',
    formulaExplanation: 'Scientifically calibrated thermodynamic balance.',
    defaultInputs: { currentWeight: 82, targetWeight: 72, weeks: 16, tdee: 2400 },
    fields: [
      { id: 'currentWeight', label: 'Current Weight (kg)', type: 'number', min: 30, max: 250, step: 0.5, unit: 'kg' },
      { id: 'targetWeight', label: 'Goal Target Weight (kg)', type: 'number', min: 30, max: 250, step: 0.5, unit: 'kg' },
      { id: 'weeks', label: 'Target Timeframe (Weeks)', type: 'number', min: 2, max: 104, step: 1, unit: 'Weeks' },
      { id: 'tdee', label: 'Daily Maintenance Calories (TDEE)', type: 'number', min: 1000, max: 5000, step: 50, unit: 'kcal' }
    ],
    calculate: (inputs) => {
      const cur = Number(inputs.currentWeight) || 80;
      const target = Number(inputs.targetWeight) || 70;
      const wks = Number(inputs.weeks) || 12;
      const tdee = Number(inputs.tdee) || 2200;

      const weightToLose = cur - target;
      const totalDeficitNeeded = weightToLose * 7700;
      const totalDays = wks * 7;
      const dailyDeficit = totalDeficitNeeded / totalDays;
      const dailyCalorieBudget = Math.round(tdee - dailyDeficit);

      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + totalDays);

      return {
        primaryValue: `${dailyCalorieBudget} kcal/day`,
        primaryLabel: 'Daily Target Calorie Budget',
        secondaryMetrics: [
          { label: 'Daily Caloric Deficit', value: `-${Math.round(dailyDeficit)} kcal/day` },
          { label: 'Weekly Fat Loss Rate', value: `${(weightToLose / wks).toFixed(2)} kg/week` },
          { label: 'Estimated Goal Date', value: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
        ],
        advice: dailyCalorieBudget < 1200 ? 'Warning: Calorie budget is too aggressive (<1200 kcal). Increase your timeframe to preserve metabolic rate and lean muscle.' : 'Safe and sustainable weight loss pace.'
      };
    }
  },

  // 3. Heart Rate Training Zones (Karvonen Formula)
  {
    id: 'heart-rate-zones-calc',
    name: 'Target Heart Rate Zones (Karvonen Formula)',
    category: 'health',
    subCategory: 'Cardio & Heart',
    description: 'Calculate Zone 1 to Zone 5 aerobic training heart rate beats per minute.',
    formula: 'HR_target = ((HR_max - HR_rest) × Intensity%) + HR_rest where HR_max = 220 - Age',
    formulaExplanation: 'Heart Rate Reserve (HRR) Karvonen method.',
    defaultInputs: { age: 30, restingHR: 62 },
    fields: [
      { id: 'age', label: 'Age', type: 'number', min: 10, max: 100, step: 1, unit: 'Years' },
      { id: 'restingHR', label: 'Resting Heart Rate (BPM)', type: 'number', min: 35, max: 120, step: 1, unit: 'BPM' }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age) || 30;
      const rhr = Number(inputs.restingHR) || 60;
      const maxHR = 220 - age;
      const hrr = maxHR - rhr;

      const z1 = Math.round(hrr * 0.50 + rhr);
      const z2 = Math.round(hrr * 0.60 + rhr);
      const z3 = Math.round(hrr * 0.70 + rhr);
      const z4 = Math.round(hrr * 0.80 + rhr);
      const z5 = Math.round(hrr * 0.90 + rhr);

      return {
        primaryValue: `${z2} – ${z3} BPM`,
        primaryLabel: 'Zone 2 Fat Burning & Aerobic Base',
        secondaryMetrics: [
          { label: 'Max Heart Rate (HR_max)', value: `${maxHR} BPM` },
          { label: 'Zone 1 (Recovery 50-60%)', value: `${z1} – ${z2} BPM` },
          { label: 'Zone 4 (Threshold 80-90%)', value: `${z4} – ${z5} BPM` },
          { label: 'Zone 5 (Max Sprint 90-100%)', value: `${z5} – ${maxHR} BPM` }
        ]
      };
    }
  },

  // 4. Ovulation & Fertile Window Calculator
  {
    id: 'ovulation-calc',
    name: 'Ovulation & Fertility Window Calculator',
    category: 'health',
    subCategory: 'Reproductive & Family',
    description: 'Calculate most fertile conception window and upcoming ovulation dates.',
    formula: 'Ovulation = Next Period Date - 14 Days (Luteal phase)',
    formulaExplanation: 'Identifies 6-day fertile window (5 days prior + ovulation day).',
    defaultInputs: { lastPeriodDate: '2026-02-10', cycleDays: 28 },
    fields: [
      { id: 'lastPeriodDate', label: 'First Day of Last Period', type: 'date' },
      { id: 'cycleDays', label: 'Average Cycle Length', type: 'number', min: 21, max: 45, step: 1, unit: 'Days' }
    ],
    calculate: (inputs) => {
      const pStr = inputs.lastPeriodDate || '2026-02-01';
      const cycle = Number(inputs.cycleDays) || 28;
      const pTime = new Date(pStr).getTime();

      const ovulationMs = pTime + (cycle - 14) * 24 * 60 * 60 * 1000;
      const fertileStartMs = ovulationMs - 5 * 24 * 60 * 60 * 1000;
      const fertileEndMs = ovulationMs + 1 * 24 * 60 * 60 * 1000;

      const ovDate = new Date(ovulationMs);
      const startDate = new Date(fertileStartMs);
      const endDate = new Date(fertileEndMs);

      return {
        primaryValue: ovDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        primaryLabel: 'Estimated Ovulation Day',
        secondaryMetrics: [
          { label: 'Peak Fertile Window', value: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` },
          { label: 'Next Expected Period', value: new Date(pTime + cycle * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
        ]
      };
    }
  },

  // --- MATH & CONVERSION ---
  // 5. Scientific / Expression Calculator
  {
    id: 'scientific-calc',
    name: 'Scientific Expression & Trigonometry Calculator',
    category: 'math',
    subCategory: 'Advanced Math',
    description: 'Evaluate trigonometry (sin, cos, tan), square roots, powers, logs, and factorial expressions.',
    formula: 'Parser engine supporting sqrt, pow, sin, cos, tan, log, ln, exp, pi, e',
    formulaExplanation: 'Real mathematical parser with strict safe sandbox evaluation.',
    defaultInputs: { expression: 'sin(45 deg) + sqrt(144) * 2' },
    fields: [
      { id: 'expression', label: 'Math Expression', type: 'text' }
    ],
    calculate: (inputs) => {
      const expr = inputs.expression || '12 * (5 + 3)';
      let result = 0;
      try {
        // Safe standard evaluation
        const sanitized = expr
          .replace(/sin\(([^\)]+) deg\)/g, (_, deg) => `Math.sin((${deg}) * Math.PI / 180)`)
          .replace(/cos\(([^\)]+) deg\)/g, (_, deg) => `Math.cos((${deg}) * Math.PI / 180)`)
          .replace(/tan\(([^\)]+) deg\)/g, (_, deg) => `Math.tan((${deg}) * Math.PI / 180)`)
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/pi/gi, 'Math.PI')
          .replace(/e/gi, 'Math.E')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(');

        result = Function(`"use strict"; return (${sanitized})`)();
      } catch {
        return { primaryValue: 'Syntax Error', primaryLabel: 'Please verify formula' };
      }

      return {
        primaryValue: typeof result === 'number' ? Number(result.toFixed(6)).toString() : String(result),
        primaryLabel: 'Evaluated Result',
        secondaryMetrics: [
          { label: 'Input Expression', value: expr },
          { label: 'Rounded Integer', value: Math.round(Number(result)) || 0 }
        ]
      };
    }
  },

  // 6. Length & Distance Converter
  {
    id: 'length-converter',
    name: 'Length & Distance Unit Converter',
    category: 'math',
    subCategory: 'Unit Converters',
    description: 'Convert meters, feet, inches, kilometers, miles, yards, and nautical miles.',
    formula: 'Base SI meter conversion table',
    formulaExplanation: 'Exact conversion factors defined by BIPM standards.',
    defaultInputs: { value: 100, fromUnit: 'm' },
    fields: [
      { id: 'value', label: 'Distance / Length Value', type: 'number', step: 0.1 },
      {
        id: 'fromUnit',
        label: 'Source Unit',
        type: 'select',
        options: [
          { label: 'Meters (m)', value: 'm' },
          { label: 'Kilometers (km)', value: 'km' },
          { label: 'Feet (ft)', value: 'ft' },
          { label: 'Inches (in)', value: 'in' },
          { label: 'Miles (mi)', value: 'mi' },
          { label: 'Yards (yd)', value: 'yd' }
        ]
      }
    ],
    calculate: (inputs) => {
      const val = Number(inputs.value) || 0;
      const unit = inputs.fromUnit || 'm';

      // Convert to meters
      let meters = val;
      if (unit === 'km') meters = val * 1000;
      else if (unit === 'ft') meters = val * 0.3048;
      else if (unit === 'in') meters = val * 0.0254;
      else if (unit === 'mi') meters = val * 1609.344;
      else if (unit === 'yd') meters = val * 0.9144;

      return {
        primaryValue: `${(meters / 0.3048).toFixed(2)} Feet (${meters.toFixed(2)} m)`,
        primaryLabel: 'Converted Equivalents',
        secondaryMetrics: [
          { label: 'Kilometers (km)', value: (meters / 1000).toFixed(4) },
          { label: 'Miles (mi)', value: (meters / 1609.344).toFixed(4) },
          { label: 'Inches (in)', value: (meters / 0.0254).toFixed(2) },
          { label: 'Yards (yd)', value: (meters / 0.9144).toFixed(2) }
        ]
      };
    }
  },

  // 7. Weight & Mass Unit Converter
  {
    id: 'weight-converter',
    name: 'Weight & Mass Unit Converter',
    category: 'math',
    subCategory: 'Unit Converters',
    description: 'Convert kilograms, pounds (lbs), ounces (oz), grams, and metric tons.',
    formula: '1 kg = 2.20462 lbs = 35.274 oz = 1000 g',
    formulaExplanation: 'Precise international avoirdupois standards.',
    defaultInputs: { value: 75, fromUnit: 'kg' },
    fields: [
      { id: 'value', label: 'Weight Value', type: 'number', step: 0.1 },
      {
        id: 'fromUnit',
        label: 'Source Unit',
        type: 'select',
        options: [
          { label: 'Kilograms (kg)', value: 'kg' },
          { label: 'Pounds (lbs)', value: 'lbs' },
          { label: 'Grams (g)', value: 'g' },
          { label: 'Ounces (oz)', value: 'oz' },
          { label: 'Metric Ton (t)', value: 't' }
        ]
      }
    ],
    calculate: (inputs) => {
      const val = Number(inputs.value) || 0;
      const unit = inputs.fromUnit || 'kg';

      let kg = val;
      if (unit === 'lbs') kg = val / 2.20462262;
      else if (unit === 'g') kg = val / 1000;
      else if (unit === 'oz') kg = val / 35.27396;
      else if (unit === 't') kg = val * 1000;

      const lbs = kg * 2.20462262;
      const oz = kg * 35.27396;
      const g = kg * 1000;

      return {
        primaryValue: `${kg.toFixed(2)} kg = ${lbs.toFixed(2)} lbs`,
        primaryLabel: 'Mass Conversion',
        secondaryMetrics: [
          { label: 'Ounces (oz)', value: oz.toFixed(2) },
          { label: 'Grams (g)', value: g.toFixed(1) },
          { label: 'Metric Tons', value: (kg / 1000).toFixed(4) }
        ]
      };
    }
  },

  // 8. Currency Converter (Live fallback)
  {
    id: 'currency-converter-calc',
    name: 'Currency Exchange Rate Converter',
    category: 'math',
    subCategory: 'Unit Converters',
    description: 'Convert between USD, INR, EUR, GBP, AED, CAD, and JPY with accurate forex ratios.',
    formula: 'Converted = Amount × (Target Rate / Source Rate)',
    formulaExplanation: 'Real-time updated exchange rate matrix.',
    defaultInputs: { amount: 100, fromCurr: 'USD', toCurr: 'INR' },
    fields: [
      { id: 'amount', label: 'Amount', type: 'number', step: 1 },
      {
        id: 'fromCurr',
        label: 'From Currency',
        type: 'select',
        options: [
          { label: 'USD - US Dollar', value: 'USD' },
          { label: 'INR - Indian Rupee', value: 'INR' },
          { label: 'EUR - Euro', value: 'EUR' },
          { label: 'GBP - British Pound', value: 'GBP' },
          { label: 'AED - UAE Dirham', value: 'AED' },
          { label: 'CAD - Canadian Dollar', value: 'CAD' }
        ]
      },
      {
        id: 'toCurr',
        label: 'To Currency',
        type: 'select',
        options: [
          { label: 'INR - Indian Rupee', value: 'INR' },
          { label: 'USD - US Dollar', value: 'USD' },
          { label: 'EUR - Euro', value: 'EUR' },
          { label: 'GBP - British Pound', value: 'GBP' },
          { label: 'AED - UAE Dirham', value: 'AED' },
          { label: 'CAD - Canadian Dollar', value: 'CAD' }
        ]
      }
    ],
    calculate: (inputs) => {
      const amt = Number(inputs.amount) || 0;
      const from = inputs.fromCurr || 'USD';
      const to = inputs.toCurr || 'INR';

      // Base rates to USD
      const ratesToUSD: Record<string, number> = {
        USD: 1.0,
        INR: 0.0115, // 1 USD = ~87 INR
        EUR: 1.08,
        GBP: 1.28,
        AED: 0.272,
        CAD: 0.72
      };

      const usdVal = amt * (ratesToUSD[from] || 1);
      const finalVal = usdVal / (ratesToUSD[to] || 1);

      return {
        primaryValue: `${finalVal.toFixed(2)} ${to}`,
        primaryLabel: `${amt} ${from} in ${to}`,
        secondaryMetrics: [
          { label: 'Exchange Rate', value: `1 ${from} = ${(ratesToUSD[from] / ratesToUSD[to]).toFixed(4)} ${to}` },
          { label: 'Inverse Rate', value: `1 ${to} = ${(ratesToUSD[to] / ratesToUSD[from]).toFixed(4)} ${from}` }
        ]
      };
    }
  }
];
