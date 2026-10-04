export interface DynamicHeroIntent {
  intentKey: string;
  matchedTerm?: string;
  studioBadge: string;
  title1: string;
  titleHighlight: string;
  title2: string;
  description: string;
  primaryButtonText: string;
  primaryButtonTarget: 'calculator' | 'audit' | 'roi' | 'services' | 'contact';
  calculatorPreselect?: string;
}

export const DEFAULT_HERO_INTENT: DynamicHeroIntent = {
  intentKey: 'default',
  studioBadge: 'Nairobi Studio & Digital Engineering',
  title1: 'Engineering',
  titleHighlight: 'High-Converting',
  title2: 'Websites & Bespoke Web Apps.',
  description: 'We are an independent engineering studio in Nairobi crafting fast, custom websites, frictionless M-Pesa checkouts, and resilient web applications for growing brands.',
  primaryButtonText: 'Estimate Project Cost',
  primaryButtonTarget: 'calculator',
  calculatorPreselect: 'web-development'
};

const INTENT_PRESETS: {
  key: string;
  patterns: (string | RegExp)[];
  data: Omit<DynamicHeroIntent, 'intentKey' | 'matchedTerm'>;
}[] = [
  // 1. E-Commerce & Safaricom Daraja M-Pesa
  {
    key: 'ecommerce',
    patterns: [
      /e-?commerce/i,
      /m-?pesa/i,
      /daraja/i,
      /stk\s*push/i,
      /online\s*store/i,
      /online\s*shop/i,
      /checkout/i,
      /retail\s*store/i,
      /lipa\s*na\s*m-?pesa/i,
      /paybill/i,
      /buy\s*goods/i,
      /woocommerce/i,
      /shopify/i,
      /pesapal/i,
      /payment\s*gateway/i
    ],
    data: {
      studioBadge: 'Nairobi E-Commerce & M-Pesa Engineering Studio',
      title1: 'Engineering',
      titleHighlight: 'High-Converting M-Pesa Stores',
      title2: '& Fast E-Commerce Platforms.',
      description: 'We are an independent engineering studio in Nairobi architecting zero-loss Safaricom Daraja 3.0 M-Pesa checkouts, automated reconciliation webhooks, and sub-second online stores that turn visitors into loyal buyers.',
      primaryButtonText: 'Estimate E-Commerce Store',
      primaryButtonTarget: 'calculator',
      calculatorPreselect: 'ecommerce-development'
    }
  },

  // 2. Technical SEO & Search Engine Optimization
  {
    key: 'seo',
    patterns: [
      /\bseo\b/i,
      /search\s*engine/i,
      /google\s*rank/i,
      /rank\s*#?1/i,
      /organic\s*traffic/i,
      /search\s*optimization/i,
      /\baeo\b/i,
      /\bgeo\b/i,
      /schema\.?org/i,
      /core\s*web\s*vitals/i,
      /google\s*search/i
    ],
    data: {
      studioBadge: 'Nairobi Technical SEO & Search Optimization Studio',
      title1: 'Engineering',
      titleHighlight: '#1 Google Rankings',
      title2: '& High-Intent Organic Traffic Systems.',
      description: 'We are an independent engineering studio in Nairobi deploying semantic Schema.org structured data, Core Web Vitals speed tuning, and high-intent technical SEO that positions your business at the top of Google.',
      primaryButtonText: 'Run Free SEO Speed Audit',
      primaryButtonTarget: 'audit',
      calculatorPreselect: 'seo-services'
    }
  },

  // 3. Digital Marketing, Google Ads & PPC
  {
    key: 'marketing',
    patterns: [
      /google\s*ads/i,
      /ppc/i,
      /adwords/i,
      /digital\s*marketing/i,
      /lead\s*generation/i,
      /meta\s*ads/i,
      /facebook\s*ads/i,
      /conversion\s*rate/i,
      /\bcro\b/i,
      /ad\s*spend/i,
      /paid\s*ads/i
    ],
    data: {
      studioBadge: 'Nairobi High-ROI Digital Marketing & Growth Studio',
      title1: 'Engineering',
      titleHighlight: 'High-ROI Google Ads',
      title2: '& Automated Customer Acquisition Funnels.',
      description: 'We are an independent engineering studio in Nairobi orchestrating data-driven Google Search campaigns, server-side GA4 tracking, and high-converting landing pages that deliver an average 4.6x verified ad spend ROI.',
      primaryButtonText: 'Simulate Marketing ROI',
      primaryButtonTarget: 'roi',
      calculatorPreselect: 'digital-marketing'
    }
  },

  // 4. Custom Enterprise Software, CRM & ERP
  {
    key: 'crm',
    patterns: [
      /\bcrm\b/i,
      /\berp\b/i,
      /custom\s*software/i,
      /cloud\s*crm/i,
      /spreadsheets/i,
      /excel\s*replacement/i,
      /management\s*system/i,
      /portal/i,
      /internal\s*tool/i,
      /postgresql/i,
      /inventory\s*system/i,
      /workflow\s*automation/i
    ],
    data: {
      studioBadge: 'Nairobi Enterprise Software & Custom Cloud CRMs',
      title1: 'Engineering',
      titleHighlight: 'Custom Cloud CRMs',
      title2: '& Mission-Critical Business Systems.',
      description: 'We are an independent engineering studio in Nairobi replacing fragmented spreadsheets with secure PostgreSQL cloud CRMs, multi-tenant role permissions, and automated business workflows.',
      primaryButtonText: 'Estimate Custom Software',
      primaryButtonTarget: 'calculator',
      calculatorPreselect: 'custom-crm-development'
    }
  },

  // 5. Corporate Branding, Logo & UI/UX Design
  {
    key: 'branding',
    patterns: [
      /brand/i,
      /logo/i,
      /graphic\s*design/i,
      /ui\s*\/\s*ux/i,
      /ui\/ux/i,
      /figma/i,
      /brand\s*identity/i,
      /design\s*system/i,
      /corporate\s*identity/i
    ],
    data: {
      studioBadge: 'Nairobi Brand Identity & UI/UX Design Studio',
      title1: 'Engineering',
      titleHighlight: 'Distinctive Brand Identities',
      title2: '& High-Converting Design Systems.',
      description: 'We are an independent engineering studio in Nairobi creating memorable brand identities, Figma component design tokens, and digital brand experiences that inspire instant trust.',
      primaryButtonText: 'Estimate Branding Project',
      primaryButtonTarget: 'calculator',
      calculatorPreselect: 'graphic-design-branding'
    }
  },

  // 6. WhatsApp Sales Automation & Bots
  {
    key: 'whatsapp',
    patterns: [
      /whatsapp/i,
      /whatsapp\s*bot/i,
      /sales\s*bot/i,
      /chat\s*bot/i,
      /meta\s*cloud\s*api/i,
      /conversational/i,
      /sms\s*gateway/i
    ],
    data: {
      studioBadge: 'Nairobi WhatsApp Cloud API & Sales Automation Studio',
      title1: 'Engineering',
      titleHighlight: 'Official WhatsApp Sales Bots',
      title2: '& Automated Lead Pipelines.',
      description: 'We are an independent engineering studio in Nairobi building official Meta WhatsApp Cloud API qualification bots, multi-channel lead funnels, and CRM synchronizations that close deals 24/7.',
      primaryButtonText: 'Explore WhatsApp Bots',
      primaryButtonTarget: 'roi',
      calculatorPreselect: 'whatsapp-marketing'
    }
  },

  // 7. Mobile App Development
  {
    key: 'mobile',
    patterns: [
      /mobile\s*app/i,
      /android/i,
      /ios\s*app/i,
      /react\s*native/i,
      /flutter/i,
      /app\s*development/i
    ],
    data: {
      studioBadge: 'Nairobi Mobile App & Hybrid Development Studio',
      title1: 'Engineering',
      titleHighlight: 'Native-Grade Mobile Apps',
      title2: '& Cross-Platform Digital Systems.',
      description: 'We are an independent engineering studio in Nairobi building intuitive iOS and Android mobile applications with offline sync, biometrics, and Safaricom M-Pesa mobile SDK integration.',
      primaryButtonText: 'Estimate Mobile App',
      primaryButtonTarget: 'calculator',
      calculatorPreselect: 'mobile-app-development'
    }
  },

  // 8. Website Maintenance & Cloud Security
  {
    key: 'maintenance',
    patterns: [
      /maintenance/i,
      /support/i,
      /website\s*care/i,
      /sla/i,
      /security/i,
      /hosting/i,
      /cloudflare/i,
      /hacked/i,
      /backup/i
    ],
    data: {
      studioBadge: 'Nairobi Cloud Infrastructure & 24/7 SLA Maintenance',
      title1: 'Engineering',
      titleHighlight: 'Zero-Downtime Infrastructure',
      title2: '& 24/7 Security Maintenance.',
      description: 'We are an independent engineering studio in Nairobi safeguarding mission-critical web applications with Cloudflare edge security, automated daily backups, and rapid-response SLA retainers.',
      primaryButtonText: 'Explore SLA Retainers',
      primaryButtonTarget: 'calculator',
      calculatorPreselect: 'website-maintenance'
    }
  },

  // 9. Web Design & Custom Web Development (Standard match)
  {
    key: 'webdev',
    patterns: [
      /web\s*design/i,
      /website/i,
      /web\s*development/i,
      /web\s*developer/i,
      /redesign/i,
      /landing\s*page/i,
      /next\.?js/i,
      /react/i,
      /frontend/i,
      /responsive/i,
      /corporate\s*website/i,
      /business\s*website/i
    ],
    data: {
      studioBadge: 'Nairobi Web Design & Full-Stack Development Studio',
      title1: 'Engineering',
      titleHighlight: 'Sub-Second Websites',
      title2: '& High-Performing Web Apps.',
      description: 'We are an independent engineering studio in Nairobi crafting fast, custom websites, sub-second Core Web Vitals, and resilient web applications tailored to your exact industry requirements.',
      primaryButtonText: 'Estimate Website Cost',
      primaryButtonTarget: 'calculator',
      calculatorPreselect: 'web-development'
    }
  }
];

