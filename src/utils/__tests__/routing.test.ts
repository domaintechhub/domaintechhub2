import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseAppRoute,
  getPathForRoute,
  normalizeServiceSlug,
  normalizeArticleSlug,
} from '../routing';

describe('routing utility - parseAppRoute', () => {
  it('parses empty and root paths to home', () => {
    assert.deepEqual(parseAppRoute(''), { page: 'home' });
    assert.deepEqual(parseAppRoute('/'), { page: 'home' });
    assert.deepEqual(parseAppRoute('/home'), { page: 'home' });
    assert.deepEqual(parseAppRoute('/hero'), { page: 'home' });
  });

  it('parses about page and aliases', () => {
    assert.deepEqual(parseAppRoute('/about'), { page: 'about' });
    assert.deepEqual(parseAppRoute('/about-us'), { page: 'about' });
  });

  it('parses portfolio and case-study routes', () => {
    assert.deepEqual(parseAppRoute('/portfolio'), { page: 'portfolio' });
    assert.deepEqual(parseAppRoute('/case-studies'), { page: 'portfolio' });
  });

  it('parses services routes and canonical service slugs', () => {
    assert.deepEqual(parseAppRoute('/services'), { page: 'services' });
    assert.deepEqual(parseAppRoute('/services/web-development'), {
      page: 'services',
      subTab: 'web-development',
    });
    assert.deepEqual(parseAppRoute('/services/ecommerce-development'), {
      page: 'services',
      subTab: 'ecommerce-development',
    });
  });

  it('normalizes service slug aliases (e.g. ecommerce, seo, crm, ppc, hosting)', () => {
    assert.deepEqual(parseAppRoute('/services/ecommerce'), {
      page: 'services',
      subTab: 'ecommerce-development',
    });
    assert.deepEqual(parseAppRoute('/services/ecommerce-mpesa'), {
      page: 'services',
      subTab: 'ecommerce-development',
    });
    assert.deepEqual(parseAppRoute('/services/seo'), {
      page: 'services',
      subTab: 'seo-services',
    });
    assert.deepEqual(parseAppRoute('/services/crm'), {
      page: 'services',
      subTab: 'custom-crm-development',
    });
    assert.deepEqual(parseAppRoute('/services/ppc'), {
      page: 'services',
      subTab: 'ppc-management',
    });
    assert.deepEqual(parseAppRoute('/services/hosting'), {
      page: 'services',
      subTab: 'website-maintenance',
    });
  });

  it('returns not-found for unknown service subTab', () => {
    assert.deepEqual(parseAppRoute('/services/non-existent-service-12345'), {
      page: 'not-found',
    });
  });

  it('parses tools route and tool tabs', () => {
    assert.deepEqual(parseAppRoute('/tools'), { page: 'tools', subTab: 'calculator' });
    assert.deepEqual(parseAppRoute('/tools/calculator'), { page: 'tools', subTab: 'calculator' });
    assert.deepEqual(parseAppRoute('/tools/invoice'), { page: 'tools', subTab: 'invoice' });
    assert.deepEqual(parseAppRoute('/tools/design-audit'), { page: 'tools', subTab: 'design-audit' });
    assert.deepEqual(parseAppRoute('/tools/audit'), { page: 'tools', subTab: 'audit' });
    assert.deepEqual(parseAppRoute('/tools/domains'), { page: 'tools', subTab: 'domains' });
  });

  it('normalizes standalone tool shortcuts', () => {
    assert.deepEqual(parseAppRoute('/calculator'), { page: 'tools', subTab: 'calculator' });
    assert.deepEqual(parseAppRoute('/invoice'), { page: 'tools', subTab: 'invoice' });
    assert.deepEqual(parseAppRoute('/invoice-generator'), { page: 'tools', subTab: 'invoice' });
    assert.deepEqual(parseAppRoute('/audit'), { page: 'tools', subTab: 'audit' });
    assert.deepEqual(parseAppRoute('/domains'), { page: 'tools', subTab: 'domains' });
    assert.deepEqual(parseAppRoute('/designmeter'), { page: 'tools', subTab: 'design-audit' });
    assert.deepEqual(parseAppRoute('/ux-audit'), { page: 'tools', subTab: 'design-audit' });
  });

  it('parses insights and blog shortcuts', () => {
    assert.deepEqual(parseAppRoute('/insights'), { page: 'insights' });
    assert.deepEqual(parseAppRoute('/blog'), { page: 'more', subTab: 'blog' });
    assert.deepEqual(parseAppRoute('/articles'), { page: 'more', subTab: 'blog' });
    assert.deepEqual(parseAppRoute('/posts'), { page: 'more', subTab: 'blog' });
  });

  it('parses standalone shortcut routes', () => {
    assert.deepEqual(parseAppRoute('/roadmap'), { page: 'more', subTab: 'roadmap' });
    assert.deepEqual(parseAppRoute('/team'), { page: 'more', subTab: 'team' });
    assert.deepEqual(parseAppRoute('/tech-stack'), { page: 'more', subTab: 'tech-stack' });
    assert.deepEqual(parseAppRoute('/portal'), { page: 'portal' });
    assert.deepEqual(parseAppRoute('/faq'), { page: 'faq' });
    assert.deepEqual(parseAppRoute('/contact'), { page: 'contact' });
    assert.deepEqual(parseAppRoute('/booking'), { page: 'contact' });
  });

  it('strips query parameters and hash fragments before parsing', () => {
    assert.deepEqual(parseAppRoute('/services/web-development?src=google&campaign=nairobi#overview'), {
      page: 'services',
      subTab: 'web-development',
    });
    assert.deepEqual(parseAppRoute('/tools/calculator?tier=enterprise#estimate'), {
      page: 'tools',
      subTab: 'calculator',
    });
  });

  it('rejects routes with more than 2 path segments as not-found', () => {
    assert.deepEqual(parseAppRoute('/services/web-development/extra-segment'), {
      page: 'not-found',
    });
    assert.deepEqual(parseAppRoute('/tools/calculator/step/1'), {
      page: 'not-found',
    });
  });

  it('handles encoded URL segments safely', () => {
    assert.deepEqual(parseAppRoute('/services/ecommerce%2Ddevelopment'), {
      page: 'services',
      subTab: 'ecommerce-development',
    });
  });
});

