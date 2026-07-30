# SEO — Next Steps (Off-Page & GSC)

**Written:** 2026-07-30
**Why this file exists:** All on-page/technical SEO from `SEO_PROGRESS.md` and `seo-audit-focusworkspace.md` is essentially done (canonical, OG, JSON-LD schema incl. FAQPage on 30/32 landing pages, sitemap incl. video, hreflang, 100% alt text, security headers). What's left to move the needle is **off-page and GSC-side work that needs your login**, not more code. This is the checklist for that.

## Real GSC snapshot (as of 2026-07-30, reported by user)

- Sitemap `sitemap.xml` submitted 2026-07-08, last read 2026-07-26, status Success, 87 pages discovered.
- **44 pages indexed / 40 not indexed** — of the 40: 11 intentionally noindexed (fine, doorway pages), 24 "Discovered – currently not indexed", 5 "Crawled – currently not indexed".
- Real Performance data (last 30 days): 22 clicks, 619 impressions, 3.6% CTR, **average position 26**. Top queries: "focus workspace" (27 impr.), "focus room" (17), "pomodoro widget notion" (12), "pomodoro technique" (11).
- "Discovered videos" = 0 in the video sitemap column — expected, since the `videos[]` entries on `/scenes` were only added and deployed today (commit `d822011`, 2026-07-30). GSC hasn't re-crawled since.

**Reading this data:** position 26 average + low impressions is completely normal for a domain this young — this is the "Google sandbox" period, and it's mostly solved by time + authority (backlinks), not more on-page work. The bigger structural flag is **24 pages stuck at "Discovered – not indexed"** on a site that already has ~90 URLs across landing pages, VI pages, and blog posts covering a fairly tight set of themes (pomodoro, lofi, notion widgets, ambient sound, study rooms). That pattern — lots of pages, many thematically close together, weak indexing rate — is consistent with Google deprioritizing pages it perceives as low-differentiation relative to how much crawl budget/trust the domain has earned so far. **Recommendation: pause creating more new landing pages for now** and let the existing ~90 consolidate; the 3 new blog posts added today were deliberately picked to *not* duplicate the existing pomodoro/notion/lofi cluster (ADHD, gamification, and an honest competitor roundup instead).

## This week — GSC actions (need your login, ~20 min)

1. **Resubmit the sitemap** — Search Console → Sitemaps → click `sitemap.xml` → resubmit (or just wait; Google typically re-reads within a few days). This picks up: the new `/scenes` video entries, `/about`, `/blog/category/*`, and the 3 new blog posts pushed today.
2. **Don't mass-request indexing for all 24 "Discovered – not indexed" pages** — Search Console rate-limits URL Inspection requests and mass-requesting reads as spammy to Google. Instead, open the Page Indexing report, sort by that status, and manually request indexing (URL Inspection → Request Indexing) for the **5–8 highest commercial-intent URLs only** — e.g. whichever of `/pomodoro-timer`, `/lofi-music`, `/ambient-sounds`, `/rain-sounds`, `/notion-widget` are in that bucket.
3. **Look specifically at the 5 "Crawled – currently not indexed" pages.** This status (vs. "Discovered") means Google *fetched* the page and chose not to index it — usually a thin-content or near-duplicate signal, not a crawl-budget issue. Whichever pages these are, they're the best candidates for either a content pass (expand, make more distinct) or a `noindex`+canonical if they're genuinely redundant with a stronger page.
4. **Set a monthly reminder** to re-check Performance (queries/impressions/position) and Page Indexing counts — the useful signal here is the *trend* over 2-3 months, not any single snapshot.

## Backlinks — ranked by effort vs. payoff

1. **Product Hunt launch** (highest payoff for the effort, one-time). Prep before launch day: a punchy one-line tagline, 3-5 gallery screenshots/GIFs of the workspace + scenes, and a founder first-comment ready to post immediately at launch. Launch early in the week (Tue-Thu tends to get more traffic than weekends).
2. **Directory submissions** (low effort, do these first — mostly just filling out a form): AlternativeTo, SaaSHub, Futurepedia, Slant. Each takes ~10 minutes.
3. **Notion community — the single most-underleveraged angle per the earlier competitor analysis.** LofiSpace's actual differentiator (a real, working `/notion-widget` embed) is exactly what the Notion template/community crowd shares and links to. Post the `/notion-widget` page (not the homepage) in: r/Notion, Notion's own community forum, and any Notion template marketplace/gallery that accepts free submissions.
4. **Reddit** — r/GetStudying, r/ADHD (the new ADHD blog post + `/adhd-focus-room` page are a natural, non-spammy fit here), r/webdev. Read each subreddit's self-promo rules first and lead with value (e.g. share the ADHD post as a resource, not "check out my app") — most of these subs remove pure self-promotion.
5. **Discord community** (bigger commitment, longer-term). Competitors like Lofi Girl and Flocus point to Discord as a real backlink/retention driver, but this needs ongoing moderation, not just a one-time setup — only start this if you can commit to checking in regularly.

## Content cadence going forward

- 2-4 new blog posts/month is plenty at this stage — prioritize genuinely new angles (comparison/roundup posts, underserved audiences like ADHD, unique differentiators like the gamification/XP system) over more variations on pomodoro/notion/lofi, which are already well covered by the existing ~27 posts.
- Hold off on new SEO landing pages until the "Discovered – not indexed" count comes down — more pages right now would add to the dilution problem rather than fix it.
