const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let fixed = 0;

console.log('🔧 Fixing incomplete blog structures (adding headers, back button, proper wrappers)...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has back-to-blog button
  if (content.includes('back-to-blog')) {
    return;
  }

  // Extract title from <title> tag
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  if (!titleMatch) {
    console.log(`⚠️  Skipped ${filename} (no title tag)`);
    return;
  }

  let title = titleMatch[1]
    .replace(/\s*\|\s*Sirency\s*/gi, '')
    .replace(/\s*\|\s*SirenCY\s*/gi, '')
    .trim();

  // Extract publish date
  const dateMatch = content.match(/<meta\s+property="article:published_time"\s+content="([^"]+)"/i);
  const publishDate = dateMatch ? new Date(dateMatch[1]).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'January 16, 2025';

  // Determine category based on filename/title
  let category = 'Strategy';
  const lowerFile = filename.toLowerCase();
  const lowerTitle = title.toLowerCase();

  if (lowerFile.includes('agency') || lowerTitle.includes('agency')) {
    category = 'Agency';
  } else if (lowerFile.includes('reddit') || lowerFile.includes('tiktok') ||
             lowerFile.includes('instagram') || lowerFile.includes('twitter') ||
             lowerFile.includes('marketing')) {
    category = 'Marketing';
  } else if (lowerFile.includes('pricing') || lowerFile.includes('monetization') ||
             lowerFile.includes('ppv') || lowerFile.includes('revenue')) {
    category = 'Monetization';
  } else if (lowerFile.includes('content') || lowerFile.includes('niche') ||
             lowerFile.includes('photo') || lowerFile.includes('video')) {
    category = 'Content';
  }

  // Build the article header section
  const articleHeader = `
  <!-- Article Header -->
  <div class="article-header">
    <div class="article-category">${category}</div>
    <h1 class="article-title">${title}</h1>
    <div class="article-meta">Published ${publishDate} · 12 min read</div>
  </div>

  <!-- Article Container -->
  <div class="blog-content-wrapper">
    <article class="article-container">
    <a href="index.html" class="back-to-blog">Back to Blog</a>

    <div class="article-content">`;

  const articleFooter = `
    </div>
  </article>
  </div>`;

  // Find where to insert the header (after <body> tag)
  let bodyMatch = content.match(/(<body[^>]*>)/i);
  if (!bodyMatch) {
    console.log(`⚠️  Skipped ${filename} (no body tag found)`);
    return;
  }

  // Find the first h2 or h3 tag to know where content starts
  const firstHeadingMatch = content.match(/<h[23][^>]*>/i);
  if (!firstHeadingMatch) {
    console.log(`⚠️  Skipped ${filename} (no content headings found)`);
    return;
  }

  const firstHeadingIndex = content.indexOf(firstHeadingMatch[0]);
  const bodyEndIndex = content.indexOf(bodyMatch[0]) + bodyMatch[0].length;

  // Check if there's existing content before the first heading
  let beforeContent = content.substring(bodyEndIndex, firstHeadingIndex).trim();

  // Remove any stray opening divs or tags from incomplete structure
  beforeContent = beforeContent.replace(/<\/div>\s*<\/div>/g, '');
  beforeContent = beforeContent.replace(/<!--[^>]*-->/g, ''); // Remove comments
  beforeContent = beforeContent.replace(/^\s*<div[^>]*>\s*$/gm, ''); // Remove empty divs

  // If there's any actual paragraph content before first heading, preserve it
  let introContent = '';
  if (beforeContent.includes('<p>')) {
    const pMatch = beforeContent.match(/<p[^>]*>[\s\S]*?<\/p>/);
    if (pMatch) {
      introContent = '\n      ' + pMatch[0] + '\n';
    }
  }

  // Get everything from first heading to related articles or end
  const relatedMatch = content.match(/<div class="related-posts"/i);
  const footerScriptsMatch = content.match(/<script async src="https:\/\/www\.googletagmanager\.com/i);

  let contentEndIndex;
  if (relatedMatch) {
    contentEndIndex = content.indexOf(relatedMatch[0]);
  } else if (footerScriptsMatch) {
    // Find last closing tag before scripts
    const scriptIndex = content.indexOf(footerScriptsMatch[0]);
    const lastDiv = content.lastIndexOf('</div>', scriptIndex);
    const lastArticle = content.lastIndexOf('</article>', scriptIndex);
    contentEndIndex = Math.max(lastDiv, lastArticle, firstHeadingIndex);
  } else {
    contentEndIndex = content.lastIndexOf('</body>');
  }

  const mainContent = content.substring(firstHeadingIndex, contentEndIndex).trim();

  // Get the related articles section if it exists
  let relatedSection = '';
  if (relatedMatch) {
    const relatedStart = content.indexOf(relatedMatch[0]);
    const relatedEnd = content.indexOf('</div>', relatedStart + 500); // Find closing div within reasonable range
    if (relatedEnd > relatedStart) {
      relatedSection = '\n      ' + content.substring(relatedStart, relatedEnd + 6);
    }
  }

  // Build the new body content
  const newBodyContent = articleHeader + introContent + mainContent + relatedSection + articleFooter;

  // Replace everything between <body> and scripts
  const scriptsIndex = content.indexOf('<script async src="https://www.googletagmanager.com');
  let beforeBody = content.substring(0, bodyEndIndex);
  let afterScripts = content.substring(scriptsIndex > 0 ? scriptsIndex : content.indexOf('</body>'));

  const newContent = beforeBody + '\n' + newBodyContent + '\n\n' + afterScripts;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Fixed ${filename}`);
  console.log(`   Category: ${category} | Title: ${title.substring(0, 50)}...`);
  fixed++;
});

console.log(`\n✨ Fixed ${fixed} incomplete blog posts`);
console.log(`\n📝 All blogs now have:`);
console.log('   - Article header with category badge and title');
console.log('   - Back to Blog button');
console.log('   - Proper article structure');
console.log('   - Related articles preserved');
