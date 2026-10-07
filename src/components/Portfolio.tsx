import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, ArrowUpRight, TrendingUp, CheckCircle, 
  X, Layers, MapPin, Quote, Clock, Calendar 
} from 'lucide-react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioGridSkeleton } from './Skeletons';

interface PortfolioProps {
  onBookSimilarProject: (projectTitle: string) => void;
  initialLoading?: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ 
  onBookSimilarProject,
  initialLoading = true
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const { t } = useLanguage();

  const categories = ['All', 'E-Commerce', 'SEO & Marketing', 'CRM & Software', 'Web & Mobile', 'Branding & Design'];

  // Initial smooth mount skeleton
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

  const filteredCases = activeCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            {t('port.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('port.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('port.subtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-10 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid with Loading Skeleton */}
        {isLoading ? (
          <PortfolioGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {filteredCases.map((item) => (
              <div
                key={item.id}
                className="group bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
              >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  {/* Category unboxed tag */}
                  <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-300 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                    {item.category}
                  </div>

                  {/* Estimated Timeline Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-300 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.estimatedTimeline}</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Client & Location */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span className="font-semibold text-slate-300">{item.client}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Estimated Timeline Indicator Row */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3 pb-2.5 border-b border-slate-800/60 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-500 uppercase text-[10px] tracking-wider">Estimated Turnaround:</span>
                    <span className="text-slate-200 font-semibold">{item.estimatedTimeline}</span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Highlight Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950/70 border border-slate-800/90 mb-4">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400 block">
                          {m.value}
                        </span>
                        <span className="text-[10px] text-slate-400 block line-clamp-1">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    {item.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card CTA */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setSelectedCase(item)}
                  className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

      </div>

      {/* Case Study Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                {selectedCase.category} · {selectedCase.location}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {selectedCase.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">Client: {selectedCase.client}</p>
            </div>

            {/* Key Metrics Banner */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6">
              {selectedCase.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400 block">
                    {m.value}
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Estimated Delivery Timeline & Phased Sprints */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-cyan-900/40 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    Verified Delivery Schedule & Sprint Pace
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-white bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
                  {selectedCase.estimatedTimeline}
                </span>
              </div>

              {selectedCase.timelineBreakdown && selectedCase.timelineBreakdown.length > 0 && (
                <div className="pt-3 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Phased Milestone Breakdown:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCase.timelineBreakdown.map((phase, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span className="font-mono text-[11px] leading-snug">{phase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-slate-800/60 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Weekly staging reviews & milestone demonstrations provided throughout each delivery sprint.</span>
              </p>
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80">
                <h4 className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-1.5 font-semibold">
                  The Core Challenge
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedCase.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5 font-semibold">
                  Domain Tech Hub's Strategic Engineering Solution
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedCase.solution}
                </p>
              </div>
            </div>

            {/* Client Testimonial */}
            {selectedCase.testimonial && (
              <div className="p-5 rounded-xl bg-stone-50 dark:bg-slate-950/70 border border-stone-200 dark:border-slate-800 mb-6 relative">
                <Quote className="w-8 h-8 text-teal-600/15 dark:text-cyan-500/20 absolute top-3 right-4 pointer-events-none" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-3">
                  "{selectedCase.testimonial.quote}"
                </p>
                <div className="text-xs font-mono">
                  <span className="text-slate-900 dark:text-white font-bold">{selectedCase.testimonial.author}</span>
                  <span className="text-slate-500 dark:text-slate-400 ml-1.5">— {selectedCase.testimonial.role}</span>
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Tech Stack Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase.techStack.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-cyan-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Want similar quantifiable results for your company?
              </p>
              <button
                onClick={() => {
                  const title = selectedCase.title;
                  setSelectedCase(null);
                  onBookSimilarProject(title);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md transition-all"
              >
                Discuss a Similar Project
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
