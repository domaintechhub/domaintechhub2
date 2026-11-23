import React, { useEffect, useRef, useState } from 'react';
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
  Hand,
  RotateCcw,
  ScrollText,
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
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);
  const [mobileInteractive, setMobileInteractive] = useState(false);
  const [embedKey, setEmbedKey] = useState(0);

  const isFullscreen = isNativeFullscreen || isPseudoFullscreen;

  // Sync native fullscreen state when user exits with Esc or browser Back gesture
  useEffect(() => {
    const syncFullscreenState = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      const activeEl = doc.fullscreenElement || doc.webkitFullscreenElement || null;
      setIsNativeFullscreen(Boolean(activeEl && activeEl === viewportContainerRef.current));
    };

    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('webkitfullscreenchange', syncFullscreenState);

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState);
    };
  }, []);

  // Lock page scroll & handle Escape key during in-page CSS fullscreen (essential for iOS/mobile)
  useEffect(() => {
    if (!isPseudoFullscreen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPseudoFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isPseudoFullscreen]);

  const handleToggleFullscreen = async () => {
    const container = viewportContainerRef.current as (HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    }) | null;
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };

    if (!container) return;

    if (isPseudoFullscreen) {
      setIsPseudoFullscreen(false);
      return;
    }

    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      try {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      } catch {
        setIsNativeFullscreen(false);
      }
      return;
    }

    // Use reliable CSS 100dvh fullscreen overlay on mobile/touch viewports (avoids iOS Safari unsupported requestFullscreen & popup blockers)
    const isSmallOrTouchViewport =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || window.matchMedia?.('(pointer: coarse)').matches);

    if (isSmallOrTouchViewport || typeof container.requestFullscreen !== 'function') {
      setMobileInteractive(true);
      setIsPseudoFullscreen(true);
      return;
    }

    try {
      await container.requestFullscreen();
      setIsNativeFullscreen(true);
    } catch {
      setMobileInteractive(true);
      setIsPseudoFullscreen(true);
    }
  };

  const handleReloadScene = () => {
    setEmbedKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#faf8f5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-x-clip">
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

      <section className="py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Interactive 3D Walkthrough Frame */}
          <div
            ref={viewportContainerRef}
            className={
              isPseudoFullscreen
                ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#0b1322] flex flex-col overflow-hidden'
                : 'rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col'
            }
          >
            {/* Top Toolbar */}
            <div
              className={`px-4 sm:px-5 py-3 sm:py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shrink-0 ${
                isPseudoFullscreen
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'border-stone-200 dark:border-slate-800 bg-stone-50/90 dark:bg-slate-900/95'
              }`}
            >
              <div className="space-y-0.5 min-w-0">
                <h2
                  className={`text-sm sm:text-lg font-bold tracking-tight ${
                    isPseudoFullscreen ? '!text-white' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  Interactive 3D Nairobi Office Walkthrough
                </h2>
                <div
                  className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs ${
                    isPseudoFullscreen ? '!text-slate-300' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span
                    className={`inline-flex items-center gap-1 font-medium ${
                      isPseudoFullscreen ? '!text-[#00e676]' : 'text-teal-700 dark:text-teal-300'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Delta Corner Tower, Westlands</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Nairobi, Kenya</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className={`flex-1 sm:flex-initial justify-center inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isPseudoFullscreen
                      ? 'bg-slate-800 border-slate-700 hover:border-[#00c853] !text-white'
                      : 'bg-white dark:bg-slate-800 border-stone-200 dark:border-slate-700 hover:border-[#00c853] text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Exit Fullscreen</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Fullscreen</span>
                    </>
                  )}
                </button>

                <a
                  href={TOUR_EMBED_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#12A150', color: '#ffffff' }}
                  className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#12A150] hover:bg-[#0e8a43] !text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                >
                  <span className="!text-white">Open Full Tour</span>
                  <ExternalLink className="w-3.5 h-3.5 !text-white shrink-0" />
                </a>
              </div>
            </div>

            {/* 3D WebGL Tour Embed */}
            <div
              className={`relative w-full bg-[#0b1322] ${
                isFullscreen
                  ? 'flex-1 min-h-0'
                  : 'h-[430px] sm:h-[600px] lg:h-[720px]'
              }`}
            >
              <iframe
                key={embedKey}
                src={TOUR_EMBED_PATH}
                title="Virtual Office Tour | Domain Tech Hub, Nairobi"
                className="w-full h-full border-0 block"
                allow="fullscreen; pointer-lock; accelerometer; gyroscope"
                allowFullScreen
              />

              {/* Mobile Page-Scroll Guard: prevents touch-drag trapping when scrolling on phones */}
              {!isFullscreen && !mobileInteractive && (
                <div className="md:hidden absolute inset-0 z-10 touch-pan-y flex flex-col items-center justify-end pb-5 px-4 bg-gradient-to-t from-[#0b1322]/75 via-transparent to-transparent">
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-full">
                    <button
                      type="button"
                      onClick={() => setMobileInteractive(true)}
                      style={{ backgroundColor: '#12A150', color: '#ffffff' }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#12A150] hover:bg-[#0e8a43] !text-white text-xs font-bold shadow-xl border border-emerald-400/40 cursor-pointer active:scale-95 transition-transform"
                    >
                      <Hand className="w-3.5 h-3.5 !text-white shrink-0" />
                      <span className="!text-white">Tap to Explore 3D</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileInteractive(true);
                        setIsPseudoFullscreen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 !text-white text-xs font-semibold shadow-xl backdrop-blur-md cursor-pointer active:scale-95 transition-transform"
                    >
                      <Maximize2 className="w-3.5 h-3.5 !text-[#00e676] shrink-0" />
                      <span className="!text-white">Full Screen</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Floating Scroll-Unlock Pill while exploring inline on mobile */}
              {!isFullscreen && mobileInteractive && (
                <button
                  type="button"
                  onClick={() => setMobileInteractive(false)}
                  className="md:hidden absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/20 !text-white text-[11px] font-semibold shadow-lg backdrop-blur-md cursor-pointer"
                >
                  <ScrollText className="w-3 h-3 !text-[#00e676] shrink-0" />
                  <span className="!text-white">Scroll Page</span>
                </button>
              )}
            </div>

            {/* Bottom Controls Strip (hidden in pseudo-fullscreen so 3D viewport gets 100% height) */}
            {!isPseudoFullscreen && (
              <div className="px-4 sm:px-5 py-3 bg-stone-50/90 dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="hidden sm:flex flex-wrap items-center gap-2.5">
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    Controls:
                  </span>
                  <span>Drag to orbit</span>
                  <span aria-hidden="true">·</span>
                  <span>WASD / Arrow keys to walk</span>
                  <span aria-hidden="true">·</span>
                  <span>Click rooms or Controls inside tour</span>
                </div>
                <div className="flex sm:hidden flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    Touch:
                  </span>
                  <span>Drag to orbit · Pinch to zoom · Tap rooms</span>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={handleReloadScene}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                    title="Reload 3D viewport"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reload 3D</span>
                  </button>
                  <span className="hidden md:inline font-mono text-[11px] text-teal-700 dark:text-teal-400">
                    3D WebGL Architectural Simulation
                  </span>
                </div>
              </div>
            )}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-3">
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

              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-3">
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

              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-3">
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
          <div className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-semibold">
                Visit Us In Person or Online
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Ready to meet the team in Westlands, Nairobi?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Drop by Delta Corner Tower or book a 30-minute strategy session to scope your website, AI workflow, or digital marketing campaign.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                Estimate Project Cost
              </button>
              <button
                type="button"
                onClick={onBookVisit}
                style={{ backgroundColor: '#12A150', color: '#ffffff' }}
                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#12A150] hover:bg-[#0e8a43] !text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 !text-white shrink-0" />
                <span className="!text-white">Book Strategy Call</span>
                <ArrowRight className="w-4 h-4 !text-white shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
