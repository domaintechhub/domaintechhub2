import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, Clock, Calendar, Search, ArrowRight, 
  ArrowUpRight, X, Check, Share2, Tag, Terminal,
  MessageSquare, ChevronRight, FileText,
  Layers, BarChart2
} from 'lucide-react';
import { INSIGHT_ARTICLES, INSIGHT_CATEGORIES, InsightArticle } from '../data/insightsData';
import { AGENCY_INFO } from '../data/portfolioData';
import { InsightsGridSkeleton } from './Skeletons';

interface InsightsSectionProps {
  onScheduleConsultation?: (topic: string) => void;
  initialLoading?: boolean;
}

export type ReadDurationFilter = 'all' | 'quick' | 'deep';

export interface ReadStats {
  wordCount: number;
  minutes: number;
  label: string;
  depthTier: 1 | 2 | 3; // 1: Quick (<=4m), 2: Standard (5-6m), 3: In-Depth (7+m)
  wpm: number;
}

// Compute accurate reading time based on technical copy and code blocks
export const calculateReadStats = (article: InsightArticle): ReadStats => {
  let wordCount = 0;
  
  // Title & excerpt
  wordCount += (article.title.match(/\S+/g) || []).length;
  wordCount += (article.excerpt.match(/\S+/g) || []).length;
  
  // Key takeaways
  article.keyTakeaways.forEach(t => {
    wordCount += (t.match(/\S+/g) || []).length;
  });

  // Body and code
  article.contentSections.forEach(section => {
    wordCount += (section.heading.match(/\S+/g) || []).length;
    wordCount += (section.body.match(/\S+/g) || []).length;
    if (section.codeSnippet) {
      // Code takes slightly longer to parse mentally; weight code lines
      wordCount += Math.round((section.codeSnippet.match(/\S+/g) || []).length * 1.2);
    }
  });

  // Standard adult comprehension speed for technical documentation is ~200 WPM
  const minutes = Math.max(2, Math.ceil(wordCount / 200));
  
  let depthTier: 1 | 2 | 3 = 2;
  let label = 'Standard Read';
  if (minutes <= 4) {
    depthTier = 1;
    label = 'Quick Read';
  } else if (minutes >= 6) {
    depthTier = 3;
    label = 'Deep Architecture Dive';
  }

  return {
    wordCount,
    minutes,
    label,
    depthTier,
    wpm: 200
  };
};

