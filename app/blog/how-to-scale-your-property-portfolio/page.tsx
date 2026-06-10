import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownLeft,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Handbag,
  Lightbulb,
  Link as LinkIcon,
  List,
  Mail,
  Menu,
  MessageCircle,
  NotebookPen,
  Rocket,
  Search,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to scale your property portfolio - NexSaS",
  description:
    "Learn how property management teams can scale portfolio operations with automation, tenant self-service, and financial reconciliation workflows.",
  robots: {
    index: true,
    follow: true
  }
};

const companyItems = [
  ["About Us", "See how others are using NextSaaS", Lightbulb],
  ["Services", "Explore solutions and features", BadgeCheck],
  ["Our Team", "Meet our dynamic creators", Users],
  ["Career", "Explore open role opportunities", Handbag],
  ["Our Manifesto", "Our core beliefs and mission statement", NotebookPen],
  ["Use Cases", "See our product implemented live", Lightbulb],
  ["Case Studies", "Real-world data and success statistics", Search],
  ["Testimonials", "Client feedback across operations", MessageCircle],
  ["Changelog", "Read about our latest feature releases", Rocket]
] as const;

const footerColumns = [
  {
    title: "Company",
    links: ["About Us", "Career Opportunities", "Case Studies", "Contact Us"]
  },
  {
    title: "Support",
    links: ["Help FAQ", "Legal Terms", "Tutorial Walkthroughs", "Technical Support"]
  },
  {
    title: "Legal Policies",
    links: ["Terms & Conditions", "Privacy Policy", "Refund Policy", "GDPR Compliance", "Affiliate Policy"]
  }
];

const tocItems = [
  ["intro", "1. The scaling dilemma in 2026", false],
  ["automation", "2. Embracing the automation mindset", false],
  ["self-service", "2.1 The power of tenant self-service", true],
  ["financial", "3. Automating financial reconciliation", false],
  ["case-study", "4. Real-world case study", false],
  ["conclusion", "5. Conclusion & Next Steps", false]
] as const;

const relatedArticles = [
  {
    title: "Announcing our new native QuickBooks integration",
    date: "Sep 15, 2026",
    image: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=150&auto=format&fit=crop"
  },
  {
    title: "The future of smart building technology",
    date: "Sep 28, 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=150&auto=format&fit=crop"
  }
];

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "blog-logo-mark blog-logo-mark-sm" : "blog-logo-mark"}>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function BlogLogo() {
  return (
    <a aria-label="NexSaS home" className="blog-logo" href="/blog">
      <LogoMark />
      <span>NexSaS</span>
    </a>
  );
}

