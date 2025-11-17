const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let fixed = 0;

console.log('🎯 Aligning scroll arrow horizontally with Blog button...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('.scroll-to-top')) {
    // Desktop: Blog button is on right edge of centered 700px container
    // Container: left: 50%, max-width: 700px
    // Blog button: 60px wide, on right edge
    // Blog button center: calc(50% + 320px) from left
    // Arrow (50px wide): center at same position
    // Use left positioning instead of right for better alignment
    content = content.replace(
      /\.scroll-to-top\s*{\s*position:\s*fixed;\s*bottom:\s*\d+px;\s*right:\s*\d+px;/gi,
      `.scroll-to-top {
            position: fixed;
            bottom: 100px;
            left: calc(50% + 320px);
            transform: translateX(-50%);`
    );

    // Mobile: Simpler calculation
    // Container width: calc(100% - 40px) with padding: 0 10px
    // Container right edge: 20px + 10px = 30px from screen right
    // Blog button: 50px wide, center at 30px + 25px = 55px from right
    // Arrow: 45px wide, center also at 55px from right
    // Arrow right edge: 55px - 22.5px = 32.5px ≈ 32px
    content = content.replace(
      /@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{\s*\.scroll-to-top\s*{\s*width:\s*45px;\s*height:\s*45px;\s*bottom:\s*\d+px;\s*right:\s*\d+px;/gi,
      `@media (max-width: 768px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 80px;
                left: auto;
                right: 32px;
                transform: none;`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
    fixed++;
  }
});

console.log(`\n✨ Aligned scroll arrow on ${fixed} blog posts`);
console.log(`\n📝 Arrow positioning:`);
console.log('   Desktop: left: calc(50% + 320px) - centered above blog button');
console.log('   Mobile: right: 32px - aligned above blog button');
