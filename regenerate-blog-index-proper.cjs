const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

const blogPosts = [];

console.log('📚 Reading actual titles from blog HTML files...\n');

files.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');

  // Extract ACTUAL title from <title> tag
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  let title = titleMatch ? titleMatch[1] : file.replace('.html', '');

  // Clean up title (remove "| Sirency" etc)
  title = title.replace(/\s*\|\s*Sirency\s*/gi, '')
              .replace(/\s*\|\s*SirenCY\s*/gi, '')
              .trim();

  // Extract description
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  const excerpt = descMatch ? descMatch[1] : '';

  // Calculate priority score (money-making content first)
  let priorityScore = 0;
  const lowerFile = file.toLowerCase();
  const lowerTitle = title.toLowerCase();

  // TIER 1: Money (100 points)
  if (lowerFile.includes('stuck-3k') || lowerFile.includes('pricing') || lowerFile.includes('monetization') ||
      lowerFile.includes('ppv') || lowerFile.includes('subscriber-retention') || lowerFile.includes('dm-chatting') ||
      lowerFile.includes('free-vs-paid') || lowerTitle.includes('pricing') || lowerTitle.includes('monetization')) {
    priorityScore = 100;
  }
  // TIER 2: Marketing (80 points)
  else if (lowerFile.includes('reddit') || lowerFile.includes('tiktok') || lowerFile.includes('instagram') ||
           lowerFile.includes('twitter') || lowerFile.includes('promotion') || lowerFile.includes('first-100')) {
    priorityScore = 80;
  }
  // TIER 3: Agency (60 points)
  else if (lowerFile.includes('agency') || lowerTitle.includes('agency')) {
    priorityScore = 60;
  }
  // TIER 4: Content (40 points)
  else if (lowerFile.includes('content') || lowerFile.includes('niche')) {
    priorityScore = 40;
  }
  // TIER 5: Tools/Platform (20 points)
  else {
    priorityScore = 20;
  }

  // Determine category
  let category = 'Strategy';
  if (lowerFile.includes('agency')) category = 'Agency';
  else if (lowerFile.includes('reddit') || lowerFile.includes('tiktok') || lowerFile.includes('instagram') || lowerFile.includes('twitter')) category = 'Marketing';
  else if (lowerFile.includes('pricing') || lowerFile.includes('monetization') || lowerFile.includes('ppv')) category = 'Monetization';
  else if (lowerFile.includes('content') || lowerFile.includes('niche')) category = 'Content';

  blogPosts.push({
    title,
    excerpt: excerpt.substring(0, 140) + '...',
    category,
    url: file,
    priorityScore
  });
});

// Sort by priority
blogPosts.sort((a, b) => b.priorityScore - a.priorityScore);

console.log(`✅ Extracted ${blogPosts.length} blog post titles\n`);
console.log('Top 5 titles:');
blogPosts.slice(0, 5).forEach((post, i) => {
  console.log(`${i + 1}. ${post.title}`);
});

