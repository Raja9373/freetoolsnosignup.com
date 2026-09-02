const fs = require('fs');
const path = require('path');

// Extract directory tools from src/data/allToolsDirectory.ts
const directoryContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'allToolsDirectory.ts'), 'utf8');

const toolMatches = [];
const regex = /{\s*id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*categoryName:\s*'([^']+)',\s*description:\s*'([^']+)'(?:,\s*isFlagship:\s*(true|false))?\s*}/g;

let match;
while ((match = regex.exec(directoryContent)) !== null) {
  toolMatches.push({
    id: match[1],
    slug: match[2],
    name: match[3],
    category: match[4],
    categoryName: match[5],
    description: match[6],
    isFlagship: match[7] === 'true'
  });
}

console.log(`Found ${toolMatches.length} tools to index in sitemap.xml`);

const BASE_URL = 'https://www.freetoolsnosignup.com';
const TODAY = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  // Category hubs
  { url: '/pdf-tools', priority: '0.9', changefreq: 'weekly' },
  { url: '/image-tools', priority: '0.9', changefreq: 'weekly' },
  { url: '/calculators', priority: '0.9', changefreq: 'weekly' },
  { url: '/job-ats', priority: '0.9', changefreq: 'weekly' },
  { url: '/ai-study', priority: '0.9', changefreq: 'weekly' },
  { url: '/dev-tools', priority: '0.9', changefreq: 'weekly' },
  { url: '/notion-template-builder', priority: '0.9', changefreq: 'weekly' },
  { url: '/qr-code-generator', priority: '0.9', changefreq: 'weekly' },
  // Info & Legal
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.8', changefreq: 'monthly' },
  { url: '/terms-of-service', priority: '0.8', changefreq: 'monthly' },
  { url: '/disclaimer', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static pages
for (const page of staticPages) {
  xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

// Add each individual tool page
for (const tool of toolMatches) {
  const priority = tool.isFlagship ? '0.85' : '0.75';
  xml += `  <url>
    <loc>${BASE_URL}/tools/${tool.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

xml += `</urlset>
`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');

console.log(`Successfully generated ${outputPath} with ${staticPages.length + toolMatches.length} total URLs.`);
