# Review, development, 2026-10-13

**Reviewed by**: inline Codex review, author model unavailable
**Scope**: 46 files, uncommitted
**Verdict**: Changes requested

## Summary
The change adds bilingual fixtures, language resolution, translated controls, metadata updates, and a translation build check. The production build currently fails before Vite runs because the manifest names do not match the nested fixture keys. The application also contains route and metadata edge cases that should be corrected before merge.

## Major
### 🟠 Translation validator rejects the submitted fixtures, `src/fixtures/translation-manifest.json:5`
**Problem**: The manifest requires keys such as `sections.projectsKicker` and `contact.form.name`, but the fixtures store these values at `sections.projects.kicker` and `contact.formName`. The same mismatch appears in the application, which reads the nested section keys while the validator reads the flat names.
**Why it matters**: `pnpm build` exits with code 1, so no production bundle or generated `404.html` can be deployed. The bilingual feature cannot pass its required build gate.
**Suggested fix**: Make the manifest match the canonical fixture paths, or reshape both language fixtures and every caller consistently, then run `pnpm build` successfully.

### 🟠 Supported language navigation can collapse the repository base path, `src/i18n.js:28`
**Problem**: `buildLanguagePath` constructs a path with `${base}/${selected}` and then globally replaces repeated slashes. With the relative base fallback derived from the current pathname, this can produce a root relative path that does not preserve the configured GitHub Pages directory in all direct visit cases.
**Why it matters**: Selecting a language or redirecting an unsupported route can send visitors to the wrong repository path, which breaks the required shareable language routes on GitHub Pages.
**Suggested fix**: Resolve the base path and language segment with URL path operations, preserving the configured base exactly once, and exercise the result from both repository root and nested language paths.

## Minor
### 🟡 Portuguese project kicker is stored under a different key, `src/fixtures/pt-br/ui.json:1`
**Problem**: The Portuguese projects object uses `subtítulo`, while the renderer reads `sections.projects.kicker`.
**Why it matters**: The Portuguese page falls back to the English kicker instead of displaying the supplied Portuguese translation, and the mismatch is easy to miss because runtime fallback hides it.
**Suggested fix**: Rename the fixture key to `kicker` and include it in the validator's canonical key set.

### 🟡 Announcement text remains English after language selection, `src/main.js:155`
**Problem**: The projects update announces `Showing ... projects` as a hard coded English string.
**Why it matters**: This violates the requirement that interface and accessibility labels be translated, especially for screen reader users.
**Suggested fix**: Add a translated announcement template and interpolate the count and category through the translation service.

### 🟡 Metadata URL generation depends on `window` during module evaluation, `src/i18n.js:16`
**Problem**: `BASE` is captured from Vite at module load, while `getSiteBase` falls back to `window.location` for a relative base. This makes the resolver difficult to exercise outside a browser and can produce incorrect base inference for a deployed `404.html` path.
**Why it matters**: Direct production language paths and repeatable resolver checks can fail or become environment dependent, which are explicit acceptance criteria.
**Suggested fix**: Pass the pathname and base into pure route helpers, then keep browser globals at the application boundary.

## Strengths
- The fixtures are separated by language and the merge function preserves stable identifiers from the English records.
- The header exposes native select controls in both desktop and mobile markup, with labels and selected state.
- The build validator reports each missing language and key instead of silently accepting incomplete translations.

## Test coverage
No test runner is configured. The required build validator was exercised and failed with 18 missing translation paths. The dev server was also attempted and could not start because the workspace filesystem rejected Vite's temporary config write. Browser behavior, both language routes, mobile drawer behavior, metadata, and accessibility state remain unverified.
