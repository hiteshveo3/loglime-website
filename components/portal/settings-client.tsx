"use client";

import { useState } from "react";

import { Button, Card, Input, PageHeader, useToast } from "@/components/ui";

export function PortalSettingsClient() {
  const { showToast } = useToast();
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [notifyProjectUpdates, setNotifyProjectUpdates] = useState(true);
  const [notifyInvoices, setNotifyInvoices] = useState(true);
  const [notifyTickets, setNotifyTickets] = useState(true);
  const [notifyAnnouncements, setNotifyAnnouncements] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your account and notification preferences." />

      {/* Business Info */}
      <Card>
        <h2 className="text-h4 text-text-primary">Business Information</h2>
        <p className="mt-1 text-small text-text-muted">Update your restaurant or business details.</p>
        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); showToast({ title: "Settings saved", tone: "success" }); }}>
          <Input label="Business Name" placeholder="Your Restaurant Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
          <Input label="Email" type="email" placeholder="hello@yourrestaurant.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input label="Website" type="url" placeholder="https://yourrestaurant.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
          <div className="sm:col-span-2">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-h4 text-text-primary">Email Notifications</h2>
        <p className="mt-1 text-small text-text-muted">Choose which emails you want to receive.</p>
        <div className="mt-5 space-y-4">
          {[
            { label: "Project Updates", description: "Get notified when your project status changes or a new update is posted.", value: notifyProjectUpdates, onChange: setNotifyProjectUpdates },
            { label: "Invoice Reminders", description: "Reminders about upcoming and overdue invoices.", value: notifyInvoices, onChange: setNotifyInvoices },
            { label: "Support Tickets", description: "Get replies and status changes on your support tickets.", value: notifyTickets, onChange: setNotifyTickets },
            { label: "Platform Announcements", description: "News about new features, maintenance windows, and platform updates.", value: notifyAnnouncements, onChange: setNotifyAnnouncements },
          ].map(({ label, description, value, onChange }) => (
            <label key={label} className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border p-4 transition hover:border-coral hover:bg-coral-light">
              <div>
                <p className="text-small font-semibold text-text-primary">{label}</p>
                <p className="mt-0.5 text-caption text-text-muted">{description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={value}
                onClick={() => onChange(!value)}
                className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${value ? "bg-coral" : "bg-surface-elevated"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={() => showToast({ title: "Notification preferences saved", tone: "success" })}>Save Preferences</Button>
        </div>
      </Card>

      {/* Account */}
      <Card>
        <h2 className="text-h4 text-text-primary">Account</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <p className="text-small font-semibold text-text-primary">Change Password</p>
              <p className="mt-0.5 text-caption text-text-muted">Update your account password.</p>
            </div>
            <Button variant="secondary" onClick={() => showToast({ title: "Password reset email sent", tone: "success" })}>
              <i className="hgi-stroke hgi-lock-01" />Reset
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-status-errorSoft p-4">
            <div>
              <p className="text-small font-semibold text-status-error">Delete Account</p>
              <p className="mt-0.5 text-caption text-text-muted">Permanently remove your account and all data.</p>
            </div>
            <Button variant="secondary" className="border-status-error text-status-error hover:bg-status-errorSoft" onClick={() => showToast({ title: "Please contact support to delete your account", tone: "warning" })}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
