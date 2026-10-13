/**
 * About Section Component
 * Inspired by candid and authentic personal statement.
 */

import { getIcon } from '../utils/icons.js';
import { t } from '../i18n.js';

export const createAboutSection = (profile) => {
  return `
    <section id="about" class="py-20 border-b border-rosy-granite/20 bg-shadow-grey/40" aria-labelledby="about-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-top">

          <!-- Column 1: Narrative -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-bubble-gum-pink/15 text-bubble-gum-pink border border-bubble-gum-pink/30">
              <span>${t('sections.about.kicker')}</span>
            </div>

            <h2 id="about-heading" class="text-3xl sm:text-4xl font-bold font-sans text-ghost-white leading-tight">
              ${t('sections.about.title')}
            </h2>

            <div class="space-y-4 text-base text-ghost-white/80 font-sans leading-relaxed">
              ${t('sections.about.description')}
            </div>

          </div>

          <!-- Column 2: Code Manifesto Card -->
          <div class="lg:col-span-5">
            <div class="bg-shadow-grey border border-rosy-granite/30 rounded-2xl p-6 shadow-2xl relative">
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-rosy-granite/20 font-mono text-xs text-rosy-granite">
                <span>engineering-manifesto.js</span>
              </div>

              <pre class="font-mono text-xs sm:text-sm text-ghost-white/90 overflow-x-auto leading-relaxed"><code><span class="text-rosy-granite">${profile.skills.comment}</span>
<span class="text-bubble-gum-pink">export const</span> <span class="text-amber-earth">${profile.skills.functionName}</span> = {
  <span class="text-ghost-white">accessibility</span>: <span class="text-amber-earth">'WCAG_2.2_AA'</span>,
  <span class="text-ghost-white">behaviour</span>: <span class="text-amber-earth">'MODERN_JAVASCRIPT'</span>,
  <span class="text-ghost-white">codeStyle</span>: [
    <span class="text-amber-earth">'CLEAN_CODE',</span>
    <span class="text-amber-earth">'DRY',</span>
    <span class="text-amber-earth">'KISS',</span>
    <span class="text-amber-earth">'MOBILE_FIRST',</span>
    <span class="text-amber-earth">'RESPONSIVE',</span>
    <span class="text-amber-earth">'SOLID'</span>
  ],
  <span class="text-ghost-white">performance</span>: {
    <span class="text-ghost-white">cls</span>: <span class="text-bubble-gum-pink">0.250</span>,
    <span class="text-ghost-white">fcp</span>: <span class="text-bubble-gum-pink">0.100</span>,
    <span class="text-ghost-white">lcp</span>: <span class="text-bubble-gum-pink">0.250</span>,
    <span class="text-ghost-white">score</span>: <span class="text-bubble-gum-pink">100</span>,
    <span class="text-ghost-white">si</span>: <span class="text-bubble-gum-pink">0.100</span>,
    <span class="text-ghost-white">tbt</span>: <span class="text-bubble-gum-pink">0.300</span>
  },
  <span class="text-ghost-white">stack</span>: {
    <span class="text-ghost-white">frontend</span>: [
      <span class="text-ghost-white">'astro.js'</span>,
      <span class="text-ghost-white">'auth.js'</span>,
      <span class="text-ghost-white">'css-in-js'</span>,
      <span class="text-ghost-white">'materialUI'</span>,
      <span class="text-ghost-white">'mobx'</span>,
      <span class="text-ghost-white">'nanostores'</span>,
      <span class="text-ghost-white">'next.js'</span>,
      <span class="text-ghost-white">'react.js'</span>,
      <span class="text-ghost-white">'reactQuery'</span>,
      <span class="text-ghost-white">'redux'</span>,
      <span class="text-ghost-white">'typescript'</span>,
      <span class="text-ghost-white">'tailwind.css'</span>
    ],
    <span class="text-ghost-white">backend</span>: [
      <span class="text-ghost-white">'express.js'</span>,
      <span class="text-ghost-white">'mongoDB'</span>,
      <span class="text-ghost-white">'node.js'</span>,
      <span class="text-ghost-white">'postgresSql'</span>,
      <span class="text-ghost-white">'sql'</span>
    ],
    <span class="text-ghost-white">test</span>: [
      <span class="text-ghost-white">'axe'</span>,
      <span class="text-ghost-white">'cypress'</span>,
      <span class="text-ghost-white">'jest'</span>,
      <span class="text-ghost-white">'playwright'</span>,
      <span class="text-ghost-white">'testing library'</span>,
      <span class="text-ghost-white">'vitest'</span>
    ],
    <span class="text-ghost-white">environment</span>: [
      <span class="text-ghost-white">'ci-cd'</span>,
      <span class="text-ghost-white">'containers'</span>,
      <span class="text-ghost-white">'docker'</span>
    ],
  },
  <span class="text-ghost-white">semantics</span>: <span class="text-amber-earth">'HTML_LIVING_STANDARD'</span>,
  <span class="text-ghost-white">styles</span>: <span class="text-amber-earth">'CSS_BEST_PRACTICES'</span>
};</code></pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
};
