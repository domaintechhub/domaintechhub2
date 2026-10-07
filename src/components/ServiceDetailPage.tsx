import React, { useState } from 'react';
import { 
  Globe, Layout, ShoppingCart, FileCode, Search, TrendingUp, Target, 
  MessageSquare, Share2, Database, Cpu, Compass, ShieldCheck, Palette, 
  Smartphone, ArrowRight, ArrowLeft, Check, Clock, 
  CheckCircle2, Plus, HelpCircle, ChevronDown, ChevronRight,
  ExternalLink, Layers, Printer, Scan, Monitor, Receipt
} from 'lucide-react';
import { ServiceDetail, ServiceCategory } from '../types';
import { SERVICES_LIST } from '../data/servicesData';
import { SERVICE_DEEP_DIVES, ServicePackageTier, ServiceAddon } from '../data/serviceDetailsData';
import { CASE_STUDIES, AGENCY_INFO } from '../data/portfolioData';
import { useCurrency } from '../context/CurrencyContext';

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onSelectService: (serviceId: string) => void;
  onBackToCatalog: () => void;
  onBookService: (serviceName: string, packageDetails?: string) => void;
  onSelectForQuote: (serviceId: string) => void;
  onNavigateToCaseStudy: (caseStudyId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onSelectService,
  onBackToCatalog,
  onBookService,
  onSelectForQuote,
  onNavigateToCaseStudy,
}) => {
  const { formatPrice, currency } = useCurrency();
  const deepDive = SERVICE_DEEP_DIVES[service.id];

  // Selected package tier for the interactive configurator
  const [selectedTierId, setSelectedTierId] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Fallback packages if not in deepDive
  const packages: ServicePackageTier[] = deepDive?.packages || [
    {
      id: 'starter',
      name: `${service.title} - Starter`,
      priceUSD: service.basePriceUSD,
      priceKES: service.basePriceKES,
      timeline: service.duration,
      description: 'Foundational build with core features and standard deployment.',
      features: service.features.slice(0, 4)
    },
    {
      id: 'pro',
      name: `${service.title} - Growth`,
      badge: 'Most Popular',
      popular: true,
      priceUSD: Math.round(service.basePriceUSD * 1.5),
      priceKES: Math.round(service.basePriceKES * 1.5),
      timeline: service.duration,
      description: 'Comprehensive solution with integrations, optimization, and analytics.',
      features: service.features
    },
    {
      id: 'enterprise',
      name: `${service.title} - Enterprise`,
      badge: 'High Scale',
      priceUSD: Math.round(service.basePriceUSD * 2.5),
      priceKES: Math.round(service.basePriceKES * 2.5),
      timeline: 'Custom Sprint',
      description: 'Tailored enterprise architecture with multi-role access and high-availability SLA.',
      features: [...service.features, 'Dedicated lead engineer', '90-day SLA warranty']
    }
  ];

  const addons: ServiceAddon[] = deepDive?.addons || [
    {
      id: 'fast-track',
      name: 'Expedited Delivery Sprint',
      priceUSD: 180,
      priceKES: 24000,
      description: 'Priority queue and dedicated engineering hours for accelerated timeline.'
    },
    {
      id: 'sla-care',
      name: '3 Months Ongoing Maintenance SLA',
      priceUSD: 250,
      priceKES: 33000,
      description: 'Daily backups, security updates, uptime monitoring, and developer support.'
    }
  ];

  // Calculate live total based on selected tier and addons
  const activePackage = packages.find(p => p.id === selectedTierId) || packages[0];
  const activeAddons = addons.filter(a => selectedAddonIds.includes(a.id));

  const calculatedUSD = activePackage.priceUSD + activeAddons.reduce((sum, a) => sum + a.priceUSD, 0);
  const calculatedKES = activePackage.priceKES + activeAddons.reduce((sum, a) => sum + a.priceKES, 0);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleBookWithCustomScope = () => {
    const addonNames = activeAddons.map(a => a.name).join(', ');
    const summary = `${service.title} (${activePackage.name})` + (addonNames ? ` + Add-ons: [${addonNames}]` : '') + ` — Estimated: ${formatPrice(calculatedUSD, calculatedKES)}`;
    onBookService(service.title, summary);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-teal-600 dark:text-cyan-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Search': return <Search className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Target': return <Target className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-teal-600 dark:text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default: return <Globe className="w-5 h-5 text-teal-600 dark:text-cyan-400" />;
    }
  };

  // Matched case study
  const matchedCaseStudy = deepDive?.caseStudyId 
    ? CASE_STUDIES.find(cs => cs.id === deepDive.caseStudyId)
    : CASE_STUDIES[0];

  // Related services
  const relatedServices = (deepDive?.relatedServiceIds || [])
    .map(id => SERVICES_LIST.find(s => s.id === id))
    .filter((s): s is ServiceDetail => Boolean(s));

  return (
    <div className="min-h-screen">
      {/* 1. TOP SERVICE SWITCHER & BREADCRUMB BAR */}
      <section className="bg-stone-100/80 dark:bg-slate-900/60 border-b border-stone-200 dark:border-slate-800 py-3.5 sticky top-[57px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            
            {/* Breadcrumb + Back Button */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={onBackToCatalog}
                className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400 font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Services</span>
              </button>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className="text-teal-700 dark:text-teal-400 font-bold truncate max-w-[200px] sm:max-w-xs">
                {service.title}
              </span>
            </div>

            {/* Quick Service Switcher Scroll Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full md:max-w-2xl">
              <span className="text-[11px] font-mono text-slate-500 shrink-0 hidden sm:inline mr-1">
                Switch Service:
              </span>
              {SERVICES_LIST.map((s) => {
                const isActive = s.id === service.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onSelectService(s.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-sm font-semibold'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700/60'
                    }`}
                  >
                    {s.title.split(' ')[0]}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 2. DEDICATED SERVICE HERO */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 border-b border-stone-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Service Identity, Scope & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  {getServiceIcon(service.iconName)}
                  <span>{service.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-slate-600 dark:text-slate-400 bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{service.duration}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Production SLA Warranty</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {service.title}
              </h1>

              {/* Value Proposition */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {deepDive?.tagline || service.shortDesc}
              </p>

              {/* Detailed Scope */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.fullDesc}
              </p>

              {/* Key Trust Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Starting From</div>
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                    {formatPrice(service.basePriceUSD, service.basePriceKES)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Code Ownership</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
                    100% Client IP
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Delivery Standard</div>
                  <div className="text-sm sm:text-base font-bold text-teal-600 dark:text-teal-400">
                    Sub-second Speed
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onBookService(service.title)}
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
                >
                  <span>Book This Service Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#service-packages"
                  className="px-5 py-3.5 rounded-full bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-stone-200 dark:border-slate-700 text-sm font-semibold transition-colors"
                >
                  View 3 Package Tiers
                </a>

                <a
                  href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub,%20I%20am%20interested%20in%20your%20service:%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </div>

            {/* Right Column: Visual Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 flex items-center justify-center">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
                        Service Offering
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Key Deliverables Overview */}
                <div>
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3 font-semibold">
                    Key Deliverables Included
                  </h4>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-teal-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="pt-4 border-t border-stone-100 dark:border-slate-800">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                    Applied Frameworks & Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-stone-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Consultation Action */}
                <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">
                      Investment Baseline
                    </span>
                    <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                      {formatPrice(service.basePriceUSD, service.basePriceKES)}
                    </span>
                  </div>
                  <button
                    onClick={() => onBookService(service.title)}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs tracking-wide transition-colors"
                  >
                    Request Strategy Call
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE DOMAIN TECH HUB FOR THIS SERVICE */}
      {deepDive?.whyChooseUs && (
        <section className="py-14 sm:py-18 bg-white dark:bg-slate-900/50 border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
                Engineered for Reliability
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Why businesses choose Domain Tech Hub for {service.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deepDive.whyChooseUs.map((reason, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#faf8f5] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-400 font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3.5 DEDICATED POS PRICING & HARDWARE MATRIX (KENYA MARKET SPECIFICATION) */}
      {service.id === 'pos-systems' && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-stone-50 via-white to-stone-50 dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-900/80 border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="max-w-3xl">
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
                Official Kenya Market Price Guide
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                Point of Sale (POS) System Prices in Kenya
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Point of sale (POS) system prices in Kenya range from <strong className="text-teal-600 dark:text-teal-400 font-mono">KSh 500 per month</strong> for basic cloud software to <strong className="text-teal-600 dark:text-teal-400 font-mono">over KSh 100,000</strong> for complete high-performance hardware bundles. Explore transparent software tiers, certified hardware components, and turn-key bundles below.
              </p>
            </div>

            {/* Part 1: POS Software Prices */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  1. POS Software Prices
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-3">
                      Monthly Cloud
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Cloud-Based Software
                    </h4>
                    <div className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400 font-mono my-2">
                      KSh 500 – KSh 5,000 <span className="text-xs text-slate-500 font-normal">/ month</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      From KSh 500 to KSh 5,000 per month depending on features and multi-user access. Manage sales and inventory remotely from anywhere on laptops, tablets, or phones.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => onBookService(service.title, 'Cloud-Based POS Software (KSh 500 - 5,000/mo)')}
                      className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
                    >
                      Choose Cloud Monthly
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-md flex flex-col justify-between relative">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-teal-600 text-white font-mono text-[10px] font-bold uppercase tracking-wide">
                    Lifetime License
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-3">
                      One-Off per PC
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      On-Premise Software
                    </h4>
                    <div className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400 font-mono my-2">
                      KSh 15,000 – KSh 35,000 <span className="text-xs text-slate-500 font-normal">/ computer</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      KSh 15,000 to KSh 35,000 per computer for a lifetime license with local installation. Permanent ownership with zero recurring monthly subscription costs.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => onBookService(service.title, 'On-Premise Lifetime POS License (KSh 15,000 - 35,000)')}
                      className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      Choose On-Premise Lifetime
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-3">
                      KRA e-TIMS Sync
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Hosting / Offline Setup
                    </h4>
                    <div className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400 font-mono my-2">
                      ~ KSh 5,000 <span className="text-xs text-slate-500 font-normal">/ year</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Offline versions are usually one-off, while cloud or online sync setups may add an annual hosting fee of about KSh 5,000. Fully includes support for KRA e-TIMS integration.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => onBookService(service.title, 'POS Hosting / Offline Setup with KRA e-TIMS (KSh 5,000/yr)')}
                      className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
                    >
                      Inquire e-TIMS Setup
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Part 2: POS Hardware Component Prices */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Printer className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  2. POS Hardware Component Prices
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-2">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Thermal Receipt Printers (80mm)
                  </h4>
                  <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                    KSh 6,000 – KSh 18,000
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    High-speed 80mm receipt printers with auto-cutter, USB, LAN, or Bluetooth interface.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                    <Scan className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Barcode Scanners
                  </h4>
                  <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                    KSh 3,500 – KSh 14,000
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    1D laser scanners to high-speed 2D QR and hands-free omnidirectional supermarket scanners.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Automatic Cash Drawers
                  </h4>
                  <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                    KSh 5,000 – KSh 10,000
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Heavy-duty 5-note steel construction with RJ11 printer cable for automatic pop-open on receipt.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Touch Screen Monitors / Terminals
                  </h4>
                  <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                    KSh 22,000 – KSh 50,000
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Stand-alone touch monitors or high-response Android/Celeron commercial all-in-one touch units.
                  </p>
                </div>

              </div>
            </div>

            {/* Part 3: Complete POS Bundles */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  3. Complete POS Bundles
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
                        Handheld & Mobile
                      </span>
                      <span className="text-xs font-mono bg-stone-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                        Plug & Play
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">
                      Android Smart POS / Mobile Terminals
                    </h4>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 my-2">
                      KSh 10,000 – KSh 40,000
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Handheld or compact units with built-in thermal printers, long-lasting battery, and touch interface. Ideal for small shops, kiosks, bars, food trucks, or restaurants.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>Built-in 58mm thermal receipt printer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>Camera barcode scanner & Wi-Fi / 4G SIM slot</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>Pre-installed POS software with M-Pesa tracking</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-4 border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => onBookService(service.title, 'Android Smart POS / Mobile Terminal Bundle (KSh 10,000 - 40,000)')}
                      className="w-full py-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
                    >
                      Order Android Smart POS Terminal
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-4 py-1 bg-teal-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                    Full Hardware Rig
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
                        Supermarket & Retail Rig
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">
                      All-in-One Touchscreen Bundles (Core i3 / i5 / Celeron)
                    </h4>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 my-2">
                      KSh 37,000 – KSh 105,000
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Complete enterprise setup including the touch terminal, high-speed 80mm receipt printer, barcode scanner, and automatic steel cash drawer.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>Core i3 / i5 / Celeron high-response touchscreen terminal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>High-speed 80mm thermal receipt printer with auto-cutter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>1D/2D or omnidirectional hands-free barcode scanner</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>Heavy-duty 5-note automatic RJ11 cash drawer & KRA e-TIMS</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 mt-4 border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => onBookService(service.title, 'All-in-One Touchscreen Bundle Rig (KSh 37,000 - 105,000)')}
                      className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all"
                    >
                      Order Complete Touchscreen Bundle
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. THREE TAILORED SERVICE PACKAGES FOR THIS SPECIFIC SERVICE */}
      <section id="service-packages" className="py-16 sm:py-20 lg:py-24 bg-[#faf8f5] dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
              Transparent Pricing Tiers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Select Your {service.title} Package
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Every package includes clean source code handoff, responsive mobile testing, SSL security, and our 30-day post-launch warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const isSelected = selectedTierId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                    pkg.popular
                      ? 'bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-2xl scale-[1.02] z-10'
                      : 'bg-white dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800 hover:border-stone-300 dark:hover:border-slate-700 shadow-md'
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-teal-600 text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-md">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {pkg.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 min-h-[40px] leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="mb-6 p-4 rounded-2xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200/80 dark:border-slate-800">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                        Investment
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                          {formatPrice(pkg.priceUSD, pkg.priceKES)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-teal-600 dark:text-teal-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Timeline: {pkg.timeline}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-8">
                      <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
                        What's Included:
                      </div>
                      <ul className="space-y-2">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-stone-100 dark:border-slate-800">
                    <button
                      onClick={() => onBookService(service.title, `Selected Package: ${pkg.name} (${formatPrice(pkg.priceUSD, pkg.priceKES)}, Timeline: ${pkg.timeline})`)}
                      className={`w-full py-3 rounded-2xl font-bold text-xs tracking-wide transition-all shadow-md ${
                        pkg.popular
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                          : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-slate-900'
                      }`}
                    >
                      Choose {pkg.name.split(' ')[0]} Package
                    </button>

                    <button
                      onClick={() => {
                        setSelectedTierId(pkg.id);
                        const el = document.getElementById('custom-scope-builder');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-2 text-center text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold"
                    >
                      Customize scope with add-ons ↓
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE CUSTOM SCOPE & ADD-ONS CONFIGURATOR */}
      <section id="custom-scope-builder" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
              Interactive Scope Customizer
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Customize Your {service.title} Engagement
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Select your base package and toggle optional add-ons to build your custom scope with instant live budget estimates.
            </p>
          </div>

          <div className="bg-[#faf8f5] dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
            
            {/* Step 1: Base Tier Selection */}
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3 font-semibold">
                1. Select Base Package Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packages.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedTierId(p.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      selectedTierId === p.id
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 ring-2 ring-teal-500/20'
                        : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {p.name.split(' - ')[1] || p.name}
                      </span>
                      {selectedTierId === p.id && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      )}
                    </div>
                    <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                      {formatPrice(p.priceUSD, p.priceKES)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {p.timeline}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service-Specific Add-ons */}
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3 font-semibold">
                2. Optional Add-ons & Accelerators for {service.title}
              </label>
              <div className="space-y-3">
                {addons.map(addon => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between gap-4 transition-all ${
                        isChecked
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {addon.name}
                          </div>
                          <div className="text-xs text-slate-500 leading-relaxed">
                            {addon.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white block">
                          +{formatPrice(addon.priceUSD, addon.priceKES)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Real-Time Total & Hand-off to Booking */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wide block">
                  Configured Scope Estimate
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                    {formatPrice(calculatedUSD, calculatedKES)}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({activePackage.name} + {activeAddons.length} add-ons)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleBookWithCustomScope}
                  className="flex-1 md:flex-initial px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-600/25 transition-all whitespace-nowrap"
                >
                  Lock In Scope & Book Strategy Call
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. VERIFIED CLIENT CASE STUDY / PROVEN RESULT */}
      {matchedCaseStudy && (
        <section className="py-16 sm:py-20 bg-[#faf8f5] dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
                  Production Case Study
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                  How we delivered ROI in production
                </h2>
              </div>
              <button
                onClick={() => onNavigateToCaseStudy(matchedCaseStudy.id)}
                className="text-xs font-mono text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400">
                  <span>{matchedCaseStudy.client}</span>
                  <span>·</span>
                  <span>{matchedCaseStudy.location}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {matchedCaseStudy.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {matchedCaseStudy.summary}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {matchedCaseStudy.metrics.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800">
                      <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {matchedCaseStudy.testimonial && (
                  <blockquote className="pt-2 text-xs sm:text-sm italic text-slate-600 dark:text-slate-400 border-l-2 border-teal-500 pl-3">
                    "{matchedCaseStudy.testimonial.quote}"
                    <footer className="text-[11px] font-mono text-slate-500 not-italic mt-1">
                      — {matchedCaseStudy.testimonial.author}, {matchedCaseStudy.testimonial.role}
                    </footer>
                  </blockquote>
                )}
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-md">
                  <img
                    src={matchedCaseStudy.image}
                    alt={matchedCaseStudy.title}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 7. SERVICE-SPECIFIC FAQ ACCORDION */}
      {deepDive?.faqs && deepDive.faqs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-900/60 border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
                Common Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                Frequently Asked About {service.title}
              </h2>
            </div>

            <div className="space-y-3">
              {deepDive.faqs.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-[#faf8f5] dark:bg-slate-900 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-stone-200 dark:border-slate-800/80 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* 8. COMPLEMENTARY / RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#faf8f5] dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
                  Complementary Solutions
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                  Services frequently paired with {service.title}
                </h2>
              </div>
              <button
                onClick={onBackToCatalog}
                className="text-xs font-mono text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View All 15 Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => onSelectService(rel.id)}
                  className="text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 flex items-center justify-center">
                        {getServiceIcon(rel.iconName)}
                      </div>
                      <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 uppercase font-semibold">
                        {rel.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {rel.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">From {formatPrice(rel.basePriceUSD, rel.basePriceKES)}</span>
                    <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1 font-semibold">
                      Explore Page <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 9. BOTTOM ACTION BANNER */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono text-teal-200 uppercase tracking-wider font-semibold">
                Direct Engineering Engagement
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Ready to deploy your {service.title}?
              </h3>
              <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
                Schedule a complimentary 30-minute discovery session with our senior digital architects in Nairobi to plan timeline, technical stack, and milestone deliverables.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onBookService(service.title)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-teal-900 font-bold text-xs tracking-wide shadow-md hover:bg-stone-100 transition-colors whitespace-nowrap"
              >
                Schedule Discovery Call
              </button>
              <button
                onClick={onBackToCatalog}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-teal-800/80 hover:bg-teal-800 text-white border border-teal-500/40 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Browse All Services
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
