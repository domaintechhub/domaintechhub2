/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { PageHeader } from './components/PageHeader';
import { Hero } from './components/Hero';
import type { SprintTimeline } from './components/ProjectRoadmap';
import type { MoreTab } from './components/MorePage';
import type { ToolTab } from './components/ToolsPage';
import { Footer } from './components/Footer';
import { QuickContactFloating } from './components/QuickContactFloating';
import { applyPageSeo } from './utils/seo';
import { SERVICES_LIST } from './data/servicesData';
import { 
  ArrowRight, ShieldCheck, 
  CheckCircle, MessageSquare, PhoneCall, Code, Layers 
} from 'lucide-react';
import { AGENCY_INFO } from './data/portfolioData';
import { discardPersistedLeadData } from './utils/leadDispatch';
import { getCanonicalLocation, getCurrentAppRoute, getPathForRoute, parseAppRoute } from './utils/routing';

const MorePage = lazy(() => import('./components/MorePage').then(({ MorePage }) => ({ default: MorePage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })));
const ToolsPage = lazy(() => import('./components/ToolsPage').then(({ ToolsPage }) => ({ default: ToolsPage })));
const ServiceDetailPage = lazy(() => import('./components/ServiceDetailPage').then(({ ServiceDetailPage }) => ({ default: ServiceDetailPage })));
const HomeSections = lazy(() => import('./components/HomeSections').then(({ HomeSections }) => ({ default: HomeSections })));
const ServicesExplorer = lazy(() => import('./components/ServicesExplorer').then(({ ServicesExplorer }) => ({ default: ServicesExplorer })));
const TechStackSection = lazy(() => import('./components/TechStackSection').then(({ TechStackSection }) => ({ default: TechStackSection })));
const Portfolio = lazy(() => import('./components/Portfolio').then(({ Portfolio }) => ({ default: Portfolio })));
const Testimonials = lazy(() => import('./components/Testimonials').then(({ Testimonials }) => ({ default: Testimonials })));
const InsightsSection = lazy(() => import('./components/InsightsSection').then(({ InsightsSection }) => ({ default: InsightsSection })));
const ClientPortalDemo = lazy(() => import('./components/ClientPortalDemo').then(({ ClientPortalDemo }) => ({ default: ClientPortalDemo })));
const FaqSection = lazy(() => import('./components/FaqSection').then(({ FaqSection }) => ({ default: FaqSection })));
const BookingSection = lazy(() => import('./components/BookingSection').then(({ BookingSection }) => ({ default: BookingSection })));
const GlobalSearchModal = lazy(() => import('./components/GlobalSearchModal').then(({ GlobalSearchModal }) => ({ default: GlobalSearchModal })));
const LeadInboxModal = lazy(() => import('./components/LeadInboxModal').then(({ LeadInboxModal }) => ({ default: LeadInboxModal })));

