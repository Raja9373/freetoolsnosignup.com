export interface MasterCategory {
  id: string;
  number: number;
  name: string;
  slug: string;
  type: 'tool' | 'calculator' | 'ai-update';
  description: string;
  subcategories: string[];
  referenceSites?: string[];
}

export interface ToolRegistryItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategory: string;
  description: string;
  keywords: string[];
  aliases: string[];
  implementationType: 'client-side' | 'server-side' | 'hybrid';
  inputTypes: string[];
  outputTypes: string[];
  supportedFormats: string[];
  status: 'DRAFT' | 'PLANNED' | 'IN DEVELOPMENT' | 'TESTING' | 'PASSED' | 'PUBLISHED' | 'NEEDS REVIEW' | 'DEPRECATED';
  isPublished: boolean;
  seoTitle: string;
  metaDescription: string;
  howToUse: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedTools: string[];
  relatedCalculators: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CalculatorRegistryItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategory: string;
  description: string;
  keywords: string[];
  aliases: string[];
  formula: string;
  inputs: Array<{ name: string; type: string; defaultVal: any; label: string }>;
  outputs: Array<{ name: string; type: string; label: string }>;
  examples: Array<{ input: Record<string, any>; output: Record<string, any> }>;
  howToUse: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedCalculators: string[];
  seoTitle: string;
  metaDescription: string;
  status: 'DRAFT' | 'PLANNED' | 'IN DEVELOPMENT' | 'TESTING' | 'PASSED' | 'PUBLISHED';
  isPublished: boolean;
}

export interface AIUpdateRegistryItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  updatedAt: string;
  image?: string;
  status: 'VERIFIED' | 'PENDING' | 'ARCHIVED';
  isVerified: boolean;
  canonicalUrl: string;
}

export interface ReferenceSiteMapping {
  referenceSite: string;
  referenceToolName: string;
  referenceUrl: string;
  ourToolName: string;
  ourCategory: string;
  implementationStatus: string;
  notes: string;
}

