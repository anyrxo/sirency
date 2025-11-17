const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let whiteTextFixed = 0;
let datesFixed = 0;
let scrollArrowMobileFixed = 0;
let relatedArticlesFixed = 0;

console.log('🔧 Fixing critical readability and usability issues...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. FIX WHITE ON WHITE TEXT IN HIGHLIGHT BOXES
  // Change light backgrounds to dark with proper text colors
  if (content.includes('.highlight-box') && content.includes('background: #f7fafc')) {
    content = content.replace(
      /\.highlight-box\s*{[^}]*background:\s*#f7fafc;[^}]*}/gi,
      `.highlight-box {
            background: rgba(0, 204, 170, 0.1);
            border-left: 4px solid #00ccaa;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            color: rgba(255, 255, 255, 0.95);
        }`
    );
    whiteTextFixed++;
    modified = true;
  }

  // 2. FIX WHITE ON WHITE TEXT IN WARNING BOXES
  if (content.includes('.warning-box') && content.includes('background: #fff5f5')) {
    content = content.replace(
      /\.warning-box\s*{[^}]*background:\s*#fff5f5;[^}]*}/gi,
      `.warning-box {
            background: rgba(252, 129, 129, 0.1);
            border-left: 4px solid #fc8181;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            color: rgba(255, 255, 255, 0.95);
        }`
    );
    modified = true;
  }

  // Also fix warning-box h4 to be readable
  if (content.includes('.warning-box h4')) {
    content = content.replace(
      /\.warning-box h4\s*{[^}]*color:\s*#c53030;[^}]*}/gi,
      `.warning-box h4 {
            color: #fc8181;
            margin-bottom: 10px;
        }`
    );
    modified = true;
  }

  // 3. FIX WHITE ON WHITE TEXT IN HIGHLIGHT-BOX PARAGRAPHS
  // Ensure all text in these boxes is readable
  if (content.includes('.highlight-box p')) {
    content = content.replace(
      /\.highlight-box p\s*{[^}]*}/gi,
      `.highlight-box p {
            color: rgba(255, 255, 255, 0.95) !important;
        }`
    );
    modified = true;
  } else if (content.includes('.highlight-box')) {
    // Add the style if it doesn't exist
    content = content.replace(
      /(\.highlight-box\s*{[^}]*})/gi,
      `$1
        .highlight-box p {
            color: rgba(255, 255, 255, 0.95) !important;
        }
        .highlight-box strong {
            color: #00ccaa !important;
        }`
    );
    modified = true;
  }

  // 4. FIX WHITE ON WHITE IN WARNING BOX PARAGRAPHS
  if (content.includes('.warning-box p')) {
    content = content.replace(
      /\.warning-box p\s*{[^}]*}/gi,
      `.warning-box p {
            color: rgba(255, 255, 255, 0.95) !important;
        }`
    );
    modified = true;
  } else if (content.includes('.warning-box')) {
    content = content.replace(
      /(\.warning-box h4\s*{[^}]*})/gi,
      `$1
        .warning-box p {
            color: rgba(255, 255, 255, 0.95) !important;
        }
        .warning-box strong {
            color: #fc8181 !important;
        }`
    );
    modified = true;
  }

  // 5. FIX "RELATED ARTICLES" WHITE ON WHITE TEXT
  // The gradient text needs a solid fallback color
  if (content.includes('Related Articles') && content.includes('linear-gradient(135deg, #fff 0%, #00ccaa 100%)')) {
    content = content.replace(
      /(<h2[^>]*style="[^"]*)(background: linear-gradient\(135deg, #fff 0%, #00ccaa 100%\);[^"]*")([^>]*>Related Articles<\/h2>)/gi,
      '$1background: linear-gradient(135deg, #00ccaa 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"$3'
    );
    relatedArticlesFixed++;
    modified = true;
  }

  // 6. FIX DATES: "January 16, 2025" -> "November 16, 2025"
  if (content.includes('January 16, 2025') || content.includes('January 2025')) {
    content = content.replace(/January 16, 2025/g, 'November 16, 2025');
    content = content.replace(/January 2025/g, 'November 2025');
    datesFixed++;
    modified = true;
  }

  // Also fix ISO date format in schema
  if (content.includes('2025-01-')) {
    content = content.replace(/2025-01-/g, '2025-11-');
    modified = true;
  }

  // 7. MAKE GREEN SCROLL ARROW ALWAYS VISIBLE ON MOBILE
  // Ensure it's always showing on mobile like the bottom nav buttons
  if (content.includes('.scroll-to-top') && content.includes('@media')) {
    // Find the mobile media query for scroll-to-top and ensure it's visible
    const mobileScrollFix = `
        @media (max-width: 768px) {
            .scroll-to-top {
                display: flex !important;
                opacity: 1 !important;
                bottom: 80px;
                right: 65px;
            }
            .scroll-to-top.visible {
                display: flex !important;
                opacity: 1 !important;
            }
        }`;

    // Check if mobile styles already exist
    if (!content.includes('.scroll-to-top.visible')) {
      // Add mobile-specific always-visible style before closing </style>
      content = content.replace('</style>', mobileScrollFix + '\n    </style>');
      scrollArrowMobileFixed++;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
  }
});

console.log(`\n✨ Fix summary:`);
console.log(`   - ${whiteTextFixed} files: white on white text fixed in highlight boxes`);
console.log(`   - ${datesFixed} files: dates changed from January to November 2025`);
console.log(`   - ${relatedArticlesFixed} files: "Related Articles" gradient fixed`);
console.log(`   - ${scrollArrowMobileFixed} files: scroll arrow always visible on mobile`);
console.log(`\n📝 All readability issues resolved!`);
