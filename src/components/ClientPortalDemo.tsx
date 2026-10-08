import React, { useState, useId } from 'react';
import { 
  FolderGit2, CheckCircle2, Clock, AlertCircle, Send, 
  ExternalLink, FileText, ShieldCheck, LifeBuoy, Check,
  Compass, Palette, Code2, CheckSquare2, Rocket, 
  ChevronRight, ChevronLeft, UserCheck, Sparkles, Layers,
  MessageSquare, Mail
} from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToWhatsApp, sendToEmail } from '../utils/leadDispatch';
import { SITE_URL } from '../config/site';

export interface RoadmapStage {
  id: 'discovery' | 'design' | 'development' | 'uat' | 'deployment';
  stepNumber: number;
  name: string;
  shortLabel: string;
  categoryTag: string;
  status: 'completed' | 'in_progress' | 'pending';
  progressPercent: number;
  dates: string;
  duration: string;
  leadRole: string;
  summary: string;
  deliverables: { title: string; completed: boolean }[];
  keyBenchmark: string;
}

export const ClientPortalDemo: React.FC = () => {
  const categorySelectId = useId();
  const subjectInputId = useId();
  const descriptionTextareaId = useId();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('bug');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [stagingNotice, setStagingNotice] = useState(false);

  // Active selected stage for roadmap deep-dive inspection (defaults to current in-progress stage: 'development')
  const [activeStageId, setActiveStageId] = useState<'discovery' | 'design' | 'development' | 'uat' | 'deployment'>('development');

  const roadmapStages: RoadmapStage[] = [
    {
      id: 'discovery',
      stepNumber: 1,
      name: 'Discovery & Architecture',
      shortLabel: 'Discovery',
      categoryTag: 'Architecture & Scoping',
      status: 'completed',
      progressPercent: 100,
      dates: 'Sept 01 – Sept 10',
      duration: '1.5 Weeks',
      leadRole: 'Lead Solutions Architect',
      summary: 'Deep architectural discovery, technical requirements specification, database schema modeling, and third-party API integration feasibility.',
      deliverables: [
        { title: 'Technical Architecture Specification & API Mapping', completed: true },
        { title: 'PostgreSQL Database Entity Relationship Diagram (ERD)', completed: true },
        { title: 'Safaricom Daraja 3.0 API STK Feasibility Scoping', completed: true },
        { title: 'Infrastructure Security & Server Capacity Plan', completed: true }
      ],
      keyBenchmark: '100% Architecture & Scope Sign-off'
    },
    {
      id: 'design',
      stepNumber: 2,
      name: 'High-Fidelity UI/UX & Design Tokens',
      shortLabel: 'Design',
      categoryTag: 'UI/UX & Prototyping',
      status: 'completed',
      progressPercent: 100,
      dates: 'Sept 11 – Sept 18',
      duration: '1 Week',
      leadRole: 'Senior Product Designer',
      summary: 'Interactive mobile-first Figma prototypes, atomic design token library, frictionless mobile checkout wireframes, and stakeholder sign-off.',
      deliverables: [
        { title: 'Atomic Component Library & Tailwind Design Tokens', completed: true },
        { title: 'Mobile-First M-Pesa Checkout Flow Wireframes', completed: true },
        { title: 'High-Fidelity Interactive Prototype Walkthrough', completed: true },
        { title: 'Client UX Review with Zero Open Change Requests', completed: true }
      ],
      keyBenchmark: 'Approved Prototype & Styleguide Sign-off'
    },
    {
      id: 'development',
      stepNumber: 3,
      name: 'Fullstack Engineering & Daraja 3.0',
      shortLabel: 'Development',
      categoryTag: 'Active Sprint · 85%',
      status: 'in_progress',
      progressPercent: 85,
      dates: 'Sept 19 – Oct 01',
      duration: '2 Weeks',
      leadRole: 'Senior Fullstack Engineer',
      summary: 'Modular Next.js frontend with Tailwind CSS, Node.js backend microservices, real-time Safaricom Daraja STK Push callbacks, and Redis cache.',
      deliverables: [
        { title: 'Next.js 15 Responsive Storefront & Fast Cart Engine', completed: true },
        { title: 'Safaricom Daraja 3.0 STK Push Webhook Receivers', completed: true },
        { title: 'Multi-Currency Real-time FX (KES, USD, EUR, GBP)', completed: true },
        { title: 'Automated Vendor Payout Pipeline & Ledger', completed: false }
      ],
      keyBenchmark: '85% Active Sprint Velocity Completed'
    },
    {
      id: 'uat',
      stepNumber: 4,
      name: 'User Acceptance Testing & Security',
      shortLabel: 'UAT',
      categoryTag: 'Quality Assurance',
      status: 'pending',
      progressPercent: 0,
      dates: 'Est. Oct 02 – Oct 05',
      duration: '4 Days',
      leadRole: 'QA & Security Engineer',
      summary: 'Comprehensive end-to-end multi-device regression testing, edge case handling, Daraja callback error simulation, and guided client review.',
      deliverables: [
        { title: 'Cross-Browser Matrix & iOS/Android Physical Testing', completed: false },
        { title: 'M-Pesa Timeout & Cancel Callback Edge Cases Simulation', completed: false },
        { title: 'OWASP Security Vulnerability Scan & Penetration Test', completed: false },
        { title: 'Client Acceptance Walkthrough & Production Sign-off', completed: false }
      ],
      keyBenchmark: 'Zero Critical Blockers Acceptance Criteria'
    },
    {
      id: 'deployment',
      stepNumber: 5,
      name: 'Production Release & Cloudflare Cutover',
      shortLabel: 'Deployment',
      categoryTag: 'Go-Live Release',
      status: 'pending',
      progressPercent: 0,
      dates: 'Est. Oct 06 – Oct 08',
      duration: '2 Days',
      leadRole: 'DevOps & Cloud Engineer',
      summary: 'Production domain cutover, Cloudflare SSL certification, live M-Pesa production credentials swap, Core Web Vitals audit, and 24/7 monitoring handover.',
      deliverables: [
        { title: 'Zero-Downtime Cloudflare DNS Switch & SSL Provisioning', completed: false },
        { title: 'Safaricom Daraja Live Production Shortcode Cutover', completed: false },
        { title: 'Google Core Web Vitals & Search Index Verification', completed: false },
        { title: '24/7 SLA Uptime Monitoring & Incident Handover', completed: false }
      ],
      keyBenchmark: 'Sub-Second Production TTFB & 99.9% Uptime'
    }
  ];

  const currentStageIndex = roadmapStages.findIndex(s => s.id === activeStageId);
  const activeStage = roadmapStages[currentStageIndex] || roadmapStages[2];

  const getStageIcon = (id: string, className = 'w-4 h-4') => {
    switch (id) {
      case 'discovery': return <Compass className={className} />;
      case 'design': return <Palette className={className} />;
      case 'development': return <Code2 className={className} />;
      case 'uat': return <CheckSquare2 className={className} />;
      case 'deployment': return <Rocket className={className} />;
      default: return <Layers className={className} />;
    }
  };

  const handleTicketSubmit = (e?: React.FormEvent, method: 'whatsapp' | 'email' = 'whatsapp') => {
    if (e) e.preventDefault();
    if (!ticketSubject || !ticketDescription) return;

    const leadData = {
      source: 'ticket' as const,
      sourceTitle: `Client Portal Support Ticket (${ticketCategory.toUpperCase()})`,
      fullName: 'Portal Client',
      email: '',
      phone: '',
      serviceOrItem: `Ticket: ${ticketSubject}`,
      notes: `[Category: ${ticketCategory}]\n${ticketDescription}`
    };

    saveLead(leadData);

    if (method === 'whatsapp') {
      sendToWhatsApp(leadData);
    } else {
      sendToEmail(leadData);
    }

    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketDescription('');
      setTicketSubmitted(false);
    }, 6000);
  };

  return (
    <section id="client-portal" className="py-20 lg:py-28 bg-slate-900/30 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            CLIENT EXPERIENCE · INTERACTIVE WORKSPACE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Total Transparency With Our Client Portal
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Every client at Domain Tech Hub receives 24/7 access to live staging builds, visual lifecycle roadmap tracking, deliverable repositories, and priority technical support ticketing.
          </p>
        </div>

        {/* Dashboard Shell Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Top Mock Window Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 max-w-full">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-400 truncate">
                {SITE_URL}/portal / client / PRJ-2026-884
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="hidden sm:inline-block text-slate-500">
                Sprint Velocity: <strong className="text-cyan-400 font-semibold">Stage 3 of 5 (85%)</strong>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                SLA: ACTIVE (24/7 SQUAD)
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* NEW PROJECT ROADMAP SECTION (Horizontal Step Indicator)      */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-8 lg:p-10 border-b border-slate-800 bg-gradient-to-b from-slate-900/70 via-slate-950/80 to-slate-950">
            
            {/* Roadmap Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Live Project Roadmap
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    PRJ-2026-884
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  AfriTrade Multivendor Platform Lifecycle
                </h3>
              </div>

              {/* Status Indicator Legend & Overall Progress */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Completed
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Active Sprint
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                    Scheduled
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800">
                  <span className="text-slate-400">Overall Completion:</span>
                  <span className="font-bold text-cyan-400">77%</span>
                </div>
              </div>
            </div>

            {/* Horizontal Step Indicator Container */}
            <div className="relative mb-8 pt-4 pb-2">
              
              {/* Continuous Background Progress Line Track */}
              <div className="absolute top-10 left-6 right-6 h-1 bg-slate-800 hidden md:block z-0 rounded-full" />
              
              {/* Completed Track Fill (from Step 1 through Step 3 at 85%) */}
              <div 
                className="absolute top-10 left-6 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 hidden md:block z-0 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)] transition-all duration-500"
                style={{ width: '56%' }}
              />

              {/* 5 Horizontal Steps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-2 relative z-10">
                {roadmapStages.map((stage, idx) => {
                  const isSelected = activeStageId === stage.id;
                  const isCompleted = stage.status === 'completed';
                  const isInProgress = stage.status === 'in_progress';

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageId(stage.id)}
                      className={`text-left md:text-center p-3.5 md:p-3 rounded-2xl transition-all duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        isSelected 
                          ? 'bg-slate-900 border-2 border-cyan-500/80 shadow-lg shadow-cyan-950/40 md:-translate-y-1' 
                          : 'bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700'
                      }`}
                      aria-label={`View stage ${stage.stepNumber}: ${stage.shortLabel}`}
                    >
                      {/* Step Indicator Node (Icon Circle) */}
                      <div className="flex md:justify-center mb-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20 group-hover:scale-105'
                            : isInProgress
                            ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-md shadow-cyan-500/30 ring-4 ring-cyan-500/10 group-hover:scale-105'
                            : 'bg-slate-950 text-slate-500 border border-slate-800 group-hover:border-slate-700 group-hover:text-slate-300'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          ) : isInProgress ? (
                            <div className="relative flex items-center justify-center">
                              {getStageIcon(stage.id, 'w-5 h-5 text-cyan-400 animate-pulse')}
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            </div>
                          ) : (
                            <span className="font-mono text-xs font-bold">{`0${stage.stepNumber}`}</span>
                          )}
                        </div>
                      </div>

                      {/* Step Name & Numbers */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          Stage 0{stage.stepNumber}
                        </div>
                        <div className={`font-bold text-sm tracking-tight transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {stage.shortLabel}
                        </div>

                        {/* Status Tag */}
                        <div className="pt-0.5">
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Done</span>
                            </span>
                          ) : isInProgress ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              <span>85% Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                              <Clock className="w-3 h-3" />
                              <span>Upcoming</span>
                            </span>
                          )}
                        </div>

                        {/* Dates on desktop */}
                        <div className="text-[10px] font-mono text-slate-400 truncate pt-0.5">
                          {stage.dates}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Stage Detail Drawer / Deep-Dive Card */}
            <div className="p-5 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl transition-all duration-300">
              
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                      {getStageIcon(activeStage.id, 'w-4 h-4')}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      Stage 0{activeStage.stepNumber} · {activeStage.categoryTag}
                    </span>
                    {activeStage.status === 'completed' && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold border border-emerald-500/30">
                        100% COMPLETE
                      </span>
                    )}
                    {activeStage.status === 'in_progress' && (
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-semibold border border-cyan-500/30 animate-pulse">
                        CURRENT ACTIVE SPRINT (85%)
                      </span>
                    )}
                    {activeStage.status === 'pending' && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-mono font-semibold border border-slate-700">
                        SCHEDULED NEXT
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {activeStage.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {activeStage.summary}
                  </p>
                </div>

                {/* Squad Lead & Timeline Meta */}
                <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left w-full sm:w-auto min-w-0 sm:min-w-[170px] flex-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-cyan-400" />
                      <span>Accountable Lead</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {activeStage.leadRole}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left w-full sm:w-auto min-w-0 sm:min-w-[140px] flex-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Sprint Timeline</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {activeStage.duration}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage Deliverables Checklist */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Stage Deliverables & Verification Checklist
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Benchmark: {activeStage.keyBenchmark}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeStage.deliverables.map((del, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        del.completed 
                          ? 'bg-slate-950/70 border-emerald-900/40 text-slate-200' 
                          : activeStage.status === 'in_progress'
                          ? 'bg-cyan-950/30 border-cyan-800/40 text-slate-300 font-medium'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {del.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : activeStage.status === 'in_progress' ? (
                          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span>{del.title}</span>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 px-2 py-0.5 rounded ${
                        del.completed 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : activeStage.status === 'in_progress'
                          ? 'bg-cyan-500/10 text-cyan-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {del.completed ? 'VERIFIED' : activeStage.status === 'in_progress' ? 'IN REVIEW' : 'PENDING'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Navigation Stepper Buttons - Mobile UI Design Optimized */}
              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:justify-between w-full">
                  
                  {/* Previous Stage Button */}
                  <button
                    type="button"
                    disabled={currentStageIndex === 0}
                    onClick={() => {
                      if (currentStageIndex > 0) {
                        setActiveStageId(roadmapStages[currentStageIndex - 1].id);
                      }
                    }}
                    className={`flex-1 sm:flex-initial sm:min-w-[190px] p-2.5 sm:px-4 sm:py-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 ${
                      currentStageIndex === 0
                        ? 'border-slate-850 bg-slate-950/40 text-slate-600 opacity-40 cursor-not-allowed'
                        : 'border-slate-800 bg-slate-900/90 hover:bg-slate-850 hover:border-slate-700 text-slate-200 shadow-xs cursor-pointer active:scale-[0.98]'
                    }`}
                    aria-label={currentStageIndex > 0 ? `Go to previous stage: ${roadmapStages[currentStageIndex - 1].name}` : 'Previous stage disabled'}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      currentStageIndex === 0
                        ? 'bg-slate-900 text-slate-600'
                        : 'bg-slate-800 text-cyan-400 shadow-xs'
                    }`}>
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold leading-tight">
                        Previous
                      </span>
                      <span className="block text-xs font-bold text-white truncate">
                        {currentStageIndex > 0
                          ? roadmapStages[currentStageIndex - 1].shortLabel
                          : 'Stage 01'}
                      </span>
                    </div>
                  </button>

                  {/* Middle Stage Dots Stepper (Hidden on small mobile screens to prevent overlap) */}
                  <div className="hidden md:flex flex-col items-center justify-center text-center px-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      {roadmapStages.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setActiveStageId(s.id)}
                          className={`transition-all rounded-full ${
                            idx === currentStageIndex
                              ? 'w-6 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                              : idx < currentStageIndex
                              ? 'w-2 h-2 bg-emerald-400/80'
                              : 'w-2 h-2 bg-slate-800 hover:bg-slate-700'
                          }`}
                          title={`Stage 0${s.stepNumber}: ${s.name}`}
                          aria-label={`Jump to stage 0${s.stepNumber}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Stage 0{currentStageIndex + 1} of 05 · Tap to jump
                    </span>
                  </div>

                  {/* Next Stage Button */}
                  <button
                    type="button"
                    disabled={currentStageIndex === roadmapStages.length - 1}
                    onClick={() => {
                      if (currentStageIndex < roadmapStages.length - 1) {
                        setActiveStageId(roadmapStages[currentStageIndex + 1].id);
                      }
                    }}
                    className={`flex-1 sm:flex-initial sm:min-w-[190px] p-2.5 sm:px-4 sm:py-3 rounded-2xl border transition-all text-right flex items-center justify-end gap-2.5 ${
                      currentStageIndex === roadmapStages.length - 1
                        ? 'border-slate-850 bg-slate-950/40 text-slate-600 opacity-40 cursor-not-allowed'
                        : 'border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-950/60 hover:border-cyan-400 text-cyan-200 shadow-xs cursor-pointer active:scale-[0.98]'
                    }`}
                    aria-label={currentStageIndex < roadmapStages.length - 1 ? `Go to next stage: ${roadmapStages[currentStageIndex + 1].name}` : 'Next stage disabled'}
                  >
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold leading-tight">
                        Next Stage
                      </span>
                      <span className="block text-xs font-bold text-white truncate">
                        {currentStageIndex < roadmapStages.length - 1
                          ? roadmapStages[currentStageIndex + 1].shortLabel
                          : 'Deployment'}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      currentStageIndex === roadmapStages.length - 1
                        ? 'bg-slate-900 text-slate-600'
                        : 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>

                </div>
              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* WORKSPACE LOWER GRID (Project Details, Docs & Ticket Desk)   */}
          {/* ============================================================ */}
          <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Column: Project Overview & Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Active Project Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                    Current Active Repository & Build
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Target Launch: Oct 08, 2026
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-1">
                  AfriTrade Multivendor E-Commerce & M-Pesa STK Gateway
                </h4>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Custom Next.js 15 storefront, Safaricom Daraja API callbacks, Redis caching, and automated vendor payout pipeline.
                </p>

                {/* Staging link pill - Mobile-Optimized Zero Overlap */}
                <div className="space-y-2">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 text-slate-400 font-mono shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="font-semibold text-slate-300 text-xs">Staging URL:</span>
                    </div>
                    <a
                      href="https://staging.afritrade.domaintechhubs.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        setStagingNotice(true);
                        setTimeout(() => setStagingNotice(false), 4500);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-mono inline-flex items-center gap-1.5 text-left cursor-pointer min-w-0 max-w-full group break-all"
                      title="Inspect staging build for AfriTrade (https://staging.afritrade.domaintechhubs.dev)"
                    >
                      <span className="break-all underline decoration-cyan-500/40 underline-offset-4 group-hover:decoration-cyan-300 text-[11px] sm:text-xs">
                        https://staging.afritrade.domaintechhubs.dev
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                    </a>
                  </div>
                  {stagingNotice && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] font-mono flex items-start sm:items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                      <span className="leading-relaxed">Preview Verified: Automated integration tests & M-Pesa Daraja Sandbox 100% Passing.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Deliverable Downloads */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Verified Deliverables & Engineering Documentation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-slate-300 min-w-0">
                    <span className="flex items-center gap-2 min-w-0 flex-1">
                      <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">Figma Design Tokens & UI Kit.pdf</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">4.2 MB</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-slate-300 min-w-0">
                    <span className="flex items-center gap-2 min-w-0 flex-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">M-Pesa Daraja Architecture.pdf</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">1.8 MB</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Support & Change Request Desk (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LifeBuoy className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-bold text-sm text-white">
                    Submit Priority Ticket / Request
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Need a content update, bug fix, or new API integration? Our engineering squad responds within 20 minutes during office hours.
                </p>

                {ticketSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-800 text-center animate-in fade-in">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h5 className="font-bold text-sm text-white">Ticket #DTH-8492 Logged!</h5>
                    <p className="text-xs text-slate-300 mt-1">
                      Our on-call engineer has been notified on Slack & WhatsApp. Estimated response: 18 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-3">
                    <div>
                      <label htmlFor={categorySelectId} className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Category
                      </label>
                      <select
                        id={categorySelectId}
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="bug">Bug Fix / Outage</option>
                        <option value="content">Content / Banner Update</option>
                        <option value="feature">New Feature / Scope Extension</option>
                        <option value="seo">SEO / Analytics Query</option>
                      </select>
                    </div>

                    <div>
                      <label id={`${subjectInputId}-label`} htmlFor={subjectInputId} className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Subject
                      </label>
                      <input
                        id={subjectInputId}
                        aria-labelledby={`${subjectInputId}-label`}
                        type="text"
                        required
                        autoComplete="off"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="e.g. Update M-Pesa Shortcode in staging"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label id={`${descriptionTextareaId}-label`} htmlFor={descriptionTextareaId} className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                        Description / Details
                      </label>
                      <textarea
                        id={descriptionTextareaId}
                        aria-labelledby={`${descriptionTextareaId}-label`}
                        required
                        rows={3}
                        value={ticketDescription}
                        onChange={(e) => setTicketDescription(e.target.value)}
                        placeholder="Describe the adjustment or provide page link..."
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send to WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleTicketSubmit(e, 'email')}
                        className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Email</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Direct Emergency Hotline:</span>
                <span className="text-slate-300 font-mono font-medium">+254 118746676</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
