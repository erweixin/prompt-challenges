// @ts-check
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: false },
  }),
  integrations: [react()],
  // 路由用手写 [locale]，不用内置 i18n 前缀，避免与 Cloudflare 适配器冲突
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
  },
});
