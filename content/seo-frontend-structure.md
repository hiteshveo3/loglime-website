# LOGLIME — COMPLETE SEO FRONTEND STRUCTURE
## Version 1.0 | Verified Titles ≤55 chars | Descriptions 135–140 chars
## For Codex: Implement every section exactly as written. No deviations.

---

# PART 1 — SITE ARCHITECTURE & URL STRUCTURE

## 1.1 Page Hierarchy

```
loglime.com/
├── /                             (Homepage)
├── /platform                     (Platform overview)
├── /pricing                      (Pricing plans)
├── /products                     (Products overview)
│   ├── /products/online-ordering
│   ├── /products/digital-menu
│   ├── /products/table-booking
│   ├── /products/loyalty
│   ├── /products/qr-menu
│   └── /products/restaurant-app
├── /solutions                    (Solutions overview)
│   ├── /solutions/cafes
│   ├── /solutions/bakeries
│   ├── /solutions/qsr
│   ├── /solutions/dine-in
│   ├── /solutions/cloud-kitchen
│   └── /solutions/franchise
├── /about
├── /contact
├── /demo
├── /faq
├── /blog                         (Phase 2 — placeholder only in v1)
├── /privacy
├── /terms
├── /cookies
├── /refunds
└── /acceptable-use
```

## 1.2 URL Slug Rules (for Codex)

- All lowercase, hyphen-separated — no underscores, no camelCase
- No trailing slash except homepage
- Short and keyword-rich — max 3-4 words per segment
- Product slugs: `/products/[product-name]`
- Solution slugs: `/solutions/[restaurant-type]`
- Blog posts (Phase 2): `/blog/[keyword-rich-title]`

## 1.3 Canonical URL Strategy

Every page must declare its own canonical URL. Use absolute URLs.

```typescript
// app/layout.tsx — global defaults
export const metadata: Metadata = {
  metadataBase: new URL('https://loglime.com'),
  // page-level metadata overrides below
}

// Example per-page canonical
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://loglime.com/products/online-ordering',
  }
}
```

Rules:
- www vs non-www: pick one, redirect the other. Use `https://loglime.com` (no www).
- HTTP → HTTPS: always redirect. Handled by Vercel automatically.
- CRM routes (`/crm/*`, `/portal/*`): add `<meta name="robots" content="noindex">` — never index internal app pages.

---

# PART 2 — VERIFIED SEO METADATA (All 27 Pages)

> Codex: These are final, character-verified values. Title ≤55 chars. Description 135–140 chars.
> Implement as Next.js App Router `export const metadata` on each page file.

## 2.1 Metadata Table

