import common from '@/data/common.json';

/** Телефон как показывать (из CMS). */
export const phoneDisplay = common.phone;

/** Нормализованный номер (только + и цифры) — для tel: и schema. */
export const phoneNumber = common.phone.replace(/[^\d+]/g, '');

/** Готовый href для звонка. */
export const telHref = `tel:${phoneNumber}`;
