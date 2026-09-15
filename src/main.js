/**
 * Portfolio Application Entry Point (ES2026)
 * Single Page Architecture for External Client Verification
 */

import { dataService } from './services/dataService.js';
import { createHeader, initHeaderListeners } from './components/header.js';
import { createHero } from './components/hero.js';
import { createFilterTabs, initFilterTabs } from './components/filterTabs.js';
import { createProjectCard } from './components/projectCard.js';
import { renderProjectSkeletons } from './components/skeleton.js';
import { initProjectModal, openProjectModal } from './components/projectModal.js';
import { createSkillsSection } from './components/skillsSection.js';
import { createVerificationSection } from './components/verificationSection.js';
import { createAboutSection } from './components/aboutSection.js';
import { createContactSection, initContactListeners } from './components/contactSection.js';
import { createFooter, initFooterListeners } from './components/footer.js';
import { announce } from './utils/a11y.js';

let activeCategory = 'all';

/**
 * Initializes and mounts the single page portfolio
 */
async function initPortfolio() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Retrieve initial datasets
  const [profile, skills, verificationData] = await Promise.all([
    dataService.getProfile(),
    dataService.getSkills(),
    dataService.getVerificationData()
  ]);

  // Construct semantic document structure
  appContainer.innerHTML = `
    ${createHeader(profile)}
    
    <main id="main-content" class="flex-1 focus:outline-none" tabindex="-1">
      ${createHero(profile)}
      
      <!-- Work / Projects Section -->
      <section id="projects" class="py-20 border-b border-rosy-granite/20" aria-labelledby="projects-heading">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Section Header -->
          <div class="max-w-3xl mb-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-earth/15 text-amber-earth border border-amber-earth/30 mb-3">
              <span>Client Showcase</span>
            </div>
            <h2 id="projects-heading" class="text-3xl sm:text-4xl font-bold font-sans text-ghost-white mb-3">
              Selected Web Applications & Systems
            </h2>
            <p class="text-base text-ghost-white/80 font-sans leading-relaxed">
              Explore enterprise projects architected for sub-second performance, strict WCAG 2.2 AA accessibility, zero cumulative layout shift, and resilient modern JavaScript.
            </p>
          </div>

          <!-- Accessible Filter Tabs Container -->
          <div id="filter-tabs-container">
            ${createFilterTabs(activeCategory, 6)}
          </div>

          <!-- Projects Grid (Loading Skeletons render here first) -->
          <div 
            id="projects-grid" 
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            role="region" 
            aria-live="polite" 
            aria-busy="true"
            aria-label="Projects list"
          ></div>

        </div>
      </section>

      ${createSkillsSection(skills)}
      ${createVerificationSection(verificationData)}
      ${createAboutSection(profile)}
      ${createContactSection(profile)}
    </main>

    ${createFooter(profile)}
  `;

  // Initialize interactive component listeners
  initHeaderListeners();
  initProjectModal();
  initContactListeners();
  initFooterListeners();

  // Setup Projects Grid with loading skeletons first
  const projectsGrid = document.getElementById('projects-grid');
  renderProjectSkeletons(projectsGrid, 6);

  // Load initial projects
  await loadAndRenderProjects(activeCategory);

  // Initialize filter tab switching
  initFilterTabs((newCategory) => {
    activeCategory = newCategory;
    loadAndRenderProjects(newCategory);
  });

  // Setup event delegation for project card buttons
  setupProjectCardInteractions();

  // Setup intersection observer for active navigation links
  setupScrollSpy();
}

/**
 * Loads projects data and smoothly updates the DOM
 * @param {string} category 
 */
async function loadAndRenderProjects(category) {
  const projectsGrid = document.getElementById('projects-grid');
  const countBadge = document.getElementById('current-project-count');
  if (!projectsGrid) return;

  // Clean loading skeletons while fetching data from fixtures
  renderProjectSkeletons(projectsGrid, category === 'all' ? 6 : 3);

  try {
    const projects = await dataService.getProjects(category, 300);

    if (projects.length === 0) {
      projectsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-rosy-granite font-mono">
          <p class="text-base text-ghost-white mb-1">No projects found in this category.</p>
          <p class="text-xs">Please select another category filter above.</p>
        </div>
      `;
    } else {
      projectsGrid.innerHTML = projects.map((project) => createProjectCard(project)).join('');
    }

    projectsGrid.setAttribute('aria-busy', 'false');

    if (countBadge) {
      countBadge.textContent = String(projects.length);
    }

    announce(`Showing ${projects.length} ${category === 'all' ? '' : category} projects`);
  } catch (error) {
    console.error('Failed to load projects:', error);
    projectsGrid.innerHTML = `
      <div class="col-span-full p-8 rounded-xl bg-bubble-gum-pink/10 border border-bubble-gum-pink/40 text-center font-mono text-sm text-ghost-white">
        Failed to load project fixtures. Please refresh or check the network.
      </div>
    `;
    projectsGrid.setAttribute('aria-busy', 'false');
  }
}

/**
 * Event delegation for project card actions
 */
function setupProjectCardInteractions() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  projectsGrid.addEventListener('click', async (event) => {
    const detailButton = event.target.closest('[data-action="view-details"]');
    if (!detailButton) return;

    const projectId = detailButton.dataset.projectId;
    if (!projectId) return;

    const project = await dataService.getProjectById(projectId);
    if (project) {
      openProjectModal(project, detailButton);
    }
  });
}

/**
 * Sets up an accessible scroll spy updating desktop active navigation links
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
              link.classList.add('text-amber-earth', 'font-bold');
              link.classList.remove('text-ghost-white/80');
              link.setAttribute('aria-current', 'location');
            } else {
              link.classList.remove('text-amber-earth', 'font-bold');
              link.classList.add('text-ghost-white/80');
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px'
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