function NavDropdown({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <li className="blog-nav-item">
      <a className="blog-nav-link" href="#">
        <span>{label}</span>
        <ChevronDown size={13} strokeWidth={2.5} />
      </a>
      <div className={wide ? "blog-mega-gap blog-mega-gap-wide" : "blog-mega-gap"}>
        <div className={wide ? "blog-mega blog-mega-wide" : "blog-mega"}>
          <div className={wide ? "blog-mega-grid" : "blog-mega-list"}>
            {companyItems.slice(0, wide ? 9 : 4).map(([title, copy, Icon], index) => (
              <a className="blog-mega-link" href="#" key={title}>
                <span className="blog-mega-icon">
                  <Icon size={21} />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
                {wide && index === 8 ? <span className="blog-mega-image">98+ Client Success Stories</span> : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function BlogHeader() {
  return (
    <header className="blog-header">
      <div className="blog-nav">
        <BlogLogo />
        <ul className="blog-nav-menu">
          <NavDropdown label="Company" wide />
          <NavDropdown label="Platform" />
          <NavDropdown label="Resources" />
          <li>
            <a className="blog-nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>
        <a className="blog-btn blog-btn-primary blog-nav-cta" href="#">
          <span>Get started</span>
        </a>
        <details className="blog-mobile">
          <summary aria-label="Open menu">
            <Menu size={28} />
          </summary>
          <div className="blog-mobile-panel">
            {["Company", "Platform", "Resources", "Pricing", "Insights Blog"].map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
            <a className="blog-btn blog-btn-primary" href="#">
              Request a Demo
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}

function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="blog-footer-inner">
        <div className="blog-footer-grid">
          <div className="blog-footer-brand">
            <a className="blog-logo" href="/blog">
              <LogoMark small />
              <span>NexSaS</span>
            </a>
            <p>Automate manual tasks and provide a premium, modern experience for all property management teams and active tenants.</p>
            <div className="blog-socials">
              {["fb", "ig", "yt", "in"].map((social) => (
                <a href="#" key={social}>
                  {social}
                </a>
              ))}
            </div>
          </div>
          {footerColumns.map((column) => (
            <div className="blog-footer-column" key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="blog-footer-bottom">
          <p>Copyright &copy; NexSaS - smart application for modern business.</p>
          <p>Centralized Property Management Cloud.</p>
        </div>
      </div>
    </footer>
  );
}

function AuthorMeta() {
  return (
    <div className="blog-detail-meta-row">
      <a className="blog-detail-person" href="#author-bio">
        <Image
          alt="Sarah Jenkins"
          height={48}
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
          width={48}
        />
        <span>
          <strong>
            Sarah Jenkins
            <BadgeCheck size={18} />
          </strong>
          <small>Sr. Property Manager, CPM</small>
        </span>
      </a>
      <a className="blog-detail-person blog-detail-reviewer" href="#">
        <span className="blog-detail-reviewer-photo">
          <Image
            alt="Michael Ray"
            height={48}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
            width={48}
          />
          <span>
            <Check size={10} />
          </span>
        </span>
        <span>
          <strong>Michael Ray</strong>
          <small>Fact-checked by Tech Director</small>
        </span>
      </a>
      <div className="blog-detail-date">
        <span>
          <CalendarDays size={18} />
          Published: Oct 12, 2026
        </span>
        <small>
          <Clock size={14} />
          Updated: Nov 1, 2026
          <b>•</b>
          <BookOpen size={14} />
          12 min read
        </small>
      </div>
    </div>
  );
}

function TableOfContents({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={mobile ? "blog-detail-mobile-toc" : "blog-detail-toc"}>
      {mobile ? <h4>Table of Contents</h4> : null}
      <ul>
        {tocItems.map(([id, label, nested], index) => (
          <li key={id}>
            <a className={`${nested ? "nested" : ""} ${index === 0 ? "active" : ""}`} href={`#${id}`}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ArticleSidebar() {
  return (
    <aside className="blog-detail-sidebar">
      <div className="blog-detail-sticky">
        <section className="blog-detail-card">
          <h4 className="blog-detail-card-title">
            <List size={21} />
            On this page
          </h4>
          <TableOfContents />
        </section>
        <section className="blog-detail-card">
          <h4 className="blog-detail-card-title">Related Articles</h4>
          <ul className="blog-detail-related">
            {relatedArticles.map((article) => (
              <li key={article.title}>
                <a className="blog-detail-related-image" href="#">
                  <Image alt="Thumbnail" className="blog-img-cover" fill sizes="80px" src={article.image} />
                </a>
                <span>
                  <a href="#">{article.title}</a>
                  <small>{article.date}</small>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="blog-detail-newsletter">
          <span className="blog-detail-newsletter-orb top" />
          <span className="blog-detail-newsletter-orb bottom" />
          <span className="blog-detail-newsletter-icon">
            <Mail size={26} />
          </span>
          <h4>Property Insights</h4>
          <p>Get the latest scaling tips and feature updates delivered to your inbox weekly.</p>
          <form>
            <input placeholder="Email address" type="email" />
            <button type="button">Subscribe Now</button>
          </form>
        </section>
      </div>
    </aside>
  );
}

function Comments() {
  return (
    <section className="blog-detail-comments">
      <div className="blog-detail-comments-head">
        <h3>Discussions</h3>
        <span>3 Comments</span>
      </div>
      <div className="blog-detail-comment-form">
        <h4>Join the conversation</h4>
        <p>Your email address will not be published. Required fields are marked *</p>
        <form>
          <div className="blog-detail-form-grid">
            <label>
              <span>Name *</span>
              <input required type="text" />
            </label>
            <label>
              <span>Email *</span>
              <input required type="email" />
            </label>
          </div>
          <label>
            <span>Comment *</span>
            <textarea required rows={5} />
          </label>
          <button type="button">Post Comment</button>
        </form>
      </div>
      <div className="blog-detail-comment-list">
        <article className="blog-detail-comment">
          <Image
            alt="Marcus Thompson"
            height={64}
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
            width={64}
          />
          <div>
            <header>
              <h5>Marcus Thompson</h5>
              <span>Oct 13, 2026 at 9:24 am</span>
            </header>
            <p>
              This is a fantastic breakdown. We struggled heavily with headcount bloat last year until we finally migrated our
              maintenance pipeline to a digital portal. The phone literally stopped ringing off the hook within a week of rollout.
            </p>
            <button type="button">
              <ArrowDownLeft size={16} />
              Reply
            </button>
          </div>
        </article>
        <article className="blog-detail-comment blog-detail-comment-reply">
          <Image
            alt="Sarah Jenkins"
            height={56}
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
            width={56}
          />
          <div>
            <header>
              <h5>
                Sarah Jenkins
                <b>Author</b>
              </h5>
              <span>Oct 13, 2026 at 11:05 am</span>
            </header>
            <p>
              Glad to hear it resonated, Marcus! Getting tenants to actually adopt the app is usually the hardest part, but once
              they do, the operational savings are massive as you have seen.
            </p>
            <button type="button">
              <ArrowDownLeft size={16} />
              Reply
            </button>
          </div>
        </article>
        <article className="blog-detail-comment last">
          <span className="blog-detail-initials">EL</span>
          <div>
            <header>
              <h5>Elena Rodriguez</h5>
              <span>Oct 14, 2026 at 2:15 pm</span>
            </header>
            <p>
              I am curious about the QuickBooks sync mentioned. Does the platform handle multi-entity accounting seamlessly? We
              manage portfolios for multiple LLCs and need strict ledger separation across the board.
            </p>
            <button type="button">
              <ArrowDownLeft size={16} />
              Reply
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function BlogArticlePage() {
  return (
    <div className="blog-template">
      <BlogHeader />
      <main className="blog-detail-main">
        <section className="blog-detail-hero">
          <div className="blog-detail-hero-blob blog-detail-hero-blob-blue" />
          <div className="blog-detail-hero-blob blog-detail-hero-blob-green" />
          <div className="blog-detail-hero-inner">
            <nav className="blog-detail-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={13} />
              <a href="#">Resources</a>
              <ChevronRight size={13} />
              <a href="/blog">Blog</a>
              <ChevronRight size={13} />
              <span>Property Management</span>
            </nav>
            <h1>How to scale your property portfolio without increasing headcount in 2026</h1>
            <AuthorMeta />
          </div>
        </section>

        <section className="blog-detail-layout">
          <div className="blog-detail-grid">
            <div className="blog-detail-content">
              <div className="blog-detail-featured-image">
                <Image
                  alt="Modern office showing scaling business"
                  className="blog-img-cover"
                  fill
                  priority
                  sizes="(max-width: 1040px) 100vw, 800px"
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                />
              </div>

              <section className="blog-detail-overview">
                <span className="blog-detail-overview-accent" />
                <h3>
                  <span>
                    <Lightbulb size={22} fill="currentColor" />
                  </span>
                  Article Overview & Key Takeaways
                </h3>
                <ul>
                  <li>
                    <CheckCircle size={22} fill="currentColor" />
                    <span>
                      <strong>Automation over hiring:</strong> How automating rent collection and maintenance can save up to 40
                      hours per week per property manager.
                    </span>
                  </li>
                  <li>
                    <CheckCircle size={22} fill="currentColor" />
                    <span>
                      <strong>Tech-stack consolidation:</strong> Reducing your software bloat from 5 tools down to 1 centralized
                      system cuts operational costs by 22%.
                    </span>
                  </li>
                  <li>
                    <CheckCircle size={22} fill="currentColor" />
                    <span>
                      <strong>Tenant self-service:</strong> Empowering tenants with an app reduces inbound support calls by over
                      60%, freeing up your team&apos;s bandwidth.
                    </span>
                  </li>
                </ul>
              </section>

              <TableOfContents mobile />

              <article className="blog-article-content">
                <p id="intro">
                  The property management industry is currently facing a unique paradox. Demand for high-quality rental units is
                  soaring across urban centers, portfolio sizes are increasing exponentially as institutional capital enters the
                  market, yet finding and retaining skilled operational staff has literally never been more difficult. For
                  mid-sized agencies looking to double their door count over the next 24 months, the traditional operational model
                  of <span className="blog-highlight-text">&quot;add 50 doors, hire 1 manager&quot; is fundamentally and financially broken.</span>
                </p>
                <p>
                  We have analyzed data from over 2,000 property management firms. The ones succeeding are not simply grinding
                  harder; they are working smarter. So, how do top-tier firms manage to scale their operations by 200% while
                  maintaining the exact same headcount? The secret lies entirely in workflow optimization, tech-stack
                  consolidation, and an aggressive approach to eliminating manual data entry.
                </p>

                <h2 id="automation">Embracing the automation mindset</h2>
                <p>
                  Scaling without hiring requires a fundamental shift in how your entire team views their daily tasks. A property
                  manager should not be treated as a glorified data-entry clerk. Their true value to your business lies in
                  relationship building, high-level dispute resolution, and asset optimization. Everything else must be
                  systematically automated.
                </p>

                <blockquote>
                  &quot;If a specific operational task requires clicking the exact same buttons every single month - like generating
                  standard rent invoices, calculating late fees, or dispatching a plumber for a leaky faucet - software should be
                  doing it, not a human being. Your team is too valuable for repetitive clicking.&quot;
                </blockquote>

                <p>
                  Consider the standard rent collection cycle. Historically, this involved logging into a bank portal,
                  cross-referencing paper bank statements, manually updating individual tenant ledgers, and sending manual emails
                  to late payers. Today, unified systems handle this entirely in the background. Invoices are auto-generated 7 days
                  before the first of the month, late fees are auto-applied precisely based on custom lease terms, and ledgers are
                  synchronized with accounting software in real-time.
                </p>

                <h3 id="self-service">The power of tenant self-service</h3>
                <p>
                  One of the largest, yet most invisible, drains on a property team&apos;s time is inbound administrative
                  communication. Questions like &quot;When is the plumber coming?&quot;, &quot;How do I pay rent online?&quot;, or
                  &quot;Can I get a copy of my lease agreement?&quot; can consume up to 40% of a property manager&apos;s day.
                </p>
                <p>
                  By implementing a robust, intuitive tenant portal, you effectively shift the administrative burden away from your
                  staff and directly to the end-user. When tenants have a 24/7 mobile app where they can view their live ledger
                  balance, submit categorized photos of maintenance issues, and download compliance documents instantly, inbound
                  phone call volume drops dramatically.
                </p>
                <ul>
                  <li>
                    <strong>Reduced call volume:</strong> Participating agencies report an average 60% drop in phone calls within 3
                    months of strict portal adoption.
                  </li>
                  <li>
                    <strong>Faster triage and resolution:</strong> Tenants are required to provide photos and select specific
                    categories for maintenance up-front, allowing auto-dispatch algorithms to send the right contractor instantly.
                  </li>
                  <li>
                    <strong>Higher tenant satisfaction:</strong> Modern renters, particularly Gen Z and Millennials, vastly prefer
                    asynchronous, app-based communication over making phone calls during business hours.
                  </li>
                </ul>

                <h2 id="financial">Automating financial reconciliation</h2>
                <p>
                  If tenant communication is the biggest time drain, financial reconciliation is the biggest risk factor. Managing
                  escrow accounts, separating operational funds, holding security deposits, and paying out owners accurately
                  requires precision. When done manually on spreadsheets, the error rate is surprisingly high.
                </p>
                <p>
                  Scaling portfolios utilize bidirectional accounting integrations. When a tenant pays rent via the portal, the
                  transaction should not just mark the invoice as &quot;paid.&quot; The system should automatically route the
                  management fee to the agency account, route the remainder to the owner&apos;s account, and log the exact journal
                  entry into QuickBooks or Xero without a human ever touching a keyboard.{" "}
                  <span className="blog-highlight-text">Firms utilizing this method process month-end close in 4 hours instead of 4 days.</span>
                </p>

                <h2 id="case-study">Real-world case study: Elevate Properties</h2>
                <p>
                  To illustrate this, let&apos;s look at <strong>Elevate Properties</strong>, a mid-sized agency managing 400 doors
                  in the Midwest. In 2024, they employed 4 full-time property managers, maintaining an industry-standard 100:1
                  ratio. In early 2025, they acquired a massive new block of 300 doors. The leadership team initially planned to
                  hire 3 new staff members to handle the load.
                </p>

                <Image
                  alt="Data analysis showing growth and scaling metrics"
                  height={620}
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                  width={1200}
                />

                <p>
                  Facing a tight labor market and shrinking margins, they decided to pause hiring. Instead, they spent 30 days
                  migrating their disparate legacy systems into a single, unified cloud platform.
                </p>
                <p>
                  By forcing 95% of their tenants onto auto-pay through the portal and utilizing AI-driven maintenance triaging to
                  handle initial contractor dispatch, they successfully absorbed the 300 new doors without making a single
                  operational hire.
                </p>
                <p>
                  Their door-to-manager ratio shifted from 100:1 to an impressive 175:1. This operational leverage massively
                  increased their profit margins while actually improving their tenant satisfaction scores due to faster automated
                  response times.
                </p>

                <h2 id="conclusion">Conclusion & Next Steps</h2>
                <p>
                  Scaling your property portfolio does not have to mean scaling your payroll and dealing with the headaches of
                  constant hiring and training. By auditing your team&apos;s current daily workflows, aggressively identifying
                  repetitive manual tasks, and investing in a unified property management platform, you can unlock unprecedented
                  growth.
                </p>
                <p>
                  Your software should work for you, not the other way around. Ready to see how the right tools can help you
                  achieve a 200:1 door-to-manager ratio while improving service quality?{" "}
                  <a href="#">Schedule a customized strategic demo with our team today</a>.
                </p>
              </article>

              <div className="blog-detail-tags">
                <span>Topics:</span>
                {["Scaling Portfolios", "Automation", "Financial Operations"].map((tag) => (
                  <a href="#" key={tag}>
                    {tag}
                  </a>
                ))}
              </div>

              <section className="blog-detail-author-bio" id="author-bio">
                <div className="blog-detail-author-photo">
                  <Image
                    alt="Sarah Jenkins"
                    height={144}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop"
                    width={144}
                  />
                  <BadgeCheck size={27} />
                </div>
                <div>
                  <h3>Written by Sarah Jenkins</h3>
                  <p>
                    Sarah is a Certified Property Manager with over 12 years of experience managing multi-family and commercial
                    real estate portfolios across the US. She specializes in operational efficiency, prop-tech implementation, and
                    scaling business models. She is a regular contributor to the National Real Estate Journal.
                  </p>
                  <div>
                    <a aria-label="LinkedIn" href="#">
                      in
                    </a>
                    <a aria-label="Twitter" href="#">
                      x
                    </a>
                    <a aria-label="Website" href="#">
                      <LinkIcon size={18} />
                    </a>
                  </div>
                </div>
              </section>

              <Comments />
            </div>

            <ArticleSidebar />
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  );
}
