const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');

// Get all HTML files in blog directory
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let totalReplacements = 0;
let filesModified = 0;

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace absolute sirency.com URLs with relative URLs (but NOT canonical links)
  // Pattern 1: href="https://sirency.com/#contact" → href="../index.html#contact"
  const pattern1Before = content.match(/href="https:\/\/sirency\.com\/#contact"/g);
  content = content.replace(
    /(<a[^>]*?)href="https:\/\/sirency\.com\/#contact"/g,
    '$1href="../index.html#contact"'
  );
  const pattern1After = content.match(/href="https:\/\/sirency\.com\/#contact"/g);

  // Pattern 2: href="https://sirency.com" (but NOT in canonical tags)
  const pattern2Before = content.match(/<a[^>]*?href="https:\/\/sirency\.com"/g);
  content = content.replace(
    /(<a[^>]*?)href="https:\/\/sirency\.com"([^>]*?>)/g,
    '$1href="../index.html"$2'
  );
  const pattern2After = content.match(/<a[^>]*?href="https:\/\/sirency\.com"/g);

  // Count replacements
  const replacements1 = (pattern1Before ? pattern1Before.length : 0) - (pattern1After ? pattern1After.length : 0);
  const replacements2 = (pattern2Before ? pattern2Before.length : 0) - (pattern2After ? pattern2After.length : 0);
  const totalFileReplacements = replacements1 + replacements2;

  if (totalFileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    totalReplacements += totalFileReplacements;
    console.log(`✅ Fixed ${totalFileReplacements} broken link(s) in ${filename}`);
  }
});

console.log(`\n✨ Done! Fixed ${totalReplacements} broken links across ${filesModified} files.`);
