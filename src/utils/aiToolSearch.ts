import Fuse, { IFuseOptions } from 'fuse.js';
import toolsData from '../data/tools.json';
import { MASTER_CATEGORIES } from '../data/masterCategoryData';

export interface SearchableTool {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  subcategory?: string;
  description: string;
  isFlagship?: boolean;
  intentKeywords?: string;
  hindiKeywords?: string;
  spanishKeywords?: string;
}

// Build subcategory lookup map from MASTER_CATEGORIES
const SUBCATEGORY_LOOKUP = new Map<string, string>();
try {
  MASTER_CATEGORIES.forEach(cat => {
    cat.subcategories.forEach(sub => {
      sub.tools.forEach(tool => {
        if (tool.slug) SUBCATEGORY_LOOKUP.set(tool.slug.toLowerCase(), sub.name);
        if (tool.id) SUBCATEGORY_LOOKUP.set(tool.id.toLowerCase(), sub.name);
      });
    });
  });
} catch {
  // Graceful fallback
}

// Multilingual Intent Map for popular requests
const INTENT_MAPPINGS: Record<string, { hi: string; es: string; en: string }> = {
  'pdf-merge': {
    hi: 'pdf jodna hai pdf combine jodo ek sath merge files',
    es: 'unir pdf combinar pdf juntar documentos',
    en: 'merge pdf combine join multiple files together'
  },
  'pdf-to-word': {
    hi: 'pdf se word convert docx editable text',
    es: 'convertir pdf a word docx documento',
    en: 'pdf to word docx extract convert document'
  },
  'word-to-pdf': {
    hi: 'word se pdf banana docx to pdf',
    es: 'word a pdf convertir documento',
    en: 'word to pdf docx convert printable'
  },
  'pdf-split': {
    hi: 'pdf todna alag karna page nikalna extract cut',
    es: 'dividir pdf separar paginas cortar',
    en: 'split pdf extract pages separate cut range'
  },
  'pdf-compress': {
    hi: 'pdf size chota karna compress mb to kb kam karna',
    es: 'comprimir pdf reducir tamano optimizar',
    en: 'compress pdf reduce file size shrink mb to kb'
  },
  'notion-template-builder': {
    hi: 'notion database banana template builder board table create',
    es: 'crear base de datos notion plantilla tabla',
    en: 'notion database builder custom template kanban crm'
  },
  'custom-notion-template-database-builder': {
    hi: 'notion database banana dabba 7 template builder board table',
    es: 'crear base de datos notion plantilla tabla dabba 7',
    en: 'notion database builder dabba 7 custom template kanban'
  },
  'ats-checker': {
    hi: 'resume check karna hai ats score cv scan review naukri job',
    es: 'revisar curriculum vitae puntuacion ats escanear',
    en: 'check resume ats score scanner cv matcher job application'
  },
  'ats-resume-scanner': {
    hi: 'resume check karna hai ats score cv scan review naukri job',
    es: 'revisar curriculum vitae puntuacion ats escanear',
    en: 'check resume ats score scanner cv matcher job application'
  },
  'bg-remover': {
    hi: 'image ka background hatana photo transparent cut out piche ka hataye',
    es: 'quitar fondo de imagen borrar transparente png',
    en: 'remove image background transparent background cutout transparent png'
  },
  'image-compressor': {
    hi: 'photo compress size kam karna photo mb se kb',
    es: 'comprimir imagen reducir foto',
    en: 'compress image shrink picture size reduce kb mb'
  },
  'fake-data-generator': {
    hi: 'fake data test card dummy name address nakli data credit card luhn',
    es: 'generar datos falsos tarjetas prueba direccion',
    en: 'fake data generator dummy identity mock users test credit card'
  },
  'qr-generator': {
    hi: 'qr code banana bar code scan link to qr',
    es: 'crear codigo qr generar barcode',
    en: 'create qr code generator barcode wifi url'
  },
  'json-formatter': {
    hi: 'json beautify sundar karna validate tree format parser',
    es: 'formatear json embellecer validar visor',
    en: 'json formatter validator beautify tree viewer'
  },
  'emi-calculator': {
    hi: 'kist nikalna emi calculate loan car home bike',
    es: 'calcular cuota prestamo hipoteca',
    en: 'emi calculator monthly installment loan car home'
  },
  'sip-calculator': {
    hi: 'sip nikalna mutual fund investment return calculate',
    es: 'calculadora sip inversion fondo mutuo',
    en: 'sip calculator mutual fund wealth compounded return'
  },
  'ai-detector': {
    hi: 'chatgpt pakadna ai content detect plagiarism text check',
    es: 'detector de contenido ia texto chatgpt',
    en: 'ai content detector chatgpt checker plagiarism'
  },
  'ai-content-detector': {
    hi: 'chatgpt pakadna ai content detect plagiarism text check',
    es: 'detector de contenido ia texto chatgpt',
    en: 'ai content detector chatgpt checker plagiarism'
  }
};

