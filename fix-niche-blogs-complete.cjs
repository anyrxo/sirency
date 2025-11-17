const fs = require('fs');
const path = require('path');

// Only fix the 2 blogs that were missed
const nicheBlogs = [
  'onlyfans-altgirl-niche-complete-guide-2025.html',
  'onlyfans-cosplay-niche-complete-guide-2025.html'
];

const blogDir = path.join(__dirname, 'blog');

nicheBlogs.forEach(filename => {
  const filePath = path.join(blogDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filename} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. REMOVE THE ENTIRE NAVIGATION SECTION
  // Remove from <body> or start of body content to </nav> or end of nav
  content = content.replace(
    /<body>\s*<nav class="nav">[\s\S]*?<\/nav>/,
    '<body>'
  );

  // Also try alternative nav removal patterns
  content = content.replace(
    /<div class="nav">[\s\S]*?<\/div>\s*<\/div>/,
    ''
  );

  // 2. APPLY DARK THEME - Body styles
  content = content.replace(
    /body \{[\s\S]*?color: #333;[\s\S]*?background: #f5f5f5;/,
    `body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            min-height: 100vh;`
  );

  // 3. REMOVE NAV STYLES (no longer needed)
  content = content.replace(
    /\.nav \{[\s\S]*?\}[\s\S]*?\.nav-content \{[\s\S]*?\}[\s\S]*?\.logo \{[\s\S]*?\}[\s\S]*?\.nav-links \{[\s\S]*?\}[\s\S]*?\.nav-links a \{[\s\S]*?\}[\s\S]*?\.nav-links a:hover \{[\s\S]*?\}/,
    ''
  );

  // 4. APPLY DARK THEME - Container
  content = content.replace(
    /\.article-container \{[\s\S]*?background: white;/,
    `.article-container {
            max-width: 800px;
            margin: 2rem auto;
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(20px);`
  );

  content = content.replace(
    /box-shadow: 0 2px 20px rgba\(0,0,0,0\.1\);/,
    `box-shadow: 0 8px 40px rgba(0, 204, 170, 0.2);
            border: 1px solid rgba(0, 204, 170, 0.2);`
  );

  // 5. APPLY DARK THEME - H1
  content = content.replace(
    /h1 \{[\s\S]*?color: #000;/,
    `h1 {
            font-size: 2.5rem;
            color: #ffffff;`
  );

  content = content.replace(
    /h1 \{[\s\S]*?line-height: 1\.2;\s*\}/,
    `h1 {
            font-size: 2.5rem;
            color: #ffffff;
            margin-bottom: 1rem;
            line-height: 1.2;
            text-shadow: 0 2px 10px rgba(0, 204, 170, 0.3);
        }`
  );

  // 6. APPLY DARK THEME - Meta text
  content = content.replace(
    /\.article-meta \{[\s\S]*?color: #666;/,
    `.article-meta {
            color: rgba(255, 255, 255, 0.75);`
  );

  // 7. APPLY DARK THEME - H2 (change red to teal)
  content = content.replace(
    /h2 \{[\s\S]*?color: #000;[\s\S]*?border-left: 4px solid #ff1744;/,
    `h2 {
            font-size: 1.8rem;
            color: #00ccaa;
            margin: 2.5rem 0 1rem;
            border-left: 4px solid #00ccaa;`
  );

  // 8. APPLY DARK THEME - H3
  content = content.replace(
    /h3 \{[\s\S]*?color: #333;/,
    `h3 {
            font-size: 1.3rem;
            color: rgba(255, 255, 255, 0.9);`
  );

  // 9. APPLY DARK THEME - Paragraphs
  content = content.replace(
    /p \{[\s\S]*?color: #444;/,
    `p {
            margin-bottom: 1.2rem;
            color: rgba(255, 255, 255, 0.95);`
  );

  // 10. APPLY DARK THEME - List items
  content = content.replace(
    /li \{[\s\S]*?color: #444;/,
    `li {
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.95);`
  );

  // 11. APPLY DARK THEME - Strong tags
  content = content.replace(
    /strong \{[\s\S]*?color: #000;/,
    `strong {
            color: #00ccaa;`
  );

  // 12. APPLY DARK THEME - Bio examples (change red to teal)
  content = content.replace(
    /\.bio-example \{[\s\S]*?background: #f8f9fa;[\s\S]*?border-left: 4px solid #ff1744;/,
    `.bio-example {
            background: rgba(0, 204, 170, 0.08);
            border-left: 4px solid #00ccaa;`
  );

  content = content.replace(
    /\.bio-example \{[\s\S]*?border-radius: 4px;\s*\}/,
    `.bio-example {
            background: rgba(0, 204, 170, 0.08);
            border-left: 4px solid #00ccaa;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 12px;
            border: 1px solid rgba(0, 204, 170, 0.2);
        }`
  );

  // 13. APPLY DARK THEME - Message examples
  content = content.replace(
    /\.message-example \{[\s\S]*?background: #fff3e0;[\s\S]*?border-left: 4px solid #ff9800;/,
    `.message-example {
            background: rgba(102, 126, 234, 0.1);
            border-left: 4px solid #667eea;`
  );

  content = content.replace(
    /\.message-example \{[\s\S]*?border-radius: 4px;\s*\}/,
    `.message-example {
            background: rgba(102, 126, 234, 0.1);
            border-left: 4px solid #667eea;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.3);
        }`
  );

  // 14. APPLY DARK THEME - Script examples
  content = content.replace(
    /\.script-example \{[\s\S]*?background: #e8f5e9;[\s\S]*?border-left: 4px solid #4caf50;/,
    `.script-example {
            background: rgba(76, 175, 80, 0.1);
            border-left: 4px solid #4caf50;`
  );

  content = content.replace(
    /\.script-example \{[\s\S]*?border-radius: 4px;\s*\}/,
    `.script-example {
            background: rgba(76, 175, 80, 0.1);
            border-left: 4px solid #4caf50;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 12px;
            border: 1px solid rgba(76, 175, 80, 0.3);
        }`
  );

  // 15. UPDATE DATES - Change Jan 2025 to Nov 2025
  content = content.replace(/"datePublished": "2025-01-\d{2}"/g, '"datePublished": "2025-11-15"');
  content = content.replace(/"dateModified": "2025-01-\d{2}"/g, '"dateModified": "2025-11-15"');

  // 16. FIX BACK BUTTON POSITION - Make sure it's not covered
  content = content.replace(
    /\.back-button \{[\s\S]*?top: 80px;/,
    `.back-button {
            position: fixed;
            top: 120px;`
  );

  // Mobile back button fix
  content = content.replace(
    /@media \(max-width: 768px\) \{[\s\S]*?\.back-button \{[\s\S]*?top: 70px;/,
    `@media (max-width: 768px) {
            .back-button {
                top: 100px;`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed ${filename}:
    - Applied dark/teal theme
    - Removed navigation header
    - Updated dates to November 2025
    - Fixed back button positioning`);
});

console.log('\n✨ All niche blog fixes complete!');
