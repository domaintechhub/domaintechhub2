import React, { useState } from 'react';
import { 
  Code2, Palette, ShieldCheck, TrendingUp, CheckCircle2, 
  Linkedin, Github, ArrowRight, MessageSquare, Award, 
  Calendar, Layers, Sparkles, Terminal, Globe, ChevronRight
} from 'lucide-react';
import teamArchitectImg from '../assets/images/team_solutions_architect_1790853423651.jpg';
import teamDesignerImg from '../assets/images/team_product_designer_1790853436226.jpg';
import teamFintechImg from '../assets/images/team_fintech_lead_1790853447967.jpg';
import teamGrowthImg from '../assets/images/team_growth_lead_1790853459528.jpg';
import { AGENCY_INFO } from '../data/portfolioData';
import { Mail } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Engineering' | 'Design' | 'Fintech' | 'Growth';
  experienceYears: string;
  image: string;
  summary: string;
  bio: string;
  specializations: string[];
  techStack: string[];
  credentials: string;
  signatureProject: string;
  socials?: {
    linkedin?: string;
    github?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'brian-kiprop',
    name: 'Brian Kiprop',
    role: 'Head of Engineering & Solutions Architect',
    department: 'Engineering',
    experienceYears: '9+ Years Exp',
    image: teamArchitectImg,
    summary: 'Distributes resilient cloud systems, Next.js architectures, and sub-second Core Web Vitals infrastructure.',
    bio: 'Brian leads technical architecture and engineering standards at Domain Tech Hub. Over the past 9 years, he has designed distributed cloud applications and high-concurrency microservices across East Africa. He specializes in strict TypeScript contracts, PostgreSQL performance tuning, and scalable multi-tenant SaaS structures.',
    specializations: [
      'Next.js 15 & React Architecture',
      'Distributed Systems & Edge CDN',
      'PostgreSQL Database Schema & ERD',
      'Sub-Second Core Web Vitals (LCP < 1.0s)'
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    credentials: 'B.Sc. Computer Science (UoN) · Cloud Architect Certified',
    signatureProject: 'AfriTrade Multivendor E-Commerce & Micro-Services',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'zawadi-mwende',
    name: 'Zawadi Mwende',
    role: 'Lead Product Designer & UX Strategist',
    department: 'Design',
    experienceYears: '7+ Years Exp',
    image: teamDesignerImg,
    summary: 'Translates high-stakes business requirements into intuitive design systems and high-converting checkouts.',
    bio: 'Zawadi directs product design, atomic design token libraries, and usability testing. She works closely with clients to eliminate user checkout friction and build responsive, mobile-first design systems. Her work has helped our e-commerce clients slash checkout abandonment rates by an average of 54%.',
    specializations: [
      'Atomic Design Systems & Tokens',
      'Mobile-First Checkout UX',
      'Interactive Figma Prototyping',
      'Conversion Rate Optimization (CRO)'
    ],
    techStack: ['Figma', 'Tailwind CSS', 'Design Tokens', 'UserTesting', 'Hotjar'],
    credentials: 'UX Kenya Lead Fellow · Human-Computer Interaction Certified',
    signatureProject: 'Rift Valley Organics Frictionless Mobile Checkout',
    socials: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'dennis-mutua',
    name: 'Dennis Mutua',
    role: 'Senior Fintech & Daraja Integration Engineer',
    department: 'Fintech',
    experienceYears: '8+ Years Exp',
    image: teamFintechImg,
    summary: 'Specializes in Safaricom Daraja 3.0 STK Push, automated payment webhooks, and hybrid checkout gateways.',
    bio: 'Dennis oversees payment architecture, financial reconciliation pipelines, and server security. He has engineered integrations for over KSh 300M+ in cumulative mobile money and credit card transactions across Kenya, Uganda, and international Stripe/Flutterwave channels with zero callback loss.',
    specializations: [
      'Safaricom Daraja 3.0 API STK Push',
      'Idempotent Webhook Receivers',
      'Redis Distributed Caching & Queues',
      'PCI-DSS & Kenya Data Protection Compliance'
    ],
    techStack: ['Safaricom Daraja', 'Python', 'Redis', 'Stripe', 'Flutterwave', 'Go'],
    credentials: 'Safaricom Daraja Certified Partner · FinTech Security Fellow',
    signatureProject: 'FinPulse 1,800/mo Underwriting Gateway & STK Push',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'brenda-achieng',
    name: 'Brenda Achieng',
    role: 'Lead Technical SEO & Conversion Strategist',
    department: 'Growth',
    experienceYears: '8+ Years Exp',
    image: teamGrowthImg,
    summary: 'Combines algorithmic search architecture with semantic Schema.org engineering to dominate Google Page 1.',
    bio: 'Brenda leads organic acquisition and technical SEO strategy. She builds comprehensive keyword cluster strategies, audits structured data JSON-LD, and resolves crawl-budget bottlenecks. Her data-backed search strategies have delivered sustained #1 search rankings for competitive commercial legal, tech, and retail terms.',
    specializations: [
      'Google Core Web Vitals Optimization',
      'Schema.org JSON-LD Rich Snippets',
      'Commercial Keyword Architecture',
      'Ahrefs & GA4 Multi-Touch Funnel Analysis'
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'GA4', 'Semrush'],
    credentials: 'Google Certified Partner · Technical SEO Master Class Fellow',
    signatureProject: 'Nyambura & Associates 90-Day Google #1 Overhaul',
    socials: {
      linkedin: 'https://linkedin.com'
    }
  }
];

