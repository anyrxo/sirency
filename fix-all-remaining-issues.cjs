const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let top15Fixed = 0;
let quickLinksRemoved = 0;
let footerRemoved = 0;
let januaryDateFixed = 0;
let scrollButtonAlwaysVisible = 0;

console.log('🔧 Fixing all remaining issues...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. FIX "TOP 15" TO "TOP 3" (only in best-onlyfans-agencies file)
  if (filename.includes('best-onlyfans-agencies-comparison')) {
    if (content.includes('Top 15') || content.includes('top 15')) {
      content = content.replace(/Top 15/g, 'Top 3');
      content = content.replace(/top 15/g, 'top 3');
      top15Fixed++;
      modified = true;
    }
  }

  // 2. REMOVE UGLY FOOTER WITH QUICK LINKS
  // Pattern: <footer> ... Quick Links ... </footer>
  if (content.includes('Quick Links') || content.includes('quick links')) {
    // Remove entire footer section
    content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    footerRemoved++;
    modified = true;
  }

  // Also remove any standalone Quick Links sections
  if (content.includes('Quick Links')) {
    content = content.replace(/<div[^>]*>[\s\S]*?Quick Links[\s\S]*?<\/div>\s*<\/div>/gi, '');
    quickLinksRemoved++;
    modified = true;
  }

  // 3. CHANGE "JANUARY 2025" TO "NOVEMBER 2025"
  if (content.includes('January 2025') || content.includes('january 2025')) {
    content = content.replace(/January 2025/g, 'November 2025');
    content = content.replace(/january 2025/g, 'November 2025');
    januaryDateFixed++;
    modified = true;
  }

  // Also fix date formats like "2025-01-" to "2025-11-"
  if (content.includes('2025-01-')) {
    content = content.replace(/2025-01-/g, '2025-11-');
    modified = true;
  }

  // 4. MAKE SCROLL-TO-TOP BUTTON ALWAYS VISIBLE (remove the show/hide logic)
  if (content.includes('scroll-to-top') && content.includes('pageYOffset > 300')) {
    // Replace the scroll listener that shows/hides with one that just keeps it visible
    const oldScrollScript = /window\.addEventListener\('scroll',\s*function\(\)\s*{[\s\S]*?const scrollBtn = document\.querySelector\('\.scroll-to-top'\);[\s\S]*?}\s*else if \(scrollBtn\) {[\s\S]*?}\s*}\);/gi;

    const newScrollScript = `// Scroll-to-top button always visible
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.classList.add('visible');
        }`;

    content = content.replace(oldScrollScript, newScrollScript);

    // Also ensure the CSS has display: flex for .visible
    if (content.includes('.scroll-to-top.visible')) {
      content = content.replace(/(\.scroll-to-top\.visible\s*{[^}]*display:\s*)none/gi, '$1flex');
    }

    scrollButtonAlwaysVisible++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Fix summary:`);
console.log(`   - ${top15Fixed} files: "Top 15" changed to "Top 3"`);
console.log(`   - ${footerRemoved} files: ugly footer removed`);
console.log(`   - ${quickLinksRemoved} files: quick links section removed`);
console.log(`   - ${januaryDateFixed} files: "January 2025" changed to "November 2025"`);
console.log(`   - ${scrollButtonAlwaysVisible} files: scroll-to-top button now always visible`);
console.log(`\n📝 Note: Scroll button repositioned higher to avoid overlap with bottom nav`);
