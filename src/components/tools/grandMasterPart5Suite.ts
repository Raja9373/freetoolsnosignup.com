import { CalculatorDefinition } from './calculatorEngine';

export const GRAND_MASTER_PART5_SUITE: CalculatorDefinition[] = [
  // -------------------------------------------------------------
  // 1. ADVANCED MATHEMATICAL, GEOMETRIC & SCIENTIFIC ENGINES
  // -------------------------------------------------------------
  {
    id: 'pyramid-surface-area-volume-calc',
    name: 'Right Regular Pyramid (Square & Triangular Base) Calculator',
    category: 'math',
    subCategory: 'Geometry & 3D Solids',
    description: 'Calculate volume V = 1/3 * Base * Height, slant height, lateral face surface area, and total surface area for square and rectangular pyramids.',
    formula: 'Volume = (1/3) * Base Area * Height; Slant Height s = √( (Base/2)² + Height² ); Lateral Area = 2 * Base * s',
    inputs: [
      { id: 'baseSideLength', label: 'Square Base Side Length (b)', type: 'number', defaultValue: 10, min: 0.1, max: 10000, step: 0.5 },
      { id: 'pyramidVerticalHeight', label: 'Vertical Height (h)', type: 'number', defaultValue: 12, min: 0.1, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const b = Math.max(0.1, Number(inputs.baseSideLength) || 10);
      const h = Math.max(0.1, Number(inputs.pyramidVerticalHeight) || 12);

      const baseArea = b * b;
      const volume = (1 / 3) * baseArea * h;
      const slantHeight = Math.sqrt(Math.pow(b / 2, 2) + Math.pow(h, 2));
      const lateralArea = 2 * b * slantHeight; // 4 triangular faces = 4 * (1/2 * b * s)
      const totalSurfaceArea = baseArea + lateralArea;
      const cornerEdgeLength = Math.sqrt(Math.pow(slantHeight, 2) + Math.pow(b / 2, 2));

      return {
        primaryValue: `V = ${volume.toFixed(3)} cubic units`,
        primaryLabel: `Square Pyramid Volume (Base ${b} × ${b}, Height ${h})`,
        secondaryMetrics: [
          { label: 'Slant Face Height (s)', value: `${slantHeight.toFixed(3)} units` },
          { label: 'Total Surface Area (Base + 4 Faces)', value: `${totalSurfaceArea.toFixed(3)} sq units` },
          { label: 'Lateral 4-Face Surface Area', value: `${lateralArea.toFixed(3)} sq units` },
          { label: 'Base Area', value: `${baseArea.toFixed(3)} sq units` },
          { label: 'Corner Slanted Edge Length', value: `${cornerEdgeLength.toFixed(3)} units` }
        ],
        explanation: `A square pyramid with base ${b} and height ${h} has a volume of ${volume.toFixed(3)} cubic units, face slant height of ${slantHeight.toFixed(3)}, and a total surface area of ${totalSurfaceArea.toFixed(3)}.`
      };
    }
  },
  {
    id: 'trapezoid-area-perimeter-calc',
    name: 'Trapezoid / Trapezium Area & Median Segment Calculator',
    category: 'math',
    subCategory: 'Geometry & Polygons',
    description: 'Calculate trapezoid area A = ((a + b)/2) * h, midline median length, perimeter, and diagonal lengths given base lengths and height.',
    formula: 'Area = ((Base_a + Base_b) / 2) * Height; Median Midline = (Base_a + Base_b) / 2',
    inputs: [
      { id: 'topBaseA', label: 'Top Parallel Base (a)', type: 'number', defaultValue: 8, min: 0.1, max: 10000, step: 0.5 },
      { id: 'bottomBaseB', label: 'Bottom Parallel Base (b)', type: 'number', defaultValue: 14, min: 0.1, max: 10000, step: 0.5 },
      { id: 'verticalHeightH', label: 'Perpendicular Height (h)', type: 'number', defaultValue: 6, min: 0.1, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const a = Math.max(0.1, Number(inputs.topBaseA) || 8);
      const b = Math.max(0.1, Number(inputs.bottomBaseB) || 14);
      const h = Math.max(0.1, Number(inputs.verticalHeightH) || 6);

      const median = (a + b) / 2;
      const area = median * h;

      // Assuming symmetric isosceles trapezoid for perimeter & diagonal calculation
      const sideProjection = Math.abs(b - a) / 2;
      const legLength = Math.sqrt(Math.pow(sideProjection, 2) + Math.pow(h, 2));
      const perimeter = a + b + 2 * legLength;
      const diagonal = Math.sqrt(Math.pow(b - sideProjection, 2) + Math.pow(h, 2));

      return {
        primaryValue: `Area = ${area.toFixed(3)} sq units`,
        primaryLabel: `Trapezoid Area (Bases ${a} & ${b}, Height ${h})`,
        secondaryMetrics: [
          { label: 'Midline Median Segment', value: `${median.toFixed(3)} units` },
          { label: 'Slanted Leg Length (Isosceles)', value: `${legLength.toFixed(3)} units` },
          { label: 'Total Perimeter (Isosceles)', value: `${perimeter.toFixed(3)} units` },
          { label: 'Diagonal Length (Isosceles)', value: `${diagonal.toFixed(3)} units` }
        ],
        explanation: `With parallel bases of ${a} and ${b} and height ${h}, the median midline is ${median.toFixed(3)} and the area is ${area.toFixed(3)} square units.`
      };
    }
  },
  {
    id: 'rhombus-area-diagonal-calc',
    name: 'Rhombus & Diamond Area, Perimeter & Diagonals Calculator',
    category: 'math',
    subCategory: 'Geometry & Polygons',
    description: 'Calculate rhombus area from diagonals d₁ and d₂ (A = 0.5 * d₁ * d₂), side length a = √( (d₁/2)² + (d₂/2)² ), and interior angles.',
    formula: 'Area = (d₁ * d₂) / 2; Side a = √( (d₁/2)² + (d₂/2)² ); Perimeter = 4 * a',
    inputs: [
      { id: 'diagonal1', label: 'First Diagonal (d₁)', type: 'number', defaultValue: 16, min: 0.1, max: 10000, step: 0.5 },
      { id: 'diagonal2', label: 'Second Diagonal (d₂)', type: 'number', defaultValue: 12, min: 0.1, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const d1 = Math.max(0.1, Number(inputs.diagonal1) || 16);
      const d2 = Math.max(0.1, Number(inputs.diagonal2) || 12);

      const area = (d1 * d2) / 2;
      const side = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
      const perimeter = 4 * side;
      const acuteAngleDeg = 2 * Math.atan((Math.min(d1, d2) / 2) / (Math.max(d1, d2) / 2)) * (180 / Math.PI);
      const obtuseAngleDeg = 180 - acuteAngleDeg;
      const inradius = area / (2 * side); // radius of inscribed circle

      return {
        primaryValue: `Area = ${area.toFixed(3)} sq units`,
        primaryLabel: `Rhombus Area (d₁=${d1}, d₂=${d2})`,
        secondaryMetrics: [
          { label: 'Side Length (a)', value: `${side.toFixed(3)} units` },
          { label: 'Total Perimeter (4a)', value: `${perimeter.toFixed(3)} units` },
          { label: 'Interior Angles', value: `${acuteAngleDeg.toFixed(1)}° and ${obtuseAngleDeg.toFixed(1)}°` },
          { label: 'Inscribed Circle Inradius (r)', value: `${inradius.toFixed(3)} units` }
        ],
        explanation: `A rhombus with diagonals of ${d1} and ${d2} has an area of ${area.toFixed(3)} sq units, side length of ${side.toFixed(3)}, and perimeter of ${perimeter.toFixed(3)}.`
      };
    }
  },
  {
    id: 'regular-polygon-n-gon-calc',
    name: 'Regular Polygon (Pentagon, Hexagon, Octagon, N-Gon) Calculator',
    category: 'math',
    subCategory: 'Geometry & Polygons',
    description: 'Calculate area, perimeter, apothem (inradius), circumradius, and interior/exterior angles for any regular n-sided polygon.',
    formula: 'Area = (n * s²) / (4 * tan(π/n)); Apothem a = s / (2 * tan(π/n)); Circumradius R = s / (2 * sin(π/n))',
    inputs: [
      { id: 'numberOfSidesN', label: 'Number of Sides (n) (e.g. 5=Pentagon, 6=Hexagon, 8=Octagon)', type: 'number', defaultValue: 6, min: 3, max: 1000, step: 1 },
      { id: 'sideLengthS', label: 'Side Length (s)', type: 'number', defaultValue: 10, min: 0.01, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const n = Math.min(1000, Math.max(3, Math.round(Number(inputs.numberOfSidesN) || 6)));
      const s = Math.max(0.01, Number(inputs.sideLengthS) || 10);

      const perimeter = n * s;
      const apothem = s / (2 * Math.tan(Math.PI / n));
      const circumradius = s / (2 * Math.sin(Math.PI / n));
      const area = (n * s * apothem) / 2;
      const interiorAngleDeg = ((n - 2) * 180) / n;
      const exteriorAngleDeg = 360 / n;
      const diagonalsCount = (n * (n - 3)) / 2;

      const polygonNames: Record<number, string> = {
        3: 'Equilateral Triangle', 4: 'Square', 5: 'Regular Pentagon', 6: 'Regular Hexagon',
        7: 'Regular Heptagon', 8: 'Regular Octagon', 9: 'Regular Nonagon', 10: 'Regular Decagon',
        12: 'Regular Dodecagon'
      };
      const polyName = polygonNames[n] || `Regular ${n}-gon`;

      return {
        primaryValue: `Area = ${area.toFixed(3)} sq units`,
        primaryLabel: `${polyName} Area (n = ${n}, s = ${s})`,
        secondaryMetrics: [
          { label: 'Apothem Inradius (a)', value: `${apothem.toFixed(3)} units` },
          { label: 'Circumscribed Radius (R)', value: `${circumradius.toFixed(3)} units` },
          { label: 'Total Perimeter (P)', value: `${perimeter.toFixed(3)} units` },
          { label: 'Interior Angle', value: `${interiorAngleDeg.toFixed(2)}° (Sum: ${((n - 2) * 180)}°)` },
          { label: 'Number of Geometric Diagonals', value: `${diagonalsCount} diagonals` }
        ],
        explanation: `A ${polyName} with ${n} sides of length ${s} has an apothem of ${apothem.toFixed(3)}, circumradius of ${circumradius.toFixed(3)}, and an area of ${area.toFixed(3)} sq units.`
      };
    }
  },
  {
    id: 'harmonic-mean-averages-calc',
    name: 'Harmonic Mean & Rate / Speed Averaging Calculator',
    category: 'math',
    subCategory: 'Statistics & Averages',
    description: 'Calculate true weighted Harmonic Mean H = n / ∑(1/x_i) for average speed over fixed distances, P/E ratios, and electronics parallel resistances.',
    formula: 'Harmonic Mean H = n / [ (1/x₁) + (1/x₂) + ... + (1/x_n) ]',
    inputs: [
      { id: 'speedRate1', label: 'Speed / Rate 1 (e.g. 60 mph outbound)', type: 'number', defaultValue: 60, min: 0.01, max: 100000, step: 1 },
      { id: 'speedRate2', label: 'Speed / Rate 2 (e.g. 40 mph return)', type: 'number', defaultValue: 40, min: 0.01, max: 100000, step: 1 },
      { id: 'speedRate3', label: 'Speed / Rate 3 (Optional 3rd leg, enter 0 to omit)', type: 'number', defaultValue: 0, min: 0, max: 100000, step: 1 }
    ],
    calculate: (inputs) => {
      const x1 = Math.max(0.001, Number(inputs.speedRate1) || 60);
      const x2 = Math.max(0.001, Number(inputs.speedRate2) || 40);
      const x3 = Number(inputs.speedRate3) || 0;

      const values = [x1, x2];
      if (x3 > 0) values.push(x3);

      const n = values.length;
      const sumReciprocals = values.reduce((sum, v) => sum + (1 / v), 0);
      const harmonicMean = n / sumReciprocals;

      const arithmeticMean = values.reduce((sum, v) => sum + v, 0) / n;
      const geometricMean = Math.pow(values.reduce((prod, v) => prod * v, 1), 1 / n);

      return {
        primaryValue: `H = ${harmonicMean.toFixed(2)}`,
        primaryLabel: 'True Harmonic Mean (Average Speed / Rate)',
        secondaryMetrics: [
          { label: 'Arithmetic Mean (AM)', value: `${arithmeticMean.toFixed(2)} (Overestimates speed)` },
          { label: 'Geometric Mean (GM)', value: `${geometricMean.toFixed(2)}` },
          { label: 'Pythagorean Means Inequality', value: `Harmonic (${harmonicMean.toFixed(2)}) ≤ Geometric (${geometricMean.toFixed(2)}) ≤ Arithmetic (${arithmeticMean.toFixed(2)})` },
          { label: 'Round-Trip Average Speed Law', value: 'Harmonic mean gives exact average speed over equal distances' }
        ],
        explanation: `For rates of [${values.join(', ')}], the true Harmonic Mean is ${harmonicMean.toFixed(2)} (unlike the simple arithmetic average of ${arithmeticMean.toFixed(2)}).`
      };
    }
  },
  {
    id: 'sound-attenuation-inverse-square-calc',
    name: 'Sound Attenuation & Inverse Square Law Distance Decibel Calculator',
    category: 'math',
    subCategory: 'Acoustics & Physics',
    description: 'Calculate acoustic decibel (dB SPL) drop over distance using the Inverse Square Law: sound level drops 6 dB for every doubling of distance in free field.',
    formula: 'L₂ = L₁ - 20 * log10(r₂ / r₁); Intensity I₂/I₁ = (r₁ / r₂)²',
    inputs: [
      { id: 'sourceSplDb', label: 'Sound Level at Reference Distance (L₁ in dB SPL)', type: 'number', defaultValue: 100, min: 0, max: 200, step: 1 },
      { id: 'referenceDistanceMeters', label: 'Reference Distance (r₁ in meters / feet)', type: 'number', defaultValue: 1, min: 0.1, max: 1000, step: 0.5 },
      { id: 'targetDistanceMeters', label: 'Target Distance (r₂ in meters / feet)', type: 'number', defaultValue: 10, min: 0.1, max: 50000, step: 1 }
    ],
    calculate: (inputs) => {
      const l1 = Number(inputs.sourceSplDb) || 100;
      const r1 = Math.max(0.01, Number(inputs.referenceDistanceMeters) || 1);
      const r2 = Math.max(0.01, Number(inputs.targetDistanceMeters) || 10);

      const distanceRatio = r2 / r1;
      const attenuationDb = 20 * Math.log10(distanceRatio);
      const l2 = l1 - attenuationDb;
      const intensityFactor = 1 / Math.pow(distanceRatio, 2);

      let perceptionLabel = '';
      if (l2 >= 120) perceptionLabel = 'Threshold of Pain (Siren / Jet Engine)';
      else if (l2 >= 90) perceptionLabel = 'Very Loud (Power Lawn Mower / Motorcycle)';
      else if (l2 >= 70) perceptionLabel = 'Moderate / Loud (Freeway Traffic / Vacuum)';
      else if (l2 >= 50) perceptionLabel = 'Conversational / Ambient (Office / Home)';
      else if (l2 >= 30) perceptionLabel = 'Quiet / Whisper (Library / Bedroom)';
      else perceptionLabel = 'Faint (Rustling Leaves / Pin Drop)';

      return {
        primaryValue: `${l2.toFixed(1)} dB SPL`,
        primaryLabel: `Sound Pressure Level at ${r2}m Distance`,
        secondaryMetrics: [
          { label: 'Acoustic Sound Attenuation Drop', value: `-${attenuationDb.toFixed(1)} dB SPL` },
          { label: 'Sound Wave Intensity (I₂/I₁)', value: `${(intensityFactor * 100).toFixed(2)}% of original power` },
          { label: 'Distance Multiplier Factor', value: `${distanceRatio.toFixed(1)}x further from source` },
          { label: 'Human Ear Loudness Perception', value: perceptionLabel }
        ],
        explanation: `Moving from ${r1}m (${l1} dB) to ${r2}m reduces sound pressure by ${attenuationDb.toFixed(1)} dB to ${l2.toFixed(1)} dB SPL (${perceptionLabel}).`
      };
    }
  },
  {
    id: 'f-stop-lens-exposure-calc',
    name: 'Camera Lens F-Stop, Aperture Diameter & Light Exposure Calculator',
    category: 'everyday',
    subCategory: 'Photography & Optics',
    description: 'Calculate physical entrance pupil aperture diameter in mm (D = f / N), relative light transmission EV stops, and Depth of Field aperture steps.',
    formula: 'Aperture Diameter D = Focal Length f / F-Number N; Light Transmission Ratio = 2^(ΔEV)',
    inputs: [
      { id: 'focalLengthMm', label: 'Lens Focal Length (mm)', type: 'number', defaultValue: 50, min: 4, max: 1200, step: 1 },
      { id: 'fStopNumber', label: 'Aperture F-Number (e.g. 1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11)', type: 'number', defaultValue: 1.8, min: 0.7, max: 64, step: 0.1 }
    ],
    calculate: (inputs) => {
      const focalMm = Number(inputs.focalLengthMm) || 50;
      const fStop = Math.max(0.5, Number(inputs.fStopNumber) || 1.8);

      const pupilDiameterMm = focalMm / fStop;
      const pupilAreaSqMm = Math.PI * Math.pow(pupilDiameterMm / 2, 2);

      // Relative light compared to f/2.8 standard
      const lightVsF28 = Math.pow(2.8 / fStop, 2);
      const evDiffFromF28 = Math.log2(lightVsF28);

      return {
        primaryValue: `${pupilDiameterMm.toFixed(1)} mm Entrance Pupil`,
        primaryLabel: `Physical Aperture Opening Diameter (${focalMm}mm @ f/${fStop})`,
        secondaryMetrics: [
          { label: 'Aperture Area Opening', value: `${pupilAreaSqMm.toFixed(1)} mm²` },
          { label: 'Light Gathering vs f/2.8', value: `${lightVsF28.toFixed(2)}x light (${evDiffFromF28 >= 0 ? '+' : ''}${evDiffFromF28.toFixed(1)} EV stops)` },
          { label: 'Depth of Field Characteristic', value: fStop <= 2.8 ? 'Shallow Depth of Field (Creamy Bokeh Portrait)' : fStop <= 8 ? 'Moderate Depth of Field (Street / Group)' : 'Deep Depth of Field (Landscape / Architecture)' },
          { label: 'Diffraction Warning', value: fStop >= 16 ? 'Diffraction softens fine sensor details above f/16' : 'Negligible optical diffraction' }
        ],
        explanation: `A ${focalMm}mm lens set to f/${fStop} creates a physical aperture iris opening of ${pupilDiameterMm.toFixed(1)} mm (${pupilAreaSqMm.toFixed(1)} mm²), transmitting ${lightVsF28.toFixed(2)}x as much light as f/2.8.`
      };
    }
  },
  {
    id: 'aspect-ratio-pixel-resizer-calc',
    name: 'Screen & Video Aspect Ratio (16:9, 4:3, 21:9) Pixel Resizer Calculator',
    category: 'everyday',
    subCategory: 'Video, Display & Imaging',
    description: 'Scale display resolutions, calculate target width/height maintaining exact aspect ratio, and compute total megapixels and aspect fraction.',
    formula: 'New Height = New Width / (Orig Width / Orig Height); New Width = New Height * Aspect Ratio',
    inputs: [
      { id: 'originalWidthPx', label: 'Original / Standard Width (Pixels)', type: 'number', defaultValue: 1920, min: 1, max: 100000, step: 10 },
      { id: 'originalHeightPx', label: 'Original / Standard Height (Pixels)', type: 'number', defaultValue: 1080, min: 1, max: 100000, step: 10 },
      { id: 'targetWidthPx', label: 'Target Resize Width (Pixels)', type: 'number', defaultValue: 3840, min: 1, max: 100000, step: 10 }
    ],
    calculate: (inputs) => {
      const origW = Math.max(1, Number(inputs.originalWidthPx) || 1920);
      const origH = Math.max(1, Number(inputs.originalHeightPx) || 1080);
      const targetW = Math.max(1, Number(inputs.targetWidthPx) || 3840);

      // GCD for simplified aspect ratio
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(Math.round(origW), Math.round(origH));
      const ratioW = Math.round(origW) / divisor;
      const ratioH = Math.round(origH) / divisor;

      const aspectRatioDecimal = origW / origH;
      const targetH = Math.round(targetW / aspectRatioDecimal);
      const totalPixels = targetW * targetH;
      const megaPixels = totalPixels / 1000000;

      return {
        primaryValue: `${targetW} × ${targetH} px (${megaPixels.toFixed(2)} MP)`,
        primaryLabel: `Proportional Scaled Resolution (${ratioW}:${ratioH} Aspect Ratio)`,
        secondaryMetrics: [
          { label: 'Simplified Aspect Ratio', value: `${ratioW}:${ratioH} (${aspectRatioDecimal.toFixed(3)}:1)` },
          { label: 'Original Resolution', value: `${origW} × ${origH} px (${(origW * origH / 1e6).toFixed(2)} MP)` },
          { label: 'Total Pixel Count', value: `${totalPixels.toLocaleString()} pixels` },
          { label: 'Standard Video Format Name', value: (targetW === 3840 && targetH === 2160) ? '4K Ultra HD (2160p)' : (targetW === 1920 && targetH === 1080) ? 'Full HD (1080p)' : (targetW === 2560 && targetH === 1440) ? 'Quad HD (1440p)' : 'Custom Resolution' }
        ],
        explanation: `Scaling a ${ratioW}:${ratioH} (${origW}x${origH}) image to ${targetW}px wide yields a proportional height of ${targetH}px (${megaPixels.toFixed(2)} Megapixels).`
      };
    }
  },
  {
    id: 'cagr-compound-annual-growth-calc',
    name: 'Compound Annual Growth Rate (CAGR) & Annualized Return Calculator',
    category: 'finance',
    subCategory: 'Investment & Growth',
    description: 'Calculate smoothed annualized CAGR percentage return = (End / Start)^(1/Years) - 1 and total absolute percentage gain.',
    formula: 'CAGR = (Ending Value / Beginning Value)^(1 / Number of Years) - 1',
    inputs: [
      { id: 'initialInvestment', label: 'Initial / Beginning Portfolio Value ($)', type: 'number', defaultValue: 10000, min: 1, max: 1000000000, step: 500 },
      { id: 'finalInvestment', label: 'Ending Portfolio Value ($)', type: 'number', defaultValue: 28500, min: 1, max: 1000000000, step: 500 },
      { id: 'investmentYears', label: 'Investment Holding Period (Years)', type: 'number', defaultValue: 5, min: 0.1, max: 100, step: 0.5 }
    ],
    calculate: (inputs) => {
      const start = Math.max(1, Number(inputs.initialInvestment) || 10000);
      const end = Math.max(1, Number(inputs.finalInvestment) || 28500);
      const years = Math.max(0.1, Number(inputs.investmentYears) || 5);

      const cagr = (Math.pow(end / start, 1 / years) - 1) * 100;
      const totalGainDollars = end - start;
      const totalGainPercent = (totalGainDollars / start) * 100;
      const multipleOfMoney = end / start;

      return {
        primaryValue: `${cagr.toFixed(2)}% Compound Annual Return`,
        primaryLabel: 'CAGR Annualized Growth Rate',
        secondaryMetrics: [
          { label: 'Total Absolute Return', value: `${totalGainPercent >= 0 ? '+' : ''}${totalGainPercent.toFixed(1)}% (+$${Math.round(totalGainDollars).toLocaleString()})` },
          { label: 'Money Multiple (MOIC)', value: `${multipleOfMoney.toFixed(2)}x initial capital` },
          { label: 'Rule of 72 Doubling Time at this CAGR', value: cagr > 0 ? `~${(72 / cagr).toFixed(1)} Years to double` : 'N/A' },
          { label: 'Holding Period Duration', value: `${years} Years` }
        ],
        explanation: `Growing from $${start.toLocaleString()} to $${end.toLocaleString()} over ${years} years represents a ${cagr.toFixed(2)}% Compound Annual Growth Rate (a ${multipleOfMoney.toFixed(2)}x gain of $${Math.round(totalGainDollars).toLocaleString()}).`
      };
    }
  },
  {
    id: 'ohms-law-power-wheel-calc',
    name: 'Ohm\'s Law & Electric Power Wheel (V = IR, P = VI, P = I²R) Calculator',
    category: 'math',
    subCategory: 'Electronics & Engineering',
    description: 'Calculate Voltage (V), Current (I), Resistance (R), and Power (Watts) across the 12 classic Ohm\'s Law electrical formulas.',
    formula: 'V = I * R; P = V * I = I² * R = V² / R; I = V / R = P / V = √(P / R)',
    inputs: [
      { id: 'circuitVoltageVolts', label: 'Voltage (V in Volts)', type: 'number', defaultValue: 120, min: 0.1, max: 100000, step: 1 },
      { id: 'circuitResistanceOhms', label: 'Resistance (R in Ohms, Ω)', type: 'number', defaultValue: 24, min: 0.001, max: 10000000, step: 1 }
    ],
    calculate: (inputs) => {
      const v = Math.max(0.001, Number(inputs.circuitVoltageVolts) || 120);
      const r = Math.max(0.001, Number(inputs.circuitResistanceOhms) || 24);

      const currentAmps = v / r;
      const powerWatts = v * currentAmps;
      const powerKw = powerWatts / 1000;
      const energyPerDayKwh = (powerWatts * 24) / 1000;

      return {
        primaryValue: `${currentAmps.toFixed(2)} Amperes (Amps)`,
        primaryLabel: 'Electric Current Flow (I)',
        secondaryMetrics: [
          { label: 'Electrical Power Dissipated', value: `${powerWatts.toFixed(1)} Watts (${powerKw.toFixed(3)} kW)` },
          { label: 'Circuit Voltage (V)', value: `${v} Volts` },
          { label: 'Circuit Resistance (R)', value: `${r} Ohms (Ω)` },
          { label: 'Continuous Daily Energy Usage', value: `${energyPerDayKwh.toFixed(2)} kWh/day` }
        ],
        explanation: `A ${v}V potential across a ${r}Ω load draws ${currentAmps.toFixed(2)} Amps and dissipates ${powerWatts.toFixed(1)} Watts (${powerKw.toFixed(3)} kW) of electrical power.`
      };
    }
  },
  {
    id: 'golden-ratio-phi-dimensions-calc',
    name: 'Golden Ratio (φ = 1.618033) Dimension & Layout Calculator',
    category: 'math',
    subCategory: 'Art, Design & Geometry',
    description: 'Calculate harmonic Fibonacci Golden Ratio proportions (A = B * 1.618, A + B = A * 1.618) for UI layouts, architecture, and photography grids.',
    formula: 'Major Dimension A = Total / φ = Total * 0.618033; Minor Dimension B = Total - A; φ ≈ 1.6180339887',
    inputs: [
      { id: 'totalDimensionUnits', label: 'Total Canvas / Frame Length (Units)', type: 'number', defaultValue: 1000, min: 1, max: 1000000, step: 10 }
    ],
    calculate: (inputs) => {
      const total = Math.max(1, Number(inputs.totalDimensionUnits) || 1000);
      const phi = (1 + Math.sqrt(5)) / 2; // 1.618033988749895

      const majorA = total / phi;
      const minorB = total - majorA;
      const goldenRectangleHeight = total / phi;

      return {
        primaryValue: `Major: ${majorA.toFixed(2)} | Minor: ${minorB.toFixed(2)}`,
        primaryLabel: 'Golden Ratio Split (61.8% / 38.2%)',
        secondaryMetrics: [
          { label: 'Major Segment (A = 61.803%)', value: `${majorA.toFixed(2)} units` },
          { label: 'Minor Segment (B = 38.197%)', value: `${minorB.toFixed(2)} units` },
          { label: 'Golden Rectangle Proportion', value: `${total} × ${goldenRectangleHeight.toFixed(2)} units` },
          { label: 'Phi Constant (φ)', value: '1.618033988749895...' }
        ],
        explanation: `Dividing a total span of ${total} by the Golden Ratio yields a harmonious major segment of ${majorA.toFixed(2)} (61.8%) and minor segment of ${minorB.toFixed(2)} (38.2%).`
      };
    }
  },
  {
    id: 'parabolic-satellite-dish-focus-calc',
    name: 'Parabolic Dish Focal Length & Depth Calculator',
    category: 'math',
    subCategory: 'Optics & Antennas',
    description: 'Calculate focal point distance (f = D² / (16 * d)), f/D ratio, and surface area for satellite dishes, solar concentrators, and parabolic reflectors.',
    formula: 'Focal Distance f = Diameter² / (16 * Depth); f/D Ratio = f / Diameter',
    inputs: [
      { id: 'dishDiameterInches', label: 'Parabolic Dish Diameter (D in inches)', type: 'number', defaultValue: 36, min: 1, max: 1000, step: 1 },
      { id: 'dishDepthInches', label: 'Dish Center Depth / Concavity (d in inches)', type: 'number', defaultValue: 6, min: 0.1, max: 500, step: 0.5 }
    ],
    calculate: (inputs) => {
      const D = Math.max(1, Number(inputs.dishDiameterInches) || 36);
      const d = Math.max(0.1, Number(inputs.dishDepthInches) || 6);

      const focalLengthInches = (D * D) / (16 * d);
      const fOverD = focalLengthInches / D;

      // Paraboloid surface area: S = (π * D / (48 * d²)) * [ (D² + 16d²)^(3/2) - D³ ]
      const term = Math.pow(D * D + 16 * d * d, 1.5);
      const surfaceAreaSqIn = (Math.PI / (48 * d * d)) * (term - Math.pow(D, 3));

      return {
        primaryValue: `${focalLengthInches.toFixed(2)} inches from vertex`,
        primaryLabel: 'Focal Point Distance (f)',
        secondaryMetrics: [
          { label: 'f/D Ratio', value: `${fOverD.toFixed(3)} (Prime focus receiver positioning)` },
          { label: 'Surface Area of Dish', value: `${(surfaceAreaSqIn / 144).toFixed(2)} sq ft (${Math.round(surfaceAreaSqIn)} sq in)` },
          { label: 'Aperture Circular Area', value: `${((Math.PI * Math.pow(D / 2, 2)) / 144).toFixed(2)} sq ft` },
          { label: 'Parabola Equation', value: `y = x² / ${(4 * focalLengthInches).toFixed(2)}` }
        ],
        explanation: `A ${D}" diameter parabolic dish with ${d}" central depth has its focal point at ${focalLengthInches.toFixed(2)}" with an f/D ratio of ${fOverD.toFixed(3)}.`
      };
    }
  },
  {
    id: 'horizontal-cylinder-dipstick-tank-calc',
    name: 'Horizontal Cylindrical Fuel Tank Liquid Level Dipstick Calculator',
    category: 'construction',
    subCategory: 'Tanks & Liquid Storage',
    description: 'Calculate liquid volume in a horizontal cylindrical oil/fuel tank given diameter, length, and dipstick liquid depth.',
    formula: 'Segment Area = r² * arccos((r - h)/r) - (r - h)*√(2rh - h²); Volume = Area * Tank Length',
    inputs: [
      { id: 'tankDiameterInches', label: 'Tank Diameter (Inches)', type: 'number', defaultValue: 48, min: 6, max: 500, step: 1 },
      { id: 'tankLengthInches', label: 'Tank Length (Inches)', type: 'number', defaultValue: 72, min: 6, max: 2000, step: 1 },
      { id: 'liquidDepthInches', label: 'Dipstick Measured Liquid Depth (Inches)', type: 'number', defaultValue: 18, min: 0.1, max: 500, step: 0.5 }
    ],
    calculate: (inputs) => {
      const d = Math.max(6, Number(inputs.tankDiameterInches) || 48);
      const l = Math.max(6, Number(inputs.tankLengthInches) || 72);
      const h = Math.min(d, Math.max(0.01, Number(inputs.liquidDepthInches) || 18));

      const r = d / 2;
      // Circular segment area: r² * arccos((r - h)/r) - (r - h)*sqrt(2rh - h²)
      const cosArg = Math.min(1, Math.max(-1, (r - h) / r));
      const segmentAreaSqIn = r * r * Math.acos(cosArg) - (r - h) * Math.sqrt(Math.max(0, 2 * r * h - h * h));
      const liquidVolumeCuIn = segmentAreaSqIn * l;
      const liquidGallons = liquidVolumeCuIn / 231;
      const liquidLiters = liquidGallons * 3.78541;

      const totalTankCuIn = Math.PI * r * r * l;
      const totalTankGallons = totalTankCuIn / 231;
      const percentFull = (liquidGallons / totalTankGallons) * 100;

      return {
        primaryValue: `${liquidGallons.toFixed(1)} Gallons (${percentFull.toFixed(1)}% Full)`,
        primaryLabel: `Liquid Volume at ${h}" Dipstick Reading`,
        secondaryMetrics: [
          { label: 'Liquid in Liters', value: `${liquidLiters.toFixed(1)} Liters` },
          { label: 'Total Full Tank Capacity', value: `${totalTankGallons.toFixed(1)} Gallons (${(totalTankGallons * 3.78541).toFixed(1)} L)` },
          { label: 'Remaining Empty Ullage', value: `${(totalTankGallons - liquidGallons).toFixed(1)} Gallons` },
          { label: 'Tank Dimensions', value: `${d}" Diameter × ${l}" Length` }
        ],
        explanation: `With a ${h}" dipstick reading in a ${d}" x ${l}" horizontal tank, the vessel contains ${liquidGallons.toFixed(1)} gallons (${percentFull.toFixed(1)}% of its ${totalTankGallons.toFixed(1)} gallon total capacity).`
      };
    }
  },
  {
    id: 'debt-to-equity-leverage-calc',
    name: 'Debt-to-Equity (D/E) & Financial Solvency Ratio Calculator',
    category: 'finance',
    subCategory: 'Corporate Finance & Valuation',
    description: 'Calculate Debt-to-Equity ratio, Debt-to-Capital ratio, and financial leverage index to assess insolvency risk and balance sheet health.',
    formula: 'D/E Ratio = Total Debt / Total Shareholder Equity; Debt-to-Capital = Total Debt / (Total Debt + Equity)',
    inputs: [
      { id: 'totalDebtDollars', label: 'Total Short & Long-Term Debt ($)', type: 'number', defaultValue: 3500000, min: 0, max: 10000000000, step: 25000 },
      { id: 'totalEquityDollars', label: 'Total Shareholder Equity ($)', type: 'number', defaultValue: 5000000, min: 1000, max: 10000000000, step: 25000 }
    ],
    calculate: (inputs) => {
      const debt = Number(inputs.totalDebtDollars) || 3500000;
      const equity = Math.max(1, Number(inputs.totalEquityDollars) || 5000000);

      const deRatio = debt / equity;
      const totalCapital = debt + equity;
      const debtToCapitalPercent = (debt / totalCapital) * 100;
      const financialLeverageMultiplier = totalCapital / equity;

      let riskAssessment = '';
      if (deRatio <= 0.5) riskAssessment = 'Low Financial Leverage (Conservative Balance Sheet)';
      else if (deRatio <= 1.5) riskAssessment = 'Moderate / Healthy Leverage (Standard Corporate Range)';
      else if (deRatio <= 2.5) riskAssessment = 'Elevated Financial Leverage (Heightened Interest Sensitivity)';
      else riskAssessment = 'High Financial Leverage (High Insolvency / Refinancing Risk)';

      return {
        primaryValue: `${deRatio.toFixed(2)}x D/E`,
        primaryLabel: 'Debt-to-Equity Ratio',
        secondaryMetrics: [
          { label: 'Risk Assessment', value: riskAssessment },
          { label: 'Debt-to-Total-Capitalization', value: `${debtToCapitalPercent.toFixed(1)}% Debt / ${(100 - debtToCapitalPercent).toFixed(1)}% Equity` },
          { label: 'Equity Multiplier (Assets/Equity)', value: `${financialLeverageMultiplier.toFixed(2)}x` },
          { label: 'Total Capital Base', value: `$${Math.round(totalCapital).toLocaleString()}` }
        ],
        explanation: `With $${debt.toLocaleString()} in debt and $${equity.toLocaleString()} in equity, the D/E ratio is ${deRatio.toFixed(2)}x (${debtToCapitalPercent.toFixed(1)}% debt-to-capital, indicating ${riskAssessment}).`
      };
    }
  }
];
