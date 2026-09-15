/**
 * Technical Architecture & Skills Section Component
 */

import { getIcon } from '../utils/icons.js';

export const createSkillsSection = (skills) => {
  const categoriesHtml = skills.map((cat) => {
    const skillsList = cat.skills.map((skill) => `
      <li class="flex items-center justify-between p-2.5 rounded-lg bg-shadow-grey/90 border border-rosy-granite/15 hover:border-amber-earth/40 transition-colors">
        <div class="flex flex-col">
          <span class="text-sm font-sans font-semibold text-ghost-white">${skill.name}</span>
          <span class="text-2xs font-mono text-rosy-granite">${skill.highlight}</span>
        </div>
        <span class="px-2 py-0.5 rounded text-2xs font-mono font-semibold bg-amber-earth/10 text-amber-earth border border-amber-earth/30">
          ${skill.level}
        </span>
      </li>
    `).join('');

    return `
      <div class="bg-shadow-grey border border-rosy-granite/25 rounded-xl p-6 shadow-md flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-amber-earth/15 text-amber-earth flex items-center justify-center">
              ${getIcon(cat.icon, 'w-5 h-5')}
            </div>
            <h3 class="text-lg font-bold font-sans text-ghost-white">
              ${cat.category}
            </h3>
          </div>

          <p class="text-xs text-ghost-white/70 leading-relaxed font-sans mb-5">
            ${cat.description}
          </p>
        </div>

        <ul class="space-y-2" aria-label="${cat.category} competencies">
          ${skillsList}
        </ul>
      </div>
    `;
  }).join('');

  return `
    <section id="skills" class="py-20 border-b border-rosy-granite/20 bg-shadow-grey/50" aria-labelledby="skills-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-bubble-gum-pink/15 text-bubble-gum-pink border border-bubble-gum-pink/30 mb-3">
            <span>Engineering Discipline</span>
          </div>
          <h2 id="skills-heading" class="text-3xl sm:text-4xl font-bold font-sans text-ghost-white mb-3">
            Core Architecture & Web Standards
          </h2>
          <p class="text-base text-ghost-white/80 font-sans leading-relaxed">
            Every application is architected around WCAG/AA accessibility, predictable modern JavaScript clean code, responsive layouts across all device viewports, and sub-second performance.
          </p>
        </div>

        <!-- Skills Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${categoriesHtml}
        </div>

        <!-- Architecture Principles Banner -->
        <div class="mt-12 p-6 rounded-2xl bg-shadow-grey border border-amber-earth/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg">
          <div class="space-y-1">
            <h4 class="text-base font-bold font-sans text-amber-earth">Clean Code & Zero-Bloat Mandate</h4>
            <p class="text-xs sm:text-sm text-ghost-white/80 font-sans">
              No heavy frameworks where semantic HTML5 & modern ES2026 modules deliver superior performance and longevity.
            </p>
          </div>
          <a 
            href="#projects" 
            class="px-5 py-2.5 rounded-lg bg-amber-earth text-shadow-grey font-bold font-sans text-xs sm:text-sm hover:bg-bubble-gum-pink hover:text-ghost-white transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
          >
            Review Architected Projects
          </a>
        </div>

      </div>
    </section>
  `;
};
