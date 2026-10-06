import { InsightArticle } from '../data/insightsData';

export interface SecondaryKeywordMapping {
  keyword: string;
  slug: string;
  intent: 'commercial' | 'transactional' | 'informational';
  intentLabel: string;
  relevanceScore: number; // 0 - 100
  targetArticleId: string;
  targetUrl: string;
  targetServiceTitle: string;
  entityCategory: string;
  synonyms: string[];
  searchSnippetsDescription: string;
}

/**
 * High-performing secondary keyword ontology and relationship graph
 * specifically mapped to Domain Tech Hub engineering articles and services.
 */
export const HIGH_PERFORMING_KEYWORDS: SecondaryKeywordMapping[] = [
  {
    keyword: 'website development in Kenya',
    slug: 'website-development-in-kenya',
    intent: 'commercial',
    intentLabel: 'Commercial Intent',
    relevanceScore: 99,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/services/web-development',
    targetServiceTitle: 'Custom Website Development',
    entityCategory: 'WebDevelopment',
    synonyms: [
      'web development in kenya',
      'web development kenya',
      'website development kenya',
      'custom web development nairobi'
    ],
    searchSnippetsDescription: 'Production-grade fullstack website development in Kenya using modern TypeScript, Next.js, and sub-second Core Web Vitals architecture.'
  },
  {
    keyword: 'professional website Kenya',
    slug: 'professional-website-kenya',
    intent: 'commercial',
    intentLabel: 'Commercial Intent',
    relevanceScore: 98,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/tools/calculator',
    targetServiceTitle: 'Project Scope & Budget Calculator',
    entityCategory: 'BusinessServices',
    synonyms: [
      'professional website kenya',
      'professional business website kenya',
      'corporate website kenya'
    ],
    searchSnippetsDescription: 'Enterprise-grade corporate website architecture designed for verified credibility, customer trust, and organic Google conversions.'
  },
  {
    keyword: 'website designer in Kenya',
    slug: 'website-designer-in-kenya',
    intent: 'commercial',
    intentLabel: 'Commercial Intent',
    relevanceScore: 96,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/team',
    targetServiceTitle: 'Engineering Leadership & Senior Designers',
    entityCategory: 'DesignServices',
    synonyms: [
      'website designer in kenya',
      'web designer kenya',
      'top website designer nairobi',
      'experienced website designer in kenya'
    ],
    searchSnippetsDescription: 'Senior in-house UI/UX and fullstack web designers in Nairobi engineering high-converting responsive interfaces.'
  },
  {
    keyword: 'web design company in Kenya',
    slug: 'web-design-company-in-kenya',
    intent: 'transactional',
    intentLabel: 'Transactional Intent',
    relevanceScore: 97,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/about',
    targetServiceTitle: 'About Domain Tech Hub Nairobi',
    entityCategory: 'Corporation',
    synonyms: [
      'web design company in kenya',
      'web design company kenya',
      'best web design company in kenya',
      'nairobi web design agency'
    ],
    searchSnippetsDescription: 'Leading Nairobi web engineering studio delivering turnkey digital applications, headless commerce, and technical SEO.'
  },
  {
    keyword: 'ecommerce website development Kenya',
    slug: 'ecommerce-website-development-kenya',
    intent: 'transactional',
    intentLabel: 'Transactional Intent',
    relevanceScore: 99,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/services/ecommerce-development',
    targetServiceTitle: 'E-Commerce & Safaricom Daraja M-Pesa',
    entityCategory: 'EcommercePlatform',
    synonyms: [
      'ecommerce website development kenya',
      'ecommerce development kenya',
      'online store development kenya',
      'mpesa ecommerce website'
    ],
    searchSnippetsDescription: 'Headless e-commerce stores with automated Safaricom Daraja 3.0 M-Pesa STK Push checkouts and zero-loss webhooks.'
  },
  {
    keyword: 'business website Kenya',
    slug: 'business-website-kenya',
    intent: 'commercial',
    intentLabel: 'Commercial Intent',
    relevanceScore: 95,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/services/web-development',
    targetServiceTitle: 'Business Website Architecture',
    entityCategory: 'BusinessServices',
    synonyms: [
      'business website kenya',
      'sme website kenya',
      'corporate website nairobi'
    ],
    searchSnippetsDescription: 'Revenue-generating business websites engineered around customer funnels, WhatsApp click-to-chat triggers, and SSL security.'
  },
  {
    keyword: 'website design Nairobi',
    slug: 'website-design-nairobi',
    intent: 'commercial',
    intentLabel: 'Local Intent',
    relevanceScore: 97,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/contact',
    targetServiceTitle: 'Nairobi Studio Consultation',
    entityCategory: 'LocalBusiness',
    synonyms: [
      'website design nairobi',
      'web design nairobi',
      'web developers in nairobi westlands'
    ],
    searchSnippetsDescription: 'Delta Corner Tower, Westlands, Nairobi web design studio delivering sub-second digital experiences for regional enterprises.'
  },
  {
    keyword: 'M-Pesa API integration Kenya',
    slug: 'mpesa-api-integration-kenya',
    intent: 'transactional',
    intentLabel: 'Fintech Intent',
    relevanceScore: 98,
    targetArticleId: 'mpesa-daraja-zero-loss',
    targetUrl: '/services/ecommerce-development',
    targetServiceTitle: 'M-Pesa Daraja 3.0 Integration',
    entityCategory: 'FintechService',
    synonyms: [
      'mpesa api integration kenya',
      'safaricom daraja api kenya',
      'daraja webhook integration'
    ],
    searchSnippetsDescription: 'Idempotent Safaricom Daraja 3.0 STK push and C2B/B2C payment automation with Redis BullMQ queuing.'
  },
  {
    keyword: 'headless Next.js development Kenya',
    slug: 'headless-nextjs-development-kenya',
    intent: 'commercial',
    intentLabel: 'Technical Intent',
    relevanceScore: 94,
    targetArticleId: 'headless-nextjs-vs-wordpress',
    targetUrl: '/services/web-development',
    targetServiceTitle: 'Modern Next.js Frontend Engineering',
    entityCategory: 'ComputerSoftware',
    synonyms: [
      'next.js development kenya',
      'headless nextjs nairobi',
      'react web application kenya'
    ],
    searchSnippetsDescription: 'Decoupled presentation layer with React Server Components, ISR caching, and sub-second Largest Contentful Paint.'
  },
  {
    keyword: 'technical SEO audit Nairobi',
    slug: 'technical-seo-audit-nairobi',
    intent: 'commercial',
    intentLabel: 'Audit & SEO',
    relevanceScore: 95,
    targetArticleId: 'local-seo-core-web-vitals',
    targetUrl: '/tools/audit',
    targetServiceTitle: 'Instant Core Web Vitals & SEO Scanner',
    entityCategory: 'AuditService',
    synonyms: [
      'technical seo audit nairobi',
      'seo services kenya',
      'google ranking nairobi'
    ],
    searchSnippetsDescription: 'Structured JSON-LD schema injection, entity graph optimization, and Core Web Vitals speed tuning for #1 Google 3-Pack rankings.'
  },
  {
    keyword: 'custom CRM software Kenya',
    slug: 'custom-crm-software-kenya',
    intent: 'transactional',
    intentLabel: 'Enterprise Intent',
    relevanceScore: 96,
    targetArticleId: 'bespoke-crm-vs-spreadsheets',
    targetUrl: '/services/custom-crm-development',
    targetServiceTitle: 'Custom Cloud CRM & ERP Systems',
    entityCategory: 'EnterpriseSoftware',
    synonyms: [
      'custom crm software kenya',
      'cloud crm nairobi',
      'custom erp kenya'
    ],
    searchSnippetsDescription: 'Multi-tenant PostgreSQL cloud CRMs with role-based access control, eliminating recurring SaaS license fees.'
  },
  {
    keyword: 'Point of Sale POS system prices Kenya',
    slug: 'pos-system-prices-kenya',
    intent: 'commercial',
    intentLabel: 'Hardware & Retail',
    relevanceScore: 99,
    targetArticleId: 'bespoke-crm-vs-spreadsheets',
    targetUrl: '/services/pos-systems',
    targetServiceTitle: 'Point of Sale (POS) Systems & Hardware',
    entityCategory: 'RetailHardware',
    synonyms: [
      'pos prices kenya',
      'pos machine price in kenya',
      'pos systems kenya',
      'cloud pos kenya',
      'all in one touchscreen pos kenya'
    ],
    searchSnippetsDescription: 'POS system prices in Kenya from KSh 500/mo cloud software to KSh 100,000+ complete touchscreen hardware bundles with KRA e-TIMS.'
  },
  {
    keyword: 'best web development agency Nairobi',
    slug: 'best-web-development-agency-nairobi',
    intent: 'commercial',
    intentLabel: 'Agency Search',
    relevanceScore: 99,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/services/web-development',
    targetServiceTitle: 'Custom Website Development',
    entityCategory: 'AgencyServices',
    synonyms: [
      'best web developers in nairobi',
      'top web design companies kenya',
      'software engineering company nairobi'
    ],
    searchSnippetsDescription: 'Top-ranked software engineering studio in Nairobi delivering sub-second Core Web Vitals, 100% source code ownership, and 4.6x average ROI.'
  }
];

