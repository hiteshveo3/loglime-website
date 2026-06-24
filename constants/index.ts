import type { NavItem, UserRole } from "@/types/app";

export const CRM_ROLES: Exclude<UserRole, "customer">[] = ["owner", "admin", "sales", "support", "developer", "designer"];

export const CUSTOMER_ROLE: UserRole = "customer";

export const CRM_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/crm/dashboard", icon: "hgi-home-01" },
  { label: "Leads", href: "/crm/leads", icon: "hgi-user-search-01", roles: ["owner", "admin", "sales"] },
  { label: "Customers", href: "/crm/customers", icon: "hgi-user-multiple", roles: ["owner", "admin", "sales", "support"] },
  { label: "Orders", href: "/crm/orders", icon: "hgi-shopping-cart-01", roles: ["owner", "admin", "sales", "support"] },
  { label: "Projects", href: "/crm/projects", icon: "hgi-briefcase-01", roles: ["owner", "admin", "sales", "developer", "designer"] },
  { label: "Tasks", href: "/crm/tasks", icon: "hgi-task-01" },
  { label: "Support", href: "/crm/support", icon: "hgi-customer-support", roles: ["owner", "admin", "support"] },
  { label: "Communication", href: "/crm/communication", icon: "hgi-message-01", roles: ["owner", "admin", "support"] },
  { label: "Billing", href: "/crm/billing", icon: "hgi-invoice-01", roles: ["owner", "admin"] },
  { label: "Blog", href: "/crm/blog", icon: "hgi-blogger", roles: ["owner", "admin", "sales"] },
  { label: "Knowledge Base", href: "/crm/knowledge-base", icon: "hgi-book-01" },
  { label: "Calendar", href: "/crm/calendar", icon: "hgi-calendar-01" },
  { label: "Analytics", href: "/crm/analytics", icon: "hgi-presentation-bar-chart-01", roles: ["owner", "admin", "sales"] },
  { label: "Team", href: "/crm/team", icon: "hgi-user-group", roles: ["owner", "admin"] },
  { label: "Documents", href: "/crm/documents", icon: "hgi-folder-01" },
  { label: "Settings", href: "/crm/settings", icon: "hgi-settings-01", roles: ["owner", "admin"] },
];

export const PORTAL_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/portal/dashboard", icon: "hgi-home-01" },
  { label: "Projects", href: "/portal/projects", icon: "hgi-briefcase-01" },
  { label: "Orders", href: "/portal/orders", icon: "hgi-shopping-cart-01" },
  { label: "Invoices", href: "/portal/invoices", icon: "hgi-invoice-01" },
  { label: "Support", href: "/portal/support", icon: "hgi-customer-support" },
  { label: "Downloads", href: "/portal/downloads", icon: "hgi-download-01" },
  { label: "Announcements", href: "/portal/announcements", icon: "hgi-megaphone-01" },
  { label: "Settings", href: "/portal/settings", icon: "hgi-settings-01" },
];
