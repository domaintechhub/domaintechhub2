import React from 'react';
import { SproutEmblem } from './Logo';

export interface PageLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

/**
 * PageLoader: Displays the animated Domain Tech Hub 3-leaf sprout logo and progress shimmer
 * whenever the application is loading or transitioning between pages.
 */
export const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading Domain Tech Hub...',
  subMessage = 'Nairobi Studio · Web & Digital Systems',
  fullScreen = true,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
        fullScreen 
          ? 'fixed inset-0 bg-[#faf8f5]/95 dark:bg-slate-950/95 backdrop-blur-md' 
          : 'py-20 w-full'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      {/* Ambient background glow */}
      <div className="absolute w-44 h-44 bg-lime-400/15 dark:bg-lime-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Animated Logo Container */}
      <div className="relative flex flex-col items-center select-none text-center">
        
        {/* Glow Ring Behind Sprout Emblem */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-lime-400/20 via-teal-500/20 to-cyan-400/20 blur-md animate-spin" style={{ animationDuration: '6s' }} />
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 shadow-xl flex items-center justify-center p-3">
            <SproutEmblem 
              className="w-full h-full drop-shadow-md"
              size={90}
              animated={true}
              isLoaded={true}
            />
          </div>
        </div>

        {/* Brand Title */}
        <div className="font-extrabold tracking-tight text-slate-900 dark:text-white text-base sm:text-lg mb-1 flex items-center gap-1.5 font-sans">
          <span>DOMAIN</span>
          <span className="text-teal-600 dark:text-teal-400">TECH</span>
          <span className="text-lime-500 dark:text-lime-400">HUB</span>
        </div>

        {/* Subtitle / Status message */}
        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
          {message}
        </div>

        {/* High-Performance Progress Bar */}
        <div className="w-48 sm:w-56 h-1 bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
          <div 
            className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-lime-400 via-teal-400 to-cyan-400 animate-dth-progress"
            style={{ width: '45%' }}
          />
        </div>

        {/* Sub-note */}
        {subMessage && (
          <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-400 font-mono tracking-wider">
            {subMessage}
          </div>
        )}
      </div>
    </div>
  );
};
