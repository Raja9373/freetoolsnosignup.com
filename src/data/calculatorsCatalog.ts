export interface CalculatorItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  desc: string;
  icon: string;
}

export interface OmniCategory {
  name: string;
  count: number;
  icon: string;
  desc: string;
}

export const BIOLOGY_SUB_CATEGORIES = [
  { name: 'Bio laboratory calculators', icon: '🧪', count: 22, desc: 'Molarity, dilutions, PCR annealing, DNA/protein concentration, and bacterial growth.' },
  { name: 'Genetics calculators', icon: '🧬', count: 18, desc: 'Punnett squares, Hardy-Weinberg equilibrium, and DNA melting temperature.' },
  { name: 'Animal pregnancy calculators', icon: '🐾', count: 12, desc: 'Gestational periods and expected birth dates for various species.' },
  { name: 'Dog calculators', icon: '🐕', count: 14, desc: 'Dog age in human years, caloric needs, and gestation calculators.' },
  { name: 'Cat calculators', icon: '🐈', count: 10, desc: 'Cat age converter, food portions, and weight management.' },
  { name: 'Other animals calculators', icon: '🐇', count: 8, desc: 'Rabbit, hamster, and exotic pet care and gestation formulas.' },
  { name: 'Livestock calculators', icon: '🐄', count: 16, desc: 'Cattle weight estimation, feed conversion ratios, and herd stocking rates.' },
  { name: 'Gardening and crops calculators', icon: '🌱', count: 20, desc: 'Soil amendment, seed spacing, fertilizer rates, and yield estimation.' },
  { name: 'Trees & Forestry Calculators', icon: '🌲', count: 12, desc: 'Tree height, timber volume, carbon sequestration, and canopy coverage.' },
  { name: 'Other calculators', icon: '🔬', count: 6, desc: 'Miscellaneous biological and ecological measurement tools.' }
];

export const OMNI_CATEGORIES: OmniCategory[] = [
  { name: 'Biology', count: 131, icon: '🧬', desc: 'Genetics, lab assays, animal gestation, pet care, forestry, and crops.' },
  { name: 'Chemistry', count: 108, icon: '🧪', desc: 'Stoichiometry, molarity, pH calculations, and gas laws.' },
  { name: 'Construction', count: 160, icon: '🏗️', desc: 'Concrete volume, roofing pitch, framing lumber, and drywall estimates.' },
  { name: 'Conversion', count: 329, icon: '🔄', desc: 'Unit conversions for length, mass, velocity, energy, and pressure.' },
  { name: 'Ecology', count: 34, icon: '🌿', desc: 'Carbon footprint, biodiversity indices, and solar energy generation.' },
  { name: 'Everyday life', count: 292, icon: '☕', desc: 'Tip calculators, age diffs, password generation, and time zone converters.' },
  { name: 'Finance', count: 615, icon: '💰', desc: 'Mortgages, compound interest, SIPs, loans, taxes, and retirement.' },
  { name: 'Food', count: 70, icon: '🍳', desc: 'Recipe scaling, baking percentages, and macronutrient ratios.' },
  { name: 'Health', count: 439, icon: '🏥', desc: 'BMI, body fat percentage, TDEE, heart rate zones, and pregnancy due dates.' },
  { name: 'Math', count: 686, icon: '📐', desc: 'Algebra, calculus, quadratic solvers, matrices, and geometry.' },
  { name: 'Physics', count: 546, icon: '⚛️', desc: 'Ohm\'s law, kinematics, thermodynamics, and wave mechanics.' },
  { name: 'Sports', count: 111, icon: '⚽', desc: 'Pace calculators, VO2 max estimation, and batting averages.' },
  { name: 'Statistics', count: 196, icon: '📊', desc: 'Standard deviation, p-values, confidence intervals, and probability.' },
  { name: 'Other', count: 226, icon: '🔮', desc: 'Miscellaneous specialized calculators and niche engineering tools.' }
];

