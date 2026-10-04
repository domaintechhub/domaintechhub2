import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, X, Globe, ShoppingCart, Database, 
  ArrowRight, FolderGit2, BookOpen, Calculator, Server,
  Layers, Tag, Gauge
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { CASE_STUDIES } from '../data/portfolioData';
import { INSIGHT_ARTICLES } from '../data/insightsData';

interface SearchResultItem {
  id: string;
  type: 'service' | 'portfolio' | 'insight' | 'tool';
  categoryLabel: string;
  title: string;
  description: string;
  tags?: string[];
  target: string;
  subTab?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: string, subTab?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pre-index all searchable items
  const allItems: SearchResultItem[] = [
    // 1. Services
    ...SERVICES_LIST.map((s) => ({
      id: `service-${s.id}`,
      type: 'service' as const,
      categoryLabel: 'Service Page',
      title: s.title,
      description: s.shortDesc,
      tags: [...s.technologies, s.category, s.badge],
      target: 'services',
      subTab: s.id,
    })),

    // 2. Case Studies
    ...CASE_STUDIES.map((c) => ({
      id: `portfolio-${c.id}`,
      type: 'portfolio' as const,
      categoryLabel: 'Case Study',
      title: c.title,
      description: c.summary,
      tags: [...c.techStack, c.client, c.category, c.location],
      target: 'portfolio',
    })),

    // 3. Insights / Blog Posts
    ...INSIGHT_ARTICLES.map((a) => ({
      id: `insight-${a.id}`,
      type: 'insight' as const,
      categoryLabel: 'Insight Article',
      title: a.title,
      description: a.excerpt,
      tags: [...a.tags, a.category, a.author.name],
      target: 'insights',
    })),

    // 4. Client & Developer Tools
    {
      id: 'tool-calculator',
      type: 'tool' as const,
      categoryLabel: 'Interactive Tool',
      title: 'Project Cost & Scope Calculator',
      description: 'Configure custom modules, payment gateways, and generate real-time budgets in USD & KES.',
      tags: ['pricing', 'budget', 'quote', 'cost', 'estimator', 'USD', 'KES'],
      target: 'calculator',
      subTab: 'calculator',
    },
    {
      id: 'tool-audit',
      type: 'tool' as const,
      categoryLabel: 'Interactive Tool',
      title: 'Core Web Vitals & SEO Speed Audit Scanner',
      description: 'Run diagnostic health checks on speed, mobile responsiveness, and technical SEO tags.',
      tags: ['seo', 'speed', 'audit', 'performance', 'scanner', 'diagnostics'],
      target: 'audit',
      subTab: 'audit',
    },
    {
      id: 'tool-domains',
      type: 'tool' as const,
      categoryLabel: 'Interactive Tool',
      title: '.co.ke Domain Registration & NVMe Hosting',
      description: 'Search .ke domains, verify KeNIC registry availability, and configure NVMe cloud hosting.',
      tags: ['domains', 'hosting', 'cloud', 'co.ke', 'server', 'ssl', 'kenic'],
      target: 'domains',
      subTab: 'domains',
    },
    {
      id: 'tool-roadmap',
      type: 'tool' as const,
      categoryLabel: 'Delivery Roadmap',
      title: '4–8 Week Project Delivery Sprint Roadmap',
      description: 'Visual 5-stage sprint progression from Discovery & Architecture to Cloudflare Deployment.',
      tags: ['roadmap', 'sprint', 'timeline', 'schedule', 'delivery', 'discovery', 'design', 'development', 'uat', 'deployment'],
      target: 'roadmap',
    },
  ];

  // Filter items based on query and activeCategory
  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'services' && item.type === 'service') ||
      (activeCategory === 'portfolio' && item.type === 'portfolio') ||
      (activeCategory === 'insights' && item.type === 'insight') ||
      (activeCategory === 'tools' && item.type === 'tool');

    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchDesc = item.description.toLowerCase().includes(q);
    const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));

    return matchTitle || matchDesc || matchTags;
  });

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          const item = filteredItems[selectedIndex];
          if (query.trim()) {
            sessionStorage.setItem('dth_search_intent', query.trim());
          }
          onNavigate(item.target, item.subTab);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onNavigate, onClose]);

  if (!isOpen) return null;

  const getTypeStyles = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'service':
        return {
          badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
          icon: Globe,
          iconBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300',
        };
      case 'portfolio':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
          icon: FolderGit2,
          iconBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',
        };
      case 'insight':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
          icon: BookOpen,
          iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
        };
      case 'tool':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
          icon: Gauge,
          iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
        };
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-stone-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search services, case studies, articles, tools (e.g. M-Pesa, SEO, Next.js)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Categories */}
        <div className="px-4 py-2.5 bg-stone-50/70 dark:bg-slate-900/50 border-b border-stone-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'services', label: 'Services (15+)' },
            { id: 'portfolio', label: 'Case Studies' },
            { id: 'insights', label: 'Blog & Insights' },
            { id: 'tools', label: 'Client Tools' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-stone-100 dark:divide-slate-900">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-2">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching results found for "{query}"
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for "M-Pesa", "Web development", "SEO", "Calculator", or "CRM".
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const style = getTypeStyles(item.type);
              const Icon = style.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (query.trim()) {
                      sessionStorage.setItem('dth_search_intent', query.trim());
                    }
                    onNavigate(item.target, item.subTab);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3.5 pt-3 ${
                    isSelected
                      ? 'bg-stone-100 dark:bg-slate-900/90 ring-1 ring-teal-500/40 shadow-sm'
                      : 'hover:bg-stone-50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${style.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                        {item.categoryLabel}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug mb-1.5">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.tags.slice(0, 4).map((tag, tIndex) => (
                          <span
                            key={tIndex}
                            className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-stone-200/60 dark:bg-slate-800 px-1.5 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ArrowRight className={`w-4 h-4 text-slate-400 shrink-0 self-center transition-transform ${isSelected ? 'translate-x-1 text-teal-600 dark:text-teal-400' : ''}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-stone-100/80 dark:bg-slate-950 border-t border-stone-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border rounded shadow-2xs">↑</kbd> <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border rounded shadow-2xs">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border rounded shadow-2xs">Enter</kbd> to select</span>
          </div>
          <span className="text-teal-600 dark:text-teal-400 font-semibold">{filteredItems.length} matches</span>
        </div>
      </div>
    </div>
  );
};
