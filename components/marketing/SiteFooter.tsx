import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Company",
    links: [
      ["About Loglime", "/contact"],
      ["Restaurant apps", "/products/restaurant"],
      ["Case studies", "/#customers-story"],
      ["Contact us", "/contact"]
    ]
  },
  {
    title: "Support",
    links: [
      ["FAQ", "/#faq"],
      ["Book a demo", "/demo"],
      ["Pricing", "/pricing"],
      ["Launch guide", "/demo"]
    ]
  },
  {
    title: "Legal Policies",
    links: [
      ["Terms & Conditions", "/terms"],
      ["Privacy", "/privacy"],
      ["Security", "/security"],
      ["Refund policy", "/terms"]
    ]
  }
];

const socials = ["fb", "ig", "yt", "in"];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>Apps for restaurants. Digital menus, online ordering, bookings, loyalty and customer updates in branded app packages.</p>
            <div className="footer-socials" aria-label="Social links">
              {socials.map((social) => (
                <a href="/contact" key={social}>
                  {social}
                </a>
              ))}
            </div>
          </div>
          {columns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>Copyright &copy; Loglime - smart restaurant apps for modern businesses.</span>
          <span>Customer-facing app packages for restaurants.</span>
        </div>
      </div>
    </footer>
  );
}
