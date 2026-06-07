// Фото мастера → портрет 3:4 + круглый аватар (из чистого вертикального портрета).
// Запуск: node scripts/crop-master.mjs [путь-к-исходнику]
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = process.argv[2] ?? 'master-2.jpg';
const OUT = 'public/img/master';
await mkdir(OUT, { recursive: true });

const enhance = (s) => s.modulate({ brightness: 1.04, saturation: 1.05 }).sharpen();

// Портрет 3:4 — исходник уже вертикальный, лицо сверху-по-центру.
await enhance(sharp(SRC).resize(900, 1200, { fit: 'cover', position: 'top' }))
  .webp({ quality: 82 })
  .toFile(`${OUT}/portrait.webp`);
console.log('-> portrait.webp');

// Круглый аватар: квадрат от верха кадра (голова + плечи).
const { width: W } = await sharp(SRC).metadata();
const S = 640;
const mask = Buffer.from(
  `<svg width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="#fff"/></svg>`
);
await enhance(sharp(SRC).extract({ left: 0, top: 0, width: W, height: W }).resize(S, S, { fit: 'cover' }))
  .composite([{ input: mask, blend: 'dest-in' }])
  .webp({ quality: 82 })
  .toFile(`${OUT}/avatar.webp`);
console.log('-> avatar.webp (circle)');

console.log('done');