| Route | Title (chars) | Description (chars) |
|---|---|---|
| `/` | Loglime — Commission-Free Restaurant Apps (41) | Launch a branded restaurant app with commission-free ordering, digital menus, table booking and loyalty. Live in 14 days. No credit card. (137) |
| `/pricing` | Loglime Pricing — Restaurant App Plans (38) | Simple flat-fee pricing for restaurant apps starting from $79/month. 14-day free trial included. No credit card required. Cancel anytime. (137) |
| `/platform` | Loglime Platform — Restaurant Tech Suite (40) | One platform for restaurant ordering, menus, bookings, loyalty and customer data. Manage your entire digital operation from a single place. (139) |
| `/products` | Restaurant App Products — Loglime (33) | Online ordering, digital menus, QR menus, table booking, loyalty programs and branded restaurant apps — all commission-free from Loglime. (137) |
| `/products/online-ordering` | Commission-Free Online Ordering — Loglime (41) | Accept commission-free orders for pickup and delivery through your own branded platform. Keep 100% of food revenue. Go live in 14 days. (135) |
| `/products/digital-menu` | Digital Menu for Restaurants — Loglime (38) | Update your restaurant menu in seconds from any device. Beautiful digital menus with photos, allergen labels and real-time sold-out flags. (138) |
| `/products/table-booking` | Restaurant Table Booking System — Loglime (41) | Let guests book tables 24/7 online. Automated confirmations, SMS reminders and no-show tracking — all without a reservations coordinator. (137) |
| `/products/loyalty` | Restaurant Loyalty Program — Loglime (36) | Build a loyalty program your customers actually use. Points, stamps and rewards tied to your restaurant ordering system and branded app. (136) |
| `/products/qr-menu` | QR Code Menu for Restaurants — Loglime (38) | Scannable QR menus branded to your restaurant. No app download required. Always up to date. Place on tables, bags and marketing materials. (138) |
| `/products/restaurant-app` | Branded Restaurant App — iOS & Android \| Loglime (48) | Launch your own restaurant app on iOS and Android under your brand. Online ordering, loyalty, menus and push notifications. Live in 14 days. (140) |
| `/solutions` | Restaurant Solutions by Type — Loglime (38) | Loglime builds direct ordering tech for cafes, bakeries, QSRs, dine-in restaurants, cloud kitchens and franchise groups. Zero commission. (137) |
| `/solutions/cafes` | Cafe & Coffee Shop App — Loglime (32) | Give your cafe a branded app with commission-free ordering and a digital stamp card loyalty. Built for coffee shops. Launch in 14 days. (135) |
| `/solutions/bakeries` | Bakery Online Ordering System — Loglime (39) | Accept pre-orders, reduce morning waste and build a direct customer channel. Commission-free ordering built for bakeries and patisseries. (137) |
| `/solutions/qsr` | Quick Service Restaurant App — Loglime (38) | Commission-free ordering for quick-service restaurants. Fast digital checkout, kitchen updates and customer loyalty — built for high volume. (140) |
| `/solutions/dine-in` | Table Booking & Digital Menu \| Loglime (38) | Online table reservations, QR table menus and a guest loyalty program for dine-in restaurants. No reservation commissions. Live in 14 days. (139) |
| `/solutions/cloud-kitchen` | Cloud Kitchen Ordering System — Loglime (39) | Build a direct ordering channel for your cloud or ghost kitchen. Commission-free delivery and pickup orders. Your brand, your customer data. (140) |
| `/solutions/franchise` | Multi-Location Restaurant App — Loglime (39) | Centralized menu management, location-based ordering and brand-consistent apps across all franchise and multi-location restaurant groups. (137) |
| `/about` | About Loglime — Built for Restaurants (37) | Learn about Loglime's mission to help restaurants grow with commission-free technology, direct customer relationships and branded apps. (135) |
| `/contact` | Contact Loglime — Talk to Our Team (34) | Get in touch with the Loglime team. We typically reply within one business day. Use our contact form or email hello@loglime.com directly. (137) |
| `/demo` | Book a Demo — See Loglime in Action (35) | Book a free 30-minute walkthrough of Loglime. See commission-free ordering, digital menus and loyalty working live for your restaurant type. (140) |
| `/faq` | FAQ — Loglime Restaurant Platform (33) | Everything you need to know about Loglime restaurant apps, online ordering, pricing, setup timeline and technical requirements. Full FAQ. (137) |
| `/blog` | Restaurant Tech Blog — Loglime (30) | Restaurant technology insights, digital ordering tips and growth strategies for independent restaurant owners. Coming soon from Loglime. (136) |
| `/privacy` | Privacy Policy — Loglime (24) | Learn how Loglime collects, uses and protects your personal data. Our Privacy Policy covers GDPR, CCPA compliance and all data practices. (137) |
| `/terms` | Terms of Service — Loglime (26) | Read Loglime's Terms of Service including subscription terms, acceptable use, payment terms, liability limits and your rights as a user. (136) |
| `/cookies` | Cookie Policy — Loglime (23) | Learn about the cookies Loglime uses on its website and platform. We use only necessary and functional cookies — no advertising trackers. (137) |
| `/refunds` | Refund Policy — Loglime (23) | Loglime's refund policy covers free trials, monthly and annual subscriptions and setup fees. Read the full refund terms before purchasing. (138) |
| `/acceptable-use` | Acceptable Use Policy — Loglime (31) | Loglime's Acceptable Use Policy outlines what you can and cannot do with our platform. Applies to all restaurant operators on our platform. (139) |

## 2.2 Next.js Metadata Implementation

```typescript
// ─── HOMEPAGE — app/(marketing)/page.tsx ───────────────────────
export const metadata: Metadata = {
  title: 'Loglime — Commission-Free Restaurant Apps',
  description: 'Launch a branded restaurant app with commission-free ordering, digital menus, table booking and loyalty. Live in 14 days. No credit card.',
  alternates: { canonical: 'https://loglime.com' },
  openGraph: {
    title: 'Loglime — Commission-Free Restaurant Apps',
    description: 'Launch a branded restaurant app with commission-free ordering, digital menus, table booking and loyalty. Live in 14 days. No credit card.',
    url: 'https://loglime.com',
    type: 'website',
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: 'Loglime — Restaurant App Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loglime — Commission-Free Restaurant Apps',
    description: 'Launch a branded restaurant app with commission-free ordering, digital menus, table booking and loyalty. Live in 14 days. No credit card.',
    images: ['/og/home.png'],
  },
}

// ─── GLOBAL LAYOUT — app/layout.tsx ────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://loglime.com'),
  applicationName: 'Loglime',
  authors: [{ name: 'Loglime Team', url: 'https://loglime.com/about' }],
  generator: 'Next.js',
  keywords: [
    'restaurant app', 'commission-free ordering', 'digital menu restaurant',
    'restaurant online ordering', 'table booking restaurant', 'restaurant loyalty program',
    'QR menu', 'restaurant technology', 'branded restaurant app'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  verification: {
    google: '[GOOGLE_SEARCH_CONSOLE_TOKEN]',
  },
}

// ─── CRM + PORTAL LAYOUT — app/(crm)/layout.tsx ────────────────
// and app/(portal)/layout.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false }, // Never index internal app
}
```

---

# PART 3 — HEADING STRUCTURE (All Pages)

> Codex: Implement these H1/H2/H3 tags exactly. One H1 per page. H2s are section titles.
> H3s are subsection titles within H2 sections. Never skip heading levels.

---

## 3.1 Homepage (`/`)

