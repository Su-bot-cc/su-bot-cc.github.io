/* ============================================================
   ★ 全站固定文案总表 ★
   —— 改网站上的字，90% 的情况只需要改这一个文件。

   使用规则：
   1. 只改英文双引号 " " 里面的内容，不要动外面的符号。
   2. 每行末尾的逗号 , 必须保留，删掉会报错。
   3. 排版写法（引号里直接写符号，全站所有文案通用）：
        \n                换行。例：'第一行\n第二行'
        *文字*            斜体。物种拉丁名按惯例就该斜体：*Branchiostoma floridae*
        **文字**          加粗
      注：\n 只在真正渲染到页面上的文字里生效；
      浏览器标签页、搜索摘要这类地方会自动压成空格。
   4. 改完保存 → 提交到 GitHub → 约 1 分钟后线上自动更新。
   ============================================================ */

export const site = {
  /* 站点基础信息：出现在浏览器标签、搜索结果、页脚 */
  title: 'Su · 演化生物学 / 科学摄影',
  description:
    '研究笔记、实验/野外影像、常用工具，以及一些还没想清楚的问题。',
  wordmark: 'SH', // 左上角名字

  /* 顶部导航。想加一个区块，就照着下面再复制一行。
     label = 显示的字，href = 点击后去的地址（要和 src/pages/ 下的文件名对应） */
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Photography', href: '/photography' },
    { label: 'Academicabin', href: '/academicabin' },
    { label: 'Research Tools', href: '/research-tools' },
    { label: 'About me', href: '/about' },
  ],

  /* ---- Home 首页 ---- */
  home: {
    kicker: 'FIELD NOTES / 2019—2026',
    title: '用Evo&Devo重建演化\n借镜头记录生命当下',
    intro:
      '演化生物学研究，科学摄影与科普写作。这个站点是我的公开笔记本：随笔、影像、常用工具，以及一些还没想清楚的问题。',
    ctaLabel: '读我的研究与作品',
    ctaHref: '/academicabin',
    heroImage: 'hero-beetle.png', // 首屏大图，换成你的照片文件名即可
    heroAlt: '苔藓上的步甲微距',

    /* 首屏轮播：多张图轮流淡入淡出。
       - 想加图：把照片丢进 src/assets/，然后照着下面复制一行引号里的文件名。
       - 想减图：删掉整行即可。
       - 只留一张 = 不轮播，就是一张静态大图。
       - 每张停留 6 秒，切换 0.5 秒。想改速度见 index.astro 里的说明。
       - 只有横构图（宽明显大于高）的照片适合放这里，竖图会被裁掉大半。 */
    heroSlides: [
      
      'heart.gif',
      'wedidit.gif',
      'seaurchin.png',
      'amphioxus.jpg',
      'leigongma.jpg',
      'qusou.jpg',
      'wuyicover.jpg',
    ],
    guideKicker: 'SITE MAP / 04',
    guideTitle: '这个站点里有什么',
    guideIntro:
      '四个区块各自独立更新：影像归 Photography，长文归 Academicabin，常用工具单独成页，简历放在 About me。',
  },

  /* ---- Photography 影像区 ---- */
  photography: {
    kicker: 'IMAGE ARCHIVE / 三个画廊',
    title: 'Photography',
    intro:
      '科学摄影以记录为先：形态、生境、行为——从宏观到微观的跨尺度成像。',
    note: '点击任意一张可看大图说明',
    footerNote: 'Su · Photography · 2019—2026',
    footerLinkLabel: '查看全部影像',
    footerLinkHref: '/photography',
  },

  /* ---- Academicabin 博客区 ---- */
  academicabin: {
    kicker: 'ACADEMICABIN / 写作',
    title: 'Academicabin',
    intro:
      'Cabin or trash bin, that is a question. 或许有用的“学术垃圾桶”。内含研究笔记、方法复盘和科普长文。写得慢，但每篇都尽量把推理过程留下来。',
    emptyText: '还没有文章。在 src/content/posts/ 里新建一个 .md 文件就会出现在这里。',
    footerNote: 'RSS 可用 · 不追踪阅读行为',
    footerLinkLabel: '查看全部文章',
    footerLinkHref: '/academicabin',
  },

  /* ---- Research Tools 工具区 ---- */
  tools: {
    kicker: 'TOOLBOX / 常用站点',
    title: 'Research Tools',
    intro: '一些反复打开的站点，每条都注明了用它做什么，总有用的上的时候。',
    footerNote: '链接均为外部站点，失效欢迎告知',
    footerLinkHref: '/research-tools',
  },

  /* ---- About me 简历区 ---- */
  about: {
    kicker: 'CURRICULUM VITAE',
    title: 'About me',
    intro:
      '做演化生物学，也写科普。关心生命之树是怎么长出来的，也关心我们怎么知道它是这样长出来的。',
    cvLinkLabel: '下载 PDF 简历',
    cvLinkHref: '/cv.pdf', // 把你的简历 PDF 放进 public/ 目录，文件名对上即可
    portrait: 'coelacanth.jpg', // 左侧肖像：矛尾鱼（腔棘鱼）博物学线稿（portrait-sketch.jpg 人像线稿 / portrait.jpg 原照片都还留在 assets/ 里，可随时换回）
    portraitAlt: '矛尾鱼（拉蒂迈鱼，Latimeria chalumnae）的博物学钢笔线稿：三叶尾与叶状鳍的"活化石"图谱',
    footerNote: '最后更新 2026-09',
    footerLinkHref: '/',
  },

  /* ---- 页脚 ---- */
  footer: {
    credit: 'Su · 2026 · 除注明外内容采用 CC BY-NC 4.0',
    links: [
      { label: 'Email', href: 'mailto:su@example.org' },
      { label: 'ORCID', href: 'https://orcid.org/0000-0000-0000-0000' },
      { label: 'Researchgate', href: 'https://scholar.google.com/' },
    ],
  },
} as const;
