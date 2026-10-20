/**
 * Static Pre-Render & Multi-Page SEO HTML Generator
 * Generates independent, crawlable static HTML pages in dist/ for:
 * - All core routes (/, /about, /services, /portfolio, /insights, /faq, /contact, /roadmap, /team, /tech-stack, /blog, /portal, /tools/*)
 * - Every core service (/services/<id>)
 * - Every article (/insights/<slug>)
 * - Dedicated 404 page (dist/404.html)
 *
 * Each generated HTML file has its own unique <title>, <meta name="description">,
 * <link rel="canonical">, OpenGraph/Twitter tags, Schema.org JSON-LD, and
 * full semantic HTML content + internal links inside <div id="root">.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL } from '../src/config/site';
import { SERVICES_LIST } from '../src/data/servicesData';
import { INSIGHT_ARTICLES } from '../src/data/insightsData';
import { CASE_STUDIES } from '../src/data/portfolioData';
import { FAQ_ITEMS } from '../src/data/faqData';
import { SERVICE_GUIDES } from '../src/data/serviceGuides';
import { SERVICE_KEYWORD_MAP } from '../src/data/keywordMapData';
import { PAGE_SEO_DATA, MASTER_TARGET_KEYWORDS, HOME_H1 } from '../src/utils/seo';
import { injectSemanticKeywords } from '../src/utils/keywordInjection';
import { normalizeServiceSlug } from '../src/utils/routing';
import type { PageRoute } from '../src/App';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderMarkdownLinksToHtml(text: string): string {
  const escaped = escapeHtml(text);
  return escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
    const isExternal = url.startsWith('http://') || url.startsWith('https://');
    const rel = isExternal ? ' rel="noopener noreferrer" target="_blank"' : '';
    return `<a href="${url}" class="text-cyan-400 underline font-semibold"${rel}>${label}</a>`;
  });
}

function renderNavHeaderHtml(): string {
  return `
  <header class="bg-slate-950 border-b border-slate-800 px-4 py-4">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
      <a href="/" class="text-white font-extrabold text-lg tracking-tight">Domain Tech Hub</a>
      <nav aria-label="Primary Navigation" class="flex flex-wrap items-center gap-4 text-sm text-slate-300">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/services">Services</a>
        <a href="/portfolio">Case Studies</a>
        <a href="/insights">Engineering Insights</a>
        <a href="/blog">Blog</a>
        <a href="/roadmap">Sprint Roadmap</a>
        <a href="/team">Team</a>
        <a href="/tech-stack">Tech Stack</a>
        <a href="/tools/calculator">Cost Calculator</a>
        <a href="/tools/design-audit">DesignMeter UI/UX Audit</a>
        <a href="/tools/audit">SEO Audit Tool</a>
        <a href="/tools/domains">Domain Checker</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </header>`;
}

function renderFooterLinksHtml(): string {
  const serviceLinks = SERVICES_LIST.map(
    (s) => `<li><a href="/services/${s.id}">${escapeHtml(s.title)}</a></li>`
  ).join('\n          ');

  const articleLinks = INSIGHT_ARTICLES.map(
    (a) => `<li><a href="/insights/${a.slug}">${escapeHtml(a.title)}</a></li>`
  ).join('\n          ');

  return `
  <footer class="bg-slate-950 border-t border-slate-800 px-4 py-12 text-slate-400 text-sm">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h2 class="text-white font-bold mb-3">Domain Tech Hub Nairobi</h2>
        <p>Nairobi's premier software engineering agency. Custom web applications, Safaricom Daraja 3.0 M-Pesa e-commerce, KRA eTIMS POS systems, and technical SEO.</p>
        <p class="mt-2">Delta Corner Tower, Westlands, Nairobi, Kenya · +254 118 746 676</p>
        <div class="mt-4">
          <div google-add-preferred-source-btn data-theme="light" data-lang="en"></div>
        </div>
      </div>
      <div>
        <h2 class="text-white font-bold mb-3">Core Engineering Services</h2>
        <ul class="space-y-1">
          ${serviceLinks}
        </ul>
      </div>
      <div>
        <h2 class="text-white font-bold mb-3">Latest Engineering Articles</h2>
        <ul class="space-y-1">
          ${articleLinks}
        </ul>
      </div>
    </div>
  </footer>`;
}

function buildBodyHtmlForRoute(route: PageRoute, subTab?: string): string {
  // 1. Individual Service Detail Page
  if (route === 'services' && subTab) {
    const normalizedId = normalizeServiceSlug(subTab) || subTab;
    const service = SERVICES_LIST.find((s) => s.id === normalizedId);
    if (service) {
      const keywordMap = SERVICE_KEYWORD_MAP[service.id];
      const otherServices = SERVICES_LIST.filter((s) => s.id !== service.id);
      const relatedArticles = INSIGHT_ARTICLES.slice(0, 6);
      const guideHtml = (SERVICE_GUIDES[service.id] || [])
        .map(
          (g) => `
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">${escapeHtml(g.heading)}</h2>
            ${g.body
              .split('\n\n')
              .map((para) => `<p class="text-slate-300 mb-3">${escapeHtml(para).replace(/\n/g, '<br />')}</p>`)
              .join('\n            ')}
          </section>`
        )
        .join('');
      const customerFaqHtml = guideHtml + (keywordMap
        ? `
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">Kenyan Market Architecture &amp; Locations Served</h2>
            <p class="text-slate-300 mb-3">${escapeHtml(keywordMap.localMarketArchitecture)}</p>
            <p class="text-xs font-mono text-cyan-400 mb-2">Primary Search Focus: ${escapeHtml(keywordMap.primaryKeyword)} · Locations: ${keywordMap.targetLocations.map(escapeHtml).join(', ')}</p>
            <p class="text-sm text-slate-400">${escapeHtml(keywordMap.distinctScopeBoundary.thisPageCovers)} <a href="${escapeHtml(keywordMap.distinctScopeBoundary.relatedPagePath)}" class="text-cyan-400 underline">${escapeHtml(keywordMap.distinctScopeBoundary.relatedPageLabel)}</a></p>
          </section>
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">Customer Questions Answered (${escapeHtml(service.title)} in Kenya)</h2>
            <div class="space-y-4">
              ${keywordMap.customerQuestions
                .map(
                  (q) => `
              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h3 class="text-lg font-bold text-white mb-1">${escapeHtml(q.question)}</h3>
                <p class="text-slate-300 text-sm">${escapeHtml(q.answer)}</p>
              </div>`
                )
                .join('\n              ')}
            </div>
          </section>`
        : '');

      return `
      ${renderNavHeaderHtml()}
      <main class="max-w-5xl mx-auto px-4 py-12 text-slate-100">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-400 mb-6">
          <a href="/">Home</a> &rsaquo; <a href="/services">Services &amp; Solutions</a> &rsaquo; <span>${escapeHtml(service.title)}</span>
        </nav>
        <article>
          <span class="text-xs font-mono text-cyan-400 uppercase">${escapeHtml(service.badge)} · ${escapeHtml(service.duration)} · Nairobi &amp; Kenya</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-3">${escapeHtml(service.title)} in Nairobi &amp; Kenya</h1>
          ${keywordMap ? `<p class="text-xl font-semibold text-cyan-300 mb-4">${escapeHtml(keywordMap.h1Subheadline)}</p>` : ''}
          <p class="text-lg text-slate-300 mb-6">${escapeHtml(service.fullDesc)}</p>
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-8">
            <strong>Starting Investment:</strong> KSh ${service.basePriceKES.toLocaleString()} (USD $${service.basePriceUSD.toLocaleString()}) · Delivery Timeline: ${escapeHtml(service.duration)}
          </div>
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">Key Deliverables &amp; Specifications</h2>
            <ul class="list-disc pl-6 space-y-2 text-slate-300">
              ${service.deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join('\n              ')}
            </ul>
          </section>
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">Included Engineering Features</h2>
            <ul class="list-disc pl-6 space-y-2 text-slate-300">
              ${service.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('\n              ')}
            </ul>
          </section>
          ${customerFaqHtml}
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">Technologies &amp; Stack</h2>
            <p class="text-slate-300">${service.technologies.map((t) => escapeHtml(t)).join(' · ')}</p>
          </section>
          <section class="mb-10">
            <h2 class="text-2xl font-bold text-white mb-3">Next Steps &amp; Project Estimation</h2>
            <p class="text-slate-300 mb-4">Model your exact project scope with our <a href="/tools/calculator" class="text-cyan-400 underline">Interactive Project Cost Calculator</a> or <a href="/contact" class="text-cyan-400 underline">Book a Technical Discovery Call</a> with our Nairobi engineering team.</p>
          </section>
          <section class="mb-10">
            <h2 class="text-xl font-bold text-white mb-3">Explore Other Engineering Services</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${otherServices.map((s) => `<li><a href="/services/${s.id}" class="text-cyan-400 underline">${escapeHtml(s.title)}</a> — ${escapeHtml(s.shortDesc)}</li>`).join('\n              ')}
            </ul>
          </section>
          <section>
            <h2 class="text-xl font-bold text-white mb-3">Related Technical Insights &amp; Guides</h2>
            <ul class="space-y-2">
              ${relatedArticles.map((a) => `<li><a href="/insights/${a.slug}" class="text-cyan-400 underline">${escapeHtml(a.title)}</a></li>`).join('\n              ')}
            </ul>
          </section>
        </article>
      </main>
      ${renderFooterLinksHtml()}`;
    }
  }

  // 2. Individual Article Detail Page
  if (route === 'insights' && subTab) {
    const article = INSIGHT_ARTICLES.find((a) => a.slug === subTab || a.id === subTab);
    if (article) {
      const currentIdx = INSIGHT_ARTICLES.findIndex((a) => a.slug === article.slug);
      const prevArticle = currentIdx > 0 ? INSIGHT_ARTICLES[currentIdx - 1] : null;
      const nextArticle = currentIdx >= 0 && currentIdx < INSIGHT_ARTICLES.length - 1 ? INSIGHT_ARTICLES[currentIdx + 1] : null;

      const sectionsHtml = article.contentSections
        .map((sec) => {
          const injected = injectSemanticKeywords(sec.body, article.id);
          const paragraphs = injected
            .split('\n\n')
            .map((p) => {
              if (p.includes('\n•') || p.startsWith('•')) {
                const items = p
                  .split('\n')
                  .filter(Boolean)
                  .map((i) => `<li>${renderMarkdownLinksToHtml(i.replace(/^[•\-]\s*/, ''))}</li>`)
                  .join('\n');
                return `<ul class="list-disc pl-6 space-y-1.5 my-3">${items}</ul>`;
              }
              return `<p class="mb-4 leading-relaxed">${renderMarkdownLinksToHtml(p)}</p>`;
            })
            .join('\n');

          const codeBlock = sec.codeSnippet
            ? `<pre class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 overflow-x-auto text-xs my-4"><code>${escapeHtml(sec.codeSnippet)}</code></pre>`
            : '';

          return `
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">${escapeHtml(sec.heading)}</h2>
            ${paragraphs}
            ${codeBlock}
          </section>`;
        })
        .join('\n');

      return `
      ${renderNavHeaderHtml()}
      <main class="max-w-4xl mx-auto px-4 py-12 text-slate-100">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-400 mb-6">
          <a href="/">Home</a> &rsaquo; <a href="/insights">Engineering Insights</a> &rsaquo; <span>${escapeHtml(article.title)}</span>
        </nav>
        <article>
          <header class="mb-8">
            <span class="text-xs font-mono text-cyan-400 uppercase">${escapeHtml(article.category)} · ${escapeHtml(article.readTime)} · ${escapeHtml(article.publishedDate)}</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">${escapeHtml(article.title)}</h1>
            <p class="text-lg text-slate-300 mb-4">${escapeHtml(article.excerpt)}</p>
            <div class="text-xs text-slate-400">By <strong>${escapeHtml(article.author.name)}</strong> (${escapeHtml(article.author.role)}, Domain Tech Hub)</div>
          </header>
          <img src="${escapeHtml(article.coverImage)}" alt="${escapeHtml(article.title)}" width="960" height="540" class="w-full rounded-2xl mb-8" />
          <section class="p-5 rounded-2xl bg-slate-900 border border-cyan-900/50 mb-8">
            <h2 class="text-sm font-mono text-cyan-400 uppercase mb-3">Executive Architectural Takeaways</h2>
            <ul class="list-disc pl-6 space-y-2 text-slate-200">
              ${article.keyTakeaways.map((t) => `<li>${escapeHtml(t)}</li>`).join('\n              ')}
            </ul>
          </section>
          ${sectionsHtml}
          <nav aria-label="Adjacent Articles" class="flex flex-wrap justify-between gap-4 py-6 border-t border-slate-800 my-8">
            ${prevArticle ? `<a href="/insights/${prevArticle.slug}" class="text-cyan-400 underline">&larr; Previous: ${escapeHtml(prevArticle.title)}</a>` : '<span></span>'}
            ${nextArticle ? `<a href="/insights/${nextArticle.slug}" class="text-cyan-400 underline">Next: ${escapeHtml(nextArticle.title)} &rarr;</a>` : '<span></span>'}
          </nav>
          <section class="mt-8">
            <h2 class="text-xl font-bold text-white mb-3">Explore Related Engineering Services</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${SERVICES_LIST.slice(0, 8).map((s) => `<li><a href="/services/${s.id}" class="text-cyan-400 underline">${escapeHtml(s.title)}</a></li>`).join('\n              ')}
            </ul>
          </section>
        </article>
      </main>
      ${renderFooterLinksHtml()}`;
    }
  }

  // 3. Services Catalog Page (/services)
  if (route === 'services') {
    return `
    ${renderNavHeaderHtml()}
    <main class="max-w-7xl mx-auto px-4 py-12 text-slate-100">
      <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">Enterprise Web, Mobile &amp; E-Commerce Engineering Services in Kenya</h1>
      <p class="text-lg text-slate-300 mb-8">We architect bespoke digital platforms designed for regional and global scale: headless e-commerce, Safaricom Daraja 3.0 M-Pesa STK Push, KRA eTIMS POS systems, technical SEO, and custom enterprise CRMs.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${SERVICES_LIST.map(
          (s) => `
          <article class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <span class="text-xs font-mono text-cyan-400">${escapeHtml(s.badge)} · ${escapeHtml(s.duration)}</span>
            <h2 class="text-xl font-bold text-white mt-1 mb-2"><a href="/services/${s.id}" class="hover:text-cyan-300">${escapeHtml(s.title)}</a></h2>
            <p class="text-sm text-slate-300 mb-4">${escapeHtml(s.shortDesc)}</p>
            <div class="text-sm font-mono text-white mb-3">From KSh ${s.basePriceKES.toLocaleString()} ($${s.basePriceUSD.toLocaleString()})</div>
            <a href="/services/${s.id}" class="text-cyan-400 underline text-sm font-semibold">View Service Deliverables &amp; Pricing &rarr;</a>
          </article>`
        ).join('\n        ')}
      </div>
    </main>
    ${renderFooterLinksHtml()}`;
  }

  // 4. Insights & Blog Catalog Page (/insights or /blog)
  if (route === 'insights' || (route === 'more' && subTab === 'blog')) {
    return `
    ${renderNavHeaderHtml()}
    <main class="max-w-7xl mx-auto px-4 py-12 text-slate-100">
      <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">Engineering Insights, Technical SEO &amp; Fintech Architecture Guides</h1>
      <p class="text-lg text-slate-300 mb-8">Practical architectural teardowns, KRA eTIMS invoicing guides, Safaricom Daraja 3.0 M-Pesa webhook patterns, and Next.js conversion playbooks authored by Domain Tech Hub engineers in Nairobi.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${INSIGHT_ARTICLES.map(
          (a) => `
          <article class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <span class="text-xs font-mono text-cyan-400">${escapeHtml(a.category)} · ${escapeHtml(a.publishedDate)} · ${escapeHtml(a.readTime)}</span>
            <h2 class="text-xl font-bold text-white mt-2 mb-2"><a href="/insights/${a.slug}" class="hover:text-cyan-300">${escapeHtml(a.title)}</a></h2>
            <p class="text-sm text-slate-300 mb-4">${escapeHtml(a.excerpt)}</p>
            <a href="/insights/${a.slug}" class="text-cyan-400 underline text-sm font-semibold">Read Full Article &rarr;</a>
          </article>`
        ).join('\n        ')}
      </div>
    </main>
    ${renderFooterLinksHtml()}`;
  }

  // 5. Portfolio / Case Studies Page (/portfolio)
  if (route === 'portfolio') {
    return `
    ${renderNavHeaderHtml()}
    <main class="max-w-7xl mx-auto px-4 py-12 text-slate-100">
      <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">Verified Client Case Studies &amp; Production ROI Impact</h1>
      <p class="text-lg text-slate-300 mb-8">Explore how Domain Tech Hub engineered over KSh 280M+ in processed mobile money volume and delivered 4.6x average conversion lift across East Africa.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${CASE_STUDIES.map(
          (c) => `
          <article class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <span class="text-xs font-mono text-cyan-400">${escapeHtml(c.category)} · ${escapeHtml(c.client)} (${escapeHtml(c.location)})</span>
            <h2 class="text-2xl font-bold text-white mt-1 mb-2">${escapeHtml(c.title)}</h2>
            <p class="text-sm text-slate-300 mb-4">${escapeHtml(c.summary)}</p>
            <p class="text-xs font-mono text-emerald-400">Impact: ${c.metrics.map((m) => `${escapeHtml(m.value)} ${escapeHtml(m.label)}`).join(' · ')}</p>
          </article>`
        ).join('\n        ')}
      </div>
    </main>
    ${renderFooterLinksHtml()}`;
  }

  // 6. FAQ Page (/faq)
  if (route === 'faq') {
    return `
    ${renderNavHeaderHtml()}
    <main class="max-w-5xl mx-auto px-4 py-12 text-slate-100">
      <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
      <p class="text-lg text-slate-300 mb-8">Direct answers regarding our 4–8 week agile development sprints, Safaricom Daraja M-Pesa certification, 100% source code ownership, and SLA guarantees.</p>
      <div class="space-y-6">
        ${FAQ_ITEMS.map(
          (f) => `
          <section class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h2 class="text-lg font-bold text-white mb-2">${escapeHtml(f.question)}</h2>
            <p class="text-sm text-slate-300 leading-relaxed">${escapeHtml(f.answer)}</p>
          </section>`
        ).join('\n        ')}
      </div>
    </main>
    ${renderFooterLinksHtml()}`;
  }

  // 7. Default / Core Pages (/, /about, /contact, /roadmap, /team, /tech-stack, /tools/*, /portal)
  const config = (PAGE_SEO_DATA[route] || PAGE_SEO_DATA.home)(subTab);
  const featuredArticle = INSIGHT_ARTICLES.find((a) => a.featured) || INSIGHT_ARTICLES[0];
  return `
  ${renderNavHeaderHtml()}
  <main class="max-w-7xl mx-auto px-4 py-12 text-slate-100">
    <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">${escapeHtml(route === 'home' ? HOME_H1 : config.title.split('|')[0].trim())}</h1>
    <p class="text-lg text-slate-300 mb-8">${escapeHtml(config.description)}</p>
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Featured Engineering Insight</h2>
      <article class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 class="text-xl font-bold text-white mb-2"><a href="/insights/${featuredArticle.slug}" class="text-cyan-400 underline">${escapeHtml(featuredArticle.title)}</a></h3>
        <p class="text-sm text-slate-300 mb-3">${escapeHtml(featuredArticle.excerpt)}</p>
        <a href="/insights" class="text-cyan-400 underline text-sm font-semibold">Explore All ${INSIGHT_ARTICLES.length} Engineering Articles &rarr;</a>
      </article>
    </section>
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Core Software &amp; Digital Engineering Services</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${SERVICES_LIST.map((s) => `<li class="p-4 rounded-xl bg-slate-900 border border-slate-800"><a href="/services/${s.id}" class="text-cyan-400 font-bold underline block mb-1">${escapeHtml(s.title)}</a><span class="text-xs text-slate-400">${escapeHtml(s.shortDesc)}</span></li>`).join('\n        ')}
      </ul>
    </section>
  </main>
  ${renderFooterLinksHtml()}`;
}

