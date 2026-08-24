import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = 'https://www.freetoolsnosignup.com';
const TODAY = '2026-08-24';

// 54 PDF Tools
const pdfSlugs = [
  'pdf-merge', 'pdf-split', 'pdf-compress', 'pdf-to-word', 'pdf-watermark',
  'pdf-to-jpg', 'pdf-to-png', 'jpg-to-pdf', 'png-to-pdf', 'word-to-pdf',
  'excel-to-pdf', 'ppt-to-pdf', 'pdf-rotate', 'pdf-delete-pages', 'pdf-reorder-pages',
  'pdf-protect', 'pdf-unlock', 'pdf-crop', 'pdf-header-footer', 'pdf-grayscale',
  'pdf-ocr', 'pdf-metadata-editor', 'pdf-sign', 'pdf-form-filler', 'pdf-compare',
  ...Array.from({ length: 29 }, (_, i) => `pdf-pro-util-${i + 26}`)
];

// 40 Image Tools
const imageSlugs = [
  'image-compressor', 'bg-remover', 'image-resizer', 'image-converter', 'color-palette-extractor',
  'image-cropper', 'image-filters', 'svg-optimizer', 'favicon-generator', 'watermark-remover',
  ...Array.from({ length: 30 }, (_, i) => `image-studio-${i + 11}`)
];

// 201 Calculators
const calcSlugs = [
  'emi-calculator', 'bmi-calculator', 'compound-interest-calc', 'salary-takehome-calc', 'gst-vat-calc',
  'mortgage-calc', 'inflation-calc', 'crypto-profit-calc', 'retirement-planner', 'calorie-deficit-calc',
  ...Array.from({ length: 191 }, (_, i) => `calc-engine-${i + 11}`)
];

// 50 Job ATS Tools
const jobSlugs = [
  'ats-checker', 'resume-builder', 'cover-letter-gen', 'linkedin-optimizer', 'salary-negotiator', 'interview-prep-coach',
  ...Array.from({ length: 44 }, (_, i) => `job-career-tool-${i + 7}`)
];

// 50 AI Study Tools
const aiSlugs = [
  'ai-detector', 'essay-paraphraser', 'plagiarism-remover', 'citation-generator', 'thesis-statement-builder',
  ...Array.from({ length: 45 }, (_, i) => `study-academic-tool-${i + 6}`)
];

// 100 Dev Pro Tools
const devSlugs = [
  'fake-data-generator', 'json-formatter', 'qr-generator', 'regex-tester', 'base64-converter', 'hash-generator',
  ...Array.from({ length: 94 }, (_, i) => `dev-coder-tool-${i + 7}`)
];

const allToolSlugs = [
  ...new Set([
    ...pdfSlugs,
    ...imageSlugs,
    ...calcSlugs,
    ...jobSlugs,
    ...aiSlugs,
    ...devSlugs
  ])
];

const urls = [];

// Homepage
urls.push({ loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' });

// Categories
const categories = ['pdf-tools', 'image-tools', 'calculators', 'job-ats', 'ai-study', 'dev-tools'];
categories.forEach(cat => {
  urls.push({ loc: `${BASE_URL}/${cat}`, priority: '0.9', changefreq: 'weekly' });
});

// Flagship Tools
const flagships = [
  'pdf-merge', 'image-compressor', 'emi-calculator', 'ats-checker',
  'ai-detector', 'fake-data-generator', 'json-formatter', 'qr-generator'
];
flagships.forEach(f => {
  urls.push({ loc: `${BASE_URL}/tools/${f}`, priority: '0.9', changefreq: 'daily' });
});

// All 495 tools
allToolSlugs.forEach(slug => {
  if (!flagships.includes(slug)) {
    urls.push({ loc: `${BASE_URL}/tools/${slug}`, priority: '0.8', changefreq: 'weekly' });
  }
});

// Legal and info pages
const legalPages = ['about', 'privacy-policy', 'contact', 'terms-of-service', 'disclaimer'];
legalPages.forEach(page => {
  urls.push({ loc: `${BASE_URL}/${page}`, priority: '0.8', changefreq: 'monthly' });
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(u => {
  xml += `  <url>\n`;
  xml += `    <loc>${u.loc}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap.xml with ${urls.length} URLs in /public/sitemap.xml`);