// THE 40 MASTER CATEGORIES TAXONOMY
export const MASTER_CATEGORIES: MasterCategory[] = [
  // --- TOOLS (01 - 18) ---
  {
    number: 1,
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    type: 'tool',
    description: 'Merge, Split, Compress, Edit, Sign, Protect, Unlock, OCR, and document conversion utilities.',
    subcategories: ['Merge & Split', 'Compress & Optimize', 'Convert to PDF', 'PDF from PDF', 'Security & Sign', 'OCR & Extract'],
    referenceSites: ['PDF24', 'TinyWow']
  },
  {
    number: 2,
    id: 'image-tools',
    name: 'Image Tools',
    slug: 'image-tools',
    type: 'tool',
    description: 'Resize, Compress, Crop, Convert, Background Remove, Watermark, and format conversion utilities.',
    subcategories: ['Compress & Resize', 'Format Conversion', 'Background & Object Remove', 'Effects & Filters', 'Metadata & SVG'],
    referenceSites: ['TinyWow', '123apps']
  },
  {
    number: 3,
    id: 'video-tools',
    name: 'Video Tools',
    slug: 'video-tools',
    type: 'tool',
    description: 'Convert, Compress, Trim, Crop, Resize, Merge, GIF generator, and audio extraction utilities.',
    subcategories: ['Convert & Compress', 'Cut & Trim', 'GIF & WebP', 'Audio Extraction', 'Effects & Speed'],
    referenceSites: ['123apps']
  },
  {
    number: 4,
    id: 'audio-tools',
    name: 'Audio / MP3 Tools',
    slug: 'audio-tools',
    type: 'tool',
    description: 'MP3 converter, WAV, OGG, AAC, M4A, Trim, Merge, Volume, Pitch, Speed, and Noise removal.',
    subcategories: ['Converters', 'Cutters & Trimmers', 'Effects & Volume', 'Voice Recorders'],
    referenceSites: ['123apps']
  },
  {
    number: 5,
    id: 'document-tools',
    name: 'Document & Office Tools',
    slug: 'document-tools',
    type: 'tool',
    description: 'Word, Excel, CSV, PowerPoint, EPUB, TXT, RTF document conversion and spreadsheet utilities.',
    subcategories: ['Spreadsheet Utilities', 'Word Processors', 'EPUB & E-books']
  },
  {
    number: 6,
    id: 'file-tools',
    name: 'File & Archive Tools',
    slug: 'file-tools',
    type: 'tool',
    description: 'ZIP, TAR, GZIP, 7Z, extract, create archive, split archive, and file comparison utilities.',
    subcategories: ['Archive Creation', 'Extraction', 'File Comparison']
  },
  {
    number: 7,
    id: 'text-tools',
    name: 'Text & Writing',
    slug: 'text-tools',
    type: 'tool',
    description: 'Word Counter, Character Counter, Case Converter, Whitespace Cleaner, Formatter, and Lorem Ipsum.',
    subcategories: ['Counters & Stats', 'Case Converters', 'Formatters & Cleaners', 'Generators']
  },
  {
    number: 8,
    id: 'ocr-tools',
    name: 'OCR & Scanning',
    slug: 'ocr-tools',
    type: 'tool',
    description: 'Image to Text, PDF to Text, handwriting OCR, receipt OCR, and ID document OCR scanning.',
    subcategories: ['Image OCR', 'PDF OCR', 'Receipt & Invoice OCR']
  },
  {
    number: 9,
    id: 'ai-tools',
    name: 'AI Tools',
    slug: 'ai-tools',
    type: 'tool',
    description: 'AI writing, summarizer, paraphraser, rewriter, image generation, chatbot, and coding AI.',
    subcategories: ['AI Writing & Paraphrase', 'AI Summarizers', 'AI Image Generation', 'AI Chat & Assistants'],
    referenceSites: ['TinyWow']
  },
  {
    number: 10,
    id: 'ai-agents',
    name: 'AI Agents',
    slug: 'ai-agents',
    type: 'tool',
    description: 'Business, Content, Programming, Design, Video, Audio, Finance, Legal, and Education agent workflows.',
    subcategories: ['Content Agents', 'Coding Agents', 'Productivity Agents', 'Workflow Automation']
  },
  {
    number: 11,
    id: 'dev-tools',
    name: 'Developer Tools',
    slug: 'dev-tools',
    type: 'tool',
    description: 'JSON, XML, YAML, HTML, CSS, JavaScript, SQL, Regex, API, Base64, JWT, Hash formatting and minification.',
    subcategories: ['Formatters & Validators', 'Encoders & Decoders', 'Hash & Crypto', 'Parsers']
  },
  {
    number: 12,
    id: 'web-tools',
    name: 'Web / Internet Tools',
    slug: 'web-tools',
    type: 'tool',
    description: 'URL tools, website checker, headers, redirects, HTTP status, robots.txt, sitemap, and favicon generator.',
    subcategories: ['URL & Redirects', 'Sitemap & Robots', 'Favicon & Meta']
  },
  {
    number: 13,
    id: 'domain-dns',
    name: 'Domain & DNS',
    slug: 'domain-dns',
    type: 'tool',
    description: 'WHOIS, DNS lookup, propagation, MX, SPF, DKIM, DMARC, nameserver, and domain availability utilities.',
    subcategories: ['DNS Lookup', 'WHOIS & Registrar', 'Email Auth (SPF/DKIM)']
  },
  {
    number: 14,
    id: 'ip-network',
    name: 'IP & Network',
    slug: 'ip-network',
    type: 'tool',
    description: 'IP lookup, subnet tools, ping, port check, traceroute, user-agent, and network diagnostic utilities.',
    subcategories: ['IP Geolocation', 'Port Check & Ping', 'Subnet Calculators']
  },
  {
    number: 15,
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    type: 'tool',
    description: 'Password utilities, encryption, hash, SSL, security headers, token tools, and privacy checkers.',
    subcategories: ['Password & Hashing', 'SSL & Certificates', 'Security Headers']
  },
  {
    number: 16,
    id: 'seo-tools',
    name: 'SEO',
    slug: 'seo-tools',
    type: 'tool',
    description: 'Meta analyzer, keyword tools, sitemap, robots.txt, schema, SERP utilities, and backlink utilities.',
    subcategories: ['Meta & SERP', 'Keyword Research', 'Schema Generators', 'Backlink Analyzers'],
    referenceSites: ['SmallSEOTools']
  },
  {
    number: 17,
    id: 'digital-marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    type: 'tool',
    description: 'Ad copy, campaign tools, UTM builder, headline analyzer, CTA generator, and email marketing utilities.',
    subcategories: ['UTM Builder', 'Ad Copy & Headlines', 'Email Marketing']
  },
  {
    number: 18,
    id: 'social-media',
    name: 'Social Media',
    slug: 'social-media',
    type: 'tool',
    description: 'YouTube, Instagram, Facebook, TikTok, LinkedIn, X, Pinterest, Reddit, WhatsApp, and Telegram utilities.',
    subcategories: ['Video Download & Tags', 'Bio & Caption Generators', 'Hashtag & Analytics']
  },

  // --- CALCULATORS (19) ---
  {
    number: 19,
    id: 'calculators-hub',
    name: 'Calculators (Master Hub)',
    slug: 'calculators',
    type: 'calculator',
    description: 'Comprehensive calculator ecosystem covering financial, mathematical, scientific, health, and engineering.',
    subcategories: ['Financial', 'Mathematical', 'Scientific', 'Health & Fitness', 'Engineering', 'Real Estate']
  },

  // --- ADDITIONAL CATEGORIES (20 - 40) ---
  {
    number: 20,
    id: 'finance-tools',
    name: 'Finance',
    slug: 'finance',
    type: 'tool',
    description: 'EMI, SIP, CAGR, ROI, investment, tax, GST, accounting, invoice, payroll, and currency utilities.',
    subcategories: ['Investment & SIP', 'Loans & EMI', 'Tax & Salary', 'Accounting & Invoices']
  },
  {
    number: 21,
    id: 'education-tools',
    name: 'Education',
    slug: 'education',
    type: 'tool',
    description: 'Flashcards, quiz, exam, student, teacher, GPA, grade, study planner, and citation utilities.',
    subcategories: ['GPA & Grades', 'Flashcards & Study', 'Citations']
  },
  {
    number: 22,
    id: 'design-graphics',
    name: 'Design & Graphics',
    slug: 'design-graphics',
    type: 'tool',
    description: 'Color, palette, fonts, icons, SVG, logo, poster, thumbnail, favicon, and graphics utilities.',
    subcategories: ['Color Palettes', 'SVG & Icons', 'Typography']
  },
  {
    number: 23,
    id: 'cad-3d',
    name: '3D / CAD',
    slug: 'cad-3d',
    type: 'tool',
    description: '3D conversion, model utilities, CAD conversion, STL, OBJ, DXF, and measurement utilities.',
    subcategories: ['STL & OBJ Utilities', 'CAD Conversion']
  },
  {
    number: 24,
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    type: 'tool',
    description: 'AWS, Azure, Google Cloud, Docker, Kubernetes, Git, Firebase, databases, and Linux utilities.',
    subcategories: ['Docker & K8s', 'Git & CI/CD', 'Cloud Configs']
  },
  {
    number: 25,
    id: 'ecommerce',
    name: 'E-commerce',
    slug: 'ecommerce',
    type: 'tool',
    description: 'Amazon seller, Shopify, Etsy, eBay, WooCommerce, dropshipping, product research, and pricing utilities.',
    subcategories: ['Pricing & Margins', 'Product Research', 'Shopify & Amazon']
  },
  {
    number: 26,
    id: 'business-productivity',
    name: 'Business & Productivity',
    slug: 'business-productivity',
    type: 'tool',
    description: 'CRM, ERP, project management, notes, calendar, meetings, Gantt, and productivity utilities.',
    subcategories: ['Project Management', 'Notes & Planners', 'Meeting Calculators']
  },
  {
    number: 27,
    id: 'email-communication',
    name: 'Email & Communication',
    slug: 'email-communication',
    type: 'tool',
    description: 'Email validation, temporary email utilities, headers, signatures, SMTP, and communication utilities.',
    subcategories: ['Email Validation', 'Signatures', 'SMTP Check']
  },
  {
    number: 28,
    id: 'maps-weather-travel',
    name: 'Maps / Weather / Travel',
    slug: 'maps-weather-travel',
    type: 'tool',
    description: 'Coordinates, distance, timezone, maps, weather, and travel utilities.',
    subcategories: ['Distance & Coordinates', 'Timezone Converters', 'Weather Tools']
  },
  {
    number: 29,
    id: 'mobile-app-tools',
    name: 'Mobile & App Tools',
    slug: 'mobile-app-tools',
    type: 'tool',
    description: 'APK, Android, iPhone, and mobile/app utilities.',
    subcategories: ['Android APK', 'iOS Utilities']
  },
  {
    number: 30,
    id: 'browser-tools',
    name: 'Browser Tools',
    slug: 'browser-tools',
    type: 'tool',
    description: 'Chrome, Firefox, browser diagnostics, and extension utilities.',
    subcategories: ['Extension Builders', 'Diagnostics']
  },
  {
    number: 31,
    id: 'os-utilities',
    name: 'Windows / Mac / Linux',
    slug: 'os-utilities',
    type: 'tool',
    description: 'Operating-system utilities, system information, command generators, and troubleshooting utilities.',
    subcategories: ['Command Generators', 'System Info']
  },
  {
    number: 32,
    id: 'qr-barcode',
    name: 'QR / Barcode',
    slug: 'qr-barcode',
    type: 'tool',
    description: 'QR generator, scanner, Wi-Fi QR, vCard, URL, barcode generator, and barcode reader.',
    subcategories: ['QR Generators', 'Barcode Generators', 'Scanners']
  },
  {
    number: 33,
    id: 'time-date',
    name: 'Time & Date',
    slug: 'time-date',
    type: 'tool',
    description: 'Timezone, timestamp, countdown, date difference, working days, calendar, and time utilities.',
    subcategories: ['Timestamp Converters', 'Date Calculators', 'Countdowns']
  },
  {
    number: 34,
    id: 'unit-currency',
    name: 'Unit & Currency Conversion',
    slug: 'unit-currency',
    type: 'tool',
    description: 'Length, weight, temperature, area, volume, speed, pressure, energy, and currency conversion.',
    subcategories: ['Length & Weight', 'Temperature & Area', 'Currency Converter']
  },
  {
    number: 35,
    id: 'health-fitness',
    name: 'Health & Fitness',
    slug: 'health-fitness',
    type: 'tool',
    description: 'BMI, calorie, BMR, macro, body fat, pace, pregnancy/date, and fitness utilities.',
    subcategories: ['BMI & BMR', 'Calorie & Macros', 'Fitness Pace']
  },
  {
    number: 36,
    id: 'legal-documents',
    name: 'Legal & Documents',
    slug: 'legal-documents',
    type: 'tool',
    description: 'Agreement generators, invoice/quote, privacy/terms generators, and document helpers.',
    subcategories: ['Privacy & Terms Generators', 'Agreement Templates']
  },
  {
    number: 37,
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    type: 'tool',
    description: 'Mortgage, rent vs buy, ROI, property valuation, rental yield, cap rate, and real-estate utilities.',
    subcategories: ['Mortgage & Affordability', 'Rental Yield & Cap Rate']
  },
  {
    number: 38,
    id: 'food-recipe',
    name: 'Food & Recipe',
    slug: 'food-recipe',
    type: 'tool',
    description: 'Recipe scaling, nutrition, ingredient conversion, cooking timers, and food utilities.',
    subcategories: ['Recipe Scaling', 'Ingredient Conversion', 'Cooking Timers']
  },
  {
    number: 39,
    id: 'entertainment-fun',
    name: 'Entertainment & Fun',
    slug: 'entertainment-fun',
    type: 'tool',
    description: 'Random generators, games, name generators, trivia, probability/fun utilities, and entertainment tools.',
    subcategories: ['Random Generators', 'Name Generators', 'Trivia & Games']
  },
  {
    number: 40,
    id: 'accessibility',
    name: 'Accessibility',
    slug: 'accessibility',
    type: 'tool',
    description: 'Contrast checker, text-to-speech, readability, color-blindness, and accessibility utilities.',
    subcategories: ['Color Contrast', 'Readability Checkers', 'Screen Reader Tools']
  }
];

