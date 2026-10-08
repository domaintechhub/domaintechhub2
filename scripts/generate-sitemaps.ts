import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const BASE_URL = 'https://www.domaintechhubs.com';
const CURRENT_DATE = '2026-10-08T09:30:00+03:00';

// 12 Major navigation routes from App.tsx
const NAVIGATION_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily', markdown: 'index.md', title: 'Home - Domain Tech Hub' },
  { path: 'about', priority: '0.95', changefreq: 'weekly', markdown: 'about.md', title: 'About Us' },
  { path: 'services', priority: '0.95', changefreq: 'weekly', markdown: 'services.md', title: 'Engineering Services' },
  { path: 'portfolio', priority: '0.9', changefreq: 'weekly', markdown: 'portfolio.md', title: 'Case Studies & Portfolio' },
  { path: 'tools', priority: '0.9', changefreq: 'weekly', title: 'Interactive Engineering Tools' },
  { path: 'insights', priority: '0.9', changefreq: 'daily', markdown: 'insights.md', title: 'Engineering Insights & Knowledge Base' },
  { path: 'portal', priority: '0.85', changefreq: 'weekly', title: 'Interactive Client Portal & Staging Tracker' },
  { path: 'faq', priority: '0.85', changefreq: 'weekly', markdown: 'faq.md', title: 'Frequently Asked Questions' },
  { path: 'contact', priority: '0.9', changefreq: 'weekly', title: 'Contact & Discovery Session' },
  { path: 'roadmap', priority: '0.85', changefreq: 'weekly', markdown: 'roadmap.md', title: 'Sprint Roadmap & Delivery Methodology' },
  { path: 'team', priority: '0.85', changefreq: 'weekly', markdown: 'team.md', title: 'Engineering Team & Leadership' },
  { path: 'more', priority: '0.8', changefreq: 'weekly', title: 'More Services & Resources' },
];

export function generateSitemapPagesXml(): string {
  const urls = NAVIGATION_ROUTES.map((route) => {
    const loc = route.path ? `${BASE_URL}/${route.path}` : `${BASE_URL}/`;
    const markdownTag = route.markdown
      ? `\n    <xhtml:link rel="alternate" type="text/markdown" href="${BASE_URL}/markdown/${route.markdown}" />`
      : '';
    const imageTag = route.path === ''
      ? `\n    <image:image>\n      <image:loc>${BASE_URL}/og-image.svg</image:loc>\n      <image:title>Domain Tech Hub - Nairobi Premier Software Engineering Agency</image:title>\n      <image:caption>Modern Web Applications, Safaricom M-Pesa Integrations and Enterprise Software</image:caption>\n    </image:image>`
      : '';
    const hreflang = route.path === ''
      ? `\n    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/" />`
      : '';

    return `  <!-- ${route.title} -->
  <url>
    <loc>${loc}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${hreflang}${markdownTag}${imageTag}
  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

${urls}

</urlset>
`;
}

export function generateSitemapIndexXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Major Navigation Routes Sitemap (App.tsx core routes) -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- Dedicated Engineering Services & POS Systems Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- Technical Insights & Engineering Knowledge Base Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-articles.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- Primary Consolidated Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), generateSitemapPagesXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), generateSitemapIndexXml(), 'utf-8');
  console.log('Successfully generated sitemap-pages.xml and sitemap_index.xml');
}
