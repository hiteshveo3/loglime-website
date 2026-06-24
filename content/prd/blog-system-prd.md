# LOGLIME — COMPLETE BLOG SYSTEM PRD
## Content Marketing + Design + Features + Comment System + Spam Blocking
## Version 1.0 | Codex Implementation Document

> **Codex:** Read entirely before writing a line. Blog is Phase 2 but must be architecturally wired from Day 1. Routes exist, data model is part of the main schema, CMS is built in Next.js App Router with Supabase. No external CMS (no Sanity, no Contentful — overkill for this stage).

---

# PART 1 — BLOG CONTENT MARKETING STRATEGY

## 1.1 Why This Blog Exists

Loglime's blog has one job: **bring restaurant owners who don't know Loglime to pages that make them want Loglime.**

Not a company news feed. Not a founder diary. A content engine where every article:
- Ranks for a keyword restaurant owners are already searching
- Answers a question an AI assistant might be asked
- Ends with a CTA that converts readers into demo requests

Target reader: **Independent restaurant owner or manager in the USA**, aged 28–55, runs 1–3 locations, currently losing margin to delivery platforms or frustrated with their current tech.

## 1.2 Content Pillars (6 Categories)

```
1. ONLINE ORDERING
   Slug: /blog/online-ordering
   Focus: Commission-free ordering, delivery platforms comparison,
   direct ordering setup, increasing average order value
   Example titles:
   - "How to Stop Paying $3,000/Month in Delivery App Commissions"
   - "Direct Ordering vs DoorDash: What Restaurant Owners Don't Tell You"
   - "7 Ways to Get Your Restaurant Customers to Order Directly From You"

2. RESTAURANT TECHNOLOGY
   Slug: /blog/restaurant-technology
   Focus: POS systems, digital menus, kitchen display, QR codes,
   restaurant apps, tech stack decisions
   Example titles:
   - "Digital Menu vs Printed Menu: The True Cost Comparison"
   - "QR Code Menus for Restaurants: Complete Guide for 2025"
   - "What Is a Branded Restaurant App (And Does Your Restaurant Need One?)"

3. MARKETING & LOYALTY
   Slug: /blog/restaurant-marketing
   Focus: Customer retention, loyalty programs, push notifications,
   email marketing for restaurants, repeat customers
   Example titles:
   - "Restaurant Loyalty Programs That Actually Work in 2025"
   - "How Push Notifications Increased This Cafe's Repeat Visits by 41%"
   - "5 Email Ideas to Send Your Restaurant Customers This Month"

4. RESTAURANT OPERATIONS
   Slug: /blog/restaurant-operations
   Focus: Table booking, no-show management, kitchen efficiency,
   menu engineering, staff management
   Example titles:
   - "How to Reduce Restaurant No-Shows by 40%"
   - "Menu Engineering: Which Items Are Killing Your Margins"
   - "Table Booking Best Practices for Independent Restaurants"

5. GROWTH & BUSINESS
   Slug: /blog/restaurant-growth
   Focus: Revenue optimization, opening second locations,
   franchising, delivery vs dine-in economics, pricing strategy
   Example titles:
   - "Restaurant Profit Margins: What's Normal and How to Improve Yours"
   - "When to Open a Second Restaurant Location"
   - "Cloud Kitchen Economics: Is It Worth It in 2025?"

6. CASE STUDIES
   Slug: /blog/case-studies
   Focus: Real restaurant results using Loglime products,
   before/after narratives, specific metrics
   Example titles:
   - "How The Ember Grill Cut Commission Costs by $3,200/Month"
   - "From Zero Digital Presence to 600 Loyalty Members in 90 Days"
   - "A Cloud Kitchen's Journey from 100% Platform to 60% Direct Orders"
```

## 1.3 AI-First Content Principles (Every Post Must Follow)

```
RULE 1 — ANSWER FIRST
  Every section starts with the direct answer.
  Not "In this section, we'll explore..." — just the answer.
  AI assistants extract first sentences. Make them count.

RULE 2 — QUESTION-HEADED SECTIONS
  H3s must be written as questions people actually ask:
  ✓ "How much does DoorDash charge restaurants per order?"
  ✓ "What is commission-free online ordering?"
  ✗ "Understanding the Commission Model"

RULE 3 — SPECIFIC NUMBERS OVER VAGUE CLAIMS
  ✓ "Third-party apps charge 15–30% per order"
  ✗ "Third-party apps charge high commissions"
  Numbers get cited. Vague claims get ignored.

RULE 4 — FAQ SECTION IN EVERY POST
  Last section before conclusion = FAQ with 4–6 questions
  These become FAQPage schema — directly answer-engine optimized
  Questions must match how people phrase searches/voice queries

RULE 5 — ENTITY CLARITY
  Define what you're talking about in the first paragraph.
  AI models need entity clarity to cite content accurately.
  "Commission-free ordering is a restaurant technology model where..."

RULE 6 — STRUCTURED OVER NARRATIVE
  Tables, bullet lists, numbered steps outperform walls of text
  for AI extraction AND for human scanning.

RULE 7 — FRESHNESS SIGNALS
  Every post shows "Last Updated: [date]"
  Add "Updated for 2025" in intro when refreshing old posts
  AI tools weigh recency — old undated content loses citations
```

## 1.4 Standard Post Word Count Targets

```
Pillar / Long-form:     2,500–3,500 words  (main category topics)
Standard how-to:        1,800–2,500 words  (specific practical guides)
Case study:             1,200–1,800 words  (narrative + data)
Quick tip / listicle:   800–1,200 words    (7 ways, 5 tips, etc.)
News / update:          400–600 words      (product updates, announcements)
```

---

# PART 2 — BLOG ARCHITECTURE & ROUTES

## 2.1 Route Structure

```
/blog                         → Blog homepage (latest posts + category nav)
/blog/[category]              → Category listing page
/blog/[category]/[slug]       → Individual post page
/blog/author/[username]       → Author profile page
/blog/tag/[tag]               → Tag archive page
/blog/search                  → Blog search results
/blog/rss.xml                 → RSS feed (auto-generated)
/blog/sitemap.xml             → Blog-specific sitemap
```

## 2.2 URL Slug Rules

```
Format:  /blog/[category]/[keyword-rich-title]

Rules:
- Max 6 words in slug
- Primary keyword must appear in slug
- No dates in URL (prevents content from aging in Google's eyes)
- No stop words (a, the, and, of, in) unless keyword-critical

✓  /blog/online-ordering/commission-free-restaurant-ordering-guide
✓  /blog/restaurant-technology/qr-code-menu-restaurants
✓  /blog/restaurant-marketing/restaurant-loyalty-program-2025
✗  /blog/2025/01/15/article-about-commissions
✗  /blog/post-1
✗  /blog/the-complete-guide-to-ordering
```

