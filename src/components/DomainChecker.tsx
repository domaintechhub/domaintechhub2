import React, { useState, useId } from 'react';
import { 
  Globe, Search, CheckCircle, Server, Shield, 
  ArrowRight, ExternalLink, HelpCircle, MessageSquare, Mail 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToWhatsApp, sendToEmail } from '../utils/leadDispatch';

interface DomainCheckerProps {
  onSelectDomainForSetup: (domain: string, extension: string) => void;
}

interface TldItem {
  ext: string;
  usd: number;
  kes: number;
  popular?: boolean;
  desc: string;
}

const TLDS: TldItem[] = [
  { ext: '.co.ke', usd: 9.5, kes: 1200, popular: true, desc: 'Official Kenya national business identity' },
  { ext: '.com', usd: 13.99, kes: 1800, popular: true, desc: 'Global commercial recognized standard' },
  { ext: '.org', usd: 14.5, kes: 1950, desc: 'Ideal for NGOs, institutions & trusts' },
  { ext: '.tech', usd: 18.0, kes: 2400, desc: 'Modern software, AI & tech startups' },
  { ext: '.africa', usd: 21.5, kes: 2800, desc: 'Pan-African continental brand footprint' }
];

export const DomainChecker: React.FC<DomainCheckerProps> = ({ onSelectDomainForSetup }) => {
  const domainInputId = useId();
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'domains' | 'hosting'>('domains');
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setHasSearched(true);
  };

  // Clean domain input
  const cleanName = searchTerm.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');

  return (
    <section id="domains" className="py-20 lg:py-28 bg-slate-900/30 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            {t('domain.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('domain.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('domain.subtitle')}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('domains')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('domain.lookupTab')}
          </button>
          <button
            onClick={() => setActiveTab('hosting')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'hosting'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('domain.hostingTab')}
          </button>
        </div>

        {activeTab === 'domains' ? (
          <div>
            {/* Search Input Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mb-8">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id={domainInputId}
                    type="text"
                    aria-label="Enter your company or domain name to check availability"
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setHasSearched(false);
                    }}
                    placeholder="Enter your company or idea name (e.g. savannahcoffee)"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('domain.btnCheck')}</span>
                </button>
              </form>

              {hasSearched && (
                <p role="status" className="mt-3 text-xs text-amber-300">
                  This page does not check a live domain registry. The options below are suggestions; use the WhatsApp button on a domain to ask the team to verify it.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800/80">
                <span className="font-mono text-slate-500">Popular in Kenya:</span>
                <span>.co.ke ({formatPrice(9.5, 1200)}/yr)</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span>.com ({formatPrice(13.99, 1800)}/yr)</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span>.tech ({formatPrice(18.0, 2400)}/yr)</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TLDS.map((tld) => {
                const displayName = cleanName ? `${cleanName}${tld.ext}` : `yourbrand${tld.ext}`;
                return (
                  <div
                    key={tld.ext}
                    className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-mono font-bold text-white">
                          {displayName}
                        </span>
                        {tld.popular && (
                          <span className="text-[10px] font-mono text-cyan-400 uppercase">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        {tld.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-slate-500 font-mono block">Annual Fee</span>
                        <span className="text-base font-bold font-mono text-cyan-300">
                          {formatPrice(tld.usd, tld.kes)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const domainFull = `${cleanName || 'mybrand'}${tld.ext}`;
                            const leadData = {
                              source: 'domain' as const,
                              sourceTitle: 'Domain Registration Order',
                              fullName: 'Domain Registrant',
                              email: '',
                              phone: '',
                              serviceOrItem: `Domain: ${domainFull}`,
                              budgetOrPrice: `${formatPrice(tld.usd, tld.kes)}/yr`,
                              notes: `Inquiry to register domain ${domainFull}. Please verify availability and share invoice.`
                            };
                            saveLead(leadData);
                            sendToWhatsApp(leadData);
                          }}
                          className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                          title="Register via WhatsApp"
                          aria-label={`Register ${displayName} via WhatsApp`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>

                        <button
                          onClick={() => onSelectDomainForSetup(cleanName || 'mybrand', tld.ext)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <span>Configure quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Hosting Plans Tab */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Business Cloud Hosting',
                badge: 'Fast & Secure',
                desc: 'Perfect for corporate business sites, portfolios, and blogs with fast local SSD caching.',
                priceUSD: 8,
                priceKES: 1000,
                period: '/month',
                specs: [
                  '20 GB High-Speed NVMe Storage',
                  'Unlimited Corporate Email Accounts',
                  'Free Let\'s Encrypt SSL Automated Certificate',
                  'Daily Automated Off-site Backups',
                  '99.9% Uptime Guarantee SLA',
                  'cPanel / DirectAdmin Control Panel'
                ]
              },
              {
                title: 'E-Commerce & High Traffic',
                badge: 'Recommended',
                desc: 'Tailored for online stores with M-Pesa checkouts, WooCommerce, and high concurrency traffic.',
                priceUSD: 24,
                priceKES: 3100,
                period: '/month',
                popular: true,
                specs: [
                  '80 GB NVMe Enterprise Storage',
                  'Optimized Redis / Memcached Object Cache',
                  'Dedicated Resources (4 vCPU / 8GB RAM)',
                  'Real-time Web Application Firewall (WAF)',
                  'Free M-Pesa Webhook SSL Tunneling',
                  'Priority 24/7 WhatsApp Tech Support'
                ]
              },
              {
                title: 'Managed VPS & Custom App',
                badge: 'Dedicated Power',
                desc: 'Full root access VPS for Node.js, Python, PostgreSQL, and custom CRM systems.',
                priceUSD: 55,
                priceKES: 7100,
                period: '/month',
                specs: [
                  '160 GB Pure NVMe Cloud Storage',
                  '8 Dedicated vCPUs & 16GB Dedicated RAM',
                  'Docker & CI/CD Deployment Pipelines',
                  'Custom Staging & Production Environments',
                  'Enterprise DDoS Mitigation by Cloudflare',
                  'Dedicated DevOps Engineer on Retainer'
                ]
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`bg-slate-900/80 rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                  plan.popular 
                    ? 'border-cyan-500/80 shadow-lg shadow-cyan-500/10' 
                    : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {plan.badge}
                    </span>
                    {plan.popular && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{plan.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">{plan.desc}</p>

                  <div className="mb-6 pb-6 border-b border-slate-800">
                    <span className="text-3xl font-extrabold text-white font-mono">
                      {formatPrice(plan.priceUSD, plan.priceKES)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono ml-1">{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {plan.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const leadData = {
                        source: 'domain' as const,
                        sourceTitle: 'Cloud Hosting Plan Order',
                        fullName: 'Hosting Client',
                        email: '',
                        phone: '',
                        serviceOrItem: plan.title,
                        budgetOrPrice: `${formatPrice(plan.priceUSD, plan.priceKES)}${plan.period}`,
                        notes: `Inquiry to provision ${plan.title} (${formatPrice(plan.priceUSD, plan.priceKES)}${plan.period}). Specs: ${plan.specs.slice(0, 3).join(', ')}`
                      };
                      saveLead(leadData);
                      sendToWhatsApp(leadData);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Order</span>
                  </button>

                  <button
                    onClick={() => onSelectDomainForSetup('hosting-plan', plan.title)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                  >
                    Configure Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
