import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL } from '../src/config/site';
import { INSIGHT_ARTICLES } from '../src/data/insightsData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssFeedXml(): string {
  const buildDate = new Date().toUTCString();

  const items = INSIGHT_ARTICLES.map((article) => {
    const articleUrl = `${SITE_URL}/insights/${article.slug}`;
    const pubDate = new Date().toUTCString();

    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>
      <category>${escapeXml(article.category)}</category>
      <author>${escapeXml(article.author.name)}</author>
      <source url="${SITE_URL}/rss.xml">Domain Tech Hub Engineering Insights</source>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Domain Tech Hub · Nairobi Web Engineering &amp; Fintech Insights</title>
    <link>${SITE_URL}</link>
    <description>Architectural teardowns, Safaricom Daraja M-Pesa integration playbooks, eTIMS compliance, and conversion-optimized web systems in Nairobi, Kenya.</description>
    <language>en-ke</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo-icon.svg</url>
      <title>Domain Tech Hub</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>
`;
}

export function generateAtomFeedXml(): string {
  const updatedDate = new Date().toISOString();

  const entries = INSIGHT_ARTICLES.map((article) => {
    const articleUrl = `${SITE_URL}/insights/${article.slug}`;

    return `  <entry>
    <title>${escapeXml(article.title)}</title>
    <link href="${articleUrl}" />
    <id>${articleUrl}</id>
    <updated>${updatedDate}</updated>
    <summary>${escapeXml(article.excerpt)}</summary>
    <author>
      <name>${escapeXml(article.author.name)}</name>
    </author>
    <category term="${escapeXml(article.category)}" />
  </entry>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Domain Tech Hub Engineering &amp; Fintech Feed</title>
  <link href="${SITE_URL}/feed.xml" rel="self" />
  <link href="${SITE_URL}" />
  <updated>${updatedDate}</updated>
  <id>${SITE_URL}/</id>
  <author>
    <name>Domain Tech Hub</name>
    <email>info@domaintechhubs.com</email>
  </author>
${entries}
</feed>
`;
}

// Generate feeds
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'rss.xml'), generateRssFeedXml(), 'utf-8');
fs.writeFileSync(path.join(publicDir, 'feed.xml'), generateAtomFeedXml(), 'utf-8');
console.log('Successfully generated rss.xml and feed.xml in public directory.');