interface TeamSectionProps {
  onScheduleWithMember?: (memberName: string, role: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onScheduleWithMember }) => {
  const [activeMemberId, setActiveMemberId] = useState<string>('brian-kiprop');
  const selectedMember = TEAM_MEMBERS.find(m => m.id === activeMemberId) || TEAM_MEMBERS[0];

  return (
    <section id="team" className="py-20 lg:py-28 bg-[#faf8f5] dark:bg-slate-950 border-t border-stone-200 dark:border-slate-900 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-teal-600 dark:text-cyan-400 tracking-wider mb-2 font-bold uppercase">
              HUMAN EXPERTISE · ZERO OUTSOURCING
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Meet the Senior Engineers &amp; Strategists Behind Your Code
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We do not outsource your mission-critical project to unvetted freelancers. You collaborate directly with experienced Nairobi architects who have built systems that scale.
            </p>
          </div>

          {/* Quick Credibility Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm shrink-0">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
              100%
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">In-House Nairobi Studio</div>
              <div className="text-slate-500 dark:text-slate-400 font-mono">Direct Slack, WhatsApp &amp; In-Person Access</div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TEAM_MEMBERS.map((member) => {
            const isSelected = activeMemberId === member.id;
            return (
              <div
                key={member.id}
                onClick={() => setActiveMemberId(member.id)}
                className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-teal-500 shadow-xl shadow-teal-500/10 ring-2 ring-teal-500/20 md:-translate-y-1'
                    : 'bg-white/80 dark:bg-slate-900/60 border-stone-200 dark:border-slate-800 hover:border-stone-300 dark:hover:border-slate-700 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-slate-800">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.role} at Domain Tech Hub`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Dept Pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[10px] font-semibold tracking-wider uppercase border border-white/20">
                      {member.department}
                    </div>

                    {/* Floating Experience Pill */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-teal-900/80 backdrop-blur-md text-teal-200 font-mono text-[10px] font-semibold border border-teal-500/30">
                      {member.experienceYears}
                    </div>

                    {/* Name inside gradient overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="font-extrabold text-lg leading-tight drop-shadow-sm">{member.name}</div>
                      <div className="text-xs text-teal-300 font-medium drop-shadow-sm">{member.role}</div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {member.summary}
                    </p>

                    {/* Specializations Pills */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-slate-800/80">
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                        Core Disciplines:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.specializations.slice(0, 2).map((spec, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMemberId(member.id);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{isSelected ? 'Viewing Full Profile' : 'Inspect Profile & Stack'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Member Deep-Dive Showcase Box */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            
            {/* Left Thumbnail & Credentials (shrink-0) */}
            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-4 shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-teal-500/50 shadow-lg">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="text-center sm:text-left space-y-1">
                <div className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                  {selectedMember.department} Lead
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-base">
                  {selectedMember.name}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {selectedMember.experienceYears}
                </div>
              </div>

              {/* Direct Booking & Instant Contact CTAs */}
              <div className="w-full flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onScheduleWithMember?.(selectedMember.name, selectedMember.role)}
                  className="w-full px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Consult with {selectedMember.name.split(' ')[0]}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${AGENCY_INFO.whatsapp}?text=${encodeURIComponent(`Hello Domain Tech Hub, I want to discuss a project with ${selectedMember.name} (${selectedMember.role}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${AGENCY_INFO.email}?subject=${encodeURIComponent(`Consultation Request: ${selectedMember.name} (${selectedMember.role})`)}&body=${encodeURIComponent(`Hello Domain Tech Hub,\n\nI would like to schedule a consultation session with ${selectedMember.name} regarding our software project.\n\nMy Contact Details:\nName:\nPhone:\nProject Scope:\n`)}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Detailed Narrative & Specializations */}
            <div className="flex-1 space-y-6">
              
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                    Lead Profile Spotlight
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedMember.credentials}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {selectedMember.role}
                </h3>
                
                <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* 2-Column Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100 dark:border-slate-800">
                
                {/* Specializations Checklist */}
                <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-slate-950/70 border border-stone-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Key Engineering Focus</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {selectedMember.specializations.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack & Signature Case Study */}
                <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-slate-950/70 border border-stone-200 dark:border-slate-800 space-y-3">
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>Primary Tooling &amp; Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMember.techStack.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200/80 dark:border-slate-800/80">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Signature Enterprise Deployment
                    </div>
                    <div className="text-xs font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                      {selectedMember.signatureProject}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
