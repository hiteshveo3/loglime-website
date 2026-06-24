"use client";

import { useMemo, useState } from "react";
import { orders as initialOrders } from "@/lib/restaurant/data";
import { groupOrdersByStatus, orderTotal, transitionOrder } from "@/lib/restaurant/workflow";
import type { Order, OrderStatus } from "@/lib/restaurant/types";

export function OrdersBoard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const groups = useMemo(() => groupOrdersByStatus(orders), [orders]);

  function moveOrder(orderId: string, status: OrderStatus) {
    setOrders((current) => current.map((order) => (order.id === orderId ? transitionOrder(order, status) : order)));
  }

  return (
    <div className="kanban" aria-label="Live restaurant orders board">
      {groups.map((group) => (
        <section className="kanban-col" key={group.status}>
          <div className="cta-row" style={{ justifyContent: "space-between" }}>
            <h2 className="h3">{group.label}</h2>
            <span className="pill">{group.orders.length}</span>
          </div>
          {group.orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="cta-row" style={{ justifyContent: "space-between" }}>
                <strong>{order.id.toUpperCase()}</strong>
                <span className="pill">{order.tableLabel}</span>
              </div>
              <p className="body">Server: {order.server}</p>
              <ul className="check-list">
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span className="badge-dot" style={{ marginTop: 8 }} />
                    {item.quantity} x {item.name}
                  </li>
                ))}
              </ul>
              <div className="cta-row" style={{ justifyContent: "space-between" }}>
                <strong>${orderTotal(order).toFixed(2)}</strong>
                <select
                  aria-label={`Change status for ${order.id}`}
                  className="select"
                  value={order.status}
                  onChange={(event) => moveOrder(order.id, event.target.value as OrderStatus)}
                  style={{ width: 132, padding: "8px 10px" }}
                >
                  {["new", "preparing", "ready", "served", "cancelled"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
