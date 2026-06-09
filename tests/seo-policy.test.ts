import { describe, expect, it } from "vitest";
import { marketingRoutes } from "@/lib/seo";

describe("seo route policy", () => {
  it("keeps auth and app routes out of the public sitemap list", () => {
    const paths = marketingRoutes.map((route) => route.path);

    expect(paths).not.toContain("/app/dashboard");
    expect(paths).not.toContain("/login");
    expect(paths).not.toContain("/signup");
  });

  it("publishes the restaurant-first routes", () => {
    const paths = marketingRoutes.map((route) => route.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/products/restaurant");
    expect(paths).toContain("/solutions/restaurants");
    expect(paths).toContain("/pricing");
  });
});
