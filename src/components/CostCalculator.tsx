import React, { useState, useEffect } from 'react';
import { 
  Calculator, Check, ArrowRight, Copy, CheckCheck, 
  MessageSquare, Shield, Clock, RefreshCw, Mail 
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToEmail, sendToWhatsApp } from '../utils/leadDispatch';

interface AddonOption {
  id: string;
  name: string;
  desc: string;
  priceUSD: number;
  priceKES: number;
  category: string;
}

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'mpesa-gateway',
    name: 'M-Pesa STK Push & Daraja Integration',
    desc: 'Instant Safaricom mobile money prompt on user phones with automated callback verification.',
    priceUSD: 180,
    priceKES: 24000,
    category: 'payments'
  },
  {
    id: 'whatsapp-bot',
    name: 'WhatsApp Automation & Sales Bot',
    desc: 'Automated 24/7 lead capture, interactive quick replies, and CRM lead forwarding.',
    priceUSD: 220,
    priceKES: 28000,
    category: 'marketing'
  },
  {
    id: 'seo-accelerator',
    name: 'Technical SEO & Local Maps Dominance',
    desc: 'Structured schema markup, keyword research, Core Web Vitals optimization, and Google Business setup.',
    priceUSD: 200,
    priceKES: 26000,
    category: 'seo'
  },
  {
    id: 'ai-assistant',
    name: 'AI Smart Support Assistant Widget',
    desc: 'Trained on your business FAQs, services, and pricing to assist visitors 24/7.',
    priceUSD: 280,
    priceKES: 36000,
    category: 'ai'
  },
  {
    id: 'speed-sla',
    name: 'Sub-Second Speed & Core Web Vitals SLA',
    desc: 'Aggressive edge caching, image compression, critical CSS, and 95+ Lighthouse score guarantee.',
    priceUSD: 140,
    priceKES: 18000,
    category: 'performance'
  },
  {
    id: 'maintenance-3mo',
    name: '3 Months Managed Maintenance Care',
    desc: 'Daily cloud backups, weekly plugin/security patches, uptime monitoring, and 4h developer time.',
    priceUSD: 300,
    priceKES: 39000,
    category: 'support'
  },
  {
    id: 'printer-80mm',
    name: 'Thermal Receipt Printer (80mm Auto-Cutter)',
    desc: 'High-speed 80mm receipt printer (KSh 6,000 – KSh 18,000) with auto-cutter & USB/LAN/Bluetooth.',
    priceUSD: 90,
    priceKES: 12000,
    category: 'pos_hardware'
  },
  {
    id: 'scanner-barcode',
    name: 'Barcode Scanner (1D / 2D / Omnidirectional)',
    desc: 'Fast laser / 2D QR scanner (KSh 3,500 – KSh 14,000) with hands-free stand.',
    priceUSD: 65,
    priceKES: 8500,
    category: 'pos_hardware'
  },
  {
    id: 'cash-drawer',
    name: 'Automatic Heavy-Duty Cash Drawer',
    desc: '5-bill solid steel cash drawer (KSh 5,000 – KSh 10,000) with RJ11 printer trigger.',
    priceUSD: 58,
    priceKES: 7500,
    category: 'pos_hardware'
  },
  {
    id: 'touch-terminal',
    name: 'Touch Screen Monitor / Terminal',
    desc: 'Stand-alone monitor or Android/Celeron all-in-one unit (KSh 22,000 – KSh 50,000).',
    priceUSD: 270,
    priceKES: 35000,
    category: 'pos_hardware'
  },
  {
    id: 'smart-pos-handheld',
    name: 'Android Smart POS / Mobile Terminal',
    desc: 'Handheld unit with built-in printer (KSh 10,000 – KSh 40,000) ideal for small shops & restaurants.',
    priceUSD: 190,
    priceKES: 25000,
    category: 'pos_hardware'
  },
  {
    id: 'etims-cloud-sync',
    name: 'KRA e-TIMS Integration & Cloud Sync (Annual)',
    desc: 'Annual hosting fee (~KSh 5,000/yr) with continuous KRA e-TIMS fiscal invoice generation.',
    priceUSD: 38,
    priceKES: 5000,
    category: 'pos_hardware'
  }
];

