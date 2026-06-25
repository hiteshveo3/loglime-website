export type BlogCategory = {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
};

export type BlogAuthor = {
  name: string;
  username: string;
  roleTitle: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl?: string;
  expertise: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogSection = {
  id: string;
  heading: string;
  answer: string;
  body: string[];
  bullets?: string[];
  callout?: {
    tone: "tip" | "info" | "warning" | "important";
    title: string;
    body: string;
  };
  table?: {
    columns: string[];
    rows: string[][];
  };
};

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  categorySlug: string;
  authorUsername: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageCaption: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  isFeatured?: boolean;
  isPillar?: boolean;
  relatedProductSlugs: string[];
  intro: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  conclusion: string;
};

const siteUrl = "https://loglime.com";

export const blogCategories: BlogCategory[] = [
  {
    name: "Online Ordering",
    slug: "online-ordering",
    description: "Commission-free ordering, direct checkout, delivery app economics, and average order value growth.",
    color: "#FF5A5F",
    icon: "hgi-shopping-cart-01",
  },
  {
    name: "Restaurant Technology",
    slug: "restaurant-technology",
    description: "Digital menus, QR menus, branded restaurant apps, POS decisions, and restaurant tech stacks.",
    color: "#3B82F6",
    icon: "hgi-computer-phone-sync",
  },
  {
    name: "Marketing & Loyalty",
    slug: "restaurant-marketing",
    description: "Customer retention, loyalty programs, push notifications, email campaigns, and repeat revenue.",
    color: "#10B981",
    icon: "hgi-gift",
  },
  {
    name: "Restaurant Operations",
    slug: "restaurant-operations",
    description: "Table booking, no-show reduction, menu operations, kitchen flow, and staff efficiency.",
    color: "#F59E0B",
    icon: "hgi-calendar-check-in-01",
  },
  {
    name: "Growth & Business",
    slug: "restaurant-growth",
    description: "Restaurant margins, second locations, delivery economics, pricing strategy, and growth planning.",
    color: "#8B5CF6",
    icon: "hgi-chart-increase",
  },
  {
    name: "Case Studies",
    slug: "case-studies",
    description: "Practical before-and-after stories from restaurant operators moving revenue into direct channels.",
    color: "#0F172A",
    icon: "hgi-analytics-up",
  },
];

export const blogAuthors: BlogAuthor[] = [
  {
    name: "Sameer Ahmad Basra",
    username: "sameer-ahmad-basra",
    roleTitle: "Restaurant Technology Writer",
    bio: "Sameer Ahmad Basra writes about direct ordering, restaurant apps, loyalty, and practical technology decisions for independent restaurant operators.",
    avatarUrl: "/images/loglime/sameer-ahmad-basra-author.jpeg",
    expertise: ["online ordering", "restaurant apps", "digital menus", "loyalty programs", "restaurant operations"],
  },
];

const author = "sameer-ahmad-basra";

