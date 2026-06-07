// Разовый импорт исходных фото в оптимизированный WebP по проектам.
// Запуск: node scripts/import-photos.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SRC = 'C:/Users/Frich/Desktop/original-photo';
const OUT = 'public/img/projects';

// src-файл -> проект/имя.webp
const MAP = [
  // A — Дизайнерская квартира под ключ
  ['PXL_20250911_120130447.jpg', 'dizajnerskaya-kvartira/moldings'],
  ['PXL_20250816_071140775.jpg', 'dizajnerskaya-kvartira/reeded-panel'],
  ['PXL_20251001_053621053.jpg', 'dizajnerskaya-kvartira/kitchen'],
  ['PXL_20251229_050622369.jpg', 'dizajnerskaya-kvartira/wardrobe'],
  ['ojhU3NSCrCdQYar3Y10KIkRes_OOx1bSBtSaexYZxXwlDz0DYT-Vl44wKPzj4ELVhuqygHQPVST_Y6-4AhnMvhSo.jpg', 'dizajnerskaya-kvartira/child-room'],
  ['TNFGgEx3_CHsC_Cg3FzggprUPSva6K1Gnz7jO4xLUcIcz_UQV2ZfV7wfcdWFJ7PUciNA5RbeakhAbAsrOoDLmnk1.jpg', 'dizajnerskaya-kvartira/entrance'],
  ['v1HQvZrRMQHPyAXU7g1ryc7WzfNqXsLRyPmf1T2naxADTC_8DAWjij6rqBPIWdez9CJlTMazqGoEVtFOSOO7n2UB.jpg', 'dizajnerskaya-kvartira/corridor'],
  ['6xD0UToYFx6Z_ga6EbWW4ODfC9ZA9mX2zWAI1Jw-eZccZEk36lFkyJYSvSDh0E17zO9OS9Ml9PvDnW9w_Go1haID.jpg', 'dizajnerskaya-kvartira/bath-sage'],
  ['80NUHmTDGtuZlc5Z7IZqapRH-CA5BYgbfHq6tUnytE4wmG07KdsRbhuMvCc8G3nirSRtqLpiLG4KeqbDN0hpzEwT.jpg', 'dizajnerskaya-kvartira/bath-marble'],
  ['g2UabBs5SsfIRs6CCYLsdd2KdzeO7BJ3E8t-kB6L-4GuMWJfPZ6iX_aQNR1qYcgEPc2X09vsYry-Bzm_F2cQUNld.jpg', 'dizajnerskaya-kvartira/bath-marble-2'],

  // B — Светлая квартира (2023)
  ['PXL_20230823_020241096.jpg', 'svetlaya-kvartira/room'],
  ['PXL_20231017_102622016.jpg', 'svetlaya-kvartira/jungle-wall'],

  // C — Кухня с мраморным фартуком (2024)
  ['PXL_20241222_105615901.jpg', 'kuhnya-mramor/kitchen'],

  // D — Квартира в работе (черновая, 2026)
  ['PXL_20260208_073723606.jpg', 'kvartira-chernovaya/before'], // стяжка
  ['PXL_20260208_102632265.jpg', 'kvartira-chernovaya/after'], // наливной пол
  ['Ae4OnmS6YWEg_A_KJAHuzT8tmkSeXyiDUJ0JsVj-M7aC6fUnP3mI3UFxOtr3TLNQRgnTuWUkm3WHc4UOV4gELyCN.jpg', 'kvartira-chernovaya/floor'],
  ['PXL_20260409_071632205.jpg', 'kvartira-chernovaya/loggia'],

  // E — отдельные работы
  ['nGafA04Fq7dHJ6bq_B_ir-oG1jFuks7suQpTwo7Ba0cfRzNXs3BCtgkcQTH458W5DMjp8bbcbt-iOmdP1pw-B4LJ.jpg', 'sanuzel-kabanchik/main'],
  ['lE1-nEbWwwWVYUv-9p4crlelrcpexRNtEgCuLogvYN73pJtX-LiYrJJEUH_elfwbGzRwX7OIh6MOeSa7GMS22TGu.jpg', 'dushevaya-derevo/main'],
  ['YokZaiklRqBNvzsXJD8jLg_-1IhTnyosLoL8mkVt7-izDLXpLmDdYOUGFCnGSEm7nwIpKJVgOe3kaptN0vvHqJ4k.jpg', 'spalnya/main'],
];

let ok = 0;
for (const [src, dest] of MAP) {
  const outPath = join(OUT, dest + '.webp');
  await mkdir(dirname(outPath), { recursive: true });
  await sharp(join(SRC, src))
    .rotate() // авто-ориентация по EXIF
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath);
  ok++;
  console.log('->', dest + '.webp');
}
console.log(`\nГотово: ${ok}/${MAP.length}`);
