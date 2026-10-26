import React, { useState } from 'react';
import { 
  FolderGit2, CheckCircle2, Clock, AlertCircle, Send, 
  ExternalLink, FileText, ShieldCheck, LifeBuoy, Check,
  Compass, Palette, Code2, CheckSquare2, Rocket, 
  ChevronRight, ChevronLeft, UserCheck, Sparkles, Layers,
  MessageSquare, Mail
} from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToWhatsApp, sendToEmail } from '../utils/leadDispatch';

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
        <div className="bg-[#021a0f] border border-emerald-800/80 rounded-3xl shadow-2xl overflow-hidden text-white">
          
          {/* Top Mock Window Bar */}
          <div className="px-6 py-4 bg-[#021a0f] border-b border-emerald-900/60 flex flex-wrap items-center justify-between gap-4 text-emerald-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#00c853] inline-block" />
              </div>
              <span style={{ color: '#a7f3d0' }} className="text-xs font-mono !text-emerald-200">
                portal.domaintechhub.com / client / PRJ-2026-884
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-emerald-200">
              <span style={{ color: '#d1fae5' }} className="hidden sm:inline-block !text-emerald-100">
                Sprint Velocity: <strong style={{ color: '#00e676' }} className="!text-[#00e676] font-semibold">Stage 3 of 5 (85%)</strong>
              </span>
              <span style={{ color: '#00e676' }} className="flex items-center gap-1.5 font-semibold !text-[#00e676]">
                <span className="w-2 h-2 rounded-full bg-[#00e676] inline-block" />
                SLA: ACTIVE (24/7 SQUAD)
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* NEW PROJECT ROADMAP SECTION (Horizontal Step Indicator)      */}
          {/* ============================================================ */}
          <div className="green-roadmap-section p-6 sm:p-8 lg:p-10 border-b border-emerald-900/60 bg-gradient-to-br from-[#032415] via-[#073d24] to-[#042818] text-white relative overflow-hidden">
            {/* Subtle decorative emerald ambient glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00c853]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Roadmap Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: '#00e676' }} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-[#00e676] border border-emerald-500/40">
                    Live Project Roadmap
                  </span>
                  <span style={{ color: '#a7f3d0' }} className="text-xs font-mono !text-emerald-200 font-semibold">
                    PRJ-2026-884
                  </span>
                </div>
                <h3 style={{ color: '#ffffff' }} className="text-xl sm:text-2xl font-black !text-white tracking-tight">
                  AfriTrade Multivendor Platform Lifecycle
                </h3>
              </div>

              {/* Status Indicator Legend & Overall Progress */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono relative z-10">
                <div className="flex items-center gap-3">
                  <span style={{ color: '#a7f3d0' }} className="flex items-center gap-1.5 !text-emerald-200 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#00e676]" />
                    Completed
                  </span>
                  <span style={{ color: '#67e8f9' }} className="flex items-center gap-1.5 !text-cyan-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Active Sprint
                  </span>
                  <span style={{ color: '#d1fae5' }} className="flex items-center gap-1.5 !text-emerald-300/80 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-700" />
                    Scheduled
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-emerald-800">
                  <span style={{ color: '#d1fae5' }} className="!text-emerald-100">Overall Completion:</span>
                  <span style={{ color: '#00e676' }} className="font-black !text-[#00e676]">77%</span>
                </div>
              </div>
            </div>

            {/* Horizontal Step Indicator Container */}
            <div className="relative mb-8 pt-4 pb-2 z-10">
              
              {/* Continuous Background Progress Line Track */}
              <div className="absolute top-10 left-6 right-6 h-1 bg-emerald-950/80 hidden md:block z-0 rounded-full border border-emerald-900/60" />
              
              {/* Completed Track Fill (from Step 1 through Step 3 at 85%) */}
              <div 
                className="absolute top-10 left-6 h-1 bg-gradient-to-r from-emerald-500 via-[#00e676] to-cyan-400 hidden md:block z-0 rounded-full shadow-[0_0_12px_rgba(0,230,118,0.6)] transition-all duration-500"
                style={{ width: '56%' }}
              />

              {/* 5 Horizontal Steps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-2 relative z-10">
                {roadmapStages.map((stage) => {
                  const isSelected = activeStageId === stage.id;
                  const isCompleted = stage.status === 'completed';
                  const isInProgress = stage.status === 'in_progress';

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageId(stage.id)}
                      className={`text-left md:text-center p-3.5 md:p-3 rounded-2xl transition-all duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676] ${
                        isSelected 
                          ? 'bg-[#09472a] border-2 border-[#00e676] shadow-xl shadow-emerald-950/80 md:-translate-y-1' 
                          : 'bg-[#042818]/90 hover:bg-[#063922] border border-emerald-800/80 hover:border-emerald-600/80 shadow-md'
                      }`}
                    >
                      {/* Step Indicator Node (Icon Circle) */}
                      <div className="flex md:justify-center mb-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-[#00e676] border border-emerald-500/40 shadow-sm shadow-emerald-500/20 group-hover:scale-105'
                            : isInProgress
                            ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-md shadow-cyan-500/30 ring-4 ring-cyan-500/10 group-hover:scale-105'
                            : 'bg-[#021a0f] text-emerald-300/60 border border-emerald-800/60 group-hover:border-emerald-600 group-hover:text-emerald-200'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-5 h-5 stroke-[2.5] text-[#00e676]" />
                          ) : isInProgress ? (
                            <div className="relative flex items-center justify-center">
                              {getStageIcon(stage.id, 'w-5 h-5 text-cyan-400')}
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
                            </div>
                          ) : (
                            <span style={{ color: '#a7f3d0' }} className="font-mono text-xs font-bold !text-emerald-200">{`0${stage.stepNumber}`}</span>
                          )}
                        </div>
                      </div>

                      {/* Step Name & Numbers */}
                      <div className="space-y-1">
                        <div style={{ color: '#a7f3d0' }} className="text-[10px] font-mono !text-emerald-200 uppercase tracking-wider font-semibold">
                          Stage 0{stage.stepNumber}
                        </div>
                        <div style={{ color: '#ffffff' }} className={`font-black text-sm tracking-tight transition-colors !text-white`}>
                          {stage.shortLabel}
                        </div>

                        {/* Status Tag */}
                        <div className="pt-0.5">
                          {isCompleted ? (
                            <span style={{ color: '#00e676' }} className="inline-flex items-center gap-1 text-[11px] font-mono !text-[#00e676] font-bold">
                              <CheckCircle2 className="w-3 h-3 text-[#00e676]" />
                              <span>Done</span>
                            </span>
                          ) : isInProgress ? (
                            <span style={{ color: '#67e8f9' }} className="inline-flex items-center gap-1 text-[11px] font-mono !text-cyan-300 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span>85% Active</span>
                            </span>
                          ) : (
                            <span style={{ color: '#a7f3d0' }} className="inline-flex items-center gap-1 text-[11px] font-mono !text-emerald-200">
                              <Clock className="w-3 h-3 text-emerald-400/70" />
                              <span>Upcoming</span>
                            </span>
                          )}
                        </div>

                        {/* Dates on desktop */}
                        <div style={{ color: '#d1fae5' }} className="text-[10px] font-mono !text-emerald-100 truncate pt-0.5">
                          {stage.dates}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Stage Detail Drawer / Deep-Dive Card */}
            <div className="p-5 sm:p-7 rounded-2xl bg-[#042818]/95 border border-emerald-700/60 shadow-xl transition-all duration-300 relative z-10 text-white">
              
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-emerald-800/80">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#021a0f] border border-emerald-700 flex items-center justify-center text-[#00e676]">
                      {getStageIcon(activeStage.id, 'w-4 h-4 text-[#00e676]')}
                    </span>
                    <span style={{ color: '#00e676' }} className="text-xs font-mono !text-[#00e676] font-bold uppercase tracking-wider">
                      Stage 0{activeStage.stepNumber} · {activeStage.categoryTag}
                    </span>
                    {activeStage.status === 'completed' && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-[#00e676] text-[10px] font-mono font-semibold border border-emerald-500/40">
                        100% COMPLETE
                      </span>
                    )}
                    {activeStage.status === 'in_progress' && (
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-semibold border border-cyan-500/30">
                        CURRENT ACTIVE SPRINT (85%)
                      </span>
                    )}
                    {activeStage.status === 'pending' && (
                      <span className="px-2 py-0.5 rounded-md bg-[#021a0f] text-emerald-200 text-[10px] font-mono font-semibold border border-emerald-800">
                        SCHEDULED NEXT
                      </span>
                    )}
                  </div>

                  <h4 style={{ color: '#ffffff' }} className="text-lg sm:text-xl font-black !text-white tracking-tight">
                    {activeStage.name}
                  </h4>
                  <p style={{ color: '#d1fae5' }} className="text-xs sm:text-sm !text-emerald-100 max-w-3xl leading-relaxed">
                    {activeStage.summary}
                  </p>
                </div>

                {/* Squad Lead & Timeline Meta */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                  <div className="p-3 rounded-xl bg-[#021a0f] border border-emerald-800/80 text-left min-w-[170px]">
                    <div style={{ color: '#a7f3d0' }} className="text-[10px] font-mono !text-emerald-200 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-[#00e676]" />
                      <span>Accountable Lead</span>
                    </div>
                    <div style={{ color: '#ffffff' }} className="text-xs font-bold !text-white">
                      {activeStage.leadRole}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#021a0f] border border-emerald-800/80 text-left min-w-[140px]">
                    <div style={{ color: '#a7f3d0' }} className="text-[10px] font-mono !text-emerald-200 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00e676]" />
                      <span>Sprint Timeline</span>
                    </div>
                    <div style={{ color: '#ffffff' }} className="text-xs font-bold !text-white">
                      {activeStage.duration}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage Deliverables Checklist */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span style={{ color: '#a7f3d0' }} className="text-xs font-mono !text-emerald-200 uppercase tracking-wider font-semibold">
                    Stage Deliverables &amp; Verification Checklist
                  </span>
                  <span style={{ color: '#00e676' }} className="text-[11px] font-mono !text-[#00e676] font-bold">
                    Benchmark: {activeStage.keyBenchmark}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeStage.deliverables.map((del, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        del.completed 
                          ? 'bg-[#021a0f]/90 border-emerald-700/60 text-white' 
                          : activeStage.status === 'in_progress'
                          ? 'bg-[#05351e]/90 border-cyan-500/50 text-white font-medium'
                          : 'bg-[#021a0f]/50 border-emerald-900/60 text-emerald-200/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {del.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00e676] shrink-0" />
                        ) : activeStage.status === 'in_progress' ? (
                          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        <span style={{ color: '#ffffff' }} className="!text-white font-medium">{del.title}</span>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 px-2 py-0.5 rounded font-bold ${
                        del.completed 
                          ? 'bg-emerald-500/20 text-[#00e676] border border-emerald-500/40' 
                          : activeStage.status === 'in_progress'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-[#021a0f] text-emerald-400/60'
                      }`}>
                        {del.completed ? 'VERIFIED' : activeStage.status === 'in_progress' ? 'IN REVIEW' : 'PENDING'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Navigation Stepper Buttons */}
              <div className="pt-6 mt-6 border-t border-emerald-800/80 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentStageIndex === 0}
                  onClick={() => {
                    if (currentStageIndex > 0) {
                      setActiveStageId(roadmapStages[currentStageIndex - 1].id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    currentStageIndex === 0
                      ? 'text-emerald-700/50 cursor-not-allowed'
                      : 'text-white bg-[#021a0f] hover:bg-[#032415] border border-emerald-700/60'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span style={{ color: '#ffffff' }} className="!text-white">Previous Stage ({roadmapStages[Math.max(0, currentStageIndex - 1)].shortLabel})</span>
                </button>

                <div style={{ color: '#a7f3d0' }} className="text-[11px] font-mono !text-emerald-200">
                  Click any stage circle to inspect deliverables
                </div>

                <button
                  type="button"
                  disabled={currentStageIndex === roadmapStages.length - 1}
                  onClick={() => {
                    if (currentStageIndex < roadmapStages.length - 1) {
                      setActiveStageId(roadmapStages[currentStageIndex + 1].id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    currentStageIndex === roadmapStages.length - 1
                      ? 'text-emerald-700/50 cursor-not-allowed'
                      : 'text-white bg-[#021a0f] hover:bg-[#032415] border border-emerald-700/60'
                  }`}
                >
                  <span style={{ color: '#ffffff' }} className="!text-white">Next Stage ({roadmapStages[Math.min(roadmapStages.length - 1, currentStageIndex + 1)].shortLabel})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* WORKSPACE LOWER GRID (Project Details, Docs & Ticket Desk)   */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Project Overview & Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Active Project Card */}
              <div className="p-5 rounded-2xl bg-[#032415] border border-emerald-800/80 text-white">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span style={{ color: '#00e676' }} className="text-xs font-mono uppercase font-bold !text-[#00e676]">
                    Current Active Repository &amp; Build
                  </span>
                  <span style={{ color: '#a7f3d0' }} className="text-xs !text-emerald-200 font-mono">
                    Target Launch: Oct 08, 2026
                  </span>
                </div>

                <h4 style={{ color: '#ffffff' }} className="text-xl font-black !text-white mb-1">
                  AfriTrade Multivendor E-Commerce &amp; M-Pesa STK Gateway
                </h4>
                <p style={{ color: '#d1fae5' }} className="text-xs !text-emerald-100 mb-4 leading-relaxed font-normal">
                  Custom Next.js 15 storefront, Safaricom Daraja API callbacks, Redis caching, and automated vendor payout pipeline.
                </p>

                {/* Staging link pill */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#021a0f] border border-emerald-800/80 text-xs">
                    <span style={{ color: '#a7f3d0' }} className="!text-emerald-200 font-mono">Staging URL:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setStagingNotice(true);
                        setTimeout(() => setStagingNotice(false), 4500);
                      }}
                      style={{ color: '#00e676' }}
                      className="!text-[#00e676] hover:underline font-mono flex items-center gap-1 text-left cursor-pointer font-bold"
                    >
                      <span>https://staging.afritrade.domaintechhub.dev</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </button>
                  </div>
                  {stagingNotice && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-[#00e676] text-[11px] font-mono flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00e676] shrink-0" />
                      <span>Preview Verified: Automated integration tests &amp; M-Pesa Daraja Sandbox 100% Passing.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Deliverable Downloads */}
              <div>
                <h4 style={{ color: '#a7f3d0' }} className="text-xs font-mono !text-emerald-200 uppercase tracking-wider mb-2 font-bold">
                  Verified Deliverables &amp; Engineering Documentation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#032415] border border-emerald-800 flex items-center justify-between text-white">
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#00e676]" />
                      <span style={{ color: '#ffffff' }} className="!text-white font-medium">Figma Design Tokens &amp; UI Kit.pdf</span>
                    </span>
                    <span style={{ color: '#a7f3d0' }} className="font-mono text-[10px] !text-emerald-200">4.2 MB</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#032415] border border-emerald-800 flex items-center justify-between text-white">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00e676]" />
                      <span style={{ color: '#ffffff' }} className="!text-white font-medium">M-Pesa Daraja Architecture.pdf</span>
                    </span>
                    <span style={{ color: '#a7f3d0' }} className="font-mono text-[10px] !text-emerald-200">1.8 MB</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Support & Change Request Desk (5 cols) */}
            <div className="lg:col-span-5 bg-[#032415] border border-emerald-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between text-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LifeBuoy className="w-4 h-4 text-[#00e676]" />
                  <h4 style={{ color: '#ffffff' }} className="font-black text-sm !text-white">
                    Submit Priority Ticket / Request
                  </h4>
                </div>
                <p style={{ color: '#d1fae5' }} className="text-xs !text-emerald-100 mb-4 leading-relaxed font-normal">
                  Need a content update, bug fix, or new API integration? Our engineering squad responds within 20 minutes during office hours.
                </p>

                {ticketSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-700 text-center animate-in fade-in">
                    <CheckCircle2 className="w-10 h-10 text-[#00e676] mx-auto mb-2" />
                    <h5 style={{ color: '#ffffff' }} className="font-bold text-sm !text-white">Support message draft opened</h5>
                    <p style={{ color: '#d1fae5' }} className="text-xs !text-emerald-100 mt-1">
                      Press Send in WhatsApp or your email app to deliver this request. This demo does not create a support ticket or notify an engineer.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="ticket-category" style={{ color: '#a7f3d0' }} className="block text-[11px] font-mono !text-emerald-200 uppercase mb-1 font-semibold">
                        Category
                      </label>
                      <select
                        id="ticket-category"
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-[#021a0f] border border-emerald-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#00e676]"
                      >
                        <option value="bug">Bug Fix / Outage</option>
                        <option value="content">Content / Banner Update</option>
                        <option value="feature">New Feature / Scope Extension</option>
                        <option value="seo">SEO / Analytics Query</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="portal-ticket-subject" style={{ color: '#a7f3d0' }} className="block text-[11px] font-mono !text-emerald-200 uppercase mb-1 font-semibold">
                        Subject
                      </label>
                      <input
                        id="portal-ticket-subject"
                        type="text"
                        aria-label="Subject"
                        required
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="e.g. Update M-Pesa Shortcode in staging"
                        className="w-full px-3 py-2 bg-[#021a0f] border border-emerald-800 rounded-lg text-xs text-white placeholder:text-emerald-300/40 focus:outline-none focus:border-[#00e676]"
                      />
                    </div>

                    <div>
                      <label htmlFor="portal-ticket-description" style={{ color: '#a7f3d0' }} className="block text-[11px] font-mono !text-emerald-200 uppercase mb-1 font-semibold">
                        Description / Details
                      </label>
                      <textarea
                        id="portal-ticket-description"
                        aria-label="Description / Details"
                        required
                        rows={3}
                        value={ticketDescription}
                        onChange={(e) => setTicketDescription(e.target.value)}
                        placeholder="Describe the adjustment or provide page link..."
                        className="w-full px-3 py-2 bg-[#021a0f] border border-emerald-800 rounded-lg text-xs text-white placeholder:text-emerald-300/40 focus:outline-none focus:border-[#00e676] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="submit"
                        style={{ color: '#ffffff', backgroundColor: '#00c853' }}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#00c853]/25 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 !text-white" />
                        <span style={{ color: '#ffffff' }} className="!text-white">Open WhatsApp draft</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleTicketSubmit(e, 'email')}
                        style={{ color: '#ffffff' }}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 !text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-emerald-600 transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 !text-white" />
                        <span style={{ color: '#ffffff' }} className="!text-white">Open email draft</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-emerald-800/80 text-[11px] text-emerald-200/80 flex items-center justify-between">
                <span>Direct Emergency Hotline:</span>
                <span style={{ color: '#00e676' }} className="!text-[#00e676] font-mono font-bold">+254 118746676</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