/**
 * Returns all secondary keywords associated with a specific article.
 */
export function getKeywordsForArticle(articleId: string): SecondaryKeywordMapping[] {
  return HIGH_PERFORMING_KEYWORDS.filter(k => k.targetArticleId === articleId);
}

/**
 * Returns articles that match a selected secondary keyword.
 */
export function filterArticlesByKeyword(articles: InsightArticle[], keywordSlug: string): InsightArticle[] {
  const mapping = HIGH_PERFORMING_KEYWORDS.find(k => k.slug === keywordSlug);
  if (!mapping) return articles;

  const targetId = mapping.targetArticleId;
  const matchedTerm = mapping.keyword.toLowerCase();

  return articles.filter(article => {
    if (article.id === targetId) return true;
    const inTags = article.tags.some(t => t.toLowerCase().includes(matchedTerm) || mapping.synonyms.some(s => t.toLowerCase().includes(s)));
    const inTitle = article.title.toLowerCase().includes(matchedTerm);
    const inExcerpt = article.excerpt.toLowerCase().includes(matchedTerm);
    return inTags || inTitle || inExcerpt;
  });
}

/**
 * Automated in-text semantic keyword injection mechanism.
 * Scans plain text segments and replaces unlinked occurrences of high-performing
 * secondary keywords with semantic internal links pointing to relevant live services or tools.
 */
