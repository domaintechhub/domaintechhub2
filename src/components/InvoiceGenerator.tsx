import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, RotateCcw, Send, CheckCircle2, 
  Plus, Trash2, Image, FileText, ArrowRight, 
  HelpCircle, ChevronDown, ChevronUp, Share2, Copy, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

export interface CurrencyGroup {
  region: string;
  currencies: CurrencyOption[];
}

export const PRIMARY_CURRENCIES: CurrencyOption[] = [
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' }
];

export const WORLD_CURRENCY_GROUPS: CurrencyGroup[] = [
  {
    region: 'Africa',
    currencies: [
      { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
      { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
      { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
      { code: 'RWF', symbol: 'FRw', name: 'Rwandan Franc' },
      { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
      { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
      { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham' },
      { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha' },
      { code: 'BWP', symbol: 'P', name: 'Botswana Pula' },
      { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha' },
      { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical' },
      { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza' },
      { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
      { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
      { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee' },
      { code: 'SCR', symbol: 'SR', name: 'Seychellois Rupee' },
      { code: 'SOS', symbol: 'Sh', name: 'Somali Shilling' },
      { code: 'SSP', symbol: 'SSP', name: 'South Sudanese Pound' },
      { code: 'DZD', symbol: 'DA', name: 'Algerian Dinar' },
      { code: 'TND', symbol: 'DT', name: 'Tunisian Dinar' },
      { code: 'LYD', symbol: 'LD', name: 'Libyan Dinar' },
      { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar' },
      { code: 'SZL', symbol: 'L', name: 'Eswatini Lilangeni' },
      { code: 'LSL', symbol: 'M', name: 'Lesotho Loti' },
      { code: 'CDF', symbol: 'FC', name: 'Congolese Franc' },
      { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc' },
      { code: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc' },
      { code: 'GMD', symbol: 'D', name: 'Gambian Dalasi' },
      { code: 'GNF', symbol: 'FG', name: 'Guinean Franc' },
      { code: 'LRD', symbol: 'L$', name: 'Liberian Dollar' },
      { code: 'SLL', symbol: 'Le', name: 'Sierra Leonean Leone' },
      { code: 'CVE', symbol: 'Esc', name: 'Cape Verdean Escudo' },
      { code: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary' },
      { code: 'KMF', symbol: 'CF', name: 'Comorian Franc' },
      { code: 'ERN', symbol: 'Nkf', name: 'Eritrean Nakfa' },
      { code: 'STN', symbol: 'Db', name: 'São Tomé & Príncipe Dobra' }
    ]
  },
  {
    region: 'Americas',
    currencies: [
      { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
      { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
      { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
      { code: 'ARS', symbol: 'ARS$', name: 'Argentine Peso' },
      { code: 'CLP', symbol: 'CLP$', name: 'Chilean Peso' },
      { code: 'COP', symbol: 'COL$', name: 'Colombian Peso' },
      { code: 'PEN', symbol: 'S/.', name: 'Peruvian Sol' },
      { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
      { code: 'PYG', symbol: '₲', name: 'Paraguayan Guaraní' },
      { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
      { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
      { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso' },
      { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
      { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
      { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba' },
      { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' },
      { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar' },
      { code: 'TTD', symbol: 'TT$', name: 'Trinidad & Tobago Dollar' },
      { code: 'BSD', symbol: 'B$', name: 'Bahamian Dollar' },
      { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar' },
      { code: 'BZD', symbol: 'BZ$', name: 'Belize Dollar' },
      { code: 'GYD', symbol: 'G$', name: 'Guyanese Dollar' },
      { code: 'SRD', symbol: 'Sr$', name: 'Surinamese Dollar' },
      { code: 'XCD', symbol: 'EC$', name: 'East Caribbean Dollar' },
      { code: 'HTG', symbol: 'G', name: 'Haitian Gourde' },
      { code: 'AWG', symbol: 'Afl.', name: 'Aruban Florin' },
      { code: 'ANG', symbol: 'NAƒ', name: 'Netherlands Antillean Guilder' },
      { code: 'KYD', symbol: 'CI$', name: 'Cayman Islands Dollar' },
      { code: 'BMD', symbol: 'BD$', name: 'Bermudian Dollar' }
    ]
  },
  {
    region: 'Europe',
    currencies: [
      { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
      { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
      { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
      { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
      { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
      { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
      { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
      { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
      { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
      { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
      { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna' },
      { code: 'RSD', symbol: 'din', name: 'Serbian Dinar' },
      { code: 'ALL', symbol: 'Lek', name: 'Albanian Lek' },
      { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Mark' },
      { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar' },
      { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
      { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
      { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
      { code: 'MDL', symbol: 'L', name: 'Moldovan Leu' },
      { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' }
    ]
  },
  {
    region: 'Asia & Pacific',
    currencies: [
      { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
      { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
      { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
      { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
      { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
      { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
      { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
      { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
      { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
      { code: 'THB', symbol: '฿', name: 'Thai Baht' },
      { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
      { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
      { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
      { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
      { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
      { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
      { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
      { code: 'NPR', symbol: 'रू', name: 'Nepalese Rupee' },
      { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
      { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
      { code: 'LAK', symbol: '₭', name: 'Lao Kip' },
      { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik' },
      { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
      { code: 'UZS', symbol: "so'm", name: 'Uzbekistani Som' },
      { code: 'TJS', symbol: 'SM', name: 'Tajikistani Somoni' },
      { code: 'TMT', symbol: 'T', name: 'Turkmenistani Manat' },
      { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa' },
      { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum' },
      { code: 'BND', symbol: 'B$', name: 'Brunei Dollar' },
      { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar' },
      { code: 'PGK', symbol: 'K', name: 'Papua New Guinea Kina' },
      { code: 'WST', symbol: 'WS$', name: 'Samoan Tala' },
      { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu' },
      { code: 'SBD', symbol: 'SI$', name: 'Solomon Islands Dollar' },
      { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga' }
    ]
  },
  {
    region: 'Middle East',
    currencies: [
      { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
      { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
      { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal' },
      { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar' },
      { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar' },
      { code: 'OMR', symbol: 'OMR', name: 'Omani Rial' },
      { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
      { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar' },
      { code: 'LBP', symbol: 'L£', name: 'Lebanese Pound' },
      { code: 'IQD', symbol: 'IQD', name: 'Iraqi Dinar' },
      { code: 'YER', symbol: 'YR', name: 'Yemeni Rial' }
    ]
  }
];

export const ALL_CURRENCY_SYMBOLS: Record<string, string> = {
  ...Object.fromEntries(PRIMARY_CURRENCIES.map((c) => [c.code, c.symbol])),
  ...Object.fromEntries(
    WORLD_CURRENCY_GROUPS.flatMap((g) => g.currencies).map((c) => [c.code, c.symbol])
  )
};

/**
 * Automatically detects the user's local currency based on browser timezone,
 * locale country code, or previously saved manual preference.
 */
export function detectUserCurrency(): string {
  if (typeof window === 'undefined') return 'KES';

  // 1. Check if user already manually selected a currency in a previous session
  try {
    const saved = localStorage.getItem('dth_invoice_currency');
    if (saved && ALL_CURRENCY_SYMBOLS[saved]) {
      return saved;
    }
  } catch {
    // Ignore sandbox localStorage errors
  }

  // 2. Detect via browser timezone (Intl.DateTimeFormat)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    // East Africa & Africa
    if (tz.includes('Nairobi')) return 'KES';
    if (tz.includes('Dar_es_Salaam')) return 'TZS';
    if (tz.includes('Kampala')) return 'UGX';
    if (tz.includes('Kigali')) return 'RWF';
    if (tz.includes('Addis_Ababa')) return 'ETB';
    if (tz.includes('Johannesburg')) return 'ZAR';
    if (tz.includes('Lagos')) return 'NGN';
    if (tz.includes('Accra')) return 'GHS';
    if (tz.includes('Cairo')) return 'EGP';
    if (tz.includes('Casablanca')) return 'MAD';
    if (tz.includes('Lusaka')) return 'ZMW';
    if (tz.includes('Gaborone')) return 'BWP';

    // United Kingdom & Europe
    if (tz.includes('London')) return 'GBP';
    if (tz.includes('Zurich')) return 'CHF';
    if (tz.includes('Stockholm')) return 'SEK';
    if (tz.includes('Oslo')) return 'NOK';
    if (tz.includes('Copenhagen')) return 'DKK';
    if (tz.includes('Warsaw')) return 'PLN';
    if (tz.includes('Prague')) return 'CZK';
    if (tz.includes('Budapest')) return 'HUF';
    if (tz.includes('Istanbul')) return 'TRY';
    if (
      tz.includes('Berlin') || tz.includes('Paris') || tz.includes('Rome') ||
      tz.includes('Madrid') || tz.includes('Amsterdam') || tz.includes('Brussels') ||
      tz.includes('Vienna') || tz.includes('Dublin') || tz.includes('Lisbon') ||
      tz.includes('Helsinki') || tz.includes('Athens') || tz.startsWith('Europe/')
    ) {
      return 'EUR';
    }

    // United States & Americas
    if (
      tz.includes('New_York') || tz.includes('Chicago') || tz.includes('Los_Angeles') ||
      tz.includes('Denver') || tz.includes('Phoenix') || tz.includes('Anchorage') ||
      tz.includes('Honolulu') || tz.includes('Detroit') || tz.includes('Indianapolis')
    ) {
      return 'USD';
    }
    if (
      tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal') ||
      tz.includes('Edmonton') || tz.includes('Winnipeg') || tz.includes('Halifax')
    ) {
      return 'CAD';
    }
    if (tz.includes('Sao_Paulo')) return 'BRL';
    if (tz.includes('Mexico_City')) return 'MXN';
    if (tz.includes('Buenos_Aires')) return 'ARS';
    if (tz.includes('Santiago')) return 'CLP';
    if (tz.includes('Bogota')) return 'COP';
    if (tz.includes('Lima')) return 'PEN';

    // Middle East
    if (tz.includes('Dubai')) return 'AED';
    if (tz.includes('Riyadh')) return 'SAR';
    if (tz.includes('Qatar')) return 'QAR';
    if (tz.includes('Kuwait')) return 'KWD';
    if (tz.includes('Bahrain')) return 'BHD';
    if (tz.includes('Muscat')) return 'OMR';
    if (tz.includes('Jerusalem') || tz.includes('Tel_Aviv')) return 'ILS';

    // Asia & Pacific
    if (tz.includes('Kolkata') || tz.includes('Calcutta')) return 'INR';
    if (tz.includes('Tokyo')) return 'JPY';
    if (tz.includes('Shanghai') || tz.includes('Chongqing')) return 'CNY';
    if (tz.includes('Hong_Kong')) return 'HKD';
    if (tz.includes('Taipei')) return 'TWD';
    if (tz.includes('Seoul')) return 'KRW';
    if (tz.includes('Singapore')) return 'SGD';
    if (tz.includes('Bangkok')) return 'THB';
    if (tz.includes('Kuala_Lumpur')) return 'MYR';
    if (tz.includes('Jakarta')) return 'IDR';
    if (tz.includes('Manila')) return 'PHP';
    if (tz.includes('Ho_Chi_Minh')) return 'VND';
    if (tz.includes('Karachi')) return 'PKR';
    if (tz.includes('Dhaka')) return 'BDT';
    if (tz.includes('Colombo')) return 'LKR';
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Perth')) return 'AUD';
    if (tz.includes('Auckland')) return 'NZD';
  } catch {
    // Continue to locale language check
  }

  // 3. Fallback: Detect from browser navigator language
  try {
    const lang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toUpperCase();
    const parts = lang.split(/[-_]/);
    const country = parts.length > 1 ? parts[1] : parts[0];

    const countryMap: Record<string, string> = {
      KE: 'KES', US: 'USD', GB: 'GBP', UK: 'GBP',
      TZ: 'TZS', UG: 'UGX', RW: 'RWF', ZA: 'ZAR',
      NG: 'NGN', GH: 'GHS', ET: 'ETB', EG: 'EGP',
      CA: 'CAD', AU: 'AUD', NZ: 'NZD', IN: 'INR',
      JP: 'JPY', CN: 'CNY', AE: 'AED', SA: 'SAR',
      DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR',
      NL: 'EUR', BE: 'EUR', AT: 'EUR', IE: 'EUR',
      PT: 'EUR', FI: 'EUR', GR: 'EUR', CH: 'CHF',
      SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN',
      BR: 'BRL', MX: 'MXN', SG: 'SGD'
    };

    if (country && countryMap[country]) {
      return countryMap[country];
    }
  } catch {
    // Continue to default
  }

  // Default to Kenyan Shilling
  return 'KES';
}

export const InvoiceGenerator: React.FC<{ onNavigateToContact?: () => void }> = ({ onNavigateToContact }) => {
  const { t } = useLanguage();

  // Invoice State
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('0001');
  const [fromDetails, setFromDetails] = useState<string>('');
  const [billToDetails, setBillToDetails] = useState<string>('');
  const [shipToDetails, setShipToDetails] = useState<string>('');
  
  // Dates & Meta
  const [invoiceDate, setInvoiceDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [paymentTerms, setPaymentTerms] = useState<string>('Net 14');
  const [dueDate, setDueDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [poNumber, setPoNumber] = useState<string>('');
  const [currency, setCurrency] = useState<string>(() => detectUserCurrency());

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 }
  ]);

  // Adjustments & Totals
  const [notes, setNotes] = useState<string>('');
  const [terms, setTerms] = useState<string>('Pay via M-Pesa Paybill/Till, bank transfer or card.');
  
  const [showDiscount, setShowDiscount] = useState<boolean>(true);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  
  const [vatPercent, setVatPercent] = useState<number>(16); // Default 16% Kenya VAT
  
  const [showShipping, setShowShipping] = useState<boolean>(false);
  const [shippingFee, setShippingFee] = useState<number>(0);
  
  const [amountPaid, setAmountPaid] = useState<number>(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // File Input Ref for Logo Upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currSymbol = ALL_CURRENCY_SYMBOLS[currency] || currency;

  // Math Calculations
  const subtotal = items.reduce((acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.rate) || 0), 0);
  const discountAmount = showDiscount ? (subtotal * (Number(discountPercent) || 0)) / 100 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const vatAmount = (taxableAmount * (Number(vatPercent) || 0)) / 100;
  const shippingAmount = showShipping ? Number(shippingFee) || 0 : 0;
  const total = taxableAmount + vatAmount + shippingAmount;
  const balanceDue = Math.max(0, total - (Number(amountPaid) || 0));

  const formatMoney = (amount: number) => {
    return `${currSymbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) {
      setItems([{ id: Date.now().toString(), description: '', quantity: 1, rate: 0 }]);
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset this invoice? All current fields will be cleared.')) {
      setLogoUrl(null);
      setInvoiceNumber('0001');
      setFromDetails('');
      setBillToDetails('');
      setShipToDetails('');
      setItems([{ id: Date.now().toString(), description: '', quantity: 1, rate: 0 }]);
      setNotes('');
      setTerms('Pay via M-Pesa Paybill/Till, bank transfer or card.');
      setDiscountPercent(0);
      setVatPercent(16);
      setShippingFee(0);
      setAmountPaid(0);
      setCurrency(detectUserCurrency());
    }
  };

  const handleCurrencyChange = (newCurr: string) => {
    setCurrency(newCurr);
    try {
      localStorage.setItem('dth_invoice_currency', newCurr);
    } catch {
      // Ignore sandbox localStorage errors
    }
  };

  const handleCopySummary = () => {
    const summaryText = `*INVOICE #${invoiceNumber}*\nFrom: ${fromDetails || 'Domain Tech Hub'}\nBill To: ${billToDetails || 'Client'}\nDue Date: ${dueDate}\nTotal: ${formatMoney(total)}\nBalance Due: ${formatMoney(balanceDue)}\nTerms: ${terms}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const faqs = [
    {
      q: 'Is this invoice generator free?',
      a: 'Yes. Create and download invoice PDFs for free with no signup required.'
    },
    {
      q: 'Can I customize the invoice template?',
      a: 'Yes. Edit labels, add your company logo, change currency (KES, USD, EUR, etc.), and adjust line items before downloading the PDF.'
    },
    {
      q: 'What is the difference between an invoice and a receipt?',
      a: 'An invoice requests payment for products or services rendered; a receipt confirms payment was received. Use this Invoice Generator to bill, then issue a receipt after you get paid.'
    },
    {
      q: 'Can I include KRA eTIMS or QR code compliance details?',
      a: 'Yes. You can paste your KRA PIN in the FROM or NOTES section, upload your eTIMS QR code in place of the logo, and automatically calculate Kenya\'s 16% standard VAT.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 mb-3">
          <span className="text-xs font-mono text-[#00c853] dark:text-[#00e676] font-bold uppercase tracking-wider">
            BILLING UTILITY · 100% FREE
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          Free Invoice Generator
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-4">
          Create a professional invoice in KES or any currency, then download it as a PDF. No signup, and your data stays in your browser.
        </p>

        {/* Feature Pills */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
          <span>Instant totals, VAT calculation, logo upload and print-ready PDF export.</span>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: The Invoice Sheet (9 cols) */}
        <div 
          id="invoice-paper"
          className="lg:col-span-9 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm transition-colors relative"
        >
          {/* Invoice Sheet Header: Logo & Title */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-8 border-b border-stone-200/90 dark:border-slate-800">
            
            {/* Logo Upload Box */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="invoice-logo-input"
              />
              {logoUrl ? (
                <div className="relative group w-44 h-24 rounded-xl border border-stone-200 dark:border-slate-700 overflow-hidden bg-stone-50 dark:bg-slate-950 flex items-center justify-center p-2">
                  <img src={logoUrl} alt="Uploaded Company Logo" className="max-w-full max-h-full object-contain" />
                  <button
                    onClick={removeLogo}
                    type="button"
                    className="no-print absolute top-1 right-1 p-1 rounded-md bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    title="Remove logo"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="invoice-logo-input"
                  className="no-print w-44 h-24 rounded-xl border-2 border-dashed border-stone-300 dark:border-slate-700 hover:border-[#00c853] dark:hover:border-[#00c853] bg-stone-50/70 dark:bg-slate-950/50 flex flex-col items-center justify-center cursor-pointer transition-colors text-slate-500 dark:text-slate-400 hover:text-[#00c853] p-3 text-center"
                >
                  <Image className="w-5 h-5 mb-1 text-slate-400 group-hover:text-[#00c853]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">+ ADD YOUR LOGO</span>
                  <span className="text-[9px] text-slate-400 mt-0.5">PNG, JPG or SVG</span>
                </label>
              )}
            </div>

            {/* Header Right: Title & Invoice Number */}
            <div className="text-left sm:text-right w-full sm:w-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-3">
                INVOICE
              </h2>
              <div className="flex items-center sm:justify-end gap-2">
                <span className="text-sm font-mono text-slate-400 font-bold">#</span>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="0001"
                  className="w-36 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-sm font-mono font-bold text-slate-900 dark:text-white text-right focus:outline-none focus:border-[#00c853]"
                />
              </div>
            </div>

          </div>

          {/* Parties & Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-8 border-b border-stone-200/90 dark:border-slate-800">
            
            {/* Left Sub-column: FROM, BILL TO, SHIP TO (7 cols) */}
            <div className="sm:col-span-7 space-y-5">
              
              {/* FROM */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  FROM
                </label>
                <textarea
                  rows={3}
                  value={fromDetails}
                  onChange={(e) => setFromDetails(e.target.value)}
                  placeholder="Who is this from? (Your business name, KRA PIN, address, phone, email)"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00c853] resize-none"
                />
              </div>

              {/* BILL TO & SHIP TO Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    BILL TO
                  </label>
                  <textarea
                    rows={3}
                    value={billToDetails}
                    onChange={(e) => setBillToDetails(e.target.value)}
                    placeholder="Who is this to?"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00c853] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    SHIP TO <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={shipToDetails}
                    onChange={(e) => setShipToDetails(e.target.value)}
                    placeholder="(optional)"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00c853] resize-none"
                  />
                </div>
              </div>

            </div>

            {/* Right Sub-column: Metadata (5 cols) */}
            <div className="sm:col-span-5 space-y-3.5">
              
              <div className="flex items-center justify-between gap-3">
                <label className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 w-28">
                  DATE
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white text-right focus:outline-none focus:border-[#00c853]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 w-28">
                  PAYMENT TERMS
                </label>
                <input
                  type="text"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  placeholder="e.g. Net 14"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white text-right focus:outline-none focus:border-[#00c853]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 w-28">
                  DUE DATE
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white text-right focus:outline-none focus:border-[#00c853]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 w-28">
                  PO NUMBER
                </label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  placeholder="PO Number"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white text-right focus:outline-none focus:border-[#00c853]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 w-28">
                  CURRENCY
                </label>
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="w-44 sm:w-52 max-w-full px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white text-right focus:outline-none focus:border-[#00c853] cursor-pointer ml-auto"
                  title="Auto-detected to your region. Click to change."
                >
                  <optgroup label="Default & Popular">
                    {PRIMARY_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol})
                      </option>
                    ))}
                  </optgroup>
                  {WORLD_CURRENCY_GROUPS.map((group) => (
                    <optgroup key={group.region} label={group.region}>
                      {group.currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} ({c.symbol}) – {c.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* Line Items Table */}
          <div className="py-8 border-b border-stone-200/90 dark:border-slate-800">
            
            <div className="overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0">
              <div className="min-w-[480px] sm:min-w-0">
                {/* Table Header Bar */}
                <div className="grid grid-cols-12 gap-3 px-3 py-2 rounded-xl bg-stone-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <div className="col-span-5 sm:col-span-5">ITEM</div>
                  <div className="col-span-2 sm:col-span-1 text-center">QTY</div>
                  <div className="col-span-2 sm:col-span-3 text-right">RATE</div>
                  <div className="col-span-3 sm:col-span-3 text-right pr-7">AMOUNT</div>
                </div>

                {/* Line Items Rows */}
                <div className="space-y-3">
                  {items.map((it) => {
                    const rowAmount = (Number(it.quantity) || 0) * (Number(it.rate) || 0);
                    return (
                      <div key={it.id} className="grid grid-cols-12 gap-3 items-center group">
                        <div className="col-span-5 sm:col-span-5">
                          <input
                            type="text"
                            value={it.description}
                            onChange={(e) => updateItem(it.id, 'description', e.target.value)}
                            placeholder="Description of item/service..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00c853]"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={it.quantity === 0 ? '' : it.quantity}
                            onChange={(e) => updateItem(it.id, 'quantity', parseFloat(e.target.value) || 0)}
                            placeholder="1"
                            className="w-full px-2 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white text-center font-mono focus:outline-none focus:border-[#00c853]"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-3">
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={it.rate === 0 ? '' : it.rate}
                            onChange={(e) => updateItem(it.id, 'rate', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white text-right font-mono focus:outline-none focus:border-[#00c853]"
                          />
                        </div>

                        <div className="col-span-3 sm:col-span-3 flex items-center justify-end gap-2 text-right font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white min-w-0">
                          <span className="whitespace-nowrap tabular-nums">{formatMoney(rowAmount)}</span>
                          <button
                            onClick={() => removeItem(it.id)}
                            type="button"
                            className="no-print shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 opacity-60 group-hover:opacity-100 transition-all cursor-pointer text-xs"
                            title="Delete item"
                            aria-label="Delete item"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Add Line Item Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={addItem}
                className="no-print px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-800 hover:border-[#00c853] text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#00c853] dark:hover:text-[#00e676] bg-stone-50 dark:bg-slate-950 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Line Item</span>
              </button>
            </div>

          </div>

          {/* Bottom Grid: Notes/Terms & Calculations */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 pt-8">
            
            {/* Left Column: Notes & Terms (6 cols) */}
            <div className="sm:col-span-6 space-y-5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  NOTES
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes: any relevant information not already covered"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00c853] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  TERMS
                </label>
                <textarea
                  rows={2}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Payment instructions, bank info or terms"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#00c853] resize-none"
                />
              </div>
            </div>

            {/* Right Column: Calculations Breakdown (6 cols) */}
            <div className="sm:col-span-6 space-y-3">
              
              {/* Subtotal */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono py-1">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatMoney(subtotal)}</span>
              </div>

              {/* Discount Row */}
              {showDiscount && (
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-mono py-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span>Discount (%)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discountPercent === 0 ? '' : discountPercent}
                      onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="w-14 px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-center text-xs font-mono"
                    />
                  </div>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">-{formatMoney(discountAmount)}</span>
                </div>
              )}

              {/* VAT Row */}
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-mono py-1">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>VAT (%)</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={vatPercent === 0 ? '' : vatPercent}
                    onChange={(e) => setVatPercent(parseFloat(e.target.value) || 0)}
                    placeholder="16"
                    className="w-14 px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-center text-xs font-mono"
                  />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{formatMoney(vatAmount)}</span>
              </div>

              {/* Shipping Row */}
              {showShipping && (
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-mono py-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span>Shipping</span>
                    <input
                      type="number"
                      min="0"
                      value={shippingFee === 0 ? '' : shippingFee}
                      onChange={(e) => setShippingFee(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="w-20 px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-right text-xs font-mono"
                    />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{formatMoney(shippingAmount)}</span>
                </div>
              )}

              {/* Quick Toggle Buttons for Discount & Shipping */}
              <div className="no-print flex items-center gap-3 pt-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <button
                  type="button"
                  onClick={() => setShowDiscount(!showDiscount)}
                  className="hover:underline cursor-pointer"
                >
                  {showDiscount ? '- Remove Discount' : '+ Discount'}
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setShowShipping(!showShipping)}
                  className="hover:underline cursor-pointer"
                >
                  {showShipping ? '- Remove Shipping' : '+ Shipping'}
                </button>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between text-sm sm:text-base font-mono font-bold pt-2 border-t border-stone-200 dark:border-slate-800">
                <span className="text-slate-900 dark:text-white">Total</span>
                <span className="text-slate-900 dark:text-white">{formatMoney(total)}</span>
              </div>

              {/* Amount Paid */}
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-mono py-1">
                <span className="text-slate-500">Amount Paid</span>
                <input
                  type="number"
                  min="0"
                  value={amountPaid === 0 ? '' : amountPaid}
                  onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-28 px-2 py-1 rounded bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-right text-xs font-mono"
                />
              </div>

              {/* Balance Due (Prominent) */}
              <div className="flex items-center justify-between text-base sm:text-lg font-mono font-black pt-3 pb-2 border-t-2 border-stone-900 dark:border-slate-100">
                <span className="text-slate-900 dark:text-white">Balance Due</span>
                <span className="text-slate-900 dark:text-white">{formatMoney(balanceDue)}</span>
              </div>

            </div>

          </div>

        </div>


        {/* Right Column: Sticky Action Controls Sidebar (3 cols) */}
        <div className="no-print lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          
          {/* Main Action Buttons Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-3">
            
            {/* Download PDF Button */}
            <button
              onClick={handlePrint}
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
            >
              <span>Download PDF</span>
              <Download className="w-4 h-4" />
            </button>

            {/* Save & Send Button */}
            <button
              onClick={handleCopySummary}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Invoice Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Save &amp; Send</span>
                </>
              )}
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              type="button"
              className="w-full py-2 px-4 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

          </div>

          {/* Need It Automated? Callout Card */}
          <div className="p-5 rounded-2xl bg-[#f7fcf9] dark:bg-slate-900/80 border border-emerald-200 dark:border-slate-800 shadow-xs space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#00c853] dark:text-[#00e676] uppercase tracking-wider block">
              NEED IT AUTOMATED?
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              We build custom billing, KRA eTIMS invoicing and M-Pesa payment systems.
            </p>
            <button
              onClick={() => {
                if (onNavigateToContact) {
                  onNavigateToContact();
                } else {
                  window.location.href = '/contact';
                }
              }}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 hover:border-[#00c853] text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Talk to us</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00c853]" />
            </button>
          </div>

        </div>

      </div>


      {/* 3. Guide & FAQ Section Below (matching frames 00:07 - 00:15) */}
      <div className="no-print pt-10 border-t border-stone-200/90 dark:border-slate-800/80 max-w-4xl space-y-12">
        
        <div>
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
            GUIDE · HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Free Invoice Generator
          </h2>

          <div className="space-y-6">
            {/* How to make an invoice */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                How to make an invoice
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed list-decimal list-inside font-normal">
                <li>Enter your business details and your customer's billing information.</li>
                <li>Add an invoice number, date, due date, and payment terms.</li>
                <li>List line items with quantities, rates, tax, and discounts as needed.</li>
                <li>Review the balance due and download your invoice as a free PDF.</li>
              </ol>
            </div>

            {/* When to use an invoice */}
            <div className="pt-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                When to use an invoice
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Use invoices whenever you bill for products or services. For pricing before work starts, try our{' '}
                <a href="/tools/calculator" className="text-teal-700 dark:text-[#00e676] font-semibold underline">
                  quote template or Estimate Generator
                </a>
                . After payment, issue a receipt.
              </p>
            </div>
          </div>
        </div>

        {/* Invoice FAQ Accordion */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
            Invoice FAQ
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-[#00c853] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-stone-100 dark:border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
