/* ============================================================
   分页：纯 CSS 实现，零 JavaScript。

   原理：给每个区块生成一组隐藏的 radio 按钮，页码其实是 <label for="...">，
   点一下就切换 radio；CSS 用 `:checked ~ 兄弟选择器` 决定显示哪一段条目。
   所有条目始终都在 HTML 里，翻页只是切换显示，所以：
     - 不加载任何脚本
     - 网址不变、页面不刷新
     - 搜索引擎照常收录全部内容

   ⚠️ 结构要求（改页面时必须遵守）：
     radio 必须和「条目容器」「页码栏」是同一个父元素的兄弟节点，
     并且排在它们前面，否则 `~` 选择器不生效。radio 本身用 sr-only
     方式隐藏（不是 display:none），这样键盘 Tab 仍能聚焦。

   这套 CSS 必须全局生效（用 is:global 输出），因为选择器要从 radio
   跨到条目容器，不能被 Astro 的样式作用域限制住。
   ============================================================ */

/** 一共几页 */
export function pagesOf(count: number, perPage: number): number {
  return Math.max(1, Math.ceil(count / perPage));
}

type Opts = {
  scope: string;     // 限定「默认隐藏」规则的范围，如 '#micro'
  id: string;        // radio 的 id 前缀（页面内唯一）
  count: number;     // 条目总数
  perPage: number;   // 每页几条
  itemSel: string;   // 条目选择器，如 '.grid > .tile'
  display?: string;  // 条目显示时的 display 值
  tailSel?: string;  // 可选：每页最后一条里要藏起来的装饰元素，如 '.hairline'
};

/** 第 start 到第 end 个子元素 */
const nth = (start: number, end: number) =>
  start > 1 ? `:nth-child(n+${start}):nth-child(-n+${end})` : `:nth-child(-n+${end})`;

/** 生成这个区块需要的全部 CSS */
export function pagerCss({
  scope,
  id,
  count,
  perPage,
  itemSel,
  display = 'block',
  tailSel,
}: Opts): string {
  const P = pagesOf(count, perPage);
  const on = (k: number) => `#${id}-${k}:checked ~ `;
  const rules: string[] = [];

  // 1) 默认全部隐藏；被选中的那一页对应的一段显示出来
  rules.push(`${scope} ${itemSel} { display: none; }`);
  const show: string[] = [];
  for (let k = 1; k <= P; k++) {
    show.push(`  ${on(k)}${itemSel}${nth((k - 1) * perPage + 1, Math.min(k * perPage, count))}`);
  }
  rules.push(show.join(',\n') + ` {\n  display: ${display};\n}`);

  // 2) 当前页码高亮
  const nums: string[] = [];
  for (let k = 1; k <= P; k++) nums.push(`  ${on(k)}.pager [data-pg="${k}"]`);
  rules.push(
    nums.join(',\n') +
      ` {\n  opacity: 1;\n  color: var(--pg-on);\n  border-color: var(--pg-line);\n}`,
  );

  // 3) 只显示当前页的「上一页 / 下一页」
  const steps: string[] = [];
  for (let k = 1; k <= P; k++) steps.push(`  ${on(k)}.pager [data-step="${k}"]`);
  rules.push(steps.join(',\n') + ` {\n  display: inline-flex;\n}`);

  // 4) 键盘聚焦到页码时给对应的可见按钮描边（无障碍）
  const focus: string[] = [];
  for (let k = 1; k <= P; k++) {
    focus.push(`  #${id}-${k}:focus-visible ~ .pager [data-pg="${k}"]`);
  }
  rules.push(
    focus.join(',\n') +
      ` {\n  outline: 1px solid var(--pg-on);\n  outline-offset: 2px;\n}`,
  );

  // 5) 可选：每页最后一条末尾的分隔线去掉
  if (tailSel) {
    const tails: string[] = [];
    for (let k = 1; k <= P; k++) {
      tails.push(`  ${on(k)}${itemSel}:nth-child(${Math.min(k * perPage, count)}) ${tailSel}`);
    }
    rules.push(tails.join(',\n') + ` {\n  display: none;\n}`);
  }

  return rules.join('\n\n');
}
