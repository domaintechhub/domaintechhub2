import { CaseStudy } from '../types';
import solarGridImg from '../assets/images/commercial_solar_grid_kenya_1791048420279.webp';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'savannah-crafts-ecommerce',
    title: 'Savannah Crafts: Modern E-Commerce & M-Pesa Checkout',
    client: 'Savannah Artisan Goods',
    category: 'E-Commerce',
    location: 'Nairobi, Kenya',
    estimatedTimeline: '3.5 Weeks Delivery',
    timelineBreakdown: [
      'Week 1: UX Wireframes & Product Catalog Taxonomy',
      'Week 2: Next.js Frontend & Cart State Architecture',
      'Week 3: Safaricom M-Pesa Daraja STK Push Integration',
      'Week 4: End-to-End Payment QA & Production Cutover'
    ],
    summary: 'Architected a lightning-fast custom e-commerce storefront with automated M-Pesa STK Push and DHL international shipping calculator, driving a 310% surge in monthly sales.',
    metrics: [
      { label: 'Online Sales Growth', value: '+310%' },
      { label: 'Mobile PageSpeed', value: '98/100' },
      { label: 'Checkout Drop-off', value: '-64%' }
    ],
    challenge: 'The client was losing 70% of potential buyers due to a slow, generic WooCommerce template that lacked native mobile M-Pesa payments and crashed during holiday marketing flash sales.',
    solution: 'Engineered a headless storefront with Next.js, Tailwind CSS, and direct M-Pesa Daraja API + Stripe integration. Implemented real-time inventory caching and automated WhatsApp dispatch updates.',
    techStack: ['Next.js', 'Tailwind CSS', 'M-Pesa API', 'PostgreSQL', 'Cloudflare'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    testimonial: {
      quote: 'Domain Tech Hub overhauled our entire digital store in under 4 weeks. The automated M-Pesa checkout immediately transformed our conversion rate from 1.2% to 4.8%. Remarkable execution!',
      author: 'Amina Muthoni',
      role: 'Managing Director, Savannah Artisans'
    }
  },
  {
    id: 'apex-legal-seo-growth',
    title: 'Apex Law Advocates: Local SEO & Corporate Identity',
    client: 'Apex Advocates LLP',
    category: 'SEO & Marketing',
    location: 'Upper Hill, Nairobi',
    estimatedTimeline: '4 Weeks to Launch (90-Day Ranking Growth)',
    timelineBreakdown: [
      'Week 1: Technical SEO & Competitor Keyword Audit',
      'Week 2: Corporate Site Architecture & Schema JSON-LD',
      'Week 3: High-Authority Legal Practice Guide Publishing',
      'Week 4: Google Business Profile & Local Citation Blast'
    ],
    summary: 'Propelled a boutique commercial litigation firm to #1 on Google for high-intent legal keywords across Kenya, generating 45+ qualified corporate inquiries every month.',
    metrics: [
      { label: 'Page 1 Keyword Rankings', value: '28 Keywords' },
      { label: 'Monthly Corporate Leads', value: '45+ Leads' },
      { label: 'Organic Search Traffic', value: '+420%' }
    ],
    challenge: 'Despite 15 years of legal excellence, Apex Advocates was virtually invisible online, buried on Page 4 of Google behind newer competitors with inferior credentials.',
    solution: 'Executed an aggressive 90-day technical SEO overhaul: restructured site architecture with schema markup, created 30 high-authority legal practice guides, optimized Google Business Profile, and built local citations.',
    techStack: ['Technical SEO', 'Schema JSON-LD', 'Google Business Profile', 'React', 'Ahrefs'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    testimonial: {
      quote: 'Within 3 months of Domain Tech Hub’s SEO campaign, our phones began ringing daily with commercial inquiries from multinational firms. They are by far the sharpest digital partners in East Africa.',
      author: 'David Kimani',
      role: 'Senior Partner, Apex Advocates LLP'
    }
  },
  {
    id: 'finpulse-crm-automation',
    title: 'FinPulse Capital: Custom Loan & Lead Pipeline CRM',
    client: 'FinPulse Micro-Finance',
    category: 'CRM & Software',
    location: 'Westlands, Nairobi',
    estimatedTimeline: '6 Weeks Phased Sprints',
    timelineBreakdown: [
      'Weeks 1-2: Underwriting Workflow Audit & Database Schema',
      'Weeks 3-4: Core Web CRM Engine & Role Permissions',
      'Week 5: Automated Credit Risk Calculator & SMS Alerts',
      'Week 6: Officer Training, Security Hardening & Cutover'
    ],
    summary: 'Engineered a bespoke web CRM that replaced messy spreadsheets with an automated underwriting pipeline, reducing loan approval turnaround from 48 hours to 35 minutes.',
    metrics: [
      { label: 'Processing Time Reduced', value: '85%' },
      { label: 'Active Monthly Deals', value: '1,800+' },
      { label: 'Team Hours Saved / Wk', value: '60 hrs' }
    ],
    challenge: 'FinPulse was processing credit applications across 12 branch officers using manual Excel sheets, causing lost documents, delayed approvals, and zero central accountability.',
    solution: 'Designed and deployed a secure, role-based CRM with instant document upload, automated credit risk scoring, SMS & WhatsApp borrower notifications, and real-time branch performance analytics.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'SMS Gateway'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    testimonial: {
      quote: 'Our team went from feeling overwhelmed with paperwork to managing 100+ deals a day smoothly. Domain Tech Hub built software that directly fits how Kenyan businesses operate.',
      author: 'Brian Omondi',
      role: 'Chief Operating Officer, FinPulse'
    }
  },
  {
    id: 'mara-wild-expeditions',
    title: 'Mara Wild Expeditions: Luxury Safari Booking Portal',
    client: 'Mara Wild Tours Ltd',
    category: 'Web & Mobile',
    location: 'Nairobi & Maasai Mara',
    estimatedTimeline: '4 Weeks Expedited Sprint',
    timelineBreakdown: [
      'Week 1: High-Resolution Safari Itinerary Wireframes',
      'Week 2: Interactive Pricing & Multi-Currency Engine',
      'Week 3: WhatsApp Live Concierge & Stripe Checkout',
      'Week 4: Global Speed CDN Optimization & Deployment'
    ],
    summary: 'Built an interactive, visually stunning safari itinerary builder with multi-currency booking, live lodge availability, and WhatsApp agent live chat.',
    metrics: [
      { label: 'Direct Bookings Increase', value: '+185%' },
      { label: 'Average Time on Site', value: '5m 42s' },
      { label: 'International Inquiries', value: '3.4x' }
    ],
    challenge: 'The agency relied on third-party OTAs that charged 22% commissions, while their existing website was slow and difficult for American and European travelers to navigate on phones.',
    solution: 'Created an immersive, ultra-responsive website with 4K video backgrounds, custom interactive safari itinerary customizer, instant live quotation, and WhatsApp concierge widget.',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'WhatsApp Business API', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    testimonial: {
      quote: 'Our direct international bookings doubled in our first high season after launch. Travelers constantly compliment how intuitive and breathtaking the website is.',
      author: 'Sarah Chebet',
      role: 'Founder & Head of Operations, Mara Wild'
    }
  },
  {
    id: 'solarpower-kenya-ppc',
    title: 'SolarGrid Kenya: Commercial Solar Lead Gen with Google Ads',
    client: 'SolarGrid Technologies',
    category: 'Digital Marketing',
    location: 'Industrial Area, Nairobi',
    estimatedTimeline: '2 Weeks to Live Launch',
    timelineBreakdown: [
      'Days 1-4: Commercial Competitor & Search Term Audit',
      'Days 5-8: High-Converting Industrial Landing Page Build',
      'Days 9-11: Negative Keyword Guardrails & Conversion APIs',
      'Days 12-14: Google Search Ads Campaign Activation'
    ],
    summary: 'Deployed high-intent Google Search PPC and WhatsApp lead funnels that generated 120+ commercial factory solar installation inquiries at a $14 Cost Per Lead.',
    metrics: [
      { label: 'Cost Per Lead (CPL)', value: '$14.20' },
      { label: 'Closed Deal Pipeline', value: '$420,000' },
      { label: 'Ad ROI (ROAS)', value: '6.2x' }
    ],
    challenge: 'Commercial solar systems have high price points ($15k - $100k). Previous ad agencies generated thousands of clicks from residential homeowners wanting small bulbs, burning budget.',
    solution: 'Restructured Google Ads with strict commercial negative keyword filtering, B2B company size qualifiers, and custom industrial landing pages with an interactive Solar Savings Calculator.',
    techStack: ['Google Ads', 'Google Tag Manager', 'Looker Studio', 'Conversion Rate Optimization'],
    image: solarGridImg,
    testimonial: {
      quote: 'Domain Tech Hub eliminated our wasted ad spend on day one. Every lead that lands in our inbox now is a bona fide factory owner or commercial real estate manager.',
      author: 'Eng. Patrick Mwangi',
      role: 'Commercial Director, SolarGrid Kenya'
    }
  },
  {
    id: 'kazi-hub-branding',
    title: 'KaziWorks Co-Working: Full Brand Identity & Wayfinding',
    client: 'KaziWorks Innovation Campus',
    category: 'Branding & Design',
    location: 'Kilimani, Nairobi',
    estimatedTimeline: '3 Weeks Delivery',
    timelineBreakdown: [
      'Week 1: Visual Research, Moodboards & Logo Directions',
      'Week 2: Color Palette, Typography & 20-Page Brand Guide',
      'Week 3: Signage Vector Prints & Launch Web Presentation'
    ],
    summary: 'Developed the complete visual identity, typography system, digital signage, website UI, and launch marketing collateral for Nairobi’s newest creative workspace.',
    metrics: [
      { label: 'Opening Occupancy', value: '92%' },
      { label: 'Social Engagement Rate', value: '8.4%' },
      { label: 'Brand Assets Delivered', value: '45+ Items' }
    ],
    challenge: 'Entering a crowded co-working market in Nairobi required a fresh, aspirational, yet authentically African visual language that resonated with tech founders and creatives.',
    solution: 'Designed a bold typographic identity with earthy terracotta and vibrant electric cyan accents, full stationery suite, interior wall vinyl graphics, and responsive membership portal.',
    techStack: ['Brand Strategy', 'Figma', 'Adobe Illustrator', 'Design System', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    testimonial: {
      quote: 'Domain Tech Hub gave KaziWorks an identity that feels world-class while remaining deeply rooted in our community. Members constantly photograph our branded spaces!',
      author: 'Wanjiku Ndung’u',
      role: 'Community Lead, KaziWorks'
    }
  }
];

