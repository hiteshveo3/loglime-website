import { AppTopbar } from "@/components/app-shell/AppTopbar";

export default function SettingsPage() {
  return (
    <>
      <AppTopbar title="Restaurant settings" subtitle="Workspace, location and operating defaults." />
      <div className="app-content">
        <div className="grid-2">
          <form className="card card-pad" style={{ display: "grid", gap: 16 }}>
            <h2 className="h3">Restaurant profile</h2>
            <div className="field">
              <label htmlFor="name">Restaurant name</label>
              <input className="input" id="name" defaultValue="Brioche and Co." />
            </div>
            <div className="field">
              <label htmlFor="currency">Currency</label>
              <select className="select" id="currency" defaultValue="USD">
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <button className="btn btn-primary" type="button">
              Save profile
            </button>
          </form>
          <section className="card card-pad" style={{ display: "grid", gap: 14 }}>
            <h2 className="h3">Supabase readiness</h2>
            <p className="body">
              Add environment variables and run the included migration to move from demo data to authenticated restaurant data.
            </p>
            <ul className="check-list">
              <li>
                <span className="badge-dot" style={{ marginTop: 8 }} />
                Organization and location tables
              </li>
              <li>
                <span className="badge-dot" style={{ marginTop: 8 }} />
                Menu, table, order and staff models
              </li>
              <li>
                <span className="badge-dot" style={{ marginTop: 8 }} />
                Row Level Security policies
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
