import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context: any) {
  return rss({
    title: "GoatPretty.com | 抽象的美羊羊",
    description: "记录生活、分享灵感。",
    site: "https://goatpretty.com", // 
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>zh-cn</language>`,
  });
}