```
H1: More Orders. Less Chaos.

H2: Your best customers are ordering through someone else's app.
  (no H3s — body paragraph only)

H2: Everything your restaurant needs. Nothing you don't.
  H3: Commission-Free, Always
  H3: Fully Branded to Your Restaurant
  H3: Live in 7–14 Business Days
  H3: Own Your Customer Data

H2: Modern app packages built for restaurant growth.
  H3: Online Ordering
  H3: Digital Menu
  H3: Table Booking
  H3: Loyalty Program
  H3: QR Menu
  H3: Restaurant App

H2: Restaurants that made the switch.
  (testimonials — no H3s)

H2: One platform. Every kind of restaurant.
  H3: Cafes & Coffee Shops
  H3: Bakeries & Patisseries
  H3: Quick-Service Restaurants
  H3: Dine-In Restaurants
  H3: Cloud & Ghost Kitchens
  H3: Franchise & Multi-Location

H2: From conversation to customers ordering in three simple steps.
  H3: 01 — Tell us about your restaurant
  H3: 02 — We build and configure everything
  H3: 03 — You go live. Your customers order.

H2: Why restaurant owners choose Loglime.
  (comparison table — no H3s)

H2: Common questions.
  H3: Do I need technical experience to use Loglime?
  H3: How long does it take to go live?
  H3: Are there really no commissions?
  H3: Can I use Loglime alongside my existing POS?

H2: Start building your restaurant's direct ordering channel today.
```

---

## 3.2 Pricing (`/pricing`)

```
H1: Simple pricing that grows with your restaurant.

H2: Starter
  H3: What's included
    (bullet list — no H3s within)

H2: Growth
  H3: Everything in Starter, plus

H2: Scale
  H3: Everything in Growth, plus

H2: Available add-ons

H2: Frequently asked pricing questions.
  H3: What counts as an order in my plan limit?
  H3: Do you charge a percentage of my sales?
  H3: What happens if I exceed my monthly order limit?
  H3: Can I switch plans at any time?
  H3: Do you offer annual billing?
  H3: Is there a setup fee?
  H3: What's your refund policy?
  H3: What payment methods do you accept?
```

---

## 3.3 Platform (`/platform`)

```
H1: The Loglime Platform. Everything connected. Everything simple.

H2: Your Orders, Your Dashboard
H2: Real-Time Menu Management
H2: Customer Intelligence
H2: Push Notifications That Actually Get Read
H2: Analytics That Make Sense
H2: Ready to run your restaurant smarter?
```

---

## 3.4 Products Overview (`/products`)

```
H1: Every tool your restaurant needs to own its customer experience.

H2: Commission-Free Online Ordering
  H3: How it works
  H3: Key features

H2: Digital Menu
  H3: Key features

H2: Table Booking & Reservations
  H3: Key features

H2: Customer Loyalty Program
  H3: Key features

H2: QR Code Menu
  H3: Key features

H2: Your Own Restaurant App on iOS & Android
  H3: Key features

H2: Not sure which products you need?
```

---

## 3.5 Product — Online Ordering (`/products/online-ordering`)

```
H1: Commission-Free Online Ordering for Restaurants

H2: Stop paying commission on every order you earn.
H2: How Loglime online ordering works.
  H3: Step 1: Your menu is live
  H3: Step 2: Customers order directly
  H3: Step 3: Revenue lands in your account
H2: Every feature you need to take direct orders.
H2: What makes Loglime different from delivery platforms?
H2: Start accepting commission-free orders today.
```

---

## 3.6 Product — Digital Menu (`/products/digital-menu`)

```
H1: Digital Menu for Restaurants — Always Up to Date

H2: The problem with printed menus.
H2: Update your menu in seconds, from anywhere.
H2: Digital menu features built for restaurant operators.
H2: Where your digital menu appears.
  H3: On your website
  H3: Inside your branded app
  H3: Via QR code at every table
H2: Launch your digital menu in 14 days.
```

---

## 3.7 Product — Table Booking (`/products/table-booking`)

```
H1: Online Table Booking System for Restaurants

H2: Every no-show costs you money. Here's how to reduce them.
H2: 24/7 online reservations — without the phone calls.
H2: Table booking features.
H2: How automated reminders reduce no-shows.
H2: Integrate with your existing website in days.
```

---

## 3.8 Product — Loyalty (`/products/loyalty`)

```
H1: Restaurant Loyalty Program That Brings Customers Back

H2: The economics of customer retention.
H2: A loyalty program that lives inside your brand.
H2: Choose your loyalty model.
  H3: Points-based loyalty
  H3: Stamp card loyalty
H2: Loyalty program features.
H2: How restaurants use Loglime loyalty to grow repeat revenue.
```

---

## 3.9 Product — QR Menu (`/products/qr-menu`)

```
H1: QR Code Menu for Restaurants — No App Download Required

H2: A QR menu that's always accurate.
H2: Where to place your QR codes.
  H3: Table QR codes
  H3: Counter and window QR codes
  H3: Takeaway packaging
  H3: Social media and Google Business
H2: QR menu features.
H2: Branded QR codes that represent your restaurant.
```

---

## 3.10 Product — Restaurant App (`/products/restaurant-app`)

