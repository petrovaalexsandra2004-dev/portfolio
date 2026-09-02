// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://portfolio-five-wine-12.vercel.app',
  adapter: vercel(),
  integrations: [sitemap()],
  redirects: { '/': '/ru' },
});
