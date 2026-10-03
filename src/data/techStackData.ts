export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'ecommerce' | 'cloud' | 'cms' | 'marketing_ai';
  categoryLabel: string;
  description: string;
  badge: string;
  metric: string;
  color: string;
  svgKey: string;
}

export const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend & Mobile' },
  { id: 'backend', label: 'Backend & Databases' },
  { id: 'ecommerce', label: 'E-Commerce & Payments' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'cms', label: 'CMS & Headless' },
  { id: 'marketing_ai', label: 'Growth, APIs & AI' },
] as const;

export const TECH_STACK: TechItem[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Component-driven interactive web applications with lightning fast DOM rendering and state management.',
    badge: 'Core Frontend',
    metric: '140+ Projects Built',
    color: '#06b6d4',
    svgKey: 'react'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Server-Side Rendering (SSR) & Static Site Generation (SSG) for Page 1 Google SEO and sub-second load times.',
    badge: 'Production Standard',
    metric: '98+ Lighthouse Scores',
    color: '#ffffff',
    svgKey: 'nextjs'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Strict type safety eliminating runtime bugs before code reaches production environments.',
    badge: 'Type Safety',
    metric: '100% Typed Codebases',
    color: '#3b82f6',
    svgKey: 'typescript'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Utility-first CSS architecture generating lean, zero-bloat production stylesheets under 15KB.',
    badge: 'Design Systems',
    metric: 'Zero Layout Bloat',
    color: '#38bdf8',
    svgKey: 'tailwind'
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'frontend',
    categoryLabel: 'Mobile',
    description: 'Cross-platform iOS and Android native applications sharing 90%+ code logic for faster time-to-market.',
    badge: 'iOS & Android',
    metric: 'Single Codebase',
    color: '#61dafb',
    svgKey: 'react-native'
  },

  // Backend & Databases
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend',
    description: 'High-concurrency asynchronous runtime handling thousands of real-time client requests and API calls.',
    badge: 'High Concurrency',
    metric: 'Sub-25ms API Latency',
    color: '#22c55e',
    svgKey: 'nodejs'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Backend & AI',
    description: 'Powering automated data scrapers, machine learning pipelines, RAG agents, and FastAPI microservices.',
    badge: 'Data & Automation',
    metric: 'Robust Computation',
    color: '#fbbf24',
    svgKey: 'python'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    categoryLabel: 'Databases',
    description: 'Battle-tested relational ACID-compliant database with JSONB support and enterprise data integrity.',
    badge: 'Primary SQL Engine',
    metric: '99.999% Durability',
    color: '#3386c0',
    svgKey: 'postgresql'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'backend',
    categoryLabel: 'Databases',
    description: 'In-memory caching and session store reducing database queries by up to 80% during traffic surges.',
    badge: 'Memory Caching',
    metric: '< 2ms Response Time',
    color: '#ef4444',
    svgKey: 'redis'
  },

  // E-Commerce & Payments
  {
    id: 'shopify',
    name: 'Shopify Plus',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    description: 'Global commerce engine with custom Liquid themes, checkout extensions, and automated inventory sync.',
    badge: 'Global Commerce',
    metric: '$3.5M+ GMV Processed',
    color: '#95bf47',
    svgKey: 'shopify'
  },
  {
    id: 'mpesa-daraja',
    name: 'M-Pesa Daraja API',
    category: 'ecommerce',
    categoryLabel: 'Fintech Payments',
    description: 'Native Safaricom STK Push, C2B, B2C automated validation, and instant receipt dispatch via webhooks.',
    badge: 'Kenya Payment Native',
    metric: '99.8% STK Success Rate',
    color: '#10b981',
    svgKey: 'mpesa'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'ecommerce',
    categoryLabel: 'Fintech Payments',
    description: 'Seamless international credit/debit card processing, recurring SaaS subscriptions, and fraud prevention.',
    badge: 'Global Payments',
    metric: '135+ Currencies',
    color: '#6366f1',
    svgKey: 'stripe'
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce',
    description: 'Customized open-source WordPress retail stores with zero transaction commissions and full data control.',
    badge: 'Zero Commissions',
    metric: 'Custom Themes',
    color: '#9b51e0',
    svgKey: 'woocommerce'
  },

  // Cloud & DevOps
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    category: 'cloud',
    categoryLabel: 'Cloud Infrastructure',
    description: 'Elastic compute (EC2), serverless Lambda, S3 object storage, and CloudFront CDN for global scaling.',
    badge: 'Cloud Enterprise',
    metric: '99.99% Uptime SLA',
    color: '#ff9900',
    svgKey: 'aws'
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud Platform (GCP)',
    category: 'cloud',
    categoryLabel: 'Cloud Infrastructure',
    description: 'Containerized microservices on Cloud Run, managed BigQuery analytics, and Vertex AI deployments.',
    badge: 'Containers & AI',
    metric: 'Zero Cold-Start',
    color: '#4285f4',
    svgKey: 'gcp'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    categoryLabel: 'DevOps',
    description: 'Isolated containerization ensuring parity between local development, staging servers, and live production.',
    badge: 'DevOps & CI/CD',
    metric: 'Consistent Builds',
    color: '#0ea5e9',
    svgKey: 'docker'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'cloud',
    categoryLabel: 'DevOps & Security',
    description: 'Global edge DNS, automated DDoS shielding, SSL termination, and image optimization CDN.',
    badge: 'Edge Security',
    metric: 'Under 10ms Global DNS',
    color: '#f97316',
    svgKey: 'cloudflare'
  },

  // CMS & Headless
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'cms',
    categoryLabel: 'Content Management',
    description: 'Custom block themes with zero plugin bloat, fortified security headers, and automated staging pipelines.',
    badge: 'Editorial Standard',
    metric: 'Custom Clean Themes',
    color: '#21759b',
    svgKey: 'wordpress'
  },
  {
    id: 'strapi',
    name: 'Strapi Headless CMS',
    category: 'cms',
    categoryLabel: 'Content Management',
    description: 'Custom REST & GraphQL headless API architecture powering omnichannel web and mobile apps.',
    badge: 'Headless API',
    metric: 'API-First Content',
    color: '#8b5cf6',
    svgKey: 'strapi'
  },

  // Growth, APIs & AI
  {
    id: 'whatsapp-cloud',
    name: 'WhatsApp Business API',
    category: 'marketing_ai',
    categoryLabel: 'APIs & Automation',
    description: 'Direct Meta Cloud API integrations for automated lead qualifying bots, order notifications, and support.',
    badge: 'Meta Certified',
    metric: '98% Message Open Rate',
    color: '#25d366',
    svgKey: 'whatsapp'
  },
  {
    id: 'google-ads-analytics',
    name: 'Google Ads & GA4',
    category: 'marketing_ai',
    categoryLabel: 'Search & Analytics',
    description: 'Server-side Google Tag Manager (GTM), Google Ads conversion APIs, and predictive GA4 event tracking.',
    badge: 'ROI Tracking',
    metric: 'Precision Attribution',
    color: '#f59e0b',
    svgKey: 'google'
  }
];
