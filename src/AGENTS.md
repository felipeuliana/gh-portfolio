# Source

## Overview

This area contains the single page portfolio application. The entry point mounts the semantic page shell, components return HTML strings, and small initializer functions attach interaction behavior after rendering.

## Key files

| File | Owns |
|---|---|
| `src/main.js` | Application startup, page composition, project loading, filtering, and scroll tracking |
| `src/components/` | Semantic page sections, cards, forms, dialogs, navigation, feedback, and loading skeletons |
| `src/services/dataService.js` | Access to the isolated JSON fixture data and simulated project loading latency |
| `src/fixtures/` | Portfolio profile, project, skill, and verification content |
| `src/utils/a11y.js` | Live region announcements and focus trapping for interactive surfaces |
| `src/utils/projectVisuals.js` | Inline SVG project illustrations without extra network requests |
| `src/style.css` | Tailwind theme tokens, responsive design values, focus styles, motion preferences, and skeleton animation |

## Conventions

* Keep rendering functions pure where possible. Return semantic HTML and keep event wiring in initializer functions.
* Keep portfolio content in `src/fixtures/`, not inside component templates.
* Preserve keyboard support, focus visibility, live announcements, and reduced motion behavior when changing interactions.
* Use the native `dialog` element for project details and preserve focus trapping and focus restoration.
* Use Tailwind utility classes and the theme tokens defined in `src/style.css` for visual changes.
* Show loading skeletons while project data is being loaded. Do not introduce filler content.
* Keep project illustrations inline and deterministic through `projectVisuals.js`.

## Gotchas

* Vite is configured with `base: './'` because the static site is deployed under a GitHub Pages repository path.
* Project data is bundled from JSON fixtures. The service latency is intentional so the loading state remains demonstrable.
* The contact form currently validates and reports locally. Treat any change to submission behavior as a separate integration decision.

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite._
