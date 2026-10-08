import React from 'react';
import { 
  Award, TrendingUp, Users, CheckCircle, ShieldCheck, 
  Gauge, Clock, Server, ArrowUpRight, Building2
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

interface StatsSectionProps {
  onNavigateToCaseStudies?: () => void;
  onNavigateToBooking?: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ 
  onNavigateToCaseStudies,
  onNavigateToBooking 
}) => {
  const { currency } = useCurrency();
  const { t } = useLanguage();

  return (
    <section id="stats" className="py-16 sm:py-20 bg-slate-950 border-y border-slate-900/90 relative overflow-hidden scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('about.kicker')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              {t('about.title')}
            </h2>
            <p className="text-base text-slate-300">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {onNavigateToCaseStudies && (
              <button
                onClick={onNavigateToCaseStudies}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{t('about.btnCases')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Primary Animated Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          {/* Stat 1: Projects Completed */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                100% On-Time
              </span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight mb-1 group-hover:text-cyan-300 transition-colors">
              <AnimatedCounter value="48+" duration={2.2} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1">
              Projects Completed
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Turnkey web systems, e-commerce stores, and enterprise portals deployed.
            </p>
          </div>

          {/* Stat 2: Happy Clients */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Kenya & Global
              </span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight mb-1 group-hover:text-emerald-300 transition-colors">
              <AnimatedCounter value="30+" duration={2.2} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1">
              Happy Clients
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Mid-market businesses, startups, legal firms, and manufacturing brands.
            </p>
          </div>

          {/* Stat 3: M-Pesa & Online Payments Volume */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                Zero-Loss STK
              </span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight mb-1 group-hover:text-blue-300 transition-colors">
              {currency === 'KES' ? (
                <AnimatedCounter value="280M+" prefix="KSh " duration={2.2} />
              ) : (
                <AnimatedCounter value="2.1M+" prefix="$" duration={2.2} />
              )}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1">
              Mobile & Card Revenue
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Processed through our Safaricom Daraja 3.0 & Stripe integrations.
            </p>
          </div>

          {/* Stat 4: Client Retention Rate */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                Annual SLA
              </span>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight mb-1 group-hover:text-purple-300 transition-colors">
              <AnimatedCounter value="98%" duration={2.2} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1">
              Client Retention Rate
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Clients who continue with ongoing maintenance, SEO & digital scaling.
            </p>
          </div>

        </div>

        {/* Secondary Trust & Technical Metrics Strip */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono flex items-center">
                <AnimatedCounter value="99.9%" duration={1.8} />
              </div>
              <div className="text-[11px] text-slate-400">Cloud Uptime Guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono flex items-center">
                <AnimatedCounter value="98" suffix="/100" duration={1.8} />
              </div>
              <div className="text-[11px] text-slate-400">Average Mobile PageSpeed</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono flex items-center">
                <AnimatedCounter value="4.6x" duration={1.8} />
              </div>
              <div className="text-[11px] text-slate-400">Average Pipeline ROI</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-mono flex items-center">
                <AnimatedCounter value="< 15m" duration={1.8} />
              </div>
              <div className="text-[11px] text-slate-400">SLA Support Response</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
