import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(join(process.cwd(), "supabase/migrations/0001_restaurant_core.sql"), "utf8");

describe("supabase restaurant schema", () => {
  it("defines the required core tables", () => {
    [
      "profiles",
      "organizations",
      "organization_members",
      "locations",
      "menus",
      "menu_categories",
      "menu_items",
      "modifier_groups",
      "modifiers",
      "floor_areas",
      "restaurant_tables",
      "orders",
      "order_items",
      "order_events",
      "customers",
      "staff_invites",
      "audit_logs"
    ].forEach((table) => {
      expect(migration).toContain(`public.${table}`);
    });
  });

  it("enables RLS and uses organization-scoped helper policies", () => {
    expect(migration).toContain("enable row level security");
    expect(migration).toContain("public.is_org_member");
    expect(migration).toContain("public.has_org_role");
    expect(migration).toContain("public.can_access_order");
  });
});
