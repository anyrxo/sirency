const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let fixed = 0;

console.log('🔧 Fixing scroll arrow tap shift issue...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix desktop hover to maintain horizontal centering
  content = content.replace(
    /\.scroll-to-top:hover\s*{\s*background:\s*rgba\(0,\s*204,\s*170,\s*1\);?\s*transform:\s*translateY\(-5px\);?\s*box-shadow:\s*[^}]+}/gi,
    `.scroll-to-top:hover {
            background: rgba(0, 204, 170, 1);
            transform: translateX(-50%) translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 204, 170, 0.6);
        }`
  );

  // Add mobile-specific hover that doesn't shift left
  const mobileMediaRegex = /@media\s*\(max-width:\s*768px\)\s*{\s*\.scroll-to-top\s*{[^}]+}\s*}/gi;

  content = content.replace(
    mobileMediaRegex,
    `@media (max-width: 768px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 80px;
                left: auto;
                right: 32px;
                transform: none;
                font-size: 1.3rem;
            }
            .scroll-to-top:hover {
                transform: translateY(-3px);
            }
        }`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed ${filename}`);
  fixed++;
});

console.log(`\n✨ Fixed scroll arrow tap shift on ${fixed} blog posts`);
