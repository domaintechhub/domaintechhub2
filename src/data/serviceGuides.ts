export interface ServiceGuideSection {
  heading: string;
  body: string;
}

export const SERVICE_GUIDES: Record<string, ServiceGuideSection[]> = {
  'web-development': [
    {
      heading: 'What a business website should actually do',
      body: `A website is not a digital brochure. It is a sales and trust tool that works every hour of the day. A good business website answers three questions within seconds: what do you do, is it for someone like me, and what should I do next. Everything we build starts from that. We work out who your customers are, what they search for, what makes them hesitate, and design the pages and calls to action around those answers rather than around what looks fashionable.\n\nFor most Kenyan businesses that means a fast mobile-first site, clear service pages, visible phone and WhatsApp contact, proof such as past work and reviews, and a simple way to request a quote or book. Anything that does not help a visitor decide is removed.`,
    },
    {
      heading: 'How we build it, step by step',
      body: `Our process has five stages, each with a clear output you can review:\n• Discovery: a call to understand your business, customers, competitors and goals, then a written scope and fixed price.\n• Structure and design: a sitemap and page layouts for approval before any code is written, so there are no surprises.\n• Build: development in modern frameworks such as React and Next.js, with responsive layouts, optimised images and clean, accessible code.\n• Testing: checks across phones and browsers, speed and accessibility audits, form and payment testing, and security review.\n• Launch and handover: domain, hosting and SSL setup, redirects from any old site, analytics and Search Console configuration, and training so your team can manage content.\n\nYou see progress throughout, and you own the finished code and content.`,
    },
    {
      heading: 'Speed, SEO and security are built in, not added later',
      body: `Many sites are built first and fixed for speed and search later, which is slower and more expensive. We design for performance from the first line: pages are pre-rendered so they load quickly on mobile networks, images are compressed and sized correctly, and scripts are loaded only when needed. Each page ships with a unique title and description, a correct heading structure, clean URLs, structured data and a sitemap so search engines can understand and index it.\n\nOn security, we serve everything over HTTPS, keep dependencies updated, protect forms against spam and abuse, and avoid unnecessary plugins, which are the most common way sites are compromised. Payments and personal data are handled in line with the Kenya Data Protection Act.`,
    },
    {
      heading: 'What affects the price and timeline',
      body: `The cost of a website depends mainly on the number and complexity of pages, whether you need custom features such as bookings, member areas, M-Pesa payments or integrations with your accounting or CRM, how much content and design work is required, and whether we write copy and prepare images or you supply them. A simple, focused business site can be live in a few weeks, while a larger system with integrations takes longer. The packages on this page show starting prices in both KSh and USD, and after a short discovery call we confirm a fixed quote with a clear delivery date.\n\nBe wary of unusually cheap offers. Templates stuffed with plugins, no ownership of your files, and no support after launch tend to cost more in the end.`,
    },
    {
      heading: 'After launch: support and growth',
      body: `A website works best when it keeps improving. After launch we can provide hosting and maintenance, security updates, backups, content changes, and monthly reporting on traffic and enquiries. We also help you grow through search optimisation, Google Business Profile setup, and advertising when you are ready. If you are not sure where to start, ask for a free review of your current site and we will tell you plainly what is working, what is not, and what is worth fixing first.`,
    },
  ],

  'ecommerce-development': [
    {
      heading: 'Selling online in Kenya: what customers expect',
      body: `Kenyan online shoppers decide quickly and mostly on their phones. They expect pages that load fast on mobile data, clear prices in shillings, simple checkout, and above all payment methods they trust, led by M-Pesa. They also want to know delivery cost and time before they commit, and they want a way to talk to a real person on WhatsApp if something is unclear. A shop that misses any of these loses sales regardless of how good its products are.\n\nWe build stores around these realities: a streamlined path from product to paid order, with as few steps and form fields as possible, and reassurance such as return policy, delivery information and contact details visible where buyers hesitate.`,
    },
    {
      heading: 'M-Pesa, cards and other payments done reliably',
      body: `Payments are where an online store earns or loses trust. We integrate the Safaricom Daraja API so customers can pay with an M-Pesa STK Push prompt straight to their phone, and we design the flow so that every payment is matched to an order even if the customer closes the browser or the network drops. Card payments through providers such as Stripe or Kenyan gateways, and PayPal for international buyers, can be added alongside.\n\nBehind the scenes, we verify each payment using callbacks and status checks, prevent duplicate charges, and reconcile payments against orders so your accounts match. Receipts and confirmations are sent automatically by email, SMS or WhatsApp.`,
    },
    {
      heading: 'Delivery, stock and tax compliance',
      body: `A shop is more than a catalogue. We connect your store to the operational pieces you need: delivery zones and fees for Nairobi and the rest of Kenya, courier integrations, stock tracking that prevents overselling, and order management so your team can pack and ship efficiently. If you sell to customers abroad, we can add multi-currency pricing, international shipping rules and export documentation support.\n\nFor tax, we can connect your store to KRA eTIMS so invoices are issued and validated as required, saving manual work and reducing compliance risk. We explain what applies to your business so there are no surprises at filing time.`,
    },
    {
      heading: 'Built for speed and for search',
      body: `Slow stores lose customers and rank lower. We use modern front-end technology and careful optimisation so product pages load quickly on mobile networks, and we give every product and category a unique title, description, clean URL and structured data so it can appear in Google with price and availability. We also set up analytics and conversion tracking so you can see which products and traffic sources actually produce sales, not just visits.\n\nIf you already have a WooCommerce or Shopify store, we can improve its speed and checkout, or migrate you to a faster custom platform while keeping your product data, customer records and search rankings.`,
    },
    {
      heading: 'Launching and growing your store',
      body: `We handle setup, product import, payment testing with real transactions, and training for your team before go-live. After launch we can run Google Shopping and social media ads, email and WhatsApp campaigns for abandoned carts and repeat purchases, and monthly reports showing revenue and conversion rate. A common question is how much a shop costs: it depends on the number of products, the payment and delivery integrations required and any custom features. Use the packages on this page as a guide, then contact us for a fixed quote based on your exact needs.`,
    },
  ],

  'seo-services': [
    {
      heading: 'What SEO is, and what it can honestly deliver',
      body: `Search engine optimisation is the work of making your website easy for Google to understand and attractive to the people searching, so that you appear when customers look for what you sell. It takes time. For a new site, expect the first meaningful movement in two to three months and steady growth after that, depending on competition. Anyone promising instant first-page results or guaranteed rankings is not being honest, because search engines are not under anyone's control.\n\nWhat SEO can do is bring a steady flow of visitors who are already looking for your service, at no cost per click, and build trust that continues to pay back long after the work is done.`,
    },
    {
      heading: 'Our four-part approach',
      body: `We split SEO into four areas and work on them in order:\n• Technical foundations: making sure search engines can crawl and index your pages, fixing speed and Core Web Vitals, mobile usability, redirects, canonical tags, sitemaps and structured data.\n• Content and keywords: researching what your customers actually search, mapping each topic to a specific page, and writing or improving pages that answer the question better than competitors.\n• Local SEO: setting up and optimising your Google Business Profile, keeping your business details consistent, and building reviews so you appear in Nairobi and local map results.\n• Authority: earning links and mentions from credible Kenyan and industry websites, which is the signal that moves a new domain forward.\n\nEach area has clear tasks, and we report on what was done each month.`,
    },
    {
      heading: 'Getting indexed and fixing what blocks you',
      body: `A frequent problem for new websites is that Google discovers pages but does not index them. Typical causes are thin or repetitive content, weak internal linking, slow or broken pages, and having no links from other sites. We diagnose this in Search Console, reading the indexing and coverage reports, then fix the specific causes: expanding pages that are too short to be useful, consolidating near-duplicates, improving internal links, and requesting indexing for important pages.\n\nWe also set up tracking properly, so you can see impressions, clicks, positions and, more importantly, enquiries and sales that come from search, not just traffic numbers.`,
    },
    {
      heading: 'Reaching international clients',
      body: `If you want customers outside Kenya, your site needs more than translation. We help you decide which markets to target, build pages that speak to those buyers with pricing in their currency, set up the correct language and region signals without misleading Google, and gather the proof that overseas buyers look for: case studies, reviews and clear information on how you work across time zones. We also optimise for the way people now ask questions to AI assistants and answer engines, by structuring content with clear answers and trustworthy sources.`,
    },
    {
      heading: 'Reporting and what to expect',
      body: `Every month you receive a plain-language report showing what we changed, how many pages are indexed, which searches you appear for, and the enquiries generated. We set targets together, for example a growing number of indexed pages, rising impressions, and first-page rankings for a chosen set of valuable keywords. If something is not working we say so and adjust. The packages on this page show what is included at each level, and a free audit of your current site is the best first step to see where you stand.`,
    },
  ],

  'mobile-app-development': [
    {
      heading: 'Do you need a mobile app, or a better website?',
      body: `Before building an app, check whether you need one. A fast, installable web app, called a progressive web app, can cover many cases at a fraction of the cost. A native or cross-platform mobile app is worth it when you need features such as push notifications, offline use, access to the camera, GPS or Bluetooth, deep device integration, or a place on your customers' home screens for frequent use.\n\nWe start every project by asking what the app must do, who will use it, and whether an app is really the best way to achieve it. If a web app is enough, we will say so, because the best solution is the one that solves your problem at a sensible cost.`,
    },
    {
      heading: 'Android first, iOS when it makes sense',
      body: `In Kenya, Android is by far the most used platform, so most projects begin there, though the right choice depends on your audience. We commonly build with cross-platform tools such as React Native or Flutter so a single codebase can serve both Android and iOS, which reduces cost and keeps both versions consistent. For apps with demanding performance or hardware requirements, we use native development.\n\nWe design for real-world conditions: mid-range phones, limited storage, patchy connections and expensive data. That means small app size, careful use of data, and offline support so work is not lost when the signal drops, then synchronised when the connection returns.`,
    },
    {
      heading: 'Features Kenyan businesses ask for most',
      body: `Common requirements include M-Pesa payments through STK Push, user accounts and secure login, order or booking management, delivery and location tracking, WhatsApp and SMS notifications, offline data capture for field teams, dashboards for managers, and integrations with accounting, stock or CRM systems. We connect the app to a secure back end with an admin panel so your team can manage users, content and reports without developer help.\n\nSecurity matters because apps handle personal and financial data. We use encrypted connections, secure storage of tokens, proper access control and follow the Kenya Data Protection Act principles of collecting only what is needed.`,
    },
    {
      heading: 'From idea to the app stores',
      body: `The process runs in stages: discovery and scope, clickable designs you approve before development, building in short cycles with regular demos, thorough testing on real devices, and then release. We prepare and submit the app to Google Play and the Apple App Store, including listing text, screenshots and privacy information, and handle the review process. Note that store accounts and review timelines apply, and Apple requires a developer account. After release we monitor crashes and feedback, and plan updates.`,
    },
    {
      heading: 'Cost, timeline and ownership',
      body: `App cost depends on the number of screens, the complexity of features, the number of platforms, integrations and the back end required. A focused first version, often called an MVP, can be launched in a matter of weeks to a few months, and is the recommended way to test your idea with real users before investing in everything. You own the source code and accounts. We provide a fixed-scope quote after discovery, and ongoing maintenance plans for updates, bug fixes and new operating system versions.`,
    },
  ],

  'custom-crm-development': [
    {
      heading: 'What custom CRM software is for',
      body: `A custom CRM is a system built around the way your business actually sells and serves customers, instead of forcing your team to adapt to a generic tool. It holds every customer, lead, quote, order, invoice and conversation in one place, so nothing depends on one person's memory or a spreadsheet only they understand. It also automates the repetitive steps, such as follow-up reminders, quotes, invoices and payment requests, so your team spends time selling and serving rather than copying data.`,
    },
    {
      heading: 'Built around Kenyan business workflows',
      body: `What sets a custom system apart is how well it connects to the tools you already depend on. We integrate WhatsApp Business so conversations are logged against the right customer, M-Pesa so payments are requested and matched automatically, KRA eTIMS so invoices are issued compliantly, and SMS and email for reminders. We can also connect your accounting software, stock system and website forms, so a new enquiry flows straight into your pipeline and a paid invoice updates the customer record without anyone retyping it.`,
    },
    {
      heading: 'What we build, module by module',
      body: `Systems are assembled from modules chosen to fit you:\n• Contacts and companies with full history and notes.\n• A sales pipeline with stages, owners, values and automatic follow-up reminders.\n• Quotes and invoices generated from templates, with tax handled correctly.\n• Task and team management with permissions by role.\n• Customer support tracking with statuses and response times.\n• Dashboards and reports showing sales, conversion rates and revenue by product, source or staff member.\n• A customer portal where clients can view invoices, pay and track their requests.\n\nWe launch with the modules that matter most, then add more as the business grows.`,
    },
    {
      heading: 'Security, data ownership and compliance',
      body: `Customer data is among your most valuable assets, so we treat it carefully. Role-based access means each person sees only what they need. Data is encrypted in transit and at rest, backed up regularly, and every important action is recorded in an audit log. You own your data and can export it at any time. We design systems with the Kenya Data Protection Act in mind, including consent records, retention rules and the ability to handle access and deletion requests.`,
    },
    {
      heading: 'Is custom the right choice for you?',
      body: `Not every business needs custom software. If a standard tool covers most of your process, using it is quicker and cheaper, and we will tell you so. Custom development pays off when your workflow is unusual, when you need several systems to work together, when per-user subscription costs are rising, or when you want full control over your data. We begin with a short workshop to map your process and give a cost estimate, so you can decide with full information before committing.`,
    },
  ],

  'ppc-management': [
    {
      heading: 'Why pay-per-click suits a new website',
      body: `While organic search takes months to build, paid search can bring visitors the day your campaign goes live. For a new site with few rankings, Google Ads can generate enquiries while your SEO grows. You only pay when someone clicks, and you choose exactly which searches to appear for, for example "web design company Nairobi" or "M-Pesa integration developer". It also gives fast feedback: within weeks you learn which keywords, messages and pages actually produce enquiries, and that insight improves your whole marketing.`,
    },
    {
      heading: 'How we run a campaign',
      body: `We begin by agreeing a monthly budget and a target, such as cost per enquiry. Then we research keywords with real buyer intent and exclude irrelevant searches so your money is not wasted. We write ads that match what people searched for, build or adjust a landing page so the visitor finds the answer immediately, and set up conversion tracking for form submissions, calls and WhatsApp clicks. Every week we review search terms, pause what does not work, and shift budget to what does. We start small, prove it works, and only then recommend scaling.`,
    },
    {
      heading: 'Targeting Kenya and international clients',
      body: `Campaigns can target Nairobi, specific counties, all of Kenya, or other countries such as the UK, the US, the Gulf and neighbouring East African markets. For international buyers we use pricing in their currency, messaging that addresses their concerns about working with a remote team, and time zones in ad scheduling. Because click costs differ widely between markets, we test small budgets in several places and focus on those with the best return.`,
    },
    {
      heading: 'Transparent reporting and ad spend',
      body: `You pay Google directly for clicks, and our management fee is separate and stated upfront, so you always know where money goes. You receive reports showing spend, clicks, enquiries, cost per enquiry and which keywords generated them. We do not hide poor results: if a campaign is not profitable we explain why and either fix it or recommend stopping. You keep ownership of your Google Ads account and all data.`,
    },
  ],
};
