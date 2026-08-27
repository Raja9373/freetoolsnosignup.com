import { CalculatorDefinition } from './calculatorEngine';

export const EXPANDED_HEALTH_MATH_CALCULATORS: CalculatorDefinition[] = [
  // =========================================================================
  // HEALTH, FITNESS & MEDICAL CALCULATORS
  // =========================================================================
  {
    id: 'bmr-katch-mcardle-calc',
    name: 'BMR Calculator (Katch-McArdle Formula)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Calculate exact Basal Metabolic Rate (BMR) based on Lean Body Mass (LBM) without relying on rough weight approximations.',
    formula: 'BMR = 370 + (21.6 × Lean Body Mass in kg)',
    formulaExplanation: 'Katch-McArdle is the most accurate metabolic formula for athletic individuals because muscle mass dictates resting energy expenditure.',
    defaultInputs: { bodyWeightKg: 80, bodyFatPct: 15 },
    fields: [
      { id: 'bodyWeightKg', label: 'Body Weight (kg)', type: 'number', step: 0.5 },
      { id: 'bodyFatPct', label: 'Body Fat Percentage (%)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const w = Number(i.bodyWeightKg) || 80;
      const bf = (Number(i.bodyFatPct) || 15) / 100;
      const lbm = w * (1 - bf);
      const bmr = 370 + (21.6 * lbm);

      return {
        primaryValue: `${Math.round(bmr)} kcal / day`,
        primaryLabel: 'Basal Metabolic Rate (Katch-McArdle)',
        secondaryMetrics: [
          { label: 'Lean Body Mass (LBM)', value: `${lbm.toFixed(1)} kg (${(lbm * 2.205).toFixed(1)} lbs)` },
          { label: 'Fat Mass', value: `${(w * bf).toFixed(1)} kg` },
          { label: 'Sedentary Maintenance (TDEE × 1.2)', value: `${Math.round(bmr * 1.2)} kcal` }
        ]
      };
    }
  },
  {
    id: 'bsa-calc',
    name: 'Body Surface Area (BSA) Calculator (Mosteller & DuBois)',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Calculate Body Surface Area in square meters (m²) used for medical chemotherapy dosages and cardiac index normalization.',
    formula: 'Mosteller: BSA (m²) = √((Height_cm × Weight_kg) / 3600); DuBois: BSA = 0.007184 × W^0.425 × H^0.725',
    formulaExplanation: 'Clinical standard for physiological scaling and pharmacokinetic drug dose calculation.',
    defaultInputs: { heightCm: 175, weightKg: 72 },
    fields: [
      { id: 'heightCm', label: 'Height (cm)', type: 'number', step: 1 },
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const h = Number(i.heightCm) || 175;
      const w = Number(i.weightKg) || 72;

      const mosteller = Math.sqrt((h * w) / 3600);
      const dubois = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);

      return {
        primaryValue: `${mosteller.toFixed(2)} m²`,
        primaryLabel: 'Body Surface Area (Mosteller)',
        secondaryMetrics: [
          { label: 'DuBois Formula Result', value: `${dubois.toFixed(2)} m²` },
          { label: 'Average Adult Baseline', value: '1.73 m²' },
          { label: 'Deviation from Mean', value: `${(((mosteller - 1.73) / 1.73) * 100).toFixed(1)}%` }
        ]
      };
    }
  },
  {
    id: 'creatinine-clearance-calc',
    name: 'Creatinine Clearance Calculator (Cockcroft-Gault Equation)',
    category: 'health',
    subCategory: 'Health & Diagnostics',
    description: 'Estimate renal creatinine clearance (CrCl mL/min) for clinical antibiotic and renal drug dosing adjustments.',
    formula: 'CrCl = [((140 - Age) × Weight_kg) / (72 × Serum_Cr)] × (0.85 if female)',
    formulaExplanation: 'The Cockcroft-Gault equation is the primary FDA-referenced clearance standard for pharmaceutical dosing guidelines.',
    defaultInputs: { gender: 'male', age: 55, weightKg: 75, serumCr: 1.1 },
    fields: [
      { id: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
      { id: 'age', label: 'Age (Years)', type: 'number', step: 1 },
      { id: 'weightKg', label: 'Weight (kg)', type: 'number', step: 0.5 },
      { id: 'serumCr', label: 'Serum Creatinine (mg/dL)', type: 'number', step: 0.05 }
    ],
    calculate: (i) => {
      const isFemale = (i.gender || 'male') === 'female';
      const age = Number(i.age) || 55;
      const w = Number(i.weightKg) || 75;
      const scr = Number(i.serumCr) || 1.1;

      let crcl = ((140 - age) * w) / (72 * (scr || 1));
      if (isFemale) crcl *= 0.85;

      return {
        primaryValue: `${crcl.toFixed(1)} mL/min`,
        primaryLabel: 'Creatinine Clearance (Cockcroft-Gault)',
        secondaryMetrics: [
          { label: 'Renal Function Status', value: crcl >= 90 ? 'Normal Renal Function (≥90)' : (crcl >= 60 ? 'Mild Impairment (60-89)' : 'Moderate/Severe (<60)') },
          { label: 'Daily Creatinine Excretion Rate', value: `${(crcl * 1.44).toFixed(0)} mL/day` }
        ]
      };
    }
  },
  {
    id: 'vo2-max-cooper-calc',
    name: 'VO2 Max Fitness Estimator (Cooper 12-Minute Run Test)',
    category: 'health',
    subCategory: 'Body Composition & Fitness',
    description: 'Estimate maximal oxygen uptake (VO2 Max in mL/kg/min) from total meters covered in a 12-minute running effort.',
    formula: 'VO2 Max = (Distance_meters - 504.9) / 44.73',
    formulaExplanation: 'Developed by Dr. Kenneth Cooper in 1968 for the US Air Force; validated across thousands of athletic fitness tests.',
    defaultInputs: { metersCovered: 2600 },
    fields: [
      { id: 'metersCovered', label: 'Total Distance Run in 12 Minutes (Meters)', type: 'number', step: 50 }
    ],
    calculate: (i) => {
      const meters = Number(i.metersCovered) || 2600;
      const vo2 = (meters - 504.9) / 44.73;

      let cat = 'Average';
      if (vo2 >= 52) cat = 'Superior / Elite (Top 5%)';
      else if (vo2 >= 46) cat = 'Excellent';
      else if (vo2 >= 42) cat = 'Good';
      else if (vo2 >= 36) cat = 'Fair';
      else cat = 'Poor / Sedentary';

      return {
        primaryValue: `${vo2.toFixed(1)} mL/kg/min`,
        primaryLabel: 'Estimated Aerobic Capacity (VO2 Max)',
        secondaryMetrics: [
          { label: 'Cardiorespiratory Fitness Category', value: cat },
          { label: '12-Minute Run Distance', value: `${meters} m (${(meters / 1609.34).toFixed(2)} Miles)` },
          { label: 'Equivalent 5K Pace', value: `${((12 / (meters / 1000)) * 5).toFixed(1)} min` }
        ]
      };
    }
  },

  // =========================================================================
  // MATHEMATICS, ALGEBRA & PHYSICS
  // =========================================================================
  {
    id: 'quadratic-cubic-calc',
    name: 'Quadratic Equation Solver (ax² + bx + c = 0)',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate real and complex roots, vertex coordinates, and discriminant (Δ = b² - 4ac) for quadratic equations.',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a); Vertex x_v = -b / (2a)',
    formulaExplanation: 'Standard algebraic closed-form quadratic formula.',
    defaultInputs: { a: 1, b: -5, c: 6 },
    fields: [
      { id: 'a', label: 'Coefficient a (x²)', type: 'number', step: 1 },
      { id: 'b', label: 'Coefficient b (x)', type: 'number', step: 1 },
      { id: 'c', label: 'Constant c', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const a = Number(i.a) || 1;
      const b = Number(i.b) || -5;
      const c = Number(i.c) || 6;

      const d = b * b - 4 * a * c;
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;

      if (d > 0) {
        const root1 = (-b + Math.sqrt(d)) / (2 * a);
        const root2 = (-b - Math.sqrt(d)) / (2 * a);
        return {
          primaryValue: `x₁ = ${root1.toFixed(3)}, x₂ = ${root2.toFixed(3)}`,
          primaryLabel: 'Two Distinct Real Roots (Δ > 0)',
          secondaryMetrics: [
            { label: 'Discriminant (b² - 4ac)', value: `Δ = ${d}` },
            { label: 'Parabola Vertex', value: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` },
            { label: 'Axis of Symmetry', value: `x = ${vertexX.toFixed(2)}` }
          ]
        };
      } else if (d === 0) {
        const root = -b / (2 * a);
        return {
          primaryValue: `x = ${root.toFixed(3)}`,
          primaryLabel: 'One Repeated Real Root (Δ = 0)',
          secondaryMetrics: [
            { label: 'Discriminant', value: 'Δ = 0' },
            { label: 'Parabola Vertex', value: `(${vertexX.toFixed(2)}, 0.00)` }
          ]
        };
      } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-d) / (2 * a);
        return {
          primaryValue: `${realPart.toFixed(3)} ± ${imagPart.toFixed(3)}i`,
          primaryLabel: 'Two Complex Conjugate Roots (Δ < 0)',
          secondaryMetrics: [
            { label: 'Discriminant', value: `Δ = ${d} (< 0)` },
            { label: 'Real Part', value: `${realPart.toFixed(3)}` },
            { label: 'Imaginary Part', value: `±${imagPart.toFixed(3)}i` }
          ]
        };
      }
    }
  },
  {
    id: 'resistors-series-parallel-calc',
    name: 'Resistors in Series & Parallel Equivalent Resistance',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate total equivalent resistance ($R_{eq}$) for circuits in series ($R_1 + R_2$) and parallel ($1/R_{eq} = 1/R_1 + 1/R_2$).',
    formula: 'Series: R_eq = R1 + R2 + R3; Parallel: 1/R_eq = 1/R1 + 1/R2 + 1/R3',
    formulaExplanation: 'Fundamental circuit analysis Kirchhoff resistance laws.',
    defaultInputs: { r1: 100, r2: 220, r3: 470 },
    fields: [
      { id: 'r1', label: 'Resistor R1 (Ohms Ω)', type: 'number', step: 10 },
      { id: 'r2', label: 'Resistor R2 (Ohms Ω)', type: 'number', step: 10 },
      { id: 'r3', label: 'Resistor R3 (Ohms Ω)', type: 'number', step: 10 }
    ],
    calculate: (i) => {
      const r1 = Number(i.r1) || 100;
      const r2 = Number(i.r2) || 220;
      const r3 = Number(i.r3) || 470;

      const series = r1 + r2 + r3;
      const parallel = 1 / ((1 / (r1 || 1)) + (1 / (r2 || 1)) + (1 / (r3 || 1)));

      return {
        primaryValue: `${parallel.toFixed(2)} Ω (Parallel)`,
        primaryLabel: 'Parallel Equivalent Resistance',
        secondaryMetrics: [
          { label: 'Series Equivalent Resistance', value: `${series.toFixed(2)} Ω (Series)` },
          { label: 'Conductance (G = 1/R)', value: `${(1 / parallel).toFixed(4)} Siemens` },
          { label: 'Current at 12V (Parallel)', value: `${((12 / parallel) * 1000).toFixed(1)} mA` }
        ]
      };
    }
  },
  {
    id: 'kinetic-energy-motion-calc',
    name: 'Kinetic Energy & Kinematic Motion Physics Calculator',
    category: 'math',
    subCategory: 'Algebra & Scientific',
    description: 'Calculate kinetic energy ($E_k = \\frac{1}{2}mv^2$), momentum ($p = mv$), and stopping distance under constant deceleration.',
    formula: 'Kinetic Energy E_k = 0.5 × m × v²; Momentum p = m × v',
    formulaExplanation: 'Classical Newtonian mechanics conservation of mechanical energy.',
    defaultInputs: { massKg: 1500, velocityMps: 27.78 }, // 1500kg car at 100 km/h
    fields: [
      { id: 'massKg', label: 'Object Mass (kg, e.g. 1500kg car)', type: 'number', step: 50 },
      { id: 'velocityMps', label: 'Velocity (Meters/sec, e.g. 27.78 m/s = 100 km/h)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const m = Number(i.massKg) || 1500;
      const v = Number(i.velocityMps) || 27.78;
      const ke = 0.5 * m * v * v;
      const momentum = m * v;
      const kmh = v * 3.6;

      return {
        primaryValue: `${(ke / 1000).toFixed(1)} kJ (${Math.round(ke).toLocaleString()} Joules)`,
        primaryLabel: 'Kinetic Energy (Ek = 1/2 mv²)',
        secondaryMetrics: [
          { label: 'Linear Momentum (p = mv)', value: `${Math.round(momentum).toLocaleString()} kg·m/s` },
          { label: 'Speed in km/h', value: `${kmh.toFixed(1)} km/h (${(kmh / 1.609).toFixed(1)} mph)` },
          { label: 'Calories Equivalent', value: `${(ke / 4184).toFixed(1)} kcal` }
        ]
      };
    }
  },

  // =========================================================================
  // EVERYDAY, CONSTRUCTION, HOME & UTILITY
  // =========================================================================
  {
    id: 'wind-chill-heat-index-calc',
    name: 'Wind Chill & Heat Index "Feels Like" Calculator (NOAA)',
    category: 'everyday',
    subCategory: 'Travel & Utilities',
    description: 'Calculate National Weather Service (NOAA) Wind Chill (for cold temperatures) and Heat Index (for humidity-adjusted summer heat).',
    formula: 'Wind Chill = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16); Heat Index via Steadman polynomial',
    formulaExplanation: 'Official NOAA and NWS temperature adjustment models for human thermal comfort.',
    defaultInputs: { tempF: 92, humidityPct: 65, windSpeedMph: 10 },
    fields: [
      { id: 'tempF', label: 'Air Temperature (°F)', type: 'number', step: 1 },
      { id: 'humidityPct', label: 'Relative Humidity (%)', type: 'number', step: 5 },
      { id: 'windSpeedMph', label: 'Wind Speed (mph)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const t = Number(i.tempF) || 92;
      const r = Number(i.humidityPct) || 65;
      const v = Number(i.windSpeedMph) || 10;

      let feelsLike = t;
      let mode = 'Actual Ambient Temp';

      if (t <= 50 && v > 3) {
        // Wind Chill
        feelsLike = 35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16);
        mode = 'Wind Chill (Cold Weather)';
      } else if (t >= 80) {
        // Heat Index Rothfusz regression
        feelsLike = -42.379 + 2.04901523 * t + 10.14333127 * r - 0.22475541 * t * r - 0.00683783 * t * t - 0.05481717 * r * r + 0.00122874 * t * t * r + 0.00085282 * t * r * r - 0.00000199 * t * t * r * r;
        mode = 'Heat Index (Apparent Heat)';
      }

      return {
        primaryValue: `${feelsLike.toFixed(1)}°F (${(((feelsLike - 32) * 5) / 9).toFixed(1)}°C)`,
        primaryLabel: `"Feels Like" Apparent Temperature`,
        secondaryMetrics: [
          { label: 'Calculation Mode', value: mode },
          { label: 'Heat Danger Category', value: feelsLike >= 105 ? 'DANGER: Heat Stroke Likely' : (feelsLike >= 90 ? 'EXTREME CAUTION: Cramps/Exhaustion' : 'Safe / Normal') },
          { label: 'Dew Point Approx', value: `${(t - ((100 - r) / 5)).toFixed(1)}°F` }
        ]
      };
    }
  },
  {
    id: 'tire-speedometer-error-calc',
    name: 'Tire Size Change & Speedometer Error Calculator',
    category: 'everyday',
    subCategory: 'Travel & Utilities',
    description: 'Calculate speedometer reading error, circumference variance, and ride height change when swapping wheels or tire sizes.',
    formula: 'Diameter = (2 × Section_Width × Aspect_Ratio / 2540) + Rim_Inches; Speed Error = New Diam / Old Diam',
    formulaExplanation: 'Translates metric tire specs (e.g. 225/45R17 vs 245/40R18) into rolling diameter and speed calibration ratios.',
    defaultInputs: { oldWidth: 225, oldAspect: 45, oldRim: 17, newWidth: 245, newAspect: 40, newRim: 18 },
    fields: [
      { id: 'oldWidth', label: 'Stock Tire Width (mm, e.g. 225)', type: 'number', step: 5 },
      { id: 'oldAspect', label: 'Stock Aspect Ratio (%, e.g. 45)', type: 'number', step: 5 },
      { id: 'oldRim', label: 'Stock Wheel Rim (Inches, e.g. 17)', type: 'number', step: 1 },
      { id: 'newWidth', label: 'New Tire Width (mm, e.g. 245)', type: 'number', step: 5 },
      { id: 'newAspect', label: 'New Aspect Ratio (%, e.g. 40)', type: 'number', step: 5 },
      { id: 'newRim', label: 'New Wheel Rim (Inches, e.g. 18)', type: 'number', step: 1 }
    ],
    calculate: (i) => {
      const getDiam = (w: number, a: number, r: number) => (2 * w * (a / 100)) / 25.4 + r;

      const dOld = getDiam(Number(i.oldWidth) || 225, Number(i.oldAspect) || 45, Number(i.oldRim) || 17);
      const dNew = getDiam(Number(i.newWidth) || 245, Number(i.newAspect) || 40, Number(i.newRim) || 18);

      const ratio = dNew / dOld;
      const speedAt65 = 65 * ratio;
      const errorPct = (ratio - 1) * 100;
      const rideHeightChange = (dNew - dOld) / 2;

      return {
        primaryValue: `${speedAt65.toFixed(1)} mph`,
        primaryLabel: 'Actual Speed at 65 mph Indicated',
        secondaryMetrics: [
          { label: 'Speedometer Variance', value: `${errorPct >= 0 ? '+' : ''}${errorPct.toFixed(2)}%` },
          { label: 'Stock Tire Overall Diameter', value: `${dOld.toFixed(2)} Inches` },
          { label: 'New Tire Overall Diameter', value: `${dNew.toFixed(2)} Inches` },
          { label: 'Ride Height Clearance Change', value: `${rideHeightChange >= 0 ? '+' : ''}${rideHeightChange.toFixed(2)} Inches` }
        ]
      };
    }
  },
  {
    id: 'gravel-mulch-topsoil-calc',
    name: 'Gravel, Mulch & Topsoil Volume / Tonnage Estimator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate cubic yards, cubic feet, and landscape tonnage of gravel, crushed stone, mulch, and garden topsoil.',
    formula: 'Cubic Yards = (Length_ft × Width_ft × Depth_in / 12) / 27; Gravel Tons = Cu Yds × 1.4 tons/yd³',
    formulaExplanation: 'Bulk landscape materials density converter where gravel is ~1.4 tons/yd³ and topsoil is ~1.1 tons/yd³.',
    defaultInputs: { lengthFt: 30, widthFt: 10, depthInches: 3, materialType: 'gravel' },
    fields: [
      { id: 'lengthFt', label: 'Landscape Bed Length (Feet)', type: 'number', step: 1 },
      { id: 'widthFt', label: 'Landscape Bed Width (Feet)', type: 'number', step: 1 },
      { id: 'depthInches', label: 'Layer Depth / Thickness (Inches)', type: 'number', step: 0.5 },
      { id: 'materialType', label: 'Material Density', type: 'select', options: [
        { label: 'Gravel / Crushed Stone (1.4 tons/yd³)', value: 'gravel' },
        { label: 'Topsoil / Fill Dirt (1.1 tons/yd³)', value: 'topsoil' },
        { label: 'Bark Mulch / Wood Chips (0.4 tons/yd³)', value: 'mulch' }
      ]}
    ],
    calculate: (i) => {
      const l = Number(i.lengthFt) || 30;
      const w = Number(i.widthFt) || 10;
      const d = (Number(i.depthInches) || 3) / 12;
      const cuFt = l * w * d;
      const cuYards = cuFt / 27;

      const mat = i.materialType || 'gravel';
      const density = mat === 'gravel' ? 1.4 : (mat === 'topsoil' ? 1.1 : 0.4);
      const tons = cuYards * density;

      return {
        primaryValue: `${cuYards.toFixed(2)} Cubic Yards`,
        primaryLabel: 'Total Material Volume Required',
        secondaryMetrics: [
          { label: 'Total Weight in Tons', value: `${tons.toFixed(2)} Tons (${Math.round(tons * 2000).toLocaleString()} lbs)` },
          { label: 'Surface Area Coverage', value: `${(l * w).toFixed(0)} sq ft` },
          { label: '2 Cu Ft Retail Bags Count', value: `${Math.ceil(cuFt / 2)} Bags (if bagged)` }
        ]
      };
    }
  },
  {
    id: 'roof-pitch-shingle-calc',
    name: 'Roof Pitch, Slope & Shingle Bundles Estimator',
    category: 'everyday',
    subCategory: 'Home & Construction',
    description: 'Calculate roof pitch angle in degrees, pitch multiplier slope factor, and roofing squares (bundles of shingles).',
    formula: 'Roof Area = Floor Area × Pitch Multiplier; Pitch Multiplier = √(1 + (Rise/12)²); 3 Bundles = 1 Roofing Square (100 sq ft)',
    formulaExplanation: 'Architectural slope geometry for estimating asphalt shingle bundles and underlayment rolls.',
    defaultInputs: { houseLengthFt: 40, houseWidthFt: 30, risePer12In: 6, overhangInches: 12 },
    fields: [
      { id: 'houseLengthFt', label: 'House Footprint Length (Feet)', type: 'number', step: 1 },
      { id: 'houseWidthFt', label: 'House Footprint Width (Feet)', type: 'number', step: 1 },
      { id: 'risePer12In', label: 'Roof Pitch Rise (e.g. 6 for 6/12 pitch)', type: 'number', step: 1 },
      { id: 'overhangInches', label: 'Eave & Gable Overhang (Inches)', type: 'number', step: 6 }
    ],
    calculate: (i) => {
      const l = Number(i.houseLengthFt) || 40;
      const w = Number(i.houseWidthFt) || 30;
      const rise = Number(i.risePer12In) || 6;
      const overhangFt = (Number(i.overhangInches) || 12) / 12 * 2; // both sides

      const flatArea = (l + overhangFt) * (w + overhangFt);
      const pitchMultiplier = Math.sqrt(1 + Math.pow(rise / 12, 2));
      const pitchAngleDeg = Math.atan(rise / 12) * (180 / Math.PI);
      const actualRoofSqFt = flatArea * pitchMultiplier * 1.10; // 10% waste
      const roofingSquares = actualRoofSqFt / 100;
      const shingleBundles = Math.ceil(roofingSquares * 3);

      return {
        primaryValue: `${shingleBundles} Bundles of Shingles`,
        primaryLabel: 'Total Shingle Bundles (3 bundles/square + 10% waste)',
        secondaryMetrics: [
          { label: 'Roofing Squares', value: `${roofingSquares.toFixed(2)} Squares (100 sq ft each)` },
          { label: 'Actual Roof Surface Area', value: `${actualRoofSqFt.toFixed(0)} sq ft` },
          { label: 'Roof Pitch Angle', value: `${pitchAngleDeg.toFixed(1)}° (${rise}/12 Pitch)` }
        ]
      };
    }
  },
  {
    id: 'shoe-size-international-calc',
    name: 'International Shoe Size Conversion Matrix (US, UK, EU, CM)',
    category: 'everyday',
    subCategory: 'Pet & Lifestyle',
    description: 'Convert footwear sizes between US Men, US Women, UK, European (EU), and foot length in centimeters (Mondopoint).',
    formula: 'EU Size ≈ (Foot_Length_cm + 1.5) × 1.5; US Men = (3 × Foot_Length_inches) - 22',
    formulaExplanation: 'Standard international footwear sizing conversion tables (ISO/TS 19407 Mondopoint standard).',
    defaultInputs: { usMenSize: 10 },
    fields: [
      { id: 'usMenSize', label: 'US Men Shoe Size', type: 'number', step: 0.5 }
    ],
    calculate: (i) => {
      const usM = Number(i.usMenSize) || 10;
      const usW = usM + 1.5;
      const uk = usM - 0.5;
      const eu = Math.round((usM + 31.5) * 1.05);
      const cm = (usM * 0.846 + 19.5).toFixed(1);

      return {
        primaryValue: `EU ${eu}`,
        primaryLabel: 'European Shoe Size Equivalent',
        secondaryMetrics: [
          { label: 'US Women Size', value: `US ${usW.toFixed(1)}` },
          { label: 'UK Shoe Size', value: `UK ${uk.toFixed(1)}` },
          { label: 'Foot Length in Centimeters', value: `${cm} cm` },
          { label: 'Foot Length in Inches', value: `${(Number(cm) / 2.54).toFixed(2)} in` }
        ]
      };
    }
  }
];
