import { Plus } from "lucide-react";
import { AppTopbar } from "@/components/app-shell/AppTopbar";
import { FloorPlan } from "@/components/restaurant/FloorPlan";

export default function FloorPage() {
  return (
    <>
      <AppTopbar
        title="Floor plan"
        subtitle="Track tables, areas, seats and open orders."
        actions={
          <button className="btn btn-primary btn-sm">
            <Plus size={15} />
            Add table
          </button>
        }
      />
      <div className="app-content">
        <div className="app-page-head">
          <div>
            <h2 className="h2">Dinner service floor</h2>
            <p className="body">Main room, booths and patio are modeled as floor areas in Supabase.</p>
          </div>
          <span className="pill">8 demo tables</span>
        </div>
        <FloorPlan />
      </div>
    </>
  );
}
