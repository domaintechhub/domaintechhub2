#!/usr/bin/env node
/**
 * Dynamic Sitemap Crawler & Generator
 * Crawls route definitions in App.tsx and corresponding dataset collections (src/data/servicesData.ts),
 * dynamically generating sitemaps with only real HTML pages on SITE_URL.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteConfigPath = path.resolve(__dirname, 'src/config/site.ts');
const siteConfigContent = fs.existsSync(siteConfigPath)
  ? fs.readFileSync(siteConfigPath, 'utf8')
  : '';
const siteUrlMatch = siteConfigContent.match(/SITE_URL\s*=\s*['"]([^'"]+)['"]/);
const BASE_URL = siteUrlMatch ? siteUrlMatch[1] : 'https://www.domaintechhubs.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const appTsxPath = path.resolve(__dirname, 'src/App.tsx');
const servicesPath = path.resolve(__dirname, 'src/data/servicesData.ts');
const publicDir = path.resolve(__dirname, 'public');

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * 1. Crawl App.tsx route definitions (real HTML pages only)
 */
export function crawlAppRoutes() {
  if (!fs.existsSync(appTsxPath)) {
    console.warn(`[sitemap-crawler] App.tsx not found at ${appTsxPath}`);
    return [];
  }

  const content = fs.readFileSync(appTsxPath, 'utf8');

  // Parse PageRoute union (e.g. export type PageRoute = 'home' | 'services' | ...)
  const pageRouteMatch = content.match(/export\s+type\s+PageRoute\s*=\s*([^;]+);/);
  const declaredRoutes = pageRouteMatch
    ? pageRouteMatch[1].split('|').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean)
    : [];

  // Filter out internal/private or wrapper routes
  const filteredDeclared = declaredRoutes.filter(r => r !== 'portal' && r !== 'more' && r !== 'tools');

  const routeMeta = {
    home: { path: '', priority: '1.0', changefreq: 'daily', title: 'Home - Domain Tech Hub' },
    about: { path: 'about', priority: '0.95', changefreq: 'weekly', title: 'About Us' },
    services: { path: 'services', priority: '0.95', changefreq: 'weekly', title: 'Engineering Services' },
    portfolio: { path: 'portfolio', priority: '0.95', changefreq: 'weekly', title: 'Case Studies & Portfolio' },
    insights: { path: 'insights', priority: '0.95', changefreq: 'daily', title: 'Engineering Insights & Knowledge Base' },
    faq: { path: 'faq', priority: '0.85', changefreq: 'weekly', title: 'Frequently Asked Questions' },
    contact: { path: 'contact', priority: '0.90', changefreq: 'weekly', title: 'Contact & Discovery Session' },
    roadmap: { path: 'roadmap', priority: '0.85', changefreq: 'weekly', title: 'Sprint Roadmap & Delivery Methodology' },
    team: { path: 'team', priority: '0.85', changefreq: 'weekly', title: 'Engineering Team & Leadership' },
  };

  const pages = [];
  for (const route of filteredDeclared) {
    if (routeMeta[route]) {
      pages.push(routeMeta[route]);
    } else {
      pages.push({ path: route, priority: '0.80', changefreq: 'weekly', title: `${route.charAt(0).toUpperCase() + route.slice(1)} - Domain Tech Hub` });
    }
  }

  // Additional real HTML routes from App.tsx router
  const additionalTargets = [
    { path: 'blog', priority: '0.90', changefreq: 'daily', title: 'Engineering Blog' },
    { path: 'tech-stack', priority: '0.85', changefreq: 'monthly', title: 'Tech Stack & Infrastructure' },
    { path: 'tools/calculator', priority: '0.90', changefreq: 'weekly', title: 'Project Cost & Scope Calculator' },
    { path: 'tools/audit', priority: '0.90', changefreq: 'weekly', title: 'Core Web Vitals & SEO Speed Audit' },
    { path: 'tools/domains', priority: '0.85', changefreq: 'monthly', title: '.co.ke Domain Registration & Hosting' },
  ];

  for (const add of additionalTargets) {
    if (!pages.some(p => p.path === add.path)) {
      pages.push(add);
    }
  }

  return pages;
}

/**
 * 2. Crawl all 16 real engineering services from src/data/servicesData.ts (no alias slugs)
 */
