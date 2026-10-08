/**
 * Articles & Technical Insights Data Registry
 * Central repository of technical blog posts, architectural deep-dives,
 * and thought leadership articles published by Domain Tech Hub.
 */

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

const BASE_URL = 'https://www.domaintechhubs.com';

export const ARTICLES_DATA: ArticleData[] = [
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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'How Kenyan e-commerce platforms lose up to 14% of mobile revenue due to unhandled Daraja timeouts, and the exact idempotency and queuing architecture we use to guarantee 99.9% reconciliation.',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
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
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'A benchmark analysis comparing PHP/WooCommerce page speed against Next.js 15 on Kenyan mobile networks, showing how sub-second LCP directly increases conversion rates by 3.2x.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
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
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'The definitive blueprint for winning Google Local 3-Pack rankings and generative AI citations in Kenya through structured JSON-LD, localized schemas, and sub-1s Core Web Vitals.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'Step-by-step engineering guide to creating multi-tenant WhatsApp customer support and sales automation bots connected directly to your custom inventory and CRM backend.',
    coverImage: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1000&q=80',
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
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'How Kenyan logistics, healthcare, and retail businesses waste hundreds of hours on broken spreadsheet formulas and why custom web-based CRMs deliver full payback within 6 months.',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
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
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'Essential security measures for merchants processing M-Pesa, Pesapal, Visa, and Mastercard transactions in East Africa, covering tokenization, rate limiting, and 3D Secure 2.0.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    excerpt: 'Explore why website design in Kenya is no longer simply a digital brochure in 2026, but the core revenue engine connecting Google search, social media, and native WhatsApp sales for sustainable enterprise growth.',
    coverImage: 'https://images.unsplash.com/photo-1581291518655-9523c932694b?auto=format&fit=crop&w=1000&q=80',
    tags: ['Web Design Kenya', 'Web Development Nairobi', 'E-Commerce Kenya', 'Business Growth', 'M-Pesa STK Push'],
    canonicalUrl: `${BASE_URL}/insights/website-design-in-kenya-business-guide-2026`,
    blogUrl: `${BASE_URL}/blog/website-design-in-kenya-business-guide-2026`,
    priority: '0.90',
    changefreq: 'monthly'
  }
];

export default ARTICLES_DATA;
