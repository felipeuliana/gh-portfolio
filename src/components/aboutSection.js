/**
 * About Section Component
 * Inspired by Carlos Rodriguez's candid and authentic personal statement.
 */

import { getIcon } from '../utils/icons.js';

export const createAboutSection = (profile) => {
  return `
    <section id="about" class="py-20 border-b border-rosy-granite/20 bg-shadow-grey/40" aria-labelledby="about-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Column 1: Narrative -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-bubble-gum-pink/15 text-bubble-gum-pink border border-bubble-gum-pink/30">
              <span>Engineering Philosophy</span>
            </div>

            <h2 id="about-heading" class="text-3xl sm:text-4xl font-bold font-sans text-ghost-white leading-tight">
              A decade of crafting web systems with passion, precision, and zero fluff.
            </h2>

            <div class="space-y-4 text-base text-ghost-white/80 font-sans leading-relaxed">
              <p>
                Like the artisanal precision seen across dedicated craftspeople, frontend engineering requires an unwavering commitment to detail. For over 10 years, I have architected web platforms across enterprise fintech, high-volume e-commerce, and distributed cloud applications.
              </p>
              <p>
                My philosophy is straightforward: prioritize <strong class="text-ghost-white font-semibold">semantic HTML</strong> for unbreakable foundations, <strong class="text-ghost-white font-semibold">WCAG 2.2 AA accessibility</strong> so software is inclusive by default, and <strong class="text-ghost-white font-semibold">clean ES2026 JavaScript</strong> without bloated abstraction layers.
              </p>
              <p>
                Whether building a multi-tenant real-time data visualizer or designing a high-velocity component library, my goal is always the same: delivering verifiable, sustainable, sub-second web solutions for clients worldwide.
              </p>
            </div>

            <!-- Verification points -->
            <div class="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="flex items-center gap-2.5 text-sm font-mono text-ghost-white">
                <span class="text-amber-earth">${getIcon('checkCircle', 'w-4 h-4')}</span>
                <span>Mobile-First Architecture (< 480px)</span>
              </div>
              <div class="flex items-center gap-2.5 text-sm font-mono text-ghost-white">
                <span class="text-amber-earth">${getIcon('checkCircle', 'w-4 h-4')}</span>
                <span>WCAG 2.2 AA Accessibility Certified</span>
              </div>
              <div class="flex items-center gap-2.5 text-sm font-mono text-ghost-white">
                <span class="text-amber-earth">${getIcon('checkCircle', 'w-4 h-4')}</span>
                <span>Sub-Second LCP & Zero CLS</span>
              </div>
              <div class="flex items-center gap-2.5 text-sm font-mono text-ghost-white">
                <span class="text-amber-earth">${getIcon('checkCircle', 'w-4 h-4')}</span>
                <span>ES2026 Clean Code JavaScript</span>
              </div>
            </div>
          </div>

          <!-- Column 2: Code Manifesto Card -->
          <div class="lg:col-span-5">
            <div class="bg-shadow-grey border border-rosy-granite/30 rounded-2xl p-6 shadow-2xl relative">
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-rosy-granite/20 font-mono text-xs text-rosy-granite">
                <span>frontend_manifesto.js</span>
                <span class="text-bubble-gum-pink font-semibold">ES2026</span>
              </div>

              <pre class="font-mono text-xs sm:text-sm text-ghost-white/90 overflow-x-auto leading-relaxed"><code><span class="text-rosy-granite">// Principles that guide every project:</span>
<span class="text-bubble-gum-pink">export const</span> <span class="text-amber-earth">ENGINEERING_STANDARDS</span> = {
  <span class="text-ghost-white">accessibility</span>: <span class="text-amber-earth">'WCAG_2_2_AA'</span>,
  <span class="text-ghost-white">performance</span>: {
    <span class="text-ghost-white">lighthouseTarget</span>: <span class="text-bubble-gum-pink">100</span>,
    <span class="text-ghost-white">clsTarget</span>: <span class="text-bubble-gum-pink">0.000</span>,
    <span class="text-ghost-white">skeletonScreens</span>: <span class="text-bubble-gum-pink">true</span>
  },
  <span class="text-ghost-white">semantics</span>: <span class="text-amber-earth">'HTML5_LIVING_STANDARD'</span>,
  <span class="text-ghost-white">codeStyle</span>: <span class="text-amber-earth">'CLEAN_CODE_JS'</span>,
  <span class="text-ghost-white">responsive</span>: {
    <span class="text-ghost-white">mobile</span>: <span class="text-amber-earth">'< 480px'</span>,
    <span class="text-ghost-white">tablet</span>: <span class="text-amber-earth">'< 768px'</span>,
    <span class="text-ghost-white">desktop</span>: <span class="text-amber-earth">'< 1366px'</span>
  }
};</code></pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
};
