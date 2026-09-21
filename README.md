# 怎么更新这个网站

> **日常更新请直接看 [`操作手册.md`](./操作手册.md)**——那份按「你要做什么」组织（加照片 / 发文章 / 改链接），一步一步照做即可。
> 本文件是**按文件组织的对照表 + 技术说明**，想查某个内容住在哪个文件、或想了解实现细节时看这份。

这份文件是给「不想碰代码、只想改内容」用的。

**一句话版本**：网站上的字和图片，都放在 `src/` 下面几个固定的文件里。打开那个文件，改引号里的字，保存，提交，一分钟后线上就更新了。你不需要理解代码是怎么工作的。

---

## 一、先看清：内容住在哪

| 你想改的东西 | 去哪个文件 |
|---|---|
| 网站标题、导航项、首页标题与自我介绍、各区块的标题和说明、页脚 | `src/site.ts` |
| Home 首页那 4 张导览卡（标题、说明、配图） | `src/data/sections.ts` |
| Photography 的照片和图注 | `src/data/photos.ts` |
| Research Tools 的工具链接 | `src/data/tools.ts` |
| About me 的经历、发表列表、联系方式 | `src/data/cv.ts` |
| Academicabin 的文章 | `src/content/posts/` 里的 `.md` 文件 |
| 图片文件本身 | `src/assets/` |

**其余文件（`src/pages/`、`src/components/`、`src/layouts/`）是版式，不是内容。**
改版式才需要动它们。日常更新内容不用碰。

---

## 二、五个区块，逐个说

### 1. Home（首页）

**改文字** → `src/site.ts` 里的 `home` 这一段：

```ts
home: {
  kicker: 'FIELD NOTES / 2019—2026',
  title: '用基因组重建生命的历史\n用镜头记录它的当下',
  intro: '演化生物学研究者，兼做科学摄影与科普写作。……',
  ctaLabel: '读我的研究',
  ctaHref: '/academicabin',
  heroImage: 'hero-beetle.png',
  ...
}
```

- `title` 里的 `\n` 表示一个换行。**保留它，或者删掉让标题连成一行**。
- `heroImage` 是首屏大图，写的是文件名，文件要真的在 `src/assets/` 里。

**首屏轮播（多张图淡入淡出）** → `src/site.ts` 里的 `home.heroSlides`：

```ts
heroSlides: [
  'hero-beetle.png',      // ← 每行一个文件名
  'plate-hero.png',
  'guide-photography.png',
],
```

- 加图：把照片丢进 `src/assets/`，然后照着复制一行引号里的文件名。
- 减图：删掉整行。**只留一张 = 不轮播**，就是一张静态大图。
- 每张停留 6 秒，淡入淡出 0.8 秒。想改速度：打开 `src/pages/index.astro`，最上面有 `SLIDE_SEC` 和 `FADE_SEC` 两个数字，改它们即可，不用碰 CSS。
- **只有横构图（宽明显大于高）的照片适合放这里**，竖图会被裁掉大半。
- 系统里开了「减弱动态效果」的访客看到的是第一张静态图，不会闪。

**改 4 张导览卡** → `src/data/sections.ts`。
每张卡有 `title`（标题）、`desc`（说明）、`image`（配图文件名）。
想让某张卡不显示图片、改成绿色文字面板，把 `image:` 后面的文件名换成 `null`，并在 `panel: ['第一行', '第二行']` 里填文字。

`wide: true / false` 控制这张卡是宽位还是窄位，现在宽窄交替，一般不用动。

### 2. Photography（影像）

**改照片** → `src/data/photos.ts`。现在是**三个独立画廊**，每个画廊一段：

```ts
{
  id: 'macro',                          // 英文标识，不要改（也是锚点地址）
  kicker: 'GALLERY 01 / 数码与胶片',      // 画廊上方小标签
  title: 'Macro world · 宏观世界',        // 画廊标题
  intro: '肉眼可见的尺度：……',            // 画廊说明
  plates: [
    {
      file: 'plate-01.png',
      title: 'Lycaenidae · 灰蝶',
      caption: '草茎上的灰蝶，晨露未干',
      note: '鳞翅目灰蝶科。翅面结构色来自鳞片的多层薄膜干涉……',
      alt: '灰蝶微距',
    },
  ],
},
```

- 顶部 `hero` 是页面最上面那张主展图；`galleries` 是下面三个画廊：
  `macro` 宏观世界（数码 / 胶片）、`micro` 微观世界（显微摄影）、`habitat` 自然生境。
