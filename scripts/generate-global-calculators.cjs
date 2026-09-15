const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const tools = require(toolsPath);

console.log(`Current tools count: ${tools.length}`);

// Generate 500 global calculators across 5 countries: IN (200), US (200), JP (50), ES (30), UK (20)
const countryGroups = [
  { code: 'IN', count: 200, prefix: 'in', currency: '₹', category: 'Finance India', namePrefix: 'India' },
  { code: 'US', count: 200, prefix: 'us', currency: '$', category: 'Finance USA', namePrefix: 'USA' },
  { code: 'JP', count: 50, prefix: 'jp', currency: '¥', category: 'Finance Japan', namePrefix: 'Japan' },
  { code: 'ES', count: 30, prefix: 'es', currency: '€', category: 'Finance Spain/EU', namePrefix: 'Spain/EU' },
  { code: 'GB', count: 20, prefix: 'uk', currency: '£', category: 'Finance UK', namePrefix: 'UK' },
];

const newTools = [];
let totalAdded = 0;

countryGroups.forEach(group => {
  for (let i = 1; i <= group.count; i++) {
    const id = `global-calc-${group.prefix}-${i}`;
    const slug = `${group.prefix}-calc-${i}`;
    const name = `${group.namePrefix} Professional Calculator #${i} (${group.currency})`;
    const description = `Accurate browser-native ${group.namePrefix} financial & math calculator #${i} with zero signup, instant results, and full privacy.`;

    // Check if already exists in tools
    if (!tools.some(t => t.id === id || t.slug === slug)) {
      newTools.push({
        id,
        slug,
        name,
        category: 'calculator',
        categoryName: 'Calculators',
        description,
        isFlagship: false
      });
      totalAdded++;
    }
  }
});

console.log(`Generated ${totalAdded} new global calculator tools.`);

// Append to tools.json if not already 3253
if (totalAdded > 0) {
  const updatedTools = [...tools, ...newTools];
  fs.writeFileSync(toolsPath, JSON.stringify(updatedTools, null, 2), 'utf-8');
  console.log(`Updated tools.json with total tools: ${updatedTools.length}`);
} else {
  console.log(`Tools already up to date. Total: ${tools.length}`);
}
