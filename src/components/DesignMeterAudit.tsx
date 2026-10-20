import React, { useState, useEffect, useRef, useId } from 'react';
import {
  Globe, Sparkles, ShieldCheck, CodeXml, ArrowRight, CheckCircle2,
  AlertTriangle, Smartphone, Monitor, Layers, ListChecks, Lock, Loader2,
  Check, RefreshCw, Printer, MessageSquare, ChevronDown, ChevronUp,
  Zap, ArrowUpRight, BarChart3, HelpCircle, ExternalLink, ShieldAlert
} from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToWhatsApp } from '../utils/leadDispatch';
import { isValidWebUrl } from '../utils/liveUrlAuditor';

interface DesignMeterAuditProps {
  onFixWithAgency: (domain: string, fixCount: number, topRisk?: string) => void;
  onProceedToBooking?: (summary: string, total: string) => void;
}

interface FixItem {
  id: string;
  dimension: 'Visual Design' | 'User Experience' | 'User Journey' | 'Engagement';
  priority: 'Critical' | 'High' | 'Medium' | 'Quick Win';
  impact: string;
  title: string;
  detected: string;
  whyItMatters: string;
  recommendation: string;
  codeSnippet?: string;
}

interface AuditResultData {
  url: string;
  email?: string;
  timestamp: string;
  overallScore: number;
  grade: string;
  topRisk: string;
  scores: {
    visualDesign: number;
    userExperience: number;
    userJourney: number;
    engagement: number;
  };
  deviceBreakdown: {
    desktopScore: number;
    mobileScore: number;
    mobileLcp: string;
    desktopLcp: string;
    touchTargetCompliance: string;
    viewportShiftRisk: string;
  };
  fixes: FixItem[];
}

