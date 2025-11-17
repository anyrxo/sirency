const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let datesFixed = 0;
let themesFixed = 0;

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Fix ALL January 2025 date formats (with and without timestamps)
  if (content.includes('2025-01-')) {
    // Fix dates without timestamps: "2025-01-17" -> "2025-11-15"
    content = content.replace(/"datePublished": "2025-01-\d{2}"/g, '"datePublished": "2025-11-15"');
    content = content.replace(/"dateModified": "2025-01-\d{2}"/g, '"dateModified": "2025-11-15"');

    // Fix dates WITH timestamps: "2025-01-17T10:00:00Z" -> "2025-11-15T10:00:00Z"
    content = content.replace(/"2025-01-\d{2}T\d{2}:\d{2}:\d{2}Z"/g, '"2025-11-15T10:00:00Z"');
    content = content.replace(/content="2025-01-\d{2}T\d{2}:\d{2}:\d{2}Z"/g, 'content="2025-11-15T10:00:00Z"');

    modified = true;
    datesFixed++;
  }

  // 2. Fix ALL white backgrounds (#f5f5f5 or #fff or white)
  if (content.includes('background: #f5f5f5') || content.includes('background: #fff;') || content.includes('background: white;')) {
    // Replace old white backgrounds with dark gradient
    content = content.replace(/background: #f5f5f5;/g, 'background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);\n            min-height: 100vh;');
    content = content.replace(/background: #fff;/g, 'background: rgba(26, 26, 46, 0.95);\n            backdrop-filter: blur(20px);');
    content = content.replace(/background: white;/g, 'background: rgba(26, 26, 46, 0.95);\n            backdrop-filter: blur(20px);');

    modified = true;
    themesFixed++;
  }

  // 3. Replace ANY remaining #333 dark gray text with white
  if (content.includes('color: #333')) {
    content = content.replace(/color: #333;/g, 'color: rgba(255, 255, 255, 0.95);');
    modified = true;
  }

  // 4. Replace ANY remaining #444 text with bright white
  if (content.includes('color: #444')) {
    content = content.replace(/color: #444;/g, 'color: rgba(255, 255, 255, 0.95);');
    modified = true;
  }

  // 5. Replace ANY remaining #666 gray with lighter gray
  if (content.includes('color: #666')) {
    content = content.replace(/color: #666;/g, 'color: rgba(255, 255, 255, 0.75);');
    modified = true;
  }

  // 6. Replace ANY remaining #000 black headings with white or teal
  if (content.includes('color: #000')) {
    content = content.replace(/color: #000;/g, 'color: #ffffff;');
    modified = true;
  }

  // 7. Replace red accents (#ff1744) with teal (#00ccaa)
  if (content.includes('#ff1744')) {
    content = content.replace(/#ff1744/g, '#00ccaa');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Complete fix summary:`);
console.log(`   - ${datesFixed} files with dates updated to November 2025`);
console.log(`   - ${themesFixed} files with theme updated to dark/teal`);
