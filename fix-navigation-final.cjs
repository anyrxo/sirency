const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let backButtonRemoved = 0;
let floatingNavRemoved = 0;

console.log('🔧 Fixing navigation duplication issues...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. REMOVE THE WHITE "BACK TO BLOG" BUTTON AT THE TOP
  // This is the one with class="back-button" and position: absolute
  if (content.includes('class="back-button"')) {
    // Remove the back button element
    content = content.replace(/<a href="\.\.\/blog\.html" class="back-button">[\s\S]*?<\/a>/gi, '');

    // Remove the back-button styles
    content = content.replace(/\.back-button\s*{[\s\S]*?}\s*\.back-button:hover\s*{[\s\S]*?}\s*@media\s*\(max-width:\s*768px\)\s*{\s*\.back-button\s*{[\s\S]*?}\s*}/gi, '');

    backButtonRemoved++;
    modified = true;
  }

  // 2. REMOVE FLOATING NAVIGATION (Home/Blog buttons at top)
  // These should NOT be at the top - we're removing them entirely since
  // the user wants Home/Blog buttons near "I'm Ready" at the bottom
  if (content.includes('floating-nav')) {
    // Remove the floating nav HTML
    content = content.replace(/<!-- Floating Navigation -->[\s\S]*?<div class="floating-nav">[\s\S]*?<\/div>[\s\S]*?<script>[\s\S]*?floatingNav[\s\S]*?<\/script>/gi, '');

    // Remove floating nav styles
    content = content.replace(/\/\* Floating Navigation Bar \*\/[\s\S]*?\.floating-nav\s*{[\s\S]*?@media\s*\(max-width:\s*480px\)\s*{[\s\S]*?}\s*<\/style>/gi, '</style>');

    floatingNavRemoved++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Navigation fix summary:`);
console.log(`   - ${backButtonRemoved} files: white "Back to Blog" button removed from top`);
console.log(`   - ${floatingNavRemoved} files: floating navigation (Home/Blog) removed from top`);
console.log(`\n📝 Next: Will add Home/Blog buttons at bottom near "I'm Ready"`);
