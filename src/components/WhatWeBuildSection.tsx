import React, { useState, useEffect } from 'react';
import { 
  Globe, ShoppingCart, Search, Database, 
  Smartphone, ArrowRight, CheckCircle2, ShieldCheck, 
  Receipt, Clock, Sparkles, MessageSquare, Cpu
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { BuildLayerKey } from './Hero';

interface WhatWeBuildSectionProps {
  activeLayer?: BuildLayerKey;
  onSelectLayer?: (layer: BuildLayerKey) => void;
  onNavigate: (sectionId: string, subTab?: string) => void;
  onSelectForQuote: (serviceId: string) => void;
}

interface ServiceCardItem {
  id: string;
  name: string;
  headline: string;
  description: string;
  highlights: string[];
  duration: string;
  priceKES: number;
  priceUSD: number;
  tag: string;
}

const LAYERS_CONFIG: Record<BuildLayerKey, {
  num: string;
  title: string;
  subtitle: string;
  summary: string;
  items: ServiceCardItem[];
}> = {
  build: {
    num: '01',
    title: 'Build',
    subtitle: 'websites & apps',
    summary: 'Fast, secure websites and mobile applications built for modern Kenyan devices and networks.',
    items: [
      {
        id: 'web-development',
        name: 'Custom Websites & Web Apps',
        headline: 'Sub-second speed on mobile and desktop',
        description: 'Clean, high-performance web applications built with React and Next.js. Fast load times keep your visitors engaged and help you rank higher on Google.',
        highlights: ['Loads under 1.2s on Safaricom 4G/5G', 'Easy dashboard for your team to update content', 'Built-in security and SSL certificates'],
        duration: '2 - 4 Weeks',
        priceKES: 85000,
        priceUSD: 650,
        tag: 'Core Web Stack'
      },
      {
        id: 'front-end-development',
        name: 'Modern Front-End Engineering',
        headline: 'Pixel-perfect user interfaces that convert',
        description: 'We turn your designs into clean, responsive web screens that look sharp on every phone, tablet, and laptop screen in Kenya.',
        highlights: ['Smooth mobile interactions', 'Accessible and clean source code', 'Works reliably on low-bandwidth networks'],
        duration: '1 - 3 Weeks',
        priceKES: 65000,
        priceUSD: 500,
        tag: 'UI & Design'
      },
      {
        id: 'mobile-app-development',
        name: 'Mobile Apps (iOS & Android)',
        headline: 'One app for both app stores',
        description: 'Native-feel mobile apps built with Flutter and React Native. Fast, responsive, and ready for offline use across Kenya.',
        highlights: ['Offline data storage', 'Push notifications to re-engage customers', 'Integrated with Kenyan payments'],
        duration: '3 - 6 Weeks',
        priceKES: 120000,
        priceUSD: 950,
        tag: 'Mobile Native'
      },
      {
        id: 'cms-development',
        name: 'Company Websites & CMS',
        headline: 'Manage your own pages with zero code',
        description: 'Complete corporate websites with straightforward admin dashboards. Your staff can post new products, articles, and news in seconds.',
        highlights: ['Custom admin dashboard', 'Automated nightly cloud backups', 'Fast page speeds and SEO foundation'],
        duration: '2 - 3 Weeks',
        priceKES: 75000,
        priceUSD: 580,
        tag: 'Content Portal'
      }
    ]
  },
  sell: {
    num: '02',
    title: 'Sell',
    subtitle: 'payments & POS',
    summary: 'Collect customer payments through M-Pesa and cards, and stay fully compliant with KRA eTIMS.',
    items: [
      {
        id: 'ecommerce-development',
        name: 'M-Pesa Online Stores',
        headline: 'Customers tap their phone to pay in seconds',
        description: 'Complete e-commerce stores with Safaricom Daraja STK Push built in. When customers click buy, an instant M-Pesa PIN prompt appears on their phone.',
        highlights: ['Daraja 3.0 instant STK push', 'Automated order SMS and email receipts', 'Real-time stock and inventory tracking'],
        duration: '2 - 4 Weeks',
        priceKES: 95000,
        priceUSD: 750,
        tag: 'Most Popular'
      },
      {
        id: 'pos-systems',
        name: 'POS & KRA eTIMS Systems',
        headline: 'In-store sales with automatic tax receipts',
        description: 'Modern point-of-sale systems for retail shops, supermarkets, and restaurants. Every sale is automatically fiscalized with the Kenya Revenue Authority.',
        highlights: ['Direct KRA eTIMS VSCU connection', 'Thermal receipt printer and scanner ready', 'Works offline during internet downtime'],
        duration: '1 - 2 Weeks',
        priceKES: 80000,
        priceUSD: 620,
        tag: 'KRA Compliant'
      },
      {
        id: 'payment-gateways',
        name: 'Card & Multi-Currency Gateways',
        headline: 'Sell to customers across East Africa and abroad',
        description: 'Collect payments through Visa, Mastercard, Pesapal, Flutterwave, and Stripe. Perfect for tourism businesses, exporters, and international clients.',
        highlights: ['Multi-currency checkout (KES, USD, EUR)', 'Fraud prevention and 3D Secure', 'Instant payout settlement to Kenyan banks'],
        duration: '1 - 2 Weeks',
        priceKES: 55000,
        priceUSD: 420,
        tag: 'Global Checkout'
      },
      {
        id: 'billing-portals',
        name: 'Recurring Subscriptions & Invoicing',
        headline: 'Automated billing without chasing clients',
        description: 'Custom portals that generate PDF invoices, send payment reminders via WhatsApp and email, and track unpaid accounts.',
        highlights: ['Automated monthly billing', 'M-Pesa paybill and till reconciliation', 'Client self-service statement download'],
        duration: '2 - 3 Weeks',
        priceKES: 70000,
        priceUSD: 540,
        tag: 'Fintech Core'
      }
    ]
  },
  grow: {
    num: '03',
    title: 'Grow',
    subtitle: 'SEO & marketing',
    summary: 'Get found by customers searching on Google in Nairobi and across Kenya, and turn visitors into paying clients.',
    items: [
      {
        id: 'seo-services',
        name: 'Google Search Optimization (SEO)',
        headline: 'Rank #1 when customers search for what you sell',
        description: 'Technical, on-page, and local SEO tailored for the Kenyan market. We put your business right where high-intent buyers are looking.',
        highlights: ['Target high-intent Kenyan keywords', 'Google Business Profile & Maps optimization', 'Monthly transparent rank progress reports'],
        duration: 'Monthly Retainer',
        priceKES: 50000,
        priceUSD: 380,
        tag: 'Page 1 Results'
      },
      {
        id: 'ppc-management',
        name: 'Google Ads & Paid Search',
        headline: 'Immediate inquiries from ready-to-buy customers',
        description: 'Targeted Google Ads campaigns managed by certified search specialists. We optimize your spend so you only pay for genuine customer clicks.',
        highlights: ['Strict budget control with zero waste', 'Direct conversion tracking to WhatsApp and calls', 'Weekly performance updates'],
        duration: 'Immediate Launch',
        priceKES: 45000,
        priceUSD: 350,
        tag: 'Fast Leads'
      },
      {
        id: 'digital-marketing',
        name: 'Performance Digital Marketing',
        headline: 'A steady stream of new customer leads',
        description: 'Coordinated marketing across search engines, social media, and local portals designed to drive real Kenyan revenue.',
        highlights: ['Lead funnels built for mobile users', 'Compelling local ad copy and creative', 'Return-on-investment tracking'],
        duration: 'Ongoing',
        priceKES: 60000,
        priceUSD: 460,
        tag: 'Growth Engine'
      },
      {
        id: 'graphic-design-branding',
        name: 'Corporate Branding & Design',
        headline: 'Professional identity that builds immediate trust',
        description: 'Logos, brand guidelines, stationery, and digital assets that give your business the credibility it deserves in meetings and pitches.',
        highlights: ['Vector logo and brand guide', 'Social media templates and email signatures', 'Print-ready marketing materials'],
        duration: '1 - 2 Weeks',
        priceKES: 40000,
        priceUSD: 310,
        tag: 'Visual Identity'
      }
    ]
  },
  run: {
    num: '04',
    title: 'Run',
    subtitle: 'CRM, AI & support',
    summary: 'Custom internal systems, customer automation, and dependable engineering support so your business runs smoothly.',
    items: [
      {
        id: 'custom-crm-development',
        name: 'Custom CRMs & Business Portals',
        headline: 'Replace messy spreadsheets with one clean system',
        description: 'Software tailored exactly to how your team operates. Track customer inquiries, manage inventory, assign tasks, and monitor sales.',
        highlights: ['Designed around your existing workflow', 'Role-based access for managers and staff', 'M-Pesa payment tracking inside the CRM'],
        duration: '3 - 6 Weeks',
        priceKES: 135000,
        priceUSD: 1050,
        tag: 'Operational Hub'
      },
      {
        id: 'ai-whatsapp-automation',
        name: 'WhatsApp Automation & Bots',
        headline: 'Answer customer questions 24/7 without delays',
        description: 'Connect your WhatsApp Business number to a smart auto-responder. Collect orders, answer FAQs, and forward hot leads to your sales reps.',
        highlights: ['Official WhatsApp Business Cloud API', 'Automated product catalog browsing', 'Instant notification to staff on high-value leads'],
        duration: '1 - 2 Weeks',
        priceKES: 55000,
        priceUSD: 420,
        tag: '24/7 Automation'
      },
      {
        id: 'website-maintenance',
        name: 'Cloud Hosting & Site Maintenance',
        headline: 'Zero downtime and instant technical fixes',
        description: 'Fast cloud hosting with daily backups, security monitoring, software updates, and on-demand engineering assistance whenever you need it.',
        highlights: ['99.98% uptime guarantee', 'Automated daily cloud backups', 'Dedicated Kenyan engineering support line'],
        duration: 'Monthly / Annual',
        priceKES: 25000,
        priceUSD: 195,
        tag: 'High Reliability'
      },
      {
        id: 'consulting-support',
        name: 'Technical Advisory & Engineering SLA',
        headline: 'Experienced software engineers in your corner',
        description: 'Get senior engineering guidance for your architecture, code reviews, and vendor assessments without hiring a full-time CTO.',
        highlights: ['Architecture and roadmap planning', 'Code quality and security audits', 'Priority phone and WhatsApp support SLA'],
        duration: 'On-Demand',
        priceKES: 45000,
        priceUSD: 350,
        tag: 'Senior Advisory'
      }
    ]
  }
};

export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({
  activeLayer = 'build',
  onSelectLayer,
  onNavigate,
  onSelectForQuote
}) => {
  const [currentLayer, setCurrentLayer] = useState<BuildLayerKey>(activeLayer);
  const { formatPrice } = useCurrency();

  // Sync external changes
  useEffect(() => {
    if (activeLayer) {
      setCurrentLayer(activeLayer);
    }
  }, [activeLayer]);

  const handleLayerChange = (layer: BuildLayerKey) => {
    setCurrentLayer(layer);
    if (onSelectLayer) {
      onSelectLayer(layer);
    }
  };

  const layerData = LAYERS_CONFIG[currentLayer];

  return (
    <section 
      id="what-we-build" 
      className="relative z-20 py-20 lg:py-28 bg-[#faf8f5] dark:bg-[#020617] text-slate-900 dark:text-white border-t border-stone-200/90 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Plain-Language Masthead (as mandated: "WHAT WE BUILD", no clever slogans) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-stone-200/90 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded bg-stone-200/70 dark:bg-slate-800 text-xs font-mono text-teal-700 dark:text-teal-400 font-semibold uppercase tracking-wider">
              <span>[ 02 / CAPABILITIES ]</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
              WHAT WE BUILD
            </h2>
            
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium max-w-2xl mt-3 leading-relaxed">
              A Nairobi engineering studio helping Kenyan businesses sell online, get paid with M-Pesa, and run smoothly. Choose an engineering layer below to explore our core deliverables.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="chamfer-btn px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-sm"
            >
              Request Custom Build
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="chamfer-btn px-4 py-3 bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-800 hover:border-teal-500 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all"
            >
              All 16 Services
            </button>
          </div>
        </div>

        {/* Four Pinned Layer Tabs (Matching Hero Chips) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {(Object.keys(LAYERS_CONFIG) as BuildLayerKey[]).map((key) => {
            const layer = LAYERS_CONFIG[key];
            const isActive = currentLayer === key;

            return (
              <button
                key={key}
                onClick={() => handleLayerChange(key)}
                className={`chamfer-card p-4 text-left transition-all duration-200 border relative ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-teal-600 dark:border-teal-400 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-stone-100/70 dark:bg-slate-950/70 border-stone-200 dark:border-slate-800 hover:border-teal-400 text-slate-700 dark:text-slate-300'
                }`}
              >
                {/* Active Indicator Pin */}
                {isActive && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" />
                )}

                <div className="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">
                  [ {layer.num} {layer.title} ]
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  {layer.subtitle}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                  {layer.items.length} Production Services
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Layer Header Summary */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/60 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
              {layerData.num}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  Layer {layerData.num}: {layerData.title}
                </span>
                <span className="text-xs sm:text-sm font-mono text-teal-700 dark:text-teal-300 font-semibold bg-stone-200/70 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {layerData.subtitle}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                {layerData.summary}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
            <Clock className="w-4 h-4" />
            <span>Turnaround: 1 - 4 Weeks</span>
          </div>
        </div>

        {/* Grid of 4 Core Deliverable Cards for Selected Layer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layerData.items.map((item) => (
            <div
              key={item.id}
              className="chamfer-card p-6 sm:p-7 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 transition-all flex flex-col justify-between shadow-sm group"
            >
              <div>
                {/* Top Badge & Duration */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded bg-stone-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-teal-700 dark:text-teal-300 border border-stone-200 dark:border-slate-700">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.duration}
                  </span>
                </div>

                {/* Service Name & Headline */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-teal-800 dark:text-teal-300 mb-3">
                  {item.headline}
                </p>

                {/* Plain description */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions: Pricing & Action Buttons */}
              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Transparent Estimate
                  </div>
                  <div className="text-base sm:text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                    {formatPrice(item.priceUSD, item.priceKES)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectForQuote(item.id);
                      onNavigate('contact');
                    }}
                    className="chamfer-btn px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-xs active:scale-[0.98] flex items-center gap-1.5"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('services', item.id)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base">
                Engineering Quality Guarantee & Dedicated Nairobi Handover
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                Every project includes 30 days of post-launch engineering support, full source code ownership, and staff training.
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="chamfer-btn px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-stone-100 dark:text-slate-900 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shrink-0"
          >
            Schedule Free Strategy Call
          </button>
        </div>

      </div>
    </section>
  );
};
