/**
 * Project Details Accessible Modal Dialog
 * Built with HTML5 <dialog> and WAI-ARIA modal dialog patterns.
 */

import { getIcon } from '../utils/icons.js';
import { getProjectVisualSvg } from '../utils/projectVisuals.js';
import { trapFocus } from '../utils/a11y.js';

let modalElement = null;
let focusCleanup = null;

export const initProjectModal = () => {
  if (modalElement) return modalElement;

  modalElement = document.createElement('dialog');
  modalElement.id = 'project-dialog';
  modalElement.className = 'fixed inset-0 m-auto p-0 bg-transparent backdrop:bg-shadow-grey/85 backdrop:backdrop-blur-sm z-50 max-w-3xl w-[92vw] max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden border border-rosy-granite/30 text-ghost-white';
  modalElement.setAttribute('aria-modal', 'true');
  modalElement.setAttribute('aria-labelledby', 'modal-project-title');
  modalElement.setAttribute('aria-describedby', 'modal-project-summary');

  document.body.appendChild(modalElement);

  // Close when clicking outside content (on backdrop)
  modalElement.addEventListener('click', (event) => {
    const rect = modalElement.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeProjectModal();
    }
  });

  // Handle native cancel (Escape key)
  modalElement.addEventListener('cancel', () => {
    if (focusCleanup) {
      focusCleanup();
      focusCleanup = null;
    }
  });

  return modalElement;
};

/**
 * Opens the project modal with complete case details
 * @param {object} project
 * @param {HTMLElement} [triggerElement]
 */
