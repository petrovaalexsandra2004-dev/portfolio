import ru from './ru.json';
import uk from './uk.json';
import ro from './ro.json';

export const locales = [
  { code: 'ru', slug: 'ru', label: 'RU' },
  { code: 'uk', slug: 'ua', label: 'UA' },
  { code: 'ro', slug: 'md', label: 'MD' },
];

export const defaultSlug = 'ru';

const dictionaries = { ru, uk, ro };

export function getLangStaticPaths() {
  return locales.map((locale) => ({ params: { lang: locale.slug } }));
}

export function getLocale(slug) {
  return locales.find((locale) => locale.slug === slug) ?? locales.find((locale) => locale.slug === defaultSlug);
}

export function useTranslations(slug) {
  const locale = getLocale(slug);
  return dictionaries[locale.code];
}

export function localizedPath(slug, path = '') {
  return `/${slug}${path ? `/${path}` : ''}`;
}
