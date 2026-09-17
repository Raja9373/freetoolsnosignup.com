import toolsJson from './tools.json';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName?: string;
  subcategory?: string;
  description: string;
  isFlagship?: boolean;
}

// 4753 Tools Active (2753 Core Tools + 2000 Calculators across 25 subcategories)
export const allTools: ToolItem[] = (toolsJson as ToolItem[]) || [];

export default allTools;
