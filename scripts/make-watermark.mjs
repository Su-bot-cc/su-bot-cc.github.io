/* ============================================================
   图版水印生成脚本（已运行过，改参数后才需要重跑）
   用途：把 line-art-src/ 里的两张博物学线稿处理成页面背景用的
         半透明墨线 webp，输出到 public/。

   什么时候用它：
   - 想调整水印浓淡：改下面的 SCALE（0.12 更淡 / 0.3 更明显），
     然后执行：
       node scripts/make-watermark.mjs
   - 换了新的线稿图：改 jobs 里的 src 路径。

   它做四件事：
   1. 用干净纸面补丁盖掉 AI 生成水印（右下角）
   2. 纸底提白（让背景与页面纸色无缝）
   3. 墨色转透明通道（纸底全透明，墨线半透明）
   4. 输出 public/bg-academicabin.webp 和 public/bg-research-tools.webp

   注意：node 需要 su-site 里的依赖（sharp），在 su-site 目录下运行。
   ============================================================ */
import sharp from 'sharp';

const jobs = [
  {
    // 兰花 → Academicabin 页
    src: './line-art-src/orchid-dendrobium.png',
    out: 'public/bg-academicabin.webp',
    patch: { left: 1120, top: 700, width: 210, height: 100 }, // 克隆纸面盖水印
    patchAt: { left: 1325, top: 935 },
  },
  {
    // 显微镜 → Research Tools 页
    src: './line-art-src/microscope-monocular.png',
    out: 'public/bg-research-tools.webp',
    patch: { left: 1090, top: 730, width: 210, height: 100 },
    patchAt: { left: 1325, top: 935 },
  },
];
const SCALE = 0.21; // 墨线不透明度系数

for (const j of jobs) {
  // 1. 补水印 → 2. 提白纸底（每通道线性拉伸，纸底中位色 → 255）
  const base = sharp(j.src);
  const patchBuf = await base.clone().extract(j.patch).toBuffer();
  const patched = await base.composite([{ input: patchBuf, left: j.patchAt.left, top: j.patchAt.top }]).png().toBuffer();
  const { data, info } = await sharp(patched).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, C = info.channels;
  const rs = [], gs = [], bs = [];
  for (let y = 480; y < 620; y++)
    for (let x = 1180; x < 1360; x++) {
      const i = (y * W + x) * C;
      rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]);
    }
  const med = (a) => a.sort((p, q) => p - q)[Math.floor(a.length / 2)];
  const f = [med(rs), med(gs), med(bs)].map((v) => 255 / v);
  const whitened = await sharp(patched).linear(f, [0, 0, 0]).png().toBuffer();

  // 3. 墨色转透明通道 + 缩到 1280 宽 + 掐噪点 → 4. 输出
  const raw = await sharp(whitened).resize({ width: 1280 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = raw.info;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0, o = 0; i < raw.data.length; i += c, o += 4) {
    const l = 0.299 * raw.data[i] + 0.587 * raw.data[i + 1] + 0.114 * raw.data[i + 2];
    let a = Math.max(0, Math.min(255, Math.round((255 - l) * SCALE)));
    if (a < 5) a = 0;
    rgba[o] = 17; rgba[o + 1] = 15; rgba[o + 2] = 12;
    rgba[o + 3] = a;
  }
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(j.out);
  console.log('ok', j.out);
}
