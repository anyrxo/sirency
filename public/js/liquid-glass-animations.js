/**
 * LIQUID GLASS ANIMATIONS & INTERACTIONS
 * SirenCY Website Enhancement Script
 */

(function() {
  'use strict';

  // ===================================
  // SCROLL REVEAL ANIMATION
  // ===================================

  function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  }

  // ===================================
  // SMOOTH NAVBAR SCROLL EFFECT
  // ===================================

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-logo-left-container');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = '0 12px 48px 0 rgba(0, 0, 0, 0.6)';
      } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
        navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
      }

      // Hide navbar on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });
  }

  // ===================================
  // PARALLAX EFFECT FOR IMAGES
  // ===================================

  function initParallax() {
    const parallaxElements = document.querySelectorAll('.gallery-image, .member-image img, .instaimage');

    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.style.transform = `translateY(${rate}px)`;
        }
      });
    });
  }

  // ===================================
  // MAGNETIC BUTTON EFFECT
  // ===================================

  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.button-primary');

    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
      });
    });
  }

  // ===================================
  // CURSOR TRAIL EFFECT
  // ===================================

  function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    // Create cursor circles if they don't exist
    if (circles.length === 0 && window.innerWidth > 768) {
      for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(0, 204, 170, 0.3);
          pointer-events: none;
          z-index: 9999;
          transition: all 0.3s ease;
          transform: translate(-50%, -50%);
        `;
        document.body.appendChild(circle);
      }

      const newCircles = document.querySelectorAll('.cursor-circle');
      const circleColors = [
        'rgba(0, 204, 170, 0.5)',
        'rgba(0, 156, 130, 0.5)',
      ];

      newCircles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
        circle.style.background = circleColors[index % circleColors.length];
      });

      window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
      });

      function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        newCircles.forEach((circle, index) => {
          circle.style.left = x + 'px';
          circle.style.top = y + 'px';
          circle.style.transform = `translate(-50%, -50%) scale(${(newCircles.length - index) / newCircles.length})`;

          circle.x = x;
          circle.y = y;

          const nextCircle = newCircles[index + 1] || newCircles[0];
          x += (nextCircle.x - x) * 0.3;
          y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
      }

      animateCircles();
    }
  }

  // ===================================
  // TYPING ANIMATION FOR HEADINGS
  // ===================================

  function initTypingAnimation() {
    const headings = document.querySelectorAll('[data-typing]');

    headings.forEach(heading => {
      const text = heading.textContent;
      heading.textContent = '';
      heading.style.opacity = '1';

      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          heading.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    });
  }

  // ===================================
  // COUNTER ANIMATION FOR NUMBERS
  // ===================================

  function initCounterAnimation() {
    const counters = document.querySelectorAll('.priceheading2');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = entry.target;
          const text = target.textContent;
          const numbers = text.match(/[\d,]+/g);

          if (numbers) {
            const originalNumber = numbers[0].replace(/,/g, '');
            const isDecimal = text.includes('.');
            const isCurrency = text.includes('$');
            const suffix = text.replace(/[\d,.$/k-]+/g, '').trim();

            let current = 0;
            const increment = parseInt(originalNumber) / 100;

            const counter = setInterval(() => {
              current += increment;

              if (current >= parseInt(originalNumber)) {
                current = parseInt(originalNumber);
                clearInterval(counter);
              }

              let displayValue = Math.floor(current).toLocaleString();

              if (isCurrency) {
                displayValue = '$' + displayValue;
              }

              if (suffix) {
                displayValue += suffix;
              }

              target.textContent = displayValue;
            }, 20);

            target.classList.add('counted');
          }
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // ===================================
  // TILT EFFECT FOR CARDS
  // ===================================

  function initTiltEffect() {
    const cards = document.querySelectorAll('.member, .feetext');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // ===================================
  // LAZY LOADING IMAGES
  // ===================================

  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const navHeight = document.querySelector('.navbar-logo-left-container').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===================================
  // ADD SCROLL REVEAL CLASSES
  // ===================================

  function addScrollRevealClasses() {
    // Add scroll-reveal class to elements that should animate on scroll
    const elementsToReveal = [
      '.member',
      '.feetext',
      '.image-column',
      '.section-heading',
      '.secondary-heading',
      '.heading-87',
      '.heading-88',
      '.priceheading',
      '.div-block-10',
      '.before-image',
      '.after-image'
    ];

    elementsToReveal.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (!element.classList.contains('scroll-reveal')) {
          element.classList.add('scroll-reveal');
        }
      });
    });
  }

  // ===================================
  // PERFORMANCE OPTIMIZATION
  // ===================================

  function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScroll = window.onscroll;

    window.onscroll = function() {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = window.requestAnimationFrame(function() {
        if (originalScroll) originalScroll();
      });
    };
  }

  // ===================================
  // INITIALIZE ALL FEATURES
  // ===================================

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🌊 Initializing Liquid Glass Enhancements...');

    // Add scroll reveal classes first
    addScrollRevealClasses();

    // Initialize all features
    setTimeout(() => {
      revealOnScroll();
      initNavbarScroll();
      // initParallax(); // Commented out as it can cause performance issues
      initMagneticButtons();
      // initCursorTrail(); // Commented out for better performance on some devices
      initCounterAnimation();
      initTiltEffect();
      initLazyLoading();
      initSmoothScroll();
      optimizePerformance();

      console.log('✨ Liquid Glass Enhancements Loaded!');
    }, 100);
  }

  // Start initialization
  init();

})();
