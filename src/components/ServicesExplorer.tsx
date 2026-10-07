import React, { useState, useEffect } from 'react';
import { 
  Globe, Layout, ShoppingCart, FileCode, Search, TrendingUp, Target, 
  MessageSquare, Share2, Database, Cpu, Compass, ShieldCheck, Palette, 
  Smartphone, ArrowRight, Check, X, Clock, Layers
} from 'lucide-react';
import { SERVICES_LIST, CATEGORIES_CONFIG } from '../data/servicesData';
import { ServiceDetail, ServiceCategory } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { ServicesGridSkeleton } from './Skeletons';

interface ServicesExplorerProps {
  onSelectForQuote: (serviceId: string) => void;
  onBookService: (serviceName: string) => void;
  onOpenServicePage?: (serviceId: string) => void;
  initialLoading?: boolean;
}

export const ServicesExplorer: React.FC<ServicesExplorerProps> = ({ 
  onSelectForQuote, 
  onBookService,
  onOpenServicePage,
  initialLoading = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(initialLoading);
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  // Initial smooth mount skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Filter transition effect
  const handleCategorySelect = (catId: ServiceCategory) => {
    if (catId === selectedCategory) return;
    setIsLoading(true);
    setSelectedCategory(catId);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-sky-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-emerald-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-indigo-400" />;
      case 'Search': return <Search className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-rose-400" />;
      case 'Target': return <Target className="w-5 h-5 text-red-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-pink-400" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-violet-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-purple-400" />;
      default: return <Globe className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredServices = SERVICES_LIST.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.fullDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
      service.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-950/60 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            {t('services.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Functional Category Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id as ServiceCategory)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-auto md:min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t('services.searchPlaceholder')}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Services Grid with Loading Skeleton */}
        {isLoading ? (
          <ServicesGridSkeleton count={6} />
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between"
              >
              <div>
                {/* Header with Icon and Quiet Category Kicker */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                      {service.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Title with link to Dedicated Service Page */}
                <h3 
                  onClick={() => onOpenServicePage ? onOpenServicePage(service.id) : setActiveModalService(service)}
                  className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{service.title}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Feature Bullets */}
                <ul className="space-y-1.5 mb-5">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Unboxed Metadata */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 font-mono mb-6">
                  {service.technologies.slice(0, 4).map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {i < Math.min(service.technologies.length, 4) - 1 && (
                        <span aria-hidden="true" className="text-slate-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    {t('services.from')}
                  </span>
                  <span className="text-base font-bold text-white font-mono">
                    {formatPrice(service.basePriceUSD, service.basePriceKES)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {onOpenServicePage && (
                    <button
                      onClick={() => onOpenServicePage(service.id)}
                      className="px-2.5 py-1.5 text-xs text-cyan-300 hover:text-white bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/60 rounded-lg transition-colors font-semibold flex items-center gap-1 cursor-pointer"
                      title="Open dedicated service page with package tiers and scope"
                    >
                      <span>{t('services.details')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="px-2 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors font-medium cursor-pointer"
                    title="View deliverables and scope"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={() => onSelectForQuote(service.id)}
                    className="px-3 py-1.5 text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-medium shadow-sm transition-all cursor-pointer"
                  >
                    {t('services.quote')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No services matched your search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-cyan-400 text-xs hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Service Detailed Scope Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                {getServiceIcon(activeModalService.iconName)}
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-400">
                  {activeModalService.badge} · {activeModalService.duration}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            {/* Full Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeModalService.fullDesc}
            </p>

            {/* Deliverables List */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Key Deliverables & Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalService.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Included */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                What's Included in Every Engagement
              </h4>
              <ul className="space-y-2">
                {activeModalService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalService.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Estimated Investment</span>
                <span className="text-xl font-bold text-white font-mono">
                  {formatPrice(activeModalService.basePriceUSD, activeModalService.basePriceKES)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                {onOpenServicePage && (
                  <button
                    onClick={() => {
                      const s = activeModalService;
                      setActiveModalService(null);
                      onOpenServicePage(s.id);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Service Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => {
                    const s = activeModalService;
                    setActiveModalService(null);
                    onBookService(s.title);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
                >
                  Schedule Call
                </button>
                <button
                  onClick={() => {
                    const s = activeModalService;
                    setActiveModalService(null);
                    onSelectForQuote(s.id);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs sm:text-sm font-semibold transition-all"
                >
                  Quote
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
