import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Restaurant",
    links: [
      ["Product", "/products/restaurant"],
      ["For restaurants", "/solutions/restaurants"],
      ["Pricing", "/pricing"],
      ["Book a demo", "/demo"]
    ]
  },
  {
    title: "App packages",
    links: [
      ["Ordering app", "/products/restaurant"],
      ["Digital menu", "/products/restaurant"],
      ["Booking app", "/products/restaurant"],
      ["Loyalty app", "/products/restaurant"]
    ]
  },
  {
    title: "Company",
    links: [
      ["Contact", "/contact"],
      ["Security", "/security"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"]
    ]
  },
  {
    title: "Restaurant growth",
    links: [
      ["Online ordering", "/products/restaurant#future-modules"],
      ["Customer offers", "/products/restaurant#future-modules"],
      ["Bookings", "/products/restaurant#future-modules"],
      ["App analytics", "/products/restaurant#future-modules"]
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div style={{ display: "grid", gap: 16 }}>
            <Logo inverse />
            <p className="body" style={{ color: "rgba(255,255,255,.74)", maxWidth: 330 }}>
              Apps for restaurants. Digital menus, online ordering, bookings, loyalty and customer updates in branded app packages.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
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
          <span>2026 Loglime, Inc. Built for restaurant app sales.</span>
          <span>Restaurant apps, ready to launch</span>
        </div>
      </div>
    </footer>
  );
}
