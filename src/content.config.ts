import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

/*
  Коллекция кейсов портфолио. Файлы — Markdown в src/content/projects/*.md
  Картинки пока строками (путь /img/... или URL бакета): есть — рендерим <img>,
  нет — CSS-плейсхолдер «до/после». Когда появятся реальные фото в репо,
  cover/before/after можно перевести на image() + astro:assets (WebP).
*/
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    type: z.string(), // под ключ / чистовая / санузел / косметический
    summary: z.string(),
    area: z.number().optional(), // м²
    district: z.string().optional(), // район / адрес
    duration: z.string().optional(), // "45 дней"
    cover: z.string().optional(),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string().optional() }))
      .optional(),
    order: z.number().default(0),
    publishDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
