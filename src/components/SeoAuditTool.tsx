import React, { useState, useEffect, useRef, useId } from 'react';
import { 
  Search, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, 
  Gauge, ArrowRight, Printer, RefreshCw, Globe, Smartphone, Lock,
  MessageSquare, Mail
} from 'lucide-react';
import { AuditReport } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToWhatsApp, sendToEmail } from '../utils/leadDispatch';

interface SeoAuditToolProps {
  onFixWithAgency: (domain: string, auditIssuesCount: number) => void;
}

export const SeoAuditTool: React.FC<SeoAuditToolProps> = ({ onFixWithAgency }) => {
  const { t } = useLanguage();
  const urlInputId = useId();
  const keywordInputId = useId();
  const [urlInput, setUrlInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [report, setReport] = useState<AuditReport | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    // Clear previous timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Normalize URL
    let cleanUrl = urlInput.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    setIsAnalyzing(true);
    setReport(null);

    // Multi-stage audit simulation
    setAnalysisStep('Initiating TLS/SSL handshake & DNS resolution...');
    
    timeoutsRef.current.push(setTimeout(() => {
      setAnalysisStep('Profiling Core Web Vitals (LCP, CLS, TTFB)...');
    }, 700));

    timeoutsRef.current.push(setTimeout(() => {
      setAnalysisStep('Scanning DOM for Schema JSON-LD, H1-H6 tags & metadata...');
    }, 1400));

    timeoutsRef.current.push(setTimeout(() => {
      setAnalysisStep('Evaluating mobile viewport fluidity & touch targets...');
    }, 2100));

    timeoutsRef.current.push(setTimeout(() => {
      // Deterministic but realistic variance based on URL string hash
      const hash = cleanUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const isKnownFast = cleanUrl.includes('google') || cleanUrl.includes('apple') || cleanUrl.includes('domaintechhub');
      
      const overallScore = isKnownFast ? 94 : Math.max(52, 60 + (hash % 32));
      const seoScore = isKnownFast ? 96 : Math.max(55, 62 + ((hash * 3) % 30));
      const performanceScore = isKnownFast ? 92 : Math.max(48, 58 + ((hash * 7) % 36));
      const mobileScore = isKnownFast ? 98 : Math.max(65, 75 + ((hash * 5) % 22));
      const securityScore = cleanUrl.startsWith('https://') ? 95 : 40;
      const loadingTimeMs = isKnownFast ? 850 : 1400 + (hash % 2200);

      const generatedIssues: AuditReport['issues'] = [
        {
          category: 'SEO',
          severity: seoScore > 85 ? 'good' : 'critical',
          title: seoScore > 85 ? 'Optimized Meta Title & Description' : 'Missing or Truncated Meta Description',
          description: seoScore > 85 
            ? 'Title tags and descriptions are within optimal pixel lengths.' 
            : 'Your meta description is either missing or exceeds 160 characters, hurting click-through rate on Google.',
          recommendation: 'Craft compelling 155-character meta descriptions with primary commercial keywords.'
        },
        {
          category: 'SEO',
          severity: 'warning',
          title: 'Structured Data Schema (JSON-LD) Incomplete',
          description: 'No Organization, LocalBusiness, or Service schema markup was found in the head tag.',
          recommendation: 'Implement Schema.org JSON-LD to unlock rich snippets and star ratings on Google Search.'
        },
        {
          category: 'Performance',
          severity: performanceScore > 80 ? 'good' : 'critical',
          title: performanceScore > 80 ? 'Fast Largest Contentful Paint (LCP)' : 'High Largest Contentful Paint (LCP > 2.5s)',
          description: `Main banner took ${(loadingTimeMs / 1000).toFixed(1)}s to render, failing Google Core Web Vitals benchmark.`,
          recommendation: 'Convert hero images to WebP/AVIF and configure edge caching on a CDN like Cloudflare.'
        },
        {
          category: 'Performance',
          severity: 'warning',
          title: 'Unused JavaScript & CSS Render Blocking',
          description: 'Third-party tracking scripts and bulky CSS frameworks delay first render by ~620ms.',
          recommendation: 'Defer non-essential scripts and tree-shake unused Tailwind or framework dependencies.'
        },
        {
          category: 'Mobile',
          severity: 'good',
          title: 'Responsive Viewport Tag Active',
          description: 'Viewport tag with width=device-width correctly declared for mobile smartphones.',
          recommendation: 'Maintain touch target sizes at minimum 44px for navigation buttons.'
        },
        {
          category: 'Security',
          severity: cleanUrl.startsWith('https://') ? 'good' : 'critical',
          title: cleanUrl.startsWith('https://') ? 'Valid HTTPS / SSL Certificate' : 'Missing SSL Certificate (Insecure HTTP)',
          description: cleanUrl.startsWith('https://') 
            ? 'Traffic is encrypted with an active modern TLS 1.3 certificate.' 
            : 'Browsers warn users "Not Secure", which causes an immediate 80%+ bounce rate.',
          recommendation: 'Deploy Let\'s Encrypt or Cloudflare automated SSL with strict HSTS headers.'
        }
      ];

      setReport({
        id: `audit-${Date.now()}`,
        url: cleanUrl,
        keyword: keywordInput.trim() || undefined,
        analyzedAt: new Date().toLocaleDateString('en-KE', { 
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
        }),
        overallScore,
        seoScore,
        performanceScore,
        mobileScore,
        securityScore,
        loadingTimeMs,
        sslValid: cleanUrl.startsWith('https://'),
        mobileFriendly: mobileScore >= 70,
        issues: generatedIssues
      });

      setIsAnalyzing(false);
    }, 2800));
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
    if (score >= 65) return 'text-amber-400 border-amber-500/40 bg-amber-950/20';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/20';
  };

  return (
    <section id="audit" className="py-20 lg:py-28 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            {t('audit.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('audit.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t('audit.subtitle')}
          </p>
          <p role="note" className="mt-3 rounded-xl border border-amber-700/50 bg-amber-950/30 p-3 text-sm text-amber-900 dark:text-amber-200">
            Demo preview only: this static page does not fetch or scan the URL. Scores and recommendations are illustrative, not measured results.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mb-12">
          <form onSubmit={runAudit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              <div className="md:col-span-7">
                <label id={`${urlInputId}-label`} htmlFor={urlInputId} className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  {t('audit.urlLabel')}
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id={urlInputId}
                    aria-labelledby={`${urlInputId}-label`}
                    type="text"
                    required
                    autoComplete="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="e.g. yourbusiness.co.ke or company.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="md:col-span-5">
                <label id={`${keywordInputId}-label`} htmlFor={keywordInputId} className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  {t('audit.keywordLabel')}
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id={keywordInputId}
                    aria-labelledby={`${keywordInputId}-label`}
                    type="text"
                    autoComplete="off"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="e.g. Solar Installation Nairobi"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No external website checks are performed; this creates a sample report only.</span>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>{t('audit.analyzing')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('audit.btnRun')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Analysis in Progress Indicator */}
          {isAnalyzing && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-300">
                  {analysisStep}
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full w-3/4 animate-pulse rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Audit Results Report */}
        {report && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-5xl animate-in fade-in">
            
            {/* Report Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  ILLUSTRATIVE AUDIT PREVIEW · {report.analyzedAt}
                </div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>{report.url}</span>
                </h3>
                {report.keyword && (
                  <p className="text-xs text-slate-400 mt-1">
                    Audited for keyword intent: <span className="text-cyan-300 font-mono">"{report.keyword}"</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
                <button
                  onClick={() => onFixWithAgency(report.url, report.issues.filter(i => i.severity !== 'good').length)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Fix With Domain Tech Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800">
              <div className={`p-4 rounded-xl border ${getScoreColor(report.overallScore)}`}>
                <span className="text-[11px] font-mono uppercase block">Overall Health</span>
                <span className="text-3xl font-extrabold font-mono mt-1 block">
                  {report.overallScore} / 100
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {report.overallScore >= 80 ? 'Good Standing' : report.overallScore >= 60 ? 'Needs Optimization' : 'Critical Gaps'}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">SEO Score</span>
                  <Search className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  {report.seoScore}%
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">On-page & Meta</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Load Speed</span>
                  <Gauge className="w-4 h-4 text-teal-400" />
                </div>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  {(report.loadingTimeMs / 1000).toFixed(1)}s
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Core Web Vitals LCP</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Security & SSL</span>
                  <Lock className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                  {report.sslValid ? 'Encrypted' : 'Insecure'}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">TLS 1.3 Status</span>
              </div>
            </div>

            {/* Diagnostic Issues List */}
            <div className="py-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                Detailed Diagnostic Findings ({report.issues.length} Evaluated Checkpoints)
              </h4>

              <div className="space-y-3">
                {report.issues.map((issue, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      {issue.severity === 'critical' ? (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      ) : issue.severity === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">{issue.title}</span>
                          <span className="text-[10px] font-mono uppercase text-slate-500">[{issue.category}]</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {issue.description}
                        </p>
                        <p className="text-xs text-cyan-300/90 mt-1.5 font-mono">
                          Recommendation: {issue.recommendation}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        issue.severity === 'critical' ? 'text-rose-400 bg-rose-950/50' :
                        issue.severity === 'warning' ? 'text-amber-400 bg-amber-950/50' :
                        'text-emerald-400 bg-emerald-950/50'
                      }`}>
                        {issue.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="mt-4 p-5 rounded-xl bg-teal-50/80 dark:bg-cyan-950/50 border border-teal-200 dark:border-cyan-800/50 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                  Want Domain Tech Hub’s senior team to resolve these issues?
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  We guarantee Core Web Vitals passing scores, Schema markup implementation, and Google ranking leaps.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const criticalCount = report.issues.filter(i => i.severity !== 'good').length;
                    const leadData = {
                      source: 'audit' as const,
                      sourceTitle: 'Live SEO Speed & Vitals Audit',
                      fullName: 'Website Owner',
                      email: '',
                      phone: '',
                      serviceOrItem: `SEO & Speed Fix for ${report.url}`,
                      notes: `Audit for ${report.url}: Score ${report.overallScore}/100. Critical issues: ${criticalCount}. Recommendations: LCP speed, Schema JSON-LD, SSL.`
                    };
                    saveLead(leadData);
                    sendToWhatsApp(leadData);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const criticalCount = report.issues.filter(i => i.severity !== 'good').length;
                    const leadData = {
                      source: 'audit' as const,
                      sourceTitle: 'Live SEO Speed & Vitals Audit',
                      fullName: 'Website Owner',
                      email: '',
                      phone: '',
                      serviceOrItem: `SEO & Speed Fix for ${report.url}`,
                      notes: `Audit for ${report.url}: Score ${report.overallScore}/100. Critical issues: ${criticalCount}. Recommendations: LCP speed, Schema JSON-LD, SSL.`
                    };
                    saveLead(leadData);
                    sendToEmail(leadData);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Report</span>
                </button>

                <button
                  onClick={() => onFixWithAgency(report.url, report.issues.filter(i => i.severity !== 'good').length)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs whitespace-nowrap shadow-md transition-all"
                >
                  Schedule Fix Call
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
