const fs = require('fs');
const path = require('path');

// Update dates for the other niche blogs
const nicheBlogs = [
  'onlyfans-girl-next-door-niche-complete-guide-2025.html',
  'onlyfans-domme-findom-niche-complete-guide-2025.html',
  'onlyfans-trans-niche-complete-guide-2025.html',
  'onlyfans-egirl-niche-complete-guide-2025.html'
];

const blogDir = path.join(__dirname, 'blog');

nicheBlogs.forEach(filename => {
  const filePath = path.join(blogDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filename} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update dates from Jan 2025 to Nov 2025
  const oldPublished = content.match(/"datePublished": "2025-01-\d{2}"/);
  const oldModified = content.match(/"dateModified": "2025-01-\d{2}"/);

  content = content.replace(/"datePublished": "2025-01-\d{2}"/g, '"datePublished": "2025-11-15"');
  content = content.replace(/"dateModified": "2025-01-\d{2}"/g, '"dateModified": "2025-11-15"');

  if (oldPublished || oldModified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated dates in ${filename} to November 2025`);
  } else {
    console.log(`⏭️  No date updates needed for ${filename}`);
  }
});

console.log('\n✨ All niche blog dates updated to November 2025!');