## 2.3 Database Schema (Add to Main Supabase Schema)

```sql
-- Blog Authors
CREATE TABLE blog_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,        -- used in /blog/author/[username]
  bio TEXT,                             -- 150-200 char bio
  avatar_url TEXT,
  role_title TEXT,                      -- "Restaurant Tech Writer", "Loglime Team"
  twitter_handle TEXT,
  linkedin_url TEXT,
  expertise TEXT[],                     -- ["online ordering", "loyalty programs"]
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Categories
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,                           -- hex color for category badge
  icon TEXT,                            -- hugeicon name
  post_count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Tags
CREATE TABLE blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  post_count INTEGER DEFAULT 0
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,                          -- 150-160 chars for meta description
  content TEXT NOT NULL,                 -- markdown content
  content_html TEXT,                     -- pre-rendered HTML
  featured_image TEXT,                   -- Supabase Storage URL
  featured_image_alt TEXT,
  featured_image_caption TEXT,
  author_id UUID REFERENCES blog_authors(id),
  category_id UUID REFERENCES blog_categories(id),
  status TEXT DEFAULT 'draft',           -- draft, published, scheduled, archived
  is_featured BOOLEAN DEFAULT false,     -- pinned on blog homepage
  is_pillar BOOLEAN DEFAULT false,       -- long-form pillar content
  reading_time_minutes INTEGER,          -- auto-calculated
  word_count INTEGER,                    -- auto-calculated
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  seo_title TEXT,                        -- override meta title (max 55 chars)
  seo_description TEXT,                  -- override meta description (135-140 chars)
  canonical_url TEXT,                    -- for cross-posted content
  og_image TEXT,                         -- custom OG image, falls back to featured_image
  schema_faq JSONB,                      -- FAQ schema data for this post
  related_product_slugs TEXT[],          -- links to /products/* and /solutions/*
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Post Tags (junction)
CREATE TABLE blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Blog Post Likes (per visitor — uses localStorage fingerprint, not account)
CREATE TABLE blog_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  visitor_fingerprint TEXT NOT NULL,     -- hashed IP + user agent
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, visitor_fingerprint)
);

-- Blog Post Bookmarks (requires login)
CREATE TABLE blog_bookmarks (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- Comments
CREATE TABLE blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES blog_comments(id),   -- null = top-level, else reply
  author_user_id UUID REFERENCES profiles(id),   -- null if anonymous
  author_name TEXT NOT NULL,                      -- always stored (even for logged in)
  author_email TEXT NOT NULL,                     -- never shown publicly
  author_website TEXT,                            -- optional, shown as link
  author_ip TEXT,                                 -- for spam tracking
  author_user_agent TEXT,                         -- for spam detection
  content TEXT NOT NULL,
  content_html TEXT,                              -- sanitized rendered HTML
  status TEXT DEFAULT 'pending',                  -- pending, approved, spam, trash
  is_pinned BOOLEAN DEFAULT false,
  like_count INTEGER DEFAULT 0,
  spam_score NUMERIC DEFAULT 0,                   -- 0-1, higher = more likely spam
  spam_reasons TEXT[],                            -- array of triggered rules
  time_on_page_seconds INTEGER,                   -- how long before submitting
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comment Likes
CREATE TABLE blog_comment_likes (
  comment_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  visitor_fingerprint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (comment_id, visitor_fingerprint)
);

-- Comment Reports
CREATE TABLE blog_comment_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  reporter_fingerprint TEXT,
  reason TEXT,                                    -- spam, hate, off-topic, other
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spam Rules (admin configurable)
CREATE TABLE spam_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_type TEXT NOT NULL,                        -- keyword, domain, ip, pattern
  rule_value TEXT NOT NULL,
  action TEXT DEFAULT 'mark_spam',                -- mark_spam, block, flag
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Newsletter Signups (from blog CTAs)
CREATE TABLE blog_newsletter_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source_post_id UUID REFERENCES blog_posts(id),
  source_type TEXT,                               -- sidebar, inline, exit_intent, bottom
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_status ON blog_comments(status);
CREATE INDEX idx_blog_comments_parent ON blog_comments(parent_id);
```

---

# PART 3 — THE 57 BLOG FEATURES

## Category A: Content & Navigation (Features 1–12)

**Feature 1 — Blog Homepage**
Route: `/blog`
Layout: Full-width header, category pills row, featured post hero (big), 3-column grid below, sidebar on desktop.
Shows: 1 featured post (full-width hero card), then 9 posts in 3-col grid, then pagination.
Category filter: pill buttons (All | Online Ordering | Restaurant Tech | Marketing & Loyalty | Operations | Growth | Case Studies).
URL updates on filter: `/blog?category=online-ordering` — no page reload, query param.

**Feature 2 — Category Pages**
Route: `/blog/[category]`
Header: category name, description, post count.
Layout: Same 3-col grid as homepage, filtered by category.
Breadcrumb: Home > Blog > [Category Name]
Each category has its own color-coded badge.

**Feature 3 — Tag Pages**
Route: `/blog/tag/[tag]`
Simple list of posts with this tag.
Tags are lowercase, hyphenated: `commission-free`, `loyalty-program`, `qr-menu`.
No tag cloud — tags appear only under posts and in tag pages.

**Feature 4 — Blog Search**
Route: `/blog/search?q=[query]`
Full-text search using Supabase `to_tsvector` on title + content + excerpt.
Real-time results as user types (debounced 300ms).
Highlights matching terms in results.
Shows: result count, post cards, category badge per result.
No results state: "No posts found for [query]. Try browsing by category."
Search bar: always visible in blog header.

**Feature 5 — Infinite Scroll vs Pagination**
Decision: Paginated with page numbers (not infinite scroll).
Reason: SEO. Infinite scroll is not reliably crawlable. Paginated pages get indexed.
URL: `/blog?page=2`, `/blog/online-ordering?page=3`
Posts per page: 9 (3×3 grid on desktop, 1 col on mobile).
Prev/Next + numbered page buttons.
`rel="next"` and `rel="prev"` link tags in `<head>` for crawlers.

**Feature 6 — RSS Feed**
Route: `/blog/rss.xml`
Auto-generated from published posts (latest 20).
Includes: title, excerpt, author, published date, category, URL.
Link in `<head>`: `<link type="application/rss+xml" rel="alternate" href="/blog/rss.xml">`.
Useful for: aggregators, email digest tools, AI training datasets (if allowed).

