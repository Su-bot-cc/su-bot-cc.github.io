import { defineConfig } from 'astro/config';

// 站点地址：已绑定域名 academicabin.com
// （换域名时改这一行，并同步 public/CNAME）
export default defineConfig({
  site: 'https://academicabin.com',
  // 纯静态输出：不依赖任何服务器运行时，可直接托管到 GitHub Pages / Vercel / Cloudflare Pages
  output: 'static',
});
