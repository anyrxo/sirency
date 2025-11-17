const fs = require('fs');
const path = require('path');

const nicheBlogs = [
  'onlyfans-girl-next-door-niche-complete-guide-2025.html',
  'onlyfans-domme-findom-niche-complete-guide-2025.html',
  'onlyfans-trans-niche-complete-guide-2025.html',
  'onlyfans-egirl-niche-complete-guide-2025.html',
  'onlyfans-altgirl-niche-complete-guide-2025.html',
  'onlyfans-cosplay-niche-complete-guide-2025.html'
];

const oldStyles = `        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }`;

const newStyles = `        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            min-height: 100vh;
        }`;

const oldContainer = `        .article-container {
            max-width: 800px;
            margin: 2rem auto;
            background: white;
            padding: 3rem;
            border-radius: 8px;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }`;

const newContainer = `        .article-container {
            max-width: 800px;
            margin: 2rem auto;
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(20px);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 8px 40px rgba(0, 204, 170, 0.2);
            border: 1px solid rgba(0, 204, 170, 0.2);
        }`;

const oldHeaderBorder = `            border-bottom: 3px solid #ff1744;`;
const newHeaderBorder = `            border-bottom: 3px solid #00ccaa;`;

const oldH1 = `        h1 {
            font-size: 2.5rem;
            color: #000;
            margin-bottom: 1rem;
            line-height: 1.2;
        }`;

const newH1 = `        h1 {
            font-size: 2.5rem;
            color: #ffffff;
            margin-bottom: 1rem;
            line-height: 1.2;
            text-shadow: 0 2px 10px rgba(0, 204, 170, 0.3);
        }`;

const oldMeta = `        .article-meta {
            color: #666;
            font-size: 0.9rem;
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }`;

const newMeta = `        .article-meta {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }`;

const oldH2 = `        h2 {
            font-size: 1.8rem;
            color: #000;
            margin: 2.5rem 0 1rem;
            border-left: 4px solid #ff1744;
            padding-left: 1rem;
        }`;

const newH2 = `        h2 {
            font-size: 1.8rem;
            color: #00ccaa;
            margin: 2.5rem 0 1rem;
            border-left: 4px solid #00ccaa;
            padding-left: 1rem;
        }`;

const oldH3 = `        h3 {
            font-size: 1.3rem;
            color: #333;
            margin: 2rem 0 1rem;
        }`;

const newH3 = `        h3 {
            font-size: 1.3rem;
            color: rgba(255, 255, 255, 0.9);
            margin: 2rem 0 1rem;
        }`;

const oldP = `        p {
            margin-bottom: 1.2rem;
            color: #444;
        }`;

const newP = `        p {
            margin-bottom: 1.2rem;
            color: rgba(255, 255, 255, 0.8);
        }`;

const oldStrong = `        strong {
            color: #000;
            font-weight: 600;
        }`;

const newStrong = `        strong {
            color: #00ccaa;
            font-weight: 600;
        }`;

const oldBioExample = `        .bio-example {
            background: #f8f9fa;
            border-left: 4px solid #ff1744;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 4px;
        }`;

const newBioExample = `        .bio-example {
            background: rgba(0, 204, 170, 0.08);
            border-left: 4px solid #00ccaa;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 12px;
            border: 1px solid rgba(0, 204, 170, 0.2);
        }`;

const oldMessageExample = `        .message-example {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 4px;
        }`;

const newMessageExample = `        .message-example {
            background: rgba(102, 126, 234, 0.1);
            border-left: 4px solid #667eea;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.3);
        }`;

const oldScriptExample = `        .script-example {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 4px;
        }`;

const newScriptExample = `        .script-example {
            background: rgba(76, 175, 80, 0.1);
            border-left: 4px solid #4caf50;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 12px;
            border: 1px solid rgba(76, 175, 80, 0.3);
        }`;

const oldLi = `        li {
            margin-bottom: 0.5rem;
            color: #444;
        }`;

const newLi = `        li {
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.8);
        }`;

const blogDir = path.join(__dirname, 'blog');

nicheBlogs.forEach(filename => {
  const filePath = path.join(blogDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filename} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Apply all style replacements
  content = content.replace(oldStyles, newStyles);
  content = content.replace(oldContainer, newContainer);
  content = content.replace(oldHeaderBorder, newHeaderBorder);
  content = content.replace(oldH1, newH1);
  content = content.replace(oldMeta, newMeta);
  content = content.replace(oldH2, newH2);
  content = content.replace(oldH3, newH3);
  content = content.replace(oldP, newP);
  content = content.replace(oldStrong, newStrong);
  content = content.replace(oldBioExample, newBioExample);
  content = content.replace(oldMessageExample, newMessageExample);
  content = content.replace(oldScriptExample, newScriptExample);
  content = content.replace(oldLi, newLi);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated dark theme styling for ${filename}`);
});

console.log('\n✨ All niche blog posts updated to dark/teal theme!');
