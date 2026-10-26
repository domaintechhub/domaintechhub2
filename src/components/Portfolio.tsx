import React, { useState, useEffect, useMemo } from 'react';
import { 
  ExternalLink, ArrowUpRight, CheckCircle2, 
  X, Layers, MapPin, Quote, Clock, Search, 
  Globe, Lock, Sparkles, SlidersHorizontal, LayoutGrid,
  ShieldCheck, ArrowRight, Building2, Car, ShoppingCart, 
  Palmtree, GraduationCap, HeartPulse
} from 'lucide-react';
import { CASE_STUDIES } from '../data/portfolioData';
import { DEVELOPED_WEBSITES, INDUSTRY_TABS, DevelopedWebsite } from '../data/developedWebsitesData';
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
  // Navigation tabs between Live Websites (20) and Deep-Dive Case Studies (6)
  const [activePortfolioSection, setActivePortfolioSection] = useState<'all' | 'websites' | 'case-studies'>('all');
  
  // Developed Websites filtering & search
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWebsite, setSelectedWebsite] = useState<DevelopedWebsite | null>(null);

  // Case Studies filtering
  const [activeCaseCategory, setActiveCaseCategory] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const [isLoading, setIsLoading] = useState(initialLoading);
  const { t } = useLanguage();

  const caseCategories = ['All', 'E-Commerce', 'SEO & Marketing', 'CRM & Software', 'Web & Mobile', 'Branding & Design'];

  // Initial smooth mount skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Filtered developed websites with search & category
  const filteredWebsites = useMemo(() => {
    return DEVELOPED_WEBSITES.filter((site) => {
      // Category filter
      const matchesCategory = selectedIndustry === 'all' || site.industryGroup === selectedIndustry;
      
      // Search filter
      if (!searchQuery.trim()) return matchesCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        site.name.toLowerCase().includes(q) ||
        site.displayUrl.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.location.toLowerCase().includes(q) ||
        site.role.toLowerCase().includes(q) ||
        site.headline.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.techTags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedIndustry, searchQuery]);

  // Filtered case studies
  const filteredCases = useMemo(() => {
    return activeCaseCategory === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter(c => c.category === activeCaseCategory);
  }, [activeCaseCategory]);

  const getIndustryIcon = (industryId: string) => {
    switch (industryId) {
      case 'automotive':
        return <Car className="w-3.5 h-3.5" />;
      case 'real-estate':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'ecommerce':
        return <ShoppingCart className="w-3.5 h-3.5" />;
      case 'hospitality-travel':
        return <Palmtree className="w-3.5 h-3.5" />;
      case 'education-health':
        return <GraduationCap className="w-3.5 h-3.5" />;
      default:
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00c853]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HEADER & PORTFOLIO OVERVIEW STATS */}
        {/* ========================================================================= */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00e676] tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
            <span>[ VERIFIED PRODUCTION WORK ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                Websites &amp; Platforms I Took Part in Developing
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Explore live, active production websites and high-volume digital systems co-engineered for companies across Kenya, East Africa, South Africa, and international markets. Each project features its dedicated space, technology stack breakdown, and direct link to the live production site.
              </p>
            </div>

            {/* View Switcher: Live Websites vs Case Studies vs Everything */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md shrink-0">
              <button
                onClick={() => setActivePortfolioSection('all')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activePortfolioSection === 'all'
                    ? 'bg-[#00c853] !text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Projects ({DEVELOPED_WEBSITES.length + CASE_STUDIES.length})
              </button>
              <button
                onClick={() => setActivePortfolioSection('websites')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activePortfolioSection === 'websites'
                    ? 'bg-[#00c853] !text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Websites ({DEVELOPED_WEBSITES.length})
              </button>
              <button
                onClick={() => setActivePortfolioSection('case-studies')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activePortfolioSection === 'case-studies'
                    ? 'bg-[#00c853] !text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Deep-Dive Case Studies ({CASE_STUDIES.length})
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#00e676] block">
                20+
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Live Production Websites
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 block">
                6 Verticals
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Auto, Realty, Retail, Safari &amp; Health
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 block">
                4 Markets
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Kenya · Tanzania · SA · Global
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#00e676] block">
                100%
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Mobile &amp; Speed Optimized
              </span>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* SECTION 2: LIVE DEVELOPED WEBSITES SHOWCASE (20 SITES) */}
        {/* ========================================================================= */}
        {(activePortfolioSection === 'all' || activePortfolioSection === 'websites') && (
          <div className="mb-20">
            
            {/* Sub-header with Category Tabs & Real-time Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              
              {/* Industry Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
                {INDUSTRY_TABS.map((tab) => {
                  const isActive = selectedIndustry === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedIndustry(tab.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#00c853] !text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {getIndustryIcon(tab.id)}
                      <span>{tab.label}</span>
                      <span className={`text-[10px] font-mono ml-0.5 ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                        ({tab.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live Search Input */}
              <div className="relative min-w-[260px] sm:min-w-[320px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, domain, industry, tech..."
                  className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00c853] focus:ring-1 focus:ring-[#00c853] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Results count indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono">
              <span>
                Showing <strong className="text-white font-bold">{filteredWebsites.length}</strong> of {DEVELOPED_WEBSITES.length} websites
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndustry('all');
                  }}
                  className="text-[#00e676] hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Websites Grid */}
            {isLoading ? (
              <PortfolioGridSkeleton count={6} />
            ) : filteredWebsites.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 p-8 space-y-4">
                <Globe className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No websites matched your search</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try searching with different keywords like "safari", "real estate", "grocery", "cars", or "Kenya".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndustry('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00c853] text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span>View All 20 Websites</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {filteredWebsites.map((site) => (
                  <article
                    key={site.id}
                    className="group bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/20"
                  >
                    <div>
                      {/* 1. Browser Chrome Header */}
                      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800/90 flex items-center justify-between gap-3">
                        {/* Mac Window Dots */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>

                        {/* Address Bar */}
                        <div className="flex-1 min-w-0 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800/80 flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="text-[11px] font-mono text-slate-300 truncate">
                            https://{site.displayUrl}
                          </span>
                        </div>

                        {/* Live Status indicator */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider hidden sm:inline">
                            Live
                          </span>
                        </div>
                      </div>

                      {/* 2. Visual Preview Banner */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                        <img
                          src={site.image}
                          alt={`${site.name} live website screenshot & preview`}
                          width={640}
                          height={400}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                        {/* Brand Monogram Badge */}
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-xs font-black text-[#00e676] font-mono shadow-md">
                          {site.name.slice(0, 2).toUpperCase()}
                        </div>

                        {/* Location Tag */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300 shadow-md">
                          <MapPin className="w-3 h-3 text-[#00e676]" />
                          <span>{site.location}</span>
                        </div>

                        {/* Category Kicker */}
                        <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-300 bg-slate-950/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                          {site.category}
                        </div>
                      </div>

                      {/* 3. Card Content */}
                      <div className="p-5 sm:p-6 space-y-3.5">
                        
                        {/* Title & Role */}
                        <div>
                          <div className="text-[11px] font-mono font-semibold text-[#00e676] uppercase tracking-wider mb-1">
                            {site.role}
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#00e676] transition-colors leading-snug">
                            {site.name}
                          </h3>
                        </div>

                        {/* Headline */}
                        <p className="text-xs text-slate-300 font-medium leading-relaxed">
                          {site.headline}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                          {site.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="pt-2 border-t border-slate-800/80">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                            Key Technologies &amp; Architecture:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {site.techTags.map((tech) => (
                              <span 
                                key={tech} 
                                className="px-2 py-0.5 rounded bg-slate-800/80 text-[11px] font-mono text-slate-300 border border-slate-700/60"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* 4. Action Buttons Footer */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      {/* Visit Live Website */}
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#00c853] hover:bg-[#00b34a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                        title={`Open ${site.name} in a new tab`}
                      >
                        <span>Visit Live Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Book Similar Project */}
                      <button
                        onClick={() => onBookSimilarProject(site.name)}
                        className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700/80 cursor-pointer"
                        title={`Request an architecture similar to ${site.name}`}
                      >
                        <span className="hidden sm:inline">Book Similar</span>
                        <span className="sm:hidden">Similar</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </article>
                ))}
              </div>
            )}

          </div>
        )}


        {/* ========================================================================= */}
        {/* SECTION 3: IN-DEPTH STRATEGIC CASE STUDIES (6 DETAILED BUILDS) */}
        {/* ========================================================================= */}
        {(activePortfolioSection === 'all' || activePortfolioSection === 'case-studies') && (
          <div className="pt-12 border-t border-slate-900">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-8">
              <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
                [ DETAILED ARCHITECTURAL BREAKDOWNS ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                In-Depth Engineering Case Studies &amp; Client ROI
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Detailed breakdowns of challenges, custom technical solutions, delivery milestones, and quantifiable business revenue metrics.
              </p>
            </div>

            {/* Filter Tabs for Case Studies */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-8 max-w-fit">
              {caseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCaseCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeCaseCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        alt={`${item.category} service portfolio: ${item.title} developed for ${item.client} – ${item.summary}`}
                        width={640}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
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
                      className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
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
            <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6">
              {selectedCase.metrics.map((m, idx) => (
                <div key={idx} className="text-center min-w-0">
                  <span className="text-base sm:text-2xl font-extrabold font-mono text-emerald-400 block truncate">
                    {m.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 block mt-0.5 leading-tight">
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
                    Verified Delivery Schedule &amp; Sprint Pace
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
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Weekly staging reviews &amp; milestone demonstrations provided throughout each delivery sprint.</span>
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
                  Strategic Engineering Solution
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
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
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
