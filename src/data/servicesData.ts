import { ServiceDetail } from '../types';

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'web-development',
    title: 'Custom Website Development',
    category: 'web_dev',
    badge: 'Core Service',
    iconName: 'Globe',
    shortDesc: 'Modern, responsive, high-performing websites engineered to elevate your business presence and convert visitors into loyal clients.',
    fullDesc: 'We architect bespoke, lightning-fast business websites tailored to your exact industry requirements. From scalable company portals to interactive web applications, our engineering team ensures optimal user experiences, bulletproof security, and seamless mobile responsiveness across all viewports.',
    features: [
      'Tailored custom design matching your brand architecture',
      'Mobile-first responsive engineering across all devices',
      'Ultra-fast load times (< 1.2s benchmark) and Core Web Vitals optimized',
      'Intuitive admin dashboard or headless CMS integration',
      'Built-in Technical SEO schema and OpenGraph metadata',
      'Enterprise-grade security standards and SSL configuration'
    ],
    deliverables: [
      'Fully responsive custom website',
      'Content management admin access',
      'Speed optimization & clean source code',
      '1 Year SSL security & domain configuration',
      '30-day post-launch technical support'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    basePriceUSD: 650,
    basePriceKES: 85000,
    duration: '2 - 4 Weeks',
    popular: true
  },
  {
    id: 'front-end-development',
    title: 'Modern Front-End Development',
    category: 'web_dev',
    badge: 'UI / UX Excellence',
    iconName: 'Layout',
    shortDesc: 'Pixel-perfect, interactive, and accessible user interfaces that captivate users and deliver buttery-smooth application performance.',
    fullDesc: 'Transform Figma or Adobe XD designs into clean, semantic, and reusable code. We specialize in cutting-edge interactive web experiences, state management, complex micro-interactions, and accessibility (WCAG AA compliant) to maximize customer engagement.',
    features: [
      'Pixel-perfect Figma to responsive React/Vue/HTML translation',
      'Micro-interactions and fluid animations with Framer Motion',
      'Strict WCAG 2.1 AA accessibility compliance',
      'Component-driven architecture (atomic design methodology)',
      'Cross-browser cross-device compatibility testing',
      'Optimized asset pipeline and web font loading'
    ],
    deliverables: [
      'Component library or integrated web application UI',
      'Storybook / Interactive documentation (optional)',
      'Cross-browser QA verification report',
      'Production-ready bundle with zero bloat'
    ],
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite', 'CSS3 / SVG'],
    basePriceUSD: 500,
    basePriceKES: 65000,
    duration: '1 - 3 Weeks'
  },
  {
    id: 'ecommerce-development',
    title: 'E-Commerce Store Development',
    category: 'ecommerce',
    badge: 'High Conversion',
    iconName: 'ShoppingCart',
    shortDesc: 'Scalable online stores with automated M-Pesa Express, Stripe, Flutterwave, inventory tracking, and high-converting checkout flows.',
    fullDesc: 'Empower your retail business with an online store built to sell. We design and develop custom Shopify, WooCommerce, and headless e-commerce architectures featuring instant local and international payment gateways, stock notifications, order management, and abandoned cart recovery.',
    features: [
      'Instant payment gateway integration: M-Pesa STK Push, Card, PayPal, Stripe',
      'Automated inventory control and stock alert notifications',
      'Frictionless one-page checkout reducing cart abandonment',
      'Dynamic product filters, variants, size guides, and search',
      'Customer account portal with order tracking and invoice generation',
      'Shipping rates calculator and automated WhatsApp order confirmations'
    ],
    deliverables: [
      'Complete turn-key E-commerce storefront',
      'M-Pesa Express / Card payment gateway setup & testing',
      'Product catalog upload & taxonomy setup (up to 50 items initial)',
      'Admin training walkthrough for inventory & orders',
      'Analytics & sales tracking dashboard configuration'
    ],
    technologies: ['Shopify', 'WooCommerce', 'React / Next.js', 'M-Pesa Daraja API', 'Stripe', 'Tailwind CSS'],
    basePriceUSD: 850,
    basePriceKES: 110000,
    duration: '3 - 5 Weeks',
    popular: true
  },
  {
    id: 'cms-development',
    title: 'CMS & WordPress Development',
    category: 'web_dev',
    badge: 'Easy Management',
    iconName: 'FileCode',
    shortDesc: 'Custom WordPress and Headless CMS builds that give your non-technical team 100% control over blogs, pages, and media.',
    fullDesc: 'Forget bloated off-the-shelf templates. We create lightweight, custom-coded WordPress themes and headless CMS implementations (Sanity, Strapi) that are secure, lightning fast, and effortless for your editorial and marketing staff to manage without touching a line of code.',
    features: [
      'Custom Gutenberg blocks / flexible page builders tailored to your brand',
      'Zero plugin bloat - only essential, audited security & speed modules',
      'Granular user permissions and editorial workflow approval stages',
      'Automated daily off-site cloud backups and staging environment',
      'Built-in SEO schema and automated XML sitemap generation',
      'Database query optimization and server-level caching'
    ],
    deliverables: [
      'Custom WordPress / Headless CMS installation',
      'Custom theme without third-party page builder overhead',
      'Admin editorial documentation & video guide',
      'Security hardening suite (firewall, brute-force protection)'
    ],
    technologies: ['WordPress', 'PHP', 'Gutenberg Blocks', 'Headless Strapi', 'MySQL', 'Redis'],
    basePriceUSD: 550,
    basePriceKES: 70000,
    duration: '2 - 3 Weeks'
  },
  {
    id: 'seo-services',
    title: 'Search Engine Optimization (SEO)',
    category: 'seo_marketing',
    badge: 'Organic Growth',
    iconName: 'Search',
    shortDesc: 'Dominate Google rankings, drive qualified organic search traffic, and capture high-intent customers actively seeking your services.',
    fullDesc: 'Our data-driven SEO strategies combine technical site optimization, competitive keyword intelligence, high-intent content structuring, and local map dominance. We get your website to Page 1 on Google for high-converting queries that generate reliable inbound business.',
    features: [
      'Comprehensive technical SEO audit and error remediation',
      'High-intent commercial keyword mapping and search intent clustering',
      'On-page content optimization: meta titles, H1-H6 tags, internal linking',
      'Google Search Console and Google Analytics 4 (GA4) configuration',
      'Local SEO & Google Business Profile (Maps) rank boost',
      'High-authority white-hat backlink acquisition and digital PR'
    ],
    deliverables: [
      'Detailed SEO baseline & competitor gap analysis',
      'Technical SEO overhaul (Core Web Vitals, Schema JSON-LD)',
      'Monthly keyword ranking tracking & transparent performance reports',
      'Targeted content roadmap & optimization recommendations'
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Schema.org', 'GA4', 'Lighthouse'],
    basePriceUSD: 450,
    basePriceKES: 60000,
    duration: 'Monthly Retainer or 6-Week Sprint',
    popular: true
  },
  {
    id: 'digital-marketing',
    title: 'Result-Driven Digital Marketing',
    category: 'seo_marketing',
    badge: 'Lead Generation',
    iconName: 'TrendingUp',
    shortDesc: 'Hyper-targeted advertising and lead generation campaigns designed to maximize ROI, customer acquisition, and market reach.',
    fullDesc: 'Stop wasting budget on vanity clicks. We construct full-funnel digital marketing strategies combining audience segmentation, compelling creative copy, lead magnets, and retargeting campaigns that consistently drive inbound inquiries and measurable revenue.',
    features: [
      'Multi-channel campaign strategy (Meta, Google, LinkedIn)',
      'Audience persona research and behavioral targeting',
      'High-converting landing page structure and A/B copy testing',
      'Lead qualification workflows and automated email/CRM sync',
      'Conversion tracking pixel setup (Meta Pixel, Google Tag Manager)',
      'Weekly performance optimization and ROI reporting'
    ],
    deliverables: [
      'Campaign strategy blueprint & creative assets',
      'Ad account setup & conversion tracking verification',
      'Live campaign management & bid optimization',
      'Weekly transparent performance dashboard'
    ],
    technologies: ['Meta Ads Manager', 'Google Tag Manager', 'LinkedIn Ads', 'Mailchimp', 'HubSpot'],
    basePriceUSD: 500,
    basePriceKES: 65000,
    duration: 'Monthly Campaign'
  },
  {
    id: 'ppc-management',
    title: 'PPC Management (Google Ads)',
    category: 'seo_marketing',
    badge: 'Instant Traffic',
    iconName: 'Target',
    shortDesc: 'Laser-focused Google Ads and Search Network campaigns that put your brand directly in front of ready-to-buy customers.',
    fullDesc: 'Get immediate visibility at the exact moment prospects search for your solutions. We handle keyword selection, negative keyword lists, ad extensions, Quality Score optimization, and aggressive bid adjustments to deliver the lowest possible Cost Per Acquisition (CPA).',
    features: [
      'Google Search, Display, and Performance Max campaign architecture',
      'Granular negative keyword lists to eliminate wasted ad spend',
      'Compelling ad copywriting with dynamic keyword insertion',
      'Landing page conversion rate optimization (CRO) advisory',
      'Quality score enhancement to lower your average CPC',
      'Call tracking and form submission conversion attribution'
    ],
    deliverables: [
      'PPC account structure & campaign setup',
      'Search term audit & continuous bid tuning',
      'Weekly spend vs return reporting',
      'Dedicated Google Ads certified account strategist'
    ],
    technologies: ['Google Ads', 'Google Tag Manager', 'GA4', 'CallRail', 'Looker Studio'],
    basePriceUSD: 400,
    basePriceKES: 52000,
    duration: 'Monthly Management'
  },
  {
    id: 'whatsapp-marketing',
    title: 'WhatsApp Marketing & Automation',
    category: 'seo_marketing',
    badge: 'High Engagement',
    iconName: 'MessageSquare',
    shortDesc: 'Reach customers where they spend the most time with automated WhatsApp Business API bots, broadcast CRM, and instant chat support.',
    fullDesc: 'WhatsApp achieves an astonishing 98% open rate. We build custom WhatsApp Business API workflows, interactive product catalogs, automated lead capture bots, and compliant broadcast messaging systems that connect you directly with Kenyan and African customers.',
    features: [
      'Official WhatsApp Business API setup & verified green checkmark guidance',
      'Automated 24/7 lead intake, FAQ answering, and appointment booking bots',
      'Click-to-WhatsApp ad integration directly connected to ad campaigns',
      'Automated transactional triggers (order status, payment receipts, reminders)',
      'Multi-agent shared team inbox for customer support representatives',
      'Contact list segmentation and broadcast campaign scheduler'
    ],
    deliverables: [
      'WhatsApp API cloud integration',
      'Custom conversational bot flows & script design',
      'Multi-agent support dashboard setup',
      'Template message submission & Meta approval handling'
    ],
    technologies: ['WhatsApp Business Cloud API', 'Meta Graph API', 'Webhooks', 'Node.js', 'Twilio'],
    basePriceUSD: 450,
    basePriceKES: 60000,
    duration: '1 - 2 Weeks'
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing & Management',
    category: 'seo_marketing',
    badge: 'Brand Visibility',
    iconName: 'Share2',
    shortDesc: 'Strategic social media management that builds an engaged community, drives brand authority, and boosts social sales.',
    fullDesc: 'We manage your brand narrative across Instagram, LinkedIn, TikTok, and Facebook. Our team produces eye-catching graphics, authentic video reels, thoughtful thought-leadership posts, and active community engagement to build lasting brand loyalty.',
    features: [
      'Monthly content calendar with branded graphics, carousels, and videos',
      'Platform-specific copywriting tailored to your target audience tone',
      'Proactive community engagement, comment responses, and DM handling',
      'Influencer partnership coordination and industry collaborations',
      'Hashtag strategy and algorithmic distribution optimization',
      'End-of-month analytics review and engagement growth metrics'
    ],
    deliverables: [
      '12 - 20 custom branded social posts & reels per month',
      'Monthly content editorial calendar for client review',
      'Community management & inbox monitoring',
      'Monthly analytics & audience growth report'
    ],
    technologies: ['Canva Pro', 'Figma', 'Buffer / Hootsuite', 'CapCut', 'Meta Creator Studio'],
    basePriceUSD: 350,
    basePriceKES: 45000,
    duration: 'Monthly Retainer'
  },
  {
    id: 'custom-crm-development',
    title: 'Custom CRM & Business Systems',
    category: 'crm_software',
    badge: 'Operational Efficiency',
    iconName: 'Database',
    shortDesc: 'Tailor-made CRM and internal software that streamlines sales pipelines, tracks client interactions, and automates operations.',
    fullDesc: 'Off-the-shelf software rarely fits unique business workflows. We engineer proprietary CRM systems, inventory managers, customer portals, and internal workflow software customized to your organization’s operational realities.',
    features: [
      'Visual sales pipeline with drag-and-drop lead stage management',
      'Automated PDF invoice generation and payment tracking',
      'Customer communication timeline (emails, calls, WhatsApp notes)',
      'Role-based access control (Admins, Managers, Sales Reps)',
      'Exportable financial and operational reporting dashboards',
      'API integrations with existing accounting tools (QuickBooks, Xero)'
    ],
    deliverables: [
      'Custom cloud-hosted CRM web application',
      'Secure database architecture with automated backups',
      'User role permission matrix',
      'Staff training onboarding sessions & user manual'
    ],
    technologies: ['React', 'Node.js / Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
    basePriceUSD: 1200,
    basePriceKES: 160000,
    duration: '4 - 8 Weeks',
    popular: true
  },
  {
    id: 'ai-powered-solutions',
    title: 'AI-Powered Business Solutions',
    category: 'crm_software',
    badge: 'Next-Gen Tech',
    iconName: 'Cpu',
    shortDesc: 'Intelligent AI assistants, document parsers, and automated workflows that slash manual overhead and supercharge productivity.',
    fullDesc: 'Harness the power of modern artificial intelligence for your business operations. We build custom retrieval-augmented generation (RAG) knowledge bots, automated inquiry classifiers, PDF data extraction tools, and smart recommendation algorithms.',
    features: [
      'Custom trained AI customer support chatbots grounded on your company data',
      'Automated invoice / document scanning and structured data extraction',
      'AI-assisted lead scoring and smart inquiry routing',
      'Automated meeting transcript summarization and task extraction',
      'Secure enterprise deployment with strict privacy safeguards',
      'Seamless embedding into your existing website or WhatsApp channel'
    ],
    deliverables: [
      'AI assistant application & backend API integration',
      'Custom embeddings / company knowledge base setup',
      'Interactive chat widget or API endpoint',
      'Ongoing model prompt tuning & quality validation'
    ],
    technologies: ['Gemini API', 'Python', 'LangChain', 'FastAPI', 'Vector Databases', 'React'],
    basePriceUSD: 950,
    basePriceKES: 125000,
    duration: '3 - 5 Weeks'
  },
  {
    id: 'web-consultancy',
    title: 'Web & Digital Consultancy',
    category: 'crm_software',
    badge: 'Strategic Advisory',
    iconName: 'Compass',
    shortDesc: 'Strategic guidance through technology architecture, digital transformation roadmaps, vendor audits, and scalability planning.',
    fullDesc: 'Make confident technology investments. Our senior engineers and digital strategists review your existing tech stack, diagnose bottlenecks, advise on cloud hosting and security, and craft a clear multi-year digital transformation roadmap.',
    features: [
      'Comprehensive codebase, architecture, and security audit',
      'Cloud infrastructure cost reduction & sizing advisory',
      'Technology stack evaluation (React vs WordPress vs Custom)',
      'Digital transformation roadmap and phased milestone plan',
      'Vendor and contractor proposal evaluation',
      'Disaster recovery and business continuity planning'
    ],
    deliverables: [
      'Executive technical assessment report with prioritized action items',
      'Infrastructure architecture diagram & recommendations',
      '1-on-1 strategy workshops with executive leadership',
      'Follow-up review sessions'
    ],
    technologies: ['AWS', 'Google Cloud', 'DigitalOcean', 'Docker', 'Architecture Review'],
    basePriceUSD: 400,
    basePriceKES: 50000,
    duration: '1 - 2 Weeks'
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance & Security',
    category: 'maintenance_cloud',
    badge: '24/7 Peace of Mind',
    iconName: 'ShieldCheck',
    shortDesc: 'Keep your digital assets bulletproof with continuous security patching, daily cloud backups, uptime monitoring, and priority technical support.',
    fullDesc: 'Websites require ongoing vigilance. Our managed maintenance care plans guarantee your site stays online, updated, secure, and fast. When issues arise, our technical team resolves them immediately before they impact your revenue.',
    features: [
      '24/7/365 uptime monitoring with instant outage alerts',
      'Automated daily cloud backups stored in encrypted off-site storage',
      'Weekly software, CMS core, theme, and plugin security updates',
      'Continuous malware scanning, firewall tuning, and SSL monitoring',
      'Dedicated monthly hours for content updates and minor design tweaks',
      'Priority emergency support response within 1 hour'
    ],
    deliverables: [
      'Managed cloud maintenance dashboard',
      'Monthly health, security, and traffic summary report',
      'Disaster recovery rollback guarantee (< 1 hour)',
      'Included monthly developer support hours'
    ],
    technologies: ['Cloudflare', 'Updraft / S3', 'Uptime Kuma', 'Wordfence', 'Git'],
    basePriceUSD: 150,
    basePriceKES: 20000,
    duration: 'Monthly Subscription',
    popular: true
  },
  {
    id: 'graphic-design-branding',
    title: 'Graphic Design & Corporate Branding',
    category: 'branding_design',
    badge: 'Visual Identity',
    iconName: 'Palette',
    shortDesc: 'Distinctive brand identities, logos, marketing collateral, and corporate stationery that establish unmatched market authority.',
    fullDesc: 'Your visual identity is your first impression. We craft cohesive brand design systems: from memorable logos, balanced typography palettes, and color systems to business cards, company profiles, brochures, and digital pitch decks that command respect.',
    features: [
      'Full corporate visual identity system & logo design package',
      'Comprehensive brand guideline book (typography, colors, logo usage)',
      'Vector logo formats for digital, print, embroidery, and billboards',
      'Company profile design (print-ready PDF and presentation format)',
      'Stationery suite: business cards, letterheads, email signatures',
      'Social media kit: profile avatars, banners, and template graphics'
    ],
    deliverables: [
      'Master logo files (AI, EPS, SVG, PNG, PDF)',
      'Comprehensive Brand Guidelines PDF (20+ pages)',
      'Print-ready stationery files',
      'Digital social media branding pack'
    ],
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign'],
    basePriceUSD: 350,
    basePriceKES: 45000,
    duration: '1 - 2 Weeks'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'web_dev',
    badge: 'iOS & Android',
    iconName: 'Smartphone',
    shortDesc: 'Native-feel iOS and Android mobile applications built on React Native and Flutter with real-time push notifications and offline capability.',
    fullDesc: 'Deliver your services directly into your customers\' pockets. We design and engineer robust mobile applications with smooth gestures, secure biometrics, push notifications, offline local caching, and App Store / Google Play publishing management.',
    features: [
      'Single codebase cross-platform iOS and Android performance',
      'Native device feature integration: Camera, GPS, Push Notifications, Biometrics',
      'Offline-first data sync with local SQLite / WatermelonDB',
      'Seamless API integration with existing backend or web app',
      'In-app purchases, subscription management, and payment gateways',
      'Full submission and approval management for App Store and Google Play'
    ],
    deliverables: [
      'Published iOS and Android applications',
      'Source code repository and build scripts',
      'App Store & Play Store metadata, screenshots, and privacy policy setup',
      'Post-launch warranty and bug-fixing period'
    ],
    technologies: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Fastlane', 'Node.js'],
    basePriceUSD: 1400,
    basePriceKES: 185000,
    duration: '6 - 10 Weeks'
  },
  {
    id: 'pos-systems',
    title: 'Point of Sale (POS) Systems & Hardware',
    category: 'crm_software',
    badge: 'e-TIMS & Hardware',
    iconName: 'ShoppingCart',
    shortDesc: 'Point of sale (POS) systems in Kenya ranging from KSh 500/mo cloud software to complete high-performance hardware bundles with KRA e-TIMS.',
    fullDesc: 'Point of sale (POS) system prices in Kenya range from KSh 500 per month for basic cloud software to over KSh 100,000 for complete high-performance hardware bundles. We engineer and supply cloud-based software, on-premise lifetime licenses, KRA e-TIMS fiscal integrations, barcode scanners, 80mm thermal receipt printers, automatic cash drawers, and all-in-one touchscreen terminals tailored for retail, supermarkets, pharmacies, bars, and restaurants.',
    features: [
      'Cloud-Based Software (Monthly): From KSh 500 to KSh 5,000/mo depending on features & multi-user access',
      'On-Premise / One-Off: KSh 15,000 to KSh 35,000 per computer for a lifetime license with local installation',
      'Hosting & Offline Setup: Offline versions are one-off; cloud sync adds ~KSh 5,000/yr with full KRA e-TIMS support',
      'Thermal Receipt Printers (80mm): KSh 6,000 – KSh 18,000 with auto-cutter & high-speed USB/LAN/Bluetooth',
      'Barcode Scanners: KSh 3,500 – KSh 14,000 (1D laser, 2D QR code, and hands-free omnidirectional types)',
      'Automatic Cash Drawers: KSh 5,000 – KSh 10,000 heavy-duty steel drawers with RJ11 printer trigger',
      'Touch Screen Monitors / Terminals: KSh 22,000 – KSh 50,000 (standalone touch monitors or Android/Celeron units)',
      'Android Smart POS / Mobile Terminals: KSh 10,000 – KSh 40,000 (handheld units with built-in printers & M-Pesa)',
      'All-in-One Touchscreen Bundles (Core i3 / i5 / Celeron): KSh 37,000 – KSh 105,000 (terminal, printer, scanner & drawer)'
    ],
    deliverables: [
      'Fully configured POS software (Cloud or On-premise lifetime)',
      'KRA e-TIMS direct fiscal transmission & QR tax receipt setup',
      'Tested hardware bundle (printer, scanner, cash drawer, touch terminal)',
      'Product catalog database import, barcodes & category setup',
      'Cashier & supervisor training with user manuals',
      '30-day technical support warranty with priority SLA'
    ],
    technologies: ['Cloud POS', 'KRA e-TIMS', 'Android Smart POS', 'Thermal Printers', 'Barcode Scanners', 'Cash Drawers'],
    basePriceUSD: 5,
    basePriceKES: 500,
    duration: '1 - 3 Days',
    popular: true
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'All Services' },
  { id: 'web_dev', label: 'Web & Mobile' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'seo_marketing', label: 'Digital Marketing & SEO' },
  { id: 'crm_software', label: 'CRM & Software' },
  { id: 'branding_design', label: 'Branding & Design' },
  { id: 'maintenance_cloud', label: 'Maintenance & Cloud' }
] as const;
