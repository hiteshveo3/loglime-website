import { Plus } from "lucide-react";
import { AppTopbar } from "@/components/app-shell/AppTopbar";
import { MenuManager } from "@/components/restaurant/MenuManager";

export default function MenuPage() {
  return (
    <>
      <AppTopbar
        title="Menu manager"
        subtitle="Categories, item prices, prep time and availability."
        actions={
          <button className="btn btn-primary btn-sm">
            <Plus size={15} />
            New item
          </button>
        }
      />
      <div className="app-content">
        <MenuManager />
      </div>
    </>
  );
}
