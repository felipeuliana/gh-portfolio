/**
 * Accessibility (WCAG AA) helper utilities
 */

let liveRegion = null;

/**
 * Ensures an aria-live announcement region exists in the DOM
 * @returns {HTMLElement}
 */
const getLiveRegion = () => {
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-announcer';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }
  return liveRegion;
};

/**
 * Announces a message to screen readers
 * @param {string} message 
 * @param {'polite' | 'assertive'} [priority='polite']
 */
export const announce = (message, priority = 'polite') => {
  const region = getLiveRegion();
  region.setAttribute('aria-live', priority);
  region.textContent = '';
  // Short timeout to trigger mutation for assistive tech
  setTimeout(() => {
    region.textContent = message;
  }, 50);
};

/**
 * Traps focus within a container element (e.g. modal or drawer)
 * @param {HTMLElement} element 
 * @returns {() => void} Cleanup function to restore focus and remove listener
 */
export const trapFocus = (element) => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  const previouslyFocusedElement = document.activeElement;
  const focusableElements = Array.from(element.querySelectorAll(focusableSelectors));

  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab') return;

    const currentFocusables = Array.from(element.querySelectorAll(focusableSelectors));
    if (currentFocusables.length === 0) return;

    const firstItem = currentFocusables[0];
    const lastItem = currentFocusables[currentFocusables.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      }
    } else {
      if (document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
      previouslyFocusedElement.focus();
    }
  };
};
