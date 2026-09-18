# Scope: Portfolio

This is a public personal portfolio for senior frontend work. It helps prospective clients review selected projects, verify engineering quality, and make contact through a focused single page experience.

**Build approach:** Skateboard (ship the smallest usable whole, then grow the same product release by release).
**Workflow:** Beta (after `/develop`, run `/check verify`, then `/test`). The project stays static, public, and free of backend operations.

_These are recommendations to keep the build orderly, not requirements. You decide when a feature is done._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Core portfolio experience | Release 1 | existing |
| 2 | Responsive accessible presentation | Release 1 | existing |
| 3 | Project discovery and details | Release 1 | existing |
| 4 | Contact path | Release 1 | existing |
| 5 | Static deployment | Release 1 | existing |
| 6 | Client verification proof | Release 1 | in-progress |
| 7 | Bilingual portfolio content | Release 2 | in-progress |
| 8 | Quality validation | Release 2 | planned |

## Release 1

### 1. Core portfolio experience · existing

The public single page presents the profile, selected work, skills, engineering approach, and contact path for prospective clients. code in `index.html`, `src/main.js`, and `src/components/`

### 2. Responsive accessible presentation · existing

The site provides a dark mobile first experience with semantic HTML, keyboard support, visible focus states, reduced motion handling, and responsive layouts. code in `src/style.css`, `index.html`, and `src/utils/a11y.js`

### 3. Project discovery and details · existing

Visitors can browse fixture backed projects by category and open detailed project views with technology, role, metrics, and live links. code in `src/components/filterTabs.js`, `src/components/projectCard.js`, `src/components/projectModal.js`, and `src/services/dataService.js`

### 4. Contact path · existing

Visitors can review direct contact information and complete a locally validated inquiry form. The current experience reports success locally and does not send data to a backend. code in `src/components/contactSection.js` and `src/components/form.js`

### 5. Static deployment · existing

The optimized static site builds with repository relative assets and deploys to GitHub Pages from the main branch. code in `vite.config.js` and `.github/workflows/deploy.yml`

### 6. Client verification proof · in-progress

Complete the verification section so the public page exposes the prepared audit evidence and testimonials as part of the client review path.

Done when: verification content is rendered in the page, connected to fixture data, accessible, and covered by the public navigation or an intentional page position.

* [ ] Design it (spec): `/architect client verification proof`

## Release 2

### 7. Bilingual portfolio content · in-progress

Let visitors read the portfolio in English and Portuguese while preserving the same project proof, navigation, accessibility, and static deployment model.

Done when: visitors can switch between English and Portuguese, the selected language is clear and preserved during navigation, and all public content and metadata have complete translations.

* [x] Design it (spec): `/architect bilingual portfolio content` · [0001](../specs/0001-bilingual-portfolio-content.md)
* [ ] Build it: `/develop bilingual portfolio content`
  * [ ] Implement language resolution, base aware routing, persistence, browser detection, and English fallback, satisfies AC-2, AC-3, AC-7
  * [ ] Reshape shared and localized fixtures, merge stable records, translate content, and validate required keys, satisfies AC-4, AC-5, AC-8
  * [ ] Add language controls, full navigation, document language, and localized metadata, satisfies AC-1, AC-2, AC-6
  * [ ] Add the GitHub Pages fallback and repeatable desktop, mobile, accessibility, and production path checks, satisfies AC-7, AC-8, AC-9
* [ ] Verify it: `/check verify bilingual portfolio content`
* [ ] Test it: `/test bilingual portfolio content`

### 8. Quality validation · needs a decision

Make the portfolio quality claims repeatable through automated or documented checks for accessibility, performance, Core Web Vitals, SEO, and production deployment.

Done when: the project has a repeatable validation path, the public build passes the agreed thresholds, and failures are visible before deployment.

* [ ] Design it (spec): `/architect quality validation`

## Deferred

These remain outside the current static portfolio scope.

* Real contact submission and message storage
* Analytics and conversion tracking
* Privacy, cookie consent, and terms content
* Blog, articles, and a larger case study library

## Legend

**Status:** `existing` means complete before this workflow. `in-progress` means partially implemented and ready to continue. `planned` means not started. `dropped` means removed from active scope but retained for history.

**Workflow:** Beta means `/develop`, `/check verify`, then `/test`. A feature with a meaningful design decision starts with `/architect`.

## /scope complete · Portfolio

**8 features scoped, 5 existing, 1 in progress, 2 planned, 4 deferred, build approach Skateboard, workflow Beta.**
Next: `/clear`, then `/architect client verification proof`
Heads up: client verification is partially implemented, and bilingual support introduces a new content and metadata decision.
Scope written to `docs/scope/scope.md`.
