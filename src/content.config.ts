/* ============================================================
   文章集合定义 —— 你不需要改这个文件。

   它只做一件事：告诉 Astro「src/content/posts/ 里的 .md 文件是文章」，
   并且规定每篇文章开头必须写哪几项信息（title / date / tag / summary）。

   想给文章增加一个新字段（比如 cover 配图），才需要动这里。
   ============================================================ */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // 自动收集 src/content/posts/ 下所有 .md 文件
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),          // 标题
    date: z.coerce.date(),      // 日期，写作 2026-08-14
    tag: z.string(),            // 标签，比如「方法学」
    summary: z.string(),        // 列表页显示的一句话摘要
    draft: z.boolean().default(false), // true = 草稿，不上线
  }),
});

export const collections = { posts };
