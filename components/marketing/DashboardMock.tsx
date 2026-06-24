import { ChefHat, Clock, DollarSign, Utensils } from "lucide-react";

export function DashboardMock() {
  return (
    <div className="mock-window" aria-label="Loglime restaurant app preview">
      <div className="mock-chrome">
        <div className="mock-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="mock-url">app.loglime.com / restaurant / ordering</div>
      </div>
      <div className="dashboard-preview">
        <div className="preview-top">
          <div>
            <span className="eyebrow">Brioche and Co.</span>
            <h3 className="h3">Customer app package</h3>
          </div>
          <span className="badge badge-coral">
            <span className="badge-dot" />
            Live menu
          </span>
        </div>
        <div className="preview-kpis">
          <div className="preview-kpi">
            <span>Online orders</span>
            <strong>128</strong>
          </div>
          <div className="preview-kpi">
            <span>Bookings</span>
            <strong>42</strong>
          </div>
          <div className="preview-kpi">
            <span>Repeat guests</span>
            <strong>31%</strong>
          </div>
        </div>
        <div className="grid-2">
          <div className="card card-pad" style={{ display: "grid", gap: 12 }}>
            <div className="cta-row" style={{ justifyContent: "space-between" }}>
              <strong>App modules</strong>
              <Utensils size={18} color="var(--coral)" />
            </div>
            <div className="table-map">
              {["Menu", "Order", "Book", "QR", "Deals", "Loyal", "Pickup", "Alerts"].map((table, index) => (
                <div key={table} className={`table-pill ${index % 3 === 0 ? "busy" : index % 4 === 0 ? "ready" : ""}`}>
                  {table}
                </div>
              ))}
            </div>
          </div>
          <div className="card card-pad" style={{ display: "grid", gap: 12 }}>
            <div className="cta-row" style={{ justifyContent: "space-between" }}>
              <strong>Customer actions</strong>
              <ChefHat size={18} color="var(--teal)" />
            </div>
            <div className="order-stack">
              {[
                ["#1042", "Family meal", "Paid"],
                ["#1043", "Table booking", "New"],
                ["#1044", "Loyalty offer", "Sent"]
              ].map(([id, title, status]) => (
                <div className="order-chip" key={id}>
                  <span>
                    <strong>{id}</strong> {title}
                  </span>
                  <span className="pill">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid-2">
          <div className="order-chip">
            <span className="cta-row">
              <Clock size={16} color="var(--primary)" />
              Tonight&apos;s offer ready
            </span>
          </div>
          <div className="order-chip">
            <span className="cta-row">
              <DollarSign size={16} color="var(--primary)" />
              Menu update published
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
