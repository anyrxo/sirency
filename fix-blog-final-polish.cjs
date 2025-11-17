const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let blackSpaceFixed = 0;
let ctasRemoved = 0;
let footerImageFixed = 0;
let relatedPostsAdded = 0;
let scrollButtonMoved = 0;

console.log('🔧 Final blog polish starting...\n');

// Related Posts HTML template
const relatedPostsHTML = `
      <div class="related-posts" style="margin-top: 80px; padding-top: 60px; border-top: 2px solid rgba(0, 204, 170, 0.2);">
        <h2 style="font-size: 2rem; margin-bottom: 40px; background: linear-gradient(135deg, #fff 0%, #00ccaa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Related Articles</h2>
        <div class="related-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-bottom: 60px;">
          <a href="onlyfans-reddit-marketing-guide-2025.html" style="display: block; background: rgba(255,255,255,0.03); border: 1px solid rgba(0,204,170,0.2); border-radius: 16px; padding: 24px; text-decoration: none; transition: all 0.3s ease;">
            <h3 style="color: #00ccaa; font-size: 1.2rem; margin-bottom: 12px;">Reddit Marketing for OnlyFans</h3>
            <p style="color: #ccc; font-size: 0.95rem; line-height: 1.6;">Master Reddit promotion strategies to drive massive traffic to your OnlyFans.</p>
          </a>
          <a href="onlyfans-pricing-strategy-guide-2025.html" style="display: block; background: rgba(255,255,255,0.03); border: 1px solid rgba(0,204,170,0.2); border-radius: 16px; padding: 24px; text-decoration: none; transition: all 0.3s ease;">
            <h3 style="color: #00ccaa; font-size: 1.2rem; margin-bottom: 12px;">OnlyFans Pricing Strategy 2025</h3>
            <p style="color: #ccc; font-size: 0.95rem; line-height: 1.6;">Optimize your subscription pricing to maximize revenue and subscriber growth.</p>
          </a>
          <a href="onlyfans-content-strategy-planning-2025.html" style="display: block; background: rgba(255,255,255,0.03); border: 1px solid rgba(0,204,170,0.2); border-radius: 16px; padding: 24px; text-decoration: none; transition: all 0.3s ease;">
            <h3 style="color: #00ccaa; font-size: 1.2rem; margin-bottom: 12px;">OnlyFans Content Strategy</h3>
            <p style="color: #ccc; font-size: 0.95rem; line-height: 1.6;">Build a content calendar that keeps subscribers engaged and reduces churn.</p>
          </a>
        </div>
      </div>`;

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. FIX EMPTY BLACK HEADER SPACE - Remove broken navigation remnants
  // Pattern: <div class="page-wrapper"> followed by only closing tags (no content)
  if (content.includes('page-wrapper')) {
    const pageWrapperPattern = /<div class="page-wrapper">\s*<div class="menu-icon-line-bottom"><\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi;
    if (pageWrapperPattern.test(content)) {
      content = content.replace(pageWrapperPattern, '');
      blackSpaceFixed++;
      modified = true;
    }

    // Also remove simpler version
    const simplePageWrapper = /<!-- Navigation -->\s*<div class="page-wrapper">\s*(?:<\/div>\s*){1,10}/gi;
    if (simplePageWrapper.test(content)) {
      content = content.replace(simplePageWrapper, '');
      blackSpaceFixed++;
      modified = true;
    }
  }

  // 2. REMOVE WEIRD CTAs - Keep only "I'm Ready" button (which is in floating-cta.js)
  // Remove "Request Information Package" and similar CTAs
  if (content.includes('Request Information Package') || content.includes('Request Info')) {
    // Remove the entire CTA box containing this
    content = content.replace(/<div class="cta-box">[\s\S]*?Request Information Package[\s\S]*?<\/div>/gi, '');
    ctasRemoved++;
    modified = true;
  }

  // Also remove "Apply to Work With SirenCY" Typeform links (replaced by Airtable modal)
  if (content.includes('form.typeform.com')) {
    content = content.replace(/<div[^>]*>[\s\S]*?form\.typeform\.com[\s\S]*?<\/div>/gi, '');
    modified = true;
  }

  // 3. FIX BROKEN FOOTER IMAGE - Change Sirency-New-Logo.svg to Logo-1-1.svg
  if (content.includes('Sirency-New-Logo.svg')) {
    content = content.replace(/Sirency-New-Logo\.svg/g, 'Logo-1-1.svg');
    footerImageFixed++;
    modified = true;
  }

  // 4. ADD RELATED POSTS if missing
  if (!content.includes('related-posts') && !content.includes('Related Articles')) {
    // Insert before the last CTA or before </article> tag
    const insertPosition = content.lastIndexOf('</article>');
    if (insertPosition > 0) {
      content = content.slice(0, insertPosition) + relatedPostsHTML + '\n' + content.slice(insertPosition);
      relatedPostsAdded++;
      modified = true;
    }
  }

  // 5. MOVE SCROLL-TO-TOP BUTTON HIGHER (from bottom: 30px to bottom: 100px)
  if (content.includes('.scroll-to-top') && content.includes('bottom: 30px')) {
    content = content.replace(
      /(\.scroll-to-top\s*{[\s\S]*?)bottom:\s*30px;/gi,
      '$1bottom: 100px;'
    );
    scrollButtonMoved++;
    modified = true;
  }

  // Also fix inline styles on scroll-to-top element
  if (content.includes('scroll-to-top') && content.includes('right: 30px')) {
    content = content.replace(/right:\s*30px;/gi, 'right: 20px;');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Final polish summary:`);
console.log(`   - ${blackSpaceFixed} files: empty black header space removed`);
console.log(`   - ${ctasRemoved} files: weird CTAs removed`);
console.log(`   - ${footerImageFixed} files: footer logo fixed (Sirency-New-Logo.svg → Logo-1-1.svg)`);
console.log(`   - ${relatedPostsAdded} files: related posts section added`);
console.log(`   - ${scrollButtonMoved} files: scroll-to-top moved higher (bottom: 100px)`);
console.log(`\n📱 Note: "I'm Ready" button visibility handled by floating-cta.js`);