export const AGENCY_INFO = {
  name: 'Domain Tech Hub',
  tagline: 'Your Strategic Digital Technology & Growth Partner',
  description: 'Empowering businesses across Kenya, East Africa, and globally with cutting-edge web development, e-commerce, high-ROI digital marketing, custom software, and corporate branding.',
  email: 'info@domaintechhub.com',
  secondaryEmail: 'domaintechhub@gmail.com',
  phones: ['+254 118746676', '+254 706 943383'],
  whatsapp: '254118746676',
  address: 'Nairobi, Kenya',
  officeHours: 'Monday – Friday: 8:00 AM – 5:00 PM (EAT)',
  socials: {
    instagram: 'https://www.instagram.com/domain_tech_hub/',
    tiktok: 'https://www.tiktok.com/@domaintechhub',
    facebook: 'https://web.facebook.com/profile.php?id=61589542515206&_rdc=1&_rdr#',
    x: 'https://x.com/DomainTechhub',
    linkedin: 'https://www.linkedin.com/in/domain-techhub-2a7596433/'
  },
  stats: [
    { label: 'Projects Completed', value: '65+' },
    { label: 'Happy Clients', value: '42+' },
    { label: 'Client Retention Rate', value: '98%' },
    { label: 'Average ROI Multiplier', value: '4.6x' }
  ]
};
