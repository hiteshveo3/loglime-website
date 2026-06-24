# LOGLIME — MEGA MENU + ICONS + MINIMALISM GUIDE
## Version 1.0 | Design System Reference | Codex Implementation Document

> **Codex:** This document defines every visual and interaction decision for navigation, icons, and design philosophy. Read before building any component. These rules override personal defaults.

---

# PART 1 — MEGA MENU SYSTEM

## 1.1 Navigation Architecture Overview

```
HEADER STRUCTURE:
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]   [Platform] [Products▾] [Solutions▾] [Pricing]        │
│           [Resources▾] [Company▾]    [Login] [Demo] [Trial]    │
└─────────────────────────────────────────────────────────────────┘
         ↕ sticky on scroll, shadow appears after 20px scroll

DROPDOWN TYPES:
  Platform    → Simple link (no dropdown)
  Products    → MEGA MENU (wide, 2-panel)
  Solutions   → MEGA MENU (wide, 2-panel)
  Pricing     → Simple link (no dropdown)
  Resources   → Small dropdown (single column, 5 items)
  Company     → Small dropdown (single column, 3 items)
```

## 1.2 Header Scroll Behavior

```
State 1 — At top of page (scrollY === 0):
  bg: white
  border-bottom: none
  shadow: none
  height: 80px

State 2 — Scrolled (scrollY > 20px):
  bg: white
  border-bottom: 1px solid #F1F5F9
  shadow: 0 1px 3px rgba(15,23,42,0.06)
  height: 72px (slightly shrinks)
  transition: all 200ms ease

State 3 — Scrolling UP (user scrolling toward top):
  Header reappears with slide-down animation (translateY from -100% to 0)
  Used only on pages with very long scroll (blog posts, product pages)
  NOT used on homepage (header always visible)

Implementation:
  useScrollPosition hook tracks scrollY + scroll direction
  className toggled between states via CSS transition
  NO JavaScript style manipulation — only class toggling
```

## 1.3 Products — MEGA MENU

This is the most important dropdown. Restaurant owners scan this first.

### Desktop Layout (≥1280px)

```
MEGA MENU PANEL — 860px wide, positioned below header
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  PRODUCTS                              MOST POPULAR                      │
│  ─────────────────────────────         ────────────────────────────────  │
│                                                                          │
│  [🛒] Online Ordering                  ┌──────────────────────────────┐  │
│       Take commission-free orders      │                              │  │
│       for pickup and delivery    ·──→  │  [Product visual / gradient] │  │
│                                        │                              │  │
│  [📺] Digital Menu                     │  ⚡ Online Ordering           │  │
│       Always updated, always           │                              │  │
│       beautiful on any screen          │  Keep 100% of every order.   │  │
│                                        │  No commissions, ever.       │  │
│  [📅] Table Booking                    │                              │  │
│       24/7 reservations with           │  [Start free trial →]        │  │
│       automated reminders              │                              │  │
│                                        └──────────────────────────────┘  │
│  [🎁] Loyalty Program                                                     │
│       Points, stamps, rewards          See all products →                │
│       in your branded app                                                │
│                                                                          │
│  [🔳] QR Menu                                                            │
│       No app needed. Scan.                                               │
│       See. Order.                                                        │
│                                                                          │
│  [📱] Restaurant App                                                      │
│       Your name on the                                                   │
│       App Store.                                                         │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

COLUMN BREAKDOWN:
  Left panel (560px):   6 product rows (icon + name + 1-line description)
  Right panel (280px):  Featured product card + "See all" link
  Divider:              1px solid #F1F5F9 between columns

GRID:
  NOT a grid — vertical list on left, single card on right
  Left items are full-width rows, not 2×3 grid
  This gives space for descriptions (which a grid cannot)
```

### Product Row Component

```
Each product row in the left panel:

┌──────────────────────────────────────────────────────────┐
│  [Icon 40px]   Online Ordering                           │
│  coral bg      commission-free orders for pickup         │ ← hover state
│  rounded-xl    and delivery                              │
└──────────────────────────────────────────────────────────┘

DEFAULT STATE:
  icon bg: #F8FAFC (surface-alt, very light)
  icon color: slate-600 (#475569)
  name: slate-900, 15px, font-600
  description: slate-500, 13px, font-500
  row bg: transparent
  padding: p-3 rounded-xl

HOVER STATE:
  row bg: #FFF0F0 (coral-light)
  icon bg: coral (#FF5A5F)
  icon color: white
  name: coral (#FF5A5F)
  description: slate-600
  transition: all 150ms ease

ACTIVE/CURRENT PAGE:
  Same as hover but persistent (no transition)
```

### Tailwind + JSX (Products Mega Menu)

