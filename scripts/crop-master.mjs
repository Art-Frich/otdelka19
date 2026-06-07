// Кроп мастера из групповой фотографии: круглый аватар + портрет 3:4.
// Запуск: node scripts/crop-master.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC =
  'D:/dev/otdelka19/xIQM5NDWtG4S1IRVlSjLDkOoS2obibG1CVemN1aaS9w4prwEjGFwFckQ5QF8TEtFYh5iNcVQcdLQExckW4JP_WmZ.jpg';
const OUT = 'public/img/master';
await mkdir(OUT, { recursive: true });

const meta = await sharp(SRC).metadata();
const W = meta.width,
  H = meta.height;
console.log('source', W, 'x', H);

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const px = (fx) => Math.round(fx * W);
const py = (fy) => Math.round(fy * H);

// --- Портрет 3:4 (он по центру, рука-жест сверху) ---
const pLeft = clamp(px(0.30), 0, W - 1);
const pTop = clamp(py(0.28), 0, H - 1);
const pW = clamp(px(0.47), 1, W - pLeft);
const pH = clamp(py(0.66), 1, H - pTop);

await sharp(SRC)
  .extract({ left: pLeft, top: pTop, width: pW, height: pH })
  .resize(900, 1200, { fit: 'cover', position: 'top' })
  .modulate({ brightness: 1.05, saturation: 1.05 })
  .sharpen()
  .webp({ quality: 82 })
  .toFile(`${OUT}/portrait.webp`);
console.log('-> portrait.webp', pW, 'x', pH);

// --- Круглый аватар (по лицу) ---
const side = px(0.34);
const aLeft = clamp(px(0.63) - Math.round(side / 2), 0, W - side);
const aTop = clamp(py(0.4) - Math.round(side / 2), 0, H - side);
const S = 640;
const mask = Buffer.from(
  `<svg width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="#fff"/></svg>`
);

await sharp(SRC)
  .extract({ left: aLeft, top: aTop, width: side, height: side })
  .resize(S, S, { fit: 'cover' })
  .modulate({ brightness: 1.05, saturation: 1.05 })
  .sharpen()
  .composite([{ input: mask, blend: 'dest-in' }])
  .webp({ quality: 82 })
  .toFile(`${OUT}/avatar.webp`);
console.log('-> avatar.webp (circle)', side, 'x', side);

console.log('done');
