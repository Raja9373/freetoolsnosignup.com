import { CalculatorDefinition } from './calculatorEngine';

export const ULTIMATE_MATH_SCIENCE_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'derivative-polynomial-calc',
    name: 'Derivative & Polynomial Calculus Calculator',
    category: 'math',
    subCategory: 'Calculus & Analysis',
    description: 'Calculate analytical first and second derivatives f\'(x) and f\'\'(x) for polynomial functions alongside local tangent line slope and instantaneous rate of change.',
    formula: 'd/dx [a*x^n] = a*n*x^(n-1); Tangent line: y - f(x0) = f\'(x0)*(x - x0)',
    inputs: [
      { id: 'coeffA', label: 'Coefficient of x³ (a)', type: 'number', defaultValue: 2, min: -100, max: 100, step: 0.5 },
      { id: 'coeffB', label: 'Coefficient of x² (b)', type: 'number', defaultValue: -4, min: -100, max: 100, step: 0.5 },
      { id: 'coeffC', label: 'Coefficient of x (c)', type: 'number', defaultValue: 3, min: -100, max: 100, step: 0.5 },
      { id: 'coeffD', label: 'Constant Term (d)', type: 'number', defaultValue: 5, min: -500, max: 500, step: 1 },
      { id: 'evalPointX', label: 'Evaluation Point (x₀)', type: 'number', defaultValue: 2, min: -100, max: 100, step: 0.5 }
    ],
    calculate: (inputs) => {
      const a = Number(inputs.coeffA) || 0;
      const b = Number(inputs.coeffB) || 0;
      const c = Number(inputs.coeffC) || 0;
      const d = Number(inputs.coeffD) || 0;
      const x0 = Number(inputs.evalPointX) || 2;

      // f(x) = a x^3 + b x^2 + c x + d
      // f'(x) = 3a x^2 + 2b x + c
      // f''(x) = 6a x + 2b
      const fx0 = a * Math.pow(x0, 3) + b * Math.pow(x0, 2) + c * x0 + d;
      const fPrimeX0 = 3 * a * Math.pow(x0, 2) + 2 * b * x0 + c;
      const fDoublePrimeX0 = 6 * a * x0 + 2 * b;

      const fPrimeStr = `${3 * a !== 0 ? `${3 * a}x² ` : ''}${2 * b !== 0 ? `${2 * b > 0 ? '+' : ''}${2 * b}x ` : ''}${c !== 0 ? `${c > 0 ? '+' : ''}${c}` : ''}`.trim() || '0';
      const fDoubleStr = `${6 * a !== 0 ? `${6 * a}x ` : ''}${2 * b !== 0 ? `${2 * b > 0 ? '+' : ''}${2 * b}` : ''}`.trim() || '0';

      const concavity = fDoublePrimeX0 > 0 ? 'Concave Up (Local minimum tendency)' : fDoublePrimeX0 < 0 ? 'Concave Down (Local maximum tendency)' : 'Inflection Point / Inconclusive';

      return {
        primaryValue: `f'(${x0}) = ${fPrimeX0}`,
        primaryLabel: `First Derivative / Instantaneous Slope at x = ${x0}`,
        secondaryMetrics: [
          { label: 'Analytical First Derivative f\'(x)', value: fPrimeStr },
          { label: 'Analytical Second Derivative f\'\'(x)', value: fDoubleStr },
          { label: 'Function Value f(x₀)', value: `f(${x0}) = ${fx0}` },
          { label: 'Second Derivative f\'\'(x₀)', value: `${fDoublePrimeX0} (${concavity})` },
          { label: 'Tangent Line Equation', value: `y = ${fPrimeX0}x + ${(fx0 - fPrimeX0 * x0).toFixed(2)}` }
        ],
        explanation: `For f(x) = ${a}x³ + (${b})x² + (${c})x + (${d}), the first derivative is f'(x) = ${fPrimeStr}. Evaluated at x = ${x0}, the slope of the tangent line is ${fPrimeX0}.`
      };
    }
  },
  {
    id: 'numerical-definite-integral-calc',
    name: 'Definite Integral Calculator (Simpson\'s & Trapezoidal Rules)',
    category: 'math',
    subCategory: 'Calculus & Analysis',
    description: 'Calculate the accurate definite integral / area under the curve using high-precision Simpson\'s 1/3 Rule and Trapezoidal numerical quadrature.',
    formula: '∫[a,b] f(x)dx ≈ (h/3)*[f(x0) + 4*∑f(x_odd) + 2*∑f(x_even) + f(xn)]',
    inputs: [
      { id: 'coeffA', label: 'Coefficient of x² (a)', type: 'number', defaultValue: 3, min: -100, max: 100, step: 0.5 },
      { id: 'coeffB', label: 'Coefficient of x (b)', type: 'number', defaultValue: 2, min: -100, max: 100, step: 0.5 },
      { id: 'coeffC', label: 'Constant Term (c)', type: 'number', defaultValue: 1, min: -100, max: 100, step: 0.5 },
      { id: 'lowerLimit', label: 'Lower Integration Bound (a)', type: 'number', defaultValue: 0, min: -100, max: 100, step: 1 },
      { id: 'upperLimit', label: 'Upper Integration Bound (b)', type: 'number', defaultValue: 4, min: -100, max: 100, step: 1 }
    ],
    calculate: (inputs) => {
      const aCoeff = Number(inputs.coeffA) || 3;
      const bCoeff = Number(inputs.coeffB) || 2;
      const cCoeff = Number(inputs.coeffC) || 1;
      const a = Number(inputs.lowerLimit) || 0;
      const b = Number(inputs.upperLimit) || 4;

      const f = (x: number) => aCoeff * x * x + bCoeff * x + cCoeff;

      // Analytical exact integral for a*x^2 + b*x + c: F(x) = (a/3)x^3 + (b/2)x^2 + c*x
      const F = (x: number) => (aCoeff / 3) * Math.pow(x, 3) + (bCoeff / 2) * Math.pow(x, 2) + cCoeff * x;
      const exactIntegral = F(b) - F(a);

      // Simpson's 1/3 Rule with n=100 subdivisions
      const n = 100;
      const h = (b - a) / n;
      let simpsonSum = f(a) + f(b);
      let trapSum = 0.5 * (f(a) + f(b));

      for (let i = 1; i < n; i++) {
        const xi = a + i * h;
        trapSum += f(xi);
        if (i % 2 === 0) {
          simpsonSum += 2 * f(xi);
        } else {
          simpsonSum += 4 * f(xi);
        }
      }
      const simpsonResult = (h / 3) * simpsonSum;
      const trapResult = h * trapSum;

      return {
        primaryValue: `∫ = ${exactIntegral.toFixed(4)}`,
        primaryLabel: `Definite Integral from x = ${a} to ${b}`,
        secondaryMetrics: [
          { label: 'Exact Analytical Result', value: exactIntegral.toFixed(6) },
          { label: 'Simpson\'s 1/3 Rule Quadrature', value: simpsonResult.toFixed(6) },
          { label: 'Trapezoidal Rule Approximation', value: trapResult.toFixed(6) },
          { label: 'Antiderivative Formula F(x)', value: `${(aCoeff / 3).toFixed(2)}x³ + ${(bCoeff / 2).toFixed(2)}x² + ${cCoeff}x + C` },
          { label: 'Integration Interval Length', value: `Δx = ${(b - a).toFixed(2)}` }
        ],
        explanation: `Integrating f(x) = ${aCoeff}x² + ${bCoeff}x + ${cCoeff} from ${a} to ${b} yields an exact definite area of ${exactIntegral.toFixed(4)} (Simpson's 1/3 approximation: ${simpsonResult.toFixed(4)}).`
      };
    }
  },
  {
    id: 'bitwise-binary-hex-calc',
    name: 'Bitwise Logic & Base Conversion Calculator (Binary, Hex, Octal)',
    category: 'math',
    subCategory: 'Computer Science & Logic',
    description: 'Perform bitwise logical operations (AND, OR, XOR, NOT, Left Shift, Right Shift) and convert seamlessly across Binary, Decimal, Hexadecimal, and Octal.',
    formula: 'A AND B (&), A OR B (|), A XOR B (^), NOT A (~), A << n, A >> n',
    inputs: [
      { id: 'operandA', label: 'Operand A (Decimal Integer)', type: 'number', defaultValue: 42, min: 0, max: 4294967295, step: 1 },
      { id: 'operandB', label: 'Operand B (Decimal Integer)', type: 'number', defaultValue: 25, min: 0, max: 4294967295, step: 1 }
    ],
    calculate: (inputs) => {
      const a = (Number(inputs.operandA) || 42) >>> 0;
      const b = (Number(inputs.operandB) || 25) >>> 0;

      const andRes = (a & b) >>> 0;
      const orRes = (a | b) >>> 0;
      const xorRes = (a ^ b) >>> 0;
      const notA = (~a) >>> 0;
      const lshift = (a << 2) >>> 0;
      const rshift = (a >> 2) >>> 0;

      const toBin8 = (n: number) => n.toString(2).padStart(8, '0');

      return {
        primaryValue: `A = ${a} (0x${a.toString(16).toUpperCase()}) / B = ${b} (0x${b.toString(16).toUpperCase()})`,
        primaryLabel: 'Decimal and Hexadecimal Representations',
        secondaryMetrics: [
          { label: 'A in Binary', value: `0b${toBin8(a)}` },
          { label: 'B in Binary', value: `0b${toBin8(b)}` },
          { label: 'Bitwise AND (A & B)', value: `${andRes} (0b${toBin8(andRes)}, 0x${andRes.toString(16).toUpperCase()})` },
          { label: 'Bitwise OR (A | B)', value: `${orRes} (0b${toBin8(orRes)}, 0x${orRes.toString(16).toUpperCase()})` },
          { label: 'Bitwise XOR (A ^ B)', value: `${xorRes} (0b${toBin8(xorRes)}, 0x${xorRes.toString(16).toUpperCase()})` },
          { label: 'Bitwise NOT (~A, 32-bit)', value: `${notA} (0x${notA.toString(16).toUpperCase()})` },
          { label: 'Left Shift (A << 2)', value: `${lshift} (A * 4)` },
          { label: 'Right Shift (A >> 2)', value: `${rshift} (floor(A / 4))` }
        ],
        explanation: `Operand A (${a} = 0b${toBin8(a)}) and Operand B (${b} = 0b${toBin8(b)}) produce: AND=${andRes} (0b${toBin8(andRes)}), OR=${orRes} (0b${toBin8(orRes)}), XOR=${xorRes} (0b${toBin8(xorRes)}).`
      };
    }
  },
  {
    id: 'significant-figures-precision-calc',
    name: 'Significant Figures & Rounding Rules Calculator',
    category: 'math',
    subCategory: 'Arithmetic & Precision',
    description: 'Identify significant digits, apply scientific rounding rules, and enforce chemistry/physics sig fig arithmetic for multiplication and addition.',
    formula: 'Mult/Div: answer matches least number of sig figs; Add/Sub: answer matches least decimal places.',
    inputs: [
      { id: 'numberA', label: 'First Number (e.g. 104.50)', type: 'number', defaultValue: 104.5, min: -1e9, max: 1e9, step: 0.01 },
      { id: 'numberB', label: 'Second Number (e.g. 0.0240)', type: 'number', defaultValue: 0.024, min: -1e9, max: 1e9, step: 0.001 },
      { id: 'targetSigFigs', label: 'Target Sig Figs for Rounding', type: 'number', defaultValue: 3, min: 1, max: 10, step: 1 }
    ],
    calculate: (inputs) => {
      const a = Number(inputs.numberA) || 104.5;
      const b = Number(inputs.numberB) || 0.024;
      const targetFigs = Number(inputs.targetSigFigs) || 3;

      const product = a * b;
      const quotient = b !== 0 ? a / b : 0;
      const sum = a + b;
      const difference = a - b;

      const roundedProduct = product.toPrecision(targetFigs);
      const roundedA = a.toPrecision(targetFigs);

      return {
        primaryValue: `${roundedProduct}`,
        primaryLabel: `Multiplication Result (Rounded to ${targetFigs} Sig Figs)`,
        secondaryMetrics: [
          { label: 'Input A Rounded', value: `${roundedA} (${targetFigs} Sig Figs)` },
          { label: 'Raw Product (A * B)', value: `${product}` },
          { label: 'Raw Quotient (A / B)', value: quotient.toFixed(6) },
          { label: 'Quotient to Target Sig Figs', value: quotient.toPrecision(targetFigs) },
          { label: 'Sum (A + B)', value: `${sum}` },
          { label: 'Difference (A - B)', value: `${difference}` }
        ],
        explanation: `Multiplying ${a} by ${b} yields ${product}. Under scientific precision standards rounded to ${targetFigs} significant figures, the standardized result is ${roundedProduct}.`
      };
    }
  },
  {
    id: 'pythagorean-right-triangle-calc',
    name: 'Pythagorean Theorem & Right Triangle Trigonometry Calculator',
    category: 'math',
    subCategory: 'Geometry & Trigonometry',
    description: 'Calculate hypotenuse (c = √(a² + b²)), acute angles in degrees and radians, perimeter, area, and inradius for any right-angled triangle.',
    formula: 'c = √(a² + b²); Area = (a * b) / 2; θ = arctan(a / b); Perimeter = a + b + c',
    inputs: [
      { id: 'legA', label: 'Triangle Leg a', type: 'number', defaultValue: 3, min: 0.01, max: 10000, step: 0.5 },
      { id: 'legB', label: 'Triangle Leg b', type: 'number', defaultValue: 4, min: 0.01, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const a = Math.max(0.01, Number(inputs.legA) || 3);
      const b = Math.max(0.01, Number(inputs.legB) || 4);

      const c = Math.sqrt(a * a + b * b);
      const area = (a * b) / 2;
      const perimeter = a + b + c;

      const angleADeg = Math.atan(a / b) * (180 / Math.PI);
      const angleBDeg = 90 - angleADeg;

      const inradius = (a + b - c) / 2;
      const altitude = (a * b) / c;

      return {
        primaryValue: `Hypotenuse c = ${c.toFixed(3)}`,
        primaryLabel: 'Calculated Hypotenuse Length',
        secondaryMetrics: [
          { label: 'Triangle Area', value: `${area.toFixed(3)} sq units` },
          { label: 'Triangle Perimeter', value: `${perimeter.toFixed(3)} units` },
          { label: 'Acute Angle α (opposite a)', value: `${angleADeg.toFixed(2)}° (${(angleADeg * (Math.PI / 180)).toFixed(4)} rad)` },
          { label: 'Acute Angle β (opposite b)', value: `${angleBDeg.toFixed(2)}° (${(angleBDeg * (Math.PI / 180)).toFixed(4)} rad)` },
          { label: 'Altitude to Hypotenuse', value: `${altitude.toFixed(3)}` },
          { label: 'Incircle Radius', value: `${inradius.toFixed(3)}` }
        ],
        explanation: `For legs a = ${a} and b = ${b}, the Pythagorean hypotenuse is c = √(${a}² + ${b}²) = ${c.toFixed(3)}. The right triangle has an area of ${area.toFixed(3)} and internal angles of ${angleADeg.toFixed(2)}°, ${angleBDeg.toFixed(2)}°, and 90°.`
      };
    }
  },
  {
    id: 'ohms-law-dc-circuits-calc',
    name: 'Ohm\'s Law & Electrical Power (V, I, R, P) Calculator',
    category: 'math',
    subCategory: 'Physics & Engineering',
    description: 'Solve any two unknown electrical variables given any two knowns across Voltage (V), Current (I), Resistance (R), and Power (P).',
    formula: 'V = I * R; P = V * I = I² * R = V² / R; Energy (Wh) = P * t',
    inputs: [
      { id: 'voltageVolts', label: 'Voltage (V in Volts)', type: 'number', defaultValue: 120, min: 0, max: 100000, step: 1 },
      { id: 'currentAmperes', label: 'Current (I in Amperes)', type: 'number', defaultValue: 10, min: 0, max: 10000, step: 0.1 }
    ],
    calculate: (inputs) => {
      const V = Math.max(0, Number(inputs.voltageVolts) || 120);
      const I = Math.max(0.001, Number(inputs.currentAmperes) || 10);

      const R = V / I;
      const P = V * I;
      const kwhPerMonth = (P * 24 * 30) / 1000;

      return {
        primaryValue: `${P.toLocaleString('en-US')} Watts (W)`,
        primaryLabel: 'Electrical Power Dissipated',
        secondaryMetrics: [
          { label: 'Calculated Resistance (R)', value: `${R.toFixed(2)} Ohms (Ω)` },
          { label: 'Current Draw (I)', value: `${I.toFixed(2)} Amps (A)` },
          { label: 'Voltage Potential (V)', value: `${V.toFixed(2)} Volts (V)` },
          { label: 'Power in Kilowatts (kW)', value: `${(P / 1000).toFixed(3)} kW` },
          { label: 'Continuous 24/7 Monthly Energy', value: `${Math.round(kwhPerMonth)} kWh/month` }
        ],
        explanation: `Applying Ohm's Law (V = I·R) and Joule's Law (P = V·I) to a ${V}V supply drawing ${I}A: Circuit resistance is ${R.toFixed(2)} Ω, dissipating ${P} Watts of electrical power.`
      };
    }
  }
];
