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
    expect(resolveLanguage('/portfolio/pt-br', 'en', 'en-US')).toBe('pt-br');
    expect(resolveLanguage('/portfolio/en', 'pt-br', 'pt-BR')).toBe('en');
  });

  it('uses valid storage and exact Brazilian Portuguese browser locale as fallbacks (AC-3)', () => {
    expect(resolveLanguage('/portfolio/', 'pt-br', 'en-US')).toBe('pt-br');
    expect(resolveLanguage('/portfolio/', 'invalid', 'pt-BR')).toBe('pt-br');
    expect(resolveLanguage('/portfolio/', undefined, 'pt')).toBe('en');
  });

  it('builds a base aware language path while preserving query and hash (AC-2)', () => {
    expect(buildLanguagePath('pt-br')).toBe('/portfolio/pt-br?source=test#projects');
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

  it('clears an invalid stored language and falls back to English (AC-3)', () => {
    storage.set(STORAGE_KEY, 'fr');
    expect(resolveLanguage('/portfolio/', 'fr', 'en-US')).toBe('en');
    expect(storage.has(STORAGE_KEY)).toBe(false);
  });
});