```
H1: Your Own Branded Restaurant App on iOS & Android

H2: Your customers download your app. Not someone else's.
H2: What's inside your restaurant app.
  H3: Commission-free ordering
  H3: Customer loyalty
  H3: Digital menu
  H3: Table booking
  H3: Push notifications
H2: How we publish your app to the App Store and Google Play.
  H3: Step 1: Brand setup
  H3: Step 2: App configuration
  H3: Step 3: Submission and review
  H3: Step 4: Live on both stores
H2: What you need to get started.
H2: Your restaurant app. Live in 14 days.
```

---

## 3.11 Solutions Overview (`/solutions`)

```
H1: Restaurant Technology Built for Every Kind of Restaurant

H2: Cafes & Coffee Shops
H2: Bakeries & Patisseries
H2: Quick-Service Restaurants
H2: Dine-In Restaurants
H2: Cloud & Ghost Kitchens
H2: Franchise & Multi-Location

H2: Every solution. Commission-free.
```

---

## 3.12 Solution — Cafes (`/solutions/cafes`)

```
H1: Restaurant App for Cafes and Coffee Shops

H2: The cafe loyalty problem — and how Loglime solves it.
H2: How Loglime works for cafes.
H2: Products built for coffee shop operators.
  H3: Commission-free ordering
  H3: Digital stamp card loyalty
  H3: Pre-order for pickup
  H3: Digital and QR menus
H2: See Loglime in action for your cafe.
```

---

## 3.13 Solution — Bakeries (`/solutions/bakeries`)

```
H1: Online Ordering for Bakeries and Patisseries

H2: The daily challenge of running a bakery in 2025.
H2: How Loglime helps bakeries take control.
H2: Bakery-specific features.
  H3: Advance pre-ordering for pickup
  H3: Sold-out management
  H3: Loyalty and repeat customers
H2: Ready to launch direct ordering for your bakery?
```

---

## 3.14 Solution — QSR (`/solutions/qsr`)

```
H1: Commission-Free Ordering for Quick-Service Restaurants

H2: The commission problem at scale.
H2: Built for speed and volume.
H2: QSR-specific features.
  H3: High-volume ordering
  H3: Kitchen display integration
  H3: Fast checkout flow
  H3: Customer loyalty
H2: Launch your direct ordering channel today.
```

---

## 3.15 Solution — Dine-In (`/solutions/dine-in`)

```
H1: Table Booking and Digital Menus for Dine-In Restaurants

H2: What modern hospitality looks like.
H2: How Loglime transforms the dine-in experience.
H2: Dine-in specific features.
  H3: Online table reservations
  H3: QR menus at every table
  H3: Guest loyalty and VIP recognition
  H3: No-show reduction
H2: Book a demo to see it in your restaurant.
```

---

## 3.16 Solution — Cloud Kitchen (`/solutions/cloud-kitchen`)

```
H1: Direct Online Ordering for Cloud Kitchens and Ghost Kitchens

H2: The cloud kitchen dependency problem.
H2: Build a direct revenue channel for your cloud kitchen.
H2: Cloud kitchen features.
  H3: Branded ordering page
  H3: Multi-brand management
  H3: Commission-free delivery
  H3: Customer data ownership
H2: Start building your direct ordering channel.
```

---

## 3.17 Solution — Franchise (`/solutions/franchise`)

```
H1: Multi-Location Restaurant App for Franchise Groups

H2: The challenge of digital consistency across locations.
H2: Central control. Local flexibility.
H2: Franchise-specific features.
  H3: Central menu management
  H3: Location-based ordering
  H3: Unified loyalty across locations
  H3: Consolidated analytics
H2: Scaling your franchise with Loglime.
```

---

## 3.18 About (`/about`)

```
H1: Built for restaurants that want to own their growth.

H2: Our mission.
H2: What we believe.
  H3: Your customers belong to you.
  H3: Technology should reduce stress, not cause it.
  H3: Commission is a business model that doesn't serve restaurants.
  H3: Speed matters.
H2: Our approach.
H2: Want to learn more?
```

---

## 3.19 Contact (`/contact`)

```
H1: Let's talk about your restaurant.

H2: Send us a message.
H2: Contact information.
```

---

## 3.20 Demo (`/demo`)

```
H1: See Loglime in action.

H2: Book your free 30-minute walkthrough.
H2: What to expect in your demo.
  H3: 30 minutes, video call
  H3: Live walkthrough tailored to your restaurant
  H3: Q&A at the end — no time limit
  H3: No sales pressure
```

---

## 3.21 FAQ (`/faq`)

