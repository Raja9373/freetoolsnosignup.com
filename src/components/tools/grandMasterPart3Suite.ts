import { CalculatorDefinition } from './calculatorEngine';

export const GRAND_MASTER_PART3_SUITE: CalculatorDefinition[] = [
  // -------------------------------------------------------------
  // 1. GEOMETRY & 3D SOLIDS CALCULATORS
  // -------------------------------------------------------------
  {
    id: 'sphere-surface-area-volume-calc',
    name: 'Sphere, Hemisphere & Spherical Cap Volume & Surface Area',
    category: 'math',
    subCategory: 'Geometry & 3D Solids',
    description: 'Calculate Volume (V = 4/3 π r³), Surface Area (A = 4 π r²), Hemisphere Volume, and Spherical Cap properties from radius or diameter.',
    formula: 'Volume = (4/3) * π * r³; Surface Area = 4 * π * r²; Hemisphere Volume = (2/3) * π * r³',
    inputs: [
      { id: 'radiusUnits', label: 'Sphere Radius (r)', type: 'number', defaultValue: 6.0, min: 0.01, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const r = Math.max(0.01, Number(inputs.radiusUnits) || 6.0);

      const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
      const surfaceArea = 4 * Math.PI * Math.pow(r, 2);
      const hemisphereVol = volume / 2;
      const hemisphereTotalArea = 3 * Math.PI * Math.pow(r, 2); // curved + circular base
      const circumference = 2 * Math.PI * r;

      return {
        primaryValue: `V = ${volume.toFixed(3)} cubic units`,
        primaryLabel: `Sphere Volume (r = ${r})`,
        secondaryMetrics: [
          { label: 'Total Surface Area', value: `${surfaceArea.toFixed(3)} sq units` },
          { label: 'Equatorial Circumference', value: `${circumference.toFixed(3)} units` },
          { label: 'Hemisphere Volume', value: `${hemisphereVol.toFixed(3)} cubic units` },
          { label: 'Hemisphere Total Surface Area', value: `${hemisphereTotalArea.toFixed(3)} sq units` },
          { label: 'Surface-to-Volume Ratio (A/V)', value: `${(surfaceArea / volume).toFixed(3)} (3/r)` }
        ],
        explanation: `A sphere with radius r = ${r} has a volume of ${volume.toFixed(3)} cubic units and a total surface area of ${surfaceArea.toFixed(3)} square units.`
      };
    }
  },
  {
    id: 'cone-frustum-geometry-calc',
    name: 'Cone & Truncated Conical Frustum Volume & Lateral Area',
    category: 'math',
    subCategory: 'Geometry & 3D Solids',
    description: 'Calculate volume, slant height (s = √(r² + h²)), lateral surface area, and total surface area for right circular cones and conical frustums.',
    formula: 'V = (1/3) * π * r² * h; Slant Height s = √(r² + h²); Lateral Area = π * r * s; Total Area = π*r*(r + s)',
    inputs: [
      { id: 'baseRadius', label: 'Base Radius (r)', type: 'number', defaultValue: 5.0, min: 0.01, max: 10000, step: 0.5 },
      { id: 'coneHeight', label: 'Vertical Height (h)', type: 'number', defaultValue: 12.0, min: 0.01, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const r = Math.max(0.01, Number(inputs.baseRadius) || 5.0);
      const h = Math.max(0.01, Number(inputs.coneHeight) || 12.0);

      const slantHeight = Math.sqrt(r * r + h * h);
      const volume = (1 / 3) * Math.PI * r * r * h;
      const lateralArea = Math.PI * r * slantHeight;
      const baseArea = Math.PI * r * r;
      const totalArea = lateralArea + baseArea;
      const apexAngleDeg = 2 * Math.atan(r / h) * (180 / Math.PI);

      return {
        primaryValue: `V = ${volume.toFixed(3)} cubic units`,
        primaryLabel: 'Cone Volume',
        secondaryMetrics: [
          { label: 'Slant Height (s)', value: `${slantHeight.toFixed(3)} units` },
          { label: 'Lateral Curved Surface Area', value: `${lateralArea.toFixed(3)} sq units` },
          { label: 'Total Surface Area (Base + Lateral)', value: `${totalArea.toFixed(3)} sq units` },
          { label: 'Base Circle Area', value: `${baseArea.toFixed(3)} sq units` },
          { label: 'Cone Apex Vertex Angle', value: `${apexAngleDeg.toFixed(2)}°` }
        ],
        explanation: `For a right cone with base radius r = ${r} and vertical height h = ${h}, slant height is ${slantHeight.toFixed(3)}, volume is ${volume.toFixed(3)}, and total surface area is ${totalArea.toFixed(3)}.`
      };
    }
  },
  {
    id: 'cylinder-pipe-volume-calc',
    name: 'Cylinder & Hollow Pipe Volume & Capacity Calculator',
    category: 'math',
    subCategory: 'Geometry & 3D Solids',
    description: 'Calculate solid cylinder volume, hollow pipe wall volume, liquid capacity in Gallons and Liters, and total surface area.',
    formula: 'Volume = π * r² * h; Lateral Area = 2 * π * r * h; Total Area = 2πr(r + h); Gallons = V / 231 cu in',
    inputs: [
      { id: 'cylinderRadiusInches', label: 'Cylinder Radius (Inches)', type: 'number', defaultValue: 12.0, min: 0.1, max: 1000, step: 0.5 },
      { id: 'cylinderHeightInches', label: 'Cylinder Height / Length (Inches)', type: 'number', defaultValue: 36.0, min: 0.1, max: 10000, step: 1 }
    ],
    calculate: (inputs) => {
      const r = Math.max(0.1, Number(inputs.cylinderRadiusInches) || 12.0);
      const h = Math.max(0.1, Number(inputs.cylinderHeightInches) || 36.0);

      const volumeCuIn = Math.PI * r * r * h;
      const volumeCuFt = volumeCuIn / 1728;
      const volumeGallons = volumeCuIn / 231;
      const volumeLiters = volumeGallons * 3.78541;

      const lateralAreaSqIn = 2 * Math.PI * r * h;
      const baseAreaSqIn = Math.PI * r * r;
      const totalAreaSqIn = lateralAreaSqIn + 2 * baseAreaSqIn;

      return {
        primaryValue: `${volumeGallons.toFixed(1)} Gallons (${volumeLiters.toFixed(1)} Liters)`,
        primaryLabel: 'Liquid Holding Capacity',
        secondaryMetrics: [
          { label: 'Cubic Volume in Cubic Feet', value: `${volumeCuFt.toFixed(2)} cu ft (${(volumeCuFt * 0.0283168).toFixed(3)} m³)` },
          { label: 'Total Internal Volume', value: `${Math.round(volumeCuIn).toLocaleString()} cubic inches` },
          { label: 'Total Surface Area', value: `${(totalAreaSqIn / 144).toFixed(2)} sq ft (${Math.round(totalAreaSqIn).toLocaleString()} sq in)` },
          { label: 'Lateral Barrel Area', value: `${(lateralAreaSqIn / 144).toFixed(2)} sq ft` },
          { label: 'End Caps Circular Area (Both)', value: `${(2 * baseAreaSqIn / 144).toFixed(2)} sq ft` }
        ],
        explanation: `A cylinder with radius ${r}" and height ${h}" holds ${volumeGallons.toFixed(1)} US gallons (${volumeLiters.toFixed(1)} Liters, ${volumeCuFt.toFixed(2)} cu ft) with a total surface area of ${(totalAreaSqIn / 144).toFixed(2)} sq ft.`
      };
    }
  },
  {
    id: 'ellipsoid-surface-area-volume-calc',
    name: 'Ellipsoid 3D Semi-Axes Volume & Knud Thomsen Area Calculator',
    category: 'math',
    subCategory: 'Geometry & 3D Solids',
    description: 'Calculate accurate volume and Knud Thomsen formula surface area for tri-axial ellipsoids given semi-principal axes a, b, and c.',
    formula: 'V = (4/3) * π * a * b * c; Area ≈ 4π * [((ab)^p + (ac)^p + (bc)^p) / 3]^(1/p) where p = 1.6075',
    inputs: [
      { id: 'semiAxisA', label: 'Semi-Principal Axis a', type: 'number', defaultValue: 9.0, min: 0.1, max: 10000, step: 0.5 },
      { id: 'semiAxisB', label: 'Semi-Principal Axis b', type: 'number', defaultValue: 6.0, min: 0.1, max: 10000, step: 0.5 },
      { id: 'semiAxisC', label: 'Semi-Principal Axis c', type: 'number', defaultValue: 4.0, min: 0.1, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const a = Math.max(0.1, Number(inputs.semiAxisA) || 9.0);
      const b = Math.max(0.1, Number(inputs.semiAxisB) || 6.0);
      const c = Math.max(0.1, Number(inputs.semiAxisC) || 4.0);

      const volume = (4 / 3) * Math.PI * a * b * c;

      // Knud Thomsen formula with p = 1.6075 (max error < 1.061%)
      const p = 1.6075;
      const term1 = Math.pow(a * b, p);
      const term2 = Math.pow(a * c, p);
      const term3 = Math.pow(b * c, p);
      const surfaceArea = 4 * Math.PI * Math.pow((term1 + term2 + term3) / 3, 1 / p);

      return {
        primaryValue: `V = ${volume.toFixed(3)} cubic units`,
        primaryLabel: `Ellipsoid Volume (a=${a}, b=${b}, c=${c})`,
        secondaryMetrics: [
          { label: 'Knud Thomsen Surface Area', value: `${surfaceArea.toFixed(3)} sq units` },
          { label: 'Full Axes Dimensions (2a × 2b × 2c)', value: `${2 * a} × ${2 * b} × ${2 * c} units` },
          { label: 'Mean Geometric Radius', value: `${Math.cbrt(a * b * c).toFixed(3)} units` }
        ],
        explanation: `For an ellipsoid with semi-axes a=${a}, b=${b}, and c=${c}, volume is ${volume.toFixed(3)} cubic units and surface area is ${surfaceArea.toFixed(3)} sq units.`
      };
    }
  },
  {
    id: 'torus-donut-volume-surface-calc',
    name: 'Torus (Donut Ring) Volume & Surface Area Calculator',
    category: 'math',
    subCategory: 'Geometry & 3D Solids',
    description: 'Calculate volume and surface area of a circular ring torus from major radius R (center of hole to center of tube) and minor radius r (tube radius).',
    formula: 'Volume = 2 * π² * R * r²; Surface Area = 4 * π² * R * r',
    inputs: [
      { id: 'majorRadiusR', label: 'Major Radius (R, from center to tube center)', type: 'number', defaultValue: 10.0, min: 0.1, max: 10000, step: 0.5 },
      { id: 'minorRadiusR', label: 'Minor Radius (r, cross-section tube radius)', type: 'number', defaultValue: 3.0, min: 0.05, max: 10000, step: 0.25 }
    ],
    calculate: (inputs) => {
      const R = Math.max(0.1, Number(inputs.majorRadiusR) || 10.0);
      const r = Math.min(R, Math.max(0.01, Number(inputs.minorRadiusR) || 3.0));

      const volume = 2 * Math.pow(Math.PI, 2) * R * Math.pow(r, 2);
      const surfaceArea = 4 * Math.pow(Math.PI, 2) * R * r;
      const innerHoleDiameter = 2 * (R - r);
      const outerDiameter = 2 * (R + r);

      return {
        primaryValue: `V = ${volume.toFixed(3)} cubic units`,
        primaryLabel: 'Torus Ring Volume',
        secondaryMetrics: [
          { label: 'Total Surface Area', value: `${surfaceArea.toFixed(3)} sq units` },
          { label: 'Overall Outer Ring Diameter', value: `${outerDiameter.toFixed(2)} units` },
          { label: 'Inner Central Hole Diameter', value: `${innerHoleDiameter.toFixed(2)} units` },
          { label: 'Cross-Sectional Tube Area', value: `${(Math.PI * r * r).toFixed(3)} sq units` },
          { label: 'Centerline Circumference', value: `${(2 * Math.PI * R).toFixed(3)} units` }
        ],
        explanation: `A ring torus with major radius R = ${R} and tube radius r = ${r} has a volume of ${volume.toFixed(3)} cubic units, a surface area of ${surfaceArea.toFixed(3)} sq units, and an outer diameter of ${outerDiameter.toFixed(2)} units.`
      };
    }
  },
  // -------------------------------------------------------------
  // 2. STATISTICS, PROBABILITY & DISCRETE MATH
  // -------------------------------------------------------------
  {
    id: 'z-score-p-value-normal-dist-calc',
    name: 'Z-Score to P-Value & Standard Normal Distribution Calculator',
    category: 'math',
    subCategory: 'Statistics & Probability',
    description: 'Convert raw score X to standardized Z-score (Z = (X - μ)/σ) and calculate exact 1-tailed and 2-tailed cumulative P-values and percentiles.',
    formula: 'Z = (X - μ) / σ; Φ(Z) = 0.5 * [1 + erf(Z / √2)]',
    inputs: [
      { id: 'rawScoreX', label: 'Raw Observation Score (X)', type: 'number', defaultValue: 115, min: -100000, max: 100000, step: 1 },
      { id: 'populationMeanMu', label: 'Population / Sample Mean (μ)', type: 'number', defaultValue: 100, min: -100000, max: 100000, step: 1 },
      { id: 'standardDeviationSigma', label: 'Standard Deviation (σ)', type: 'number', defaultValue: 15, min: 0.001, max: 100000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const x = Number(inputs.rawScoreX) || 115;
      const mu = Number(inputs.populationMeanMu) || 100;
      const sigma = Math.max(0.0001, Number(inputs.standardDeviationSigma) || 15);

      const z = (x - mu) / sigma;

      // Error function approximation for standard normal CDF
      const erf = (t: number) => {
        const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        const sign = t < 0 ? -1 : 1;
        const absT = Math.abs(t);
        const k = 1.0 / (1.0 + p * absT);
        const poly = 1.0 - (((((a5 * k + a4) * k) + a3) * k + a2) * k + a1) * k * Math.exp(-absT * absT);
        return sign * poly;
      };

      const phi = 0.5 * (1 + erf(z / Math.sqrt(2)));
      const percentile = phi * 100;
      const pValueRight = 1 - phi;
      const pValueTwoTailed = 2 * (1 - 0.5 * (1 + erf(Math.abs(z) / Math.sqrt(2))));

      return {
        primaryValue: `Z = ${z.toFixed(3)} (${percentile.toFixed(2)}th Percentile)`,
        primaryLabel: 'Standardized Z-Score',
        secondaryMetrics: [
          { label: 'Cumulative Probability P(X ≤ x)', value: `${phi.toFixed(5)} (${percentile.toFixed(2)}%)` },
          { label: 'Upper Tail P-Value P(X > x)', value: `${pValueRight.toFixed(5)} (${(pValueRight * 100).toFixed(2)}%)` },
          { label: 'Two-Tailed P-Value', value: `${pValueTwoTailed.toFixed(5)}` },
          { label: 'Deviation from Mean', value: `${(x - mu) >= 0 ? '+' : ''}${(x - mu).toFixed(2)} points (${z.toFixed(2)}σ)` }
        ],
        explanation: `A score of ${x} against mean μ = ${mu} and σ = ${sigma} produces a Z-score of ${z.toFixed(3)}, placing the observation in the ${percentile.toFixed(2)}th percentile of a standard normal distribution.`
      };
    }
  },
  {
    id: 'poisson-distribution-events-calc',
    name: 'Poisson Distribution & Queue Event Probability Calculator',
    category: 'math',
    subCategory: 'Statistics & Probability',
    description: 'Calculate probability of observing exactly k independent events, P(X ≤ k), and P(X > k) given average occurrence rate λ.',
    formula: 'P(X = k) = (λ^k * e^(-λ)) / k!',
    inputs: [
      { id: 'averageRateLambda', label: 'Average Arrival Rate (λ events per interval)', type: 'number', defaultValue: 4.5, min: 0.01, max: 100, step: 0.1 },
      { id: 'targetOccurrencesK', label: 'Observed Events (k)', type: 'number', defaultValue: 3, min: 0, max: 50, step: 1 }
    ],
    calculate: (inputs) => {
      const lambda = Math.max(0.01, Number(inputs.averageRateLambda) || 4.5);
      const k = Math.max(0, Number(inputs.targetOccurrencesK) || 3);

      const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

      // Exact P(X = k)
      const pExact = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);

      // Cumulative P(X <= k)
      let pCdf = 0;
      for (let i = 0; i <= k; i++) {
        pCdf += (Math.pow(lambda, i) * Math.exp(-lambda)) / factorial(i);
      }
      const pExceed = Math.max(0, 1 - pCdf);

      return {
        primaryValue: `${(pExact * 100).toFixed(3)}% (P = ${pExact.toFixed(4)})`,
        primaryLabel: `Probability of Exactly ${k} Events P(X = ${k})`,
        secondaryMetrics: [
          { label: `Cumulative At Most ${k} Events P(X ≤ ${k})`, value: `${(pCdf * 100).toFixed(3)}%` },
          { label: `More Than ${k} Events P(X > ${k})`, value: `${(pExceed * 100).toFixed(3)}%` },
          { label: 'Expected Value E[X]', value: `${lambda.toFixed(2)} events` },
          { label: 'Variance Var(X) & Std Dev', value: `Var = ${lambda.toFixed(2)}, σ = ${Math.sqrt(lambda).toFixed(3)}` }
        ],
        explanation: `With average rate λ = ${lambda}, the probability of observing exactly ${k} occurrences is ${(pExact * 100).toFixed(3)}%, with a ${(pCdf * 100).toFixed(3)}% chance of ${k} or fewer events.`
      };
    }
  },
  {
    id: 'geometric-sequence-series-calc',
    name: 'Geometric Sequence & Infinite Convergent Series Calculator',
    category: 'math',
    subCategory: 'Sequences & Series',
    description: 'Calculate nth term a_n = a₁ * r^(n-1), partial sum S_n, and infinite series sum S_∞ = a₁ / (1 - r) for convergent ratios |r| < 1.',
    formula: 'a_n = a₁ * r^(n-1); S_n = a₁*(1 - r^n)/(1 - r); S_∞ = a₁/(1 - r) if |r| < 1',
    inputs: [
      { id: 'firstTermA1', label: 'First Term (a₁)', type: 'number', defaultValue: 10, min: -10000, max: 10000, step: 1 },
      { id: 'commonRatioR', label: 'Common Ratio (r)', type: 'number', defaultValue: 0.5, min: -10, max: 10, step: 0.1 },
      { id: 'targetTermN', label: 'Term Number (n)', type: 'number', defaultValue: 6, min: 1, max: 100, step: 1 }
    ],
    calculate: (inputs) => {
      const a1 = Number(inputs.firstTermA1) || 10;
      const r = Number(inputs.commonRatioR) || 0.5;
      const n = Math.max(1, Number(inputs.targetTermN) || 6);

      const nthTerm = a1 * Math.pow(r, n - 1);
      const partialSum = r === 1 ? a1 * n : (a1 * (1 - Math.pow(r, n))) / (1 - r);

      let infiniteSumStr = '';
      if (Math.abs(r) < 1) {
        const sInf = a1 / (1 - r);
        infiniteSumStr = `${sInf.toFixed(4)} (Converges)`;
      } else {
        infiniteSumStr = 'Diverges to ±Infinity (|r| ≥ 1)';
      }

      // First 5 terms preview
      const previewTerms = [];
      for (let i = 1; i <= Math.min(5, n); i++) {
        previewTerms.push((a1 * Math.pow(r, i - 1)).toFixed(2));
      }

      return {
        primaryValue: `a_${n} = ${nthTerm.toFixed(4)}`,
        primaryLabel: `Value of Term #${n}`,
        secondaryMetrics: [
          { label: `Partial Sum of First ${n} Terms (S_${n})`, value: `${partialSum.toFixed(4)}` },
          { label: 'Infinite Series Sum (S_∞)', value: infiniteSumStr },
          { label: 'Sequence Progression (First 5 Terms)', value: `[${previewTerms.join(', ')}...]` },
          { label: 'Convergence Behavior', value: Math.abs(r) < 1 ? 'Convergent Geometric Series' : 'Divergent Geometric Series' }
        ],
        explanation: `In a geometric sequence with a₁ = ${a1} and ratio r = ${r}, the ${n}th term is ${nthTerm.toFixed(4)} and the sum of the first ${n} terms is ${partialSum.toFixed(4)}${Math.abs(r) < 1 ? ` (infinite sum converges to ${(a1 / (1 - r)).toFixed(4)})` : ''}.`
      };
    }
  },
  {
    id: 'chi-square-goodness-of-fit-calc',
    name: 'Chi-Square (χ²) Goodness-of-Fit & Contingency Test Calculator',
    category: 'math',
    subCategory: 'Statistics & Probability',
    description: 'Calculate Chi-Square test statistic χ² = ∑(O - E)²/E, degrees of freedom (df = k - 1), and goodness-of-fit significance.',
    formula: 'χ² = ∑ [(O_i - E_i)² / E_i] across categories 1 through k',
    inputs: [
      { id: 'observed1', label: 'Observed Category 1 (O₁)', type: 'number', defaultValue: 45, min: 0, max: 10000, step: 1 },
      { id: 'expected1', label: 'Expected Category 1 (E₁)', type: 'number', defaultValue: 35, min: 1, max: 10000, step: 1 },
      { id: 'observed2', label: 'Observed Category 2 (O₂)', type: 'number', defaultValue: 55, min: 0, max: 10000, step: 1 },
      { id: 'expected2', label: 'Expected Category 2 (E₂)', type: 'number', defaultValue: 65, min: 1, max: 10000, step: 1 }
    ],
    calculate: (inputs) => {
      const o1 = Number(inputs.observed1) || 45;
      const e1 = Math.max(0.1, Number(inputs.expected1) || 35);
      const o2 = Number(inputs.observed2) || 55;
      const e2 = Math.max(0.1, Number(inputs.expected2) || 65);

      const chi1 = Math.pow(o1 - e1, 2) / e1;
      const chi2 = Math.pow(o2 - e2, 2) / e2;
      const totalChiSq = chi1 + chi2;
      const df = 1; // 2 categories - 1

      // Critical values for df = 1: p=0.05 is 3.841, p=0.01 is 6.635
      let conclusion = '';
      if (totalChiSq >= 6.635) conclusion = 'Statistically Significant (p < 0.01) — Strong departure from expected';
      else if (totalChiSq >= 3.841) conclusion = 'Statistically Significant (p < 0.05) — Reject Null Hypothesis';
      else conclusion = 'Not Statistically Significant (p > 0.05) — Fail to Reject Null Hypothesis';

      return {
        primaryValue: `χ² = ${totalChiSq.toFixed(3)}`,
        primaryLabel: 'Chi-Square Test Statistic (df = 1)',
        secondaryMetrics: [
          { label: 'Significance Conclusion', value: conclusion },
          { label: 'Critical Threshold (α = 0.05)', value: '3.841 (df = 1)' },
          { label: 'Category 1 Contribution', value: `${chi1.toFixed(3)} (O=${o1}, E=${e1})` },
          { label: 'Category 2 Contribution', value: `${chi2.toFixed(3)} (O=${o2}, E=${e2})` },
          { label: 'Total Observed Sample Size', value: `${o1 + o2} observations` }
        ],
        explanation: `Comparing observed against expected distributions produces a Chi-Square statistic of χ² = ${totalChiSq.toFixed(3)} with df = 1 (${conclusion}).`
      };
    }
  },
  {
    id: 'f-ratio-anova-test-calc',
    name: 'ANOVA F-Statistic & Between/Within Variance Ratio Calculator',
    category: 'math',
    subCategory: 'Statistics & Probability',
    description: 'Calculate one-way ANOVA F-ratio (F = MS_between / MS_within) and variance explained ratio (η²) to test group mean equality.',
    formula: 'F = MSB / MSW = [SSB / (k - 1)] / [SSW / (N - k)]; Eta-Squared η² = SSB / (SSB + SSW)',
    inputs: [
      { id: 'sumSquaresBetween', label: 'Sum of Squares Between Groups (SSB)', type: 'number', defaultValue: 145.2, min: 0.1, max: 1000000, step: 1 },
      { id: 'sumSquaresWithin', label: 'Sum of Squares Within Groups / Error (SSW)', type: 'number', defaultValue: 280.5, min: 0.1, max: 1000000, step: 1 },
      { id: 'numberOfGroupsK', label: 'Number of Treatment Groups (k)', type: 'number', defaultValue: 3, min: 2, max: 50, step: 1 },
      { id: 'totalSampleSizeN', label: 'Total Sample Size (N)', type: 'number', defaultValue: 30, min: 3, max: 100000, step: 1 }
    ],
    calculate: (inputs) => {
      const ssb = Number(inputs.sumSquaresBetween) || 145.2;
      const ssw = Number(inputs.sumSquaresWithin) || 280.5;
      const k = Math.max(2, Number(inputs.numberOfGroupsK) || 3);
      const N = Math.max(k + 1, Number(inputs.totalSampleSizeN) || 30);

      const dfBetween = k - 1;
      const dfWithin = N - k;

      const msb = ssb / dfBetween;
      const msw = ssw / dfWithin;

      const fRatio = msb / msw;
      const etaSquared = ssb / (ssb + ssw);

      return {
        primaryValue: `F = ${fRatio.toFixed(3)}`,
        primaryLabel: `ANOVA F-Statistic (df₁ = ${dfBetween}, df₂ = ${dfWithin})`,
        secondaryMetrics: [
          { label: 'Mean Square Between (MSB)', value: `${msb.toFixed(3)} (Variance between group means)` },
          { label: 'Mean Square Within (MSW)', value: `${msw.toFixed(3)} (Unexplained error variance)` },
          { label: 'Effect Size (Eta-Squared η²)', value: `${(etaSquared * 100).toFixed(1)}% of total variance explained` },
          { label: 'Total Sum of Squares (SST)', value: `${(ssb + ssw).toFixed(2)}` },
          { label: 'Group Count / Total N', value: `${k} Groups / ${N} Total Subjects` }
        ],
        explanation: `With SSB = ${ssb} (df = ${dfBetween}) and SSW = ${ssw} (df = ${dfWithin}), the one-way ANOVA F-ratio is ${fRatio.toFixed(3)}, explaining ${(etaSquared * 100).toFixed(1)}% of variance.`
      };
    }
  }
];
