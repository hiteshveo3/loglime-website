import { restaurantTables } from "@/lib/restaurant/data";

const statusCopy = {
  available: "Available",
  seated: "Seated",
  ordered: "Ordered",
  ready: "Ready",
  needs_help: "Needs help",
  closed: "Closed"
};

export function FloorPlan() {
  return (
    <div className="status-grid">
      {restaurantTables.map((table) => (
        <div className="card card-pad" key={table.id} style={{ display: "grid", gap: 12 }}>
          <div className="cta-row" style={{ justifyContent: "space-between" }}>
            <h3 className="h3">{table.label}</h3>
            <span className={`badge ${table.status === "ready" ? "badge-teal" : table.status === "needs_help" ? "badge-coral" : ""}`}>
              <span className="badge-dot" />
              {statusCopy[table.status]}
            </span>
          </div>
          <p className="body">
            {table.area} - {table.seats} seats
          </p>
          <span className="pill">{table.openOrderId ? `Open order ${table.openOrderId.toUpperCase()}` : "No active order"}</span>
        </div>
      ))}
    </div>
  );
}
