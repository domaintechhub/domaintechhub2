import { SITE_URL } from '../config/site';
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
  },
  {
    keyword: 'KRA eTIMS invoice system integration',
    slug: 'kra-etims-invoice-integration',
    intent: 'transactional',
    intentLabel: 'Tax Compliance',
    relevanceScore: 99,
    targetArticleId: 'how-to-generate-an-etims-invoice',
    targetUrl: '/services/pos-systems',
    targetServiceTitle: 'KRA eTIMS & POS Integration',
    entityCategory: 'TaxTechnology',
    synonyms: [
      'etims invoice kenya',
      'kra etims integration',
      'etims pos system',
      'automated etims invoicing'
    ],
    searchSnippetsDescription: 'Direct KRA eTIMS API integrations for ERP, e-commerce, and point of sale systems with automated QR code generation.'
  },
  {
    keyword: 'Safaricom Daraja 3.0 M-Pesa STK Push',
    slug: 'safaricom-daraja-stk-push',
    intent: 'transactional',
    intentLabel: 'Payment Gateway',
    relevanceScore: 99,
    targetArticleId: 'zero-loss-mpesa-stk-push-architecture',
    targetUrl: '/services/ecommerce-development',
    targetServiceTitle: 'E-Commerce M-Pesa Checkout',
    entityCategory: 'FintechAPI',
    synonyms: [
      'mpesa stk push kenya',
      'daraja 3.0 integration',
      'zero loss mpesa webhooks'
    ],
    searchSnippetsDescription: 'Production-tested Safaricom Daraja 3.0 STK Push integration with Redis queuing and zero lost payment callbacks.'
  },
  {
    keyword: 'Technical SEO & Core Web Vitals Nairobi',
    slug: 'technical-seo-core-web-vitals',
    intent: 'commercial',
    intentLabel: 'Google Ranking',
    relevanceScore: 98,
    targetArticleId: 'local-seo-core-web-vitals-nairobi-kenya',
    targetUrl: '/services/seo-services',
    targetServiceTitle: 'Technical SEO & Search Optimization',
    entityCategory: 'SEOOptimization',
    synonyms: [
      'technical seo nairobi',
      'google #1 ranking kenya',
      'local seo nairobi'
    ],
    searchSnippetsDescription: 'Rank #1 on Google in Nairobi with sub-second page loads, structured JSON-LD schema, and local citation dominance.'
  },
  {
    keyword: 'Kenya Website Cost & Scope Estimator',
    slug: 'kenya-website-cost-calculator',
    intent: 'transactional',
    intentLabel: 'Interactive Tool',
    relevanceScore: 97,
    targetArticleId: 'website-design-in-kenya-business-guide-2026',
    targetUrl: '/tools/calculator',
    targetServiceTitle: 'Instant Project Cost Estimator',
    entityCategory: 'PricingTool',
    synonyms: [
      'website design cost kenya',
      'web design prices nairobi',
      'software development quote kenya'
    ],
    searchSnippetsDescription: 'Interactive online scope estimator for web design, e-commerce, and mobile applications with instant KES and USD pricing.'
  },
  {
    keyword: 'Free Core Web Vitals & SEO Scanner',
    slug: 'free-seo-speed-audit-scanner',
    intent: 'commercial',
    intentLabel: 'Free Audit Tool',
    relevanceScore: 96,
    targetArticleId: 'answer-engine-optimization-aeo-geo-kenya-guide',
    targetUrl: '/tools/audit',
    targetServiceTitle: 'Free Live SEO & Speed Audit',
    entityCategory: 'AuditTool',
    synonyms: [
      'free website audit kenya',
      'seo score check kenya',
      'page speed test nairobi'
    ],
    searchSnippetsDescription: 'Scan any Kenyan website for performance bottlenecks, mobile usability issues, and missing Schema markup in seconds.'
  },
  {
    keyword: '.co.ke Domain Registration & Fast NVMe Hosting',
    slug: 'coke-domain-nvme-hosting-kenya',
    intent: 'transactional',
    intentLabel: 'Cloud Infrastructure',
    relevanceScore: 95,
    targetArticleId: 'zero-downtime-postgresql-migrations-disaster-recovery',
    targetUrl: '/tools/domains',
    targetServiceTitle: 'Domain & Hosting Lookup',
    entityCategory: 'WebHosting',
    synonyms: [
      'co.ke domain registration kenya',
      'nvme cloud hosting nairobi',
      'fast web hosting kenya'
    ],
    searchSnippetsDescription: 'Blazing-fast local NVMe cloud hosting with 99.99% uptime SLA, automated SSL, and official .co.ke domain provisioning.'
  },
  {
    keyword: 'Affordable Web Design Nairobi & Kenya',
    slug: 'affordable-web-design-nairobi',
    intent: 'transactional',
    intentLabel: 'Budget-Friendly Web Design',
    relevanceScore: 99,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/services/web-development',
    targetServiceTitle: 'Custom Website Development',
    entityCategory: 'WebDesign',
    synonyms: [
      'affordable web design nairobi',
      'cheap website design nairobi',
      'affordable website design kenya',
      'cheap website design kenya',
      'affordable website designers nairobi',
      'affordable website developers kenya',
      'trusted website designers nairobi',
      'website design prices kenya',
      'website design cost kenya',
      'website design packages kenya',
      'web design packages nairobi',
      'responsive website design nairobi',
      'responsive website design kenya',
      'custom website development kenya',
      'business website nairobi',
      'corporate website design kenya',
      'startup website kenya',
      'small business website nairobi',
      'web developers near me nairobi',
      'best web developers nairobi',
      'website designers nairobi',
      'website designers kenya',
      'top web designers kenya',
      'professional website developers in kenya',
      'web design company nairobi',
      'web design company kenya',
      'website redesign nairobi',
      'seo-friendly website kenya',
      'mobile-friendly website kenya',
      'website design mombasa',
      'website design kisumu',
      'website design nakuru',
      'website design eldoret',
      'website design thika',
      'web development mombasa',
      'web development kisumu',
      'web development nakuru',
      'web development eldoret'
    ],
    searchSnippetsDescription: 'Affordable, transparent web design packages in Nairobi and across Kenya. Custom mobile-first responsive websites built for speed and ROI from KSh 85,000.'
  },
  {
    keyword: 'POS Software Kenya & Point of Sale System Nairobi',
    slug: 'pos-software-kenya-point-of-sale',
    intent: 'transactional',
    intentLabel: 'Retail & POS Systems',
    relevanceScore: 98,
    targetArticleId: 'pos-system-prices-kenya-kra-etims-guide',
    targetUrl: '/services/pos-systems',
    targetServiceTitle: 'Point of Sale (POS) Systems & Hardware',
    entityCategory: 'PointOfSale',
    synonyms: [
      'pos software kenya',
      'pos system nairobi',
      'point of sale software kenya',
      'custom pos system kenya',
      'supermarket pos system kenya',
      'pharmacy pos software nairobi',
      'kra etims compliant pos software'
    ],
    searchSnippetsDescription: 'Cloud and offline POS software with touchscreen hardware, barcode scanners, 80mm thermal printers, and real-time KRA eTIMS invoice generation across Kenya.'
  },
  {
    keyword: 'Android App Development Kenya & Mobile App Developers Nairobi',
    slug: 'android-app-development-kenya-nairobi',
    intent: 'commercial',
    intentLabel: 'Mobile App Engineering',
    relevanceScore: 97,
    targetArticleId: 'offline-first-pwa-field-sales-agriculture-kenya',
    targetUrl: '/services/mobile-app-development',
    targetServiceTitle: 'Native & Cross-Platform Mobile Apps',
    entityCategory: 'MobileDevelopment',
    synonyms: [
      'android app development kenya',
      'mobile app developers nairobi',
      'mobile application development kenya',
      'business app development kenya',
      'app developers near me kenya',
      'flutter app development kenya',
      'react native developers nairobi'
    ],
    searchSnippetsDescription: 'Full-stack Android and iOS mobile application development in Nairobi. Fast, secure mobile apps with native M-Pesa STK Push payments and offline data synchronization.'
  },
  {
    keyword: 'LMS Development Kenya & School Management Systems',
    slug: 'lms-development-school-management-kenya',
    intent: 'transactional',
    intentLabel: 'Education Technology',
    relevanceScore: 96,
    targetArticleId: 'website-design-in-kenya-business-guide-2026',
    targetUrl: '/services/cms-development',
    targetServiceTitle: 'CMS & WordPress Development',
    entityCategory: 'EducationTechnology',
    synonyms: [
      'lms development kenya',
      'affordable learning management systems nairobi',
      'e-learning platform kenya',
      'school management system kenya',
      'educational website development kenya',
      'school website design kenya',
      'school website kenya'
    ],
    searchSnippetsDescription: 'Custom and affordable Learning Management Systems (LMS) and school management portals in Kenya with student registration, fee tracking, and online exams.'
  },
  {
    keyword: 'Online Invoicing System & Invoice Generator Kenya',
    slug: 'invoice-generator-online-invoicing-kenya',
    intent: 'transactional',
    intentLabel: 'Business Invoicing',
    relevanceScore: 97,
    targetArticleId: 'automated-invoice-ocr-lpo-matching-erp-kenya',
    targetUrl: '/services/custom-crm-development',
    targetServiceTitle: 'Custom CRM & Business Systems',
    entityCategory: 'FinancialSoftware',
    synonyms: [
      'invoice generator kenya',
      'invoicing software nairobi',
      'online invoicing system kenya',
      'invoice management software kenya',
      'business software kenya',
      'crm software domaintechhub kenya',
      'custom crm development nairobi',
      'inventory management software kenya',
      'sales management software kenya',
      'business automation services kenya',
      'workflow automation kenya'
    ],
    searchSnippetsDescription: 'Online invoicing software and custom CRM systems in Kenya. Generate professional PDF invoices, automate M-Pesa client receipts, and sync with KRA eTIMS.'
  },
  {
    keyword: 'WordPress Web Design Kenya & WooCommerce Developers Nairobi',
    slug: 'wordpress-website-design-woocommerce-kenya',
    intent: 'commercial',
    intentLabel: 'CMS & WooCommerce',
    relevanceScore: 96,
    targetArticleId: 'headless-nextjs-vs-wordpress-kenya',
    targetUrl: '/services/cms-development',
    targetServiceTitle: 'CMS & WordPress Development',
    entityCategory: 'CMSDevelopment',
    synonyms: [
      'affordable wordpress developers nairobi',
      'wordpress website design kenya',
      'woocommerce kenya',
      'wordpress website kenya',
      'wordpress web design nairobi',
      'wordpress developers nairobi'
    ],
    searchSnippetsDescription: 'Fast, secure WordPress and WooCommerce development in Kenya. Custom themes, plugin optimization, and automated Safaricom M-Pesa STK Push checkouts.'
  },
  {
    keyword: 'NGO & Church Website Design in Kenya',
    slug: 'ngo-church-website-design-kenya',
    intent: 'commercial',
    intentLabel: 'Non-Profit & Community',
    relevanceScore: 95,
    targetArticleId: 'website-design-in-kenya-business-guide-2026',
    targetUrl: '/services/cms-development',
    targetServiceTitle: 'CMS & WordPress Development',
    entityCategory: 'NonProfitWebsites',
    synonyms: [
      'ngo websites kenya',
      'non-profit website design nairobi',
      'ngo website design kenya',
      'church websites kenya',
      'church website design nairobi'
    ],
    searchSnippetsDescription: 'Authoritative and engaging website design for NGOs, charitable trusts, and churches in Kenya with donation portals, donor reporting, and event calendars.'
  },
  {
    keyword: 'Graphic Design Kenya & Logo Design Nairobi',
    slug: 'graphic-design-logo-branding-kenya',
    intent: 'commercial',
    intentLabel: 'Branding & Identity',
    relevanceScore: 95,
    targetArticleId: 'website-design-in-kenya-2026',
    targetUrl: '/services/graphic-design-branding',
    targetServiceTitle: 'Graphic Design & Corporate Branding',
    entityCategory: 'BrandIdentity',
    synonyms: [
      'graphic design kenya',
      'logo design nairobi',
      'brand identity domaintechhub kenya',
      'corporate branding nairobi'
    ],
    searchSnippetsDescription: 'Professional corporate logo design, vector graphics, company profiles, and complete brand identity guidelines for businesses in Nairobi and Kenya.'
  },
  {
    keyword: 'Outsource Web Development to Africa & Hire Kenyan Developers',
    slug: 'outsource-web-development-africa-kenyan-developers',
    intent: 'commercial',
    intentLabel: 'Nearshore & Offshore Teams',
    relevanceScore: 98,
    targetArticleId: 'modular-monoliths-vs-microservices-african-startups',
    targetUrl: '/about',
    targetServiceTitle: 'About Domain Tech Hub Nairobi',
    entityCategory: 'OffshoreDevelopment',
    synonyms: [
      'outsource web development to africa',
      'hire african developers',
      'hire kenyan developers',
      'offshore web development africa',
      'nearshore development east africa',
      'affordable react next.js developers',
      'software developers nairobi',
      'software company kenya',
      'it company nairobi',
      'tech company kenya',
      'custom software development kenya',
      'custom web application development kenya',
      'api integration services kenya',
      'domain tech hub',
      'web design and development east africa'
    ],
    searchSnippetsDescription: 'Outsource full-stack web and mobile development to senior engineers in Nairobi, Kenya. Perfect European timezone overlap (UTC+3), fluent English communication, and world-class TypeScript & Next.js code.'
  },
  {
    keyword: 'East Africa & South Africa Fintech & E-Commerce Integration',
    slug: 'east-africa-south-africa-fintech-integration',
    intent: 'transactional',
    intentLabel: 'Regional Fintech Integration',
    relevanceScore: 97,
    targetArticleId: 'multi-currency-checkout-kes-usd-safari-export-kenya',
    targetUrl: '/services/ecommerce-development',
    targetServiceTitle: 'E-Commerce Store Development & M-Pesa Integration',
    entityCategory: 'RegionalFintech',
    synonyms: [
      'expand ecommerce to africa',
      'next.js developers south africa',
      'affordable web design south africa',
      'custom crm development south africa',
      'payfast integration developer',
      'ozow integration developer',
      'web design rwanda',
      'web development company kigali',
      'website developers rwanda',
      'mtn momo api integration rwanda',
      'fintech software development rwanda',
      'web design tanzania',
      'web development company dar es salaam',
      'website developers tanzania',
      'm-pesa tanzania api integration',
      'tigo pesa and airtel money integration',
      'ecommerce website tanzania',
      'tengeneza website tanzania',
      'web design uganda',
      'web development company kampala',
      'website developers uganda',
      'ecommerce website uganda',
      'mtn mobile money api integration',
      'airtel money integration uganda',
      'payment gateway integration uganda',
      'custom crm software uganda',
      'm-pesa integration developers'
    ],
    searchSnippetsDescription: 'Regional African payment gateway integration across Kenya, Uganda, Tanzania, Rwanda, and South Africa: Safaricom Daraja M-Pesa, MTN Mobile Money, Airtel Money, PayFast, and Ozow.'
  }
];

