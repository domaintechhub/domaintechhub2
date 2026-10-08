import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'FR' | 'SW';

export interface LanguageOption {
  code: Language;
  label: string;
  name: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'EN', label: 'EN', name: 'English' },
  { code: 'FR', label: 'FR', name: 'Français' },
  { code: 'SW', label: 'SW', name: 'Kiswahili' },
];

/**
 * Custom hook to safely persist and synchronize state in localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        try {
          return JSON.parse(item) as T;
        } catch {
          return item as unknown as T;
        }
      }
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        const serialized = typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore);
        window.localStorage.setItem(key, serialized);
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          let parsed: T;
          try {
            parsed = JSON.parse(e.newValue) as T;
          } catch {
            parsed = e.newValue as unknown as T;
          }
          setStoredValue(parsed);
        } catch {
          // Ignore parse errors
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key]);

  return [storedValue, setValue];
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageOptions: LanguageOption[];
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.tools': 'Client Tools',
    'nav.projects': 'Projects',
    'nav.portfolio': 'Projects',
    'nav.more': 'More',
    'nav.clientPortal': 'Client Portal',
    'nav.insights': 'Insights & Trends',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact Us',
    'nav.bookCall': 'Book Strategy Call',
    'nav.whatsapp': 'WhatsApp',
    'nav.subheading': 'Nairobi · Digital Engineering',
    'nav.techStack': 'Our Specialized Tech Stack',
    'nav.calculator': 'Project Cost Calculator',
    'nav.audit': 'Live SEO & Speed Audit',
    'nav.domains': 'Domains & Cloud Hosting',
    'nav.exploreAll': 'Explore Full Catalog',

    // Hero
    'hero.badge': 'INDEPENDENT ENGINEERING STUDIO · NAIROBI',
    'hero.title1': 'Engineering',
    'hero.titleHighlight': 'High-Converting',
    'hero.title2': 'Websites & Bespoke Web Apps.',
    'hero.desc': 'We are an independent engineering studio in Nairobi crafting fast, custom websites, frictionless M-Pesa checkouts, and resilient web applications for growing brands.',
    'hero.btnEstimate': 'Calculate Project Cost',
    'hero.btnAudit': 'Free Website Speed Audit',
    'hero.btnServices': 'Explore Services',
    'hero.modernEng': 'Modern Engineering',
    'hero.modernEngDesc': 'React, Next.js, TypeScript, and clean code standards. No clunky bloated templates; built for speed and security.',
    'hero.mpesaNative': 'M-Pesa & Payment Native',
    'hero.mpesaNativeDesc': 'Seamless local payment integrations with Safaricom Daraja STK Push, Flutterwave, and global Stripe checkouts.',
    'hero.growthLeads': 'Tangible Growth & Leads',
    'hero.growthLeadsDesc': 'Data-backed SEO campaigns, Google Ads PPC, and automated WhatsApp conversion funnels that generate real buyers.',
    'hero.statProjects': 'Projects Completed',
    'hero.statRetention': 'Client Retention Rate',
    'hero.statScore': 'Lighthouse Speed Guarantee',
    'hero.statTurnaround': 'Average Sprint Launch',

    // About / Stats
    'about.kicker': 'About Domain Tech Hub · Verified Track Record & Impact',
    'about.title': 'Built on proven performance, uptime & tangible client revenue.',
    'about.subtitle': 'We judge our engineering not by lines of code, but by conversion velocity, top Google rankings, and financial scale achieved by African enterprises.',
    'about.btnCases': 'View Case Studies',

    // Services
    'services.kicker': 'COMPLETE DIGITAL SOLUTIONS · SERVICES CATALOG',
    'services.title': 'Everything your business needs to excel online.',
    'services.subtitle': 'From bespoke software engineering and high-converting e-commerce to local SEO dominance and WhatsApp marketing automation. Explore our end-to-end capabilities.',
    'services.searchPlaceholder': 'Search services or tech (e.g. M-Pesa, SEO)...',
    'services.from': 'Starting from',
    'services.details': 'Details',
    'services.quote': 'Quote',

    // Tech Stack
    'tech.kicker': 'ENGINEERING EXCELLENCE · OUR TECH STACK',
    'tech.title': 'Specialized technologies built for speed, security & scale.',
    'tech.subtitle': "We don't rely on fragile off-the-shelf site builders. Our engineers craft production-grade software using industry-standard frameworks, battle-tested databases, and resilient cloud architectures.",
    'tech.searchPlaceholder': 'Search stack (e.g. AWS, Python)...',

    // Calculator
    'calc.kicker': 'TRANSPARENT PRICING · INSTANT ESTIMATOR',
    'calc.title': 'Interactive Project Cost Calculator',
    'calc.subtitle': 'Configure your technical scope, select tailored integrations (M-Pesa, WhatsApp, AI, SEO), and receive an instant transparent project quotation with zero surprises.',
    'calc.step1': '1. Select Primary Service',
    'calc.step2': '2. Project Tier & Scale',
    'calc.step3': '3. Tailored Add-Ons & Technical Modules',
    'calc.step4': '4. Project Timeline & Delivery Pace',
    'calc.summaryTitle': 'Quotation Summary',
    'calc.instantEst': 'Instant Estimate',
    'calc.estInvestment': 'Estimated Investment',
    'calc.btnLock': 'Book Strategy & Lock Quote',
    'calc.btnSendWA': 'Send Quote to DTH WhatsApp',
    'calc.btnCopy': 'Copy Full Quote Breakdown',
    'calc.copied': 'Quote Copied to Clipboard',

    // Audit
    'audit.kicker': 'DIAGNOSTIC UTILITY · 100% FREE',
    'audit.title': 'Illustrative Website & SEO Audit Preview',
    'audit.subtitle': 'Explore a sample report. This demo does not scan your website or measure Core Web Vitals, SEO, mobile support, or security.',
    'audit.urlLabel': 'Website URL / Domain Name',
    'audit.keywordLabel': 'Target Search Keyword (Optional)',
    'audit.btnRun': 'Generate Demo Preview',
    'audit.analyzing': 'Preparing demo preview...',

    // Domains
    'domain.kicker': 'INFRASTRUCTURE · DOMAINS & CLOUD HOSTING',
    'domain.title': 'Explore domain and hosting options.',
    'domain.subtitle': 'Browse example domain options and hosting plans. Live registry availability is not checked on this page.',
    'domain.lookupTab': 'Domain Name Lookup',
    'domain.hostingTab': 'Managed Cloud Hosting Plans',
    'domain.btnCheck': 'Show Suggestions',

    // Portfolio
    'port.kicker': 'PROVEN TRACK RECORD · CASE STUDIES',
    'port.title': 'Transformative digital results for ambitious brands.',
    'port.subtitle': 'Explore how Domain Tech Hub delivers revenue acceleration, top Google rankings, and seamless operational workflows across Kenya and beyond.',
    'port.turnaround': 'Estimated Turnaround:',
    'port.btnRead': 'Read Full Case Study',
    'port.deliverySchedule': 'Verified Delivery Schedule & Sprint Pace',
    'port.milestoneBreakdown': 'Phased Milestone Breakdown:',

    // FAQ
    'faq.kicker': 'CLIENT QUESTIONS · TRANSPARENT ANSWERS',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Have questions about M-Pesa integrations, development timelines, SEO guarantees, or source code ownership? Find straightforward answers below before booking your strategy session.',
    'faq.expandAll': 'Expand All',
    'faq.collapseAll': 'Collapse All',
    'faq.unlistedTitle': 'Have a question not listed here?',
    'faq.unlistedSubtitle': 'Speak directly with our senior engineers and digital architects in Nairobi. Average response under 20 minutes.',

    // Contact
    'contact.kicker': 'DIRECT ENGAGEMENT · SCHEDULE A STRATEGY SESSION',
    'contact.title': "Let's build something exceptional together.",
    'contact.subtitle': 'Book a complimentary 30-minute discovery session with our senior digital strategists. We will review your goals, recommend architectures, and outline estimated budgets.',
    'contact.btnSubmit': 'Confirm Strategy Consultation',

    // Footer
    'footer.tagline': 'Innovate. Connect. Succeed. Nairobi’s premier digital engineering agency.',
    'footer.rights': 'All rights reserved.',
    'footer.quickLinks': 'Quick Navigation',
    'footer.servicesTitle': 'Specialized Services',
    'footer.contactTitle': 'Direct Contact Desk',

    // Menu Drawer
    'menu.searchPlaceholder': 'Search services, case studies, utilities, guides...',
    'menu.mainNav': 'Main Navigation',
    'menu.solutions': 'Solutions & Platforms',
    'menu.preferences': 'Preferences & Localization',
    'menu.language': 'Language',
    'menu.currency': 'Currency',
    'menu.theme': 'Theme Mode',
    'menu.active': 'Active',
    'menu.selectLanguage': 'Choose Language',
    'menu.close': 'Close',
    'menu.menu': 'Menu',
    'menu.contactCta': 'Contact Us (Book Free Strategy Session)'
  },
  FR: {
    // Nav
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.about': 'À Propos',
    'nav.tools': 'Outils Clients',
    'nav.projects': 'Projets',
    'nav.portfolio': 'Projets',
    'nav.more': 'Plus',
    'nav.clientPortal': 'Portail Client',
    'nav.insights': 'Insights & Tendances',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contactez-nous',
    'nav.bookCall': 'Réserver un Appel',
    'nav.whatsapp': 'WhatsApp',
    'nav.subheading': 'Nairobi · Ingénierie Numérique',
    'nav.techStack': 'Notre Stack Technique',
    'nav.calculator': 'Calculateur de Coûts',
    'nav.audit': 'Audit SEO & Vitesse Gratuit',
    'nav.domains': 'Domaines & Hébergement Cloud',
    'nav.exploreAll': 'Voir le Catalogue Complet',

    // Hero
    'hero.badge': 'STUDIO D’INGÉNIERIE INDÉPENDANT · NAIROBI',
    'hero.title1': 'Ingénierie de',
    'hero.titleHighlight': 'Sites & Applications',
    'hero.title2': 'qui génèrent de réels résultats.',
    'hero.desc': 'Nous sommes un studio d’ingénierie indépendant à Nairobi. Nous concevons des sites web performants, des boutiques en ligne avec paiements M-Pesa et cartes internationales, et des applications sur mesure.',
    'hero.btnEstimate': 'Calculer le Coût du Projet',
    'hero.btnAudit': 'Audit de Vitesse Gratuit',
    'hero.btnServices': 'Explorer les Services',
    'hero.modernEng': 'Ingénierie Moderne',
    'hero.modernEngDesc': 'React, Next.js, TypeScript et normes de code propres. Pas de templates surchargés; conçu pour la rapidité et la sécurité.',
    'hero.mpesaNative': 'Intégration Paiements & M-Pesa',
    'hero.mpesaNativeDesc': 'Paiements locaux fluides avec Safaricom Daraja STK Push, Flutterwave, et paiements internationaux par carte Stripe.',
    'hero.growthLeads': 'Croissance & Leads Tangibles',
    'hero.growthLeadsDesc': 'Campagnes SEO basées sur les données, Google Ads PPC et tunnels de conversion WhatsApp qui génèrent de vrais clients.',
    'hero.statProjects': 'Projets Réalisés',
    'hero.statRetention': 'Taux de Rétention',
    'hero.statScore': 'Garantie Vitesse Lighthouse',
    'hero.statTurnaround': 'Lancement Moyen de Sprint',

    // About / Stats
    'about.kicker': 'À Propos de Domain Tech Hub · Résultats Vérifiés & Impact',
    'about.title': 'Fondé sur des performances prouvées, la disponibilité et la croissance des clients.',
    'about.subtitle': 'Nous mesurons notre ingénierie par les conversions, les classements Google #1 et l’échelle financière de nos partenaires.',
    'about.btnCases': 'Voir les Études de Cas',

    // Services
    'services.kicker': 'SOLUTIONS NUMÉRIQUES COMPLÈTES · CATALOGUE DE SERVICES',
    'services.title': 'Tout ce dont votre entreprise a besoin pour réussir en ligne.',
    'services.subtitle': 'Du développement logiciel sur mesure au commerce électronique à haute conversion, en passant par le SEO de pointe et l’automatisation WhatsApp.',
    'services.searchPlaceholder': 'Rechercher des services (ex: M-Pesa, SEO)...',
    'services.from': 'À partir de',
    'services.details': 'Détails',
    'services.quote': 'Devis',

    // Tech Stack
    'tech.kicker': 'EXCELLENCE DE L’INGÉNIERIE · NOTRE STACK TECHNIQUE',
    'tech.title': 'Des technologies spécialisées conçues pour la vitesse, la sécurité et l’échelle.',
    'tech.subtitle': 'Nous ne dépendons pas d’outils précaires. Nos ingénieurs conçoivent des solutions robustes avec des frameworks modernes et une infrastructure cloud résiliente.',
    'tech.searchPlaceholder': 'Rechercher la stack (ex: AWS, Python)...',

    // Calculator
    'calc.kicker': 'TARIFICATION TRANSPARENTE · ESTIMATION INSTANTANÉE',
    'calc.title': 'Calculateur Interactif de Coût de Projet',
    'calc.subtitle': 'Configurez votre périmètre technique, choisissez vos intégrations (M-Pesa, WhatsApp, IA, SEO) et obtenez un devis instantané et transparent.',
    'calc.step1': '1. Sélectionner le Service Principal',
    'calc.step2': '2. Échelle & Niveau du Projet',
    'calc.step3': '3. Modules Techniques & Options Sur Mesure',
    'calc.step4': '4. Délai et Rythme de Livraison',
    'calc.summaryTitle': 'Récapitulatif du Devis',
    'calc.instantEst': 'Estimation Instantanée',
    'calc.estInvestment': 'Investissement Estimé',
    'calc.btnLock': 'Réserver & Valider le Devis',
    'calc.btnSendWA': 'Envoyer le Devis via WhatsApp',
    'calc.btnCopy': 'Copier le Détail du Devis',
    'calc.copied': 'Devis Copié dans le Presse-papier',

    // Audit
    'audit.kicker': 'OUTIL DE DIAGNOSTIC · 100% GRATUIT',
    'audit.title': 'Aperçu illustratif d’audit de site et SEO',
    'audit.subtitle': 'Découvrez un exemple de rapport. Cette démo n’analyse pas votre site et ne mesure pas ses performances.',
    'audit.urlLabel': 'URL du Site Web / Nom de Domaine',
    'audit.keywordLabel': 'Mot-Clé de Recherche Cible (Optionnel)',
    'audit.btnRun': 'Générer un aperçu de démo',
    'audit.analyzing': 'Préparation de l’aperçu de démo...',

    // Domains
    'domain.kicker': 'INFRASTRUCTURE · DOMAINES & HÉBERGEMENT CLOUD',
    'domain.title': 'Découvrez les options de domaines et d’hébergement.',
    'domain.subtitle': 'Consultez des exemples de domaines et de forfaits. La disponibilité auprès du registre n’est pas vérifiée ici.',
    'domain.lookupTab': 'Recherche de Nom de Domaine',
    'domain.hostingTab': 'Plans d’Hébergement Cloud Géré',
    'domain.btnCheck': 'Afficher les suggestions',

    // Portfolio
    'port.kicker': 'RÉSULTATS PROUVÉS · ÉTUDES DE CAS',
    'port.title': 'Résultats numériques transformateurs pour marques ambitieuses.',
    'port.subtitle': 'Découvrez comment Domain Tech Hub génère des accélérations de revenus, des classements Google #1 et des flux opérationnels fluides.',
    'port.turnaround': 'Délai Estimé :',
    'port.btnRead': 'Lire l’Étude Complète',
    'port.deliverySchedule': 'Calendrier de Livraison & Rythme de Sprint',
    'port.milestoneBreakdown': 'Décomposition par Étapes Jalons :',

    // FAQ
    'faq.kicker': 'QUESTIONS CLIENTS · RÉPONSES TRANSPARENTES',
    'faq.title': 'Foire Aux Questions (FAQ)',
    'faq.subtitle': 'Des questions sur les intégrations M-Pesa, les délais de livraison, les garanties SEO ou la propriété du code source ? Trouvez les réponses ici.',
    'faq.expandAll': 'Tout Déplier',
    'faq.collapseAll': 'Tout Replier',
    'faq.unlistedTitle': 'Vous avez une question non listée ?',
    'faq.unlistedSubtitle': 'Discutez directement avec nos ingénieurs et architectes seniors à Nairobi. Réponse moyenne sous 20 minutes.',

    // Contact
    'contact.kicker': 'ENGAGEMENT DIRECT · RÉSERVER UNE SESSION STRATÉGIQUE',
    'contact.title': 'Bâtissons ensemble quelque chose d’exceptionnel.',
    'contact.subtitle': 'Réservez une session de cadrage gratuite de 30 minutes avec nos stratèges numériques. Nous analyserons vos objectifs et budgets prévisionnels.',
    'contact.btnSubmit': 'Confirmer la Consultation Stratégique',

    // Footer
    'footer.tagline': 'Innover. Connecter. Réussir. Agence d’ingénierie numérique de premier plan à Nairobi.',
    'footer.rights': 'Tous droits réservés.',
    'footer.quickLinks': 'Navigation Rapide',
    'footer.servicesTitle': 'Services Spécialisés',
    'footer.contactTitle': 'Contact Direct',

    // Menu Drawer
    'menu.searchPlaceholder': 'Rechercher des services, études de cas, outils, guides...',
    'menu.mainNav': 'Navigation Principale',
    'menu.solutions': 'Solutions & Plateformes',
    'menu.preferences': 'Préférences & Localisation',
    'menu.language': 'Langue',
    'menu.currency': 'Devise',
    'menu.theme': 'Mode Thème',
    'menu.active': 'Actif',
    'menu.selectLanguage': 'Choisir la Langue',
    'menu.close': 'Fermer',
    'menu.menu': 'Menu',
    'menu.contactCta': 'Contactez-nous (Réserver un Appel Gratuit)'
  },
  SW: {
    // Nav
    'nav.home': 'Mwanzo',
    'nav.services': 'Huduma',
    'nav.about': 'Kutuhusu',
    'nav.tools': 'Zana za Wateja',
    'nav.projects': 'Miradi',
    'nav.portfolio': 'Miradi',
    'nav.more': 'Zaidi',
    'nav.clientPortal': 'Lango la Mteja',
    'nav.insights': 'Makala & Mienendo',
    'nav.faq': 'Maswali ya Kawaida',
    'nav.contact': 'Wasiliana Nasi',
    'nav.bookCall': 'Panga Mazungumzo',
    'nav.whatsapp': 'WhatsApp',
    'nav.subheading': 'Nairobi · Uhandisi wa Kidijitali',
    'nav.techStack': 'Mifumo ya Teknolojia',
    'nav.calculator': 'Kikokotoo cha Bei',
    'nav.audit': 'Kaguzi ya Bure ya SEO',
    'nav.domains': 'Majina ya Tovuti & Hosting',
    'nav.exploreAll': 'Tazama Orodha Kamili',

    // Hero
    'hero.badge': 'STUDIO HURU YA UHANDISI · NAIROBI',
    'hero.title1': 'Ujenzi wa',
    'hero.titleHighlight': 'Tovuti na Mifumo',
    'hero.title2': 'Inayoleta Matokeo Halisi ya Kibiashara.',
    'hero.desc': 'Sisi ni studio huru ya uhandisi wa programu jijini Nairobi inayounda tovuti za kasi, maduka ya mtandaoni yenye M-Pesa STK Push, na programu maalum kwa biashara zinazokua.',
    'hero.btnEstimate': 'Kokotoa Bei ya Mradi',
    'hero.btnAudit': 'Kaguzi ya Bure ya Kasi',
    'hero.btnServices': 'Tazama Huduma',
    'hero.modernEng': 'Uhandisi wa Kisasa',
    'hero.modernEngDesc': 'React, Next.js, TypeScript na msimbo safi. Hakuna violezo vizito visivyofaa; imejengwa kwa kasi na usalama mkubwa.',
    'hero.mpesaNative': 'Malipo Rahisi ya M-Pesa',
    'hero.mpesaNativeDesc': 'Muunganisho wa papo hapo wa Safaricom Daraja STK Push, Flutterwave, na kadi za kimataifa za benki.',
    'hero.growthLeads': 'Ukuaji Halisi wa Mauzo',
    'hero.growthLeadsDesc': 'Mbinu za SEO zilizofanyiwa utafiti, matangazo ya Google Ads na mifumo ya WhatsApp inayovutia wateja halisi.',
    'hero.statProjects': 'Miradi Iliyokamilika',
    'hero.statRetention': 'Wateja Wanaoendelea',
    'hero.statScore': 'Kasi ya Tovuti (Google)',
    'hero.statTurnaround': 'Muda wa Kuanza Kazi',

    // About / Stats
    'about.kicker': 'Kutuhusu Domain Tech Hub · Matokeo Yaliyothibitishwa & Athari',
    'about.title': 'Imejengwa juu ya ufanisi uliothibitishwa, mifumo thabiti na ongezeko la mapato ya wateja.',
    'about.subtitle': 'Tunapima ubora wa uhandisi wetu kwa ongezeko la wateja, nafasi za kwanza Google na mapato halisi ya wafanyabiashara.',
    'about.btnCases': 'Tazama Miradi Yetu',

    // Services
    'services.kicker': 'SULUHISHO KAMILI ZA KIDIITALI · ORODHA YA HUDUMA',
    'services.title': 'Kila kitu ambacho biashara yako inahitaji ili ing\'ae mtandaoni.',
    'services.subtitle': 'Kuanzia programu maalum na maduka ya mtandaoni hadi huduma za SEO za Google na otomatiki ya WhatsApp. Tazama uwezo wetu kamili.',
    'services.searchPlaceholder': 'Tafuta huduma au teknolojia (mfano: M-Pesa, SEO)...',
    'services.from': 'Kuanzia',
    'services.details': 'Maelezo',
    'services.quote': 'Pata Bei',

    // Tech Stack
    'tech.kicker': 'UBORA WA UHANDISI · MIFUMO YA TEKNOLOJIA',
    'tech.title': 'Teknolojia maalum zilizojengwa kwa kasi, usalama na ukuaji.',
    'tech.subtitle': 'Hatudegemei zana hafifu za bure. Wahandisi wetu hutumia lugha imara za programu, hifadhidata za kisasa na mifumo salama ya wingu.',
    'tech.searchPlaceholder': 'Tafuta teknolojia (mfano: AWS, Python)...',

    // Calculator
    'calc.kicker': 'BEI WAZI · MAKADIRIO YA PAPO HAPO',
    'calc.title': 'Kikokotoo Shirikishi cha Gharama ya Mradi',
    'calc.subtitle': 'Chagua mahitaji ya mradi wako, unganisha M-Pesa, WhatsApp, AI au SEO, na upate makadirio halisi bila gharama zilizofichwa.',
    'calc.step1': '1. Chagua Huduma Kuu',
    'calc.step2': '2. Kiwango na Ukubwa wa Mradi',
    'calc.step3': '3. Vipengele vya Ziada & Muunganisho',
    'calc.step4': '4. Muda wa Mradi & Kasi ya Ukamilishaji',
    'calc.summaryTitle': 'Muhtasari wa Makadirio',
    'calc.instantEst': 'Makadirio ya Papo Hapo',
    'calc.estInvestment': 'Gharama Inayokadiriwa',
    'calc.btnLock': 'Weka Nafasi & Thibitisha Bei',
    'calc.btnSendWA': 'Tuma Makadirio kwa WhatsApp Yetu',
    'calc.btnCopy': 'Nakili Muhtasari wa Bei',
    'calc.copied': 'Bei Imenakiliwa!',

    // Audit
    'audit.kicker': 'ZANA YA UCHUNGUZI · BURE 100%',
    'audit.title': 'Mfano wa ripoti ya ukaguzi wa tovuti na SEO',
    'audit.subtitle': 'Tazama mfano wa ripoti. Onyesho hili halichunguzi tovuti yako wala kupima kasi, SEO, simu au usalama.',
    'audit.urlLabel': 'Anwani ya Tovuti / Jina la Domain',
    'audit.keywordLabel': 'Neno Kuu Unalolenga (Hiari)',
    'audit.btnRun': 'Tengeneza mfano wa ripoti',
    'audit.analyzing': 'Mfano wa ripoti unatayarishwa...',

    // Domains
    'domain.kicker': 'MIUNDOMBINU · MAJINA YA TOVUTI NA HOSTING',
    'domain.title': 'Tazama chaguo za domain na hosting.',
    'domain.subtitle': 'Tazama mifano ya domain na mipango ya hosting. Upatikanaji wa domain haukaguliwi hapa.',
    'domain.lookupTab': 'Tafuta Jina la Tovuti',
    'domain.hostingTab': 'Vifurushi vya Cloud Hosting',
    'domain.btnCheck': 'Onyesha mapendekezo',

    // Portfolio
    'port.kicker': 'MATOKEO YALIYOTHIBITISHWA',
    'port.title': 'Mageuzi ya kidijitali kwa biashara zinazojituma.',
    'port.subtitle': 'Tazama jinsi Domain Tech Hub inavyoongeza mapato, nafasi za kwanza Google na mifumo mizuri ya kazi.',
    'port.turnaround': 'Muda wa Kukamilika:',
    'port.btnRead': 'Soma Ushuhuda Kamili',
    'port.deliverySchedule': 'Ratiba ya Uwasilishaji Iliyothibitishwa',
    'port.milestoneBreakdown': 'Mgawanyo wa Hatua za Kazi:',

    // FAQ
    'faq.kicker': 'MASWALI YA WATEJA · MAJIBU WAZI',
    'faq.title': 'Maswali Yanayoulizwa Mara kwa Mara',
    'faq.subtitle': 'Una maswali kuhusu M-Pesa, muda wa kazi, au umiliki wa source code? Pata majibu ya moja kwa moja hapa chini.',
    'faq.expandAll': 'Fungua Yote',
    'faq.collapseAll': 'Funga Yote',
    'faq.unlistedTitle': 'Je, una swali ambalo halijaorodheshwa hapa?',
    'faq.unlistedSubtitle': 'Zungumza moja kwa moja na wahandisi wetu wakuu hapa Nairobi. Jibu ndani ya dakika 20.',

    // Contact
    'contact.kicker': 'MAZUNGUMZO YA MOJA KWA MOJA',
    'contact.title': 'Tujenge mradi mzuri pamoja na wewe.',
    'contact.subtitle': 'Panga mazungumzo ya dakika 30 bila malipo na wataalamu wetu wa kidijitali kupanga mikakati na bajeti.',
    'contact.btnSubmit': 'Thibitisha Mazungumzo ya Kimkakati',

    // Footer
    'footer.tagline': 'Buni. Unganisha. Fanikiwa. Kampuni nambari moja ya uhandisi wa kidijitali jijini Nairobi.',
    'footer.rights': 'Haki zote zimehifadhiwa.',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.servicesTitle': 'Huduma Maalum',
    'footer.contactTitle': 'Wasiliana Nasi Moja kwa Moja',

    // Menu Drawer
    'menu.searchPlaceholder': 'Tafuta huduma, miradi, zana, miongozo...',
    'menu.mainNav': 'Menyu Kuu',
    'menu.solutions': 'Suluhisho & Mifumo',
    'menu.preferences': 'Lugha & Mapendeleo',
    'menu.language': 'Lugha',
    'menu.currency': 'Sarafu',
    'menu.theme': 'Mwonekano',
    'menu.active': 'Amilifu',
    'menu.selectLanguage': 'Chagua Lugha',
    'menu.close': 'Funga',
    'menu.menu': 'Menyu',
    'menu.contactCta': 'Wasiliana Nasi (Panga Mazungumzo Bila Malipo)'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('dth_language', 'EN');

  // Ensure language is always valid
  const activeLanguage: Language = (language === 'FR' || language === 'SW') ? language : 'EN';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = activeLanguage.toLowerCase();
    }
  }, [activeLanguage]);

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[activeLanguage];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    return TRANSLATIONS.EN[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language: activeLanguage, setLanguage, t, languageOptions: LANGUAGE_OPTIONS }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