function cleanSearchTerm(term: string): string {
  return term
    .replace(/[+_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^(looking for|i want|need|best|cheap|affordable|top)\s+/i, '')
    .replace(/\s+(in kenya|in nairobi|kenya|nairobi)$/i, '')
    .trim();
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

/**
 * Detects the search intent from an explicit query string, or automatically from
 * window.location.search, window.location.hash, or referrer search queries.
 */
export function detectDynamicIntent(explicitQuery?: string): DynamicHeroIntent {
  let query = explicitQuery;

  // If no explicit query provided, inspect window location (URL parameters & hash)
  if (!query && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    query = urlParams.get('q') || 
            urlParams.get('service') || 
            urlParams.get('utm_term') || 
            urlParams.get('query') || 
            urlParams.get('search') || 
            urlParams.get('intent') || 
            urlParams.get('s') || 
            urlParams.get('keyword') ||
            undefined;

    // Check hash parameters if query not found in search
    if (!query && window.location.hash) {
      const hash = window.location.hash;
      const qMatch = hash.match(/[?&#](q|service|utm_term|search|intent)=([^&]+)/i);
      if (qMatch && qMatch[2]) {
        try {
          query = decodeURIComponent(qMatch[2].replace(/\+/g, ' '));
        } catch {
          query = qMatch[2];
        }
      }
    }

    // Check stored intent in sessionStorage if present
    if (!query) {
      const saved = sessionStorage.getItem('dth_search_intent');
      if (saved) query = saved;
    }
  }

  if (!query || !query.trim()) {
    return DEFAULT_HERO_INTENT;
  }

  const clean = cleanSearchTerm(query);
  if (!clean || clean.length < 2) {
    return DEFAULT_HERO_INTENT;
  }

  // 1. Try matching against predefined domain presets
  for (const preset of INTENT_PRESETS) {
    for (const pattern of preset.patterns) {
      if (typeof pattern === 'string') {
        if (clean.toLowerCase().includes(pattern.toLowerCase())) {
          return {
            ...preset.data,
            intentKey: preset.key,
            matchedTerm: clean
          };
        }
      } else if (pattern.test(clean)) {
        return {
          ...preset.data,
          intentKey: preset.key,
          matchedTerm: clean
        };
      }
    }
  }

  // 2. If it's a specific contextual search (e.g. "Law Firm", "Hospital Management", "Real Estate Portal")
  const titleCased = toTitleCase(clean);
  return {
    intentKey: `custom-${clean.toLowerCase().replace(/\s+/g, '-')}`,
    matchedTerm: titleCased,
    studioBadge: `Nairobi Studio · ${titleCased} Engineering`,
    title1: 'Engineering',
    titleHighlight: `High-Converting ${titleCased}`,
    title2: 'Websites & Bespoke Digital Systems.',
    description: `We are an independent engineering studio in Nairobi crafting fast, custom digital platforms, frictionless M-Pesa checkouts, and resilient architectures specifically tailored for ${clean.toLowerCase()}.`,
    primaryButtonText: `Estimate ${titleCased} Cost`,
    primaryButtonTarget: 'calculator',
    calculatorPreselect: 'web-development'
  };
}
