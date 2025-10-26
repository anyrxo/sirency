/**
 * INFINITE SCROLL - For Member Cards and Carousel Images
 * Duplicates content to create seamless infinite loop
 */

(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupInfiniteScroll();
  }

  function setupInfiniteScroll() {
    // Duplicate carousel images for seamless infinite scroll
    duplicateContent('.images-wrap', '.single-image');

    // Duplicate member cards for seamless infinite scroll
    duplicateContent('.members', '.member');
  }

  function duplicateContent(containerSelector, itemSelector) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
      const items = container.querySelectorAll(itemSelector);

      if (items.length === 0) return;

      // Clone all items and append them for seamless loop
      items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
      });
    });
  }
})();
