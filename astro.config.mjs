// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://petrova-dev.com', // TODO: замени на свой домен после деплоя
  adapter: vercel(),
  integrations: [sitemap()],
  redirects: { '/': '/ru' },
});
