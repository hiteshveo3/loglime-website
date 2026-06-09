import { describe, expect, it } from "vitest";
import { orders, restaurantTables } from "@/lib/restaurant/data";
import { calculateDashboardMetrics, canTransitionOrder, orderTotal, transitionOrder } from "@/lib/restaurant/workflow";

describe("restaurant order workflow", () => {
  it("allows only valid order status transitions", () => {
    expect(canTransitionOrder("new", "preparing")).toBe(true);
    expect(canTransitionOrder("new", "served")).toBe(false);
    expect(canTransitionOrder("ready", "served")).toBe(true);
    expect(canTransitionOrder("served", "preparing")).toBe(false);
  });

  it("moves active order items with the order status", () => {
    const order = orders.find((item) => item.status === "new");
    expect(order).toBeTruthy();

    const moved = transitionOrder(order!, "preparing");

    expect(moved.status).toBe("preparing");
    expect(moved.items.every((item) => item.status === "preparing")).toBe(true);
  });

  it("calculates totals and dashboard metrics", () => {
    expect(orderTotal(orders[0])).toBe(40);

    const metrics = calculateDashboardMetrics(orders, restaurantTables);
    expect(metrics.activeOrders).toBe(4);
    expect(metrics.occupiedTables).toBe(5);
    expect(metrics.totalTables).toBe(8);
    expect(metrics.openRevenue).toBeGreaterThan(0);
  });
});
