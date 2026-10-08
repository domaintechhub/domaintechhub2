#!/usr/bin/env node
/**
 * Dynamic Sitemap Crawler & Generator
 * Crawls route definitions in App.tsx and corresponding dataset collections (including articlesData.ts),
 * dynamically generating all individual sitemaps and master sitemaps.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.domaintechhubs.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const appTsxPath = path.resolve(__dirname, 'src/App.tsx');
const servicesPath = path.resolve(__dirname, 'src/data/servicesData.ts');
const insightsPath = path.resolve(__dirname, 'src/data/insightsData.ts');
const portfolioPath = path.resolve(__dirname, 'src/data/portfolioData.ts');
const articlesDataPath = fs.existsSync(path.resolve(__dirname, 'src/data/articlesData.ts'))
  ? path.resolve(__dirname, 'src/data/articlesData.ts')
  : path.resolve(__dirname, 'articlesData.ts');
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
 * 1. Crawl App.tsx route definitions
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

  // Parse target conditionals from navigateTo in App.tsx
  const targetRegex = /target\s*===\s*['"]([^'"]+)['"]/g;
  const navigateTargets = new Set();
  let match;
  while ((match = targetRegex.exec(content)) !== null) {
    navigateTargets.add(match[1]);
  }

  // Filter out internal/private routes to guarantee user privacy
  const filteredDeclared = declaredRoutes.filter(r => r !== 'portal');

  // Define route mapping with priority and changefreq
  const routeMeta = {
    home: { path: '', priority: '1.0', changefreq: 'daily', markdown: 'index.md', title: 'Home - Domain Tech Hub' },
    about: { path: 'about', priority: '0.95', changefreq: 'weekly', markdown: 'about.md', title: 'About Us' },
    services: { path: 'services', priority: '0.95', changefreq: 'weekly', markdown: 'services.md', title: 'Engineering Services' },
    portfolio: { path: 'portfolio', priority: '0.95', changefreq: 'weekly', markdown: 'portfolio.md', title: 'Case Studies & Portfolio' },
    tools: { path: 'tools', priority: '0.90', changefreq: 'weekly', title: 'Interactive Engineering Tools' },
    insights: { path: 'insights', priority: '0.95', changefreq: 'daily', markdown: 'insights.md', title: 'Engineering Insights & Knowledge Base' },
    faq: { path: 'faq', priority: '0.85', changefreq: 'weekly', markdown: 'faq.md', title: 'Frequently Asked Questions' },
    contact: { path: 'contact', priority: '0.90', changefreq: 'weekly', title: 'Contact & Discovery Session' },
    roadmap: { path: 'roadmap', priority: '0.85', changefreq: 'weekly', markdown: 'roadmap.md', title: 'Sprint Roadmap & Delivery Methodology' },
    team: { path: 'team', priority: '0.85', changefreq: 'weekly', markdown: 'team.md', title: 'Engineering Team & Leadership' },
    more: { path: 'more', priority: '0.80', changefreq: 'weekly', title: 'More Services & Resources' },
  };

  const pages = [];
  for (const route of filteredDeclared) {
    if (routeMeta[route]) {
      pages.push(routeMeta[route]);
    } else {
      pages.push({ path: route, priority: '0.80', changefreq: 'weekly', title: `${route.charAt(0).toUpperCase() + route.slice(1)} - Domain Tech Hub` });
    }
  }

  // Additional major discovered targets from App.tsx navigateTo
  const additionalTargets = [
    { path: 'blog', priority: '0.90', changefreq: 'daily', markdown: 'insights.md', title: 'Engineering Blog' },
    { path: 'tech-stack', priority: '0.85', changefreq: 'monthly', markdown: 'tech-stack.md', title: 'Tech Stack & Infrastructure' },
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
 * 2. Crawl all 16 engineering services from servicesData.ts
 */
