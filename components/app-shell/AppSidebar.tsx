import {
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  MenuSquare,
  Settings,
  ShieldCheck,
  Table2,
  Users
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const nav = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/floor", label: "Floor plan", icon: Table2 },
  { href: "/app/orders", label: "Orders", icon: ClipboardList },
  { href: "/app/kitchen", label: "Kitchen", icon: ChefHat },
  { href: "/app/menu", label: "Menu", icon: MenuSquare },
  { href: "/app/staff", label: "Staff", icon: Users },
  { href: "/app/settings", label: "Settings", icon: Settings }
];

export function AppSidebar() {
  return (
    <aside className="app-side">
      <div style={{ display: "grid", gap: 14 }}>
        <Logo href="/app/dashboard" />
        <div className="pill" style={{ width: "fit-content" }}>
          <ShieldCheck size={14} />
          Demo restaurant
        </div>
      </div>
      <nav className="app-nav" aria-label="Restaurant app navigation">
        <div className="app-nav-label">Operations</div>
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <a className="app-link" href={item.href} key={item.href}>
              <Icon size={18} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="app-side-foot">
        <div className="card card-pad" style={{ display: "grid", gap: 8 }}>
          <strong>Brioche and Co.</strong>
          <span className="body">Owner workspace. Supabase auth connects this to real users.</span>
        </div>
      </div>
    </aside>
  );
}