export function injectSemanticKeywords(text: string, currentArticleId?: string): string {
  // First, extract existing markdown links so we don't double-wrap them
  const existingLinks: { placeholder: string; original: string }[] = [];
  let linkCounter = 0;

  let sanitized = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match) => {
    const placeholder = `__EXISTING_LINK_${linkCounter++}__`;
    existingLinks.push({ placeholder, original: match });
    return placeholder;
  });

  // Sort keywords by length descending so longer phrases match first
  const sortedKeywords = [...HIGH_PERFORMING_KEYWORDS].sort((a, b) => b.keyword.length - a.keyword.length);

  for (const item of sortedKeywords) {
    // Avoid self-referencing links if it points back to this same article unless pointing to a dedicated service
    const regex = new RegExp(`\\b(${escapeRegex(item.keyword)})\\b`, 'gi');

    // Replace first 1 or 2 occurrences max per section to keep natural readability
    let replacements = 0;
    sanitized = sanitized.replace(regex, (matched) => {
      if (replacements < 2) {
        replacements++;
        return `[${matched}](${item.targetUrl})`;
      }
      return matched;
    });
  }

  // Restore original markdown links
  for (const { placeholder, original } of existingLinks) {
    sanitized = sanitized.replace(placeholder, original);
  }

  return sanitized;
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Generates rich Schema.org JSON-LD Article / BlogPosting structured data
 * dynamically populated with primary and secondary keyword entities.
 */
export function generateArticleJsonLd(article: InsightArticle): Record<string, any> {
  const mappedKeywords = getKeywordsForArticle(article.id);
  const allKeywords = [
    article.title,
    ...mappedKeywords.map(k => k.keyword),
    ...article.tags
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `https://domaintechhub.com/insights/${article.slug}`,
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: '2026-10-01T08:00:00+03:00',
    dateModified: new Date().toISOString(),
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://domaintechhub.com/insights/${article.slug}`
    },
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      worksFor: {
        '@type': 'Organization',
        name: 'Domain Tech Hub',
        url: 'https://domaintechhub.com'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Domain Tech Hub',
      url: 'https://domaintechhub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://domaintechhub.com/favicon.svg',
        width: 192,
        height: 192
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Delta Corner Tower, Westlands',
        addressLocality: 'Nairobi',
        addressCountry: 'KE'
      },
      telephone: '+254118746676'
    },
    keywords: allKeywords.join(', '),
    articleSection: article.category,
    wordCount: article.contentSections.reduce((acc, s) => acc + s.body.split(/\s+/).length, 0),
    about: mappedKeywords.map(k => ({
      '@type': 'Thing',
      name: k.keyword,
      category: k.entityCategory,
      description: k.searchSnippetsDescription
    })),
    mentions: [
      {
        '@type': 'Thing',
        name: 'Safaricom Daraja M-Pesa'
      },
      {
        '@type': 'Thing',
        name: 'Communications Authority of Kenya'
      },
      {
        '@type': 'Thing',
        name: 'Google Search Central'
      }
    ]
  };
}
