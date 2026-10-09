/**
 * Articles & Technical Insights Data Registry
 * Central repository of technical blog posts, architectural deep-dives,
 * and thought leadership articles published by Domain Tech Hub.
 */

import { SITE_URL } from '../config/site';

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  category: 'Fintech & Payments' | 'Modern Engineering' | 'Technical SEO' | 'AI & Automation' | 'Cloud & Security';
  publishedDate: string;
  readTime: string;
  author: ArticleAuthor;
  excerpt: string;
  coverImage: string;
  featured?: boolean;
  tags: string[];
  canonicalUrl: string;
  blogUrl: string;
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const BASE_URL = SITE_URL;

export const ARTICLES_DATA: ArticleData[] = [
  {
    id: 'how-to-generate-an-etims-invoice',
    title: 'How to Generate an eTIMS Invoice',
    slug: 'how-to-generate-an-etims-invoice',
    category: 'Fintech & Payments',
    publishedDate: '2026-10-09',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'Every sale a Kenyan business makes now leaves a digital footprint with the Kenya Revenue Authority. The eTIMS invoice is how that footprint is created—and once the right technology is in place, the process is quick and largely automatic.',
    coverImage: '/images/articles/how-to-generate-an-etims-invoice.webp',
    tags: ['eTIMS Invoice', 'KRA eTIMS', 'Tax Compliance Kenya', 'POS Integration', 'E-Commerce Invoicing'],
    canonicalUrl: `${BASE_URL}/insights/how-to-generate-an-etims-invoice`,
    blogUrl: `${BASE_URL}/blog/how-to-generate-an-etims-invoice`,
    priority: '0.90',
    changefreq: 'monthly'
  },
  {
    id: 'mpesa-daraja-zero-loss',
    title: 'Zero-Loss M-Pesa STK Push: Architecting Resilient Webhooks on Safaricom Daraja API',
    slug: 'zero-loss-mpesa-stk-push-architecture',
    category: 'Fintech & Payments',
    publishedDate: '2026-09-15',
    readTime: '6 min read',
    featured: true,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'How Kenyan e-commerce platforms lose up to 14% of mobile revenue due to unhandled Daraja timeouts, and the exact idempotency and queuing architecture we use to guarantee 99.9% reconciliation.',
    coverImage: '/images/articles/mpesa-daraja-zero-loss.webp',
    tags: ['M-Pesa API', 'Fintech', 'Node.js', 'Redis', 'Kenya', 'Daraja 3.0'],
    canonicalUrl: `${BASE_URL}/insights/zero-loss-mpesa-stk-push-architecture`,
    blogUrl: `${BASE_URL}/blog/zero-loss-mpesa-stk-push-architecture`,
    priority: '0.90',
    changefreq: 'monthly'
  },
  {
    id: 'headless-nextjs-vs-wordpress',
    title: 'Why Top Kenyan Brands are Migrating from Monolithic WordPress to Headless Next.js',
    slug: 'headless-nextjs-vs-wordpress-kenya',
    category: 'Modern Engineering',
    publishedDate: '2026-09-20',
    readTime: '5 min read',
    featured: true,
    author: {
      name: 'Faith Chepngetich',
      role: 'Principal Frontend Engineer',
      avatar: '/images/team/author-faith.webp'
    },
    excerpt: 'A benchmark analysis comparing PHP/WooCommerce page speed against Next.js 15 on Kenyan mobile networks, showing how sub-second LCP directly increases conversion rates by 3.2x.',
    coverImage: '/images/articles/headless-nextjs-vs-wordpress.webp',
    tags: ['Next.js', 'React', 'Performance', 'Web Architecture', 'Core Web Vitals'],
    canonicalUrl: `${BASE_URL}/insights/headless-nextjs-vs-wordpress-kenya`,
    blogUrl: `${BASE_URL}/blog/headless-nextjs-vs-wordpress-kenya`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'local-seo-nairobi-guide',
    title: 'Mastering Local Technical SEO in East Africa: How to Rank #1 on Google in Nairobi',
    slug: 'local-seo-core-web-vitals-nairobi-kenya',
    category: 'Technical SEO',
    publishedDate: '2026-09-24',
    readTime: '7 min read',
    featured: false,
    author: {
      name: 'Dennis Ochieng',
      role: 'Technical SEO & GEO Strategist',
      avatar: '/images/team/author-dennis.webp'
    },
    excerpt: 'The definitive blueprint for winning Google Local 3-Pack rankings and generative AI citations in Kenya through structured JSON-LD, localized schemas, and sub-1s Core Web Vitals.',
    coverImage: '/images/articles/local-seo-core-web-vitals.webp',
    tags: ['SEO Kenya', 'Google Maps', 'Local SEO', 'AEO', 'Schema Markup'],
    canonicalUrl: `${BASE_URL}/insights/local-seo-core-web-vitals-nairobi-kenya`,
    blogUrl: `${BASE_URL}/blog/local-seo-core-web-vitals-nairobi-kenya`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'whatsapp-cloud-api-automation',
    title: 'Transforming Inbound Leads: Architecting Meta WhatsApp Cloud API Sales Bots',
    slug: 'whatsapp-cloud-api-sales-automation',
    category: 'AI & Automation',
    publishedDate: '2026-09-28',
    readTime: '6 min read',
    featured: false,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'Step-by-step engineering guide to creating multi-tenant WhatsApp customer support and sales automation bots connected directly to your custom inventory and CRM backend.',
    coverImage: '/images/articles/whatsapp-cloud-api-automation.webp',
    tags: ['WhatsApp Cloud API', 'Automation', 'Meta Developer', 'Chatbots', 'CRM'],
    canonicalUrl: `${BASE_URL}/insights/whatsapp-cloud-api-sales-automation`,
    blogUrl: `${BASE_URL}/blog/whatsapp-cloud-api-sales-automation`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'custom-crm-vs-excel-kenya',
    title: 'Outgrowing Excel: Why Kenyan Mid-Market Enterprises are Building Custom Cloud CRMs',
    slug: 'bespoke-crm-vs-spreadsheets-kenya',
    category: 'Modern Engineering',
    publishedDate: '2026-10-02',
    readTime: '8 min read',
    featured: false,
    author: {
      name: 'Faith Chepngetich',
      role: 'Principal Frontend Engineer',
      avatar: '/images/team/author-faith.webp'
    },
    excerpt: 'How Kenyan logistics, healthcare, and retail businesses waste hundreds of hours on broken spreadsheet formulas and why custom web-based CRMs deliver full payback within 6 months.',
    coverImage: '/images/articles/bespoke-crm-vs-spreadsheets.webp',
    tags: ['CRM', 'ERP', 'Enterprise Software', 'Database Architecture', 'Productivity'],
    canonicalUrl: `${BASE_URL}/insights/bespoke-crm-vs-spreadsheets-kenya`,
    blogUrl: `${BASE_URL}/blog/bespoke-crm-vs-spreadsheets-kenya`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'ecommerce-fraud-prevention-kenya',
    title: 'Fortifying African E-Commerce: Protecting Cross-Border Payments Against Fraud & Chargebacks',
    slug: 'cybersecurity-ecommerce-kenya-fraud-prevention',
    category: 'Cloud & Security',
    publishedDate: '2026-10-04',
    readTime: '7 min read',
    featured: false,
    author: {
      name: 'Dennis Ochieng',
      role: 'Technical SEO & GEO Strategist',
      avatar: '/images/team/author-dennis.webp'
    },
    excerpt: 'Essential security measures for merchants processing M-Pesa, Pesapal, Visa, and Mastercard transactions in East Africa, covering tokenization, rate limiting, and 3D Secure 2.0.',
    coverImage: '/images/articles/cybersecurity-ecommerce-kenya.webp',
    tags: ['Cybersecurity', 'Fintech', 'Fraud Prevention', 'PCI-DSS', 'Payment Gateways'],
    canonicalUrl: `${BASE_URL}/insights/cybersecurity-ecommerce-kenya-fraud-prevention`,
    blogUrl: `${BASE_URL}/blog/cybersecurity-ecommerce-kenya-fraud-prevention`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'website-design-kenya-2026-guide',
    title: 'Website Design in Kenya: Why Every Business Needs a Professional Website in 2026',
    slug: 'website-design-in-kenya-business-guide-2026',
    category: 'Modern Engineering',
    publishedDate: '2026-10-06',
    readTime: '9 min read',
    featured: true,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'Explore why website design in Kenya is no longer simply a digital brochure in 2026, but the core revenue engine connecting Google search, social media, and native WhatsApp sales for sustainable enterprise growth.',
    coverImage: '/images/articles/website-design-in-kenya-2026.webp',
    tags: ['Web Design Kenya', 'Web Development Nairobi', 'E-Commerce Kenya', 'Business Growth', 'M-Pesa STK Push'],
    canonicalUrl: `${BASE_URL}/insights/website-design-in-kenya-business-guide-2026`,
    blogUrl: `${BASE_URL}/blog/website-design-in-kenya-business-guide-2026`,
    priority: '0.90',
    changefreq: 'monthly'
  },
  {
    id: 'pos-systems-kra-etims-kenya-2026',
    title: 'Point of Sale (POS) System Prices in Kenya & KRA eTIMS Integration Guide (2026)',
    slug: 'pos-system-prices-kenya-kra-etims-guide',
    category: 'Fintech & Payments',
    publishedDate: '2026-10-07',
    readTime: '7 min read',
    featured: false,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'A complete breakdown of cloud POS software vs touchscreen hardware bundle pricing in Kenya, with architectural patterns for automated KRA eTIMS invoice transmission and M-Pesa Till reconciliation.',
    coverImage: '/images/articles/pos-systems-kra-etims-kenya-2026.webp',
    tags: ['POS Systems Kenya', 'KRA eTIMS', 'Retail Hardware', 'M-Pesa Till', 'Inventory Sync'],
    canonicalUrl: `${BASE_URL}/insights/pos-system-prices-kenya-kra-etims-guide`,
    blogUrl: `${BASE_URL}/blog/pos-system-prices-kenya-kra-etims-guide`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'b2b-c2b-mpesa-disbursement-architecture',
    title: 'Automating B2C Bulk Payouts & Supplier Settlements with Safaricom Daraja 3.0',
    slug: 'automating-b2c-bulk-payouts-safaricom-daraja',
    category: 'Fintech & Payments',
    publishedDate: '2026-10-05',
    readTime: '6 min read',
    featured: false,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'How SACCOs, agri-tech aggregators, and logistics fleets automate thousands of instant M-Pesa B2C disbursements with dual-custody maker-checker security and cryptographic X.509 certificates.',
    coverImage: '/images/articles/b2b-c2b-mpesa-disbursement-architecture.webp',
    tags: ['Daraja B2C', 'Bulk Payouts', 'Fintech Security', 'SACCO Software', 'Kenya'],
    canonicalUrl: `${BASE_URL}/insights/automating-b2c-bulk-payouts-safaricom-daraja`,
    blogUrl: `${BASE_URL}/blog/automating-b2c-bulk-payouts-safaricom-daraja`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'multi-currency-flutterwave-stripe-east-africa',
    title: 'Architecting Multi-Currency Checkouts (KES, USD, EUR) for East African Safari & Export Brands',
    slug: 'multi-currency-checkout-kes-usd-safari-export-kenya',
    category: 'Fintech & Payments',
    publishedDate: '2026-09-29',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Faith Chepngetich',
      role: 'Principal Frontend Engineer',
      avatar: '/images/team/author-faith.webp'
    },
    excerpt: 'How Kenyan tour operators, specialty coffee exporters, and hospitality groups eliminate 6.5% FX conversion losses by routing domestic buyers to M-Pesa and international guests to native USD/EUR gateways.',
    coverImage: '/images/articles/multi-currency-flutterwave-stripe-east-africa.webp',
    tags: ['Multi-Currency', 'Tourism Tech', 'Stripe', 'Pesapal', 'E-Commerce'],
    canonicalUrl: `${BASE_URL}/insights/multi-currency-checkout-kes-usd-safari-export-kenya`,
    blogUrl: `${BASE_URL}/blog/multi-currency-checkout-kes-usd-safari-export-kenya`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'ai-rag-agents-kenyan-enterprises',
    title: 'Deploying Private AI Knowledge Agents (RAG) on Internal Company Documents & Policies',
    slug: 'private-ai-rag-agents-kenyan-enterprises',
    category: 'AI & Automation',
    publishedDate: '2026-09-22',
    readTime: '7 min read',
    featured: false,
    author: {
      name: 'Amina Noor',
      role: 'Automation & Conversational AI Lead',
      avatar: '/images/team/author-amina.webp'
    },
    excerpt: 'How law firms, insurance underwriters, and SACCOs in Nairobi deploy Retrieval-Augmented Generation (RAG) over thousands of internal PDFs with zero data leakage and strict source citations.',
    coverImage: '/images/articles/ai-rag-agents-kenyan-enterprises.webp',
    tags: ['AI Agents', 'RAG', 'Vector Database', 'pgvector', 'Enterprise AI'],
    canonicalUrl: `${BASE_URL}/insights/private-ai-rag-agents-kenyan-enterprises`,
    blogUrl: `${BASE_URL}/blog/private-ai-rag-agents-kenyan-enterprises`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'automated-invoice-ocr-erp-workflows',
    title: 'Eliminating Manual Data Entry: AI Document Extraction & Automated LPO-to-Invoice Matching',
    slug: 'automated-invoice-ocr-lpo-matching-erp-kenya',
    category: 'AI & Automation',
    publishedDate: '2026-08-28',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Amina Noor',
      role: 'Automation & Conversational AI Lead',
      avatar: '/images/team/author-amina.webp'
    },
    excerpt: 'How Kenyan distributors and manufacturing finance teams cut accounts payable processing time by 84% using structured AI vision extraction to match supplier invoices against LPOs and GRNs.',
    coverImage: '/images/articles/automated-invoice-ocr-erp-workflows.webp',
    tags: ['OCR Automation', 'ERP Workflows', 'Supply Chain', 'Finance Automation', 'Kenya'],
    canonicalUrl: `${BASE_URL}/insights/automated-invoice-ocr-lpo-matching-erp-kenya`,
    blogUrl: `${BASE_URL}/blog/automated-invoice-ocr-lpo-matching-erp-kenya`,
    priority: '0.80',
    changefreq: 'monthly'
  },
  {
    id: 'progressive-web-apps-offline-first-africa',
    title: 'Offline-First Progressive Web Apps (PWAs) for Field Sales & Agricultural Supply Chains in Kenya',
    slug: 'offline-first-pwa-field-sales-agriculture-kenya',
    category: 'Modern Engineering',
    publishedDate: '2026-08-19',
    readTime: '6 min read',
    featured: false,
    author: {
      name: 'Faith Chepngetich',
      role: 'Principal Frontend Engineer',
      avatar: '/images/team/author-faith.webp'
    },
    excerpt: 'Engineering resilient mobile web applications that work seamlessly in low-connectivity rural counties using Service Workers, IndexedDB, and background delta synchronization.',
    coverImage: '/images/articles/progressive-web-apps-offline-first-africa.webp',
    tags: ['PWA', 'Offline-First', 'Mobile Apps', 'IndexedDB', 'Field Operations'],
    canonicalUrl: `${BASE_URL}/insights/offline-first-pwa-field-sales-agriculture-kenya`,
    blogUrl: `${BASE_URL}/blog/offline-first-pwa-field-sales-agriculture-kenya`,
    priority: '0.80',
    changefreq: 'monthly'
  },
  {
    id: 'microservices-vs-modular-monoliths-nairobi',
    title: 'Modular Monoliths vs. Microservices: Right-Sizing Cloud Architecture for Growing African Startups',
    slug: 'modular-monoliths-vs-microservices-african-startups',
    category: 'Modern Engineering',
    publishedDate: '2026-07-25',
    readTime: '7 min read',
    featured: false,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'Why premature Kubernetes microservices drain engineering budgets, and how a well-bounded TypeScript Modular Monolith handles 50,000+ daily transactions at 1/5th the cloud cost.',
    coverImage: '/images/articles/microservices-vs-modular-monoliths-nairobi.webp',
    tags: ['System Architecture', 'TypeScript', 'Node.js', 'Cloud Cost', 'Scalability'],
    canonicalUrl: `${BASE_URL}/insights/modular-monoliths-vs-microservices-african-startups`,
    blogUrl: `${BASE_URL}/blog/modular-monoliths-vs-microservices-african-startups`,
    priority: '0.80',
    changefreq: 'monthly'
  },
  {
    id: 'real-estate-property-management-portals-kenya',
    title: 'Engineering Automated Property Management & Tenant Billing Portals in Nairobi',
    slug: 'automated-property-management-tenant-billing-portals-kenya',
    category: 'Modern Engineering',
    publishedDate: '2026-07-12',
    readTime: '6 min read',
    featured: false,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'How residential and commercial property managers in Kilimani, Westlands, and Tatu City automate rent collection, water meter billing, and service charge reconciliation via unique unit Paybill codes.',
    coverImage: '/images/articles/real-estate-property-management-portals-kenya.webp',
    tags: ['PropTech Kenya', 'Real Estate ERP', 'M-Pesa Paybill', 'Tenant Portal', 'Automation'],
    canonicalUrl: `${BASE_URL}/insights/automated-property-management-tenant-billing-portals-kenya`,
    blogUrl: `${BASE_URL}/blog/automated-property-management-tenant-billing-portals-kenya`,
    priority: '0.80',
    changefreq: 'monthly'
  },
  {
    id: 'aeo-geo-ranking-ai-overviews-kenya',
    title: 'Answer Engine Optimization (AEO): Getting Kenyan Brands Cited in ChatGPT, Perplexity & Google AI Overviews',
    slug: 'answer-engine-optimization-aeo-geo-kenya-guide',
    category: 'Technical SEO',
    publishedDate: '2026-06-20',
    readTime: '6 min read',
    featured: false,
    author: {
      name: 'Dennis Ochieng',
      role: 'Technical SEO & GEO Strategist',
      avatar: '/images/team/author-dennis.webp'
    },
    excerpt: 'Decision-makers increasingly ask AI assistants "Who is the best software agency or commercial provider in Nairobi?" Learn the exact llms.txt, entity schema, and citation architecture to win AI answers.',
    coverImage: '/images/articles/aeo-geo-ranking-ai-overviews-kenya.webp',
    tags: ['AEO', 'GEO', 'llms.txt', 'AI Search', 'Technical SEO Kenya'],
    canonicalUrl: `${BASE_URL}/insights/answer-engine-optimization-aeo-geo-kenya-guide`,
    blogUrl: `${BASE_URL}/blog/answer-engine-optimization-aeo-geo-kenya-guide`,
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    id: 'google-ads-conversion-tracking-server-side',
    title: 'Fixing Broken Attribution: Server-Side Google Ads Conversion Tracking for WhatsApp & M-Pesa Sales',
    slug: 'server-side-google-ads-conversion-tracking-whatsapp-mpesa',
    category: 'Technical SEO',
    publishedDate: '2026-06-08',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Dennis Ochieng',
      role: 'Technical SEO & GEO Strategist',
      avatar: '/images/team/author-dennis.webp'
    },
    excerpt: 'Why counting button clicks as "conversions" trains Google Ads to send you low-quality traffic, and how offline GCLID tracking links actual WhatsApp and M-Pesa revenue back to your ad campaigns.',
    coverImage: '/images/articles/google-ads-conversion-tracking-server-side.webp',
    tags: ['Google Ads', 'Conversion API', 'WhatsApp Attribution', 'ROI Tracking', 'Analytics'],
    canonicalUrl: `${BASE_URL}/insights/server-side-google-ads-conversion-tracking-whatsapp-mpesa`,
    blogUrl: `${BASE_URL}/blog/server-side-google-ads-conversion-tracking-whatsapp-mpesa`,
    priority: '0.80',
    changefreq: 'monthly'
  },
  {
    id: 'odpc-kenya-data-protection-cloud-compliance',
    title: 'Technical Compliance with the Kenya Data Protection Act (ODPC): Encryption, Consent & Audit Logs',
    slug: 'odpc-kenya-data-protection-act-technical-compliance',
    category: 'Cloud & Security',
    publishedDate: '2026-05-24',
    readTime: '7 min read',
    featured: false,
    author: {
      name: 'Brian Mwangi',
      role: 'Lead Cloud & Fintech Architect',
      avatar: '/images/team/author-brian.webp'
    },
    excerpt: 'A practical engineering checklist for FinTechs, healthcare providers, and e-commerce platforms to pass ODPC data controller audits and avoid KES 5M statutory penalties.',
    coverImage: '/images/articles/odpc-kenya-data-protection-cloud-compliance.webp',
    tags: ['ODPC Kenya', 'Data Protection Act', 'AES-256 Encryption', 'Compliance', 'Security'],
    canonicalUrl: `${BASE_URL}/insights/odpc-kenya-data-protection-act-technical-compliance`,
    blogUrl: `${BASE_URL}/blog/odpc-kenya-data-protection-act-technical-compliance`,
    priority: '0.80',
    changefreq: 'monthly'
  },
  {
    id: 'zero-downtime-database-migrations-postgresql',
    title: 'Zero-Downtime PostgreSQL Migrations & Automated Disaster Recovery for High-Volume Web Apps',
    slug: 'zero-downtime-postgresql-migrations-disaster-recovery',
    category: 'Cloud & Security',
    publishedDate: '2026-05-10',
    readTime: '6 min read',
    featured: false,
    author: {
      name: 'Faith Chepngetich',
      role: 'Principal Frontend Engineer',
      avatar: '/images/team/author-faith.webp'
    },
    excerpt: 'How to evolve production database schemas without locking active checkout tables, paired with Point-in-Time Recovery (PITR) and automated multi-region cloud backups.',
    coverImage: '/images/articles/zero-downtime-database-migrations-postgresql.webp',
    tags: ['PostgreSQL', 'DevOps', 'High Availability', 'Cloud Hosting', 'Disaster Recovery'],
    canonicalUrl: `${BASE_URL}/insights/zero-downtime-postgresql-migrations-disaster-recovery`,
    blogUrl: `${BASE_URL}/blog/zero-downtime-postgresql-migrations-disaster-recovery`,
    priority: '0.80',
    changefreq: 'monthly'
  }
];

export default ARTICLES_DATA;
