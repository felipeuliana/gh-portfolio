# 0002. Mobile performance optimization

**Date**: 2026-10-17
**Status**: Proposed

## Summary

This enhancement improves mobile performance for the public portfolio so the site achieves a score of 98 or higher on clean local runs and PageSpeed Insights, with an automated CI gate of 0.95. We eliminate render blocking Google Fonts by self hosting specific Latin subset font files with preloading and metric overrides. We inline the compiled stylesheet into the HTML head, generate modern responsive AVIF and WebP project thumbnails, mount the hero synchronously without boot delays, and adjust secondary text weights to satisfy contrast rules while keeping brand tokens intact.

## Context

The portfolio is a public single page application showcasing engineering quality for prospective clients. Issue #7 recorded a mobile performance score of 87 on PageSpeed Insights, and local testing with Lighthouse recorded a score of 79 under simulated mobile network throttling. Because the site highlights performance engineering, slow mobile loading undermines the client verification story.

Detailed diagnostics reveal three primary bottlenecks. First, the page experiences a long rendering pause between document load and first paint because client script initialization delays mounting the hero heading. Second, external Google Fonts introduce render blocking round trips to third party domains. Third, full size project thumbnails create approximately 1.4 megabytes of uncompressed image transfer, which consumes mobile bandwidth and slows Speed Index.

The site already banks maximum scores for Cumulative Layout Shift and Total Blocking Time. Because layout shift is zero and blocking time is zero, all available score improvements reside in First Contentful Paint, Largest Contentful Paint, and Speed Index. In addition, the accessibility audit revealed minor color contrast notices where muted text using the rosy granite token sits below 4.5:1. Adjusting text sizing and weights brings these elements into compliance under WCAG AA large text rules (which require 3:1) while preserving the existing brand color palette.

## Requirements

**User stories**:
- As a mobile visitor, I want the portfolio to paint immediately so that I can explore projects without waiting through a blank screen.
- As an engineering client verifying portfolio quality, I want Lighthouse mobile performance to score 98 or higher so that performance claims are proven.
- As a maintainer, I want automated regression tests in the build and CI pipelines so that future updates cannot quietly degrade speed or accessibility.

**Acceptance criteria**:
- **AC-1**: Mobile Lighthouse performance reaches 98 or higher on local production runs and PageSpeed Insights, with an automated continuous integration threshold of 0.95 across median of 5 runs.
- **AC-2**: First Contentful Paint is 1.5 seconds or lower and Largest Contentful Paint is 2.0 seconds or lower on mobile.
- **AC-3**: Speed Index is 2.7 seconds or lower and total transferred page weight is 500 kilobytes or lower.
- **AC-4**: Cumulative Layout Shift remains 0 and Total Blocking Time remains 50 milliseconds or lower.
- **AC-5**: All external font requests to Google Fonts are removed, replaced by self hosted Latin subset woff2 files (Fira Sans 400, 600, 700; Fira Code 400, 500) with primary font preloading and metric overrides.
- **AC-6**: Project thumbnails in bilingual fixtures (`src/fixtures/en/projects.json` and `src/fixtures/pt-br/projects.json`) provide modern AVIF and WebP candidate fields at 400w and 800w, with explicit dimensions (`width="384" height="192"`), asynchronous decoding, and lazy loading.
- **AC-7**: The complete compiled production stylesheet (approximately 7.6 kilobytes gzipped) is inlined directly into the document head during build to eliminate render blocking stylesheet requests without extraction bugs.
- **AC-8**: Boot delays in `src/main.js` and `src/services/dataService.js` are eliminated so the header, hero, and skeleton containers mount synchronously on execution with initial simulated latency set to 0.
- **AC-9**: Secondary text sizing and font weights are adjusted so that rosy granite text elements satisfy WCAG AA contrast standards, raising Lighthouse Accessibility to 100 while keeping existing palette tokens unchanged.
- **AC-10**: Fast Vitest build contract tests and a GitHub Actions Lighthouse CI workflow (median of 5 runs, 0.95 gate) enforce strict asset byte budgets on every pull request.

## Options considered

### Option 1: Incremental optimization inside the existing Vite stack

Eliminate critical path delays by self hosting fonts, inlining the compiled stylesheet, generating responsive AVIF and WebP image formats during build, and mounting the hero synchronously in `src/main.js`.

**Pros**:
- Preserves the existing Vite, Vanilla ES2026, and Tailwind CSS v4 architecture without introducing new frameworks.
- Directly tackles each measured bottleneck identified in the performance trace.
- Leaves behind deterministic Vitest and Lighthouse CI guardrails.

