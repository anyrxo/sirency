/**
 * Content Copy Protection
 * Prevents text selection and copying on the website
 */

(function() {
  'use strict';

  // Disable text selection via CSS
  function addProtectionStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Disable text selection */
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /* Allow selection for form inputs */
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      /* Disable context menu cursor */
      body {
        cursor: default;
      }
    `;
    document.head.appendChild(style);
  }

  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable Ctrl+C, Ctrl+A, Ctrl+U, Ctrl+S
  document.addEventListener('keydown', function(e) {
    // Ctrl+C or Cmd+C (Copy)
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }

    // Ctrl+A or Cmd+A (Select All)
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 65) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U or Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }

    // Ctrl+S or Cmd+S (Save)
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }

    // F12 (Developer Tools)
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
  });

  // Disable copy event
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable cut event
  document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable drag selection
  document.addEventListener('selectstart', function(e) {
    // Allow selection in inputs and textareas
    if (e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable) {
      return true;
    }
    e.preventDefault();
    return false;
  });

  // Disable mouse selection
  document.addEventListener('mousedown', function(e) {
    // Allow selection in inputs and textareas
    if (e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable) {
      return true;
    }

    // Prevent text selection on double/triple click
    if (e.detail > 1) {
      e.preventDefault();
      return false;
    }
  });

  // Apply styles on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addProtectionStyles);
  } else {
    addProtectionStyles();
  }

  console.log('🔒 Copy protection enabled');

})();
