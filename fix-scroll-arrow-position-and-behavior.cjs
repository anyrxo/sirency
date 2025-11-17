const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

let fixed = 0;

console.log('🔧 Fixing scroll arrow position and behavior...\n');

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // FIX 1: Change position to be CENTERED above blog button (not to the right)
  // Blog button is at bottom center, so arrow should be bottom center too, just higher
  if (content.includes('.scroll-to-top')) {
    // Replace desktop positioning
    content = content.replace(
      /\.scroll-to-top\s*{([^}]*?)bottom:\s*\d+px;\s*right:\s*\d+px;/gi,
      `.scroll-to-top {$1bottom: 140px;
            left: 50%;
            transform: translateX(-50%);`
    );

    // Replace mobile positioning to be centered
    content = content.replace(
      /@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[^}]*\.scroll-to-top\s*{[^}]*bottom:\s*\d+px;\s*right:\s*\d+px;/gi,
      `@media (max-width: 768px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 140px;
                left: 50%;
                transform: translateX(-50%);`
    );

    // FIX 2: Change from "always visible" to "show on scroll up, hide on scroll down"
    // Remove the always-visible mobile styles
    content = content.replace(
      /\/\* Mobile scroll arrow - always visible like bottom nav \*\/[\s\S]*?\/\* mobile-scroll-always-visible \*\//gi,
      ''
    );

    // Remove display: flex !important from mobile
    content = content.replace(
      /@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[^}]*\.scroll-to-top\s*{[^}]*display:\s*flex\s*!important;[^}]*opacity:\s*1\s*!important;[^}]*visibility:\s*visible\s*!important;[^}]*}/gi,
      ''
    );

    // Change default display from flex to none
    content = content.replace(
      /(\.scroll-to-top\s*{[^}]*?)display:\s*flex;/gi,
      '$1display: none;'
    );

    // Update .scroll-to-top.visible to show it
    if (!content.includes('.scroll-to-top.visible')) {
      content = content.replace(
        /(\.scroll-to-top\s*{[^}]*})/i,
        `$1
        .scroll-to-top.visible {
            display: flex;
        }`
      );
    } else {
      content = content.replace(
        /\.scroll-to-top\.visible\s*{[^}]*}/gi,
        `.scroll-to-top.visible {
            display: flex;
        }`
      );
    }

    // FIX 3: Add proper scroll behavior script
    // Find and replace the scroll script
    const scrollUpDownScript = `
    <script>
        // Scroll arrow - show on scroll up, hide on scroll down
        let lastScrollTop = 0;
        let scrollTimeout;
        const scrollBtn = document.querySelector('.scroll-to-top');

        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            scrollTimeout = setTimeout(function() {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                // Show when scrolling up, hide when scrolling down
                if (currentScroll > 300) { // Only show after scrolling 300px down
                    if (currentScroll < lastScrollTop) {
                        // Scrolling UP - show arrow
                        if (scrollBtn) scrollBtn.classList.add('visible');
                    } else {
                        // Scrolling DOWN - hide arrow
                        if (scrollBtn) scrollBtn.classList.remove('visible');
                    }
                } else {
                    // Near top - hide arrow
                    if (scrollBtn) scrollBtn.classList.remove('visible');
                }

                lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            }, 100); // Debounce for smooth behavior
        }, { passive: true });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    </script>`;

    // Replace existing scroll script
    content = content.replace(
      /<script>[\s\S]*?\/\/ Scroll.*?scrollToTop[\s\S]*?<\/script>/gi,
      scrollUpDownScript
    );

    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filename}`);
    fixed++;
  }
});

console.log(`\n✨ Fixed ${fixed} blog posts`);
console.log('\n📝 Scroll arrow now:');
console.log('   - Centered above Blog button (not to the right)');
console.log('   - Shows when scrolling UP');
console.log('   - Hides when scrolling DOWN');
console.log('   - Only appears after 300px scroll');
