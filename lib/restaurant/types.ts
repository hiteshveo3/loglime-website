export type Role = "owner" | "manager" | "server" | "kitchen" | "cashier";

export type TableStatus = "available" | "seated" | "ordered" | "ready" | "needs_help" | "closed";

export type OrderStatus = "new" | "preparing" | "ready" | "served" | "cancelled";

export type PaymentStatus = "unpaid" | "authorized" | "paid" | "refunded";

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  prepMinutes: number;
};

export type RestaurantTable = {
  id: string;
  label: string;
  area: string;
  seats: number;
  status: TableStatus;
  openOrderId?: string;
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  status: OrderStatus;
};

export type Order = {
  id: string;
  tableLabel: string;
  server: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  openedAt: string;
  items: OrderItem[];
};

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "invited";
};
