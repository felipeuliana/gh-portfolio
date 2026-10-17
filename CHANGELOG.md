# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta.5] (2026-10-17)

### Added
- Added responsive AVIF and WebP picture generation for project showcases.
- Added self hosted subset Fira Code and Fira Sans fonts in WOFF2 format.
- Added inlined critical production styling through Vite configuration.
- Added automated Lighthouse CI checks and Vitest performance budget contracts.
- Added Playwright browser coverage for bilingual routes and mobile navigation.
- Added robots discovery file for search engines.

### Changed
- Improved initial startup time by removing artificial boot delays and deferring secondary sections.
- Improved text contrast and secondary sizing to meet WCAG AA accessibility standards.

### Fixed
- Fixed localized key references in client verification.

## [1.0.0-beta.4] (2026-10-17)

### Added
- Added bilingual portfolio support for English and Brazilian Portuguese (pt-br).
- Added persistent language routing with shareable URL paths and GitHub Pages fallback.
- Added localized fixture suites for profile, projects, skills, verification, and interface copy.
- Added automated translation validation during the build step.
- Added language selection menus to desktop and mobile navigation headers.
- Added localized screen reader announcements and dynamic document metadata.
- Added unit tests for internationalization utilities and route helpers.

### Fixed
- Fixed duplicated accessibility utility imports.

## [1.0.0-beta.3] (2026-09-18)

### Changed
- Changed project showcase titles and descriptions to reflect commercial retail eCommerce scope.
- Changed Sovos Compliance Cloud volume metric to compliance entries for domain accuracy.

### Added
- Added architectural specification and scope planning for bilingual support.
- Added project changelog tracking.

## [1.0.0-beta.2] (2026-09-17)

### Fixed
- Fixed production project image paths for repository relative deployment on GitHub Pages.
- Fixed mobile navigation drawer background opacity and scrolling lock.

## [1.0.0-beta.1] (2026-09-17)

### Added
- Added a single page portfolio with profile details, skills, engineering approach, selected projects, and a contact path.
- Added filterable project cards with thumbnails, project details, technology lists, metrics, and external links.
- Added local contact form validation with accessible status and error feedback.
- Added responsive presentation with keyboard support, visible focus states, reduced motion support, loading skeletons, and toast feedback.
- Added a GitHub Pages workflow that builds and deploys the static site.

### Changed
- Updated portfolio content and project categories to reflect full stack developer positioning.
- Added branded metadata, favicons, and web app manifest assets for the public site.
