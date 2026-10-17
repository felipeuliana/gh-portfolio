import { expect, test } from '@playwright/test';

test.describe('bilingual portfolio', () => {
  const selectLanguage = async (page, isMobile) => {
    if (isMobile) {
      await page.getByRole('button', { name: 'Open navigation menu' }).click();
      await page.locator('#mobile-nav-drawer').getByLabel('Language').selectOption('pt-br');
      return;
    }

    await page.getByRole('navigation', { name: 'Primary navigation' }).getByLabel('Language').selectOption('pt-br');
  };

  const languageControl = (page, isMobile) => isMobile
    ? page.locator('#mobile-nav-drawer').getByLabel('Idioma')
    : page.getByRole('navigation', { name: 'Navegação principal' }).getByLabel('Idioma');

  const openMobileLanguageControl = async (page, isMobile) => {
    if (isMobile) await page.getByRole('button', { name: 'Abrir menu de navegação' }).click();
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('switches to Portuguese and updates the route, content, and metadata (AC-1, AC-2, AC-4, AC-6)', async ({ page, isMobile }) => {
    await selectLanguage(page, isMobile);

    await expect(page).toHaveURL(/\/pt-br$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page).toHaveTitle('Felipe Uliana | Engenheiro de software');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Portfólio de um engenheiro/);
    await expect(page.getByRole('heading', { name: 'Sites e aplicações selecionados' })).toBeVisible();
    await expect(page.getByText('Passagens Aéreas • B2C')).toBeVisible();
    await openMobileLanguageControl(page, isMobile);
    await expect(languageControl(page, isMobile)).toHaveValue('pt-br');
  });

  test('remembers Portuguese after a fresh page load (AC-3)', async ({ page, isMobile }) => {
    await selectLanguage(page, isMobile);
    await expect(page).toHaveURL(/\/pt-br$/);

    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await openMobileLanguageControl(page, isMobile);
    await expect(languageControl(page, isMobile)).toHaveValue('pt-br');
    await expect(page.getByRole('heading', { name: 'Arquitetura com propósito' })).toBeVisible();
  });

  test('exposes the language control in the mobile navigation drawer (AC-1, AC-9)', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'This interaction is specific to the mobile project.');

    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const drawer = page.locator('#mobile-nav-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByLabel('Language')).toHaveValue('en');
    await expect(drawer.getByRole('combobox', { name: 'Language' })).toHaveCount(1);
  });

  test('redirects an unsupported route to English while preserving query and hash (AC-3, AC-7)', async ({ page }) => {
    await page.goto('/unsupported?source=test#projects');

    await expect(page).toHaveURL(/\/en\?source=test#projects$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: 'Selected websites and applications' })).toBeVisible();
  });
});
