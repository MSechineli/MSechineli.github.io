import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { rehypeCallouts } from './src/plugins/rehype-callouts.mjs';

export default defineConfig({
  site: 'https://msechineli.github.io',
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  markdown: {
    processor: satteri({
      hastPlugins: [rehypeCallouts()],
    }),
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    }
  },
  vite: {
    server: {
      watch: {
        // Scoped to src/content: a bare '**/home/**' would match /home/<user>/ and disable file watching entirely
        ignored: ['**/.obsidian/**', '**/src/content/_bases/**', '**/src/content/bases/**', '**/src/content/_home/**', '**/src/content/home/**', '**/src/content/_base/**', '**/src/content/base/**']
      }
    },
    assetsInclude: ['**/*.base', '**/.obsidian/**', '**/_bases/**']
  }
});
