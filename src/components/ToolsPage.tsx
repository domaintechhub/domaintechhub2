import React, { useState } from 'react';
import { Calculator, Gauge, Server, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { CostCalculator } from './CostCalculator';
import { SeoAuditTool } from './SeoAuditTool';
import { DomainChecker } from './DomainChecker';

export type ToolTab = 'calculator' | 'audit' | 'domains';

interface ToolsPageProps {
  initialTab?: ToolTab;
  onNavigateHome: () => void;
  onProceedToBooking: (quoteSummary: string, estimatedTotal: string) => void;
  onFixAuditWithAgency: (domain: string, issueCount: number) => void;
  onSelectDomainForSetup: (domainName: string, ext: string) => void;
  calculatorServiceId: string;
  onTabChange?: (tab: ToolTab) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  initialTab = 'calculator',
  onNavigateHome,
  onProceedToBooking,
  onFixAuditWithAgency,
  onSelectDomainForSetup,
  calculatorServiceId,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<ToolTab>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tab: ToolTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    {
      id: 'calculator' as ToolTab,
      label: 'Cost & Scope Estimator',
      shortLabel: 'Scope Estimator',
      icon: Calculator,
      description: 'Configure custom modules, tech stack, and generate real-time budgets in USD & KES.'
    },
    {
      id: 'audit' as ToolTab,
      label: 'Core Web Vitals & SEO Scanner',
      shortLabel: 'Performance Scanner',
      icon: Gauge,
      description: 'Preview an illustrative report; this static demo does not scan a live website.'
    },
    {
      id: 'domains' as ToolTab,
      label: '.co.ke Domain & NVMe Hosting',
      shortLabel: 'Domain Lookup',
      icon: Server,
      description: 'Explore domain options and ask the team to check availability; no live registry lookup is connected.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <PageHeader
        badge="Developer & Client Tools"
        title="Interactive Engineering Tools & Estimators"
        description="Planning calculators and demo utilities. Live registry lookups and website scans are not connected."
        currentBreadcrumb="Developer & Client Tools"
        onNavigateHome={onNavigateHome}
      />

      {/* Tool Selection Segmented Switcher */}
      <div className="border-b border-stone-200/90 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="inline-flex p-1 bg-stone-100 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 rounded-2xl overflow-x-auto max-w-full shadow-xs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-white text-teal-800 border border-teal-300 shadow-sm dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/40'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-stone-200/60 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-cyan-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden md:flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real-Time Free Calculations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Tool View */}
      <div className="py-8">
        {activeTab === 'calculator' && (
          <CostCalculator
            initialServiceId={calculatorServiceId}
            onProceedToBooking={onProceedToBooking}
          />
        )}

        {activeTab === 'audit' && (
          <SeoAuditTool
            onFixWithAgency={onFixAuditWithAgency}
          />
        )}

        {activeTab === 'domains' && (
          <DomainChecker
            onSelectDomainForSetup={onSelectDomainForSetup}
          />
        )}
      </div>
    </div>
  );
};