/**
 * Returns all secondary keywords associated with a specific article.
 */
export function getKeywordsForArticle(articleId: string): SecondaryKeywordMapping[] {
  const normalizedId = articleId.toLowerCase().trim();
  
  const directMatches = HIGH_PERFORMING_KEYWORDS.filter(k => {
    const target = k.targetArticleId.toLowerCase();
    return target === normalizedId || 
           normalizedId.includes(target) || 
           target.includes(normalizedId) ||
           normalizedId.replace('-business-guide-2026', '-2026') === target;
  });

  if (directMatches.length > 0) return directMatches;

  // Curate contextual high-impact internal backlinks based on category or content themes
  if (normalizedId.includes('etims') || normalizedId.includes('pos')) {
    return HIGH_PERFORMING_KEYWORDS.filter(k => k.slug.includes('etims') || k.slug.includes('pos') || k.targetUrl.includes('pos') || k.targetUrl.includes('calculator'));
  }

  if (normalizedId.includes('mpesa') || normalizedId.includes('daraja') || normalizedId.includes('payout')) {
    return HIGH_PERFORMING_KEYWORDS.filter(k => k.slug.includes('daraja') || k.slug.includes('mpesa') || k.targetUrl.includes('ecommerce') || k.targetUrl.includes('calculator'));
  }

  if (normalizedId.includes('seo') || normalizedId.includes('aeo') || normalizedId.includes('vitals') || normalizedId.includes('ads')) {
    return HIGH_PERFORMING_KEYWORDS.filter(k => k.slug.includes('seo') || k.slug.includes('audit') || k.targetUrl.includes('seo') || k.targetUrl.includes('audit'));
  }

  // Fallback to foundational commercial links so EVERY article passes PageRank
  return [
    HIGH_PERFORMING_KEYWORDS[0], // website development in Kenya
    HIGH_PERFORMING_KEYWORDS[4], // ecommerce website development Kenya
    HIGH_PERFORMING_KEYWORDS[7], // technical SEO audit Nairobi
    HIGH_PERFORMING_KEYWORDS[11] // Kenya Website Cost & Scope Estimator
  ].filter(Boolean);
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

  const fullCoverImage = article.coverImage.startsWith('http')
    ? article.coverImage
    : `${SITE_URL}${article.coverImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_URL}/insights/${article.slug}`,
    headline: article.title,
    description: article.excerpt,
    image: [fullCoverImage],
    datePublished: '2026-10-01T08:00:00+03:00',
    dateModified: new Date().toISOString(),
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/insights/${article.slug}`
    },
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      worksFor: {
        '@type': 'Organization',
        name: 'Domain Tech Hub',
        url: SITE_URL
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Domain Tech Hub',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
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
