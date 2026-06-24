import { Plus } from "lucide-react";
import { AppTopbar } from "@/components/app-shell/AppTopbar";
import { OrdersBoard } from "@/components/restaurant/OrdersBoard";

export default function OrdersPage() {
  return (
    <>
      <AppTopbar
        title="Orders board"
        subtitle="Move live checks from new to served."
        actions={
          <button className="btn btn-primary btn-sm">
            <Plus size={15} />
            Open order
          </button>
        }
      />
      <div className="app-content">
        <OrdersBoard />
      </div>
    </>
  );
}
