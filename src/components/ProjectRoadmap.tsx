import React, { useState } from 'react';
import { 
  Compass, Palette, Code2, CheckSquare2, Rocket, 
  Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, 
  Sparkles, Layers, Users, RefreshCw, FileText, ChevronRight, 
  Lock, Zap, Check, HelpCircle, AlertCircle
} from 'lucide-react';

export type SprintTimeline = '4-weeks' | '6-weeks' | '8-weeks';

export interface StageDeliverable {
  title: string;
  detail: string;
  outputArtifact: string;
}

export interface RoadmapSprintStage {
  id: 'discovery' | 'design' | 'development' | 'uat' | 'deployment';
  stepNumber: number;
  name: string;
  shortLabel: string;
  timeRange: {
    '4-weeks': string;
    '6-weeks': string;
    '8-weeks': string;
  };
  durationDays: {
    '4-weeks': string;
    '6-weeks': string;
    '8-weeks': string;
  };
  leadSpecialist: string;
  clientTimeCommitment: string;
  milestoneGate: string;
  summary: string;
  deliverables: StageDeliverable[];
  keyRiskMitigation: string;
}

export const ROADMAP_STAGES: RoadmapSprintStage[] = [
  {
    id: 'discovery',
    stepNumber: 1,
    name: 'Discovery, Technical Scoping & Architecture',
    shortLabel: 'Discovery',
    timeRange: {
      '4-weeks': 'Week 1 (Days 1–5)',
      '6-weeks': 'Week 1 (Days 1–7)',
      '8-weeks': 'Weeks 1–1.5 (Days 1–10)'
    },
    durationDays: {
      '4-weeks': '5 Days',
      '6-weeks': '7 Days',
      '8-weeks': '10 Days'
    },
    leadSpecialist: 'Lead Solutions Architect',
    clientTimeCommitment: '2–3 hours total (Kickoff & Scope alignment)',
    milestoneGate: '100% Architecture & Requirements Sign-off',
    summary: 'We unpack your product requirements, construct PostgreSQL database schemas, audit third-party APIs (M-Pesa, SMS, CRM), and establish immutable sprint benchmarks.',
    deliverables: [
      {
        title: 'Technical Requirements Document (TRD)',
        detail: 'Exhaustive functional specifications detailing all user flows, permissions, and roles.',
        outputArtifact: 'Architecture_Spec_v1.0.pdf'
      },
      {
        title: 'Database Entity Relationship Diagram (ERD)',
        detail: 'Normalized PostgreSQL schema model with indexing strategy and foreign-key constraints.',
        outputArtifact: 'Database_Schema_ERD.sql'
      },
      {
        title: 'Third-Party Integration Mapping',
        detail: 'Safaricom Daraja 3.0 STK push payload schema, webhooks, and payment callback receivers.',
        outputArtifact: 'API_Integration_Contract.json'
      },
      {
        title: 'Infrastructure & Cloud Capacity Plan',
        detail: 'Docker container specs, AWS / GCP compute tiers, and Cloudflare security baseline.',
        outputArtifact: 'DevOps_Deployment_Plan.md'
      }
    ],
    keyRiskMitigation: 'Zero scope creep guarantee through mutually signed milestone sprint contracts.'
  },
  {
    id: 'design',
    stepNumber: 2,
    name: 'High-Fidelity UI/UX & Interactive Design Tokens',
    shortLabel: 'UI/UX Design',
    timeRange: {
      '4-weeks': 'Week 1.5–2 (Days 6–10)',
      '6-weeks': 'Weeks 1.5–2.5 (Days 8–16)',
      '8-weeks': 'Weeks 2–3 (Days 11–21)'
    },
    durationDays: {
      '4-weeks': '5 Days',
      '6-weeks': '9 Days',
      '8-weeks': '11 Days'
    },
    leadSpecialist: 'Lead Product Designer',
    clientTimeCommitment: '1.5 hours (Interactive Figma walkthrough)',
    milestoneGate: 'Approved Interactive Prototype Sign-off',
    summary: 'We build atomic design tokens, interactive Figma prototypes, and mobile-first checkout screens optimized for frictionless conversions and regional African user behavior.',
    deliverables: [
      {
        title: 'Design System & Atomic Tokens',
        detail: 'Standardized typography, Tailwind color tokens, accessible input states, and buttons.',
        outputArtifact: 'Figma_Tokens_Library.fig'
      },
      {
        title: 'Mobile-First M-Pesa Checkout Flow',
        detail: 'Frictionless checkout wireframes reducing step drop-offs with instant phone number autofill.',
        outputArtifact: 'Checkout_UX_Flow.pdf'
      },
      {
        title: 'Interactive Desktop & Mobile Prototype',
        detail: 'Clickable prototype mimicking full production logic for customer stakeholder validation.',
        outputArtifact: 'Figma_Interactive_Link'
      },
      {
        title: 'Design-to-Code Component Inventory',
        detail: 'Exported SVG assets, responsive breakpoints, and accessibility audit notes (WCAG 2.1).',
        outputArtifact: 'Design_Handover_Specs.zip'
      }
    ],
    keyRiskMitigation: 'You preview and approve every single screen before our fullstack team writes production code.'
  },
  {
    id: 'development',
    stepNumber: 3,
    name: 'Core Fullstack Engineering & API Integration',
    shortLabel: 'Engineering',
    timeRange: {
      '4-weeks': 'Weeks 2–3.5 (Days 11–22)',
      '6-weeks': 'Weeks 2.5–4.5 (Days 17–32)',
      '8-weeks': 'Weeks 3–6 (Days 22–42)'
    },
    durationDays: {
      '4-weeks': '12 Days',
      '6-weeks': '16 Days',
      '8-weeks': '21 Days'
    },
    leadSpecialist: 'Senior Fullstack Engineers (Frontend & Backend Sprints)',
    clientTimeCommitment: '1 hour weekly (Async video demo & staging preview review)',
    milestoneGate: 'All Sprint Features Operational on Live Staging Server',
    summary: 'Our Nairobi engineering squad constructs the modular Next.js frontend, secure REST/GraphQL microservices, Safaricom Daraja STK Push webhooks, and Redis caching layers.',
    deliverables: [
      {
        title: 'Next.js 15 & Tailwind Application Shell',
        detail: 'Server-side rendered components optimized for sub-second Largest Contentful Paint (LCP).',
        outputArtifact: 'GitHub_Repository_Access'
      },
      {
        title: 'Safaricom Daraja 3.0 STK Gateway',
        detail: 'Live sandbox STK prompt dispatcher, idempotent callback handler, and auto-retry logic.',
        outputArtifact: 'Daraja_Webhook_Endpoint'
      },
      {
        title: 'Role-Based Access Control (RBAC) & Auth',
        detail: 'JWT session tokens, passwordless authentication options, and client admin management.',
        outputArtifact: 'Auth_Security_Module'
      },
      {
        title: '24/7 Accessible Live Staging Environment',
        detail: 'Continuous CI/CD pipeline deploying every verified commit to a secure preview sub-domain.',
        outputArtifact: 'https://staging.yourbrand.dev'
      }
    ],
    keyRiskMitigation: 'Continuous staging deployments allow you to test features as they are built, not just on the final day.'
  },
  {
    id: 'uat',
    stepNumber: 4,
    name: 'Quality Assurance, Cross-Device Testing & UAT',
    shortLabel: 'QA & Testing',
    timeRange: {
      '4-weeks': 'Week 3.5–4 (Days 23–26)',
      '6-weeks': 'Weeks 4.5–5.5 (Days 33–38)',
      '8-weeks': 'Weeks 6–7.5 (Days 43–51)'
    },
    durationDays: {
      '4-weeks': '4 Days',
      '6-weeks': '6 Days',
      '8-weeks': '9 Days'
    },
    leadSpecialist: 'QA Lead & Security Analyst',
    clientTimeCommitment: '2 hours (Guided User Acceptance walkthrough)',
    milestoneGate: 'Zero Critical Blockers & Client Acceptance Sign-off',
    summary: 'Comprehensive edge-case verification across physical Android and iOS devices, network drop simulation, payment timeout scenarios, and OWASP penetration checks.',
    deliverables: [
      {
        title: 'Cross-Device & Browser Compatibility Matrix',
        detail: 'Physical smartphone verification on popular African devices (Tecno, Infinix, Samsung, iPhone).',
        outputArtifact: 'QA_Matrix_Report.pdf'
      },
      {
        title: 'Payment Edge Case & Reversal Simulator',
        detail: 'Simulated M-Pesa network timeouts, customer PIN cancel callbacks, and ledger reconciliations.',
        outputArtifact: 'EdgeCase_Test_Logs.json'
      },
      {
        title: 'Core Web Vitals & Speed Optimization Audit',
        detail: 'Enforcing 90+ Google Lighthouse score, Brotli compression, and image WebP format pipeline.',
        outputArtifact: 'Lighthouse_Audit_98Score.pdf'
      },
      {
        title: 'OWASP Security Vulnerability Assessment',
        detail: 'SQL injection, XSS protection, rate limiting, and strict HSTS headers validation.',
        outputArtifact: 'Security_PenTest_Report.pdf'
      }
    ],
    keyRiskMitigation: 'Formal User Acceptance Testing ensures no feature goes live until you personally test and approve it.'
  },
  {
    id: 'deployment',
    stepNumber: 5,
    name: 'Production Release, Cloud Cutover & Warranty',
    shortLabel: 'Go-Live Release',
    timeRange: {
      '4-weeks': 'Week 4 (Days 27–28)',
      '6-weeks': 'Week 6 (Days 39–42)',
      '8-weeks': 'Week 8 (Days 52–56)'
    },
    durationDays: {
      '4-weeks': '2 Days',
      '6-weeks': '4 Days',
      '8-weeks': '5 Days'
    },
    leadSpecialist: 'DevOps Architect & Dedicated Account Lead',
    clientTimeCommitment: '1 hour (Final go-live celebration & DNS switch approval)',
    milestoneGate: 'Live Production Release + Complete Source Code IP Transfer',
    summary: 'Zero-downtime DNS cutover, Cloudflare SSL certification, Safaricom Daraja live production keys activation, 24/7 monitoring handover, and 30-day post-launch warranty.',
    deliverables: [
      {
        title: 'Zero-Downtime Cloudflare DNS Cutover',
        detail: 'Global Anycast DNS propagation, SSL/TLS 1.3 certificates, and automated DDoS mitigation.',
        outputArtifact: 'Cloudflare_SSL_Certified'
      },
      {
        title: 'Live Safaricom Daraja Shortcode Activation',
        detail: 'Transition from Daraja sandbox to live Paybill/Till production shortcodes with test transactions.',
        outputArtifact: 'Production_STK_Active'
      },
      {
        title: 'Full Source Code & Repository IP Transfer',
        detail: 'Complete copyright, git repository ownership, environment secrets, and architectural docs handover.',
        outputArtifact: 'Full_IP_Transfer_Agreement.pdf'
      },
      {
        title: '30-Day Zero-Cost Bug Warranty & SLA Care',
        detail: 'Priority 20-minute response time for any production inquiries during your initial commercial rollout.',
        outputArtifact: '30Day_Warranty_Certificate'
      }
    ],
    keyRiskMitigation: 'Includes an ironclad 30-day post-launch warranty where any scope defect is resolved free of charge.'
  }
];

