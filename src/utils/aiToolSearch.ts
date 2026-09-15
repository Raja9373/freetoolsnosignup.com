import Fuse, { IFuseOptions } from 'fuse.js';
import toolsData from '../data/tools.json';

export interface SearchableTool {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  description: string;
  isFlagship?: boolean;
  intentKeywords?: string;
  hindiKeywords?: string;
  spanishKeywords?: string;
}

// Multilingual Intent Map for popular requests
const INTENT_MAPPINGS: Record<string, { hi: string; es: string; en: string }> = {
  'pdf-merge': {
    hi: 'pdf jodna hai pdf combine jodo ek sath merge files',
    es: 'unir pdf combinar pdf juntar documentos',
    en: 'merge pdf combine join multiple files together'
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
  const mapping = INTENT_MAPPINGS[tool.id] || INTENT_MAPPINGS[tool.slug] || { hi: '', es: '', en: '' };
  
  // Generic keywords based on category and name
  const genericKeywords = `${tool.name} ${tool.categoryName} ${tool.category} free no signup`;

  return {
    id: tool.id || tool.slug,
    slug: tool.slug || tool.id,
    name: tool.name,
    category: tool.category,
    categoryName: tool.categoryName || `${tool.category.toUpperCase()} Tools`,
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
    { name: 'hindiKeywords', weight: 0.65 },
    { name: 'intentKeywords', weight: 0.6 },
    { name: 'spanishKeywords', weight: 0.55 },
    { name: 'description', weight: 0.5 },
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

export function searchToolsSemantic(query: string, limit: number = 6): SearchableTool[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const fuse = getFuseInstance();
  const results = fuse.search(trimmed, { limit });

  if (results.length > 0) {
    return results.map(r => r.item);
  }

  // Fallback: simple token substring match
  const lower = trimmed.toLowerCase();
  const tokens = lower.split(/\s+/).filter(t => t.length > 2);
  
  const fallback = ENRICHED_TOOLS.filter(t => {
    const text = `${t.name} ${t.description} ${t.categoryName} ${t.intentKeywords || ''} ${t.hindiKeywords || ''}`.toLowerCase();
    return tokens.some(tok => text.includes(tok));
  }).slice(0, limit);

  if (fallback.length > 0) return fallback;

  // If still nothing, return popular flagships
  return ENRICHED_TOOLS.filter(t => t.isFlagship).slice(0, limit);
}

export function getAllSearchableTools(): SearchableTool[] {
  return ENRICHED_TOOLS;
}