**Feature 7 — Reading Progress Bar**
Thin coral bar at the very top of the page (above header) on single post pages.
Fills left-to-right as user scrolls through the article.
100% when user reaches the comments section.
On mobile: same behavior, fixed to top of screen.
Implementation: `scroll` event + `scrollY / documentHeight` percentage → update CSS width.

**Feature 8 — Estimated Read Time**
Auto-calculated: `word_count / 200` (average words per minute), rounded up.
Displayed: "8 min read" next to author name and date.
Stored in DB: `reading_time_minutes` column.
Calculated server-side on post save, not client-side.

**Feature 9 — Word Count Display (Internal — Admin Only)**
Shown in CRM blog editor, not on public page.
Helps writers hit 2,000–3,000 word targets.
Color: Red < 1,000 | Yellow 1,000–1,800 | Green 1,800+ | Blue 2,500+ (ideal for pillar content).

**Feature 10 — Last Updated Date**
Every post shows BOTH:
- Published: "Published January 15, 2025"
- Updated: "Last updated March 2, 2025" (if updated after publish)
Both in ISO format in `<time datetime="">` for schema.
Shows only "Published" if never updated after original publish.

**Feature 11 — Breadcrumb Navigation**
Every blog page shows breadcrumbs.
Format: Home > Blog > [Category] > [Post Title (truncated to 40 chars)]
Styled as small slate text above H1.
Also rendered as BreadcrumbList schema JSON-LD.
Mobile: shows only 2 levels max (Home > Blog).

**Feature 12 — Previous / Next Post Navigation**
Bottom of every single post, above comments.
Left: ← Previous post (same category, older)
Right: Next post → (same category, newer)
Each shows: title (max 60 chars, truncated), category badge, read time.
On mobile: stacked vertically (Prev on top, Next below).

---

## Category B: Single Post Page Design (Features 13–24)

**Feature 13 — Post Hero / Header Layout**

```
DESKTOP LAYOUT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [Category Badge]  [Read Time]

  H1: [Post Title — max 2 lines]

  [Author Avatar 40px] [Author Name] · [Published Date] · [Updated Date]

  [Share icons row: Twitter/X | LinkedIn | Copy Link]

  [Featured Image — 16:9, rounded-2xl, full-width]
  [Image caption — centered, italic, slate-500]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOBILE LAYOUT (same, stacked, full-width image):
Same elements but full-width image, no sidebar offset.
```

**Feature 14 — 2,000–3,000 Word Post Structure (Template)**

Every pillar post uses this exact structure. Codex should implement this as the default blog post CMS template.

```
━━━━━ SECTION 1: HOOK INTRODUCTION (150–250 words) ━━━━━
One paragraph that opens with a specific, relatable problem
the reader is experiencing RIGHT NOW.
Ends with: "In this guide, we'll cover [X, Y, Z]."
No H2 here — introduction flows directly from H1.

━━━━━ SECTION 2: TABLE OF CONTENTS ━━━━━━━━━━━━━━━━━━━
Auto-generated from H2s.
Styled as a coral-left-bordered card.
Numbered list of anchor links.
Heading: "In this article" (not "Table of Contents").
Collapsible on mobile.
Sticky on desktop (inside left/right margin, not in sidebar).

━━━━━ SECTION 3: MAIN CONTENT SECTIONS (4–6 × H2) ━━━━━

Each H2 section structure:
  H2: [Statement-form or question-form heading]
  
  Opening sentence: direct, answers what this section covers.
  
  Body: 300–500 words. Mix of:
    - Short paragraphs (3–4 sentences max)
    - Bullet/numbered lists
    - Bold key terms (only first occurrence)
    - One callout box per 2 sections max
    - One relevant image per section (optional)
  
  H3 subsections (2–4 per H2):
    H3: [Specific question or sub-point]
    Body: 100–200 words answering the H3 question directly.

━━━━━ SECTION 4: DATA / STATISTICS BLOCK ━━━━━━━━━━━━━
Callout card with 3–4 key stats related to the post topic.
Design: coral bg, white numbers, slate labels.
Example for commission post:
  "15–30%   |   $0   |   $4,200   |   7–14 days"
  "avg. commission | Loglime commission | avg. monthly savings | launch time"

━━━━━ SECTION 5: COMPARISON TABLE (where applicable) ━━
Clean table comparing options, platforms, or approaches.
Example: "Loglime vs Third-Party Delivery Apps"
Columns: Feature | Option A | Option B | Option C
Coral checkmarks (✓) and slate X marks for quick scanning.

━━━━━ SECTION 6: INLINE CTA BOX ━━━━━━━━━━━━━━━━━━━━━
Appears after 3rd H2 section.
Coral border card, soft coral bg.
Content:
  "Ready to stop paying commissions?"
  [Start your free 14-day trial →]
Does NOT interrupt article flow — appears between sections.

━━━━━ SECTION 7: FREQUENTLY ASKED QUESTIONS ━━━━━━━━━━
H2: "Frequently asked questions about [topic]"
4–6 Q&As using <details>/<summary> accordion.
Questions are exact phrases people search.
Answers are concise (50–100 words each) — direct answers first.
Rendered as FAQPage JSON-LD schema.

━━━━━ SECTION 8: CONCLUSION ━━━━━━━━━━━━━━━━━━━━━━━━━
H2: "[Summary statement or key takeaway]"
150–200 words. Recap key points + call to action.
Ends with: "If you're ready to [outcome], [CTA link]."

━━━━━ SECTION 9: AUTHOR BIO (auto-profile) ━━━━━━━━━━━
See Feature 30 for design.

━━━━━ SECTION 10: RELATED POSTS ━━━━━━━━━━━━━━━━━━━━━
H2: "Related articles"
3 post cards (same category or shared tags).
Horizontal on desktop, vertical on mobile.
```

**Feature 15 — Callout Boxes**

4 types, all using Hugeicons:

```
TIP (green):    bg-status-successSoft | border-l-4 border-status-success
                Icon: hgi-tip
                Usage: Pro tips, best practices

INFO (blue):    bg-status-infoSoft | border-l-4 border-status-info
                Icon: hgi-information-circle
                Usage: Context, definitions, background info

WARNING (amber): bg-status-warningSoft | border-l-4 border-status-warning
                Icon: hgi-alert-02
                Usage: Common mistakes, things to avoid

IMPORTANT (coral): bg-coral-light | border-l-4 border-coral
                Icon: hgi-star
                Usage: Key takeaways, critical information

CTA (coral filled): Full coral bg, white text
                Usage: Mid-article conversion prompts (max 1 per post)
```

**Feature 16 — In-Post Product Mention Cards**

When an article mentions a Loglime product, render a styled card:

