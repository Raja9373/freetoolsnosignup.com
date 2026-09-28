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

// Lightweight core tools array to prevent initial bundle bloat
export const allTools: ToolItem[] = [
  { id: 'pdf-merge', slug: 'pdf-merge', name: 'PDF Merge & Combine Pro', category: 'pdf', categoryName: 'PDF Tools', description: 'Merge multiple PDF documents into a single organized file in seconds.', isFlagship: true },
  { id: 'pdf-split', slug: 'pdf-split', name: 'PDF Page Splitter & Extractor', category: 'pdf', categoryName: 'PDF Tools', description: 'Split page ranges or extract individual pages into separate PDF files or ZIP.', isFlagship: true },
  { id: 'pdf-compress', slug: 'pdf-compress', name: 'PDF Compressor & Optimizer', category: 'pdf', categoryName: 'PDF Tools', description: 'Reduce PDF file size for email attachments and portal uploads without quality loss.', isFlagship: true },
  { id: 'image-compressor', slug: 'image-compressor', name: 'Image Compressor & Resizer', category: 'image', categoryName: 'Image Tools', description: 'Compress JPEG, PNG, WebP and SVG images instantly in your browser.', isFlagship: true },
  { id: 'bg-remover', slug: 'bg-remover', name: 'AI Background Remover', category: 'image', categoryName: 'Image Tools', description: 'Remove image backgrounds locally with AI neural networks.', isFlagship: true },
  { id: 'emi-calculator', slug: 'emi-calculator', name: 'Loan EMI & Mortgage Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate monthly loan installments, interest, and amortization schedules.', isFlagship: true },
  { id: 'sip-calculator', slug: 'sip-calculator', name: 'SIP & Mutual Fund Calculator', category: 'calculator', categoryName: 'Calculators', description: 'Calculate systematic investment plan returns and wealth growth.', isFlagship: true },
  { id: 'ats-resume-checker', slug: 'ats-resume-checker', name: 'ATS Resume Keyword Optimizer', category: 'job-ats', categoryName: 'ATS & Career', description: 'Scan your resume against job descriptions for ATS keyword matching.', isFlagship: true },
  { id: 'json-formatter', slug: 'json-formatter', name: 'JSON Formatter, Validator & Tree', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Beautify, minify, validate syntax, and inspect JSON trees.', isFlagship: true },
  { id: 'qr-generator', slug: 'qr-generator', name: 'Custom QR Code Generator', category: 'dev-pro', categoryName: 'Dev Pro Tools', description: 'Generate high-res SVG & PNG QR codes with custom colors.', isFlagship: true }
];

export default allTools;
