const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');

// Get all HTML files
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let totalUpdated = 0;

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if file has January 2025 dates
  const hasJanDates = content.includes('"2025-01-');

  if (hasJanDates) {
    // Update all January dates to November 15, 2025
    content = content.replace(/"datePublished": "2025-01-\d{2}"/g, '"datePublished": "2025-11-15"');
    content = content.replace(/"dateModified": "2025-01-\d{2}"/g, '"dateModified": "2025-11-15"');

    fs.writeFileSync(filePath, content, 'utf8');
    totalUpdated++;
    console.log(`✅ Updated ${filename}`);
  }
});

console.log(`\n✨ Updated dates in ${totalUpdated} blog posts from January to November 2025!`);
