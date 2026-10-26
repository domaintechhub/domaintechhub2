import React, { useState, useEffect, useRef } from 'react';
import { AGENCY_INFO } from '../data/portfolioData';
import { saveLead } from '../utils/leadDispatch';
import { trackEvent } from '../utils/analytics';

export type BuildLayerKey = 'build' | 'sell' | 'grow' | 'run';

export interface HeroProps {
  onNavigate?: (sectionId: string, subTab?: string) => void;
  onSelectCalculatorService?: (serviceId: string) => void;
  onSelectBuildLayer?: (layer: BuildLayerKey) => void;
}

const TOAST_MESSAGES = [
  'KSh 4,500 received for order #1043',
  'eTIMS invoice sent for order #1043',
  'KSh 1,200 received for order #1044',
  'KSh 9,800 received for order #1045',
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stageY, setStageY] = useState(0);
  const [toastIndex, setToastIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const agencyPhone = AGENCY_INFO.whatsapp || '254118746676';

  // Scroll listener for desktop stage parallax
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;

          if (window.innerWidth >= 900) {
            const clamped = Math.min(sy, 900);
            setStageY(-clamped * 0.07);
          } else {
            setStageY(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toast cycling: every 4 seconds show one toast for 2.8s
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setToastVisible(false);
      setTimeout(() => {
        setToastIndex((prev) => (prev + 1) % TOAST_MESSAGES.length);
        setToastVisible(true);
      }, 450);
    }, 4000);

    return () => clearInterval(cycleInterval);
  }, []);



  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      nameInputRef.current?.focus();
      return;
    }
    if (!phone.trim()) {
      phoneInputRef.current?.focus();
      return;
    }

    try {
      saveLead({
        source: 'quick_contact',
        sourceTitle: 'Hero Inline Quote Form',
        fullName: name.trim(),
        email: '',
        phone: phone.trim(),
        serviceOrItem: 'AI Solutions, Web Design & Digital Marketing (Free Quote)',
        notes: 'Submitted via Hero inline form on domaintechhubs.com',
      });
    } catch (err) {
      console.warn('Error saving lead locally:', err);
    }

    trackEvent('generate_lead', {
      method: 'hero_form',
      page_path: window.location.pathname,
    });

    const prefilledText = `*New quote request*\nName: ${name.trim()}\nWhatsApp: ${phone.trim()}`;
    const whatsappUrl = `https://wa.me/${agencyPhone}?text=${encodeURIComponent(prefilledText)}`;
    window.open(whatsappUrl, '_blank', 'noopener');
  };


  return (
    <>
      {/* Hero Section Container */}
      <section
        className="relative w-full bg-[#FFFFFF] text-[#0F2A20] selection:bg-[#E6F4EC] selection:text-[#0F2A20] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 border-b border-[#D7E3DB] overflow-x-clip"
        style={{
          paddingLeft: 'clamp(20px, 5.5vw, 80px)',
          paddingRight: 'clamp(20px, 5.5vw, 80px)',
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Main 2-Column Hero Grid (1.15fr / 0.85fr on desktop, single column below 900px) */}
          <div className="grid grid-cols-1 min-[900px]:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-start max-w-xl min-[900px]:max-w-none">
              
              {/* 1. H1, three lines, 800 weight, tight letter spacing, size clamp */}
              <h1
                className="font-extrabold text-[#0F2A20] tracking-tight leading-[1.12] mb-5 text-[clamp(28px,5.5vw,36px)] sm:text-[clamp(34px,4.4vw,56px)]"
              >
                <span className="block hero-h1-line-1">
                  AI Solutions,
                </span>
                <span className="block hero-h1-line-2 text-[#12A150]">
                  Web Design &amp; Digital Marketing
                </span>
                <span className="block hero-h1-line-3">
                  That Grow Your Business
                </span>
              </h1>

              {/* 2. Subtitle (muted, ~20px) */}
              <p className="hero-subtitle text-[#506259] text-base sm:text-lg lg:text-[20px] leading-relaxed mb-8 max-w-xl">
                We help Kenyan businesses attract more customers, build a strong online presence, and save time through modern websites, AI-powered solutions, and results-driven digital marketing.
              </p>

              {/* 3. Inline quote form */}
              <form
                onSubmit={handleFormSubmit}
                className="hero-form w-full mb-4"
                noValidate
              >
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-white border border-[#D7E3DB] shadow-sm">
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-label="Your name"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-[#FFFFFF] text-[#0F2A20] placeholder-[#7B8B82] text-sm font-medium border border-[#D7E3DB] sm:border-transparent focus:border-[#12A150] focus:outline-none focus:ring-3 focus:ring-[#F5B335] transition-all"
                  />
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp number"
                    aria-label="WhatsApp number"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-[#FFFFFF] text-[#0F2A20] placeholder-[#7B8B82] text-sm font-medium border border-[#D7E3DB] sm:border-transparent focus:border-[#12A150] focus:outline-none focus:ring-3 focus:ring-[#F5B335] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-[#12A150] text-white text-sm font-bold whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#12A150]/25 active:translate-y-0 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-3 focus:ring-[#F5B335]"
                  >
                    Get my free quote
                  </button>
                </div>
              </form>

              {/* Small faint line */}
              <p className="text-xs text-[#7B8B82]">
                Reply within 2 hours, Mon–Fri 8am–5pm EAT. Westlands, Nairobi.
              </p>

            </div>

            {/* RIGHT COLUMN (THE "STAGE") */}
            <div
              className="relative flex items-center justify-center min-h-[580px] sm:min-h-[640px] pt-4 min-[900px]:pt-0"
              style={{
                transform: `translateY(${stageY}px)`,
                transition: 'transform 0.08s ease-out',
              }}
              aria-hidden="true"
            >
              {/* Thin 1.5px circular outline ring behind phone mockup */}
              <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border-[1.5px] border-[#D7E3DB] pointer-events-none -z-0" />

              {/* Phone Mockup (290x590, dark ink frame, 44px radius, soft shadow) */}
              <div className="hero-phone relative w-[290px] h-[590px] rounded-[44px] bg-[#0F2A20] p-3 shadow-2xl shadow-[#0F2A20]/20 z-10 flex flex-col justify-between overflow-hidden border-[3px] border-[#0F2A20]">
                
                {/* Phone Top Notch / Speaker pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0F2A20] rounded-full z-40 flex items-center justify-center">
                  <div className="w-10 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Phone Inner Screen */}
                <div className="relative w-full h-full bg-[#FFFFFF] rounded-[36px] overflow-hidden flex flex-col justify-between text-[#0F2A20]">
                  
                  {/* Shop Checkout Header */}
                  <div className="pt-7 px-5 pb-3 border-b border-[#D7E3DB]">
                    <div className="text-[11px] font-bold tracking-wider text-[#7B8B82] uppercase mb-0.5">
                      Checkout
                    </div>
                    <div className="text-base font-bold text-[#0F2A20]">
                      Mama Njeri Fabrics
                    </div>
                  </div>

                  {/* Order Line Items */}
                  <div className="px-5 py-4 space-y-3.5 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#506259] font-medium">Kitenge dress ×1</span>
                      <span className="text-[#0F2A20] font-bold">KSh 3,800</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#506259] font-medium">Delivery, Nairobi</span>
                      <span className="text-[#0F2A20] font-bold">KSh 700</span>
                    </div>

                    <div className="pt-3 border-t border-[#D7E3DB] flex items-center justify-between">
                      <span className="text-sm font-bold text-[#0F2A20]">Total</span>
                      <span className="text-base font-extrabold text-[#0F2A20]">KSh 4,500</span>
                    </div>

                    {/* Order summary info badge */}
                    <div className="mt-4 p-3 rounded-xl bg-[#E6F4EC] border border-[#12A150]/20 text-[11px] text-[#0F2A20] space-y-1">
                      <div className="font-semibold text-[#12A150]">Instant mobile checkout</div>
                      <div className="text-[#506259]">Safaricom M-Pesa Daraja STK Push prompt will appear on your phone.</div>
                    </div>
                  </div>

                  {/* Pay with M-Pesa Button */}
                  <div className="p-4 bg-white border-t border-[#D7E3DB] relative z-20">
                    <div className="hero-mpesa-btn w-full py-3.5 rounded-2xl bg-[#12A150] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
                      <span>Pay with M-Pesa</span>
                    </div>
                  </div>

                  {/* M-Pesa Request Bottom Sheet (slides up 12-18%, stays to 64-69%) */}
                  <div className="hero-mpesa-sheet absolute inset-x-0 bottom-0 bg-[#FFFFFF] rounded-t-[28px] border-t-2 border-[#12A150] shadow-2xl p-5 z-30">
                    <div className="w-10 h-1 bg-[#D7E3DB] rounded-full mx-auto mb-3" />
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#12A150]" />
                      <div className="text-xs font-bold text-[#0F2A20]">
                        M-Pesa payment request
                      </div>
                    </div>

                    <p className="text-[11px] text-[#506259] mb-4 leading-snug">
                      Pay KSh 4,500 to Mama Njeri Fabrics. Enter your PIN.
                    </p>

                    {/* 4 PIN Boxes */}
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-10 h-11 rounded-xl border-2 border-[#D7E3DB] bg-[#F7FAF8] flex items-center justify-center">
                        <span className="hero-pin-dot-1 w-3 h-3 rounded-full bg-[#0F2A20]" />
                      </div>
                      <div className="w-10 h-11 rounded-xl border-2 border-[#D7E3DB] bg-[#F7FAF8] flex items-center justify-center">
                        <span className="hero-pin-dot-2 w-3 h-3 rounded-full bg-[#0F2A20]" />
                      </div>
                      <div className="w-10 h-11 rounded-xl border-2 border-[#D7E3DB] bg-[#F7FAF8] flex items-center justify-center">
                        <span className="hero-pin-dot-3 w-3 h-3 rounded-full bg-[#0F2A20]" />
                      </div>
                      <div className="w-10 h-11 rounded-xl border-2 border-[#D7E3DB] bg-[#F7FAF8] flex items-center justify-center">
                        <span className="hero-pin-dot-4 w-3 h-3 rounded-full bg-[#0F2A20]" />
                      </div>
                    </div>

                    <div className="text-center text-[10px] text-[#7B8B82] mt-2">
                      Encrypted Daraja 3.0 session
                    </div>
                  </div>

                  {/* Full-Screen Payment Received Overlay (fades in 64-69%, stays to 88%, gone by 94%) */}
                  <div className="hero-success-screen absolute inset-0 bg-[#12A150] text-white flex flex-col items-center justify-center p-6 text-center z-40">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-lg font-extrabold mb-1">
                      Payment received
                    </div>
                    <div className="text-xs text-white/90 font-medium">
                      KSh 4,500 confirmed in seconds
                    </div>
                  </div>

                </div>
              </div>

              {/* Beside Phone: eTIMS Invoice Card (right edge, in front, rotated 3deg, width 200px on mobile) */}
              <div className="hero-invoice-card absolute -right-3 sm:-right-8 top-1/3 z-20 w-[200px] sm:w-[220px] p-4 rounded-2xl bg-white border border-[#D7E3DB] shadow-xl text-[#0F2A20] pointer-events-none">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="text-[11px] font-bold text-[#0F2A20]">
                    Invoice sent to customer
                  </div>
                  {/* Amber eTIMS stamp */}
                  <span className="px-1.5 py-0.5 rounded-md bg-[#F5B335]/20 text-[#0F2A20] border border-[#F5B335] text-[10px] font-extrabold tracking-wider shrink-0">
                    eTIMS
                  </span>
                </div>

                <div className="text-[11px] text-[#506259] mb-1">
                  Invoice no. 0001042
                </div>
                <div className="text-xs font-bold text-[#0F2A20] mb-2.5">
                  Total incl. VAT KSh 4,500
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#12A150]">
                  <span>✓</span>
                  <span>Recorded for KRA</span>
                </div>
              </div>

              {/* Bottom-left of stage: "Example payments" label & Toast card (hidden below 900px) */}
              <div className="hidden min-[900px]:flex flex-col items-start absolute left-0 bottom-4 z-20 pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B8B82] mb-1.5">
                  Example payments
                </span>

                <div
                  className={`px-3.5 py-2 rounded-xl bg-white border border-[#D7E3DB] shadow-md flex items-center gap-2 text-xs font-medium text-[#0F2A20] transition-all duration-450 ${
                    toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#12A150] shrink-0" />
                  <span>{TOAST_MESSAGES[toastIndex]}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Scoped CSS Keyframes for Page Load and Phone 9s Loop */}
      <style>{`
        /* Page Load Fade-Rise */
        @keyframes heroFadeRise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-h1-line-1 {
          animation: heroFadeRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 0s both;
        }
        .hero-h1-line-2 {
          animation: heroFadeRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
        }
        .hero-h1-line-3 {
          animation: heroFadeRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 0.36s both;
        }
        .hero-phone {
          animation: heroFadeRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }
        .hero-subtitle {
          animation: heroFadeRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
        }
        .hero-form {
          animation: heroFadeRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
        }

        /* 9s Loop: Pay Button Press (9-12%) */
        @keyframes heroBtnPress {
          0%, 8.9% {
            transform: scale(1);
          }
          9%, 12% {
            transform: scale(0.95);
          }
          12.1%, 100% {
            transform: scale(1);
          }
        }
        .hero-mpesa-btn {
          animation: heroBtnPress 9s infinite ease-in-out;
        }

        /* 9s Loop: M-Pesa Request Sheet Slide-up (12-18% in, 64-69% out) */
        @keyframes heroSheetSlide {
          0%, 11.9% {
            transform: translateY(105%);
            opacity: 0;
          }
          18%, 64% {
            transform: translateY(0);
            opacity: 1;
          }
          69%, 100% {
            transform: translateY(105%);
            opacity: 0;
          }
        }
        .hero-mpesa-sheet {
          animation: heroSheetSlide 9s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 9s Loop: PIN Dots Pop In (28%, 34%, 40%, 46%) */
        @keyframes heroPinDot1 {
          0%, 27.9% {
            opacity: 0;
            transform: scale(0.3);
          }
          28%, 64% {
            opacity: 1;
            transform: scale(1);
          }
          65%, 100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
        @keyframes heroPinDot2 {
          0%, 33.9% {
            opacity: 0;
            transform: scale(0.3);
          }
          34%, 64% {
            opacity: 1;
            transform: scale(1);
          }
          65%, 100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
        @keyframes heroPinDot3 {
          0%, 39.9% {
            opacity: 0;
            transform: scale(0.3);
          }
          40%, 64% {
            opacity: 1;
            transform: scale(1);
          }
          65%, 100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
        @keyframes heroPinDot4 {
          0%, 45.9% {
            opacity: 0;
            transform: scale(0.3);
          }
          46%, 64% {
            opacity: 1;
            transform: scale(1);
          }
          65%, 100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }

        .hero-pin-dot-1 {
          animation: heroPinDot1 9s infinite ease-out;
        }
        .hero-pin-dot-2 {
          animation: heroPinDot2 9s infinite ease-out;
        }
        .hero-pin-dot-3 {
          animation: heroPinDot3 9s infinite ease-out;
        }
        .hero-pin-dot-4 {
          animation: heroPinDot4 9s infinite ease-out;
        }

        /* 9s Loop: Green Success Overlay (fade in 64-69%, stays to 88%, gone by 94%) */
        @keyframes heroSuccessScreen {
          0%, 63.9% {
            opacity: 0;
            pointer-events: none;
            transform: scale(0.96);
          }
          69%, 88% {
            opacity: 1;
            pointer-events: auto;
            transform: scale(1);
          }
          94%, 100% {
            opacity: 0;
            pointer-events: none;
            transform: scale(1.02);
          }
        }
        .hero-success-screen {
          animation: heroSuccessScreen 9s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 9s Loop: eTIMS Invoice Card (slide in 74-80%, stay until 92%, fade out by 96%) */
        @keyframes heroInvoiceCard {
          0%, 73.9% {
            opacity: 0;
            transform: translateX(35px) rotate(3deg);
          }
          80%, 92% {
            opacity: 1;
            transform: translateX(0) rotate(3deg);
          }
          96%, 100% {
            opacity: 0;
            transform: translateX(15px) rotate(3deg);
          }
        }
        .hero-invoice-card {
          animation: heroInvoiceCard 9s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Reduced Motion Mode: No animation, show final complete states */
        @media (prefers-reduced-motion: reduce) {
          .hero-h1-line-1,
          .hero-h1-line-2,
          .hero-h1-line-3,
          .hero-phone,
          .hero-subtitle,
          .hero-form,
          .hero-mpesa-btn,
          .hero-mpesa-sheet,
          .hero-pin-dot-1,
          .hero-pin-dot-2,
          .hero-pin-dot-3,
          .hero-pin-dot-4,
          .hero-success-screen,
          .hero-invoice-card {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
          .hero-invoice-card {
            transform: rotate(3deg) !important;
          }
          .hero-success-screen {
            display: none !important;
          }
          .hero-mpesa-sheet {
            transform: translateY(0) !important;
          }
          .hero-pin-dot-1,
          .hero-pin-dot-2,
          .hero-pin-dot-3,
          .hero-pin-dot-4 {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        }
      `}</style>
    </>
  );
};
