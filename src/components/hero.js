/**
 * Hero Section Component
 * Inspired by bold typographic greeting and clear value statement.
 */

import { getIcon } from '../utils/icons.js';
import { t } from '../i18n.js';

export const createHero = (profile) => {
  const statsHtml = profile.stats.map((stat) => `
    <div class="p-4 rounded-xl bg-shadow-grey/80 border border-rosy-granite/25 hover:border-amber-earth/50 transition-colors shadow-sm">
      <div class="text-2xl sm:text-3xl font-bold font-mono text-amber-earth mb-1">${stat.value}</div>
      <div class="text-xs sm:text-sm font-semibold font-sans text-ghost-white mb-0.5">${stat.label}</div>
      <div class="text-2xs sm:text-xs font-mono text-rosy-granite">${stat.subtext}</div>
    </div>
  `).join('');
  const [heroPrefix, heroEmphasis, heroSuffix] = profile.hero;

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
              <span>${t('role')}</span>
            </div>

            <!-- Massive Headline -->
            <h1 id="hero-title" class="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-ghost-white leading-tight">
              ${`${heroPrefix}
              <span class="text-amber-earth underline decoration-bubble-gum-pink decoration-wavy decoration-2">${heroEmphasis}</span>
              ${heroSuffix}`}
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
                <span>${t('cta.work')}</span>
                ${getIcon('arrowRight', 'w-4 h-4')}
              </a>

              <a
                href="#contact"
                class="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-rosy-granite hover:text-ghost-white font-mono text-xs sm:text-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
              >
                <span>${t('cta.contact')}</span>
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
                <span>audit-manifest.json</span>
              </div>

              <div class="font-mono text-xs space-y-2.5 text-ghost-white/90">
                <div class="flex justify-between">
                  <span class="text-emerald-400">ROLE:</span>
                  <span class="text-ghost-white font-semibold">${t('role')}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-400">TECH_STACK:</span>
                  <span class="text-ghost-white font-semibold">HTML5, ES2026, Tailwind</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-400">CODE_STYLE:</span>
                  <span class="text-ghost-white font-semibold">Clean Code, SOLID, DRY, KISS</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-400">A11Y_TARGET:</span>
                  <span class="text-ghost-white font-semibold">WCAG 2.2 AA</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-400">LIGHTHOUSE:</span>
                  <span class="text-ghost-white font-bold">90+</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-400">CLS:</span>
                  <span class="text-ghost-white font-semibold">≤0.1</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-400">INP:</span>
                  <span class="text-ghost-white font-semibold">≤200 ms</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-emerald-400">LCP:</span>
                  <span class="text-ghost-white font-semibold">≤2.5 s</span>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-rosy-granite/20 flex items-center justify-between text-2xs font-mono text-rosy-granite">
                <span class="text-emerald-400">HOST:</span>
                <span class="text-ghost-white">GITHUB PAGES</span>
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
