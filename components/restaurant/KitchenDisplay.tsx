"use client";

import { useState } from "react";
import { orders as initialOrders } from "@/lib/restaurant/data";
import { orderStatusLabels, transitionOrder } from "@/lib/restaurant/workflow";
import type { Order, OrderStatus } from "@/lib/restaurant/types";

export function KitchenDisplay() {
  const [orders, setOrders] = useState<Order[]>(initialOrders.filter((order) => ["new", "preparing", "ready"].includes(order.status)));

  function update(orderId: string, status: OrderStatus) {
    setOrders((current) => current.map((order) => (order.id === orderId ? transitionOrder(order, status) : order)));
  }

  return (
    <div className="grid-3">
      {orders.map((order) => (
        <article className="card card-pad" key={order.id} style={{ display: "grid", gap: 16 }}>
          <div className="cta-row" style={{ justifyContent: "space-between" }}>
            <div>
              <h2 className="h3">{order.id.toUpperCase()}</h2>
              <p className="body">Table {order.tableLabel}</p>
            </div>
            <span className="badge badge-teal">
              <span className="badge-dot" />
              {orderStatusLabels[order.status]}
            </span>
          </div>
          <ul className="check-list">
            {order.items.map((item) => (
              <li key={item.id}>
                <span className="badge-dot" style={{ marginTop: 8 }} />
                <strong>{item.quantity}x</strong> {item.name}
              </li>
            ))}
          </ul>
          <div className="cta-row">
            <button className="btn btn-outline btn-sm" onClick={() => update(order.id, "preparing")}>
              Preparing
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => update(order.id, "ready")}>
              Ready
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