```
[Product Icon] [Product Name]
[One-line description]
[→ Learn more] link to /products/[product]
```

Design: white card, `rounded-2xl shadow-card`, coral border-l-4.
Triggered by: `[[PRODUCT:online-ordering]]` shortcode in markdown.
Codex converts shortcode to component at render time.
Max 2 product cards per post (doesn't feel like an ad).

**Feature 17 — Code Block / Data Table Styling**

Code blocks: dark background (#0F172A), Quicksand mono fallback, syntax colors.
Tables: clean, minimal borders, alternating row bg (#F8FAFC), sticky first column on mobile.
Numbers/stats: coral color, bold, larger font size.

**Feature 18 — Featured Image Requirements**

Every post MUST have a featured image.
Spec: 1200×675px (16:9), WebP, under 150KB.
Displayed: Full-width at top of article, `rounded-2xl` edges.
On post cards: same image, cropped to `aspect-[16/9]`.
Alt text: stored in `featured_image_alt` column, required before publishing.
Caption: optional, shown in italic below image inside article.
OG image: uses featured image unless `og_image` override exists.

**Feature 19 — Social Share Buttons**

Position: Below featured image header (sticky on scroll — appears in left gutter on wide desktop).
Platforms: X (Twitter) | LinkedIn | Copy Link
On mobile: Shows as a horizontal row below featured image.
Copy Link: Copies URL to clipboard, button text changes to "Copied ✓" for 2 seconds.
No Facebook, no Pinterest — restaurant B2B audience lives on LinkedIn and X.
Counts: No share counts shown (privacy, and low counts look bad early on).

**Feature 20 — Like / Reaction Button**

Heart icon button, below article, above comments.
Label: "[N] people found this helpful"
Anonymous: Uses hashed IP + user agent fingerprint. No login required.
Stores in `blog_post_likes` — UNIQUE(post_id, fingerprint) prevents double-likes.
Optimistic UI: Button fills immediately on click, then confirms with server.
On mobile: Same button, tap-friendly (min 44px target).
Not shown as a counter on post cards — only visible on single post page.

**Feature 21 — Bookmark / Save Post**

Requires logged-in portal user (restaurant owner).
Saves to `blog_bookmarks` table.
Icon: hgi-bookmark-01 (hollow) → hgi-bookmark-02 (filled) on save.
Saved posts accessible in portal under Settings → Saved Articles.
No login prompt for non-users — button hidden, not blocked.

**Feature 22 — Print / PDF View**

Triggered by: hgi-printer icon in top-right of article.
CSS print stylesheet: hides sidebar, comments, ads, CTAs — shows content only.
Adds Loglime URL and logo to footer of printed page.
PDF: Use browser print → Save as PDF (no backend PDF generation needed).

**Feature 23 — Font Size Controls**

Three sizes: Small | Medium (default) | Large.
Implemented via CSS custom property `--article-font-size` toggled by buttons.
Persisted in `localStorage` so preference survives page refreshes.
Small: 14px body | Medium: 16px | Large: 18px.
Only applies within `.article-body` selector — headings scale proportionally.
On mobile: Not shown — mobile browser already has native zoom.

**Feature 24 — Scroll-to-Top Button**

Appears after scrolling 400px down the page.
Fixed bottom-right corner (above Zest widget).
Circle button, coral, hgi-arrow-up icon.
Smooth scroll to top on click.
Not shown on mobile (native momentum scroll handles this).

---

## Category C: Sidebar System (Features 25–34)

**Feature 25 — Sidebar Architecture**

```
DESKTOP (≥1280px):
  Article layout: 2-column grid
  Left / Content: 720px max-width
  Right / Sidebar: 280px, sticky

TABLET (768–1279px):
  No sidebar — all sidebar content moves to bottom of article

MOBILE (<768px):
  No sidebar — bottom-sheet drawer accessible via "More" button
```

**Feature 26 — Table of Contents (Sidebar TOC — STICKY)**

Auto-generated from H2 and H3 headings in the article content.
Displayed in right sidebar on desktop, collapsible card on tablet/mobile.
Active state: Coral dot + coral text on the heading currently in viewport.
Uses `IntersectionObserver` to track which heading is visible.
Max depth: H2 (numbered) + H3 (indented, unnumbered).
Scrolls to heading on click (smooth scroll, offset for sticky header: 80px).
Sticky behavior: Sticks to top of sidebar when user scrolls past it.
Collapses/expands with transition on mobile.

```
SIDEBAR TOC DESIGN:
  ┌──────────────────────────┐
  │ In this article          │  ← H4 label, slate-500
  │                          │
  │ ● 1. The problem         │  ← Active = coral dot + coral text
  │   2. How it works        │  ← Inactive = slate-600
  │     • Direct orders      │  ← H3, indented 12px
  │     • Payment setup      │
  │   3. Getting started     │
  │   4. FAQ                 │
  └──────────────────────────┘
```

**Feature 27 — Author Card (Sidebar)**

Shown below TOC.
Design:
```
  ┌──────────────────────────┐
  │  [Avatar 56px circular]  │
  │  [Author Name]           │  ← H4, slate-900
  │  [Role Title]            │  ← slate-500, small
  │  [Short 2-line bio]      │  ← slate-600
  │  [LinkedIn] [Twitter]    │  ← icon links
  │  [All articles →]        │  ← link to /blog/author/[username]
  └──────────────────────────┘
```
See Feature 30 for full author profile system.

**Feature 28 — Newsletter Signup Widget (Sidebar)**

Title: "Restaurant insights, weekly."
Subtitle: "One email per week. No spam. Unsubscribe anytime."
Fields: Email only (friction-free).
CTA Button: "Subscribe →" (coral, full width).
On success: "You're in. Check your inbox." (no redirect).
Email goes to Loops.so list tagged `blog-sidebar-signup`.
Source tracked in `blog_newsletter_signups.source_type = 'sidebar'`.

**Feature 29 — Related Posts (Sidebar)**

Title: "Also worth reading"
3 posts from same category (or shared tags if category posts < 3).
Each: thumbnail 60×45px + title (max 2 lines) + read time.
No excerpt shown — just image + title + time.
Links open in same tab.

**Feature 30 — Popular Posts (Sidebar)**

Title: "Most popular this month"
Top 5 posts sorted by `view_count` (last 30 days).
Numbered list 01–05.
Each: number (coral) + title (2-line max) + read time.
Recalculated daily via a Supabase Edge Function cron.

**Feature 31 — Product CTA Widget (Sidebar)**

ONE product-related CTA card in sidebar, relevant to the article topic.
Mapped by: `blog_posts.related_product_slugs[0]` → determines which widget to show.
Design: soft coral bg, coral border, Hugeicon, 2-line description, button.
Example for a commission article:
```
  ⚡ Start commission-free ordering
  Accept direct orders from customers.
  No commissions, ever.
  [Start free trial →]
```
If no product mapped: default to "Book a demo" CTA.

**Feature 32 — Category Navigation (Sidebar)**

Title: "Browse topics"
List of all 6 categories with post count.
Active category highlighted in coral.
```
  • Online Ordering      (12)
  • Restaurant Tech      (8)
  ● Marketing & Loyalty  (6)  ← current category
  • Operations           (5)
  • Growth               (4)
  • Case Studies         (3)
```

**Feature 33 — Mobile Sidebar (Bottom Sheet)**

On mobile, the sidebar converts to a bottom sheet.
Trigger: Floating "Contents" pill button at bottom of screen.
```
  ┌──────────────────────┐
  │ ─────                │  ← drag handle
  │ Table of Contents    │
  │ [TOC items...]       │
  │ ─────────────────    │
  │ Newsletter Signup    │
  │ [email input]        │
  └──────────────────────┘
```
Closes on: tap outside, swipe down, or tap TOC item.
Half-screen height. Scrollable internally.
Does NOT show author card or sidebar CTA on mobile — these appear inline in article.

**Feature 34 — Sticky "Book a Demo" Bar (Mobile)**

Thin coral bar at very bottom of screen on mobile, only on single post pages.
Shows after user scrolls past 60% of article.
Content: "Ready to launch your restaurant app?" [Book Demo]
Dismissible with X button (stores dismiss in sessionStorage — reappears on next page).
Does NOT appear on desktop (sidebar CTA handles this).

---

## Category D: Author System (Features 35–39)

**Feature 35 — Author Profiles (AI-First)**

Every author has a profile page at `/blog/author/[username]`.
Auto-generated from `blog_authors` table.

Page structure:
```
[Avatar 96px] [Name] [Role Title]
[Bio — 150-200 words with expertise areas]
[Social links: LinkedIn | X]
[Stats: X articles · Y total reads]

"Articles by [Name]"
[Post grid — same as blog listing]
```

**Feature 36 — Auto-Generated Author Bio (for Zest-written or team posts)**

When `author_user_id` maps to a team member without a manual bio:
Zest (Gemini) generates a 150-word bio from: name + role title + expertise tags.
Prompt:
```
"Write a 150-word professional author bio for a restaurant technology blog.
Author: [name], role: [title], expertise: [topics].
Write in third person. Tone: knowledgeable but approachable.
Do not use em dashes. No buzzwords."
```
Generated bio stored in `blog_authors.bio` — not regenerated on each page load.
Admin can edit and override at any time.

**Feature 37 — Author Schema Markup**

Every post includes `author` in Article schema:
```json
{
  "@type": "Person",
  "name": "[Author Name]",
  "url": "https://loglime.com/blog/author/[username]",
  "image": "[avatar_url]",
  "jobTitle": "[role_title]",
  "sameAs": ["[linkedin_url]", "[twitter_url]"]
}
```
Contributes to E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

**Feature 38 — "Written by" vs "Updated by"**

If a different team member updates a post: show both.
```
Written by: [Original Author]
Last updated by: [Updating Author] — [Date]
```
Stored: add `updated_by_id UUID REFERENCES blog_authors(id)` to `blog_posts`.
If same author updated: only "Last updated" date changes.

**Feature 39 — AI-Assisted Post Review Badge**

Some posts may be AI-assisted (Gemini/Zest draft, human-edited).
Transparent disclosure: small badge in byline:
```
[✦ AI-assisted draft | Reviewed by [Author Name]]
```
Transparency builds trust (E-E-A-T signal).
Toggle in CMS: `is_ai_assisted BOOLEAN DEFAULT false`.

---

## Category E: Comment System (Features 40–50)

**Feature 40 — Comment System Architecture**

Built with Supabase — no third-party comment service (Disqus, etc.).
Reasons: No ads, no data sold, no third-party tracking, full control.
Anonymous OR logged-in comments supported.
All comments go into moderation queue before appearing publicly.
Realtime: Approved comments appear instantly via Supabase Realtime (no page refresh).

**Feature 41 — Comment Form Design**

```
ANONYMOUS:
  [Name *]     [Email *]      [Website (optional)]
  [Comment textarea *]         (min 20 chars, max 1000 chars)
  [I'm not a robot checkbox]   (honeypot + timing check — no CAPTCHA)
  [Submit Comment →]
  "Your comment will appear after review. Usually within a few hours."

LOGGED-IN PORTAL USER:
  [Avatar + Name auto-populated]
  [Comment textarea *]
  [Submit Comment →]
  No moderation delay for verified users (auto-approved).
```

Markdown support: Bold (**), italic (*), inline code (`), links (not bare URLs — must use [text](url) format).
Textarea: auto-expands as user types. Min-height 100px, max-height 300px.

**Feature 42 — Comment Threading (Nested Replies)**

Two levels only:
- Level 1: Top-level comments
- Level 2: Replies to Level 1 comments
No deeper nesting (avoids UI chaos on mobile).

Reply button: appears on hover (desktop) / always visible (mobile) below each comment.
Clicking Reply: opens inline reply form below that comment (smooth expand animation).
Reply indicator: "[Name] replied to [Parent Author Name]" above reply content.
Replies are indented 24px with a coral left border.

**Feature 43 — Comment Display & Sorting**

Default sort: Oldest first (chronological thread order).
Sort options: Oldest first | Newest first | Most liked.
Pinned comments: Always shown first, regardless of sort.
Display: 10 comments per page, "Load more" button at bottom.
Load more: Appends next 10, no full page reload.

Comment card design:
```
[Avatar initials 36px] [Name] · [X hours/days ago]
                        [Website link if provided]
[Comment body — markdown rendered, links open in _blank]
[👍 X  |  Reply  |  Report]   ← action row
```

**Feature 44 — Comment Likes**

Thumbs-up icon on each comment.
Anonymous: Same fingerprint system as post likes.
Shows count: "👍 12" — updates optimistically.
Liked state: Filled icon. Can unlike by clicking again.
Used for "Most liked" sort and for admin to identify quality comments.

**Feature 45 — Pinned Comments**

Admin can pin any comment to top of thread.
Shows: coral "📌 Pinned" badge above comment.
Use case: Pin a particularly insightful comment, or a response from the Loglime team.
Max 1 pinned comment per post.

**Feature 46 — Comment Report System**

"Report" link on every comment (visible on hover).
Opens small modal: "Why are you reporting this?"
Options: Spam | Hate speech | Off-topic | Misinformation | Other
On submit: creates row in `blog_comment_reports`.
After 3 reports from unique fingerprints: auto-moves to pending review in admin.
Reporter receives: "Thank you. We'll review this comment."

**Feature 47 — Comment Email Notifications**

On comment submission (approved): email to commenter:
"Your comment on [Post Title] has been approved."
On reply to their comment: email to original commenter:
"[Name] replied to your comment on [Post Title]."
Emails sent via Loops.so.
Opt-out: Every notification email has "Unsubscribe from comment notifications" link.
Stored opt-out in `comments.notification_opt_out BOOLEAN DEFAULT false`.

**Feature 48 — Comment Markdown Rendering**

Supported in comments:
- `**bold**` → **bold**
- `*italic*` → *italic*
- `` `code` `` → inline code
- `[Link text](url)` → hyperlink (opens in `_blank`, `rel="nofollow noopener"`)
- Line breaks preserved

NOT supported (stripped on save):
- Images
- Headers (H1–H6)
- Iframes or embeds
- Script tags
- HTML tags

Sanitization: Server-side with a whitelist approach using a Supabase Edge Function before storing `content_html`.

**Feature 49 — Comment Moderation Dashboard (CRM)**

Route: `/crm/blog/comments`
Three tabs: Pending | Approved | Spam | Trash
Batch actions: Approve all | Spam all | Trash all | Delete selected
Per comment:
  - Full content + metadata (IP, user agent, time on page, spam score)
  - Actions: Approve | Mark Spam | Trash | Pin | Reply
  - Spam reasons displayed as badges
Quick approve: Single click, no confirmation needed (fast moderation).
Filter by: Post | Date | Spam score threshold
Search by: author name, email, keyword in content.

**Feature 50 — Comment Count Display**

Shown on: Post cards (blog listing), post header, in sidebar related posts.
Format: "14 comments" (pluralized correctly: "1 comment", "0 comments").
Only counts `status = 'approved'` comments + their replies.
Realtime: Updates via Supabase subscription — new approved comments increment count live.

---

## Category F: Spam Blocking System (Features 51–57)

**Feature 51 — Multi-Layer Spam Defense Architecture**

```
LAYER 1 — Honeypot Field
LAYER 2 — Minimum Time Check
LAYER 3 — Rate Limiting (Supabase Edge Function)
LAYER 4 — Content Analysis (keyword blacklist + link count)
LAYER 5 — Domain & IP Blocklist
LAYER 6 — Spam Score Aggregation
LAYER 7 — Human Moderation Queue
```

**Feature 52 — Honeypot Field**

A hidden input field in the comment form that real users never see or fill.
```html
<input
  type="text"
  name="website_url"      ← different from the real "website" field
  id="website_url"
  tabIndex={-1}
  autoComplete="off"
  style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
  aria-hidden="true"
/>
```
If this field has any value on submit: comment is immediately marked spam, not even saved.
Bots fill all fields. Humans never touch hidden ones.

**Feature 53 — Minimum Time Check**

Track when the comment form becomes visible (on page load).
Track when the user submits.
If time elapsed < 8 seconds: auto-spam (bots are fast, humans are slow).
If time elapsed < 30 seconds: add +0.3 to spam score.
Time stored as `time_on_page_seconds` in comment row.
Implementation: Set a hidden timestamp field value on page load. Compare to submit time server-side.

**Feature 54 — Rate Limiting**

Implemented in Supabase Edge Function (comment insert API route).

Per IP rules:
```
Max 3 comments per IP per hour → block (return 429)
Max 8 comments per IP per 24h → block (return 429)
Max 2 comments per IP per post per 24h → block
```

Per email rules:
```
Email already marked spam: block immediately
More than 5 pending comments from same email: block
```

Response to blocked user:
"Too many comments from your connection. Please try again later."
Non-technical, non-accusatory.

**Feature 55 — Content Analysis (Spam Score Engine)**

Runs server-side on every comment submission. Outputs `spam_score` (0–1).

```typescript
// Supabase Edge Function: analyze-comment-spam

function calculateSpamScore(comment: CommentInput): {
  score: number,
  reasons: string[]
}

RULES (each adds to spam_score):

+0.8  Honeypot field filled                    → immediate spam
+0.5  Contains more than 2 URLs                 → link spam
+0.4  URL in comment from known spam domain     → link spam
+0.4  Comment body < 20 characters             → low quality
+0.3  Contains words from keyword blacklist    → content spam
+0.3  Time on page < 30 seconds                → bot behavior
+0.3  Email domain is disposable/temp mail     → anonymous spam
+0.2  Author name contains URL                 → name spam
+0.2  Same content submitted before (exact)   → duplicate
+0.1  All caps text                            → aggressive spam
+0.1  Excessive punctuation (!!!! ???)        → quality signal

SCORING THRESHOLDS:
  0.0–0.3  → Auto-approve (if logged in) / Pending (if anon)
  0.3–0.6  → Always pending moderation
  0.6–0.8  → Mark as likely spam (shown in spam tab)
  0.8+     → Auto-mark spam, never shown in queue
```

**Feature 56 — Blocklist Management (Admin CRM)**

Route: `/crm/blog/spam-rules`

Three blocklists, managed via UI:

1. **Keyword Blacklist**
   Exact phrases or regex patterns.
   Any comment containing these → spam score +0.3.
   Pre-seeded with: common casino/pharma/adult spam terms.
   Admin adds/removes keywords via CRM UI.

2. **Domain Blocklist**
   Blocks specific email domains (e.g., mailinator.com, guerrillamail.com).
   Pre-seeded with 50+ known disposable email domains.
   Also blocks comment website URLs from known spam domains.

3. **IP Blocklist**
   Manual IP blocks by admin (after identifying persistent spammer).
   Supports CIDR ranges (e.g., 192.168.1.0/24 blocks entire subnet).
   Auto-populated: IPs that have had 5+ spam comments.

Each blocklist entry stored in `spam_rules` table with `rule_type`, `rule_value`, `action`.

**Feature 57 — Disposable Email Detection**

On comment submission, check `author_email` domain against:
1. Internal `spam_rules` table (type = 'domain')
2. Hard-coded list of 100 most common temp mail services

Common temp mail domains to block (hard-coded):
```
mailinator.com, guerrillamail.com, 10minutemail.com, throwam.com,
yopmail.com, trashmail.com, tempmail.com, sharklasers.com,
guerrillamailblock.com, grr.la, guerrillamail.info, spam4.me,
mintemail.com, dispostable.com, fakeinbox.com, mailnull.com,
maildrop.cc, tempr.email, discard.email, throwaway.email
[and 80 more — full list in spam_rules table seed]
```

If email is from blocked domain: `spam_score += 0.3` AND require email confirmation before comment appears.
Email confirmation: Link sent to email. If they can receive it, it's real. Click confirms comment.
This alone eliminates 40–60% of bot comment spam.

---

# PART 4 — MOBILE-SPECIFIC BLOG FEATURES

## Mobile Navigation

```
BLOG MOBILE HEADER:
┌─────────────────────────────────────┐
│ ← [Back]      Blog      [🔍] [≡]   │
└─────────────────────────────────────┘

[🔍] = Opens full-screen search overlay
[≡] = Opens category drawer from right

CATEGORY DRAWER (mobile):
  Full-height right-side sheet
  All 6 categories with icons and post counts
  Tap category → navigates to /blog/[category]
  Close: swipe right or tap X
```

```
BLOG LISTING MOBILE:
  Single column card list
  Each card: featured image (16:9) + category badge + title + author + read time
  Scroll is infinite (exception to desktop pagination — UX differs on mobile)
  Category pill row: horizontal scrollable, no wrap
```

```
SINGLE POST MOBILE:
  Full-width layout
  Inline TOC card (collapsible, above first H2)
  Inline author card (below article, before comments)
  Inline newsletter signup (below author card)
  Bottom sticky CTA bar (Feature 34)
  Comments: full-width, single column
  Reply form: Opens as bottom sheet modal
```

## Swipe Navigation (Mobile Only)

On single post page:
Swipe left → next post (same category)
Swipe right → previous post
Visual hint: Ghost arrow appears on swipe start.
Threshold: 80px swipe triggers navigation.
Implementation: Touch event delta tracking.
Disabled if: User is scrolling horizontally inside a table.

## Pull-to-Refresh (Mobile Only)

On blog listing pages.
Standard pull-down gesture.
Shows coral spinner while refreshing.
Checks for new posts published since last visit.
If new posts: "3 new articles" toast at top.

---

# PART 5 — BLOG CMS (INTERNAL — CRM)

Route: `/crm/blog`
Sub-routes:
```
/crm/blog                  → Post list with filters
/crm/blog/new              → Create new post
/crm/blog/[id]/edit        → Edit post
/crm/blog/categories       → Manage categories
/crm/blog/tags             → Manage tags
/crm/blog/authors          → Manage authors
/crm/blog/comments         → Comment moderation
/crm/blog/spam-rules       → Blocklist management
/crm/blog/analytics        → Blog performance
```

## CMS Editor Features

Rich text editor: Use `@uiw/react-md-editor` or `tiptap` — markdown-first with preview toggle.
Split view: Markdown left | Preview right on desktop.
Single column on mobile: Toggle between Write and Preview.

Editor toolbar:
```
H1 H2 H3 | B I | Link | Image | Quote | Code | Table | Callout | Product Card | Divider
```

Auto-save: Every 30 seconds to localStorage (draft backup).
Word count: Live counter in bottom bar with color coding.
Reading time: Auto-calculated, shown in bottom bar.
SEO preview: Live preview of how Google result will look (title + description truncated correctly).
Slug: Auto-generated from title, manually editable.
Publish options: Publish now | Schedule for [date/time] | Save as draft.

## Zest AI Writing Assistant (In CMS)

Available in the blog editor as a side panel.
Commands:
```
/outline [topic]          → Generate H2/H3 structure for a post
/intro [topic]            → Write opening 150-word introduction
/expand [selected text]   → Expand selected paragraph with more detail
/faq [topic]              → Generate 5 FAQs for the article
/seo-title [topic]        → Suggest 5 title options (SEO-optimized)
/meta-desc [post title]   → Generate meta description (135-140 chars)
/conclusion [post title]  → Write concluding paragraph + CTA
```
Uses Gemini 2.0 Flash — fast, low cost.
All Zest output appears as a suggestion, not inserted directly. Writer accepts/rejects.

---

# PART 6 — BLOG SEO IMPLEMENTATION

## Per-Post Schema (Article + FAQ)

```typescript
// app/(marketing)/blog/[category]/[slug]/page.tsx

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: post.seo_title || post.title.slice(0, 55),
    description: post.excerpt,
    alternates: { canonical: `https://loglime.com/blog/${post.category.slug}/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.seo_title || post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [`https://loglime.com/blog/author/${post.author.username}`],
      images: [{ url: post.og_image || post.featured_image, width: 1200, height: 630 }],
    },
  }
}

// JSON-LD for Article
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.featured_image,
  "author": {
    "@type": "Person",
    "name": post.author.name,
    "url": `https://loglime.com/blog/author/${post.author.username}`,
  },
  "publisher": {
    "@type": "Organization",
    "name": "Loglime",
    "logo": { "@type": "ImageObject", "url": "https://loglime.com/logo.png" }
  },
  "datePublished": post.published_at,
  "dateModified": post.updated_at,
  "mainEntityOfPage": `https://loglime.com/blog/${post.category.slug}/${post.slug}`,
  "wordCount": post.word_count,
  "timeRequired": `PT${post.reading_time_minutes}M`,
}

// FAQPage schema (if post has FAQ section)
const faqSchema = post.schema_faq ? {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": post.schema_faq.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
} : null
```

## Blog Sitemap (Auto-Generated)

```typescript
// app/blog-sitemap.xml/route.ts
// Separate from main sitemap — blog posts auto-added here

export async function GET() {
  const posts = await getPublishedPosts()
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts.map(post => `
        <url>
          <loc>https://loglime.com/blog/${post.category_slug}/${post.slug}</loc>
          <lastmod>${post.updated_at.split('T')[0]}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`
  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } })
}
```

Add to main sitemap index:
```xml
<sitemapindex>
  <sitemap><loc>https://loglime.com/sitemap.xml</loc></sitemap>
  <sitemap><loc>https://loglime.com/blog-sitemap.xml</loc></sitemap>