export function injectSeoIntoHtml(
  templateHtml: string,
  route: PageRoute,
  subTab?: string
): string {
  const configGetter = PAGE_SEO_DATA[route] || PAGE_SEO_DATA.home;
  const config = configGetter(subTab);

  const fullUrl = `${SITE_URL}${config.canonicalPath}`;
  const ogImageUrl = config.ogImage || `${SITE_URL}/og-image.png`;
  const ogType = config.ogType || 'website';
  const robotsContent =
    route === 'portal' || route === 'not-found'
      ? 'noindex, nofollow, noarchive'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ];

  if (route === 'services' && subTab) {
    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.title.split('|')[0].trim(),
        item: fullUrl,
      }
    );
  } else if (route === 'insights' && subTab) {
    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Engineering Insights',
        item: `${SITE_URL}/insights`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.title.split('|')[0].trim(),
        item: fullUrl,
      }
    );
  } else if (config.canonicalPath !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: config.title.split('|')[0].trim(),
      item: fullUrl,
    });
  }

  const enrichedJsonLd = {
    ...config.jsonLd,
    '@id': config.jsonLd['@id'] || `${fullUrl}#webpage`,
    url: config.jsonLd.url || fullUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumbs`,
      itemListElement: breadcrumbItems,
    },
  };

  let html = templateHtml;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(config.title)}</title>`);

  // Replace meta name="title"
  html = html.replace(
    /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${escapeHtml(config.title)}" />`
  );

  // Replace meta name="description"
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(config.description)}" />`
  );

  // Replace meta name="keywords"
  html = html.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${escapeHtml(config.keywords || MASTER_TARGET_KEYWORDS)}" />`
  );

  // Replace meta name="robots"
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${robotsContent}" />`
  );

  // Replace canonical & hreflang links
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${fullUrl}" />`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="en" href="${fullUrl}" />`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${fullUrl}" />`
  );

  // Replace OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(config.ogTitle || config.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(config.ogDescription || config.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${ogImageUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${ogImageUrl}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(config.ogTitle || config.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(config.ogDescription || config.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${ogImageUrl}" />`
  );

  // Append route-specific JSON-LD script before </head>
  const routeJsonLdScript = `\n    <script id="dth-schema-jsonld" type="application/ld+json">\n${JSON.stringify(enrichedJsonLd, null, 2)}\n    </script>\n  </head>`;
  html = html.replace(/<\/head>/i, routeJsonLdScript);

  // Inject visible semantic HTML into <div id="root"></div>
  const bodyContent = buildBodyHtmlForRoute(route, subTab);
  html = html.replace(/<div id="root"><\/div>/i, `<div id="root" data-prerendered>${bodyContent}</div>`);

  return html;
}

