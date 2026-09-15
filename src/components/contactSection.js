/**
 * Contact Section Component
 * Inspired by Carlos Rodriguez's direct "¡Hablemos!" section with accessible form validation.
 */

import { getIcon } from '../utils/icons.js';
import { showToast } from './toast.js';

export const createContactSection = (profile) => {
  const emailItem = profile.social.find((s) => s.icon === 'mail');
  const emailAddress = emailItem?.display || 'felipe.uliana@example.com';

  return `
    <section id="contact" class="py-20 border-b border-rosy-granite/20 relative" aria-labelledby="contact-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Column 1: Info & Quick Copy -->
          <div class="lg:col-span-5 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-earth/15 text-amber-earth border border-amber-earth/30">
              <span>Initiate Collaboration</span>
            </div>

            <h2 id="contact-heading" class="text-3xl sm:text-5xl font-bold font-sans text-ghost-white tracking-tight">
              ¡Hablemos!
            </h2>

            <p class="text-base text-ghost-white/80 font-sans leading-relaxed">
              Have an enterprise project, frontend architecture consultation, or high-impact contract in mind? Reach out directly or complete the verified inquiry form.
            </p>

            <!-- One-Click Copy Email Card -->
            <div class="p-4 rounded-xl bg-shadow-grey border border-rosy-granite/30 space-y-2">
              <span class="text-xs font-mono text-rosy-granite uppercase tracking-wider block">Direct Verified Email</span>
              <div class="flex items-center justify-between gap-3">
                <span id="contact-email-val" class="font-mono text-sm sm:text-base text-ghost-white font-semibold truncate">
                  ${emailAddress}
                </span>
                <button 
                  type="button" 
                  id="copy-email-btn"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-earth/20 hover:bg-amber-earth text-amber-earth hover:text-shadow-grey font-mono text-xs font-bold transition-all border border-amber-earth/40 focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none shrink-0"
                  aria-label="Copy email address ${emailAddress} to clipboard"
                >
                  ${getIcon('copy', 'w-3.5 h-3.5')}
                  <span id="copy-btn-text">Copy</span>
                </button>
              </div>
            </div>

            <!-- Social Verification Links -->
            <div class="pt-2 space-y-3">
              <span class="text-xs font-mono uppercase tracking-wider text-rosy-granite block">Verified Channels</span>
              <div class="flex items-center gap-3">
                <a 
                  href="https://github.com/felipeuliana" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-shadow-grey border border-rosy-granite/30 hover:border-amber-earth text-ghost-white hover:text-amber-earth text-sm font-sans font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-earth focus-visible:outline-none"
                  aria-label="Visit Felipe's GitHub Profile (opens in new tab)"
                >
                  ${getIcon('github', 'w-4 h-4')}
                  <span>GitHub</span>
                </a>

                <a 
                  href="https://linkedin.com/in/felipeuliana" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-shadow-grey border border-rosy-granite/30 hover:border-bubble-gum-pink text-ghost-white hover:text-bubble-gum-pink text-sm font-sans font-medium transition-colors focus-visible:ring-2 focus-visible:ring-bubble-gum-pink focus-visible:outline-none"
                  aria-label="Connect with Felipe on LinkedIn (opens in new tab)"
                >
                  ${getIcon('linkedin', 'w-4 h-4')}
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Column 2: Semantic Accessible Contact Form -->
          <div class="lg:col-span-7">
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
                  <option value="contract">Senior Frontend Contract / Project</option>
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
          </div>

        </div>

      </div>
    </section>
  `;
};

export const initContactListeners = () => {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('contact-email-val')?.textContent?.trim() || 'felipe.uliana@example.com';
  const copyBtnText = document.getElementById('copy-btn-text');

  copyBtn?.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = emailText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (copyBtnText) copyBtnText.textContent = 'Copied!';
      showToast('Email address copied to clipboard!', 'success');

      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Copy';
      }, 2500);
    } catch {
      showToast(`Copy failed. Email: ${emailText}`, 'info');
    }
  });

  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasErrors = false;

    // Reset error states
    [nameError, emailError, messageError].forEach((el) => {
      if (el) {
        el.classList.add('hidden');
        el.textContent = '';
      }
    });

    if (!nameInput.value.trim()) {
      hasErrors = true;
      nameError.textContent = 'Please enter your name.';
      nameError.classList.remove('hidden');
      nameInput.setAttribute('aria-invalid', 'true');
    } else {
      nameInput.removeAttribute('aria-invalid');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      hasErrors = true;
      emailError.textContent = 'Please enter a valid email address.';
      emailError.classList.remove('hidden');
      emailInput.setAttribute('aria-invalid', 'true');
    } else {
      emailInput.removeAttribute('aria-invalid');
    }

    if (!messageInput.value.trim()) {
      hasErrors = true;
      messageError.textContent = 'Please provide details for your inquiry.';
      messageError.classList.remove('hidden');
      messageInput.setAttribute('aria-invalid', 'true');
    } else {
      messageInput.removeAttribute('aria-invalid');
    }

    if (hasErrors) {
      showToast('Please correct the highlighted form fields.', 'error');
      return;
    }

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Transmit Inquiry</span> ${getIcon('arrowRight', 'w-4 h-4')}`;

      form.reset();
      showToast('Inquiry transmitted successfully! I will respond within 24 hours.', 'success', 5000);

      if (formStatus) {
        formStatus.className = 'p-4 rounded-xl bg-amber-earth/10 border border-amber-earth/40 text-amber-earth text-sm font-sans';
        formStatus.textContent = 'Thank you! Your message has been recorded. I will review your specifications and follow up directly.';
        formStatus.classList.remove('hidden');
      }
    }, 600);
  });
};
