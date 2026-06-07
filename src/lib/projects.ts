import type { CollectionEntry } from 'astro:content';

export type ProjectImage = { src: string; alt: string };

/**
 * Производные данные кейса портфолио — единый источник для карточки и страницы.
 * Убирает дублирование логики (cover, галерея, payload лайтбокса, заголовок).
 */
export function projectView(project: CollectionEntry<'projects'>) {
  const d = project.data;
  const titleLine = d.area ? `${d.title}, ${d.area} м²` : d.title;
  const metaLine = [d.district, d.type, d.duration].filter(Boolean).join(' · ');
  const isCompare = !!(d.beforeImage && d.afterImage);
  const cover = d.cover || d.afterImage || d.gallery?.[0]?.src;

  const gallery: ProjectImage[] = [];
  if (cover) gallery.push({ src: cover, alt: d.title });
  for (const g of d.gallery ?? []) {
    if (g.src !== cover) gallery.push({ src: g.src, alt: g.alt || d.title });
  }

  const href = `/portfolio/${project.id}/`;
  const comparePayload = JSON.stringify({
    mode: 'compare',
    before: d.beforeImage,
    after: d.afterImage,
    title: titleLine,
  });
  const galleryPayload = (start = 0) =>
    JSON.stringify({ mode: 'gallery', images: gallery, title: titleLine, start });

  return { d, titleLine, metaLine, isCompare, cover, gallery, href, comparePayload, galleryPayload };
}
