import React from 'react';
import { StatsSection } from './StatsSection';
import { ServicesExplorer } from './ServicesExplorer';
import { TechStackSection } from './TechStackSection';
import { CostCalculator } from './CostCalculator';
import { SeoAuditTool } from './SeoAuditTool';
import { DomainChecker } from './DomainChecker';
import { Portfolio } from './Portfolio';
import { ClientPortalDemo } from './ClientPortalDemo';
import { Testimonials } from './Testimonials';
import { InsightsSection } from './InsightsSection';
import { FaqSection } from './FaqSection';
import { BookingSection } from './BookingSection';

interface HomeSectionsProps {
  calculatorServiceId: string;
  prefilledService: string;
  prefilledNotes: string;
  onNavigate: (target: string, subParam?: string) => void;
  onSelectForQuote: (serviceId: string) => void;
  onBookService: (serviceName: string) => void;
  onSelectTechForProject: (techName: string) => void;
  onProceedToBooking: (quoteSummary: string, estimatedTotal: string) => void;
  onFixAuditWithAgency: (domain: string, issueCount: number) => void;
  onSelectDomainForSetup: (domainName: string, extension: string) => void;
  onBookSimilarProject: (projectTitle: string) => void;
  onScheduleConsultation: (topic: string) => void;
  onNavigatePath: (url: string) => void;
};

export const HomeSections: React.FC<HomeSectionsProps> = ({
  calculatorServiceId,
  prefilledService,
  prefilledNotes,
  onNavigate,
  onSelectForQuote,
  onBookService,
  onSelectTechForProject,
  onProceedToBooking,
  onFixAuditWithAgency,
  onSelectDomainForSetup,
  onBookSimilarProject,
  onScheduleConsultation,
  onNavigatePath,
}) => (
  <>
    <StatsSection
      onNavigateToCaseStudies={() => onNavigate('portfolio')}
      onNavigateToBooking={() => onNavigate('contact')}
    />
    <ServicesExplorer
      onSelectForQuote={onSelectForQuote}
      onBookService={onBookService}
    />
    <TechStackSection onSelectTechForProject={onSelectTechForProject} />
    <CostCalculator
      initialServiceId={calculatorServiceId}
      onProceedToBooking={onProceedToBooking}
    />
    <SeoAuditTool onFixWithAgency={onFixAuditWithAgency} />
    <DomainChecker onSelectDomainForSetup={onSelectDomainForSetup} />
    <Portfolio onBookSimilarProject={onBookSimilarProject} />
    <ClientPortalDemo />
    <Testimonials />
    <InsightsSection onScheduleConsultation={onScheduleConsultation} onNavigatePath={onNavigatePath} />
    <FaqSection onScheduleCall={() => onNavigate('contact')} />
    <BookingSection
      prefilledService={prefilledService}
      prefilledNotes={prefilledNotes}
    />
  </>
);