```
H1: Frequently Asked Questions

H2: Getting Started
  H3: What is Loglime?
  H3: Who is Loglime for?
  H3: How do I get started with Loglime?
  H3: Do I need any technical knowledge to use Loglime?
  H3: How long does it take to go live?

H2: Pricing & Billing
  H3: How much does Loglime cost?
  H3: Are there any commission fees on orders?
  H3: Does the free trial require a credit card?
  H3: What payment methods do you accept?
  H3: Can I cancel my subscription at any time?
  H3: Do you offer refunds?
  H3: Can I switch plans mid-subscription?
  H3: Is there a setup fee?

H2: Products & Features
  H3: What is commission-free ordering?
  H3: How does the digital menu work?
  H3: Does Loglime support pickup and delivery?
  H3: How does table booking work?
  H3: How does the loyalty program work?
  H3: What is a QR menu?
  H3: Does Loglime publish apps to the App Store and Google Play?
  H3: How long does app publishing take?

H2: Setup & Onboarding
  H3: What do I need to get started?
  H3: Does Loglime upload my menu for me?
  H3: Do I need an Apple Developer account?
  H3: Can I use Loglime with my existing website?

H2: Technical
  H3: What technology does Loglime use?
  H3: Is Loglime secure?
  H3: Does Loglime work on mobile devices?
  H3: What happens if Loglime goes down?
  H3: Can I export my customer data?

H2: Support
  H3: What support does Loglime offer?
  H3: Do you offer support during setup?
  H3: Is there a knowledge base or self-help documentation?

H2: Zest AI Assistant
  H3: What is Zest?
  H3: Is Zest available 24/7?
  H3: What can Zest help with?
```

---

## 3.22 Blog (`/blog`) — Phase 2 Placeholder

```
H1: Restaurant Technology Insights — Coming Soon

H2: We're building something useful for restaurant operators.
  (no further headings — just a short paragraph and email capture form)
```

---

## 3.23 Legal Pages (Privacy, Terms, Cookies, Refunds, Acceptable Use)

```
/privacy
  H1: Privacy Policy
  H2: 1. Who We Are
  H2: 2. Information We Collect
    H3: 2.1 Information You Provide Directly
    H3: 2.2 Information Collected Automatically
    H3: 2.3 Information from Third Parties
  H2: 3. How We Use Your Information
  (etc. — match Privacy Policy document sections exactly)

/terms
  H1: Terms of Service
  H2: 1. Definitions
  H2: 2. Account Registration and Eligibility
  (etc.)

/cookies
  H1: Cookie Policy
  H2: 1. What Are Cookies?
  H2: 2. Types of Cookies We Use
  (etc.)

/refunds
  H1: Refund Policy
  H2: 1. Free Trial
  H2: 2. Monthly Subscriptions
  (etc.)

/acceptable-use
  H1: Acceptable Use Policy
  H2: 1. Overview
  H2: 2. Prohibited Activities
  (etc.)
```

---

# PART 4 — INTERNAL LINKING MAP

> Codex: Wire these links into the navigation, footer, CTA sections, and inline body copy.
> Every page must be reachable from at least 2 other pages.

## 4.1 Navigation Links (appear on every marketing page)

```
Header:
  Platform          → /platform
  Products ▾        → /products (overview)
    Online Ordering → /products/online-ordering
    Digital Menu    → /products/digital-menu
    Table Booking   → /products/table-booking
    Loyalty Program → /products/loyalty
    QR Menu         → /products/qr-menu
    Restaurant App  → /products/restaurant-app
  Solutions ▾       → /solutions (overview)
    Cafes           → /solutions/cafes
    Bakeries        → /solutions/bakeries
    QSR             → /solutions/qsr
    Dine-In         → /solutions/dine-in
    Cloud Kitchens  → /solutions/cloud-kitchen
    Franchise       → /solutions/franchise
  Pricing           → /pricing
  Resources ▾
    FAQ             → /faq
    Blog            → /blog
    Help Center     → (external: help.loglime.com)
  Company ▾
    About           → /about
    Contact         → /contact
  Login             → (external: app.loglime.com/login)
  Book Demo         → /demo
  Start Free Trial  → /demo (same target for now)
```

## 4.2 Footer Links (appear on every marketing page)

```
Products column:
  Online Ordering   → /products/online-ordering
  Digital Menu      → /products/digital-menu
  Table Booking     → /products/table-booking
  Loyalty           → /products/loyalty
  QR Menu           → /products/qr-menu
  Restaurant App    → /products/restaurant-app

Solutions column:
  Cafes             → /solutions/cafes
  Bakeries          → /solutions/bakeries
  Quick-Service     → /solutions/qsr
  Dine-In           → /solutions/dine-in
  Cloud Kitchens    → /solutions/cloud-kitchen
  Franchise         → /solutions/franchise

Resources column:
  FAQ               → /faq
  Blog              → /blog
  Help Center       → (external)
  System Status     → (external: status.loglime.com)

Company column:
  About             → /about
  Pricing           → /pricing
  Contact           → /contact
  Demo              → /demo

Legal column:
  Privacy Policy    → /privacy
  Terms of Service  → /terms
  Cookie Policy     → /cookies
  Refund Policy     → /refunds
  Acceptable Use    → /acceptable-use
```

## 4.3 Cross-Page Inline Links