interface CostCalculatorProps {
  initialServiceId?: string;
  onProceedToBooking: (quoteSummary: string, estimatedTotal: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ 
  initialServiceId, 
  onProceedToBooking 
}) => {
  const { currency, formatPrice } = useCurrency();
  const { t } = useLanguage();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || 'web-development'
  );
  const [showAllServices, setShowAllServices] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    initialServiceId === 'pos-systems' ? ['printer-80mm', 'etims-cloud-sync'] : ['mpesa-gateway', 'seo-accelerator']
  );
  const [isRushTimeline, setIsRushTimeline] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync if initialServiceId changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      if (initialServiceId === 'pos-systems') {
        setSelectedAddons(['printer-80mm', 'etims-cloud-sync']);
      }
    }
  }, [initialServiceId]);

  const currentService = SERVICES_LIST.find(s => s.id === selectedServiceId) || SERVICES_LIST[0];
  const isPos = currentService.id === 'pos-systems';

  // Tier multiplier
  const tierMultiplier = {
    starter: 0.75,
    growth: 1.0,
    enterprise: 1.85
  }[selectedTier];

  const tierLabels = isPos ? {
    starter: 'Cloud-Based POS Software (Monthly: KSh 500 – KSh 5,000/mo)',
    growth: 'On-Premise Lifetime POS License (KSh 15,000 – KSh 35,000 per PC)',
    enterprise: 'Complete All-in-One Touchscreen Bundle (KSh 37,000 – KSh 105,000)'
  } : {
    starter: 'Startup MVP Tier (Essential Scope)',
    growth: 'Growth & Business Tier (Full Production)',
    enterprise: 'Enterprise & Scale Tier (High Volume & Custom Architecture)'
  };

  const tierList = isPos ? [
    {
      id: 'starter' as const,
      title: 'Cloud-Based (Monthly)',
      desc: 'From KSh 500 to KSh 5,000 / month depending on features & multi-user access.',
      multiplier: 'From KSh 500 / mo'
    },
    {
      id: 'growth' as const,
      title: 'On-Premise Lifetime',
      desc: 'KSh 15,000 to KSh 35,000 per PC lifetime license with local install, offline mode & KRA e-TIMS.',
      multiplier: 'KSh 25,000 one-off'
    },
    {
      id: 'enterprise' as const,
      title: 'All-in-One Touch Bundle',
      desc: 'KSh 37,000 to KSh 105,000 complete bundle (Core i3/i5 touch terminal, 80mm printer, scanner, cash drawer).',
      multiplier: 'KSh 90,000 complete'
    }
  ] : [
    {
      id: 'starter' as const,
      title: 'Starter / MVP',
      desc: 'Essential features, rapid launch, lean setup for new ventures.',
      multiplier: '0.75x'
    },
    {
      id: 'growth' as const,
      title: 'Growth / Business',
      desc: 'Most popular. Full custom design, high conversions & integrations.',
      multiplier: '1.0x (Standard)'
    },
    {
      id: 'enterprise' as const,
      title: 'Enterprise / Scale',
      desc: 'High traffic, multi-role security, custom API & dedicated SLA.',
      multiplier: '1.85x'
    }
  ];

  // Base price calculation
  const calculatedBaseUSD = isPos
    ? (selectedTier === 'starter' ? 5 : selectedTier === 'growth' ? 195 : 690)
    : Math.round(currentService.basePriceUSD * tierMultiplier);

  const calculatedBaseKES = isPos
    ? (selectedTier === 'starter' ? 500 : selectedTier === 'growth' ? 25000 : 90000)
    : Math.round(currentService.basePriceKES * tierMultiplier);

  // Addons calculation
  const displayedAddons = isPos
    ? [...ADDON_OPTIONS].sort((a, b) => (a.category === 'pos_hardware' ? -1 : 1))
    : ADDON_OPTIONS;

  // Addons calculation
  const addonsTotalUSD = selectedAddons.reduce((acc, addonId) => {
    const addon = ADDON_OPTIONS.find(a => a.id === addonId);
    return acc + (addon ? addon.priceUSD : 0);
  }, 0);

  const addonsTotalKES = selectedAddons.reduce((acc, addonId) => {
    const addon = ADDON_OPTIONS.find(a => a.id === addonId);
    return acc + (addon ? addon.priceKES : 0);
  }, 0);

  // Subtotal
  const subtotalUSD = calculatedBaseUSD + addonsTotalUSD;
  const subtotalKES = calculatedBaseKES + addonsTotalKES;

  // Rush fee
  const rushFeeUSD = isRushTimeline ? Math.round(subtotalUSD * 0.25) : 0;
  const rushFeeKES = isRushTimeline ? Math.round(subtotalKES * 0.25) : 0;

  // Final Total
  const finalTotalUSD = subtotalUSD + rushFeeUSD;
  const finalTotalKES = subtotalKES + rushFeeKES;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const getQuoteSummaryText = () => {
    const selectedAddonNames = selectedAddons
      .map(id => ADDON_OPTIONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    return `*Domain Tech Hub Project Quote Request*
- Service: ${currentService.title}
- Tier: ${tierLabels[selectedTier]}
- Add-ons: ${selectedAddonNames || 'None'}
- Timeline: ${isRushTimeline ? 'Expedited Rush Sprint (+25%)' : 'Standard Delivery'}
- Estimated Total: ${currency === 'KES' ? `KSh ${finalTotalKES.toLocaleString()}` : `$${finalTotalUSD.toLocaleString()}`}
Generated at domaintechhub.com tool.`;
  };

  const handleCopyQuote = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(getQuoteSummaryText());
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = getQuoteSummaryText();
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSendWhatsAppQuote = () => {
    saveLead({
      source: 'calculator',
      sourceTitle: 'Cost Calculator Estimate',
      fullName: 'Prospective Client',
      email: '',
      phone: '',
      serviceOrItem: currentService.title,
      budgetOrPrice: currency === 'KES' ? `KSh ${finalTotalKES.toLocaleString()}` : `$${finalTotalUSD.toLocaleString()}`,
      notes: getQuoteSummaryText()
    });
    window.open(`https://wa.me/${AGENCY_INFO.whatsapp}?text=${encodeURIComponent(getQuoteSummaryText())}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmailQuote = () => {
    const leadData = {
      source: 'calculator' as const,
      sourceTitle: 'Cost Calculator Estimate',
      fullName: 'Prospective Client',
      email: '',
      phone: '',
      serviceOrItem: currentService.title,
      budgetOrPrice: currency === 'KES' ? `KSh ${finalTotalKES.toLocaleString()}` : `$${finalTotalUSD.toLocaleString()}`,
      notes: getQuoteSummaryText()
    };
    saveLead(leadData);
    sendToEmail(leadData);
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-slate-900/40 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            {t('calc.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('calc.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('calc.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Configuration Form (8 cols) */}
          <div className="lg:col-span-8 space-y-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            
            {/* Step 1: Select Primary Service */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {t('calc.step1')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
                >
                  {showAllServices ? 'Show popular services' : `View all services (${SERVICES_LIST.length})`}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 sm:max-h-80 overflow-y-auto pr-1">
                {(showAllServices 
                  ? SERVICES_LIST 
                  : [...SERVICES_LIST.slice(0, 6), SERVICES_LIST.find(s => s.id === 'pos-systems')!, SERVICES_LIST[7]].filter(Boolean)
                ).map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      selectedServiceId === srv.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span>{srv.title}</span>
                      {srv.id === 'pos-systems' && (
                        <span className="text-[10px] bg-teal-100 text-teal-900 dark:bg-teal-950/60 dark:text-teal-200 border border-teal-200 dark:border-teal-500/40 px-1.5 py-0.5 rounded font-mono">
                          POS Hardware
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">
                      {srv.id === 'pos-systems' 
                        ? 'From KSh 500/mo or KSh 15k lifetime' 
                        : `From ${formatPrice(srv.basePriceUSD, srv.basePriceKES)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Project Tier & Scope */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                {t('calc.step2')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {tierList.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedTier === tier.id
                        ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{tier.title}</span>
                      {selectedTier === tier.id && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      {tier.desc}
                    </p>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                      Scale: {tier.multiplier}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: High-Value Integrations & Add-ons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {t('calc.step3')} {isPos ? '(Includes POS Hardware & Cloud Sync)' : ''}
                </label>
                <span className="text-xs text-slate-400">
                  {selectedAddons.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 sm:max-h-96 overflow-y-auto pr-1">
                {displayedAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                        isChecked 
                          ? 'bg-cyan-950/40 border-cyan-500/80 text-white' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors ${
                          isChecked 
                            ? 'bg-cyan-500 border-cyan-400 text-slate-950' 
                            : 'border-slate-700 bg-slate-900 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-semibold text-xs sm:text-sm">{addon.name}</span>
                            <span className="text-xs font-mono font-bold text-cyan-400 whitespace-nowrap">
                              +{formatPrice(addon.priceUSD, addon.priceKES)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-normal">
                            {addon.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Timeline Priority */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                {t('calc.step4')}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsRushTimeline(false)}
                  className={`flex-1 p-3.5 rounded-xl border text-left transition-all ${
                    !isRushTimeline 
                      ? 'bg-cyan-950/60 border-cyan-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm">Standard Delivery Pace</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Thorough discovery, design sprints & QA ({currentService.duration})
                  </div>
                </button>

                <button
                  onClick={() => setIsRushTimeline(true)}
                  className={`flex-1 p-3.5 rounded-xl border text-left transition-all ${
                    isRushTimeline 
                      ? 'bg-cyan-950/60 border-cyan-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Expedited Rush Sprint</span>
                    <span className="text-[11px] font-mono text-amber-400">+25%</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Dedicated engineering squad to cut delivery time by ~45%
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Live Quotation Receipt (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                    {t('calc.summaryTitle')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  {t('calc.instantEst')}
                </span>
              </div>

              {/* Itemized lines */}
              <div className="py-4 space-y-3 text-xs border-b border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span className="font-medium">{currentService.title} ({selectedTier})</span>
                  <span className="font-mono text-white">
                    {formatPrice(calculatedBaseUSD, calculatedBaseKES)}
                  </span>
                </div>

                {selectedAddons.map(id => {
                  const addon = ADDON_OPTIONS.find(a => a.id === id);
                  if (!addon) return null;
                  return (
                    <div key={id} className="flex justify-between text-slate-400 pl-2">
                      <span className="line-clamp-1">+ {addon.name}</span>
                      <span className="font-mono text-slate-300 shrink-0">
                        {formatPrice(addon.priceUSD, addon.priceKES)}
                      </span>
                    </div>
                  );
                })}

                {isRushTimeline && (
                  <div className="flex justify-between text-amber-400 pl-2">
                    <span>+ Expedited Sprint (+25%)</span>
                    <span className="font-mono">
                      {formatPrice(rushFeeUSD, rushFeeKES)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Display */}
              <div className="py-4">
                <span className="text-xs text-slate-400 block font-mono uppercase tracking-wider">
                  {t('calc.estInvestment')} ({currency})
                </span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1 tracking-tight">
                  {formatPrice(finalTotalUSD, finalTotalKES)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Includes full source code ownership, SSL, deployment & 30-day warranty.
                </p>
              </div>

              {/* Primary Call to Action */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onProceedToBooking(
                    getQuoteSummaryText(), 
                    currency === 'KES' ? `KSh ${finalTotalKES.toLocaleString()}` : `$${finalTotalUSD.toLocaleString()}`
                  )}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <span>{t('calc.btnLock')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsAppQuote}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Send Quote to WhatsApp (+254 118746676)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmailQuote}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Email Quote to {AGENCY_INFO.email}</span>
                </button>

                <button
                  onClick={handleCopyQuote}
                  className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t('calc.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t('calc.btnCopy')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees unboxed notes */}
              <div className="mt-4 pt-4 border-t border-slate-900 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>Milestone-based payments (40% start / 60% completion)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Strict NDA and intellectual property transfer on final payout</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
