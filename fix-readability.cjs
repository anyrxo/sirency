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

// Fix back button position
const oldBackButton = `        .back-button {
            position: fixed;
            top: 80px;
            left: 20px;`;

const newBackButton = `        .back-button {
            position: fixed;
            top: 120px;
            left: 20px;`;

// Fix mobile back button
const oldMobileBack = `        @media (max-width: 768px) {
            .back-button {
                top: 70px;`;

const newMobileBack = `        @media (max-width: 768px) {
            .back-button {
                top: 100px;`;

// Fix text colors - make them brighter
const oldP = `        p {
            margin-bottom: 1.2rem;
            color: rgba(255, 255, 255, 0.8);
        }`;

const newP = `        p {
            margin-bottom: 1.2rem;
            color: rgba(255, 255, 255, 0.95);
        }`;

const oldLi = `        li {
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.8);
        }`;

const newLi = `        li {
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.95);
        }`;

const oldMeta = `        .article-meta {
            color: rgba(255, 255, 255, 0.6);`;

const newMeta = `        .article-meta {
            color: rgba(255, 255, 255, 0.75);`;

// Add scroll to top button styles and element
const scrollToTopStyles = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(0, 204, 170, 0.9);
            backdrop-filter: blur(10px);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
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
                width: 45px;
                height: 45px;
                bottom: 20px;
                right: 20px;
                font-size: 1.3rem;
            }
        }`;

const scrollToTopElement = `    <div class="scroll-to-top" onclick="scrollToTop()" title="Back to top">
        ↑
    </div>

    <script>
        // Scroll to top functionality
        window.addEventListener('scroll', function() {
            const scrollBtn = document.querySelector('.scroll-to-top');
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    </script>
</body>`;

const blogDir = path.join(__dirname, 'blog');

nicheBlogs.forEach(filename => {
  const filePath = path.join(blogDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filename} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix back button position
  content = content.replace(oldBackButton, newBackButton);
  content = content.replace(oldMobileBack, newMobileBack);

  // Fix text readability
  content = content.replace(oldP, newP);
  content = content.replace(oldLi, newLi);
  content = content.replace(oldMeta, newMeta);

  // Add scroll to top button styles
  if (!content.includes('scroll-to-top')) {
    content = content.replace('    </style>\n</head>', scrollToTopStyles + '\n    </style>\n</head>');

    // Add scroll to top element before closing body tag
    content = content.replace('</body>', scrollToTopElement);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed readability & added scroll-to-top for ${filename}`);
});

console.log('\n✨ All niche blog posts updated!');
