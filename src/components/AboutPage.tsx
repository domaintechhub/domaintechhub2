import React from 'react';
import { 
  Building2, Award, CheckCircle2, ShieldCheck, Target, 
  Users, Rocket, ArrowRight, MessageSquare, MapPin, 
  Clock, Mail, Phone, Sparkles, ChevronRight, Zap, 
  Code2, HeartHandshake, FileCheck, Layers
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { StatsSection } from './StatsSection';
import { AGENCY_INFO } from '../data/portfolioData';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateToPortfolio: () => void;
  onNavigateToTeam: () => void;
  onNavigateToRoadmap: () => void;
  onNavigateToContact: () => void;
  onNavigateToTools: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateToPortfolio,
  onNavigateToTeam,
  onNavigateToRoadmap,
  onNavigateToContact,
  onNavigateToTools,
}) => {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Page Header */}
      <PageHeader
        badge="Nairobi Studio · Established 2018"
        badgeIcon={<Building2 className="w-3.5 h-3.5 text-teal-500" />}
        title="About Domain Tech Hub"
        description="We are a senior web engineering and digital technology agency headquartered in Nairobi, Kenya. We engineer high-performance web systems, Safaricom Daraja 3.0 M-Pesa platforms, and conversion-optimized architectures for regional and global scale."
        currentBreadcrumb="About Us"
        onNavigateHome={onNavigateHome}
        actionButton={{
          label: "View Verified Case Studies",
          onClick: onNavigateToPortfolio
        }}
      />

      {/* 2. Key Fast Facts Banner */}
      <div className="border-b border-stone-200/90 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl bg-stone-50/80 dark:bg-slate-800/50 border border-stone-200/70 dark:border-slate-700/60 shadow-2xs text-slate-700 dark:text-slate-300 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-medium tracking-tight text-slate-800 dark:text-slate-200">100% In-House Nairobi Studio</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl bg-stone-50/80 dark:bg-slate-800/50 border border-stone-200/70 dark:border-slate-700/60 shadow-2xs text-slate-700 dark:text-slate-300 min-w-0">
              <Zap className="w-4 h-4 text-teal-500 shrink-0" />
              <span className="text-xs font-medium tracking-tight text-slate-800 dark:text-slate-200">Sub-Second Core Web Vitals</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl bg-stone-50/80 dark:bg-slate-800/50 border border-stone-200/70 dark:border-slate-700/60 shadow-2xs text-slate-700 dark:text-slate-300 min-w-0">
              <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
              <span className="text-xs font-medium tracking-tight text-slate-800 dark:text-slate-200">Full Source Code &amp; IP Ownership</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl bg-stone-50/80 dark:bg-slate-800/50 border border-stone-200/70 dark:border-slate-700/60 shadow-2xs text-slate-700 dark:text-slate-300 min-w-0">
              <Clock className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="text-xs font-medium tracking-tight text-slate-800 dark:text-slate-200">4 to 8 Week Fixed-Bid Sprints</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Executive Mission & Company Narrative */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
              <Target className="w-4 h-4" />
              <span>OUR FOUNDING PRINCIPLE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Engineering Over Templates. Measurable ROI Over Hype.
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              <p>
                Domain Tech Hub was established in Nairobi to eliminate a persistent frustration faced by growing enterprises across Africa: agencies that promise custom solutions but deliver fragile, bloated CMS templates that crash under high M-Pesa transaction volumes or stall in Google search rankings.
              </p>
              <p>
                We took the opposite approach: strict TypeScript contracts, normalized PostgreSQL schemas, sub-second edge hosting via Cloudflare, and direct native integration with Safaricom Daraja 3.0 APIs.
              </p>
              <p>
                Every solution we deliver is treated as a mission-critical digital asset. You receive full ownership of your Git repositories, zero proprietary vendor lock-in, and an ironclad 30-day post-launch warranty with dedicated SLA response times.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToTeam}
                className="px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs tracking-wide shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Meet Our Senior Engineers</span>
                <Users className="w-4 h-4" />
              </button>
              
              <button
                onClick={onNavigateToRoadmap}
                className="px-6 py-3 rounded-full border border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>4–8 Week Sprint Roadmap</span>
                <Rocket className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Side Comparison: Traditional Agency vs Domain Tech Hub */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-stone-100 dark:border-slate-800 pb-4">
                <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider block font-bold">
                  The Domain Tech Hub Difference
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  How We Compare
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
                  <div className="font-bold text-rose-800 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                    <span>✕ Traditional Agency Approach</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-4 list-disc">
                    <li>Unvetted outsourced freelance developers</li>
                    <li>Slow bloated themes that fail Google Core Web Vitals</li>
                    <li>Vague open-ended hourly billing with surprise costs</li>
                    <li>Hostage code &amp; proprietary lock-in subscriptions</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                    <span>✓ The Domain Tech Hub Standard</span>
                  </div>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc">
                    <li>100% in-house senior Nairobi software architects</li>
                    <li>Strict sub-second loading (LCP &lt; 1.0s) &amp; 98/100 SEO score</li>
                    <li>Fixed-bid 4 to 8 week milestone sprint agreements</li>
                    <li>100% IP &amp; GitHub repository ownership transferred to you</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={onNavigateToTools}
                  className="text-xs font-mono text-teal-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Test our online project budget calculator</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Verified Metrics & ROI Section */}
      <div className="border-t border-b border-stone-200 dark:border-slate-800/80">
        <StatsSection 
          onNavigateToCaseStudies={onNavigateToPortfolio}
          onNavigateToBooking={onNavigateToContact}
        />
      </div>

      {/* 5. Four Core Operating Pillars */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
            <Award className="w-4 h-4" />
            <span>CORE VALUES &amp; STANDARDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our 4 Engineering Pillars
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Every digital platform, API integration, and bespoke web application engineered at Domain Tech Hub adheres to these non-negotiable principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              1. 100% Client IP Ownership
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We never hold your digital assets hostage. You receive complete Git commit history, deployment keys, Docker configs, and full database schemas upon project handover.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              2. Sub-Second Speed &amp; SEO
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Speed directly drives revenue. We enforce sub-second Largest Contentful Paint (LCP &lt; 1.0s), mobile-first responsiveness, and structured JSON-LD schema for Page 1 Google rankings.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              3. African Fintech DNA
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We specialize in deep integrations with Safaricom Daraja 3.0 M-Pesa STK Push, Pesapal, Stripe, and automated SMS gateway triggers to maximize local checkout conversion.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              4. 4–8 Wk Predictable Sprints
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Zero guesswork. We break your project into weekly sprints with live staging URLs, weekly video walkthroughs, signed milestone gates, and a 30-day post-launch warranty.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Physical Studio & Headquarters Details */}
      <section className="py-16 bg-stone-100/60 dark:bg-slate-900/50 border-t border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
                <MapPin className="w-4 h-4" />
                <span>NAIROBI HEADQUARTERS</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Our Physical Presence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe in genuine accountability. While we serve clients globally, our core engineering leadership and software architects are based right here in Nairobi, Kenya.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-2">
                <MapPin className="w-5 h-5 text-teal-500" />
                <div className="text-xs font-mono text-slate-400 uppercase">Head Office</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Delta Corner Tower
                </div>
                <div className="text-xs text-slate-500">
                  Westlands, Nairobi, Kenya
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <div className="text-xs font-mono text-slate-400 uppercase">Working Hours</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Mon – Fri: 8AM – 5PM
                </div>
                <div className="text-xs text-slate-500">
                  East Africa Time (EAT)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <div className="text-xs font-mono text-slate-400 uppercase">Direct Access</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  +{AGENCY_INFO.whatsapp}
                </div>
                <div className="text-xs text-slate-500">
                  WhatsApp &amp; Phone
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. Bottom Action CTA */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
              <Sparkles className="w-4 h-4" />
              <span>PARTNER WITH NAIROBI'S PREMIER ENGINEERING STUDIO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to Discuss Your Next Milestone?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book a 30-minute discovery call directly with our technical leads to scope your web platform, e-commerce store, or custom CRM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Book Discovery Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub,%20I'd%20like%20to%20learn%20more%20about%20your%20agency.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-slate-700 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
