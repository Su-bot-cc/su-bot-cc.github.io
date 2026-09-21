/* ============================================================
   英文版内容（只供 /en/about 这一页使用）
   —— 想改英文内容，改这一个文件就够了。中文内容仍在
      src/data/cv.ts 和 src/site.ts 里，两边互不影响。

   规则跟中文版一样：只改英文单引号 ' ' 里的字，
   每行末尾的逗号保留。英文没写到的地方不会出错，
   但也不会自动回退成中文——缺了就是空的。
   ============================================================ */

/** 页面标题、说明、切换器文案 */
export const enAbout = {
  kicker: 'CURRICULUM VITAE',
  title: 'About me',
  intro:
    'I work on evolutionary biology and write about it for a general audience. I care about how the tree of life grew into its present shape — and about how we can tell that it did.',
  cvLinkLabel: 'Download PDF CV',
  cvLinkHref: '/cv.pdf', // 把 cv.pdf 放进 public/ 目录即可
  portrait: 'coelacanth.jpg',
  portraitAlt: 'Pen-and-ink natural history illustration of a coelacanth (Latimeria chalumnae) with its three-lobed tail and lobed fins',
  footerNote: 'Last updated 2026-09',
};

/** 左栏联系方式。href 留空字符串 '' 就不做成链接。 */
export const enContact = [
  { label: 'Email', value: 'liush@stu.xmu.edu.cn', href: 'mailto:liush@stu.xmu.edu.cn' },
  { label: 'ORCID', value: '0009-0001-1676-8263', href: 'https://orcid.org/0009-0001-1676-8263' },
  { label: 'Languages', value: 'Chinese / English', href: '' },
  { label: 'Time zone', value: 'GMT+8 · remote collaboration', href: '' },
];

/** 右栏经历。加一段 = 复制 items 里的一整段；加一个分组 = 复制整个下面的一段。 */
export const enCvSections = [
  {
    title: 'Education',
    items: [
      {
        period: '2024 — present',
        title: 'PhD · Evolutionary Developmental Biology',
        note: 'Amphioxus,zebrafish... Evo-devo.',
      },
      {
        period: '2020 — 2024',
        title: 'MSc · Developmental Biology',
        note: 'Zebrafish; cross-scale imaging.',
      },
      {
        period: '2016 — 2020',
        title: 'BSc · Aquaculture, Ichthyology',
        note: 'Field collection and taxonomic training; phylogenetic analysis.',
      },
    ],
  },
  {
    title: 'Research',
    items: [
      {
        period: '2024 — present',
        title: 'To be updated.',
        note: 'To be updated.',
      },
      {
        period: '2016 — 2024',
        title: 'Freshwater gobies taxonomy and phylogeny',
        note: 'The goby genus Rhinogobius represents a prominent radiation of freshwater fishes in East Asia, with China serving as its evolutionary hotspot harboring over 39 endemic species. Despite their ecological dominance in riverine ecosystems, phylogenetic relationships among mainland Chinese Rhinogobius species remain poorly resolved due to limited sampling and morphological conservatism, particularly in meristic traits traditionally used for classification.',
      },
    ],
  },
  {
    title: 'Selected publications',
    items: [
      {
        period: '2026',
        title: 'Phylogenomics of Rhinogobius gobies reveals northern–southern divergence and trait evolution in China',
        note: 'Liu, S., Xue, Q., Hu, Y., Hu, J., Pan, Y., Bu, Y., Wang, J., Xia, J., Li, C., 2026. Phylogenomics of Rhinogobius gobies reveal northern-southern divergence and trait evolution in China. Molecular Phylogenetics and Evolution 218, 108577. https://doi.org/10.1016/j.ympev.2026.108577',
      },
    ],
  },
];

/** 英文页的导航：前四项仍指向中文页，About me 指向英文页自身 */
export const enNav = [
  { label: 'Home', href: '/' },
  { label: 'Photography', href: '/photography' },
  { label: 'Academicabin', href: '/academicabin' },
  { label: 'Research Tools', href: '/research-tools' },
  { label: 'About me', href: '/en/about' },
];
