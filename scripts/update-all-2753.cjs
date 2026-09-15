const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      callback(fullPath);
    }
  });
}

walkDir(path.join(__dirname, '../src'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('2753')) {
    content = content.replace(/2753/g, '3253');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated 2753 -> 3253 in ${filePath}`);
  }
});
