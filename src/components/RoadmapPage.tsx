import React from 'react';
import { 
  Rocket, Calendar, CheckCircle2, ShieldCheck, ArrowRight, 
  Clock, Sparkles, MessageSquare, PhoneCall, Layers, FileCode2
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { ProjectRoadmap, SprintTimeline } from './ProjectRoadmap';
import { AGENCY_INFO } from '../data/portfolioData';

interface RoadmapPageProps {
  onNavigateHome: () => void;
  onStartSprint: (timeline: SprintTimeline, stageId?: string) => void;
  onOpenCalculator: () => void;
  onBookCall: () => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  onNavigateHome,
  onStartSprint,
  onOpenCalculator,
  onBookCall,
}) => {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Header Banner */}
      <PageHeader
        badge="Agile Delivery Methodology · Zero Guesswork"
        badgeIcon={<Rocket className="w-3.5 h-3.5 text-teal-500" />}
        title="4 to 8 Week Agile Sprint Roadmap & Milestones"
        description="Unclear timelines cause lost revenue and endless delays. Discover our battle-tested 5-stage sprint engineering methodology: live staging access, weekly video demos, signed milestone deliverables, and strict production guarantees."
        currentBreadcrumb="Project Roadmap"
        onNavigateHome={onNavigateHome}
        actionButton={{
          label: "Estimate Scope & Budget",
          onClick: onOpenCalculator
        }}
      />

      {/* 2. Key Engineering Commitments Strip */}
      <div className="border-b border-stone-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% Fixed-Bid Scope Contract</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Clock className="w-4 h-4 text-teal-500 shrink-0" />
              <span>Weekly Staging & Video Demos</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>30-Day Zero-Cost Bug Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <FileCode2 className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Full Source Code & IP Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Sprint Roadmap Component */}
      <div className="py-6">
        <ProjectRoadmap 
          onStartSprint={onStartSprint}
          onOpenCalculator={onOpenCalculator}
        />
      </div>

      {/* 4. Bottom Technical Consultation Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
              <Calendar className="w-4 h-4" />
              <span>Immediate Sprint Availability</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Ready to Lock In Your Delivery Sprint?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Schedule a 30-minute discovery call directly with our Lead Solutions Architect in Nairobi. We will audit your requirements, confirm your architectural dependencies, and map out your custom 4, 6, or 8-week delivery milestones.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Book Technical Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub,%20I%20would%20like%20to%20discuss%20a%20project%20sprint%20timeline.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-stone-300 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Chat via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
