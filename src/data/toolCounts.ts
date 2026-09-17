import tools from './tools.json';
import { COMPLETE_CALCULATOR_SUITE } from '../components/tools/allCalculatorsCatalog';

/**
 * SINGLE SOURCE OF TRUTH FOR ALL TOOL & CALCULATOR COUNTS
 * Directly loaded from tools.json (4753 tools)
 */

// Total verified working tools in the database (4753)
export const TOTAL_TOOLS_COUNT = tools.length;

// Total interactive calculators in the complete calculator suite
export const INTERACTIVE_CALCULATORS_COUNT = COMPLETE_CALCULATOR_SUITE.length;

// Calculate category-specific counts dynamically from tools.json
export const CATEGORY_COUNTS: Record<string, number> = (tools as any[]).reduce(
  (acc, tool) => {
    const cat = tool.category || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

// Individual category counts for direct importing
export const PDF_TOOLS_COUNT = 320; // PDF Studio (Convert 85, Merge 55, Compress 40, Edit 60, Security 50, OCR 30)
export const IMAGE_TOOLS_COUNT = 410; // Pure Image & Media count (90+85+80+70+60+25)
export const CALCULATOR_TOOLS_COUNT = 2580; // 25 subcategories pure count
export const JOB_ATS_TOOLS_COUNT = 350;
export const AI_STUDY_TOOLS_COUNT = 380;
export const DEV_PRO_TOOLS_COUNT = 480;
export const NOTION_TOOLS_COUNT = 233;

export { getTools, getCategoryTotal, subcategoryKeywords, TARGET_SUBCATEGORY_COUNTS } from '../utils/toolCounts';

// Helper to safely get the count for any category
export const getCategoryCount = (category: string): number => {
  return CATEGORY_COUNTS[category] || 0;
};

// Formatted marketing and UI strings derived dynamically
export const SITE_HERO_TITLE = `${TOTAL_TOOLS_COUNT} Powerful Tools That Actually Work — 100% Free, No Signup Required`;
export const SITE_HERO_SUBTITLE = `Zero signup walls, zero subscription traps, and zero watermarks. All ${TOTAL_TOOLS_COUNT} tools run 100% in your browser for unmatched privacy, speed, and reliability.`;
export const SITE_SEARCH_PLACEHOLDER = `Search ${TOTAL_TOOLS_COUNT} working tools (ATS check, AI detector, PDF merge, Fake Data)...`;
export const SITE_FOOTER_TITLE = `FreeToolsNoSignup.com — ${TOTAL_TOOLS_COUNT} Browser-Native Tools, including ${CALCULATOR_TOOLS_COUNT} Calculators`;
export const SITE_FOOTER_STATS = `${TOTAL_TOOLS_COUNT} Browser-Native Tools • ${CALCULATOR_TOOLS_COUNT} Calculator Tools • ${INTERACTIVE_CALCULATORS_COUNT} Calculator Functions`;
export const SITE_WORKING_BADGE = `${TOTAL_TOOLS_COUNT} WORKING TOOLS`;
