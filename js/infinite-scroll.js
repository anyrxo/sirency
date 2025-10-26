/**
 * INFINITE SCROLL - For Member Cards and Carousel Images
 * Duplicates and shuffles content so no two identical items appear consecutively
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
    // Duplicate carousel images with shuffling to prevent consecutive duplicates
    duplicateAndShuffle('.images-wrap', '.single-image');

    // Duplicate member cards with shuffling to prevent consecutive duplicates
    duplicateAndShuffle('.members', '.member');
  }

  function duplicateAndShuffle(containerSelector, itemSelector) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
      const items = Array.from(container.querySelectorAll(itemSelector));

      if (items.length === 0) return;

      // Create array of original items
      const originalItems = items.map(item => item.cloneNode(true));

      // Create shuffled copy that doesn't start with the same item the original ends with
      const shuffledItems = shuffleAvoidConsecutive(originalItems, items[items.length - 1]);

      // Append shuffled items to create seamless infinite loop
      shuffledItems.forEach(item => {
        container.appendChild(item);
      });

      // Add more copies to ensure truly seamless scroll
      const secondShuffled = shuffleAvoidConsecutive(originalItems, shuffledItems[shuffledItems.length - 1]);
      secondShuffled.forEach(item => {
        container.appendChild(item);
      });
    });
  }

  function shuffleAvoidConsecutive(items, lastItem) {
    // Clone the array
    const shuffled = [...items];

    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // If the first item matches the last item from previous set, move it
    if (lastItem && shuffled[0] && isSameImage(shuffled[0], lastItem)) {
      // Move first item to a random position (not first)
      const randomPos = Math.floor(Math.random() * (shuffled.length - 1)) + 1;
      const firstItem = shuffled.shift();
      shuffled.splice(randomPos, 0, firstItem);
    }

    return shuffled.map(item => item.cloneNode(true));
  }

  function isSameImage(item1, item2) {
    // Compare image sources to determine if they're the same
    const img1 = item1.querySelector('img');
    const img2 = item2.querySelector('img');

    if (img1 && img2) {
      return img1.src === img2.src;
    }

    // For member cards, compare by name
    const name1 = item1.querySelector('.member-name');
    const name2 = item2.querySelector('.member-name');

    if (name1 && name2) {
      return name1.textContent === name2.textContent;
    }

    return false;
  }
})();
