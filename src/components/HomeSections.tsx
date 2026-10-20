import React, { useState } from 'react';
import { 
  Check, ArrowRight, Star, MessageSquare, 
  HelpCircle, ChevronDown, ChevronUp, ShieldCheck, 
  Clock, Sparkles, Send, CheckCircle2, ExternalLink
} from 'lucide-react';
import { saveLead } from '../utils/leadDispatch';
import { BuildLayerKey } from './Hero';
import { ClientProjectsSlider } from './ClientProjectsSlider';

interface HomeSectionsProps {
  calculatorServiceId?: string;
  prefilledService: string;
  prefilledNotes: string;
  onNavigate: (target: string, subParam?: string) => void;
  onSelectForQuote: (serviceId: string) => void;
  onBookService?: (serviceName: string) => void;
  onSelectTechForProject?: (techName: string) => void;
  onProceedToBooking?: (quoteSummary: string, estimatedTotal: string) => void;
  onFixAuditWithAgency?: (domain: string, issueCount: number) => void;
  onSelectDomainForSetup?: (domainName: string, extension: string) => void;
  onBookSimilarProject?: (projectTitle: string) => void;
  onScheduleConsultation?: (topic: string) => void;
  onNavigatePath?: (url: string) => void;
  activeBuildLayer?: BuildLayerKey;
  onSelectBuildLayer?: (layer: BuildLayerKey) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({
  onNavigate,
  onSelectForQuote,
  onBookService,
}) => {
  // Quote form state
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteNeeds, setQuoteNeeds] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ open/close accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;