```
Homepage CTA "Start Free Trial" → /demo
Homepage "See all FAQ →"        → /faq
Homepage restaurant type cards  → /solutions/[type]
Homepage product sections       → /products/[product]

Pricing "Book a call →"         → /demo
Pricing "See all FAQ"           → /faq

Each product page:
  "See pricing →"               → /pricing
  "Book a demo →"               → /demo
  "See how it works for [type]" → /solutions/[relevant-type]

Each solution page:
  Product links                 → /products/[relevant-product]
  "See pricing →"               → /pricing
  "Book a demo →"               → /demo

FAQ → /pricing, /demo, /contact (contextual per answer)
About → /demo, /contact, /products
Contact → /demo (for visitors wanting a demo instead)
Demo → /pricing (for visitors who want to see pricing first)
```

## 4.4 Link Priority Matrix

```
Pages that need the MOST inbound internal links (highest SEO priority):
  1. /demo                         ← CTA on every page
  2. /pricing                      ← CTA on every page
  3. /products/online-ordering     ← Most search intent
  4. /products/restaurant-app      ← High purchase intent
  5. /solutions/cloud-kitchen      ← Growing market
  6. /solutions/cafes              ← High volume segment
  7. /faq                          ← Catch-all informational
```

---

# PART 5 — OPEN GRAPH & TWITTER CARD METADATA

## 5.1 OG Image Specifications

Create these static OG images in `/public/og/`:

| File | Size | Design |
|---|---|---|
| `home.png` | 1200×630 | Coral bg, white "More Orders. Less Chaos." headline, Loglime logo |
| `pricing.png` | 1200×630 | White bg, coral accent, pricing plans visual |
| `products.png` | 1200×630 | Product icons grid on white |
| `solutions.png` | 1200×630 | Restaurant type icons |
| `demo.png` | 1200×630 | "Book a Demo" CTA design |
| `default.png` | 1200×630 | Generic Loglime branded fallback |

All OG images: Quicksand font, Coral #FF5A5F, White #FFFFFF, Slate #0F172A.

## 5.2 Complete OG + Twitter Template

```typescript
// Add to each page's metadata export
openGraph: {
  title: '[PAGE_TITLE]',
  description: '[PAGE_DESCRIPTION]',
  url: 'https://loglime.com[PAGE_ROUTE]',
  siteName: 'Loglime',
  type: 'website',
  locale: 'en_US',
  images: [{
    url: '/og/[PAGE_OG_IMAGE].png',
    width: 1200,
    height: 630,
    alt: '[DESCRIPTIVE_ALT]',
  }],
},
twitter: {
  card: 'summary_large_image',
  site: '@loglime',
  creator: '@loglime',
  title: '[PAGE_TITLE]',
  description: '[PAGE_DESCRIPTION]',
  images: ['/og/[PAGE_OG_IMAGE].png'],
},
```

---

# PART 6 — STRUCTURED DATA / SCHEMA MARKUP

> Codex: Add these as JSON-LD `<script>` tags inside each page's `<head>` using Next.js Script component or metadata. Phase 2 for blog-specific schemas.

## 6.1 Homepage — Organization + SoftwareApplication

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://loglime.com/#organization",
      "name": "Loglime",
      "url": "https://loglime.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://loglime.com/logo.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@loglime.com",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.linkedin.com/company/loglime",
        "https://www.instagram.com/loglime"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://loglime.com/#website",
      "url": "https://loglime.com",
      "name": "Loglime",
      "publisher": { "@id": "https://loglime.com/#organization" }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Loglime",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "79",
        "highPrice": "249",
        "priceCurrency": "USD",
        "offerCount": "3"
      },
      "description": "Commission-free restaurant app platform with online ordering, digital menus, table booking and loyalty programs.",
      "url": "https://loglime.com"
    }
  ]
}
```

## 6.2 Pricing Page — Product with Offers

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Loglime Restaurant App Platform",
  "description": "Commission-free restaurant app platform with online ordering, digital menus, table booking and loyalty.",
  "brand": { "@type": "Brand", "name": "Loglime" },
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter",
      "price": "79",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "79",
        "priceCurrency": "USD",
        "billingDuration": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
      },
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Growth",
      "price": "149",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "149",
        "priceCurrency": "USD",
        "billingDuration": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
      },
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Scale",
      "price": "249",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "249",
        "priceCurrency": "USD",
        "billingDuration": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
      },
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

## 6.3 FAQ Page — FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Loglime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Loglime is a restaurant technology platform that provides commission-free online ordering, digital menus, table booking, loyalty programs, and branded restaurant apps for independent restaurants, cafes, bakeries, and franchise groups."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any commission fees on orders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Loglime charges zero commission on orders. You pay a flat monthly subscription fee. Every order your customers place goes to you in full, minus standard Stripe payment processing fees (2.9% + $0.30 per transaction)."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to go live with Loglime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most restaurants are live within 7–14 business days of completing onboarding. This includes app store publishing, menu configuration, branding setup, payment gateway connection, and staff training."
      }
    },
    {
      "@type": "Question",
      "name": "Does Loglime publish apps to the App Store and Google Play?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. On Growth and Scale plans, Loglime publishes a branded restaurant app under your restaurant's name on both the Apple App Store and Google Play Store. The app features your name, your logo, and your brand colors."
      }
    },
    {
      "@type": "Question",
      "name": "How much does Loglime cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Loglime offers three plans: Starter at $79/month, Growth at $149/month, and Scale at $249/month. Annual billing is available with a 20% discount. Every plan includes a 14-day free trial with no credit card required."
      }
    }
  ]
}
```

