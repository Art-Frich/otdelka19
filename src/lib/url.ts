/**
 * Префикс base-пути к корневым внутренним путям (/img/..., /portfolio/...).
 *
 * import.meta.env.BASE_URL — это значение `base` из astro.config:
 *   '/'           — бой (Yandex Object Storage, корень домена);
 *   '/otdelka19/' — превью на GitHub Pages (сайт лежит в подпапке репозитория).
 *
 * Внешние ссылки (http...), tel:/mailto:, якоря и относительные пути не трогаем.
 * Идемпотентна: путь, уже начинающийся с base, не префиксуется повторно.
 */
const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  if (BASE === '/' || path.startsWith(BASE)) return path;
  return BASE + path.slice(1);
}
