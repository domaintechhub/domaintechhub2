export interface FaqItem {
  id: string;
  category: 'process' | 'payments' | 'seo_hosting' | 'ownership_support' | 'custom_dev';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'process', label: 'Process & Timelines' },
  { id: 'payments', label: 'M-Pesa & Payments' },
  { id: 'seo_hosting', label: 'SEO, Speed & Hosting' },
  { id: 'ownership_support', label: 'Ownership & Support' },
  { id: 'custom_dev', label: 'CRM & Custom Systems' },
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'engagement-payments',
    category: 'process',
    categoryLabel: 'Process & Timelines',
    question: 'How does your project engagement and payment schedule work?',
    answer: 'We operate on transparent, milestone-driven sprints. Typically, engagements require a 40% initial commitment to initiate architecture, wireframing, and environment setup. The remaining 60% is tied to user acceptance testing (UAT) and successful production deployment. For enterprise solutions, we support structured 3-stage milestone schedules.',
    highlights: ['40% Initiation / 60% Final QA', 'Zero hidden fees or surprise billings', 'Milestone-based deliverable sign-offs']
  },
  {
    id: 'timeline-delivery',
    category: 'process',
    categoryLabel: 'Process & Timelines',
    question: 'How long does a typical website, e-commerce store, or custom app take to launch?',
    answer: 'Timelines depend on functional scope. A standard corporate website or high-impact landing page is typically delivered in 2 to 3 weeks. E-commerce platforms with M-Pesa and payment integrations take 3 to 5 weeks. Custom CRM systems, mobile apps, or multi-role SaaS portals range from 5 to 8 weeks. We also offer Expedited Rush Sprints if you have a hard marketing launch deadline.',
    highlights: ['Corporate sites: 2 - 3 weeks', 'E-commerce & M-Pesa: 3 - 5 weeks', 'Custom CRM / Web Apps: 5 - 8 weeks']
  },
  {
    id: 'mpesa-integration',
    category: 'payments',
    categoryLabel: 'M-Pesa & Payments',
    question: 'How does the Safaricom M-Pesa STK Push payment integration work on our store?',
    answer: 'We connect directly to Safaricom\'s official Daraja API using secure server-side webhooks. When a shopper enters their phone number at checkout, their mobile device automatically displays the native Safaricom SIM prompt requesting their M-Pesa PIN. Once authenticated, Safaricom sends an encrypted callback to our server, instantly updating the order status, issuing an automated invoice, and dispatching an SMS/WhatsApp receipt.',
    highlights: ['Native PIN prompt sent directly to buyer phone', 'Instant automated webhook confirmation', 'Full support for Paybill, Till Number (Buy Goods), and Pochi']
  },
  {
    id: 'international-payments',
    category: 'payments',
    categoryLabel: 'M-Pesa & Payments',
    question: 'Can our platform accept both Kenyan M-Pesa and international credit/debit cards?',
    answer: 'Absolutely. We specialize in hybrid checkout gateways where East African customers pay effortlessly via M-Pesa, while diaspora and international buyers checkout with Visa, Mastercard, American Express, Apple Pay, or Google Pay via Stripe or Flutterwave. The system automatically detects user geo-location or currency preference (KES, USD, EUR, GBP).',
    highlights: ['Multi-currency support (KES, USD, EUR, GBP)', 'Stripe, Flutterwave & PayPal compliance', 'PCI-DSS level security standards']
  },
  {
    id: 'seo-rank-speed',
    category: 'seo_hosting',
    categoryLabel: 'SEO, Speed & Hosting',
    question: 'What guarantees do you offer for Google rankings and website loading speeds?',
    answer: 'Every website we engineer is built with Next.js or optimized clean HTML with server-side rendering, semantic schema markup (JSON-LD), and WebP/AVIF asset optimization. We guarantee passing scores on Google Core Web Vitals (Largest Contentful Paint < 1.2s). For SEO marketing retainers, we conduct rigorous keyword mapping, competitor backlink acquisition, and Google Business Profile optimization with transparent monthly ranking reports.',
    highlights: ['Sub-second Core Web Vitals benchmark', 'Schema.org JSON-LD structured data', 'Transparent monthly ranking reports on Ahrefs & GA4']
  },
  {
    id: 'domain-hosting-cloud',
    category: 'seo_hosting',
    categoryLabel: 'SEO, Speed & Hosting',
    question: 'Do you provide domain registration (.co.ke / .com) and cloud hosting setup?',
    answer: 'Yes, Domain Tech Hub provides turnkey infrastructure setup. We handle official Kenya (.co.ke, .ke) and international (.com, .org, .tech) domain reservations, configure automated DNS records, deploy Let\'s Encrypt or Cloudflare TLS/SSL certificates, and configure high-speed NVMe cloud servers or AWS/GCP container environments with automated daily backups.',
    highlights: ['Official .co.ke and global .com registration', 'Free automated SSL certificates', 'High-speed NVMe cloud hosting with 99.9% uptime SLA']
  },
  {
    id: 'source-code-ownership',
    category: 'ownership_support',
    categoryLabel: 'Ownership & Support',
    question: 'Do we own 100% of the source code, design files, and database after launch?',
    answer: 'Yes, completely. Unlike proprietary subscription website builders that lock your business in, Domain Tech Hub transfers 100% of all intellectual property, source code Git repositories, Figma design files, and administrative credentials to your company upon final milestone completion. You are never trapped.',
    highlights: ['100% Full IP transfer upon project sign-off', 'Direct access to GitHub/GitLab repositories', 'Figma design tokens and assets included']
  },
  {
    id: 'post-launch-warranty',
    category: 'ownership_support',
    categoryLabel: 'Ownership & Support',
    question: 'What happens after launch? Do you provide ongoing maintenance and technical support?',
    answer: 'Every build includes a complimentary 30-day post-launch warranty covering any unforeseen software defects or configuration fine-tuning. Thereafter, clients can choose from our Managed Maintenance & Security Care plans starting from KSh 20,000 / $150/mo, which include 24/7 uptime monitoring, daily cloud backups, weekly security patching, and included developer hours for content updates.',
    highlights: ['Complimentary 30-day post-launch warranty', 'Optional 24/7 emergency response SLA (< 20 mins)', 'Daily encrypted cloud backups & security updates']
  },
  {
    id: 'whatsapp-automation',
    category: 'custom_dev',
    categoryLabel: 'CRM & Custom Systems',
    question: 'How does your WhatsApp Marketing and automated bot system work?',
    answer: 'We leverage the official Meta WhatsApp Business Cloud API. We design interactive conversational funnels that qualify inbound leads, answer product queries, present interactive service catalogs, and book appointments directly inside WhatsApp. High-value leads can be seamlessly routed to human sales agents via a shared team inbox or synced into your CRM.',
    highlights: ['Official Meta Cloud API (no risk of phone number bans)', '24/7 automated lead intake & FAQ resolution', 'Shared multi-agent team inbox & CRM sync']
  },
  {
    id: 'custom-crm-spreadsheet',
    category: 'custom_dev',
    categoryLabel: 'CRM & Custom Systems',
    question: 'Can you replace our existing manual Excel spreadsheets with a custom web CRM?',
    answer: 'Yes, this is one of our most requested enterprise services. We audit your current Excel/Sheets workflows, map out your customer lifecycle stages, and engineer a role-based cloud CRM featuring drag-and-drop lead pipelines, automated PDF quotation/invoice generation, client communication timelines, and executive financial dashboards.',
    highlights: ['Data migration from existing Excel/CSV sheets', 'Role-based access control (Admin, Sales, Ops)', 'Automated invoice generation & WhatsApp/Email alerts']
  }
];
