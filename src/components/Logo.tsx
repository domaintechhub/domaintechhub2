import React from 'react';

export interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  iconOnlyClassName?: string;
  themeSensitive?: boolean;
}

export const SproutEmblem: React.FC<{ className?: string; size?: number }> = ({ 
  className = 'w-9 h-9',
  size = 120 
}) => (
  <svg 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    aria-hidden="true"
  >
    <defs>
      {/* Precision Leaf Silhouette matching Domain Tech Hub Logo */}
      <path id="dth-leaf" d="M 0,-44 C 18,-24 20,8 0,32 C -20,8 -18,-24 0,-44 Z" />
    </defs>
    
    {/* Center Leaf (Points Vertically) */}
    <g transform="translate(60, 50)">
      <use href="#dth-leaf" x="0" y="-8" transform="scale(0.85)" fill="#A6EE35" />
    </g>
    
    {/* Left Leaf (Angled 46° Left) */}
    <g transform="translate(60, 68)">
      <use href="#dth-leaf" transform="translate(-28, -2) rotate(-46) scale(0.8)" fill="#A6EE35" />
    </g>
    
    {/* Right Leaf (Angled 46° Right) */}
    <g transform="translate(60, 68)">
      <use href="#dth-leaf" transform="translate(28, -2) rotate(46) scale(0.8)" fill="#A6EE35" />
    </g>
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  className = '',
  iconOnlyClassName = ''
}) => {
  // Dimension sizing mappings
  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  const titleSizes = {
    sm: 'text-xs tracking-tight',
    md: 'text-sm sm:text-base tracking-tight',
    lg: 'text-lg sm:text-xl tracking-tight',
    xl: 'text-2xl sm:text-3xl tracking-tight'
  };

  const taglineSizes = {
    sm: 'text-[8px] tracking-wider',
    md: 'text-[9.5px] sm:text-[10px] tracking-widest',
    lg: 'text-[11px] sm:text-xs tracking-widest',
    xl: 'text-xs sm:text-sm tracking-widest'
  };

  if (variant === 'icon-only') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${iconOnlyClassName || iconSizes[size]} ${className}`}>
        <SproutEmblem className="w-full h-full drop-shadow-sm" />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* 3-Leaf Sprout Icon */}
        <div className={`mb-2.5 flex items-center justify-center ${iconSizes[size]}`}>
          <SproutEmblem className="w-full h-full drop-shadow-md" />
        </div>

        {/* DOMAINTECHHUB Brand Title */}
        <div className={`font-black text-slate-900 dark:text-white uppercase ${titleSizes[size]}`}>
          DOMAINTECHHUB
        </div>

        {/* Official Tagline: INNOVATE. CONNECT. SUCCEED. */}
        {showTagline && (
          <div className={`font-extrabold text-slate-700 dark:text-slate-300 uppercase mt-0.5 ${taglineSizes[size]}`}>
            INNOVATE. CONNECT. SUCCEED.
          </div>
        )}
      </div>
    );
  }

  // Default: Horizontal arrangement (emblem + text)
  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* 3-Leaf Sprout Emblem Container */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-2xl p-1 bg-white/60 dark:bg-slate-900/60 border border-stone-200/60 dark:border-slate-800/60 backdrop-blur-md shadow-xs ${iconSizes[size]}`}>
        <SproutEmblem className="w-full h-full" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`font-black text-slate-900 dark:text-white uppercase leading-none ${titleSizes[size]}`}>
            DOMAINTECHHUB
          </span>
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shrink-0" title="Engineers Available Online" />
        </div>
        
        {showTagline && (
          <span className={`font-extrabold text-slate-600 dark:text-slate-400 uppercase mt-1 leading-none ${taglineSizes[size]}`}>
            INNOVATE. CONNECT. SUCCEED.
          </span>
        )}
      </div>
    </div>
  );
};
