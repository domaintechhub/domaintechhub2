/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { PageHeader } from './components/PageHeader';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { ServicesExplorer } from './components/ServicesExplorer';
import { TechStackSection } from './components/TechStackSection';
import { ProjectRoadmap, SprintTimeline } from './components/ProjectRoadmap';
import { CostCalculator } from './components/CostCalculator';
import { SeoAuditTool } from './components/SeoAuditTool';
import { DomainChecker } from './components/DomainChecker';
import { Portfolio } from './components/Portfolio';
import { ClientPortalDemo } from './components/ClientPortalDemo';
import { Testimonials } from './components/Testimonials';
import { TeamSection } from './components/TeamSection';
import { InsightsSection } from './components/InsightsSection';
import { FaqSection } from './components/FaqSection';
import { BookingSection } from './components/BookingSection';
import { ToolsPage, ToolTab } from './components/ToolsPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';
import { QuickContactFloating } from './components/QuickContactFloating';
import { applyPageSeo } from './utils/seo';
import { SERVICES_LIST } from './data/servicesData';
import { 
  ArrowRight, ShieldCheck, 
  CheckCircle, MessageSquare, PhoneCall, Code, Layers 
} from 'lucide-react';
import { AGENCY_INFO } from './data/portfolioData';

export type PageRoute = 'home' | 'services' | 'portfolio' | 'tools' | 'insights' | 'portal' | 'faq' | 'contact';

