export type UserRole = "owner" | "admin" | "sales" | "support" | "developer" | "designer" | "customer";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  roles?: UserRole[];
};

export type CustomerContext = {
  name: string;
  restaurantName: string;
  products: string[];
  projects: string;
  openTickets: string;
};

export type TeamContext = {
  name: string;
  role: Exclude<UserRole, "customer">;
};

export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";
