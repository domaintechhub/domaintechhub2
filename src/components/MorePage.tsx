import React, { useState, useEffect } from 'react';
import { 
  Rocket, Users, Cpu, Layers, CheckCircle2, 
  ArrowRight, MessageSquare, Clock, ShieldCheck, FileCode2,
  BookOpen
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { ProjectRoadmap, SprintTimeline } from './ProjectRoadmap';
import { TeamSection } from './TeamSection';
import { TechStackSection } from './TechStackSection';
import { InsightsSection } from './InsightsSection';
import { AGENCY_INFO } from '../data/portfolioData';

export type MoreTab = 'roadmap' | 'team' | 'tech-stack' | 'blog';

interface MorePageProps {
  initialTab?: MoreTab;
  onNavigateHome: () => void;
  onStartSprint: (timeline: SprintTimeline, stageId?: string) => void;
  onOpenCalculator: () => void;
  onBookCall: () => void;
  onScheduleWithMember: (name: string, role: string) => void;
  onSelectTechForProject: (techName: string) => void;
  onTabChange?: (tab: MoreTab) => void;
}

export const MorePage: React.FC<MorePageProps> = ({
  initialTab = 'roadmap',
  onNavigateHome,
  onStartSprint,
  onOpenCalculator,
  onBookCall,
  onScheduleWithMember,
  onSelectTechForProject,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<MoreTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabClick = (tab: MoreTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    {
      id: 'roadmap' as MoreTab,
      label: 'Project Roadmap',
      shortLabel: 'Roadmap',
      badge: '4–8 Wks',
      icon: Rocket,
      description: 'Predictable 5-stage agile sprint delivery cycle with milestone gates and warranty.'
    },
    {
      id: 'team' as MoreTab,
      label: 'Our Engineering Team',
      shortLabel: 'Engineering Team',
      badge: 'Nairobi Studio',
      icon: Users,
      description: 'Senior software architects, product designers, and fintech engineers behind your code.'
    },
    {
      id: 'tech-stack' as MoreTab,
      label: 'Tech Stack & Architecture',
      shortLabel: 'Tech Stack',
      badge: 'Modern Stack',
      icon: Cpu,
      description: 'Modern TypeScript, Next.js, Node.js, PostgreSQL, Docker, and Cloudflare infrastructure.'
    },
    {
      id: 'blog' as MoreTab,
      label: 'Engineering Blog & Articles',
      shortLabel: 'Blog & Articles',
      badge: 'Tech Guides',
      icon: BookOpen,
      description: 'In-depth architectural breakdowns, Safaricom Daraja M-Pesa playbooks, Next.js benchmarks, and SEO strategies.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Page Header */}
      <PageHeader
        badge={
          activeTab === 'blog'
            ? 'Engineering Publications & Research'
            : 'Agency Delivery & Senior Engineering'
        }
        badgeIcon={
          activeTab === 'blog'
            ? <BookOpen className="w-3.5 h-3.5 text-teal-500" />
            : <Layers className="w-3.5 h-3.5 text-teal-500" />
        }
        title={
          activeTab === 'roadmap'
            ? '4 to 8 Week Agile Sprint Roadmap & Milestones'
            : activeTab === 'team'
            ? 'Meet the Senior Architects & Engineers'
            : activeTab === 'tech-stack'
            ? 'Modern Enterprise Tech Stack & Cloud Architecture'
            : 'Engineering Blog, Tech Insights & Architectural Guides'
        }
        description={
          activeTab === 'roadmap'
            ? 'Explore our predictable 5-stage sprint methodology: live staging access, weekly video demos, signed milestone deliverables, and strict production guarantees.'
            : activeTab === 'team'
            ? 'We do not outsource your project to unvetted freelancers. Collaborate directly with senior Nairobi software architects and fintech developers who engineer systems that scale.'
            : activeTab === 'tech-stack'
            ? 'We architect web systems with strict TypeScript contracts, PostgreSQL schemas, and low-latency African CDN edge networks.'
            : 'Explore in-depth engineering breakdowns, Safaricom Daraja 3.0 M-Pesa API playbooks, high-performance Next.js architectures, and practical technical SEO guides written by our Nairobi engineering team.'
        }
        currentBreadcrumb={
          activeTab === 'roadmap'
            ? 'Project Roadmap'
            : activeTab === 'team'
            ? 'Our Engineering Team'
            : activeTab === 'tech-stack'
            ? 'Tech Stack'
            : 'Blog & Articles'
        }
        onNavigateHome={onNavigateHome}
        actionButton={{
          label: "Estimate Project Scope",
          onClick: onOpenCalculator
        }}
      />

      {/* 2. Sticky Tab Segmented Navigation Bar */}
      <div className="border-b border-stone-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="inline-flex p-1 bg-stone-100 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 rounded-2xl overflow-x-auto max-w-full shadow-xs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-teal-800 border border-teal-300 shadow-sm dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/40'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-stone-200/60 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-cyan-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full hidden md:inline-block ${
                      isActive 
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' 
                        : 'bg-stone-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden lg:flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% In-House Nairobi Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tab Content */}
      <div className="py-8">
        {/* Tab 1: Project Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="animate-in fade-in duration-200">
            {/* Engineering Commitments Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Fixed-Bid Scope Contract</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Weekly Staging &amp; Video Demos</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>30-Day Zero-Cost Bug Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <FileCode2 className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Full Source Code &amp; IP Transfer</span>
                </div>
              </div>
            </div>

            <ProjectRoadmap 
              onStartSprint={onStartSprint}
              onOpenCalculator={onOpenCalculator}
            />

            {/* Bottom Technical Consultation Callout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6">
              <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center lg:text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
                    <Rocket className="w-4 h-4" />
                    <span>Immediate Sprint Availability</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Ready to Lock In Your Delivery Sprint?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Schedule a 30-minute discovery call directly with our Lead Solutions Architect in Nairobi. We will audit your specifications and schedule your custom delivery milestones.
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
        )}

        {/* Tab 2: Our Engineering Team */}
        {activeTab === 'team' && (
          <div className="animate-in fade-in duration-200">
            <TeamSection onScheduleWithMember={onScheduleWithMember} />
          </div>
        )}

        {/* Tab 3: Tech Stack & Architecture */}
        {activeTab === 'tech-stack' && (
          <div className="animate-in fade-in duration-200">
            <TechStackSection onSelectTechForProject={onSelectTechForProject} />
          </div>
        )}

        {/* Tab 4: Engineering Blog & Articles */}
        {activeTab === 'blog' && (
          <div className="animate-in fade-in duration-200">
            <InsightsSection 
              onScheduleConsultation={(topic) => onScheduleWithMember('Lead Solutions Architect', topic)} 
              initialLoading={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
