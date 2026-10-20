import React, { useState, useEffect, useRef, useId } from 'react';
import { 
  Search, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, 
  Gauge, ArrowRight, Printer, RefreshCw, Globe, Smartphone, Lock,
  MessageSquare, Mail, Zap, Server, Code, FileText, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead, sendToWhatsApp, sendToEmail } from '../utils/leadDispatch';
import { LiveScanResult, performLiveAudit, isValidWebUrl } from '../utils/liveUrlAuditor';

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
  const [report, setReport] = useState<LiveScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const reportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [report]);

  const runAudit = async (overrideUrl?: string | React.FormEvent) => {
    if (typeof overrideUrl === 'object' && overrideUrl !== null && 'preventDefault' in overrideUrl) {
      overrideUrl.preventDefault();
      overrideUrl = undefined;
    }

    const rawInput = (typeof overrideUrl === 'string' ? overrideUrl : urlInput).trim();
    if (!rawInput) return; // Do nothing if empty

    // Check if it's a real link or just words posted: if not a real link, do nothing!
    if (!isValidWebUrl(rawInput)) {
      return;
    }

    let cleanUrl = rawInput;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setIsAnalyzing(true);
    setScanError(null);
    setReport(null);

    setAnalysisStep('Initiating HTTP/TLS handshake and DNS resolution...');

    timeoutsRef.current.push(setTimeout(() => {
      setAnalysisStep('Measuring server Time to First Byte (TTFB)...');
    }, 400));

    timeoutsRef.current.push(setTimeout(() => {
      setAnalysisStep('Scanning DOM for <title>, <meta description>, Canonical & Robots tags...');
    }, 800));

    timeoutsRef.current.push(setTimeout(() => {
      setAnalysisStep('Evaluating Heading hierarchy (H1, H2), Schema JSON-LD & mobile viewport...');
    }, 1200));

    try {
      // 1. Try server-side live audit API (handles cross-origin inspection with no CORS restrictions)
      const targetParam = encodeURIComponent(cleanUrl);
      const kwParam = keywordInput.trim() ? `&keyword=${encodeURIComponent(keywordInput.trim())}` : '';
      
      let liveData: LiveScanResult | null = null;
      try {
        const res = await fetch(`/api/seo-audit?url=${targetParam}${kwParam}`, {
          signal: AbortSignal.timeout(10000),
        });
        if (res.ok) {
          liveData = await res.json();
        } else {
          const errJson = await res.json().catch(() => null);
          throw new Error(errJson?.error || `Server returned HTTP ${res.status}`);
        }
      } catch (apiErr: any) {
        console.warn('API audit route fallback:', apiErr?.message);
        liveData = await performLiveAudit(cleanUrl, keywordInput.trim() || undefined);
      }

      if (liveData) {
        setReport(liveData);
      } else {
        const fallback = await performLiveAudit(cleanUrl, keywordInput.trim() || undefined);
        setReport(fallback);
      }
    } catch (err: any) {
      console.warn('Audit diagnostic fallback triggered:', err);
      try {
        const fallback = await performLiveAudit(cleanUrl, keywordInput.trim() || undefined);
        setReport(fallback);
      } catch (finalErr: any) {
        setScanError(finalErr?.message || `Unable to reach ${cleanUrl}. Please verify the domain is spelled correctly.`);
      }
    } finally {
      setIsAnalyzing(false);
    }
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
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-teal-500/30 bg-teal-950/20 px-3.5 py-2 text-xs font-medium text-teal-800 dark:text-teal-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Live URL Inspection: real-time HTTP handshake, server response time (TTFB), DOM metadata, and SSL security analysis.</span>
          </div>
        </div>

        {/* Input Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mb-12">
          <form onSubmit={runAudit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              <div className="md:col-span-7">
                <div className="flex items-center justify-between mb-2">
                  <label id={`${urlInputId}-label`} htmlFor={urlInputId} className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {t('audit.urlLabel')}
                  </label>
                  {urlInput.trim() && !isValidWebUrl(urlInput.trim()) && (
                    <span className="text-rose-400 text-[11px] font-mono">
                      Not a valid website link (just words)
                    </span>
                  )}
                </div>
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
                    placeholder="e.g. https://yourbusiness.co.ke or company.com"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      urlInput.trim() && !isValidWebUrl(urlInput.trim())
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-slate-800 focus:border-cyan-500'
                    }`}
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
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500">Quick test:</span>
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('https://www.domaintechhubs.com');
                    runAudit('https://www.domaintechhubs.com');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] border border-slate-700 transition-colors cursor-pointer"
                >
                  domaintechhubs.com
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('https://yourbusiness.co.ke');
                    runAudit('https://yourbusiness.co.ke');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-mono text-[11px] border border-slate-700 transition-colors cursor-pointer"
                >
                  yourbusiness.co.ke
                </button>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || (Boolean(urlInput.trim()) && !isValidWebUrl(urlInput.trim()))}
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

          {/* Error Message */}
          {scanError && (
            <div className="mt-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">Scan Notice</span>
                <p className="text-rose-300/90 leading-relaxed">{scanError}</p>
              </div>
            </div>
          )}

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
                <div className="bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 h-full w-3/4 animate-pulse rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Audit Results Report */}
        {report && (
          <div ref={reportRef} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-5xl animate-in fade-in space-y-6">
            
            {/* Report Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-[10px] font-mono text-emerald-300 uppercase tracking-wider mb-2">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>LIVE INSPECTION COMPLETE · {report.analyzedAt}</span>
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
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
                <button
                  type="button"
                  onClick={() => onFixWithAgency(report.url, report.issues.filter(i => i.severity !== 'good').length)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Fix With Domain Tech Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-b border-slate-800">
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
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Response (TTFB)</span>
                  <Gauge className="w-4 h-4 text-teal-400" />
                </div>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  {report.liveMetrics?.ttfbMs ? `${report.liveMetrics.ttfbMs}ms` : `${(report.loadingTimeMs / 1000).toFixed(1)}s`}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Server Latency</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Security & SSL</span>
                  <Lock className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                  {report.sslValid ? 'HTTPS Active' : 'Insecure HTTP'}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {report.liveMetrics?.hstsEnabled ? 'HSTS Enabled' : 'TLS Encrypted'}
                </span>
              </div>
            </div>

            {/* Live Inspected DOM Metrics Strip */}
            {report.liveMetrics && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 font-mono uppercase text-[11px] text-cyan-400 font-bold">
                  <Server className="w-3.5 h-3.5" />
                  <span>Live Server &amp; DOM Metrics Detected</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">HTTP Response:</span>
                    <span className="font-mono font-semibold text-white">{report.liveMetrics.statusCode} {report.liveMetrics.statusText || 'OK'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">HTML Payload Size:</span>
                    <span className="font-mono font-semibold text-white">{report.liveMetrics.pageSizeKb} KB</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Headings Detected:</span>
                    <span className="font-mono font-semibold text-white">{report.liveMetrics.h1Count} H1 / {report.liveMetrics.h2Count} H2</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Image Alt Compliance:</span>
                    <span className="font-mono font-semibold text-white">
                      {report.liveMetrics.imagesTotal - report.liveMetrics.imagesMissingAlt} / {report.liveMetrics.imagesTotal} valid
                    </span>
                  </div>
                </div>
                {report.liveMetrics.title && (
                  <div className="pt-2 border-t border-slate-800/80 text-[11px]">
                    <span className="text-slate-500">Live Title: </span>
                    <span className="text-cyan-200 font-mono">"{report.liveMetrics.title}"</span>
                  </div>
                )}
              </div>
            )}

            {/* Diagnostic Issues List */}
            <div className="py-2">
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
                      notes: `Live Audit for ${report.url}: Score ${report.overallScore}/100. Issues: ${criticalCount}. Response: ${report.liveMetrics?.ttfbMs || report.loadingTimeMs}ms.`
                    };
                    saveLead(leadData);
                    sendToWhatsApp(leadData);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
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
                      notes: `Live Audit for ${report.url}: Score ${report.overallScore}/100. Issues: ${criticalCount}. Response: ${report.liveMetrics?.ttfbMs || report.loadingTimeMs}ms.`
                    };
                    saveLead(leadData);
                    sendToEmail(leadData);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => onFixWithAgency(report.url, report.issues.filter(i => i.severity !== 'good').length)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs whitespace-nowrap shadow-md transition-all cursor-pointer"
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
