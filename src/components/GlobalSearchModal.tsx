import React, { useState, useEffect, useRef, useId, useMemo } from 'react';
import { 
  Search, X, Globe, FolderGit2, BookOpen, 
  ArrowRight, Gauge
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { CASE_STUDIES } from '../data/portfolioData';
import { INSIGHT_ARTICLES } from '../data/insightsData';

const BASE_URL = 'https://www.domaintechhubs.com';

export interface SearchResultItem {
  id: string;
  type: 'service' | 'portfolio' | 'insight' | 'tool';
  categoryLabel: string;
  title: string;
  description: string;
  tags?: string[];
  target: string;
  subTab?: string;
}

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: string, subTab?: string) => void;
}

/**
 * Returns canonical destination URL for each indexed content piece
 */
export function getSearchResultItemUrl(item: SearchResultItem): string {
  switch (item.type) {
    case 'service':
      return item.subTab
        ? `${BASE_URL}/services/${item.subTab}`
        : `${BASE_URL}/services`;
    case 'portfolio':
      return `${BASE_URL}/portfolio#${item.id.replace('portfolio-', '')}`;
    case 'insight':
      return item.subTab
        ? `${BASE_URL}/insights/${item.subTab}`
        : `${BASE_URL}/insights`;
    case 'tool':
      if (item.subTab === 'calculator' || item.target === 'calculator') {
        return `${BASE_URL}/tools/calculator`;
      }
      if (item.subTab === 'audit' || item.target === 'audit') {
        return `${BASE_URL}/tools/audit`;
      }
      if (item.subTab === 'domains' || item.target === 'domains') {
        return `${BASE_URL}/tools/domains`;
      }
      if (item.target === 'roadmap') {
        return `${BASE_URL}/roadmap`;
      }
      if (item.subTab === 'pos-systems') {
        return `${BASE_URL}/services/pos-systems`;
      }
      return `${BASE_URL}/tools`;
    default:
      return `${BASE_URL}/`;
  }
}

/**
 * Returns Schema.org type descriptors for rich snippet indexing
 */
export function getSchemaTypeForType(type: SearchResultItem['type']): {
  jsonLdType: string;
  schemaUri: string;
} {
  switch (type) {
    case 'service':
      return { jsonLdType: 'Service', schemaUri: 'https://schema.org/Service' };
    case 'insight':
      return { jsonLdType: 'TechArticle', schemaUri: 'https://schema.org/TechArticle' };
    case 'portfolio':
      return { jsonLdType: 'CreativeWork', schemaUri: 'https://schema.org/CreativeWork' };
    case 'tool':
      return { jsonLdType: 'WebApplication', schemaUri: 'https://schema.org/WebApplication' };
  }
}

/**
 * Generates Schema.org JSON-LD structured data for the searchable directory catalog
 */
