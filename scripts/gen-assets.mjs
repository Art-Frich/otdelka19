// Генерация сопутствующих ассетов: OG-превью + иконки PWA/Apple.
// Запуск: node scripts/gen-assets.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const svg = await readFile('public/favicon.svg');

// OG-превью 1200×630 из сильного кадра (кухня)
await sharp('public/img/projects/dizajnerskaya-kvartira/kitchen.webp')
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82 })
  .toFile('public/og.jpg');

// Иконки из favicon.svg
for (const s of [192, 512]) {
  await sharp(svg).resize(s, s).png().toFile(`public/icon-${s}.png`);
}
await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png');

console.log('assets generated: og.jpg, icon-192.png, icon-512.png, apple-touch-icon.png');
