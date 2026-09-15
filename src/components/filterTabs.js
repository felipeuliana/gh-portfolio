/**
 * Accessible Project Filter Tabs Component
 * WAI-ARIA Tablist Pattern with arrow key navigation
 */

import { announce } from '../utils/a11y.js';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'architecture', label: 'Frontend Architecture' },
  { id: 'ecommerce', label: 'E-Commerce & Scale' },
  { id: 'performance', label: 'Performance & Systems' }
];

export const createFilterTabs = (activeCategory = 'all', totalCount = 6) => {
  const tabsHtml = CATEGORIES.map((cat) => {
    const isActive = cat.id === activeCategory;
    return `
      <button 
        type="button" 
        role="tab" 
        id="tab-${cat.id}"
        aria-selected="${isActive ? 'true' : 'false'}"
        aria-controls="projects-grid"
        tabindex="${isActive ? '0' : '-1'}"
        data-filter="${cat.id}"
        class="filter-tab px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none whitespace-nowrap ${
          isActive 
            ? 'bg-amber-earth text-shadow-grey font-bold shadow-md' 
            : 'bg-shadow-grey/70 text-ghost-white/80 border border-rosy-granite/30 hover:border-amber-earth/60 hover:text-amber-earth'
        }"
      >
        ${cat.label}
      </button>
    `;
  }).join('');

  return `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div 
        role="tablist" 
        aria-label="Filter projects by category" 
        class="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none"
      >
        ${tabsHtml}
      </div>

      <!-- Live project count badge -->
      <div 
        id="projects-count-badge" 
        class="text-xs font-mono text-rosy-granite flex items-center gap-1.5 self-end sm:self-auto shrink-0" 
        aria-live="polite"
      >
        <span>Showing</span>
        <strong id="current-project-count" class="text-amber-earth font-bold">${totalCount}</strong>
        <span>projects</span>
      </div>
    </div>
  `;
};

/**
 * Initializes accessible keyboard navigation and click events on filter tabs
 * @param {(category: string) => void} onFilterChange 
 */
export const initFilterTabs = (onFilterChange) => {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      selectTab(tab);
    });

    tab.addEventListener('keydown', (event) => {
      let targetIndex = null;

      if (event.key === 'ArrowRight') {
        targetIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        targetIndex = 0;
      } else if (event.key === 'End') {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex !== null) {
        event.preventDefault();
        tabs[targetIndex].focus();
        selectTab(tabs[targetIndex]);
      }
    });
  });

  function selectTab(selectedTab) {
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      tab.className = 'filter-tab px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none whitespace-nowrap bg-shadow-grey/70 text-ghost-white/80 border border-rosy-granite/30 hover:border-amber-earth/60 hover:text-amber-earth';
    });

    selectedTab.setAttribute('aria-selected', 'true');
    selectedTab.setAttribute('tabindex', '0');
    selectedTab.className = 'filter-tab px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none whitespace-nowrap bg-amber-earth text-shadow-grey font-bold shadow-md';

    const category = selectedTab.dataset.filter;
    const categoryName = selectedTab.textContent.trim();
    announce(`Filtering by ${categoryName}`);
    onFilterChange(category);
  }
};
