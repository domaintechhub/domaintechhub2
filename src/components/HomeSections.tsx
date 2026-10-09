import React from 'react';
import { StatsSection } from './StatsSection';
import { CostCalculator } from './CostCalculator';
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
}

export const HomeSections: React.FC<HomeSectionsProps> = ({
  calculatorServiceId,
  prefilledService,
  prefilledNotes,
  onNavigate,
  onProceedToBooking,
  onScheduleConsultation,
  onNavigatePath,
}) => (
  <>
    <StatsSection
      onNavigateToCaseStudies={() => onNavigate('portfolio')}
      onNavigateToBooking={() => onNavigate('contact')}
    />
    <CostCalculator
      initialServiceId={calculatorServiceId}
      onProceedToBooking={onProceedToBooking}
    />
    <Testimonials />
    <InsightsSection
      previewMode={true}
      onScheduleConsultation={onScheduleConsultation}
      onNavigatePath={onNavigatePath}
      onViewAllArticles={() => onNavigate('insights')}
    />
    <FaqSection onScheduleCall={() => onNavigate('contact')} />
    <BookingSection
      prefilledService={prefilledService}
      prefilledNotes={prefilledNotes}
    />
  </>
);
