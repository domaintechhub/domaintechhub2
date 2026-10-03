import React from 'react';

/**
 * High-fidelity Skeleton primitive with smooth pulse and subtle neutral tones
 * that match both dark slate and light modes.
 */
export const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ 
  className = '', 
  style 
}) => {
  return (
    <div 
      className={`bg-stone-200 dark:bg-slate-800/80 animate-pulse rounded-md ${className}`} 
      style={style} 
    />
  );
};

/**
 * Skeleton for individual Service cards inside ServicesExplorer
 */
export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/70 border border-stone-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
      <div>
        {/* Header with Icon Box & Category Kicker */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-xl bg-teal-100/60 dark:bg-slate-800" />
          <div className="flex flex-col items-end gap-1.5">
            <Skeleton className="w-20 h-3 rounded" />
            <Skeleton className="w-14 h-2.5 rounded" />
          </div>
        </div>

        {/* Title */}
        <Skeleton className="w-3/4 h-5 rounded mb-2.5" />

        {/* Short Description */}
        <div className="space-y-1.5 mb-5">
          <Skeleton className="w-full h-3.5 rounded" />
          <Skeleton className="w-4/5 h-3.5 rounded" />
        </div>

        {/* Feature deliverables checklist */}
        <div className="space-y-2 mb-5 pt-3 border-t border-stone-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
            <Skeleton className="w-5/6 h-3 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
            <Skeleton className="w-4/6 h-3 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
            <Skeleton className="w-3/4 h-3 rounded" />
          </div>
        </div>

        {/* Technology Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          <Skeleton className="w-16 h-5 rounded-md" />
          <Skeleton className="w-14 h-5 rounded-md" />
          <Skeleton className="w-20 h-5 rounded-md" />
        </div>
      </div>

      {/* Footer / Price & Actions */}
      <div className="pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <Skeleton className="w-12 h-2.5 rounded mb-1" />
          <Skeleton className="w-20 h-4 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-8 rounded-lg" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

/**
 * Grid of Service Card Skeletons
 */
export const ServicesGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading services...">
      {Array.from({ length: count }).map((_, idx) => (
        <ServiceCardSkeleton key={idx} />
      ))}
    </div>
  );
};

/**
 * Skeleton for individual Case Study / Portfolio card
 */
export const PortfolioCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/60 border border-stone-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
      <div>
        {/* Image Banner Skeleton */}
        <div className="relative h-48 w-full bg-stone-200 dark:bg-slate-950 overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          {/* Category Tag skeleton */}
          <div className="absolute bottom-3 left-4">
            <Skeleton className="w-24 h-6 rounded-md bg-stone-300 dark:bg-slate-800" />
          </div>
          {/* Timeline Badge skeleton */}
          <div className="absolute top-3 right-3">
            <Skeleton className="w-20 h-6 rounded-md bg-stone-300 dark:bg-slate-800" />
          </div>
        </div>

        <div className="p-6">
          {/* Client & Location */}
          <div className="flex items-center justify-between mb-2.5">
            <Skeleton className="w-28 h-3.5 rounded" />
            <Skeleton className="w-20 h-3.5 rounded" />
          </div>

          {/* Title */}
          <Skeleton className="w-4/5 h-5 rounded mb-3" />

          {/* Turnaround row */}
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-stone-100 dark:border-slate-800/60">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-36 h-3 rounded" />
          </div>

          {/* Summary lines */}
          <div className="space-y-1.5 mb-4">
            <Skeleton className="w-full h-3.5 rounded" />
            <Skeleton className="w-5/6 h-3.5 rounded" />
          </div>

          {/* Metrics Trio */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-stone-50 dark:bg-slate-950/70 border border-stone-200/70 dark:border-slate-800/90 mb-4">
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="w-12 h-4 rounded" />
              <Skeleton className="w-14 h-2.5 rounded" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="w-12 h-4 rounded" />
              <Skeleton className="w-14 h-2.5 rounded" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="w-12 h-4 rounded" />
              <Skeleton className="w-14 h-2.5 rounded" />
            </div>
          </div>

          {/* Tech Stack pills */}
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-14 h-5 rounded" />
            <Skeleton className="w-16 h-5 rounded" />
            <Skeleton className="w-12 h-5 rounded" />
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-6 pt-2">
        <Skeleton className="w-full h-9 rounded-xl" />
      </div>
    </div>
  );
};

