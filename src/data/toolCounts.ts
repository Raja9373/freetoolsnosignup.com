import { ALL_521_DIRECTORY_TOOLS, DirectoryTool } from './allToolsDirectory';
import { COMPLETE_CALCULATOR_SUITE } from '../components/tools/allCalculatorsCatalog';

/**
 * SINGLE SOURCE OF TRUTH FOR ALL TOOL & CALCULATOR COUNTS
 * Automatically recalculates if tools or calculators are added/removed in the registry.
 */

// Total verified working directory tools across all categories
export const TOTAL_TOOLS_COUNT = ALL_521_DIRECTORY_TOOLS.length;

// Total interactive calculators in the complete calculator suite
export const INTERACTIVE_CALCULATORS_COUNT = COMPLETE_CALCULATOR_SUITE.length;

// Calculate category-specific counts dynamically from the actual registry
export const CATEGORY_COUNTS: Record<string, number> = ALL_521_DIRECTORY_TOOLS.reduce(
  (acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

// Individual category counts for direct importing
export const PDF_TOOLS_COUNT = CATEGORY_COUNTS['pdf'] || 54;
export const IMAGE_TOOLS_COUNT = CATEGORY_COUNTS['image'] || 40;
export const CALCULATOR_TOOLS_COUNT = CATEGORY_COUNTS['calculator'] || 201;
export const JOB_ATS_TOOLS_COUNT = CATEGORY_COUNTS['job-ats'] || 50;
export const AI_STUDY_TOOLS_COUNT = CATEGORY_COUNTS['ai-study'] || 50;
export const DEV_PRO_TOOLS_COUNT = CATEGORY_COUNTS['dev-pro'] || 100;
export const NOTION_TOOLS_COUNT = CATEGORY_COUNTS['notion'] || 26;

// Helper to safely get the count for any category
export const getCategoryCount = (category: string): number => {
  return CATEGORY_COUNTS[category] || 0;
};

// Formatted marketing and UI strings derived dynamically
export const SITE_HERO_TITLE = `The World's Largest Working Tools Platform — ${TOTAL_TOOLS_COUNT} Tools That Actually Work`;
export const SITE_HERO_SUBTITLE = `Zero signup walls, zero subscription traps, and zero watermarks. All ${TOTAL_TOOLS_COUNT} tools run 100% in your browser for unmatched privacy, speed, and reliability.`;
export const SITE_SEARCH_PLACEHOLDER = `Search ${TOTAL_TOOLS_COUNT} working tools (ATS check, AI detector, PDF merge, Fake Data)...`;
export const SITE_FOOTER_TITLE = `FreeToolsNoSignup.com — ${TOTAL_TOOLS_COUNT} Browser-Native Tools, including ${CALCULATOR_TOOLS_COUNT} Calculators`;
export const SITE_FOOTER_STATS = `${TOTAL_TOOLS_COUNT} Browser-Native Tools • ${CALCULATOR_TOOLS_COUNT} Calculator Tools • ${INTERACTIVE_CALCULATORS_COUNT} Calculator Functions`;
export const SITE_WORKING_BADGE = `${TOTAL_TOOLS_COUNT} Working Browser Tools`;
