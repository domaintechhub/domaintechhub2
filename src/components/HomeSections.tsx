import React from 'react';
import { WhatWeBuildSection } from './WhatWeBuildSection';
import { Testimonials } from './Testimonials';
import { BookingSection } from './BookingSection';
import { BuildLayerKey } from './Hero';

interface HomeSectionsProps {
  calculatorServiceId?: string;
  prefilledService: string;
  prefilledNotes: string;
  onNavigate: (target: string, subParam?: string) => void;
  onSelectForQuote: (serviceId: string) => void;
  onBookService?: (serviceName: string) => void;
  onSelectTechForProject?: (techName: string) => void;
  onProceedToBooking?: (quoteSummary: string, estimatedTotal: string) => void;
  onFixAuditWithAgency?: (domain: string, issueCount: number) => void;
  onSelectDomainForSetup?: (domainName: string, extension: string) => void;
  onBookSimilarProject?: (projectTitle: string) => void;
  onScheduleConsultation?: (topic: string) => void;
  onNavigatePath?: (url: string) => void;
  activeBuildLayer?: BuildLayerKey;
  onSelectBuildLayer?: (layer: BuildLayerKey) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({
  prefilledService,
  prefilledNotes,
  onNavigate,
  onSelectForQuote,
  activeBuildLayer = 'build',
  onSelectBuildLayer,
}) => (
  <>
    {/* Block 2: WHAT WE BUILD - Pinned Layers (01 Build, 02 Sell, 03 Grow, 04 Run) */}
    <WhatWeBuildSection
      activeLayer={activeBuildLayer}
      onSelectLayer={onSelectBuildLayer}
      onNavigate={onNavigate}
      onSelectForQuote={onSelectForQuote}
    />
    <Testimonials />
    <BookingSection
      prefilledService={prefilledService}
      prefilledNotes={prefilledNotes}
    />
  </>
);

