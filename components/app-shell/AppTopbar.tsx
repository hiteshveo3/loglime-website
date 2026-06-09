import { Bell, HelpCircle, Search } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type AppTopbarProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export function AppTopbar({ title, subtitle, actions }: AppTopbarProps) {
  return (
    <header className="app-top">
      <div>
        <h1 className="h3">{title}</h1>
        {subtitle ? <p className="body">{subtitle}</p> : null}
      </div>
      <div className="cta-row">
        {!isSupabaseConfigured() ? <span className="pill">Demo mode</span> : <span className="pill">Supabase connected</span>}
        {actions}
        <button className="btn btn-outline btn-sm" aria-label="Search">
          <Search size={16} />
        </button>
        <button className="btn btn-outline btn-sm" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <button className="btn btn-outline btn-sm" aria-label="Help">
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
}