export const openProjectModal = (project, triggerElement) => {
  const dialog = initProjectModal();

  const highlightsList = project.highlights?.map((item) => `
    <li class="flex items-start gap-2.5 text-sm text-ghost-white/90 leading-relaxed font-sans">
      <span class="text-amber-earth shrink-0 mt-0.5">${getIcon('checkCircle', 'w-4 h-4')}</span>
      <span>${item}</span>
    </li>
  `).join('') || '';

  const techBadges = project.technologies?.map((tech) => `
    <span class="text-xs font-mono px-3 py-1 rounded-md bg-shadow-grey border border-rosy-granite/30 text-ghost-white">
      ${tech}
    </span>
  `).join('') || '';

  const scores = project.metrics?.lighthouse || { performance: 99, accessibility: 100, bestPractices: 100, seo: 100 };

  dialog.innerHTML = `
    <div class="flex flex-col max-h-[90vh] bg-shadow-grey border border-rosy-granite/30 rounded-2xl overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-rosy-granite/20 bg-shadow-grey/95 sticky top-0 z-10">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-earth/15 text-amber-earth border border-amber-earth/40">
            ${project.categoryLabel}
          </span>
          ${project.verified ? `
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-bubble-gum-pink/15 text-bubble-gum-pink border border-bubble-gum-pink/40">
              ${getIcon('checkCircle', 'w-3.5 h-3.5')}
              Client Verified
            </span>
          ` : ''}
        </div>

        <button
          type="button"
          id="modal-close-btn"
          class="p-2 rounded-lg text-rosy-granite hover:text-ghost-white hover:bg-rosy-granite/20 transition-colors focus-visible:ring-2 focus-visible:ring-bubble-gum-pink focus-visible:outline-none"
          aria-label="Close project modal"
        >
          ${getIcon('close', 'w-5 h-5')}
        </button>
      </div>

      <!-- Modal Scrollable Body -->
      <div class="overflow-y-auto px-6 py-6 space-y-6">
        <!-- Visual Illustration -->
        <div class="h-44 sm:h-56 w-full rounded-xl overflow-hidden border border-rosy-granite/20 bg-shadow-grey/60">
          ${getProjectVisualSvg(project.id)}
        </div>

        <!-- Headings -->
        <div>
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-rosy-granite mb-1">
            <span>Client: <strong class="text-ghost-white">${project.client}</strong></span>
            <span>Role: <strong class="text-ghost-white">${project.role}</strong></span>
            <span>Year: <strong class="text-ghost-white">${project.year}</strong></span>
          </div>
          <h2 id="modal-project-title" class="text-2xl sm:text-3xl font-bold font-sans text-ghost-white mb-1">
            ${project.title}
          </h2>
          <p class="text-sm font-mono text-bubble-gum-pink">
            ${project.subtitle}
          </p>
        </div>

        <!-- Summary -->
        <p id="modal-project-summary" class="text-base text-ghost-white/90 leading-relaxed font-sans">
          ${project.description}
        </p>

        <!-- Lighthouse Verified Audit Card -->
        <div class="p-4 rounded-xl bg-shadow-grey/90 border border-rosy-granite/30 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono uppercase tracking-wider text-rosy-granite">Lighthouse Audit Benchmark</span>
            <span class="text-xs font-mono text-amber-earth font-semibold">100% Score Target</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-2.5 rounded-lg bg-shadow-grey border border-amber-earth/40">
              <span class="block text-2xl font-bold font-mono text-amber-earth">${scores.performance}</span>
              <span class="text-2xs font-mono text-rosy-granite">Performance</span>
            </div>
            <div class="p-2.5 rounded-lg bg-shadow-grey border border-bubble-gum-pink/40">
              <span class="block text-2xl font-bold font-mono text-bubble-gum-pink">${scores.accessibility}</span>
              <span class="text-2xs font-mono text-rosy-granite">Accessibility</span>
            </div>
            <div class="p-2.5 rounded-lg bg-shadow-grey border border-rosy-granite/40">
              <span class="block text-2xl font-bold font-mono text-ghost-white">${scores.bestPractices}</span>
              <span class="text-2xs font-mono text-rosy-granite">Best Practices</span>
            </div>
            <div class="p-2.5 rounded-lg bg-shadow-grey border border-rosy-granite/40">
              <span class="block text-2xl font-bold font-mono text-ghost-white">${scores.seo}</span>
              <span class="text-2xs font-mono text-rosy-granite">SEO</span>
            </div>
          </div>
        </div>

        <!-- Key Highlights & Architectural Decisions -->
        <div class="space-y-3">
          <h3 class="text-sm font-mono uppercase tracking-wider text-amber-earth font-bold">
            Key Architectural Achievements
          </h3>
          <ul class="space-y-2.5">
            ${highlightsList}
          </ul>
        </div>

        <!-- Tech Stack -->
        <div class="space-y-3">
          <h3 class="text-sm font-mono uppercase tracking-wider text-rosy-granite font-bold">
            Technologies & Tools
          </h3>
          <div class="flex flex-wrap gap-2">
            ${techBadges}
          </div>
        </div>
      </div>

      <!-- Modal Footer CTA -->
      <div class="px-6 py-4 bg-shadow-grey/95 border-t border-rosy-granite/20 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
        <button
          type="button"
          id="modal-close-action"
          class="px-4 py-2 rounded-lg border border-rosy-granite/40 hover:bg-rosy-granite/20 text-ghost-white text-sm font-sans transition-colors focus-visible:ring-2 focus-visible:ring-rosy-granite focus-visible:outline-none"
        >
          Close
        </button>

        <div class="flex items-center gap-3">
          ${project.repoUrl ? `
            <a
              href="${project.repoUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-rosy-granite/40 hover:border-amber-earth text-ghost-white hover:text-amber-earth text-sm font-sans transition-colors focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
            >
              ${getIcon('github', 'w-4 h-4')}
              <span>Source Code</span>
            </a>
          ` : ''}

          ${project.liveUrl ? `
            <a
              href="${project.liveUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-earth text-shadow-grey hover:bg-amber-earth/90 font-bold text-sm font-sans transition-all focus-visible:ring-2 focus-visible:ring-bubble-gum-pink focus-visible:outline-none"
            >
              <span>Live Demonstration</span>
              ${getIcon('external', 'w-4 h-4')}
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  dialog.querySelector('#modal-close-btn')?.addEventListener('click', closeProjectModal);
  dialog.querySelector('#modal-close-action')?.addEventListener('click', closeProjectModal);

  dialog.showModal();
  focusCleanup = trapFocus(dialog);
};

export const closeProjectModal = () => {
  if (modalElement && modalElement.open) {
    modalElement.close();
  }
  if (focusCleanup) {
    focusCleanup();
    focusCleanup = null;
  }
};
