export interface CustomerQuestionItem {
  question: string;
  answer: string;
  searchSource: 'Google Search Console' | 'Bing Webmaster Tools' | 'Client Discovery Call';
}

export interface ServiceKeywordMapEntry {
  serviceId: string;
  canonicalPath: string;
  serviceName: string;
  pillarCluster:
    | 'Website & Mobile Development (Nairobi / Kenya)'
    | 'E-Commerce, M-Pesa & KRA eTIMS POS'
    | 'Custom CRM, ERP & AI Software'
    | 'Technical SEO, PPC & Growth Marketing';
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
  h1Subheadline: string;
  searchIntent: 'Transactional' | 'Commercial Investigation' | 'Local Service Intent';
  demandMetric: string;
  competitionTier: 'Low-Medium' | 'Medium' | 'High Commercial Value';
  secondaryKeywords: string[];
  targetLocations: string[];
  localMarketArchitecture: string;
  distinctScopeBoundary: {
    thisPageCovers: string;
    relatedPagePath: string;
    relatedPageLabel: string;
  };
  customerQuestions: CustomerQuestionItem[];
}

export const SERVICE_KEYWORD_MAP: Record<string, ServiceKeywordMapEntry> = {
  'web-development': {
    serviceId: 'web-development',
    canonicalPath: '/services/web-development',
    serviceName: 'Custom Website Development',
    pillarCluster: 'Website & Mobile Development (Nairobi / Kenya)',
    primaryKeyword: 'website development in Nairobi Kenya',
    seoTitle: 'Website Development in Nairobi, Kenya | Custom Web Design | Domain Tech Hub',
    seoDescription:
      'Custom website development in Nairobi, Kenya. We engineer sub-second React & Next.js corporate websites, client portals, and lead systems from KSh 85,000.',
    h1Subheadline:
      'Bespoke Corporate Website Development in Nairobi & Across Kenya — Engineered for Sub-Second Speed & Search Dominance',
    searchIntent: 'Transactional',
    demandMetric: '4,400+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'web design company in Nairobi Westlands',
      'custom business website development Kenya',
      'corporate website designers Nairobi',
      'responsive web application developers Kenya',
      'professional company website price Kenya',
      'Next.js TypeScript web agency Nairobi',
    ],
    targetLocations: [
      'Nairobi (Westlands, Upper Hill, Kilimani, CBD)',
      'Mombasa',
      'Kisumu',
      'Nakuru',
      'Eldoret',
      'Nationwide Kenya & East Africa',
    ],
    localMarketArchitecture:
      'Engineered specifically for Kenyan and East African network conditions: deployed on Cloudflare Nairobi & Mombasa edge PoPs for sub-50ms TTFB on Safaricom and Airtel 4G/5G mobile connections, paired with KeNIC .co.ke DNSSEC configuration, WhatsApp click-to-lead routing, and 100% client GitHub IP ownership.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Custom corporate websites, multi-page company portals, service showcases, and bespoke full-stack web applications.',
      relatedPagePath: '/services/ecommerce-development',
      relatedPageLabel: 'Need an online store with M-Pesa STK Push checkout? View E-Commerce Development →',
    },
    customerQuestions: [
      {
        question: 'How much does custom website development cost in Nairobi, Kenya?',
        answer:
          'At Domain Tech Hub, custom business websites start at KSh 85,000 (USD $650) for a 6-page responsive corporate build, KSh 145,000 for growth web apps with a headless CMS and interactive tools, and KSh 260,000+ for multi-role enterprise portals.',
        searchSource: 'Google Search Console',
      },
      {
        question: 'Why choose custom React/Next.js web development over generic website templates in Kenya?',
        answer:
          'Generic templates suffer from 5–8 second mobile load times on Kenyan mobile networks and frequent plugin vulnerabilities. Our custom React and Next.js architecture achieves sub-1.2s Largest Contentful Paint (LCP), passes Google Core Web Vitals, and converts 3x–4x more organic visitors into leads.',
        searchSource: 'Client Discovery Call',
      },
      {
        question: 'Do you serve clients outside Nairobi such as Mombasa, Kisumu, Nakuru, and Eldoret?',
        answer:
          'Yes. While our engineering studio is headquartered at Delta Corner Tower in Westlands, Nairobi, we deliver projects across Mombasa, Kisumu, Nakuru, Eldoret, and East Africa via live staging links, video sprint reviews, and on-site enterprise workshops.',
        searchSource: 'Bing Webmaster Tools',
      },
    ],
  },

  'ecommerce-development': {
    serviceId: 'ecommerce-development',
    canonicalPath: '/services/ecommerce-development',
    serviceName: 'E-Commerce Store Development & M-Pesa Integration',
    pillarCluster: 'E-Commerce, M-Pesa & KRA eTIMS POS',
    primaryKeyword: 'e-commerce website development & M-Pesa integration Kenya',
    seoTitle: 'E-Commerce Website Development & M-Pesa Integration Kenya | Domain Tech Hub',
    seoDescription:
      'Build high-converting online stores in Kenya with automated Safaricom Daraja 3.0 M-Pesa STK Push, Paybill/Till C2B webhooks, Visa/Mastercard, and inventory sync.',
    h1Subheadline:
      'High-Conversion Online Stores with Native Safaricom Daraja 3.0 M-Pesa STK Push, Card Gateways & Automated Inventory in Kenya',
    searchIntent: 'Transactional',
    demandMetric: '3,100+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'M-Pesa STK Push integration Kenya',
      'Safaricom Daraja 3.0 API developer Nairobi',
      'online shop website development Kenya',
      'WooCommerce Shopify M-Pesa Paybill integration',
      'headless e-commerce store Nairobi',
      'automated M-Pesa C2B payment reconciliation',
    ],
    targetLocations: [
      'Nairobi (CBD, Industrial Area, Westlands, Eastleigh, Kilimani)',
      'Mombasa',
      'Nakuru',
      'Kisumu',
      'Eldoret',
      'East Africa Cross-Border',
    ],
    localMarketArchitecture:
      'Built around Kenyan shopper habits where over 82% of online checkouts happen via mobile money: direct Safaricom Daraja 3.0 STK Push prompt on checkout, idempotent Redis webhook queues that eliminate lost Paybill/Till payments during network drops, Pesapal/Stripe multi-currency cards for diaspora buyers, and automated WhatsApp order dispatch.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Online retail storefronts, multi-vendor marketplaces, Safaricom Daraja 3.0 M-Pesa STK Push checkouts, and e-commerce inventory automation.',
      relatedPagePath: '/services/pos-systems',
      relatedPageLabel: 'Need in-store retail hardware, barcode scanners & KRA eTIMS receipts? View POS Systems →',
    },
    customerQuestions: [
      {
        question: 'How does Safaricom Daraja 3.0 M-Pesa STK Push checkout work on an e-commerce store?',
        answer:
          'When a customer enters their Safaricom phone number at checkout and clicks Pay, our backend triggers the Daraja 3.0 Express API. A PIN prompt immediately pops up on the customer’s phone, and our encrypted webhook verifies the M-Pesa receipt code in under 2 seconds, marking the order Paid automatically.',
        searchSource: 'Google Search Console',
      },
      {
        question: 'Can your e-commerce stores reconcile payments made manually to our M-Pesa Paybill or Buy Goods Till?',
        answer:
          'Yes. Alongside instant STK Push, we register Daraja C2B confirmation and validation URLs for your Paybill or Till number so even manual M-Pesa payments are matched and reconciled against pending orders with zero manual verification.',
        searchSource: 'Client Discovery Call',
      },
      {
        question: 'Can our online store sync stock with our physical shop in Nairobi or Mombasa and issue KRA eTIMS invoices?',
        answer:
          'Absolutely. We connect your online storefront to a unified inventory database and KRA eTIMS API so stock levels update across your physical branches and website in real time.',
        searchSource: 'Bing Webmaster Tools',
      },
    ],
  },

  'custom-crm-development': {
    serviceId: 'custom-crm-development',
    canonicalPath: '/services/custom-crm-development',
    serviceName: 'Custom CRM & Business Systems',
    pillarCluster: 'Custom CRM, ERP & AI Software',
    primaryKeyword: 'custom CRM & ERP software development Nairobi Kenya',
    seoTitle: 'Custom CRM & ERP Software Development in Nairobi, Kenya | Domain Tech Hub',
    seoDescription:
      'Bespoke CRM, ERP, and internal workflow software development in Nairobi, Kenya. Automate sales pipelines, multi-branch inventory, invoicing, and RBAC security.',
    h1Subheadline:
      'Proprietary CRM, ERP & Internal Operations Software Engineered for Kenyan Enterprises — Zero Per-User SaaS License Fees',
    searchIntent: 'Transactional',
    demandMetric: '1,900+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'custom software development company Nairobi',
      'bespoke ERP system developers Kenya',
      'sales pipeline & lead management CRM Kenya',
      'multi-branch inventory & procurement software Nairobi',
      'custom client portal & B2B software Kenya',
      'QuickBooks Xero KRA eTIMS API integration',
    ],
    targetLocations: [
      'Nairobi (Upper Hill, Westlands, Industrial Area, Mombasa Road)',
      'Mombasa',
      'Thika',
      'Nakuru',
      'Kisumu',
      'East Africa',
    ],
    localMarketArchitecture:
      'Eliminates expensive per-seat USD SaaS subscriptions by giving your enterprise 100% ownership of a multi-tenant PostgreSQL & Node.js cloud system. Includes role-based access control (RBAC) for field sales reps and branch managers, automated PDF quotations/invoices in KES & USD, M-Pesa B2C/C2B ledger reconciliation, and SMS/WhatsApp alerts.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Custom CRM pipelines, enterprise ERP software, multi-branch back-office portals, and B2B workflow automation.',
      relatedPagePath: '/services/ai-powered-solutions',
      relatedPageLabel: 'Looking for AI document parsers or RAG chatbots? View AI-Powered Business Solutions →',
    },
    customerQuestions: [
      {
        question: 'Why build a custom CRM or ERP in Kenya instead of paying for off-the-shelf SaaS?',
        answer:
          'Off-the-shelf SaaS tools charge $30–$100 per user every month and rarely support local workflows like M-Pesa Paybill reconciliation, KRA eTIMS tax compliance, or multi-branch Kenyan distribution. A custom CRM from Domain Tech Hub has zero per-user license fees and is 100% owned by your company.',
        searchSource: 'Client Discovery Call',
      },
      {
        question: 'Can you integrate our custom CRM with QuickBooks, Xero, or KRA eTIMS?',
        answer:
          'Yes. We build bi-directional REST and webhook integrations connecting your custom CRM or ERP directly with QuickBooks, Xero, Zoho, Safaricom Daraja APIs, and KRA eTIMS OSCU/VSCU endpoints.',
        searchSource: 'Google Search Console',
      },
      {
        question: 'How is company data secured in your custom business software?',
        answer:
          'We implement strict Role-Based Access Control (RBAC), JWT/OAuth2 session security, row-level PostgreSQL permissions, audit logs for every staff action, and automated daily encrypted off-site backups.',
        searchSource: 'Bing Webmaster Tools',
      },
    ],
  },

  'seo-services': {
    serviceId: 'seo-services',
    canonicalPath: '/services/seo-services',
    serviceName: 'Search Engine Optimization (SEO)',
    pillarCluster: 'Technical SEO, PPC & Growth Marketing',
    primaryKeyword: 'SEO services in Nairobi Kenya & technical SEO agency',
    seoTitle: 'SEO Services in Nairobi, Kenya | Technical SEO & Google Ranking | Domain Tech Hub',
    seoDescription:
      'Data-driven SEO services in Nairobi, Kenya. Rank #1 on Google.co.ke & Bing with technical SEO audits, Core Web Vitals optimization, Local 3-Pack Maps, and schema.',
    h1Subheadline:
      'Technical SEO, Local Google Maps 3-Pack Dominance & Search Intent Architecture for Kenyan Brands',
    searchIntent: 'Commercial Investigation',
    demandMetric: '2,900+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'SEO agency in Nairobi Kenya',
      'technical SEO audit & Core Web Vitals Kenya',
      'Google Maps Local SEO Nairobi Westlands',
      'rank website on first page of Google Kenya',
      'search engine optimization price in Kenya',
      'Answer Engine Optimization AEO & Schema JSON-LD',
    ],
    targetLocations: [
      'Nairobi (Westlands, Kilimani, Upper Hill, CBD, Karen)',
      'Mombasa',
      'Kisumu',
      'Nakuru',
      'Eldoret',
      'Global Export Markets',
    ],
    localMarketArchitecture:
      'Built on real Google Search Console and Bing Webmaster Tools telemetry rather than guesswork: we map commercial Kenyan buyer queries to distinct canonical URLs, inject valid Schema.org JSON-LD (`ProfessionalService`, `Service`, `FAQPage`), optimize Core Web Vitals for mobile-first indexing on Google.co.ke, and rank your Google Business Profile in the Nairobi Local 3-Pack.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Organic Google & Bing rankings, Technical SEO audits, Core Web Vitals speed tuning, Local SEO Maps, and keyword-mapped content strategy.',
      relatedPagePath: '/services/ppc-management',
      relatedPageLabel: 'Need immediate paid search traffic today? View Google Ads & PPC Management →',
    },
    customerQuestions: [
      {
        question: 'How long does it take to rank on Page 1 of Google in Kenya with your SEO services?',
        answer:
          'Technical SEO fixes, indexing remediation, and Google Business Profile optimizations typically show measurable impression and ranking lifts in Google Search Console within 3 to 6 weeks. Competitive commercial keywords in Nairobi and Kenya generally reach top Page 1 positions within 3 to 4 months of sustained authority building.',
        searchSource: 'Google Search Console',
      },
      {
        question: 'How do you prevent keyword cannibalization and doorway-page penalties?',
        answer:
          'We build a strict 1-to-1 Keyword & Intent Map where every commercial service and informational guide has a single authoritative canonical URL, unique H1/meta tags, and distinct structured data—never spinning up duplicate near-identical city pages.',
        searchSource: 'Bing Webmaster Tools',
      },
      {
        question: 'What is included in your monthly SEO retainer in Kenya?',
        answer:
          'Every engagement includes a full technical SEO & Core Web Vitals overhaul, Google Search Console & Bing Webmaster Tools management, commercial keyword mapping, on-page content optimization, Schema.org JSON-LD deployment, and transparent Looker Studio ranking reports.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'pos-systems': {
    serviceId: 'pos-systems',
    canonicalPath: '/services/pos-systems',
    serviceName: 'Point of Sale (POS) Systems & Hardware',
    pillarCluster: 'E-Commerce, M-Pesa & KRA eTIMS POS',
    primaryKeyword: 'Point of Sale POS system prices & KRA eTIMS hardware Kenya',
    seoTitle: 'Point of Sale (POS) Systems & Hardware Prices Kenya (KRA eTIMS) | Domain Tech Hub',
    seoDescription:
      'POS system prices in Kenya from KSh 500/mo cloud software to KSh 37,000–105,000 touchscreen hardware bundles, thermal printers, barcode scanners & KRA eTIMS.',
    h1Subheadline:
      'Turnkey Cloud & On-Premise POS Software, Touchscreen Terminals, Thermal Printers & Direct KRA eTIMS Fiscal Integration Across Kenya',
    searchIntent: 'Transactional',
    demandMetric: '5,200+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'POS system price in Kenya',
      'KRA eTIMS integrated POS software Nairobi',
      'supermarket & pharmacy POS hardware bundle Kenya',
      '80mm thermal receipt printer & barcode scanner price Kenya',
      'restaurant & bar touchscreen POS system Nairobi',
      'offline & cloud multi-branch POS Kenya',
    ],
    targetLocations: [
      'Nairobi (CBD, Luthuli, Industrial Area, Westlands, Eastleigh)',
      'Mombasa',
      'Nakuru',
      'Kisumu',
      'Eldoret',
      'Thika & Nationwide Delivery',
    ],
    localMarketArchitecture:
      'Engineered for Kenyan retail, supermarkets, pharmacies, hardware stores, and hospitality: works offline during internet outages and syncs automatically to the cloud, triggers instant Lipa Na M-Pesa Till/Paybill verification at the counter, and transmits validated KRA eTIMS invoices with verifiable QR codes printed directly on 80mm thermal receipts.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Retail & hospitality Point of Sale (POS) software, touchscreen terminals, thermal printers, barcode scanners, cash drawers, and KRA eTIMS counter billing.',
      relatedPagePath: '/services/ecommerce-development',
      relatedPageLabel: 'Want customers to order online with M-Pesa delivery checkout? View E-Commerce Development →',
    },
    customerQuestions: [
      {
        question: 'How much does a complete POS system with hardware cost in Kenya?',
        answer:
          'Cloud POS software starts from KSh 500 to KSh 5,000/month, and lifetime on-premise POS software is KSh 15,000–35,000 per computer. Complete All-in-One Touchscreen Hardware Bundles (touchscreen terminal, 80mm auto-cutter printer, barcode scanner, and steel cash drawer) range from KSh 37,000 to KSh 105,000.',
        searchSource: 'Google Search Console',
      },
      {
        question: 'Does your POS system generate KRA eTIMS compliant receipts with QR codes?',
        answer:
          'Yes. Our POS software integrates directly with KRA eTIMS (OSCU/VSCU) to validate every sale in real time and print the official KRA invoice number and verifiable QR code on every customer receipt.',
        searchSource: 'Google Search Console',
      },
      {
        question: 'Can the POS continue selling if internet goes down at our shop?',
        answer:
          'Yes. Our hybrid offline-first architecture lets cashiers scan barcodes, accept payments, and print receipts without internet interruption, then automatically syncs inventory and cloud reports once connectivity resumes.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'mobile-app-development': {
    serviceId: 'mobile-app-development',
    canonicalPath: '/services/mobile-app-development',
    serviceName: 'Mobile App Development',
    pillarCluster: 'Website & Mobile Development (Nairobi / Kenya)',
    primaryKeyword: 'mobile app development company in Nairobi Kenya',
    seoTitle: 'Mobile App Development in Nairobi, Kenya (iOS & Android) | Domain Tech Hub',
    seoDescription:
      'Custom Android and iOS mobile app development in Nairobi, Kenya. React Native & Flutter apps with offline sync, M-Pesa payments, GPS tracking & Play Store launch.',
    h1Subheadline:
      'Cross-Platform Android & iOS Mobile Application Engineering in Nairobi, Kenya — Built with React Native & Flutter',
    searchIntent: 'Transactional',
    demandMetric: '1,800+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'Android app developers in Nairobi Kenya',
      'React Native & Flutter app development Kenya',
      'fintech & SACCO mobile app developers Nairobi',
      'delivery & logistics GPS mobile app Kenya',
      'cost of building a mobile app in Kenya',
    ],
    targetLocations: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'East Africa'],
    localMarketArchitecture:
      'Optimized for Kenya’s Android-first mobile ecosystem (88%+ Android share) while maintaining simultaneous iOS App Store parity from a single TypeScript/Flutter codebase. Includes local SQLite offline caching for low-signal zones, biometric login, Firebase push notifications, and native M-Pesa STK Push in-app billing.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Native and cross-platform Android & iOS mobile apps published to Google Play Store and Apple App Store.',
      relatedPagePath: '/services/web-development',
      relatedPageLabel: 'Need a browser-based responsive web application or PWA? View Custom Website Development →',
    },
    customerQuestions: [
      {
        question: 'How much does it cost to develop a mobile app in Kenya?',
        answer:
          'Cross-platform Android and iOS mobile applications at Domain Tech Hub start from KSh 185,000 (USD $1,400) for an MVP with core authentication, API sync, and M-Pesa checkout, with full Play Store and App Store publishing included.',
        searchSource: 'Google Search Console',
      },
      {
        question: 'Do you handle Google Play Store and Apple App Store submission and compliance?',
        answer:
          'Yes. We manage the entire release pipeline including store listing assets, privacy policy compliance, production signing keys, and review approval on both Google Play and Apple App Store.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'front-end-development': {
    serviceId: 'front-end-development',
    canonicalPath: '/services/front-end-development',
    serviceName: 'Modern Front-End Development',
    pillarCluster: 'Website & Mobile Development (Nairobi / Kenya)',
    primaryKeyword: 'React & Next.js front-end development studio Nairobi Kenya',
    seoTitle: 'React & Next.js Front-End Development in Nairobi, Kenya | Domain Tech Hub',
    seoDescription:
      'Pixel-perfect Figma-to-React and Next.js front-end engineering in Nairobi, Kenya. WCAG AA accessible UI component libraries, design systems, and 100 Lighthouse speed.',
    h1Subheadline:
      'Figma-to-React, Next.js & TypeScript UI Engineering with Zero Layout Shift and Sub-Second Interactivity',
    searchIntent: 'Commercial Investigation',
    demandMetric: '750+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'Figma to React developer Kenya',
      'UI UX front-end engineering Nairobi',
      'Tailwind CSS & TypeScript component library',
      'SaaS dashboard UI development Kenya',
    ],
    targetLocations: ['Nairobi', 'Remote Global Teams', 'East Africa'],
    localMarketArchitecture:
      'Built for SaaS teams, fintech startups, and enterprises that already have backend APIs or Figma prototypes and require senior React/TypeScript frontend engineers in Nairobi to deliver clean, modular UI components.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Dedicated frontend UI engineering, Figma-to-code conversion, and reusable React/TypeScript design systems.',
      relatedPagePath: '/services/graphic-design-branding',
      relatedPageLabel: 'Need brand identity, logos, and corporate stationery first? View Graphic Design & Branding →',
    },
    customerQuestions: [
      {
        question: 'Can you convert our existing Figma design directly into a production React or Next.js frontend?',
        answer:
          'Yes. We translate Figma design tokens, auto-layout grids, and interactive variants into clean, typed React + Tailwind CSS components with zero visual drift and full mobile responsiveness.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'cms-development': {
    serviceId: 'cms-development',
    canonicalPath: '/services/cms-development',
    serviceName: 'CMS & WordPress Development',
    pillarCluster: 'Website & Mobile Development (Nairobi / Kenya)',
    primaryKeyword: 'WordPress & Headless CMS development in Nairobi Kenya',
    seoTitle: 'WordPress & Headless CMS Website Development in Kenya | Domain Tech Hub',
    seoDescription:
      'Custom WordPress, Strapi, and Sanity Headless CMS development in Nairobi, Kenya. Fast, secure editorial websites for NGOs, media portals, and corporate teams.',
    h1Subheadline:
      'Bloat-Free Custom WordPress & Headless CMS Platforms for Kenyan NGOs, Publishers & Corporate Marketing Teams',
    searchIntent: 'Transactional',
    demandMetric: '1,600+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'WordPress developer in Nairobi Kenya',
      'headless CMS Sanity Strapi development Kenya',
      'NGO & school website design Kenya',
      'custom WordPress theme development Nairobi',
    ],
    targetLocations: ['Nairobi (Westlands, Gigiri, Kilimani, CBD)', 'Mombasa', 'Kisumu', 'Nakuru'],
    localMarketArchitecture:
      'Ideal for Nairobi NGOs, educational institutions, and content-heavy organizations that require non-technical staff to publish updates, tenders, and reports daily without sacrificing security or page speed.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Editorial content management systems (Custom WordPress, Sanity, Strapi) with role-based publishing workflows.',
      relatedPagePath: '/services/web-development',
      relatedPageLabel: 'Need a bespoke full-stack React/Next.js web application? View Custom Website Development →',
    },
    customerQuestions: [
      {
        question: 'How do you make WordPress websites fast and secure against hacking in Kenya?',
        answer:
          'We never use bloated nulled plugins or heavy page builders. We engineer lightweight custom Gutenberg blocks or decoupled headless CMS frontends backed by Cloudflare WAF firewall rules, Redis object caching, and daily off-site backups.',
        searchSource: 'Google Search Console',
      },
    ],
  },

  'whatsapp-marketing': {
    serviceId: 'whatsapp-marketing',
    canonicalPath: '/services/whatsapp-marketing',
    serviceName: 'WhatsApp Marketing & Automation',
    pillarCluster: 'Technical SEO, PPC & Growth Marketing',
    primaryKeyword: 'WhatsApp Business API & chatbot automation in Kenya',
    seoTitle: 'WhatsApp Business API & Chatbot Automation in Kenya | Domain Tech Hub',
    seoDescription:
      'Official Meta WhatsApp Business Cloud API integration, 24/7 lead capture chatbots, multi-agent support inboxes, and automated order alerts in Nairobi, Kenya.',
    h1Subheadline:
      'Official WhatsApp Business Cloud API Chatbots, Broadcast CRM & Automated Customer Support for Kenyan Businesses',
    searchIntent: 'Transactional',
    demandMetric: '1,450+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'WhatsApp chatbot developer Nairobi Kenya',
      'WhatsApp Business API green tick verification Kenya',
      'automated WhatsApp order & M-Pesa receipt notifications',
      'Click-to-WhatsApp lead generation Kenya',
    ],
    targetLocations: ['Nairobi', 'Mombasa', 'Nakuru', 'Kisumu', 'Eldoret', 'Kenya Nationwide'],
    localMarketArchitecture:
      'WhatsApp is Kenya’s #1 business communication channel with a 98% open rate. We integrate the official Meta WhatsApp Cloud API with your CRM, website, and M-Pesa checkout to automate catalog browsing, appointment booking, and instant payment receipts.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Official WhatsApp Business Cloud API setup, conversational bots, multi-agent team inboxes, and transactional WhatsApp triggers.',
      relatedPagePath: '/services/ai-powered-solutions',
      relatedPageLabel: 'Need advanced AI RAG assistants trained on your PDFs & docs? View AI-Powered Solutions →',
    },
    customerQuestions: [
      {
        question: 'Can multiple customer support agents reply to customers from one WhatsApp Business number?',
        answer:
          'Yes. Our Official WhatsApp Business API integration includes a shared multi-agent web inbox so your sales and support team in Nairobi or remote branches can handle chats simultaneously from one verified number.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'ppc-management': {
    serviceId: 'ppc-management',
    canonicalPath: '/services/ppc-management',
    serviceName: 'PPC Management (Google Ads)',
    pillarCluster: 'Technical SEO, PPC & Growth Marketing',
    primaryKeyword: 'Google Ads & PPC management agency in Nairobi Kenya',
    seoTitle: 'Google Ads & PPC Management Agency in Nairobi, Kenya | Domain Tech Hub',
    seoDescription:
      'High-ROI Google Search, Display, and Performance Max PPC management in Nairobi, Kenya. Capture ready-to-buy leads with conversion tracking and low CPA.',
    h1Subheadline:
      'Precision Google Search & Performance Max Ad Campaigns Targeting High-Intent Buyers in Nairobi & Kenya',
    searchIntent: 'Transactional',
    demandMetric: '1,100+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'Google Ads specialist Nairobi Kenya',
      'pay per click advertising company Kenya',
      'Google Search Ads lead generation Nairobi',
      'reduce Google Ads cost per lead Kenya',
    ],
    targetLocations: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'East Africa'],
    localMarketArchitecture:
      'Targets commercial geo-zones across Nairobi (e.g., Westlands, Upper Hill, Karen, Industrial Area) and major Kenyan towns with strict negative-keyword filtering, GA4 + Google Tag Manager conversion attribution, and direct WhatsApp/call lead tracking.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Paid Google Search, Display, and Performance Max campaigns for immediate top-of-page lead capture.',
      relatedPagePath: '/services/seo-services',
      relatedPageLabel: 'Want compounding long-term organic Google rankings? View Technical SEO Services →',
    },
    customerQuestions: [
      {
        question: 'How quickly do Google Ads PPC campaigns start generating leads in Kenya?',
        answer:
          'Unlike organic SEO which builds over months, our Google Search Ads campaigns go live within 48–72 hours of setup and immediately place your business at the top of Google when Kenyan buyers search for your exact service.',
        searchSource: 'Google Search Console',
      },
    ],
  },

  'digital-marketing': {
    serviceId: 'digital-marketing',
    canonicalPath: '/services/digital-marketing',
    serviceName: 'Result-Driven Digital Marketing',
    pillarCluster: 'Technical SEO, PPC & Growth Marketing',
    primaryKeyword: 'digital marketing & lead generation agency in Nairobi Kenya',
    seoTitle: 'Digital Marketing & Lead Generation Agency in Nairobi, Kenya | Domain Tech Hub',
    seoDescription:
      'Full-funnel digital marketing agency in Nairobi, Kenya. Multi-channel Meta, LinkedIn, and Google lead generation funnels, CRO landing pages, and CRM attribution.',
    h1Subheadline:
      'Full-Funnel Digital Acquisition, Conversion Landing Pages & Multi-Channel Lead Generation in Kenya',
    searchIntent: 'Commercial Investigation',
    demandMetric: '2,600+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'digital marketing company in Nairobi Kenya',
      'B2B LinkedIn & Meta lead generation Kenya',
      'conversion rate optimization agency Nairobi',
      'performance marketing agency Kenya',
    ],
    targetLocations: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'East Africa'],
    localMarketArchitecture:
      'Combines high-speed conversion landing pages, Meta Pixel & Conversions API server-side tracking, LinkedIn B2B executive targeting, and automated email/WhatsApp CRM nurturing tailored to Kenyan decision-makers.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Full-funnel multi-channel digital acquisition, conversion landing pages, and integrated lead nurturing.',
      relatedPagePath: '/services/social-media-marketing',
      relatedPageLabel: 'Looking specifically for monthly social content calendars & reels? View Social Media Management →',
    },
    customerQuestions: [
      {
        question: 'How do you measure the ROI of digital marketing campaigns for Kenyan businesses?',
        answer:
          'We track every shilling spent from ad impression to qualified WhatsApp chat, phone call, or form submission using Google Tag Manager, Meta Conversions API, and a live Looker Studio ROI dashboard.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'ai-powered-solutions': {
    serviceId: 'ai-powered-solutions',
    canonicalPath: '/services/ai-powered-solutions',
    serviceName: 'AI-Powered Business Solutions',
    pillarCluster: 'Custom CRM, ERP & AI Software',
    primaryKeyword: 'AI software development & business automation in Nairobi Kenya',
    seoTitle: 'AI Software Development & Business Automation in Nairobi, Kenya | Domain Tech Hub',
    seoDescription:
      'Custom AI software development in Nairobi, Kenya. We build RAG company knowledge chatbots, automated invoice/PDF data extraction, and AI workflow automation.',
    h1Subheadline:
      'Practical Enterprise AI Assistants, Document Parsers & Automated Workflows Grounded in Your Company Data',
    searchIntent: 'Commercial Investigation',
    demandMetric: '1,300+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'AI chatbot development company Kenya',
      'custom RAG knowledge base assistant Nairobi',
      'automated invoice & KRA document OCR parser Kenya',
      'AI workflow automation agency Nairobi',
    ],
    targetLocations: ['Nairobi (Upper Hill, Westlands, CBD)', 'Mombasa', 'East Africa & Global'],
    localMarketArchitecture:
      'Designed for Kenyan financial, legal, logistics, and service enterprises: private vector databases grounded strictly on your internal policies and pricing, automated OCR extraction for local invoices/delivery notes, and seamless web or WhatsApp deployment.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Custom LLM/RAG knowledge bots, automated document/invoice OCR extraction, and AI-driven business triage.',
      relatedPagePath: '/services/custom-crm-development',
      relatedPageLabel: 'Need a core relational CRM or ERP database platform? View Custom CRM & Business Systems →',
    },
    customerQuestions: [
      {
        question: 'Is our private company data safe when using your custom AI business solutions?',
        answer:
          'Yes. We use enterprise API endpoints with zero training retention on your proprietary data and isolate your document embeddings inside a private, access-controlled vector database.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'website-maintenance': {
    serviceId: 'website-maintenance',
    canonicalPath: '/services/website-maintenance',
    serviceName: 'Website Maintenance & Security',
    pillarCluster: 'Website & Mobile Development (Nairobi / Kenya)',
    primaryKeyword: 'website maintenance & security support services Kenya',
    seoTitle: 'Website Maintenance, Security & SLA Support in Kenya | Domain Tech Hub',
    seoDescription:
      '24/7 website maintenance, security patching, daily cloud backups, SSL monitoring, and priority developer SLA retainers for businesses in Nairobi and Kenya.',
    h1Subheadline:
      'Managed 24/7 Uptime Monitoring, Security Hardening, Daily Encrypted Backups & Priority Developer Support in Kenya',
    searchIntent: 'Transactional',
    demandMetric: '950+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'website maintenance company Nairobi Kenya',
      'hacked website recovery & malware removal Kenya',
      'monthly website support retainer Kenya',
      'SSL certificate & cloud backup management Nairobi',
    ],
    targetLocations: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Nationwide Kenya'],
    localMarketArchitecture:
      'Protects mission-critical Kenyan corporate websites and M-Pesa e-commerce portals from downtime, SSL expiry, and brute-force attacks with 1-hour emergency SLA response and automated daily off-site S3 backups.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Ongoing monthly website maintenance, security patching, uptime monitoring, and dedicated developer support hours.',
      relatedPagePath: '/services/web-development',
      relatedPageLabel: 'Need a brand-new website or complete platform rebuild? View Custom Website Development →',
    },
    customerQuestions: [
      {
        question: 'Can you maintain and secure a website that was originally built by another developer in Kenya?',
        answer:
          'Yes. We begin with a baseline codebase and security audit, migrate your site to hardened cloud staging, set up automated daily backups, and take over ongoing security updates and content changes.',
        searchSource: 'Google Search Console',
      },
    ],
  },

  'web-consultancy': {
    serviceId: 'web-consultancy',
    canonicalPath: '/services/web-consultancy',
    serviceName: 'Web & Digital Consultancy',
    pillarCluster: 'Custom CRM, ERP & AI Software',
    primaryKeyword: 'software architecture & digital transformation consultancy Kenya',
    seoTitle: 'Software Architecture & Digital Transformation Consultancy Kenya | Domain Tech Hub',
    seoDescription:
      'Senior software architecture audits, cloud cost optimization, vendor evaluation, and digital transformation roadmaps for organizations in Nairobi, Kenya.',
    h1Subheadline:
      'Independent Technical Audits, Cloud Architecture Sizing & Digital Transformation Roadmaps by Senior Nairobi Architects',
    searchIntent: 'Commercial Investigation',
    demandMetric: '680+ monthly searches (KE)',
    competitionTier: 'Low-Medium',
    secondaryKeywords: [
      'IT & digital transformation consultant Nairobi',
      'software codebase & security audit Kenya',
      'cloud infrastructure cost optimization Kenya',
      'CTO as a service technical advisory Nairobi',
    ],
    targetLocations: ['Nairobi (Upper Hill, Westlands, Gigiri)', 'Mombasa', 'East Africa'],
    localMarketArchitecture:
      'Helps Kenyan boards, NGOs, SACCOs, and enterprise executives audit existing software vendors, eliminate cloud overspending, and draft clear technical specifications before committing capital.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Executive technical advisory, codebase/security audits, cloud sizing, and multi-year digital transformation roadmaps.',
      relatedPagePath: '/services/custom-crm-development',
      relatedPageLabel: 'Ready to build custom enterprise software now? View Custom CRM & Business Systems →',
    },
    customerQuestions: [
      {
        question: 'What deliverables do we receive after a technical consultancy engagement?',
        answer:
          'You receive a comprehensive Executive Technical Assessment Report, system architecture diagrams, security vulnerability findings, cloud cost-saving recommendations, and a phased implementation roadmap.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },

  'graphic-design-branding': {
    serviceId: 'graphic-design-branding',
    canonicalPath: '/services/graphic-design-branding',
    serviceName: 'Graphic Design & Corporate Branding',
    pillarCluster: 'Website & Mobile Development (Nairobi / Kenya)',
    primaryKeyword: 'corporate branding & graphic design studio in Nairobi Kenya',
    seoTitle: 'Corporate Branding, Logo & Company Profile Design in Nairobi | Domain Tech Hub',
    seoDescription:
      'Corporate branding and graphic design studio in Nairobi, Kenya. Vector logos, 20+ page brand guideline books, company profiles, pitch decks & stationery.',
    h1Subheadline:
      'Authoritative Corporate Identity Systems, Company Profiles, Vector Logos & Brand Guidelines in Nairobi, Kenya',
    searchIntent: 'Transactional',
    demandMetric: '2,100+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'company profile design in Nairobi Kenya',
      'corporate logo & brand identity design Kenya',
      'brand guidelines & stationery design Nairobi',
      'pitch deck & brochure graphic designers Kenya',
    ],
    targetLocations: ['Nairobi (Westlands, CBD, Kilimani, Upper Hill)', 'Mombasa', 'Kisumu', 'Nakuru'],
    localMarketArchitecture:
      'Tailored for Kenyan companies bidding for enterprise and government tenders or launching regional brands: includes print-ready CMYK vector files, persuasive company profiles, and digital design tokens ready for web deployment.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Visual brand identity systems, vector logos, print/PDF company profiles, corporate stationery, and brand guidelines.',
      relatedPagePath: '/services/front-end-development',
      relatedPageLabel: 'Need interactive web UI engineering from Figma? View Modern Front-End Development →',
    },
    customerQuestions: [
      {
        question: 'What files are included in your corporate branding and company profile package in Kenya?',
        answer:
          'We deliver master vector files (AI, EPS, SVG, PDF, high-res PNG), a 20+ page Brand Guidelines book, print-ready corporate stationery (business cards, letterheads, email signatures), and an editable Company Profile.',
        searchSource: 'Google Search Console',
      },
    ],
  },

  'social-media-marketing': {
    serviceId: 'social-media-marketing',
    canonicalPath: '/services/social-media-marketing',
    serviceName: 'Social Media Marketing & Management',
    pillarCluster: 'Technical SEO, PPC & Growth Marketing',
    primaryKeyword: 'social media management & content marketing agency Nairobi',
    seoTitle: 'Social Media Marketing & Management Agency in Nairobi, Kenya | Domain Tech Hub',
    seoDescription:
      'Strategic social media management in Nairobi, Kenya. Monthly content calendars, branded graphics, short-form reels, and community growth across Instagram, LinkedIn & TikTok.',
    h1Subheadline:
      'Consistent Brand Authority, Short-Form Video Reels & Community Management Across LinkedIn, Instagram & TikTok in Kenya',
    searchIntent: 'Commercial Investigation',
    demandMetric: '1,950+ monthly searches (KE)',
    competitionTier: 'Medium',
    secondaryKeywords: [
      'social media agency in Nairobi Kenya',
      'Instagram TikTok & LinkedIn management Kenya',
      'corporate social media content creation Nairobi',
      'social media management packages price Kenya',
    ],
    targetLocations: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kenya Nationwide'],
    localMarketArchitecture:
      'Crafts culturally resonant Kenyan and regional brand storytelling across LinkedIn (for B2B authority), Instagram, Facebook, and TikTok, complete with structured monthly editorial calendars and DM lead handoff.',
    distinctScopeBoundary: {
      thisPageCovers:
        'Monthly organic social media content creation, branded graphics/reels, editorial calendars, and community management.',
      relatedPagePath: '/services/digital-marketing',
      relatedPageLabel: 'Looking for paid conversion funnels & Meta/Google lead ads? View Digital Marketing →',
    },
    customerQuestions: [
      {
        question: 'How many branded posts and reels are included each month?',
        answer:
          'Our monthly retainers include 12 to 20 custom-designed graphics, carousels, and short-form video reels per month, approved in advance via a shared monthly editorial calendar.',
        searchSource: 'Client Discovery Call',
      },
    ],
  },
};

export const KEYWORD_MAP_LIST: ServiceKeywordMapEntry[] = Object.values(SERVICE_KEYWORD_MAP);

export const KEYWORD_PILLAR_CLUSTERS = [
  'All Pillars',
  'Website & Mobile Development (Nairobi / Kenya)',
  'E-Commerce, M-Pesa & KRA eTIMS POS',
  'Custom CRM, ERP & AI Software',
  'Technical SEO, PPC & Growth Marketing',
] as const;
