export interface ServicePackageTier {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  badge?: string;
  popular?: boolean;
  priceUSD: number;
  priceKES: number;
  timeline: string;
  description: string;
  features: string[];
}

export interface ServiceAddon {
  id: string;
  name: string;
  priceUSD: number;
  priceKES: number;
  description: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceDeepDive {
  serviceId: string;
  tagline: string;
  whyChooseUs: string[];
  packages: ServicePackageTier[];
  addons: ServiceAddon[];
  faqs: ServiceFaqItem[];
  caseStudyId?: string;
  relatedServiceIds: string[];
}

export const SERVICE_DEEP_DIVES: Record<string, ServiceDeepDive> = {
  'web-development': {
    serviceId: 'web-development',
    tagline: 'High-performance, custom web applications engineered for speed, conversions, and regional scale.',
    whyChooseUs: [
      'Sub-second Core Web Vitals (<1.2s LCP) ensuring maximum Google ranking and zero client bounce.',
      'Mobile-first responsive architecture designed for African mobile bandwidth constraints.',
      'Headless CMS integration (Sanity / Strapi / Custom) for effortless non-technical editorial control.',
      '100% intellectual property ownership with production GitHub repository and CI/CD pipelines.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Standard Business Website',
        priceUSD: 650,
        priceKES: 85000,
        timeline: '2 Weeks',
        description: 'Ideal for established businesses and professional firms needing a modern, authoritative web presence.',
        features: [
          'Up to 6 custom designed responsive pages',
          'Modern React / Next.js architecture',
          'Technical SEO schema & meta optimization',
          'Contact & quote lead capture forms',
          'WhatsApp floating concierge widget',
          'SSL configuration & 1-year hosting setup',
          '30-day post-launch warranty'
        ]
      },
      {
        id: 'pro',
        name: 'Growth & High-Conversion Web App',
        badge: 'Most Popular',
        popular: true,
        priceUSD: 1100,
        priceKES: 145000,
        timeline: '3 - 4 Weeks',
        description: 'Full-featured digital platform with custom CMS, interactive calculators, and lead management integrations.',
        features: [
          'Up to 15 custom pages + dynamic blog/insights',
          'Headless CMS (Sanity / Strapi) for team editing',
          'Interactive calculators or diagnostic tools',
          'Google Analytics 4 & Tag Manager setup',
          'Automated email lead notifications & CRM sync',
          'Sub-second Core Web Vitals performance tuning',
          '60-day priority engineering support'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Scale Platform',
        badge: 'Enterprise Tier',
        priceUSD: 1950,
        priceKES: 260000,
        timeline: '5 - 7 Weeks',
        description: 'Mission-critical web application with multi-role authentication, API integrations, and microservices.',
        features: [
          'Unlimited custom pages & dynamic routing',
          'Multi-role client portal / authentication',
          'Custom backend API integrations & webhooks',
          'Multi-language localization (EN / SW / FR)',
          'High-availability AWS / Cloudflare CDN setup',
          'Automated CI/CD deployment pipeline',
          '90-day SLA with dedicated lead architect'
        ]
      }
    ],
    addons: [
      {
        id: 'fast-track',
        name: 'Expedited 7-Day Delivery Sprint',
        priceUSD: 200,
        priceKES: 26000,
        description: 'Dedicated senior engineering pair working exclusively on your project for rapid turnaround.'
      },
      {
        id: 'cms-setup',
        name: 'Headless CMS & Content Management',
        priceUSD: 180,
        priceKES: 24000,
        description: 'Empower your marketing team to edit text, banners, and blogs without writing any code.'
      },
      {
        id: 'multilingual',
        name: 'Multi-Language Localization (Swahili / French)',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Expand your reach across East & Central Africa with full bilingual language switching.'
      },
      {
        id: 'maintenance-quarter',
        name: '3 Months Managed Maintenance & SLA',
        priceUSD: 250,
        priceKES: 33000,
        description: 'Daily encrypted backups, weekly security patching, uptime monitoring, and developer hours.'
      }
    ],
    faqs: [
      {
        question: 'Who owns the website code and assets after completion?',
        answer: 'You own 100% of all intellectual property, source code, design assets, and database schemas. Upon project completion and final payment, we hand over full GitHub repository access and cloud hosting credentials.'
      },
      {
        question: 'How fast will our new website load?',
        answer: 'We benchmark all our custom builds against Google Lighthouse to guarantee a Performance score of 90+ and Largest Contentful Paint (LCP) under 1.5 seconds on 4G mobile networks.'
      },
      {
        question: 'Can our non-technical team update text and images easily?',
        answer: 'Yes. We configure an intuitive visual dashboard or headless CMS (like Sanity or Strapi) where your staff can edit announcements, blog posts, team members, and photos without touching code.'
      },
      {
        question: 'Do you assist with domain registration and hosting?',
        answer: 'Absolutely. We configure your .co.ke, .com, or regional domain, set up enterprise SSL certificates, configure Cloudflare edge caching, and deploy on reliable cloud servers.'
      }
    ],
    caseStudyId: 'mara-wild-expeditions',
    relatedServiceIds: ['ecommerce-development', 'seo-services', 'website-maintenance']
  },

  'front-end-development': {
    serviceId: 'front-end-development',
    tagline: 'Pixel-perfect, accessible, and buttery-smooth user interfaces translated from Figma to production code.',
    whyChooseUs: [
      'Exact Figma-to-code fidelity with strict adherence to design tokens and typography hierarchies.',
      'Flawless micro-interactions and page transitions utilizing Framer Motion and modern CSS.',
      'Strict WCAG 2.1 AA accessibility compliance for universal usability.',
      'Zero layout shift (CLS: 0.00) with optimized component code splitting.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Figma to React Component Build',
        priceUSD: 500,
        priceKES: 65000,
        timeline: '1 - 2 Weeks',
        description: 'Conversion of existing design system or UI screens into clean, modular React / TypeScript components.',
        features: [
          'Up to 8 complex UI screens converted',
          'Responsive React + Tailwind CSS components',
          'Clean, semantic TypeScript types',
          'Asset optimization (SVG icons, web fonts)',
          'Cross-browser QA verification report'
        ]
      },
      {
        id: 'pro',
        name: 'Complete Interactive Application UI',
        badge: 'Recommended',
        popular: true,
        priceUSD: 850,
        priceKES: 110000,
        timeline: '2 - 3 Weeks',
        description: 'Full interactive frontend with state management, animations, and live API connection hooks.',
        features: [
          'Up to 20 responsive screens and modals',
          'Framer Motion micro-interactions & transitions',
          'State management (Zustand / Redux / Context)',
          'Form validation & error state handling',
          'API client integration hooks (Axios / TanStack Query)',
          'Dark / Light mode theme support'
        ]
      },
      {
        id: 'enterprise',
        name: 'Design System & Component Library',
        badge: 'Design System',
        priceUSD: 1400,
        priceKES: 185000,
        timeline: '4 Weeks',
        description: 'Comprehensive enterprise UI component library with Storybook documentation and automated testing.',
        features: [
          '35+ accessible UI primitives and compound components',
          'Interactive Storybook documentation',
          'Figma design token synchronization',
          'Jest & React Testing Library test suites',
          'NPM package bundle optimization & semantic versioning',
          'Engineering team onboarding walkthrough'
        ]
      }
    ],
    addons: [
      {
        id: 'storybook',
        name: 'Interactive Storybook UI Documentation',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Isolated component testing environment with live prop controls and responsive previews.'
      },
      {
        id: 'wcag-audit',
        name: 'Formal WCAG 2.1 AA Accessibility Certification',
        priceUSD: 120,
        priceKES: 16000,
        description: 'Screen reader testing, keyboard navigation audit, and contrast verification.'
      },
      {
        id: 'dark-mode',
        name: 'Dynamic Light / Dark Theme Architecture',
        priceUSD: 90,
        priceKES: 12000,
        description: 'Persistent theme switching with zero page flash and custom Tailwind color palettes.'
      }
    ],
    faqs: [
      {
        question: 'What design formats can you convert to code?',
        answer: 'We accept Figma, Adobe XD, Sketch, and InVision. Figma is our primary preference for its inspect mode and token variables.'
      },
      {
        question: 'Can you integrate this frontend with our existing backend API?',
        answer: 'Yes. Our team can wire the frontend components directly to your REST or GraphQL endpoints with strong TypeScript contracts and error handling.'
      }
    ],
    caseStudyId: 'mara-wild-expeditions',
    relatedServiceIds: ['web-development', 'mobile-app-development', 'graphic-design-branding']
  },