// Enrich tools with multilingual intent keywords
const ENRICHED_TOOLS: SearchableTool[] = (toolsData as any[]).map(tool => {
  const toolId = tool.id || tool.slug || '';
  const toolSlug = tool.slug || tool.id || '';
  const mapping = INTENT_MAPPINGS[toolId] || INTENT_MAPPINGS[toolSlug] || { hi: '', es: '', en: '' };
  
  const subcategory = 
    tool.subcategory || 
    SUBCATEGORY_LOOKUP.get(toolSlug.toLowerCase()) || 
    SUBCATEGORY_LOOKUP.get(toolId.toLowerCase()) || 
    (tool.category === 'pdf' ? 'Convert' : tool.category === 'image' ? 'Edit & Enhance' : 'General');

  // Generic keywords based on category and name
  const genericKeywords = `${tool.name} ${tool.categoryName || ''} ${tool.category || ''} ${subcategory} free no signup`;

  return {
    id: toolId,
    slug: toolSlug,
    name: tool.name,
    category: tool.category || 'tools',
    categoryName: tool.categoryName || `${(tool.category || 'all').toUpperCase()} Tools`,
    subcategory,
    description: tool.description || '',
    isFlagship: !!tool.isFlagship,
    intentKeywords: `${genericKeywords} ${mapping.en}`,
    hindiKeywords: mapping.hi,
    spanishKeywords: mapping.es
  };
});

const FUSE_OPTIONS: IFuseOptions<SearchableTool> = {
  threshold: 0.4,
  includeScore: true,
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'intentKeywords', weight: 0.65 },
    { name: 'hindiKeywords', weight: 0.6 },
    { name: 'spanishKeywords', weight: 0.55 },
    { name: 'description', weight: 0.45 },
    { name: 'subcategory', weight: 0.4 },
    { name: 'categoryName', weight: 0.3 },
    { name: 'category', weight: 0.2 }
  ]
};

let fuseInstance: Fuse<SearchableTool> | null = null;

export function getFuseInstance(): Fuse<SearchableTool> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(ENRICHED_TOOLS, FUSE_OPTIONS);
  }
  return fuseInstance;
}

// Stop words to strip for natural language intent detection
const STOP_WORDS = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'you', 'your', 'need', 'want', 'please', 
  'help', 'can', 'how', 'to', 'do', 'the', 'a', 'an', 'and', 'or', 'for', 'with',
  'in', 'on', 'at', 'by', 'from', 'of', 'tool', 'tools', 'free', 'online'
]);

export function searchToolsSemantic(query: string, limit: number = 20): SearchableTool[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const lower = trimmed.toLowerCase();

  // Natural Language Intent normalization
  // e.g. "I need to merge my pdfs" -> tokens: ["merge", "pdfs"]
  const rawTokens = lower.split(/[^a-z0-9+#]+/).filter(Boolean);
  const cleanTokens = rawTokens.filter(t => !STOP_WORDS.has(t));
  const effectiveTokens = cleanTokens.length > 0 ? cleanTokens : rawTokens;

  // Exact / High-priority matches (e.g. tool name includes "pdf to word", or tool includes all tokens)
  const priorityMatches: SearchableTool[] = [];
  const seenIds = new Set<string>();

  // 1. Direct name or slug match
  for (const tool of ENRICHED_TOOLS) {
    const tName = tool.name.toLowerCase();
    const tSlug = tool.slug.toLowerCase();
    
    // Exact or near-exact phrase match in name
    if (tName.includes(lower) || tSlug.includes(lower.replace(/\s+/g, '-'))) {
      priorityMatches.push(tool);
      seenIds.add(tool.id);
      if (priorityMatches.length >= limit) break;
    }
  }

  // 2. Token-based matching if under limit (all tokens must match)
  if (priorityMatches.length < limit && effectiveTokens.length > 0) {
    for (const tool of ENRICHED_TOOLS) {
      if (seenIds.has(tool.id)) continue;
      const haystack = `${tool.name} ${tool.subcategory || ''} ${tool.category} ${tool.description}`.toLowerCase();
      const allMatch = effectiveTokens.every(tok => {
        // Handle singular/plural roughly (e.g., pdfs -> pdf)
        const singular = tok.endsWith('s') && tok.length > 3 ? tok.slice(0, -1) : tok;
        return haystack.includes(tok) || haystack.includes(singular);
      });
      if (allMatch) {
        priorityMatches.push(tool);
        seenIds.add(tool.id);
        if (priorityMatches.length >= limit) break;
      }
    }
  }

  // 3. Fuse.js semantic fuzzy search
  const fuse = getFuseInstance();
  const searchPhrase = cleanTokens.join(' ') || trimmed;
  const fuseResults = fuse.search(searchPhrase, { limit: limit * 2 });

  for (const r of fuseResults) {
    if (!seenIds.has(r.item.id)) {
      priorityMatches.push(r.item);
      seenIds.add(r.item.id);
      if (priorityMatches.length >= limit) break;
    }
  }

  return priorityMatches.slice(0, limit);
}

export function getAllSearchableTools(): SearchableTool[] {
  return ENRICHED_TOOLS;
}
