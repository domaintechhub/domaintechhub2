import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Receipt, Smartphone } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export type BuildLayerKey = 'build' | 'sell' | 'grow' | 'run';

interface HeroProps {
  onNavigate: (sectionId: string, subTab?: string) => void;
  onSelectCalculatorService?: (serviceId: string) => void;
  onSelectBuildLayer?: (layer: BuildLayerKey) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const quoteEl = document.getElementById('quote-section');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('contact');
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = encodeURIComponent('Hi Domain Tech Hub, I saw your website and would like to get a quote for a new project.');
    window.open(`https://wa.me/254118746676?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative bg-[#f8f7f4] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-8 sm:pt-14 pb-0 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 sm:pb-16">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-mono text-emerald-900 dark:text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
              <span>karibu · Nairobi web &amp; payments studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[1.05] mb-5">
              GET CUSTOMERS<br />
              ONLINE. GET PAID<br />
              BY M-PESA..
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-8">
              We build fast websites, M-Pesa checkout and KRA-ready business systems for Kenyan companies. Free quote within 24 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-5">
              <a
                href="#quote-section"
                onClick={handleScrollToQuote}
                className="px-6 py-3.5 rounded-lg bg-[#00c853] hover:bg-[#00b34a] !text-white text-sm font-bold tracking-wide transition-all shadow-lg shadow-[#00c853]/25 active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="!text-white">Get a free quote</span>
                <ArrowRight className="w-4 h-4 !text-white" />
              </a>

              <a
                href="https://wa.me/254118746676"
                onClick={handleWhatsApp}
                className="px-6 py-3.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-stone-300 dark:border-slate-700 text-sm font-semibold tracking-wide transition-all shadow-xs active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#00c853]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Microcopy trust indicator */}
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
              <span>Reply within 2 hours · Mon–Fri 8am–5pm EAT · Westlands, Nairobi</span>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {/* Card 1: Payments */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs hover:border-[#00c853] transition-all">
              <div className="text-[11px] font-mono text-[#00c853] dark:text-[#00e676] font-bold mb-1 tracking-wider">
                [ 01 / PAYMENTS ]
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Customers pay with M-Pesa STK Push
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                280ms push · 99.98% webhook SLA
              </p>
            </div>

            {/* Card 2: Tax */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs hover:border-[#00c853] transition-all">
              <div className="text-[11px] font-mono text-[#00c853] dark:text-[#00e676] font-bold mb-1 tracking-wider">
                [ 02 / TAX ]
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                KRA eTIMS receipts, automatically
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Type C &amp; E · real-time ledger
              </p>
            </div>

            {/* Card 3: Speed */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs hover:border-[#00c853] transition-all">
              <div className="text-[11px] font-mono text-[#00c853] dark:text-[#00e676] font-bold mb-1 tracking-wider">
                [ 03 / SPEED ]
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Be found on Google, load fast on 4G
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Loads under 1.2s · React 19 / TypeScript
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Metrics & Social Proof Bar (Dark Banner across full width) */}
      <div className="w-full bg-[#080d1a] py-12 border-y border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 4 Stats Grid with High-Contrast Vibrant Green Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-8 border-b border-slate-800/80">
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-[#00e676] drop-shadow-xs mb-1">
                50+
              </div>
              <div className="text-xs sm:text-sm font-medium !text-slate-200">
                projects delivered
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-[#00e676] drop-shadow-xs mb-1">
                98%
              </div>
              <div className="text-xs sm:text-sm font-medium !text-slate-200">
                client retention
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-[#00e676] drop-shadow-xs mb-1">
                &lt; 1.2s
              </div>
              <div className="text-xs sm:text-sm font-medium !text-slate-200">
                average load on Safaricom 4G
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-[#00e676] drop-shadow-xs mb-1">
                6+ yrs
              </div>
              <div className="text-xs sm:text-sm font-medium !text-slate-200">
                building in Nairobi
              </div>
            </div>
          </div>

          {/* Client Logos / Verification Badges Row */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <span className="!text-slate-300 uppercase tracking-wider text-[11px] font-bold">Trusted by:</span>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 !text-white font-bold tracking-wide shadow-xs">
                Rift Valley Organics
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 !text-white font-bold tracking-wide shadow-xs">
                Nyambura &amp; Associates
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 !text-white font-bold tracking-wide shadow-xs">
                FinPulse East Africa
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 !text-white font-bold tracking-wide shadow-xs">
                Savannah Artisans
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
