const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/tools.json');
const tools = require(toolsPath);

console.log(`Current tools count: ${tools.length}`);

const phase2Groups = [
  { code: 'CA', count: 150, prefix: 'ca', currency: 'C$', category: 'Finance Canada', namePrefix: 'Canada' },
  { code: 'AU', count: 150, prefix: 'au', currency: 'A$', category: 'Finance Australia', namePrefix: 'Australia' },
  { code: 'DE', count: 150, prefix: 'de', currency: '€', category: 'Finance Germany/EU', namePrefix: 'Germany' },
  { code: 'HL', count: 350, prefix: 'hl', currency: 'Units', category: 'Health & Fitness', namePrefix: 'Health & Fitness' },
  { code: 'MS', count: 350, prefix: 'ms', currency: 'Units', category: 'Math & Science', namePrefix: 'Math & Science' },
  { code: 'BC', count: 350, prefix: 'bc', currency: '$', category: 'Business & Construction', namePrefix: 'Business & Construction' },
];

const newTools = [];
let totalAdded = 0;

phase2Groups.forEach(group => {
  for (let i = 1; i <= group.count; i++) {
    const id = `calc-${group.prefix}-${i}`;
    const slug = `${group.prefix}-calc-${i}`;
    const name = `${group.namePrefix} Professional Utility #${i} (${group.currency})`;
    const description = `Accurate browser-native ${group.namePrefix} calculator #${i} with zero signup, instant calculations, and complete client-side privacy.`;

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

console.log(`Generated ${totalAdded} Phase 2 new calculator tools.`);

if (totalAdded > 0) {
  const updatedTools = [...tools, ...newTools];
  fs.writeFileSync(toolsPath, JSON.stringify(updatedTools, null, 2), 'utf-8');
  console.log(`Updated tools.json with total tools: ${updatedTools.length}`);
} else {
  console.log(`Tools already up to date. Total: ${tools.length}`);
}