export function crawlServices() {
  if (!fs.existsSync(servicesPath)) return [];
  const content = fs.readFileSync(servicesPath, 'utf8');
  const services = [];
  const serviceRegex = /id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = serviceRegex.exec(content)) !== null) {
    if (
      match[1] !== 'all' &&
      !match[1].startsWith('crm_') &&
      !match[1].startsWith('maintenance_') &&
      !match[1].startsWith('branding_') &&
      !match[1].startsWith('web_') &&
      !match[1].startsWith('seo_') &&
      match[1] !== 'ecommerce'
    ) {
      services.push({
        path: `services/${match[1]}`,
        title: match[2],
        priority: '0.90',
        changefreq: 'weekly',
      });
    }
  }

  return services;
}

/**
 * 3. Crawl interactive tools
 */
export function crawlTools() {
  return [
    { path: 'tools/calculator', title: 'Project Cost & Scope Calculator', priority: '0.90', changefreq: 'weekly' },
    { path: 'tools/audit', title: 'Core Web Vitals & SEO Speed Audit Scanner', priority: '0.90', changefreq: 'weekly' },
    { path: 'tools/domains', title: '.co.ke Domain Registration & NVMe Hosting Portal', priority: '0.85', changefreq: 'monthly' },
  ];
}

// Generate Individual Sitemaps
export function generatePagesSitemap(pages) {
  const items = pages.map(route => {
    const loc = route.path ? `${BASE_URL}/${route.path}` : `${BASE_URL}/`;
    const hreflang = `\n    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />`;

    return `  <!-- ${escapeXml(route.title)} -->
  <url>
    <loc>${loc}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${hreflang}
  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${items}

</urlset>
`;
}

export function generateServicesSitemap(services) {
  const items = services.map(s => `  <!-- ${escapeXml(s.title)} -->
  <url>
    <loc>${BASE_URL}/${s.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${s.changefreq}</changefreq>
    <priority>${s.priority}</priority>
  </url>`).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Core Services Hub -->
  <url>
    <loc>${BASE_URL}/services</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>

${items}

</urlset>
`;
}

export function generateArticlesSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Knowledge Base & Blog Hubs -->
  <url>
    <loc>${BASE_URL}/insights</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>

  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>

</urlset>
`;
}

export function generatePortfolioSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Portfolio Hub -->
  <url>
    <loc>${BASE_URL}/portfolio</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>

</urlset>
`;
}

export function generateToolsSitemap(tools) {
  const items = tools.map(t => `  <!-- Tool: ${escapeXml(t.title)} -->
  <url>
    <loc>${BASE_URL}/${t.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${t.changefreq || 'monthly'}</changefreq>
    <priority>${t.priority}</priority>
  </url>`).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${items}

</urlset>
`;
}

export function generateMasterSitemap(pages, services) {
  const seenLocs = new Set();

  const pageItems = pages
    .map(p => {
      const loc = p.path ? `${BASE_URL}/${p.path}` : `${BASE_URL}/`;
      if (seenLocs.has(loc)) return null;
      seenLocs.add(loc);
      return `  <!-- ${escapeXml(p.title)} -->\n  <url>\n    <loc>${loc}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`;
    })
    .filter(Boolean)
    .join('\n\n');

  const serviceItems = services
    .map(s => {
      const loc = `${BASE_URL}/${s.path}`;
      if (seenLocs.has(loc)) return null;
      seenLocs.add(loc);
      return `  <!-- ${escapeXml(s.title)} -->\n  <url>\n    <loc>${loc}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${s.changefreq}</changefreq>\n    <priority>${s.priority}</priority>\n  </url>`;
    })
    .filter(Boolean)
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- ==================== CORE NAVIGATION PAGES ==================== -->
${pageItems}

  <!-- ==================== ALL 16 ENGINEERING SERVICES ==================== -->
${serviceItems}

</urlset>
`;
}

export function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-articles.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-portfolio.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-tools.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

export function runCrawler() {
  console.log('[sitemap-crawler] Crawling real HTML routes from App.tsx and servicesData.ts...');

  const pages = crawlAppRoutes();
  const services = crawlServices();
  const tools = crawlTools();

  console.log(`[sitemap-crawler] Discovered:
  - Core Pages: ${pages.length}
  - Real Services: ${services.length}
  - Tools: ${tools.length}`);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), generatePagesSitemap(pages), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-services.xml'), generateServicesSitemap(services), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-articles.xml'), generateArticlesSitemap(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-portfolio.xml'), generatePortfolioSitemap(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), generateToolsSitemap(tools), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateMasterSitemap(pages, services), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), generateSitemapIndex(), 'utf-8');

  console.log('[sitemap-crawler] Successfully updated all sitemaps in /public.');
}

// Execute when invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCrawler();
}
