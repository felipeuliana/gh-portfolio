import fs from 'node:fs';
import path from 'node:path';

const root = new URL('../src/fixtures/', import.meta.url);
const read = (name) => JSON.parse(fs.readFileSync(new URL(name, root), 'utf8'));
const get = (object, key) => key.split('.').reduce((value, part) => value?.[part], object);
const manifest = read('translation-manifest.json');
const english = read('en/ui.json');
const portuguese = read('pt-br/ui.json');
const missing = manifest.required.flatMap((key) => {
  const issues = [];
  if (get(english, key) === undefined || get(english, key) === null || get(english, key) === '') issues.push(`en:${key}`);
  if (get(portuguese, key) === undefined || get(portuguese, key) === null || get(portuguese, key) === '') issues.push(`pt-br:${key}`);
  return issues;
});

if (missing.length) {
  console.error(`Missing required translations: ${missing.join(', ')}`);
  process.exit(1);
}

console.log(`Validated ${manifest.required.length} translation keys for en and pt-br.`);
