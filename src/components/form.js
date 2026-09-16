/**
 * Semantic Form Component
 * Includes form accessible and semantic component.
 */

import { getIcon } from '../utils/icons.js';

export const createForm = () => {
  return `
  <form
    id="contact-form"
    class="bg-shadow-grey border border-rosy-granite/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5"
    novalidate
    aria-labelledby="contact-heading"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Name -->
      <div>
        <label for="contact-name" class="block text-xs font-mono uppercase tracking-wider text-ghost-white mb-2">
          Name <span class="text-bubble-gum-pink" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          autocomplete="name"
          placeholder="Jane Doe"
          class="w-full px-4 py-3 rounded-lg bg-shadow-grey/90 border border-rosy-granite/40 text-ghost-white placeholder-rosy-granite text-sm font-sans focus:border-amber-earth focus:ring-1 focus:ring-amber-earth focus:outline-none transition-colors"
        />
        <span id="name-error" class="hidden text-2xs font-mono text-bubble-gum-pink mt-1.5 block" role="alert"></span>
      </div>

      <!-- Email -->
      <div>
        <label for="contact-email" class="block text-xs font-mono uppercase tracking-wider text-ghost-white mb-2">
          Email Address <span class="text-bubble-gum-pink" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          autocomplete="email"
          placeholder="jane@company.com"
          class="w-full px-4 py-3 rounded-lg bg-shadow-grey/90 border border-rosy-granite/40 text-ghost-white placeholder-rosy-granite text-sm font-sans focus:border-amber-earth focus:ring-1 focus:ring-amber-earth focus:outline-none transition-colors"
        />
        <span id="email-error" class="hidden text-2xs font-mono text-bubble-gum-pink mt-1.5 block" role="alert"></span>
      </div>
    </div>

    <!-- Project Type Selection -->
    <div>
      <label for="contact-project-type" class="block text-xs font-mono uppercase tracking-wider text-ghost-white mb-2">
        Inquiry Nature
      </label>
      <select
        id="contact-project-type"
        name="projectType"
        class="w-full px-4 py-3 rounded-lg bg-shadow-grey/90 border border-rosy-granite/40 text-ghost-white text-sm font-sans focus:border-amber-earth focus:ring-1 focus:ring-amber-earth focus:outline-none transition-colors"
      >
        <option value="contract">Development Contract / Project</option>
        <option value="architecture">Architecture & Accessibility Audit</option>
        <option value="performance">Lighthouse & Core Web Vitals Optimization</option>
        <option value="other">General Verification Inquiry</option>
      </select>
    </div>

    <!-- Message -->
    <div>
      <label for="contact-message" class="block text-xs font-mono uppercase tracking-wider text-ghost-white mb-2">
        Project Details / Message <span class="text-bubble-gum-pink" aria-hidden="true">*</span>
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows="4"
        required
        placeholder="Outline your timeline, requirements, or architecture targets..."
        class="w-full px-4 py-3 rounded-lg bg-shadow-grey/90 border border-rosy-granite/40 text-ghost-white placeholder-rosy-granite text-sm font-sans focus:border-amber-earth focus:ring-1 focus:ring-amber-earth focus:outline-none transition-colors resize-y"
      ></textarea>
      <span id="message-error" class="hidden text-2xs font-mono text-bubble-gum-pink mt-1.5 block" role="alert"></span>
    </div>

    <!-- Form status feedback -->
    <div id="form-status" class="hidden p-3 rounded-lg text-xs font-mono" role="status"></div>

    <!-- Submit button -->
    <button
      type="submit"
      id="submit-btn"
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-earth text-shadow-grey font-bold font-sans text-sm hover:bg-bubble-gum-pink hover:text-ghost-white transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none cursor-pointer"
    >
      <span>Transmit Inquiry</span>
      ${getIcon('arrowRight', 'w-4 h-4')}
    </button>
  </form>
  `;
};