  'ecommerce-development': {
    serviceId: 'ecommerce-development',
    tagline: 'High-converting online stores with automated M-Pesa Daraja 3.0 STK push and global checkout flows.',
    whyChooseUs: [
      'Direct Safaricom Daraja 3.0 M-Pesa STK Push with automated instant payment callback verification.',
      'Multi-currency processing: KES via M-Pesa / Airtel Money and USD via Stripe / PayPal.',
      'Frictionless one-page checkout engineered to reduce abandoned carts by up to 60%.',
      'Automated WhatsApp and SMS order confirmation alerts to clients and dispatch riders.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Turnkey E-Commerce Store',
        priceUSD: 850,
        priceKES: 110000,
        timeline: '3 Weeks',
        description: 'Complete online retail store for businesses launching their first digital direct-to-consumer channel.',
        features: [
          'Full store setup (Shopify / WooCommerce / Custom)',
          'Safaricom Daraja 3.0 M-Pesa STK Push integration',
          'Card payments via Stripe or Flutterwave',
          'Product catalog setup (up to 40 initial products)',
          'Automated inventory & out-of-stock alerts',
          'Mobile-responsive layout & fast checkout',
          'Admin order management training'
        ]
      },
      {
        id: 'pro',
        name: 'High-Volume Headless Commerce',
        badge: 'Recommended',
        popular: true,
        priceUSD: 1450,
        priceKES: 190000,
        timeline: '4 - 5 Weeks',
        description: 'Ultra-fast headless commerce built on Next.js with automated WhatsApp dispatch and abandoned cart recovery.',
        features: [
          'Bespoke Next.js headless storefront (<1s page loads)',
          'M-Pesa STK Push + B2C automated refund workflow',
          'Automated WhatsApp order confirmation bot',
          'Automated SMS abandoned cart recovery sequences',
          'Dynamic product filters, variants & bundle pricing',
          'Shipping rates calculator (Fargo / G4S / Sendy / DHL)',
          'Advanced Google Analytics 4 e-commerce tracking'
        ]
      },
      {
        id: 'enterprise',
        name: 'Multi-Vendor / B2B Marketplace',
        badge: 'Enterprise Commerce',
        priceUSD: 2400,
        priceKES: 315000,
        timeline: '6 - 9 Weeks',
        description: 'Custom e-commerce architecture for multi-vendor marketplaces, wholesale B2B pricing, or regional supply chains.',
        features: [
          'Multi-vendor merchant onboarding & commission split',
          'B2B wholesale tiered pricing & tax exemption logic',
          'Real-time ERP / Accounting sync (SAP, QuickBooks, Xero)',
          'Multi-warehouse inventory routing',
          'SLA 99.9% uptime architecture on cloud infrastructure',
          'Dedicated engineering lead & quarterly performance reviews'
        ]
      }
    ],
    addons: [
      {
        id: 'daraja-b2c',
        name: 'M-Pesa B2C Automated Payouts & Refunds',
        priceUSD: 220,
        priceKES: 29000,
        description: 'Automate disbursements, affiliate payouts, and customer refunds directly to mobile wallets.'
      },
      {
        id: 'abandoned-cart',
        name: 'WhatsApp Abandoned Cart Recovery Bot',
        priceUSD: 160,
        priceKES: 21000,
        description: 'Automatically reach shoppers who dropped off at checkout via WhatsApp with discount triggers.'
      },
      {
        id: 'courier-api',
        name: 'Live Courier Shipping Rates Integration',
        priceUSD: 140,
        priceKES: 18000,
        description: 'Calculate real-time shipping costs dynamically for Nairobi, nationwide Kenya, and international.'
      },
      {
        id: 'pos-sync',
        name: 'Physical Retail POS & Inventory Sync',
        priceUSD: 250,
        priceKES: 33000,
        description: 'Sync online inventory in real-time with your physical storefront stock to prevent overselling.'
      }
    ],
    faqs: [
      {
        question: 'How does the M-Pesa STK Push integration work?',
        answer: 'When a customer clicks "Pay with M-Pesa", our system triggers Safaricom Daraja API to prompt a secure PIN prompt directly on their phone screen. Once they enter their PIN, your store instantly updates the order to "Paid" via webhook.'
      },
      {
        question: 'Do you help us register our Safaricom Daraja developer credentials?',
        answer: 'Yes. We guide you through the entire Safaricom Business Till or Paybill onboarding, certificate generation, sandbox simulation, and live production cutover.'
      },
      {
        question: 'Can we sell internationally in USD and locally in KES?',
        answer: 'Yes. We configure multi-currency geolocation: customers in Kenya see KES with M-Pesa and Airtel Money, while international visitors see USD/GBP/EUR with Stripe, Visa, Mastercard, and PayPal.'
      }
    ],
    caseStudyId: 'savannah-crafts-ecommerce',
    relatedServiceIds: ['web-development', 'seo-services', 'whatsapp-marketing']
  },

  'cms-development': {
    serviceId: 'cms-development',
    tagline: 'Lightweight WordPress and Headless CMS builds with zero bloat and effortless editorial control.',
    whyChooseUs: [
      'Custom theme engineering with zero slow third-party page builders (Elementor/Divi).',
      'Automated daily cloud backups and server-level caching for rock-solid stability.',
      'Strict security hardening: customized login URLs, brute-force shields, and file integrity scans.',
      'Custom Gutenberg blocks matching your brand guidelines exactly.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Custom WordPress Theme',
        priceUSD: 550,
        priceKES: 70000,
        timeline: '2 Weeks',
        description: 'Clean, custom-coded WordPress site for companies that need simple, dependable content publishing.',
        features: [
          'Custom theme tailored to your brand identity',
          'Zero visual builder bloat (100% native Gutenberg)',
          'Security hardening suite (firewall, login protection)',
          'Yoast / RankMath SEO configuration',
          'Staff video walkthrough tutorial'
        ]
      },
      {
        id: 'pro',
        name: 'Headless CMS Architecture',
        badge: 'Modern Architecture',
        popular: true,
        priceUSD: 950,
        priceKES: 125000,
        timeline: '3 - 4 Weeks',
        description: 'Next.js frontend paired with Sanity or Strapi CMS for unbeatable performance and editorial happiness.',
        features: [
          'Ultra-fast Next.js statically generated frontend',
          'Sanity or Strapi cloud studio dashboard',
          'Instant preview mode for draft content',
          'Granular role-based editorial permissions',
          'Automated daily off-site cloud backups',
          'Global CDN deployment on Cloudflare'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Media Publishing Suite',
        badge: 'High Traffic',
        priceUSD: 1600,
        priceKES: 210000,
        timeline: '5 - 6 Weeks',
        description: 'High-traffic publication or corporate portal with multi-author workflows, paywalls, and Redis caching.',
        features: [
          'Multi-author editorial approval workflows',
          'Redis object caching handling 100k+ visits/day',
          'Automated newsletter distribution sync',
          'Custom ad slot and sponsor banner management',
          'Elasticsearch instant full-text search',
          'Priority 24/7 emergency support SLA'
        ]
      }
    ],
    addons: [
      {
        id: 'migration',
        name: 'Legacy Content & Database Migration',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Seamlessly migrate all existing posts, categories, images, and user accounts without losing SEO.'
      },
      {
        id: 'backup-s3',
        name: 'Encrypted AWS S3 Cloud Backup Automation',
        priceUSD: 90,
        priceKES: 12000,
        description: 'Daily automated snapshots stored safely outside your web host for instant disaster recovery.'
      }
    ],
    faqs: [
      {
        question: 'Why avoid page builders like Elementor or Divi?',
        answer: 'Generic page builders inject hundreds of unnecessary CSS and JS files, causing your site to score poorly on Google PageSpeed (often 20-40/100). Custom code loads in under 1 second and scores 95+.'
      }
    ],
    caseStudyId: 'apex-legal-seo-growth',
    relatedServiceIds: ['web-development', 'seo-services', 'website-maintenance']
  },

  'seo-services': {
    serviceId: 'seo-services',
    tagline: 'Technical SEO dominance and high-intent organic rankings that turn Google into your top customer channel.',
    whyChooseUs: [
      'Comprehensive Core Web Vitals remediation that satisfies Google’s algorithm requirements.',
      'High-intent commercial keyword clustering targeting buyers ready to transact.',
      'Local SEO dominance across Nairobi and Kenya on Google Maps and Google Business Profile.',
      'Transparent monthly reporting with verified ranking progress on Ahrefs and Google Search Console.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Technical SEO Overhaul',
        priceUSD: 450,
        priceKES: 60000,
        timeline: '2 Weeks Sprint',
        description: 'Fix deep technical crawl errors, schema markup, and speed issues holding your site back on Google.',
        features: [
          'Comprehensive 120-point technical audit',
          'Fix 404s, redirect loops, and indexing blocks',
          'Schema.org JSON-LD structured data implementation',
          'Core Web Vitals & mobile speed optimization',
          'Google Search Console & GA4 verification',
          'Keyword gap analysis against 3 competitors'
        ]
      },
      {
        id: 'pro',
        name: 'Full Organic Growth Retainer',
        badge: 'Most Popular',
        popular: true,
        priceUSD: 750,
        priceKES: 98000,
        timeline: 'Monthly Retainer',
        description: 'End-to-end SEO campaign combining technical optimization, content clustering, and local Maps dominance.',
        features: [
          'Continuous technical maintenance & crawl monitoring',
          'Targeting up to 25 commercial high-intent keywords',
          '4 high-authority SEO pillar articles / guides per month',
          'Google Business Profile (Maps) rank optimization',
          'High-authority regional backlink acquisition',
          'Bi-weekly ranking reports & live dashboard'
        ]
      },
      {
        id: 'enterprise',
        name: 'National / Regional Industry Domination',
        badge: 'Enterprise Growth',
        priceUSD: 1350,
        priceKES: 175000,
        timeline: 'Monthly Retainer',
        description: 'Aggressive multi-region SEO campaign for enterprises competing against established industry incumbents.',
        features: [
          'Targeting 60+ national and international keywords',
          '8 in-depth technical guides & whitepapers per month',
          'Digital PR outreach to national news & business outlets',
          'Competitor backlink interception campaigns',
          'Dedicated senior SEO strategist in Nairobi',
          'Weekly strategy calls with executive team'
        ]
      }
    ],
    addons: [
      {
        id: 'local-pack',
        name: 'Google Maps & Local Citation Pack',
        priceUSD: 140,
        priceKES: 18000,
        description: 'Boost your Google Business Profile to the top 3 Local Pack map results for local inquiries.'
      },
      {
        id: 'competitor-audit',
        name: 'Deep Competitor Backlink & Keyword Teardown',
        priceUSD: 120,
        priceKES: 16000,
        description: 'Uncover the exact keywords and traffic sources driving revenue for your top 3 competitors.'
      }
    ],
    faqs: [
      {
        question: 'How long before we see ranking improvements?',
        answer: 'Technical fixes (like speed and schema) often trigger positive ranking adjustments within 2 to 4 weeks. Competitive commercial keywords generally take 60 to 90 days of sustained optimization to reach Page 1.'
      }
    ],
    caseStudyId: 'apex-legal-seo-growth',
    relatedServiceIds: ['web-development', 'digital-marketing', 'ppc-management']
  },

  'digital-marketing': {
    serviceId: 'digital-marketing',
    tagline: 'Result-driven marketing campaigns engineered to acquire qualified leads and maximize return on ad spend.',
    whyChooseUs: [
      'Data-driven audience targeting on Meta (Facebook & Instagram), Google, and LinkedIn.',
      'High-converting landing page copywriting and visual creatives that convert cold traffic into buyers.',
      'Automated lead routing directly to your sales team’s WhatsApp and email inbox.',
      'Weekly transparent performance dashboards with exact Cost Per Lead (CPL) metrics.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Campaign Launch Setup',
        priceUSD: 500,
        priceKES: 65000,
        timeline: '10 Days Setup',
        description: 'Turnkey setup of your digital advertising infrastructure with tracking pixels and initial ad sets.',
        features: [
          'Ad account audit & Meta Pixel / GTM setup',
          'Audience persona research & targeting blueprint',
          '4 custom branded creative ad variations',
          'Persuasive ad copywriting with call-to-actions',
          'Lead capture form configuration'
        ]
      },
      {
        id: 'pro',
        name: 'Full-Funnel Monthly Retainer',
        badge: 'Recommended',
        popular: true,
        priceUSD: 850,
        priceKES: 110000,
        timeline: 'Monthly Management',
        description: 'Continuous multi-channel campaign management, creative testing, and weekly bid optimization.',
        features: [
          'Management of up to $5,000 monthly ad spend',
          'Continuous creative refreshes (8 new graphics/videos/mo)',
          'Retargeting funnels for website visitors',
          'Instant WhatsApp lead alert automation for sales team',
          'Weekly A/B testing of headlines and audiences',
          'Transparent monthly ROI reporting'
        ]
      },
      {
        id: 'enterprise',
        name: 'Omnichannel Scale & Lead Gen',
        badge: 'High Growth',
        priceUSD: 1450,
        priceKES: 190000,
        timeline: 'Monthly Management',
        description: 'High-scale multi-channel campaigns (Google Search + Meta + LinkedIn) for enterprise lead pipelines.',
        features: [
          'Management of $5,000+ monthly ad budgets',
          'Multi-channel attribution modeling',
          'Custom landing page design & conversion rate optimization',
          'Automated CRM integration & lead qualification bot',
          'Bi-weekly video strategy calls with marketing director'
        ]
      }
    ],
    addons: [
      {
        id: 'video-creatives',
        name: 'High-Converting UGC Video Ad Pack',
        priceUSD: 180,
        priceKES: 24000,
        description: '3 professionally edited short-form video ads optimized for TikTok and Instagram Reels.'
      },
      {
        id: 'crm-sync',
        name: 'Real-Time CRM & WhatsApp Lead Auto-Sync',
        priceUSD: 120,
        priceKES: 16000,
        description: 'Push leads within 2 seconds of form completion to your sales team’s phones for immediate follow-up.'
      }
    ],
    faqs: [
      {
        question: 'Does the package price include ad spend?',
        answer: 'No. The package fee covers our strategic campaign design, creative production, tracking setup, and continuous daily optimization. Ad spend is billed directly by Meta or Google to your company card.'
      }
    ],
    caseStudyId: 'solarpower-kenya-ppc',
    relatedServiceIds: ['ppc-management', 'whatsapp-marketing', 'social-media-marketing']
  },

  'ppc-management': {
    serviceId: 'ppc-management',
    tagline: 'Laser-focused Google Ads campaigns capturing high-intent commercial buyers actively searching for you.',
    whyChooseUs: [
      'Granular negative keyword lists that stop wasting ad budget on unqualified clicks.',
      'Continuous Quality Score optimization to reduce your average Cost Per Click (CPC).',
      'High-converting landing page alignment ensuring high Google Relevance scores.',
      'Conversion tracking verified through Google Tag Manager and Server-Side APIs.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Google Ads Launch Setup',
        priceUSD: 400,
        priceKES: 52000,
        timeline: '1 Week Setup',
        description: 'Build of Google Search campaigns, keyword clusters, and negative keyword guardrails.',
        features: [
          'High-intent commercial keyword research',
          'Extensive negative keyword list buildout',
          'Ad copywriting with dynamic search extensions',
          'Google Tag Manager conversion tracking setup',
          'Initial 14-day optimization tuning'
        ]
      },
      {
        id: 'pro',
        name: 'Active PPC Management Retainer',
        badge: 'Most Popular',
        popular: true,
        priceUSD: 650,
        priceKES: 85000,
        timeline: 'Monthly Management',
        description: 'Continuous daily bid adjustments, negative keyword mining, and search query reports.',
        features: [
          'Search, Display, and Performance Max management',
          'Weekly search term audit & negative keyword expansion',
          'Bid strategy optimization (Target CPA / Target ROAS)',
          'Landing page A/B copy recommendations',
          'Weekly spend vs return executive dashboard'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Search & Display Suite',
        badge: 'Enterprise Tier',
        priceUSD: 1100,
        priceKES: 145000,
        timeline: 'Monthly Management',
        description: 'High-budget search campaigns with call tracking, competitor bidding, and remarketing.',
        features: [
          'Multi-country regional search management (East Africa)',
          'Call tracking attribution (recording & lead scoring)',
          'Dynamic remarketing via Google Display Network',
          'Competitor brand defense campaigns',
          'Dedicated Google Ads certified account director'
        ]
      }
    ],
    addons: [
      {
        id: 'landing-page',
        name: 'Dedicated High-Converting PPC Landing Page',
        priceUSD: 200,
        priceKES: 26000,
        description: 'Fast, distraction-free landing page designed to lift conversion rate from clicks by 40%.'
      },
      {
        id: 'call-tracking',
        name: 'Call Tracking & Recording Attribution Setup',
        priceUSD: 120,
        priceKES: 16000,
        description: 'Track exactly which Google search keywords prompted prospective customers to call your office.'
      }
    ],
    faqs: [
      {
        question: 'Why choose Google Ads over social media ads?',
        answer: 'Google Ads reaches prospects who are actively searching for your service right now with high commercial intent, whereas social media reaches people during passive browsing.'
      }
    ],
    caseStudyId: 'solarpower-kenya-ppc',
    relatedServiceIds: ['digital-marketing', 'seo-services', 'web-development']
  },

  'whatsapp-marketing': {
    serviceId: 'whatsapp-marketing',
    tagline: 'Automate customer support, lead qualification, and order updates on the channel with 98% open rates.',
    whyChooseUs: [
      'Official WhatsApp Business API verification and green checkmark application assistance.',
      '24/7 automated bots that qualify leads, answer FAQs, and book meetings into your calendar.',
      'Automated transactional triggers: order receipts, dispatch updates, and appointment reminders.',
      'Multi-agent shared team inbox so your whole sales staff can reply from one business number.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'WhatsApp Business API & Bot Setup',
        priceUSD: 450,
        priceKES: 60000,
        timeline: '1 - 2 Weeks',
        description: 'Connect your business to the official Cloud API with automated welcoming and FAQ responses.',
        features: [
          'Official Meta WhatsApp Business Cloud API setup',
          'Interactive greeting and automated FAQ menu bot',
          'Click-to-WhatsApp website widget integration',
          'Pre-approved Meta utility message templates (up to 3)',
          'Shared inbox access for up to 3 agents'
        ]
      },
      {
        id: 'pro',
        name: 'Smart Sales & CRM Integration',
        badge: 'Recommended',
        popular: true,
        priceUSD: 750,
        priceKES: 98000,
        timeline: '2 - 3 Weeks',
        description: 'Conversational lead intake bot with CRM synchronization and automated cart recovery.',
        features: [
          'Multi-branch or multi-service routing bot',
          'Automatic lead logging to CRM (HubSpot, Google Sheets)',
          'E-commerce order status check & tracking lookup',
          'Automated broadcast campaign scheduler',
          'Multi-agent inbox for up to 8 team members',
          'Detailed response analytics & bot drop-off metrics'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise AI WhatsApp Suite',
        badge: 'AI Powered',
        priceUSD: 1200,
        priceKES: 160000,
        timeline: '4 Weeks',
        description: 'AI-grounded intelligent assistant handling complex customer inquiries and custom backend APIs.',
        features: [
          'AI chatbot trained on your entire company knowledge base',
          'Custom backend API hooks (e.g. check customer balance, book room)',
          'Unlimited agent seating & permission levels',
          'SLA 99.9% uptime webhook monitoring',
          'Compliance management with Meta business guidelines'
        ]
      }
    ],
    addons: [
      {
        id: 'templates',
        name: 'Meta Template Writing & Approval Package',
        priceUSD: 100,
        priceKES: 13000,
        description: '5 high-converting marketing and utility notification templates submitted and approved by Meta.'
      },
      {
        id: 'crm-bridge',
        name: 'Custom Webhook Bridge to Internal ERP',
        priceUSD: 180,
        priceKES: 24000,
        description: 'Sync WhatsApp chat notes and contact details with your proprietary internal software.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between WhatsApp Business App and WhatsApp API?',
        answer: 'The standard app is tied to a single phone. The official WhatsApp API enables multiple agents to respond simultaneously from computers, allows automated bot workflows, and supports thousands of messages per day without risking account bans.'
      }
    ],
    caseStudyId: 'savannah-crafts-ecommerce',
    relatedServiceIds: ['ecommerce-development', 'custom-crm-development', 'digital-marketing']
  },

  'social-media-marketing': {
    serviceId: 'social-media-marketing',
    tagline: 'Strategic content production and community management that establishes unmatched market authority.',
    whyChooseUs: [
      'Platform-specific content designed to trigger algorithm reach on Instagram, LinkedIn, and Facebook.',
      'Eye-catching branded carousels, infographics, and short-form video reels.',
      'Active community management: prompt response to DMs, comments, and inquiries.',
      'Monthly editorial calendar reviewed and approved before anything goes live.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Brand Presence Retainer',
        priceUSD: 350,
        priceKES: 45000,
        timeline: 'Monthly Retainer',
        description: 'Consistent, professional social presence for companies looking to maintain credible activity.',
        features: [
          '12 custom branded posts / graphics per month',
          'Platform copywriting & targeted hashtag sets',
          'Publishing schedule across 2 channels (e.g. LinkedIn + Instagram)',
          'Monthly performance summary report'
        ]
      },
      {
        id: 'pro',
        name: 'Growth & Engagement Suite',
        badge: 'Most Popular',
        popular: true,
        priceUSD: 600,
        priceKES: 78000,
        timeline: 'Monthly Retainer',
        description: 'Dynamic mix of graphics, carousels, and short reels designed to grow your audience and leads.',
        features: [
          '20 posts per month (including 4 short video reels)',
          'Daily community management & DM triage',
          'Story updates & interactive audience polls',
          'Publishing across 3 platforms (Instagram, LinkedIn, Facebook)',
          'Monthly follower and lead generation metrics'
        ]
      },
      {
        id: 'enterprise',
        name: 'Executive & Brand Authority Retainer',
        badge: 'Executive Branding',
        priceUSD: 950,
        priceKES: 125000,
        timeline: 'Monthly Retainer',
        description: 'Thought leadership for corporate executives, video production, and active industry engagement.',
        features: [
          '30 custom assets (including 8 produced video reels)',
          'Executive ghostwriting for CEO / Founder LinkedIn',
          'Industry collaboration and influencer coordination',
          'Crisis monitoring & brand reputation management',
          'Bi-weekly creative planning review'
        ]
      }
    ],
    addons: [
      {
        id: 'reel-shoot',
        name: 'On-Location Professional Video Shoot (Nairobi)',
        priceUSD: 250,
        priceKES: 33000,
        description: 'Half-day videographer session at your office or project site to capture authentic video footage.'
      }
    ],
    faqs: [
      {
        question: 'Do we get to approve posts before they go live?',
        answer: 'Yes. At the beginning of each month, we provide a full visual content calendar with graphics, captions, and scheduling dates for your team’s review and sign-off.'
      }
    ],
    caseStudyId: 'mara-wild-expeditions',
    relatedServiceIds: ['graphic-design-branding', 'digital-marketing', 'web-development']
  },

  'custom-crm-development': {
    serviceId: 'custom-crm-development',
    tagline: 'Tailor-made CRM and operational software that streamlines pipelines and eliminates manual spreadsheets.',
    whyChooseUs: [
      'Engineered around your exact company operational workflow, not rigid off-the-shelf software.',
      'Role-based permissions (Admins, Managers, Sales, Field Officers) for airtight data governance.',
      'Automated document generation: PDF quotes, invoices, and contracts generated in seconds.',
      'Local payment and SMS integrations: M-Pesa statements, automated SMS receipts, and alerts.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Workflow Pipeline CRM',
        priceUSD: 1200,
        priceKES: 160000,
        timeline: '4 - 5 Weeks',
        description: 'Centralized database and pipeline tracker replacing Excel sheets for sales or project teams.',
        features: [
          'Custom visual lead/deal pipeline stages',
          'Client contact directory & interaction history',
          'Automated PDF invoice & quote generation',
          'Role-based access (up to 3 distinct roles)',
          'Secure cloud database with automated backups',
          'Staff training onboarding session'
        ]
      },
      {
        id: 'pro',
        name: 'Full Operations Management System',
        badge: 'Recommended',
        popular: true,
        priceUSD: 2100,
        priceKES: 275000,
        timeline: '6 - 8 Weeks',
        description: 'End-to-end business software with inventory, task assignments, customer portals, and reporting.',
        features: [
          'Comprehensive operations & inventory modules',
          'Client portal login for customers to view status/invoices',
          'Safaricom M-Pesa Daraja payment reconciliation',
          'SMS and email automated status notifications',
          'Interactive financial dashboard & CSV export tools',
          'Full API documentation and webhook endpoints',
          '60 days warranty & developer support'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise ERP / Multi-Branch System',
        badge: 'Enterprise Architecture',
        priceUSD: 3600,
        priceKES: 475000,
        timeline: '9 - 14 Weeks',
        description: 'Mission-critical enterprise software supporting multi-branch organizations, audit logs, and compliance.',
        features: [
          'Multi-branch organizational hierarchy & routing',
          'Detailed audit logging for financial compliance',
          'Biometric or SSO (Single Sign-On) authentication',
          'Custom microservices & integrations with legacy tools',
          'Offline-first field worker synchronization',
          'Guaranteed 99.9% uptime SLA & dedicated architect'
        ]
      }
    ],
    addons: [
      {
        id: 'sms-gateway',
        name: 'Bulk SMS & Transactional Alert Gateway Setup',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Connect local SMS gateways (AfricasTalking / Twilio) for instant client alerts.'
      },
      {
        id: 'accounting-sync',
        name: 'QuickBooks / Xero Bi-Directional Sync',
        priceUSD: 280,
        priceKES: 37000,
        description: 'Keep accounts receivable and customer invoices synchronized automatically with accounting software.'
      }
    ],
    faqs: [
      {
        question: 'Why build custom CRM instead of subscribing to Salesforce or Zoho?',
        answer: 'Off-the-shelf enterprise CRMs charge expensive monthly per-user licensing fees ($50-$150/user/mo) that grow indefinitely, and often force you to adapt your business to their generic templates. Custom software gives you 100% ownership with zero monthly user taxes.'
      }
    ],
    caseStudyId: 'finpulse-crm-automation',
    relatedServiceIds: ['web-development', 'ai-powered-solutions', 'web-consultancy']
  },

  'ai-powered-solutions': {
    serviceId: 'ai-powered-solutions',
    tagline: 'Intelligent AI assistants, document parsers, and custom LLM workflows grounded in your company data.',
    whyChooseUs: [
      'Custom retrieval-augmented generation (RAG) models strictly grounded on your proprietary company data.',
      'Automated document extraction: read receipts, legal contracts, and scanned PDFs into structured data.',
      'Enterprise data privacy: zero training on external models without explicit consent.',
      'Seamless deployment to your website, CRM, or WhatsApp channel.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Knowledge Base AI Assistant',
        priceUSD: 950,
        priceKES: 125000,
        timeline: '3 Weeks',
        description: 'Smart AI chatbot trained on your product manuals, company policies, and customer FAQs.',
        features: [
          'Custom vector database & document ingestion',
          'Grounded AI responses with source citations',
          'Embeddable web chat widget with custom branding',
          'Human agent fallback escalation mechanism',
          'Admin query logs and sentiment analytics'
        ]
      },
      {
        id: 'pro',
        name: 'Automated Document & Invoice Parser',
        badge: 'High ROI',
        popular: true,
        priceUSD: 1650,
        priceKES: 215000,
        timeline: '4 - 5 Weeks',
        description: 'AI document processing pipeline that extracts structured JSON data from messy PDFs and images.',
        features: [
          'Automated parsing of invoices, receipts, or contracts',
          'High-accuracy OCR and table extraction',
          'Direct validation and export to internal database / CRM',
          'Human-in-the-loop review interface for edge cases',
          'REST API endpoints for existing internal systems'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise AI Agent Workflow Engine',
        badge: 'Enterprise AI',
        priceUSD: 2800,
        priceKES: 365000,
        timeline: '6 - 8 Weeks',
        description: 'Autonomous multi-step AI agents that perform research, draft communications, and trigger system actions.',
        features: [
          'Multi-agent decision tree architecture',
          'Secure on-premise or private cloud deployment (AWS/GCP)',
          'Automated report drafting & summarization',
          'Enterprise role-based security & strict compliance',
          'Ongoing prompt tuning and accuracy benchmarks'
        ]
      }
    ],
    addons: [
      {
        id: 'whatsapp-ai',
        name: 'WhatsApp Channel Integration for AI Agent',
        priceUSD: 200,
        priceKES: 26000,
        description: 'Deploy your AI assistant directly to your WhatsApp Business number for instant 24/7 client triage.'
      }
    ],
    faqs: [
      {
        question: 'Does the AI hallucinate or provide incorrect answers?',
        answer: 'We implement strict Retrieval-Augmented Generation (RAG) with source verification. If the model does not find the exact answer in your uploaded company documents, it politely directs the customer to a human representative rather than guessing.'
      }
    ],
    caseStudyId: 'finpulse-crm-automation',
    relatedServiceIds: ['custom-crm-development', 'web-development', 'whatsapp-marketing']
  },

  'web-consultancy': {
    serviceId: 'web-consultancy',
    tagline: 'Strategic advisory, technical debt audits, cloud infrastructure planning, and vendor evaluations.',
    whyChooseUs: [
      'Unbiased senior technical evaluation with zero vendor lock-in incentives.',
      'Comprehensive security, architecture, and code quality audits.',
      'Cloud hosting sizing and cost reduction recommendations (AWS, GCP, DigitalOcean).',
      'Actionable executive roadmaps prioritizing highest ROI technical interventions.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Architecture & Security Audit',
        priceUSD: 400,
        priceKES: 50000,
        timeline: '1 Week',
        description: 'Thorough review of your existing web codebase, database performance, and security vulnerabilities.',
        features: [
          'Codebase & dependency security scan',
          'Database query bottleneck analysis',
          'Cloud hosting cost & resource utilization review',
          'Prioritized executive recommendations report',
          '90-minute strategy debrief with lead engineer'
        ]
      },
      {
        id: 'pro',
        name: 'Digital Transformation Roadmap',
        badge: 'Strategic Value',
        popular: true,
        priceUSD: 850,
        priceKES: 110000,
        timeline: '2 - 3 Weeks',
        description: 'Complete multi-phase technology modernization blueprint with vendor RFP guidelines.',
        features: [
          'Stakeholder interviews and workflow mapping',
          'Technology stack selection matrix (Build vs Buy)',
          'Phase-by-phase implementation roadmap & budget estimates',
          'Vendor RFP specifications document',
          'Two executive presentation workshops'
        ]
      },
      {
        id: 'enterprise',
        name: 'Fractional CTO & Advisory Retainer',
        badge: 'Executive Advisory',
        priceUSD: 1500,
        priceKES: 195000,
        timeline: 'Monthly Retainer',
        description: 'On-demand senior technical leadership for your board, investor diligence, and engineering squad.',
        features: [
          'Dedicated fractional CTO advisory (up to 20 hrs/mo)',
          'Technical interview assessment for senior developer hires',
          'Architecture review for high-scale features',
          'Investor technical due diligence preparation',
          'Bi-weekly leadership sync calls'
        ]
      }
    ],
    addons: [
      {
        id: 'vendor-review',
        name: 'Contractor & Vendor Proposal Due Diligence',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Technical review of contractor bids and proposals to prevent costly overcharges and flawed architecture.'
      }
    ],
    faqs: [
      {
        question: 'Who conducts the consultancy reviews?',
        answer: 'Our senior engineering directors in Nairobi with 10+ years of production experience architecting fintech, e-commerce, and high-availability cloud platforms.'
      }
    ],
    caseStudyId: 'finpulse-crm-automation',
    relatedServiceIds: ['web-development', 'website-maintenance', 'custom-crm-development']
  },

  'website-maintenance': {
    serviceId: 'website-maintenance',
    tagline: 'Continuous security patching, daily cloud backups, 24/7 uptime monitoring, and priority developer hours.',
    whyChooseUs: [
      '24/7/365 automated uptime monitoring with instant outage response SLA.',
      'Automated daily off-site encrypted cloud snapshots stored in isolated AWS S3.',
      'Weekly core, theme, and plugin security patching with staging verification.',
      'Dedicated developer hours included every month for content updates and minor features.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Essential Care Plan',
        priceUSD: 150,
        priceKES: 20000,
        timeline: 'Monthly Subscription',
        description: 'Dependable maintenance for business websites where downtime directly hurts reputation.',
        features: [
          '24/7 uptime monitoring (1-minute ping intervals)',
          'Daily off-site encrypted cloud backups',
          'Weekly security & CMS patch updates',
          'Malware scanning & firewall rules management',
          '1 hour of included developer updates per month',
          'Monthly site health & traffic summary report'
        ]
      },
      {
        id: 'pro',
        name: 'Growth & E-Commerce SLA',
        badge: 'Recommended',
        popular: true,
        priceUSD: 290,
        priceKES: 38000,
        timeline: 'Monthly Subscription',
        description: 'High-priority maintenance for revenue-generating stores and active business platforms.',
        features: [
          'Sub-30 minute emergency outage response SLA',
          'Real-time database backups for e-commerce transactions',
          'Staging environment testing before production deployment',
          'Speed & Core Web Vitals continuous monitoring',
          '4 hours of included developer time per month',
          'Payment gateway (M-Pesa / Stripe) health checks'
        ]
      },
      {
        id: 'enterprise',
        name: 'Mission-Critical Enterprise SLA',
        badge: 'High Availability',
        priceUSD: 550,
        priceKES: 72000,
        timeline: 'Monthly Subscription',
        description: 'Dedicated engineering support with 15-minute emergency response and server DevOps.',
        features: [
          '15-minute emergency response guarantee 24/7',
          'AWS / Cloud infrastructure management & scaling',
          '10 hours of included senior developer updates per month',
          'Database optimization & query performance tuning',
          'Quarterly security penetration testing',
          'Direct WhatsApp hotline to on-call engineer'
        ]
      }
    ],
    addons: [
      {
        id: 'extra-dev-hours',
        name: 'Block of 5 Additional Developer Support Hours',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Use on demand for new feature development, landing pages, or graphic updates.'
      }
    ],
    faqs: [
      {
        question: 'What happens if our website gets hacked or goes down?',
        answer: 'Our 24/7 monitoring alerts our engineering team immediately. With daily isolated cloud snapshots, we can restore your entire clean site and database in under 30 minutes.'
      }
    ],
    caseStudyId: 'savannah-crafts-ecommerce',
    relatedServiceIds: ['web-development', 'ecommerce-development', 'web-consultancy']
  },

  'graphic-design-branding': {
    serviceId: 'graphic-design-branding',
    tagline: 'Distinctive brand identities, logos, marketing collateral, and corporate stationery that command respect.',
    whyChooseUs: [
      'Comprehensive vector logo packages prepared for print, embroidery, digital, and billboards.',
      'Detailed corporate brand guidelines book (typography, color palettes, spacing rules).',
      'Print-ready stationery suites: business cards, letterheads, presentation folders, and email signatures.',
      'High-resolution digital social media kit with branded templates for your marketing team.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Core Identity & Logo Kit',
        priceUSD: 350,
        priceKES: 45000,
        timeline: '1 - 2 Weeks',
        description: 'Professional visual identity for startups and businesses needing a memorable, clean logo.',
        features: [
          '3 distinct initial logo design concepts',
          'Up to 3 revision rounds on chosen concept',
          'Master vector files (AI, EPS, SVG, PNG, PDF)',
          'Color palette & typography pairing sheet',
          'Digital social media avatar & header graphics'
        ]
      },
      {
        id: 'pro',
        name: 'Complete Corporate Brand Suite',
        badge: 'Most Popular',
        popular: true,
        priceUSD: 650,
        priceKES: 85000,
        timeline: '2 - 3 Weeks',
        description: 'Comprehensive brand identity system with extensive guidelines and corporate stationery.',
        features: [
          'Full corporate logo system (Primary, Secondary, Icon mark)',
          'Comprehensive Brand Guidelines Book (20+ pages PDF)',
          'Corporate stationery suite (Business cards, Letterhead, Envelope)',
          'Email signature design (HTML & Graphic)',
          'Company profile presentation template (PowerPoint / Canva)',
          'Full copyright ownership transfer'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Visual System & Collateral',
        badge: 'Enterprise Brand',
        priceUSD: 1100,
        priceKES: 145000,
        timeline: '3 - 4 Weeks',
        description: 'Full-spectrum corporate branding including product packaging, promotional merchandise, and billboards.',
        features: [
          'Complete brand architecture & sub-brand marks',
          'Product packaging / label design templates',
          'Promotional merchandise designs (Apparel, Mugs, Banners)',
          'Exhibition booth / Roll-up banner designs',
          'Editable corporate pitch deck (20 custom slides)',
          'Figma brand library for digital teams'
        ]
      }
    ],
    addons: [
      {
        id: 'pitch-deck',
        name: 'Investor Pitch Deck & Company Profile Design',
        priceUSD: 180,
        priceKES: 24000,
        description: 'Professionally structured 15-slide presentation designed to impress enterprise clients and investors.'
      },
      {
        id: 'packaging',
        name: 'Product Packaging & Label Design',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Die-cut print-ready product packaging files with barcoding and typography standards.'
      }
    ],
    faqs: [
      {
        question: 'Do we own the master design files?',
        answer: 'Yes. You receive full commercial rights and all raw editable vector source files (Adobe Illustrator .AI, EPS, SVG, and high-resolution PNGs).'
      }
    ],
    caseStudyId: 'apex-legal-seo-growth',
    relatedServiceIds: ['web-development', 'social-media-marketing', 'front-end-development']
  },

  'mobile-app-development': {
    serviceId: 'mobile-app-development',
    tagline: 'Native-feel iOS and Android mobile applications built on React Native & Flutter with offline sync.',
    whyChooseUs: [
      'Single codebase cross-platform engineering slashing development costs by 50% without compromising speed.',
      'Native device hardware integration: Camera, GPS, Push Notifications, Biometric FaceID/Fingerprint.',
      'Offline-first synchronization with local databases for seamless usage during spotty network coverage.',
      'Full submission and approval management on Apple App Store and Google Play Store.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'MVP Mobile Application',
        priceUSD: 1400,
        priceKES: 185000,
        timeline: '5 - 6 Weeks',
        description: 'Lean, dependable cross-platform app for validating your mobile product with early adopters.',
        features: [
          'Cross-platform iOS and Android build (React Native)',
          'User authentication (Email, Google, Apple Sign-in)',
          'Up to 10 interactive core screens',
          'Push notifications setup (Firebase Cloud Messaging)',
          'Offline caching for instant screen loads',
          'App Store & Play Store publishing assistance'
        ]
      },
      {
        id: 'pro',
        name: 'Production Commercial Mobile App',
        badge: 'Recommended',
        popular: true,
        priceUSD: 2400,
        priceKES: 315000,
        timeline: '7 - 9 Weeks',
        description: 'Full-featured mobile application with in-app payments, geolocation, and real-time backend sync.',
        features: [
          'Up to 25 bespoke responsive mobile screens',
          'In-app Safaricom M-Pesa STK Push & Card checkout',
          'Interactive map tracking & GPS geolocation',
          'Real-time chat or activity feed',
          'Biometric authentication (FaceID / Fingerprint)',
          'Analytics & crash reporting (Sentry, PostHog)',
          '60-day post-launch warranty and bug fixes'
        ]
      },
      {
        id: 'enterprise',
        name: 'High-Scale Enterprise Mobile Platform',
        badge: 'Enterprise Mobile',
        priceUSD: 4200,
        priceKES: 550000,
        timeline: '10 - 14 Weeks',
        description: 'Mission-critical mobile application with microservices backend, offline-first sync, and enterprise security.',
        features: [
          'Complete custom backend architecture & database',
          'Offline-first synchronization engine (WatermelonDB / SQLite)',
          'Real-time WebSockets for instant live data',
          'Automated CI/CD build distribution (Fastlane)',
          'App Store & Play Store rejection guarantee',
          'Dedicated senior mobile engineering squad & SLA'
        ]
      }
    ],
    addons: [
      {
        id: 'mpesa-sdk',
        name: 'Direct M-Pesa Mobile SDK In-App Checkout',
        priceUSD: 250,
        priceKES: 33000,
        description: 'Native seamless payment flow triggering the Safaricom STK prompt without leaving the mobile app.'
      },
      {
        id: 'store-approval',
        name: 'Guaranteed Store Approval & Asset Preparation',
        priceUSD: 150,
        priceKES: 20000,
        description: 'Preparation of required privacy policies, app store screenshots, metadata, and rejection handling.'
      }
    ],
    faqs: [
      {
        question: 'Will one codebase work on both Apple iPhones and Android devices?',
        answer: 'Yes! We use React Native and Flutter, which compile to native platform binaries on both iOS and Android. This provides native 60fps performance while saving you 50% in engineering and maintenance costs.'
      },
      {
        question: 'Who manages the App Store and Google Play submissions?',
        answer: 'We handle the entire submission process: configuring developer accounts, generating security certificates, creating store screenshots, writing privacy policies, and handling review feedback until your app is live.'
      }
    ],
    caseStudyId: 'finpulse-crm-automation',
    relatedServiceIds: ['web-development', 'custom-crm-development', 'ecommerce-development']
  },
  'pos-systems': {
    serviceId: 'pos-systems',
    tagline: 'Point of Sale (POS) software & hardware solutions in Kenya: Cloud monthly plans from KSh 500/mo, lifetime licenses, and complete KRA e-TIMS touchscreen bundles.',
    whyChooseUs: [
      'Transparent market pricing: Basic cloud software from KSh 500/mo to complete high-performance bundles up to KSh 105,000.',
      'Full KRA e-TIMS compliance: Automated fiscal electronic signature and QR code generation on every printed customer receipt.',
      'Offline-first reliability: Keep ringing up sales during power or network outages with auto-sync when back online.',
      'Grade-A tested hardware: 80mm thermal receipt printers, laser & 2D barcode scanners, cash drawers, and commercial touchscreen terminals with warranty.'
    ],
    packages: [
      {
        id: 'starter',
        name: 'Cloud-Based POS Software (Monthly)',
        badge: 'From KSh 500 / mo',
        priceUSD: 5,
        priceKES: 500,
        timeline: 'Same Day Deployment',
        description: 'From KSh 500 to KSh 5,000 per month depending on features and multi-user access. Ideal for small shops, kiosks, cafes, and growing retailers.',
        features: [
          'Cloud-Based (Monthly): From KSh 500 to KSh 5,000 / month',
          'Multi-user access & granular role permissions',
          'Real-time inventory tracking, low-stock & reorder alerts',
          'Compatible with any existing laptop, Android tablet, or phone',
          'Safaricom M-Pesa STK push & digital sales receipts',
          'Optional cloud sync / hosting (~KSh 5,000/yr) with KRA e-TIMS support'
        ]
      },
      {
        id: 'pro',
        name: 'On-Premise Lifetime POS License',
        badge: 'Most Popular for Retail',
        popular: true,
        priceUSD: 195,
        priceKES: 25000,
        timeline: '1 - 2 Business Days',
        description: 'KSh 15,000 to KSh 35,000 per computer for a lifetime license with local installation. Permanent offline speed with zero recurring monthly subscription costs.',
        features: [
          'Lifetime license: KSh 15,000 to KSh 35,000 per computer',
          'Zero recurring monthly fees — permanent software ownership',
          '100% offline functionality — operates seamlessly without internet',
          'Direct KRA e-TIMS integration & fiscal QR printing',
          'Daily sales Z-report reconciliation & cashier shift tracking',
          'Compatible with standard 80mm printers, barcode scanners & cash drawers'
        ]
      },
      {
        id: 'enterprise',
        name: 'All-in-One Touchscreen Complete Bundle',
        badge: 'Turnkey Hardware & Software',
        priceUSD: 690,
        priceKES: 90000,
        timeline: '2 - 3 Days On-Site',
        description: 'All-in-One Touchscreen Bundles (Core i3 / i5 / Celeron): KSh 37,000 to KSh 105,000 (includes the touch terminal, receipt printer, scanner, and cash drawer).',
        features: [
          'Core i3 / i5 / Celeron All-in-One touchscreen terminal (KSh 37,000 – KSh 105,000 bundle range)',
          'High-speed 80mm thermal receipt printer with auto-cutter (KSh 6,000 – KSh 18,000 value)',
          '1D/2D or hands-free omnidirectional barcode scanner (KSh 3,500 – KSh 14,000 value)',
          'Automatic heavy-duty 5-note cash drawer (KSh 5,000 – KSh 10,000 value)',
          'Complete POS software pre-configured with KRA e-TIMS fiscal setup',
          'On-site installation in Nairobi, staff training, and 1-year hardware warranty'
        ]
      }
    ],
    addons: [
      {
        id: 'printer-80mm',
        name: 'Thermal Receipt Printer (80mm Auto-Cutter)',
        priceUSD: 90,
        priceKES: 12000,
        description: 'High-speed 80mm receipt printer with auto-cutter (KSh 6,000 – KSh 18,000 range) with USB, LAN & Bluetooth support.'
      },
      {
        id: 'scanner-barcode',
        name: 'Barcode Scanner (1D / 2D / Omnidirectional)',
        priceUSD: 65,
        priceKES: 8500,
        description: 'Fast barcode scanner (KSh 3,500 – KSh 14,000 range) for laser, 2D QR codes, or hands-free omnidirectional scanning.'
      },
      {
        id: 'cash-drawer',
        name: 'Automatic Heavy-Duty Cash Drawer',
        priceUSD: 58,
        priceKES: 7500,
        description: 'Solid steel 5-bill cash drawer (KSh 5,000 – KSh 10,000 range) with automatic RJ11 printer trigger.'
      },
      {
        id: 'touch-monitor',
        name: 'Touch Screen Monitor / Terminal',
        priceUSD: 270,
        priceKES: 35000,
        description: 'Stand-alone monitor or Android/Celeron all-in-one unit (KSh 22,000 – KSh 50,000 range) responsive capacitive display.'
      },
      {
        id: 'smart-pos-handheld',
        name: 'Android Smart POS / Mobile Terminal',
        priceUSD: 190,
        priceKES: 25000,
        description: 'Handheld unit with built-in printer (KSh 10,000 – KSh 40,000 range), ideal for small shops, bars, or restaurants.'
      },
      {
        id: 'etims-annual-sync',
        name: 'KRA e-TIMS Integration & Cloud Sync (Annual)',
        priceUSD: 38,
        priceKES: 5000,
        description: 'Annual hosting & cloud sync fee (~KSh 5,000/yr) with continuous KRA e-TIMS tax transmission support.'
      }
    ],
    faqs: [
      {
        question: 'What are the Point of Sale (POS) system prices in Kenya?',
        answer: 'Point of sale (POS) system prices in Kenya range from KSh 500 per month for basic cloud software to over KSh 100,000 for complete high-performance hardware bundles. Software options include Cloud-based (KSh 500 to KSh 5,000/mo) or On-Premise lifetime licenses (KSh 15,000 to KSh 35,000 one-off). Hardware ranges from individual items like thermal printers (KSh 6,000 - 18,000) to full touchscreen bundles (KSh 37,000 - 105,000).'
      },
      {
        question: 'What is the price difference between Cloud-Based and On-Premise POS software in Kenya?',
        answer: 'Cloud-Based POS software costs from KSh 500 to KSh 5,000 per month depending on features and multi-user access, allowing remote tracking from any phone or laptop. On-Premise / One-Off costs KSh 15,000 to KSh 35,000 per computer for a lifetime license with local installation. Offline setups are one-off, while cloud or online sync setups may add an annual hosting fee of about KSh 5,000 with support for KRA e-TIMS.'
      },
      {
        question: 'What are the individual POS hardware component prices in Kenya?',
        answer: 'Individual POS hardware components are priced as follows: Thermal Receipt Printers (80mm) cost KSh 6,000 – KSh 18,000; Barcode Scanners cost KSh 3,500 – KSh 14,000 (higher for hands-free or 2D/omnidirectional types); Automatic Cash Drawers cost KSh 5,000 – KSh 10,000; Touch Screen Monitors / Terminals cost KSh 22,000 – KSh 50,000 (stand-alone monitors or Android/Celeron all-in-one units).'
      },
      {
        question: 'What complete POS bundles do you supply and what are their prices?',
        answer: 'We supply two main complete bundle types: 1) Android Smart POS / Mobile Terminals priced from KSh 10,000 – KSh 40,000 (handheld or compact units with built-in printers, ideal for small shops, kiosks, or restaurants); 2) All-in-One Touchscreen Bundles (Core i3 / i5 / Celeron) priced from KSh 37,000 – KSh 105,000, which includes the touch terminal, receipt printer, scanner, and cash drawer.'
      },
      {
        question: 'Does your POS system support KRA e-TIMS fiscal compliance?',
        answer: 'Yes! Both our cloud and on-premise solutions include support for KRA e-TIMS integration. Every receipt automatically includes the official KRA fiscal QR code, control unit number, and invoice validation data required by the Kenya Revenue Authority.'
      }
    ],
    caseStudyId: 'finpulse-crm-automation',
    relatedServiceIds: ['custom-crm-development', 'ecommerce-development', 'website-maintenance']
  }
};
