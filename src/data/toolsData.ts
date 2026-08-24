import { ToolItem } from '../types';

export const TOOLS_DATABASE: ToolItem[] = [
  // --- JOB / ATS TOOLS (50 Tools) ---
  {
    id: 'ats-checker',
    name: 'ATS Score Checker & Optimizer',
    category: 'job-ats',
    categoryName: 'Job & ATS Tools',
    description: 'Scan your resume against any Job Description, compute ATS match score, identify missing skills & auto-fix.',
    icon: 'Briefcase',
    isPopular: true,
    isHot: true,
    workingBadge: 'Working 100%',
    runsCount: 284520,
    tags: ['ats', 'resume', 'job', 'cv', 'interview', 'career']
  },
  {
    id: 'resume-builder',
    name: 'Instant Resume Builder',
    category: 'job-ats',
    categoryName: 'Job & ATS Tools',
    description: 'Create clean, ATS-compliant PDF resumes with instant preview and zero watermarks.',
    icon: 'FileText',
    isPopular: true,
    isHot: true,
    workingBadge: 'Free & Clean',
    runsCount: 142100,
    tags: ['resume', 'cv', 'builder', 'pdf', 'jobs']
  },
  {
    id: 'cover-letter-gen',
    name: 'Tailored Cover Letter Generator',
    category: 'job-ats',
    categoryName: 'Job & ATS Tools',
    description: 'Generate high-converting cover letters matching specific job postings in seconds.',
    icon: 'MailCheck',
    isPopular: true,
    isHot: true,
    workingBadge: 'Instant',
    runsCount: 98400,
    tags: ['cover letter', 'job', 'application', 'hiring']
  },
  {
    id: 'linkedin-optimizer',
    name: 'LinkedIn Headline & Bio Optimizer',
    category: 'job-ats',
    categoryName: 'Job & ATS Tools',
    description: 'Craft viral recruiter-attracting LinkedIn headlines and about sections.',
    icon: 'UserCheck',
    workingBadge: 'Recruiter Tested',
    runsCount: 65400,
    tags: ['linkedin', 'profile', 'networking', 'recruiter']
  },
  {
    id: 'salary-negotiator',
    name: 'Salary Negotiation Script Generator',
    category: 'job-ats',
    categoryName: 'Job & ATS Tools',
    description: 'Get polite yet firm negotiation scripts for counter-offers and annual appraisals.',
    icon: 'DollarSign',
    workingBadge: 'Live Guide',
    runsCount: 43200,
    tags: ['salary', 'negotiation', 'compensation', 'offer']
  },
  {
    id: 'interview-prep-coach',
    name: 'STAR Method Interview Prep',
    category: 'job-ats',
    categoryName: 'Job & ATS Tools',
    description: 'Structure behavioral interview responses with Situation, Task, Action, and Result.',
    icon: 'HelpCircle',
    workingBadge: 'Interactive',
    runsCount: 52100,
    tags: ['interview', 'star method', 'behavioral', 'questions']
  },

  // --- AI STUDY TOOLS (50 Tools) ---
  {
    id: 'ai-detector',
    name: 'AI Content Detector & Humanizer',
    category: 'ai-study',
    categoryName: 'AI Study Tools',
    description: 'Detect ChatGPT, Claude, and Gemini text with perplexity metrics & 1-click humanizer.',
    icon: 'Sparkles',
    isPopular: true,
    isNew: true,
    workingBadge: '0-100% Accuracy',
    runsCount: 312890,
    tags: ['ai detector', 'humanizer', 'chatgpt', 'bypass', 'essay']
  },
  {
    id: 'essay-paraphraser',
    name: 'Academic Paraphraser Pro',
    category: 'ai-study',
    categoryName: 'AI Study Tools',
    description: 'Rephrase academic paragraphs while preserving technical context and citation flow.',
    icon: 'RefreshCw',
    isPopular: true,
    isNew: true,
    workingBadge: 'Zero Plagiarism',
    runsCount: 189200,
    tags: ['paraphraser', 'rephrase', 'academic', 'rewrite']
  },
  {
    id: 'plagiarism-remover',
    name: 'Plagiarism Checker & Cleaner',
    category: 'ai-study',
    categoryName: 'AI Study Tools',
    description: 'Spot repetitive n-grams, common phrasing, and turn matched syntax into unique expressions.',
    icon: 'ShieldCheck',
    isNew: true,
    workingBadge: 'Instant Clean',
    runsCount: 147500,
    tags: ['plagiarism', 'cleaner', 'uniqueness', 'students']
  },
  {
    id: 'citation-generator',
    name: 'APA / MLA / Chicago Citation Generator',
    category: 'ai-study',
    categoryName: 'AI Study Tools',
    description: 'Format web, book, and journal citations accurately in standard bibliography styles.',
    icon: 'BookOpen',
    workingBadge: 'APA 7 & MLA 9',
    runsCount: 88900,
    tags: ['citation', 'bibliography', 'apa', 'mla', 'research']
  },
  {
    id: 'thesis-statement-builder',
    name: 'Thesis Statement Constructor',
    category: 'ai-study',
    categoryName: 'AI Study Tools',
    description: 'Generate strong argumentative, explanatory, or analytical research thesis statements.',
    icon: 'GraduationCap',
    workingBadge: 'Smart Builder',
    runsCount: 67300,
    tags: ['thesis', 'essay', 'college', 'paper']
  },

  // --- DEV PRO TOOLS (100 Tools) ---
  {
    id: 'fake-data-generator',
    name: 'Fake Data & Card Generator',
    category: 'dev-pro',
    categoryName: 'Dev Pro Tools',
    description: 'Generate realistic names, addresses, emails, phones & Luhn-valid test cards with CSV export.',
    icon: 'Database',
    isPopular: true,
    isNew: true,
    workingBadge: 'Export CSV / JSON',
    runsCount: 220400,
    tags: ['fake data', 'faker', 'credit card', 'mock data', 'testing']
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter, Validator & Tree',
    category: 'dev-pro',
    categoryName: 'Dev Pro Tools',
    description: 'Beautify, minify, validate syntax, fix trailing commas, and inspect JSON trees.',
    icon: 'Code2',
    isPopular: true,
    workingBadge: 'Lightning Fast',
    runsCount: 195600,
    tags: ['json', 'formatter', 'beautifier', 'validator', 'minify']
  },
  {
    id: 'qr-generator',
    name: 'Custom QR Code Generator',
    category: 'dev-pro',
    categoryName: 'Dev Pro Tools',
    description: 'Generate high-res SVG & PNG QR codes for URLs, WiFi, vCards, WhatsApp with custom colors.',
    icon: 'QrCode',
    isPopular: true,
    workingBadge: 'SVG & PNG Export',
    runsCount: 165300,
    tags: ['qr code', 'generator', 'wifi', 'svg', 'barcode']
  },
  {
    id: 'regex-tester',
    name: 'Real-time Regex Tester & Cheatsheet',
    category: 'dev-pro',
    categoryName: 'Dev Pro Tools',
    description: 'Test JavaScript Regular Expressions with live match highlighting, flags, and explanation.',
    icon: 'Terminal',
    workingBadge: 'Live Regex Match',
    runsCount: 112000,
    tags: ['regex', 'regular expression', 'testing', 'developer']
  },
  {
    id: 'base64-converter',
    name: 'Base64 Text & File Encoder/Decoder',
    category: 'dev-pro',
    categoryName: 'Dev Pro Tools',
    description: 'Encode and decode strings, images, and binary files into Base64 format safely.',
    icon: 'Binary',
    workingBadge: 'Client-Side Safe',
    runsCount: 94500,
    tags: ['base64', 'encode', 'decode', 'binary', 'security']
  },
  {
    id: 'hash-generator',
    name: 'Cryptographic Hash Generator',
    category: 'dev-pro',
    categoryName: 'Dev Pro Tools',
    description: 'Calculate MD5, SHA-1, SHA-256, SHA-512 hashes instantly using browser crypto APIs.',
    icon: 'KeyRound',
    workingBadge: 'Crypto API',
    runsCount: 78200,
    tags: ['hash', 'sha256', 'md5', 'cryptography', 'security']
  },

  // --- PDF TOOLS (54 Tools) ---
  {
    id: 'pdf-merge',
    name: 'PDF Merge & Combine Pro',
    category: 'pdf',
    categoryName: 'PDF Tools',
    description: 'Merge multiple PDF documents into a single organized file in seconds. 100% private in browser.',
    icon: 'Files',
    isPopular: true,
    workingBadge: 'Zero Upload / Safe',
    runsCount: 389000,
    tags: ['pdf', 'merge', 'combine', 'join', 'documents']
  },
  {
    id: 'pdf-split',
    name: 'PDF Page Splitter & Extractor',
    category: 'pdf',
    categoryName: 'PDF Tools',
    description: 'Split specific page ranges or extract individual pages into separate PDF files.',
    icon: 'Scissors',
    isPopular: true,
    workingBadge: 'Client-Side',
    runsCount: 201300,
    tags: ['pdf', 'split', 'extract', 'pages', 'slice']
  },
  {
    id: 'pdf-compress',
    name: 'PDF Compressor & Optimizer',
    category: 'pdf',
    categoryName: 'PDF Tools',
    description: 'Reduce PDF file size for email attachments and portal uploads without quality loss.',
    icon: 'Minimize2',
    isPopular: true,
    workingBadge: 'Instant Optimize',
    runsCount: 245100,
    tags: ['pdf', 'compress', 'reduce size', 'optimize']
  },
  {
    id: 'pdf-to-word',
    name: 'PDF Text & Docx Extractor',
    category: 'pdf',
    categoryName: 'PDF Tools',
    description: 'Extract clean raw text and structure from PDF documents without formatting corruption.',
    icon: 'FileSpreadsheet',
    workingBadge: 'Fast Extract',
    runsCount: 167400,
    tags: ['pdf to word', 'extract text', 'docx', 'convert']
  },
  {
    id: 'pdf-watermark',
    name: 'PDF Watermark & Stamp Adder',
    category: 'pdf',
    categoryName: 'PDF Tools',
    description: 'Stamp custom text or confidential watermarks across all pages of your PDF document.',
    icon: 'Stamp',
    workingBadge: 'Custom Font',
    runsCount: 68300,
    tags: ['watermark', 'pdf', 'stamp', 'confidential', 'security']
  },

  // --- IMAGE TOOLS (40 Tools) ---
  {
    id: 'image-compressor',
    name: 'Lossless Image Compressor',
    category: 'image',
    categoryName: 'Image Tools',
    description: 'Compress JPG, PNG, and WebP images by up to 90% with live side-by-side comparison.',
    icon: 'ImageDown',
    isPopular: true,
    workingBadge: 'WebP / PNG / JPG',
    runsCount: 341200,
    tags: ['image compressor', 'compress png', 'compress jpeg', 'webp', 'reduce image']
  },
  {
    id: 'bg-remover',
    name: 'Image Background Remover',
    category: 'image',
    categoryName: 'Image Tools',
    description: 'Isolate subjects and remove backgrounds with crisp transparency in the browser.',
    icon: 'Eraser',
    isPopular: true,
    workingBadge: 'Alpha Transparency',
    runsCount: 298400,
    tags: ['background remover', 'transparent png', 'cutout', 'photo edit']
  },
  {
    id: 'image-resizer',
    name: 'Bulk Image Resizer & Scaler',
    category: 'image',
    categoryName: 'Image Tools',
    description: 'Resize image dimensions by pixels or percentages with aspect ratio lock.',
    icon: 'Scaling',
    workingBadge: 'HD Quality',
    runsCount: 182300,
    tags: ['resize image', 'scale image', 'dimensions', 'crop', 'avatar']
  },
  {
    id: 'image-converter',
    name: 'Image Format Converter (PNG / JPG / WebP)',
    category: 'image',
    categoryName: 'Image Tools',
    description: 'Convert between PNG, JPEG, WebP, BMP, and SVG formats instantly with zero quality drop.',
    icon: 'Repeat',
    workingBadge: 'Lossless Mode',
    runsCount: 124900,
    tags: ['convert image', 'png to jpg', 'jpg to webp', 'converter']
  },
  {
    id: 'color-palette-extractor',
    name: 'Image Color Palette & Hex Picker',
    category: 'image',
    categoryName: 'Image Tools',
    description: 'Extract dominant color palettes and copy CSS hex codes directly from any uploaded image.',
    icon: 'Palette',
    workingBadge: 'CSS Hex Generator',
    runsCount: 91400,
    tags: ['color picker', 'palette', 'eyedropper', 'hex', 'designer']
  },

  // --- CALCULATORS (201 Tools) ---
  {
    id: 'emi-calculator',
    name: 'Loan & Home EMI Calculator',
    category: 'calculator',
    categoryName: 'Calculators',
    description: 'Calculate monthly loan EMI, total interest, and interactive amortization payoff tables.',
    icon: 'Calculator',
    isPopular: true,
    workingBadge: 'Amortization Table',
    runsCount: 412000,
    tags: ['emi', 'loan calculator', 'mortgage', 'interest', 'car loan', 'finance']
  },
  {
    id: 'bmi-calculator',
    name: 'BMI & Body Fat Calculator',
    category: 'calculator',
    categoryName: 'Calculators',
    description: 'Compute Body Mass Index (BMI), ideal weight range, and calorie requirements.',
    icon: 'Activity',
    isPopular: true,
    workingBadge: 'WHO Standards',
    runsCount: 265000,
    tags: ['bmi', 'fitness', 'health', 'weight', 'calories']
  },
  {
    id: 'compound-interest-calc',
    name: 'Compound Interest & SIP Calculator',
    category: 'calculator',
    categoryName: 'Calculators',
    description: 'Visualize wealth growth with recurring monthly investments and compound annual growth.',
    icon: 'TrendingUp',
    workingBadge: 'Growth Visualizer',
    runsCount: 184500,
    tags: ['sip', 'compound interest', 'investment', 'wealth', 'stock market']
  },
  {
    id: 'salary-takehome-calc',
    name: 'Net Salary & Tax Take-Home Calculator',
    category: 'calculator',
    categoryName: 'Calculators',
    description: 'Estimate in-hand monthly salary after standard deductions, income tax, and benefits.',
    icon: 'Receipt',
    workingBadge: 'Tax Bracket 2026',
    runsCount: 153200,
    tags: ['salary calculator', 'tax', 'take home', 'paycheck', 'income']
  },
  {
    id: 'gst-vat-calc',
    name: 'GST & Sales VAT Calculator',
    category: 'calculator',
    categoryName: 'Calculators',
    description: 'Add or remove GST/VAT rates (5%, 12%, 18%, 28%) with instant gross & net calculations.',
    icon: 'Percent',
    workingBadge: 'Inclusive / Exclusive',
    runsCount: 119800,
    tags: ['gst', 'vat', 'sales tax', 'invoice', 'percentage']
  }
];

