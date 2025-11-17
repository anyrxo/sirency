const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let fixed = 0;

console.log('🔧 Fixing white backgrounds blog by blog (PROPER FIX)...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixedInThis = [];

  // FIX 1: Change white gradient for h1 to teal->purple (not white->teal)
  if (content.match(/h1\s*{[^}]*background:\s*linear-gradient\([^)]*#ffffff[^)]*\)/i)) {
    content = content.replace(
      /(h1\s*{[^}]*background:\s*)linear-gradient\([^)]*#ffffff[^)]*00ccaa[^)]*\)/gi,
      '$1linear-gradient(135deg, #00ccaa 0%, #a855f7 100%)'
    );
    fixedInThis.push('h1 gradient (white→teal changed to teal→purple)');
    modified = true;
  }

  // FIX 2: .script-box white backgrounds
  if (content.match(/\.script-box\s*{[^}]*background:\s*(#fff|#ffffff|white)/i)) {
    content = content.replace(
      /(\.script-box\s*{[^}]*)background:\s*(#fff|#ffffff|white);([^}]*})/gi,
      '$1background: rgba(0, 204, 170, 0.05);$3'
    );
    // Ensure text is readable
    if (!content.includes('.script-box p {')) {
      content = content.replace(
        /(\.script-box\s*{[^}]*})/i,
        '$1\n        .script-box p { color: rgba(255,255,255,0.95) !important; }\n        .script-box strong { color: #00ccaa !important; }'
      );
    }
    fixedInThis.push('.script-box');
    modified = true;
  }

  // FIX 3: .message-template white backgrounds
  if (content.match(/\.message-template\s*{[^}]*background:\s*(#fff|#ffffff|white)/i)) {
    content = content.replace(
      /(\.message-template\s*{[^}]*)background:\s*(#fff|#ffffff|white);([^}]*})/gi,
      '$1background: rgba(0, 204, 170, 0.05);$3'
    );
    if (!content.includes('.message-template p {')) {
      content = content.replace(
        /(\.message-template\s*{[^}]*})/i,
        '$1\n        .message-template p { color: rgba(255,255,255,0.95) !important; }'
      );
    }
    fixedInThis.push('.message-template');
    modified = true;
  }

  // FIX 4: Any remaining content boxes with #fff backgrounds (not gradients)
  const boxClasses = ['bio-example', 'caption-example', 'post-example', 'tip-box', 'note-box'];
  boxClasses.forEach(className => {
    const regex = new RegExp(`\\.${className}\\s*{[^}]*background:\\s*(#fff|#ffffff|white);`, 'i');
    if (content.match(regex)) {
      content = content.replace(
        new RegExp(`(\\.${className}\\s*{[^}]*)background:\\s*(#fff|#ffffff|white);([^}]*})`, 'gi'),
        `$1background: rgba(0, 204, 170, 0.05);$3`
      );
      // Add readable text color
      const textColorRegex = new RegExp(`\\.${className}\\s+p\\s*{`, 'i');
      if (!content.match(textColorRegex)) {
        content = content.replace(
          new RegExp(`(\\.${className}\\s*{[^}]*})`, 'i'),
          `$1\n        .${className} p { color: rgba(255,255,255,0.95) !important; }\n        .${className} strong { color: #00ccaa !important; }`
        );
      }
      fixedInThis.push(`.${className}`);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filename}`);
    fixedInThis.forEach(fix => console.log(`   - Fixed: ${fix}`));
    fixed++;
  }
});

console.log(`\n✨ Fixed ${fixed} blog posts with proper background fixes`);
console.log(`\n📝 Changed white backgrounds to dark transparent, preserved gradient text effects`);
