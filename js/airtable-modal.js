/**
 * Airtable Form Modal
 * Beautiful modal popup for Airtable embedded forms
 */

(function() {
  'use strict';

  // Airtable form URL - direct form link works better than /embed/ format
  const AIRTABLE_FORM_URL = 'https://airtable.com/appQ02O627V58qniG/pagDuERKbidS67V6A/form';

  // Create modal HTML
  function createModal() {
    const modalHTML = `
      <div class="airtable-modal-overlay" id="airtableModal">
        <div class="airtable-modal-container">
          <div class="airtable-modal-close" id="closeAirtableModal" aria-label="Close form"></div>
          <div class="airtable-modal-header">
            <h2 class="airtable-modal-title">Apply Now</h2>
            <p class="airtable-modal-subtitle">Join the creators scaling to six figures and beyond</p>
          </div>
          <div class="airtable-iframe-wrapper">
            <div class="iframe-loading" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #00ccaa; font-size: 18px;">Loading form...</div>
            <iframe
              id="airtableIframe"
              class="airtable-embed"
              src="${AIRTABLE_FORM_URL}"
              frameborder="0"
              onmousewheel=""
              width="100%"
              height="100%"
              allow="camera; microphone; geolocation; encrypted-media"
              style="background: transparent; border: none;">
            </iframe>
          </div>
        </div>
      </div>
    `;

    // Insert modal into DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Hide loading indicator when iframe loads
    const iframe = document.getElementById('airtableIframe');
    const loadingIndicator = document.querySelector('.iframe-loading');

    if (iframe) {
      iframe.addEventListener('load', function() {
        console.log('✅ Airtable form loaded successfully');
        if (loadingIndicator) {
          loadingIndicator.style.display = 'none';
        }
      });

      iframe.addEventListener('error', function() {
        console.error('❌ Failed to load Airtable form');
        if (loadingIndicator) {
          loadingIndicator.innerHTML = 'Form failed to load. <a href="https://airtable.com/appQ02O627V58qniG/pagDuERKbidS67V6A/form" target="_blank" style="color: #00ccaa; text-decoration: underline;">Open in new tab</a>';
        }
      });
    }
  }

  // Open modal
  function openModal() {
    const modal = document.getElementById('airtableModal');
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');

      // Track event (if you have analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_open', {
          'event_category': 'Application Form',
          'event_label': 'Airtable Modal Opened'
        });
      }
    }
  }

  // Close modal
  function closeModal() {
    const modal = document.getElementById('airtableModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  // Initialize modal
  function init() {
    // Create modal element
    createModal();

    // Get modal elements
    const modal = document.getElementById('airtableModal');
    const closeBtn = document.getElementById('closeAirtableModal');

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Find all "Apply now" buttons and replace their behavior
    const applyButtons = document.querySelectorAll('a[href*="typeform"], a[href*="msWwMM4D"]');

    applyButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    });

    // Also handle any buttons with specific classes or text
    const allButtons = document.querySelectorAll('.button-primary, .cta-button');
    allButtons.forEach(button => {
      const text = button.textContent.toLowerCase();
      if (text.includes('apply') || text.includes('book a call') || text.includes('get started')) {
        button.addEventListener('click', function(e) {
          // Only prevent default if it's going to typeform
          if (button.href && button.href.includes('typeform')) {
            e.preventDefault();
            openModal();
          }
        });
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global function for manual trigger
  window.openAirtableForm = openModal;
  window.closeAirtableForm = closeModal;

  console.log('✅ Airtable Modal Ready! window.openAirtableForm is available.');

})();