export function crawlServices() {
  if (!fs.existsSync(servicesPath)) return [];
  const content = fs.readFileSync(servicesPath, 'utf8');
  const services = [];
  const serviceRegex = /id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = serviceRegex.exec(content)) !== null) {
    if (match[1] !== 'all' && !match[1].startsWith('crm_') && !match[1].startsWith('maintenance_') && !match[1].startsWith('branding_')) {
      services.push({
        path: `services/${match[1]}`,
        title: match[2],
        priority: '0.90',
        changefreq: 'weekly',
      });
    }
  }

  // Add canonical aliases recognized by App.tsx router
  const aliases = [
    { path: 'services/ecommerce-mpesa', title: 'Safaricom M-Pesa E-Commerce Integration (Daraja STK Push)', priority: '0.90', changefreq: 'weekly' },
    { path: 'services/seo-optimization', title: 'SEO Optimization & Core Web Vitals Speed Tuning', priority: '0.90', changefreq: 'weekly' },
    { path: 'services/custom-software', title: 'Enterprise Custom Software & ERP Solutions', priority: '0.90', changefreq: 'weekly' },
    { path: 'services/branding-design', title: 'Corporate Branding & Visual Identity', priority: '0.85', changefreq: 'weekly' },
  ];

  for (const alias of aliases) {
    if (!services.some(s => s.path === alias.path)) {
      services.push(alias);
    }
  }

  return services;
}

/**
 * 3. Crawl technical articles & insights dynamically from articlesData.ts (with fallback to insightsData.ts)
 */
export function crawlArticles() {
  const targetPath = fs.existsSync(articlesDataPath)
    ? articlesDataPath
    : (fs.existsSync(insightsPath) ? insightsPath : null);

  if (!targetPath || !fs.existsSync(targetPath)) return [];
  const content = fs.readFileSync(targetPath, 'utf8');
  const articles = [];

  // Match full article objects in articlesData.ts or insightsData.ts
  const articleBlockRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?slug:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
  let match;
  while ((match = articleBlockRegex.exec(content)) !== null) {
    const block = match[0];
    const id = match[1];
    const title = match[2];
    const slug = match[3];

    const categoryMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
    const dateMatch = block.match(/publishedDate:\s*['"]([^'"]+)['"]/);
    const imageMatch = block.match(/coverImage:\s*['"]([^'"]+)['"]/);
    const priorityMatch = block.match(/priority:\s*['"]([^'"]+)['"]/);
    const changefreqMatch = block.match(/changefreq:\s*['"]([^'"]+)['"]/);

    articles.push({
      id,
      title,
      slug,
      category: categoryMatch ? categoryMatch[1] : 'Modern Engineering',
      publishedDate: dateMatch ? dateMatch[1] : CURRENT_DATE,
      coverImage: imageMatch ? imageMatch[1] : '',
      priority: priorityMatch ? priorityMatch[1] : '0.85',
      changefreq: changefreqMatch ? changefreqMatch[1] : 'monthly',
    });
  }

  // Fallback regex if formatting differs
  if (articles.length === 0) {
    const simpleRegex = /title:\s*['"]([^'"]+)['"],\s*slug:\s*['"]([^'"]+)['"]/g;
    let simpleMatch;
    while ((simpleMatch = simpleRegex.exec(content)) !== null) {
      articles.push({
        title: simpleMatch[1],
        slug: simpleMatch[2],
        publishedDate: CURRENT_DATE,
        priority: '0.85',
        changefreq: 'monthly',
      });
    }
  }

  return articles;
}

/**
 * 4. Crawl portfolio case studies from portfolioData.ts
 */
export function crawlCaseStudies() {
  if (!fs.existsSync(portfolioPath)) return [];
  const content = fs.readFileSync(portfolioPath, 'utf8');
  const cases = [];
  const caseRegex = /id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = caseRegex.exec(content)) !== null) {
    cases.push({
      id: match[1],
      title: match[2],
    });
  }
  return cases;
}

/**
 * 5. Crawl interactive tools
 */
export function crawlTools() {
  return [
    { path: 'tools', title: 'Interactive Engineering Tools Hub', priority: '0.90' },
    { path: 'tools/calculator', title: 'Project Cost & Scope Calculator', priority: '0.85' },
    { path: 'tools/audit', title: 'Core Web Vitals & SEO Speed Audit Scanner', priority: '0.85' },
    { path: 'tools/domains', title: '.co.ke Domain Registration & NVMe Hosting Portal', priority: '0.80' },
  ];
}

/**
 * Machine readable / LLM endpoints
 */
