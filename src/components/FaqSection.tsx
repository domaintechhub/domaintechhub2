import React, { useState } from 'react';
import { 
  ChevronDown, Search, HelpCircle, MessageSquare, 
  ArrowRight, Check, Plus, Minus 
} from 'lucide-react';
import { FAQ_ITEMS, FAQ_CATEGORIES, FaqItem } from '../data/faqData';
import { AGENCY_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface FaqSectionProps {
  onScheduleCall: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onScheduleCall }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<string[]>(['engagement-payments', 'mpesa-integration']);
  const { t } = useLanguage();

  const toggleItem = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setExpandedIds(filteredFaqs.map(f => f.id));
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
  };

  const filteredFaqs = FAQ_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.highlights && item.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-900/30 border-t border-slate-900 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            {t('faq.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          
          {/* Functional Category Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
            {FAQ_CATEGORIES.map((cat) => (
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

          {/* Quick Search & Expand/Collapse Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs (e.g. M-Pesa, code)..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={expandedIds.length > 0 ? handleCollapseAll : handleExpandAll}
              className="px-3 py-2 text-xs font-mono text-slate-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 rounded-xl whitespace-nowrap transition-colors cursor-pointer"
            >
              {expandedIds.length > 0 ? t('faq.collapseAll') : t('faq.expandAll')}
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5 mb-14">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded 
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-md shadow-cyan-950/20' 
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isExpanded ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-lg shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'bg-cyan-500/10 text-cyan-400 rotate-180' : 'bg-slate-800/70 text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 animate-in fade-in duration-200">
                    <div className="pl-9 sm:pl-10 space-y-4 border-t border-slate-800/70 pt-4">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>

                      {faq.highlights && faq.highlights.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {faq.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-cyan-300 font-mono">
                              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-14 bg-slate-900/30 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-sm">No questions matched your search term.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 text-cyan-400 text-xs hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Direct Friction-Reduction Callout */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <span>{t('faq.unlistedTitle')}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('faq.unlistedSubtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub,%20I%20have%20a%20question%20regarding%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              onClick={onScheduleCall}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
