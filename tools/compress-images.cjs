/* ============================================================
   图片批量压缩工具

   做什么：把 src/assets/ 里的图统一压到「够用就好」的尺寸，
           原图自动备份到项目根目录的 _原始图备份/ 里。

   不做什么：不碰动图（gif）。动图的压缩方式不同，见文件末尾说明。

   用法：双击 tools\压缩图片.bat，或在项目目录执行
         node tools/compress-images.cjs
   可调参数：下面的 MAX_EDGE（长边上限）和 QUALITY（质量）。
   ============================================================ */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'src', 'assets');
const BACKUP = path.join(ROOT, '_原始图备份');

/* ---- 可调参数 ---- */
const MAX_EDGE = 2400; // 长边上限（像素）。1920 屏幕够用，2560 也够，再大纯浪费
const QUALITY = 82; // JPEG/WebP 质量 0-100。82 是肉眼无损与体积的最佳平衡
const PNG_MAX_EDGE = 2400; // PNG 同标准

const EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

let changed = 0;
let savedBytes = 0;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name.startsWith('_')) continue;
      walk(p, out);
    } else if (EXTS.includes(path.extname(name).toLowerCase())) {
      out.push(p);
    }
  }
  return out;
}

(async () => {
  if (!fs.existsSync(ASSETS)) {
    console.log('找不到 src/assets，脚本要在项目根目录运行。');
    process.exit(1);
  }
  fs.mkdirSync(BACKUP, { recursive: true });

  const files = walk(ASSETS);
  console.log(`共 ${files.length} 张图片待检查\n`);

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    let meta;
    try {
      meta = await sharp(file).metadata();
    } catch (e) {
      console.log(`  跳过（读不了）：${rel}`);
      continue;
    }
    try {
      await processOne(file, rel, meta);
    } catch (e) {
      console.log(`  跳过（写不了，可能正被别的程序占用）：${rel} —— ${e.code || e.message}`);
    }
  }

  console.log('\n----------------------------------------');
  console.log(changed === 0 ? '所有图片都已在标准内，无需处理。' : `完成：处理 ${changed} 张，省下 ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`原图备份在：${BACKUP}`);
  console.log('\n动图（gif）不在这个脚本的处理范围：它是多帧的，');
  console.log('缩放和抽帧要在 ImageJ / ffmpeg 里做，方法见操作手册。');
})();

async function processOne(file, rel, meta) {
    const long = Math.max(meta.width || 0, meta.height || 0);
    const before = fs.statSync(file).size;

    // 尺寸已经在标准内、体积也不大的，不动它
    if (long <= MAX_EDGE && before < 800 * 1024) return;

    // 备份原图，按原目录结构存放
    const bak = path.join(BACKUP, rel);
    fs.mkdirSync(path.dirname(bak), { recursive: true });
    if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);

    const isPng = meta.format === 'png';
    const target = isPng ? PNG_MAX_EDGE : MAX_EDGE;

    let pipeline = sharp(file, { animated: false });
    if (long > target) {
      pipeline = pipeline.resize({
        width: meta.width >= meta.height ? target : undefined,
        height: meta.height > meta.width ? target : undefined,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    let buf;
    if (isPng) {
      buf = await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer();
    } else if (meta.format === 'webp') {
      buf = await pipeline.webp({ quality: QUALITY }).toBuffer();
    } else {
      buf = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
    }

    // 压完反而更大就保留原图（极少见，多见于已经高度优化的图）
    if (buf.length >= before) {
      console.log(
        `  没变小：${rel}（${(before / 1024).toFixed(0)} KB）。` +
          (isPng ? 'PNG 是无损格式，压不动——导出成 JPG 再放进来会小很多。' : ''),
      );
      return;
    }

    // 先写临时文件再替换，避免写一半失败把原图毁掉
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, buf);
    try {
      fs.renameSync(tmp, file);
    } catch (e) {
      fs.rmSync(tmp, { force: true });
      throw e;
    }

    const after = buf.length;
    savedBytes += before - after;
    changed++;
    console.log(
      `  压缩：${rel}\n    ${meta.width}×${meta.height} → 长边 ${Math.min(long, target)} | ` +
        `${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024).toFixed(0)} KB`,
    );
  }
