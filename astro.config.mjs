// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Рабочий домен — заменить на боевой перед деплоем (otdelka19.ru / иное)
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://otdelka19.ru';
// База: '/' в проде (корень домена), '/otdelka19/' для превью на GitHub Pages (подпапка).
const BASE = process.env.PUBLIC_BASE_PATH ?? '/';

// Tailwind v4 подключён через PostCSS (postcss.config.mjs), а не через
// @tailwindcss/vite — последний несовместим с Rolldown-сборщиком Astro 6.

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin') }), mdx()],
});
