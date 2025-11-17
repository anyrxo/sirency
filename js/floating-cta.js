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

    // Create container
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-cta-container';
    floatingContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      width: calc(100% - 40px);
      max-width: 600px;
      display: none;
    `;

    // Create button
    const applyButton = document.createElement('a');
    applyButton.href = '#';
    applyButton.className = 'floating-cta-button button-primary';
    applyButton.innerHTML = `
      <span>I'M READY</span>
    `;

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
      width: 100%;
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

    floatingContainer.appendChild(applyButton);
    document.body.appendChild(floatingContainer);

    return floatingContainer;
  }

  // ===================================
  // SHOW/HIDE LOGIC
  // ===================================

  function handleFloatingCTA() {
    const floatingContainer = document.querySelector('.floating-cta-container') || createFloatingCTA();

    if (!floatingContainer) return;

    // Show on mobile only
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      floatingContainer.style.display = 'none';
      return;
    }

    // ALWAYS SHOW ON MOBILE - Always visible, no hiding at top
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
