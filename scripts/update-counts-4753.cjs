const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '../src'),
  path.join(__dirname, '../public'),
  path.join(__dirname, '../index.html'),
  path.join(__dirname, '../metadata.json')
];

function processFile(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(filePath);
    files.forEach(f => processFile(path.join(filePath, f)));
  } else if (stat.isFile()) {
    if (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.html') || filePath.endsWith('.json') || filePath.endsWith('.md') || filePath.endsWith('.svg')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      let updated = false;

      // Replace 2,753 -> 4,753
      if (content.includes('2,753') || content.includes('3,253')) {
        content = content.replace(/2,753/g, '4,753').replace(/3,253/g, '4,753');
        updated = true;
      }
      // Replace 2753 -> 4753
      if (content.includes('2753') || content.includes('3253')) {
        content = content.replace(/2753/g, '4753').replace(/3253/g, '4753');
        updated = true;
      }

      if (updated) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated counts in: ${filePath}`);
      }
    }
  }
}

targetDirs.forEach(d => {
  if (fs.existsSync(d)) {
    processFile(d);
  }
});

console.log('Global count update to 4,753 completed successfully.');
