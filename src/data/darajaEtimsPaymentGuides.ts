import type { InsightArticle } from './insightsData';

const brian = {
  name: 'Brian Mwangi',
  role: 'Lead Cloud & Fintech Architect',
  avatar: '/images/team/author-brian.webp',
};

const faith = {
  name: 'Faith Muthoni',
  role: 'Lead Product Designer & Frontend Architect',
  avatar: '/images/team/author-faith.webp',
};

const dennis = {
  name: 'Dennis Kiprop',
  role: 'Director of Search & Analytics',
  avatar: '/images/team/author-dennis.webp',
};

const amina = {
  name: 'Amina Hassan',
  role: 'Senior Systems Engineer & API Specialist',
  avatar: '/images/team/author-amina.webp',
};

export const DARAJA_ETIMS_PAYMENT_GUIDES: InsightArticle[] = [
  {
    id: 'daraja-api-error-codes-reference-resultcode-1032-1037-2001',
    title: 'Daraja API Error Codes Reference: ResultCode 1032, 1037, 2001 & Invalid Access Token',
    slug: 'daraja-api-error-codes-reference-resultcode-1032-1037-2001',
    category: 'Fintech & Payments',
    publishedDate: 'October 30th, 2026',
    readTime: '9 min read',
    featured: true,
    author: brian,
    excerpt: 'Comprehensive Daraja API error reference for Kenyan developers. Diagnose and fix ResultCode 1032, 1037, 2001, 400.002.02, Invalid Access Token, and missing callbacks.',
    coverImage: '/images/articles/mpesa-daraja-zero-loss.webp',
    tags: [
      'Daraja API Error Codes',
      'M-Pesa STK Push Errors',
      'ResultCode 1032',
      'ResultCode 1037',
      'ResultCode 2001',
      'Safaricom Daraja API',
      'Fintech Kenya'
    ],
    keyTakeaways: [
      'ResultCode 0 indicates transaction success; all non-zero ResultCodes represent actionable user, network, or validation aborts.',
      'ResultCode 1032 means the customer explicitly cancelled the USSD prompt; your UI should keep the cart open and allow a one-click retry.',
      'ResultCode 1037 occurs when the SIM Toolkit prompt times out after 25–30 seconds of user inactivity.',
      'ResultCode 2001 signals an invalid initiator credential, blocked SIM, or wrong M-Pesa PIN attempt.',
      '400.002.02 and "Invalid Access Token" errors stem from stale in-memory tokens, base64 credential encoding defects, or sandbox/production endpoint mismatches.',
      'Callbacks fail to arrive when your webhook server lacks valid TLS 1.3 certificates, uses ports other than 443, or triggers Cloudflare bot challenges.'
    ],
    contentSections: [
      {
        heading: 'Quick Diagnostic: Daraja API Error Codes at a Glance',
        body: `When troubleshooting the Safaricom Daraja API, understanding **Daraja API Error Codes** is the difference between a high-converting Kenyan checkout and thousands of shillings lost to silent transaction abandonment.\n\nWhether you are processing customer checkouts via Lipa Na M-Pesa Online (STK Push), registering C2B URLs, or executing B2C payouts, Daraja returns two classes of errors: synchronous HTTP rejection errors (returned immediately during the API call) and asynchronous callback errors (delivered inside the \`stkCallback\` payload to your HTTPS webhook).\n\nThe reference table below maps every prominent Daraja response code to its exact root cause and engineering solution:\n\n| Response / ResultCode | Meaning | Primary Root Cause | Recommended System Action | User-Facing Message |\n|---|---|---|---|---|\n| ResultCode 0 | Success | Payment authorized and debited successfully | Fulfill order, generate eTIMS invoice, dispatch receipt SMS | Payment confirmed! Your order is being processed. |\n| ResultCode 1 | Insufficient Funds | Buyer does not have enough balance in M-Pesa wallet | Keep checkout active; offer retry or split payment | Your M-Pesa balance is insufficient. Please top up and retry. |\n| ResultCode 1032 | Cancelled by User | Customer pressed Cancel on the SIM prompt or locked screen | Reset push cooldown; allow immediate retry without refreshing cart | You cancelled the M-Pesa prompt. Tap below to retry. |\n| ResultCode 1037 | User Inactivity / Timeout | SIM prompt ignored for >25 seconds or device out of coverage | Re-query transaction status via STK Query API before marking failed | The M-Pesa prompt timed out. Please keep your phone unlocked and retry. |\n| ResultCode 2001 | Invalid PIN / Blocked | Wrong PIN entered, SIM locked, or invalid initiator credential | Release cart lock; prompt customer to verify PIN or use alternative line | Incorrect PIN entered or M-Pesa account temporarily locked. |\n| ResultCode 1019 | Transaction Expired | Push request expired before Safaricom network could dispatch | Check server clock drift; regenerate ISO timestamp | Checkout session expired. Please tap Pay Now again. |\n| ResultCode 9999 | System Internal Failure | Safaricom core engine transient timeout or maintenance | Exponential backoff retry via background queue; do not double-bill | Safaricom M-Pesa is experiencing temporary delays. Retrying... |\n| 400.002.02 | Bad Request / Invalid Parameters | Malformed JSON body, invalid phone format, or bad timestamp | Format phone to 2547XXXXXXXX; sanitize amount to positive integer | Invalid payment parameters submitted. |\n| 404.001.03 / 401 | Invalid Access Token | Expired Bearer token or incorrect Consumer Key / Secret | Invalidate token cache; issue new OAuth token call | Session synchronization error. Please refresh and retry. |`
      },
      {
        heading: '1. Diagnosing ResultCode 1032: Request Cancelled by User',
        body: `**ResultCode 1032** is the single most frequent callback error code in Kenyan e-commerce, accounting for roughly 40% to 60% of all failed STK push attempts. It occurs when the customer actively dismisses the M-Pesa SIM Toolkit prompt on their mobile device by tapping "Cancel", pressing the hardware back button, or swiping away the modal.\n\n### Why Customers Trigger 1032\n• Hesitation at unexpected delivery fees or taxes revealed at final checkout.\n• Phone screen locking right as the push arrives, causing the OS to abort the SIM dialog.\n• Multiple accidental clicks on your "Pay Now" button, generating cascading prompts where earlier prompts get auto-cancelled.\n\n### The Engineering Fix\nNever delete the pending order or mark it as permanently failed upon receiving ResultCode 1032. Instead, update your internal payment state machine from \`awaiting_callback\` to \`cancelled_by_user\`. Immediately update your front-end WebSocket or polling listener to display an empathetic retry card with a single "Try Again" button that retains all customer cart items, selected shipping methods, and pre-filled phone numbers.\n\nTo see how we implement zero-friction checkout flows with automated retries, explore our [E-Commerce Web Development Services](/services/ecommerce-development).`
      },
      {
        heading: '2. Resolving ResultCode 1037: SIM Toolkit Timeout & User Inactivity',
        body: `**ResultCode 1037** occurs when Safaricom successfully delivers the STK Push to the customer's handset, but the user takes no action for approximately 25 to 30 seconds. Unlike 1032 (where the user explicitly presses cancel), 1037 is a passive expiration.\n\n### Common Technical Causes\n• **Network Latency:** The customer is on a congested 2G/3G network or fluctuating Wi-Fi, causing the USSD overlay to arrive after the internal Daraja timer has already elapsed.\n• **Background App Interference:** Truecaller, USSD call-blocking utilities, or aggressive Android battery management killing the SIM Toolkit process.\n• **User Distraction:** The customer set their phone down or was searching for their physical ID/PIN.\n\n### Defensive Architecture: Query Before Aborting\nBecause network delivery across regional telecom masts can suffer packet delays, a callback reporting 1037 can occasionally cross paths with a late PIN entry. Before concluding that the payment failed:\n1. Wait 5 seconds after receiving ResultCode 1037.\n2. Call the official **Daraja STK Push Query API** (\`/mpesa/stkpushquery/v1/query\`) using your \`CheckoutRequestID\`.\n3. If the query confirms that the transaction was indeed completed, credit the customer account.\n4. If the query confirms timeout, release inventory locks and display an on-screen guidance message advising the user to keep their device unlocked.`
      },
      {
        heading: '3. Troubleshooting ResultCode 2001: Invalid Credentials & Wrong PIN',
        body: `**ResultCode 2001** states: *"The initiator information that was submitted is invalid."* In production environments, this code surfaces in two distinct contexts:\n\n1. **Consumer-Facing STK Push:** The customer typed an incorrect 4-digit M-Pesa PIN into the SIM Toolkit prompt or their M-Pesa line has been temporarily suspended by Safaricom fraud filters.\n2. **B2C / B2B Initiator Errors:** If you are running automated payouts or reversals, ResultCode 2001 indicates that your API \`InitiatorName\` or encrypted \`SecurityCredential\` (generated using Safaricom's public X.509 certificate) is invalid, expired, or unauthorized for the specified ShortCode.\n\n### Production Checklist for ResultCode 2001\n• For STK Push: Guide the user to retry after double-checking their M-Pesa PIN. Provide a secondary payment fallback such as a Paybill/Till number manual transfer or credit card checkout.\n• For B2C Payouts: Log in to the Safaricom M-Pesa Organization Portal, verify that the initiator operator exists and has the required payout role, and re-encrypt the initiator password using Safaricom's current production certificate.\n\nLearn more about architecting multi-channel payment solutions in our guide on [POS Systems & KRA eTIMS Compliance](/services/pos-systems).`
      },
      {
        heading: '4. Fixing "Invalid Access Token" & 400.002.02 Rejections',
        body: `Synchronous HTTP rejections prevent the STK Push from ever reaching Safaricom's telecom network. The two most common culprits are OAuth authorization failures and timestamp encoding defects:\n\n### 1. "Invalid Access Token" / 401 Unauthorized\nEvery Daraja API endpoint requires a short-lived Bearer token obtained from \`/oauth/v1/generate?grant_type=client_credentials\`. This token expires in 3,599 seconds (1 hour). Integrations fail when:\n• The application requests a new token on every single checkout request, quickly hitting Safaricom rate limits ([VERIFY: Safaricom Daraja rate limits are commonly 50–100 requests per minute per consumer key]).\n• The token cache is retained past expiration without a refresh buffer.\n• The developer mixes Sandbox credentials (\`sandbox.safaricom.co.ke\`) with Production endpoints (\`api.safaricom.co.ke\`).\n\n### 2. 400.002.02 "Bad Request - Invalid Timestamp / Password"\nThe Daraja STK Push password must be an exact Base64 string composed of: \`Shortcode + Passkey + Timestamp\`.\n• The timestamp must follow the format \`YYYYMMDDHHmmss\` in East Africa Time (UTC+3).\n• If your application server clock runs on UTC without shifting to Nairobi time (+3 hours) or suffers NTP clock drift greater than 5 minutes, Safaricom immediately rejects the payload with 400.002.02.`,
        codeSnippet: `// Idiomatic TypeScript: Generating Valid Daraja STK Push Password
import crypto from 'crypto';

export function generateDarajaPassword(shortcode: string, passkey: string): { password: string; timestamp: string } {
  // Format East Africa Time (UTC+3) YYYYMMDDHHmmss
  const now = new Date();
  const eatOffset = 3 * 60; // 3 hours in minutes
  const eatDate = new Date(now.getTime() + (eatOffset + now.getTimezoneOffset()) * 60000);
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  const timestamp = 
    eatDate.getFullYear().toString() +
    pad(eatDate.getMonth() + 1) +
    pad(eatDate.getDate()) +
    pad(eatDate.getHours()) +
    pad(eatDate.getMinutes()) +
    pad(eatDate.getSeconds());

  const rawString = \`\${shortcode}\${passkey}\${timestamp}\`;
  const password = Buffer.from(rawString).toString('base64');

  return { password, timestamp };
}`
      },
      {
        heading: '5. Why Callbacks Never Arrive: The Webhook Black Hole',
        body: `You trigger an STK Push, the customer enters their PIN, the money is debited from their M-Pesa balance, but your server receives zero callbacks. Your database stays stuck on "Pending", and the customer starts frantically calling your support desk. Why does this happen?\n\nSafaricom's webhook dispatch engine enforces rigorous networking rules. If any rule is breached, callbacks fail silently:\n\n1. **Plain HTTP vs HTTPS:** Daraja will strictly refuse to send callbacks to unencrypted \`http://\` endpoints. Your webhook URL must use valid HTTPS on port 443.\n2. **Non-Standard Ports:** Safaricom's firewalls block callbacks to ports like 3000, 8080, or 8443. Your reverse proxy (Nginx, Cloudflare, or AWS ALB) must listen on standard port 443.\n3. **Broken TLS Certificate Chains:** If your server uses a free SSL certificate whose intermediate certificate chain is missing or untrusted by Java/Safaricom root stores, the handshake is dropped without notification.\n4. **Cloudflare WAF / Managed Bot Challenges:** If your callback endpoint is behind Cloudflare "Under Attack Mode" or a Managed Challenge, Safaricom's automated HTTP client is flagged as a bot and blocked with a 403 Forbidden.\n5. **Slow Webhook Execution (>5 Seconds):** Safaricom expects a \`200 OK\` HTTP response within 3 to 5 seconds. If your webhook handler executes long database queries, sends emails, or calls ERP APIs synchronously, Safaricom terminates the connection and flags your URL as unresponsive.\n\n### The Cure: Decouple Ingestion from Processing\nAlways return \`res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" })\` within 200 milliseconds, and offload all order fulfillment to a background queue such as Redis BullMQ or AWS SQS.`
      },
      {
        heading: 'Frequently Asked Questions (FAQ)',
        body: `### Frequently Asked Questions\n\n• **Q: What is the difference between ResultCode 1032 and ResultCode 1037?**\nResultCode 1032 indicates the customer manually touched their phone screen to cancel the M-Pesa prompt. ResultCode 1037 means the phone remained untouched and the SIM Toolkit prompt timed out automatically after 25–30 seconds.\n\n• **Q: How can I test Daraja callbacks on my local development machine?**\nSafaricom cannot reach \`localhost\`. You must use a secure tunneling proxy such as Ngrok or Cloudflare Tunnels (e.g., \`https://xyz.ngrok-free.app/api/mpesa/callback\`) with an active public HTTPS certificate on port 443.\n\n• **Q: Can I retrieve a customer\'s payment if the callback was lost?**\nYes. You can poll the official Daraja STK Push Query API using the \`CheckoutRequestID\` and \`BusinessShortCode\`. It will return the final payment status, M-Pesa receipt number, and phone number.\n\n• **Q: Why does my Daraja token request return 401 Unauthorized in production?**\nThis happens if you are using your Sandbox Consumer Key and Secret against \`https://api.safaricom.co.ke\`, or if there are invisible trailing spaces/newlines in your \`.env\` file.\n\n• **Q: Does Safaricom retry failed callbacks?**\n[VERIFY: Safaricom historically retries failed callbacks up to 3 times with exponential backoff on selected C2B endpoints, but STK push webhooks are often delivered only once or dropped if your server fails to respond within 5 seconds]. Therefore, automated reconciliation jobs are mandatory.`
      },
      {
        heading: 'Architecture Review & Fintech Engineering Support',
        body: `Building a zero-loss payment pipeline requires robust state machines, distributed Redis locking, and automated STK Query fallbacks. If your business is losing sales to Daraja payment drops or requires a high-volume payment gateway audit, speak with our senior fintech engineers:\n\n• Estimate your integration scope with our [Interactive Project Cost Calculator](/tools/calculator)\n• Inquire about our [Custom CRM & Backend Software Engineering](/services/custom-crm-development)\n• Direct WhatsApp Consultation: [+254 118 746 676](https://wa.me/254118746676) | Email: [info@domaintechhub.com](mailto:info@domaintechhub.com)`
      }
    ]
  },
  {
    id: 'how-to-integrate-mpesa-stk-push-nextjs-daraja-3',
    title: 'How to Integrate M-Pesa STK Push in Next.js: Complete Daraja 3.0 Guide',
    slug: 'how-to-integrate-mpesa-stk-push-nextjs-daraja-3',
    category: 'Fintech & Payments',
    publishedDate: 'October 30th, 2026',
    readTime: '11 min read',
    featured: true,
    author: brian,
    excerpt: 'Learn how to integrate M-Pesa STK Push in Next.js (Daraja 3.0) with complete, working TypeScript route handlers for OAuth tokens, STK push initiation, and webhook callbacks.',
    coverImage: '/images/articles/ecommerce-mpesa-kenya.jpg',
    tags: [
      'How to Integrate M-Pesa STK Push in Next.js',
      'Next.js M-Pesa Integration',
      'Daraja 3.0 TypeScript',
      'Lipa Na M-Pesa Online',
      'Next.js App Router Payments',
      'Kenya Fintech'
    ],
    keyTakeaways: [
      'Next.js 14/15 App Router Route Handlers provide the ideal serverless runtime for secure Daraja 3.0 token generation and push requests.',
      'Never expose your Safaricom Consumer Secret, Passkey, or Shortcode to the browser bundle; keep them strictly in server environment variables.',
      'Cache your Daraja OAuth 2.0 access tokens in server memory or Redis to eliminate redundant token requests and avoid Safaricom rate limits.',
      'STK callbacks must be acknowledged with HTTP 200 within 2 seconds, while the payment record is atomically locked against duplicate processing.',
      'Pair your callback listener with an active STK Push Query background job to catch offline or delayed telecom deliveries.'
    ],
    contentSections: [
      {
        heading: 'Introduction: Why Next.js & Daraja 3.0 Are the Gold Standard',
        body: `Learning **How to Integrate M-Pesa STK Push in Next.js** is an essential superpower for modern fullstack engineers building software in Kenya and East Africa. With over 32 million active Safaricom M-Pesa users processing billions of shillings daily, offering a seamless, 1-click mobile checkout directly inside a Next.js web application delivers conversion rates up to 300% higher than traditional credit card forms.\n\nIn this complete architectural guide, we build a production-grade Lipa Na M-Pesa Online (STK Push) integration using the Next.js 14/15 App Router and TypeScript. You will get complete, working code for OAuth token caching, encrypted password generation, the checkout dispatch endpoint, and an idempotent webhook callback receiver.\n\nBefore writing code, ensure you have an active account on the [Safaricom Daraja Developer Portal](https://developer.safaricom.co.ke) with a test app created under the Daraja 3.0 Sandbox.`
      },
      {
        heading: 'Prerequisites & Environment Configuration',
        body: `Create or open your \`.env.local\` file in your Next.js project root. Add your credentials obtained from the Daraja developer portal. Remember that in production, you must use your live Paybill or Till ShortCode, production Passkey, and live credentials:`,
        codeSnippet: `# Safaricom Daraja 3.0 Environment Variables (.env.local)
MPESA_ENVIRONMENT="sandbox" # or "production"
MPESA_CONSUMER_KEY="your_daraja_consumer_key_here"
MPESA_CONSUMER_SECRET="your_daraja_consumer_secret_here"
MPESA_PASSKEY="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
MPESA_SHORTCODE="174379" # Default Daraja test shortcode
MPESA_CALLBACK_URL="https://yourdomain.com/api/mpesa/callback"`
      },
      {
        heading: 'Step 1: OAuth 2.0 Access Token Generation with In-Memory Caching',
        body: `Safaricom access tokens remain valid for 3,599 seconds (1 hour). Calling the OAuth endpoint on every checkout request adds 400ms of unnecessary latency and quickly exhausts your API quota. We implement an in-memory token cache with a 5-minute safety buffer in \`src/lib/mpesa/token.ts\`:`,
        codeSnippet: `// src/lib/mpesa/token.ts
interface CachedToken {
  token: string;
  expiresAt: number;
}

let memoryTokenCache: CachedToken | null = null;

export async function getDarajaAccessToken(): Promise<string> {
  const now = Date.now();
  
  // Return cached token if valid for at least another 5 minutes (300,000ms)
  if (memoryTokenCache && memoryTokenCache.expiresAt > now + 300000) {
    return memoryTokenCache.token;
  }

  const isProd = process.env.MPESA_ENVIRONMENT === 'production';
  const url = isProd
    ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET environment variables');
  }

  const credentials = Buffer.from(\`\${consumerKey}:\${consumerSecret}\`).toString('base64');

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: \`Basic \${credentials}\`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(\`Failed to fetch Daraja access token: \${res.status} \${errorText}\`);
  }

  const data = await res.json();
  const expiresInSeconds = parseInt(data.expires_in, 10) || 3599;

  memoryTokenCache = {
    token: data.access_token,
    expiresAt: now + expiresInSeconds * 1000,
  };

  return data.access_token;
}`
      },
      {
        heading: 'Step 2: Password Generator & Phone Number Sanitizer',
        body: `Daraja requires the phone number in the standard \`2547XXXXXXXX\` or \`2541XXXXXXXX\` format (no leading plus sign, no zero). The password is a Base64-encoded string combining the ShortCode, Passkey, and an East Africa Time (EAT) timestamp formatted as \`YYYYMMDDHHmmss\`:`,
        codeSnippet: `// src/lib/mpesa/utils.ts
export function sanitizeKenyanPhoneNumber(phone: string): string {
  // Strip all whitespace, dashes, and special characters
  let cleaned = phone.replace(/[^0-9]/g, '');

  // Handle +254 or 254 prefixes
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return cleaned;
  }
  // Handle 07XXXXXXXX or 01XXXXXXXX
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return '254' + cleaned.substring(1);
  }
  // Handle 7XXXXXXXX or 1XXXXXXXX
  if ((cleaned.startsWith('7') || cleaned.startsWith('1')) && cleaned.length === 9) {
    return '254' + cleaned;
  }

  throw new Error('Invalid Kenyan mobile phone number format. Must be 07XX or 01XX.');
}

export function generateDarajaSecurityCredentials() {
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  
  const now = new Date();
  // Adjust to East Africa Time (UTC+3)
  const eatOffsetMinutes = 3 * 60;
  const eatDate = new Date(now.getTime() + (eatOffsetMinutes + now.getTimezoneOffset()) * 60000);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timestamp =
    eatDate.getFullYear().toString() +
    pad(eatDate.getMonth() + 1) +
    pad(eatDate.getDate()) +
    pad(eatDate.getHours()) +
    pad(eatDate.getMinutes()) +
    pad(eatDate.getSeconds());

  const rawPassword = \`\${shortcode}\${passkey}\${timestamp}\`;
  const password = Buffer.from(rawPassword).toString('base64');

  return { shortcode, timestamp, password };
}`
      },
      {
        heading: 'Step 3: Creating the STK Push Initiation Route Handler',
        body: `Create the Next.js API route handler at \`src/app/api/mpesa/stkpush/route.ts\`. This handler validates incoming requests from your React front-end, generates the authentication credentials, calls Safaricom, and returns the \`CheckoutRequestID\` to the browser:`,
        codeSnippet: `// src/app/api/mpesa/stkpush/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDarajaAccessToken } from '@/lib/mpesa/token';
import { generateDarajaSecurityCredentials, sanitizeKenyanPhoneNumber } from '@/lib/mpesa/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber, amount, accountReference, transactionDesc } = body;

    if (!phoneNumber || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid phone number and positive integer amount are required' },
        { status: 400 }
      );
    }

    const sanitizedPhone = sanitizeKenyanPhoneNumber(phoneNumber);
    const token = await getDarajaAccessToken();
    const { shortcode, password, timestamp } = generateDarajaSecurityCredentials();

    const isProd = process.env.MPESA_ENVIRONMENT === 'production';
    const endpoint = isProd
      ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline', // or CustomerBuyGoodsOnline
      Amount: Math.round(Number(amount)),
      PartyA: sanitizedPhone,
      PartyB: shortcode,
      PhoneNumber: sanitizedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: (accountReference || 'OrderRef').substring(0, 12),
      TransactionDesc: (transactionDesc || 'Online Payment').substring(0, 13),
    };

    const darajaRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: \`Bearer \${token}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await darajaRes.json();

    if (!darajaRes.ok || responseData.ResponseCode !== '0') {
      return NextResponse.json(
        { error: responseData.errorMessage || responseData.ResponseDescription || 'STK Push failed' },
        { status: 502 }
      );
    }

    // Return tracking IDs to the client for polling
    return NextResponse.json({
      success: true,
      MerchantRequestID: responseData.MerchantRequestID,
      CheckoutRequestID: responseData.CheckoutRequestID,
      CustomerMessage: responseData.CustomerMessage,
    });
  } catch (error: any) {
    console.error('[Daraja STK Push Error]:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}`
      },
      {
        heading: 'Step 4: Idempotent Callback Webhook Handler',
        body: `When the customer enters their PIN, Safaricom sends an HTTP POST request to your registered \`MPESA_CALLBACK_URL\`. We construct the route at \`src/app/api/mpesa/callback/route.ts\` to handle the webhook safely without duplicate order fulfillment:`,
        codeSnippet: `// src/app/api/mpesa/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const stkCallback = rawBody?.Body?.stkCallback;

    if (!stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid payload' }, { status: 400 });
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    // Fast 200 OK acknowledgment to prevent Safaricom retry flood
    // Heavy jobs (PDF invoices, WhatsApp notifications) must be queued
    if (ResultCode === 0 && CallbackMetadata) {
      // Payment Successful
      let mpesaReceipt = '';
      let amountPaid = 0;
      let transactionDate = '';
      let phoneNumber = '';

      for (const item of CallbackMetadata.Item || []) {
        if (item.Name === 'MpesaReceiptNumber') mpesaReceipt = String(item.Value);
        if (item.Name === 'Amount') amountPaid = Number(item.Value);
        if (item.Name === 'TransactionDate') transactionDate = String(item.Value);
        if (item.Name === 'PhoneNumber') phoneNumber = String(item.Value);
      }

      console.log(\`[M-Pesa Success]: Receipt \${mpesaReceipt}, Amount KES \${amountPaid}, Phone \${phoneNumber}\`);
      
      // TODO: In your database, execute an atomic transaction:
      // UPDATE orders SET status = 'paid', mpesa_receipt = mpesaReceipt WHERE checkout_request_id = CheckoutRequestID AND status != 'paid';
    } else {
      // Payment Failed, Cancelled (1032), or Timed Out (1037)
      console.warn(\`[M-Pesa Failed]: CheckoutRequestID \${CheckoutRequestID}, Code \${ResultCode}: \${ResultDesc}\`);
      // UPDATE orders SET status = 'failed', failure_reason = ResultDesc WHERE checkout_request_id = CheckoutRequestID;
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' }, { status: 200 });
  } catch (err: any) {
    console.error('[M-Pesa Webhook Exception]:', err);
    // Always return 200 to Safaricom if you received the bytes to prevent blacklisting
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Caught exception' }, { status: 200 });
  }
}`
      },
      {
        heading: 'Frequently Asked Questions (FAQ)',
        body: `### Frequently Asked Questions\n\n• **Q: Can I run this M-Pesa integration in Next.js Server Actions instead of Route Handlers?**\nYes! For initiating the STK push, a Next.js Server Action works cleanly. However, your webhook callback MUST remain an HTTP Route Handler (\`route.ts\`) because Safaricom delivers webhooks as raw incoming HTTP POST requests from external servers.\n\n• **Q: How does the front-end know when the customer has finished entering their PIN?**\nBecause the callback arrives asynchronously on your server, your React front-end can either poll an internal endpoint (\`/api/orders/status?id=...\`) every 2 seconds, or use WebSockets/Server-Sent Events (SSE) to receive instant updates when the webhook writes to the database.\n\n• **Q: Does Safaricom require an SSL certificate for the callback URL in Sandbox?**\nYes. Even in Sandbox mode, Safaricom requires an active, public HTTPS URL. You can use free tools like Cloudflare Tunnels or Ngrok during local Next.js development.\n\n• **Q: What is the maximum transaction limit for M-Pesa STK Push in Kenya?**\nAs authorized by the Central Bank of Kenya, the single transaction limit for M-Pesa is KSh 250,000, with a maximum daily transaction limit of KSh 500,000 per customer account.\n\n• **Q: How do I test with real money before full public launch?**\nSwitch your credentials to your live Paybill or Till, initiate a test transaction of KSh 10 or KSh 50, and verify that the payment reflects on your Safaricom M-Pesa business statement and triggers your Next.js webhook handler.`
      },
      {
        heading: 'Next Steps & Production Scaling',
        body: `Deploying a mission-critical checkout requires end-to-end monitoring, KRA eTIMS invoice emission, and database concurrency management. Explore our specialized services:\n\n• Discover our [Custom E-Commerce & M-Pesa Solutions](/services/ecommerce-development)\n• Calculate your bespoke build investment with our [Project Cost Calculator](/tools/calculator)\n• Speak directly with our lead engineers via [WhatsApp Consultation](https://wa.me/254118746676) or email [info@domaintechhub.com](mailto:info@domaintechhub.com).`
      }
    ]
  },
  {
    id: 'etims-api-integration-guide-oscu-vscu-developers',
    title: 'eTIMS API Integration for Developers and ERPs: OSCU vs VSCU Architecture',
    slug: 'etims-api-integration-guide-oscu-vscu-developers',
    category: 'Fintech & Payments',
    publishedDate: 'October 30th, 2026',
    readTime: '10 min read',
    featured: false,
    author: amina,
    excerpt: 'A definitive technical guide to eTIMS API integration in Kenya. Compare OSCU vs VSCU, initialization workflows, invoice signing, QR code generation, and KRA compliance.',
    coverImage: '/images/articles/how-to-generate-an-etims-invoice.webp',
    tags: [
      'eTIMS API Integration',
      'OSCU vs VSCU',
      'KRA eTIMS API',
      'ERP Invoicing Kenya',
      'POS Integration Kenya',
      'Tax Compliance'
    ],
    keyTakeaways: [
      'The KRA eTIMS mandate requires all commercial business transactions in Kenya to be digitally transmitted and cryptographically signed.',
      'OSCU (Online Sales Control Unit) is designed for local retail hardware and desktop POS software with intermittent connectivity.',
      'VSCU (Virtual Sales Control Unit) is the preferred cloud-to-cloud architecture for multi-branch ERPs, SaaS platforms, and e-commerce stores.',
      'eTIMS invoices require strict item classification codes (UNSPSC / HS Codes), sequential invoice numbers, and an official KRA verification QR code URL.',
      'Typical sandbox-to-production certification takes between 3 to 6 weeks, requiring static IP whitelisting and formal KRA sign-off.'
    ],
    contentSections: [
      {
        heading: 'Introduction: The eTIMS API Mandate for Kenyan Developers',
        body: `Implementing a direct **eTIMS API Integration** is now a mandatory technical requirement for any software vendor, ERP provider, or e-commerce merchant operating in Kenya. Under Section 23A of the Tax Procedures Act, all business expenses are non-deductible for income tax purposes unless supported by an electronic tax invoice validated through the Kenya Revenue Authority (KRA) Electronic Tax Invoice Management System (eTIMS).\n\nFor software engineers and IT directors, integrating with eTIMS goes beyond simple web form submissions. It requires establishing an encrypted, authenticated REST/SOAP pipeline that synchronizes inventory, signs customer invoices with cryptographic digests, generates standardized verification QR codes, and handles transmission retry queues when tax authority servers experience downtime.\n\nIn this guide, we break down the two primary integration architectures provided by KRA: **OSCU** and **VSCU**, the technical onboarding sequence, and the common pitfalls that delay production approval.`
      },
      {
        heading: '1. Architecture Breakdown: OSCU vs VSCU Explained',
        body: `KRA offers two distinct integration paradigms depending on your infrastructure topology:\n\n### OSCU (Online Sales Control Unit)\n• **Deployment:** Deployed as a localized software module or client daemon running on the merchant's local machine or on-premise retail POS server.\n• **Connectivity Mode:** Designed to support offline operation. If the retail store loses internet connectivity, the OSCU module signs transactions locally, buffers the cryptographically signed receipts, and syncs them automatically to KRA servers once internet connectivity is restored.\n• **Ideal For:** Supermarkets, hardware stores, pharmacies, restaurants, and retail point-of-sale environments with physical checkout lanes.\n\n### VSCU (Virtual Sales Control Unit)\n• **Deployment:** A purely cloud-based, server-to-server API pipeline. Your centralized cloud backend (AWS, GCP, Azure, or private VPS) communicates directly with KRA's eTIMS endpoints via mutual authentication.\n• **Connectivity Mode:** Requires real-time internet connectivity. Invoices are transmitted and validated on-the-fly as orders are placed.\n• **Ideal For:** Cloud ERP systems (SAP, Oracle, Odoo, Microsoft Dynamics 365), custom SaaS billing engines, and high-volume e-commerce stores.\n\n| Technical Feature | OSCU (Online Sales Control Unit) | VSCU (Virtual Sales Control Unit) |\n|---|---|---|\n| Primary Architecture | Local client daemon / edge device | Cloud server-to-server REST/JSON API |\n| Offline Buffering | Native local queue & sync on reconnect | Application must build its own retry queue |\n| Installation Footprint | Per-lane or per-store local installation | Centralized cloud server deployment |\n| Best Business Fit | Retail POS, physical store counters | Cloud ERPs, SaaS platforms, e-commerce |\n| Hardware Requirements | Windows / Linux local edge terminal | Cloud server with dedicated static IP |`
      },
      {
        heading: '2. Integration Prerequisites & Sandbox Onboarding',
        body: `Before your engineers can write code against KRA endpoints, your organization must complete the formal administrative and network onboarding steps:\n\n1. **KRA PIN & iTax Compliance:** Your business entity must possess an active KRA PIN with an updated tax compliance status (TCC).\n2. **eTIMS Portal Registration:** Sign up on the official [KRA eTIMS Portal](https://etims.kra.go.ke/) and select "System-to-System Integration (VSCU/OSCU)".\n3. **Static IP Whitelisting:** KRA firewalls enforce strict IP whitelisting. You must provide the dedicated public IPv4 address of your production and staging servers.\n4. **Credential Provisioning:** KRA issues an integration toolkit comprising your test PIN, Branch ID, Device Serial Number, and digital encryption certificates.\n5. **Standard Timeline:** From submitting the initial developer questionnaire to receiving sandbox API credentials typically takes 1 to 2 weeks. Production testing and sign-off require an additional 2 to 4 weeks.`
      },
      {
        heading: '3. Technical Workflow: From Initialization to QR Invoice',
        body: `The eTIMS transactional sequence follows four distinct phases:\n\n### Step A: Device Initialization (\`/selectInitInfo\`)\nUpon system boot, your ERP calls the initialization endpoint to verify that the virtual device serial number and branch code are active. KRA responds with the active fiscal sequence number, encryption keys, and server timestamp.\n\n### Step B: Item Master Synchronization (\`/saveItem\`)\nEvery product or service SKU in your ERP must be registered with KRA alongside its standardized classification code (UNSPSC code or HS Code) and applicable VAT rate (e.g., 16% standard rate, 0% zero-rated, or exempt). You cannot issue an invoice for an unregistered item code.\n\n### Step C: Invoice Signing & Digest Generation\nWhen a sale occurs, your server compiles the JSON invoice payload, calculates tax components, and generates a SHA-256 cryptographic hash combining the previous invoice digest, current transaction data, and your private key.\n\n### Step D: Verification QR Code String Construction\nEvery eTIMS invoice must feature a scannable QR code. The QR code encodes a specific URL format pointing to KRA's public verification portal:\n\`https://etims.kra.go.ke/verification/invoice?tin={PIN}&bhfId={BRANCH}&invcNo={INVOICE_NUM}&rcptSign={SIGNATURE}\`\n\nCustomers or tax auditors scanning this code with any smartphone camera immediately see the verified receipt details hosted on KRA's servers. Explore our turnkey [POS Systems & eTIMS Integrations](/services/pos-systems).`,
        codeSnippet: `// TypeScript: Constructing Standard KRA eTIMS Verification QR Code URL
export function generateKraEtimsQrUrl(params: {
  kraPin: string;
  branchId: string;
  invoiceNumber: string;
  receiptSignature: string;
}): string {
  const baseUrl = 'https://etims.kra.go.ke/verification/invoice';
  const queryParams = new URLSearchParams({
    tin: params.kraPin.toUpperCase().trim(),
    bhfId: params.branchId.trim(),
    invcNo: params.invoiceNumber.trim(),
    rcptSign: params.receiptSignature.trim(),
  });

  return \`\${baseUrl}?\${queryParams.toString()}\`;
}`
      },
      {
        heading: '4. Top 5 Integration Pitfalls Developers Make',
        body: `Based on dozens of ERP and POS integrations conducted by Domain Tech Hub engineers in Nairobi, these are the most critical issues to guard against:\n\n• **1. Missing UNSPSC / Commodity Classification Codes:** Attempting to submit sales with generic descriptions like "Consulting Services" or "Goods" without the mandatory 8-digit international classification code will cause KRA to return a validation rejection.\n• **2. Floating Point Rounding Inaccuracies:** KRA validates line-item taxes and totals down to two decimal places. Using standard IEEE 754 floating-point math in JavaScript can produce values like \`159.99999999\`, triggering mathematical mismatch errors. Always use integer cents or dedicated BigNumber libraries.\n• **3. Synchronous Blocking on Unstable Network Calls:** KRA's sandbox and production endpoints occasionally experience maintenance windows. If your checkout UI blocks synchronously while waiting for eTIMS responses, your entire store will freeze. Implement a resilient offline FIFO (First-In, First-Out) queuing system.\n• **4. Non-Sequential Invoice Numbering:** Invoice counters must be strictly sequential per branch. Gaps or duplicates caused by database rollbacks will invalidate your fiscal audit trail.\n• **5. Timezone Inconsistencies:** All transaction timestamps must be submitted in East Africa Time (UTC+3) formatted as \`YYYYMMDDHHmmss\`. Submitting UTC timestamps will cause validation rejections for "future-dated transactions".`
      },
      {
        heading: 'Frequently Asked Questions (FAQ)',
        body: `### Frequently Asked Questions\n\n• **Q: Can small businesses integrate eTIMS without building custom software?**\nYes. Small businesses with low invoice volumes can use KRA's free eTIMS Web Portal, the eTIMS Client Software, or the eTIMS USSD service (*222#). Direct API integration is primarily recommended for businesses with over 20 transactions daily, e-commerce stores, or existing ERP/POS systems.\n\n• **Q: Does eTIMS replace my physical ETR machine?**\nYes. eTIMS is a complete software-based replacement for legacy electronic tax registers (ETRs). Once your VSCU or OSCU solution is certified and live, you no longer need physical ETR hardware or fiscal memory upgrades.\n\n• **Q: How long does it take to certify a custom ERP with KRA?**\nThe technical development typically takes 2 to 3 weeks, while KRA sandbox verification, scenario testing (sales, credit notes, stock adjustments), and final production issuance take another 2 to 3 weeks.\n\n• **Q: Can we issue credit notes and invoice cancellations through the eTIMS API?**\nYes. eTIMS provides dedicated endpoints for credit notes and debit notes. Every credit note must reference the original invoice number and specify a valid cancellation reason code.\n\n• **Q: What happens if our server loses internet connection during a sale?**\nIf using OSCU, the local unit continues signing invoices offline and synchronizes once reconnected. If using VSCU, your system must store the invoice in an encrypted queue and transmit it as soon as the connection is re-established.`
      },
      {
        heading: 'Need Professional eTIMS Integration Support?',
        body: `Domain Tech Hub engineers architect and certify turnkey eTIMS integrations for custom web platforms, Shopify, WooCommerce, Odoo, and enterprise ERPs across Kenya:\n\n• Plan your compliance budget with our [Interactive System Cost Calculator](/tools/calculator)\n• Read our practical [How to Generate an eTIMS Invoice Guide](/insights/how-to-generate-an-etims-invoice)\n• Connect with an Integration Architect: Call [+254 118 746 676](tel:+254118746676) or email [info@domaintechhub.com](mailto:info@domaintechhub.com).`
      }
    ]
  },
  {
    id: 'pesapal-vs-flutterwave-vs-dpo-vs-paystack-kenya',
    title: 'Pesapal vs Flutterwave vs DPO vs Paystack in Kenya: 2026 Payment Gateway Comparison',
    slug: 'pesapal-vs-flutterwave-vs-dpo-vs-paystack-kenya',
    category: 'Fintech & Payments',
    publishedDate: 'October 30th, 2026',
    readTime: '11 min read',
    featured: false,
    author: brian,
    excerpt: 'Compare Pesapal vs Flutterwave vs DPO vs Paystack in Kenya. Detailed breakdown of transaction fees, M-Pesa STK push reliability, card acceptance, and settlement times.',
    coverImage: '/images/articles/multi-currency-flutterwave-stripe-east-africa.webp',
    tags: [
      'Pesapal vs Flutterwave vs DPO vs Paystack in Kenya',
      'Kenya Payment Gateways',
      'Payment Gateway Comparison Kenya',
      'Pesapal Review Kenya',
      'Paystack Kenya',
      'M-Pesa Gateway'
    ],
    keyTakeaways: [
      'Pesapal offers the deepest local Kenyan banking ties, direct CBK regulation, and integrated physical Sabi POS terminals.',
      'Paystack (a Stripe company) delivers the industry gold standard for developer experience, webhooks, and sub-second modern checkout modals.',
      'DPO Group (Network International) is the undisputed powerhouse for high-ticket safari tourism, airlines, and multi-currency international credit card processing.',
      'Flutterwave is ideal for pan-African merchants accepting mobile money across multiple African currencies (KES, UGX, TZS, RWF, NGN, GHS).',
      'Settlement speeds range from T+1 for local M-Pesa on Pesapal and Paystack to T+3 or T+7 for high-risk international card collections.'
    ],
    contentSections: [
      {
        heading: 'Executive Summary: Choosing the Right Kenyan Payment Gateway',
        body: `When evaluating **Pesapal vs Flutterwave vs DPO vs Paystack in Kenya**, choosing the wrong payment gateway can cost your business tens of thousands of shillings in elevated transaction fees, delayed bank settlements, and frustrated customers abandoning failed M-Pesa checkouts.\n\nWhile direct integration with Safaricom Daraja 3.0 offers the lowest per-transaction fees for pure M-Pesa payments, third-party payment service providers (PSPs) allow you to accept Visa, Mastercard, American Express, M-Pesa, and regional mobile money (Airtel Money, MTN MoMo) through a single unified API with automated reconciliation and hosted checkout modals.\n\nIn this comprehensive 2026 benchmark, Domain Tech Hub compares the four premier payment aggregators in Kenya across transaction pricing, onboarding friction, settlement reliability, developer tooling, and ideal business fit.`
      },
      {
        heading: 'Side-by-Side Comparison Matrix (2026 Kenya Benchmark)',
        body: `The table below summarizes verified pricing, settlement terms, and capabilities across Kenya's leading payment gateways:\n\n| Feature / Metric | Pesapal | Flutterwave | DPO Group (Network Int.) | Paystack (Stripe) |\n|---|---|---|---|---|\n| M-Pesa Fee | ~2.5% to 3.0% (Tiered volume available) | ~2.9% to 3.5% | ~3.0% to 3.8% | ~1.5% to 2.5% (Competitive local pricing) |\n| Local Card Fee (Visa/Mastercard) | ~3.0% to 3.5% | ~2.9% to 3.5% | ~3.5% to 4.5% | ~2.9% + KES 0 per local transaction |\n| International Card Fee | ~3.5% to 4.5% | ~3.8% to 4.2% | ~3.8% to 4.5% (High volume custom tiers) | ~3.9% + flat charge |\n| Setup / Annual Fee | Zero setup; monthly portal fee waived | Free account creation | May require application/setup fee [VERIFY: DPO custom onboarding] | Free account creation |\n| Settlement Timelines | T+1 to T+2 to Kenyan banks / M-Pesa | T+1 to T+3 to Kenyan bank account | T+2 to T+7 depending on merchant risk tier | T+1 to local bank accounts |\n| Multi-Currency Support | KES, USD, UGX, TZS | 30+ African & Global currencies (USD, EUR, GBP) | KES, USD, EUR, GBP, ZAR | KES, USD (expanding) |\n| Physical Hardware | Sabi POS Android smart terminals | None (pure digital) | Terminal partnerships | Focused on software checkout |\n| Developer Experience | Good (REST APIs, WooCommerce plugins) | Good (Modern SDKs, Webhooks) | Moderate (Legacy SOAP/REST hybrid) | Outstanding (Stripe-grade docs, interactive SDKs) |\n| Best For | Local retail, schools, hospitality, SMEs | Pan-African SaaS, regional cross-border | Safari tour operators, hotels, airlines | Tech startups, SaaS, modern React/Next.js apps |`
      },
      {
        heading: '1. Pesapal: The Undisputed Local Champion & POS Integrator',
        body: `Founded in Kenya in 2009 and licensed as a Payment Service Provider by the Central Bank of Kenya (CBK), **Pesapal** is the household name for digital payments in Kenya.\n\n### Core Strengths\n• **Direct Bank & M-Pesa Ties:** Highly stable direct connections to Kenyan clearing banks, Safaricom, and Airtel Money.\n• **Omnichannel Ecosystem:** In addition to online payments, Pesapal provides **Sabi POS** Android hardware terminals for physical restaurants, bars, and retail shops, allowing unified reporting across in-store and online sales.\n• **Local Support:** Dedicated physical offices on Rhapta Road, Nairobi, with phone support and account managers who understand local Kenyan business realities.\n• **Pre-Built CMS Plugins:** Mature, battle-tested plugins for WooCommerce, Shopify, Magento, and OpenCart.\n\n### Limitations\n• API documentation, while functional, lacks the modern developer polish and interactive testing sandboxes of Stripe or Paystack.\n• International card processing fees can be higher than specialized cross-border merchant accounts.`
      },
      {
        heading: '2. Flutterwave: The Pan-African Cross-Border Powerhouse',
        body: `**Flutterwave** is designed for businesses whose ambitions stretch beyond Kenya across the African continent and international markets.\n\n### Core Strengths\n• **Continental Coverage:** Accept payments seamlessly in over 30 currencies, including Ugandan Shilling (UGX), Tanzanian Shilling (TZS), Rwandan Franc (RWF), Nigerian Naira (NGN), and Ghanaian Cedi (GHS).\n• **Modern Checkout Modal:** Highly responsive checkout UI that detects customer geolocation and automatically surfaces their preferred local payment method.\n• **Virtual Cards & Payouts:** Robust API endpoints for creating virtual dollar cards and executing automated mass disbursements to bank accounts and mobile money wallets across Africa.\n\n### Limitations\n• Regulatory and compliance scrutiny has occasionally led to temporary feature adjustments in certain jurisdictions.\n• Local Kenyan customer support response times can be slower during peak ticket volumes compared to local providers.`
      },
      {
        heading: '3. DPO Group: The Standard for High-Ticket Safari & Tourism',
        body: `Acquired by global payments giant **Network International**, **DPO Group** (Direct Pay Online) is the premier payment gateway for Kenya's luxury safari operators, travel agencies, beach resorts, and regional airlines.\n\n### Core Strengths\n• **High-Ticket Risk & Fraud Engine:** Capable of handling $5,000 to $50,000 international luxury tour bookings with sophisticated fraud screening and 3D Secure verification.\n• **Direct Multi-Currency Settlement:** Settle funds directly into local USD, EUR, or GBP foreign currency bank accounts in Nairobi without forced currency conversions.\n• **Virtual Terminal & Payment Links:** Staff can generate branded payment links sent via WhatsApp or email for custom safari itineraries without the customer visiting a shopping cart.\n\n### Limitations\n• Stringent onboarding compliance: Requires extensive documentation, corporate guarantees, and trading history, making it unsuitable for early-stage startups.\n• Legacy developer APIs: The integration interface is more complex and less modern than Paystack or Stripe.`
      },
      {
        heading: '4. Paystack: The Gold Standard for Modern Developers',
        body: `Acquired by **Stripe**, **Paystack** launched official operations in Kenya to bring world-class developer tooling, beautiful checkout modals, and effortless subscription management to East African software teams.\n\n### Core Strengths\n• **World-Class Developer Experience:** Flawless TypeScript SDKs, exhaustive documentation, webhook test simulators, and instant sandbox keys without waiting for manual approval.\n• **Micro-Interactions & Conversion:** The Paystack popup modal delivers unmatched completion rates on mobile devices, with seamless tab switching between M-Pesa STK push and Card entry.\n• **Automated Recurring Billing:** Built-in subscription engine that handles recurring credit card charges and tokenized payments effortlessly.\n• **Transparent Dashboard:** Clean, instantaneous transaction tracking with audit logs and automated CSV financial exports.\n\n### Limitations\n• Primarily digital-first: Does not currently offer local physical smart POS hardware in Kenya like Pesapal Sabi.\n• Expanding local mobile money features compared to providers with 15+ years of exclusive Kenyan focus.`
      },
      {
        heading: 'The Decision Matrix: Which Gateway Should You Pick?',
        body: `To make the right choice for your specific enterprise:\n\n• **Choose Pesapal if:** You operate a brick-and-mortar retail business, school, or restaurant in Nairobi requiring physical POS card terminals alongside your website, or you prioritize having an account manager you can visit in person.\n• **Choose Paystack if:** You are building a custom React, Next.js, or mobile app, running a SaaS subscription product, or demand the absolute best developer experience and fastest checkout speeds.\n• **Choose DPO Group if:** You are a tour operator, luxury camp, boutique hotel, or travel aggregator selling multi-thousand-dollar safari packages to American and European travelers in USD/EUR.\n• **Choose Flutterwave if:** You sell products across East, West, and Central Africa and need to collect mobile money in Uganda, Rwanda, Tanzania, and Kenya through a single dashboard.\n\nConsult our engineers to build custom multi-gateway routing in our [Custom CRM & Backend Software Engineering](/services/custom-crm-development) or explore our [E-Commerce Web Design Services](/services/ecommerce-development).`
      },
      {
        heading: 'Frequently Asked Questions (FAQ)',
        body: `### Frequently Asked Questions\n\n• **Q: Can I integrate direct Safaricom Daraja alongside a payment gateway?**\nYes! Many large Kenyan e-commerce platforms use direct Safaricom Daraja for M-Pesa payments (to benefit from minimal transaction costs) while routing international credit cards through Paystack, Pesapal, or DPO.\n\n• **Q: Do these payment gateways hold rolling reserves?**\nYes. For international card processing and high-risk industries (such as ticketing, travel, and tours), gateways often retain a rolling reserve of 5% to 10% for 90 to 180 days to safeguard against chargebacks and fraud.\n\n• **Q: How long does merchant onboarding take in Kenya?**\nPaystack and Flutterwave typically approve standard accounts within 24 to 72 hours. Pesapal takes 2 to 5 business days, while DPO Group onboarding can take 1 to 3 weeks due to extensive KYC and bank compliance.\n\n• **Q: Can I receive USD payments directly into my Kenyan bank account?**\nYes. DPO Group, Flutterwave, and Pesapal support direct settlement into local USD foreign currency accounts (FCA) held at Kenyan banks like NCBA, Equity Bank, Stanbic, and KCB.\n\n• **Q: Are all these payment gateways approved by the Central Bank of Kenya (CBK)?**\nYes. Under the National Payment System Act, all reputable payment aggregators operating in Kenya must be licensed or authorized by the Central Bank of Kenya.`
      },
      {
        heading: 'Architect Your Payment Infrastructure with Domain Tech Hub',
        body: `Whether you need an automated Next.js checkout, multi-currency routing, or direct Safaricom Daraja integration, Domain Tech Hub provides battle-tested engineering:\n\n• Calculate your complete e-commerce build budget using our [Interactive Cost Calculator](/tools/calculator)\n• Inquire about our [Safaricom Daraja & Payment Engineering](/services/ecommerce-development)\n• Contact Our Lead Architects: Phone [+254 118 746 676](tel:+254118746676) | WhatsApp [+254 118 746 676](https://wa.me/254118746676) | Email [info@domaintechhub.com](mailto:info@domaintechhub.com)`
      }
    ]
  },
  {
    id: 'school-website-design-development-kenya-cost-features',
    title: 'Website for a School in Kenya: Cost, Essential Features & Parent Portal Guide',
    slug: 'school-website-design-development-kenya-cost-features',
    category: 'Modern Engineering',
    publishedDate: 'October 30th, 2026',
    readTime: '9 min read',
    featured: false,
    author: faith,
    excerpt: 'A complete guide to designing a modern website for a school in Kenya. Detailed costs, CBC curriculum showcases, automated M-Pesa fee payments, and parent portals.',
    coverImage: '/images/articles/website-design-in-kenya-2026.webp',
    tags: [
      'Website for a School in Kenya',
      'School Website Design Kenya',
      'School Portal Development Nairobi',
      'CBC Curriculum Website',
      'M-Pesa School Fees Integration',
      'School Management System Kenya'
    ],
    keyTakeaways: [
      'A professional school website in Kenya costs between KSh 45,000 for a basic showcase site to KSh 350,000+ for an integrated school portal with M-Pesa fee collection.',
      'Under Kenya\'s CBC curriculum, school websites must visually showcase experiential learning, STEM robotics, sports facilities, and talent pathways to attract enrollments.',
      'Integrating automated Lipa Na M-Pesa STK push for school fees reconciles payments directly against student admission numbers, eliminating fake bank slip fraud.',
      'Essential features include downloadable termly newsletters, online admission forms with document upload, and an academic calendar.',
      'A secure student/parent portal streamlines termly report card downloads, fee statements, and teacher-parent communication.'
    ],
    contentSections: [
      {
        heading: 'Introduction: The Digital Front Door of a Modern Kenyan School',
        body: `Investing in a modern **Website for a School in Kenya** is one of the highest-leverage decisions a school director, principal, or Board of Management (BOM) can make. Today\'s Kenyan parents—millennial and tech-savvy professionals living in Nairobi, Mombasa, Nakuru, Eldoret, and across the diaspora—do not choose schools from roadside billboards. They research on smartphones, evaluate facilities on Instagram and Google, review the Competency-Based Curriculum (CBC) offerings, and expect to apply and pay fees digitally.\n\nA school website is no longer a static digital brochure. It is a 24/7 admissions office, a secure fee collection hub, and a trusted communication bridge between teachers, parents, and learners.\n\nIn this comprehensive guide, Domain Tech Hub breaks down realistic development costs in Kenya, must-have institutional features, and how to build a parent portal that automates administrative headaches.`
      },
      {
        heading: '1. Realistic Cost Breakdown for School Websites in Kenya (2026 Pricing)',
        body: `School website budgets vary significantly based on institutional scale and technical scope. Below is the verified 2026 pricing benchmark for Kenyan educational institutions:\n\n| School Website Tier | Average Cost Range (KSh) | Core Features Included | Typical Delivery Timeline |\n|---|---|---|---|\n| Starter School Showcase | KSh 45,000 – KSh 85,000 | 5–8 pages, CBC curriculum overview, photo gallery, location map, contact forms, mobile-friendly design | 2 – 3 weeks |\n| Comprehensive School & Admissions Portal | KSh 90,000 – KSh 160,000 | Online admissions with document uploads, automated M-Pesa fee payment integration, downloadable newsletters, events calendar | 3 – 5 weeks |\n| Full Institutional Campus & Parent Portal | KSh 180,000 – KSh 350,000+ | Student/parent login, termly PDF report card generator, SMS alerts, staff directory, library catalog, multi-branch management | 6 – 10 weeks |\n\nTest your specific school requirements using our [Interactive School System Cost Calculator](/tools/calculator).`
      },
      {
        heading: '2. Must-Have Features Every Modern Kenyan School Website Needs',
        body: `To stand out against competing private and international academies, your school website must incorporate these fundamental pillars:\n\n### 1. CBC Curriculum & Co-Curricular Showcase\nWith Kenya\'s transition to the Competency-Based Curriculum (CBC) and Junior Secondary School (JSS), parents want proof that your school nurtures practical competencies. Dedicate rich visual pages to science labs, coding and robotics clubs, music studios, French/Mandarin language tracks, swimming, and athletics facilities.\n\n### 2. Automated M-Pesa Fee Payment Integration\nBursars spend hundreds of hours every term manually inspecting paper bank deposit slips and searching M-Pesa confirmation SMS messages. By embedding a direct [Safaricom Daraja 3.0 M-Pesa STK Push](/services/ecommerce-development) into your school website:\n• The parent enters the student\'s unique **Admission Number** and phone number.\n• A secure payment prompt pops up on their phone.\n• Once authorized, the transaction automatically updates the school ledger, emits an official receipt via SMS/email, and updates the student\'s fee balance in real time.\n• This completely eliminates forged bank slips and lost payment records.\n\n### 3. Digital Admission & Registration Workflow\nAllow prospective parents to fill out digital enrollment forms from their phones, upload birth certificates, passport photos, and previous NEMIS/assessment records, and pay non-refundable interview fees online.\n\n### 4. Downloadable Termly Newsletters & Academic Calendar\nA dedicated, search-friendly resources section where parents can download approved fee structures, booklists, term dates, and weekly newsletters as optimized PDFs.`
      },
      {
        heading: '3. The Parent & Student Portal: Ending WhatsApp Communication Chaos',
        body: `Managing class communications across disjointed WhatsApp groups often results in misinformation, lost homework assignments, and privacy complaints from parents.\n\nA dedicated **Parent Portal** built into your school website provides an organized, role-protected dashboard where parents can:\n• **Access Academic Performance:** View continuous assessment tests (CATs), term-end report cards, and CBC rubric evaluations with secure PDF downloads.\n• **Track Fee Statements:** Review full financial histories, outstanding term balances, and download official receipts for employer expense claims or tax records.\n• **Direct Teacher Messaging:** Send private inquiries to class teachers or school administration with an auditable communication trail.\n• **Attendance & Transport Tracking:** Receive automated alerts when learners board the school bus or arrive on campus.\n\nExplore our [Custom CRM & Educational Management Software Services](/services/custom-crm-development) to learn how we engineer secure institutional portals.`
      },
      {
        heading: '4. Kenyan Case Studies & Architectural Best Practices',
        body: `High-performing school websites in Nairobi and across Kenya share several architectural hallmarks:\n\n• **Lightning-Fast Mobile Loading (Sub-Second on Safaricom 4G/5G):** Over 82% of Kenyan parents browse school websites on smartphones. Heavy, unoptimized WordPress themes with bloated plugins cause high bounce rates. We architect school websites using React and Next.js with optimized WebP imagery and African edge caching.\n• **Search Engine Optimization (SEO) for Local Catchment Areas:** When parents search "best CBC primary school in Karen", "top junior secondary school Westlands", or "IGCSE school in Eldoret", your school must appear in Google\'s local top-3 pack. Learn more in our [Local Technical SEO Guide](/insights/local-seo-core-web-vitals-nairobi-kenya).\n• **Kenya Data Protection Act Compliance (ODPC):** Publishing student photos, names, and academic records requires explicit parental consent under the Kenya Data Protection Act 2019. We implement built-in consent toggles, secure SSL encryption (TLS 1.3), and role-based staff access.`
      },
      {
        heading: 'Frequently Asked Questions (FAQ)',
        body: `### Frequently Asked Questions\n\n• **Q: How much does it cost to maintain a school website in Kenya annually?**\nAnnual recurring expenses include domain renewal (KSh 1,000–2,500 for a \`.sc.ke\` or \`.ac.ke\` domain from KeNIC), high-speed SSD web hosting (KSh 6,000–25,000 per year), and an optional maintenance retainer for termly updates and security backups.\n\n• **Q: How does the school register an official .sc.ke or .ac.ke domain?**\nKenya Network Information Centre (KeNIC) mandates that schools submitting registration for \`.sc.ke\` (primary/secondary) or \`.ac.ke\` (colleges/universities) provide an official Ministry of Education registration certificate and KRA PIN.\n\n• **Q: Can the school website handle thousands of parents accessing exam results simultaneously?**\nYes. By building the website with modern static pre-rendering (Next.js) hosted on global Content Delivery Networks (CDNs), your site can handle tens of thousands of simultaneous parents on exam release day without crashing.\n\n• **Q: Can school fee payments be linked directly to Equity Bank, Co-op Bank, or KCB?**\nYes. In addition to Safaricom Daraja M-Pesa, we can integrate direct bank APIs (Equity Bank Jenga API, Co-op Bank Open Banking, or KCB Buni) so fee payments settle directly into the school\'s institutional bank accounts.\n\n• **Q: How long does it take to design and launch a school website?**\nA standard school website launches in 2 to 3 weeks, while a comprehensive campus portal with parent logins and fee integration takes 4 to 6 weeks.`
      },
      {
        heading: 'Transform Your School\'s Digital Presence Today',
        body: `Domain Tech Hub partners with leading primary schools, secondary institutions, and international colleges across Kenya to build award-winning websites, automated fee gateways, and parent portals:\n\n• Calculate your school system scope with our [Online Project Cost Calculator](/tools/calculator)\n• View our full [Web Design & Custom Software Services](/services/web-development)\n• Schedule a School Board Consultation: Call [+254 118 746 676](tel:+254118746676) | WhatsApp [+254 118 746 676](https://wa.me/254118746676) | Email [info@domaintechhub.com](mailto:info@domaintechhub.com).`
      }
    ]
  }
];
