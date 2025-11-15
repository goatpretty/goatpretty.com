import { z, defineCollection, type CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/data/posts' }),
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        description: z.string(),
        introText: z.string(),
        author: z.string(),
        publishDate: z.coerce.date(),

        /** 允许自定义 CSS，如 /styles/dangshi.css */
        customStyle: z.string().optional(),

        /** 文章更新时间 */
        lastUpdated: z.string().optional(),
    }),
});

const about = defineCollection({
    loader: glob({ pattern: 'about.md', base: './src/data/about' }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        publishDate: z.coerce.date(),
    }),
});

export const collections = { posts, about };

export type Post = CollectionEntry<"posts">;