- **加照片**：在某个画廊的 `plates` 里复制一整段（从 `{` 到 `},`），改掉里面的字，再把图片文件放进 `src/assets/`。
- **删照片**：删掉那一整段即可。
- **把照片挪到别的画廊**：把那一整段剪切，粘贴到另一个画廊的 `plates` 里。
- **加第四个画廊**：复制整个 `{ id: ... }` 这一段，改掉 `id`（用英文，且和已有的不能重复）和标题。
- 字段区别：`caption` = 缩略图和大图下面都显示的一句话；`note` = 只有点开大图才显示的详细说明（可以不写）。

**换图片文件**：直接把新图片丢进 `src/assets/`，再把数据文件里的文件名改成新的。
尺寸不用你管，Astro 会自动压缩和裁切（构建时 1.2MB 的原图会变成 10–200KB）。

**支持的图片格式**：`png` / `jpg` / `jpeg` / `webp` / `avif` / `gif`，**大小写都认**（相机直出的 `.JPG` 直接丢进去就行）。

**动图（GIF）也能用，动画会保留**：实测一张 42 帧的 GIF 进去，出来是 34 帧的动图 WebP，体积从 62KB 降到 12–27KB。
注意两点：缩略图那格仍会被裁成 1:1 正方形（动图也一样），点开大图才是完整比例；**别放太大的动图**（建议几 MB 以内、几十帧以内），否则构建时可能因为内存超限失败。
不支持：相机 RAW（`.cr2` `.nef` `.arw`）、TIFF、以及 SVG——这些要先用看图软件导出成 JPG。
不管你放什么格式进去，**网站上最终输出的一律是 WebP**（更小、加载更快），转换是自动的。

**想按画廊分文件夹整理**：可以在 `src/assets/` 下建子文件夹，比如 `assets/macro/`、`assets/habitat/`。
这时数据文件里的 `file` 要带上文件夹名：`file: 'macro/IMG_1234.jpg'`。不建文件夹也完全没问题。

### 3. Academicabin（博客）

**每篇文章是一个 `.md` 文件**，放在 `src/content/posts/`。

文件名决定网址：`no-single-best-tree.md` → 网址是 `/posts/no-single-best-tree`。
**文件名用英文**，中文也可以但网址会变成一长串编码。

**写一篇新文章**：在 `src/content/posts/` 新建 `my-new-post.md`，开头这样写：

```
---
title: 文章标题
date: 2026-09-20
tag: 方法学
summary: 列表页上显示的那句话。
---

正文从这里开始。用 Markdown 写：
## 这是二级标题
**这是加粗**
```

开头的 `---` 之间那块叫 frontmatter，是文章的信息卡。**列表页显示的标题、日期、标签、摘要都从这里读**，不是从正文里的一级标题读。

**⚠️ 最容易写错的三点**：
1. 冒号后面必须有一个空格：`title: xxx` 对，`title:xxx` 错。
2. 日期写成 `2026-09-20`，不要加引号。
3. 四项（title / date / tag / summary）缺一项会导致**构建失败**。

**不想发布某篇**：在 frontmatter 里加一行 `draft: true`，它就不会出现在列表里。

**正文里插图片**：图片放 `src/assets/posts/`（文件夹自己建），正文里写 `![说明](../../assets/posts/xxx.jpg)`。
往上退两级 `../../` 不能少——文章在 `src/content/posts/`，要退两级才回到 `src/`。
三种写法都已实测可用：`../../assets/xxx.jpg`（自动压缩，推荐）、`../../assets/posts/xxx.jpg`（子文件夹）、`/images/xxx.jpg`（图片放 `public/images/`，好记但不压缩）。

### 4. Research Tools（工具链接）

→ `src/data/tools.ts`。每个链接三项：

```ts
{
  name: 'NCBI BLAST',
  url: 'https://blast.ncbi.nlm.nih.gov/Blast.cgi',
  note: '同源序列检索，确认片段身份的第一道关。',
},
```

`url` 必须是完整地址，带 `https://`。
想加一个新分组（比如「数据可视化」），复制整个 `group` 段改名字。

### 5. About me（简历）

→ `src/data/cv.ts`。

- `contact` 是左栏联系信息。`href` 留空字符串 `''` 就不做成链接（比如语言、时区）。
- `cvSections` 是右栏，现在是「教育 / 研究经历 / 发表选录」三组。
  加一段经历 = 复制 `items` 里的一整段；加一个分组 = 复制整个 `cvSections` 里的一段。

