/**
 * Skeleton Loader Component
 * Implements clean loading skeletons for project cards without placeholder text.
 */

/**
 * Generates an accessible loading skeleton card matching project card geometry
 * @returns {string} HTML string
 */
export const createProjectSkeleton = () => {
  return `
    <article class="bg-shadow-grey/80 border border-rosy-granite/20 rounded-xl overflow-hidden p-5 flex flex-col justify-between shadow-lg relative" role="status" aria-busy="true" aria-label="Loading project details...">
      <div>
        <!-- Visual Mockup Skeleton -->
        <div class="skeleton-box w-full h-48 mb-4 rounded-lg bg-rosy-granite/15 flex items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-rosy-granite/25"></div>
        </div>

        <!-- Meta pill skeleton -->
        <div class="flex items-center gap-2 mb-3">
          <div class="skeleton-box h-5 w-24 rounded-full bg-rosy-granite/20"></div>
          <div class="skeleton-box h-5 w-12 rounded-full bg-rosy-granite/20"></div>
        </div>

        <!-- Title Skeleton -->
        <div class="skeleton-box h-7 w-3/4 mb-2 rounded bg-rosy-granite/25"></div>

        <!-- Subtitle & Description Skeletons -->
        <div class="space-y-2 mb-4">
          <div class="skeleton-box h-4 w-full rounded bg-rosy-granite/20"></div>
          <div class="skeleton-box h-4 w-5/6 rounded bg-rosy-granite/20"></div>
          <div class="skeleton-box h-4 w-4/6 rounded bg-rosy-granite/15"></div>
        </div>

        <!-- Metrics pill skeleton -->
        <div class="grid grid-cols-2 gap-2 p-2.5 mb-4 rounded-lg bg-shadow-grey border border-rosy-granite/10">
          <div class="space-y-1">
            <div class="skeleton-box h-3 w-14 rounded bg-rosy-granite/20"></div>
            <div class="skeleton-box h-4 w-16 rounded bg-rosy-granite/25"></div>
          </div>
          <div class="space-y-1">
            <div class="skeleton-box h-3 w-14 rounded bg-rosy-granite/20"></div>
            <div class="skeleton-box h-4 w-16 rounded bg-rosy-granite/25"></div>
          </div>
        </div>

        <!-- Technology Pills Skeleton -->
        <div class="flex flex-wrap gap-1.5 mb-6">
          <div class="skeleton-box h-6 w-16 rounded-md bg-rosy-granite/15"></div>
          <div class="skeleton-box h-6 w-20 rounded-md bg-rosy-granite/15"></div>
          <div class="skeleton-box h-6 w-14 rounded-md bg-rosy-granite/15"></div>
          <div class="skeleton-box h-6 w-18 rounded-md bg-rosy-granite/15"></div>
        </div>
      </div>

      <!-- Action Buttons Skeleton -->
      <div class="pt-4 border-t border-rosy-granite/15 flex items-center gap-3">
        <div class="skeleton-box h-10 flex-1 rounded-lg bg-rosy-granite/25"></div>
        <div class="skeleton-box h-10 w-24 rounded-lg bg-rosy-granite/20"></div>
      </div>
    </article>
  `;
};

/**
 * Renders multiple skeleton cards into a target container
 * @param {HTMLElement} container 
 * @param {number} count 
 */
export const renderProjectSkeletons = (container, count = 6) => {
  const skeletonsHtml = Array.from({ length: count }, () => createProjectSkeleton()).join('');
  container.innerHTML = skeletonsHtml;
  container.setAttribute('aria-busy', 'true');
};
