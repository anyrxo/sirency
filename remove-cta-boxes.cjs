const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');

// Target the blogs where I just added CTA boxes
const blogsWithCTA = [
  'best-link-in-bio-tools-onlyfans-2025.html',
  'best-photo-editing-apps-onlyfans-2025.html',
  'how-to-choose-best-onlyfans-agency-2025.html',
  'instagram-reels-onlyfans-conversion-strategy-2025.html',
  'onlyfans-content-ideas-that-sell-2025.html',
  'onlyfans-equipment-photography-setup-guide-2025.html'
];

let removed = 0;

console.log('🗑️  Removing ugly CTA boxes from blog posts...\n');

blogsWithCTA.forEach(filename => {
  const filePath = path.join(blogDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped ${filename} (doesn't exist)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the entire CTA box div
  const ctaBoxRegex = /<div class="cta-box">[\s\S]*?<\/div>/g;

  if (content.match(ctaBoxRegex)) {
    content = content.replace(ctaBoxRegex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Removed CTA box from ${filename}`);
    removed++;
  } else {
    console.log(`✓ ${filename} had no CTA box`);
  }
});

console.log(`\n✨ Removed CTA boxes from ${removed} blog posts`);
console.log(`\n📝 Floating "I'M READY" button will handle all CTAs`);
