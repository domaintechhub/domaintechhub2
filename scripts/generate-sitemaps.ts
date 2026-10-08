import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const BASE_URL = 'https://www.domaintechhubs.com';
const CURRENT_DATE = '2026-10-08T09:30:00+03:00';

// 1. Core Navigation Pages (excluding private /portal to protect user privacy)
const CORE_PAGES = [
  { path: '', priority: '1.0', changefreq: 'daily', markdown: 'index.md', title: 'Home - Domain Tech Hub' },
  { path: 'about', priority: '0.95', changefreq: 'weekly', markdown: 'about.md', title: 'About Us' },
  { path: 'services', priority: '0.95', changefreq: 'weekly', markdown: 'services.md', title: 'Engineering Services' },
  { path: 'portfolio', priority: '0.95', changefreq: 'weekly', markdown: 'portfolio.md', title: 'Case Studies & Portfolio' },
  { path: 'tools', priority: '0.90', changefreq: 'weekly', title: 'Interactive Engineering Tools' },
  { path: 'tools/calculator', priority: '0.90', changefreq: 'weekly', title: 'Project Cost & Scope Calculator' },
  { path: 'tools/audit', priority: '0.90', changefreq: 'weekly', title: 'Core Web Vitals & SEO Speed Audit' },
  { path: 'tools/domains', priority: '0.85', changefreq: 'monthly', title: '.co.ke Domain Registration & Hosting' },
  { path: 'insights', priority: '0.95', changefreq: 'daily', markdown: 'insights.md', title: 'Engineering Insights & Knowledge Base' },
  { path: 'blog', priority: '0.90', changefreq: 'daily', markdown: 'insights.md', title: 'Engineering Blog' },
  { path: 'faq', priority: '0.85', changefreq: 'weekly', markdown: 'faq.md', title: 'Frequently Asked Questions' },
  { path: 'contact', priority: '0.90', changefreq: 'weekly', title: 'Contact & Discovery Session' },
  { path: 'roadmap', priority: '0.85', changefreq: 'weekly', markdown: 'roadmap.md', title: 'Sprint Roadmap & Delivery Methodology' },
  { path: 'team', priority: '0.85', changefreq: 'weekly', markdown: 'team.md', title: 'Engineering Team & Leadership' },
  { path: 'tech-stack', priority: '0.85', changefreq: 'monthly', markdown: 'tech-stack.md', title: 'Tech Stack & Infrastructure' },
  { path: 'more', priority: '0.80', changefreq: 'weekly', title: 'More Services & Resources' },
];

