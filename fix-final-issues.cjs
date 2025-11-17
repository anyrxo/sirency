const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let backButtonFixed = 0;
let colorsFixed = 0;
let ctasFixed = 0;

console.log('🔧 Fixing remaining issues...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. FIX BACK BUTTON - Change from fixed (sticky) to absolute (not sticky)
  if (content.includes('.back-button {') && content.includes('position: fixed;')) {
    content = content.replace(
      /\.back-button \{[\s\S]*?position: fixed;/,
      `.back-button {
            position: absolute;`
    );
    backButtonFixed++;
    modified = true;
  }

  // 2. FIX WRONG DARK COLORS - These blogs have #2d3748, #4a5568, #718096 etc which are dark gray (wrong!)
  // Should be white or teal
  if (content.includes('#2d3748') || content.includes('#4a5568') || content.includes('#718096')) {
    // Fix h1 dark gray -> white with teal shadow
    content = content.replace(
      /h1 \{[\s\S]*?color: #2d3748;/g,
      'h1 {\n            font-size: 2.5em;\n            margin-bottom: 20px;\n            color: #ffffff;\n            text-shadow: 0 2px 10px rgba(0, 204, 170, 0.3);'
    );

    // Fix h2 dark gray -> teal with teal border
    content = content.replace(
      /h2 \{[\s\S]*?color: #2d3748;[\s\S]*?border-left: 4px solid #667eea;/g,
      'h2 {\n            font-size: 1.8em;\n            margin-top: 40px;\n            margin-bottom: 20px;\n            color: #00ccaa;\n            border-left: 4px solid #00ccaa;'
    );

    // Fix h3 dark gray -> bright white
    content = content.replace(/color: #4a5568;/g, 'color: rgba(255, 255, 255, 0.9);');

    // Fix meta text dark gray -> light gray
    content = content.replace(/color: #718096;/g, 'color: rgba(255, 255, 255, 0.75);');

    // Fix strong tags dark gray -> teal
    content = content.replace(/strong \{[\s\S]*?color: #2d3748;/g, 'strong {\n            color: #00ccaa;');

    colorsFixed++;
    modified = true;
  }

  // 3. FIX RED/PINK CTA BACKGROUNDS - Change to teal gradient
  if (content.includes('background: #ff5f5f') || content.includes('background: #fc8181')) {
    content = content.replace(/background: #ff5f5f;/g, 'background: linear-gradient(135deg, #00ccaa 0%, #00ff88 100%);');
    content = content.replace(/background: #fc8181;/g, 'background: linear-gradient(135deg, #00ccaa 0%, #00ff88 100%);');
    content = content.replace(/color: #c53030;/g, 'color: #00ccaa;');
    ctasFixed++;
    modified = true;
  }

  // 4. FIX PURPLE BORDERS - Change #667eea to teal #00ccaa
  if (content.includes('#667eea')) {
    content = content.replace(/#667eea/g, '#00ccaa');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Summary:`);
console.log(`   - ${backButtonFixed} files: back button changed from sticky to static`);
console.log(`   - ${colorsFixed} files: dark gray colors fixed to white/teal`);
console.log(`   - ${ctasFixed} files: red CTAs changed to teal`);
