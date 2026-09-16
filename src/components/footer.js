/**
 * Semantic Footer Component
 * Includes "TOP" (scroll to top) and hosted badge.
 */

import { getIcon } from '../utils/icons.js';

export const createFooter = (profile) => {
  const currentYear = new Date().getFullYear();

  return `
    <footer role="contentinfo" class="bg-shadow-grey border-t border-rosy-granite/20 py-12 text-ghost-white/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">

          <!-- Brand & Copyright -->
          <div class="space-y-1 text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span class="font-sans font-bold text-ghost-white">${profile.name}</span>
              <span class="text-xs text-rosy-granite font-mono">• Full Stack Developer</span>
            </div>
            <p class="text-xs text-rosy-granite font-sans">
              © 2014-${currentYear} ${profile.name}. Developed with semantic HTML, clean JavaScript & Tailwind CSS.
            </p>
          </div>

          <!-- Standards & Badges -->
          <div class="flex flex-wrap items-center justify-center gap-3 text-2xs font-mono">
            <span class="px-2.5 py-1 rounded-full bg-shadow-grey border border-rosy-granite/30 text-ghost-white/80">
              HOSTED WITH GITHUB PAGES
            </span>
          </div>

          <!-- TOP (Back to top) Button -->
          <div>
            <button
              type="button"
              id="scroll-to-top-btn"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-shadow-grey border border-rosy-granite/40 hover:border-amber-earth text-ghost-white hover:text-amber-earth font-mono text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
              aria-label="Scroll to top of page"
            >
              <span>TOP</span>
              ${getIcon('arrowUp', 'w-4 h-4')}
            </button>
          </div>

        </div>
      </div>
    </footer>
  `;
};

export const initFooterListeners = () => {
  const scrollBtn = document.getElementById('scroll-to-top-btn');
  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};
