/**
 * Header & Accessible Navigation Component
 */

import { getIcon } from '../utils/icons.js';
import { trapFocus } from '../utils/a11y.js';

export const createHeader = (profile) => {
  return `
    <header class="sticky top-0 z-40 w-full bg-shadow-grey/90 backdrop-blur-md border-b border-rosy-granite/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo / Brand -->
        <a href="#hero" class="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none rounded-lg p-1">
          <div class="w-10 h-10 rounded-lg bg-amber-earth flex items-center justify-center font-mono font-bold text-shadow-grey text-lg shadow-md group-hover:bg-bubble-gum-pink transition-colors">
            FU
          </div>
          <div class="flex flex-col">
            <span class="font-sans font-bold text-ghost-white tracking-wide text-base leading-tight group-hover:text-amber-earth transition-colors">
              ${profile.name}
            </span>
            <span class="font-mono text-2xs text-rosy-granite tracking-wider uppercase">
              Full Stack Developer
            </span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav aria-label="Primary Navigation" class="hidden md:flex items-center gap-6">
          <ul class="flex items-center gap-6 text-sm font-sans font-medium text-ghost-white/80">
            <li>
              <a href="#projects" class="nav-link hover:text-amber-earth transition-colors py-2 focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none rounded">
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" class="nav-link hover:text-amber-earth transition-colors py-2 focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none rounded">
                Architecture
              </a>
            </li>
            <li>
              <a href="#about" class="nav-link hover:text-amber-earth transition-colors py-2 focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none rounded">
                About
              </a>
            </li>
            <li>
              <a href="#contact" class="nav-link hover:text-amber-earth transition-colors py-2 focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none rounded">
                Contact
              </a>
            </li>
          </ul>

          <div class="h-5 w-px bg-rosy-granite/30" aria-hidden="true"></div>

          <!-- Availability & CTA -->
          <a
            href="#contact"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-earth text-shadow-grey hover:bg-bubble-gum-pink hover:text-ghost-white transition-all text-xs font-mono font-bold tracking-wide shadow-md focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
            <span>Available For Hire</span>
          </a>
        </nav>

        <!-- Mobile Menu Hamburger Button -->
        <button
          type="button"
          id="mobile-menu-btn"
          class="md:hidden p-2.5 rounded-lg text-ghost-white border border-rosy-granite/30 hover:border-amber-earth hover:text-amber-earth transition-colors focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
          aria-expanded="false"
          aria-controls="mobile-nav-drawer"
          aria-label="Open navigation menu"
        >
          ${getIcon('menu', 'w-6 h-6')}
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div
        id="mobile-nav-drawer"
        class="mobile-nav-drawer md:hidden fixed inset-0 z-50 bg-shadow-grey backdrop-blur-lg flex flex-col p-6 transition-transform duration-300 transform -translate-x-full border-r border-rosy-granite/20"
        aria-label="Mobile Navigation Menu"
        hidden
      >
        <div class="flex items-center justify-between pb-6 border-b border-rosy-granite/20">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-amber-earth flex items-center justify-center font-mono font-bold text-shadow-grey">
              FU
            </div>
            <span class="font-sans font-bold text-ghost-white text-base">
              ${profile.name}
            </span>
          </div>

          <button
            type="button"
            id="mobile-menu-close"
            class="p-2 rounded-lg text-rosy-granite hover:text-ghost-white border border-rosy-granite/30 focus-visible:ring-2 focus-visible:ring-bubble-gum-pink focus-visible:outline-none"
            aria-label="Close navigation menu"
          >
            ${getIcon('close', 'w-6 h-6')}
          </button>
        </div>

        <nav class="mt-8 flex-1">
          <ul class="flex flex-col space-y-4 text-lg font-sans font-medium text-ghost-white">
            <li>
              <a href="#projects" class="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-rosy-granite/15 hover:text-amber-earth transition-colors">
                Projects Showcase
              </a>
            </li>
            <li>
              <a href="#skills" class="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-rosy-granite/15 hover:text-amber-earth transition-colors">
                Architecture & Standards
              </a>
            </li>
            <li>
              <a href="#about" class="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-rosy-granite/15 hover:text-amber-earth transition-colors">
                Engineering Philosophy
              </a>
            </li>
            <li>
              <a href="#contact" class="mobile-nav-link block py-2 px-3 rounded-lg hover:bg-rosy-granite/15 hover:text-amber-earth transition-colors">
                Direct Contact
              </a>
            </li>
          </ul>
        </nav>

        <div class="pt-6 border-t border-rosy-granite/20 flex flex-col gap-3">
          <a
            href="#contact"
            class="mobile-nav-link flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-earth text-shadow-grey font-bold font-sans text-base shadow-lg"
          >
            <span>Discuss Contract / Project</span>
            ${getIcon('arrowRight', 'w-4 h-4')}
          </a>
          <span class="text-xs font-mono text-center text-rosy-granite">
            WCAG 2.2 AA & 90-100 Lighthouse Benchmark Target
          </span>
        </div>
      </div>
    </header>
  `;
};

export const initHeaderListeners = () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  let drawerCleanup = null;

  const openDrawer = () => {
    if (!drawer) return;
    drawer.removeAttribute('hidden');
    // Force reflow
    drawer.offsetHeight;
    drawer.classList.remove('-translate-x-full');
    menuBtn?.setAttribute('aria-expanded', 'true');
    drawerCleanup = trapFocus(drawer);
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('-translate-x-full');
    menuBtn?.setAttribute('aria-expanded', 'false');
    if (drawerCleanup) {
      drawerCleanup();
      drawerCleanup = null;
    }
    setTimeout(() => {
      drawer.setAttribute('hidden', '');
    }, 300);
  };

  menuBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  mobileLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.hasAttribute('hidden')) {
      closeDrawer();
    }
  });
};
