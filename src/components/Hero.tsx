import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, ArrowDown, ChevronDown, ShieldCheck, 
  Receipt, MapPin, Smartphone, ExternalLink, Activity
} from 'lucide-react';

export type BuildLayerKey = 'build' | 'sell' | 'grow' | 'run';

interface HeroProps {
  onNavigate: (sectionId: string, subTab?: string) => void;
  onSelectCalculatorService?: (serviceId: string) => void;
  onSelectBuildLayer?: (layer: BuildLayerKey) => void;
}

const ROTATING_ITEMS = [
  'websites',
  'M-Pesa online stores',
  'POS & eTIMS systems',
  'custom CRMs',
  'WhatsApp bots',
  'mobile apps'
];

const CHIPS_DATA: Array<{
  id: BuildLayerKey;
  number: string;
  name: string;
  subtitle: string;
}> = [
  { id: 'build', number: '01', name: 'Build', subtitle: 'websites & apps' },
  { id: 'sell', number: '02', name: 'Sell', subtitle: 'payments & POS' },
  { id: 'grow', number: '03', name: 'Grow', subtitle: 'SEO & marketing' },
  { id: 'run', number: '04', name: 'Run', subtitle: 'CRM, AI & support' },
];

export const Hero: React.FC<HeroProps> = ({ 
  onNavigate, 
  onSelectBuildLayer 
}) => {
  const heroRef = useRef<HTMLElement>(null);
  
  // Motion preference and session welcome detection
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [welcomeSkipped, setWelcomeSkipped] = useState(true);
  const [showWelcomeWord, setShowWelcomeWord] = useState(false);

  // Rotating words
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [isRotatingPaused, setIsRotatingPaused] = useState(false);

  // Desktop reticle
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const springX = useSpring(-100, { stiffness: 350, damping: 28 });
  const springY = useSpring(-100, { stiffness: 350, damping: 28 });

  // Scroll parallax scrub: hero text drifts up slightly as Block 2 covers it
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.88]);

  // Check reduced motion & session welcome beat
  useEffect(() => {
    const reduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(reduced);

    const hasSeenWelcome = typeof window !== 'undefined' && 
      sessionStorage.getItem('dth_hero_welcomed') === 'true';

    if (reduced || hasSeenWelcome) {
      setWelcomeSkipped(true);
      setShowWelcomeWord(false);
    } else {
      setWelcomeSkipped(false);
      setShowWelcomeWord(true);

      // Welcome beat: 0 to 1.2s. Slides up, replaced by eyebrow line, never delays headline past 1.2s
      const timer = setTimeout(() => {
        setShowWelcomeWord(false);
        sessionStorage.setItem('dth_hero_welcomed', 'true');
      }, 1150);

      return () => clearTimeout(timer);
    }
  }, []);

  // Rotating text timer (2.2s each, pauses on hover, static under reduced motion)
  useEffect(() => {
    if (isReducedMotion || isRotatingPaused) return;

    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_ITEMS.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isReducedMotion, isRotatingPaused]);

  // Desktop reticle mouse tracking inside hero
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    springX.set(x);
    springY.set(y);
  };

  const handleScrollToBlock2 = (layerId?: BuildLayerKey) => {
    if (layerId && onSelectBuildLayer) {
      onSelectBuildLayer(layerId);
    }
    const block2 = document.getElementById('what-we-build');
    if (block2) {
      block2.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('services');
    }
  };

  // Headline words: "WE BUILD WEBSITES, PAYMENTS & BUSINESS SYSTEMS."
  const headlineWords = ['WE', 'BUILD', 'WEBSITES,', 'PAYMENTS', '&', 'BUSINESS', 'SYSTEMS.'];

  // Base delay offset depending on welcome beat
  const baseDelay = welcomeSkipped ? 0.05 : 0.85;

  return (
    <section 
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringHero(true)}
      onMouseLeave={() => setIsHoveringHero(false)}
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-8 lg:pt-32 lg:pb-12 overflow-hidden bg-[#faf8f5] dark:bg-[#020617] text-slate-900 dark:text-white transition-colors selection:bg-teal-500 selection:text-white"
    >
      {/* 1. Contour Field Rolling Behind Everything (Ink at 8%) */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08] dark:opacity-[0.07] -z-10"
        aria-hidden="true"
      >
        <svg 
          className="w-full h-full object-cover scale-110"
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Topographic rolling contour waves */}
          <path d="M-100,120 C300,180 600,-40 1000,160 C1280,290 1480,180 1600,240" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,240 C280,310 580,90 980,280 C1260,400 1440,300 1600,360" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,360 C260,440 560,220 960,400 C1240,510 1420,420 1600,480" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,480 C240,570 540,350 940,520 C1220,620 1400,540 1600,600" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,600 C220,700 520,480 920,640 C1200,730 1380,660 1600,720" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,720 C200,830 500,610 900,760 C1180,840 1360,780 1600,840" stroke="currentColor" strokeWidth="1.5" />
          {/* Cross grid technical coordinates */}
          <circle cx="240" cy="180" r="3" fill="currentColor" />
          <circle cx="720" cy="360" r="3" fill="currentColor" />
          <circle cx="1200" cy="540" r="3" fill="currentColor" />
          <line x1="230" y1="180" x2="250" y2="180" stroke="currentColor" strokeWidth="1" />
          <line x1="240" y1="170" x2="240" y2="190" stroke="currentColor" strokeWidth="1" />
          <line x1="710" y1="360" x2="730" y2="360" stroke="currentColor" strokeWidth="1" />
          <line x1="720" y1="350" x2="720" y2="370" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* 2. Desktop Cursor Reticle */}
      {!isReducedMotion && isHoveringHero && (
        <motion.div
          style={{ x: springX, y: springY }}
          className="hidden md:flex pointer-events-none absolute -top-4 -left-4 z-40 items-center justify-center"
          aria-hidden="true"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Reticle Ring */}
            <div className="absolute inset-0 rounded-full border border-teal-500/40 dark:border-teal-400/40" />
            {/* Crosshairs */}
            <div className="w-2.5 h-[1px] bg-teal-600 dark:text-teal-400" />
            <div className="h-2.5 w-[1px] bg-teal-600 dark:text-teal-400 absolute" />
            {/* Real-time coordinates badge */}
            <span className="absolute -bottom-4 -right-12 text-[9px] font-mono tracking-tighter text-teal-700/70 dark:text-teal-300/60 bg-white/80 dark:bg-slate-900/80 px-1 py-0.5 rounded border border-teal-500/20">
              {Math.max(0, Math.round(mousePos.x))}:{Math.max(0, Math.round(mousePos.y))}
            </span>
          </div>
        </motion.div>
      )}

      {/* 3. Welcome Beat: "Karibu." in Accent (0 to 1.2s, never blocks interaction) */}
      <AnimatePresence>
        {showWelcomeWord && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -45, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
            aria-live="polite"
          >
            <div className="text-center px-4">
              <span className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-teal-600 dark:text-teal-400 drop-shadow-sm">
                Karibu.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Main Hero Container with Parallax Scrub */}
      <motion.div 
        style={{ y: heroParallaxY, opacity: heroOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-1 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center">
          
          {/* Main Left-Center Column (Full width on <1280px, 8 cols on xl) */}
          <div className="xl:col-span-8 flex flex-col items-start text-left">
            
            {/* Eyebrow: `karibu · welcome to domain tech hub` with live dot that pulses */}
            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: welcomeSkipped ? 0 : 0.6 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 mb-5 rounded-md bg-stone-200/60 dark:bg-slate-900/80 border border-stone-300/80 dark:border-slate-800 text-xs sm:text-sm font-mono lowercase tracking-wide text-slate-800 dark:text-slate-300"
            >
              {/* Pulsing live dot (spring loop) */}
              <motion.span 
                animate={isReducedMotion ? {} : { scale: [1, 1.45, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 shrink-0"
                aria-hidden="true"
              />
              <span className="font-medium">karibu · welcome to domain tech hub</span>
            </motion.div>

            {/* H1: Word-by-word reveal, 96px, accent full stop */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[96px] font-black tracking-tight uppercase leading-[0.96] text-slate-900 dark:text-white mb-6">
              {headlineWords.map((word, idx) => {
                const isLast = idx === headlineWords.length - 1;
                // Word stagger 110ms
                const wordDelay = baseDelay + idx * 0.11;

                return (
                  <motion.span
                    key={`${word}-${idx}`}
                    initial={isReducedMotion ? {} : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22, delay: wordDelay }}
                    className="inline-block mr-[0.26em]"
                  >
                    {isLast ? (
                      <>
                        <span>{word.replace('.', '')}</span>
                        <span className="text-teal-600 dark:text-teal-400">.</span>
                      </>
                    ) : (
                      word
                    )}
                  </motion.span>
                );
              })}
            </h1>

            {/* Subline: Uppercase, 1.1 leading, one sentence (fades up at +400ms) */}
            <motion.p
              initial={isReducedMotion ? {} : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: baseDelay + 0.4 }}
              className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 leading-[1.1] max-w-2xl mb-4"
            >
              A NAIROBI ENGINEERING STUDIO HELPING KENYAN BUSINESSES SELL ONLINE, GET PAID WITH M-PESA, AND RUN SMOOTHLY.
            </motion.p>

            {/* "What we do" line with rotating spring word (at +700ms) */}
            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: baseDelay + 0.7 }}
              onMouseEnter={() => setIsRotatingPaused(true)}
              onMouseLeave={() => setIsRotatingPaused(false)}
              className="flex items-center flex-wrap gap-2 text-sm sm:text-base md:text-lg font-medium text-slate-800 dark:text-slate-200 mb-8"
            >
              <span className="text-slate-600 dark:text-slate-400">We build</span>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">[</span>
              
              <div className="relative inline-flex h-8 items-center overflow-hidden min-w-[210px] sm:min-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isReducedMotion ? 0 : rotatingIndex}
                    initial={isReducedMotion ? {} : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={isReducedMotion ? {} : { y: -24, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 25 }}
                    className="absolute font-bold text-teal-700 dark:text-teal-300 font-mono"
                  >
                    {ROTATING_ITEMS[rotatingIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">]</span>
            </motion.div>

            {/* Four quick-pick chips (chamfered, bracket corners, accent flood on hover, rise in staggered 90ms) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl mb-8">
              {CHIPS_DATA.map((chip, idx) => {
                const chipDelay = baseDelay + 0.9 + idx * 0.09;
                return (
                  <motion.div
                    key={chip.id}
                    initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22, delay: chipDelay }}
                    className="flex flex-col"
                  >
                    <button
                      onClick={() => handleScrollToBlock2(chip.id)}
                      className="chamfer-chip relative px-3 py-2.5 bg-stone-100 dark:bg-slate-900 border border-stone-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-bold tracking-tight text-left transition-all duration-200 hover:bg-teal-600 hover:text-white hover:border-teal-600 dark:hover:bg-teal-600 dark:hover:text-white group active:scale-[0.98]"
                      title={`Jump to ${chip.name} in Block 2`}
                    >
                      {/* Bracket corners aesthetic */}
                      <span className="text-teal-600 dark:text-teal-400 group-hover:text-white mr-1">[</span>
                      <span>{chip.number} {chip.name}</span>
                      <span className="text-teal-600 dark:text-teal-400 group-hover:text-white ml-1">]</span>
                    </button>
                    {/* 12px line directly under chip */}
                    <span className="text-[12px] text-slate-600 dark:text-slate-400 font-mono tracking-tight mt-1.5 pl-1">
                      {chip.subtitle}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Primary actions (one row, chamfered buttons, at +1300ms) */}
            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: baseDelay + 1.3 }}
              className="flex items-center flex-wrap gap-4 mb-6"
            >
              {/* `get a free quote` (filled accent chamfered CTA) -> /contact */}
              <button
                onClick={() => onNavigate('contact')}
                className="chamfer-btn px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base tracking-wide uppercase transition-all duration-200 shadow-md shadow-teal-600/20 active:scale-[0.98] flex items-center gap-2"
              >
                <span>get a free quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* `see what we build` (hollow chamfered CTA, spring-bobbing arrow) -> Block 2 */}
              <button
                onClick={() => handleScrollToBlock2()}
                className="chamfer-btn px-6 py-3.5 bg-transparent border-2 border-slate-900/80 dark:border-slate-300 text-slate-900 dark:text-white font-bold text-sm sm:text-base tracking-wide uppercase hover:bg-stone-200/70 dark:hover:bg-slate-800 transition-all duration-200 active:scale-[0.98] flex items-center gap-2 group"
              >
                <span>see what we build</span>
                <motion.span
                  animate={isReducedMotion ? {} : { y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  <ArrowDown className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:translate-y-0.5 transition-transform" />
                </motion.span>
              </button>
            </motion.div>

            {/* Trust line: small, under actions, three items with icons (at +1500ms) */}
            <motion.div
              initial={isReducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: baseDelay + 1.5 }}
              className="flex items-center flex-wrap gap-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="font-semibold">M-Pesa Daraja 3.0 ready</span>
              </div>
              <span className="text-slate-400 dark:text-slate-600 font-mono">·</span>
              
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="font-semibold">KRA eTIMS integrated</span>
              </div>
              <span className="text-slate-400 dark:text-slate-600 font-mono">·</span>

              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="font-semibold">Westlands, Nairobi</span>
              </div>
            </motion.div>

          </div>

          {/* Right side bracket panels (Demoted: only show above 1280px / xl:block) */}
          <div className="hidden xl:flex xl:col-span-4 flex-col gap-4">
            
            {/* Bracket Panel 1: Daraja Gateway Telemetry */}
            <div className="chamfer-card p-4 bg-white/90 dark:bg-slate-900/90 border border-stone-300 dark:border-slate-800 shadow-sm font-mono">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-800 pb-2 mb-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-teal-600 dark:text-teal-400">[ 01 / DARAJA 3.0 ]</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  STK ENGINE LIVE
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Latency Avg:</span>
                  <span className="font-bold">280ms STK Push</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Webhook SLA:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">99.98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Protocols:</span>
                  <span>C2B · B2C · Express 3.0</span>
                </div>
              </div>
            </div>

            {/* Bracket Panel 2: KRA eTIMS Fiscal Core */}
            <div className="chamfer-card p-4 bg-white/90 dark:bg-slate-900/90 border border-stone-300 dark:border-slate-800 shadow-sm font-mono">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-800 pb-2 mb-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-teal-600 dark:text-teal-400">[ 02 / eTIMS VSCU ]</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">KRA COMPLIANT</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fiscal Device:</span>
                  <span className="font-bold">Type C & Type E API</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">QR Generation:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">Automated Instant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Inventory Sync:</span>
                  <span>Real-Time Cloud Ledger</span>
                </div>
              </div>
            </div>

            {/* Bracket Panel 3: High Performance Web Stack */}
            <div className="chamfer-card p-4 bg-white/90 dark:bg-slate-900/90 border border-stone-300 dark:border-slate-800 shadow-sm font-mono">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-800 pb-2 mb-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-teal-600 dark:text-teal-400">[ 03 / RUNTIME ]</span>
                <span className="text-[11px] text-blue-600 dark:text-blue-400">SUB-SECOND</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Architecture:</span>
                  <span className="font-bold">React 19 / TypeScript</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TTFB Benchmark:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">&lt; 1.2s Vitals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Edge CDN:</span>
                  <span>Nairobi Local Peering</span>
                </div>
              </div>
            </div>

            {/* Bracket Panel 4: Studio Presence */}
            <div className="chamfer-card p-3 bg-stone-100/70 dark:bg-slate-950/70 border border-stone-300 dark:border-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>[ NAIROBI STUDIO ]</span>
              <span className="text-slate-900 dark:text-slate-200 font-medium">Westlands Commercial Centre</span>
            </div>

          </div>

        </div>
      </motion.div>

      {/* 5. Service Counter Strip at Foot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 pt-4 border-t border-stone-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
          
          {/* Left: `01 / 16 services` */}
          <div className="flex items-center gap-2 font-bold tracking-tight text-slate-900 dark:text-white shrink-0">
            <span className="px-2 py-0.5 rounded bg-stone-200/80 dark:bg-slate-800 text-teal-700 dark:text-teal-300 font-mono text-[11px]">
              01 / 16 services
            </span>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-normal">
              engineered for Kenyan commerce
            </span>
          </div>

          {/* Center: dashed connector crawling toward scroll arrow */}
          <div className="flex-1 mx-4 sm:mx-8 border-b border-dashed border-stone-300 dark:border-slate-700 h-[1px]" />

          {/* Right: scroll arrow */}
          <button
            onClick={() => handleScrollToBlock2()}
            className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium shrink-0 group"
            title="Scroll down to Block 2: What We Build"
          >
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">explore block 2</span>
            <motion.span
              animate={isReducedMotion ? {} : { y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="p-1 rounded bg-stone-200/70 dark:bg-slate-800 group-hover:bg-teal-600 group-hover:text-white transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>

        </div>
      </div>

    </section>
  );
};