export type PageRoute = 'home' | 'services' | 'portfolio' | 'tools' | 'insights' | 'portal' | 'faq' | 'contact' | 'roadmap' | 'team' | 'more' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeToolTab, setActiveToolTab] = useState<ToolTab>('calculator');
  const [activeMoreTab, setActiveMoreTab] = useState<MoreTab>('roadmap');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLeadInboxOpen, setIsLeadInboxOpen] = useState(false);
  const [calculatorServiceId, setCalculatorServiceId] = useState<string>('web-development');
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  useEffect(() => {
    discardPersistedLeadData();
  }, []);

  // Sync clean pathname routes, while canonicalizing links shared using the legacy hash URLs.
  useEffect(() => {
    const syncRoute = () => {
      setIsPageTransitioning(true);
      const route = getCurrentAppRoute();
      const page = route.page as PageRoute;
      const subTab = route.subTab;
      setCurrentPage(page);
      if (page === 'tools') {
        if (subTab) setActiveToolTab(subTab as ToolTab);
      } else if (page === 'services') {
        setActiveServiceId(subTab || null);
      } else if (page === 'more') {
        setActiveMoreTab((subTab as MoreTab) || 'roadmap');
      } else {
        setActiveServiceId(null);
      }

      const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      if (rawHash === 'dth-owner-vault' || rawHash === 'owner-portal') {
        setIsLeadInboxOpen(true);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      const canonicalLocation = getCanonicalLocation();
      if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== canonicalLocation) {
        window.history.replaceState(null, '', canonicalLocation);
      }

      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 200);
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  // Dynamically update document title, meta descriptions, and Schema.org JSON-LD for SEO
  useEffect(() => {
    applyPageSeo(
      currentPage, 
      currentPage === 'services' 
        ? (activeServiceId || undefined) 
        : currentPage === 'more' 
        ? activeMoreTab 
        : activeToolTab
    );
  }, [currentPage, activeToolTab, activeMoreTab, activeServiceId]);

  const navigateTo = (target: string, subParam?: string) => {
    setIsPageTransitioning(true);
    let targetPage: PageRoute = 'home';
    let targetSub: string | undefined = subParam;

    if (target === 'hero' || target === 'home') {
      targetPage = 'home';
      targetSub = undefined;
    } else if (target === 'about' || target === 'about-us') {
      targetPage = 'about';
      targetSub = undefined;
    } else if (target === 'team' || target === 'our-team') {
      targetPage = 'more';
      targetSub = 'team';
    } else if (target === 'roadmap' || target === 'process' || target === 'sprint-roadmap') {
      targetPage = 'more';
      targetSub = 'roadmap';
    } else if (target === 'more') {
      targetPage = 'more';
      targetSub = subParam || activeMoreTab || 'roadmap';
    } else if (target === 'dth-owner-vault') {
      setIsLeadInboxOpen(true);
      return;
    } else if (target === 'tech-stack') {
      targetPage = 'more';
      targetSub = 'tech-stack';
    } else if (target === 'services') {
      targetPage = 'services';
    } else if (target === 'portfolio') {
      targetPage = 'portfolio';
      targetSub = undefined;
    } else if (target === 'tools') {
      targetPage = 'tools';
      if (!targetSub) targetSub = activeToolTab;
    } else if (target === 'calculator') {
      targetPage = 'tools';
      targetSub = 'calculator';
    } else if (target === 'audit') {
      targetPage = 'tools';
      targetSub = 'audit';
    } else if (target === 'domains') {
      targetPage = 'tools';
      targetSub = 'domains';
    } else if (target === 'blog' || target === 'articles') {
      targetPage = 'more';
      targetSub = 'blog';
    } else if (target === 'insights') {
      targetPage = 'insights';
      targetSub = undefined;
    } else if (target === 'client-portal' || target === 'portal') {
      targetPage = 'portal';
      targetSub = undefined;
    } else if (target === 'faq') {
      targetPage = 'faq';
      targetSub = undefined;
    } else if (target === 'contact' || target === 'booking') {
      targetPage = 'contact';
      targetSub = undefined;
    }

    setCurrentPage(targetPage);
    if (targetPage === 'tools' && targetSub) {
      setActiveToolTab(targetSub as ToolTab);
    } else if (targetPage === 'services') {
      setActiveServiceId(targetSub || null);
    } else if (targetPage === 'more') {
      setActiveMoreTab((targetSub as MoreTab) || 'roadmap');
    } else {
      setActiveServiceId(null);
    }

    const newPath = getPathForRoute(targetPage, targetSub);
    if (`${window.location.pathname}${window.location.search}` !== newPath) {
      window.history.pushState(null, '', newPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsPageTransitioning(false);
    }, 200);
  };

  const navigateToInternalPath = (url: string) => {
    const destination = new URL(url, window.location.origin);
    const legacyPath = destination.hash.startsWith('#/')
      ? destination.hash.slice(1).split('?')[0]
      : destination.pathname;
    const route = parseAppRoute(legacyPath);
    navigateTo(route.page, route.subTab);
  };

  const handleSelectForQuote = (serviceId: string) => {
    setCalculatorServiceId(serviceId);
    setActiveToolTab('calculator');
    navigateTo('calculator');
  };

  const handleBookService = (serviceName: string) => {
    setPrefilledService(serviceName);
    setPrefilledNotes(`I am interested in scheduling a strategy session for ${serviceName}.`);
    navigateTo('contact');
  };

  const handleFixAuditWithAgency = (domain: string, issueCount: number) => {
    setPrefilledService('Technical SEO & Website Optimization');
    setPrefilledNotes(`I ran an audit for ${domain} on your scanner and found ${issueCount} issues. I'd like Domain Tech Hub to optimize our site speed, Core Web Vitals, and SEO.`);
    navigateTo('contact');
  };

  const handleSelectDomainForSetup = (domainName: string, ext: string) => {
    setPrefilledService('Domain Registration & Cloud Hosting');
    setPrefilledNotes(`I want to register/host the domain: ${domainName}${ext} with Domain Tech Hub.`);
    navigateTo('contact');
  };

  const handleBookSimilarProject = (projectTitle: string) => {
    setPrefilledService('Custom Web/E-Commerce Architecture');
    setPrefilledNotes(`I saw your case study on "${projectTitle}" and want a similar solution with high performance and conversions.`);
    navigateTo('contact');
  };

  const handleSelectTechForProject = (techName: string) => {
    setPrefilledService(`Custom Engineering with ${techName}`);
    setPrefilledNotes(`I want our project engineered using ${techName} alongside Domain Tech Hub's production architecture.`);
    navigateTo('contact');
  };

  const handleProceedToBooking = (quoteSummary: string, estimatedTotal: string) => {
    setPrefilledService('Custom Project Quote');
    setPrefilledNotes(`Quote Details:\n${quoteSummary}\n\nEstimated Investment: ${estimatedTotal}`);
    navigateTo('contact');
  };

  const handleScheduleFromInsight = (topic: string) => {
    setPrefilledService(`Technical Advisory: ${topic}`);
    setPrefilledNotes(`I read your engineering insight on "${topic}" and want Domain Tech Hub to review our architecture.`);
    navigateTo('contact');
  };

  const handleScheduleWithTeamMember = (memberName: string, role: string) => {
    setPrefilledService(`Technical Consultation: ${memberName} (${role})`);
    setPrefilledNotes(`I would like to schedule a technical discovery session with ${memberName} (${role}) to discuss our software architecture.`);
    navigateTo('contact');
  };

  const handleStartSprint = (timeline: SprintTimeline, stageId?: string) => {
    setPrefilledService(`4-8 Week Sprint Discovery (${timeline})`);
    setPrefilledNotes(`I want to schedule a technical kickoff session for a ${timeline} sprint cycle (focusing on ${stageId || 'discovery'} stage). Please share available times.`);
    navigateTo('contact');
  };

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-[#faf8f5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-teal-500/20 selection:text-teal-800">

          {/* Top Route Transition Progress Bar */}
          {isPageTransitioning && (
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-stone-200/50 dark:bg-slate-800/50 overflow-hidden pointer-events-none">
              <div className="h-full bg-gradient-to-r from-lime-400 via-teal-400 to-cyan-400 animate-dth-progress" />
            </div>
          )}
          
          {/* Navigation Bar with Search Trigger */}
          <Navbar 
            onNavigate={navigateTo} 
            activeSection={currentPage} 
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Main Content Page Container */}
          <Suspense fallback={null}>
          <main className="flex-1">

            {/* 1. DEDICATED PAGE: HOME / LANDING OVERVIEW */}
            {currentPage === 'home' && (
              <div className="animate-in fade-in duration-200">
                <Hero 
                  onNavigate={navigateTo} 
                  onSelectCalculatorService={setCalculatorServiceId}
                />
                <Suspense fallback={null}>
                  <HomeSections
                    calculatorServiceId={calculatorServiceId}
                    prefilledService={prefilledService}
                    prefilledNotes={prefilledNotes}
                    onNavigate={navigateTo}
                    onSelectForQuote={handleSelectForQuote}
                    onBookService={handleBookService}
                    onSelectTechForProject={handleSelectTechForProject}
                    onProceedToBooking={handleProceedToBooking}
                    onFixAuditWithAgency={handleFixAuditWithAgency}
                    onSelectDomainForSetup={handleSelectDomainForSetup}
                    onBookSimilarProject={handleBookSimilarProject}
                    onScheduleConsultation={handleScheduleFromInsight}
                    onNavigatePath={navigateToInternalPath}
                  />
                </Suspense>
              </div>
            )}

            {/* 2. DEDICATED PAGE: SERVICES & ENGINEERING SOLUTIONS */}
            {currentPage === 'services' && (
              <div className="animate-in fade-in duration-200">
                {activeServiceId && SERVICES_LIST.some(s => s.id === activeServiceId) ? (
                  <ServiceDetailPage
                    service={SERVICES_LIST.find(s => s.id === activeServiceId)!}
                    onSelectService={(id) => navigateTo('services', id)}
                    onBackToCatalog={() => navigateTo('services')}
                    onBookService={(name, details) => {
                      setPrefilledService(name);
                      if (details) setPrefilledNotes(details);
                      navigateTo('contact');
                    }}
                    onSelectForQuote={handleSelectForQuote}
                    onNavigateToCaseStudy={(csId) => {
                      navigateTo('portfolio');
                    }}
                  />
                ) : (
                  <>
                    <PageHeader
                      badge="Engineering Capabilities & Turnkey Solutions"
                      badgeIcon={<Layers className="w-3.5 h-3.5 text-teal-500" />}
                      title="Enterprise Web, Mobile & E-Commerce Engineering"
                      description="We architect bespoke digital platforms designed for regional and global scale: headless e-commerce, Safaricom Daraja 3.0 M-Pesa STK Push, high-conversion SEO systems, and mission-critical CRMs."
                      currentBreadcrumb="Services & Solutions"
                      onNavigateHome={() => navigateTo('home')}
                      actionButton={{
                        label: "Calculate Project Scope",
                        onClick: () => navigateTo('tools')
                      }}
                    />

                    <div className="py-6">
                      <ServicesExplorer 
                        onSelectForQuote={handleSelectForQuote}
                        onBookService={handleBookService}
                        onOpenServicePage={(id) => navigateTo('services', id)}
                      />

                      <TechStackSection 
                        onSelectTechForProject={handleSelectTechForProject}
                      />
                    </div>

                    {/* Consultation callout banner */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="space-y-2 text-center md:text-left">
                          <div className="text-xs font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider font-semibold">
                            Custom Enterprise Requirements
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Need a specialized architecture not listed here?
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-stone-300 max-w-xl leading-relaxed">
                            Our senior engineers in Nairobi build custom backend APIs, data pipelines, and fintech integrations according to your exact product requirements.
                          </p>
                        </div>

                        <button
                          onClick={() => navigateTo('contact')}
                          className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-600/25 transition-all whitespace-nowrap"
                        >
                          Book Technical Discovery Call
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 3. DEDICATED PAGE: PORTFOLIO & CASE STUDIES */}
            {currentPage === 'portfolio' && (
              <div className="animate-in fade-in duration-200">
                <PageHeader
                  badge="Verified Client Results & Production ROI"
                  badgeIcon={<CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                  title="Production Case Studies & Client Work"
                  description="Explore how Domain Tech Hub deployed high-performance web systems, modernized legacy platforms, and processed over KSh 280M+ in mobile money transactions across Kenya and international markets."
                  currentBreadcrumb="Case Studies"
                  onNavigateHome={() => navigateTo('home')}
                  actionButton={{
                    label: "Build a Similar System",
                    onClick: () => navigateTo('contact')
                  }}
                />

                <div className="py-6">
                  <Portfolio 
                    onBookSimilarProject={handleBookSimilarProject}
                  />

                  <Testimonials />
                </div>

                {/* Consultation callout banner */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                  <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Ready to achieve similar revenue scale?
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-stone-300 leading-relaxed">
                        Let's analyze your current digital funnel and provide an actionable technical roadmap.
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('contact')}
                      className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
                    >
                      Schedule Discovery Session
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. DEDICATED PAGE: INTERACTIVE TOOLS SUITE */}
            {currentPage === 'tools' && (
              <div className="animate-in fade-in duration-200">
                <ToolsPage 
                  initialTab={activeToolTab}
                  onNavigateHome={() => navigateTo('home')}
                  onProceedToBooking={handleProceedToBooking}
                  onFixAuditWithAgency={handleFixAuditWithAgency}
                  onSelectDomainForSetup={handleSelectDomainForSetup}
                  calculatorServiceId={calculatorServiceId}
                  onTabChange={(tab) => {
                    navigateTo('tools', tab);
                  }}
                />
              </div>
            )}

            {/* 5. DEDICATED PAGE: INSIGHTS & ENGINEERING TRENDS */}
            {currentPage === 'insights' && (
              <div className="animate-in fade-in duration-200">
                <PageHeader
                  badge="Engineering Insights & Digital Trends"
                  title="African Digital Scale, Fintech & High-Performance Software"
                  description="Practical architectural teardowns, conversion optimization playbooks, and regional market insights authored by Domain Tech Hub engineers in Nairobi. Every article includes verified reading time estimates."
                  currentBreadcrumb="Engineering Insights"
                  onNavigateHome={() => navigateTo('home')}
                  actionButton={{
                    label: "Request Stack Audit",
                    onClick: () => navigateTo('contact')
                  }}
                />

                <div className="py-6">
                  <InsightsSection 
                    onScheduleConsultation={handleScheduleFromInsight}
                    onNavigatePath={navigateToInternalPath}
                  />
                </div>
              </div>
            )}

            {/* 6. DEDICATED PAGE: CLIENT PORTAL DEMO */}
            {currentPage === 'portal' && (
              <div className="animate-in fade-in duration-200">
                <PageHeader
                  badge="Client Collaboration & Sprint Tracking"
                  badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
                  title="Interactive Client Portal & Staging Tracker"
                  description="Experience the real-time milestone tracking, staging preview environments, Safaricom Daraja webhook simulators, and automated SLA reporting our clients use daily."
                  currentBreadcrumb="Client Portal"
                  onNavigateHome={() => navigateTo('home')}
                  actionButton={{
                    label: "Start a New Project",
                    onClick: () => navigateTo('contact')
                  }}
                />

                <div className="py-6 pb-20">
                  <ClientPortalDemo />
                </div>
              </div>
            )}

            {/* 7. DEDICATED PAGE: FAQ */}
            {currentPage === 'faq' && (
              <div className="animate-in fade-in duration-200">
                <PageHeader
                  badge="Knowledge Base & Answers"
                  badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-teal-500" />}
                  title="Frequently Asked Questions"
                  description="Clear, direct answers regarding our development sprints, M-Pesa Daraja certification, intellectual property ownership, and monthly SLA guarantees."
                  currentBreadcrumb="FAQ"
                  onNavigateHome={() => navigateTo('home')}
                  actionButton={{
                    label: "Speak with Engineers",
                    onClick: () => navigateTo('contact')
                  }}
                />

                <div className="py-6 pb-20">
                  <FaqSection 
                    onScheduleCall={() => navigateTo('contact')}
                  />
                </div>
              </div>
            )}

            {/* 8. DEDICATED PAGE: BOOKING & CONTACT */}
            {currentPage === 'contact' && (
              <div className="animate-in fade-in duration-200">
                <PageHeader
                  badge="Direct Engineering Advisory"
                  badgeIcon={<PhoneCall className="w-3.5 h-3.5 text-emerald-500" />}
                  title="Book a Discovery Session or Request a Quote"
                  description="Schedule a complimentary 30-minute discovery session with our senior digital strategists in Nairobi, or reach out directly on WhatsApp."
                  currentBreadcrumb="Contact & Booking"
                  onNavigateHome={() => navigateTo('home')}
                />

                <div className="py-6 pb-12">
                  <BookingSection 
                    prefilledService={prefilledService}
                    prefilledNotes={prefilledNotes}
                  />
                </div>
              </div>
            )}

            {/* 9. DEDICATED MORE PAGE: SPRINT ROADMAP, ENGINEERING TEAM & ARCHITECTURE */}
            {(currentPage === 'more' || currentPage === 'roadmap' || currentPage === 'team') && (
              <div className="animate-in fade-in duration-200">
                <MorePage 
                  initialTab={activeMoreTab}
                  onNavigateHome={() => navigateTo('home')}
                  onStartSprint={handleStartSprint}
                  onOpenCalculator={() => navigateTo('calculator')}
                  onBookCall={() => {
                    setPrefilledService('Technical Discovery & Scoping Session');
                    setPrefilledNotes('I would like to schedule a technical discovery session with Domain Tech Hub architects.');
                    navigateTo('contact');
                  }}
                  onScheduleWithMember={handleScheduleWithTeamMember}
                  onSelectTechForProject={handleSelectTechForProject}
                  onTabChange={(tab) => {
                    navigateTo('more', tab);
                  }}
                />
              </div>
            )}

            {/* 10. DEDICATED PAGE: ABOUT US */}
            {currentPage === 'about' && (
              <div className="animate-in fade-in duration-200">
                <AboutPage 
                  onNavigateHome={() => navigateTo('home')}
                  onNavigateToPortfolio={() => navigateTo('portfolio')}
                  onNavigateToTeam={() => navigateTo('more', 'team')}
                  onNavigateToRoadmap={() => navigateTo('more', 'roadmap')}
                  onNavigateToContact={() => navigateTo('contact')}
                  onNavigateToTools={() => navigateTo('tools')}
                />
              </div>
            )}

          </main>
          </Suspense>

          {/* Footer */}
          <Footer 
            onNavigate={navigateTo} 
          />

          {/* Floating Quick Action Widget */}
          <QuickContactFloating 
            onOpenCalculator={() => navigateTo('calculator')}
          />

          {/* Global Search Modal */}
          {isSearchOpen && (
            <Suspense fallback={null}>
              <GlobalSearchModal
                isOpen
                onClose={() => setIsSearchOpen(false)}
                onNavigate={(target, subTab) => navigateTo(target, subTab)}
              />
            </Suspense>
          )}

          {/* Agency Owner Lead & Submission Inbox */}
          {isLeadInboxOpen && (
            <Suspense fallback={null}>
              <LeadInboxModal
                isOpen
                onClose={() => setIsLeadInboxOpen(false)}
              />
            </Suspense>
          )}

        </div>
      </LanguageProvider>
    </CurrencyProvider>
  </ThemeProvider>
  );
}
