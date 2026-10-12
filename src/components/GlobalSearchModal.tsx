import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, X, Globe,
  ArrowRight, FolderGit2, BookOpen,
  Gauge, Sparkles, Clock, CornerDownLeft, TrendingUp, Zap
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { CASE_STUDIES } from '../data/portfolioData';
import { INSIGHT_ARTICLES } from '../data/insightsData';
import { SERVICE_KEYWORD_MAP } from '../data/keywordMapData';
import { storeSearchIntent } from '../utils/dynamicIntent';

interface SearchResultItem {
  id: string;
  type: 'service' | 'portfolio' | 'insight' | 'tool';
  categoryLabel: string;
  title: string;
  description: string;
  searchableBody?: string;
  metaBadge?: string;
  secondaryMeta?: string;
  tags?: string[];
  target: string;
  subTab?: string;
  href: string;
}

interface ScoredSearchResultItem extends SearchResultItem {
  score: number;
  matchedField?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: string, subTab?: string) => void;
}

const RECENT_SEARCHES_KEY = 'dth_recent_searches_v1';

const POPULAR_PREDICTIONS = [
  'eTIMS Invoice',
  'M-Pesa Daraja 3.0',
  'POS Systems Kenya',
  'Custom Website Development',
  'E-Commerce Store',
  'Next.js Technical SEO',
  'ERP & Inventory System',
  'AI WhatsApp Chatbot',
];

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HighlightMatch: React.FC<{ text: string; query: string; className?: string }> = ({
  text,
  query,
  className = '',
}) => {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return <span className={className}>{text}</span>;
  }

  const tokens = cleanQuery
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .sort((a, b) => b.length - a.length);

  if (tokens.length === 0) {
    const singleRegex = new RegExp(`(${escapeRegExp(cleanQuery)})`, 'gi');
    const parts = text.split(singleRegex);
    return (
      <span className={className}>
        {parts.map((part, i) =>
          part.toLowerCase() === cleanQuery.toLowerCase() ? (
            <mark
              key={i}
              className="bg-teal-500/20 text-teal-800 dark:bg-teal-400/25 dark:text-teal-200 font-semibold rounded px-0.5"
            >
              {part}
            </mark>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
      </span>
    );
  }

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isHit = tokens.some((t) => t.toLowerCase() === part.toLowerCase());
        return isHit ? (
          <mark
            key={i}
            className="bg-teal-500/20 text-teal-800 dark:bg-teal-400/25 dark:text-teal-200 font-semibold rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        );
      })}
    </span>
  );
};

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
      return raw ? JSON.parse(raw) : ['eTIMS Invoice', 'POS Systems', 'M-Pesa Integration'];
    } catch {
      return ['eTIMS Invoice', 'POS Systems', 'M-Pesa Integration'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const resultItemsRef = useRef<(HTMLElement | null)[]>([]);

  const saveRecentSearch = (term: string) => {
    const cleaned = term.trim();
    if (!cleaned || cleaned.length < 2) return;
    try {
      const updated = [
        cleaned,
        ...recentSearches.filter((s) => s.toLowerCase() !== cleaned.toLowerCase()),
      ].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  // Pre-index all searchable items with rich metadata for real-time prediction
  const allItems: SearchResultItem[] = useMemo(
    () => [
      // 1. Services
      ...SERVICES_LIST.map((s) => {
        const kwMap = SERVICE_KEYWORD_MAP[s.id];
        return {
          id: `service-${s.id}`,
          type: 'service' as const,
          categoryLabel: s.badge || 'Core Service',
          title: s.title,
          description: kwMap?.seoDescription || s.shortDesc,
          searchableBody: [
            s.fullDesc,
            ...(s.features || []),
            ...(s.deliverables || []),
            kwMap?.primaryKeyword || '',
            ...(kwMap?.secondaryKeywords || []),
            ...(kwMap?.targetLocations || []),
            ...(kwMap?.customerQuestions.map((q) => `${q.question} ${q.answer}`) || []),
          ].join(' '),
          metaBadge: `From KSh ${s.basePriceKES.toLocaleString()}`,
          secondaryMeta: s.duration,
          tags: [
            ...(kwMap ? [kwMap.primaryKeyword] : []),
            ...s.technologies,
            s.category,
            s.badge,
          ],
          target: 'services',
          subTab: s.id,
          href: `/services/${s.id}`,
        };
      }),

      // 2. Point of Sale & e-TIMS quick tools
      {
        id: 'tool-pos-pricing',
        type: 'service' as const,
        categoryLabel: 'POS & Hardware',
        title: 'Point of Sale (POS) Systems & Hardware Prices Kenya',
        description:
          'Cloud POS from KSh 500/mo, on-premise KSh 15,000–35,000, thermal printers, barcode scanners & all-in-one touchscreen bundles KSh 37,000–105,000 with KRA e-TIMS.',
        searchableBody:
          'POS hardware Kenya thermal receipt printer barcode scanner cash drawer touchscreen terminal KRA eTIMS integration supermarket pharmacy restaurant retail',
        metaBadge: 'From KSh 500/mo',
        secondaryMeta: 'Same-Week Setup',
        tags: [
          'pos',
          'point of sale',
          'etims',
          'e-tims',
          'kra',
          'thermal printer',
          'barcode scanner',
          'cash drawer',
          'hardware',
          'retail',
        ],
        target: 'services',
        subTab: 'pos-systems',
        href: '/services/pos-systems',
      },

      // 3. Insights / Blog Posts
      ...INSIGHT_ARTICLES.map((a) => ({
        id: `insight-${a.id}`,
        type: 'insight' as const,
        categoryLabel: a.category,
        title: a.title,
        description: a.excerpt,
        searchableBody: [
          ...(a.keyTakeaways || []),
          ...(a.contentSections?.map((sec) => `${sec.heading} ${sec.body}`) || []),
        ].join(' '),
        metaBadge: a.readTime,
        secondaryMeta: a.publishedDate,
        tags: [...a.tags, a.category, a.author.name],
        target: 'insights',
        subTab: a.slug,
        href: `/insights/${a.slug}`,
      })),

      // 4. Case Studies
      ...CASE_STUDIES.map((c) => ({
        id: `portfolio-${c.id}`,
        type: 'portfolio' as const,
        categoryLabel: 'Case Study',
        title: c.title,
        description: c.summary,
        searchableBody: `${c.challenge} ${c.solution} ${c.client} ${c.location}`,
        metaBadge: c.client,
        secondaryMeta: c.location,
        tags: [...c.techStack, c.client, c.category, c.location],
        target: 'portfolio',
        href: '/portfolio',
      })),

      // 5. Client & Developer Tools
      {
        id: 'tool-calculator',
        type: 'tool' as const,
        categoryLabel: 'Interactive Tool',
        title: 'Project Cost & Scope Calculator',
        description:
          'Configure custom modules, payment gateways, and generate real-time budgets in USD & KES.',
        metaBadge: 'Instant Quote',
        tags: ['pricing', 'budget', 'quote', 'cost', 'estimator', 'USD', 'KES', 'pos'],
        target: 'calculator',
        subTab: 'calculator',
        href: '/calculator',
      },
      {
        id: 'tool-audit',
        type: 'tool' as const,
        categoryLabel: 'Interactive Tool',
        title: 'Core Web Vitals & SEO Speed Audit Scanner',
        description:
          'Run diagnostic health checks on speed, mobile responsiveness, and technical SEO tags.',
        metaBadge: 'Free Diagnostic',
        tags: ['seo', 'speed', 'audit', 'performance', 'scanner', 'diagnostics'],
        target: 'audit',
        subTab: 'audit',
        href: '/audit',
      },
      {
        id: 'tool-domains',
        type: 'tool' as const,
        categoryLabel: 'Interactive Tool',
        title: '.co.ke Domain Registration & NVMe Hosting',
        description:
          'Explore domain options and ask the team to check availability; no live registry lookup is connected.',
        metaBadge: '.co.ke / Cloud',
        tags: ['domains', 'hosting', 'cloud', 'co.ke', 'server', 'ssl', 'kenic'],
        target: 'domains',
        subTab: 'domains',
        href: '/domains',
      },
      {
        id: 'tool-roadmap',
        type: 'tool' as const,
        categoryLabel: 'Delivery Roadmap',
        title: '4–8 Week Project Delivery Sprint Roadmap',
        description:
          'Visual 5-stage sprint progression from Discovery & Architecture to Cloudflare Deployment.',
        metaBadge: '5-Stage Agile',
        tags: [
          'roadmap',
          'sprint',
          'timeline',
          'schedule',
          'delivery',
          'discovery',
          'design',
          'development',
          'uat',
          'deployment',
        ],
        target: 'roadmap',
        href: '/roadmap',
      },
    ],
    []
  );

  // Build vocabulary of predictive phrases from services, articles, and tags
  const predictiveDictionary = useMemo(() => {
    const phrases = new Set<string>(POPULAR_PREDICTIONS);
    SERVICES_LIST.forEach((s) => {
      phrases.add(s.title);
      s.technologies.forEach((t) => phrases.add(t));
      const kwMap = SERVICE_KEYWORD_MAP[s.id];
      if (kwMap) {
        phrases.add(kwMap.primaryKeyword);
        kwMap.secondaryKeywords.slice(0, 3).forEach((kw) => phrases.add(kw));
      }
    });
    INSIGHT_ARTICLES.forEach((a) => {
      phrases.add(a.title);
      a.tags.forEach((t) => phrases.add(t));
    });
    return Array.from(phrases);
  }, []);

  // Compute real-time predictive keyword completions as the user types
  const predictiveCompletions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return predictiveDictionary
      .filter((phrase) => {
        const lower = phrase.toLowerCase();
        return lower !== q && (lower.startsWith(q) || lower.includes(q));
      })
      .sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.toLowerCase().startsWith(q) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return a.length - b.length;
      })
      .slice(0, 6);
  }, [query, predictiveDictionary]);

  // Inline ghost autocomplete phrase (if a phrase starts with the exact typed query)
  const ghostSuggestion = useMemo(() => {
    const trimmed = query;
    if (!trimmed || trimmed.length < 2) return '';
    const lower = trimmed.toLowerCase();
    const prefixMatch = predictiveDictionary.find((p) =>
      p.toLowerCase().startsWith(lower) && p.toLowerCase() !== lower
    );
    if (!prefixMatch) return '';
    return trimmed + prefixMatch.slice(trimmed.length);
  }, [query, predictiveDictionary]);

  // Score and filter items based on query and activeCategory
  const scoredItems: ScoredSearchResultItem[] = useMemo(() => {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    return allItems
      .map((item) => {
        const matchesCategory =
          activeCategory === 'all' ||
          (activeCategory === 'services' && item.type === 'service') ||
          (activeCategory === 'portfolio' && item.type === 'portfolio') ||
          (activeCategory === 'insights' && item.type === 'insight') ||
          (activeCategory === 'tools' && item.type === 'tool');

        if (!matchesCategory) return null;

        if (!q) {
          // Default ordering when query is empty: prioritize services & articles
          const defaultPriority =
            item.type === 'service' ? 40 : item.type === 'insight' ? 30 : item.type === 'tool' ? 20 : 10;
          return { ...item, score: defaultPriority };
        }

        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        const bodyLower = (item.searchableBody || '').toLowerCase();
        const tagsLower = (item.tags || []).map((t) => t.toLowerCase());

        let score = 0;
        let matchedField: string | undefined;

        // Exact phrase boosts
        if (titleLower === q) {
          score += 200;
        } else if (titleLower.startsWith(q)) {
          score += 140;
        } else if (titleLower.includes(q)) {
          score += 100;
        }

        if (tagsLower.some((t) => t === q || t.startsWith(q))) {
          score += 85;
          matchedField = item.tags?.find((t) => t.toLowerCase().includes(q));
        } else if (tagsLower.some((t) => t.includes(q))) {
          score += 60;
          matchedField = item.tags?.find((t) => t.toLowerCase().includes(q));
        }

        if (descLower.includes(q)) {
          score += 45;
        }

        if (bodyLower.includes(q)) {
          score += 25;
          if (!matchedField) matchedField = 'Deep Content Match';
        }

        // Multi-token relevance scoring so queries like "kra invoice" or "mpesa pos" match naturally
        if (tokens.length > 1) {
          let tokenHits = 0;
          for (const tok of tokens) {
            const inTitle = titleLower.includes(tok);
            const inTags = tagsLower.some((t) => t.includes(tok));
            const inDesc = descLower.includes(tok);
            const inBody = bodyLower.includes(tok);

            if (inTitle || inTags || inDesc || inBody) {
              tokenHits += 1;
              if (inTitle) score += 35;
              if (inTags) score += 25;
              if (inDesc) score += 15;
              if (inBody) score += 8;
            }
          }
          // Require all tokens (or at least 75% for 3+ tokens) to match somewhere if full phrase didn't match
          if (score < 45 && tokenHits < Math.ceil(tokens.length * 0.75)) {
            return null;
          }
        }

        if (score === 0) return null;

        // Slight priority boost for core Services and Articles in predictive mode
        if (item.type === 'service') score += 8;
        if (item.type === 'insight') score += 6;

        return { ...item, score, matchedField };
      })
      .filter((item): item is ScoredSearchResultItem => item !== null)
      .sort((a, b) => b.score - a.score);
  }, [allItems, activeCategory, query]);

  // Real-time top predicted services and articles when user is typing
  const predictedServices = useMemo(
    () => scoredItems.filter((item) => item.type === 'service').slice(0, 4),
    [scoredItems]
  );

  const predictedArticles = useMemo(
    () => scoredItems.filter((item) => item.type === 'insight').slice(0, 4),
    [scoredItems]
  );

  const isTypingQuery = query.trim().length > 0;
  const showSplitPredictions = isTypingQuery && activeCategory === 'all' && (predictedServices.length > 0 || predictedArticles.length > 0);

  // Unified flat list for keyboard ↑/↓ navigation
  const navigableItems: ScoredSearchResultItem[] = useMemo(() => {
    if (!showSplitPredictions) return scoredItems;
    const pinnedIds = new Set<string>();
    const ordered: ScoredSearchResultItem[] = [];

    predictedServices.forEach((s) => {
      pinnedIds.add(s.id);
      ordered.push(s);
    });
    predictedArticles.forEach((a) => {
      pinnedIds.add(a.id);
      ordered.push(a);
    });
    scoredItems.forEach((item) => {
      if (!pinnedIds.has(item.id)) {
        ordered.push(item);
      }
    });
    return ordered;
  }, [showSplitPredictions, scoredItems, predictedServices, predictedArticles]);

  const handleSelectItem = (item: SearchResultItem) => {
    if (query.trim()) {
      storeSearchIntent(query);
      saveRecentSearch(query);
    } else {
      saveRecentSearch(item.title);
    }
    onNavigate(item.target, item.subTab);
    onClose();
  };

  // Focus input on open and restore focus on close
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
      setActiveCategory('all');
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === 'function') {
        previouslyFocusedElementRef.current.focus();
      }
    }
  }, [isOpen]);

  // Keep selected index in sync and scroll into view
  useEffect(() => {
    if (navigableItems.length > 0 && selectedIndex >= navigableItems.length) {
      setSelectedIndex(0);
    }
    const selectedBtn = resultItemsRef.current[selectedIndex];
    if (selectedBtn && typeof selectedBtn.scrollIntoView === 'function') {
      selectedBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, navigableItems.length]);

  // Handle keyboard navigation, focus trap, ghost autocomplete, and Escape key closing
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Escape closing
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      // 2. Accept ghost autocomplete with Tab or Right Arrow at end of input
      if (
        ghostSuggestion &&
        document.activeElement === inputRef.current &&
        ((e.key === 'Tab' && !e.shiftKey) ||
          (e.key === 'ArrowRight' &&
            inputRef.current?.selectionStart === query.length))
      ) {
        e.preventDefault();
        setQuery(ghostSuggestion);
        setSelectedIndex(0);
        return;
      }

      // 3. Focus Trap on Tab
      if (e.key === 'Tab' && modalContentRef.current) {
        const focusableElements = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }

      // 4. Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (navigableItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + navigableItems.length) % (navigableItems.length || 1));
      } else if (e.key === 'Enter') {
        if (navigableItems[selectedIndex]) {
          e.preventDefault();
          handleSelectItem(navigableItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, navigableItems, selectedIndex, onNavigate, onClose, query, ghostSuggestion]);

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

  const renderResultCard = (item: ScoredSearchResultItem, navIndex: number, compact = false) => {
    const style = getTypeStyles(item.type);
    const Icon = style.icon;
    const isSelected = navIndex === selectedIndex;

    return (
      <a
        key={item.id}
        href={item.href}
        ref={(el) => {
          resultItemsRef.current[navIndex] = el;
        }}
        onClick={(e) => {
          e.preventDefault();
          handleSelectItem(item);
        }}
        onMouseEnter={() => setSelectedIndex(navIndex)}
        className={`w-full text-left ${compact ? 'p-2.5' : 'p-3'} rounded-2xl transition-all flex items-start gap-3 ${
          isSelected
            ? 'bg-teal-50/90 dark:bg-slate-900 ring-1 ring-teal-500/50 shadow-sm'
            : 'hover:bg-stone-50 dark:hover:bg-slate-900/50'
        }`}
      >
        <div
          className={`${compact ? 'w-8 h-8 rounded-lg' : 'w-9 h-9 rounded-xl'} flex items-center justify-center shrink-0 mt-0.5 ${style.iconBg}`}
        >
          <Icon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}
            >
              {item.categoryLabel}
            </span>
            {item.metaBadge && (
              <span className="text-[10px] font-mono font-semibold text-teal-700 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                {item.metaBadge}
              </span>
            )}
            {item.secondaryMeta && !compact && (
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                {item.secondaryMeta}
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            <HighlightMatch text={item.title} query={query} />
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug mt-0.5">
            <HighlightMatch text={item.description} query={query} />
          </p>

          {!compact && item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
              {item.tags.slice(0, 4).map((tag, tIndex) => (
                <span
                  key={tIndex}
                  className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-stone-200/60 dark:bg-slate-800 px-1.5 py-0.5 rounded"
                >
                  <HighlightMatch text={tag} query={query} />
                </span>
              ))}
            </div>
          )}
        </div>

        <ArrowRight
          className={`w-4 h-4 text-slate-400 shrink-0 self-center transition-transform ${
            isSelected ? 'translate-x-1 text-teal-600 dark:text-teal-400' : ''
          }`}
        />
      </a>
    );
  };

  const remainingItems = showSplitPredictions
    ? navigableItems.slice(predictedServices.length + predictedArticles.length)
    : navigableItems;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalContentRef}
        role="dialog"
        aria-modal="true"
        aria-label="Global Search and Quick Navigation"
        className="w-full max-w-3xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar with Inline Ghost Autocomplete */}
        <div className="relative p-4 sm:p-5 border-b border-stone-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <div className="relative flex-1 flex items-center min-w-0">
            {ghostSuggestion && (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center pointer-events-none text-sm sm:text-base font-medium select-none overflow-hidden whitespace-pre"
              >
                <span className="text-transparent">{query}</span>
                <span className="text-slate-300 dark:text-slate-600">
                  {ghostSuggestion.slice(query.length)}
                </span>
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              aria-label="Search services, articles, and tools"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search services, articles, tools (e.g. eTIMS, M-Pesa, POS, SEO)..."
              className="relative w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {ghostSuggestion && (
            <button
              type="button"
              onClick={() => {
                setQuery(ghostSuggestion);
                inputRef.current?.focus();
              }}
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 hover:bg-teal-500/20 transition-colors shrink-0"
              title="Complete suggestion"
            >
              <span>Tab</span>
              <CornerDownLeft className="w-2.5 h-2.5" />
            </button>
          )}

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              aria-label="Clear search query"
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

        {/* Real-Time Predictive Keyword Strip OR Recent/Trending Searches */}
        <div className="px-4 py-2 bg-stone-50/90 dark:bg-slate-900/70 border-b border-stone-200/80 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {isTypingQuery ? (
            predictiveCompletions.length > 0 ? (
              <>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 shrink-0 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Predictions:
                </span>
                {predictiveCompletions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      setSelectedIndex(0);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-stone-200/90 dark:border-slate-800 hover:border-teal-500/50 hover:text-teal-700 dark:hover:text-teal-300 transition-all whitespace-nowrap shrink-0 flex items-center gap-1"
                  >
                    <Search className="w-2.5 h-2.5 text-teal-500" />
                    <HighlightMatch text={term} query={query} />
                  </button>
                ))}
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <Zap className="w-3 h-3 text-teal-500" />
                Live predictive filtering active — showing instant matches for "{query.trim()}"
              </span>
            )
          ) : (
            <>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                <TrendingUp className="w-3 h-3 text-teal-500" />
                Quick Predict:
              </span>
              {POPULAR_PREDICTIONS.slice(0, 6).map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-stone-200/80 dark:border-slate-800 hover:border-teal-500/40 hover:text-teal-600 dark:hover:text-teal-300 transition-all whitespace-nowrap shrink-0"
                >
                  {term}
                </button>
              ))}
              {recentSearches.length > 0 && (
                <>
                  <span className="text-stone-300 dark:text-slate-700">|</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0">
                    <Clock className="w-3 h-3" />
                    Recent:
                  </span>
                  {recentSearches.slice(0, 3).map((term) => (
                    <button
                      key={`recent-${term}`}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        setSelectedIndex(0);
                        inputRef.current?.focus();
                      }}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 whitespace-nowrap shrink-0"
                    >
                      {term}
                    </button>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* Quick Filter Categories */}
        <div className="px-4 py-2 bg-stone-50/50 dark:bg-slate-900/40 border-b border-stone-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'services', label: `Services (${SERVICES_LIST.length})` },
            { id: 'insights', label: `Articles (${INSIGHT_ARTICLES.length})` },
            { id: 'portfolio', label: 'Case Studies' },
            { id: 'tools', label: 'Client Tools' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results & Real-Time Predictive Suggestions List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {navigableItems.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching services or articles found for "{query}"
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try one of these popular topics:
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                {POPULAR_PREDICTIONS.slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setQuery(suggestion);
                      setSelectedIndex(0);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 dark:bg-slate-900 text-teal-700 dark:text-teal-300 border border-stone-200 dark:border-slate-800 hover:border-teal-500/50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : showSplitPredictions ? (
            <>
              {/* Real-Time Predictive Split Grid: Relevant Services & Relevant Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Column 1: Predicted Services */}
                <div className="rounded-2xl border border-stone-200/80 dark:border-slate-800/90 bg-stone-50/40 dark:bg-slate-900/30 p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-400">
                      <Globe className="w-3.5 h-3.5" />
                      Suggested Services ({predictedServices.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveCategory('services')}
                      className="text-[10px] font-mono text-slate-400 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      Filter Services →
                    </button>
                  </div>
                  {predictedServices.length > 0 ? (
                    predictedServices.map((serviceItem, idx) =>
                      renderResultCard(serviceItem, idx, true)
                    )
                  ) : (
                    <p className="text-xs text-slate-400 px-2 py-4 text-center">
                      No direct service matches for "{query}"
                    </p>
                  )}
                </div>

                {/* Column 2: Predicted Articles */}
                <div className="rounded-2xl border border-stone-200/80 dark:border-slate-800/90 bg-stone-50/40 dark:bg-slate-900/30 p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      Suggested Articles ({predictedArticles.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveCategory('insights')}
                      className="text-[10px] font-mono text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      Filter Articles →
                    </button>
                  </div>
                  {predictedArticles.length > 0 ? (
                    predictedArticles.map((articleItem, idx) =>
                      renderResultCard(articleItem, predictedServices.length + idx, true)
                    )
                  ) : (
                    <p className="text-xs text-slate-400 px-2 py-4 text-center">
                      No direct article matches for "{query}"
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Matches (Tools, Case Studies, More Services/Articles) */}
              {remainingItems.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    More Matching Results ({remainingItems.length})
                  </div>
                  <div className="space-y-1 divide-y divide-stone-100 dark:divide-slate-900">
                    {remainingItems.map((item, idx) =>
                      renderResultCard(
                        item,
                        predictedServices.length + predictedArticles.length + idx,
                        false
                      )
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-1.5 divide-y divide-stone-100 dark:divide-slate-900">
              {navigableItems.map((item, index) => renderResultCard(item, index, false))}
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-stone-100/80 dark:bg-slate-950 border-t border-stone-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span>
              Use <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border rounded shadow-2xs">↑</kbd>{' '}
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-900 border rounded shadow-2xs">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border rounded shadow-2xs">Enter</kbd> to open
            </span>
            {ghostSuggestion && (
              <span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border rounded shadow-2xs">Tab</kbd> to autocomplete
              </span>
            )}
          </div>
          <span className="text-teal-600 dark:text-teal-400 font-semibold">
            {navigableItems.length} {navigableItems.length === 1 ? 'match' : 'matches'}
          </span>
        </div>
      </div>
    </div>
  );
};

