import enProfile from './fixtures/en/profile.json';
import enProjects from './fixtures/en/projects.json';
import enSkills from './fixtures/en/skills.json';
import enUi from './fixtures/en/ui.json';
import enVerification from './fixtures/en/verification.json';
import ptProfile from './fixtures/pt-br/profile.json';
import ptProjects from './fixtures/pt-br/projects.json';
import ptSkills from './fixtures/pt-br/skills.json';
import ptUi from './fixtures/pt-br/ui.json';
import ptVerification from './fixtures/pt-br/verification.json';

export const SUPPORTED_LANGUAGES = ['en', 'pt-br'];
export const STORAGE_KEY = 'gh-portfolio.language';

const LANGUAGE_HTML = { en: 'en', 'pt-br': 'pt-BR' };
const BASE = import.meta.env.BASE_URL || './';

const normalizeLanguage = (value) => String(value || '').trim().toLowerCase();

export const getSiteBase = () => {
  if (BASE === './' || BASE === '.' || BASE === '/') {
    const pathname = window.location.pathname.replace(/\/+$/, '');
    const languageRoute = pathname.match(/^(.*)\/(?:en|pt-br)$/i);
    if (languageRoute) return languageRoute[1] || '';
    return pathname === '/' ? '' : pathname;
  }
  return BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
};

export const buildLanguagePath = (language, location = window.location) => {
  const selected = SUPPORTED_LANGUAGES.includes(normalizeLanguage(language)) ? normalizeLanguage(language) : 'en';
  const base = getSiteBase();
  return `${base}/${selected}${location.search}${location.hash}`.replace(/\/+/g, '/');
};

export const resolveLanguage = (pathname = window.location.pathname, storageValue, browserLanguage) => {
  const base = getSiteBase();
  const path = pathname.replace(new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), '').replace(/^\/+|\/+$/g, '');
  const pathLanguage = normalizeLanguage(path.split('/')[0]);
  if (SUPPORTED_LANGUAGES.includes(pathLanguage)) return pathLanguage;

  const stored = normalizeLanguage(storageValue);
  if (SUPPORTED_LANGUAGES.includes(stored)) return stored;
  if (storageValue && stored !== 'en' && stored !== 'pt-br') {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage can be unavailable */ }
  }

  return String(browserLanguage || '').toLowerCase() === 'pt-br' ? 'pt-br' : 'en';
};

const merge = (english, localized) => {
  if (localized === undefined || localized === null) return english;
  if (Array.isArray(english) && Array.isArray(localized)) {
    if (english.every((item) => item && item.id) && localized.every((item) => item && item.id)) {
      return english.map((item) => merge(item, localized.find((candidate) => candidate.id === item.id)));
    }
    return localized.length ? localized : english;
  }
  if (typeof english === 'object' && english && typeof localized === 'object' && !Array.isArray(localized)) {
    return Object.fromEntries(Object.keys(english).map((key) => [key, merge(english[key], localized[key])]));
  }
  return localized;
};

const localizedContent = {
  en: {
    profile: enProfile,
    projects: enProjects,
    skills: enSkills,
    ui: enUi,
    verification: enVerification
  },
  'pt-br': {
    profile: merge(enProfile, ptProfile),
    projects: merge(enProjects, ptProjects),
    skills: merge(enSkills, ptSkills),
    ui: merge(enUi, ptUi),
    verification: merge(enVerification, ptVerification),
  }
};

let activeContent = localizedContent.en;
let activeLanguage = 'en';

export const t = (key, fallback = key) => {
  const value = key.split('.').reduce((result, part) => result?.[part], activeContent.ui);
  return value ?? key.split('.').reduce((result, part) => result?.[part], enUi) ?? fallback;
};

export const getActiveLanguage = () => activeLanguage;
export const getActiveContent = () => activeContent;

export const updateDocumentMetadata = (language, content) => {
  const metadata = content.ui.metadata;
  const url = new URL(buildLanguagePath(language), window.location.origin).href;
  document.documentElement.lang = LANGUAGE_HTML[language];
  document.title = metadata.title;

  const setMeta = (selector, value) => {
    const element = document.head.querySelector(selector);
    if (element) element.setAttribute('content', value);
  };
  setMeta('meta[name="description"]', metadata.description);
  setMeta('meta[property="og:title"]', metadata.title);
  setMeta('meta[property="og:description"]', metadata.description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:locale"]', language === 'pt-br' ? 'pt_BR' : 'en_US');

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
  canonical.href = url;
  document.head.querySelectorAll('link[rel="alternate"]').forEach((link) => link.remove());
  SUPPORTED_LANGUAGES.forEach((code) => {
    const alternate = document.createElement('link');
    alternate.rel = 'alternate';
    alternate.hreflang = code === 'pt-br' ? 'pt-BR' : 'en';
    alternate.href = new URL(buildLanguagePath(code), window.location.origin).href;
    document.head.append(alternate);
  });
};

export const loadPortfolioContent = (language) => {
  activeLanguage = SUPPORTED_LANGUAGES.includes(normalizeLanguage(language)) ? normalizeLanguage(language) : 'en';
  activeContent = localizedContent[activeLanguage];
  updateDocumentMetadata(activeLanguage, activeContent);
  return activeContent;
};

export const initializeLanguage = () => {
  let stored;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch { stored = undefined; }
  const language = resolveLanguage(window.location.pathname, stored, navigator.language);
  const base = getSiteBase().replace(/\/$/, '');
  const route = window.location.pathname.replace(base, '').replace(/^\/+|\/+$/g, '');
  const isRoot = route === '';
  const isSupported = SUPPORTED_LANGUAGES.includes(normalizeLanguage(route));
  if (!isRoot && !isSupported) {
    window.location.replace(buildLanguagePath('en'));
  }
  return language;
};

export const persistLanguage = (language) => {
  if (SUPPORTED_LANGUAGES.includes(language)) {
    try { localStorage.setItem(STORAGE_KEY, language); } catch { /* persistence is optional */ }
  }
};