function parseHashRoute(): { page: PageRoute; subTab?: string } {
  if (typeof window === 'undefined') return { page: 'home' };
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  
  if (!rawHash || rawHash === 'home' || rawHash === 'hero' || rawHash === 'about' || rawHash === 'about-us') {
    return { page: 'home' };
  }
  if (rawHash.startsWith('service') || rawHash === 'tech-stack') {
    const parts = rawHash.split('/');
    const serviceSlug = parts[1] || undefined;
    return { page: 'services', subTab: serviceSlug };
  }
  if (rawHash.startsWith('portfolio') || rawHash.startsWith('case-stud')) {
    return { page: 'portfolio' };
  }
  if (rawHash.startsWith('tools')) {
    const parts = rawHash.split('/');
    const subTab = parts[1] || 'calculator';
    return { page: 'tools', subTab };
  }
  if (rawHash === 'calculator') {
    return { page: 'tools', subTab: 'calculator' };
  }
  if (rawHash === 'audit') {
    return { page: 'tools', subTab: 'audit' };
  }
  if (rawHash === 'domains') {
    return { page: 'tools', subTab: 'domains' };
  }
  if (rawHash.startsWith('insight') || rawHash.startsWith('blog')) {
    return { page: 'insights' };
  }
  if (rawHash.startsWith('portal') || rawHash.startsWith('client-portal')) {
    return { page: 'portal' };
  }
  if (rawHash.startsWith('faq')) {
    return { page: 'faq' };
  }
  if (rawHash.startsWith('contact') || rawHash.startsWith('booking')) {
    return { page: 'contact' };
  }
  return { page: 'home' };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeToolTab, setActiveToolTab] = useState<ToolTab>('calculator');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [calculatorServiceId, setCalculatorServiceId] = useState<string>('web-development');
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');

  // Sync route on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const { page, subTab } = parseHashRoute();
      setCurrentPage(page);
      if (page === 'tools') {
        if (subTab) setActiveToolTab(subTab as ToolTab);
      } else if (page === 'services') {
        setActiveServiceId(subTab || null);
      } else {
        setActiveServiceId(null);
      }

      const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      if (rawHash === 'about' || rawHash === 'about-us') {
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (rawHash === 'team' || rawHash === 'our-team') {
        setTimeout(() => {
          document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (rawHash === 'roadmap' || rawHash === 'sprint-roadmap' || rawHash === 'process') {
        setTimeout(() => {
          document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamically update document title, meta descriptions, and Schema.org JSON-LD for SEO
  useEffect(() => {
    applyPageSeo(currentPage, currentPage === 'services' ? (activeServiceId || undefined) : activeToolTab);
  }, [currentPage, activeToolTab, activeServiceId]);

  const navigateTo = (target: string, subParam?: string) => {
    let targetPage: PageRoute = 'home';
    let targetSub: string | undefined = subParam;

    if (target === 'hero' || target === 'home') {
      targetPage = 'home';
      targetSub = undefined;
    } else if (target === 'about' || target === 'about-us') {
      setCurrentPage('home');
      setActiveServiceId(null);
      window.location.hash = '#/about';
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    } else if (target === 'team' || target === 'our-team') {
      setCurrentPage('home');
      setActiveServiceId(null);
      window.location.hash = '#/team';
      setTimeout(() => {
        document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    } else if (target === 'roadmap' || target === 'process' || target === 'sprint-roadmap') {
      setCurrentPage('home');
      setActiveServiceId(null);
      window.location.hash = '#/roadmap';
      setTimeout(() => {
        document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    } else if (target === 'services' || target === 'tech-stack') {
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
    } else {
      setActiveServiceId(null);
    }

    // Update URL hash
    let newHash = '';
    if (targetPage !== 'home') {
      newHash = targetSub ? `#/${targetPage}/${targetSub}` : `#/${targetPage}`;
    }
    
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          
          {/* Navigation Bar with Search Trigger */}
          <Navbar 
            onNavigate={navigateTo} 
            activeSection={currentPage} 
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Main Content Page Container */}
          <main className="flex-1">

            {/* 1. DEDICATED PAGE: HOME / LANDING OVERVIEW */}
            {currentPage === 'home' && (
              <div className="animate-in fade-in duration-200">
                <Hero 
                  onNavigate={navigateTo} 
                />

                <StatsSection 
                  onNavigateToCaseStudies={() => navigateTo('portfolio')}
                  onNavigateToBooking={() => navigateTo('contact')}
                />

                <ServicesExplorer 
                  onSelectForQuote={handleSelectForQuote}
                  onBookService={handleBookService}
                />

                <TechStackSection 
                  onSelectTechForProject={handleSelectTechForProject}
                />

                <ProjectRoadmap 
                  onStartSprint={handleStartSprint}
                  onOpenCalculator={() => navigateTo('calculator')}
                />

                <CostCalculator 
                  initialServiceId={calculatorServiceId}
                  onProceedToBooking={handleProceedToBooking}
                />

                <SeoAuditTool 
                  onFixWithAgency={handleFixAuditWithAgency}
                />

                <DomainChecker 
                  onSelectDomainForSetup={handleSelectDomainForSetup}
                />

                <Portfolio 
                  onBookSimilarProject={handleBookSimilarProject}
                />

                <ClientPortalDemo />

                <Testimonials />

                <TeamSection 
                  onScheduleWithMember={handleScheduleWithTeamMember}
                />

                <InsightsSection 
                  onScheduleConsultation={handleScheduleFromInsight}
                />

                <FaqSection 
                  onScheduleCall={() => navigateTo('contact')}
                />

                <BookingSection 
                  prefilledService={prefilledService}
                  prefilledNotes={prefilledNotes}
                />
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
                    setActiveToolTab(tab);
                    if (window.location.hash !== `#/tools/${tab}`) {
                      window.location.hash = `#/tools/${tab}`;
                    }
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

          </main>

          {/* Footer */}
          <Footer 
            onNavigate={navigateTo} 
          />

          {/* Floating Quick Action Widget */}
          <QuickContactFloating 
            onOpenCalculator={() => navigateTo('calculator')}
          />

          {/* Global Search Modal */}
          <GlobalSearchModal 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={(target, subTab) => navigateTo(target, subTab)}
          />

        </div>
      </LanguageProvider>
    </CurrencyProvider>
  </ThemeProvider>
  );
}
