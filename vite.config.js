import { defineConfig } from 'vite';
import { copyFileSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), {
    name: 'github-pages-language-fallback',
    closeBundle() {
      const indexPath = resolve('dist/index.html');
      const cssFile = readdirSync(resolve('dist/assets')).find((file) => file.endsWith('.css'));
      if (cssFile) {
        const cssPath = resolve('dist/assets', cssFile);
        try {
          const html = readFileSync(indexPath, 'utf8');
          const css = readFileSync(cssPath, 'utf8');
          writeFileSync(indexPath, html.replace(/<link rel="stylesheet"[^>]+>/, `<style>${css}</style>`));
        } catch (error) {
          if (error.code !== 'ENOENT') throw error;
        }
      }
      copyFileSync(indexPath, resolve('dist/404.html'));
    }
  }],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
  }
});
