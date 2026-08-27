import { CalculatorDefinition } from './calculatorEngine';

export const ULTIMATE_HEALTH_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'ckd-epi-2021-gfr-calc',
    name: '2021 CKD-EPI Creatinine eGFR Calculator (Non-Race Adjusted)',
    category: 'health',
    subCategory: 'Renal & Kidney Health',
    description: 'Calculate Estimated Glomerular Filtration Rate (eGFR) using the official 2021 CKD-EPI race-free guideline equation recommended by NKF and ASN.',
    formula: 'eGFR = 142 * min(Scr/kappa, 1)^alpha * max(Scr/kappa, 1)^-1.200 * 0.9938^Age * (1.012 if female)',
    inputs: [
      { id: 'serumCreatinine', label: 'Serum Creatinine (mg/dL)', type: 'number', defaultValue: 1.05, min: 0.2, max: 20, step: 0.05 },
      { id: 'ageYears', label: 'Age (Years)', type: 'number', defaultValue: 52, min: 18, max: 110, step: 1 },
      { id: 'isFemale', label: 'Biological Sex (1 = Female, 0 = Male)', type: 'number', defaultValue: 0, min: 0, max: 1, step: 1 }
    ],
    calculate: (inputs) => {
      const scr = Math.max(0.1, Number(inputs.serumCreatinine) || 1.05);
      const age = Math.max(18, Number(inputs.ageYears) || 52);
      const isFemale = Number(inputs.isFemale) === 1;

      const kappa = isFemale ? 0.7 : 0.9;
      const alpha = isFemale ? -0.241 : -0.302;
      const genderMult = isFemale ? 1.012 : 1.000;

      const scrRatio = scr / kappa;
      const term1 = Math.pow(Math.min(scrRatio, 1), alpha);
      const term2 = Math.pow(Math.max(scrRatio, 1), -1.200);
      const term3 = Math.pow(0.9938, age);

      const egfr = 142 * term1 * term2 * term3 * genderMult;

      let stage = '';
      if (egfr >= 90) stage = 'Stage G1: Normal or High Kidney Function';
      else if (egfr >= 60) stage = 'Stage G2: Mildly Decreased Kidney Function';
      else if (egfr >= 45) stage = 'Stage G3a: Mild-to-Moderate Kidney Loss';
      else if (egfr >= 30) stage = 'Stage G3b: Moderate-to-Severe Kidney Loss';
      else if (egfr >= 15) stage = 'Stage G4: Severely Decreased Kidney Function';
      else stage = 'Stage G5: Kidney Failure (Dialysis / Transplant evaluation)';

      return {
        primaryValue: `${egfr.toFixed(1)} mL/min/1.73 m²`,
        primaryLabel: '2021 CKD-EPI Estimated Glomerular Filtration Rate (eGFR)',
        secondaryMetrics: [
          { label: 'CKD Clinical Stage', value: stage },
          { label: 'Serum Creatinine', value: `${scr.toFixed(2)} mg/dL` },
          { label: 'Standard Normal Baseline', value: '≥ 90 mL/min/1.73 m²' },
          { label: 'Equation Standard', value: '2021 CKD-EPI Creatinine (Race-Free)' },
          { label: 'Biological Sex', value: isFemale ? 'Female' : 'Male' }
        ],
        explanation: `With a serum creatinine of ${scr.toFixed(2)} mg/dL at age ${age} (${isFemale ? 'Female' : 'Male'}), the 2021 CKD-EPI equation estimates renal filtration at ${egfr.toFixed(1)} mL/min/1.73m², classifying as ${stage}.`
      };
    }
  },
  {
    id: 'mean-arterial-pressure-map-calc',
    name: 'Mean Arterial Pressure (MAP) & Perfusion Calculator',
    category: 'health',
    subCategory: 'Cardiovascular & Vitals',
    description: 'Calculate Mean Arterial Pressure (MAP), pulse pressure, and clinical organ perfusion index from systolic and diastolic blood pressure readings.',
    formula: 'MAP = (2 * DBP + SBP) / 3 = DBP + (SBP - DBP) / 3',
    inputs: [
      { id: 'systolicBP', label: 'Systolic Blood Pressure (SBP, mmHg)', type: 'number', defaultValue: 120, min: 50, max: 280, step: 1 },
      { id: 'diastolicBP', label: 'Diastolic Blood Pressure (DBP, mmHg)', type: 'number', defaultValue: 80, min: 30, max: 180, step: 1 }
    ],
    calculate: (inputs) => {
      const sbp = Number(inputs.systolicBP) || 120;
      const dbp = Number(inputs.diastolicBP) || 80;

      const pulsePressure = sbp - dbp;
      const map = (2 * dbp + sbp) / 3;

      let clinicalStatus = '';
      if (map < 65) clinicalStatus = 'Low (< 65 mmHg) — Risk of organ hypoperfusion/shock';
      else if (map <= 100) clinicalStatus = 'Normal (65 - 100 mmHg) — Adequate vital organ perfusion';
      else if (map <= 110) clinicalStatus = 'Elevated (101 - 110 mmHg)';
      else clinicalStatus = 'High (> 110 mmHg) — Increased cardiovascular workload';

      return {
        primaryValue: `${map.toFixed(1)} mmHg`,
        primaryLabel: 'Mean Arterial Pressure (MAP)',
        secondaryMetrics: [
          { label: 'Perfusion Status', value: clinicalStatus },
          { label: 'Pulse Pressure', value: `${pulsePressure} mmHg (Normal: 30-50 mmHg)` },
          { label: 'Blood Pressure Reading', value: `${sbp}/${dbp} mmHg` },
          { label: 'Minimum Critical Perfusion', value: '65 mmHg (Required for brain/kidneys)' }
        ],
        explanation: `With blood pressure of ${sbp}/${dbp} mmHg, your Mean Arterial Pressure (MAP) is ${map.toFixed(1)} mmHg. A MAP between 70 to 100 mmHg ensures continuous oxygenated blood flow to coronary arteries, brain, and kidneys.`
      };
    }
  },
  {
    id: 'hba1c-estimated-average-glucose-calc',
    name: 'HbA1c to Estimated Average Glucose (eAG) Converter',
    category: 'health',
    subCategory: 'Endocrinology & Diabetes',
    description: 'Convert between Hemoglobin A1c (HbA1c %) and daily Estimated Average Glucose (eAG) in both mg/dL and mmol/L clinical units (ADAG Formula).',
    formula: 'eAG (mg/dL) = 28.7 * HbA1c - 46.7; eAG (mmol/L) = eAG(mg/dL) / 18.0182',
    inputs: [
      { id: 'hba1cPercent', label: 'Hemoglobin A1c Level (%)', type: 'number', defaultValue: 5.7, min: 3.5, max: 20, step: 0.1 }
    ],
    calculate: (inputs) => {
      const a1c = Number(inputs.hba1cPercent) || 5.7;

      const eagMgDl = 28.7 * a1c - 46.7;
      const eagMmolL = eagMgDl / 18.0182;

      let diagnosis = '';
      if (a1c < 5.7) diagnosis = 'Normal (< 5.7%) — Healthy Glycemic Control';
      else if (a1c <= 6.4) diagnosis = 'Prediabetes (5.7% - 6.4%) — Elevated Insulin Resistance Risk';
      else if (a1c <= 7.0) diagnosis = 'Diabetes: Well Controlled (ADA Target for Diabetics: < 7.0%)';
      else if (a1c <= 8.5) diagnosis = 'Diabetes: Moderately Controlled';
      else diagnosis = 'Diabetes: Poorly Controlled (High risk of microvascular complications)';

      return {
        primaryValue: `${Math.round(eagMgDl)} mg/dL (${eagMmolL.toFixed(1)} mmol/L)`,
        primaryLabel: 'Estimated Average Blood Glucose (eAG)',
        secondaryMetrics: [
          { label: 'Glycemic Category', value: diagnosis },
          { label: 'HbA1c Input', value: `${a1c.toFixed(1)}%` },
          { label: 'eAG in mg/dL', value: `${Math.round(eagMgDl)} mg/dL` },
          { label: 'eAG in mmol/L', value: `${eagMmolL.toFixed(2)} mmol/L` },
          { label: 'ADA Target for Diabetics', value: '< 7.0% (~154 mg/dL)' }
        ],
        explanation: `An HbA1c of ${a1c.toFixed(1)}% correlates to a 90-day daily average blood glucose level of ${Math.round(eagMgDl)} mg/dL (${eagMmolL.toFixed(1)} mmol/L). Clinical assessment: ${diagnosis}.`
      };
    }
  },
  {
    id: 'cholesterol-ldl-friedewald-calc',
    name: 'LDL Cholesterol Calculator (Friedewald Equation)',
    category: 'health',
    subCategory: 'Cardiovascular & Vitals',
    description: 'Calculate low-density lipoprotein (LDL) cholesterol and Total/HDL atherogenic risk ratio from total cholesterol, HDL, and triglycerides.',
    formula: 'LDL = Total Cholesterol - HDL - (Triglycerides / 5) (valid if TG < 400 mg/dL)',
    inputs: [
      { id: 'totalCholesterol', label: 'Total Cholesterol (mg/dL)', type: 'number', defaultValue: 195, min: 50, max: 600, step: 1 },
      { id: 'hdlCholesterol', label: 'HDL "Good" Cholesterol (mg/dL)', type: 'number', defaultValue: 55, min: 10, max: 150, step: 1 },
      { id: 'triglycerides', label: 'Triglycerides (mg/dL)', type: 'number', defaultValue: 130, min: 20, max: 1000, step: 1 }
    ],
    calculate: (inputs) => {
      const total = Number(inputs.totalCholesterol) || 195;
      const hdl = Number(inputs.hdlCholesterol) || 55;
      const tg = Number(inputs.triglycerides) || 130;

      const vldl = tg / 5;
      const ldl = Math.max(0, total - hdl - vldl);
      const ratio = total / Math.max(1, hdl);
      const nonHdl = total - hdl;

      let ldlCategory = '';
      if (ldl < 100) ldlCategory = 'Optimal (< 100 mg/dL)';
      else if (ldl <= 129) ldlCategory = 'Near Optimal / Desirable (100-129 mg/dL)';
      else if (ldl <= 159) ldlCategory = 'Borderline High (130-159 mg/dL)';
      else if (ldl <= 189) ldlCategory = 'High (160-189 mg/dL)';
      else ldlCategory = 'Very High (≥ 190 mg/dL)';

      return {
        primaryValue: `${Math.round(ldl)} mg/dL`,
        primaryLabel: 'Calculated LDL "Bad" Cholesterol',
        secondaryMetrics: [
          { label: 'LDL Classification', value: ldlCategory },
          { label: 'Non-HDL Cholesterol', value: `${nonHdl} mg/dL (Goal: < 130 mg/dL)` },
          { label: 'Total / HDL Ratio', value: `${ratio.toFixed(2)} (Ideal: < 3.5)` },
          { label: 'VLDL Estimate', value: `${Math.round(vldl)} mg/dL` },
          { label: 'Equation Validity', value: tg < 400 ? 'Valid (TG < 400 mg/dL)' : 'Direct Assay Recommended (TG ≥ 400)' }
        ],
        explanation: `With Total Cholesterol of ${total} mg/dL, HDL of ${hdl} mg/dL, and Triglycerides of ${tg} mg/dL, your calculated LDL is ${Math.round(ldl)} mg/dL (${ldlCategory}) with a Total/HDL ratio of ${ratio.toFixed(2)}.`
      };
    }
  },
  {
    id: 'calcium-corrected-albumin-calc',
    name: 'Corrected Calcium for Hypoalbuminemia (Payne Formula)',
    category: 'health',
    subCategory: 'Laboratory & Biochemistry',
    description: 'Calculate serum corrected calcium in patients with abnormal albumin levels to prevent misdiagnoses of hypocalcemia or hypercalcemia.',
    formula: 'Corrected Calcium (mg/dL) = Total Calcium + 0.8 * (4.0 - Serum Albumin)',
    inputs: [
      { id: 'totalCalcium', label: 'Measured Total Serum Calcium (mg/dL)', type: 'number', defaultValue: 8.2, min: 3, max: 20, step: 0.1 },
      { id: 'serumAlbumin', label: 'Serum Albumin (g/dL)', type: 'number', defaultValue: 2.8, min: 0.5, max: 6.0, step: 0.1 }
    ],
    calculate: (inputs) => {
      const ca = Number(inputs.totalCalcium) || 8.2;
      const alb = Number(inputs.serumAlbumin) || 2.8;

      const correctedCa = ca + 0.8 * (4.0 - alb);

      let status = '';
      if (correctedCa < 8.5) status = 'Hypocalcemia (< 8.5 mg/dL)';
      else if (correctedCa <= 10.2) status = 'Normal (8.5 - 10.2 mg/dL)';
      else status = 'Hypercalcemia (> 10.2 mg/dL)';

      return {
        primaryValue: `${correctedCa.toFixed(2)} mg/dL`,
        primaryLabel: 'Albumin-Corrected Serum Calcium',
        secondaryMetrics: [
          { label: 'Physiological Interpretation', value: status },
          { label: 'Measured Calcium', value: `${ca.toFixed(2)} mg/dL` },
          { label: 'Measured Albumin', value: `${alb.toFixed(2)} g/dL (Normal: 3.5-5.0)` },
          { label: 'Albumin Correction Offset', value: `${(0.8 * (4.0 - alb) >= 0 ? '+' : '')}${(0.8 * (4.0 - alb)).toFixed(2)} mg/dL` },
          { label: 'Normal Target Range', value: '8.5 - 10.2 mg/dL (2.12 - 2.55 mmol/L)' }
        ],
        explanation: `Due to low albumin (${alb.toFixed(2)} g/dL), the raw calcium reading of ${ca.toFixed(2)} mg/dL underestimates true physiological ionized calcium. The Payne corrected value is ${correctedCa.toFixed(2)} mg/dL (${status}).`
      };
    }
  },
  {
    id: 'dots-powerlifting-score-calc',
    name: 'DOTS Powerlifting Score & Strength Level Calculator',
    category: 'health',
    subCategory: 'Sports & Strength',
    description: 'Calculate official DOTS points to compare powerlifting strength across different body weights and genders for Squat, Bench, and Deadlift totals.',
    formula: 'DOTS = Total * 500 / (A*w^4 + B*w^3 + C*w^2 + D*w + E)',
    inputs: [
      { id: 'bodyWeightKg', label: 'Body Weight (kg)', type: 'number', defaultValue: 83, min: 35, max: 250, step: 0.5 },
      { id: 'totalLiftedKg', label: 'Total Weight Lifted (Squat + Bench + Deadlift in kg)', type: 'number', defaultValue: 580, min: 50, max: 1300, step: 2.5 },
      { id: 'isFemale', label: 'Lifter Gender (0 = Male, 1 = Female)', type: 'number', defaultValue: 0, min: 0, max: 1, step: 1 }
    ],
    calculate: (inputs) => {
      const w = Math.max(30, Number(inputs.bodyWeightKg) || 83);
      const total = Math.max(10, Number(inputs.totalLiftedKg) || 580);
      const isFemale = Number(inputs.isFemale) === 1;

      // DOTS polynomial coefficients
      let denom = 0;
      if (isFemale) {
        denom = -0.0000010706 * Math.pow(w, 4) + 0.0005158568 * Math.pow(w, 3) - 0.1126655495 * Math.pow(w, 2) + 13.6175032 * w - 57.96288;
      } else {
        denom = -0.0000010930 * Math.pow(w, 4) + 0.0007391293 * Math.pow(w, 3) - 0.1918759221 * Math.pow(w, 2) + 24.0900756 * w - 307.75076;
      }

      const dots = (total * 500) / Math.max(1, denom);

      let classification = '';
      if (dots < 300) classification = 'Novice / Intermediate';
      else if (dots < 400) classification = 'Proficient / Regional Competitor';
      else if (dots < 480) classification = 'Advanced / National Level';
      else if (dots < 540) classification = 'Elite / International Class';
      else classification = 'World-Class / All-Time Record Tier';

      return {
        primaryValue: `${dots.toFixed(2)} DOTS Points`,
        primaryLabel: 'DOTS Powerlifting Score',
        secondaryMetrics: [
          { label: 'Strength Classification', value: classification },
          { label: 'Total Lifted', value: `${total} kg (${Math.round(total * 2.20462)} lbs)` },
          { label: 'Body Weight', value: `${w} kg (${Math.round(w * 2.20462)} lbs)` },
          { label: 'Bodyweight Multiple Total', value: `${(total / w).toFixed(2)}x Bodyweight` },
          { label: 'Lifter Category', value: isFemale ? 'Female Open' : 'Male Open' }
        ],
        explanation: `Lifting a ${total} kg total at ${w} kg body weight generates a DOTS score of ${dots.toFixed(2)} points (${classification}), allowing fair comparison against any lifter regardless of weight class.`
      };
    }
  },
  {
    id: 'running-pace-splits-calc',
    name: 'Running Pace, Speed & Race Split Calculator',
    category: 'health',
    subCategory: 'Sports & Strength',
    description: 'Calculate running pace (min/km and min/mile), speed (km/h and mph), and exact splits for 5K, 10K, Half Marathon, and Full 42.2K Marathon.',
    formula: 'Pace = Time / Distance; Speed = Distance / Time; Splits = Pace * SplitDistance',
    inputs: [
      { id: 'distanceKm', label: 'Race Distance (km) (e.g. 5, 10, 21.0975, 42.195)', type: 'number', defaultValue: 21.0975, min: 0.1, max: 200, step: 0.5 },
      { id: 'targetHours', label: 'Goal Hours', type: 'number', defaultValue: 1, min: 0, max: 24, step: 1 },
      { id: 'targetMinutes', label: 'Goal Minutes', type: 'number', defaultValue: 45, min: 0, max: 59, step: 1 },
      { id: 'targetSeconds', label: 'Goal Seconds', type: 'number', defaultValue: 0, min: 0, max: 59, step: 1 }
    ],
    calculate: (inputs) => {
      const distKm = Math.max(0.1, Number(inputs.distanceKm) || 21.0975);
      const h = Number(inputs.targetHours) || 0;
      const m = Number(inputs.targetMinutes) || 0;
      const s = Number(inputs.targetSeconds) || 0;

      const totalSec = h * 3600 + m * 60 + s;
      const distMiles = distKm * 0.621371;

      const secPerKm = totalSec / distKm;
      const secPerMile = totalSec / distMiles;

      const formatPace = (sec: number) => {
        const mins = Math.floor(sec / 60);
        const remSec = Math.round(sec % 60);
        return `${mins}:${remSec < 10 ? '0' : ''}${remSec}`;
      };

      const paceKm = formatPace(secPerKm);
      const paceMile = formatPace(secPerMile);
      const speedKmh = (distKm / (totalSec / 3600)).toFixed(2);
      const speedMph = (distMiles / (totalSec / 3600)).toFixed(2);

      // Equivalent race estimates using Riegel's formula: T2 = T1 * (D2 / D1)^1.06
      const riegel = (d2: number) => {
        const t2Sec = totalSec * Math.pow(d2 / distKm, 1.06);
        const rh = Math.floor(t2Sec / 3600);
        const rm = Math.floor((t2Sec % 3600) / 60);
        const rs = Math.round(t2Sec % 60);
        return `${rh > 0 ? rh + 'h ' : ''}${rm}m ${rs < 10 ? '0' : ''}${rs}s`;
      };

      return {
        primaryValue: `${paceKm} /km (${paceMile} /mile)`,
        primaryLabel: 'Required Running Pace',
        secondaryMetrics: [
          { label: 'Running Speed', value: `${speedKmh} km/h (${speedMph} mph)` },
          { label: 'Total Finish Time', value: `${h}h ${m}m ${s}s` },
          { label: '5K Estimated Time', value: riegel(5) },
          { label: '10K Estimated Time', value: riegel(10) },
          { label: 'Half Marathon (21.1K)', value: riegel(21.0975) },
          { label: 'Full Marathon (42.2K)', value: riegel(42.195) }
        ],
        explanation: `To complete ${distKm} km in ${h}h ${m}m ${s}s, you must maintain a steady pace of ${paceKm} min/km (${paceMile} min/mile) at an average speed of ${speedKmh} km/h.`
      };
    }
  },
  {
    id: 'iv-infusion-drip-rate-calc',
    name: 'IV Infusion & Drop Rate (gtt/min) Calculator',
    category: 'health',
    subCategory: 'Clinical & Nursing',
    description: 'Calculate clinical intravenous (IV) infusion rates in mL/hr and gravity drip drop rates (drops/min, gtt/min) based on tubing drip factor.',
    formula: 'Flow Rate (mL/hr) = Total Volume (mL) / Time (hr); Drip Rate (gtt/min) = (Volume mL * Drip Factor) / Time (min)',
    inputs: [
      { id: 'totalVolumeMl', label: 'Total Infusion Volume (mL)', type: 'number', defaultValue: 1000, min: 10, max: 5000, step: 50 },
      { id: 'timeHours', label: 'Infusion Duration (Hours)', type: 'number', defaultValue: 8, min: 0.25, max: 48, step: 0.5 },
      { id: 'dripFactor', label: 'Tubing Drip Factor (gtt/mL) (e.g. 10, 15, 20 macro, 60 micro)', type: 'number', defaultValue: 15, min: 10, max: 60, step: 5 }
    ],
    calculate: (inputs) => {
      const vol = Number(inputs.totalVolumeMl) || 1000;
      const hrs = Number(inputs.timeHours) || 8;
      const factor = Number(inputs.dripFactor) || 15;

      const rateMlHr = vol / hrs;
      const totalMinutes = hrs * 60;
      const gttMin = (vol * factor) / totalMinutes;
      const secondsPerDrop = 60 / gttMin;

      return {
        primaryValue: `${Math.round(gttMin)} drops/min (gtt/min)`,
        primaryLabel: `IV Drip Rate (${factor} gtt/mL Tubing)`,
        secondaryMetrics: [
          { label: 'Volumetric Pump Flow Rate', value: `${rateMlHr.toFixed(1)} mL/hr` },
          { label: 'Drop Interval Frequency', value: `1 drop every ${secondsPerDrop.toFixed(1)} seconds` },
          { label: 'Total Volume to Infuse', value: `${vol} mL` },
          { label: 'Total Infusion Time', value: `${hrs} Hours (${totalMinutes} Minutes)` },
          { label: 'Tubing Set Type', value: factor === 60 ? 'Microdrip Set (60 gtt/mL)' : 'Macrodrip Set (10-20 gtt/mL)' }
        ],
        explanation: `Infusing ${vol} mL over ${hrs} hours using a ${factor} gtt/mL tubing set requires an electronic pump rate of ${rateMlHr.toFixed(1)} mL/hr or a gravity drop rate of ${Math.round(gttMin)} drops per minute (1 drop every ${secondsPerDrop.toFixed(1)}s).`
      };
    }
  }
];