    setIsSubmitting(true);
    try {
      saveLead({
        source: 'quick_contact',
        sourceTitle: 'Home Page Quick Quote Request',
        fullName: quoteName,
        email: `${quotePhone.replace(/\s+/g, '')}@lead.domaintechhubs.com`,
        phone: quotePhone,
        notes: quoteNeeds,
        serviceOrItem: quoteNeeds || 'Web & M-Pesa Systems',
      });

      // Directly dispatch message with all 3 fields to WhatsApp
      const details = quoteNeeds ? quoteNeeds : 'Custom Web & Payment Systems';
      const text = `*New Quote Request — Domain Tech Hub*

*Name:* ${quoteName}
*Phone / WhatsApp:* ${quotePhone}
*What I Need:* ${details}

Hi Domain Tech Hub, I have submitted my request through your website. Looking forward to your quote!`;

      window.open(`https://wa.me/254118746676?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsAppFromForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const details = quoteNeeds ? quoteNeeds : 'Custom Web & Payment Systems';
    const text = `*New Quote Request — Domain Tech Hub*

*Name:* ${quoteName}
*Phone / WhatsApp:* ${quotePhone}
*What I Need:* ${details}

Hi Domain Tech Hub, I have submitted my request through your website. Looking forward to your quote!`;
    window.open(`https://wa.me/254118746676?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('quote-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f8f7f4] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">

      {/* ========================================================================= */}
      {/* 02 / WHAT WE BUILD - PICK WHAT YOUR BUSINESS NEEDS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow & Title */}
          <div className="mb-10 sm:mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 02 / WHAT WE BUILD ]
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              PICK WHAT YOUR BUSINESS NEEDS
            </h2>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            
            {/* Card 1: Custom Websites */}
            <div 
              onClick={() => onSelectForQuote('web-development')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] dark:hover:border-[#00e676]/60 transition-all flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-md"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-800 dark:text-[#00e676] mb-4 font-bold">
                  2–4 WEEKS
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                  Custom Websites
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Fast, secure sites that rank on Google and turn visitors into enquiries.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-[#00c853] dark:text-[#00e676]">
                  from KSh 85,000
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Card 2: Mobile Apps */}
            <div 
              onClick={() => onSelectForQuote('mobile-app-development')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] dark:hover:border-[#00e676]/60 transition-all flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-md"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-800 dark:text-[#00e676] mb-4 font-bold">
                  3–6 WEEKS
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                  Mobile Apps
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  One app for iOS and Android, with offline mode and M-Pesa built in.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-[#00c853] dark:text-[#00e676]">
                  from KSh 120,000
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Card 3: Company Site + CMS */}
            <div 
              onClick={() => onSelectForQuote('web-redesign')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] dark:hover:border-[#00e676]/60 transition-all flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-md"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-800 dark:text-[#00e676] mb-4 font-bold">
                  2–3 WEEKS
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                  Company Site + CMS
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Edit your own pages, products and news without calling a developer.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-[#00c853] dark:text-[#00e676]">
                  from KSh 75,000
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Card 4: Front-End Redesign */}
            <div 
              onClick={() => onSelectForQuote('ui-ux-design')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] dark:hover:border-[#00e676]/60 transition-all flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-md"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-800 dark:text-[#00e676] mb-4 font-bold">
                  1–3 WEEKS
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                  Front-End Redesign
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Turn your designs into clean, responsive screens that work on any phone.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-[#00c853] dark:text-[#00e676]">
                  from KSh 65,000
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] group-hover:translate-x-1 transition-all" />
              </div>
            </div>

          </div>

          {/* WHO WE SERVE ROW */}
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3 font-semibold">
              [ WHO WE SERVE ]
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {[
                'Retail & e-commerce',
                'Real estate',
                'Logistics',
                'Schools',
                'SACCOs & finance',
                'Restaurants',
                'Law & professional firms'
              ].map((sector) => (
                <span
                  key={sector}
                  className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 shadow-2xs"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* FEATURED CASE STUDY: E-COMMERCE + M-PESA */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-stone-200 dark:border-slate-800 bg-stone-100/60 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2 sm:mb-3">
              [ CASE STUDY · E-COMMERCE + M-PESA ]
            </div>
            
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 sm:mb-8">
              Checkout drop-off down 64% in 6 weeks
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column: Clean Interactive Mockup Window */}
              <div className="lg:col-span-6 bg-stone-100 dark:bg-slate-950 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c853]" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2 truncate">riftvalleyorganics.co.ke/checkout</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Row 1: Payment Method */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-[10px] font-semibold uppercase tracking-wider">PAYMENT METHOD</div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Safaricom Daraja 3.0 M-Pesa STK</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-[#00e676] text-[10px] font-bold shrink-0">
                      ACTIVE
                    </span>
                  </div>

                  {/* Row 2 (Middle): Dispatch Prompt & Latency */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-[#00c853]/30 dark:border-emerald-500/30 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">STK PUSH DISPATCH</div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm break-words">
                        Prompt dispatched to +254 712 *** 890
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-800 dark:text-[#00e676] font-bold text-[11px] shrink-0">
                      280ms
                    </span>
                  </div>

                  {/* Row 3: Fiscal Integration */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-slate-500 dark:text-slate-400 text-[10px] font-semibold uppercase tracking-wider">FISCAL INTEGRATION</div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">KRA eTIMS Fiscal QR Status</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-[#00e676] text-[10px] font-bold shrink-0">
                      Generated &amp; Stored
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Metrics */}
              <div className="lg:col-span-6 space-y-6">
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Rift Valley Organics needed customers to pay without leaving the page. We built an automated Safaricom M-Pesa STK Push checkout.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-950/70 border border-stone-200 dark:border-slate-800">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-1">
                      −64%
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      drop-off
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-950/70 border border-stone-200 dark:border-slate-800">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-1">
                      +140%
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      more orders
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#00c853] dark:text-[#00e676] hover:underline cursor-pointer"
                  >
                    <span>Read the full case study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 03 / HOW IT WORKS - FROM FIRST CALL TO LIVE IN WEEKS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 sm:mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 03 / HOW IT WORKS ]
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              FROM FIRST CALL TO LIVE IN WEEKS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Step 01 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-2 sm:mb-3">
                01
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
                Free strategy call
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                30 minutes on Meet or WhatsApp. No cost, no pressure.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-2 sm:mb-3">
                02
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
                Proposal in 48 hours
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Fixed price in KSh, timeline and scope in writing.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-2 sm:mb-3">
                03
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
                Build with weekly updates
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Pay by milestone and review progress every week.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-2 sm:mb-3">
                04
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
                Launch + 30 days support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Full source code ownership and staff training included.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 04 / PACKAGES - CLEAR PRICES, NO SURPRISES */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 lg:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 sm:mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 04 / PACKAGES ]
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              CLEAR PRICES, NO SURPRISES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Starter Package */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Starter
                </h3>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white mb-6">
                  KSh 65,000
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] dark:text-[#00e676] shrink-0" />
                    <span>High-speed landing page or 3-page site</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] dark:text-[#00e676] shrink-0" />
                    <span>Mobile-first responsive on all devices</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] dark:text-[#00e676] shrink-0" />
                    <span>Basic SEO &amp; WhatsApp click-to-chat</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={handleScrollToQuote}
                className="w-full py-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold tracking-wide text-center transition-colors block cursor-pointer"
              >
                Choose Starter
              </a>
            </div>

            {/* Business Package (Highlighted Recommended & Most Popular Card) */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-slate-900 dark:to-slate-900 border-2 border-[#00c853] relative flex flex-col justify-between shadow-xl shadow-emerald-500/15 ring-1 ring-[#00c853]/30">
              <div className="absolute -top-3.5 right-4 sm:right-6 px-3.5 py-1 rounded-full bg-[#00c853] !text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-md shadow-[#00c853]/40">
                RECOMMENDED
              </div>

              <div>
                <div className="inline-block px-2.5 py-0.5 mb-2 rounded bg-emerald-100/80 dark:bg-emerald-950/60 text-[#00c853] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Business
                </h3>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white mb-6">
                  KSh 120,000
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span className="text-slate-800 dark:text-slate-200 font-medium">Full custom website (5–10 pages)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span className="text-slate-800 dark:text-slate-200 font-medium">Automated Safaricom Daraja M-Pesa STK</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span className="text-slate-800 dark:text-slate-200 font-medium">KRA eTIMS invoice generation ready</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={handleScrollToQuote}
                className="w-full py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white text-xs sm:text-sm font-bold tracking-wide text-center transition-all block cursor-pointer shadow-lg shadow-[#00c853]/35 active:scale-[0.98]"
              >
                Choose Business (Recommended)
              </a>
            </div>

            {/* Custom Package */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Custom
                </h3>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white mb-6">
                  Let's talk
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] dark:text-[#00e676] shrink-0" />
                    <span>Payments, CRM, eTIMS and bots</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] dark:text-[#00e676] shrink-0" />
                    <span>Scoped on a free discovery call</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00c853] dark:text-[#00e676] shrink-0" />
                    <span>Milestone payments as features deploy</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={handleScrollToQuote}
                className="w-full py-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold tracking-wide text-center transition-colors block cursor-pointer"
              >
                Let's talk
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 05 / WHY US - WHY KENYAN BUSINESSES CHOOSE US */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 sm:mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 05 / WHY US ]
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              WHY KENYAN BUSINESSES CHOOSE US
            </h2>
          </div>

          {/* Mobile swipe helper */}
          <div className="sm:hidden flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2.5">
            <ArrowRight className="w-3 h-3 text-[#00c853]" />
            <span>Swipe table horizontally to compare features</span>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs mb-8">
            <table className="w-full min-w-[500px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950/60">
                  <th className="py-4 px-5 font-bold text-slate-700 dark:text-slate-300">Criteria</th>
                  <th className="py-4 px-5 font-bold bg-[#00c853] !text-white">Domain Tech Hub</th>
                  <th className="py-4 px-5 font-bold text-slate-700 dark:text-slate-300">Freelancer</th>
                  <th className="py-4 px-5 font-bold text-slate-700 dark:text-slate-300">Large agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800/60 font-mono">
                <tr>
                  <td className="py-4 px-5 font-sans font-semibold text-slate-900 dark:text-white">M-Pesa &amp; eTIMS expertise</td>
                  <td className="py-4 px-5 font-bold text-[#00c853] dark:text-[#00e676] bg-emerald-500/10">Built in</td>
                  <td className="py-4 px-5 text-slate-500">Varies</td>
                  <td className="py-4 px-5 text-slate-500">Extra cost</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-sans font-semibold text-slate-900 dark:text-white">Fixed KSh price</td>
                  <td className="py-4 px-5 font-bold text-[#00c853] dark:text-[#00e676] bg-emerald-500/10">Yes, in writing</td>
                  <td className="py-4 px-5 text-slate-500">Often hourly</td>
                  <td className="py-4 px-5 text-slate-500">High retainers</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-sans font-semibold text-slate-900 dark:text-white">Post-launch support</td>
                  <td className="py-4 px-5 font-bold text-[#00c853] dark:text-[#00e676] bg-emerald-500/10">30 days included</td>
                  <td className="py-4 px-5 text-slate-500">Not guaranteed</td>
                  <td className="py-4 px-5 text-slate-500">Paid plan</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-sans font-semibold text-slate-900 dark:text-white">You own the source code</td>
                  <td className="py-4 px-5 font-bold text-[#00c853] dark:text-[#00e676] bg-emerald-500/10">Always</td>
                  <td className="py-4 px-5 text-slate-500">Sometimes</td>
                  <td className="py-4 px-5 text-slate-500">Rarely</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-sans font-semibold text-slate-900 dark:text-white">Local team, Nairobi</td>
                  <td className="py-4 px-5 font-bold text-[#00c853] dark:text-[#00e676] bg-emerald-500/10">Westlands</td>
                  <td className="py-4 px-5 text-slate-500">Remote</td>
                  <td className="py-4 px-5 text-slate-500">Mixed</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Guarantee Box */}
          <div className="p-5 rounded-xl bg-stone-100 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00c853] dark:text-[#00e676] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Our guarantee:</strong> every project includes 30 days of post-launch fixes, full source code ownership and staff training. Milestone-based payments protect your investment from day one.
            </p>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 06 / CLIENT RESULTS - TRUSTED BY REAL CLIENTS ACROSS KENYA & EAST AFRICA */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 lg:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 sm:mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 06 / CLIENT RESULTS · 98% RETENTION ]
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              TRUSTED BY REAL CLIENTS ACROSS KENYA &amp; EAST AFRICA
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-medium">
              Verified outcomes, sub-second performance, and production feedback from local founders, directors, and enterprise teams across Kenya.
            </p>
          </div>

          {/* 6 Real Client Reviews Grid with Real Local People */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
            
            {/* Review 1: Wanjiku Mwangi - Rift Valley Organics */}
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#00c853] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-[#00c853] transition-colors">
                    <span>riftvalleyorganics.co.ke</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "Automating our checkout with Safaricom Daraja 3.0 M-Pesa STK Push dropped our drop-off rate by 64%. Customers never leave the page to copy a till number, and orders sync straight into warehouse inventory."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs shrink-0">
                  WM
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    Wanjiku Mwangi
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                    Co-Founder &amp; Operations · Rift Valley Organics
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                    📍 Nairobi &amp; Naivasha, Kenya
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2: Eng. Kevin Otieno - SolarGrid Kenya */}
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#00c853] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-[#00c853] transition-colors">
                    <span>solargrid.co.ke</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "High-intent commercial SEO and the interactive solar ROI calculator drove +240% qualified commercial leads across Nairobi and Nakuru. We ranked #1 on Google for commercial solar within 90 days."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs shrink-0">
                  KO
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    Eng. Kevin Otieno
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                    Managing Director · SolarGrid Kenya
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                    📍 Westlands, Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3: David Kipchumba - SafariLogistics East Africa */}
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#00c853] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-[#00c853] transition-colors">
                    <span>safarilogistics.co.ke</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "Our custom ERP handles 40+ container dispatches daily between Mombasa Port and Eldoret. Eliminating manual KRA eTIMS invoice reconciliation saved our finance desk 18 hours every week."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs shrink-0">
                  DK
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    David Kipchumba
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                    Head of Logistics &amp; Fleet · SafariLogistics EA
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                    📍 Mombasa &amp; Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>

            {/* Review 4: Dr. Faith Muthoni - Westlands Health & Dental */}
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#00c853] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-[#00c853] transition-colors">
                    <span>westlandshealth.co.ke</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "Real-time calendar booking and automated SMS patient reminders eliminated 82% of clinic no-shows. Patients love the instant M-Pesa consultation deposit confirmation."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs shrink-0">
                  FM
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    Dr. Faith Muthoni
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                    Clinical Director &amp; Founder · Westlands Health
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                    📍 Westlands, Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>

            {/* Review 5: Brian Oduor - AfriFresh Agri-Hub */}
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#00c853] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-[#00c853] transition-colors">
                    <span>afrifresh.co.ke</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "Our B2B wholesale ordering portal allows supermarket chains and regional hotels to submit multi-ton fresh produce orders with automated volume tiers and dispatch schedules."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs shrink-0">
                  BO
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    Brian Oduor
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                    Commercial Director · AfriFresh Agri-Hub
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                    📍 Meru &amp; Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>

            {/* Review 6: James Kimani - Apex Hardware & Building Supplies */}
            <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#00c853] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-[#00c853] transition-colors">
                    <span>apexhardware.co.ke</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "Connecting our three branch counters to a unified cloud POS with offline capability and instant KRA eTIMS QR fiscal receipts completely eliminated counter billing bottlenecks."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs shrink-0">
                  JK
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    James Kimani
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                    Managing Partner · Apex Hardware &amp; Supplies
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                    📍 Industrial Area, Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-4">
            <span className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
              Safaricom Daraja <strong className="text-[#00c853] dark:text-[#00e676]">[VERIFIED PARTNER]</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
              Google Ads &amp; Analytics <strong className="text-[#00c853] dark:text-[#00e676]">[CERTIFIED]</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
              Kenya ICT Authority <strong className="text-[#00c853] dark:text-[#00e676]">[REGISTERED]</strong>
            </span>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 07 / REAL CLIENT WEBSITES - SLIDING BOXES SHOWCASE */}
      {/* ========================================================================= */}
      <ClientProjectsSlider onSelectForQuote={onSelectForQuote} />


      {/* ========================================================================= */}
      {/* FREE RESOURCES BAR (FREE TOOL / FREE AUDIT / FREE GUIDE) */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-stone-200 dark:border-slate-800 bg-stone-100/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free Tool */}
            <div 
              onClick={() => onNavigate('tools', 'calculator')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-all cursor-pointer group shadow-xs"
            >
              <div className="text-[11px] font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
                FREE TOOL
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#00c853] transition-colors">
                Website cost calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Get an instant KSh estimate. Takes 60 seconds.
              </p>
            </div>

            {/* Free Audit */}
            <div 
              onClick={() => onNavigate('tools', 'audit')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-all cursor-pointer group shadow-xs"
            >
              <div className="text-[11px] font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
                FREE AUDIT
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#00c853] transition-colors">
                Is your site losing customers?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We review speed, SEO and mobile for free.
              </p>
            </div>

            {/* Free Guide */}
            <a 
              href="https://wa.me/254118746676?text=Hi%20Domain%20Tech%20Hub,%20please%20send%20me%20the%20free%20eTIMS%20and%20M-Pesa%20go-live%20checklist%20PDF"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] transition-all cursor-pointer group shadow-xs block"
            >
              <div className="text-[11px] font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
                FREE GUIDE
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#00c853] transition-colors">
                eTIMS &amp; M-Pesa go-live checklist
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A PDF for small businesses, sent to your WhatsApp.
              </p>
            </a>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* FAQ: QUESTIONS OWNERS ASK */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10 text-center sm:text-left">
            QUESTIONS OWNERS ASK
          </h2>

          <div className="space-y-4">
            
            {/* Q1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer"
              >
                <span>How much does a website cost?</span>
                {openFaqIndex === 1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {(openFaqIndex === 1 || openFaqIndex === null) && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sites start at KSh 65,000. You get a fixed quote within 48 hours.
                </p>
              )}
            </div>

            {/* Q2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer"
              >
                <span>Do I own the code?</span>
                {openFaqIndex === 2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {(openFaqIndex === 2 || openFaqIndex === null) && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Yes. Full source code ownership is included in every project.
                </p>
              )}
            </div>

            {/* Q3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer"
              >
                <span>Can I pay in instalments?</span>
                {openFaqIndex === 3 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {(openFaqIndex === 3 || openFaqIndex === null) && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Yes. We work on standard milestone payments: 40% initial deposit, 30% after design &amp; staging sign-off, and 30% upon final live deployment.
                </p>
              )}
            </div>

            {/* Q4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <button 
                onClick={() => toggleFaq(4)}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer"
              >
                <span>Do you offer maintenance after launch?</span>
                {openFaqIndex === 4 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {(openFaqIndex === 4 || openFaqIndex === null) && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  30 days of support is included, then monthly plans are available.
                </p>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* LEAD FORM CONTAINER: TELL US WHAT YOU NEED. GET A QUOTE IN 24 HOURS */}
      {/* ========================================================================= */}
      <section id="quote-section" className="py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-5 sm:p-10 lg:p-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#00c853] via-[#00a846] to-[#008f3d] !text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading & Value Prop */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight !text-white">
                  Tell us what you need. Get a quote in 24 hours.
                </h2>
                <p className="text-sm sm:text-base !text-white/95 max-w-md leading-relaxed font-medium">
                  Three fields, no commitment. We reply on WhatsApp or email within 2 hours during business hours.
                </p>
                <div className="pt-2 sm:pt-4 flex items-center gap-3 text-xs !text-white/90 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span className="!text-white/90">100% confidential · No spam guaranteed</span>
                </div>
              </div>

              {/* Right Column: Floating White Form Card */}
              <div className="lg:col-span-6">
                <div className="p-5 sm:p-8 rounded-2xl bg-white text-slate-900 shadow-2xl">
                  {isSubmitted ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#00c853] mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Thank You, {quoteName}!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                        Your request details have been dispatched to our official WhatsApp (+254 118 746 676). We will reply within 2 hours.
                      </p>
                      <button
                        onClick={handleOpenWhatsAppFromForm}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white text-sm font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-[0.98]"
                      >
                        <MessageSquare className="w-4 h-4 !text-white" />
                        <span className="!text-white">Open WhatsApp Chat</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                      <div>
                        <label 
                          style={{ color: '#1e293b' }}
                          className="block text-xs font-mono font-bold !text-slate-800 uppercase mb-1.5"
                        >
                          Your name
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteName}
                          onChange={(e) => setQuoteName(e.target.value)}
                          placeholder="e.g. Grace Wanjiru"
                          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm !text-slate-900 !bg-white placeholder:!text-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/25 shadow-xs"
                        />
                      </div>

                      <div>
                        <label 
                          style={{ color: '#1e293b' }}
                          className="block text-xs font-mono font-bold !text-slate-800 uppercase mb-1.5"
                        >
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={quotePhone}
                          onChange={(e) => setQuotePhone(e.target.value)}
                          placeholder="+254 7XX XXX XXX"
                          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm !text-slate-900 !bg-white placeholder:!text-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/25 shadow-xs"
                        />
                      </div>

                      <div>
                        <label 
                          style={{ color: '#1e293b' }}
                          className="block text-xs font-mono font-bold !text-slate-800 uppercase mb-1.5"
                        >
                          What do you need?
                        </label>
                        <textarea
                          rows={3}
                          value={quoteNeeds}
                          onChange={(e) => setQuoteNeeds(e.target.value)}
                          placeholder="e.g. online shop with M-Pesa"
                          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm !text-slate-900 !bg-white placeholder:!text-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/25 resize-none shadow-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white text-sm font-bold tracking-wide transition-all shadow-lg shadow-[#00c853]/35 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="!text-white">Sending...</span>
                        ) : (
                          <>
                            <span className="!text-white">Send my request</span>
                            <ArrowRight className="w-4 h-4 !text-white" />
                          </>
                        )}
                      </button>

                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={handleOpenWhatsAppFromForm}
                          className="text-xs font-medium text-slate-600 hover:text-[#00c853] hover:underline cursor-pointer"
                        >
                          Or chat on WhatsApp instead
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
