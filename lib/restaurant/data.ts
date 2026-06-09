import type { MenuItem, Order, RestaurantTable, StaffMember } from "@/lib/restaurant/types";

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    category: "Mains",
    name: "Smash burger",
    description: "Double patty, cheddar, house pickles and lime aioli.",
    price: 14,
    available: true,
    prepMinutes: 12
  },
  {
    id: "m2",
    category: "Mains",
    name: "Wild mushroom risotto",
    description: "Arborio rice, parmesan, herbs and roasted mushrooms.",
    price: 18,
    available: true,
    prepMinutes: 16
  },
  {
    id: "m3",
    category: "Starters",
    name: "Citrus burrata",
    description: "Burrata, blood orange, basil oil and toasted sourdough.",
    price: 11,
    available: true,
    prepMinutes: 8
  },
  {
    id: "m4",
    category: "Drinks",
    name: "Mint lime cooler",
    description: "Fresh mint, lime, soda and crushed ice.",
    price: 6,
    available: true,
    prepMinutes: 3
  },
  {
    id: "m5",
    category: "Desserts",
    name: "Pistachio creme brulee",
    description: "Classic custard, pistachio crumb and caramelized sugar.",
    price: 9,
    available: false,
    prepMinutes: 5
  }
];

export const restaurantTables: RestaurantTable[] = [
  { id: "t1", label: "T1", area: "Main room", seats: 2, status: "seated", openOrderId: "o1001" },
  { id: "t2", label: "T2", area: "Main room", seats: 4, status: "ordered", openOrderId: "o1002" },
  { id: "t3", label: "T3", area: "Main room", seats: 4, status: "available" },
  { id: "t4", label: "T4", area: "Main room", seats: 6, status: "ready", openOrderId: "o1003" },
  { id: "b1", label: "B1", area: "Booths", seats: 4, status: "needs_help", openOrderId: "o1004" },
  { id: "b2", label: "B2", area: "Booths", seats: 4, status: "available" },
  { id: "p1", label: "P1", area: "Patio", seats: 2, status: "seated", openOrderId: "o1005" },
  { id: "p2", label: "P2", area: "Patio", seats: 2, status: "closed" }
];

export const orders: Order[] = [
  {
    id: "o1001",
    tableLabel: "T1",
    server: "Maya",
    status: "preparing",
    paymentStatus: "unpaid",
    openedAt: "2026-06-03T17:35:00.000Z",
    items: [
      { id: "oi1", name: "Smash burger", quantity: 2, unitPrice: 14, status: "preparing" },
      { id: "oi2", name: "Mint lime cooler", quantity: 2, unitPrice: 6, status: "ready" }
    ]
  },
  {
    id: "o1002",
    tableLabel: "T2",
    server: "Omar",
    status: "new",
    paymentStatus: "unpaid",
    openedAt: "2026-06-03T17:47:00.000Z",
    items: [
      { id: "oi3", name: "Citrus burrata", quantity: 1, unitPrice: 11, status: "new" },
      { id: "oi4", name: "Wild mushroom risotto", quantity: 2, unitPrice: 18, status: "new" }
    ]
  },
  {
    id: "o1003",
    tableLabel: "T4",
    server: "Maya",
    status: "ready",
    paymentStatus: "authorized",
    openedAt: "2026-06-03T17:20:00.000Z",
    items: [
      { id: "oi5", name: "Smash burger", quantity: 1, unitPrice: 14, status: "ready" },
      { id: "oi6", name: "Pistachio creme brulee", quantity: 2, unitPrice: 9, status: "ready" }
    ]
  },
  {
    id: "o1004",
    tableLabel: "B1",
    server: "Sara",
    status: "served",
    paymentStatus: "paid",
    openedAt: "2026-06-03T16:55:00.000Z",
    items: [
      { id: "oi7", name: "Citrus burrata", quantity: 2, unitPrice: 11, status: "served" },
      { id: "oi8", name: "Mint lime cooler", quantity: 4, unitPrice: 6, status: "served" }
    ]
  },
  {
    id: "o1005",
    tableLabel: "P1",
    server: "Omar",
    status: "preparing",
    paymentStatus: "unpaid",
    openedAt: "2026-06-03T17:52:00.000Z",
    items: [{ id: "oi9", name: "Wild mushroom risotto", quantity: 1, unitPrice: 18, status: "preparing" }]
  }
];

export const staffMembers: StaffMember[] = [
  { id: "s1", name: "Jules Moreau", email: "jules@brioche.co", role: "owner", status: "active" },
  { id: "s2", name: "Maya Khan", email: "maya@brioche.co", role: "server", status: "active" },
  { id: "s3", name: "Omar Reyes", email: "omar@brioche.co", role: "server", status: "active" },
  { id: "s4", name: "Nina Zhou", email: "nina@brioche.co", role: "kitchen", status: "active" },
  { id: "s5", name: "Sara Ali", email: "sara@brioche.co", role: "manager", status: "invited" }
];
