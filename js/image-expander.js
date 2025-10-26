/**
 * Image Expansion Modal
 * Makes gallery images clickable and expandable
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="image-modal-close">×</div>
      <img src="" alt="Expanded view">
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.image-modal-close');

    // Get all expandable images
    const expandableImages = document.querySelectorAll('.gallery-image, .instaimage, .member-image img');

    // Add click event to each image
    expandableImages.forEach(img => {
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Get the image source (handle srcset)
        const src = this.currentSrc || this.src;

        // Set modal image
        modalImg.src = src;
        modalImg.alt = this.alt || 'Expanded view';

        // Show modal
        modal.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', closeModal);

    // Close modal on background click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';

      // Clear image after animation
      setTimeout(() => {
        modalImg.src = '';
      }, 300);
    }
  }
})();
