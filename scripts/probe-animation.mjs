/**
 * 动图体检工具 —— 打印一张动画文件的「帧数 / 每帧延时 / 总时长」。
 *
 * 用途：怀疑网站上的动图播放速度和原文件不一致时，用它分别量原文件和
 *       dist/ 里的构建产物，两边的总时长相同就说明转换没有改变速度。
 *
 * 用法（在 su-site 目录下）：
 *   node scripts/probe-animation.mjs src/assets/wedidit.gif
 *   node scripts/probe-animation.mjs dist/_astro/wedidit.XXXX.webp
 *
 * 纯解析文件头，不解码像素 —— 几十 MB 的 GIF 也能秒出结果、不吃内存。
 */
import { readFileSync } from 'node:fs';

/* ---------- GIF：延时单位是 10ms，存在 Graphic Control Extension 里 ---------- */
function parseGif(path) {
  const b = readFileSync(path);
  const head = b.toString('ascii', 0, 6);
  if (head !== 'GIF89a' && head !== 'GIF87a') return { err: 'not gif: ' + head };

  const w = b.readUInt16LE(6);
  const h = b.readUInt16LE(8);
  const flags = b[10];
  let p = 13;
  if (flags & 0x80) p += 3 * (2 << (flags & 0x07)); // 全局色表

  const delays = [];
  let frames = 0;
  let loops = null;

  const skipSubBlocks = () => {
    while (p < b.length && b[p] !== 0) p += 1 + b[p];
    p += 1;
  };

  while (p < b.length) {
    const block = b[p];
    if (block === 0x3b) break; // 文件结束
    if (block === 0x21) {
      const label = b[p + 1];
      p += 2;
      if (label === 0xf9) {
        const size = b[p];
        delays.push(b.readUInt16LE(p + 2)); // 每帧延时 ×10ms
        p += 1 + size + 1;
      } else if (label === 0xff) {
        const size = b[p];
        const name = b.toString('ascii', p + 1, p + 1 + 11);
        p += 1 + size;
        if (name.startsWith('NETSCAPE') && loops === null) {
          while (p < b.length && b[p] !== 0) {
            const s = b[p];
            if (s >= 3 && b[p + 1] === 0x01) loops = b.readUInt16LE(p + 2);
            p += 1 + s;
          }
          p += 1;
        } else skipSubBlocks();
      } else skipSubBlocks();
    } else if (block === 0x2c) {
      frames++;
      const lf = b[p + 9];
      p += 10;
      if (lf & 0x80) p += 3 * (2 << (lf & 0x07)); // 局部色表
      p += 1; // LZW 最小码长
      skipSubBlocks(); // 图像数据
    } else p++;
  }

  return report(path, 'GIF', w, h, frames, delays.map((d) => d * 10), loops);
}

/* ---------- WebP：延时单位是 1ms，存在每个 ANMF 块里 ---------- */
function parseWebp(path) {
  const b = readFileSync(path);
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') {
    return { err: 'not webp' };
  }
  const u24 = (o) => b[o] | (b[o + 1] << 8) | (b[o + 2] << 16);
  let p = 12;
  const durations = [];
  let loops = null;
  let w = 0, h = 0, animated = false;

  while (p + 8 <= b.length) {
    const cc = b.toString('ascii', p, p + 4);
    const size = b.readUInt32LE(p + 4);
    const d = p + 8;
    if (cc === 'VP8X') {
      w = 1 + u24(d + 4);
      h = 1 + u24(d + 7);
      animated = !!(b[d] & 0x02);
    } else if (cc === 'ANIM') loops = b.readUInt16LE(d + 4);
    else if (cc === 'ANMF') durations.push(u24(d + 12));
    p = d + (size % 2 ? size + 1 : size);
  }
  if (!animated) return { file: path, format: 'WebP（静态，不是动图）', frames: 1 };
  return report(path, 'WebP', w, h, durations.length, durations, loops);
}

function report(file, format, w, h, frames, ms, loops) {
  const uniq = [...new Set(ms)].sort((a, b) => a - b);
  const total = ms.reduce((s, d) => s + d, 0);
  return {
    file,
    format,
    size: `${w}x${h}`,
    frames,
    perFrameMs: uniq,
    fps: uniq.length === 1 ? +(1000 / uniq[0]).toFixed(2) : '(各帧不同)',
    totalSec: +(total / 1000).toFixed(2),
    loops: loops === 0 ? '无限循环' : loops,
  };
}

for (const f of process.argv.slice(2)) {
  const isGif = f.toLowerCase().endsWith('.gif');
  console.log(JSON.stringify(isGif ? parseGif(f) : parseWebp(f), null, 2));
}
