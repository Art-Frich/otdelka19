// Фото мастера → портрет 3:4 (из чистого вертикального исходника).
// Запуск: node scripts/crop-master.mjs [путь-к-исходнику]
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = process.argv[2] ?? 'master-2.jpg';
const OUT = 'public/img/master';
await mkdir(OUT, { recursive: true });

// Портрет 3:4 — исходник уже вертикальный, лицо сверху-по-центру.
await sharp(SRC)
  .resize(900, 1200, { fit: 'cover', position: 'top' })
  .modulate({ brightness: 1.04, saturation: 1.05 })
  .sharpen()
  .webp({ quality: 82 })
  .toFile(`${OUT}/portrait.webp`);

console.log('-> portrait.webp');