export function buildSearchDirectoryJsonLd(items: SearchResultItem[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DataCatalog',
        '@id': `${BASE_URL}/#search-directory`,
        name: 'Domain Tech Hub Searchable Content Directory',
        description: 'Comprehensive directory indexing 15+ software engineering services, verified client case studies, technical insights, and interactive developer tools.',
        url: `${BASE_URL}/`,
        provider: {
          '@type': 'ProfessionalService',
          name: 'Domain Tech Hub',
          url: `${BASE_URL}/`,
          telephone: '+254118746676',
          email: 'info@domaintechhubs.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Delta Corner Tower, Westlands',
            addressLocality: 'Nairobi',
            addressCountry: 'KE'
          }
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/?search={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE_URL}/#directory-itemlist`,
        name: 'Domain Tech Hub Indexed Content Directory',
        description: 'Searchable inventory of verified engineering offerings, insights, case studies, and tools.',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => {
          const itemUrl = getSearchResultItemUrl(item);
          const { jsonLdType } = getSchemaTypeForType(item.type);

          const itemDetails: Record<string, any> = {
            '@type': jsonLdType,
            name: item.title,
            description: item.description,
            url: itemUrl,
            keywords: item.tags?.join(', ')
          };

          if (item.type === 'service') {
            itemDetails.serviceType = item.categoryLabel;
            itemDetails.provider = {
              '@type': 'Organization',
              name: 'Domain Tech Hub',
              url: BASE_URL
            };
          } else if (item.type === 'insight') {
            itemDetails.headline = item.title;
            itemDetails.inLanguage = 'en-US';
            itemDetails.publisher = {
              '@type': 'Organization',
              name: 'Domain Tech Hub',
              url: BASE_URL
            };
          } else if (item.type === 'portfolio') {
            itemDetails.genre = item.categoryLabel;
            itemDetails.publisher = {
              '@type': 'Organization',
              name: 'Domain Tech Hub'
            };
          } else if (item.type === 'tool') {
            itemDetails.applicationCategory = 'UtilityApplication';
            itemDetails.operatingSystem = 'All';
          }

          return {
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            description: item.description,
            url: itemUrl,
            item: itemDetails
          };
        })
      }
    ]
  };
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const searchInputId = useId();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const resultItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Pre-index all searchable content pieces (services, case studies, insights, tools)
  const allItems: SearchResultItem[] = useMemo(() => [
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

    // 2. Point of Sale & e-TIMS quick tools
    {
      id: 'tool-pos-pricing',
      type: 'service' as const,
      categoryLabel: 'POS & Hardware',
      title: 'Point of Sale (POS) Systems & Hardware Prices Kenya',
      description: 'Cloud POS from KSh 500/mo, on-premise KSh 15,000–35,000, thermal printers, barcode scanners & all-in-one touchscreen bundles KSh 37,000–105,000 with KRA e-TIMS.',
      tags: ['pos', 'point of sale', 'etims', 'e-tims', 'kra', 'thermal printer', 'barcode scanner', 'cash drawer', 'hardware', 'retail'],
      target: 'services',
      subTab: 'pos-systems',
    },

    // 3. Case Studies / Portfolio Items
    ...CASE_STUDIES.map((c) => ({
      id: `portfolio-${c.id}`,
      type: 'portfolio' as const,
      categoryLabel: 'Case Study',
      title: c.title,
      description: c.summary,
      tags: [...c.techStack, c.client, c.category, c.location],
      target: 'portfolio',
      subTab: c.id,
    })),

    // 4. Insights / Technical Articles
    ...INSIGHT_ARTICLES.map((a) => ({
      id: `insight-${a.id}`,
      type: 'insight' as const,
      categoryLabel: 'Insight Article',
      title: a.title,
      description: a.excerpt,
      tags: [...a.tags, a.category, a.author.name],
      target: 'insights',
      subTab: a.slug,
    })),

    // 5. Client & Developer Interactive Tools
    {
      id: 'tool-calculator',
      type: 'tool' as const,
      categoryLabel: 'Interactive Tool',
      title: 'Project Cost & Scope Calculator',
      description: 'Configure custom modules, payment gateways, and generate real-time budgets in USD & KES.',
      tags: ['pricing', 'budget', 'quote', 'cost', 'estimator', 'USD', 'KES', 'pos'],
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
  ], []);

  // Ensure structured data JSON-LD and <meta name="search-index"> tags are injected for search crawlers
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. JSON-LD structured data injection
    const scriptId = 'dth-search-directory-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = buildSearchDirectoryJsonLd(allItems);
    scriptTag.textContent = JSON.stringify(structuredData);

    // 2. Dynamic injection of <meta name="search-index" ...> tags for each content item
    const CONTAINER_ATTR = 'data-dth-search-index-meta';
    // Clean up any previously injected search-index meta tags to prevent duplicates
    document.querySelectorAll(`meta[${CONTAINER_ATTR}]`).forEach((el) => el.remove());

    const metaFragment = document.createDocumentFragment();
    allItems.forEach((item) => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'search-index');
      meta.setAttribute(CONTAINER_ATTR, item.id);
      meta.setAttribute('data-id', item.id);
      meta.setAttribute('data-type', item.type);
      meta.setAttribute('data-category', item.categoryLabel);
      meta.setAttribute('data-url', getSearchResultItemUrl(item));
      meta.setAttribute('data-tags', (item.tags || []).join(', '));
      // Content attribute formatted with title, url, category, and description for bots
      meta.setAttribute(
        'content',
        `title=${encodeURIComponent(item.title)};type=${item.type};url=${getSearchResultItemUrl(item)};description=${encodeURIComponent(item.description)};keywords=${encodeURIComponent((item.tags || []).join(','))}`
      );
      metaFragment.appendChild(meta);
    });

    document.head.appendChild(metaFragment);

    return () => {
      // Optional cleanup on unmount
      document.querySelectorAll(`meta[${CONTAINER_ATTR}]`).forEach((el) => el.remove());
    };
  }, [allItems]);

  // Filter items based on query and activeCategory
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
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
  }, [allItems, activeCategory, query]);

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
    if (filteredItems.length > 0 && selectedIndex >= filteredItems.length) {
      setSelectedIndex(0);
    }
    const selectedBtn = resultItemsRef.current[selectedIndex];
    if (selectedBtn && typeof selectedBtn.scrollIntoView === 'function') {
      selectedBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, filteredItems.length]);

  // Handle keyboard navigation, focus trap, and Escape key closing
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

      // 2. Focus Trap on Tab
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

      // 3. Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        // If an item in the list is selected
        if (filteredItems[selectedIndex]) {
          e.preventDefault();
          const item = filteredItems[selectedIndex];
          if (query.trim()) {
            sessionStorage.setItem('dth_search_intent', query.trim());
          }
          onNavigate(item.target, item.subTab);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, filteredItems, selectedIndex, onNavigate, onClose, query]);

  // If closed, return the hidden structured data script for crawler indexability
  if (!isOpen) {
    return (
      <script
        id="dth-search-directory-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSearchDirectoryJsonLd(allItems)) }}
      />
    );
  }

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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150">
      {/* Background script tag containing filtered structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSearchDirectoryJsonLd(filteredItems)) }}
      />

      <button
        type="button"
        aria-label="Close search modal"
        tabIndex={-1}
        onClick={onClose}
        className="fixed inset-0 w-full h-full cursor-default focus:outline-none"
      />
      <div 
        ref={modalContentRef}
        role="dialog"
        aria-modal="true"
        aria-label="Global Search and Quick Navigation"
        className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-stone-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
          <input
            id={searchInputId}
            ref={inputRef}
            type="text"
            aria-label="Search services, case studies, articles, and tools"
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
              type="button"
              aria-label="Clear search query"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            aria-label="Close search modal"
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

        {/* Results List: Semantic Microdata Searchable Directory */}
        <div 
          itemScope
          itemType="https://schema.org/ItemList"
          className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-stone-100 dark:divide-slate-900"
        >
          {/* ItemList Structured Data Metas */}
          <meta itemProp="name" content="Domain Tech Hub Search Directory" />
          <meta itemProp="description" content="Searchable index of software services, verified case studies, insights, and interactive developer tools." />
          <meta itemProp="numberOfItems" content={String(filteredItems.length)} />

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
              const canonicalUrl = getSearchResultItemUrl(item);
              const schemaType = getSchemaTypeForType(item.type);

              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    resultItemsRef.current[index] = el;
                  }}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
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
                  {/* ListItem Structured Data Metas */}
                  <meta name="search-index" content={`title=${item.title};type=${item.type};url=${canonicalUrl};description=${item.description};keywords=${(item.tags || []).join(',')}`} />
                  <meta itemProp="position" content={String(index + 1)} />
                  <meta itemProp="url" content={canonicalUrl} />
                  <meta itemProp="name" content={item.title} />
                  <meta itemProp="description" content={item.description} />
                  {item.tags && item.tags.length > 0 && (
                    <meta itemProp="keywords" content={item.tags.join(', ')} />
                  )}

                  {/* Nested Item Microdata for the specific content entity */}
                  <span itemProp="item" itemScope itemType={schemaType.schemaUri} className="sr-only">
                    <meta itemProp="name" content={item.title} />
                    <meta itemProp="description" content={item.description} />
                    <meta itemProp="url" content={canonicalUrl} />
                    {item.tags && item.tags.length > 0 && (
                      <meta itemProp="keywords" content={item.tags.join(', ')} />
                    )}
                    {item.type === 'service' && (
                      <meta itemProp="serviceType" content={item.categoryLabel} />
                    )}
                    {item.type === 'insight' && (
                      <meta itemProp="headline" content={item.title} />
                    )}
                    {item.type === 'tool' && (
                      <meta itemProp="applicationCategory" content="UtilityApplication" />
                    )}
                  </span>

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
