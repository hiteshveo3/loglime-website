import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

import { CheckoutButton } from "@/components/marketing/checkout-button";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { LaunchSpots } from "@/components/marketing/launch-spots";

export const metadata: Metadata = {
  title: "Loglime Pricing — Restaurant App Packages",
  description: "One-time pricing for branded restaurant apps. Android from $149, iOS from $249, AI-powered from $399. Free setup. No monthly fees.",
  alternates: { canonical: "https://loglime.com/pricing" },
};

type Plan = {
  id: "starter" | "growth" | "scale";
  name: string;
  tagline: string;
  original: number;
  price: number;
  saving: string;
  badge?: string;
  intro: string;
  image?: string;
  groups: Array<{ title: string; items: Array<{ text: string; tone?: "warning" | "muted" }> }>;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "The essential restaurant app",
    original: 249,
    price: 149,
    saving: "SAVE 40%",
    intro: "What's included:",
    image: "/images/loglime/online-ordering-system-loglime.webp",
    groups: [
      { title: "Core App", items: ["Android App (Google Play)", "Branded Admin Panel", "Online Ordering (pickup + delivery)", "Table Booking System", "Digital Menu", "Push Notifications", "Email Order Notifications", "Real-time Kitchen Notifications", "Custom Splash Screen Design", "App Icon Design", "Multi-category Menu Organisation", "Special Offers & Promotions Section", "Operating Hours Display", "Customer Order History", "Social Media Links Integration"].map((text) => ({ text })) },
      { title: "Branding & Assets", items: ["Full Branding Setup (colours, style)", "Logo Upload — or we refine yours", "Menu & Food Photo Upload", "Restaurant Profile Page", "Contact & Info Page in App"].map((text) => ({ text })) },
      { title: "Setup", items: [{ text: "Complete Setup — Free (no hidden fees)" }, { text: "App Store Listing Copy Written" }, { text: "Your Supabase Account (free tier)" }, { text: "Google Play Console — $25 one-time (paid directly to Google by you)", tone: "warning" }] },
      { title: "Not Included", items: ["iOS / iPhone App", "Loyalty Program", "QR Menu", "AI Features"].map((text) => ({ text, tone: "muted" as const })) },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Everything in Starter + iPhone App",
    original: 349,
    price: 249,
    saving: "SAVE 29%",
    badge: "★ iOS",
    intro: "Everything in Starter, plus:",
    image: "/images/loglime/digital-menu-loglime.webp",
    groups: [
      { title: "iOS & App Store", items: [{ text: "iOS App (Apple App Store)" }, { text: "iPhone + iPad compatible build" }, { text: "Universal App Link (one link, both stores)" }, { text: "App Store Screenshots Designed" }, { text: "App Store Listing Optimised (ASO)" }, { text: "TestFlight Beta Testing before launch" }, { text: "Bilingual App Store Listing (optional)" }, { text: "Apple Developer Account — $99/year (paid directly to Apple by you)", tone: "warning" }] },
      { title: "Everything in Starter", items: [{ text: "Android App + Admin Panel" }, { text: "Online Ordering + Table Booking" }, { text: "Digital Menu + Push Notifications" }, { text: "Full Branding + Asset Setup" }, { text: "Your Supabase Account (free tier)" }, { text: "Google Play Console — $25 one-time", tone: "warning" }] },
      { title: "Not Included", items: ["Loyalty Program", "QR Menu", "AI Features"].map((text) => ({ text, tone: "muted" as const })) },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "The complete restaurant technology stack",
    original: 549,
    price: 399,
    saving: "SAVE 27%",
    badge: "AI-POWERED",
    intro: "Everything in Growth, plus:",
    image: "/images/loglime/loyalty-and-offers-loglime.webp",
    groups: [
      { title: "AI Features", items: ["AI Chatbot (custom-branded for your restaurant — answers orders, hours, menu)", "AI Menu Recommendations (suggests items based on past orders)", "Automated Push Notification Campaigns (AI decides best time + content to send)", "Smart Analytics Dashboard", "Customer Behaviour Insights", "Repeat Customer Identification", "Revenue & Peak Hours Analytics", "Customer Lifetime Value Tracking"].map((text) => ({ text })) },
      { title: "Loyalty & Engagement", items: ["Loyalty Program (points or stamp card)", "Custom Rewards & Redemption Rules", "Birthday Offers to Loyalty Members", "Customer Segmentation"].map((text) => ({ text })) },
      { title: "QR & Digital", items: ["QR Menu (scan-to-order, no app download)", "Table-specific QR Codes", "Sold-out Smart Flagging"].map((text) => ({ text })) },
      { title: "Everything in Growth", items: [{ text: "Android + iOS Apps" }, { text: "Online Ordering + Table Booking" }, { text: "Digital Menu + Push Notifications" }, { text: "Full Branding + Complete Setup" }, { text: "Google Play Console — $25 (Google)", tone: "warning" }, { text: "Apple Developer — $99/year (Apple)", tone: "warning" }] },
    ],
  },
];

const comparison = [
  ["CORE APP"], ["Android App", "yes", "yes", "yes"], ["iOS App (iPhone)", "no", "yes", "yes"], ["Universal App Link", "no", "yes", "yes"], ["Branded Admin Panel", "yes", "yes", "yes"], ["Custom App Icon", "yes", "yes", "yes"], ["Custom Splash Screen", "yes", "yes", "yes"],
  ["ORDERING & BOOKING"], ["Online Ordering (pickup + delivery)", "yes", "yes", "yes"], ["Table Booking System", "yes", "yes", "yes"], ["Real-time Kitchen Notifications", "yes", "yes", "yes"], ["Customer Order History", "yes", "yes", "yes"], ["Special Offers & Promotions", "yes", "yes", "yes"],
  ["MENU"], ["Digital Menu", "yes", "yes", "yes"], ["Multi-category Menu Organisation", "yes", "yes", "yes"], ["Operating Hours Display", "yes", "yes", "yes"], ["Sold-out Smart Flagging", "no", "no", "yes"], ["QR Menu (scan-to-order)", "no", "no", "yes"], ["Table-specific QR Codes", "no", "no", "yes"],
  ["NOTIFICATIONS"], ["Push Notifications", "yes", "yes", "yes"], ["Email Order Notifications", "yes", "yes", "yes"], ["Automated Push Campaigns (AI)", "no", "no", "yes"],
  ["LOYALTY & ENGAGEMENT"], ["Loyalty Program (points / stamps)", "no", "no", "yes"], ["Custom Rewards & Redemption", "no", "no", "yes"], ["Birthday Offers", "no", "no", "yes"], ["Customer Segmentation", "no", "no", "yes"],
  ["AI FEATURES"], ["AI Chatbot (branded for your restaurant)", "no", "no", "yes"], ["AI Menu Recommendations", "no", "no", "yes"], ["Smart Analytics Dashboard", "no", "no", "yes"], ["Customer Behaviour Insights", "no", "no", "yes"], ["Repeat Customer Identification", "no", "no", "yes"], ["Revenue & Peak Hours Analytics", "no", "no", "yes"], ["Customer Lifetime Value Tracking", "no", "no", "yes"],
  ["BRANDING & ASSETS"], ["Full Branding Setup (colours, fonts)", "yes", "yes", "yes"], ["Logo Upload or Refinement", "yes", "yes", "yes"], ["Menu & Food Photo Upload", "yes", "yes", "yes"], ["Restaurant Profile Page", "yes", "yes", "yes"], ["Contact & Info Page", "yes", "yes", "yes"], ["Social Media Links Integration", "yes", "yes", "yes"],
  ["APP STORE"], ["Google Play Store Listing", "yes", "yes", "yes"], ["App Store Listing Copy Written", "yes", "yes", "yes"], ["App Store Screenshots Designed", "no", "yes", "yes"], ["ASO Optimisation", "no", "yes", "yes"], ["TestFlight Beta Testing", "no", "yes", "yes"],
  ["SETUP & PLATFORM"], ["Complete Setup — Free", "yes", "yes", "yes"], ["Your own Supabase account (free tier)", "yes", "yes", "yes"], ["Google Play Console ⚠", "$25 (Google)", "$25 (Google)", "$25 (Google)"], ["Apple Developer Account ⚠", "—", "$99/yr (Apple)", "$99/yr (Apple)"],
] as string[][];

const pricingFaqs = [
  { question: "Is this really a one-time payment?", answer: "Yes. You pay once and the app is yours. There are no monthly SaaS fees from Loglime. The only recurring cost is the Apple Developer Account ($99/year, paid to Apple) if you are on Growth or Scale, and the optional Maintenance & Support add-on if you choose it." },
  { question: "What exactly is included in \"Free Setup\"?", answer: "We handle everything from end to end: branding configuration, menu upload, food photo upload, admin panel setup, app store account guidance, listing copy, and submission. If you have a logo, we upload it. If you need your logo refined or simplified for an app icon, we handle that too. You do not need any technical knowledge." },
  { question: "What is Supabase and why do I need my own account?", answer: "Supabase is the secure database platform that powers your app's backend — orders, bookings, customer data, and more. We use your own free Supabase account so your data belongs entirely to you, not to Loglime. For small to medium restaurants, the free tier is more than sufficient. We set it up for you as part of the included setup." },
  { question: "Why do I need a Google Play Console or Apple Developer account?", answer: "Google and Apple require every app to be published under the restaurant owner's own developer account. Google Play Console is a one-time $25 fee paid directly to Google. Apple Developer Account is $99/year paid directly to Apple. Loglime does not receive any of this." },
  { question: "How long does it take to launch?", answer: "Most restaurants are live on Android within 7–10 business days. iOS typically takes 10–14 business days due to Apple's review process. We keep you updated throughout." },
  { question: "Can I add the website later if I start with just the app?", answer: "Yes. The website add-on (from $99) can be purchased separately at any time after your app is live. It connects directly to your existing admin panel." },
  { question: "What if I need changes after launch?", answer: "Minor changes like price updates or menu edits can be done by you directly from the admin panel. For app-level changes, the Maintenance & Support add-on covers this at $29/month. Without it, changes are quoted separately." },
  { question: "Is my restaurant's customer data private?", answer: "Yes. Your customer data — orders, bookings, loyalty points, contact details — lives in your own Supabase account. Loglime does not access, sell, or use your restaurant's customer data." },
  { question: "What's the difference between the AI Chatbot in Scale and a regular chatbot?", answer: "The AI chatbot in Scale is custom-branded for your restaurant. It knows your menu, hours, ordering options, and policies. It is not a generic FAQ bot; it is built specifically around your restaurant's information." },
  { question: "Do the launch prices expire?", answer: "Yes. The discounted prices shown are available for the first 10 restaurants only. After the 10 launch spots are filled, pricing returns to original rates ($249 / $349 / $549). Currently, 8 of 10 spots have been claimed." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};

function FeatureMark({ value }: { value: string }) {
  if (value === "yes") return <i className="hgi-stroke hgi-checkmark-circle-01 text-coral" aria-label="Included" />;
  if (value === "no") return <i className="hgi-stroke hgi-cancel-01 text-slate-300" aria-label="Not included" />;
  return <span className="text-small font-semibold text-text-secondary">{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="bg-white">
      <Script id="pricing-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="mx-auto max-w-[1000px] px-4 pb-16 pt-14 lg:px-0 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-small font-bold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            ⚡ Launch Offer — First 10 restaurants only
          </div>
          <h1 className="mt-6 text-h1 text-text-primary md:text-[3.5rem] md:leading-[1.05]">Simple pricing.<br />Everything included.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-body text-text-secondary">One-time investment. No monthly SaaS fees. No hidden charges.<br className="hidden sm:block" /> We build your restaurant app, set it up completely, and hand it to you — ready to launch.</p>
        </div>

        <div className="mt-10"><LaunchSpots /></div>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const featured = plan.id === "scale";
            return (
              <article key={plan.id} className={featured ? "flex h-full flex-col rounded-3xl border-2 border-coral bg-white overflow-hidden shadow-floating" : "flex h-full flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-card"}>
                {plan.image && (
                  <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                    <Image src={plan.image} alt={plan.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                )}
                <div className={`flex flex-col ${plan.image ? "p-8" : "p-8"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-h2 text-text-primary">{plan.name}</h2>
                      <p className="mt-2 text-small text-text-secondary">{plan.tagline}</p>
                    </div>
                    {plan.badge ? <span className="w-fit rounded-full bg-coral px-3 py-1 text-[10px] font-bold text-white">{plan.badge}</span> : null}
                  </div>
                  <div className="mt-7">
                    <del className="text-slate-400">${plan.original}</del>
                    <p className="mt-1 text-5xl font-bold text-text-primary">${plan.price}</p>
                    <p className="mt-1 text-small text-text-muted">one-time</p>
                    <span className="mt-4 inline-flex rounded-full bg-coral px-3 py-1 text-caption font-bold text-white">{plan.saving}</span>
                  </div>
                  <CheckoutButton plan={plan.id} className="mt-6 w-full">Claim Your Spot →</CheckoutButton>
                  <div className="my-7 border-t border-slate-200" />
                  <p className="font-bold text-text-primary">{plan.intro}</p>
                  <div className="mt-6 space-y-7 flex-1">
                    {plan.groups.map((group) => (
                      <section key={group.title}>
                        <h3 className="text-caption uppercase tracking-wider text-text-muted">{group.title}</h3>
                        <ul className="mt-3 space-y-2.5">
                          {group.items.map((item) => (
                            <li key={item.text} className="flex items-start gap-2.5 text-small text-text-secondary">
                              {item.tone === "warning" ? (
                                <i className="hgi-stroke hgi-alert-02 mt-0.5 shrink-0 text-amber-500" />
                              ) : item.tone === "muted" ? (
                                <i className="hgi-stroke hgi-cancel-01 mt-0.5 shrink-0 text-slate-300" />
                              ) : (
                                <i className="hgi-stroke hgi-checkmark-circle-01 mt-0.5 shrink-0 text-coral" />
                              )}
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-[1000px] px-4 lg:px-0">
          <h2 className="text-center text-h1 text-text-primary">Compare everything side by side.</h2>
          <div className="custom-scrollbar mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card">
            <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
              <colgroup><col className="w-[40%]" /><col className="w-[20%]" /><col className="w-[20%]" /><col className="w-[20%]" /></colgroup>
              <thead className="sticky top-[72px] z-20 bg-white shadow-sm">
                <tr><th className="sticky left-0 z-30 bg-white p-4 text-small text-text-primary">Feature</th><th className="p-4 text-center text-small text-text-primary">Starter <span className="block text-coral">$149</span></th><th className="p-4 text-center text-small text-text-primary">Growth <span className="block text-coral">$249</span></th><th className="p-4 text-center text-small text-text-primary">Scale <span className="block text-coral">$399</span></th></tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => row.length === 1 ? (
                  <tr key={`${row[0]}-${index}`}><th colSpan={4} className="bg-slate-100 px-4 py-3 text-caption uppercase tracking-wider text-text-muted">{row[0]}</th></tr>
                ) : (
                  <tr key={`${row[0]}-${index}`} className="even:bg-slate-50">
                    <th className="sticky left-0 z-10 bg-inherit p-4 text-small font-semibold text-text-secondary">{row[0]}</th>
                    {row.slice(1).map((value, cell) => <td key={`${value}-${cell}`} className="p-4 text-center"><FeatureMark value={value} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-small leading-6 text-text-secondary">⚠ Google Play Console and Apple Developer fees are paid directly to Google and Apple by you. These are platform requirements, not Loglime charges. Supabase runs on your own free account — your data, your control.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-16 lg:px-0">
        <div className="text-center"><h2 className="text-h1 text-text-primary">Enhance your app with add-ons.</h2><p className="mt-3 text-body text-text-secondary">Add these to any plan after purchase.</p></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { icon: "hgi-globe-01", title: "Restaurant Website", description: "A branded ordering page or full restaurant website to complement your app and capture web traffic.", price: "From $99", suffix: "one-time", badge: "Add to any plan", items: ["Branded ordering page (online menu + order now)", "Mobile-optimised design", "Linked to your admin panel", "SEO-friendly structure", "Contact & info pages"] },
            { icon: "hgi-settings-01", title: "Maintenance & Support", description: "Keep your app running smoothly with ongoing technical care from the Loglime team.", price: "$29/month", suffix: "optional, cancel anytime", badge: "Optional add-on", items: ["Bug fixes & crash resolution", "App store updates (OS compatibility)", "Menu & content updates (2× per month)", "Server & Supabase monitoring", "48-hour response SLA on issues"] },
          ].map((addon) => (
            <article key={addon.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex items-start justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral-light text-coral"><i className={`hgi-stroke ${addon.icon} text-xl`} /></span><span className="rounded-full bg-slate-100 px-3 py-1 text-caption font-bold text-text-secondary">{addon.badge}</span></div>
              <h3 className="mt-5 text-h2 text-text-primary">{addon.title}</h3><p className="mt-3 text-body text-text-secondary">{addon.description}</p>
              <p className="mt-5 text-2xl font-bold text-text-primary">{addon.price} <span className="text-small font-medium text-text-muted">({addon.suffix})</span></p>
              <ul className="mt-5 space-y-2">{addon.items.map((item) => <li key={item} className="flex items-start gap-2 text-small text-text-secondary"><i className="hgi-stroke hgi-checkmark-circle-01 mt-0.5 shrink-0 text-coral" />{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-coral-light py-16">
        <div className="mx-auto max-w-[1000px] px-4 lg:px-0">
          <div className="text-center"><h2 className="text-h1 text-text-primary">What you own. What you pay for.</h2><p className="mt-3 text-body text-text-secondary">No surprises. Here&apos;s exactly what goes where.</p></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: "hgi-key-01", title: "Your App, Your Data", body: "Your restaurant app is published under your name. Your customer data lives in your own Supabase account. Your Google Play and Apple accounts hold your apps. We build it. You own it." },
              { icon: "hgi-information-circle", title: "Third-Party Fees (Not Us)", body: "These go directly to Google and Apple — not Loglime: Google Play Console is $25 one-time, Apple Developer Account is $99/year, and Supabase is free for most small restaurants." },
              { icon: "hgi-checkmark-circle-01", title: "What's Included in Every Plan", body: "Full setup. Branding configuration. Menu upload. Asset upload. App store listing copywriting. All of this is included at no extra charge in your plan price." },
            ].map((card) => <article key={card.title} className="rounded-2xl border border-white bg-white p-6 shadow-card"><i className={`hgi-stroke ${card.icon} text-2xl text-coral`} /><h3 className="mt-4 text-h3 text-text-primary">{card.title}</h3><p className="mt-3 text-body text-text-secondary">{card.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[720px] px-4 py-16">
        <h2 className="text-center text-h1 text-text-primary">Frequently asked questions about pricing.</h2>
        <div className="mt-8"><FaqAccordion items={pricingFaqs} defaultOpen={0} /></div>
      </section>

      <section className="bg-coral px-4 py-20 text-center">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-[2.5rem] font-bold leading-tight text-white">Ready to launch your restaurant app?</h2>
          <p className="mt-4 text-body text-white/80">Join 8 restaurants already building with Loglime.<br />2 launch spots remaining at these prices.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CheckoutButton plan="starter" className="w-full bg-white !text-coral hover:bg-coral-soft sm:w-auto">Claim Your Starter Spot — $149</CheckoutButton>
            <CheckoutButton plan="scale" variant="secondary" className="w-full border-2 border-white bg-transparent !text-white hover:bg-white/10 sm:w-auto">Claim Your Scale Spot — $399</CheckoutButton>
          </div>
          <p className="mt-5 text-small text-white/70">No monthly fees · Free setup included · You own your app and data</p>
          <p className="mt-8 text-small text-white/80">Not sure which plan is right for you? <button className="font-bold text-white underline underline-offset-2 hover:no-underline" data-zest-open>Chat with Zest →</button></p>
        </div>
      </section>
    </main>
  );
}
