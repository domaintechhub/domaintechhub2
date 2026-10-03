export type ServiceCategory = 
  | 'all'
  | 'web_dev'
  | 'ecommerce'
  | 'seo_marketing'
  | 'crm_software'
  | 'branding_design'
  | 'maintenance_cloud';

export interface ServiceDetail {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  technologies: string[];
  basePriceUSD: number;
  basePriceKES: number;
  duration: string;
  popular?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  location: string;
  summary: string;
  estimatedTimeline: string;
  timelineBreakdown?: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  techStack: string[];
  image: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface AuditReport {
  id: string;
  url: string;
  keyword?: string;
  analyzedAt: string;
  overallScore: number;
  seoScore: number;
  performanceScore: number;
  mobileScore: number;
  securityScore: number;
  loadingTimeMs: number;
  sslValid: boolean;
  mobileFriendly: boolean;
  issues: {
    category: 'SEO' | 'Performance' | 'Security' | 'Mobile';
    severity: 'critical' | 'warning' | 'good';
    title: string;
    description: string;
    recommendation: string;
  }[];
}

export interface ProjectQuote {
  serviceId: string;
  serviceName: string;
  projectTier: 'starter' | 'professional' | 'enterprise';
  features: string[];
  timeline: string;
  estimatedPriceUSD: number;
  estimatedPriceKES: number;
  maintenanceIncluded: boolean;
}

export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  meetingDate: string;
  meetingTime: string;
  meetingType: 'google_meet' | 'phone' | 'nairobi_office';
  notes: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}
