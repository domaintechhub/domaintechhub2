import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  iconOnlyClassName?: string;
  themeSensitive?: boolean;
  /**
   * Whether to lazily initialize the animated reveal when entering the viewport.
   * Defaults to true for optimal performance and smooth viewport reveals.
   */
  lazy?: boolean;
  /**
   * Whether to run the leaf bloom and shimmer entrance animations.
   * Defaults to true.
   */
  animated?: boolean;
  /**
   * Whether hovering re-triggers the subtle organic leaf flutter and sheen.
   * Defaults to true.
   */
  replayOnHover?: boolean;
  /**
   * Callback fired once lazy loading triggers and entrance animation begins.
   */
  onLoaded?: () => void;
}

export interface SproutEmblemProps {
  className?: string;
  size?: number;
  animated?: boolean;
  isLoaded?: boolean;
  animKey?: number;
}

/**
 * 3-Leaf Sprout Emblem for Domain Tech Hub
 * Replicates the official brand symbol with choreographed organic leaf bloom transitions.
 */
export const SproutEmblem: React.FC<SproutEmblemProps> = ({ 
  className = 'w-9 h-9',
  size = 120,
  animated = true,
  isLoaded = true,
  animKey = 0
}) => (
  <svg 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} overflow-visible`}
    width={size}
    height={size}
    aria-hidden="true"
  >
    <defs>
      {/* Precision Leaf Silhouette matching Domain Tech Hub Logo */}
      <path id="dth-leaf-path" d="M 0,-44 C 18,-24 20,8 0,32 C -20,8 -18,-24 0,-44 Z" />

      {/* Radiant Lime Brand Gradient */}
      <linearGradient id="dth-lime-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#95e424" />
        <stop offset="60%" stopColor="#a6ee35" />
        <stop offset="100%" stopColor="#bcf35e" />
      </linearGradient>

      {/* Shimmer Sheen Reflection Mask */}
      <linearGradient id="dth-leaf-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Center Leaf (Sprouts Vertically) */}
    <g 
      key={`center-${animKey}`}
      className={animated && isLoaded ? 'logo-leaf-center-anim' : animated ? 'opacity-0' : 'opacity-100'}
      style={{ transformOrigin: '60px 68px' }}
    >
      <g transform="translate(60, 50)">
        <use href="#dth-leaf-path" x="0" y="-8" transform="scale(0.85)" fill="url(#dth-lime-grad)" />
      </g>
    </g>
    
    {/* Left Leaf (Angled 46° Left) */}
    <g 
      key={`left-${animKey}`}
      className={animated && isLoaded ? 'logo-leaf-left-anim' : animated ? 'opacity-0' : 'opacity-100'}
      style={{ transformOrigin: '60px 68px' }}
    >
      <g transform="translate(60, 68)">
        <use href="#dth-leaf-path" transform="translate(-28, -2) rotate(-46) scale(0.8)" fill="url(#dth-lime-grad)" />
      </g>
    </g>
    
    {/* Right Leaf (Angled 46° Right) */}
    <g 
      key={`right-${animKey}`}
      className={animated && isLoaded ? 'logo-leaf-right-anim' : animated ? 'opacity-0' : 'opacity-100'}
      style={{ transformOrigin: '60px 68px' }}
    >
      <g transform="translate(60, 68)">
        <use href="#dth-leaf-path" transform="translate(28, -2) rotate(46) scale(0.8)" fill="url(#dth-lime-grad)" />
      </g>
    </g>
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  className = '',
  iconOnlyClassName = '',
  lazy = true,
  animated = true,
  replayOnHover = true,
  onLoaded
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(!lazy);
  const [animKey, setAnimKey] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Lazy loading IntersectionObserver implementation
  useEffect(() => {
    if (!lazy) {
      setIsLoaded(true);
      return;
    }

    // Fallback if IntersectionObserver is unavailable
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsLoaded(true);
      onLoaded?.();
      return;
    }

    const currentEl = containerRef.current;
    if (!currentEl) return;

    // Observe when the logo comes near or into the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsLoaded(true);
          onLoaded?.();
          observer.disconnect();
        }
      },
      {
        rootMargin: '80px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [lazy, onLoaded]);

  // Re-trigger animation on deliberate hover
  const handleMouseEnter = useCallback(() => {
    if (!replayOnHover || !isLoaded) return;
    setHasInteracted(true);
    setAnimKey((prev) => prev + 1);
  }, [replayOnHover, isLoaded]);

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

  // Skeleton placeholders to prevent CLS
  const skeletonWidths = {
    sm: { title: 'w-24 h-3', tag: 'w-32 h-2' },
    md: { title: 'w-28 sm:w-36 h-3.5 sm:h-4', tag: 'w-36 sm:w-48 h-2 sm:h-2.5' },
    lg: { title: 'w-40 sm:w-48 h-5 sm:h-6', tag: 'w-48 sm:w-56 h-2.5 sm:h-3' },
    xl: { title: 'w-52 sm:w-64 h-7 sm:h-8', tag: 'w-60 sm:w-72 h-3.5 sm:h-4' },
  };

  // 1. Icon-only variant
  if (variant === 'icon-only') {
    return (
      <div 
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        className={`relative flex items-center justify-center shrink-0 ${iconOnlyClassName || iconSizes[size]} ${className}`}
      >
        {/* Placeholder skeleton while unobserved */}
        {!isLoaded && (
          <div className="absolute inset-0 rounded-2xl logo-skeleton-pulse" />
        )}

        <SproutEmblem 
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
          animated={animated}
          isLoaded={isLoaded}
          animKey={animKey}
        />
      </div>
    );
  }

  // 2. Stacked variant (emblem centered on top of brand wordmark)
  if (variant === 'stacked') {
    return (
      <div 
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        className={`flex flex-col items-center text-center select-none ${className}`}
      >
        {/* 3-Leaf Sprout Icon with ambient liquid glass backing */}
        <div className={`relative mb-2.5 flex items-center justify-center p-2 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-stone-200/60 dark:border-slate-800/60 backdrop-blur-md shadow-xs overflow-hidden ${iconSizes[size]}`}>
          {/* Skeleton placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 rounded-2xl logo-skeleton-pulse" />
          )}

          {/* Ambient Glow Aura */}
          {animated && isLoaded && (
            <div 
              key={`glow-${animKey}`}
              className="absolute inset-0 rounded-2xl pointer-events-none logo-emblem-glow-anim" 
            />
          )}

          {/* Light Shimmer Sweep */}
          {animated && isLoaded && (
            <div 
              key={`shimmer-${animKey}`}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 dark:via-lime-300/30 to-transparent pointer-events-none logo-shimmer-sweep-anim -z-0" 
            />
          )}

          <SproutEmblem 
            className="w-full h-full drop-shadow-md z-10 transition-transform duration-300 group-hover:scale-105" 
            animated={animated}
            isLoaded={isLoaded}
            animKey={animKey}
          />
        </div>

        {/* DOMAINTECHHUB Brand Title */}
        {!isLoaded ? (
          <div className={`${skeletonWidths[size].title} rounded-md logo-skeleton-pulse mt-1`} />
        ) : (
          <div 
            key={`title-${animKey}`}
            className={`font-black text-slate-900 dark:text-white uppercase ${titleSizes[size]} ${
              animated ? 'logo-text-anim' : ''
            }`}
          >
            DOMAINTECHHUB
          </div>
        )}

        {/* Official Tagline: INNOVATE. CONNECT. SUCCEED. */}
        {showTagline && (
          !isLoaded ? (
            <div className={`${skeletonWidths[size].tag} rounded-md logo-skeleton-pulse mt-1.5`} />
          ) : (
            <div 
              key={`tag-${animKey}`}
              className={`font-extrabold text-slate-700 dark:text-slate-300 uppercase mt-0.5 ${taglineSizes[size]} ${
                animated ? 'logo-tagline-anim' : ''
              }`}
            >
              INNOVATE. CONNECT. SUCCEED.
            </div>
          )
        )}
      </div>
    );
  }

  // 3. Default: Horizontal arrangement (emblem + text alongside)
  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`group flex items-center gap-2.5 shrink-0 select-none ${className}`}
    >
      {/* 3-Leaf Sprout Emblem Container with liquid glass styling */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-2xl p-1 bg-white/70 dark:bg-slate-900/70 border border-stone-200/70 dark:border-slate-800/70 backdrop-blur-md shadow-xs overflow-hidden transition-all duration-300 group-hover:border-lime-400/60 dark:group-hover:border-lime-500/50 group-hover:shadow-lime-500/10 ${iconSizes[size]}`}>
        {/* Placeholder skeleton while lazy unobserved */}
        {!isLoaded && (
          <div className="absolute inset-0 rounded-2xl logo-skeleton-pulse" />
        )}

        {/* Ambient Glow Aura */}
        {animated && isLoaded && (
          <div 
            key={`glow-${animKey}`}
            className="absolute inset-0 rounded-2xl pointer-events-none logo-emblem-glow-anim" 
          />
        )}

        {/* Light Shimmer Sweep across container */}
        {animated && isLoaded && (
          <div 
            key={`shimmer-${animKey}`}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 dark:via-lime-300/30 to-transparent pointer-events-none logo-shimmer-sweep-anim -z-0" 
          />
        )}

        <SproutEmblem 
          className="w-full h-full z-10 transition-transform duration-300 group-hover:scale-105" 
          animated={animated}
          isLoaded={isLoaded}
          animKey={animKey}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        {!isLoaded ? (
          <>
            <div className={`${skeletonWidths[size].title} rounded-md logo-skeleton-pulse`} />
            {showTagline && (
              <div className={`${skeletonWidths[size].tag} rounded-md logo-skeleton-pulse mt-1.5`} />
            )}
          </>
        ) : (
          <>
            <div 
              key={`title-${animKey}`}
              className="flex items-center gap-1.5"
            >
              <span className={`font-black text-slate-900 dark:text-white uppercase leading-none transition-colors duration-200 group-hover:text-lime-600 dark:group-hover:text-lime-400 ${titleSizes[size]} ${
                animated ? 'logo-text-anim' : ''
              }`}>
                DOMAINTECHHUB
              </span>

              {/* Online indicator ping */}
              <span className="relative flex h-2 w-2 shrink-0" title="Engineers Available Online">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
              </span>
            </div>
            
            {showTagline && (
              <span 
                key={`tag-${animKey}`}
                className={`font-extrabold text-slate-600 dark:text-slate-400 uppercase mt-1 leading-none tracking-widest transition-colors duration-200 ${taglineSizes[size]} ${
                  animated ? 'logo-tagline-anim' : ''
                }`}
              >
                INNOVATE. CONNECT. SUCCEED.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
