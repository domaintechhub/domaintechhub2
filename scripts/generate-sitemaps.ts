import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL } from '../src/config/site';
import { SERVICES_LIST } from '../src/data/servicesData';
import { INSIGHT_ARTICLES } from '../src/data/insightsData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const BASE_URL = SITE_URL;
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// 1. Core Navigation Pages (real HTML routes only, excluding private /portal)
const CORE_PAGES = [
  { path: '', priority: '1.0', changefreq: 'daily', title: 'Home - Domain Tech Hub' },
  { path: 'about', priority: '0.95', changefreq: 'weekly', title: 'About Us' },
  { path: 'services', priority: '0.95', changefreq: 'weekly', title: 'Engineering Services' },
  { path: 'portfolio', priority: '0.95', changefreq: 'weekly', title: 'Case Studies & Portfolio' },
  { path: 'insights', priority: '0.95', changefreq: 'daily', title: 'Engineering Insights & Knowledge Base' },
  { path: 'faq', priority: '0.85', changefreq: 'weekly', title: 'Frequently Asked Questions' },
  { path: 'contact', priority: '0.90', changefreq: 'weekly', title: 'Contact & Discovery Session' },
  { path: 'roadmap', priority: '0.85', changefreq: 'weekly', title: 'Sprint Roadmap & Delivery Methodology' },
  { path: 'team', priority: '0.85', changefreq: 'weekly', title: 'Engineering Team & Leadership' },
  { path: 'blog', priority: '0.90', changefreq: 'daily', title: 'Engineering Blog' },
  { path: 'tech-stack', priority: '0.85', changefreq: 'monthly', title: 'Tech Stack & Infrastructure' },
  { path: 'tools/calculator', priority: '0.90', changefreq: 'weekly', title: 'Project Cost & Scope Calculator' },
  { path: 'tools/audit', priority: '0.90', changefreq: 'weekly', title: 'Core Web Vitals & SEO Speed Audit' },
  { path: 'tools/domains', priority: '0.85', changefreq: 'monthly', title: '.co.ke Domain Registration & Hosting' },
];

// 2. All 16 Real Engineering Services from SERVICES_LIST (no alias slugs)
const SERVICES = SERVICES_LIST.map((s) => ({
  path: `services/${s.id}`,
  title: s.title,
  priority: '0.90',
  changefreq: 'weekly',
}));

// 3. All 20 Real Engineering Articles from INSIGHT_ARTICLES
const ARTICLES = INSIGHT_ARTICLES.map((a) => ({
  path: `insights/${a.slug}`,
  title: a.title,
  priority: '0.85',
  changefreq: 'weekly',
}));

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateMasterSitemapXml(): string {
  const coreUrls = CORE_PAGES.map((p) => {
    const loc = p.path ? `${BASE_URL}/${p.path}` : `${BASE_URL}/`;
    return `  <!-- ${escapeXml(p.title)} -->\n  <url>\n    <loc>${loc}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`;
  }).join('\n\n');

  const serviceUrls = SERVICES.map((s) => {
    return `  <!-- ${escapeXml(s.title)} -->\n  <url>\n    <loc>${BASE_URL}/${s.path}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${s.changefreq}</changefreq>\n    <priority>${s.priority}</priority>\n  </url>`;
  }).join('\n\n');

  const articleUrls = ARTICLES.map((a) => {
    return `  <!-- ${escapeXml(a.title)} -->\n  <url>\n    <loc>${BASE_URL}/${a.path}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${a.changefreq}</changefreq>\n    <priority>${a.priority}</priority>\n  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- ==================== CORE NAVIGATION PAGES ==================== -->
${coreUrls}

  <!-- ==================== ALL 16 ENGINEERING SERVICES ==================== -->
${serviceUrls}

  <!-- ==================== ALL 20 ENGINEERING ARTICLES ==================== -->
${articleUrls}

</urlset>
`;
}

export function generateSitemapIndexXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateMasterSitemapXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), generateSitemapIndexXml(), 'utf-8');
  const allUrls = [
    ...CORE_PAGES.map(p => p.path ? `${BASE_URL}/${p.path}` : `${BASE_URL}/`),
    ...SERVICES.map(s => `${BASE_URL}/${s.path}`),
    ...ARTICLES.map(a => `${BASE_URL}/${a.path}`)
  ].join('\n');
  fs.writeFileSync(path.join(publicDir, 'sitemap.txt'), allUrls, 'utf-8');
  console.log('Successfully generated sitemap.xml, sitemap_index.xml, and sitemap.txt with real HTML pages.');
}
