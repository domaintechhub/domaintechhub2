import React, { useRef, useState } from 'react';
import {
  Compass,
  Maximize2,
  Minimize2,
  ExternalLink,
  Code2,
  Bot,
  Target,
  MapPin,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { PageHeader } from './PageHeader';

interface VirtualOfficePageProps {
  onNavigateHome: () => void;
  onBookVisit: () => void;
  onOpenCalculator: () => void;
}

const TOUR_EMBED_PATH = '/assets/aistudio/domaintechhub-office-3d__3__aa35df29.html';

export const VirtualOfficePage: React.FC<VirtualOfficePageProps> = ({
  onNavigateHome,
  onBookVisit,
  onOpenCalculator,
}) => {
  const viewportContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = async () => {
    const container = viewportContainerRef.current;
    if (!container || typeof document === 'undefined') return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      window.open(TOUR_EMBED_PATH, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-[#faf8f5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PageHeader
        badge="Westlands, Nairobi · Interactive 3D Tour"
        badgeIcon={<Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
        title="Virtual Office Tour"
        description="Take a 3D tour of Domain Tech Hub's Nairobi office and see where we build websites, AI solutions and digital marketing campaigns."
        currentBreadcrumb="Virtual Office Tour"
        onNavigateHome={onNavigateHome}
        actionButton={{
          label: 'Book a Nairobi Consultation',
          onClick: onBookVisit,
        }}
      />

      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Interactive 3D Walkthrough Frame */}
          <div
            ref={viewportContainerRef}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Top Toolbar */}
            <div className="px-5 py-4 border-b border-stone-200 dark:border-slate-800 bg-stone-50/90 dark:bg-slate-900/95 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Interactive 3D Nairobi Office Walkthrough
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 font-medium text-teal-700 dark:text-teal-300">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Delta Corner Tower, Westlands</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Nairobi, Kenya</span>
                  <span aria-hidden="true">·</span>
                  <span>Click viewport to explore departments</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:border-[#00c853] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>Exit Fullscreen</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>Fullscreen</span>
                    </>
                  )}
                </button>

                <a
                  href={TOUR_EMBED_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#12A150', color: '#ffffff' }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#12A150] hover:bg-[#0e8a43] !text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                >
                  <span className="!text-white">Open Full Tour</span>
                  <ExternalLink className="w-3.5 h-3.5 !text-white" />
                </a>
              </div>
            </div>

            {/* 3D WebGL Tour Embed */}
            <div className={`relative w-full bg-[#0b1322] ${isFullscreen ? 'flex-1 min-h-0' : 'h-[520px] sm:h-[640px] lg:h-[720px]'}`}>
              <iframe
                src={TOUR_EMBED_PATH}
                title="Virtual Office Tour | Domain Tech Hub, Nairobi"
                className="w-full h-full border-0 block"
                allow="fullscreen; pointer-lock; accelerometer; gyroscope"
                allowFullScreen
              />
            </div>

            {/* Bottom Controls Strip */}
            <div className="px-5 py-3.5 bg-stone-50/90 dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  Navigation Controls:
                </span>
                <span>Click scene &amp; drag mouse to look around</span>
                <span aria-hidden="true">·</span>
                <span>WASD / Arrow keys to walk</span>
                <span aria-hidden="true">·</span>
                <span>Select department presets inside the tour</span>
              </div>
              <span className="font-mono text-[11px] text-teal-700 dark:text-teal-400">
                3D WebGL Architectural Simulation
              </span>
            </div>
          </div>

          {/* Inside Our Studio Departments */}
          <div className="space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
                Inside Our Westlands Studio
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance">
                See where we design, engineer, and grow Kenyan brands
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[#12A150] dark:text-[#00e676] flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Web &amp; App Engineering Wing
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Full-stack engineers crafting fast Next.js storefronts, custom CRM portals, Safaricom Daraja 3.0 M-Pesa checkouts, and KRA eTIMS systems.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  AI Solutions &amp; Automation Lab
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Dedicated AI desk building WhatsApp Cloud API sales assistants, private RAG knowledge bases, and automated ERP invoice workflows.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  SEO &amp; Digital Marketing Desk
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Search strategists running technical Core Web Vitals optimization, Google Ads PPC campaigns, and conversion funnels across East Africa.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Call-to-Action Strip */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-semibold">
                Visit Us In Person or Online
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Ready to meet the team in Westlands, Nairobi?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Drop by Delta Corner Tower or book a 30-minute strategy session to scope your website, AI workflow, or digital marketing campaign.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-5 py-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                Estimate Project Cost
              </button>
              <button
                type="button"
                onClick={onBookVisit}
                style={{ backgroundColor: '#12A150', color: '#ffffff' }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#12A150] hover:bg-[#0e8a43] !text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 !text-white" />
                <span className="!text-white">Book Strategy Call</span>
                <ArrowRight className="w-4 h-4 !text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
