import React from 'react';
import { ChevronRight, ArrowLeft, Home } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description: string;
  currentBreadcrumb: string;
  onNavigateHome: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  description,
  currentBreadcrumb,
  onNavigateHome,
  actionButton,
}) => {
  return (
    <div className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-stone-100/90 via-stone-50/60 to-transparent dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-950 border-b border-stone-200/90 dark:border-slate-800/80 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/50 dark:bg-teal-900/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-100/40 dark:bg-blue-900/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
          >
            <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
            <span>Home</span>
          </button>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          
          <span className="text-teal-700 dark:text-teal-300 font-bold">{currentBreadcrumb}</span>

          <span className="text-slate-400 hidden sm:inline">·</span>

          <button
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-slate-300 transition-colors text-[11px]"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Full Overview</span>
          </button>
        </div>

        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-semibold mb-3">
              {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
              <span>{badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>
          </div>

          {actionButton && (
            <div className="shrink-0">
              <button
                onClick={actionButton.onClick}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 via-teal-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs tracking-wide shadow-lg shadow-teal-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {actionButton.label}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