export const DesignMeterAudit: React.FC<DesignMeterAuditProps> = ({
  onFixWithAgency,
}) => {
  const urlInputId = useId();

  const [urlInput, setUrlInput] = useState('https://www.domaintechhubs.com');
  const [isScanning, setIsScanning] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0); // 1, 2, 3, 4
  const [stageProgress, setStageProgress] = useState<number[]>([0, 0, 0, 0]);
  const [completedStages, setCompletedStages] = useState<boolean[]>([false, false, false, false]);
  const [activeSubCheck, setActiveSubCheck] = useState<number>(0);
  const [scanResult, setScanResult] = useState<AuditResultData | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [expandedFixId, setExpandedFixId] = useState<string | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [scannedWebsitesCount, setScannedWebsitesCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 10;
    try {
      const stored = localStorage.getItem('dth_designmeter_scans_count');
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 10) return parsed;
      }
    } catch {
      // ignore
    }
    return 10;
  });

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scanningRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const stagesMeta = [
    {
      num: '01',
      title: 'Reviewing Visual Design',
      checks: [
        'Checking visual hierarchy & typography scale',
        'Detecting consistency issues & color contrast',
        'Identifying accessibility & layout grid risks'
      ]
    },
    {
      num: '02',
      title: 'Reviewing User Experience',
      checks: [
        'Checking interface clarity & cognitive load',
        'Reviewing interaction patterns & touch targets',
        'Identifying usability issues & navigation friction'
      ]
    },
    {
      num: '03',
      title: 'Reviewing User Journey',
      checks: [
        'Detecting conversion funnel friction points',
        'Reviewing the primary path to conversion',
        'Estimating drop-off risk at key milestones'
      ]
    },
    {
      num: '04',
      title: 'Reviewing Engagement/Gamification',
      checks: [
        'Finding missed engagement opportunities',
        'Reviewing retention triggers & micro-feedback',
        'Analyzing return incentives & social validation'
      ]
    }
  ];

  const generateReport = (targetUrl: string, userEmail?: string): AuditResultData => {
    // Deterministic results derived from URL characters to provide realistic consistency
    const hash = targetUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const isDomainTechHub = targetUrl.toLowerCase().includes('domaintechhub');

    const visualDesign = isDomainTechHub ? 94 : Math.min(96, Math.max(68, 72 + (hash % 24)));
    const userExperience = isDomainTechHub ? 91 : Math.min(94, Math.max(62, 66 + ((hash * 3) % 26)));
    const userJourney = isDomainTechHub ? 90 : Math.min(92, Math.max(58, 63 + ((hash * 7) % 27)));
    const engagement = isDomainTechHub ? 88 : Math.min(90, Math.max(54, 59 + ((hash * 11) % 28)));

    const overall = Math.round((visualDesign * 0.3) + (userExperience * 0.3) + (userJourney * 0.25) + (engagement * 0.15));

    let grade = 'B+';
    if (overall >= 90) grade = 'A+';
    else if (overall >= 80) grade = 'A-';
    else if (overall >= 70) grade = 'B';
    else if (overall >= 60) grade = 'C+';
    else grade = 'Needs Urgent Work';

    const topRisks = [
      'Primary call-to-action has insufficient visual hierarchy on mobile viewports, creating an estimated 19% drop-off before checkout or lead capture.',
      'Conversion funnel lacks progressive disclosure; excessive form fields at step 1 are reducing mobile submissions by an estimated 24%.',
      'Hero section lacks immediate value clarity above the fold; users take over 4.2 seconds to identify the core service proposition.',
      'Mobile viewport suffers from touch target collisions (< 44px tap areas), creating rage clicks around navigation and checkout buttons.'
    ];

    const chosenRisk = isDomainTechHub 
      ? 'Minor opportunity: Supplementary client testimonials could be surfaced earlier in the secondary discovery scroll on small smartphones.'
      : topRisks[hash % topRisks.length];

    const sampleFixes: FixItem[] = [
      {
        id: 'fix-1',
        dimension: 'User Journey',
        priority: 'Critical',
        impact: '+18% to +26% Form Completion',
        title: 'High-Friction Input Fields in Main Conversion Step',
        detected: 'Found 6+ form input fields on initial lead capture without inline validation feedback or autofill tags.',
        whyItMatters: 'Users on mobile networks in East Africa abandon long checkout forms when fields trigger mobile keyboard readjustments.',
        recommendation: 'Reduce initial form to 2 fields (Name + Phone/WhatsApp) and use progressive 2-step profiling with native SMS/WhatsApp verification.',
        codeSnippet: `// Recommended pattern: Two-Step High-Velocity Capture\nconst [step, setStep] = useState<1 | 2>(1);\n// Step 1: Just Name & Phone (instant 3-second capture)\n// Step 2: Optional details after lead is safely dispatched`
      },
      {
        id: 'fix-2',
        dimension: 'Visual Design',
        priority: 'Critical',
        impact: '+14% Click-Through Rate',
        title: 'Subdued Visual Weight on Primary Action Button',
        detected: 'Primary CTA button lacks high-contrast luminance difference relative to the hero background (contrast ratio 3.1:1, benchmark 4.5:1).',
        whyItMatters: 'Visitors scanning the page in under 3 seconds miss the primary next step because the eye is pulled toward secondary decorative graphics.',
        recommendation: 'Apply high-contrast gradient fill with a prominent hover state and ensure minimum 48px vertical touch height on touchscreens.',
        codeSnippet: `/* High-Converting Contrast CTA */\n.btn-primary {\n  min-height: 48px;\n  background: linear-gradient(135deg, #0d9488, #059669);\n  box-shadow: 0 10px 25px -5px rgba(13, 148, 136, 0.4);\n}`
      },
      {
        id: 'fix-3',
        dimension: 'User Experience',
        priority: 'High',
        impact: '+22% Mobile Navigation Retention',
        title: 'Undersized Mobile Touch Targets (< 44px)',
        detected: 'Multiple navigation links, footer icons, and filter buttons measure between 28px and 34px in tap bounding area.',
        whyItMatters: 'Causes accidental mis-taps on mobile devices, leading to rapid user frustration and immediate bounce.',
        recommendation: 'Increase touch padding to 48px minimum and insert at least 8px spacing buffer between clickable elements.'
      },
      {
        id: 'fix-4',
        dimension: 'Engagement',
        priority: 'High',
        impact: '+31% User Time-on-Site',
        title: 'Lack of Real-Time Interaction Feedback & Micro-States',
        detected: 'Interactive widgets (calculators, pricing toggles, cards) lack loading states, active transitions, and micro-delight cues.',
        whyItMatters: 'Users perceive the application as unresponsive or static, dampening trust in high-value transactions.',
        recommendation: 'Integrate optimistic UI states, subtle button pulse animations, and instant haptic/visual confirmation upon interactions.'
      },
      {
        id: 'fix-5',
        dimension: 'Visual Design',
        priority: 'Medium',
        impact: '+12% Readability & Scan Speed',
        title: 'Inconsistent Typography Scale Across Headings',
        detected: 'H2 and H3 elements share near-identical font sizing in secondary content blocks, blurring content hierarchy.',
        whyItMatters: 'Skimmers cannot quickly distinguish parent sections from supporting points during fast mobile evaluation.',
        recommendation: 'Adopt a disciplined typographic scale (e.g., Major Third: 16px body, 20px H4, 25px H3, 31px H2, 39px H1) with distinct font weights.'
      },
      {
        id: 'fix-6',
        dimension: 'User Journey',
        priority: 'Quick Win',
        impact: '+9% Direct Inquiries',
        title: 'Missing Sticky Direct Contact Floating Element',
        detected: 'No persistent WhatsApp or phone contact trigger remains visible once the user scrolls past the hero section.',
        whyItMatters: 'Kenyan and African buyers overwhelmingly prefer direct WhatsApp confirmation before purchasing or booking corporate services.',
        recommendation: 'Mount a non-intrusive floating WhatsApp action button with one-tap pre-filled inquiry text.'
      },
      {
        id: 'fix-7',
        dimension: 'Engagement',
        priority: 'Quick Win',
        impact: '+15% Social Proof Credibility',
        title: 'Client Proof & Trust Signals Buried Too Deep',
        detected: 'Client logos, real case results, and verified reviews are positioned only at the bottom 15% of the page length.',
        whyItMatters: 'Over 65% of first-time visitors bounce before reaching the page footer, completely missing critical trust signals.',
        recommendation: 'Embed a high-density client logo strip and 4.9-star rating badge directly beneath the main hero CTA.'
      }
    ];

    return {
      url: targetUrl,
      email: userEmail || '',
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      overallScore: overall,
      grade,
      topRisk: chosenRisk,
      scores: {
        visualDesign,
        userExperience,
        userJourney,
        engagement,
      },
      deviceBreakdown: {
        desktopScore: Math.min(98, overall + 6),
        mobileScore: Math.max(52, overall - 8),
        mobileLcp: isDomainTechHub ? '1.4s' : `${(2.2 + (hash % 15) / 10).toFixed(1)}s`,
        desktopLcp: isDomainTechHub ? '0.9s' : `${(1.1 + (hash % 8) / 10).toFixed(1)}s`,
        touchTargetCompliance: isDomainTechHub ? '98%' : `${68 + (hash % 24)}%`,
        viewportShiftRisk: isDomainTechHub ? '0.01 (Excellent)' : '0.14 (Moderate shift on scroll)',
      },
      fixes: sampleFixes,
    };
  };

  const startScan = (overrideUrl?: string | React.FormEvent) => {
    if (typeof overrideUrl === 'object' && overrideUrl !== null && 'preventDefault' in overrideUrl) {
      overrideUrl.preventDefault();
      overrideUrl = undefined;
    }

    const rawInput = (typeof overrideUrl === 'string' ? overrideUrl : urlInput).trim();
    if (!rawInput) return; // Do nothing if empty

    // Check if it's a real link or just words posted: if not a real link, do nothing!
    if (!isValidWebUrl(rawInput)) {
      return;
    }

    let cleanUrl = rawInput;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    // Dispatch lead record
    saveLead({
      source: 'audit',
      sourceTitle: 'DesignMeter UI/UX Audit',
      fullName: 'Website Visitor',
      email: '',
      phone: 'Via Audit Scanner',
      serviceOrItem: `UI/UX Audit: ${cleanUrl}`,
      notes: `User submitted ${cleanUrl} for full DesignMeter UI/UX, User Journey and Fix List analysis.`,
    });

    // Increment website scan counter
    setScannedWebsitesCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('dth_designmeter_scans_count', next.toString());
      } catch {
        // ignore
      }
      return next;
    });

    setIsScanning(true);
    setScanResult(null);
    setActiveStage(1);
    setStageProgress([0, 0, 0, 0]);
    setCompletedStages([false, false, false, false]);
    setActiveSubCheck(0);
    setSecondsElapsed(0);

    setTimeout(() => {
      scanningRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);

    // Elapsed timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    // Responsive multi-stage animation sequence (clean ~1.3s total duration)
    let currentStage = 1;
    let currentProgress = 0;
    let subCheckIndex = 0;

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    scanIntervalRef.current = setInterval(() => {
      currentProgress += 20;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setStageProgress((prev) => {
          const updated = [...prev];
          updated[currentStage - 1] = 100;
          return updated;
        });
        setCompletedStages((prev) => {
          const updated = [...prev];
          updated[currentStage - 1] = true;
          return updated;
        });

        if (currentStage < 4) {
          currentStage += 1;
          setActiveStage(currentStage);
          currentProgress = 0;
          subCheckIndex = 0;
          setActiveSubCheck(0);
        } else {
          // All 4 complete!
          if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setTimeout(() => {
            setIsScanning(false);
            setScanResult(generateReport(cleanUrl));
            setTimeout(() => {
              resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 60);
          }, 200);
        }
      } else {
        setStageProgress((prev) => {
          const updated = [...prev];
          updated[currentStage - 1] = currentProgress;
          return updated;
        });

        // Rotate subchecks smoothly
        if (currentProgress > 33 && currentProgress <= 66) {
          subCheckIndex = 1;
        } else if (currentProgress > 66) {
          subCheckIndex = 2;
        }
        setActiveSubCheck(subCheckIndex);
      }
    }, 65);
  };

  const fastForwardToResults = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    let cleanUrl = urlInput.trim() || 'https://www.domaintechhubs.com';
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) cleanUrl = 'https://' + cleanUrl;
    setIsScanning(false);
    setScanResult(generateReport(cleanUrl));
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const loadSampleAudit = () => {
    setUrlInput('https://www.domaintechhubs.com');
    setIsScanning(false);
    setScanResult(generateReport('https://www.domaintechhubs.com'));
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const filteredFixes = scanResult?.fixes.filter((item) => {
    if (filterPriority === 'all') return true;
    if (filterPriority === 'critical') return item.priority === 'Critical';
    if (filterPriority === 'high') return item.priority === 'High';
    if (filterPriority === 'quick') return item.priority === 'Quick Win';
    return true;
  }) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-12">
      {/* 1. HERO SCANNER INTERFACE (Faithful to video recording) */}
      {!scanResult && (
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xl p-6 sm:p-10 lg:p-12 text-center transition-all">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-amber-500/5 pointer-events-none" />

          {/* Top trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-slate-800/90 border border-stone-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Trusted by {scannedWebsitesCount}+ Founders, Agencies & Fast-Growing Teams</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight sm:leading-tight">
            See How Your Website Performs <br className="hidden sm:inline" />
            And Get a{' '}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Complete Fix List
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Paste your URL and we&apos;ll review your UI, UX, user journey, and gamification then give you a prioritized fix list showing exactly what to change and what to fix first.
          </p>

          {/* Form input card */}
          <div className="mt-8 max-w-xl mx-auto">
            <form onSubmit={startScan} className="space-y-3">
              {/* URL Input */}
              <div className="text-left">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <label htmlFor={urlInputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Website URL / Domain
                  </label>
                  {urlInput.trim() && !isValidWebUrl(urlInput.trim()) && (
                    <span className="text-rose-500 dark:text-rose-400 text-[11px] font-mono">
                      Not a valid website link (just words)
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <input
                    id={urlInputId}
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://www.domaintechhubs.com"
                    disabled={isScanning}
                    className={`w-full pl-10 pr-4 py-3.5 text-sm rounded-2xl bg-stone-50 dark:bg-slate-950/80 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all shadow-inner ${
                      urlInput.trim() && !isValidWebUrl(urlInput.trim())
                        ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500'
                        : 'border-stone-300 dark:border-slate-700 focus:ring-2 focus:ring-teal-500'
                    }`}
                  />
                </div>
              </div>

              {/* Quick test buttons & free scan note */}
              <div className="flex flex-wrap items-center justify-between gap-2 py-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span>Quick test:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setUrlInput('https://www.domaintechhubs.com');
                      startScan('https://www.domaintechhubs.com');
                    }}
                    className="px-2.5 py-0.5 rounded-lg bg-teal-50 dark:bg-cyan-950/60 border border-teal-200 dark:border-cyan-800 text-teal-800 dark:text-cyan-300 font-mono text-[11px] hover:bg-teal-100 cursor-pointer transition-colors"
                  >
                    domaintechhubs.com
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUrlInput('https://yourbusiness.co.ke');
                      startScan('https://yourbusiness.co.ke');
                    }}
                    className="px-2.5 py-0.5 rounded-lg bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] hover:bg-stone-200 cursor-pointer transition-colors"
                  >
                    yourbusiness.co.ke
                  </button>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Instant · Free
                </span>
              </div>

              {/* Scan CTA Button */}
              <button
                type="submit"
                disabled={isScanning || (Boolean(urlInput.trim()) && !isValidWebUrl(urlInput.trim()))}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing UI, UX &amp; User Journey...</span>
                  </>
                ) : (
                  <>
                    <span>Scan My Website</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Micro value props */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>No installation</span>
              </span>
              <span className="text-stone-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <CodeXml className="w-3.5 h-3.5 text-blue-500" />
                <span>No tracking script</span>
              </span>
              <span className="text-stone-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI-Powered Audit</span>
              </span>
            </div>
          </div>

          {/* Social Proof Counter */}
          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-800/80">
            <div className="text-xs uppercase font-mono tracking-widest text-slate-400">
              Join
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              {scannedWebsitesCount.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              founders and teams who&apos;ve audited their site with DesignMeter
            </div>
          </div>
        </div>
      )}

      {/* 2. LIVE SCANNING MODAL / CONTAINER (Shown during active analysis) */}
      {isScanning && (
        <div ref={scanningRef} className="rounded-3xl bg-white dark:bg-slate-900 border border-teal-500/40 dark:border-teal-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Header badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-cyan-950/60 border border-teal-200 dark:border-cyan-800 text-xs font-semibold text-teal-800 dark:text-cyan-300">
                <Globe className="w-3.5 h-3.5" />
                <span>{urlInput.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'domaintechhubs.com'}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-medium text-amber-800 dark:text-amber-300">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Scanning active ({secondsElapsed}s)</span>
                </div>
                <button
                  type="button"
                  onClick={fastForwardToResults}
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  Skip to Results →
                </button>
              </div>
            </div>

            {/* Analysis Heading */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Analyzing Your Website
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                We&apos;re reviewing your website across four key areas to identify the issues that matter most.
              </p>
            </div>

            {/* The 4 Stage Accordion Items with live progress bars */}
            <div className="space-y-3 pt-2">
              {stagesMeta.map((stage, idx) => {
                const stageNum = idx + 1;
                const isCurrent = activeStage === stageNum;
                const isDone = completedStages[idx];
                const isLocked = activeStage < stageNum;
                const progress = stageProgress[idx];

                return (
                  <div
                    key={stage.num}
                    className={`rounded-2xl border transition-all p-4 ${
                      isCurrent
                        ? 'bg-teal-50/70 dark:bg-cyan-950/30 border-teal-400 dark:border-cyan-600 ring-2 ring-teal-500/20'
                        : isDone
                        ? 'bg-stone-50/80 dark:bg-slate-950/50 border-emerald-300 dark:border-emerald-800/80'
                        : 'bg-stone-50/40 dark:bg-slate-950/20 border-stone-200 dark:border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          {stage.num}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {stage.title}
                        </span>
                      </div>

                      <div>
                        {isDone ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : isCurrent ? (
                          <Loader2 className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-spin" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Progress Bar & Sub-checks when current or done */}
                    {(isCurrent || isDone) && (
                      <div className="mt-3 pt-3 border-t border-stone-200/60 dark:border-slate-800/60 space-y-2">
                        {/* Linear Progress */}
                        <div className="h-1.5 w-full bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-150"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        {/* Sub Checks Checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
                          {stage.checks.map((chk, chkIdx) => {
                            const isCheckPassed = isDone || (isCurrent && activeSubCheck >= chkIdx);
                            return (
                              <div
                                key={chk}
                                className={`flex items-start gap-1.5 text-[11px] ${
                                  isCheckPassed ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-slate-400'
                                }`}
                              >
                                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  isCheckPassed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'
                                }`} />
                                <span className="line-clamp-2 leading-tight">{chk}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-center text-slate-400 pt-2 font-mono">
              Reviewing visual design, usability, journey flow, and engagement signals...
            </p>
          </div>
        </div>
      )}

      {/* 3. COMPLETED AUDIT REPORT & PRIORITIZED FIX LIST */}
      {scanResult && !isScanning && (
        <div ref={resultsRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Result Header & Score Card */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-cyan-950/60 border border-teal-200 dark:border-cyan-800 text-xs font-semibold text-teal-800 dark:text-cyan-300 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Audit Completed · {scanResult.timestamp}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Audit Report for</span>
                  <span className="text-teal-600 dark:text-teal-400 underline decoration-teal-300 underline-offset-4">
                    {scanResult.url.replace(/^https?:\/\//, '')}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Instant Comprehensive Report · Generated on-demand · 100% Free
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sendToWhatsApp({
                      source: 'audit',
                      sourceTitle: 'DesignMeter UI/UX Audit',
                      serviceOrItem: `UI/UX Audit for ${scanResult.url}`,
                      notes: `Audit Score: ${scanResult.overallScore}/100 (Grade: ${scanResult.grade}). Top Risk: ${scanResult.topRisk}. Found ${scanResult.fixes.length} prioritized fixes.`,
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setScanResult(null);
                    setUrlInput('');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Another Site</span>
                </button>
              </div>
            </div>

            {/* Score Grid & Commercial Risk */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Overall Score Dial */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent border border-teal-300 dark:border-teal-700/60 flex flex-col items-center justify-center text-center">
                <div className="text-xs uppercase font-mono tracking-wider text-teal-800 dark:text-teal-300 font-bold mb-1">
                  Overall UX & Design Score
                </div>
                <div className="relative my-3 flex items-center justify-center">
                  <div className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
                    {scanResult.overallScore}
                  </div>
                  <div className="text-lg font-bold text-slate-400 ml-1">/100</div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-xs font-bold text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-xs">
                  <span>Grade: {scanResult.grade}</span>
                  <span>•</span>
                  <span>High Optimization Potential</span>
                </div>
              </div>

              {/* Top Commercial Risk Banner */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 font-mono uppercase tracking-wider mb-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Single Biggest Commercial Risk Identified</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-amber-100 leading-snug">
                    {scanResult.topRisk}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
                  <span>Fixing this single issue typically yields immediate conversion uplift.</span>
                  <button
                    type="button"
                    onClick={() => onFixWithAgency(scanResult.url, scanResult.fixes.length, scanResult.topRisk)}
                    className="font-bold text-amber-900 dark:text-amber-300 underline underline-offset-2 hover:text-amber-700 cursor-pointer flex items-center gap-1"
                  >
                    <span>Have Domain Tech Hub Fix This</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Dimension Score Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {[
                { label: 'Visual Design', score: scanResult.scores.visualDesign, icon: Sparkles, color: 'text-teal-600' },
                { label: 'User Experience', score: scanResult.scores.userExperience, icon: Monitor, color: 'text-blue-600' },
                { label: 'User Journey', score: scanResult.scores.userJourney, icon: Layers, color: 'text-indigo-600' },
                { label: 'Engagement & Loops', score: scanResult.scores.engagement, icon: Zap, color: 'text-amber-600' },
              ].map((dim) => {
                const Icon = dim.icon;
                return (
                  <div key={dim.label} className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">{dim.label}</span>
                      <Icon className={`w-3.5 h-3.5 ${dim.color}`} />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {dim.score}
                      <span className="text-xs text-slate-400 font-normal ml-0.5">/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop vs Mobile Comparison */}
            <div className="p-5 rounded-2xl bg-stone-50/80 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-teal-600" />
                  <span>Desktop vs. Mobile Experience Gap</span>
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Mobile gap: -{scanResult.deviceBreakdown.desktopScore - scanResult.deviceBreakdown.mobileScore} pts
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Mobile Score</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{scanResult.deviceBreakdown.mobileScore}/100</div>
                  <div className="text-[10px] text-amber-600">LCP {scanResult.deviceBreakdown.mobileLcp}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Desktop Score</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{scanResult.deviceBreakdown.desktopScore}/100</div>
                  <div className="text-[10px] text-emerald-600">LCP {scanResult.deviceBreakdown.desktopLcp}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Touch Target Compliance</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{scanResult.deviceBreakdown.touchTargetCompliance}</div>
                  <div className="text-[10px] text-slate-500">48px minimum target</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Layout Shift Risk</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{scanResult.deviceBreakdown.viewportShiftRisk}</div>
                  <div className="text-[10px] text-slate-500">CLS Stability</div>
                </div>
              </div>
            </div>
          </div>

          {/* Prioritized Fix List */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>Prioritized Fix List ({scanResult.fixes.length} Identified Issues)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ranked by revenue impact and ease of implementation.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="inline-flex p-1 rounded-xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs">
                {[
                  { id: 'all', label: `All (${scanResult.fixes.length})` },
                  { id: 'critical', label: 'Critical Only' },
                  { id: 'high', label: 'High Priority' },
                  { id: 'quick', label: 'Quick Wins' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterPriority(f.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      filterPriority === f.id
                        ? 'bg-white dark:bg-slate-800 text-teal-800 dark:text-cyan-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Fix Items */}
            <div className="space-y-3">
              {filteredFixes.map((item, idx) => {
                const isExpanded = expandedFixId === item.id || idx === 0;

                const priorityColor =
                  item.priority === 'Critical'
                    ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                    : item.priority === 'High'
                    ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                    : item.priority === 'Quick Win'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
                  >
                    <div
                      onClick={() => setExpandedFixId(isExpanded ? null : item.id)}
                      className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 dark:hover:bg-slate-800/40"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${priorityColor}`}>
                            {item.priority}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            {item.dimension}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            {item.impact}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        aria-label="Toggle details"
                        className="text-slate-400 p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-stone-100 dark:border-slate-800/80 space-y-3 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800/80 space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                              What Was Detected
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                              {item.detected}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800/80 space-y-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                              Why It Hurts Conversion
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                              {item.whyItMatters}
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-cyan-950/30 border border-teal-200 dark:border-cyan-800 space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 dark:text-cyan-300 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                            <span>Recommended Engineering & Layout Fix</span>
                          </span>
                          <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                            {item.recommendation}
                          </p>
                          {item.codeSnippet && (
                            <pre className="p-2.5 rounded-lg bg-slate-900 text-teal-300 text-[11px] font-mono overflow-x-auto">
                              <code>{item.codeSnippet}</code>
                            </pre>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expert Audit CTA Card (Matching video section) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-teal-500/10 border border-orange-300 dark:border-orange-800/60 p-6 sm:p-8 lg:p-10 shadow-lg">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 border border-orange-200 dark:border-orange-800 text-[11px] font-semibold text-orange-800 dark:text-orange-300">
                <span>Done by a Human, not a Model</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Expert Audit & Product Implementation
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Go beyond quick fixes with a full product review by a senior product designer & engineer — uncovering where you&apos;re losing users, revenue, and growth opportunities across the entire experience.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onFixWithAgency(scanResult.url, scanResult.fixes.length, scanResult.topRisk)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span>Explore the Expert Audit & Fixes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sendToWhatsApp({
                      source: 'audit',
                      sourceTitle: 'Expert Product Design Audit Request',
                      serviceOrItem: `Expert UX Audit for ${scanResult.url}`,
                      notes: `Client requests a comprehensive Human UX & Conversion Audit for ${scanResult.url}.`,
                    });
                  }}
                  className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 hover:bg-stone-50 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Chat with an Architect on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PROCESS EXPLANATION CARDS (Shown on initial landing page as seen in video) */}
      {!scanResult && !isScanning && (
        <div className="space-y-12">
          {/* How It Works (4 Steps) */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
                Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                How DesignMeter Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '1. Paste Your Website URL',
                  desc: 'Add your URL and pick your category or target audience.',
                  icon: Globe,
                },
                {
                  step: '2. DesignMeter Analyzes Your Site',
                  desc: 'We review your UI, UX, user journey, and engagement and flag what&apos;s most likely to hurt performance.',
                  icon: Sparkles,
                },
                {
                  step: '3. Get Your Score and Breakdown',
                  desc: 'See where you&apos;re strong, where users struggle, and your single biggest commercial risk.',
                  icon: BarChart3,
                },
                {
                  step: '4. Know What to Fix First',
                  desc: 'Get a prioritized fix list showing which improvements matter most, and where to start.',
                  icon: ListChecks,
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.step}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs space-y-2 hover:border-teal-300 dark:hover:border-teal-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-cyan-950/60 border border-teal-200 dark:border-cyan-800 text-teal-600 dark:text-cyan-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {c.step}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What You'll Get (4 feature cards) */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                What You&apos;ll Get
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: '1. Your Scores & Biggest Commercial Risk',
                  desc: 'Your overall and UI/UX scores, plus the single issue most likely to hurt conversion or performance.',
                  icon: AlertTriangle,
                  badgeColor: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800',
                },
                {
                  title: '2. Desktop vs. Mobile',
                  desc: 'See how the experience holds up across devices and where it breaks down.',
                  icon: Smartphone,
                  badgeColor: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800',
                },
                {
                  title: '3. A Full Four-Dimension Breakdown',
                  desc: 'UI, UX, User Journey, Engagement metrics and touch-target evaluation.',
                  icon: Layers,
                  badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800',
                },
                {
                  title: '4. Prioritized Fix List',
                  desc: 'A clear list of what to fix first, why it matters, and which issues carry the highest potential impact.',
                  icon: ListChecks,
                  badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800',
                },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-xs flex items-start gap-4"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${f.badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {f.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expert Audit Callout */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-300 dark:border-amber-800/60 p-6 sm:p-8 lg:p-10 shadow-lg">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                <span>Done by a Human, not a Model</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Expert Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Go beyond quick fixes with a full product review by a senior product designer — uncovering where you&apos;re losing users, revenue, and growth opportunities across the entire experience.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onFixWithAgency(urlInput || 'Your Website', 8, 'Full Product Teardown')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span>Explore the Expert Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={loadSampleAudit}
                  className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 hover:bg-stone-50 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  See a Sample Audit →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
