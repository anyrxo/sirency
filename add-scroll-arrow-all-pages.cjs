const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const mainPages = ['index.html', 'blog.html', 'about.html', 'contact.html', 'services.html'];

let added = 0;

console.log('🔧 Adding green scroll arrow to ALL main pages...\n');

mainPages.forEach(filename => {
  const filePath = path.join(rootDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped ${filename} (doesn't exist)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if scroll arrow already exists
  if (content.includes('scroll-to-top')) {
    console.log(`✓ ${filename} already has scroll arrow`);
    return;
  }

  // Add scroll arrow styles
  const scrollStyles = `
    <style>
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
        }
    </style>`;

  // Add before closing </head>
  content = content.replace('</head>', scrollStyles + '\n</head>');

  // Add scroll arrow HTML
  const scrollHTML = `
    <div class="scroll-to-top visible" onclick="scrollToTop()" title="Back to top">↑</div>

    <script>
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.classList.add('visible');
        }
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    </script>`;

  // Add before closing </body>
  content = content.replace('</body>', scrollHTML + '\n</body>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Added scroll arrow to ${filename}`);
  added++;
});

console.log(`\n✨ Added scroll arrow to ${added} main pages`);
console.log(`\n📝 Green arrow now visible on mobile bottom-right on ALL pages!`);
