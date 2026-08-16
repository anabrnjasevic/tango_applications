// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import { buildRobotsTxt, buildSitemapXml } from './src/lib/seo-files.ts';

function resolveSite() {
  const explicit = process.env.PUBLIC_SITE_URL;
  if (explicit && !/localhost|127\.0\.0\.1/.test(explicit)) {
    return explicit.replace(/\/$/, '');
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) {
    return `https://${vercelProduction.replace(/^https?:\/\//, '')}`;
  }

  return explicit || 'http://localhost:4321';
}

const site = resolveSite();

function writeSeoFiles(directory) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'sitemap.xml'), buildSitemapXml(site));
  fs.writeFileSync(path.join(directory, 'robots.txt'), buildRobotsTxt(site));
}

function seoFilesIntegration() {
  return {
    name: 'seo-files',
    hooks: {
      'astro:config:setup': () => {
        writeSeoFiles(path.resolve('public'));
      },
      'astro:build:done': ({ dir }) => {
        writeSeoFiles(fileURLToPath(dir));

        const vercelStatic = path.resolve('.vercel/output/static');
        if (fs.existsSync(path.resolve('.vercel/output'))) {
          writeSeoFiles(vercelStatic);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site,

  integrations: [seoFilesIntegration()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});