interface ProjectRoadmapProps {
  onStartSprint?: (timeline: SprintTimeline, stageId?: string) => void;
  onOpenCalculator?: () => void;
}

export const ProjectRoadmap: React.FC<ProjectRoadmapProps> = ({ 
  onStartSprint, 
  onOpenCalculator 
}) => {
  const [selectedTimeline, setSelectedTimeline] = useState<SprintTimeline>('6-weeks');
  const [activeStageId, setActiveStageId] = useState<'discovery' | 'design' | 'development' | 'uat' | 'deployment'>('development');

  const timelineSpecs = {
    '4-weeks': {
      label: '4-Week Fast-Track Sprint',
      idealFor: 'Custom MVP, High-Converting Landing Engine, or Direct M-Pesa E-Commerce Store',
      turnaround: '28 Calendar Days',
      velocityBadge: 'Fast-Track MVP',
      recommendedFor: 'Startups & SMEs needing rapid market validation',
      paymentMilestones: '50% Initial Architecture · 50% Final UAT Go-Live'
    },
    '6-weeks': {
      label: '6-Week Growth Build (Standard)',
      idealFor: 'Fullstack Web Applications, Custom CRM, High-Volume E-Commerce & Third-Party APIs',
      turnaround: '42 Calendar Days',
      velocityBadge: 'Most Popular',
      recommendedFor: 'Growing enterprises replacing legacy software or spreadsheets',
      paymentMilestones: '40% Architecture Kickoff · 30% Midpoint Staging · 30% Production Handover'
    },
    '8-weeks': {
      label: '8-Week Enterprise Release',
      idealFor: 'Complex Multi-Vendor Platforms, Multi-Role Portals, Microservices & Custom Mobile Apps',
      turnaround: '56 Calendar Days',
      velocityBadge: 'Enterprise Scale',
      recommendedFor: 'Scale-ups requiring multi-role permissions, high-availability & custom data pipelines',
      paymentMilestones: '35% Architecture · 35% Fullstack Staging · 30% Production Handover'
    }
  };

  const currentTimelineData = timelineSpecs[selectedTimeline];
  const activeStage = ROADMAP_STAGES.find(s => s.id === activeStageId) || ROADMAP_STAGES[2];
  const activeStageIndex = ROADMAP_STAGES.findIndex(s => s.id === activeStageId);

  const getStageIcon = (id: string, className = 'w-5 h-5') => {
    switch (id) {
      case 'discovery': return <Compass className={className} />;
      case 'design': return <Palette className={className} />;
      case 'development': return <Code2 className={className} />;
      case 'uat': return <CheckSquare2 className={className} />;
      case 'deployment': return <Rocket className={className} />;
      default: return <Layers className={className} />;
    }
  };

  return (
    <section id="roadmap" className="py-20 lg:py-28 bg-[#faf8f5] dark:bg-slate-950 border-t border-stone-200 dark:border-slate-900 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-cyan-400 tracking-wider font-bold uppercase mb-2">
            <Calendar className="w-4 h-4" />
            <span>PREDICTABLE DELIVERY TIMELINES · ZERO GUESSWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How We Build &amp; Deploy In 4 to 8 Weeks
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Unclear timelines cause lost revenue and endless delays. At Domain Tech Hub, every project runs on an agile, milestone-driven sprint cycle with live staging access, weekly video demos, and strict delivery guarantees.
          </p>
        </div>

        {/* Sprint Duration Selector Tabs */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                Select Your Project Scope &amp; Sprint Velocity:
              </span>
              <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">
                Current Mode: <span className="text-teal-600 dark:text-cyan-400 font-extrabold">{currentTimelineData.label}</span>
              </div>
            </div>

            {/* Segmented Duration Switcher */}
            <div className="inline-flex p-1 rounded-2xl bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800">
              {(['4-weeks', '6-weeks', '8-weeks'] as SprintTimeline[]).map((timeline) => {
                const isSelected = selectedTimeline === timeline;
                return (
                  <button
                    key={timeline}
                    type="button"
                    onClick={() => setSelectedTimeline(timeline)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{timeline.replace('-', ' ').toUpperCase()}</span>
                    {timeline === '6-weeks' && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-normal ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-300'
                      }`}>
                        POPULAR
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scope Fit Narrative Bar */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Ideal Architecture Scope</span>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{currentTimelineData.idealFor}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Turnaround Commitment</span>
                <span className="text-slate-600 dark:text-slate-400 font-mono">{currentTimelineData.turnaround} · Strict SLA</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Milestone Payment Model</span>
                <span className="text-slate-600 dark:text-slate-400 font-mono">{currentTimelineData.paymentMilestones}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE 5-STAGE SPRINT PROGRESSION STEPPER           */}
        {/* ======================================================== */}
        <div className="mb-10">
          
          {/* Desktop Connected Stage Tracker Line */}
          <div className="relative mb-6">
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-stone-200 dark:bg-slate-800 z-0 rounded-full" />
            
            {/* Dynamic Active Progress Fill */}
            <div 
              className="hidden lg:block absolute top-7 left-12 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-400 z-0 rounded-full transition-all duration-500"
              style={{ width: `${(activeStageIndex / (ROADMAP_STAGES.length - 1)) * 90}%` }}
            />

            {/* Stepper Buttons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
              {ROADMAP_STAGES.map((stage, idx) => {
                const isSelected = activeStageId === stage.id;
                const isPast = idx < activeStageIndex;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStageId(stage.id)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-teal-500 ring-2 ring-teal-500/20 shadow-xl shadow-teal-500/10 md:-translate-y-1'
                        : 'bg-white/80 dark:bg-slate-900/60 border-stone-200 dark:border-slate-800 hover:border-stone-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      {/* Step Circle Node */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-105 ${
                          isSelected
                            ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                            : isPast
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-stone-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-stone-200 dark:border-slate-700'
                        }`}>
                          {isPast ? (
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          ) : (
                            getStageIcon(stage.id, 'w-4 h-4')
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          0{stage.stepNumber} / 05
                        </span>
                      </div>

                      {/* Stage Name */}
                      <div className={`font-bold text-sm leading-snug transition-colors ${
                        isSelected 
                          ? 'text-teal-900 dark:text-white' 
                          : 'text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-cyan-400'
                      }`}>
                        {stage.shortLabel}
                      </div>

                      {/* Calculated Sprint Range for this timeline */}
                      <div className="text-[11px] font-mono text-teal-600 dark:text-cyan-400 font-semibold mt-1">
                        {stage.timeRange[selectedTimeline]}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Duration:</span>
                      <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {stage.durationDays[selectedTimeline]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* ACTIVE STAGE DEEP-DIVE CARD                              */}
          {/* ======================================================== */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
            
            {/* Top Stage Metadata Header */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-stone-100 dark:border-slate-800">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1.5">
                    {getStageIcon(activeStage.id, 'w-3.5 h-3.5')}
                    <span>Sprint Stage 0{activeStage.stepNumber} of 05</span>
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {activeStage.timeRange[selectedTimeline]}
                  </span>

                  <span className="text-xs font-mono text-slate-400">
                    ({activeStage.durationDays[selectedTimeline]} Active Execution)
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {activeStage.name}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeStage.summary}
                </p>
              </div>

              {/* Specialist Lead & Client Time Commit Pills */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 min-w-[220px]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-teal-600 dark:text-cyan-400" />
                    <span>Accountable Lead</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeStage.leadSpecialist}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 min-w-[220px]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Your Time Required</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {activeStage.clientTimeCommitment}
                  </div>
                </div>
              </div>
            </div>

            {/* Stage Deliverables & Work Artifacts Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                  <span>Verified Deliverables &amp; Output Artifacts for Stage 0{activeStage.stepNumber}</span>
                </h4>
                <span className="text-[11px] font-mono text-teal-600 dark:text-cyan-400 font-semibold">
                  Milestone Gate: {activeStage.milestoneGate}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeStage.deliverables.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 dark:bg-slate-950/70 border border-stone-200 dark:border-slate-800 hover:border-stone-300 dark:hover:border-slate-700 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-teal-700 dark:text-cyan-300 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shrink-0">
                        {item.outputArtifact}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Mitigation Callout & Sign-off Guarantee */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-teal-950 dark:text-teal-200 block">
                    Zero-Surprise Delivery Guarantee
                  </span>
                  <span className="text-teal-900/90 dark:text-teal-300/80 leading-relaxed">
                    {activeStage.keyRiskMitigation}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onStartSprint?.(selectedTimeline, activeStage.id)}
                  className="px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
                >
                  Schedule Discovery Kickoff
                </button>
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <button
                type="button"
                disabled={activeStageIndex === 0}
                onClick={() => {
                  if (activeStageIndex > 0) {
                    setActiveStageId(ROADMAP_STAGES[activeStageIndex - 1].id);
                  }
                }}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeStageIndex === 0 
                    ? 'text-slate-400 cursor-not-allowed opacity-50' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-cyan-400 font-semibold'
                }`}
              >
                <span>← Previous Stage: {ROADMAP_STAGES[Math.max(0, activeStageIndex - 1)].shortLabel}</span>
              </button>

              <div className="text-slate-400 hidden sm:block">
                Click any stage bubble above to inspect deliverables
              </div>

              <button
                type="button"
                disabled={activeStageIndex === ROADMAP_STAGES.length - 1}
                onClick={() => {
                  if (activeStageIndex < ROADMAP_STAGES.length - 1) {
                    setActiveStageId(ROADMAP_STAGES[activeStageIndex + 1].id);
                  }
                }}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeStageIndex === ROADMAP_STAGES.length - 1 
                    ? 'text-slate-400 cursor-not-allowed opacity-50' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-cyan-400 font-semibold'
                }`}
              >
                <span>Next Stage: {ROADMAP_STAGES[Math.min(ROADMAP_STAGES.length - 1, activeStageIndex + 1)].shortLabel} →</span>
              </button>
            </div>

          </div>

        </div>

        {/* Client Confidence Pillars / Delivery SLA Box */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Weekly Video Walkthroughs
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every Friday, you receive a recorded video demonstration of completed features and active staging links.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Full Source Code Ownership
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              100% of source code, design tokens, database schemas, and cloud credentials transfer to you upon completion.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              30-Day Free Bug Warranty
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Any functional defect or edge-case bug discovered within agreed scope is resolved free of charge post-launch.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Milestone Payment Safety
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Payment is tied strictly to demonstrable sprint milestones, never upfront lump-sums without delivery proof.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
