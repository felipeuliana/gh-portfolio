import { mkdir, readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const sourceDir = new URL('../src/images/', import.meta.url);
const outputDir = new URL('../public/images/generated/', import.meta.url);
const outputPath = fileURLToPath(outputDir);

await mkdir(outputPath, { recursive: true });

for (const file of await readdir(sourceDir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;

  const input = fileURLToPath(new URL(file, sourceDir));
  const stem = basename(file, extname(file));

  for (const [format, quality] of [['avif', '20'], ['webp', '35']]) {
    const qualityNumber = Number(quality);

    await sharp(input)
      .resize(400, 192, { fit: 'cover', position: 'centre' })
      .toFormat(format, { quality: qualityNumber })
      .toFile(join(outputPath, `${stem}-400.${format}`));

    await sharp(input)
      .resize(800, 384, { fit: 'cover', position: 'centre' })
      .toFormat(format, { quality: qualityNumber })
      .toFile(join(outputPath, `${stem}-800.${format}`));
  }
}
