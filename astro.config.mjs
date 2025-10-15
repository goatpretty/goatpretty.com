// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import rehypeRaw from 'rehype-raw'; // ✅ 新增：允许 Markdown 中嵌入原生 HTML

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://goatpretty.com",

  integrations: [tailwind(), react()],

  markdown: {
    syntaxHighlight: 'shiki', // ✅ 启用 Shiki 高亮
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },

    // ✅ 数学公式
    remarkPlugins: [remarkMath],

    // ✅ rehype-raw 必须放在 MathJax 之前
    rehypePlugins: [
      rehypeRaw,     // 允许在 Markdown 中写原生 HTML（如 <div>）
      rehypeMathjax, // 数学公式渲染
    ],

    // ✅ 让 remark 可以安全传递 HTML 内容到 rehype
    remarkRehype: { allowDangerousHtml: true },
  },

  // ✅ 图片透传（支持 public 文件夹内图片）
  image: {
    service: passthroughImageService(),
  },
});
