const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));

const floatingNavStyles = `
        /* Floating Navigation Bar */
        .floating-nav {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: rgba(26, 26, 46, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 204, 170, 0.3);
            border-radius: 50px;
            padding: 12px 24px;
            display: flex;
            gap: 16px;
            z-index: 9999;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
                        0 0 0 1px rgba(0, 204, 170, 0.1) inset,
                        0 4px 12px rgba(0, 204, 170, 0.2);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                        opacity 0.4s ease,
                        box-shadow 0.3s ease;
            opacity: 0;
            pointer-events: none;
        }

        .floating-nav.visible {
            transform: translateX(-50%) translateY(20px);
            opacity: 1;
            pointer-events: all;
        }

        .floating-nav.visible:hover {
            box-shadow: 0 12px 48px rgba(0, 204, 170, 0.3),
                        0 0 0 1px rgba(0, 204, 170, 0.2) inset,
                        0 8px 20px rgba(0, 204, 170, 0.3);
        }

        .floating-nav-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: linear-gradient(135deg, rgba(0, 204, 170, 0.15) 0%, rgba(0, 204, 170, 0.05) 100%);
            color: #00ccaa;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 600;
            font-size: 14px;
            border: 1px solid rgba(0, 204, 170, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
        }

        .floating-nav-btn:hover {
            background: linear-gradient(135deg, rgba(0, 204, 170, 0.25) 0%, rgba(0, 204, 170, 0.15) 100%);
            border-color: rgba(0, 204, 170, 0.5);
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 204, 170, 0.4),
                        0 0 20px rgba(0, 204, 170, 0.2);
        }

        .floating-nav-btn:active {
            transform: translateY(0) scale(0.98);
        }

        .floating-nav-icon {
            font-size: 16px;
            line-height: 1;
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
            .floating-nav {
                padding: 10px 16px;
                gap: 12px;
            }

            .floating-nav.visible {
                transform: translateX(-50%) translateY(12px);
            }

            .floating-nav-btn {
                padding: 8px 16px;
                font-size: 13px;
                gap: 6px;
            }

            .floating-nav-icon {
                font-size: 14px;
            }
        }

        @media (max-width: 480px) {
            .floating-nav {
                padding: 8px 12px;
                gap: 10px;
            }

            .floating-nav-btn {
                padding: 6px 12px;
                font-size: 12px;
            }

            .floating-nav-btn span {
                display: none;
            }

            .floating-nav-icon {
                font-size: 16px;
            }
        }
    </style>`;

const floatingNavHTML = `
    <!-- Floating Navigation -->
    <div class="floating-nav">
        <a href="../index.html" class="floating-nav-btn">
            <span class="floating-nav-icon">🏠</span>
            <span>Home</span>
        </a>
        <a href="../blog.html" class="floating-nav-btn">
            <span class="floating-nav-icon">📝</span>
            <span>Blog</span>
        </a>
    </div>

    <script>
        // Floating nav scroll behavior
        (function() {
            const floatingNav = document.querySelector('.floating-nav');
            if (!floatingNav) return;

            let lastScrollY = window.pageYOffset;
            let ticking = false;

            function updateNavVisibility() {
                const currentScrollY = window.pageYOffset;

                // Show nav when scrolling up or at top
                if (currentScrollY < lastScrollY || currentScrollY < 100) {
                    floatingNav.classList.add('visible');
                }
                // Hide nav when scrolling down
                else if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    floatingNav.classList.remove('visible');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            }

            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(updateNavVisibility);
                    ticking = true;
                }
            });

            // Show nav on page load for a moment
            setTimeout(() => {
                floatingNav.classList.add('visible');
            }, 500);

            // Hide after 3 seconds if user hasn't scrolled
            setTimeout(() => {
                if (window.pageYOffset < 100) {
                    floatingNav.classList.remove('visible');
                }
            }, 3500);
        })();
    </script>
</body>`;

let updated = 0;

files.forEach(filename => {
  const filePath = path.join(blogDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has floating nav
  if (content.includes('floating-nav')) {
    return;
  }

  // Add styles before </style>
  if (content.includes('</style>')) {
    content = content.replace('</style>', floatingNavStyles);
  }

  // Add HTML before </body>
  if (content.includes('</body>')) {
    content = content.replace('</body>', floatingNavHTML);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log(`✅ Added floating nav to ${filename}`);
});

console.log(`\n✨ Floating navigation added to ${updated} blog posts!`);
console.log(`\n📱 Features:`);
console.log(`   - Appears when scrolling up (even slightly)`);
console.log(`   - Hides when scrolling down`);
console.log(`   - Beautiful glassmorphism with teal accent`);
console.log(`   - Smooth animations (cubic-bezier easing)`);
console.log(`   - Mobile-optimized (icons only on small screens)`);
console.log(`   - Home button (left) + Blog button (right)`);
