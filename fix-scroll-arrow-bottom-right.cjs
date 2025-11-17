const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let fixed = 0;

console.log('🔧 Fixing scroll arrow - moving to BOTTOM RIGHT on mobile...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  if (content.includes('.scroll-to-top')) {
    // FIX 1: Desktop positioning - bottom right (not centered)
    content = content.replace(
      /\.scroll-to-top\s*{\s*position:\s*fixed;\s*bottom:\s*\d+px;\s*left:\s*50%;\s*transform:\s*translateX\(-50%\);/gi,
      `.scroll-to-top {
            position: fixed;
            bottom: 100px;
            right: 80px;`
    );

    // FIX 2: Mobile positioning - bottom right (not centered)
    content = content.replace(
      /@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[^}]*\.scroll-to-top\s*{[^}]*width:\s*45px;[^}]*height:\s*45px;[^}]*bottom:\s*\d+px;[^}]*left:\s*50%;[^}]*transform:\s*translateX\(-50%\);[^}]*right:\s*\d+px;/gi,
      `@media (max-width: 768px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 80px;
                right: 20px;`
    );

    // Also fix any other centered instances
    content = content.replace(
      /(\@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[^}]*\.scroll-to-top\s*{[^}]*)left:\s*50%;[^}]*transform:\s*translateX\(-50%\);/gi,
      '$1'
    );

    // Remove transform from hover state if it exists with translateX
    content = content.replace(
      /\.scroll-to-top:hover\s*{\s*background:[^;]+;\s*transform:\s*translateY\(-5px\);/gi,
      `.scroll-to-top:hover {
            background: rgba(0, 204, 170, 1);
            transform: translateY(-5px);`
    );

    // Change default display to flex (always visible)
    content = content.replace(
      /(\.scroll-to-top\s*{[^}]*)display:\s*none;/gi,
      '$1display: flex;'
    );

    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
    fixed++;
  }
});

console.log(`\n✨ Fixed ${fixed} blog posts`);
console.log(`\n📝 Scroll arrow now:`);
console.log('   - Bottom right corner (desktop: right: 80px, mobile: right: 20px)');
console.log('   - Always visible (no hide/show behavior)');
console.log('   - Proper mobile positioning');