// 2. All 16 Engineering Services + Canonical Aliases
const SERVICES = [
  { path: 'services/web-development', title: 'Custom Website Development', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/front-end-development', title: 'Modern Front-End Development', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/ecommerce-development', title: 'E-Commerce & Safaricom Daraja 3.0 M-Pesa Development', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/ecommerce-mpesa', title: 'Safaricom M-Pesa E-Commerce Integration (Daraja STK Push)', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/cms-development', title: 'Headless CMS & Content Management Systems', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/seo-services', title: 'Technical SEO & Search Optimization', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/seo-optimization', title: 'SEO Optimization & Core Web Vitals Speed Tuning', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/digital-marketing', title: 'Performance Digital Marketing & Lead Engines', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/ppc-management', title: 'Google Ads PPC & Paid Search Campaign Management', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/whatsapp-marketing', title: 'WhatsApp Cloud API & Lead Automation', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/social-media-marketing', title: 'Social Media Strategy & Paid Acquisition', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/custom-crm-development', title: 'Bespoke Enterprise CRM & ERP Systems', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/custom-software', title: 'Enterprise Custom Software & ERP Solutions', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/ai-powered-solutions', title: 'AI-Powered Solutions & Workflow Automations', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/web-consultancy', title: 'Digital Architecture & Strategic Web Consultancy', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/website-maintenance', title: '24/7 SLA Website Maintenance & Security', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/graphic-design-branding', title: 'Corporate Brand Identity & Design Tokens', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/branding-design', title: 'Corporate Branding & Visual Identity', priority: '0.85', changefreq: 'weekly' },
  { path: 'services/mobile-app-development', title: 'Native & Hybrid Mobile Application Engineering', priority: '0.90', changefreq: 'weekly' },
  { path: 'services/pos-systems', title: 'Point of Sale (POS) Systems & Hardware Prices Kenya', priority: '0.90', changefreq: 'weekly' },
];

// 3. Technical Articles & Insights
const ARTICLES = [
  { slug: 'zero-loss-mpesa-stk-push-architecture', title: 'Zero-Loss M-Pesa STK Push: Architecting Resilient Webhooks on Safaricom Daraja API', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80' },
  { slug: 'headless-nextjs-vs-wordpress-kenya', title: 'Headless Next.js vs WordPress: Why Kenyan Enterprises Are Leaving Legacy CMS', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80' },
  { slug: 'local-seo-core-web-vitals-nairobi-kenya', title: 'Local SEO & Core Web Vitals: Ranking in Nairobi Google Maps & Local Pack', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80' },
  { slug: 'whatsapp-cloud-api-sales-automation', title: 'WhatsApp Cloud API for Business: Automating Sales & Lead Inquiries in East Africa', image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1000&q=80' },
  { slug: 'bespoke-crm-vs-spreadsheets-kenya', title: 'Custom CRM vs Spreadsheets: Why Growing Kenyan Businesses Hit an Excel Ceiling', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80' },
  { slug: 'cybersecurity-ecommerce-kenya-fraud-prevention', title: 'Cybersecurity for Kenya E-Commerce: Preventing Fraud and Securing Card & M-Pesa Payments', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80' },
  { slug: 'website-design-in-kenya-business-guide-2026', title: 'Website Design in Kenya (2026 Business Guide): Turning Digital Attention Into Revenue', image: 'https://images.unsplash.com/photo-1581291518655-9523c932694b?auto=format&fit=crop&w=1000&q=80' },
];

// 4. Portfolio Case Studies
const CASE_STUDIES = [
  { id: 'savannah-crafts-ecommerce', title: 'Savannah Crafts: Modern E-Commerce & M-Pesa Checkout' },
  { id: 'apex-legal-seo-growth', title: 'Apex Law Advocates: Local SEO & Corporate Identity' },
  { id: 'finpulse-crm-automation', title: 'FinPulse Capital: Custom CRM & Automation' },
  { id: 'mara-wild-expeditions', title: 'Mara Wild Expeditions: Luxury Safari Booking Portal' },
  { id: 'solarpower-kenya-ppc', title: 'SolarPower Kenya: B2B Commercial Solar Lead Generation' },
  { id: 'kazi-hub-branding', title: 'KaziHub Coworking: Brand Architecture & Launch Website' },
];

// 5. Interactive Client & Developer Tools
const TOOLS = [
  { path: 'tools', title: 'Interactive Engineering Tools Hub', priority: '0.90' },
  { path: 'tools/calculator', title: 'Project Cost & Scope Calculator', priority: '0.85' },
  { path: 'tools/audit', title: 'Core Web Vitals & SEO Speed Audit Scanner', priority: '0.85' },
  { path: 'tools/domains', title: '.co.ke Domain Registration & NVMe Hosting Portal', priority: '0.80' },
];

// 6. Machine-Readable & LLM Mirrored Endpoints
const MACHINE_ENDPOINTS = [
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

function urlTag(loc: string, priority = '0.8', changefreq = 'weekly', extra = ''): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${extra}
  </url>`;
}

export function generateSitemapPagesXml(): string {
  const urls = CORE_PAGES.map((route) => {
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

export function generateSitemapServicesXml(): string {
  const serviceUrls = SERVICES.map((s) => {
    return `  <!-- ${s.title} -->
${urlTag(`${BASE_URL}/${s.path}`, s.priority, s.changefreq)}`;
  }).join('\n\n');

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

${serviceUrls}

</urlset>
`;
}

export function generateSitemapArticlesXml(): string {
  const articleUrls = ARTICLES.map((a) => {
    const imageXml = `\n    <image:image>\n      <image:loc>${a.image}</image:loc>\n      <image:title>${a.title.replace(/&/g, '&amp;')}</image:title>\n    </image:image>`;
    return `  <!-- Article: ${a.title} -->
  <url>
    <loc>${BASE_URL}/insights/${a.slug}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>${imageXml}
  </url>

  <url>
    <loc>${BASE_URL}/blog/${a.slug}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>${imageXml}
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

${articleUrls}

</urlset>
`;
}

export function generateSitemapPortfolioXml(): string {
  const caseUrls = CASE_STUDIES.map((c) => {
    return `  <!-- Case Study: ${c.title} -->
  <url>
    <loc>${BASE_URL}/portfolio#${c.id}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  }).join('\n\n');

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

${caseUrls}

</urlset>
`;
}

export function generateSitemapToolsXml(): string {
  const toolUrls = TOOLS.map((t) => {
    return `  <!-- Tool: ${t.title} -->
  <url>
    <loc>${BASE_URL}/${t.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${t.priority}</priority>
  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${toolUrls}

</urlset>
`;
}

/**
 * Master Consolidated Sitemap containing ALL PAGES across the entire website
 */
export function generateMasterSitemapXml(): string {
  const coreUrls = CORE_PAGES.map((p) => {
    const loc = p.path ? `${BASE_URL}/${p.path}` : `${BASE_URL}/`;
    const markdown = p.markdown ? `\n    <xhtml:link rel="alternate" type="text/markdown" href="${BASE_URL}/markdown/${p.markdown}" />` : '';
    const image = p.path === '' ? `\n    <image:image>\n      <image:loc>${BASE_URL}/og-image.svg</image:loc>\n      <image:title>Domain Tech Hub</image:title>\n    </image:image>` : '';
    return `  <!-- ${p.title} -->\n  <url>\n    <loc>${loc}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>${markdown}${image}\n  </url>`;
  }).join('\n\n');

  const serviceUrls = SERVICES.map((s) => {
    return `  <!-- ${s.title} -->\n  <url>\n    <loc>${BASE_URL}/${s.path}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>${s.changefreq}</changefreq>\n    <priority>${s.priority}</priority>\n  </url>`;
  }).join('\n\n');

  const articleUrls = ARTICLES.map((a) => {
    return `  <!-- Article: ${a.title} -->\n  <url>\n    <loc>${BASE_URL}/insights/${a.slug}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n\n  <url>\n    <loc>${BASE_URL}/blog/${a.slug}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>`;
  }).join('\n\n');

  const caseUrls = CASE_STUDIES.map((c) => {
    return `  <!-- Case Study: ${c.title} -->\n  <url>\n    <loc>${BASE_URL}/portfolio#${c.id}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`;
  }).join('\n\n');

  const machineUrls = MACHINE_ENDPOINTS.map((m) => {
    return `  <!-- ${m.title} -->\n  <url>\n    <loc>${BASE_URL}/${m.path}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.70</priority>\n  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- ==================== CORE NAVIGATION PAGES ==================== -->
${coreUrls}

  <!-- ==================== ALL 16 ENGINEERING SERVICES ==================== -->
${serviceUrls}

  <!-- ==================== TECHNICAL INSIGHTS & BLOG ARTICLES ==================== -->
${articleUrls}

  <!-- ==================== VERIFIED PORTFOLIO CASE STUDIES ==================== -->
${caseUrls}

  <!-- ==================== MACHINE READABLE & LLM SPECIFICATIONS ==================== -->
${machineUrls}

</urlset>
`;
}

export function generateSitemapIndexXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 1. Major Navigation & Site Structure Sitemap -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>

  <!-- 2. Dedicated Engineering Services & POS Systems Sitemap (All 16 Services) -->
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), generateSitemapPagesXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-services.xml'), generateSitemapServicesXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-articles.xml'), generateSitemapArticlesXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-portfolio.xml'), generateSitemapPortfolioXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), generateSitemapToolsXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateMasterSitemapXml(), 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), generateSitemapIndexXml(), 'utf-8');
  console.log('Successfully generated all sitemaps with all website pages.');
}