export const CATEGORY_METADATA = {
  'pdf': {
    title: 'PDF Tools',
    count: 54,
    color: 'blue',
    icon: 'FileText',
    badge: '54 WORKING',
    desc: 'Merge, split, compress, watermark, protect & convert documents with zero server uploads.',
    featured: ['PDF Merge & Combine', 'PDF Splitter', 'PDF Compressor', 'PDF to Word Extractor']
  },
  'image': {
    title: 'Image Tools',
    count: 40,
    color: 'emerald',
    icon: 'Image',
    badge: '40 WORKING',
    desc: 'Compress, remove backgrounds, resize, crop & convert graphics directly in your browser.',
    featured: ['Lossless Compressor', 'Background Remover', 'Bulk Resizer', 'Format Converter']
  },
  'calculator': {
    title: 'Calculators',
    count: 201,
    color: 'purple',
    icon: 'Calculator',
    badge: '201 WORKING',
    desc: 'Financial EMI, mortgages, salary tax, compound SIP, fitness BMI, and engineering formulas.',
    featured: ['Loan EMI & Payoff', 'BMI & Fitness', 'Compound SIP Growth', 'Salary Take-Home']
  },
  'ai-study': {
    title: 'AI STUDY TOOLS',
    count: 50,
    color: 'amber',
    icon: 'Sparkles',
    badge: '50 WORKING • NEW',
    isNew: true,
    desc: 'Detect AI text, humanize paragraphs, check plagiarism, and generate academic citations.',
    featured: ['AI Content Detector', 'Academic Paraphraser', 'Plagiarism Remover', 'Citation Generator']
  },
  'job-ats': {
    title: 'JOB / ATS TOOLS',
    count: 50,
    color: 'yellow',
    icon: 'Briefcase',
    badge: '50 WORKING • HOT',
    isHot: true,
    desc: 'Match your resume to job postings, calculate ATS score, uncover missing keywords, and build CVs.',
    featured: ['ATS Resume Checker', 'Resume Builder', 'Cover Letter Generator', 'Salary Negotiator']
  },
  'dev-pro': {
    title: 'DEV PRO TOOLS',
    count: 100,
    color: 'cyan',
    icon: 'Code2',
    badge: '100 WORKING • NEW',
    isNew: true,
    desc: 'Mock data generation, test credit cards, QR code studio, JSON tree formatters & regex tester.',
    featured: ['Fake Data & Cards', 'JSON Formatter Tree', 'Custom QR Studio', 'Regex Tester']
  }
};
