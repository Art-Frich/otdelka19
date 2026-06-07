import site from '@/data/site.json';

/** Телефон как показывать (из CMS). */
export const phoneDisplay = site.phone;

/** Нормализованный номер (только + и цифры) — для tel: и schema. */
export const phoneNumber = site.phone.replace(/[^\d+]/g, '');

/** Готовый href для звонка. */
export const telHref = `tel:${phoneNumber}`;
