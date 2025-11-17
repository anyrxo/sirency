const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let mobileScrollFixed = 0;

console.log('🔧 Making scroll arrow always visible on mobile...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // MAKE SCROLL ARROW ALWAYS VISIBLE ON MOBILE
  // Add mobile-specific styles to ensure it's always showing
  if (content.includes('.scroll-to-top') && !content.includes('/* mobile-scroll-always-visible */')) {
    // Find the closing </style> tag and add mobile fix before it
    const mobileScrollFix = `
        /* Mobile scroll arrow - always visible like bottom nav */
        @media (max-width: 768px) {
            .scroll-to-top {
                display: flex !important;
                opacity: 1 !important;
                visibility: visible !important;
                bottom: 80px;
                right: 65px;
            }
            .scroll-to-top.visible {
                display: flex !important;
                opacity: 1 !important;
            }
        }
        /* mobile-scroll-always-visible */
    </style>`;

    content = content.replace('</style>', mobileScrollFix);
    mobileScrollFixed++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Fix summary:`);
console.log(`   - ${mobileScrollFixed} files: scroll arrow now always visible on mobile`);
console.log(`\n📝 Green arrow will stay visible on mobile just like Home/Blog buttons!`);
