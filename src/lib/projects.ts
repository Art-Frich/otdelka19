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

  // Фото из CMS-галереи
  const extras: ProjectImage[] = (d.gallery ?? []).map((g) => ({ src: g.src, alt: g.alt || d.title }));

  // Галерея кейса + обложка карточки.
  // Обложка = слайдер (для «до/после») ИЛИ первое фото галереи.
  // Для «до/после» кадры ДО и ПОСЛЕ добавляются в галерею автоматически.
  let gallery: ProjectImage[];
  let cover: string | undefined;
  if (d.beforeImage && d.afterImage) {
    gallery = [
      { src: d.beforeImage, alt: `${d.title} — до ремонта` },
      { src: d.afterImage, alt: `${d.title} — после ремонта` },
      ...extras,
    ];
    cover = d.afterImage;
  } else {
    gallery = extras;
    cover = extras[0]?.src;
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
