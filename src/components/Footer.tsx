import React, { useState, useEffect } from 'react';
import { 
  Globe, Mail, Phone, MapPin, Clock, MessageSquare, 
  ArrowUpRight, Heart, Shield, Code, X, ShieldCheck, FileText, CheckCircle2,
  Award, Link2
} from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { BacklinkPartnerKitModal } from './BacklinkPartnerKitModal';

interface FooterProps {
  onNavigate: (sectionId: string, subParam?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'sla' | null>(null);
  const [isBacklinkKitOpen, setIsBacklinkKitOpen] = useState(false);

  useEffect(() => {
    // Ensure Google's official Preferred Sources button publisher script is loaded
    const scriptSrc = 'https://news.google.com/swg/js/v1/publisher.js';
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptSrc;
      document.body.appendChild(script);
    }

    // Trigger Google's Preferred Source button initialization if already loaded
    const triggerGoogleButton = () => {
      const win = window as unknown as {
        PREFERRED_SOURCE?: {
          init?: () => void;
          api?: { init?: () => void };
          push?: (fn: (api: unknown) => void) => void;
        } | Array<(api: unknown) => void>;
      };
      if (win.PREFERRED_SOURCE && typeof (win.PREFERRED_SOURCE as { init?: () => void }).init === 'function') {
        (win.PREFERRED_SOURCE as { init: () => void }).init();
      } else if (win.PREFERRED_SOURCE && (win.PREFERRED_SOURCE as { api?: { init?: () => void } }).api?.init) {
        (win.PREFERRED_SOURCE as { api: { init: () => void } }).api.init();
      } else if (Array.isArray(win.PREFERRED_SOURCE)) {
        win.PREFERRED_SOURCE.push((api: unknown) => {
          if (api && typeof (api as { init?: () => void }).init === 'function') {
            (api as { init: () => void }).init();
          }
        });
      }
    };

    triggerGoogleButton();
    const timer = setTimeout(triggerGoogleButton, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFooterNavigate = (e: React.MouseEvent, sectionId: string, subParam?: string) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.blur();
    }
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onNavigate(sectionId, subParam);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={(e) => handleFooterNavigate(e, 'home')} 
              className="text-left cursor-pointer p-0 focus:outline-none"
              aria-label="Domain Tech Hub - Return to Home"
              title="Domain Tech Hub - Return to Home"
            >
              <Logo variant="horizontal" size="md" />
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>

            <div className="pt-2 space-y-2 font-mono text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <div className="flex flex-wrap items-center gap-1.5">
                  <a href={`mailto:${AGENCY_INFO.email}`} className="inline-flex min-h-6 items-center hover:text-cyan-300">
                    {AGENCY_INFO.email}
                  </a>
                  {AGENCY_INFO.secondaryEmail && (
                    <>
                      <span className="text-slate-600">/</span>
                      <a href={`mailto:${AGENCY_INFO.secondaryEmail}`} className="inline-flex min-h-6 items-center text-slate-400 hover:text-cyan-300">
                        {AGENCY_INFO.secondaryEmail}
                      </a>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+254 118746676 / +254 706 943383</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 5:00 PM (EAT)</span>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-3">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-semibold">
                <span>Follow Our Channels</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/domain_tech_hub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Domain Tech Hub on Instagram"
                  title="Instagram (@domain_tech_hub)"
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/60 hover:bg-pink-950/30 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all duration-200 group cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@domaintechhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Domain Tech Hub on TikTok"
                  title="TikTok (@domaintechhub)"
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 hover:bg-cyan-950/30 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all duration-200 group cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V10.8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-2.23z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://web.facebook.com/profile.php?id=61589542515206&_rdc=1&_rdr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Domain Tech Hub on Facebook"
                  title="Facebook"
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-blue-950/30 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-200 group cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/DomainTechhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Domain Tech Hub on X (Twitter)"
                  title="X (Twitter) (@DomainTechhub)"
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-500 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 group cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/domain-techhub-2a7596433/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Domain Tech Hub on LinkedIn"
                  title="LinkedIn (domain-techhub)"
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-sky-950/30 text-slate-400 hover:text-sky-400 flex items-center justify-center transition-all duration-200 group cursor-pointer shadow-xs hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Google's official "Add to Preferred Sources" button */}
            <div className="pt-4 space-y-3">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
                  <span>Google News Source</span>
                </div>
                <div className="min-h-[38px] flex items-center">
                  <div 
                    {...{ 'google-add-preferred-source-btn': '' }} 
                    data-theme="light" 
                    data-lang="en" 
                  />
                </div>
              </div>

              {/* Backlink & Partner Citation Engine CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsBacklinkKitOpen(true)}
                  className="w-full inline-flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-teal-950/60 hover:bg-teal-900/80 border border-teal-500/30 hover:border-teal-400/50 text-teal-300 text-xs font-medium transition-all group cursor-pointer shadow-xs text-left"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Award className="w-4 h-4 text-teal-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-white leading-tight truncate">Partner &amp; Backlink Kit</div>
                      <div className="text-[10px] text-teal-300/80 truncate">Client Footer Badges &amp; Citations</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links Column 1: Core Services */}
          <div>
            <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-4 font-semibold">
              Core Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/services/web-development" onClick={(e) => handleFooterNavigate(e, 'services', 'web-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Custom Website Development
                </a>
              </li>
              <li>
                <a href="/services/front-end-development" onClick={(e) => handleFooterNavigate(e, 'services', 'front-end-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Front-End Engineering
                </a>
              </li>
              <li>
                <a href="/services/ecommerce-development" onClick={(e) => handleFooterNavigate(e, 'services', 'ecommerce-development')} className="hover:text-cyan-300 text-left transition-colors">
                  E-Commerce & M-Pesa Stores
                </a>
              </li>
              <li>
                <a href="/services/cms-development" onClick={(e) => handleFooterNavigate(e, 'services', 'cms-development')} className="hover:text-cyan-300 text-left transition-colors">
                  CMS & WordPress Builds
                </a>
              </li>
              <li>
                <a href="/services/mobile-app-development" onClick={(e) => handleFooterNavigate(e, 'services', 'mobile-app-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="/services/website-maintenance" onClick={(e) => handleFooterNavigate(e, 'services', 'website-maintenance')} className="hover:text-cyan-300 text-left transition-colors">
                  Website Maintenance SLA
                </a>
              </li>
              <li>
                <a href="/services/pos-systems" onClick={(e) => handleFooterNavigate(e, 'services', 'pos-systems')} className="hover:text-cyan-300 text-left transition-colors">
                  POS Systems & KRA eTIMS
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Growth & Systems */}
          <div>
            <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-4 font-semibold">
              Growth & Systems
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/services/seo-services" onClick={(e) => handleFooterNavigate(e, 'services', 'seo-services')} className="hover:text-cyan-300 text-left transition-colors">
                  Search Engine Optimization (SEO)
                </a>
              </li>
              <li>
                <a href="/services/ppc-management" onClick={(e) => handleFooterNavigate(e, 'services', 'ppc-management')} className="hover:text-cyan-300 text-left transition-colors">
                  Google Ads PPC Management
                </a>
              </li>
              <li>
                <a href="/services/whatsapp-marketing" onClick={(e) => handleFooterNavigate(e, 'services', 'whatsapp-marketing')} className="hover:text-cyan-300 text-left transition-colors">
                  WhatsApp Business API Bots
                </a>
              </li>
              <li>
                <a href="/services/custom-crm-development" onClick={(e) => handleFooterNavigate(e, 'services', 'custom-crm-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Custom CRM Development
                </a>
              </li>
              <li>
                <a href="/services/ai-powered-solutions" onClick={(e) => handleFooterNavigate(e, 'services', 'ai-powered-solutions')} className="hover:text-cyan-300 text-left transition-colors">
                  AI-Powered Solutions
                </a>
              </li>
              <li>
                <a href="/services/graphic-design-branding" onClick={(e) => handleFooterNavigate(e, 'services', 'graphic-design-branding')} className="hover:text-cyan-300 text-left transition-colors">
                  Brand Identity & Graphics
                </a>
              </li>
              <li>
                <a href="/services/digital-marketing" onClick={(e) => handleFooterNavigate(e, 'services', 'digital-marketing')} className="hover:text-cyan-300 text-left transition-colors">
                  Digital Marketing Campaigns
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Quick Links */}
          <div>
            <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-4 font-semibold">
              Client Tools
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/roadmap" onClick={(e) => handleFooterNavigate(e, 'roadmap')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1 font-medium text-white">
                  <span>4–8 Week Sprint Roadmap</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="/team" onClick={(e) => handleFooterNavigate(e, 'team')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Our Engineering Team</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="/tech-stack" onClick={(e) => handleFooterNavigate(e, 'tech-stack')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Our Tech Stack</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="/tools/calculator" onClick={(e) => handleFooterNavigate(e, 'calculator')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Project Cost Calculator</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="/tools/audit" onClick={(e) => handleFooterNavigate(e, 'audit')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Free Live SEO Audit Tool</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="/tools/domains" onClick={(e) => handleFooterNavigate(e, 'domains')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Domain & Hosting Checker</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="/tools/backlinks" onClick={(e) => handleFooterNavigate(e, 'tools', 'backlinks')} className="hover:text-teal-300 text-left transition-colors flex items-center gap-1 text-teal-400 font-semibold">
                  <Link2 className="w-3 h-3 text-teal-400" />
                  <span>Backlink &amp; Citation Hub</span>
                  <ArrowUpRight className="w-3 h-3 text-teal-400" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsBacklinkKitOpen(true)}
                  className="hover:text-teal-300 text-left transition-colors flex items-center gap-1.5 text-teal-400/90 font-medium cursor-pointer"
                >
                  <Award className="w-3 h-3 text-teal-400" />
                  <span>Client Attribution Badges</span>
                </button>
              </li>
              <li>
                <a href="/portal" onClick={(e) => handleFooterNavigate(e, 'client-portal')} className="hover:text-cyan-300 text-left transition-colors">
                  Client Project Portal (Demo)
                </a>
              </li>
              <li>
                <a href="/portfolio" onClick={(e) => handleFooterNavigate(e, 'portfolio')} className="hover:text-cyan-300 text-left transition-colors">
                  Case Studies & Metrics
                </a>
              </li>
              <li>
                <a href="/insights" onClick={(e) => handleFooterNavigate(e, 'insights')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Insights & Tech Trends</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => handleFooterNavigate(e, 'faq')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Frequently Asked Questions</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Direct WhatsApp Line</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Domain Tech Hub. All rights reserved.</span>
          </div>

          {/* Social Links Row in Bottom Bar */}
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-[10px] font-mono uppercase text-slate-400 hidden sm:inline">Connect:</span>
            <a
              href="https://www.instagram.com/domain_tech_hub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram (@domain_tech_hub)"
              className="hover:text-pink-400 transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@domaintechhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok (@domaintechhub)"
              className="hover:text-cyan-300 transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V10.8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-2.23z"/>
              </svg>
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61589542515206&_rdc=1&_rdr#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="hover:text-blue-400 transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://x.com/DomainTechhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              title="X (Twitter) (@DomainTechhub)"
              className="hover:text-white transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/domain-techhub-2a7596433/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="hover:text-sky-400 transition-colors p-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              type="button"
              onClick={() => setIsBacklinkKitOpen(true)} 
              className="hover:text-teal-300 cursor-pointer text-teal-400 font-semibold transition-colors focus:outline-none flex items-center gap-1.5"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Backlink Partner Kit</span>
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button"
              onClick={() => setLegalModal('privacy')} 
              className="hover:text-cyan-300 cursor-pointer text-slate-400 transition-colors focus:outline-none"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button"
              onClick={() => setLegalModal('terms')} 
              className="hover:text-cyan-300 cursor-pointer text-slate-400 transition-colors focus:outline-none"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button 
              type="button"
              onClick={() => setLegalModal('sla')} 
              className="hover:text-cyan-300 cursor-pointer text-slate-400 transition-colors focus:outline-none"
            >
              SLA Agreement
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Compliance Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-300">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  legalModal === 'privacy' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  legalModal === 'terms' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('sla')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  legalModal === 'sla' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SLA Agreement
              </button>
            </div>

            {/* Modal Body: Privacy Policy */}
            {legalModal === 'privacy' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-cyan-400 font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider text-[11px]">Data Protection & Privacy Policy</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Protecting Client Data & Intellectual Property
                </h3>
                <p>
                  At Domain Tech Hub (Nairobi, Kenya), we operate under strict non-disclosure principles. We treat all client repositories, database structures, business metrics, and trade secrets with absolute confidentiality.
                </p>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="font-semibold text-white">Core Commitments:</div>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Zero Data Leasing:</strong> We never sell, lease, or monetize client data or end-user customer lists to third parties.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Kenya ODPC & GDPR Compliance:</strong> Data storage protocols follow the Kenya Data Protection Act 2019 and global security standards.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Mutual NDA Coverage:</strong> Standard bilateral non-disclosure agreements are executed prior to production system handoffs.</span>
                    </li>
                  </ul>
                </div>
                <p className="text-slate-400 text-[11px]">
                  For data requests or privacy compliance queries, reach our legal officer at <span className="text-cyan-300 font-mono">legal@domaintechhubs.com</span>.
                </p>
              </div>
            )}

            {/* Modal Body: Terms of Service */}
            {legalModal === 'terms' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-cyan-400 font-mono">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider text-[11px]">Engineering Terms of Service</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Transparent Milestone Sprints & IP Ownership
                </h3>
                <p>
                  Our client engagements are structured around clear sprint deliverables, verified test environments, and transparent payment milestones.
                </p>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="font-semibold text-white">Commercial Terms:</div>
                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Milestone Billing:</strong> Standard projects initiate with a 40% architecture milestone and conclude with 60% upon verified User Acceptance Testing (UAT).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Complete IP Transfer:</strong> 100% of custom source code, design files, and deployment keys transfer to the client upon final milestone settlement.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>30-Day Post-Launch Warranty:</strong> Any functional defect or edge-case bug within agreed scope is resolved at zero additional cost within 30 days of launch.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Modal Body: SLA Agreement */}
            {legalModal === 'sla' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-emerald-400 font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider text-[11px]">Service Level Agreement (SLA)</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  High-Availability Uptime & Guaranteed Response Times
                </h3>
                <p>
                  For clients on managed hosting and maintenance retainers, Domain Tech Hub guarantees rigorous operational benchmarks backed by automated telemetry.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-cyan-400 font-mono font-bold text-base">99.9% Uptime</div>
                    <div className="text-slate-300 text-[11px] mt-0.5">High-availability cloud infrastructure target with Cloudflare DDoS shielding.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-emerald-400 font-mono font-bold text-base">&lt; 20 Min Response</div>
                    <div className="text-slate-300 text-[11px] mt-0.5">Emergency triage for critical payment/checkout outages during business hours.</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="font-semibold text-white">Included Care Provisions:</div>
                  <p className="text-slate-300">
                    Weekly offsite database backups, monthly dependency security audits, automated TLS/SSL renewals, and dedicated developer hours for minor copy/feature updates.
                  </p>
                </div>
              </div>
            )}

            {/* Footer close button */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Backlink Partner Kit Modal */}
      <BacklinkPartnerKitModal
        isOpen={isBacklinkKitOpen}
        onClose={() => setIsBacklinkKitOpen(false)}
      />
    </footer>
  );
};