export const InsightsSection: React.FC<InsightsSectionProps> = ({ 
  onScheduleConsultation,
  initialLoading = true
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Articles');
  const [durationFilter, setDurationFilter] = useState<ReadDurationFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [modalReadProgress, setModalReadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(initialLoading);

  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Initial mount smooth skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(cat);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  const handleDurationChange = (dur: ReadDurationFilter) => {
    if (dur === durationFilter) return;
    setIsLoading(true);
    setDurationFilter(dur);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };

  // Reset modal scroll progress when article changes
  useEffect(() => {
    if (selectedArticle) {
      setModalReadProgress(0);
    }
  }, [selectedArticle]);

  const handleModalScroll = () => {
    if (modalContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalContainerRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = (scrollTop / totalScroll) * 100;
        setModalReadProgress(Math.min(100, Math.max(0, progress)));
      }
    }
  };

  const filteredArticles = INSIGHT_ARTICLES.filter(article => {
    const matchesCategory = activeCategory === 'All Articles' || article.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Duration filter
    const stats = calculateReadStats(article);
    let matchesDuration = true;
    if (durationFilter === 'quick') {
      matchesDuration = stats.minutes <= 5;
    } else if (durationFilter === 'deep') {
      matchesDuration = stats.minutes >= 6;
    }

    return matchesCategory && matchesQuery && matchesDuration;
  });

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const gridArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

  const handleShare = (article: InsightArticle) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // safe fallback
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="insights" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Thought Leadership · Insights & Engineering Trends</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Perspectives on African digital scale, fintech & high-performance software.
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Practical technical architectural teardowns, conversion optimization playbooks, and regional market insights authored by Domain Tech Hub engineers in Nairobi.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Time-to-Read Verified</span>
            </div>
          </div>
        </div>

        {/* Category Filters, Reading Time Filter & Search */}
        <div className="space-y-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Row 1: Category Filter Buttons */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Segmented Control */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
              {INSIGHT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Keyword Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search topics, tech, or tags..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Reading Time Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Estimated Reading Time Filter:</span>
              <div className="inline-flex p-0.5 bg-slate-900/80 border border-slate-800 rounded-lg">
                <button
                  onClick={() => handleDurationChange('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    durationFilter === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Lengths
                </button>
                <button
                  onClick={() => handleDurationChange('quick')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                    durationFilter === 'quick'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Articles taking 5 minutes or less to read"
                >
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Quick Reads (≤ 5 min)</span>
                </button>
                <button
                  onClick={() => handleDurationChange('deep')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                    durationFilter === 'deep'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="In-depth architectural guides taking 6+ minutes"
                >
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>Deep Dives (6+ min)</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Calculated at average reading speed of 200 WPM
            </div>
          </div>

        </div>

        {/* Articles Content or Skeleton */}
        {isLoading ? (
          <InsightsGridSkeleton 
            showFeatured={activeCategory === 'All Articles' && searchQuery === '' && durationFilter === 'all'} 
            count={6} 
          />
        ) : (
          <>
            {/* Featured Spotlight Article (if available) */}
            {featuredArticle && activeCategory === 'All Articles' && searchQuery === '' && durationFilter === 'all' && (() => {
          const stats = calculateReadStats(featuredArticle);
          return (
            <div className="mb-12 rounded-3xl bg-slate-900/60 border border-slate-800/90 overflow-hidden hover:border-slate-700 transition-all duration-300 group shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Image banner */}
                <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto min-h-[300px] overflow-hidden bg-slate-950">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/80" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <BookOpen className="w-3 h-3" />
                      <span>Featured Article</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-300 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
                    {featuredArticle.category}
                  </div>
                </div>

                {/* Content Block */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Reading Meta Bar with Subtle Time-to-Read Pill */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                      
                      {/* Subtle Time to Read Badge with micro depth meter */}
                      <div 
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-cyan-500/30 text-cyan-300"
                        title={`Estimated reading duration: ${stats.minutes} minutes (~${stats.wordCount.toLocaleString()} words)`}
                      >
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-semibold">{stats.minutes} min read</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-[11px] text-slate-400">~{stats.wordCount} words</span>
                        
                        {/* 3-bar subtle depth meter */}
                        <div className="flex items-center gap-0.5 ml-1" title={stats.label}>
                          <span className={`w-1 h-2 rounded-sm ${stats.depthTier >= 1 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                          <span className={`w-1 h-2.5 rounded-sm ${stats.depthTier >= 2 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                          <span className={`w-1 h-3 rounded-sm ${stats.depthTier >= 3 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                        </div>
                      </div>

                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{featuredArticle.publishedDate}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-cyan-300 transition-colors leading-snug">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>

                    {/* Highlights Pill */}
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1 font-semibold">
                        Architectural Takeaway:
                      </span>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed">
                        "{featuredArticle.keyTakeaways[0]}"
                      </p>
                    </div>
                  </div>

                  {/* Author & Action */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{featuredArticle.author.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{featuredArticle.author.role}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(featuredArticle)}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })()}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gridArticles.map((article) => {
            const stats = calculateReadStats(article);

            return (
              <article
                key={article.id}
                className="group bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Image with subtle overlays */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-300 bg-slate-950/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                      {article.category}
                    </div>

                    {/* Subtle Time to Read Badge Overlay with Mini Meter */}
                    <div 
                      className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/30 shadow-md"
                      title={`${stats.label}: ~${stats.minutes} minutes reading time (${stats.wordCount} words)`}
                    >
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span className="font-semibold">{stats.minutes}m read</span>
                      
                      {/* 3 micro-bars */}
                      <div className="flex items-center gap-0.5 ml-0.5">
                        <span className={`w-0.5 h-1.5 rounded-sm ${stats.depthTier >= 1 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                        <span className={`w-0.5 h-2 rounded-sm ${stats.depthTier >= 2 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                        <span className={`w-0.5 h-2.5 rounded-sm ${stats.depthTier >= 3 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Date & Word Count Details */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                      <span>{article.publishedDate}</span>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <FileText className="w-3 h-3 text-slate-500" />
                        <span>~{stats.wordCount} words</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => setSelectedArticle(article)}
                      className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p 
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4 cursor-pointer hover:text-slate-100 transition-colors"
                      title="Click to read full article"
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author Row & CTA */}
                <div className="px-6 pb-6 pt-0">
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-700"
                      />
                      <div className="text-[11px] font-mono text-slate-300 font-medium">
                        {article.author.name}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-14 bg-slate-900/30 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No articles match your search or reading time filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All Articles'); setDurationFilter('all'); }}
              className="mt-3 text-cyan-400 text-xs hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
        </>
        )}

        {/* Bottom Technical Newsletter / Inquiry Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-mono text-teal-600 dark:text-cyan-400 uppercase tracking-wider">
              Engineering Architecture Advisory
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Want our engineers to review your existing digital stack?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              We audit M-Pesa failure rates, slow Core Web Vitals, and lead funnel bottlenecks for Kenyan and international enterprises.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub,%20I%20read%20your%20engineering%20insights%20and%20want%20to%20discuss%20our%20tech%20stack.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Discuss on WhatsApp</span>
            </a>

            {onScheduleConsultation && (
              <button
                onClick={() => onScheduleConsultation('Technical Architecture Review')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
              >
                <span>Schedule Stack Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Full Article Reader Modal with Reading Time & Progress Bar */}
      {selectedArticle && (() => {
        const stats = calculateReadStats(selectedArticle);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
            <div 
              ref={modalContainerRef}
              onScroll={handleModalScroll}
              className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-8"
            >
              {/* In-Modal Sticky Reading Progress Bar */}
              <div className="sticky -top-6 -mx-6 sm:-top-8 sm:-mx-8 mb-6 h-1 bg-slate-800/80 z-20 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  style={{ width: `${modalReadProgress}%` }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors z-20"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Metadata */}
              <div className="mb-4 pr-10">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
                    {selectedArticle.category}
                  </span>
                  
                  {/* Subtle Time to Read Pill in Modal */}
                  <span 
                    className="text-xs font-mono text-cyan-300 bg-slate-950 px-2.5 py-0.5 rounded-md border border-cyan-500/40 flex items-center gap-1.5"
                    title={`Paced at 200 words/min (${stats.wordCount} words)`}
                  >
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{stats.minutes} min read</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{stats.label}</span>
                  </span>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-500" />
                    <span>~{stats.wordCount} words</span>
                  </span>

                  <span className="text-xs font-mono text-slate-400">·</span>
                  <span className="text-xs font-mono text-slate-400">{selectedArticle.publishedDate}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {selectedArticle.title}
                </h2>
              </div>

              {/* Author bar & Share */}
              <div className="flex items-center justify-between py-3 border-y border-slate-800/80 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedArticle.author.avatar}
                    alt={selectedArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{selectedArticle.author.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{selectedArticle.author.role} · Domain Tech Hub</div>
                  </div>
                </div>

                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                  title="Copy link to clipboard"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-cyan-900/40 mb-6">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2.5 font-bold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Executive Architectural Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Sections */}
              <div className="space-y-6 mb-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
                {selectedArticle.contentSections.map((section, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {section.heading}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {section.body}
                    </p>
                    {section.codeSnippet && (
                      <div className="mt-3 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
                        <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 flex items-center gap-2">
                          <Terminal className="w-3 h-3 text-cyan-400" />
                          <span>Production Implementation Snippet</span>
                        </div>
                        <pre className="p-4 text-cyan-300 overflow-x-auto text-[11px] leading-relaxed">
                          <code>{section.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-800">
                {selectedArticle.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Modal Bottom CTA */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-0.5">
                    Need this architecture deployed on your stack?
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Domain Tech Hub delivers turnkey production engineering for Kenyan & global enterprises.
                  </p>
                </div>

                {onScheduleConsultation && (
                  <button
                    onClick={() => {
                      const topic = selectedArticle.title;
                      setSelectedArticle(null);
                      onScheduleConsultation(topic);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md transition-all whitespace-nowrap"
                  >
                    Consult Our Team
                  </button>
                )}
              </div>

            </div>
          </div>
        );
      })()}

    </section>
  );
};
