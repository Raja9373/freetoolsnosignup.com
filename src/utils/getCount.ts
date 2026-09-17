import { allTools, ToolItem } from '../data/allTools';

/**
 * SINGLE SOURCE OF TRUTH FOR COUNTS & TOOLS
 * Fixes Screenshot_1898.png (320 placeholder bug) and Screenshot_1910.png (90 vs 4 mismatch)
 * Both the subcategory card badge and the tools list below derive their count strictly from tools.length!
 */

export const subcategoryKeywords: Record<string, string[]> = {
  // PDF Suite Subcategories
  'pdf-convert': [
    'pdf to word', 'pdf to excel', 'pdf to powerpoint', 'pdf to ppt', 'pdf to jpg', 'pdf to png', 
    'word to pdf', 'excel to pdf', 'ppt to pdf', 'jpg to pdf', 'png to pdf', 'epub to pdf', 'mobi to pdf',
    'text to pdf', 'pdf to text', 'csv to pdf', 'xml to pdf', 'svg to pdf', 'bmp to pdf', 'tiff to pdf',
    'pdf to epub', 'pdf to csv', 'pdf to json', 'pdf to svg', 'rtf to pdf', 'odt to pdf', 'webp to pdf', 'pdf to bmp'
  ],
  'pdf-merge-split': [
    'merge pdf', 'split pdf', 'extract pages', 'reorder pages', 'rotate pages', 'pdf booklet', 
    'reverse pdf', 'pdf n-up', 'delete pages', 'split by size', 'split by bookmarks', 'alternate merge', 
    'extract odd even', 'batch combine', 'pdf combine'
  ],
  'pdf-compress': [
    'compress pdf', 'reduce pdf', 'optimize pdf', 'repair pdf', 'reduce size to 100kb', 
    'linearize pdf', 'embedded fonts', 'downsample images', 'grayscale compress', 'flatten annotations'
  ],
  'pdf-edit': [
    'edit text', 'add watermark', 'add page numbers', 'crop pages', 'add header footer',
    'resizer', 'grayscale', 'metadata editor', 'redact', 'draw annotate', 'insert image'
  ],
  'pdf-security': [
    'protect pdf', 'unlock pdf', 'esign pdf', 'add password', 'remove password', 
    'restrict printing', 'certificate sign', 'verify signature', 'sanitize', 'audit trail', 'hash integrity'
  ],
  'pdf-ocr': [
    'ocr pdf', 'extract text', 'extract images', 'extract tables', 'form filler', 'compare two pdf', 'font inspector'
  ],

  // Image & Media Subcategories
  'image-compress-resize': [
    'lossless compressor', 'bulk resizer', 'target size', 'scale crop', 'svg optimizer', 
    'compress image', 'resize image', 'image-reduce-kb', 'image-compressor', 'image-resizer'
  ],
  'img-compress-resize': [
    'lossless compressor', 'bulk resizer', 'target size', 'scale crop', 'svg optimizer', 
    'compress image', 'resize image', 'image-reduce-kb', 'image-compressor', 'image-resizer'
  ],
  'image-convert': [
    'png to jpg', 'jpg to webp', 'heic to jpg', 'ico maker', 'image format converter', 'svg to png', 'image-converter'
  ],
  'img-convert': [
    'png to jpg', 'jpg to webp', 'heic to jpg', 'ico maker', 'image format converter', 'svg to png', 'image-converter'
  ],
  'image-edit': [
    'background remover', 'image cropper', 'rotate flipper', 'photo filter', 'bg-remover', 'image-rotator', 'image-filters'
  ],
  'img-edit-enhance': [
    'background remover', 'image cropper', 'rotate flipper', 'photo filter', 'bg-remover', 'image-rotator', 'image-filters'
  ],
  'image-color': [
    'palette generator', 'eyedropper', 'color picker', 'gradient maker', 'color-palette', 'gradient-generator'
  ],
  'img-color-palette': [
    'palette generator', 'eyedropper', 'color picker', 'gradient maker', 'color-palette', 'gradient-generator'
  ],
  'image-audio-video': [
    'audio converter', 'video trimmer', 'mp3 cutter', 'gif maker', 'audio-cutter', 'gif-maker'
  ],
  'img-audio-video': [
    'audio converter', 'video trimmer', 'mp3 cutter', 'gif maker', 'audio-cutter', 'gif-maker'
  ]
};

/**
 * Filters the single source of truth tools array.
 * If keywords match, returns matching tools; otherwise searches by category/slug.
 */
export function getTools(category: string, subcategoryId: string): ToolItem[] {
  const normCat = (category || '').toLowerCase().replace(/-suite$/, '').replace(/suite$/, '').trim();
  const normSub = (subcategoryId || '').toLowerCase().trim();

  // Try matching keywords
  const keywords = subcategoryKeywords[normSub] || subcategoryKeywords[`${normCat}-${normSub}`] || subcategoryKeywords[`img-${normSub}`];
  
  if (keywords && keywords.length > 0) {
    const matches = allTools.filter(tool =>
      keywords.some(kw => {
        const kwLower = kw.toLowerCase();
        const kwSlug = kwLower.replace(/ /g, '-');
        return (
          tool.name.toLowerCase().includes(kwLower) ||
          tool.slug.toLowerCase().includes(kwSlug) ||
          (tool.id && tool.id.toLowerCase().includes(kwSlug))
        );
      })
    );
    if (matches.length > 0) {
      return matches;
    }
  }

  // Fallback: match by tool category or subcategory property
  return allTools.filter(tool => {
    const catMatch = tool.category && (
      tool.category.toLowerCase() === normCat ||
      (normCat === 'pdf' && tool.category.toLowerCase().includes('pdf')) ||
      (normCat === 'image' && tool.category.toLowerCase().includes('image')) ||
      (normCat.includes('calc') && tool.category.toLowerCase().includes('calc'))
    );
    const subMatch = tool.subcategory && tool.subcategory.toLowerCase().includes(normSub);
    return catMatch && subMatch;
  });
}

/**
 * Returns subcategory data with GUARANTEED matching count and tools.
 * Badge count will ALWAYS equal tools.length.
 */
export function getSubcategoryWithCorrectCount(
  catId: string, 
  subId: string, 
  subName: string,
  fallbackTools: ToolItem[] = []
): { id: string; name: string; count: number; tools: ToolItem[] } {
  let tools = getTools(catId, subId);
  
  // If keyword filter matched fewer tools than curated fallback list, use the curated list
  if ((!tools || tools.length === 0) && fallbackTools.length > 0) {
    tools = fallbackTools;
  } else if (fallbackTools.length > 0 && fallbackTools.length > tools.length) {
    tools = fallbackTools;
  }

  return {
    id: subId,
    name: subName,
    count: tools.length, // SINGLE SOURCE OF TRUTH: Badge count
    tools: tools        // SINGLE SOURCE OF TRUTH: Tools list
  };
}
