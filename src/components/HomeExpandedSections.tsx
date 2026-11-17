import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Code2,
  Palette,
  Search,
  ShoppingBag,
  Smartphone,
  Megaphone,
  Server,
  CheckCircle2,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
} from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';

export interface HomeSectionNavProps {
  onNavigate: (target: string, subParam?: string) => void;
  onSelectForQuote: (serviceId: string) => void;
  onBookService?: (serviceName: string) => void;
  onSelectTechForProject?: (techName: string) => void;
}

/* ============================================================================
 * BAND 1: AGENCY CAPABILITIES, SOLUTIONS & WHY CHOOSE US
 * ============================================================================ */
export const HomeCapabilitiesAndWhyUsBand: React.FC<HomeSectionNavProps> = ({
  onNavigate,
  onSelectForQuote,
}) => {
  const coreServiceCards = [
    { title: 'Web Design', serviceId: 'web-development', icon: Globe, desc: 'Conversion-focused UI/UX & responsive corporate websites.' },
    { title: 'Branding', serviceId: 'graphic-design-branding', icon: Palette, desc: 'Logos, brand guidelines, pitch decks & digital identity.' },
    { title: 'SEO', serviceId: 'seo-services', icon: Search, desc: 'Technical SEO, Core Web Vitals & local Nairobi rankings.' },
    { title: 'E-Commerce', serviceId: 'ecommerce-development', icon: ShoppingBag, desc: 'M-Pesa STK Push, WooCommerce, Shopify & custom storefronts.' },
    { title: 'Mobile Apps', serviceId: 'mobile-app-development', icon: Smartphone, desc: 'Native iOS, Android & React Native business applications.' },
    { title: 'Software Dev', serviceId: 'custom-crm-development', icon: Code2, desc: 'Bespoke ERPs, KRA eTIMS billing, CRMs & internal portals.' },
    { title: 'Digital Marketing', serviceId: 'digital-marketing', icon: Megaphone, desc: 'Google Ads, Meta lead funnels & WhatsApp automation.' },
    { title: 'Web Hosting', serviceId: 'website-maintenance', icon: Server, desc: 'Managed NVMe cloud hosting, SSL & .co.ke domains.' },
  ];

  const digitalSolutionsList = [
    { title: 'Custom Website Design & Development', desc: 'Hand-crafted React, Next.js, and modern HTML/CSS web platforms engineered for brand authority and speed.', serviceId: 'web-development' },
    { title: 'E-Commerce with M-Pesa & Card Payments', desc: 'Frictionless Daraja 3.0 STK Push, Paybill, Pesapal, Flutterwave, and card checkout flows.', serviceId: 'ecommerce-development' },
    { title: 'SEO & Digital Marketing', desc: 'Search architecture, JSON-LD structured data, and ROI-tracked paid acquisition campaigns across Kenya.', serviceId: 'seo-services' },
    { title: 'Web Hosting & Domain Registration', desc: 'Fast Kenya & global edge CDN deployment, .co.ke domain setup, automated backups, and 99.9% uptime SLA.', serviceId: 'website-maintenance' },
    { title: 'Branding & Graphic Design', desc: 'Cohesive logos, typography systems, marketing collateral, and conversion-focused UI design systems.', serviceId: 'graphic-design-branding' },
    { title: 'Custom Software & Mobile Apps', desc: 'Full-stack portals, SaaS dashboards, POS terminals, and Android/iOS mobile solutions built to scale.', serviceId: 'mobile-app-development' },
  ];

  const hireCapabilities = [
    { title: 'MVP build', desc: 'Rapid 4-week production launches for startups and new digital products.', serviceId: 'web-development' },
    { title: 'Shopify storefront build', desc: 'Custom Liquid themes, inventory sync, and Kenyan payment gateway integration.', serviceId: 'ecommerce-development' },
    { title: 'API & integrations', desc: 'Safaricom Daraja, KRA eTIMS OSCU/VSCU, WhatsApp Cloud API, and ERP sync.', serviceId: 'custom-crm-development' },
    { title: 'AI feature integration', desc: 'Automated customer support agents, RAG knowledge bases, and lead triage.', serviceId: 'ai-powered-solutions' },
  ];

  const engineeringStandards = [
    { title: 'Responsive Web Design (RWD)', desc: 'Fluid grid layouts that adapt cleanly across smartphones, tablets, laptops, and 4K displays.' },
    { title: 'Bootstrap Based Web Development', desc: 'Clean, accessible component architecture whether deploying Tailwind CSS, React, or Bootstrap frameworks.' },
    { title: 'Mobile-First Design', desc: 'Engineered first for Kenya’s mobile internet users on Safaricom & Airtel 4G/5G networks.' },
    { title: 'SEO Optimization', desc: 'Clean semantic heading hierarchies, canonical routing, sitemaps, and indexable SSR/pre-rendered pages.' },
    { title: 'Fast Loading Speed', desc: 'Sub-second First Contentful Paint with WebP media compression and Cloudflare edge caching.' },
    { title: 'AI Integration', desc: 'Smart workflow automation, instant quote estimators, and 24/7 WhatsApp conversational assistants.' },
  ];

  const websiteOutcomes = [
    { title: 'Websites that convert more customers.', desc: 'Clear value propositions, fast WhatsApp handoffs, and low-friction inquiry forms.' },
    { title: 'Websites that are faster at loading.', desc: 'Optimized Core Web Vitals built to keep bounce rates low on mobile connections.' },
    { title: 'Websites that are optimised for search engines.', desc: 'Structured on-page SEO and schema markup to capture high-intent local searches.' },
    { title: 'Easy to manage.', desc: 'Intuitive content management and clean dashboards so your team updates pages effortlessly.' },
    { title: 'Offer a good user experience.', desc: 'Accessible navigation, legible contrast, and logical user journeys.' },
    { title: 'Are feature packed.', desc: 'Built-in analytics, M-Pesa checkout, automated notifications, and scalable modules.' },
  ];

  const philosophyCards = [
    { title: 'We listen and learn', desc: 'Every engagement begins by mapping your business model, margins, and customer buying behavior before writing a line of code.' },
    { title: 'We create as a team', desc: 'Designers, full-stack engineers, and SEO strategists collaborate in shared weekly sprints rather than siloed handoffs.' },
    { title: 'We plan for the future', desc: 'Modular TypeScript and cloud architectures that accommodate new branches, currencies, and APIs without costly rebuilds.' },
    { title: 'Result-Oriented', desc: 'Measured by qualified enquiries, completed M-Pesa checkouts, and page-one keyword growth.' },
    { title: 'Expertise and Experience', desc: '65+ production platforms shipped across fintech, retail, real estate, logistics, and hospitality.' },
    { title: 'Client-Centered Approach', desc: 'Transparent milestone sign-offs, staging preview links, and direct Slack/WhatsApp communication.' },
    { title: 'Ongoing Support', desc: 'Post-launch monitoring, security patching, and 30 days of included SLA engineering care.' },
    { title: 'Top notch Support & Reliable Delivery', desc: 'Under-2-hour support ticket response times during East Africa business hours.' },
  ];

  return (
    <>
      {/* ── MULTI-SERVICE CAPABILITIES & DIGITAL SOLUTIONS ─────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="max-w-3xl">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c853] dark:text-[#00e676] mb-2">
              Kenya’s Web Developers for the AI Era · Custom-Coded, Multi-Service
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight text-balance mb-3">
              Kenya’s AI, Web &amp; Mobile Agency: Our Services
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              We easily build awesome websites and custom digital platforms tailored for conversion, reliability, and long-term business growth.
            </p>
          </div>

          {/* 8 Core Services Quick Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreServiceCards.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => onNavigate('services', item.serviceId)}
                  className="text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-5 h-5 text-[#00c853] dark:text-[#00e676]" />
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c853] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Our Digital Solutions (H3 + H4) */}
          <div className="pt-4 border-t border-stone-200/80 dark:border-slate-800/80">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Our Digital Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {digitalSolutionsList.map((sol) => (
                <button
                  key={sol.title}
                  type="button"
                  onClick={() => onSelectForQuote(sol.serviceId)}
                  className="text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors cursor-pointer group"
                >
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#00c853] dark:group-hover:text-[#00e676]">
                    {sol.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {sol.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* What companies hire Web Designers for + Engineering Standards + Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-stone-200/80 dark:border-slate-800/80">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                What companies hire Web Designers for
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hireCapabilities.map((cap) => (
                  <button
                    key={cap.title}
                    type="button"
                    onClick={() => onSelectForQuote(cap.serviceId)}
                    className="text-left p-4 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{cap.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{cap.desc}</p>
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  Technical Standards &amp; Responsive Design
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {engineeringStandards.map((std) => (
                    <div key={std.title} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{std.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{std.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Built for Speed, Conversion &amp; Search Visibility
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {websiteOutcomes.map((out) => (
                  <div key={out.title} className="p-4 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/80 border border-emerald-200/70 dark:border-slate-800">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{out.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{out.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US & METRICS ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c853] dark:text-[#00e676] mb-2">
              ENGINEERING CULTURE
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight text-balance mb-3">
              Why choose us?
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Top notch services backed by senior engineers, measurable business outcomes, and reliable local support in Nairobi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {philosophyCards.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ============================================================================
 * BAND 2: INDUSTRY EXPERTISE, SECTOR WORK EXAMPLES & LANDING PAGE DEMOS
 * ============================================================================ */
export const HomeIndustriesAndDemosBand: React.FC<HomeSectionNavProps> = ({
  onNavigate,
  onSelectForQuote,
  onBookService,
}) => {
  const industries = [
    { title: 'Real Estate', slug: 'real-estate-website-kenya-property-listings-lead-capture', desc: 'Property listings, neighborhood search filters & WhatsApp lead capture.' },
    { title: 'E-Commerce', slug: 'fashion-boutique-online-clothing-store-kenya', desc: 'High-converting online storefronts with automated M-Pesa checkout.' },
    { title: 'Hospitality', slug: 'restaurant-hotel-website-kenya-online-ordering-bookings', desc: 'Direct hotel bookings, restaurant digital menus & zero-commission orders.' },
    { title: 'Healthcare', slug: 'healthcare-website-development-kenya-cost-guide', desc: 'Clinic booking portals, patient directories & ODPC-compliant forms.' },
    { title: 'Education', slug: 'school-website-design-development-kenya-cost-features', desc: 'Admissions portals, parent fee tracking & academic calendars.' },
    { title: 'NGO & Nonprofit', slug: 'church-ngo-website-kenya-mpesa-donations-giving', desc: 'Donor storytelling, M-Pesa giving & automated impact reporting.' },
    { title: 'Legal', slug: 'law-firm-accounting-firm-website-kenya-client-portal', desc: 'Corporate practice authority, consultation scheduling & client vaults.' },
    { title: 'Finance & Banking', slug: 'sacco-microfinance-website-kenya-loan-portal-sasra', desc: 'SACCO calculators, member onboarding & SASRA-ready digital portals.' },
    { title: 'Construction', slug: 'bespoke-crm-vs-spreadsheets-kenya', desc: 'Project showcase portfolios, tender portals & supplier workflows.' },
  ];

  const sectorExamples = [
    { title: 'Sarit Expo Centre Showcase', desc: 'Event schedules, exhibitor registration & digital ticketing workflows.' },
    { title: 'Icon Electric Industrial', desc: 'B2B product catalogues, technical datasheets & wholesale quote capture.' },
    { title: 'Lesioi Farm Agribusiness', desc: 'Fresh produce ordering, farm-to-door logistics & wholesale B2B portals.' },
    { title: 'HR Agency', desc: 'Candidate job boards, CV intake pipelines & employer consultation forms.' },
    { title: 'NGO Portal', desc: 'Program impact hubs with transparent donor & grant tracking.' },
    { title: 'Real Estate Agency', desc: 'Multi-agent listings with interactive maps and mortgage estimators.' },
    { title: 'Detergent Manufacturer', desc: 'FMCG distributor onboarding, bulk pricing tiers & stockist maps.' },
    { title: 'Financial Consultancy', desc: 'Tax advisory booking, audit checklists & secure resource libraries.' },
    { title: 'IT Technician', desc: 'Managed IT service SLAs, support ticket intake & hardware callouts.' },
  ];

  const landingDemos = [
    'Bike Repair',
    'Coffee Shop',
    'Realtor',
    'Financial Services',
    'Fitness Coach',
    'Grocery Delivery',
    'Mechanic',
    'Juice Shop',
    'Software As A Service',
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Industry Expertise */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c853] dark:text-[#00e676] mb-2">
                SECTOR PLAYBOOKS
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Industry Expertise
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="text-sm font-bold text-[#00c853] dark:text-[#00e676] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Case Studies &amp; Success Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind) => (
              <button
                key={ind.title}
                type="button"
                onClick={() => onNavigate('insights', ind.slug)}
                className="text-left p-5 rounded-2xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#00c853] dark:group-hover:text-[#00e676]">
                    {ind.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c853]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ind.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Some Examples Of Our Work */}
        <div className="pt-6 border-t border-stone-200/80 dark:border-slate-800/80">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Some Examples Of Our Work Across Industries
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tailored architectures across corporate expos, manufacturers, agribusiness, and service firms.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectorExamples.map((ex) => (
              <div
                key={ex.title}
                className="p-4 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {ex.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ex.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Landing Page Demos */}
        <div className="pt-6 border-t border-stone-200/80 dark:border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                Landing Page Demos
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Conversion-tested landing page blueprints ready to customize for your business niche.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectForQuote('web-development')}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-[#00c853] transition-colors cursor-pointer whitespace-nowrap"
            >
              Launch Estimate Calculator →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {landingDemos.map((demo) => (
              <button
                key={demo}
                type="button"
                onClick={() =>
                  onBookService
                    ? onBookService(`${demo} Landing Page`)
                    : onSelectForQuote('web-development')
                }
                className="text-left p-4 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors cursor-pointer group"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#00c853] dark:group-hover:text-[#00e676] mb-1">
                  {demo}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
                  Request demo <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
 * BAND 3: DETAILED PROCESS LIFECYCLE & DEDICATED HIRING ROLES
 * ============================================================================ */
export const HomeProcessAndRolesBand: React.FC<HomeSectionNavProps> = ({
  onNavigate,
  onBookService,
}) => {
  const lifecycleStages = [
    { step: '01', title: 'Discovery', desc: 'Stakeholder alignment, scope requirements & business KPIs.' },
    { step: '02', title: 'Research & Strategy', desc: 'Market benchmarking, keyword architecture & user journeys.' },
    { step: '03', title: 'Content & Messaging', desc: 'Clear copywriting engineered to build trust and convert visitors.' },
    { step: '04', title: 'Wireframe & Mockups', desc: 'Interactive structural blueprints reviewed before visual styling.' },
    { step: '05', title: 'Design', desc: 'Custom brand aesthetics, typography, and accessible UI states.' },
    { step: '06', title: 'Development', desc: 'Clean TypeScript, React/Next.js frontend, backend APIs & M-Pesa.' },
    { step: '07', title: 'Testing', desc: 'Cross-device QA, security checks, Core Web Vitals & Daraja sandbox tests.' },
    { step: '08', title: 'Launch', desc: 'Zero-downtime DNS cutover, SSL, analytics & Search Console indexing.' },
    { step: '09', title: 'Training & Support', desc: 'Team walkthroughs, documentation & ongoing SLA maintenance.' },
  ];

  const howItWorks = [
    { title: 'Post your project', desc: 'Share your goals, timeline, and required integrations via our 24-hour quote form.' },
    { title: 'Meet your expert', desc: 'Connect directly with a Nairobi solutions architect, with zero middlemen or account fluff.' },
    { title: 'Launch your project', desc: 'Track weekly staging milestones until final live deployment and handover.' },
  ];

  const roleCategories = [
    {
      title: 'Development roles',
      desc: 'Full-Stack Next.js Engineers, React Frontend Specialists, Laravel/Node API Developers, Flutter & React Native Engineers.',
    },
    {
      title: 'Cross-functional roles',
      desc: 'UI/UX Product Designers, Technical SEO Strategists, Conversion Copywriters, AI Prompt & Automation Architects.',
    },
    {
      title: 'Often hired alongside',
      desc: 'Safaricom Daraja M-Pesa Integrators, KRA eTIMS Compliance Consultants, Cloudflare DevOps & Brand Identity Designers.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Our Processes */}
        <div>
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c853] dark:text-[#00e676] mb-2">
              END-TO-END METHODOLOGY
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight text-balance mb-2">
              Our processes: We always make sure to give the best.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Every project moves through nine structured engineering checkpoints from initial discovery to post-launch training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifecycleStages.map((stage) => (
              <div
                key={stage.title}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800"
              >
                <div className="text-xs font-mono font-bold text-[#00c853] dark:text-[#00e676] tabular-nums mb-1.5">
                  STAGE {stage.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works + Hire Expert Web Designers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-stone-200/80 dark:border-slate-800/80">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              How it works
            </h2>
            <div className="space-y-3">
              {howItWorks.map((item, idx) => (
                <div key={item.title} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-start gap-3">
                  <span className="text-xs font-mono font-bold text-[#00c853] tabular-nums mt-0.5">0{idx + 1}.</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{item.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Hire expert Web Designers in Kenya
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('team')}
                className="text-xs font-bold text-[#00c853] dark:text-[#00e676] hover:underline cursor-pointer text-left"
              >
                Meet the experts behind high growth companies →
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Browse related Web Designer &amp; Engineering roles in Kenya available for dedicated sprints or retainer collaboration:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {roleCategories.map((role) => (
                <button
                  key={role.title}
                  type="button"
                  onClick={() =>
                    onBookService
                      ? onBookService(role.title)
                      : onNavigate('contact')
                  }
                  className="text-left p-4 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors cursor-pointer"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{role.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{role.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
 * BAND 4: PROJECT TIERS, PRICING TRANSPARENCY & TECHNOLOGY STACK
 * ============================================================================ */
export const HomeTiersAndStackBand: React.FC<HomeSectionNavProps> = ({
  onNavigate,
  onSelectTechForProject,
}) => {
  const pricingGuarantees = [
    { title: 'Your project', desc: 'Configure deliverables and timeline transparently before committing.' },
    { title: 'The quote is the number. Nothing added on top.', desc: 'Clear fixed-scope proposals with itemized milestones and zero surprise fees.' },
    { title: 'Pay direct. 0% commission.', desc: 'Work directly with our Nairobi engineering studio without marketplace markups.' },
    { title: 'Protected milestone payments.', desc: '40% start, 30% staging sign-off, and 30% only when your site launches live.' },
  ];

  const comparisonBenchmarks = [
    { title: 'Time to shortlist', desc: '48-hour fixed architecture proposal instead of weeks sifting unvetted bids.' },
    { title: 'Client fees', desc: 'Zero platform surcharges. 100% of your budget goes directly into engineering.' },
    { title: 'Vetting', desc: 'Every build is architected and code-reviewed by senior Nairobi full-stack leads.' },
    { title: 'Scaling a team', desc: 'Easily transition from a 4-week launch into ongoing monthly feature & SEO retainers.' },
    { title: 'Payment security', desc: 'Formal service agreements, milestone sign-offs, and 100% source code ownership.' },
  ];

  const stackChips = [
    'Next.js 15',
    'React & TypeScript',
    'Tailwind CSS',
    'Node.js & Express',
    'PostgreSQL',
    'Cloudflare Edge',
    'Safaricom Daraja 3.0',
    'KRA eTIMS API',
    'WordPress Headless',
    'Shopify Liquid',
    'WhatsApp Cloud API',
    'Gemini & OpenAI RAG',
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* How Pricing Works & Agency vs Alternatives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                How Pricing Works &amp; Budget Transparency
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('calculator')}
                className="text-xs font-bold text-[#00c853] dark:text-[#00e676] hover:underline cursor-pointer whitespace-nowrap"
              >
                Estimate your budget →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {pricingGuarantees.map((g) => (
                <div key={g.title} className="p-4 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{g.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Dedicated Agency vs. Freelance Marketplaces
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {comparisonBenchmarks.map((b) => (
                <div key={b.title} className="p-4 rounded-xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{b.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Technology Stack */}
        <div className="pt-6 border-t border-stone-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                Our Technology Stack
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Production-proven modern tools selected for speed, security, and East African payment ecosystems.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tech-stack')}
              className="text-xs font-bold text-[#00c853] dark:text-[#00e676] hover:underline cursor-pointer whitespace-nowrap text-left"
            >
              Explore Full Stack Architecture →
            </button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {stackChips.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() =>
                  onSelectTechForProject
                    ? onSelectTechForProject(tech)
                    : onNavigate('tech-stack')
                }
                className="px-3.5 py-2 rounded-xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
 * BAND 5: NAIROBI DIGITAL LANDSCAPE GUIDE & LATEST FROM OUR BLOG
 * ============================================================================ */
export const HomeEditorialAndBlogBand: React.FC<HomeSectionNavProps> = ({
  onNavigate,
}) => {
  const nairobiGuideTopics = [
    { title: 'Introduction to Website Design in Nairobi', desc: 'Why modern responsive architecture separates market leaders from stagnant brochure sites.' },
    { title: 'The Growing Digital Landscape in Kenya', desc: 'Over 80% mobile smartphone adoption and instant M-Pesa commerce demand fast web experiences.' },
    { title: 'Why Every Business Needs a Website Today', desc: 'Own your customer funnel, Google Search visibility, and credibility beyond rented social algorithms.' },
    { title: 'Who is Domain Tech Hub?', desc: 'Nairobi’s multi-disciplinary engineering studio combining web development, AI automation, and SEO.' },
    { title: 'Website Design Trends in Nairobi (2025–2026)', desc: 'Edge SSR speed, dark/light theme parity, instant STK Push checkout, and conversational AI.' },
    { title: 'How to Choose the Right Website Designer', desc: 'Verify live portfolios, insist on 100% source code ownership, and prioritize measurable SEO foundations.' },
    { title: 'Benefits of Hiring Domain Tech Hub', desc: 'Transparent KSh pricing, direct Westlands engineers, M-Pesa/eTIMS expertise & fast support.' },
    { title: 'Serving Clients Across Kenya & East Africa', desc: 'Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Kampala, Kigali & Dar es Salaam.' },
  ];

  const latestBlogPosts = [
    {
      title: 'How to Register a .co.ke Domain Name: Complete Kenya Guide',
      slug: 'getting-your-business-online-in-kenya-complete-guide',
      category: 'Domains & Infrastructure',
    },
    {
      title: 'Top 10 Web Design Trends for Kenyan Businesses in 2026 - 2027',
      slug: 'website-design-in-kenya-business-guide-2026',
      category: 'Web Architecture',
    },
    {
      title: 'Headless Next.js & Modern Cloud CMS Architecture',
      slug: 'headless-nextjs-vs-wordpress-kenya',
      category: 'Modern Engineering',
    },
    {
      title: 'How to Accept Online Payments on Your Website in Africa',
      slug: 'pesapal-vs-flutterwave-vs-dpo-vs-paystack-kenya',
      category: 'Fintech & M-Pesa',
    },
    {
      title: 'How To Promote Your Business Online in Africa',
      slug: 'local-seo-core-web-vitals-nairobi-kenya',
      category: 'Growth & SEO',
    },
    {
      title: 'Perfecting Navigation & Improve Your Web Design',
      slug: 'what-makes-a-good-website-essential-elements-kenya',
      category: 'UX & Conversion',
    },
    {
      title: 'E-Commerce Design Trends & Improve Your Sales',
      slug: 'e-commerce-website-cost-in-kenya-woocommerce-vs-shopify-custom',
      category: 'E-Commerce',
    },
    {
      title: 'Increase Website Traffic & Free SEO Blueprint',
      slug: 'should-i-pay-for-seo-services-in-kenya-cost-roi',
      category: 'Technical SEO',
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Nairobi Landscape Guide */}
        <div>
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c853] dark:text-[#00e676] mb-2">
              DIGITAL STRATEGY OVERVIEW
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight text-balance mb-2">
              The Best Website Designer in Nairobi, Kenya: Local Market Insights
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              What Kenyan founders and marketing teams need to know before commissioning a high-growth web platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nairobiGuideTopics.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest from Our Blog */}
        <div className="pt-6 border-t border-stone-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c853] dark:text-[#00e676] mb-2">
                ENGINEERING INSIGHTS &amp; GUIDES
              </p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Latest from Our Blog
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('insights')}
              className="text-sm font-bold text-[#00c853] dark:text-[#00e676] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Browse All 80+ Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestBlogPosts.map((post) => (
              <button
                key={post.title}
                type="button"
                onClick={() => onNavigate('insights', post.slug)}
                className="text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-[#00c853] dark:group-hover:text-[#00e676]">
                    {post.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#00c853] dark:text-[#00e676] inline-flex items-center gap-1">
                  Read guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
 * BAND 6: EXPANDED FREQUENTLY ASKED QUESTIONS (H2 + H3 ACCORDIONS)
 * ============================================================================ */
export const HomeExpandedFaqBlock: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const extendedFaqs = [
    {
      q: 'What does Domain Tech Hub actually do?',
      a: 'We design, code, and launch conversion-focused business websites, custom e-commerce stores with M-Pesa & card checkout, KRA eTIMS POS & ERP integrations, mobile apps, and AI WhatsApp automation.',
    },
    {
      q: "What's the difference between web design and web development?",
      a: 'Web design shapes the visual hierarchy, brand identity, typography, and user experience. Web development turns those blueprints into fast, secure, interactive code connected to databases, payment APIs, and hosting.',
    },
    {
      q: 'Do you build AI chatbots and WhatsApp bots in Kenya?',
      a: 'Yes. We integrate official WhatsApp Cloud API workflows and RAG-powered AI agents that qualify customer inquiries, answer pricing questions 24/7, and route hot leads directly to your team.',
    },
    {
      q: 'How much does custom web development cost in Kenya?',
      a: 'Starter corporate websites start at KSh 35,000, growth business & CMS platforms start at KSh 85,000, M-Pesa e-commerce builds start at KSh 110,000, and custom software/ERP systems are quoted transparently based on scope.',
    },
    {
      q: 'Do you build mobile apps for iOS and Android in Kenya?',
      a: 'Yes. Using React Native and Flutter, we ship cross-platform Android and iOS apps integrated with M-Pesa Daraja 3.0, push notifications, offline sync, and real-time dashboards.',
    },
    {
      q: 'Can you build custom software, dashboards, and internal tools?',
      a: 'Yes. We engineer custom CRM systems, property management portals, SACCO loan systems, inventory trackers, and KRA eTIMS-ready billing dashboards.',
    },
    {
      q: 'Why custom code instead of WordPress or a no-code builder?',
      a: 'While we support managed WordPress when appropriate, custom Next.js and TypeScript code eliminates plugin bloat, delivers sub-second load times on Kenyan mobile networks, strengthens security, and gives you 100% ownership.',
    },
    {
      q: 'Where in Kenya does Domain Tech Hub work?',
      a: 'Our studio is based in Westlands, Nairobi, and we serve clients remotely and in-person across Mombasa, Kisumu, Nakuru, Eldoret, Thika, and throughout East Africa.',
    },
    {
      q: 'How long does it take to build a website?',
      a: 'Standard business websites launch in 2 to 3 weeks; full e-commerce storefronts and custom software platforms typically take 4 to 8 weeks with weekly staging previews.',
    },
    {
      q: 'Why is SEO important for my website?',
      a: 'Technical SEO puts your business in front of buyers actively searching Google for your services in Nairobi and Kenya, lowering long-term customer acquisition costs compared to ads alone.',
    },
    {
      q: 'Can Domain Tech Hub redesign my existing website?',
      a: 'Yes. We audit your current site’s speed, UX drop-offs, and rankings, migrate all existing URLs safely with 301 redirects so you keep SEO equity, and relaunch on modern infrastructure.',
    },
    {
      q: 'Do I need a mobile-friendly website?',
      a: 'Essential. Over 80% of Kenyan web traffic and M-Pesa checkouts happen on mobile phones; Google also ranks websites strictly using mobile-first indexing.',
    },
    {
      q: 'How does an engagement start?',
      a: 'Send us your name and phone number via the quote form below or open our Cost Calculator. We schedule a quick discovery call and deliver a fixed-price proposal within 48 hours.',
    },
  ];

  return (
    <div className="mt-12 pt-10 border-t border-stone-200 dark:border-slate-800">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {extendedFaqs.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={item.q}
              className="rounded-2xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {item.q}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#00c853]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================================
 * BAND 7: CLOSING CTA & DIRECT CONTACT CARDS INSIDE <MAIN>
 * ============================================================================ */
export const HomeClosingContactBand: React.FC<HomeSectionNavProps> = ({
  onNavigate,
}) => {
  return (
    <section className="py-12 sm:py-16 border-t border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight text-balance mb-2">
              Ready to Grow Your Business Online? Let&apos;s Work Together!
            </h2>
            <h3 className="text-base font-semibold text-slate-600 dark:text-slate-400">
              Have Questions Or Need A Customised Quote? We’re Ready to Start and Launch Your New Website.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('calculator')}
              className="px-5 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Calculate Project Cost
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-[#00c853] font-bold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Consultation
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href={`mailto:${AGENCY_INFO.email}`}
            className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors block"
          >
            <div className="flex items-center gap-2 text-[#00c853] dark:text-[#00e676] mb-1.5">
              <Mail className="w-4 h-4" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">EMAIL</h4>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white break-all">
              {AGENCY_INFO.email}
            </p>
          </a>

          <a
            href={`https://wa.me/${AGENCY_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-colors block"
          >
            <div className="flex items-center gap-2 text-[#00c853] dark:text-[#00e676] mb-1.5">
              <MessageSquare className="w-4 h-4" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">WHATSAPP</h4>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
              +254 118 746 676
            </p>
          </a>

          <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-[#00c853] dark:text-[#00e676] mb-1.5">
              <MapPin className="w-4 h-4" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">ADDRESS</h4>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Westlands, Nairobi, Kenya
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-[#00c853] dark:text-[#00e676] mb-1.5">
              <Clock className="w-4 h-4" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">WORKING HOURS</h4>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {AGENCY_INFO.officeHours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
