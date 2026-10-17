import { describe, expect, it, beforeEach } from 'vitest';

const storage = new Map();
globalThis.window = {
  location: {
    pathname: '/portfolio/',
    search: '?source=test',
    hash: '#projects',
    origin: 'https://example.test'
  }
};
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key)
};
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { language: 'en-US' } });
globalThis.document = {
  documentElement: { lang: '' },
  title: '',
  head: { querySelector: () => null, querySelectorAll: () => [], append: () => {} },
  createElement: () => ({ setAttribute: () => {}, rel: '', href: '' })
};

const {
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
  buildLanguagePath,
  getActiveContent,
  loadPortfolioContent,
  resolveLanguage
} = await import('../src/i18n.js');

describe('language resolution and localized content', () => {
  beforeEach(() => {
    storage.clear();
    window.location.pathname = '/portfolio/';
  });

  it('resolves supported URL language before storage and browser locale (AC-3)', () => {
    expect(resolveLanguage('/pt-br', 'en', 'en-US')).toBe('pt-br');
    expect(resolveLanguage('/en', 'pt-br', 'pt-BR')).toBe('en');
  });

  it('uses valid storage and exact Brazilian Portuguese browser locale as fallbacks (AC-3)', () => {
    expect(resolveLanguage('/', 'pt-br', 'en-US')).toBe('pt-br');
    expect(resolveLanguage('/', 'invalid', 'pt-BR')).toBe('pt-br');
    expect(resolveLanguage('/', undefined, 'pt')).toBe('en');
  });

  it('builds a base aware language path while preserving query and hash (AC-2)', () => {
    expect(buildLanguagePath('pt-br')).toBe('/pt-br?source=test#projects');
    expect(SUPPORTED_LANGUAGES).toEqual(['en', 'pt-br']);
  });

  it('merges Portuguese content while preserving stable project data (AC-4, AC-5)', () => {
    const content = loadPortfolioContent('pt-br');
    const english = getActiveContent();
    const project = content.projects[0];

    expect(project.title).toBeTruthy();
    expect(project.id).toBeTruthy();
    expect(project.liveUrl).toBeTruthy();
    expect(project.image).toBeTruthy();
    expect(content.ui.sections.projects.kicker).toBe('Portfólio de clientes');
    expect(english.projects).toHaveLength(content.projects.length);
  });

  it('provides translated project and verification labels for Portuguese content (AC-4)', () => {
    const content = loadPortfolioContent('pt-br');

    expect(content.ui.project.client).toBe('Cliente');
    expect(content.ui.project.verified).toBe('Cliente verificado');
    expect(content.ui.project.live).toBe('Demonstração publicada');
    expect(content.ui.verification.testimonials).toBe('Depoimentos diretos de clientes');
    expect(content.ui.accessibility.githubProfile).toBe('Inspecionar repositório no GitHub');
  });

  it('preserves shared project proof while translating visitor facing project fields (AC-5)', () => {
    const content = loadPortfolioContent('pt-br');
    const english = getActiveContent();
    const portugueseProject = content.projects.find(({ id }) => id === 'cvc-flights');
    const englishProject = english.projects.find(({ id }) => id === 'cvc-flights');

    expect(portugueseProject).toMatchObject({
      id: englishProject.id,
      category: englishProject.category,
      technologies: englishProject.technologies,
      image: englishProject.image,
      liveUrl: englishProject.liveUrl,
      year: englishProject.year
    });
    expect(portugueseProject.title).toBe('Passagens Aéreas • B2C');
    expect(portugueseProject.summary).toContain('E-Commerce B2C');
  });

  it('falls back to English for missing localized fields at runtime (AC-4)', () => {
    const content = loadPortfolioContent('pt-br');

    expect(content.profile.ctas).toEqual(['Explore Selected Work', 'Direct Contact']);
    expect(content.projects[0].client).toBe('Sovos Compliance');
  });

  it('clears an invalid stored language and falls back to English (AC-3)', () => {
    storage.set(STORAGE_KEY, 'fr');
    expect(resolveLanguage('/', 'fr', 'en-US')).toBe('en');
    expect(storage.has(STORAGE_KEY)).toBe(false);
  });
});