// Generate HTML
const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>OnlyFans Marketing Blog | Creator Growth Strategies | SirenCY</title>
  <meta name="description" content="Expert insights on OnlyFans marketing, creator growth strategies, and monetization tips from the #1 rated OnlyFans agency. Learn how to scale your creator business to 6-7 figures.">
  <meta name="keywords" content="onlyfans blog, creator marketing blog, onlyfans tips, content creator advice, onlyfans growth strategies, influencer marketing">
  <meta content="OnlyFans Marketing Blog | SirenCY" property="og:title">
  <meta content="Expert insights on OnlyFans marketing and creator growth from the #1 rated agency." property="og:description">
  <meta property="og:type" content="website">
  <meta content="OnlyFans Marketing Blog | SirenCY" property="twitter:title">
  <meta content="Expert insights on OnlyFans marketing and creator growth from the #1 rated agency." property="twitter:description">
  <meta content="summary_large_image" name="twitter:card">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link rel="canonical" href="https://www.sirency.com/blog/">
  <link href="../css/normalize.css" rel="stylesheet" type="text/css">
  <link href="../css/webflow.css" rel="stylesheet" type="text/css">
  <link href="../css/sirency.webflow.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
  <script type="text/javascript">WebFont.load({  google: {    families: ["Poppins:300,regular,500,600,700,800","Inter:300,regular,500,600,700"]  }});</script>
  <link href="../images/favicon.png" rel="shortcut icon" type="image/x-icon">
  <link href="../images/webclip.png" rel="apple-touch-icon">

  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
      margin: 0;
      padding: 0;
    }
    .blog-header-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 20px 60px;
      text-align: center;
    }
    .blog-header-title {
      font-size: 56px;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #00ccaa 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .blog-header-subtitle {
      font-size: 20px;
      color: rgba(255,255,255,0.8);
      max-width: 700px;
      margin: 0 auto 40px;
      line-height: 1.6;
    }
    .blog-grid {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px 120px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
    }
    .blog-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s;
      border: 1px solid rgba(0, 204, 170, 0.2);
      text-decoration: none;
      display: block;
    }
    .blog-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 204, 170, 0.3);
      border-color: rgba(0, 204, 170, 0.5);
    }
    .blog-card-content {
      padding: 30px;
    }
    .blog-card-category {
      color: #00ccaa;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
    }
    .blog-card-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 15px;
      color: #fff;
      line-height: 1.3;
    }
    .blog-card-excerpt {
      color: rgba(255,255,255,0.7);
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .read-more {
      color: #00ccaa;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
    .read-more:hover {
      color: #a855f7;
    }
    @media (max-width: 768px) {
      .blog-header-title {
        font-size: 36px;
      }
      .blog-grid {
        grid-template-columns: 1fr;
        gap: 25px;
        padding-bottom: 140px;
      }
    }

    .scroll-to-top {
      position: fixed;
      bottom: 100px;
      right: 80px;
      background: rgba(0, 204, 170, 0.9);
      backdrop-filter: blur(10px);
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 999;
      border: 2px solid rgba(0, 204, 170, 0.5);
      font-size: 1.5rem;
      box-shadow: 0 4px 15px rgba(0, 204, 170, 0.4);
    }
    .scroll-to-top:hover {
      background: rgba(0, 204, 170, 1);
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(0, 204, 170, 0.6);
    }
    .scroll-to-top.visible {
      display: flex;
    }
    @media (max-width: 768px) {
      .scroll-to-top {
        display: flex !important;
        opacity: 1 !important;
        visibility: visible !important;
        width: 45px;
        height: 45px;
        bottom: 80px;
        right: 65px;
        font-size: 1.3rem;
      }
      .scroll-to-top.visible {
        display: flex !important;
        opacity: 1 !important;
      }
    }
  </style>
</head>
<body>
  <div class="scroll-to-top visible" onclick="scrollToTop()" title="Back to top">↑</div>

  <div class="blog-header-section">
    <h1 class="blog-header-title">OnlyFans Growth Blog</h1>
    <p class="blog-header-subtitle">Expert strategies, proven tactics, and insider insights to help you scale from $0 to $50K+/month on OnlyFans.</p>
  </div>

  <div class="blog-grid">
${blogPosts.map(post => `    <a href="${post.url}" class="blog-card">
      <div class="blog-card-content">
        <div class="blog-card-category">${post.category}</div>
        <h2 class="blog-card-title">${post.title}</h2>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <span class="read-more">Read Article →</span>
      </div>
    </a>`).join('\n')}
  </div>

  <script>
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
      scrollBtn.classList.add('visible');
    }
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  </script>

  <!-- Floating CTA -->
  <script src="../js/floating-cta.js"></script>
  <script src="../js/airtable-modal.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(blogDir, 'index.html'), indexHTML, 'utf8');

console.log('\n✅ Blog index regenerated with ACTUAL titles from HTML files!');
console.log('\n📝 All 2024/outdated titles now show correctly');