```tsx
// components/marketing/MegaMenuProducts.tsx
const products = [
  {
    icon: 'hgi-shopping-cart-01',
    name: 'Online Ordering',
    desc: 'Commission-free orders for pickup and delivery',
    href: '/products/online-ordering',
  },
  {
    icon: 'hgi-menu-restaurant-01',
    name: 'Digital Menu',
    desc: 'Always updated, always beautiful on any screen',
    href: '/products/digital-menu',
  },
  {
    icon: 'hgi-calendar-check-01',
    name: 'Table Booking',
    desc: '24/7 reservations with automated reminders',
    href: '/products/table-booking',
  },
  {
    icon: 'hgi-gift-01',
    name: 'Loyalty Program',
    desc: 'Points, stamps, rewards in your branded app',
    href: '/products/loyalty',
  },
  {
    icon: 'hgi-qr-code',
    name: 'QR Menu',
    desc: 'No app needed. Scan. See. Order.',
    href: '/products/qr-menu',
  },
  {
    icon: 'hgi-smart-phone-01',
    name: 'Restaurant App',
    desc: 'Your name on the App Store and Google Play',
    href: '/products/restaurant-app',
  },
]

// Mega menu panel (shown on hover of "Products" nav item):
<div className="
  absolute top-full left-1/2 -translate-x-1/2
  mt-2 w-[860px]
  bg-white rounded-2xl
  border border-slate-100
  shadow-[0_20px_60px_-10px_rgba(15,23,42,0.12)]
  p-6
  grid grid-cols-[1fr_280px] gap-6
  origin-top
  animate-in fade-in zoom-in-95 duration-150
">
  {/* Left: Product list */}
  <div className="flex flex-col gap-1">
    <p className="text-[11px] font-600 text-slate-400 uppercase tracking-wider mb-2 px-3">
      Products
    </p>
    {products.map(p => (
      <a href={p.href} key={p.name}
        className="flex items-start gap-3 p-3 rounded-xl
                   hover:bg-coral-light group transition-all duration-150"
      >
        <span className="
          w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
          bg-surface-alt group-hover:bg-coral transition-colors duration-150
        ">
          <i className={`hgi-stroke ${p.icon} text-xl
                        text-slate-600 group-hover:text-white transition-colors`} />
        </span>
        <span>
          <span className="block text-[15px] font-600 text-slate-900
                           group-hover:text-coral transition-colors">
            {p.name}
          </span>
          <span className="block text-[13px] font-500 text-slate-500 mt-0.5">
            {p.desc}
          </span>
        </span>
      </a>
    ))}
  </div>

  {/* Divider */}
  <div className="border-l border-slate-100 -ml-3 pl-3">
    {/* Right: Featured card */}
    <p className="text-[11px] font-600 text-slate-400 uppercase tracking-wider mb-3">
      Most Popular
    </p>
    <div className="bg-gradient-to-br from-coral-light to-white
                    rounded-2xl p-5 border border-coral/20">
      <div className="w-8 h-8 rounded-lg bg-coral flex items-center
                      justify-center mb-3">
        <i className="hgi-stroke hgi-shopping-cart-01 text-base text-white" />
      </div>
      <p className="text-[15px] font-700 text-slate-900 mb-1">
        Online Ordering
      </p>
      <p className="text-[13px] font-500 text-slate-600 mb-4 leading-relaxed">
        Keep 100% of every order.<br/>No commissions, ever.
      </p>
      <a href="/demo"
         className="inline-flex items-center gap-1.5 text-[13px] font-700
                    text-coral hover:text-coral-hover transition-colors">
        Start free trial
        <i className="hgi-stroke hgi-arrow-right-01 text-sm" />
      </a>
    </div>
    {/* See all link */}
    <a href="/products"
       className="flex items-center gap-1 mt-4 text-[13px] font-600
                  text-slate-500 hover:text-coral transition-colors">
      See all products
      <i className="hgi-stroke hgi-arrow-right-01 text-xs" />
    </a>
  </div>
</div>
```

---

## 1.4 Solutions — MEGA MENU

### Desktop Layout

```
MEGA MENU PANEL — 860px wide
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  BUILT FOR                               BY THE NUMBERS                  │
│  ─────────────────────────────           ────────────────────────────── │
│                                                                          │
│  [☕] Cafes & Coffee Shops               ┌──────────────────────────────┐│
│       Direct ordering and loyalty for    │                              ││
│       your morning regulars              │       120+                   ││
│                                          │  restaurants launched        ││
│  [🥐] Bakeries & Patisseries             │                              ││
│       Pre-orders, sold-out flags,        │       $0                     ││
│       daily demand prediction            │  commissions charged         ││
│                                          │                              ││
│  [🍔] Quick-Service Restaurants          │       38%                    ││
│       Fast checkout, high volume,        │  avg. increase in            ││
│       commission-free delivery           │  repeat orders               ││
│                                          │                              ││
│  [🍽️] Dine-In Restaurants               │  [Book a demo →]             ││
│       Table booking, QR menus,           └──────────────────────────────┘│
│       guest loyalty recognition                                          │
│                                          See all solutions →             │
│  [☁️] Cloud & Ghost Kitchens                                             │
│       Build direct ordering channels                                     │
│       away from platform dependency                                      │
│                                                                          │
│  [🏢] Franchise & Multi-Location                                         │
│       Central control, consistent                                        │
│       brand across every site                                            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

Right panel shows a stats card — not a product promo — because Solutions
visitors are researching fit, not ready to buy. Stats build credibility faster.

---

## 1.5 Resources — Simple Dropdown

```
DROPDOWN — 200px wide, single column
┌──────────────────┐
│                  │
│  Blog            │
│  Case Studies    │
│  Guides          │
│  Help Center     │
│  FAQ             │
│                  │
└──────────────────┘
```

Each item: text only (no icons — these are utility links, not features).
Simple `p-2.5 rounded-xl hover:bg-surface-alt hover:text-coral` treatment.
Width: 200px. No description text.

## 1.6 Company — Simple Dropdown

```
DROPDOWN — 180px wide
┌──────────────────┐
│                  │
│  About           │
│  Contact         │
│  Partners        │
│                  │
└──────────────────┘
```

Same simple style as Resources.

## 1.7 Desktop Interaction Model

```
TRIGGER:      Hover on nav item (NOT click)
OPEN DELAY:   100ms (prevents flicker on pass-through hover)
CLOSE DELAY:  150ms (prevents accidental close while moving to menu)
ANIMATION:    fade-in + zoom-in-95 (scale from 95% to 100%) — 150ms
CLOSE ANIM:   fade-out + zoom-out-95 — 100ms

SAFE TRIANGLE:
  Problem: Moving mouse from nav item to dropdown panel diagonally
           crosses outside both elements momentarily → triggers close.
  Solution: Create an invisible triangle zone using CSS pointer-events
            or track mouse position with a small buffer.
  Simple alternative: 150ms close delay is usually sufficient.

