import React, { useState } from 'react';
import { 
  Cpu, Layers, ShieldCheck, Gauge, Search, 
  ExternalLink, ArrowRight, CheckCircle2, Terminal 
} from 'lucide-react';
import { TECH_STACK, TECH_CATEGORIES, TechItem } from '../data/techStackData';
import { TechLogo } from './TechLogos';

interface TechStackSectionProps {
  onSelectTechForProject?: (techName: string) => void;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ onSelectTechForProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTech = TECH_STACK.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="tech-stack" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            ENGINEERING EXCELLENCE · OUR TECH STACK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Specialized technologies built for speed, security & scale.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            We don't rely on fragile off-the-shelf site builders. Our engineers craft production-grade software using industry-standard frameworks, battle-tested databases, and resilient cloud architectures.
          </p>
        </div>

        {/* Technical Credibility Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
              <Gauge className="w-4 h-4" />
              <span className="font-bold text-xs uppercase font-mono tracking-wider">Sub-Second LCP</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Targeting &lt; 1.0s Largest Contentful Paint with Next.js SSR and edge CDN caching.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold text-xs uppercase font-mono tracking-wider">Native Payments</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct Safaricom Daraja STK Push & Stripe webhooks with automated idempotency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-1.5 text-blue-400">
              <Terminal className="w-4 h-4" />
              <span className="font-bold text-xs uppercase font-mono tracking-wider">Strict Type Safety</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% TypeScript contracts preventing runtime exceptions across frontend and backend.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 mb-1.5 text-amber-400">
              <Layers className="w-4 h-4" />
              <span className="font-bold text-xs uppercase font-mono tracking-wider">Resilient Cloud</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Containerized Docker deployments on AWS & GCP with 99.99% uptime guarantees.
            </p>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Functional Category Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. AWS, Python)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredTech.map((item) => (
            <div
              key={item.id}
              className="group bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-cyan-950/20"
            >
              <div>
                {/* Header with SVG Logo and Category Kicker */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-950/90 border border-slate-800/90 p-2 flex items-center justify-center group-hover:scale-105 group-hover:border-slate-700 transition-all">
                    <TechLogo svgKey={item.svgKey} className="w-7 h-7" color={item.color} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Tech Name */}
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Card Footer: Verified Metric & Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-400 font-medium">
                  {item.metric}
                </span>

                {onSelectTechForProject && (
                  <button
                    onClick={() => onSelectTechForProject(item.name)}
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span>Use Tech</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTech.length === 0 && (
          <div className="text-center py-14 bg-slate-900/30 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No technologies match your search term.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-cyan-400 text-xs hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
