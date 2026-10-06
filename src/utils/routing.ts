export interface AppRoute {
  page: string;
  subTab?: string;
}

const TOOL_TABS = ['calculator', 'audit', 'domains'];
const MORE_TABS = ['roadmap', 'team', 'tech-stack', 'blog'];
const BASE_URL = import.meta.env.BASE_URL;

function removeBaseUrl(pathname: string): string {
  if (BASE_URL !== '/' && BASE_URL !== './' && pathname.startsWith(BASE_URL)) {
    return `/${pathname.slice(BASE_URL.length)}`;
  }
  return pathname;
}

function addBaseUrl(pathname: string): string {
  if (BASE_URL === '/' || BASE_URL === './') return pathname;
  return `${BASE_URL.replace(/\/$/, '')}${pathname}`;
}

function normalizeServiceSlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  const aliases: Record<string, string> = {
    'ecommerce-mpesa': 'ecommerce-development',
    ecommerce: 'ecommerce-development',
    'seo-optimization': 'seo-services',
    seo: 'seo-services',
    'custom-software': 'custom-crm-development',
    crm: 'custom-crm-development',
    'branding-design': 'graphic-design-branding',
    branding: 'graphic-design-branding',
  };
  return aliases[slug] || slug;
}

export function parseAppRoute(path: string): AppRoute {
  const segments = path.split('/').filter(Boolean).map((segment) => {
    try {
      return decodeURIComponent(segment).toLowerCase();
    } catch {
      return segment.toLowerCase();
    }
  });
  const [first, second] = segments;

  if (!first || first === 'home' || first === 'hero') return { page: 'home' };
  if (first === 'about' || first === 'about-us') return { page: 'about' };
  if (first === 'services' || first === 'service') {
    return { page: 'services', subTab: normalizeServiceSlug(second) };
  }
  if (first === 'portfolio' || first === 'case-studies' || first.startsWith('case-stud')) {
    return { page: 'portfolio' };
  }
  if (first === 'tools') {
    const tab = TOOL_TABS.includes(second) ? second : 'calculator';
    return { page: 'tools', subTab: tab };
  }
  if (first === 'calculator' || first === 'audit' || first === 'domains') {
    return { page: 'tools', subTab: first };
  }
  if (first === 'more') {
    const tab = MORE_TABS.includes(second) ? second : 'roadmap';
    return { page: 'more', subTab: tab };
  }
  if (first === 'blog' || first === 'articles' || first === 'posts') {
    return { page: 'more', subTab: 'blog' };
  }
  if (first === 'roadmap' || first === 'process' || first === 'sprint-roadmap') {
    return { page: 'more', subTab: 'roadmap' };
  }
  if (first === 'team' || first === 'our-team' || first === 'engineers') {
    return { page: 'more', subTab: 'team' };
  }
  if (first === 'tech-stack') return { page: 'more', subTab: 'tech-stack' };
  if (first === 'insights' || first === 'insight') return { page: 'insights' };
  if (first === 'portal' || first === 'client-portal') return { page: 'portal' };
  if (first === 'faq') return { page: 'faq' };
  if (first === 'contact' || first === 'booking') return { page: 'contact' };

  return { page: 'home' };
}

export function getPathForRoute(page: string, subTab?: string): string {
  let path: string;
  switch (page) {
    case 'services':
      path = subTab ? `/services/${encodeURIComponent(normalizeServiceSlug(subTab) || subTab)}` : '/services';
      break;
    case 'tools':
      path = `/tools/${TOOL_TABS.includes(subTab || '') ? subTab : 'calculator'}`;
      break;
    case 'more':
      switch (subTab) {
        case 'blog': path = '/blog'; break;
        case 'team': path = '/team'; break;
        case 'tech-stack': path = '/tech-stack'; break;
        default: path = '/roadmap';
      }
      break;
    case 'insights': path = '/insights'; break;
    case 'portfolio': path = '/portfolio'; break;
    case 'about': path = '/about'; break;
    case 'portal': path = '/portal'; break;
    case 'faq': path = '/faq'; break;
    case 'contact': path = '/contact'; break;
    default: path = '/';
  }
  return addBaseUrl(path);
}

export function getCurrentAppRoute(): AppRoute {
  const legacyRoute = window.location.hash.startsWith('#/')
    ? window.location.hash.slice(2).split('?')[0]
    : '';
  const pathname = removeBaseUrl(window.location.pathname);
  const route = legacyRoute
    ? parseAppRoute(`/${legacyRoute}`)
    : parseAppRoute(pathname);

  if (!legacyRoute && pathname === '/' && new URLSearchParams(window.location.search).has('p')) {
    const fallbackPath = new URLSearchParams(window.location.search).get('p');
    return parseAppRoute(fallbackPath || '/');
  }

  return route;
}

export function getCanonicalLocation(): string {
  const route = getCurrentAppRoute();
  const params = new URLSearchParams(window.location.search);
  params.delete('p');

  const fallbackSearch = params.get('q');
  params.delete('q');
  if (fallbackSearch) {
    new URLSearchParams(fallbackSearch.replace(/~and~/g, '&')).forEach((value, key) => {
      if (!params.has(key)) params.set(key, value);
    });
  }

  if (window.location.hash.startsWith('#/')) {
    const legacyQuery = window.location.hash.split('?').slice(1).join('?');
    new URLSearchParams(legacyQuery).forEach((value, key) => {
      if (!params.has(key)) params.set(key, value);
    });
  }

  const query = params.toString();
  const path = getPathForRoute(route.page, route.subTab);
  return `${path}${query ? `?${query}` : ''}`;
}
