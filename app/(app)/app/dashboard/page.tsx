import { Plus } from "lucide-react";
import { AppTopbar } from "@/components/app-shell/AppTopbar";
import { MetricCard } from "@/components/restaurant/MetricCard";
import { orders, restaurantTables } from "@/lib/restaurant/data";
import { calculateDashboardMetrics, orderTotal } from "@/lib/restaurant/workflow";

export default function DashboardPage() {
  const metrics = calculateDashboardMetrics(orders, restaurantTables);
  const topOrders = orders.slice(0, 4);

  return (
    <>
      <AppTopbar
        title="Good evening, Jules"
        subtitle="Brioche and Co. - Wednesday service overview"
        actions={
          <a className="btn btn-primary btn-sm" href="/app/orders">
            <Plus size={15} />
            New order
          </a>
        }
      />
      <div className="app-content">
        <div className="grid-4" style={{ marginBottom: 22 }}>
          <MetricCard label="Active orders" value={String(metrics.activeOrders)} detail={`${metrics.kitchenQueue} in kitchen queue`} />
          <MetricCard label="Open revenue" value={`$${metrics.openRevenue.toFixed(0)}`} detail="Unpaid active checks" />
          <MetricCard label="Paid today" value={`$${metrics.paidRevenue.toFixed(0)}`} detail="Settled order totals" />
          <MetricCard
            label="Tables occupied"
            value={`${metrics.occupiedTables}/${metrics.totalTables}`}
            detail="Seated, ordered or ready"
          />
        </div>

        <div className="grid-2">
          <section className="card card-pad" style={{ display: "grid", gap: 14 }}>
            <div className="cta-row" style={{ justifyContent: "space-between" }}>
              <h2 className="h3">Live floor</h2>
              <a className="btn btn-outline btn-sm" href="/app/floor">
                View floor
              </a>
            </div>
            <div className="table-map">
              {restaurantTables.map((table) => (
                <div
                  className={`table-pill ${table.status === "ready" ? "ready" : table.status === "needs_help" || table.status === "ordered" ? "busy" : ""}`}
                  key={table.id}
                >
                  {table.label}
                </div>
              ))}
            </div>
          </section>

          <section className="card card-pad" style={{ display: "grid", gap: 14 }}>
            <div className="cta-row" style={{ justifyContent: "space-between" }}>
              <h2 className="h3">Recent orders</h2>
              <a className="btn btn-outline btn-sm" href="/app/orders">
                View board
              </a>
            </div>
            <div className="order-stack">
              {topOrders.map((order) => (
                <div className="order-chip" key={order.id}>
                  <span>
                    <strong>{order.id.toUpperCase()}</strong> - Table {order.tableLabel}
                  </span>
                  <span className="pill">${orderTotal(order).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
