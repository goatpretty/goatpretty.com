// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import rehypeRaw from 'rehype-raw'; // ✅ 允许 Markdown 中使用原生 HTML

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://goatpretty.com',

  // ✅ 启用 Tailwind 与 React
  integrations: [tailwind(), react()],

  // ✅ Markdown 配置
  markdown: {
    syntaxHighlight: 'shiki', // 使用 Shiki 语法高亮
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },

    // ✅ 数学公式插件（remark 阶段）
    remarkPlugins: [remarkMath],

    // ✅ rehype 插件顺序很关键
    rehypePlugins: [
      rehypeRaw,     // 必须放在最前：解析 Markdown 中的原生 HTML
      rehypeMathjax, // 之后渲染 MathJax 公式
    ],

    // ✅ 允许 remark → rehype 传递 HTML
    remarkRehype: { allowDangerousHtml: true },
  },

  // ✅ 图片透传，确保 public/ 下的资源可用
  image: {
    service: passthroughImageService(),
  },
});
