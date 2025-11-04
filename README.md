# GoatPretty Web ![GoatPretty Logo](/public/favicon.svg)

**GoatPretty.com** 是一个由 **抽象的美羊羊（PrettyGoat）** 使用 [**Astro 框架**](https://astro.js.cn/) 构建的个人博客网站，  
专注于分享排版设计、前端开发、以及灵感创作的内容。  

---

## 项目概述

这是我的第一个正式博客项目，来源于 [**Radish Garden**](https://github.com/LuoYuXuanRyan/radish_garden) 主题。  
在此基础上进行了文案的重构，使其更契合与个人风格。  

网站使用 **Astro + TailwindCSS** 搭建，结合 **React** 与 **Motion** 提供流畅的动画体验。  
博客页面支持 Markdown、数学公式、高亮与暗色模式，并针对移动端进行了优化。

---

## 特点

- **Astro 驱动的高性能静态博客**
- **基于 TailwindCSS 的响应式设计**
- **支持 Markdown 与代码高亮**
- **内置数学公式渲染（remark-math + rehype-mathjax）**
- **支持深色 / 浅色主题切换**
- **移动端友好，自适应布局**
- **自动生成 RSS 订阅源**
- **支持邮件联系与友情链接展示**

---

## 技术栈

| 技术 | 作用 |
|------|------|
| [Astro](https://astro.build/) | 前端静态站点框架 |
| [React](https://react.dev/) | 动态组件支持 |
| [TailwindCSS](https://tailwindcss.com/) | 快速样式开发 |
| [TypeScript](https://www.typescriptlang.org/) | 强类型支持 |
| [Motion](https://motion.dev/) | 动画与过渡效果 |
| [Cloudflare Pages](https://pages.cloudflare.com/) | 部署与托管平台 |

## 安装与运行

### 前提条件

- Node.js
- pnpm

### 安装步骤

1. 克隆仓库

```bash
git clone git@github.com:goatpretty/goatpretty.com.git
cd goatpretty.com
```

2. 安装依赖

```bash
pnpm install
```

3. 开发模式运行

```bash
pnpm run dev
```

4. 构建项目

```bash
pnpm run build
```

5. 预览构建结果

```bash
pnpm run preview
```

## 项目结构

```
/
├── public/            # 静态资源目录
├── src/
│   ├── components/    # 可复用的UI组件
│   ├── data/          # 博客文章和关于页面的Markdown文件
│   ├── layout/        # 页面布局组件
│   ├── pages/         # 页面路由
│   └── styles/        # 全局样式
├── config.ts          # 网站配置文件
├── astro.config.mjs   # Astro配置
└── tailwind.config.mjs # TailwindCSS配置
```

## 内容管理

博客文章存储在`src/data/posts/`目录下，使用Markdown格式编写。每篇文章需要包含以下前置元数据：

```markdown
---
title: '文章标题'
publishDate: 'YYYY-MM-DD'
description: '文章描述'
introText: '文章引入'
author: '作者名'
tags: ['标签1', '标签2']
slug: '文章slug'
---

文章内容...
```

## 自定义配置

网站的基本配置可以在`config.ts`文件中修改，包括网站标题、描述、作者信息、社交媒体链接等。

## 部署

该项目已配置为可部署到Cloudflare Pages，当前部署地址为：[https://goatpretty.com](https://goatpretty.com)

## 许可证

[MIT](LICENSE)

## 联系方式

如有任何问题或建议，请通过以下方式联系：

- Email: goatpretty@foxmail.com
- GitHub: [GoatPretty](https://github.com/goatpretty)
```