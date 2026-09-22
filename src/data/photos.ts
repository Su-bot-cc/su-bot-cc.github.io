/* ============================================================
   Photography 影像档案 —— 三个独立画廊
   —— 加照片 / 删照片 / 改图注 / 改画廊标题，都在这里。

   【怎么加一张照片】
   1. 把图片文件放进 src/assets/ 文件夹
   2. 在下面某个画廊的 plates 里，照着已有的一整段复制、改掉里面的字
   3. file 改成你放进去的那个文件名（大小写要一致）

   【怎么把照片从一个画廊挪到另一个】
   把那一整段（从 { 到 },）剪切，粘贴到另一个画廊的 plates 里就行。

   字段说明：
   file     图片文件名（必须真的存在于 src/assets/ 里）
   title    学名或俗名
   caption  图注：一句话说明，也可以写拍摄参数（相机 · 镜头 · 地点）
   note     详细说明：点开大图后额外显示的那段文字，可省略
   alt      图片加载失败时显示的文字，也给读屏软件用

   【排版写法】以上四个文字字段都支持：
     \n        换行。例：'第一行\n第二行'
     *文字*    斜体。学名按惯例要斜体：title: '*Branchiostoma floridae* · 文昌鱼'
     **文字**  加粗
   注意：alt 是给读屏软件念的，不要写 * 和 \n。

   hero 是页面顶部那张主展图；galleries 是下面三个画廊。
   ============================================================ */

export type Plate = {
  file: string;
  title: string;
  caption: string;
  alt: string;
  note?: string;
};

export type Gallery = {
  id: string;      // 英文标识，同时是页面上的锚点地址，不要改
  kicker: string;  // 画廊上方的小标签
  title: string;   // 画廊标题
  intro: string;   // 画廊说明
  plates: Plate[];
};

export const hero = {
  file: 'amphioxus.jpg',
  title: '*Branchiostoma floridae* · 佛罗里达文昌鱼的神经系统',
  caption: 'ZEISS 980 confocal microscope · 20x tiled · Xiamen University · 2025-05',
  alt: 'actubulin dyed sample',
};

export const galleries: Gallery[] = [
  /* ---------- 画廊 01：微观世界（显微成像） ---------- */
  {
    id: 'micro',
    kicker: 'GALLERY 01 / 显微成像',
    title: 'Micro world · 微观世界',
    intro:
      '越过肉眼的分辨率极限：显微物镜与焦点堆栈换来的结构细节。',
    plates: [
      {
        file: 'micro/wedidit_p.png',
        title: 'A new heart \n· *Danio rerio* \n斑马鱼的初生心管',
        caption: '新生的心脏',
        note: '心肌细胞膜被荧光蛋白eGFP标记',
        alt: '共聚焦',
      },
                  {
        file: 'ancientbrain.png',
        title: 'Innervation \n· *Branchiostoma floridae* \n文昌鱼的脑泡和周边神经',
        caption: '文昌鱼',
        note: 'actubulin dyed',
        alt: '共聚焦',
      },
      {
        file: 'micro/prism.png',
        title: 'Prism \n· *strongylocentrotus intermedius* \n马粪海胆的prism幼体',
        caption: '海胆',
        note: '细胞膜用DAPI染色',
        alt: '共聚焦',
      },

    ],
  },

  /* ---------- 画廊 02：宏观世界（数码 / 胶片） ---------- */
  {
    id: 'macro',
    kicker: 'GALLERY 02 / 数码与胶片',
    title: 'Macro world · 宏观世界',
    intro:
      '肉眼可见的尺度：数码与胶片共同记录的形态、质感与行为。',
    plates: [
      {
        file: 'macro/Lucanuszhui.jpg',
        title: '*Lucanus zhui* \n· 朱氏深山锹甲',
        caption: '莽山的特有物种',
        note: 'NA',
        alt: 'NA',
      },
      {
        file: 'qusou.jpg',
        title: '*Dermaptera* \n· 蠼螋',
        caption: '具有巨大的尾夹',
        note: 'NA',
        alt: 'NA',
      },
            {
        file: 'macro/hujia.jpg',
        title: '*Cosmodela virgula* \n· 逗斑虎甲',
        caption: '中国南方广布的虎甲',
        note: 'NA',
        alt: 'NA',
      },
      {
        file: 'macro/dujia.jpg',
        title: '*Cryphaeus* \n· 毒甲',
        caption: '一种微小的拟步甲',
        note: 'NA',
        alt: 'NA',
      },
                  {
        file: 'macro/huanqiao.jpg',
        title: '*Cyclommatus scutellaris* \n· 黯环锹甲',
        caption: '武夷山初夏爆发的一种锹甲',
        note: 'NA',
        alt: 'NA',
      },
                  {
        file: 'macro/yuanjing.jpg',
        title: '*Epicauta hirticornis*\n· 豆芫菁',
        caption: '泛滥成群且有毒',
        note: 'NA',
        alt: 'NA',
      },
                  {
        file: 'macro/yangcai.jpg',
        title: '*Cheirotonus jansoni* \n· 阳彩臂金龟',
        caption: '国家二级保护动物，甲虫明星',
        note: 'NA',
        alt: 'NA',
      },
                  {
        file: 'macro/jucha.jpg',
        title: '*Lucanus hermani* \n· 巨叉深山锹甲',
        caption: '国家二级保护动物，实际广布且数量十分可观',
        note: 'NA',
        alt: 'NA',
      },
    ],
  },

  /* ---------- 画廊 03：自然生境 ---------- */
  {
    id: 'habitat',
    kicker: 'GALLERY 03 / 生境记录',
    title: 'Natural habitat · 自然生境',
    intro:
      '退后一步，把生物放回它所在的地方。',
    plates: [
      {
        file: 'habitat/wuyi.jpg',
        title: '生境 · 武夷山自然保护区',
        caption: '附生苔藓的树枝，透光的林冠',
        note: '海拔900m',
        alt: 'NA',
      },
      {
        file: 'habitat/mangshan1.jpg',
        title: '生境 · 莽山自然保护区',
        caption: '云雾林中的茶园',
        note: '海拔1200m',
        alt: 'NA',
      },
      {
        file: 'habitat/mangshan2.jpg',
        title: '生境 · 莽山自然保护区',
        caption: '云海',
        note: '海拔1200m',
        alt: 'NA',
      },
      {
        file: 'habitat/jianfeng1.jpg',
        title: '生境 · 尖峰岭自然保护区',
        caption: '鸣凤谷',
        note: '海拔800m',
        alt: 'NA',
      },
      {
        file: 'habitat/jianfeng2.jpg',
        title: '生境 · 尖峰岭自然保护区',
        caption: '尖峰岭主峰',
        note: '海拔1400m',
        alt: 'NA',
      },
    ],
  },
];

/** 全站照片总数（页面顶部小标签用） */
export const totalPlates = galleries.reduce((n, g) => n + g.plates.length, 0);
