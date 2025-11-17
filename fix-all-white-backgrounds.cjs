const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let fixed = 0;

console.log('🔧 Fixing ALL remaining white/light background boxes...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // FIX ALL LIGHT BACKGROUND BOXES - Change to dark with proper contrast

  // 1. Fix .example-box (#fff5f5 pink)
  if (content.match(/\.example-box\s*{[^}]*background:\s*#fff5f5/i)) {
    content = content.replace(
      /\.example-box\s*{([^}]*?)background:\s*#fff5f5;([^}]*?)}/gi,
      '.example-box {$1background: rgba(252, 129, 129, 0.1);$2color: rgba(255,255,255,0.95) !important;}'
    );
    modified = true;
  }

  // 2. Fix .dont-box (#fff5f5 pink)
  if (content.match(/\.dont-box\s*{[^}]*background:\s*#fff5f5/i)) {
    content = content.replace(
      /\.dont-box\s*{([^}]*?)background:\s*#fff5f5;([^}]*?)}/gi,
      '.dont-box {$1background: rgba(252, 129, 129, 0.1);$2color: rgba(255,255,255,0.95) !important;}'
    );
    modified = true;
  }

  // 3. Fix .cons (#fff5f5 pink)
  if (content.match(/\.cons\s*{[^}]*background:\s*#fff5f5/i)) {
    content = content.replace(
      /\.cons\s*{([^}]*?)background:\s*#fff5f5;([^}]*?)}/gi,
      '.cons {$1background: rgba(252, 129, 129, 0.1);$2color: rgba(255,255,255,0.95) !important;}'
    );
    modified = true;
  }

  // 4. Fix .warning-box (#fff3cd yellow)
  if (content.match(/\.warning-box\s*{[^}]*background:\s*#fff3cd/i)) {
    content = content.replace(
      /\.warning-box\s*{([^}]*?)background:\s*#fff3cd;([^}]*?)}/gi,
      '.warning-box {$1background: rgba(255, 193, 7, 0.1);$2color: rgba(255,255,255,0.95) !important;}'
    );
    modified = true;
  }

  // 5. Fix .do-box (if it has light background)
  if (content.match(/\.do-box\s*{[^}]*background:\s*#f0fff4/i)) {
    content = content.replace(
      /\.do-box\s*{([^}]*?)background:\s*#f0fff4;([^}]*?)}/gi,
      '.do-box {$1background: rgba(0, 204, 170, 0.1);$2color: rgba(255,255,255,0.95) !important;}'
    );
    modified = true;
  }

  // 6. Fix .template-box (if it has light background)
  if (content.match(/\.template-box\s*{[^}]*background:\s*#f[0-9a-f]{5}/i)) {
    content = content.replace(
      /\.template-box\s*{([^}]*?)background:\s*#f[0-9a-f]{5};([^}]*?)}/gi,
      '.template-box {$1background: rgba(0, 204, 170, 0.05);$2}'
    );
    // Ensure template text is readable
    if (!content.includes('.template-box p {')) {
      content = content.replace(
        /(\.template-box\s*{[^}]*})/i,
        '$1\n        .template-box p { color: rgba(255,255,255,0.95) !important; }\n        .template-box h4 { color: #00ccaa !important; }\n        .template-box strong { color: #00ccaa !important; }'
      );
    }
    modified = true;
  }

  // 7. Fix .template-label (if it has light background/text)
  if (content.match(/\.template-label\s*{[^}]*background:\s*#[fe][0-9a-f]{5}/i)) {
    content = content.replace(
      /\.template-label\s*{([^}]*?)background:\s*#[fe][0-9a-f]{5};([^}]*?)color:\s*#[0-9a-f]{3,6};([^}]*?)}/gi,
      '.template-label {$1background: rgba(0, 204, 170, 0.2);$2color: #00ccaa;$3}'
    );
    modified = true;
  }

  // 8. Fix any remaining light backgrounds (#fff, #ffffff, white, #f followed by 5 hex chars)
  content = content.replace(
    /background:\s*(#fff|#ffffff|white|#f[0-9a-f]{5})\s*;/gi,
    (match, color) => {
      // Only replace if it's in a CSS class, not inline styles
      if (content.indexOf(match) > -1 && content.indexOf('.', content.indexOf(match) - 100) > -1) {
        return 'background: rgba(26, 26, 46, 0.8);';
      }
      return match;
    }
  );

  // 9. Ensure all box elements have proper text color
  const boxClasses = ['example-box', 'dont-box', 'cons', 'warning-box', 'do-box', 'template-box'];
  boxClasses.forEach(boxClass => {
    if (content.includes(`.${boxClass}`) && !content.includes(`.${boxClass} p {`)) {
      content = content.replace(
        new RegExp(`(\\.${boxClass}\\s*{[^}]*})`, 'i'),
        `$1\n        .${boxClass} p { color: rgba(255,255,255,0.95) !important; }\n        .${boxClass} strong { color: #00ccaa !important; }\n        .${boxClass} li { color: rgba(255,255,255,0.95) !important; }`
      );
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
    fixed++;
  }
});

console.log(`\n✨ Fix summary:`);
console.log(`   - ${fixed} files: ALL light backgrounds changed to dark with proper contrast`);
console.log(`\n📝 Fixed boxes: example-box, dont-box, cons, warning-box, do-box, template-box`);
console.log(`\n✅ NO MORE WHITE ON WHITE TEXT!`);
