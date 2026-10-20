import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { parseAppRoute } from './src/utils/routing.ts';
import { injectSeoIntoHtml } from './scripts/prerender-pages.ts';
import type { PageRoute } from './src/App.tsx';
import { performLiveAudit } from './src/utils/liveUrlAuditor.ts';

process.env.VITE_CONFIG_NATIVE_IGNORE_WARNING = 'true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = process.env.VITE_BASE_PATH || '/';

// Non-blocking CSS plugin: converts blocking stylesheet link into preload + onload swap during build
function nonBlockingCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-non-blocking-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(
        /<link\s+([^>]*?rel=["']stylesheet["'][^>]*?)>/gi,
        (match) => {
          const hrefMatch = match.match(/href=["']([^"']+)["']/i);
          if (!hrefMatch) return match;
          const href = hrefMatch[1];
          const hasCrossorigin = /crossorigin/i.test(match);
          const crossorigin = hasCrossorigin ? ' crossorigin' : '';
          return `<link rel="preload" as="style" href="${href}"${crossorigin} onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"${crossorigin}></noscript>`;
        }
      );
    }
  };
}

// Dynamic sitemap crawler plugin: crawls App.tsx routes and data registries before build bundle
function dynamicSitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-dynamic-sitemap-crawler',
    apply: 'build',
    async buildStart() {
      const { runCrawler } = await import('./generate-sitemaps.js');
      runCrawler();
    }
  };
}

// Route-aware SEO HTML & HTTP 404 status plugin for dev and preview servers
function routeSeoAnd404Plugin(): Plugin {
  const isInternalOrStaticAsset = (pathname: string): boolean => {
    if (
      pathname.startsWith('/@') ||
      pathname.startsWith('/src/') ||
      pathname.startsWith('/node_modules/') ||
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/fonts/') ||
      pathname.startsWith('/markdown/') ||
      pathname.startsWith('/.well-known/') ||
      pathname.startsWith('/api/')
    ) {
      return true;
    }
    if (/\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith('.html')) {
      return true;
    }
    const publicFile = path.join(__dirname, 'public', pathname);
    if (pathname !== '/' && fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) {
      return true;
    }
    return false;
  };

  const handleApiAudit = async (req: any, res: any, next: any) => {
    if (req.url && req.url.startsWith('/api/seo-audit')) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
      }

      try {
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const targetUrl = urlObj.searchParams.get('url');
        const keyword = urlObj.searchParams.get('keyword') || undefined;

        if (!targetUrl) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Missing target URL parameter.' }));
          return;
        }

        const report = await performLiveAudit(targetUrl, keyword);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(report));
        return;
      } catch (err: any) {
        try {
          const urlObj = new URL(req.url, 'http://localhost:3000');
          const targetUrl = urlObj.searchParams.get('url') || 'https://www.domaintechhubs.com';
          const keyword = urlObj.searchParams.get('keyword') || undefined;
          const fallbackReport = await performLiveAudit(targetUrl, keyword);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(fallbackReport));
          return;
        } catch {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'Failed to scan the specified website.' }));
          return;
        }
      }
    }
    next();
  };

  return {
    name: 'vite-plugin-route-seo-and-404',
    configureServer(server) {
      server.middlewares.use(handleApiAudit);
      server.middlewares.use((req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) {
          return next();
        }
        const pathname = req.url.split('?')[0];
        if (isInternalOrStaticAsset(pathname)) {
          return next();
        }
        const parsed = parseAppRoute(pathname);
        if (parsed.page === 'not-found') {
          res.statusCode = 404;
          const origWriteHead = res.writeHead.bind(res);
          res.writeHead = ((statusCode: number, ...args: any[]) => {
            res.statusCode = 404;
            return origWriteHead(404, ...args);
          }) as typeof res.writeHead;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApiAudit);
      server.middlewares.use((req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) {
          return next();
        }
        const pathname = req.url.split('?')[0];
        if (isInternalOrStaticAsset(pathname)) {
          return next();
        }
        const parsed = parseAppRoute(pathname);
        if (parsed.page === 'not-found') {
          res.statusCode = 404;
          const notFoundPath = path.join(__dirname, 'dist', '404.html');
          if (fs.existsSync(notFoundPath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(notFoundPath, 'utf8'));
            return;
          }
        }
        next();
      });
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Only transform on dev server requests where ctx.originalUrl is present;
        // build pre-rendering is handled by scripts/prerender-pages.ts
        if (!ctx.server || !ctx.originalUrl) return html;
        const pathname = ctx.originalUrl.split('?')[0];
        const parsed = parseAppRoute(pathname);
        return injectSeoIntoHtml(html, parsed.page as PageRoute, parsed.subTab);
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    base,
    plugins: [
      react(), 
      tailwindcss(),
      nonBlockingCssPlugin(),
      dynamicSitemapPlugin(),
      routeSeoAnd404Plugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('framer-motion') || id.includes('motion')) {
                return 'vendor-motion';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
