import { CalculatorDefinition } from './calculatorEngine';
import { ALL_CALCULATORS } from './calculatorEngine';
import { MORE_FINANCE_CALCULATORS } from './moreCalculators';
import { HEALTH_MATH_CONSTRUCTION_CALCULATORS } from './healthMathCalculators';
import { ADVANCED_MATH_EVERYDAY_CALCULATORS } from './advancedMathCalculators';
import { COMPREHENSIVE_CATALOG_CALCULATORS } from './calculatorCatalogDefinitions';
import { EXPANDED_FINANCE_CALCULATORS } from './expandedFinanceCatalog';
import { EXPANDED_HEALTH_MATH_CALCULATORS } from './expandedHealthMathCatalog';
import { FULL_CATALOG_SUPPLEMENT } from './fullCalculatorNetCatalog';
import { FINAL_CALCULATOR_NET_CATALOG } from './remainingCalculatorNetCatalog';
import { MASTER_CALCULATOR_NET_250 } from './masterCalculatorCatalog250';
import { ULTIMATE_FINANCE_CALCULATORS } from './ultimateFinanceCalculators';
import { ULTIMATE_FINANCE_PART2_CALCULATORS } from './ultimateFinancePart2Calculators';
import { ULTIMATE_HEALTH_CALCULATORS } from './ultimateHealthCalculators';
import { ULTIMATE_MATH_SCIENCE_CALCULATORS } from './ultimateMathScienceCalculators';
import { ULTIMATE_EVERYDAY_CALCULATORS } from './ultimateEverydayCalculators';
import { COMPREHENSIVE_EXPANDED_260_CALCULATORS } from './masterExpanded260Catalog';
import { GRAND_MASTER_SUITE_260_PLUS } from './grandMasterSuite260Plus';
import { GRAND_MASTER_PART2_SUITE } from './grandMasterPart2Suite';
import { GRAND_MASTER_PART3_SUITE } from './grandMasterPart3Suite';
import { GRAND_MASTER_PART4_SUITE } from './grandMasterPart4Suite';
import { GRAND_MASTER_PART5_SUITE } from './grandMasterPart5Suite';
import { GLOBAL_CALCULATORS_SUITE } from '../../data/calculators/globalCalculators';
import { PHASE2_CALCULATORS_SUITE } from '../../data/calculators/phase2Calculators';

// Complete master calculator catalog synthesis
function generateCompleteCalculatorSuite(): CalculatorDefinition[] {
  const map = new Map<string, CalculatorDefinition>();

  // Register all primary handcrafted modules
  ALL_CALCULATORS.forEach(c => map.set(c.id, c));
  MORE_FINANCE_CALCULATORS.forEach(c => map.set(c.id, c));
  HEALTH_MATH_CONSTRUCTION_CALCULATORS.forEach(c => map.set(c.id, c));
  ADVANCED_MATH_EVERYDAY_CALCULATORS.forEach(c => map.set(c.id, c));
  COMPREHENSIVE_CATALOG_CALCULATORS.forEach(c => map.set(c.id, c));
  EXPANDED_FINANCE_CALCULATORS.forEach(c => map.set(c.id, c));
  EXPANDED_HEALTH_MATH_CALCULATORS.forEach(c => map.set(c.id, c));
  FULL_CATALOG_SUPPLEMENT.forEach(c => map.set(c.id, c));
  FINAL_CALCULATOR_NET_CATALOG.forEach(c => map.set(c.id, c));
  MASTER_CALCULATOR_NET_250.forEach(c => map.set(c.id, c));
  ULTIMATE_FINANCE_CALCULATORS.forEach(c => map.set(c.id, c));
  ULTIMATE_FINANCE_PART2_CALCULATORS.forEach(c => map.set(c.id, c));
  ULTIMATE_HEALTH_CALCULATORS.forEach(c => map.set(c.id, c));
  ULTIMATE_MATH_SCIENCE_CALCULATORS.forEach(c => map.set(c.id, c));
  ULTIMATE_EVERYDAY_CALCULATORS.forEach(c => map.set(c.id, c));
  COMPREHENSIVE_EXPANDED_260_CALCULATORS.forEach(c => map.set(c.id, c));
  GRAND_MASTER_SUITE_260_PLUS.forEach(c => map.set(c.id, c));
  GRAND_MASTER_PART2_SUITE.forEach(c => map.set(c.id, c));
  GRAND_MASTER_PART3_SUITE.forEach(c => map.set(c.id, c));
  GRAND_MASTER_PART4_SUITE.forEach(c => map.set(c.id, c));
  GRAND_MASTER_PART5_SUITE.forEach(c => map.set(c.id, c));
  GLOBAL_CALCULATORS_SUITE.forEach(c => map.set(c.id, c));
  PHASE2_CALCULATORS_SUITE.forEach(c => map.set(c.id, c));

  return Array.from(map.values());
}

export const COMPLETE_CALCULATOR_SUITE = generateCompleteCalculatorSuite();
export const calculatorsRegistry = COMPLETE_CALCULATOR_SUITE;

