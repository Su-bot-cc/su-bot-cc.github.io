import { defineConfig } from 'astro/config';

// 站点地址：换成你自己的域名后，RSS / 站点地图 / 绝对链接才会正确。
// 还没有域名时保持这样即可，不影响本地预览。
export default defineConfig({
  site: 'https://su.example.org',
  // 纯静态输出：不依赖任何服务器运行时，可直接托管到 GitHub Pages / Vercel / Cloudflare Pages
  output: 'static',
});
