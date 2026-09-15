# Portfolio — Senior Frontend Architect

A single-page portfolio engineered with **HTML5**, **modern JavaScript (ES2026)**, and **Tailwind CSS v4**, designed specifically to showcase enterprise web projects for **external client verification**. Published and deployed seamlessly with **GitHub Pages**.

---

## 🎯 Project Overview & Architecture

### Tech Stack
- **Markup**: Semantic HTML5 Living Standard (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`)
- **Scripting**: Modern JavaScript (ES2026 ES Modules, clean code principles, pure renderers, WAI-ARIA focus traps)
- **Styling**: Tailwind CSS v4 with custom theme tokens & Vite integration
- **Build Tool**: Vite (sub-second build, relative asset resolution for GitHub Pages)
- **Deployment**: GitHub Pages via automated GitHub Actions CI/CD

### Design & Typography System
- **Design Inspiration**: Carlos Rodríguez ([dibujantecarlos.com](https://www.dibujantecarlos.com/)) dark theme single-page aesthetic
- **Color Palette**:
  - `neutral / SHADOW_GREY`: `#1e1e24` (Deep background)
  - `light / GHOST_WHITE`: `#fffaff` (Primary high-contrast text, 17.4:1 contrast ratio)
  - `accent / AMBER_EARTH`: `#e28413` (Primary highlight, buttons, active states)
  - `primary / BUBBLE_GUM_PINK`: `#f45b69` (Secondary badges, focus rings, callouts)
  - `secondary / ROSY_GRANITE`: `#7f7b82` (Structural borders, muted tags)
- **Typography Scale**:
  - **Scale**: Minor Third (ratio `1.200`, base `18px`)
  - **Fonts**: `Fira Sans` (body and headings) & `Fira Code` (metrics, badges, code tokens)

### Responsive Breakpoints
- **Mobile**: `< 480px` (Default mobile-first styles)
- **Tablet**: `< 768px` (`sm:` / `md:`)
- **Desktop**: `< 1366px` (`lg:` / `xl:`)

---

## 🛡️ Core Rules & Compliance

1. **Accessibility (WCAG 2.2 Level AA/AAA)**:
   - High-contrast `:focus-visible` rings (`outline: 2px solid #f45b69`)
   - Native `<dialog>` modal with focus trapping, `Escape` key close, and focus restoration
   - Live region screen-reader announcements (`aria-live="polite"`)
   - Accessible keyboard-navigable filter tablist (`ArrowLeft`, `ArrowRight`, `Home`, `End`)
   - Skip-to-content bypass link for assistive technologies
2. **Zero Placeholder Content**:
   - Implemented exact-geometry **shimmering loading skeletons** (`src/components/skeleton.js`)
   - Content is dynamically hydrated from isolated JSON fixtures without layout shift (`CLS = 0.000`)
3. **Isolated Fixture Architecture**:
   - `src/fixtures/profile.json`
   - `src/fixtures/projects.json`
   - `src/fixtures/skills.json`
   - `src/fixtures/verification.json`
4. **Target Performance**:
   - 90–100 score on Google Lighthouse across Performance, Accessibility, Best Practices, and SEO

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20+` (tested on Node `v24.16.0`)
- `pnpm` `v11.3.0+` (or `npm`)

### Installation
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```
Starts Vite local development server with hot module replacement (HMR).

### Production Build
```bash
pnpm build
```
Generates optimized static production output in `./dist`.

### Local Preview
```bash
pnpm preview
```
Previews the production build locally.

---

## 🌐 GitHub Pages Deployment

This repository includes a GitHub Actions workflow located at `.github/workflows/deploy.yml`.

To deploy to GitHub Pages:
1. Push this repository to GitHub.
2. Under your repository **Settings** > **Pages**:
   - Set **Source** to **GitHub Actions**.
3. Every push to the `main` branch will automatically build and deploy your portfolio to `https://<username>.github.io/<repo-name>/`.