export const blogPosts: BlogPost[] = [
  {
    title: "Why Every Restaurant Needs Its Own Ordering App",
    slug: "why-restaurant-needs-app",
    excerpt: "Restaurants lose AED 30K–50K monthly to delivery platform commissions. Learn how an ordering app saves money, builds customer loyalty, and increases profit.",
    categorySlug: "online-ordering",
    authorUsername: author,
    featuredImage: "/images/loglime/online-ordering-system-loglime.webp",
    featuredImageAlt: "Restaurant ordering app interface showing direct ordering benefits",
    featuredImageCaption: "A restaurant app puts customer relationships back in your hands.",
    tags: ["restaurant-app", "commission-free", "profit-margins", "direct-ordering"],
    publishedAt: "2026-01-15",
    updatedAt: "2026-01-20",
    isFeatured: true,
    isPillar: true,
    relatedProductSlugs: ["online-ordering", "restaurant-app", "loyalty"],
    intro: [
      "Your restaurant is working 16-hour days. Your food is good. Your customers love you.",
      "But Talabat, Deliveroo, Uber Eats, and Zomato are taking 15–30% of every order. That's not a commission—that's a tax on your business. And you have no relationship with those customers. You don't know their phone numbers. You can't send them a push notification on Friday saying 'order now.' Those customers belong to the platforms, not to you.",
      "An ordering app changes everything.",
    ],
    sections: [
      {
        id: "what-is-restaurant-app",
        heading: "What is a restaurant ordering app?",
        answer: "A restaurant ordering app is a custom mobile application built specifically for your restaurant. Customers download it from Google Play or the Apple App Store under your restaurant's name—not a third-party platform.",
        body: [
          "In the app, customers can browse your menu, place orders for pickup or delivery, track orders in real-time, save favorites, earn loyalty rewards, and receive push notifications about specials.",
          "The critical difference: you own the relationship. You own the customer data. You own the repeat orders. When a customer orders through your app, you know about it. When they order through Talabat, Talabat knows about it.",
        ],
        bullets: [
          "Browse your menu",
          "Place orders for pickup or delivery",
          "Track orders in real-time",
          "Save favorite meals",
          "Get loyalty rewards",
          "Receive push notifications about specials",
        ],
      },
      {
        id: "real-cost-commissions",
        heading: "The real cost of delivery platform commissions",
        answer: "Most restaurants don't realize how much they're actually losing to platforms when you include commissions, fees, and promotional costs.",
        body: [
          "Let's do the math for a mid-sized restaurant in Dubai doing 100 orders per day at AED 80 average order value with 25% commission.",
          "Daily cost: 100 orders × AED 80 × 25% = AED 2,000. That's AED 60,000 per month.",
          "But that's just the commission. When you add payment processing (2.5%), platform discounts (AED 5,000–10,000/month), and other fees, the real number is much higher.",
        ],
        table: {
          columns: ["Cost", "Amount", "Reason"],
          rows: [
            ["Commission (25%)", "AED 60,000/month", "Per-order fee to platform"],
            ["Payment processing (2.5%)", "AED 2,000/month", "Platform takes a cut of payment"],
            ["Promotional credits", "AED 5,000–10,000/month", "Platform discounts"],
            ["TOTAL MONTHLY COST", "AED 67,000–72,000", "Real number"],
            ["TOTAL ANNUAL COST", "AED 804,000–864,000", "What it actually costs"],
          ],
        },
        callout: {
          tone: "important",
          title: "That's 35% of your profit",
          body: "For a restaurant making AED 200,000/month in profit, losing AED 70,000 to commissions is 35% of your entire profit margin.",
        },
      },
      {
        id: "direct-orders-equation",
        heading: "Direct orders change the equation",
        answer: "Imagine moving 70% of your orders to your own app while keeping 30% on delivery platforms.",
        body: [
          "Same restaurant. Same 100 orders per day. But 70 come through your app. 30 come through Talabat.",
          "Here's what happens to your costs.",
        ],
        table: {
          columns: ["Metric", "Delivery App (30 orders)", "Your App (70 orders)", "Total"],
          rows: [
            ["Orders per day", "30", "70", "100"],
            ["Daily revenue (AED)", "2,400", "5,600", "8,000"],
            ["Commission (25%)", "600", "0", "600"],
            ["Payment processing (2.5%)", "60", "140", "200"],
            ["TOTAL DAILY COST", "660", "140", "800"],
            ["MONTHLY COST", "19,800", "4,200", "24,000"],
            ["SAVINGS vs all-platform", "—", "—", "AED 36,000–48,000"],
          ],
        },
        callout: {
          tone: "tip",
          title: "That's AED 432K–576K per year",
          body: "Enough to hire another chef, open a second location, or increase profit by 25–35%.",
        },
      },
      {
        id: "how-to-get-customers",
        heading: "How to get customers to order directly",
        answer: "The biggest question: how do you move customers from Talabat to your app? The answer is simpler than most think.",
        body: [
          "Make it frictionless. Put QR codes on receipts. Put it in your WhatsApp menu. Put it on Instagram. Make downloading your app a 10-second action.",
          "Offer incentive. If Talabat takes 25%, you can offer a 10% discount on direct orders and still break even on the commission difference. Customers see AED 80 on Talabat, AED 72 on your app—they'll order on your app.",
          "Build loyalty. Every order earns points. After 10 orders, the 11th is free. Talabat doesn't offer this. Your app does.",
          "Send push notifications. On Friday at 5:30 PM, send: 'It's dinner time. Your favorite biryani is ready—order now.' That notification brings back 15–20% of users.",
        ],
        bullets: [
          "QR codes on receipts, tables, and packaging",
          "10–20% discount on direct orders",
          "Loyalty program (free item after N orders)",
          "Push notifications for Friday/weekend orders",
          "Saved payment methods for faster checkout",
        ],
      },
      {
        id: "delivery-hybrid-model",
        heading: "What about delivery? Do you need your own drivers?",
        answer: "You don't need your own delivery fleet. There are smart ways to handle delivery without paying 25% commission.",
        body: [
          "Option 1: Use Talabat only for delivery (not ordering). You fulfill through your app, Talabat delivers. Their delivery-only commission is 8–12% (not 25%).",
          "Option 2: Hire one delivery driver for AED 1,500–2,000/month. If you're doing 50+ deliveries per day, this often saves more than Talabat would take.",
          "Option 3: Hybrid. Keep 30% of orders on Talabat (those customers who refuse your app). Move 70% to your app. Use Talabat for delivery only on that 30%.",
          "All three options beat paying Talabat 25% on everything.",
        ],
      },
      {
        id: "real-restaurant-results",
        heading: "Real numbers: What restaurants actually save",
        answer: "Here are actual results from 20+ restaurants that built apps.",
        body: [
          "Restaurant A (Casual Diner, Dubai): Changed from 80% Talabat / 20% direct to 30% Talabat / 70% app. Went from AED 52,000/month costs to AED 18,000. Saved AED 34,000/month. ROI in 6 months.",
          "Restaurant B (Fine Dining, Abu Dhabi): Was 100% Talabat. Moved to 40% Talabat / 60% app. Went from AED 60,000/month to AED 28,000. Saved AED 32,000/month. ROI in 5 months.",
          "Restaurant C (Cloud Kitchen, Dubai): Was 100% Talabat + hired delivery driver. Moved to 50% Talabat / 50% app + driver. Went from AED 64,000/month to AED 21,000. Saved AED 43,000/month. ROI in 4 months.",
          "Pattern: ROI happens in 4–6 months. After that, it's pure profit.",
        ],
        callout: {
          tone: "info",
          title: "ROI pays for itself in 4–6 months",
          body: "After that, every month you save AED 30K–50K that would have gone to platforms.",
        },
      },
      {
        id: "secondary-benefits",
        heading: "The secondary benefits (numbers don't capture these)",
        answer: "Saving on commissions is obvious. But there are deeper wins.",
        body: [
          "Customer data is gold. You know their order history, favorite items, delivery address, and ordering times. You can email old customers, send birthday offers, and optimize your menu based on bestsellers.",
          "You control the experience. On Talabat, you're next to 50 competitors. In your app, customers see only you. Your design. Your story. Your brand.",
          "You can experiment. Test new menu items on early customers. A/B test layouts. Run limited-time offers. Track impact. Restaurants that optimize through their apps increase average order value by 12–18% over a year.",
          "You're not dependent on an algorithm. Talabat's algorithm controls visibility. Your app doesn't. Customers see you every time they open it.",
        ],
      },
      {
        id: "how-to-start",
        heading: "How to get started (without technical headaches)",
        answer: "You don't need to be a developer. You don't need expensive help. Getting started is simple.",
        body: [
          "Most restaurants are live with an ordering app within 6–8 weeks from decision to Google Play launch.",
          "Path 1: Custom App (Recommended). A branded app built specifically for your restaurant. Takes 4–8 weeks. One-time cost. You own it forever. No monthly fees.",
          "Path 2: Platform. Some restaurants use managed platforms where the platform handles the app. Less control, more simplicity.",
          "Both work. The difference is control vs simplicity.",
        ],
        bullets: [
          "Week 1: Share your menu, colors, logo",
          "Weeks 2–6: App gets built",
          "Week 7: Google Play submission",
          "Week 8: Live on Google Play and Apple App Store",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does it take to build an app?",
        answer: "6–8 weeks from start to Google Play launch. Apple App Store review adds 1–2 weeks. Most restaurants are live and getting orders within 2 months.",
      },
      {
        question: "How much does a restaurant app cost?",
        answer: "Basic (ordering + admin panel): $149–249 one-time. With loyalty and AI features: $399 one-time. No monthly fees or per-order commissions.",
      },
      {
        question: "Do customers need to download an app?",
        answer: "A QR code links to a web version if they don't download. But download takes 30 seconds, and most customers do it when there's a discount incentive.",
      },
      {
        question: "What if customers still prefer Talabat?",
        answer: "Keep Talabat presence, but incentivize direct orders with a 10% discount. Most customers will switch once they experience faster checkout and loyalty rewards.",
      },
      {
        question: "Can I run both my app and Talabat at the same time?",
        answer: "Yes. Many restaurants do this. The goal is to shift 60–70% of orders to your app while keeping Talabat for customers who insist.",
      },
      {
        question: "What if I'm a small restaurant?",
        answer: "Smaller restaurants often see better ROI. If you're doing 30 orders/day, saving AED 600/month (vs AED 2,000 for bigger restaurants) still pays for the app in 2–3 months.",
      },
      {
        question: "How do I market my app to customers?",
        answer: "QR codes on receipts. QR codes on your WhatsApp menu. Instagram bio link. In-store signage. Email to existing customers. Usually gets 40–50% adoption within 3 months.",
      },
      {
        question: "Do I need a separate payment processor?",
        answer: "No. Your app handles payments (Google Pay, Apple Pay, card). No separate setup needed.",
      },
      {
        question: "What if the app breaks or crashes?",
        answer: "Good platforms include maintenance and support. 48-hour response time for bugs. App crashes are rare—apps are more stable than websites.",
      },
      {
        question: "Can I keep using Talabat for delivery only?",
        answer: "Yes. Use Talabat as a delivery provider (8–12% fee) while your app handles ordering. This hybrid model is common and saves money.",
      },
    ],
    conclusion: "Your restaurant is losing money to platforms every single day. Not because you're doing anything wrong—because you outsourced the customer relationship to a middleman. An ordering app fixes that. It costs one-time. It pays for itself in 4–6 months. And it gives you control over customers, pricing, and your future. The restaurants that built apps in 2024 are now saving AED 30K–50K per month. The restaurants that didn't are still losing that money. The choice is yours.",
  },
  {
    title: "Commission-Free Restaurant Ordering: Complete Guide",
    slug: "commission-free-restaurant-ordering",
    excerpt: "Commission-free restaurant ordering lets customers order directly from you, so your restaurant keeps margin, customer data, and brand control.",
    categorySlug: "online-ordering",
    authorUsername: author,
    featuredImage: "/images/loglime/online-ordering-system-loglime.webp",
    featuredImageAlt: "Loglime online ordering app interface for commission-free restaurant orders",
    featuredImageCaption: "A direct ordering flow keeps the customer relationship inside your restaurant brand.",
    tags: ["commission-free", "direct-ordering", "delivery-apps"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    isFeatured: true,
    isPillar: true,
    relatedProductSlugs: ["online-ordering", "restaurant-app"],
    intro: [
      "Commission-free restaurant ordering is a direct ordering model where guests order through your restaurant's own website, app, or QR channel instead of a marketplace that takes a percentage from every sale.",
      "For many independent restaurants, this matters because third-party delivery commissions often sit between 15% and 30% per order. In this guide, we will cover what commission-free ordering is, how it compares with marketplaces, and how to move more customers into a direct channel.",
    ],
    sections: [
      {
        id: "what-is-commission-free-ordering",
        heading: "What is commission-free online ordering?",
        answer: "Commission-free online ordering is a restaurant ordering setup where the restaurant pays a flat software fee instead of a percentage of each order.",
        body: [
          "The restaurant controls the menu, checkout, customer record, and follow-up communication. A flat monthly platform fee replaces the variable commission model used by many delivery marketplaces.",
          "The biggest difference is incentive alignment. Your direct system should help customers come back to you, not train them to browse competitors beside your menu.",
        ],
        bullets: ["Flat subscription instead of order percentage", "Restaurant owns customer data", "Checkout uses the restaurant brand", "Pickup, delivery, and scheduled orders can all run in one flow"],
        callout: {
          tone: "important",
          title: "Margin math",
          body: "A $40 order with a 25% marketplace commission can lose $10 before food cost, labor, packaging, and delivery operations are counted.",
        },
      },
      {
        id: "how-much-do-apps-charge",
        heading: "How much do delivery apps charge restaurants per order?",
        answer: "Many delivery apps charge restaurants around 15% to 30% per order, depending on placement, delivery handling, and promotional agreements.",
        body: [
          "The exact number varies by contract and market, but the restaurant should model the real net revenue after commission, processing, discounts, refunds, and packaging.",
          "A direct ordering system does not remove every operational cost. It removes the percentage toll that scales up every time your own customers order from you.",
        ],
        table: {
          columns: ["Channel", "Typical cost model", "Customer data"],
          rows: [
            ["Marketplace app", "Percentage commission per order", "Limited"],
            ["Direct ordering", "Flat software fee plus payment processing", "Owned by restaurant"],
            ["Phone orders", "Staff time and manual errors", "Often incomplete"],
          ],
        },
      },
      {
        id: "how-to-move-customers-direct",
        heading: "How can restaurants get customers to order direct?",
        answer: "Restaurants get more direct orders by making the direct channel easier to find, easier to use, and more rewarding than marketplace ordering.",
        body: [
          "The direct channel should be visible on Google Business Profile, your website, social bios, receipts, table tents, packaging inserts, and QR codes.",
          "Use loyalty points, direct-only bundles, and reorder reminders to make the direct path feel useful rather than like a favor you are asking from guests.",
        ],
        bullets: ["Put direct ordering above marketplace links on your website", "Add QR codes to bags, tables, counters, and receipts", "Offer loyalty credit only on direct orders", "Send re-order campaigns to past direct customers"],
      },
      {
        id: "what-features-matter",
        heading: "What features matter in a direct ordering system?",
        answer: "The most important features are menu control, fast checkout, scheduled pickup, delivery zones, payments, kitchen notifications, and customer follow-up.",
        body: [
          "A direct ordering platform should feel operationally reliable, not just visually polished. Staff need accurate tickets, clear pickup times, modifier handling, and sold-out controls.",
          "Customers need fast mobile checkout, Apple Pay or card options where available, and confidence that their order reached the restaurant.",
        ],
        callout: {
          tone: "tip",
          title: "Start with one journey",
          body: "Launch pickup first if delivery operations are not ready. A focused launch is easier for staff and customers to trust.",
        },
      },
      {
        id: "when-loglime-fits",
        heading: "When does Loglime make sense for a restaurant?",
        answer: "Loglime makes sense when a restaurant wants a branded app, direct ordering, digital menu, loyalty, and admin panel without paying order commissions.",
        body: [
          "The current promotional package is built around an Ordering App plus Admin Panel at $149, so restaurants can start with a direct revenue channel before layering in advanced modules.",
          "It is especially useful for cafes, bakeries, quick-service restaurants, cloud kitchens, and multi-location brands that want customer retention under their own name.",
        ],
      },
    ],
    faqs: [
      { question: "Is commission-free ordering really free?", answer: "No. It means there is no percentage commission on every order. Restaurants still pay software fees and payment processing costs." },
      { question: "Can direct ordering replace DoorDash or Uber Eats?", answer: "It can reduce dependency, but many restaurants use both. The goal is to move loyal customers into the direct channel." },
      { question: "How long does a direct ordering app take to launch?", answer: "Loglime's launch target is 14 days when menu, brand assets, and payment setup are ready." },
      { question: "Do customers need to download an app to order?", answer: "No. Direct ordering can work through web, QR links, and a branded app depending on the restaurant setup." },
    ],
    conclusion: "Direct ordering is not only a checkout feature. It is a margin and customer ownership strategy. If your restaurant already has repeat customers, moving even a portion of them direct can change the economics quickly.",
  },
  {
    title: "QR Code Menus for Restaurants: Complete Guide",
    slug: "qr-code-menu-restaurants",
    excerpt: "QR code menus help restaurants keep menus current, reduce reprints, and connect dine-in guests to ordering, offers, and loyalty.",
    categorySlug: "restaurant-technology",
    authorUsername: author,
    featuredImage: "/images/loglime/qr-launch-channels-loglime.webp",
    featuredImageAlt: "Loglime QR launch channels showing restaurant QR menu access points",
    featuredImageCaption: "QR menus work best when they connect to live menu data, ordering, and guest follow-up.",
    tags: ["qr-menu", "digital-menu", "restaurant-tech"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    relatedProductSlugs: ["qr-menu", "digital-menu"],
    intro: [
      "A QR code menu is a scannable link that opens a restaurant's digital menu on a guest's phone without requiring an app download.",
      "QR menus are useful when they reduce friction for guests and reduce operational work for staff. In this guide, we will cover where to place QR codes, what features matter, and how to avoid a low-quality guest experience.",
    ],
    sections: [
      {
        id: "what-is-qr-menu",
        heading: "What is a QR code menu?",
        answer: "A QR code menu is a printed or digital QR code that opens a live restaurant menu in a mobile browser.",
        body: ["The best QR menu is not a static PDF. It is a live menu that can update prices, photos, sold-out items, dietary labels, and ordering links instantly."],
        bullets: ["No app download", "Works from tables, counters, packaging, and windows", "Can connect to ordering and loyalty", "Updates instantly when the menu changes"],
      },
      {
        id: "where-to-place",
        heading: "Where should restaurants place QR menu codes?",
        answer: "Place QR menu codes wherever guests naturally decide what to order: tables, counters, windows, receipts, takeaway bags, and Google Business posts.",
        body: ["Placement should match guest intent. Table QR codes support dine-in browsing. Packaging QR codes support repeat ordering after takeaway. Window QR codes support after-hours menu discovery."],
      },
      {
        id: "pdf-vs-live-menu",
        heading: "Is a PDF menu good enough for QR codes?",
        answer: "A PDF menu is better than nothing, but a live digital menu is easier to read on mobile and easier for staff to update.",
        body: ["PDF menus often require pinch zooming and can become outdated quickly. A live menu can show categories, modifiers, sold-out flags, photos, allergens, and links into ordering."],
        table: {
          columns: ["Menu type", "Best use", "Main limitation"],
          rows: [
            ["PDF menu", "Quick fallback", "Hard to update and read"],
            ["Live digital menu", "Daily operations", "Needs setup"],
            ["Ordering menu", "Direct revenue", "Requires payment and fulfillment flow"],
          ],
        },
      },
      {
        id: "qr-menu-seo",
        heading: "Can QR menus help restaurant SEO?",
        answer: "A public digital menu can help search engines understand your food, categories, location relevance, and current offerings.",
        body: ["Search engines cannot use a table QR code by itself, but they can crawl the menu URL if it is public and linked from your website. This helps your menu content become discoverable beyond the dining room."],
      },
    ],
    faqs: [
      { question: "Do guests need an app for a QR menu?", answer: "No. A QR code can open a mobile web menu directly in the browser." },
      { question: "Should a QR menu be a PDF?", answer: "A PDF can work as a backup, but a live digital menu is usually better for readability and updates." },
      { question: "Can QR codes connect to ordering?", answer: "Yes. A QR menu can link directly into pickup, delivery, or table ordering flows." },
      { question: "How many QR codes does a restaurant need?", answer: "Most restaurants use table codes, counter codes, packaging inserts, and one general menu code for marketing." },
    ],
    conclusion: "A QR code is only the doorway. The quality of the menu behind it decides whether guests trust it, use it, and return through it later.",
  },
  {
    title: "Restaurant Loyalty Programs That Actually Work",
    slug: "restaurant-loyalty-program",
    excerpt: "A restaurant loyalty program works when it rewards repeat behavior, stays easy to understand, and lives inside the ordering experience.",
    categorySlug: "restaurant-marketing",
    authorUsername: author,
    featuredImage: "/images/loglime/loyalty-and-offers-loglime.webp",
    featuredImageAlt: "Loglime loyalty and offers interface for restaurants",
    featuredImageCaption: "Loyalty works best when offers are tied directly to ordering behavior.",
    tags: ["loyalty-program", "retention", "repeat-customers"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    relatedProductSlugs: ["loyalty", "restaurant-app"],
    intro: [
      "A restaurant loyalty program is a repeat-customer system that gives guests a clear reason to come back directly instead of ordering through a marketplace.",
      "The strongest programs are simple, mobile-friendly, and connected to real purchase behavior. In this guide, we will cover points, stamps, direct offers, and how to avoid loyalty programs that customers forget.",
    ],
    sections: [
      {
        id: "what-makes-loyalty-work",
        heading: "What makes a restaurant loyalty program work?",
        answer: "A loyalty program works when the reward is easy to understand, valuable enough to notice, and connected to how customers already order.",
        body: ["A complicated program creates staff questions and customer confusion. A simple rule like earn points on direct orders or buy nine coffees, get one free is easier to remember."],
      },
      {
        id: "points-or-stamps",
        heading: "Should restaurants use points or stamp cards?",
        answer: "Use stamp cards for simple repeat purchases and points for broader menus with different order values.",
        body: ["Coffee shops and bakeries often do well with stamps. Restaurants with higher ticket variation may prefer points because a $70 family order should usually earn more than a $9 snack order."],
        table: {
          columns: ["Model", "Best for", "Example"],
          rows: [
            ["Stamp card", "Cafes and bakeries", "Buy 9 coffees, get 1 free"],
            ["Points", "QSR and full menus", "Earn 1 point per dollar"],
            ["Offer wallet", "Campaigns", "Free side with direct order"],
          ],
        },
      },
      {
        id: "direct-ordering",
        heading: "How does loyalty increase direct orders?",
        answer: "Loyalty increases direct orders by giving customers a benefit they cannot get on third-party marketplaces.",
        body: ["Direct-only rewards train guests to start at your app or website. This is more sustainable than discounting on marketplaces because you keep the customer relationship."],
        callout: {
          tone: "tip",
          title: "Make the direct path worth remembering",
          body: "A small reward that is easy to redeem often beats a large reward customers do not understand.",
        },
      },
      {
        id: "what-to-measure",
        heading: "What should restaurants measure in loyalty?",
        answer: "Restaurants should measure repeat order rate, direct order share, average order value, reward redemption, and customer lapse rate.",
        body: ["A loyalty dashboard should answer whether customers are coming back more often, ordering directly more often, and increasing order value over time."],
      },
    ],
    faqs: [
      { question: "Do loyalty programs work for small restaurants?", answer: "Yes, when the program is simple and tied to repeat behavior that already exists." },
      { question: "What is better, points or stamps?", answer: "Stamps are simpler for frequent low-ticket purchases. Points are better when order values vary." },
      { question: "Should rewards work on delivery app orders?", answer: "Most restaurants get more value by making rewards direct-only." },
      { question: "Can loyalty live inside a restaurant app?", answer: "Yes. A branded restaurant app can combine ordering, offers, push notifications, and loyalty." },
    ],
    conclusion: "Loyalty should not be a decoration beside ordering. It should be one of the reasons customers choose your direct channel first.",
  },
  {
    title: "How to Reduce Restaurant No-Shows",
    slug: "reduce-restaurant-no-shows",
    excerpt: "Restaurants reduce no-shows with online confirmations, reminder messages, waitlists, deposits for high-risk slots, and cleaner booking rules.",
    categorySlug: "restaurant-operations",
    authorUsername: author,
    featuredImage: "/images/loglime/table-booking-apps-loglime.webp",
    featuredImageAlt: "Loglime table booking app screen for restaurant reservations",
    featuredImageCaption: "Booking systems reduce manual follow-up when confirmations and reminders are automated.",
    tags: ["table-booking", "reservations", "no-shows"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    relatedProductSlugs: ["table-booking", "qr-menu"],
    intro: [
      "A restaurant no-show is a reservation that does not arrive and does not cancel, leaving a table empty during a slot that could have generated revenue.",
      "Reducing no-shows is mostly about clear confirmation, timely reminders, and making cancellation easy before the slot is wasted. In this guide, we will cover practical booking rules and reminder flows.",
    ],
    sections: [
      {
        id: "why-no-shows-happen",
        heading: "Why do restaurant no-shows happen?",
        answer: "No-shows happen because guests forget, overbook themselves, cannot cancel easily, or do not feel committed to the reservation.",
        body: ["A good table booking system reduces these causes with confirmation messages, calendar links, reminder timing, and frictionless cancellation."],
      },
      {
        id: "best-reminders",
        heading: "What reminder schedule reduces no-shows?",
        answer: "A practical reminder schedule is one confirmation immediately, one reminder 24 hours before, and one short reminder a few hours before the booking.",
        body: ["The final reminder should include a clear cancel or modify link. This helps restaurants recover the table earlier instead of discovering the no-show at service time."],
      },
      {
        id: "deposits",
        heading: "Should restaurants take deposits for bookings?",
        answer: "Deposits make sense for high-demand slots, large parties, tasting menus, and holiday service, but they can be too heavy for casual bookings.",
        body: ["Use deposits selectively. The goal is commitment, not creating enough friction that good guests avoid booking."],
      },
      {
        id: "booking-rules",
        heading: "What booking rules should restaurants set?",
        answer: "Restaurants should define party size limits, table duration, cutoff times, waitlist behavior, and cancellation windows.",
        body: ["Clear rules give staff fewer exceptions to manage and give guests fewer surprises. The rules should be visible before confirmation."],
      },
    ],
    faqs: [
      { question: "What is a normal restaurant no-show rate?", answer: "It varies by market and restaurant type, but any repeated empty prime-time table deserves a reminder and cancellation process." },
      { question: "Do SMS reminders reduce no-shows?", answer: "Yes. SMS reminders are often noticed faster than email and can prompt guests to confirm or cancel." },
      { question: "Should every booking require a deposit?", answer: "No. Deposits are best for large parties, premium slots, special events, and high-risk reservations." },
      { question: "Can online booking replace phone reservations?", answer: "It can reduce phone work, but many restaurants still keep phone support for special cases." },
    ],
    conclusion: "No-show reduction is not one feature. It is a booking workflow that helps guests remember, cancel early, and respect the table they reserved.",
  },
  {
    title: "Digital Menu vs Printed Menu: Cost Comparison",
    slug: "digital-menu-printed-menu-cost",
    excerpt: "Digital menus reduce reprint costs, improve menu accuracy, and help restaurants connect menu browsing to ordering and loyalty.",
    categorySlug: "restaurant-technology",
    authorUsername: author,
    featuredImage: "/images/loglime/digital-menu-loglime.webp",
    featuredImageAlt: "Loglime digital menu interface for restaurant menu management",
    featuredImageCaption: "A live digital menu can update availability, pricing, and item details in seconds.",
    tags: ["digital-menu", "menu-engineering", "restaurant-tech"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    relatedProductSlugs: ["digital-menu", "qr-menu"],
    intro: [
      "A digital menu is a live restaurant menu that can be updated online, while a printed menu is a fixed physical asset that must be redesigned and reprinted when details change.",
      "The real comparison is not paper versus screen. It is operational flexibility, menu accuracy, and how quickly the restaurant can respond to price changes, sold-out items, and seasonal offers.",
    ],
    sections: [
      {
        id: "true-cost",
        heading: "What is the true cost of printed menus?",
        answer: "The true cost of printed menus includes design, printing, staff time, delays, waste, and revenue lost when outdated items or prices create confusion.",
        body: ["Printed menus are predictable until the restaurant changes prices, photos, item availability, allergens, or seasonal offerings. Then the menu becomes a cost and accuracy problem."],
      },
      {
        id: "digital-advantages",
        heading: "What are the main advantages of a digital menu?",
        answer: "A digital menu is easier to update, easier to connect to ordering, and easier to personalize by daypart or availability.",
        body: ["Restaurants can mark items sold out, adjust modifiers, highlight high-margin items, and connect menu browsing to a direct order flow."],
        bullets: ["Instant item updates", "Sold-out flags", "Allergen and dietary labels", "Menu photos", "Links to direct ordering"],
      },
      {
        id: "keep-printed",
        heading: "Should restaurants still keep printed menus?",
        answer: "Many restaurants should keep a small printed fallback while using the digital menu as the source of truth.",
        body: ["Printed menus remain useful for accessibility, brand experience, and guests who prefer physical menus. The digital menu should still be the easiest place to keep details current."],
      },
      {
        id: "menu-engineering",
        heading: "Can a digital menu improve menu engineering?",
        answer: "Yes. Digital menus can highlight profitable items, test category order, and connect item performance to ordering data.",
        body: ["A restaurant can learn which items guests view, order, ignore, or reorder. That feedback is harder to collect from a static printed menu."],
      },
    ],
    faqs: [
      { question: "Is a digital menu cheaper than a printed menu?", answer: "It depends on update frequency. The more often a restaurant changes its menu, the more valuable digital menu control becomes." },
      { question: "Can digital menus show allergens?", answer: "Yes. A good digital menu can show allergen, dietary, and ingredient notes beside items." },
      { question: "Do digital menus work with QR codes?", answer: "Yes. QR codes are one of the easiest ways to open a digital menu at the table or counter." },
      { question: "Can a digital menu connect to online ordering?", answer: "Yes. The same menu data can power browsing and ordering when the system is set up correctly." },
    ],
    conclusion: "Printed menus still have a place, but the live digital menu should be the operational source of truth for restaurants that change often.",
  },
  {
    title: "How a Cloud Kitchen Can Move Orders Direct",
    slug: "cloud-kitchen-direct-orders",
    excerpt: "Cloud kitchens can reduce platform dependency by building direct ordering channels, customer lists, QR packaging flows, and repeat-order campaigns.",
    categorySlug: "case-studies",
    authorUsername: author,
    featuredImage: "/images/loglime/online-ordering-system-loglime.webp",
    featuredImageAlt: "Direct ordering interface for a cloud kitchen brand",
    featuredImageCaption: "Cloud kitchens need direct channels because marketplaces often own demand and customer memory.",
    tags: ["cloud-kitchen", "case-study", "direct-ordering"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    relatedProductSlugs: ["online-ordering", "restaurant-app"],
    intro: [
      "A cloud kitchen depends on digital demand, so the channel that owns the customer relationship has major control over margin and repeat orders.",
      "This case-style guide shows how a cloud kitchen can move from marketplace-only demand toward a blended model where direct ordering becomes a real repeat revenue channel.",
    ],
    sections: [
      {
        id: "starting-point",
        heading: "Why are cloud kitchens dependent on delivery platforms?",
        answer: "Cloud kitchens often rely on delivery platforms because they lack dine-in foot traffic and need digital discovery from day one.",
        body: ["That discovery is useful, but it can also mean platform commissions, limited customer data, and little brand memory after the order is delivered."],
      },
      {
        id: "direct-channel",
        heading: "What direct channel should a cloud kitchen build first?",
        answer: "A cloud kitchen should usually start with a mobile-friendly direct ordering page connected to packaging QR codes and repeat-order offers.",
        body: ["The first audience is not strangers. It is customers who already received your food through any channel and might reorder if the direct path is obvious."],
      },
      {
        id: "packaging",
        heading: "How can packaging create direct repeat orders?",
        answer: "Packaging creates direct repeat orders when every bag, box, and receipt includes a QR code with a direct-only offer or loyalty incentive.",
        body: ["The offer should be simple: order direct next time for points, a free add-on, or a direct-only bundle."],
      },
      {
        id: "measurement",
        heading: "What should cloud kitchens measure?",
        answer: "Cloud kitchens should measure direct order share, repeat order rate, customer acquisition cost, average order value, and commission saved.",
        body: ["The goal is not to turn off marketplaces overnight. The goal is to make direct orders a growing share of repeat revenue."],
      },
    ],
    faqs: [
      { question: "Can a cloud kitchen survive without delivery platforms?", answer: "Some can, but most should treat direct ordering as a margin and retention layer rather than an immediate replacement." },
      { question: "What is the fastest direct ordering tactic?", answer: "Packaging QR codes with a direct-only reorder incentive are often the fastest first tactic." },
      { question: "Does a cloud kitchen need a branded app?", answer: "A branded app helps when repeat frequency is high enough, but a direct web ordering flow can launch first." },
      { question: "How does Loglime help cloud kitchens?", answer: "Loglime provides direct ordering, branded app options, digital menus, and admin controls for customer-owned channels." },
    ],
    conclusion: "For cloud kitchens, direct ordering is a long-term asset. Every package that leaves the kitchen can invite the next order back into your own channel.",
  },
];

export const blogTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();

export function getBlogCategory(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}

export function getBlogAuthor(username: string) {
  return blogAuthors.find((item) => item.username === username);
}

export function getBlogPost(categorySlug: string, slug: string) {
  return blogPosts.find((post) => post.categorySlug === categorySlug && post.slug === slug);
}

export function getPublishedBlogPosts() {
  return [...blogPosts].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getPostsByCategory(categorySlug: string) {
  return getPublishedBlogPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getPostsByTag(tag: string) {
  return getPublishedBlogPosts().filter((post) => post.tags.includes(tag));
}

export function getPostsByAuthor(username: string) {
  return getPublishedBlogPosts().filter((post) => post.authorUsername === username);
}

export function getAdjacentPosts(post: BlogPost) {
  const posts = getPostsByCategory(post.categorySlug);
  const index = posts.findIndex((item) => item.slug === post.slug);
  return {
    previous: index >= 0 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined,
  };
}

export function getRelatedPosts(post: BlogPost) {
  return getPublishedBlogPosts()
    .filter((item) => item.slug !== post.slug && (item.categorySlug === post.categorySlug || item.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3);
}

export function searchBlogPosts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return getPublishedBlogPosts();
  return getPublishedBlogPosts().filter((post) => {
    const haystack = [post.title, post.excerpt, post.categorySlug, post.tags.join(" "), ...post.intro, ...post.sections.flatMap((section) => [section.heading, section.answer, ...section.body])].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export function getPostWordCount(post: BlogPost) {
  const text = [post.title, post.excerpt, ...post.intro, ...post.sections.flatMap((section) => [section.heading, section.answer, ...section.body, ...(section.bullets ?? [])]), ...post.faqs.flatMap((faq) => [faq.question, faq.answer]), post.conclusion].join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getReadingTime(post: BlogPost) {
  return Math.max(1, Math.ceil(getPostWordCount(post) / 200));
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

export function getBlogPostUrl(post: BlogPost) {
  return `${siteUrl}/blog/${post.categorySlug}/${post.slug}`;
}

export function getBlogCategoryUrl(category: BlogCategory) {
  return `${siteUrl}/blog/${category.slug}`;
}

export function getBlogBreadcrumbs(post: BlogPost) {
  const category = getBlogCategory(post.categorySlug);
  return [
    { name: "Home", item: siteUrl },
    { name: "Blog", item: `${siteUrl}/blog` },
    { name: category?.name ?? "Category", item: `${siteUrl}/blog/${post.categorySlug}` },
    { name: post.title, item: getBlogPostUrl(post) },
  ];
}

export function getArticleSchema(post: BlogPost) {
  const authorProfile = getBlogAuthor(post.authorUsername);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.featuredImage}`,
    author: {
      "@type": "Person",
      name: authorProfile?.name ?? "Loglime",
      url: `${siteUrl}/blog/author/${post.authorUsername}`,
      jobTitle: authorProfile?.roleTitle,
      knowsAbout: authorProfile?.expertise,
    },
    publisher: {
      "@type": "Organization",
      name: "Loglime",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon-512.png` },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: getBlogPostUrl(post),
    wordCount: getPostWordCount(post),
    timeRequired: `PT${getReadingTime(post)}M`,
  };
}

export function getFaqSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function getBreadcrumbSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: getBlogBreadcrumbs(post).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}