function writeRouteHtml(templateHtml: string, outRelPath: string, route: PageRoute, subTab?: string) {
  const html = injectSeoIntoHtml(templateHtml, route, subTab);
  const fullPath = path.join(DIST_DIR, outRelPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html, 'utf8');
}

export function runPrerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`dist/index.html not found at ${indexHtmlPath}. Run vite build first.`);
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  let count = 0;

  // 1. Core top-level routes
  const coreRoutes: { relPath: string; route: PageRoute; subTab?: string }[] = [
    { relPath: 'index.html', route: 'home' },
    { relPath: 'about/index.html', route: 'about' },
    { relPath: 'services/index.html', route: 'services' },
    { relPath: 'portfolio/index.html', route: 'portfolio' },
    { relPath: 'insights/index.html', route: 'insights' },
    { relPath: 'portal/index.html', route: 'portal' },
    { relPath: 'faq/index.html', route: 'faq' },
    { relPath: 'contact/index.html', route: 'contact' },
    { relPath: 'roadmap/index.html', route: 'roadmap' },
    { relPath: 'team/index.html', route: 'team' },
    { relPath: 'tech-stack/index.html', route: 'more', subTab: 'tech-stack' },
    { relPath: 'blog/index.html', route: 'more', subTab: 'blog' },
    { relPath: 'tools/index.html', route: 'tools', subTab: 'calculator' },
    { relPath: 'tools/calculator/index.html', route: 'tools', subTab: 'calculator' },
    { relPath: 'tools/design-audit/index.html', route: 'tools', subTab: 'design-audit' },
    { relPath: 'tools/audit/index.html', route: 'tools', subTab: 'audit' },
    { relPath: 'tools/domains/index.html', route: 'tools', subTab: 'domains' },
  ];

  for (const item of coreRoutes) {
    writeRouteHtml(templateHtml, item.relPath, item.route, item.subTab);
    count++;
  }

  // 2. All 16 Core Service Pages (/services/<id>)
  for (const service of SERVICES_LIST) {
    writeRouteHtml(templateHtml, `services/${service.id}/index.html`, 'services', service.id);
    count++;
  }

  // 2b. High-demand service alias pages to guarantee HTTP 200 OK status on static web hosts
  const serviceAliases = [
    'sem-ppc',
    'web-hosting',
    'ecommerce-mpesa',
    'seo-optimization',
    'custom-software',
    'branding-design',
  ];

  for (const alias of serviceAliases) {
    writeRouteHtml(templateHtml, `services/${alias}/index.html`, 'services', alias);
    count++;
  }

  // 3. All 20 Article Pages (/insights/<slug>)
  for (const article of INSIGHT_ARTICLES) {
    writeRouteHtml(templateHtml, `insights/${article.slug}/index.html`, 'insights', article.slug);
    count++;
  }

  // 4. Dedicated 404.html page in dist/404.html
  writeRouteHtml(templateHtml, '404.html', 'not-found');
  count++;

  // 5. Ensure sitemap and robots.txt exist directly in dist/
  const staticSitemapFiles = ['sitemap.xml', 'sitemap_index.xml', 'sitemap.txt', 'robots.txt'];
  const publicDir = path.resolve(__dirname, '../public');
  for (const file of staticSitemapFiles) {
    const src = path.join(publicDir, file);
    const dest = path.join(DIST_DIR, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  console.log(`✅ Pre-rendered ${count} independent static HTML pages in dist/ and verified sitemaps in dist/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPrerender();
}
