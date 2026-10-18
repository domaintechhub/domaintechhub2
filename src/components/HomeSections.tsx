import React, { useState } from 'react';
import { 
  Check, ArrowRight, Star, MessageSquare, Phone, 
  HelpCircle, ChevronDown, ChevronUp, ShieldCheck, 
  Clock, Sparkles, Send, CheckCircle2, ExternalLink
} from 'lucide-react';
import teamArchitectImg from '../assets/images/team_solutions_architect_1790853423651.webp';
import teamDesignerImg from '../assets/images/team_product_designer_1790853436226.webp';
import teamFintechImg from '../assets/images/team_fintech_lead_1790853447967.webp';
import teamGrowthImg from '../assets/images/team_growth_lead_1790853459528.webp';
import { saveLead } from '../utils/leadDispatch';
import { BuildLayerKey } from './Hero';

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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
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
          
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-3">
              [ CASE STUDY · E-COMMERCE + M-PESA ]
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">
              Checkout drop-off down 64% in 6 weeks
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Clean Interactive Mockup Window */}
              <div className="lg:col-span-6 bg-stone-100 dark:bg-slate-950 rounded-2xl p-5 border border-stone-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c853]" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">riftvalleyorganics.co.ke/checkout</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-slate-500 text-[10px]">PAYMENT METHOD</div>
                      <div className="font-bold text-slate-900 dark:text-white">Safaricom Daraja 3.0 M-Pesa STK</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#00c853] dark:text-[#00e676] text-[10px] font-bold">
                      ACTIVE
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#00c853]/10 border border-[#00c853]/30 flex items-center justify-between text-slate-800 dark:text-slate-200">
                    <span>Prompt dispatched to +254 712 *** 890</span>
                    <span className="text-[#00c853] dark:text-[#00e676] font-bold">280ms</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-slate-500">KRA eTIMS Fiscal QR Status</span>
                    <span className="text-[#00c853] dark:text-[#00e676] font-bold">Generated &amp; Stored</span>
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
          
          <div className="mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 03 / HOW IT WORKS ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              FROM FIRST CALL TO LIVE IN WEEKS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-3">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Free strategy call
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                30 minutes on Meet or WhatsApp. No cost, no pressure.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-3">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Proposal in 48 hours
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Fixed price in KSh, timeline and scope in writing.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-3">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Build with weekly updates
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Pay by milestone and review progress every week.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-t-4 border-t-[#00c853] border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="text-2xl font-black font-mono text-[#00c853] dark:text-[#00e676] mb-3">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
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
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 04 / PACKAGES ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              CLEAR PRICES, NO SURPRISES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Starter Package */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
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
            <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-slate-900 dark:to-slate-900 border-2 border-[#00c853] relative flex flex-col justify-between shadow-xl shadow-emerald-500/15 ring-1 ring-[#00c853]/30">
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#00c853] !text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-md shadow-[#00c853]/40">
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
          
          <div className="mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 05 / WHY US ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              WHY KENYAN BUSINESSES CHOOSE US
            </h2>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs mb-8">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
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
      {/* 06 / CLIENT RESULTS - TRUSTED BY EAST AFRICA'S LEADING ENTERPRISES */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 06 / CLIENT RESULTS · 98% RETENTION ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              TRUSTED BY EAST AFRICA'S LEADING ENTERPRISES
            </h2>
          </div>

          {/* 3 Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Review 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "Our checkout drop-off reduced by 64% in the first two weeks after the automated M-Pesa STK push went live."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs">
                  WO
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Wycliffe Ochieng
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Head of Digital, Rift Valley Organics
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "We were invisible on Google. After the 90-day SEO overhaul, we are now #1 for corporate litigation keywords in Nairobi."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs">
                  FN
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Faith Nyambura
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Managing Partner, Nyambura &amp; Associates
                  </div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  "Their custom CRM replaced 12 Excel spreadsheets. We now process 1,800 monthly micro-loans with zero data errors."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00c853] dark:text-[#00e676] text-xs">
                  KM
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Kennedy Mutua
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    CTO, FinPulse East Africa
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
      {/* 07 / THE TEAM - THE PEOPLE BUILDING YOUR PROJECT */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider mb-2">
              [ 07 / THE TEAM ]
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              THE PEOPLE BUILDING YOUR PROJECT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Team Member 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-slate-800 mb-4 border border-stone-200 dark:border-slate-700">
                <img 
                  src={teamArchitectImg} 
                  alt="Brian Kiprop - Founder and Lead Engineering Solutions Architect"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Brian Kiprop
              </h3>
              <p className="text-xs text-[#00c853] dark:text-[#00e676] font-mono mt-0.5 font-semibold">
                Founder &amp; lead engineer
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-slate-800 mb-4 border border-stone-200 dark:border-slate-700">
                <img 
                  src={teamFintechImg} 
                  alt="Dennis Mutua - Senior Fintech and Safaricom Daraja M-Pesa STK Push Integration Engineer"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Dennis Mutua
              </h3>
              <p className="text-xs text-[#00c853] dark:text-[#00e676] font-mono mt-0.5 font-semibold">
                Payments &amp; integrations
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-slate-800 mb-4 border border-stone-200 dark:border-slate-700">
                <img 
                  src={teamDesignerImg} 
                  alt="Zawadi Mwende - Lead Product Designer and Mobile-First UI/UX Specialist"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Zawadi Mwende
              </h3>
              <p className="text-xs text-[#00c853] dark:text-[#00e676] font-mono mt-0.5 font-semibold">
                Design &amp; front-end
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-slate-800 mb-4 border border-stone-200 dark:border-slate-700">
                <img 
                  src={teamGrowthImg} 
                  alt="Brenda Achieng - Lead Technical SEO and Local Google Ranking Strategist"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Brenda Achieng
              </h3>
              <p className="text-xs text-[#00c853] dark:text-[#00e676] font-mono mt-0.5 font-semibold">
                SEO &amp; growth
              </p>
            </div>

          </div>

        </div>
      </section>


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
      <section id="quote-section" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#00c853] via-[#00a846] to-[#008f3d] !text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading & Value Prop */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight !text-white">
                  Tell us what you need. Get a quote in 24 hours.
                </h2>
                <p className="text-sm sm:text-base !text-white/95 max-w-md leading-relaxed font-medium">
                  Three fields, no commitment. We reply on WhatsApp or email within 2 hours during business hours.
                </p>
                <div className="pt-4 flex items-center gap-3 text-xs !text-white/90 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span className="!text-white/90">100% confidential · No spam guaranteed</span>
                </div>
              </div>

              {/* Right Column: Floating White Form Card */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-900 shadow-2xl">
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
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                          Your name
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteName}
                          onChange={(e) => setQuoteName(e.target.value)}
                          placeholder="e.g. Grace Wanjiru"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={quotePhone}
                          onChange={(e) => setQuotePhone(e.target.value)}
                          placeholder="+254 7XX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                          What do you need?
                        </label>
                        <textarea
                          rows={3}
                          value={quoteNeeds}
                          onChange={(e) => setQuoteNeeds(e.target.value)}
                          placeholder="e.g. online shop with M-Pesa"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/20 resize-none"
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

      {/* ========================================================================= */}
      {/* MOBILE STICKY FLOATING ACTION BAR (Page 4 bottom) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-stone-200 dark:border-slate-800 p-2.5 sm:hidden shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="tel:+254118746676"
            className="py-2.5 px-2 rounded-lg bg-stone-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold text-center border border-stone-300 dark:border-slate-800 flex items-center justify-center gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Call</span>
          </a>

          <a
            href="https://wa.me/254118746676?text=Hi%20Domain%20Tech%20Hub,%20I%20would%20like%20to%20get%20a%20free%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-2 rounded-lg bg-[#25D366] !text-white text-xs font-bold text-center flex items-center justify-center gap-1 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 !text-white" />
            <span className="!text-white">WhatsApp</span>
          </a>

          <a
            href="#quote-section"
            onClick={handleScrollToQuote}
            className="py-2.5 px-2 rounded-lg bg-[#00c853] !text-white text-xs font-bold text-center flex items-center justify-center gap-1 shadow-xs"
          >
            <span className="!text-white">Free quote</span>
          </a>
        </div>
      </div>

    </div>
  );
};
