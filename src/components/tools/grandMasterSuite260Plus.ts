import { CalculatorDefinition } from './calculatorEngine';

export const GRAND_MASTER_SUITE_260_PLUS: CalculatorDefinition[] = [
  // -------------------------------------------------------------
  // 1. ADVANCED PHYSICS, CHEMISTRY & ENGINEERING CALCULATORS
  // -------------------------------------------------------------
  {
    id: 'ideal-gas-law-pv-nrt-calc',
    name: 'Ideal Gas Law (PV = nRT) State Variable Calculator',
    category: 'math',
    subCategory: 'Physics & Thermodynamics',
    description: 'Solve for Pressure (P), Volume (V), Moles (n), or Temperature (T) using the Universal Gas Constant R = 0.08206 L·atm/(mol·K) / 8.314 J/(mol·K).',
    formula: 'P = (n * R * T) / V; V = (n * R * T) / P; n = (P * V) / (R * T); T = (P * V) / (n * R)',
    inputs: [
      { id: 'pressureAtm', label: 'Pressure (P in Atmospheres, atm)', type: 'number', defaultValue: 1.0, min: 0.001, max: 1000, step: 0.1 },
      { id: 'volumeLiters', label: 'Volume (V in Liters, L)', type: 'number', defaultValue: 22.414, min: 0.001, max: 100000, step: 0.5 },
      { id: 'temperatureCelsius', label: 'Temperature (°C)', type: 'number', defaultValue: 0, min: -273.15, max: 5000, step: 1 }
    ],
    calculate: (inputs) => {
      const P = Math.max(0.0001, Number(inputs.pressureAtm) || 1.0);
      const V = Math.max(0.0001, Number(inputs.volumeLiters) || 22.414);
      const c = Number(inputs.temperatureCelsius) || 0;
      const T_Kelvin = Math.max(0.01, c + 273.15);

      const R_atm = 0.082057338; // L*atm/(mol*K)
      const R_si = 8.314462618; // J/(mol*K)

      const molesN = (P * V) / (R_atm * T_Kelvin);
      const molecules = molesN * 6.02214076e23; // Avogadro's number
      const pressureKPa = P * 101.325;
      const volumeM3 = V / 1000;

      return {
        primaryValue: `${molesN.toFixed(4)} Moles of Gas`,
        primaryLabel: 'Substance Amount (n)',
        secondaryMetrics: [
          { label: 'Total Gas Molecules', value: molecules.toExponential(4) },
          { label: 'Temperature in Kelvin', value: `${T_Kelvin.toFixed(2)} K` },
          { label: 'Pressure in kPa', value: `${pressureKPa.toFixed(2)} kPa` },
          { label: 'Volume in Cubic Meters (m³)', value: `${volumeM3.toFixed(4)} m³` },
          { label: 'Molar Volume at this state', value: `${(V / molesN).toFixed(3)} L/mol` }
        ],
        explanation: `Under ${P} atm pressure, ${V} L volume, and ${c}°C (${T_Kelvin.toFixed(2)} K), PV = nRT dictates the system contains ${molesN.toFixed(4)} moles of gas (~${molecules.toExponential(3)} particles).`
      };
    }
  },
  {
    id: 'projectile-motion-kinematics-calc',
    name: 'Projectile Motion & Trajectory Calculator',
    category: 'math',
    subCategory: 'Physics & Mechanics',
    description: 'Calculate maximum flight height, horizontal range distance, flight time, and impact velocity for ballistic 2D projectile trajectories under gravity.',
    formula: 'Range = (v₀² * sin(2θ)) / g; Peak Height = (v₀² * sin²(θ)) / (2g); Time = (2 * v₀ * sin(θ)) / g',
    inputs: [
      { id: 'initialVelocityMps', label: 'Initial Launch Velocity (v₀, m/s)', type: 'number', defaultValue: 45, min: 0.1, max: 5000, step: 1 },
      { id: 'launchAngleDegrees', label: 'Launch Angle (θ in Degrees)', type: 'number', defaultValue: 45, min: 0.1, max: 89.9, step: 0.5 },
      { id: 'initialHeightMeters', label: 'Initial Elevation Height (y₀, meters)', type: 'number', defaultValue: 0, min: 0, max: 10000, step: 1 }
    ],
    calculate: (inputs) => {
      const v0 = Math.max(0.1, Number(inputs.initialVelocityMps) || 45);
      const angleDeg = Math.min(89.9, Math.max(0.1, Number(inputs.launchAngleDegrees) || 45));
      const y0 = Math.max(0, Number(inputs.initialHeightMeters) || 0);

      const g = 9.80665;
      const thetaRad = angleDeg * (Math.PI / 180);

      const vx = v0 * Math.cos(thetaRad);
      const vy = v0 * Math.sin(thetaRad);

      const peakTime = vy / g;
      const maxAltitude = y0 + (vy * vy) / (2 * g);

      // Total time of flight solving quadratic: y(t) = y0 + vy*t - 0.5*g*t^2 = 0
      const totalTime = (vy + Math.sqrt(vy * vy + 2 * g * y0)) / g;
      const horizontalRange = vx * totalTime;
      const vyFinal = vy - g * totalTime;
      const impactVelocity = Math.sqrt(vx * vx + vyFinal * vyFinal);
      const impactAngle = Math.atan2(Math.abs(vyFinal), vx) * (180 / Math.PI);

      return {
        primaryValue: `${horizontalRange.toFixed(2)} meters (${(horizontalRange * 3.28084).toFixed(1)} ft)`,
        primaryLabel: 'Total Horizontal Trajectory Range',
        secondaryMetrics: [
          { label: 'Maximum Apex Altitude', value: `${maxAltitude.toFixed(2)} m (${(maxAltitude * 3.28084).toFixed(1)} ft)` },
          { label: 'Total Flight Hang Time', value: `${totalTime.toFixed(2)} seconds` },
          { label: 'Time to Peak Apex', value: `${peakTime.toFixed(2)} seconds` },
          { label: 'Final Impact Velocity', value: `${impactVelocity.toFixed(2)} m/s (${(impactVelocity * 3.6).toFixed(1)} km/h)` },
          { label: 'Terminal Impact Angle', value: `-${impactAngle.toFixed(1)}° below horizontal` }
        ],
        explanation: `Launching at ${v0} m/s at a ${angleDeg}° angle yields a total flight distance of ${horizontalRange.toFixed(2)} m with an apex height of ${maxAltitude.toFixed(2)} m and a hang time of ${totalTime.toFixed(2)} s.`
      };
    }
  },
  {
    id: 'doppler-effect-frequency-shift-calc',
    name: 'Doppler Effect Acoustic & Wave Frequency Calculator',
    category: 'math',
    subCategory: 'Physics & Acoustics',
    description: 'Calculate shifted observed acoustic frequency f\' when sound source and observer move toward or away from each other in a medium.',
    formula: 'f\' = f₀ * [(v_sound ± v_observer) / (v_sound ∓ v_source)]',
    inputs: [
      { id: 'sourceFrequencyHz', label: 'Emitted Source Frequency (f₀, Hz)', type: 'number', defaultValue: 1000, min: 1, max: 100000, step: 10 },
      { id: 'speedOfSoundMps', label: 'Speed of Sound in Medium (v, m/s) (343 m/s in air 20°C)', type: 'number', defaultValue: 343, min: 100, max: 6000, step: 1 },
      { id: 'sourceVelocityMps', label: 'Source Speed (m/s) (+ Toward Observer, - Away)', type: 'number', defaultValue: 30, min: -300, max: 300, step: 1 },
      { id: 'observerVelocityMps', label: 'Observer Speed (m/s) (+ Toward Source, - Away)', type: 'number', defaultValue: 0, min: -300, max: 300, step: 1 }
    ],
    calculate: (inputs) => {
      const f0 = Math.max(1, Number(inputs.sourceFrequencyHz) || 1000);
      const v = Math.max(1, Number(inputs.speedOfSoundMps) || 343);
      const vSrc = Number(inputs.sourceVelocityMps) || 30;
      const vObs = Number(inputs.observerVelocityMps) || 0;

      // Approaching: numerator adds vObs, denominator subtracts vSrc
      const denom = Math.max(1, v - vSrc);
      const numer = v + vObs;
      const fObserved = f0 * (numer / denom);
      const deltaF = fObserved - f0;
      const percentShift = (deltaF / f0) * 100;

      return {
        primaryValue: `${fObserved.toFixed(2)} Hz`,
        primaryLabel: 'Observed Shifted Frequency (f\')',
        secondaryMetrics: [
          { label: 'Frequency Shift (Δf)', value: `${deltaF >= 0 ? '+' : ''}${deltaF.toFixed(2)} Hz (${percentShift >= 0 ? '+' : ''}${percentShift.toFixed(2)}%)` },
          { label: 'Emitted Frequency (f₀)', value: `${f0} Hz` },
          { label: 'Mach Number of Source', value: `Mach ${(Math.abs(vSrc) / v).toFixed(3)}` },
          { label: 'Doppler Shift Pitch Change', value: deltaF > 0 ? 'Higher Pitch (Approaching Blue-Shift)' : 'Lower Pitch (Receding Red-Shift)' }
        ],
        explanation: `With a ${f0} Hz source moving at ${vSrc} m/s relative to an observer at ${vObs} m/s in 343 m/s air, the observed frequency shifts to ${fObserved.toFixed(2)} Hz (${percentShift >= 0 ? '+' : ''}${percentShift.toFixed(2)}%).`
      };
    }
  },
  {
    id: 'specific-heat-thermal-energy-calc',
    name: 'Specific Heat & Calorimetry Heat Transfer (Q = mcΔT) Calculator',
    category: 'math',
    subCategory: 'Physics & Thermodynamics',
    description: 'Calculate thermal heat energy absorbed or released (Joules/Calories), mass, temperature change, or specific heat capacity.',
    formula: 'Q = m * c * ΔT; 1 cal = 4.184 J; 1 BTU = 1055.06 J',
    inputs: [
      { id: 'massGrams', label: 'Mass of Substance (m in grams)', type: 'number', defaultValue: 500, min: 0.1, max: 10000000, step: 10 },
      { id: 'specificHeat', label: 'Specific Heat Capacity (c in J/(g·°C)) (Water = 4.184, Iron = 0.45, Aluminum = 0.897)', type: 'number', defaultValue: 4.184, min: 0.01, max: 10, step: 0.01 },
      { id: 'initialTempC', label: 'Initial Temperature (T₁ in °C)', type: 'number', defaultValue: 20, min: -273.15, max: 3000, step: 1 },
      { id: 'finalTempC', label: 'Final Temperature (T₂ in °C)', type: 'number', defaultValue: 80, min: -273.15, max: 3000, step: 1 }
    ],
    calculate: (inputs) => {
      const m = Math.max(0.01, Number(inputs.massGrams) || 500);
      const c = Math.max(0.001, Number(inputs.specificHeat) || 4.184);
      const t1 = Number(inputs.initialTempC) || 20;
      const t2 = Number(inputs.finalTempC) || 80;

      const deltaT = t2 - t1;
      const Q_Joules = m * c * deltaT;
      const Q_kJ = Q_Joules / 1000;
      const Q_kcal = Math.abs(Q_Joules) / 4184;
      const Q_btu = Math.abs(Q_Joules) / 1055.06;
      const Q_kwh = Math.abs(Q_Joules) / 3600000;

      return {
        primaryValue: `${Q_kJ.toFixed(2)} kJ (${Math.round(Q_Joules).toLocaleString()} J)`,
        primaryLabel: deltaT >= 0 ? 'Thermal Heat Energy Absorbed (Endothermic)' : 'Thermal Heat Energy Released (Exothermic)',
        secondaryMetrics: [
          { label: 'Energy in Kilocalories (kcal / dietary Cal)', value: `${Q_kcal.toFixed(2)} kcal` },
          { label: 'Energy in British Thermal Units (BTU)', value: `${Q_btu.toFixed(2)} BTU` },
          { label: 'Energy in Kilowatt-Hours (kWh)', value: `${Q_kwh.toFixed(4)} kWh` },
          { label: 'Temperature Change (ΔT)', value: `${deltaT >= 0 ? '+' : ''}${deltaT.toFixed(2)} °C (${(deltaT * 1.8).toFixed(2)} °F)` },
          { label: 'Total Mass Heated/Cooled', value: `${m} g (${(m / 1000).toFixed(3)} kg)` }
        ],
        explanation: `Heating ${m}g of substance with specific heat c = ${c} J/(g·°C) from ${t1}°C to ${t2}°C (ΔT = ${deltaT}°C) requires ${Q_kJ.toFixed(2)} kJ (${Q_kcal.toFixed(2)} kcal / ${Q_kwh.toFixed(4)} kWh).`
      };
    }
  },
  {
    id: 'resistor-color-code-4-5-band-calc',
    name: 'Resistor Color Code (4-Band & 5-Band EIA) Calculator',
    category: 'math',
    subCategory: 'Electronics & Engineering',
    description: 'Decode electronics resistor values in Ohms (Ω), tolerance percentage, and standard E-series ranges from color bands.',
    formula: '4-Band: Value = (Band1*10 + Band2) * 10^Multiplier ± Tolerance%',
    inputs: [
      { id: 'band1Digit', label: '1st Band (0=Black, 1=Brown, 2=Red, 3=Orange, 4=Yellow, 5=Green, 6=Blue, 7=Violet, 8=Gray, 9=White)', type: 'number', defaultValue: 4, min: 1, max: 9, step: 1 },
      { id: 'band2Digit', label: '2nd Band (0=Black, 1=Brown, 2=Red, 3=Orange, 4=Yellow, 5=Green, 6=Blue, 7=Violet, 8=Gray, 9=White)', type: 'number', defaultValue: 7, min: 0, max: 9, step: 1 },
      { id: 'multiplierPower', label: 'Multiplier Power (0=1Ω, 1=10Ω, 2=100Ω, 3=1kΩ, 4=10kΩ, 5=100kΩ, 6=1MΩ)', type: 'number', defaultValue: 2, min: 0, max: 8, step: 1 },
      { id: 'tolerancePercent', label: 'Tolerance Band (1=1% Brown, 2=2% Red, 5=5% Gold, 10=10% Silver)', type: 'number', defaultValue: 5, min: 0.1, max: 20, step: 1 }
    ],
    calculate: (inputs) => {
      const b1 = Math.min(9, Math.max(1, Number(inputs.band1Digit) || 4));
      const b2 = Math.min(9, Math.max(0, Number(inputs.band2Digit) || 7));
      const mult = Math.min(8, Math.max(0, Number(inputs.multiplierPower) || 2));
      const tol = Number(inputs.tolerancePercent) || 5;

      const baseVal = (b1 * 10 + b2) * Math.pow(10, mult);
      const minVal = baseVal * (1 - tol / 100);
      const maxVal = baseVal * (1 + tol / 100);

      const formatOhms = (ohms: number) => {
        if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(2)} MΩ`;
        if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(2)} kΩ`;
        return `${ohms.toFixed(1)} Ω`;
      };

      return {
        primaryValue: `${formatOhms(baseVal)} ±${tol}%`,
        primaryLabel: 'Nominal Resistor Resistance',
        secondaryMetrics: [
          { label: 'Minimum Resistance (Lower Bound)', value: formatOhms(minVal) },
          { label: 'Maximum Resistance (Upper Bound)', value: formatOhms(maxVal) },
          { label: 'Tolerance Range Spread (ΔR)', value: `±${formatOhms(baseVal * (tol / 100))}` },
          { label: 'EIA Standard Value Series', value: 'E24 / E96 Standard Decade' }
        ],
        explanation: `A resistor with bands [${b1}, ${b2}, 10^${mult}] has a nominal resistance of ${formatOhms(baseVal)} with a ±${tol}% tolerance spanning ${formatOhms(minVal)} to ${formatOhms(maxVal)}.`
      };
    }
  },
  {
    id: 'snells-law-refraction-index-calc',
    name: 'Snell\'s Law of Optical Refraction & Critical Angle Calculator',
    category: 'math',
    subCategory: 'Physics & Optics',
    description: 'Calculate angle of refraction θ₂, Total Internal Reflection (TIR) critical angle θ_c, and speed of light in optical materials.',
    formula: 'n₁ * sin(θ₁) = n₂ * sin(θ₂); Critical Angle θ_c = arcsin(n₂ / n₁) for n₁ > n₂',
    inputs: [
      { id: 'incidentAngleDeg', label: 'Angle of Incidence (θ₁ in Degrees)', type: 'number', defaultValue: 30, min: 0.1, max: 89.9, step: 0.5 },
      { id: 'indexMedium1', label: 'Refractive Index of Medium 1 (n₁) (Air = 1.0003, Water = 1.333, Glass = 1.52, Diamond = 2.42)', type: 'number', defaultValue: 1.0003, min: 1.0, max: 4.0, step: 0.01 },
      { id: 'indexMedium2', label: 'Refractive Index of Medium 2 (n₂)', type: 'number', defaultValue: 1.52, min: 1.0, max: 4.0, step: 0.01 }
    ],
    calculate: (inputs) => {
      const theta1Deg = Number(inputs.incidentAngleDeg) || 30;
      const n1 = Number(inputs.indexMedium1) || 1.0003;
      const n2 = Number(inputs.indexMedium2) || 1.52;

      const c = 299792458; // speed of light m/s
      const v1 = c / n1;
      const v2 = c / n2;

      const theta1Rad = theta1Deg * (Math.PI / 180);
      const sinTheta2 = (n1 * Math.sin(theta1Rad)) / n2;

      let refractionLabel = '';
      let theta2Deg = 0;
      let isTir = false;

      if (sinTheta2 > 1.0) {
        isTir = true;
        refractionLabel = 'Total Internal Reflection (TIR) Occurs (No Refraction)';
      } else {
        theta2Deg = Math.asin(sinTheta2) * (180 / Math.PI);
        refractionLabel = `${theta2Deg.toFixed(2)}° Angle of Refraction`;
      }

      let criticalAngleStr = 'N/A (Light passing into denser medium)';
      if (n1 > n2) {
        const critRad = Math.asin(n2 / n1);
        const critDeg = critRad * (180 / Math.PI);
        criticalAngleStr = `${critDeg.toFixed(2)}°`;
      }

      return {
        primaryValue: isTir ? 'Total Internal Reflection' : `${theta2Deg.toFixed(2)}°`,
        primaryLabel: 'Angle of Refraction (θ₂ in Medium 2)',
        secondaryMetrics: [
          { label: 'Refraction Status', value: refractionLabel },
          { label: 'Critical Angle for TIR (θ_c)', value: criticalAngleStr },
          { label: 'Speed of Light in Medium 1', value: `${(v1 / 1e6).toFixed(2)} x 10⁶ m/s (${((v1 / c) * 100).toFixed(1)}% c)` },
          { label: 'Speed of Light in Medium 2', value: `${(v2 / 1e6).toFixed(2)} x 10⁶ m/s (${((v2 / c) * 100).toFixed(1)}% c)` }
        ],
        explanation: `Light passing from medium n₁ = ${n1} into medium n₂ = ${n2} at ${theta1Deg}° incidence refracts at an angle of ${isTir ? 'TIR' : `${theta2Deg.toFixed(2)}°`}.`
      };
    }
  },
  {
    id: 'ph-poh-hydrogen-ion-calc',
    name: 'pH, pOH & Hydrogen Ion Concentration [H+] Chemistry Calculator',
    category: 'math',
    subCategory: 'Chemistry & Biochemistry',
    description: 'Convert between pH, pOH, hydronium concentration [H⁺]/[H₃O⁺], and hydroxide concentration [OH⁻] at standard 25°C temperature (Kw = 1.0 × 10⁻¹⁴).',
    formula: 'pH = -log10[H⁺]; pOH = 14 - pH; [H⁺] = 10^(-pH); [OH⁻] = 10^(-pOH)',
    inputs: [
      { id: 'solutionPh', label: 'Solution pH Level (0.0 to 14.0)', type: 'number', defaultValue: 7.40, min: 0.0, max: 14.0, step: 0.05 }
    ],
    calculate: (inputs) => {
      const ph = Math.min(14, Math.max(0, Number(inputs.solutionPh) || 7.40));

      const poh = 14.0 - ph;
      const hConc = Math.pow(10, -ph);
      const ohConc = Math.pow(10, -poh);

      let classification = '';
      if (ph < 3.0) classification = 'Strongly Acidic (Gastric Acid / Vinegar Tier)';
      else if (ph < 6.5) classification = 'Weakly Acidic (Coffee / Rainwater)';
      else if (ph <= 7.5) classification = 'Neutral / Physiological Blood Baseline (pH 7.35 - 7.45)';
      else if (ph <= 11.0) classification = 'Weakly Basic / Alkaline (Baking Soda / Seawater)';
      else classification = 'Strongly Basic / Alkaline (Bleach / Lye)';

      return {
        primaryValue: `pH ${ph.toFixed(2)} / pOH ${poh.toFixed(2)}`,
        primaryLabel: 'Solution Acidity / Basicity Index',
        secondaryMetrics: [
          { label: 'Classification', value: classification },
          { label: 'Hydronium Ion Conc [H⁺]', value: `${hConc.toExponential(3)} M (mol/L)` },
          { label: 'Hydroxide Ion Conc [OH⁻]', value: `${ohConc.toExponential(3)} M (mol/L)` },
          { label: 'Ion Product constant Kw', value: '1.00 × 10⁻¹⁴ at 25°C' },
          { label: 'Physiological Blood Match', value: ph >= 7.35 && ph <= 7.45 ? 'Normal Human Arterial Blood Range' : 'Outside Normal Human Blood Range' }
        ],
        explanation: `A solution with pH ${ph.toFixed(2)} has a pOH of ${poh.toFixed(2)}, hydronium [H⁺] concentration of ${hConc.toExponential(3)} M, and hydroxide [OH⁻] concentration of ${ohConc.toExponential(3)} M (${classification}).`
      };
    }
  },
  {
    id: 'bernoulli-fluid-pipe-flow-calc',
    name: 'Bernoulli\'s Equation & Pipe Fluid Flow Rate Calculator',
    category: 'math',
    subCategory: 'Fluid Dynamics & Hydraulics',
    description: 'Calculate pressure drop ΔP and volumetric flow rate Q through venturi nozzles and tapering pipes using Continuity and Bernoulli\'s Law.',
    formula: 'Q = A₁ * v₁ = A₂ * v₂; P₁ + 0.5*ρ*v₁² = P₂ + 0.5*ρ*v₂²',
    inputs: [
      { id: 'pipeDiameter1Inches', label: 'Section 1 Pipe Diameter (Inches)', type: 'number', defaultValue: 4.0, min: 0.5, max: 48, step: 0.5 },
      { id: 'pipeDiameter2Inches', label: 'Section 2 Constriction Diameter (Inches)', type: 'number', defaultValue: 2.0, min: 0.25, max: 48, step: 0.25 },
      { id: 'fluidVelocity1Fps', label: 'Inlet Fluid Velocity (v₁, ft/sec)', type: 'number', defaultValue: 5.0, min: 0.1, max: 100, step: 0.5 },
      { id: 'fluidDensityLbsPerCuFt', label: 'Fluid Density (Water = 62.4 lbs/ft³)', type: 'number', defaultValue: 62.4, min: 10, max: 200, step: 1 }
    ],
    calculate: (inputs) => {
      const d1In = Number(inputs.pipeDiameter1Inches) || 4.0;
      const d2In = Number(inputs.pipeDiameter2Inches) || 2.0;
      const v1Fps = Number(inputs.fluidVelocity1Fps) || 5.0;
      const rho = Number(inputs.fluidDensityLbsPerCuFt) || 62.4;

      const d1Ft = d1In / 12;
      const d2Ft = d2In / 12;

      const a1 = Math.PI * Math.pow(d1Ft / 2, 2);
      const a2 = Math.PI * Math.pow(d2Ft / 2, 2);

      const v2Fps = (a1 * v1Fps) / a2;
      const flowRateCfs = a1 * v1Fps;
      const flowRateGpm = flowRateCfs * 448.831; // 1 cfs = 448.831 GPM

      // Bernoulli pressure drop: ΔP = 0.5 * rho_slug * (v2^2 - v1^2)
      // rho_slug = rho / 32.174
      const rhoSlug = rho / 32.174;
      const deltaP_Psf = 0.5 * rhoSlug * (v2Fps * v2Fps - v1Fps * v1Fps);
      const deltaP_Psi = deltaP_Psf / 144;

      return {
        primaryValue: `${Math.round(flowRateGpm).toLocaleString()} Gallons/Min (GPM)`,
        primaryLabel: 'Volumetric Flow Rate (Q)',
        secondaryMetrics: [
          { label: 'Constricted Velocity (v₂)', value: `${v2Fps.toFixed(2)} ft/s (${(v2Fps / v1Fps).toFixed(1)}x speedup)` },
          { label: 'Venturi Pressure Drop (ΔP)', value: `${deltaP_Psi.toFixed(2)} PSI (${(deltaP_Psi * 6.89476).toFixed(2)} kPa)` },
          { label: 'Volumetric Flow in CFS', value: `${flowRateCfs.toFixed(3)} ft³/sec` },
          { label: 'Section 1 Area / Section 2 Area', value: `${(a1 * 144).toFixed(2)} sq in / ${(a2 * 144).toFixed(2)} sq in` }
        ],
        explanation: `Water entering a ${d1In}" pipe at ${v1Fps} ft/s flows at ${Math.round(flowRateGpm)} GPM. Tapering to ${d2In}" accelerates flow to ${v2Fps.toFixed(2)} ft/s, causing a Venturi pressure drop of ${deltaP_Psi.toFixed(2)} PSI.`
      };
    }
  },
  {
    id: 'fresnel-reflection-reflection-calc',
    name: 'Fresnel Reflection & Polarized Reflectance Calculator',
    category: 'math',
    subCategory: 'Physics & Optics',
    description: 'Calculate normal-incidence reflection percentage R₀ and Brewster\'s polarizing angle θ_B for glass, water, crystals, and semiconductors.',
    formula: 'R₀ = [(n₁ - n₂)/(n₁ + n₂)]²; Brewster Angle θ_B = arctan(n₂ / n₁)',
    inputs: [
      { id: 'refractiveIndex1', label: 'Medium 1 Refractive Index (n₁)', type: 'number', defaultValue: 1.0, min: 1.0, max: 4.0, step: 0.01 },
      { id: 'refractiveIndex2', label: 'Medium 2 Refractive Index (n₂)', type: 'number', defaultValue: 1.5, min: 1.0, max: 4.0, step: 0.01 }
    ],
    calculate: (inputs) => {
      const n1 = Number(inputs.refractiveIndex1) || 1.0;
      const n2 = Number(inputs.refractiveIndex2) || 1.5;

      const r0 = Math.pow((n1 - n2) / (n1 + n2), 2);
      const r0Percent = r0 * 100;
      const transmittancePercent = (1 - r0) * 100;

      const brewsterRad = Math.atan(n2 / n1);
      const brewsterDeg = brewsterRad * (180 / Math.PI);

      return {
        primaryValue: `${r0Percent.toFixed(2)}% Reflected`,
        primaryLabel: 'Normal Incidence Optical Reflectance (R₀)',
        secondaryMetrics: [
          { label: 'Optical Transmittance (T₀)', value: `${transmittancePercent.toFixed(2)}% Transmitted` },
          { label: 'Brewster\'s Polarizing Angle (θ_B)', value: `${brewsterDeg.toFixed(2)}°` },
          { label: 'Index Contrast Ratio (n₂ / n₁)', value: `${(n2 / n1).toFixed(3)}x` }
        ],
        explanation: `At an interface between n₁ = ${n1} and n₂ = ${n2}, ${r0Percent.toFixed(2)}% of perpendicular light reflects, while light incident at Brewster's angle of ${brewsterDeg.toFixed(2)}° becomes 100% polarized.`
      };
    }
  },
  {
    id: 'torque-horsepower-rpm-motor-calc',
    name: 'Torque, Horsepower (HP) & Engine RPM Mechanical Calculator',
    category: 'math',
    subCategory: 'Mechanical Engineering',
    description: 'Convert between Engine Horsepower (HP), Torque (lb-ft and N·m), and Rotational Speed (RPM) for automotive dynos and electric motors.',
    formula: 'Horsepower = (Torque lb-ft * RPM) / 5252; Torque N·m = (Power kW * 9549) / RPM',
    inputs: [
      { id: 'torqueLbFt', label: 'Engine Torque (lb-ft)', type: 'number', defaultValue: 350, min: 1, max: 5000, step: 5 },
      { id: 'engineRpm', label: 'Rotational Speed (RPM)', type: 'number', defaultValue: 5252, min: 100, max: 20000, step: 100 }
    ],
    calculate: (inputs) => {
      const torqueLbFt = Number(inputs.torqueLbFt) || 350;
      const rpm = Number(inputs.engineRpm) || 5252;

      const hp = (torqueLbFt * rpm) / 5252;
      const kw = hp * 0.745699872;
      const torqueNm = torqueLbFt * 1.3558179483;

      return {
        primaryValue: `${hp.toFixed(1)} Mechanical HP`,
        primaryLabel: `Brake Horsepower at ${rpm.toLocaleString()} RPM`,
        secondaryMetrics: [
          { label: 'Electric Power Equivalent', value: `${kw.toFixed(1)} kW` },
          { label: 'Torque in Newton-Meters', value: `${torqueNm.toFixed(1)} N·m` },
          { label: 'Angular Velocity (ω)', value: `${((rpm * 2 * Math.PI) / 60).toFixed(1)} rad/sec` },
          { label: '5252 RPM Crossover Point', value: 'HP and Torque (lb-ft) are numerically identical at 5,252 RPM' }
        ],
        explanation: `An engine generating ${torqueLbFt} lb-ft of torque (${torqueNm.toFixed(1)} N·m) at ${rpm} RPM produces ${hp.toFixed(1)} Horsepower (${kw.toFixed(1)} kW).`
      };
    }
  }
];
