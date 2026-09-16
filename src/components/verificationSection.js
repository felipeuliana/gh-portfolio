/**
 * External Client Verification Hub Component
 * Explicitly fulfills the portfolio's primary goal: enabling external clients to verify credentials, code quality, and delivery metrics.
 */

import { getIcon } from '../utils/icons.js';

export const createVerificationSection = (verificationData) => {
  const auditsHtml = verificationData.audits.map((audit) => `
    <div class="p-5 rounded-xl bg-shadow-grey border border-rosy-granite/25 hover:border-amber-earth/50 transition-colors shadow">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-rosy-granite">${audit.metric}</span>
        <span class="inline-flex items-center gap-1 text-xs font-mono font-semibold text-amber-earth bg-amber-earth/10 px-2 py-0.5 rounded border border-amber-earth/30">
          ${getIcon('checkCircle', 'w-3 h-3')}
          ${audit.status}
        </span>
      </div>
      <div class="text-lg font-bold font-sans text-ghost-white mb-2">${audit.target}</div>
      <p class="text-xs text-ghost-white/75 font-sans leading-relaxed">${audit.criteria}</p>
    </div>
  `).join('');

  const testimonialsHtml = verificationData.testimonials.map((t) => `
    <blockquote class="p-6 rounded-xl bg-shadow-grey border border-rosy-granite/25 flex flex-col justify-between shadow">
      <div class="mb-4">
        <div class="flex items-center gap-1 text-amber-earth mb-3" aria-hidden="true">
          <span class="text-xl leading-none">“</span>
        </div>
        <p class="text-sm sm:text-base italic text-ghost-white/90 font-sans leading-relaxed">
          ${t.quote}
        </p>
      </div>

      <footer class="pt-4 border-t border-rosy-granite/20 flex items-center justify-between">
        <div>
          <cite class="not-italic font-bold font-sans text-ghost-white block text-sm">${t.client}</cite>
          <span class="text-xs font-mono text-rosy-granite block">${t.role}, ${t.company}</span>
        </div>
        <div class="text-right">
          <span class="text-2xs font-mono text-bubble-gum-pink block">Project: ${t.project}</span>
          <span class="text-2xs font-mono text-rosy-granite block">${t.verifiedDate}</span>
        </div>
      </footer>
    </blockquote>
  `).join('');

  return `
    <section id="verification" class="py-20 border-b border-rosy-granite/20 relative" aria-labelledby="verification-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-earth/15 text-amber-earth border border-amber-earth/30 mb-3">
            ${getIcon('shield', 'w-3.5 h-3.5')}
            <span>Verified Delivery</span>
          </div>
          <h2 id="verification-heading" class="text-3xl sm:text-4xl font-bold font-sans text-ghost-white mb-3">
            ${verificationData.heading}
          </h2>
          <p class="text-base text-ghost-white/80 font-sans leading-relaxed">
            ${verificationData.subheading}
          </p>
        </div>

        <!-- Audit Standards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          ${auditsHtml}
        </div>

        <!-- Verified Client Endorsements -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold font-sans text-ghost-white">
              Direct Client Testimonials
            </h3>
            <span class="text-xs font-mono text-rosy-granite">
              All endorsements verified for external review
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${testimonialsHtml}
          </div>
        </div>

      </div>
    </section>
  `;
};
