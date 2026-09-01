import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.freetoolsnosignup.com';
const TODAY = '2026-09-01';

// 14 Core Pages
const corePages = [
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${BASE_URL}/pdf-tools`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/job-ats`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/ai-study`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/dev-pro`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/image-tools`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/calculators`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/notion-templates`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${BASE_URL}/contact`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE_URL}/about`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE_URL}/privacy-policy`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE_URL}/terms-of-service`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE_URL}/disclaimer`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE_URL}/qr-code-generator`, priority: '0.9', changefreq: 'weekly' }
];

// 78 Real Tools Whitelist
const realToolSlugs = [
  // PDF (33)
  'pdf-merge', 'pdf-split', 'pdf-compress', 'pdf-rotate', 'pdf-delete-pages', 'pdf-extract-pages',
  'pdf-reorder-pages', 'pdf-watermark', 'pdf-header-footer', 'pdf-to-jpg', 'pdf-to-png', 'jpg-to-pdf',
  'png-to-pdf', 'pdf-to-word', 'pdf-to-text', 'text-to-pdf', 'word-to-pdf', 'excel-to-pdf', 'ppt-to-pdf',
  'pdf-protect', 'pdf-unlock', 'pdf-metadata-editor', 'pdf-crop', 'pdf-page-resizer', 'pdf-grayscale',
  'pdf-repair', 'pdf-sign', 'pdf-ocr', 'pdf-form-filler', 'pdf-compare', 'pdf-n-up', 'pdf-booklet', 'pdf-reverse',

  // Image (16)
  'image-compressor', 'bg-remover', 'image-resizer', 'image-converter', 'color-palette-extractor',
  'image-cropper', 'image-rotator', 'image-filters', 'image-metadata-exif', 'svg-optimizer',
  'ico-converter', 'webp-converter', 'image-upscaler', 'meme-generator', 'watermark-image', 'pixelate-blur-image',

  // Calculators (11)
  'emi-calculator', 'bmi-calculator', 'compound-interest-calc', 'salary-takehome-calc', 'gst-vat-calc',
  'sip-calculator', 'mortgage-calc', 'inflation-calc', 'crypto-profit-calc', 'retirement-planner', 'calorie-deficit-calc',

  // Job & ATS (6)
  'ats-checker', 'resume-builder', 'cover-letter-gen', 'linkedin-optimizer', 'salary-negotiator', 'interview-prep-coach',

  // AI Study (5)
  'ai-detector', 'essay-paraphraser', 'plagiarism-remover', 'citation-generator', 'thesis-statement-builder',

  // Dev Pro (6)
  'fake-data-generator', 'json-formatter', 'qr-generator', 'regex-tester', 'base64-converter', 'hash-generator',

  // Notion (1)
  'notion-template-builder'
];

const urls = [
  ...corePages,
  ...realToolSlugs.map(slug => ({
    loc: `${BASE_URL}/tools/${slug}`,
    priority: '0.8',
    changefreq: 'weekly'
  }))
];

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
console.log(`Generated whitelist sitemap.xml with ${urls.length} URLs in /public/sitemap.xml`);
