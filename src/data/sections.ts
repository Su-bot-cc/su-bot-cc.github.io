/* ============================================================
   Home 首页的 4 张导览卡
   —— 改区块标题、说明、配图，都在这里。

   image 那一行的写法有两种：
     1. 'guide-photography.png'   → 用一张图
     2. null                     → 不要图，改用深绿色的文字面板（Research Tools 就是这种）

   panel 数组只在 image 为 null 时生效，用来在绿色面板上列几行字。
   ============================================================ */

export const sections = [
  {
    num: '01',
    label: 'PHOTOGRAPHY',
    title: 'Photography',
    desc: '从宏观到微观的跨尺度成像。',
    href: '/photography',
    image: 'guide-photography.png' as string | null,
    alt: '叶上带露珠的灰蝶',
    panel: [] as string[],
    wide: true, // true = 这张卡占宽位；false = 占窄位。宽窄交替排布
  },
  {
    num: '02',
    label: 'ACADEMICABIN',
    title: 'Academicabin',
    desc: '研究笔记与科普长文，写给自己也写给愿意读的人。',
    href: '/academicabin',
    image: 'guide-academicabin.png' as string | null,
    alt: '野外笔记本与标本',
    panel: [] as string[],
    wide: false,
  },
  {
    num: '03',
    label: 'RESEARCH TOOLS',
    title: 'Research Tools',
    desc: '比对、建树、注释、检索——我自己反复打开的那几个站点。',
    href: '/research-tools',
    image: null as string | null,
    alt: '',
    panel: ['NCBI BLAST', 'Ensembl BioMart', 'IQ-TREE / ModelFinder', 'FigTree'],
    wide: false,
  },
  {
    num: '04',
    label: 'ABOUT ME',
    title: 'About me',
    desc: '教育与研究经历、发表列表、可下载的个人简历。',
    href: '/about',
    image: 'guide-about.png' as string | null,
    alt: '溪流边采集水生昆虫幼虫的研究者',
    panel: [] as string[],
    wide: true,
  },
];