export function getMachineEndpoints() {
  return [
    { path: 'llms.txt', title: 'LLM Specification (llms.txt)' },
    { path: 'llms-full.txt', title: 'Full LLM Context (llms-full.txt)' },
    { path: 'markdown/index.md', title: 'Homepage Markdown Mirror' },
    { path: 'markdown/about.md', title: 'About Us Markdown Mirror' },
    { path: 'markdown/services.md', title: 'Services Markdown Mirror' },
    { path: 'markdown/portfolio.md', title: 'Portfolio Markdown Mirror' },
    { path: 'markdown/roadmap.md', title: 'Roadmap Markdown Mirror' },
    { path: 'markdown/team.md', title: 'Team Markdown Mirror' },
    { path: 'markdown/tech-stack.md', title: 'Tech Stack Markdown Mirror' },
    { path: 'markdown/insights.md', title: 'Technical Insights Markdown Mirror' },
    { path: 'markdown/faq.md', title: 'FAQ Markdown Mirror' },
  ];
}

// Generate Individual Sitemaps
export function generatePagesSitemap(pages) {
  const items = pages.map(route => {
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

    return `  <!-- ${escapeXml(route.title)} -->
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Core Services Hub -->
  <url>
    <loc>${BASE_URL}/services</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <xhtml:link rel="alternate" type="text/markdown" href="${BASE_URL}/markdown/services.md" />
  </url>

${items}

</urlset>
`;
}

/**
 * Generate sitemap-articles.xml with unique URLs for each blog post and insight article
 */
export function generateArticlesSitemap(articles) {
  const items = articles.map(a => {
    const imageTag = a.coverImage 
      ? `\n    <image:image>\n      <image:loc>${a.coverImage}</image:loc>\n      <image:title>${escapeXml(a.title)}</image:title>\n    </image:image>`
      : '';
    const lastmod = a.publishedDate ? a.publishedDate : CURRENT_DATE;

    return `  <!-- Blog Post: ${escapeXml(a.title)} -->
  <url>
    <loc>${BASE_URL}/insights/${a.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${a.changefreq || 'monthly'}</changefreq>
    <priority>${a.priority || '0.85'}</priority>${imageTag}
  </url>

  <url>
    <loc>${BASE_URL}/blog/${a.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${a.changefreq || 'monthly'}</changefreq>
    <priority>${a.priority || '0.85'}</priority>${imageTag}
  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Knowledge Base & Blog Hubs -->
  <url>
    <loc>${BASE_URL}/insights</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
    <xhtml:link rel="alternate" type="text/markdown" href="${BASE_URL}/markdown/insights.md" />
  </url>

  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
    <xhtml:link rel="alternate" type="text/markdown" href="${BASE_URL}/markdown/insights.md" />
  </url>

${items}

</urlset>
`;
}

export function generatePortfolioSitemap(caseStudies) {
  const items = caseStudies.map(c => `  <!-- Case Study: ${escapeXml(c.title)} -->
  <url>
    <loc>${BASE_URL}/portfolio#${c.id}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Portfolio Hub -->
  <url>
    <loc>${BASE_URL}/portfolio</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <xhtml:link rel="alternate" type="text/markdown" href="${BASE_URL}/markdown/portfolio.md" />
  </url>

${items}

</urlset>
`;
}

export function generateToolsSitemap(tools) {
  const items = tools.map(t => `  <!-- Tool: ${escapeXml(t.title)} -->
  <url>
    <loc>${BASE_URL}/${t.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${t.priority}</priority>
  </url>`).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${items}

</urlset>
`;
}

export function generateMasterSitemap(pages, services, articles, caseStudies, tools, machineEndpoints) {
  const pageItems = pages.map(p => {
    const loc = p.path ? `${BASE_URL}/${p.path}` : `${BASE_URL}/`;
    const markdown = p.markdown ? `\n    <xhtml:link rel="alternate" type="text/markdown" href="${BASE_URL}/markdown/${p.markdown}" />` : '';
    const image = p.path === '' ? `\n    <image:image>\n      <image:loc>${BASE_URL}/og-image.svg</image:loc>\n      <image:title>Domain Tech Hub</image:title>\n    </image:image>` : '';
    return `  <!-- ${escapeXml(p.title)} -->\n  <url>\n    <loc>${loc}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>${markdown}${image}\n  </url>`;
  }).join('\n\n');

  const serviceItems = services.map(s => `  <!-- ${escapeXml(s.title)} -->\n  <url>\n    <loc>${BASE_URL}/${s.path}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${s.changefreq}</changefreq>\n    <priority>${s.priority}</priority>\n  </url>`).join('\n\n');

  const articleItems = articles.map(a => {
    const imageTag = a.coverImage ? `\n    <image:image>\n      <image:loc>${a.coverImage}</image:loc>\n      <image:title>${escapeXml(a.title)}</image:title>\n    </image:image>` : '';
    return `  <!-- Article: ${escapeXml(a.title)} -->\n  <url>\n    <loc>${BASE_URL}/insights/${a.slug}</loc>\n    <lastmod>${a.publishedDate || CURRENT_DATE}</lastmod>\n    <changefreq>${a.changefreq || 'monthly'}</changefreq>\n    <priority>${a.priority || '0.85'}</priority>${imageTag}\n  </url>\n\n  <url>\n    <loc>${BASE_URL}/blog/${a.slug}</loc>\n    <lastmod>${a.publishedDate || CURRENT_DATE}</lastmod>\n    <changefreq>${a.changefreq || 'monthly'}</changefreq>\n    <priority>${a.priority || '0.85'}</priority>${imageTag}\n  </url>`;
  }).join('\n\n');

  const caseItems = caseStudies.map(c => `  <!-- Case Study: ${escapeXml(c.title)} -->\n  <url>\n    <loc>${BASE_URL}/portfolio#${c.id}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`).join('\n\n');

  const toolItems = tools.map(t => `  <!-- Tool: ${escapeXml(t.title)} -->\n  <url>\n    <loc>${BASE_URL}/${t.path}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${t.priority}</priority>\n  </url>`).join('\n\n');

  const machineItems = machineEndpoints.map(m => `  <!-- ${escapeXml(m.title)} -->\n  <url>\n    <loc>${BASE_URL}/${m.path}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.70</priority>\n  </url>`).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- ==================== CORE NAVIGATION PAGES ==================== -->
${pageItems}

  <!-- ==================== ALL 16 ENGINEERING SERVICES ==================== -->
${serviceItems}

  <!-- ==================== TECHNICAL INSIGHTS & BLOG ARTICLES ==================== -->
${articleItems}

  <!-- ==================== VERIFIED PORTFOLIO CASE STUDIES ==================== -->
${caseItems}

  <!-- ==================== INTERACTIVE TOOLS ==================== -->
${toolItems}

  <!-- ==================== MACHINE READABLE & LLM SPECIFICATIONS ==================== -->
${machineItems}

</urlset>
`;
}

export function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 1. Major Navigation & Site Structure Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- 2. Dedicated Engineering Services & POS Systems Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- 3. Technical Insights & Engineering Knowledge Base Articles Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-articles.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- 4. Verified Client Portfolio & Case Studies Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-portfolio.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- 5. Interactive Client & Developer Tools Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-tools.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- 6. Master Consolidated Sitemap (Containing All Indexed URLs) -->
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

export function runCrawler() {
  console.log('[sitemap-crawler] Crawling route definitions from App.tsx, articlesData.ts, and data registries...');

  const pages = crawlAppRoutes();
  const services = crawlServices();
  const articles = crawlArticles();
  const caseStudies = crawlCaseStudies();
  const tools = crawlTools();
  const machineEndpoints = getMachineEndpoints();

  console.log(`[sitemap-crawler] Discovered:
  - Core Pages: ${pages.length}
  - Services: ${services.length}
  - Articles from articlesData.ts: ${articles.length}
  - Case Studies: ${caseStudies.length}
  - Tools: ${tools.length}`);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), generatePagesSitemap(pages), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-services.xml'), generateServicesSitemap(services), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-articles.xml'), generateArticlesSitemap(articles), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-portfolio.xml'), generatePortfolioSitemap(caseStudies), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), generateToolsSitemap(tools), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateMasterSitemap(pages, services, articles, caseStudies, tools, machineEndpoints), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), generateSitemapIndex(), 'utf-8');

  console.log('[sitemap-crawler] Successfully updated all sitemaps in /public.');
}

// Execute when invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCrawler();
}
