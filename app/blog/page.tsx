import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lightbulb,
  Mail,
  Menu,
  Rocket,
  Search,
  Star,
  Users
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Page - NexSaS",
  description:
    "Insights, tutorials, and company updates regarding property management technology, growth scaling, and industry trends.",
  robots: {
    index: true,
    follow: true
  }
};

const companyItems = [
  ["About Us", "See how others are using NextSaaS", Lightbulb],
  ["Services", "Explore solutions and features", BadgeCheck],
  ["Our Team", "Meet our dynamic creators", Users],
  ["Career", "Explore open role opportunities", Star],
  ["Our Manifesto", "Our core beliefs and mission statement", Rocket],
  ["Use Cases", "See our product implemented live", Lightbulb],
  ["Case Studies", "Real-world data and success statistics", Search],
  ["Testimonials", "Client feedback across operations", Users],
  ["Changelog", "Read about our latest feature releases", Rocket]
] as const;

const posts = [
  {
    title: "How to scale your property portfolio without increasing headcount",
    excerpt:
      "Discover the essential automation tools and operational workflows that top-performing property managers are using to double their door count while maintaining their existing team structure and lowering overhead costs.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    author: "Sarah Jenkins",
    role: "Sr. Property Manager",
    date: "October 12, 2026",
    read: "6 min read",
    category: "Property Management",
    href: "/blog/how-to-scale-your-property-portfolio"
  },
  {
    title: "The future of smart building technology and HVAC integration",
    excerpt:
      "Smart building technology is no longer a luxury-it's an operational necessity. We breakdown the latest trends in HVAC synchronization, IoT sensors, and how cloud dashboards bring it all together.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    author: "Michael Ray",
    role: "Tech Director",
    date: "September 28, 2026",
    read: "4 min read",
    category: "Technology",
    href: "#"
  },
  {
    title: "Announcing our new native QuickBooks integration",
    excerpt:
      "We are thrilled to announce that NexSaS now features a native, real-time integration with QuickBooks. Bidirectional sync is here to eliminate manual data entry from your accounting pipeline forever.",
    image: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1200&auto=format&fit=crop",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    author: "Daniel Kors",
    role: "Financial Lead",
    date: "September 15, 2026",
    read: "8 min read",
    category: "Company News",
    href: "#"
  }
];

const categories = [
  ["Property Management", "12"],
  ["Technology", "8"],
  ["Company News", "15"],
  ["Finance & Accounting", "6"]
] as const;

const tags = ["SaaS", "Real Estate", "Automation", "QuickBooks", "Scaling", "Updates"];

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
    <a aria-label="NexSaS home" className="blog-logo" href="#">
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

function PostCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <article className="blog-post-card">
      <a className="blog-post-image" href={post.href}>
        <Image alt="Blog Post Image" className="blog-img-cover" fill sizes="(max-width: 1040px) 100vw, 760px" src={post.image} />
      </a>
      <div className="blog-post-body">
        <div className="blog-author-row">
          <div className="blog-author">
            <Image alt="Author" height={32} src={post.authorImage} width={32} />
            <span>
              <strong>
                {post.author}
                <BadgeCheck size={15} />
              </strong>
              <small>{post.role}</small>
            </span>
          </div>
          <span className="blog-author-divider" />
          <div className="blog-date">
            <span>
              <CalendarDays size={14} />
              {post.date}
            </span>
            <small>
              <Clock3 size={14} />
              {post.read}
            </small>
          </div>
        </div>
        <span className="blog-category-pill">{post.category}</span>
        <a className="blog-post-title-link" href={post.href}>
          <h2>{post.title}</h2>
        </a>
        <p>{post.excerpt}</p>
        <a className="blog-read-link" href={post.href}>
          <span>Read article</span>
          <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}

function BlogSidebar() {
  return (
    <aside className="blog-sidebar">
      <section className="blog-widget">
        <h4>Search</h4>
        <label className="blog-search">
          <Search size={18} />
          <input placeholder="Type to search..." type="search" />
        </label>
      </section>
      <section className="blog-widget">
        <h4>Categories</h4>
        <ul className="blog-category-list">
          {categories.map(([category, count]) => (
            <li key={category}>
              <a href="#">
                <span>{category}</span>
                <small>{count}</small>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="blog-widget">
        <h4>Recent Posts</h4>
        <ul className="blog-recent-list">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <li key={post.title}>
                <a className="blog-thumb" href="#">
                  <Image alt="Thumbnail" className="blog-img-cover" fill sizes="64px" src={post.image} />
                </a>
                <span>
                  <a href="#">{post.title}</a>
                  <small>{post.date.replace("September", "Sep").replace("October", "Oct")}</small>
                </span>
              </li>
            ))}
        </ul>
      </section>
      <section className="blog-widget">
        <h4>Popular Tags</h4>
        <div className="blog-tags">
          {tags.map((tag) => (
            <a href="#" key={tag}>
              {tag}
            </a>
          ))}
        </div>
      </section>
      <section className="blog-newsletter">
        <span className="blog-newsletter-icon">
          <Mail size={25} />
        </span>
        <h4>Never miss an update</h4>
        <p>Get the latest articles delivered straight to your inbox.</p>
        <form>
          <input placeholder="Email address" type="email" />
          <button type="button">Subscribe</button>
        </form>
      </section>
    </aside>
  );
}

function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="blog-footer-inner">
        <div className="blog-footer-grid">
          <div className="blog-footer-brand">
            <a className="blog-logo" href="#">
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

export default function BlogPage() {
  return (
    <div className="blog-template">
      <BlogHeader />
      <main className="blog-main">
        <section className="blog-hero">
          <div className="blog-hero-blob blog-hero-blob-cyan" />
          <div className="blog-hero-blob blog-hero-blob-green" />
          <div className="blog-hero-content">
            <span className="blog-badge-green">Our Journal</span>
            <h1>Insights &amp; Company News</h1>
            <p>
              Explore our latest thoughts, tutorials, and updates regarding property management technology, growth scaling, and
              industry trends.
            </p>
          </div>
        </section>
        <section className="blog-layout">
          <div className="blog-content-grid">
            <div className="blog-posts">
              {posts.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
              <div className="blog-pagination">
                <button aria-label="Previous page" className="disabled" type="button">
                  <ChevronLeft size={18} />
                </button>
                {[1, 2, 3].map((page) => (
                  <button className={page === 1 ? "active" : ""} key={page} type="button">
                    {page}
                  </button>
                ))}
                <span>...</span>
                <button type="button">8</button>
                <button aria-label="Next page" type="button">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <BlogSidebar />
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  );
}