/**
 * Grid of Portfolio Card Skeletons
 */
export const PortfolioGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading case studies...">
      {Array.from({ length: count }).map((_, idx) => (
        <PortfolioCardSkeleton key={idx} />
      ))}
    </div>
  );
};

/**
 * Featured Insight Spotlight Skeleton
 */
export const FeaturedInsightSkeleton: React.FC = () => {
  return (
    <div className="mb-12 rounded-3xl bg-white/80 dark:bg-slate-900/60 border border-stone-200/90 dark:border-slate-800/90 overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Banner Skeleton */}
        <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto min-h-[300px] bg-stone-200 dark:bg-slate-950">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute top-4 left-4">
            <Skeleton className="w-28 h-6 rounded-md bg-stone-300 dark:bg-slate-800" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Skeleton className="w-24 h-6 rounded-md bg-stone-300 dark:bg-slate-800" />
          </div>
        </div>

        {/* Content Block Skeleton */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="w-28 h-5 rounded-md" />
              <Skeleton className="w-24 h-4 rounded" />
            </div>

            <Skeleton className="w-5/6 h-7 rounded mb-2.5" />
            <Skeleton className="w-3/4 h-7 rounded mb-4" />

            <div className="space-y-2 mb-6">
              <Skeleton className="w-full h-3.5 rounded" />
              <Skeleton className="w-full h-3.5 rounded" />
              <Skeleton className="w-4/5 h-3.5 rounded" />
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950/70 border border-stone-200 dark:border-slate-800/80 mb-6">
              <Skeleton className="w-36 h-3 rounded mb-2" />
              <Skeleton className="w-full h-3 rounded" />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-9 h-9 rounded-full" />
              <div>
                <Skeleton className="w-24 h-3.5 rounded mb-1" />
                <Skeleton className="w-28 h-2.5 rounded" />
              </div>
            </div>
            <Skeleton className="w-28 h-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Individual Article Card Skeleton
 */
export const InsightCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/60 border border-stone-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
      <div>
        {/* Image */}
        <div className="relative h-48 w-full bg-stone-200 dark:bg-slate-950 overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute top-3 left-3">
            <Skeleton className="w-20 h-5 rounded bg-stone-300 dark:bg-slate-800" />
          </div>
          <div className="absolute bottom-3 left-3">
            <Skeleton className="w-24 h-5 rounded bg-stone-300 dark:bg-slate-800" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-2.5">
            <Skeleton className="w-20 h-4 rounded" />
            <Skeleton className="w-24 h-3.5 rounded" />
          </div>

          <Skeleton className="w-4/5 h-5 rounded mb-2.5" />

          <div className="space-y-1.5 mb-4">
            <Skeleton className="w-full h-3.5 rounded" />
            <Skeleton className="w-3/4 h-3.5 rounded" />
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950/70 border border-stone-200/80 dark:border-slate-800/80 mb-4">
            <Skeleton className="w-28 h-2.5 rounded mb-1.5" />
            <Skeleton className="w-full h-3 rounded" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <Skeleton className="w-14 h-4 rounded" />
            <Skeleton className="w-16 h-4 rounded" />
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-20 h-3 rounded" />
        </div>
        <Skeleton className="w-16 h-4 rounded" />
      </div>
    </div>
  );
};

/**
 * Insights Section Complete Loading Skeleton
 */
export const InsightsGridSkeleton: React.FC<{ showFeatured?: boolean; count?: number }> = ({ 
  showFeatured = true, 
  count = 6 
}) => {
  return (
    <div aria-label="Loading insights articles...">
      {showFeatured && <FeaturedInsightSkeleton />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <InsightCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};
