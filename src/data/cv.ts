/* ============================================================
   About me 简历内容
   —— 改经历、发表列表、联系方式，都在这里。

   contact 是左栏的联系信息；sections 是右栏的经历分组。
   想加一段经历，就复制 items 里的一整段改掉内容。
   想加一个分组（比如「教学」「获奖」），复制整个 sections 里的一段。
   ============================================================ */

export const contact = [
  // href 写成 mailto:邮箱 就能点击直接发信；写空字符串 '' 就不做成链接
  { label: '邮箱', value: 'liush@stu.xmu.edu.cn', href: 'mailto:liush@stu.xmu.edu.cn' },
  { label: 'ORCID', value: '0009-0001-1676-8263', href: 'https://orcid.org/0009-0001-1676-8263' },
  { label: '语言', value: '中文 / English', href: '' },
  { label: '时区', value: 'GMT+8 · 远程协作', href: '' },
];

export const cvSections = [
  {
    title: '教育',
    items: [
      {
        period: '2024 — 至今',
        title: '博士 · 进化发育生物学',
        note: '文昌鱼，斑马鱼，evodevo',
      },
       {
        period: '2020 — 2024',
        title: '硕士 · 发育生物学',
        note: '斑马鱼,跨尺度成像',
      },
      {
        period: '2016 — 2020',
        title: '学士 · 水产养殖学/鱼类学',
        note: '野外采集与分类学训练，系统发育分析。',
      },
    ],
  },
  {
    title: '研究经历',
    items: [
      {
        period: '2024 — 至今',
        title: '待更新。',
        note: '待更新。',
      },
      {
        period: '2016 — 2024',
        title: '吻虾虎鱼的分类与系统发育',
        note: 'The goby genus Rhinogobius represents a prominent radiation of freshwater fishes in East Asia, with China serving as its evolutionary hotspot harboring over 39 endemic species. Despite their ecological dominance in riverine ecosystems, phylogenetic relationships among mainland Chinese Rhinogobius species remain poorly resolved due to limited sampling and morphological conservatism, particularly in meristic traits traditionally used for classification.',
      },
    ],
  },
  {
    title: '发表选录',
    items: [
      {
        period: '2026',
        title: '系统发育基因组学揭示中国大陆吻虾虎鱼南北分化与形态演化',
        note: 'Liu, S., Xue, Q., Hu, Y., Hu, J., Pan, Y., Bu, Y., Wang, J., Xia 夏建宏, J., Li 李晨虹, C., 2026. Phylogenomics of Rhinogobius gobies reveal northern-southern divergence and trait evolution in China. Molecular Phylogenetics and Evolution 218, 108577. https://doi.org/10.1016/j.ympev.2026.108577',
      
      },
    ],
  },
];
