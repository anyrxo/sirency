const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

let fixed = 0;

console.log('🔧 Adding airtable-modal.css to blog posts...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has airtable-modal.css
  if (content.includes('airtable-modal.css')) {
    return; // Skip if already has it
  }

  // Add the CSS link right before the closing </head> tag
  const cssLink = '  <link href="../css/airtable-modal.css" rel="stylesheet" type="text/css">';

  if (content.includes('</head>')) {
    content = content.replace('</head>', `${cssLink}\n</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added modal CSS to ${filename}`);
    fixed++;
  } else {
    console.log(`⚠️  Skipped ${filename} (no </head> tag found)`);
  }
});

console.log(`\n✨ Added airtable-modal.css to ${fixed} blog posts`);
