# 0001. Bilingual portfolio content

**Date**: 2026-09-17
**Status**: Proposed

## Summary

This feature lets visitors read the portfolio in English or Brazilian Portuguese. The language is visible in the header, represented in the URL, remembered between visits, and reflected in page metadata. The static build will validate required translations while using English for any unexpected missing field.

## Context

The portfolio is a public single page application built with JavaScript, Vite, Tailwind CSS, and static JSON fixtures. Its current content is English only, and the page has no language resolver, language control, locale aware metadata, or translated fixture loading.

The portfolio is deployed under the GitHub Pages repository base path, so language routes must preserve that base path. The project has no backend, database, authentication, or external service for content delivery. Translation support must therefore remain a client side and build time concern.

The feature is intentionally limited to English and Brazilian Portuguese. It must preserve the existing project proof, accessibility behavior, responsive layout, and static deployment model while making every visitor facing value translatable.

> ⚠️ Premise note: A single client rendered application cannot provide full server side language negotiation on direct GitHub Pages requests. The design therefore uses a generated `404.html` fallback and client side route resolution. This keeps clean language paths, but initial HTML metadata is finalized after the application starts.

## Requirements

**User stories**:

- As a visitor, I want to choose English or Brazilian Portuguese from the header so that I can read the portfolio in my preferred language.
- As a returning visitor, I want my selected language remembered so that I do not need to choose it again.
- As a visitor sharing a portfolio link, I want the language in the URL so that the recipient opens the intended language.
- As a search or social visitor, I want page metadata to match the selected language so that the preview is understandable.

**Acceptance criteria**:

- **AC-1**: The header exposes a native accessible language select at the top right, with English and Português (Brasil) options, and the mobile drawer includes the same control.
- **AC-2**: Selecting a language navigates to the corresponding path segment, `/en` or `/pt-br`, after preserving the configured Vite site base path, and performs a full page initialization in that language.
- **AC-3**: Language resolution uses this precedence: supported URL path, valid `localStorage` value under `gh-portfolio.language`, exact case insensitive browser locale `pt-BR`, then English. Unsupported values resolve to English.
- **AC-4**: Profile, projects, skills, verification content, interface labels, accessibility labels, and metadata are translated for both supported languages. Missing individual translated fields fall back to English.
- **AC-5**: Stable identifiers, project categories, technologies, images, URLs, metrics, dates, and relationships remain consistent across languages. Localized records merge with shared records by stable ID.
- **AC-6**: The document `lang` attribute, title, description, Open Graph text, canonical URL, and `hreflang` links reflect the active language and its base path.
- **AC-7**: A direct visit to a supported language path loads the application through the generated `404.html` fallback. Unsupported or malformed language paths redirect to the English base path.
- **AC-8**: The production build fails when required translation keys are missing, while runtime field fallback remains available for unexpected fixture gaps.
- **AC-9**: Language selection, route resolution, persistence, fallback behavior, metadata updates, accessibility state, and both supported production paths have automated or repeatable verification.

## Options considered

### Option 1: Client side language paths with a generated fallback

The application resolves `/en` and `/pt-br` after loading through a generated `404.html`, while Vite preserves the repository base path.

**Pros**:

- Keeps one application and one deployment.
- Produces clean shareable paths.
- Fits the existing static GitHub Pages workflow.

**Cons**:

- Direct requests depend on GitHub Pages fallback behavior.
- Metadata is finalized by client side JavaScript.

### Option 2: Hash based language routes

The application would use paths such as `/#/en` and `/#/pt-br`.

**Pros**:

- Works without server fallback configuration.
- Requires little deployment change.

**Cons**:

- Produces less clear URLs.
- Weakens sharing and language aware indexing signals.

### Option 3: Separate static language directories

The build would produce separate English and Portuguese HTML entry points.

**Pros**:

- Direct requests work without a fallback page.
- Initial metadata can be language specific in each HTML document.

**Cons**:

- Duplicates entry documents and deployment handling.
- Increases drift between language builds.

## Decision

**Chosen option**: Option 1: Client side language paths with a generated fallback

Use a single Vite application with `/en` and `/pt-br` language segments after the configured site base path. Add a generated `404.html` copy of the application entry so GitHub Pages can load supported paths, redirect malformed paths to English, and load language specific fixture content through a deterministic resolver.

**Implementation skills**: none

## Rationale

The existing product is a static Vite application with one entry point and repository relative deployment. Client side language paths add the requested URL behavior without introducing a second build product or a new hosting service. The generated fallback addresses the direct visit limitation of GitHub Pages with the fewest moving parts.

The URL is the public source of truth, while local storage provides a convenient return visit default. Exact `pt-BR` browser detection keeps initial behavior predictable, and English per field fallback prevents one incomplete translation from breaking the page. Build time completeness checks protect releases without removing runtime resilience.

## Feature design

**Data model sketch**:

| Entity | Key fields | Relationships and constraints |
|---|---|---|
| Language | `code` required, one of `en` or `pt-br` | Unique code, resolved from URL, storage, browser locale, or English fallback |
| Shared profile data | `id` required, identity and contact links | One shared profile record |
| Localized profile | `id` required, `language` required, visitor facing profile text | Unique `(id, language)`, references shared profile |
| Shared project | `id` required, category, technologies, image, URLs, metrics, dates | Unique project ID, referenced by localized project records |
| Localized project | `id` required, `language` required, title, summaries, role, responsibilities, outcomes, labels | Unique `(id, language)`, references shared project ID |
| Shared skill | `id` required, stable ordering and identity | Unique skill ID |
| Localized skill | `id` required, `language` required, name, description, labels | Unique `(id, language)`, references shared skill ID |
| Shared verification | `id` required, evidence references and stable identifiers | Unique verification ID |
| Localized verification | `id` required, `language` required, evidence descriptions, testimonials, labels | Unique `(id, language)`, references shared verification ID |
| Interface translation dictionary | required key and language value | Unique `(key, language)`, missing values fall back to English |

The fixture representation uses JSON files. Shared records are stored once, and language directories contain localized records keyed by the same stable IDs. This avoids duplicating URLs, images, metrics, and relationships while preserving one reviewable fixture set per language.

The canonical fixture layout is `src/fixtures/shared/` for stable records, `src/fixtures/en/` for English localized records, and `src/fixtures/pt-br/` for Brazilian Portuguese localized records. Each localized record uses the same stable `id` as its shared record. The loader first merges shared data, then overlays the selected language, then overlays English for any missing or null localized field. Nested objects follow the same recursive rule. Arrays of records merge by stable `id`; arrays without IDs are replaced by the selected language array and fall back to English when absent.

Shared fields are IDs, categories, technologies, image paths, URLs, metrics, dates, ordering, and relationship keys. Localized fields are titles, names, summaries, descriptions, roles, responsibilities, outcomes, testimonial text, interface labels, accessibility labels, validation messages, and metadata text.

The required translation key registry is `src/fixtures/translation-manifest.json`. It lists every required interface, accessibility, metadata, profile, project, skill, and verification key. The build validator compares both language fixture sets against this registry and reports the language, key path, and missing value before failing.

**API surface**:

| Endpoint or function | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `resolveLanguage(pathname, storageValue, browserLanguage)` | function | pathname:string, storageValue:string optional, browserLanguage:string optional | supported language code, normalized path | public | invalid values resolve to `en` |
| `loadPortfolioContent(language)` | function | language:`en` or `pt-br` | merged profile, projects, skills, verification, interface translations | public | missing localized field falls back to English, malformed fixture rejects |
| `buildLanguagePath(language)` | function | language code | base aware `/en` or `/pt-br` path | public | unsupported language is rejected or normalized to `en` |
| `updateDocumentMetadata(language, content)` | function | language code, localized metadata | updated `lang`, title, description, Open Graph, canonical, and alternate links | public | missing metadata field falls back to English |
| `validateTranslations()` | build function | English and Portuguese fixture sets | success or missing key report | build only | missing required key fails production build |

Route normalization reads the Vite configured base path, strips it once, accepts only `/en` and `/pt-br` as supported language paths, normalizes language matching to lowercase, and uses one trailing slash policy. Duplicate separators, unsupported language segments, and malformed paths redirect to the English path. Query strings and hash fragments are preserved during language navigation and redirects.

The generated `404.html` reads `window.location.pathname`, removes the configured site base, checks the remaining path against the supported language paths, and loads the application for a supported path. For an unsupported or malformed path it redirects to the base aware English path while preserving `window.location.search` and `window.location.hash`.

The metadata contract includes `html.lang`, `title`, `meta[name="description"]`, `meta[property="og:title"]`, `meta[property="og:description"]`, `meta[property="og:url"]`, `meta[property="og:locale"]`, one canonical link, and alternate links for `en` and `pt-BR`. Metadata values come from the active language metadata fixture, then the matching English field, then the existing static document value. URL values are generated from the configured base path and normalized language route.

**Value sourcing**:

| Action | Value produced or displayed | Source |
|---|---|---|
| Resolve initial language | active language code | supported URL segment, then `localStorage` key `gh-portfolio.language`, then exact case insensitive `pt-BR`, then `en` |
| Render language control | option labels and selected value | interface translation dictionary and resolved language |
| Render profile and sections | localized copy and accessibility labels | selected language fixtures, field by field English fallback |
| Render project cards and details | localized text plus stable project data | localized project record merged with shared project record by `id` |
| Render skills | localized names and descriptions plus stable ordering | localized skill record merged with shared skill record by `id` |
| Render verification | localized evidence and testimonial text | localized verification record merged with shared verification record by `id` |
| Build navigation target | `/en` or `/pt-br` after site base | configured Vite `base` and selected language code |
| Update document language | `html.lang` value | `en` or `pt-BR` mapping from the resolved language |
| Update metadata | title, description, Open Graph text, canonical, alternate links | localized metadata fixture merged with English fallback and the active base aware path |
| Validate release | complete required translation key set | English fixture key inventory compared with Portuguese fixture key inventory |