describe('routing utility - getPathForRoute', () => {
  it('generates canonical path for root and core pages', () => {
    assert.equal(getPathForRoute('home'), '/');
    assert.equal(getPathForRoute('portfolio'), '/portfolio');
    assert.equal(getPathForRoute('about'), '/about');
    assert.equal(getPathForRoute('portal'), '/portal');
    assert.equal(getPathForRoute('faq'), '/faq');
    assert.equal(getPathForRoute('contact'), '/contact');
  });

  it('generates services paths with and without subTabs', () => {
    assert.equal(getPathForRoute('services'), '/services');
    assert.equal(getPathForRoute('services', 'web-development'), '/services/web-development');
    // Normalizes alias
    assert.equal(getPathForRoute('services', 'ecommerce'), '/services/ecommerce-development');
  });

  it('generates tools paths defaulting to calculator', () => {
    assert.equal(getPathForRoute('tools'), '/tools/calculator');
    assert.equal(getPathForRoute('tools', 'audit'), '/tools/audit');
    assert.equal(getPathForRoute('tools', 'invoice'), '/tools/invoice');
    assert.equal(getPathForRoute('tools', 'domains'), '/tools/domains');
    assert.equal(getPathForRoute('tools', 'design-audit'), '/tools/design-audit');
    assert.equal(getPathForRoute('tools', 'invalid-tab'), '/tools/calculator');
  });

  it('generates more page tabs', () => {
    assert.equal(getPathForRoute('more', 'blog'), '/blog');
    assert.equal(getPathForRoute('more', 'team'), '/team');
    assert.equal(getPathForRoute('more', 'tech-stack'), '/tech-stack');
    assert.equal(getPathForRoute('more', 'roadmap'), '/roadmap');
    assert.equal(getPathForRoute('more'), '/roadmap');
  });
});

describe('routing utility - normalizeServiceSlug', () => {
  it('returns undefined for empty input', () => {
    assert.equal(normalizeServiceSlug(undefined), undefined);
    assert.equal(normalizeServiceSlug(''), undefined);
  });

  it('trims and lowercases input', () => {
    assert.equal(normalizeServiceSlug('  WEB-DEVELOPMENT  '), 'web-development');
  });

  it('maps known aliases correctly', () => {
    assert.equal(normalizeServiceSlug('seo'), 'seo-services');
    assert.equal(normalizeServiceSlug('crm'), 'custom-crm-development');
    assert.equal(normalizeServiceSlug('branding'), 'graphic-design-branding');
    assert.equal(normalizeServiceSlug('google-ads'), 'ppc-management');
  });
});

describe('routing utility - normalizeArticleSlug', () => {
  it('returns undefined for empty input', () => {
    assert.equal(normalizeArticleSlug(undefined), undefined);
    assert.equal(normalizeArticleSlug(''), undefined);
    assert.equal(normalizeArticleSlug('non-existent-article-xyz'), undefined);
  });
});
