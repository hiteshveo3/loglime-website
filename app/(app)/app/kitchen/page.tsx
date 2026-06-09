import { AppTopbar } from "@/components/app-shell/AppTopbar";
import { KitchenDisplay } from "@/components/restaurant/KitchenDisplay";

export default function KitchenPage() {
  return (
    <>
      <AppTopbar title="Kitchen display" subtitle="Focused queue for new, preparing and ready orders." />
      <div className="app-content">
        <KitchenDisplay />
      </div>
    </>
  );
}
