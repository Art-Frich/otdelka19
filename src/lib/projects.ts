import type { CollectionEntry } from 'astro:content';
import { withBase } from '@/lib/url';

export type ProjectImage = { src: string; alt: string };

/**
 * Производные данные кейса портфолио — единый источник для карточки и страницы.
 * Убирает дублирование логики (cover, галерея, payload лайтбокса, заголовок).
 * Все пути к фото и к странице кейса проходят через withBase — корректно
 * работают и в подпапке (превью на GitHub Pages), и в корне (бой).
 */
export function projectView(project: CollectionEntry<'projects'>) {
  const d = project.data;
  const titleLine = d.area ? `${d.title}, ${d.area} м²` : d.title;
  const metaLine = [d.district, d.type, d.duration].filter(Boolean).join(' · ');

  const beforeImage = d.beforeImage ? withBase(d.beforeImage) : undefined;
  const afterImage = d.afterImage ? withBase(d.afterImage) : undefined;
  const isCompare = !!(beforeImage && afterImage);

  // Фото из CMS-галереи
  const extras: ProjectImage[] = (d.gallery ?? []).map((g) => ({
    src: withBase(g.src),
    alt: g.alt || d.title,
  }));

  // Галерея кейса + обложка карточки.
  // Обложка = слайдер (для «до/после») ИЛИ первое фото галереи.
  // Для «до/после» кадры ДО и ПОСЛЕ добавляются в галерею автоматически.
  let gallery: ProjectImage[];
  let cover: string | undefined;
  if (beforeImage && afterImage) {
    gallery = [
      { src: beforeImage, alt: `${d.title} — до ремонта` },
      { src: afterImage, alt: `${d.title} — после ремонта` },
      ...extras,
    ];
    cover = afterImage;
  } else {
    gallery = extras;
    cover = extras[0]?.src;
  }

  const href = withBase(`/portfolio/${project.id}/`);
  const comparePayload = JSON.stringify({
    mode: 'compare',
    before: beforeImage,
    after: afterImage,
    title: titleLine,
  });
  const galleryPayload = (start = 0) =>
    JSON.stringify({ mode: 'gallery', images: gallery, title: titleLine, start });

  return {
    d,
    titleLine,
    metaLine,
    isCompare,
    cover,
    gallery,
    beforeImage,
    afterImage,
    href,
    comparePayload,
    galleryPayload,
  };
}