**Key invariants**:

- Only `en` and `pt-br` are supported language codes.
- The URL path always wins over local storage and browser detection when it contains a supported language.
- URL language codes are canonical lowercase `en` and `pt-br`. The document language value is `en` or `pt-BR`, and the `hreflang` value for Portuguese is `pt-BR`.
- Input language values are trimmed and normalized to lowercase before validation. Only `en` and `pt-br` are accepted.
- Invalid or stale local storage values are cleared when read. Storage is written only after explicit selection of a supported language.
- Browser detection accepts only `pt-BR` or its lowercase equivalent `pt-br`; language only `pt` and other Portuguese variants resolve to English.
- Shared IDs and relationships are identical in every language.
- Missing or null localized fields resolve recursively to the matching English field. Identified arrays merge by stable ID.
- Required translation keys must exist before a production build succeeds.
- Language changes use a full navigation and do not preserve section, filter, or dialog state.
- Language selection changes the URL, performs a full document navigation, and initializes the application from the new URL before rendering content.
- The language control remains keyboard accessible and has a visible selected value.
- The active language path includes the configured Vite site base.

**Security model**:

All portfolio content is public and read only. The feature adds no authentication, authorization, private data, credentials, or user generated content. Local storage contains only a supported language code and must be treated as untrusted input. Fixture parsing and path handling must reject unsupported values without executing content as code.

**Configuration required**:

No new environment variables or third party credentials are required.

**Critical test scenarios**:

- Happy path: select Portuguese from the header, navigate to the base aware `/pt-br` path, load Portuguese content, update metadata, and retain the selection after refresh, verifies **AC-1**, **AC-2**, **AC-3**, **AC-4**, and **AC-6**.
- Failure case: open an unsupported path or provide an invalid storage value and verify redirect or English fallback without broken content, verifies **AC-3** and **AC-7**.
- Translation integrity: remove a required Portuguese key in a controlled fixture and verify the production validation fails with the missing key, verifies **AC-8**.
- Shared data integrity: compare English and Portuguese merged projects and verify stable IDs, links, images, categories, metrics, and relationships, verifies **AC-5**.
- Accessibility and responsive behavior: use keyboard navigation with the native select in desktop and mobile drawer layouts, verify labels, focus, selected state, and document language, verifies **AC-1**, **AC-4**, and **AC-9**.
- Production paths: build the site and load both supported language paths through the generated fallback, verifies **AC-7** and **AC-9**.

Verification must be repeatable with the repository package manager and must cover both language paths on a desktop viewport and a mobile viewport, URL precedence, invalid storage, exact browser locale matching, query and hash preservation, field fallback, metadata values, keyboard operation, missing key build failure, and direct production visits through `404.html`.

## Build plan

The project uses the Skateboard approach, so the first slice should be a smallest usable whole: resolve one language, render the existing portfolio through the localized data service, expose the control, and support the two routes. The next slices thicken the content, metadata, deployment fallback, and validation.

1. Create the language model, base aware route resolver, normalization rules, storage precedence, exact browser detection, query and hash preservation, and English fallback, satisfies **AC-2**, **AC-3**, and **AC-7**
2. Reshape fixtures into shared and language specific sets, implement recursive stable ID merging, define the required key registry, translate all profile, project, skill, verification, interface, and metadata fields, and wire the localized data service, satisfies **AC-4**, **AC-5**, and **AC-8**
3. Add the native header and mobile drawer language controls, full navigation behavior, document language updates, and localized metadata, satisfies **AC-1**, **AC-2**, and **AC-6**
4. Add generated `404.html` fallback handling and malformed path redirection, then verify both base aware language paths in the production build, satisfies **AC-7**
5. Add repeatable desktop and mobile checks for resolver precedence, fallback, metadata, accessibility, shared data integrity, query and hash preservation, missing key failure, and direct production paths, satisfies **AC-8** and **AC-9**

## Consequences

**Positive**:

- Visitors can use and share a clearly identified English or Brazilian Portuguese portfolio.
- One static application remains responsible for both languages.
- Shared project proof stays consistent while visitor facing copy is localized.
- Build validation catches incomplete releases before deployment.
- Native controls preserve established accessibility behavior.

**Negative / tradeoffs**:

- Every visitor facing string and metadata field needs translation maintenance.
- Direct GitHub Pages paths depend on the generated fallback behavior.
- Client side metadata updates are less robust for crawlers than separate server rendered documents.
- The shared and localized fixture model adds loader and validation complexity.

**Neutral**:

- Existing project filtering and dialogs keep their stable IDs and relationships.
- Language changes intentionally reset section, filter, and dialog state.
- No backend or runtime content service is introduced.

## Follow-up

- [ ] Confirm the final Portuguese copy and review it for Brazilian Portuguese usage before the feature is marked done.
- [ ] Add the feature to the quality validation scope once the repeatable browser and accessibility checks are implemented.
