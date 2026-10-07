import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, Globe, Layout, ShoppingCart, Search, Database, 
  Cpu, MessageSquare, Calculator, Gauge, Server, FolderGit2, 
  HelpCircle, ArrowRight, ArrowUpRight, Menu, X, BookOpen,
  PhoneCall, ShieldCheck, Languages, Sun, Moon, SlidersHorizontal,
  Check, Layers, Award, Users, Rocket
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { AGENCY_INFO } from '../data/portfolioData';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (sectionId: string, subParam?: string) => void;
  activeSection: string;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dropdown states
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [langToast, setLangToast] = useState<string | null>(null);

  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage, t, languageOptions } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const preferencesRef = useRef<HTMLDivElement>(null);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    const opt = languageOptions.find(o => o.code === code);
    const msg = opt ? `${opt.name} (${opt.code})` : code;
    setLangToast(msg);
    setTimeout(() => setLangToast(null), 2500);
  };

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moreTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleServicesLeave = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    // 500ms hold grace period gives user plenty of time to move cursor without dropdown disappearing
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 500);
  };

  const handleToolsEnter = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
      toolsTimeoutRef.current = null;
    }
    setToolsDropdownOpen(true);
  };

  const handleToolsLeave = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
    }
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 500);
  };

  const handleMoreEnter = () => {
    if (moreTimeoutRef.current) {
      clearTimeout(moreTimeoutRef.current);
      moreTimeoutRef.current = null;
    }
    setMoreDropdownOpen(true);
  };

  const handleMoreLeave = () => {
    if (moreTimeoutRef.current) {
      clearTimeout(moreTimeoutRef.current);
    }
    moreTimeoutRef.current = setTimeout(() => {
      setMoreDropdownOpen(false);
    }, 450);
  };

  // Close dropdowns on outside click, and listen for ⌘K
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesDropdownOpen(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(target)) {
        setToolsDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(target)) {
        setMoreDropdownOpen(false);
      }
      if (preferencesRef.current && !preferencesRef.current.contains(target)) {
        setPreferencesOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch?.();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenSearch]);

  const handleNavClick = (id: string, subParam?: string) => {
    if (id === 'blog') {
      onNavigate('more', 'blog');
    } else {
      onNavigate(id, subParam);
    }
    setServicesDropdownOpen(false);
    setToolsDropdownOpen(false);
    setMoreDropdownOpen(false);
    setPreferencesOpen(false);
    setMobileMenuOpen(false);
  };

  const currentPath = window.location.pathname.toLowerCase();
  const isHomeActive = activeSection === 'home' || activeSection === 'hero';
  const isAboutActive = activeSection === 'about';
  const isServicesActive = activeSection === 'services';
  const isPortfolioActive = activeSection === 'portfolio';
  const isToolsActive = activeSection === 'tools' || activeSection === 'calculator' || activeSection === 'audit' || activeSection === 'domains';
  const isTechStackActive = activeSection === 'tech-stack' || (activeSection === 'more' && currentPath.includes('tech-stack'));
  const isInsightsActive = activeSection === 'insights';
  const isPortalActive = activeSection === 'portal' || activeSection === 'client-portal';
  const isFaqActive = activeSection === 'faq';
  const isContactActive = activeSection === 'contact';
  const isRoadmapActive = activeSection === 'roadmap' || activeSection === 'process' || activeSection === 'sprint-roadmap' || (activeSection === 'more' && currentPath.includes('roadmap'));
  const isTeamActive = activeSection === 'team' || activeSection === 'our-team' || (activeSection === 'more' && currentPath.includes('team'));
  const isBlogActive = (activeSection === 'more' && currentPath.includes('blog')) || activeSection === 'insights';
  const isMoreActive = isTechStackActive || isInsightsActive || isPortalActive || isFaqActive || isRoadmapActive || isTeamActive || isBlogActive || activeSection === 'more';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-slate-950/85 backdrop-blur-xl border-b border-stone-200/90 dark:border-slate-800/80 shadow-md shadow-stone-200/20 dark:shadow-black/40 py-2' 
            : 'bg-transparent py-2.5 sm:py-3.5'
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-7">
          <div className="flex items-center justify-between gap-2.5 lg:gap-4">
            
            {/* 1. Official Brand Logo & Name (Click to return Home) */}
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded-2xl p-1 shrink-0 cursor-pointer transition-transform active:scale-95"
              title="Domain Tech Hub - Innovate. Connect. Succeed."
            >
              <Logo variant="horizontal" size="md" />
            </button>

            {/* 2. Desktop Centered Navigation Pill with Liquid Glass */}
            <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-full liquid-glass-nav-container backdrop-blur-xl shadow-lg shrink-0">
              
              {/* Services Nav Item (Click or Hover, Holds open to pick a service) */}
              <div 
                className="relative" 
                ref={servicesDropdownRef}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                    setServicesDropdownOpen((prev) => !prev);
                    setToolsDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer liquid-glass-btn ${
                    isServicesActive || servicesDropdownOpen
                      ? 'active text-teal-800 dark:text-teal-300' 
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                  title="Services & Engineering Capabilities (Click or hover to browse)"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
                </button>

                {/* Services Mega Dropdown with Continuous Bridge & Safe Hover Area */}
                {servicesDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <div className="w-[480px] p-3.5 liquid-glass-card rounded-3xl shadow-2xl">
                      <div className="text-[10px] font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider px-3 pt-1 pb-2 flex items-center justify-between">
                        <span>Capabilities & Engineering Services</span>
                        <span className="text-[9px] text-slate-400 font-normal">Click any service to view</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => handleNavClick('services', 'web-development')}
                          className="text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-2.5 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                              Web Development
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                              React, Next.js & enterprise sites
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('services', 'ecommerce-development')}
                          className="text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-2.5 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <ShoppingCart className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                              E-Commerce & M-Pesa
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                              Daraja STK Push & online stores
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('services', 'seo-services')}
                          className="text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-2.5 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <Search className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                              SEO & Lead Growth
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                              Google Ads & Page 1 ranking
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('services', 'custom-crm-development')}
                          className="text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-2.5 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-blue-950/60 border border-purple-200 dark:border-blue-800 text-purple-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <Database className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-blue-300 transition-colors">
                              Custom CRM & Portals
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                              Replace manual spreadsheets
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavClick('tech-stack')}
                          className="text-left p-2.5 rounded-2xl hover:bg-stone-100 dark:hover:bg-slate-900 transition-colors group flex items-start gap-2.5 col-span-2 bg-stone-50 dark:bg-slate-900/50 border border-stone-200 dark:border-slate-800/70 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-violet-950/60 border border-blue-200 dark:border-violet-800 text-blue-600 dark:text-violet-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-violet-300 transition-colors">
                                {t('nav.techStack')}
                              </span>
                              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400">React · Node · Python · AWS</span>
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                              Explore our production frameworks, APIs, and DevOps standards
                            </div>
                          </div>
                        </button>
                      </div>

                      <div className="mt-2 pt-2 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between px-3 text-[11px] font-mono">
                        <span className="text-slate-500">15+ Turnkey Services</span>
                        <button
                          onClick={() => handleNavClick('services')}
                          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <span>{t('nav.exploreAll')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. About Us Link */}
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer liquid-glass-btn whitespace-nowrap ${
                  isAboutActive 
                    ? 'active text-teal-800 dark:text-teal-300' 
                    : 'text-slate-700 dark:text-slate-200'
                }`}
                title="About Domain Tech Hub · Nairobi Headquarters, Mission & Track Record"
              >
                {t('nav.about')}
              </button>

              {/* 3. Client Tools Nav Item (Click or Hover, Holds open to pick a tool) */}
              <div 
                className="relative" 
                ref={toolsDropdownRef}
                onMouseEnter={handleToolsEnter}
                onMouseLeave={handleToolsLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
                    setToolsDropdownOpen((prev) => !prev);
                    setServicesDropdownOpen(false);
                    setMoreDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer liquid-glass-btn ${
                    isToolsActive || toolsDropdownOpen
                      ? 'active text-teal-800 dark:text-teal-300' 
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                  title="Interactive Client Tools & Calculators (Click or hover to browse)"
                >
                  <span>{t('nav.tools')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
                </button>

                {toolsDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={handleToolsEnter}
                    onMouseLeave={handleToolsLeave}
                  >
                    <div className="w-[320px] p-2.5 liquid-glass-card rounded-3xl shadow-2xl space-y-1">
                      <div className="text-[10px] font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider px-3 pt-1 pb-1">
                        Free Instant Utilities
                      </div>

                      <button
                        onClick={() => handleNavClick('calculator')}
                        className="w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-cyan-950/60 border border-teal-200 dark:border-cyan-800 text-teal-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                            <span>{t('nav.calculator')}</span>
                            <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">USD / KES</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            Instant scope configuration & quotation
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('audit')}
                        className="w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Gauge className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                            <span>{t('nav.audit')}</span>
                            <span className="text-[9px] font-mono text-teal-700 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/80 px-1 py-0.2 rounded border border-teal-200">FREE</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            Core Web Vitals & speed diagnostic
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('domains')}
                        className="w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                            {t('nav.domains')}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            .co.ke domain lookup + NVMe SSD hosting
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Projects / Case Studies Link */}
              <button
                onClick={() => handleNavClick('portfolio')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer liquid-glass-btn whitespace-nowrap ${
                  isPortfolioActive 
                    ? 'active text-teal-800 dark:text-teal-300' 
                    : 'text-slate-700 dark:text-slate-200'
                }`}
                title="Client Case Studies, Projects & Verified Results"
              >
                {t('nav.projects')}
              </button>

              {/* 5. More Dropdown Menu (Contains Tech Stack, Insights, Portal, FAQ, etc.) */}
              <div 
                className="relative" 
                ref={moreDropdownRef}
                onMouseEnter={handleMoreEnter}
                onMouseLeave={handleMoreLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
                    handleNavClick('more');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer liquid-glass-btn whitespace-nowrap ${
                    isMoreActive || moreDropdownOpen
                      ? 'active text-teal-800 dark:text-teal-300' 
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                  title="More Solutions, Sprints & Engineering Operations (Click to view More page)"
                >
                  <span>{t('nav.more')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
                </button>

                {moreDropdownOpen && (
                  <div 
                    className="absolute top-full right-0 xl:left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={handleMoreEnter}
                    onMouseLeave={handleMoreLeave}
                  >
                    <div className="w-[330px] p-2.5 liquid-glass-card rounded-3xl shadow-2xl space-y-1">
                      <div className="text-[10px] font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider px-3 pt-1 pb-1">
                        More Agency Solutions
                      </div>

                      {/* Tech Stack */}
                      <button
                        onClick={() => handleNavClick('tech-stack')}
                        className={`w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer ${
                          isTechStackActive ? 'bg-stone-100 dark:bg-slate-800' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                            {t('nav.techStack')}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            React, Next.js, Node, Python & Cloud
                          </div>
                        </div>
                      </button>

                      {/* Engineering Blog & Articles */}
                      <button
                        onClick={() => handleNavClick('more', 'blog')}
                        className={`w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer ${
                          isBlogActive ? 'bg-stone-100 dark:bg-slate-800' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                            <span>Blog &amp; Technical Articles</span>
                            <span className="text-[9px] font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-1.5 py-0.2 rounded border border-purple-200 font-semibold">ARTICLES</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            Technical guides, M-Pesa playbooks &amp; web benchmarks
                          </div>
                        </div>
                      </button>

                      {/* Client Project Portal */}
                      <button
                        onClick={() => handleNavClick('client-portal')}
                        className={`w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer ${
                          isPortalActive ? 'bg-stone-100 dark:bg-slate-800' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                            <span>{t('nav.clientPortal')}</span>
                            <span className="text-[9px] font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/80 px-1 py-0.2 rounded border border-cyan-200">DEMO</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            Live milestone tracking, deliverables & staging
                          </div>
                        </div>
                      </button>

                      {/* FAQ */}
                      <button
                        onClick={() => handleNavClick('faq')}
                        className={`w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer ${
                          isFaqActive ? 'bg-stone-100 dark:bg-slate-800' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                            {t('nav.faq')}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            Common client questions, pricing & delivery
                          </div>
                        </div>
                      </button>

                      {/* Project Roadmap */}
                      <button
                        onClick={() => handleNavClick('more', 'roadmap')}
                        className={`w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer ${
                          isRoadmapActive ? 'bg-stone-100 dark:bg-slate-800' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Rocket className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors flex items-center gap-1.5">
                            <span>Project Roadmap</span>
                            <span className="text-[9px] font-mono text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-1 py-0.2 rounded border border-teal-200">4–8 WKS</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            Interactive 5-stage sprint delivery timeline
                          </div>
                        </div>
                      </button>

                      {/* Our Engineering Team */}
                      <button
                        onClick={() => handleNavClick('more', 'team')}
                        className={`w-full text-left p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-900 transition-colors group flex items-start gap-3 cursor-pointer ${
                          isTeamActive ? 'bg-stone-100 dark:bg-slate-800' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                            Our Engineering Team
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            Meet our senior architects, designers & fintech leads
                          </div>
                        </div>
                      </button>

                      {/* Direct WhatsApp Line */}
                      <div className="pt-2 border-t border-stone-200/80 dark:border-slate-800/60 flex items-center justify-between px-2.5 py-1 text-[11px]">
                        <a
                          href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Desk</span>
                        </a>
                        <a
                          href="tel:+254118746676"
                          className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-teal-600 font-mono"
                        >
                          <PhoneCall className="w-3 h-3 text-teal-600" />
                          <span>+254 118 746676</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Contact Us Nav Link in Pill */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer liquid-glass-btn whitespace-nowrap ${
                  isContactActive 
                    ? 'active text-teal-800 dark:text-teal-300' 
                    : 'text-slate-700 dark:text-slate-200'
                }`}
                title="Contact Domain Tech Hub & Book Free Strategy Call"
              >
                {t('nav.contact')}
              </button>
            </nav>

            {/* 3. Header Action: Unified Burger Menu Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-100/90 dark:bg-slate-900/90 hover:bg-stone-200 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-all cursor-pointer shadow-xs active:scale-95 group focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Toggle navigation menu and utility drawer"
                aria-expanded={mobileMenuOpen}
                title="Open menu, tools, search & preferences"
              >
                {mobileMenuOpen ? (
                  <>
                    <X className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:rotate-90 transition-transform" />
                    <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">{t('menu.close')}</span>
                  </>
                ) : (
                  <>
                    <Menu className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">{t('menu.menu')}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* 4. Unified Burger Menu Slide-Down Drawer (Desktop, Tablet & Mobile) */}
        {mobileMenuOpen && (
          <div className="liquid-glass-card border-b border-stone-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 pt-4 pb-8 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-4xl mx-auto space-y-4">
              
              {/* Quick Search */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch?.();
                }}
                className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-stone-200 dark:border-slate-800 text-slate-500 text-xs text-left hover:border-teal-400 dark:hover:border-teal-600 transition-colors cursor-pointer group"
              >
                <Search className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                <span className="text-slate-600 dark:text-slate-300">{t('menu.searchPlaceholder')}</span>
                <kbd className="ml-auto text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-slate-800 border rounded shadow-xs">⌘K</kbd>
              </button>

              {/* Quick Action Contact Button */}
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs text-center shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('menu.contactCta')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Primary 5 Important Menu Sections (Shown on mobile & tablet where centered nav is hidden) */}
              <div className="xl:hidden space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 pt-1">
                  {t('menu.mainNav')}
                </div>
                <div className="bg-stone-50/80 dark:bg-slate-900/40 backdrop-blur-md border border-stone-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-stone-200/80 dark:divide-slate-800/60">
                  {[
                    { id: 'services', label: t('nav.services'), subtitle: 'Web Development, E-Commerce, SEO & Apps', icon: Globe, active: isServicesActive },
                    { id: 'about', label: t('nav.about'), subtitle: 'Nairobi Office, Mission & Track Record', icon: Award, active: isAboutActive },
                    { id: 'tools', label: t('nav.tools'), subtitle: 'Cost Calculator, SEO Audit & Domain Lookup', icon: Calculator, active: isToolsActive },
                    { id: 'portfolio', label: t('nav.projects'), subtitle: 'Client Case Studies & Verified Results', icon: FolderGit2, active: isPortfolioActive },
                    { id: 'contact', label: t('nav.contact'), subtitle: 'Direct Phone, Email & Nairobi Office', icon: PhoneCall, active: isContactActive }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left p-3.5 text-xs flex items-center justify-between transition-all cursor-pointer ${
                          item.active 
                            ? 'bg-teal-50 dark:bg-cyan-950/60 text-teal-800 dark:text-cyan-300 font-bold border-l-4 border-teal-500' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            item.active 
                              ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30' 
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{item.label}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{item.subtitle}</div>
                          </div>
                        </div>
                        <ArrowUpRight className={`w-4 h-4 ${item.active ? 'text-teal-600 dark:text-cyan-400 font-bold' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Solutions & Resources Grid */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 pt-1">
                  {t('menu.solutions')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'roadmap', label: 'Project Roadmap', subtitle: '4–8 Week Delivery Sprint Cycle', icon: Rocket, active: isRoadmapActive },
                    { id: 'team', label: 'Our Engineering Team', subtitle: 'Senior Architects & Strategists', icon: Users, active: isTeamActive },
                    { id: 'tech-stack', label: t('nav.techStack'), subtitle: 'React, Node, Python & Cloud Architecture', icon: Cpu, active: isTechStackActive },
                    { id: 'blog', label: 'Engineering Blog & Articles', subtitle: 'Technical Guides & M-Pesa Playbooks', icon: BookOpen, active: isBlogActive },
                    { id: 'client-portal', label: t('nav.clientPortal'), subtitle: 'Client Project Dashboard Demo', icon: ShieldCheck, active: isPortalActive },
                    { id: 'faq', label: t('nav.faq'), subtitle: 'Frequently Asked Questions & SLAs', icon: HelpCircle, active: isFaqActive }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          item.active 
                            ? 'bg-teal-50 dark:bg-cyan-950/60 border-teal-300 dark:border-teal-700 text-teal-800 dark:text-cyan-300 font-bold' 
                            : 'bg-stone-50/80 dark:bg-slate-900/50 border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">{item.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.subtitle}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferences & Utilities: Theme, Currency, Language */}
              <div className="p-4 rounded-2xl bg-stone-50/90 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {t('menu.preferences')}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Language */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Languages className="w-3 h-3 text-teal-600" />
                        <span>{t('menu.language')}</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400">
                        {language}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                      {languageOptions.map((opt) => {
                        const isSelected = language === opt.code;
                        return (
                          <button
                            type="button"
                            key={opt.code}
                            onClick={() => handleSelectLanguage(opt.code)}
                            className={`py-2 px-1.5 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                              isSelected 
                                ? 'bg-teal-700 dark:bg-teal-600 text-white font-semibold shadow-xs border border-teal-800 dark:border-teal-500' 
                                : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-slate-700'
                            }`}
                            aria-pressed={isSelected}
                            title={`Select ${opt.name}`}
                          >
                            <span className="text-xs font-bold tracking-wider leading-none">{opt.code}</span>
                            <span className={`text-[10px] leading-tight ${isSelected ? 'text-teal-100 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                              {opt.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <span className="font-bold text-teal-600">$</span>
                      <span>{t('menu.currency')}</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1 font-mono text-xs">
                      {(['USD', 'KES'] as const).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`py-1.5 rounded-xl text-center transition-colors cursor-pointer ${
                            currency === curr 
                              ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800' 
                              : 'text-slate-600 bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>{t('menu.theme')}</span>
                    </span>
                    <div className="grid grid-cols-2 gap-1 font-mono text-xs">
                      <button
                        onClick={() => theme !== 'light' && toggleTheme()}
                        className={`py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                          theme === 'light' 
                            ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' 
                            : 'text-slate-600 bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800'
                        }`}
                      >
                        <Sun className="w-3 h-3 text-amber-500" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => theme !== 'dark' && toggleTheme()}
                        className={`py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                          theme === 'dark' 
                            ? 'bg-teal-950 text-teal-300 font-bold border border-teal-800' 
                            : 'text-slate-600 bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800'
                        }`}
                      >
                        <Moon className="w-3 h-3 text-slate-400" />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=Hello%20Domain%20Tech%20Hub,%20I'm%20inquiring%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/80 dark:hover:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp Direct Desk ({AGENCY_INFO.whatsapp})</span>
                </a>

                <a
                  href="tel:+254118746676"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Call Direct: +254 118 746676</span>
                </a>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Floating Language Change Confirmation Toast */}
      {langToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-[70] animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-none">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white border border-teal-500/50 shadow-2xl backdrop-blur-xl text-xs font-mono">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
            <span className="font-semibold text-teal-300">{langToast}</span>
          </div>
        </div>
      )}
    </>
  );
};
