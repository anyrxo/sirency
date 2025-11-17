/**
 * FLOATING BOTTOM CTA BUTTON
 * Mobile-optimized floating action button
 * Based on 1abel Website4 Implementation
 */

(function() {
  'use strict';

  // ===================================
  // CREATE FLOATING CTA BUTTON
  // ===================================

  function createFloatingCTA() {
    // Check if already exists
    if (document.querySelector('.floating-cta-container')) {
      return;
    }

    // Create container with 3 buttons: Home | I'M READY | Blog
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-cta-container';
    floatingContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      width: calc(100% - 40px);
      max-width: 700px;
      display: flex;
      gap: 12px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `;

    // Add media query for mobile
    const style = document.createElement('style');
    style.textContent = `
      .floating-cta-container {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
      }
      @media (max-width: 768px) {
        .floating-cta-container {
          gap: 8px;
          padding: 0 10px;
        }
        .floating-cta-button {
          font-size: 14px !important;
          padding: 16px 24px !important;
        }
        .nav-button {
          width: 50px !important;
          height: 50px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Home button (left)
    const homeButton = document.createElement('a');
    homeButton.href = '../index.html';
    homeButton.className = 'nav-button';
    homeButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    homeButton.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: rgba(26, 26, 46, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 204, 170, 0.3);
      border-radius: 50%;
      color: #00ccaa;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      flex-shrink: 0;
    `;

    homeButton.addEventListener('mouseenter', () => {
      homeButton.style.transform = 'translateY(-4px) scale(1.05)';
      homeButton.style.borderColor = 'rgba(0, 204, 170, 0.6)';
      homeButton.style.boxShadow = '0 12px 32px rgba(0, 204, 170, 0.4)';
    });

    homeButton.addEventListener('mouseleave', () => {
      homeButton.style.transform = 'translateY(0) scale(1)';
      homeButton.style.borderColor = 'rgba(0, 204, 170, 0.3)';
      homeButton.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
    });

    // I'M READY button (center)
    const applyButton = document.createElement('a');
    applyButton.href = '#';
    applyButton.className = 'floating-cta-button button-primary';
    applyButton.innerHTML = `<span>I'M READY</span>`;

    // Open Airtable modal on click
    applyButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.openAirtableForm === 'function') {
        window.openAirtableForm();
      }
    });

    applyButton.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 18px 32px;
      background: linear-gradient(135deg, rgba(0, 204, 170, 0.95), rgba(0, 156, 130, 0.95));
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0, 204, 170, 0.4);
      color: white;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    `;

    // Add hover effect
    applyButton.addEventListener('mouseenter', () => {
      applyButton.style.transform = 'translateY(-4px) scale(1.02)';
      applyButton.style.boxShadow = '0 16px 64px rgba(0, 204, 170, 0.5)';
    });

    applyButton.addEventListener('mouseleave', () => {
      applyButton.style.transform = 'translateY(0) scale(1)';
      applyButton.style.boxShadow = '0 12px 48px rgba(0, 204, 170, 0.4)';
    });

    // Add tap effect for mobile
    applyButton.addEventListener('touchstart', () => {
      applyButton.style.transform = 'scale(0.95)';
    });

    applyButton.addEventListener('touchend', () => {
      applyButton.style.transform = 'scale(1)';
    });

    // Blog button (right)
    const blogButton = document.createElement('a');
    blogButton.href = '../blog.html';
    blogButton.className = 'nav-button';
    blogButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 7H17M7 12H17M7 17H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    blogButton.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: rgba(26, 26, 46, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 204, 170, 0.3);
      border-radius: 50%;
      color: #00ccaa;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      flex-shrink: 0;
    `;

    blogButton.addEventListener('mouseenter', () => {
      blogButton.style.transform = 'translateY(-4px) scale(1.05)';
      blogButton.style.borderColor = 'rgba(0, 204, 170, 0.6)';
      blogButton.style.boxShadow = '0 12px 32px rgba(0, 204, 170, 0.4)';
    });

    blogButton.addEventListener('mouseleave', () => {
      blogButton.style.transform = 'translateY(0) scale(1)';
      blogButton.style.borderColor = 'rgba(0, 204, 170, 0.3)';
      blogButton.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
    });

    // Add all buttons to container
    floatingContainer.appendChild(homeButton);
    floatingContainer.appendChild(applyButton);
    floatingContainer.appendChild(blogButton);
    document.body.appendChild(floatingContainer);

    return floatingContainer;
  }

  // ===================================
  // SHOW/HIDE LOGIC
  // ===================================

  function handleFloatingCTA() {
    const floatingContainer = document.querySelector('.floating-cta-container') || createFloatingCTA();

    if (!floatingContainer) return;

    // ALWAYS SHOW - Visible on all screen sizes, always on screen
    floatingContainer.style.display = 'block';
    floatingContainer.style.opacity = '1';
    floatingContainer.style.transform = 'translateX(-50%) translateY(0)';
    floatingContainer.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  // ===================================
  // DEBOUNCED SCROLL HANDLER
  // ===================================

  let scrollTimeout;
  function debouncedScroll() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
      handleFloatingCTA();
    });
  }

  // ===================================
  // INITIALIZE
  // ===================================

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🚀 Initializing Floating CTA Button...');

    // Create the button
    createFloatingCTA();

    // Initial check
    handleFloatingCTA();

    // Listen to scroll
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // Listen to resize
    window.addEventListener('resize', handleFloatingCTA, { passive: true });

    console.log('✅ Floating CTA Button Ready!');
  }

  // Start initialization
  init();

})();
