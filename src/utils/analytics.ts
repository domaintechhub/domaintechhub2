type GtagFn = (command: 'event', name: string, params?: Record<string, unknown>) => void;

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === 'function') gtag('event', name, params);
}

const CONTACT_LINKS: Array<{ prefix: string; method: string }> = [
  { prefix: 'https://wa.me/', method: 'whatsapp' },
  { prefix: 'tel:', method: 'phone' },
  { prefix: 'mailto:', method: 'email' },
];

// Delegated listener so every WhatsApp, phone and email link is tracked as a lead event.
export function initContactTracking(): void {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const match = CONTACT_LINKS.find((l) => href.startsWith(l.prefix));
    if (!match) return;
    trackEvent('generate_lead', {
      method: match.method,
      page_path: window.location.pathname,
      link_text: (link.textContent || '').trim().slice(0, 60),
    });
  });
}
