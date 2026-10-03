import { PageRoute } from '../App';
import { ToolTab } from '../components/ToolsPage';
import { SERVICES_LIST } from '../data/servicesData';

export interface PageSeoConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalPath: string;
  jsonLd: Record<string, any>;
}

export const PAGE_SEO_DATA: Record<PageRoute, (subTab?: any) => PageSeoConfig> = {
  home: () => ({
    title: 'Domain Tech Hub – Nairobi Web Engineering & Digital Agency',
    description: "Nairobi's premier engineering agency. We architect custom web apps, M-Pesa Daraja 3.0 e-commerce, technical SEO, and automated CRM business systems.",
    canonicalPath: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Domain Tech Hub',
      description: 'Nairobi digital technology agency specializing in modern web applications, e-commerce, Safaricom Daraja M-Pesa integration, and SEO.',
      url: 'https://domaintechhub.com',
      telephone: '+254118746676',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -1.286389,
        longitude: 36.817223,
      },
      priceRange: '$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
    },
  }),

  services: (serviceId?: string) => {
    if (serviceId && serviceId !== 'all') {
      const matched = SERVICES_LIST.find(s => s.id === serviceId);
      if (matched) {
        return {
          title: `${matched.title} | Pricing & Deliverables | Domain Tech Hub`,
          description: matched.shortDesc,
          canonicalPath: `/#/services/${matched.id}`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: matched.title,
            description: matched.fullDesc,
            provider: {
              '@type': 'Organization',
              name: 'Domain Tech Hub',
              url: 'https://domaintechhub.com',
            },
            areaServed: 'Kenya',
            offers: {
              '@type': 'Offer',
              price: matched.basePriceKES,
              priceCurrency: 'KES',
            },
          },
        };
      }
    }

    return {
      title: 'Engineering Services & Solutions | Domain Tech Hub',
      description: 'Explore 15+ turnkey digital services: React & mobile app development, Safaricom Daraja STK Push e-commerce, Google Ads PPC, and custom enterprise CRMs.',
      canonicalPath: '/#/services',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Software & Web Development',
        provider: {
          '@type': 'Organization',
          name: 'Domain Tech Hub',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital Engineering Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Web & Mobile Development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'M-Pesa & Payment Gateway Integrations',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Technical SEO & Conversion Optimization',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom CRM & Cloud Automation Systems',
              },
            },
          ],
        },
      },
    };
  },

  portfolio: () => ({
    title: 'Case Studies & Production ROI Impact | Domain Tech Hub',
    description: 'See how Domain Tech Hub generated over KSh 280M+ in mobile money revenue, boosted conversion rates by 4.6x, and built scalable cloud systems.',
    canonicalPath: '/#/portfolio',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Domain Tech Hub Client Case Studies & Production Impact',
      description: 'Verified engineering case studies with mobile money conversion overhauls, high-speed e-commerce stores, and enterprise portals.',
      author: {
        '@type': 'Organization',
        name: 'Domain Tech Hub',
      },
    },
  }),

  tools: (subTab?: ToolTab) => {
    if (subTab === 'audit') {
      return {
        title: 'Free Core Web Vitals & SEO Speed Audit Scanner | Domain Tech Hub',
        description: 'Instant site health diagnostics: scan your domain for mobile responsiveness, page speed metrics, Core Web Vitals, and technical SEO tags.',
        canonicalPath: '/#/tools/audit',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Core Web Vitals & Live SEO Audit Scanner',
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'All',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      };
    }

    if (subTab === 'domains') {
      return {
        title: '.co.ke Domain Registration & NVMe Cloud Hosting | Domain Tech Hub',
        description: 'Instant .ke domain lookup and high-speed NVMe SSD cloud hosting configurations with 99.9% uptime SLA and automated daily backups.',
        canonicalPath: '/#/tools/domains',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: '.co.ke Domain Registration & Hosting Checker',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
        },
      };
    }

    return {
      title: 'Project Cost & Scope Estimator (USD & KES) | Domain Tech Hub',
      description: 'Transparent scope planning: select custom features, cloud architecture, and get real-time price and timeline estimates in USD and KES.',
      canonicalPath: '/#/tools/calculator',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Project Cost & Scope Calculator',
        applicationCategory: 'FinancialApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    };
  },

  insights: () => ({
    title: 'Engineering Insights, Fintech & Digital Trends | Domain Tech Hub',
    description: 'Deep-dive architectural teardowns, African mobile money optimization playbooks, and conversion engineering insights authored by our Nairobi team.',
    canonicalPath: '/#/insights',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Domain Tech Hub Engineering Insights & Regional Trends',
      description: 'Technical teardowns, payment gateway architectures, and conversion rate benchmarks for African and global digital ecosystems.',
    },
  }),

  portal: () => ({
    title: 'Interactive Client Portal & Staging Tracker | Domain Tech Hub',
    description: 'Experience real-time milestone tracking, live staging review links, Safaricom Daraja webhook simulators, and SLA monitoring.',
    canonicalPath: '/#/portal',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Domain Tech Hub Client Transparency Portal',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
    },
  }),

  faq: () => ({
    title: 'Frequently Asked Questions & Pricing Tiers | Domain Tech Hub',
    description: 'Answers to questions on development sprint timelines, M-Pesa integration security, code repository ownership, and monthly SLA retainers.',
    canonicalPath: '/#/faq',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does a custom web application take to build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typical production timelines range from 2 to 6 weeks depending on system scope, API integrations, and review cycles.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you handle M-Pesa Daraja 3.0 payments?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We integrate official Safaricom Daraja 3.0 APIs with automated STK Push, reconciliation webhooks, and fallback payment options.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who owns the intellectual property and code repository?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You maintain 100% intellectual property ownership upon completion. Complete source code and deployment keys are transferred to your repository.',
          },
        },
      ],
    },
  }),

  contact: () => ({
    title: 'Book Strategy Consultation & Discovery Call | Domain Tech Hub',
    description: 'Schedule a 30-minute discovery consultation with senior digital strategists in Nairobi, or reach our engineering hotline directly on WhatsApp.',
    canonicalPath: '/#/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Book Strategy Session with Domain Tech Hub',
      description: 'Complimentary 30-minute technical discovery session for ambitious businesses planning web, e-commerce, or custom software projects.',
    },
  }),
};

/**
 * Injects meta tags, title, canonical URL, and Schema.org JSON-LD dynamically into the document head.
 */
export function applyPageSeo(route: PageRoute, subTab?: string) {
  if (typeof document === 'undefined') return;

  const configGetter = PAGE_SEO_DATA[route] || PAGE_SEO_DATA.home;
  const config = configGetter(subTab);

  // 1. Update Document Title
  document.title = config.title;

  // 2. Helper to set or create meta tags
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attributeName = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attributeName}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Update Standard Meta Description
  setMeta('description', config.description);

  // 4. Update OpenGraph Tags
  setMeta('og:title', config.ogTitle || config.title, true);
  setMeta('og:description', config.ogDescription || config.description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:site_name', 'Domain Tech Hub', true);

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const fullUrl = `${origin}${config.canonicalPath}`;
    setMeta('og:url', fullUrl, true);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }

  // 5. Update Twitter Cards
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', config.title);
  setMeta('twitter:description', config.description);

  // 6. Update Schema.org JSON-LD Structured Data
  let scriptTag = document.getElementById('dth-schema-jsonld') as HTMLScriptElement | null;
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'dth-schema-jsonld';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  scriptTag.textContent = JSON.stringify(config.jsonLd, null, 2);
}
