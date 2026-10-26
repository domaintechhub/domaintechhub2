export interface DevelopedWebsite {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  category: string;
  industryGroup: 'all' | 'automotive' | 'real-estate' | 'ecommerce' | 'hospitality-travel' | 'education-health';
  location: string;
  headline: string;
  role: string;
  description: string;
  techTags: string[];
  metricsBadge: string;
  image: string;
  featured?: boolean;
}

export const DEVELOPED_WEBSITES: DevelopedWebsite[] = [
  // -------------------------------------------------------------
  // 1. AUTOMOTIVE & FINTECH
  // -------------------------------------------------------------
  {
    id: 'carsoko',
    name: 'CarSoko Kenya',
    url: 'https://www.carsoko.co.ke/',
    displayUrl: 'carsoko.co.ke',
    category: 'Automotive Marketplace',
    industryGroup: 'automotive',
    location: 'Nairobi, Kenya',
    headline: 'High-Volume Digital Automotive Marketplace & Dealership Hub',
    role: 'Full-Stack Web Development & Search Taxonomy',
    description: 'Premier automotive marketplace in Kenya connecting prospective vehicle buyers with verified private sellers and certified regional dealerships with real-time vehicle filtering.',
    techTags: ['Next.js', 'Vehicle Search Filter', 'Dealer Management', 'SEO Taxonomy', 'Cloudflare Edge'],
    metricsBadge: 'Live Production · Kenya',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'peachcars',
    name: 'Peach Cars Kenya',
    url: 'https://peachcars.co.ke/',
    displayUrl: 'peachcars.co.ke',
    category: 'Automotive & Inspection Tech',
    industryGroup: 'automotive',
    location: 'Nairobi, Kenya',
    headline: 'Smart Used Car Inspection, Certification & Sales Platform',
    role: 'Frontend Engineering & Inspection Scoring Engine',
    description: 'Modern automotive trading platform providing 200+ point mechanical vehicle inspections, transparent vehicle valuations, and streamlined buyer-seller handoffs.',
    techTags: ['React', 'Vehicle Inspection UI', 'WhatsApp Agent Flow', 'Payment Gateway', 'AWS'],
    metricsBadge: 'Active Marketplace · Kenya',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'autochek',
    name: 'Autochek Africa',
    url: 'https://autochek.africa/',
    displayUrl: 'autochek.africa',
    category: 'Automotive & FinTech',
    industryGroup: 'automotive',
    location: 'Pan-Africa (Kenya & Regional)',
    headline: 'Pan-African Automotive Technology & Auto Loan Engine',
    role: 'Pan-African Platform Engineering & Financing Pipeline',
    description: 'Cross-continental automotive ecosystem facilitating vehicle purchases, digital car loan underwriting, auto financing algorithms, and warranty maintenance across African markets.',
    techTags: ['Next.js', 'FinTech Underwriting', 'Multi-Country Localization', 'GraphQL', 'Docker'],
    metricsBadge: 'Pan-African Scale · 5+ Countries',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },

  // -------------------------------------------------------------
  // 2. REAL ESTATE & PROPERTY
  // -------------------------------------------------------------
  {
    id: 'remax-kenya',
    name: 'RE/MAX Kenya',
    url: 'https://www.remax-kenya.co.ke/',
    displayUrl: 'remax-kenya.co.ke',
    category: 'Real Estate & Properties',
    industryGroup: 'real-estate',
    location: 'Nairobi & Coastal Kenya',
    headline: 'Official Kenya Franchise Portal for Global Real Estate Leader',
    role: 'Web Portal Development & MLS Property Indexing',
    description: 'Regional franchise website for the world’s leading real estate brand, displaying luxury residential villas, commercial developments, and vetted real estate agent directories.',
    techTags: ['Next.js', 'Property MLS Feed', 'Geo-Location Search', 'Agent CRM Routing', 'Tailwind CSS'],
    metricsBadge: 'Global Brand Franchise · Kenya',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'kenyapropertycentre',
    name: 'Kenya Property Centre',
    url: 'https://kenyapropertycentre.com/',
    displayUrl: 'kenyapropertycentre.com',
    category: 'Real Estate Marketplace',
    industryGroup: 'real-estate',
    location: 'Kenya Nationwide',
    headline: 'High-Traffic Property Search & Classified Listings Engine',
    role: 'High-Volume Search Architecture & Map Filters',
    description: 'One of Kenya’s largest online real estate directories hosting tens of thousands of active residential, commercial, and land listings with neighborhood analytics.',
    techTags: ['React', 'Elasticsearch', 'Property Maps', 'Lead Generation Engine', 'Edge CDN'],
    metricsBadge: 'Top Tier Traffic · Nationwide',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'commercialpropertykenya',
    name: 'Commercial Property Kenya',
    url: 'https://commercialpropertykenya.com/',
    displayUrl: 'commercialpropertykenya.com',
    category: 'Commercial Real Estate',
    industryGroup: 'real-estate',
    location: 'Nairobi, Kenya',
    headline: 'Commercial Offices, Warehouses & Retail Space Portal',
    role: 'B2B Real Estate Architecture & Space Calculator',
    description: 'Dedicated commercial property portal connecting corporate enterprises, logistics hubs, and retailers with prime office suites, industrial godowns, and retail spaces.',
    techTags: ['Next.js', 'B2B Lease Calculator', 'Industrial Filtering', 'Virtual Space Tours', 'SEO'],
    metricsBadge: 'Enterprise B2B · Nairobi',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
  },

  // -------------------------------------------------------------
  // 3. E-COMMERCE & RETAIL SUPERMARKETS
  // -------------------------------------------------------------
  {
    id: 'greenspoon',
    name: 'Greenspoon Kenya',
    url: 'https://greenspoon.co.ke/',
    displayUrl: 'greenspoon.co.ke',
    category: 'Artisanal & Organic E-Commerce',
    industryGroup: 'ecommerce',
    location: 'Nairobi, Kenya',
    headline: 'Kenya’s Premier Sustainable Online Supermarket & Farm Delivery',
    role: 'E-Commerce Engineering & Checkout Optimization',
    description: 'Conscious online grocer providing farm-fresh organic produce, artisanal baked goods, pantry staples, and eco-friendly products with refrigerated home delivery dispatch.',
    techTags: ['Next.js', 'Artisanal Cart Flow', 'Cold-Chain Dispatch', 'M-Pesa STK Push', 'Sub-second UX'],
    metricsBadge: 'Premier Online Grocer · Nairobi',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'shoppers',
    name: 'Shoppers Supermarket',
    url: 'https://shoppers.co.tz/',
    displayUrl: 'shoppers.co.tz',
    category: 'Retail & Supermarket E-Commerce',
    industryGroup: 'ecommerce',
    location: 'Dar es Salaam, Tanzania',
    headline: 'Major Tanzanian Supermarket Chain Online Delivery Portal',
    role: 'Multi-Category Retail Webstore & Stock Sync',
    description: 'Comprehensive digital shopping platform for Tanzania’s household supermarket chain, supporting thousands of pantry items, fresh food departments, and scheduled delivery.',
    techTags: ['E-Commerce Storefront', 'SKU Stock Sync', 'Tanzania Payments', 'Delivery Slot Manager'],
    metricsBadge: 'Retail Supermarket · Tanzania',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'superstore',
    name: 'Superstore Tanzania',
    url: 'https://superstore.co.tz/',
    displayUrl: 'superstore.co.tz',
    category: 'Hypermarket & Wholesale',
    industryGroup: 'ecommerce',
    location: 'Tanzania',
    headline: 'Large-Format Consumer Goods & Wholesale E-Commerce',
    role: 'Wholesale Catalog Architecture & Fast Cart',
    description: 'High-volume hypermarket storefront offering home appliances, consumer electronics, bulk groceries, and everyday household essentials with regional delivery.',
    techTags: ['Modern Webstore', 'Wholesale Tier Pricing', 'Express Cart', 'Mobile First'],
    metricsBadge: 'Hypermarket E-Commerce · Tanzania',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'inzovusupermarket',
    name: 'Inzovu Supermarket',
    url: 'https://inzovusupermarket.com/',
    displayUrl: 'inzovusupermarket.com',
    category: 'Supermarket & Consumer Retail',
    industryGroup: 'ecommerce',
    location: 'East Africa',
    headline: 'Everyday Household Retail & Grocery Webstore',
    role: 'Retail Catalog UX & Promotional Engine',
    description: 'Community-centric supermarket web platform facilitating quick grocery purchases, weekly discount highlights, fresh produce orders, and loyalty member services.',
    techTags: ['React E-Commerce', 'Discount Engine', 'Product Filtering', 'Fast Mobile Checkout'],
    metricsBadge: 'Consumer Retail · East Africa',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'monsoonfurniture',
    name: 'Monsoon Furniture',
    url: 'https://monsoonfurniture.co.ke/',
    displayUrl: 'monsoonfurniture.co.ke',
    category: 'Luxury Furniture & Home Living',
    industryGroup: 'ecommerce',
    location: 'Nairobi, Kenya',
    headline: 'Handcrafted Solid Hardwood Luxury Furniture E-Commerce',
    role: 'Bespoke Furniture Showcase & Finishes Configurator',
    description: 'Boutique manufacturer of sustainable African hardwood furniture, presenting bespoke dining suites, handcrafted sofas, bedroom pieces, and commercial fitouts.',
    techTags: ['Next.js', 'Wood Finish Selector', 'Custom Dimensions Tool', 'M-Pesa STK Push', 'High-Res Showcase'],
    metricsBadge: 'Artisan Hardwood · Kenya',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },

  // -------------------------------------------------------------
  // 4. SAFARIS, TRAVEL & HOSPITALITY
  // -------------------------------------------------------------
  {
    id: 'viator',
    name: 'Viator',
    url: 'https://www.viator.com/',
    displayUrl: 'viator.com',
    category: 'Global Travel & Tours',
    industryGroup: 'hospitality-travel',
    location: 'Global / International',
    headline: 'World’s Leading Marketplace for Travel Tours & Experiences',
    role: 'Front-End Experience Engineering & High-Scale UI',
    description: 'Global travel experiences platform (TripAdvisor group) providing instant booking access to over 300,000+ guided tours, excursions, and cultural attractions worldwide.',
    techTags: ['Enterprise Web', 'Global Edge CDN', 'Dynamic Currency Engine', 'Sub-second Global Loads'],
    metricsBadge: 'Global Travel Leader · TripAdvisor Co.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'safari-co-za',
    name: 'Safari.co.za',
    url: 'https://www.safari.co.za/',
    displayUrl: 'safari.co.za',
    category: 'Luxury Safari & Lodges',
    industryGroup: 'hospitality-travel',
    location: 'Southern & Eastern Africa',
    headline: 'Luxury African Safari Holidays & Private Game Reserve Bookings',
    role: 'Lodge Discovery UI & Safari Consultant Engine',
    description: 'Premier safari authority curating high-end African expeditions across Kruger National Park, Sabi Sands, Serengeti, and Okavango Delta private game lodges.',
    techTags: ['Next.js', 'Lodge Availability Engine', 'Direct Safari Expert Matching', 'Multi-Currency'],
    metricsBadge: 'Luxury Safari Authority · Southern Africa',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'africanspicesafaris',
    name: 'African Spice Safaris',
    url: 'https://africanspicesafaris.com/',
    displayUrl: 'africanspicesafaris.com',
    category: 'Tours & Safari Expeditions',
    industryGroup: 'hospitality-travel',
    location: 'Nairobi, Kenya',
    headline: 'Bespoke Wildlife Safari Packages & Adventure Itineraries',
    role: 'Safari Itinerary Visualizer & Direct Quotation Flow',
    description: 'Custom safari outfitter delivering tailor-made wildlife adventures across Maasai Mara, Amboseli, Samburu, and Zanzibar beach extensions.',
    techTags: ['Next.js', 'Multi-Day Itinerary Builder', 'WhatsApp Concierge', 'International Card Payments'],
    metricsBadge: 'Established Tour Operator · Kenya',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'silverbackgorillatours',
    name: 'Silverback Gorilla Tours',
    url: 'https://www.silverbackgorillatours.com/',
    displayUrl: 'silverbackgorillatours.com',
    category: 'Primate & Gorilla Expeditions',
    industryGroup: 'hospitality-travel',
    location: 'Uganda, Rwanda & DR Congo',
    headline: 'Mountain Gorilla Trekking & Great Lakes Safari Expeditions',
    role: 'Trekking Permit Booking Flow & Expedition Guide UI',
    description: 'Specialized safari company guiding adventurous travelers through Bwindi Impenetrable National Park, Volcanoes National Park, and Virunga mountain primate habitats.',
    techTags: ['CMS Engine', 'Trekking Permit Availability', 'Route Interactive Maps', 'Live Inquiry Sync'],
    metricsBadge: 'Primate Specialist · East Africa',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'kenya-experience',
    name: 'Kenya Experience',
    url: 'https://www.kenya-experience.com/',
    displayUrl: 'kenya-experience.com',
    category: 'Guided Safaris & Cultural Tours',
    industryGroup: 'hospitality-travel',
    location: 'Kenya & Europe',
    headline: 'Authentic African Safari Expeditions for International Travelers',
    role: 'Safari Route Planner & International Lead Conversion',
    description: 'Dedicated inbound tour operator hosting European and global adventurers for guided wildlife safaris, Mount Kenya climbing climbs, and Rift Valley cultural encounters.',
    techTags: ['Next.js', 'Trip Customizer', 'Multilingual Support', 'Review Ratings Sync'],
    metricsBadge: 'Inbound Tourism · Kenya / Europe',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'hotelafricana',
    name: 'Hotel Africana',
    url: 'https://www.hotelafricana.com/',
    displayUrl: 'hotelafricana.com',
    category: 'Hospitality & Conferences',
    industryGroup: 'hospitality-travel',
    location: 'East Africa',
    headline: 'Premier Convention & Business Luxury Hotel Website',
    role: 'Corporate Conference & Accommodation Reservation System',
    description: 'Iconic 4-star leisure and conference hotel with over 200 luxury rooms, international convention halls, health club amenities, and fine dining reservation options.',
    techTags: ['Responsive Hospitality Web', 'Event Venue Booking', 'Room Reservation Sync', 'Multilingual'],
    metricsBadge: 'Premier 4-Star Hotel · East Africa',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'thanickoleehotel',
    name: 'Thanickolee Hotel',
    url: 'https://thanickoleehotel.com/',
    displayUrl: 'thanickoleehotel.com',
    category: 'Hospitality & Accommodations',
    industryGroup: 'hospitality-travel',
    location: 'Kenya',
    headline: 'Boutique Hotel, Luxury Dining & Event Reservations',
    role: 'Direct Room Booking Engine & Hospitality UI',
    description: 'Contemporary boutique hospitality property providing comfortable guest room reservations, culinary dining bookings, and outdoor celebratory event packages.',
    techTags: ['React', 'Room Availability Calendar', 'Dining Reservations', 'M-Pesa & Card Checkout'],
    metricsBadge: 'Boutique Hotel · Kenya',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
  },

  // -------------------------------------------------------------
  // 5. EDUCATION & HEALTHCARE
  // -------------------------------------------------------------
  {
    id: 'kiotaschool',
    name: 'Kiota School',
    url: 'https://kiotaschool.com',
    displayUrl: 'kiotaschool.com',
    category: 'Education & Admissions',
    industryGroup: 'education-health',
    location: 'Nairobi, Kenya',
    headline: 'Leading Progressive Kindergarten, Primary & Junior Secondary School',
    role: 'School Admissions Portal & Curriculum Showcase',
    description: 'Distinguished Christian educational institution in Nairobi providing holistic curriculum, online pupil admissions portal, campus event calendars, and parent portals.',
    techTags: ['React', 'Online Admissions Application', 'Event Calendars', 'Virtual Campus Tour', 'Mobile Friendly'],
    metricsBadge: 'Premier Education · Nairobi',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: 'dignity',
    name: 'Dignity Kenya',
    url: 'https://dignity.co.ke/',
    displayUrl: 'dignity.co.ke',
    category: 'Healthcare & Medical Supplies',
    industryGroup: 'education-health',
    location: 'Nairobi, Kenya',
    headline: 'Medical Supplies, Healthcare Products & Clinical Equipment',
    role: 'Healthcare Supply Catalog & Express Order Dispatch',
    description: 'Trusted distributor of clinical medical supplies, personal care hygiene products, and hospital-grade sanitary essentials supporting Kenyan healthcare facilities.',
    techTags: ['Healthcare Webstore', 'B2B Medical Orders', 'M-Pesa STK Integration', 'Fast Delivery Dispatch'],
    metricsBadge: 'Healthcare & Supplies · Kenya',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80'
  }
];

export const INDUSTRY_TABS = [
  { id: 'all', label: 'All Websites', count: 20 },
  { id: 'automotive', label: 'Automotive & FinTech', count: 3 },
  { id: 'real-estate', label: 'Real Estate & Properties', count: 3 },
  { id: 'ecommerce', label: 'E-Commerce & Retail', count: 5 },
  { id: 'hospitality-travel', label: 'Safaris, Travel & Hotels', count: 7 },
  { id: 'education-health', label: 'Education & Healthcare', count: 2 }
] as const;
