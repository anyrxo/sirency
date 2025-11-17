import fs from 'fs';
import path from 'path';

const blogDir = './blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

const blogPosts = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');

  // Extract title
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].replace(' | Sirency', '').replace(' | SirenCY', '').trim() : file.replace('.html', '');

  // Extract description (meta description)
  const descMatch = content.match(/<meta\s+(?:name|content)="description"\s+content="(.*?)"/i) ||
                    content.match(/<meta\s+content="(.*?)"\s+name="description"/i);
  const excerpt = descMatch ? descMatch[1].substring(0, 150) + '...' : '';

  // Categorize based on filename/title
  let category = 'strategy';
  let categoryLabel = 'Growth Strategy';

  if (file.includes('agency') || title.toLowerCase().includes('agency')) {
    category = 'agency';
    categoryLabel = 'Agency Insights';
  } else if (file.includes('ftl') || file.includes('free-trial') || title.toLowerCase().includes('free trial')) {
    category = 'ftl';
    categoryLabel = 'Free Trial Links';
  } else if (file.includes('scam') || title.toLowerCase().includes('scam')) {
    category = 'scam-prevention';
    categoryLabel = 'Scam Prevention';
  } else if (file.includes('contract') || file.includes('legal') || title.toLowerCase().includes('contract')) {
    category = 'contracts';
    categoryLabel = 'Contracts & Legal';
  } else if (file.includes('monetization') || file.includes('pricing') || file.includes('ppv') || title.toLowerCase().includes('monetization')) {
    category = 'monetization';
    categoryLabel = 'Monetization';
  }

  blogPosts.push({
    title: title,
    excerpt: excerpt,
    category: category,
    categoryLabel: categoryLabel,
    url: `blog/${file}`,
    date: "Nov 15, 2024",
    readTime: "10 min"
  });
});

// Output JavaScript array
console.log('const blogPosts = [');
blogPosts.forEach((post, index) => {
  console.log('  {');
  console.log(`    title: "${post.title.replace(/"/g, '\\"')}",`);
  console.log(`    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",`);
  console.log(`    category: "${post.category}",`);
  console.log(`    categoryLabel: "${post.categoryLabel}",`);
  console.log(`    url: "${post.url}",`);
  console.log(`    date: "${post.date}",`);
  console.log(`    readTime: "${post.readTime}"`);
  console.log(`  }${index < blogPosts.length - 1 ? ',' : ''}`);
});
console.log('];');

console.error(`\nGenerated ${blogPosts.length} blog posts`);
