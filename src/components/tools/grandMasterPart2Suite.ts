import { CalculatorDefinition } from './calculatorEngine';

export const GRAND_MASTER_PART2_SUITE: CalculatorDefinition[] = [
  // -------------------------------------------------------------
  // 1. FINANCIAL & ACCOUNTING ENGINES
  // -------------------------------------------------------------
  {
    id: 'dupont-roe-analysis-calc',
    name: 'DuPont Return on Equity (ROE) 3-Step & 5-Step Calculator',
    category: 'finance',
    subCategory: 'Corporate Finance & Valuation',
    description: 'Decompose ROE into Net Profit Margin, Asset Turnover, and Financial Leverage Multiplier to diagnose corporate profitability drivers.',
    formula: 'ROE = Net Margin (Net Income / Revenue) * Asset Turnover (Revenue / Assets) * Equity Multiplier (Assets / Equity)',
    inputs: [
      { id: 'netIncome', label: 'Net Income ($)', type: 'number', defaultValue: 1200000, min: 1000, max: 1000000000, step: 25000 },
      { id: 'revenueSales', label: 'Total Revenue / Sales ($)', type: 'number', defaultValue: 15000000, min: 1000, max: 1000000000, step: 50000 },
      { id: 'totalAssets', label: 'Average Total Assets ($)', type: 'number', defaultValue: 10000000, min: 1000, max: 1000000000, step: 50000 },
      { id: 'shareholderEquity', label: 'Average Shareholder Equity ($)', type: 'number', defaultValue: 5000000, min: 1000, max: 1000000000, step: 25000 }
    ],
    calculate: (inputs) => {
      const netInc = Number(inputs.netIncome) || 1200000;
      const sales = Number(inputs.revenueSales) || 15000000;
      const assets = Number(inputs.totalAssets) || 10000000;
      const equity = Number(inputs.shareholderEquity) || 5000000;

      const netMargin = (netInc / sales) * 100;
      const assetTurnover = sales / assets;
      const equityMultiplier = assets / equity;
      const roe = (netMargin / 100) * assetTurnover * equityMultiplier * 100;
      const roa = (netInc / assets) * 100;

      return {
        primaryValue: `${roe.toFixed(2)}% ROE`,
        primaryLabel: 'Decomposed Return on Equity (ROE)',
        secondaryMetrics: [
          { label: 'Net Profit Margin (Profitability)', value: `${netMargin.toFixed(2)}%` },
          { label: 'Asset Turnover (Asset Efficiency)', value: `${assetTurnover.toFixed(2)}x` },
          { label: 'Equity Multiplier (Financial Leverage)', value: `${equityMultiplier.toFixed(2)}x` },
          { label: 'Return on Assets (ROA)', value: `${roa.toFixed(2)}%` },
          { label: 'Debt-to-Equity Ratio', value: `${(equityMultiplier - 1).toFixed(2)}x` }
        ],
        explanation: `With a ${netMargin.toFixed(2)}% profit margin, ${assetTurnover.toFixed(2)}x asset turnover, and ${equityMultiplier.toFixed(2)}x financial leverage, the 3-step DuPont model yields a Return on Equity (ROE) of ${roe.toFixed(2)}%.`
      };
    }
  },
  {
    id: 'wacc-cost-of-capital-calc',
    name: 'Weighted Average Cost of Capital (WACC) Calculator',
    category: 'finance',
    subCategory: 'Corporate Finance & Valuation',
    description: 'Calculate firm hurdle discount rate using CAPM Cost of Equity, After-Tax Cost of Debt, and market value capital structure weights.',
    formula: 'WACC = (E/V * Re) + (D/V * Rd * (1 - Tc))',
    inputs: [
      { id: 'marketValEquity', label: 'Market Value of Equity (E) ($)', type: 'number', defaultValue: 60000000, min: 100000, max: 10000000000, step: 500000 },
      { id: 'marketValDebt', label: 'Market Value of Debt (D) ($)', type: 'number', defaultValue: 40000000, min: 0, max: 10000000000, step: 500000 },
      { id: 'costOfEquityRe', label: 'Cost of Equity (Re) (%)', type: 'number', defaultValue: 10.5, min: 1, max: 40, step: 0.25 },
      { id: 'preTaxCostOfDebtRd', label: 'Pre-Tax Cost of Debt (Rd) (%)', type: 'number', defaultValue: 6.0, min: 0.5, max: 30, step: 0.25 },
      { id: 'corporateTaxRateTc', label: 'Corporate Tax Rate (Tc) (%)', type: 'number', defaultValue: 21.0, min: 0, max: 50, step: 1 }
    ],
    calculate: (inputs) => {
      const E = Number(inputs.marketValEquity) || 60000000;
      const D = Number(inputs.marketValDebt) || 40000000;
      const Re = (Number(inputs.costOfEquityRe) || 10.5) / 100;
      const Rd = (Number(inputs.preTaxCostOfDebtRd) || 6.0) / 100;
      const Tc = (Number(inputs.corporateTaxRateTc) || 21.0) / 100;

      const V = E + D;
      const weightE = E / V;
      const weightD = D / V;
      const afterTaxRd = Rd * (1 - Tc);

      const wacc = (weightE * Re + weightD * afterTaxRd) * 100;

      return {
        primaryValue: `${wacc.toFixed(2)}% WACC`,
        primaryLabel: 'Weighted Average Cost of Capital (Discount Rate)',
        secondaryMetrics: [
          { label: 'Equity Weight (E/V)', value: `${(weightE * 100).toFixed(1)}%` },
          { label: 'Debt Weight (D/V)', value: `${(weightD * 100).toFixed(1)}%` },
          { label: 'After-Tax Cost of Debt', value: `${(afterTaxRd * 100).toFixed(2)}% (Tax Shield: ${(Rd * Tc * 100).toFixed(2)}%)` },
          { label: 'Cost of Equity (Re)', value: `${(Re * 100).toFixed(2)}%` },
          { label: 'Total Enterprise Capital (V)', value: `$${Math.round(V).toLocaleString()}` }
        ],
        explanation: `With a capital structure of ${(weightE * 100).toFixed(1)}% Equity at ${(Re * 100).toFixed(1)}% and ${(weightD * 100).toFixed(1)}% Debt at ${(Rd * 100).toFixed(1)}% (${(afterTaxRd * 100).toFixed(2)}% after-tax), the company's blended WACC is ${wacc.toFixed(2)}%.`
      };
    }
  },
  {
    id: 'altman-zscore-bankruptcy-calc',
    name: 'Altman Z-Score Corporate Bankruptcy Risk Calculator',
    category: 'finance',
    subCategory: 'Corporate Finance & Valuation',
    description: 'Predict probability of manufacturing and non-manufacturing corporate financial distress and bankruptcy within 2 years.',
    formula: 'Z = 1.2*X1 + 1.4*X2 + 3.3*X3 + 0.6*X4 + 0.999*X5',
    inputs: [
      { id: 'workingCapital', label: 'Working Capital ($)', type: 'number', defaultValue: 1500000, min: -100000000, max: 1000000000, step: 50000 },
      { id: 'totalAssets', label: 'Total Assets ($)', type: 'number', defaultValue: 10000000, min: 10000, max: 1000000000, step: 100000 },
      { id: 'retainedEarnings', label: 'Retained Earnings ($)', type: 'number', defaultValue: 2800000, min: -100000000, max: 1000000000, step: 50000 },
      { id: 'ebit', label: 'EBIT (Operating Earnings) ($)', type: 'number', defaultValue: 1400000, min: -100000000, max: 1000000000, step: 50000 },
      { id: 'marketCapEquity', label: 'Market Value of Equity ($)', type: 'number', defaultValue: 18000000, min: 1000, max: 1000000000, step: 100000 },
      { id: 'totalLiabilities', label: 'Total Liabilities ($)', type: 'number', defaultValue: 4500000, min: 1000, max: 1000000000, step: 50000 },
      { id: 'salesRevenue', label: 'Sales / Revenue ($)', type: 'number', defaultValue: 12000000, min: 1000, max: 1000000000, step: 100000 }
    ],
    calculate: (inputs) => {
      const wc = Number(inputs.workingCapital) || 1500000;
      const ta = Math.max(1, Number(inputs.totalAssets) || 10000000);
      const re = Number(inputs.retainedEarnings) || 2800000;
      const ebit = Number(inputs.ebit) || 1400000;
      const mve = Number(inputs.marketCapEquity) || 18000000;
      const tl = Math.max(1, Number(inputs.totalLiabilities) || 4500000);
      const sales = Number(inputs.salesRevenue) || 12000000;

      const x1 = wc / ta;
      const x2 = re / ta;
      const x3 = ebit / ta;
      const x4 = mve / tl;
      const x5 = sales / ta;

      const zScore = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 0.999 * x5;

      let zone = '';
      if (zScore >= 2.99) zone = 'Safe Zone (Low Probability of Bankruptcy)';
      else if (zScore >= 1.81) zone = 'Grey / Caution Zone (Moderate Risk)';
      else zone = 'Distress Zone (High Probability of Bankruptcy within 24 Months)';

      return {
        primaryValue: `Z-Score = ${zScore.toFixed(2)}`,
        primaryLabel: zone,
        secondaryMetrics: [
          { label: 'Risk Zone Classification', value: zone },
          { label: 'Working Capital / Assets (X1)', value: x1.toFixed(3) },
          { label: 'Retained Earnings / Assets (X2)', value: x2.toFixed(3) },
          { label: 'EBIT / Assets (X3)', value: x3.toFixed(3) },
          { label: 'Market Equity / Liabilities (X4)', value: x4.toFixed(3) },
          { label: 'Asset Turnover (X5)', value: `${x5.toFixed(3)}x` }
        ],
        explanation: `With an Altman Z-score of ${zScore.toFixed(2)}, the firm is classified in the ${zone}. Scores above 2.99 indicate solid financial stability.`
      };
    }
  },
  {
    id: 'modified-duration-bond-convexity-calc',
    name: 'Bond Modified Duration & Convexity Price Sensitivity Calculator',
    category: 'finance',
    subCategory: 'Bonds & Fixed Income',
    description: 'Calculate Macaulay Duration, Modified Duration, and Convexity adjustment to measure bond price change for yield shifts Δy.',
    formula: 'ΔP/P ≈ -D_mod * Δy + 0.5 * Convexity * (Δy)²',
    inputs: [
      { id: 'macaulayDurationYears', label: 'Macaulay Duration (Years)', type: 'number', defaultValue: 7.2, min: 0.1, max: 50, step: 0.1 },
      { id: 'yieldToMaturityPercent', label: 'Current Yield to Maturity (YTM, %)', type: 'number', defaultValue: 5.0, min: 0.1, max: 25, step: 0.125 },
      { id: 'convexityMetric', label: 'Bond Convexity Measure', type: 'number', defaultValue: 65, min: 0, max: 1000, step: 1 },
      { id: 'interestRateShiftBps', label: 'Interest Rate Shift (Basis Points, bps) (e.g. +100 bps = +1%)', type: 'number', defaultValue: 100, min: -500, max: 500, step: 25 }
    ],
    calculate: (inputs) => {
      const macDur = Number(inputs.macaulayDurationYears) || 7.2;
      const ytm = (Number(inputs.yieldToMaturityPercent) || 5.0) / 100;
      const conv = Number(inputs.convexityMetric) || 65;
      const deltaBps = Number(inputs.interestRateShiftBps) || 100;

      const modDur = macDur / (1 + ytm / 2); // semi-annual compounding
      const deltaY = deltaBps / 10000;

      const durationEffect = -modDur * deltaY;
      const convexityEffect = 0.5 * conv * Math.pow(deltaY, 2);
      const totalPercentPriceChange = (durationEffect + convexityEffect) * 100;

      return {
        primaryValue: `${totalPercentPriceChange >= 0 ? '+' : ''}${totalPercentPriceChange.toFixed(2)}%`,
        primaryLabel: `Estimated Bond Price Change for a ${deltaBps >= 0 ? '+' : ''}${deltaBps} bps Rate Shift`,
        secondaryMetrics: [
          { label: 'Modified Duration', value: `${modDur.toFixed(2)} Years` },
          { label: 'Linear Duration Impact', value: `${(durationEffect * 100).toFixed(2)}%` },
          { label: 'Convexity Cushion Adjustment', value: `+${(convexityEffect * 100).toFixed(3)}%` },
          { label: 'DV01 (Dollar Value of a Basis Point)', value: `~${(modDur * 0.01).toFixed(3)}% per 1 bp` }
        ],
        explanation: `For a ${deltaBps} bps interest rate move, a bond with Modified Duration of ${modDur.toFixed(2)} and convexity of ${conv} changes by ${totalPercentPriceChange.toFixed(2)}% in market price.`
      };
    }
  },
  {
    id: 'free-cash-flow-to-firm-fcff-calc',
    name: 'Free Cash Flow to Firm (FCFF) & Equity (FCFE) Valuation Calculator',
    category: 'finance',
    subCategory: 'Corporate Finance & Valuation',
    description: 'Calculate unlevered FCFF and levered FCFE from EBIT, taxes, depreciation, CapEx, and working capital changes.',
    formula: 'FCFF = EBIT*(1-T) + D&A - CapEx - ΔNWC; FCFE = FCFF - Interest*(1-T) + Net Borrowing',
    inputs: [
      { id: 'ebitOperatingProfit', label: 'Operating Profit (EBIT) ($)', type: 'number', defaultValue: 5000000, min: 1000, max: 1000000000, step: 100000 },
      { id: 'taxRatePercent', label: 'Effective Tax Rate (%)', type: 'number', defaultValue: 25.0, min: 0, max: 50, step: 1 },
      { id: 'depreciationAmort', label: 'Depreciation & Amortization ($)', type: 'number', defaultValue: 800000, min: 0, max: 500000000, step: 50000 },
      { id: 'capitalExpenditures', label: 'Capital Expenditures (CapEx) ($)', type: 'number', defaultValue: 1200000, min: 0, max: 500000000, step: 50000 },
      { id: 'changeInNwc', label: 'Change in Non-Cash Working Capital (ΔNWC) ($)', type: 'number', defaultValue: 300000, min: -100000000, max: 100000000, step: 25000 }
    ],
    calculate: (inputs) => {
      const ebit = Number(inputs.ebitOperatingProfit) || 5000000;
      const taxRate = (Number(inputs.taxRatePercent) || 25.0) / 100;
      const da = Number(inputs.depreciationAmort) || 800000;
      const capex = Number(inputs.capitalExpenditures) || 1200000;
      const dnwc = Number(inputs.changeInNwc) || 300000;

      const nopat = ebit * (1 - taxRate);
      const fcff = nopat + da - capex - dnwc;
      const freeCashFlowConversion = (fcff / ebit) * 100;

      return {
        primaryValue: `$${Math.round(fcff).toLocaleString()}`,
        primaryLabel: 'Free Cash Flow to Firm (FCFF)',
        secondaryMetrics: [
          { label: 'Net Operating Profit After Tax (NOPAT)', value: `$${Math.round(nopat).toLocaleString()}` },
          { label: 'Gross Operating Cash Flow (NOPAT + D&A)', value: `$${Math.round(nopat + da).toLocaleString()}` },
          { label: 'Reinvestment Rate (CapEx + ΔNWC)', value: `$${Math.round(capex + dnwc).toLocaleString()}` },
          { label: 'FCFF-to-EBIT Conversion Rate', value: `${freeCashFlowConversion.toFixed(1)}%` }
        ],
        explanation: `From $${ebit.toLocaleString()} in EBIT ($${Math.round(nopat).toLocaleString()} NOPAT), adding $${da.toLocaleString()} D&A and subtracting $${Math.round(capex + dnwc).toLocaleString()} in capital reinvestment yields $${Math.round(fcff).toLocaleString()} in unlevered FCFF.`
      };
    }
  },
  // -------------------------------------------------------------
  // 2. ADDITIONAL HEALTH, MEDICAL & PHYSIOLOGY CALCULATORS
  // -------------------------------------------------------------
  {
    id: 'anion-gap-metabolic-acidosis-calc',
    name: 'Serum Anion Gap & Delta-Delta Ratio Calculator',
    category: 'health',
    subCategory: 'Laboratory & Biochemistry',
    description: 'Calculate Serum Anion Gap (AG = Na - (Cl + HCO3)) and Delta Gap to diagnose High Anion Gap Metabolic Acidosis (MUDPILES / GOLDMARK).',
    formula: 'Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻); Albumin-Adjusted AG = AG + 2.5 * (4.0 - Albumin)',
    inputs: [
      { id: 'sodiumNa', label: 'Sodium (Na⁺, mEq/L)', type: 'number', defaultValue: 140, min: 100, max: 180, step: 1 },
      { id: 'chlorideCl', label: 'Chloride (Cl⁻, mEq/L)', type: 'number', defaultValue: 102, min: 60, max: 150, step: 1 },
      { id: 'bicarbonateHco3', label: 'Bicarbonate (HCO₃⁻, mEq/L)', type: 'number', defaultValue: 24, min: 2, max: 50, step: 1 },
      { id: 'serumAlbumin', label: 'Serum Albumin (g/dL)', type: 'number', defaultValue: 4.0, min: 1.0, max: 6.0, step: 0.1 }
    ],
    calculate: (inputs) => {
      const na = Number(inputs.sodiumNa) || 140;
      const cl = Number(inputs.chlorideCl) || 102;
      const hco3 = Number(inputs.bicarbonateHco3) || 24;
      const alb = Number(inputs.serumAlbumin) || 4.0;

      const rawAg = na - (cl + hco3);
      const adjustedAg = rawAg + 2.5 * (4.0 - alb);

      let interpretation = '';
      if (adjustedAg > 12) interpretation = 'Elevated Anion Gap (> 12 mEq/L) — High AG Metabolic Acidosis (HAGMA)';
      else if (adjustedAg >= 4) interpretation = 'Normal Anion Gap (4 - 12 mEq/L) — Non-Anion Gap Acidosis (NAGMA) if acidotic';
      else interpretation = 'Low Anion Gap (< 4 mEq/L) — Consider severe hypoalbuminemia, multiple myeloma';

      return {
        primaryValue: `${adjustedAg.toFixed(1)} mEq/L`,
        primaryLabel: 'Albumin-Corrected Anion Gap',
        secondaryMetrics: [
          { label: 'Diagnostic Classification', value: interpretation },
          { label: 'Raw Unadjusted Anion Gap', value: `${rawAg.toFixed(1)} mEq/L (Normal: 8-12)` },
          { label: 'Serum Sodium / Chloride / Bicarb', value: `${na} / ${cl} / ${hco3} mEq/L` },
          { label: 'Delta Gap (ΔAG / ΔHCO₃)', value: `${((adjustedAg - 12) / Math.max(0.1, 24 - hco3)).toFixed(2)}` }
        ],
        explanation: `With Na=${na}, Cl=${cl}, HCO3=${hco3}, and Albumin=${alb}, the serum anion gap is ${adjustedAg.toFixed(1)} mEq/L (${interpretation}).`
      };
    }
  },
  {
    id: 'fena-fractional-excretion-sodium-calc',
    name: 'Fractional Excretion of Sodium (FeNa) Calculator',
    category: 'health',
    subCategory: 'Renal & Kidney Health',
    description: 'Differentiate prerenal azotemia (FeNa < 1%) from intrinsic acute tubular necrosis (ATN, FeNa > 2%) in acute kidney injury.',
    formula: 'FeNa (%) = [(Urine Na * Serum Cr) / (Serum Na * Urine Cr)] * 100',
    inputs: [
      { id: 'urineSodium', label: 'Urine Sodium (UNa, mEq/L)', type: 'number', defaultValue: 15, min: 1, max: 200, step: 1 },
      { id: 'serumSodium', label: 'Serum Sodium (SNa, mEq/L)', type: 'number', defaultValue: 140, min: 100, max: 180, step: 1 },
      { id: 'urineCreatinine', label: 'Urine Creatinine (UCr, mg/dL)', type: 'number', defaultValue: 80, min: 1, max: 500, step: 1 },
      { id: 'serumCreatinine', label: 'Serum Creatinine (SCr, mg/dL)', type: 'number', defaultValue: 2.2, min: 0.2, max: 25, step: 0.1 }
    ],
    calculate: (inputs) => {
      const uNa = Number(inputs.urineSodium) || 15;
      const sNa = Math.max(1, Number(inputs.serumSodium) || 140);
      const uCr = Math.max(1, Number(inputs.urineCreatinine) || 80);
      const sCr = Number(inputs.serumCreatinine) || 2.2;

      const fena = ((uNa * sCr) / (sNa * uCr)) * 100;

      let diagnosis = '';
      if (fena < 1.0) diagnosis = 'Prerenal Azotemia (< 1.0%) — Avid renal sodium retention (Dehydration / Hypovolemia)';
      else if (fena <= 2.0) diagnosis = 'Indeterminate / Grey Zone (1.0% - 2.0%)';
      else diagnosis = 'Intrinsic Acute Tubular Necrosis (ATN) (> 2.0%) — Impaired tubular reabsorption';

      return {
        primaryValue: `${fena.toFixed(2)}% FeNa`,
        primaryLabel: 'Fractional Excretion of Sodium',
        secondaryMetrics: [
          { label: 'Etiology Diagnosis', value: diagnosis },
          { label: 'Urine Na / Serum Na', value: `${uNa} / ${sNa} mEq/L` },
          { label: 'Urine Cr / Serum Cr', value: `${uCr} / ${sCr} mg/dL` },
          { label: 'Urine:Serum Cr Ratio', value: `${(uCr / sCr).toFixed(1)}x` }
        ],
        explanation: `With a FeNa of ${fena.toFixed(2)}%, the renal sodium excretion profile indicates ${diagnosis}.`
      };
    }
  },
  {
    id: 'qtc-interval-bazett-fridericia-calc',
    name: 'ECG QTc Interval (Bazett, Fridericia & Framingham) Calculator',
    category: 'health',
    subCategory: 'Cardiovascular & Vitals',
    description: 'Calculate heart-rate corrected QT interval (QTc) to identify drug-induced long QT syndrome (LQTS) and torsades de pointes risk.',
    formula: 'Bazett: QTc = QT / √(RR); Fridericia: QTc = QT / ∛(RR); RR (sec) = 60 / Heart Rate',
    inputs: [
      { id: 'qtIntervalMs', label: 'Measured QT Interval (ms)', type: 'number', defaultValue: 410, min: 200, max: 700, step: 5 },
      { id: 'heartRateBpm', label: 'Heart Rate (BPM)', type: 'number', defaultValue: 75, min: 30, max: 220, step: 1 },
      { id: 'isFemale', label: 'Patient Sex (0 = Male, 1 = Female)', type: 'number', defaultValue: 0, min: 0, max: 1, step: 1 }
    ],
    calculate: (inputs) => {
      const qtMs = Number(inputs.qtIntervalMs) || 410;
      const hr = Math.max(30, Number(inputs.heartRateBpm) || 75);
      const isFemale = Number(inputs.isFemale) === 1;

      const rrSec = 60 / hr;
      const qtSec = qtMs / 1000;

      const qtcBazett = (qtSec / Math.sqrt(rrSec)) * 1000;
      const qtcFridericia = (qtSec / Math.cbrt(rrSec)) * 1000;
      const qtcFramingham = (qtSec + 0.154 * (1 - rrSec)) * 1000;

      const thresholdProlonged = isFemale ? 470 : 450;
      const isProlonged = qtcBazett > thresholdProlonged;

      return {
        primaryValue: `${Math.round(qtcBazett)} ms (Bazett)`,
        primaryLabel: 'Heart-Rate Corrected QTc Interval',
        secondaryMetrics: [
          { label: 'Fridericia Formula (Preferred at high/low HR)', value: `${Math.round(qtcFridericia)} ms` },
          { label: 'Framingham Linear Formula', value: `${Math.round(qtcFramingham)} ms` },
          { label: 'LQTS Risk Threshold', value: `${thresholdProlonged} ms (${isFemale ? 'Female' : 'Male'})` },
          { label: 'ECG Clinical Status', value: isProlonged ? 'Prolonged QTc — Heightened Arrhythmia / TdP Risk' : 'Normal QTc Duration' },
          { label: 'RR Interval Duration', value: `${Math.round(rrSec * 1000)} ms` }
        ],
        explanation: `At a heart rate of ${hr} BPM (RR interval = ${Math.round(rrSec * 1000)} ms) and measured QT of ${qtMs} ms, the corrected QTc is ${Math.round(qtcBazett)} ms (Bazett) and ${Math.round(qtcFridericia)} ms (Fridericia).`
      };
    }
  },
  {
    id: 'parkland-burn-resuscitation-calc',
    name: 'Parkland Trauma Burn Fluid Resuscitation Calculator',
    category: 'health',
    subCategory: 'Clinical & Emergency',
    description: 'Calculate 24-hour IV Lactated Ringer\'s fluid requirements for second and third-degree severe burn trauma patients.',
    formula: 'Total 24h Fluid (mL) = 4 mL * Body Weight (kg) * Total Body Surface Area Burn % (TBSA); 50% in first 8h, 50% in remaining 16h',
    inputs: [
      { id: 'patientWeightKg', label: 'Patient Body Weight (kg)', type: 'number', defaultValue: 75, min: 10, max: 250, step: 1 },
      { id: 'tbsaBurnPercent', label: 'Total Body Surface Area Burn (% TBSA)', type: 'number', defaultValue: 30, min: 10, max: 100, step: 1 }
    ],
    calculate: (inputs) => {
      const w = Number(inputs.patientWeightKg) || 75;
      const tbsa = Number(inputs.tbsaBurnPercent) || 30;

      const total24hMl = 4 * w * tbsa;
      const first8hMl = total24hMl / 2;
      const next16hMl = total24hMl / 2;

      const first8hRate = first8hMl / 8;
      const next16hRate = next16hMl / 16;

      return {
        primaryValue: `${Math.round(total24hMl).toLocaleString()} mL Lactated Ringer\'s`,
        primaryLabel: 'Total 24-Hour Parkland IV Resuscitation Volume',
        secondaryMetrics: [
          { label: 'First 8 Hours Infusion Rate', value: `${Math.round(first8hRate)} mL/hr (${Math.round(first8hMl).toLocaleString()} mL total)` },
          { label: 'Next 16 Hours Infusion Rate', value: `${Math.round(next16hRate)} mL/hr (${Math.round(next16hMl).toLocaleString()} mL total)` },
          { label: 'Target Adult Urine Output Goal', value: '0.5 - 1.0 mL/kg/hr (Titration guide)' },
          { label: 'Total Liters of Crystalloid', value: `${(total24hMl / 1000).toFixed(1)} Liters` }
        ],
        explanation: `For a ${w} kg patient with ${tbsa}% TBSA burns, the Parkland formula dictates ${Math.round(total24hMl).toLocaleString()} mL of Lactated Ringer's in 24 hours: infusing ${Math.round(first8hRate)} mL/hr for the first 8 hours from burn injury, then ${Math.round(next16hRate)} mL/hr for the next 16 hours.`
      };
    }
  },
  {
    id: 'glasgow-coma-scale-gcs-calc',
    name: 'Glasgow Coma Scale (GCS) Neurological Score Calculator',
    category: 'health',
    subCategory: 'Clinical & Emergency',
    description: 'Calculate clinical neurological impairment score across Eye Opening (E1-E4), Verbal Response (V1-V5), and Motor Response (M1-M6).',
    formula: 'GCS Score = Eye (1-4) + Verbal (1-5) + Motor (1-6) (Range 3 to 15)',
    inputs: [
      { id: 'eyeOpeningScore', label: 'Eye Response (4=Spontaneous, 3=To Sound, 2=To Pressure, 1=None)', type: 'number', defaultValue: 4, min: 1, max: 4, step: 1 },
      { id: 'verbalResponseScore', label: 'Verbal Response (5=Oriented, 4=Confused, 3=Inappropriate, 2=Incomprehensible, 1=None)', type: 'number', defaultValue: 5, min: 1, max: 5, step: 1 },
      { id: 'motorResponseScore', label: 'Motor Response (6=Obeys Commands, 5=Localizing, 4=Withdrawal, 3=Abnormal Flexion, 2=Extension, 1=None)', type: 'number', defaultValue: 6, min: 1, max: 6, step: 1 }
    ],
    calculate: (inputs) => {
      const e = Math.min(4, Math.max(1, Number(inputs.eyeOpeningScore) || 4));
      const v = Math.min(5, Math.max(1, Number(inputs.verbalResponseScore) || 5));
      const m = Math.min(6, Math.max(1, Number(inputs.motorResponseScore) || 6));

      const totalGcs = e + v + m;

      let severity = '';
      if (totalGcs >= 13) severity = 'Mild Brain Injury / Concussion (GCS 13-15)';
      else if (totalGcs >= 9) severity = 'Moderate Traumatic Brain Injury (GCS 9-12)';
      else severity = 'Severe Traumatic Brain Injury / Coma (GCS 3-8) — Intubation Indicated';

      return {
        primaryValue: `GCS ${totalGcs} (E${e}V${v}M${m})`,
        primaryLabel: 'Glasgow Coma Scale Score (Range 3 - 15)',
        secondaryMetrics: [
          { label: 'Neurological Severity Level', value: severity },
          { label: 'Eye Opening Score (E)', value: `${e} / 4` },
          { label: 'Verbal Response Score (V)', value: `${v} / 5` },
          { label: 'Motor Response Score (M)', value: `${m} / 6` },
          { label: 'Airway Reflex Indication', value: totalGcs <= 8 ? 'Critical (GCS ≤ 8 Intubate)' : 'Airway Intact' }
        ],
        explanation: `With scores of E${e}, V${v}, M${m}, the composite GCS score is ${totalGcs}/15 (${severity}).`
      };
    }
  }
];
