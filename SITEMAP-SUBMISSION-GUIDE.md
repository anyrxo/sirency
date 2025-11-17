# 🚀 Sitemap Submission Guide - Sirency.com

## Quick Submit (2 Minutes)

### Google Search Console
1. Go to: https://search.google.com/search-console
2. Select your property: `sirency.com`
3. Click **Sitemaps** in left sidebar
4. Enter: `https://sirency.com/sitemap.xml`
5. Click **Submit**

✅ Done! Google will now crawl all 108 blog posts.

---

### Bing Webmaster Tools
1. Go to: https://www.bing.com/webmasters
2. Select your site: `sirency.com`
3. Click **Sitemaps** → **Submit Sitemap**
4. Enter: `https://sirency.com/sitemap.xml`
5. Click **Submit**

---

### IndexNow (Instant Indexing)
Your robots.txt already includes IndexNow support. Bing will auto-index.

For manual submission:
- URL: `https://www.bing.com/indexnow`
- Submit your sitemap URL there

---

## Verify Sitemap is Accessible

Test your sitemap is live:
```
https://sirency.com/sitemap.xml
```

Should show XML with all 108 blog URLs.

---

## Auto-Resubmission

Each time you add a new blog post:
1. Run: `node generate-sitemap.cjs` (regenerates sitemap)
2. Re-submit to Google/Bing using URLs above
3. Or use the IndexNow API for instant indexing

---

## Monitoring

Check indexing status:
- Google: Search Console → Coverage report
- Bing: Webmaster Tools → URL Inspection

Expect full indexing within 1-7 days.
