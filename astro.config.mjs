import { defineConfig } from 'astro/config';

// 站点地址：绑定自己的域名后，把下面这一行换成最终域名
// （例如 https://subiology.com），RSS / 站点地图 / 绝对链接才会正确。
// 只影响线上，不影响本地预览。
export default defineConfig({
  site: 'https://su-bot-cc.github.io',
  // 纯静态输出：不依赖任何服务器运行时，可直接托管到 GitHub Pages / Vercel / Cloudflare Pages
  output: 'static',
});
