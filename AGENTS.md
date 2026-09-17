# Frontend Project Instructions

## Stack

- **Language / Runtime**: HTML5 and modern JavaScript (ES2026)
- **Framework**: Vite
- **Key dependencies**: Tailwind CSS v4, @tailwindcss/vite, Vite
- **Package manager**: pnpm

## Tech Stack
- HTML5
- JavaScript (ES2026)
- Styling: Tailwind CSS
- Build tool: Vite
- Key dependencies: Tailwind CSS v4, @tailwindcss/vite, Vite
- Package manager: pnpm 11.3.0

## Build approach

Skateboard (ship the smallest usable whole, then grow the same product release by release).

## Commands

```bash
# Install
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview
```

## Code Style Rules
- Prioritize Responsive/Mobile first implementation;
- Use semantic HTML markup;
- Prioritize Accessibility (WCAG/AA);
- Follow JavaScript clean code; 
- Do not add placeholder content - implement clean loading skeletons instead;
- Commit messages follow Conventional Commits.
- Deploy the static production build through GitHub Pages using `.github/workflows/deploy.yml`.

## Context files

- [src/AGENTS.md](src/AGENTS.md): Application source structure, rendering conventions, fixture data, and accessibility gotchas.
