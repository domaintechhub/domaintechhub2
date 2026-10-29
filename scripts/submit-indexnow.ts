import fs from 'node:fs';
import path from 'node:path';

async function submitIndexNow(): Promise<void> {
  if (process.env.VERCEL_ENV !== 'production') {
    console.log('IndexNow: skipped (not a production build)');
    process.exit(0);
  }

  try {
    const cwd = process.cwd();
    const distPath = path.join(cwd, 'dist', 'sitemap.txt');
    const publicPath = path.join(cwd, 'public', 'sitemap.txt');

    let sitemapFile = distPath;
    if (!fs.existsSync(distPath)) {
      sitemapFile = publicPath;
    }

    if (!fs.existsSync(sitemapFile)) {
      console.warn('[IndexNow Warning] Neither dist/sitemap.txt nor public/sitemap.txt was found.');
      process.exit(0);
    }

    const content = fs.readFileSync(sitemapFile, 'utf-8');
    const rawLines = content.split(/\r?\n/);

    const urlSet = new Set<string>();
    for (const line of rawLines) {
      const trimmed = line.trim();
      if (trimmed && trimmed.startsWith('https://www.domaintechhubs.com')) {
        urlSet.add(trimmed);
      }
    }

    const urlList = Array.from(urlSet);

    if (urlList.length === 0) {
      console.warn('[IndexNow Warning] No valid URLs found to submit.');
      process.exit(0);
    }

    const payload = {
      host: 'www.domaintechhubs.com',
      key: '74b50004ecd64c6184d7ded79656941e',
      keyLocation: 'https://www.domaintechhubs.com/74b50004ecd64c6184d7ded79656941e.txt',
      urlList,
    };

    console.log(`IndexNow: Submitting ${urlList.length} URLs to api.indexnow.org...`);

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    const status = response.status;
    if (status === 200 || status === 202) {
      console.log(`IndexNow: Successfully submitted ${urlList.length} URLs (HTTP ${status}).`);
    } else {
      const responseText = await response.text().catch(() => '');
      console.warn(`[IndexNow Warning] Submission returned HTTP ${status}: ${responseText}`);
    }
  } catch (error) {
    console.warn(
      '[IndexNow Warning] Failed to submit to IndexNow:',
      error instanceof Error ? error.message : error
    );
  }

  process.exit(0);
}

submitIndexNow().catch((err) => {
  console.warn('[IndexNow Warning] Uncaught error:', err);
  process.exit(0);
});
