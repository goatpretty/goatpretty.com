interface Config {
  site_title: string;
  site_description: string;
  avatar: string;
  author: string;
  author_description: string;
  github: string;
  email: string;
  email_subject: string;
  friendlink: { [key: string]: string };
  douyin: string;          // ← 新增
  bilibili: string;        // ← 新增
  wechat_qr: string;       // ← 新增

}

const config: Config = {
  site_title: 'GoatPretty —— 抽象的美羊羊',
  site_description: '排版教程、前端设计分享',
  avatar: '/prettygoat.jpg',  
  author: '抽象的美羊羊',
  author_description: '热爱前端与设计的技术羊。',
  douyin: "https://www.douyin.com/user/MS4wLjABAAAAky7ySG-REUePVrX6rezGpXlXpZNiVqbdOLsKlYMPUhU?from_tab_name=main",
  bilibili: 'https://space.bilibili.com/1172146604',
  wechat_qr: '/shoukuan.png',
  github: 'https://github.com/goatpretty',  // ← 你的 GitHub 地址
  email: 'goatpretty@foxmail.com',      // ← 你的邮箱地址
  email_subject: '来自%20GoatPretty.com%20的来信',
  friendlink: {
    "Radish Garden": 'https://luoyuxuanryan.pages.dev/',
    "Cralemonの柠檬小径": 'https://www.cralemon.com/',
    "飞天主站——你的心灵之窗": 'http://faitin-home.wikidot.com',
    "GoatPrettty·Home": 'https://goatpretty.com',
  },
};

export default config;