**Cons**:
- Requires creating a dedicated build script for image processing and stylesheet inlining.

### Option 2: Pre render static HTML at build time

Render the full header and hero HTML into `index.html` during the Vite build step, allowing the browser to paint before client JavaScript evaluates.

**Pros**:
- Delivers the hero heading in the initial HTML response.
- Guarantees fast paint even on very low powered mobile devices.

**Cons**:
- Increases build complexity and requires synchronizing static HTML markup with the bilingual translation fixture system.
- Adds potential hydration mismatches when client scripts rebind interactive elements.

### Option 3: Migrate to a static site framework

Rebuild the application using a dedicated static framework such as Astro or SvelteKit.

**Pros**:
- Provides automatic asset optimization, islands architecture, and static HTML output by default.

**Cons**:
- Excessive scope and effort for a single page portfolio that already has working components and tests.
- Violates the skateboard build philosophy by rewriting functioning software instead of improving it incrementally.

## Decision

**Chosen option**: Option 1: Incremental optimization inside the existing Vite stack

We optimize the existing application incrementally by eliminating boot delays in `src/main.js`, self hosting fonts, delivering responsive modern images, inlining the compiled stylesheet, and adding automated CI budgets.

## Rationale

Option 1 provides the highest return on effort while respecting the project skateboard build principle. Our performance audit showed that JavaScript evaluation itself takes only 55 milliseconds, and Total Blocking Time is already zero. The blank screen delay was not caused by fundamental framework limits, but by render blocking external requests and sequential initialization logic.

By self hosting font files, inlining the compact compiled stylesheet, and optimizing images, we remove the third party network hops and heavy asset downloads that inflate mobile First Contentful Paint and Speed Index. Keeping client side rendering with streamlined mounting avoids the architectural complexity of server side pre rendering while comfortably meeting the 98 score target.

## Feature design

**Data model sketch**:
No database or entity model changes. Asset fixtures in `src/fixtures/en/projects.json` and `src/fixtures/pt-br/projects.json` maintain the existing `image` property for backward compatibility and add modern variant fields:
```json
{
  "image": "./src/images/thumb-project.png",
  "imageAvif": "./src/images/thumb-project.avif",
  "imageWebp": "./src/images/thumb-project.webp"
}
```

**API surface**:
New and updated project scripts:
- `pnpm perf:budget`: Executes `pnpm build && vitest run tests/performance` to validate bundle sizes, font hosts, and image limits against `dist/`.
- `pnpm perf:lh`: Starts a local server with compression (`pnpm dlx sirv-cli dist --port 4173 --gzip --brotli`) and runs Lighthouse mobile audits.
- `.github/workflows/lighthouse.yml`: Automated GitHub Actions workflow running Lighthouse CI across 5 median runs on pull requests and pushes to `main`.

**Value sourcing**:
| Action | Value produced / displayed | Source |
|---|---|---|
| Load fonts | Font glyphs for Fira Sans (400, 600, 700) and Fira Code (400, 500) | Local woff2 files in `src/assets/fonts/` bundled by Vite with `FiraSans-Regular.woff2` preloaded in `index.html` |
| Render hero | Hero heading and intro text | Synchronously retrieved fixture content from `src/i18n.js` |
| Render thumbnails | Responsive project imagery | Generated AVIF and WebP variants output by `scripts/generate-images.mjs` at 400w and 800w |
| Enforce budgets | Bundle size, image size, and font origin assertions | Build contract test thresholds in `tests/performance/budgets.test.js` |

**Budget thresholds**:
- Total JavaScript gzip: 30 kilobytes or lower
- Total CSS gzip: 10 kilobytes or lower
- Individual thumbnail: 60 kilobytes or lower
- Total eager image transfer: 250 kilobytes or lower
- Total fonts transfer: 70 kilobytes or lower
- Third party critical requests: exactly 0
- Automated continuous integration score gate: 0.95 minimum (median of 5 runs)

**Key invariants**:
- Zero third party network requests on the critical rendering path.
- Cumulative Layout Shift must remain exactly 0 across font swapping and image loading.
- Muted text elements using rosy granite must meet or exceed WCAG AA 3:1 contrast ratio by using font sizes at or above 18.66px bold or 24px normal.

**Security model**:
Static public site hosted on GitHub Pages. No sensitive data, cookies, or backend permissions involved.