export const FEATURED_CALCULATORS: CalculatorItem[] = [
  {
    id: 'mortgage',
    name: 'Mortgage & Home Loan Calculator',
    category: 'Finance',
    subCategory: 'Loans & Debt',
    desc: 'Calculate monthly EMIs, total interest payable, and amortization schedules for home loans.',
    icon: '🏠'
  },
  {
    id: 'sip-wealth',
    name: 'SIP & Compound Interest Calculator',
    category: 'Finance',
    subCategory: 'Investments & Wealth',
    desc: 'Project your long-term wealth growth through systematic monthly investments.',
    icon: '📈'
  },
  {
    id: 'bmi',
    name: 'BMI & Body Fat Calculator',
    category: 'Health',
    subCategory: 'Nutrition & Diet',
    desc: 'Evaluate your Body Mass Index (BMI) and determine healthy weight ranges.',
    icon: '⚖️'
  },
  {
    id: 'calorie-tdee',
    name: 'Calorie Deficit & TDEE Calculator',
    category: 'Health',
    subCategory: 'Fitness & Nutrition',
    desc: 'Calculate your Total Daily Energy Expenditure and personalized calorie targets.',
    icon: '🔥'
  },
  {
    id: 'scientific',
    name: 'Advanced Scientific Calculator',
    category: 'Math',
    subCategory: 'Algebra & Calculus',
    desc: 'Perform advanced mathematical operations including trigonometric functions and logarithms.',
    icon: '🔢'
  },
  {
    id: 'tip-bill',
    name: 'Tip & Bill Split Calculator',
    category: 'Everyday life',
    subCategory: 'Lifestyle & Utility',
    desc: 'Easily split restaurant bills, calculate tip percentages per person, and round totals.',
    icon: '🧾'
  },
  {
    id: 'quadratic',
    name: 'Quadratic Equation Solver',
    category: 'Math',
    subCategory: 'Algebra',
    desc: 'Find real and complex roots of quadratic equations using coefficients a, b, and c.',
    icon: '📊'
  },
  {
    id: 'ohms-law',
    name: 'Ohm\'s Law & Electrical Circuit Calculator',
    category: 'Physics',
    subCategory: 'Electromagnetism',
    desc: 'Calculate Voltage, Current, Resistance, or Power instantly using Ohm\'s Law.',
    icon: '⚡'
  },
  {
    id: 'salary-tax',
    name: 'Salary & Net Paycheck Calculator',
    category: 'Finance',
    subCategory: 'Taxation',
    desc: 'Estimate your net take-home pay after federal, state, and FICA tax deductions.',
    icon: '💼'
  },
  {
    id: 'age-date',
    name: 'Age & Date Difference Calculator',
    category: 'Everyday life',
    subCategory: 'Time Tracking',
    desc: 'Calculate exact age in years, months, days, hours, and minutes.',
    icon: '📅'
  },
  {
    id: 'unit-converter',
    name: 'Universal Unit Converter',
    category: 'Conversion',
    subCategory: 'Conversions',
    desc: 'Convert length, weight, temperature, and volume units seamlessly.',
    icon: '🔄'
  },
  {
    id: 'password-gen',
    name: 'Secure Password Generator',
    category: 'Everyday life',
    subCategory: 'Security',
    desc: 'Generate cryptographically secure passwords with custom character sets.',
    icon: '🔒'
  },
  // Biology calculators per requested subcategories
  {
    id: 'annealing-temp',
    name: 'Annealing Temperature Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Calculate optimal PCR primer annealing temperature based on primer melting temperatures (Tm).',
    icon: '🌡️'
  },
  {
    id: 'generation-time',
    name: 'Generation Time Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Determine bacterial growth generation time and specific growth rate from OD or cell counts.',
    icon: '📈'
  },
  {
    id: 'cell-dilution',
    name: 'Cell Dilution Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Calculate viable cell suspension dilutions for hemocytometer plating and seeding.',
    icon: '🧫'
  },
  {
    id: 'cell-doubling',
    name: 'Cell Doubling Time Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Calculate mammalian or bacterial cell culture population doubling time during exponential phase.',
    icon: '⏱️'
  },
  {
    id: 'dna-concentration',
    name: 'DNA Concentration Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Convert UV spectrophotometer absorbance (A260) to double-stranded or single-stranded DNA concentration.',
    icon: '🧬'
  },
  {
    id: 'ligation',
    name: 'DNA Ligation Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Calculate optimal insert-to-vector molar ratios for molecular cloning and ligation reactions.',
    icon: '🔗'
  },
  {
    id: 'log-reduction',
    name: 'Log Reduction Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Calculate microbial inactivation percentage and log reduction values for disinfection and sterilization.',
    icon: '📉'
  },
  {
    id: 'protein-concentration',
    name: 'Protein Concentration Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Estimate protein concentration from Bradford, BCA, or Lowry absorbance assays.',
    icon: '🧪'
  },
  {
    id: 'bio-molarity',
    name: 'Solution Molarity & Dilution Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Calculate mass required for molar solutions and C1V1 = C2V2 serial dilutions.',
    icon: '🧪'
  },
  {
    id: 'bio-pcr',
    name: 'PCR Master Mix & Primer Dilution Calculator',
    category: 'Biology',
    subCategory: 'Bio laboratory calculators',
    desc: 'Compute reagent volumes for multiplex PCR master mix and working primer concentrations.',
    icon: '🧫'
  },
  {
    id: 'genetics-punnett',
    name: 'Punnett Square & Dihybrid Cross Calculator',
    category: 'Biology',
    subCategory: 'Genetics calculators',
    desc: 'Predict genotypic and phenotypic ratios for monohybrid and dihybrid genetic crosses.',
    icon: '🧬'
  },
  {
    id: 'genetics-hardy',
    name: 'Hardy-Weinberg Equilibrium Calculator',
    category: 'Biology',
    subCategory: 'Genetics calculators',
    desc: 'Calculate allele and genotype frequencies using p² + 2pq + q² = 1.',
    icon: '🧬'
  },
  {
    id: 'animal-gestation',
    name: 'Animal Gestation & Due Date Calculator',
    category: 'Biology',
    subCategory: 'Animal pregnancy calculators',
    desc: 'Estimate expected delivery dates for cattle, horses, sheep, pigs, and other species.',
    icon: '🐾'
  },
  {
    id: 'dog-age',
    name: 'Dog Age in Human Years & Calorie Calculator',
    category: 'Biology',
    subCategory: 'Dog calculators',
    desc: 'Convert canine age based on breed size and calculate daily resting energy requirements.',
    icon: '🐕'
  },
  {
    id: 'dog-gestation',
    name: 'Dog Pregnancy & Whelping Date Calculator',
    category: 'Biology',
    subCategory: 'Dog calculators',
    desc: 'Determine expected whelping date (63 days average) from breeding date.',
    icon: '🐶'
  },
  {
    id: 'cat-age',
    name: 'Cat Age Converter & Food Portion Calculator',
    category: 'Biology',
    subCategory: 'Cat calculators',
    desc: 'Calculate feline age equivalents and daily kcal food requirements.',
    icon: '🐈'
  },
  {
    id: 'other-animals-gestation',
    name: 'Rabbit & Exotic Pet Gestation Calculator',
    category: 'Biology',
    subCategory: 'Other animals calculators',
    desc: 'Calculate gestation periods for rabbits, guinea pigs, ferrets, and hamsters.',
    icon: '🐇'
  },
  {
    id: 'livestock-weight',
    name: 'Livestock Weight & Feed Conversion Calculator',
    category: 'Biology',
    subCategory: 'Livestock calculators',
    desc: 'Estimate live weight of cattle and pigs using heart girth and body length measurements.',
    icon: '🐄'
  },
  {
    id: 'gardening-spacing',
    name: 'Garden Seed Spacing & Soil Amendment Calculator',
    category: 'Biology',
    subCategory: 'Gardening and crops calculators',
    desc: 'Calculate plant spacing, compost requirements, and square-foot gardening yield.',
    icon: '🌱'
  },
  {
    id: 'forestry-volume',
    name: 'Tree Height & Timber Volume Calculator',
    category: 'Biology',
    subCategory: 'Trees & Forestry Calculators',
    desc: 'Estimate tree height using trigonometry and calculate board feet of timber.',
    icon: '🌲'
  },
  {
    id: 'bio-other',
    name: 'Cell Doubling Time & Growth Rate Calculator',
    category: 'Biology',
    subCategory: 'Other calculators',
    desc: 'Calculate exponential bacterial and mammalian cell culture doubling times.',
    icon: '🔬'
  }
];

export function generateAllCalculators(): CalculatorItem[] {
  return FEATURED_CALCULATORS;
}
