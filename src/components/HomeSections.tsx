import React, { useState, useRef } from 'react';
import { 
  ArrowRight, MessageSquare, 
  ChevronDown, ChevronUp, ShieldCheck, 
  Clock, CheckCircle2, ChevronLeft, ChevronRight,
  Code, Bot, Target, ShoppingCart, Globe, Smartphone,
  Users, CreditCard, FileText, Palette, BarChart3, Rocket, Phone
} from 'lucide-react';
import { saveLead } from '../utils/leadDispatch';
import { BuildLayerKey } from './Hero';
import { ClientBrandsMarquee } from './ClientBrandsMarquee';
import tessasBakeryImg from '../assets/images/clients/tessas_bakery.jpg';

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
  onNavigate,
  onSelectForQuote,
}) => {
  // Quote form state
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteNeeds, setQuoteNeeds] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ open/close accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Projects carousel scroll ref
  const projectsScrollRef = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      projectsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;

    setIsSubmitting(true);
    try {
      saveLead({
        source: 'quick_contact',
        sourceTitle: 'Home Page Quick Quote Request',
        fullName: quoteName,
        email: `${quotePhone.replace(/\s+/g, '')}@lead.domaintechhubs.com`,
        phone: quotePhone,
        notes: quoteNeeds,
        serviceOrItem: quoteNeeds || 'Digital Solutions & Web Design',
      });

      const details = quoteNeeds ? quoteNeeds : 'Custom Digital & AI Solutions';
      const text = `*New Quote Request — Domain Tech Hub*

*Name:* ${quoteName}
*Phone / WhatsApp:* ${quotePhone}
*What I Need:* ${details}

Hi Domain Tech Hub, I have submitted my request through your website. Looking forward to your quote!`;

      window.open(`https://wa.me/254118746676?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsAppFromForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const details = quoteNeeds ? quoteNeeds : 'Custom Digital & AI Solutions';
    const text = `*New Quote Request — Domain Tech Hub*

*Name:* ${quoteName}
*Phone / WhatsApp:* ${quotePhone}
*What I Need:* ${details}

Hi Domain Tech Hub, I have submitted my request through your website. Looking forward to your quote!`;
    window.open(`https://wa.me/254118746676?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('quote-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Featured Projects co-developed by the team
  const projects = [
    {
      id: 'carsoko',
      title: 'CarSoko Kenya',
      category: 'Automotive Marketplace (Live)',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      link: () => onNavigate('portfolio'),
    },
    {
      id: 'greenspoon',
      title: 'Greenspoon Kenya',
      category: 'Organic E-Commerce (Live)',
      image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
      link: () => onNavigate('portfolio'),
    },
    {
      id: 'remax-kenya',
      title: 'RE/MAX Kenya',
      category: 'Real Estate & Properties (Live)',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      link: () => onNavigate('portfolio'),
    },
    {
      id: 'peachcars',
      title: 'Peach Cars Kenya',
      category: 'Auto Inspection & Sales (Live)',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      link: () => onNavigate('portfolio'),
    },
    {
      id: 'safari-co-za',
      title: 'Safari.co.za',
      category: 'Luxury Safari & Lodges (Live)',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80',
      link: () => onNavigate('portfolio'),
    },
    {
      id: 'viator',
      title: 'Viator',
      category: 'Global Travel & Tours (Live)',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      link: () => onNavigate('portfolio'),
    },
  ];

  // 4 Client Testimonials from screenshot
  const testimonials = [
    {
      id: 'grace-wanjiku',
      quote: '“They built our website and handled our digital marketing. Our online enquiries increased by 200%.”',
      author: 'Grace Wanjiku',
      role: "CEO, Tessa's Bakery",
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 'james-kimani',
      quote: '“Professional, creative and timely. Our brand looks better than ever.”',
      author: 'James Kimani',
      role: 'Managing Director, Apex Hardware',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 'sarah-njeri',
      quote: '“Their SEO and Google Ads campaigns brought us qualified leads within 2 months. Highly recommended!”',
      author: 'Sarah Njeri',
      role: 'Marketing Manager, SolarGrid Kenya',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 'david-mwangi',
      quote: '“The AI chatbot has saved us hours every week. Great team and support!”',
      author: 'David Mwangi',
      role: 'Founder, Safari Logistics',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
    },
  ];

  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">

      {/* ========================================================================= */}
      {/* 00 / TRUSTED BRANDS MARQUEE (ABOVE OUR SERVICES) */}
      {/* ========================================================================= */}
      <ClientBrandsMarquee onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 01 / OUR SERVICES: COMPLETE DIGITAL SOLUTIONS FOR YOUR BUSINESS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-[#00c853] dark:text-[#00e676] tracking-wider uppercase inline-block mb-3 font-mono">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Complete Digital Solutions for Your Business
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              From modern websites to smart AI tools and powerful marketing campaigns, we provide everything you need to grow online.
            </p>
          </div>

          {/* 4 Main Core Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Card 1: Website Design & Development */}
            <div 
              onClick={() => onSelectForQuote('web-development')}
              className="p-6 sm:p-7 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900/90 border border-emerald-100 dark:border-slate-800 hover:border-[#00c853] hover:shadow-xl hover:shadow-emerald-500/10 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#00c853] text-white flex items-center justify-center mb-5 shadow-md shadow-[#00c853]/25 group-hover:scale-105 transition-transform">
                  <Code className="w-6 h-6 stroke-[2.2] text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                  Website Design &amp; Development
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Business websites, e-commerce, landing pages &amp; custom apps.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00c853] dark:text-[#00e676] group-hover:gap-2.5 transition-all">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: AI Services & Automation */}
            <div 
              onClick={() => onSelectForQuote('ai-automation')}
              className="p-6 sm:p-7 rounded-2xl bg-[#fbf8ff] dark:bg-slate-900/90 border border-purple-100 dark:border-slate-800 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-5 shadow-md shadow-purple-600/25 group-hover:scale-105 transition-transform">
                  <Bot className="w-6 h-6 stroke-[2.2] text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  AI Services &amp; Automation
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Chatbots, workflow automation, AI tools and more.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00c853] dark:text-[#00e676] group-hover:gap-2.5 transition-all">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: Digital Marketing */}
            <div 
              onClick={() => onSelectForQuote('seo-marketing')}
              className="p-6 sm:p-7 rounded-2xl bg-[#f6fcf8] dark:bg-slate-900/90 border border-emerald-100 dark:border-slate-800 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-5 shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6 stroke-[2.2] text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Digital Marketing
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  SEO, social media, Google Ads, content &amp; lead generation.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00c853] dark:text-[#00e676] group-hover:gap-2.5 transition-all">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 4: E-Commerce Solutions */}
            <div 
              onClick={() => onSelectForQuote('ecommerce-solutions')}
              className="p-6 sm:p-7 rounded-2xl bg-[#fffbf6] dark:bg-slate-900/90 border border-amber-100 dark:border-slate-800 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-5 shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform">
                  <ShoppingCart className="w-6 h-6 stroke-[2.2] text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  E-Commerce Solutions
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Online stores, payment integration (M-Pesa, cards, etc.).
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00c853] dark:text-[#00e676] group-hover:gap-2.5 transition-all">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

          {/* 6 Supporting Pill Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            {/* Pill 1: CMS & WordPress */}
            <div 
              onClick={() => onSelectForQuote('web-development')}
              className="p-3.5 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-3 group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#00c853] dark:text-[#00e676] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  CMS &amp; WordPress
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Manage your content easily
                </div>
              </div>
            </div>

            {/* Pill 2: Mobile App Development */}
            <div 
              onClick={() => onSelectForQuote('mobile-apps')}
              className="p-3.5 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-3 group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#00c853] dark:text-[#00e676] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Mobile App Development
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Android &amp; iOS apps
                </div>
              </div>
            </div>

            {/* Pill 3: CRM & Business Systems */}
            <div 
              onClick={() => onSelectForQuote('crm-systems')}
              className="p-3.5 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-3 group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#00c853] dark:text-[#00e676] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  CRM &amp; Business Systems
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Manage customers &amp; operations
                </div>
              </div>
            </div>

            {/* Pill 4: M-Pesa Integration */}
            <div 
              onClick={() => onSelectForQuote('mpesa-integration')}
              className="p-3.5 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-3 group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#00c853] dark:text-[#00e676] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  M-Pesa Integration
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Secure online payments
                </div>
              </div>
            </div>

            {/* Pill 5: KRA eTIMS Integration */}
            <div 
              onClick={() => onSelectForQuote('etims-integration')}
              className="p-3.5 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-3 group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#00c853] dark:text-[#00e676] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  KRA eTIMS Integration
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Business invoicing &amp; tax
                </div>
              </div>
            </div>

            {/* Pill 6: Graphic Design & Branding */}
            <div 
              onClick={() => onSelectForQuote('branding-design')}
              className="p-3.5 rounded-xl bg-[#f7fcf9] dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 hover:border-[#00c853] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-3 group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#00c853] dark:text-[#00e676] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Palette className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Graphic Design &amp; Branding
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Logos, creatives &amp; more
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 02 / SHOWCASE: PROFESSIONAL WEBSITES THAT WORK FOR YOU (GREEN BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="green-showcase-section py-16 sm:py-24 bg-gradient-to-br from-[#032415] via-[#073d24] to-[#042818] text-white relative overflow-hidden border-y border-emerald-950/40">
        {/* Subtle decorative emerald ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00c853]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Checklist, Button */}
            <div className="lg:col-span-5 space-y-6">
              <span 
                style={{ color: '#00e676' }}
                className="text-xs font-mono font-bold !text-[#00e676] tracking-wider uppercase block"
              >
                WEBSITE DESIGN &amp; DEVELOPMENT
              </span>
              
              {/* Force pure bright white with both !text-white and inline style for 100% visibility */}
              <h2 
                style={{ color: '#ffffff' }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black !text-white tracking-tight leading-tight"
              >
                Professional Websites That Work for You
              </h2>
              
              <p 
                style={{ color: '#d1fae5' }}
                className="text-base sm:text-lg !text-emerald-100 leading-relaxed font-normal"
              >
                Get a fast, secure and mobile-friendly website that displays your brand, builds trust and turns visitors into paying customers.
              </p>

              {/* 5 Green Checkmarks with guaranteed white text */}
              <ul className="space-y-3 pt-1">
                {[
                  'Custom business websites',
                  'E-commerce stores',
                  'WordPress & CMS',
                  'Responsive design for all devices',
                  'SEO setup & speed optimization',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#00e676] shrink-0" />
                    <span style={{ color: '#ffffff' }} className="!text-white">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('portfolio')}
                  style={{ color: '#ffffff', backgroundColor: '#00c853', borderColor: '#00e676' }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#00e676] bg-[#00c853] hover:bg-[#00b34a] !text-white font-bold text-sm transition-all cursor-pointer active:scale-[0.98] shadow-lg shadow-[#00c853]/35"
                >
                  <span style={{ color: '#ffffff' }} className="!text-white">View Our Portfolio</span>
                  <ArrowRight className="w-4 h-4 !text-white" />
                </button>
              </div>
            </div>

            {/* Middle Column: Laptop & Mobile Mockups */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
                
                {/* Laptop Screen Mockup */}
                <div className="bg-slate-900 rounded-t-2xl p-2.5 pb-0 shadow-2xl border border-emerald-900/40">
                  {/* Laptop camera & bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 rounded-t-lg mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="w-2 h-2 rounded-full bg-[#00c853]" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">qualityproducts.co.ke</span>
                    <div className="w-4" />
                  </div>

                  {/* Browser content */}
                  <div className="bg-slate-950 rounded-b-md overflow-hidden relative aspect-[16/10]">
                    <img 
                      src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80" 
                      alt="Client Website Showcase"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                      <div className="text-[10px] text-[#00e676] font-bold uppercase tracking-wider mb-1">
                        Client Production Live
                      </div>
                      <div style={{ color: '#ffffff' }} className="text-sm font-bold !text-white leading-tight">
                        Quality Products for a Better Tomorrow
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="h-3 bg-slate-700 rounded-b-xl shadow-lg relative mx-auto w-[105%] -left-[2.5%]" />

                {/* Mobile Phone Mockup (overlapping at bottom-right) */}
                <div className="absolute -bottom-6 -right-3 sm:-right-6 w-32 sm:w-36 rounded-2xl bg-slate-900 p-1.5 shadow-2xl border-2 border-emerald-500/40">
                  <div className="bg-slate-950 rounded-xl overflow-hidden aspect-[9/18] relative">
                    <img 
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80" 
                      alt="Mobile responsive preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
                      <div style={{ color: '#ffffff' }} className="text-[9px] !text-white font-bold truncate">Mobile Optimized</div>
                      <div className="text-[8px] text-[#00e676]">99.8% Uptime</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Tag Bar below laptop */}
              <div 
                style={{ color: '#ffffff' }}
                className="mt-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs !text-white font-medium flex items-center gap-2"
              >
                <span>Websites</span>
                <span>•</span>
                <span>E-Commerce</span>
                <span>•</span>
                <span>WordPress</span>
                <span>•</span>
                <span>Custom Development</span>
              </div>
            </div>

            {/* Right Column: 3 White Vertical Stats Cards */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Stat 1 */}
              <div className="p-5 rounded-2xl bg-white text-slate-900 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#00c853] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-[#00c853]" />
                </div>
                <div>
                  <div style={{ color: '#0f172a' }} className="text-2xl sm:text-3xl font-black !text-slate-900 leading-none mb-1">
                    50+
                  </div>
                  <div style={{ color: '#64748b' }} className="text-xs sm:text-sm !text-slate-500 font-medium">
                    Websites Delivered
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-5 rounded-2xl bg-white text-slate-900 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#00c853] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#00c853]" />
                </div>
                <div>
                  <div style={{ color: '#0f172a' }} className="text-2xl sm:text-3xl font-black !text-slate-900 leading-none mb-1">
                    98%
                  </div>
                  <div style={{ color: '#64748b' }} className="text-xs sm:text-sm !text-slate-500 font-medium">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-5 rounded-2xl bg-white text-slate-900 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#00c853] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#00c853]" />
                </div>
                <div>
                  <div style={{ color: '#0f172a' }} className="text-2xl sm:text-3xl font-black !text-slate-900 leading-none mb-1">
                    24/7
                  </div>
                  <div style={{ color: '#64748b' }} className="text-xs sm:text-sm !text-slate-500 font-medium">
                    Support &amp; Maintenance
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 03 / OUR WORK: REAL PROJECTS. REAL RESULTS. */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row with Title and View All Projects Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-[#00c853] dark:text-[#00e676] tracking-wider uppercase block mb-2">
                OUR WORK
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                Real Projects. Real Results.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl">
                We build high-performing websites and digital solutions for businesses across Kenya and beyond.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-[#00c853]/25 cursor-pointer flex items-center gap-2"
              >
                <span className="!text-white">View All Projects</span>
                <ArrowRight className="w-4 h-4 !text-white" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                <button
                  onClick={() => scrollProjects('left')}
                  aria-label="Previous project"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#00c853] hover:text-[#00c853] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollProjects('right')}
                  aria-label="Next project"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#00c853] hover:text-[#00c853] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* 4 Projects Grid / Carousel */}
          <div 
            ref={projectsScrollRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 scrollbar-none"
          >
            {projects.map((project) => (
              <div 
                key={project.id}
                onClick={project.link}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#00c853] dark:group-hover:text-[#00e676] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {project.category}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#00c853] dark:text-[#00e676]">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 04 / OUR PROCESS: SIMPLE STEPS TO GET STARTED */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-[#00c853] dark:text-[#00e676] tracking-wider uppercase inline-block mb-3">
              OUR PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Simple Steps to Get Started
            </h2>
          </div>

          {/* 4 Connected Process Steps with Horizontal Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 flex flex-col items-start relative shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#00c853] dark:text-[#00e676] flex items-center justify-center mb-5 shadow-inner">
                <Phone className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                01. Discovery Call
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Discuss your goals and find the best solution.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 flex flex-col items-start relative shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#00c853] dark:text-[#00e676] flex items-center justify-center mb-5 shadow-inner">
                <FileText className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                02. Proposal
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Get a detailed plan, timeline and fixed quote within 48 hours.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 flex flex-col items-start relative shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#00c853] dark:text-[#00e676] flex items-center justify-center mb-5 shadow-inner">
                <Code className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                03. Build &amp; Review
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We develop and share updates until you're happy.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 flex flex-col items-start relative shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#00c853] dark:text-[#00e676] flex items-center justify-center mb-5 shadow-inner">
                <Rocket className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                04. Launch &amp; Support
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Go live and get 30 days of support.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 05 / OUR PACKAGES: FLEXIBLE PACKAGES FOR EVERY BUSINESS (GREEN CONTAINER) */}
      {/* ========================================================================= */}
      <section className="green-packages-section py-16 sm:py-24 bg-gradient-to-b from-[#032415] via-[#073d24] to-[#021d11] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span 
              style={{ color: '#00e676' }}
              className="text-xs font-mono font-bold !text-[#00e676] tracking-wider uppercase inline-block mb-3"
            >
              OUR PACKAGES
            </span>
            <h2 
              style={{ color: '#ffffff' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black !text-white tracking-tight"
            >
              Flexible Packages for Every Business
            </h2>
          </div>

          {/* 3 Packages Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Starter Package */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 style={{ color: '#0f172a' }} className="text-xl font-bold !text-slate-900 mb-1">
                  Starter
                </h3>
                <p style={{ color: '#64748b' }} className="text-xs !text-slate-500 mb-4">
                  Perfect for small businesses
                </p>
                <div style={{ color: '#00c853' }} className="text-3xl sm:text-4xl font-extrabold !text-[#00c853] mb-6">
                  KSh 35,000
                </div>

                <ul className="space-y-3.5 mb-8 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">1-3 page website</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">Mobile responsive design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">WhatsApp integration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">Basic SEO setup</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={handleScrollToQuote}
                style={{ backgroundColor: '#00c853', color: '#ffffff' }}
                className="w-full py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white font-bold text-sm tracking-wide text-center transition-all block cursor-pointer shadow-md shadow-[#00c853]/25 active:scale-[0.98]"
              >
                Choose Starter →
              </a>
            </div>

            {/* Business Growth (Most Popular) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl relative flex flex-col justify-between border-2 border-[#00c853] ring-2 ring-[#00c853]/25">
              <div 
                style={{ backgroundColor: '#00c853', color: '#ffffff' }}
                className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#00c853] !text-white text-[11px] font-bold uppercase tracking-wider shadow-md shadow-[#00c853]/35"
              >
                Most Popular
              </div>

              <div>
                <h3 style={{ color: '#0f172a' }} className="text-xl font-bold !text-slate-900 mb-1">
                  Business Growth
                </h3>
                <p style={{ color: '#64748b' }} className="text-xs !text-slate-500 mb-4">
                  For growing businesses
                </p>
                <div style={{ color: '#00c853' }} className="text-3xl sm:text-4xl font-extrabold !text-[#00c853] mb-6">
                  KSh 85,000+
                </div>

                <ul className="space-y-3.5 mb-8 text-sm font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">5-10 page website</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">E-commerce setup (optional)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">Social media setup &amp; management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">SEO &amp; lead generation</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={handleScrollToQuote}
                style={{ backgroundColor: '#00c853', color: '#ffffff' }}
                className="w-full py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white font-bold text-sm tracking-wide text-center transition-all block cursor-pointer shadow-lg shadow-[#00c853]/35 active:scale-[0.98]"
              >
                Choose Business →
              </a>
            </div>

            {/* AI & Automation */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 style={{ color: '#0f172a' }} className="text-xl font-bold !text-slate-900 mb-1">
                  AI &amp; Automation
                </h3>
                <p style={{ color: '#64748b' }} className="text-xs !text-slate-500 mb-4">
                  Work smarter, not harder
                </p>
                <div style={{ color: '#00c853' }} className="text-3xl sm:text-4xl font-extrabold !text-[#00c853] mb-6">
                  KSh 120,000+
                </div>

                <ul className="space-y-3.5 mb-8 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">AI chatbots &amp; automation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">CRM &amp; business systems</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">Workflow automation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
                    <span style={{ color: '#334155' }} className="!text-slate-700">Custom AI solutions</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={handleScrollToQuote}
                style={{ backgroundColor: '#00c853', color: '#ffffff' }}
                className="w-full py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white font-bold text-sm tracking-wide text-center transition-all block cursor-pointer shadow-md shadow-[#00c853]/25 active:scale-[0.98]"
              >
                Discuss Your Project →
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 06 / WHAT OUR CLIENTS SAY: TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              What Our Clients Say
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Trusted by businesses across Kenya and East Africa.
            </p>
          </div>

          {/* 4 Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item) => (
              <div 
                key={item.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-[#00c853] hover:shadow-lg transition-all"
              >
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                  {item.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                  <img 
                    src={item.avatar} 
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover shrink-0 border border-stone-200 dark:border-slate-700"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.author}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* FAQ: QUESTIONS OWNERS ASK */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10 text-center sm:text-left">
            QUESTIONS OWNERS ASK
          </h2>

          <div className="space-y-4">
            
            {/* Q1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs transition-colors">
              <button 
                type="button"
                onClick={() => toggleFaq(1)}
                aria-expanded={openFaqIndex === 1}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer select-none"
              >
                <span>How much does a website cost?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaqIndex === 1 ? 'rotate-180 text-teal-600' : ''}`} />
              </button>
              {openFaqIndex === 1 && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-200">
                  Sites start at KSh 35,000. You get a fixed quote within 48 hours.
                </p>
              )}
            </div>

            {/* Q2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs transition-colors">
              <button 
                type="button"
                onClick={() => toggleFaq(2)}
                aria-expanded={openFaqIndex === 2}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer select-none"
              >
                <span>Do I own the code?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaqIndex === 2 ? 'rotate-180 text-teal-600' : ''}`} />
              </button>
              {openFaqIndex === 2 && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-200">
                  Yes. Full source code ownership is included in every project.
                </p>
              )}
            </div>

            {/* Q3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs transition-colors">
              <button 
                type="button"
                onClick={() => toggleFaq(3)}
                aria-expanded={openFaqIndex === 3}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer select-none"
              >
                <span>Can I pay in instalments?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaqIndex === 3 ? 'rotate-180 text-teal-600' : ''}`} />
              </button>
              {openFaqIndex === 3 && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-200">
                  Yes. We work on standard milestone payments: 40% initial deposit, 30% after design &amp; staging sign-off, and 30% upon final live deployment.
                </p>
              )}
            </div>

            {/* Q4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs transition-colors">
              <button 
                type="button"
                onClick={() => toggleFaq(4)}
                aria-expanded={openFaqIndex === 4}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer select-none"
              >
                <span>Do you offer maintenance after launch?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaqIndex === 4 ? 'rotate-180 text-teal-600' : ''}`} />
              </button>
              {openFaqIndex === 4 && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-200">
                  30 days of support is included, then monthly plans are available.
                </p>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* LEAD FORM CONTAINER: TELL US WHAT YOU NEED. GET A QUOTE IN 24 HOURS */}
      {/* ========================================================================= */}
      <section id="quote-section" className="py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-6 sm:p-10 lg:p-16 rounded-3xl bg-gradient-to-br from-[#00c853] via-[#00a846] to-[#008f3d] !text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading & Value Prop */}
              <div className="lg:col-span-6 space-y-4">
                <h2 
                  style={{ color: '#ffffff' }}
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight !text-white"
                >
                  Tell us what you need. Get a quote in 24 hours.
                </h2>
                <p 
                  style={{ color: '#f0fdf4' }}
                  className="text-sm sm:text-base !text-emerald-50 max-w-md leading-relaxed font-normal"
                >
                  Three fields, no commitment. We reply on WhatsApp or email within 2 hours during business hours.
                </p>
                <div className="pt-2 sm:pt-4 flex items-center gap-3 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span style={{ color: '#ffffff' }} className="!text-white">100% confidential · No spam guaranteed</span>
                </div>
              </div>

              {/* Right Column: Floating White Form Card */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-900 shadow-2xl">
                  {isSubmitted ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#00c853] mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-[#00c853]" />
                      </div>
                      <h3 style={{ color: '#0f172a' }} className="text-xl font-bold !text-slate-900">
                        Thank You, {quoteName}!
                      </h3>
                      <p style={{ color: '#475569' }} className="text-sm !text-slate-600 max-w-xs mx-auto leading-relaxed">
                        Your request details have been dispatched to our official WhatsApp (+254 118 746 676). We will reply within 2 hours.
                      </p>
                      <button
                        onClick={handleOpenWhatsAppFromForm}
                        style={{ backgroundColor: '#00c853', color: '#ffffff' }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white text-sm font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-[0.98]"
                      >
                        <MessageSquare className="w-4 h-4 text-white" />
                        <span className="!text-white">Open WhatsApp Chat</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                      <div>
                        <label 
                          style={{ color: '#1e293b' }}
                          className="block text-xs font-bold !text-slate-800 uppercase mb-1.5"
                        >
                          Your name
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteName}
                          onChange={(e) => setQuoteName(e.target.value)}
                          placeholder="e.g. Grace Wanjiku"
                          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm !text-slate-900 !bg-white placeholder:!text-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/25 shadow-xs"
                        />
                      </div>

                      <div>
                        <label 
                          style={{ color: '#1e293b' }}
                          className="block text-xs font-bold !text-slate-800 uppercase mb-1.5"
                        >
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={quotePhone}
                          onChange={(e) => setQuotePhone(e.target.value)}
                          placeholder="+254 7XX XXX XXX"
                          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm !text-slate-900 !bg-white placeholder:!text-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/25 shadow-xs"
                        />
                      </div>

                      <div>
                        <label 
                          style={{ color: '#1e293b' }}
                          className="block text-xs font-bold !text-slate-800 uppercase mb-1.5"
                        >
                          What do you need?
                        </label>
                        <textarea
                          rows={3}
                          value={quoteNeeds}
                          onChange={(e) => setQuoteNeeds(e.target.value)}
                          placeholder="e.g. online shop with M-Pesa & AI automation"
                          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm !text-slate-900 !bg-white placeholder:!text-slate-400 focus:outline-none focus:border-[#00c853] focus:ring-2 focus:ring-[#00c853]/25 resize-none shadow-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ backgroundColor: '#00c853', color: '#ffffff' }}
                        className="w-full py-3.5 rounded-xl bg-[#00c853] hover:bg-[#00b34a] !text-white text-sm font-bold tracking-wide transition-all shadow-lg shadow-[#00c853]/30 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="!text-white">Sending...</span>
                        ) : (
                          <>
                            <span className="!text-white">Send my request</span>
                            <ArrowRight className="w-4 h-4 !text-white" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
