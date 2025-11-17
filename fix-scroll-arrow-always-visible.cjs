const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let fixed = 0;

console.log('🔧 Making scroll arrow always visible on blog posts...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace scroll event listener logic with always-visible logic (like index.html)
  const oldScrollLogic = /\/\/ Scroll to top functionality\s*window\.addEventListener\('scroll', function\(\) {\s*const scrollBtn = document\.querySelector\('\.scroll-to-top'\);\s*if \(window\.pageYOffset > \d+\) {\s*scrollBtn\.classList\.add\('visible'\);\s*} else {\s*scrollBtn\.classList\.remove\('visible'\);\s*}\s*}\);/gs;

  const newScrollLogic = `// Scroll-to-top button always visible
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.classList.add('visible');
        }`;

  if (content.match(oldScrollLogic)) {
    content = content.replace(oldScrollLogic, newScrollLogic);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
    fixed++;
  } else {
    // Try alternate pattern
    const altPattern = /window\.addEventListener\('scroll',\s*function\(\)\s*{\s*const scrollBtn = document\.querySelector\('\.scroll-to-top'\);\s*if\s*\(window\.pageYOffset\s*>\s*\d+\)\s*{\s*scrollBtn\.classList\.add\('visible'\);\s*}\s*else\s*{\s*scrollBtn\.classList\.remove\('visible'\);\s*}\s*}\);/gs;

    if (content.match(altPattern)) {
      content = content.replace(altPattern, `const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.classList.add('visible');
        }`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${filename}`);
      fixed++;
    }
  }
});

console.log(`\n✨ Made scroll arrow always visible on ${fixed} blog posts`);
console.log('   (Now matches home page behavior)');
