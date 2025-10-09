// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://luoyuxuanryan.pages.dev",

  integrations: [tailwind(), react()],

  markdown: {
    syntaxHighlight: 'shiki', // ✅ 启用 Shiki 高亮
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax], // ✅ 使用 MathJax
  },

  image: {
    service: passthroughImageService(),
  },
});