**Critical test scenarios**:
- Main mobile paint flow: First Contentful Paint arrives in 1.5 seconds or less and Largest Contentful Paint in 2.0 seconds or less under simulated throttling, verifies **AC-1**, **AC-2**, **AC-3**.
- Font swap stability: Fonts swap without visible layout shift using metric overrides and preloading, verifies **AC-4**, **AC-5**.
- Thumbnail delivery: Project cards display modern responsive images with lazy loading and explicit dimensions, verifies **AC-6**.
- CSS delivery: Complete production stylesheet applies synchronously in document head without unstyled content flashes, verifies **AC-7**.
- Immediate boot: Hero mounts synchronously without waiting for artificial timers or delayed promises, verifies **AC-8**.
- Contrast validation: Muted text elements and badges pass automated color contrast checks, verifies **AC-9**.
- CI regression gate: Deliberately oversized assets or third party font links trigger build and CI failures, verifies **AC-10**.

## Build plan

1. Remove artificial delays in `src/services/dataService.js` and mount header, hero, and skeleton containers synchronously in `src/main.js` so first paint occurs immediately, satisfies **AC-2**, **AC-8**
2. Download Latin subset woff2 font files (Fira Sans 400, 600, 700; Fira Code 400, 500), configure local font declarations with metric overrides in `src/style.css`, preload primary body font in `index.html`, and remove Google Fonts links, satisfies **AC-4**, **AC-5**
3. Create `scripts/generate-images.mjs` using `sharp` to emit AVIF and WebP responsive sizes (400w, 800w) for thumbnails, update bilingual fixtures with variant paths, and update card markup with picture tags, dimensions, and lazy loading, satisfies **AC-3**, **AC-6**
4. Configure a Vite plugin to inline the compiled production stylesheet into `index.html` during build, removing external CSS requests, satisfies **AC-2**, **AC-7**
5. Adjust typography sizing and weights for secondary text in `src/style.css` and components to meet WCAG AA contrast standards without altering palette tokens, satisfies **AC-9**
6. Implement Vitest build contract tests under `tests/performance/budgets.test.js` verifying bundle budgets, font origins, and image sizes, satisfies **AC-10**
7. Configure Lighthouse CI configuration and GitHub Actions workflow with median of 5 runs and a 0.95 score gate, satisfying **AC-1**, **AC-10**

## Consequences

**Positive**:
- Mobile performance score rises to 98 or higher on clean local runs and PageSpeed Insights.
- Hero content paints significantly faster on mobile networks.
- Page weight drops from 1.5 megabytes to under 500 kilobytes.
- Accessibility score reaches a perfect 100 without disrupting brand palette tokens.
- Automated tests protect against performance and accessibility regressions in continuous integration.

**Negative / tradeoffs**:
- Generating responsive images adds an extra build step and requires the `sharp` dependency.
- Inlined styles increase initial HTML document size by approximately 7.6 kilobytes gzipped, which remains well within the initial TCP congestion window.

**Neutral**:
- GitHub Pages fixed cache headers remain unchanged, which does not affect the performance score.

## Follow-up

- [ ] Lock baseline measurements locally using `pnpm perf:lh` before starting implementation
- [ ] Verify image visual quality on mobile and desktop displays after AVIF and WebP generation
- [ ] Calibrate GitHub Actions workflow after initial deployment to confirm median run consistency

## References

**Project sources**:
- `AGENTS.md`, Skateboard build approach and mobile first styling rules
- `src/AGENTS.md`, single page application structure, fixture data, and skeleton conventions
- `docs/specs/0001-bilingual-portfolio-content.md`, bilingual routing and fixture structure

**Practices & standards**:
- Web Vitals guidelines for First Contentful Paint, Largest Contentful Paint, and Speed Index
- Font metric overrides for layout stability using size adjust, ascent override, and descent override
- Responsive images using modern picture elements, srcset, and native lazy loading
- Automated build contract testing with Vitest and median run aggregation in Lighthouse CI

## Migration plan

**Strategy**: Incremental phases (skateboard approach)

**Phases**:
1. Phase 1: Eliminate boot delays, self host fonts, and adjust secondary text sizing. This removes the blank screen and clears render blocking font requests.
2. Phase 2: Implement the image optimization pipeline and inline the compiled stylesheet, cutting page transfer weight below 500 kilobytes.
3. Phase 3: Add Vitest build contract tests and activate the Lighthouse CI workflow in GitHub Actions.

**Rollback**:
Each phase represents an isolated git commit that can be reverted independently without database migrations or data loss.

**Risks**:
- Font metric overrides could cause minor font flash if size adjust ratios are misconfigured. Mitigated by verifying visual stability in browser tests.
- Image compression could degrade thumbnail detail. Mitigated by setting AVIF quality to 80 and WebP quality to 85 with visual verification.
