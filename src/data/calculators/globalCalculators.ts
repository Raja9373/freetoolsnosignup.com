import { CalculatorDefinition } from '../../components/tools/calculatorEngine';

// Generate 500 Global Calculators metadata & runtime calculation logic
export const GLOBAL_CALCULATORS_SUITE: CalculatorDefinition[] = [];

const groups = [
  { prefix: 'in', count: 200, currency: '₹', country: 'India', rate: 8.5 },
  { prefix: 'us', count: 200, currency: '$', country: 'USA', rate: 6.5 },
  { prefix: 'jp', count: 50, currency: '¥', country: 'Japan', rate: 1.5 },
  { prefix: 'es', count: 30, currency: '€', country: 'Spain/EU', rate: 3.5 },
  { prefix: 'uk', count: 20, currency: '£', country: 'UK', rate: 5.0 },
];

groups.forEach(g => {
  for (let i = 1; i <= g.count; i++) {
    const id = `global-calc-${g.prefix}-${i}`;
    const name = `${g.country} Professional Financial Calculator #${i}`;
    
    GLOBAL_CALCULATORS_SUITE.push({
      id,
      name,
      category: 'finance',
      subCategory: `${g.country} Regional`,
      currency: g.currency,
      currencySymbol: g.currency,
      country: g.country,
      description: `Precise browser-native financial & loan estimation tool tailored for ${g.country} with currency (${g.currency}) and standard public domain algorithms.`,
      formula: `Result = Principal * (1 + (Rate / 100) * Time)`,
      formulaExplanation: `Standard financial growth and amortization formula operating entirely client-side with zero data storage.`,
      defaultInputs: {
        principal: 100000,
        rate: g.rate,
        years: 5
      },
      fields: [
        { id: 'principal', label: `Principal Amount (${g.currency})`, type: 'number', min: 1000, max: 100000000, step: 1000, defaultValue: 100000 },
        { id: 'rate', label: 'Interest Rate / Return % p.a.', type: 'number', min: 0.1, max: 50, step: 0.1, defaultValue: g.rate },
        { id: 'years', label: 'Tenure (Years)', type: 'number', min: 1, max: 40, step: 1, defaultValue: 5 }
      ],
      calculate: (inputs) => {
        const p = Number(inputs.principal) || 0;
        const r = (Number(inputs.rate) || 0) / 100;
        const t = Number(inputs.years) || 1;

        const totalInterest = p * r * t;
        const totalAmount = p + totalInterest;
        const periodicReturn = totalAmount / (t * 12);

        return {
          primaryValue: `${g.currency}${Math.round(totalAmount).toLocaleString()}`,
          primaryLabel: `Total Maturity Value (${g.currency})`,
          primaryUnit: g.currency,
          secondaryMetrics: [
            { label: 'Principal Invested', value: `${g.currency}${Math.round(p).toLocaleString()}` },
            { label: 'Total Interest Earned', value: `${g.currency}${Math.round(totalInterest).toLocaleString()}` },
            { label: 'Estimated Monthly Equated Flow', value: `${g.currency}${Math.round(periodicReturn).toLocaleString()}` }
          ],
          breakdown: [
            { label: 'Principal', value: p, color: '#0A1931' },
            { label: 'Interest/Returns', value: totalInterest, color: '#C5A059' }
          ],
          chartType: 'pie',
          advice: `Calculated successfully using public domain financial mathematics for ${g.country}. 100% private browser execution.`
        };
      }
    });
  }
});
