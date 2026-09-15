/**
 * Hero Section Component
 * Inspired by Carlos Rodriguez's bold typographic greeting and clear value statement.
 */

import { getIcon } from '../utils/icons.js';

export const createHero = (profile) => {
  const statsHtml = profile.stats.map((stat) => `
    <div class="p-4 rounded-xl bg-shadow-grey/80 border border-rosy-granite/25 hover:border-amber-earth/50 transition-colors shadow-sm">
      <div class="text-2xl sm:text-3xl font-bold font-mono text-amber-earth mb-1">${stat.value}</div>
      <div class="text-xs sm:text-sm font-semibold font-sans text-ghost-white mb-0.5">${stat.label}</div>
      <div class="text-2xs sm:text-xs font-mono text-rosy-granite">${stat.subtext}</div>
    </div>
  `).join('');

  return `
    <section id="hero" class="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-rosy-granite/20" aria-labelledby="hero-title">
      <!-- Ambient Glow Decorator -->
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-amber-earth/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div class="absolute top-1/2 -right-40 w-96 h-96 bg-bubble-gum-pink/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: Typography & CTAs -->
          <div class="lg:col-span-8 space-y-6">
            <!-- Kicker Pill -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-amber-earth/10 border border-amber-earth/30 text-amber-earth shadow-sm">
              <span class="w-2 h-2 rounded-full bg-amber-earth animate-ping" aria-hidden="true"></span>
              <span>${profile.title}</span>
            </div>

            <!-- Massive Headline -->
            <h1 id="hero-title" class="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-ghost-white leading-tight">
              Engineering <span class="text-amber-earth underline decoration-bubble-gum-pink decoration-wavy decoration-2">resilient web experiences</span> with sub-second performance.
            </h1>

            <!-- Bio / Value Proposition -->
            <p class="text-base sm:text-lg text-ghost-white/80 leading-relaxed font-sans max-w-2xl">
              ${profile.bio}
            </p>

            <!-- Action Buttons -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="#projects" 
                class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-earth text-shadow-grey hover:bg-bubble-gum-pink hover:text-ghost-white font-sans font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-amber-earth/20 focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
              >
                <span>Explore Selected Work</span>
                ${getIcon('arrowRight', 'w-4 h-4')}
              </a>

              <a 
                href="#verification" 
                class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-shadow-grey border border-rosy-granite/40 hover:border-amber-earth text-ghost-white hover:text-amber-earth font-sans font-semibold text-sm sm:text-base transition-all focus-visible:ring-2 focus-visible:ring-rosy-granite focus-visible:outline-none"
              >
                ${getIcon('shield', 'w-4 h-4 text-bubble-gum-pink')}
                <span>Client Verification Reports</span>
              </a>

              <a 
                href="#contact" 
                class="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-rosy-granite hover:text-ghost-white font-mono text-xs sm:text-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
              >
                <span>Direct Contact</span>
                ${getIcon('arrowRight', 'w-3.5 h-3.5')}
              </a>
            </div>
          </div>

          <!-- Right Column: Verification Terminal Card -->
          <div class="lg:col-span-4">
            <div class="bg-shadow-grey border border-rosy-granite/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-rosy-granite/20 font-mono text-xs text-rosy-granite">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-bubble-gum-pink/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-amber-earth/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-rosy-granite/80 inline-block"></span>
                </div>
                <span>audit_manifest.json</span>
              </div>

              <div class="font-mono text-xs space-y-2.5 text-ghost-white/90">
                <div class="flex justify-between">
                  <span class="text-rosy-granite">ROLE:</span>
                  <span class="text-amber-earth font-semibold">Sr. Frontend Architect</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-rosy-granite">TECH_STACK:</span>
                  <span class="text-ghost-white">HTML5 • ES2026 • Tailwind</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-rosy-granite">A11Y_TARGET:</span>
                  <span class="text-bubble-gum-pink font-semibold">WCAG 2.2 AA (Axe Certified)</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-rosy-granite">CLS_BENCHMARK:</span>
                  <span class="text-emerald-400 font-semibold">0.000 (Zero Shift)</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-rosy-granite">LIGHTHOUSE:</span>
                  <span class="text-amber-earth font-bold">100 / 100 / 100 / 100</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-rosy-granite">CODE_STYLE:</span>
                  <span class="text-ghost-white">Clean Code JavaScript</span>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-rosy-granite/20 flex items-center justify-between text-2xs font-mono text-rosy-granite">
                <span>STATUS: VERIFIED READY</span>
                <span class="text-amber-earth">● GITHUB PAGES</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Metric KPI Cards Row -->
        <div class="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${statsHtml}
        </div>
      </div>
    </section>
  `;
};
