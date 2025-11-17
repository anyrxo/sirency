const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

const baseUrl = 'https://sirency.com';
const currentDate = new Date().toISOString().split('T')[0];

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Blog Posts -->
`;

// Add all blog posts
files.forEach(filename => {
  // Skip index.html as it's already covered by blog.html
  if (filename === 'index.html') return;

  sitemap += `  <url>
    <loc>${baseUrl}/blog/${filename}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemap += `</urlset>`;

// Write sitemap
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');

console.log(`✅ Sitemap generated with ${files.length} blog posts`);
console.log(`📍 Location: sitemap.xml`);
console.log(`🔗 Submit to: https://search.google.com/search-console`);
