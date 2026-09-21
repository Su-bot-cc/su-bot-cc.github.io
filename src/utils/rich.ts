/* ============================================================
   文案小工具 —— 让 site.ts / photos.ts / tools.ts / cv.ts 里的文字
   支持三种最常用排版。写法就是在引号里写符号：

     \n            换行（例：'第一行\n第二行'）
     *文字*        斜体（物种拉丁名：*Branchiostoma floridae*）
     **文字**      加粗

   页面组件在渲染文案时调用 rich()，把它翻译成 <br> / <em> / <strong>。只有在成对、同行内出现时才生效，
   单个星号（比如数学里的乘号）不会被误认。

   plain() 是给不能带标签的位置用的（<meta description>、图片 alt），
   它会把 \n 变成空格、把 * 号去掉。
   ============================================================ */

const ENT: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

/** 原始文案 → 可直接渲染的 HTML */
export function rich(src: unknown): string {
  if (src == null) return '';
  let s = String(src).replace(/[&<>]/g, (c) => ENT[c]);
  s = s.replace(/\*\*([^\n*]+)\*\*/g, '<strong>$1</strong>'); // 先处理粗体，再处理斜体
  s = s.replace(/\*([^\n*]+)\*/g, '<em>$1</em>');
  s = s.replace(/\r\n?|\n/g, '<br />');
  return s;
}

/** 原始文案 → 纯文本（去掉符号、换行压平成空格） */
export function plain(src: unknown): string {
  if (src == null) return '';
  return String(src)
    .replace(/[ \t]*\r?\n[ \t]*/g, ' ')
    .replace(/\*\*?/g, '')
    .trim();
}
