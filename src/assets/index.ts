/* ============================================================
   图片索引 —— 你不需要改这个文件。

   它的作用：自动收集 src/assets/ 里的所有图片，
   让你在数据文件里只写一个「文件名」就能引用图片，
   同时还能享受 Astro 的自动压缩和裁切。

   换图的正确做法：把新文件丢进 src/assets/，
   然后去数据文件里把文件名字符串改成新的。
   ============================================================ */

import type { ImageMetadata } from 'astro';

/* 支持的格式：png / jpg / jpeg / webp / avif / gif，大小写都认。
   相机 RAW（.cr2 / .nef / .arw）和 TIFF 不支持，请先导出成 JPG。
   也支持在 assets/ 下建子文件夹（比如 macro/、habitat/），
   这时数据文件里的 file 要带上文件夹名，例如 'macro/IMG_1234.jpg'。 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  './**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,gif,GIF}',
  { eager: true },
);

const registry: Record<string, ImageMetadata> = {};
const byLowerName: Record<string, string> = {};
const byBaseName: Record<string, string> = {}; // 'portrait' -> 'portrait.jpg'
for (const [path, mod] of Object.entries(modules)) {
  const name = path.replace('./', '');
  registry[name] = mod.default;
  byLowerName[name.toLowerCase()] = name;
  // 去扩展名兜底：数据文件里写 .png 但实际文件是 .jpg 时也能找到
  const base = name.replace(/\.[^./]+$/, '').toLowerCase();
  if (!(base in byBaseName)) byBaseName[base] = name;
}

/** 按文件名取图片。找不到就返回 undefined，页面会留空而不是崩溃。
    容错三级：完全匹配 → 忽略大小写 → 忽略扩展名。
    也就是说写成 .png 但文件是 .JPG 也能显示，少一类「缺图」。 */
export function img(name: string): ImageMetadata | undefined {
  const exact = registry[name] ?? registry[byLowerName[name.toLowerCase()] ?? ''];
  if (exact) return exact;
  const base = name.replace(/\.[^./]+$/, '').toLowerCase();
  return registry[byBaseName[base] ?? ''];
}

/** 列出所有可用图片文件名（调试用） */
export function allImageNames(): string[] {
  return Object.keys(registry).sort();
}
