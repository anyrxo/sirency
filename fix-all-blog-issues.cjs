const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let navsRemoved = 0;
let backButtonsFixed = 0;
let scrollAdded = 0;
let year2024Fixed = 0;
let mobileFixed = 0;

console.log('🔧 Comprehensive blog fixes starting...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. REMOVE ALL NAVIGATION HEADERS (intrusive Book a Call banners)
  // Pattern 1: <nav> tags with Book a Call
  if (content.includes('<nav') || content.includes('<Nav')) {
    // Remove entire nav sections including Webflow navigation
    content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');

    // Also remove any standalone "Book a call" buttons outside nav
    content = content.replace(/<a[^>]*>Book a call<\/a>/gi, '');

    navsRemoved++;
    modified = true;
  }

  // Pattern 2: Remove navigation wrappers
  if (content.includes('navwrapper') || content.includes('navbar')) {
    content = content.replace(/<div[^>]*navwrapper[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '');
    modified = true;
  }

  // 2. FIX ALL BACK BUTTONS - Change position: fixed to position: absolute
  if (content.includes('position: fixed') && content.includes('.back-button')) {
    content = content.replace(
      /(\.back-button[\s\S]*?)position:\s*fixed;/gi,
      '$1position: absolute;'
    );
    backButtonsFixed++;
    modified = true;
  }

  // 3. ADD SCROLL-TO-TOP BUTTON if missing
  if (!content.includes('scroll-to-top')) {
    // Add scroll-to-top styles before </style>
    const scrollStyles = `
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
        }
    </style>`;

    content = content.replace('</style>', scrollStyles);

    // Add scroll-to-top element before </body>
    const scrollElement = `
    <div class="scroll-to-top" onclick="scrollToTop()" title="Back to top">
        ↑
    </div>

    <script>
        // Scroll to top functionality
        window.addEventListener('scroll', function() {
            const scrollBtn = document.querySelector('.scroll-to-top');
            if (scrollBtn && window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else if (scrollBtn) {
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

    content = content.replace('</body>', scrollElement);
    scrollAdded++;
    modified = true;
  }

  // 4. CHANGE ALL 2024 TO 2025
  if (content.includes('2024')) {
    // Change in titles, text content, URLs, but be careful with dates like "2024-01-01"
    content = content.replace(/\b2024\b/g, '2025');
    year2024Fixed++;
    modified = true;
  }

  // 5. ENSURE MOBILE OPTIMIZATION - Add mobile viewport meta if missing
  if (!content.includes('viewport')) {
    content = content.replace(
      '<head>',
      '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">'
    );
    mobileFixed++;
    modified = true;
  }

  // 6. ADD MOBILE STYLES if missing proper media queries
  if (!content.includes('@media') || !content.includes('max-width: 768px')) {
    const mobileStyles = `
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            .container, .blog-container, .article-container {
                padding: 20px 15px !important;
            }
            h1 {
                font-size: 1.8rem !important;
            }
            h2 {
                font-size: 1.5rem !important;
            }
            h3 {
                font-size: 1.3rem !important;
            }
            table {
                font-size: 0.85rem;
                display: block;
                overflow-x: auto;
            }
        }
    </style>`;

    if (content.includes('</style>')) {
      content = content.replace('</style>', mobileStyles);
      mobileFixed++;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Comprehensive fix summary:`);
console.log(`   - ${navsRemoved} files: intrusive navigation headers removed`);
console.log(`   - ${backButtonsFixed} files: back buttons changed to absolute positioning`);
console.log(`   - ${scrollAdded} files: scroll-to-top buttons added`);
console.log(`   - ${year2024Fixed} files: 2024 changed to 2025`);
console.log(`   - ${mobileFixed} files: mobile optimization improved`);
