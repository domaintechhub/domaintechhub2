import React, { useState } from 'react';
import {
  BookOpen, Clock, Calendar, ArrowLeft, ArrowRight,
  ArrowUpRight, Check, Share2, Terminal, MessageSquare,
  FileText, Layers, ChevronRight
} from 'lucide-react';
import { INSIGHT_ARTICLES, InsightArticle } from '../data/insightsData';
import { SERVICES_LIST } from '../data/servicesData';
import { AGENCY_INFO } from '../data/portfolioData';
import { SITE_URL } from '../config/site';
import { calculateReadStats } from './InsightsSection';
import { getKeywordsForArticle, injectSemanticKeywords } from '../utils/keywordInjection';

interface ArticleDetailPageProps {
  article: InsightArticle;
  onBackToInsights: () => void;
  onSelectArticle: (slug: string) => void;
  onNavigatePath: (url: string) => void;
  onScheduleConsultation?: (topic: string) => void;
}

const parseTextWithLinks = (text: string, onInternalNavigate?: (url: string) => void) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [_, label, url] = match;
    const isExternal = url.startsWith('http://') || url.startsWith('https://');
    const isNativeProtocol = url.startsWith('tel:') || url.startsWith('mailto:');

    parts.push(
      <a
        key={`${match.index}-${url}`}
        href={url}
        onClick={(e) => {
          if (!isExternal && !isNativeProtocol && onInternalNavigate) {
            e.preventDefault();
            onInternalNavigate(url);
          }
        }}
        className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors cursor-pointer inline-flex items-center gap-0.5"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <span>{label}</span>
        {isExternal && <ArrowUpRight className="w-3 h-3 inline-block shrink-0 opacity-70 ml-0.5" />}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

const renderRichBody = (body: string, onInternalNavigate?: (url: string) => void, articleId?: string) => {
  const injectedBody = injectSemanticKeywords(body, articleId);
  const paragraphs = injectedBody.split('\n\n');
  return paragraphs.map((para, pIdx) => {
    if (para.includes('\n•') || para.startsWith('•')) {
      const items = para.split('\n').filter(Boolean);
      return (
        <ul key={pIdx} className="space-y-2 my-4 pl-5 list-disc text-slate-300 text-sm sm:text-base">
          {items.map((item, iIdx) => (
            <li key={iIdx} className="leading-relaxed">
              {parseTextWithLinks(item.replace(/^[•\-]\s*/, ''), onInternalNavigate)}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={pIdx} className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
        {parseTextWithLinks(para, onInternalNavigate)}
      </p>
    );
  });
};

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBackToInsights,
  onSelectArticle,
  onNavigatePath,
  onScheduleConsultation,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const stats = calculateReadStats(article);

  const currentIdx = INSIGHT_ARTICLES.findIndex(a => a.id === article.id || a.slug === article.slug);
  const prevArticle = currentIdx > 0 ? INSIGHT_ARTICLES[currentIdx - 1] : null;
  const nextArticle = currentIdx >= 0 && currentIdx < INSIGHT_ARTICLES.length - 1 ? INSIGHT_ARTICLES[currentIdx + 1] : null;

  const relatedArticles = INSIGHT_ARTICLES
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  const relatedServices = SERVICES_LIST.slice(0, 6);

  const handleShare = () => {
    const shareUrl = `${SITE_URL}/insights/${article.slug}`;
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // safe fallback
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <article className="py-12 lg:py-20 bg-slate-950 min-h-screen relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb & Back Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400">
            <li>
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); onNavigatePath('/'); }}
                className="hover:text-cyan-400 transition-colors"
              >
                Home
              </a>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></li>
            <li>
              <a
                href="/insights"
                onClick={(e) => { e.preventDefault(); onBackToInsights(); }}
                className="hover:text-cyan-400 transition-colors"
              >
                Engineering Insights
              </a>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></li>
            <li className="text-cyan-300 truncate max-w-[240px] sm:max-w-md" aria-current="page">
              {article.title}
            </li>
          </ol>

          <a
            href="/insights"
            onClick={(e) => { e.preventDefault(); onBackToInsights(); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </a>
        </nav>

        {/* Article Header Metadata */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/80">
              {article.category}
            </span>

            <span
              className="text-xs font-mono text-cyan-300 bg-slate-900 px-2.5 py-1 rounded-md border border-cyan-500/40 flex items-center gap-1.5"
              title={`Paced at 200 words/min (${stats.wordCount} words)`}
            >
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{stats.minutes} min read</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{stats.label}</span>
            </span>

            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>~{stats.wordCount} words</span>
            </span>

            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{article.publishedDate}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
            {article.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800/80">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                width={44}
                height={44}
                loading="eager"
                decoding="async"
                className="w-11 h-11 rounded-full object-cover border border-slate-700"
              />
              <div>
                <div className="text-sm font-bold text-white">{article.author.name}</div>
                <div className="text-xs text-slate-400 font-mono">{article.author.role} · Domain Tech Hub</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedLink ? 'Canonical URL Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </header>

        {/* Cover Image */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video max-h-[420px] w-full">
          <img
            src={article.coverImage}
            alt={article.title}
            width={960}
            height={540}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        <section aria-label="Key Takeaways" className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-cyan-900/50 mb-10 shadow-lg">
          <h2 className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>Executive Architectural Takeaways</span>
          </h2>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Main Article Body Sections */}
        <div className="space-y-8 mb-12">
          {article.contentSections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>
              <div className="text-slate-300 leading-relaxed">
                {renderRichBody(section.body, onNavigatePath, article.id)}
              </div>
              {section.codeSnippet && (
                <div className="mt-4 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden font-mono text-xs">
                  <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Production Implementation Snippet</span>
                  </div>
                  <pre className="p-4 text-cyan-300 overflow-x-auto text-xs leading-relaxed">
                    <code>{section.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Targeted Search Entities & Commercial Intent Box */}
        {getKeywordsForArticle(article.id).length > 0 && (
          <section className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-teal-900/40 my-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 className="text-xs font-mono text-teal-400 uppercase tracking-wider font-bold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Related Engineering Deliverables & Solutions</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getKeywordsForArticle(article.id).map((kw) => (
                <a
                  key={kw.slug}
                  href={kw.targetUrl}
                  aria-label={`${kw.keyword} - ${kw.targetServiceTitle}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePath(kw.targetUrl);
                  }}
                  className="p-3 rounded-xl bg-slate-950/90 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 transition-colors">
                      {kw.keyword}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-950/80 text-teal-400 border border-teal-800/50">
                      {kw.intentLabel}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                    <span className="truncate">{kw.targetServiceTitle}</span>
                    <span className="text-teal-400 group-hover:translate-x-0.5 transition-transform shrink-0">→</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t border-slate-800">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">
              #{tag}
            </span>
          ))}
        </div>

        {/* Previous / Next Article Links */}
        {(prevArticle || nextArticle) && (
          <nav aria-label="Adjacent articles" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 pt-6 border-t border-slate-800">
            {prevArticle ? (
              <a
                href={`/insights/${prevArticle.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(prevArticle.slug);
                }}
                className="p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group flex flex-col justify-between"
              >
                <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-400 flex items-center gap-1.5 mb-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Article</span>
                </span>
                <span className="text-sm font-bold text-slate-200 group-hover:text-white line-clamp-2">
                  {prevArticle.title}
                </span>
              </a>
            ) : <div />}

            {nextArticle ? (
              <a
                href={`/insights/${nextArticle.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(nextArticle.slug);
                }}
                className="p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-right transition-all group flex flex-col justify-between items-end"
              >
                <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-400 flex items-center gap-1.5 mb-1.5">
                  <span>Next Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-bold text-slate-200 group-hover:text-white line-clamp-2">
                  {nextArticle.title}
                </span>
              </a>
            ) : <div />}
          </nav>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-12 pt-8 border-t border-slate-800/80">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Related Engineering Articles</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <a
                  key={rel.id}
                  href={`/insights/${rel.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectArticle(rel.slug);
                  }}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 block mb-1">{rel.category}</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 flex items-center gap-1 mt-2">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links to Core Services */}
        <section className="mb-12 pt-8 border-t border-slate-800/80">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
            Explore Our Core Engineering Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {relatedServices.map((srv) => (
              <a
                key={srv.id}
                href={`/services/${srv.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePath(`/services/${srv.id}`);
                }}
                className="p-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {srv.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  {srv.shortDesc}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Bottom Consultation CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              Turnkey Implementation & Support
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              Need this solution implemented for your business?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Domain Tech Hub engineers and deploys production-ready web, M-Pesa, POS eTIMS, and CRM systems in Nairobi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=${encodeURIComponent(`Hello Domain Tech Hub, I read your article "${article.title}" and would like to discuss our project.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>

            {onScheduleConsultation && (
              <button
                type="button"
                onClick={() => onScheduleConsultation(article.title)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
              >
                Consult Our Team
              </button>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
