// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Рабочий домен — заменить на боевой перед деплоем (otdelka19.ru / иное)
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://otdelka19.ru';

// Tailwind v4 подключён через PostCSS (postcss.config.mjs), а не через
// @tailwindcss/vite — последний несовместим с Rolldown-сборщиком Astro 6.

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin') }), mdx()],
});
