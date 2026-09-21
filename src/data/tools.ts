/* ============================================================
   Research Tools 常用站点
   —— 加 / 删 / 改链接，都在这里。

   group 是分组小标题（比如「序列与比对」），
   同一分组下的条目会排在一起。想新增分组，复制一整段改 group 名。

   name    显示的名字
   url     点击后跳去的地址（必须是完整地址，带 https://）
   note    一句话说明「用它做什么」——这是这个页面最有价值的部分
   ============================================================ */

export const toolGroups = [
  {
    group: '序列与比对',
    items: [
      {
        name: 'NCBI BLAST',
        url: 'https://blast.ncbi.nlm.nih.gov/Blast.cgi',
        note: '同源序列检索，确认片段身份的第一道关。',
      },
      {
        name: 'Ensembl BioMart',
        url: 'https://www.ensembl.org/biomart/martview',
        note: '批量拉取基因、转录本与注释，比网页点选省事。',
      },
      {
        name: 'SMART结构域预测',
        url: 'https://smart.embl.de/smart/change_mode.cgi',
        note: '输入氨基酸序列，输出结构域预测',
      },
            {
        name: 'Intrans Bf',
        url: 'http://www.bio-add.org/InTranslg/',
        note: '文昌鱼转录本数据库',
      },
                  {
        name: 'ZFIN',
        url: 'https://zfin.org/',
        note: '斑马鱼数据库',
      },
                  {
        name: 'Alpha Fold',
        url: 'https://alphafoldserver.com/',
        note: '蛋白质结构预测',
      },
    ],
  },
  {
    group: '系统发育',
    items: [
      {
        name: 'IQ-TREE / ModelFinder',
        url: 'http://iqtree.cibiv.univie.ac.at/',
        note: '最大似然建树，模型选择交给 ModelFinder 自动搜。',
      },
      {
        name: 'FigTree',
        url: 'https://github.com/rambaut/figtree/releases',
        note: '树的可视化与注释，正式出图前的最后一站。',
      },
      {
        name: 'TimeTree',
        url: 'https://timetree.org/',
        note: '已发表分歧时间的快速参照，用来做数量级核查。',
      },
    ],
  },
  {
    group: '荧光蛋白与荧光基团',
    items: [
      {
        name: 'FP Base',
        url: 'https://www.fpbase.org/',
        note: '全称fluorescent protein base，关于荧光蛋白的一切信息都收录在这里',
      },
      {
        name: 'AAT Fluorescence Spectrum Viewer',
        url: 'https://www.aatbio.com/fluorescence-excitation-emission-spectrum-graph-viewer',
        note: '荧光分子有效激发波长查询及效率计算站点-1',
      },
      {
        name: 'Thermo Fluorescence SpectraViewer',
        url: 'https://www.thermofisher.com/tools/fluorescence-spectraviewer/',
        note: '荧光分子有效激发波长查询及效率计算站点-2',
      },
    ],
  },
    {
    group: '图像处理',
    items: [
      {
        name: 'Fiji/ImageJ',
        url: 'https://fiji.sc/',
        note: '可以说是最强大的开源科研图像处理软件。',
      },
    ],
  },
   {
    group: '各种计算器',
    items: [
      {
        name: 'NEB Bio calculator',
        url: 'https://www.neb.com/en/tools-and-resources/interactive-tools#Calculators',
        note: 'NEB官网内嵌的计算器，满足几乎所有湿实验计算需求',
      },
            {
        name: 'DNA序列转换成氨基酸序列',
        url: 'https://www.novopro.cn/tools/translate.html',
        note: '输入DNA序列输出氨基酸序列',
      },
            {
        name: '浓度稀释计算器',
        url: 'https://www.selleck.cn/dilutioncalculator.jsp',
        note: '稀释溶液的时候点一下这里就好了',
      },
    ],
  },
     {
    group: '友情站点',
    items: [
      {
        name: 'Actias China',
        url: 'https://www.actias-cn.com/',
        note: '一册持续生长的私人自然志。它收集林间的观察、季节的线索， 以及中国 Actias 属物种在月色中留下的短暂身影',
      },
    ],
  },
];
