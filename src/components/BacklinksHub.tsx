import React, { useState } from 'react';
import { 
  Award, Check, Copy, Link2, ExternalLink, ShieldCheck, 
  Sparkles, Building2, Code, Share2, Globe, Newspaper,
  TrendingUp, CheckCircle2, ArrowRight, BookOpen, Layers,
  Terminal, Monitor, Mail
} from 'lucide-react';
import { SITE_URL } from '../config/site';
import { AGENCY_INFO } from '../data/portfolioData';

interface BacklinksHubProps {
  isModal?: boolean;
  onNavigateHome?: () => void;
}

export const BacklinksHub: React.FC<BacklinksHubProps> = ({ isModal = false }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'client-badges' | 'directory-kit' | 'embed-widgets' | 'pr-outreach'>('client-badges');
  const [badgeFormat, setBadgeFormat] = useState<'html' | 'react' | 'markdown'>('html');

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const clientBadges = [
    {
      id: 'text-attribution',
      title: 'Minimal Footer Attribution (Maximum SEO Equity)',
      description: 'The standard agency attribution link used on client websites. When placed on every client site footer, every indexed page on their domain links back with target anchor text.',
      badgeCode: {
        html: `<!-- Domain Tech Hub Client Attribution -->
<p style="font-size: 12px; color: #64748b; font-family: system-ui, -apple-system, sans-serif;">
  Website Designed &amp; Engineered by 
  <a href="${SITE_URL}" target="_blank" rel="noopener" style="color: #0d9488; font-weight: 600; text-decoration: underline;">
    Domain Tech Hub Nairobi
  </a>
</p>`,
        react: `{/* Domain Tech Hub Client Attribution */}
<p className="text-xs text-slate-500 font-sans">
  Website Designed &amp; Engineered by{' '}
  <a 
    href="${SITE_URL}" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
  >
    Domain Tech Hub Nairobi
  </a>
</p>`,
        markdown: `Website Designed & Engineered by [Domain Tech Hub Nairobi](${SITE_URL})`
      },
      preview: (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono text-center">
          <span>Website Designed &amp; Engineered by </span>
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-400 font-semibold underline underline-offset-2">
            Domain Tech Hub Nairobi
          </a>
        </div>
      )
    },
    {
      id: 'badge-mpesa',
      title: 'Verified M-Pesa Daraja 3.0 Architecture Badge',
      description: 'Engineered for e-commerce stores, POS portals, and billing platforms processing Safaricom M-Pesa payments in Kenya and East Africa.',
      badgeCode: {
        html: `<!-- Verified Safaricom M-Pesa Architecture Badge -->
<a href="${SITE_URL}/services/ecommerce-development" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 9999px; background-color: #064e3b; border: 1px solid #10b981; color: #a7f3d0; text-decoration: none; font-size: 11px; font-family: ui-monospace, monospace; font-weight: 600;">
  <span>✓ Verified Safaricom M-Pesa Architecture</span>
  <span style="opacity: 0.7;">· Domain Tech Hub</span>
</a>`,
        react: `{/* Verified Safaricom M-Pesa Architecture Badge */}
<a 
  href="${SITE_URL}/services/ecommerce-development" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold hover:border-emerald-400 transition-colors"
>
  <span>✓ Verified Safaricom M-Pesa Architecture</span>
  <span className="opacity-70">· Domain Tech Hub</span>
</a>`,
        markdown: `[![Verified Safaricom M-Pesa Architecture](https://img.shields.io/badge/Safaricom%20Daraja-M--Pesa%203.0%20Verified-064e3b?style=flat-square&logo=safari)](${SITE_URL}/services/ecommerce-development)`
      },
      preview: (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>✓ Verified Safaricom M-Pesa Architecture · Domain Tech Hub</span>
        </div>
      )
    },
    {
      id: 'badge-pill',
      title: 'Modern Engineered Badge (Dark & Light Adaptive)',
      description: 'A discreet, modern visual badge suited for modern SaaS, enterprise platforms, and digital client properties.',
      badgeCode: {
        html: `<!-- Domain Tech Hub Engineered Badge -->
<a href="${SITE_URL}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 10px; background-color: #0f172a; border: 1px solid #334155; color: #f8fafc; text-decoration: none; font-size: 12px; font-family: system-ui, sans-serif;">
  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #2dd4bf; display: inline-block;"></span>
  <span>Built by <strong>Domain Tech Hub Nairobi</strong></span>
</a>`,
        react: `{/* Domain Tech Hub Engineered Badge */}
<a 
  href="${SITE_URL}" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 text-xs font-medium hover:border-teal-400/60 transition-colors shadow-xs"
>
  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
  <span>Built by <strong className="text-white">Domain Tech Hub Nairobi</strong></span>
</a>`,
        markdown: `[![Built by Domain Tech Hub](https://img.shields.io/badge/Built%20by-Domain%20Tech%20Hub-0d9488?style=flat-square&logo=react)](${SITE_URL})`
      },
      preview: (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium shadow-md">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Built by <strong className="text-white">Domain Tech Hub</strong></span>
        </div>
      )
    },
    {
      id: 'badge-performance',
      title: 'Sub-Second Speed & Core Web Vitals Certified',
      description: 'For enterprise platforms achieving 95+ Google PageSpeed benchmarks and sub-1.2s First Contentful Paint.',
      badgeCode: {
        html: `<!-- Core Web Vitals Performance Certification -->
<a href="${SITE_URL}/services/web-development" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 8px; background-color: #042f2e; border: 1px solid #14b8a6; color: #5eead4; text-decoration: none; font-size: 11px; font-family: ui-monospace, monospace;">
  <span>⚡ Sub-Second Speed Certified</span>
  <span style="opacity: 0.8;">· Domain Tech Hub</span>
</a>`,
        react: `{/* Core Web Vitals Performance Certification */}
<a 
  href="${SITE_URL}/services/web-development" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-950/70 border border-teal-500/40 text-teal-300 text-xs font-mono hover:border-teal-400 transition-colors"
>
  <span>⚡ Sub-Second Speed Certified</span>
  <span className="opacity-80">· Domain Tech Hub</span>
</a>`,
        markdown: `[![Core Web Vitals Certified](https://img.shields.io/badge/Speed-Sub--Second%20Certified-14b8a6?style=flat-square&logo=speedtest)](${SITE_URL}/services/web-development)`
      },
      preview: (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>⚡ Sub-Second Speed Certified · Domain Tech Hub</span>
        </div>
      )
    }
  ];

  const directorySubmissions = [
    {
      name: 'Google Business Profile',
      domain: 'google.com/business',
      da: 'DA 100',
      type: 'Primary Google Maps & Local Pack Entity',
      actionUrl: 'https://google.com/business',
      priority: 'Highest',
      impact: 'Drives Google Maps 3-Pack rankings and local organic search backlinks.'
    },
    {
      name: 'Bing Places for Business',
      domain: 'bingplaces.com',
      da: 'DA 95',
      type: 'Microsoft Bing Search & Copilot Citation',
      actionUrl: 'https://bingplaces.com',
      priority: 'Highest',
      impact: 'Powers Bing search engine knowledge card and Bing Maps index.'
    },
    {
      name: 'Clutch.co (Nairobi Web Developers)',
      domain: 'clutch.co/ke/web-developers',
      da: 'DA 89',
      type: 'Leading Global Agency Directory',
      actionUrl: 'https://clutch.co',
      priority: 'High',
      impact: 'High-authority B2B lead generation and contextual agency backlink.'
    },
    {
      name: 'Crunchbase',
      domain: 'crunchbase.com',
      da: 'DA 91',
      type: 'Global Tech & Agency Registry',
      actionUrl: 'https://crunchbase.com',
      priority: 'High',
      impact: 'Recognized by Google as an authoritative entity graph validation.'
    },
    {
      name: 'Yellow Pages Kenya',
      domain: 'yellowpageskenya.com',
      da: 'DA 54',
      type: 'Authoritative National Commercial Index',
      actionUrl: 'https://yellowpageskenya.com',
      priority: 'Medium',
      impact: 'Top indexed Kenya local business citation establishing geo-relevance.'
    },
    {
      name: 'Kenya Business Directory',
      domain: 'kenyabusinessdirectory.co.ke',
      da: 'DA 48',
      type: 'Regional Business Index',
      actionUrl: 'https://kenyabusinessdirectory.co.ke',
      priority: 'Medium',
      impact: 'Strengthens regional Nairobi geo-targeting signals.'
    },
    {
      name: 'BusinessList Kenya',
      domain: 'businesslist.co.ke',
      da: 'DA 51',
      type: 'Commercial Directory & Map Citation',
      actionUrl: 'https://businesslist.co.ke',
      priority: 'Medium',
      impact: 'Direct referral traffic and do-follow/no-follow citation mix.'
    },
    {
      name: 'Yalwa Kenya',
      domain: 'yalwa.co.ke',
      da: 'DA 46',
      type: 'Nairobi Regional Business Index',
      actionUrl: 'https://yalwa.co.ke',
      priority: 'Medium',
      impact: 'Local category backlink for Web Design & Software Development.'
    }
  ];

  const companyDossier = {
    businessName: 'Domain Tech Hub',
    website: SITE_URL,
    category: 'Software Engineering, Web Design & Digital Marketing Agency',
    phone: '+254 118 746 676',
    email: 'info@domaintechhubs.com',
    location: 'Delta Corner Tower, Westlands, Nairobi, Kenya',
    shortDesc: 'Domain Tech Hub is a premier software engineering and web development agency in Nairobi, Kenya specializing in high-performance web applications, Safaricom Daraja 3.0 M-Pesa e-commerce, custom CRM software, and technical SEO.',
    fullDesc: 'Headquartered in Westlands, Nairobi, Domain Tech Hub engineers mission-critical digital systems for Kenyan enterprises and global organizations. Our engineering practice delivers sub-second Next.js web applications, automated Safaricom Daraja M-Pesa STK Push checkouts, KRA eTIMS billing architectures, and high-ROI conversion systems with guaranteed 99.9% uptime SLAs.'
  };

  const prPitchTemplates = [
    {
      title: 'Techweez & CIO Africa: African E-Commerce Latency Pitch',
      recipient: 'Techweez / TechTrendsKE / CIO Africa Editors',
      subject: 'Story Idea: How Kenyan E-Commerce Brands Are Slashing Cart Abandonment with Sub-Second Web Architecture & Daraja 3.0',
      pitchText: `Hi Team,\n\nWe read your recent coverage on digital commerce growth in East Africa with great interest.\n\nAt Domain Tech Hub (Nairobi-based engineering agency), our engineering team recently benchmarked checkouts across Kenyan e-commerce platforms and discovered that checkout load times over 3 seconds cause up to 64% STK Push abandonment.\n\nWe published a deep architectural teardown detailing how headless Next.js paired with Safaricom Daraja 3.0 zero-loss webhook queues drives a 4.6x lift in mobile checkout completions:\n${SITE_URL}/insights/zero-loss-mpesa-stk-push-architecture\n\nWould you be open to an interview or an exclusive guest column on modern web performance benchmarks for Kenyan retailers?\n\nBest regards,\nDomain Tech Hub Engineering Team\n${SITE_URL}`
    },
    {
      title: 'Business Daily & SME Media: KRA eTIMS Automation Pitch',
      recipient: 'Business Daily / Standard Business Desk',
      subject: 'Expert Commentary: How Kenyan Retailers & POS Systems Are Integrating Direct KRA eTIMS API Invoicing',
      pitchText: `Dear Business Editor,\n\nAs Kenyan businesses navigate mandatory KRA eTIMS compliance, many SMEs continue facing invoicing bottlenecks with manual portal entries.\n\nOur software team at Domain Tech Hub has prepared a free technical playbook explaining how modern POS systems integrate real-time eTIMS electronic signatures without disrupting checkout queues:\n${SITE_URL}/insights/how-to-generate-an-etims-invoice\n\nWe are available for expert technical quotes or an educational op-ed on seamless tax tech integration for Kenyan businesses.\n\nWarm regards,\nDomain Tech Hub Technical Director\n${SITE_URL}`
    }
  ];

  return (
    <div className={`space-y-8 ${isModal ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
      
      {/* Overview Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-950/70 via-slate-900 to-slate-950 border border-teal-500/30 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono uppercase tracking-wider">
            <Link2 className="w-3.5 h-3.5 text-teal-400" />
            <span>SEO Equity &amp; Citation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Agency Backlink &amp; Authority Playbook
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Leading digital agencies acquire thousands of organic backlinks by standardizing client footer attributions, claiming high-DA directory citations, and deploying embeddable link magnets. Equip your properties with permanent, high-equity links pointing back to <span className="text-teal-300 font-mono font-semibold">{SITE_URL}</span>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-teal-400 font-mono font-bold text-lg">Channel 1</div>
              <div className="text-[11px] text-slate-400">Client Footers</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-cyan-400 font-mono font-bold text-lg">DA 45–100</div>
              <div className="text-[11px] text-slate-400">Kenya Directories</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-emerald-400 font-mono font-bold text-lg">Link Magnets</div>
              <div className="text-[11px] text-slate-400">Embed Widgets</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-purple-400 font-mono font-bold text-lg">Google News</div>
              <div className="text-[11px] text-slate-400">Preferred Source</div>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Navigation */}
      <div className="flex border-b border-stone-200 dark:border-slate-800 gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('client-badges')}
          className={`py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'client-badges'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>1. Client Footer Attributions</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('directory-kit')}
          className={`py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'directory-kit'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>2. Kenyan &amp; Global Directory Citations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('embed-widgets')}
          className={`py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'embed-widgets'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>3. Embeddable Link Magnets</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('pr-outreach')}
          className={`py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'pr-outreach'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          <span>4. Media &amp; PR Pitch Kit</span>
        </button>
      </div>

      {/* SUB-TAB 1: CLIENT FOOTER ATTRIBUTION (THE #1 BACKLINK ENGINE) */}
      {activeSubTab === 'client-badges' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-500/30 text-xs text-teal-900 dark:text-teal-200 leading-relaxed flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">How Top Agencies Generate 10,000+ Backlinks:</strong> When you deploy any website, web app, or M-Pesa store for a client, place one of these discreet badges in their footer. Every single page indexed on the client domain will transmit organic link equity directly to <span className="font-mono text-teal-700 dark:text-teal-300 font-semibold">{SITE_URL}</span>.
            </div>
          </div>

          {/* Format Selector */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-stone-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select Output Code Format:
            </div>
            <div className="inline-flex p-1 bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setBadgeFormat('html')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  badgeFormat === 'html' ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                HTML / Web
              </button>
              <button
                type="button"
                onClick={() => setBadgeFormat('react')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  badgeFormat === 'react' ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                React / Next.js
              </button>
              <button
                type="button"
                onClick={() => setBadgeFormat('markdown')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  badgeFormat === 'markdown' ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Markdown / README
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {clientBadges.map((badge) => {
              const codeToCopy = badge.badgeCode[badgeFormat];
              return (
                <div key={badge.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {badge.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {badge.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(badge.id, codeToCopy)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer shrink-0 ${
                        copiedId === badge.id
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {copiedId === badge.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy {badgeFormat.toUpperCase()} Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-1.5">Visual Live Preview:</div>
                    {badge.preview}
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                      Ready-to-Paste Code ({badgeFormat.toUpperCase()}):
                    </div>
                    <pre className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] font-mono text-teal-300 overflow-x-auto whitespace-pre">
                      {codeToCopy}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: KENYAN & GLOBAL HIGH-DA DIRECTORY CITATIONS */}
      {activeSubTab === 'directory-kit' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
            Submitting Domain Tech Hub to top business directories provides immediate, authoritative NAP citations (Name, Address, Phone) and search engine backlinks with Domain Authority between 45 and 100.
          </div>

          {/* Business Profile Copy-Paste Dossier */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal-500" />
                  <span>One-Click Business Dossier (NAP Data)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Copy and paste this verified info directly into directory registration forms.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('full-dossier', JSON.stringify(companyDossier, null, 2))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono text-teal-700 dark:text-teal-300 font-semibold transition-colors cursor-pointer"
              >
                {copiedId === 'full-dossier' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'full-dossier' ? 'Dossier Copied' : 'Copy Complete JSON Dossier'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200 dark:border-slate-800">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Business Name</span>
                <span className="text-slate-900 dark:text-white font-semibold">{companyDossier.businessName}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200 dark:border-slate-800">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Canonical Website</span>
                <span className="text-teal-600 dark:text-teal-400 font-mono font-semibold">{companyDossier.website}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200 dark:border-slate-800">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Physical Address</span>
                <span className="text-slate-900 dark:text-white">{companyDossier.location}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200 dark:border-slate-800">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Phone &amp; Email</span>
                <span className="text-slate-900 dark:text-white">{companyDossier.phone} · {companyDossier.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-950/80 border border-stone-200 dark:border-slate-800 sm:col-span-2">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Standard Description (150 words)</span>
                <p className="text-slate-700 dark:text-slate-300 text-xs mt-1 leading-relaxed">{companyDossier.shortDesc}</p>
              </div>
            </div>
          </div>

          {/* Directory Listings Table */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Top Directories to Submit:
            </div>

            <div className="grid grid-cols-1 gap-3">
              {directorySubmissions.map((dir, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{dir.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800/60 font-semibold">
                        {dir.da}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-stone-100 dark:bg-slate-800 text-slate-500">
                        {dir.priority} Priority
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {dir.type} · <span className="font-mono text-slate-400">{dir.domain}</span>
                    </div>
                    <div className="text-[11px] text-teal-600 dark:text-teal-400/90 mt-1">
                      {dir.impact}
                    </div>
                  </div>

                  <a
                    href={dir.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    <span>Submit Listing</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: EMBEDDABLE LINK MAGNETS */}
      {activeSubTab === 'embed-widgets' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
            Offer free interactive widgets that other webmasters, tech bloggers, and Nairobi business portals can embed directly on their articles. Each embedded iframe includes an authoritative attribution backlink to Domain Tech Hub.
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Interactive Scope &amp; Budget Calculator Widget
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Allows third-party websites to embed the full interactive estimation tool with a follow attribution link.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('calc-widget', `<iframe src="${SITE_URL}/tools/calculator" width="100%" height="650" style="border: 1px solid #334155; border-radius: 16px;" title="Kenya Website Cost Calculator - Domain Tech Hub"></iframe>\n<p style="text-align: center; font-size: 11px; color: #64748b; font-family: sans-serif; margin-top: 6px;">Powered by <a href="${SITE_URL}" target="_blank" rel="noopener" style="color: #0d9488; font-weight: bold; text-decoration: underline;">Domain Tech Hub Nairobi</a></p>`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono text-teal-700 dark:text-teal-300 font-semibold transition-colors cursor-pointer"
              >
                {copiedId === 'calc-widget' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'calc-widget' ? 'Widget Code Copied!' : 'Copy Embed Code'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] font-mono text-teal-300 overflow-x-auto whitespace-pre">
{`<iframe src="${SITE_URL}/tools/calculator" width="100%" height="650" style="border: 1px solid #334155; border-radius: 16px;" title="Kenya Website Cost Calculator - Domain Tech Hub"></iframe>
<p style="text-align: center; font-size: 11px; color: #64748b; font-family: sans-serif; margin-top: 6px;">
  Powered by <a href="${SITE_URL}" target="_blank" rel="noopener" style="color: #0d9488; font-weight: bold; text-decoration: underline;">Domain Tech Hub Nairobi</a>
</p>`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Core Web Vitals &amp; PageSpeed Diagnostic Widget
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Allows tech blogs to embed an instant website speed and Core Web Vitals diagnostic form.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy('audit-widget', `<iframe src="${SITE_URL}/tools/audit" width="100%" height="600" style="border: 1px solid #334155; border-radius: 16px;" title="Web Speed & Technical SEO Audit - Domain Tech Hub"></iframe>\n<p style="text-align: center; font-size: 11px; color: #64748b; font-family: sans-serif; margin-top: 6px;">Free Audit Tool by <a href="${SITE_URL}/services/seo-services" target="_blank" rel="noopener" style="color: #0d9488; font-weight: bold; text-decoration: underline;">Domain Tech Hub SEO Agency Nairobi</a></p>`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono text-teal-700 dark:text-teal-300 font-semibold transition-colors cursor-pointer"
              >
                {copiedId === 'audit-widget' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'audit-widget' ? 'Widget Code Copied!' : 'Copy Embed Code'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] font-mono text-teal-300 overflow-x-auto whitespace-pre">
{`<iframe src="${SITE_URL}/tools/audit" width="100%" height="600" style="border: 1px solid #334155; border-radius: 16px;" title="Web Speed & Technical SEO Audit - Domain Tech Hub"></iframe>
<p style="text-align: center; font-size: 11px; color: #64748b; font-family: sans-serif; margin-top: 6px;">
  Free Audit Tool by <a href="${SITE_URL}/services/seo-services" target="_blank" rel="noopener" style="color: #0d9488; font-weight: bold; text-decoration: underline;">Domain Tech Hub SEO Agency Nairobi</a>
</p>`}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MEDIA & PR PITCH KIT */}
      {activeSubTab === 'pr-outreach' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            Editorial backlinks from high-authority Kenyan news sites (Techweez, CIO Africa, TechTrendsKE, Business Daily) provide unmatched SEO trust. Use these pre-structured email pitches to pitch technical stories and get high-value contextual backlinks.
          </div>

          <div className="grid grid-cols-1 gap-6">
            {prPitchTemplates.map((template, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {template.title}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Target: <span className="font-semibold text-slate-700 dark:text-slate-300">{template.recipient}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(`pitch-${idx}`, `Subject: ${template.subject}\n\n${template.pitchText}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono text-teal-700 dark:text-teal-300 font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    {copiedId === `pitch-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === `pitch-${idx}` ? 'Pitch Copied!' : 'Copy Email Pitch'}</span>
                  </button>
                </div>

                <div className="text-xs">
                  <span className="font-mono text-slate-400 text-[10px] uppercase block">Subject Line:</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{template.subject}</div>
                </div>

                <div>
                  <span className="font-mono text-slate-400 text-[10px] uppercase block mb-1">Email Body:</span>
                  <pre className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs font-sans text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {template.pitchText}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