ACTIVE NAV ITEM (while dropdown open):
  Text color: coral (#FF5A5F)
  Arrow icon: rotated 180deg (points up)
  No underline or border — color change is sufficient

KEYBOARD:
  Tab: moves focus to next nav item
  Enter/Space: opens dropdown
  Arrow keys: moves focus through dropdown items
  Escape: closes dropdown, returns focus to trigger
  Tab (inside dropdown): cycles through items, last item Tabs to next nav
```

## 1.8 Mobile Menu — Full Screen

Hamburger icon (hgi-menu-01) → tapping opens FULL SCREEN overlay from top.

```
MOBILE MENU — Full screen overlay, slides down from top

┌─────────────────────────────────────────────────────┐
│  [Logo]                                    [✕ Close]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  Products                            [›]            │ ← Accordion
│  ─────────────────────────────────────              │   (collapsed)
│                                                     │
│  Solutions                           [›]            │ ← Accordion
│  ─────────────────────────────────────              │
│                                                     │
│  Platform                                           │ ← Direct link
│  Pricing                                            │
│  Resources                           [›]            │
│  Company                             [›]            │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Login →]                                          │
│                                                     │
│  [Book Demo]           [Start Free Trial]           │
│                                                     │
└─────────────────────────────────────────────────────┘

ACCORDION OPEN (Products expanded):
┌─────────────────────────────────────────────────────┐
│  Products                            [∨]            │ ← Now down arrow
│  ┌─────────────────────────────────────────────┐   │
│  │ [Icon] Online Ordering              →       │   │
│  │ [Icon] Digital Menu                 →       │   │
│  │ [Icon] Table Booking                →       │   │
│  │ [Icon] Loyalty Program              →       │   │
│  │ [Icon] QR Menu                      →       │   │
│  │ [Icon] Restaurant App               →       │   │
│  │                                             │   │
│  │ See all products →                          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Solutions                           [›]            │
└─────────────────────────────────────────────────────┘
```

Mobile menu item rows (inside accordion):
```
Each row: icon (24px, coral bg) + name (15px, font-600) + hgi-arrow-right-01
Padding: py-3 px-4
Border-bottom: 1px solid #F1F5F9 between items (except last)
No description text on mobile (space constraint)
```

Mobile menu animation:
```
Open:  translateY(-100%) → translateY(0), opacity 0→1, duration 250ms ease-out
Close: translateY(0) → translateY(-100%), opacity 1→0, duration 200ms ease-in
Background lock: overflow: hidden on body while menu is open
```

## 1.9 Animation Spec (Complete)

```
Mega menu open:         fade-in + scale 0.95→1, 150ms ease-out
Mega menu close:        fade-out + scale 1→0.95, 100ms ease-in
Mobile menu open:       slide down from top, 250ms ease-out
Mobile accordion:       height 0→auto, 200ms ease-out (use CSS grid trick)
Product row hover:      bg + icon bg + text color, 150ms ease
Arrow rotation:         0deg→180deg, 200ms ease
Header shadow appear:   opacity 0→1, 200ms ease
Sticky header shrink:   height 80px→72px, 200ms ease
```

## 1.10 Accessibility (ARIA)

```tsx
// Nav item with mega menu:
<button
  aria-haspopup="true"
  aria-expanded={isOpen}
  aria-controls="products-menu"
  onKeyDown={handleKeyDown}
>
  Products
</button>

// Mega menu panel:
<div
  id="products-menu"
  role="region"
  aria-label="Products menu"
  hidden={!isOpen}
>
  {/* items */}
</div>

// Each item in dropdown:
<a role="menuitem" tabIndex={isOpen ? 0 : -1}>

// Close on Escape:
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu()
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])
```

Focus trap inside mobile menu when open.
Focus returns to trigger element when menu closes.

---

# PART 2 — HUGEICONS SYSTEM

## 2.1 Why Hugeicons

Hugeicons has 3,800+ icons. Three properties make it right for Loglime:
1. **Stroke style is thin and modern** — feels premium, not bulky
2. **Consistent 24px grid** — every icon aligns at any size
3. **Restaurant-relevant icons** — food, booking, loyalty, app icons all exist

Do not mix Hugeicons with Heroicons, Lucide, Phosphor, or any other library.
One icon library. One visual language. No exceptions.

## 2.2 Style: STROKE ONLY

Hugeicons has 5 styles: stroke, solid, duotone, bulk, twotone.

**Use ONLY: `hgi-stroke`**

```
✓  <i class="hgi-stroke hgi-home-01"></i>
✗  <i class="hgi-solid hgi-home-01"></i>    (too heavy)
✗  <i class="hgi-duotone hgi-home-01"></i>  (too decorative)
✗  <i class="hgi-bulk hgi-home-01"></i>     (too heavy)
✗  <i class="hgi-twotone hgi-home-01"></i>  (inconsistent)
```

Why stroke only:
- Minimal visual weight — fits the clean, white aesthetic
- Works on white, coral, and dark backgrounds
- Scales cleanly at all sizes
- Feels modern and SaaS-like (Linear, Notion, Stripe all use stroke)
- Solid icons feel aggressive in a mostly-white UI

## 2.3 Icon Size System

```
SIZE TOKENS (translate directly to Tailwind classes):

xs    — 14px — text-sm   — Labels, badges, compact list items
sm    — 16px — text-base — Breadcrumbs, secondary actions, table cells
md    — 20px — text-xl   — DEFAULT — navigation, form fields, buttons, cards
lg    — 24px — text-2xl  — Section headers, feature cards, stat blocks
xl    — 32px — text-3xl  — Hero moments, empty states, onboarding
2xl   — 40px — text-4xl  — Icon-as-illustration (rare, max 2 per page)
3xl   — 48px — text-5xl  — Only in empty states with no other elements

