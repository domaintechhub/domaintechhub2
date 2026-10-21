import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPublishedDateIso,
  formatReadingTimeIso,
  calculateArticleWordCount,
  generateBlogSchema,
} from '../blogSchema';
import type { InsightArticle } from '../../data/insightsData';

describe('blogSchema utility - formatPublishedDateIso', () => {
  it('formats standard English date with ordinal numbers to ISO 8601', () => {
    const iso = formatPublishedDateIso('January 8th, 2026');
    assert.match(iso, /^2026-01-08T\d{2}:\d{2}:\d{2}/);
  });

  it('handles ordinal suffix variants like 1st, 2nd, 3rd, 21st', () => {
    const iso1 = formatPublishedDateIso('March 1st, 2026');
    assert.match(iso1, /^2026-03-01/);

    const iso2 = formatPublishedDateIso('April 2nd, 2026');
    assert.match(iso2, /^2026-04-02/);

    const iso3 = formatPublishedDateIso('May 3rd, 2026');
    assert.match(iso3, /^2026-05-03/);
  });

  it('falls back to default ISO timestamp on empty or invalid string', () => {
    const fallback = formatPublishedDateIso('');
    assert.equal(fallback, '2026-01-08T08:00:00+03:00');

    const invalid = formatPublishedDateIso('not-a-valid-date-string');
    assert.equal(invalid, '2026-01-08T08:00:00+03:00');
  });
});

describe('blogSchema utility - formatReadingTimeIso', () => {
  it('extracts number of minutes into ISO 8601 duration format', () => {
    assert.equal(formatReadingTimeIso('9 min read'), 'PT9M');
    assert.equal(formatReadingTimeIso('12 mins'), 'PT12M');
    assert.equal(formatReadingTimeIso('4 minute read'), 'PT4M');
  });

  it('falls back to default PT5M when string is empty or has no digits', () => {
    assert.equal(formatReadingTimeIso(''), 'PT5M');
    assert.equal(formatReadingTimeIso('quick read'), 'PT5M');
  });
});

describe('blogSchema utility - calculateArticleWordCount', () => {
  const mockArticle: InsightArticle = {
    id: 'test-article',
    slug: 'test-article',
    title: 'Custom Web Engineering in Kenya',
    excerpt: 'Practical guide to high performance web architectures.',
    category: 'Modern Engineering',
    tags: ['Web Development', 'Architecture'],
    readTime: '6 min read',
    publishedDate: 'February 10th, 2026',
    author: {
      name: 'Brian K.',
      role: 'Lead Architect',
      avatar: '/images/team/brian.webp',
    },
    coverImage: '/images/articles/test.webp',
    keyTakeaways: [
      'High conversion starts with fast page loads',
      'Integrate Safaricom Daraja STK Push seamlessly',
    ],
    contentSections: [
      {
        heading: 'Architecture First',
        body: 'Building websites that convert requires zero bloat and clean semantics.',
      },
      {
        heading: 'Database Scalability',
        body: 'Always index primary relational queries for sub-second retrieval.',
      },
    ],
  };

  it('calculates total word count across title, excerpt, takeaways, headings, and body', () => {
    const count = calculateArticleWordCount(mockArticle);
    assert.ok(count > 30, `Expected word count > 30, got ${count}`);
  });

  it('returns 0 for empty article without crash', () => {
    const emptyArticle = {
      ...mockArticle,
      title: '',
      excerpt: '',
      keyTakeaways: [],
      contentSections: [],
    };
    assert.equal(calculateArticleWordCount(emptyArticle), 0);
  });
});

describe('blogSchema utility - generateBlogSchema', () => {
  const sampleArticle: InsightArticle = {
    id: 'sample-fintech-guide',
    slug: 'sample-fintech-guide',
    title: 'M-Pesa STK Push API Guide for Kenyan Businesses',
    excerpt: 'A comprehensive engineering guide on integrating Safaricom Daraja 3.0 API.',
    category: 'Fintech & Payments',
    tags: ['M-Pesa', 'Fintech'],
    readTime: '8 min read',
    publishedDate: 'January 15th, 2026',
    author: {
      name: 'Allan M.',
      role: 'Fintech Lead',
      avatar: '/images/team/allan.webp',
    },
    coverImage: '/images/articles/fintech-guide.webp',
    keyTakeaways: ['Use Daraja 3.0 OAuth tokens', 'Handle callbacks asynchronously'],
    contentSections: [
      {
        heading: 'Introduction',
        body: 'Safaricom Daraja enables direct payments from Kenyan customer SIM cards.',
      },
    ],
  };

  it('generates compliant schema.org BlogPosting structure', () => {
    const schema = generateBlogSchema(sampleArticle, 'https://www.domaintechhubs.com');

    assert.equal(schema['@context'], 'https://schema.org');
    assert.equal(schema['@type'], 'BlogPosting');
    assert.equal(
      schema.url,
      'https://www.domaintechhubs.com/insights/sample-fintech-guide'
    );
    assert.equal(schema.headline, sampleArticle.title);
    assert.equal(schema.description, sampleArticle.excerpt);
    assert.equal(schema.timeRequired, 'PT8M');
    assert.ok(schema.wordCount > 0);
    assert.equal(schema.author.name, 'Allan M.');
    assert.equal(schema.publisher.name, 'Domain Tech Hub');
    assert.ok(Array.isArray(schema.image));
  });
});
