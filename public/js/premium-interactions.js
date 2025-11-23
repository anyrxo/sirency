/**
 * PREMIUM MICRO-INTERACTIONS
 * Advanced animations and interactions for SirenCY
 * Based on 1abel Website4 implementation
 */

(function() {
  'use strict';

  // ===================================
  // MAGNETIC BUTTONS
  // ===================================

  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-button, .button-primary');

    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Stronger magnetic effect
        const moveX = x * 0.3;
        const moveY = y * 0.3;

        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0) scale(1)';
      });

      element.addEventListener('mousedown', () => {
        element.style.transform = 'translate(0, 0) scale(0.95)';
      });

      element.addEventListener('mouseup', () => {
        element.style.transform = 'translate(0, 0) scale(1)';
      });
    });
  }

  // ===================================
  // 3D TILT EFFECT FOR CARDS
  // ===================================

  function init3DTilt() {
    const cards = document.querySelectorAll('.member, .glass-card, .feetext');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 8; // Max 8deg tilt
        const rotateY = ((centerX - x) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // ===================================
  // RIPPLE EFFECT ON BUTTONS
  // ===================================

  function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.button-primary, .btn-liquid, .ripple');

    rippleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          top: ${y}px;
          left: ${x}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: rippleAnimation 0.6s ease-out;
          pointer-events: none;
        `;

        // Add ripple animation if not exists
        if (!document.querySelector('#rippleStyles')) {
          const style = document.createElement('style');
          style.id = 'rippleStyles';
          style.textContent = `
            @keyframes rippleAnimation {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }

        if (this.style.position !== 'absolute' && this.style.position !== 'relative') {
          this.style.position = 'relative';
        }
        this.style.overflow = 'hidden';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ===================================
  // PARALLAX SCROLL EFFECT
  // ===================================

  function initParallaxScroll() {
    const parallaxElements = document.querySelectorAll('.parallax-element, .hero-info, .background-video');

    if (parallaxElements.length === 0) return;

    function handleParallax() {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = element.dataset.parallaxSpeed || 0.5;
          const yPos = -(scrolled * speed);
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ===================================
  // IMAGE HOVER ZOOM WITH ROTATION
  // ===================================

  function initImageZoom() {
    const images = document.querySelectorAll('.premium-image img, .gallery-image, .instaimage, .member-image img');

    images.forEach(img => {
      const container = img.parentElement;

      container.addEventListener('mouseenter', () => {
        img.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        img.style.transform = 'scale(1.15) rotate(2deg)';
      });

      container.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }

  // ===================================
  // SMOOTH COUNTER ANIMATION
  // ===================================

  function initSmoothCounters() {
    const counters = document.querySelectorAll('.priceheading2, [data-counter]');

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const element = entry.target;
          const text = element.textContent;

          // Extract number
          const match = text.match(/[\d,]+/);
          if (!match) return;

          const targetNumber = parseInt(match[0].replace(/,/g, ''));
          const prefix = text.substring(0, text.indexOf(match[0]));
          const suffix = text.substring(text.indexOf(match[0]) + match[0].length);

          let currentNumber = 0;
          const duration = 2000; // 2 seconds
          const increment = targetNumber / (duration / 16); // 60fps

          const counter = setInterval(() => {
            currentNumber += increment;

            if (currentNumber >= targetNumber) {
              currentNumber = targetNumber;
              clearInterval(counter);
            }

            const displayNumber = Math.floor(currentNumber).toLocaleString();
            element.textContent = prefix + displayNumber + suffix;
          }, 16);

          element.classList.add('counted');
        }
      });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ===================================
  // ENHANCED NAVBAR BEHAVIOR
  // ===================================

  function initEnhancedNavbar() {
    const navbar = document.querySelector('.navbar-logo-left-container, .navwrapper');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    navbar.classList.add('navbar-glass');

    function updateNavbar() {
      const currentScroll = window.pageYOffset;

      // Add/remove glass effect based on scroll
      if (currentScroll > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.85))';
        navbar.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.6)';
      } else {
        navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
      }

      // Hide/show navbar on scroll
      if (currentScroll > lastScroll && currentScroll > 500) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===================================
  // SCROLL REVEAL WITH SPRING PHYSICS
  // ===================================

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .member, .feetext, .image-column');

    const revealOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('spring-in');
            entry.target.style.opacity = '1';
          }, index * 100); // Stagger animation
        }
      });
    }, revealOptions);

    revealElements.forEach(element => {
      element.style.opacity = '0';
      revealObserver.observe(element);
    });
  }

  // ===================================
  // APPLY GLASS EFFECTS TO EXISTING ELEMENTS
  // ===================================

  function applyGlassEffects() {
    // Add glass effect to member cards
    document.querySelectorAll('.member').forEach(card => {
      card.classList.add('glass-card', 'hover-elevate', 'shimmer-on-hover');
    });

    // Add glass effect to case study cards
    document.querySelectorAll('.feetext, .div-block-3, .div-block-5').forEach(card => {
      card.classList.add('glass-card', 'hover-elevate');
    });

    // Add magnetic effect to all buttons
    document.querySelectorAll('.button-primary').forEach(button => {
      button.classList.add('magnetic-button', 'ripple', 'btn-liquid', 'pulse-glow');
    });

    // Add premium image styling
    document.querySelectorAll('.gallery-image, .instaimage').forEach(img => {
      if (img.parentElement) {
        img.parentElement.classList.add('premium-image');
      }
    });
  }

  // ===================================
  // SMOOTH ANCHOR SCROLLING
  // ===================================

  function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navHeight = document.querySelector('.navbar-logo-left-container')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ===================================
  // INITIALIZE ALL FEATURES
  // ===================================

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('✨ Initializing Premium Interactions...');

    setTimeout(() => {
      applyGlassEffects();
      initMagneticButtons();
      init3DTilt();
      initRippleEffect();
      // initParallaxScroll(); // Disabled for performance
      initImageZoom();
      initSmoothCounters();
      initEnhancedNavbar();
      initScrollReveal();
      initSmoothAnchorScroll();

      console.log('🎨 Premium Interactions Loaded!');
    }, 100);
  }

  init();

})();
