const fs = require('fs');
const path = require('path');

const tools = require('../src/data/tools.json');
const domain = 'https://www.freetoolsnosignup.com';
const lastmod = '2026-09-15';

const keyPages = [
  { loc: `${domain}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${domain}/pdf-tools`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${domain}/image-tools`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${domain}/calculators`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${domain}/job-ats`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${domain}/tools/custom-notion-template-database-builder`, priority: '0.9', changefreq: 'weekly' },
];

// Tool URLs (2753 tools)
const toolUrls = tools.map((tool) => ({
  loc: `${domain}/tools/${tool.slug || tool.id}`,
  priority: '0.8',
  changefreq: 'weekly'
}));

const allUrls = [...keyPages, ...toolUrls];
console.log(`Generating sitemap with ${allUrls.length} URLs (6 pages + ${toolUrls.length} tools)...`);

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const item of allUrls) {
  sitemapXml += `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>
`;
}

sitemapXml += `</urlset>\n`;

// Write public/sitemap.xml
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapXml, 'utf-8');
console.log(`Written public/sitemap.xml with ${allUrls.length} URLs.`);

// Also generate sitemap-index.xml
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>
`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap-index.xml'), sitemapIndexXml, 'utf-8');
console.log(`Written public/sitemap-index.xml.`);
