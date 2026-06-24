import { EntityListClient } from "@/components/crm/entity-list-client";

export default function ProductCatalogPage() {
  return (
    <EntityListClient
      title="Product Catalog"
      subtitle="Admin-managed catalog of Loglime products, modules, add-ons, and bundles."
      table="products"
      primaryAction="Add Product"
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "price", label: "Price" },
        { key: "currency", label: "Currency" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "category", label: "Category", type: "select", options: [{ label: "App", value: "app" }, { label: "Module", value: "module" }, { label: "Add-on", value: "addon" }, { label: "Bundle", value: "bundle" }] },
        { name: "price", label: "Price", type: "number" },
        { name: "currency", label: "Currency" },
        { name: "delivery_days", label: "Delivery Days", type: "number" },
        { name: "status", label: "Status", type: "select", options: [{ label: "Active", value: "active" }, { label: "Draft", value: "draft" }, { label: "Discontinued", value: "discontinued" }] },
      ]}
      defaults={{ currency: "USD", status: "active", is_recurring: true, billing_cycle: "monthly" }}
    />
  );
}
