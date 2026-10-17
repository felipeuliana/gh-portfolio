import { defineConfig } from 'vite';
import { cpSync, copyFileSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
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
      for (const language of ['en', 'pt-br']) {
        cpSync(resolve('dist/assets'), resolve(`dist/${language}/assets`), { recursive: true });
        cpSync(resolve('dist/fonts'), resolve(`dist/${language}/fonts`), { recursive: true });
        cpSync(resolve('dist/images'), resolve(`dist/${language}/images`), { recursive: true });
        cpSync(resolve('dist/site.webmanifest'), resolve(`dist/${language}/site.webmanifest`));
        cpSync(resolve('dist/robots.txt'), resolve(`dist/${language}/robots.txt`));
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
