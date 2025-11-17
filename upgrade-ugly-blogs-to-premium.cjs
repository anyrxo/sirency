const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html') && file !== 'index.html');

let upgraded = 0;

console.log('🎨 Upgrading ugly blogs to premium glassmorphism style...\n');

// Get the premium style template from audit blog
const auditBlogPath = path.join(blogDir, 'audit-onlyfans-agency.html');
const auditContent = fs.readFileSync(auditBlogPath, 'utf8');

// Extract the premium CSS links and style from audit blog
const premiumCSSLinks = `  <link href="../css/premium-liquid-glass.css" rel="stylesheet" type="text/css">
  <link href="../css/clean-glass-effects.css" rel="stylesheet" type="text/css">
  <link href="../css/liquid-glass-enhancements.css" rel="stylesheet" type="text/css">
  <link href="../css/mobile-fixes.css" rel="stylesheet" type="text/css">`;

// Extract premium styles from audit blog
const premiumStyleMatch = auditContent.match(/<style>([\s\S]*?)<\/style>/);
const premiumStyles = premiumStyleMatch ? premiumStyleMatch[1] : '';

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has premium styling
  if (content.includes('premium-liquid-glass.css')) {
    return;
  }

  // UPGRADE TO PREMIUM STYLING
  let modified = false;

  // 1. Add premium CSS links after webflow.css
  if (!content.includes('premium-liquid-glass.css')) {
    content = content.replace(
      /(<link href="\.\.\/css\/sirency\.webflow\.css" rel="stylesheet" type="text\/css">)/,
      `$1\n${premiumCSSLinks}`
    );
    modified = true;
  }

  // 2. Replace the entire <style> section with premium styles
  if (content.match(/<style>[\s\S]*?body\s*{[\s\S]*?background:\s*#000;/)) {
    // Extract existing scroll-to-top and other custom styles if any
    const scrollMatch = content.match(/\.scroll-to-top\s*{[\s\S]*?\/\* mobile-scroll-always-visible \*\//);
    const mobileFooterMatch = content.match(/\/\* Mobile footer logo centering \*\/[\s\S]*?\/\* footerlogo-mobile-fix \*\//);

    // Build new style section with premium styles + existing custom styles
    let newStyles = premiumStyles;

    // Add back scroll-to-top if it exists
    if (scrollMatch) {
      newStyles += '\n' + scrollMatch[0];
    }

    // Add back mobile footer fix if it exists
    if (mobileFooterMatch) {
      newStyles += '\n' + mobileFooterMatch[0];
    }

    // Replace entire <style> section
    content = content.replace(
      /<style>[\s\S]*?<\/style>/,
      `<style>${newStyles}\n  </style>`
    );
    modified = true;
  }

  // 3. Add Anton font if not present
  if (!content.includes('Anton')) {
    content = content.replace(
      /<link href="https:\/\/fonts\.googleapis\.com" rel="preconnect">/,
      `<link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Anton&display=swap" rel="stylesheet">`
    );
    modified = true;
  }

  // 4. Update body structure to use premium classes
  // Replace blog-container with article-container
  content = content.replace(/class="blog-container"/g, 'class="article-container"');
  content = content.replace(/class="blog-header"/g, 'class="article-header"');
  content = content.replace(/class="blog-title"/g, 'class="article-title"');
  content = content.replace(/class="blog-content"/g, 'class="article-content"');
  content = content.replace(/class="blog-meta"/g, 'class="article-meta"');

  // Add article-category if header exists but category doesn't
  if (content.includes('article-header') && !content.includes('article-category')) {
    content = content.replace(
      /(<div class="article-header">)/,
      `$1\n    <div class="article-category">Expert Guide</div>`
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Upgraded: ${filename}`);
    upgraded++;
  }
});

console.log(`\n✨ Upgraded ${upgraded} blogs to premium glassmorphism style`);
console.log('\n🎨 All blogs now have:');
console.log('   - Premium liquid glass effects');
console.log('   - Glassmorphism backgrounds');
console.log('   - Beautiful gradient styling');
console.log('   - Professional look matching audit blog');