// REFERENCE-SITE MAPPING SYSTEM
export const REFERENCE_SITE_MAPPINGS: ReferenceSiteMapping[] = [
  {
    referenceSite: 'PDF24',
    referenceToolName: 'PDF Compressor',
    referenceUrl: 'https://pdf24.org/compress-pdf',
    ourToolName: 'PDF Compressor Pro',
    ourCategory: 'pdf-tools',
    implementationStatus: 'PLANNED',
    notes: 'Client-side PDF compression utility mapping'
  },
  {
    referenceSite: 'TinyWow',
    referenceToolName: 'Image Background Remover',
    referenceUrl: 'https://tinywow.com/remove-background',
    ourToolName: 'AI Background Remover',
    ourCategory: 'image-tools',
    implementationStatus: 'PLANNED',
    notes: 'Image cutout and transparency utility'
  },
  {
    referenceSite: '123apps',
    referenceToolName: 'Video Cutter & Merger',
    referenceUrl: 'https://123apps.com/cut-video',
    ourToolName: 'Online Video Trimmer',
    ourCategory: 'video-tools',
    implementationStatus: 'PLANNED',
    notes: 'Browser-native video editing utility'
  },
  {
    referenceSite: 'SmallSEOTools',
    referenceToolName: 'Plagiarism Checker & Meta Inspector',
    referenceUrl: 'https://smallseotools.com',
    ourToolName: 'SEO Meta Analyzer & Inspector',
    ourCategory: 'seo-tools',
    implementationStatus: 'PLANNED',
    notes: 'On-page SEO audit utility'
  }
];

// UNIFIED SEARCH INDEX ARCHITECTURE
export function searchMasterCatalog(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { categories: [], tools: [], calculators: [] };

  const matchedCategories = MASTER_CATEGORIES.filter(
    c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.subcategories.some(s => s.toLowerCase().includes(q))
  );

  return {
    categories: matchedCategories,
    query: q
  };
}