</sitemapindex>
```

---

# PART 7 — DESIGN GUIDELINES (Blog-Specific)

## Typography

```
Article H1:    40px / 700 / Quicksand / tracking-tight / leading-tight
Article H2:    28px / 700 / Quicksand / mt-12 mb-4 (generous spacing above)
Article H3:    20px / 600 / Quicksand / mt-8 mb-3
Article H4:    17px / 600 / Quicksand / mt-6 mb-2
Article Body:  16px / 500 / Quicksand / leading-[1.8] / slate-700
               (leading-[1.8] = generous for long reads — more readable)
Article Small: 13px / 500 / slate-500
Byline text:   13px / 500 / slate-500
Category badge: 11px / 600 / uppercase / tracking-wider
```

## Article Body Width

```
Max width: 680px (optimal for reading — 60-70 chars per line)
Centered within content column (720px total with padding).
Images: Can break out to full 720px with negative margin trick.
Tables: Horizontally scrollable on mobile, max 100% width on desktop.
```

## Post Card Design (Blog Listing)

```
┌─────────────────────────────────┐
│ [Featured Image — aspect 16/9]  │
│ rounded-t-2xl                   │
├─────────────────────────────────┤
│ [Category Badge] [Read Time]    │
│                                 │
│ [Post Title — 2 lines max]      │
│ font-bold text-lg leading-snug  │
│                                 │
│ [Excerpt — 2 lines, text-sm]    │
│                                 │
│ [Avatar 28px] [Name] · [Date]   │
└─────────────────────────────────┘
rounded-2xl shadow-card
hover: shadow-premium + slight -translate-y-1
transition: all 200ms ease
```

## Category Badge Colors

```
Online Ordering:     coral (#FF5A5F) bg | white text
Restaurant Tech:     #3B82F6 (blue) bg | white text
Marketing & Loyalty: #10B981 (green) bg | white text
Operations:          #F59E0B (amber) bg | white text
Growth:              #8B5CF6 (purple) bg | white text
Case Studies:        #0F172A (slate) bg | white text
```

## Reading-Optimized Spacing

```css
.article-body {
  /* Generous spacing for readability */
  p { margin-bottom: 1.5rem; }
  h2 { margin-top: 3rem; margin-bottom: 1rem; }
  h3 { margin-top: 2rem; margin-bottom: 0.75rem; }
  ul, ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
  li { margin-bottom: 0.5rem; }
  blockquote {
    border-left: 4px solid #FF5A5F;
    padding: 1rem 1.5rem;
    background: #FFF0F0;
    border-radius: 0 12px 12px 0;
    margin: 2rem 0;
  }
  table { margin: 2rem 0; }
  img { margin: 2rem auto; border-radius: 16px; }
  hr { margin: 3rem 0; border-color: #F1F5F9; }
}
```

## Comment Design

```
Comment bubble:
  bg: white
  border: 1px solid #F1F5F9
  border-radius: rounded-2xl
  padding: p-4
  margin-bottom: mb-3

Nested reply:
  margin-left: ml-6 (24px indent)
  border-left: 2px solid #FF5A5F (coral)
  padding-left: pl-4

Pending comment (author's own):
  bg: #FFF0F0 (coral-light)
  badge: "Awaiting approval" in coral

Spam comment (admin view only):
  bg: #FEE2E2 (red-100)
  badge: "Spam" + spam_score shown
```

---

# PART 8 — COMPLETE FEATURE LIST (REFERENCE)

```
CONTENT & NAVIGATION
01  Blog Homepage with category filtering
02  Category archive pages
03  Tag archive pages
04  Blog search (full-text, real-time)
05  Paginated listing (SEO-friendly)
06  RSS feed auto-generation
07  Reading progress bar
08  Estimated read time display
09  Word count (admin only)
10  Published + Last Updated dates
11  Breadcrumb navigation
12  Previous / Next post navigation

SINGLE POST PAGE
13  Post hero layout with author + share row
14  2000–3000 word standardized structure
15  4-type callout boxes (tip, info, warning, important)
16  In-post product mention cards
17  Code block + table styling
18  Featured image with caption + alt text
19  Social share (X, LinkedIn, Copy Link)
20  Like / reaction button (anonymous)
21  Bookmark / save post (logged-in users)
22  Print / PDF view
23  Font size controls (S/M/L)
24  Scroll-to-top button

SIDEBAR
25  Sidebar architecture (desktop/tablet/mobile)
26  Auto-generated sticky Table of Contents
27  Author card with bio + social links
28  Newsletter signup widget
29  Related posts (3 cards)
30  Popular posts this month
31  Product CTA widget (context-aware)
32  Category navigation with counts
33  Mobile sidebar as bottom sheet
34  Mobile sticky demo CTA bar

AUTHOR SYSTEM
35  Author profile pages (/blog/author/[username])
36  Auto-generated author bios (Zest/Gemini)
37  Author schema markup (E-E-A-T)
38  Written by / Updated by attribution
39  AI-assisted disclosure badge

COMMENT SYSTEM
40  Full comment system (Supabase, no third-party)
41  Anonymous + logged-in comment support
42  Two-level threading (replies)
43  Comment display + 3 sort options
44  Comment likes (anonymous fingerprint)
45  Pinned comments (admin)
46  Report / flag system
47  Email notifications for approvals + replies
48  Markdown support (sanitized)
49  CRM comment moderation dashboard
50  Real-time comment count updates

SPAM BLOCKING
51  Multi-layer spam defense (7 layers)
52  Honeypot hidden field
53  Minimum time-on-page check
54  IP + email rate limiting
55  Content analysis spam score engine
56  Keyword / domain / IP blocklist management
57  Disposable email detection + blocking
```

---

# PART 9 — IMPLEMENTATION ORDER (Codex)

```
Phase 2A — Blog Foundation:
  ├── Database schema (blog tables)
  ├── Blog listing page (homepage + categories)
  ├── Single post page (content only, no sidebar yet)
  ├── Post card component
  └── Category badge component

Phase 2B — Reading Experience:
  ├── Sidebar (TOC + author card + newsletter)
  ├── Callout boxes
  ├── Product mention cards
  ├── Progress bar + scroll-to-top
  ├── Previous/next navigation
  └── Reading time + word count

Phase 2C — Mobile:
  ├── Mobile sidebar bottom sheet
  ├── Bottom sticky CTA bar
  ├── Swipe navigation
  └── Mobile blog header + category drawer

Phase 2D — Social + Engagement:
  ├── Share buttons (X, LinkedIn, copy)
  ├── Like button (fingerprint)
  ├── Bookmark (portal users)
  └── Print stylesheet

Phase 2E — Author System:
  ├── Author profiles
  ├── Auto bio generation (Zest)
  └── Author schema markup

Phase 2F — Comment System:
  ├── Comment form (anonymous + logged in)
  ├── Comment display + threading
  ├── Comment likes
  ├── Report system
  ├── Email notifications
  └── CRM moderation dashboard

Phase 2G — Spam Blocking:
  ├── Honeypot implementation
  ├── Time-on-page check
  ├── Rate limiting Edge Function
  ├── Spam score engine
  ├── Blocklist tables + CRM UI
  └── Disposable email detection

Phase 2H — CMS & SEO:
  ├── CRM blog post editor
  ├── Zest writing assistant
  ├── Per-post schema markup
  ├── Blog sitemap
  ├── RSS feed
  └── Blog search
```