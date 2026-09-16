/**
 * Project Card Component
 * Renders semantic, accessible project cards with external client verification data.
 */

import { getIcon } from '../utils/icons.js';
import { getProjectVisualSvg } from '../utils/projectVisuals.js';

/**
 * Creates an accessible project card element string
 * @param {object} project
 * @returns {string} HTML string
 */
export const createProjectCard = (project) => {
  const kpisHtml = project.metrics?.kpis?.map((kpi) => `
    <div class="bg-shadow-grey/90 border border-rosy-granite/20 px-2.5 py-1.5 rounded-lg flex flex-col justify-center">
      <span class="text-2xs text-rosy-granite font-mono tracking-wider uppercase">${kpi.label}</span>
      <span class="text-sm font-bold font-mono text-amber-earth">${kpi.value}</span>
    </div>
  `).join('') || '';

  const techChipsHtml = project.technologies.slice(0, 4).map((tech) => `
    <span class="text-xs font-mono px-2.5 py-1 rounded-md bg-shadow-grey border border-rosy-granite/30 text-ghost-white/90">
      ${tech}
    </span>
  `).join('');

  const remainingTech = project.technologies.length - 4;
  const remainingTechChip = remainingTech > 0 ? `
    <span class="text-xs font-mono px-2 py-1 rounded-md bg-rosy-granite/20 text-ghost-white/70" title="${project.technologies.slice(4).join(', ')}">
      +${remainingTech}
    </span>
  ` : '';

  return `
    <article
      class="group bg-shadow-grey border border-rosy-granite/25 hover:border-amber-earth/60 transition-all duration-300 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between hover:shadow-amber-earth/5 hover:-translate-y-1"
      aria-labelledby="project-title-${project.id}"
      data-project-id="${project.id}"
      data-category="${project.category}"
    >
      <div>
        <!-- Preview Mockup Header -->
        <div class="relative overflow-hidden bg-shadow-grey border-b border-rosy-granite/20 h-48 w-full">
          ${project?.image
            ? `<img src=/src/${project?.image}></img>`
            : getProjectVisualSvg(project.id)
          }

          <!-- Category and Verification Badge -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-mono font-semibold bg-shadow-grey/95 border border-amber-earth/50 text-amber-earth backdrop-blur-sm shadow">
              ${project.categoryLabel}
            </span>
            ${project.verified ? `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-mono font-semibold bg-shadow-grey/95 border border-bubble-gum-pink/50 text-bubble-gum-pink backdrop-blur-sm shadow" title="Verified by external client audit">
                ${getIcon('checkCircle', 'w-3.5 h-3.5')}
                Verified
              </span>
            ` : ''}
          </div>
        </div>

        <div class="p-5">
          <!-- Client & Period -->
          <div class="flex items-center justify-between text-xs text-rosy-granite font-mono mb-2">
            <span>Client: <strong class="text-ghost-white font-normal">${project.client}</strong></span>
            <span>worked on ${project.year}</span>
          </div>

          <!-- Title -->
          <h3 id="project-title-${project.id}" class="text-xl font-bold font-sans text-ghost-white group-hover:text-amber-earth transition-colors mb-1">
            ${project.title}
          </h3>

          <p class="text-xs font-mono text-bubble-gum-pink mb-3">
            ${project.subtitle}
          </p>

          <!-- Summary -->
          <p class="text-sm text-ghost-white/80 line-clamp-3 mb-4 leading-relaxed font-sans">
            ${project.summary}
          </p>

          <!-- KPI metrics grid -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            ${kpisHtml}
          </div>

          <!-- Technologies -->
          <div class="flex flex-wrap items-center gap-1.5 mb-2" aria-label="Technologies used">
            ${techChipsHtml}
            ${remainingTechChip}
          </div>
        </div>
      </div>

      <!-- Action footer -->
      <div class="px-5 py-4 bg-shadow-grey/95 border-t border-rosy-granite/20 flex items-center justify-between gap-3">

        <div class="flex items-center gap-2">
          ${project.liveUrl ? `
            <a
              aria-label="Visit live deployment for ${project.title} (opens in new tab)"
              class="p-2 rounded-lg border border-rosy-granite/30 text-ghost-white/80 hover:text-bubble-gum-pink hover:border-bubble-gum-pink/50 transition-colors focus-visible:ring-2 focus-visible:ring-bubble-gum-pink focus-visible:outline-none"
              href="${project.liveUrl}"
              rel="noopener noreferrer"
              target="_blank"
              title="Visit project"
            >
              ${getIcon('external', 'w-4 h-4')}
            </a>
          ` : ''}

          ${project.repoUrl ? `
            <a
              href="${project.repoUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg border border-rosy-granite/30 text-ghost-white/80 hover:text-amber-earth hover:border-amber-earth/50 transition-colors focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
              aria-label="Inspect GitHub repository for ${project.title} (opens in new tab)"
            >
              ${getIcon('github', 'w-4 h-4')}
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `;
};
