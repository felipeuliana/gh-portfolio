import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

describe('production performance contract', () => {
  it('has a built page with no external font origins', () => {
    expect(existsSync(join(dist, 'index.html'))).toBe(true);
    expect(readFileSync(join(dist, 'index.html'), 'utf8')).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
  });

  it('keeps generated modern images below the per asset budget', () => {
    const imageDir = join(process.cwd(), 'src/images/generated');
    const files = existsSync(imageDir) ? readdirSync(imageDir) : [];
    expect(files.filter((file) => /\.(avif|webp)$/.test(file)).length).toBeGreaterThan(0);
    for (const file of files) {
      if (/\.(avif|webp)$/.test(file)) expect(statSync(join(imageDir, file)).size).toBeLessThan(60 * 1024);
    }
  });
});
