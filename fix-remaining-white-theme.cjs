const fs = require('fs');
const path = require('path');

// The 3 remaining blogs with white backgrounds (altgirl and cosplay already fixed)
const blogsToFix = [
  'onlyfans-analytics-performance-tracking-metrics-2025.html',
  'onlyfans-content-strategy-planning-2025.html',
  'onlyfans-taxes-deductions-guide-2025.html'
];

const blogDir = path.join(__dirname, 'blog');

blogsToFix.forEach(filename => {
  const filePath = path.join(blogDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filename} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = [];

  // 1. Apply dark theme to body
  if (content.includes('background: #f5f5f5')) {
    content = content.replace(
      /body \{([\s\S]*?)background: #f5f5f5;/,
      `body {$1background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            min-height: 100vh;`
    );
    content = content.replace(
      /body \{([\s\S]*?)color: #333;/,
      `body {$1color: #ffffff;`
    );
    changesMade.push('body theme');
  }

  // 2. Apply dark theme to containers
  content = content.replace(
    /background: white;/g,
    'background: rgba(26, 26, 46, 0.95);\n            backdrop-filter: blur(20px);'
  );

  // 3. Change box shadows to teal glow
  content = content.replace(
    /box-shadow: 0 2px 20px rgba\(0,0,0,0\.1\);/g,
    'box-shadow: 0 8px 40px rgba(0, 204, 170, 0.2);\n            border: 1px solid rgba(0, 204, 170, 0.2);'
  );

  // 4. Change h1 to white with teal shadow
  content = content.replace(
    /h1 \{([\s\S]*?)color: #000;/g,
    'h1 {$1color: #ffffff;\n            text-shadow: 0 2px 10px rgba(0, 204, 170, 0.3);'
  );

  // 5. Change h2 from red to teal
  content = content.replace(
    /h2 \{([\s\S]*?)color: #000;([\s\S]*?)border-left: 4px solid #ff1744;/g,
    'h2 {$1color: #00ccaa;$2border-left: 4px solid #00ccaa;'
  );

  // 6. Change h3 to light white
  content = content.replace(
    /h3 \{([\s\S]*?)color: #333;/g,
    'h3 {$1color: rgba(255, 255, 255, 0.9);'
  );

  // 7. Change paragraphs to bright white
  content = content.replace(
    /p \{([\s\S]*?)color: #444;/g,
    'p {$1color: rgba(255, 255, 255, 0.95);'
  );

  // 8. Change list items
  content = content.replace(
    /li \{([\s\S]*?)color: #444;/g,
    'li {$1color: rgba(255, 255, 255, 0.95);'
  );

  // 9. Change strong tags to teal
  content = content.replace(
    /strong \{([\s\S]*?)color: #000;/g,
    'strong {$1color: #00ccaa;'
  );

  // 10. Change meta text
  content = content.replace(
    /\.article-meta \{([\s\S]*?)color: #666;/g,
    '.article-meta {$1color: rgba(255, 255, 255, 0.75);'
  );

  // 11. Fix header border (red to teal)
  content = content.replace(
    /border-bottom: 3px solid #ff1744;/g,
    'border-bottom: 3px solid #00ccaa;'
  );

  // 12. Update example boxes if they exist
  content = content.replace(
    /\.bio-example \{([\s\S]*?)background: #f8f9fa;([\s\S]*?)border-left: 4px solid #ff1744;/g,
    '.bio-example {$1background: rgba(0, 204, 170, 0.08);$2border-left: 4px solid #00ccaa;\n            border: 1px solid rgba(0, 204, 170, 0.2);'
  );

  content = content.replace(
    /\.message-example \{([\s\S]*?)background: #fff3e0;([\s\S]*?)border-left: 4px solid #ff9800;/g,
    '.message-example {$1background: rgba(102, 126, 234, 0.1);$2border-left: 4px solid #667eea;\n            border: 1px solid rgba(102, 126, 234, 0.3);'
  );

  content = content.replace(
    /\.script-example \{([\s\S]*?)background: #e8f5e9;([\s\S]*?)border-left: 4px solid #4caf50;/g,
    '.script-example {$1background: rgba(76, 175, 80, 0.1);$2border-left: 4px solid #4caf50;\n            border: 1px solid rgba(76, 175, 80, 0.3);'
  );

  // 13. Update border-radius from 4px to 12px for modern look
  content = content.replace(/border-radius: 4px;/g, 'border-radius: 12px;');
  content = content.replace(/border-radius: 8px;/g, 'border-radius: 20px;');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Applied dark/teal theme to ${filename}`);
});

console.log('\n✨ All remaining blogs now have dark/teal theme!');
