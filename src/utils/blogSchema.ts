/**
 * Blog & Article Structured Data (Schema.org JSON-LD) Generator
 * Constructs dynamic BlogPosting / Article schemas for Google Search,
 * AI search engines, and rich snippets.
 */

import { SITE_URL } from '../config/site';
import { InsightArticle } from '../data/insightsData';

/**
 * Converts a human-readable date string (e.g., "January 8th, 2026") into an ISO 8601 string.
 */
export function formatPublishedDateIso(dateStr: string): string {
  if (!dateStr) return '2026-01-08T08:00:00+03:00';
  try {
    const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/gi, '$1').trim();
    const timestamp = Date.parse(cleaned);
    if (!isNaN(timestamp)) {
      return new Date(timestamp).toISOString();
    }
  } catch {
    // safe fallback
  }
  return '2026-01-08T08:00:00+03:00';
}

/**
 * Converts a reading time string (e.g., "9 min read" or "5 mins") into an ISO 8601 duration (e.g., "PT9M").
 */
export function formatReadingTimeIso(readTimeStr: string): string {
  if (!readTimeStr) return 'PT5M';
  const match = readTimeStr.match(/\d+/);
  const minutes = match ? parseInt(match[0], 10) : 5;
  return `PT${minutes}M`;
}

/**
 * Calculates total word count for an article across excerpt, takeaways, headings, and body sections.
 */
export function calculateArticleWordCount(article: InsightArticle): number {
  const textBlocks = [
    article.title || '',
    article.excerpt || '',
    ...(article.keyTakeaways || []),
    ...(article.contentSections || []).flatMap((section) => [section.heading || '', section.body || '']),
  ];
  const combined = textBlocks.join(' ').trim();
  if (!combined) return 0;
  return combined.split(/\s+/).filter(Boolean).length;
}

/**
 * Dynamically constructs JSON-LD Article & BlogPosting structured data for each blog post,
 * including author, date, reading time, word count, publisher, and AI overview selectors.
 *
 * @param article The article data object
 * @param baseUrl Optional base URL override (defaults to SITE_URL)
 * @returns JSON-LD BlogPosting schema object
 */
export function generateBlogSchema(
  article: InsightArticle,
  baseUrl: string = SITE_URL
): Record<string, any> {
  const canonicalUrl = `${baseUrl}/insights/${article.slug}`;
  const fullCoverImage = article.coverImage.startsWith('http')
    ? article.coverImage
    : `${baseUrl}${article.coverImage}`;
  const authorAvatar = article.author?.avatar?.startsWith('http')
    ? article.author.avatar
    : `${baseUrl}${article.author?.avatar || '/images/team/author-brian.webp'}`;

  const publishedIso = formatPublishedDateIso(article.publishedDate);
  const readingTimeIso = formatReadingTimeIso(article.readTime);
  const wordCount = calculateArticleWordCount(article);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${baseUrl}/insights#blog`,
      name: 'Domain Tech Hub Engineering Insights & Tech Guides',
      url: `${baseUrl}/insights`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: article.title,
    alternativeHeadline: article.title,
    description: article.excerpt,
    url: canonicalUrl,
    image: [
      fullCoverImage,
      {
        '@type': 'ImageObject',
        url: fullCoverImage,
        width: 1200,
        height: 675,
        caption: article.title,
      },
    ],
    datePublished: publishedIso,
    dateModified: publishedIso,
    timeRequired: readingTimeIso,
    wordCount,
    inLanguage: 'en-US',
    articleSection: article.category,
    keywords: (article.tags || []).join(', '),
    isAccessibleForFree: true,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Brian Mwangi',
      jobTitle: article.author?.role || 'Lead Cloud & Fintech Architect',
      image: authorAvatar,
      url: `${baseUrl}/about`,
      worksFor: {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Domain Tech Hub',
        url: baseUrl,
        logo: `${baseUrl}/logo-icon.svg`,
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Domain Tech Hub',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-icon.svg`,
        width: 192,
        height: 192,
      },
      telephone: '+254118746676',
      email: 'info@domaintechhub.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Delta Corner Tower, Westlands',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi County',
        postalCode: '00100',
        addressCountry: 'KE',
      },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '#ai-quick-answer',
        '.ai-quick-answer',
        'h1',
        '.ai-solution-card',
      ],
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Domain Tech Hub',
      url: baseUrl,
    },
    copyrightYear: 2026,
  };
}

/**
 * Extracts FAQ items from an article's FAQ section and generates Schema.org FAQPage structured data.
 */
export function generateArticleFaqSchema(
  article: InsightArticle,
  baseUrl: string = SITE_URL
): Record<string, any> | null {
  const faqSection = article.contentSections?.find((s) =>
    s.heading.toLowerCase().includes('faq') || s.heading.toLowerCase().includes('frequently asked questions')
  );
  if (!faqSection) return null;

  const rawText = faqSection.body;
  const qaMatches = [...rawText.matchAll(/[•\-]?\s*\*\*Q:\s*([^?*]+\??)\*\*\s*\n([^\n•]+(?:\n(?![•\-]|\*\*Q)[^\n•]+)*)/g)];
  if (qaMatches.length === 0) return null;

  const mainEntity = qaMatches.map((m) => {
    const question = m[1].trim();
    const answer = m[2].trim();
    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

/**
 * Extracts HowTo steps from a tutorial article and generates Schema.org HowTo structured data.
 */
export function generateArticleHowToSchema(
  article: InsightArticle,
  baseUrl: string = SITE_URL
): Record<string, any> | null {
  const isTutorial =
    article.slug.includes('how-to') ||
    article.slug.includes('integration-guide') ||
    article.slug.includes('stk-push-nextjs');

  if (!isTutorial) return null;

  const stepSections = (article.contentSections || []).filter(
    (s) =>
      /^(\d+\.|step\s*\d+|step\s*[a-d]:)/i.test(s.heading.trim()) ||
      s.heading.toLowerCase().startsWith('step')
  );

  if (stepSections.length < 2) return null;

  const stepList = stepSections.map((sec, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: sec.heading.replace(/^(\d+\.|step\s*([0-9a-z]+):?)\s*/i, '').trim(),
    text: sec.body.slice(0, 300).trim(),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: article.title,
    description: article.excerpt,
    step: stepList,
  };
}

export default generateBlogSchema;

