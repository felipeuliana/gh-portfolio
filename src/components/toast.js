/**
 * Accessible toast notification system
 */

import { announce } from '../utils/a11y.js';
import { getIcon } from '../utils/icons.js';

let toastContainer = null;

const getToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm pointer-events-none';
    toastContainer.setAttribute('role', 'region');
    toastContainer.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

/**
 * Shows an accessible toast alert
 * @param {string} message 
 * @param {'success' | 'info' | 'error'} [type='success']
 * @param {number} [duration=3500]
 */
export const showToast = (message, type = 'success', duration = 3500) => {
  const container = getToastContainer();
  announce(message, type === 'error' ? 'assertive' : 'polite');

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border text-sm font-sans transition-all duration-300 transform translate-y-2 opacity-0 ${
    type === 'success'
      ? 'bg-shadow-grey border-amber-earth text-ghost-white ring-1 ring-amber-earth/50'
      : type === 'error'
      ? 'bg-shadow-grey border-bubble-gum-pink text-ghost-white ring-1 ring-bubble-gum-pink/50'
      : 'bg-shadow-grey border-rosy-granite text-ghost-white'
  }`;

  const iconName = type === 'success' ? 'check' : type === 'error' ? 'close' : 'zap';
  const iconColor = type === 'success' ? 'text-amber-earth' : type === 'error' ? 'text-bubble-gum-pink' : 'text-ghost-white';

  toast.innerHTML = `
    <span class="${iconColor} shrink-0">${getIcon(iconName, 'w-5 h-5')}</span>
    <span class="flex-1">${message}</span>
    <button type="button" class="text-rosy-granite hover:text-ghost-white focus-visible:outline-none p-1 rounded" aria-label="Dismiss notification">
      ${getIcon('close', 'w-4 h-4')}
    </button>
  `;

  const dismissBtn = toast.querySelector('button');
  const dismiss = () => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  };

  dismissBtn?.addEventListener('click', dismiss);

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
  });

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
};