RULE: Never go above 48px. At larger sizes, icons become illustrations.
      Use custom SVG illustrations for anything bigger.

CONTEXT → SIZE MAPPING:
  Nav dropdown icons:        md (20px)
  Button with label:         sm (16px)
  Icon-only button:          md (20px) with min 40px tap target
  Card feature icons:        lg (24px) in a 40px container
  Sidebar navigation:        md (20px)
  Form field icons:          sm (16px)
  Table action icons:        sm (16px)
  Status badges:             xs (14px)
  Section feature icons:     xl (32px) in a 56px container
  Empty state illustration:  2xl (40px) or 3xl (48px)
  Mobile bottom tab icons:   md (20px) active, sm inactive (or same size, different color)
```

## 2.4 Icon Color Rules

```
RULE 1 — ICON COLOR FOLLOWS TEXT HIERARCHY
  Primary icon (main action):    slate-900 (#0F172A)
  Secondary icon (supporting):   slate-500 (#475569)
  Muted icon (disabled/hint):    slate-400 (#94A3B8)
  Never give icons arbitrary colors — they follow text rules.

RULE 2 — CORAL ICON = IMPORTANT ACTION OR ACTIVE STATE
  ✓ Active nav item icon in CRM sidebar
  ✓ Primary CTA button icon
  ✓ Logo icon
  ✓ Featured/highlighted element
  ✗ Random icons on cards to "add color"
  ✗ Decorative icons mid-paragraph

RULE 3 — ICONS IN COLORED CONTAINERS
  Coral container (bg-coral):     white icon
  Coral-light container:          coral icon (#FF5A5F)
  Surface-alt container:          slate-600 icon
  Dark container (bg-slate-900):  white or coral icon
  Status containers:
    Success bg: status-success (#10B981)
    Warning bg: status-warning (#F59E0B)
    Error bg:   status-error (#EF4444)
    Info bg:    status-info (#3B82F6)

RULE 4 — TRANSITION ON HOVER
  Always transition icon color WITH the container/text transition.
  Use group-hover: variant so parent handles the hover state.
  Duration: 150ms (match container transition)

  ✓  className="text-slate-600 group-hover:text-white transition-colors duration-150"
  ✗  Using separate hover on icon itself (desync with container)

RULE 5 — NEVER APPLY OPACITY TO ICONS
  Opacity fades the icon AND creates anti-aliasing artifacts.
  Use the correct color instead:
  ✓  text-slate-400 (muted, disabled state)
  ✗  text-slate-900 opacity-30
```

## 2.5 Complete Icon Assignments

### Marketing Website Navigation

```
Icon                    hgi-stroke class
─────────────────────────────────────────────────────────
Logo symbol             hgi-flash
Products nav trigger    hgi-package-01
Solutions nav trigger   hgi-idea-01
Resources nav trigger   hgi-book-open-01
Company nav trigger     hgi-building-03
Search                  hgi-search-01
Hamburger menu          hgi-menu-01
Close (X)               hgi-cancel-01
Arrow down (dropdown)   hgi-arrow-down-01
Arrow right (CTA)       hgi-arrow-right-01
Arrow left (back)       hgi-arrow-left-01
External link           hgi-link-01
Login                   hgi-login-02
```

### Product Icons (Mega Menu + Cards + Everywhere)

```
Product                 hgi-stroke class
─────────────────────────────────────────────────────────
Online Ordering         hgi-shopping-cart-01
Digital Menu            hgi-menu-restaurant-01
Table Booking           hgi-calendar-check-01
Loyalty Program         hgi-gift-01
QR Menu                 hgi-qr-code
Restaurant App          hgi-smart-phone-01
Kitchen Display         hgi-monitor-01
```

### Solution Icons (Mega Menu + Cards)

```
Restaurant Type         hgi-stroke class
─────────────────────────────────────────────────────────
Cafes & Coffee Shops    hgi-coffee-01
Bakeries                hgi-bread-01
Quick-Service (QSR)     hgi-restaurant-01
Dine-In                 hgi-fork-knife
Cloud Kitchen           hgi-cloud-server
Franchise               hgi-store-01
```

### CRM Navigation (Sidebar)

```
Module                  hgi-stroke class
─────────────────────────────────────────────────────────
Dashboard               hgi-home-01
Leads                   hgi-user-search-01
Customers               hgi-users-01
Orders                  hgi-shopping-cart-01
Projects                hgi-briefcase-01
Tasks                   hgi-task-01
Support / Tickets       hgi-customer-support
Communication           hgi-message-01
Billing                 hgi-invoice-01
Knowledge Base          hgi-book-01
Calendar                hgi-calendar-01
Analytics               hgi-bar-chart-01
Team                    hgi-user-group
Documents               hgi-folder-01
Settings                hgi-settings-01
Notifications (bell)    hgi-notification-01
Search                  hgi-search-01
Profile / Account       hgi-user-circle
Logout                  hgi-logout-02
```

### Customer Portal Navigation

```
Section                 hgi-stroke class
─────────────────────────────────────────────────────────
Portal Dashboard        hgi-home-01
My Projects             hgi-briefcase-01
Orders                  hgi-shopping-cart-01
Invoices                hgi-invoice-01
Support                 hgi-customer-support
Downloads               hgi-download-01
Announcements           hgi-megaphone-01
Account Settings        hgi-settings-01
```

### Action Icons (Buttons + Table Actions)

```
Action                  hgi-stroke class
─────────────────────────────────────────────────────────
Create / Add            hgi-plus-sign-circle
Edit / Update           hgi-edit-01
Delete / Remove         hgi-delete-02
Save                    hgi-floppy-disk
Cancel                  hgi-cancel-01
Confirm / Approve       hgi-checkmark-circle-01
Archive                 hgi-archive-01
Restore                 hgi-refresh-01
Download                hgi-download-01
Upload                  hgi-upload-01
Copy to clipboard       hgi-copy-01
Share                   hgi-share-01
Print                   hgi-printer-01
Send / Submit           hgi-sent
Filter                  hgi-filter-01
Sort                    hgi-sort-by-01
More options (…)        hgi-more-vertical
Attach file             hgi-attachment-01
Preview / View          hgi-eye
Expand / Fullscreen     hgi-expand-01
Collapse                hgi-collapse-01
Drag handle             hgi-drag-drop-vertical
```

### Status Icons (Badges + Toasts + Alerts)

```
Status                  hgi-stroke class             Color
─────────────────────────────────────────────────────────────────
Success                 hgi-checkmark-circle-01      #10B981
Warning                 hgi-alert-02                 #F59E0B
Error / Danger          hgi-cancel-circle-01         #EF4444
Info                    hgi-information-circle       #3B82F6
Pending                 hgi-clock-01                 #94A3B8
Loading                 hgi-loading-01 (animated)    coral
New / Unread            hgi-record                   coral (small dot)
Locked                  hgi-lock-01                  slate-400
```

### Blog Icons

```
Element                 hgi-stroke class
─────────────────────────────────────────────────────────
Post card category      (colored badge — no icon)
Read time               hgi-clock-01
Like / Heart            hgi-heart-01 / hgi-heart-02 (filled)
Bookmark empty          hgi-bookmark-01
Bookmark saved          hgi-bookmark-02
Share                   hgi-share-01
Copy link               hgi-copy-01
Comment                 hgi-comment-01
Report                  hgi-flag-01
Search blog             hgi-search-01
RSS feed                hgi-rss-feed
Table of contents       hgi-list-view
Font size               hgi-text-01
Print                   hgi-printer-01
Scroll to top           hgi-arrow-up-01
Progress / Check        hgi-checkmark-01
```

### Social / External Icons

```
Platform                hgi-stroke class
─────────────────────────────────────────────────────────
X / Twitter             hgi-twitter (or hgi-new-twitter)
LinkedIn                hgi-linkedin-01
YouTube                 hgi-youtube
Instagram               hgi-instagram
Email                   hgi-mail-01
Phone                   hgi-call
WhatsApp                hgi-whatsapp
```

### Empty State Icons (Larger sizes)

```
Context                 hgi-stroke class             Size
─────────────────────────────────────────────────────────────
No leads found          hgi-user-search-01           48px
No customers            hgi-users-01                 48px
No orders               hgi-shopping-cart-01         48px
No projects             hgi-briefcase-01             48px
No tickets              hgi-customer-support         48px
No notifications        hgi-notification-off-01      48px
No blog posts           hgi-edit-02                  48px
No search results       hgi-search-01                48px
No documents            hgi-folder-01                48px
No internet / error     hgi-wifi-error-01            48px
Under construction      hgi-setting-06               48px
```

## 2.6 Icon + Text Patterns

```
PATTERN 1 — Button with icon (MOST COMMON)
  Icon LEFT of text for navigation actions:
  [→] [icon] [Label text]

  Icon RIGHT of text for directional/CTA actions:
  [Label text] [→ icon]

  ✓  <button>[icon] Add Lead</button>          (action button, icon left)
  ✓  <a>Start free trial [icon]</a>           (CTA link, icon right)
  ✗  <button>[icon]</button> for non-obvious actions (always add label)

PATTERN 2 — Navigation item
  [icon 20px] [Label]     gap-3, icon text-slate-500, label text-slate-900
  Active:     [icon 20px] [Label]     icon coral, label coral, bg coral-light

PATTERN 3 — Feature card
  [Icon 24px in 48px container]
  [Name — font-700, 18px]
  [Description — font-500, 15px, slate-600]

  Container: rounded-xl, bg-surface-alt
  Icon: text-slate-600 (default) or text-coral (featured)

PATTERN 4 — Status badge
  [Icon 14px] [Status text 11px uppercase]
  Example: [✓] ACTIVE | [⏰] PENDING | [✗] FAILED
  Icon and text same color, bg soft version of that color

PATTERN 5 — Table row action
  Icon-only buttons in table rows, shown on hover only
  Min touch target: 32px × 32px
  Tooltip on hover (absolutely positioned, dark bg)
  Max 4 action icons per row — more than 4 use a "More" menu

PATTERN 6 — Empty state
  [Icon 48px, slate-300]        ← muted, not drawing attention
  [Heading, slate-700]
  [Description, slate-500, text-center, max-w-xs]
  [CTA button, coral]           ← this is where the eye goes

  Empty state icon is MUTED, not coral — you want users to look at
  the CTA, not the icon. The icon just communicates context.
```

## 2.7 Icon-Only Buttons — When Allowed

```
ALLOWED (universally understood icons):
  ✓  Search icon (magnifying glass)
  ✓  Close/X button on modals
  ✓  Hamburger menu (mobile)
  ✓  Back arrow (when context is clear)
  ✓  Plus/Add in a list context
  ✓  Settings gear in top-right of a card
  ✓  Print icon with tooltip
  ✓  Social share icons (X, LinkedIn logos)

REQUIRES TOOLTIP:
  All icon-only action buttons in tables and dashboards
  Tooltip: dark bg (#0F172A), white text, rounded-lg, py-1 px-2.5, 12px font
  Show on: hover (desktop), long-press (mobile)

NOT ALLOWED icon-only (always add text label):
  ✗  Primary CTA buttons ("Start Trial" needs text)
  ✗  Navigation items in main nav (always has text)
  ✗  Form submit buttons
  ✗  Any button where the action could be misunderstood
```

## 2.8 Do's and Don'ts

```
DO:
  ✓ Use icons to aid recognition, not to fill space
  ✓ Consistent icon per concept across the whole app
     (shopping-cart-01 means "orders" everywhere — not sometimes cart, sometimes bag)
  ✓ Pair every icon with a text label unless universally understood
  ✓ Match icon stroke weight to font weight of surrounding text
  ✓ Transition icon color together with container on hover
  ✓ Use 40px+ tap targets on mobile for all icon buttons

DON'T:
  ✗ Use two different icons for the same concept anywhere in the app
  ✗ Rotate icons unless hgi-arrow-down-01 for dropdown (intentional rotation)
  ✗ Add drop shadows or text shadows to icons
  ✗ Use colored icons for decoration (icon coloring = meaning)
  ✗ Use icons at non-standard sizes (stick to the size system)
  ✗ Use more than one icon style (never mix stroke and solid)
  ✗ Place icons too close to text (minimum gap-2 / 8px)
  ✗ Use icons in body text paragraphs mid-sentence
  ✗ Use emoji as icons inside the app interface (only in blog content)
```

## 2.9 Emoji vs Icon — When to Use Each

```
USE HUGEICONS:
  ✓ All UI elements (buttons, nav, forms, tables, cards)
  ✓ CRM and portal interfaces
  ✓ Status indicators and alerts
  ✓ Mobile bottom navigation

USE EMOJI:
  ✓ Blog post callout boxes (tip, info, warning) — emoji feels warmer
  ✓ Marketing announcement bars (the pulsing dot + "🔴 New:")
  ✓ Solution cards on homepage (☕ Cafes, 🥐 Bakeries) — personality
  ✓ Testimonials (quotation marks or human context)
  ✓ SMS / push notification copy (standard platform behavior)

NEVER MIX in same component:
  ✗ Nav item with emoji icon next to nav item with Hugeicon
  ✗ Table row with emoji status and icon status mixed
  The mega menu dropdown grids should use Hugeicons,
  NOT the emoji that existed in the original HTML code.
  The homepage solution cards can keep emoji (marketing feel).
```

---

# PART 3 — MINIMALISM PRINCIPLES

## 3.1 The Loglime Design Philosophy

Loglime is not a startup trying to look busy. It's a product trying to look trustworthy.

The design should communicate:
**"We have removed everything that isn't essential.
What remains is exactly what you need."**

Every design decision passes this test:
> "Does removing this hurt the user's understanding or ability to act?"
> If no → remove it.
> If yes → keep it.

The reference points: Stripe, Linear, Apple.com.
What they share: generous white space, one focal point per section,
restrained color, typography doing the heavy lifting.

## 3.2 White Space Rules

```
PRINCIPLE: Space IS the design. Don't fill it. Protect it.

PAGE LEVEL:
  Section padding-top: pt-24 (96px) on desktop, pt-16 (64px) on mobile
  Section padding-bottom: pb-24 (96px) on desktop, pb-16 (64px) on mobile
  Section gap between sections: 80px–120px
  Never let two sections bleed together — the space is what separates them visually

COMPONENT LEVEL:
  Card padding: p-6 (24px) on desktop, p-5 (20px) on mobile
  Between card elements: gap-4 (16px) minimum
  Between icon and text: gap-3 (12px) for large, gap-2 (8px) for small
  Between label and value: gap-1 (4px)

TEXT LEVEL:
  Line height for headings: leading-tight (1.2)
  Line height for body: leading-relaxed (1.625) minimum
  Line height for article: leading-[1.8] (optimized for reading)
  Letter spacing for headings: tracking-tight (-0.02em)
  Letter spacing for captions/badges: tracking-wider (0.1em)

GRID GAPS:
  Feature card grids: gap-5 (20px) on desktop
  Blog post grids: gap-6 (24px) on desktop
  Sidebar widget gaps: gap-4 (16px) between widgets

WHAT DENSE LOOKS LIKE (AVOID):
  ✗ Cards with p-3 padding
  ✗ Lists with gap-1 between items
  ✗ Sections with mt-8 / mb-8 only
  ✗ Headings with no top margin (they look attached to previous section)
```

## 3.3 Color Restraint

```
PALETTE HAS 4 ROLES. NOTHING MORE.

Role 1 — BACKGROUND:    White (#FFFFFF) and near-white (#F8FAFC)
Role 2 — TEXT:          Slate-900 (#0F172A) primary, Slate-600 secondary
Role 3 — ACCENT:        Coral (#FF5A5F) for ONE focal point per section
Role 4 — BORDER:        Slate-100 (#F1F5F9) for structure

STATUS COLORS (only in status contexts):
  Success: #10B981 | Warning: #F59E0B | Error: #EF4444 | Info: #3B82F6
  These are NEVER used decoratively. Only for actual status.

CORAL USAGE RULES:
  Max 2 coral elements above the fold on any page
  Max 1 coral element in any card component
  Coral background: ONLY on announcement bar and primary CTAs
  Coral text: Links that need emphasis, active states, prices
  Coral border: Active nav items, callout left borders
  The more coral is used, the less it means. Protect its meaning.

WHAT HAPPENS WITH TOO MUCH COLOR:
  Every element competes for attention.
  Nothing is prominent.
  Page feels amateurish and anxious.
  Users don't know where to look.

GRADIENT RULES:
  Gradients are allowed in EXACTLY TWO places:
  1. Featured product card in mega menu right panel (soft coral-light → white)
  2. Hero section — ONLY if it serves as a background wash, not text bg
  Everywhere else: flat colors only.

NO:
  ✗ Gradient buttons
  ✗ Gradient section backgrounds
  ✗ Rainbow feature cards
  ✗ Colored icons for decoration
  ✗ Tinted section backgrounds (e.g. "light blue section" alternating)
     → Use white for everything. Sections are separated by space, not color.
```

## 3.4 Typography as Design

```
PRINCIPLE: Typography can do everything a decoration cannot.
           A well-set headline is more powerful than any icon or gradient.

HIERARCHY RULES:
  Only 3 type sizes visible at once in any section.
  Example: Heading (40px) + Body (16px) + Label (12px). Never more.

FONT WEIGHT RULES:
  Within one component: max 2 weights.
  ✓ Card: font-700 title + font-500 description
  ✗ Card: font-700 title + font-600 subtitle + font-500 desc + font-400 meta

THE CONTRAST PAIR (most used combination):
  Large + Bold (32-48px, 700) ← visual anchor
  Small + Medium (14-16px, 500) ← supporting context
  The SIZE CONTRAST is what creates hierarchy, not the weight.

HEADING SIZES (must be used in this order per page):
  Page H1:  40-48px, 700, line-height 1.1, tracking-tight
  H2:       28-32px, 700, line-height 1.2
  H3:       20-22px, 600, line-height 1.3
  H4:       17-18px, 600, line-height 1.4
  Body:     15-16px, 500, line-height 1.625
  Never skip levels (H1 → H3, skipping H2 = bad for both SEO and visual hierarchy)

BADGE / CAPTION STYLE:
  11px, font-600, uppercase, tracking-wider (0.1em)
  This creates a "label" feel distinct from body copy.
  Used for: category badges, section eyebrows ("MOST POPULAR"), timestamps.

WHAT MAKES TYPOGRAPHY FEEL PREMIUM:
  ✓ Consistent sizes (use Tailwind's scale — don't make up 17.5px)
  ✓ Tight line-height on headings (they feel powerful and confident)
  ✓ Generous line-height on body (it breathes and is readable)
  ✓ Text-left for long copy (centered body text is hard to read)
  ✓ Text-center ONLY for headlines and very short (3-4 word) subtitles
```

## 3.5 Shadow Hierarchy

```
Shadows communicate elevation. Use ONLY 3 levels.

Level 0 — Flat (no shadow):
  Use for: Inline elements, badges, background sections
  shadow: none

Level 1 — Card (resting):
  Use for: Cards, dropdowns at rest, input fields
  shadow: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)
  Tailwind: shadow-card (custom token)

Level 2 — Elevated (interactive / floating):
  Use for: Hover state on cards, open dropdowns, sticky elements
  shadow: 0 10px 40px -10px rgba(15,23,42,0.08)
  Tailwind: shadow-premium (custom token)

Level 3 — Floating (coral accent elements):
  Use for: Primary CTA buttons, logo, featured cards
  shadow: 0 20px 40px rgba(255,90,95,0.15)
  Tailwind: shadow-floating (custom token)

Modal / Overlay:
  shadow: 0 25px 60px rgba(15,23,42,0.12)
  Tailwind: shadow-modal (custom token)

RULES:
  ✗ Never use Tailwind's default shadow-xl or shadow-2xl (too gray, too generic)
  ✗ Never stack two shadows on one element
  ✗ Hover transition shadow: transition-shadow duration-200
  ✓ Cards: shadow-card default, shadow-premium on hover
```

## 3.6 Border Rules

```
PRINCIPLE: Borders should group, not decorate.
           If a border isn't preventing visual confusion, remove it.

BORDER COLORS (2 only):
  Default: #F1F5F9 (border-DEFAULT, slate-100) — very subtle
  Strong:  #E2E8F0 (border-strong, slate-200) — for emphasis

WHEN TO USE BORDERS:
  ✓ Between items in a list (bottom border on all but last)
  ✓ Around input fields (1px, border-DEFAULT)
  ✓ Under sticky header (appears on scroll)
  ✓ Table row dividers
  ✓ Mega menu panel (1px border-DEFAULT — grounds the panel)
  ✓ Left accent border on callout boxes (4px, status color)

WHEN NOT TO USE BORDERS:
  ✗ Around cards (let shadow do the separation work)
  ✗ Between sections on the page
  ✗ Under headings as decorative underlines
  ✗ Around images (the image edge IS the border)
  ✗ "Separator" decorative lines between text blocks

BORDER RADIUS SYSTEM:
  rounded-full:   Buttons, pills, badges, avatars, toggle switches
  rounded-2xl:    Cards, dropdowns, modals, feature cards (16px)
  rounded-xl:     Inputs, small cards, icon containers (12px)
  rounded-lg:     Tooltips, small chips (8px)
  rounded-md:     Internal elements within cards (6px)
  rounded-none:   Table cells, full-width mobile elements only
  
  RULE: The larger the component, the larger the radius.
        Never put rounded-full on a card or rounded-sm on a button.
```

## 3.7 Animation Restraint

```
PRINCIPLE: Animation should communicate, not entertain.
           Every animation must have a reason:
           - State change (hover, active, loading)
           - Spatial relationship (drawer opening from right means it's a side panel)
           - Feedback (button clicked → visual response)

NEVER animate just to look dynamic.

ALLOWED ANIMATIONS:
  ✓ Hover color/bg transition (150ms) — communicates interactivity
  ✓ Dropdown open/close (150ms ease) — shows element appearing/disappearing
  ✓ Mobile menu slide (250ms ease-out) — spatial relationship
  ✓ Button press scale (transform scale 0.97, 100ms) — physical feedback
  ✓ Toast/notification slide in (200ms) — attention without interruption
  ✓ Progress bar fill (width transition, eased) — feedback on action
  ✓ Accordion expand/collapse (200ms height animation) — reveals content
  ✓ Skeleton loading pulse — communicates loading state
  ✓ Reading progress bar fill — continuous feedback

NOT ALLOWED:
  ✗ Scroll-triggered parallax effects
  ✗ Elements flying in from off-screen on scroll (scroll animations)
  ✗ Rotating or spinning elements (except actual loading spinner)
  ✗ Pulsing or breathing animations on non-status elements
  ✗ Particle effects, floating elements, ambient movement
  ✗ Text that types itself (typewriter effect) in headings
  ✗ Counter animations (numbers counting up — cheap trick)
  ✗ Staggered entrance animations (every element appears sequentially)

DURATIONS (use only these):
  Instant:    0ms  — State toggles (active/inactive — no transition needed)
  Fast:       100ms — Micro interactions (button press, checkbox)
  Default:    150ms — Color transitions, hover states
  Moderate:   200ms — Accordion, toast, skeleton
  Slow:       250ms — Mobile menu, page transitions
  Never:      >300ms for UI elements (feels sluggish)

EASING:
  ease-out:   For elements entering the screen (starts fast, decelerates)
  ease-in:    For elements leaving the screen (starts slow, accelerates)
  ease:       For state transitions that don't involve spatial movement
  Never: linear (mechanical), bounce (playful, not our brand)
```

## 3.8 Component Density Rules

```
MOBILE:
  Touch targets: minimum 44×44px for all interactive elements
  Row height in lists: minimum 56px
  Bottom padding of last list item: pb-safe (accounts for iPhone home bar)
  Card padding: p-4 (16px) minimum
  Font: never below 14px (legal text exception: 12px)

DESKTOP:
  Card padding: p-6 (24px) standard
  Table row height: 52px minimum
  Sidebar width: 260px (don't compress below 240px)
  Content max-width: 1400px (never full browser width)

INFORMATION DENSITY TARGET:
  Not Twitter (too dense, scrollable forever)
  Not Apple.com (too sparse, marketing only)
  Target: Linear.app, Stripe dashboard
  That is: functional information density with breathing room.

THE "ONE THING" RULE PER SECTION:
  Every section on the homepage does ONE thing.
  One thing to understand. One possible action.
  Problem section: understand the problem.
  Features section: understand what Loglime does.
  Process section: understand how to get started.
  CTA section: take action.
  Never combine two different messages in one section.
```

## 3.9 The "Remove One Thing" Test

Before finalizing any design, apply these questions in order:

```
1. Can I remove the border? (replace with shadow or space)
2. Can I remove the icon? (does the text label make it clear on its own?)
3. Can I remove the animation? (does the UI still communicate state changes?)
4. Can I remove the gradient? (does a flat color work equally well?)
5. Can I remove the subheading? (does the H1 + body communicate enough?)
6. Can I remove this section entirely? (does the page work without it?)
7. Can I remove this word? (re-read every line — ruthlessly cut)

If the answer to any of these is "yes" → remove it.
The final design should have nothing left to remove.
```

## 3.10 What Makes Something Feel Premium vs Cheap

```
FEELS PREMIUM:
  → Large, confident typography (a big headline that's just slightly too large)
  → White space that makes you uncomfortable at first
  → One thing colored coral on a white page
  → Shadows that are barely there but you'd notice if they were gone
  → Buttons that have 40px padding so they breathe
  → A mega menu that appears in 150ms exactly
  → An icon that sits in a 40px container at 20px size (space around it)
  → A card that has no visible border but clearly has edges (shadow-card)
  → Text that's slate-600 not slate-900 for secondary info (intentional hierarchy)
  → A form with only the fields you actually need (ruthless reduction)

FEELS CHEAP:
  → Gradient buttons (trying too hard)
  → Colored section backgrounds (alternating colors like a tablecloth)
  → Icons that are too large and fill the entire container
  → Too many font sizes on one page (no clear hierarchy)
  → Coral used on 8 different elements (means nothing now)
  → Shadows that are too dark or too spread (looks like 2010 web design)
  → Borders on every element (insecure design — needs structure to look structured)
  → Scroll animations on every element (desperate for attention)
  → Multiple CTA buttons per section (can't decide what users should do)
  → White-on-gradient text (hard to read, hard to maintain)
  → Icon + emoji mixed in the same component
  → Cards with tight padding (p-3) and dense info (cheap app aesthetic)
```

---

# PART 4 — IMPLEMENTATION CHECKLIST (Codex)

```
HEADER / MEGA MENU:
  ☐ Sticky header with scroll-state class toggling
  ☐ Products mega menu (860px panel, 2-column, animated)
  ☐ Solutions mega menu (860px panel, 2-column, stats card)
  ☐ Resources dropdown (simple, 200px)
  ☐ Company dropdown (simple, 180px)
  ☐ Hover trigger with 100ms open delay, 150ms close delay
  ☐ Arrow icon rotation on open
  ☐ ARIA attributes (haspopup, expanded, controls)
  ☐ Keyboard navigation (Tab, Escape, Arrow keys)
  ☐ Mobile full-screen menu with accordion
  ☐ Mobile menu open/close animation (translateY)
  ☐ Body scroll lock when mobile menu is open

ICONS:
  ☐ Hugeicons CDN or npm package installed
  ☐ ONLY hgi-stroke style used throughout
  ☐ Size system applied (xs/sm/md/lg/xl) — no arbitrary sizes
  ☐ Icon color follows text hierarchy rules
  ☐ Coral icon = active/important states only
  ☐ Icon + text label pattern used on all buttons
  ☐ Tooltips on all icon-only action buttons
  ☐ Consistent icon per concept (no duplicates)
  ☐ Empty states use muted slate-300 icons at 48px

MINIMALISM:
  ☐ Section padding: pt-24 pb-24 desktop, pt-16 pb-16 mobile
  ☐ Card padding: p-6 desktop, p-5 mobile
  ☐ Max 2 coral elements above fold on any page
  ☐ Shadow tokens: shadow-card, shadow-premium, shadow-floating, shadow-modal
  ☐ No gradients except mega menu featured card and hero
  ☐ No scroll-triggered animations
  ☐ No animation > 250ms
  ☐ Border color: slate-100 only (never slate-200+ for regular borders)
  ☐ Typography: max 3 sizes visible at once per section
  ☐ Line-height: leading-tight (headings), leading-relaxed (body)
```