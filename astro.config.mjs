// @ts-nocheck   ← ✅ 彻底禁用此文件的类型检查
import { defineConfig, passthroughImageService } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

/**
 * ✅ 主流语言支持列表
 *   这是纯 JS 数组，Shiki 自动识别语言字符串。
 */
const shikiLangs = [
  'bash', 'c', 'cpp', 'csharp', 'css', 'diff', 'docker',
  'git-commit', 'git-rebase', 'go', 'html', 'java',
  'javascript', 'json', 'latex', 'lua', 'markdown',
  'matlab', 'php', 'python', 'r', 'ruby', 'rust',
  'scss', 'shell', 'sql', 'toml', 'typescript', 'yaml',
];

// =============================
// ✅ Astro 配置
// =============================
export default defineConfig({
  site: 'https://goatpretty.com',

  // ✅ Tailwind + React 集成
  integrations: [tailwind(), react()],

  // =============================
  // ✅ Markdown 渲染配置
  // =============================
  markdown: {
    syntaxHighlight: 'shiki', // 启用 Shiki 高亮
    shikiConfig: {
      theme: 'one-dark-pro', // VSCode 同款主题
      wrap: true,            // 自动换行
      langs: shikiLangs,     // ✅ 支持主流语言（MATLAB、C、Python、HTML 等）
    },

    // ✅ 数学公式支持
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },

  // =============================
  // ✅ 图片服务配置
  // =============================
  image: {
    service: passthroughImageService(),
  },
});
