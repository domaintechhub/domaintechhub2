import type { InsightArticle } from './insightsData';

const author = {
  name: 'Dennis Kiprop',
  role: 'Director of Search & Analytics',
  avatar: '/images/team/author-dennis.webp',
};

export const SEO_EXPLAINER_ARTICLES: InsightArticle[] = [
  {
    id: 'why-is-my-website-not-showing-on-google-kenya',
    title: 'Why Is My Website Not Showing on Google? 9 Reasons and Fixes for Kenyan Businesses',
    slug: 'why-is-my-website-not-showing-on-google-kenya',
    category: 'Technical SEO',
    publishedDate: 'October 18th, 2026',
    readTime: '8 min read',
    featured: false,
    author,
    excerpt:
      'You launched your website, but searching for your business or services returns nothing. Here are the nine most common reasons a Kenyan website does not appear on Google, how to diagnose each one yourself, and what to fix first.',
    coverImage: '/images/articles/local-seo-core-web-vitals.webp',
    tags: ['Website Not Showing on Google', 'Google Indexing Kenya', 'Search Console', 'SEO Kenya', 'New Website SEO'],
    keyTakeaways: [
      'A new website can take days to weeks to be indexed, and months to rank for competitive searches.',
      'Search Console is the only reliable way to see whether Google has indexed your pages and why not.',
      'Thin, duplicated pages and a lack of links from other sites are the most common reasons new sites stay invisible.',
      'Searching for your exact business name and searching for your service are two different problems with different fixes.',
    ],
    contentSections: [
      {
        heading: 'First, Work Out Which Problem You Have',
        body: `"My website is not on Google" can mean three very different things, and each has a different cure. Type your exact business name into Google. If nothing from your domain appears, the pages are probably not indexed at all. Next, type site:yourdomain.com into the search bar. If it returns results, Google knows your pages but they are not ranking for the searches you care about. Finally, search for the service you sell plus your city, for example "web design Nairobi". If your site is missing there but appears for your name, you are indexed but not yet competitive.\n\nBe honest about which of these describes you. Not being indexed is a technical or content problem you can usually fix within weeks. Being indexed but ranking on page five is an authority problem that takes months of steady work. Mixing them up is why many owners spend money on the wrong fix.`,
      },
      {
        heading: '1. The Site Is Too New',
        body: `Google does not know a new domain exists until it finds a link to it or you tell it. Even after that, a brand-new site with no history is crawled slowly. It is normal for the first pages to appear within a few days to a few weeks, and for competitive rankings to take three to six months. If your site is under a month old, patience and the steps below matter more than any trick.\n\nSpeed it up by verifying your site in Google Search Console, submitting your sitemap, and requesting indexing for your most important pages. These do not guarantee anything, but they remove delay.`,
      },
      {
        heading: '2. Google Found Your Pages but Chose Not to Index Them',
        body: `In Search Console, the Pages report may show "Discovered – currently not indexed" or "Crawled – currently not indexed". Both mean Google knows the page exists but has decided it is not worth storing yet. For new sites this is usually about quality and trust, not a technical error.\n\nThe common causes are very short pages, pages that repeat the same menu and footer with only a few sentences of unique text, near-duplicate pages that differ only by a place name, and a site with no links from elsewhere. The fix is to make each page genuinely useful: answer the question completely, add examples, prices, steps and FAQs, and remove or merge pages that add nothing.`,
      },
      {
        heading: '3. Something Is Telling Google Not to Index You',
        body: `Sometimes the site itself blocks Google. Check these three places:\n• Robots.txt: open yourdomain.com/robots.txt. A line reading Disallow: / under User-agent: * blocks the entire site. This is often left over from the development stage.\n• Noindex tags: view the page source and search for "noindex". Some website builders and SEO plugins add it when the option "Discourage search engines from indexing this site" is ticked, for example in WordPress under Settings, Reading.\n• Canonical tags: if a page's canonical tag points to a different address, Google treats the other address as the real one and may ignore this page.\n\nSearch Console's URL Inspection tool will tell you directly whether a page is blocked and by what.`,
      },
      {
        heading: '4. Your Pages Are Hard to Crawl',
        body: `Google must be able to reach and read your content. Problems include pages that only appear after heavy JavaScript runs and show nothing in the raw HTML, important pages that no other page links to, broken internal links, slow servers that time out, and menus built so that crawlers cannot follow them. Use URL Inspection and choose View crawled page to see what Google actually receives. If the content is missing there, your developer needs to pre-render or server-render the pages.\n\nGood internal linking also helps. Every important page should be reachable within a few clicks from the home page, and linked from related pages using descriptive text.`,
      },
      {
        heading: '5. Your Content Does Not Match What People Search',
        body: `A page can be indexed and still never appear, because nobody searches for the words it uses. "Premier engineering excellence" is not a search. "Website design cost in Kenya" is. Look at how real customers phrase their problem on WhatsApp and in phone calls, and use those words in your headings and opening paragraphs. Give each service its own page targeting one clear intent rather than cramming everything onto the home page.\n\nAlso check the competition. If the first page for your keyword is full of large directories and well-known companies, aim first at more specific searches, such as "M-Pesa integration for online shop Kenya", where you can realistically win.`,
      },
      {
        heading: '6. You Have No Authority Yet',
        body: `Google uses links from other websites as a sign that a site is trusted. A site with zero external links has to prove itself through content alone, which is slow. Earn your first links by claiming your Google Business Profile, listing your business on reputable Kenyan and industry directories, getting profiles on platforms such as LinkedIn and Clutch that link to your site, sharing useful articles where your customers spend time, and asking real clients or partners to mention you. Ten relevant links from real businesses will do more than hundreds of low-quality ones, which can actually hurt.`,
      },
      {
        heading: '7. Your Local Signals Are Missing or Inconsistent',
        body: `For searches with local intent, Google relies heavily on your Google Business Profile and on consistency. Make sure your business name, address and phone number are identical across your website, profile, social pages and directories. Add a map and clear location information to your contact page, choose accurate business categories, post photos, and collect reviews from real customers. Many Kenyan businesses never appear in the map results simply because they never completed this step.`,
      },
      {
        heading: '8. Your Site Is Slow or Poor on Mobile',
        body: `Most Kenyan searches happen on phones. A site that takes many seconds to load on mobile data, or that is awkward to use on a small screen, is ranked lower and abandoned quickly. Run PageSpeed Insights and aim for a Largest Contentful Paint under 2.5 seconds. The usual fixes are compressing images, avoiding heavy page builders and unused plugins, and loading scripts only when needed. Speed will not rescue weak content, but it is a clear advantage when other factors are equal.`,
      },
      {
        heading: '9. A Penalty, Hack or Duplicate Site',
        body: `Less commonly, a site is missing because of a manual action, because it was hacked and filled with spam pages, or because a copy of it exists on another address and Google prefers that one. Check Search Console under Security and Manual Actions, and search Google for unexpected pages with site:yourdomain.com. If you find them, clean the site, update your software and passwords, and request a review.`,
      },
      {
        heading: 'A Simple Four-Week Plan',
        body: `Week one: verify Search Console, submit your sitemap, fix any robots or noindex problems, and request indexing for your top pages. Week two: expand your most important pages with complete, useful content and fix mobile speed. Week three: complete your Google Business Profile and create listings with consistent details. Week four: earn your first links and publish your first helpful article answering a question customers ask. Then keep going: publish steadily, review Search Console monthly, and improve what is almost ranking. If you would like us to audit your site and tell you exactly which of these nine applies, we are happy to help.`,
      },
    ],
  },

  {
    id: 'discovered-currently-not-indexed-search-console-fix',
    title: '"Discovered – Currently Not Indexed" in Google Search Console: What It Means and How to Fix It',
    slug: 'discovered-currently-not-indexed-search-console-fix',
    category: 'Technical SEO',
    publishedDate: 'October 18th, 2026',
    readTime: '7 min read',
    featured: false,
    author,
    excerpt:
      'Search Console says Google has discovered your pages but has not indexed them. This guide explains what the status really means, why it is common on new Kenyan websites, and the practical steps that move pages into the index.',
    coverImage: '/images/articles/aeo-geo-ranking-ai-overviews-kenya.webp',
    tags: ['Discovered Currently Not Indexed', 'Google Search Console', 'Crawl Budget', 'Indexing Problems', 'Technical SEO Kenya'],
    keyTakeaways: [
      'The status means Google knows the URL exists but has not crawled it yet, usually because it does not yet see enough value or trust.',
      'It is very common on new domains and is rarely a server error.',
      'Improving page quality, internal links and external links is more effective than repeatedly pressing Request Indexing.',
      'Fewer, better pages usually index faster than many thin ones.',
    ],
    contentSections: [
      {
        heading: 'What the Status Actually Means',
        body: `In Search Console, open Indexing, then Pages. Under "Why pages aren't indexed" you may see "Discovered – currently not indexed". It means Google has found the URL, usually through your sitemap or a link, but has not yet crawled it. Google put it in a queue and has not got round to it.\n\nThis is different from "Crawled – currently not indexed", where Google did visit the page, read it, and decided not to keep it. The first is about priority, the second is about quality. Both are common on new websites and neither is a penalty.`,
      },
      {
        heading: 'Why Google Delays Crawling Some Pages',
        body: `Google has limited resources and decides how much of your site to crawl based on two ideas: how much your server can handle, and how much your site is worth crawling. A new domain with few links and no history starts with a low priority. If Google also guesses from patterns such as similar URLs and repeated templates that many of your pages are low value, it holds back even more.\n\nThat is why submitting a sitemap of fifty pages does not mean fifty pages are indexed. The sitemap is an invitation, not an instruction. The pages must earn the visit.`,
      },
      {
        heading: 'Check the Obvious Technical Problems First',
        body: `Before concluding it is a quality issue, rule out the technical causes:\n• Server speed and errors: if your server is slow or returns errors, Google crawls less. Check Settings, then Crawl stats, for response times and failures.\n• Blocked by robots.txt: use the robots.txt report to confirm important URLs are allowed.\n• Redirect chains and broken links: long chains waste crawling and may be dropped.\n• Duplicate URLs: the same page reachable with and without www, with trailing slashes, or with tracking parameters splits signals. Use one canonical address.\n• Sitemap hygiene: list only pages that return a 200 status, are canonical and are indexable. Remove redirects and error pages from the sitemap.\n\nIf all of these are clean, the cause is almost certainly priority and quality.`,
      },
      {
        heading: 'Make the Pages Worth Crawling',
        body: `The biggest lever is the content itself. Open each unindexed page and ask: if I removed the menu and footer, how much unique, useful text remains? If the answer is a few sentences, Google has little reason to store it. Expand it with a complete answer to the visitor's question: explain the topic, give examples, include costs or timelines where relevant, add a short FAQ, and show who wrote it and why they are qualified.\n\nAlso avoid near-duplicate pages. Ten service pages that differ only in a city name are treated as one page. Combine them or write each one properly. It is better to have twelve strong pages than fifty weak ones.`,
      },
      {
        heading: 'Strengthen Internal Links',
        body: `Google discovers priorities through your own links. A page linked only from the sitemap looks unimportant. Link each page from the home page or a hub page, and from at least two or three related pages, using descriptive anchor text such as "M-Pesa payment integration" rather than "click here". Add related-article links at the end of posts and breadcrumbs on deeper pages. A page that sits within a clear structure tells Google it matters.`,
      },
      {
        heading: 'Earn External Signals',
        body: `Links from other websites and real visits are strong signals that a site deserves attention. For a new Kenyan business, practical first steps are to complete your Google Business Profile, list the site on trusted directories and profiles, share new articles on LinkedIn and relevant communities, and encourage clients and partners to link to you. You will notice that pages which receive some real-world attention tend to be crawled sooner.`,
      },
      {
        heading: 'Using Request Indexing Sensibly',
        body: `The URL Inspection tool lets you request indexing for a page. It is useful for a new or freshly improved page, but the quota is limited and it does not override quality. Use it after you have improved a page, not before. Do not submit the same URL repeatedly every day, because it does not help. Request your most important ten pages first and give Google a couple of weeks.`,
      },
      {
        heading: 'How Long Does It Take and How to Track It',
        body: `Improvements usually show within two to six weeks, sometimes longer for very new domains. Track progress by checking the Pages report weekly: the count of indexed pages should rise, and the number under "Discovered – currently not indexed" should fall. Inspect a few sample URLs to confirm they are indexed and see the date of the last crawl. If after a couple of months good pages are still stuck, look again at content quality and at how many links point to the site. We help Kenyan businesses diagnose exactly this, and can review your Search Console report and recommend what to fix first.`,
      },
    ],
  },

  {
    id: 'why-business-name-appears-in-competitor-google-results',
    title: 'Why Does My Business Name Appear in a Competitor\'s Google Result? What It Means for Kenyan Brands',
    slug: 'why-business-name-appears-in-competitor-google-results',
    category: 'Technical SEO',
    publishedDate: 'October 18th, 2026',
    readTime: '6 min read',
    featured: false,
    author,
    excerpt:
      'Seeing your company name inside a competitor\'s search snippet is alarming, but it is usually how Google builds relationships between brands, not sabotage. Learn why it happens and how to strengthen your brand searches.',
    coverImage: '/images/articles/aeo-geo-ranking-ai-overviews-kenya.webp',
    tags: ['Brand SEO', 'Google Snippets', 'Entity SEO', 'Branded Search', 'Competitor SEO Kenya'],
    keyTakeaways: [
      'Google often rewrites snippets to match the query, so your brand can appear on a competitor\'s result because you searched for it.',
      'Google understands brands as entities and links businesses that are mentioned together or searched together.',
      'Directories, reviews, comparison articles and user behaviour all create these associations.',
      'You protect your brand by owning your branded search results, not by worrying about competitors.',
    ],
    contentSections: [
      {
        heading: 'What You Are Seeing',
        body: `You search for your own business plus a service, and below a competitor's page title Google shows a snippet that includes your company name. It is natural to suspect the competitor is using your brand on purpose. Sometimes that does happen, but far more often there is a simpler explanation in how Google builds its results.`,
      },
      {
        heading: 'Snippets Are Written for the Query, Not for the Page',
        body: `A snippet is the short text under a result's title. Google usually takes it from the page's meta description, but frequently ignores that and builds a new one from text on the page that best matches the words you searched. It also highlights the words from your query in bold, even where they are not part of the page's own message.\n\nThat means when you search for "YourBrand web design", Google may show a competitor's page together with a snippet that visibly repeats your brand, because that is your query. In many cases the competitor's page does not mention you at all. You are seeing your own search echoed back.`,
      },
      {
        heading: 'Google Understands Brands as Entities',
        body: `Google no longer treats search as simple keyword matching. It identifies entities, such as businesses, people and places, and the relationships between them. If your business and a competitor are both web agencies in Nairobi, Google connects them through shared topics, locations and services. When someone searches for one, it may consider the other relevant, so a competitor can appear for your brand-related searches and vice versa. This is a normal sign that Google recognises your business as part of your industry.`,
      },
      {
        heading: 'Where the Associations Come From',
        body: `Several signals outside both websites can link two brands:\n• Directories and listings: Google Business categories, Yellow Pages and similar lists place competitors side by side.\n• Comparison and "best of" articles: pages such as "Top web design companies in Nairobi" mention several brands together.\n• Reviews and forum discussions: customers often mention more than one provider.\n• Links and mentions: if third-party pages mention both of you, Google infers a relationship.\n• Hidden or older content: alt text, schema, comments or cached versions of a page may contain your name even if the visible page does not.`,
      },
      {
        heading: 'User Behaviour Teaches Google Too',
        body: `Google learns from what people do. If many users search for your brand and then for a competitor, or click on both, Google strengthens the association between the two. This is called co-occurrence. It explains why the pattern appears more over time as a market becomes crowded, and why it is not evidence of copying.`,
      },
      {
        heading: 'When It Is a Real Problem',
        body: `It deserves action if a competitor is deliberately bidding on your brand name in Google Ads, publishing misleading comparison pages that make false claims, or using your trademarked name in a way that confuses customers. In Kenya, you can report misleading ads to Google, and for trademark abuse seek advice from a lawyer or the Kenya Industrial Property Institute. Keep screenshots with dates as evidence.`,
      },
      {
        heading: 'How to Own Your Brand Searches',
        body: `The best defence is to make your own results strong:\n• Use your brand name consistently in page titles, headings and the About page, and keep your business name, address and phone number identical everywhere.\n• Complete and regularly update your Google Business Profile with photos, posts and reviews.\n• Publish your own comparison and "why choose us" pages, written honestly, so you set the story.\n• Earn mentions and links from local media, directories and industry sites.\n• Add Organization structured data with your name, logo and social profiles so Google knows which entity is yours.\n• Monitor with Google Alerts and Search Console's query report to see what people search before they find you.`,
      },
      {
        heading: 'Prepare for AI Search',
        body: `The same principle applies to answer engines and AI assistants. They draw on clear, consistent information about who you are, what you do and where. Make sure your website states this plainly, include an FAQ that answers the questions customers ask, and keep your profiles consistent. The stronger and clearer your brand entity is, the more accurately it will be described, and the less it will be confused with others. If you want help strengthening your brand visibility in Kenya and internationally, our team can audit your branded search results and build a plan.`,
      },
    ],
  },
];
