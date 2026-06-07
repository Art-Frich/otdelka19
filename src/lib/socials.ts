import site from '@/data/site.json';

export const SOCIAL_META: Record<string, { label: string; hint: string }> = {
  max: { label: 'MAX', hint: 'Написать в MAX' },
  vk: { label: 'ВКонтакте', hint: 'Сообщество ВКонтакте' },
  telegram: { label: 'Telegram', hint: 'Написать в Telegram' },
  instagram: { label: 'Instagram', hint: 'Профиль в Instagram' },
};

/** Соцсети с заполненной ссылкой и известной площадкой (пустые в CMS скрываются). */
export const enabledSocials = () => site.socials.filter((s) => s.url && SOCIAL_META[s.type]);

/** Ссылка «настоящая» (есть путь, а не голый домен-плейсхолдер) — для sameAs. */
const isRealUrl = (url: string): boolean => {
  try {
    return new URL(url).pathname.replace(/\/+$/, '').length > 0;
  } catch {
    return false;
  }
};

export const socialSameAs = (): string[] =>
  enabledSocials()
    .map((s) => s.url)
    .filter(isRealUrl);
