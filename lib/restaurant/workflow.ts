import type { Order, OrderStatus, RestaurantTable } from "@/lib/restaurant/types";

export const orderStatusLabels: Record<OrderStatus, string> = {
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  served: "Served",
  cancelled: "Cancelled"
};

export const orderStatusFlow: Record<OrderStatus, OrderStatus[]> = {
  new: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["served", "cancelled"],
  served: [],
  cancelled: []
};

export function canTransitionOrder(from: OrderStatus, to: OrderStatus) {
  return orderStatusFlow[from].includes(to);
}

export function transitionOrder(order: Order, nextStatus: OrderStatus): Order {
  if (!canTransitionOrder(order.status, nextStatus)) {
    return order;
  }

  return {
    ...order,
    status: nextStatus,
    items: order.items.map((item) => ({
      ...item,
      status: item.status === "served" || item.status === "cancelled" ? item.status : nextStatus
    }))
  };
}

export function orderTotal(order: Order) {
  return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function calculateDashboardMetrics(orders: Order[], tables: RestaurantTable[]) {
  const activeOrders = orders.filter((order) => !["served", "cancelled"].includes(order.status));
  const paidRevenue = orders.filter((order) => order.paymentStatus === "paid").reduce((sum, order) => sum + orderTotal(order), 0);
  const openRevenue = activeOrders.reduce((sum, order) => sum + orderTotal(order), 0);
  const occupiedTables = tables.filter((table) => ["seated", "ordered", "ready", "needs_help"].includes(table.status)).length;

  return {
    activeOrders: activeOrders.length,
    paidRevenue,
    openRevenue,
    occupiedTables,
    totalTables: tables.length,
    kitchenQueue: orders.filter((order) => ["new", "preparing", "ready"].includes(order.status)).length
  };
}

export function groupOrdersByStatus(orders: Order[]) {
  return (Object.keys(orderStatusLabels) as OrderStatus[]).map((status) => ({
    status,
    label: orderStatusLabels[status],
    orders: orders.filter((order) => order.status === status)
  }));
}
