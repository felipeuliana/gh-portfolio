import { mkdir, readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const sourceDir = new URL('../src/images/', import.meta.url);
const outputDir = new URL('../public/images/generated/', import.meta.url);
await mkdir(outputDir, { recursive: true });

for (const file of await readdir(sourceDir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const input = new URL(file, sourceDir).pathname;
  const stem = basename(file, extname(file));
  for (const [format, quality] of [['avif', '20'], ['webp', '35']]) {
    await run('magick', [input, '-resize', '400x192^', '-gravity', 'center', '-extent', '400x192', '-colors', '64', '-quality', quality, join(outputDir.pathname, `${stem}-400.${format}`)]);
    await run('magick', [input, '-resize', '800x384^', '-gravity', 'center', '-extent', '800x384', '-colors', '64', '-quality', quality, join(outputDir.pathname, `${stem}-800.${format}`)]);
  }
}
