const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let fixed = 0;

console.log('🔧 Fixing white text on white background in info-box...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if file has .info-box styling that needs fixing
  if (content.includes('.info-box {')) {
    // Fix .info-box to have dark text color
    const oldInfoBox = /\.info-box\s*{\s*background:\s*#ebf8ff;\s*border-left:\s*4px solid #4299e1;\s*padding:\s*20px;\s*margin:\s*25px 0;\s*border-radius:\s*8px;\s*}/gi;

    const newInfoBox = `.info-box {
            background: #ebf8ff;
            border-left: 4px solid #4299e1;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            color: #1a202c !important;
        }

        .info-box p {
            color: #1a202c !important;
        }

        .info-box ul {
            color: #1a202c !important;
        }

        .info-box li {
            color: #1a202c !important;
        }

        .info-box strong {
            color: #2c5282 !important;
        }`;

    if (content.match(oldInfoBox)) {
      content = content.replace(oldInfoBox, newInfoBox);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${filename}`);
      fixed++;
    }
  }
});

console.log(`\n✨ Fixed info-box text color on ${fixed} blog posts`);
console.log('   (Now dark text on light blue background - fully readable!)');