## 6.4 Demo / Contact Page — LocalBusiness + Event

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Loglime Restaurant App Platform",
  "provider": {
    "@type": "Organization",
    "name": "Loglime",
    "url": "https://loglime.com"
  },
  "serviceType": "Restaurant Technology Platform",
  "description": "Commission-free restaurant apps with online ordering, digital menus, table booking and loyalty programs.",
  "offers": {
    "@type": "Offer",
    "name": "Free Demo",
    "description": "Book a free 30-minute walkthrough of the Loglime platform.",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

## 6.5 BreadcrumbList (All Non-Homepage Pages)

```json
// Example for /products/online-ordering
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://loglime.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://loglime.com/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Online Ordering",
      "item": "https://loglime.com/products/online-ordering"
    }
  ]
}
```

---

# PART 7 — ROBOTS.TXT

> Codex: Create this file at `/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /crm/
Disallow: /portal/
Disallow: /_next/static/
Disallow: /accept-invite
Disallow: /reset-password
Disallow: /forgot-password

# Block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

Sitemap: https://loglime.com/sitemap.xml
```

---

# PART 8 — SITEMAP.XML STRUCTURE

> Codex: Generate this dynamically using Next.js App Router `sitemap.ts` at `/app/sitemap.ts`

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://loglime.com'
  const now = new Date()

  return [
    // ── Tier 1: Highest Priority ───────────────────
    { url: baseUrl,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/demo`,                          lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/pricing`,                       lastModified: now, changeFrequency: 'weekly',  priority: 0.90 },

    // ── Tier 2: Product Pages ──────────────────────
    { url: `${baseUrl}/products`,                      lastModified: now, changeFrequency: 'weekly',  priority: 0.88 },
    { url: `${baseUrl}/products/online-ordering`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/products/restaurant-app`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/products/digital-menu`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${baseUrl}/products/table-booking`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${baseUrl}/products/loyalty`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${baseUrl}/products/qr-menu`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.80 },

    // ── Tier 3: Solution Pages ─────────────────────
    { url: `${baseUrl}/solutions`,                     lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/solutions/cafes`,               lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/solutions/qsr`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/solutions/cloud-kitchen`,       lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/solutions/franchise`,           lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/solutions/dine-in`,             lastModified: now, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${baseUrl}/solutions/bakeries`,            lastModified: now, changeFrequency: 'monthly', priority: 0.78 },

    // ── Tier 4: Supporting Pages ───────────────────
    { url: `${baseUrl}/platform`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/faq`,                           lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/about`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/contact`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/blog`,                          lastModified: now, changeFrequency: 'weekly',  priority: 0.60 },

    // ── Tier 5: Legal Pages ────────────────────────
    { url: `${baseUrl}/privacy`,                       lastModified: now, changeFrequency: 'yearly',  priority: 0.30 },
    { url: `${baseUrl}/terms`,                         lastModified: now, changeFrequency: 'yearly',  priority: 0.30 },
    { url: `${baseUrl}/cookies`,                       lastModified: now, changeFrequency: 'yearly',  priority: 0.25 },
    { url: `${baseUrl}/refunds`,                       lastModified: now, changeFrequency: 'yearly',  priority: 0.25 },
    { url: `${baseUrl}/acceptable-use`,                lastModified: now, changeFrequency: 'yearly',  priority: 0.20 },
  ]
}
```

---

# PART 9 — IMAGE SEO GUIDELINES

> Codex: Follow these rules for every image on the marketing site.

## 9.1 File Naming Convention

Format: `loglime-[descriptor]-[context].[ext]`

```
✓  loglime-online-ordering-dashboard.webp
✓  loglime-restaurant-app-ios.webp
✓  loglime-digital-menu-cafe.webp
✓  loglime-table-booking-dine-in.webp
✓  loglime-qr-menu-restaurant.webp
✗  image1.png  (never)
✗  IMG_4847.jpg  (never)
✗  screenshot.png  (never)
```

## 9.2 Required Alt Text by Image Type

```
Hero / product screenshots:
  "Loglime [product name] dashboard — [brief description of what's shown]"
  Example: "Loglime online ordering dashboard — commission-free restaurant orders view"

Feature illustrations:
  "[Describe what the image shows functionally]"
  Example: "Restaurant QR code menu being scanned at a cafe table"

Restaurant type images:
  "[Restaurant type] using Loglime [product] for [outcome]"
  Example: "Coffee shop owner using Loglime app to manage morning orders"

Testimonial photos:
  "[Person's name], [role] at [Restaurant name]"
  Example: "Carlos M., owner of The Ember Grill"

Icons / decorative:
  alt="" (empty string — decorative images get empty alt, never null)
```

## 9.3 Image Formats and Sizing

```
Format priority: WebP → AVIF → JPEG (use next/image — handles this automatically)

Sizes per use:
  OG Images:          1200×630px
  Hero visual:        1600×900px (full bleed)
  Product screenshots: 1280×800px
  Feature cards:      800×600px
  Testimonial photos: 160×160px (circular crop)
  Solution page hero: 1200×675px
  Blog thumbnails:    800×450px (Phase 2)

Always use Next.js <Image> component:
  - width + height props always defined (prevents CLS)
  - priority={true} on hero/above-fold images only
  - loading="lazy" for below-fold (Next.js default)
  - sizes prop for responsive images
```

---

# PART 10 — CORE WEB VITALS & PERFORMANCE (Codex Notes)

> These affect SEO rankings. Implement from the start — do not treat as Phase 2.

## 10.1 LCP (Largest Contentful Paint) — Target < 2.5s

```
- Add priority={true} to the hero image/video thumbnail on homepage
- Preload Quicksand font in <head>:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="">
- Use font-display: swap in @font-face to prevent FOIT
- Serve OG images from /public — Vercel Edge caches them
```

## 10.2 CLS (Cumulative Layout Shift) — Target < 0.1

```
- Every <Image> must have width + height defined — no exceptions
- Reserve space for async-loaded content with min-height
- Avoid injecting content above the fold after page load
- Font loading: preload Quicksand 600 weight (most used) first
- Cookie banner: render in fixed position, never above content
```

## 10.3 INP (Interaction to Next Paint) — Target < 200ms

```
- Avoid heavy client-side JS on marketing pages — keep them mostly static RSC
- Dropdown menus: use CSS :hover transitions, not JS state where possible
- Demo form submit: show loading state immediately on click
- Zest widget: lazy load — do not include in initial bundle
```

## 10.4 Performance Rules for Marketing Pages

```
- Marketing pages = React Server Components by default (no 'use client' unless needed)
- 'use client' only for: mobile menu toggle, form inputs, Zest widget
- No analytics scripts that block rendering (load async)
- Hero video: load thumbnail image first, video only on play click
- Framer Motion: import with dynamic() + ssr: false for animation-heavy sections
```

---

# PART 11 — PAGE PRIORITY MATRIX FOR CODEX

> Build marketing pages in this exact order. Don't start the next until the current is complete.

```
Priority 1 (Launch Blockers):
  ✦ / (Homepage)             — first impression, highest traffic
  ✦ /demo                    — primary conversion page
  ✦ /pricing                 — critical for purchase decisions
  ✦ /login                   — needed for any user
  ✦ /privacy + /terms        — legally required before launch

Priority 2 (Core SEO Pages):
  ✦ /products                — top-level product entry
  ✦ /products/online-ordering — highest search volume
  ✦ /products/restaurant-app — highest purchase intent
  ✦ /solutions               — solution entry
  ✦ /solutions/cafes         — highest volume segment
  ✦ /solutions/cloud-kitchen — fastest-growing segment

Priority 3 (Supporting Pages):
  ✦ /products/* (remaining 4 product pages)
  ✦ /solutions/* (remaining 4 solution pages)
  ✦ /platform
  ✦ /faq
  ✦ /about
  ✦ /contact

Priority 4 (Complete Before Launch):
  ✦ /cookies + /refunds + /acceptable-use
  ✦ /blog (placeholder only)
  ✦ sitemap.xml
  ✦ robots.txt

Do NOT build:
  ✗ Actual blog posts
  ✗ Advanced schema automation
  ✗ Sitemap submission (manual step)
  ✗ Google Search Console setup (manual step)
```

---

# PART 12 — NEXT.JS GLOBAL SEO SETUP

> Codex: Implement this in `app/layout.tsx` before building any pages.

```typescript
// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF5A5F',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://loglime.com'),
  applicationName: 'Loglime',
  authors: [{ name: 'Loglime', url: 'https://loglime.com' }],
  keywords: [
    'restaurant app', 'commission free restaurant ordering',
    'digital menu restaurant', 'restaurant online ordering system',
    'table booking restaurant', 'restaurant loyalty program',
    'QR code menu', 'branded restaurant app', 'ghost kitchen ordering',
    'restaurant technology platform'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Loglime',
    images: [{
      url: '/og/default.png',
      width: 1200,
      height: 630,
      alt: 'Loglime — Commission-Free Restaurant Apps',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@loglime',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: '[GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN]',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className={quicksand.className}>
        {children}
      </body>
    </html>
  )
}
```

---

# PART 13 — /PUBLIC FOLDER REQUIRED FILES

> Codex: These files must exist before deployment. Create placeholders if assets not ready.

```
/public/
├── favicon.ico                  (32×32, coral #FF5A5F)
├── icon.svg                     (SVG favicon)
├── apple-touch-icon.png         (180×180)
├── site.webmanifest             (PWA manifest)
├── robots.txt                   (from Part 7)
├── og/
│   ├── home.png                 (1200×630)
│   ├── pricing.png              (1200×630)
│   ├── products.png             (1200×630)
│   ├── solutions.png            (1200×630)
│   ├── demo.png                 (1200×630)
│   └── default.png              (1200×630)
└── images/
    └── [product/feature images as needed]
```

## site.webmanifest

```json
{
  "name": "Loglime",
  "short_name": "Loglime",
  "description": "Commission-free restaurant apps and online ordering platform.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#FF5A5F",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```