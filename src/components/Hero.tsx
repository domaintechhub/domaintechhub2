import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, 
  Code2, Globe2, PhoneCall, Laptop, Layers, 
  ChevronRight, ShoppingCart, Search, Database, Cpu, X
} from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedCounter } from './AnimatedCounter';
import { SproutEmblem } from './Logo';
import { detectDynamicIntent, DynamicHeroIntent, storeSearchIntent } from '../utils/dynamicIntent';
const heroImage = `${import.meta.env.BASE_URL}assets/kenyan-developer.webp`;
const heroImageAvifSrcSet = [
  `${import.meta.env.BASE_URL}assets/kenyan-developer-480.avif 480w`,
  `${import.meta.env.BASE_URL}assets/kenyan-developer-741.avif 741w`,
  `${import.meta.env.BASE_URL}assets/kenyan-developer-960.avif 960w`,
].join(', ');
const heroImageSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px';

interface HeroProps {
  onNavigate: (sectionId: string, subTab?: string) => void;
  onSelectCalculatorService?: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSelectCalculatorService }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [intent, setIntent] = useState<DynamicHeroIntent>(() => detectDynamicIntent());

  // Listen for external URL search params and hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const detected = detectDynamicIntent();
      setIntent(detected);
      if (detected.matchedTerm && detected.intentKey !== 'default') {
        setSearchQuery(detected.matchedTerm);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const detected = detectDynamicIntent(val);
    setIntent(detected);
    storeSearchIntent(val);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Warm Ambient Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-100/60 via-amber-100/30 to-transparent dark:from-teal-950/20 dark:via-blue-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-orange-100/50 via-teal-50/40 to-transparent dark:from-blue-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split: Text & Lifestyle Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Studio Identity Tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 tracking-wider uppercase font-medium">
              <SproutEmblem className="w-4 h-4 shrink-0 text-teal-600" />
              <span className="font-bold text-slate-900 dark:text-white">Domain Tech Hub</span>
              <span>·</span>
              <span className="transition-all duration-300">{intent.studioBadge}</span>
            </div>

            {/* Large Bold Headline with highlighted words in Teal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] transition-all duration-300">
              {intent.title1}{' '}
              <span className="text-teal-600 dark:text-teal-400 font-extrabold relative inline-block">
                {intent.titleHighlight}
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-teal-300/70 dark:text-teal-700/60 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>{' '}
              {intent.title2}
            </h1>

            {/* Warm, human-first supporting text */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl transition-all duration-300">
              {intent.description}
            </p>

            {/* Friendly Rounded Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (onSelectCalculatorService && intent.calculatorPreselect) {
                    onSelectCalculatorService(intent.calculatorPreselect);
                  }
                  onNavigate(intent.primaryButtonTarget);
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all active:scale-[0.98]"
              >
                <span>{intent.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => onNavigate('audit')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-stone-300 dark:border-slate-700 font-semibold text-sm shadow-xs transition-all active:scale-[0.98]"
              >
                <span>{t('hero.btnAudit')}</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <span>{t('hero.btnServices')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Subtle In-Page Search & Fast Intent Matching */}
            <div className="pt-2">
              <div className="relative max-w-xl group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  aria-label="Search a service"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search a service (e.g., M-Pesa store, SEO ranking, custom CRM, branding)..."
                  className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-stone-100/90 dark:bg-slate-900/90 border border-stone-200/90 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Reset to all capabilities"
                    aria-label="Clear service search"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Instant suggested query chips for fast testing */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 mr-1">Quick match:</span>
                {[
                  { label: '⚡ M-Pesa E-Commerce', q: 'ecommerce mpesa' },
                  { label: '🚀 Sub-Second Web Apps', q: 'web development' },
                  { label: '📈 #1 Google SEO', q: 'seo ranking' },
                  { label: '⚙️ Custom Cloud CRM', q: 'custom crm software' },
                  { label: '🎨 Corporate Branding', q: 'branding identity' }
                ].map((chip) => {
                  const isActive = searchQuery === chip.q || (intent.matchedTerm && chip.q.includes(intent.matchedTerm.toLowerCase()));
                  return (
                    <button
                      key={chip.q}
                      onClick={() => handleSearchChange(chip.q)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        isActive
                          ? 'bg-teal-700 text-white border-teal-700 font-medium shadow-xs'
                          : 'bg-white/80 dark:bg-slate-900/80 border-stone-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-teal-600 hover:border-teal-400'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Section: Key statistics displayed clearly */}
            <div className="pt-4 border-t border-stone-200/90 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-blue-600 dark:text-blue-400">
                  <AnimatedCounter value="48+" duration={2} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">
                  {t('hero.statProjects')}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-teal-600 dark:text-teal-400">
                  <AnimatedCounter value="35+" duration={2} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">
                  {t('hero.statTurnaround')}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                  <AnimatedCounter value="99.8%" duration={2} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">
                  {t('hero.statRetention')}
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-amber-600 dark:text-amber-400">
                  <AnimatedCounter value="98+" duration={2} />
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">
                  {t('hero.statScore')}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Warm Lifestyle Photo of Kenyan Developer */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative warm aura glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-200/50 via-teal-200/40 to-blue-200/50 dark:from-teal-900/30 dark:via-blue-900/30 rounded-3xl blur-2xl -z-10" />

              {/* Main Image Card with Rounded Shape */}
              <div className="overflow-hidden rounded-3xl border-4 border-white dark:border-slate-800 shadow-2xl bg-stone-100 dark:bg-slate-900 relative">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={heroImageAvifSrcSet}
                    sizes={heroImageSizes}
                  />
                <img
                  src={heroImage}
                  sizes={heroImageSizes}
                  alt="Kenyan software developer working on a laptop at Domain Tech Hub Nairobi studio"
                  width={960}
                  height={717}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                </picture>

                {/* Subtle warm gradient overlay at the base */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border border-stone-200/80 dark:border-slate-800 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        DTH
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>Nairobi Engineering Team</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                          Senior Architects & Local Support
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Connect
                    </button>
                  </div>
                </div>

                {/* Floating Top Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white font-mono text-[11px] font-bold shadow-md flex items-center gap-1.5 border border-white/60 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                  <span>M-Pesa Daraja Certified</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Soft White Floating Services Panel */}
        <div className="mb-14 p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xl shadow-stone-200/40 dark:shadow-none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-3 border-b border-stone-100 dark:border-slate-800 px-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white">
                Turnkey Capabilities & Technology Services
              </span>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-1"
            >
              <span>Explore All 15+ Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3">
            {[
              {
                id: 'web-mobile',
                title: 'Web & Mobile Dev',
                desc: 'React, Next.js, Flutter',
                icon: Globe2,
                color: 'text-blue-600 bg-blue-50 border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-900',
              },
              {
                id: 'ecommerce',
                title: 'E-Commerce & M-Pesa',
                desc: 'Daraja STK & Global Cards',
                icon: ShoppingCart,
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900',
              },
              {
                id: 'seo',
                title: 'SEO & Growth',
                desc: 'Page 1 Google Rankings',
                icon: Search,
                color: 'text-amber-600 bg-amber-50 border-amber-200/60 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-900',
              },
              {
                id: 'crm',
                title: 'Custom CRM',
                desc: 'Replace Spreadsheets',
                icon: Database,
                color: 'text-purple-600 bg-purple-50 border-purple-200/60 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-900',
              },
              {
                id: 'tech',
                title: 'Tech Stack',
                desc: 'Python, AWS, Node.js',
                icon: Cpu,
                color: 'text-teal-600 bg-teal-50 border-teal-200/60 dark:bg-teal-950/60 dark:text-teal-400 dark:border-teal-900',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id === 'tech' ? 'tech-stack' : 'services')}
                  className={`p-3 rounded-2xl border border-stone-200/70 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-stone-50/50 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-800/80 transition-all text-left group flex items-start gap-2.5 ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight font-medium">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Three Colourful, Softly Tinted Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Modern Engineering (Soft Teal Tint) */}
          <div className="p-6 rounded-3xl bg-teal-50/90 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 hover:border-teal-400 dark:hover:border-teal-600 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-base font-extrabold text-teal-950 dark:text-teal-200 mb-2">
              {t('hero.modernEng')}
            </h2>
            <p className="text-xs sm:text-sm text-teal-900/90 dark:text-teal-300/80 leading-relaxed mb-4 font-normal">
              {t('hero.modernEngDesc')}
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
              <span>React · Next.js · TypeScript</span>
            </div>
          </div>

          {/* Card 2: M-Pesa & Payment Native (Soft Emerald Green Tint) */}
          <div className="p-6 rounded-3xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-base font-extrabold text-emerald-950 dark:text-emerald-200 mb-2">
              {t('hero.mpesaNative')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/80 leading-relaxed mb-4 font-normal">
              {t('hero.mpesaNativeDesc')}
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              <span>Daraja STK Push · Flutterwave · Stripe</span>
            </div>
          </div>

          {/* Card 3: Tangible Growth & Leads (Soft Warm Orange / Amber Tint) */}
          <div className="p-6 rounded-3xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-600 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-base font-extrabold text-amber-950 dark:text-amber-200 mb-2">
              {t('hero.growthLeads')}
            </h2>
            <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-300/80 leading-relaxed mb-4 font-normal">
              {t('hero.growthLeadsDesc')}
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
              <span>Google Ads · WhatsApp Bots · SEO</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
