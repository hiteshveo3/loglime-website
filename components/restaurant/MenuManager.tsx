"use client";

import { useMemo, useState } from "react";
import { menuItems as initialItems } from "@/lib/restaurant/data";

export function MenuManager() {
  const [items, setItems] = useState(initialItems);
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category))), [items]);

  function toggleAvailability(id: string) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, available: !item.available } : item)));
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {categories.map((category) => (
        <section className="card card-pad" key={category} style={{ display: "grid", gap: 14 }}>
          <div className="cta-row" style={{ justifyContent: "space-between" }}>
            <h2 className="h3">{category}</h2>
            <span className="pill">{items.filter((item) => item.category === category).length} items</span>
          </div>
          <div className="menu-list">
            {items
              .filter((item) => item.category === category)
              .map((item) => (
                <div className="menu-row" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p className="body">{item.description}</p>
                  </div>
                  <strong>${item.price.toFixed(2)}</strong>
                  <button
                    className={`btn btn-sm ${item.available ? "btn-outline" : "btn-primary"}`}
                    onClick={() => toggleAvailability(item.id)}
                  >
                    {item.available ? "Available" : "Mark available"}
                  </button>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