**简历 PDF**：把 `cv.pdf` 放进 `public/` 目录，链接就自动生效（路径在 `src/site.ts` 的 `cvLinkHref`）。

**页面背景图版**：Academicabin 页右侧有一幅石斛兰线稿、Research Tools 页右侧有一幅显微镜线稿（`public/bg-academicabin.webp`、`public/bg-research-tools.webp`）。
它们已经烘焙成半透明墨线，改浓淡要重跑生成脚本：改 `scripts/make-watermark.mjs` 里的 `SCALE`（0.12 更淡 / 0.3 更明显），然后在 `su-site` 目录执行 `node scripts/make-watermark.mjs`。位置和大小在两个页面文件的 `.page-wrap` 样式里调。手机上自动隐藏。

### 另外两处：导航与页脚

都在 `src/site.ts`：

- `nav` 数组 = 顶部导航。加一项就复制一行，注意 `href` 要和 `src/pages/` 下的文件名对应。
- `footer` = 页脚署名和右侧三个链接（Email / ORCID / Google Scholar）。

---

## 三、三种改法

### 方法 A：GitHub 网页上直接改（最省事，推荐）

1. 打开你的仓库页面
2. 点进要改的文件，右上角**铅笔图标**（Edit this file）
3. 改完，拉到页面最底部
4. 在 "Commit changes" 上面的框里写一句说明，比如「更新简介」
5. 点绿色的 **Commit changes**

不用装任何东西，平板电脑上也能改。**大约 1 分钟后线上自动更新。**

### 方法 B：本地改（改版式、换图片时用这个）

```bash
npm run dev        # 启动本地预览，打开 http://localhost:4321
# 边改边看，浏览器会自动刷新
git add .
git commit -m "更新了照片"
git push           # 推上去之后线上自动更新
```

比方法 A 多的价值是**先看见再发布**。

### 方法 C：接一个后台编辑器（现在不建议）

Decap CMS、TinaCMS 这类能做到像 WordPress 一样在网页后台写文章。
建议先别上：多一套配置、多一层出错可能，而你改内容的频率大概率一个月不到一次。
内容本来就在独立文件里，将来想加随时能加。

---

## 四、出问题怎么办

| 现象 | 原因与处理 |
|---|---|
| 线上没变化 | 先按 Ctrl+F5（Mac: Cmd+Shift+R）硬刷新。十次有九次是 CDN 缓存 |
| 收到「构建失败」邮件 | 通常是 `.md` 的 frontmatter 写错了。**线上仍然是改之前那一版**，访客看不出问题。改回去再提交一次即可 |
| 图片位置显示「缺图：xxx.png」 | 数据文件里写的文件名和 `src/assets/` 里的实际文件名对不上。注意大小写和扩展名 |
| 改错了想退回去 | 这就是 Git 的作用：GitHub 仓库页面点 Commits，找到之前那次，一键回退 |
| 本地跑不起来 | 先确认 Node.js 装了，然后重新执行 `npm install` |

**最重要的一条**：改坏了不会让网站白屏。构建失败时线上继续跑着上一版，你不会「把网站改坏」。

---

## 五、日常命令

```bash
npm install   # 第一次拿到项目时执行一次
npm run dev   # 本地预览，边改边看
npm run build # 生成 dist/ 静态文件（部署平台会自动做这步）
```

---

## 六、技术说明（给将来的你或接手的人）

- **Astro 7 + 纯静态输出**，无数据库、无后端、无客户端 JS 框架。
- **零外部字体**：全部使用系统字体栈。原因——Google Fonts 在国内访问不稳定，而中文字体子集体积过大。
- **滚动渐显**用 CSS 原生 `animation-timeline: view()`，零 JS。浏览器不支持时（Firefox）元素直接可见，内容不受影响，属于渐进增强。
- **横向作品墙**用 `overflow-x` + `scroll-snap`，零 JS，触屏滑动和鼠标拖动都可用。
- **大图浮层**用浏览器原生 Popover API（`popovertarget` 属性），零 JS：点缩略图打开，按 Esc 或点图片外的暗处自动关闭，右上角的 CLOSE 也能关。
- **动效只动 `transform` / `opacity`**，并包在 `prefers-reduced-motion` 里，尊重系统「减弱动态效果」设置。
- 图片由 Astro 在构建时统一压缩为 WebP 并生成多尺寸。
