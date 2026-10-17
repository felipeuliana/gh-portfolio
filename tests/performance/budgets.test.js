import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

describe('production performance contract', () => {
  it('has a built page with no external font origins', () => {
    expect(existsSync(join(dist, 'index.html'))).toBe(true);
    const html = readFileSync(join(dist, 'index.html'), 'utf8');
    expect(html).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
    expect(html).toMatch(/FiraSans-400\.woff2/);
    expect(html).toMatch(/resilient web experiences/);
    expect(existsSync(join(dist, 'fonts', 'FiraSans-400.woff2'))).toBe(true);
    expect(html).toMatch(/FiraSans-700\.woff2/);
  });

  it('keeps the first paint shell and language route assets available', () => {
    const html = readFileSync(join(dist, 'index.html'), 'utf8');
    expect(html).toContain('id="app"');
    expect(html).toContain('id="hero-title"');
    expect(existsSync(join(dist, 'en', 'assets'))).toBe(true);
    expect(existsSync(join(dist, 'pt-br', 'assets'))).toBe(true);
    expect(existsSync(join(dist, 'en', 'fonts', 'FiraSans-700.woff2'))).toBe(true);
  });

  it('keeps localized crawler and manifest assets from falling through to the app shell', () => {
    expect(readFileSync(join(dist, 'en', 'site.webmanifest'), 'utf8')).toContain('"short_name"');
    expect(readFileSync(join(dist, 'pt-br', 'site.webmanifest'), 'utf8')).toContain('"short_name"');
    expect(readFileSync(join(dist, 'en', 'robots.txt'), 'utf8')).toContain('Allow: /');
    expect(readFileSync(join(dist, 'pt-br', 'robots.txt'), 'utf8')).toContain('Allow: /');
  });

  it('keeps below fold work deferred and contrast fixes in the production source', () => {
    const main = readFileSync(join(process.cwd(), 'src/main.js'), 'utf8');
    const styles = readFileSync(join(process.cwd(), 'src/style.css'), 'utf8');
    expect(main).toContain('requestIdleCallback');
    expect(styles).toContain('.text-rosy-granite');
    expect(styles).toContain('#b8b4bb');
  });

  it('keeps generated modern images below the per asset budget', () => {
    const imageDir = join(process.cwd(), 'public/images/generated');
    const files = existsSync(imageDir) ? readdirSync(imageDir) : [];
    expect(files.filter((file) => /\.(avif|webp)$/.test(file)).length).toBeGreaterThan(0);
    for (const file of files) {
      if (/\.(avif|webp)$/.test(file)) expect(statSync(join(imageDir, file)).size).toBeLessThan(60 * 1024);
    }
  });
});
