const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let arrowPositioned = 0;
let footerFixed = 0;

console.log('🔧 Positioning scroll arrow above Blog button and fixing footer...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. POSITION SCROLL ARROW STRATEGICALLY ABOVE BLOG BUTTON
  // Change from centered to right-aligned, positioned above where Blog button is
  if (content.includes('.scroll-to-top')) {
    // Replace the scroll-to-top CSS positioning
    content = content.replace(
      /(\.scroll-to-top\s*{[^}]*?)bottom:\s*180px;\s*right:\s*20px;/gi,
      '$1bottom: 100px;\n            right: 80px;'
    );

    // Also fix mobile positioning to be above blog button
    content = content.replace(
      /(@media[^{]*max-width:\s*768px[^}]*\.scroll-to-top\s*{[^}]*?)bottom:\s*160px;/gi,
      '$1bottom: 80px;\n                right: 65px;'
    );

    arrowPositioned++;
    modified = true;
  }

  // 2. FIX FOOTER LOGO CENTERING ON MOBILE
  // Add mobile-specific styling for footer logo
  if (content.includes('footerlogo') || content.includes('footer')) {
    // Check if we already have mobile footer styles
    if (!content.includes('footerlogo-mobile-fix')) {
      // Find the closing </style> tag and add mobile footer fix before it
      const mobileFooterFix = `
        /* Mobile footer logo centering */
        @media (max-width: 768px) {
            .footertext,
            .footer .link,
            .footerlogo {
                text-align: center !important;
                margin: 0 auto !important;
                display: block !important;
            }
            .footertext {
                justify-content: center !important;
                align-items: center !important;
            }
            .footnav {
                text-align: center !important;
                display: flex;
                flex-direction: column;
                align-items: center !important;
                justify-content: center !important;
            }
        }
        /* footerlogo-mobile-fix */
    </style>`;

      content = content.replace('</style>', mobileFooterFix);
      footerFixed++;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Fix summary:`);
console.log(`   - ${arrowPositioned} files: scroll arrow positioned above Blog button`);
console.log(`   - ${footerFixed} files: footer logo centered on mobile`);
console.log(`\n📝 Arrow now appears strategically above Blog button (right side)`);
