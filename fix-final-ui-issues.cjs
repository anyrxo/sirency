const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let scrollButtonFixed = 0;
let scrollButtonMoved = 0;

console.log('🔧 Fixing final UI issues...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. FIX SCROLL-TO-TOP BUTTON TO ALWAYS BE VISIBLE
  // Change from display: none (default) to display: flex (default)
  if (content.includes('.scroll-to-top') && content.includes('display: none')) {
    // Replace display: none with display: flex in the base .scroll-to-top style
    content = content.replace(
      /(\.scroll-to-top\s*{[^}]*?)display:\s*none;/gi,
      '$1display: flex;'
    );
    scrollButtonFixed++;
    modified = true;
  }

  // 2. MOVE SCROLL-TO-TOP BUTTON HIGHER (from bottom: 100px to bottom: 180px)
  if (content.includes('.scroll-to-top') && content.includes('bottom: 100px')) {
    content = content.replace(/bottom:\s*100px;/gi, 'bottom: 180px;');
    scrollButtonMoved++;
    modified = true;
  }

  // Also fix mobile positioning
  if (content.includes('@media') && content.includes('.scroll-to-top')) {
    content = content.replace(
      /(@media[^{]*max-width:\s*768px[^}]*\.scroll-to-top\s*{[^}]*?)bottom:\s*20px;/gi,
      '$1bottom: 160px;'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Fix summary:`);
console.log(`   - ${scrollButtonFixed} files: scroll button now always visible (display: flex)`);
console.log(`   - ${scrollButtonMoved} files: scroll button moved higher (bottom: 180px)`);
console.log(`\n📝 Next: Fixing floating CTA layout and replacing emojis with icons`);
