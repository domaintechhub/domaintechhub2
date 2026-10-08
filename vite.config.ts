import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}/`
  : '/';

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

export default defineConfig(({ mode }) => {
  return {
    base,
    plugins: [
      react(), 
      tailwindcss(),
      nonBlockingCssPlugin(),
      dynamicSitemapPlugin()
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
