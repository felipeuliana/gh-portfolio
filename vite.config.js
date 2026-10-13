import { defineConfig } from 'vite';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), {
    name: 'github-pages-language-fallback',
    closeBundle() {
      copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'));
    }
  }],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
  }
});
