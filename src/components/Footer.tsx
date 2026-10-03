import React, { useState } from 'react';
import { 
  Globe, Mail, Phone, MapPin, Clock, MessageSquare, 
  ArrowUpRight, Heart, Shield, Code, X, ShieldCheck, FileText, CheckCircle2
} from 'lucide-react';
import { AGENCY_INFO } from '../data/portfolioData';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string, subParam?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'sla' | null>(null);
  return (
    <footer className="bg-slate-950 border-t border-slate-800/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-left cursor-pointer p-0 focus:outline-none"
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
                <a href={`mailto:${AGENCY_INFO.email}`} className="hover:text-cyan-300">
                  {AGENCY_INFO.email}
                </a>
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
          </div>

          {/* Quick Links Column 1: Core Services */}
          <div>
            <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-4 font-semibold">
              Core Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('services', 'web-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Custom Website Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'front-end-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Front-End Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'ecommerce-development')} className="hover:text-cyan-300 text-left transition-colors">
                  E-Commerce & M-Pesa Stores
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'cms-development')} className="hover:text-cyan-300 text-left transition-colors">
                  CMS & WordPress Builds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'mobile-app-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Mobile App Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'website-maintenance')} className="hover:text-cyan-300 text-left transition-colors">
                  Website Maintenance SLA
                </button>
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
                <button onClick={() => onNavigate('services', 'seo-services')} className="hover:text-cyan-300 text-left transition-colors">
                  Search Engine Optimization (SEO)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'ppc-management')} className="hover:text-cyan-300 text-left transition-colors">
                  Google Ads PPC Management
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'whatsapp-marketing')} className="hover:text-cyan-300 text-left transition-colors">
                  WhatsApp Business API Bots
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'custom-crm-development')} className="hover:text-cyan-300 text-left transition-colors">
                  Custom CRM Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'ai-powered-solutions')} className="hover:text-cyan-300 text-left transition-colors">
                  AI-Powered Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'graphic-design-branding')} className="hover:text-cyan-300 text-left transition-colors">
                  Brand Identity & Graphics
                </button>
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
                <button onClick={() => onNavigate('roadmap')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1 font-medium text-white">
                  <span>4–8 Week Sprint Roadmap</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Our Engineering Team</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tech-stack')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Our Tech Stack</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Project Cost Calculator</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('audit')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Free Live SEO Audit Tool</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('domains')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Domain & Hosting Checker</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('client-portal')} className="hover:text-cyan-300 text-left transition-colors">
                  Client Project Portal (Demo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-cyan-300 text-left transition-colors">
                  Case Studies & Metrics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Insights & Tech Trends</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-cyan-300 text-left transition-colors flex items-center gap-1">
                  <span>Frequently Asked Questions</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
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
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span>© {new Date().getFullYear()} Domain Tech Hub. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="text-slate-400 font-mono text-[10px]">Built with care by human engineers in Nairobi</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
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
              <X className="w-5 h-5" />
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
                  For data requests or privacy compliance queries, reach our legal officer at <span className="text-cyan-300 font-mono">legal@domaintechhub.com</span>.
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
    </footer>
  );
};
