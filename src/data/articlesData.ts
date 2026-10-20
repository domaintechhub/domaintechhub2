/**
 * Articles & Technical Insights Data Registry
 * Central repository of technical blog posts, architectural deep-dives,
 * and thought leadership articles published by Domain Tech Hub.
 */

import { SITE_URL } from '../config/site';
import { INSIGHT_ARTICLES, type ArticleAuthor } from './insightsData';

export type { ArticleAuthor };

export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  category: 'Fintech & Payments' | 'Modern Engineering' | 'Technical SEO' | 'AI & Automation' | 'Cloud & Security';
  publishedDate: string;
  readTime: string;
  author: ArticleAuthor;
  excerpt: string;
  coverImage: string;
  featured?: boolean;
  tags: string[];
  canonicalUrl: string;
  blogUrl: string;
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const BASE_URL = SITE_URL;

export const ARTICLES_DATA: ArticleData[] = INSIGHT_ARTICLES.map((article) => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  category: article.category,
  publishedDate: article.publishedDate,
  readTime: article.readTime,
  author: article.author,
  excerpt: article.excerpt,
  coverImage: article.coverImage,
  featured: article.featured,
  tags: article.tags,
  canonicalUrl: `${BASE_URL}/insights/${article.slug}`,
  blogUrl: `${BASE_URL}/blog/${article.slug}`,
  priority: article.featured ? '0.90' : '0.80',
  changefreq: 'weekly',
}));

export default ARTICLES_DATA;
