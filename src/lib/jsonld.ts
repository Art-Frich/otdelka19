import site from '@/data/site.json';
import { socialSameAs } from './socials';
import { phoneNumber } from './contacts';

/*
  Модульные генераторы JSON-LD (паттерн из x-avto-prod, lib/json-ld/*).
  Узлы связаны через @id-граф: Organization инжектится один раз в Base layout,
  остальные ссылаются на неё через provider/seller @id.
  base — абсолютный URL сайта с завершающим слэшем (Astro.site.href).
*/

export const orgId = (base: string) => `${base}#org`;

const abs = (base: string, path?: string) =>
  !path ? undefined : /^https?:\/\//.test(path) ? path : `${base}${path.replace(/^\//, '')}`;

export function organizationSchema(base: string) {
  const hours = site.workingHours.match(/(\d{1,2}:\d{2}).+?(\d{1,2}:\d{2})/);
  const pad = (t: string) => t.replace(/^(\d):/, '0$1:');
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor', 'LocalBusiness'],
    '@id': orgId(base),
    name: site.brand,
    ...(site.masterName && { founder: { '@type': 'Person', name: site.masterName } }),
    url: base,
    telephone: phoneNumber,
    image: abs(base, site.seo.ogImage),
    description: site.seo.description,
    priceRange: '₽₽',
    ...(hours && {
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: pad(hours[1]),
        closes: pad(hours[2]),
      },
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.areaServed[0],
      addressRegion: 'Республика Хакасия',
      addressCountry: 'RU',
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phoneNumber,
      contactType: 'customer service',
      areaServed: 'RU',
      availableLanguage: ['Russian'],
    },
    ...(socialSameAs().length > 0 && { sameAs: socialSameAs() }),
  };
}

export function servicesSchema(base: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Услуги по отделке и ремонту квартир',
    itemListElement: site.services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.text,
        areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
        provider: { '@id': orgId(base) },
      },
    })),
  };
}

export function breadcrumbSchema(base: string, items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(base, it.item),
    })),
  };
}

type ProjectData = {
  title: string;
  summary: string;
  type: string;
  district?: string;
  cover?: string;
  afterImage?: string;
  publishDate?: Date;
};

export function projectSchema(base: string, slug: string, p: ProjectData) {
  const img = abs(base, p.afterImage || p.cover || site.seo.ogImage);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    abstract: p.summary,
    url: `${base}portfolio/${slug}/`,
    ...(img && { image: img }),
    ...(p.publishDate && { dateCreated: p.publishDate.toISOString().slice(0, 10) }),
    ...(p.district && { locationCreated: { '@type': 'Place', name: p.district } }),
    creator: { '@id': orgId(base) },
    about: `Отделка квартир: ${p.type}`,
  };
}
