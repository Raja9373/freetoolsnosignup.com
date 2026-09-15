const fs = require('fs');
const path = require('path');

const transPath = path.join(__dirname, '../src/i18n/translations.ts');
let content = fs.readFileSync(transPath, 'utf-8');

content = content.replace(/2753/g, '3253');

fs.writeFileSync(transPath, content, 'utf-8');
console.log('Updated translations.ts from 2753 to 3253');
